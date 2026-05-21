# Design Decisions

Short log of notable design choices and why, so we don't re-litigate them every session. Newest decisions on top.

## Unit-based progression replaces the daily-plan / activity-grid model (2026-05-20)

The Activities tab as the primary CTA is dead. The new primary loop:

1. **Review** — Flashcards on ≤20 SRS-due words → AI chat with those same words as `requiredWords` (model is told to elicit each from the learner).
2. **Next Lesson** — a "unit" = 8 words the learner currently doesn't know. Flowed through `selecting → memrise → story → rotation → chat → complete`.
3. On unit completion the next unit auto-unlocks with the next 8 words from the user's phase, sorted by frequency.

Rationale:
- Each focal word is seen 5+ times in 15 minutes across surfaces — measurably better retention than 1× per day in the old model.
- Decision fatigue drops to zero. "Continue" beats "pick something from a grid."
- Aligns with the original "lesson is the unit" rule — extends it from one activity to a 4-activity cohort.
- AI-generated stories per unit means infinite variety + always-on-topic for the focal 8.

Implementation:
- `src/context/UnitContext.js` — state machine on top of `progress.currentUnit`.
- `src/screens/unit/` — WordSelectionScreen (tap-to-know 8 cards), UnitMemriseScreen (filtered Memrise on un-tapped focals), LessonStoryScreen (calls /api/lesson/generate-story), UnitRotationScreen (round-robin Listening/Shadowing/Guided), UnitChatScreen (ChatScreen with requiredWords), ReviewSessionScreen (Flashcards then Chat).
- New ai-backend route `POST /api/lesson/generate-story` returns `{paragraphs, englishTranslation, wordMappings, comprehensionQuestions}` from a focal-word list + phase. Same shape as a `stories` row so the existing reader renders it.
- `POST /api/chat` extended with `requiredWords[]` — system prompt steers the model to elicit each.
- `HomeScreen` reduced to two big CTAs ("Review (N due)", "Continue/Start lesson"). Old Activities tab + grid kept reachable as secondary practice.

The 380 lessons authored in earlier sessions are now mostly unused by the unit flow. Decide before launch whether to delete, keep as offline-fallback, or repurpose as guided-conversation source.

## ≥20 items per phase per activity is a HARD RULE (2026-05-20)

See top of CLAUDE.md and `docs/phase-difficulty-standards.md`. Every activity table (`lessons`, `shadowing_phrases`, `conversations`, `stories`, `listening_exercises`, `idioms`, `pronunciation_targets`, `grammar_drills`) must carry at least 20 items at every phase **in Supabase** (project `sgvalritfnyiwxjwpqjj`). The spec's old per-phase count bands are obsolete.

Rationale: an earlier content agent pruned the lessons table 200→39 to "match the spec band" of 3-5/phase. The user explicitly overrode that — ≥20 floor protects against future agents making the same mistake.

**Audit by querying Supabase, not by reading `src/data/dialects/saudi/*.js`.** The bundle files are sparse stubs (offline fallback only); they do not reflect what's in the app. Use Supabase MCP (`execute_sql`) or read `.claude/skills/e2e-test/content-backup/<table>/phase-N.md`. Multiple recent audit agents have false-flagged "stories has only 6 items" / "grammar has only 2 drills" by reading the bundle — ignore those reports.

## Word ordering is frequency / utility based (2026-05-20)

Phase assignment follows real-world Saudi-conversation frequency. P1 = highest-utility words a learner first needs. By P10 the learner should recognize essentially every word they need in daily Saudi conversation. Specific reclassifications applied:

- P10 → P1: تَمَام / إن شاء الله / والله / خلاص / طيب / ما شاء الله / يا هلا (universal Saudi fillers).
- P2/P3 → P1: شاي / ماء / قهوة (Saudi social staples), اليوم / بكرة / أمس (core time triad), أب / أم.
- P3 → P2: أَيْن (MSA), أخ / أخت (immediate family).
- P6/P7 → P3: سيارة / جوال / كتاب.
- P7 → P2/P3: مبسوط / حزين / تعبان.
- P8 → P4: لأن (because — a learner couldn't give a reason for 7 phases).
- P9 → P5/P6/P7: دولة / ثقافة / اقتصاد.
- P10 → P3-P6: ممتاز / كافي / ماشي الحال / عبده.
- 36 new words seeded (prayer time names, Hajj/Umrah, أبشر/توكلنا, Vision 2030, contemporary civic vocab).

After reclassifications: zero `focal_word_ids` constraint violations remain (verified by SQL audit).

## Backup script for Supabase content (2026-05-20)

`scripts/dump_content_backup.mjs` dumps every Saudi-dialect content row to `.claude/skills/e2e-test/content-backup/<table>/phase-N.md` files. Paginated (handles tables with 3000+ rows), git-diffable JSON blocks per row. Run after any content change, before any release. Reason: a prior agent deleted 200+ lesson rows during difficulty fixes and Supabase has no auto-snapshot.

## Image + audio preloading for lessons (2026-05-20)

Ported from anaFluent's `imagePreloader.js` + `AudioPreloadService.js`. Lives at `src/services/preload.js`. `LessonScreen` calls `preloadLessonAssets(words, {dialect})` as soon as focal words load — by the time the Memrise loop opens its first card the image is in RN's cache and the TTS MP3 is on disk. Initial batch + tail-in-background pattern, scaled to lesson size (3-8 focals).

Also added `<Image source={{uri: word.imageUrl}}/>` to the Memrise `WordIntroCard` so words now display their Supabase storage image. The `vocabulary-images` bucket has 100% coverage for Saudi words.

## OpenAI proxy pattern (no key in the bundle)

Every OpenAI call (chat, TTS, Whisper, Realtime) routes through `ai-backend/` (Express on :8787). The mobile app holds only `EXPO_PUBLIC_AI_BACKEND_URL` and a Supabase JWT; the OpenAI key never enters `app.config.js`'s `extra` or any `EXPO_PUBLIC_*` env var. The earlier "wire it client-side, ship `EXPO_PUBLIC_OPENAI_API_KEY` and worry later" approach was a security mistake — anything `EXPO_PUBLIC_*` is inlined into the bundle and trivially extractable from the APK/IPA.

Each route is gated by `requireUser` middleware that verifies the user's Supabase access token against `/auth/v1/user`. `ALLOW_ANON=true` bypasses verification for local dev only.

Voice tutor (realtime): the server mints an ephemeral `client_secret` via `/api/realtime/sessions`; the client uses it for the WebRTC SDP handshake direct with OpenAI. The project key is never sent over the wire to the device.

## Streaks + daily reminders (re-added)

Originally dropped as "complexity driver". Re-added because they cost almost nothing and learners visibly respond to them. Implementation: streak counters on `UserProgressContext`, persisted to AsyncStorage and Supabase. Daily reminders via `expo-notifications` scheduled in `Settings`. Activity log entries (every completion) get appended both locally (capped at 200) and to Supabase `activity_log`.

## Server sync of user_progress

`UserProgressContext` writes to AsyncStorage first (fast path) and debounces a 800ms upsert into Supabase `user_progress`. On auth resolve, the context reconciles: if a non-default remote row exists, it wins; otherwise the local snapshot is pushed up. This keeps the app working offline while letting progress survive reinstalls and follow the user across devices.

## "Phases" not "levels"

Started as "levels" (10 of them, centered on vocabulary difficulty). Renamed to "phases" everywhere — the underlying concept didn't change, but "phase" reads less gamey for the adult-learner audience and matches `phase` as the column name across all content tables. Old references to "levels" should be considered stale.

## Saudi-essential words at phase 1

Words like `yalla`, `khalas`, `habibi`, `habibti`, `inshallah`, `mashallah`, `alhamdulillah` were originally tagged phase 2. Promoted to phase 1 because they're the actual most-heard everyday Saudi vocabulary and a phase-1 learner hears them constantly. The phase-1 set is now ~48 words.

## Lesson focal_word_ids must respect phase ≤ lesson.phase

A phase-N lesson's `focal_word_ids` may only reference words whose `phase` is ≤ N. Enforced by hand today. Without this rule, "phase 1" lessons drift into using phase-5 vocab and the difficulty curve collapses. Every lesson should have ≥ 6 focal words.

## Lessons don't refresh daily

Source app had "daily plans" that reset at midnight. Replaced with a **lesson-as-unit** model: the current lesson persists until finished. Daily review activities are anchored on the current lesson's words. If you're tempted to add a midnight job, you're solving the wrong problem — `DailyReviewContext` is derived.

## Dialect-first content structure with stable word ids

Saudi is primary, but content lives in `src/data/dialects/<dialect>/` (bundled) and a `dialect` column in Supabase. `w_hello` means "hello" in every dialect — only `script` / `transliteration` / `notes` differ. This is what lets a user switch dialect without losing lesson progress or SRS state. Don't introduce dialect-specific word ids.

## Backend façade (`backend/localBackend.js`)

Screens and contexts never read bundled JSON or AsyncStorage directly. They go through `localBackend.js`, which routes to `bundleBackend.js` or `supabaseBackend.js` based on `EXPO_PUBLIC_USE_SUPABASE_CONTENT`. Public signatures are stable. When we add another data source (e.g. CDN-cached JSON), only the router changes.

## Supabase MCP for schema changes, no migration files

After `0001_init_schema.sql` was checked in, all subsequent schema changes (every new table, every column addition) go through the Supabase MCP server (`apply_migration` / `execute_sql`) against project `sgvalritfnyiwxjwpqjj`. Trades repo reproducibility for speed. To recreate the schema from scratch, dump from the live DB. Don't create new files under `supabase/migrations/` unless explicitly asked.

## Single monochrome theme

Source app had light/dark modes with full palettes. Shipping **one theme** (black/white + an accent orange). Accent (`theme.colors.accent`) only on buttons, highlights, illustrations. Simpler to iterate, matches the aesthetic.

## English UI first, Arabic content always

UI chrome is English; the content (everything the learner is being taught) is Arabic. The i18n layer supports `ar` and RTL when we want a fully-Arabic chrome — easy switch.

## Expo Go dropped

Started as Expo-Go compatible (no native modules requiring a dev build). Dropped when we added `react-native-webrtc` (voice tutor), `expo-audio` recording, and `expo-notifications`. The project now requires EAS dev builds. See `eas.json` and the `build:dev:*` npm scripts.
