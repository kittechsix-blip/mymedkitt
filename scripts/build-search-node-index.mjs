#!/usr/bin/env node
/**
 * build-search-node-index.mjs
 *
 * Scrapes every src/data/trees/*.ts file and extracts node {id, title, body,
 * summary, recommendation} into a flat JSON index used by the in-app search
 * bar to surface content *inside* consults (not just consult titles).
 *
 * Output: docs/data/search-node-index.json (committed; loaded lazily at runtime
 * by search-service.ts via fetch()).
 *
 * The scrape is text-level (regex) for the same reason as lint-critical-actions.mjs:
 * it lets us run pre-compile without booting esbuild/tsc, and matches the same
 * authoring pattern (`*_NODES: DecisionNode[] = [ ... { id: 'foo', title: '...', ...`).
 *
 * Why a static JSON instead of dynamic imports at runtime: 300+ trees × dynamic
 * import = significant first-paint cost and Fuse rebuild churn. Pre-baking the
 * index at deploy time is cheaper and lets the worker cache it via SW.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TREES_DIR = path.resolve(PROJECT_ROOT, 'src', 'data', 'trees');
const OUTPUT_PATH = path.resolve(PROJECT_ROOT, 'docs', 'data', 'search-node-index.json');

// Strip markdown link syntax, code fences, etc. for cleaner search tokens.
function cleanForSearch(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\\n/g, ' ')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\[([^\]]+)\]\(#?[^)]+\)/g, '$1') // [label](url) -> label
    .replace(/\*\*([^*]+)\*\*/g, '$1') // **bold** -> bold
    .replace(/__([^_]+)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tolerant value capture for a single quoted string field on a node object.
 * Handles `title: 'foo'`, `title: "foo"`, and template literals on one line.
 * Multi-line template literals fall through; for our search needs that's fine
 * — we'd rather skip the rare 200-line body than crash the build.
 */
function captureField(block, field) {
  // Single quote: title: 'value with \' escapes'
  const sq = new RegExp(`${field}\\s*:\\s*'((?:\\\\.|[^'\\\\])*)'`);
  const m1 = block.match(sq);
  if (m1) return m1[1];
  // Double quote
  const dq = new RegExp(`${field}\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`);
  const m2 = block.match(dq);
  if (m2) return m2[1];
  // Single-line template literal (no interpolation safe-path)
  const tl = new RegExp(`${field}\\s*:\\s*\`([^\`]*)\``);
  const m3 = block.match(tl);
  if (m3) return m3[1];
  return null;
}

/**
 * Split a *_NODES array block into individual node object blocks by tracking
 * brace depth. The naive `.split('},')` approach breaks on nested objects
 * (treatment: {...}, options: [{...}]). Brace-depth tracking gets all top-level
 * sibling objects without needing a full TS parser.
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
    const prev = arrayBody[i - 1];

    // Comment handling
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

    // String handling — track escapes
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

    // Brace depth
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

function extractNodesFromTree(src, treeId) {
  // Match: export const FOO_NODES[: DecisionNode[]]? = [ ... ];
  const arrayMatch = src.match(/export const \w+_NODES(?:\s*:\s*[^=]+?)?\s*=\s*\[([\s\S]*?)\n\];/);
  if (!arrayMatch) return [];
  const arrayBody = arrayMatch[1];
  const objectBlocks = splitTopLevelObjects(arrayBody);

  const docs = [];
  for (const block of objectBlocks) {
    const id = captureField(block, 'id');
    if (!id) continue;
    const title = captureField(block, 'title') || '';
    const summary = captureField(block, 'summary') || '';
    const recommendation = captureField(block, 'recommendation') || '';
    const body = captureField(block, 'body') || '';

    // Body and recommendation can be very long. Pull only first ~400 chars
    // after cleaning — enough for keyword hits without blowing index size.
    const cleanBody = cleanForSearch(body).slice(0, 400);
    const cleanRecommendation = cleanForSearch(recommendation).slice(0, 240);
    const cleanSummary = cleanForSearch(summary).slice(0, 240);
    const cleanTitle = cleanForSearch(title);

    // Skip noise nodes with no searchable content
    if (!cleanTitle && !cleanBody && !cleanSummary && !cleanRecommendation) continue;

    docs.push({
      id,
      treeId,
      title: cleanTitle,
      summary: cleanSummary,
      body: cleanBody,
      recommendation: cleanRecommendation,
    });
  }
  return docs;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const treeFiles = fs
  .readdirSync(TREES_DIR)
  .filter(f => f.endsWith('.ts') && !f.startsWith('_') && f !== 'index.ts');

const allDocs = [];
let treesScanned = 0;
let treesSkipped = 0;
for (const file of treeFiles) {
  const treeId = file.replace(/\.ts$/, '');
  const fp = path.join(TREES_DIR, file);
  let src;
  try {
    src = fs.readFileSync(fp, 'utf8');
  } catch (e) {
    console.error(`SKIP ${file}: ${e.code}`);
    treesSkipped++;
    continue;
  }
  const docs = extractNodesFromTree(src, treeId);
  if (docs.length === 0) {
    treesSkipped++;
    continue;
  }
  allDocs.push(...docs);
  treesScanned++;
}

// Ensure docs/data directory exists
fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ generated: new Date().toISOString(), count: allDocs.length, nodes: allDocs }));

const sizeKB = (fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1);
console.log(`✅ Wrote ${allDocs.length} node docs across ${treesScanned} trees → ${path.relative(PROJECT_ROOT, OUTPUT_PATH)} (${sizeKB} KB)`);
if (treesSkipped > 0) console.log(`   Skipped ${treesSkipped} trees (no extractable nodes)`);
