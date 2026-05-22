#!/usr/bin/env node
// =====================================================================
// MedKitt — Supabase Snapshot
//
// Exports the current Supabase state for a consult (or a single category) so
// the staged-then-flip flow has a deterministic rollback target. Snapshots
// land under .deploy-state/snapshots/ as JSON, one file per invocation:
//
//   .deploy-state/snapshots/<tree-id>-<ISO-UTC>.json
//
// Tables captured per consult:
//   - decision_trees       (single row by id)
//   - category_trees       (all rows for this tree_id)
//   - tree_citations       (all rows for this tree_id)
//   - decision_nodes       (all rows for this tree_id)
//   - drugs                (rows referenced by the consult's compiled JS, if any)
//   - info_pages           (info-page IDs referenced by the consult's compiled JS, if any)
//
// Format per file:
//   {
//     "tree_id": "<id>",
//     "captured_at": "<ISO-UTC>",
//     "service_role_key_fingerprint": "<sha256[:8] of the key used>",
//     "tables": {
//       "decision_trees": [...],
//       "category_trees": [...],
//       ...
//     },
//     "sha256": "<sha256 of tables JSON>"
//   }
//
// Usage:
//   node scripts/supabase-snapshot.mjs <tree-id>
//   node scripts/supabase-snapshot.mjs <tree-id> --dry-run    # log selects, don't write
// =====================================================================

import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const envPath = resolve(projectRoot, '.env');
const snapshotDir = resolve(projectRoot, '.deploy-state', 'snapshots');

// --- Env ---------------------------------------------------------------
function loadEnv() {
  if (!existsSync(envPath)) {
    throw new Error('No .env file found — need SUPABASE_SERVICE_ROLE_KEY for snapshot.');
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
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
};

// --- Args --------------------------------------------------------------
const args = process.argv.slice(2);
const treeId = args.find(a => !a.startsWith('--'));
const isDryRun = args.includes('--dry-run');
if (!treeId) {
  console.error('Usage: node scripts/supabase-snapshot.mjs <tree-id> [--dry-run]');
  process.exit(1);
}

// --- REST select ------------------------------------------------------
async function selectAll(table, filter) {
  const url = `${BASE}/${table}?${filter}&select=*`;
  if (isDryRun) {
    console.log(`  [DRY RUN] SELECT ${table} where ${filter}`);
    return [];
  }
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`SELECT ${table} (filter=${filter}) failed: ${res.status} ${err}`);
  }
  return await res.json();
}

// --- Snapshot ----------------------------------------------------------
console.log(`\n📸 Snapshot "${treeId}"${isDryRun ? ' (DRY RUN)' : ''}...`);

const tables = {};
tables.decision_trees   = await selectAll('decision_trees',   `id=eq.${treeId}`);
tables.category_trees   = await selectAll('category_trees',   `tree_id=eq.${treeId}`);
tables.tree_citations   = await selectAll('tree_citations',   `tree_id=eq.${treeId}`);
tables.decision_nodes   = await selectAll('decision_nodes',   `tree_id=eq.${treeId}`);

// Drugs + info pages aren't strictly tree-scoped in Supabase, so we leave those
// captures to the caller. supabase-push.mjs's `--drugs` / `--info-pages` flags
// already list the specific rows being modified — pass that same list to the
// rollback script via the manifest mechanism (R21) rather than slurping all
// drugs every snapshot.

const capturedAt = new Date().toISOString();
const keyFingerprint = createHash('sha256').update(SERVICE_KEY).digest('hex').slice(0, 8);
const tablesJson = JSON.stringify(tables, null, 2);
const tablesSha = createHash('sha256').update(tablesJson).digest('hex');

const snapshot = {
  tree_id: treeId,
  captured_at: capturedAt,
  service_role_key_fingerprint: keyFingerprint,
  tables,
  sha256: tablesSha,
};

if (isDryRun) {
  console.log('  (DRY RUN — not writing)');
  console.log(`  Would write ~${tablesJson.length} bytes`);
  console.log(`  Row counts: decision_trees=${tables.decision_trees.length} category_trees=${tables.category_trees.length} tree_citations=${tables.tree_citations.length} decision_nodes=${tables.decision_nodes.length}`);
  process.exit(0);
}

mkdirSync(snapshotDir, { recursive: true });
const isoForFile = capturedAt.replace(/[:.]/g, '-');
const outPath = resolve(snapshotDir, `${treeId}-${isoForFile}.json`);
writeFileSync(outPath, JSON.stringify(snapshot, null, 2));
console.log(`✅ Snapshot written: ${outPath}`);
console.log(`   Rows: decision_trees=${tables.decision_trees.length} category_trees=${tables.category_trees.length} tree_citations=${tables.tree_citations.length} decision_nodes=${tables.decision_nodes.length}`);
console.log(`   sha256(tables) = ${tablesSha.slice(0, 16)}...`);
