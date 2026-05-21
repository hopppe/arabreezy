# 02 — Placement

**Source:** `src/screens/placement/PlacementIntroScreen.js`, `PlacementQuestionScreen.js`, `PlacementResultScreen.js`, `src/data/placement.js`
**ai-backend:** none
**Supabase:** writes `user_progress.placement` (real-auth mode only)

## Pre-state
- Just past auth (or auth bypass). `progress.placement.completed === false` → `RootNavigator` routes to `PlacementNavigator` → `PlacementIntroScreen`.

## Happy path — Full placement

1. PlacementIntro renders ("Welcome to Arabreezy").
2. Tap "Begin placement" at **(200, 480)** → PlacementQuestion (Q1, Phase 1, "How do you say 'hello'?").
3. For each question:
   - Choices are **shuffled** every render — do NOT assume position-based correctness.
   - Tap a choice. Coords: (200, 240), (200, 370), (200, 500), (200, 625) — actual y varies slightly with prompt height.
   - Tap "Next" at **(200, 753)**. Next is disabled until a choice is selected.
4. The adaptive runner climbs phases on correct answers, stops after the first wrong (or at the cap, 11 questions).
5. PlacementResult renders ("You placed at Phase N — <tier>").
6. Tap "Start learning" at **(200, 615)** → TabNavigator → HomeScreen.

## Speed-run (just verify the screens render)

Tap choice 1 (200, 240) + Next (200, 753) repeatedly until you reach PlacementResult. You'll get a wrong answer eventually and the test ends — usually around Q7–Q9.

## Skip path

From Intro, tap "Skip — start at Phase 1" at (200, 560) → calls `completePlacement({score: 0, placedPhase: 1})` → goes straight to TabNavigator.

## Assertions
- UI: Each question shows a "Question N · Phase P" counter and a progress bar in `<ProgressBar value={pct}>`. The bar fills as you answer.
- UI: PlacementResult shows the placed phase number prominently and "Start learning" advances to Home.
- Storage: `@arabreezy/userProgress` AsyncStorage value (or Supabase `user_progress`) now has `placement.completed: true` and `phase: <N>`.

## Failure paths
- Tap Next without selecting → no action (button is disabled).
- Skip → Phase 1 (test "Skip" works without going through questions).

## Recovery
- To re-test placement, wipe progress: `xcrun simctl uninstall <UDID> com.arabreezy.app` and re-install OR open Settings tab and use the Phase selector (8 → 1 then back) — placement won't re-trigger but lesson state resets.
