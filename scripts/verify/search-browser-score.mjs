// Scores the LIVE in-browser search() (whatever build is served on --base) against the gold + held-out sets.
// usage: node scripts/verify/search-browser-score.mjs [--base http://localhost:8731] [--out file.json]
import { chromium } from 'playwright';
import fs from 'fs';
import { GOLD } from '../search-gold.ts';
import { HELDOUT } from '../search-heldout.ts';
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const base = arg('--base', 'http://localhost:8731');
const out = arg('--out', '');
const browser = await chromium.launch();
// no service worker: its first-activation reload would destroy the page context mid-run
const page = await (await browser.newContext({ serviceWorkers: 'block' })).newPage();
await page.goto(base + '/app.html');
await page.waitForFunction(() => document.querySelector('.dashboard-hero-search__input') || document.querySelector('input[type=search]'), null, { timeout: 30000 });
await page.waitForTimeout(3000);
const run = (qs) => page.evaluate(async (qs) => {
  const m = await import('./services/search-service.js');
  m.buildSearchIndex();
  for (let i = 0; i < 100; i++) { await new Promise(r => setTimeout(r, 200)); if (m.search('ectopic').some(r => r.type === 'node')) break; }
  return qs.map(q => { const t = performance.now(); const r = m.search(q).slice(0, 12); return { q, ms: performance.now() - t, r: r.map(x => ({ type: x.type, label: x.label, route: x.route, drugId: x.drugId, sec: x.sec })) }; });
}, qs);
const keys = (x) => {
  const m = x.route.match(/^\/tree\/([^/]+)(?:\/node\/(.+))?$/);
  if (x.type === 'drug') return ['drug:' + x.drugId];
  if (m) return m[2] ? ['node:' + m[1] + '/' + m[2], 'tree:' + m[1]] : ['tree:' + m[1]];
  const c = x.route.match(/^\/calculator\/(.+)$/); if (c) return ['calc:' + c[1]];
  const i = x.route.match(/^\/info\/([^/]+)/); if (i) return ['info:' + i[1]];
  const t = x.route.match(/^\/tricks\/[^/]+\/trick\/trick-(.+)$/); if (t) return ['trick:' + t[1]];
  return [x.route];
};
const score = (set, res) => {
  const rows = set.map((g, i) => {
    const hits = res[i].r.map(keys);
    const rank = hits.findIndex(k => k.some(x => g.expect.includes(x))) + 1;
    return { q: g.q, rank, ms: res[i].ms, top: res[i].r.slice(0, 3).map(x => `${x.type}:${x.route}`) };
  });
  const r1 = rows.filter(r => r.rank === 1).length, t3 = rows.filter(r => r.rank >= 1 && r.rank <= 3).length;
  return { n: rows.length, r1, t3, rows };
};
const g = score(GOLD, await run(GOLD.map(x => x.q)));
const h = score(HELDOUT, await run(HELDOUT.map(x => x.q)));
const pct = (a, b) => (100 * a / b).toFixed(0) + '%';
console.log(`GOLD     rank1 ${g.r1}/${g.n} (${pct(g.r1, g.n)})  top3 ${g.t3}/${g.n} (${pct(g.t3, g.n)})`);
console.log(`HELD-OUT rank1 ${h.r1}/${h.n} (${pct(h.r1, h.n)})  top3 ${h.t3}/${h.n} (${pct(h.t3, h.n)})`);
for (const [name, s] of [['GOLD', g], ['HELDOUT', h]]) for (const r of s.rows) if (r.rank !== 1) console.log(`  ${name} miss rank=${r.rank || '>12'}  "${r.q}"  top: ${r.top[0] || '-'}`);
const ms = [...g.rows, ...h.rows].map(r => r.ms).sort((a, b) => a - b);
console.log(`query ms: median ${ms[ms.length >> 1].toFixed(1)}  p95 ${ms[Math.floor(ms.length * .95)].toFixed(1)}  max ${ms[ms.length - 1].toFixed(1)}`);
if (out) fs.writeFileSync(out, JSON.stringify({ gold: g, heldout: h }, null, 1));
await browser.close();
