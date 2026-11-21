import { ONC_CONSULT, ONC_DATA } from './onc-drugs/index.js';
import { TX_CONSULT, TX_DATA } from './transplant-drugs/index.js';
export const DRUG_CONSULTS = {
    [ONC_CONSULT.treeId]: { cfg: ONC_CONSULT, data: ONC_DATA },
    [TX_CONSULT.treeId]: { cfg: TX_CONSULT, data: TX_DATA },
};
