// myMedKitt — RAPID strip contract (v3, "quote, don't paraphrase"). Copied by the fleet to ~50 consults: change with care.
// Bumping RAPID_FORMAT_VERSION un-approves every strip (it is part of the hash input).
//
// Agents author only a tile's FACE (action, figure, condition). Everything inside an expansion is verbatim:
// exact excerpts of consult node lines and, for drug tiles, the drug store's own regimen text.
export const RAPID_FORMAT_VERSION = 3;

export type RapidLayout = 'drug' | 'steps';

/** A verbatim excerpt of ONE line of a node of this consult. The verifier checks it as an exact substring
 *  (after the same normalisation on both sides), clause-complete, keeping every negation of its line. */
export interface RapidExcerpt {
  nodeId: string;
  text: string;
}

interface RapidTileBase {
  /** kebab-case, unique across the whole strip (all variants). Used for DOM ids. */
  id: string;
  /** Authored: the action, 1-3 words and <= 24 chars ("Cardiovert", "IM epinephrine"). */
  action: string;
  /** Authored: the tile's ONE critical cue, <= 28 chars, with its unit ("0.5 mg", "200 J", "<48 h"). */
  figure: string;
  /** Authored: <= 40 chars. When the action applies, or when it must NOT be used. */
  condition?: string;
  /** Source node ids in THIS consult. [0] is primary: "Open in consult" jumps there. Excerpts may only cite these. */
  nodeIds: readonly [string, ...string[]];
  /** Verbatim: the danger box at the top of the expansion. */
  warning?: RapidExcerpt;
}

/** SNAPSHOT of a live weightCalc entry. The gate and the runtime require the tile's list to deep-equal the dose's
 *  FULL weightCalc list, so a changed cap or dose in the store fails closed. */
export interface WeightCalcSnapshot {
  dosePerKg: number;
  unit: string;
  maxDose?: number;
  dailyDivided?: number;
  label?: string;
  concentration?: { amount: number; perMl: number; displayName: string };
}

export interface RapidDrugTile extends RapidTileBase {
  layout: 'drug';
  drug: {
    /** DrugEntry.id in drug-store.ts */
    id: string;
    /** EXACT DrugDose.indication string. */
    indication: string;
    /** Snapshot of ALL weightCalcs on that dose, in order. Absent iff the dose has none. */
    weightCalcs?: readonly WeightCalcSnapshot[];
  };
  /** Optional consult context, 0-4 verbatim excerpts, shown under "In this consult". */
  lines?: readonly RapidExcerpt[];
}

export interface RapidStepsTile extends RapidTileBase {
  layout: 'steps';
  /** 1-8 verbatim excerpts, in the consult's order. */
  lines: readonly RapidExcerpt[];
  /** An existing image on a source node, rendered exactly as the node has it (src, alt, caption). */
  image?: { nodeId: string; index: number };
}

export type RapidTile = RapidDrugTile | RapidStepsTile;

export interface RapidVariant {
  /** kebab-case, unique in the strip */
  id: string;
  /** Plate-key text, 1-2 words, as the fork node words it ("Unstable"). Must equal a fork option label. */
  label: string;
  /** 1..7 tiles, in action order. Hard cap 7 (gate-enforced). */
  tiles: readonly RapidTile[];
}

export interface RapidStrip {
  /** Must equal a TREE_REGISTRY key and src/data/trees/<treeId>.ts */
  treeId: string;
  /** Required iff variants.length > 1: the node where the consult itself forks. The FIRST variant is the default shown. */
  forkNodeId?: string;
  variants: readonly [RapidVariant, ...RapidVariant[]];
}

export interface RapidApproval {
  /** sha256 hex of `rapid-v${RAPID_FORMAT_VERSION}\n` + canonicalJson(strip) */
  stripHash: string;
  /** Sorted flag ids the owner acknowledged. Must EQUAL the strip's flag set at approval time;
   *  a new flag from source drift fails closed to the Critical button. */
  ackedFlags: string[];
  /** YYYY-MM-DD */
  approvedOn: string;
  /** tileId -> sha256 of the live DrugDose.regimen at approval time (drug tiles only). A changed regimen is not live. */
  regimenPins: Record<string, string>;
}

export interface RapidFinding {
  kind: 'conflict' | 'gap' | 'missing-weightcalc' | 'node-silent' | 'other';
  /** tile or variant this concerns, if any */
  tileId?: string;
  nodeIds: string[];
  drugId?: string;
  /** Plain words for the owner. Never a proposed number. */
  text: string;
}
