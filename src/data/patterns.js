// Arabic morphological patterns (أوزان) — the templates into which a root
// gets plugged to generate a word.
//
// Each pattern is written with the three placeholder consonants F-ʕ-L
// (traditional Arabic notation) and tagged with the phase where it is
// introduced explicitly. Words in the dialect bundles reference a pattern
// id; the lesson player can use `introducedAt` to decide whether to
// teach the pattern or just show the word.
//
// This catalog is deliberately small — ~15 productive patterns cover the
// vast majority of real-world Arabic vocabulary.

export const PATTERNS = [
  // --- Nominal patterns (nouns & adjectives) ---
  { id: 'faʿl',        template: 'فَعْل',     example: 'كَلْب (kalb, dog)',        gloss: 'bare noun',                          introducedAt: 2 },
  { id: 'fiʿaal',      template: 'فِعَال',    example: 'كِتاب (kitaab, book)',     gloss: 'noun, often an object of doing',     introducedAt: 3 },
  { id: 'faʿaala',     template: 'فَعَالة',   example: 'كِتابة (kitaaba, writing)', gloss: 'abstract noun / practice of doing',  introducedAt: 3 },
  { id: 'faaʿil',      template: 'فَاعِل',    example: 'كاتِب (kaatib, writer)',   gloss: 'active participle / doer',           introducedAt: 4 },
  { id: 'mafʿuul',     template: 'مَفْعُول',  example: 'مَكْتُوب (maktuub, written)', gloss: 'passive participle / thing done',  introducedAt: 5 },
  { id: 'mafʿal',      template: 'مَفْعَل',   example: 'مَكْتَب (maktab, office)', gloss: 'place or time of doing',             introducedAt: 5 },
  { id: 'mafʿala',     template: 'مَفْعَلة',  example: 'مَكْتَبة (maktaba, library)', gloss: 'place of (often collective)',      introducedAt: 5 },
  { id: 'faʿʿaal',     template: 'فَعَّال',   example: 'كَتَّاب (kattaab, prolific writer)', gloss: 'intensive agent / profession', introducedAt: 8 },
  { id: 'fuʿuul_plur', template: 'فُعُول',   example: 'كُتُب (kutub, books)',     gloss: 'broken plural for many faʿl/fiʿaal nouns', introducedAt: 6 },
  { id: 'afʿaal_plur', template: 'أَفْعَال',  example: 'أَقْلام (aqlaam, pens)',   gloss: 'broken plural for many singular nouns',  introducedAt: 6 },

  // --- Verb forms (صِيَغ الفعل). Form I is the bare root; II–X are derived. ---
  { id: 'form_I',      template: 'فَعَلَ',    example: 'كَتَبَ (kataba, he wrote)',    gloss: 'Form I — basic verb (past tense)',    introducedAt: 5 },
  { id: 'form_I_pres', template: 'يَفْعُل',   example: 'يَكْتُب (yaktub, he writes)',  gloss: 'Form I — present tense',               introducedAt: 4 },
  { id: 'form_II',     template: 'فَعَّلَ',   example: 'عَلَّمَ (ʿallama, he taught)',  gloss: 'Form II — intensive or causative',    introducedAt: 5 },
  { id: 'form_III',    template: 'فَاعَلَ',   example: 'كَاتَبَ (kaataba, he corresponded)', gloss: 'Form III — reciprocal / mutual', introducedAt: 6 },
  { id: 'form_IV',     template: 'أَفْعَلَ',  example: 'أَدْخَلَ (adkhala, he admitted)', gloss: 'Form IV — causative',               introducedAt: 7 },
  { id: 'form_V',      template: 'تَفَعَّلَ', example: 'تَعَلَّمَ (taʿallama, he learned)', gloss: 'Form V — reflexive of Form II',   introducedAt: 7 },
  { id: 'form_VI',     template: 'تَفَاعَلَ', example: 'تَكَاتَبَ (takaataba, they corresponded)', gloss: 'Form VI — reciprocal of Form III', introducedAt: 8 },
  { id: 'form_VII',    template: 'اِنْفَعَلَ', example: 'اِنْكَسَرَ (inkasara, it broke)', gloss: 'Form VII — passive / happens-to',    introducedAt: 8 },
  { id: 'form_VIII',   template: 'اِفْتَعَلَ', example: 'اِجْتَمَعَ (ijtamaʿa, they met)', gloss: 'Form VIII — reflexive / self-does',  introducedAt: 8 },
  { id: 'form_X',      template: 'اِسْتَفْعَلَ', example: 'اِسْتَخْدَمَ (istakhdama, he used)', gloss: 'Form X — seeking / asking for',  introducedAt: 9 },
];

export function getPattern(id) {
  return PATTERNS.find((p) => p.id === id) || null;
}

export function getPatternsIntroducedBy(phase) {
  return PATTERNS.filter((p) => p.introducedAt <= phase);
}
