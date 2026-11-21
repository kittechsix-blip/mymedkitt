// Snapshot dumper for the onc-drug-side-effects consult. Reads the compiled docs/ modules
// in the worktree and writes a deterministic JSON (sorted collections, recursively sorted keys).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const od = await import(pathToFileURL(path.join(ROOT, 'docs', 'data', 'onc-drugs', 'index.js')).href);
const { ONC_DATA, resolveEffects, oncSearchDocs } = od;

const sortKeys = (v) => {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === 'object') {
    if (v instanceof Map) return sortKeys(Object.fromEntries(v));
    if (v instanceof Set) return sortKeys([...v]);
    return Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])]));
  }
  return v;
};
const byId = (xs) => [...xs].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

const drugs = byId(ONC_DATA.drugs).map((d) => ({ id: d.id, raw: d, resolved: resolveEffects(d, ONC_DATA) }));
const search = oncSearchDocs(ONC_DATA);
const out = sortKeys({
  counts: {
    drugs: ONC_DATA.drugs.length,
    classes: ONC_DATA.classes.length,
    regimens: ONC_DATA.regimens.length,
    toxicities: ONC_DATA.toxicities.length,
    complaints: ONC_DATA.complaints.length,
    searchNodeDocs: search.nodes.length,
    searchOncDocs: search.onc.length,
  },
  drugs,
  classes: byId(ONC_DATA.classes),
  regimens: byId(ONC_DATA.regimens),
  toxicities: byId(ONC_DATA.toxicities),
  complaints: byId(ONC_DATA.complaints),
  oncSearchDocs: {
    nodes: [...search.nodes].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)),
    onc: [...search.onc].sort((a, b) => (a.route < b.route ? -1 : a.route > b.route ? 1 : 0)),
  },
});
fs.writeFileSync(path.join(HERE, 'onc-resolved-after3.json'), JSON.stringify(out, null, 2) + '\n');
console.log(JSON.stringify(out.counts));
