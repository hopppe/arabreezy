# backend/

Local-only data layer today. Real backend tomorrow.

## Why this exists

Screens and contexts never talk to AsyncStorage or bundled JSON directly. They go through `localBackend.js`. When we flip to a real API, we change the insides of `localBackend.js` and nothing else.

## What's here

- `localBackend.js` — the façade. Exports async functions with shapes that look like a real API:
  - `getLessons({ dialect, level })`
  - `getLesson({ dialect, lessonId })`
  - `getWords({ dialect, wordIds })`
  - `getAllWords({ dialect })`
  - `getConversations({ dialect, level })`
  - `getConversation({ dialect, conversationId })`
  - `getPlacementQuestions()`
  - `getLevels()`
- `schema.js` — JSDoc typedefs for the data shapes.

All functions return promises so a real HTTP swap won't change signatures.

## How to swap to a real backend later

1. Keep the exported function names and shapes in `localBackend.js`.
2. Replace internals with `fetch(...)` calls to your API.
3. Move the bundled JSON into DB seeds so the server serves the same shapes.
4. Move user progress (currently in `UserProgressContext` via AsyncStorage) behind new functions like `getProgress(userId)` / `saveProgress(userId, patch)`.

Do NOT spread AsyncStorage keys all over the app — that's what makes backend migrations painful.
