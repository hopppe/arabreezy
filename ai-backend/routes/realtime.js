import { Router } from 'express';
import { config } from '../lib/config.js';
import { openaiJson } from '../lib/openai.js';
import { requireUser } from '../middleware/auth.js';
import { asyncRoute } from '../middleware/errors.js';

const router = Router();

const DEFAULT_INSTRUCTIONS =
  'You are a warm Arabic conversation partner speaking Saudi-dialect Arabic. ' +
  'Keep replies short (1–2 sentences). Speak Arabic; if the user is clearly ' +
  'struggling, fall back to a one-line English clarification then continue in ' +
  "Arabic. Match the learner's vocabulary level. Encourage them to keep talking.";

const ALLOWED_VOICES = new Set(['alloy', 'verse', 'shimmer', 'echo', 'ballad', 'sage', 'coral']);

// Mint an ephemeral session key for the OpenAI Realtime API. The mobile
// client uses this in the SDP handshake without ever seeing the project key.
router.post(
  '/session',
  requireUser,
  asyncRoute(async (req, res) => {
    const { instructions, voice = 'alloy' } = req.body || {};
    const chosenVoice = ALLOWED_VOICES.has(voice) ? voice : 'alloy';

    const json = await openaiJson('/realtime/sessions', {
      model: config.openai.realtimeModel,
      voice: chosenVoice,
      modalities: ['audio', 'text'],
      instructions: instructions || DEFAULT_INSTRUCTIONS,
      input_audio_transcription: { model: 'whisper-1' },
      turn_detection: { type: 'server_vad', threshold: 0.5, silence_duration_ms: 600 },
    });

    const clientSecret = json?.client_secret?.value;
    if (!clientSecret) {
      return res.status(502).json({ error: 'no_client_secret' });
    }
    res.json({
      clientSecret,
      expiresAt: json?.client_secret?.expires_at ?? null,
      model: config.openai.realtimeModel,
    });
  })
);

export default router;
