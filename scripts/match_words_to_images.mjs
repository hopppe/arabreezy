import fs from 'node:fs';

const images = JSON.parse(fs.readFileSync('/tmp/anafluent_images.json', 'utf8'));
const words = JSON.parse(fs.readFileSync('/Users/ethanhoppe/Documents/Cursor_Code/arabreezy/scripts/arabreezy_words.json', 'utf8'));

// Build set of image stems (filename without .png) for O(1) lookup
const stems = new Set(images.filter(n => n.endsWith('.png')).map(n => n.slice(0, -4)));
console.log('Image stems:', stems.size);

// Filter out _v2 variants — prefer base if both exist
const stopwords = new Set(['the','a','an','to','of','in','on','at','is','are','be','it','this','that','these','those']);

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')      // strip parens content
    .replace(/[""''`]/g, '')          // smart quotes
    .replace(/[^\w\s-]/g, ' ')        // punctuation → space
    .replace(/\s+/g, ' ')
    .trim();
}

function slug(text) {
  return normalize(text).replace(/\s+/g, '_').replace(/-+/g, '_');
}

function singularize(word) {
  if (word.length <= 3) return null;
  if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
  if (word.endsWith('ses') || word.endsWith('xes') || word.endsWith('ches') || word.endsWith('shes')) return word.slice(0, -2);
  if (word.endsWith('s') && !word.endsWith('ss') && !word.endsWith('us') && !word.endsWith('is')) return word.slice(0, -1);
  return null;
}

function tryMatch(english, wordId) {
  const candidates = [];

  const fullSlug = slug(english);
  if (fullSlug) candidates.push(fullSlug);

  if (fullSlug.startsWith('to_')) candidates.push(fullSlug.slice(3));

  if (wordId.startsWith('w_')) {
    const idStem = wordId.slice(2);
    candidates.push(idStem);
    const idSing = singularize(idStem);
    if (idSing) candidates.push(idSing);
  }

  const tokens = normalize(english).split(' ').filter(w => w && !stopwords.has(w));
  if (tokens.length === 1) {
    candidates.push(tokens[0]);
    const sing = singularize(tokens[0]);
    if (sing) candidates.push(sing);
  } else if (tokens.length > 1) {
    candidates.push(tokens[0]);
    candidates.push(tokens[tokens.length - 1]);
    const sing = singularize(tokens[tokens.length - 1]);
    if (sing) candidates.push(sing);
  }

  for (const c of candidates) {
    if (stems.has(c)) return c;
  }
  return null;
}

const matches = [];
const unmatched = [];
for (const w of words) {
  const m = tryMatch(w.english, w.word_id);
  if (m) matches.push({ ...w, image: `${m}.png` });
  else unmatched.push(w);
}

console.log('Matched:', matches.length, '/', words.length);
console.log('Unmatched sample:', unmatched.slice(0, 20).map(w => `${w.word_id} (${w.english})`));

// Phase distribution of matches
const byPhase = {};
for (const m of matches) byPhase[m.phase] = (byPhase[m.phase] || 0) + 1;
console.log('Matches by phase:', byPhase);

fs.writeFileSync('/Users/ethanhoppe/Documents/Cursor_Code/arabreezy/scripts/word_image_matches.json', JSON.stringify(matches, null, 2));
fs.writeFileSync('/Users/ethanhoppe/Documents/Cursor_Code/arabreezy/scripts/word_image_unmatched.json', JSON.stringify(unmatched, null, 2));
