# 06 — Guided Conversations

**Source:** `src/screens/GuidedConversationPickerScreen.js`, `src/activities/GuidedConversations/GuidedConversationScreen.js`, `src/activities/GuidedConversations/components/`, `src/activities/GuidedConversations/hooks/`
**ai-backend:** `/api/tts` (per-turn audio)
**Supabase:** none

## Pre-state
- Activities tab → Guided conversation card (300, 620). OR Home tab → Guided conversation activity row.

## Happy path

1. Picker renders: list of conversations at the user's phase (e.g. "How Do I Get to the Mosque?", "Where is the Bakery?", "What Time Is It?").
2. Tap a conversation row → GuidedConversationScreen.
3. Screen shows the first turn with Arabic + transliteration + English. Audio plays automatically via `/api/tts` → mp3 bytes.
4. UI controls: Play (replay), Next turn (advances dialogue), Translate toggle.
5. Walk through the turns. Each new turn triggers a TTS fetch (cached to `FileSystem.cacheDirectory/audio/` after first fetch).
6. On the last turn: "Conversation complete" screen.

## Assertions
- UI: each turn shows the speaker (e.g. "You / Stranger") and Arabic-RTL bubble alignment.
- ai-backend: `tail -20 /tmp/arabreezy_ai_backend.log` — minimal logging, but a 401/429/500 from OpenAI surfaces.
- Mac speakers should play actual audio. Easy regression check: mute → unmute the Mac and verify TTS audibility on a fresh conversation (cache miss).

## Failure paths
- `/api/tts` 4xx/5xx → silent skip, falls back to silent / text-only mode (verify by checking `/tmp/arabreezy_ai_backend.log` for error lines).
- Network down: cached audio still plays; uncached turns silently fail.

## Recovery
- Wipe TTS cache: re-install the app (cache lives in `FileSystem.cacheDirectory/audio/`).
