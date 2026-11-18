#!/usr/bin/env node
/**
 * build-onc-route-pages.mjs
 *
 * Rewrites the generated class list inside each routing node (odse-tox-route-*) of src/data/trees/onc-drug-side-effects.ts
 * from the drug data (src/data/onc-drugs, via routeClassList). A SOURCE rewrite on purpose: the tree file must stay one literal
 * `_NODES` array that the regex gates can read, with no imports, spreads or runtime computation.
 *
 * The region is the text between two fixed phrases in the node body (ordinary text, see route-lists.ts). Idempotent: a second run
 * changes nothing. Run order: `bunx tsc` -> this script -> `bunx tsc` -> the index builders.
 *   node scripts/build-onc-route-pages.mjs          rewrite the tree file
 *   node scripts/build-onc-route-pages.mjs --check  exit 1 if any list is out of date (writes nothing)
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TREE = path.join(ROOT, 'src', 'data', 'trees', 'onc-drug-side-effects.ts');
const imp = (rel) => import(pathToFileURL(path.join(ROOT, 'docs', rel)).href);
const od = await imp('data/onc-drugs/index.js');
const rl = await imp('data/onc-drugs/route-lists.js');
const check = process.argv.includes('--check');

// the tree source writes bullets as \u2022 and quotes as \" inside double-quoted strings; mirror that when inserting
const escapeForSource = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\u0080-\uffff]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
const rawFor = (s) => escapeForSource(s).replace(/\n/g, '\\n');

let src = fs.readFileSync(TREE, 'utf8');
let changed = 0;
const stale = [];
for (const t of od.ONC_DATA.toxicities) {
  const nodeId = t.page.tree === od.ONC_TREE_ID ? t.page.node : null;
  if (!nodeId || !nodeId.startsWith('odse-tox-route-')) continue;
  const toxIds = od.ONC_DATA.toxicities.filter((x) => x.page.node === nodeId).map((x) => x.id);
  const reg = rl.ROUTE_REGIONS[nodeId] ?? { before: rl.ROUTE_LIST_BEFORE, after: rl.ROUTE_LIST_AFTER };
  const start = src.indexOf(`id: "${nodeId}"`);
  if (start < 0) { console.error(`routing node ${nodeId} not found in the tree file`); process.exit(2); }
  const end = src.indexOf('\n  },', start);
  const block = src.slice(start, end);
  const bRaw = rawFor(reg.before), aRaw = rawFor(reg.after);
  const a = block.indexOf(bRaw), b = block.indexOf(aRaw, a + 1);
  if (a < 0 || b < 0) { console.error(`routing node ${nodeId}: fixed phrases not found`); process.exit(2); }
  const cur = block.slice(a + bRaw.length, b);
  const want = rawFor(rl.routeClassList(toxIds, od.ONC_DATA));
  if (cur === want) continue;
  stale.push(nodeId);
  changed++;
  src = src.slice(0, start) + block.slice(0, a + bRaw.length) + want + block.slice(b) + src.slice(end);
}
if (check) { if (stale.length) { console.error(`out of date: ${stale.join(', ')}`); process.exit(1); } console.log('routing pages up to date'); process.exit(0); }
if (changed) fs.writeFileSync(TREE, src);
console.log(`routing pages: ${changed} rewritten`);
