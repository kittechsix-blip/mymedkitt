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
//
// Medical audit (Dr. Kitlowski) 2026-07-31 — first clinical audit of this file. All 16 original PMIDs
// re-verified against NCBI esummary/Europe PMC: zero mis-attributions. Structure clean (29 nodes, no
// dangling next refs, no orphans, no bare #/node/ links, all 14 #/tree/ targets exist).
// Auto-fixes applied: reference 3 (SSC 2021) marked SUPERSEDED and reference 20 added for Surviving
// Sepsis Campaign 2026 — the child consult sepsis.ts was already SSC-2026-aware while this hub was a
// full guideline generation behind it (sibling drift); reference 5 pagination completed now that
// Stroke has assigned pages; reference 18 (GEDG 2.0) PMID 41019914 added; references 20-28 appended.
// Content auto-fixes: BANC outcome figures added to the entry node; painless-MI statistic corrected
// from "up to a third" to the age-stratified NRMI data (~33% all ages, ~60% over 85); formal delirium
// screening block added with the correct pooled prevalence of 15.2% and the 2026 GRADE-based ED
// delirium instrument list; delayed-ICH rates added to the head-trauma node; NEISS-CADES adverse-drug-
// event proportions added; head-CT-in-delirium yield reconciled with delirium.ts; Clinical Frailty
// Scale documentation anchor and structured-assessment revisit data added to disposition; cross-links
// added to altered-mental-status-hub, generalized-weakness-hub and organic-vs-psych. Reference 29
// (ACEP 2024 severe agitation clinical policy) added, and the benzodiazepine carve-out from the
// organic-vs-psych audit of 2026-07-28 (withdrawal / sympathomimetic toxicity / catatonia) mirrored
// here ADDITIVELY — the original "avoid benzodiazepines" default line was left intact and untouched.
// FLAGGED for Andy (clinical directive text — NOT edited): the sepsis-verdict fluid wording
// ("measured boluses ... rather than a fixed 30 mL/kg blindly") sits against SSC 2026, which retains
// the >=30 mL/kg suggestion, and against sepsis.ts, which carries 30 mL/kg. SSC 2026's position was
// added ALONGSIDE the existing text; the directive itself was left untouched pending Andy's decision.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const NONSPECIFIC_UNWELL_ELDERLY_HUB_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Sick Check
  // ============================================================
  {
    id: 'unwell-start',
    type: 'info',
    module: 1,
    title: 'The Generally Unwell Elder — Sick Check First',
    body: '**\u26A0\uFE0F "Weak / off / not right" in an elder is high-risk. Do NOT accept a vague label without a source hunt.** Atypical presentation is the rule after ~75: sepsis without fever, MI without chest pain, "acute abdomen" with a soft belly, stroke as "confusion."\n\n**How high-risk, in numbers (Basel BANC cohort, ED patients presenting with nonspecific complaints):** a **serious condition** \u2014 life-threatening or requiring early intervention \u2014 was identified in **59%** within 30 days, and **30-day mortality was 6%**, comparable to patients admitted with community-acquired pneumonia. Roughly **half of nonspecific presentations are reclassified to a specific diagnosis** once the workup completes. "Nonspecific" is a triage artifact, not a diagnosis, and not a reassurance. [2]\n\n**5 DO NOT MISS behind a nonspecific complaint:**\n1. **Occult sepsis** \u2014 may be afebrile / normotensive early; look for tachypnea, delirium, low-grade temp change, leukocytosis or bandemia.\n2. **Silent / atypical ACS** \u2014 dyspnea, fatigue, delirium, nausea; **get an ECG + troponin.**\n3. **Stroke presenting as confusion / weakness** \u2014 do a focused neuro exam + glucose.\n4. **Metabolic crisis** \u2014 hypo/hyperglycemia, hyponatremia, adrenal crisis, hypercalcemia.\n5. **Occult trauma / environmental** \u2014 unwitnessed fall (head bleed on anticoagulation, hip/pelvic fracture), hypo/hyperthermia.\n\n**First 60 seconds:**\n- **ABCs + vitals INCLUDING glucose, temperature, and a full set of orthostatics if able.** A "normal" HR may be blunted by beta-blockers \u2014 interpret trends, not single numbers.\n- **Mental status vs baseline** \u2014 ask family / facility: is this delirium (acute, fluctuating) off baseline?\n- **Screen:** ECG, POC glucose, temp, SpO2, medication list (polypharmacy / new drug), last oral intake, fall history.\n\n**If unstable / septic / ischemic ECG / profound metabolic derangement:** resuscitate in parallel. **If stable:** go to Rule In / Rule Out.',
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
    body: 'The vague elder needs a broad, structured hunt \u2014 work each system to an explicit verdict. Excluded loops back here for the next branch. **Cast a wide net early; anchoring is the enemy.**\n\n**Related hubs \u2014 use the one that matches the dominant finding:** if the leading problem is a **change in mental status**, work [Altered Mental Status Hub](#/tree/altered-mental-status-hub). If it is **true motor weakness** rather than global "off," work [Generalized Weakness Hub](#/tree/generalized-weakness-hub). This hub is for the elder whose complaint refuses to localize at all.',
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
    body: '**Elders septic without classic signs:** delirium, functional decline, falls, or anorexia may be the ONLY presentation. Fever can be absent (or hypothermia present). Hunt every source: **urine (but do NOT anchor on asymptomatic bacteriuria), lungs, skin/soft tissue, intra-abdominal, CNS, lines/devices.** Use **qSOFA** (RR\u226522, SBP\u2264100, altered) as a bedside prompt \u2014 a low qSOFA does NOT exclude sepsis.\n\n**Screening-instrument basis note (SSC 2021 and 2026):** the Surviving Sepsis Campaign recommends **against qSOFA as a *single* screening tool** and favors **NEWS, NEWS2, MEWS or SIRS**, which are more sensitive. In the Sepsis-3 derivation only ~24% of infected patients scored qSOFA \u22652, yet that minority carried ~70% of the poor outcomes \u2014 qSOFA is a **specific alarm, not a sensitive filter**. Sepsis remains a clinical diagnosis; no single score or biomarker rules it in or out. [15][3][20]\n\n**Why the urine misleads \u2014 asymptomatic bacteriuria prevalence in elders:** community-dwelling **15\u201350%**, nursing-home residents **25\u201350%**, chronically catheterized **up to 100%**. IDSA recommends against screening for or treating ASB outside pregnancy and pre-urologic procedures that breach mucosa. A positive UA in a vague elder is more likely background noise than the answer. [28]',
    options: [
      { label: 'Sepsis physiology or a convincing source', description: 'Resuscitate + source-directed workup', next: 'unwell-sepsis-verdict', urgency: 'critical' },
      { label: 'No source, no sepsis physiology (incl. asymptomatic bacteriuria only)', description: 'Sepsis unlikely \u2014 move on, do not over-treat urine', next: 'unwell-sepsis-excluded', urgency: 'routine' },
    ],
    citation: [3, 15, 20, 28],
    summary: 'Elders septic atypically (delirium/falls/anorexia). Hunt all sources; qSOFA prompts. Do not anchor on asymptomatic bacteriuria.',
    safetyLevel: 'critical',
  },
  {
    id: 'unwell-sepsis-verdict',
    type: 'result',
    module: 2,
    title: 'Sepsis / Serious Infection — Treat',
    body: 'Open [Sepsis](#/tree/sepsis). Route to the source consult as it declares: [Adult UTI](#/tree/adult-uti) \u00B7 [Pneumonia](#/tree/pneumonia) \u00B7 [Meningitis](#/tree/meningitis).\n\n**Next hour (source-directed):**\n- **Cultures before antibiotics** (blood \u00D7 2, urine, sputum, CSF if CNS concern) \u2014 do not delay antibiotics for LP in a toxic patient.\n- **Broad-spectrum antibiotics within 1 h**, narrowed to the suspected source and local antibiogram.\n- **Balanced-crystalloid resuscitation** with cardiac/renal caution in elders \u2014 give measured boluses and reassess (lung exam, POCUS) rather than a fixed 30 mL/kg blindly.\n- Lactate, CBC, CMP, cultures; source control (drain/catheter) as needed.\n- **Do not treat asymptomatic bacteriuria** \u2014 a positive UA in a vague elder does not close the workup; keep hunting other sources.\n\n**Guideline currency (Surviving Sepsis Campaign 2026):** antimicrobials **immediately, ideally within 1 h**, for possible, probable or definite **septic shock** and for **probable or definite sepsis without shock**. For **possible sepsis without shock**, a conditional recommendation permits **rapid assessment first, with antimicrobials within 3 h** if infection remains the leading explanation \u2014 which is exactly the vague elder in front of you. On volume, SSC 2026 **retains the suggestion of at least 30 mL/kg IV crystalloid within the first 3 h** for sepsis-induced hypoperfusion or shock (conditional recommendation, low certainty), dosed on **actual body weight** \u2014 adjusted or ideal body weight if BMI >30. The measured-bolus method above is the safe *way to deliver* that volume in a frail elder with fixed cardiac output; it is **not** a license to under-resuscitate. See [Sepsis](#/tree/sepsis) for the full fluid and pressor sequence. [3][20]',
    recommendation: 'Cultures then broad-spectrum abx within 1 h; measured crystalloid with cardiopulmonary reassessment; source control. Never anchor on asymptomatic bacteriuria.',
    citation: [3, 20],
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
    citation: [3, 28],
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
    body: 'Painless MI is not a rarity in this population, and the usual "about a third" figure **understates the risk in the oldest patients.** In the National Registry of Myocardial Infarction (434,877 confirmed MIs), **33% presented without chest pain overall** \u2014 but the proportion is steeply age-dependent: in patients **over 85, only ~40% report chest pain at all**, meaning roughly **60% of MIs in the very old are painless.** [22][23]\n\n**What they present with instead:** dyspnea (~49%), diaphoresis (~26%), nausea/vomiting (~24%), syncope or near-syncope (~19%), plus fatigue, weakness and new confusion. Patients without chest pain wait longer to present, are **less likely to receive reperfusion, aspirin, beta-blockers or heparin**, and carry substantially higher adjusted in-hospital mortality (23.3% vs 9.3% in NRMI). The penalty for missing it is paid twice \u2014 once in the miss, again in the withheld therapy.\n\n**Get an ECG + troponin on every unwell elder.** Also screen for new arrhythmia (rapid AF, complete heart block) and decompensated heart failure as the "generally unwell" driver.',
    options: [
      { label: 'ECG ischemia, rising troponin, unstable arrhythmia, or acute HF', description: 'Cardiac cause \u2014 treat', next: 'unwell-cardiac-verdict', urgency: 'critical' },
      { label: 'ECG non-ischemic, troponin flat, no arrhythmia/HF', description: 'Cardiac cause unlikely \u2014 move on', next: 'unwell-cardiac-excluded', urgency: 'routine' },
    ],
    citation: [4, 13, 22, 23],
    summary: 'ECG + troponin on every unwell elder. 33% of all MIs are painless; ~60% in those over 85. Also screen arrhythmia + decompensated HF.',
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
    body: 'Open [Delirium](#/tree/delirium). **Delirium is a symptom, not a diagnosis** \u2014 it demands a cause hunt (infection, drugs, metabolic, hypoxia, pain, urinary retention/constipation, stroke, cardiac).\n\n**Prevalence and detection \u2014 the numbers you should hold:** pooled prevalence of delirium in older ED patients is **15.2% (95% CI 12.5\u201318.0%)** across 30 studies and 19,534 patients \u2014 not the 20\u201330% often quoted. That is one in seven, which is common enough to screen for and uncommon enough that you will not find it by gestalt alone. **Emergency clinicians miss 57\u201383% of delirium when no structured screen is used**, and hypoactive delirium \u2014 the quiet, withdrawn, "just tired" elder \u2014 is the subtype most often missed and the one with the worse outcome. [21][26]\n\n**Use a validated instrument, not impression.** The 2026 GRADE-based ED delirium guideline (Geriatric ED Guidelines 2.0 work group) suggests, all as **conditional recommendations on very low certainty evidence**:\n- **To rule delirium IN or OUT:** 4AT, bCAM, CAM-ICU, mCAM-ED, AMT-4, or RASS \u2014 any one of these, chosen for your workflow.\n- **To rule delirium OUT only:** the **Delirium Triage Screen (DTS)** \u2014 it is a sensitive triage filter, not a confirmatory test. A positive DTS must be followed by a confirmatory instrument.\n- **Screen at-risk older patients**, do not wait for the nurse to flag agitation. Agitation-triggered screening finds hyperactive delirium and misses the hypoactive majority.\n\n**Who to screen \u2014 high-certainty risk factors (GEDG 2.0):** pre-existing **cognitive impairment (OR 4.46)** \u00B7 **nursing-home residence (OR 3.45)** \u00B7 **prior stroke (OR 3.20)** \u00B7 **hearing impairment (OR 2.57)** \u00B7 **ED length of stay over 10 h (OR 2.23)**. The last one is the only one you control. Prevalence rises to roughly **40% in elders arriving from a nursing home.**\n\n- Full workup: vitals incl. glucose + SpO2, medication review, CBC, CMP, UA (interpret cautiously), ECG, consider CT head (esp. anticoagulated, focal signs, fall).\n- **Non-pharmacologic first:** reorient, hydrate, mobilize, treat pain, restore sleep-wake, remove tethers.\n- Reserve low-dose antipsychotics for dangerous agitation; **avoid benzodiazepines** (except alcohol/benzo withdrawal) \u2014 they worsen delirium.\n\n**Where the "avoid benzodiazepines" default inverts \u2014 three exceptions, not one.** The rule above is correct as a default and dangerously wrong in three settings, where a benzodiazepine is the drug of **choice**, not the drug to avoid:\n1. **Alcohol or sedative-hypnotic withdrawal** \u2014 GABA-ergic replacement is the treatment; an antipsychotic lowers the seizure threshold and treats nothing.\n2. **Sympathomimetic toxicity** (cocaine, methamphetamine, synthetic cathinones) \u2014 a benzodiazepine addresses the catecholamine surge, hyperthermia and tachycardia; an antipsychotic worsens hyperthermia and QT.\n3. **Catatonia** \u2014 responds to lorazepam and is worsened by antipsychotics, which can precipitate neuroleptic malignant syndrome.\nThis mirrors the carve-out already carried in [Organic vs Psychiatric](#/tree/organic-vs-psych). Note that the ACEP 2024 severe-agitation clinical policy explicitly **excludes patients over 65** from its recommendations \u2014 there is no society-endorsed agitation regimen for this exact population, which is another reason to exhaust non-pharmacologic measures first. [29]',
    recommendation: 'Screen with a validated tool (4AT/bCAM/CAM-ICU/mCAM-ED/AMT-4/RASS; DTS to rule out only). Delirium = cause hunt (infection/drugs/metabolic/hypoxia/retention/stroke). Non-pharm first; avoid benzodiazepines.',
    citation: [6, 10, 11, 21, 26, 29],
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
    body: '**Non-contrast head CT now** for any anticoagulated / antiplatelet elder with a fall or head strike, or any focal deficit / decreased GCS. \u2014 delayed bleeds occur; consider a period of observation \u00B1 repeat CT for anticoagulated patients even with an initially normal scan.\n\n**If bleed:** reverse anticoagulation emergently (per agent \u2014 e.g., 4-factor PCC + vitamin K for warfarin, andexanet/PCC for factor-Xa inhibitors, idarucizumab for dabigatran), neurosurgery consult, BP control, admit.\n\n**Calibrate the delayed-bleed fear \u2014 it is real but small.** In a multicentre cohort of 1,596 anticoagulated patients with mild head injury (median age 84), delayed intracranial haemorrhage occurred in **1.8% on DOACs and 2.6% on vitamin K antagonists**, and **none required neurosurgery.** A meta-analysis of blunt head trauma on DOACs found pooled delayed ICH of **~2.4% (vs ~2.3% on warfarin)**, with **86% clinically inconsequential** and crude mortality **0.36%**. [24][25]\n\n**What that should change:** blanket 24-hour observation with routine repeat CT for every anticoagulated elder with a normal initial scan is **not** supported by these numbers. Target the repeat scan and the observation period at the patients who actually declare risk \u2014 **vomiting, new or evolving neurologic symptoms, loss of consciousness or amnesia, supratherapeutic INR (>3), concurrent antiplatelet therapy, or a poor social/observation situation at home.** A well, neurologically intact elder with a normal CT and a competent observer is a defensible discharge with explicit return precautions.',
    recommendation: 'Non-contrast head CT for anticoagulated fall / focal deficit; reverse anticoagulation emergently if bleed + neurosurgery; delayed ICH ~1.8-2.6% so target repeat imaging/observation selectively rather than universally.',
    citation: [8, 12, 24, 25],
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
    body: '**Reconcile every medication.** In elders, an adverse drug event is a leading cause of nonspecific decline: new drug started, dose change, interaction, or accumulation with worsening renal function. High-yield culprits: anticoagulants (bleeding), sedatives/opioids/anticholinergics (delirium, falls), diuretics/ACEi (electrolytes, AKI), sulfonylureas/insulin (hypoglycemia), digoxin/lithium (toxicity), and serotonergic combinations.\n\n**How much of your ED census this is (NEISS-CADES national surveillance, 2013\u20132014):** adults **65 and older account for 34.5% of all adverse-drug-event ED visits** despite being a much smaller share of the population, and they have by far the highest hospitalization rate from those visits \u2014 **43.6%.** Three drug classes drive **59.9%** of ADE visits in this age group: **anticoagulants, diabetes agents, and opioid analgesics.** [27]\n\n**The counter-intuitive part:** drugs on the Beers "always avoid" list accounted for only **1.8%** of ADE ED visits. **The medications that actually put elders in your department are the ones they are supposed to be taking.** Do not limit the review to a Beers scan \u2014 reconcile the warfarin, the DOAC, the insulin, the sulfonylurea and the opioid first, and check whether renal function has drifted under a dose that used to be right.',
    options: [
      { label: 'Plausible drug cause (new/changed drug, interaction, toxicity)', description: 'Address the drug + specific antidote/level', next: 'unwell-meds-verdict', urgency: 'urgent' },
      { label: 'No plausible medication cause on reconciliation', description: 'Drug cause unlikely \u2014 move on', next: 'unwell-meds-excluded', urgency: 'routine' },
    ],
    citation: [9, 27],
    summary: 'Full med reconciliation. Age 65+ = 34.5% of ADE ED visits; anticoagulants + diabetes agents + opioids = 59.9%. Beers "avoid" drugs only 1.8%.',
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
    body: 'Image by the leading hypothesis \u2014 but the vague elder often justifies broader imaging than a younger patient with the same complaint:\n\n- **Non-contrast head CT:** any focal deficit, decreased GCS, fall/anticoagulation, or unexplained delirium.\n- **CXR:** occult pneumonia, heart failure, effusion.\n- **CT abdomen/pelvis with contrast:** unexplained sepsis source, abdominal tenderness, suspected obstruction/ischemia (elders under-report abdominal pain).\n- **Bedside US / POCUS:** volume status (IVC/lungs) to guide cautious resuscitation, bladder (retention), aorta.\n- **Plain films / MRI:** occult hip / pelvic fracture after a fall.\n- **ECG (repeat) + serial troponin:** silent ischemia.\n\n**Principle:** in a high-miss population, a lower threshold to image an unexplained decline is appropriate \u2014 balanced against contrast/renal risk and goals of care.\n\n**Honesty about the head CT in delirium:** the 2026 ED delirium guideline could make **no recommendation for or against routine brain imaging in delirium without focal findings** \u2014 the evidence is very low certainty. The observed yield in undifferentiated delirium **without focal deficit, without head trauma and without anticoagulation is only ~5%.** Scan for a *reason* \u2014 focal deficit, decreased GCS, fall or head strike, anticoagulation, new seizure, or delirium that does not resolve as the metabolic/infectious cause is corrected \u2014 not reflexively because the patient is confused. [21]',
    citation: [10, 18, 12, 21],
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
    body: 'Disposition in the vague elder is as much about **safety and function** as about a single diagnosis. Weigh baseline, supports, and reversibility.\n\n**Document frailty explicitly \u2014 it is the variable that predicts what happens after you decide.** The **Clinical Frailty Scale (CFS, 1\u20139)** is the instrument the Geriatric ED Guidelines framework uses; scores in the **vulnerable-to-frail range (CFS \u22654)** carry roughly **1.8\u00D7 the adjusted odds of functional decline** and about **2.5\u00D7 the odds of institutionalisation** after an ED visit, independent of the diagnosis. Record the CFS score, the baseline functional level and the collateral source in your note.\n\n**Do not use a frailty score by itself to admit or discharge.** There is no validated CFS cut-point that decides disposition in an undifferentiated elder. Frailty is a risk multiplier applied to your clinical judgement and to the intensity of the safety net \u2014 it is not the decision. [18]',
    options: [
      { label: 'Admit \u2014 diagnosis found, unsafe at baseline, or high-risk undifferentiated', description: 'Admit / observe', next: 'unwell-dispo-admit', urgency: 'urgent' },
      { label: 'Discharge \u2014 benign workup, back to baseline, safe home + follow-up', description: 'Discharge with tight safety net', next: 'unwell-dispo-discharge' },
    ],
    citation: [1, 2, 10, 18],
    summary: 'Admit if diagnosis found / unsafe / high-risk undifferentiated; discharge only if back to baseline + safe home + follow-up. Document CFS; never disposition on the score alone.',
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
    body: 'Discharge is reasonable ONLY when: a plausible benign/reversible cause was addressed (or a broad screen is reassuring), the patient is **back to functional baseline**, can safely eat/drink/toilet/ambulate to baseline, has capable supports, and has **reliable, prompt follow-up**.\n\n**Before discharge:** (1) confirm baseline with collateral, (2) reconcile medications + deprescribe culprits, (3) ensure gait/fall safety (PT eval or fall precautions), (4) arrange **48\u201372 h follow-up** (booked), (5) written return precautions in large print, (6) address social supports / home safety, (7) document capacity and goals.\n\n**Return precautions:** worsening confusion, fever, chest pressure or breathlessness, weakness/one-sided symptoms, new falls, inability to eat/drink, black or bloody stool, or "getting worse instead of better." Counsel the family: "A vague decline can be the first sign of a serious illness \u2014 if he is not clearly back to himself, or gets worse, bring him back."\n\n**The safety net is not a formality \u2014 it measurably changes outcomes.** In a controlled ED evaluation of structured geriatric assessment for older patients with nonspecific complaints, **72-hour revisits fell from 4.6% to 2.3%** and **30-day revisits from ~16% to ~10%** in the assessed group. In the same population roughly **half of "nonspecific" presentations were reclassified to a specific diagnosis** once structured assessment and follow-up occurred \u2014 which is another way of saying that the diagnosis you did not make in the ED often exists and is found later. Booked follow-up, medication reconciliation and a written precaution sheet are the mechanism by which that later diagnosis gets made safely instead of catastrophically. [2][18]',
    recommendation: 'Discharge only if back to baseline + safe supports + booked 48-72 h follow-up; reconcile meds, ensure fall safety, large-print precautions, involve family.',
    citation: [1, 2, 9, 10, 18],
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

export const NONSPECIFIC_UNWELL_ELDERLY_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Nickel CH, Nemec M, Bingisser R. Weakness as presenting symptom in the emergency department. Swiss Med Wkly. 2009;139(17-18):271-272. PMID: 19418310. https://smw.ch/index.php/smw/article/view/975' },
  { num: 2, text: 'Nemec M, Koller MT, Nickel CH, et al. Patients presenting to the emergency department with non-specific complaints: the Basel Non-specific Complaints (BANC) study. Acad Emerg Med. 2010;17(3):284-292. doi:10.1111/j.1553-2712.2009.00658.x. PMID: 20370761' },
  { num: 3, text: 'SUPERSEDED \u2014 Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143. doi:10.1097/CCM.0000000000005337. PMID: 34605781. Superseded by reference 20 (Surviving Sepsis Campaign 2026).' },
  { num: 4, text: 'SUPERSEDED \u2014 Amsterdam EA, Wenger NK, Brindis RG, et al. 2014 AHA/ACC Guideline for the Management of Patients With Non-ST-Elevation Acute Coronary Syndromes. Circulation. 2014;130(25):e344-e426. doi:10.1161/CIR.0000000000000134. PMID: 25249585. Superseded by reference 13 (2025 ACC/AHA/ACEP/NAEMSP/SCAI ACS guideline).' },
  { num: 5, text: 'Prabhakaran S, Gonzalez NR, Zachrison KS, et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke: A Guideline From the American Heart Association/American Stroke Association. Stroke. 2026;57(8):e316-e436. Published online January 26, 2026. doi:10.1161/STR.0000000000000513. PMID: 41582814' },
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
  { num: 18, text: 'Gunaga S, Carpenter CR, Kennedy M, et al. A Model for Developing Subspecialty Clinical Practice Guidelines: The Geriatric Emergency Department Guidelines 2.0. J Am Coll Emerg Physicians Open. 2025;6(6):100247. doi:10.1016/j.acepjo.2025.100247. PMID: 41019914. PMCID: PMC12476112 \u2014 current GRADE-based successor framework to reference 10.' },
  { num: 19, text: 'Boyer EW, Shannon M. The serotonin syndrome. N Engl J Med. 2005;352(11):1112-1120. doi:10.1056/NEJMra041867. PMID: 15784664' },
  { num: 20, text: 'Prescott HC, Antonelli M, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026. Crit Care Med. 2026;54(4):725-812. doi:10.1097/CCM.0000000000007075. PMID: 41869847. Co-published in Intensive Care Med. 2026;52(5):863-936, doi:10.1007/s00134-026-08361-1 \u2014 current version; supersedes reference 3.' },
  { num: 21, text: 'Lee S, Khoujah D, Eagles D, Kennedy M, et al. GRADE-Based Clinical Practice Guidelines for Emergency Department Delirium Risk Stratification, Screening, and Brain Imaging in Older Patients With Suspected Delirium. Acad Emerg Med. 2026;33(2):e70167. doi:10.1111/acem.70167. PMID: 41146403 \u2014 Geriatric ED Guidelines 2.0 delirium work group; the ED-specific delirium guideline (reference 6 is the perioperative-setting document).' },
  { num: 22, text: 'Canto JG, Shlipak MG, Rogers WJ, et al. Prevalence, clinical characteristics, and mortality among patients with myocardial infarction presenting without chest pain. JAMA. 2000;283(24):3223-3229. doi:10.1001/jama.283.24.3223. PMID: 10866870 \u2014 National Registry of Myocardial Infarction; primary source for the ~1-in-3 painless-MI figure.' },
  { num: 23, text: 'Canto JG, Rogers WJ, Goldberg RJ, et al. Association of age and sex with myocardial infarction symptom presentation and in-hospital mortality. JAMA. 2012;307(8):813-822. doi:10.1001/jama.2012.199. PMID: 22357832 \u2014 age-stratified NRMI analysis; source for the >85-year-old chest-pain-absent proportion.' },
  { num: 24, text: 'Capsoni N, Carpani G, Tarantino F, et al. Incidence and risk factors for delayed intracranial hemorrhage after mild brain injury in anticoagulated patients: a multicenter retrospective study. Scand J Trauma Resusc Emerg Med. 2025;33(1):26. doi:10.1186/s13049-025-01337-y. PMID: 39930444' },
  { num: 25, text: 'Puzio TJ, Murphy PB, Kregel HR, et al. Delayed Intracranial Hemorrhage after Blunt Head Trauma while on Direct Oral Anticoagulant: Systematic Review and Meta-Analysis. J Am Coll Surg. 2021;232(6):1007-1016.e5. doi:10.1016/j.jamcollsurg.2021.02.016. PMID: 33766725' },
  { num: 26, text: 'Chen F, Liu L, Wang Y, et al. Delirium prevalence in geriatric emergency department patients: A systematic review and meta-analysis. Am J Emerg Med. 2022;59:121-128. doi:10.1016/j.ajem.2022.05.058. PMID: 35841845 \u2014 30 studies, 19,534 patients; pooled prevalence 15.2% (95% CI 12.5-18.0%).' },
  { num: 27, text: 'Shehab N, Lovegrove MC, Geller AI, et al. US Emergency Department Visits for Outpatient Adverse Drug Events, 2013-2014. JAMA. 2016;316(20):2115-2125. doi:10.1001/jama.2016.16201. PMID: 27893129 \u2014 NEISS-CADES national surveillance; source for the age-65+ adverse-drug-event proportions.' },
  { num: 28, text: 'Nicolle LE, Gupta K, Bradley SF, et al. Clinical Practice Guideline for the Management of Asymptomatic Bacteriuria: 2019 Update by the Infectious Diseases Society of America. Clin Infect Dis. 2019;68(10):e83-e110. doi:10.1093/cid/ciy1121. PMID: 30895288' },
  { num: 29, text: 'American College of Emergency Physicians Clinical Policies Subcommittee. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Out-of-Hospital or Emergency Department Patients Presenting With Severe Agitation. Ann Emerg Med. 2024;83(1):e1-e30. doi:10.1016/j.annemergmed.2023.09.010. PMID: 38105109 \u2014 Board-approved October 6, 2023. Note the stated population exclusions: pediatric patients, age >65, pregnancy, and out-of-hospital-only settings.' },
];

export const NONSPECIFIC_UNWELL_ELDERLY_HUB_NODE_COUNT = NONSPECIFIC_UNWELL_ELDERLY_HUB_NODES.length;
export const NONSPECIFIC_UNWELL_ELDERLY_HUB_MODULE_LABELS = [
  'Sick Check',
  'Source Hunt',
  'Initial Bundle',
  'Imaging',
  'Disposition',
];
