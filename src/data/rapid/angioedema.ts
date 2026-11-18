import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Angioedema. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant: airway first, then one tile per mechanism-specific treatment. Findings: research/rapid/angioedema.findings.json

export const RAPID_ANGIOEDEMA: RapidStrip = {
  treeId: 'angioedema',
  variants: [
    {
      id: 'angioedema',
      label: 'Angioedema',
      tiles: [
        {
          id: 'airway-risk',
          layout: 'steps',
          action: 'Airway threat',
          figure: 'AJEM score >7',
          nodeIds: ['angio-airway-risk-tree', 'angio-start'],
          warning: { nodeId: 'angio-airway-risk-tree', text: 'Do not wait for a score if the airway is declaring itself.' },
          lines: [
            { nodeId: 'angio-start', text: 'Stridor, hypoxemia, secretion failure, rapidly progressive voice/laryngeal symptoms' },
            { nodeId: 'angio-airway-risk-tree', text: 'AJEM 2023 ED intubation-risk score:' },
            { nodeId: 'angio-airway-risk-tree', text: 'Hypertension: +2' },
            { nodeId: 'angio-airway-risk-tree', text: 'Anterior tongue swelling: +2' },
            { nodeId: 'angio-airway-risk-tree', text: 'Pharyngeal swelling: +3' },
            { nodeId: 'angio-airway-risk-tree', text: 'Drooling: +4' },
            { nodeId: 'angio-airway-risk-tree', text: 'Shortness of breath: +5' },
            { nodeId: 'angio-airway-risk-tree', text: 'Risk bands: score <5 low risk (~5% intubation), score 5-7 moderate risk (~16% intubation), score >7 high risk (~68% intubation).' },
          ],
        },
        {
          id: 'secure-airway',
          layout: 'steps',
          action: 'Secure airway',
          figure: 'Dual setup',
          condition: 'Do NOT paralyze until visualized',
          nodeIds: ['angio-airway-secure'],
          warning: { nodeId: 'angio-airway-secure', text: 'Do NOT paralyze until the airway anatomy is visualized and a viable rescue plan is ready unless the patient is crashing.' },
          lines: [
            { nodeId: 'angio-airway-secure', text: 'DUAL SETUP: intubation + cricothyrotomy ready simultaneously.' },
            { nodeId: 'angio-airway-secure', text: 'Call the most experienced airway operator early.' },
            { nodeId: 'angio-airway-secure', text: 'Keep the patient upright and spontaneously breathing if oxygenation allows.' },
          ],
        },
        {
          id: 'airway-watch',
          layout: 'steps',
          action: 'Airway watch',
          figure: 'q15 minute reassess',
          condition: 'Moderate risk, AJEM score 5-7',
          nodeIds: ['angio-airway-monitor'],
          warning: { nodeId: 'angio-airway-monitor', text: 'Do NOT rely on NIPPV (CPAP/BiPAP) because it does not treat a supraglottic/anatomic obstruction and can delay definitive airway control.' },
          lines: [
            { nodeId: 'angio-airway-monitor', text: 'Moderate-risk airway watch: q15 min reassessment, airway backup ready, scope if available, escalate for symptom progression or score >7' },
          ],
        },
        {
          id: 'im-epi',
          layout: 'drug',
          action: 'IM epinephrine',
          figure: '0.5 mg',
          condition: 'Histamine-mediated or unclear cause',
          nodeIds: ['angio-anaphy-treat', 'angio-acei'],
          warning: { nodeId: 'angio-acei', text: 'Epinephrine, antihistamines, and corticosteroids are generally INEFFECTIVE — this is a bradykinin-mediated process, not histamine-mediated.' },
          drug: {
            id: 'epinephrine',
            indication: 'Anaphylaxis — IM (first-line)',
            weightCalcs: [{ dosePerKg: 0.01, unit: 'mg', maxDose: 0.5, label: 'Pediatric IM', concentration: { amount: 1, perMl: 1, displayName: '1:1,000 (1 mg/mL)' } }],
          },
          lines: [
            { nodeId: 'angio-anaphy-treat', text: 'TREAT AS ANAPHYLAXIS — Epinephrine is first-line.' },
            { nodeId: 'angio-anaphy-treat', text: 'Epinephrine 0.3-0.5 mg IM (1 mg/mL) into anterolateral thigh' },
            { nodeId: 'angio-anaphy-treat', text: 'Repeat every 5-20 minutes, up to 3 doses' },
            { nodeId: 'angio-anaphy-treat', text: 'Pediatric: 0.01 mg/kg IM (max 0.3 mg)' },
          ],
        },
        {
          id: 'txa',
          layout: 'drug',
          action: 'Tranexamic acid',
          figure: '1 g IV load',
          condition: 'ACEi-induced angioedema',
          nodeIds: ['angio-acei-treat', 'angio-tpa'],
          warning: { nodeId: 'angio-tpa', text: 'AVOID Tranexamic Acid — contraindicated in acute ischemic stroke (thrombotic risk in setting of ongoing cerebral ischemia).' },
          drug: { id: 'tranexamic-acid', indication: 'Bradykinin-mediated angioedema' },
          lines: [
            { nodeId: 'angio-acei-treat', text: 'Discontinue ACEi permanently. Observation is the cornerstone.' },
          ],
        },
        {
          id: 'icatibant',
          layout: 'drug',
          action: 'Icatibant',
          figure: '30 mg SQ',
          condition: 'ACEi-induced angioedema',
          nodeIds: ['angio-acei-treat'],
          drug: { id: 'icatibant', indication: 'ACEi-induced angioedema (off-label)' },
          lines: [
            { nodeId: 'angio-acei-treat', text: 'Bradykinin receptor antagonist:' },
            { nodeId: 'angio-acei-treat', text: 'Icatibant 30 mg SQ' },
          ],
        },
        {
          id: 'berinert',
          layout: 'drug',
          action: 'Berinert',
          figure: '20 units/kg',
          condition: 'Hereditary angioedema (HAE)',
          nodeIds: ['angio-hae-treat'],
          drug: {
            id: 'berinert',
            indication: 'Hereditary angioedema (acute attack)',
            weightCalcs: [{ dosePerKg: 20, unit: 'units' }],
          },
          lines: [
            { nodeId: 'angio-hae-treat', text: 'First-line: C1-INH replacement therapy.' },
            { nodeId: 'angio-hae-treat', text: 'C1-INH concentrates:' },
            { nodeId: 'angio-hae-treat', text: 'Berinert 20 units/kg IV push at 4 mL/min — preferred' },
          ],
        },
      ],
    },
  ],
};
