import type { RapidStrip } from './types.js';

// RAPID strip (format v3), PE Treatment, crashing PE (Category D-E) only. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant (the consult's first fork is a risk-category triage, not two resuscitation paths). Tile order follows node FLOW.
// Findings: research/rapid/pe-treatment.findings.json

export const RAPID_PE_TREATMENT: RapidStrip = {
  treeId: 'pe-treatment',
  variants: [
    {
      id: 'crashing-pe',
      label: 'Crashing PE',
      tiles: [
        {
          id: 'no-intubation',
          layout: 'steps',
          action: 'Avoid intubation',
          figure: 'High-flow O2',
          condition: 'if possible',
          nodeIds: ['pe-crashing-resus'],
          warning: { nodeId: 'pe-crashing-resus', text: 'Standard shock resuscitation worsens massive PE.' },
          lines: [
            { nodeId: 'pe-crashing-resus', text: 'AVOID INTUBATION if possible' },
            { nodeId: 'pe-crashing-resus', text: 'Positive pressure worsens RV performance' },
            { nodeId: 'pe-crashing-resus', text: 'May precipitate cardiac arrest' },
            { nodeId: 'pe-crashing-resus', text: 'Use high-flow O2 (100% O2 = pulmonary vasodilator)' },
          ],
        },
        {
          id: 'no-fluids',
          layout: 'steps',
          action: 'Avoid fluid loading',
          figure: 'RV already dilated',
          condition: '<500 mL only if clearly hypovolemic',
          nodeIds: ['pe-crashing-resus'],
          lines: [
            { nodeId: 'pe-crashing-resus', text: 'AVOID FLUID LOADING' },
            { nodeId: 'pe-crashing-resus', text: 'RV already dilated — fluids worsen failure' },
            { nodeId: 'pe-crashing-resus', text: 'Diuresis may improve hemodynamics (Terlipressin 2013)' },
            { nodeId: 'pe-crashing-resus', text: 'Cautious: <500 mL only if clearly hypovolemic' },
          ],
        },
        {
          id: 'vasopressors',
          layout: 'steps',
          action: 'Early vasopressors',
          figure: 'Norepinephrine first',
          condition: 'Peripheral line OK',
          nodeIds: ['pe-crashing-resus'],
          lines: [
            { nodeId: 'pe-crashing-resus', text: 'EARLY VASOPRESSORS' },
            { nodeId: 'pe-crashing-resus', text: 'Norepinephrine preferred first-line' },
            { nodeId: 'pe-crashing-resus', text: 'Push-dose phenylephrine 100-200 mcg for immediate support' },
            { nodeId: 'pe-crashing-resus', text: 'Peripheral line OK if expedites stabilization' },
          ],
        },
        {
          id: 'pert',
          layout: 'steps',
          action: 'Activate PERT',
          figure: 'Class 1 (2026 AHA/ACC)',
          nodeIds: ['pe-crashing-resus'],
          lines: [
            { nodeId: 'pe-crashing-resus', text: 'ACTIVATE PERT — Class 1 recommendation (2026 AHA/ACC)' },
          ],
        },
        {
          id: 'ufh',
          layout: 'drug',
          action: 'Heparin (UFH)',
          figure: 'No bolus',
          condition: 'if thrombolysis imminent',
          nodeIds: ['pe-crashing-reperfusion'],
          warning: { nodeId: 'pe-crashing-reperfusion', text: 'Give alteplase BEFORE heparin to reduce bleeding risk' },
          drug: { id: 'ufh', indication: 'High-risk / Massive PE' },
          lines: [
            { nodeId: 'pe-crashing-reperfusion', text: 'Anticoagulation — start immediately:' },
            { nodeId: 'pe-crashing-reperfusion', text: 'UFH — no bolus if thrombolysis imminent; low-dose infusion ≤500 U/hr' },
            { nodeId: 'pe-crashing-reperfusion', text: 'UFH preferred (can be stopped if hemorrhage)' },
          ],
        },
        {
          id: 'alteplase',
          layout: 'drug',
          action: 'Alteplase',
          figure: '100 mg over 2 h',
          condition: 'No absolute contraindications',
          nodeIds: ['pe-crashing-reperfusion'],
          warning: { nodeId: 'pe-crashing-reperfusion', text: 'Give alteplase BEFORE heparin to reduce bleeding risk' },
          drug: { id: 'alteplase', indication: 'High-risk PE', weightCalcs: [{ dosePerKg: 0.6, unit: 'mg', maxDose: 50, label: 'Bolus (first 15 min)' }] },
          lines: [
            { nodeId: 'pe-crashing-reperfusion', text: 'Dosing options:' },
            { nodeId: 'pe-crashing-reperfusion', text: 'Standard: Alteplase 100 mg IV over 2h (0.6 mg/kg up to 50 mg over first 15 min, remainder over next 1h45min)' },
            { nodeId: 'pe-crashing-reperfusion', text: 'Reduced-dose: 50 mg IV over 2h (emerging — less bleeding, equivalent efficacy; HI-PEITHO 2026)' },
          ],
        },
        {
          id: 'alteplase-arrest',
          layout: 'drug',
          action: 'Alteplase in arrest',
          figure: '50 mg IV bolus',
          condition: 'Cardiac arrest',
          nodeIds: ['pe-crashing-reperfusion'],
          warning: { nodeId: 'pe-crashing-reperfusion', text: 'avoid concurrent heparin bolus' },
          drug: { id: 'alteplase', indication: 'PE arrest/peri-arrest' },
          lines: [
            { nodeId: 'pe-crashing-reperfusion', text: 'Dosing options:' },
            { nodeId: 'pe-crashing-reperfusion', text: 'Cardiac arrest: 50 mg IV bolus + sustained CPR' },
          ],
        },
      ],
    },
  ],
};
