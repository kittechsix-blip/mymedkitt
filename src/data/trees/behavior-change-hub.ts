// MedKitt — Acute Change in Behavior / "Not Acting Right" Front Door (Rule-In / Rule-Out Engine, type: 'hub')
//
// 5-Module rule-in/rule-out skeleton (matches dyspnea-hub / painless-scrotal-swelling-hub template
// codified in CLAUDE.md "Chief-Complaint Hub Template"):
//   1. Sick Check
//   2. Rule In / Rule Out — per-differential chains: entry -> gate(s) -> verdict
//      (excluded verdicts loop back to beh-triage; confirmed verdicts link out to deep-dive)
//   3. Initial bundle / Reassess
//   4. Imaging / Labs
//   5. Disposition
//
// EBM-only citations. qSOFA (sepsis/occult-infection screen) lives in the bottom toolbar.
// Purpose: the organic-vs-functional split — catch medical mimics of psychiatric presentations.
// Distinct from altered-mental-status-hub (depressed consciousness) and new-onset-psychosis-hub (frank psychosis).
// All branches link to existing consults (no consult gaps).

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const BEHAVIOR_CHANGE_HUB_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Sick Check
  // ============================================================
  {
    id: 'beh-sick-check',
    type: 'info',
    module: 1,
    title: 'Acute Behavior Change — Sick Check First',
    body: '**"He\'s not acting right" is a medical complaint until proven psychiatric.** Anchoring on "psych" is how patients die of hypoglycemia, meningitis, or sepsis in the waiting room. New behavior change — especially acute onset, at the extremes of age, with abnormal vitals or a focal exam — is organic until you have actively excluded medical causes. **Medical clearance is a decision, not a checkbox.**\n\n**⚠️ DO-NOT-MISS organic mimics**\n1. **Hypoglycemia** — check a glucose on EVERYONE, first, always. It is instantly reversible and instantly fatal.\n2. **CNS infection** — meningitis/encephalitis: fever, headache, neck stiffness, new behavior change.\n3. **Nonconvulsive status epilepticus / post-ictal state** — fluctuating awareness, staring, automatisms.\n4. **Toxidromes / withdrawal** — serotonin syndrome, NMS, sympathomimetics, anticholinergics, alcohol withdrawal.\n5. **Endocrine/metabolic crises** — thyroid storm, adrenal crisis, DKA, hypo-/hypernatremia.\n6. **Sepsis / occult infection** — especially UTI/pneumonia in elders presenting only as confusion (delirium).\n\n**First 60 seconds:** **point-of-care glucose**, full vitals + temperature (qSOFA in the toolbar), pupils, a focal neuro screen, and a targeted history (meds, drugs, onset, fever). **Abnormal vitals, a focal deficit, age >40 with new symptoms, or visual hallucinations point AWAY from a primary psychiatric cause.**',
    citation: [1],
    next: 'beh-triage',
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 2 — Rule In / Rule Out
  // ============================================================
  {
    id: 'beh-triage',
    type: 'question',
    module: 2,
    title: 'Rule In / Rule Out — Pick the Thread',
    body: 'Screen the reversible medical killers first; only after they are addressed does a primary psychiatric cause become the working diagnosis. Each branch runs a tight clinical gate to an explicit verdict; excluded branches return here for the next differential.',
    options: [
      { label: '🔴 Low point-of-care glucose', description: 'Hypoglycemia — treat now', next: 'beh-hypo-entry', urgency: 'critical' },
      { label: '🔴 Fever + headache / neck stiffness / new behavior change', description: 'CNS infection', next: 'beh-cns-entry', urgency: 'critical' },
      { label: 'Fluctuating awareness / staring / automatisms / recent seizure', description: 'Nonconvulsive status / post-ictal', next: 'beh-seizure-entry', urgency: 'urgent' },
      { label: 'Hyperthermia / rigidity / clonus / autonomic instability / drug trigger', description: 'Toxidrome (serotonin/NMS/withdrawal)', next: 'beh-tox-entry', urgency: 'critical' },
      { label: 'Endocrine/metabolic clues (thyroid, adrenal, DKA, Na⁺)', description: 'Endocrine / metabolic crisis', next: 'beh-endo-entry', urgency: 'urgent' },
      { label: 'Elderly / acute fluctuating confusion / infection signs', description: 'Sepsis / delirium', next: 'beh-sepsis-entry', urgency: 'urgent' },
      { label: 'Vitals normal, exam nonfocal, medical screen negative', description: 'Primary psychiatric — clear & assess', next: 'beh-psych-entry', urgency: 'routine' },
    ],
    citation: [1],
    summary: 'Seven-branch triage: hypoglycemia / CNS infection / seizure / toxidrome / endocrine-metabolic / sepsis-delirium / primary psychiatric.',
  },

  // -------------------- HYPOGLYCEMIA --------------------
  {
    id: 'beh-hypo-entry',
    type: 'question',
    module: 2,
    title: 'Hypoglycemia — Glucose Gate',
    body: '**Hypoglycemia mimics anything — agitation, psychosis, focal deficits, coma.** Any new behavior change gets a **point-of-care glucose immediately**. A low glucose (typically <70 mg/dL, symptomatic) with behavior change is the diagnosis until the glucose is corrected and symptoms resolve. Consider the cause: insulin/sulfonylurea, alcohol, sepsis, adrenal insufficiency, or a deliberate overdose.',
    options: [
      { label: 'Low glucose with behavior change', description: 'Treat hypoglycemia now', next: 'beh-hypo-verdict', urgency: 'critical' },
      { label: 'Glucose normal', description: 'Hypoglycemia excluded \u2014 move on', next: 'beh-hypo-excluded', urgency: 'routine' },
    ],
    citation: [2],
    summary: 'Every behavior change gets a glucose; low + symptomatic = treat now and find the cause (esp. sulfonylurea/insulin).',
    safetyLevel: 'critical',
  },
  {
    id: 'beh-hypo-verdict',
    type: 'result',
    module: 2,
    title: 'Hypoglycemia — Give Glucose, Find the Cause',
    body: 'Open [Hypoglycemia](#/tree/hypoglycemia) for the full pathway.\n\n**Next steps:**\n- **Treat immediately:** oral glucose if able to swallow, otherwise **IV dextrose (D50/D10)**; **IM glucagon** if no IV access.\n- **Thiamine before glucose** in malnourished/alcoholic patients (Wernicke prevention).\n- **Recheck glucose and reassess mental status** — behavior should normalize; persistent deficits mean another cause.\n- **Sulfonylurea or long-acting insulin overdose → prolonged, recurrent hypoglycemia:** admit/observe; **octreotide** for sulfonylurea.\n- Identify and treat the precipitant (missed meal, med error, sepsis, adrenal insufficiency, intentional overdose).',
    recommendation: 'IV dextrose (or glucagon) immediately, thiamine if malnourished, recheck glucose/mentation; observe/octreotide for sulfonylurea; find the cause.',
    citation: [2],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'beh-hypo-excluded',
    type: 'result',
    module: 2,
    title: 'Hypoglycemia — Excluded',
    body: 'A normal glucose excludes hypoglycemia as the driver. (It is the fastest reversible cause to check — good that it is off the list.)\n\nReturn to the hub for the next differential.',
    recommendation: 'Normal glucose excludes hypoglycemia; continue the organic screen.',
    citation: [2],
    next: 'beh-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- CNS INFECTION --------------------
  {
    id: 'beh-cns-entry',
    type: 'question',
    module: 2,
    title: 'CNS Infection — Meningoencephalitis Gate',
    body: '**Fever + new behavior change is meningitis/encephalitis until excluded.** Look for headache, neck stiffness, photophobia, rash (meningococcemia), seizures, and focal deficits (encephalitis, esp. HSV — temporal/behavioral changes). The classic triad is often incomplete, especially in elders and the immunocompromised. **Do NOT delay antibiotics for the LP or CT — treat empirically the moment you suspect it.**',
    options: [
      { label: 'Fever + headache / meningismus / behavior change ± focal/seizure', description: 'Treat as CNS infection', next: 'beh-cns-verdict', urgency: 'critical' },
      { label: 'No fever, no meningismus, no encephalopathic features', description: 'CNS infection unlikely \u2014 move on', next: 'beh-cns-excluded', urgency: 'routine' },
    ],
    citation: [3],
    summary: 'Fever + behavior change → empiric antibiotics ± acyclovir NOW; do not wait for LP/CT.',
    safetyLevel: 'critical',
  },
  {
    id: 'beh-cns-verdict',
    type: 'result',
    module: 2,
    title: 'CNS Infection — Empiric Therapy Without Delay',
    body: 'Open [Meningitis](#/tree/meningitis) for the full pathway.\n\n**Next steps:**\n- **Empiric antibiotics immediately** (ceftriaxone + vancomycin; add ampicillin for Listeria in >50/immunocompromised) — **do NOT wait for LP or CT results.**\n- **Add IV acyclovir** if encephalitis is possible (behavior/personality change, focal temporal signs, seizures — HSV).\n- **Dexamethasone** before/with the first antibiotic dose for suspected bacterial meningitis.\n- **LP after CT** if there are focal signs, immunocompromise, papilledema, or depressed consciousness; otherwise LP promptly (blood cultures first).\n- Droplet isolation for suspected meningococcus; sepsis resuscitation ([Sepsis](#/tree/sepsis), qSOFA in the toolbar) if unstable.',
    recommendation: 'Empiric ceftriaxone + vancomycin (+ ampicillin if indicated) + dexamethasone + acyclovir for possible encephalitis, immediately; LP after CT when indicated.',
    citation: [3],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'beh-cns-excluded',
    type: 'result',
    module: 2,
    title: 'CNS Infection — Unlikely',
    body: 'No fever, no meningismus, and no encephalopathic features make a CNS infection unlikely right now — but the elderly and immunocompromised can present atypically (afebrile). Keep a low threshold and reassess if fever, headache, or seizures develop.\n\nReturn to the hub for the next differential.',
    recommendation: 'CNS infection unlikely without fever/meningismus; keep a low threshold in elders/immunocompromised and reassess.',
    citation: [3],
    next: 'beh-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- NONCONVULSIVE STATUS / POST-ICTAL --------------------
  {
    id: 'beh-seizure-entry',
    type: 'question',
    module: 2,
    title: 'Seizure — Nonconvulsive Status / Post-Ictal Gate',
    body: '**Fluctuating awareness, staring, automatisms, aphasia, or unexplained prolonged confusion can be nonconvulsive status epilepticus (NCSE)** — no obvious convulsion, but ongoing seizure. Also consider a **post-ictal state** after an unwitnessed seizure (gradual clearing, Todd paralysis, tongue-biting, incontinence). Known epilepsy, subtle rhythmic twitching, or prolonged post-ictal confusion (>30–60 min) should raise NCSE. **EEG is the diagnostic test.**',
    options: [
      { label: 'Fluctuating/prolonged altered awareness ± subtle motor signs', description: 'Treat as possible NCSE / post-ictal', next: 'beh-seizure-verdict', urgency: 'urgent' },
      { label: 'No seizure features / clearly a different picture', description: 'Seizure unlikely \u2014 move on', next: 'beh-seizure-excluded', urgency: 'routine' },
    ],
    citation: [4],
    summary: 'Prolonged/fluctuating altered awareness → suspect NCSE; get EEG, treat status if confirmed, or watch a resolving post-ictal state.',
    safetyLevel: 'warning',
  },
  {
    id: 'beh-seizure-verdict',
    type: 'result',
    module: 2,
    title: 'NCSE / Post-Ictal — EEG + Treat Status',
    body: 'Open [Status Epilepticus](#/tree/status-epilepticus) for the full pathway.\n\n**Next steps:**\n- **If nonconvulsive status is suspected, get an urgent EEG** and treat as status if confirmed — **benzodiazepine first-line**, then a second-line anticonvulsant (levetiracetam, valproate, or fosphenytoin).\n- **Find the cause:** glucose, electrolytes (Na, Ca, Mg), toxins, missed anticonvulsants, CNS infection/structural lesion; neuroimaging as indicated.\n- **Post-ictal state:** support and reassess as it clears (usually <30–60 min); prolonged or fluctuating confusion → EEG for NCSE.\n- Neurology involvement; protect the airway and monitor if consciousness is depressed.',
    recommendation: 'Urgent EEG for suspected NCSE; treat confirmed status (benzo → second-line agent); find/correct the cause; watch a resolving post-ictal state.',
    citation: [4],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'beh-seizure-excluded',
    type: 'result',
    module: 2,
    title: 'Seizure — Unlikely',
    body: 'No seizure features and a picture that clears or fits another process make NCSE/post-ictal state unlikely. If confusion is prolonged and unexplained, keep NCSE on the list and get an EEG.\n\nReturn to the hub for the next differential.',
    recommendation: 'Seizure unlikely without ictal/post-ictal features; reconsider NCSE (EEG) for unexplained prolonged confusion.',
    citation: [4],
    next: 'beh-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- TOXIDROME (serotonin / NMS / withdrawal) --------------------
  {
    id: 'beh-tox-entry',
    type: 'question',
    module: 2,
    title: 'Toxidrome — Hyperthermia + Rigidity/Clonus Gate',
    body: '**A hot, agitated, rigid, or autonomically unstable patient with a drug trigger has a life-threatening toxidrome.** Separate the key ones by exam and history:\n- **Serotonin syndrome:** serotonergic drug + **clonus (lower-limb > upper), hyperreflexia, agitation, hyperthermia**; rapid onset.\n- **NMS:** antipsychotic (or dopamine-agonist withdrawal) + **"lead-pipe" rigidity, hyporeflexia, hyperthermia, autonomic instability**; slower onset over days.\n- **Sympathomimetic** (cocaine/amphetamine): agitation, mydriasis, diaphoresis, tachycardia/HTN.\n- **Alcohol/sedative withdrawal:** tremor, agitation, autonomic hyperactivity, hallucinations, seizures.',
    options: [
      { label: 'Serotonergic drug + clonus / hyperreflexia / hyperthermia', description: 'Serotonin syndrome', next: 'beh-serotonin-verdict', urgency: 'critical' },
      { label: 'Antipsychotic + lead-pipe rigidity / hyporeflexia / hyperthermia', description: 'NMS', next: 'beh-nms-verdict', urgency: 'critical' },
      { label: 'Alcohol/sedative cessation + tremor / autonomic hyperactivity', description: 'Withdrawal', next: 'beh-withdrawal-verdict', urgency: 'urgent' },
      { label: 'No toxidrome features', description: 'Toxidrome unlikely \u2014 move on', next: 'beh-tox-excluded', urgency: 'routine' },
    ],
    citation: [5],
    summary: 'Hot + rigid/clonic + drug trigger → serotonin syndrome (clonus) vs NMS (lead-pipe) vs withdrawal; cool + benzos are common threads.',
    safetyLevel: 'critical',
  },
  {
    id: 'beh-serotonin-verdict',
    type: 'result',
    module: 2,
    title: 'Serotonin Syndrome — Stop Agent, Cool, Benzos',
    body: 'Open [Serotonin Syndrome](#/tree/serotonin-syndrome) for the full pathway.\n\n**Next steps:**\n- **Stop all serotonergic agents** immediately.\n- **Aggressive cooling and benzodiazepines** for agitation and hyperthermia; **avoid antipyretics (ineffective) and physical restraints alone** (worsen hyperthermia/rhabdo).\n- **Cyproheptadine** (serotonin antagonist) for moderate-severe cases.\n- **Severe hyperthermia (>41.1°C) → intubation, paralysis (non-depolarizing), and active cooling.**\n- Monitor for rhabdomyolysis, DIC, and seizures; supportive ICU care.',
    recommendation: 'Stop serotonergic drugs, benzodiazepines + active cooling, cyproheptadine for moderate/severe; intubate + paralyze for severe hyperthermia.',
    citation: [5],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'beh-nms-verdict',
    type: 'result',
    module: 2,
    title: 'NMS — Stop Antipsychotic, Cool, Supportive Care',
    body: 'Open [NMS](#/tree/nms) for the full pathway.\n\n**Next steps:**\n- **Stop the offending antipsychotic** (or restart dopaminergic therapy if NMS is from abrupt Parkinson-drug withdrawal).\n- **Aggressive cooling, IV fluids, and benzodiazepines**; supportive ICU care.\n- **Dantrolene and/or bromocriptine** for severe rigidity/hyperthermia (specialist-guided).\n- Monitor for **rhabdomyolysis and AKI** (elevated CK) — hydrate and protect the kidneys.\n- Distinguish from serotonin syndrome (lead-pipe rigidity + hyporeflexia + slower onset vs clonus + hyperreflexia + rapid onset).',
    recommendation: 'Stop antipsychotic, active cooling + IV fluids + benzodiazepines, dantrolene/bromocriptine for severe cases, watch CK/AKI.',
    citation: [5],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'beh-withdrawal-verdict',
    type: 'result',
    module: 2,
    title: 'Alcohol / Sedative Withdrawal — Benzodiazepines',
    body: 'Open [Alcohol Withdrawal](#/tree/alcohol-withdrawal) for the full pathway.\n\n**Next steps:**\n- **Symptom-triggered benzodiazepines** (CIWA-guided) are the cornerstone; escalate for severe withdrawal/delirium tremens.\n- **Thiamine, fluids, and electrolyte correction** (magnesium, potassium, phosphate); thiamine before glucose.\n- **Phenobarbital or adjuncts** for benzodiazepine-resistant withdrawal; treat withdrawal seizures.\n- Monitor for DTs (a mortal emergency), rhabdomyolysis, and precipitating illness; admit severe cases.\n- Do not mistake withdrawal for a primary psychiatric agitation.',
    recommendation: 'Symptom-triggered benzodiazepines (CIWA), thiamine + fluids + electrolytes, phenobarbital for resistant cases; admit severe withdrawal/DTs.',
    citation: [5],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'beh-tox-excluded',
    type: 'result',
    module: 2,
    title: 'Toxidrome — Unlikely',
    body: 'No hyperthermia, rigidity, clonus, autonomic instability, or drug trigger makes a life-threatening toxidrome unlikely. Reassess if new rigidity, clonus, fever, or autonomic signs appear.\n\nReturn to the hub for the next differential.',
    recommendation: 'Toxidrome unlikely without hyperthermia/rigidity/clonus/trigger; reassess if features evolve.',
    citation: [5],
    next: 'beh-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- ENDOCRINE / METABOLIC --------------------
  {
    id: 'beh-endo-entry',
    type: 'question',
    module: 2,
    title: 'Endocrine / Metabolic — Crisis Gate',
    body: '**Endocrine and electrolyte crises are classic psychiatric mimics.** Screen for: **thyroid storm** (hyperthermia, tachyarrhythmia, agitation/psychosis, goiter), **adrenal crisis** (hypotension, hyponatremia, hypoglycemia, fatigue/confusion, steroid history), **DKA/HHS** (hyperglycemia, dehydration, acidosis, AMS), and **sodium disorders** (hypo-/hypernatremia cause confusion, seizures). A basic metabolic panel, glucose, and TSH catch most.',
    options: [
      { label: 'Thyroid storm features (hyperthermia, tachyarrhythmia, agitation)', description: 'Thyroid emergency', next: 'beh-thyroid-verdict', urgency: 'critical' },
      { label: 'Adrenal-crisis features (hypotension, hypoNa, steroid hx)', description: 'Adrenal insufficiency', next: 'beh-adrenal-verdict', urgency: 'critical' },
      { label: 'Hyperglycemia + acidosis / dehydration / AMS', description: 'DKA / HHS', next: 'beh-dka-verdict', urgency: 'urgent' },
      { label: 'No endocrine/metabolic crisis on screen', description: 'Excluded \u2014 move on', next: 'beh-endo-excluded', urgency: 'routine' },
    ],
    citation: [6],
    summary: 'Screen thyroid storm / adrenal crisis / DKA-HHS / sodium; BMP + glucose + TSH catch most metabolic mimics.',
    safetyLevel: 'warning',
  },
  {
    id: 'beh-thyroid-verdict',
    type: 'result',
    module: 2,
    title: 'Thyroid Storm — Treat the Storm',
    body: 'Open [Thyroid Emergencies](#/tree/thyroid) for the full pathway.\n\n**Next steps:**\n- **Beta-blockade (propranolol)** for adrenergic symptoms and to block T4→T3 conversion.\n- **Thionamide (PTU or methimazole)**, then **iodine (Lugol/SSKI) at least 1 hour after** the thionamide (Wolff-Chaikoff), plus **hydrocortisone**.\n- **Aggressive cooling and supportive care**; treat the precipitant (infection, etc.).\n- Monitor for high-output heart failure and arrhythmia; ICU-level care.',
    recommendation: 'Beta-blocker + thionamide + delayed iodine + hydrocortisone + cooling; treat the precipitant; ICU.',
    citation: [6],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'beh-adrenal-verdict',
    type: 'result',
    module: 2,
    title: 'Adrenal Crisis — Steroids Now',
    body: 'Open [Adrenal Insufficiency](#/tree/adrenal-insufficiency) for the full pathway.\n\n**Next steps:**\n- **Give hydrocortisone immediately** (100 mg IV) — do NOT delay for confirmatory testing in a crisis; draw a cortisol first if it will not delay treatment.\n- **Aggressive IV fluids** (isotonic) for hypotension and hyponatremia; correct **hypoglycemia**.\n- **Find and treat the precipitant** (infection, missed steroids, stress).\n- Monitor electrolytes; endocrine involvement and admission.',
    recommendation: 'Hydrocortisone 100 mg IV immediately + aggressive fluids + correct glucose/Na; treat precipitant; admit.',
    citation: [6],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'beh-dka-verdict',
    type: 'result',
    module: 2,
    title: 'DKA / HHS — Fluids, Insulin, Potassium',
    body: 'Open [DKA](#/tree/dka) for the full pathway.\n\n**Next steps:**\n- **IV fluid resuscitation** first (isotonic), then **insulin infusion**, with careful **potassium repletion** (do NOT start insulin if K⁺ <3.3 until replaced).\n- **Find the precipitant** (infection, missed insulin, MI, new-onset diabetes).\n- Monitor glucose, electrolytes, and the anion gap; watch for cerebral edema in children.\n- Behavior change/AMS in DKA/HHS resolves with correction of the metabolic derangement.',
    recommendation: 'Fluids → insulin infusion → potassium repletion (hold insulin if K<3.3); treat the precipitant; monitor gap/electrolytes.',
    citation: [6],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'beh-endo-excluded',
    type: 'result',
    module: 2,
    title: 'Endocrine / Metabolic — Excluded',
    body: 'A normal metabolic screen (glucose, electrolytes, and — where indicated — TSH) with no crisis features makes an endocrine/metabolic mimic unlikely. Revisit if labs return abnormal.\n\nReturn to the hub for the next differential.',
    recommendation: 'Metabolic mimic unlikely with a normal screen; revisit if labs return abnormal.',
    citation: [6],
    next: 'beh-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- SEPSIS / DELIRIUM --------------------
  {
    id: 'beh-sepsis-entry',
    type: 'question',
    module: 2,
    title: 'Sepsis / Delirium — Occult-Infection Gate',
    body: '**In older adults, acute confusion is often the ONLY sign of infection.** New fluctuating confusion (delirium) with inattention should trigger a hunt for an occult source — especially **UTI and pneumonia** — plus a review of medications (anticholinergics, opioids, benzodiazepines), pain, retention, and metabolic causes. **Screen for sepsis** (qSOFA in the toolbar); delirium is a medical emergency, not "just old age."',
    options: [
      { label: 'Elderly + acute fluctuating confusion + infection signs / sepsis screen +', description: 'Treat sepsis / find the source', next: 'beh-sepsis-verdict', urgency: 'urgent' },
      { label: 'Delirium without infection \u2014 identify the medical driver', description: 'Work up delirium', next: 'beh-delirium-verdict', urgency: 'urgent' },
      { label: 'No delirium / not the picture', description: 'Excluded \u2014 move on', next: 'beh-sepsis-excluded', urgency: 'routine' },
    ],
    citation: [7],
    summary: 'Elderly acute confusion → hunt occult infection (UTI/pneumonia) + screen sepsis; delirium is a medical emergency with a reversible driver.',
    safetyLevel: 'warning',
  },
  {
    id: 'beh-sepsis-verdict',
    type: 'result',
    module: 2,
    title: 'Sepsis — Source Control + Resuscitation',
    body: 'Open [Sepsis](#/tree/sepsis) for the full pathway; for a urinary source see [Adult UTI](#/tree/adult-uti).\n\n**Next steps:**\n- **Sepsis bundle:** blood cultures, lactate, **early broad-spectrum antibiotics**, and IV fluids for hypoperfusion; qSOFA/vitals in the toolbar.\n- **Hunt the source:** UA/culture (UTI), chest imaging (pneumonia), skin/soft tissue, abdomen, lines.\n- Reassess perfusion; vasopressors for fluid-refractory shock; admit to the appropriate level.\n- Behavior/confusion should improve as the infection is controlled; treat delirium supportively alongside.',
    recommendation: 'Sepsis bundle (cultures, lactate, early abx, fluids) + source hunt (UTI/pneumonia) + admit; expect confusion to clear with source control.',
    citation: [7],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'beh-delirium-verdict',
    type: 'result',
    module: 2,
    title: 'Delirium — Find and Fix the Driver',
    body: 'Open [Delirium](#/tree/delirium) for the full pathway.\n\n**Next steps:**\n- **Delirium always has a medical cause — find it:** infection, medications (deliriogenic drugs), metabolic derangement, hypoxia, pain, urinary retention/constipation, alcohol/drug effects, and environmental factors.\n- **Non-pharmacologic management first** (reorientation, sleep-wake, mobility, sensory aids, address pain/retention).\n- **Reserve low-dose antipsychotics for severe agitation** threatening safety; **avoid benzodiazepines** except in alcohol/sedative withdrawal (they worsen delirium).\n- Treat the identified cause; involve geriatrics; admit if the driver requires it.',
    recommendation: 'Find/fix the medical driver, non-pharmacologic measures first, low-dose antipsychotic only for dangerous agitation, avoid benzos (except withdrawal).',
    citation: [7],
    next: 'beh-disposition',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'beh-sepsis-excluded',
    type: 'result',
    module: 2,
    title: 'Sepsis / Delirium — Excluded',
    body: 'No delirium and no infection signs make an occult-infection/delirium picture unlikely. Keep it in mind for any elder whose behavior fluctuates, and recheck vitals if the picture changes.\n\nReturn to the hub for the next differential.',
    recommendation: 'Sepsis/delirium unlikely without infection signs/fluctuating confusion; keep a low threshold in elders.',
    citation: [7],
    next: 'beh-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- PRIMARY PSYCHIATRIC --------------------
  {
    id: 'beh-psych-entry',
    type: 'question',
    module: 2,
    title: 'Primary Psychiatric — Medical Clearance Gate',
    body: '**Only after the organic screen is negative** does a primary psychiatric cause become the working diagnosis. Reassuring for a functional cause: **normal vitals, normal glucose, a non-focal neuro exam, age <40 with a prior psychiatric history, gradual onset, and preserved orientation with auditory (not visual) hallucinations.** Concerning for organic (do NOT clear): abnormal vitals, focal deficit, new symptoms >40, visual hallucinations, disorientation, or an acute fluctuating course. Assess safety (suicide/violence risk) as part of the disposition.',
    options: [
      { label: 'Organic screen negative, exam reassuring, safe environment', description: 'Medically clear + psych assessment', next: 'beh-psych-verdict', urgency: 'routine' },
      { label: 'Any organic red flag remains (vitals, focal, age>40, visual hallucination)', description: 'Not cleared \u2014 keep working it up', next: 'beh-psych-excluded', urgency: 'urgent' },
    ],
    citation: [1],
    summary: 'Clear for psych ONLY with a negative organic screen + reassuring exam; any organic red flag = not cleared, keep working it up.',
  },
  {
    id: 'beh-psych-verdict',
    type: 'result',
    module: 2,
    title: 'Primary Psychiatric — Cleared for Assessment',
    body: '**Medical clearance is appropriate** once the reversible medical causes are addressed and the exam is reassuring.\n\n- **Document the negative organic workup** and the specific reasons the presentation is not organic — clearance is a reasoned decision, not a rubber stamp.\n- **Manage acute agitation safely** with verbal de-escalation first; use the [Excited Delirium](#/tree/excited-delirium) pathway for severe agitation threatening safety, and treat any sedation-related complications.\n- **Assess suicide and violence risk** and ensure a safe environment before and during psychiatric evaluation.\n- **Refer for psychiatric assessment**; involve psychiatry per your site\'s pathway.\n- Reassess and re-open the organic workup if vitals or the exam change.',
    recommendation: 'Document a reasoned medical clearance, de-escalate agitation (excited-delirium pathway if severe), assess suicide/violence risk, refer to psychiatry.',
    citation: [1],
    next: 'beh-disposition',
    confidence: 'recommended',
  },
  {
    id: 'beh-psych-excluded',
    type: 'result',
    module: 2,
    title: 'Not Cleared — Keep Working It Up',
    body: '**Any residual organic red flag means the patient is NOT medically cleared.** Abnormal vitals, a focal deficit, new symptoms after age 40, visual hallucinations, disorientation, or an acute fluctuating course all point back to a medical cause.\n\n- Return to the organic branches and complete the workup (labs, imaging, EEG as indicated).\n- Do not transfer to a psychiatric facility or anchor on "psych" until the medical evaluation is complete.\n\nReturn to the hub for the next differential.',
    recommendation: 'Residual organic red flags = not cleared; complete the medical workup before any psychiatric disposition.',
    citation: [1],
    next: 'beh-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // ============================================================
  // Module 3 — Initial Bundle / Reassess
  // ============================================================
  {
    id: 'beh-rescue',
    type: 'info',
    module: 3,
    title: 'Initial Bundle',
    body: '**The behavior-change / medical-clearance bundle (scale to acuity):**\n- **Point-of-care glucose on everyone, first.**\n- **Full vitals + temperature (qSOFA), pupils, focal neuro screen**; abnormal vitals or a focal exam = organic until proven otherwise.\n- **Targeted labs:** BMP (Na, glucose, renal), calcium/magnesium, CBC, LFTs, ammonia if liver disease, TSH, and — by risk — blood/urine cultures, UA, and a toxicology/ingestion screen (acetaminophen/salicylate levels for intentional overdose).\n- **ECG** (toxidrome, QT, dyskalemia).\n- **Empiric therapy without delay** when indicated: dextrose for hypoglycemia; antibiotics ± acyclovir + dexamethasone for suspected CNS infection.\n- **Medication reconciliation** (deliriogenic, serotonergic, antipsychotic, steroid) and a collateral history (onset, drugs, fever, trauma).\n- **Safe agitation management:** verbal de-escalation first; targeted pharmacologic sedation for dangerous agitation with monitoring.',
    citation: [1],
    next: 'beh-reassess',
  },
  {
    id: 'beh-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess After the Bundle',
    body: 'After the glucose, vitals, focal screen, and initial labs — where does the patient stand?',
    options: [
      { label: 'Organic emergency identified (infection, tox, endocrine, seizure)', description: 'Escalate: treat + admit', next: 'beh-imaging', urgency: 'critical' },
      { label: 'Medically stable, organic screen negative or cause treated', description: 'Move to disposition', next: 'beh-disposition', urgency: 'routine' },
    ],
    citation: [1],
    summary: 'Organic emergency → treat + admit (imaging as needed); stable + cleared/treated → disposition.',
  },

  // ============================================================
  // Module 4 — Imaging / Labs
  // ============================================================
  {
    id: 'beh-imaging',
    type: 'info',
    module: 4,
    title: 'Imaging / Diagnostics',
    body: '**Match the study to the suspected cause:**\n- **Non-contrast head CT** — focal deficit, trauma, anticoagulation, depressed consciousness, or before LP with focal signs/immunocompromise (bleed, mass, hydrocephalus).\n- **Lumbar puncture** — suspected meningitis/encephalitis (after CT when indicated); do not delay antibiotics for it.\n- **EEG** — suspected nonconvulsive status or unexplained prolonged/fluctuating confusion.\n- **MRI brain** — encephalitis (HSV temporal changes), stroke, or when CT is nondiagnostic and suspicion persists.\n- **Chest X-ray / urinalysis / cultures** — occult infection driving delirium.\n- **ECG** — toxidrome/QT/dyskalemia.\n- Imaging is generally NOT required when the organic screen is clearly negative and the presentation is functional.',
    citation: [1],
    next: 'beh-disposition',
  },

  // ============================================================
  // Module 5 — Disposition
  // ============================================================
  {
    id: 'beh-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Where does this patient go?',
    options: [
      { label: 'Organic emergency (CNS infection, tox, endocrine crisis, status)', description: 'Admit (ICU as needed)', next: 'beh-dispo-admit', urgency: 'critical' },
      { label: 'Delirium / evolving / needs monitoring or workup', description: 'Observe / admit for workup', next: 'beh-dispo-observe', urgency: 'urgent' },
      { label: 'Medically cleared primary psychiatric, safe', description: 'Psychiatric disposition', next: 'beh-dispo-discharge', urgency: 'routine' },
    ],
    citation: [1],
    summary: 'Admit organic emergencies (ICU as needed); observe/admit delirium & evolving cases; psychiatric disposition once medically cleared + safe.',
  },
  {
    id: 'beh-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit',
    body: '**Admit** the organic emergency to the appropriate level.\n\n- **CNS infection, thyroid storm, adrenal crisis, severe toxidrome, status epilepticus, septic shock** → ICU/step-down with definitive therapy and monitoring.\n- Continue the specific treatment started in the ED (antibiotics/acyclovir, steroids, cooling, antidotes, anticonvulsants).\n- Specialist involvement (neurology, endocrine, ID, toxicology, critical care) as dictated by the diagnosis.',
    recommendation: 'Admit organic emergencies to ICU/step-down with definitive therapy and specialist involvement.',
    citation: [1],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'beh-dispo-observe',
    type: 'result',
    module: 5,
    title: 'Observe / Admit for Workup',
    body: '**Observation or admission for workup** when the cause is not yet clear or the patient needs monitoring — e.g., delirium with a partially identified driver, a resolving post-ictal state, or a borderline metabolic derangement.\n\n- Serial exams and vitals; complete the diagnostic workup and treat the identified driver.\n- Non-pharmacologic delirium care; involve geriatrics/hospital medicine.\n- Do not discharge an unexplained acute behavior change.',
    recommendation: 'Observe/admit unclear or evolving cases with serial exams, complete the workup, treat the driver; do not discharge unexplained behavior change.',
    citation: [1],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'beh-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Psychiatric Disposition',
    body: '**Once medically cleared and safe**, proceed with the psychiatric plan.\n\n- **Document the negative organic workup** and the rationale for medical clearance.\n- **Psychiatric evaluation / referral** per your site\'s pathway; involuntary hold if the patient meets criteria for danger to self/others.\n- **Ensure safety:** suicide/violence risk assessment, a safe environment, and appropriate level of psychiatric care (inpatient vs outpatient).\n- Explicit return precautions for any new medical symptom; a named follow-up.\n- Re-open the medical workup immediately if vitals or the exam change.',
    recommendation: 'Medically cleared + safe → psychiatric evaluation/hold as indicated, document clearance, safety assessment, medical return precautions.',
    citation: [1],
    confidence: 'recommended',
  },
];

export const BEHAVIOR_CHANGE_HUB_CRITICAL_ACTIONS = [
  { text: 'Sick Check first — new behavior change is organic until proven psychiatric; check a glucose on everyone', nodeId: 'beh-sick-check' },
  { text: 'Fever + behavior change → CNS infection: empiric antibiotics ± acyclovir + dexamethasone NOW, do not wait for LP/CT', nodeId: 'beh-cns-entry' },
  { text: 'Hot + rigid/clonic + drug trigger → toxidrome: stop the agent, cool, benzodiazepines (serotonin vs NMS vs withdrawal)', nodeId: 'beh-tox-entry' },
  { text: 'Clear for psychiatry ONLY with a negative organic screen + reassuring exam; any organic red flag = not cleared', nodeId: 'beh-psych-entry' },
];

export const BEHAVIOR_CHANGE_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Nordstrom K, et al. Medical Evaluation and Triage of the Agitated Patient (AAEP/ACEP). West J Emerg Med. 2012;13(1):3-10; ACEP Clinical Policy: Adult Psychiatric Patients in the ED. Ann Emerg Med. 2017; Tintinalli\u2019s Emergency Medicine, Behavioral Disorders chapter, 9th ed.' },
  { num: 2, text: 'Cryer PE, et al. Evaluation and Management of Adult Hypoglycemia: Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab. 2009;94(3):709-728.' },
  { num: 3, text: 'Tunkel AR, et al. IDSA Practice Guidelines for Bacterial Meningitis. Clin Infect Dis. 2004;39(9):1267-1284; Venkatesan A, et al. Management of encephalitis. Clin Infect Dis. 2013.' },
  { num: 4, text: 'Glauser T, et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus (AES). Epilepsy Curr. 2016;16(1):48-61; Sutter R, et al. Nonconvulsive status epilepticus. Nat Rev Neurol. 2016.' },
  { num: 5, text: 'Boyer EW, Shannon M. The Serotonin Syndrome. N Engl J Med. 2005;352(11):1112-1120; Berman BD. Neuroleptic Malignant Syndrome. Neurohospitalist. 2011;1(1):41-47.' },
  { num: 6, text: 'Ross DS, et al. ATA Guidelines for Hyperthyroidism/Thyroid Storm. Thyroid. 2016; Bornstein SR, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency: Endocrine Society Guideline. J Clin Endocrinol Metab. 2016; ADA Standards (DKA/HHS).' },
  { num: 7, text: 'Evans L, et al. Surviving Sepsis Campaign 2021. Crit Care Med. 2021;49(11):e1063-e1143; Inouye SK, et al. Delirium in elderly people. Lancet. 2014;383(9920):911-922.' },
];

export const BEHAVIOR_CHANGE_HUB_NODE_COUNT = BEHAVIOR_CHANGE_HUB_NODES.length;

export const BEHAVIOR_CHANGE_HUB_MODULE_LABELS = [
  'Sick Check',
  'Rule In / Rule Out',
  'Initial Bundle / Reassess',
  'Imaging / Labs',
  'Disposition',
];
