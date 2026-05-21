import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';

const url = 'https://sgvalritfnyiwxjwpqjj.supabase.co';
const key = 'sb_publishable_4xQz3k0RiARgKLmWLgLnFQ_Rl_BUBGr';
const supabase = createClient(url, key, { auth: { persistSession: false } });

const all = [];
let from = 0;
const step = 1000;
while (true) {
  const { data, error } = await supabase
    .from('words')
    .select('word_id,english,phase')
    .eq('dialect', 'saudi')
    .order('word_id', { ascending: true })
    .range(from, from + step - 1);
  if (error) { console.error(error); process.exit(1); }
  if (!data.length) break;
  all.push(...data);
  if (data.length < step) break;
  from += step;
}
console.log('Total Arabic words:', all.length);
fs.writeFileSync('/Users/ethanhoppe/Documents/Cursor_Code/arabreezy/scripts/arabreezy_words.json', JSON.stringify(all, null, 2));
