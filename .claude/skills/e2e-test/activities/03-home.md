# 03 — Home + Daily Review

**Source:** `src/screens/HomeScreen.js`, `src/context/DailyReviewContext.js`
**ai-backend:** none
**Supabase:** reads `user_progress` (real-auth mode)

## Pre-state
- Placement complete. TabNavigator → Home tab.

## Happy path

1. Verify visible elements:
   - **Phase badge** (top-left, e.g. "Phase 4")
   - **Search icon** (top-right)
   - "Ahlan!" title
   - "Today's review" subtitle
   - **Current lesson card** with lesson title and intro
   - **Start review / Continue lesson** button (orange) at (200, 370)
   - "N% of today's activities" + progress bar
   - **Activity cards** (Flashcards, Guided conversation, Shadowing) — tappable rows below
2. Tap "Start review" / "Continue lesson" at (200, 370) → navigates to LessonScreen for the current lesson.
3. Back at Home: button text should now say "Continue lesson" (proves lesson state was persisted).
4. Tap a row card (Flashcards / Guided conversation / Shadowing) — should navigate to that activity.
5. Tap the search icon (358, 102) — opens the AddFlashcardModal for word translate+save.

## Assertions
- UI: Button label flips between "Start review" (no `currentLesson`) and "Continue lesson" (currentLesson set).
- UI: Streak chip appears (with 🔥) when `progress.currentStreak > 0`.
- Code path: `DailyReviewContext` is derived live from `currentLesson` + `wordProgress` — there is **no midnight refresh** (per CLAUDE.md "lesson is the unit"). Don't add a timer.

## Failure paths
- If `activeLesson` is null (no `currentLesson` AND no `nextSuggestedLesson`), the card shows "—" and the button is disabled. This usually means the user has finished all lessons in the current phase but hasn't advanced.

## Recovery
- N/A — read-only screen.
