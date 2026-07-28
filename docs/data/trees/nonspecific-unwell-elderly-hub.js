// MedKitt — The "Generally Unwell" / Nonspecific-Complaint Elderly Patient Hub (type: 'hub')
//
// "Not himself," "off legs," "not eating," "just not right." Vague chief complaints in elders
// carry a large mortality signal; atypical sepsis, silent MI, stroke, and metabolic crisis all
// hide here. This is the textbook geriatric front door.
//
// 5-Module rule-in/rule-out skeleton:
//   1. Sick Check
//   2. Rule In / Rule Out — per-system source hunt: entry -> gate(s) -> verdict
//   3. Rescue / Reassess (initial bundle)
//   4. Imaging / workup breadth
//   5. Disposition
//
// EBM-only citations. Decision instruments (qSOFA, HEART, NIHSS) live in the toolbar, are named in the
// nodes, and are traced to their primary derivation/validation papers in the citations export
// (Sepsis-3 for qSOFA [15], Backus 2013 for HEART [16], Brott 1989 for NIHSS [17]).
//
// FDA CDS basis disclosure (21st Century Cures Act, Prong 4): every recommendation, threshold and
// named instrument in this tree traces to a retrievable primary source. All references in
// NONSPECIFIC_UNWELL_ELDERLY_HUB_CITATIONS carry a DOI, PMID or resolvable URL so a clinician can
// independently review the basis for each recommendation rather than relying on the tool's output.
// References marked "SUPERSEDED —" are retained for provenance and point to the current version.
//
// Legal audit (Louis Litt) 2026-07-28: all 19 references verified as existing and retrievable.
// Reference 2 was previously a fabricated hybrid ("Rosen T, Connors S, Clark S, et al. Assessment and
// Management of the Geriatric Patient in the Emergency Department. Emerg Med Clin North Am.
// 2016;34(3):499-522") — no such article exists; it welded a real author list onto a nonexistent
// journal/volume/page range. Replaced with the Basel BANC study, which is the source that actually
// establishes the high-risk nature of nonspecific complaints in elders. The real Rosen et al. paper
// (Adv Emerg Nurs J 2015) is now reference 11 on the delirium node.
export const NONSPECIFIC_UNWELL_ELDERLY_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check
    // ============================================================
    {
        id: 'unwell-start',
        type: 'info',
        module: 1,
        title: 'The Generally Unwell Elder — Sick Check First',
        body: '**\u26A0\uFE0F "Weak / off / not right" in an elder is high-risk. Do NOT accept a vague label without a source hunt.** Atypical presentation is the rule after ~75: sepsis without fever, MI without chest pain, "acute abdomen" with a soft belly, stroke as "confusion."\n\n**5 DO NOT MISS behind a nonspecific complaint:**\n1. **Occult sepsis** \u2014 may be afebrile / normotensive early; look for tachypnea, delirium, low-grade temp change, leukocytosis or bandemia.\n2. **Silent / atypical ACS** \u2014 dyspnea, fatigue, delirium, nausea; **get an ECG + troponin.**\n3. **Stroke presenting as confusion / weakness** \u2014 do a focused neuro exam + glucose.\n4. **Metabolic crisis** \u2014 hypo/hyperglycemia, hyponatremia, adrenal crisis, hypercalcemia.\n5. **Occult trauma / environmental** \u2014 unwitnessed fall (head bleed on anticoagulation, hip/pelvic fracture), hypo/hyperthermia.\n\n**First 60 seconds:**\n- **ABCs + vitals INCLUDING glucose, temperature, and a full set of orthostatics if able.** A "normal" HR may be blunted by beta-blockers \u2014 interpret trends, not single numbers.\n- **Mental status vs baseline** \u2014 ask family / facility: is this delirium (acute, fluctuating) off baseline?\n- **Screen:** ECG, POC glucose, temp, SpO2, medication list (polypharmacy / new drug), last oral intake, fall history.\n\n**If unstable / septic / ischemic ECG / profound metabolic derangement:** resuscitate in parallel. **If stable:** go to Rule In / Rule Out.',
        citation: [1, 2],
        next: 'unwell-triage',
        summary: 'Atypical is normal in elders. Full vitals incl glucose/temp/orthostatics + ECG + mental status vs baseline. Resuscitate in parallel if unstable.',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Rule In / Rule Out (Source Hunt)
    // ============================================================
    {
        id: 'unwell-triage',
        type: 'question',
        module: 2,
        title: 'Rule In / Rule Out — Systematic Source Hunt',
        body: 'The vague elder needs a broad, structured hunt \u2014 work each system to an explicit verdict. Excluded loops back here for the next branch. **Cast a wide net early; anchoring is the enemy.**',
        options: [
            { label: 'Infection / occult sepsis', description: 'UTI, pneumonia, skin, intra-abdominal, meningitis; qSOFA', next: 'unwell-sepsis-entry', urgency: 'critical' },
            { label: 'Cardiac (silent ACS / arrhythmia / failure)', description: 'ECG + troponin; dyspnea / fatigue equivalents', next: 'unwell-cardiac-entry', urgency: 'critical' },
            { label: 'Neurologic (stroke / delirium)', description: 'Focused neuro exam + glucose; acute vs baseline', next: 'unwell-neuro-entry', urgency: 'critical' },
            { label: 'Metabolic / endocrine crisis', description: 'Glucose, Na, Ca, adrenal, thyroid', next: 'unwell-metabolic-entry', urgency: 'urgent' },
            { label: 'Occult trauma / environmental', description: 'Unwitnessed fall, head bleed, hip fx, temp derangement', next: 'unwell-trauma-entry', urgency: 'urgent' },
            { label: 'Medication / polypharmacy adverse event', description: 'New drug, interaction, over-anticoagulation, toxicity', next: 'unwell-meds-entry', urgency: 'urgent' },
            { label: 'None fit — broad screen negative, stable', description: 'Initial bundle + reassess', next: 'unwell-rescue' },
        ],
        citation: [1, 2],
        summary: 'Structured multi-system source hunt; work each to a verdict. Excluded loops back. Anchoring is the enemy.',
        safetyLevel: 'critical',
    },
    // -------------------- INFECTION / SEPSIS --------------------
    {
        id: 'unwell-sepsis-entry',
        type: 'question',
        module: 2,
        title: 'Occult Sepsis — Source & Physiology Gate',
        body: '**Elders septic without classic signs:** delirium, functional decline, falls, or anorexia may be the ONLY presentation. Fever can be absent (or hypothermia present). Hunt every source: **urine (but do NOT anchor on asymptomatic bacteriuria), lungs, skin/soft tissue, intra-abdominal, CNS, lines/devices.** Use **qSOFA** (RR\u226522, SBP\u2264100, altered) as a bedside prompt \u2014 a low qSOFA does NOT exclude sepsis.',
        options: [
            { label: 'Sepsis physiology or a convincing source', description: 'Resuscitate + source-directed workup', next: 'unwell-sepsis-verdict', urgency: 'critical' },
            { label: 'No source, no sepsis physiology (incl. asymptomatic bacteriuria only)', description: 'Sepsis unlikely \u2014 move on, do not over-treat urine', next: 'unwell-sepsis-excluded', urgency: 'routine' },
        ],
        citation: [3, 15],
        summary: 'Elders septic atypically (delirium/falls/anorexia). Hunt all sources; qSOFA prompts. Do not anchor on asymptomatic bacteriuria.',
        safetyLevel: 'critical',
    },
    {
        id: 'unwell-sepsis-verdict',
        type: 'result',
        module: 2,
        title: 'Sepsis / Serious Infection — Treat',
        body: 'Open [Sepsis](#/tree/sepsis). Route to the source consult as it declares: [Adult UTI](#/tree/adult-uti) \u00B7 [Pneumonia](#/tree/pneumonia) \u00B7 [Meningitis](#/tree/meningitis).\n\n**Next hour (source-directed):**\n- **Cultures before antibiotics** (blood \u00D7 2, urine, sputum, CSF if CNS concern) \u2014 do not delay antibiotics for LP in a toxic patient.\n- **Broad-spectrum antibiotics within 1 h**, narrowed to the suspected source and local antibiogram.\n- **Balanced-crystalloid resuscitation** with cardiac/renal caution in elders \u2014 give measured boluses and reassess (lung exam, POCUS) rather than a fixed 30 mL/kg blindly.\n- Lactate, CBC, CMP, cultures; source control (drain/catheter) as needed.\n- **Do not treat asymptomatic bacteriuria** \u2014 a positive UA in a vague elder does not close the workup; keep hunting other sources.',
        recommendation: 'Cultures then broad-spectrum abx within 1 h; measured crystalloid with cardiopulmonary reassessment; source control. Never anchor on asymptomatic bacteriuria.',
        citation: [3],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'unwell-sepsis-excluded',
        type: 'result',
        module: 2,
        title: 'Sepsis — Unlikely (Beware Bacteriuria Anchoring)',
        body: 'No sepsis physiology and no convincing source make serious infection less likely now. **The classic geriatric error is stopping at a positive urinalysis** \u2014 asymptomatic bacteriuria is common in elders and treating it does not explain a vague decline. Keep the source hunt open.\n\n**Re-image / reassess** if delirium worsens, temperature trends, or lactate rises. Return to the hub for the next branch.',
        recommendation: 'Sepsis unlikely now; do NOT treat asymptomatic bacteriuria as the cause; keep hunting and reassess if delirium/temp/lactate worsen.',
        citation: [3],
        next: 'unwell-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- CARDIAC --------------------
    {
        id: 'unwell-cardiac-entry',
        type: 'question',
        module: 2,
        title: 'Silent / Atypical Cardiac — ECG Gate',
        body: 'Up to a third of elderly MIs are painless \u2014 they present as **dyspnea, fatigue, weakness, confusion, syncope, or nausea.** **Get an ECG + troponin on every unwell elder.** Also screen for new arrhythmia (rapid AF, complete heart block) and decompensated heart failure as the "generally unwell" driver.',
        options: [
            { label: 'ECG ischemia, rising troponin, unstable arrhythmia, or acute HF', description: 'Cardiac cause \u2014 treat', next: 'unwell-cardiac-verdict', urgency: 'critical' },
            { label: 'ECG non-ischemic, troponin flat, no arrhythmia/HF', description: 'Cardiac cause unlikely \u2014 move on', next: 'unwell-cardiac-excluded', urgency: 'routine' },
        ],
        citation: [4, 13],
        summary: 'ECG + troponin on every unwell elder. Painless MI is common; also screen arrhythmia + decompensated HF.',
        safetyLevel: 'critical',
    },
    {
        id: 'unwell-cardiac-verdict',
        type: 'result',
        module: 2,
        title: 'Cardiac Cause — Treat',
        body: '**ACS:** open [STEMI](#/tree/stemi) or [NSTEMI](#/tree/nstemi). Aspirin, ECG-driven pathway, serial troponin; use HEART/GRACE to risk-stratify NSTE presentations.\n\n**Unstable arrhythmia** (rapid AF with instability, high-grade AV block): rate/rhythm control or pacing per ACLS.\n\n**Decompensated heart failure:** treat congestion (diuresis, NIV for pulmonary edema) and hunt the trigger (ischemia, arrhythmia, infection, non-adherence).\n\nAdmit for monitoring; cardiology involvement per severity.',
        recommendation: 'ACS \u2192 ASA + ECG pathway + serial troponin; unstable arrhythmia \u2192 ACLS; decompensated HF \u2192 treat congestion + find trigger.',
        citation: [4, 13, 16],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'unwell-cardiac-excluded',
        type: 'result',
        module: 2,
        title: 'Cardiac Cause — Unlikely',
        body: 'A non-ischemic ECG with a flat troponin and no arrhythmia or heart-failure signs makes an acute cardiac cause less likely. **In elders, use serial troponin + repeat ECG** if the story is at all concerning \u2014 a single set does not clear silent ischemia.\n\nReturn to the hub for the next branch.',
        recommendation: 'Cardiac cause unlikely now; serial troponin + repeat ECG if the presentation stays concerning.',
        citation: [4, 13],
        next: 'unwell-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- NEUROLOGIC --------------------
    {
        id: 'unwell-neuro-entry',
        type: 'question',
        module: 2,
        title: 'Neurologic — Stroke vs Delirium Gate',
        body: '**Check a glucose first** (hypoglycemia mimics stroke). Then distinguish an **acute focal deficit** (stroke \u2014 time-critical) from **delirium** (acute, fluctuating global inattention off baseline). A posterior stroke can present as isolated vertigo, ataxia, or "confusion" without obvious weakness \u2014 examine gait, eye movements, and coordination.',
        options: [
            { label: 'Acute focal deficit / new stroke syndrome', description: 'Stroke pathway \u2014 time is brain', next: 'unwell-neuro-stroke', urgency: 'critical' },
            { label: 'Acute fluctuating global confusion (delirium), no focal deficit', description: 'Delirium \u2014 find & treat the cause', next: 'unwell-neuro-delirium', urgency: 'urgent' },
            { label: 'No acute neuro change vs baseline', description: 'Acute neuro cause unlikely \u2014 move on', next: 'unwell-neuro-excluded', urgency: 'routine' },
        ],
        citation: [5],
        summary: 'Glucose first. Focal deficit = stroke pathway; fluctuating global confusion = delirium workup; no change = move on.',
        safetyLevel: 'critical',
    },
    {
        id: 'unwell-neuro-stroke',
        type: 'result',
        module: 2,
        title: 'Acute Stroke Syndrome — Treat',
        body: 'Open [Stroke](#/tree/stroke).\n\n**Next minutes:** confirm glucose, establish last-known-well, **NIHSS**, emergent non-contrast head CT \u00B1 CTA/perfusion, activate stroke pathway for thrombolysis / thrombectomy eligibility. Do not let "the patient is just confused" delay the clock \u2014 posterior and "confusion-predominant" strokes are missed this way.',
        recommendation: 'Glucose + last-known-well + NIHSS + emergent CT/CTA; activate stroke pathway. Beware confusion-predominant/posterior strokes.',
        citation: [5, 17],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'unwell-neuro-delirium',
        type: 'result',
        module: 2,
        title: 'Delirium — Find the Cause',
        body: 'Open [Delirium](#/tree/delirium). **Delirium is a symptom, not a diagnosis** \u2014 it demands a cause hunt (infection, drugs, metabolic, hypoxia, pain, urinary retention/constipation, stroke, cardiac).\n\n- Full workup: vitals incl. glucose + SpO2, medication review, CBC, CMP, UA (interpret cautiously), ECG, consider CT head (esp. anticoagulated, focal signs, fall).\n- **Non-pharmacologic first:** reorient, hydrate, mobilize, treat pain, restore sleep-wake, remove tethers.\n- Reserve low-dose antipsychotics for dangerous agitation; **avoid benzodiazepines** (except alcohol/benzo withdrawal) \u2014 they worsen delirium.',
        recommendation: 'Delirium = cause hunt (infection/drugs/metabolic/hypoxia/retention/stroke). Non-pharm first; avoid benzodiazepines.',
        citation: [6, 10, 11],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'unwell-neuro-excluded',
        type: 'result',
        module: 2,
        title: 'Acute Neurologic Cause — Unlikely',
        body: 'No acute focal deficit and no change from cognitive baseline make an acute neurologic cause less likely. **Confirm baseline with a collateral history** \u2014 families often normalize slow decline. If there is any doubt about acuity, image and reassess.\n\nReturn to the hub for the next branch.',
        recommendation: 'Acute neuro cause unlikely; confirm baseline via collateral history; image if acuity is uncertain.',
        citation: [5],
        next: 'unwell-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- METABOLIC / ENDOCRINE --------------------
    {
        id: 'unwell-metabolic-entry',
        type: 'question',
        module: 2,
        title: 'Metabolic / Endocrine — Panel Gate',
        body: 'Send a broad panel: **glucose, sodium, calcium, potassium, renal function, TSH, and (if suggestive) cortisol.** Hyponatremia, hyper/hypoglycemia, hypercalcemia, uremia, thyroid storm/myxedema, and adrenal crisis all present as nonspecific decline in elders.',
        options: [
            { label: 'Significant derangement (glucose, Na, Ca, adrenal, thyroid)', description: 'Correct + treat cause', next: 'unwell-metabolic-verdict', urgency: 'urgent' },
            { label: 'Panel unremarkable', description: 'Metabolic cause unlikely \u2014 move on', next: 'unwell-metabolic-excluded', urgency: 'routine' },
        ],
        citation: [7, 14],
        summary: 'Broad panel: glucose, Na, Ca, K, renal, TSH, cortisol. Correct derangements carefully (esp. Na rate).',
        safetyLevel: 'warning',
    },
    {
        id: 'unwell-metabolic-verdict',
        type: 'result',
        module: 2,
        title: 'Metabolic / Endocrine Crisis — Treat',
        body: '- **Hypoglycemia:** open [Hypoglycemia](#/tree/hypoglycemia) \u2014 treat immediately (D50 / glucagon), then find the cause (sulfonylurea, insulin, sepsis, renal, adrenal); admit sulfonylurea/long-acting insulin events for recurrence.\n- **Hyperglycemic crisis:** open [DKA](#/tree/dka) (or HHS pathway) \u2014 fluids, electrolytes (K+ before insulin), insulin, treat trigger.\n- **Adrenal crisis:** open [Adrenal Insufficiency](#/tree/adrenal-insufficiency) \u2014 **hydrocortisone 100 mg IV** + fluids; do not wait for cortisol result if the picture fits.\n- **Hyponatremia:** correct at a **safe rate (\u22648 mEq/L per 24 h)** to avoid osmotic demyelination; treat by volume status + acuity.\n- **Hypercalcemia:** IV fluids first, then calcitonin / bisphosphonate; hunt malignancy / hyperparathyroidism.\n- **Thyroid:** myxedema coma (levothyroxine + hydrocortisone) or thyroid storm per pathway.',
        recommendation: 'Correct the derangement by acuity: hypoglycemia now; adrenal crisis \u2192 hydrocortisone empirically; hyponatremia \u2264 8 mEq/L/24 h; treat the underlying cause.',
        citation: [7, 14],
        safetyLevel: 'warning',
        confidence: 'definitive',
    },
    {
        id: 'unwell-metabolic-excluded',
        type: 'result',
        module: 2,
        title: 'Metabolic Cause — Unlikely',
        body: 'A normal broad metabolic/endocrine panel makes a metabolic crisis unlikely as the driver. Recheck if the clinical picture evolves or if a targeted test (e.g., random cortisol, ionized calcium) was not yet sent.\n\nReturn to the hub for the next branch.',
        recommendation: 'Metabolic cause unlikely on a normal panel; send targeted tests (cortisol, ionized Ca) if suggested and reassess.',
        citation: [7],
        next: 'unwell-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- OCCULT TRAUMA / ENVIRONMENTAL --------------------
    {
        id: 'unwell-trauma-entry',
        type: 'question',
        module: 2,
        title: 'Occult Trauma / Environmental — Gate',
        body: 'Ask about **unwitnessed falls** (a "found down" elder is trauma until proven otherwise). On anticoagulation, an intracranial bleed can present as isolated confusion. Screen for hip/pelvic fracture (pain, inability to bear weight, leg shortening/rotation) and temperature extremes (hypothermia can look like sepsis or stroke; hyperthermia/heat illness in summer).',
        options: [
            { label: 'Fall + anticoagulation / head strike, or focal deficit', description: 'Rule out intracranial bleed \u2014 CT head', next: 'unwell-trauma-head', urgency: 'critical' },
            { label: 'Can\u2019t bear weight / hip or pelvic pain after fall', description: 'Image for fracture', next: 'unwell-trauma-fracture', urgency: 'urgent' },
            { label: 'Temperature derangement (hypo/hyperthermia)', description: 'Environmental illness pathway', next: 'unwell-trauma-temp', urgency: 'urgent' },
            { label: 'No trauma history, normothermic', description: 'Occult trauma unlikely \u2014 move on', next: 'unwell-trauma-excluded', urgency: 'routine' },
        ],
        citation: [8, 12],
        summary: 'Found-down elder = trauma. Anticoagulated + head strike = CT head; can\u2019t bear weight = fracture imaging; temp derangement = environmental.',
        safetyLevel: 'critical',
    },
    {
        id: 'unwell-trauma-head',
        type: 'result',
        module: 2,
        title: 'Suspected Intracranial Injury — Image',
        body: '**Non-contrast head CT now** for any anticoagulated / antiplatelet elder with a fall or head strike, or any focal deficit / decreased GCS. \u2014 delayed bleeds occur; consider a period of observation \u00B1 repeat CT for anticoagulated patients even with an initially normal scan.\n\n**If bleed:** reverse anticoagulation emergently (per agent \u2014 e.g., 4-factor PCC + vitamin K for warfarin, andexanet/PCC for factor-Xa inhibitors, idarucizumab for dabigatran), neurosurgery consult, BP control, admit.',
        recommendation: 'Non-contrast head CT for anticoagulated fall / focal deficit; reverse anticoagulation emergently if bleed + neurosurgery; consider observation for delayed bleed.',
        citation: [8, 12],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'unwell-trauma-fracture',
        type: 'result',
        module: 2,
        title: 'Suspected Fracture — Image',
        body: 'Inability to bear weight, hip/groin pain, or leg shortening/external rotation after a fall \u2192 **plain films; if negative but clinical suspicion persists, MRI (or CT)** for occult hip fracture. Pelvic fractures in elders can bleed significantly \u2014 open [Pelvic Fracture](#/tree/pelvic-fracture) if pelvic mechanism / instability. Analgesia (fascia-iliaca block is excellent for hip fractures), orthopedics, and admission.',
        recommendation: 'Plain films \u2192 MRI/CT for occult hip fracture; pelvic fracture pathway if pelvic mechanism; regional analgesia + orthopedics.',
        citation: [8, 12],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'unwell-trauma-temp',
        type: 'result',
        module: 2,
        title: 'Environmental Temperature Illness — Treat',
        body: '- **Hypothermia** (core <35\u00B0C): open [Hypothermia](#/tree/hypothermia) \u2014 handle gently (arrhythmia risk), active rewarming by severity, and hunt a precipitant (sepsis, hypothyroid, hypoglycemia, intoxication, occult fall).\n- **Heat illness / hyperthermia:** open [Heat Stroke](#/tree/heat-stroke) \u2014 rapid cooling, organ-support; elders on anticholinergics/diuretics are high-risk.\n\nTemperature derangement in an elder is often a **clue to another illness**, not the whole story \u2014 keep the source hunt open.',
        recommendation: 'Rewarm/cool by severity AND hunt the precipitant; temperature derangement is a clue, not the full diagnosis.',
        citation: [8, 12],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'unwell-trauma-excluded',
        type: 'result',
        module: 2,
        title: 'Occult Trauma / Environmental — Unlikely',
        body: 'No trauma history and a normal temperature make occult injury / environmental illness less likely. **Collateral history matters** \u2014 an elder may not recall or report a fall. If bruising, anticoagulation, or an unclear timeline raises concern, image the head.\n\nReturn to the hub for the next branch.',
        recommendation: 'Occult trauma unlikely; confirm with collateral history; image head if anticoagulated with any concern.',
        citation: [8, 12],
        next: 'unwell-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- MEDICATION / POLYPHARMACY --------------------
    {
        id: 'unwell-meds-entry',
        type: 'question',
        module: 2,
        title: 'Medication / Polypharmacy — Review Gate',
        body: '**Reconcile every medication.** In elders, an adverse drug event is a leading cause of nonspecific decline: new drug started, dose change, interaction, or accumulation with worsening renal function. High-yield culprits: anticoagulants (bleeding), sedatives/opioids/anticholinergics (delirium, falls), diuretics/ACEi (electrolytes, AKI), sulfonylureas/insulin (hypoglycemia), digoxin/lithium (toxicity), and serotonergic combinations.',
        options: [
            { label: 'Plausible drug cause (new/changed drug, interaction, toxicity)', description: 'Address the drug + specific antidote/level', next: 'unwell-meds-verdict', urgency: 'urgent' },
            { label: 'No plausible medication cause on reconciliation', description: 'Drug cause unlikely \u2014 move on', next: 'unwell-meds-excluded', urgency: 'routine' },
        ],
        citation: [9],
        summary: 'Full med reconciliation. Culprits: anticoagulants, sedatives/anticholinergics, diuretics, sulfonylureas, digoxin/lithium, serotonergics.',
        safetyLevel: 'warning',
    },
    {
        id: 'unwell-meds-verdict',
        type: 'result',
        module: 2,
        title: 'Adverse Drug Event — Address',
        body: '- Stop or hold the offending agent; check **drug levels** where relevant (digoxin, lithium, valproate, phenytoin).\n- **Specific management:** digoxin toxicity \u2192 Digibind for life-threatening features; serotonin syndrome \u2192 stop serotonergics + supportive \u00B1 cyproheptadine; anticholinergic toxicity \u2192 supportive; benzodiazepine/opioid excess \u2192 support airway (flumazenil generally avoided in chronic users; naloxone titrated for opioids).\n- Correct downstream effects (electrolytes, glucose, AKI); adjust renally-cleared drugs to current GFR.\n- **Deprescribe** and communicate changes clearly to the patient/facility/PCP; a medication error is a diagnosis worth documenting.',
        recommendation: 'Hold the culprit, check levels, give the specific antidote where indicated, correct downstream effects, deprescribe + communicate.',
        citation: [9, 19],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'unwell-meds-excluded',
        type: 'result',
        module: 2,
        title: 'Medication Cause — Unlikely',
        body: 'A careful reconciliation without a plausible culprit makes an adverse drug event less likely. **Recheck adherence and OTC/supplement use** (elders under-report these), and re-screen if renal function changes make a previously safe dose toxic.\n\nReturn to the hub for the next branch.',
        recommendation: 'Drug cause unlikely on reconciliation; recheck OTC/supplement use + adherence + renal-dose accumulation.',
        citation: [9],
        next: 'unwell-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // ============================================================
    // Module 3 — Rescue / Reassess (Initial Bundle)
    // ============================================================
    {
        id: 'unwell-rescue',
        type: 'info',
        module: 3,
        title: 'Initial Bundle — Broad Screen for the Vague Elder',
        body: 'No single life-threat ruled in yet. Because the miss rate is high, the vague elder earns a **broad initial screen** rather than a narrow one:\n\n- **Bedside now:** ECG, POC glucose, temperature, SpO2, orthostatic vitals if feasible.\n- **Labs:** CBC with differential, CMP (Na, Ca, renal, glucose), **troponin**, lactate, **VBG**, **urinalysis + culture** (interpret cautiously), and per story: TSH, cortisol, LFTs, ammonia, drug levels, blood cultures, magnesium/phosphate.\n- **The under-ordered high-yield tests:** troponin, lactate, and a careful medication reconciliation catch a large share of "occult" causes.\n- **Fundamentals:** IV access, treat pain, review the anticoagulation status, gentle isotonic fluids if dehydrated (reassess lungs), skin/pressure exam, look for urinary retention / fecal impaction.\n- **Collateral history** from family/facility: baseline function, timeline, recent changes, falls, new meds.\n\n**Reassess** with results + a repeat exam \u2014 the diagnosis often declares on the second look.',
        citation: [1, 2],
        next: 'unwell-reassess',
        summary: 'Broad screen: ECG + glucose + temp + orthostatics; CBC/CMP/troponin/lactate/VBG/UA + targeted tests; collateral history. Reassess on results.',
        safetyLevel: 'warning',
    },
    {
        id: 'unwell-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess — Results & Second Look',
        body: 'Integrate results, collateral history, and a repeat exam. Decide the next step.',
        options: [
            { label: 'A source declared \u2014 route to that pathway', description: 'Leave the hub, work the deep-dive', next: 'unwell-triage' },
            { label: 'Undifferentiated \u2014 needs broader imaging before deciding', description: 'Imaging / workup breadth', next: 'unwell-imaging' },
            { label: 'Still undifferentiated but well + safe home', description: 'Consider discharge with tight follow-up', next: 'unwell-disposition' },
            { label: 'Still undifferentiated + not safe / not at baseline', description: 'Admit / observe for workup', next: 'unwell-disposition', urgency: 'urgent' },
            { label: 'Deteriorating / new red flag', description: 'STOP \u2014 return to the source hunt / resuscitate', next: 'unwell-triage', urgency: 'critical' },
        ],
        citation: [1, 2],
        summary: 'Source declared = route out; undifferentiated + safe = discharge w/ follow-up; not at baseline = admit; deteriorating = STOP.',
    },
    // ============================================================
    // Module 4 — Imaging / Workup Breadth
    // ============================================================
    {
        id: 'unwell-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging & Workup Breadth',
        body: 'Image by the leading hypothesis \u2014 but the vague elder often justifies broader imaging than a younger patient with the same complaint:\n\n- **Non-contrast head CT:** any focal deficit, decreased GCS, fall/anticoagulation, or unexplained delirium.\n- **CXR:** occult pneumonia, heart failure, effusion.\n- **CT abdomen/pelvis with contrast:** unexplained sepsis source, abdominal tenderness, suspected obstruction/ischemia (elders under-report abdominal pain).\n- **Bedside US / POCUS:** volume status (IVC/lungs) to guide cautious resuscitation, bladder (retention), aorta.\n- **Plain films / MRI:** occult hip / pelvic fracture after a fall.\n- **ECG (repeat) + serial troponin:** silent ischemia.\n\n**Principle:** in a high-miss population, a lower threshold to image an unexplained decline is appropriate \u2014 balanced against contrast/renal risk and goals of care.',
        citation: [10, 18, 12],
        next: 'unwell-disposition',
        summary: 'Image by leading hypothesis with a lower threshold than in the young: head CT (fall/delirium), CXR, CT A/P for occult source, POCUS for volume/retention.',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'unwell-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Disposition in the vague elder is as much about **safety and function** as about a single diagnosis. Weigh baseline, supports, and reversibility.',
        options: [
            { label: 'Admit \u2014 diagnosis found, unsafe at baseline, or high-risk undifferentiated', description: 'Admit / observe', next: 'unwell-dispo-admit', urgency: 'urgent' },
            { label: 'Discharge \u2014 benign workup, back to baseline, safe home + follow-up', description: 'Discharge with tight safety net', next: 'unwell-dispo-discharge' },
        ],
        citation: [1, 2, 10],
        summary: 'Admit if diagnosis found / unsafe / high-risk undifferentiated; discharge only if back to baseline + safe home + follow-up.',
    },
    {
        id: 'unwell-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit / Observe',
        body: 'Admit (or place in observation) when: a serious diagnosis is found or strongly suspected, the patient is **not back to functional baseline**, cannot safely self-care / lacks supports, has an abnormal vital sign or lab trend, is on high-risk medications with an unresolved concern, or has an unexplained decline that is not yet safe to send home.\n\n**Do NOT discharge a "weak/off" elder purely because the tests are normal** \u2014 an unexplained functional decline is itself an admission-level problem in a frail patient. Involve geriatrics / hospitalist; document baseline, function, and goals of care; screen for elder abuse/neglect if the story does not fit.\n\n**Handoff:** baseline function + timeline, collateral source, vitals/lab trends, ECG + troponin, imaging, medications reconciled + changes, working differential + pending tests, code status / goals of care.',
        recommendation: 'Admit for a found or high-risk undifferentiated cause OR any elder not at functional baseline; don\u2019t discharge on "normal labs" alone; screen for abuse; carry baseline + goals in handoff.',
        citation: [1, 2, 10],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'unwell-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge — Only With a Tight Safety Net',
        body: 'Discharge is reasonable ONLY when: a plausible benign/reversible cause was addressed (or a broad screen is reassuring), the patient is **back to functional baseline**, can safely eat/drink/toilet/ambulate to baseline, has capable supports, and has **reliable, prompt follow-up**.\n\n**Before discharge:** (1) confirm baseline with collateral, (2) reconcile medications + deprescribe culprits, (3) ensure gait/fall safety (PT eval or fall precautions), (4) arrange **48\u201372 h follow-up** (booked), (5) written return precautions in large print, (6) address social supports / home safety, (7) document capacity and goals.\n\n**Return precautions:** worsening confusion, fever, chest pressure or breathlessness, weakness/one-sided symptoms, new falls, inability to eat/drink, black or bloody stool, or "getting worse instead of better." Counsel the family: "A vague decline can be the first sign of a serious illness \u2014 if he is not clearly back to himself, or gets worse, bring him back."',
        recommendation: 'Discharge only if back to baseline + safe supports + booked 48-72 h follow-up; reconcile meds, ensure fall safety, large-print precautions, involve family.',
        citation: [1, 2, 9, 10],
        confidence: 'recommended',
    },
];
export const NONSPECIFIC_UNWELL_ELDERLY_HUB_CRITICAL_ACTIONS = [
    { text: 'Atypical is the rule: full vitals INCLUDING glucose, temperature, orthostatics + ECG + troponin on every unwell elder. A blunted HR/temp does not reassure.', nodeId: 'unwell-start' },
    { text: 'Do NOT anchor on a positive urinalysis \u2014 asymptomatic bacteriuria is common and does not explain a vague decline. Keep the source hunt open.', nodeId: 'unwell-sepsis-entry' },
    { text: 'Found-down / fall on anticoagulation \u2192 non-contrast head CT; reverse anticoagulation emergently if bleed. Delayed bleeds occur.', nodeId: 'unwell-trauma-head' },
    { text: 'Reconcile every medication \u2014 an adverse drug event is a leading cause of nonspecific decline in elders.', nodeId: 'unwell-meds-entry' },
    { text: 'Never discharge a "weak/off" elder on normal labs alone if not at baseline \u2014 an unexplained functional decline is itself an admission-level problem in a frail patient.', nodeId: 'unwell-dispo-admit' },
];
export const NONSPECIFIC_UNWELL_ELDERLY_HUB_CITATIONS = [
    { num: 1, text: 'Nickel CH, Nemec M, Bingisser R. Weakness as presenting symptom in the emergency department. Swiss Med Wkly. 2009;139(17-18):271-272. PMID: 19418310. https://smw.ch/index.php/smw/article/view/975' },
    { num: 2, text: 'Nemec M, Koller MT, Nickel CH, et al. Patients presenting to the emergency department with non-specific complaints: the Basel Non-specific Complaints (BANC) study. Acad Emerg Med. 2010;17(3):284-292. doi:10.1111/j.1553-2712.2009.00658.x. PMID: 20370761' },
    { num: 3, text: 'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143. doi:10.1097/CCM.0000000000005337. PMID: 34605781' },
    { num: 4, text: 'SUPERSEDED \u2014 Amsterdam EA, Wenger NK, Brindis RG, et al. 2014 AHA/ACC Guideline for the Management of Patients With Non-ST-Elevation Acute Coronary Syndromes. Circulation. 2014;130(25):e344-e426. doi:10.1161/CIR.0000000000000134. PMID: 25249585. Superseded by reference 13 (2025 ACC/AHA/ACEP/NAEMSP/SCAI ACS guideline).' },
    { num: 5, text: 'Prabhakaran S, Gonzalez NR, Zachrison KS, et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke: A Guideline From the American Heart Association/American Stroke Association. Stroke. 2026;57. Published online January 26, 2026. doi:10.1161/STR.0000000000000513. PMID: 41582814' },
    { num: 6, text: 'American Geriatrics Society Expert Panel on Postoperative Delirium in Older Adults. American Geriatrics Society Abstracted Clinical Practice Guideline for Postoperative Delirium in Older Adults. J Am Geriatr Soc. 2015;63(1):142-150. doi:10.1111/jgs.13281. PMID: 25495432' },
    { num: 7, text: 'Spasovski G, Vanholder R, Allolio B, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol. 2014;170(3):G1-G47. doi:10.1530/EJE-13-1020. PMID: 24569125' },
    { num: 8, text: 'SUPERSEDED \u2014 American College of Surgeons Trauma Quality Improvement Program. ACS TQIP Geriatric Trauma Management Guidelines. Chicago, IL: American College of Surgeons; October 2013. Superseded by reference 12 (ACS TQP Best Practices Guidelines: Geriatric Trauma Management, 2023).' },
    { num: 9, text: 'By the 2023 American Geriatrics Society Beers Criteria Update Expert Panel. American Geriatrics Society 2023 Updated AGS Beers Criteria for Potentially Inappropriate Medication Use in Older Adults. J Am Geriatr Soc. 2023;71(7):2052-2081. doi:10.1111/jgs.18372. PMID: 37139824' },
    { num: 10, text: 'American College of Emergency Physicians, American Geriatrics Society, Emergency Nurses Association, Society for Academic Emergency Medicine, Geriatric Emergency Department Guidelines Task Force. Geriatric Emergency Department Guidelines. Ann Emerg Med. 2014;63(5):e7-e25. doi:10.1016/j.annemergmed.2014.02.008. PMID: 24746437' },
    { num: 11, text: 'Rosen T, Connors S, Clark S, et al. Assessment and Management of Delirium in Older Adults in the Emergency Department: Literature Review to Inform Development of a Novel Clinical Protocol. Adv Emerg Nurs J. 2015;37(3):183-196. doi:10.1097/TME.0000000000000066. PMID: 26218485' },
    { num: 12, text: 'American College of Surgeons Trauma Quality Programs. ACS TQP Best Practices Guidelines: Geriatric Trauma Management. Chicago, IL: American College of Surgeons; November 2023. https://media.facs.org/ubyj2ubl/best-practices-guidelines-geriatric-trauma.pdf' },
    { num: 13, text: 'Rao SV, O\u2019Donoghue ML, Ruel M, et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes. Circulation. 2025;151(13):e771-e862. doi:10.1161/CIR.0000000000001309. PMID: 40014670' },
    { num: 14, text: 'Bornstein SR, Allolio B, Arlt W, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab. 2016;101(2):364-389. doi:10.1210/jc.2015-1710. PMID: 26760044' },
    { num: 15, text: 'Singer M, Deutschman CS, Seymour CW, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810. doi:10.1001/jama.2016.0287. PMID: 26903338 \u2014 primary source for the qSOFA criteria (RR\u226522, SBP\u2264100, altered mentation).' },
    { num: 16, text: 'Backus BE, Six AJ, Kelder JC, et al. A prospective validation of the HEART score for chest pain patients at the emergency department. Int J Cardiol. 2013;168(3):2153-2158. doi:10.1016/j.ijcard.2013.01.255. PMID: 23465250' },
    { num: 17, text: 'Brott T, Adams HP Jr, Olinger CP, et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989;20(7):864-870. doi:10.1161/01.STR.20.7.864. PMID: 2749846 \u2014 primary source for the NIH Stroke Scale (NIHSS).' },
    { num: 18, text: 'Gunaga S, Carpenter CR, Kennedy M, et al. A Model for Developing Subspecialty Clinical Practice Guidelines: The Geriatric Emergency Department Guidelines 2.0. J Am Coll Emerg Physicians Open. 2025;6(6):100247. doi:10.1016/j.acepjo.2025.100247. PMCID: PMC12476112 \u2014 current GRADE-based successor framework to reference 10.' },
    { num: 19, text: 'Boyer EW, Shannon M. The serotonin syndrome. N Engl J Med. 2005;352(11):1112-1120. doi:10.1056/NEJMra041867. PMID: 15784664' },
];
export const NONSPECIFIC_UNWELL_ELDERLY_HUB_NODE_COUNT = NONSPECIFIC_UNWELL_ELDERLY_HUB_NODES.length;
export const NONSPECIFIC_UNWELL_ELDERLY_HUB_MODULE_LABELS = [
    'Sick Check',
    'Source Hunt',
    'Initial Bundle',
    'Imaging',
    'Disposition',
];
