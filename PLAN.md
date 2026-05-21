# Arabreezy — Arabic Learning App

Saudi-dialect-first Arabic learning app. Originally scaffolded from the English app at `../Englishlearning` (sometimes called anaFluent) and has since grown back to anaFluent-class scope — ten activities, server-side AI, Supabase-backed content.

---

## Product shape

- **Onboarding** → 7-screen value-build funnel (welcome → goal → motivation → commitment → social proof → notifications → trial timeline), capped by the Pro paywall. Tuned against SOSA 2026 Education-category benchmarks; see CLAUDE.md.
- **Placement** → user lands in a quick quiz that decides their starting phase (1–10).
- **Lesson is the unit of progression.** A lesson stays in progress until finished. When all lessons at the current phase are complete, phase advances.
- **Daily review** activities anchored on the current lesson's focal words. No midnight reset — `DailyReviewContext` is derived from `currentLesson + wordProgress` and updates naturally as the user progresses.
- **Saudi-primary dialect**, with Levantine and Fusha planned as plug-in bundles (same word IDs across dialects).
- **10 phases** centered on vocabulary difficulty (Phase 1 = Beginner → Phase 10 = Native register).

### Activities (10 total)

1. **Lessons** — structured units; focal words + dialogue + check questions.
2. **Flashcards** — Anki-style SRS over the words the user has been taught.
3. **Guided Conversations** — scripted branching dialogues.
4. **Shadowing** — listen-and-repeat short phrases.
5. **Stories** — short Arabic paragraphs with comprehension MCQs.
6. **Listening** — audio-first comprehension with main-idea + section questions.
7. **Idioms** — Saudi proverbs with meaning + sentence MCQs.
8. **Grammar Practice** — one-rule-at-a-time drills.
9. **Pronunciation** — phoneme drills with record/playback + Whisper transcription scoring.
10. **Chat** — text + voice tutor. Voice mode is real-time via OpenAI Realtime over WebRTC.

---

## Three-tier architecture

```
mobile app (Expo SDK 54, RN 0.81)
   │
   ├── Supabase (project sgvalritfnyiwxjwpqjj)     ← SOURCE OF TRUTH FOR CONTENT
   │     ├── auth (email/password)
   │     ├── content tables (words, lessons, ..., 10 tables, ~2.2k rows)
   │     └── user_progress + activity_log
   │
   └── ai-backend (Express on :8787, in ./ai-backend/)
         ├── verifies Supabase JWT
         └── proxies OpenAI: /api/chat /api/tts /api/stt /api/realtime/session
```

**Where content lives:** all words, lessons, stories, idioms, grammar drills, etc. are rows in Supabase. The `src/data/dialects/<dialect>/*.js` bundle files are an offline fallback (used only when `EXPO_PUBLIC_USE_SUPABASE_CONTENT=false`) and are deliberately sparse stubs. Audits of content counts / quality must query Supabase, not the bundle files.

The OpenAI key never enters the mobile bundle. All AI requests go through `src/config/aiBackend.js` → `EXPO_PUBLIC_AI_BACKEND_URL`. The mobile app is **no longer Expo-Go compatible** (`react-native-webrtc`, `expo-audio`, `expo-notifications` all need a dev build via EAS).

---

## Vocabulary curriculum (10 phases)

Phases are centered on vocabulary difficulty. Each phase has a focal word list, a handful of lessons (~20 per phase), and an implicit level-up check (finishing all lessons at the phase).

| Phase | Focus | Words at phase | CEFR-ish |
|------|------|----|------|
| 1 | Greetings, pronouns, yes/no, "I am", numbers 1–10, Saudi essentials (yalla, khalas, habibi, inshallah, mashallah) | ~48 | Pre-A1 |
| 2 | Numbers 11–100, days, colors, "have/want", coffee/tea/water, basic emotions | ~65 | A1 |
| 3 | Family extended, food basics, body, clothing, simple past/present, verbs | ~75 | A1 |
| 4 | Daily routines, rooms, places, directions, weather | ~91 | A2 |
| 5 | Shopping, money, bargaining, descriptions, hotel basics | ~71 | A2 |
| 6 | Travel, transport, time, appointments, sports | ~52 | A2/B1 |
| 7 | Work, study, feelings, career | ~38 | B1 |
| 8 | Opinions, comparisons, past tense vocab, analysis | ~31 | B1 |
| 9 | News, media, government, economy, abstract nouns | ~27 | B1/B2 |
| 10 | Idiomatic phrases, register, eloquence, rhetorical | ~26 | B2 |

Word counts taper naturally — high-frequency core is concentrated low; specialized vocab thins toward the top. **The authoritative per-phase content spec is `docs/phase-difficulty-standards.md`** (vocab ceilings, grammar ceilings, tashkeel policy, activity-by-activity standards). Audit content against it before authoring.

### Hard rule for lessons

Lesson `focal_word_ids` must reference only words at **phase ≤ lesson.phase**. Every lesson should have ≥ 6 focal words. Both constraints are enforced by hand today; one day move to a Postgres trigger.

---

## Architecture at a glance

```
App.js
 ├─ SafeAreaProvider / GestureHandlerRootView
 ├─ ThemeProvider
 ├─ LanguageProvider          (UI language: en default, ar RTL-ready)
 ├─ AuthProvider              (Supabase session)
 ├─ DialectProvider           (saudi | levantine | fusha)
 ├─ UserProgressProvider      (phase, currentLesson, SRS state, streak — local + Supabase sync)
 ├─ LessonProvider
 ├─ FlashcardProvider         (deck derived from currentLesson + wordProgress)
 ├─ DailyReviewProvider       (today's activities — DERIVED, no midnight job)
 └─ NavigationContainer
     ├─ AuthNavigator         (when Supabase configured and no session)
     ├─ PlacementNavigator    (shown until placement.completed)
     └─ TabNavigator          (Home · Activities · Lessons · Settings)
```

User progress writes are debounced 800ms then upserted to Supabase `user_progress` (see `backend/userProgress.js`). Activity completions also insert into `activity_log` fire-and-forget. Streak math runs in `UserProgressContext.advanceStreak`.

---

## Where things live

- `src/activities/*` — one folder per activity (10 of them).
- `src/services/` — `audio.js` (TTS + cache + playback), `recording.js` (mic + Whisper), `realtime.js` (WebRTC + ephemeral key), `notifications.js` (daily reminders), `aiChat.js` (text chat).
- `src/config/` — `supabase.js` (client), `aiBackend.js` (proxy wrapper with JWT-attached fetch).
- `backend/` — façade (`localBackend.js` routes to `bundleBackend.js` or `supabaseBackend.js`) + `userProgress.js` for server sync.
- `ai-backend/` — Express proxy. See its README for endpoints + deploy.

`docs/folder-map.md` is the full tour. `docs/decisions.md` is the why log.

---

## Status

| Area | State |
|------|-------|
| Scaffold + all 10 activity screens | ✅ |
| Supabase schema + seed (Saudi) | ✅ ~2,200 rows across 10 tables — **the source of truth, not the bundle files** |
| Lesson focal-word expansion (6+ per lesson) | ✅ avg 8.0 per lesson |
| Phase distribution evening-out | ✅ within ±3 of target 20 per phase per table |
| ai-backend (chat / TTS / STT / realtime) | ✅ local dev (`npm run dev` on :8787) |
| Server sync of `user_progress` + `activity_log` | ✅ debounced upsert |
| Streaks + daily local notifications | ✅ |
| EAS dev build config | ✅ scripts wired; not actually run yet |
| Levantine + Fusha content | empty stubs |
| ai-backend production deploy | not yet (railway.json + Dockerfile staged) |
| Phase-appropriateness audit of dialogue text | not yet — only `focal_word_ids` is constrained |
| Tests / CI | none |
| Onboarding funnel + paywall (RevenueCat) | ✅ scaffolded · needs RC keys + storefront products |
| Analytics, Google sign-in | intentionally not built |

---

## Deliberately not built

These were major complexity drivers in the source English app and stay out unless we explicitly decide otherwise:

- AppsFlyer / analytics
- Google sign-in
- Light / dark theme toggle, multi-theme system
- Pre-generated audio asset bucket (TTS is on-demand via the proxy, cached to FS per-device)

---

## Progress log

- **2026-04-19** — Plan written. Explored English app and identified MVP surface.
- **2026-04-19** — Full scaffold: theme, contexts, placement flow, home/lessons/settings, 4 activities (Lessons, Flashcards, GuidedConversation, Shadowing). Saudi bundle seeded with ~80 words, 18 lessons.
- **2026-05-17** — Supabase auth + content path wired. Migration `0001_init_schema.sql` checked in. `EXPO_PUBLIC_USE_SUPABASE_CONTENT` flag added.
- **2026-05-17** — New Supabase project `sgvalritfnyiwxjwpqjj` provisioned and wired.
- **2026-05-18** — Scope expansion to anaFluent parity: 6 more activities ported (Stories, Listening, Idioms, Grammar Practice, Pronunciation, Chat + Voice Tutor). Unified audio service with on-demand TTS + cache. Streaks + daily reminders.
- **2026-05-18** — OpenAI proxy pattern: `ai-backend/` Express service holds the key, mobile app talks to it via `EXPO_PUBLIC_AI_BACKEND_URL`. Whisper / TTS / chat / realtime ephemeral session all routed.
- **2026-05-18** — Heavy content fill: Supabase rows for Saudi pushed past 200 in every activity table (~2,200 total).
- **2026-05-18** — Phase rebalance + lesson focal-word expansion. Idioms/grammar/pronunciation/conversations distributions flattened; lessons average 8.0 words each.
- **2026-05-18** — Mobile bundle compiles cleanly on iOS + Android. Dev server on :8082, ai-backend on :8787.
