// Thin client for the AI backend's word-search ("Translate & Save") endpoint.
// All prompt logic, dialect handling, and post-processing lives on the
// backend in routes/wordSearch.js — this just sends a request and shapes the
// response into the API envelope the UI expects.

import { postJson, isAiBackendConfigured } from '../config/aiBackend';

const NETWORK_ERROR = 'Network issue. Check your connection and try again.';
const GENERIC_ERROR = 'Translation failed. Please try again.';

function friendlyError(err) {
  if (!err) return GENERIC_ERROR;
  const msg = String(err.message || err);
  if (msg.includes('not configured')) {
    return 'Translation service is offline. Start the ai-backend and try again.';
  }
  if (/network|fetch|timeout|connection/i.test(msg)) return NETWORK_ERROR;
  if (/40[01]|auth/i.test(msg)) {
    return 'Sign-in required. Sign out and back in, then try again.';
  }
  if (/429|rate/i.test(msg)) return 'Busy right now — try again in a moment.';
  return GENERIC_ERROR;
}

export async function searchWord({ query, context, dialect }) {
  if (!isAiBackendConfigured) {
    return { success: false, error: friendlyError(new Error('not configured')) };
  }
  const trimmed = (query || '').trim();
  if (!trimmed) return { success: false, error: 'Type a word or phrase first.' };

  try {
    const body = { query: trimmed, dialect };
    if (context && typeof context === 'string' && context.trim().length > 0) {
      body.context = context.trim();
    }
    const json = await postJson('/api/word-search', body);
    if (json?.result) return { success: true, data: json.result };
    return { success: false, error: GENERIC_ERROR };
  } catch (err) {
    return { success: false, error: friendlyError(err) };
  }
}

export default { searchWord };
