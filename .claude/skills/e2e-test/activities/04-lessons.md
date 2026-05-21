# 04 — Lessons

**Source:** `src/activities/Lessons/LessonScreen.js`, `src/context/LessonContext.js`, `src/data/dialects/<dialect>/lessons.js`
**ai-backend:** none (no AI calls in core lesson loop)
**Supabase:** writes `user_progress.wordProgress` (focal words advance to "known" on lesson completion)

## Pre-state
- Logged-in / bypassed user, placement complete, on Home tab. Tap "Start review" or navigate via Activities → Lessons.

## Happy path

A lesson has 4 steps: **Intro → Learn → Quiz → Complete**.

1. **Intro** screen: lesson title, intro text, "N words · Phase P" tag, Continue button at **(200, 810)**. Tap Continue.
2. **Learn** screen: per-focal-word card. "Word 1 of N" header, Arabic script on top, transliteration, "MEANING" label, English meaning. Continue at (200, 810) advances to the next word.
3. **Quiz** screen: "Tap the Arabic for <english_word>". 4 choice cards. Coords (200, 275), (200, 370), (200, 465), (200, 560). Tapping a correct choice highlights green and auto-advances; wrong choice highlights red and re-asks.
4. **Complete** screen: "Lesson complete" celebration, "Finish lesson" button.

## Assertions
- UI: progress bar at the top fills as you advance through steps.
- State: each focal word's `wordProgress[wordId]` transitions `new → learning` on Learn, `learning → known` on Quiz-correct. Verify in storage:
  ```sql
  SELECT id, word_progress->'<wordId>' FROM user_progress WHERE id = '<uid>';
  ```
- State: after Finish, `progress.completedLessons` includes the lesson id; `progress.currentLesson` clears.

## Failure paths
- Tap Continue without selecting any word in a quiz → button does nothing (lesson `Quiz` requires a selection).
- Close X mid-lesson (368, 111) → `currentLesson` should persist; Home button flips to "Continue lesson".

## Recovery
- To reset a lesson's progress, clear `progress.wordProgress[wordId]` entries for the focal words; the lesson treats them as `new` again.
