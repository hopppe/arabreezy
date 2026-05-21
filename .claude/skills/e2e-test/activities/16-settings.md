# 16 — Settings

**Source:** `src/screens/SettingsScreen.js`
**ai-backend:** none
**Supabase:** writes `user_progress.dialect`, `user_progress.phase`, and clears session on sign-out

## Pre-state
- Tap Settings tab at (350, 830).

## Happy path

1. SettingsScreen renders. Sections (top → bottom):
   - **Streak**: 🔥 N days, "Longest: N"
   - **Daily reminder**: toggle switch (uses expo-notifications)
   - **Phase**: 1–10 picker buttons. Currently-selected phase highlighted black. Tap any to change.
   - **Dialect**: Saudi / Levantine / Fusha. Saudi is the only fully populated (per CLAUDE.md). Tapping another shows "stub" warning.
   - **Account** (real-auth mode only): Sign out button.
   - **Version / build info**

## Phase change test
1. Note current phase (e.g. 4).
2. Tap a different phase (e.g. 6). Highlight should move.
3. Pop Home tab → header phase badge updates to "Phase 6". Active lesson resets to the first lesson at phase 6.
4. Tap Settings → phase 4 → reverts.

## Dialect change test
- Word ids are stable across dialects (per CLAUDE.md hard rule). Switching dialect should NOT lose `wordProgress` state — verify by looking at Flashcards card count before/after switching.

## Daily reminder toggle
- First toggle ON: triggers expo-notifications permission prompt (only in dev build, not Expo Go).

## Sign-out (real-auth mode)
- Tap Sign out → `supabase.auth.signOut()` → RootNavigator detects `!session` and routes back to AuthNavigator/SignIn.

## Assertions
- Toggling phase changes the Home tab's active lesson within a second.
- Switching dialect preserves SRS state (word ids stable).
- Sign out clears `@arabreezy/userProgress` in AsyncStorage? **No** — local progress is intentionally kept; only the auth session is cleared.

## Failure paths
- Toggling phase to one with no content: empty Home tab "—" placeholder; Activities tab cards still load.
