// Two local anesthetics, one shared limit (added 2026-11-13).
// Local anesthetic toxicity is treated as additive: each drug uses up a share of the limit equal to
// (mg given / that drug's max), and the shares of both drugs together must stay under 100%.
// Max = weight x mg/kg, never above the adult cap. Pure logic is exported for tests. Inputs are never stored.
// Sources: Roberts & Hedges 8th ed. Ch. 30; ASRA LAST practice advisory (Neal 2018); Malamed, Handbook of Local Anesthesia (articaine, mepivacaine).

import type { CalculatorDefinition } from './calculator.js';

export interface LaAgent { id: number; name: string; mgPerKg: number; capMg: number; }

// Option value (points) → agent. Order matches the select options below.
export const LA_AGENTS: LaAgent[] = [
  { id: 1, name: 'Lidocaine (plain)', mgPerKg: 4.5, capMg: 300 },
  { id: 2, name: 'Lidocaine with epinephrine', mgPerKg: 7, capMg: 500 },
  { id: 3, name: 'Bupivacaine (plain)', mgPerKg: 2.5, capMg: 175 },
  { id: 4, name: 'Bupivacaine with epinephrine', mgPerKg: 3, capMg: 225 },
  { id: 5, name: 'Ropivacaine', mgPerKg: 3, capMg: 200 },
  { id: 6, name: 'Mepivacaine', mgPerKg: 4.4, capMg: 400 },
  { id: 7, name: 'Articaine with epinephrine (dental)', mgPerKg: 7, capMg: 500 },
];
export const agentOf = (id: number): LaAgent | null => LA_AGENTS.find((a) => a.id === id) || null;

// Max mg for one agent alone: weight-based, never above the adult cap.
export function agentMaxMg(a: LaAgent, weightKg: number): { mg: number; capped: boolean } {
  const byWeight = weightKg * a.mgPerKg;
  return byWeight > a.capMg ? { mg: a.capMg, capped: true } : { mg: byWeight, capped: false };
}

export interface LaComboInput {
  weightKg: number;
  agent1: number; mgPerMl1: number; ml1: number; // ml = 0 → not entered
  agent2: number; mgPerMl2: number; ml2: number;
}
export interface LaComboResult {
  mode: 'incomplete' | 'split' | 'remaining' | 'total';
  max1: number; max2: number; capped1: boolean; capped2: boolean;
  maxMl1: number; maxMl2: number;
  used: number;           // fraction of the shared limit used (0-1+)
  remainingMg2: number;   // 'remaining' mode: mg of drug 2 still allowed
  remainingMl2: number;
  splitMl1: number; splitMl2: number; // 'split' mode: each drug at half its own max
}

const r1 = (x: number) => Math.round(x * 10) / 10;

export function laCombo(i: LaComboInput): LaComboResult {
  const a1 = agentOf(i.agent1);
  const a2 = agentOf(i.agent2);
  const empty: LaComboResult = { mode: 'incomplete', max1: 0, max2: 0, capped1: false, capped2: false, maxMl1: 0, maxMl2: 0, used: 0, remainingMg2: 0, remainingMl2: 0, splitMl1: 0, splitMl2: 0 };
  if (!a1 || !a2 || !(i.weightKg > 0) || !(i.mgPerMl1 > 0) || !(i.mgPerMl2 > 0)) return empty;
  const m1 = agentMaxMg(a1, i.weightKg);
  const m2 = agentMaxMg(a2, i.weightKg);
  const base = { ...empty, max1: m1.mg, max2: m2.mg, capped1: m1.capped, capped2: m2.capped, maxMl1: m1.mg / i.mgPerMl1, maxMl2: m2.mg / i.mgPerMl2 };
  const f1 = i.ml1 > 0 ? (i.ml1 * i.mgPerMl1) / m1.mg : 0;
  const f2 = i.ml2 > 0 ? (i.ml2 * i.mgPerMl2) / m2.mg : 0;
  if (i.ml1 > 0 && i.ml2 > 0) return { ...base, mode: 'total', used: f1 + f2 };
  if (i.ml1 > 0 || i.ml2 > 0) {
    // One drug entered: what is left of the limit goes to the other one. Reported as drug 2 when drug 1 was entered, and vice versa.
    const used = f1 + f2;
    const left = Math.max(0, 1 - used);
    const other = i.ml1 > 0 ? { max: m2.mg, conc: i.mgPerMl2 } : { max: m1.mg, conc: i.mgPerMl1 };
    return { ...base, mode: 'remaining', used, remainingMg2: left * other.max, remainingMl2: (left * other.max) / other.conc };
  }
  return { ...base, mode: 'split', splitMl1: base.maxMl1 / 2, splitMl2: base.maxMl2 / 2 };
}

const AGENT_OPTIONS = LA_AGENTS.map((a) => ({ label: `${a.name}: ${a.mgPerKg} mg/kg, max ${a.capMg} mg`, points: a.id }));
// Option value = mg/mL x 10.
const CONC_OPTIONS = [
  { label: '1% (10 mg/mL)', points: 100 },
  { label: '2% (20 mg/mL)', points: 200 },
  { label: '0.25% (2.5 mg/mL)', points: 25 },
  { label: '0.5% (5 mg/mL)', points: 50 },
  { label: '0.75% (7.5 mg/mL)', points: 75 },
  { label: '0.2% (2 mg/mL)', points: 20 },
  { label: '1.5% (15 mg/mL)', points: 150 },
  { label: '3% (30 mg/mL)', points: 300 },
  { label: '4% (40 mg/mL)', points: 400 },
];

const LAST = 'Suspected toxicity (perioral numbness, tinnitus, confusion, seizure, arrhythmia): stop injecting, call for help, airway and oxygen, benzodiazepine for seizures, and give 20% lipid emulsion (LAST Rescue tool).';

export const LA_COMBO_CALCULATOR: CalculatorDefinition = {
  id: 'la-combo-max',
  title: 'Two Local Anesthetics: Combined Max',
  subtitle: 'Toxicity adds up across both drugs',
  description: 'For giving two local anesthetics in one session. Toxicity is treated as additive: each drug uses a share of one shared limit equal to the mg given divided by that drug’s own max, and both shares together must stay under 100%. Leave the volumes blank to see an even split; enter the volume of one drug to see how much of the other you can still give; enter both to check the total.',
  fields: [
    { name: 'weight', label: 'Patient Weight', type: 'number', points: 0, valueIsPoints: true, unit: 'kg', description: 'Use lean or ideal body weight in obesity' },
    { name: 'agent1', label: 'Drug 1', type: 'select', points: 0, hideOptionPoints: true, selectOptions: AGENT_OPTIONS },
    { name: 'conc1', label: 'Drug 1 concentration', type: 'select', points: 0, hideOptionPoints: true, selectOptions: CONC_OPTIONS },
    { name: 'ml1', label: 'Drug 1 volume given or planned (optional)', type: 'number', points: 0, valueIsPoints: true, unit: 'mL' },
    { name: 'agent2', label: 'Drug 2', type: 'select', points: 0, hideOptionPoints: true, selectOptions: [AGENT_OPTIONS[2], ...AGENT_OPTIONS.filter((_, i) => i !== 2)] },
    { name: 'conc2', label: 'Drug 2 concentration', type: 'select', points: 0, hideOptionPoints: true, selectOptions: [CONC_OPTIONS[3], ...CONC_OPTIONS.filter((_, i) => i !== 3)] },
    { name: 'ml2', label: 'Drug 2 volume given or planned (optional)', type: 'number', points: 0, valueIsPoints: true, unit: 'mL' },
  ],
  results: [],
  thresholdNote: 'The limit is a ceiling, not a target: use the smallest effective volume, aspirate before every injection, and inject slowly. Risk is higher in the elderly, in heart, liver or kidney disease, in pregnancy, and in very vascular sites (face, scalp, intercostal).',
  citations: [
    'Roberts JR, Custalow CB, Thomsen TW, eds. Roberts and Hedges’ Clinical Procedures in Emergency Medicine and Acute Care. 8th ed. Elsevier; 2023. Ch. 30, Local and Topical Anesthesia.',
    'Neal JM, Barrington MJ, Fettiplace MR, et al. The Third American Society of Regional Anesthesia and Pain Medicine Practice Advisory on Local Anesthetic Systemic Toxicity: Executive Summary 2017. Reg Anesth Pain Med. 2018;43(2):113-123.',
    'Malamed SF. Handbook of Local Anesthesia. 7th ed. Elsevier; 2019. Ch. 4, Clinical Action of Specific Agents (articaine, mepivacaine maximum doses).',
  ],
  computeResult: (values: Record<string, number>) => {
    const i: LaComboInput = {
      weightKg: values['weight'] || 0,
      agent1: values['agent1'] || 0, mgPerMl1: (values['conc1'] || 0) / 10, ml1: values['ml1'] || 0,
      agent2: values['agent2'] || 0, mgPerMl2: (values['conc2'] || 0) / 10, ml2: values['ml2'] || 0,
    };
    const r = laCombo(i);
    const a1 = agentOf(i.agent1);
    const a2 = agentOf(i.agent2);
    if (r.mode === 'incomplete' || !a1 || !a2) {
      return { value: '--', label: 'Enter weight', description: 'Enter the weight and pick both drugs and concentrations.', colorVar: '--color-text-muted' };
    }
    const cap = (c: boolean) => (c ? ' (adult cap)' : '');
    const alone = `**Each drug alone:**\n- ${a1.name}: ${Math.round(r.max1)} mg${cap(r.capped1)} = ${r1(r.maxMl1)} mL at ${i.mgPerMl1} mg/mL\n- ${a2.name}: ${Math.round(r.max2)} mg${cap(r.capped2)} = ${r1(r.maxMl2)} mL at ${i.mgPerMl2} mg/mL`;
    if (r.mode === 'split') {
      return {
        value: `${r1(r.splitMl1)} mL + ${r1(r.splitMl2)} mL`,
        label: 'Even split (half of each max)',
        description: `**Together, an even split:** up to **${r1(r.splitMl1)} mL** of ${a1.name} **plus** up to **${r1(r.splitMl2)} mL** of ${a2.name}.\n\nAny mix works as long as the two shares add up to 100% or less. Enter the volume of one drug to see how much of the other you can still give.\n\n${alone}\n\n${LAST}`,
        colorVar: '--color-primary',
      };
    }
    const pct = Math.round(r.used * 100);
    const colorVar = pct >= 80 ? '--color-danger' : pct >= 50 ? '--color-warning' : '--color-primary';
    const status = pct >= 100 ? 'Over the limit: STOP' : pct >= 80 ? 'At the limit: STOP' : pct >= 50 ? 'Approaching the limit' : 'Well within the limit';
    if (r.mode === 'remaining') {
      const given = i.ml1 > 0 ? { a: a1, ml: i.ml1, conc: i.mgPerMl1 } : { a: a2, ml: i.ml2, conc: i.mgPerMl2 };
      const other = i.ml1 > 0 ? { a: a2, conc: i.mgPerMl2 } : { a: a1, conc: i.mgPerMl1 };
      return {
        value: pct >= 100 ? '0 mL' : `${r1(r.remainingMl2)} mL`,
        label: pct >= 100 ? `No ${other.a.name} left` : `${other.a.name} still allowed`,
        description: `**Already used:** ${given.ml} mL of ${given.a.name} = ${Math.round(given.ml * given.conc)} mg = **${pct}% of the shared limit** (${status.toLowerCase()}).\n\n**Still allowed:** up to **${Math.round(r.remainingMg2)} mg = ${r1(r.remainingMl2)} mL** of ${other.a.name} at ${other.conc} mg/mL.\n\n${alone}\n\n${pct >= 80 ? `**WARNING:** at or over the limit. Do not give more; watch for toxicity. ${LAST}` : LAST}`,
        colorVar,
      };
    }
    return {
      value: `${pct}% of limit`,
      label: status,
      description: `**${a1.name}:** ${i.ml1} mL = ${Math.round(i.ml1 * i.mgPerMl1)} mg = ${Math.round(((i.ml1 * i.mgPerMl1) / r.max1) * 100)}% of its max\n**${a2.name}:** ${i.ml2} mL = ${Math.round(i.ml2 * i.mgPerMl2)} mg = ${Math.round(((i.ml2 * i.mgPerMl2) / r.max2) * 100)}% of its max\n\n**Together: ${pct}% of the shared limit.**\n\n${alone}\n\n${pct >= 80 ? `**WARNING:** at or over the limit. Do not give more; watch for toxicity. ${LAST}` : LAST}`,
      colorVar,
    };
  },
};
