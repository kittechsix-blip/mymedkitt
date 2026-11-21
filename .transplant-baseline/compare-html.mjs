// Compare two capture directories made by capture-html.mjs.
// usage: node .transplant-baseline/compare-html.mjs <dirA> <dirB> [--cite-order-insensitive]     exit 1 on any difference
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const flags = process.argv.slice(2).filter((a) => a.startsWith('--'));
const [A, B] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
// --cite-order-insensitive: the live consult numbers per-toxicity management citations in the order async tree loads resolve
// (renderEffect -> treeOf().then -> refs.fromTree), so reference NUMBERS vary run to run on ~47 drug pages. This mode blanks the
// numbers (chip text, aria-label, [n], data-cite-num) and sorts the reference list, so wording/structure changes still show.
const canon = (h) => {
  h = h.replace(/(<button class="onc-cite"[^>]*aria-label="Reference )\d+(">)\d+(<\/button>)/g, '$1#$2#$3')
       .replace(/data-cite-num="\d+"/g, 'data-cite-num="#"').replace(/(<span class="reference-citation-num">)\[\d+\]/g, '$1[#]');
  return h.replace(/(<div class="reference-citation-list">)(.*?)(<\/div><\/details>)/s, (_, a, items, z) =>
    a + items.split(/(?=<div class="reference-citation-item")/).sort().join('') + z);
};
const insensitive = flags.includes('--cite-order-insensitive');
if (!A || !B) { console.error('usage: compare-html.mjs <dirA> <dirB>'); process.exit(2); }
const load = (d) => JSON.parse(fs.readFileSync(path.join(d, 'manifest.json'), 'utf8'));
const metaOf = (d) => JSON.parse(fs.readFileSync(path.join(d, 'meta.json'), 'utf8'));
const ma = load(A), mb = load(B), ta = metaOf(A), tb = metaOf(B);
let bad = 0;
for (const k of Object.keys(ma)) if (!(k in mb)) { console.log(`MISSING in ${B}: ${k}`); bad++; }
for (const k of Object.keys(mb)) if (!(k in ma)) { console.log(`MISSING in ${A}: ${k}`); bad++; }
const pretty = (f) => (insensitive ? canon(fs.readFileSync(f, 'utf8')) : fs.readFileSync(f, 'utf8')).replace(/></g, '>\n<'); // one tag per line so diffs are readable
let n = 0;
for (const k of Object.keys(ma)) {
  if (!(k in mb)) continue;
  const fa0 = path.join(A, ta[k].slug + '.html'), fb0 = path.join(B, tb[k].slug + '.html');
  if (insensitive ? canon(fs.readFileSync(fa0, 'utf8')) === canon(fs.readFileSync(fb0, 'utf8')) : ma[k] === mb[k]) continue;
  bad++; n++;
  const fa = path.join(A, ta[k].slug + '.html'), fb = path.join(B, tb[k].slug + '.html');
  const tmp = fs.mkdtempSync(path.join(process.env.TMPDIR || '/tmp', 'cmp-'));
  fs.writeFileSync(path.join(tmp, 'a'), pretty(fa)); fs.writeFileSync(path.join(tmp, 'b'), pretty(fb));
  const d = spawnSync('diff', ['-u', path.join(tmp, 'a'), path.join(tmp, 'b')], { encoding: 'utf8' }).stdout.split('\n').slice(0, 20).join('\n');
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`DIFFERS: ${k}\n${d}\n`);
}
const ea = JSON.stringify(Object.fromEntries(Object.entries(ta).map(([k, v]) => [k, v.consoleErrors])));
const eb = JSON.stringify(Object.fromEntries(Object.entries(tb).map(([k, v]) => [k, v.consoleErrors])));
if (ea !== eb) console.log('NOTE: console-error sets differ between captures (not counted as a failure)');
console.log(bad ? `FAIL: ${bad} difference(s) (${n} differing routes)` : `OK: ${Object.keys(ma).length} routes identical`);
process.exit(bad ? 1 : 0);
