// DRAFT — Ranson Criteria calculator (not wired). Integrator registers RANSON_CALCULATOR as id 'ranson' in calculator.ts.
// Pure scoring lives in scoreRanson() below so it can be tested without the DOM.
// Cutoffs and bands: research/new-content/acute-pancreatitis/patch.md (conflicts C1-C10 and open questions listed there).
// Documented exception: the two switches (gallstone, h48Entered) are toggles with points 0. They select a mode and add no score.
// Integrator: confirm calculator.ts treats a points-0 toggle as a switch (it adds nothing when ON). Pending patch C9.

export interface RansonAdmission {
  age: boolean;
  wbc: boolean;
  glucose: boolean;
  ldh: boolean;
  ast: boolean;
}

export interface Ranson48h {
  hematocritFall: boolean;
  bunRise: boolean;
  calcium: boolean;
  pao2: boolean;
  baseDeficit: boolean;
  fluidSequestration: boolean;
}

export interface RansonInput {
  /** true = gallstone cutoffs; false = non-gallstone cutoffs */
  gallstone: boolean;
  admission: RansonAdmission;
  /** The final score exists only once the 48-hour items have been entered. */
  h48Entered: boolean;
  h48: Ranson48h;
}

export type RansonBand = 'incomplete' | 'low' | 'moderate' | 'high' | 'very-high';

export interface RansonResult {
  admissionScore: number;
  h48Max: number;
  h48Score: number | null;
  total: number | null;
  maxTotal: number;
  band: RansonBand;
}

/**
 * Band cutoffs 0-2 / 3-4 / 5-6 / 7 or more follow a reference summary of Ranson 1974
 * (primary table not retrieved; patch C1). The top band is 7 or more (maximum 11 or 10).
 */
export function ransonBand(total: number): RansonBand {
  if (total <= 2) return 'low';
  if (total <= 4) return 'moderate';
  if (total <= 6) return 'high';
  return 'very-high';
}

export function scoreRanson(input: RansonInput): RansonResult {
  const a = input.admission;
  const admissionScore = [a.age, a.wbc, a.glucose, a.ldh, a.ast].filter(Boolean).length;
  // Gallstone set: 5 admission + 5 at 48 h (no PaO2 item). Non-gallstone set: 5 + 6.
  const h48Max = input.gallstone ? 5 : 6;
  const maxTotal = 5 + h48Max;
  if (!input.h48Entered) {
    return { admissionScore, h48Max, h48Score: null, total: null, maxTotal, band: 'incomplete' };
  }
  const h = input.h48;
  const h48Score = [
    h.hematocritFall,
    h.bunRise,
    h.calcium,
    input.gallstone ? false : h.pao2,
    h.baseDeficit,
    h.fluidSequestration,
  ].filter(Boolean).length;
  const total = admissionScore + h48Score;
  return { admissionScore, h48Max, h48Score, total, maxTotal, band: ransonBand(total) };
}

function toInput(values: Record<string, number>): RansonInput {
  const on = (k: string): boolean => values[k] === 1;
  return {
    gallstone: on('gallstone'),
    h48Entered: on('h48Entered'),
    admission: { age: on('age'), wbc: on('wbc'), glucose: on('glucose'), ldh: on('ldh'), ast: on('ast') },
    h48: {
      hematocritFall: on('hematocritFall'),
      bunRise: on('bunRise'),
      calcium: on('calcium'),
      pao2: on('pao2'),
      baseDeficit: on('baseDeficit'),
      fluidSequestration: on('fluidSequestration'),
    },
  };
}

interface RansonCalcField {
  name: string;
  label: string;
  type: 'toggle' | 'number' | 'select';
  points: number;
  description?: string;
}

interface RansonCalcResultRange {
  min: number;
  max: number;
  label: string;
  risk: string;
  mortality: string;
  colorVar: string;
}

interface RansonCalcOutput {
  value: string;
  label: string;
  description: string;
  colorVar: string;
}

/** Mirrors the CalculatorDefinition shape in calculator.ts (that type is not exported). */
export interface RansonCalculatorDef {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fields: RansonCalcField[];
  results: RansonCalcResultRange[];
  thresholdNote: string;
  citations: string[];
  computeResult: (values: Record<string, number>) => RansonCalcOutput;
}

const BAND_TEXT: Record<Exclude<RansonBand, 'incomplete'>, { label: string; colorVar: string; text: string }> = {
  low: {
    label: '0-2',
    colorVar: '--color-primary',
    text: 'Lowest band. Atlanta organ-failure status still governs.',
  },
  moderate: {
    label: '3-4',
    colorVar: '--color-warning',
    text: 'Commonly taught as severe (unsourced; threshold pending clinician sign-off, patch C6). Classify by Atlanta organ-failure status.',
  },
  high: {
    label: '5-6',
    colorVar: '--color-danger',
    text: 'Band only. Classify by Atlanta organ-failure status. Escalation threshold pending clinician sign-off (patch C6).',
  },
  'very-high': {
    label: '7 or more',
    colorVar: '--color-danger',
    text: 'Top band. Classify by Atlanta organ-failure status. Escalation threshold pending clinician sign-off (patch C6).',
  },
};

const ADMISSION_FIELDS: RansonCalcField[] = [
  { name: 'age', label: 'Age over cutoff', description: 'Non-gallstone >55 y; gallstone >70 y', points: 1, type: 'toggle' },
  { name: 'wbc', label: 'WBC over cutoff', description: 'Non-gallstone >16,000/mm3; gallstone >18,000/mm3', points: 1, type: 'toggle' },
  { name: 'glucose', label: 'Glucose over cutoff', description: 'Non-gallstone >200 mg/dL; gallstone >220 mg/dL', points: 1, type: 'toggle' },
  { name: 'ldh', label: 'LDH over cutoff', description: 'Non-gallstone >350 IU/L; gallstone >400 IU/L', points: 1, type: 'toggle' },
  { name: 'ast', label: 'AST over cutoff', description: 'Non-gallstone >250 (1976 abstract gives Sigma-Frankel units per 100 mL; IU/L not converted, patch C2). Gallstone cutoff and units unresolved (patch C2): provisional.', points: 1, type: 'toggle' },
];

const H48_FIELDS: RansonCalcField[] = [
  { name: 'hematocritFall', label: 'Hematocrit fall >10% (48 h)', points: 1, type: 'toggle' },
  { name: 'bunRise', label: 'BUN rise after IV fluid (48 h)', description: 'Non-gallstone >5 mg/dL (1976 abstract). Gallstone >2 mg/dL: unconfirmed (patch C8).', points: 1, type: 'toggle' },
  { name: 'calcium', label: 'Serum calcium <8 mg/dL (48 h)', points: 1, type: 'toggle' },
  { name: 'pao2', label: 'PaO2 <60 mmHg (48 h, non-gallstone only)', points: 1, type: 'toggle' },
  { name: 'baseDeficit', label: 'Base deficit >4 mEq/L (48 h)', description: 'Non-gallstone >4 mEq/L. Gallstone: one reference >4, other teaching >5 (patch C3, unresolved). Provisional in gallstone mode.', points: 1, type: 'toggle' },
  { name: 'fluidSequestration', label: 'Sequestered fluid >6 L non-gallstone / >4 L gallstone (48 h)', points: 1, type: 'toggle' },
];

const GALLSTONE_PROVISIONAL_NOTE =
  '**GALLSTONE SET IS PROVISIONAL:** AST cutoff and units (C2), base deficit cutoff (C3) and BUN operator (C8) are unresolved. Confirm before quoting the total.';

export const RANSON_CALCULATOR: RansonCalculatorDef = {
  id: 'ranson',
  title: 'Ranson Criteria',
  subtitle: 'Acute pancreatitis: admission and 48-hour score',
  description: 'Score the five admission items on arrival. Score the 48-hour items at 48 hours. Turn on the gallstone switch for gallstone cutoffs (provisional). The final score needs both sets.',
  fields: [
    { name: 'gallstone', label: 'Gallstone etiology (gallstone cutoffs)', points: 0, type: 'toggle', description: 'Switch, adds no points. Off = non-gallstone cutoffs. On = gallstone set, provisional (patch C2, C3, C8).' },
    ...ADMISSION_FIELDS,
    { name: 'h48Entered', label: '48-hour labs entered', description: 'Switch, adds no points. Final score only when ON. Leave OFF on arrival.', points: 0, type: 'toggle' },
    ...H48_FIELDS,
  ],
  results: [],
  thresholdNote:
    '**THE SCORE IS INCOMPLETE BEFORE 48 HOURS.**\n\n**BANDS (cutoffs from a reference summary of Ranson 1974; primary table not retrieved, patch C1):**\n• **0-2:** lowest band\n• **3-4:** commonly taught as severe (unsourced, patch C6)\n• **5-6:** band only\n• **7 or more:** top band (maximum 11 non-gallstone, 10 gallstone)\n\n**CAVEAT:** Ranson predicts risk. It does not direct therapy. Use with BISAP and Atlanta organ-failure status.',
  citations: [
    'Ranson JH, Rifkind KM, Roses DF, Fink SD, Eng K, Spencer FC. Prognostic signs and the role of operative management in acute pancreatitis. Surg Gynecol Obstet. 1974;139(1):69-81 (PMID 4834279).',
    'Ranson JH, Rifkind KM, Turner JW. Prognostic signs and nonoperative peritoneal lavage in acute pancreatitis. Surg Gynecol Obstet. 1976;143(2):209-219 (PMID 941075).',
    'Ranson JH. Etiological and prognostic factors in human acute pancreatitis: a review. Am J Gastroenterol. 1982;77(9):633-638 (PMID 7051819).',
  ],
  computeResult(values: Record<string, number>): RansonCalcOutput {
    const r = scoreRanson(toInput(values));
    const admissionText = `${r.admissionScore} of 5`;
    const provisional = values.gallstone === 1 ? `\n\n${GALLSTONE_PROVISIONAL_NOTE}` : '';
    if (r.band === 'incomplete') {
      return {
        value: `${r.admissionScore} / 5 admission`,
        label: 'INCOMPLETE',
        description: `**ADMISSION ITEMS:** ${admissionText} met\n\n**48-HOUR ITEMS:** not entered\n\n**STATUS:** the final score needs 48-hour data. Do not quote an admission-only total as the Ranson score.`,
        colorVar: '--color-text-muted',
      };
    }
    const band = BAND_TEXT[r.band];
    return {
      value: `${r.total} / ${r.maxTotal}`,
      label: band.label,
      description: `**ADMISSION:** ${admissionText}\n\n**48 HOURS:** ${r.h48Score} of ${r.h48Max}\n\n**TOTAL:** ${r.total} of ${r.maxTotal}\n\n**BAND:** ${band.text}${provisional}`,
      colorVar: band.colorVar,
    };
  },
};
