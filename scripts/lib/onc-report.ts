// Prints every gate error for the shipped oncology data, grouped by code, and the unresolved-toxicity table.
// usage: node scripts/lib/onc-report.ts [maxLinesPerCode] [--stub]   (--stub adds placeholder toxicities for unknown ids so the other checks run)
import { checkOnc, loadEnv, imp } from './onc-checks.ts';
const od = await imp('data/onc-drugs/index.js');
const env = await loadEnv();
let data = od.ONC_DATA;
const known = new Set(data.toxicities.map((t: { id: string }) => t.id));
const refs = new Map<string, Set<string>>();
const add = (tox: string, drug: string) => { if (!known.has(tox)) refs.set(tox, (refs.get(tox) ?? new Set()).add(drug)); };
for (const d of data.drugs) {
  for (const cid of d.classIds) for (const e of data.classes.find((c: { id: string }) => c.id === cid)?.effects ?? []) add(e.tox, d.id);
  for (const o of d.effects ?? []) add(o.tox, d.id);
}
if (process.argv.includes('--stub')) {
  data = { ...data, toxicities: [...data.toxicities, ...[...refs.keys()].map((id) => ({ id, label: id, page: { tree: 'oncological-emergencies', node: 'onc-tls-treat' }, complaints: [], ask: [], lethality: 3 }))] };
}
const errs: string[] = [...od.ONC_MERGE_ERRORS, ...(await checkOnc(data, env, od))];
const by = new Map<string, string[]>();
for (const e of errs) { const k = e.split(':')[0]; by.set(k, [...(by.get(k) ?? []), e]); }
console.log(`drugs ${data.drugs.length} classes ${data.classes.length} cancers ${data.cancers.length} regimens ${data.regimens.length} errors ${errs.length}`);
for (const [k, v] of by) { console.log(`\n== ${k} (${v.length})`); for (const e of v.slice(0, Number(process.argv[2] ?? 40))) console.log('  ' + e.slice(0, 260)); }
console.log('\n== UNRESOLVED TOXICITY IDS (id | drugs referencing | list)');
for (const [id, ds] of [...refs].sort((a, b) => b[1].size - a[1].size)) console.log(`${id} | ${ds.size} | ${[...ds].join(', ')}`);
