// MedKitt — One-off: create the Vascular category in Supabase and re-home its trees.
// Idempotent (merge-duplicates). Run: node scripts/push-vascular-category.mjs
//
// - Inserts/updates the `vascular` category row (metadata + color + sort_order).
// - Removes the stale (cardiology, unilateral-leg-swelling-hub) category_trees row
//   left over from the earlier cross-listing.
// - Upserts the (vascular, tree) category_trees join rows for the three re-homed trees.
//
// The native decision_trees rows (dvt, ischemic-limb, unilateral-leg-swelling-hub) are
// already in Supabase — this only touches `categories` and `category_trees`.

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

async function del(table, filter) {
  const res = await fetch(`${BASE}/${table}?${filter}`, {
    method: 'DELETE',
    headers: { ...HEADERS, 'Prefer': 'return=minimal' },
  });
  if (!res.ok) throw new Error(`${table} delete: ${res.status} ${await res.text()}`);
}

async function main() {
  // Vascular sits alphabetically between us-rads and urology. In the hardcoded
  // DEFAULT_CATEGORIES array its index falls just after us-rads; sort_order 20
  // keeps it ahead of urology (21) without disturbing the others.
  console.log('1) categories: upsert vascular...');
  await upsert('categories', [{
    id: 'vascular',
    name: 'Vascular',
    icon: 'heme-onc.png',
    is_custom: false,
    card_color: '#0277BD',
    icon_bg: '#0277BD',
    text_color: null,
    outline: null,
    sort_order: 20,
  }]);

  console.log('2) category_trees: drop stale (cardiology, unilateral-leg-swelling-hub)...');
  await del('category_trees', 'category_id=eq.cardiology&tree_id=eq.unilateral-leg-swelling-hub');

  console.log('3) category_trees: upsert vascular join rows...');
  await upsert('category_trees', [
    { category_id: 'vascular', tree_id: 'unilateral-leg-swelling-hub', display_title: null, display_subtitle: null, entry_node_id: 'uls-sick-check', sort_order: 0 },
    { category_id: 'vascular', tree_id: 'ischemic-limb',                display_title: null, display_subtitle: null, entry_node_id: null,            sort_order: 1 },
    { category_id: 'vascular', tree_id: 'dvt',                          display_title: null, display_subtitle: null, entry_node_id: null,            sort_order: 2 },
  ]);

  console.log('\n✅ Vascular category pushed to Supabase.');
}

main().catch(e => { console.error(e); process.exit(1); });
