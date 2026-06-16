-- =====================================================================
-- MedKitt — Acute Dystonic Reaction Consult: Supabase INSERT Statements
-- Generated: 2026-06-16
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'dystonic-reaction',
  'Acute Dystonic Reaction',
  'Airway Screen → Culprit Meds/Incidence → Presentations → Differential → Anticholinergic Rx → Disposition',
  '1.0',
  24,
  'adr-start',
  '["Recognition","Culprits & Risk","Presentations","Differential","Treatment","Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('psychiatry', 'dystonic-reaction', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (8 citations)
DELETE FROM tree_citations WHERE tree_id = 'dystonic-reaction';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('dystonic-reaction', 1, 'Im D, Caroff SN. Dystonic Reactions. StatPearls. NCBI Bookshelf. Updated 2026.'),
('dystonic-reaction', 2, 'Campbell D. The management of acute dystonic reactions. Aust Prescr. 2001;24:19-20.'),
('dystonic-reaction', 3, 'Duma SR, Fung VSC. Drug-induced movement disorders. Aust Prescr. 2019;42:56-61.'),
('dystonic-reaction', 4, 'Queensland Ambulance Service. Clinical Practice Guidelines: Medical/Acute dystonic reaction. 2020.'),
('dystonic-reaction', 5, 'Oregon Health Authority. Recognition and Management of Antipsychotic-induced Movement Disorders. 2024.'),
('dystonic-reaction', 6, 'FDA prescribing information: Reglan (metoclopramide) tablets; extrapyramidal reactions and acute dystonia warnings.'),
('dystonic-reaction', 7, 'FDA prescribing information: Haldol (haloperidol); extrapyramidal symptoms and dystonia warnings.'),
('dystonic-reaction', 8, 'Satterthwaite TD et al. A meta-analysis of the risk of acute extrapyramidal symptoms with intramuscular antipsychotics for the treatment of agitation. J Clin Psychiatry. 2008;69(12):1869-1879.');

DELETE FROM decision_nodes WHERE tree_id = 'dystonic-reaction';

-- 4. decision_nodes (24 nodes)

-- MODULE 1: RECOGNITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-start', 'dystonic-reaction', 'question', 1,
 'Acute Dystonic Reaction',
 '**Core pattern:** sudden painful sustained or intermittent muscle contraction after a dopamine-blocking medication.

**Most common timing:** minutes to hours after an ED dose, or within the first 4-5 days after starting/increasing an antipsychotic or antiemetic.

**Typical clues:** clear sensorium, anxiety/fear, normal temperature, focal craniocervical spasm, recent haloperidol/droperidol/metoclopramide/prochlorperazine/promethazine/risperidone exposure.

**First move:** look for airway involvement before debating the exact label.',
 '[1,2,3]'::jsonb, '[{"label":"Airway symptoms present","description":"Stridor, dysphonia, dyspnea, throat tightness, choking sensation","next":"adr-airway","urgency":"critical"},{"label":"Classic focal dystonia","description":"Oculogyric, torticollis, jaw/tongue, opisthotonos, limb/trunk spasm","next":"adr-fit-check","urgency":"urgent"},{"label":"Atypical / uncertain","description":"Fever, AMS, seizure-like activity, trauma, no clear culprit","next":"adr-differential"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 0,
 'Sudden focal painful spasm after dopamine blocker; screen airway first.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-airway', 'dystonic-reaction', 'info', 1,
 'Airway Screen: Laryngeal Dystonia',
 '**This is the dangerous phenotype.** Laryngeal dystonia is rare but can obstruct the airway.

**Red flags:**
- Stridor
- Dysphonia or aphonia
- Dyspnea or throat tightness
- Drooling or inability to swallow secretions
- Cyanosis, hypoxia, severe agitation from air hunger

**Immediate actions:**
1. Move to resus bay; airway equipment, suction, BVM, and RSI backup at bedside.
2. Stop the suspected culprit.
3. Give **[diphenhydramine](#/drug/diphenhydramine/acute dystonia) 50 mg IV/IM** OR **[benztropine](#/drug/benztropine/acute dystonia) 1-2 mg IV/IM** now.
4. Oxygen as needed. Prepare anesthesia/ENT/airway backup if stridor or hypoxia persists.
5. If severe agitation or incomplete response: add benzodiazepine and continue airway planning.

**Do not call this anxiety until it improves after anticholinergic therapy and the airway is clearly safe.**',
 '[1,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-treatment-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1,
 'Laryngeal dystonia: anticholinergic immediately, airway setup, do not dismiss as anxiety.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-fit-check', 'dystonic-reaction', 'question', 1,
 'Does the Pattern Fit Drug-Induced Dystonia?',
 '**High-confidence diagnosis when ALL are true:**

- Sudden sustained/repetitive spasm or abnormal posture
- Recent dopamine-blocking drug exposure or dose increase
- Symptoms began within minutes-hours or within 4-5 days
- Mental status is otherwise clear
- No fever, clonus, meningismus, true loss of consciousness, or focal CNS deficit

**Treatment is both diagnostic and therapeutic.** If the story fits, treat now rather than waiting for labs.',
 '[1,2,3]'::jsonb, '[{"label":"Yes - treat now","description":"Classic story; do not delay","next":"adr-treatment-first-line","urgency":"urgent"},{"label":"Probably, but high risk / severe","description":"Severe pain, jaw/tongue, airway-adjacent, recurrent","next":"adr-treatment-first-line","urgency":"urgent"},{"label":"No / atypical","description":"Reset differential before anchoring","next":"adr-differential"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2,
 'Classic timing + dopamine blocker + focal spasm = treat now.', NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 2: CULPRITS & RISK
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-culprit-incidence', 'dystonic-reaction', 'info', 2,
 'Culprit Meds + Incidence',
 '**Incidence varies by dose, route, age, prior reaction, and prophylaxis. Use the numbers as risk anchors, not precise prediction for a single patient.**

| Drug/class | Examples | Practical incidence/risk signal |
|---|---|---|
| High-potency first-generation antipsychotics | Haloperidol, fluphenazine, pimozide | Highest antipsychotic risk. Reported acute dystonia around 3-10%; ED agitation meta-analysis found haloperidol alone ~4.7% vs SGAs ~0.6%. FDA label: EPS frequent, often first days. |
| Droperidol | ED agitation/antiemetic doses | Dopamine blocker; dystonia/akathisia possible. Risk rises with higher dose, repeated dosing, young age, no anticholinergic/benzodiazepine co-treatment. |
| Metoclopramide | Reglan | FDA label: acute dystonic reactions ~0.2% (1 in 500) at 30-40 mg/day; much higher with high-dose chemotherapy regimens in young patients without diphenhydramine prophylaxis. |
| Prochlorperazine | Compazine | Common ED culprit. Older estimates for metoclopramide/prochlorperazine: 0.5-1%; some adult cohorts report higher values. |
| Promethazine/chlorpromazine | Phenothiazines | Less common than high-potency but recognized; can produce dystonia and NMS-like syndromes. |
| Second-generation antipsychotics | Risperidone/paliperidone > olanzapine > quetiapine/clozapine | Lower than FGAs but not zero. Risk increases with high dose, rapid titration, parenteral use, young male, prior reaction. |
| Rare/case-report classes | SSRIs, TCAs, anticonvulsants, methylphenidate, rivastigmine, foscarnet, cetirizine, anesthetics | Usually rare; consider only after dopamine blockers and metabolic/toxic mimics. |

**Bottom line:** in the ED, assume dopamine blockade until proven otherwise.',
 '[1,2,3,5,6,7,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-risk', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3,
 'Highest risk: high-potency FGAs and antiemetic dopamine blockers; metoclopramide/prochlorperazine are common ED culprits.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-risk', 'dystonic-reaction', 'info', 2,
 'Risk Factors',
 '**Strong risk factors:**
- Prior acute dystonic reaction
- Young age, especially <30-35 years
- Male sex for antipsychotic-associated dystonia
- High-potency D2 blockade
- Parenteral administration (IM/IV)
- Rapid dose escalation or repeated doses
- Neuroleptic-naive patient
- Recent cocaine use
- Dehydration or acute medical illness
- Family history of dystonia

**Medication clues:**
- First 5 days after antipsychotic start is the classic window.
- ED dose can trigger symptoms before discharge or after the patient gets home.
- Long-acting depot antipsychotics can cause prolonged or recurrent symptoms.
- Stopping a chronic anticholinergic can unmask dystonia in a patient maintained on antipsychotics.',
 '[1,2,5,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-presentations', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4,
 'Young, male, prior reaction, high-potency/parenteral D2 blocker, rapid escalation, cocaine = high risk.', NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 3: PRESENTATIONS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-presentations', 'dystonic-reaction', 'info', 3,
 'Clinical Presentations',
 '**Common phenotypes:**

| Presentation | What you see |
|---|---|
| Oculogyric crisis | Sustained upward/lateral eye deviation, eyelid spasm, anxiety, preserved awareness |
| Cervical dystonia | Torticollis, retrocollis, neck pain, head pulled to one side/backward |
| Oromandibular dystonia | Trismus, jaw opening/closing spasm, grimacing, tongue protrusion, dysarthria |
| Buccolingual crisis | Tongue feels swollen but is not truly edematous; may mimic allergy |
| Laryngeal dystonia | Stridor, dysphonia, throat tightness, dyspnea - airway emergency |
| Opisthotonos / axial dystonia | Back arching, trunk extension, tetanus-like posture |
| Limb dystonia | Sustained abnormal hand/foot/limb posture, painful cramping |
| Dysphagia/dysphonia | Oropharyngeal muscle involvement; aspiration risk if severe |

**Most involve head/neck first.** The patient is often terrified but awake and oriented.',
 '[1,2,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-exam', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5,
 'Oculogyric, torticollis, oromandibular/buccolingual, laryngeal, opisthotonos, limb/trunk dystonia.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-exam', 'dystonic-reaction', 'info', 3,
 'Bedside Exam',
 '**Focused exam:**
- Airway: voice, stridor, secretions, swallow, work of breathing
- Vitals: fever or major autonomic instability argues against simple dystonia
- Mental status: clear sensorium supports dystonia; delirium/coma does not
- Eyes: sustained gaze deviation without postictal state suggests oculogyric crisis
- Jaw/tongue: trismus, tongue protrusion, dysarthria; distinguish from true edema
- Neck/trunk: torticollis, retrocollis, opisthotonos
- Neuro: focal deficit, meningismus, clonus/hyperreflexia, seizure signs
- Skin/mucosa: urticaria, wheeze, hypotension, true swelling = allergy pathway

**Medication reconciliation:** last 5 days of antipsychotics/antiemetics; include ED meds, urgent care meds, depot injections, migraine cocktails, CHS therapy, and home psych med changes.',
 '[1,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-treatment-first-line', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6,
 'Airway, vitals, mental status, focal neuro, true allergy signs, and 5-day med history.', NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 4: DIFFERENTIAL
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-no-response', 'dystonic-reaction', 'info', 4,
 'No Response: Reset the Differential',
 '**If adequate anticholinergic therapy does not help, acute dystonia is less likely.**

**Re-check immediately for:**
- Seizure or nonconvulsive status
- Tetanus or strychnine-like toxidrome
- Hypocalcemia/hypomagnesemia
- Serotonin syndrome or NMS
- CNS infection, stroke, intracranial mass, toxic-metabolic encephalopathy
- True angioedema/anaphylaxis or mechanical airway obstruction
- TMJ dislocation, dental/oral trauma
- Functional neurologic disorder only after dangerous mimics are excluded

**Workup should be targeted to the abnormal feature:** glucose, electrolytes including Ca/Mg, CK, temperature, tox exposure, pregnancy when relevant, ECG/QTc, CT/LP/EEG only if the history/exam points there.',
 '[1,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-differential', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7,
 'No anticholinergic response = reset diagnosis and look for dangerous mimics.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-differential', 'dystonic-reaction', 'question', 4,
 'Differential Diagnosis',
 '**Pick the dangerous mimic if the presentation is not classic.**

Simple acute dystonia usually has normal temperature, preserved consciousness, focal patterned spasm, and rapid anticholinergic response.',
 '[1,2,3,4]'::jsonb, '[{"label":"Fever / AMS / generalized rigidity","description":"NMS, serotonin syndrome, CNS infection, sepsis","next":"adr-nms-ss","urgency":"critical"},{"label":"Loss of consciousness or rhythmic convulsion","description":"Seizure or nonconvulsive status","next":"adr-seizure-mimic","urgency":"critical"},{"label":"True swelling / urticaria / wheeze / hypotension","description":"Angioedema/anaphylaxis","next":"adr-allergy-mimic","urgency":"critical"},{"label":"Tetanic spasms / wound / hypocalcemia risk","description":"Tetanus, hypocalcemia, hypomagnesemia, strychnine-like tox","next":"adr-metabolic-mimic","urgency":"urgent"},{"label":"Classic drug-induced dystonia","description":"Return to treatment","next":"adr-treatment-first-line"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 8,
 'Danger mimics: NMS/SS, seizure, allergy, tetanus/electrolytes, CNS infection.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-nms-ss', 'dystonic-reaction', 'info', 4,
 'Dystonia vs NMS vs Serotonin Syndrome',
 '| Feature | Acute dystonia | NMS | Serotonin syndrome |
|---|---|---|---|
| Onset | Minutes-hours; usually <5 days | Days-weeks | Hours |
| Mental status | Usually clear | Altered | Agitated/delirious |
| Temperature | Normal | High fever | Variable fever |
| Tone | Focal patterned spasm | Generalized lead-pipe rigidity | Hyperreflexia/clonus |
| Autonomic | Usually mild anxiety/tachy | Labile BP, diaphoresis | Diarrhea, mydriasis, diaphoresis |
| Treatment | Diphenhydramine/benztropine | Stop D2 blocker, cooling, ICU, bromocriptine/dantrolene | Stop serotonergics, benzos, cyproheptadine |

**Do not give more antipsychotic when the diagnosis may be NMS.**',
 '[1,3,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9,
 'Clear focal spasm = dystonia; fever/AMS/lead-pipe or clonus = alternate tox emergency.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-seizure-mimic', 'dystonic-reaction', 'info', 4,
 'Seizure Mimic Check',
 '**Oculogyric crisis can look like seizure, but awareness is usually preserved.**

**Seizure clues:**
- Loss of consciousness
- Rhythmic clonic movements rather than sustained posture
- Lateral tongue bite, incontinence, postictal state
- Persistent gaze deviation with focal neuro deficit
- No response to anticholinergic therapy

**Actions:** glucose now, treat active seizure per status pathway, consider EEG/CT/LP based on story. Do not delay airway care.',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-no-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10,
 'Preserved awareness favors oculogyric crisis; LOC/postictal/rhythmic clonus favors seizure.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-allergy-mimic', 'dystonic-reaction', 'info', 4,
 'Allergy / Angioedema Mimic',
 '**Buccolingual dystonia often feels like tongue swelling but the tongue is not truly edematous.**

**Allergy/angioedema clues:**
- Visible progressive swelling of lips/tongue/uvula
- Urticaria, flushing, wheeze, hypotension
- ACE inhibitor exposure or hereditary angioedema history
- No jaw/tongue rhythmic posturing

**If anaphylaxis is possible:** epinephrine first. Diphenhydramine does not treat shock or bronchospasm.

**If dystonia is likely:** anticholinergic response should rapidly clarify the diagnosis.',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-treatment-first-line', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11,
 'Tongue-feels-swollen can be dystonia; true swelling/wheeze/hypotension = allergy pathway.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-metabolic-mimic', 'dystonic-reaction', 'info', 4,
 'Tetanus / Electrolyte / Toxic Mimics',
 '**Consider when there is no dopamine-blocker story or the pattern is generalized.**

**Tetanus:** trismus, risus sardonicus, opisthotonos, autonomic instability, wound/immunization gap; spasms triggered by touch/noise.

**Hypocalcemia/hypomagnesemia:** perioral numbness, tetany, carpopedal spasm, QT prolongation, seizure risk.

**Strychnine-like tox:** severe generalized painful spasms with preserved consciousness, stimulus-triggered, possible hyperthermia/lactic acidosis.

**Workup:** Ca/Mg/K/glucose, ECG, CK/lactate if severe spasms, wound/immunization review, tox consult if exposure possible.',
 '[1,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-no-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12,
 'Generalized triggerable spasms or no D2-blocker history: check tetanus, Ca/Mg, tox.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-workup', 'dystonic-reaction', 'info', 4,
 'When to Order Tests',
 '**No routine test confirms acute dystonia.** Diagnosis is clinical and often confirmed by rapid response to anticholinergic therapy.

**No labs needed** for a classic, medication-linked, rapidly resolving reaction.

**Target tests when atypical:**
- Glucose for seizure/AMS
- BMP plus calcium and magnesium for tetany/spasm
- CK/creatinine/UA if prolonged severe spasms or restraint/agitation
- Temperature and infectious workup if fever/meningismus/sepsis concern
- ECG/QTc if antipsychotic/antiemetic exposure or electrolyte concern
- CT/LP/EEG only for focal neuro deficit, persistent AMS, seizure, meningitis/encephalitis concern

**Do not let testing delay treatment when airway or classic dystonia is present.**',
 '[1,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-treatment-first-line', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13,
 'Clinical diagnosis; test only atypical features or mimics.', NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 5: TREATMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-treatment-first-line', 'dystonic-reaction', 'info', 5,
 'First-Line ED Treatment',
 '**Stop the offending drug and give an anticholinergic.**

**Adult options - choose one:**
- **[Diphenhydramine](#/drug/diphenhydramine/acute dystonia) 50 mg IV** preferred for fastest onset; IM acceptable if no IV.
- **[Benztropine](#/drug/benztropine/acute dystonia) 1-2 mg IV/IM**; may repeat once after ~15-30 min if incomplete.

**Pediatric:**
- **Diphenhydramine 1 mg/kg IV/IM, max 50 mg.**

**Expected response:** visible improvement usually within **5-30 min** after parenteral anticholinergic.

**If severe distress, incomplete response, or anticholinergic contraindication:** add a benzodiazepine (e.g., lorazepam or midazolam) while reassessing the diagnosis.

**Do not give more dopamine blocker for nausea/agitation while treating the reaction.**',
 '[1,2,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-treatment-response', NULL, '{"firstLine":{"drug":"Diphenhydramine","dose":"Adults 50 mg; pediatrics 1 mg/kg max 50 mg","route":"IV preferred; IM acceptable","frequency":"Once, may repeat if incomplete response","duration":"Acute reversal; follow with oral anticholinergic 24-72 h","notes":"Fast ED default. Sedating and anticholinergic; use caution in elderly, glaucoma, urinary retention."},"alternative":{"drug":"Benztropine","dose":"Adults 1-2 mg","route":"IV or IM","frequency":"May repeat once after 15-30 min if incomplete response","duration":"Acute reversal; transition to short oral anticholinergic course when appropriate","notes":"Longer anticholinergic duration than diphenhydramine; avoid/caution in angle-closure glaucoma, ileus, urinary retention, delirium-prone elderly."},"monitoring":"Airway, swallowing/secretions, mental status, sedation, anticholinergic toxicity, recurrence after initial improvement."}'::jsonb, NULL, '[]'::jsonb, '[]'::jsonb, 14,
 'Diphenhydramine 50 mg IV/IM or benztropine 1-2 mg IV/IM; peds diphen 1 mg/kg max 50.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-treatment-response', 'dystonic-reaction', 'question', 5,
 'Response After Anticholinergic',
 '**Reassess at 5-30 minutes:**

- Eye deviation resolved?
- Neck/jaw/tongue/trunk spasm improved?
- Swallowing and voice normal?
- Respiratory symptoms gone?
- Patient less distressed but not over-sedated?

A rapid response strongly supports acute dystonia.',
 '[1,2,4]'::jsonb, '[{"label":"Complete / near-complete response","description":"Move to recurrence prevention and disposition","next":"adr-relapse-prevention"},{"label":"Partial response","description":"Repeat anticholinergic or add benzodiazepine","next":"adr-partial-response","urgency":"urgent"},{"label":"No meaningful response","description":"Do not anchor; reconsider mimics","next":"adr-no-response","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15,
 'Rapid improvement after anticholinergic confirms diagnosis; no response = rethink.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-partial-response', 'dystonic-reaction', 'info', 5,
 'Partial Response',
 '**If improving but not resolved:**

1. Recheck airway, voice, swallowing, and oxygenation.
2. Repeat the initial anticholinergic once if safe.
3. Add benzodiazepine if severe spasm, panic, or residual painful contraction.
4. Review medication list for long-acting/depot antipsychotic or repeated antiemetic dosing.
5. Observe longer because recurrence is more likely.

**Escalate if:** airway symptoms persist, the patient cannot swallow, severe jaw/tongue spasm continues, or the presentation becomes febrile/altered.',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-relapse-prevention', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16,
 'Partial response: repeat anticholinergic, consider benzo, observe longer.', NULL, 'warning', NULL, NULL, NULL)
;


-- MODULE 6: DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-relapse-prevention', 'dystonic-reaction', 'info', 6,
 'Prevent Recurrence',
 '**Why recurrence happens:** the culprit dopamine blocker often lasts longer than IV/IM diphenhydramine or benztropine.

**After ED reversal:**
- **Diphenhydramine 25-50 mg PO q6h for 24-72 h**, OR
- **Benztropine 1-2 mg PO BID for 2-3 days** when appropriate.

**Longer coverage may be needed** after depot/long-acting antipsychotics or repeated antiemetic dosing. Coordinate with psychiatry/pharmacy if the antipsychotic must continue.

**Counsel clearly:** sedation, no driving/alcohol, return for voice change, trouble breathing/swallowing, recurrent eye/neck/jaw spasm, fever, confusion, or severe rigidity.',
 '[1,2,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-avoid-rechallenge', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17,
 'Continue oral anticholinergic 24-72h after reversal because culprit drug outlasts antidote.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-avoid-rechallenge', 'dystonic-reaction', 'info', 6,
 'Avoid Rechallenge',
 '**Document as a medication adverse reaction, not a vague allergy.**

**ED documentation:**
- Offending drug, dose, route, and time
- Phenotype: oculogyric/torticollis/jaw/tongue/laryngeal/etc.
- Treatment response and time to response
- Discharge anticholinergic plan

**Avoid:** same medication and close dopamine-blocking relatives when reasonable.

**Safer substitutions:**
- Nausea/migraine: consider non-D2 options when clinically appropriate.
- Agitation/psychosis: discuss lower-EPS antipsychotic or anticholinergic prophylaxis with psychiatry.

**Highest-risk patient:** prior dystonic reaction plus re-exposure.',
 '[1,2,3,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18,
 'Record the exact drug and phenotype; avoid re-exposure when possible.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-special-populations', 'dystonic-reaction', 'info', 6,
 'Special Populations',
 '**Pediatrics:** acute dystonia commonly follows antiemetics; children/adolescents can present with frightening oculogyric, jaw/tongue, or opisthotonic reactions. Use diphenhydramine 1 mg/kg IV/IM max 50 mg and observe until clearly back to baseline.

**Pregnancy:** metoclopramide and prochlorperazine exposures occur in hyperemesis/migraine pathways. Treat maternal airway and distress first; diphenhydramine is commonly used, but coordinate obstetric context when needed.

**Elderly/dementia:** acute dystonia is less common than parkinsonism or akathisia, but anticholinergic treatment can cause delirium, urinary retention, and falls. Use the minimum effective anticholinergic and observe thoughtfully.

**Glaucoma/urinary retention/ileus:** anticholinergic therapy may worsen these; airway-threatening dystonia still gets treated, but monitor and involve pharmacy/consultants early.',
 '[1,2,4,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'adr-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19,
 'Peds: diphen 1 mg/kg max 50. Elderly: anticholinergic toxicity risk. Airway still wins.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-disposition', 'dystonic-reaction', 'question', 6,
 'Disposition',
 '**Disposition depends on airway risk, diagnostic certainty, recurrence risk, and sedation.**',
 '[]'::jsonb, '[{"label":"Discharge after observation","description":"Classic reaction, fully resolved, airway safe, reliable follow-up","next":"adr-discharge"},{"label":"Observe / admit","description":"Airway involvement, recurrence, long-acting culprit, persistent symptoms, atypical features","next":"adr-observe-admit","urgency":"urgent"},{"label":"ICU / airway-capable setting","description":"Stridor, hypoxia, recurrent laryngeal symptoms, severe tox/metabolic mimic","next":"adr-icu","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20,
 'Discharge only when resolved and airway safe; airway symptoms or atypical course need observation/admission.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-discharge', 'dystonic-reaction', 'result', 6,
 'Discharge Criteria',
 '**Reasonable discharge when ALL are true:**
- Symptoms resolved or near-resolved after anticholinergic
- Voice, swallowing, and breathing normal
- Vitals stable, no fever/AMS/focal neuro deficit
- No recurrent spasm during ED observation
- Patient has oral anticholinergic plan and understands sedation precautions
- Offending drug stopped/avoided or psychiatry/pharmacy plan documented
- Return precautions given

**Typical discharge meds:** diphenhydramine 25-50 mg PO q6h x 24-72 h OR benztropine 1-2 mg PO BID x 2-3 days when appropriate.',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Discharge only after full airway-safe clinical resolution, recurrence prevention, and clear medication avoidance plan.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 21,
 'Discharge after complete resolution, airway safety, oral anticholinergic, and culprit avoidance.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-observe-admit', 'dystonic-reaction', 'result', 6,
 'Observe / Admit',
 '**Observe or admit for:**
- Laryngeal symptoms even if improved
- Need for repeated IV/IM anticholinergic or benzodiazepine
- Long-acting/depot antipsychotic exposure
- Recurrent symptoms in ED
- Persistent dysphagia, jaw/tongue spasm, aspiration concern
- Significant sedation or anticholinergic toxicity
- Diagnostic uncertainty requiring workup
- Unsafe discharge or inability to obtain meds

**Observation time:** airway/respiratory symptoms generally merit 12-24 h monitoring after resolution.',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Observation/admission for airway involvement, recurrence, repeated meds, long-acting culprit, persistent symptoms, or diagnostic uncertainty.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 22,
 'Observe/admit if airway, recurrence, repeated dosing, long-acting culprit, or uncertain diagnosis.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('adr-icu', 'dystonic-reaction', 'result', 6,
 'ICU / Airway-Capable Setting',
 '**ICU or airway-capable monitored setting when:**
- Persistent stridor, hypoxia, or respiratory distress
- Recurrent laryngeal dystonia
- Need for airway intervention or continuous airway watch
- Severe generalized spasms with hyperthermia/acidosis/rhabdo
- Concern for NMS, serotonin syndrome, tetanus, strychnine-like tox, CNS infection, or status epilepticus

**Treatment priority:** airway and oxygenation first, then definitive diagnosis.',
 '[1,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'ICU/airway setting for persistent or recurrent laryngeal symptoms, hypoxia, or dangerous mimic concern.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 23,
 'ICU for persistent airway risk or dangerous mimic.', NULL, 'critical', NULL, NULL, NULL)
;

COMMIT;
