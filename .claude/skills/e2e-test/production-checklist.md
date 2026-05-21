# Arabreezy production-readiness checklist

Derived from a research pass on the actual codebase. ~140 concrete tests across 12 categories. Use this as the source-of-truth before tagging any release.

> Top 10 highest-risk items appear at the end. If your time is bounded, hit those first.

## 1 — Functional

### Auth & gating
- Cold boot with `isSupabaseConfigured=true` and no session → AuthNavigator/SignIn.
- Cold boot with `isSupabaseConfigured=false` → straight to Placement or Tabs.
- Splash holds until `useAuth().loaded && useUserProgress().loaded && useDialect().loaded`. Kill any one provider, confirm gate doesn't stick forever.
- Sign-in success → RootNavigator flips from AuthNavigator to Placement (if incomplete) or TabNavigator.
- SignUpScreen → EmailVerification polls every 3s via `signInWithPassword`; auto-advances on confirm.
- Apple Sign-In button only when `appleAvailable === true`.
- Google Sign-In button only when `isGoogleConfigured`. Verify "module not available" path when native binding is missing.

### Placement
- Intro → Question → Result rendered.
- Choices shuffled per render (per `PlacementQuestionScreen.js`).
- `completePlacement({score,placedPhase})` writes `progress.placement.completed=true`.
- If `placedPhase >= 3`, primer auto-suggested next.
- Re-take via Settings clears `placement.completed`, preserves lesson history.

### TabNavigator
- 4 tabs via FloatingTabBar: HomeTab, ActivitiesTab, ProgressTab, SettingsTab.
- Per-tab stack state preserved across tab switches.
- Every screen in `activityScreens` reachable from at least one tab (Lesson, LessonsList, Flashcards, GuidedConversationPicker, GuidedConversation, Shadowing, Stories, StoryReader, Listening, Idioms, Grammar, Pronunciation, Chat, VoiceChat, Roots, RootFamily, Primer).
- Close X (368, 111) dismisses every modal-style activity.

### Per-activity happy paths (16)
- **Primer**: 3 lessons completable, marks `lessonsCompleted` with `primer:root-system`.
- **Lessons**: Intro → words → dialogue → check → completion. `completeLesson` writes lesson id, advances phase when last lesson at phase finishes.
- **Flashcards**: deck = current-lesson focal + completed-at-phase focal + custom words. Ratings 1/2/3/4 call `applyRating`, mutate `wordProgress[id]`.
- **Guided Conversations**: picker → conversation → completion writes `convo:<id>` to `lessonsCompleted`.
- **Shadowing**: phrases play (TTS), record, score; phase-keyed `shadow:<phase>` completion marker.
- **Stories**: Phase-filtered list, paragraph tap-to-translate via `wordMappings`, comprehension questions.
- **Listening**: segments scrub, `mainIdeaQuestions` + `sectionQuestions` answer, audio playback.
- **Idioms**: phase-gated (≥8), quiz format varies (transparent / semi-opaque / opaque).
- **Grammar Practice**: drill prompts render, scoring works.
- **Pronunciation**: record → /api/stt → score, Phase ≥4 only.
- **Chat (text)**: message → /api/chat → Arabic+English; `[END_CONVERSATION]` handling.
- **Voice Tutor**: mic prompt → `/api/realtime/session` → SDP handshake → "Live — talk away".
- **Roots**: list at phase, tap → family screen with dialect-sorted derivations.
- **Settings**: every card (Streak, Reminders, Phase, Dialect, Learning, Account, Support, About, Reset) functional.

### Home
- Active lesson = `currentLesson || nextSuggestedLesson`.
- Daily review cards reflect real completion state — NO midnight reset.
- Streak: `currentStreak` advances exactly once per local day; resets to 1 after a gap.

### Progress
- Phase, lessons completed, longest streak read correctly from `progress`.
- Word breakdown (new/learning/review/known) sums to touched words.

## 2 — Content correctness

### Supabase ↔ UI mapping (`backend/supabaseBackend.js`)
- Every `*FromRow` mapper covers every column the UI consumes (lessons.focalWordIds, idioms.choices/sentenceChoices, stories.wordMappings, listening.segments/sectionBreaks, etc.).
- **BUG candidate**: `idiomFromRow` maps `meaningArabic: row.meaning_english` — verify intentional or typo.

### Cross-dialect word-id stability (CLAUDE.md HARD rule)
- For every Saudi word_id, if Levantine/Fusha rows exist, only `script`/`transliteration`/`notes` differ; `phase`/`english`/`rootRef` MUST match.
- Switching dialect MUST NOT clear `progress.wordProgress` — SRS keyed by stable word_id.

### Phase difficulty audit per `docs/phase-difficulty-standards.md`
For each phase 1-10:
- Lesson count matches table (P1: 3-5, P2: 3-4, P3: 4, P4: 5, P5: 3, P6-10: 4).
- Words-per-lesson within band.
- `focal_word_ids.length >= 6` (CLAUDE.md hard rule).
- `focal_word_ids` only reference words with `word.phase <= lesson.phase` (load-bearing).
- Shadowing phrase / story / listening counts match table.
- Idioms zero at Phase 1-7 (hard gate).
- Tashkeel rule: P1-3 full, P4-6 focal only, P7+ bare.
- Transliteration rule: P1-4 always shown, P5-7 focal only, P8-10 tap-to-reveal.
- No MSA-only content at Phase 1-4 (Saudi register required).
- Grammar ceiling per phase (no past tense before P7, no passive before P9).
- `semanticDrift` tag on every word; `some`/`large` words have `driftNote`.

### Asset URLs
- Every `word.imageUrl`, `story.audioUrl`, `word.audio`: HEAD returns 200 with sane Content-Type.
- TTS cache directory created on first speak, file written, second speak hits cache.

### Bundle parity
- Levantine/Fusha bundles export correct shape (id, name, rtl, words, lessons, ...) even if empty arrays.
- Switching to an empty dialect bundle does not crash any screen.

## 3 — Network / backend

### `/api/chat`
- 200 happy path with `history`, `dialect`, `phase`, optional `scenarioKey/Title/Description`, `includeSuggestions`.
- 400 `history_required` on missing/empty history.
- 400 on payload >256kb.
- 401 `missing_token` / `invalid_token` when Bearer absent/stale.
- 502 `empty_completion` / `malformed_completion` when OpenAI errors.
- 429 rate-limit at 61 req in <60s.
- Cold-start p95 < 2.5s with gpt-4o-mini.
- `[END_CONVERSATION]` token ends session correctly.

### `/api/tts`
- 200 returns `audio/mp3`, plays via expo-audio.
- 400 `text_required` / `text_too_long` (>1500 chars).
- Voice fallback to `nova`; format fallback to `mp3`.
- `Cache-Control: public, max-age=86400` header set.
- File written under `FileSystem.cacheDirectory/audio/<sha256>.mp3`.
- 502 propagates OpenAI TTS errors.
- iOS audio mime not CSP-blocked by helmet.

### `/api/stt`
- 200 with .m4a ≤25MB → `{text: "..."}` Arabic.
- 400 `file_required`.
- 25MB multer limit enforced.
- `language` defaults `ar`, accepts override.
- Empty Whisper response handled.

### `/api/realtime/session`
- 200 returns `{clientSecret, expiresAt, model}`.
- 502 `no_client_secret` when OpenAI response malformed.
- `clientSecret` short-lived; expiration handled.
- Voice fallback to `alloy`.
- Subsequent SDP handshake to `https://api.openai.com/v1/realtime?model=...` succeeds.
- WebRTC mic/remote audio tracks flow; data channel `oai-events` opens.

### `/api/word-search`
- 400 on missing/empty/`>500` chars query.
- Source-language auto-detect (Arabic vs English).
- `unsupportedLanguage` fallback.
- `isLikelyTypoFix` preserves original term.
- `saveable=true` only when English ≤60 chars / ≤6 words.
- Saving via `addCustomWord` creates `cw_*` entry.

### `/health`
- 200 `{ok, service, time}` for uptime monitor.

### Express server
- helmet, compression, cors headers set.
- 256kb JSON limit enforced.
- Rate limit (60/min/IP) → 429.
- 404 returns `{error:'not_found', path}`.
- Unhandled error → `errorHandler` returns sanitized message, no stack leak.
- `trust proxy 1` so IP-based rate limit works behind LB.

### Supabase reads
- All 10 content tables: anon-key SELECT returns rows (public-read RLS).
- `*From*` mappers return null/empty on absence, never throw.
- `getAllWords({dialect:'saudi'})` ~2,200 rows in <1s.

### Supabase writes
- `fetchUserProgress` returns null for new user.
- `pushUserProgress` upserts on `user_id`; debounced 800ms.
- `logActivityRemote` inserts into `activity_log`.
- All no-op when `!canSync(userId)`.
- RLS denies user A read/write of user B's `user_progress` / `activity_log`.

### Offline
- Cold start with no net + `EXPO_PUBLIC_USE_SUPABASE_CONTENT=false`: AsyncStorage serves bundle content; app usable.
- TTS cached audio plays.
- Chat/Voice/STT show user-visible error, not silent failure.
- After reconnect, debounced `pushUserProgress` flushes pending.

## 4 — Auth / session
- Sign-up with `+alias@gmail.com`.
- Email rate-limit (~3/IP/10min) UI surfaces friendly error.
- Sign-up rejects `.test`/`.invalid` TLDs.
- Sign-in with valid creds → session populated.
- Sign-in wrong password → error rendered, no crash.
- EmailVerificationScreen polls; "Resend email" works.
- Apple sign-in nonce flow correct; Supabase accepts `identityToken`.
- Google sign-in requires reverse-client-id config; failure mode when iosUrlScheme is placeholder.
- Sign-out from Settings clears session, returns to AuthNavigator, runs `GoogleSignin.signOut()` when applicable.
- Session refresh after >1hr (Supabase token lifetime) via `onAuthStateChange`.
- Expired token → /api/chat 401 → client surfaces "session expired, please sign in".
- Cross-device sign-in fetches `user_progress` and reconciles (remote with `placement.completed` or `lessonsCompleted.length>0` wins; else local pushes up).
- RLS owner-only on `user_progress`/`activity_log`/`chat_sessions`.
- Delete account opens mailto with user.id/email.

## 5 — Permissions
- Mic (iOS): native prompt on first Voice Tutor / Shadowing / Pronunciation with `NSMicrophoneUsageDescription` from `app.config.js`.
- Deny mic → graceful in-app error, never crash.
- Reset via `xcrun simctl privacy <UDID> reset microphone com.arabreezy.app`.
- Android `RECORD_AUDIO` / `MODIFY_AUDIO_SETTINGS` prompt on first record.
- Camera permission string present but never triggered (Voice Tutor must NOT request camera).
- Notifications: first Reminders toggle invokes `ensurePermission()`; denial alert; grant schedules daily.
- Daily reminder fires at `reminderTime` (test +1 min).
- Toggling off cancels scheduled.
- Android `arabreezy-reminders` channel with `DEFAULT` importance.

## 6 — Performance
- Cold start TTI <2.5s on iPhone 12+.
- Production bundle size budget (target <8MB JS).
- Activities-grid → activity transition stays 60fps.
- RootsListScreen + StoryListScreen scroll on high-phase data — no dropped frames.
- 10-min sustained Voice Tutor: no >50MB memory growth; close returns memory.
- TTS cache directory bounded (add LRU eviction).
- `getAllWords({dialect:'saudi'})` doesn't block UI.
- `scheduleRemotePush` 800ms debounce — burst of `rateCard` coalesces into one Supabase upsert.
- `FlashcardContext.deck` memoized correctly.
- Rating a flashcard doesn't re-render ActivitiesScreen.
- WebRTC no mic-track leaks on backgrounding.
- Realtime ICE gathering <3s on cellular.

## 7 — Accessibility
- VoiceOver: every interactive element has `accessibilityLabel`. Audit: SignIn buttons, Create one, Next, Continue, FloatingTabBar, Activities grid cards, Close X.
- `<ArabicText>` writingDirection/textAlign correct; VoiceOver reads Arabic in correct direction with Arabic voice.
- No Arabic in plain `<Text>` (audit).
- Dynamic type AX5 readable; no truncation hiding function.
- Accent `#FF5A1F` on white passes WCAG AA for button text.
- Settings focus order top-to-bottom.
- Hit targets ≥44pt on primary actions, especially FloatingTabBar.
- ProgressScreen charts have text equivalents.

## 8 — State / data integrity
- No mutation in any Context (audit for `progress.x =` and `.push(`).
- 800ms `pushUserProgress` debounce: 10 rapid `rateCard` → 1 upsert.
- Lesson-is-the-unit: app kill mid-lesson → `currentLessonId` restored; lesson resumable. NO midnight refresh in code (grep `setInterval` in contexts).
- Word ids stable across dialect switch: complete a Saudi lesson, switch to Fusha, switch back to Saudi → `wordProgress` preserved.
- SRS scheduler pure: `applyRating(prev, rating)` returns new object. Node-REPL fixture tests.
- `isDue` correctness: words with past `nextReviewAt` or `new`/`learning` appear in deck.
- Streak edge cases: same-day no advance; yesterday+today +1; 2-day gap reset to 1; timezone shift uses local `todayISO()`.
- `customWords` dedup (same script same dialect → no duplicate).
- `activityLog` cap at 200, oldest dropped.
- `setPhase` clamps 1..10; jumping phase clears `currentLessonId`.
- `resetAll` wipes AsyncStorage AND pushes default to Supabase.
- Reconcile race: sign-in immediately on launch while local writes pending → no lost writes.
- AsyncStorage shape migration: old user without `customWords` merges with defaults correctly.

## 9 — Visual / layout
- Every phase 1-10: open Lessons, Stories, Listening, Idioms, Shadowing — render without crash.
- RTL Arabic dialogue lines right-aligned; mixed AR/EN punctuation order correct.
- Light theme only (`userInterfaceStyle: 'light'`); no dark-mode artifacts when OS is dark.
- iPhone notch / Dynamic Island: SafeAreaProvider wraps tree; status bar not overlapped.
- FloatingTabBar above home indicator; tap targets clear of swipe-up.
- FlashcardScreen rating buttons not cut on iPhone SE or iPad.
- Orientation locked portrait — rotation doesn't break layout.
- iPad: Activities grid uses appropriate columns.
- Splash displays correct asset and dismisses cleanly.
- App icon + adaptive icon foreground render on Android 8+.
- Accent color only on buttons/highlights/illustrations.

## 10 — Edge cases
- Empty states: Phase 1 idioms, Phase 1-2 stories, Levantine/Fusha activities, zero `wordProgress` → no crash.
- Phase 4 idioms/grammar/pronunciation when reading bundle (stale) — currently empty but Supabase has 22/22/23 rows; ensure the bypass path doesn't ship to prod.
- Very long Arabic strings: Phase 10 shadowing (10 words), 30-word comprehension stems wrap correctly.
- Special characters: hamza, sukun, shaddah, emoji, nun ghunna ligatures render.
- All-phases sweep at phases 1, 2, 3, 5, 6, 7, 8, 9, 10 (currently only 4 + 10 verified).
- Network flake mid-Chat: timeout, retry, no zombie loading.
- AsyncStorage corruption → falls back to DEFAULT_PROGRESS.
- Date crossing midnight: activity at 23:59:59 + 00:00:01 → +1 streak (not +2).
- Timezone shift >12hr → `lastActiveDate` comparison still correct.
- Rapid double-tap on Continue: no double-complete (idempotency).
- App backgrounded mid-WebRTC → reconnect or "session ended".
- Lock device during TTS → background-audio policy.
- Headphone plug/unplug during Voice Tutor doesn't crash WebRTC.
- User deleted from Supabase Studio → app handles missing `user_progress` gracefully.
- Schema column added in Supabase without app update → mappers default missing fields.
- `focal_word_ids` references nonexistent word_id → `getWords` skips with `.filter(Boolean)`.

## 11 — Build / release
- EAS Dev/Preview/Prod builds complete; TestFlight upload succeeds.
- `expo-doctor` clean; `npx expo install --fix` reports no drift.
- Info.plist `NSMicrophoneUsageDescription` set; not generic.
- `usesAppleSignIn: true` adds Capability and entitlement.
- AndroidManifest has `RECORD_AUDIO`, `MODIFY_AUDIO_SETTINGS`, `INTERNET`.
- Bundle ID `com.arabreezy.app` consistent iOS + Android.
- Adaptive icon background `#FF5A1F` + foreground.
- Splash image displays on cold start.
- `scheme: arabreezy` opens app via deep link.
- OTA update on production channel ships JS-only change.
- `app.config.js version` bumped before submission.
- Apple Privacy Manifest declaring data categories: email, user content.
- Sourcemaps uploaded for crash trace decoding.
- Prod `.env`: `EXPO_PUBLIC_AI_BACKEND_URL` is prod URL; `EXPO_PUBLIC_USE_SUPABASE_CONTENT=true`; production Supabase keys.
- OpenAI key NEVER in mobile bundle — grep `sk-` in built bundle.
- ai-backend deployed with `ALLOW_ANON=false` in prod, Supabase env set, healthcheck pinged.
- CORS allowlist restricted in prod.
- TLS in front of ai-backend.
- Backend logs scrubbed of PII / OpenAI completions.

## 12 — Arabreezy-specific
- Backend façade rule: grep `from '../data/dialects/` in `src/screens/` and `src/context/` → only `DialectContext.js` allowed.
- All AI calls via `src/config/aiBackend.js` — grep `fetch('https://api.openai.com'` outside `ai-backend/` and `src/services/realtime.js`.
- Bearer token attached on every AI request: `postJson`/`postBinary`/`postMultipart` set `Authorization: Bearer <supabase access token>`.
- `Constants.expoConfig.hostUri` LAN-IP derivation in dev.
- Metro on 8082, not 8081 (English app territory).
- Storage namespace `@arabreezy/*` only.
- Primer gating: user at `placedPhase >= 3` who hasn't completed primer sees featured card on Activities.
- Translate & Save → custom word with same SRS as bundled.
- Stories audio missing → reader falls back to text-only.
- Listening `answerSegments` enforces segment-locality of questions.
- `chat_sessions` RLS owner-only.
- i18n: all UI strings in `src/i18n/en.js` (audit SettingsScreen for hard-coded English).
- Switch reminders state persists across restart.
- Android DateTimePicker modal vs inline behavior.
- Mailto links encode subject+body correctly.
- Privacy/Terms URLs `https://arabreezy.app/privacy` + `/terms` reachable.
- Support email MX configured.
- App Store / Play Store metadata (screenshots, description, keywords, age rating 4+).
- Privacy Nutrition Labels declare Microphone, Email, UGC.
- GDPR / data deletion path → manual or automated `DELETE FROM user_progress WHERE user_id = ?`.
- `expo-dev-client` NOT shipped to prod (verify in `app.config.js`).
- `expo-apple-authentication` plugin needed if Sign in with Apple ships.
- `@react-native-google-signin/google-signin` placeholder `iosUrlScheme` doesn't crash prod (replace with real reverse-client-id).
- `newArchEnabled: true` — all native deps Fabric-compatible.
- iOS background audio capability if Voice Tutor / TTS should continue on lock.

## Top 10 highest-risk items

1. **Phase-difficulty drift in Supabase content** — `focal_word_ids` referencing words with `word.phase > lesson.phase` or an idiom at Phase 3 breaks pedagogy silently. SQL sweep before every release.
2. **Word-id instability across dialects** — anyone seeding Levantine/Fusha with new ids silently erases SRS progress on switch. CI check: every word_id in non-Saudi must also exist in Saudi.
3. **`idiomFromRow` mapping bug**: `meaningArabic: row.meaning_english` (`supabaseBackend.js:114`) — verify intentional vs typo.
4. **Voice Tutor WebRTC leaks** on backgrounding — mic track and PeerConnection must close. Confirm `useEffect` cleanup in `VoiceChatScreen.js`.
5. **Supabase JWT expiry** mid-`/api/chat` returns 401; client must surface "please sign in", not a generic error.
6. **`ALLOW_ANON=true` shipped to prod ai-backend** — anyone drains OpenAI key. Add env validator that refuses to boot if `NODE_ENV=production && ALLOW_ANON=true`.
7. **AsyncStorage / Supabase reconcile race** — Device B user rating cards before `fetchUserProgress` resolves loses local writes. Add a freeze-writes-until-reconcile guard.
8. **TTS / audio cache unbounded growth** under `FileSystem.cacheDirectory/audio/` — add LRU eviction.
9. **OpenAI key leakage** via direct `fetch('https://api.openai.com')` outside `ai-backend/`. CI grep must only flag `src/services/realtime.js`.
10. **`focal_word_ids.length < 6`** lessons (CLAUDE.md hard rule). DB CHECK constraint + CI SQL audit.
