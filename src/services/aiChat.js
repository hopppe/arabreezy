// AI chat tutor service. Calls the server-side proxy at /api/chat so the
// OpenAI key stays on the server. When the proxy isn't configured or the
// call fails, falls back to a canned local responder so the Chat surface
// still works end-to-end during offline dev.

import { isAiBackendConfigured, postJson } from '../config/aiBackend';

const STARTER_REPLIES = [
  { arabic: 'حلو! وأنت، شلونك اليوم؟', english: 'Nice! And you, how are you today?' },
  { arabic: 'تمام، احكي أكثر.', english: 'Okay, tell me more.' },
  { arabic: 'ليش؟ خبرني التفاصيل.', english: 'Why? Tell me the details.' },
  { arabic: 'كم الساعة سويت كذا؟', english: 'What time did you do that?' },
  { arabic: 'يعجبني! بعدين شو سويت؟', english: 'I like that! What did you do next?' },
];

function localReply(history) {
  const turn = history.filter((m) => m.role === 'user').length;
  const pick = STARTER_REPLIES[turn % STARTER_REPLIES.length];
  return { role: 'assistant', arabic: pick.arabic, english: pick.english };
}

export async function sendChatMessage({ history, dialect, phase, scenarioKey, requiredWords }) {
  if (isAiBackendConfigured) {
    try {
      const reply = await postJson('/api/chat', {
        history,
        dialect,
        phase,
        scenarioKey,
        requiredWords,
      });
      if (reply?.arabic) return reply;
    } catch (err) {
      console.warn('[chat] proxy failed, falling back:', err?.message);
    }
  }
  return localReply(history);
}
