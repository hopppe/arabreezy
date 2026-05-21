import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';

const url = 'https://ssphzzazhwgblbjgwmqc.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcGh6emF6aHdnYmxiamd3bXFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTUzMTIzOCwiZXhwIjoyMDY3MTA3MjM4fQ.t4pVBRHWu_GY2HWRvT-J5U96yCp5LtAsIH_ZUQilFT0';

const supabase = createClient(url, key, { auth: { persistSession: false } });

const all = [];
let offset = 0;
const limit = 1000;
while (true) {
  const { data, error } = await supabase.storage.from('vocabulary-images').list('', { limit, offset, sortBy: { column: 'name', order: 'asc' } });
  if (error) { console.error(error); process.exit(1); }
  if (!data.length) break;
  all.push(...data);
  if (data.length < limit) break;
  offset += limit;
}
console.log('Total:', all.length);
fs.writeFileSync('/tmp/anafluent_images.json', JSON.stringify(all.map(f => f.name), null, 2));
console.log('First 20:', all.slice(0,20).map(f => f.name));
console.log('Last 20:', all.slice(-20).map(f => f.name));
