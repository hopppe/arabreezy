const ANON_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndmFscml0Zm55aXd4andwcWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNDkxMjMsImV4cCI6MjA5NDYyNTEyM30.n4Z78tD-LS2TNZX_c_Uu77UCbzXwCGfBQ6e1hU7l-bg';
const ADMIN_TOKEN = '2dc3ac19ddedfdc829d75747b46c814402ad63e4f706534c';
const FN_URL = 'https://sgvalritfnyiwxjwpqjj.supabase.co/functions/v1/copy-vocab-images';

// 1) Restore correct image for w_bad ("not good") — from bad.png
// 2) Re-upload w_baʿd ("after") to a non-colliding key w_ba_d.png — from after.png
const items = [
  { source: 'bad.png',   target: 'w_bad.png',   word_id: 'w_bad',  dialect: 'saudi' },
  { source: 'after.png', target: 'w_ba_d.png',  word_id: 'w_baʿd', dialect: 'saudi' },
];

const resp = await fetch(FN_URL, {
  method: 'POST',
  headers: {
    'authorization': `Bearer ${ANON_JWT}`,
    'apikey': ANON_JWT,
    'x-admin-token': ADMIN_TOKEN,
    'content-type': 'application/json',
  },
  body: JSON.stringify({ items }),
});
console.log(resp.status, await resp.text());
