// myMedKitt — Oncology Drugs Side-effects: typed source model.
// Clinical data lives in the sibling files; this file is shape only.

export type SourceKey = string;                       // key into ONC_SOURCES
export interface OncSource { key: SourceKey; kind: 'fda-pi' | 'fda-db' | 'guideline' | 'trial'; text: string; url?: string; revised?: string }
export interface Cited { v: string; cite: SourceKey[] }  // any clinical claim; digits => cite.length >= 1
export interface ToxPage { tree: string; node: string }   // node must carry summary + citation
export interface Toxicity {
  id: string; label: string; page: ToxPage;
  more?: { info: string; anchor?: string; label: string }[];
  complaints: string[];                                // Complaint ids
  ask: Cited[];                                        // screening questions for this effect
  lethality: 1 | 2 | 3;                                // 1 = most lethal, shown first
  /** transplant consult only: no management page exists, so the category has no row and its effects render as plain lines (page is an unused sentinel). Never set in oncology. */
  plainOnly?: true;
}
/** rank is an optional promotion: ranked effects sort before unranked ones (lowest first); otherwise lethality ascending */
export interface ClassEffect {
  tox: string;
  /** onset / dose-relative timing, when the source states one. Omit it when the label gives none: the card then shows no badge. */
  timing?: Cited;
  /** sources that document the effect itself, for an effect with no timing (or in addition to it). Every effect needs a citation from timing, note or this. */
  cite?: SourceKey[];
  rank?: number;
  note?: Cited;
  /** 'postmarketing': the label lists the effect only from post-approval reports; shown in a collapsed second group, not the main ranked list */
  basis?: 'postmarketing';
  /** true: this effect row corresponds to a hazard in the drug's FDA boxed warning. Only `true` is allowed, and only on a drug that has a boxedWarning. */
  boxed?: true;
}
export interface DrugClass { id: string; name: string; mechanism: Cited; effects: ClassEffect[] }
export interface DrugEffectOverride { tox: string; timing?: Cited; cite?: SourceKey[]; basis?: 'postmarketing'; boxed?: true; rank?: number; quirk?: Cited; ask?: Cited[]; drop?: true }
export interface OncDrug {
  id: string; generic: string;
  brands: string[];                                    // currently marketed brand names (and label-printed ones): shown beside the generic
  /** brands FDA's Drugs@FDA record lists as discontinued: searchable and pinnable like current brands, shown on a small secondary line */
  formerBrands?: string[];
  /** brands of the same drug that FDA lists for non-oncologic products (e.g. arthritis or psoriasis autoinjectors): searchable and pinnable, but not on the prominent line */
  searchOnlyBrands?: string[];
  /** plain one-line note shown under the identity block when a card is built from an old label (no citation) */
  labelAge?: string;
  /** source of the brand lists (the Drugs@FDA snapshot); registered in the card's references, nothing else is shown */
  brandSource?: SourceKey;
  /** names (any of generic, brands, former brands, aliases, derived names) that must NOT pin to rank 1, e.g. because they collide with another page; still searchable */
  unpinnedNames?: string[];
  aliases?: string[];
  /** common clinical abbreviations supplied by the editor (5-FU, MTX, ATRA...), not from the FDA label: searchable and pinnable like aliases, shown on the card */
  editorAliases?: string[];
  /** names pinned to rank 1 even though the drug is pin:false (each must be a searchable name; the collision gate applies) */
  pinAlso?: string[];
  classIds: string[]; mechanism?: Cited; cancers: string[];
  /** Set only by a consult projection (src/data/transplant-drugs): the classes this card is LISTED under in that consult. Absent = classIds. Never drives effects or mechanism. */
  browseClassIds?: string[];
  label: SourceKey;                                    // FDA PI anchor, required
  tier: 'full' | 'short';
  effects?: DrugEffectOverride[];                      // merged over class effects by tox id
  boxedWarning?: Cited | Cited[];                      // one Cited per boxed item; use an array when the label lists several
  /** label warnings and interactions with no management page: short statements, EVERY item cited (digits or not). Shown as "Also on the label". */
  alsoOnLabel?: Cited[];
  /** drug-drug interaction lines (same line format as alsoOnLabel, every item cited): shown as their own collapsed section "Drug interactions (N)" above "Also on the label", in array order. Absent = nothing renders. */
  interactions?: Cited[];
  pharmacyDrugId?: string;                             // existing drug-store id
  pin?: boolean;                                       // default true
}
export interface Regimen {
  id: string; acronym: string; aliases?: string[]; expansion: string;
  drugs: string[];                                     // every component's drug id, in order
  /** components that have no card yet: ONLY these ids may be missing from the drug list. Shown as plain text, not a link. Remove the entry when the card lands. */
  uncarded?: { id: string; name: string }[];
  cancers: string[]; cite: SourceKey[]; pin?: boolean;
  /** optional sourced note shown under the component list */
  note?: Cited;
}
export interface Cancer { id: string; name: string; aliases?: string[]; /** browse grouping: an id from cancer-types.ts; leave unset when the right type is a judgement */ type?: string }
export interface Complaint { id: string; label: string; order: number }

/**
 * What one file under src/data/onc-drugs/drugs/ may export (all optional). Several authors can each own one file:
 * ids and source keys must be unique across files (the gate names both files); an identical cancer id + name in two files is merged silently.
 */
export interface OncGroup {
  DRUGS?: OncDrug[];
  CLASSES?: DrugClass[];
  SOURCES?: Record<SourceKey, OncSource>;
  CANCERS?: Cancer[];
  REGIMENS?: Regimen[];
}

/** Everything a card, page or gate reads. The shipped set is ONC_DATA (index.ts); tests pass their own. */
export interface OncData {
  sources: Record<SourceKey, OncSource>;
  cancers: Cancer[];
  complaints: Complaint[];
  toxicities: Toxicity[];
  classes: DrugClass[];
  /** Classes used for browse listings only (a consult projection sets it); absent = classes. */
  browseClasses?: DrugClass[];
  regimens: Regimen[];
  drugs: OncDrug[];
}
