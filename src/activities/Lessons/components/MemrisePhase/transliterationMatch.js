// Match a user-typed transliteration against the canonical one.
// Arabic transliteration is highly variable — "maʿa s-salāma" might be typed
// "ma3a as-salama" or "maa al salama". We're lenient on purpose.

const COMBINING_MARKS_RE = /[̀-ͯ]/g;
const SCHOLARLY_GLYPHS_RE = /[ʿʾʻʼ'`]/g; // ʿ ʾ ʻ ʼ ' `
const CHAT_ARABIC_DIGITS_RE = /[23]/g; // 3 = ʿain, 2 = hamza

const normalize = (raw) => {
  if (!raw) return '';
  let s = raw.toLowerCase();
  s = s.normalize('NFD').replace(COMBINING_MARKS_RE, '');
  s = s.replace(SCHOLARLY_GLYPHS_RE, '');
  s = s.replace(CHAT_ARABIC_DIGITS_RE, '');
  s = s.replace(/[-_]+/g, ' ');
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

export function matchTransliteration(input, target) {
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
