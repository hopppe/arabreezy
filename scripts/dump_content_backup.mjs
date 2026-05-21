#!/usr/bin/env node
// Dumps every Saudi-dialect content row to local .md files so we always have a
// recoverable snapshot. Run this:
//   - after any Supabase content change
//   - before any release
//   - on a cron (weekly) for drift safety
//
// Output layout:
//   .claude/skills/e2e-test/content-backup/
//     lessons/phase-1.md, phase-2.md, ...
//     shadowing_phrases/phase-1.md, ...
//     stories/phase-1.md, ...
//     listening_exercises/...
//     idioms/...
//     pronunciation_targets/...
//     grammar_drills/...
//     conversations/...
//     words/phase-1.md, ...
//     roots.md (single file)
//
// Each .md starts with a YAML-ish header (phase, table, count, timestamp),
// then each row is rendered as a fenced JSON block. Easy to grep/diff in git.

import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs/promises';
import path from 'node:path';
import 'dotenv/config';

const URL = process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SECRET_KEY;

if (!URL || !KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env / .env.local');
  process.exit(1);
}

const supabase = createClient(URL, KEY, { auth: { persistSession: false } });

const OUT = path.resolve('.claude/skills/e2e-test/content-backup');
const DIALECT = 'saudi';
const NOW = new Date().toISOString();

const TABLES = [
  { name: 'lessons', orderBy: 'lesson_id', idCol: 'lesson_id' },
  { name: 'shadowing_phrases', orderBy: 'phrase_id', idCol: 'phrase_id' },
  { name: 'conversations', orderBy: 'conversation_id', idCol: 'conversation_id' },
  { name: 'stories', orderBy: 'story_id', idCol: 'story_id' },
  { name: 'listening_exercises', orderBy: 'listening_id', idCol: 'listening_id' },
  { name: 'idioms', orderBy: 'idiom_id', idCol: 'idiom_id' },
  { name: 'pronunciation_targets', orderBy: 'target_id', idCol: 'target_id' },
  { name: 'grammar_drills', orderBy: 'drill_id', idCol: 'drill_id' },
  { name: 'words', orderBy: 'word_id', idCol: 'word_id' },
];

// Supabase default limit is 1000 rows per request. We paginate explicitly to
// be sure we get every row of words (~3000) and any future big table.
async function selectAllPaginated(name, orderBy) {
  const PAGE = 1000;
  let all = [];
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from(name)
      .select('*')
      .eq('dialect', DIALECT)
      .order('phase', { ascending: true })
      .order(orderBy, { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    all = all.concat(data || []);
    if (!data || data.length < PAGE) break;
    from += PAGE;
  }
  return all;
}

async function dumpPhasedTable({ name, orderBy, idCol }) {
  const dir = path.join(OUT, name);
  await fs.mkdir(dir, { recursive: true });

  let data;
  try {
    data = await selectAllPaginated(name, orderBy);
  } catch (e) {
    console.warn(`  [${name}] read failed:`, e.message);
    return;
  }

  // Group by phase
  const byPhase = new Map();
  for (const row of data) {
    const p = row.phase ?? 0;
    if (!byPhase.has(p)) byPhase.set(p, []);
    byPhase.get(p).push(row);
  }

  for (const [phase, rows] of [...byPhase.entries()].sort((a, b) => a[0] - b[0])) {
    const file = path.join(dir, `phase-${phase}.md`);
    const lines = [];
    lines.push(`# ${name} · phase ${phase} · dialect ${DIALECT}`);
    lines.push('');
    lines.push(`- count: **${rows.length}**`);
    lines.push(`- dumped: ${NOW}`);
    lines.push('');
    lines.push('Each row is one JSON block. Diff this file in git to see content drift.');
    lines.push('');
    for (const row of rows) {
      const id = row[idCol] || row.lesson_id || row.phrase_id || row.conversation_id ||
                 row.story_id || row.listening_id || row.idiom_id ||
                 row.target_id || row.drill_id || row.word_id || '(no-id)';
      lines.push(`## \`${id}\``);
      lines.push('');
      lines.push('```json');
      lines.push(JSON.stringify(row, null, 2));
      lines.push('```');
      lines.push('');
    }
    await fs.writeFile(file, lines.join('\n'));
    console.log(`  ${file} (${rows.length} rows)`);
  }
}

async function dumpRoots() {
  const dir = OUT;
  await fs.mkdir(dir, { recursive: true });
  const { data, error } = await supabase.from('roots').select('*').eq('dialect', DIALECT).order('letters');
  if (error) {
    console.warn('  [roots] read failed:', error.message);
    return;
  }
  const file = path.join(dir, 'roots.md');
  const lines = [];
  lines.push(`# roots · dialect ${DIALECT}`);
  lines.push('');
  lines.push(`- count: **${data.length}**`);
  lines.push(`- dumped: ${NOW}`);
  lines.push('');
  for (const row of data) {
    lines.push(`## \`${row.letters}\``);
    lines.push('');
    lines.push('```json');
    lines.push(JSON.stringify(row, null, 2));
    lines.push('```');
    lines.push('');
  }
  await fs.writeFile(file, lines.join('\n'));
  console.log(`  ${file} (${data.length} rows)`);
}

console.log('Dumping Supabase content backup →', OUT);
for (const t of TABLES) {
  console.log(t.name);
  await dumpPhasedTable(t);
}
console.log('roots');
await dumpRoots();
console.log('Done.');
