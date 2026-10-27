// -------------------------------------------------------------------
// DRAFT — Andexanet alfa pathway for anticoagulant-reversal consult.
// NOT WIRED. Integrator merges per research/new-content/anticoag-reversal/patch.md.
// Clinical sign-off required (Andy). US sales ended 12/22/2025: see acr-andexanet-status.
// -------------------------------------------------------------------

import type { DecisionNode } from '../../models/types.js';

export const ANDEXANET_NODES: DecisionNode[] = [
  {
    id: 'acr-andexanet-status',
    type: 'question',
    module: 2,
    title: 'Is Andexanet Available to You?',
    body: '**⚠️ US COMMERCIAL SALES ENDED 12/22/2025.** AstraZeneca requested voluntary withdrawal of the BLA. FDA (safety communication 12/18/2025) considers the risks of the product to outweigh its benefits. [22] Do not order andexanet from a US pharmacy or stock it.\n\n**In the US, use [4-Factor PCC](#/drug/pcc-4factor/factor xa reversal)** for factor Xa inhibitor bleeding. [21,22]\n\n**Outside the US:** the andexanet pathway applies only if licensed supply exists AND the local regulator still permits use. Confirm with pharmacy first. [21,22]',
    citation: [21, 22],
    options: [
      {
        label: 'US, or supply not confirmed',
        description: 'Use 4-factor PCC instead',
        next: 'acr-andexanet-unavailable',
        urgency: 'critical',
      },
      {
        label: 'Ex-US with licensed supply confirmed',
        description: 'Proceed to the andexanet pathway',
        next: 'acr-andexanet-agent',
      },
    ],
    summary: 'Andexanet withdrawn from US market 12/22/2025 (FDA: risks outweigh benefits) — use 4F-PCC in the US',
    safetyLevel: 'critical',
  },
  {
    id: 'acr-andexanet-unavailable',
    type: 'result',
    module: 2,
    title: 'Use 4-Factor PCC (Andexanet Not Available)',
    body: '**Andexanet is not available for this patient.** Treat factor Xa inhibitor bleeding with **4-factor PCC** per [Factor Xa Inhibitor Reversal](#/node/acr-xa-critical).\n\n**Do NOT:**\n• Use protamine for apixaban, rivaroxaban, or edoxaban\n• Treat a dabigatran bleed with PCC as first choice (idarucizumab is the specific agent)\n\n**DOSE CONFLICT OPEN:** the existing consult gives PCC doses that disagree between sections (see Factor Xa Inhibitor Reversal). Do not dose from this node until the conflict is resolved.\n\n**Monitoring:** per [Monitoring](#/node/acr-monitoring). Anti-Xa assays are unsuitable for judging andexanet effect. [21,22]',
    citation: [5, 21, 22],
    recommendation: '4-factor PCC is the reversal agent for factor Xa inhibitor bleeding when andexanet is not available. Dose per the Factor Xa Inhibitor Reversal node once the PCC dose conflict is resolved.',
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: '4-Factor PCC (Kcentra)',
        dose: 'Per Factor Xa Inhibitor Reversal node. OPEN CONFLICT: 50 units/kg (CNS) vs 25 units/kg (non-CNS) in the body; CRITICAL_ACTIONS says 50 units/kg. Andy to resolve.',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Default US reversal agent for factor Xa inhibitor bleeding since andexanet withdrawal (12/22/2025).',
      },
      monitoring: 'Per Monitoring node. Anti-Xa assays are unsuitable for judging andexanet effect.',
    },
  },
  {
    id: 'acr-andexanet-agent',
    type: 'question',
    module: 2,
    title: 'Which Anticoagulant?',
    body: 'Andexanet is labeled **only** for **apixaban** and **rivaroxaban**. It is not indicated for other factor Xa inhibitors. [21]',
    citation: [21],
    options: [
      {
        label: 'Apixaban (Eliquis) or rivaroxaban (Xarelto)',
        description: 'Labeled agents — continue to timing',
        next: 'acr-andexanet-timing',
        urgency: 'critical',
      },
      {
        label: 'Edoxaban, fondaparinux, UFH, LMWH, or dabigatran',
        description: 'Not indicated for andexanet',
        next: 'acr-andexanet-not-indicated',
      },
    ],
    summary: 'Andexanet is labeled only for apixaban and rivaroxaban',
  },
  {
    id: 'acr-andexanet-timing',
    type: 'question',
    module: 2,
    title: 'Hours Since Last Dose?',
    body: '**BEFORE DOSING:** safety has not been evaluated in patients with a thromboembolic event or disseminated intravascular coagulation in the 2 weeks before the bleed. Screen for these and for active thrombosis. [21,17]\n\nTiming and dose size together select the regimen. Last dose **8 hours or more ago** uses the **low-dose** regimen regardless of dose size. The ANDEXXA dosing table groups timing as **"< 8 Hours or Unknown"**, so unknown timing takes the under-8-hour column. [21]\n\nOpen the **Andexanet Regimen** calculator to check the regimen against the label table.',
    citation: [21],
    calculatorLinks: [
      { id: 'andexanet-regimen', label: 'Regimen selector' },
    ],
    options: [
      {
        label: '8 hours or more since last dose',
        description: 'Low-dose regimen',
        next: 'acr-andexanet-low',
        urgency: 'critical',
      },
      {
        label: 'Less than 8 hours, or timing unknown',
        description: 'Dose size decides low vs high',
        next: 'acr-andexanet-dose',
      },
    ],
    summary: 'Last dose 8 h or more ago = low dose; less than 8 h or unknown = dose size decides',
  },
  {
    id: 'acr-andexanet-dose',
    type: 'question',
    module: 2,
    title: 'Size of Last Dose?',
    body: 'Under 8 hours or unknown timing: the **low** regimen applies to apixaban ≤5 mg or rivaroxaban ≤10 mg. The **high** regimen applies to apixaban >5 mg, rivaroxaban >10 mg, or an unknown dose. [21]',
    citation: [21],
    options: [
      {
        label: 'Apixaban ≤5 mg or rivaroxaban ≤10 mg',
        description: 'Low-dose regimen',
        next: 'acr-andexanet-low',
        urgency: 'critical',
      },
      {
        label: 'Apixaban >5 mg, rivaroxaban >10 mg, or dose unknown',
        description: 'High-dose regimen',
        next: 'acr-andexanet-high',
        urgency: 'critical',
      },
    ],
    summary: 'Within 8 h: apixaban ≤5 mg / rivaroxaban ≤10 mg = low; larger or unknown dose = high',
  },
  {
    id: 'acr-andexanet-low',
    type: 'result',
    module: 2,
    title: 'Andexanet Low-Dose Regimen',
    body: '**US LABEL DOSING (ANDEXXA PI) ONLY.** Ex-US, use the local SmPC; the EU bolus duration differs.\n\n**BOLUS:** 400 mg IV at a target rate of 30 mg/min (about 13 min)\n\n**INFUSION:** 4 mg/min for 120 minutes (480 mg)\n\n**TOTAL:** 880 mg (5 × 200 mg vials)\n\n**TIMING:** Start the infusion within 2 minutes of finishing the bolus. Use a 0.2 or 0.22 micron in-line low-protein-binding filter.\n\n**CAVEATS:**\n• Before dosing: screen for thromboembolic events or DIC in the 2 weeks before the bleed, and for active thrombosis. [21,17]\n• Anti-Xa levels are unsuitable after andexanet. Do not titrate to them.\n• Boxed warning: thromboembolic and ischemic events, cardiac arrest, sudden death. See [Andexanet evidence and safety](#/node/acr-andexanet-caveats).\n• Resume anticoagulation as soon as medically appropriate.\n\n**ONLY IF** licensed supply is confirmed (see status node). [21,22]',
    citation: [21, 17, 22],
    calculatorLinks: [
      { id: 'andexanet-regimen', label: 'Regimen selector' },
    ],
    recommendation: 'Andexanet low-dose regimen per the US label (apixaban ≤5 mg, rivaroxaban ≤10 mg, or last dose ≥8 hours). Ex-US with licensed supply only.',
    confidence: 'recommended',
    treatment: {
      firstLine: {
        drug: 'Andexanet alfa (Andexxa) — ex-US only',
        dose: '400 mg IV bolus at 30 mg/min, then 4 mg/min × 120 min (480 mg); total 880 mg',
        route: 'IV',
        frequency: 'Once (bolus then 2-hour infusion)',
        duration: '~2 hours',
        notes: 'Not available in the US after 12/22/2025. Boxed warning: thromboembolic and ischemic events, cardiac arrest, sudden death. Unresponsiveness to UFH has occurred.',
      },
      monitoring: 'Per Monitoring node. Do not use anti-Xa levels to judge andexanet effect.',
    },
  },
  {
    id: 'acr-andexanet-high',
    type: 'result',
    module: 2,
    title: 'Andexanet High-Dose Regimen',
    body: '**US LABEL DOSING (ANDEXXA PI) ONLY.** Ex-US, use the local SmPC; the EU bolus duration differs.\n\n**BOLUS:** 800 mg IV at a target rate of 30 mg/min (about 27 min)\n\n**INFUSION:** 8 mg/min for 120 minutes (960 mg)\n\n**TOTAL:** 1,760 mg (9 × 200 mg vials)\n\n**TIMING:** Start the infusion within 2 minutes of finishing the bolus. Use a 0.2 or 0.22 micron in-line low-protein-binding filter.\n\n**CAVEATS:**\n• Before dosing: screen for thromboembolic events or DIC in the 2 weeks before the bleed, and for active thrombosis. [21,17]\n• The higher dose does not change the boxed warning.\n• Anti-Xa levels are unsuitable after andexanet. Do not titrate to them.\n• Resume anticoagulation as soon as medically appropriate.\n\n**ONLY IF** licensed supply is confirmed (see status node). See [Andexanet evidence and safety](#/node/acr-andexanet-caveats). [21,22]',
    citation: [21, 17, 22],
    calculatorLinks: [
      { id: 'andexanet-regimen', label: 'Regimen selector' },
    ],
    recommendation: 'Andexanet high-dose regimen per the US label (apixaban >5 mg, rivaroxaban >10 mg, or unknown dose, last dose <8 hours). Ex-US with licensed supply only.',
    confidence: 'recommended',
    treatment: {
      firstLine: {
        drug: 'Andexanet alfa (Andexxa) — ex-US only',
        dose: '800 mg IV bolus at 30 mg/min, then 8 mg/min × 120 min (960 mg); total 1,760 mg',
        route: 'IV',
        frequency: 'Once (bolus then 2-hour infusion)',
        duration: '~2 hours',
        notes: 'Not available in the US after 12/22/2025. Boxed warning applies. If last dose is 8 hours or more ago, use the low-dose regimen.',
      },
      monitoring: 'Per Monitoring node. Do not use anti-Xa levels to judge andexanet effect.',
    },
  },
  {
    id: 'acr-andexanet-not-indicated',
    type: 'result',
    module: 2,
    title: 'Andexanet NOT Indicated — Use Alternative',
    body: '**Andexanet is not indicated for this anticoagulant.** [21]\n\n• **Edoxaban, fondaparinux, betrixaban:** 4-factor PCC per [Factor Xa Inhibitor Reversal](#/node/acr-xa-critical)\n• **Dabigatran:** [Idarucizumab](#/drug/idarucizumab/dabigatran reversal) 5 g IV\n• **UFH:** andexanet is NOT a heparin antidote. Stop the infusion; [protamine](#/drug/protamine/heparin reversal) per the heparin node.\n• **Enoxaparin (LMWH):** andexanet is not labeled. See the LMWH node.',
    citation: [21, 2, 3],
    recommendation: 'Use the agent-specific alternative listed above. Andexanet is labeled only for apixaban and rivaroxaban.',
    confidence: 'definitive',
  },
  {
    id: 'acr-andexanet-caveats',
    type: 'info',
    module: 2,
    title: 'Andexanet Evidence and Safety (Read Before Using)',
    body: '**ANNEXA-I (NEJM 2024; n=530; ICH within 15 hours of a factor Xa inhibitor; 85.5% of usual-care patients received PCC) [17]:**\n• Excluded: thrombotic event within 2 weeks before enrollment [17]\n• Hemostatic efficacy 67.0% vs 53.1% (adjusted difference 13.4 points); stopped early after an interim analysis met the efficacy criterion\n• Anti-Xa activity reduced 94.5% vs 26.9% at 1–2 hours\n• Thrombotic events 10.3% vs 5.6%; ischemic stroke 6.5% vs 1.5%\n• 30-day death 27.8% vs 25.5% (P=0.51, no significant difference)\n\n**FDA analysis of ANNEXA-I (advisory committee 11/21/2024) [22]:**\n• Thrombosis 14.6% vs 6.9%\n• Thrombosis-related death through day 30: 2.5% (6 patients) vs 0.9% (2 patients)\n• 18 of 35 andexanet thrombotic events (53%) occurred earlier than usual-care events; 1 of 16 usual-care events (6.3%) did\n\n**Both thrombosis figures are shown. They differ by definition and analysis; neither is chosen here.**\n\n**ANNEXA-4 (NEJM 2019; single-arm; no comparator) [23]:**\n• Hemostasis, thrombosis, and mortality were reported without a comparator. Numbers are pending verification against the full text before quoting.\n\n**SAFETY:**\n• Boxed warning: thromboembolic and ischemic events, cardiac arrest, sudden death\n• Unresponsiveness to UFH (failure to prolong ACT) with serious thrombosis reported. Relevant to bypass, ECMO, or urgent thrombectomy\n• Anti-Xa assays are unsuitable for measuring reversal after andexanet\n• Resume anticoagulation as soon as medically appropriate; the untreated window carries the highest risk\n\n**No guideline class is printed here until the 2022 AHA/ASA recommendation is verified.** [17,21,22,23]',
    citation: [17, 21, 22, 23],
    next: 'acr-monitoring',
    summary: 'ANNEXA-I: better hemostasis, more thrombosis and ischemic stroke, no mortality benefit; boxed warning',
    safetyLevel: 'warning',
  },
];

export const ANDEXANET_CITATIONS: { num: number; text: string }[] = [
  { num: 21, text: 'ANDEXXA (coagulation factor Xa [recombinant], inactivated-zhzo) prescribing information. AstraZeneca/Alexion. Revised 03/2025. DailyMed setid 2d9d90a6-63e6-46ef-96ff-dd6519ae7b6c.' },
  { num: 22, text: 'US Food and Drug Administration. Update on the Safety of Andexxa (FDA Safety Communication), posted 12/18/2025; AstraZeneca to end US commercial sales 12/22/2025. https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/update-safety-andexxa' },
  { num: 23, text: 'Connolly SJ, Crowther M, Eikelboom JW, et al. Full Study Report of Andexanet Alfa for Bleeding Associated with Factor Xa Inhibitors (ANNEXA-4). N Engl J Med. 2019;380(14):1326-1335. doi:10.1056/NEJMoa1812430' },
];
