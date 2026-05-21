// POST /api/lesson/generate-story
//
// Generates a short Saudi-Arabic story that uses the supplied focal words.
// Shape mirrors the `stories` Supabase row (paragraphs / english_translation
// / comprehension_questions) so the existing StoryReader can render it
// with zero changes.
//
// Body:
//   words:   [{ id, script, english, transliteration? }, ...]  // 4-12 typically
//   phase:   number 1..10
//   dialect: 'saudi' | 'levantine' | 'fusha'  (default 'saudi')
//
// Returns:
//   { paragraphs: string[], englishTranslation: string,
//     wordMappings: [{arabic, english, transliteration?}],
//     comprehensionQuestions: [{question, options[4], correctAnswer:0..3}] }
//
// We do NOT persist to the `stories` table — these are one-shot per-lesson
// stories that live in the unit state on the client. If a learner wants to
// re-read, the client caches the response keyed by (sorted word_ids hash).

import { Router } from 'express';
import { config } from '../lib/config.js';
import { openaiJson } from '../lib/openai.js';
import { requireUser } from '../middleware/auth.js';
import { asyncRoute } from '../middleware/errors.js';

const router = Router();

// Per-phase word-band targets. Lower than the canonical story bands because
// a lesson-scoped story stays tight around its ~8 focal words; longer prose
// drifts onto extra vocab.
const PHASE_TARGETS = {
  1:  { min: 8,   max: 20,  paragraphs: 1, tashkeel: 'all',   register: 'Pure Saudi, juxtaposed phrases.' },
  2:  { min: 15,  max: 30,  paragraphs: 1, tashkeel: 'all',   register: 'Pure Saudi, possessive suffixes ok.' },
  3:  { min: 25,  max: 45,  paragraphs: 2, tashkeel: 'all',   register: 'Saudi with first question words (وش, وين).' },
  4:  { min: 40,  max: 70,  paragraphs: 2, tashkeel: 'focal', register: 'Saudi present-tense verbs (أروح, أجي).' },
  5:  { min: 60,  max: 100, paragraphs: 2, tashkeel: 'focal', register: 'Saudi + simple opinion (أظن, زين).' },
  6:  { min: 90,  max: 150, paragraphs: 3, tashkeel: 'focal', register: 'Saudi past + future (راح, بكرة).' },
  7:  { min: 140, max: 220, paragraphs: 3, tashkeel: 'none',  register: 'Saudi with feelings/work vocab, two characters.' },
  8:  { min: 200, max: 300, paragraphs: 3, tashkeel: 'none',  register: 'Opinion-bearing, comparative, لأن clauses.' },
  9:  { min: 280, max: 420, paragraphs: 4, tashkeel: 'none',  register: 'Mixed Saudi-MSA, news register acceptable.' },
  10: { min: 400, max: 600, paragraphs: 4, tashkeel: 'none',  register: 'Free code-switching Saudi/MSA, literary.' },
};

function buildPrompt({ words, phase, dialect }) {
  const target = PHASE_TARGETS[phase] || PHASE_TARGETS[4];
  const wordList = words
    .slice(0, 12)
    .map((w, i) => `${i + 1}. ${w.script || ''} — ${w.english || ''}`)
    .join('\n');

  return [
    `You are writing a short story in ${dialect || 'saudi'} Arabic for a learner at phase ${phase}/10 (1=beginner, 10=native).`,
    `EVERY one of these ${words.length} focal words MUST appear in the story, each at least once. If a word is a verb, conjugate naturally; if a noun, use it in a phrase:`,
    wordList,
    '',
    `Length target: ${target.min}-${target.max} Arabic words across ${target.paragraphs} paragraph(s).`,
    `Tashkeel rule: ${target.tashkeel === 'all' ? 'full diacritics on every Arabic word' : target.tashkeel === 'focal' ? 'diacritics ONLY on the focal words; review words bare' : 'bare script, no diacritics'}.`,
    `Register: ${target.register}`,
    '',
    'Return STRICT JSON with this shape (no markdown, no prose):',
    '{',
    '  "paragraphs": ["...", "..."],          // Arabic, one element per paragraph',
    '  "englishTranslation": "...",            // full English translation as one string',
    '  "wordMappings": [                       // every focal word as it appears in the story',
    '    {"arabic": "أَكِيد", "english": "of course", "transliteration": "akiid"}',
    '  ],',
    '  "comprehensionQuestions": [             // 2-3 multiple choice, Arabic or English questions',
    '    {"question": "...", "options": ["...","...","...","..."], "correctAnswer": 0}',
    '  ]',
    '}',
    '',
    'No JSON keys other than those four. correctAnswer is the integer index 0..3.',
  ].join('\n');
}

router.post(
  '/generate-story',
  requireUser,
  asyncRoute(async (req, res) => {
    const { words, phase = 1, dialect = 'saudi' } = req.body || {};

    if (!Array.isArray(words) || words.length === 0) {
      return res.status(400).json({ error: 'words_required' });
    }
    if (words.length > 12) {
      return res.status(400).json({ error: 'too_many_words', max: 12 });
    }
    if (!Number.isInteger(phase) || phase < 1 || phase > 10) {
      return res.status(400).json({ error: 'invalid_phase' });
    }

    const prompt = buildPrompt({ words, phase, dialect });

    const json = await openaiJson('/chat/completions', {
      model: config.openai.chatModel,
      messages: [
        { role: 'system', content: 'You write learner-targeted Saudi-Arabic stories. Output strict JSON only.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const raw = json.choices?.[0]?.message?.content;
    if (!raw) return res.status(502).json({ error: 'empty_completion' });

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (_) {
      return res.status(502).json({ error: 'malformed_completion' });
    }

    const paragraphs = Array.isArray(parsed.paragraphs)
      ? parsed.paragraphs.filter((p) => typeof p === 'string' && p.trim().length > 0)
      : [];
    if (paragraphs.length === 0) {
      return res.status(502).json({ error: 'no_paragraphs' });
    }

    const comprehensionQuestions = Array.isArray(parsed.comprehensionQuestions)
      ? parsed.comprehensionQuestions
          .filter((q) => q && Array.isArray(q.options) && q.options.length === 4)
          .slice(0, 3)
          .map((q) => ({
            question: String(q.question || ''),
            options: q.options.map(String),
            correctAnswer: Number.isInteger(q.correctAnswer) ? q.correctAnswer : 0,
          }))
      : [];

    const wordMappings = Array.isArray(parsed.wordMappings)
      ? parsed.wordMappings
          .filter((m) => m && (m.arabic || m.english))
          .slice(0, 24)
          .map((m) => ({
            arabic: String(m.arabic || ''),
            english: String(m.english || ''),
            transliteration: m.transliteration ? String(m.transliteration) : null,
          }))
      : [];

    res.json({
      paragraphs,
      englishTranslation: String(parsed.englishTranslation || ''),
      wordMappings,
      comprehensionQuestions,
    });
  })
);

export default router;
