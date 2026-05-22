#!/usr/bin/env node
// Generate Saudi-Arabic pronunciation audio for every word in the `words`
// table that still has audio IS NULL, using OpenAI's TTS endpoint
// (gpt-4o-mini-tts, voice=nova by default — matches /api/tts in the
// ai-backend). The resulting MP3 is uploaded to the `word-audio` Supabase
// storage bucket as `<dialect>/<word_id>.mp3` and the public URL is written
// back to words.audio.
//
// Resume-safe: every successful upload sets words.audio, so a re-run only
// retries rows still null.
//
// Usage:
//   node scripts/generate_word_audio.mjs --dry-run             # preview only
//   node scripts/generate_word_audio.mjs --limit 5             # cheap smoke test
//   node scripts/generate_word_audio.mjs --dialect saudi       # one dialect (default: saudi)
//   node scripts/generate_word_audio.mjs --voice nova          # OpenAI voice
//   node scripts/generate_word_audio.mjs --concurrency 4       # parallel requests
//   node scripts/generate_word_audio.mjs                       # everything missing
//
// Reads OPENAI_API_KEY from ai-backend/.env (never bundled into the app) and
// SUPABASE_URL + SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE) from
// .env.local (gitignored).

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// --- env --------------------------------------------------------------------

function loadEnvFile(path) {
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

loadEnvFile(resolve(ROOT, 'ai-backend/.env'));
loadEnvFile(resolve(ROOT, '.env.local'));
loadEnvFile(resolve(ROOT, '.env'));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TTS_MODEL = process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts';
const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE;

if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY (expected in ai-backend/.env).');
  process.exit(1);
}
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    'Missing SUPABASE_URL + SUPABASE_SECRET_KEY (expected in .env.local).'
  );
  process.exit(1);
}

// --- args -------------------------------------------------------------------

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const val = process.argv[i + 1];
  return val && !val.startsWith('--') ? val : true;
}

const DRY_RUN = !!arg('dry-run', false);
const LIMIT = parseInt(arg('limit', '0'), 10) || null;
const SKIP = parseInt(arg('skip', '0'), 10) || 0;
const DIALECT = String(arg('dialect', 'saudi'));
const VOICE = String(arg('voice', 'nova'));
const CONCURRENCY = Math.max(1, parseInt(arg('concurrency', '4'), 10));
const FORCE = !!arg('force', false); // re-generate even if audio is already set
const BUCKET = 'word-audio';

// --- clients ----------------------------------------------------------------

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// --- helpers ----------------------------------------------------------------

// Safe storage key — keep the original word_id when it's URL-safe, otherwise
// substitute ʿ/ʾ and any non-[A-Za-z0-9_.-] character with '_' (same rule as
// the image script).
function storageKey(wordId) {
  const safe = wordId
    .replace(/[ʿʾ]/g, '_')
    .replace(/[^A-Za-z0-9_.-]/g, '_');
  return `${DIALECT}/${safe}.mp3`;
}

function publicUrl(key) {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
  return data.publicUrl;
}

async function ttsToBuffer(text) {
  const resp = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: TTS_MODEL,
      voice: VOICE,
      input: text,
      format: 'mp3',
    }),
  });
  if (!resp.ok) {
    const errText = await resp.text().catch(() => '');
    throw new Error(`openai_tts_${resp.status}: ${errText.slice(0, 200)}`);
  }
  const arrayBuf = await resp.arrayBuffer();
  return Buffer.from(arrayBuf);
}

async function uploadMp3(key, buf) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(key, buf, {
      contentType: 'audio/mpeg',
      cacheControl: '604800', // 7 days
      upsert: true,
    });
  if (error) throw error;
}

async function setWordAudio(wordId, url) {
  const { error } = await supabase
    .from('words')
    .update({ audio: url })
    .eq('dialect', DIALECT)
    .eq('word_id', wordId);
  if (error) throw error;
}

async function fetchTargets() {
  // Paginate around supabase-js's default 1000-row cap.
  const all = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let q = supabase
      .from('words')
      .select('word_id, script, english, phase, audio')
      .eq('dialect', DIALECT)
      .order('phase', { ascending: true })
      .order('word_id', { ascending: true })
      .range(from, from + PAGE - 1);
    if (!FORCE) q = q.is('audio', null);
    const { data, error } = await q;
    if (error) throw error;
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < PAGE) break;
  }
  return all;
}

async function processOne(row) {
  const key = storageKey(row.word_id);
  const url = publicUrl(key);
  if (DRY_RUN) {
    console.log(`[dry] ${row.word_id.padEnd(28)} P${row.phase}  "${row.script}"  → ${key}`);
    return { ok: true, url };
  }
  const buf = await ttsToBuffer(row.script);
  await uploadMp3(key, buf);
  await setWordAudio(row.word_id, url);
  console.log(`✓ ${row.word_id.padEnd(28)} P${row.phase}  ${(buf.length / 1024).toFixed(1)}KB → ${url}`);
  return { ok: true, url };
}

// --- main -------------------------------------------------------------------

async function main() {
  const start = Date.now();
  const rowsAll = await fetchTargets();
  const rows = rowsAll.slice(SKIP, LIMIT ? SKIP + LIMIT : undefined);
  console.log(
    `Fetched ${rowsAll.length} target words (dialect=${DIALECT}, force=${FORCE}). ` +
      `Processing ${rows.length} after --skip=${SKIP} --limit=${LIMIT ?? 'all'}.`
  );
  if (rows.length === 0) {
    console.log('Nothing to do.');
    return;
  }

  let done = 0;
  let failed = 0;
  const queue = rows.slice();

  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const row = queue.shift();
      try {
        await processOne(row);
      } catch (e) {
        failed += 1;
        console.error(`✗ ${row.word_id} — ${e?.message || e}`);
      } finally {
        done += 1;
        if (done % 25 === 0) {
          console.log(`  …progress ${done}/${rows.length} (failed=${failed})`);
        }
      }
    }
  });
  await Promise.all(workers);

  const secs = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\nDone. ${done - failed}/${rows.length} succeeded in ${secs}s (failed=${failed}).`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
