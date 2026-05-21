# E2E Setup — boot sim, start servers, install/launch app

Copy-paste sequence. Times assume the build is incremental (cold build = +5–10 min for CocoaPods).

## 0. One-time

```bash
# Verify Xcode + simulators
xcrun simctl list devices available | grep "iPhone 16"

# In Arabreezy repo root, install deps if first time
npm install
(cd ai-backend && npm install)

# Build the dev client at least once — produces .app in DerivedData
RCT_METRO_PORT=8082 npx expo run:ios \
  --device "E9A24CBA-D324-4723-B407-33B63959C783" \
  --no-bundler
```

The `--no-bundler` flag stops `expo run:ios` from spinning up its own Metro on the wrong port (default 8081 collides with the English app).

## 1. Boot the simulator

```bash
xcrun simctl boot "E9A24CBA-D324-4723-B407-33B63959C783" 2>/dev/null || true
open -a Simulator
```

Confirm via mobile-mcp:
```
mobile_list_available_devices
# expect: state: "online", platform: "ios", version: "18.3"
```

## 2. Start Metro + ai-backend

```bash
# Metro on 8082 (English app owns 8081)
npx expo start --dev-client --port 8082 > /tmp/arabreezy_metro.log 2>&1 &

# ai-backend on 8787
(cd ai-backend && npm run dev) > /tmp/arabreezy_ai_backend.log 2>&1 &

# Verify both up (give it ~5s)
sleep 5
lsof -nP -iTCP:8082 -sTCP:LISTEN  # Metro
lsof -nP -iTCP:8787 -sTCP:LISTEN  # ai-backend
```

If port 8082 is busy: `pkill -f "expo start --dev-client --port 8082"` and retry.

## 3. Auth-bypass override (optional, fast path)

Append to `.env.local`:
```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_USE_SUPABASE_CONTENT=false
```

Restart Metro so the new env is read:
```bash
pkill -f "expo start --dev-client --port 8082"; sleep 1
npx expo start --dev-client --port 8082 > /tmp/arabreezy_metro.log 2>&1 &
```

Verify the bundle picked up the blanks:
```
tail -f /tmp/arabreezy_metro.log
# expect: "[supabase] Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY"
```

The app now runs in local-only mode: bundled content from `src/data/dialects/saudi/`, AsyncStorage instead of Supabase `user_progress`. The ai-backend still works because `ALLOW_ANON=true`.

**Remove these 3 lines from `.env.local` before committing.**

## 4. Launch the app

```bash
# Get the LAN IP — required because the sim hits Metro over LAN, not localhost
LAN_IP=$(ifconfig | awk '/inet 192/ {print $2; exit}')
echo "LAN_IP=$LAN_IP"

xcrun simctl openurl "E9A24CBA-D324-4723-B407-33B63959C783" \
  "exp+arabreezy://expo-development-client/?url=http%3A%2F%2F$LAN_IP%3A8082"
```

**Why `xcrun simctl openurl` not `mobile_open_url`:** mobile-mcp blocks non-http URL schemes. The Expo dev launcher uses `exp+arabreezy://`.

Wait ~8 seconds for Metro to bundle, then take a screenshot. The expo-dev-launcher dev menu sheet often shows the first time — dismiss with `mobile_click_on_screen_at_coordinates(device, 350, 397)` (the X close button, not the Continue button which is INSIDE the sheet).

## 5. Set up a real Supabase test user (only if NOT using bypass)

### Option A: via Supabase Studio UI
1. Open https://supabase.com/dashboard/project/sgvalritfnyiwxjwpqjj/auth/users
2. Click "Add user" → "Create new user"
3. Email: `e2e@ingenuitylabs.net`, Password: `E2eTest!Arabreezy2026`, **check "Auto Confirm User"**
4. Sign in via the app's SignIn screen using those creds.

### Option B: via Supabase admin REST API
```bash
URL="https://sgvalritfnyiwxjwpqjj.supabase.co"
KEY="sb_secret_..."  # from .env.local SUPABASE_SECRET_KEY
EMAIL="e2e@ingenuitylabs.net"
PW="E2eTest!Arabreezy2026"

curl -s -X POST "$URL/auth/v1/admin/users" \
  -H "apikey: $KEY" -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PW\",\"email_confirm\":true}"
```

Sign-up domains that Supabase **rejects**: `.test`, `.invalid`, `.local`, any TLD it can't MX-resolve. Sign-up domains that work: gmail.com (use + aliases), real owned domains (ingenuitylabs.net).

Rate limit: ~3 sign-ups per source IP per 10 min, applied at the email-send step. If hit, wait or use the admin REST API which skips the email send.

## 6. Tear-down

```bash
pkill -f "expo start --dev-client --port 8082" || true
pkill -f "ai-backend.*server.js" || true
# Optional: shut sim down
xcrun simctl shutdown E9A24CBA-D324-4723-B407-33B63959C783
```

Wipe AsyncStorage (cold-start test): `xcrun simctl uninstall E9A24CBA-D324-4723-B407-33B63959C783 com.arabreezy.app` then re-run `expo run:ios` to reinstall.

Reset mic permission: `xcrun simctl privacy E9A24CBA-D324-4723-B407-33B63959C783 reset microphone com.arabreezy.app`.
