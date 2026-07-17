// MedKitt — One-off: create the Dermatology + ENT categories in Supabase.
// Idempotent (merge-duplicates). Run: node scripts/push-derm-ent-categories.mjs
//
// Inserts/updates the `dermatology` and `ent` category rows (metadata + color +
// sort_order) so that supabase-push.mjs can create category_trees FK references
// to them. The decision_trees + nodes + citations + join rows for the hubs are
// created by `node scripts/supabase-push.mjs <hub-id>` after this runs.
//
// Mirrors push-vascular-category.mjs (same precedent Andy approved).

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env');

function loadEnv() {
  if (!existsSync(envPath)) {
    console.error('ERROR: No .env file found. Need SUPABASE_SERVICE_ROLE_KEY.');
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^([A-Z_]+)=(.+)$/);
    if (match) env[match[1]] = match[2].trim();
  }
  return env;
}

const env = loadEnv();
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!SERVICE_KEY) {
  console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY not found in .env');
  process.exit(1);
}

const BASE = 'https://kzzqloklnxlqbccxbxgr.supabase.co/rest/v1';
const HEADERS = {
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
};

async function upsert(table, rows) {
  const res = await fetch(`${BASE}/${table}`, {
    method: 'POST',
    headers: { ...HEADERS, 'Prefer': 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`${table} upsert: ${res.status} ${await res.text()}`);
}

async function main() {
  // Dermatology + ENT sit after Vascular (20) and Urology (21) in the hardcoded
  // DEFAULT_CATEGORIES array. sort_order 22/23 keeps them last without disturbing
  // the existing order.
  console.log('1) categories: upsert dermatology...');
  await upsert('categories', [{
    id: 'dermatology',
    name: 'Dermatology',
    icon: 'nephro-rheum-endo.png',
    is_custom: false,
    card_color: '#00897B',
    icon_bg: '#00897B',
    text_color: null,
    outline: null,
    sort_order: 22,
  }]);

  console.log('2) categories: upsert ent...');
  await upsert('categories', [{
    id: 'ent',
    name: 'ENT',
    icon: 'ophthalmology.png',
    is_custom: false,
    card_color: '#5D4037',
    icon_bg: '#5D4037',
    text_color: null,
    outline: null,
    sort_order: 23,
  }]);

  console.log('\n✅ Dermatology + ENT categories pushed to Supabase.');
}

main().catch(e => { console.error(e); process.exit(1); });
