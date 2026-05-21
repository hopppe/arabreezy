#!/usr/bin/env node
// Seed Supabase with the Saudi dialect bundle.
//
// Usage (from repo root):
//   node scripts/seedSupabase.mjs
//
// Requires .env.local with SUPABASE_URL + SUPABASE_SECRET_KEY (or
// SUPABASE_SERVICE_ROLE). These never ship in the app bundle.
//
// Re-run at any time: every insert is an upsert, so it's idempotent.
//
// Seeds: patterns (global), and per-dialect: words (with root/pattern/drift
// fields), roots, lessons, conversations, shadowing_phrases.

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function loadEnvFile(path) {
  try {
    const raw = readFileSync(path, 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}

loadEnvFile(resolve(ROOT, '.env.local'));
loadEnvFile(resolve(ROOT, '.env'));

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    'Missing credentials. Copy .env.local.example to .env.local and fill in ' +
      'SUPABASE_URL + SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE).'
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function importDefault(rel) {
  const url = pathToFileURL(resolve(ROOT, rel)).href;
  const mod = await import(url);
  return mod.default;
}

async function importNamed(rel, name) {
  const url = pathToFileURL(resolve(ROOT, rel)).href;
  const mod = await import(url);
  return mod[name];
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function upsertChunked(table, rows, conflictTarget, label) {
  if (!rows.length) {
    console.log(`  ${label}: nothing to seed`);
    return;
  }
  for (const batch of chunk(rows, 200)) {
    const { error } = await supabase.from(table).upsert(batch, { onConflict: conflictTarget });
    if (error) throw new Error(`${table}: ${error.message}`);
  }
  console.log(`  ${label}: ${rows.length} rows`);
}

async function seedPatterns() {
  console.log('\n→ Seeding patterns (global)');
  const PATTERNS = await importNamed('src/data/patterns.js', 'PATTERNS');
  const rows = (PATTERNS || []).map((p) => ({
    pattern_id: p.id,
    template: p.template,
    example: p.example ?? null,
    gloss: p.gloss,
    introduced_at: p.introducedAt,
  }));
  await upsertChunked('patterns', rows, 'pattern_id', 'patterns');
}

async function seedDialect(dialect) {
  console.log(`\n→ Seeding dialect: ${dialect}`);
  const bundle = await importDefault(`src/data/dialects/${dialect}/index.js`);

  const words = Object.values(bundle.words || {}).map((w) => ({
    dialect,
    word_id: w.id,
    script: w.script,
    transliteration: w.transliteration,
    english: w.english,
    phase: w.phase,
    notes: w.notes ?? null,
    audio: w.audio ?? null,
    root_ref: w.rootRef ?? null,
    pattern: w.pattern ?? null,
    semantic_drift: w.semanticDrift ?? null,
    drift_note: w.driftNote ?? null,
  }));

  const roots = Object.values(bundle.roots || {}).map((r) => ({
    dialect,
    root_id: r.id,
    letters: r.letters ?? [],
    transliteration: r.transliteration,
    core: r.core,
    introduced_at: r.introducedAt,
    derivations: r.derivations ?? [],
  }));

  const lessons = (bundle.lessons || []).map((l) => ({
    dialect,
    lesson_id: l.id,
    phase: l.phase,
    title: l.title,
    intro: l.intro ?? null,
    focal_word_ids: l.focalWordIds ?? [],
    dialogue: l.dialogue ?? [],
    check_questions: l.check ?? [],
  }));

  const conversations = (bundle.conversations || []).map((c) => ({
    dialect,
    conversation_id: c.id,
    phase: c.phase,
    title: c.title,
    description: c.description ?? null,
    focal_word_ids: c.focalWordIds ?? [],
    steps: c.steps ?? [],
    completion_message: c.completionMessage ?? null,
  }));

  const shadowing = (bundle.shadowing || []).map((s) => ({
    dialect,
    phrase_id: s.id,
    phase: s.phase,
    word_ref: s.wordRef ?? null,
    script: s.script,
    transliteration: s.transliteration,
    english: s.english,
    audio: s.audio ?? null,
  }));

  await upsertChunked('words', words, 'dialect,word_id', 'words');
  await upsertChunked('roots', roots, 'dialect,root_id', 'roots');
  await upsertChunked('lessons', lessons, 'dialect,lesson_id', 'lessons');
  await upsertChunked('conversations', conversations, 'dialect,conversation_id', 'conversations');
  await upsertChunked('shadowing_phrases', shadowing, 'dialect,phrase_id', 'shadowing');
}

async function main() {
  console.log(`Seeding ${SUPABASE_URL}`);
  await seedPatterns();
  for (const dialect of ['saudi']) {
    await seedDialect(dialect);
  }
  console.log('\nDone.');
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message);
  process.exit(1);
});
