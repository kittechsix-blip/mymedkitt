#!/usr/bin/env node
/**
 * build-node-tree-map.mjs
 *
 * Emits docs/data/node-tree-map.json — a flat { nodeId: treeId } lookup covering
 * every decision node in the app (src/data/trees/*.ts plus src/data/consults/*.json).
 *
 * WHY THIS EXISTS
 * ---------------
 * Consult bodies and info pages contain thousands of in-body markdown links of the
 * form `[label](#/node/some-node-id)`. The router (src/services/router.ts) matches
 * on segment count + literal segments, and app.ts only ever registered
 * `/tree/:id/node/:nodeId` and `/consult/:id/node/:nodeId`. A bare `#/node/x` is a
 * 2-segment path whose first segment is `node`, which matches NO route — so every
 * one of those links fell through to the not-found handler and stranded the user
 * on a blank "Loading…" screen mid-consult. Verified live in production 2026-08-23.
 *
 * The fix is a `/node/:nodeId` route that resolves the owning tree and redirects to
 * the canonical `/tree/{treeId}/node/{nodeId}`. That needs a nodeId → treeId map,
 * and this script bakes it at deploy time (~300 KB raw, ~55 KB gzipped, fetched
 * lazily only when a bare node link is actually followed).
 *
 * Deliberately separate from build-search-node-index.mjs: that script stops at the
 * FIRST `*_NODES` array per file and drops nodes with no searchable text, which
 * would silently produce an incomplete routing table. Routing has to be exhaustive.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TREES_DIR = path.resolve(PROJECT_ROOT, 'src', 'data', 'trees');
const CONSULTS_DIR = path.resolve(PROJECT_ROOT, 'src', 'data', 'consults');
const OUTPUT_PATH = path.resolve(PROJECT_ROOT, 'docs', 'data', 'node-tree-map.json');

/**
 * Walk an array body and return each top-level `{...}` block, respecting strings,
 * template literals and comments. Same technique as build-search-node-index.mjs —
 * duplicated rather than shared because these two scripts must be able to diverge
 * (this one may never skip a node).
 */
function splitTopLevelObjects(arrayBody) {
  const blocks = [];
  let depth = 0;
  let start = -1;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < arrayBody.length; i++) {
    const ch = arrayBody[i];
    const next = arrayBody[i + 1];

    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (ch === '*' && next === '/') { inBlockComment = false; i++; }
      continue;
    }
    if (!inSingle && !inDouble && !inTemplate) {
      if (ch === '/' && next === '/') { inLineComment = true; i++; continue; }
      if (ch === '/' && next === '*') { inBlockComment = true; i++; continue; }
    }

    if (inSingle) {
      if (ch === '\\') { i++; continue; }
      if (ch === "'") inSingle = false;
      continue;
    }
    if (inDouble) {
      if (ch === '\\') { i++; continue; }
      if (ch === '"') inDouble = false;
      continue;
    }
    if (inTemplate) {
      if (ch === '\\') { i++; continue; }
      if (ch === '`') inTemplate = false;
      continue;
    }
    if (ch === "'") { inSingle = true; continue; }
    if (ch === '"') { inDouble = true; continue; }
    if (ch === '`') { inTemplate = true; continue; }

    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        blocks.push(arrayBody.slice(start, i + 1));
        start = -1;
      }
    }
  }
  return blocks;
}

/** Capture `id: '...'` / `id: "..."` from the head of a node block. */
function captureId(block) {
  const m = block.match(/(?:^|[{,\s])id\s*:\s*'((?:\\.|[^'\\])*)'/)
    || block.match(/(?:^|[{,\s])id\s*:\s*"((?:\\.|[^"\\])*)"/);
  return m ? m[1] : null;
}

/**
 * Find every `export const *_NODES = [ ... ];` array in a source file and return
 * the ids of its top-level node objects. Unlike the search indexer this walks ALL
 * such arrays, because a few trees split their nodes across multiple exports.
 */
function extractNodeIds(src) {
  const ids = [];
  const header = /export const \w*NODES\w*(?:\s*:\s*[^=]+?)?\s*=\s*\[/g;
  let m;
  while ((m = header.exec(src)) !== null) {
    // Walk from the opening bracket to its match, then split into node objects.
    const bracketStart = m.index + m[0].length - 1;
    let depth = 0, end = -1, inS = false, inD = false, inT = false;
    for (let i = bracketStart; i < src.length; i++) {
      const ch = src[i];
      if (inS) { if (ch === '\\') { i++; continue; } if (ch === "'") inS = false; continue; }
      if (inD) { if (ch === '\\') { i++; continue; } if (ch === '"') inD = false; continue; }
      if (inT) { if (ch === '\\') { i++; continue; } if (ch === '`') inT = false; continue; }
      if (ch === "'") { inS = true; continue; }
      if (ch === '"') { inD = true; continue; }
      if (ch === '`') { inT = true; continue; }
      if (ch === '[') depth++;
      else if (ch === ']') { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end === -1) continue;
    for (const block of splitTopLevelObjects(src.slice(bracketStart + 1, end))) {
      const id = captureId(block);
      if (id) ids.push(id);
    }
    header.lastIndex = end;
  }
  return ids;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
/** nodeId -> treeId (first writer wins) */
const map = {};
/** nodeId -> [treeId, ...] for ids that live in more than one consult */
const collisions = {};
let treesScanned = 0;

function record(nodeId, treeId) {
  if (map[nodeId] === undefined) {
    map[nodeId] = treeId;
    return;
  }
  if (map[nodeId] === treeId) return;
  (collisions[nodeId] ||= [map[nodeId]]).push(treeId);
}

for (const file of fs.readdirSync(TREES_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_') && f !== 'index.ts')) {
  const treeId = file.replace(/\.ts$/, '');
  const ids = extractNodeIds(fs.readFileSync(path.join(TREES_DIR, file), 'utf8'));
  if (ids.length === 0) continue;
  treesScanned++;
  for (const id of ids) record(id, treeId);
}

// JSON consults (src/data/consults/*.json) are a second authoring format — easy to
// miss, and their nodes are linked from the same in-body markdown.
if (fs.existsSync(CONSULTS_DIR)) {
  for (const file of fs.readdirSync(CONSULTS_DIR).filter(f => f.endsWith('.json'))) {
    const treeId = file.replace(/\.json$/, '');
    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(path.join(CONSULTS_DIR, file), 'utf8'));
    } catch (e) {
      console.error(`SKIP ${file}: ${e.message}`);
      continue;
    }
    const nodes = Array.isArray(parsed) ? parsed : (parsed.nodes ?? []);
    if (!Array.isArray(nodes) || nodes.length === 0) continue;
    treesScanned++;
    for (const n of nodes) if (n && typeof n.id === 'string') record(n.id, treeId);
  }
}

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify({
  generated: new Date().toISOString(),
  count: Object.keys(map).length,
  // Ambiguous ids are reported so a future authoring pass can rename them; the
  // runtime resolver prefers the consult the user is already in before falling
  // back to this map, so a collision only matters for cold deep-links.
  collisions,
  map,
}));

const sizeKB = (fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1);
const collisionCount = Object.keys(collisions).length;
console.log(`✅ Wrote ${Object.keys(map).length} node→tree entries across ${treesScanned} consults → ${path.relative(PROJECT_ROOT, OUTPUT_PATH)} (${sizeKB} KB)`);
if (collisionCount > 0) console.log(`   ${collisionCount} node ids appear in more than one consult (first-wins on cold deep-link)`);
