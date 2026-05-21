import fs from 'node:fs';

// REST works with publishable key; edge functions verify_jwt requires legacy JWT-format anon key.
const ANON_KEY = 'sb_publishable_4xQz3k0RiARgKLmWLgLnFQ_Rl_BUBGr';
const ANON_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndmFscml0Zm55aXd4andwcWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNDkxMjMsImV4cCI6MjA5NDYyNTEyM30.n4Z78tD-LS2TNZX_c_Uu77UCbzXwCGfBQ6e1hU7l-bg';
const ADMIN_TOKEN = '2dc3ac19ddedfdc829d75747b46c814402ad63e4f706534c';
const FN_URL = 'https://sgvalritfnyiwxjwpqjj.supabase.co/functions/v1/copy-vocab-images';
const REST_URL = 'https://sgvalritfnyiwxjwpqjj.supabase.co/rest/v1/words';

const matches = JSON.parse(fs.readFileSync(
  '/Users/ethanhoppe/Documents/Cursor_Code/arabreezy/scripts/word_image_matches.json', 'utf8'
));

// Allow CLI args to limit how many we copy (for testing)
const LIMIT = process.argv[2] ? parseInt(process.argv[2], 10) : matches.length;
const SKIP = process.argv[3] ? parseInt(process.argv[3], 10) : 0;
const BATCH = 25;

const todo = matches.slice(SKIP, SKIP + LIMIT).map(m => ({
  source: m.image,
  target: `${m.word_id}.png`,
  word_id: m.word_id,
  dialect: 'saudi',
}));

console.log(`Copying ${todo.length} images in batches of ${BATCH}`);

async function copyBatch(batch) {
  const resp = await fetch(FN_URL, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${ANON_JWT}`,
      'apikey': ANON_JWT,
      'x-admin-token': ADMIN_TOKEN,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ items: batch }),
  });
  if (!resp.ok) throw new Error(`fn ${resp.status}: ${await resp.text()}`);
  return await resp.json();
}

// DB update now happens inside the edge function (it has service role).

let totalOk = 0, totalFail = 0;
const failures = [];

for (let i = 0; i < todo.length; i += BATCH) {
  const batch = todo.slice(i, i + BATCH);
  const { results } = await copyBatch(batch);
  for (let j = 0; j < batch.length; j++) {
    const r = results[j];
    if (r?.ok) totalOk++;
    else { totalFail++; failures.push({ ...batch[j], error: r?.error ?? 'unknown' }); }
  }
  console.log(`  batch ${Math.floor(i/BATCH)+1}/${Math.ceil(todo.length/BATCH)}: ok=${results.filter(r=>r?.ok).length} fail=${results.filter(r=>!r?.ok).length}`);
}

console.log(`\nDone. ok=${totalOk} fail=${totalFail}`);
if (failures.length) {
  fs.writeFileSync(
    '/Users/ethanhoppe/Documents/Cursor_Code/arabreezy/scripts/copy_failures.json',
    JSON.stringify(failures, null, 2),
  );
  console.log(`Failure details: scripts/copy_failures.json`);
}
