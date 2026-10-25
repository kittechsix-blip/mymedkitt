#!/usr/bin/env node
/**
 * build-search-answer-index.mjs
 *
 * Companion to build-search-node-index.mjs. Bakes the parts of the app that
 * answer a bedside question but are not decision-tree nodes:
 *   - info-page sections (INFO_PAGES + STOP_PAGES), one doc per headed section plus one per page,
 *   - nodes of the few consults the regex node scrape cannot read
 * into docs/data/search-answer-index.json, which search-service.ts loads lazily.
 * Drugs are not baked: the app and the test read them from drug-store directly.
 *
 * Reads the COMPILED modules under docs/ (so it validates exactly what ships),
 * therefore it must run after `bunx tsc`. deploy-cache-sync.mjs runs it in step
 * 4.5, which is always after the compile step of the deploy playbook.
 * Every string is copied from the app's own content; nothing is generated.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const OUT = path.join(DOCS, 'data', 'search-answer-index.json');

const imp = (rel) => import(pathToFileURL(path.join(DOCS, rel)).href);

/** Same slug the info modal puts on a section element (info-page.ts trickAnchorId). */
function anchorId(heading) {
  return 'trick-' + heading
    .toLowerCase()
    .replace(/[‘’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function clean(text) {
  return String(text ?? '')
    .replace(/\[([^\]]+)\]\(#?[^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s*\[\d+(?:\s*[,–-]\s*\d+)*\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const TEXT_MAX = 700;

const { INFO_PAGES } = await imp('data/info-pages.js');
const { STOP_PAGES } = await imp('data/stop-pages.js');

const seen = new Set();
const info = [];
const pages = [];
for (const page of [...Object.values(INFO_PAGES), ...Object.values(STOP_PAGES)]) {
  if (!page || seen.has(page.id)) continue;
  seen.add(page.id);
  const first = (page.sections ?? []).find((x) => x.body);
  pages.push({ p: page.id, t: clean(page.title), s: clean(page.subtitle), x: clean(first?.body).slice(0, 300) });
  const anchors = new Set();
  for (const sec of page.sections ?? []) {
    if (!sec.heading) continue; // no heading = no anchor to land on
    const a = anchorId(sec.heading);
    if (anchors.has(a)) continue; // the modal's first element wins
    anchors.add(a);
    const t = clean(sec.body).slice(0, TEXT_MAX);
    info.push({ p: page.id, a, h: clean(sec.heading), pt: clean(page.title), t });
  }
}

// Trees whose NODES array is a const-aggregator ("SAH_START, SAH_OTTAWA, ...") defeat the regex scrape in
// build-search-node-index.mjs, so their nodes are missing from search-node-index.json. Read those few from
// the compiled module instead so every consult is searchable down to its nodes.
const nodeIdx = JSON.parse(fs.readFileSync(path.join(DOCS, 'data', 'search-node-index.json'), 'utf8'));
const haveTrees = new Set(nodeIdx.nodes.map((n) => n.treeId));
const extraNodes = [];
for (const f of fs.readdirSync(path.join(DOCS, 'data', 'trees'))) {
  if (!f.endsWith('.js') || f.startsWith('_') || f === 'index.js') continue;
  const treeId = f.slice(0, -3);
  if (haveTrees.has(treeId)) continue;
  const mod = await imp(`data/trees/${f}`);
  const key = Object.keys(mod).find((k) => /_NODES$/.test(k));
  if (!key) continue;
  for (const n of mod[key]) {
    extraNodes.push({
      id: n.id,
      treeId,
      title: clean(n.title),
      summary: clean(n.summary).slice(0, 240),
      body: clean(n.body).slice(0, 600),
      recommendation: clean(n.recommendation).slice(0, 240),
    });
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ count: { info: info.length, pages: pages.length, extraNodes: extraNodes.length }, info, pages, extraNodes }));
const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`✅ Wrote ${info.length} info sections + ${pages.length} pages + ${extraNodes.length} extra nodes → ${path.relative(ROOT, OUT)} (${kb} KB)`);
