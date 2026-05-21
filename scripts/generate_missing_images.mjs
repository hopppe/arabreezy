#!/usr/bin/env node
// Generate images for the 710 Arabic words that didn't match an anafluent
// image, using OpenAI gpt-image-2 at quality=low.
//
// One-shot admin tool. Reads OPENAI_API_KEY from ai-backend/.env so the key
// stays out of the mobile bundle. Each generated PNG is base64-streamed into
// the `upload-vocab-image-b64` Supabase edge function, which writes it to the
// `vocabulary-images` bucket as `<word_id>.png` (with ʿ/ʾ → `_` to avoid
// invalid storage keys) and sets words.image_url.
//
// Usage:
//   node scripts/generate_missing_images.mjs --dry-run                 # show prompts, no API calls
//   node scripts/generate_missing_images.mjs --limit 5                 # cheap smoke test
//   node scripts/generate_missing_images.mjs --skip 5 --limit 50       # next 50
//   node scripts/generate_missing_images.mjs                           # all 710
//
// Resume-safe: every successful upload also sets words.image_url, so re-running
// after a crash will only retry rows still null.

import fs from 'node:fs';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import os from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FULLSIZE_DIR = resolve(ROOT, 'scripts/generated_images_fullsize');
const RESIZE_PX = 256;
fs.mkdirSync(FULLSIZE_DIR, { recursive: true });

// --- env --------------------------------------------------------------------

function loadEnv(path) {
  try {
    const raw = readFileSync(path, 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}

loadEnv(resolve(ROOT, 'ai-backend/.env'));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY (expected in ai-backend/.env).');
  process.exit(1);
}

// --- config -----------------------------------------------------------------

const ANON_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndmFscml0Zm55aXd4andwcWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNDkxMjMsImV4cCI6MjA5NDYyNTEyM30.n4Z78tD-LS2TNZX_c_Uu77UCbzXwCGfBQ6e1hU7l-bg';
const ADMIN_TOKEN = '2dc3ac19ddedfdc829d75747b46c814402ad63e4f706534c';
const UPLOAD_FN = 'https://sgvalritfnyiwxjwpqjj.supabase.co/functions/v1/upload-vocab-image-b64';

const UNMATCHED = JSON.parse(fs.readFileSync(
  resolve(ROOT, 'scripts/word_image_unmatched.json'), 'utf8'
));

// --- args -------------------------------------------------------------------

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const val = process.argv[i + 1];
  return val && !val.startsWith('--') ? val : true;
}

const DRY_RUN = !!arg('dry-run', false);
const LIMIT = parseInt(arg('limit', '0'), 10) || UNMATCHED.length;
const SKIP = parseInt(arg('skip', '0'), 10);
const CONCURRENCY = parseInt(arg('concurrency', '1'), 10);
const DELAY_MS = parseInt(arg('delay', '1500'), 10); // ms between requests per worker
const QUALITY = arg('quality', 'low'); // low | medium | high
const SIZE = arg('size', '1024x1024');
const MODEL = arg('model', 'gpt-image-2');

// --- helpers ----------------------------------------------------------------

// Replace ʿ (ayn) and ʾ (hamza) with `_` — storage keys must be ASCII, and a
// straight strip caused `w_baʿd` → `w_bad` collision in the first pass.
function sanitizeTarget(wordId) {
  return wordId.replace(/[ʿʾ]/g, '_') + '.png';
}

// Prompt template ported verbatim from Englishlearning/scripts/generate_and_upload_images.py
// (STYLE_BASE). Same style keeps the new images visually consistent with the
// 2,232 already imported from the English app.
function buildPrompt(english) {
  const cleaned = english
    .replace(/\([^)]*\)/g, ' ')
    .replace(/["“”'’]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return `Create an image that clearly portrays the meaning of the word "${cleaned}" for a language learning flashcard.
The image should immediately help a learner understand what this word means.

Style: Ultra-minimalist flat vector illustration with only essential elements - no unnecessary details or clutter.
Clean solid colors, no gradients or shading. White background. No text or labels.
Single focused subject, centered composition, simple geometric shapes.
Bright cheerful colors suitable for educational content.`;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function generateImage(prompt) {
  // Retry on 429 (rate limit) and 5xx (server-side hiccups) with exponential backoff.
  const MAX_ATTEMPTS = 6;
  let attempt = 0;
  let lastErr;
  while (attempt < MAX_ATTEMPTS) {
    attempt++;
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${OPENAI_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        n: 1,
        size: SIZE,
        quality: QUALITY,
        background: 'opaque',
      }),
    });
    if (res.ok) {
      const json = await res.json();
      const b64 = json?.data?.[0]?.b64_json;
      if (!b64) throw new Error('no b64_json in response');
      return b64;
    }
    const text = await res.text();
    const retriable = res.status === 429 || (res.status >= 500 && res.status < 600);
    lastErr = new Error(`openai ${res.status}: ${text.slice(0, 300)}`);
    if (!retriable || attempt === MAX_ATTEMPTS) throw lastErr;
    // Honor Retry-After if present, else exponential backoff (2s, 4s, 8s, …).
    const retryAfter = parseInt(res.headers.get('retry-after') ?? '', 10);
    const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter * 1000
      : Math.min(2000 * 2 ** (attempt - 1), 30000);
    process.stdout.write(`[${res.status} retry in ${Math.round(waitMs / 1000)}s] `);
    await sleep(waitMs);
  }
  throw lastErr;
}

async function uploadOne({ b64, target, word_id }) {
  const res = await fetch(UPLOAD_FN, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${ANON_JWT}`,
      'apikey': ANON_JWT,
      'x-admin-token': ADMIN_TOKEN,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      items: [{ b64, content_type: 'image/png', target, word_id, dialect: 'saudi' }],
    }),
  });
  if (!res.ok) throw new Error(`upload ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const r = json?.results?.[0];
  if (!r?.ok) throw new Error(`upload result: ${r?.error ?? 'unknown'}`);
}

// --- main -------------------------------------------------------------------

const todo = UNMATCHED.slice(SKIP, SKIP + LIMIT);

console.log(`OpenAI ${MODEL}  quality=${QUALITY}  size=${SIZE}  background=opaque`);
console.log(`Generating ${todo.length} images  (skip=${SKIP}, limit=${LIMIT}, concurrency=${CONCURRENCY}, delay=${DELAY_MS}ms)`);
console.log(`Dry run: ${DRY_RUN}`);
console.log('');

if (DRY_RUN) {
  for (const w of todo.slice(0, 10)) {
    console.log(`  ${w.word_id.padEnd(24)} ${sanitizeTarget(w.word_id).padEnd(28)} ${buildPrompt(w.english)}`);
  }
  if (todo.length > 10) console.log(`  ... +${todo.length - 10} more`);
  process.exit(0);
}

let ok = 0;
let fail = 0;
const failures = [];

// Mirrors Englishlearning/scripts/generate_and_upload_images.py:
//   1024×1024 PNG kept on local disk under scripts/generated_images_fullsize/
//   256×256 PNG uploaded to Supabase (smaller payload, faster app loads).
// Uses macOS-builtin `sips` so we don't pull a native image lib.
function resizePngToSquare(srcPath, outPx) {
  const tmp = `${os.tmpdir()}/arabreezy_resize_${process.pid}_${Date.now()}.png`;
  execFileSync('sips', ['-z', String(outPx), String(outPx), srcPath, '--out', tmp], { stdio: 'ignore' });
  const bytes = fs.readFileSync(tmp);
  fs.unlinkSync(tmp);
  return bytes;
}

async function processOne(w) {
  const target = sanitizeTarget(w.word_id);
  const prompt = buildPrompt(w.english);
  try {
    const b64Full = await generateImage(prompt);
    // 1. Save full-size 1024×1024 to local disk (PNG)
    const fullPath = resolve(FULLSIZE_DIR, `${w.word_id}.png`);
    fs.writeFileSync(fullPath, Buffer.from(b64Full, 'base64'));
    // 2. Resize to 256×256 via sips, base64-encode the smaller bytes
    const smallBytes = resizePngToSquare(fullPath, RESIZE_PX);
    const smallB64 = smallBytes.toString('base64');
    // 3. Upload only the small version to Supabase
    await uploadOne({ b64: smallB64, target, word_id: w.word_id });
    ok++;
    process.stdout.write(`. `);
  } catch (e) {
    fail++;
    failures.push({ word_id: w.word_id, english: w.english, error: String(e.message ?? e) });
    process.stdout.write(`x `);
  }
  if ((ok + fail) % 25 === 0) process.stdout.write(`\n[${ok + fail}/${todo.length}] ok=${ok} fail=${fail}\n`);
}

// Simple bounded-concurrency runner with a per-worker delay between requests
// to keep us well under the gpt-image-2 rate limit. Default is concurrency=1
// + 1.5s delay → ~40 images/minute, well below typical Tier 1 limits.
const queue = todo.slice();
async function worker() {
  while (queue.length) {
    const w = queue.shift();
    if (!w) return;
    await processOne(w);
    if (queue.length && DELAY_MS > 0) await sleep(DELAY_MS);
  }
}

const workers = Array.from({ length: Math.max(1, CONCURRENCY) }, () => worker());
await Promise.all(workers);

console.log(`\n\nDone. ok=${ok} fail=${fail}`);
if (failures.length) {
  const outPath = resolve(ROOT, 'scripts/generate_failures.json');
  fs.writeFileSync(outPath, JSON.stringify(failures, null, 2));
  console.log(`Failures written to ${outPath}`);
}
