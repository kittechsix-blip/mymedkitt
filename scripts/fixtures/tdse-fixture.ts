// TEST FIXTURE ONLY. Obviously fake names, no clinical meaning. Never imported by anything under src/.
// Inputs for buildTxData (src/data/transplant-drugs): two transplant-only cards, one transplant toxicity, and membership rows for two
// real oncology cards (rituximab, alemtuzumab). The transplant toxicity page points at a stub tree the test seeds into the gate's env.
import type { TxGroup, TxRegimen, Organ } from '../../src/data/transplant-drugs/types.ts';
import type { Complaint, Toxicity } from '../../src/data/onc-drugs/types.ts';

export const TX_FX_TREE = 'transplant-patient-ed';
export const TX_FX_NODE = 'fx-tp-node';

export const TX_FX_ORGANS: Organ[] = [
  { id: 'fx-kidney', name: 'Fixture kidney', aliases: ['fixture renal graft'] },
  { id: 'fx-liver', name: 'Fixture liver' },
];
export const TX_FX_COMPLAINTS: Complaint[] = [{ id: 'fx-tx-complaint', label: 'Fixture transplant complaint', order: 1 }];
export const TX_FX_TOXICITIES: Toxicity[] = [
  { id: 'fx-tx-tox', label: 'Fixture graft effect', page: { tree: TX_FX_TREE, node: TX_FX_NODE }, complaints: ['fx-tx-complaint'], ask: [{ v: 'Fixture graft question?', cite: ['fx-tx-gl'] }], lethality: 2 },
];
export const TX_FX_REGIMENS: TxRegimen[] = [
  { id: 'fxtx-reg', acronym: 'FXTX-R', expansion: 'Fixture transplant regimen', drugs: ['fx-tx-drugumab', 'rituximab'], organs: ['fx-kidney'], cite: ['fx-tx-gl'] },
];
export const TX_FX_GROUPS: Record<string, TxGroup> = {
  'fixture.ts': {
    SOURCES: {
      'fx-tx-pi': { key: 'fx-tx-pi', kind: 'fda-pi', text: 'Fixtransplantda (fx-tx-drugumab) prescribing information. Fixture Pharma, fake label.', revised: '1/2000' },
      'fx-tx-gl': { key: 'fx-tx-gl', kind: 'guideline', text: 'Fixture Transplant Society guideline for fixture graft effects, fake.' },
    },
    CLASSES: [{
      id: 'fx-tx-class', name: 'Fixture transplant class', mechanism: { v: 'Fixture transplant mechanism text.', cite: ['fx-tx-pi'] },
      effects: [{ tox: 'fx-tx-tox', timing: { v: 'Fixture graft timing', cite: ['fx-tx-pi'] } }],
    }],
    DRUGS: [
      { id: 'fx-tx-drugumab', generic: 'fxtxdrugumab', brands: ['Fixtransplantda'], editorAliases: ['FXT'], classIds: ['fx-tx-class'], cancers: ['fx-kidney', 'fx-liver'], label: 'fx-tx-pi', tier: 'full' },
      { id: 'fx-tx-otherumab', generic: 'fxtxotherumab', brands: ['Fixtransotherda'], classIds: ['fx-tx-class'], cancers: ['fx-liver'], label: 'fx-tx-pi', tier: 'full' },
    ],
    MEMBERS: [
      { drug: 'rituximab', classIds: ['fx-tx-class'], organs: ['fx-kidney', 'fx-liver'], editorAliases: ['FXRIT'] },
      { drug: 'alemtuzumab', classIds: ['fx-tx-class'], organs: ['fx-kidney'] },
    ],
  },
};
export const TX_FX_STUB_TREE = { nodes: [{ id: TX_FX_NODE, summary: 'Fixture graft management summary.', citation: [1] }], cites: new Set([1]) };
