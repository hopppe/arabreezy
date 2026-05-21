# 10 — Idioms

**Source:** `src/activities/Idioms/IdiomsScreen.js`
**ai-backend:** none
**Supabase:** none (reads dialect bundle / Supabase `idioms` table)

## Pre-state
- Activities tab → Idioms card. After swipe up by 300: (300, 340).

## Happy path

1. IdiomsScreen renders. Header: "Idioms — Saudi sayings — meanings and uses."
2. List of idioms appears at the user's phase. Each shows the Arabic, literal translation, and idiomatic meaning + example sentence.
3. Tap an idiom to expand (if applicable).

## Empty state (currently the default at Phase 4)
- "No idioms available yet at your phase." + Back button.
- **This is a known content gap** — see `known-issues.md`. To verify the screen logic works, switch the user to a phase where idioms exist (Phase 1 or 2 typically), or seed the dialect bundle.

## Assertions
- UI: List renders OR empty-state copy appears. Both prove the screen loaded without error.
