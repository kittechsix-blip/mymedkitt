// Andexanet alfa regimen selector. Doses per US label (ANDEXXA PI, rev 03/2025).
// Andexanet US commercial sales ended 12/22/2025: this calculator is for ex-US use with licensed supply.
// DRAFT: not registered in calculator.ts. Integrator registers ANDEXANET_REGIMEN_CALCULATOR.

export type AndexanetAgent = 'apixaban' | 'rivaroxaban' | 'other';

export interface AndexanetInput {
  agent: AndexanetAgent;
  /** Last dose in mg. null = unknown (treated as high-dose regimen if under 8 hours or timing unknown). */
  lastDoseMg: number | null;
  /** Hours since last dose. null = unknown (treated as under 8 hours). */
  hoursSinceLastDose: number | null;
}

export type AndexanetRegimen =
  | { status: 'not-indicated'; reason: string }
  | {
      status: 'low' | 'high';
      bolusMg: number;
      bolusRateMgPerMin: number;
      infusionMgPerMin: number;
      infusionMinutes: number;
      totalMg: number;
      vials200Mg: number;
      reason: string;
    };

const BOLUS_RATE_MG_PER_MIN = 30;
const INFUSION_MINUTES = 120;

function regimen(status: 'low' | 'high', reason: string): AndexanetRegimen {
  const bolusMg = status === 'low' ? 400 : 800;
  const infusionMgPerMin = status === 'low' ? 4 : 8;
  const infusionMg = infusionMgPerMin * INFUSION_MINUTES;
  const totalMg = bolusMg + infusionMg;
  return {
    status,
    bolusMg,
    bolusRateMgPerMin: BOLUS_RATE_MG_PER_MIN,
    infusionMgPerMin,
    infusionMinutes: INFUSION_MINUTES,
    totalMg,
    vials200Mg: Math.ceil(totalMg / 200),
    reason,
  };
}

/**
 * Label rule order (ANDEXXA PI dosing table):
 * 1. Not apixaban or rivaroxaban: not indicated.
 * 2. Last dose 8 hours or more ago: low dose, any dose.
 * 3. Under 8 hours or timing unknown: apixaban 5 mg or less, or rivaroxaban 10 mg or less, is low;
 *    larger or unknown dose is high.
 */
export function computeAndexanetRegimen(input: AndexanetInput): AndexanetRegimen {
  if (input.agent === 'other') {
    return { status: 'not-indicated', reason: 'Andexanet is labeled only for apixaban and rivaroxaban. Use 4-factor PCC (see Andexanet Not Indicated node).' };
  }
  if (input.hoursSinceLastDose !== null && input.hoursSinceLastDose >= 8) {
    return regimen('low', 'Last dose 8 hours or more ago: low-dose regimen for any dose.');
  }
  if (input.agent === 'apixaban') {
    if (input.lastDoseMg !== null && input.lastDoseMg <= 5) {
      return regimen('low', 'Apixaban 5 mg or less, under 8 hours or timing unknown.');
    }
    return regimen('high', 'Apixaban over 5 mg, or dose unknown, under 8 hours or timing unknown.');
  }
  if (input.lastDoseMg !== null && input.lastDoseMg <= 10) {
    return regimen('low', 'Rivaroxaban 10 mg or less, under 8 hours or timing unknown.');
  }
  return regimen('high', 'Rivaroxaban over 10 mg, or dose unknown, under 8 hours or timing unknown.');
}

/**
 * Maps the timing select (1 = under 8 hours, 2 = 8 hours or more, 3 = unknown) to the
 * hours input of computeAndexanetRegimen. Unknown maps to null (treated as under 8 hours).
 */
export function andexanetHoursFromTiming(timing: number): number | null {
  return timing === 2 ? 8 : null;
}

const WITHDRAWN_BANNER = '**WITHDRAWN IN THE US (12/22/2025):** do not use for US patients. Ex-US with licensed supply only.';

function formatRegimen(r: Extract<AndexanetRegimen, { status: 'low' | 'high' }>): string {
  const bolusMinutes = Math.round(r.bolusMg / r.bolusRateMgPerMin);
  return [
    WITHDRAWN_BANNER,
    `**RULE APPLIED:** ${r.reason}`,
    `**BOLUS:** ${r.bolusMg} mg IV at ${r.bolusRateMgPerMin} mg/min (about ${bolusMinutes} min)`,
    `**INFUSION:** ${r.infusionMgPerMin} mg/min × ${r.infusionMinutes} min (${r.infusionMgPerMin * r.infusionMinutes} mg), start within 2 min of bolus end`,
    `**TOTAL:** ${r.totalMg} mg (${r.vials200Mg} × 200 mg vials)`,
    '**FILTER:** 0.2 or 0.22 micron in-line, low-protein-binding',
    '**CAUTION:** boxed warning for thromboembolic and ischemic events. Do not use anti-Xa levels to judge reversal.',
  ].join('\n\n');
}

export const ANDEXANET_REGIMEN_CALCULATOR = {
  id: 'andexanet-regimen',
  title: 'Andexanet Regimen',
  subtitle: 'Ex-US only: low vs high dose by agent, last dose, and timing',
  description: 'Selects the andexanet alfa low- or high-dose regimen from the ANDEXXA US label table for apixaban or rivaroxaban. Andexanet is withdrawn from US sales (12/22/2025); use this only where licensed supply and local approval exist.',
  fields: [
    {
      name: 'agent',
      label: 'Anticoagulant',
      type: 'select' as const,
      points: 0,
      hideOptionPoints: true,
      selectOptions: [
        { label: 'Apixaban (Eliquis)', points: 1 },
        { label: 'Rivaroxaban (Xarelto)', points: 2 },
        { label: 'Other (edoxaban, dabigatran, heparin, LMWH, fondaparinux, unknown)', points: 3 },
      ],
    },
    {
      name: 'doseKnown',
      label: 'Last dose known?',
      type: 'select' as const,
      points: 0,
      hideOptionPoints: true,
      selectOptions: [
        { label: 'Yes', points: 1 },
        { label: 'No (unknown dose)', points: 2 },
      ],
    },
    {
      name: 'dose',
      label: 'Last dose',
      type: 'number' as const,
      points: 0,
      unit: 'mg',
      description: 'Enter only when the dose is known',
    },
    {
      name: 'timing',
      label: 'Time since last dose',
      type: 'select' as const,
      points: 0,
      hideOptionPoints: true,
      selectOptions: [
        { label: 'Less than 8 hours', points: 1 },
        { label: '8 hours or more', points: 2 },
        { label: 'Unknown (label groups with under 8 hours)', points: 3 },
      ],
    },
  ],
  results: [],
  thresholdNote: 'Label rule (ANDEXXA dosing table, timing column "< 8 Hours or Unknown"): last dose 8 hours or more ago = low dose for any dose. Under 8 hours or unknown timing: apixaban 5 mg or less or rivaroxaban 10 mg or less = low; larger or unknown dose = high. Anti-Xa levels are unsuitable for judging reversal. Ex-US: confirm against the local label or SmPC before use; dosing here is US label dosing.',
  citations: [
    'ANDEXXA (andexanet alfa) US prescribing information, rev. 03/2025, dosing and administration table (Table 1 and FXa inhibitor timing table). DailyMed setid 2d9d90a6-63e6-46ef-96ff-dd6519ae7b6c.',
    'US FDA. Update on the Safety of Andexxa (FDA Safety Communication), posted 12/18/2025. https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/update-safety-andexxa',
    'Connolly SJ, Crowther M, Eikelboom JW, et al. ANNEXA-4. N Engl J Med. 2019;380(14):1326-1335. doi:10.1056/NEJMoa1812430',
  ],
  computeResult(values: Record<string, number>): { value: string; label: string; description: string; colorVar: string } {
    const agentCode = values.agent;
    // timing is a select (no free-text number), so an empty or cleared answer is never read as 0 hours.
    if (agentCode !== 1 && agentCode !== 2 && agentCode !== 3) {
      return { value: 'Select agent', label: 'Incomplete', description: '**SELECT THE ANTICOAGULANT** to calculate the regimen.', colorVar: '--color-text-muted' };
    }
    if (agentCode === 3) {
      const r = computeAndexanetRegimen({ agent: 'other', lastDoseMg: null, hoursSinceLastDose: null });
      return { value: 'Not indicated', label: 'Use 4-factor PCC', description: `**NOT INDICATED:** ${r.status === 'not-indicated' ? r.reason : ''}`, colorVar: '--color-warning' };
    }
    const agent: AndexanetAgent = agentCode === 1 ? 'apixaban' : 'rivaroxaban';
    if (values.doseKnown !== 1 && values.doseKnown !== 2) {
      return { value: 'Answer dose question', label: 'Incomplete', description: '**ANSWER WHETHER THE LAST DOSE IS KNOWN.**', colorVar: '--color-text-muted' };
    }
    if (values.timing !== 1 && values.timing !== 2 && values.timing !== 3) {
      return { value: 'Answer timing question', label: 'Incomplete', description: '**SELECT THE TIME SINCE LAST DOSE.**', colorVar: '--color-text-muted' };
    }
    const doseKnown = values.doseKnown === 1;
    if (doseKnown && !(values.dose > 0)) {
      return { value: 'Enter dose', label: 'Incomplete', description: '**ENTER THE LAST DOSE IN MG** (or answer No for unknown dose).', colorVar: '--color-text-muted' };
    }
    const r = computeAndexanetRegimen({
      agent,
      lastDoseMg: doseKnown ? values.dose : null,
      hoursSinceLastDose: andexanetHoursFromTiming(values.timing),
    });
    if (r.status === 'not-indicated') {
      return { value: 'Not indicated', label: 'Use 4-factor PCC', description: r.reason, colorVar: '--color-warning' };
    }
    const label = r.status === 'low' ? 'Low-dose regimen' : 'High-dose regimen';
    return {
      value: `${r.bolusMg} mg bolus + ${r.infusionMgPerMin} mg/min × ${r.infusionMinutes} min`,
      label,
      description: formatRegimen(r),
      colorVar: '--color-primary',
    };
  },
};
