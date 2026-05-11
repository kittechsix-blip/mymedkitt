#!/usr/bin/env node
/**
 * lint-critical-actions.mjs
 *
 * Validates that every nodeId referenced in a tree's *_CRITICAL_ACTIONS array
 * exists as an `id:` field on a node in the same tree's *_NODES array.
 *
 * Catches the dominant Prong-4 failure mode in the medkitt library:
 * broken criticalActions linkage (authored against tentative nodeIds, never
 * reconciled after node rename/restructure).
 *
 * Usage:
 *   node scripts/lint-critical-actions.mjs                # lint all trees
 *   node scripts/lint-critical-actions.mjs --tree foo     # lint single tree
 *   node scripts/lint-critical-actions.mjs --strict       # exit 1 on any failure
 *
 * Implementation note: This is a TEXT-LEVEL lint. It parses the .ts source
 * for `*_CRITICAL_ACTIONS = [ ... { nodeId: 'x' } ... ]` and `*_NODES: DecisionNode[] = [ ... { id: 'x' } ... ]`
 * via regex. It does NOT require compilation. Fast (~50ms per tree).
 *
 * Carry-forward resolution: Priority 4 finding (open 4 audits — Louis Litt
 * 2026-05-06 / 05-07 / 05-09 / 05-10). Would have caught all linkage findings
 * from those batches before deploy.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TREES_DIR = path.resolve(__dirname, '..', 'src', 'data', 'trees');

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const treeArgIdx = args.indexOf('--tree');
const singleTree = treeArgIdx !== -1 ? args[treeArgIdx + 1] : null;

const treeFiles = singleTree
  ? [singleTree.endsWith('.ts') ? singleTree : `${singleTree}.ts`]
  : fs.readdirSync(TREES_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_') && f !== 'index.ts');

let totalChecked = 0;
let totalFailures = 0;
const failureReport = [];

for (const file of treeFiles) {
  const fp = path.join(TREES_DIR, file);
  let src;
  try {
    src = fs.readFileSync(fp, 'utf8');
  } catch (e) {
    console.error(`SKIP ${file}: cannot read (${e.code})`);
    continue;
  }

  // Find the CRITICAL_ACTIONS array (zero or more allowed per file)
  // Pattern: export const FOO_CRITICAL_ACTIONS = [ ... ];
  const caMatch = src.match(/export const \w+_CRITICAL_ACTIONS\s*=\s*\[([\s\S]*?)\];/);
  if (!caMatch) {
    // No CRITICAL_ACTIONS array — skip silently (not every tree has one)
    continue;
  }

  // Find the NODES array
  const nodesMatch = src.match(/export const \w+_NODES\s*:\s*DecisionNode\[\]\s*=\s*\[([\s\S]*)\];/);
  if (!nodesMatch) {
    failureReport.push({ file, error: 'has CRITICAL_ACTIONS but no NODES array found' });
    totalFailures++;
    continue;
  }

  totalChecked++;

  // Extract all referenced nodeIds from CRITICAL_ACTIONS
  const refNodeIds = [];
  const refRegex = /nodeId:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = refRegex.exec(caMatch[1])) !== null) {
    refNodeIds.push(m[1]);
  }

  // Extract all node ids defined in NODES
  const defNodeIds = new Set();
  const defRegex = /\bid:\s*['"]([^'"]+)['"]/g;
  while ((m = defRegex.exec(nodesMatch[1])) !== null) {
    defNodeIds.add(m[1]);
  }

  // Validate
  const broken = refNodeIds.filter(id => !defNodeIds.has(id));
  if (broken.length > 0) {
    failureReport.push({
      file,
      broken,
      totalActions: refNodeIds.length,
      validActions: refNodeIds.length - broken.length,
    });
    totalFailures++;
  }
}

// Report
if (failureReport.length === 0) {
  console.log(`PASS — ${totalChecked} trees checked, all CRITICAL_ACTIONS nodeIds resolve to defined nodes.`);
  process.exit(0);
}

console.log(`\nFAIL — ${failureReport.length}/${totalChecked} trees have broken CRITICAL_ACTIONS linkage:\n`);
for (const f of failureReport) {
  if (f.error) {
    console.log(`  ${f.file}: ${f.error}`);
    continue;
  }
  console.log(`  ${f.file}: ${f.broken.length}/${f.totalActions} broken`);
  for (const id of f.broken) {
    console.log(`    - missing node: '${id}'`);
  }
}
console.log('');

if (strict) {
  process.exit(1);
}
// Default: report-only (exit 0) so a single-tree audit doesn't block deploy.
// Run with --strict in CI to block.
process.exit(0);
