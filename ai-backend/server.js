import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { config } from './lib/config.js';
import { errorHandler } from './middleware/errors.js';

import healthRoute from './routes/health.js';
import chatRoute from './routes/chat.js';
import ttsRoute from './routes/tts.js';
import sttRoute from './routes/stt.js';
import realtimeRoute from './routes/realtime.js';
import wordSearchRoute from './routes/wordSearch.js';
import lessonStoryRoute from './routes/lessonStory.js';

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin(origin, callback) {
      // Mobile apps don't send Origin — allow them through.
      if (!origin) return callback(null, true);
      if (config.allowedOrigins.length === 0) return callback(null, true);
      if (config.allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Origin not allowed'));
    },
    credentials: false,
  })
);
app.use(express.json({ limit: '256kb' }));

// Per-IP rate limiter on the AI routes. Keep it loose enough for normal use
// but tight enough to limit a runaway client.
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/health', healthRoute);
app.use('/api/chat', aiLimiter, chatRoute);
app.use('/api/tts', aiLimiter, ttsRoute);
app.use('/api/stt', aiLimiter, sttRoute);
app.use('/api/realtime', aiLimiter, realtimeRoute);
app.use('/api/word-search', aiLimiter, wordSearchRoute);
app.use('/api/lesson', aiLimiter, lessonStoryRoute);

app.use((req, res) => {
  res.status(404).json({ error: 'not_found', path: req.path });
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[arabreezy-ai] listening on :${config.port}`);
});
