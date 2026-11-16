// MedKitt: Pedi Resus Numbers engine (added 2026-11-16).
// ONE pure module (no DOM, no imports) behind the Color Zone Tape, the focused pedi-* calculators,
// the drug-dose weight estimate and the Home search answer card, so the numbers never disagree.
// Node tests (scripts/pedi-resus.test.mjs) import this file directly, so it must stay import-free.
// Zone/equipment values: Randall Children's card 2020 and Children's Minnesota card 06/2025.
// Drug values: outline defaults approved by Andy (docs/reviews/pedi-resus-numbers-outline.md section 5).

// ===================================================================
// Citations (shared numbering for every row, calculator and the consult)
// ===================================================================

export const PEDI_CITATIONS: string[] = [
  'Randall Children\'s Hospital. Pediatric Emergency Quick Reference (Randall card). Oregon EMS for Children; Oct 2020. https://www.oregon.gov/oha/PH/PROVIDERPARTNERRESOURCES/EMS/EMSFORCHILDREN/Documents/Emergency-Quick-Reference-Randall.PDF',
  'Children\'s Minnesota. Pediatric Emergency Reference Card M0055; 06/2025. https://cmn.education.childrensmn.org/sites/default/files/media/2025-06/M0055_CRT_EDT_Ped%20Emergency%20reference%20card.pdf',
  'Topjian AA, Raymond TT, Atkins D, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation. 2020;142(16 suppl 2):S469-S523.',
  'American Heart Association. Part 8: Pediatric Advanced Life Support. 2025 AHA/AAP Guidelines for CPR and Emergency Cardiovascular Care. DOI 10.1161/CIR.0000000000001368. (Primary text not reviewed; checked through secondary summaries.)',
  'European Resuscitation Council and Resuscitation Council UK. Paediatric Life Support Guidelines 2025. Resuscitation. 2025.',
  'ECRI and ISMP. Joint hazard alert: action needed to address incorrect information on the Broselow Rainbow Tape; rev. Jan 22, 2026. https://home.ecri.org/blogs/ismp-alerts-and-articles-library/joint-hazard-alert-action-needed-to-address-incorrect-information-on-the-broselow-rainbow-tape',
  'Duracher C, Schmautz E, Martinon C, et al. Evaluation of cuffed tracheal tube size predicted using the Khine formula in children. Paediatr Anaesth. 2008;18(2):113-118. PMID 18184241.',
  'Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics. 1957;19(5):823-832. PMID 13431307.',
  'Luscombe M, Owens B. Weight estimation in resuscitation: is the current formula still valid? Arch Dis Child. 2007;92(5):412-415. PMID 17213259.',
  'Advanced Life Support Group. Advanced Paediatric Life Support: The Practical Approach. 5th ed. Wiley-Blackwell; 2011.',
];

export const PEDI_FOOTER = 'Broselow is a trademark of its owner; myMedKitt is not affiliated. Reference for licensed clinicians: verify against your protocol and the printed card. Confirm concentrations against your stock.';
export const ZONE_RANGE_NOTE = 'Zone ranges are estimates; the child\'s actual weight can differ.';
export const PEDI_STOCK = 'common US stock; confirm your vial';

// ===================================================================
// Input parsing
// ===================================================================

export interface ParsedInput { ageMonths?: number; weightKg?: number; lengthCm?: number; gaWeeks?: number; newborn?: boolean }
export type PediUnit = 'mo' | 'yr' | 'kg' | 'cm' | 'lb';

const TOKEN = /(?<![\w./])(\d+(?:[.,]\d+)?)\s*(years?\s*old|years?|yrs?|y\/o|yo|y|months?\s*old|months?|mos?|m\/o|mths?|m|kgs?|kilograms?|kilos?|lbs?|pounds?|cm)(?![a-z/])/gi;

function unitOf(raw: string): PediUnit {
  const u = raw.toLowerCase().replace(/\s+/g, '');
  if (u === 'cm') return 'cm';
  if (u.startsWith('kg') || u.startsWith('kilo')) return 'kg';
  if (u.startsWith('lb') || u.startsWith('pound')) return 'lb';
  if (u === 'm' || u === 'm/o' || u.startsWith('mo') || u.startsWith('mth')) return 'mo';
  return 'yr';
}

function apply(out: ParsedInput, value: number, unit: PediUnit): void {
  if (!Number.isFinite(value) || value <= 0) return;
  if (unit === 'mo') { if (value <= 1200) out.ageMonths = value; }
  else if (unit === 'yr') { if (value <= 100) out.ageMonths = value * 12; }
  else if (unit === 'kg') out.weightKg = value;
  else if (unit === 'lb') out.weightKg = value * 0.45359237;
  else out.lengthCm = value;
}

/** '2y', '2 yo', '2 years', '18mo', '6 m/o', '14kg', '92cm', or {value, unit}. Unparseable input gives {}. */
export function parseInput(input: string | { value: number | string; unit: PediUnit }): ParsedInput {
  const out: ParsedInput = {};
  if (input && typeof input === 'object') {
    apply(out, Number(String(input.value).replace(',', '.')), input.unit);
    return out;
  }
  const s = String(input ?? '');
  for (const m of s.matchAll(TOKEN)) apply(out, Number(m[1].replace(',', '.')), unitOf(m[2]));
  parseNeonatal(s, out);
  return out;
}

// Neonate extras (2026-11-16): grams, gestational age ('32wk'), 'newborn', and ages in days or weeks.
const NEO_WORD = /\b(?:newborn|neonate|neonates|neonatal)\b/i;
const GRAM_TOKEN = /(?<![\w./])(\d{3,4}(?:[.,]\d+)?)\s*(?:g|gm|gms|grams?)(?![a-z/])/i;
const WEEK_TOKEN = /(?<![\w./])(\d{1,2})(?:\s*\+\s*[0-6](?:\/7)?)?\s*(?:weeks?|wks?|w)(?![a-z])(\s*old)?/i;
const DAY_TOKEN = /(?<![\w./])(\d{1,3})\s*(?:days?|d)(?![a-z/])(?:\s*old)?/i;

function parseNeonatal(s: string, out: ParsedInput): void {
  if (NEO_WORD.test(s)) out.newborn = true;
  if (out.weightKg === undefined) {
    const g = GRAM_TOKEN.exec(s);
    if (g) { const v = Number(g[1].replace(',', '.')); if (v >= 200 && v <= 6000) out.weightKg = v / 1000; }
  }
  const w = WEEK_TOKEN.exec(s);
  if (w) {
    const v = Number(w[1]);
    if (v >= 22 && v <= 44 && !w[2]) out.gaWeeks = v;
    else if (v >= 1 && v <= 21 && out.ageMonths === undefined) out.ageMonths = v / 4.345;
    else if (v >= 22 && w[2] && out.ageMonths === undefined) out.ageMonths = v / 4.345;
  }
  if (out.ageMonths === undefined) {
    const d = DAY_TOKEN.exec(s);
    if (d) { const v = Number(d[1]); if (v >= 1 && v <= 365) out.ageMonths = v / 30.4375; }
  }
}

// ===================================================================
// Weight from age (APLS 2011)
// ===================================================================

export interface WeightEstimate {
  kg: number;
  method: string;
  formula: string;
  /** age over 12 yr: formula is a placeholder, use the measured weight */
  useActualWeight: boolean;
  capped: boolean;
}

export const APLS_METHOD = 'APLS 2011';
const APLS_CAP_KG = 50;

export function estimateWeightFromAge(ageMonths: number): WeightEstimate {
  const yr = ageMonths / 12;
  if (ageMonths < 12) return { kg: 0.5 * ageMonths + 4, method: APLS_METHOD, formula: '0.5 x months + 4', useActualWeight: false, capped: false };
  if (yr < 6) return { kg: 2 * yr + 8, method: APLS_METHOD, formula: '2 x years + 8', useActualWeight: false, capped: false };
  const raw = 3 * yr + 7;
  if (yr < 13) return { kg: raw, method: APLS_METHOD, formula: '3 x years + 7', useActualWeight: false, capped: false };
  return { kg: Math.min(raw, APLS_CAP_KG), method: APLS_METHOD, formula: '3 x years + 7 (capped at 50 kg)', useActualWeight: true, capped: raw > APLS_CAP_KG };
}

// ===================================================================
// Zones and equipment
// ===================================================================

export interface PediEquipment {
  ettCuffed: string; ettUncuffed: string; depthCm: string; blade: string; lma: string;
  ngFr: string; foleyFr: string; chestTubeFr: string; ivG: string;
}

export interface PediZone extends PediEquipment {
  color: string;
  bgHex: string;
  textHex: string;
  weightMin: number;
  weightMax: number;
  midpoint: number;
  lengthMin: number;
  lengthMax: number;
  ageApprox: string;
  /** representative age used only to pick the vitals band when only a weight or length is known */
  ageMonthsRep: number;
}

const Z = (
  color: string, bgHex: string, textHex: string, weightMin: number, weightMax: number, midpoint: number, lengthMin: number, lengthMax: number,
  ageApprox: string, ageMonthsRep: number,
  ettCuffed: string, ettUncuffed: string, depthCm: string, blade: string, lma: string, ngFr: string, foleyFr: string, chestTubeFr: string, ivG: string,
): PediZone => ({ color, bgHex, textHex, weightMin, weightMax, midpoint, lengthMin, lengthMax, ageApprox, ageMonthsRep, ettCuffed, ettUncuffed, depthCm, blade, lma, ngFr, foleyFr, chestTubeFr, ivG });

/** Single source for the color zones (drug-store.ts imports this). Equipment from the approved outline table. */
export const PEDI_ZONES: PediZone[] = [
  Z('Grey', '#808080', '#000', 3, 5, 4, 50, 67, 'term to 4 mo', 2, '3.0-3.5', '3.5', '9-10', '1', '1', '5-8', '5-6', '10-12', '22-24'),
  Z('Pink', '#FF69B4', '#000', 6, 7, 6.5, 68, 76, '5-8 mo', 6, '3.5', '3.5', '10-10.5', '1', '1.5', '8', '5-8', '10-12', '22-24'),
  Z('Red', '#DC3545', '#fff', 8, 9, 8.5, 77, 87, '9-12 mo', 10, '3.5', '4.0', '10.5-11', '1', '1.5', '8', '8', '12-14', '22-24'),
  Z('Purple', '#7B2D8E', '#fff', 10, 11, 10.5, 88, 100, '1-2 yr', 18, '3.5-4.0', '4.0', '11-12', '1', '2', '10', '8', '14-20', '20-24'),
  Z('Yellow', '#FFD700', '#000', 12, 14, 13, 101, 114, '2-3 yr', 30, '4.0', '4.5', '12.5-13.5', '2', '2', '10', '8', '20-24', '20-22'),
  Z('White', '#FFFFFF', '#000', 15, 18, 16.5, 115, 128, '4-5 yr', 54, '4.5-5.0', '5.0', '14-15', '2', '2', '10', '8', '20-24', '20-22'),
  Z('Blue', '#007BFF', '#000', 19, 23, 21, 129, 141, '6-7 yr', 78, '5.0-5.5', '5.5', '15.5-16.5', '2', '2.5', '12', '10', '24-32', '18-20'),
  Z('Orange', '#FF8C00', '#000', 24, 29, 26.5, 142, 154, '8-9 yr', 102, '5.5-6.0', '6.0', '17-18', '2', '2.5', '14', '12', '28-32', '18-20'),
  Z('Green', '#28A745', '#000', 30, 36, 33, 155, Infinity, '10-12 yr', 132, '6.0-6.5', '6.5', '18.5-19.5', '3', '3', '14-16', '12', '32-40', '16-20'),
];

/** Upper exclusive weight bound per zone (handles fractional kg). Green is inclusive to 36. */
const ZONE_UPPER = [6, 8, 10, 12, 15, 19, 24, 30, 36];

export const ADULT_ETT = '6.5-7.0 cuffed';

export type ZoneResult =
  | { kind: 'zone'; zone: PediZone }
  | { kind: 'neonate' }
  | { kind: 'adult' };

export function zoneFor(q: { weightKg?: number; lengthCm?: number }): ZoneResult | null {
  const w = q.weightKg;
  if (w !== undefined && Number.isFinite(w) && w > 0) {
    if (w < 3) return { kind: 'neonate' };
    if (w > 36) return { kind: 'adult' };
    for (let i = 0; i < PEDI_ZONES.length; i++) {
      if (w < ZONE_UPPER[i] || (i === PEDI_ZONES.length - 1)) return { kind: 'zone', zone: PEDI_ZONES[i] };
    }
  }
  const l = q.lengthCm;
  if (l !== undefined && Number.isFinite(l) && l > 0) {
    if (l < 50) return { kind: 'neonate' };
    const z = findZoneByLength(l);
    return z ? { kind: 'zone', zone: z } : null;
  }
  return null;
}

/** Length zone lookup on rounded cm (the tape is read in whole cm). */
export function findZoneByLength(lengthCm: number): PediZone | null {
  const cm = Math.round(lengthCm);
  return PEDI_ZONES.find(z => cm >= z.lengthMin && cm <= z.lengthMax) ?? null;
}

// ===================================================================
// Patient resolution
// ===================================================================

export type WeightSource = 'measured' | 'length' | 'age';

export interface Patient {
  input: ParsedInput;
  weightKg: number;
  weightSource: WeightSource;
  sourceLabel: string;
  zone: ZoneResult;
  ageMonths?: number;
  lengthCm?: number;
  /** months used to pick the vitals band */
  vitalsMonths: number;
  vitalsFromZone: boolean;
  useActualWeight: boolean;
  flags: string[];
}

/** Measured weight beats length beats age. Returns null when nothing usable was entered. */
export function resolvePatient(input: ParsedInput): Patient | null {
  const flags: string[] = [];
  let weightKg: number | undefined;
  let weightSource: WeightSource | undefined;
  let sourceLabel = '';
  let useActualWeight = false;
  let zone: ZoneResult | null = null;

  // Newborn keyword, gestational age, or age under 1 month: always the neonate screen (weight may be missing).
  if (input.newborn || input.gaWeeks !== undefined || (input.ageMonths !== undefined && input.ageMonths < 1)) {
    const w = input.weightKg !== undefined && input.weightKg > 0 ? input.weightKg : 0;
    return {
      input, weightKg: w, weightSource: w > 0 ? 'measured' : 'age', sourceLabel: w > 0 ? 'measured' : 'not entered', zone: { kind: 'neonate' },
      ageMonths: input.ageMonths, lengthCm: input.lengthCm, vitalsMonths: input.ageMonths ?? 0, vitalsFromZone: false, useActualWeight: false,
      flags: ['Neonate: use the Neonate Numbers tool (2025 AHA/AAP NRP).'],
    };
  }

  if (input.weightKg !== undefined && input.weightKg > 0) {
    weightKg = input.weightKg; weightSource = 'measured'; sourceLabel = 'measured'; zone = zoneFor({ weightKg });
  } else if (input.lengthCm !== undefined && input.lengthCm > 0) {
    zone = zoneFor({ lengthCm: input.lengthCm });
    if (zone && zone.kind === 'zone') { weightKg = zone.zone.midpoint; weightSource = 'length'; sourceLabel = 'from length (zone midpoint)'; }
    else if (zone && zone.kind === 'neonate') { weightKg = 3; weightSource = 'length'; sourceLabel = 'from length'; }
  } else if (input.ageMonths !== undefined && input.ageMonths > 0) {
    const est = estimateWeightFromAge(input.ageMonths);
    weightKg = est.kg; weightSource = 'age'; sourceLabel = `estimated from age (${est.method})`; useActualWeight = est.useActualWeight;
    zone = zoneFor({ weightKg });
    if (est.useActualWeight) flags.push('Age over 12 yr: weight formula is unreliable. Use the actual measured weight.');
  }
  if (weightKg === undefined || !weightSource || !zone) return null;

  const ageMonths = input.ageMonths;
  const vitalsFromZone = ageMonths === undefined;
  const vitalsMonths = ageMonths ?? (zone.kind === 'zone' ? zone.zone.ageMonthsRep : zone.kind === 'adult' ? 144 : 1);
  if (zone.kind === 'adult') flags.push('Above Green (over 36 kg): use adult sizing; dose by actual weight up to adult maximums.');
  if (zone.kind === 'neonate') flags.push('Under 3 kg: use the Neonate Numbers tool for sizing and doses.');
  return { input, weightKg, weightSource, sourceLabel, zone, ageMonths, lengthCm: input.lengthCm, vitalsMonths, vitalsFromZone, useActualWeight, flags };
}

// ===================================================================
// Number formatting
// ===================================================================

const clean = (n: number): number => Math.round(n * 1e6) / 1e6;

/** mg (or mcg, mEq): 2 significant figures under 1, 0.1 steps to 100, whole numbers above. */
export function fmtAmount(v: number, whole = false): string {
  v = clean(v);
  if (whole) return String(Math.round(v));
  if (v === 0) return '0';
  if (v < 1) return String(Number(v.toPrecision(2)));
  if (v < 100) return String(Math.round(v * 10) / 10);
  return String(Math.round(v));
}

/** mL: 0.01 steps under 1 mL, 0.1 steps to 100 mL, whole numbers above. */
export function fmtMl(v: number): string {
  v = clean(v);
  if (v < 1) return String(Math.round(v * 100) / 100);
  if (v < 100) return String(Math.round(v * 10) / 10);
  return String(Math.round(v));
}

const range = (lo: string, hi: string): string => (lo === hi ? lo : `${lo}-${hi}`);

// ===================================================================
// Rows
// ===================================================================

export type PediTab = 'airway' | 'tubes' | 'arrest' | 'rsi' | 'seizure' | 'shock' | 'other';

export const PEDI_TAB_LABELS: Record<PediTab, string> = {
  airway: 'Airway', tubes: 'Tubes & Lines', arrest: 'Arrest & Rhythm', rsi: 'RSI', seizure: 'Seizure', shock: 'Shock, Fluids & Vitals', other: 'Other',
};
export const PEDI_TABS: PediTab[] = ['airway', 'tubes', 'arrest', 'rsi', 'seizure', 'shock', 'other'];

export interface DoseLine { label?: string; dose: string; ml?: string }

export interface PediRow {
  id: string;
  name: string;
  indication?: string;
  route?: string;
  tab: PediTab;
  kind: 'drug' | 'size' | 'vital';
  lines: DoseLine[];
  /** per-kg basis and cap, e.g. "0.01 mg/kg, max 1 mg" */
  basis: string;
  capped: boolean;
  /** concentration used for the mL line, e.g. "0.1 mg/mL" */
  conc?: string;
  notes?: string;
  cite: number[];
}

export interface PediTabContent { notes: string[]; rows: PediRow[] }

interface Conc { amount: number; perMl: number; label: string }
interface Step { label?: string; perKg: number; max?: number }
interface DrugDef {
  id: string;
  name: string;
  indication: string;
  tab: PediTab;
  unit: string;
  /** a single dose or a range (low, high) per kg */
  perKg?: number | [number, number];
  /** sequential doses (adenosine, defibrillation, cardioversion) */
  steps?: Step[];
  max?: number;
  conc?: Conc;
  route: string;
  notes?: string;
  cite: number[];
  whole?: boolean;
  /** a per-kg basis that is not a dose in `unit` (infusions in mcg/kg/min) */
  basisUnit?: string;
}

const c = (amount: number, perMl: number, label: string): Conc => ({ amount, perMl, label });

/** Resuscitation drug table. Vecuronium is deliberately absent (Children's MN: not recommended; recalled tape error). */
export const PEDI_DRUGS: DrugDef[] = [
  // ---- Arrest and rhythm
  { id: 'epi-ivio', name: 'Epinephrine', indication: 'Cardiac arrest', tab: 'arrest', unit: 'mg', perKg: 0.01, max: 1, conc: c(0.1, 1, '0.1 mg/mL'), route: 'IV/IO', notes: 'Every 3-5 min.', cite: [1, 2, 3] },
  { id: 'epi-ett', name: 'Epinephrine', indication: 'Cardiac arrest, no IV/IO access', tab: 'arrest', unit: 'mg', perKg: 0.1, max: 2.5, conc: c(1, 1, '1 mg/mL'), route: 'ETT', notes: 'IV/IO is preferred; ETT only without access.', cite: [1, 2, 3] },
  { id: 'amiodarone', name: 'Amiodarone', indication: 'Shock-refractory VF/pVT; perfusing tachyarrhythmia', tab: 'arrest', unit: 'mg', perKg: 5, max: 300, conc: c(50, 1, '50 mg/mL'), route: 'IV/IO', notes: 'May repeat to 15 mg/kg total. Perfusing rhythm: give over 20-60 min.', cite: [1, 2, 3] },
  { id: 'lidocaine', name: 'Lidocaine', indication: 'Shock-refractory VF/pVT (alternative)', tab: 'arrest', unit: 'mg', perKg: 1, max: 100, conc: c(20, 1, '20 mg/mL'), route: 'IV/IO', cite: [1, 2, 3] },
  { id: 'adenosine', name: 'Adenosine', indication: 'SVT', tab: 'arrest', unit: 'mg', steps: [{ label: 'First', perKg: 0.1, max: 6 }, { label: 'Second', perKg: 0.2, max: 12 }], conc: c(3, 1, '3 mg/mL'), route: 'IV/IO rapid push', notes: 'Rapid push with immediate saline flush.', cite: [1, 2, 3] },
  { id: 'atropine', name: 'Atropine', indication: 'Bradycardia with vagal tone or AV block', tab: 'arrest', unit: 'mg', perKg: 0.02, max: 0.5, conc: c(0.1, 1, '0.1 mg/mL'), route: 'IV/IO', notes: 'Single-dose maximum 0.5 mg (PALS). One card lists 1 mg.', cite: [1, 2, 3] },
  { id: 'cacl', name: 'Calcium chloride 10%', indication: 'Hypocalcemia, hyperkalemia, calcium channel blocker toxicity', tab: 'arrest', unit: 'mg', perKg: 20, max: 1000, conc: c(100, 1, '100 mg/mL'), route: 'IV/IO', notes: 'Central line preferred. Slow push.', cite: [2, 3] },
  { id: 'cagluc', name: 'Calcium gluconate 10%', indication: 'Hypocalcemia, hyperkalemia (peripheral access)', tab: 'arrest', unit: 'mg', perKg: 60, max: 2000, conc: c(100, 1, '100 mg/mL'), route: 'IV/IO', notes: 'Slow push.', cite: [2, 3] },
  { id: 'bicarb', name: 'Sodium bicarbonate', indication: 'Hyperkalemia, sodium channel blocker toxicity, prolonged arrest', tab: 'arrest', unit: 'mEq', perKg: 1, max: 50, conc: c(1, 1, '8.4% = 1 mEq/mL'), route: 'IV/IO', cite: [2, 3] },
  { id: 'magnesium', name: 'Magnesium sulfate', indication: 'Torsades, hypomagnesemia', tab: 'arrest', unit: 'mg', perKg: [25, 50], max: 2000, conc: c(500, 1, '500 mg/mL, dilute before giving'), route: 'IV/IO', notes: 'Give over 10-20 min if perfusing; push only in pulseless torsades.', cite: [2, 3] },
  { id: 'defib', name: 'Defibrillation', indication: 'VF / pulseless VT', tab: 'arrest', unit: 'J', steps: [{ label: 'First', perKg: 2 }, { label: 'Second', perKg: 4 }], whole: true, route: 'Unsynchronized', notes: 'Then 4 J/kg or more, maximum 10 J/kg or the adult dose. ERC/RCUK 2025 uses 4 J/kg for every shock.', cite: [3, 4, 5] },
  { id: 'cardiovert', name: 'Synchronized cardioversion', indication: 'Unstable SVT / VT with a pulse', tab: 'arrest', unit: 'J', steps: [{ label: 'First', perKg: 0.5 }, { label: 'Second', perKg: 1 }, { label: 'Then', perKg: 2 }], whole: false, route: 'Synchronized', notes: 'First 0.5-1 J/kg; if unsuccessful, 2 J/kg.', cite: [3, 4] },

  // ---- RSI
  { id: 'ketamine', name: 'Ketamine', indication: 'RSI induction', tab: 'rsi', unit: 'mg', perKg: [1, 2], conc: c(10, 1, '10 mg/mL'), route: 'IV', notes: 'Preferred in shock or bronchospasm. Not a dosing row for analgesia.', cite: [2] },
  { id: 'etomidate', name: 'Etomidate', indication: 'RSI induction', tab: 'rsi', unit: 'mg', perKg: 0.3, max: 20, conc: c(2, 1, '2 mg/mL'), route: 'IV', cite: [1, 2] },
  { id: 'propofol', name: 'Propofol', indication: 'RSI induction (normotensive)', tab: 'rsi', unit: 'mg', perKg: [1, 2], conc: c(10, 1, '10 mg/mL'), route: 'IV', notes: 'Hypotension risk; avoid in shock.', cite: [2] },
  { id: 'fentanyl', name: 'Fentanyl', indication: 'RSI adjunct', tab: 'rsi', unit: 'mcg', perKg: [1, 2], max: 100, conc: c(50, 1, '50 mcg/mL'), route: 'IV', notes: 'Slow push; chest wall rigidity with rapid boluses.', cite: [1, 2] },
  { id: 'midazolam-iv', name: 'Midazolam', indication: 'RSI sedation (IV)', tab: 'rsi', unit: 'mg', perKg: 0.1, max: 5, conc: c(1, 1, '1 mg/mL'), route: 'IV', cite: [2] },
  { id: 'rocuronium', name: 'Rocuronium', indication: 'RSI paralysis', tab: 'rsi', unit: 'mg', perKg: 1.2, conc: c(10, 1, '10 mg/mL'), route: 'IV', notes: 'Children\'s MN 2025 uses 1.2 mg/kg (faster onset); older cards list 1.0.', cite: [2] },
  { id: 'succinylcholine', name: 'Succinylcholine', indication: 'RSI paralysis', tab: 'rsi', unit: 'mg', perKg: 1.5, conc: c(20, 1, '20 mg/mL'), route: 'IV', notes: 'Avoid with hyperkalemia risk, neuromuscular disease, crush or burn injury.', cite: [1, 2] },

  // ---- Seizure
  { id: 'midazolam-imin', name: 'Midazolam', indication: 'Seizure', tab: 'seizure', unit: 'mg', perKg: 0.2, max: 10, conc: c(5, 1, '5 mg/mL'), route: 'IM/IN', notes: 'IN: split between nostrils.', cite: [1, 2] },
  { id: 'lorazepam', name: 'Lorazepam', indication: 'Seizure', tab: 'seizure', unit: 'mg', perKg: 0.1, max: 4, conc: c(2, 1, '2 mg/mL'), route: 'IV/IO', notes: 'May repeat once.', cite: [1, 2] },
  { id: 'diazepam-pr', name: 'Diazepam', indication: 'Seizure, no IV', tab: 'seizure', unit: 'mg', perKg: 0.5, max: 20, route: 'PR', notes: 'Rectal gel comes in fixed doses; round to the nearest available.', cite: [1, 2] },
  { id: 'levetiracetam', name: 'Levetiracetam', indication: 'Second-line, status epilepticus', tab: 'seizure', unit: 'mg', perKg: 60, max: 4500, conc: c(100, 1, '100 mg/mL'), route: 'IV', cite: [2] },
  { id: 'fosphenytoin', name: 'Fosphenytoin', indication: 'Second-line, status epilepticus', tab: 'seizure', unit: 'mg PE', perKg: 20, max: 1500, conc: c(50, 1, '50 mg PE/mL'), route: 'IV/IM', notes: 'Dose in phenytoin equivalents (PE).', cite: [1, 2] },
  { id: 'phenobarbital', name: 'Phenobarbital', indication: 'Second-line, status epilepticus', tab: 'seizure', unit: 'mg', perKg: 20, max: 1000, conc: c(65, 1, '65 mg/mL'), route: 'IV', cite: [1, 2] },

  // ---- Shock, fluids, other infusions
  { id: 'bolus', name: 'Isotonic crystalloid bolus', indication: 'Shock', tab: 'shock', unit: 'mL', perKg: [10, 20], route: 'IV/IO', notes: 'Reassess after each bolus.', cite: [3, 4, 5] },
  { id: 'bolus-cardiogenic', name: 'Isotonic crystalloid bolus', indication: 'Shock, cardiogenic suspected', tab: 'shock', unit: 'mL', perKg: [5, 10], route: 'IV/IO', notes: 'Smaller aliquots; reassess after each.', cite: [3, 4] },
  { id: 'prbc', name: 'Packed red blood cells', indication: 'Hemorrhagic shock', tab: 'shock', unit: 'mL', perKg: 10, route: 'IV/IO', cite: [2] },
  { id: 'd10', name: 'Dextrose 10% (D10)', indication: 'Hypoglycemia', tab: 'shock', unit: 'g', perKg: 0.5, max: 25, conc: c(0.1, 1, '10% = 0.1 g/mL'), route: 'IV/IO', notes: '5 mL/kg of D10.', cite: [1, 2] },
  { id: 'epi-inf', name: 'Epinephrine infusion', indication: 'Shock', tab: 'shock', unit: 'mcg/min', perKg: [0.1, 1], basisUnit: 'mcg/kg/min', route: 'IV/IO infusion', notes: 'Rate per pharmacy standard concentration.', cite: [2, 3] },
  { id: 'norepi-inf', name: 'Norepinephrine infusion', indication: 'Shock', tab: 'shock', unit: 'mcg/min', perKg: [0.1, 1], basisUnit: 'mcg/kg/min', route: 'IV/IO infusion', notes: 'Rate per pharmacy standard concentration.', cite: [2, 3] },
  { id: 'dopamine-inf', name: 'Dopamine infusion', indication: 'Shock', tab: 'shock', unit: 'mcg/min', perKg: [2, 20], basisUnit: 'mcg/kg/min', route: 'IV/IO infusion', notes: 'Rate per pharmacy standard concentration.', cite: [2, 3] },
  { id: 'hypertonic', name: 'Hypertonic saline 3%', indication: 'Raised ICP or herniation', tab: 'shock', unit: 'mL', perKg: [3, 5], max: 300, route: 'IV/IO over 10-20 min', cite: [2] },
  { id: 'mannitol', name: 'Mannitol 20%', indication: 'Raised ICP or herniation', tab: 'shock', unit: 'g', perKg: [0.5, 1], conc: c(0.2, 1, '20% = 0.2 g/mL'), route: 'IV', cite: [2] },

  // ---- Other
  { id: 'naloxone', name: 'Naloxone', indication: 'Opioid toxicity', tab: 'other', unit: 'mg', perKg: 0.1, max: 2, conc: c(0.4, 1, '0.4 mg/mL'), route: 'IV/IO/IM/IN', cite: [1, 2] },
  { id: 'epi-im', name: 'Epinephrine IM', indication: 'Anaphylaxis', tab: 'other', unit: 'mg', perKg: 0.01, max: 0.5, conc: c(1, 1, '1 mg/mL'), route: 'IM (anterolateral thigh)', notes: 'Auto-injector: 0.15 mg for 15-30 kg; 0.3 mg for 30 kg and up.', cite: [1, 2] },
  { id: 'diphenhydramine', name: 'Diphenhydramine', indication: 'Allergic reaction', tab: 'other', unit: 'mg', perKg: 1, max: 50, conc: c(50, 1, '50 mg/mL'), route: 'IV/IM', cite: [2] },
];

/** Dose rules that depend on the child (age or weight). */
function resolveDef(d: DrugDef, p: Patient): DrugDef {
  if (d.id === 'succinylcholine') return { ...d, perKg: p.weightKg < 10 ? 2 : 1.5 };
  if (d.id === 'diazepam-pr') {
    let perKg: number;
    if (p.ageMonths !== undefined) perKg = p.ageMonths < 72 ? 0.5 : p.ageMonths < 144 ? 0.3 : 0.2;
    else perKg = p.weightKg <= 18 ? 0.5 : 0.3;
    return { ...d, perKg };
  }
  if (d.id === 'bicarb' && p.vitalsMonths < 1 && p.ageMonths !== undefined) return { ...d, conc: c(0.5, 1, '4.2% = 0.5 mEq/mL (infants under 1 month)') };
  return d;
}

const kgText = (v: number): string => String(clean(v));

function basisOf(d: DrugDef): string {
  const unitPerKg = d.basisUnit ?? `${d.unit}/kg`;
  if (d.steps) return d.steps.map(s => `${kgText(s.perKg)} ${d.unit}/kg${s.max ? ` (max ${s.max} ${d.unit})` : ''}`).join(', then ') + (d.id === 'defib' ? ', max 10 J/kg or adult dose' : '');
  const k = d.perKg as number | [number, number];
  const text = Array.isArray(k) ? `${kgText(k[0])}-${kgText(k[1])}` : kgText(k);
  return `${text} ${unitPerKg}${d.max ? `, max ${d.max} ${d.unit}` : ''}`;
}

function doseLine(d: DrugDef, perKg: number | [number, number], max: number | undefined, w: number, label?: string): { line: DoseLine; capped: boolean } {
  const lo = Array.isArray(perKg) ? perKg[0] : perKg;
  const hi = Array.isArray(perKg) ? perKg[1] : perKg;
  let capped = false;
  const lim = (raw: number): number => { if (max !== undefined && raw > max + 1e-9) { capped = true; return max; } return raw; };
  const dLo = lim(lo * w);
  const dHi = lim(hi * w);
  const dose = `${range(fmtAmount(dLo, d.whole), fmtAmount(dHi, d.whole))} ${d.unit}`;
  const out: DoseLine = { label, dose };
  if (d.conc) {
    const per = d.conc.amount / d.conc.perMl;
    out.ml = `${range(fmtMl(dLo / per), fmtMl(dHi / per))} mL`;
  }
  return { line: out, capped };
}

/** Compute the row for one drug at a dosing weight. */
export function computeDrug(def: DrugDef, p: Patient): PediRow {
  const d = resolveDef(def, p);
  const w = p.weightKg;
  const lines: DoseLine[] = [];
  let capped = false;
  if (d.steps) {
    for (const s of d.steps) { const r = doseLine(d, s.perKg, s.max, w, s.label); lines.push(r.line); capped = capped || r.capped; }
  } else {
    const r = doseLine(d, d.perKg as number | [number, number], d.max, w);
    lines.push(r.line); capped = r.capped;
  }
  return {
    id: d.id, name: d.name, indication: d.indication, route: d.route, tab: d.tab, kind: 'drug',
    lines, basis: basisOf(d), capped, conc: d.conc ? d.conc.label : undefined, notes: d.notes, cite: d.cite,
  };
}

/** All drug rows for a tab (also used directly by tests). */
export function drugRows(p: Patient, tab?: PediTab): PediRow[] {
  return PEDI_DRUGS.filter(d => !tab || d.tab === tab).map(d => computeDrug(d, p));
}

export function drugRow(p: Patient, id: string): PediRow | null {
  const d = PEDI_DRUGS.find(x => x.id === id);
  return d ? computeDrug(d, p) : null;
}

// ===================================================================
// Maintenance fluids, vitals
// ===================================================================

/** Holliday-Segar 4-2-1, mL/hr. */
export function maintenanceMlPerHr(kg: number): number {
  if (kg <= 10) return 4 * kg;
  if (kg <= 20) return 40 + 2 * (kg - 10);
  return 60 + (kg - 20);
}

interface VitalBand { label: string; fromMonths: number; hr: [number, number]; rr: [number, number] }
/** Children's Minnesota 06/2025 reference table. */
export const VITAL_BANDS: VitalBand[] = [
  { label: '1 mo', fromMonths: 0, hr: [85, 205], rr: [30, 60] },
  { label: '6 mo', fromMonths: 3, hr: [100, 190], rr: [30, 60] },
  { label: '1 yr', fromMonths: 12, hr: [100, 190], rr: [30, 60] },
  { label: '2-3 yr', fromMonths: 24, hr: [60, 140], rr: [24, 40] },
  { label: '4-5 yr', fromMonths: 48, hr: [60, 140], rr: [22, 34] },
  { label: '6-8 yr', fromMonths: 72, hr: [60, 140], rr: [18, 30] },
  { label: '9-13 yr', fromMonths: 108, hr: [60, 100], rr: [18, 30] },
  { label: '14+ yr', fromMonths: 168, hr: [60, 100], rr: [12, 16] },
];

export function vitalBandFor(ageMonths: number): VitalBand {
  let band = VITAL_BANDS[0];
  for (const b of VITAL_BANDS) if (ageMonths >= b.fromMonths) band = b;
  return band;
}

/** Lower limit of systolic BP (hypotension is below this). */
export function hypotensionSbp(ageMonths: number): number {
  if (ageMonths < 1) return 60;
  if (ageMonths < 12) return 70;
  const yr = ageMonths / 12;
  if (yr < 10) return 70 + 2 * Math.floor(yr + 1e-9);
  return 90;
}

// ===================================================================
// Equipment, formulas and tab content
// ===================================================================

const roundHalf = (n: number): number => Math.round(n * 2) / 2;
const one = (n: number): string => n.toFixed(1);

export interface AgeFormulas { cuffed: string; uncuffed: string; depthCm: string }
/** Age-based check, shown only when age is 2 yr or more. */
export function ageFormulas(ageMonths: number | undefined): AgeFormulas | null {
  if (ageMonths === undefined || ageMonths < 24) return null;
  const y = ageMonths / 12;
  return { cuffed: one(roundHalf(y / 4 + 3.5)), uncuffed: one(roundHalf(y / 4 + 4)), depthCm: one(roundHalf(y / 2 + 12)) };
}

const AIRWAY_NOTES = [
  'Cuffed tubes are preferred at every age; the uncuffed size is shown beside it.',
  'Size formulas predict the correct tube only about 50-75% of the time: have a half size up and a half size down ready.',
  'Depth is at the lip. Confirm with waveform capnography and chest rise, not the number alone.',
];
const OBESE_NOTE = 'Obese child: dose resuscitation drugs by the weight estimated from length or age (ideal weight), not by actual weight.';

function sizeRow(id: string, name: string, tab: PediTab, value: string, unit: string, basis: string, cite: number[], notes?: string): PediRow {
  return { id, name, tab, kind: 'size', lines: [{ dose: `${value}${unit ? ' ' + unit : ''}` }], basis, capped: false, notes, cite };
}

export function equipmentRows(p: Patient): { airway: PediRow[]; tubes: PediRow[] } {
  const airway: PediRow[] = [];
  const tubes: PediRow[] = [];
  if (p.zone.kind === 'zone') {
    const z = p.zone.zone;
    airway.push(sizeRow('ett', 'Endotracheal tube', 'airway', `${z.ettCuffed} cuffed`, '', `Uncuffed ${z.ettUncuffed}. ${z.color} zone.`, [1, 2]));
    airway.push(sizeRow('depth', 'ETT depth at lip', 'airway', z.depthCm, 'cm', 'Zone table', [1, 2]));
    airway.push(sizeRow('blade', 'Laryngoscope blade', 'airway', z.blade, '', 'Zone table', [1, 2]));
    airway.push(sizeRow('lma', 'LMA', 'airway', z.lma, '', 'Zone table', [1, 2]));
    tubes.push(sizeRow('ng', 'NG / OG tube', 'tubes', z.ngFr, 'Fr', 'Zone table', [1, 2]));
    tubes.push(sizeRow('foley', 'Foley catheter', 'tubes', z.foleyFr, 'Fr', 'Zone table', [1, 2]));
    tubes.push(sizeRow('chest', 'Chest tube', 'tubes', z.chestTubeFr, 'Fr', 'Zone table', [1, 2]));
    tubes.push(sizeRow('iv', 'IV catheter', 'tubes', z.ivG, 'G', 'Zone table', [1, 2]));
  } else if (p.zone.kind === 'adult') {
    airway.push(sizeRow('ett', 'Endotracheal tube', 'airway', ADULT_ETT, '', 'Adult sizing (above Green zone)', [1, 2]));
  }
  const f = ageFormulas(p.ageMonths);
  if (f) {
    airway.push(sizeRow('ett-formula', 'Age formula check', 'airway', `${f.cuffed} cuffed, ${f.uncuffed} uncuffed`, '', `Cuffed age/4 + 3.5, uncuffed age/4 + 4. Depth age/2 + 12 = ${f.depthCm} cm.`, [3, 7]));
  }
  return { airway, tubes };
}

function vitalRows(p: Patient): PediRow[] {
  const band = vitalBandFor(p.vitalsMonths);
  const src = p.vitalsFromZone ? `Age band ${band.label} (from the zone; age not entered)` : `Age band ${band.label}`;
  const sbp = hypotensionSbp(p.vitalsMonths);
  const hypoBasis = p.vitalsMonths < 1 ? 'Under 1 mo: SBP below 60' : p.vitalsMonths < 12 ? '1 mo to 1 yr: SBP below 70' : p.vitalsMonths / 12 < 10 ? '1-10 yr: SBP below 70 + 2 x age' : 'Over 10 yr: SBP below 90';
  return [
    { id: 'vital-hr', name: 'Heart rate', tab: 'shock', kind: 'vital', lines: [{ dose: `${band.hr[0]}-${band.hr[1]} /min` }], basis: src, capped: false, cite: [2] },
    { id: 'vital-rr', name: 'Respiratory rate', tab: 'shock', kind: 'vital', lines: [{ dose: `${band.rr[0]}-${band.rr[1]} /min` }], basis: src, capped: false, cite: [2] },
    { id: 'vital-sbp', name: 'Hypotension: SBP below', tab: 'shock', kind: 'vital', lines: [{ dose: `${sbp} mmHg` }], basis: hypoBasis, capped: false, cite: [2, 3] },
  ];
}

function maintenanceRow(p: Patient): PediRow {
  const rate = maintenanceMlPerHr(p.weightKg);
  return {
    id: 'maintenance', name: 'Maintenance fluid', indication: 'Holliday-Segar 4-2-1', tab: 'shock', kind: 'drug',
    lines: [{ dose: `${fmtMl(rate)} mL/hr` }], basis: '4 mL/kg/hr first 10 kg, 2 mL/kg/hr next 10 kg, 1 mL/kg/hr after', capped: false,
    notes: 'Do not exceed the adult rate (about 100-120 mL/hr).', cite: [8],
  };
}

/** Everything the UI and tests need for one patient, per tab. */
export function buildTabs(p: Patient): Record<PediTab, PediTabContent> {
  const empty = (): PediTabContent => ({ notes: [], rows: [] });
  const tabs: Record<PediTab, PediTabContent> = { airway: empty(), tubes: empty(), arrest: empty(), rsi: empty(), seizure: empty(), shock: empty(), other: empty() };
  if (p.zone.kind === 'neonate') return tabs;
  const eq = equipmentRows(p);
  tabs.airway.notes = AIRWAY_NOTES;
  tabs.airway.rows = eq.airway;
  tabs.tubes.rows = eq.tubes;
  tabs.arrest.rows = drugRows(p, 'arrest');
  tabs.arrest.notes = ['All doses are per dose. Concentrations are ' + PEDI_STOCK + '.', OBESE_NOTE];
  tabs.rsi.rows = drugRows(p, 'rsi');
  tabs.rsi.notes = ['Vecuronium is intentionally not listed (Children\'s MN: not recommended; overdose risk).', 'Concentrations are ' + PEDI_STOCK + '.'];
  tabs.seizure.rows = drugRows(p, 'seizure');
  tabs.seizure.notes = ['Concentrations are ' + PEDI_STOCK + '.'];
  const shock = drugRows(p, 'shock');
  const bolusIdx = shock.findIndex(r => r.id === 'bolus');
  const card = shock.findIndex(r => r.id === 'bolus-cardiogenic');
  if (bolusIdx >= 0 && card >= 0) {
    const cardRow = shock[card];
    shock[bolusIdx] = { ...shock[bolusIdx], lines: [{ ...shock[bolusIdx].lines[0] }, { label: 'If cardiogenic', dose: cardRow.lines[0].dose }], basis: `${shock[bolusIdx].basis}; cardiogenic ${cardRow.basis}` };
    shock.splice(card, 1);
  }
  const maint = maintenanceRow(p);
  const dIdx = shock.findIndex(r => r.id === 'prbc');
  shock.splice(dIdx >= 0 ? dIdx + 1 : shock.length, 0, maint);
  tabs.shock.rows = [...vitalRows(p), ...shock];
  tabs.shock.notes = ['Fluid boluses: ERC/RCUK 2025 uses 10 mL/kg; AHA allows 10-20 mL/kg with reassessment after each.', 'Concentrations are ' + PEDI_STOCK + '.'];
  tabs.other.rows = drugRows(p, 'other');
  tabs.other.notes = ['Concentrations are ' + PEDI_STOCK + '.'];
  return tabs;
}

// ===================================================================
// Header text
// ===================================================================

export function ageText(ageMonths: number): string {
  if (ageMonths < 24) return `${fmtAmount(ageMonths)} mo`;
  return `${fmtAmount(ageMonths / 12)} yr`;
}

export function weightText(p: Patient): string {
  const kg = fmtAmount(p.weightKg);
  return p.weightSource === 'measured' ? `${kg} kg` : `~${kg} kg`;
}

export function zoneName(p: Patient): string {
  return p.zone.kind === 'zone' ? p.zone.zone.color : p.zone.kind === 'neonate' ? 'Neonate' : 'Adult size';
}

export function headerLine(p: Patient): string {
  const parts: string[] = [];
  if (p.ageMonths !== undefined) parts.push(`Age ${ageText(p.ageMonths)}`);
  if (p.lengthCm !== undefined && p.weightSource === 'length') parts.push(`${fmtAmount(p.lengthCm)} cm`);
  parts.push(weightText(p));
  parts.push(zoneName(p).toUpperCase());
  return parts.join(' · ');
}

// ===================================================================
// Neonate Numbers (<3 kg), added 2026-11-16 (outline: docs/reviews/neonate-numbers-outline.md)
// Resuscitation numbers: 2025 AHA/AAP Part 5 [1]. Tube depth: Kempley 2008 [2]. Sizes, blades, catheters: NSW/Safer Care Victoria [3].
// ===================================================================

export const NEO_CITATIONS: string[] = [
  'Lee HC, Strand ML, et al. Part 5: Neonatal Resuscitation. Circulation 2025;152(16 suppl 2):S385-S423. PMID 41122887.',
  'Kempley ST, Moreiras JW, Petrone FL. Endotracheal tube length for neonatal intubation. Resuscitation. 2008;77(3):369-373.',
  'NSW Royal Hospital for Women neonatal intubation guideline; Safer Care Victoria neonatal intubation guideline (tube, blade and catheter sizes by weight).',
  'myMedKitt Neonatal Resuscitation (NRP) consult (neonatal-resus), updated to the 2025 AHA/AAP guideline.',
  'myMedKitt drug entries (ampicillin, gentamicin, acyclovir, alprostadil, dextrose). First doses only; dosing interval per pharmacy/Neofax by gestational age and postnatal age.',
  'Children\'s Hospital of Philadelphia. Neonatal seizure and status epilepticus: anti-seizure medications clinical pathway. https://www.chop.edu/clinical-pathway/neonatal-seizure-status-epilepticus-anti-seizure-medications-asm',
];

export const NEO_FOOTER = 'Reference for licensed clinicians: verify against your NICU protocol and confirm concentrations against your stock. Depth and size are starting points; confirm with CO2 detector, rising heart rate and imaging.';

export type NeoTab = 'airway' | 'breathe' | 'circulate' | 'drugs' | 'rosc';
export const NEO_TABS: NeoTab[] = ['airway', 'breathe', 'circulate', 'drugs', 'rosc'];
export const NEO_TAB_LABELS: Record<NeoTab, string> = { airway: 'Airway', breathe: 'Breathe', circulate: 'Circulate', drugs: 'Drugs', rosc: 'After ROSC' };

export interface NeoPatient { weightKg?: number; gaWeeks?: number; ageMonths?: number }

export interface NeoRow {
  id: string;
  name: string;
  indication?: string;
  route?: string;
  lines: DoseLine[];
  basis: string;
  capped: boolean;
  conc?: string;
  notes?: string;
  cite: number[];
  /** shown as a red badge, e.g. NOT RECOMMENDED */
  warn?: string;
}

export interface NeoTabContent { notes: string[]; rows: NeoRow[] }

/** Build a neonate patient from the shared parser output (weight, GA, age). */
export function neoPatientFrom(input: ParsedInput): NeoPatient {
  const out: NeoPatient = {};
  if (input.weightKg !== undefined && input.weightKg > 0) out.weightKg = input.weightKg;
  if (input.gaWeeks !== undefined && input.gaWeeks > 0) out.gaWeeks = input.gaWeeks;
  if (input.ageMonths !== undefined && input.ageMonths > 0) out.ageMonths = input.ageMonths;
  return out;
}

/** UI helper: weight text (a bare number takes the chip unit) plus the GA field. */
export function parseNeo(weightText: string, unit: 'kg' | 'g', gaField?: string | number): NeoPatient {
  const t = String(weightText ?? '').trim();
  const bare = /^(\d+(?:[.,]\d+)?)$/.exec(t);
  const parsed = bare ? parseInput(unit === 'g' ? `${bare[1]}g` : `${bare[1]}kg`) : parseInput(t);
  const ga = gaField !== undefined && String(gaField).trim() !== '' ? Number(String(gaField).replace(',', '.')) : NaN;
  if (Number.isFinite(ga) && ga >= 20 && ga <= 45) parsed.gaWeeks = ga;
  return neoPatientFrom(parsed);
}

interface NeoBand { label: string; ett: string; blade: string; suction: string; og: string }
export const NEO_BANDS: NeoBand[] = [
  { label: 'Under 1 kg', ett: '2.5', blade: '00', suction: '5-6 Fr', og: '5 Fr' },
  { label: '1 to under 2 kg', ett: '3.0', blade: '0', suction: '6-8 Fr', og: '5-8 Fr' },
  { label: '2 to under 3 kg', ett: '3.5', blade: '0-1', suction: '8 Fr', og: '8 Fr' },
  { label: '3 kg and over', ett: '3.5-4.0', blade: '1', suction: '8-10 Fr', og: '8 Fr' },
];

/** Weight picks the band; gestational age (<28, 28 to <34, 34 to <38, 38+) is the fallback. -1 when neither is known. */
export function neoBandIndex(p: NeoPatient): number {
  if (p.weightKg !== undefined) return p.weightKg < 1 ? 0 : p.weightKg < 2 ? 1 : p.weightKg < 3 ? 2 : 3;
  if (p.gaWeeks !== undefined) return p.gaWeeks < 28 ? 0 : p.gaWeeks < 34 ? 1 : p.gaWeeks < 38 ? 2 : 3;
  return -1;
}

/** Kempley 2008 oral tube depth at the lip by gestational age, cm. */
export function kempleyDepthByGa(ga: number): number {
  if (ga <= 24) return 5.5;
  if (ga <= 26) return 6.0;
  if (ga <= 29) return 6.5;
  if (ga <= 32) return 7.0;
  if (ga <= 34) return 7.5;
  if (ga <= 37) return 8.0;
  if (ga <= 40) return 8.5;
  return 9.0;
}

const KEMPLEY_WEIGHT: [number, number][] = [[500, 5.5], [700, 6.0], [900, 6.5], [1100, 7.0], [1500, 7.5], [1900, 8.0], [2500, 8.5], [3200, 9.0]];
/** Kempley 2008 pairing by weight in grams (lower bound of each published band; gaps fall to the band below). */
export function kempleyDepthByWeight(kg: number): number {
  const g = kg * 1000;
  let d = KEMPLEY_WEIGHT[0][1];
  for (const [lo, depth] of KEMPLEY_WEIGHT) if (g >= lo) d = depth;
  return d;
}

export const weightPlus6 = (kg: number): number => Math.round((kg + 6) * 10) / 10;

export interface LmaResult { eligible: boolean | null; text: string }
/** Size 1 LMA: 34 weeks or more AND 2 kg or more. */
export function neoLma(p: NeoPatient): LmaResult {
  const wOk = p.weightKg === undefined ? null : p.weightKg >= 2;
  const gOk = p.gaWeeks === undefined ? null : p.gaWeeks >= 34;
  if (wOk === false || gOk === false) return { eligible: false, text: 'Size 1 not indicated: needs 34 wk or more and 2 kg or more' };
  if (wOk === true && gOk === true) return { eligible: true, text: 'Size 1 (34 wk or more and 2 kg or more)' };
  return { eligible: null, text: 'Size 1 only if 34 wk or more and 2 kg or more; enter both to confirm' };
}

/** Starting oxygen by gestational age (2025 AHA/AAP). */
export function neoFio2(ga?: number): string {
  if (ga === undefined) return '21% if 35 wk or more; 21-30% if 32 to under 35 wk; 30-100% if under 32 wk';
  if (ga >= 35) return '21%';
  if (ga >= 32) return '21-30%';
  return '30-100%';
}

const one1 = (n: number): string => n.toFixed(1);
const nrow = (id: string, name: string, dose: string, basis: string, cite: number[], notes?: string, extra?: Partial<NeoRow>): NeoRow =>
  ({ id, name, lines: [{ dose }], basis, capped: false, cite, notes, ...extra });

export function neoAirwayRows(p: NeoPatient): NeoRow[] {
  const rows: NeoRow[] = [];
  const bi = neoBandIndex(p);
  if (bi >= 0) {
    const b = NEO_BANDS[bi];
    const by = p.weightKg !== undefined ? `weight band ${b.label}` : `gestational age (weight not entered)`;
    rows.push(nrow('ett', 'Endotracheal tube (uncuffed)', `${b.ett} mm`, `Sizing by ${by}.`, [3]));
    // depth
    if (p.gaWeeks !== undefined) {
      const d = kempleyDepthByGa(p.gaWeeks);
      const check = p.weightKg !== undefined ? ` Weight + 6 check: ${one1(weightPlus6(p.weightKg))} cm.` : '';
      rows.push(nrow('depth', 'ETT depth at lip', `${one1(d)} cm`, `Kempley table for ${p.gaWeeks} wk.${check}`, [2], 'NRP 9th ed reportedly measures depth at the gum line; lip values shown until confirmed.'));
    } else if (p.weightKg !== undefined) {
      rows.push(nrow('depth', 'ETT depth at lip', `${one1(weightPlus6(p.weightKg))} cm`, `Weight + 6 cm. Kempley weight pairing: ${one1(kempleyDepthByWeight(p.weightKg))} cm.`, [2], 'NRP 9th ed reportedly measures depth at the gum line; lip values shown until confirmed. Enter gestational age for the Kempley GA value.'));
    }
    rows.push(nrow('blade', 'Laryngoscope blade (straight)', b.blade, `Weight band ${b.label}.`, [3]));
    rows.push(nrow('suction', 'Suction catheter', b.suction, `Weight band ${b.label}.`, [3]));
    rows.push(nrow('og', 'OG tube', b.og, `Weight band ${b.label}.`, [3]));
  }
  const lma = neoLma(p);
  rows.push(nrow('lma', 'Laryngeal mask', lma.eligible === false ? 'Not indicated' : 'Size 1', lma.text + '. May be used during compressions.', [1, 3], undefined, lma.eligible === false ? { warn: 'NOT ELIGIBLE' } : undefined));
  return rows;
}

interface NeoDrugDef {
  id: string; name: string; indication: string; tab: 'drugs' | 'rosc'; unit: string;
  perKg: number | [number, number]; conc?: { perMl: number; label: string }; route: string; notes?: string; cite: number[];
  basisUnit?: string; whole?: boolean;
}
const nd = (d: NeoDrugDef): NeoDrugDef => d;

export const NEO_DRUGS: NeoDrugDef[] = [
  nd({ id: 'epi-iv', name: 'Epinephrine', indication: 'HR below 60 after 30 s of effective ventilation and compressions', tab: 'drugs', unit: 'mg', perKg: [0.01, 0.03], conc: { perMl: 0.1, label: '0.1 mg/mL' }, route: 'IV/IO/UVC', notes: 'Follow with a 3 mL NS flush regardless of weight. Repeat every 3-5 min.', cite: [1] }),
  nd({ id: 'epi-ett', name: 'Epinephrine', indication: 'Only while IV/IO access is being placed', tab: 'drugs', unit: 'mg', perKg: [0.05, 0.1], conc: { perMl: 0.1, label: '0.1 mg/mL' }, route: 'ETT', notes: 'IV/IO preferred; switch as soon as access is established.', cite: [1] }),
  nd({ id: 'volume', name: 'Volume: normal saline or O-negative PRBC', indication: 'Suspected blood loss with no response to epinephrine', tab: 'drugs', unit: 'mL', perKg: [10, 20], route: 'IV/IO/UVC', notes: 'Repeat if inadequate response.', cite: [1] }),
  nd({ id: 'd10', name: 'Dextrose 10% (D10)', indication: 'Low glucose', tab: 'drugs', unit: 'mL', perKg: 2, route: 'IV', notes: '2 mL/kg of D10 = 0.2 g/kg. Recheck glucose.', cite: [5] }),
  nd({ id: 'ampicillin', name: 'Ampicillin', indication: 'Suspected early-onset sepsis, first dose', tab: 'rosc', unit: 'mg', perKg: 50, route: 'IV', notes: 'Interval per pharmacy/Neofax by gestational age and postnatal age.', cite: [5] }),
  nd({ id: 'gentamicin', name: 'Gentamicin', indication: 'Suspected early-onset sepsis, first dose', tab: 'rosc', unit: 'mg', perKg: 4, route: 'IV', notes: '4 mg/kg every 24 h applies at 0-7 days and 35 weeks or more. Interval by gestational age and postnatal age per pharmacy/Neofax.', cite: [5] }),
  nd({ id: 'acyclovir', name: 'Acyclovir', indication: 'Suspected neonatal HSV, first dose', tab: 'rosc', unit: 'mg', perKg: 20, route: 'IV', notes: 'Interval and renal adjustment per pharmacy.', cite: [5] }),
  nd({ id: 'alprostadil', name: 'Alprostadil (PGE1)', indication: 'Suspected duct-dependent lesion', tab: 'rosc', unit: 'mcg/min', perKg: [0.05, 0.1], basisUnit: 'mcg/kg/min', route: 'IV infusion', notes: 'Apnea risk: be ready to intubate. Rate per pharmacy dilution.', cite: [5] }),
  nd({ id: 'phenobarbital', name: 'Phenobarbital', indication: 'Neonatal seizure, loading dose', tab: 'rosc', unit: 'mg', perKg: 20, route: 'IV', notes: 'Per the CHOP neonatal seizure pathway.', cite: [6] }),
];

function neoDoseLine(d: NeoDrugDef, w: number): DoseLine {
  const lo = Array.isArray(d.perKg) ? d.perKg[0] : d.perKg;
  const hi = Array.isArray(d.perKg) ? d.perKg[1] : d.perKg;
  const out: DoseLine = { dose: `${range(fmtAmount(lo * w, d.whole), fmtAmount(hi * w, d.whole))} ${d.unit}` };
  if (d.conc) out.ml = `${range(fmtMl((lo * w) / d.conc.perMl), fmtMl((hi * w) / d.conc.perMl))} mL`;
  return out;
}

function neoBasis(d: NeoDrugDef): string {
  const k = Array.isArray(d.perKg) ? `${kgText(d.perKg[0])}-${kgText(d.perKg[1])}` : kgText(d.perKg);
  return `${k} ${d.basisUnit ?? `${d.unit}/kg`}`;
}

/** Drug rows for the Drugs tab (resuscitation) and After ROSC tab (first doses). Per-kg text when no weight is entered. */
export function neoDrugRows(p: NeoPatient, tab?: 'drugs' | 'rosc'): NeoRow[] {
  const rows: NeoRow[] = [];
  for (const d of NEO_DRUGS) {
    if (tab && d.tab !== tab) continue;
    const basis = neoBasis(d);
    const lines: DoseLine[] = p.weightKg !== undefined ? [neoDoseLine(d, p.weightKg)] : [{ dose: basis }];
    rows.push({ id: d.id, name: d.name, indication: d.indication, route: d.route, lines, basis, capped: false, conc: d.conc?.label, notes: d.notes, cite: d.cite });
    if (d.id === 'epi-iv') rows.push({ id: 'epi-flush', name: 'NS flush after IV/IO/UVC epinephrine', lines: [{ dose: '3 mL', ml: '3 mL' }], basis: 'Fixed volume regardless of weight', capped: false, cite: [1] });
  }
  if (!tab || tab === 'drugs') {
    rows.push({ id: 'naloxone', name: 'Naloxone', indication: 'Delivery-room resuscitation', lines: [{ dose: 'Not recommended' }], basis: 'Ventilate; do not give naloxone in the delivery room.', capped: false, cite: [1], warn: 'NOT RECOMMENDED' });
    rows.push({ id: 'bicarb', name: 'Sodium bicarbonate', indication: 'Delivery-room resuscitation', lines: [{ dose: 'Not recommended' }], basis: 'Not part of routine neonatal resuscitation.', capped: false, cite: [1], warn: 'NOT RECOMMENDED' });
  }
  return rows;
}

export interface NeoHeader { title: string; line: string; source: string; flags: string[] }

export function neoHeader(p: NeoPatient): NeoHeader {
  const parts: string[] = ['NEONATE'];
  if (p.weightKg !== undefined) parts.push(`${fmtAmount(p.weightKg)} kg`);
  if (p.gaWeeks !== undefined) parts.push(`${p.gaWeeks} wk`);
  if (p.gaWeeks !== undefined) parts.push(p.gaWeeks < 37 ? 'preterm' : 'term');
  else if (p.weightKg === undefined) parts.push('weight or GA needed');
  const flags: string[] = [];
  if (p.weightKg === undefined) flags.push('Enter a weight for mg and mL doses');
  if (p.weightKg !== undefined && p.weightKg >= 3) flags.push('3 kg or more: values shown are the 3 kg and over band');
  if (p.ageMonths !== undefined) flags.push(`Age ${fmtAmount(p.ageMonths * 30.4375)} days`);
  const bi = neoBandIndex(p);
  const source = bi >= 0 ? `Sizing band: ${NEO_BANDS[bi].label}${p.weightKg === undefined ? ' (from gestational age)' : ''}.` : 'Enter a weight (1.8kg or 1800g), a gestational age (32wk), or both.';
  return { title: parts[0], line: parts.slice(1).join(' · '), source, flags };
}

const SPO2_TARGETS = '1 min 60-65%, 2 min 65-70%, 3 min 70-75%, 4 min 75-80%, 5 min 80-85%, 10 min 85-95%';

export function neoTabs(p: NeoPatient): Record<NeoTab, NeoTabContent> {
  const airway: NeoTabContent = { notes: ['Confirm with exhaled CO2 detector and a rising heart rate. Limit each intubation attempt to 30 seconds. [1]', 'Depth is at the lip. [2]'], rows: neoAirwayRows(p) };
  const uvc = p.weightKg !== undefined ? (p.weightKg < 1.5 ? '3.5 Fr' : '5 Fr') : '3.5 Fr if under 1.5 kg; 5 Fr otherwise';
  const breathe: NeoTabContent = {
    notes: ['Ventilation is the priority. Corrective steps: MR SOPA (mask, reposition, suction, open mouth, pressure, alternative airway). [1]'],
    rows: [
      nrow('ppv', 'Positive pressure ventilation', '30-60 /min', 'Start if apneic or gasping, or HR below 100 after initial steps.', [1]),
      nrow('pip', 'Initial peak inflation pressure', '20-30 cm H2O', 'Higher only if the heart rate does not rise. PEEP 5 cm H2O.', [1]),
      nrow('fio2', 'Starting oxygen', neoFio2(p.gaWeeks), 'Titrate to the right-hand (preductal) SpO2.', [1], p.gaWeeks === undefined ? 'Enter gestational age to show one band.' : undefined),
      nrow('spo2', 'Preductal SpO2 targets', SPO2_TARGETS, 'Right hand or wrist.', [1, 4]),
      nrow('si', 'Sustained inflation', 'Not recommended', 'Inflations longer than 5 seconds are not recommended in preterm infants.', [1], undefined, { warn: 'NOT RECOMMENDED' }),
      nrow('cord', 'Cord management', 'Defer clamping 60 s or more', 'Vigorous infants. Intact cord milking only at 28+0 to 36+6 wk when deferral is not possible; not under 28 wk.', [1]),
    ],
  };
  const circulate: NeoTabContent = {
    notes: ['Secure the airway first (ETT or laryngeal mask) if compressions are needed. [1]'],
    rows: [
      nrow('cpr', 'Chest compressions', '3:1 (90 + 30 /min)', 'If HR is below 60 after 30 s of ventilation that moves the chest. Two-thumb encircling, depth one third of AP diameter.', [1]),
      nrow('cpr-o2', 'Oxygen during compressions', '100%', 'Then titrate down after ROSC.', [1]),
      nrow('access', 'Vascular access', 'UVC (preferred) or IO', 'Emergency low-lying UVC: insert 2-4 cm past the skin until free blood return.', [1, 4]),
      nrow('uvc', 'UVC size', uvc, 'Catheter size by weight.', [3]),
    ],
  };
  const drugs: NeoTabContent = { notes: p.weightKg === undefined ? ['Enter a weight for mg and mL doses; per-kg doses are shown until then.'] : ['Concentration for epinephrine: 0.1 mg/mL (1:10,000). Confirm against your stock. [1]'], rows: neoDrugRows(p, 'drugs') };
  const rosc: NeoTabContent = {
    notes: ['First doses only. Intervals for preterm infants: per pharmacy/Neofax.'],
    rows: [
      nrow('temp', 'Temperature', '36.5-37.5 C', 'Avoid both hypothermia and hyperthermia.', [1]),
      nrow('glucose', 'Glucose', 'Check early', 'Treat low glucose with D10 (see Drugs).', [1, 4]),
      nrow('cool', 'Therapeutic hypothermia', 'Refer', '36 wk or more with moderate to severe encephalopathy, within 6 hours, under NICU conditions.', [1, 4]),
      ...neoDrugRows(p, 'rosc'),
      nrow('stop', 'Stopping', 'About 20 min', 'If all resuscitation steps are completed and no heart rate is detected by about 20 minutes, redirection of care may be discussed with the team and family.', [1]),
    ],
  };
  return { airway, breathe, circulate, drugs, rosc };
}

// ---- Neonate search

const NEO_PIECES: Record<string, (p: NeoPatient) => string | null> = {
  ett: p => { const bi = neoBandIndex(p); return bi >= 0 ? `ETT ${NEO_BANDS[bi].ett} uncuffed` : 'ETT 2.5 (<1 kg), 3.0 (1-<2 kg), 3.5 (2-<3 kg)'; },
  depth: p => {
    if (p.gaWeeks !== undefined) return `depth ${one1(kempleyDepthByGa(p.gaWeeks))} cm at lip`;
    if (p.weightKg !== undefined) return `depth ${one1(weightPlus6(p.weightKg))} cm at lip`;
    return 'depth by GA (Kempley) or weight + 6 cm';
  },
  blade: p => { const bi = neoBandIndex(p); return bi >= 0 ? `blade ${NEO_BANDS[bi].blade}` : 'blade 00 / 0 / 0-1 / 1 by weight'; },
  lma: p => `LMA ${neoLma(p).text}`,
  uvc: p => `UVC ${p.weightKg !== undefined ? (p.weightKg < 1.5 ? '3.5 Fr' : '5 Fr') : '3.5 Fr if under 1.5 kg, 5 Fr otherwise'}, 2-4 cm past skin`,
  epi: p => { const r = neoDrugRows(p, 'drugs').find(x => x.id === 'epi-iv'); return r ? `Epinephrine IV/IO/UVC ${r.lines[0].dose}${r.lines[0].ml ? ` (${r.lines[0].ml} of 0.1 mg/mL)` : ' of 0.1 mg/mL'}, then 3 mL NS flush` : null; },
  volume: p => { const r = neoDrugRows(p, 'drugs').find(x => x.id === 'volume'); return r ? `Volume ${r.lines[0].dose}` : null; },
  d10: p => { const r = neoDrugRows(p, 'drugs').find(x => x.id === 'd10'); return r ? `D10 ${r.lines[0].dose}` : null; },
  ppv: p => `PPV 30-60 /min, PIP 20-30, FiO2 ${neoFio2(p.gaWeeks)}`,
  cpr: () => 'CPR 3:1, 90 compressions + 30 inflations /min',
};

interface NeoTarget { re: RegExp; tab: NeoTab; pieces: string[] }
const NEO_TARGETS: NeoTarget[] = [
  { re: /\b(?:uvc|umbilical)\b/, tab: 'circulate', pieces: ['uvc', 'epi'] },
  { re: /\bdepth\b/, tab: 'airway', pieces: ['depth', 'ett'] },
  { re: /\b(?:ett|et\s*tube|endotracheal|intubat\w*|(?<!chest\s)(?<!ng\s)(?<!og\s)tube)\b/, tab: 'airway', pieces: ['ett', 'depth'] },
  { re: /\bblade\b|\blaryngoscope\b/, tab: 'airway', pieces: ['blade', 'ett'] },
  { re: /\blma\b|\blaryngeal\s*mask\b/, tab: 'airway', pieces: ['lma', 'ett'] },
  { re: /\b(?:epi|epinephrine|adrenaline)\b/, tab: 'drugs', pieces: ['epi'] },
  { re: /\b(?:volume|bolus|saline)\b/, tab: 'drugs', pieces: ['volume'] },
  { re: /\b(?:dextrose|d10)\b/, tab: 'drugs', pieces: ['d10'] },
  { re: /\b(?:ppv|ventilat\w*|fio2|oxygen)\b/, tab: 'breathe', pieces: ['ppv'] },
  { re: /\b(?:cpr|compressions?)\b/, tab: 'circulate', pieces: ['cpr', 'epi'] },
  { re: /\b(?:dose|doses|drugs?|numbers|resus\w*)\b/, tab: 'drugs', pieces: ['ett', 'depth', 'epi'] },
];

const NEO_TEAL = '#0F766E';

function neoRoute(p: NeoPatient, tab: NeoTab): string {
  const params: string[] = [];
  if (p.weightKg !== undefined) params.push(`q=${encodeURIComponent(`${kgText(p.weightKg)}kg`)}`);
  if (p.gaWeeks !== undefined) params.push(`ga=${p.gaWeeks}`);
  params.push(`tab=${tab}`);
  return `/calculator/neo-numbers?${params.join('&')}`;
}

function neoCard(p: NeoPatient, pieces: string[], tab: NeoTab): PediSearchAnswer {
  const h = neoHeader(p);
  const known = p.weightKg !== undefined || p.gaWeeks !== undefined;
  return {
    title: known ? `${h.title} · ${h.line}` : 'Neonate Numbers (<3 kg)',
    subtitle: pieces.length ? `${pieces.slice(0, 3).join(' · ')} [1][3]` : 'Tube, depth, ventilation, epinephrine and first doses by weight and gestational age',
    preview: 'Neonate Numbers: tap for airway, drugs and doses',
    route: neoRoute(p, tab), bgHex: NEO_TEAL, textHex: '#fff', pointer: false,
  };
}

/** Teal neonate card for a Home search query, or null (not a neonate-numbers question). */
export function neoSearchAnswer(query: string): PediSearchAnswer | null {
  const q = (query ?? '').toLowerCase().trim();
  if (q.length < 3) return null;
  const input = parseInput(q);
  const p = neoPatientFrom(input);
  const uvc = /\b(?:uvc|umbilical\s*(?:vein|venous|line|catheter))\b/.test(q);
  const signal = uvc || input.newborn === true || p.gaWeeks !== undefined || (p.weightKg !== undefined && p.weightKg < 3) || (p.ageMonths !== undefined && p.ageMonths < 1);
  if (!signal) return null;
  const hits = NEO_TARGETS.map(t => ({ t, i: t.re.exec(q)?.index ?? -1 })).filter(h => h.i >= 0).sort((a, b) => a.i - b.i);
  if (hits.length === 0) return null;
  const pieces: string[] = [];
  for (const h of hits) for (const k of h.t.pieces) { const txt = NEO_PIECES[k](p); if (txt && !pieces.includes(txt)) pieces.push(txt); }
  return neoCard(p, pieces, hits[0].t.tab);
}

// ===================================================================
// Home search: pediatric numbers answer
// ===================================================================

export interface PediSearchAnswer {
  title: string;
  subtitle: string;
  preview: string;
  route: string;
  bgHex: string;
  textHex: string;
  /** true when the query had no age or weight (pointer to the tool) */
  pointer: boolean;
}

interface Target { re: RegExp; tab: PediTab | 'zone'; pieces: string[] }

const TARGETS: Target[] = [
  { re: /\bchest\s*tube|\bthoracostomy\b/, tab: 'tubes', pieces: ['size:chest'] },
  { re: /\b(?:ng|og|ngt|ogt|nasogastric|orogastric)\b/, tab: 'tubes', pieces: ['size:ng'] },
  { re: /\bfoley\b/, tab: 'tubes', pieces: ['size:foley'] },
  { re: /\b(?:iv|angiocath)\s*(?:size|gauge)\b|\bgauge\b/, tab: 'tubes', pieces: ['size:iv'] },
  { re: /\b(?:ett|et\s*tube|endotracheal|intubat\w*|(?<!chest\s)(?<!ng\s)(?<!og\s)tube)\b/, tab: 'airway', pieces: ['size:ett', 'size:depth'] },
  { re: /\bdepth\b/, tab: 'airway', pieces: ['size:depth', 'size:ett'] },
  { re: /\bblade\b|\blaryngoscope\b/, tab: 'airway', pieces: ['size:blade', 'size:ett'] },
  { re: /\blma\b/, tab: 'airway', pieces: ['size:lma', 'size:ett'] },
  { re: /\b(?:epi|epinephrine|adrenaline)\b/, tab: 'arrest', pieces: ['drug:epi-ivio'] },
  { re: /\badenosine\b/, tab: 'arrest', pieces: ['drug:adenosine'] },
  { re: /\bamiodarone\b/, tab: 'arrest', pieces: ['drug:amiodarone'] },
  { re: /\batropine\b/, tab: 'arrest', pieces: ['drug:atropine'] },
  { re: /\blidocaine\b/, tab: 'arrest', pieces: ['drug:lidocaine'] },
  { re: /\b(?:defib\w*|joules?|shock\s*dose)\b/, tab: 'arrest', pieces: ['drug:defib'] },
  { re: /\bcardiover\w*\b/, tab: 'arrest', pieces: ['drug:cardiovert'] },
  { re: /\b(?:bolus|fluids?)\b/, tab: 'shock', pieces: ['drug:bolus'] },
  { re: /\b(?:vitals?|hypotension|normal\s*(?:hr|rr|bp))\b/, tab: 'shock', pieces: ['vital:vital-hr', 'vital:vital-rr', 'vital:vital-sbp'] },
  { re: /\bketamine\b/, tab: 'rsi', pieces: ['drug:ketamine'] },
  { re: /\b(?:roc|rocuronium)\b/, tab: 'rsi', pieces: ['drug:rocuronium'] },
  { re: /\b(?:sux|succinylcholine)\b/, tab: 'rsi', pieces: ['drug:succinylcholine'] },
  { re: /\brsi\b/, tab: 'rsi', pieces: ['drug:ketamine', 'drug:rocuronium'] },
  { re: /\b(?:seizures?|seizing|status)\b/, tab: 'seizure', pieces: ['drug:midazolam-imin', 'drug:lorazepam'] },
  { re: /\b(?:ativan|lorazepam)\b/, tab: 'seizure', pieces: ['drug:lorazepam'] },
  { re: /\b(?:keppra|levetiracetam)\b/, tab: 'seizure', pieces: ['drug:levetiracetam'] },
  { re: /\b(?:broselow|color|colour|zone|tape)\b/, tab: 'zone', pieces: ['size:ett', 'drug:epi-ivio', 'drug:bolus'] },
];

const POINTER_RE = /\bbroselow\b|\bpedi(?:atric)?s?\s*resus\b|\bpeds?\s*(?:ett|resus|tube|airway)\b|\bpediatric\s*(?:ett|tube)\b/;
const PEDI_TOKEN = /(?<![\w./])(\d+(?:[.,]\d+)?)\s*(years?\s*old|years?|yrs?|y\/o|yo|y|months?\s*old|months?|mos?|m\/o|mths?|kgs?|kilograms?|kilos?|lbs?|pounds?|cm)(?![a-z/])/i;
const AGE_ONLY = /\bage\s*(\d+(?:\.\d+)?)\b(?!\s*(?:kg|cm|mo|m))/;

function pieceText(p: Patient, key: string): string | null {
  const [type, id] = key.split(':');
  if (type === 'size') {
    const eq = equipmentRows(p);
    const row = [...eq.airway, ...eq.tubes].find(r => r.id === id);
    if (!row) return null;
    if (id === 'ett' && p.zone.kind === 'zone') return `ETT ${p.zone.zone.ettCuffed} cuffed (${p.zone.zone.ettUncuffed} uncuffed)`;
    if (id === 'ett') return `ETT ${ADULT_ETT}`;
    if (id === 'depth') return `depth ${row.lines[0].dose} at lip`;
    if (id === 'blade') return `blade ${row.lines[0].dose}`;
    if (id === 'lma') return `LMA ${row.lines[0].dose}`;
    if (id === 'ng') return `NG/OG ${row.lines[0].dose}`;
    if (id === 'foley') return `Foley ${row.lines[0].dose}`;
    if (id === 'chest') return `chest tube ${row.lines[0].dose}`;
    if (id === 'iv') return `IV ${row.lines[0].dose}`;
    return null;
  }
  if (type === 'vital') {
    const row = vitalRows(p).find(r => r.id === id);
    return row ? `${row.name} ${row.lines[0].dose}` : null;
  }
  if (type === 'drug') {
    const row = drugRow(p, id);
    if (!row) return null;
    const first = row.lines.map(l => (l.label ? `${l.label} ` : '') + l.dose + (l.ml ? ` (${l.ml})` : '')).join(', ');
    const showRoute = !['defib', 'cardiovert', 'bolus'].includes(id);
    return `${row.name}${showRoute ? ' ' + row.route : ''} ${first}`.replace(/\s+/g, ' ');
  }
  return null;
}

/** Build the pinned pediatric card for a Home search query, or null (the query is not a pediatric-numbers question). */
export function pediSearchAnswer(query: string): PediSearchAnswer | null {
  const q = (query ?? '').toLowerCase().trim();
  if (q.length < 3) return null;
  const neo = neoSearchAnswer(q);
  if (neo) return neo;
  const hasPointer = POINTER_RE.test(q);
  const tok = PEDI_TOKEN.exec(q);
  let input: ParsedInput = {};
  let token = '';
  if (tok) {
    input = parseInput(tok[0]);
    token = tok[0];
  } else {
    const a = AGE_ONLY.exec(q);
    if (a) { input = parseInput(`${a[1]} yr`); token = `${a[1]}y`; }
  }
  const hasPatient = input.ageMonths !== undefined || input.weightKg !== undefined || input.lengthCm !== undefined;

  if (!hasPatient) {
    if (!hasPointer) return null;
    return {
      title: 'Color Zone Tape (Broselow-equivalent)', subtitle: 'Age, weight or length gives zone, tubes and drug doses', preview: 'Pedi Resus Numbers: tap to open the zone tape',
      route: '/calculator/pedi-zone', bgHex: '#FFD700', textHex: '#000', pointer: true,
    };
  }

  // matched targets, in the order they appear in the query
  const hits = TARGETS.map(t => ({ t, i: t.re.exec(q)?.index ?? -1 })).filter(h => h.i >= 0).sort((a, b) => a.i - b.i);
  if (hits.length === 0 && !hasPointer) return null;

  const p = resolvePatient(input);
  if (!p) return null;
  // Adults and teens belong to the regular search, not to a pediatric-numbers card.
  if (p.zone.kind === 'adult' || (p.ageMonths !== undefined && p.ageMonths >= 156)) return null;

  const compact = tok ? parseInput(tok[0]) : input;
  const unitToken = compact.weightKg !== undefined ? `${fmtAmount(compact.weightKg)}kg` : compact.lengthCm !== undefined ? `${fmtAmount(compact.lengthCm)}cm`
    : compact.ageMonths !== undefined ? (compact.ageMonths < 24 ? `${fmtAmount(compact.ageMonths)}mo` : `${fmtAmount(compact.ageMonths / 12)}y`) : token;

  if (p.zone.kind === 'neonate') return neoCard(neoPatientFrom(input), [], 'airway');
  const pieces: string[] = [];
  for (const h of hits) for (const k of h.t.pieces) { const txt = pieceText(p, k); if (txt && !pieces.includes(txt)) pieces.push(txt); }
  if (pieces.length === 0) for (const k of ['size:ett', 'size:depth', 'drug:epi-ivio']) { const txt = pieceText(p, k); if (txt) pieces.push(txt); }
  const tab = hits.length > 0 && hits[0].t.tab !== 'zone' ? hits[0].t.tab : 'airway';
  const z = p.zone.kind === 'zone' ? p.zone.zone : null;
  return {
    title: headerLine(p),
    subtitle: pieces.slice(0, 3).join(' · '),
    preview: 'Color Zone Tape: tap for every dose and size',
    route: `/calculator/pedi-zone?q=${encodeURIComponent(unitToken)}&tab=${tab}`,
    bgHex: z ? z.bgHex : '#808080', textHex: z ? z.textHex : '#fff', pointer: false,
  };
}
