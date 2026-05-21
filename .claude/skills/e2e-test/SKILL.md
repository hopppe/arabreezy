---
name: e2e-test
description: Drive the full Arabreezy mobile end-to-end smoke against an iOS simulator using the mobile-mcp tools. Use BEFORE every release/update, and after any change to providers in App.js, navigation, the backend façade, an activity screen, or an ai-backend route. Walks auth → placement → all 11 activity screens → settings, asserting both UI state AND backend side-effects (TTS / STT / chat / realtime / Supabase rows).
---

# Arabreezy E2E Smoke (iOS Simulator + mobile-mcp)

This is the canonical pre-update verification harness for Arabreezy. It boots the sim, brings up Metro + ai-backend, installs/launches the app, and walks every activity. **If you only have time for one safety net before shipping, run this.**

## Mental model

For each activity, the test answers two questions:
1. **UI worked** — the right screen rendered, taps had effects, content displayed.
2. **Backend worked** — the right ai-backend endpoint was called and returned 200, or the Supabase row changed.

UI-only assertions miss silent regressions (screen renders, but `wordProgress[wordId]` never updates). Backend-only assertions miss UX regressions. **Always check both.**

## When to use

- **MUST run** before merging anything that touches: providers in `App.js`, navigation in `src/navigation/`, the backend façade (`backend/localBackend.js` / `bundleBackend.js` / `supabaseBackend.js`), any activity screen under `src/activities/`, any ai-backend route, or schema changes.
- **SHOULD run** before any build (`npm run build:dev:*` / `build:preview` / `build:prod`).
- **Manual full pass** weekly even with no related changes — content drift in the Supabase 10 tables can break activity screens silently.

Do NOT use for: pure logic verification (the SRS scheduler at `src/activities/Flashcards/scheduler.js` is pure — test it with a Node REPL, not this).

## Prerequisites

- macOS with Xcode + iOS simulators. **Canonical target: iPhone 16 Pro, iOS 18.3, UDID `E9A24CBA-D324-4723-B407-33B63959C783`** (re-pick a UDID with `xcrun simctl list devices available` if this one is gone).
- `ai-backend/.env` populated with `OPENAI_API_KEY`, `OPENAI_REALTIME_MODEL=gpt-realtime-mini`, `OPENAI_CHAT_MODEL=gpt-4o-mini`, `OPENAI_TTS_MODEL=gpt-4o-mini-tts`, `OPENAI_STT_MODEL=whisper-1`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `PORT=8787`. Set **`ALLOW_ANON=true`** during the smoke so the backend skips Supabase JWT verification — otherwise no-auth bypass mode (see below) can't reach the AI routes.
- App `.env` with `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `EXPO_PUBLIC_USE_SUPABASE_CONTENT=true`. **Leave `EXPO_PUBLIC_AI_BACKEND_URL` blank** so the client auto-derives `http://<metro-lan-ip>:8787` from `Constants.expoConfig.hostUri`.
- `.env.local` (gitignored) with `SUPABASE_SECRET_KEY=sb_secret_...` — only needed if you want to admin-create a confirmed test user.

## One-time setup (skip if already done)

1. **Build the dev client at least once.** `npx expo run:ios` takes 5–15 min cold (CocoaPods + xcodebuild), seconds incrementally. The .app lands in `~/Library/Developer/Xcode/DerivedData/Arabreezy-*/Build/Products/Debug-iphonesimulator/Arabreezy.app`.
2. **Decide the auth path.** Two options:
   - **Auth bypass** (recommended for fast smoke): append the 3-line override block in [setup.md](./setup.md) to `.env.local`. The app runs in local-only mode — uses bundled content under `src/data/dialects/saudi/`, AsyncStorage instead of Supabase `user_progress`. Faster, no email confirmation friction.
   - **Real auth**: keep `.env.local` untouched, use a confirmed Supabase user (see `setup.md` for two ways to create one — Supabase Studio email-confirm or admin REST API with the service role key).

## Process

### Phase 0 — Pre-flight (5 min)

Run [setup.md](./setup.md) commands. End state:
- iPhone 16 Pro sim booted (`xcrun simctl list devices booted` shows it).
- Metro on `:8082` (`lsof -nP -iTCP:8082 -sTCP:LISTEN` returns a node PID).
- ai-backend on `:8787` (`lsof -nP -iTCP:8787 -sTCP:LISTEN` returns a node PID).
- `mobile_list_available_devices` reports the sim as `state: "online"`.
- App installed: `xcrun simctl listapps E9A24CBA-... | grep com.arabreezy.app` returns a hit.

### Phase 1 — Launch and verify boot

```
xcrun simctl openurl <UDID> "exp+arabreezy://expo-development-client/?url=http%3A%2F%2F<LAN-IP>%3A8082"
```

`xcrun simctl openurl` is required — `mobile_open_url` rejects non-http schemes. The LAN IP comes from `ifconfig | grep "inet 192" | head -1`.

After ~8 seconds:
- Take screenshot, verify either AuthNavigator (SignIn screen) or PlacementIntroScreen renders depending on env.
- Dismiss the expo-dev-launcher dev menu sheet if it shows — tap the **X close button at (350, 397)**, NOT "Continue" (which is inside the sheet and just scrolls).
- Tail `/tmp/arabreezy_metro.log` and look for the `[supabase] Missing EXPO_PUBLIC_*` warning. If present → auth bypass mode is active. If absent → real auth mode.

Red flags:
- White screen >5s: Metro can't reach device. Confirm `RCT_METRO_PORT=8082` was set during `expo run:ios` and that Metro listens on 8082 (the English app owns 8081 — they MUST be separated).
- Red error overlay: read `/tmp/arabreezy_metro.log` for the stack.
- Stuck on Splash: `useAuth().loaded`, `useUserProgress().loaded`, or `useDialect().loaded` is false. Wipe AsyncStorage with `xcrun simctl uninstall <UDID> com.arabreezy.app` and reinstall.

### Phase 2 — Activity matrix

Each activity has a playbook under `activities/`. Run them **in roughly this order** — later activities benefit from state created earlier (Flashcards needs at least one focal word marked due; Pronunciation needs a known Phase ≥ 4 word):

| # | Activity / Screen | Playbook | Touches ai-backend? | Touches Supabase? |
|---|---|---|---|---|
| 1 | Auth (sign-up / sign-in / Apple) | [activities/01-auth.md](./activities/01-auth.md) | no | yes — `auth.users` |
| 2 | Placement | [activities/02-placement.md](./activities/02-placement.md) | no | yes — `user_progress.placement` |
| 3 | Home + Daily Review | [activities/03-home.md](./activities/03-home.md) | no | yes — read `user_progress` |
| 4 | Lessons | [activities/04-lessons.md](./activities/04-lessons.md) | no | yes — write `user_progress.wordProgress` |
| 5 | Flashcards (SRS) | [activities/05-flashcards.md](./activities/05-flashcards.md) | no | yes — `wordProgress[wordId].state` |
| 6 | Guided Conversations | [activities/06-guided-conv.md](./activities/06-guided-conv.md) | yes — `/api/tts` | no |
| 7 | Shadowing | [activities/07-shadowing.md](./activities/07-shadowing.md) | yes — `/api/tts`, `/api/stt` | no |
| 8 | Stories | [activities/08-stories.md](./activities/08-stories.md) | optional `/api/tts` | no |
| 9 | Listening | [activities/09-listening.md](./activities/09-listening.md) | yes — `/api/tts` | no |
| 10 | Idioms | [activities/10-idioms.md](./activities/10-idioms.md) | no | no |
| 11 | Grammar Practice | [activities/11-grammar.md](./activities/11-grammar.md) | no | no |
| 12 | Pronunciation | [activities/12-pronunciation.md](./activities/12-pronunciation.md) | yes — `/api/stt` | no |
| 13 | Chat | [activities/13-chat.md](./activities/13-chat.md) | yes — `/api/chat` | no |
| 14 | Voice Tutor (Realtime) | [activities/14-voice-tutor.md](./activities/14-voice-tutor.md) | yes — `/api/realtime/session` | no |
| 15 | Roots | [activities/15-roots.md](./activities/15-roots.md) | no | no |
| 16 | Settings (dialect / phase / sign-out) | [activities/16-settings.md](./activities/16-settings.md) | no | yes — `user_progress.dialect`, `phase` |
| 17 | **Unit flow (primary entry path, 2026-05-20)** | see "Unit flow" below | yes — `/api/lesson/generate-story`, `/api/chat` (with `requiredWords`) | yes — `user_progress.currentUnit`, `unitCursor`, `unitsCompletedCount` |
| 18 | Review session (Flashcards → AI chat) | see "Review flow" below | yes — `/api/chat` (with `requiredWords`) | yes — `user_progress.wordProgress` |

## Unit flow (primary path)

After this session's pivot the unit flow REPLACES the old daily-plan / activity-grid as the main loop.

```
HomeScreen "Continue/Start lesson"
  → WordSelectionScreen      // 8 P-N cards sorted by word_id; tap-to-know swaps with next phase word
  → UnitMemriseScreen        // wrapped MemrisePhase on un-tapped focals only
  → LessonStoryScreen        // POST /api/lesson/generate-story with the 8 focals + phase
  → UnitRotationScreen       // round-robin 1 of {Listening, Shadowing, GuidedConv} via unitsCompletedCount % 3
  → UnitChatScreen           // ChatScreen with requiredWords = 8 focals; beforeRemove fires finishCurrentUnit
  → Home (next unit auto-ready)
```

Each focal word is seen 5+ times in 15 minutes across surfaces — measurably better retention than the old 1×/day model.

E2E test for the unit flow:
1. `HomeScreen` → tap "Start next lesson" (or "Continue lesson" if `progress.currentUnit` exists).
2. `WordSelectionScreen` shows 8 sorted P-N words. Tap one to verify markKnown + refill.
3. Tap "Start lesson". Should advance to `UnitMemrise`.
4. Run through Memrise (tap Continue per word, then tap correct in MCQ).
5. `UnitStory` shows "Writing your story…" briefly then renders an AI-generated Saudi story using all 8 focals. Verify tashkeel rule matches phase.
6. Tap Continue → comprehension MCQ → green-correct → Continue → `UnitRotation`.
7. Tap activity card or "Done — continue to chat".
8. `UnitChat` opens with side checklist of 8 words. Type a sentence containing one focal → that word ticks off. Type until all 8 are checked.
9. Tap "Finish" (top-right) → `finishCurrentUnit` fires → routes back to Home.
10. Home now shows "Start next lesson" (cursor advanced).

## Review flow

```
HomeScreen "Start review (N)"
  → ReviewSessionScreen
    → FlashcardScreen        // SRS deck capped at 20
    → ChatScreen (requiredWords = those 20)
  → "Review done" → back to Home
```

For every playbook:
1. Capture a baseline screenshot to `.claude/skills/e2e-test/screenshots/<NN>-<activity>-baseline.png`.
2. Run the happy path.
3. Capture a "complete" screenshot to `<NN>-<activity>-complete.png`.
4. If the activity touches ai-backend, `tail -20 /tmp/arabreezy_ai_backend.log` afterwards to confirm a 200 — note that this server only logs the startup line by default, so the proof of a successful round trip is the screen state changing (e.g. an Arabic reply bubble in Chat, "Live — talk away" in Voice Tutor).
5. If the activity touches Supabase (real-auth mode only), use the Supabase MCP `execute_sql` to read `user_progress` and confirm `wordProgress` or `placement` changed.

### Phase 3 — Tear down

```bash
pkill -f "expo start --dev-client --port 8082" || true
pkill -f "ai-backend.*server.js" || true
# Optional: shut sim down
xcrun simctl shutdown E9A24CBA-D324-4723-B407-33B63959C783
```

**Do not wipe AsyncStorage by default** — the next run benefits from accumulated `wordProgress` state. Wipe explicitly with `xcrun simctl uninstall <UDID> com.arabreezy.app` only when testing the cold-start path.

If you used the auth-bypass override, **remove the 3-line block from `.env.local`** before committing anything.

## Critical interaction conventions

These rules come from real runs against this codebase. Read them before the first tap.

### Coordinate basics
- **Screen size: 402×874 pt** for iPhone 16 Pro. The screenshot file is 3× retina (1206×2622 px). Divide image pixels by 3 to convert to point coordinates that `mobile_click_on_screen_at_coordinates` accepts.
- When in doubt, `mobile_save_screenshot` then `sips --cropToHeightWidth H 1206 --cropOffset Y 0 file.png --out crop.png` to locate a button. Coordinates from the cropped image: `point_y = (offset + cropped_y) / 3`.

### `mobile_list_elements_on_screen` is incomplete
It systematically **omits React Native `<Button>` and `<TouchableOpacity>` elements that lack an accessibility label**. The "Sign in" black button, "Create one" link, "Next" button on placement, and "Continue" on lessons all fail to appear in the dump. You must:
1. Take a screenshot.
2. Eyeball the position (or crop with `sips`).
3. Tap by coordinates.

See [coords-cheatsheet.md](./coords-cheatsheet.md) for known-good coordinates per screen.

### Tap behavior
- A second tap on a textfield does NOT clear it — it appends or moves the cursor. So typing twice in a password field produces a doubled string. **Don't re-tap a field to retype.** Terminate the app and relaunch (`mobile_terminate_app` then `xcrun simctl openurl`) for a clean state.
- A tap below the active keyboard goes to the underlying view. To dismiss the keyboard, tap a non-interactive area like the screen title (e.g. (200, 250) on most screens).
- Arabic text uses a custom `<ArabicText>` (`src/components/ArabicText.js`). It renders RTL and almost never appears in the elements dump. Use **screen coordinates** for Arabic-only buttons.

### App nav
- The bottom tab bar is a custom `FloatingTabBar` (`src/navigation/FloatingTabBar.js`). Tap centers in points (screen width 402, 4 tabs):
  - Home tab: (50, 830)
  - Activities tab: (150, 830)
  - Progress tab: (250, 830)
  - Settings tab: (350, 830)
- Every full-screen modal (Lesson, Flashcards, Story Reader, Listening, etc.) has a **close X at (368, 111)**. Tap it to exit.
- Activity cards on the Activities tab are arranged in a 2-col grid starting at y=300, row height ~130 pt:
  - Row 1: How Arabic works (100, 340) | Lessons (300, 340)
  - Row 2: Flashcards (100, 490) | Stories (300, 490)
  - Row 3: Listening (100, 620) | Guided conversation (300, 620)
  - Row 4: Shadowing (100, 750) | Pronunciation (300, 750)
  - Scroll up: Grammar | Idioms | Roots | Chat | Voice tutor (see cheatsheet)

### Permissions
- First Voice Tutor launch shows: "Arabreezy Would Like to Access the Microphone". Tap **Allow at (274, 525)**.
- Once allowed, the OS remembers. Wipe with `xcrun simctl privacy <UDID> reset microphone com.arabreezy.app` to re-test the permission prompt path.

### Email confirmation friction
Supabase rejects `.test`, `.invalid`, and other non-deliverable TLDs at sign-up. It also imposes a per-IP email rate limit (~3 sign-ups per IP per ~10 min). Use:
- `ethandhoppe+<tag>@gmail.com` — Gmail + aliases all route to one inbox.
- `<tag>@ingenuitylabs.net` — operator's domain.

The confirmation email arrives in Gmail; clicking the link automatically signs the app in (the EmailVerificationScreen polls every 3s via `signInWithPassword`).

If the rate limit triggers ("Sign up failed — email rate limit exceeded"), either wait 10 minutes or switch to auth-bypass mode for the smoke.

## Companion files

- [setup.md](./setup.md) — verbose sim/server/build setup, troubleshooting, env layout.
- [coords-cheatsheet.md](./coords-cheatsheet.md) — known-good iPhone 16 Pro coordinates per screen.
- [activities/](./activities/) — one playbook per activity with exact selectors and assertions.
- [known-issues.md](./known-issues.md) — gotchas encountered in real runs.
- [screenshots/](./screenshots/) — baseline images from the last green run; diff against these on regression hunts.
