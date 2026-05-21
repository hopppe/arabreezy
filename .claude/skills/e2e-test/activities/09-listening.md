# 09 — Listening

**Source:** `src/activities/Listening/ListeningScreen.js`
**ai-backend:** `/api/tts` (audio playback)
**Supabase:** none

## Pre-state
- Activities tab → Listening card (100, 620).

## Happy path

1. Listening list renders: e.g. "وين السوق؟ / Where is the Market?", "روتيني الصباح / My Morning Routine".
2. Tap an exercise → Listening Reader.
3. Audio plays automatically (via `/api/tts`) — Mac speakers should produce sound.
4. UI shows the prompt in English, optional transcript reveal, and a set of comprehension questions.
5. Answer questions (multiple choice or true/false). Submit → score screen.

## Assertions
- UI: list shows ≥1 exercise at the user's phase.
- ai-backend: `/api/tts` 200 (proof: audio actually plays).

## Failure paths
- TTS failure: silent playback. Verify via `/tmp/arabreezy_ai_backend.log` and the Network tab in any attached debugger.
