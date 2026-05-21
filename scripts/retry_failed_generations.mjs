#!/usr/bin/env node
// Retry the 6 words that failed in the main generate batch:
//   3 transient `fetch failed` → retry with the standard prompt
//   3 OpenAI safety blocks    → retry with a reworded, neutral prompt
//
// Mirrors the rest of generate_missing_images.mjs:
//   - gpt-image-2, quality=low, 1024×1024, opaque background
//   - full size → scripts/generated_images_fullsize/<word_id>.png
//   - resize to 256×256 via macOS sips → upload via upload-vocab-image-b64
//   - DB update is done server-side inside the edge function

import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import os from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FULLSIZE_DIR = resolve(ROOT, 'scripts/generated_images_fullsize');
fs.mkdirSync(FULLSIZE_DIR, { recursive: true });

// env
function loadEnv(path) {
  try {
    const raw = fs.readFileSync(path, 'utf8');
    for (const line of raw.split('\n')) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const eq = t.indexOf('=');
      if (eq === -1) continue;
      const k = t.slice(0, eq).trim();
      const v = t.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
      if (!(k in process.env)) process.env[k] = v;
    }
  } catch (err) { if (err.code !== 'ENOENT') throw err; }
}
loadEnv(resolve(ROOT, 'ai-backend/.env'));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) { console.error('Missing OPENAI_API_KEY'); process.exit(1); }

const ANON_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndmFscml0Zm55aXd4andwcWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNDkxMjMsImV4cCI6MjA5NDYyNTEyM30.n4Z78tD-LS2TNZX_c_Uu77UCbzXwCGfBQ6e1hU7l-bg';
const ADMIN_TOKEN = '2dc3ac19ddedfdc829d75747b46c814402ad63e4f706534c';
const UPLOAD_FN = 'https://sgvalritfnyiwxjwpqjj.supabase.co/functions/v1/upload-vocab-image-b64';

// Standard educational prompt (same STYLE_BASE as the main script).
function standardPrompt(english) {
  const cleaned = english.replace(/\([^)]*\)/g, ' ').replace(/["“”'’]/g, '').replace(/\s+/g, ' ').trim();
  return `Create an image that clearly portrays the meaning of the word "${cleaned}" for a language learning flashcard.
The image should immediately help a learner understand what this word means.

Style: Ultra-minimalist flat vector illustration with only essential elements - no unnecessary details or clutter.
Clean solid colors, no gradients or shading. White background. No text or labels.
Single focused subject, centered composition, simple geometric shapes.
Bright cheerful colors suitable for educational content.`;
}

// Each entry: word_id + the prompt subject to feed STYLE_BASE.
// For safety-blocked words, we substitute a concrete, neutral subject the
// filter won't bite on.
const ITEMS = [
  // --- transient `fetch failed` — retry with standard prompt
  { word_id: 'w_g2_p8_062', subject: 'slower' },
  { word_id: 'w_g2_p8_063', subject: 'older person, elderly' },
  { word_id: 'w_g2_p8_064', subject: 'younger person, child' },

  // --- safety-blocked — reworded with concrete, neutral subjects
  // "oppression / injustice" flagged as [abuse] → use a broken chain
  { word_id: 'w_dhulm', subject: 'broken chain links, scale of justice tilted' },
  // "thirst" flagged as [self-harm] → person drinking water
  { word_id: 'w_g2_p1_128', subject: 'glass of water with droplets, refreshing drink' },
  // "mandi" (Saudi rice dish) flagged as [sexual] → traditional rice platter
  { word_id: 'w_g2_p3_055', subject: 'traditional middle eastern rice platter with roasted lamb on top' },
];

function buildPromptFromSubject(subject) {
  return `Create an image that clearly portrays the meaning of the word "${subject}" for a language learning flashcard.
The image should immediately help a learner understand what this word means.

Style: Ultra-minimalist flat vector illustration with only essential elements - no unnecessary details or clutter.
Clean solid colors, no gradients or shading. White background. No text or labels.
Single focused subject, centered composition, simple geometric shapes.
Bright cheerful colors suitable for educational content.`;
}

function sanitizeTarget(wordId) { return wordId.replace(/[ʿʾ]/g, '_') + '.png'; }

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function resizePngToSquare(srcPath, outPx) {
  const tmp = `${os.tmpdir()}/arabreezy_resize_${process.pid}_${Date.now()}.png`;
  execFileSync('sips', ['-z', String(outPx), String(outPx), srcPath, '--out', tmp], { stdio: 'ignore' });
  const bytes = fs.readFileSync(tmp);
  fs.unlinkSync(tmp);
  return bytes;
}

async function generateImage(prompt) {
  const MAX = 6;
  let lastErr;
  for (let attempt = 1; attempt <= MAX; attempt++) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'authorization': `Bearer ${OPENAI_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-image-2', prompt, n: 1, size: '1024x1024', quality: 'low', background: 'opaque',
      }),
    });
    if (res.ok) {
      const j = await res.json();
      const b64 = j?.data?.[0]?.b64_json;
      if (!b64) throw new Error('no b64_json');
      return b64;
    }
    const text = await res.text();
    const retriable = res.status === 429 || (res.status >= 500 && res.status < 600);
    lastErr = new Error(`openai ${res.status}: ${text.slice(0, 300)}`);
    if (!retriable || attempt === MAX) throw lastErr;
    const ra = parseInt(res.headers.get('retry-after') ?? '', 10);
    const wait = Number.isFinite(ra) && ra > 0 ? ra * 1000 : Math.min(2000 * 2 ** (attempt - 1), 30000);
    await sleep(wait);
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
    body: JSON.stringify({ items: [{ b64, content_type: 'image/png', target, word_id, dialect: 'saudi' }] }),
  });
  if (!res.ok) throw new Error(`upload ${res.status}: ${await res.text()}`);
  const j = await res.json();
  if (!j?.results?.[0]?.ok) throw new Error(`upload result: ${j?.results?.[0]?.error ?? 'unknown'}`);
}

let ok = 0, fail = 0;
const stillFailing = [];

for (const item of ITEMS) {
  const target = sanitizeTarget(item.word_id);
  const prompt = buildPromptFromSubject(item.subject);
  console.log(`→ ${item.word_id}  subject="${item.subject}"`);
  try {
    const b64 = await generateImage(prompt);
    const fullPath = resolve(FULLSIZE_DIR, `${item.word_id}.png`);
    fs.writeFileSync(fullPath, Buffer.from(b64, 'base64'));
    const small = resizePngToSquare(fullPath, 256);
    await uploadOne({ b64: small.toString('base64'), target, word_id: item.word_id });
    console.log(`  ok  full=${fs.statSync(fullPath).size}B  small=${small.length}B`);
    ok++;
  } catch (e) {
    console.log(`  FAIL  ${String(e.message ?? e).slice(0, 200)}`);
    stillFailing.push({ word_id: item.word_id, subject: item.subject, error: String(e.message ?? e) });
    fail++;
  }
  await sleep(1500);
}

console.log(`\nDone. ok=${ok}  fail=${fail}`);
if (stillFailing.length) {
  const out = resolve(ROOT, 'scripts/retry_still_failing.json');
  fs.writeFileSync(out, JSON.stringify(stillFailing, null, 2));
  console.log(`Persistent failures → ${out}`);
}
