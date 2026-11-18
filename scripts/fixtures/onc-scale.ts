// TEST FIXTURE ONLY. Generated fake data to exercise the merge, the gates and the search index at the expected size
// (about 85 drugs, 20 classes, 20 regimens). Never imported by anything under src/.
import type { Cancer, DrugClass, OncDrug, OncGroup, Regimen } from '../../src/data/onc-drugs/types.ts';
import { FIXTURE } from './onc-fixture.ts';

const TOX = FIXTURE.toxicities.map((t) => t.id);
const pad = (n: number): string => String(n).padStart(3, '0');
// letters only: normalised names strip digits' meaning for readers, so spell the index with letters
const word = (n: number): string => n.toString(26).split('').map((c) => String.fromCharCode(97 + parseInt(c, 26))).join('');

/** Groups keyed by file name, as drugs/index.ts would hold them: `groupCount` fake files sharing the drugs out. */
export function scaledGroups(drugCount = 80, classCount = 19, regimenCount = 20, groupCount = 4): Record<string, OncGroup> {
  const groups: Record<string, OncGroup> = {};
  for (let g = 0; g < groupCount; g++) groups[`scale-${g}.ts`] = { DRUGS: [], CLASSES: [], CANCERS: [], REGIMENS: [] };
  const file = (i: number): OncGroup => groups[`scale-${i % groupCount}.ts`];
  const cancerIds: string[] = [];
  for (let i = 0; i < 40; i++) {
    const c: Cancer = { id: `sc-cancer-${pad(i)}`, name: `${String.fromCharCode(65 + (i % 26))}fixoma ${word(i)}` };
    cancerIds.push(c.id);
    file(i).CANCERS!.push(c, ...(i % 7 === 0 ? [{ ...c }] : [])); // an identical pair declared twice merges silently
  }
  for (let i = 0; i < classCount; i++) {
    const cls: DrugClass = {
      id: `sc-class-${pad(i)}`, name: `Scaleclass ${word(i)} inhibitor`, mechanism: { v: 'Fixture mechanism text.', cite: ['fx-pi'] },
      effects: TOX.map((tox, k) => (k % 3 === 1 ? { tox, cite: ['fx-pi'] } : { tox, timing: { v: `Nadir day ${7 + k}-${14 + k}, recovery by day 28`, cite: ['fx-pi'] } })),
    };
    file(i).CLASSES!.push(cls);
  }
  for (let i = 0; i < drugCount; i++) {
    const d: OncDrug = {
      id: `sc-drug-${pad(i)}`, generic: `scaledrug${word(i)}umab`, brands: [`Scalebrand${word(i)}`], classIds: [`sc-class-${pad(i % classCount)}`],
      cancers: [cancerIds[i % 40], cancerIds[(i * 7 + 3) % 40]], label: 'fx-pi', tier: 'full',
      boxedWarning: i % 4 === 0 ? undefined : [1, 2, 3].map((k) => ({ v: `Fixture boxed item ${k} for drug ${i}, above 550 mg/m2.`, cite: ['fx-pi'] })),
      pin: i % 10 === 0 ? false : undefined,
    };
    file(i).DRUGS!.push(d);
  }
  for (let i = 0; i < regimenCount; i++) {
    const r: Regimen = {
      id: `sc-reg-${pad(i)}`, acronym: `SC${word(i).toUpperCase()}X`, expansion: `Scale regimen ${word(i)}`,
      drugs: [`sc-drug-${pad(i)}`, `sc-drug-${pad(i + 20)}`, 'sc-uncarded'], uncarded: [{ id: 'sc-uncarded', name: 'Scaleuncardedumab' }],
      cancers: [cancerIds[i % 40]], cite: ['fx-gl'],
    };
    file(i).REGIMENS!.push(r);
  }
  return groups;
}
