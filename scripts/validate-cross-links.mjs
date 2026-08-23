#!/usr/bin/env node
// =====================================================================
// MedKitt — Cross-Link Validator (structured, registry-aware)
//
// Walks the compiled docs/ output (NOT raw src/, so we validate exactly what
// ships) and verifies every cross-tree / info / node / drug / image / calculator
// reference resolves to a real target.
//
// Validates BY ACTION TYPE per Round 2 M1 / Round 4 R25:
//   action: 'route'      → target ∈ TREE_REGISTRY (tree-registry.mjs keys)
//   action: 'jump'       → target is a node ID inside the owning tree
//   action: 'overlay'    → target ∈ INFO_PAGES ∪ STOP_PAGES (id-key)
//   action: 'calculator' → target ∈ CALCULATORS via getAllCalculators()
//
// Free-text body link refs validated by prefix:
//   #/tree/<id>          → TREE_REGISTRY
//   #/info/<id>          → INFO_PAGES ∪ STOP_PAGES
//   #/drug/<id>[/<hint>] → ALL_DRUGS (by id)
//   #/node/<id>          → the owning tree's node ids (intra-tree only)
//   images/<path>        → file exists on disk under docs/
//
// Usage:
//   node scripts/validate-cross-links.mjs                  # all consults
//   node scripts/validate-cross-links.mjs <tree-id>        # one consult
//   node scripts/validate-cross-links.mjs --against-docs <tree-id>   # alias
//   node scripts/validate-cross-links.mjs --gate           # RATCHET (deploy gate)
//   node scripts/validate-cross-links.mjs --update-baseline
//
// Exits 0 on clean, 1 on any broken reference.
//
// RATCHET modes (mirrors lint-calculator-refs.mjs / lint-image-refs.mjs):
//   --gate             fail ONLY on errors NOT in the baseline. Known debt
//                      prints as a warning but does not block the deploy.
//   --update-baseline  freeze the CURRENT error set as accepted debt.
//
// Why the ratchet exists: this validator was written 2026-05-22 and PLAN.md
// claimed it ran as a deploy gate, but it was never actually wired in. It sat
// dark for ~2 months while accumulating 194 real broken references. Turning it
// on hard would block every deploy, so it lands as a ratchet instead: the
// backlog is baselined, and NEW breakage is blocked from day one.
// =====================================================================

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { TREE_REGISTRY } from './tree-registry.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const docsDir = resolve(projectRoot, 'docs');

const args = process.argv.slice(2);
const argIdx = args.findIndex(a => a === '--against-docs');
const filterIds = args
  .filter((a, i) => !a.startsWith('--') && i !== argIdx + 1 ? true : (i === argIdx + 1 ? true : !a.startsWith('--')))
  .filter(a => !a.startsWith('--'));
// Simpler arg parsing: any non-flag arg is a tree-id filter
const targetIds = args.filter(a => !a.startsWith('--'));

const gate = args.includes('--gate');
const updateBaseline = args.includes('--update-baseline');
const BASELINE_FILE = resolve(projectRoot, 'scripts/validate-cross-links.baseline.json');

// Stable signature for an error, used as the baseline key. Deliberately
// includes tree + node + message so that moving a broken ref to a new node
// counts as NEW breakage rather than silently inheriting baseline amnesty.
function sig(f) {
  return `${f.tree}|${f.node ?? ''}|${f.message}`;
}

function loadBaseline() {
  if (!existsSync(BASELINE_FILE)) return null;
  try {
    const j = JSON.parse(readFileSync(BASELINE_FILE, 'utf8'));
    return new Set(j.accepted ?? []);
  } catch (err) {
    console.error(`Could not parse ${BASELINE_FILE}: ${err.message}`);
    return null;
  }
}

const findings = []; // { severity, tree, node?, message }

function fail(tree, node, message) {
  findings.push({ severity: 'error', tree, node, message });
}
function warn(tree, node, message) {
  findings.push({ severity: 'warn', tree, node, message });
}

// ---------------------------------------------------------------------
// Load registries from compiled docs/
// ---------------------------------------------------------------------

let infoIds, stopIds, drugIds, calcIds, allTreeIds;

async function loadRegistries() {
  // Info pages
  try {
    const m = await import(pathToFileURL(resolve(docsDir, 'data', 'info-pages.js')).href);
    const obj = m.INFO_PAGES || m.default?.INFO_PAGES || {};
    infoIds = new Set(Object.keys(obj));
  } catch (err) {
    fail('-', null, `Could not load INFO_PAGES: ${err.message}`);
    infoIds = new Set();
  }

  // Stop pages
  try {
    const m = await import(pathToFileURL(resolve(docsDir, 'data', 'stop-pages.js')).href);
    const obj = m.STOP_PAGES || m.default?.STOP_PAGES || {};
    stopIds = new Set(Object.keys(obj));
  } catch (err) {
    fail('-', null, `Could not load STOP_PAGES: ${err.message}`);
    stopIds = new Set();
  }

  // Drug store
  try {
    const m = await import(pathToFileURL(resolve(docsDir, 'data', 'drug-store.js')).href);
    const arr = m.ALL_DRUGS || m.default?.ALL_DRUGS || [];
    drugIds = new Set(arr.map(d => d.id));
  } catch (err) {
    fail('-', null, `Could not load ALL_DRUGS: ${err.message}`);
    drugIds = new Set();
  }

  // Calculator IDs (via getAllCalculators)
  try {
    const m = await import(pathToFileURL(resolve(docsDir, 'components', 'calculator.js')).href);
    // Prefer getCalculatorIds() — the REGISTRY KEYS, which is what the router
    // actually resolves (CALCULATORS[id]). getAllCalculators() maps over VALUES
    // and therefore drops alias keys (e.g. 'ecpr-criteria' → shared object whose
    // .id is 'ecmo-ecpr-criteria'), producing false "broken link" reports for
    // buttons that work fine in production. Verified live 2026-07-30.
    if (typeof m.getCalculatorIds === 'function') {
      calcIds = new Set(m.getCalculatorIds());
    } else if (typeof m.getAllCalculators === 'function') {
      warn('-', null, 'getCalculatorIds() not exported — falling back to getAllCalculators(), which under-reports alias keys and may produce false positives');
      const list = m.getAllCalculators();
      calcIds = new Set(list.map(c => c.id ?? c.calcId ?? c.calculatorId).filter(Boolean));
    } else {
      calcIds = new Set();
      warn('-', null, 'getAllCalculators() not exported by calculator.js — calculator targets cannot be validated');
    }
  } catch (err) {
    fail('-', null, `Could not load CALCULATORS: ${err.message}`);
    calcIds = new Set();
  }

  // All tree IDs come from the registry (script-side, source-of-truth)
  allTreeIds = new Set(Object.keys(TREE_REGISTRY));
}

// ---------------------------------------------------------------------
// Per-tree validation
// ---------------------------------------------------------------------

async function loadTreeModule(treeId) {
  const path = resolve(docsDir, 'data', 'trees', `${treeId}.js`);
  if (!existsSync(path)) {
    fail(treeId, null, `Compiled tree file missing: docs/data/trees/${treeId}.js`);
    return null;
  }
  const m = await import(pathToFileURL(path).href);
  const reg = TREE_REGISTRY[treeId];
  if (!reg) {
    fail(treeId, null, `Tree id "${treeId}" not in scripts/tree-registry.mjs`);
    return null;
  }
  return {
    nodes: m[`${reg.prefix}_NODES`] || [],
    citations: m[`${reg.prefix}_CITATIONS`] || [],
    moduleLabels: m[`${reg.prefix}_MODULE_LABELS`] || [],
  };
}

// ---------------------------------------------------------------------
// Cross-tree node index
//
// Needed because two reference channels are no longer confined to one consult:
//   • `calculatorLinks` entries with `kind:'tree'` + `node:` deep-link into a
//     DIFFERENT consult's node, so the target must be checked against that
//     consult's nodes, not the linking one's.
//   • bare `#/node/<id>` body links now resolve globally at runtime via the
//     `/node/:nodeId` route (src/services/node-resolver.ts), so a link into a
//     sibling consult is valid, not broken.
// Built by loading every registered tree once and caching the result — the
// per-tree pass reuses the same cache, so this costs one extra sweep at most.
// ---------------------------------------------------------------------
const treeModuleCache = new Map();
async function getTreeModule(treeId) {
  if (!treeModuleCache.has(treeId)) {
    treeModuleCache.set(treeId, await loadTreeModule(treeId).catch(() => null));
  }
  return treeModuleCache.get(treeId);
}

/** nodeId -> owning treeId, first writer wins (mirrors the runtime map). */
let globalNodeOwner = null;
async function getGlobalNodeOwner() {
  if (globalNodeOwner) return globalNodeOwner;
  globalNodeOwner = new Map();
  for (const treeId of Object.keys(TREE_REGISTRY)) {
    const t = await getTreeModule(treeId);
    for (const n of t?.nodes ?? []) {
      if (typeof n?.id === 'string' && !globalNodeOwner.has(n.id)) {
        globalNodeOwner.set(n.id, treeId);
      }
    }
  }
  return globalNodeOwner;
}

function extractLinks(text) {
  if (typeof text !== 'string') return [];
  // Match #/tree/<id>, #/info/<id>, #/node/<id>, #/drug/<id>[/<hint>], #/calculator/<id>
  const out = [];
  const re = /#\/(tree|info|node|drug|calculator)\/([a-z0-9-]+)(?:\/[^)\s"`']*)?/gi;
  let match;
  while ((match = re.exec(text)) !== null) {
    out.push({ kind: match[1].toLowerCase(), target: match[2] });
  }
  // Image references: images/<tree-id>/<filename>
  const imgRe = /\bimages\/([a-z0-9-]+\/[A-Za-z0-9._-]+\.(?:png|jpg|jpeg|svg|webp))/g;
  while ((match = imgRe.exec(text)) !== null) {
    out.push({ kind: 'image', target: match[1] });
  }
  return out;
}

function validateLink(treeId, nodeId, ownTreeNodeIds, link) {
  switch (link.kind) {
    case 'tree':
      if (!allTreeIds.has(link.target)) {
        fail(treeId, nodeId, `Broken #/tree/${link.target} — not in TREE_REGISTRY`);
      }
      break;
    case 'info':
      if (!infoIds.has(link.target) && !stopIds.has(link.target)) {
        fail(treeId, nodeId, `Broken #/info/${link.target} — not in INFO_PAGES or STOP_PAGES`);
      }
      break;
    case 'node':
      // Own consult first (the authoring norm), then any consult — the runtime
      // `/node/:nodeId` route resolves globally, so a sibling-consult target is a
      // working link, not a break. Only an id that exists NOWHERE is a dead end.
      if (!ownTreeNodeIds.has(link.target) && !globalNodeOwner?.has(link.target)) {
        fail(treeId, nodeId, `Broken #/node/${link.target} — not a node in any consult`);
      }
      break;
    case 'drug':
      if (!drugIds.has(link.target)) {
        fail(treeId, nodeId, `Broken #/drug/${link.target} — not in ALL_DRUGS`);
      }
      break;
    case 'calculator':
      if (calcIds.size > 0 && !calcIds.has(link.target)) {
        fail(treeId, nodeId, `Broken #/calculator/${link.target} — not in CALCULATORS`);
      }
      break;
    case 'image': {
      const imgPath = resolve(docsDir, 'images', link.target);
      if (!existsSync(imgPath)) {
        fail(treeId, nodeId, `Missing image: docs/images/${link.target}`);
      }
      break;
    }
  }
}

async function validateTree(treeId) {
  // getTreeModule (not loadTreeModule) so a tree loaded while building the
  // cross-consult index isn't re-imported — and a missing file isn't reported twice.
  const t = await getTreeModule(treeId);
  if (!t) return;
  const nodeIds = new Set(t.nodes.map(n => n.id));

  // Validate every node body + recommendation + treatment notes + image src
  for (const node of t.nodes) {
    const texts = [node.body, node.recommendation, node.title]
      .filter(s => typeof s === 'string');
    for (const text of texts) {
      for (const link of extractLinks(text)) {
        validateLink(treeId, node.id, nodeIds, link);
      }
    }
    // Image arrays on nodes
    if (Array.isArray(node.images)) {
      for (const img of node.images) {
        if (typeof img?.src === 'string') {
          for (const link of extractLinks(img.src)) {
            validateLink(treeId, node.id, nodeIds, link);
          }
        }
      }
    }
    // calculatorLinks array on nodes (button-style links).
    //
    // `kind` selects which registry the id must live in — see the doc comment on
    // DecisionNode.calculatorLinks in src/models/types.ts. Before that field
    // existed every entry was assumed to be a calculator and the renderer
    // hardcoded the /calculator/ route, so buttons pointing at reference content
    // that lives as a TREE or INFO page dead-ended on "Calculator Not Found".
    // Validating against the wrong registry here would re-introduce that bug from
    // the other direction: correctly-wired tree/info buttons flagged as broken.
    if (Array.isArray(node.calculatorLinks)) {
      for (const cl of node.calculatorLinks) {
        if (typeof cl?.id !== 'string') continue;
        const kind = cl.kind ?? 'calculator';
        if (kind === 'tree') {
          if (!allTreeIds.has(cl.id)) {
            fail(treeId, node.id, `Broken calculatorLinks kind:'tree' id "${cl.id}" — not in TREE_REGISTRY`);
          } else if (typeof cl.node === 'string') {
            const target = await getTreeModule(cl.id);
            const targetNodeIds = new Set((target?.nodes ?? []).map(n => n.id));
            if (targetNodeIds.size > 0 && !targetNodeIds.has(cl.node)) {
              fail(treeId, node.id, `Broken calculatorLinks deep-link "${cl.id}" → node "${cl.node}" — not a node in that consult`);
            }
          }
        } else if (kind === 'info') {
          if (!infoIds.has(cl.id) && !stopIds.has(cl.id)) {
            fail(treeId, node.id, `Broken calculatorLinks kind:'info' id "${cl.id}" — not in INFO_PAGES or STOP_PAGES`);
          }
        } else if (calcIds.size > 0 && !calcIds.has(cl.id)) {
          fail(treeId, node.id, `Broken calculatorLinks id "${cl.id}" — not in CALCULATORS`);
        }
      }
    }

    // -----------------------------------------------------------------
    // NAVIGATION SPINE (added 2026-07-31, Flow Rider)
    //
    // Everything above validates *links* (buttons, body refs, images). None
    // of it validated the tree's own forward navigation — `next` and
    // `options[].next` — which is how users actually move through a consult.
    // A dangling `next` renders a DEAD END: the breadcrumb appends but no
    // node body draws. Silent, and invisible unless you click that exact
    // option.
    //
    // Caught 2026-07-31: wrist-injuries.ts had 4 options whose `next` had the
    // target node's question prompt concatenated onto the id, e.g.
    //   next: 'wrist-imaging\n\n**What type of wrist injury?**'
    // a generation artifact. All 4 paths dead-ended in production.
    // -----------------------------------------------------------------
    if (typeof node.next === 'string' && !nodeIds.has(node.next)) {
      fail(treeId, node.id, `Dead-end next: "${node.next}" — not a node in tree "${treeId}"`);
    }
    if (Array.isArray(node.options)) {
      for (const opt of node.options) {
        if (typeof opt?.next === 'string' && !nodeIds.has(opt.next)) {
          fail(treeId, node.id, `Dead-end option "${opt.label ?? '?'}" → next: "${opt.next}" — not a node in tree "${treeId}"`);
        }
      }
    }
  }

  // ---------------------------------------------------------------------
  // CRITICAL ACTIONS (added 2026-07-31, Flow Rider)
  // Each entry in the ⚠ Critical panel jumps to a nodeId. 9 of these pointed
  // at nonexistent nodes across aacg / eating-disorders / hfnc / hypothermia,
  // so tapping those critical actions did nothing at all.
  // ---------------------------------------------------------------------
  const criticalActions = t.criticalActions
    ?? Object.entries(t).find(([k]) => /CRITICAL_ACTIONS$/.test(k))?.[1];
  if (Array.isArray(criticalActions)) {
    for (const ca of criticalActions) {
      if (typeof ca?.nodeId === 'string' && !nodeIds.has(ca.nodeId)) {
        fail(treeId, ca.nodeId, `Dead critical action "${String(ca.text ?? '').slice(0, 60)}" → nodeId "${ca.nodeId}" — not a node in tree "${treeId}"`);
      }
    }
  }
}

// Toolbar validation
async function validateToolbars() {
  let toolbarMod;
  try {
    toolbarMod = await import(pathToFileURL(resolve(docsDir, 'data', 'toolbar-configs.js')).href);
  } catch (err) {
    fail('-', null, `Could not load toolbar-configs.js: ${err.message}`);
    return;
  }
  // The compiled file exports `getToolbarConfig` not the raw map. Read source
  // instead — we already have it locally.
  const src = readFileSync(resolve(projectRoot, 'src', 'data', 'toolbar-configs.ts'), 'utf8');
  // crude but sufficient: enumerate `id: '...'` … `action: '<kind>'` … `target: '<...>'` triples
  // Better: dynamic-import the compiled .js and pull TOOLBAR_CONFIGS — let's try that.
  const map = toolbarMod.TOOLBAR_CONFIGS || toolbarMod.default?.TOOLBAR_CONFIGS;
  if (!map) {
    // HARD FAIL, not a warning. This used to be a warn() and it silently
    // disabled all toolbar validation for ~2 months (TOOLBAR_CONFIGS was
    // module-private), which let the 2026-07-27 dead-toolbar-button CRITICAL
    // ship. A blind spot must never be quieter than a bug.
    fail('-', null, 'TOOLBAR_CONFIGS not exported by docs/data/toolbar-configs.js — ~1,264 toolbar action targets are UNVALIDATED. Add `export` to the const in src/data/toolbar-configs.ts.');
    return;
  }
  for (const [treeId, items] of Object.entries(map)) {
    if (!Array.isArray(items)) continue;
    // Per-tree node id set for `jump` validation
    const t = await getTreeModule(treeId);
    const nodeIds = new Set(t?.nodes?.map(n => n.id) ?? []);
    for (const item of items) {
      if (!item?.target) continue;
      switch (item.action) {
        case 'route':
          if (!allTreeIds.has(item.target)) {
            fail(treeId, null, `Toolbar action:'route' → target "${item.target}" not in TREE_REGISTRY`);
          }
          break;
        case 'jump':
          if (nodeIds.size > 0 && !nodeIds.has(item.target)) {
            fail(treeId, null, `Toolbar action:'jump' → target "${item.target}" not a node id in "${treeId}"`);
          }
          break;
        case 'overlay':
          if (!infoIds.has(item.target) && !stopIds.has(item.target)) {
            fail(treeId, null, `Toolbar action:'overlay' → target "${item.target}" not in INFO_PAGES/STOP_PAGES`);
          }
          break;
        case 'calculator':
          if (calcIds.size > 0 && !calcIds.has(item.target)) {
            fail(treeId, null, `Toolbar action:'calculator' → target "${item.target}" not in CALCULATORS`);
          }
          break;
      }
    }
  }
  // Don't need toolbarMod.src after this — release reference
  void src;
}

// ---------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------

await loadRegistries();

// Build the cross-consult node index BEFORE any tree is validated. It is always
// built over the full registry, even when --tree narrows the run, because a
// single consult's links can legitimately point into any other consult.
await getGlobalNodeOwner();

const treesToCheck = targetIds.length > 0 ? targetIds : Object.keys(TREE_REGISTRY);
console.log(`\n🔍 Validating cross-links across ${treesToCheck.length} tree(s)...\n`);

for (const treeId of treesToCheck) {
  await validateTree(treeId);
}

// Toolbars are always cross-cutting; validate full map when no filter is set,
// otherwise skip (toolbar targets in other trees aren't this consult's concern).
if (targetIds.length === 0) {
  await validateToolbars();
}

const errors = findings.filter(f => f.severity === 'error');
const warns = findings.filter(f => f.severity === 'warn');

for (const f of warns) {
  console.warn(`  ⚠️  [${f.tree}${f.node ? `:${f.node}` : ''}] ${f.message}`);
}

// -------------------------------------------------------------------------
// --update-baseline: freeze the current error set as accepted debt.
// -------------------------------------------------------------------------
if (updateBaseline) {
  const accepted = errors.map(sig).sort();
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify(
      {
        _comment:
          'Accepted pre-existing broken cross-references. --gate blocks only NEW entries. ' +
          'Work this list DOWN and re-run --update-baseline; the ratchet only turns one way.',
        generated: new Date().toISOString().slice(0, 10),
        count: accepted.length,
        accepted,
      },
      null,
      2,
    ) + '\n',
  );
  console.log(`\n📌 Baseline written: ${accepted.length} accepted error(s) → ${BASELINE_FILE}\n`);
  process.exit(0);
}

// -------------------------------------------------------------------------
// --gate: RATCHET. Only NEW errors (not in baseline) block.
// -------------------------------------------------------------------------
if (gate) {
  const baseline = loadBaseline();
  if (!baseline) {
    console.error(
      `\n💥 --gate requires a baseline. Run:\n   node scripts/validate-cross-links.mjs --update-baseline\n`,
    );
    process.exit(1);
  }
  const fresh = errors.filter(f => !baseline.has(sig(f)));
  const known = errors.length - fresh.length;

  if (known > 0) {
    console.warn(`\n⚠  ${known} KNOWN broken reference(s) (in baseline — not blocking).`);
  }
  if (fresh.length === 0) {
    console.log(`\n✅ No NEW broken cross-references. Deploy gate passes.\n`);
    process.exit(0);
  }
  console.error(`\n❌ ${fresh.length} NEW broken reference(s) — these did not exist at baseline:\n`);
  for (const f of fresh) {
    console.error(`  ❌ [${f.tree}${f.node ? `:${f.node}` : ''}] ${f.message}`);
  }
  console.error(
    `\n💥 Deploy gate FAILED. Fix the above, or if this is intentional accepted debt run:\n` +
      `   node scripts/validate-cross-links.mjs --update-baseline\n`,
  );
  process.exit(1);
}

// -------------------------------------------------------------------------
// Default (non-gate) mode: report everything.
// -------------------------------------------------------------------------
for (const f of errors) {
  console.error(`  ❌ [${f.tree}${f.node ? `:${f.node}` : ''}] ${f.message}`);
}

if (errors.length === 0) {
  console.log(`\n✅ Clean. ${treesToCheck.length} tree(s) checked, 0 errors${warns.length ? `, ${warns.length} warnings` : ''}.\n`);
  process.exit(0);
} else {
  console.error(`\n💥 ${errors.length} broken reference(s) across ${treesToCheck.length} tree(s)${warns.length ? ` (+${warns.length} warnings)` : ''}.\n`);
  process.exit(1);
}
