# Known issues — observed during real E2E runs

Update this file every run. The next person (or future you) shouldn't re-discover the same gotcha.

## mobile-mcp behavior

### `mobile_list_elements_on_screen` is incomplete on RN
- Drops RN `<Button>` and `<TouchableOpacity>` that lack `accessibilityLabel` — affects "Sign in", "Create one", "Next" (placement), "Continue" (lesson), "Start conversation" (voice tutor), and most rating buttons.
- The Arabic `<ArabicText>` component (`src/components/ArabicText.js`) almost never appears.
- **Workaround:** screenshot + coordinate tap. See `coords-cheatsheet.md`.

### `mobile_open_url` rejects custom schemes
- Blocks `exp+arabreezy://` (the Expo dev launcher scheme).
- **Workaround:** use `xcrun simctl openurl <UDID> "exp+arabreezy://..."` from Bash.

### Tap on a textfield does not clear it
- Typing twice into a SecureTextField appends — produces a doubled password. The dump shows 42 bullets instead of 21.
- iOS simulator + mobile-mcp do not expose a "select all + delete" shortcut. Cmd+A via AppleScript requires Accessibility permissions which the harness doesn't grant.
- **Workaround:** If you mis-type, `mobile_terminate_app` then `xcrun simctl openurl` to relaunch; fields reset.

## Supabase Auth

### Sign-up rejects non-deliverable email domains
- `.test`, `.invalid`, `.local`, and any TLD without a real MX record → "Email address '<x>' is invalid".
- Confirmed working: `*@gmail.com` (use `+` aliases — they all route to one inbox), `*@ingenuitylabs.net` (operator's own domain).

### Email rate limit
- Supabase enforces a per-IP outbound email rate limit (~3 sign-ups in ~10 min).
- Manifests as: "Sign up failed — email rate limit exceeded".
- **Workaround:** wait 10 min, OR use the admin REST API (`POST /auth/v1/admin/users` with `email_confirm: true`) which skips the email send, OR auth-bypass mode (see `setup.md`).

### EmailVerificationScreen polls but doesn't show a confirm-now button
- The screen polls `signInWithPassword` every 3 s — when the user clicks the link in their inbox, the next poll sees the session and routes past auth automatically.
- There's no in-app "I've confirmed, retry now" button. Re-tapping "Resend email" sends another mail (counts against the rate limit).

## App layout / content

### Phase-4 dialect bundle has empty Pronunciation, Grammar, and Idioms
- All three screens render but show "No <activity> ... for this phase yet."
- This is a **content gap**, not a code bug. To verify the activity logic works, set the test user to a phase where content exists.
- Per `CLAUDE.md`: "Only the Saudi bundle is populated. Levantine and Fusha are empty stubs."

### Auth bypass loses Supabase content
- Setting `EXPO_PUBLIC_SUPABASE_URL=""` flips `isSupabaseConfigured` → false → `useSupabaseContent` → false → `bundleBackend.js` is used instead of `supabaseBackend.js`.
- Bundled content (`src/data/dialects/saudi/`) is smaller than the Supabase tables (~2,942 Saudi words live in Supabase per memory; bundled has a subset).
- **Trade-off:** auth bypass is fast and frictionless but skips Supabase-content code paths. Run with real auth at least once per release.

## Voice Tutor / WebRTC

### First launch requires mic permission grant
- Native iOS prompt "Arabreezy Would Like to Access the Microphone" appears the first time only.
- Tap Allow at (274, 525). Reset for re-testing: `xcrun simctl privacy <UDID> reset microphone com.arabreezy.app`.

### Bundle-level WebRTC warning at Metro startup
- `event-target-shim` import warning from `react-native-webrtc/node_modules/event-target-shim` — harmless, the file-based resolution fallback works. Don't try to fix.

## Build / Metro

### Port 8081 collision with English app
- The Arabreezy dev client MUST run on Metro port 8082 — port 8081 is reserved for the English app at `../Englishlearning`.
- `expo run:ios` defaults to spawning its own Metro on 8081 unless `--no-bundler` is passed and `RCT_METRO_PORT=8082` is exported.
- If you see the app stuck on a white screen, check that the dev launcher URL points to `:8082`, not `:8081`.

### `expo run:ios` opens with port 8081 even with RCT_METRO_PORT=8082
- The env var influences the build but the opening URL comes from the CLI defaults.
- **Workaround:** after the build finishes, force-launch with the right URL:
  ```
  xcrun simctl openurl <UDID> "exp+arabreezy://expo-development-client/?url=http%3A%2F%2F<LAN-IP>%3A8082"
  ```

## Tab nav

### `FloatingTabBar` tab targets are small
- Custom bar at the bottom of the screen, ~64 pt tall, 4 equal-width tabs (so each tap target is ~100 pt wide).
- Tapping by tab label or icon via the elements dump misses often; use raw coordinates from `coords-cheatsheet.md`.
