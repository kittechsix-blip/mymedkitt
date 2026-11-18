// myMedKitt — RAPID registry. A consult is "RAPID" iff it has an entry here.
// Strip files import types only, so they also load in Node (gate, proof page).
import type { RapidStrip } from './types.js';
import { RAPID_AFIB_RVR } from './afib-rvr.js';
import { RAPID_REFRACTORY_VFVT } from './refractory-vfvt.js';
import { RAPID_ANAPHYLAXIS } from './anaphylaxis.js';

export const RAPID_STRIPS: Readonly<Record<string, RapidStrip>> = {
  [RAPID_AFIB_RVR.treeId]: RAPID_AFIB_RVR,
  [RAPID_REFRACTORY_VFVT.treeId]: RAPID_REFRACTORY_VFVT,
  [RAPID_ANAPHYLAXIS.treeId]: RAPID_ANAPHYLAXIS,
};
