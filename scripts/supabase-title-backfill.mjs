#!/usr/bin/env node
/**
 * One-shot Supabase backfill for stale decision_trees rows.
 *
 * Reads categories.ts (source of truth via compiled JS) and finds Supabase
 * rows where title === id OR subtitle is empty. Patches them via PATCH.
 *
 * Mirrors the in-app self-healing logic in src/services/category-service.ts
 * (mergeHardcodedConsults stale-row update). Run this once per deploy if a
 * mass FlowRider scan finds stale Supabase rows.
 *
 * Usage: node scripts/supabase-title-backfill.mjs [--dry-run]
 */

import fs from 'node:fs';
import path from 'node:path';

const DRY = process.argv.includes('--dry-run');

// Load env
const envText = fs.readFileSync(path.resolve('.env'), 'utf-8');
const env = Object.fromEntries(
  envText.split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0,i).trim(), l.slice(i+1).trim()]; })
);
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!KEY) { console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY not in .env'); process.exit(1); }
const BASE = 'https://kzzqloklnxlqbccxbxgr.supabase.co/rest/v1';
const HEADERS = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };

// Pull hardcoded source of truth from compiled JS
const mod = await import(path.resolve('docs/data/categories.js'));
const categories = mod.getAllCategories();
const hardcoded = new Map();
for (const cat of categories) {
  for (const t of cat.decisionTrees) {
    hardcoded.set(t.id, t);
  }
}
console.log(`Hardcoded entries: ${hardcoded.size}`);

// Fetch all Supabase rows
const res = await fetch(`${BASE}/decision_trees?select=id,title,subtitle,node_count`, { headers: HEADERS });
const rows = await res.json();
console.log(`Supabase rows: ${rows.length}`);

const updates = [];
for (const r of rows) {
  const h = hardcoded.get(r.id);
  if (!h) continue;
  // Conservative filter: only fix rows where Andy will visibly see broken UI.
  //   1. title === id (raw slug)
  //   2. title is empty
  //   3. title is short uppercase acronym AND source has expanded form
  //   4. source title strips 'Pediatric'/'Peds' prefix (Andy's alphabetize rule)
  //   5. afe -> Amniotic Fluid Embolism specifically
  const looksLikeSlug = r.title === r.id || !r.title;
  const isAcronymOnly = /^[A-Z][A-Z0-9/\-]{1,8}$/.test(r.title) && h.title && h.title.length > r.title.length + 4;
  const pedsPrefix = /^Pediatric /.test(r.title) && h.title && !/^Pediatric /.test(h.title) && r.title.replace(/^Pediatric /, '') === h.title.replace(/\s*\([^)]+\)\s*$/, '');
  if (looksLikeSlug || isAcronymOnly || pedsPrefix) {
    // Build PATCH body. Only set subtitle if DB row's is empty (don't clobber better content).
    const body = { title: h.title };
    if (!r.subtitle && h.subtitle) body.subtitle = h.subtitle;
    if (looksLikeSlug && typeof h.nodeCount === 'number') body.node_count = h.nodeCount;
    updates.push({
      id: r.id,
      old: { title: r.title, subtitle: r.subtitle, node_count: r.node_count },
      new: body
    });
  }
}

console.log(`\nStale rows to update: ${updates.length}`);
for (const u of updates) {
  console.log(`  ${u.id}: '${u.old.title}'/'${u.old.subtitle}'/${u.old.node_count} -> '${u.new.title}'/'${u.new.subtitle}'/${u.new.node_count}`);
}

if (DRY) { console.log('\n[DRY RUN] No changes pushed.'); process.exit(0); }

console.log(`\nPushing ${updates.length} updates...`);
let ok = 0, fail = 0;
for (const u of updates) {
  const res = await fetch(`${BASE}/decision_trees?id=eq.${encodeURIComponent(u.id)}`, {
    method: 'PATCH',
    headers: { ...HEADERS, Prefer: 'return=minimal' },
    body: JSON.stringify(u.new)
  });
  if (res.ok) { ok++; }
  else { fail++; console.error(`  FAIL ${u.id}: ${res.status} ${await res.text()}`); }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
