// MedKitt — Headache Hub (EM canonical + Neurology cross-list, type: 'hub')
//
// REWRITE 2026-07-15. Converted to the rule-in / rule-out ENGINE template
// (same skeleton as dyspnea-hub, chest-pain-hub, abdominal-pain-hub). For
// each dangerous cause the hub walks a validated instrument or a tight
// clinical gate to an explicit verdict — excluded loops back to triage,
// ruled-in links out to the deep-dive consult. This is NOT a differential
// printer; it is a bedside decision engine.
//
//   Module 1 — Sick Check (gestalt + vitals trend + quick neuro/eye)
//   Module 2 — Rule In / Rule Out (triage question → per-cause chains)
//   Module 3 — Rescue / Reassess (2025 AHS parenteral cocktail)
//   Module 4 — Imaging (CT / CTA / MRV / LP decision cheat-sheet)
//   Module 5 — Disposition (admit / observe / discharge)
//
// Instruments walked: Ottawa SAH Rule (thunderclap), Canadian CT Head Rule
// (post-trauma). Clinical gates: GCA, meningitis, AACG, CO, dissection, CVST.
//
// CROSS-LINK DIRECTIONALITY (PLAN.md R8): hub links INTO splits; splits
// never link back. All outbound #/tree/ targets validated against
// tree-service.ts. EBM sources only.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const HEADACHE_HUB_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Sick Check
  // ============================================================
  {
    id: 'hh-start',
    type: 'info',
    module: 1,
    title: 'Headache Hub — Sick Check First',
    body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Subarachnoid hemorrhage** \u2014 thunderclap, worst-ever, exertional onset.\n2. **Bacterial meningitis / encephalitis** \u2014 fever + meningismus + altered; do not delay antibiotics.\n3. **CNS venous sinus thrombosis** \u2014 progressive headache, hypercoag risk, papilledema, seizure.\n4. **Carbon monoxide poisoning** \u2014 co-exposure, multiple sick contacts, headache + nausea.\n5. **Acute angle-closure glaucoma / GCA** \u2014 red painful eye + halos, or jaw claudication + scalp tenderness in older adults.\n\n**First 60 seconds — scan sick vs not-sick:**\n- General appearance \u2014 diaphoretic, ill, holding head, rocking?\n- Mental status \u2014 full sentences, oriented?\n- Vitals TREND (not one snapshot) \u2014 BP rising, fever, brady + HTN (Cushing), tachycardia, hypoxia (true SpO\u2082 on co-oximetry if CO suspected)\n- Quick neuro \u2014 pupils, EOMs, gross motor, speech, gait if able\n- Quick eye \u2014 red? mid-dilated? halos? proptosis?\n- Skin \u2014 petechial rash, cherry-red (CO, late), trauma signs\n\n**If ANY of:** altered, hypotensive, hypoxic, febrile + meningeal, focal deficit, active seizure, status migrainosus with vomiting + dehydration \u2014 start resus PARALLEL to workup. Bay 1, IV access, monitor, O\u2082, fluid bolus, glucose, call for help.\n\n**If stable + protecting airway:** continue to Rule In / Rule Out (next node).',
    citation: [1, 7],
    next: 'hh-triage',
    summary: 'Gestalt sick check + vitals trend + quick neuro + eye + skin. If unstable: resus first, hub later.',
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 2 — Rule In / Rule Out
  // ============================================================
  {
    id: 'hh-triage',
    type: 'question',
    module: 2,
    title: 'Rule In / Rule Out — Pick the Thread to Walk',
    body: 'Ask history-first. Each option opens a short chain that walks a validated rule or a tight clinical gate to an explicit verdict. If a cause is EXCLUDED you loop back here to walk the next thread. When every dangerous thread is cleared and the pattern matches prior benign HA \u2192 Rescue.',
    options: [
      {
        label: 'First-ever / worst-of-life / thunderclap (peak <1 min)',
        description: 'SAH \u2014 walk the Ottawa SAH Rule, then CT \u00b1 LP',
        next: 'hh-sah-entry',
        urgency: 'critical',
      },
      {
        label: 'Focal deficit, AMS, or new seizure',
        description: 'Stroke / ICH / status / mass / encephalitis \u2014 image + consult',
        next: 'hh-neuro-entry',
        urgency: 'critical',
      },
      {
        label: 'Fever + meningeal signs OR immunocompromised',
        description: 'Bacterial meningitis \u2014 antibiotics within 60 min',
        next: 'hh-mening-entry',
        urgency: 'critical',
      },
      {
        label: 'Painful red eye + halos around lights + nausea',
        description: 'AACG \u2014 IOP now, no mydriatics, no dim lights',
        next: 'hh-aacg-entry',
        urgency: 'critical',
      },
      {
        label: 'Winter heater / indoor fuel-burner / multiple sick at one address',
        description: 'CO toxicity \u2014 co-oximetry (SpO\u2082 lies), 100% NRB now',
        next: 'hh-co-entry',
        urgency: 'critical',
      },
      {
        label: 'Age >50 + new HA + jaw claudication / scalp tenderness / vision change',
        description: 'GCA \u2014 ESR/CRP + empiric steroid before biopsy',
        next: 'hh-gca-entry',
        urgency: 'urgent',
      },
      {
        label: 'Neck pain + Horner OR recent neck trauma / manipulation',
        description: 'Cervical artery dissection \u2014 CTA neck',
        next: 'hh-dissection-entry',
        urgency: 'urgent',
      },
      {
        label: 'Papilledema, seizure, or hypercoag risk (postpartum / OCP / thrombophilia)',
        description: 'CVST \u2014 MRV or CT venogram',
        next: 'hh-cvst-entry',
        urgency: 'urgent',
      },
      {
        label: 'Pregnant or postpartum',
        description: 'Pre-eclampsia / CVST / RCVS / apoplexy all on the table',
        next: 'hh-preg-entry',
        urgency: 'urgent',
      },
      {
        label: 'Recent trauma',
        description: 'Walk the Canadian CT Head Rule',
        next: 'hh-trauma-entry',
        urgency: 'urgent',
      },
      {
        label: 'Severe unilateral periorbital + ipsilateral autonomic + restless',
        description: 'Cluster \u2014 100% O\u2082 NRB while transitioning',
        next: 'hh-cluster-entry',
        urgency: 'urgent',
      },
      {
        label: 'Electric-shock V2/V3 face pain triggered by touch / chewing / cold',
        description: 'Trigeminal neuralgia \u2014 HLA-B*1502 screen before CBZ',
        next: 'hh-tn-entry',
      },
      {
        label: 'All dangerous threads cleared \u2014 pattern matches prior benign HA',
        description: 'Rescue cocktail + reassess at 60-90 min',
        next: 'hh-rescue',
      },
    ],
    citation: [1, 7, 4, 5, 6],
    summary: 'Walk each dangerous thread to a verdict. Excluded loops back here. All clear + benign pattern \u2192 Rescue.',
    safetyLevel: 'critical',
  },

  // -------- SAH chain: Ottawa SAH Rule --------
  {
    id: 'hh-sah-entry',
    type: 'question',
    module: 2,
    title: 'SAH \u2014 Ottawa SAH Rule',
    body: 'The **Ottawa SAH Rule** applies to alert patients \u226515 yo with new SEVERE non-traumatic headache reaching MAXIMUM intensity within 1 hour. Do NOT apply it to focal deficit, known aneurysm/SAH/brain tumor, or chronic recurrent same-character headaches.\n\n**The rule is 100% sensitive for SAH.** Investigate if ANY of these is present:',
    options: [
      {
        label: 'ANY high-risk feature present',
        description: 'Age \u226540 \u00b7 neck pain/stiffness \u00b7 witnessed LOC \u00b7 onset during exertion \u00b7 thunderclap (instantly peaking) \u00b7 limited neck flexion on exam',
        next: 'hh-sah-verdict',
        urgency: 'critical',
      },
      {
        label: 'NONE of the six features \u2014 rule negative',
        description: 'Ottawa SAH Rule negative rules out SAH in this population',
        next: 'hh-sah-excluded',
      },
    ],
    citation: [5, 6, 16],
    summary: 'Ottawa SAH Rule (100% sens): age \u226540, neck pain/stiffness, LOC, exertional onset, thunderclap, limited neck flexion.',
    safetyLevel: 'critical',
  },
  {
    id: 'hh-sah-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 SAH Workup Now',
    body: 'Ottawa SAH Rule positive \u2192 investigate. Open [SAH](#/tree/sah) for CT timing and LP-for-xanthochromia indications.\n\n**Non-contrast CT head:** sensitivity ~98% within 6 h of onset (approaches 100% with a modern scanner + expert read), drops sharply after 6-12 h. **If CT is negative AND onset >6 h ago \u2192 LP for xanthochromia** (or CTA per local pathway).\n\n**Next 5 minutes while transitioning:** IV access, monitor, BP control if SBP >160 (target 140-160, labetalol or nicardipine), neuro recheck q15 min, neurosurgery consult on positive CT.\n\n**If CT and CSF both negative + onset >6 h** \u2014 also consider [Cervical Artery Dissection](#/tree/cervical-artery-dissection), [CVST](#/tree/cvst), RCVS (recurrent thunderclap + vasoactive trigger), and pituitary apoplexy (sudden HA + visual field defect + ophthalmoplegia).',
    recommendation: 'Open SAH consult. Non-contrast CT now (~98% \u22646 h). LP if CT negative + onset >6 h. BP 140-160. Neurosurgery on positive CT.',
    confidence: 'definitive',
    citation: [5, 6, 7, 16],
    safetyLevel: 'critical',
  },
  {
    id: 'hh-sah-excluded',
    type: 'result',
    module: 2,
    title: 'SAH \u2014 Ruled Out',
    body: 'Ottawa SAH Rule negative in an eligible patient rules out SAH (100% sensitivity, validated). No CT mandated by the rule alone.\n\n\u26A0\ufe0f The rule only applies to the eligible population (alert, \u226515 yo, new severe headache peaking within 1 h, no focal deficit / no known aneurysm-SAH-tumor / not chronic-recurrent). If your patient falls OUTSIDE those criteria, the rule does not clear them \u2014 image on clinical grounds.\n\nReturn to Rule In / Rule Out and walk the next dangerous thread.',
    recommendation: 'SAH excluded by negative Ottawa rule (eligible patients only). Continue triage.',
    confidence: 'definitive',
    citation: [5, 6, 16],
    next: 'hh-triage',
  },

  // -------- Focal / AMS / seizure chain --------
  {
    id: 'hh-neuro-entry',
    type: 'question',
    module: 2,
    title: 'Focal Deficit / AMS / Seizure \u2014 Confirm',
    body: 'A true new focal neurologic deficit, depressed mental status, or a first/new seizure with headache is a rule-in for structural or infectious intracranial pathology until imaging says otherwise.',
    options: [
      {
        label: 'Objective focal deficit, GCS drop, or seizure confirmed',
        description: 'Image first \u2014 this is a structural/infectious emergency',
        next: 'hh-neuro-verdict',
        urgency: 'critical',
      },
      {
        label: 'No objective deficit \u2014 symptoms resolved / migrainous aura pattern',
        description: 'Fully reversible aura in a known migraineur without new features',
        next: 'hh-neuro-excluded',
      },
    ],
    citation: [7],
    summary: 'Objective focal deficit / AMS / seizure = image first. Fully reversible typical aura in a known migraineur = not this.',
    safetyLevel: 'critical',
  },
  {
    id: 'hh-neuro-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 Image First, Open the Deep-Dive',
    body: 'Non-contrast CT for hemorrhage / mass effect; add contrast or MRI if infection or tumor suspected.\n\n**Open the consult that fits:**\n- [SAH](#/tree/sah) if thunderclap onset is also present\n- [ICH](#/tree/ich) for any spontaneous intracranial bleed\n- Acute ischemic stroke pathway for the tPA / EVT decision and NIHSS\n- [Meningitis / Encephalitis](#/tree/meningitis) if fever + neuro signs OR isolated AMS in immunocompromised\n- [Status Epilepticus](#/tree/status-epilepticus) if active or recent seizure\n\n**Next 5 minutes:** IV access, monitor, fingerstick glucose, assess airway (consider RSI if GCS \u22648), reverse anticoagulation early if ICH suspected + on an anticoagulant.',
    recommendation: 'Image first. Open the deep-dive consult that fits. Reverse anticoagulation early if ICH suspected.',
    confidence: 'definitive',
    citation: [7],
    safetyLevel: 'critical',
  },
  {
    id: 'hh-neuro-excluded',
    type: 'result',
    module: 2,
    title: 'Focal / AMS / Seizure \u2014 Not This Thread',
    body: 'A fully reversible, typical aura (visual scintillations / march of sensory symptoms over 5-60 min, then resolution) in an established migraineur with NO new features does not require emergent imaging on its own.\n\n\u26A0\ufe0f First-ever aura, aura lasting >60 min, motor weakness (hemiplegic migraine mimics stroke), or any residual deficit \u2192 do NOT clear \u2014 image and treat as the rule-in branch.\n\nReturn to Rule In / Rule Out.',
    recommendation: 'Reversible typical aura in a known migraineur \u2014 not a structural emergency. Continue triage.',
    confidence: 'recommended',
    citation: [7],
    next: 'hh-triage',
  },

  // -------- Meningitis chain --------
  {
    id: 'hh-mening-entry',
    type: 'question',
    module: 2,
    title: 'Meningitis / Encephalitis \u2014 Confirm Suspicion',
    body: 'Fever + headache + ANY of: neck stiffness / meningismus, altered mental status, photophobia, petechial rash, seizure, or an immunocompromised host with new headache. Kernig/Brudzinski are insensitive \u2014 absence does NOT exclude.',
    options: [
      {
        label: 'Meningitis / encephalitis suspected \u2014 do not delay',
        description: 'Empiric antibiotics within 60 min of suspicion',
        next: 'hh-mening-verdict',
        urgency: 'critical',
      },
      {
        label: 'Afebrile, no meningeal/CNS signs, immunocompetent',
        description: 'Clinical picture does not support CNS infection',
        next: 'hh-mening-excluded',
      },
    ],
    citation: [7, 10],
    summary: 'Fever + HA + meningeal/CNS sign OR immunocompromise = treat empirically. Absent Kernig/Brudzinski does not exclude.',
    safetyLevel: 'critical',
  },
  {
    id: 'hh-mening-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 Antibiotics Within 60 Minutes',
    body: 'Open [Meningitis / Encephalitis](#/tree/meningitis) for empiric selection by age + immune status, CT-before-LP indications, CSF interpretation, and steroid adjunct timing.\n\n**Empiric antibiotics target within 60 minutes of suspicion. Do NOT wait for imaging or LP.** CT before LP IS indicated for AMS / focal deficit / papilledema / immunocompromise / recent seizure / age >60 \u2014 but that does NOT delay the empiric dose (draw cultures if fast, otherwise give antibiotics first).\n\n**Standard empiric (refined in the Meningitis consult):** ceftriaxone 2 g IV + vancomycin 15-20 mg/kg IV; add ampicillin 2 g IV if age <3 mo or >50 yo (Listeria); add acyclovir 10 mg/kg IV if encephalitis features. **Dexamethasone 10 mg IV with or just before the first antibiotic dose** if bacterial meningitis suspected.',
    recommendation: 'Antibiotics within 60 min + dexamethasone with/before first dose. Open Meningitis consult. Do not delay for imaging/LP.',
    confidence: 'definitive',
    citation: [7, 10, 11],
    safetyLevel: 'critical',
  },
  {
    id: 'hh-mening-excluded',
    type: 'result',
    module: 2,
    title: 'Meningitis \u2014 Unlikely',
    body: 'Afebrile, no meningeal or CNS signs, and immunocompetent makes acute bacterial meningitis unlikely on this visit. There is no validated ED rule that fully excludes it, so re-examine if fever or CNS signs emerge during the stay.\n\nReturn to Rule In / Rule Out and walk the next thread.',
    recommendation: 'CNS infection unlikely with no fever/meningeal signs in an immunocompetent host. Re-check if picture changes.',
    confidence: 'recommended',
    citation: [7, 10],
    next: 'hh-triage',
  },

  // -------- AACG chain --------
  {
    id: 'hh-aacg-entry',
    type: 'question',
    module: 2,
    title: 'Acute Angle-Closure Glaucoma \u2014 Confirm',
    body: 'Painful red eye + halos around lights + nausea/vomiting + a mid-dilated, poorly reactive pupil, often a hazy/steamy cornea. Confirm with IOP measurement (tonometry).',
    options: [
      {
        label: 'IOP markedly elevated (typically >30-40 mmHg) with classic exam',
        description: 'AACG confirmed \u2014 emergent ophthalmology + medical IOP-lowering',
        next: 'hh-aacg-verdict',
        urgency: 'critical',
      },
      {
        label: 'IOP normal / eye white and quiet / pupil normal',
        description: 'Not angle closure \u2014 reconsider cluster or other cause',
        next: 'hh-aacg-excluded',
      },
    ],
    citation: [7, 22],
    summary: 'Painful red eye + halos + mid-dilated fixed pupil + IOP >30-40 = AACG. Normal IOP + quiet eye = not this.',
    safetyLevel: 'critical',
  },
  {
    id: 'hh-aacg-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 AACG',
    body: 'Open [AACG](#/tree/aacg) \u2014 emergent ophthalmology, IOP measurement now, medical IOP-lowering (timolol + brimonidine + dorzolamide + oral acetazolamide + IV mannitol if severe; pilocarpine once IOP begins to fall).\n\n\ud83d\uded1 **Do NOT dim the room lights** (pupillary dilation worsens angle closure).\n\ud83d\uded1 **Do NOT use mydriatic drops.**\n\ud83d\uded1 **Do NOT discharge** without ophthalmology disposition (definitive Rx is laser peripheral iridotomy).',
    recommendation: 'Ophthalmology now. Medical IOP-lowering. No dim lights, no mydriatics, no discharge without ophtho.',
    confidence: 'definitive',
    citation: [7, 22],
    safetyLevel: 'critical',
  },
  {
    id: 'hh-aacg-excluded',
    type: 'result',
    module: 2,
    title: 'AACG \u2014 Ruled Out',
    body: 'Normal IOP with a white, quiet eye and a normal pupil rules out acute angle closure as the cause.\n\nIf the pain is more "behind/around" the eye with a NORMAL or miotic pupil + autonomic features (lacrimation, conjunctival injection, ptosis, rhinorrhea) + restlessness, think **cluster** instead \u2014 walk that thread from triage.\n\nReturn to Rule In / Rule Out.',
    recommendation: 'Angle closure excluded by normal IOP/quiet eye. Consider cluster if autonomic. Continue triage.',
    confidence: 'definitive',
    citation: [7, 22],
    next: 'hh-triage',
  },

  // -------- CO chain --------
  {
    id: 'hh-co-entry',
    type: 'question',
    module: 2,
    title: 'Carbon Monoxide \u2014 Confirm with Co-oximetry',
    body: '\ud83d\uded1 **Standard pulse oximetry reads CO-Hgb as oxyhemoglobin \u2014 FALSELY NORMAL.** You cannot rule CO in or out with SpO\u2082. Use **co-oximetry** (arterial OR venous blood gas with co-ox, or a SpCO probe).\n\nWhile the level is pending, place the patient on **100% O\u2082 via non-rebreather** \u2014 do not wait for the number.',
    options: [
      {
        label: 'CO-Hgb elevated (>3-5% non-smoker, >10% smoker) OR symptomatic with exposure',
        description: 'CO toxicity \u2014 100% O\u2082, assess for hyperbaric',
        next: 'hh-co-verdict',
        urgency: 'critical',
      },
      {
        label: 'Co-oximetry normal AND no compelling exposure',
        description: 'CO toxicity excluded by a true co-ox level',
        next: 'hh-co-excluded',
      },
    ],
    citation: [9, 21],
    summary: 'SpO\u2082 is falsely normal \u2014 use co-oximetry. Elevated CO-Hgb or symptomatic exposure = CO toxicity. Normal co-ox = excluded.',
    safetyLevel: 'critical',
  },
  {
    id: 'hh-co-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 CO Toxicity',
    body: 'Open [CO Toxicity](#/tree/co-toxicity) for the full pathway (CO-Hgb thresholds, hyperbaric O\u2082 indications per UHMS 2019, pregnancy considerations).\n\n**Next 5 minutes:** keep the patient on **100% O\u2082 via NRB** (cuts CO-Hgb half-life from ~5 h on room air to ~80 min). Continue O\u2082 regardless of the measured level pending the result and until symptoms clear.\n\n**Hyperbaric consideration** at lower thresholds for: pregnancy, LOC, neurologic deficit, cardiac ischemia, CO-Hgb >25% (>20% in pregnancy). Remove all household members from the source; screen everyone at the address.',
    recommendation: '100% NRB now. Open CO Toxicity consult. HBO for pregnancy / LOC / neuro or cardiac ischemia / high CO-Hgb.',
    confidence: 'definitive',
    citation: [9, 21],
    safetyLevel: 'critical',
  },
  {
    id: 'hh-co-excluded',
    type: 'result',
    module: 2,
    title: 'CO \u2014 Ruled Out',
    body: 'A true co-oximetry level in the normal range with no compelling exposure rules out CO poisoning as the cause of this headache.\n\n\u26A0\ufe0f Remember a level can normalize after the patient has been on oxygen or removed from the source for hours \u2014 correlate with exposure history and timing.\n\nReturn to Rule In / Rule Out.',
    recommendation: 'CO excluded by normal co-oximetry. Mind timing/oxygen effect on the level. Continue triage.',
    confidence: 'definitive',
    citation: [9, 21],
    next: 'hh-triage',
  },

  // -------- GCA chain --------
  {
    id: 'hh-gca-entry',
    type: 'question',
    module: 2,
    title: 'Giant Cell Arteritis \u2014 Clinical Gate',
    body: 'Age \u226550 is the entry criterion. Then look for the high-yield features that drive empiric treatment.',
    options: [
      {
        label: 'Age \u226550 + new HA + \u22651 of: jaw claudication, scalp tenderness, visual change, PMR symptoms, ESR/CRP elevated',
        description: 'Treat empirically \u2014 do not wait for biopsy',
        next: 'hh-gca-verdict',
        urgency: 'urgent',
      },
      {
        label: 'Age <50, or none of the GCA features and normal inflammatory markers',
        description: 'GCA unlikely',
        next: 'hh-gca-excluded',
      },
    ],
    citation: [7, 13],
    summary: 'Age \u226550 + new HA + jaw claudication / scalp tenderness / vision change / PMR / \u2191ESR-CRP = treat empirically.',
    safetyLevel: 'warning',
  },
  {
    id: 'hh-gca-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 GCA (Treat Before Biopsy)',
    body: 'Work up and treat **IN PARALLEL \u2014 do NOT wait for biopsy to start steroid.**\n\n1. **ESR + CRP stat** (ESR usually >50; up to ~5% have normal ESR \u2014 CRP is more sensitive; check both).\n2. **Empiric high-dose corticosteroid NOW:**\n   - No visual symptoms: **prednisone 60 mg PO daily**.\n   - Visual symptoms or jaw claudication: **methylprednisolone 1 g IV daily \u00d7 3 days**, then prednisone 60 mg PO.\n3. **Ophthalmology** (visual symptoms) + **rheumatology** (biopsy + long-term management) consults.\n4. **Temporal artery biopsy within 1-2 weeks** \u2014 steroid does NOT obscure yield in that window; bilateral biopsy raises sensitivity.\n\n**Why the urgency:** untreated GCA causes irreversible vision loss in ~20%; once one eye is hit, the other can follow within days.',
    recommendation: 'ESR + CRP + empiric high-dose steroid NOW (IV pulse if visual/jaw). Biopsy within 1-2 weeks. Ophtho for visual symptoms.',
    confidence: 'definitive',
    citation: [7, 13],
    safetyLevel: 'critical',
  },
  {
    id: 'hh-gca-excluded',
    type: 'result',
    module: 2,
    title: 'GCA \u2014 Unlikely',
    body: 'Age <50, or no GCA features with normal ESR and CRP, makes giant cell arteritis unlikely. There is no perfect rule-out \u2014 if inflammatory markers were not checked and suspicion is more than trivial, send ESR + CRP before fully clearing.\n\nReturn to Rule In / Rule Out.',
    recommendation: 'GCA unlikely by age/features/markers. Send ESR+CRP if any residual suspicion. Continue triage.',
    confidence: 'recommended',
    citation: [7, 13],
    next: 'hh-triage',
  },

  // -------- Dissection chain --------
  {
    id: 'hh-dissection-entry',
    type: 'question',
    module: 2,
    title: 'Cervical Artery Dissection \u2014 Clinical Gate',
    body: 'Headache and/or neck pain (often sudden, unilateral) PLUS any of: partial Horner syndrome (ptosis + miosis), pulsatile tinnitus, cranial nerve palsy, or posterior-circulation stroke symptoms. Ask about recent chiropractic manipulation, MVC (even minor), strenuous exertion, forceful cough/vomiting, or connective tissue disease.',
    options: [
      {
        label: 'Horner, focal deficit, or a compelling mechanism present',
        description: 'Image the neck vessels',
        next: 'hh-dissection-verdict',
        urgency: 'urgent',
      },
      {
        label: 'Isolated neck ache, no Horner, no deficit, no mechanism',
        description: 'Dissection low-probability on this thread',
        next: 'hh-dissection-excluded',
      },
    ],
    citation: [7, 24],
    summary: 'HA/neck pain + Horner / focal deficit / compelling mechanism = CTA neck. Isolated neck ache without these = low-prob.',
    safetyLevel: 'warning',
  },
  {
    id: 'hh-dissection-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 Dissection',
    body: 'Open [Cervical Artery Dissection](#/tree/cervical-artery-dissection) for risk stratification, imaging, and management.\n\n**Imaging:** CTA neck (carotid + vertebral) is the practical first study in most EDs; MRA + fat-suppressed neck MRI is the reference standard if available and the patient is stable. **Vertebral** dissection presents as posterior HA + neck pain \u00b1 posterior-circulation stroke \u2014 a different posture than carotid.\n\n**Management** (refined in the consult): antithrombotic (antiplatelet vs anticoagulation) decision under stroke/neurology; avoid manipulation of the neck.',
    recommendation: 'CTA neck. Open the dissection consult. Antithrombotic choice under stroke/neuro.',
    confidence: 'definitive',
    citation: [7, 24],
    safetyLevel: 'warning',
  },
  {
    id: 'hh-dissection-excluded',
    type: 'result',
    module: 2,
    title: 'Dissection \u2014 Low Probability',
    body: 'Isolated neck ache without Horner, focal deficit, or a compelling mechanism is low-probability for cervical artery dissection. There is no ED decision rule that formally excludes it, so image if a Horner or deficit emerges, or if the mechanism story surfaces.\n\nReturn to Rule In / Rule Out.',
    recommendation: 'Dissection low-probability without Horner/deficit/mechanism. Image if the picture evolves. Continue triage.',
    confidence: 'recommended',
    citation: [7, 24],
    next: 'hh-triage',
  },

  // -------- CVST chain --------
  {
    id: 'hh-cvst-entry',
    type: 'question',
    module: 2,
    title: 'CVST \u2014 Clinical Gate',
    body: 'Think CVST with a progressive or thunderclap headache PLUS a hypercoagulable context or raised-ICP picture: postpartum (peaks ~1-3 weeks out), OCP + smoking, thrombophilia, malignancy, dehydration; papilledema, seizure, or a focal deficit that does not fit an arterial territory; or an isolated raised-ICP picture without another cause.',
    options: [
      {
        label: 'Hypercoag risk + papilledema / seizure / atypical focal deficit',
        description: 'Venous imaging',
        next: 'hh-cvst-verdict',
        urgency: 'urgent',
      },
      {
        label: 'No hypercoag risk, no papilledema/seizure, normal exam',
        description: 'CVST low-probability on this thread',
        next: 'hh-cvst-excluded',
      },
    ],
    citation: [7, 23],
    summary: 'Hypercoag context + papilledema/seizure/atypical deficit = MRV or CT venogram. Normal exam + no risk = low-prob.',
    safetyLevel: 'warning',
  },
  {
    id: 'hh-cvst-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 CVST',
    body: 'Open [CVST](#/tree/cvst). **MRV** is the workhorse; **CT venogram** is acceptable when MRV is unavailable (a plain non-contrast CT is insensitive \u2014 a dense-vein/cord sign is suggestive but its absence does not exclude).\n\n**Treatment** (refined in the CVST consult): therapeutic anticoagulation (UFH or LMWH) even when a hemorrhagic venous infarct is present on imaging; neurology + hematology consult; treat raised ICP and seizures.',
    recommendation: 'MRV (or CT venogram). Open CVST consult. Anticoagulate per the consult even with hemorrhagic infarct.',
    confidence: 'definitive',
    citation: [7, 23],
    safetyLevel: 'warning',
  },
  {
    id: 'hh-cvst-excluded',
    type: 'result',
    module: 2,
    title: 'CVST \u2014 Low Probability',
    body: 'No hypercoagulable context, no papilledema or seizure, and a normal exam make CVST low-probability. A normal D-dimer lowers the probability further but does not fully exclude it in a high-suspicion patient \u2014 image if risk factors or ICP signs surface.\n\nReturn to Rule In / Rule Out.',
    recommendation: 'CVST low-probability without hypercoag risk/ICP signs. Image if the picture evolves. Continue triage.',
    confidence: 'recommended',
    citation: [7, 23],
    next: 'hh-triage',
  },

  // -------- Pregnancy chain --------
  {
    id: 'hh-preg-entry',
    type: 'question',
    module: 2,
    title: 'Pregnancy / Postpartum \u2014 Broaden the Net',
    body: 'Pregnancy and the postpartum period massively broaden the dangerous differential. Check the BP first \u2014 pre-eclampsia is the highest-yield, most treatable cause.',
    options: [
      {
        label: 'BP \u2265140/90 (or rising) + proteinuria or end-organ signs',
        description: 'Pre-eclampsia pathway \u2014 magnesium, BP control, OB',
        next: 'hh-preg-verdict',
        urgency: 'critical',
      },
      {
        label: 'Normotensive \u2014 but pregnant/postpartum with a concerning HA',
        description: 'CVST / RCVS / apoplexy / dissection still in play',
        next: 'hh-preg-verdict',
        urgency: 'urgent',
      },
    ],
    citation: [8],
    summary: 'Check BP first. \u2265140/90 + proteinuria/end-organ = pre-eclampsia. Normotensive still needs CVST/RCVS/apoplexy workup.',
    safetyLevel: 'critical',
  },
  {
    id: 'hh-preg-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 Pregnancy/Postpartum Workup',
    body: 'Work these in parallel based on findings:\n\n- **[HTN in Pregnancy / Pre-eclampsia](#/tree/htn-pregnancy)** if BP \u2265140/90 + proteinuria or end-organ signs. Magnesium for seizure prophylaxis; treat severe-range BP; delivery is definitive.\n- **[CVST](#/tree/cvst)** if papilledema, seizure, or focal deficit \u2014 postpartum hypercoag peaks ~3 weeks. MRV.\n- **RCVS** if recurrent thunderclap + vasoactive trigger (ergots, SSRIs, cannabis, postpartum). CTA/MRA; nimodipine per neuro.\n- **Pituitary apoplexy** if sudden severe HA + visual field defect + ophthalmoplegia.\n- **[Cervical Artery Dissection](#/tree/cervical-artery-dissection)** if neck pain + Horner \u2014 postpartum is a known window.\n\n**Imaging in pregnancy:** non-contrast CT is acceptable for life-threats (shield abdomen). MRI without gadolinium preferred when available.\n\n**Analgesia in pregnancy:** acetaminophen first-line; metoclopramide + diphenhydramine + magnesium are the safer parenteral adjuncts. Avoid ergots and valproate; NSAIDs only if <30 weeks and with OB agreement.',
    recommendation: 'Pre-eclampsia (Mg + BP + OB) / CVST / RCVS / apoplexy / dissection in parallel. MRI no-gad if feasible.',
    confidence: 'definitive',
    citation: [8],
    safetyLevel: 'critical',
  },

  // -------- Trauma chain: Canadian CT Head Rule --------
  {
    id: 'hh-trauma-entry',
    type: 'question',
    module: 2,
    title: 'Post-Traumatic HA \u2014 Canadian CT Head Rule',
    body: 'The **Canadian CT Head Rule** applies to minor head injury (GCS 13-15, witnessed LOC / amnesia / disorientation) in patients \u226516 yo. It does NOT apply to anticoagulation/bleeding disorder, seizure after injury, or age <16 \u2014 those get imaged/assessed outside the rule.\n\nCT is required if ANY high- or medium-risk feature is present.',
    options: [
      {
        label: 'ANY rule feature present',
        description: 'High: GCS <15 at 2 h \u00b7 suspected open/depressed skull fx \u00b7 signs of basal skull fx \u00b7 \u22652 vomiting episodes \u00b7 age \u226565. Medium: amnesia >30 min before impact \u00b7 dangerous mechanism',
        next: 'hh-trauma-verdict',
        urgency: 'urgent',
      },
      {
        label: 'NONE of the features (and rule is applicable)',
        description: 'CT not required by the rule',
        next: 'hh-trauma-excluded',
      },
    ],
    citation: [15],
    summary: 'Canadian CT Head Rule (minor TBI, GCS 13-15, LOC/amnesia). ANY high/medium feature = CT. Anticoag/seizure/<16 excluded from rule.',
    safetyLevel: 'warning',
  },
  {
    id: 'hh-trauma-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 CT for Post-Traumatic HA',
    body: 'Canadian CT Head Rule positive (or the rule does not apply because of anticoagulation / bleeding disorder / post-injury seizure / age <16) \u2192 **non-contrast CT head.** Open your shop\u2019s TBI / intracranial hemorrhage pathway.\n\n**If anticoagulated + ICH suspected or confirmed:** reverse early (4-factor PCC for warfarin/factor Xa inhibitors per protocol; idarucizumab for dabigatran; platelets rarely indicated) and consult neurosurgery.\n\n**Post-LP HA** (orthostatic + recent LP) and **spontaneous CSF leak** (orthostatic HA + tinnitus, no LP history) are distinct entities \u2014 hydration/caffeine/analgesia \u00b1 blood patch for the former; MRI brain with contrast (diffuse pachymeningeal enhancement) for the latter.',
    recommendation: 'Non-contrast CT. Reverse anticoagulation early if ICH. Neurosurgery for positive CT.',
    confidence: 'definitive',
    citation: [15, 7, 19],
    safetyLevel: 'warning',
  },
  {
    id: 'hh-trauma-excluded',
    type: 'result',
    module: 2,
    title: 'Post-Traumatic HA \u2014 CT Not Required',
    body: 'Canadian CT Head Rule negative in an applicable patient \u2014 CT is not required (the rule is ~100% sensitive for neurosurgically-important injury and 80-100% for any clinically-important injury).\n\n**Chronic post-traumatic HA (>3 months) without progressive features** \u2014 conservative management + neuro/sports-medicine follow-up; persistent post-concussive syndrome is well described and does NOT warrant escalation without new red flags.\n\nReturn to Rule In / Rule Out.',
    recommendation: 'No CT by a negative Canadian CT Head Rule (applicable patients). Conservative for chronic without progression. Continue triage.',
    confidence: 'definitive',
    citation: [15],
    next: 'hh-triage',
  },

  // -------- Cluster chain --------
  {
    id: 'hh-cluster-entry',
    type: 'question',
    module: 2,
    title: 'Cluster Headache \u2014 Phenotype Gate',
    body: 'Severe, strictly unilateral, orbital/supraorbital/temporal pain lasting 15-180 min, with at least one IPSILATERAL autonomic feature (conjunctival injection, lacrimation, nasal congestion/rhinorrhea, eyelid edema, ptosis/miosis) and a sense of restlessness/agitation. First-ever cluster-type attacks warrant neuroimaging at least once to exclude a secondary mimic.',
    options: [
      {
        label: 'Classic cluster phenotype (known pattern or confirmed)',
        description: 'Start O\u2082 while transitioning to the cluster pathway',
        next: 'hh-cluster-verdict',
        urgency: 'urgent',
      },
      {
        label: 'Autonomic features but atypical / first-ever / red flags',
        description: 'Image first to exclude a secondary cause, then treat',
        next: 'hh-neuro-entry',
        urgency: 'urgent',
      },
    ],
    citation: [3, 18],
    summary: 'Strictly unilateral 15-180 min + ipsilateral autonomic + restless = cluster. First-ever/atypical = image first.',
    safetyLevel: 'warning',
  },
  {
    id: 'hh-cluster-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 Cluster',
    body: 'Open [Cluster Headache](#/tree/cluster-headache) for the full acute \u2192 bridge \u2192 maintenance pathway.\n\n**Next 5 minutes while transitioning:** place the patient on **100% O\u2082 via NRB at 12-15 L/min** (NOT nasal cannula \u2014 peaks ~40% FiO\u2082, inadequate). O\u2082 is diagnostic and therapeutic \u2014 ~78% abort within 15 min. If not aborted by ~7 min, add SQ sumatriptan (screen contraindications in the cluster consult first).\n\nIf O\u2082 + triptan both fail \u2192 consider a greater [occipital nerve block](#/tree/occipital-nerve-block) at the bedside while finalizing the bridge plan.',
    recommendation: 'Start O\u2082 NRB 12-15 L/min. Open Cluster consult. SQ sumatriptan if not aborted; ONB if refractory.',
    confidence: 'definitive',
    citation: [3, 18],
    safetyLevel: 'warning',
  },

  // -------- Trigeminal neuralgia chain --------
  {
    id: 'hh-tn-entry',
    type: 'question',
    module: 2,
    title: 'Trigeminal Neuralgia \u2014 Confirm + Screen',
    body: 'Paroxysmal, electric-shock/stabbing pain in V2/V3 (occasionally V1), seconds to <2 min per paroxysm, triggered by light touch, chewing, talking, cold wind, or tooth-brushing, with a normal exam between attacks.',
    options: [
      {
        label: 'Classic ICHD-3 TN phenotype',
        description: 'HLA-B*1502 ancestry screen BEFORE carbamazepine',
        next: 'hh-tn-verdict',
      },
      {
        label: 'Atypical (age <40, bilateral, V1-only, constant pain, sensory deficit)',
        description: 'MRI with trigeminal sequences before chronic therapy',
        next: 'hh-tn-verdict',
        urgency: 'urgent',
      },
    ],
    citation: [12, 20],
    summary: 'Paroxysmal shock-like V2/V3 pain triggered by touch/chewing, normal interictal exam = TN. Atypical features = MRI first.',
  },
  {
    id: 'hh-tn-verdict',
    type: 'result',
    module: 2,
    title: 'RULE IN \u2014 Trigeminal Neuralgia',
    body: 'Open [Trigeminal Neuralgia](#/tree/trigeminal-neuralgia) for ICHD-3 confirmation \u2192 MRI triggers \u2192 carbamazepine ladder \u2192 surgical referral.\n\n\ud83d\uded1 **Before the first carbamazepine or oxcarbazepine dose:** screen HLA-B*1502 ancestry (Han Chinese, Thai, Vietnamese, Filipino, Malay, Indonesian). Positive = avoid both (SJS/TEN risk); bridge with gabapentin or baclofen while the test is pending or use those long-term.\n\n**Atypical features** (age <40, bilateral, V1-only, constant baseline pain, sensory deficit) require MRI brain with FIESTA/CISS trigeminal sequences BEFORE chronic carbamazepine \u2014 looking for a vascular loop, MS plaque, or cerebellopontine-angle tumor.',
    recommendation: 'HLA-B*1502 screen by ancestry before CBZ. MRI for atypical features. Open TN consult.',
    confidence: 'definitive',
    citation: [12, 20],
  },

  // ============================================================
  // Module 3 — Rescue / Reassess
  // ============================================================
  {
    id: 'hh-rescue',
    type: 'info',
    module: 3,
    title: 'Rescue Cocktail — Benign-Pattern HA',
    body: 'Every dangerous thread cleared, pattern matches prior benign HA (migraine, tension, undifferentiated). Standard parenteral cocktail (2025 AHS acute-migraine guidance):\n\n**THE COCKTAIL:**\n- [Prochlorperazine 10 mg IV](#/drug/prochlorperazine/migraine cocktail) over ~15 min \u2014 workhorse antidopaminergic, the highest-evidence parenteral agent (AHS Level A)\n- [Diphenhydramine 25 mg IV](#/drug/diphenhydramine/migraine cocktail) \u2014 akathisia prophylaxis (DO NOT SKIP \u2014 prochlorperazine is the worst offender)\n- [Ketorolac 15-30 mg IV](#/drug/ketorolac/migraine) \u2014 NSAID component (cap 15 mg if age >65, renal disease, or low body weight)\n- [Magnesium 1-2 g IV](#/drug/magnesium-sulfate/migraine) over 15 min \u2014 adjunct, best for migraine with aura and menstrual migraine\n- **1 L NS bolus** \u2014 often the most therapeutic single element\n\n**Metoclopramide alternative** if prochlorperazine is unavailable or QT is a concern: [Metoclopramide 10 mg IV](#/drug/metoclopramide/status migrainosus) \u2014 similar efficacy, slightly less akathisia.\n\n**Add-on with strong 2025 evidence:** a **greater occipital nerve block** is now a first-tier ED option for refractory or contraindicated-pharmacotherapy patients \u2014 fast, safe, opioid-sparing (see refractory node).\n\n**Avoid:** opioids (worsen recurrence, feed medication-overuse HA), butalbital combinations (Fioricet), and repeat triptans within 24 h of any ergot.\n\n**Pregnancy:** acetaminophen IV + metoclopramide IV + diphenhydramine IV + magnesium is the safest cocktail. Avoid ergots and valproate; NSAIDs only if <30 weeks.',
    citation: [2, 14],
    next: 'hh-rescue-reassess',
    summary: 'Prochlorperazine 10 IV + diphenhydramine 25 IV + ketorolac 15-30 IV + Mg 1-2 g + 1 L NS. Metoclopramide if unavailable. ONB is first-tier. Avoid opioids/butalbital.',
    safetyLevel: 'warning',
  },
  {
    id: 'hh-rescue-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess at 60-90 Minutes',
    body: 'Re-examine: pain-score trend, ability to tolerate PO, any NEW neurologic feature (red-flag emergence), orthostatic check before discharge.',
    options: [
      {
        label: 'Pain reduced \u226550% + tolerating PO + no new neuro \u2192 discharge plan',
        description: 'Standard pathway for benign-pattern HA',
        next: 'hh-dispo-discharge',
      },
      {
        label: 'Partial response \u2014 second round or observation',
        description: 'Repeat antidopaminergic/NSAID, add dexamethasone, obs reassess at 4-6 h',
        next: 'hh-rescue-second',
        urgency: 'urgent',
      },
      {
        label: 'Refractory after second round \u2192 ONB or DHE protocol',
        description: 'Greater occipital nerve block at bedside; DHE after antiemetic pretreatment',
        next: 'hh-rescue-refractory',
        urgency: 'urgent',
      },
      {
        label: 'NEW neurologic finding OR escalating pain unlike presentation',
        description: 'Stop the rescue pathway. Image now. Return to Rule In / Rule Out.',
        next: 'hh-triage',
        urgency: 'critical',
      },
    ],
    citation: [2, 14],
    summary: 'Reassess at 60-90 min. Discharge if \u226550% better + PO + no new neuro. Escalate or re-image if not.',
  },
  {
    id: 'hh-rescue-second',
    type: 'result',
    module: 3,
    title: 'Second Round / Observation',
    body: '**Options for partial response:**\n- Repeat [Prochlorperazine 10 mg IV](#/drug/prochlorperazine/migraine cocktail) (or switch to [Metoclopramide 10 mg IV](#/drug/metoclopramide/status migrainosus) if akathisia despite diphenhydramine)\n- Add **dexamethasone 10 mg IV** \u2014 reduces 24-72 h recurrence (NNT ~9 pooled)\n- Add **valproate 500-1000 mg IV** over 10-15 min if not contraindicated (avoid pregnancy, liver disease)\n- Repeat NS 1 L bolus if dehydrated\n- ED obs unit for 4-6 h with planned reassessment\n\n**At second reassessment (4-6 h):** improved \u2192 discharge bundle; still refractory \u2192 ONB or DHE; new neuro feature \u2192 image now.',
    recommendation: 'Repeat antidopaminergic, add dexamethasone, consider obs-unit reassessment at 4-6 h.',
    confidence: 'recommended',
    citation: [2, 14, 17],
  },
  {
    id: 'hh-rescue-refractory',
    type: 'result',
    module: 3,
    title: 'Refractory — ONB or DHE',
    body: '**Greater occipital nerve block (ONB)** \u2014 bedside, 5-15 min onset, works for status migrainosus + cluster + occipital neuralgia + cervicogenic + post-traumatic. Now a first-tier ED option in the 2025 guidance. Open [Greater Occipital Nerve Block](#/tree/occipital-nerve-block) for landmarks, aspiration check, agent selection, and post-procedure care.\n\n**DHE (dihydroergotamine) IV** \u2014 Raskin-style protocol: metoclopramide 10 mg IV first (anti-nausea pretreatment), then DHE 0.5-1 mg IV slow push. Repeat q8h \u00d7 3 days as an inpatient if status migrainosus is refractory.\n\n**DHE absolute contraindications:** pregnancy, CAD, uncontrolled HTN, triptan within 24 h, peripheral vascular disease, breastfeeding.\n\n**Disposition for true refractory status migrainosus:** admit for inpatient DHE protocol, neurology consult, IV magnesium, sleep + hydration, taper of any overused acute analgesics.',
    recommendation: 'ONB at bedside (first-tier); DHE if not contraindicated; admit if true status migrainosus.',
    confidence: 'recommended',
    citation: [2, 14],
    safetyLevel: 'warning',
  },

  // ============================================================
  // Module 4 — Imaging
  // ============================================================
  {
    id: 'hh-imaging',
    type: 'info',
    module: 4,
    title: 'Imaging Decision Cheat-Sheet',
    body: 'You should NOT image every headache. Image when ANY of the following:\n\n**Indications for non-contrast CT head:**\n- First-or-worst / thunderclap onset\n- New HA in age >50\n- Focal deficit, AMS, seizure\n- Post-traumatic with red flags (Canadian CT Head Rule)\n- HIV / immunocompromised with new HA\n- Anticoagulated with new HA\n- Papilledema\n- Pattern change in a known primary HA disorder (new quality, location, or frequency)\n- Pregnancy + HA with any red flag (shield abdomen)\n\n**Add modality by suspicion:**\n- **CTA / MRA brain + neck:** suspected dissection ([Cervical Artery Dissection](#/tree/cervical-artery-dissection)), RCVS, vasculitis, vertebral pathology\n- **CT venogram or MRV:** suspected [CVST](#/tree/cvst), papilledema with negative CT\n- **MRI brain with contrast:** suspected mass, infection, MS, lower-grade pathology missed on CT (esp. posterior fossa)\n- **LP:** suspected [SAH](#/tree/sah) with negative CT >6 h from onset; suspected [Meningitis](#/tree/meningitis); idiopathic intracranial hypertension (opening pressure)\n\n**CT BEFORE LP indicated when:** decreased LOC \u00b7 focal neurologic deficit \u00b7 papilledema \u00b7 immunocompromise \u00b7 recent seizure (within 1 week) \u00b7 history of CNS disease \u00b7 age >60. Otherwise LP can proceed without CT.\n\n**Sensitivity caveats:**\n- Non-contrast CT for SAH: ~98% within 6 h; drops sharply after 12-24 h. LP for xanthochromia is the rescue test after 6 h.\n- CT misses cerebellar / posterior fossa pathology more often than MRI \u2014 low threshold to MRI if posterior fossa suspected.\n\n**No imaging needed:** recurrent benign-pattern HA in a known migraineur with no red flags; tension-type pattern with no SNNOOP10 features (this is where the checklist earns its keep \u2014 as a recall list when you are NOT imaging).',
    citation: [5, 6, 7],
    next: 'hh-dispo',
    summary: 'Image when ANY red flag. CT first; CTA/MRV/MRI/LP by suspicion. CT-before-LP if AMS/focal/papilledema/immunocomp/recent seizure/age >60.',
  },

  // ============================================================
  // Module 5 — Disposition
  // ============================================================
  {
    id: 'hh-dispo',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Common framework across undifferentiated HA. The deep-dive consults carry phenotype-specific admit criteria \u2014 defer to those once you commit.',
    options: [
      {
        label: 'Discharge \u2014 pain controlled + tolerating PO + no red flags',
        description: 'Standard pathway for benign-pattern HA after the cocktail',
        next: 'hh-dispo-discharge',
      },
      {
        label: 'Observe \u2014 partial response, awaiting labs/imaging, or social barrier',
        description: 'ED observation unit; reassess at 4-6 h',
        next: 'hh-dispo-observe',
      },
      {
        label: 'Admit \u2014 red-flag workup positive, refractory, SI, pregnancy emergency',
        description: 'Admit per the deep-dive consult\u2019s admit criteria',
        next: 'hh-dispo-admit',
        urgency: 'urgent',
      },
    ],
    citation: [7, 14],
    summary: 'Discharge if controlled + PO + no flags. Observe if partial/pending. Admit per deep-dive consult criteria.',
  },
  {
    id: 'hh-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge — Universal Checklist',
    body: 'Before discharge:\n\n1. Pain reduced to an acceptable level (typically \u22643/10 or back to baseline)\n2. Tolerating PO\n3. Orthostatic vitals normal (prochlorperazine + diphenhydramine + ketorolac can drop BP)\n4. No new neurologic findings on recheck\n5. **Suicide screen** if cluster (highest SI of any primary HA), TN, chronic migraine, or mood-disorder features + chronic pain\n6. **Written return precautions covering:** first-or-worst severity \u00b7 new neurologic symptom (weakness, numbness, vision/speech change) \u00b7 fever or stiff neck \u00b7 persistent vomiting \u00b7 severe pain unresponsive to home Rx \u00b7 any vision change \u00b7 seizure\n7. **Follow-up arranged:** PCP 1-2 wks (new tension-type, mild migraine); Neurology 1-2 wks (new cluster, TN, refractory migraine, atypical features); OB/MFM (pregnancy-related); Ophthalmology (AACG, optic/visual concerns)\n8. **Consult-specific discharge bundle delivered** \u2014 see the relevant deep-dive (e.g., home O\u2082 + SQ sumatriptan for cluster; verapamil + ECG schedule for cluster maintenance; carbamazepine titration + lab plan for TN)\n\n**Counseling for the typical migraineur:** avoid daily analgesic use (medication-overuse HA: triptans/ergots \u226510 d/mo, simple analgesics \u226515 d/mo); sleep regularity, hydration, regular meals, stress management; trigger diary for 4-6 weeks if recurrent; prophylaxis referral if \u22654 HA days/mo.',
    recommendation: 'Discharge only after pain controlled, PO tolerated, no new neuro, written return precautions, follow-up arranged.',
    confidence: 'definitive',
    citation: [7, 14],
  },
  {
    id: 'hh-dispo-observe',
    type: 'result',
    module: 5,
    title: 'Observe — Partial Response or Pending Workup',
    body: 'ED observation unit appropriate when:\n\n- Partial response after the first cocktail round \u2014 second round + reassess at 4-6 h\n- Awaiting CSF or advanced imaging (MRI, MRV)\n- Status migrainosus on IV cocktail \u2014 assess at 4-6 h before escalating\n- Pain control insufficient for discharge but no admission criteria\n- Transportation / safety / social barriers to discharge\n\n**Reassessment at 4-6 h:** re-examine for any new neurologic sign (red-flag emergence \u2192 return to Module 2); pain-score trend; tolerating PO; orthostatic vitals. Improving \u2192 discharge bundle. Not improving \u2192 escalate (DHE, ONB, admit).',
    recommendation: 'Obs unit + 4-6 h reassessment. Re-examine for new neuro signs; escalate if no improvement.',
    confidence: 'recommended',
    citation: [7],
  },
  {
    id: 'hh-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit',
    body: 'Admit when:\n\n- **Red-flag workup positive** \u2014 SAH, ICH, meningitis, dissection, CVST, AACG with IOP not medically controlled, pre-eclampsia/eclampsia, severe CO for hyperbaric\n- **Refractory primary HA** \u2014 status migrainosus failing IV cocktail + DHE; cluster failing O\u2082 + 2 SQ triptans + ONB; TN crisis with dehydration and weight loss\n- **Active suicidal ideation**\n- **Severe medication adverse event** requiring monitored correction (significant hyponatremia, SJS/TEN suspicion, severe drug interaction)\n- **IV bridging therapy needing continuous monitoring** (IV DHE Raskin protocol, IV fosphenytoin loading for TN crisis)\n- **Pregnancy-related HA** with pre-eclampsia / eclampsia / RCVS / CVST findings\n- **Cannot safely discharge** \u2014 no outpatient O\u2082 access for cluster, no reliable outpatient lab monitoring\n\n**Service selection:** Neurology (refractory primary HA, IV bridge, TN crisis); Medicine (infectious workup, comorbidities); OB (pregnancy-related with BP component); Neurosurgery (SAH / ICH / mass); ICU (AMS, hemodynamic instability, severe CO with hyperbaric pending).',
    recommendation: 'Admit per deep-dive consult criteria. Match the service to the dominant diagnosis.',
    confidence: 'recommended',
    citation: [7],
    safetyLevel: 'warning',
  },
];

export const HEADACHE_HUB_CRITICAL_ACTIONS = [
  { text: 'Sick check FIRST — vitals trend + AMS + quick neuro + quick eye. If unstable, resus parallel to workup.', nodeId: 'hh-start' },
  { text: 'Thunderclap = walk the Ottawa SAH Rule. Positive → CT (~98% sens ≤6 h) → LP for xanthochromia if CT negative + onset >6 h.', nodeId: 'hh-sah-verdict' },
  { text: 'Fever + meningismus or immunocompromise = empiric antibiotics + dexamethasone within 60 min. Do NOT delay for imaging or LP.', nodeId: 'hh-mening-verdict' },
  { text: 'Painful red eye + halos + mid-dilated pupil + IOP >30-40 = AACG. Do NOT dim lights, no mydriatics, no discharge without ophtho.', nodeId: 'hh-aacg-verdict' },
  { text: 'CO toxicity requires co-oximetry — standard SpO₂ is FALSELY NORMAL. 100% NRB now while disposition decided.', nodeId: 'hh-co-entry' },
  { text: 'Age ≥50 + new HA + jaw claudication / scalp tenderness / vision change = GCA. Empiric high-dose steroid BEFORE biopsy.', nodeId: 'hh-gca-verdict' },
  { text: 'Post-trauma HA = walk the Canadian CT Head Rule. Anticoagulated / post-injury seizure / age <16 fall outside the rule — image them.', nodeId: 'hh-trauma-entry' },
  { text: 'Trigeminal neuralgia + at-risk ancestry = HLA-B*1502 screen BEFORE first carbamazepine or oxcarbazepine dose.', nodeId: 'hh-tn-verdict' },
  { text: 'Rescue cocktail (2025 AHS): prochlorperazine 10 IV + diphenhydramine 25 IV (akathisia prophylaxis) + ketorolac 15-30 IV + Mg 1-2 g + 1 L NS.', nodeId: 'hh-rescue' },
  { text: 'Reassess at 60-90 min. ANY new neuro finding = stop the rescue pathway, image, return to Rule In / Rule Out.', nodeId: 'hh-rescue-reassess' },
  { text: 'Avoid opioids and butalbital combos for benign-pattern HA — worsens recurrence, drives medication-overuse HA. ONB is first-tier for refractory.', nodeId: 'hh-rescue' },
  { text: 'Discharge requires: pain controlled + PO tolerated + no new neuro + written return precautions + follow-up arranged.', nodeId: 'hh-dispo-discharge' },
];

export const HEADACHE_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018;38(1):1-211. (ICHD-3)' },
  { num: 2, text: 'Orr SL, Friedman BW, Christie S, et al. Management of Adults With Acute Migraine in the Emergency Department: The American Headache Society Evidence Assessment of Parenteral Pharmacotherapies. Headache. 2016;56(6):911-940. (updated by AHS 2025 acute-treatment guidance)' },
  { num: 3, text: 'Robbins MS, Starling AJ, Pringsheim TM, Becker WJ, Schwedt TJ. Treatment of Cluster Headache: The American Headache Society Evidence-Based Guidelines. Headache. 2016;56(7):1093-1106.' },
  { num: 4, text: 'Do TP, Remmers A, Schytz HW, et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list. Neurology. 2019;92(3):134-144.' },
  { num: 5, text: 'Perry JJ, Stiell IG, Sivilotti ML, et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255. (Ottawa SAH Rule)' },
  { num: 6, text: 'Perry JJ, Sivilotti MLA, Sutherland J, et al. Validation of the Ottawa Subarachnoid Hemorrhage Rule in patients with acute headache. CMAJ. 2017;189(45):E1379-E1385.' },
  { num: 7, text: 'Godwin SA, Cherkas DS, Panagos PD, Shih RD, Byyny R, Wolf SJ. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the Emergency Department With Acute Headache. Ann Emerg Med. 2019;74(4):e41-e74. (ACEP 2019)' },
  { num: 8, text: 'American College of Obstetricians and Gynecologists. ACOG Committee Opinion No. 723: Guidelines for diagnostic imaging during pregnancy and lactation. Obstet Gynecol. 2017;130(4):e210-e216. / ACOG Practice Bulletin: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.' },
  { num: 9, text: 'Moon RE, editor. Hyperbaric Oxygen Therapy Indications. 14th ed. North Palm Beach, FL: Best Publishing Company / Undersea and Hyperbaric Medical Society; 2019. ISBN 9781947239166. (HBO indications for CO poisoning)' },
  { num: 10, text: 'Tunkel AR, Hartman BJ, Kaplan SL, et al. Practice guidelines for the management of bacterial meningitis. Clin Infect Dis. 2004;39(9):1267-1284. doi:10.1086/425368. PMID: 15494903 (IDSA \u2014 empiric antimicrobial selection and dosing)' },
  { num: 11, text: 'de Gans J, van de Beek D; European Dexamethasone in Adulthood Bacterial Meningitis Study Investigators. Dexamethasone in adults with bacterial meningitis. N Engl J Med. 2002;347(20):1549-1556. doi:10.1056/NEJMoa021334. PMID: 12432041' },
  { num: 12, text: 'Cruccu G, Gronseth G, Alksne J, et al. AAN-EFNS guidelines on trigeminal neuralgia management. Eur J Neurol. 2008;15(10):1013-1028. doi:10.1111/j.1468-1331.2008.02185.x. PMID: 18721143' },
  { num: 13, text: 'Maz M, Chung SA, Abril A, et al. 2021 American College of Rheumatology/Vasculitis Foundation Guideline for the Management of Giant Cell Arteritis and Takayasu Arteritis. Arthritis Rheumatol. 2021;73(8):1349-1365. doi:10.1002/art.41774' },
  { num: 14, text: 'Friedman BW, Mulvey L, Esses D, et al. Metoclopramide for acute migraine: a dose-finding randomized clinical trial. Ann Emerg Med. 2011;57(5):475-482. doi:10.1016/j.annemergmed.2010.11.023. PMID: 21227540' },
  { num: 15, text: 'Stiell IG, Wells GA, Vandemheen K, et al. The Canadian CT Head Rule for patients with minor head injury. Lancet. 2001;357(9266):1391-1396. doi:10.1016/S0140-6736(00)04561-X. PMID: 11356436' },
  { num: 16, text: 'Hoh BL, Ko NU, Amin-Hanjani S, et al. 2023 Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage: A Guideline From the American Heart Association/American Stroke Association. Stroke. 2023;54(7):e314-e370. doi:10.1161/STR.0000000000000436' },
  { num: 17, text: 'Colman I, Friedman BW, Brown MD, et al. Parenteral dexamethasone for acute severe migraine headache: meta-analysis of randomised controlled trials for preventing recurrence. BMJ. 2008;336(7657):1359-1361. doi:10.1136/bmj.39566.806725.BE. PMID: 18541610' },
  { num: 18, text: 'Cohen AS, Burns B, Goadsby PJ. High-flow oxygen for treatment of cluster headache: a randomized trial. JAMA. 2009;302(22):2451-2457. doi:10.1001/jama.2009.1855. PMID: 19996400' },
  { num: 19, text: 'Frontera JA, Lewin JJ 3rd, Rabinstein AA, et al. Guideline for Reversal of Antithrombotics in Intracranial Hemorrhage: A Statement for Healthcare Professionals from the Neurocritical Care Society and Society of Critical Care Medicine. Neurocrit Care. 2016;24(1):6-46. doi:10.1007/s12028-015-0222-x' },
  { num: 20, text: 'Bendtsen L, Zakrzewska JM, Abbott J, et al. European Academy of Neurology guideline on trigeminal neuralgia. Eur J Neurol. 2019;26(6):831-849. doi:10.1111/ene.13950. PMID: 30860637' },
  { num: 21, text: 'Weaver LK. Clinical practice. Carbon monoxide poisoning. N Engl J Med. 2009;360(12):1217-1225. doi:10.1056/NEJMcp0808891. PMID: 19297574' },
  { num: 22, text: 'Gedde SJ, Chen PP, Muir KW, et al; American Academy of Ophthalmology Preferred Practice Pattern Glaucoma Panel. Primary Angle-Closure Disease Preferred Practice Pattern. Ophthalmology. 2021;128(1):P30-P70. doi:10.1016/j.ophtha.2020.10.021' },
  { num: 23, text: 'Ferro JM, Bousser MG, Canh\u00e3o P, et al. European Stroke Organization guideline for the diagnosis and treatment of cerebral venous thrombosis \u2014 endorsed by the European Academy of Neurology. Eur J Neurol. 2017;24(10):1203-1213. doi:10.1111/ene.13381' },
  { num: 24, text: 'CADISS trial investigators; Markus HS, Hayter E, Levi C, Feldman A, Venables G, Norris J. Antiplatelet treatment compared with anticoagulation treatment for cervical artery dissection (CADISS): a randomised trial. Lancet Neurol. 2015;14(4):361-367. doi:10.1016/S1474-4422(15)70018-9. PMID: 25684164' },
];

export const HEADACHE_HUB_NODE_COUNT = HEADACHE_HUB_NODES.length;
export const HEADACHE_HUB_MODULE_LABELS = [
  'Sick Check',
  'Rule In / Rule Out',
  'Rescue / Reassess',
  'Imaging',
  'Disposition',
];
