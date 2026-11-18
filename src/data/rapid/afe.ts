import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Amniotic Fluid Embolism. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// One variant. Tile order follows the consult's node FLOW. Findings: research/rapid/afe.findings.json

export const RAPID_AFE: RapidStrip = {
  treeId: 'afe',
  variants: [
    {
      id: 'afe',
      label: 'AFE',
      tiles: [
        {
          id: 'call-team',
          layout: 'steps',
          action: 'Call team, MTP',
          figure: 'MTP immediately',
          condition: 'Bring the OR to the patient',
          nodeIds: ['afe-call'],
          warning: { nodeId: 'afe-call', text: 'Do NOT transport to OR — bring the OR to the patient.' },
          lines: [
            { nodeId: 'afe-call', text: 'OB (senior) — bedside for perimortem C/S if arrest' },
            { nodeId: 'afe-call', text: 'Anesthesia — airway + hemodynamics + massive transfusion support' },
            { nodeId: 'afe-call', text: 'NICU / Peds — neonatal resuscitation team to bedside NOW' },
            { nodeId: 'afe-call', text: 'Blood bank — activate Massive Transfusion Protocol (MTP) immediately' },
            { nodeId: 'afe-call', text: 'Perfusion / ECMO team — page during the resuscitation, not after' },
          ],
        },
        {
          id: 'cpr',
          layout: 'steps',
          action: 'High-quality CPR',
          figure: 'Pulse check ≤10 sec',
          condition: 'No pulse',
          nodeIds: ['afe-acls'],
          lines: [
            { nodeId: 'afe-acls', text: 'Check pulse (≤10 sec). If no pulse, begin high-quality CPR immediately.' },
            { nodeId: 'afe-acls', text: 'Hand position: standard — center of sternum (NOT higher; older teaching was wrong)' },
            { nodeId: 'afe-acls', text: 'Defibrillation: standard joules, standard pad placement — remove fetal monitors first' },
            { nodeId: 'afe-acls', text: 'IV access: above the diaphragm (IVC compression below)' },
          ],
        },
        {
          id: 'lud',
          layout: 'steps',
          action: 'Manual LUD',
          figure: 'Fundus ≥ umbilicus',
          condition: 'Do not delay compressions for it',
          nodeIds: ['afe-lud'],
          warning: { nodeId: 'afe-lud', text: 'Do NOT delay compressions to achieve LUD. CPR first, then add LUD as soon as a provider is available.' },
          lines: [
            { nodeId: 'afe-lud', text: 'Mandatory if fundus ≥ umbilicus (≈ ≥20 weeks). IVC compression by the gravid uterus can reduce venous return by up to 30% — CPR is ineffective without LUD.' },
            { nodeId: 'afe-lud', text: 'Both hands cup the uterus and push it up and to the patient\'s LEFT' },
            { nodeId: 'afe-lud', text: 'Continuous throughout CPR — do not stop for rhythm checks' },
          ],
        },
        {
          id: 'hysterotomy',
          layout: 'steps',
          action: 'Hysterotomy',
          figure: 'Start at minute 4',
          condition: 'Arrest and ≥20 wk (fundus ≥ umbilicus)',
          nodeIds: ['afe-pmcd', 'afe-pmcd-decision'],
          warning: { nodeId: 'afe-pmcd-decision', text: 'Where: at bedside. Do NOT transport to OR.' },
          lines: [
            { nodeId: 'afe-pmcd-decision', text: 'Is the patient in cardiac arrest AND at ≥20 weeks gestation (or fundus ≥ umbilicus)?' },
            { nodeId: 'afe-pmcd', text: 'Continue CPR + LUD throughout the procedure' },
            { nodeId: 'afe-pmcd', text: 'Midline vertical skin incision — xiphoid to pubis' },
            { nodeId: 'afe-pmcd', text: 'Vertical uterine incision — avoid placenta if visible' },
            { nodeId: 'afe-pmcd', text: 'Deliver fetus — clamp and cut cord, hand to neonatal team' },
            { nodeId: 'afe-pmcd', text: 'Deliver placenta — manual extraction, uterine massage' },
            { nodeId: 'afe-pmcd', text: 'Pack uterus — do not attempt definitive closure during arrest' },
          ],
        },
        {
          id: 'norepi',
          layout: 'drug',
          action: 'Norepinephrine',
          figure: '0.05–0.5 mcg/kg/min',
          condition: 'First choice pressor in AFE shock',
          nodeIds: ['afe-hemo'],
          warning: { nodeId: 'afe-hemo', text: 'Fluid overload worsens RV distension and septal shift.' },
          drug: {
            id: 'norepinephrine',
            indication: 'Amniotic fluid embolism — first-line pressor',
            weightCalcs: [
              { dosePerKg: 0.1, unit: 'mcg/min', label: 'Amniotic Fluid Embolism shock (0.1 mcg/kg/min)' },
            ],
          },
          lines: [
            { nodeId: 'afe-hemo', text: 'Vasopressors (first-line — start early, titrate aggressively):' },
            { nodeId: 'afe-hemo', text: 'Norepinephrine 0.05–0.5 mcg/kg/min — first choice (α > β)' },
            { nodeId: 'afe-hemo', text: 'Vasopressin 0.04 U/min — spares pulmonary vasculature, synergistic with norepi' },
          ],
        },
        {
          id: 'mtp',
          layout: 'steps',
          action: 'Massive transfusion',
          figure: 'Fibrinogen ≥150–200 mg/dL',
          condition: 'Do not wait for labs',
          nodeIds: ['afe-mtp'],
          warning: { nodeId: 'afe-mtp', text: 'Activate MTP at diagnosis — do not wait for labs.' },
          lines: [
            { nodeId: 'afe-mtp', text: 'Initial orders:' },
            { nodeId: 'afe-mtp', text: 'PRBC : FFP : Platelets = 1:1:1 (standard MTP pack)' },
            { nodeId: 'afe-mtp', text: 'Fibrinogen target ≥150–200 mg/dL (obstetric threshold higher than trauma)' },
            { nodeId: 'afe-mtp', text: 'Fibrinogen concentrate 2–4 g IV (if available — faster than cryo, volume-sparing)' },
          ],
        },
        {
          id: 'txa',
          layout: 'drug',
          action: 'Tranexamic acid',
          figure: '1 g IV over 10 min',
          condition: 'Active bleeding; <3 h from onset',
          nodeIds: ['afe-txa'],
          warning: { nodeId: 'afe-txa', text: 'Avoid rFVIIa — Leighton 2011 systematic review showed increased thrombotic death in Amniotic Fluid Embolism patients who received rFVIIa.' },
          drug: { id: 'tranexamic-acid', indication: 'Amniotic fluid embolism — antifibrinolytic' },
          lines: [
            { nodeId: 'afe-txa', text: 'Tranexamic Acid (TXA) 1 g IV over 10 min → repeat 1 g IV over 10 min at 30 min if bleeding continues.' },
          ],
        },
      ],
    },
  ],
};
