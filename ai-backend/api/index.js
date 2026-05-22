// Vercel serverless entry. All HTTP paths are rewritten to this function
// by vercel.json; we delegate to the Express app exported from server.js.
import app from '../server.js';

export default app;

export const config = {
  // Most routes are quick OpenAI proxies; STT can run longer. 60s covers the
  // longest practical Whisper transcription on the audio sizes the mobile app
  // sends (a handful of seconds). Requires Vercel Pro (Hobby caps at 10s).
  maxDuration: 60,
};
