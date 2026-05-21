# 13 — Chat (text)

**Source:** `src/activities/Chat/ChatScreen.js`, `src/config/aiBackend.js` (postJson wrapper)
**ai-backend:** `/api/chat` (OpenAI gpt-4o-mini)
**Supabase:** writes `chat_sessions` (when configured)

## Pre-state
- Activities tab → Chat card. After swipe up by 300: (300, 470).

## Happy path

1. ChatScreen renders. Header: "Chat — Practice short, friendly back-and-forth in Saudi Arabic." Top-right: "Finish" button.
2. First assistant bubble shows the greeting in Arabic + English translation (e.g. "أهلاً! خبريني عن يومك بالعربي / Hi! Tell me about your day in Arabic.").
3. Bottom input: "...Type in Arabic" placeholder + orange Send button.
4. Tap the input field (160, 810). Type a message (Arabic or transliteration, e.g. `marhaba`).
5. Tap Send at (340, 810).
6. Your message appears in an orange bubble on the right.
7. Within ~2 seconds, an assistant reply appears in a gray bubble on the left (e.g. "مرحبا! كيف حالك اليوم؟ / Hello! How are you today?").
8. Continue the conversation. Tap "Finish" (335, 100) to exit.

## Assertions
- UI: each turn shows the Arabic + English. Auto-scroll to bottom.
- ai-backend: 200 from `/api/chat`. Proof: assistant bubble actually renders with non-empty content.

## Failure paths
- `/api/chat` 401: missing or invalid auth (real-auth mode). Verify Supabase JWT or set `ALLOW_ANON=true` in `ai-backend/.env`.
- `/api/chat` 500: OpenAI API error → check `OPENAI_API_KEY` in `ai-backend/.env`.

## Recovery
- Sessions reset on Finish; nothing to clean up.
