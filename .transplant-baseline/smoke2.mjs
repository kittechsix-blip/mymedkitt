import { chromium } from 'playwright'; import { spawn } from 'node:child_process'; import { createServer } from 'node:net'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)); const ROOT = path.resolve(HERE, '..');
const tx = await import(pathToFileURL(path.join(ROOT, 'docs/data/transplant-drugs/index.js')).href);
const tree = await import(pathToFileURL(path.join(ROOT, 'docs/data/trees/transplant-patient-ed.js')).href);
const freePort = () => new Promise((res) => { const s = createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); }); });
const port = await freePort();
const server = spawn(process.execPath, [path.join(ROOT, 'scripts/rapid-serve.ts')], { env: { ...process.env, RAPID_PORT: String(port) }, stdio: 'ignore' });
const base = `http://127.0.0.1:${port}/app.html`;
for (let i = 0; i < 50; i++) { try { if ((await fetch(base)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 100)); }
const cacheDir = path.join(process.env.HOME, 'Library/Caches/ms-playwright'); const cached = fs.readdirSync(cacheDir).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse();
const exe = fs.existsSync(chromium.executablePath()) ? undefined : path.join(cacheDir, cached[0], 'chrome-headless-shell-mac-arm64/chrome-headless-shell');
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const NOISE = /^Service worker registration failed/;
const out = { nodes: [], overlays: [], links: [], cards: [], effects: [], cmvDrug: [], viewport: [], errors: [] };
async function open(route, ready) {
  const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } }); const page = await ctx.newPage(); const errors = [];
  page.on('console', (m) => { if (m.type() === 'error' && !NOISE.test(m.text())) errors.push(m.text().replace(/127\.0\.0\.1:\d+/g, 'HOST')); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await page.addInitScript(() => { try { localStorage.clear(); sessionStorage.clear(); } catch {} });
  await page.goto(`${base}#${route}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector(ready, { timeout: 30000 }); await page.waitForTimeout(350);
  return { ctx, page, errors };
}
const T = '/tree/transplant-patient-ed'; const D = '/tree/transplant-drug-side-effects';
const nodeIds = tree.TRANSPLANT_PATIENT_ED_NODES.map((n) => n.id);
const infoSeen = new Map(); // overlay id -> first node that links it
const pool = async (items, n, fn) => { let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; try { await fn(items[k], k); } catch (e) { out.errors.push(`${items[k]?.id ?? items[k]}: ${String(e.message).split('\n')[0]}`); } } })); };
const ENTRIES = new Set(['tpe-heart', 'tpe-liver', 'tpe-lung', 'tpe-cmv', 'tpe-bk', 'tpe-cni-toxicity', 'tpe-cni-hypertension']);

// ---- A. every node, links inventory, viewport for entries
const linkInv = {};
await pool(['tpe-start', ...nodeIds.filter((x) => x !== 'tpe-start')], 3, async (id) => {
  const route = id === 'tpe-start' ? T : `${T}/node/${id}`;
  const { ctx, page, errors } = await open(route, 'main .decision-card');
  const info = await page.evaluate(() => {
    const t = (document.querySelector('main')?.textContent ?? '').replace(/\s+/g, ' ');
    const acc = document.querySelector('.decision-card--active details.card-accordion, .decision-card details.card-accordion');
    return { len: t.length, notFound: /not found/i.test(t), title: document.querySelector('.decision-card__title')?.textContent?.trim(), hasAcc: !!acc };
  });
  if (ENTRIES.has(id) || id === 'tpe-start') {
    const m = await page.evaluate(() => {
      const vh = window.innerHeight; const card = document.querySelector('.decision-card--active') || document.querySelector('.decision-card');
      const bar = document.querySelector('.contextual-toolbar, .consult-toolbar, nav.bottom-tab-bar'); const barTop = bar && getComputedStyle(bar).display !== 'none' ? bar.getBoundingClientRect().top : vh;
      const q = (s) => { const e = card.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom) }; };
      const summary = q('.card-summary'); const trigger = q('summary.card-accordion__trigger'); const opts = q('.decision-card__options');
      const bodyEl = card.querySelector('.card-accordion__content');
      let lines = null;
      if (bodyEl) { const det = bodyEl.closest('details'); const was = det.open; det.open = true; const first = bodyEl.querySelector('p, li, div') || bodyEl; const r = first.getBoundingClientRect(); const lh = parseFloat(getComputedStyle(first).lineHeight) || 20; lines = { top: Math.round(r.top), twoLinesBottom: Math.round(r.top + 2 * lh), lineHeight: Math.round(lh) }; det.open = was; }
      return { vh, barTop: Math.round(barTop), summary, trigger, opts, body: lines, hasBodyInAccordion: !!bodyEl, bodyInlineLen: (card.querySelector('.card-body, .decision-card__body')?.textContent || '').length };
    });
    out.viewport.push({ id, ...m });
  }
  // open accordion, inventory data-link-type buttons
  await page.evaluate(() => document.querySelectorAll('details.card-accordion').forEach((d) => { d.open = true; }));
  const links = await page.evaluate(() => [...document.querySelectorAll('.decision-card--active [data-link-type], .decision-card [data-link-type]')].map((e) => ({ t: e.getAttribute('data-link-type'), id: e.getAttribute('data-link-id'), txt: (e.textContent || '').trim().slice(0, 40) })));
  linkInv[id] = links;
  for (const l of links) if (l.t === 'info' && !infoSeen.has(l.id)) infoSeen.set(l.id, id);
  out.nodes.push({ id, ...info, links: links.length, errors });
  await ctx.close();
});
// ---- B. overlays: open each from the node that links it
await pool([...infoSeen.entries()].map(([ov, node]) => ({ id: ov, node })), 3, async ({ id: ov, node }) => {
  const route = node === 'tpe-start' ? T : `${T}/node/${node}`;
  const { ctx, page, errors } = await open(route, 'main .decision-card');
  await page.evaluate(() => document.querySelectorAll('details.card-accordion').forEach((d) => { d.open = true; }));
  await page.evaluate((o) => { [...document.querySelectorAll('[data-link-type="info"]')].find((e) => e.getAttribute('data-link-id') === o).click(); }, ov);
  await page.waitForTimeout(700);
  const r = await page.evaluate(() => {
    const o = document.querySelector('.info-modal-overlay'); if (!o) return { open: false };
    const x = o.querySelector('.modal-header .btn-text'); const refs = o.querySelector('.info-page-citations summary')?.textContent;
    const cites = [...o.querySelectorAll('.cite-link')].map((b) => b.textContent.replace(/\D/g, '')); const decl = new Set([...o.querySelectorAll('.reference-citation-item')].map((e) => e.id.replace('info-cite-', '')));
    return { open: true, title: o.querySelector('.modal-header h2, .modal-header h3, .modal-header .modal-title')?.textContent?.trim() || o.querySelector('.modal-header')?.textContent?.trim().slice(0, 60), hasX: !!x && /✕/.test(x.textContent), refs, markers: cites.length, dangling: [...new Set(cites)].filter((c) => !decl.has(c)), textLen: (o.querySelector('.info-modal-body')?.textContent || '').length };
  });
  let closed = false;
  if (r.open) { await page.evaluate(() => document.querySelector('.info-modal-overlay .modal-header .btn-text').click()); await page.waitForTimeout(400); closed = await page.evaluate(() => !document.querySelector('.info-modal-overlay')); }
  out.overlays.push({ ov, from: node, ...r, closedByX: closed, errors }); await ctx.close();
});
// ---- C. every inline link of every node: does it do anything
const linkJobs = []; for (const [id, ls] of Object.entries(linkInv)) ls.forEach((l, i) => { if (l.t !== 'info') linkJobs.push({ id, i, l }); });
await pool(linkJobs, 3, async ({ id, i, l }) => {
  const route = id === 'tpe-start' ? T : `${T}/node/${id}`;
  const { ctx, page, errors } = await open(route, 'main .decision-card');
  await page.evaluate(() => document.querySelectorAll('details.card-accordion').forEach((d) => { d.open = true; }));
  const before = await page.evaluate(() => location.hash);
  const clicked = await page.evaluate((k) => { const e = [...document.querySelectorAll('.decision-card [data-link-type]')][k]; if (!e) return false; e.click(); return true; }, i);
  await page.waitForTimeout(900);
  const after = await page.evaluate(() => ({ hash: location.hash, modal: !!document.querySelector('.modal-overlay.active, .drug-modal-overlay, .modal-overlay'), cardTitle: document.querySelector('.decision-card--active .decision-card__title')?.textContent?.trim() }));
  const changed = after.hash !== before || after.modal || (l.t === 'node');
  out.links.push({ node: id, type: l.t, target: l.id, ok: clicked && changed, hash: after.hash, errors });
  await ctx.close();
});
// ---- D. cards and effect links
for (const d of tx.TX_DATA.drugs) {
  const { ctx, page, errors } = await open(`${D}/node/tdse-drug-${d.id}`, 'main .onc-body > .wizard-disclaimer');
  const n = await page.evaluate(() => document.querySelectorAll('.onc-effect__toggle').length); await ctx.close();
  out.cards.push({ id: d.id, effects: n, errors });
  for (let i = 0; i < n; i++) {
    const c2 = await open(`${D}/node/tdse-drug-${d.id}`, 'main .onc-body > .wizard-disclaimer');
    const eff = await c2.page.evaluate((k) => { const rows = document.querySelectorAll('.onc-effect'); const row = rows[k]; const lab = row.querySelector('.onc-effect__label')?.textContent; row.querySelector('.onc-effect__toggle').click(); const panel = row.querySelector('.onc-effect__panel'); return { label: lab, panelText: (panel?.textContent || '').replace(/\s+/g, ' ').slice(0, 400) }; }, i);
    const had = await c2.page.evaluate((k) => { const b = [...document.querySelectorAll('.onc-effect')[k].querySelectorAll('button')].find((x) => /Workup & treatment/.test(x.textContent)); if (!b) return false; b.click(); return true; }, i);
    let hash = null, landed = null;
    if (had) { await c2.page.waitForTimeout(1500); hash = await c2.page.evaluate(() => location.hash); landed = await c2.page.evaluate(() => (document.querySelector('.decision-card__title')?.textContent || '').trim()); }
    out.effects.push({ card: d.id, i, label: eff.label, hadButton: had, hash, landed, panel: eff.panelText.slice(0, 220), errors: c2.errors }); await c2.ctx.close();
  }
}
// ---- E. CMV page drug links: valganciclovir and ganciclovir modals
for (const nodeId of ['tpe-cmv-treat', 'tpe-cmv-workup', 'tpe-cmv']) {
  const { ctx, page } = await open(`${T}/node/${nodeId}`, 'main .decision-card');
  await page.evaluate(() => document.querySelectorAll('details.card-accordion').forEach((d) => { d.open = true; }));
  const drugLinks = await page.evaluate(() => [...document.querySelectorAll('[data-link-type="drug"]')].map((e) => e.getAttribute('data-link-id')));
  for (const dl of [...new Set(drugLinks)]) {
    await page.evaluate((x) => { [...document.querySelectorAll('[data-link-type="drug"]')].find((e) => e.getAttribute('data-link-id') === x).click(); }, dl); await page.waitForTimeout(900);
    const r = await page.evaluate(() => { const m = document.querySelector('.modal-overlay.active, .modal-overlay'); const t = (m?.textContent || '').replace(/\s+/g, ' '); return { open: !!m, len: t.length, bands: ['5.0 mg/kg every 12 h', '1.25 mg/kg three times a week', '900 mg every 12 h', '450 mg every 48 h', '200 mg three times a week'].filter((b) => t.includes(b)), inputs: m ? m.querySelectorAll('input').length : 0, calcText: /mg\/kg/.test(t), weightUi: !!m?.querySelector('.dose-calc-weight-summary, .weight-carry-chip, input[type=number], input[inputmode]'), highlighted: !!m?.querySelector('[style*="outline"]') }; });
    out.cmvDrug.push({ from: nodeId, link: dl, ...r });
    await page.evaluate(() => { const c = document.querySelector('.modal-overlay.active .btn-text, .modal-overlay .btn-text, .modal-close'); c && c.click(); }); await page.waitForTimeout(300);
  }
  await ctx.close();
}
await browser.close(); server.kill();
fs.writeFileSync(path.join(HERE, 'smoke2.json'), JSON.stringify(out, null, 1));
console.log('done', out.nodes.length, out.overlays.length, out.links.length, out.cards.length, out.effects.length);
