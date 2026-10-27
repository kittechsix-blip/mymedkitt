// ARDS predicted body weight (PBW) and tidal volume targets (DRAFT, not registered).
// Pure scoring is exported for tests. Inputs are ephemeral and never persisted.
// Integrator: register ARDS_PBW_TIDAL_VOLUME_CALCULATOR in CALCULATORS and export the
// CalculatorDefinition interface from calculator.ts (currently not exported).

import type { CalculatorDefinition } from './calculator.js';

export type ArdsSex = 'male' | 'female';

export type PlateauAction =
  | 'unknown'
  | 'within-target'
  | 'above-30-reduce'
  | 'above-30-at-floor'
  | 'below-25-increase';

/** Height in inches. Centimeters win when both are entered. Returns null when neither is valid. */
export function heightInchesFrom(cm: number, inches: number): number | null {
  if (Number.isFinite(cm) && cm > 0) return cm / 2.54;
  if (Number.isFinite(inches) && inches > 0) return inches;
  return null;
}

/** ARDSNet predicted body weight. Male 50 + 2.3 x (in - 60); female 45.5 + 2.3 x (in - 60). */
export function predictedBodyWeightKg(sex: ArdsSex, heightIn: number): number | null {
  if (!Number.isFinite(heightIn) || heightIn <= 0) return null;
  const base = sex === 'male' ? 50 : 45.5;
  return base + 2.3 * (heightIn - 60);
}

/** Driving pressure = plateau minus PEEP. Null when inputs are missing or inconsistent. */
export function drivingPressure(plateau: number, peep: number): number | null {
  if (!Number.isFinite(plateau) || !Number.isFinite(peep)) return null;
  if (plateau <= 0 || peep < 0 || plateau < peep) return null;
  return plateau - peep;
}

/**
 * Plateau-pressure action per ARDSNet protocol:
 * above 30: reduce VT by 1 mL/kg PBW, not below 4 mL/kg PBW.
 * below 25 with VT under 6 mL/kg PBW: increase VT by 1 mL/kg PBW until plateau above 25 or VT is 6.
 */
export function plateauAction(plateau: number, vtKgPbw: number | null): PlateauAction {
  if (!Number.isFinite(plateau) || plateau <= 0) return 'unknown';
  if (plateau > 30) {
    return vtKgPbw !== null && vtKgPbw <= 4 ? 'above-30-at-floor' : 'above-30-reduce';
  }
  if (plateau < 25 && vtKgPbw !== null && vtKgPbw < 6) return 'below-25-increase';
  return 'within-target';
}

export interface ArdsPbwResult {
  sex: ArdsSex;
  heightIn: number;
  pbwKg: number;
  /** Tidal volume in mL at 4, 6 and 8 mL/kg PBW (unrounded; round at display only). */
  vtMl: { 4: number; 6: number; 8: number };
  currentVtKgPbw: number | null;
  plateauAction: PlateauAction;
  drivingPressure: number | null;
}

/** Pure computation from calculator field values. Returns null until sex and height are entered. */
export function computeArdsPbwTidalVolume(values: Record<string, number>): ArdsPbwResult | null {
  const sexCode = values['sex'] ?? 0;
  const sex: ArdsSex | null = sexCode === 1 ? 'male' : sexCode === 2 ? 'female' : null;
  if (!sex) return null;
  const heightIn = heightInchesFrom(values['height-cm'] || 0, values['height-in'] || 0);
  if (heightIn === null) return null;
  const pbwKg = predictedBodyWeightKg(sex, heightIn);
  if (pbwKg === null) return null;

  const currentVt = values['current-vt'] || 0;
  const currentVtKgPbw = currentVt > 0 ? currentVt / pbwKg : null;
  const plateau = values['plateau'] || 0;

  return {
    sex,
    heightIn,
    pbwKg,
    vtMl: { 4: pbwKg * 4, 6: pbwKg * 6, 8: pbwKg * 8 },
    currentVtKgPbw,
    plateauAction: plateauAction(plateau, currentVtKgPbw),
    drivingPressure: drivingPressure(plateau, values['peep'] || 0),
  };
}

function plateauLine(action: PlateauAction, vtKgPbw: number | null): string {
  switch (action) {
    case 'above-30-reduce': {
      const target = vtKgPbw !== null ? Math.max(4, vtKgPbw - 1) : null;
      return target !== null
        ? `• Above 30: **reduce VT toward ${target.toFixed(1)} mL/kg PBW** (1 mL/kg step, floor 4)`
        : '• Above 30: **reduce VT by 1 mL/kg PBW** (floor 4 mL/kg PBW)';
    }
    case 'above-30-at-floor':
      return '• Above 30 at the 4 mL/kg PBW floor: **do not cut VT further**. Look for a bedside cause and escalate.';
    case 'below-25-increase':
      return '• Below 25 with VT under 6: **ARDSNet protocol increases VT by 1 mL/kg PBW** until plateau is above 25 or VT is 6 mL/kg PBW (clinician judgment)';
    case 'within-target':
      return '• At or below 30: **within ARDSNet target**';
    default:
      return '• Enter plateau pressure (0.5 s pause) to grade it';
  }
}

export const ARDS_PBW_TIDAL_VOLUME_CALCULATOR: CalculatorDefinition = {
  id: 'ards-pbw-tidal-volume',
  title: 'ARDS PBW and Tidal Volume',
  subtitle: 'Predicted body weight, 4/6/8 mL/kg tidal volume, plateau and driving pressure',
  description: 'ARDSNet predicted body weight from sex and height, tidal volume targets per kg of PBW, and plateau-pressure action. Driving pressure is shown as plateau minus PEEP. Never size VT on actual body weight.',
  fields: [
    {
      name: 'sex',
      label: 'Sex (for predicted body weight)',
      type: 'select',
      points: 0,
      hideOptionPoints: true,
      selectOptions: [
        // Placeholder first: renderSelectField defaults to the first option's points, so a blank
        // sex must read 0 (null PBW), never silently Male.
        { label: 'Select sex', points: 0 },
        { label: 'Male', points: 1 },
        { label: 'Female', points: 2 },
      ],
    },
    {
      name: 'height-cm',
      label: 'Height (cm)',
      type: 'number',
      points: 0,
      valueIsPoints: true,
      unit: 'cm',
      description: 'Enter cm or inches. If both are entered, cm is used.',
    },
    {
      name: 'height-in',
      label: 'Height (inches)',
      type: 'number',
      points: 0,
      valueIsPoints: true,
      unit: 'in',
      description: 'Inches = cm / 2.54',
    },
    {
      name: 'current-vt',
      label: 'Current set VT (optional)',
      type: 'number',
      points: 0,
      valueIsPoints: true,
      unit: 'mL',
      description: 'Used to grade the current VT per kg PBW',
    },
    {
      name: 'plateau',
      label: 'Plateau pressure (optional)',
      type: 'number',
      points: 0,
      valueIsPoints: true,
      unit: 'cmH2O',
      description: '0.5 s end-inspiratory pause',
    },
    {
      name: 'peep',
      label: 'Set PEEP (optional)',
      type: 'number',
      points: 0,
      valueIsPoints: true,
      unit: 'cmH2O',
      description: 'Used for driving pressure = plateau minus PEEP',
    },
  ],
  results: [],
  thresholdNote: 'Start 6 mL/kg PBW (ARDSNet 2000 trial arm). The 2008 ARDSNet protocol summary starts at 8 mL/kg PBW and steps down to 6; ESICM 2023 and ATS 2024 give 4 to 8 mL/kg PBW. Keep plateau at or below 30 cmH2O. Floor 4 mL/kg PBW. Driving pressure is associated with survival, but no validated bedside cutoff is set in this calculator. Verify inputs against the ventilator before changing settings.',
  citations: [
    'ARDS Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome. N Engl J Med. 2000;342(18):1301-1308.',
    'NHLBI ARDS Clinical Network. Mechanical Ventilation Protocol Summary (July 2008 update). ardsnet.org/files/ventilator_protocol_2008-07.pdf',
    'Amato MBP, Meade MO, Slutsky AS, et al. Driving pressure and survival in the acute respiratory distress syndrome. N Engl J Med. 2015;372(8):747-755.',
  ],
  computeResult: (values: Record<string, number>) => {
    const r = computeArdsPbwTidalVolume(values);
    if (!r) {
      return {
        value: '--',
        label: 'Enter sex and height',
        description: '**ENTER:**\n• Sex\n• Height in cm or inches\n\n**THEN:** predicted body weight and tidal volume targets appear.',
        colorVar: '--color-text-muted',
      };
    }

    const vt4 = Math.round(r.vtMl[4]);
    const vt6 = Math.round(r.vtMl[6]);
    const vt8 = Math.round(r.vtMl[8]);
    const sections: string[] = [
      `**PREDICTED BODY WEIGHT:** ${r.pbwKg.toFixed(1)} kg (${r.sex}, ${r.heightIn.toFixed(1)} in)`,
      `**TIDAL VOLUME TARGETS:**\n• 4 mL/kg PBW = ${vt4} mL (floor)\n• **6 mL/kg PBW = ${vt6} mL (trial start)**\n• 8 mL/kg PBW = ${vt8} mL (protocol summary start, step down to 6 by 1 mL/kg at 2 h or less)`,
    ];
    if (r.currentVtKgPbw !== null) {
      sections.push(`**CURRENT VT:** ${r.currentVtKgPbw.toFixed(1)} mL/kg PBW`);
    }
    sections.push(`**PLATEAU PRESSURE:**\n${plateauLine(r.plateauAction, r.currentVtKgPbw)}`);
    if (r.drivingPressure !== null) {
      sections.push(`**DRIVING PRESSURE:** ${r.drivingPressure.toFixed(1)} cmH2O (plateau minus PEEP)\n• Trend it with each change. No bedside cutoff is set here.`);
    }

    const colorVar =
      r.plateauAction === 'above-30-reduce' || r.plateauAction === 'above-30-at-floor'
        ? '--color-danger'
        : r.plateauAction === 'below-25-increase'
          ? '--color-warning'
          : '--color-primary';

    return {
      value: `${vt6} mL at 6 mL/kg PBW`,
      label: r.plateauAction === 'unknown' ? 'Start 6 mL/kg PBW' : r.plateauAction.startsWith('above-30') ? 'Plateau above 30' : 'Plateau graded',
      description: sections.join('\n\n'),
      colorVar,
    };
  },
};
