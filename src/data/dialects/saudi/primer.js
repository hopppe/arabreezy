// "Root System 101" primer — a 3-lesson crash course that introduces Arabic
// roots and the pattern system. Accessible from multiple surfaces:
//   - automatically offered in the placement result when placedPhase >= 3
//   - always available as a card in the Activities tab
//   - opened inline when a user taps a root badge and hasn't completed it
//
// Completion is stored as lessonId `primer:root-system` in
// `progress.lessonsCompleted` (same convention as guided conversations
// and shadowing). The `phase` field is conceptual (where in the normal
// curriculum these ideas live) but the primer is reachable at any phase.
//
// The primer lives OUTSIDE the normal phase lesson list so it doesn't
// count toward "all lessons in Phase N complete → advance phase."

export default [
  {
    id: 'primer_roots_1',
    primer: true,
    conceptualPhase: 3,
    title: 'What\'s a root?',
    intro: 'Almost every Arabic word is built from a 3-letter ROOT. One root generates a whole family of related words — but the family UNLOCKS GRADUALLY as you advance. Here are the first four members you\'ll meet.',
    // Only Phase 3-4 members of the k-t-b family. Past-tense verb (kataba)
    // and passive participle (maktuub) unlock later when grammar supports them.
    focalWordIds: ['w_kitaab', 'w_maktab', 'w_maktaba', 'w_kaatib'],
    highlight: { rootRef: 'r_ktb', letters: ['ك', 'ت', 'ب'] },
    dialogue: [
      { speaker: 'a', wordRef: 'w_kitaab', note: 'book — the core noun' },
      { speaker: 'a', wordRef: 'w_maktab', note: 'office — "place of writing"' },
      { speaker: 'a', wordRef: 'w_maktaba', note: 'library — "place of books"' },
      { speaker: 'a', wordRef: 'w_kaatib', note: 'writer — "one who writes"' },
    ],
    check: [
      {
        wordId: 'w_maktab',
        prompt: 'These 4 words all share the same 3 letters. Which 3?',
        answerType: 'root-letters',
        expected: ['ك', 'ت', 'ب'],
      },
    ],
    completionMessage: 'You just saw 4 words from one root — more siblings unlock at later phases (past-tense كَتَبَ, passive مَكْتُوب, and others). Arabic has ~1,500 productive roots; each one grows with you.',
  },

  {
    id: 'primer_roots_2',
    primer: true,
    conceptualPhase: 5,
    title: 'What\'s a pattern?',
    intro: 'Roots plug into PATTERNS to make words. The pattern "faaʿil" means "the doer." Plug a root into it and you get the person who does that root.',
    // Focal words are doers from roots the learner has likely seen by Phase 3-5
    focalWordIds: ['w_kaatib', 'w_daaris', 'w_ʿaamil', 'w_ʿaalim'],
    highlight: { patternRef: 'faaʿil' },
    dialogue: [
      { speaker: 'a', wordRef: 'w_kaatib',  note: 'k-t-b + faaʿil = writer' },
      { speaker: 'a', wordRef: 'w_daaris',  note: 'd-r-s + faaʿil = student' },
      { speaker: 'a', wordRef: 'w_ʿaamil',  note: 'ʿ-m-l + faaʿil = worker' },
      { speaker: 'a', wordRef: 'w_ʿaalim',  note: 'ʿ-l-m + faaʿil = scholar' },
    ],
    check: [
      {
        wordId: 'w_baaʿiʿ',
        prompt: 'The root ب-ي-ع means "selling." Plug it into the faaʿil pattern. Which word means "seller"?',
        answerType: 'multiple-choice',
      },
    ],
    completionMessage: 'One pattern × one root = one word. Learning 20 roots and 5 patterns unlocks 100 words.',
  },

  {
    id: 'primer_roots_3',
    primer: true,
    conceptualPhase: 5,
    title: 'Why this matters',
    intro: 'Let\'s prove it. Here\'s a word you\'ve probably never seen. But you know the root. And you know a pattern that fits. So you can guess.',
    focalWordIds: ['w_madrasa', 'w_maktab', 'w_maʿmal'],
    highlight: { patternRef: 'mafʿal' },
    dialogue: [
      { speaker: 'a', wordRef: 'w_madrasa', note: 'root d-r-s + mafʿal pattern = "place of studying" = school' },
      { speaker: 'a', wordRef: 'w_maktab',  note: 'root k-t-b + mafʿal = "place of writing" = office' },
    ],
    check: [
      {
        wordId: 'w_maʿmal',
        prompt: 'The root ʿ-m-l means "working." What does مَعْمَل mean?',
        answerType: 'multiple-choice',
        hint: 'Use the mafʿal pattern — "place of ____."',
      },
    ],
    completionMessage: 'You just read a new word correctly by decomposing it. That\'s the whole trick. From now on every new word is part of a family — so every lesson teaches more than it appears to.',
  },
];
