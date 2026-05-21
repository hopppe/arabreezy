import { Router } from 'express';
import { config } from '../lib/config.js';
import { openaiBinary } from '../lib/openai.js';
import { requireUser } from '../middleware/auth.js';
import { asyncRoute } from '../middleware/errors.js';

const router = Router();

const MAX_INPUT_LEN = 1500;
const ALLOWED_VOICES = new Set(['alloy', 'nova', 'echo', 'fable', 'onyx', 'shimmer', 'verse']);
const ALLOWED_FORMATS = new Set(['mp3', 'wav', 'aac', 'opus']);

router.post(
  '/',
  requireUser,
  asyncRoute(async (req, res) => {
    const { text, voice = 'nova', format = 'mp3' } = req.body || {};
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'text_required' });
    }
    if (text.length > MAX_INPUT_LEN) {
      return res.status(400).json({ error: 'text_too_long', limit: MAX_INPUT_LEN });
    }
    const chosenVoice = ALLOWED_VOICES.has(voice) ? voice : 'nova';
    const chosenFormat = ALLOWED_FORMATS.has(format) ? format : 'mp3';

    const buf = await openaiBinary('/audio/speech', {
      model: config.openai.ttsModel,
      voice: chosenVoice,
      input: text,
      format: chosenFormat,
    });

    res.setHeader('Content-Type', `audio/${chosenFormat}`);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(buf);
  })
);

export default router;
