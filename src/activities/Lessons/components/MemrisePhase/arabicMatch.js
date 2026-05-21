// Match user-typed Arabic against the canonical script.
// We normalize tashkeel (diacritics), tatweel, hamza variants, alef forms,
// ya / alef-maqsura, and ta-marbuta / ha — learners shouldn't be punished for
// orthographic variants they can't easily distinguish on a phone keyboard.

const TASHKEEL_RE = /[ً-ْٰـ]/g; // fatha..sukun, dagger alef, tatweel
const HAMZA_VARIANTS_RE = /[أإآ]/g; // أ إ آ → ا
const HAMZA_ON_LETTER_RE = /[ؤئ]/g; // ؤ ئ → strip the hamza seat
const TA_MARBUTA_RE = /ة/g; // ة → ه
const ALEF_MAQSURA_RE = /ى/g; // ى → ي

const normalize = (raw) => {
  if (!raw) return '';
  let s = raw.normalize('NFC');
  s = s.replace(TASHKEEL_RE, '');
  s = s.replace(HAMZA_VARIANTS_RE, 'ا'); // → ا
  s = s.replace(HAMZA_ON_LETTER_RE, (m) => (m === 'ؤ' ? 'و' : 'ي')); // ؤ→و, ئ→ي
  s = s.replace(TA_MARBUTA_RE, 'ه'); // ة → ه
  s = s.replace(ALEF_MAQSURA_RE, 'ي'); // ى → ي
  s = s.replace(/[ـ]/g, ''); // tatweel (redundant safety)
  s = s.replace(/\s+/g, ' ').trim();
  return s;
};

const levenshtein = (a, b) => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const m = a.length;
  const n = b.length;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j += 1) dp[j] = j;
  for (let i = 1; i <= m; i += 1) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j += 1) {
      const tmp = dp[j];
      dp[j] =
        a[i - 1] === b[j - 1]
          ? prev
          : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[n];
};

export function matchArabic(input, target) {
  const a = normalize(input);
  const b = normalize(target);
  if (!a || !b) return { match: false, almost: false };
  if (a === b) return { match: true, almost: false };

  const dist = levenshtein(a, b);
  const tolerance = b.length >= 6 ? 2 : 1;
  if (dist <= tolerance) return { match: true, almost: true };
  return { match: false, almost: false };
}

export const _normalize = normalize;
