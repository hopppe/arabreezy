// Phase 1..10 metadata. Phase 1 = beginner, Phase 10 = native speaker.
// Lessons + vocab live in src/data/dialects/<dialect>/lessons.js.
export const PHASES = [
  { phase: 1,  title: 'Beginner',            tagline: 'Greetings, pronouns, yes/no',             wordsGoal: 30,  cefr: 'Pre-A1' },
  { phase: 2,  title: 'Elementary',          tagline: 'Numbers, days, colors',                   wordsGoal: 50,  cefr: 'A1' },
  { phase: 3,  title: 'Pre-Intermediate',    tagline: 'Family, food, simple questions',          wordsGoal: 80,  cefr: 'A1/A2' },
  { phase: 4,  title: 'Intermediate I',      tagline: 'Daily life, places, directions',          wordsGoal: 120, cefr: 'A2' },
  { phase: 5,  title: 'Intermediate II',     tagline: 'Shopping, money, bargaining',             wordsGoal: 160, cefr: 'A2/B1' },
  { phase: 6,  title: 'Upper-Intermediate',  tagline: 'Travel, time, transport',                 wordsGoal: 200, cefr: 'B1' },
  { phase: 7,  title: 'Advanced I',          tagline: 'Work, study, feelings',                   wordsGoal: 240, cefr: 'B1/B2' },
  { phase: 8,  title: 'Advanced II',         tagline: 'Opinions, comparisons, past & future',    wordsGoal: 280, cefr: 'B2' },
  { phase: 9,  title: 'Fluent',              tagline: 'News, abstract ideas, debate',            wordsGoal: 320, cefr: 'B2/C1' },
  { phase: 10, title: 'Native Speaker',      tagline: 'Idioms, nuance, full colloquial command', wordsGoal: 400, cefr: 'C1/C2' },
];

export function getPhase(n) {
  return PHASES.find((p) => p.phase === n) || PHASES[0];
}
