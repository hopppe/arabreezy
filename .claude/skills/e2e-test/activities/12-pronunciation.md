# 12 — Pronunciation

**Source:** `src/activities/Pronunciation/PronunciationScreen.js`
**ai-backend:** `/api/stt` (Whisper)
**Supabase:** none

## Pre-state
- Activities tab → Pronunciation card (300, 750). Microphone permission granted.

## Happy path

1. PronunciationScreen renders. Header: "Pronunciation — Drill the tricky sounds: ج ح خ غ ق ...".
2. A target word appears with its Arabic, transliteration, and a phonetic breakdown.
3. Tap Play to hear the model (`/api/tts`).
4. Tap the big mic button to record.
5. Tap again to stop → uploads to `/api/stt`. Whisper transcription comes back with a similarity score.
6. Score: ✓ or ✗ with the highlighted diff between expected and actual.
7. Next word.

## Empty state (currently the default at Phase 4)
- "No pronunciation targets for this phase yet." Same content-gap pattern.

## Assertions
- UI: target word renders OR empty-state.
- ai-backend: `/api/stt` 200 (proof: transcription appears in UI).

## Failure paths
- Mic denied → "Couldn't capture audio". Re-grant via Settings.app.
