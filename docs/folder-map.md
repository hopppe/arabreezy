# Folder Map — Arabreezy

Every folder and what lives there. Edit this whenever we add/remove/rename anything so future-you (and future-me) never have to guess.

---

## Top-level

| Path | What it is |
|------|-----------|
| `App.js` | Root React component. Wires providers and root navigator. |
| `index.js` | Expo entry point. Registers `App`. |
| `app.config.js` | Expo config (app name, icon, splash, slug, scheme). |
| `babel.config.js` | Babel preset for Expo + reanimated plugin. |
| `package.json` | Dependencies and scripts. |
| `tsconfig.json` | TypeScript config (JS-first project, but we allow `.ts`/`.tsx`). |
| `PLAN.md` | Build plan + progress log. |
| `docs/` | Living documentation. |
| `backend/` | Local-only data layer today; real backend tomorrow. |
| `src/` | All app source. |
| `assets/` | Images, fonts, audio bundled with the app. |

---

## `src/`

Organized by **feature**, not by file type. If you edit a feature, most relevant code is in one folder.

### `src/App.js` — (actually lives at repo root)

### `src/theme/`
Single monochrome (black + white) theme with accent colors for buttons/images.
- `colors.js` — palette (black, white, grays, accent)
- `spacing.js` — spacing scale (xs..xl)
- `typography.js` — font sizes/weights
- `index.js` — assembled theme object

### `src/context/`
Global state providers. Each exports a `<XProvider>` and a `useX()` hook.
- `ThemeContext.js` — provides theme object
- `LanguageContext.js` — UI language (en/ar), RTL handling, `t(key)` function
- `DialectContext.js` — currently-selected Arabic dialect (saudi | levantine | fusha). Serves the right content bundle.
- `UserProgressContext.js` — user's level, current lesson, word progress, placement status. Persists to AsyncStorage.
- `LessonContext.js` — state for the lesson the user is currently doing
- `FlashcardContext.js` — SRS review queue + per-word progress (delegates to UserProgressContext)
- `DailyReviewContext.js` — today's review activities (focal words from current lesson + new word sets)

### `src/navigation/`
- `RootNavigator.js` — decides between placement navigator and tab navigator based on `UserProgressContext.placement.completed`
- `TabNavigator.js` — bottom tabs: Home, Lessons, Settings
- `PlacementNavigator.js` — stack for the initial placement flow

### `src/screens/`
Top-level screens rendered by navigators.
- `HomeScreen.js` — daily review hub. Shows today's activities anchored on the current lesson.
- `LessonsScreen.js` — browse lessons for current level, continue current lesson, see locked future levels.
- `SettingsScreen.js` — dialect switcher, progress reset, about.
- `placement/` — placement flow screens
  - `PlacementIntroScreen.js`
  - `PlacementQuestionScreen.js`
  - `PlacementResultScreen.js`

### `src/activities/`
Self-contained learning activities. Each is its own folder.
- `Lessons/` — lesson player
  - `LessonScreen.js` — the main lesson UI (intro → words → dialogue → check)
  - `components/` — word card, dialogue bubble, check-question
- `Flashcards/` — SRS review
  - `FlashcardScreen.js` — swipe-through review session
  - `scheduler.js` — spaced-repetition logic (lightweight Anki-style)
  - `components/` — card front/back, rating buttons
- `GuidedConversations/` — scripted branching dialogues
  - `GuidedConversationScreen.js` — plays through a scripted conversation
  - `components/` — message bubble, suggestion picker

### `src/components/`
Cross-cutting UI primitives used in multiple screens.
- `ui/` — `Button`, `Text`, `Card`, `ScreenContainer`, `ProgressBar`, etc.
- `ArabicText.js` — renders Arabic script with correct direction and font
- `LevelBadge.js` — shows current level (1–10)

### `src/data/`
Static content bundled with the app. **Dialect-aware.**
- `dialects/` — one subfolder per dialect, same shape
  - `saudi/` — primary, shipping now
    - `words.js` — all words for the Saudi dialect, keyed by word id
    - `lessons.js` — lesson definitions (id, level, title, focal word ids, dialogue, check questions)
    - `conversations.js` — guided conversation scripts
  - `levantine/` — stub (same shape, empty for now)
  - `fusha/` — stub (same shape, empty for now)
- `levels.js` — level 1..10 metadata (title, description, words-per-level target)
- `placement.js` — placement quiz questions
- `seed.js` — helper to load the right dialect bundle + merge with user progress

### `src/i18n/`
UI language strings (not Arabic-dialect content — that's `src/data/dialects/`).
- `en.js` — English UI strings
- `ar.js` — Arabic UI strings (can ship incomplete; English is default UI for now)
- `index.js` — exports map of locale → strings

### `src/utils/`
Small pure helpers.
- `storage.js` — thin wrapper around AsyncStorage (get/set JSON)
- `date.js` — today-as-ISO, comparison helpers
- `rtl.js` — `createRTLStyle(baseStyle, isRTL)` helper

---

## `backend/`

Local-only data layer. Shape mirrors what a real API would expose so we can swap implementations later without touching screens.

- `README.md` — documents the fake API surface
- `localBackend.js` — main entry. Exports functions like `getUser()`, `getLessons(level, dialect)`, `getWords(ids, dialect)`, `saveProgress(progress)`. Internally reads bundled JSON + AsyncStorage.
- `schema.js` — JSDoc typedefs for the data shapes (user, word, lesson, progress)

When we flip to a real backend, the plan is: keep function signatures in `localBackend.js`, swap internals from AsyncStorage to HTTP calls. Screens that call `backend.getLessons(...)` stay unchanged.

---

## `assets/`
- `fonts/` — Arabic-capable fonts (to add)
- `images/` — app icon, splash, accent illustrations
- `audio/` — word/phrase pronunciation (to add later)

---

## `docs/`
- `folder-map.md` — this file
- `english-app-map.md` — architecture notes from the source English app, for reference when porting more pieces later
- `decisions.md` — short log of notable design decisions (why 10 levels, why dialect bundles, etc.)

---

## What is deliberately NOT in this repo

For reference — if you see one of these in the English app, it's intentionally excluded:
- `ai-backend/`, `src/AI/`, realtime / WebRTC / OpenAI SDK code
- Supabase config / auth / any login flow
- RevenueCat, AppsFlyer, subscription, paywall
- Idioms, Reading, Listening, Stories, Shadowing, Pronunciation, Grammar activities
- Streaks, weekly trackers, notifications
- Light/dark theme toggle
