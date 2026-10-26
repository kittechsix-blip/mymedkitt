// Scores the LIVE in-browser search() on bedside questions (scripts/search-bedside.json) on three measures:
//   page      is the expected page/node at rank 1 (and top 3)
//   answer    is the answer already visible in the first result's preview, without a tap
//   abstain   for questions the app cannot answer, does it avoid presenting a confident answer
// usage: node scripts/verify/bedside-score.mjs [--base http://localhost:8731] [--file path.json] [--propose] [--out file.json] [--md file.md]
import { chromium } from 'playwright';
import fs from 'fs';
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const base = arg('--base', 'http://localhost:8731');
const file = arg('--file', new URL('../search-bedside.json', import.meta.url).pathname);
const out = arg('--out', '');
const md = arg('--md', '');
const propose = process.argv.includes('--propose');
const qs = JSON.parse(fs.readFileSync(file, 'utf8')).questions;
if (!qs.length) { console.error('no questions in ' + file); process.exit(1); }

const browser = await chromium.launch();
// no service worker: its first-activation reload would destroy the page context mid-run
const page = await (await browser.newContext({ serviceWorkers: 'block' })).newPage();
await page.goto(base + '/app.html');
await page.waitForFunction(() => document.querySelector('.dashboard-hero-search__input') || document.querySelector('input[type=search]'), null, { timeout: 30000 });
await page.waitForTimeout(3000);
const res = await page.evaluate(async (qs) => {
  const m = await import('./services/search-service.js');
  m.buildSearchIndex();
  for (let i = 0; i < 100; i++) { await new Promise(r => setTimeout(r, 200)); if (m.search('ectopic').some(r => r.type === 'node')) break; }
  return qs.map(q => { const t = performance.now(); const r = m.search(q).slice(0, 12); return { q, ms: performance.now() - t, r: r.map(x => ({ type: x.type, label: x.label, route: x.route, drugId: x.drugId, score: x.score, preview: x.preview })) }; });
}, qs.map(x => x.q));
await browser.close();

const keys = (x) => {
  const m = x.route.match(/^\/tree\/([^/]+)(?:\/node\/(.+))?$/);
  if (x.type === 'drug') return ['drug:' + x.drugId];
  if (m) return m[2] ? ['node:' + m[1] + '/' + m[2], 'tree:' + m[1]] : ['tree:' + m[1]];
  const c = x.route.match(/^\/calculator\/(.+)$/); if (c) return ['calc:' + c[1]];
  const i = x.route.match(/^\/info\/([^/]+)(?:\/at\/(.+))?$/); if (i) return i[2] ? ['info:' + i[1], 'sec:' + i[1] + '#' + i[2]] : ['info:' + i[1]];
  const t = x.route.match(/^\/tricks\/[^/]+\/trick\/trick-(.+)$/); if (t) return ['trick:' + t[1]];
  return [x.route];
};
const brief = (x) => `${x.type}:${x.route}${x.preview ? `  "${x.preview}"` : ''}`;

const rows = qs.map((g, i) => {
  const r = res[i].r;
  const row = { q: g.q, ms: res[i].ms, top: r.slice(0, 3).map(brief) };
  if (g.pending) return { ...row, kind: 'pending' };
  if (g.covered === false) return { ...row, kind: 'uncovered', abstained: !r[0]?.preview };
  const rank = r.map(keys).findIndex(k => k.some(x => g.expect.includes(x))) + 1;
  const prev = r[0]?.preview ?? '';
  const answerVisible = g.answer ? rank === 1 && g.answer.every(p => new RegExp(p, 'i').test(prev)) : null;
  return { ...row, kind: 'covered', rank, answerVisible };
});

const cov = rows.filter(r => r.kind === 'covered'), unc = rows.filter(r => r.kind === 'uncovered'), pen = rows.filter(r => r.kind === 'pending');
const pct = (a, b) => (b ? (100 * a / b).toFixed(0) + '%' : 'n/a');
const r1 = cov.filter(r => r.rank === 1).length, t3 = cov.filter(r => r.rank >= 1 && r.rank <= 3).length;
const ans = cov.filter(r => r.answerVisible !== null), ansOk = ans.filter(r => r.answerVisible).length;
const absOk = unc.filter(r => r.abstained).length;
const ms = rows.map(r => r.ms).sort((a, b) => a - b);

const lines = [
  `PAGE     rank1 ${r1}/${cov.length} (${pct(r1, cov.length)})  top3 ${t3}/${cov.length} (${pct(t3, cov.length)})`,
  `ANSWER   visible in first result without a tap: ${ansOk}/${ans.length} (${pct(ansOk, ans.length)})`,
  `ABSTAIN  no confident answer when none exists: ${absOk}/${unc.length} (${pct(absOk, unc.length)})`,
  `PENDING  ${pen.length} unpinned (not scored); run with --propose to see top 3`,
  `search ms: median ${ms[ms.length >> 1].toFixed(1)}  max ${ms[ms.length - 1].toFixed(1)}  (search only; the tap-to-answer time is measured in the UI)`,
  '',
];
for (const r of cov) if (r.rank !== 1 || r.answerVisible === false) lines.push(`  MISS rank=${r.rank || '>12'}${r.answerVisible === false ? ' answer-not-visible' : ''}  "${r.q}"\n      top: ${r.top[0] || '-'}`);
for (const r of unc) if (!r.abstained) lines.push(`  FALSE-CONFIDENCE  "${r.q}"\n      top: ${r.top[0] || '-'}`);
if (propose) for (const r of pen) lines.push(`  PROPOSE  "${r.q}"\n` + r.top.map((t, i) => `      ${i + 1}. ${t}`).join('\n'));
console.log(lines.join('\n'));

if (out) fs.writeFileSync(out, JSON.stringify({ rows }, null, 1));
if (md) {
  const mark = (b) => (b === null ? '-' : b ? 'yes' : 'NO');
  fs.writeFileSync(md, ['# Bedside scorecard', '', '```', ...lines.slice(0, 5), '```', '', '| Question | Kind | Rank | Answer visible | Top result |', '|---|---|---|---|---|',
    ...rows.map(r => `| ${r.q} | ${r.kind} | ${r.kind === 'covered' ? r.rank || '>12' : '-'} | ${r.kind === 'covered' ? mark(r.answerVisible) : r.kind === 'uncovered' ? (r.abstained ? 'abstained' : 'FALSE-CONFIDENCE') : '-'} | ${(r.top[0] || '-').replace(/\|/g, '/')} |`)].join('\n') + '\n');
}
