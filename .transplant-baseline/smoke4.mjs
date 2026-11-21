import { chromium } from 'playwright'; import { spawn } from 'node:child_process'; import { createServer } from 'node:net'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)); const ROOT = path.resolve(HERE, '..');
const tx = await import(pathToFileURL(path.join(ROOT, 'docs/data/transplant-drugs/index.js')).href);
const od = await import(pathToFileURL(path.join(ROOT, 'docs/data/onc-drugs/index.js')).href);
const freePort = () => new Promise((res) => { const s = createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); }); });
const port = await freePort();
const server = spawn(process.execPath, [path.join(ROOT, 'scripts/rapid-serve.ts')], { env: { ...process.env, RAPID_PORT: String(port) }, stdio: 'ignore' });
const base = `http://127.0.0.1:${port}/app.html`; for (let i = 0; i < 50; i++) { try { if ((await fetch(base)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 100)); }
const cacheDir = path.join(process.env.HOME, 'Library/Caches/ms-playwright'); const cached = fs.readdirSync(cacheDir).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse();
const exe = fs.existsSync(chromium.executablePath()) ? undefined : path.join(cacheDir, cached[0], 'chrome-headless-shell-mac-arm64/chrome-headless-shell');
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const NOISE = /^Service worker registration failed/;
async function open(route) { const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } }); const page = await ctx.newPage(); const errors = [];
  page.on('console', (m) => { if (m.type() === 'error' && !NOISE.test(m.text())) errors.push(m.text().replace(/127\.0\.0\.1:\d+/g, 'HOST')); }); page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await page.addInitScript(() => { try { localStorage.clear(); sessionStorage.clear(); } catch {} }); await page.goto(`${base}#${route}`, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('main .onc-body > .wizard-disclaimer', { timeout: 40000 }); await page.waitForTimeout(500); return { ctx, page, errors }; }
const out = { tx: [], onc: [], organTab: null };
for (const d of tx.TX_DATA.drugs) {
  const { ctx, page, errors } = await open(`/tree/transplant-drug-side-effects/node/tdse-drug-${d.id}`);
  const r = await page.evaluate(() => {
    const card = document.querySelector('.onc-card'); const note = card.querySelector('.onc-card-note'); const ident = card.querySelector('.onc-identity');
    const sec = card.querySelector('.onc-interactions'); const toggle = sec?.querySelector('.onc-group-toggle'); const ul = sec?.querySelector('ul');
    const items = [...(ul?.querySelectorAll('li') ?? [])].map((li) => li.textContent.trim().slice(0, 40));
    const also = [...card.querySelectorAll('section.onc-label')].find((s) => s.querySelector('h2')?.textContent === 'Also on the label');
    const kids = [...card.children].map((c) => c.className.toString().split(' ')[0]);
    const rows = card.querySelectorAll('.onc-effect').length; const lastRowIdx = Math.max(...[...kids.keys()].filter((i) => kids[i] === 'onc-effect' || kids[i].startsWith('onc-effect')), -1);
    return { noteText: note?.textContent, noteAfterIdentity: ident?.nextElementSibling === note, toggleLabel: toggle?.querySelector('.onc-group-toggle__label')?.textContent, expanded: toggle?.getAttribute('aria-expanded'), listHidden: ul?.hidden, count: items.length, first: items[0], last: items[items.length - 1], alsoCount: also ? also.querySelectorAll('li').length : 0, alsoHeading: !!also, order: kids.filter((k) => ['onc-effect', 'onc-group-toggle', 'onc-interactions', 'onc-label'].includes(k)).join('>').replace(/(onc-effect>)+/g, 'effects>') };
  });
  out.tx.push({ id: d.id, ...r, expectedN: d.interactions.length, expectedFirst: d.interactions[0].v.slice(0, 40), expectedLast: d.interactions[d.interactions.length - 1].v.slice(0, 40), expectedAlso: d.alsoOnLabel.length, errors }); await ctx.close();
}
// organ tab
{ const { ctx, page, errors } = await open('/tree/transplant-drug-side-effects'); await page.evaluate(() => { [...document.querySelectorAll('.onc-tab')].find((b) => b.textContent === 'Organ').click(); }); await page.waitForTimeout(400);
  out.organTab = await page.evaluate(() => ({ rows: [...document.querySelectorAll('main .onc-body a, main .onc-body button')].map((e) => e.textContent.trim().replace(/\s+/g, ' ')).filter((t) => /drug/.test(t)), hasNoOrgan: /All organs \(label names none\)/.test(document.querySelector('main').textContent) })); out.organTab.errors = errors; await ctx.close(); }
// oncology card unchanged
for (const id of ['pembrolizumab', 'rituximab', 'methotrexate']) { if (!od.ONC_DATA.drugs.some((d) => d.id === id)) continue; const { ctx, page, errors } = await open(`/tree/onc-drug-side-effects/node/odse-drug-${id}`); out.onc.push({ id, ...(await page.evaluate(() => ({ note: !!document.querySelector('.onc-card-note'), interactions: !!document.querySelector('.onc-interactions'), alsoHeading: [...document.querySelectorAll('h2.onc-section')].some((h) => h.textContent === 'Also on the label') }))), errors }); await ctx.close(); }
await browser.close(); server.kill(); fs.writeFileSync(path.join(HERE, 'smoke4.json'), JSON.stringify(out, null, 1)); console.log('done');
