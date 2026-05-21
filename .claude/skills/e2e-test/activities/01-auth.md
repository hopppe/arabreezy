# 01 — Auth (sign-up / sign-in / Apple)

**Source:** `src/screens/auth/SignInScreen.js`, `SignUpScreen.js`, `EmailVerificationScreen.js`, `src/context/AuthContext.js`
**ai-backend:** none (auth goes direct to Supabase GoTrue)
**Supabase:** writes `auth.users` (sign-up), reads on sign-in

## Pre-state
- App freshly launched with real-auth mode (no `EXPO_PUBLIC_SUPABASE_URL=""` override).
- `RootNavigator` routes to `AuthNavigator` because `isConfigured && !session === true`.

## Happy path — Email sign-up + confirm

1. App opens to SignIn (`Welcome back` title).
2. Tap "Create one" at **(250, 667)** → SignUp screen (`Create an account`).
3. Tap email field (201, 325). Type `e2e@ingenuitylabs.net`.
4. Tap password field (201, 415). Type `E2eTest!Arabreezy2026`. **Do not re-tap the field — typing appends.**
5. Dismiss the keyboard: tap title area (200, 250).
6. Tap "Create account" at (201, 480).
7. Expect: navigates to EmailVerificationScreen ("Check your inbox" + spinner).
8. **Manual step:** open Gmail at ethandhoppe@gmail.com, click the confirmation link. The app polls every 3 s via `signInWithPassword` and routes through to PlacementIntro once it sees the session.
9. **Or:** use the Supabase admin REST `PUT /auth/v1/admin/users/<id>` with `{"email_confirm": true}` to flip the flag, then wait for the next poll tick.

## Happy path — Sign in (existing confirmed user)

1. Tap email field (201, 325). Type `e2e@ingenuitylabs.net`.
2. Tap password field (201, 415). Type the password.
3. Tap "Sign in" at (201, 478).
4. Expect: routes through to PlacementIntro (if first time) or TabNavigator/Home.

## Apple Sign-In (iOS sim)

1. Tap "Continue with Apple" at (201, 580).
2. Expect: native sheet, then either auth completes (if sim has an Apple ID) or alert "Apple sign in failed — The authorization attempt failed for an unknown reason." → tap OK at (200, 510).

Bare simulators have no Apple ID, so failure is expected. To test the success path you need a sim signed into iCloud (Settings → Sign in to your iPhone).

## Failure paths to verify

- **Invalid email**: type `foo@bar.test`, tap Create account → "Sign up failed — Email address '...' is invalid"
- **Short password**: type 5-char password → app-side alert "Check your details — Enter an email and a password of 6+ characters."
- **Wrong password on sign in**: → "Sign in failed — Invalid login credentials"
- **Rate limit**: 3+ sign-ups in 10 min → "Sign up failed — email rate limit exceeded"

## Assertions
- UI: post-auth → either PlacementIntro or TabNavigator/HomeScreen renders.
- Supabase: `SELECT id, email, email_confirmed_at FROM auth.users WHERE email = '<EMAIL>'` returns 1 row with `email_confirmed_at` NOT NULL after sign-in.

## Recovery
- Wipe session: from Settings tab tap "Sign out" (when in TabNavigator); or `xcrun simctl uninstall <UDID> com.arabreezy.app` and reinstall.
