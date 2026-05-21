import { Router } from 'express';
import { config } from '../lib/config.js';
import { openaiJson } from '../lib/openai.js';
import { requireUser } from '../middleware/auth.js';
import { asyncRoute } from '../middleware/errors.js';
import { buildPrompt, detectSourceLanguage, isLikelyTypoFix } from '../lib/wordSearchPrompt.js';

const router = Router();

const ALLOWED_DIALECTS = new Set(['saudi', 'levantine', 'fusha']);

// Saveability heuristic — keep flashcards short and single-concept.
function isSaveable(text) {
  const trimmed = (text || '').trim();
  if (trimmed.length === 0 || trimmed.length > 60) return false;
  const wordCount = trimmed.split(/\s+/).length;
  if (wordCount > 6) return false;
  if (/[.!?]\s+\S/.test(trimmed)) return false;
  return true;
}

router.post(
  '/',
  requireUser,
  asyncRoute(async (req, res) => {
    const { query, context, dialect } = req.body || {};

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ error: 'query_required' });
    }

    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 500) {
      return res.status(400).json({ error: 'query_too_long' });
    }

    const trimmedContext =
      context && typeof context === 'string' ? context.trim().slice(0, 500) : null;
    const chosenDialect = ALLOWED_DIALECTS.has(dialect) ? dialect : 'saudi';
    const sourceLanguage = detectSourceLanguage(trimmedQuery);
    const targetLanguage = sourceLanguage === 'arabic' ? 'english' : 'arabic';

    const prompt = buildPrompt(trimmedQuery, trimmedContext, sourceLanguage, chosenDialect);

    const json = await openaiJson('/chat/completions', {
      model: config.openai.chatModel,
      messages: [
        {
          role: 'system',
          content: 'You are a bilingual translator and teacher. Always respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const responseText = json.choices?.[0]?.message?.content?.trim();
    if (!responseText) {
      return res.status(502).json({ error: 'empty_completion' });
    }

    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch (_err) {
      return res.status(502).json({ error: 'malformed_completion' });
    }

    if (parsed.languageOk === false) {
      const fallback =
        'Translate & Save supports English and Arabic only. Try the equivalent English or Arabic word.';
      const detail =
        typeof parsed.languageMessage === 'string' && parsed.languageMessage.trim().length > 0
          ? parsed.languageMessage.trim()
          : fallback;
      return res.json({
        result: {
          originalText: trimmedQuery,
          sourceLanguage,
          targetLanguage,
          dialect: chosenDialect,
          english: 'Use English or Arabic',
          arabic: 'استخدم الإنجليزية أو العربية',
          transliteration: '',
          literal: null,
          explanation: detail,
          exampleEnglish: null,
          exampleArabic: null,
          saveable: false,
          hadContext: Boolean(trimmedContext),
          unsupportedLanguage: true,
        },
      });
    }

    if (!parsed.english || !parsed.arabic) {
      return res.status(502).json({ error: 'translation_failed' });
    }

    let englishOut = String(parsed.english).trim();
    let arabicOut = String(parsed.arabic).trim();
    const transliteration = parsed.transliteration ? String(parsed.transliteration).trim() : '';

    // Guard against paraphrasing the source-language field. Allow typo fixes;
    // revert obvious paraphrases (e.g. "kick the bucket" → "die").
    const sourceField = sourceLanguage === 'english' ? englishOut : arabicOut;
    if (!isLikelyTypoFix(trimmedQuery, sourceField)) {
      if (sourceLanguage === 'english') englishOut = trimmedQuery;
      else arabicOut = trimmedQuery;
    }

    const result = {
      originalText: trimmedQuery,
      sourceLanguage,
      targetLanguage,
      dialect: chosenDialect,
      english: englishOut,
      arabic: arabicOut,
      transliteration,
      literal: parsed.literal ? String(parsed.literal).trim() : null,
      explanation: parsed.explanation ? String(parsed.explanation).trim() : null,
      exampleEnglish: parsed.exampleEnglish ? String(parsed.exampleEnglish).trim() : null,
      exampleArabic: parsed.exampleArabic ? String(parsed.exampleArabic).trim() : null,
      saveable: isSaveable(englishOut) && isSaveable(trimmedQuery),
      hadContext: Boolean(trimmedContext),
    };

    res.json({ result });
  })
);

export default router;
