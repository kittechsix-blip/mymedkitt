// Kawasaki disease calculators (added 2026-11-12): criteria checker, incomplete KD algorithm, high-risk screen (Son score),
// coronary artery Z-score classifier, Kawasaki doses. Pure logic is exported for tests. Inputs are ephemeral and never persisted.
// Sources: AHA scientific statement 2017 (McCrindle) and 2024 update (Jone), ACR/Vasculitis Foundation guideline 2021 (Gorelik),
// Son risk score (JAHA 2019), RAISE (Lancet 2012), KIDCARE (Lancet Child Adolesc Health 2021).

import type { CalculatorDefinition } from './calculator.js';

const AHA17 = 'McCrindle BW, Rowley AH, Newburger JW, et al. Diagnosis, treatment, and long-term management of Kawasaki disease: a scientific statement for health professionals from the American Heart Association. Circulation. 2017;135(17):e927-e999.';
const AHA24 = 'Jone PN, Tremoulet A, Choueiter N, et al. Update on diagnosis and management of Kawasaki disease: a scientific statement from the American Heart Association. Circulation. 2024;150(23):e481-e500.';
const ACR = 'Gorelik M, Chung SA, Ardalan K, et al. 2021 American College of Rheumatology/Vasculitis Foundation guideline for the management of Kawasaki disease. Arthritis Rheumatol. 2022;74(4):586-596.';
const SON = 'Son MBF, Gauvreau K, Tremoulet AH, et al. Risk model development and validation for prediction of coronary artery aneurysms in Kawasaki disease in a North American population. J Am Heart Assoc. 2019;8(11):e011319.';
const RAISE = 'Kobayashi T, Saji T, Otani T, et al. Efficacy of immunoglobulin plus prednisolone for prevention of coronary artery abnormalities in severe Kawasaki disease (RAISE study). Lancet. 2012;379(9826):1613-1620.';
const KIDCARE = 'Burns JC, Roberts SC, Tremoulet AH, et al. Infliximab versus second intravenous immunoglobulin for treatment of resistant Kawasaki disease in the USA (KIDCARE). Lancet Child Adolesc Health. 2021;5(12):852-861.';

const TREAT = 'IVIG 2 g/kg over 8-12 hours plus aspirin. Do not wait for the echocardiogram; get it at diagnosis.';

// ---------------------------------------------------------------------------
// Criteria checker (complete vs incomplete)
// ---------------------------------------------------------------------------

export interface KdCriteriaInput {
  feverDays: number;      // -1 = not entered
  features: number;       // 0-5 principal clinical features
  infant: boolean;        // infant with fever and no other explanation
  alternative: boolean;   // any feature suggesting another diagnosis
}
export type KdCriteria = 'incomplete-input' | 'complete' | 'incomplete-kd' | 'too-early' | 'unlikely';

export function kdCriteria(i: KdCriteriaInput): KdCriteria {
  if (!Number.isFinite(i.feverDays) || i.feverDays <= 0) return 'incomplete-input';
  if (i.features >= 4 && i.feverDays >= 4) return 'complete';
  if (i.feverDays >= 5 && i.features >= 2) return 'incomplete-kd';
  if (i.infant && i.feverDays >= 7) return 'incomplete-kd';
  if (i.feverDays < 5) return 'too-early';
  return 'unlikely';
}

const FEATURES = [
  { name: 'lips', label: 'Lips and mouth', description: 'Red, cracked lips; strawberry tongue; red mouth or throat' },
  { name: 'eyes', label: 'Eyes', description: 'Both eyes red (bulbar conjunctival injection), no pus' },
  { name: 'rash', label: 'Rash', description: 'Polymorphous rash (maculopapular, diffuse erythroderma, or erythema multiforme-like)' },
  { name: 'extremities', label: 'Hands and feet', description: 'Red, swollen hands or feet acutely, or peeling around the nails later' },
  { name: 'nodes', label: 'Neck node', description: 'Cervical lymph node 1.5 cm or larger, usually one side' },
];

export const KAWASAKI_CRITERIA_CALCULATOR: CalculatorDefinition = {
  id: 'kawasaki-criteria',
  title: 'Kawasaki Criteria Checker',
  subtitle: 'Fever days + 5 clinical features → complete, incomplete, or not yet',
  description: 'Complete Kawasaki disease: fever for at least 5 days plus at least 4 of the 5 principal features (experienced clinicians may diagnose it on day 4 of fever when 4 or more features are present). Incomplete Kawasaki disease: fever for at least 5 days with 2 or 3 features, or an infant with fever for 7 days or more and no other explanation. The features need not all be present at the same time: ask about ones that have come and gone.',
  fields: [
    { name: 'fever', label: 'Days of fever (day 1 = first day of fever)', type: 'number', points: 0, valueIsPoints: true, unit: 'days' },
    ...FEATURES.map((f) => ({ name: f.name, label: f.label, description: f.description, type: 'toggle' as const, points: 1 })),
    { name: 'infant', label: 'Infant with fever and no other explanation', description: 'The 7-day infant rule; infants under 6 months are at highest risk of aneurysms', type: 'toggle', points: 1 },
    { name: 'alt', label: 'Features that suggest another diagnosis', description: 'Pus in the eyes or throat, mouth ulcers, blisters or vesicles, widespread lymph nodes, big spleen', type: 'toggle', points: 1 },
  ],
  results: [],
  thresholdNote: 'Differentials: viral infection (adenovirus, measles, EBV), scarlet fever and toxic shock, drug reactions and Stevens-Johnson syndrome, MIS-C, systemic juvenile arthritis, and deep neck infection not responding to antibiotics.',
  citations: [AHA17, AHA24],
  computeResult: (values: Record<string, number>) => {
    const features = FEATURES.reduce((n, f) => n + ((values[f.name] || 0) > 0 ? 1 : 0), 0);
    const feverDays = values['fever'] === undefined || values['fever'] === null ? NaN : values['fever'];
    const alt = (values['alt'] || 0) > 0;
    const c = kdCriteria({ feverDays, features, infant: (values['infant'] || 0) > 0, alternative: alt });
    const altNote = alt ? '\n\n**Another diagnosis is more likely** with these features (pus in eyes or throat, ulcers, blisters, widespread nodes, big spleen). Look for it before labeling Kawasaki.' : '';
    if (c === 'incomplete-input') return { value: '--', label: 'Enter the days of fever', description: `${features} of 5 features selected.`, colorVar: '--color-text-muted' };
    if (c === 'complete') return { value: 'Complete Kawasaki', label: `${features} of 5 features, fever day ${feverDays}`, description: `**Treat now:** ${TREAT}${feverDays === 4 ? '\n\nDay 4 diagnosis is for clinicians experienced with Kawasaki disease; discuss with pediatrics or cardiology.' : ''}${altNote}`, colorVar: '--color-danger' };
    if (c === 'incomplete-kd') return { value: 'Possible incomplete Kawasaki', label: `${features} of 5 features, fever day ${feverDays}`, description: `**Next:** CRP and ESR, then the incomplete Kawasaki algorithm (supplemental labs and echocardiogram).${altNote}`, colorVar: '--color-warning' };
    if (c === 'too-early') return { value: 'Not yet', label: `Fever day ${feverDays}, ${features} of 5 features`, description: `Criteria need 5 days of fever (4 with 4 or more features). If the fever continues, re-examine daily: features come and go. Infants with prolonged unexplained fever need a low threshold.${altNote}`, colorVar: '--color-primary' };
    return { value: 'Kawasaki unlikely', label: `Fever day ${feverDays}, ${features} of 5 features`, description: `Too few features for Kawasaki. Reassess if the fever continues or new features appear; an infant with 7 or more days of unexplained fever enters the incomplete pathway.${altNote}`, colorVar: '--color-primary' };
  },
};

// ---------------------------------------------------------------------------
// Incomplete Kawasaki algorithm (AHA 2017 Figure 3)
// ---------------------------------------------------------------------------

/** echo: -1 = not done, 1 = positive, 0 = negative. crp in mg/dL, esr in mm/h (NaN = not entered). */
export interface IncompleteKdInput { crp: number; esr: number; supplemental: number; echo: number; peeling: boolean }
export type IncompleteKdAction = 'need-labs' | 'treat-labs' | 'treat-echo' | 'echo' | 'echo-negative' | 'reassess' | 'echo-peeling';

export function incompleteKd(i: IncompleteKdInput): IncompleteKdAction {
  // An empty number box reads 0, so 0 counts as not entered.
  const haveCrp = Number.isFinite(i.crp) && i.crp > 0;
  const haveEsr = Number.isFinite(i.esr) && i.esr > 0;
  if (!haveCrp && !haveEsr) return 'need-labs';
  const high = (haveCrp && i.crp >= 3) || (haveEsr && i.esr >= 40);
  if (!high) {
    if (i.echo === 1) return 'treat-echo';
    if (i.peeling) return 'echo-peeling';
    if (!haveCrp || !haveEsr) return 'need-labs';
    return 'reassess';
  }
  if (i.supplemental >= 3) return 'treat-labs';
  if (i.echo === 1) return 'treat-echo';
  if (i.echo === 0) return 'echo-negative';
  return 'echo';
}

const SUPP = [
  { name: 'anemia', label: 'Anemia for age' },
  { name: 'plt', label: 'Platelets 450,000 or more after day 7 of fever' },
  { name: 'alb', label: 'Albumin 3.0 g/dL or less' },
  { name: 'alt', label: 'Raised ALT' },
  { name: 'wbc', label: 'WBC 15,000 or more' },
  { name: 'urine', label: 'Urine 10 or more WBC per high-power field' },
];

export const KAWASAKI_INCOMPLETE_CALCULATOR: CalculatorDefinition = {
  id: 'kawasaki-incomplete',
  title: 'Incomplete Kawasaki Algorithm',
  subtitle: 'CRP/ESR → supplemental labs → treat before echo, echo, or recheck',
  description: 'For fever 5 days or more with 2 or 3 features, or an infant with 7 days or more of unexplained fever (AHA 2017, unchanged in AHA 2024). CRP 3.0 mg/dL or more and/or ESR 40 mm/h or more moves to the supplemental labs: 3 or more of the 6 means treat now, without waiting for the echocardiogram. Otherwise the echocardiogram decides. Positive echo: LAD or RCA Z-score 2.5 or more, a coronary aneurysm, or 3 or more suggestive features (decreased LV function, mitral regurgitation, pericardial effusion, LAD or RCA Z-score 2 to 2.5).',
  fields: [
    { name: 'crp', label: 'CRP', type: 'number', points: 0, valueIsPoints: true, unit: 'mg/dL' },
    { name: 'esr', label: 'ESR', type: 'number', points: 0, valueIsPoints: true, unit: 'mm/h' },
    ...SUPP.map((s) => ({ name: s.name, label: s.label, type: 'toggle' as const, points: 1 })),
    {
      name: 'echo', label: 'Echocardiogram', type: 'select', points: 0, hideOptionPoints: true,
      selectOptions: [
        { label: 'Not done yet', points: -1 },
        { label: 'Positive', points: 1 },
        { label: 'Negative', points: 0 },
      ],
    },
    { name: 'peeling', label: 'Typical peeling of fingers or toes has started', type: 'toggle', points: 1 },
  ],
  results: [],
  thresholdNote: 'CRP units: 3.0 mg/dL = 30 mg/L. Treat within 10 days of fever onset, or after day 10 if fever, coronary changes or high inflammatory markers persist. A normal echocardiogram does not exclude Kawasaki disease (AHA 2024).',
  citations: [AHA17, AHA24],
  computeResult: (values: Record<string, number>) => {
    const num = (k: string) => (values[k] === undefined || values[k] === null || Number.isNaN(values[k]) ? NaN : values[k]);
    const supplemental = SUPP.reduce((n, s) => n + ((values[s.name] || 0) > 0 ? 1 : 0), 0);
    const a = incompleteKd({ crp: num('crp'), esr: num('esr'), supplemental, echo: values['echo'] ?? -1, peeling: (values['peeling'] || 0) > 0 });
    const s = `${supplemental} of 6 supplemental labs`;
    switch (a) {
      case 'need-labs': return { value: '--', label: 'Enter CRP and ESR', description: 'Both are needed to call inflammation low (CRP under 3.0 mg/dL and ESR under 40 mm/h). Either one high is enough to move on.', colorVar: '--color-text-muted' };
      case 'treat-labs': return { value: 'Treat now, before the echo', label: `High inflammation, ${s}`, description: `**${TREAT}**\n\nThree or more supplemental labs with high CRP/ESR is enough to treat. The echocardiogram is still done, but it does not delay IVIG and aspirin.`, colorVar: '--color-danger' };
      case 'treat-echo': return { value: 'Treat: echo positive', label: 'Positive echocardiogram', description: `**${TREAT}**`, colorVar: '--color-danger' };
      case 'echo': return { value: 'Get the echo now', label: `High inflammation, ${s}`, description: 'Fewer than 3 supplemental labs: the echocardiogram decides. Positive echo: treat. Negative echo with ongoing fever: repeat it or ask a Kawasaki expert.', colorVar: '--color-warning' };
      case 'echo-negative': return { value: 'Echo negative: keep watching', label: `High inflammation, ${s}`, description: 'If the fever continues, repeat the echocardiogram or consult a Kawasaki expert (pediatric cardiology or rheumatology). A normal echo does not exclude Kawasaki disease. Recheck the labs: supplemental labs often appear later (platelets rise after day 7).', colorVar: '--color-warning' };
      case 'echo-peeling': return { value: 'Get the echo', label: 'Typical peeling', description: 'Low inflammatory markers, but typical peeling has appeared: get an echocardiogram and treat if it is positive.', colorVar: '--color-warning' };
      default: return { value: 'Recheck daily', label: 'CRP under 3.0 and ESR under 40', description: 'Low inflammation: serial clinical and lab re-evaluation while the fever lasts. Get an echocardiogram if typical peeling develops. Infants under 6 months need a low threshold for an echo and specialist input.', colorVar: '--color-primary' };
    }
  },
};

// ---------------------------------------------------------------------------
// High-risk screen: Son score + guideline high-risk features → add steroids?
// ---------------------------------------------------------------------------

export interface KdRiskInput { zMax: number; under6mo: boolean; asian: boolean; crp: number; shock: boolean; mas: boolean }

/** Son score (JAHA 2019): 2 points baseline LAD/RCA Z >= 2.0, 1 each for age < 6 months, Asian race, CRP >= 13 mg/dL. */
export function sonScore(i: Pick<KdRiskInput, 'zMax' | 'under6mo' | 'asian' | 'crp'>): number {
  return (Number.isFinite(i.zMax) && i.zMax >= 2 ? 2 : 0) + (i.under6mo ? 1 : 0) + (i.asian ? 1 : 0) + (Number.isFinite(i.crp) && i.crp >= 13 ? 1 : 0);
}

export function kdHighRisk(i: KdRiskInput): { son: number; tier: 'low' | 'moderate' | 'high'; reasons: string[]; steroids: boolean } {
  const son = sonScore(i);
  const tier = son >= 3 ? 'high' : son === 2 ? 'moderate' : 'low';
  const reasons: string[] = [];
  if (Number.isFinite(i.zMax) && i.zMax >= 2.5) reasons.push('coronary Z-score 2.5 or more at diagnosis');
  if (i.under6mo) reasons.push('age under 6 months');
  if (i.shock) reasons.push('shock (Kawasaki shock syndrome)');
  if (i.mas) reasons.push('macrophage activation syndrome');
  if (tier === 'high') reasons.push(`Son score ${son} (high)`);
  return { son, tier, reasons, steroids: reasons.length > 0 };
}

export const KAWASAKI_HIGH_RISK_CALCULATOR: CalculatorDefinition = {
  id: 'kawasaki-high-risk',
  title: 'Kawasaki High-Risk Screen',
  subtitle: 'Son score + high-risk features → add steroids to the first IVIG?',
  description: 'AHA 2024 lists high risk for coronary aneurysms as a coronary Z-score of 2.5 or more at diagnosis, age under 6 months, or a high Son score. ACR 2021 conditionally recommends adding glucocorticoids to the first IVIG for high-risk patients, and for life-threatening presentations (shock, macrophage activation syndrome). AHA 2017 rates a longer steroid course with IVIG in high-risk patients Class IIb. Japanese scores (Kobayashi, Egami, Sano) perform poorly in North American children and are not used here. Son score: 2 points for a baseline LAD or RCA Z-score of 2.0 or more, 1 point each for age under 6 months, Asian race and CRP 13 mg/dL or more.',
  fields: [
    { name: 'z', label: 'Highest LAD or RCA Z-score on the first echo', type: 'number', points: 0, valueIsPoints: true, unit: 'Z' },
    { name: 'young', label: 'Age under 6 months at fever onset', type: 'toggle', points: 1 },
    { name: 'asian', label: 'Asian race', type: 'toggle', points: 1 },
    { name: 'crp', label: 'CRP at baseline', type: 'number', points: 0, valueIsPoints: true, unit: 'mg/dL' },
    { name: 'shock', label: 'Shock or needs vasoactive support', type: 'toggle', points: 1 },
    { name: 'mas', label: 'Macrophage activation syndrome suspected', description: 'Falling platelets and fibrinogen, very high ferritin, rising AST/ALT, splenomegaly', type: 'toggle', points: 1 },
  ],
  results: [],
  thresholdNote: 'Son score in its North American derivation cohort: 3-5 points = high risk, with coronary aneurysms in 41% at 2-8 weeks; 2 = moderate; 0-1 = low. Steroids are added to IVIG and aspirin, never instead of IVIG.',
  citations: [AHA24, ACR, SON, AHA17, RAISE],
  computeResult: (values: Record<string, number>) => {
    const num = (k: string) => (values[k] === undefined || values[k] === null ? NaN : values[k]);
    const r = kdHighRisk({ zMax: num('z'), under6mo: (values['young'] || 0) > 0, asian: (values['asian'] || 0) > 0, crp: num('crp'), shock: (values['shock'] || 0) > 0, mas: (values['mas'] || 0) > 0 });
    const echoNote = Number.isFinite(num('z')) && num('z') !== 0 ? '' : '\n\nNo Z-score entered yet: the first echo can move the patient into high risk (2 points for Z 2.0 or more).';
    if (r.steroids) {
      return {
        value: 'High risk: add steroids',
        label: `Son score ${r.son} (${r.tier})`,
        description: `**High risk because:** ${r.reasons.join('; ')}.\n\n**Add to IVIG and aspirin:** prednisolone 2 mg/kg/day divided every 8 hours (max 60 mg/day), IV first then oral; once CRP normalizes, taper over 15 days (RAISE regimen). In the US the IV phase is given as methylprednisolone; agree the dose with pharmacy. Discuss with pediatric cardiology or rheumatology.${echoNote}`,
        colorVar: '--color-danger',
      };
    }
    return {
      value: r.tier === 'moderate' ? 'Moderate risk' : 'Standard risk',
      label: `Son score ${r.son} (${r.tier})`,
      description: `IVIG and aspirin alone. No routine steroids. Watch for IVIG resistance: fever persisting or returning 36 hours or more after the infusion ends.${echoNote}`,
      colorVar: r.tier === 'moderate' ? '--color-warning' : '--color-primary',
    };
  },
};

// ---------------------------------------------------------------------------
// Coronary artery Z-score classifier (AHA 2017 / 2024)
// ---------------------------------------------------------------------------

export type CoronaryClass = 'none' | 'normal' | 'dilation' | 'small' | 'medium' | 'giant';

export function coronaryClass(z: number, mm: number): CoronaryClass {
  // An empty number box reads 0, so 0 counts as not entered.
  const haveZ = Number.isFinite(z) && z !== 0;
  const haveMm = Number.isFinite(mm) && mm > 0;
  if (!haveZ && !haveMm) return 'none';
  if ((haveZ && z >= 10) || (haveMm && mm >= 8)) return 'giant';
  if (!haveZ) return 'none';
  if (z >= 5) return 'medium';
  if (z >= 2.5) return 'small';
  if (z >= 2) return 'dilation';
  return 'normal';
}

export const KAWASAKI_CORONARY_Z_CALCULATOR: CalculatorDefinition = {
  id: 'kawasaki-coronary-z',
  title: 'Coronary Artery Z-Score',
  subtitle: 'Kawasaki coronary classification and antithrombotic plan',
  description: 'AHA classification by the largest coronary Z-score (body-surface-area adjusted): no involvement under 2; dilation only 2 to under 2.5; small aneurysm 2.5 to under 5; medium 5 to under 10 with absolute diameter under 8 mm; large or giant 10 or more, or 8 mm or more. Antithrombotic plans are set by pediatric cardiology; this is the guideline outline.',
  fields: [
    { name: 'z', label: 'Largest coronary Z-score', type: 'number', points: 0, valueIsPoints: true, unit: 'Z' },
    { name: 'mm', label: 'Largest internal diameter (optional)', type: 'number', points: 0, valueIsPoints: true, unit: 'mm' },
  ],
  results: [],
  thresholdNote: 'Aneurysms can grow over the first 4-6 weeks: repeat echocardiography at 1-2 weeks and 4-6 weeks, sooner with aneurysms. No ibuprofen while on aspirin.',
  citations: [AHA17, AHA24],
  computeResult: (values: Record<string, number>) => {
    const num = (k: string) => (values[k] === undefined || values[k] === null ? NaN : values[k]);
    const c = coronaryClass(num('z'), num('mm'));
    const map: Record<CoronaryClass, { value: string; label: string; description: string; colorVar: string }> = {
      none: { value: '--', label: 'Enter the largest Z-score', description: 'Diameter alone classifies only a giant aneurysm (8 mm or more).', colorVar: '--color-text-muted' },
      normal: { value: 'No involvement', label: 'Z under 2', description: 'Low-dose aspirin (3-5 mg/kg/day) until the 4-6 week echo, then stop if still normal (AHA 2017 Class I).', colorVar: '--color-primary' },
      dilation: { value: 'Dilation only', label: 'Z 2 to under 2.5', description: 'Low-dose aspirin until the 4-6 week echo; repeat imaging per cardiology. Most dilation resolves.', colorVar: '--color-warning' },
      small: { value: 'Small aneurysm', label: 'Z 2.5 to under 5', description: 'Low-dose aspirin, continued until the aneurysm regresses, per cardiology. Closer echo follow-up.', colorVar: '--color-warning' },
      medium: { value: 'Medium aneurysm', label: 'Z 5 to under 10 (and under 8 mm)', description: 'Low-dose aspirin long term; some cardiologists add a second antiplatelet drug. Serial echocardiography and stress or anatomic imaging per cardiology.', colorVar: '--color-danger' },
      giant: { value: 'Large or giant aneurysm', label: 'Z 10 or more, or 8 mm or more', description: '**Highest thrombosis risk.** Low-dose aspirin plus anticoagulation: warfarin (INR 2.0-3.0) or low-molecular-weight heparin (AHA 2017 Class IIa). A prior coronary thrombosis may warrant triple therapy (Class IIb). Inpatient cardiology.', colorVar: '--color-danger' },
    };
    return map[c];
  },
};

// ---------------------------------------------------------------------------
// Kawasaki doses
// ---------------------------------------------------------------------------

export function kawasakiDoses(kg: number): null | {
  ivigG: number; asaModMg: [number, number]; asaHighMg: [number, number]; asaLowMg: [number, number];
  prednisoloneMgDay: number; prednisoloneMgDose: number; mpPulseMg: number; infliximabMg: number;
} {
  if (!Number.isFinite(kg) || kg <= 0 || kg > 150) return null;
  const r1 = (n: number) => Math.round(n * 10) / 10;
  const pred = Math.min(kg * 2, 60);
  return {
    ivigG: r1(kg * 2),
    asaModMg: [Math.round(kg * 30), Math.round(kg * 50)],
    asaHighMg: [Math.round(kg * 80), Math.round(kg * 100)],
    asaLowMg: [Math.round(kg * 3), Math.round(kg * 5)],
    prednisoloneMgDay: r1(pred),
    prednisoloneMgDose: r1(pred / 3),
    mpPulseMg: Math.round(Math.min(kg * 30, 1000)),
    infliximabMg: Math.round(kg * 10),
  };
}

export const KAWASAKI_DOSES_CALCULATOR: CalculatorDefinition = {
  id: 'kawasaki-doses',
  title: 'Kawasaki Doses',
  subtitle: 'IVIG, aspirin, steroids and infliximab by weight',
  description: 'First treatment: IVIG 2 g/kg once over 8-12 hours plus aspirin. Steroids are added at the start only for high-risk patients. Infliximab, a second IVIG, or pulse steroids are for IVIG resistance (fever 36 hours or more after the infusion ends). Doses from AHA 2024 (Table 3), AHA 2017, RAISE and KIDCARE.',
  fields: [
    { name: 'weight', label: 'Weight', type: 'number', points: 0, valueIsPoints: true, unit: 'kg' },
  ],
  results: [],
  thresholdNote: 'Aspirin per day is split every 6 hours in the acute phase. In obesity, agree the IVIG dosing weight with pharmacy. Live vaccines (measles, varicella) are deferred 11 months after IVIG.',
  citations: [AHA24, AHA17, ACR, RAISE, KIDCARE],
  computeResult: (values: Record<string, number>) => {
    const d = kawasakiDoses(values['weight'] ?? NaN);
    if (!d) return { value: '--', label: 'Enter weight in kg', description: 'Child weight in kg.', colorVar: '--color-text-muted' };
    return {
      value: `IVIG ${d.ivigG} g`,
      label: '2 g/kg once over 8-12 hours',
      description: [
        `**Aspirin, acute phase:** ${d.asaModMg[0]}-${d.asaModMg[1]} mg/day split every 6 hours (30-50 mg/kg/day, AHA 2024). Older US high dose: ${d.asaHighMg[0]}-${d.asaHighMg[1]} mg/day (80-100 mg/kg/day), no proven advantage. Continue until afebrile 48-72 hours.`,
        `**Aspirin, low dose:** ${d.asaLowMg[0]}-${d.asaLowMg[1]} mg once daily (3-5 mg/kg) until the 4-6 week echo; longer with aneurysms.`,
        `**High risk, with the first IVIG (prednisolone, RAISE):** ${d.prednisoloneMgDay} mg/day = ${d.prednisoloneMgDose} mg every 8 hours (2 mg/kg/day, max 60 mg/day); taper over 15 days once CRP is normal.`,
        `**IVIG-resistant options:** second IVIG ${d.ivigG} g; or infliximab ${d.infliximabMg} mg IV once over 2 hours (10 mg/kg, KIDCARE); or pulse methylprednisolone ${d.mpPulseMg} mg IV daily for 1-3 days (20-30 mg/kg, max 1 g; shown at 30 mg/kg).`,
      ].join('\n\n'),
      colorVar: '--color-danger',
    };
  },
};
