// myMedKitt — drug-card consult engine: per-consult configuration and the virtual-id scheme. Pure, no data.
// Oncology (src/data/onc-drugs) and transplant (src/data/transplant-drugs) run on one engine; each supplies a DrugConsultConfig.

import type { CancerType } from './cancer-types.js';

export type VirtualKind = 'drug' | 'reg' | 'class' | 'cancer' | 'ctype' | 'cx' | 'organ';

export interface DrugConsultConfig {
  /** answer-index key and pin namespace */
  key: 'onc' | 'tdse';
  treeId: string; title: string; categoryId: string;
  /** 'odse-' | 'tdse-' */
  prefix: string;
  kinds: readonly VirtualKind[];
  indicationKind: 'cancer' | 'organ';
  indicationTab: string; indicationHeading: string;
  /** oncology only; drives 'ctype' */
  indicationTypes?: { types: CancerType[]; other: CancerType };
  filterPlaceholder: string; complaintNote: string;
  /** class id -> section name (transplant). Oncology keeps its own id-prefix section logic. */
  classSections?: Record<string, string>;
  classSectionOrder: string[];
  startNode: string;
  /** optional one-line note shown once under the identity block of every card in this consult */
  cardNote?: string;
  /** timing badges also accept a first clause with a stated time unit (minutes ... years); off for oncology */
  timingTimeUnits?: boolean;
  /** category ids that keep a row on a card; every other effect is shown as a plain line at the top of "Also on the label" (no category link). Absent = all rows (oncology). */
  rowCategories?: readonly string[];
  /** per-drug editor notes shown under the card note (drug id -> note text); transplant only */
  drugNotes?: Record<string, string[]>;
  /** Shortest normalised editor alias that pins: 4 (a digit alias may be 3) or 3 (any editor alias, exact match only). */
  editorAliasPinFloor: 3 | 4;
}

export function virtualIds(cfg: Pick<DrugConsultConfig, 'prefix' | 'kinds'>): {
  virtualNodeId(kind: VirtualKind, slug: string): string;
  isVirtualNodeId(nodeId: string): boolean;
  parseVirtualNodeId(nodeId: string): { kind: VirtualKind; slug: string } | null;
} {
  return {
    virtualNodeId: (kind, slug) => `${cfg.prefix}${kind}-${slug}`,
    isVirtualNodeId: (nodeId) => cfg.kinds.some((k) => nodeId.startsWith(`${cfg.prefix}${k}-`)),
    parseVirtualNodeId: (nodeId) => {
      for (const k of cfg.kinds) {
        const p = `${cfg.prefix}${k}-`;
        if (nodeId.startsWith(p) && nodeId.length > p.length) return { kind: k, slug: nodeId.slice(p.length) };
      }
      return null;
    },
  };
}
