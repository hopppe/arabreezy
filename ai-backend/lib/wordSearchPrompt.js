// Word-search ("Translate & Save") prompt + post-processing helpers for
// Arabreezy. Adapted from the English-learning reference app — adjusted so
// the Arabic side comes back in the user's chosen dialect (saudi / levantine
// / fusha) and a transliteration is always included for the learner.

const ARABIC_REGEX = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

export const detectSourceLanguage = (text) =>
  ARABIC_REGEX.test(text) ? 'arabic' : 'english';

const levenshtein = (a, b) => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[b.length];
};

// True when `corrected` looks like a typo/spelling/grammar fix of `original`,
// false when it looks like a paraphrase. Used to guard against the model
// swapping idioms for synonyms (e.g. "when pigs fly" → "when hell freezes
// over") while still allowing real spelling/grammar fixes.
export const isLikelyTypoFix = (original, corrected) => {
  const a = original.toLowerCase().trim();
  const b = corrected.toLowerCase().trim();
  if (a === b) return true;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  if (maxLen <= 8 && dist <= 2) return true;
  if (dist / maxLen <= 0.5) return true;
  const tokens = (s) => new Set(s.split(/\s+/).filter(Boolean));
  const aTok = tokens(a);
  const bTok = tokens(b);
  if (aTok.size === 0 || bTok.size === 0) return false;
  let shared = 0;
  for (const t of aTok) if (bTok.has(t)) shared++;
  const overlap = shared / Math.max(aTok.size, bTok.size);
  return overlap >= 0.5;
};

const DIALECT_LABELS = {
  saudi: 'Saudi (Najdi/Hijazi) Arabic',
  levantine: 'Levantine Arabic',
  fusha: 'Modern Standard Arabic (Fusha)',
};

const dialectLabel = (dialect) => DIALECT_LABELS[dialect] || DIALECT_LABELS.saudi;

export const buildPrompt = (query, context, sourceLanguage, dialect) => {
  const isArabicSource = sourceLanguage === 'arabic';
  const fromLang = isArabicSource ? 'Arabic' : 'English';
  const toLang = isArabicSource ? 'English' : 'Arabic';
  const dialectName = dialectLabel(dialect);

  const contextBlock = context
    ? `\n\nCONTEXT: The user provided this surrounding sentence to disambiguate meaning:\n"${context}"\nUse this context to choose the most accurate translation as used in that sentence.`
    : '';

  return `You are a bilingual Arabic-English translator and language teacher for a Saudi-dialect-first learning app. The user typed a ${fromLang} word, phrase, or sentence. Your job: produce a CORRECT ${fromLang} version of their input (fix spelling, capitalization, and grammar) WITHOUT changing their intended meaning or word choice, and translate it naturally into ${toLang} as a native ${dialectName} speaker would say it.

This tool ONLY supports English ↔ Arabic. If the input is clearly a different language (Spanish, French, etc.) AND has no close English or Arabic cognate, reject it via the languageOk field below. If the input is a different language but has a close English/Arabic cognate, correct it like a typo and proceed normally.

INPUT (${fromLang}): "${query}"${contextBlock}
TARGET DIALECT: ${dialectName}

Respond with a JSON object containing these fields:
- "languageOk": boolean. TRUE if the input is English, Arabic, OR a different language with a close English/Arabic cognate. FALSE for unambiguously third-language inputs with no close equivalent (e.g. Spanish "rojo"). When FALSE, set the english/arabic/transliteration fields to empty strings and provide languageMessage; omit example fields.
- "languageMessage": OPTIONAL. Required only when languageOk is FALSE. A gentle one-sentence message in English saying the tool only supports English and Arabic, suggesting the equivalent English or Arabic term. Max 25 words.
- "${isArabicSource ? 'arabic' : 'english'}": the user's input in ${fromLang} with spelling, capitalization, AND grammar corrected. PRESERVE the user's word choice — DO NOT paraphrase or swap idioms.
- "${isArabicSource ? 'english' : 'arabic'}": the natural, idiomatic ${toLang} translation. When generating Arabic, write it as a native ${dialectName} speaker would say it (use dialectal vocab and structure for Saudi/Levantine; use formal MSA for Fusha). Arabic script only — no Latin letters or parentheticals.
- "transliteration": a Latin-letter transliteration of the Arabic field (whichever it is — the input if Arabic, the translation otherwise). Use simple, learner-friendly transliteration (e.g. "marhaba", "kayf haalak", "abgha"). Always include this, never null.
- "literal": OPTIONAL. The literal word-by-word ${toLang} rendering, included ONLY when it differs meaningfully from the idiomatic translation (e.g., "من عيوني" → literal "from my eyes" vs idiomatic "anything for you"). Omit for direct translations.
- "explanation": OPTIONAL. One short sentence (max 15 words) about meaning, register, or dialectal nuance. Include for idioms, slang, dialect-specific vocab. Omit for ordinary words.
- "exampleEnglish": a natural English example sentence using the phrase (6-12 words, A2-B1 level).
- "exampleArabic": the same example sentence translated into ${dialectName}, in Arabic script only.

CRITICAL RULES:
- Spelling/typo/grammar correction: YES. Paraphrasing or substituting different idioms: NO.
- Arabic text must be Arabic script only — no English letters in the arabic/exampleArabic fields. Transliteration goes in its own field.
- Generated Arabic must match the requested dialect (${dialectName}). For Saudi: prefer Saudi vocab like "أبغى" (I want), "زين" (good), "وش" (what). For Fusha: keep it formal MSA. For Levantine: use Levantine particles like "بدي" (I want), "كيفك".
- "literal" is in the TARGET language, not the source language.
- Never write meta-text — write authentic sentences.

Respond with ONLY valid JSON. No markdown, no commentary.

Example — English source "I want water", target Saudi:
{
  "languageOk": true,
  "english": "I want water",
  "arabic": "أبغى ماي",
  "transliteration": "abgha maay",
  "explanation": "Saudi colloquial — 'أبغى' for 'I want', 'ماي' for water.",
  "exampleEnglish": "I want water, please — it's hot today.",
  "exampleArabic": "أبغى ماي لو سمحت، اليوم حر."
}

Example — Arabic source "من عيوني", target Saudi:
{
  "languageOk": true,
  "arabic": "من عيوني",
  "english": "anything for you",
  "transliteration": "min ʿyooni",
  "literal": "from my eyes",
  "explanation": "Affectionate idiom — 'I would do anything for you'.",
  "exampleEnglish": "Could you help me move? — Anything for you!",
  "exampleArabic": "تقدر تساعدني في النقل؟ — من عيوني!"
}

Example — English source "apple", target Saudi:
{
  "languageOk": true,
  "english": "apple",
  "arabic": "تفاحة",
  "transliteration": "tuffaaha",
  "exampleEnglish": "She ate a red apple for lunch.",
  "exampleArabic": "أكلت تفاحة حمراء على الغداء."
}

Example — Spanish "rojo" (no close English/Arabic cognate — reject):
{
  "languageOk": false,
  "languageMessage": "Translate & Save supports English and Arabic only. Try the English word ('red') or Arabic ('أحمر').",
  "english": "",
  "arabic": "",
  "transliteration": ""
}`;
};
