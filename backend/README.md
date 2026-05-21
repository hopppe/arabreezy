# backend/

Mobile-side data layer. Screens and contexts talk to `localBackend.js` only — never to AsyncStorage, the Supabase client, or dialect bundles directly.

## Layout

- `localBackend.js` — router. Picks the content source at module load based on
  `EXPO_PUBLIC_USE_SUPABASE_CONTENT`. Its exported function names and
  signatures are the stable public API.
- `bundleBackend.js` — reads content from bundled JS dialect files under
  `src/data/dialects/`. Dev default and fallback when Supabase is unconfigured.
- `supabaseBackend.js` — reads content from Supabase. Mirrors `bundleBackend`'s
  signatures so the router can pick either at runtime.
- `userProgress.js` — separate concern: server sync of per-user state. Used by
  `UserProgressContext`, not by the content router.
- `schema.js` — JSDoc typedefs for the shapes the façade returns.

## Public API — content readers

Async functions exported by `localBackend.js`:

- `getLessons({ dialect, phase })`
- `getLesson({ dialect, lessonId })`
- `getWords({ dialect, wordIds })`
- `getAllWords({ dialect })`
- `getWord({ dialect, wordId })`
- `getConversations({ dialect, phase })`
- `getConversation({ dialect, conversationId })`
- `getShadowingPhrases({ dialect, phase })`
- `getStories({ dialect, phase })`
- `getStory({ dialect, storyId })`
- `getListeningExercises({ dialect, phase })`
- `getListeningExercise({ dialect, listeningId })`
- `getIdioms({ dialect, phase })`
- `getPronunciationTargets({ dialect, phase })`
- `getGrammarDrills({ dialect, phase })`
- `getPrimer({ dialect })`
- `getRoots({ dialect })`
- `getPhases()`
- `getPlacementQuestions()`
- `getAvailableDialects()`

## Public API — user progress sync (`userProgress.js`)

- `fetchUserProgress(userId)` — returns a camelCase snapshot or null.
- `pushUserProgress(userId, snapshot)` — upserts `public.user_progress`.
- `logActivityRemote(userId, entry)` — fire-and-forget insert into `activity_log`.

All three no-op gracefully when Supabase isn't configured or `userId` is missing — the app keeps working offline against AsyncStorage.

## Switching content source to Supabase

1. Schema is in place: `supabase/migrations/0001_init_schema.sql` is the
   checked-in baseline. Subsequent additions live in the live DB (applied via
   the Supabase MCP) — see `docs/decisions.md` for the "no migration files"
   decision.
2. Content is already seeded into project `sgvalritfnyiwxjwpqjj` (~2,200 rows
   for Saudi across 10 content tables). For a fresh seed of new content, the
   path is `node scripts/seedSupabase.mjs` (reads `.env.local` for the
   service-role key) — though most authoring now happens directly via MCP.
3. Set `EXPO_PUBLIC_USE_SUPABASE_CONTENT=true` in `.env`, set
   `EXPO_PUBLIC_SUPABASE_URL` + `EXPO_PUBLIC_SUPABASE_ANON_KEY`, restart Metro.
4. The router now reads through `supabaseBackend.js` — no screen changes
   needed.

## How user progress is reconciled

`UserProgressContext` writes to AsyncStorage on every change (fast path) and
debounces a 800ms Supabase upsert via `pushUserProgress`. On auth resolve,
the context calls `fetchUserProgress`:

- If the remote row is non-default (has lessons completed or placement done),
  remote-wins → merged into local + persisted.
- Otherwise local-wins → pushed up.

This keeps the app fully usable offline while letting progress survive
reinstalls and follow the user across devices.

The `user_progress` table also has a signup trigger that auto-creates an
empty row when a new user signs up.
