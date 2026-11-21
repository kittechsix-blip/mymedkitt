import { chromium } from 'playwright'; import { spawn } from 'node:child_process'; import { createServer } from 'node:net'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)); const ROOT = path.resolve(HERE, '..');
const tree = await import(pathToFileURL(path.join(ROOT, 'docs/data/trees/transplant-patient-ed.js')).href);
const sm = Object.fromEntries(tree.TRANSPLANT_PATIENT_ED_NODES.map((n) => [n.id, n.summary]));
const freePort = () => new Promise((res) => { const s = createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); }); });
const port = await freePort();
const server = spawn(process.execPath, [path.join(ROOT, 'scripts/rapid-serve.ts')], { env: { ...process.env, RAPID_PORT: String(port) }, stdio: 'ignore' });
const base = `http://127.0.0.1:${port}/app.html`; for (let i = 0; i < 50; i++) { try { if ((await fetch(base)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 100)); }
const cacheDir = path.join(process.env.HOME, 'Library/Caches/ms-playwright'); const cached = fs.readdirSync(cacheDir).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse();
const exe = fs.existsSync(chromium.executablePath()) ? undefined : path.join(cacheDir, cached[0], 'chrome-headless-shell-mac-arm64/chrome-headless-shell');
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const NOISE = /^Service worker registration failed/;
async function open(route, ready) { const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } }); const page = await ctx.newPage(); const errors = [];
  page.on('console', (m) => { if (m.type() === 'error' && !NOISE.test(m.text())) errors.push(m.text().replace(/127\.0\.0\.1:\d+/g, 'HOST')); }); page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await page.addInitScript(() => { try { localStorage.clear(); sessionStorage.clear(); } catch {} }); await page.goto(`${base}#${route}`, { waitUntil: 'domcontentloaded' }); await page.waitForSelector(ready, { timeout: 30000 }); await page.waitForTimeout(350); return { ctx, page, errors }; }
const T = '/tree/transplant-patient-ed'; const D = '/tree/transplant-drug-side-effects'; const out = { flow: [], overlays: [], rows: [] };
const FLOW = ['tpe-cni-toxicity', 'tpe-cni-level', 'tpe-cni-interactions', 'tpe-cni-csa', 'tpe-cni-iv', 'tpe-cni-kidney', 'tpe-cni-brain', 'tpe-cni-seizure', 'tpe-cni-tma', 'tpe-cni-lytes', 'tpe-cni-overdose', 'tpe-cni-dispo'];
for (const id of FLOW) { const { ctx, page, errors } = await open(`${T}/node/${id}`, 'main .decision-card'); const r = await page.evaluate(() => { const t = (document.querySelector('main')?.textContent ?? '').replace(/\s+/g, ' '); return { len: t.length, nf: /not found/i.test(t), title: document.querySelector('.decision-card__title')?.textContent?.trim(), btns: document.querySelectorAll('.decision-card--active .btn-3d').length }; }); out.flow.push({ id, ...r, errors }); await ctx.close(); }
// overlays
const find = { 'tpe-cni-brain-detail': 'tpe-cni-brain', 'tpe-cni-tma-detail': 'tpe-cni-tma', 'tpe-cni-detail': null, 'tpe-heart-interactions': null };
for (const ov of Object.keys(find)) {
  let node = find[ov];
  if (!node) { for (const n of tree.TRANSPLANT_PATIENT_ED_NODES) if ((n.body || '').includes(`#/info/${ov}`) || JSON.stringify(n).includes(`#/info/${ov}`)) { node = n.id; break; } }
  const { ctx, page, errors } = await open(node === 'tpe-start' ? T : `${T}/node/${node}`, 'main .decision-card');
  await page.evaluate(() => document.querySelectorAll('details.card-accordion').forEach((d) => { d.open = true; }));
  const clicked = await page.evaluate((o) => { const e = [...document.querySelectorAll('[data-link-type="info"]')].find((x) => x.getAttribute('data-link-id') === o); if (!e) return false; e.click(); return true; }, ov); await page.waitForTimeout(700);
  const r = await page.evaluate(() => { const o = document.querySelector('.info-modal-overlay'); if (!o) return { open: false }; const decl = new Set([...o.querySelectorAll('.reference-citation-item')].map((e) => e.id.replace('info-cite-', ''))); const cites = [...o.querySelectorAll('.cite-link')].map((b) => b.textContent.replace(/\D/g, '')); return { open: true, hasX: /✕/.test(o.querySelector('.modal-header .btn-text')?.textContent || ''), refs: o.querySelector('.info-page-citations summary')?.textContent, markers: cites.length, dangling: [...new Set(cites)].filter((c) => !decl.has(c)), len: (o.querySelector('.info-modal-body')?.textContent || '').length }; });
  let closed = false; if (r.open) { await page.evaluate(() => document.querySelector('.info-modal-overlay .modal-header .btn-text').click()); await page.waitForTimeout(400); closed = await page.evaluate(() => !document.querySelector('.info-modal-overlay')); }
  out.overlays.push({ ov, from: node, linkFound: clicked, ...r, closedByX: closed, errors }); await ctx.close();
}
// card rows
const ROWS = [['Neurotoxicity', 'tpe-cni-brain'], ['Thrombotic microangiopathy', 'tpe-cni-tma'], ['Serious infection', 'tpe-infection-timeline'], ['Lymphoma and other malignancy', 'tpe-ptld']];
for (const card of ['tacrolimus', 'tacrolimus-xr-astagraf', 'tacrolimus-xr-envarsus', 'cyclosporine-modified', 'cyclosporine-non-modified']) for (const [lab, node] of ROWS) {
  const { ctx, page, errors } = await open(`${D}/node/tdse-drug-${card}`, 'main .onc-body > .wizard-disclaimer');
  const found = await page.evaluate((l) => { const row = [...document.querySelectorAll('.onc-effect')].find((x) => x.querySelector('.onc-effect__label')?.textContent === l); if (!row) return false; row.querySelector('.onc-effect__toggle').click(); return true; }, lab); await page.waitForTimeout(1200);
  const line = await page.evaluate((l) => { const row = [...document.querySelectorAll('.onc-effect')].find((x) => x.querySelector('.onc-effect__label')?.textContent === l); const e = row?.querySelector('.onc-effect__line'); if (!e) return null; const lh = parseFloat(getComputedStyle(e).lineHeight) || 20; const cs = getComputedStyle(e); return { text: e.textContent.replace(/\s+/g, ' ').trim(), lines: Math.round(e.getBoundingClientRect().height / lh), clamp: cs.webkitLineClamp, overflow: cs.overflow, scrollCut: e.scrollHeight > e.clientHeight + 2 }; }, lab);
  const had = await page.evaluate((l) => { const row = [...document.querySelectorAll('.onc-effect')].find((x) => x.querySelector('.onc-effect__label')?.textContent === l); const b = row && [...row.querySelectorAll('button')].find((x) => /Workup & treatment/.test(x.textContent)); if (!b) return false; b.click(); return true; }, lab);
  let hash = null, landed = null; if (had) { await page.waitForTimeout(1500); hash = await page.evaluate(() => location.hash); landed = await page.evaluate(() => (document.querySelector('.decision-card__title')?.textContent || '').trim()); }
  out.rows.push({ card, row: lab, found, line, summaryMatches: line ? line.text.replace(/\[\d+\]/g, '').includes((sm[node] || '').replace(/\*\*/g, '').replace(/\[\d+\]/g, '').slice(0, 50)) : null, hash, landed, expectNode: node, ok: hash === `#/tree/transplant-patient-ed/node/${node}`, errors }); await ctx.close();
}
await browser.close(); server.kill(); fs.writeFileSync(path.join(HERE, 'smoke3.json'), JSON.stringify(out, null, 1)); console.log('done');
