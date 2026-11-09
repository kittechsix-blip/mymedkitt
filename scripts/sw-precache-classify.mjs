// Pure classification of docs/ files into the service worker's two precache tiers.
// Imported by scripts/deploy-cache-sync.mjs (generator) and scripts/sw-precache.test.mjs.
//
//   CORE  - precached at SW install; everything needed to open any consult, drug,
//           calculator or info page offline (html/css/js/json/fonts/small UI icons).
//   LAZY  - warmed in the background after the app is idle (see 'warm-cache' in docs/sw.js)
//           or cached on first open: infographics, procedure media, skill bundle, and any
//           non-JS/JSON asset over LAZY_SIZE_BYTES.
//   null  - never precached (images/, assets/icons/source, visual-review, sw.js, other types).

import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

export const LAZY_SIZE_BYTES = 300 * 1024;

const CACHEABLE = /\.(html|css|js|json|png|jpg|jpeg|webp|svg|woff2)$/i;
const CODE_OR_DATA = /\.(js|json|css|html)$/i;
const LAZY_DIRS = ['infographics/', 'procedures/', 'skill/'];
// Small-enough rule would push these to LAZY, but the splash screen and home header
// paint them on every cold start, so they must work offline from install.
const FORCE_CORE = new Set(['assets/mymedkitt-bag-transparent.png']);

/** True when the relative docs path must never be precached. */
export function isExcluded(rel) {
  const r = rel.replace(/\\/g, '/');
  if (r === 'sw.js') return true;
  if (r === 'images' || r.startsWith('images/')) return true;
  if (r === 'assets/icons/source' || r.startsWith('assets/icons/source/')) return true;
  if (r === 'visual-review' || r.startsWith('visual-review/')) return true;
  return false;
}

/** @returns {'core'|'lazy'|null} rel is relative to docs/, no leading './' */
export function classifyAsset(rel, size = 0) {
  const r = rel.replace(/\\/g, '/').replace(/^\.\//, '');
  if (isExcluded(r)) return null;
  const name = r.split('/').pop();
  if (name === '.DS_Store' || !CACHEABLE.test(name)) return null;
  if (LAZY_DIRS.some((d) => r.startsWith(d))) return 'lazy';
  if (FORCE_CORE.has(r)) return 'core';
  if (!CODE_OR_DATA.test(name) && size > LAZY_SIZE_BYTES) return 'lazy';
  return 'core';
}

/** Walk docs/ and return { core: [{path,size}], lazy: [{path,size}] }, sorted, paths as './rel'. */
export function collectAssets(docsDir) {
  const core = [];
  const lazy = [];
  (function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const rel = relative(docsDir, full).replace(/\\/g, '/');
      if (isExcluded(rel)) continue;
      const st = statSync(full);
      if (st.isDirectory()) { walk(full); continue; }
      const tier = classifyAsset(rel, st.size);
      if (tier === 'core') core.push({ path: './' + rel, size: st.size });
      else if (tier === 'lazy') lazy.push({ path: './' + rel, size: st.size });
    }
  })(docsDir);
  const byPath = (a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  return { core: core.sort(byPath), lazy: lazy.sort(byPath) };
}
