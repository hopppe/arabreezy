# 15 — Roots

**Source:** `src/activities/Roots/RootsListScreen.js`, `RootFamilyScreen.js`
**ai-backend:** none
**Supabase:** none (reads dialect bundle / Supabase `roots`)

## Pre-state
- Activities tab → Roots card. After swipe up by 300: (100, 470).

## Happy path

1. RootsListScreen renders. Header: "Roots — The 3-letter consonants behind every Arabic word. Tap a root to see its family."
2. "Phase 1 — N roots" section, then a card list:
   - **q-w-l** — saying, speech
   - **k-w-n** — being, becoming
   - **r-w-d** — wanting (MSA-preferred)
   - **s-l-m** — peace, safety, submission
   - **b-gh-y** — wanting (Saudi-dominant)
   - …
3. Tap a root row → RootFamilyScreen with all derived words from that root, each clickable to view word details.

## Assertions
- UI: at least 11 roots at Phase 1 in the Saudi bundle.
- UI: tapping a root navigates to a family view; back arrow returns.
