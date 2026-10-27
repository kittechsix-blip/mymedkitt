// ARDS P/F ratio and Berlin severity (DRAFT, not registered).
// Pure scoring is exported for tests. Inputs are ephemeral and never persisted.
// S/F (SpO2/FiO2) estimate intentionally omitted: primary cutoff not yet verified.
// Integrator: register ARDS_PF_BERLIN_CALCULATOR in CALCULATORS and export the
// CalculatorDefinition interface from calculator.ts (currently not exported).

import type { CalculatorDefinition } from './calculator.js';

export type VentSupport = 'invasive' | 'non-invasive';

export type BerlinSeverity =
  | 'severe'
  | 'moderate'
  | 'mild'
  | 'mild-capped'
  | 'not-berlin'
  | 'peep-below-5';

/** PaO2 (mmHg) / FiO2 as a fraction. FiO2 is entered as a percent (21 to 100). Null when invalid. */
export function pfRatio(pao2: number, fio2Percent: number): number | null {
  if (!Number.isFinite(pao2) || pao2 <= 0) return null;
  if (!Number.isFinite(fio2Percent) || fio2Percent < 21 || fio2Percent > 100) return null;
  return pao2 / (fio2Percent / 100);
}

/**
 * Berlin severity. Cutoffs: mild 200 to 300, moderate 100 to 200, severe 100 or less.
 * The ratio is only classifiable on PEEP or CPAP of at least 5 cmH2O.
 * Non-invasive support (CPAP or NIV) qualifies only for mild: a ratio at or below 200 is
 * returned as 'mild-capped', not moderate or severe. Moderate and severe need invasive
 * ventilation with PEEP of 5 or more.
 * Classification uses the unrounded ratio; display rounds only.
 */
export function berlinSeverity(pf: number, peep: number, support: VentSupport = 'invasive'): BerlinSeverity {
  if (peep < 5) return 'peep-below-5';
  if (pf > 300) return 'not-berlin';
  if (pf > 200) return 'mild';
  if (support === 'non-invasive') return 'mild-capped';
  if (pf <= 100) return 'severe';
  return 'moderate';
}

/** PROSEVA-style prone entry: P/F below 150 on FiO2 0.6 or more with PEEP 5 or more, after screening. */
export function meetsProneEntry(pf: number, fio2Percent: number, peep: number): boolean {
  return pf < 150 && fio2Percent >= 60 && peep >= 5;
}

export const ARDS_PF_BERLIN_CALCULATOR: CalculatorDefinition = {
  id: 'ards-pf-berlin',
  title: 'ARDS P/F and Berlin Severity',
  subtitle: 'PaO2/FiO2 ratio with PEEP of 5 or more, Berlin severity and prone entry',
  description: 'Calculates PaO2/FiO2 from an ABG and the set FiO2, then grades Berlin severity. The ratio counts only on PEEP or CPAP of at least 5 cmH2O. Choose the support mode: CPAP or NIV caps the grade at mild.',
  fields: [
    {
      name: 'pao2',
      label: 'PaO2 (ABG)',
      type: 'number',
      points: 0,
      valueIsPoints: true,
      unit: 'mmHg',
      description: 'Arterial PaO2 on the current settings',
    },
    {
      name: 'fio2',
      label: 'FiO2 (set)',
      type: 'number',
      points: 0,
      valueIsPoints: true,
      unit: '%',
      description: 'Enter as percent, 21 to 100 (60 = 0.6)',
    },
    {
      name: 'peep',
      label: 'PEEP or CPAP (set)',
      type: 'number',
      points: 0,
      valueIsPoints: true,
      unit: 'cmH2O',
      description: 'Enter 0 if no PEEP or CPAP',
    },
    {
      name: 'support',
      label: 'Support mode (set)',
      type: 'select',
      points: 0,
      hideOptionPoints: true,
      description: 'Berlin moderate and severe grades need invasive ventilation. CPAP or NIV caps the grade at mild.',
      selectOptions: [
        { label: 'Not set', points: 0 },
        { label: 'Invasive (intubated, ventilator)', points: 1 },
        { label: 'Non-invasive (CPAP or NIV)', points: 2 },
        { label: 'High-flow nasal oxygen only (not Berlin; use the 2023 global pathway)', points: 3 },
      ],
    },
  ],
  results: [],
  thresholdNote: 'Berlin cutoffs (PaO2/FiO2, PEEP of 5 or more): mild 200 to 300, moderate 100 to 200, severe 100 or less. Moderate and severe need invasive ventilation; CPAP or NIV caps the grade at mild. The 2023 global intubated cutoffs match these; primary-table verification is pending. The ratio is not valid on PEEP below 5 cmH2O. High-flow alone is not a Berlin support mode; use the 2023 global pathway.',
  citations: [
    'ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin Definition. JAMA. 2012;307(23):2526-2533.',
    'Matthay MA, Arabi Y, et al. A New Global Definition of Acute Respiratory Distress Syndrome. Am J Respir Crit Care Med. 2024;209(1):37-47. doi:10.1164/rccm.202303-0558WS.',
    'Guerin C, Reignier J, Richard JC, et al. Prone positioning in severe acute respiratory distress syndrome. N Engl J Med. 2013;368(23):2159-2168.',
    'ESICM guidelines on acute respiratory distress syndrome: definition, phenotyping and respiratory support strategies. Intensive Care Med. 2023;49(7):727-759. doi:10.1007/s00134-023-07050-7.',
  ],
  computeResult: (values: Record<string, number>) => {
    const pao2 = values['pao2'] || 0;
    const fio2 = values['fio2'] || 0;
    const peep = values['peep'] || 0;
    const supportCode = values['support'] || 0;
    const pf = pfRatio(pao2, fio2);

    if (supportCode === 3) {
      return {
        value: '--',
        label: 'Not a Berlin support mode',
        description: '**HIGH-FLOW NASAL OXYGEN ONLY:** Berlin does not grade high-flow alone.\n\nUse the 2023 global pathway (high-flow at 30 L/min or more, SpO2/FiO2 or PaO2/FiO2 criteria) in the ARDS tree.',
        colorVar: '--color-primary',
      };
    }

    if (pf === null || supportCode === 0) {
      return {
        value: '--',
        label: 'Enter values',
        description: '**ENTER:**\n• PaO2 from the ABG (mmHg)\n• FiO2 as percent (21 to 100)\n• PEEP or CPAP (cmH2O)\n• Support mode (invasive or non-invasive)\n\nThe ratio and Berlin grade appear once PaO2, FiO2 and support mode are valid.',
        colorVar: '--color-text-muted',
      };
    }

    const support: VentSupport = supportCode === 1 ? 'invasive' : 'non-invasive';
    const shown = Math.round(pf);
    const severity = berlinSeverity(pf, peep, support);
    // PROSEVA enrolled intubated patients only. Prone entry is not shown for non-invasive support.
    const prone = support === 'invasive' && meetsProneEntry(pf, fio2, peep);
    const proneLine = prone
      ? '\n\n**PRONE ENTRY:** Severe ARDS (P/F <150, FiO2 ≥0.6, PEEP ≥5), invasive ventilation. Start prone after screening. Session length: see the prone node (ESICM 16 consecutive hours or more; ATS more than 12 h/day in severe ARDS).'
      : '';

    let label: string;
    let colorVar: string;
    let body: string;

    switch (severity) {
      case 'severe':
        label = 'Severe ARDS (Berlin)';
        colorVar = '--color-danger';
        body = '**MORTALITY (BERLIN COHORT):** 45% (95% CI 42 to 48)\n\n**MANAGEMENT:**\n• Protective VT at 6 mL/kg PBW, plateau at or below 30\n• Check prone criteria above\n• Refer for ECMO evaluation if EOLIA-type gates persist despite optimal ventilation';
        break;
      case 'moderate':
        label = 'Moderate ARDS (Berlin)';
        colorVar = '--color-warning';
        body = '**MORTALITY (BERLIN COHORT):** 32% (95% CI 29 to 34)\n\n**MANAGEMENT:**\n• Protective VT at 6 mL/kg PBW, plateau at or below 30\n• Check prone criteria above\n• Keep the mimic check open';
        break;
      case 'mild':
        label = 'Mild ARDS (Berlin)';
        colorVar = '--color-warning';
        body = '**MORTALITY (BERLIN COHORT):** 27% (95% CI 24 to 30)\n\n**MANAGEMENT:**\n• Protective VT at 6 mL/kg PBW, plateau at or below 30\n• Reassess the ratio on set PEEP as the picture changes';
        break;
      case 'mild-capped':
        label = 'Cannot classify beyond mild (non-invasive)';
        colorVar = '--color-warning';
        body = '**CANNOT CLASSIFY BEYOND MILD:** Berlin grades moderate or severe only on invasive ventilation with PEEP of 5 or more. This ratio is 200 or below on CPAP or NIV, so no severity grade beyond mild is assigned.\n\n**NEXT:**\n• Reassess after an ABG on invasive settings if intubated\n• Non-intubated patients: the 2023 global definition sets the diagnosis; this app assigns no grade beyond mild';
        break;
      case 'peep-below-5':
        label = 'PEEP below 5';
        colorVar = '--color-warning';
        body = '**BERLIN NOT CLASSIFIABLE:** PEEP or CPAP is below 5 cmH2O.\n\n**NEXT:**\n• Set PEEP or CPAP to at least 5 cmH2O\n• Repeat the ABG on those settings';
        break;
      default:
        label = 'Berlin not met by ratio';
        colorVar = '--color-primary';
        body = '**RATIO ABOVE 300 on PEEP of 5 or more:** Berlin oxygenation criterion not met at this moment.\n\n**NEXT:**\n• Check mimics and reassess after the ABG on set PEEP';
    }

    return {
      value: `P/F ${shown}`,
      label,
      description: `**PaO2/FiO2:** ${shown} (PaO2 ${pao2} mmHg on FiO2 ${fio2}%, ${support === 'invasive' ? 'invasive' : 'non-invasive'})\n\n${body}${proneLine}`,
      colorVar,
    };
  },
};
