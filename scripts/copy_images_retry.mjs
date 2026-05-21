import fs from 'node:fs';

const ANON_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndmFscml0Zm55aXd4andwcWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNDkxMjMsImV4cCI6MjA5NDYyNTEyM30.n4Z78tD-LS2TNZX_c_Uu77UCbzXwCGfBQ6e1hU7l-bg';
const ADMIN_TOKEN = '2dc3ac19ddedfdc829d75747b46c814402ad63e4f706534c';
const FN_URL = 'https://sgvalritfnyiwxjwpqjj.supabase.co/functions/v1/copy-vocab-images';

const failures = JSON.parse(fs.readFileSync(
  '/Users/ethanhoppe/Documents/Cursor_Code/arabreezy/scripts/copy_failures.json', 'utf8'
));

// Sanitize: ayn (ʿ) → empty; hamza (ʾ) → empty. Storage keys must be ASCII.
function sanitize(target) {
  return target.replace(/[ʿʾ]/g, '');
}

const todo = failures.map(f => ({
  source: f.source,
  target: sanitize(f.target),
  word_id: f.word_id,
  dialect: f.dialect,
}));

console.log(`Retrying ${todo.length} sanitized targets`);

const resp = await fetch(FN_URL, {
  method: 'POST',
  headers: {
    'authorization': `Bearer ${ANON_JWT}`,
    'apikey': ANON_JWT,
    'x-admin-token': ADMIN_TOKEN,
    'content-type': 'application/json',
  },
  body: JSON.stringify({ items: todo }),
});
if (!resp.ok) { console.error('fn', resp.status, await resp.text()); process.exit(1); }
const { results } = await resp.json();
const fails = results.filter(r => !r.ok);
console.log(`Done. ok=${results.length - fails.length} fail=${fails.length}`);
if (fails.length) console.log('Fails:', fails);
