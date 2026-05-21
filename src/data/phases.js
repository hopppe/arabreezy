// Phase 1..10 metadata. Phase 1 = beginner, Phase 10 = near-native fluency.
//
// Targets are CUMULATIVE (what the user should know BY the end of this phase),
// not per-phase increments.
//
// Why both roots + words?
//   Arabic builds words by plugging a 3-letter ROOT into a PATTERN.
//   One root × one pattern = one word. Knowing ~1,500 productive roots +
//   the core ~15 patterns unlocks real fluency — enough to read news,
//   hold complex conversations, and watch media without subtitles.
//   See docs/phase-difficulty-standards.md for the full curriculum spec.
export const PHASES = [
  { phase: 1,  title: 'Beginner',            tagline: 'Greetings, pronouns, yes/no',               rootsGoal: 15,   wordsGoal: 40,    cefr: 'Pre-A1' },
  { phase: 2,  title: 'Elementary',          tagline: 'Numbers, days, colors, first patterns',     rootsGoal: 40,   wordsGoal: 100,   cefr: 'A1' },
  { phase: 3,  title: 'Pre-Intermediate',    tagline: 'First explicit root family (k-t-b)',        rootsGoal: 90,   wordsGoal: 250,   cefr: 'A1/A2' },
  { phase: 4,  title: 'Intermediate I',      tagline: 'Present tense, doer & place patterns',      rootsGoal: 180,  wordsGoal: 500,   cefr: 'A2' },
  { phase: 5,  title: 'Intermediate II',     tagline: 'Past tense, Form II verbs, passive',        rootsGoal: 320,  wordsGoal: 850,   cefr: 'A2/B1' },
  { phase: 6,  title: 'Upper-Intermediate',  tagline: 'Broken plurals, Form III, reading news',    rootsGoal: 520,  wordsGoal: 1400,  cefr: 'B1' },
  { phase: 7,  title: 'Advanced I',          tagline: 'Forms IV & V, abstract nouns',              rootsGoal: 780,  wordsGoal: 2200,  cefr: 'B1/B2' },
  { phase: 8,  title: 'Advanced II',         tagline: 'Forms VI–VIII, nominalization',             rootsGoal: 1050, wordsGoal: 3200,  cefr: 'B2' },
  { phase: 9,  title: 'Fluent',              tagline: 'Form X, rare plurals, MSA register',        rootsGoal: 1300, wordsGoal: 4500,  cefr: 'B2/C1' },
  { phase: 10, title: 'Native Speaker',      tagline: 'Idiom, slang, full code-switch',            rootsGoal: 1500, wordsGoal: 6000,  cefr: 'C1/C2' },
];

export function getPhase(n) {
  return PHASES.find((p) => p.phase === n) || PHASES[0];
}
