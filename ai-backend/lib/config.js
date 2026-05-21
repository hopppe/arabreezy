import 'dotenv/config';

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

export const config = {
  port: Number(process.env.PORT || 8787),
  openai: {
    apiKey: required('OPENAI_API_KEY'),
    chatModel: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
    ttsModel: process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts',
    sttModel: process.env.OPENAI_STT_MODEL || 'whisper-1',
    realtimeModel: process.env.OPENAI_REALTIME_MODEL || 'gpt-4o-realtime-preview-2024-12-17',
  },
  supabase: {
    url: required('SUPABASE_URL'),
    anonKey: required('SUPABASE_ANON_KEY'),
  },
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  allowAnon: String(process.env.ALLOW_ANON).toLowerCase() === 'true',
};
