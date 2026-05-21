import { Router } from 'express';
import { config } from '../lib/config.js';
import { openaiJson } from '../lib/openai.js';
import { requireUser } from '../middleware/auth.js';
import { asyncRoute } from '../middleware/errors.js';

const router = Router();

const MAX_HISTORY = 24;

function buildSystemPrompt({
  dialect,
  phase,
  scenarioKey,
  scenarioTitle,
  scenarioDescription,
  includeSuggestions,
  requiredWords,
}) {
  const lines = [
    `You are a warm Arabic conversation partner. Reply in ${dialect || 'saudi'} dialect with short, friendly turns.`,
    `The learner is at phase ${phase ?? 1}/10 (1 = absolute beginner, 10 = native). Match their vocabulary level closely.`,
    `Always include the Arabic reply and a one-line English gloss.`,
    `Append the token [END_CONVERSATION] at the very end of your reply only when the conversation has reached a natural close — never earlier.`,
  ];

  if (Array.isArray(requiredWords) && requiredWords.length > 0) {
    const list = requiredWords
      .slice(0, 25)
      .map((w) =>
        w && typeof w === 'object'
          ? `${w.script || ''}${w.english ? ` (${w.english})` : ''}`.trim()
          : String(w),
      )
      .filter(Boolean)
      .join('، ');
    lines.push(
      `The learner is practicing these Saudi words and must use them: ${list}.`,
      'Steer the conversation so each of those words has a natural moment to be said by the learner. Use them yourself when natural — but the goal is to elicit them from the learner.',
    );
  }

  if (scenarioTitle || scenarioDescription) {
    lines.push(`Scenario: ${scenarioTitle || scenarioKey || 'free chat'}.`);
    if (scenarioDescription) lines.push(`Context: ${scenarioDescription}`);
  } else if (scenarioKey) {
    lines.push(`Scenario: ${scenarioKey}.`);
  }

  if (includeSuggestions) {
    lines.push(
      'Also propose two short replies the learner could plausibly say next.',
      'Return strict JSON: {"arabic":"...","english":"...","suggestions":[{"arabic":"...","english":"..."},{"arabic":"...","english":"..."}]}.'
    );
  } else {
    lines.push('Return strict JSON: {"arabic":"...","english":"..."}.');
  }

  return lines.join(' ');
}

router.post(
  '/',
  requireUser,
  asyncRoute(async (req, res) => {
    const {
      history = [],
      dialect,
      phase,
      scenarioKey,
      scenarioTitle,
      scenarioDescription,
      includeSuggestions = false,
      requiredWords,
    } = req.body || {};
    if (!Array.isArray(history) || history.length === 0) {
      return res.status(400).json({ error: 'history_required' });
    }

    const trimmed = history.slice(-MAX_HISTORY);
    const messages = [
      {
        role: 'system',
        content: buildSystemPrompt({
          dialect,
          phase,
          scenarioKey,
          scenarioTitle,
          scenarioDescription,
          includeSuggestions,
          requiredWords,
        }),
      },
      ...trimmed.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content:
          m.role === 'assistant'
            ? `${m.arabic ?? ''}${m.english ? `\n(${m.english})` : ''}`
            : String(m.arabic ?? m.content ?? ''),
      })),
    ];

    const json = await openaiJson('/chat/completions', {
      model: config.openai.chatModel,
      messages,
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const raw = json.choices?.[0]?.message?.content;
    if (!raw) {
      return res.status(502).json({ error: 'empty_completion' });
    }
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (_) {
      return res.status(502).json({ error: 'malformed_completion' });
    }

    const suggestions = Array.isArray(parsed.suggestions)
      ? parsed.suggestions
          .filter((s) => s && typeof s === 'object')
          .slice(0, 2)
          .map((s) => ({
            arabic: String(s.arabic || ''),
            english: s.english ? String(s.english) : null,
          }))
          .filter((s) => s.arabic.length > 0)
      : [];

    res.json({
      role: 'assistant',
      arabic: String(parsed.arabic || ''),
      english: parsed.english ? String(parsed.english) : null,
      suggestions,
    });
  })
);

export default router;
