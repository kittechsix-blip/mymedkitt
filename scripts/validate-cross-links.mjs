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
//
// Exits 0 on clean, 1 on any broken reference.
// =====================================================================

import { existsSync, readFileSync } from 'fs';
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
    if (typeof m.getAllCalculators === 'function') {
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
      if (!ownTreeNodeIds.has(link.target)) {
        fail(treeId, nodeId, `Broken #/node/${link.target} — not a node in tree "${treeId}"`);
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
  const t = await loadTreeModule(treeId);
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
    // calculatorLinks array on nodes (button-style links)
    if (Array.isArray(node.calculatorLinks)) {
      for (const cl of node.calculatorLinks) {
        if (typeof cl?.id === 'string' && calcIds.size > 0 && !calcIds.has(cl.id)) {
          fail(treeId, node.id, `Broken calculatorLinks id "${cl.id}" — not in CALCULATORS`);
        }
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
    warn('-', null, 'TOOLBAR_CONFIGS not exported by docs/data/toolbar-configs.js — toolbar action targets unchecked');
    return;
  }
  for (const [treeId, items] of Object.entries(map)) {
    if (!Array.isArray(items)) continue;
    // Per-tree node id set for `jump` validation
    const t = await loadTreeModule(treeId).catch(() => null);
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
