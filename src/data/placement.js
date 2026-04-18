// Placement quiz. Each question maps to a phase — correct answers accumulate
// toward placing the user at the highest phase they can confidently handle.
//
// Scoring rule: the user's placed phase = the highest phase where they got
// at least 1 of 2 questions right, walking 1→10 in order. Cap at 10. Min 1.
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
  { id: 'q7',  phase: 4, prompt: 'Which word means "market"?',      answerWordId: 'w_market', choices: ['w_market', 'w_house', 'w_school', 'w_hospital'] },
  { id: 'q8',  phase: 4, prompt: 'Which word means "today"?',       answerWordId: 'w_today',  choices: ['w_today', 'w_tomorrow', 'w_yesterday', 'w_now'] },
  // Phase 5 — Intermediate II
  { id: 'q9',  phase: 5, prompt: 'Which word means "how much?"?',   answerWordId: 'w_howmuch',choices: ['w_howmuch', 'w_expensive', 'w_cheap', 'w_money'] },
  { id: 'q10', phase: 5, prompt: 'Which word means "cheap"?',       answerWordId: 'w_cheap',  choices: ['w_cheap', 'w_expensive', 'w_money', 'w_discount'] },
  // Phase 6 — Upper-Intermediate
  { id: 'q11', phase: 6, prompt: 'Which word means "airport"?',     answerWordId: 'w_airport',choices: ['w_airport', 'w_station', 'w_taxi', 'w_ticket'] },
  { id: 'q12', phase: 6, prompt: 'Which word means "hour"?',        answerWordId: 'w_hour',   choices: ['w_hour', 'w_minute', 'w_week', 'w_month'] },
  // Phase 7 — Advanced I
  { id: 'q13', phase: 7, prompt: 'Which word means "happy"?',       answerWordId: 'w_happy',  choices: ['w_happy', 'w_sad', 'w_tired', 'w_angry'] },
  { id: 'q14', phase: 7, prompt: 'Which word means "university"?',  answerWordId: 'w_uni',    choices: ['w_uni', 'w_office', 'w_job', 'w_class'] },
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
    else break;
  }
  const totalCorrect = answers.filter((a) => a.correct).length;
  return { placedPhase, score: totalCorrect };
}
