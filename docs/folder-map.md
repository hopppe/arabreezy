# Folder Map — Arabreezy

Every folder and what lives there. Update this whenever we add/remove/rename anything so future you (and future me) never have to guess.

---

## Top-level

| Path | What it is |
|------|-----------|
| `App.js` | Root component. Wires provider stack and root navigator. |
| `index.js` | Expo entry point. Registers `App`. |
| `app.config.js` | Expo config: name, plugins (expo-font, expo-dev-client, expo-notifications, expo-audio, datetimepicker, react-native-webrtc), iOS/Android perms, env passthrough. |
| `babel.config.js` | Babel preset for Expo + reanimated plugin. |
| `eas.json` | EAS Build profiles (development/preview/production). |
| `package.json` | Mobile app deps + scripts (start / build:dev:* / build:preview / build:prod). |
| `CLAUDE.md` | Working notes for Claude Code. Start here. |
| `PLAN.md` | Product shape, scope, progress log. |
| `docs/` | Long-form docs. |
| `backend/` | Content + user-progress façade for the mobile app. |
| `ai-backend/` | Express server. Holds the OpenAI key, proxies AI calls. |
| `src/` | Mobile app source. |
| `assets/` | Images, fonts, audio bundled with the app. |
| `supabase/` | Baseline schema migration. |
| `scripts/` | One-off seed scripts. |

---

## `src/`

Organized by feature, not by file type.

### `src/theme/`
Single monochrome theme with one accent color.
- `colors.js`, `spacing.js`, `typography.js`, `index.js`

### `src/context/`
Global state providers. Each exports `<XProvider>` and `useX()`.
- `ThemeContext.js`
- `LanguageContext.js` — UI language, RTL handling, `t(key, params)`.
- `AuthContext.js` — Supabase auth session.
- `DialectContext.js` — Selected Arabic dialect + the full bundle (one of the very few places that imports `src/data/dialects/...` directly).
- `UserProgressContext.js` — phase, currentLesson (legacy), wordProgress, customWords, placement, streak, reminders, **plus unit-flow state**: `currentUnit`, `unitCursor[phase]`, `unitsCompletedCount`. Local-first; debounced sync to Supabase via `backend/userProgress.js`.
- `LessonContext.js`, `FlashcardContext.js`, `DailyReviewContext.js` — derived from UserProgress + the backend façade.
- **`UnitContext.js`** (2026-05-20) — new primary progression. Wraps the unit state machine on top of `progress.currentUnit`. Exports `pickNextWords`, `markKnown` (tap-to-know → SRS rating 4), `lockUnit`, `advanceStep`, `cacheGeneratedStory`, `finishCurrentUnit` (rates all focals "good", advances cursor, auto-promotes phase when phase exhausted).

### `src/config/`
- `supabase.js` — Supabase client + `isSupabaseConfigured` + `useSupabaseContent` flag.
- `aiBackend.js` — wrapper around the ai-backend proxy. Three exports: `postJson`, `postBinary`, `postMultipart`. Attaches the Supabase access token as a Bearer header on every request. **All AI calls go through this**.

### `src/services/`
Cross-cutting services that touch native modules or network.
- `audio.js` — unified TTS. `speak(text)` POSTs to `/api/tts`, caches MP3 to `FileSystem.cacheDirectory/audio/`, plays via `expo-audio`. `play(uri)` for any local/remote audio.
- `recording.js` — mic via `expo-audio.useAudioRecorder`. `transcribe(uri)` POSTs to `/api/stt` (Whisper).
- `realtime.js` — OpenAI Realtime over WebRTC. Mints an ephemeral client_secret via `/api/realtime/session`, then SDP-handshakes direct with OpenAI.
- `aiChat.js` — `sendChatMessage()` for the text Chat screen. Routes through `/api/chat`; accepts `requiredWords[]` for unit / review sessions; falls back to a canned local responder.
- `notifications.js` — schedule/cancel daily reminders via `expo-notifications`.
- **`preload.js`** (2026-05-20) — image + audio cache warmer. `preloadLessonAssets(words, {dialect})` calls `Image.prefetch(uri)` for each `word.imageUrl` and `speak(text)` for each `word.script` so the TTS MP3 is on disk by the time the user hits Play. Ported from anaFluent.

### `src/hooks/`
- `useAudio.js` — tiny wrapper around the audio service for components (`playText`, `playing`, `configured`, `stop`).

### `src/navigation/`
- `RootNavigator.js` — auth gate → placement gate → tabs.
- `AuthNavigator.js` — sign in / sign up.
- `TabNavigator.js` — Home, Activities, Lessons, Settings. All activity screens are registered under the Home + Activities stacks.
- `PlacementNavigator.js` — placement intro/question/result.

### `src/screens/`
Non-activity top-level screens.
- `HomeScreen.js` — **2-button rework (2026-05-20).** Two big CTAs only: "Review (N due)" (→ `ReviewSessionScreen`) and "Continue/Start lesson" (→ correct unit step). Phase badge, streak pill, AddFlashcardModal search icon retained. Old activity checklist removed.
- `ActivitiesScreen.js` — 2-column grid of all 10 activity entry points. Now a secondary practice surface, not the primary CTA.
- `LessonsScreen.js` — phase-by-phase lesson list (legacy view, unit flow doesn't use it).
- `GuidedConversationPickerScreen.js` — pick a scripted convo.
- `PrimerScreen.js` — root-system crash course shown to new users.
- `ProgressScreen.js` — progress visualisation.
- `SettingsScreen.js` — streak summary, daily reminder toggle + time picker, dialect switcher, phase override, account, reset.
- `placement/` — `PlacementIntroScreen`, `PlacementQuestionScreen`, `PlacementResultScreen`.
- `auth/` — `SignInScreen`, `SignUpScreen`, `EmailVerificationScreen`.
- **`unit/`** (2026-05-20) — new primary progression screens:
  - `WordSelectionScreen.js` — 8 word cards with image + tap-to-know UI; refills from master phase word list on each tap.
  - `UnitMemriseScreen.js` — wraps existing `MemrisePhase`, filtered to un-tapped focals.
  - `LessonStoryScreen.js` — calls `/api/lesson/generate-story`, caches story on currentUnit, renders read → comprehension MCQ.
  - `UnitRotationScreen.js` — round-robin picks 1 of {listening, shadowing, guided} (`unitsCompletedCount % 3`).
  - `UnitChatScreen.js` — wraps `ChatScreen` with `requiredWords` = the 8 focals; `beforeRemove` listener fires `finishCurrentUnit()`.
  - `ReviewSessionScreen.js` — Flashcards (≤20 SRS-due words) → Chat with those words as `requiredWords`.

### `src/activities/`
Ten self-contained activities.
- `Lessons/LessonScreen.js`
- `Flashcards/FlashcardScreen.js` + `scheduler.js` (pure SRS functions)
- `GuidedConversations/GuidedConversationScreen.js`
- `Shadowing/ShadowingScreen.js`
- `Stories/StoryListScreen.js`, `StoryReader.js`
- `Listening/ListeningScreen.js`
- `Idioms/IdiomsScreen.js`
- `GrammarPractice/GrammarPracticeScreen.js`
- `Pronunciation/PronunciationScreen.js`
- `Chat/ChatScreen.js` (text), `Chat/VoiceChatScreen.js` (realtime voice)

### `src/components/`
Cross-cutting UI primitives.
- `ui/` — `Button`, `Text`, `Card`, `ScreenContainer`, `ProgressBar`, `EmptyState`, `Skeleton` + `SkeletonList`.
- `ArabicText.js` — RTL + larger font scale. Use this for any Arabic script.
- `PhaseBadge.js` — current phase chip.

### `src/data/`
Static dialect bundles + lookup metadata. **All Arabic content is dialect-aware.**

> **⚠️ These files are NOT the source of truth for content.** The app runs with `EXPO_PUBLIC_USE_SUPABASE_CONTENT=true` — every word, lesson, story, idiom, etc. is fetched from Supabase (project `sgvalritfnyiwxjwpqjj`). The bundle files below are an offline fallback and are intentionally sparse stubs. If you want to audit per-phase counts or check content quality, query Supabase or read `.claude/skills/e2e-test/content-backup/<table>/phase-N.md`. Don't `wc -l` these files.

- `dialects/saudi/` — fallback bundle (sparse stub; real Saudi content lives in Supabase).
  - `words.js`, `lessons.js`, `conversations.js`, `shadowing.js`
  - `stories.js`, `listening.js`, `idioms.js`, `pronunciation.js`, `grammar.js`
  - `primer.js`, `roots.js`
- `dialects/levantine/` — fallback bundle (empty stub; Levantine Supabase rows not yet written).
- `dialects/fusha/` — fallback bundle (empty stub; Fusha Supabase rows not yet written).
- `phases.js` — phase 1..10 metadata.
- `placement.js` — placement quiz questions.
- `patterns.js` — root-pattern data used by the primer.

### `src/i18n/`
UI language strings (distinct from dialect content).
- `en.js`, `ar.js` (partial), `index.js`.

### `src/utils/`
- `storage.js` — AsyncStorage JSON wrapper.
- `date.js` — `todayISO`, comparison helpers.
- `rtl.js` — RTL style helpers.

---

## `backend/` (mobile-side data layer)

Screens and contexts import only from `localBackend.js` — never from `src/data/dialects/...` or AsyncStorage directly.

- `localBackend.js` — router. Picks `bundleBackend` or `supabaseBackend` at module load based on `EXPO_PUBLIC_USE_SUPABASE_CONTENT`.
- `bundleBackend.js` — reads bundled dialect JS files.
- `supabaseBackend.js` — reads Supabase content tables.
- `userProgress.js` — server sync for `user_progress` + `activity_log` (`fetchUserProgress`, `pushUserProgress`, `logActivityRemote`). No-ops gracefully when Supabase isn't configured or no user is signed in.
- `schema.js` — JSDoc typedefs.
- `README.md` — public API + Supabase switching steps.

---

## `ai-backend/` (server, separate Node process)

Plain Express on port 8787. Holds the OpenAI key.

- `server.js` — wires helmet/cors/compression/rate-limit and mounts the routes.
- `lib/config.js` — env loader.
- `lib/openai.js` — `openaiJson` / `openaiBinary` / `openaiMultipart` helpers.
- `middleware/auth.js` — `requireUser` middleware. Verifies Supabase access token against `/auth/v1/user`.
- `middleware/errors.js` — `asyncRoute` + uniform error JSON.
- `routes/health.js` — `GET /health`.
- `routes/chat.js` — `POST /api/chat`.
- `routes/tts.js` — `POST /api/tts` (returns binary MP3/WAV).
- `routes/stt.js` — `POST /api/stt` (multipart, Whisper).
- `routes/realtime.js` — `POST /api/realtime/session` (mints ephemeral client_secret).
- `.env.example`, `Dockerfile`, `railway.json` — deploy.
- `README.md` — endpoint table + deploy notes.

---

## `assets/`
- `fonts/` — Arabic-capable fonts.
- `images/` — `icon.png`, `icon-foreground.png`, `splash.png` (current ones are placeholders).
- `audio/` — only what's bundled with the app (most TTS is on-demand via the proxy).

---

## `docs/`
- `folder-map.md` — this file.
- `decisions.md` — why we made the choices we made.
- `phase-difficulty-standards.md` — **authoritative** per-phase content spec. Audit against this before authoring.
- `english-app-map.md` — architecture notes from the source English app (anaFluent).

---

## `supabase/`
- `migrations/0001_init_schema.sql` — baseline. Subsequent schema changes go through Supabase MCP `apply_migration` against project `sgvalritfnyiwxjwpqjj`, not new files in this folder.

## `scripts/`
- `seedSupabase.mjs` — reads the Saudi bundle and upserts rows. Needs `.env.local` with the Supabase service-role key. Idempotent. Mostly historical now — most content was authored directly via MCP.
- **`dump_content_backup.mjs`** (2026-05-20) — dumps every Saudi-dialect content row to `.claude/skills/e2e-test/content-backup/<table>/phase-N.md`. Paginated (handles tables with 3000+ rows). Run after any content change. `node --env-file=.env --env-file=.env.local scripts/dump_content_backup.mjs`.
- `generate_all_lesson_audio.js`, `copy_images_*`, `match_words_to_images.mjs`, etc. — one-off content-generation helpers.

## `ai-backend/routes/`
- `chat.js` — `/api/chat`. Accepts optional `requiredWords[]` for unit + review chat sessions.
- `tts.js`, `stt.js`, `realtime.js`, `wordSearch.js`, `health.js` — see CLAUDE.md AI-backend section.
- **`lessonStory.js`** (2026-05-20) — `/api/lesson/generate-story`. Takes `{words[6-12], phase, dialect}`, returns a `stories`-shaped JSON payload. Per-phase length / tashkeel / register bands encoded server-side.

## `.claude/skills/e2e-test/`
End-to-end test playbook (loadable as a `/e2e-test` skill in Claude Code). Contains:
- `SKILL.md` — orchestrator + when-to-use.
- `setup.md` — sim/server/build setup.
- `coords-cheatsheet.md` — iPhone 16 Pro tap coordinates per screen (mobile-mcp element dump is unreliable on RN).
- `known-issues.md` — gotchas (mobile-mcp + Supabase rate limits + Metro port collision).
- `production-checklist.md` — 140-item ship-readiness audit across 12 categories.
- `content-audit.md`, `word-audit.md`, `word-list-quality-report.md` — content/vocabulary audits from 2026-05-20.
- `activities/01-auth.md` … `16-settings.md` — per-activity playbooks.
- `content-backup/<table>/phase-N.md` — git-diffable JSON snapshots of every Saudi content row, refreshed by `scripts/dump_content_backup.mjs`.
- `word-master-list/{phase1,phase2}.md` + `p1-p2.json` — used during the P1/P2 lesson rebuild; pattern reusable for other phases.
- `screenshots/` — 39 baseline images for diff regression.
- `RUN-LOG.md` — append a new section after every run.
