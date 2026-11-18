// TEST FIXTURE ONLY. Obviously fake names, no clinical meaning. Never imported by anything under src/.
// Toxicity pages point at two existing nodes of the oncological-emergencies tree so the "page resolves" checks have a real target.
import type { OncData } from '../../src/data/onc-drugs/types.ts';

export const FIXTURE: OncData = {
  sources: {
    'fx-pi': { key: 'fx-pi', kind: 'fda-pi', text: 'Fixturda (testdrugumab) prescribing information. Fixture Pharma, fake label.', revised: '1/2000' },
    'fx-gl': { key: 'fx-gl', kind: 'guideline', text: 'Fixture Society guideline for fixture toxicity, fake.' },
  },
  cancers: [{ id: 'fixoma', name: 'Fixoma', aliases: ['fixture cancer'] }],
  complaints: [{ id: 'fx-complaint', label: 'Fixture complaint', order: 1 }],
  toxicities: [
    { id: 'fx-tox-a', label: 'Fixture effect A', page: { tree: 'oncological-emergencies', node: 'onc-tls-treat' }, complaints: ['fx-complaint'], ask: [{ v: 'Fixture question A?', cite: ['fx-gl'] }], lethality: 1 },
    { id: 'fx-tox-b', label: 'Fixture effect B', page: { tree: 'oncological-emergencies', node: 'onc-fn-recognize' }, complaints: ['fx-complaint'], ask: [], lethality: 2 },
    { id: 'fx-tox-c', label: 'Fixture effect C', page: { tree: 'onc-drug-side-effects', node: 'odse-tox-neuro' }, complaints: ['fx-complaint'], ask: [], lethality: 3 },
    { id: 'fx-tox-d', label: 'Fixture effect D', page: { tree: 'onc-drug-side-effects', node: 'odse-tox-myositis-overlap' }, complaints: ['fx-complaint'], ask: [], lethality: 3 },
    { id: 'fx-tox-e', label: 'Fixture effect E', page: { tree: 'onc-drug-side-effects', node: 'odse-tox-severe-skin' }, complaints: ['fx-complaint'], ask: [], lethality: 3 },
    { id: 'fx-tox-f', label: 'Fixture effect F', page: { tree: 'onc-drug-side-effects', node: 'odse-tox-infusion-reaction' }, complaints: ['fx-complaint'], ask: [], lethality: 3 },
  ],
  classes: [{
    id: 'fx-class', name: 'Fixture class', mechanism: { v: 'Fixture mechanism text.', cite: ['fx-pi'] },
    effects: [
      { tox: 'fx-tox-b', cite: ['fx-pi'] }, // no stated onset: no badge, sources only
      { tox: 'fx-tox-a', timing: { v: 'Fixture timing A', cite: ['fx-pi'] } },
      { tox: 'fx-tox-c', timing: { v: 'Nadir day 10-14 (range 7-21), recovery by day 28', cite: ['fx-pi'] } },
      { tox: 'fx-tox-d', timing: { v: 'Cumulative dose above 1,000 mg/m2, usually late', cite: ['fx-pi'] } },
      { tox: 'fx-tox-e', timing: { v: 'Within 24 hours of infusion', cite: ['fx-pi'] } },
      { tox: 'fx-tox-f', timing: { v: 'Fixture timing F', cite: ['fx-pi'] } },
    ],
  }],
  regimens: [
    { id: 'tdgx-4', acronym: 'TDGX-4', expansion: 'Fixture regimen', drugs: ['testdrugumab'], cancers: ['fixoma'], cite: ['fx-gl'] },
    { id: 'fxreg', acronym: 'FXREG', expansion: 'Fixture regimen two', drugs: ['testdrugumab', 'fixtureuncardedumab'], uncarded: [{ id: 'fixtureuncardedumab', name: 'Fixtureuncardedumab' }], cancers: ['fixoma'], cite: ['fx-gl'] },
  ],
  drugs: [{
    id: 'testdrugumab', generic: 'testdrugumab', brands: ['Fixturda'], aliases: ['tdg', 'fixturab'],
    classIds: ['fx-class'], cancers: ['fixoma'], label: 'fx-pi', tier: 'full',
    boxedWarning: [
      { v: 'Fixture boxed item one: severe fixture suppression, monitor counts before each cycle.', cite: ['fx-pi'] },
      { v: 'Fixture boxed item two: fixture cardiomyopathy risk rises above 550 mg/m2 cumulative exposure.', cite: ['fx-pi'] },
      { v: 'Fixture boxed item three: fixture infusion reactions, give only where resuscitation is available.', cite: ['fx-pi'] },
      { v: 'Fixture boxed item four: fixture secondary malignancy reported years after exposure.', cite: ['fx-gl'] },
    ],
    effects: [{ tox: 'fx-tox-a', quirk: { v: 'Fixture quirk.', cite: ['fx-pi'] } }],
    alsoOnLabel: [
      { v: 'Fixture interaction one: avoid fixture sympathomimetics.', cite: ['fx-pi'] },
      { v: 'Fixture warning two: fixture fluid retention can be delayed.', cite: ['fx-pi'] },
      { v: 'Fixture warning three: fixture graft-versus-host disease after transfusion.', cite: ['fx-gl'] },
      { v: 'Fixture warning four: fixture intracranial hypertension.', cite: ['fx-pi'] },
    ],
    pharmacyDrugId: 'acetaminophen',
  }, {
    // shares its generic name with a Pharmacy drug: entered with pin:false, must still be findable
    id: 'fx-pharma', generic: 'Acetaminophen', brands: [], classIds: ['fx-class'], cancers: ['fixoma'], label: 'fx-pi', tier: 'full', pin: false,
  }],
};
