# 07 — Shadowing

**Source:** `src/activities/Shadowing/ShadowingScreen.js`
**ai-backend:** `/api/tts` (model audio), `/api/stt` (user attempt → Whisper)
**Supabase:** none

## Pre-state
- Activities tab → Shadowing card (100, 750). Or Home tab → Shadowing activity row.

## Happy path

1. ShadowingScreen renders. Header: "Shadowing", "Phase N", "1 / N" counter.
2. First phrase appears: Arabic + transliteration + English, plus a Play icon, Translate icon, and a **big orange mic button** at (200, 720-ish).
3. Tap Play to hear the model — fetches `/api/tts`, caches.
4. Tap the mic — starts recording (expo-audio).
5. Tap mic again to stop — uploads audio to `/api/stt`. Whisper returns a transcription.
6. The screen shows side-by-side: expected Arabic vs your transcription, with a similarity score.
7. Advance to the next phrase.

## Permissions
- First mic tap shows the iOS prompt → tap Allow at (274, 525). The OS remembers.
- Reset with `xcrun simctl privacy <UDID> reset microphone com.arabreezy.app`.

## Assertions
- UI: model audio plays through the Mac speakers.
- UI: after stop-recording, the transcription text appears within ~2-4 s.
- ai-backend: a 200 from `/api/stt` is the proof — verify the transcription text actually shows in the UI (since the backend doesn't log per-request).

## Failure paths
- Mic denied → recording fails silently; "Couldn't capture audio" toast.
- `/api/stt` 5xx → transcription field shows "—" or error text.
- iOS sim has a real mic (passes through the Mac's mic). Speak Arabic phrases out loud, or play a recording near the Mac to feed the mic.

## Recovery
- Re-grant mic via Settings.app on the sim, or the reset command above.
