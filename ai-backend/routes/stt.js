import { Router } from 'express';
import multer from 'multer';
import { config } from '../lib/config.js';
import { openaiMultipart } from '../lib/openai.js';
import { requireUser } from '../middleware/auth.js';
import { asyncRoute } from '../middleware/errors.js';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // OpenAI limit is 25 MB
});

router.post(
  '/',
  requireUser,
  upload.single('file'),
  asyncRoute(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'file_required' });
    }
    const language = (req.body?.language || 'ar').slice(0, 5);

    const form = new FormData();
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype || 'audio/m4a' });
    form.append('file', blob, req.file.originalname || 'audio.m4a');
    form.append('model', config.openai.sttModel);
    form.append('language', language);

    const json = await openaiMultipart('/audio/transcriptions', form);
    res.json({ text: json.text || '' });
  })
);

export default router;
