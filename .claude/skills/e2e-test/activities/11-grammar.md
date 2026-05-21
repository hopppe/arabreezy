# 11 — Grammar Practice

**Source:** `src/activities/GrammarPractice/GrammarPracticeScreen.js`
**ai-backend:** none
**Supabase:** none

## Pre-state
- Activities tab → Grammar card. After swipe up by 300: (100, 340).

## Happy path

1. GrammarPracticeScreen renders. "Short drills on one rule at a time."
2. A drill appears: a sentence with a blank, plus 2-4 choices.
3. Tap the correct choice. Correct → green highlight + next drill. Wrong → red highlight + reveal answer.
4. Walk through all drills at the phase. End screen shows a score.

## Empty state (currently the default at Phase 4)
- "No grammar drills for this phase yet." Same content-gap pattern as Pronunciation and Idioms.

## Assertions
- UI: list OR empty-state. Both prove the screen loaded.
