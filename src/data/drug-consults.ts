// myMedKitt — registry of the drug-card consults, keyed by tree id. Imports both data sets: load it lazily (the consult component does).
import type { OncData } from './onc-drugs/types.js';
import type { DrugConsultConfig } from './onc-drugs/consult.js';
import { ONC_CONSULT, ONC_DATA } from './onc-drugs/index.js';
import { TX_CONSULT, TX_DATA } from './transplant-drugs/index.js';

export interface DrugConsultEntry { cfg: DrugConsultConfig; data: OncData }

export const DRUG_CONSULTS: Record<string, DrugConsultEntry> = {
  [ONC_CONSULT.treeId]: { cfg: ONC_CONSULT, data: ONC_DATA },
  [TX_CONSULT.treeId]: { cfg: TX_CONSULT, data: TX_DATA },
};
