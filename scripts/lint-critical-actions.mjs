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
  // Pattern: export const FOO_CRITICAL_ACTIONS [: CriticalAction[]]? = [ ... ];
  // The optional type annotation `: CriticalAction[]` is present in ~50 trees
  // and was previously skipped by this lint — that was the original blind spot
  // that let Louis flag this defect class 5 times before this lint shipped.
  const caMatch = src.match(/export const \w+_CRITICAL_ACTIONS(?:\s*:\s*[^=]+?)?\s*=\s*\[([\s\S]*?)\];/);
  if (!caMatch) {
    // No CRITICAL_ACTIONS array — skip silently (not every tree has one)
    continue;
  }

  // Find the NODES array (also accept readonly DecisionNode[], etc.)
  const nodesMatch = src.match(/export const \w+_NODES(?:\s*:\s*[^=]+?)?\s*=\s*\[([\s\S]*)\];/);
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

  // Extract all node ids defined in NODES.
  //
  // MUST be line-anchored. The previous pattern was /\bid:\s*['"]...['"]/g,
  // which matched ANY `id:` anywhere inside the NODES array — including the
  // INLINE ones on non-node objects, e.g.
  //     calculatorLinks: [{ id: 'hfnc-settings', label: 'Initial Settings Guide' }]
  // That silently registered every calculator/link id as if it were a node id,
  // so a CRITICAL_ACTIONS nodeId pointing at a calculator id could never fail.
  // This gate is MANDATORY in deploy.md and it was returning a false PASS for
  // that entire class since it shipped.
  //
  // Found 2026-07-31 (Flow Rider): 9 dead critical actions across aacg /
  // eating-disorders / hfnc / hypothermia all sailed through `--strict`.
  // Verified: restoring the known-broken hfnc.ts still printed
  // "PASS — 351 trees checked".
  //
  // Real node ids sit on their own line (`    id: 'foo',`), so anchoring to
  // line start keeps them and drops the inline impostors.
  //
  // Scanned over the WHOLE FILE (comments stripped), not just the _NODES array
  // literal, because ~several trees use a "const-aggregator" pattern where each
  // node is a top-level const and _NODES is just a list of references:
  //     const SAH_CT: DecisionNode = { id: 'sah-ct', ... };
  //     export const SAH_NODES: DecisionNode[] = [ SAH_CT, ... ];
  // Under the old loose regex those files only passed because someone hand-
  // wrote a `// id: 'sah-ct', ...` comment manifest inside the array — the
  // regex was matching ids in COMMENTS. That manifest is unverified prose that
  // can silently drift from the real nodes, so comments are stripped here and
  // the actual definitions are matched instead.
  const codeOnly = src
    .split('\n')
    .filter(line => !line.trim().startsWith('//'))
    .join('\n');

  const defNodeIds = new Set();
  const defRegex = /^\s*id:\s*['"]([^'"]+)['"]/gm;
  while ((m = defRegex.exec(codeOnly)) !== null) {
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
