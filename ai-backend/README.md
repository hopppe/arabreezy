# arabreezy-ai-backend

Server-side proxy for the OpenAI calls used by the Arabreezy mobile app.

## Why this exists

The mobile app used to ship `EXPO_PUBLIC_OPENAI_API_KEY` in its bundle — any
JS bundler with `EXPO_PUBLIC_*` inlines the value into the app and anyone
who decompiles the APK/IPA can read it. This service holds the OpenAI secret
key server-side and authenticates each request against the user's Supabase
JWT.

## Endpoints

| Method | Path                  | Body                                       | Response                                  |
|--------|-----------------------|--------------------------------------------|-------------------------------------------|
| GET    | `/health`             | —                                          | `{ ok, service, time }`                   |
| POST   | `/api/chat`           | `{ history, dialect, phase, scenarioKey }` | `{ role, arabic, english }`               |
| POST   | `/api/tts`            | `{ text, voice?, format? }`                | binary audio (`mp3`/`wav`/...)            |
| POST   | `/api/stt`            | multipart `file`, `language?`              | `{ text }`                                |
| POST   | `/api/realtime/session` | `{ instructions?, voice? }`              | `{ clientSecret, expiresAt, model }`      |

All `/api/*` routes require `Authorization: Bearer <supabase-access-token>`
unless `ALLOW_ANON=true` (dev only).

## Local dev

```
cp .env.example .env       # fill in OPENAI_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY
npm install
npm run dev
```

Then point the mobile app at it via `.env`:

```
EXPO_PUBLIC_AI_BACKEND_URL=http://<your-mac-lan-ip>:8787
```

## Deploy

`railway.json` and `Dockerfile` are wired for Railway, but the service is
plain Express and runs anywhere that runs Node 20+ (Fly, Render, Cloud Run,
plain VM). Set the env vars from `.env.example` in your host's dashboard.
