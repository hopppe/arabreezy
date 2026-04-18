# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Arabreezy is a lightweight React Native / Expo app for learning Arabic. It was scaffolded by stripping the English learning app at `../Englishlearning` down to three activities (Lessons, Flashcards, Guided Conversations) and rebuilding the data model around **10 vocab-difficulty levels** and a **Saudi-primary dialect architecture**.

Read `PLAN.md` for product shape and checklist, `docs/folder-map.md` for the per-folder tour, and `docs/decisions.md` for the why behind non-obvious choices. `docs/english-app-map.md` is a reference map of the source app — useful if you need to port another feature over.

## Commands

```
npm install           # first time
npx expo start        # dev server; scan QR in Expo Go on the phone
npx expo start --tunnel   # if phone/laptop Wi-Fi is flaky
```

No build, test, or lint commands exist yet. The app runs in Expo Go — **no dev build needed** because the dependency set is Expo-Go-compatible on purpose. If you add a native module that Expo Go doesn't ship (e.g. WebRTC, RevenueCat, WebAudio), you've broken that guarantee and need to explain why.

## Architecture — the load-bearing ideas

### Provider stack (`App.js`)
The order matters. Each provider can only use providers above it:

```
SafeArea → GestureHandler → Theme → Language → Dialect → UserProgress → Lesson → Flashcard → DailyReview → RootNavigator
```

- **DialectContext** — which Arabic content bundle (Saudi / Levantine / Fusha) we serve. Bundles live at `src/data/dialects/<dialect>/`.
- **UserProgressContext** — the single source of truth for per-user state (level 1–10, current lesson id, word SRS progress, placement result). Persists to AsyncStorage. Everything else is derived.
- **LessonContext** — resolves the current lesson object and the list of lessons at the user's level. Owns `startLesson` / `finishCurrentLesson`.
- **FlashcardContext** — builds the review deck from the current lesson's focal words + completed lessons at the same level, filtered by SRS due-time.
- **DailyReviewContext** — **derived**, not stored. Today's activities are computed on the fly from `currentLesson` + `wordProgress`. That's why there's no "midnight refresh" — the deck naturally updates as the user progresses.

### The lesson-is-the-unit model
The source English app had "daily plans" that reset at midnight. Arabreezy replaces that with **lessons as the unit of progression**: a lesson stays in progress until finished, and level advances when all lessons at the current level are complete (see `LessonContext.finishCurrentLesson`). Daily review activities on Home are anchored on the current lesson's words.

If you're ever tempted to add a daily-refresh timer or midnight job, **you're solving the wrong problem** — re-read the Home screen's derived state instead.

### Dialect architecture
Every Arabic string the user sees comes from a dialect bundle at `src/data/dialects/<dialect>/`. Each bundle exports the same shape: `{ id, name, rtl, words, lessons, conversations }`.

**Hard rule:** word ids are stable across dialects. `w_hello` means "hello" in Saudi, Levantine, and Fusha — only the `script` / `transliteration` / `notes` differ. This is what lets a user switch dialect without losing lesson progress or SRS state. Don't introduce dialect-specific word ids.

Only the Saudi bundle is populated. Levantine and Fusha are empty stubs with the right shape. If you're filling one in, reuse the Saudi word ids.

### Local backend façade (`backend/localBackend.js`)
Screens and contexts never read bundled JSON or AsyncStorage directly. They go through `backend/localBackend.js`, which exposes async functions shaped like a real API (`getLessons({ dialect, level })`, `getWord({ dialect, wordId })`, etc.).

When we swap to a real server, the internals of these functions become `fetch(...)` calls and nothing else changes. **Don't import from `src/data/dialects/...` inside a screen or context** — go through the façade. (The `DialectContext` is the one intentional exception because it needs the full bundle up front.)

### SRS scheduler
Pure functions in `src/activities/Flashcards/scheduler.js`. `applyRating(prev, rating)` returns a new progress object (1=again, 2=hard, 3=good, 4=easy). State flows `new → learning → review → known`. All state lives on `UserProgressContext.progress.wordProgress[wordId]` — the scheduler is stateless and never writes anywhere itself.

## Conventions

- **Immutability.** Contexts use functional `setProgress(prev => ...)`. Don't mutate.
- **Styling.** No StyleSheet files — inline style objects that read from `theme` (single exported object in `src/theme/index.js`). There's one theme; no light/dark toggle. Accent color (`theme.colors.accent`) is the only non-grayscale tone and should only show up on buttons, highlights, and illustrations.
- **Arabic text.** Use `<ArabicText>` from `src/components/ArabicText.js` — it sets `writingDirection: 'rtl'` and uses the larger Arabic font scale. Don't render Arabic script through plain `<Text>`.
- **i18n.** UI strings go in `src/i18n/en.js` (and `ar.js` when you want to fill it). Content strings (words, lessons, conversations) go in the dialect bundle — these are distinct layers.
- **Storage keys.** Namespace them `@arabreezy/<feature>`. The existing keys are `@arabreezy/userProgress` and `@arabreezy/dialect`.

## Things that are deliberately missing

If you see any of these in the source English app and wonder where they went, they're intentionally out:
- Auth / Supabase / any backend calls
- Subscriptions, paywall, RevenueCat, AppsFlyer, analytics, notifications
- AI realtime conversation, WebRTC, voice recording
- Idioms, Reading, Listening, Stories, Shadowing, Pronunciation, Grammar activities
- Streaks, daily-plan midnight refresh
- Light/dark theme toggle, multi-theme system

Don't re-add them without a discussion. They each were major complexity drivers in the source app.
