// Capture the RENDERED <main> HTML of every oncology consult route.
// usage: node .transplant-baseline/capture-html.mjs <outDir> [--port N] [--limit N]
// Serves docs/ with scripts/rapid-serve.ts (same mechanism as the repo's local server) on a free port,
// drives it with the repo's Playwright (chromium, service workers blocked, fresh context per route).
// Output: <outDir>/<slug>.html per route, manifest.json (route -> sha256), meta.json (kind, notFound, consoleErrors).
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createServer } from 'node:net';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const outDir = path.resolve(process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : path.join(HERE, 'html'));
const limit = Number(arg('--limit', 0));

const od = await import(pathToFileURL(path.join(ROOT, 'docs/data/onc-drugs/index.js')).href);
const { ONC_DATA, ONC_TREE_ID, virtualNodeId } = od;
const { ONC_CANCER_TYPES, OTHER_CANCER_TYPE } = await import(pathToFileURL(path.join(ROOT, 'docs/data/onc-drugs/cancer-types.js')).href);

// ---- route list (deterministic order) ----
const routes = []; // { route, kind, tab? }
const home = `/tree/${ONC_TREE_ID}`;
for (const tab of ['complaint', 'class', 'cancer', 'regimen']) routes.push({ route: home, kind: 'home', tab });
const v = (kind, ids) => { for (const id of ids) routes.push({ route: `${home}/node/${virtualNodeId(kind, id)}`, kind }); };
v('drug', ONC_DATA.drugs.map((d) => d.id));
v('reg', ONC_DATA.regimens.map((r) => r.id));
v('class', ONC_DATA.classes.map((c) => c.id));
v('cancer', ONC_DATA.cancers.map((c) => c.id));
v('ctype', [...ONC_CANCER_TYPES.map((t) => t.id), OTHER_CANCER_TYPE.id]);
v('cx', ONC_DATA.complaints.map((c) => c.id));
routes.push({ route: `${home}/node/${virtualNodeId('drug', 'zz-not-a-real-drug')}`, kind: 'invalid' });
const ONLY=['cosibelimab','fluorouracil','glofitamab-gxbm']; for (let i=routes.length-1;i>=0;i--) if(!ONLY.some(o=>routes[i].route.endsWith('/odse-drug-'+o))) routes.splice(i,1);
const slugOf = (r) => (r.tab ? `home--${r.tab}` : r.route.replace(/^\/tree\/onc-drug-side-effects\/?(node\/)?/, '') || 'home').replace(/[^A-Za-z0-9._-]/g, '_');

// ---- server ----
const freePort = () => new Promise((res) => { const s = createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); }); });
const port = Number(arg('--port', 0)) || await freePort();
const server = spawn(process.execPath, [path.join(ROOT, 'scripts/rapid-serve.ts')], { env: { ...process.env, RAPID_PORT: String(port) }, stdio: 'ignore' });
const base = `http://127.0.0.1:${port}/app.html`;
for (let i = 0; i < 50; i++) { try { if ((await fetch(base)).ok) break; } catch { /* not up yet */ } await new Promise((r) => setTimeout(r, 100)); }

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
const t0 = Date.now();
// The repo's playwright (1.58.2) wants chromium_headless_shell-1208, which is not in the cache; use the newest cached
// headless shell instead (nothing installed). Override with PW_CHROMIUM=/path/to/chrome-headless-shell.
const cacheDir = path.join(process.env.HOME, 'Library/Caches/ms-playwright');
const cached = fs.existsSync(cacheDir) ? fs.readdirSync(cacheDir).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse() : [];
let exe = process.env.PW_CHROMIUM || (fs.existsSync(chromium.executablePath()) ? undefined : path.join(cacheDir, cached[0] ?? 'missing', 'chrome-headless-shell-mac-arm64/chrome-headless-shell'));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const manifest = {}; const meta = {};
const CONC = Number(arg('--conc', 4));
const keyOf = (r) => (r.tab ? `${r.route}#tab=${r.tab}` : r.route);
// unique slugs assigned up front, in route order, so file names never depend on scheduling
const used = new Set(); const slugs = routes.map((r) => { let s = slugOf(r); while (used.has(s)) s += '_'; used.add(s); return s; });
// Playwright is run with serviceWorkers blocked, so app.js logs this registration failure on every page: expected noise, dropped (it also embeds the port).
const NOISE = /^Service worker registration failed/;

async function captureOne(r, slug) {
  const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } });
  try {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error' && !NOISE.test(m.text())) errors.push(m.text().replace(/127\.0\.0\.1:\d+/g, 'HOST')); });
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
    await page.addInitScript(() => { try { localStorage.clear(); sessionStorage.clear(); } catch { /* ignore */ } });
    await page.goto(`${base}#${r.route}`, { waitUntil: 'domcontentloaded' });
    // ready signal: the consult appends its disclaimer last, after the page body (see renderOncConsult)
    await page.waitForSelector('main .onc-body > .wizard-disclaimer', { timeout: 30000 });
    if (r.tab) {
      // programmatic click: the first-run legal splash overlay (outside <main>) intercepts real pointer clicks
      await page.evaluate((t) => { [...document.querySelectorAll('.onc-tab')].find((b) => b.textContent.toLowerCase() === t).click(); }, r.tab);
      await page.waitForFunction((t) => document.querySelector('.onc-tab--on')?.textContent?.toLowerCase() === t, r.tab);
    }
    // settle: the main element must be unchanged across consecutive polls
    let prev = ''; let same = 0;
    for (let i = 0; i < 100 && same < 3; i++) {
      const cur = await page.evaluate(() => document.querySelector('main')?.outerHTML ?? '');
      same = cur === prev ? same + 1 : 0; prev = cur;
      if (same < 3) await page.waitForTimeout(60);
    }
    const notFound = await page.evaluate(() => !!document.querySelector('main .onc-notfound'));
    const shortBody = await page.evaluate(() => (document.querySelector('main .onc-body')?.textContent ?? '').replace(/\s+/g, ' ').trim().length < 400);
    fs.writeFileSync(path.join(outDir, slug + '.html'), prev);
    manifest[keyOf(r)] = createHash('sha256').update(prev).digest('hex');
    meta[keyOf(r)] = { slug, kind: r.kind, bytes: prev.length, notFound, shortBody, consoleErrors: errors };
  } finally { await ctx.close(); }
}
try {
  let next = 0;
  await Promise.all(Array.from({ length: CONC }, async () => {
    while (next < routes.length) { const i = next++; await captureOne(routes[i], slugs[i]); }
  }));
} finally {
  await browser.close();
  server.kill();
}
// stable key order in the output files
const sorted = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));
fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(sorted(manifest), null, 1));
fs.writeFileSync(path.join(outDir, 'meta.json'), JSON.stringify(sorted(meta), null, 1));
const kinds = {}; for (const r of routes) kinds[r.kind] = (kinds[r.kind] ?? 0) + 1;
console.log(`captured ${routes.length} routes in ${((Date.now() - t0) / 1000).toFixed(1)}s ->`, outDir, JSON.stringify(kinds));
