# Arabreezy — Arabic Learning App

Adapted from the English learning app at `../Englishlearning`. This doc is the source of truth for what we're building, what we're dropping, and progress.

---

## Product shape

A lightweight Arabic learning app centered on **placement → lesson → daily review**.

- User lands in a **placement flow** that figures out their level (1–10).
- They get assigned to a **lesson** at that level. The lesson is the unit of progression.
- Lessons do **NOT refresh daily**. They refresh only when the current lesson is **finished**.
- Each day, the user gets **daily review activities** anchored on the **current lesson's focal words**, plus sets of **new words** to learn.
- Primary dialect: **Saudi**. Architecture supports adding **Levantine** and **Fusha (MSA)** later.
- Backend is **local-only** for now (AsyncStorage + bundled JSON). A `/backend` folder holds what will eventually be the server-side data layer.

### Core activities (only these three)
1. **Lessons** — structured units that teach a set of focal words + short grammar/dialogue.
2. **Flashcards** — spaced-repetition review of learned words.
3. **Guided Conversations** — scripted branching dialogues (no AI / no WebRTC / no voice).

### Explicitly dropped (from the English app)
- Idioms, Reading, Listening, Stories, Shadowing, Pronunciation, Grammar activities
- AI realtime conversation, WebRTC, OpenAI SDK, voice recording
- Supabase auth, login, signup, onboarding paywall flow
- RevenueCat, AppsFlyer, subscriptions, paywall, referral
- Streaks (will reconsider later), notifications, analytics
- Light/dark theme toggle (single black/white theme with accent pops)
- Multi-theme system

---

## 10-level vocabulary curriculum

Levels are **centered on vocabulary difficulty**. Each level has:
- A **vocab list** (focal words for the level)
- **N lessons** that introduce those words in small sets
- A **level-up check** that unlocks the next level

Rough calibration (to refine with real content):

| Level | Focus | Words added | CEFR-ish |
|------|------|----|------|
| 1 | Greetings, pronouns, yes/no, "I am" | ~30 | Pre-A1 |
| 2 | Numbers, days, colors, "have/want" | ~40 | A1 |
| 3 | Family, food basics, simple questions | ~50 | A1 |
| 4 | Daily routines, places, directions | ~60 | A2 |
| 5 | Shopping, money, bargaining phrases | ~70 | A2 |
| 6 | Travel, transport, time expressions | ~80 | A2/B1 |
| 7 | Work, studies, feelings | ~90 | B1 |
| 8 | Opinions, comparisons, past tense vocab | ~100 | B1 |
| 9 | News/media vocabulary, abstract nouns | ~110 | B1/B2 |
| 10 | Idiomatic phrases, nuance, register | ~120 | B2 |

---

## Tailored progress tracking

Per-student state lives in `src/data/userProgress.js` (via AsyncStorage). Shape:

```js
{
  userId: 'local-user',           // single local user for now
  dialect: 'saudi',                // 'saudi' | 'levantine' | 'fusha'
  level: 3,                        // current level 1..10
  currentLessonId: 'lvl3_lesson_2',// lesson in progress (doesn't reset daily)
  lessonsCompleted: [...],
  wordProgress: {
    [wordId]: {
      status: 'new' | 'learning' | 'review' | 'known',
      easeFactor, interval, nextReviewAt, lapses, reviewsCount
    }
  },
  dailyReview: {
    date: '2026-04-19',
    focalWordIds: [...],           // anchored on currentLesson
    newWordSetIds: [...],          // sets of new words to introduce
    activitiesCompleted: { flashcards: false, guidedConversation: false }
  },
  placement: {
    completed: true,
    score: 42,
    placedAt: '2026-04-19',
    placedLevel: 3
  }
}
```

Plans become tailored via two levers:
1. **Which level the user is on** (set by placement, advanced by lesson completion).
2. **Which focal words are due for review** (driven by the SRS scheduler reading `wordProgress`).

---

## Dialect architecture

Every string that has a dialect-specific form lives in a **dialect bundle**. Words, lesson dialogues, and guided-conversation scripts reference a word ID; the dialect bundle provides the surface forms.

Data shape:
```js
// src/data/dialects/saudi/words.js
export default {
  word_hello: {
    id: 'word_hello',
    script: 'مرحبا',       // Arabic script
    transliteration: 'marhaba',
    english: 'hello',
    audio: null,            // URL / local path, optional
    notes: 'common Saudi greeting'
  },
  ...
}
```

- `src/data/dialects/saudi/` — words, lessons, conversations (primary, shipping now)
- `src/data/dialects/levantine/` — stub folder, same shape, can fill in later
- `src/data/dialects/fusha/` — stub folder, same shape, can fill in later

A `DialectContext` reads the user's `dialect` and serves the right bundle to lessons/flashcards/conversations. Switching dialect later becomes a settings toggle, no code changes required.

---

## Architecture at a glance

```
App.js
 ├─ SafeAreaProvider / GestureHandlerRootView
 ├─ LanguageProvider        (UI language: en for now, ar later; RTL support)
 ├─ ThemeProvider           (single black/white theme)
 ├─ DialectProvider         (saudi | levantine | fusha)
 ├─ UserProgressProvider    (level, currentLesson, wordProgress, placement)
 ├─ LessonProvider          (current lesson state)
 ├─ FlashcardProvider       (SRS review queue)
 ├─ DailyReviewProvider     (daily activities anchored on current lesson)
 └─ NavigationContainer
     ├─ PlacementNavigator   (shown until placement.completed)
     └─ TabNavigator
         ├─ Home            (daily review hub)
         ├─ Lessons         (browse + continue current lesson)
         └─ Settings        (dialect toggle, reset, about)
```

---

## Step-by-step build order

- [x] 1. Explore English app — done, see `docs/english-app-map.md`
- [x] 2. Write this plan + folder map
- [x] 3. Scaffold: `package.json`, `App.js`, `index.js`, `app.config.js`, `babel.config.js`, `.gitignore`
- [x] 4. Black/white theme (`src/theme/`)
- [x] 5. Language + Dialect contexts (`src/context/`)
- [x] 6. UserProgress context + local persistence (`src/context/UserProgressContext.js`)
- [x] 7. Local backend stub (`backend/` folder + `backend/README.md`)
- [x] 8. Seed data: 10 levels × lessons × words for Saudi dialect (skeleton + small vocab to start)
- [x] 9. Placement flow (`src/screens/placement/`)
- [x] 10. Home / Daily Review screen (`src/screens/HomeScreen.js`)
- [x] 11. Lesson screen (`src/activities/Lessons/`)
- [x] 12. Flashcard activity (`src/activities/Flashcards/`)
- [x] 13. Guided Conversation activity (`src/activities/GuidedConversations/`)
- [x] 14. Navigation (`src/navigation/TabNavigator.js`, `PlacementNavigator.js`)
- [x] 15. Settings (dialect switch, level reset)

### Next up (not done yet)
- [ ] Install & boot once (`npm install`, `npx expo start`) to shake out runtime issues
- [ ] Fill Levantine + Fusha dialect bundles when ready (same word ids as Saudi)
- [ ] Add audio for focal words (drop files into `assets/audio/` and reference from `words.js`)
- [ ] Write more lessons per level — current seed has 1–2 per level
- [ ] Visual polish pass when you're ready to style it

Update this list as we go. Checked = done and committed-in-spirit (no git yet).

---

## Progress log

- **2026-04-19** — Plan written. Explored English app and identified minimum viable surface.
- **2026-04-19** — Added 10-level structure + dialect architecture based on updates.
- **2026-04-19** — Full scaffold complete: theme, all contexts, placement flow, home/lessons/settings screens, lesson player, flashcard activity with SRS, guided conversation activity, navigation. Saudi dialect bundle seeded with ~80 words across all 10 levels, 18 lessons, 2 guided conversations. Levantine + Fusha bundles stubbed (same shape, empty). Local backend façade in place. Untested — `npm install` + `expo start` is the next real step.
