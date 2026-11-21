// myMedKitt — Transplant Drugs Side-effects: typed model. Cards are OncDrug objects on the shared drug-card engine (src/data/onc-drugs).

import type { DrugClass, OncDrug, OncSource, Regimen } from '../onc-drugs/types.js';

/** Transplanted organ: plays the role the cancer plays in oncology (the indication a card is listed under). */
export interface Organ { id: string; name: string; aliases?: string[] }

export interface TxRegimen extends Omit<Regimen, 'cancers'> { organs: string[] }

/**
 * SHARED cards only (cards declared in an oncology group file): how a transplant consult lists one.
 * Transplant-only cards carry their own classIds (transplant classes) and cancers (= organ ids) in DRUGS.
 */
export interface TxMembership {
  drug: string;
  /** transplant class ids the card is LISTED under here; never drives effects or mechanism */
  classIds: string[];
  organs: string[];
  editorAliases?: string[];
  pin?: boolean;
  unpinnedNames?: string[];
}

/** What one file under src/data/transplant-drugs/drugs/ may export (all optional). */
export interface TxGroup {
  DRUGS?: OncDrug[];
  CLASSES?: DrugClass[];
  SOURCES?: Record<string, OncSource>;
  MEMBERS?: TxMembership[];
  REGIMENS?: TxRegimen[];
}
