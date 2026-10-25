// Records search() results for every consult / drug / calculator title typed as a query.
// usage: node scripts/verify/search-title-regression.mjs --out file.json [--compare before.json]
// With --compare it lists titles whose rank-1 result changed (title-style search must not regress).
import { chromium } from 'playwright';
import fs from 'fs';
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const base = arg('--base', 'http://localhost:8731');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(base + '/app.html');
await page.waitForFunction(() => document.querySelector('input[type=search]'), null, { timeout: 30000 });
await page.waitForTimeout(3000);
const rec = await page.evaluate(async () => {
  const s = await import('./services/search-service.js');
  const c = await import('./services/category-service.js');
  const d = await import('./services/drug-service.js');
  const k = await import('./components/calculator.js');
  s.buildSearchIndex();
  for (let i = 0; i < 100; i++) { await new Promise(r => setTimeout(r, 200)); if (s.search('ectopic').some(r => r.type === 'node')) break; }
  const titles = new Set();
  for (const cat of c.getAllCategories()) for (const t of cat.decisionTrees) titles.add(t.title);
  for (const x of d.getAllDrugs().slice(0, 80)) titles.add(x.name);
  for (const x of k.getAllCalculators().slice(0, 80)) titles.add(x.title);
  const out = {};
  for (const t of titles) out[t] = s.search(t).slice(0, 3).map(r => r.type + ':' + r.route + (r.drugId ? '#' + r.drugId : ''));
  return out;
});
fs.writeFileSync(arg('--out', '/tmp/titles.json'), JSON.stringify(rec));
console.log('titles recorded:', Object.keys(rec).length);
const cmp = arg('--compare', '');
if (cmp) {
  const before = JSON.parse(fs.readFileSync(cmp));
  let changed = 0, self = 0;
  for (const [t, r] of Object.entries(rec)) {
    if (!before[t]) continue;
    if (before[t][0] !== r[0]) { changed++; console.log('CHANGED rank1:', t, '\n   before', before[t][0], '\n   after ', r[0]); }
  }
  console.log('rank-1 changed:', changed, 'of', Object.keys(before).length);
}
await browser.close();
