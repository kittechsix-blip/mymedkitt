// Smoke test of the transplant consults, same mechanism as capture-html.mjs (rapid-serve + repo Playwright, SW blocked).
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)); const ROOT = path.resolve(HERE, '..');
const tx = await import(pathToFileURL(path.join(ROOT, 'docs/data/transplant-drugs/index.js')).href);
const freePort = () => new Promise((res) => { const s = createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); }); });
const port = await freePort();
const server = spawn(process.execPath, [path.join(ROOT, 'scripts/rapid-serve.ts')], { env: { ...process.env, RAPID_PORT: String(port) }, stdio: 'ignore' });
const base = `http://127.0.0.1:${port}/app.html`;
for (let i = 0; i < 50; i++) { try { if ((await fetch(base)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 100)); }
const cacheDir = path.join(process.env.HOME, 'Library/Caches/ms-playwright');
const cached = fs.readdirSync(cacheDir).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse();
const exe = fs.existsSync(chromium.executablePath()) ? undefined : path.join(cacheDir, cached[0], 'chrome-headless-shell-mac-arm64/chrome-headless-shell');
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const NOISE = /^Service worker registration failed/;
const results = [];
async function visit(label, route, fn, ready) {
  const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage(); const errors = [];
  page.on('console', (m) => { if (m.type() === 'error' && !NOISE.test(m.text())) errors.push(m.text().replace(/127\.0\.0\.1:\d+/g, 'HOST')); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await page.addInitScript(() => { try { localStorage.clear(); sessionStorage.clear(); } catch {} });
  const rec = { label, route, ok: true, notes: [] };
  try {
    await page.goto(`${base}#${route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector(ready ?? 'main .onc-body > .wizard-disclaimer', { timeout: 20000 });
    await page.waitForTimeout(400);
    if (fn) await fn(page, rec);
    const txt = await page.evaluate(() => (document.querySelector('main')?.textContent ?? '').replace(/\s+/g, ' ').trim());
    rec.len = txt.length;
    if (/not found/i.test(txt)) rec.notes.push('text contains "not found"');
    if (txt.length < 150) rec.notes.push('short body (' + txt.length + ')');
    rec.head = txt.slice(0, 90);
  } catch (e) { rec.ok = false; rec.notes.push('ERROR ' + String(e.message).split('\n')[0]); }
  rec.errors = errors; if (errors.length) rec.ok = false; if (rec.notes.length) rec.ok = false;
  results.push(rec); await ctx.close(); return rec;
}
const T = 'transplant-drug-side-effects'; const home = `/tree/${T}`;
const vn = (k, s) => `${home}/node/tdse-${k}-${s}`;
// tabs
const tabNames = await (async () => { const ctx = await browser.newContext({ serviceWorkers: 'block' }); const p = await ctx.newPage(); await p.goto(`${base}#${home}`); await p.waitForSelector('main .onc-body > .wizard-disclaimer'); const n = await p.evaluate(() => [...document.querySelectorAll('.onc-tab')].map((b) => b.textContent)); await ctx.close(); return n; })();
console.log('tabs:', JSON.stringify(tabNames));
for (const tab of tabNames) await visit('home tab ' + tab, home, async (p, rec) => {
  await p.evaluate((t) => { [...document.querySelectorAll('.onc-tab')].find((b) => b.textContent === t).click(); }, tab);
  await p.waitForTimeout(300); rec.notes.push && 0;
  const items = await p.evaluate(() => document.querySelectorAll('main .onc-body button, main .onc-body a').length); rec.items = items; if (items < 3) rec.notes.push('few items ' + items);
});
for (const d of tx.TX_DATA.drugs) await visit('card ' + d.id, vn('drug', d.id));
await visit('class tx-cni', vn('class', 'tx-cni'));
await visit('organ kidney', vn('organ', 'kidney'));
await visit('organ pancreas', vn('organ', 'pancreas'));
await visit('complaint fever', vn('cx', 'fever'));
// follow each effect link from tacrolimus (expand the effect row, press "Workup & treatment")
{
  const ctx0 = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } }); const p0 = await ctx0.newPage();
  await p0.goto(`${base}#${vn('drug', 'tacrolimus')}`); await p0.waitForSelector('main .onc-body > .wizard-disclaimer'); await p0.waitForTimeout(400);
  const n = await p0.evaluate(() => document.querySelectorAll('.onc-effect__toggle').length); await ctx0.close();
  for (let i = 0; i < n; i++) await visit('tacrolimus effect #' + i, vn('drug', 'tacrolimus'), async (p, rec) => {
    rec.effect = await p.evaluate((k) => { const t = document.querySelectorAll('.onc-effect__toggle')[k]; const l = t.textContent.trim().slice(0, 50); t.click(); return l; }, i);
    await p.waitForTimeout(200);
    const had = await p.evaluate((k) => { const row = document.querySelectorAll('.onc-effect')[k]; const b = [...row.querySelectorAll('button')].find((x) => /Workup & treatment/.test(x.textContent)); if (!b) return false; b.click(); return true; }, i);
    if (!had) { rec.notes.push('no Workup & treatment button'); return; }
    await p.waitForTimeout(1500);
    rec.afterHash = await p.evaluate(() => location.hash);
    rec.afterText = await p.evaluate(() => (document.querySelector('main')?.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 110));
  });
}
// tree pages
const TPE = '/tree/transplant-patient-ed';
for (const n of [null, 'tpe-heart', 'tpe-liver', 'tpe-lung', 'tpe-cmv', 'tpe-bk', 'tpe-cni-toxicity']) await visit('tpe ' + (n ?? 'start'), n ? `${TPE}/node/${n}` : TPE, async (p, rec) => {
  rec.title = await p.evaluate(() => [...document.querySelectorAll('main h1, main h2, main .decision-card__title, main .card-title')].slice(0, 2).map((e) => e.textContent.trim()).join(' | '));
}, 'main .decision-card, main .consult-flow, main [class*="card"]');
await visit('tdse tree start (consult-flow route)', `/tree/${T}`, null);
// home search
const searchRes = [];
for (const q of ['tacrolimus', 'Prograf', 'FK506', 'CsA', 'cyclosporine', 'Neoral', 'tac']) {
  const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } }); const p = await ctx.newPage(); const errors = [];
  p.on('console', (m) => { if (m.type() === 'error' && !NOISE.test(m.text())) errors.push(m.text()); }); p.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await p.addInitScript(() => { try { localStorage.clear(); } catch {} });
  await p.goto(`${base}#/`, { waitUntil: 'domcontentloaded' });
  await p.waitForSelector('.dashboard-hero-search__input', { timeout: 20000 });
  await p.evaluate((qq) => { const i = document.querySelector('.dashboard-hero-search__input'); i.value = qq; i.dispatchEvent(new Event('input', { bubbles: true })); }, q);
  await p.waitForTimeout(700);
  const rs = await p.evaluate(() => [...document.querySelectorAll('.dashboard-hero-search__result')].slice(0, 3).map((li) => ({ badge: li.querySelector('.dashboard-hero-search__badge')?.textContent, label: li.querySelector('.dashboard-hero-search__label')?.textContent, sub: li.querySelector('.dashboard-hero-search__sublabel')?.textContent })));
  let route = null;
  if (rs.length) { await p.evaluate(() => document.querySelector('.dashboard-hero-search__result').click()); await p.waitForTimeout(600); route = await p.evaluate(() => location.hash); }
  searchRes.push({ q, first: rs[0] ?? null, second: rs[1] ?? null, route, errors }); await ctx.close();
}
// Home: how many times does the Transplant Patient in the ED consult render across categories (de-dup check) via dashboard/category pages
const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } }); const p = await ctx.newPage();
await p.addInitScript(() => { try { localStorage.clear(); } catch {} });
const cats = {};
for (const c of ['emergency-medicine', 'nephro-rheum-endo']) { await p.goto(`${base}#/category/${c}`, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(2000); cats[c] = await p.evaluate(() => { const t = document.body.textContent ?? ''; return { transplantEd: (t.match(/Transplant Patient in the ED/g) || []).length, tdse: (t.match(/Transplant Drugs Side-effects/g) || []).length }; }); }
await p.goto(`${base}#/`, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1200);
cats.home = await p.evaluate(() => { const t = document.body.textContent ?? ''; return { transplantEd: (t.match(/Transplant Patient in the ED/g) || []).length }; });
await ctx.close();
await browser.close(); server.kill();
console.log(JSON.stringify({ results: results.map(({ label, ok, len, notes, errors, items, effect, afterHash, afterText, title, head }) => ({ label, ok, len, items, notes, errors, effect, afterHash, afterText, title, head })), searchRes, cats }, null, 1));
