// Placement quiz. Each question maps to a phase. The runner is adaptive:
// we ask one phase-1 question first, then climb a phase per correct answer.
// A wrong answer triggers one re-try at the same phase (a different question)
// — miss again and we stop. Placement = highest phase where you got at least
// one correct. This way the test feels like it actually gets harder, and a
// beginner doesn't sit through twenty questions to land at phase 1.
//
// Questions are dialect-agnostic — they reference word ids. The rendered
// Arabic form comes from the active dialect bundle at quiz time.
export const PLACEMENT_QUESTIONS = [
  // Phase 1 — Beginner
  { id: 'q1',  phase: 1, prompt: 'How do you say "hello"?',         answerWordId: 'w_hello',  choices: ['w_hello', 'w_goodbye', 'w_thanks', 'w_please'] },
  { id: 'q2',  phase: 1, prompt: 'Which word means "I"?',           answerWordId: 'w_i',      choices: ['w_i', 'w_you', 'w_he', 'w_she'] },
  // Phase 2 — Elementary
  { id: 'q3',  phase: 2, prompt: 'Which word means "one"?',         answerWordId: 'w_one',    choices: ['w_one', 'w_two', 'w_three', 'w_ten'] },
  { id: 'q4',  phase: 2, prompt: 'Which word means "red"?',         answerWordId: 'w_red',    choices: ['w_red', 'w_blue', 'w_white', 'w_black'] },
  // Phase 3 — Pre-Intermediate
  { id: 'q5',  phase: 3, prompt: 'Which word means "mother"?',      answerWordId: 'w_mother', choices: ['w_mother', 'w_father', 'w_sister', 'w_brother'] },
  { id: 'q6',  phase: 3, prompt: 'Which word means "bread"?',       answerWordId: 'w_bread',  choices: ['w_bread', 'w_water', 'w_rice',  'w_meat'] },
  // Phase 4 — Intermediate I
  { id: 'q7',  phase: 4, prompt: 'Which word means "market"?',      answerWordId: 'w_market', choices: ['w_market', 'w_house', 'w_madrasa', 'w_hospital'] },
  { id: 'q8',  phase: 4, prompt: 'Which word means "today"?',       answerWordId: 'w_today',  choices: ['w_today', 'w_tomorrow', 'w_yesterday', 'w_now'] },
  // Phase 5 — Intermediate II
  { id: 'q9',  phase: 5, prompt: 'Which word means "how much?"?',   answerWordId: 'w_howmuch',choices: ['w_howmuch', 'w_expensive', 'w_cheap', 'w_money'] },
  { id: 'q10', phase: 5, prompt: 'Which word means "cheap"?',       answerWordId: 'w_cheap',  choices: ['w_cheap', 'w_expensive', 'w_money', 'w_discount'] },
  // Phase 6 — Upper-Intermediate
  { id: 'q11', phase: 6, prompt: 'Which word means "airport"?',     answerWordId: 'w_airport',choices: ['w_airport', 'w_station', 'w_taxi', 'w_ticket'] },
  { id: 'q12', phase: 6, prompt: 'Which word means "hour"?',        answerWordId: 'w_hour',   choices: ['w_hour', 'w_minute', 'w_week', 'w_month'] },
  // Phase 7 — Advanced I
  { id: 'q13', phase: 7, prompt: 'Which word means "happy"?',       answerWordId: 'w_happy',  choices: ['w_happy', 'w_sad', 'w_tired', 'w_angry'] },
  { id: 'q14', phase: 7, prompt: 'Which word means "university"?',  answerWordId: 'w_uni',    choices: ['w_uni', 'w_maktab', 'w_job', 'w_class'] },
  // Phase 8 — Advanced II
  { id: 'q15', phase: 8, prompt: 'Which phrase means "I think"?',   answerWordId: 'w_think',  choices: ['w_think', 'w_know', 'w_remember', 'w_forget'] },
  { id: 'q16', phase: 8, prompt: 'Which word means "better"?',      answerWordId: 'w_better', choices: ['w_better', 'w_worse', 'w_same', 'w_different'] },
  // Phase 9 — Fluent
  { id: 'q17', phase: 9, prompt: 'Which word means "government"?',  answerWordId: 'w_govt',   choices: ['w_govt', 'w_economy', 'w_society', 'w_culture'] },
  { id: 'q18', phase: 9, prompt: 'Which word means "freedom"?',     answerWordId: 'w_freedom',choices: ['w_freedom', 'w_justice', 'w_rights', 'w_law'] },
  // Phase 10 — Native Speaker
  { id: 'q19', phase: 10, prompt: 'What does "inshallah" imply?',   answerWordId: 'w_inshallah', choices: ['w_inshallah', 'w_mashallah', 'w_yaani', 'w_wallah'] },
  { id: 'q20', phase: 10, prompt: 'Which idiom means "so-so"?',     answerWordId: 'w_soso',   choices: ['w_soso', 'w_great', 'w_terrible', 'w_fine'] },
];

export function scorePlacement(answers) {
  const byPhase = {};
  for (const q of PLACEMENT_QUESTIONS) byPhase[q.phase] ||= { total: 0, correct: 0 };
  for (const a of answers) {
    const q = PLACEMENT_QUESTIONS.find((x) => x.id === a.questionId);
    if (!q) continue;
    byPhase[q.phase].total += 1;
    if (a.correct) byPhase[q.phase].correct += 1;
  }
  let placedPhase = 1;
  for (let p = 1; p <= 10; p++) {
    const row = byPhase[p];
    if (row && row.correct >= 1) placedPhase = p;
    else if (row && row.total > 0) break;
  }
  const totalCorrect = answers.filter((a) => a.correct).length;
  return { placedPhase, score: totalCorrect };
}

// Adaptive runner — returns the next question, or null when the test should
// stop. Walks phases monotonically upward: each correct answer climbs to the
// next phase; one wrong answer earns a second try at the same phase; two
// wrong at the same phase stops the test.
//
// Inputs:
//   answers: [{ questionId, correct }]
// Output:
//   { question, phase } | null
export function nextPlacementQuestion(answers) {
  const asked = new Set(answers.map((a) => a.questionId));

  // Per-phase tally of this run's outcomes
  const perPhase = {};
  for (const a of answers) {
    const q = PLACEMENT_QUESTIONS.find((x) => x.id === a.questionId);
    if (!q) continue;
    const row = perPhase[q.phase] || (perPhase[q.phase] = { right: 0, wrong: 0 });
    if (a.correct) row.right += 1;
    else row.wrong += 1;
  }

  // Determine the current phase to ask next.
  let phase = 1;
  for (let p = 1; p <= 10; p++) {
    const row = perPhase[p] || { right: 0, wrong: 0 };
    if (row.right > 0) {
      // Solved this phase; try the next one.
      phase = p + 1;
      continue;
    }
    if (row.wrong >= 2) {
      // Two misses here — stop the test.
      return null;
    }
    // Either we haven't tried this phase yet, or we've missed once and get a retry.
    phase = p;
    break;
  }

  if (phase > 10) return null; // ceiling reached

  const pool = PLACEMENT_QUESTIONS.filter((q) => q.phase === phase && !asked.has(q.id));
  if (pool.length === 0) return null; // exhausted pool for this phase
  return { question: pool[0], phase };
}
