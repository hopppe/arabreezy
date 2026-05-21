# 05 — Flashcards (SRS)

**Source:** `src/activities/Flashcards/FlashcardScreen.js`, `src/activities/Flashcards/scheduler.js`, `src/context/FlashcardContext.js`
**ai-backend:** none
**Supabase:** writes `user_progress.wordProgress[wordId].state`

## Pre-state
- At least one focal word marked due (from a lesson or Daily Review). Home tab → tap "Flashcards" row OR Activities tab → Flashcards card (100, 490).

## Happy path

1. FlashcardScreen renders. Header: "Flashcards", "1 / N" counter, progress bar.
2. Card shows Arabic script (e.g. `سوق`) with "Tap card to flip" caption.
3. Rating buttons faint at the bottom (disabled until flip).
4. **Tap card at (200, 450)** → flips. Now shows English meaning ("market") + transliteration ("suuq").
5. Rating buttons become bright:
   - Again (red) (60, 815)
   - Hard (yellow) (155, 815)
   - Good (green) (240, 815)
   - Easy (blue) (340, 815)
6. Tap Good → advances to next card; progress bar fills. State transitions per `applyRating(prev, 3)` in scheduler.js.
7. Repeat for all N cards. Final screen: "All done!" celebration.

## Empty state
- If no words are due: "No cards due — Great work — come back after more lessons to review new words."

## Assertions
- UI: card flip is animated; progress bar shows `current/total`.
- State: each rating mutates the word's `wordProgress[wordId]` via the pure scheduler. Test the scheduler separately:
  ```js
  // Node REPL
  const { applyRating } = require('./src/activities/Flashcards/scheduler.js');
  applyRating({ state: 'new', interval: 0, ease: 2.5 }, 3); // → { state: 'learning', ... }
  ```
- Lifecycle: `new → learning → review → known`. Easy rating skips ahead; Again kicks back.

## Failure paths
- Rating before flip: buttons should be disabled.
- Backgrounding the app mid-session: state should be persisted via `FlashcardContext` → AsyncStorage.

## Recovery
- N/A — completing rerouts to "All done!". To re-test, complete more lessons to mark more words due.
