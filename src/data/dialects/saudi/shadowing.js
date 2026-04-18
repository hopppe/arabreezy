// Shadowing content — short phrases the user listens to and repeats.
// Each phrase is tagged with a phase so we show phase-appropriate material.
// `audio` paths are optional for now; user can add files to assets/audio/ later
// and reference them here. Screen plays audio when present, no-ops otherwise.
export default [
  // Phase 1
  { id: 'sh_p1_1', phase: 1, wordRef: 'w_hi_saudi', script: 'هلا، كيف حالك؟',            transliteration: 'hala, kayf haalak?',      english: 'Hey, how are you?' },
  { id: 'sh_p1_2', phase: 1, wordRef: 'w_good',     script: 'زين، الحمد لله',             transliteration: 'zain, al-hamdu lillah',   english: 'Good, thank God.' },
  { id: 'sh_p1_3', phase: 1, wordRef: 'w_mynameis', script: 'اسمي أحمد',                  transliteration: 'ismi Ahmad',              english: 'My name is Ahmad.' },

  // Phase 2
  { id: 'sh_p2_1', phase: 2, wordRef: 'w_want',     script: 'أبغى قهوة من فضلك',         transliteration: 'abgha qahwa min fadlak',  english: 'I want coffee, please.' },
  { id: 'sh_p2_2', phase: 2, wordRef: 'w_have',     script: 'عندي ثلاثة إخوة',           transliteration: 'ʿindi thalaatha ikhwa',   english: 'I have three siblings.' },

  // Phase 3
  { id: 'sh_p3_1', phase: 3, wordRef: 'w_where',    script: 'وين البيت؟',                 transliteration: 'wain al-bayt?',           english: 'Where is the house?' },
  { id: 'sh_p3_2', phase: 3, wordRef: 'w_what',     script: 'شنو تبغى تاكل؟',            transliteration: 'shnoo tabgha taakul?',    english: 'What do you want to eat?' },

  // Phase 4
  { id: 'sh_p4_1', phase: 4, wordRef: 'w_go',       script: 'أروح السوق بكرة',           transliteration: 'aruuh as-suuq bukra',     english: 'I\'ll go to the market tomorrow.' },
  { id: 'sh_p4_2', phase: 4, wordRef: 'w_straight', script: 'على طول ثم يمين',           transliteration: 'ʿala tuul thumma yamiin', english: 'Straight ahead, then right.' },

  // Phase 5
  { id: 'sh_p5_1', phase: 5, wordRef: 'w_howmuch',  script: 'بكم هذا من فضلك؟',          transliteration: 'bikam hadha min fadlak?', english: 'How much is this, please?' },
  { id: 'sh_p5_2', phase: 5, wordRef: 'w_discount', script: 'في خصم؟',                    transliteration: 'fii khasm?',              english: 'Is there a discount?' },

  // Phase 6
  { id: 'sh_p6_1', phase: 6, wordRef: 'w_airport',  script: 'المطار بعيد من هنا',        transliteration: 'al-mataar baʿiid min huna', english: 'The airport is far from here.' },
  { id: 'sh_p6_2', phase: 6, wordRef: 'w_taxi',     script: 'تاكسي للمطار لو سمحت',       transliteration: 'taksi lil-mataar law samaht', english: 'Taxi to the airport, please.' },

  // Phase 7
  { id: 'sh_p7_1', phase: 7, wordRef: 'w_happy',    script: 'أنا مبسوط بالشغل',          transliteration: 'ana mabsuut bil-shughl',  english: 'I\'m happy with the work.' },
  { id: 'sh_p7_2', phase: 7, wordRef: 'w_tired',    script: 'تعبان من الاجتماع',         transliteration: 'taʿbaan min al-ijtimaaʿ', english: 'Tired from the meeting.' },

  // Phase 8
  { id: 'sh_p8_1', phase: 8, wordRef: 'w_think',    script: 'أظن هذا أحسن',              transliteration: 'adhunn hadha ahsan',      english: 'I think this is better.' },
  { id: 'sh_p8_2', phase: 8, wordRef: 'w_because',  script: 'لأني أعرفه زين',             transliteration: 'liʾanni aʿrifuh zain',    english: 'Because I know him well.' },

  // Phase 9
  { id: 'sh_p9_1', phase: 9, wordRef: 'w_opinion',  script: 'رأيي في هذا مختلف',         transliteration: 'raʾyi fii hadha mukhtalif', english: 'My opinion on this is different.' },
  { id: 'sh_p9_2', phase: 9, wordRef: 'w_freedom',  script: 'الحرية حق أساسي',           transliteration: 'al-hurriyya haqq asaasi', english: 'Freedom is a basic right.' },

  // Phase 10
  { id: 'sh_p10_1', phase: 10, wordRef: 'w_inshallah', script: 'إن شاء الله بكرة',        transliteration: 'inshallah bukra',         english: 'God willing, tomorrow.' },
  { id: 'sh_p10_2', phase: 10, wordRef: 'w_khalas',    script: 'خلاص، يعني تمام',        transliteration: 'khalaas, yaʿni tamaam',   english: 'Done — I mean, all good.' },
];
