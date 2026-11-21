import type { DrugClass } from '../onc-drugs/types.js';

// Class effects only where EVERY member label (Prograf, Astagraf XL, Envarsus XR, Neoral, Gengraf, Sandimmune) supports them.
const ALL = ['pi-prograf', 'pi-astagraf', 'pi-envarsus', 'pi-neoral', 'pi-gengraf', 'pi-sandimmune'];

export const TX_CLASSES: DrugClass[] = [
  {
    id: 'tx-cni', name: 'Calcineurin inhibitors',
    mechanism: { v: 'Immunosuppressant used for prophylaxis of organ rejection in transplant recipients.', cite: ALL },
    effects: [
      { tox: 'tx-serious-infection', rank: 1, boxed: true, cite: ALL },
      { tox: 'tx-malignancy', rank: 2, boxed: true, cite: ALL },
      { tox: 'tx-neurotoxicity', cite: ALL },
      { tox: 'tx-cni-nephrotoxicity', cite: ALL },
      { tox: 'tx-tma', cite: ALL },
      { tox: 'tx-hyperkalemia', cite: ALL },
      { tox: 'tx-hypertension', cite: ALL },
    ],
  },
];
