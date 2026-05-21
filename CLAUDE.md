# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Arabreezy is an Arabic-learning app, Saudi-dialect first. Three moving pieces:

1. **Mobile app** — React Native / Expo SDK 54 (RN 0.81). Lives in repo root. Ten activities (Lessons, Flashcards, Guided Conversations, Shadowing, Stories, Listening, Idioms, Grammar Practice, Pronunciation, Chat + Voice Tutor). Curriculum is organised into **10 vocab-difficulty phases** (Phase 1 = Beginner → Phase 10 = Native).
2. **ai-backend** — Express server in `ai-backend/`. Proxies all OpenAI calls (chat / TTS / Whisper STT / Realtime ephemeral session). Verifies Supabase JWTs. The OpenAI key never enters the mobile bundle.
3. **Supabase** — project `sgvalritfnyiwxjwpqjj`. Holds auth + all content (10 tables, ~2,200 Saudi rows: words, lessons, conversations, shadowing, stories, listening, idioms, pronunciation, grammar, plus user_progress + activity_log).

> **⚠️ Content lives in Supabase, NOT in the repo.** `EXPO_PUBLIC_USE_SUPABASE_CONTENT=true` is the default — the app reads every word, lesson, story, idiom, grammar drill, etc. from the live Supabase project, not from `src/data/dialects/*`. If you're auditing content counts or quality, **query Supabase** (MCP `execute_sql` / `list_tables` against project `sgvalritfnyiwxjwpqjj`, or read the git-diffable mirror in `.claude/skills/e2e-test/content-backup/<table>/phase-N.md` produced by `scripts/dump_content_backup.mjs`). Reading the JS files in `src/data/dialects/saudi/` and reporting "only N items" is the most common false-positive in this repo — those files are an offline fallback only.

Read `PLAN.md` for product shape, `docs/folder-map.md` for the per-folder tour, `docs/decisions.md` for the why behind non-obvious choices, and **`docs/phase-difficulty-standards.md`** for the authoritative per-phase difficulty spec. Any time you're authoring or auditing content, check it against that doc — phase drift is the easiest way to wreck the app.

The source English app at `../Englishlearning` (sometimes called anaFluent) is the architectural reference; many activity shapes were ported from there. `docs/english-app-map.md` is the per-folder map of the source.

## Commands

```bash
# Mobile app (first time)
npm install
npx expo install --fix              # align Expo SDK 54 deps after edits

# Mobile dev server (Metro on :8082 — :8081 is reserved for the English app)
npx expo start --dev-client --port 8082

# Force a bundle compile to surface JS syntax errors without a connected device
curl "http://localhost:8082/index.bundle?platform=ios&dev=true&minify=false" > /dev/null

# AI backend (separate process, must be running for chat/audio/voice/STT)
cd ai-backend && npm install && npm run dev   # listens on :8787

# EAS dev/preview/prod builds (the app is NOT Expo-Go compatible)
npm run build:dev:ios
npm run build:dev:android
```

There are no tests, no lint config, and no CI yet.

## Mobile architecture — load-bearing ideas

### Provider stack (`App.js`)

Order matters. Each provider can only read providers above it.

```
SafeArea → GestureHandler → Theme → Language → Auth → Dialect →
  UserProgress → Subscription → Lesson → Unit → Flashcard → DailyReview →
  RootNavigator
```

Tabs: **Home** (daily review) · **Activities** · **Lessons** · **Settings**.

- **AuthContext** — Supabase auth session. `RootNavigator` gates the app behind `AuthNavigator` when Supabase is configured.
- **DialectContext** — picks `saudi` / `levantine` / `fusha`. Bundles live at `src/data/dialects/<dialect>/`.
- **UserProgressContext** — single source of truth for phase, current lesson, word SRS state, placement, streak, daily reminder. Reads from AsyncStorage on boot; reconciles with Supabase `user_progress` once authed (see `backend/userProgress.js`); writes are debounced 800ms.
- **LessonContext / FlashcardContext / DailyReviewContext** — derived from `UserProgressContext` + content via the backend façade. `DailyReview` is computed on the fly from `currentLesson` + `wordProgress`; **there is no midnight refresh**.

### The unit-is-the-unit model (replaces lesson-is-the-unit, 2026-05-20)

The source English app reset "daily plans" at midnight. Arabreezy now uses a **unit** as the unit of progression. A unit = 8 words the learner is currently learning, flowed through five steps:

```
selecting → memrise → story → rotation → chat → complete
```

- **selecting**: `WordSelectionScreen` shows 8 cards (the next 8 phase-N words sorted by `word_id`). User taps any they already know → `applyRating(prev, 4)` ("easy") and the slot fills from the master list. Lock-in advances to `memrise`.
- **memrise**: `UnitMemriseScreen` wraps the existing `MemrisePhase` filtered to un-tapped focals.
- **story**: `LessonStoryScreen` calls `POST /api/lesson/generate-story` with the 8 focals + phase. AI returns Saudi Arabic story + comprehension MCQ.
- **rotation**: `UnitRotationScreen` round-robin picks one of {Listening, Shadowing, Guided Conversation} (driven by `progress.unitsCompletedCount % 3`).
- **chat**: `UnitChatScreen` wraps `ChatScreen` with `requiredWords` = the 8 focals; user types until each is checked off; finishing fires `finishCurrentUnit()`.

Source-of-truth state lives on `progress.currentUnit` (UserProgressContext) with `{words[8], step, startedAt, generatedStory, rotationActivity}`. `progress.unitCursor[phase]` tracks how many words at each phase the user has cleared. On unit completion the cursor advances and (when every phase-N word is covered) the phase bumps.

The old `currentLessonId` / `lessonsCompleted` fields are kept on `UserProgressContext` for backwards compat but are not used by the new flow. `LessonScreen` still works for any legacy entry points; the new `unit/*` screens are the primary path.

If you're tempted to add a daily-refresh timer, you're solving the wrong problem — re-read `DailyReviewContext`.

### Backend façade (`backend/localBackend.js`)

Screens and contexts never read bundled JSON or AsyncStorage directly. They go through `backend/localBackend.js`, which at module-load routes between `bundleBackend.js` (bundled JS files under `src/data/dialects/...`) and `supabaseBackend.js` based on `EXPO_PUBLIC_USE_SUPABASE_CONTENT`. Public signatures are stable.

**In practice the flag is `true` — `supabaseBackend.js` is the live path.** The bundle files at `src/data/dialects/saudi/*.js` exist as an offline fallback and are intentionally sparse (most arrays are empty or tiny). Their count is NOT the content count of the app. Don't grep the bundle to estimate phase coverage; query Supabase.

**Hard rule:** don't import from `src/data/dialects/...` inside a screen or context. Go through the façade. (`DialectContext` is the one intentional exception because it needs the full bundle up front.)

### Dialect architecture

Each dialect bundle exports `{ id, name, rtl, words, lessons, conversations, shadowing, primer, roots, stories, listening, idioms, pronunciation, grammar }`. **Saudi, Levantine, and Fusha bundles are all sparse stubs** — the real content lives in Supabase under a `dialect` column. The bundles exist so the façade can fall back to local data when `EXPO_PUBLIC_USE_SUPABASE_CONTENT=false`.

**Hard rule:** word ids are stable across dialects. `w_hello` means "hello" in Saudi, Levantine, and Fusha — only `script` / `transliteration` / `notes` differ. This is what lets a user switch dialect without losing progress or SRS state.

When adding Levantine or Fusha content, write the rows into Supabase (via MCP `execute_sql` against project `sgvalritfnyiwxjwpqjj`) with `dialect='levantine'` / `dialect='fusha'` and reuse the Saudi word ids — do not pad the bundle files.

### Content tables in Supabase

Composite primary key `(dialect, <content>_id)` on every content table. RLS is public-read on content, owner-only on `user_progress` + `activity_log` + `chat_sessions`. Lesson `focal_word_ids` must only reference words at **phase ≤ lesson.phase** — this is the constraint that keeps Arabic difficulty progression honest. Focal count per lesson follows the spec in `docs/phase-difficulty-standards.md`: **4–6 at P1–P4, 3–5 at P5–P7, 3–4 at P8–P10** (minimum 4 except P8–P10 where 3 is the floor). The old "6+ focal word ids" floor has been superseded by this phase-graduated rule.

### HARD RULE — minimum content per phase per activity

**Every activity must have AT LEAST 20 items per phase, across all 10 phases, IN SUPABASE.** Activities this applies to: `lessons`, `shadowing_phrases`, `conversations`, `stories`, `listening_exercises`, `idioms` (P8–10 only — still 20+ each at those phases), `pronunciation_targets`, `grammar_drills`. Do NOT prune below 20 to "match a spec band"; the only valid response to over-volume is to rewrite for difficulty, never delete. The `docs/phase-difficulty-standards.md` quality bands (length, register, tashkeel) still apply — but the **count floor is 20**, full stop. If a previous agent reduced any phase below 20, regenerate it back up to 20 immediately.

**Audit by querying Supabase, not by reading bundle files.** Example:
```sql
SELECT phase, COUNT(*) FROM stories WHERE dialect='saudi' GROUP BY phase ORDER BY phase;
```
Or read the latest dump at `.claude/skills/e2e-test/content-backup/<table>/phase-N.md`. A count from `wc -l src/data/dialects/saudi/stories.js` is meaningless — that file is a stub.

### HARD RULE — word ordering by usefulness

Words are assigned to phases by **frequency / utility order**, not arbitrarily. Phase 1 holds the most common, highest-utility Saudi words a learner will hit first; phase 10 holds the long tail. **A learner who completes phase 10 should recognize essentially every word they will need in daily Saudi conversation.** When assigning a word's `phase`, ask: "how soon does a learner meet this in real life?" Greetings, pronouns, yes/no, food/drink basics, family core → P1–P2. Cultural / register / topical / rare-domain vocab → P8–P10. If a phase shifts during a rewrite, audit downstream `focal_word_ids` constraints.

### SRS scheduler

Pure functions in `src/activities/Flashcards/scheduler.js`. `applyRating(prev, rating)` returns a new progress object (1=again, 2=hard, 3=good, 4=easy). State flows `new → learning → review → known`. All state lives on `UserProgressContext.progress.wordProgress[wordId]` — the scheduler is stateless.

## AI backend (`ai-backend/`)

Express on port 8787. Routes:

- `POST /api/chat` — single-turn LLM reply for the text Chat screen. Accepts optional `requiredWords[]` array; when supplied, the system prompt steers the model to elicit each from the learner. Used by the unit-flow chat step + Review session chat.
- `POST /api/tts` — Arabic text → MP3 bytes (for the unified audio service)
- `POST /api/stt` — multipart audio → Whisper transcription (pronunciation scoring)
- `POST /api/realtime/session` — mints an ephemeral OpenAI Realtime client_secret; the mobile client uses it to SDP-handshake directly with OpenAI for voice tutor
- `POST /api/lesson/generate-story` — takes `{words[6-12], phase, dialect}`, returns `{paragraphs, englishTranslation, wordMappings, comprehensionQuestions}` shaped like a `stories` row. Per-phase length/tashkeel/register bands enforced server-side. Used by the unit-flow story step.

Auth: every route is gated by `requireUser` in `middleware/auth.js`, which verifies the Supabase access token against `/auth/v1/user`. Set `ALLOW_ANON=true` in `ai-backend/.env` to bypass during local dev.

Client wrapper is `src/config/aiBackend.js`. It attaches the current Supabase access token as a Bearer header on every request. Three exports: `postJson`, `postBinary`, `postMultipart`. **All AI calls must go through this wrapper** — never hit OpenAI directly from the mobile app.

In dev, leave `EXPO_PUBLIC_AI_BACKEND_URL` unset — `aiBackend.js` derives the URL from `Constants.expoConfig.hostUri` so a phone on the same Wi-Fi automatically hits your machine at `http://<metro-lan-ip>:8787`. Override with `EXPO_PUBLIC_AI_BACKEND_URL` only for prod/staging or if the backend lives elsewhere. Port defaults to 8787; override with `EXPO_PUBLIC_AI_BACKEND_PORT`.

## Onboarding + paywall (RevenueCat)

First-launch flow when no `progress.onboarding.completed` flag is set:
**Auth → Onboarding (7 screens + paywall) → Placement → Tabs**. An existing
user with `placement.completed: true` is treated as implied onboarding-done so
the funnel never re-fires retroactively (see `RootNavigator`).

The 7-screen onboarding (`src/screens/onboarding/`) is designed against
SOSA 2026 benchmarks for Education-category subscription apps:

1. **Welcome** — identity beat
2. **Goal** — family / work / travel / faith / culture / other
3. **Motivation** — personalised payoff reflecting the stated goal
4. **Commitment** — daily minutes (5/10/20/30)
5. **Social proof** — stats + testimonial card
6. **Notifications** — permission ask + daily reminder schedule
7. **Trial timeline** — Day 0 / Day 5 reminder / Day 7 charge transparency

The 8th screen is the **paywall** (`src/screens/paywall/PaywallScreen.js`),
which is also reachable as a presented modal from anywhere via
`navigation.navigate('Paywall')` — RootNavigator registers it at the root
stack level for exactly this reason. Soft-gate Pro-only entry points (voice
tutor, AI chat, anything that hits OpenAI in volume) by checking
`useSubscription().isPro` and bouncing non-Pro users to `Paywall`.

`SubscriptionContext` wraps `react-native-purchases` and is the single source
of truth for `isPro`. The SDK is loaded lazily — if you're running in Expo Go
or before an EAS rebuild, the context safely reports "not Pro" with no crashes
and the paywall still renders with fallback prices for visual QA. Real
purchases obviously require:

- `EXPO_PUBLIC_REVENUECAT_IOS_KEY` and `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY`
  set in `.env` (both are PUBLIC keys per RevenueCat's design).
- Products `arabreezy_pro_annual`, `arabreezy_pro_monthly`,
  `arabreezy_pro_lifetime` configured in App Store Connect / Play Console,
  attached to a RevenueCat offering named `default`, with entitlement `pro`.
- An EAS dev/preview/prod build (the native SDK doesn't work in Expo Go).

Pricing baseline derived from SOSA 2026 Education-category, North America:
$59.99/yr (with 7-day free trial), $9.99/mo, $99.99 lifetime. Annual is the
default selection — Education sells 58.9% yearly vs 29% monthly.

## Env layout

App `.env` (only EXPO_PUBLIC_* values are inlined into the bundle):

```
EXPO_PUBLIC_SUPABASE_URL=https://sgvalritfnyiwxjwpqjj.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
EXPO_PUBLIC_USE_SUPABASE_CONTENT=true
EXPO_PUBLIC_AI_BACKEND_URL=http://localhost:8787
EXPO_PUBLIC_REVENUECAT_IOS_KEY=appl_...
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=goog_...
EXPO_PUBLIC_REVENUECAT_ENTITLEMENT=pro
```

**The OpenAI key must never appear in the app's `.env`.** It lives only in `ai-backend/.env`.

`.env.local` (gitignored, only used by `scripts/seedSupabase.mjs`) holds the Supabase service-role key for one-off seeding.

## Schema workflow

Schema changes go through the Supabase MCP server via `apply_migration` / `execute_sql` against project `sgvalritfnyiwxjwpqjj`. The baseline migration `supabase/migrations/0001_init_schema.sql` is checked in; subsequent changes live only in the live DB unless a consolidated dump is requested. Don't write new files under `supabase/migrations/` unless asked.

## Conventions

- **Immutability.** Contexts use functional `setProgress(prev => ...)`. Don't mutate.
- **Styling.** No StyleSheet files — inline style objects that read from `theme` (single export in `src/theme/index.js`). One theme; accent color (`theme.colors.accent`) only on buttons, highlights, illustrations.
- **Arabic text.** Use `<ArabicText>` from `src/components/ArabicText.js` (RTL + larger font scale). Don't render Arabic through plain `<Text>`.
- **i18n.** UI strings in `src/i18n/en.js`. Content strings (words / lessons / conversations) live in the dialect bundle / Supabase — distinct layers.
- **Storage keys.** Namespace as `@arabreezy/<feature>`. Existing: `@arabreezy/userProgress`, `@arabreezy/dialect`.

## Things deliberately missing

- AppsFlyer / analytics
- Google sign-in
- Light/dark theme toggle
- Tests / lint / CI
- Pre-generated audio asset bucket (TTS is computed on demand and cached to `FileSystem.cacheDirectory/audio/`)

The app is **no longer Expo-Go compatible** — `react-native-webrtc`, `expo-audio` recording, and `expo-notifications` require a dev build. Use the `npm run build:dev:*` scripts.
