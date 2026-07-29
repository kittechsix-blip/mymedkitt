// MedKitt - Generalized Weakness Hub
//
// EVIDENTIARY BASIS DISCLOSURE (FDA 21st Century Cures Act CDS exemption, Prong 4):
// Every recommendation node in this hub carries a citation array resolving to the
// GENERALIZED_WEAKNESS_HUB_CITATIONS export below. Each reference there carries a
// DOI, PMID, ISBN, or resolvable URL so a clinician can independently retrieve and
// review the basis for the recommendation. This hub is a triage/routing layer: the
// dose- and threshold-level basis for each lane lives in the linked consult tree.
//
// Prong-4 audit 2026-07-28 (Louis Litt): ref 2 author attribution corrected
// (was misattributed to Narayanaswami P, the myasthenia-gravis guideline author;
// actual authors Larson ST, Wilbur J); ref 4 page range and PMID resolved from
// "[in press]"; ref 6 edition/year corrected to the edition matching its editor
// roster; refs 3, 7, 9 marked SUPERSEDED with current versions added; DOIs/PMIDs
// added to refs 2, 4, 5, 7, 8, 9, 10, 11; refs 12-19 added so that neuromuscular
// respiratory thresholds, hyperkalemia, hyponatremia, adrenal crisis, and the
// ED-specific weakness literature are cited by the sources that actually
// establish them rather than by a tertiary blog reference.
//
// Medical evidence audit 2026-07-29 (Dr. Kitlowski), first full audit of this hub.
// All 19 pre-existing citations verified against PubMed (journal/year/volume/issue/
// pages/DOI/PMID all correct); all 28 pre-existing #/tree/ link targets verified to
// resolve in src/services/tree-service.ts. Corrections applied:
//   - gw-electrolyte had NO link to the existing potassium consult despite
//     hyperkalemia being DO-NOT-MISS #2. Added, plus rhabdomyolysis.
//   - Added the explicit statement that a normal ECG does NOT exclude
//     life-threatening hyperkalemia (gw-start, gw-exclusions, gw-electrolyte),
//     sourced to refs 20 and 14. NOTE: ref 21 (Durfey WJEM 2017) is widely
//     mis-cited for this claim; it actually supports ECG RISK STRATIFICATION.
//     See the scope note on ref 21.
//   - Added the elderly nonspecific-complaint / functional-decline branch
//     (nonspecific-unwell-elderly-hub, proximal-weakness-hub), refs 24, 25.
//   - Added posterior-circulation/basilar screening cues and the cord-compression
//     lane (cauda-equina, transverse-myelitis, oncological-emergencies), ref 13.
//   - Added the GBS normal-LP caveat (albuminocytologic dissociation is
//     time-dependent), refs 22, 23, 27.
//   - Added thyrotoxic periodic paralysis recognition, ref 26.
//   - Added the atypical-MI-without-chest-pain statistic, ref 28.
//   - Added the IDSA asymptomatic-bacteriuria anchoring caveat to gw-rescue,
//     ref 29, and routed previously unlinked existing trees (hypoglycemia,
//     hypothermia, gi-bleed-hub, beta-blocker-od, digoxin-toxicity,
//     unknown-ingestion-hub, cervical-artery-dissection, dizziness-hub,
//     syncope, altered-mental-status-hub).
//   - Refs 20-29 added; ref 8 annotated as updated by ref 22.
// All edits are additive context, routing, and citation repair. No dose,
// titration target, or do/don't directive in this hub was altered.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const GENERALIZED_WEAKNESS_HUB_CRITICAL_ACTIONS = [
  { text: 'Glucose, ECG, potassium, and vital-sign trajectory come before broad weakness labs', nodeId: 'gw-start' },
  { text: 'True weakness needs localization: CNS, cord/root, NMJ, muscle, metabolic, or shock', nodeId: 'gw-exclusions' },
  { text: 'Do not discharge inability to walk, bulbar symptoms, respiratory weakness, or persistent unexplained weakness', nodeId: 'gw-dispo-admit' },
];

export const GENERALIZED_WEAKNESS_HUB_NODES: DecisionNode[] = [
  {
    id: 'gw-start',
    type: 'info',
    module: 1,
    title: 'Weakness Hub - Sick Check First',
    body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Neuromuscular respiratory failure (GBS, myasthenic crisis, botulism)** \u2014 single-breath count, NIF/FVC.\n2. **Hyperkalemia / severe electrolyte derangement** \u2014 ECG now, but a **normal ECG does not exclude life-threatening hyperkalemia**. Send the potassium regardless.\n3. **Acute coronary syndrome / occult sepsis** \u2014 weakness as an atypical presentation in elderly/diabetic.\n4. **Stroke / cord compression** \u2014 localize: asymmetry, sensory level, bowel/bladder.\n5. **Adrenal crisis / profound [hypoglycemia](#/tree/hypoglycemia) / tox (beta-blocker, CCB, digoxin)** \u2014 glucose, cortisol context, med review.\n\nOpen first:\n- [Hub Steps Summary](#/info/gw-steps)\n- [Hub Stop / Pitfalls](#/info/gw-stop)\n\n**First 60 seconds:**\n- Is this true motor weakness, fatigue, dizziness, pain-limited movement, or altered mental status?\n- Airway/breathing: voice strength, single breath count if neuromuscular concern, work of breathing, aspiration risk.\n- Vitals trend: fever, hypotension, tachy/brady, hypoxia, hypothermia/hyperthermia.\n- Fingerstick glucose now.\n- ECG early: hyperkalemia/hypokalemia, ischemia, dysrhythmia, QRS/QTc toxicity.\n- Quick neuro localization: face/arm/leg asymmetry, speech, gaze, pupils, reflexes, gait if safe.\n- Medication/toxin scan: sedatives, beta-blocker/CCB, insulin/sulfonylurea, statin, diuretic, lithium, alcohol/withdrawal.\n\n**Sort the complaint before you sort the differential:**\n- **True motor weakness** (measurable power loss) \u2192 localize with the exclusions below.\n- **Proximal-predominant pattern** (trouble rising from a chair, arms overhead, waddling gait) \u2192 [Proximal Weakness Hub](#/tree/proximal-weakness-hub).\n- **"Not acting right," functional decline, off legs, generally unwell** \u2014 especially age >65 \u2192 [Generally Unwell Elderly Hub](#/tree/nonspecific-unwell-elderly-hub). This is the highest-miss branch: nonspecific complaints in older ED patients carry acute morbidity in the majority, and the underlying diagnosis is far more often sepsis, ACS, occult infection, drug effect, or metabolic derangement than a primary neuromuscular disease.\n\nGeneralized weakness is a trap complaint. Stabilize physiology and localize before labeling it benign.',
    citation: [1, 2, 3, 12, 13, 14, 16, 20, 24, 25],
    next: 'gw-exclusions',
    summary: 'Glucose, ECG, vitals, airway/respiratory strength, meds/tox, and localization first.',
    safetyLevel: 'critical',
  },
  {
    id: 'gw-exclusions',
    type: 'question',
    module: 2,
    title: 'Time-Critical Exclusions - Pick the Best Fit',
    body: 'Pick the first dangerous lane. You can return after the immediate action.',
    options: [
      { label: 'Hypotension, fever, rigors, dehydration, poor perfusion, lactate concern', description: 'Shock / sepsis / severe volume problem', next: 'gw-shock', urgency: 'critical' },
      { label: 'Face/arm/leg asymmetry, aphasia, gaze, neglect, acute gait change - OR diplopia, dysarthria, vertigo, crossed/bilateral findings, fluctuating consciousness', description: 'Stroke/ICH mimic, true neurovascular weakness, or posterior-circulation/basilar syndrome', next: 'gw-neurovascular', urgency: 'critical' },
      { label: 'Ascending weakness, areflexia, bulbar symptoms, weak cough, dyspnea', description: 'GBS / myasthenic crisis / neuromuscular respiratory risk', next: 'gw-neuromuscular', urgency: 'critical' },
      { label: 'Paralysis, cramps, diuretic/renal/dialysis risk, any ECG change - or a normal ECG with those risks', description: 'K/Na/Ca/Mg/Phos derangement', next: 'gw-electrolyte', urgency: 'critical' },
      { label: 'Kussmaul, dehydration, thyroid/adrenal clues, hypothermia, hyperthermia', description: 'DKA/HHS, thyroid, adrenal, heat/cold illness', next: 'gw-endocrine', urgency: 'urgent' },
      { label: 'Chest discomfort, dyspnea, syncope, palpitations, pallor, melena', description: 'ACS/dysrhythmia/anemia/bleeding presenting as weakness', next: 'gw-cardiac-anemia', urgency: 'critical' },
      { label: 'Sedation, overdose, acidosis, osm gap, CO exposure, medication change', description: 'Toxicologic or medication-induced weakness', next: 'gw-tox', urgency: 'critical' },
      { label: 'No immediate exclusion hit', description: 'Initial weakness bundle and reassess', next: 'gw-rescue' },
    ],
    citation: [1, 2, 3, 4, 5, 6, 12, 13],
    summary: 'Shock, stroke, neuromuscular respiratory risk, electrolytes, endocrine, cardiac/anemia, and tox are the first exclusions.',
    safetyLevel: 'critical',
  },
  {
    id: 'gw-shock',
    type: 'result',
    module: 2,
    title: 'Shock / Sepsis / Volume Problem',
    body: 'Open [Sepsis Management](#/tree/sepsis) when infection physiology is plausible.\n\n**Next 5 minutes:** monitor, IV/IO, glucose, ECG, lactate if ill, cultures if they do not delay antibiotics, crystalloid if hypoperfused, pressor early if persistent hypotension, POCUS heart/lungs/IVC when physiology is unclear.\n\n**Pitfall:** older adults may present with isolated weakness and no fever. Hypotension, tachypnea, confusion, or rigors should move weakness into a resuscitation lane.',
    recommendation: 'Treat physiology first. Weakness with shock is not a benign chief complaint.',
    citation: [1, 7, 19],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'gw-neurovascular',
    type: 'result',
    module: 2,
    title: 'Neurovascular Weakness',
    body: 'Open [Acute Ischemic Stroke](#/tree/stroke), [ICH](#/tree/ich), [Cervical Artery Dissection](#/tree/cervical-artery-dissection), or [Altered Mental Status Hub](#/tree/altered-mental-status-hub) as appropriate.\n\n**Next 5 minutes:** glucose corrected/confirmed, last-known-well, NIHSS-style focused exam, CT/CTA/perfusion per stroke workflow, BP strategy by diagnosis, anticoagulant/reversal history.\n\n**Pitfall:** generalized weakness can hide a focal deficit when the patient is tired, aphasic, neglectful, or unable to walk safely.\n\n**The posterior-circulation trap:** hemispheric stroke almost never presents as *generalized* weakness \u2014 but **basilar occlusion / bilateral pontine infarct can**, and it is the one stroke that legitimately looks like undifferentiated weakness. Suspect it when there is bilateral or quadriparetic weakness, crossed findings (cranial nerve on one side, long tract on the other), diplopia, dysconjugate gaze, dysarthria, dysphagia, vertigo/ataxia, or waxing-and-waning consciousness. NIHSS badly under-scores posterior strokes, and a non-contrast CT is frequently normal. If the story fits, the imaging question is **CTA head/neck**, not CT alone.\n\n**The other non-brain "stroke":** a cord lesion \u2014 compression, [cauda equina](#/tree/cauda-equina), [transverse myelitis](#/tree/transverse-myelitis), or anterior spinal artery infarct \u2014 produces bilateral weakness with a sensory level and bladder/bowel change. Check a sensory level, saddle sensation, rectal tone, and a post-void residual before you accept "generalized weakness."',
    recommendation: 'If the exam localizes, activate the stroke/bleed workflow.',
    citation: [4, 5, 13],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'gw-neuromuscular',
    type: 'result',
    module: 2,
    title: 'GBS / Myasthenia / Neuromuscular Respiratory Risk',
    body: 'Open [Guillain-Barre Syndrome](#/tree/guillain-barre) or [Myasthenia Gravis](#/tree/myasthenia-gravis).\n\n**Next 5 minutes:** assess bulbar symptoms, cough, secretion handling, neck flexion, single breath count or bedside respiratory mechanics if available, cardiac monitoring for dysautonomia, avoid premature discharge even if pulse ox is normal.\n\n**Danger signs:** rapidly progressive weakness, inability to walk, facial/bulbar weakness, autonomic instability, weak cough, rising CO2, or fatigue with repeated exam.\n\n**Differential for progressive weakness (each competitor breaks one GBS pillar \u2014 ascending, symmetric, areflexic, sensation spared):**\n- **[Transverse myelitis](#/tree/transverse-myelitis)** \u2014 fever, faster onset, early bladder/bowel dysfunction, a sensory level. *Clear it:* map a sensory level, screen for retention; MRI cord confirms.\n- **[Cauda equina](#/tree/cauda-equina) / cord compression** \u2014 back pain at a level, saddle anesthesia, retention, often asymmetric. *Clear it:* rectal tone, saddle sensation, post-void residual. In a known-cancer patient, think metastatic cord compression ([Oncological Emergencies](#/tree/oncological-emergencies)).\n- **[Myasthenia gravis](#/tree/myasthenia-gravis)** \u2014 insidious, ocular/bulbar onset, fatigable; **reflexes preserved**. *Clear it:* sustained upgaze/fatigability, ice-pack test. Intact reflexes is the key separator.\n- **[Botulism](#/tree/botulism)** \u2014 **descending** weakness, early bulbar palsy, dilated/poorly reactive pupils. *Clear it:* direction of progression + pupil exam; source hx (canned food, wound, infant honey).\n- **[Tick paralysis](#/tree/tick-paralysis)** \u2014 ascending and areflexic too (a true mimic), but CSF is normal. *Clear it:* full skin/scalp/hairline exam to find and remove the tick \u2014 removal reverses it.\n- **[Lambert-Eaton (LEMS)](#/tree/lambert-eaton)** \u2014 proximal weakness that **improves with use**, dry mouth, paraneoplastic. *Clear it:* facilitation history, reflexes augment post-exercise; hunt for small cell lung cancer.\n- **Vascular (cord infarct / brainstem stroke)** \u2014 usually painful, asymmetric, UMN signs, crossed/cranial-nerve findings, +/- absent pulses. *Clear it:* hyperreflexia, Babinski, CN crossing; MRI confirms.\n- **[B12 deficiency](#/tree/b12-deficiency) / neuropathy / B1 deficiency** \u2014 prominent **sensory** deficits, dorsal-column signs (proprioception/vibration loss), brisk reflexes if SCD; GBS sensation is often near-normal. *Clear it:* sensory level, B12/folate labs.\n\n**A normal LP does not exclude GBS.** Albuminocytologic dissociation (raised CSF protein with a normal cell count) is time-dependent, not present at onset. In the 1,231-patient IGOS cohort it was present in only 57% when the LP was done within 4 days of weakness onset, rising to 84% after day 4; protein is normal in roughly 30-50% of patients during the first week. Early in the course the LP is mainly there to *exclude* the mimics (leptomeningeal malignancy, infection, cord/root inflammation) \u2014 marked pleocytosis (>50 cells/uL) argues against GBS. GBS remains a clinical diagnosis made on serial exams; do not let a reassuring CSF protein send a progressively weak patient home.\n\n**Two cheap moves that prevent the embarrassing misses:** actually look for a tick, and check the [potassium](#/tree/potassium).',
    recommendation: 'Normal SpO2 does not clear neuromuscular respiratory failure. Trend ventilation and bulbar safety.',
    citation: [8, 9, 12, 13, 16, 17, 22, 23, 27],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },
  {
    id: 'gw-electrolyte',
    type: 'result',
    module: 2,
    title: 'Electrolyte Paralysis / Weakness',
    body: 'Open [Potassium Disorders](#/tree/potassium), [Sodium Disorders](#/tree/sodium), [Calcium Disorders](#/tree/calcium-disorders), [Phosphorous Disorders](#/tree/phosphorus-disorders), or [Magnesium Disorders](#/tree/magnesium-disorders).\n\n**Next 5 minutes:** ECG first, BMP/Mg/Phos/Ca, renal function, CK if [rhabdomyolysis](#/tree/rhabdomyolysis) concern. Treat unstable ECG hyperkalemia immediately with calcium. Severe symptomatic hyponatremia with seizure/coma follows hypertonic saline pathway. Severe hypoK/hypoPhos/hypoMg can present as profound weakness or respiratory failure.\n\n**Pitfall:** do not wait for the full lab panel when ECG shows dangerous potassium physiology.\n\n**\u26A0\uFE0F The bigger pitfall - a normal ECG does not exclude life-threatening hyperkalemia.** The ECG is *insensitive* for the diagnosis: in the classic 90-patient review of admitted patients with K+ >=6.0, the ECG performed poorly and no diagnostic T-wave threshold could be established. Patients have arrested with unremarkable tracings, and the KDIGO emergency-medicine consensus states plainly that a normal ECG should not be regarded as reassuring. The ECG earns its place as a **risk-stratification and treat-now trigger** - QRS prolongation, bradycardia <50, and junctional rhythm mark the patients heading for a short-term adverse event - **not as a rule-out test**. In a dialysis miss, an AKI, a crush injury, or a patient on an ACE inhibitor/ARB/spironolactone/trimethoprim, send the potassium and act on the number, not on a clean strip.\n\n**Two paralysis syndromes that hide behind a potassium value:**\n- **Thyrotoxic periodic paralysis** - acute painless proximal or near-total flaccid paralysis with profound hypokalemia, sensation/bowel/bladder intact, classically a young Asian or Hispanic male after a carbohydrate load, heavy exertion, or alcohol. Total body potassium is **normal**; the potassium has shifted intracellularly, so this is a shift problem, not a deficit. Check a TSH/free T4 on any unexplained hypokalemic paralysis and open [Thyroid Disorders](#/tree/thyroid) alongside [Potassium Disorders](#/tree/potassium). Repletion here carries a rebound-hyperkalemia risk as the shift reverses - follow the dosing and monitoring in the potassium consult rather than reflexively loading potassium.\n- **Hypercalcemia and hypermagnesemia** - both blunt neuromuscular transmission and present as weakness, areflexia, and lethargy rather than as an electrolyte complaint. Hypermagnesemia is nearly always iatrogenic (eclampsia infusions, Mg-containing cathartics/antacids in renal failure).',
    recommendation: 'ECG-dangerous electrolyte disorders are treated before complete diagnostic certainty.',
    citation: [1, 2, 14, 15, 20, 21, 26],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },
  {
    id: 'gw-endocrine',
    type: 'result',
    module: 2,
    title: 'Endocrine / Metabolic Weakness',
    body: 'Open [DKA](#/tree/dka), [Adrenal Insufficiency](#/tree/adrenal-insufficiency), [Thyroid Disorders](#/tree/thyroid), [Hypoglycemia](#/tree/hypoglycemia), [Heat Stroke](#/tree/heat-stroke), or [Hypothermia](#/tree/hypothermia) when the phenotype fits.\n\n**Next 5 minutes:** VBG/chemistry/ketones for DKA/HHS, potassium before insulin, temperature, TSH/free T4 if thyroid storm/myxedema clues, empiric hydrocortisone if adrenal crisis is plausible with shock/hypoglycemia/hyponatremia.\n\n**Pitfall:** fatigue plus hypotension/hypoglycemia/hyponatremia after steroid exposure or adrenal disease is adrenal crisis until proven otherwise. Do not delay the glucocorticoid to confirm the diagnosis - a short course of parenteral steroid is safe even if adrenal insufficiency is later excluded, and the confirmatory cortisol can be drawn on the way.\n\n**Three thyroid phenotypes that read as weakness:**\n- **Myxedema coma** - hypothermia, bradycardia, hypoventilation with hypercapnia, hyponatremia, non-pitting edema, blunted affect. The hypothermia often masks the infection that precipitated it.\n- **Thyroid storm / apathetic thyrotoxicosis** - the elderly version is not agitated and hyperkinetic; it is apathetic, weak, wasted, and in atrial fibrillation.\n- **Thyrotoxic periodic paralysis** - painless hypokalemic flaccid paralysis; see the [Electrolyte lane](#/node/gw-electrolyte).\n\n**Steroid-related weakness that is not a crisis:** chronic glucocorticoid exposure produces a painless proximal myopathy with a normal CK - see [Proximal Weakness Hub](#/tree/proximal-weakness-hub).',
    recommendation: 'Correct the life-threatening physiology while the endocrine workup runs.',
    citation: [10, 18],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },
  {
    id: 'gw-cardiac-anemia',
    type: 'result',
    module: 2,
    title: 'Cardiac / Dysrhythmia / Anemia / Bleeding',
    body: 'Open [Chest Pain Hub](#/tree/chest-pain-hub), [STEMI](#/tree/stemi), [NSTEMI](#/tree/nstemi), [A-Fib RVR](#/tree/afib-rvr), or [GI Bleed Hub](#/tree/gi-bleed-hub) when symptoms, ECG, or bleeding history point that way.\n\n**Next 5 minutes:** ECG, troponin if ischemia possible, orthostatics if safe, CBC, rectal/bleeding history when anemia/GI bleed plausible, POCUS when shock or dyspnea coexists.\n\n**Pitfall:** MI, dysrhythmia, GI bleed, and severe anemia often present as weakness in older adults, diabetics, and patients with limited symptom reporting. In the >434,000-patient National Registry of Myocardial Infarction, about **one third of confirmed MIs presented without chest pain** - and those patients skewed older, female, and diabetic, presented later, were treated less aggressively, and died at roughly twice the in-hospital rate. Weakness, dyspnea, and fatigue are among the substitute presentations. A single normal ECG does not close the question when the story is right.',
    recommendation: 'Weakness with ECG change, syncope, dyspnea, pallor, or bleeding history needs cardiac/bleeding workup.',
    citation: [1, 11, 13, 25, 28],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },
  {
    id: 'gw-tox',
    type: 'result',
    module: 2,
    title: 'Toxicologic / Medication Weakness',
    body: 'Open [TCA Toxidrome](#/tree/tca-toxidrome), [Calcium Channel Blocker Overdose](#/tree/ccb-od), [Beta-Blocker Overdose](#/tree/beta-blocker-od), [Digoxin Toxicity](#/tree/digoxin-toxicity), [Salicylate Toxicity](#/tree/salicylate), [Toxic Alcohols](#/tree/toxic-alcohols), [CO Toxicity](#/tree/co-toxicity), or the [Unknown Ingestion Hub](#/tree/unknown-ingestion-hub) when clues fit.\n\n**Next 5 minutes:** ECG for QRS/QTc/bradycardia, glucose, VBG/anion gap/osm gap, acetaminophen/salicylate levels when ingestion possible, co-oximetry if exposure risk, medication reconciliation, poison center early.\n\n**Pitfall:** urine drug screen rarely explains weakness. ECG, glucose, acid-base, and medication list change care faster.\n\n**The medication list is the test.** In older adults the commonest reversible cause of "generalized weakness" is not an exotic toxidrome, it is the pharmacy: a new or up-titrated beta-blocker or CCB (bradycardia, fatigue), a diuretic or laxative (hypokalemia, volume depletion), an ACE inhibitor/ARB/spironolactone/trimethoprim (hyperkalemia), a sulfonylurea or insulin (recurrent hypoglycemia), a statin (myopathy - check a CK), a benzodiazepine/opioid/anticholinergic (sedation misread as weakness), digoxin in new renal failure, or lithium in volume depletion. Ask what changed in the last two weeks.\n\n**Neuromuscular blockade by drug:** aminoglycosides, high-dose magnesium, and organophosphate/carbamate exposure all produce genuine neuromuscular weakness that can progress to respiratory failure. Organophosphates come with the cholinergic toxidrome (SLUDGE, miosis, fasciculations, bronchorrhea) - the bronchorrhea kills, not the weakness.',
    recommendation: 'Use ECG and acid-base physiology to find dangerous tox causes.',
    citation: [1, 6, 13],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },
  {
    id: 'gw-rescue',
    type: 'info',
    module: 3,
    title: 'Rescue / Initial Bundle + Reassess',
    body: '**Default bundle when no killer has declared itself:**\n- Glucose, ECG, monitor if ill.\n- CBC, CMP (potassium, sodium, calcium, renal function), Mg, Phos, CK when myopathy/rhabdo possible.\n- UA/CXR/cultures only when infection clues exist; do not shotgun without exam signal.\n- Orthostatic vitals and ambulation test when safe.\n- Medication reconciliation, recent illness, tick/travel, exertion, dialysis, insulin/sulfonylurea, diuretics.\n- Focused neuro exam repeated after fluids, glucose correction, analgesia, or rest.\n\n**\u26A0\uFE0F Do not let a positive urine end the workup in an older adult.** Asymptomatic bacteriuria is common with age, and IDSA specifically recommends assessment for other causes and observation - not antibiotics - in older patients with functional or cognitive impairment who have bacteriuria plus confusion or a fall but no localizing genitourinary symptoms and no systemic signs of infection. "UTI" is the single most common anchoring diagnosis that lets an occult sepsis, ACS, bleed, or drug effect walk out of the department. (A bacteriuric patient who is febrile or hemodynamically unstable without a localizing source is a different patient - treat broadly and hunt the source.)\n\n**If the complaint was never true motor weakness,** switch hubs rather than repeating the same panel: [Generally Unwell Elderly Hub](#/tree/nonspecific-unwell-elderly-hub) for functional decline / "not acting right," [Dizziness Hub](#/tree/dizziness-hub) for lightheadedness or vertigo mislabeled as weakness, [Syncope](#/tree/syncope) for transient loss of consciousness, and [Altered Mental Status Hub](#/tree/altered-mental-status-hub) when cognition is the real deficit.\n\n**Reassess in 30-60 minutes:** ability to stand/walk, symmetric strength, reflexes, bulbar/respiratory symptoms, vitals, ECG/lab changes.',
    citation: [1, 2, 3, 12, 13, 24, 25, 29],
    next: 'gw-reassess',
    summary: 'Glucose/ECG/labs, meds, focused neuro, orthostatics/ambulation, then reassess.',
    safetyLevel: 'warning',
  },
  {
    id: 'gw-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess After Initial Bundle',
    body: 'A repeat exam is the key test in vague weakness.',
    options: [
      { label: 'Worse, cannot walk, new focal/bulbar/respiratory finding, abnormal ECG/labs', description: 'Return to time-critical exclusions', next: 'gw-exclusions', urgency: 'critical' },
      { label: 'Improving but not baseline or cause remains unclear', description: 'Use imaging/observation strategy', next: 'gw-imaging' },
      { label: 'Back to baseline with clear benign/reversible cause', description: 'Disposition checklist', next: 'gw-disposition' },
    ],
    citation: [1, 2, 12, 13],
    summary: 'Worsening or inability to walk is not benign weakness.',
  },
  {
    id: 'gw-imaging',
    type: 'info',
    module: 4,
    title: 'Imaging Decision',
    body: '**Image by localization and physiology:**\n- **CT/CTA head/neck:** focal deficit, aphasia, gaze deviation, severe headache, anticoagulated fall, or stroke window question.\n- **MRI brain/spine:** progressive neurologic deficit, myelopathy, cord/root syndrome, suspected demyelination, or persistent unexplained neuro weakness after CT.\n- **CXR:** infection, CHF, hypoxia, dyspnea, or occult pneumonia in older adults.\n- **CT abdomen/pelvis or bedside aorta ultrasound:** abdominal/back pain, hypotension, older vascular-risk patient, suspected AAA/bleed.\n\nDo not image vague weakness reflexively. Image the diagnosis you are willing to act on.',
    citation: [1, 4, 5, 12, 13],
    next: 'gw-disposition',
    summary: 'CT/CTA for focal neuro, MRI for cord/progressive neuro, CXR/CT/US when physiology points there.',
    safetyLevel: 'warning',
  },
  {
    id: 'gw-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Disposition depends on trajectory, ability to walk, cause certainty, and safety.',
    options: [
      { label: 'Persistent true weakness, inability to walk, unstable vitals, dangerous labs/ECG, neuro/respiratory/bulbar signs', description: 'Admit/ICU/specialty pathway', next: 'gw-dispo-admit', urgency: 'critical' },
      { label: 'Improving but not baseline, unclear cause, needs serial exam or repeat labs', description: 'Observe/admit', next: 'gw-dispo-observe' },
      { label: 'Baseline function restored, benign cause clear, safe support', description: 'Discharge checklist', next: 'gw-dispo-discharge' },
    ],
    citation: [1, 2, 12, 13],
    summary: 'Discharge requires baseline function, clear cause, stable vitals, and safe ambulation/support.',
  },
  {
    id: 'gw-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit / ICU / Transfer',
    body: 'Admit/ICU for shock, sepsis, stroke/bleed, ACS/dysrhythmia, dangerous electrolyte/endocrine derangement, progressive weakness, inability to ambulate, respiratory/bulbar weakness, suspected GBS/MG crisis, rhabdomyolysis with renal risk, unsafe environment, or persistent unexplained true weakness.',
    recommendation: 'Persistent true weakness is not a discharge diagnosis until dangerous localization is excluded.',
    citation: [1, 2, 8, 9, 12, 13, 16, 17],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'gw-dispo-observe',
    type: 'result',
    module: 5,
    title: 'Observation / Serial Exam',
    body: 'Observe when symptoms are improving but not baseline, orthostasis/dehydration needs treatment response, electrolytes require repeat checks, postictal/toxic/metabolic effect may recur, or gait/safety cannot be assessed immediately.',
    recommendation: 'Use repeat neuro exam, ambulation, vitals, ECG, and targeted labs before discharge.',
    citation: [1, 2, 12, 13],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'gw-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge Checklist',
    body: 'Discharge only when: back to baseline strength/function, walking safely or baseline mobility restored, vitals stable, glucose/electrolytes/ECG reassuring or corrected, no focal/bulbar/respiratory signs, no concerning medication/tox recurrence, and reliable follow-up/support.\n\n**Return precautions:** worsening weakness, inability to walk, dyspnea, trouble swallowing/speaking, syncope, chest pain, fever, confusion, new numbness, bowel/bladder changes, or recurrent low/high glucose symptoms.',
    recommendation: 'Document repeat exam, ambulation status, and why dangerous causes are unlikely.',
    citation: [1, 2, 12, 13],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
];

export const GENERALIZED_WEAKNESS_HUB_NODE_COUNT = GENERALIZED_WEAKNESS_HUB_NODES.length;

export const GENERALIZED_WEAKNESS_HUB_MODULE_LABELS = [
  'Sick Check',
  'Time-Critical Exclusions',
  'Rescue / Reassess',
  'Imaging',
  'Disposition',
];

export const GENERALIZED_WEAKNESS_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Farkas J, ed. The Internet Book of Critical Care (IBCC). EMCrit Project. Chapters on hyperkalemia, undifferentiated shock, and toxicologic physiology. https://emcrit.org/ibcc/ (accessed 2026-07-28). BASIS DISCLOSURE: expert-authored open tertiary reference, not peer-reviewed primary literature. Peer-reviewed primary sources for each recommendation in this hub are cited separately below (refs 12-19).' },
  { num: 2, text: 'Larson ST, Wilbur J. Muscle Weakness in Adults: Evaluation and Differential Diagnosis. Am Fam Physician. 2020;101(2):95-108. PMID:31939642. https://www.aafp.org/pubs/afp/issues/2020/0115/p95.html' },
  { num: 3, text: 'SUPERSEDED - Saguil A. Evaluation of the Patient with Muscle Weakness. Am Fam Physician. 2005;71(7):1327-1336. PMID:15832536. https://www.aafp.org/pubs/afp/issues/2005/0401/p1327.html Superseded by ref 2 (Larson/Wilbur, AFP 2020); retained for its diagnostic tables, which the 2020 article reproduces.' },
  { num: 4, text: 'Prabhakaran S, Gonzalez NR, Zachrison KS, et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke: A Guideline From the American Heart Association/American Stroke Association. Stroke. 2026;57(8):e316-e436. doi:10.1161/STR.0000000000000513. PMID:41582814' },
  { num: 5, text: 'Greenberg SM, Ziai WC, Cordonnier C, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage: A Guideline From the American Heart Association/American Stroke Association. Stroke. 2022;53(7):e282-e361. doi:10.1161/STR.0000000000000407. PMID:35579034' },
  { num: 6, text: 'Nelson LS, Howland MA, Lewin NA, Smith SW, Goldfrank LR, Hoffman RS, eds. Goldfrank\'s Toxicologic Emergencies. 11th ed. McGraw Hill; 2019. ISBN 9781259859618. (A 12th edition edited by Hoffman RS, Biary R, Gosselin S, Howland MA, Lewin NA, Nelson LS, Smith SW, Goldfrank LR is now published, ISBN 9781266963261; the 11th edition is cited here because its content is the verified basis for the tox recommendations in this hub.)' },
  { num: 7, text: 'SUPERSEDED - Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2021. Intensive Care Med. 2021;47(11):1181-1247. doi:10.1007/s00134-021-06506-y. PMID:34599691. Superseded by ref 19 (Surviving Sepsis Campaign 2026).' },
  { num: 8, text: 'Leonhard SE, Mandarakas MR, Gondim FAA, et al. Diagnosis and management of Guillain-Barre syndrome in ten steps. Nat Rev Neurol. 2019;15(11):671-683. doi:10.1038/s41582-019-0250-9. PMID:31541214. PMCID:PMC6821638. Updated by ref 22 (EAN/PNS 2023); retained for its ten-step diagnostic framework.' },
  { num: 9, text: 'SUPERSEDED - Sanders DB, Wolfe GI, Benatar M, et al. International consensus guidance for management of myasthenia gravis: executive summary. Neurology. 2016;87(4):419-425. doi:10.1212/WNL.0000000000002790. PMID:27358333. Superseded by ref 17 (2020 Update).' },
  { num: 10, text: 'Umpierrez GE, Davis GM, ElSayed NA, et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report. Diabetes Care. 2024;47(8):1257-1275. doi:10.2337/dci24-0032. PMID:39052901. Co-published: Diabetologia. 2024;67(8):1455-1479. PMID:38907161' },
  { num: 11, text: 'Gulati M, Levy PD, Mukherjee D, et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR Guideline for the Evaluation and Diagnosis of Chest Pain. J Am Coll Cardiol. 2021;78(22):e187-e285. doi:10.1016/j.jacc.2021.07.053. PMID:34756653' },
  { num: 12, text: 'Ganti L, Rastogi V. Acute Generalized Weakness. Emerg Med Clin North Am. 2016;34(4):795-809. doi:10.1016/j.emc.2016.06.006. PMID:27741989' },
  { num: 13, text: 'Sams W, Hassan N, Meurer WJ. General Approach to Weakness. Emerg Med Clin North Am. 2026;44(1):219-226. doi:10.1016/j.emc.2025.08.013. PMID:41260854' },
  { num: 14, text: 'Lindner G, Burdmann EA, Clase CM, et al. Acute hyperkalemia in the emergency department: a summary from a Kidney Disease: Improving Global Outcomes conference. Eur J Emerg Med. 2020;27(5):329-337. doi:10.1097/MEJ.0000000000000691. PMID:32852924. PMCID:PMC7448835' },
  { num: 15, text: 'Verbalis JG, Goldsmith SR, Greenberg A, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations. Am J Med. 2013;126(10 Suppl 1):S1-S42. doi:10.1016/j.amjmed.2013.07.006. PMID:24074529' },
  { num: 16, text: 'Lawn ND, Fletcher DD, Henderson RD, Wolter TD, Wijdicks EFM. Anticipating mechanical ventilation in Guillain-Barre syndrome. Arch Neurol. 2001;58(6):893-898. doi:10.1001/archneur.58.6.893. PMID:11405803. Source of the 20/30/40 rule (vital capacity <20 mL/kg, maximal inspiratory pressure <30 cmH2O, maximal expiratory pressure <40 cmH2O). Single-center retrospective cohort (1976-1996); should not be the sole trigger for intubation.' },
  { num: 17, text: 'Narayanaswami P, Sanders DB, Wolfe G, et al. International Consensus Guidance for Management of Myasthenia Gravis: 2020 Update. Neurology. 2021;96(3):114-122. doi:10.1212/WNL.0000000000011124. PMID:33144515' },
  { num: 18, text: 'Bornstein SR, Allolio B, Arlt W, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab. 2016;101(2):364-389. doi:10.1210/jc.2015-1710. PMID:26760044. PMCID:PMC4880116' },
  { num: 19, text: 'Prescott HC, Antonelli M, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026. Crit Care Med. 2026;54(4):725-812. doi:10.1097/CCM.0000000000007075. PMID:41869847. Current version; supersedes ref 7.' },
  { num: 20, text: 'Montague BT, Ouellette JR, Buller GK. Retrospective review of the frequency of ECG changes in hyperkalemia. Clin J Am Soc Nephrol. 2008;3(2):324-330. doi:10.2215/CJN.04611007. PMID:18235147. PMCID:PMC2390954. Basis for the statement that the ECG is INSENSITIVE for hyperkalemia: in 90 admitted patients with K+ >=6.0 mEq/L the ECG performed poorly and no diagnostic T-wave threshold could be established. Single-center retrospective review.' },
  { num: 21, text: 'Durfey N, Lehnhof B, Bergeson A, et al. Severe hyperkalemia: can the electrocardiogram risk stratify for short-term adverse events? West J Emerg Med. 2017;18(5):963-971. doi:10.5811/westjem.2017.6.33033. PMID:28874951. PMCID:PMC5576635. SCOPE NOTE: this study supports the ECG as a RISK-STRATIFICATION tool (QRS prolongation, bradycardia <50, and junctional rhythm marked patients heading for a short-term adverse event); it does NOT establish the ECG as a rule-out test, and it is frequently mis-cited as evidence that the ECG is insensitive for hyperkalemia. That insensitivity claim belongs to refs 20 and 14, not to this paper.' },
  { num: 22, text: 'van Doorn PA, Van den Bergh PYK, Hadden RDM, et al. European Academy of Neurology / Peripheral Nerve Society guideline on diagnosis and treatment of Guillain-Barre syndrome. Eur J Neurol. 2023;30(12):3646-3674. doi:10.1111/ene.16073. PMID:37814552. GRADE-based current guideline; updates ref 8.' },
  { num: 23, text: 'Al-Hakem H, Doets AY, Stino AM, et al. CSF findings in relation to clinical characteristics, subtype, and disease course in patients with Guillain-Barre syndrome. Neurology. 2023;100(23):e2386-e2397. doi:10.1212/WNL.0000000000207282. PMID:37643890. PMCID:PMC10256127. Erratum in Neurology. 2023;101(13):592. IGOS cohort, n=1,231: albuminocytologic dissociation present in 57% when the lumbar puncture was performed within 4 days of weakness onset vs 84% after day 4; the authors state that normal protein levels do not exclude the diagnosis.' },
  { num: 24, text: 'Nemec M, Koller MT, Nickel CH, et al. Patients presenting to the emergency department with non-specific complaints: the Basel Non-specific Complaints (BANC) study. Acad Emerg Med. 2010;17(3):284-292. doi:10.1111/j.1553-2712.2009.00658.x. PMID:20370761. Prospective cohort establishing that non-specific complaints (weakness, generally unwell, functional decline) in older ED patients carry a high rate of acute morbidity.' },
  { num: 25, text: 'Herzog SM, Jenny MA, Nickel CH, Nieves Ortega R, Bingisser R. Predicting risk of serious medical conditions in emergency department patients with nonspecific complaints. PLoS One. 2020;15(11):e0239902. doi:10.1371/journal.pone.0239902. PMID:33152015. PMCID:PMC7643999' },
  { num: 26, text: 'Correia M, Darocki M, Tovar Hirashima E. Changing management guidelines in thyrotoxic hypokalemic periodic paralysis. J Emerg Med. 2018;55(2):252-256. doi:10.1016/j.jemermed.2018.04.063. PMID:29871829. Basis for the rebound-hyperkalemia caution: potassium is shifted intracellularly rather than depleted, so aggressive repletion risks rebound hyperkalemia as the shift reverses.' },
  { num: 27, text: 'Doets AY, Walgaard C, Lingsma HF, et al. International validation of the Erasmus Guillain-Barre syndrome respiratory insufficiency score. Ann Neurol. 2022;91(4):521-531. doi:10.1002/ana.26312. PMID:35106830. PMCID:PMC9302662' },
  { num: 28, text: 'Canto JG, Shlipak MG, Rogers WJ, et al. Prevalence, clinical characteristics, and mortality among patients with myocardial infarction presenting without chest pain. JAMA. 2000;283(24):3223-3229. doi:10.1001/jama.283.24.3223. PMID:10866870. National Registry of Myocardial Infarction 2: of 434,877 confirmed MIs, one third presented without chest pain; those patients were older, more often female and diabetic, presented later, were treated less aggressively, and had roughly twice the in-hospital mortality.' },
  { num: 29, text: 'Nicolle LE, Gupta K, Bradley SF, et al. Clinical practice guideline for the management of asymptomatic bacteriuria: 2019 update by the Infectious Diseases Society of America. Clin Infect Dis. 2019;68(10):e83-e110. doi:10.1093/cid/ciy1121. PMID:30895288. Basis for not reflexively treating bacteriuria in older adults with functional or cognitive impairment who have delirium or a fall but no localizing genitourinary symptoms and no systemic signs of infection: IDSA recommends assessment for other causes and observation rather than antimicrobials.' },
];
