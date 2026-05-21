// Grammar drills. Each drill has a concept (one rule), a short description,
// and prompts — each prompt is { stem, choices, correct, explanation }.

export default [
  {
    id: 'g_pronouns_basic',
    phase: 1,
    concept: 'Pronouns: I, you, he, she',
    description:
      'Saudi Arabic uses أنا (ana), أنت (inta — to a man), أنتي (inti — to a woman), هو (huwa), هي (hiya).',
    icon: '👤',
    prompts: [
      {
        stem: 'I am Saudi.',
        choices: ['أنا سعودي', 'هو سعودي', 'هي سعودية', 'أنت سعودي'],
        correct: 0,
        explanation: '"I am" = أنا.',
      },
      {
        stem: 'She is a teacher.',
        choices: ['هو معلم', 'هي معلمة', 'أنا معلم', 'أنت معلمة'],
        correct: 1,
        explanation: '"She" = هي. Feminine form of teacher = معلمة.',
      },
    ],
  },
  {
    id: 'g_possessive_basic',
    phase: 2,
    concept: 'Possessive suffixes: -i, -ak, -ik, -uh, -ha',
    description:
      'Possession in Arabic is a suffix on the noun. كتاب (book) → كتابي (my book), كتابك (your book).',
    icon: '📚',
    prompts: [
      {
        stem: 'my book',
        choices: ['كتابك', 'كتابي', 'كتابه', 'كتابها'],
        correct: 1,
        explanation: '-ي is the "my" suffix.',
      },
      {
        stem: 'her car',
        choices: ['سيارتي', 'سيارتك', 'سيارته', 'سيارتها'],
        correct: 3,
        explanation: '-ها is the "her" suffix.',
      },
    ],
  },
];
