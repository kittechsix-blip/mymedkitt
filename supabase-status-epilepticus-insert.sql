-- =====================================================================
-- MedKitt — Status Epilepticus Consult: Supabase INSERT Statements
-- Generated: 2026-03-11
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'status-epilepticus',
  'Status Epilepticus',
  'BZD → 2nd-Line ASM → RSE Infusions → cEEG',
  '1.0',
  26,
  'se-start',
  '["Recognition & Stabilization","Phase 1: Benzodiazepines","Phase 2: Urgent Control","Refractory SE","Special Populations","Differential & NCSE"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('neurology', 'status-epilepticus', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (11 citations)
DELETE FROM tree_citations WHERE tree_id = 'status-epilepticus';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('status-epilepticus', 1, 'Betjemann JP, Bhatt J, Engel A. Status Epilepticus. Emergency Medicine Practice (EB Medicine). 2025;27(9):1-28.'),
('status-epilepticus', 2, 'Brophy GM, Bell R, Claassen J, et al. Guidelines for the Evaluation and Management of Status Epilepticus. Neurocrit Care. 2012;17(1):3-23.'),
('status-epilepticus', 3, 'Glauser T, Shinnar S, Gloss D, et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults. Epilepsy Curr. 2016;16(1):48-61.'),
('status-epilepticus', 4, 'Kapur J, Elm J, Chamberlain JM, et al. Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus (ESETT). N Engl J Med. 2019;381(22):2103-2113.'),
('status-epilepticus', 5, 'Silbergleit R, Durkalski V, Lowenstein D, et al. Intramuscular versus Intravenous Therapy for Prehospital Status Epilepticus (RAMPART). N Engl J Med. 2012;366(7):591-600.'),
('status-epilepticus', 6, 'Dalziel SR, et al. Levetiracetam versus Phenytoin for Second-Line Treatment of Convulsive Status Epilepticus in Children (EcLiPSE/ConSEPT). Lancet. 2019;393(10186):2125-2134.'),
('status-epilepticus', 7, 'Yasiry Z, Shorvon SD. The Relative Effectiveness of Five Antiepileptic Drugs in Treatment of Benzodiazepine-Resistant Convulsive Status Epilepticus: A Meta-Analysis. Epilepsia. 2014;55(9):1349-1361.'),
('status-epilepticus', 8, 'Claassen J, Hirsch LJ, Emerson RG, Mayer SA. Treatment of Refractory Status Epilepticus with Pentobarbital, Propofol, or Midazolam: A Systematic Review. Epilepsia. 2002;43(2):146-153.'),
('status-epilepticus', 9, 'Swor DE, et al. Management of Status Epilepticus in Pregnancy: A Survey of Neurologists and Neurointensivists. Neurocrit Care. 2024.'),
('status-epilepticus', 10, 'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.'),
('status-epilepticus', 11, 'Trinka E, Cock H, Hesdorffer D, et al. A Definition and Classification of Status Epilepticus — Report of the ILAE Task Force on Classification of Status Epilepticus. Epilepsia. 2015;56(10):1515-1523.');

DELETE FROM decision_nodes WHERE tree_id = 'status-epilepticus';

-- 4. decision_nodes (26 nodes)

-- MODULE 1: RECOGNITION & STABILIZATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-start', 'status-epilepticus', 'info', 1,
 'Status Epilepticus',
 '[SE Steps Summary](#/info/se-summary) — time-critical escalating treatment pathway.

**Status epilepticus (SE)** is defined as a seizure lasting >5 minutes or recurrent seizures without recovery between episodes.

SE that persists despite first-line and second-line treatments often necessitates intubation and anesthetic infusions. Underrecognition and delays in treatment increase morbidity and mortality.

**Key principle:** Benzodiazepines become less effective the longer SE persists — GABAA receptors are internalized from the cell surface during prolonged seizure activity. Early, adequate-dose treatment is critical.

**Up to 30% morbidity and mortality** in adults. Etiology drives ~80% of SE-related mortality.',
 '[1,2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-is-this-se', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-is-this-se', 'status-epilepticus', 'question', 1,
 'Is This Status Epilepticus?',
 '**Convulsive SE:** Generalized tonic-clonic activity >5 min, or recurrent seizures without recovery of consciousness between episodes.

**Subtle / late SE:** After prolonged generalized seizure, motor activity may diminish — look for subtle signs: facial twitching, nystagmus, eye deviation.

**Key history:** Duration of seizure activity, witnessed motor features, prior seizure history, current medications, recent drug/alcohol use, trauma, pregnancy status.

Physical exam: lateral tongue lacerations suggest seizure over syncope. Check for meningeal signs, focal neurologic deficits, signs of trauma.',
 '[1,2]'::jsonb, '[{"label":"Yes — Active seizure >5 min or recurrent","description":"Convulsive SE confirmed or highly suspected","next":"se-abcs","urgency":"critical"},{"label":"Altered consciousness, not convulsing","description":"Possible NCSE — subtle signs, postictal, or unexplained AMS","next":"se-ncse","urgency":"urgent"},{"label":"Likely not SE — consider differential","description":"Syncope, PNES, movement disorder, or other mimic","next":"se-differential"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-abcs', 'status-epilepticus', 'info', 1,
 'ABCs & Initial Stabilization',
 '**Airway:** Position in left lateral decubitus if actively seizing. Suction available. Nasopharyngeal airway if needed — do NOT use bite block or oral airway (risk of obstruction and provider injury). Do NOT attempt intubation during active tonic-clonic seizure unless airway compromise.

**Breathing:** High-flow O2 via non-rebreather. Monitor SpO2 continuously. Respiratory failure can occur from seizure itself or from benzodiazepines.

**Circulation:** Cardiac monitor, IV access × 2. Vital signs including temperature.

**Protect from injury** — pad side rails, remove hazards. Do NOT restrain.

**Start the clock** — time from seizure onset drives treatment decisions.',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-glucose-labs', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-glucose-labs', 'status-epilepticus', 'info', 1,
 'Glucose & Diagnostic Workup',
 '**Fingerstick glucose STAT** — hypoglycemia is a common, easily reversible seizure trigger.
• If glucose <60 mg/dL: D50W 25 g IV (adults) or D10W 2-5 mL/kg (peds)

[SE Diagnostic Workup](#/info/se-labs) — complete lab panel and imaging guide.

**Priority labs:** BMP (Na, Ca, Mg, Phos), CBC, lactate, VBG, urine drug screen, serum tox, ASM levels (if on therapy), troponin, CK, pregnancy test.

**Imaging:** CT head non-contrast after stabilization — evaluate for structural cause. MRI when stable.

**EEG:** Order early if available — 48% of patients with altered consciousness post-SE have ongoing NCSE on EEG.

**Lumbar puncture:** If signs of meningitis, fever with no clear source, or immunocompromised.',
 '[1,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-iv-access', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-iv-access', 'status-epilepticus', 'question', 1,
 'IV Access Available?',
 'Route of administration determines first-line benzodiazepine choice.

**IV access preferred** but should NOT delay treatment. If IV is not immediately available, give IM midazolam — the RAMPART trial showed IM midazolam is non-inferior to IV lorazepam and faster to administer.

Underdosing of benzodiazepines leads to poor response and increased likelihood of refractory SE.',
 '[1,5]'::jsonb, '[{"label":"Yes — IV established","description":"IV lorazepam is preferred first-line","next":"se-iv-bzd","urgency":"critical"},{"label":"No — IM/IN/PR route","description":"IM midazolam is first-line when no IV access","next":"se-no-iv-bzd","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4)
;


-- MODULE 2: PHASE 1: BENZODIAZEPINES
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-iv-bzd', 'status-epilepticus', 'info', 2,
 'IV Lorazepam (First-Line)',
 '[Lorazepam](#/drug/lorazepam/status epilepticus) 0.1 mg/kg IV (max 4 mg/dose), push over 2 min.

**May repeat once** in 5-10 minutes if seizure persists. Total max: 8 mg.

**Alternative if lorazepam unavailable:**
• [Diazepam](#/drug/diazepam/status epilepticus iv) 0.15-0.2 mg/kg IV (max 10 mg), repeat once

Lorazepam is preferred over diazepam — higher seizure termination rate (65% vs 56%) and longer duration of action.

**Monitor for respiratory depression** — have bag-valve mask and suction at bedside. Patients who received multiple BZD doses from EMS are at higher risk.',
 '[1,2,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-bzd-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-no-iv-bzd', 'status-epilepticus', 'info', 2,
 'IM Midazolam (No IV Access)',
 '[Midazolam](#/drug/midazolam/status epilepticus im) 0.2 mg/kg IM (max 10 mg) into deltoid or vastus lateralis.

**RAMPART trial:** IM midazolam terminated seizures in 73% vs 63% for IV lorazepam (p<.001). Faster time to treatment offset the slightly slower IM onset.

**Weight-based dosing:**
• ≥40 kg: 10 mg IM
• 13-40 kg: 5 mg IM

**Alternative routes:**
• Intranasal midazolam: 0.2 mg/kg via mucosal atomizer (less effective than IM per Guterman et al)
• [Diazepam](#/drug/diazepam/status epilepticus rectal) 0.2-0.5 mg/kg PR (max 20 mg) — no longer recommended as first-line

**Continue attempting IV access** — will be needed for 2nd-line agents if BZD fails.',
 '[1,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-bzd-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-bzd-response', 'status-epilepticus', 'question', 2,
 'Seizure Response to Benzodiazepine?',
 'Assess **5 minutes** after BZD administration. Up to 2 doses of first-line BZD may be given.

If second dose given, reassess after 5 additional minutes.

**Seizure terminated** = cessation of all motor activity AND progressive improvement in consciousness. Subtle motor signs (facial twitching, nystagmus) may indicate ongoing SE.',
 '[1,2]'::jsonb, '[{"label":"Seizure terminated","description":"Motor activity stopped, consciousness improving","next":"se-bzd-success"},{"label":"Still seizing after adequate BZD","description":"Benzodiazepine-refractory — proceed to 2nd line","next":"se-special-pop","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-bzd-success', 'status-epilepticus', 'result', 2,
 'Seizure Terminated After Benzodiazepine',
 'Seizure terminated with first-line benzodiazepine therapy.

**Post-seizure management:**
• Monitor for recurrence — recurrence risk is significant
• Complete diagnostic workup (labs, imaging, EEG if available)
• Determine etiology — drives 80% of outcome
• Consider ASM loading for seizure prophylaxis if first unprovoked seizure with high recurrence risk, known epilepsy with subtherapeutic levels, or structural lesion identified
• [Levetiracetam](#/drug/levetiracetam/status epilepticus) 20-60 mg/kg IV (max 4500 mg) is preferred for ASM loading

**If patient does not return to baseline within 30-60 min**, consider ongoing NCSE — obtain urgent EEG.',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Seizure terminated with BZD. Monitor for recurrence, complete etiology workup. Load maintenance ASM if indicated. If no return to baseline within 30-60 min, obtain EEG to rule out NCSE.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 8)
;


-- MODULE 3: PHASE 2: URGENT CONTROL
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-special-pop', 'status-epilepticus', 'question', 3,
 'Special Population?',
 'Before selecting 2nd-line antiseizure medication, identify if the patient belongs to a special population that changes management.

If none apply, proceed directly to standard 2nd-line ASM selection.',
 '[1]'::jsonb, '[{"label":"Pregnant / suspected eclampsia","description":"Magnesium sulfate first; avoid teratogenic agents","next":"se-pregnancy","urgency":"critical"},{"label":"Known/suspected toxic ingestion","description":"INH → pyridoxine; phenytoin often ineffective","next":"se-substance","urgency":"critical"},{"label":"Pediatric considerations","description":"Same agents, weight-based dosing, consider pyridoxine-dependent epilepsy","next":"se-peds","urgency":"urgent"},{"label":"Standard adult — no special population","description":"Proceed to 2nd-line ASM selection","next":"se-2nd-line-choice","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-2nd-line-choice', 'status-epilepticus', 'question', 3,
 'Second-Line ASM Selection',
 'BZD-refractory convulsive SE. Administer within **5-10 minutes** of BZD failure.

**ESETT trial (2019):** Levetiracetam, fosphenytoin, and valproate had **equivalent efficacy** (~47% seizure cessation at 60 min). No significant difference in adverse events between the three agents.

Choice should be tailored to patient''s comorbidities and contraindications.

[2nd-Line ASM Comparison](#/info/se-asm-comparison) — side-by-side efficacy, contraindications, and side effects.',
 '[1,2,6]'::jsonb, '[{"label":"Levetiracetam (Keppra)","description":"Fewest drug interactions. Safe in hepatic/renal disease. Safe in pregnancy.","next":"se-levetiracetam"},{"label":"Valproate (Depacon)","description":"Avoid in pregnancy, liver disease, mitochondrial disorders, thrombocytopenia","next":"se-valproate"},{"label":"Fosphenytoin (Cerebyx)","description":"Avoid if drug/alcohol-induced SE. Cardiac monitoring required.","next":"se-fosphenytoin"},{"label":"Phenobarbital","description":"If above unavailable. Higher sedation and respiratory depression risk.","next":"se-phenobarbital"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-levetiracetam', 'status-epilepticus', 'info', 3,
 'Levetiracetam (Keppra)',
 '[Levetiracetam](#/drug/levetiracetam/status epilepticus) 60 mg/kg IV (max 4500 mg) over 10-15 min.

**ESETT:** 47% seizure termination at 60 min (equivalent to fosphenytoin and valproate).

**Advantages:**
• No cardiac effects — no telemetry requirement during infusion
• No hepatic metabolism — no drug interactions
• Safe in renal impairment (dose adjust if CrCl <50)
• Safe in pregnancy (Category C, low teratogenicity — preferred 2nd line in pregnant patients)
• Minimal drug-drug interactions

**Side effects:** Psychiatric symptoms (irritability, agitation), drowsiness. Use with caution in patients with mood disorders.',
 '[1,6,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-valproate', 'status-epilepticus', 'info', 3,
 'Valproate Sodium (Depacon)',
 '[Valproate](#/drug/valproate/status epilepticus) 40 mg/kg IV (max 3000 mg) over 10 min.

**ESETT:** 46% seizure termination at 60 min.

**Contraindicated in:**
• Pregnancy (teratogenic — neural tube defects, Category X)
• Hepatic disease / liver failure
• Mitochondrial disorders (Alpers syndrome — fatal hepatotoxicity)
• Known or suspected urea cycle disorders
• Pancreatitis

**Cautions:**
• Thrombocytopenia / coagulopathy — check platelets
• May cause hyperammonemia — check ammonia if altered mental status persists after seizure cessation
• Well-tolerated even with larger doses and faster rates of infusion',
 '[1,6,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-fosphenytoin', 'status-epilepticus', 'info', 3,
 'Fosphenytoin (Cerebyx)',
 '[Fosphenytoin](#/drug/fosphenytoin/status epilepticus) 20 mg PE/kg IV (max 1500 mg PE) at max rate 150 mg PE/min.

**ESETT:** 45% seizure termination at 60 min.

**Requires cardiac monitoring** during and for 20 min after infusion — risk of:
• Hypotension
• Cardiac arrhythmia (bradycardia, QT prolongation)
• AV block

**INEFFECTIVE** for drug/alcohol-induced seizures — phenytoin''s selective action on voltage-gated sodium channels is insufficient for diffuse CNS toxicity.

**Contraindicated in:**
• Sinus bradycardia, SA/AV block, Adams-Stokes syndrome
• Decompensated heart failure

**Note:** Fosphenytoin (water-soluble prodrug) is preferred over phenytoin — no risk of purple glove syndrome, can be given IM. Dosed in **PE (phenytoin equivalents)**.',
 '[1,6,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-2nd-line-response', 'status-epilepticus', 'question', 3,
 '2nd-Line ASM Response?',
 'Assess **20 minutes** after start of infusion.

If seizure persists or recurs, this is now **refractory status epilepticus (RSE)**.

~30-40% of patients fail 2nd-line therapy. As SE duration increases, GABAA receptor internalization progresses and benzodiazepine/ASM resistance increases.

If the first 2nd-line agent fails, guidelines recommend either:
• Adding another 2nd-line ASM, OR
• Proceeding directly to anesthetic infusions',
 '[1,2]'::jsonb, '[{"label":"Seizure terminated","description":"Clinical and EEG seizure cessation","next":"se-2nd-success"},{"label":"Still seizing — refractory SE","description":"Failed BZD + 2nd-line ASM — escalate to anesthetic agents","next":"se-rse-prep","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;


-- MODULE 4: REFRACTORY SE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-phenobarbital', 'status-epilepticus', 'info', 4,
 'Phenobarbital',
 '[Phenobarbital](#/drug/phenobarbital/status epilepticus) 15-20 mg/kg IV at max rate 50-100 mg/min. Max single dose: 2000 mg.

**Use when ESETT agents (levetiracetam, valproate, fosphenytoin) are unavailable** or contraindicated.

**Significant risks:**
• Respiratory depression — may precipitate need for intubation
• Hypotension
• Excessive sedation

**Have intubation supplies ready** before administration.

**Also first-line for:**
• Neonatal seizures
• Benzodiazepine-resistant alcohol withdrawal seizures

When benzodiazepines are completely unavailable, phenobarbital IV 15-20 mg/kg may be used as first-line emergent therapy.',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-2nd-success', 'status-epilepticus', 'result', 4,
 'Seizure Terminated After 2nd-Line ASM',
 'Seizure terminated with 2nd-line antiseizure medication.

**Critical: Monitor for NCSE** — ESETT data showed 48% of patients with altered consciousness post-SE had ongoing nonconvulsive seizures on EEG.

**Post-seizure management:**
• Continuous EEG monitoring recommended — minimum 24h
• Continue maintenance dosing of the ASM that terminated seizure
• Complete etiology workup (labs, imaging, LP if indicated)
• Consider adding a second ASM for prophylaxis if high recurrence risk
• ICU admission for close monitoring',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Seizure terminated with 2nd-line ASM. Admit to ICU. Continuous EEG monitoring × 24-48h recommended. Continue maintenance ASM. Complete etiology workup.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 16)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-rse-prep', 'status-epilepticus', 'info', 4,
 'Refractory SE — Intubation & Preparation',
 '**Refractory SE (RSE)** = failure of first-line BZD AND adequate second-line ASM.

Occurs in ~30-40% of SE presentations.

**Immediate actions:**
• Secure airway with rapid sequence intubation
• Avoid prolonged paralysis — use short-acting agent (succinylcholine preferred over rocuronium) to allow clinical seizure assessment
• Arterial line for continuous BP monitoring
• Central venous access for vasopressors if needed
• **Continuous EEG monitoring — MANDATORY** (cannot assess seizure activity in paralyzed/sedated patient)

[RSE Management Principles](#/info/se-rse-principles) — intubation considerations, EEG targets, weaning protocol.

**Consider adding another 2nd-line ASM** (e.g., [Lacosamide](#/drug/lacosamide/status epilepticus) 200-400 mg IV) as adjunct before or concurrent with anesthetic infusion.',
 '[1,2,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-rse-infusion', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-rse-infusion', 'status-epilepticus', 'question', 4,
 'RSE — Continuous Infusion Selection',
 '**Goal:** EEG seizure suppression or burst suppression for 24-48 hours before weaning attempt.

No large RCTs demonstrate clear superiority between agents. Choice based on clinical factors.

All agents require mechanical ventilation and ICU-level care.

[Continuous Infusion Comparison](#/info/se-infusion-comparison) — dosing, hemodynamic effects, and unique risks for each agent.',
 '[1,8]'::jsonb, '[{"label":"Midazolam infusion","description":"Load 0.2 mg/kg, infuse 0.05-2 mg/kg/hr. Lowest hemodynamic impact, easier to wean.","next":"se-rse-monitoring"},{"label":"Propofol infusion","description":"Load 1-2 mg/kg, infuse 30-200 mcg/kg/min. Watch for propofol infusion syndrome (PRIS).","next":"se-rse-monitoring"},{"label":"Pentobarbital infusion","description":"Load 5-15 mg/kg, infuse 0.5-5 mg/kg/hr. Deepest suppression, most hemodynamic compromise.","next":"se-rse-monitoring"},{"label":"Ketamine infusion","description":"Load 0.5-3 mg/kg, infuse 0.1-5 mg/kg/hr. NMDA antagonist — different mechanism, may avoid intubation.","next":"se-rse-monitoring"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-rse-monitoring', 'status-epilepticus', 'info', 4,
 'RSE/SRSE Monitoring & Weaning',
 '**Continuous EEG targets:**
• Burst suppression (3-10 sec bursts, <50% suppression ratio)
• OR complete seizure suppression (depending on clinical scenario)

**Maintenance:** 24-48 hours of seizure suppression before first wean attempt.

**Weaning protocol:**
• Reduce infusion by 25% every 4-6 hours with continuous EEG
• If seizures recur on wean → restart at effective dose, extend 24h, retry

**Super-refractory SE (SRSE):** SE persists or recurs despite 24 hours of anesthetic therapy.

**SRSE options:**
• Switch to different anesthetic agent
• [Lacosamide](#/drug/lacosamide/status epilepticus) as adjunct
• Immunotherapy if autoimmune etiology suspected (IVIG, steroids, plasmapheresis)
• Therapeutic hypothermia (32-35°C)
• Ketogenic diet
• Neurology and neurointensive care consultation essential

**NORSE (new-onset refractory SE):** No prior seizure history, no identifiable cause. ~50% remain cryptogenic. Consider autoimmune/paraneoplastic encephalitis panel.',
 '[1,2,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-disposition', 'status-epilepticus', 'result', 4,
 'Disposition & Ongoing Management',
 '**All SE patients require ICU admission.**

**Monitoring:**
• Continuous EEG monitoring × minimum 24-48h
• Detect NCSE, guide treatment, monitor for recurrence

**Workup to complete:**
• MRI brain (when stable) — superior to CT for structural causes
• LP if infectious or autoimmune etiology suspected
• Autoimmune encephalitis panel if no clear etiology (NMDA-receptor Ab, LGI1, CASPR2)
• ASM levels (therapeutic drug monitoring)

**Maintenance ASM:**
• Continue the agent(s) that terminated SE
• [Levetiracetam](#/drug/levetiracetam/status epilepticus) is most commonly used for maintenance

**Goals of care:** Discuss with family early if RSE/SRSE — prognosis depends primarily on underlying etiology.

**Neurology consultation** for all SE patients.',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit to ICU. Continuous EEG × 24-48h. Complete etiology workup (MRI, LP if indicated, autoimmune panel if cryptogenic). Continue maintenance ASM. Neurology consultation.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 20)
;


-- MODULE 5: SPECIAL POPULATIONS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-pregnancy', 'status-epilepticus', 'info', 5,
 'Pregnancy / Eclampsia',
 '**First question: Is this eclampsia or epilepsy?**

**Eclampsia** if: hypertension, proteinuria, edema, >20 weeks gestation, or new-onset seizure in pregnancy without prior seizure history.

**Eclampsia treatment:**
• [Magnesium Sulfate](#/drug/magnesium-sulfate/eclampsia) 4-6 g IV over 15-20 min, then 1-2 g/hr infusion
• If seizures persist despite magnesium → benzodiazepines (lorazepam)
• **OB consultation STAT** — consider emergent delivery
• Fetal monitoring

**Epilepsy in pregnancy (breakthrough SE):**
• Standard BZD first-line
• For 2nd-line: **prefer [Levetiracetam](#/drug/levetiracetam/status epilepticus)** — 89% of neurologists chose it as first-line after BZD in pregnancy
• **AVOID [Valproate](#/drug/valproate/status epilepticus)** — teratogenic (neural tube defects), Category X
• Fosphenytoin acceptable if needed (teratogenic risk mainly with chronic exposure, less concern for acute SE)
• Refractory SE: midazolam or propofol infusion + consider early delivery

**All pregnant patients with new seizure** should receive empiric magnesium while further workup obtained.',
 '[1,9,10]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-choice', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-substance', 'status-epilepticus', 'info', 5,
 'Substance-Induced SE',
 '**9% of SE cases are substance-induced.**

**Isoniazid (INH) toxicity:**
• [Pyridoxine (Vitamin B6)](#/drug/pyridoxine/inh toxicity) is the specific antidote
• Dose: gram-for-gram to amount ingested, OR 5 g IV empiric if amount unknown
• INH depletes pyridoxine → GABA synthesis fails → refractory seizures
• Standard ASMs are ineffective without pyridoxine

**Alcohol withdrawal:**
• Benzodiazepines are first-line (high-dose may be needed)
• [Phenobarbital](#/drug/phenobarbital/status epilepticus) is effective adjunct
• Fosphenytoin/phenytoin INEFFECTIVE for alcohol withdrawal seizures

**Sympathomimetic toxicity** (cocaine, methamphetamine, MDMA):
• BZDs first-line
• Avoid phenytoin

**General principle:** Phenytoin/fosphenytoin is often **ineffective** for drug-induced seizures — phenytoin''s selective action on voltage-gated sodium channels cannot overcome diffuse CNS toxicity from other drug mechanisms.

**Treat the underlying toxidrome** alongside seizure management.',
 '[1,11]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-choice', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-peds', 'status-epilepticus', 'info', 5,
 'Pediatric Considerations',
 '**Same treatment algorithm as adults** — BZD first-line, then 2nd-line ASM, then anesthetic infusions.

**BZD dosing (weight-based):**
• IV Lorazepam: 0.1 mg/kg (max 4 mg), repeat × 1
• IM Midazolam: 13-40 kg → 5 mg; ≥40 kg → 10 mg (0.2 mg/kg, max 10 mg)
• Rectal Diazepam: 0.2-0.5 mg/kg (max 20 mg)

**2nd-line ASM:** Same agents and weight-based dosing as adults (per ESETT, which included pediatric patients).
• EcLiPSE and ConSEPT trials confirmed levetiracetam and phenytoin are equivalent in pediatric convulsive SE

**Pediatric-specific considerations:**
• **Pyridoxine-dependent epilepsy** (age <2 yr): Give [Pyridoxine](#/drug/pyridoxine/pyridoxine dependent epilepsy) 100 mg IV if SE is refractory and no clear etiology — especially neonates with refractory seizures
• **Febrile SE:** Most common etiology in children — workup directed at fever source
• **Inborn errors of metabolism:** Consider in neonates/infants with unexplained SE
• **Phenobarbital** remains first-line for neonatal seizures

**Weight estimation:** <1 yr: (months × 0.5) + 3.5 kg | 1-10 yr: (years × 2) + 10 kg | >10 yr: (years × 2) + 20 kg',
 '[1,2,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-choice', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 23)
;


-- MODULE 6: DIFFERENTIAL & NCSE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-ncse', 'status-epilepticus', 'info', 6,
 'Nonconvulsive Status Epilepticus (NCSE)',
 'NCSE accounts for up to **48% of patients with altered consciousness post-SE** (ESETT data).

**Suspect NCSE if:**
• Unexplained altered mental status after convulsive SE
• Subtle motor signs: eye deviation, nystagmus, lip smacking, eyelid fluttering, myoclonus
• Failure to return to baseline after initial seizure treatment
• Acutely ill ICU patients (especially on neurotoxic medications: cephalosporins, methotrexate, baclofen, lithium, opioids)

**Diagnosis:** Requires **EEG** — cannot diagnose clinically.

[NCSE Diagnostic Criteria](#/info/se-ncse-criteria) — Salzburg criteria and BZD trial protocol.

**BZD trial (diagnostic + therapeutic):**
• Administer lorazepam 1-2 mg IV while monitoring EEG
• Clinical AND EEG improvement → confirms NCSE diagnosis

**Treatment:** Same escalating algorithm as convulsive SE (BZD → 2nd-line → anesthetic infusions), but **urgency of aggressive treatment is debated** — weigh risks of anesthetic agents and intubation against ongoing nonconvulsive seizure activity.

NCSE generally has lower mortality than convulsive SE, but delay in diagnosis worsens outcomes.',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-iv-access', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 24)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('se-differential', 'status-epilepticus', 'result', 6,
 'Not SE — Differential Diagnosis',
 '**Common SE mimics:**

• **Psychogenic nonepileptic seizures (PNES):** Most common mimic. Features suggesting PNES: side-to-side head movements, pelvic thrusting, forced eye closure (seizures: eyes open), emotional outbursts, asynchronous limb movements, waxing/waning pattern, absence of postictal confusion. Video EEG is definitive.

• **Syncope with myoclonus:** Brief jerking movements after loss of consciousness — self-limited, resolves when horizontal. Lasts seconds (not minutes).

• **Movement disorders:** Dystonic reactions (from dopamine-blocking medications), oculogyric crisis (20-30 min, no loss of consciousness), tremor, myoclonus.

• **Metabolic encephalopathy:** Uremia, hyperammonemia, hepatic encephalopathy, myxedema coma.

• **Drug toxicity / intoxication:** Alcohol, delirium tremens, serotonin syndrome.

• **Locked-in syndrome:** Anterior pontine infarction — appears unresponsive but conscious. Test with vertical eye movements.

• **Decerebrate/decorticate posturing:** From structural brain injury — not rhythmic.

**Key differentiators:**
• Lateral tongue laceration suggests seizure over syncope
• Lactate >2.45 mmol/L: 88% sensitivity, 87% specificity for GTC seizure vs syncope/PNES
• Prolactin elevated 10-20 min post-seizure: 53% sensitivity, 93% specificity for convulsive SE

**If uncertain, treat as SE** until effectively ruled out — delayed treatment worsens outcomes.',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Consider alternative diagnosis. If uncertain, treat as SE until proven otherwise. PNES is the most common mimic — video EEG is definitive. Do not administer antiseizure medications for confirmed PNES.', NULL, 'consider', '[]'::jsonb, '[]'::jsonb, 25)
;


-- 5. drugs (10 new drugs)
INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('lorazepam', 'Lorazepam (Ativan)', 'Lorazepam', 'Benzodiazepine (intermediate-acting)', 'IV',
 '["Status epilepticus (first-line IV)","Seizure disorders"]'::jsonb,
 '[{"indication":"Status Epilepticus — IV (first-line)","regimen":"0.1 mg/kg IV push over 2 min (max 4 mg/dose). May repeat once in 5-10 min if seizure persists. Total max 8 mg. Preferred IV benzodiazepine — higher seizure termination rate than diazepam (65% vs 56%) and longer anticonvulsant duration.","weightCalc":{"dosePerKg":0.1,"unit":"mg","maxDose":4}}]'::jsonb,
 '["Acute narrow-angle glaucoma","Known hypersensitivity to benzodiazepines","Severe respiratory insufficiency (without ventilatory support)"]'::jsonb,
 '["Respiratory depression — risk increases with repeated doses, opioid co-administration, and elderly patients","Hypotension with rapid IV push","Requires refrigeration — check for precipitate before administration","Contains propylene glycol — accumulation risk with prolonged/high-dose use","Reduce dose 30-50% in elderly or hepatic impairment","Paradoxical agitation in elderly and pediatric patients"]'::jsonb,
 'Continuous SpO2, respiratory rate, blood pressure. Capnography if available. Have BVM, suction, and flumazenil available. Monitor for return of seizure activity.',
 'First-line IV benzodiazepine for SE per AES and NCS guidelines. Less lipophilic than diazepam — remains in the brain longer, providing more sustained anticonvulsant effect (12-24h vs 15-30 min for diazepam). Onset: 2-3 min IV. When IV access is unavailable, IM midazolam (not IM lorazepam) is preferred — lorazepam has unpredictable IM absorption. Underdosing of BZDs is a common error that leads to treatment failure.',
 NULL,
 '["Betjemann JP, Bhatt J, Engel A. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).","Silbergleit R, et al. RAMPART: Intramuscular versus Intravenous Therapy for Prehospital SE. N Engl J Med. 2012;366(7):591-600.","Treiman DM, et al. A Comparison of Four Treatments for Generalized Convulsive Status Epilepticus. N Engl J Med. 1998;339(12):792-798."]'::jsonb,
 0)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('diazepam', 'Diazepam (Valium)', 'Diazepam', 'Benzodiazepine (long-acting)', 'IV/PR',
 '["Status epilepticus (alternative)","Seizure disorders"]'::jsonb,
 '[{"indication":"Status Epilepticus — IV","regimen":"0.15-0.2 mg/kg IV (max 10 mg), may repeat once. Push slowly over 2 min. Alternative to lorazepam when lorazepam unavailable. Lower seizure termination rate than lorazepam (56% vs 65%). Shorter duration of anticonvulsant effect — seizures more likely to recur.","weightCalc":{"dosePerKg":0.2,"unit":"mg","maxDose":10}},{"indication":"Status Epilepticus — Rectal","regimen":"0.2-0.5 mg/kg PR (max 20 mg), one time. Used when IV/IM not available. No longer recommended as first-line — IM midazolam is preferred. Rectal route historically used in pediatric and prehospital settings.","weightCalc":{"dosePerKg":0.5,"unit":"mg","maxDose":20,"label":"Rectal (max dose)"}}]'::jsonb,
 '["Acute narrow-angle glaucoma","Severe respiratory insufficiency","Myasthenia gravis","Severe hepatic insufficiency"]'::jsonb,
 '["Respiratory depression — especially with repeated doses or opioid co-administration","Hypotension with rapid IV push","Propylene glycol toxicity with high doses or prolonged infusion","Contains propylene glycol and benzoic acid — not IM compatible (unpredictable absorption)","Rectal diazepam gel (Diastat) available for home/prehospital use"]'::jsonb,
 'Continuous SpO2, respiratory rate, blood pressure. Have BVM and flumazenil available.',
 'Historically first BZD used for SE. Now second-line to lorazepam (IV) and midazolam (IM). Longer half-life than lorazepam but shorter anticonvulsant duration paradoxically — highly lipophilic, redistributes rapidly from brain to peripheral tissues. For this reason, lorazepam (less lipophilic, stays in brain longer) is preferred.',
 NULL,
 '["Betjemann JP, Bhatt J, Engel A. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).","Treiman DM, et al. A Comparison of Four Treatments for Generalized Convulsive Status Epilepticus. N Engl J Med. 1998;339(12):792-798."]'::jsonb,
 1)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('fosphenytoin', 'Fosphenytoin (Cerebyx)', 'Fosphenytoin sodium', 'Hydantoin anticonvulsant (prodrug of phenytoin)', 'IV/IM',
 '["Status epilepticus (2nd-line)","Seizure prophylaxis"]'::jsonb,
 '[{"indication":"Status Epilepticus — 2nd line (ESETT)","regimen":"20 mg PE/kg IV (max 1500 mg PE) at max rate 150 mg PE/min. ESETT trial: 45% seizure termination at 60 min (equivalent to levetiracetam and valproate). Dosed in PE (phenytoin equivalents). Requires continuous cardiac monitoring during infusion and for 20 min after.","weightCalc":{"dosePerKg":20,"unit":"mg PE","maxDose":1500}}]'::jsonb,
 '["Sinus bradycardia, sinoatrial block, second/third-degree AV block, Adams-Stokes syndrome","Known hypersensitivity to hydantoins","Decompensated heart failure","Drug/alcohol-induced seizures (ineffective)"]'::jsonb,
 '["Cardiac arrhythmia — continuous telemetry required during infusion","Hypotension — infuse at rate ≤150 mg PE/min","QT prolongation","Stevens-Johnson syndrome / toxic epidermal necrolysis (rare, HLA-B*15:02 in Southeast Asian descent)","Teratogenic — use with caution in pregnancy (1st trimester)","Purple glove syndrome does NOT occur with fosphenytoin (only with IV phenytoin)"]'::jsonb,
 'Continuous cardiac monitoring during and 20 min after infusion. Blood pressure q5 min during infusion. Free phenytoin level 2h after loading (target 1-2 mcg/mL free, 10-20 mcg/mL total).',
 'Water-soluble prodrug of phenytoin — can be given IM (unlike phenytoin). Converted to phenytoin by phosphatases in 7-15 min. INEFFECTIVE for drug/alcohol-induced seizures — phenytoin''s selective voltage-gated sodium channel action cannot overcome diffuse CNS toxicity. ESETT trial showed equivalent efficacy to levetiracetam and valproate, but cardiac monitoring requirement and drug interaction profile make it less favorable in many clinical scenarios.',
 NULL,
 '["Kapur J, et al. Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus (ESETT). N Engl J Med. 2019;381(22):2103-2113.","Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9)."]'::jsonb,
 2)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('valproate', 'Valproate Sodium (Depacon)', 'Valproate sodium / Valproic acid', 'Anticonvulsant / Mood stabilizer', 'IV',
 '["Status epilepticus (2nd-line)","Seizure disorders","Bipolar disorder"]'::jsonb,
 '[{"indication":"Status Epilepticus — 2nd line (ESETT)","regimen":"40 mg/kg IV (max 3000 mg) over 10 min. ESETT trial: 46% seizure termination at 60 min (equivalent to levetiracetam and fosphenytoin). Well-tolerated even with larger doses and faster rates of infusion.","weightCalc":{"dosePerKg":40,"unit":"mg","maxDose":3000}}]'::jsonb,
 '["Pregnancy (Category X — teratogenic, neural tube defects)","Hepatic disease or significant hepatic dysfunction","Known mitochondrial disorders (Alpers syndrome — fatal hepatotoxicity)","Known urea cycle disorders (risk of fatal hyperammonemic encephalopathy)","Pancreatitis (active or history)"]'::jsonb,
 '["Thrombocytopenia — check platelets before and after administration","Hyperammonemia — check ammonia if altered mental status persists after seizure cessation","Hepatotoxicity — greatest risk in children <2 years on polytherapy","Coagulopathy — may impair coagulation","Teratogenic — avoid in women of childbearing age when possible","Drug interactions — inhibits CYP2C9, displaces protein-bound drugs"]'::jsonb,
 'Valproic acid level 2h after loading (target 50-100 mcg/mL, up to 150 for SE). CBC with platelets. Ammonia level if altered mental status. LFTs. Coagulation studies.',
 'Broad-spectrum anticonvulsant effective against generalized and focal seizures. ESETT trial demonstrated equivalent efficacy to levetiracetam and fosphenytoin for BZD-refractory SE. Well-tolerated even at rapid infusion rates. Major limitation is teratogenicity — should be avoided in pregnancy. Hyperammonemia can cause confusion that mimics ongoing SE — always check ammonia in patients not returning to baseline.',
 NULL,
 '["Kapur J, et al. ESETT: Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus. N Engl J Med. 2019;381(22):2103-2113.","Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).","Yasiry Z, Shorvon SD. Relative Effectiveness of Antiepileptic Drugs in Treatment of BZD-Resistant Convulsive SE. Epilepsia. 2014;55(9):1349-1361."]'::jsonb,
 3)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('phenobarbital', 'Phenobarbital', 'Phenobarbital sodium', 'Barbiturate anticonvulsant', 'IV',
 '["Status epilepticus (2nd-line alternative)","Neonatal seizures","Alcohol withdrawal seizures"]'::jsonb,
 '[{"indication":"Status Epilepticus — 2nd line","regimen":"15-20 mg/kg IV at max rate 50-100 mg/min. Max single dose 2000 mg. Use when levetiracetam, valproate, and fosphenytoin are unavailable or contraindicated. Also effective as adjunct for alcohol withdrawal seizures. May be used as first-line emergent therapy when benzodiazepines are unavailable.","weightCalc":{"dosePerKg":20,"unit":"mg","maxDose":2000}}]'::jsonb,
 '["Severe respiratory depression (without ventilatory support)","Porphyria","Severe hepatic impairment"]'::jsonb,
 '["Respiratory depression — have intubation supplies ready before administration","Hypotension — infuse slowly, monitor BP closely","Excessive sedation — synergistic with benzodiazepines","Long half-life (53-118 hours) — effects persist long after discontinuation","Drug interactions — potent CYP inducer"]'::jsonb,
 'Continuous SpO2, respiratory rate, blood pressure q5 min during infusion. Have intubation supplies at bedside. Phenobarbital level 12-24h post-load (target 20-40 mcg/mL for SE).',
 'Oldest anticonvulsant still in clinical use. Acts on GABAA receptors differently than benzodiazepines — increases duration (not frequency) of chloride channel opening, providing anticonvulsant effect even when GABAA receptors are partially internalized. This makes it useful when BZDs fail. First-line for neonatal seizures. Effective for alcohol withdrawal seizures (can be used when BZDs are insufficient).',
 NULL,
 '["Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).","Brophy GM, et al. Guidelines for the Evaluation and Management of Status Epilepticus. Neurocrit Care. 2012;17(1):3-23."]'::jsonb,
 4)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('lacosamide', 'Lacosamide (Vimpat)', 'Lacosamide', 'Anticonvulsant (sodium channel — slow inactivation enhancer)', 'IV',
 '["Status epilepticus (adjunct)","Refractory SE adjunct"]'::jsonb,
 '[{"indication":"Status Epilepticus — adjunct","regimen":"200-400 mg IV over 15 min. Not FDA-approved for SE but emerging as adjunct after BZD and 2nd-line ASM, before escalation to anesthetic agents. Meta-analysis: 57% overall efficacy. No large RCTs in SE; one trial showed noninferiority to fosphenytoin in NCSE."}]'::jsonb,
 '["Known second/third-degree AV block without pacemaker","Known hypersensitivity to lacosamide"]'::jsonb,
 '["PR interval prolongation — obtain ECG before administration","Cardiac arrhythmia in patients with cardiac conduction disease","Dizziness, diplopia, nausea (common)","Use with caution alongside other PR-prolonging medications"]'::jsonb,
 'ECG before and after administration (PR interval). Cardiac monitoring if cardiac history. Therapeutic drug level monitoring not routinely available.',
 'Enhances slow inactivation of voltage-gated sodium channels — mechanistically different from phenytoin (which affects fast inactivation). Not yet standard of care for SE but increasingly used as adjunct between conventional 2nd-line ASMs and anesthetic infusions. Advantages: no significant drug interactions, no hepatic metabolism issues, simple flat dosing (not weight-based), well-tolerated.',
 NULL,
 '["Strzelczyk A, et al. Lacosamide in Status Epilepticus: Systematic Review of Current Evidence. Epilepsia. 2017;58(6):933-950.","Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9)."]'::jsonb,
 5)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('propofol', 'Propofol (Diprivan)', 'Propofol', 'Sedative-hypnotic / IV anesthetic', 'IV',
 '["Refractory status epilepticus","Procedural sedation","RSI induction"]'::jsonb,
 '[{"indication":"Refractory SE — continuous infusion","regimen":"Load 1-2 mg/kg IV bolus, then infuse 30-200 mcg/kg/min (1.8-12 mg/kg/hr). Titrate to EEG burst suppression. Maintain 24-48h before wean attempt. Rapid onset and offset — easier to titrate than barbiturates.","weightCalc":{"dosePerKg":2,"unit":"mg","label":"Loading bolus"}}]'::jsonb,
 '["Known hypersensitivity to propofol, eggs, or soy (contains egg lecithin and soybean oil)","Severe cardiovascular instability","Children <16 years for prolonged ICU sedation (PRIS risk)"]'::jsonb,
 '["Propofol infusion syndrome (PRIS) — rhabdomyolysis, metabolic acidosis, cardiac failure, hyperkalemia, hyperlipidemia. Risk increases with doses >80 mcg/kg/min for >48h","Hypotension — bolus may cause significant BP drop","Respiratory depression — requires mechanical ventilation for continuous infusion","Hypertriglyceridemia — check triglycerides q24-48h","Contains lipid emulsion — counts toward caloric intake (1.1 kcal/mL)","Risk of bacterial contamination — use aseptic technique, discard after 12h"]'::jsonb,
 'Continuous EEG (mandatory). Arterial line. Triglycerides q24-48h. CK and lactate q12-24h (PRIS monitoring). ABG for metabolic acidosis. Urine color (green discoloration is benign).',
 'Rapid onset (30-60 sec) and short duration — allows frequent neurologic reassessment if infusion stopped briefly. More likely than midazolam to require addition of a second anesthetic infusion per retrospective data. PRIS is the major concern — monitor closely when using high doses for >48h. Mechanism: enhances GABAA receptor activity and inhibits NMDA receptors.',
 NULL,
 '["Claassen J, et al. Treatment of Refractory SE with Pentobarbital, Propofol, or Midazolam: A Systematic Review. Epilepsia. 2002;43(2):146-153.","Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9)."]'::jsonb,
 6)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('pentobarbital', 'Pentobarbital (Nembutal)', 'Pentobarbital sodium', 'Barbiturate anesthetic', 'IV',
 '["Refractory status epilepticus"]'::jsonb,
 '[{"indication":"Refractory SE — continuous infusion","regimen":"Load 5-15 mg/kg IV bolus over 1 hour, then infuse 0.5-5 mg/kg/hr. Titrate to EEG burst suppression. Provides deepest level of cerebral suppression among SE infusion agents. Maintain suppression 24-48h before first wean attempt.","weightCalc":{"dosePerKg":10,"unit":"mg","label":"Loading dose (midrange)"}}]'::jsonb,
 '["Severe cardiovascular instability (without vasopressor support)","Porphyria"]'::jsonb,
 '["Severe hypotension — almost always requires vasopressor support","Respiratory depression — requires mechanical ventilation","Immunosuppression with prolonged use","Prolonged sedation (very long half-life — 15-50 hours)","Paralytic ileus","Propylene glycol toxicity with prolonged infusion"]'::jsonb,
 'Continuous EEG (mandatory — target burst suppression). Arterial line for continuous BP. Central venous access. Vasopressors typically required. Daily labs: CBC, CMP, triglycerides, propylene glycol level if available.',
 'Reserved for SE refractory to midazolam and propofol. Provides the deepest cerebral suppression but at the cost of significant hemodynamic compromise. Most patients require vasopressor support. Very long half-life makes weaning challenging — prolonged ICU stays common. Thiopental is an alternative barbiturate anesthetic (load 2-7 mg/kg, infuse 0.5-5 mg/kg/hr) but is less commonly available in the US.',
 NULL,
 '["Claassen J, et al. Treatment of Refractory SE with Pentobarbital, Propofol, or Midazolam: A Systematic Review. Epilepsia. 2002;43(2):146-153.","Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9)."]'::jsonb,
 7)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('thiopental', 'Thiopental', 'Thiopental sodium', 'Barbiturate anesthetic', 'IV',
 '["Refractory status epilepticus (alternative to pentobarbital)"]'::jsonb,
 '[{"indication":"Refractory SE — continuous infusion","regimen":"Load 2-7 mg/kg IV bolus, then infuse 0.5-5 mg/kg/hr. Titrate to EEG burst suppression. Alternative to pentobarbital. Less commonly available in the US.","weightCalc":{"dosePerKg":5,"unit":"mg","label":"Loading dose (midrange)"}}]'::jsonb,
 '["Porphyria (absolute)","Severe cardiovascular instability","Status asthmaticus"]'::jsonb,
 '["Severe hypotension — vasopressor support typically required","Respiratory depression — requires mechanical ventilation","Immunosuppression with prolonged use","Tissue necrosis with extravasation (highly alkaline, pH 10-11)","Very long half-life (11-36 hours) — prolonged recovery"]'::jsonb,
 'Continuous EEG (mandatory). Arterial line. Central venous access. Vasopressors typically required. Monitor for extravasation at IV site.',
 'Ultra-short-acting barbiturate anesthetic used for refractory SE when other agents fail. Less available than pentobarbital in the US. Similar hemodynamic profile to pentobarbital — significant hypotension, requires ICU-level support. Alkaline solution (pH 10-11) — extravasation causes severe tissue necrosis. Primarily used in European and international settings.',
 NULL,
 '["Claassen J, et al. Treatment of Refractory SE with Pentobarbital, Propofol, or Midazolam. Epilepsia. 2002;43(2):146-153."]'::jsonb,
 8)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('pyridoxine', 'Pyridoxine (Vitamin B6)', 'Pyridoxine hydrochloride', 'Vitamin / Antidote', 'IV',
 '["Isoniazid (INH) toxicity — seizures","Pyridoxine-dependent epilepsy (neonatal)"]'::jsonb,
 '[{"indication":"INH toxicity — seizure antidote","regimen":"Gram-for-gram replacement of INH ingested. If amount unknown: 5 g IV over 5 min. May repeat 5 g IV q5-10 min until seizures stop (max total 70 mg/kg). INH depletes pyridoxine → GABA synthesis fails → refractory seizures. Standard ASMs are ineffective without pyridoxine."},{"indication":"Pyridoxine-dependent epilepsy (neonatal/infant)","regimen":"100 mg IV single dose. Consider in neonates/infants with unexplained refractory seizures. May be both diagnostic and therapeutic. If seizures stop, confirms diagnosis."}]'::jsonb,
 '["Known hypersensitivity to pyridoxine"]'::jsonb,
 '["Rapid IV push in large doses may cause transient sensory neuropathy","IV formulation may not be readily available — check pharmacy stock proactively in suspected INH ingestion"]'::jsonb,
 'Seizure cessation. Mental status improvement. ABG for acidosis correction.',
 'Critical antidote for INH-induced seizures. INH inhibits pyridoxal kinase, depleting active pyridoxine (pyridoxal 5''-phosphate), which is an essential cofactor for glutamic acid decarboxylase — the enzyme that converts glutamate to GABA. Without GABA synthesis, seizures are refractory to all standard anticonvulsants. Always give pyridoxine when INH toxicity is suspected — benzodiazepines alone will not terminate the seizures.',
 NULL,
 '["Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9)."]'::jsonb,
 9)
;


-- 5b. drugs — UPDATE existing entries (4 drugs)
-- Updating Midazolam (Versed) with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Burns anxiolysis","Procedural sedation adjunct","Seizures","Status epilepticus","Refractory SE"]'::jsonb,
  dosing = '[{"indication":"Burns — anxiolysis","regimen":"0.02-0.05 mg/kg IV over 2 min. Max 2 mg initial dose. May repeat q5-10 min to effect. Total max ~0.1 mg/kg.","weightCalc":{"dosePerKg":0.05,"unit":"mg","maxDose":2}},{"indication":"Ketamine emergence prophylaxis","regimen":"0.05 mg/kg IV given with ketamine. Reduces emergence reactions in adults.","weightCalc":{"dosePerKg":0.05,"unit":"mg","maxDose":2}},{"indication":"Status Epilepticus — IM (no IV access)","regimen":"0.2 mg/kg IM (max 10 mg). ≥40 kg: 10 mg; 13-40 kg: 5 mg. RAMPART trial: IM midazolam terminated seizures in 73% vs 63% for IV lorazepam. May also give intranasal 0.2 mg/kg via mucosal atomizer.","weightCalc":{"dosePerKg":0.2,"unit":"mg","maxDose":10}},{"indication":"Refractory SE — continuous infusion","regimen":"Load 0.2 mg/kg IV bolus, then infuse 0.05-2 mg/kg/hr. Repeat bolus 0.1-0.2 mg/kg for breakthrough seizures. Titrate to EEG seizure suppression or burst suppression. Requires intubation and continuous EEG monitoring.","weightCalc":{"dosePerKg":0.2,"unit":"mg","label":"Loading bolus"}}]'::jsonb,
  contraindications = '["Acute narrow-angle glaucoma","Known hypersensitivity to benzodiazepines"]'::jsonb,
  cautions = '["Respiratory depression — especially when combined with opioids or ketamine","Paradoxical agitation in elderly and pediatric patients","Reduce dose by 30-50% in elderly, hepatic impairment, or when combined with opioids"]'::jsonb,
  monitoring = 'Continuous SpO2, respiratory rate. Have flumazenil available (0.2 mg IV, though rarely needed).',
  notes = 'Short-acting anxiolytic ideal for burn care procedures. At low doses (0.02-0.05 mg/kg) provides anxiolysis without significant sedation. Commonly paired with ketamine to prevent emergence reactions in adults (not needed in children). Amnesia is a therapeutic benefit for painful burn procedures.',
  citations = '["Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359."]'::jsonb
WHERE id = 'midazolam';

-- Updating Levetiracetam (Keppra) with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Seizure treatment in ICH","Status epilepticus (adjunct)","Seizure disorders","Status epilepticus (ESETT 2nd-line)"]'::jsonb,
  dosing = '[{"indication":"ICH seizure treatment","regimen":"20 mg/kg IV (max 3000 mg) as loading dose over 15 min. Maintenance: 500–1500 mg IV/PO q12h. Preferred over phenytoin in ICH — fewer side effects and drug interactions.","weightCalc":{"dosePerKg":20,"unit":"mg","maxDose":3000,"label":"Loading dose"}},{"indication":"Status Epilepticus — 2nd line (ESETT)","regimen":"60 mg/kg IV (max 4500 mg) over 10-15 min. ESETT trial: 47% seizure termination (equivalent to fosphenytoin and valproate). Fewest drug interactions, no cardiac effects, safe in pregnancy. Preferred 2nd-line in pregnant patients (89% of neurologists).","weightCalc":{"dosePerKg":60,"unit":"mg","maxDose":4500,"label":"SE loading dose (ESETT)"}}]'::jsonb,
  contraindications = '["Hypersensitivity to levetiracetam"]'::jsonb,
  cautions = '["Behavioral changes (irritability, agitation) — more common at higher doses","Reduce dose in renal impairment (CrCl <80 mL/min)","Suicidal ideation risk — FDA black box warning for all antiepileptics"]'::jsonb,
  monitoring = 'Seizure frequency, mental status, renal function. Drug levels not routinely needed (poor correlation with efficacy).',
  notes = 'Preferred first-line antiepileptic in neurocritical care. No hepatic metabolism, no drug interactions with warfarin/DOACs, no cardiac effects. Phenytoin should be avoided in ICH — associated with worse outcomes, numerous drug interactions, and cardiac toxicity.',
  citations = '["Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage. Stroke. 2022;53(7):e282-e361.","Naidech AM, et al. Anticonvulsant Use and Outcomes After Intracerebral Hemorrhage. Stroke. 2009;40(12):3810-3815."]'::jsonb
WHERE id = 'levetiracetam';

-- Updating Ketamine with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Burns analgesia","Burns procedural sedation","RSI induction","Refractory SE"]'::jsonb,
  dosing = '[{"indication":"Burns — sub-dissociative analgesia","regimen":"0.1-0.3 mg/kg IV over 10-15 min. May repeat q15-20 min PRN. Infusion: 0.1-0.2 mg/kg/hr for dressing changes/prolonged procedures.","weightCalc":{"dosePerKg":0.3,"unit":"mg","label":"Sub-dissociative (max dose)"}},{"indication":"Burns — procedural sedation (dissociative)","regimen":"1-2 mg/kg IV over 1 min (onset 1 min, duration 15-20 min). IM: 4-5 mg/kg (onset 5 min, duration 20-30 min). May give additional 0.5-1 mg/kg IV boluses for prolonged procedures.","weightCalc":[{"dosePerKg":1.5,"unit":"mg","label":"IV dissociative"},{"dosePerKg":4,"unit":"mg","label":"IM dissociative"}]},{"indication":"RSI induction","regimen":"1-2 mg/kg IV push. Hemodynamically stable induction agent — ideal for burns/trauma patients.","weightCalc":{"dosePerKg":1.5,"unit":"mg"}},{"indication":"Refractory SE — continuous infusion","regimen":"Load 0.5-3 mg/kg IV bolus, then infuse 0.1-5 mg/kg/hr. NMDA receptor antagonist — different mechanism from GABAergic agents. Consider when midazolam and propofol fail. Some case reports suggest trial of ketamine before other IV anesthetics to potentially avoid intubation. Requires continuous EEG monitoring.","weightCalc":{"dosePerKg":2,"unit":"mg","label":"Loading bolus"}}]'::jsonb,
  contraindications = '["Age <3 months (relative)","Known psychotic disorder (relative)"]'::jsonb,
  cautions = '["Emergence reactions (10-20% adults, rare in children) — prophylactic midazolam 0.05 mg/kg can prevent","Laryngospasm (rare, 0.3%) — have suction and BVM ready","Increases secretions — consider glycopyrrolate 0.005 mg/kg if problematic","Brief sympathomimetic effect — increases HR/BP (beneficial in hemodynamically compromised patients)"]'::jsonb,
  monitoring = 'Continuous SpO2, capnography if available, cardiac monitor. Suction and BVM at bedside. Recovery typically 60-120 min.',
  notes = 'Ideal analgesic/sedative for burn patients: provides profound analgesia at sub-dissociative doses, full procedural sedation at dissociative doses, and RSI induction — one drug for three burn care needs. Maintains airway reflexes and spontaneous respirations at dissociative doses. Does NOT cause respiratory depression at analgesic doses. Hemodynamic stability makes it superior to opioids alone for burn resuscitation patients. Particularly valuable for repeated painful procedures (dressing changes, debridement).',
  citations = '["Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.","Bitter CC et al. WMS Clinical Practice Guideline on Care of Burns in the Wilderness. Wilderness Environ Med. 2025;36(4):549-558."]'::jsonb
WHERE id = 'ketamine';

-- Updating Magnesium Sulfate with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["A-Fib / A-Flutter adjunctive rate and rhythm control","Torsades de pointes","Hypomagnesemia","Eclampsia / Pre-eclampsia seizure prophylaxis","Hypomagnesemia / Hypokalemia adjunct"]'::jsonb,
  dosing = '[{"indication":"A-Fib (adjunctive)","regimen":"Bolus: 2-4 g IV over 15-30 min. For aggressive repletion: continuous infusion per institutional protocol. Target serum level ~3-4 mg/dL for antiarrhythmic effect. Most administered magnesium is renally excreted — continuous infusion may be needed to replete intracellular stores."},{"indication":"Torsades de pointes","regimen":"1-2 g IV over 5-60 min (faster for unstable patients)."},{"indication":"Hypomagnesemia / Hypokalemia (adjunct)","regimen":"2 g IV over 1 hour. Correct hypomagnesemia before potassium repletion — hypokalemia is refractory until Mg is repleted."},{"indication":"Eclampsia / Pregnancy SE","regimen":"Loading dose: 4-6 g IV over 15-20 min. Maintenance: 1-2 g/hr continuous infusion. Primary treatment for eclamptic seizures. If seizures persist despite magnesium, add benzodiazepines then standard SE algorithm. Monitor deep tendon reflexes (loss = first sign of toxicity), respiratory rate, urine output. Antidote for Mg toxicity: Calcium gluconate 1 g IV."}]'::jsonb,
  contraindications = '["Severe renal failure (GFR <30 mL/min or oliguria) for continuous infusion — use intermittent boluses instead","Hypermagnesemia (>4 mg/dL)","Myasthenia gravis (may worsen weakness)"]'::jsonb,
  cautions = '["Monitor for hypermagnesemia: loss of deep tendon reflexes (first sign), respiratory depression, cardiac arrest","Check renal function before continuous infusion","Calcium gluconate 1g IV is the antidote for magnesium toxicity"]'::jsonb,
  monitoring = 'Serum magnesium levels every 6-8 hours during infusion. Deep tendon reflexes. Respiratory rate. Renal function.',
  notes = 'Excellent safety profile — one meta-analysis detected no reported adverse events. Blocks slow calcium channels in SA and AV nodes. Even when cardioversion does not occur, magnesium reduces heart rate and augments efficacy of other antiarrhythmics and DC cardioversion. In one RCT, continuous magnesium infusion was superior to amiodarone for new-onset AF. The combination of aggressive magnesium loading plus amiodarone achieved 90% cardioversion rate in critically ill patients.',
  citations = '["Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.","Moran JL, et al. Parenteral MgSO4 vs Amiodarone for Atrial Tachyarrhythmias. Crit Care Med. 1995;23(11):1816-24.","Bosch NA, et al. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434."]'::jsonb
WHERE id = 'magnesium-sulfate';


-- 6. info_pages (6 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('se-summary', 'Status Epilepticus Steps Summary', 'Time-Critical Treatment Ladder',
 '[{"body":"Quick-reference checklist for the escalating treatment of status epilepticus. Tap any step to jump directly to that decision point in the consult."},{"heading":"Phase 1: Recognition & Stabilization (0-5 min)","body":"• [Confirm SE: seizure >5 min or recurrent without recovery](#/node/se-is-this-se)\n• [ABCs — left lateral decubitus, O2, IV access × 2, monitor](#/node/se-abcs)\n• [Fingerstick glucose STAT — treat hypoglycemia immediately](#/node/se-glucose-labs)\n• [Obtain labs: BMP (Na, Ca, Mg), CBC, UDS, lactate, ASM levels](#/node/se-glucose-labs)"},{"heading":"Phase 2: First-Line Benzodiazepine (0-5 min)","body":"• [IV access: Lorazepam 0.1 mg/kg IV (max 4 mg), repeat × 1](#/node/se-iv-bzd)\n• [No IV: Midazolam 0.2 mg/kg IM (max 10 mg)](#/node/se-no-iv-bzd)\n• [Assess response 5 min after BZD — up to 2 doses allowed](#/node/se-bzd-response)"},{"heading":"Phase 3: Screen Special Populations","body":"• [Pregnant / eclampsia → Magnesium sulfate first](#/node/se-pregnancy)\n• [Toxic ingestion (INH) → Pyridoxine is specific antidote](#/node/se-substance)\n• [Pediatric → same algorithm, weight-based dosing](#/node/se-peds)"},{"heading":"Phase 4: Second-Line ASM (5-20 min)","body":"• [Select 2nd-line agent — ESETT: all three are equivalent](#/node/se-2nd-line-choice)\n• [Levetiracetam 60 mg/kg IV (max 4500 mg) — fewest interactions](#/node/se-levetiracetam)\n• [Valproate 40 mg/kg IV (max 3000 mg) — avoid in pregnancy/liver disease](#/node/se-valproate)\n• [Fosphenytoin 20 mg PE/kg IV (max 1500 mg PE) — cardiac monitoring required](#/node/se-fosphenytoin)\n• [Phenobarbital 15-20 mg/kg IV — if above unavailable](#/node/se-phenobarbital)"},{"heading":"Phase 5: Refractory SE (>20 min)","body":"• [Intubate — RSI with short-acting paralytic](#/node/se-rse-prep)\n• [Start continuous EEG monitoring — MANDATORY](#/node/se-rse-prep)\n• [Select continuous infusion: midazolam, propofol, pentobarbital, or ketamine](#/node/se-rse-infusion)\n• [Target burst suppression on EEG × 24-48h before wean attempt](#/node/se-rse-monitoring)"},{"heading":"Phase 6: Disposition","body":"• [All SE → ICU admission with continuous EEG](#/node/se-disposition)\n• [Complete etiology workup: MRI, LP if indicated, autoimmune panel](#/node/se-disposition)\n• [Neurology consultation for all SE patients](#/node/se-disposition)"}]'::jsonb,
 '[{"num":1,"text":"Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9)."},{"num":2,"text":"Brophy GM, et al. Guidelines for Status Epilepticus. Neurocrit Care. 2012;17(1):3-23."}]'::jsonb,
 false,
 0)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('se-labs', 'SE Diagnostic Workup', 'Laboratory Testing, Imaging & EEG',
 '[{"body":"Comprehensive workup for status epilepticus — identify reversible causes and guide management."},{"heading":"Immediate (Do Not Delay Treatment)","body":"• **Fingerstick glucose** — hypoglycemia and hyperglycemia (non-ketotic hyperosmolar) cause seizures\n• **Point-of-care electrolytes** if available — Na, Ca, glucose"},{"heading":"Priority Laboratory Tests","body":"• **Complete blood count** — leukocytosis may indicate infection (transient leukocytosis common post-seizure)\n• **Comprehensive metabolic panel** — Na, Ca, Mg, Phos as metabolic seizure etiologies\n• **Urine drug screen** — cocaine, amphetamines, MDMA, marijuana, heroin all associated with seizures\n• **Serum toxicology** — acetaminophen, salicylate, ethanol levels\n• **Lactate** — excess from muscle tissue; if elevated >1h post-seizure, monitor for persistent acidosis. Lactate >2.45 mmol/L distinguishes GTC from syncope/PNES (sensitivity 88%, specificity 87%)\n• **Blood gas (VBG/ABG)** — respiratory acidosis, hypercarbia in depressed mental status\n• **Pregnancy test** — positive test limits certain ASMs due to teratogenicity"},{"heading":"Additional Studies","body":"• **ASM levels** — assess medication compliance in known epilepsy patients\n• **Prolactin** — draw 10-20 min post-seizure. Sensitivity 53%, specificity 93% for convulsive SE. Limited by narrow collection window.\n• **Creatine kinase (CK)** — rises 1-12h, peaks 24-72h. Trend for rhabdomyolysis and AKI. Sensitivity 14-87%, specificity 85-100%.\n• **Troponin** — can be elevated with seizures (autonomic features). Prompt cardiac evaluation if elevated.\n• **Cultures** — blood, urine, CSF if infection suspected"},{"heading":"Imaging","body":"• **CT head non-contrast** — first-line after stabilization. Evaluate for hemorrhage, mass, edema, herniation. Normal CT does not rule out elevated ICP.\n• **CT/MR venogram** — consider if risk for cerebral venous thrombosis (hypercoagulability, recent pregnancy, OCP use, headache, papilledema)\n• **MRI brain** — superior for structural causes. Obtain when stable. DWI for acute ischemia, FLAIR for edema/encephalitis."},{"heading":"Lumbar Puncture","body":"• **Indications:** Signs of meningitis, critically ill patients, age ≤18 months with febrile seizure, new-onset seizures without obvious cause, antibiotics given prior to evaluation, incomplete/unknown vaccination history\n• Obtain CT head before LP if altered mental status or focal neurologic deficit\n• CSF pleocytosis should prompt further investigation — seizures alone do NOT cause CSF pleocytosis\n• Low threshold to test CSF for infectious causes — delays in treating CNS infection worsen outcomes"},{"heading":"Electroencephalogram (EEG)","body":"• **Continuous EEG** recommended when: patient does not return to baseline, concern for NCSE, clinical evaluation limited by sedation or paralysis\n• ESETT: 48% of patients with altered consciousness post-SE had NCSE on EEG\n• **Intermittent EEG** (30-60 min) may miss up to 10% of subclinical seizures\n• High-risk populations for NCSE: ICU patients on neurotoxic medications, history of epilepsy, prior GTC, prior head injury/stroke, female sex"}]'::jsonb,
 '[{"num":1,"text":"Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9)."},{"num":2,"text":"Brophy GM, et al. Guidelines for Status Epilepticus. Neurocrit Care. 2012;17(1):3-23."}]'::jsonb,
 false,
 1)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('se-asm-comparison', '2nd-Line ASM Comparison', 'ESETT Trial Results & Clinical Selection',
 '[{"body":"The ESETT trial (2019) randomized 475 patients to levetiracetam, fosphenytoin, or valproate for BZD-refractory SE. **No significant difference in efficacy or adverse events** between the three agents. Choice should be tailored to patient comorbidities. [1]"},{"heading":"Efficacy (ESETT)","body":"","drugTable":[{"drug":"Levetiracetam","regimen":"60 mg/kg IV (max 4500 mg) over 10-15 min. **47% seizure cessation at 60 min.** Onset: 5-10 min. [1]"},{"drug":"Valproate Sodium","regimen":"40 mg/kg IV (max 3000 mg) over 10 min. **46% seizure cessation at 60 min.** Onset: 5-10 min. [1]"},{"drug":"Fosphenytoin","regimen":"20 mg PE/kg IV (max 1500 mg PE) at 150 mg PE/min. **45% seizure cessation at 60 min.** Onset: 10-20 min. [1]"},{"drug":"Phenobarbital","regimen":"15-20 mg/kg IV at 50-100 mg/min (max 2000 mg). Not in ESETT. Use if above unavailable. [2]"}]},{"heading":"When to Choose Each Agent","body":"**Levetiracetam** — Best overall safety profile\n• Fewest drug interactions\n• No cardiac effects (no telemetry needed during infusion)\n• Safe in hepatic failure, renal impairment (dose adjust)\n• Safe in pregnancy (preferred 2nd-line)\n• Caution: psychiatric side effects (irritability, agitation)\n\n**Valproate** — Broad-spectrum efficacy\n• Well-tolerated even at rapid infusion rates\n• AVOID in: pregnancy (Category X), liver disease, mitochondrial disorders, thrombocytopenia, pancreatitis, urea cycle disorders\n• Check ammonia if AMS persists\n\n**Fosphenytoin** — When specific indication exists\n• Requires cardiac monitoring during/after infusion\n• INEFFECTIVE for drug/alcohol-induced seizures\n• AVOID in: cardiac conduction disease, hypotension, drug-induced SE\n• Can be given IM (unlike phenytoin)\n\n**Phenobarbital** — Backup option\n• When ESETT agents unavailable\n• Effective for alcohol withdrawal seizures\n• Significant respiratory depression and hypotension\n• Also first-line for neonatal seizures"},{"heading":"Side-Effect Comparison","body":"• **Levetiracetam:** Psychiatric symptoms, drowsiness. Caution in mood disorders.\n• **Valproate:** Thrombocytopenia, hyperammonemia, hepatotoxicity, teratogenicity. Caution in liver disease, pregnancy.\n• **Fosphenytoin:** Cardiac arrhythmia, hypotension, Stevens-Johnson syndrome. Caution in cardiac disease.\n• **Lacosamide (adjunct):** PR prolongation, cardiac arrhythmia. Caution in cardiovascular disease. Not yet standard of care.\n• **Phenobarbital:** Respiratory depression, hypotension. Caution with concurrent BZDs. [3]"}]'::jsonb,
 '[{"num":1,"text":"Kapur J, et al. ESETT: Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus. N Engl J Med. 2019;381(22):2103-2113."},{"num":2,"text":"Brophy GM, et al. Guidelines for the Evaluation and Management of Status Epilepticus. Neurocrit Care. 2012;17(1):3-23."},{"num":3,"text":"Yasiry Z, Shorvon SD. Relative Effectiveness of Five Antiepileptic Drugs in Treatment of BZD-Resistant Convulsive SE. Epilepsia. 2014;55(9):1349-1361."}]'::jsonb,
 false,
 2)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('se-infusion-comparison', 'RSE Continuous Infusion Comparison', 'Refractory SE Anesthetic Agents',
 '[{"body":"No large RCTs demonstrate clear superiority between agents for refractory SE. Choice based on clinical factors. All require mechanical ventilation, continuous EEG monitoring, and ICU-level care. [1]"},{"heading":"Agent Comparison","body":"","drugTable":[{"drug":"Midazolam","regimen":"Load 0.2 mg/kg IV, infuse 0.05-2 mg/kg/hr. Repeat bolus 0.1-0.2 mg/kg for breakthrough. **Lowest hemodynamic impact.** Easiest to wean. Tachyphylaxis may require dose escalation. [1]"},{"drug":"Propofol","regimen":"Load 1-2 mg/kg IV, infuse 30-200 mcg/kg/min. Rapid onset/offset. **Watch for PRIS** (propofol infusion syndrome) with doses >80 mcg/kg/min for >48h — rhabdomyolysis, metabolic acidosis, cardiac failure. Check triglycerides q24-48h. [1]"},{"drug":"Pentobarbital","regimen":"Load 5-15 mg/kg IV over 1h, infuse 0.5-5 mg/kg/hr. **Deepest cerebral suppression.** Most hemodynamic compromise — vasopressors almost always required. Very long half-life (15-50h). [1]"},{"drug":"Ketamine","regimen":"Load 0.5-3 mg/kg IV, infuse 0.1-5 mg/kg/hr. **NMDA antagonist** — different mechanism from GABAergic agents. May be tried when midazolam and propofol fail. Some reports suggest trial before other anesthetics to potentially avoid intubation. [2]"}]},{"heading":"Clinical Decision Factors","body":"**Choose midazolam when:**\n• Hemodynamic instability is a concern\n• Short duration of suppression anticipated\n• Easier ICU nursing management\n\n**Choose propofol when:**\n• Need for rapid onset and frequent neuro assessments\n• Younger patients (lower PRIS risk)\n• Shorter anticipated duration (<48h)\n\n**Choose pentobarbital when:**\n• Other agents have failed\n• Deepest level of suppression required\n• Hemodynamic support is available\n\n**Choose ketamine when:**\n• GABAergic agents have failed (different mechanism)\n• Hemodynamic support is limited (sympathomimetic effect)\n• Consider early trial to potentially avoid intubation"},{"heading":"EEG Targets","body":"• **Burst suppression:** 3-10 second bursts, <50% suppression ratio\n• **Seizure suppression:** Complete absence of electrographic seizures\n• Maintain for **24-48 hours** before first wean attempt\n• Wean by reducing infusion 25% every 4-6 hours with continuous EEG monitoring\n• Seizure recurrence on wean → restart at effective dose, extend 24h, retry"}]'::jsonb,
 '[{"num":1,"text":"Claassen J, et al. Treatment of Refractory SE with Pentobarbital, Propofol, or Midazolam: A Systematic Review. Epilepsia. 2002;43(2):146-153."},{"num":2,"text":"Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9)."}]'::jsonb,
 false,
 3)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('se-rse-principles', 'RSE Management Principles', 'Intubation, EEG, and ICU Care',
 '[{"body":"Refractory SE requires coordinated critical care management with a focus on seizure suppression, airway protection, and neuroprotection."},{"heading":"Airway Management","body":"• **RSI is indicated** — secure airway before starting continuous anesthetic infusions\n• Use **short-acting paralytic** (succinylcholine preferred over rocuronium) to allow ongoing clinical seizure assessment\n• Avoid prolonged paralysis — masks clinical seizure activity\n• Once paralyzed, **continuous EEG is the ONLY way** to monitor seizure activity\n• Post-intubation sedation with the chosen anesthetic infusion"},{"heading":"Continuous EEG Monitoring","body":"• **MANDATORY** for all RSE patients — cannot assess seizure activity in sedated/paralyzed patient\n• Target: burst suppression or complete seizure suppression (per clinical scenario)\n• Duration: maintain suppression × **24-48 hours** before first wean attempt\n• Automated seizure detection algorithms exist but are not yet available in most EDs\n• If continuous EEG unavailable, intermittent EEGs (30-60 min) are helpful but may miss up to 10% of subclinical seizures"},{"heading":"Hemodynamic Support","body":"• Anesthetic agents cause significant hypotension — arterial line for continuous BP monitoring\n• Central venous access for vasopressor infusions\n• Pentobarbital almost always requires vasopressors\n• Propofol and midazolam may require vasopressors at higher doses\n• Goal: MAP >65 mmHg (or higher if concern for elevated ICP)"},{"heading":"Supportive ICU Care","body":"• Nutrition: enteral feeding when feasible (propofol contributes 1.1 kcal/mL toward caloric intake)\n• DVT prophylaxis (SCD + pharmacologic when safe)\n• Stress ulcer prophylaxis\n• Head of bed elevation 30°\n• Temperature management — fever worsens neuronal injury; target normothermia\n• Daily labs: CBC, CMP, CK, lactate, triglycerides (if propofol), drug levels"},{"heading":"Weaning Protocol","body":"• After 24-48h of seizure suppression on EEG:\n• Reduce infusion rate by **25% every 4-6 hours**\n• Maintain continuous EEG monitoring throughout wean\n• If seizures recur → restart at prior effective dose, extend suppression 24h, retry wean\n• **Super-refractory SE (SRSE):** SE that persists/recurs despite 24h of anesthetic therapy\n• SRSE options: switch anesthetic agent, add lacosamide, immunotherapy (if autoimmune suspected), therapeutic hypothermia (32-35°C), ketogenic diet"}]'::jsonb,
 '[{"num":1,"text":"Claassen J, et al. Treatment of Refractory SE with Pentobarbital, Propofol, or Midazolam. Epilepsia. 2002;43(2):146-153."},{"num":2,"text":"Brophy GM, et al. Guidelines for Status Epilepticus. Neurocrit Care. 2012;17(1):3-23."}]'::jsonb,
 false,
 4)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('se-ncse-criteria', 'NCSE Diagnostic Criteria', 'Salzburg Criteria & BZD Trial',
 '[{"body":"Nonconvulsive status epilepticus (NCSE) is underrecognized due to lack of overt motor signs. Diagnosis requires EEG, but clinical suspicion and a benzodiazepine trial can guide management while awaiting formal EEG."},{"heading":"When to Suspect NCSE","body":"• Unexplained altered mental status / coma\n• Failure to return to baseline after convulsive seizure treatment\n• Subtle motor signs: nystagmus, gaze deviation, eyelid fluttering, lip smacking, subtle facial twitching, myoclonus\n• Fluctuating level of consciousness\n• Unexplained aphasia or cognitive decline\n• ICU patients on neurotoxic medications (cephalosporins, methotrexate, baclofen, lithium, opioids)\n• History of epilepsy, prior GTC, prior head injury or stroke"},{"heading":"Salzburg Consensus Criteria (2015)","body":"EEG criteria for diagnosing NCSE: [1]\n\n**Primary criteria (any one sufficient):**\n• Epileptiform discharges (EDs) >2.5 Hz\n• EDs ≤2.5 Hz OR rhythmic delta/theta activity with ONE of:\n  — EEG AND clinical improvement after IV BZD\n  — Subtle clinical ictal phenomena during EEG pattern\n  — Typical spatiotemporal evolution (frequency, morphology, or location change)\n\n**Absent primary criteria:** The recording does NOT show NCSE"},{"heading":"Benzodiazepine Trial (Diagnostic + Therapeutic)","body":"**Protocol:**\n• Administer lorazepam 1-2 mg IV while monitoring EEG (if available) and clinical status\n• **Positive trial:** Clinical improvement (increased responsiveness, improved cognition) AND/OR EEG improvement (reduction/cessation of epileptiform activity)\n• A positive trial confirms NCSE and initiates treatment\n• **Negative trial:** No clinical or EEG change — does not definitively rule out NCSE but makes it less likely\n• Even without EEG, clinical improvement after BZD trial supports NCSE diagnosis"},{"heading":"Treatment Approach","body":"• Same escalating algorithm as convulsive SE (BZD → 2nd-line ASM → anesthetic infusions)\n• **Urgency of aggressive treatment is debated** — NCSE generally has lower mortality than convulsive SE\n• Weigh risks of anesthetic agents and intubation against ongoing subclinical seizure activity\n• Treat underlying etiology aggressively (infection, metabolic, structural)\n• Continuous EEG monitoring throughout treatment to guide escalation/de-escalation\n• Maintain a high index of suspicion — NCSE accounts for up to 48% of post-SE altered consciousness (ESETT) [2]"}]'::jsonb,
 '[{"num":1,"text":"Leitinger M, et al. Salzburg Consensus Criteria for Non-Convulsive Status Epilepticus. Epilepsia. 2015;56(10):1515-1523."},{"num":2,"text":"Kapur J, et al. ESETT: Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus. N Engl J Med. 2019;381(22):2103-2113."}]'::jsonb,
 false,
 5)
;

COMMIT;
