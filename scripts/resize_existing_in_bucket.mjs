#!/usr/bin/env node
// One-shot: download a few images from our vocabulary-images bucket, resize
// them to 256x256 via macOS sips, save the full-size copy to
// scripts/generated_images_fullsize/, and re-upload the resized version.
//
// Used to retroactively shrink the 3 test images uploaded before the resize
// step was added to generate_missing_images.mjs.

import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import os from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FULLSIZE_DIR = resolve(ROOT, 'scripts/generated_images_fullsize');
fs.mkdirSync(FULLSIZE_DIR, { recursive: true });

const ANON_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndmFscml0Zm55aXd4andwcWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNDkxMjMsImV4cCI6MjA5NDYyNTEyM30.n4Z78tD-LS2TNZX_c_Uu77UCbzXwCGfBQ6e1hU7l-bg';
const ADMIN_TOKEN = '2dc3ac19ddedfdc829d75747b46c814402ad63e4f706534c';
const UPLOAD_FN = 'https://sgvalritfnyiwxjwpqjj.supabase.co/functions/v1/upload-vocab-image-b64';
const PUBLIC_BASE = 'https://sgvalritfnyiwxjwpqjj.supabase.co/storage/v1/object/public/vocabulary-images';

// Word ids whose images were uploaded full-size and need shrinking.
const WORD_IDS = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['w_abaya', 'w_abdoun', 'w_afraid'];

function resizePngToSquare(srcPath, outPx) {
  const tmp = `${os.tmpdir()}/arabreezy_resize_${process.pid}_${Date.now()}.png`;
  execFileSync('sips', ['-z', String(outPx), String(outPx), srcPath, '--out', tmp], { stdio: 'ignore' });
  const bytes = fs.readFileSync(tmp);
  fs.unlinkSync(tmp);
  return bytes;
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

for (const wordId of WORD_IDS) {
  const target = wordId.replace(/[ʿʾ]/g, '_') + '.png';
  const url = `${PUBLIC_BASE}/${target}`;
  console.log(`→ ${wordId}`);
  // 1. Download current (full-size) image from bucket
  const dl = await fetch(url);
  if (!dl.ok) { console.log(`  skip (${dl.status})`); continue; }
  const fullBytes = Buffer.from(await dl.arrayBuffer());
  // 2. Save full-size to local
  const fullPath = resolve(FULLSIZE_DIR, `${wordId}.png`);
  fs.writeFileSync(fullPath, fullBytes);
  // 3. Resize via sips
  const smallBytes = resizePngToSquare(fullPath, 256);
  // 4. Re-upload (upsert overwrites existing)
  await uploadOne({ b64: smallBytes.toString('base64'), target, word_id: wordId });
  console.log(`  full=${fullBytes.length}B  → small=${smallBytes.length}B`);
}
console.log('Done.');
