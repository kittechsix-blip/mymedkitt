// Hypertensive emergency BP target calculator (adult).
// Pure math lives in computeHtneBpTarget (testable). Inputs are ephemeral and never persisted.
// Bracket numbers printed here are the index+1 of `citations` in HTNE_BP_TARGET_CALCULATOR.
// Calculator numbering: [1] 2025 AHA/ACC guideline, [2] Marik & Varon 2007, [3] Powers 2019, [4] ACOG CO 767 (2019).

export interface HtneBpInput {
  sbp: number;
  dbp: number;
  dissection?: boolean;
  ischemicStroke?: boolean;
  ich?: boolean;
  pregnant?: boolean;
  pheo?: boolean;
  cocaine?: boolean;
  scape?: boolean;
}

export interface HtneBpOutput {
  map: number;
  /** Non-pregnant: SBP >180 and/or DBP >120. Pregnancy or postpartum: SBP >=160 and/or DBP >=110 (ACOG CO 767). */
  severeRange: boolean;
  /** A compelling condition (dissection, pregnancy, pheochromocytoma) changes the first-hour goal. */
  compelling: boolean;
  /** SBP reduced by no more than 25% in the first hour (2025 AHA/ACC section 6.2). Floor = 0.75 x SBP (unrounded). */
  sbpFloor25: number;
  lines: string[];
}

const r = (n: number): number => Math.round(n);

/** Pure computation. Returns null for missing or invalid BP entry. Round only at display. */
export function computeHtneBpTarget(input: HtneBpInput): HtneBpOutput | null {
  const { sbp, dbp } = input;
  if (!Number.isFinite(sbp) || !Number.isFinite(dbp) || sbp <= 0 || dbp <= 0 || sbp <= dbp) return null;
  const map = dbp + (sbp - dbp) / 3;
  // Non-pregnant: hypertensive emergency is BP above 180/120 mm Hg with acute target-organ damage [1].
  // Pregnancy or postpartum: severe range is SBP >=160 or DBP >=110, persistent; treat within 30-60 minutes [4].
  const severeRange = input.pregnant ? (sbp >= 160 || dbp >= 110) : (sbp > 180 || dbp > 120);
  const sbpFloor25 = 0.75 * sbp;
  const compelling = Boolean(input.dissection || input.pregnant || input.pheo);

  const severeLine = input.pregnant
    ? (severeRange
      ? '**SEVERE RANGE:** YES. Pregnancy threshold SBP >=160 or DBP >=110 mmHg, persistent. [4]'
      : '**SEVERE RANGE:** NO. Below the pregnancy threshold (SBP <160 and DBP <110 mmHg). [4]')
    : (severeRange
      ? '**SEVERE RANGE:** YES. SBP >180 and/or DBP >120 mmHg. [1]'
      : '**SEVERE RANGE:** NO. Not above SBP 180 and not above DBP 120 mmHg. [1]');

  const lines: string[] = [];
  lines.push(`**MAP:** ${r(map)} mmHg (DBP + (SBP - DBP) / 3).`);
  lines.push(severeLine);
  if (compelling) {
    lines.push('**COMPELLING CONDITION SELECTED:** the general rule below is not the target. Aortic dissection: SBP ≤120 mmHg, within 20 minutes, beta-blocker first. Most other compelling conditions: SBP <140 mmHg in the first hour. Pheochromocytoma is not an indication for immediate reduction to <120 or <140. Pregnancy and stroke have their own targets (see the consult branches). [1]');
  }
  lines.push(`**FIRST-HOUR LIMIT (no compelling indication):**\n• Reduce SBP by no more than 25% in the first hour. SBP floor **${r(sbpFloor25)} mmHg**. [1]\n• Then gradual further reduction within 24 to 48 hours. [1]`);
  lines.push('**AFTER THE FIRST HOUR:** gradual further reduction within 24 to 48 hours if stable and not hypoperfused. [1]');

  if (input.dissection) lines.push('**AORTIC DISSECTION:** the general rule is not the target. Beta-blocker is first-line. [1] SBP and heart-rate goals come from the dissection consult.');
  if (input.ischemicStroke) lines.push('**ISCHEMIC STROKE:** the alteplase trials required SBP <185 and DBP <110 mmHg before treatment, and SBP <180 and DBP <105 mmHg for 24 hours after. [1] The stroke consult governs. Do not apply the general rule before the thrombolysis decision.');
  if (input.ich) lines.push('**INTRACEREBRAL HEMORRHAGE:** the general rule does not apply. The SBP target and timing are set in the ICH consult.');
  if (input.pregnant) lines.push('**PREGNANCY OR POSTPARTUM:** severe range is SBP >=160 or DBP >=110 mmHg, persistent. Treat within 30-60 minutes with IV labetalol, IV hydralazine, or immediate-release oral nifedipine. Never give nifedipine sublingually. [4]');
  if (input.pheo) lines.push('**PHEOCHROMOCYTOMA:** alpha-blockade first, beta-blockade only after adequate alpha-blockade.');
  if (input.cocaine) lines.push('**COCAINE OR SYMPATHOMIMETIC:** benzodiazepine first, and avoid beta-blockers in acute cocaine toxicity. Phentolamine is a second-line option for catecholamine excess, including cocaine toxicity: 5 mg IV, repeat every 10 minutes as needed, cumulative maximum 50 mg per 24 hours. [1] Toxicology and the chest pain hub govern.');
  if (input.scape) lines.push('**SCAPE:** follow the SCAPE pathway. Nitrate dosing is in the SCAPE consult.');

  return { map, severeRange, compelling, sbpFloor25, lines };
}

export const HTNE_BP_TARGET_CALCULATOR = {
  id: 'htne-bp-target',
  title: 'BP Target (Adult HTN Emergency)',
  subtitle: 'First-hour SBP limit and exception-specific targets',
  description: 'Enter the BP and tick any exception that applies. Shows MAP, the first-hour SBP limit, and exception-specific targets. Decision support only; confirm against the consult.',
  fields: [
    { name: 'sbp', label: 'Systolic BP', type: 'number' as const, points: 0, unit: 'mmHg', description: 'Enter the SBP' },
    { name: 'dbp', label: 'Diastolic BP', type: 'number' as const, points: 0, unit: 'mmHg', description: 'Enter the DBP' },
    { name: 'dissection', label: 'Aortic dissection suspected', type: 'toggle' as const, points: 1 },
    { name: 'ischemicStroke', label: 'Ischemic stroke', type: 'toggle' as const, points: 1 },
    { name: 'ich', label: 'Intracerebral hemorrhage', type: 'toggle' as const, points: 1 },
    { name: 'pregnant', label: 'Pregnant or postpartum', type: 'toggle' as const, points: 1 },
    { name: 'pheo', label: 'Pheochromocytoma or catecholamine crisis', type: 'toggle' as const, points: 1 },
    { name: 'cocaine', label: 'Cocaine or sympathomimetic toxicity', type: 'toggle' as const, points: 1 },
    { name: 'scape', label: 'SCAPE', type: 'toggle' as const, points: 1 },
  ],
  results: [] as Array<{ min: number; max: number; label: string; risk: string; mortality: string; colorVar: string }>,
  thresholdNote: 'Decision support, not an order. The first-hour SBP limit (no more than 25%) and the 24-48 hour wording are from the 2025 AHA/ACC guideline [1]. Compelling-condition goals and exception targets come from their consults. Confirm doses and targets on the drug entry and primary source before acting.',
  citations: [
    '2025 AHA/ACC/AANP/AAPA/ABC/ACCP/ACPM/AGS/AMA/ASPC/NMA/PCNA/SGIM Guideline for the Prevention, Detection, Evaluation and Management of High Blood Pressure in Adults. Circulation. 2025. Section 6.2 and Tables 26-27; Section 5.3.9.2. doi:10.1161/CIR.0000000000001356.',
    'Marik PE, Varon J. Hypertensive crises: challenges and management. Chest. 2007;131(6):1949-1962. doi:10.1378/chest.06-2490.',
    'Powers WJ, Rabinstein AA, Ackerson T, et al. Guidelines for the Early Management of Patients With Acute Ischemic Stroke: 2019 Update to the 2018 Guidelines. Stroke. 2019;50:e344-e418. doi:10.1161/STR.0000000000000211.',
    'American College of Obstetricians and Gynecologists. Committee Opinion No. 767: Emergent Therapy for Acute-Onset, Severe Hypertension During Pregnancy and the Postpartum Period. Obstet Gynecol. 2019;133(2):e174-e180. doi:10.1097/AOG.0000000000003075.',
  ],
  computeResult(values: Record<string, number>): { value: string; label: string; description: string; colorVar: string } {
    const out = computeHtneBpTarget({
      sbp: values.sbp,
      dbp: values.dbp,
      dissection: (values.dissection ?? 0) > 0,
      ischemicStroke: (values.ischemicStroke ?? 0) > 0,
      ich: (values.ich ?? 0) > 0,
      pregnant: (values.pregnant ?? 0) > 0,
      pheo: (values.pheo ?? 0) > 0,
      cocaine: (values.cocaine ?? 0) > 0,
      scape: (values.scape ?? 0) > 0,
    });
    if (!out) {
      return {
        value: '--',
        label: 'Enter SBP and DBP',
        description: '**INPUT:** enter a systolic BP greater than the diastolic BP, both positive.',
        colorVar: '--color-text-muted',
      };
    }
    const anyException = [values.dissection, values.ischemicStroke, values.ich, values.pregnant, values.pheo, values.cocaine, values.scape].some(v => (v ?? 0) > 0);
    return {
      value: `MAP ${r(out.map)} mmHg`,
      label: anyException
        ? 'Exception present: see branch below'
        : `First-hour SBP floor ${r(out.sbpFloor25)} mmHg (guideline)`,
      description: out.lines.join('\n\n'),
      colorVar: anyException ? '--color-danger' : out.severeRange ? '--color-warning' : '--color-primary',
    };
  },
};
