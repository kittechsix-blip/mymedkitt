import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Anticoagulant Reversal. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Fork at acr-agent-critical (identify the anticoagulant). Findings: research/rapid/anticoag-reversal.findings.json

export const RAPID_ANTICOAG_REVERSAL: RapidStrip = {
  treeId: 'anticoag-reversal',
  forkNodeId: 'acr-agent-critical',
  variants: [
    {
      id: 'warfarin',
      label: 'Warfarin (Coumadin)',
      tiles: [
        {
          id: 'warfarin-pcc-fixed',
          layout: 'drug',
          action: 'Kcentra fixed dose',
          figure: '1000 IU',
          condition: 'Not for intracranial bleeding',
          nodeIds: ['acr-warfarin-critical'],
          drug: { id: 'pcc-4factor', indication: 'Warfarin reversal — ICH (goal INR <1.4), fixed dose 1000 IU (PROPER-3) or per institutional protocol' },
          lines: [
            { nodeId: 'acr-warfarin-critical', text: 'PROPER-3 excluded intracranial bleeding. For ICH, use the institutional weight-based protocol below.' },
          ],
        },
        {
          id: 'warfarin-pcc-weight',
          layout: 'drug',
          action: 'Kcentra by INR',
          figure: 'INR-tiered',
          condition: 'ICH: give without waiting for INR',
          nodeIds: ['acr-warfarin-critical'],
          drug: {
            id: 'pcc-4factor',
            indication: 'Warfarin reversal — ICH (goal INR <1.4), institutional weight-based protocol (INR-tiered)',
            weightCalcs: [
              { dosePerKg: 25, unit: 'IU', maxDose: 2500, label: 'INR 2–3.9' },
              { dosePerKg: 35, unit: 'IU', maxDose: 3500, label: 'INR 4–6' },
              { dosePerKg: 50, unit: 'IU', maxDose: 5000, label: 'INR >6' },
            ],
          },
          lines: [
            { nodeId: 'acr-warfarin-critical', text: 'INR 1.3-2: 15 units/kg (max 1,500 units)' },
            { nodeId: 'acr-warfarin-critical', text: 'INR 2-4: 25 units/kg (max 2,500 units)' },
            { nodeId: 'acr-warfarin-critical', text: 'INR 4-6: 35 units/kg (max 3,500 units)' },
            { nodeId: 'acr-warfarin-critical', text: 'INR >6: 50 units/kg (max 5,000 units)' },
          ],
        },
        {
          id: 'warfarin-vitk',
          layout: 'drug',
          action: 'Vitamin K',
          figure: '10 mg',
          condition: 'With PCC, both required',
          nodeIds: ['acr-warfarin-critical'],
          warning: { nodeId: 'acr-warfarin-critical', text: 'IV only — SC has erratic absorption, IM causes hematoma' },
          drug: { id: 'vitamin-k', indication: 'Warfarin reversal — ICH (always with PCC)' },
          lines: [
            { nodeId: 'acr-warfarin-critical', text: 'Two simultaneous therapies — BOTH required:' },
            { nodeId: 'acr-warfarin-critical', text: 'Takes 6-12h to work, but prevents INR rebound when PCC wears off (6-8h)' },
          ],
        },
      ],
    },
    {
      id: 'dabigatran',
      label: 'Dabigatran (Pradaxa)',
      tiles: [
        {
          id: 'dabigatran-idarucizumab',
          layout: 'drug',
          action: 'Idarucizumab',
          figure: '5 g',
          condition: 'Specific dabigatran reversal agent',
          nodeIds: ['acr-dabigatran-critical'],
          drug: { id: 'idarucizumab', indication: 'Dabigatran reversal — ICH or life-threatening bleeding' },
          lines: [
            { nodeId: 'acr-dabigatran-critical', text: '5 g IV total: two 2.5 g doses, no more than 15 min apart' },
            { nodeId: 'acr-dabigatran-critical', text: 'Onset: within minutes. Consider if last dose <12-24h (normal renal function)' },
          ],
        },
        {
          id: 'dabigatran-pcc',
          layout: 'steps',
          action: 'PCC instead',
          figure: 'If unavailable',
          condition: 'Idarucizumab not available',
          nodeIds: ['acr-dabigatran-critical'],
          lines: [
            { nodeId: 'acr-dabigatran-critical', text: 'If unavailable: 4-Factor PCC' },
          ],
        },
      ],
    },
    {
      id: 'factor-xa',
      label: 'Factor Xa inhibitor',
      tiles: [
        {
          id: 'xa-pcc',
          layout: 'drug',
          action: 'Kcentra (4F-PCC)',
          figure: '50 IU/kg',
          condition: 'Higher end if life-threatening or ICH',
          nodeIds: ['acr-xa-critical'],
          drug: {
            id: 'pcc-4factor',
            indication: 'DOAC reversal — ICH (Xa inhibitor, off-label)',
            weightCalcs: [{ dosePerKg: 50, unit: 'IU', maxDose: 5000 }],
          },
          lines: [
            { nodeId: 'acr-xa-critical', text: 'first-line in the US (off-label for DOACs), where andexanet alfa is no longer marketed' },
            { nodeId: 'acr-xa-critical', text: 'CNS bleeding: 50 units/kg (max 5,000 units)' },
          ],
        },
      ],
    },
    {
      id: 'heparin',
      label: 'Heparin (UFH or LMWH)',
      tiles: [
        {
          id: 'heparin-stop',
          layout: 'steps',
          action: 'Stop heparin',
          figure: 'Usually sufficient',
          condition: 'Protamine only for severe bleeding',
          nodeIds: ['acr-heparin-critical'],
          lines: [
            { nodeId: 'acr-heparin-critical', text: 'In most cases, discontinuing the heparin infusion is sufficient' },
            { nodeId: 'acr-heparin-critical', text: 'Protamine is reserved for severe bleeding (e.g., ICH).' },
          ],
        },
        {
          id: 'ufh-protamine',
          layout: 'drug',
          action: 'Protamine (UFH)',
          figure: '1 mg per 100 units',
          condition: 'UFH bolus <30 min ago; severe bleed',
          nodeIds: ['acr-ufh-reversal', 'acr-heparin-critical'],
          warning: { nodeId: 'acr-heparin-critical', text: 'Excessive protamine causes paradoxical coagulopathy.' },
          drug: { id: 'protamine', indication: 'Heparin reversal — ICH or life-threatening bleeding' },
          lines: [
            { nodeId: 'acr-ufh-reversal', text: 'If given as bolus:' },
            { nodeId: 'acr-ufh-reversal', text: '<30 min ago: 1 mg per 100 units heparin (max 50 mg)' },
            { nodeId: 'acr-ufh-reversal', text: 'Give slowly over 15 minutes — rapid infusion → hypotension, bradycardia, anaphylactoid reaction' },
          ],
        },
        {
          id: 'lmwh-protamine',
          layout: 'drug',
          action: 'Protamine (LMWH)',
          figure: '1 mg per 1 mg',
          condition: 'Enoxaparin <8h; partial reversal',
          nodeIds: ['acr-lmwh-reversal'],
          warning: { nodeId: 'acr-lmwh-reversal', text: 'Fondaparinux (Arixtra): Protamine is NOT effective. Consider PCC.' },
          drug: { id: 'protamine', indication: 'LMWH (enoxaparin) reversal' },
          lines: [
            { nodeId: 'acr-lmwh-reversal', text: 'Protamine only neutralizes ~50% of enoxaparin (Lovenox) anti-Xa activity.' },
            { nodeId: 'acr-lmwh-reversal', text: '<8h since dose: 1 mg protamine per 1 mg enoxaparin (max 50 mg)' },
            { nodeId: 'acr-lmwh-reversal', text: '8-12h since dose: 0.5 mg per 1 mg enoxaparin' },
            { nodeId: 'acr-lmwh-reversal', text: '>12h since dose: Protamine unlikely to help' },
          ],
        },
      ],
    },
    {
      id: 'tpa',
      label: 'tPA / Thrombolytics',
      tiles: [
        {
          id: 'tpa-txa',
          layout: 'drug',
          action: 'Tranexamic acid',
          figure: '1 g',
          condition: 'Or Amicar, whichever is faster',
          nodeIds: ['acr-tpa-critical'],
          warning: { nodeId: 'acr-tpa-critical', text: "Act immediately — don't wait for labs in an actively bleeding patient." },
          drug: { id: 'tranexamic-acid', indication: 'tPA / thrombolytic reversal — major bleeding' },
          lines: [
            { nodeId: 'acr-tpa-critical', text: 'Antifibrinolytic — choose whichever is faster to obtain:' },
            { nodeId: 'acr-tpa-critical', text: 'Tranexamic acid (Cyklokapron) 1 g IV over 10 min, then 1 g over next hour' },
          ],
        },
        {
          id: 'tpa-amicar',
          layout: 'drug',
          action: 'Aminocaproic acid',
          figure: '4-5 g',
          condition: 'Or TXA, whichever is faster',
          nodeIds: ['acr-tpa-critical'],
          drug: { id: 'aminocaproic-acid', indication: 'tPA / thrombolytic reversal — alternative to TXA' },
          lines: [
            { nodeId: 'acr-tpa-critical', text: 'Antifibrinolytic — choose whichever is faster to obtain:' },
            { nodeId: 'acr-tpa-critical', text: 'Aminocaproic acid (Amicar) 4-5 g IV load, then 1 g/hour' },
          ],
        },
        {
          id: 'tpa-cryo',
          layout: 'drug',
          action: 'Cryoprecipitate',
          figure: '10 units',
          condition: 'With the antifibrinolytic',
          nodeIds: ['acr-tpa-critical'],
          drug: { id: 'cryoprecipitate', indication: 'tPA reversal' },
          lines: [
            { nodeId: 'acr-tpa-critical', text: 'Cryoprecipitate 10 units initially (two 5-unit pools)' },
            { nodeId: 'acr-tpa-critical', text: 'Target fibrinogen >150-200 mg/dL (>200 for ICH)' },
          ],
        },
      ],
    },
  ],
};
