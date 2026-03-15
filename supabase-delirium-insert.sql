-- =====================================================================
-- MedKitt — Delirium Management Consult: Supabase INSERT Statements
-- Generated: 2026-03-15
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata) — UPDATE existing row
UPDATE decision_trees SET
  title = 'Delirium Management',
  subtitle = 'Safety → Screening → Etiology → De-escalation → Pharmacology → Disposition',
  version = '1.0',
  node_count = 30,
  entry_node_id = 'delirium-start',
  module_labels = '["Initial Assessment & Safety","Etiology Workup","Nonpharmacological Management","Pharmacological Management","Monitoring","Disposition"]'::jsonb
WHERE id = 'delirium'
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('neurology', 'delirium', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('emergency-medicine', 'delirium', NULL, NULL, NULL, 1)
ON CONFLICT (category_id, tree_id) DO UPDATE SET
  display_title = EXCLUDED.display_title,
  display_subtitle = EXCLUDED.display_subtitle,
  entry_node_id = EXCLUDED.entry_node_id,
  sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (12 citations)
DELETE FROM tree_citations WHERE tree_id = 'delirium';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('delirium', 1, 'Nassisi D, Okuda Y, Koyfman A, et al. Managing Delirium in the Emergency Department: Tools for Targeting Underlying Etiology. Emergency Medicine Practice (EB Medicine).'),
('delirium', 2, 'Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). PulmCrit. 2024.'),
('delirium', 3, 'Inouye SK, Westendorp RGJ, Saczynski JS. Delirium in Elderly People. Lancet. 2014;383(9920):911-922.'),
('delirium', 4, 'Han JH, Wilber ST. Altered Mental Status in Older Emergency Department Patients. Clin Geriatr Med. 2013;29(1):101-136.'),
('delirium', 5, 'Kennedy M, Enander R, Tadiri SP, et al. Delirium Risk Prediction, Healthcare Use and Mortality of Elderly Adults in the Emergency Department. J Am Geriatr Soc. 2014;62(3):462-469.'),
('delirium', 6, 'Wei L, Fearing M, Sternberg EJ, et al. The Confusion Assessment Method: A Systematic Review of Current Usage. J Am Geriatr Soc. 2008;56(5):823-830.'),
('delirium', 7, 'Han JH, Wilson A, Vasilevskis EE, et al. Diagnosing Delirium in Older Emergency Department Patients: Validity and Reliability of the Delirium Triage Screen and the Brief Confusion Assessment Method. Ann Emerg Med. 2013;62(5):457-465.'),
('delirium', 8, 'Richmond JS, Berlin JS, Fishkind AB, et al. Verbal De-escalation of the Agitated Patient: Consensus Statement of the American Association for Emergency Psychiatry Project BETA De-escalation Workgroup. West J Emerg Med. 2012;13(1):17-25.'),
('delirium', 9, 'Chase PB, Biros MH. A Retrospective Review of the Use and Safety of Droperidol in a Large, High-Risk, Inner-City Emergency Department Patient Population. Acad Emerg Med. 2002;9(12):1402-1410.'),
('delirium', 10, 'Chan EW, Taylor DM, Knott JC, et al. Intravenous Droperidol or Olanzapine as an Adjunct to Midazolam for the Acutely Agitated Patient: A Multicenter, Randomized, Double-Blind, Placebo-Controlled Clinical Trial. Ann Emerg Med. 2013;61(1):72-81.'),
('delirium', 11, 'Girard TD, Exline MC, Carson SS, et al. Haloperidol and Ziprasidone for Treatment of Delirium in Critical Illness (MIND-USA). N Engl J Med. 2018;379(26):2506-2516.'),
('delirium', 12, 'Vilke GM, DeBard ML, Chan TC, et al. Excited Delirium Syndrome (ExDS): Defining Based on a Review of the Literature. J Emerg Med. 2012;43(5):897-905.');

DELETE FROM decision_nodes WHERE tree_id = 'delirium';

-- 4. decision_nodes (30 nodes)

-- MODULE 1: INITIAL ASSESSMENT & SAFETY
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('delirium-start', 'delirium', 'info', 1,
 'Delirium Management',
 '[Delirium Steps Summary](#/info/delirium-summary) — rapid assessment and management pathway.

Delirium is acute brain dysfunction — DSM-5 defines as acute/fluctuating disturbance in attention and cognition. **7-24% of elderly ED patients** have delirium; up to **80% of ICU patients**. Missed diagnosis rate **54-89%**. Mortality comparable to sepsis and MI.

Delirium is a **SYMPTOM** requiring urgent etiology search, not just behavioral management.',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-safety', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-safety', 'delirium', 'info', 1,
 'Scene Safety & Team Preparation',
 'Personal and team safety first. For agitated patients: remove sharps/equipment from reach, ensure adequate staffing (minimum 5 for physical restraint), activate security if needed. Approach calmly, non-threateningly. One person speaks.

[Verbal De-escalation: 10 Elements](#/info/del-deescalation) — AAEP Project BETA guidelines for engaging the agitated patient.

Position yourself near the exit. Do not corner the patient. Show of force (security presence) is effective nonpharmacological intervention — avoided sedation in 27% of cases in one study.',
 '[8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-rapid-reversible', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-rapid-reversible', 'delirium', 'question', 1,
 'Rapid Reversible Causes',
 'Primary survey: ABCs, vital signs, fingerstick glucose. Check for immediately correctable causes before proceeding with delirium workup.

**Fingerstick glucose** — hypoglycemia is common and immediately reversible. D50W 25g IV if <60 mg/dL.

**SpO2** — supplement O2 if hypoxic. Hypoxia causes direct brain insult.

**Temperature** — fever suggests infection; >104°F (40°C) raises concern for excited delirium syndrome or CNS infection.

**Naloxone** — consider if opioid features present (miosis, respiratory depression, decreased consciousness). 0.4-2 mg IV/IN.

**Thiamine** — give before dextrose in suspected alcohol use disorder to prevent Wernicke encephalopathy.',
 '[1,4]'::jsonb, '[{"label":"Reversible cause identified","description":"Hypoglycemia, hypoxia, opioid toxicity, or hypothermia","next":"del-correct-reversible"},{"label":"No immediate reversible cause","description":"Proceed to delirium screening and subtype assessment","next":"del-screening"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-correct-reversible', 'delirium', 'info', 1,
 'Correct Reversible Cause',
 'Treat the identified cause with standard emergency care:

• **Hypoglycemia:** D50W 25g IV (adults) or D10W 2-5 mL/kg (peds). Recheck glucose in 15 min.
• **Hypoxia:** Supplemental O2 to SpO2 >94%. Evaluate for pneumonia, PE, CHF.
• **Opioid toxicity:** Naloxone 0.4-2 mg IV/IN. May repeat q2-3 min. Consider infusion if recurrent (2/3 of effective dose per hour).
• **Hypothermia:** Active warming. Evaluate for underlying cause.
• **Hypotension:** IV fluid bolus. Evaluate for sepsis, hemorrhage, cardiac cause.

If mental status does not improve after correction, proceed with full delirium evaluation — multiple precipitants often coexist.',
 '[1]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-screening', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-screening', 'delirium', 'question', 1,
 'Delirium Screening & Subtype Assessment',
 '**RASS (Richmond Agitation-Sedation Scale)** — assess level of agitation or sedation to determine delirium subtype and guide management.

**CAM (Confusion Assessment Method)** — gold standard ED screening tool. Delirium is present when ALL of:
1. **Acute onset** or **fluctuating course** (change from baseline)
2. **Inattention** (unable to recite months backward, spell WORLD backward, or count backward from 20)
PLUS EITHER:
3. **Altered level of consciousness** (RASS ≠ 0)
4. **Disorganized thinking** (incoherent, illogical, or unpredictable thought process)

[CAM & bCAM Screening Guide](#/info/del-cam-guide) — detailed 2-tier screening protocol.
[Delirium vs Dementia](#/info/del-vs-dementia) — key differentiating features.

**Critical:** Obtain baseline mental status from family/caregivers/prior records. Without baseline, diagnosis is unreliable.',
 '[1,6,7]'::jsonb, '[{"label":"Hypoactive (RASS -1 to -3)","description":"Quiet, withdrawn, decreased alertness — most commonly MISSED subtype","next":"del-hypoactive","urgency":"urgent"},{"label":"Hyperactive (RASS +1 to +4)","description":"Agitated, combative, psychomotor hyperactivity","next":"del-hyperactive","urgency":"urgent"},{"label":"Excited delirium syndrome suspected","description":"Extreme agitation + hyperthermia + unusual strength + pain tolerance","next":"del-exds","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"rass","label":"RASS Score"}]'::jsonb, 4)
;


-- MODULE 2: ETIOLOGY WORKUP
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-hypoactive', 'delirium', 'info', 2,
 'Hypoactive Delirium',
 'RASS -1 to -3. The **most commonly missed** delirium subtype — 32-67% undiagnosed in the ED.

**Presentation:** Quiet, withdrawn, inattentive, decreased psychomotor activity, apathetic, drowsy but arousable.

**Higher mortality** than hyperactive subtype — patients are often dismissed as "tired," "depressed," or confused from baseline dementia.

**Common causes:** Metabolic derangements (hepatic/renal encephalopathy), medication effects (opioids, sedatives, anticholinergics), infection (especially UTI/pneumonia in elderly), dehydration.

**Key principle:** Hypoactive delirium is NOT benign — it requires the same urgent etiology search as hyperactive delirium. Do not attribute to "baseline" without verifying with family or prior documentation.

Antipsychotics are generally NOT beneficial for hypoactive delirium — focus on identifying and treating the underlying cause.',
 '[1,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-etiology', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-hyperactive', 'delirium', 'info', 2,
 'Hyperactive / Mixed Delirium',
 'RASS +1 to +4. Agitation, combativeness, psychomotor hyperactivity, hallucinations, delusions.

**Higher recognition rate** than hypoactive subtype — these patients are obvious. Immediate safety concern for patient and staff.

**Mixed delirium** fluctuates between hyperactive and hypoactive states — most persistent course.

**Distinguish from primary psychiatric disorder:**
• Delirium: acute onset, fluctuating, inattention, known medical precipitant, altered consciousness
• Primary psychosis: chronic/subacute, organized delusions, intact attention, stable vital signs
• Key: new-onset "psychiatric" symptoms in a patient without psychiatric history should be assumed medical until proven otherwise

**Common causes:** Drug intoxication/withdrawal, pain, infection/sepsis, metabolic crisis, CNS pathology.

May require immediate pharmacological management to ensure safety — but always search for underlying etiology concurrently.',
 '[1,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-etiology', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-exds', 'delirium', 'info', 2,
 'Excited Delirium Syndrome',
 '[Excited Delirium Syndrome](#/info/del-exds-info) — full recognition criteria and management.

**Medical emergency** with ~10% case fatality rate. Most deaths from cardiac arrhythmia (PEA, asystole).

**Recognition — 6 of 10 criteria = probable ExDS:**
1. Pain tolerance
2. Tachypnea
3. Sweating / tactile hyperthermia
4. Agitation with unusual strength
5. Noncompliance with police/first responders
6. Lack of tiring despite prolonged struggle
7. Inappropriate clothing (often undressing)
8. Mirror/glass attraction
9. Bizarre behavior
10. Male sex

**Underlying etiologies:** Sympathomimetic intoxication (cocaine, methamphetamine), psychiatric illness with medication noncompliance, or combination.

**Metabolic derangements:** Rhabdomyolysis, hyperkalemia, acidosis, dehydration. Temperature >104°F is the single best predictor of death.

**IMMEDIATE:** Remove from prone position (positional asphyxia risk), begin active cooling, establish IV access → proceed to ExDS management.',
 '[1,12]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-exds-mgmt', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-etiology', 'delirium', 'question', 2,
 'Etiology Assessment',
 'Delirium is a SYMPTOM — always search for the underlying precipitant. Multiple causes often coexist. In 13% of cases, no precipitant is identified.

[Precipitating Factors for Delirium](#/info/del-precipitants) — comprehensive list of critical, emergent, and iatrogenic causes.
[Vulnerability Factors](#/info/del-vulnerability) — patient risk factors that lower the threshold for delirium.

**Most common precipitants:**
• **Infection** (16-67% of cases) — UTI and pneumonia predominate
• **Medications** — anticholinergics, sedatives, opioids, polypharmacy
• **Metabolic** — Na, Ca, glucose, hepatic/renal failure
• **Intracranial** — stroke, hemorrhage, seizure
• **Intoxication/withdrawal** — alcohol, benzodiazepines, stimulants

Which category is most likely based on your clinical assessment?',
 '[1,3]'::jsonb, '[{"label":"Infection suspected","description":"Fever, UTI symptoms, pneumonia signs, immunocompromised","next":"del-infection"},{"label":"Metabolic / endocrine","description":"Electrolyte abnormality, hepatic/renal failure, thyroid, glucose","next":"del-metabolic"},{"label":"Intracranial pathology","description":"Focal deficits, trauma, anticoagulation, seizure, meningeal signs","next":"del-intracranial"},{"label":"Toxic / medication-related","description":"New medications, polypharmacy, intoxication, withdrawal","next":"del-toxic"},{"label":"Multifactorial or unclear","description":"No single clear etiology — proceed with broad workup","next":"del-workup"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 8)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-infection', 'delirium', 'info', 2,
 'Infection-Precipitated Delirium',
 '**Infection is the most common precipitant** — cited in 16-67% of cases, particularly in the elderly.

**Most common sources:**
• **Urinary tract infection** — most common infectious cause in elderly. Delirium may be the ONLY presenting sign — fever is absent in up to 50% of elderly patients with UTI.
• **Pneumonia** — second most common. Cough and dyspnea may be absent. Tachypnea or hypoxia may be the only clue.
• **Skin/soft tissue infection** — cellulitis, infected wounds, decubitus ulcers
• **Bacteremia/sepsis** — check lactate, blood cultures
• **Intra-abdominal** — cholecystitis, appendicitis, diverticulitis, C. diff

**Workup:** CBC, UA with culture, CXR, blood cultures if febrile. Lactate. Consider CT abdomen/pelvis if no clear source. LP if meningeal signs, immunocompromised, or no clear source in elderly with fever.

**Treatment:** Empiric antibiotics based on suspected source. IV fluids for dehydration. Delirium often resolves with treatment of infection, though resolution may lag behind clinical improvement by days.',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-nonpharm', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-metabolic', 'delirium', 'info', 2,
 'Metabolic / Endocrine Causes',
 '**Common metabolic precipitants:**

• **Sodium disorders** — hypo- and hypernatremia. [Sodium Disorders](#/tree/sodium) consult for management.
• **Hypercalcemia** — malignancy, hyperparathyroidism. "Stones, bones, groans, moans, psychiatric overtones."
• **Hepatic encephalopathy** — check ammonia level. Lactulose, rifaximin.
• **Uremia** — BUN/Cr ratio >18 associated with increased delirium risk.
• **Hypoglycemia / hyperglycemia** — DKA, HHS
• **Thyroid** — myxedema coma (hypothyroid), thyroid storm (hyperthyroid)
• **B12 / folate deficiency** — subacute, but worth checking in undifferentiated cases
• **Hypoxia / hypercarbia** — ABG if respiratory disease or unreliable SpO2

**Workup:** BMP (Na, K, Ca, Mg, Phos, glucose, BUN/Cr), LFTs, ammonia, TSH, VBG/ABG, lactate.

**Predictive markers for delirium:** Elevated serum bicarbonate, elevated glucose, elevated BUN:Cr ratio, low hemoglobin, low chloride.',
 '[1,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-nonpharm', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-intracranial', 'delirium', 'info', 2,
 'Intracranial Pathology',
 '**Structural and neurologic causes of delirium:**

• **Stroke** — both ischemic and hemorrhagic. Delirium can be the presenting symptom, especially posterior circulation strokes.
• **Subdural hematoma** — especially in elderly on anticoagulants. May present without clear trauma history.
• **Subarachnoid hemorrhage** — "worst headache of life" may be absent in elderly; delirium may predominate.
• **Meningitis / encephalitis** — fever + meningeal signs + AMS. [Meningitis/Encephalitis](#/tree/meningitis) consult for workup.
• **Seizure / postictal state** — consider NCSE if persistent AMS without convulsions. EEG when available.
• **Space-occupying lesion** — tumor, abscess.
• **Normal pressure hydrocephalus** — triad: wet, wacky, wobbly (incontinence, dementia, gait disturbance).

**Workup:** CT head non-contrast if: focal neurologic deficits, anticoagulation, trauma history, new-onset seizure. LP if: fever + meningeal signs, immunocompromised, or no clear cause. CT yield for undifferentiated delirium without focal deficits is only ~5%.

**Neurologic exam:** Focus on focal/lateralizing signs, cranial nerves, cerebellar signs (gait, truncal ataxia). Mental status exam: orientation, attention, recall, language.',
 '[1,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-nonpharm', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-toxic', 'delirium', 'info', 2,
 'Toxic / Medication-Related Delirium',
 '**Medications are a particularly prevalent cause** — especially in the elderly. Even without new prescriptions, dose changes and OTC interactions can precipitate delirium.

**Beers Criteria high-risk medications:**
• **Anticholinergics** — diphenhydramine, promethazine, scopolamine, oxybutynin, TCAs
• **Benzodiazepines** — independent risk factor for delirium
• **Opioids** — especially meperidine (highest risk)
• **Sedative-hypnotics** — zolpidem, eszopiclone
• **H2-receptor antagonists** — ranitidine, famotidine
• **Corticosteroids** — especially high-dose pulse therapy
• **Fluoroquinolones** — CNS effects underrecognized

**Intoxication syndromes:**
• Sympathomimetic (cocaine, meth): agitation, tachycardia, hyperthermia, mydriasis
• Anticholinergic: "red as a beet, dry as a bone, hot as a hare, blind as a bat, mad as a hatter"
• Serotonin syndrome: altered mental status + neuromuscular excitability + autonomic instability

**Withdrawal syndromes:**
• Alcohol: tremor, tachycardia, hallucinations, seizures, DT
• Benzodiazepine: similar to alcohol withdrawal
• Opioid: NOT typically delirious, more dysphoria/GI symptoms

**Workup:** Detailed medication reconciliation. Urine drug screen (interpret cautiously — false positives/negatives). Serum ethanol. Acetaminophen/salicylate levels if intentional ingestion suspected.',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-nonpharm', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-workup', 'delirium', 'info', 2,
 'Directed Diagnostic Workup',
 '**Directed by history, physical, and differential** — not a shotgun approach. Clinical judgment and common sense are the consensus recommendation.

**For ALL patients with suspected delirium:**
• Fingerstick glucose (already done)
• BMP: Na, K, Ca, Mg, glucose, BUN/Cr
• CBC with differential
• Urinalysis with culture
• VBG or ABG with lactate
• **ECG** — arrhythmia, MI (delirium is the ONLY symptom in up to 5% of elderly STEMI), QTc baseline (needed before antipsychotics)

**Consider based on clinical suspicion:**
• LFTs, lipase, ammonia — hepatic/abdominal causes
• TSH — thyroid disorders
• Blood cultures — if febrile or suspected bacteremia
• Troponin — if cardiac cause suspected
• CK — if rhabdomyolysis risk (prolonged agitation, restraints, ExDS)
• Urine drug screen — co-ingestions, atypical presentations (interpret with caution)
• Blood gas — if hypercarbia suspected (COPD, hypoventilation)

**Imaging:**
• CT head non-contrast: if focal neuro deficits, anticoagulated, trauma, new seizure. Yield ~5% in undifferentiated delirium without focal findings, but subacute/chronic findings (hydrocephalus, old infarcts, SDH) may guide care.
• CXR: if respiratory symptoms or fever

**Lower threshold for LP:** Undifferentiated elderly with fever, immunocompromised, suspected NCSE, or encephalitis.',
 '[1,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-med-review', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-med-review', 'delirium', 'info', 2,
 'Medication Review',
 '**Systematic medication review is essential** — medications are one of the most common and most easily correctable precipitants.

**Check for:**
• New medications started within past 2 weeks
• Recent dose changes (up or down)
• Drug-drug interactions (especially CYP inhibitors/inducers)
• Polypharmacy (≥5 medications independently increases delirium risk)
• Anticholinergic burden — cumulative effect of multiple low-anticholinergic drugs
• Recent discontinuation of chronic medications (withdrawal risk)

**High-risk medication classes (Beers Criteria):**
• Anticholinergics (diphenhydramine, oxybutynin, TCAs)
• Benzodiazepines (alprazolam, lorazepam, diazepam)
• Opioids (especially meperidine — highest delirium risk)
• Sedative-hypnotics (zolpidem)
• First-generation antihistamines
• H2 blockers (ranitidine, famotidine)
• Corticosteroids
• Muscle relaxants (cyclobenzaprine, methocarbamol)

**ED recommendation:** Avoid meperidine — prescribe oxycodone if opioids are necessary. For other classes, weigh risks vs benefits using clinical judgment. Document medication review in chart.

**Iatrogenic precipitants in ED/hospital:** Physical restraints, bladder catheter, addition of ≥3 new medications, sleep disruption, malnutrition.',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-nonpharm', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;


-- MODULE 3: NONPHARMACOLOGICAL MANAGEMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-nonpharm', 'delirium', 'info', 3,
 'Nonpharmacological Interventions',
 '**First-line treatment for mild-moderate agitation** in cooperative patients. Also used to prevent iatrogenic delirium.

[Verbal De-escalation: 10 Elements](#/info/del-deescalation) — AAEP Project BETA evidence-based guidelines.

**Environmental modifications:**
• Reduce excessive stimulation (noise, bright lights, alarms)
• Reorient patient frequently — clock, calendar, familiar objects
• Facilitate verbal orientation from family members
• Provide visual and hearing assistive devices (glasses, hearing aids)
• Maintain sleep-wake cycle — adequate daytime lighting, minimize nighttime interruptions
• Ensure adequate hydration and nutrition

**Minimize iatrogenic triggers:**
• Remove unnecessary lines, leads, and catheters (Foley catheters are a known delirium precipitant)
• Avoid medications known to precipitate delirium
• Limit tethering and medical procedures when possible
• Allow patient mobility within safety bounds

**TADA approach:** Tolerate, Anticipate, Don''t Agitate — allow patient leeway to mobilize and voice discontent within safety bounds. Stop reorientation when it exacerbates agitation.

**One-to-one observation** — perceived efficacy of 48%. Dedicated sitter for high-risk patients.

For patients requiring physical restraint, see: [Physical Restraints](#/node/del-restraints)',
 '[1,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-pharm-decision', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-restraints', 'delirium', 'info', 3,
 'Physical Restraints',
 '**Temporizing measure only** — physical restraints can paradoxically INCREASE agitation and risk of injury. Associated with significant injuries and death by asphyxiation.

**Indications:**
• Imminent danger to patient or staff despite verbal de-escalation
• Violent/severely agitated patient requiring medical workup
• To facilitate pharmacological management in dangerous agitation

**Proper technique:**
• Minimum 5-person team (1 per extremity + team leader at head)
• Remove all objects that could be used as weapons
• Supine position with **head of bed elevated** to prevent aspiration
• Team leader controls head while others secure extremities in extension
• **Soft restraints** preferred over leather (less injury risk)
• Secure to bed frame, not side rails

**Monitoring requirements:**
• Reassess q15 minutes: neurovascular checks, position, basic needs
• Re-evaluate need for restraints q1-2 hours
• Anticipate basic needs (voiding, hydration, repositioning)
• **NEVER prone positioning** — risk of positional asphyxia
• Document indication, type, and monitoring

**Concurrent pharmacological management** should be initiated to facilitate restraint removal as quickly as possible.',
 '[1,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-pharm-decision', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-pharm-decision', 'delirium', 'question', 3,
 'Pharmacological Treatment Needed?',
 '**Pharmacological treatment is second-line** — used when nonpharmacological interventions are ineffective and patient/staff safety is at risk.

**Consider pharmacological management when:**
• Severe agitation threatening patient or staff safety
• Physical restraints required to facilitate medical evaluation
• Patient unable to cooperate with essential diagnostic workup
• Agitation interfering with critical medical care (preventing IV access, ET tube, etc.)

**Do NOT routinely sedate hypoactive delirium** — antipsychotics are not beneficial in hypoactive delirium (MIND-USA trial: haloperidol was ineffective when 89% of patients had hypoactive delirium). Focus on treating the underlying cause.

[Medications for Acute Agitation](#/info/del-meds-table) — drug comparison table with dosing, onset, and side effects.',
 '[1,2,11]'::jsonb, '[{"label":"Yes — agitated, danger to self or staff","description":"Requires pharmacological sedation to facilitate safe evaluation","next":"del-population","urgency":"urgent"},{"label":"Not acutely needed","description":"Hypoactive, controlled with nonpharmacological measures, or etiology being treated","next":"del-monitoring"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"rass","label":"RASS Score"}]'::jsonb, 17)
;


-- MODULE 4: PHARMACOLOGICAL MANAGEMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-population', 'delirium', 'question', 4,
 'Patient Population',
 '**Pharmacological management should be tailored** to the patient''s age, comorbidities, and suspected etiology. The ideal agent targets the underlying etiology, has rapid onset, and minimal side effects.

**Key principle:** "Start low and go slow" — especially in elderly patients. Use the minimum effective dose.

[Medications for Acute Agitation](#/info/del-meds-table) — dosing, onset, contraindications by agent.

Which population best describes this patient?',
 '[1,2]'::jsonb, '[{"label":"Young adult / undifferentiated","description":"Age <65, no Parkinson''s, no active intoxication/withdrawal","next":"del-young-adult"},{"label":"Elderly (age ≥65)","description":"Reduce all doses by 50%. Avoid benzodiazepines.","next":"del-elderly"},{"label":"Parkinson''s disease or Lewy body dementia","description":"Avoid typical antipsychotics — use quetiapine","next":"del-parkinsons"},{"label":"Intoxication or withdrawal syndrome","description":"Alcohol, benzodiazepine, or stimulant related","next":"del-intox-withdrawal"},{"label":"Excited delirium syndrome","description":"Extreme agitation + hyperthermia + metabolic crisis","next":"del-exds-mgmt","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-young-adult', 'delirium', 'info', 4,
 'Standard Adult Agitation',
 '**First-line options (choose one):**

**Option 1 — Butyrophenone + benzodiazepine:**
• [Haloperidol](#/drug/haloperidol/agitation) 5-10 mg IM + [Midazolam](#/drug/midazolam/agitation) 2.5-5 mg IM
• Classic "B52" variant. Combination therapy achieves more rapid symptom resolution than either agent alone.
• QTc monitoring required after haloperidol.

**Option 2 — Droperidol monotherapy:**
• [Droperidol](#/drug/droperidol/agitation) 5 mg IM
• Faster onset (3-10 min) and more sedating than haloperidol. FDA black box for QTc, but real-world risk is very low.

**Option 3 — Olanzapine monotherapy:**
• [Olanzapine](#/drug/olanzapine/agitation) 10 mg IM
• **No QTc prolongation.** No dystonia. Equally effective as haloperidol.
• **⚠️ DO NOT combine with parenteral benzodiazepines** — risk of fatal respiratory depression and hypotension.

Wait ≥20 min before redosing. If 10 mg cumulative of any agent produces no response, reconsider etiology and try a different class.

**QTc >500 ms?** Use olanzapine (no QTc effect) or benzodiazepines alone.',
 '[1,2,9,10]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-elderly', 'delirium', 'info', 4,
 'Elderly / Geriatric Agitation',
 '**Reduce ALL doses by 50%.** Elderly patients are more sensitive to both therapeutic and adverse effects.

**First-line:**
• [Haloperidol](#/drug/haloperidol/elderly agitation) 0.5-2 mg IM or IV
• OR [Olanzapine](#/drug/olanzapine/elderly agitation) 2.5-5 mg IM

**AVOID benzodiazepines in elderly delirium:**
• Independent risk factor for delirium
• Increased fall risk
• Paradoxical agitation
• Respiratory depression
• Oversedation

**For mild agitation (cooperative patient):**
• [Quetiapine](#/drug/quetiapine/delirium) 25-50 mg PO — significant sedation at low doses
• [Risperidone](#/drug/risperidone/delirium) 0.5-1 mg PO — less sedating

**⚠️ Black box warning:** All antipsychotics carry increased mortality risk (1.6-1.7×) in elderly patients with dementia-related psychosis. However, acute delirium management in the ED represents a different risk-benefit calculation — untreated delirium also carries significant mortality.

**Document:** Risk-benefit discussion, lowest effective dose used, monitoring plan.',
 '[1,2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-parkinsons', 'delirium', 'info', 4,
 'Parkinson''s Disease / Lewy Body Dementia',
 '**AVOID typical antipsychotics** (haloperidol, droperidol) — high D2 receptor blockade worsens motor symptoms and can trigger severe neuroleptic sensitivity reactions in Lewy body dementia.

**First-line — Quetiapine:**
• [Quetiapine](#/drug/quetiapine/parkinsons) 12.5-25 mg PO
• **Lowest D2 receptor affinity** of all antipsychotics — least likely to worsen motor symptoms
• Shown NOT to affect motor symptoms of Parkinson disease
• PO only — limits use in severe agitation

**If severe agitation and PO not feasible:**
• Low-dose [Midazolam](#/drug/midazolam/agitation) 1-2 mg IM — avoid high doses
• Low-dose [Olanzapine](#/drug/olanzapine/parkinsons) 2.5 mg IM — moderate D2 affinity, still safer than typical antipsychotics. Use with caution.

**Lewy body dementia specifics:**
• Fluctuating cognition and visual hallucinations are baseline features — can mimic delirium
• Extreme sensitivity to antipsychotics — even "safe" agents can trigger life-threatening reactions
• Diagnosis of exclusion — always evaluate for underlying medical precipitant first

**Key:** Consult neurology early for these patients.',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-intox-withdrawal', 'delirium', 'info', 4,
 'Intoxication / Withdrawal Syndromes',
 '**Benzodiazepines are the drug of choice** for agitation related to intoxication or withdrawal.

**Alcohol / sedative withdrawal:**
• [Lorazepam](#/drug/lorazepam/agitation) 1-2 mg IV or [Midazolam](#/drug/midazolam/agitation) 2.5-5 mg IM
• May require large, repeated doses for delirium tremens
• Benzodiazepines have protective benefit against alcohol withdrawal seizures
• For severe alcohol withdrawal, see phenobarbital protocol

**Sympathomimetic intoxication (cocaine, methamphetamine):**
• **Benzodiazepines preferred** — [Midazolam](#/drug/midazolam/agitation) 5 mg IM or [Lorazepam](#/drug/lorazepam/agitation) 2 mg IV
• **AVOID antipsychotics** in acute stimulant intoxication — lower seizure threshold, impair thermoregulation, may worsen hyperthermia
• Active cooling if hyperthermic. IV fluids aggressively.

**Anticholinergic toxidrome:**
• Physostigmine 0.5-2 mg IV slow push if classic toxidrome and no contraindications
• Benzodiazepines for agitation if physostigmine unavailable or contraindicated
• Avoid antipsychotics (additional anticholinergic effects with typical agents)

**Serotonin syndrome:**
• Benzodiazepines for agitation and muscle rigidity
• Cyproheptadine 12 mg PO/NG, then 4 mg q4-6h
• Active cooling. Avoid antipsychotics.',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-exds-mgmt', 'delirium', 'info', 4,
 'Excited Delirium Syndrome — Management',
 '**Medical emergency — high mortality.** Most deaths from cardiac arrhythmia (PEA, asystole). Sudden unexpected death can occur even after apparent stabilization.

**IMMEDIATE actions:**
• **Remove from prone position** — positional asphyxia risk
• **Aggressive cooling** — target temperature <101°F (38.3°C). Ice packs to axillae/groin, cold IV fluids, mist + fan
• **Large-bore IV access** — establish early. Aggressive IV normal saline
• **Continuous cardiac monitoring** — anticipate arrhythmia

**Sedation:**
• [Midazolam](#/drug/midazolam/agitation) 5 mg IM — first-line. Repeat as needed q5-10 min.
• For **refractory agitation:** [Ketamine](#/drug/ketamine/agitation) 4 mg/kg IM (onset 5 min, reliable sedation). Prepare for possible intubation (29% intubation rate in one study).

**Monitoring and workup:**
• CK (rhabdomyolysis) — aggressive IV fluids if elevated
• K+ (hyperkalemia from rhabdomyolysis) — treat aggressively
• VBG with lactate (acidosis)
• Creatinine (renal failure)
• Core temperature q15 min
• Continuous telemetry — monitor for arrhythmia

**Disposition:** ICU admission mandatory. Cardiac monitoring minimum 24 hours. Continue aggressive hydration and temperature management.',
 '[1,2,12]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 23)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-response', 'delirium', 'question', 4,
 'Treatment Response',
 '**Reassess 15-20 minutes after pharmacological intervention.**

Target RASS score: **0 to -1** (alert and calm to drowsy). Oversedation increases aspiration risk, delays evaluation, and masks clinical deterioration.

Monitor: respiratory rate, SpO2, blood pressure, level of consciousness. Maintain head of bed elevated.',
 '[1]'::jsonb, '[{"label":"Adequate sedation achieved","description":"RASS 0 to -1, patient and staff safe, able to proceed with evaluation","next":"del-monitoring"},{"label":"Inadequate — needs escalation","description":"Persistent severe agitation despite initial treatment","next":"del-escalation","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"rass","label":"RASS Score"}]'::jsonb, 24)
;


-- MODULE 5: MONITORING
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-escalation', 'delirium', 'info', 5,
 'Treatment Escalation',
 '**If initial agent ineffective after adequate dose and time:**

1. **Redose** at the same or slightly higher dose after appropriate interval (≥20 min for antipsychotics, ≥10 min for BZDs)
2. **Switch routes** — IV if IM not effective (faster, more reliable absorption)
3. **Add a second class:**
   • If antipsychotic alone failed → add benzodiazepine (unless olanzapine was used — switch to haloperidol first, THEN add BZD)
   • If benzodiazepine alone failed → add antipsychotic
   • Combination therapy (antipsychotic + BZD) is superior to either class alone for rapid resolution
4. **Ketamine** for refractory agitation: [Ketamine](#/drug/ketamine/agitation) 1-2 mg/kg IV or 4 mg/kg IM
   • Use when traditional agents fail
   • Prepare for possible intubation
   • Avoid in elderly and patients with heart disease or schizophrenia

**If unable to protect airway** — intubation may be required. This is a management endpoint, not a failure.

**If cumulative dose of any single agent exceeds reasonable range** (haloperidol >20 mg, midazolam >15 mg), reconsider the diagnosis — is there an untreated underlying cause driving persistent agitation?',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-monitoring', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 25)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-monitoring', 'delirium', 'info', 5,
 'Post-Treatment Monitoring',
 '**All patients receiving pharmacological sedation require close monitoring:**

**Respiratory:**
• Continuous pulse oximetry
• **Capnography (ETCO2) recommended** — detects hypoventilation earlier than SpO2, especially after benzodiazepines
• Supplemental O2 as needed
• Have BVM, suction at bedside

**Cardiac:**
• Continuous telemetry if antipsychotic administered
• **QTc monitoring:** Obtain ECG post-treatment for haloperidol/droperidol. QTc >500 ms or increase >60 ms from baseline → discontinue agent, correct electrolytes (K, Mg)
• Monitor for arrhythmia (torsades de pointes risk with typical antipsychotics)

**Neurologic:**
• Reassess RASS q15 min — target 0 to -1
• Watch for **extrapyramidal symptoms (EPS):** acute dystonia (neck/jaw rigidity, oculogyric crisis) → treat with diphenhydramine 50 mg IV/IM or benztropine 1-2 mg IV
• Watch for **akathisia** (restlessness) — can be misdiagnosed as worsening agitation. Do NOT escalate antipsychotic dose.

**General:**
• Blood pressure, temperature q15-30 min
• Position: head of bed elevated, lateral positioning if aspiration risk
• Continue etiology workup while patient is sedated
• Reassess need for restraints — remove as soon as safe
• Document all medications, doses, times, and monitoring',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'del-disposition', NULL, NULL, NULL, '[]'::jsonb, '[{"id":"rass","label":"RASS Score"}]'::jsonb, 26)
;


-- MODULE 6: DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-disposition', 'delirium', 'question', 6,
 'Disposition',
 '**Delirium is an independent risk factor for increased morbidity and mortality.** Up to 37% of delirious ED patients are discharged home. Mortality for discharged delirium patients is 2-3× higher at 3-6 months compared to nondelirious patients.

**Key disposition factors:**
• Has the etiology been identified and treated?
• Has the patient returned to baseline mental status?
• Are vital signs stable?
• Is the patient safe for discharge (not living alone with new cognitive impairment)?
• Can reliable follow-up be arranged?

**Observation units** may NOT be optimal — one study showed similar 30% mortality rate for delirious patients in observation vs 10% for nondelirious patients.

**Team-based disposition** is recommended — consider geriatric consult, social work, care coordination for complex elderly patients.',
 '[1,3,5]'::jsonb, '[{"label":"Admit — ICU","description":"Excited delirium, intubated, hemodynamic instability, refractory agitation, arrhythmia","next":"del-admit","urgency":"critical"},{"label":"Admit — floor or observation","description":"New-onset delirium, persistent AMS, elderly with infection, unable to maintain PO, fall risk","next":"del-admit","urgency":"urgent"},{"label":"Discharge candidate","description":"Clear reversible cause corrected, returned to baseline, safe environment, reliable follow-up","next":"del-discharge"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 27)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-admit', 'delirium', 'result', 6,
 'Admission',
 '**ICU admission criteria:**
• Excited delirium syndrome
• Intubated for airway protection
• Hemodynamic instability
• Cardiac arrhythmia (post-sedation or underlying)
• Refractory agitation requiring continuous infusion
• Rhabdomyolysis with renal failure

**Floor / observation admission criteria:**
• New-onset delirium without clear reversible cause
• Persistent altered mental status
• Elderly with infection + delirium (even if "just UTI")
• Unable to maintain adequate oral intake
• Fall risk / unsafe for discharge
• Need for inpatient medication adjustment
• Pending further workup (LP, MRI, EEG)

**Communicate to admitting team:**
• Baseline cognitive status and timeline of changes
• Medications administered in ED and response
• Current RASS score and QTc
• Suspected etiology and workup results
• Medications to AVOID (Beers criteria, patient-specific contraindications)
• Recommend multicomponent nonpharmacological delirium prevention protocol',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit for further evaluation and management of delirium. Communicate baseline status, ED interventions, and suspected etiology to admitting team.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 28)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('del-discharge', 'delirium', 'result', 6,
 'Discharge with Follow-Up',
 '**Discharge may be appropriate when ALL of the following are met:**
• Clear reversible cause identified AND corrected (e.g., hypoglycemia, UTI in young patient)
• Patient has returned to documented baseline mental status
• Vital signs stable and normalizing
• Safe home environment with capable caregiver present
• Reliable follow-up arranged within 24-48 hours
• Patient and caregiver understand return precautions

**Discharge planning:**
• Medication reconciliation — discontinue or adjust delirium-precipitating medications
• Written discharge instructions (but recognize that delirious/recently delirious patients have markedly decreased comprehension of discharge instructions)
• Ensure caregiver understands the diagnosis and return precautions
• PCP follow-up within 24-48 hours
• Consider geriatric referral for elderly patients

**⚠️ Caution:** Patients with delirium have increased 30-day readmission rates and 2-3× increased mortality at 3-6 months even after discharge. Lower your threshold for admission in elderly patients with multiple vulnerability factors.

**Document:** Baseline mental status, return to baseline confirmed, etiology identified and treated, safe disposition plan, follow-up arranged.',
 '[1,3,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Discharge with close follow-up. Ensure caregiver understands return precautions and follow-up plan.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 29)
;


-- 5. drugs (5 new drugs)
INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('haloperidol', 'Haloperidol (Haldol)', 'Haloperidol', 'Typical antipsychotic (butyrophenone)', 'IV/IM',
 '["Acute agitation / delirium","Elderly agitation"]'::jsonb,
 '[{"indication":"Acute agitation / delirium","regimen":"5-10 mg IM (onset 10-20 min) or IV push over 5 min (onset 3-5 min). May repeat q20-30 min PRN. Max 20 mg in 24h. Often combined with midazolam 2.5-5 mg IM and diphenhydramine 50 mg IM for dystonia prophylaxis (\"B52\" variant).","weightCalc":{"dosePerKg":0.1,"unit":"mg","maxDose":10}},{"indication":"Elderly agitation","regimen":"0.5-2 mg IM or IV push. Start with lowest effective dose (0.5-1 mg). May repeat q30-60 min. Max 5 mg in 24h. Higher risk of EPS and oversedation in elderly. All antipsychotics carry FDA black box for increased mortality in elderly with dementia-related psychosis."}]'::jsonb,
 '["QTc >500 ms or history of torsades de pointes","Parkinson disease or Lewy body dementia (worsens motor symptoms, risk of neuroleptic sensitivity)","CNS depression / coma","Known hypersensitivity"]'::jsonb,
 '["QTc prolongation — obtain baseline ECG before and repeat after dosing","Extrapyramidal symptoms (EPS): acute dystonia treated with diphenhydramine 50 mg IV/IM or benztropine 1-2 mg IV","Akathisia (restlessness) — can be misdiagnosed as worsening agitation. Do NOT escalate dose.","Neuroleptic malignant syndrome (rare): rigidity, hyperthermia, autonomic instability, elevated CK","FDA black box: increased mortality in elderly with dementia-related psychosis (1.6-1.7×)","Lowers seizure threshold","IV route carries higher QTc risk than IM"]'::jsonb,
 'Continuous telemetry (QTc monitoring). ECG before and after dosing. Reassess RASS q15 min. Monitor temperature. Watch for EPS/dystonia/akathisia.',
 'Most studied antipsychotic for ED agitation. High D2 receptor selectivity — effective for psychosis and agitation but higher EPS risk than atypical antipsychotics. Consider droperidol for faster onset and more sedation, or olanzapine for no QTc risk and no dystonia. If patient not responding to 10 mg cumulative, reconsider etiology — try a different drug class rather than escalating dose.',
 NULL,
 '["Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).","Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024."]'::jsonb,
 0)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, generic_name=EXCLUDED.generic_name, drug_class=EXCLUDED.drug_class, route=EXCLUDED.route, indications=EXCLUDED.indications, dosing=EXCLUDED.dosing, contraindications=EXCLUDED.contraindications, cautions=EXCLUDED.cautions, monitoring=EXCLUDED.monitoring, notes=EXCLUDED.notes, citations=EXCLUDED.citations;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('droperidol', 'Droperidol (Inapsine)', 'Droperidol', 'Typical antipsychotic (butyrophenone)', 'IV/IM',
 '["Acute agitation / delirium"]'::jsonb,
 '[{"indication":"Acute agitation / delirium","regimen":"2.5-5 mg IM or IV. Onset 3-10 min (faster than haloperidol). More sedating than haloperidol due to greater H1 and 5-HT2A activity. May repeat once at 15-20 min. Max 10 mg in 24h. ~2-3× more potent than haloperidol.","weightCalc":{"dosePerKg":0.05,"unit":"mg","maxDose":5}}]'::jsonb,
 '["QTc >500 ms or history of torsades de pointes","Parkinson disease or Lewy body dementia","Known or suspected QT-prolonging medications (relative)"]'::jsonb,
 '["FDA black box (2001) for QT prolongation — but real-world risk appears very low. Retrospective study of 2,468 patients found no causal relationship between droperidol and serious adverse cardiac events.","QTc effect is comparable to haloperidol, ondansetron, and many common ED medications","Hypotension (alpha-1 blockade) — more common than with haloperidol. Have IV fluids available.","More sedating than haloperidol — may be preferred when sedation is the goal","FDA black box: increased mortality in elderly with dementia-related psychosis"]'::jsonb,
 'ECG before and after dosing (per black box). Telemetry monitoring. Blood pressure. Reassess RASS q15 min.',
 'Fell out of favor after 2001 FDA black box warning, but multiple studies and the AAEP have called for re-evaluation. May be superior to haloperidol for acute agitation: faster onset, greater sedation, and similar QTc profile. Greater 5-HT2A blockade may reduce extrapyramidal side effects compared to haloperidol. Consider as first-line for undifferentiated severe agitation when rapid sedation is needed.',
 NULL,
 '["Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).","Chase PB, Biros MH. A Retrospective Review of the Use and Safety of Droperidol. Acad Emerg Med. 2002;9(12):1402-1410.","Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024."]'::jsonb,
 1)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, generic_name=EXCLUDED.generic_name, drug_class=EXCLUDED.drug_class, route=EXCLUDED.route, indications=EXCLUDED.indications, dosing=EXCLUDED.dosing, contraindications=EXCLUDED.contraindications, cautions=EXCLUDED.cautions, monitoring=EXCLUDED.monitoring, notes=EXCLUDED.notes, citations=EXCLUDED.citations;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('olanzapine', 'Olanzapine (Zyprexa)', 'Olanzapine', 'Atypical antipsychotic (thienobenzodiazepine)', 'IM/PO',
 '["Acute agitation / delirium","Elderly agitation","Parkinson''s — low-dose alternative"]'::jsonb,
 '[{"indication":"Acute agitation / delirium","regimen":"10 mg IM (onset 15-45 min). May repeat 5-10 mg after ≥2 hours. Max 30 mg/24h. PO: 5-10 mg (onset 30-60 min, requires cooperation). Orally disintegrating tablet (Zyprexa Zydis) dissolves on tongue — reduces hiding/cheeking risk."},{"indication":"Elderly agitation","regimen":"2.5-5 mg IM. Lower dose due to increased sensitivity. May repeat once after ≥2 hours. Max 15 mg/24h."},{"indication":"Parkinson''s — low-dose alternative","regimen":"2.5 mg IM. Moderate D2 affinity — less motor worsening than typical antipsychotics but use with caution. Quetiapine PO preferred if patient can take oral medications."}]'::jsonb,
 '["Co-administration with parenteral (IM/IV) benzodiazepines — risk of fatal respiratory depression and hypotension","Severe hemodynamic instability / hypotension"]'::jsonb,
 '["⚠️ DO NOT give with IM or IV benzodiazepines — multiple case reports of respiratory arrest and death. PO olanzapine + PO lorazepam is acceptable (different pharmacokinetics).","No significant QTc prolongation — major advantage over haloperidol and droperidol","No dystonia risk — advantage over typical antipsychotics","Orthostatic hypotension — keep patient supine after IM injection","FDA black box: increased mortality in elderly with dementia-related psychosis","Hyperglycemia risk with repeated/chronic dosing (not relevant to single ED dose)"]'::jsonb,
 'Blood pressure, SpO2, respiratory rate closely after IM. No telemetry required (no QTc effect). Reassess RASS q15 min.',
 'Equally effective as haloperidol for acute agitation with fewer side effects. Key advantages: NO QTc prolongation (use when QTc is borderline/prolonged), NO dystonia. Key limitation: CANNOT combine with parenteral benzodiazepines. If patient needs both antipsychotic and benzodiazepine, use haloperidol + midazolam instead. The TREC trial showed IM olanzapine was as effective as IM haloperidol + promethazine for acute agitation.',
 NULL,
 '["Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).","Chan EW, et al. IV Droperidol or IM Olanzapine as Adjunct to Midazolam for Acutely Agitated Patient. Ann Emerg Med. 2013;61(1):72-81.","Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024."]'::jsonb,
 2)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, generic_name=EXCLUDED.generic_name, drug_class=EXCLUDED.drug_class, route=EXCLUDED.route, indications=EXCLUDED.indications, dosing=EXCLUDED.dosing, contraindications=EXCLUDED.contraindications, cautions=EXCLUDED.cautions, monitoring=EXCLUDED.monitoring, notes=EXCLUDED.notes, citations=EXCLUDED.citations;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('quetiapine', 'Quetiapine (Seroquel)', 'Quetiapine fumarate', 'Atypical antipsychotic (dibenzothiazepine)', 'PO',
 '["Mild agitation / delirium (PO)","Parkinson''s / Lewy body delirium"]'::jsonb,
 '[{"indication":"Mild agitation / delirium","regimen":"25-100 mg PO. Onset 30-60 min. Significant sedation at low doses (25-50 mg) due to H1 histamine blockade — functions primarily as a sedative at these doses, not an antipsychotic. May repeat q4-6h. Max 200 mg/24h in acute setting."},{"indication":"Parkinson''s / Lewy body delirium","regimen":"12.5-25 mg PO. Lowest D2 receptor affinity of ALL antipsychotics — least likely to worsen motor symptoms. Has been shown NOT to affect motor symptoms of Parkinson disease. Start 12.5 mg, titrate cautiously."}]'::jsonb,
 '["Severe hepatic impairment","Known hypersensitivity"]'::jsonb,
 '["PO only — no parenteral formulation. Limits utility for severe ED agitation.","Orthostatic hypotension (alpha-1 blockade) — significant in elderly. Monitor BP after first dose.","At low doses (<150 mg), acts primarily as H1 antihistamine and alpha-1 blocker — sedation without significant antipsychotic effect","Mild QTc prolongation — generally less than haloperidol. Real risk of torsades appears extremely low (4 reported cases in literature, all with multiple confounders).","FDA black box: increased mortality in elderly with dementia-related psychosis"]'::jsonb,
 'Blood pressure (orthostatic risk — check sitting and standing). SpO2. Reassess sedation level q30 min.',
 'Safest antipsychotic for Parkinson disease and Lewy body dementia due to lowest D2 receptor occupancy. At low doses (25-50 mg), it functions like a non-deliriogenic sedative: H1 blockade (sedation) + 5-HT2A blockade (sleep maintenance) without significant dopamine antagonism. Best for mild-moderate delirium in cooperative patients, ICU delirium management, or as a step-down after parenteral sedation. Not useful for acute severe agitation due to PO-only limitation and slow onset.',
 NULL,
 '["Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024.","Devlin JW, et al. Efficacy and Safety of Quetiapine in Critically Ill Patients with Delirium. Crit Care Med. 2010;38(2):419-427."]'::jsonb,
 3)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, generic_name=EXCLUDED.generic_name, drug_class=EXCLUDED.drug_class, route=EXCLUDED.route, indications=EXCLUDED.indications, dosing=EXCLUDED.dosing, contraindications=EXCLUDED.contraindications, cautions=EXCLUDED.cautions, monitoring=EXCLUDED.monitoring, notes=EXCLUDED.notes, citations=EXCLUDED.citations;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('risperidone', 'Risperidone (Risperdal)', 'Risperidone', 'Atypical antipsychotic (benzisoxazole)', 'PO',
 '["Mild agitation / delirium (PO)"]'::jsonb,
 '[{"indication":"Mild agitation / delirium","regimen":"1-2 mg PO. Onset 30-60 min. Less sedating than quetiapine or olanzapine — may be useful when mild antipsychotic effect is desired without heavy sedation. Available as orally disintegrating tablet (Risperdal M-Tab). May repeat q4-6h. Max 4 mg/24h."}]'::jsonb,
 '["Parkinson disease or Lewy body dementia (moderate D2 affinity — higher EPS risk than quetiapine or olanzapine)","Known hypersensitivity"]'::jsonb,
 '["PO only — no parenteral formulation for acute ED use","Higher D2 affinity than quetiapine or olanzapine — moderate EPS risk","Mild-moderate QTc prolongation","Orthostatic hypotension","Hyperprolactinemia (highest risk among atypical antipsychotics)","Lacks anticholinergic effects — theoretically less deliriogenic but may increase EPS","FDA black box: increased mortality in elderly with dementia-related psychosis"]'::jsonb,
 'Blood pressure, ECG if combined with other QTc-prolonging agents. Watch for EPS.',
 'Less commonly used in the ED than haloperidol or olanzapine due to PO-only limitation and slower onset. May be useful as a step-down agent or for semi-cooperative patients needing mild-moderate antipsychotic effect without heavy sedation. The orally disintegrating tablet dissolves on the tongue, reducing hiding/cheeking risk. For acute agitation with psychotic features, oral risperidone + oral lorazepam has shown similar efficacy to IM haloperidol + lorazepam.',
 NULL,
 '["Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024.","Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine)."]'::jsonb,
 4)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, generic_name=EXCLUDED.generic_name, drug_class=EXCLUDED.drug_class, route=EXCLUDED.route, indications=EXCLUDED.indications, dosing=EXCLUDED.dosing, contraindications=EXCLUDED.contraindications, cautions=EXCLUDED.cautions, monitoring=EXCLUDED.monitoring, notes=EXCLUDED.notes, citations=EXCLUDED.citations;


-- 5b. drugs — UPDATE existing entries (3 drugs)
-- Updating Midazolam (Versed) with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Burns anxiolysis","Procedural sedation adjunct","Seizures","Status epilepticus","Refractory SE","Acute agitation / delirium"]'::jsonb,
  dosing = '[{"indication":"Burns — anxiolysis","regimen":"0.02-0.05 mg/kg IV over 2 min. Max 2 mg initial dose. May repeat q5-10 min to effect. Total max ~0.1 mg/kg.","weightCalc":{"dosePerKg":0.05,"unit":"mg","maxDose":2}},{"indication":"Ketamine emergence prophylaxis","regimen":"0.05 mg/kg IV given with ketamine. Reduces emergence reactions in adults.","weightCalc":{"dosePerKg":0.05,"unit":"mg","maxDose":2}},{"indication":"Status Epilepticus — IM (no IV access)","regimen":"0.2 mg/kg IM (max 10 mg). ≥40 kg: 10 mg; 13-40 kg: 5 mg. RAMPART trial: IM midazolam terminated seizures in 73% vs 63% for IV lorazepam. May also give intranasal 0.2 mg/kg via mucosal atomizer.","weightCalc":{"dosePerKg":0.2,"unit":"mg","maxDose":10}},{"indication":"Refractory SE — continuous infusion","regimen":"Load 0.2 mg/kg IV bolus, then infuse 0.05-2 mg/kg/hr. Repeat bolus 0.1-0.2 mg/kg for breakthrough seizures. Titrate to EEG seizure suppression or burst suppression. Requires intubation and continuous EEG monitoring.","weightCalc":{"dosePerKg":0.2,"unit":"mg","label":"Loading bolus"}},{"indication":"Acute agitation / delirium","regimen":"2.5-5 mg IM (onset 5 min) or 2.5 mg IV push. May repeat q5-10 min to effect. Preferred for intoxication/withdrawal-related agitation. For excited delirium: 5 mg IM, repeat as needed. DO NOT combine with IM/IV olanzapine (respiratory depression risk).","weightCalc":{"dosePerKg":0.05,"unit":"mg","maxDose":5}}]'::jsonb,
  contraindications = '["Acute narrow-angle glaucoma","Known hypersensitivity to benzodiazepines"]'::jsonb,
  cautions = '["Respiratory depression — especially when combined with opioids or ketamine","Paradoxical agitation in elderly and pediatric patients","Reduce dose by 30-50% in elderly, hepatic impairment, or when combined with opioids"]'::jsonb,
  monitoring = 'Continuous SpO2, respiratory rate. Have flumazenil available (0.2 mg IV, though rarely needed).',
  notes = 'Short-acting anxiolytic ideal for burn care procedures. At low doses (0.02-0.05 mg/kg) provides anxiolysis without significant sedation. Commonly paired with ketamine to prevent emergence reactions in adults (not needed in children). Amnesia is a therapeutic benefit for painful burn procedures.',
  citations = '["Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359."]'::jsonb
WHERE id = 'midazolam';

-- Updating Lorazepam (Ativan) with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Status epilepticus (first-line IV)","Seizure disorders","Acute agitation (intoxication/withdrawal)"]'::jsonb,
  dosing = '[{"indication":"Status Epilepticus — IV (first-line)","regimen":"0.1 mg/kg IV push over 2 min (max 4 mg/dose). May repeat once in 5-10 min if seizure persists. Total max 8 mg. Preferred IV benzodiazepine — higher seizure termination rate than diazepam (65% vs 56%) and longer anticonvulsant duration.","weightCalc":{"dosePerKg":0.1,"unit":"mg","maxDose":4}},{"indication":"Acute agitation (intoxication/withdrawal)","regimen":"1-2 mg IV push over 1-2 min, or IM. May repeat q10-15 min PRN. Preferred for alcohol/sedative withdrawal-related agitation. Avoid in elderly delirium (independent risk factor for delirium, falls, respiratory depression). Unpredictable IM absorption — IV preferred when available.","weightCalc":{"dosePerKg":0.02,"unit":"mg","maxDose":2}}]'::jsonb,
  contraindications = '["Acute narrow-angle glaucoma","Known hypersensitivity to benzodiazepines","Severe respiratory insufficiency (without ventilatory support)"]'::jsonb,
  cautions = '["Respiratory depression — risk increases with repeated doses, opioid co-administration, and elderly patients","Hypotension with rapid IV push","Requires refrigeration — check for precipitate before administration","Contains propylene glycol — accumulation risk with prolonged/high-dose use","Reduce dose 30-50% in elderly or hepatic impairment","Paradoxical agitation in elderly and pediatric patients"]'::jsonb,
  monitoring = 'Continuous SpO2, respiratory rate, blood pressure. Capnography if available. Have BVM, suction, and flumazenil available. Monitor for return of seizure activity.',
  notes = 'First-line IV benzodiazepine for SE per AES and NCS guidelines. Less lipophilic than diazepam — remains in the brain longer, providing more sustained anticonvulsant effect (12-24h vs 15-30 min for diazepam). Onset: 2-3 min IV. When IV access is unavailable, IM midazolam (not IM lorazepam) is preferred — lorazepam has unpredictable IM absorption. Underdosing of BZDs is a common error that leads to treatment failure.',
  citations = '["Betjemann JP, Bhatt J, Engel A. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).","Silbergleit R, et al. RAMPART: Intramuscular versus Intravenous Therapy for Prehospital SE. N Engl J Med. 2012;366(7):591-600.","Treiman DM, et al. A Comparison of Four Treatments for Generalized Convulsive Status Epilepticus. N Engl J Med. 1998;339(12):792-798."]'::jsonb
WHERE id = 'lorazepam';

-- Updating Ketamine with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Burns analgesia","Burns procedural sedation","RSI induction","Refractory SE","Acute agitation (refractory)"]'::jsonb,
  dosing = '[{"indication":"Burns — sub-dissociative analgesia","regimen":"0.1-0.3 mg/kg IV over 10-15 min. May repeat q15-20 min PRN. Infusion: 0.1-0.2 mg/kg/hr for dressing changes/prolonged procedures.","weightCalc":{"dosePerKg":0.3,"unit":"mg","label":"Sub-dissociative (max dose)"}},{"indication":"Burns — procedural sedation (dissociative)","regimen":"1-2 mg/kg IV over 1 min (onset 1 min, duration 15-20 min). IM: 4-5 mg/kg (onset 5 min, duration 20-30 min). May give additional 0.5-1 mg/kg IV boluses for prolonged procedures.","weightCalc":[{"dosePerKg":1.5,"unit":"mg","label":"IV dissociative"},{"dosePerKg":4,"unit":"mg","label":"IM dissociative"}]},{"indication":"RSI induction","regimen":"1-2 mg/kg IV push. Hemodynamically stable induction agent — ideal for burns/trauma patients.","weightCalc":{"dosePerKg":1.5,"unit":"mg"}},{"indication":"Refractory SE — continuous infusion","regimen":"Load 0.5-3 mg/kg IV bolus, then infuse 0.1-5 mg/kg/hr. NMDA receptor antagonist — different mechanism from GABAergic agents. Consider when midazolam and propofol fail. Some case reports suggest trial of ketamine before other IV anesthetics to potentially avoid intubation. Requires continuous EEG monitoring.","weightCalc":{"dosePerKg":2,"unit":"mg","label":"Loading bolus"}},{"indication":"Acute agitation (refractory)","regimen":"4 mg/kg IM (onset 5 min, reliable sedation) or 1-2 mg/kg IV over 1 min. For refractory agitation not responding to antipsychotics and benzodiazepines. Rapid, reliable onset. Prepare for possible intubation — 29% intubation rate in one prehospital study. Avoid in elderly patients and patients with heart disease or schizophrenia.","weightCalc":[{"dosePerKg":4,"unit":"mg","label":"IM agitation dose"},{"dosePerKg":1.5,"unit":"mg","label":"IV agitation dose"}]}]'::jsonb,
  contraindications = '["Age <3 months (relative)","Known psychotic disorder (relative)"]'::jsonb,
  cautions = '["Emergence reactions (10-20% adults, rare in children) — prophylactic midazolam 0.05 mg/kg can prevent","Laryngospasm (rare, 0.3%) — have suction and BVM ready","Increases secretions — consider glycopyrrolate 0.005 mg/kg if problematic","Brief sympathomimetic effect — increases HR/BP (beneficial in hemodynamically compromised patients)"]'::jsonb,
  monitoring = 'Continuous SpO2, capnography if available, cardiac monitor. Suction and BVM at bedside. Recovery typically 60-120 min.',
  notes = 'Ideal analgesic/sedative for burn patients: provides profound analgesia at sub-dissociative doses, full procedural sedation at dissociative doses, and RSI induction — one drug for three burn care needs. Maintains airway reflexes and spontaneous respirations at dissociative doses. Does NOT cause respiratory depression at analgesic doses. Hemodynamic stability makes it superior to opioids alone for burn resuscitation patients. Particularly valuable for repeated painful procedures (dressing changes, debridement).',
  citations = '["Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.","Bitter CC et al. WMS Clinical Practice Guideline on Care of Burns in the Wilderness. Wilderness Environ Med. 2025;36(4):549-558."]'::jsonb
WHERE id = 'ketamine';


-- 6. info_pages (8 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('delirium-summary', 'Delirium Steps Summary', 'Quick Reference — ED Delirium Management',
 '[{"heading":"Initial Assessment","body":"• [Ensure scene safety — team preparation, security if needed](#/node/del-safety)\n• [Fingerstick glucose, SpO2, temperature — correct immediately](#/node/del-rapid-reversible)\n• [RASS score — determine delirium subtype (hypoactive vs hyperactive)](#/node/del-screening)\n• [CAM screening — acute onset + inattention + altered consciousness OR disorganized thinking](#/node/del-screening)"},{"heading":"Etiology Search","body":"• [Infection: UTI, pneumonia, skin/soft tissue, bacteremia](#/node/del-infection)\n• [Metabolic: Na, Ca, glucose, hepatic/renal, thyroid](#/node/del-metabolic)\n• [Intracranial: stroke, SDH, SAH, meningitis, seizure/NCSE](#/node/del-intracranial)\n• [Toxic/Medication: anticholinergics, BZDs, opioids, withdrawal](#/node/del-toxic)\n• [Directed workup: BMP, CBC, UA, VBG, ECG (QTc baseline)](#/node/del-workup)"},{"heading":"Nonpharmacological First","body":"• [Verbal de-escalation — 10 elements (AAEP Project BETA)](#/node/del-nonpharm)\n• [Environmental modification — reduce stimuli, reorient, glasses/hearing aids](#/node/del-nonpharm)\n• [TADA: Tolerate, Anticipate, Don''t Agitate](#/node/del-nonpharm)\n• [Physical restraints — last resort, proper technique, continuous monitoring](#/node/del-restraints)"},{"heading":"Pharmacological Management","body":"• [Young adult: haloperidol 5-10 mg IM + midazolam, OR droperidol 5 mg, OR olanzapine 10 mg IM](#/node/del-young-adult)\n• [Elderly: half-dose antipsychotic, AVOID benzodiazepines](#/node/del-elderly)\n• [Parkinson''s/Lewy Body: quetiapine 12.5-25 mg PO (lowest D2 affinity)](#/node/del-parkinsons)\n• [Intoxication/withdrawal: benzodiazepines preferred](#/node/del-intox-withdrawal)\n• [Excited delirium: cool, fluids, midazolam/ketamine, monitor for rhabdo](#/node/del-exds-mgmt)"},{"heading":"Monitoring & Disposition","body":"• [Post-sedation: continuous SpO2, ETCO2, telemetry if antipsychotic, RASS q15 min](#/node/del-monitoring)\n• [QTc monitoring after haloperidol/droperidol — stop if >500 ms or Δ>60 ms](#/node/del-monitoring)\n• [Admit: undifferentiated delirium, persistent AMS, elderly with infection](#/node/del-disposition)\n• [Discharge: clear reversible cause corrected, returned to baseline, safe follow-up](#/node/del-discharge)"}]'::jsonb,
 '[{"num":1,"text":"Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine)."}]'::jsonb,
 false,
 0)
ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, subtitle=EXCLUDED.subtitle, sections=EXCLUDED.sections, citations=EXCLUDED.citations, shareable=EXCLUDED.shareable
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('del-precipitants', 'Precipitating Factors for Delirium', 'Critical, Emergent, and Iatrogenic Causes',
 '[{"heading":"Critical / Life-Threatening","body":"• Hypoxia / respiratory failure\n• Hypoglycemia\n• Hypertensive encephalopathy\n• Intracranial hemorrhage (SDH, SAH, ICH)\n• Meningitis / encephalitis\n• Status epilepticus / NCSE\n• Sepsis / septic shock\n• Myocardial infarction (delirium is ONLY symptom in up to 5% of elderly STEMI) [1]\n• Poisoning (carbon monoxide, cyanide, ethylene glycol)"},{"heading":"Emergent","body":"• **Infection** (16-67% of cases) — UTI and pneumonia most common [1]\n• Electrolyte disorders — hypo/hypernatremia, hypercalcemia, hypomagnesemia\n• Hepatic encephalopathy\n• Uremia / renal failure\n• Thyroid disorders (myxedema, thyroid storm)\n• Acute stroke (especially posterior circulation)\n• Pulmonary embolism\n• Dehydration / malnutrition\n• Acute urinary retention / fecal impaction\n• Uncontrolled pain"},{"heading":"Medication-Related (Beers Criteria)","body":"**High-risk medications for delirium in elderly:** [1]\n\n• **Anticholinergics** — diphenhydramine, promethazine, scopolamine, oxybutynin, tricyclic antidepressants\n• **Benzodiazepines** — independent risk factor for delirium\n• **Opioids** — especially meperidine (highest delirium risk of all opioids)\n• **Sedative-hypnotics** — zolpidem, eszopiclone\n• **H2-receptor antagonists** — ranitidine, famotidine\n• **Corticosteroids** — especially high-dose pulse therapy\n• **Thioridazine / chlorpromazine** — first-gen antipsychotics with high anticholinergic load\n• **Fluoroquinolones** — CNS effects underrecognized\n\n**ED recommendation:** Avoid meperidine. If opioids necessary, use oxycodone. For other classes, weigh risks vs benefits using clinical judgment. [1]"},{"heading":"Intoxication / Withdrawal","body":"• **Alcohol withdrawal** — tremor → hallucinations → seizures → delirium tremens\n• **Benzodiazepine withdrawal** — similar progression to alcohol\n• **Sympathomimetic intoxication** — cocaine, methamphetamine, synthetic cathinones\n• **Anticholinergic toxidrome** — diphenhydramine, jimsonweed, TCA overdose\n• **Serotonin syndrome** — SSRIs + MAOIs, tramadol, linezolid\n• **Opioid intoxication** — decreased consciousness, not typically \"delirious\""},{"heading":"Iatrogenic (Hospital/ED-Acquired)","body":"• Physical restraints\n• Bladder catheterization\n• Addition of ≥3 new medications\n• Sleep disruption\n• Malnutrition / NPO status\n• Immobilization\n• Sensory deprivation (missing glasses/hearing aids)\n\nOften multiple precipitants coexist. In 13% of cases, no precipitating factor is identified. [1]"}]'::jsonb,
 '[{"num":1,"text":"Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine)."}]'::jsonb,
 false,
 1)
ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, subtitle=EXCLUDED.subtitle, sections=EXCLUDED.sections, citations=EXCLUDED.citations, shareable=EXCLUDED.shareable
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('del-vulnerability', 'Vulnerability Factors for Delirium', 'Patient Risk Factors That Lower the Delirium Threshold',
 '[{"heading":"Major Risk Factors (ACEP Geriatric ED Guidelines)","body":"**Presence of 1-2 factors** increases delirium risk by **2.5×**\n**Presence of 3-4 factors** increases delirium risk by **>9×** [1]\n\n1. **Vision or hearing impairment**\n2. **Decreased cognitive ability** (baseline dementia)\n3. **Severe illness** (high APACHE score)\n4. **Dehydration** (elevated BUN:Cr ratio)"},{"heading":"Patient Factors","body":"• Age ≥65 years\n• **Pre-existing cognitive impairment / dementia** — strongest association with delirium. Two-thirds of geriatric delirium patients have underlying dementia. [1]\n• Visual or hearing impairment\n• Multiple comorbidities\n• Male sex\n• History of prior delirium episodes\n• Functional impairment (Katz ADL Score ≤4)\n• Malnutrition / poor nutritional status\n• Depression"},{"heading":"Acute Illness Factors","body":"• Severity of acute illness\n• Number of medications (polypharmacy ≥5)\n• Presence of infection\n• Dehydration (BUN:Cr >18)\n• Metabolic derangements\n• Surgery or anesthesia\n• Pain (undertreated)\n• Sleep deprivation"},{"heading":"The Vulnerability × Precipitant Model","body":"**Delirium results from the interaction** between vulnerability factors and precipitating factors. [1]\n\n• A **highly vulnerable** patient (elderly, demented, sensory-impaired) may develop delirium from a **minor precipitant** (UTI, single dose of diphenhydramine, Foley catheter)\n• A **low-vulnerability** patient (young, healthy) requires a **major precipitant** to develop delirium (severe sepsis, major intoxication, ICU stay)\n\nThis model explains why delirium is so common in the elderly and why seemingly minor events can trigger it in vulnerable patients."}]'::jsonb,
 '[{"num":1,"text":"Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine)."},{"num":2,"text":"American College of Emergency Physicians, et al. Geriatric Emergency Department Guidelines. Ann Emerg Med. 2014;63(5):e7-e25."}]'::jsonb,
 false,
 2)
ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, subtitle=EXCLUDED.subtitle, sections=EXCLUDED.sections, citations=EXCLUDED.citations, shareable=EXCLUDED.shareable
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('del-vs-dementia', 'Delirium vs Dementia', 'Key Differentiating Features',
 '[{"heading":"Comparison","body":"**Onset:**\n• Delirium: **Acute** (hours to days)\n• Dementia: **Insidious** (months to years)\n\n**Course:**\n• Delirium: **Fluctuating** — waxes and wanes throughout the day\n• Dementia: **Progressive** — gradual decline, relatively stable day-to-day\n\n**Attention:**\n• Delirium: **Impaired** — this is the HALLMARK feature\n• Dementia: **Preserved** until late stages\n\n**Level of Consciousness:**\n• Delirium: **Altered** — clouded, hyperalert, or obtunded\n• Dementia: **Usually clear** until late stages\n\n**Hallucinations:**\n• Delirium: **Common** — especially visual hallucinations\n• Dementia: **Less common** — except Lewy body dementia\n\n**Psychomotor Activity:**\n• Delirium: **Variable** — hyperactive, hypoactive, or mixed\n• Dementia: **Usually normal** until late stages\n\n**Duration:**\n• Delirium: **Hours to weeks** — usually reversible\n• Dementia: **Months to years** — irreversible\n\n**Reversibility:**\n• Delirium: **Usually reversible** with treatment of underlying cause\n• Dementia: **Irreversible** — progressive decline"},{"heading":"Critical Points","body":"• **Dementia is the single strongest risk factor FOR delirium** — they frequently coexist [1]\n• Without proper history, differentiating acute vs chronic cognitive change may be impossible\n• **Obtaining baseline mental status** from family, caregivers, or prior documentation is ESSENTIAL\n• **Lewy body dementia** is particularly challenging — fluctuating cognition and hallucinations are baseline features, mimicking delirium\n• When in doubt, **assume delirium** and search for a medical precipitant — delirium is treatable, and missing it carries significant mortality risk\n• **Document current cognitive findings** — this becomes the baseline for future clinicians"}]'::jsonb,
 '[{"num":1,"text":"Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine)."},{"num":2,"text":"Inouye SK, Westendorp RGJ, Saczynski JS. Delirium in Elderly People. Lancet. 2014;383(9920):911-922."}]'::jsonb,
 false,
 3)
ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, subtitle=EXCLUDED.subtitle, sections=EXCLUDED.sections, citations=EXCLUDED.citations, shareable=EXCLUDED.shareable
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('del-meds-table', 'Medications for Acute Agitation', 'Drug Comparison — Dosing, Onset, Route, and Side Effects',
 '[{"heading":"Typical Antipsychotics (Butyrophenones)","body":"**[Haloperidol](#/drug/haloperidol/agitation)** — 5-10 mg IM/IV (elderly: 0.5-2 mg)\n• Onset: 10-20 min IM, 3-5 min IV\n• Most studied ED agent. High D2 selectivity.\n• Side effects: QTc prolongation, EPS/dystonia, akathisia\n• Contraindicated: Parkinson''s, Lewy body, QTc >500 ms\n\n**[Droperidol](#/drug/droperidol/agitation)** — 2.5-5 mg IM/IV\n• Onset: 3-10 min (faster than haloperidol)\n• More sedating. ~2-3× more potent than haloperidol.\n• FDA black box for QTc (2001) — but real-world risk appears very low [1]\n• May be preferred when rapid sedation is the goal"},{"heading":"Atypical Antipsychotics","body":"**[Olanzapine](#/drug/olanzapine/agitation)** — 10 mg IM (elderly: 2.5-5 mg)\n• Onset: 15-45 min IM\n• **No QTc prolongation. No dystonia.**\n• ⚠️ **DO NOT combine with parenteral BZDs** — fatal respiratory depression risk\n• Use when QTc is borderline/prolonged\n\n**[Quetiapine](#/drug/quetiapine/delirium)** — 25-100 mg PO\n• Onset: 30-60 min (PO only)\n• Lowest D2 affinity — **safest for Parkinson''s / Lewy body**\n• Primarily sedating at low doses (H1 blockade)\n• Not useful for acute severe agitation\n\n**[Risperidone](#/drug/risperidone/delirium)** — 1-2 mg PO\n• Onset: 30-60 min (PO only)\n• Less sedating than quetiapine/olanzapine\n• Available as orally disintegrating tablet"},{"heading":"Benzodiazepines","body":"**[Midazolam](#/drug/midazolam/agitation)** — 2.5-5 mg IM\n• Onset: 5 min IM. Shortest acting BZD.\n• **Preferred for intoxication/withdrawal syndromes**\n• More rapid and adequate sedation than droperidol or haloperidol in one RCT [1]\n\n**[Lorazepam](#/drug/lorazepam/agitation)** — 1-2 mg IV\n• Onset: 2-3 min IV. Duration 10-20 hours.\n• **Preferred IV BZD for alcohol withdrawal**\n• Unpredictable IM absorption — IV preferred\n• Independent risk factor for delirium in elderly — AVOID"},{"heading":"Dissociative","body":"**[Ketamine](#/drug/ketamine/agitation)** — 4 mg/kg IM or 1-2 mg/kg IV\n• Onset: 5 min IM\n• **For refractory agitation** only — when antipsychotics and BZDs fail\n• Reliable, rapid sedation\n• Prepare for intubation (29% rate in one prehospital study)\n• Avoid in elderly, heart disease, schizophrenia"},{"heading":"Combination Therapy","body":"**Combination therapy is superior** to either class alone for rapid resolution of acute agitation. [1]\n\n• **Haloperidol + Lorazepam** — classic combination. More rapid symptom resolution than either agent alone.\n• **Haloperidol + Midazolam** — \"B52\" variant (+ diphenhydramine). Effective for undifferentiated severe agitation.\n• **Droperidol or Olanzapine + Midazolam** — adjunctive midazolam achieves more rapid sedation than midazolam alone.\n\n⚠️ **Do NOT combine olanzapine with parenteral BZDs** — use haloperidol instead if both classes needed.\n\nLow-dose combinations minimize side effects of both classes while maximizing efficacy."},{"heading":"Key Principles","body":"• **\"Start low and go slow\"** — especially in elderly [1]\n• **Treat the underlying etiology first** — pharmacological treatment is for behavioral symptom management\n• **Wait ≥20 min** before redosing antipsychotics\n• **If 10 mg cumulative** of an agent is ineffective, reconsider diagnosis — try a different class\n• **QTc >500 ms?** Use olanzapine or BZDs (no QTc effect)\n• **Parkinson''s/Lewy body?** Use quetiapine PO\n• **Intoxication/withdrawal?** Use BZDs\n• **Antipsychotics are NOT beneficial** for hypoactive delirium [2]"}]'::jsonb,
 '[{"num":1,"text":"Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine)."},{"num":2,"text":"Girard TD, et al. Haloperidol and Ziprasidone for Treatment of Delirium in Critical Illness (MIND-USA). N Engl J Med. 2018;379(26):2506-2516."},{"num":3,"text":"Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024."}]'::jsonb,
 false,
 4)
ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, subtitle=EXCLUDED.subtitle, sections=EXCLUDED.sections, citations=EXCLUDED.citations, shareable=EXCLUDED.shareable
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('del-deescalation', 'Verbal De-escalation: 10 Elements', 'AAEP Project BETA De-escalation Workgroup Guidelines',
 '[{"heading":"Overview","body":"Verbal de-escalation is a **first-line intervention** for agitated patients. The American Association for Emergency Psychiatry (AAEP) recommends a 3-step approach: [1]\n\n1. **Verbally engage** the agitated patient\n2. **Establish a collaborative relationship** with the patient\n3. **Verbally de-escalate** the patient out of agitation\n\nA show of force (security presence) avoided sedation in **27%** of cases in one study. One-to-one observation had a **perceived efficacy of 48%** among surveyed EDs. [1]"},{"heading":"The 10 Elements","body":"**1. Respect the patient''s personal space**\n   Maintain ≥2 arm lengths distance. Do not tower over the patient. Get at eye level if safe.\n\n**2. Do not be provocative**\n   Use a calm, even tone. Avoid authoritative posture or commands. Uncross arms. Hands visible.\n\n**3. Establish verbal contact**\n   One person speaks to the patient. Introduce yourself by name. Use the patient''s name.\n\n**4. Be concise**\n   Use short, simple sentences. Avoid jargon. Repeat key messages if needed.\n\n**5. Identify the patient''s wants and feelings**\n   \"What brought you here today?\" \"What do you need right now?\" Validate emotions.\n\n**6. Listen closely to what the patient is saying**\n   Active listening. Paraphrase to demonstrate understanding. Do not interrupt.\n\n**7. Agree or agree to disagree**\n   Find common ground. \"I can see you''re frustrated.\" Avoid arguing about delusions.\n\n**8. Lay down the law and set clear limits**\n   \"I want to help you, but I need you to [specific request].\" State consequences clearly but without threat.\n\n**9. Offer choices and optimism**\n   \"Would you prefer to sit in this chair or that one?\" Empower with small decisions. \"We''re going to figure this out.\"\n\n**10. Debrief the patient and staff**\n   After de-escalation, review what happened. Allow patient to express remaining concerns. Support staff who were involved."},{"heading":"When De-escalation Is Not Enough","body":"If verbal de-escalation fails or if the patient presents with **severe agitation posing immediate danger** to self or staff:\n\n• **Show of force** — security activation may de-escalate without physical intervention\n• **Physical restraints** — temporizing measure only. Follow proper technique.\n• **Pharmacological management** — indicated when safety cannot be maintained nonpharmacologically\n\nDe-escalation is an ongoing process — continue verbal engagement even after pharmacological or physical interventions."}]'::jsonb,
 '[{"num":1,"text":"Richmond JS, et al. Verbal De-escalation of the Agitated Patient: Consensus Statement of the AAEP Project BETA. West J Emerg Med. 2012;13(1):17-25."},{"num":2,"text":"Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine)."}]'::jsonb,
 false,
 5)
ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, subtitle=EXCLUDED.subtitle, sections=EXCLUDED.sections, citations=EXCLUDED.citations, shareable=EXCLUDED.shareable
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('del-exds-info', 'Excited Delirium Syndrome', 'Recognition, Pathophysiology, and Emergency Management',
 '[{"heading":"Recognition — 6 of 10 Criteria = Probable ExDS","body":"1. **Pain tolerance** — unresponsive to painful stimuli\n2. **Tachypnea** — rapid, labored breathing\n3. **Sweating / tactile hyperthermia** — temperature >104°F (40°C) is the **single best predictor of death**\n4. **Agitation** with **unusual strength**\n5. **Noncompliance** with police / first responders\n6. **Lack of tiring** despite prolonged physical struggle\n7. **Inappropriate clothing** — often undressing or naked\n8. **Mirror / glass attraction** — drawn to reflective surfaces\n9. **Bizarre behavior**\n10. **Male sex**\n\nCase fatality rate: **~10%**. Most deaths are from cardiac arrhythmia (PEA, asystole). [1]"},{"heading":"Pathophysiology","body":"• Proposed mechanism: **excess dopamine** in the central nervous system\n• Associated with sympathomimetic intoxication (cocaine, methamphetamine) and/or underlying psychiatric illness with medication noncompliance\n• Results in dangerous hyperthermia, severe metabolic acidosis, and autonomic instability\n• Rhabdomyolysis and hyperkalemia are common complications\n• Sudden unexpected death can occur even AFTER apparent clinical stabilization [1]"},{"heading":"Immediate Management","body":"**1. Remove from prone position** — positional asphyxia is a major cause of death during restraint\n\n**2. Aggressive cooling** — target temperature <101°F (38.3°C)\n   • Ice packs to axillae, groin, neck\n   • Cold IV fluids\n   • Mist and fan evaporative cooling\n   • Consider cold water immersion if available\n\n**3. IV access and fluids**\n   • Large-bore IV × 2\n   • Aggressive normal saline (goal: prevent renal failure from rhabdomyolysis)\n\n**4. Sedation**\n   • First-line: [Midazolam](#/drug/midazolam/agitation) 5 mg IM, repeat as needed\n   • Refractory: [Ketamine](#/drug/ketamine/agitation) 4 mg/kg IM\n   • Avoid prolonged physical struggle — it worsens hyperthermia and acidosis\n\n**5. Cardiac monitoring** — continuous telemetry. Anticipate PEA/asystole arrest."},{"heading":"Monitoring & Workup","body":"• **CK** — rhabdomyolysis (often massive: >10,000 IU/L). Aggressive IV hydration, target UOP >200 mL/hr.\n• **Potassium** — hyperkalemia from rhabdomyolysis. Treat aggressively (calcium, insulin/glucose, bicarbonate if acidotic).\n• **VBG with lactate** — metabolic acidosis\n• **Core temperature** q15 min — continue cooling until <101°F\n• **Creatinine** — acute kidney injury from rhabdomyolysis\n• **Continuous telemetry** — monitor for arrhythmia\n• **Urine drug screen** — identify causative substance"},{"heading":"Disposition","body":"**ICU admission is MANDATORY** — ExDS carries risk of sudden death even after apparent stabilization.\n\n• Cardiac monitoring minimum 24 hours\n• Continue aggressive IV hydration for rhabdomyolysis\n• Serial CK, electrolytes, creatinine\n• Temperature management\n• Psychiatric evaluation when medically stable"}]'::jsonb,
 '[{"num":1,"text":"Vilke GM, DeBard ML, Chan TC, et al. Excited Delirium Syndrome (ExDS): Defining Based on a Review of the Literature. J Emerg Med. 2012;43(5):897-905."},{"num":2,"text":"Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine)."}]'::jsonb,
 false,
 6)
ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, subtitle=EXCLUDED.subtitle, sections=EXCLUDED.sections, citations=EXCLUDED.citations, shareable=EXCLUDED.shareable
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('del-cam-guide', 'CAM & bCAM Screening Guide', '2-Tier Delirium Screening Protocol for the Emergency Department',
 '[{"heading":"Step 1: Delirium Triage Screen (DTS)","body":"**Quick initial screen** — can be performed by trained nonclinicians with similar performance to clinicians. [1]\n\n**RASS Assessment:**\n• If RASS is anything other than **0 (alert and calm)** → DTS is **POSITIVE** → proceed to Step 2\n• If RASS is **0** → assess for inattention: ask patient to recite months of the year backward from December to July\n• If unable to do so correctly → DTS is **POSITIVE** → proceed to Step 2\n• If RASS 0 and passes attention screen → DTS is **NEGATIVE** — delirium unlikely"},{"heading":"Step 2: Brief CAM (bCAM)","body":"**Confirmatory test** — takes ~2 minutes. Administer when DTS is positive. [1]\n\n**Feature 1: Acute Onset or Fluctuating Course** ✓ required\n• Is there an acute change in mental status from baseline? OR\n• Has the mental status fluctuated in the past 24 hours?\n\n**Feature 2: Inattention** ✓ required\n• \"Squeeze my hand when I say the letter A\" then recite: S-A-V-E-A-H-A-A-R-T\n• ≥2 errors (failed to squeeze on A, or squeezed on non-A) = inattention present\n\n**Feature 3: Altered Level of Consciousness**\n• RASS ≠ 0\n\n**Feature 4: Disorganized Thinking**\n• Ask: \"Will a stone float on water?\" \"Are there fish in the sea?\" \"Does 1 pound weigh more than 2 pounds?\" \"Can you use a hammer to pound a nail?\"\n• ≥1 incorrect answer + unable to hold up same number of fingers as examiner = disorganized thinking\n\n**DELIRIUM PRESENT** = Feature 1 + Feature 2 + EITHER Feature 3 OR Feature 4"},{"heading":"Performance Characteristics","body":"**2-Tier DTS + bCAM approach:** [1]\n• Sensitivity: **82%** (95% CI: 69-90%)\n• Specificity: **95.8%** (95% CI: 93-97%)\n• Comparable performance when administered by trained nonclinician raters\n• Feasibility: 76.5% adherence rate in pilot study\n\n**CAM alone** (all clinical settings): [2]\n• Sensitivity: 94% (range 46-100%)\n• Specificity: 89% (range 63-100%)\n• Performance is better when formal cognitive testing is incorporated\n\n**CAM-ICU** (validated for ED use): [1]\n• Sensitivity: 72%\n• Specificity: 98.6%"},{"heading":"Key Points","body":"• The **2-tier approach** (DTS → bCAM) is the current recommended screening strategy [1]\n• Low recognition rates (54-89% missed) are attributed to **lack of education** and **heavy ED workflow** — not inadequacy of available tools\n• **Fluctuating course** means some patients may screen negative initially but positive on re-evaluation\n• **Baseline cognitive status is critical** — obtain from family, caregivers, or prior documentation\n• Altered mental status as chief complaint, when documented, has been noted to be **specific** for delirium\n• If unable to determine baseline, **assume acute change** and screen"}]'::jsonb,
 '[{"num":1,"text":"Han JH, et al. Diagnosing Delirium in Older ED Patients: Validity and Reliability of the DTS and bCAM. Ann Emerg Med. 2013;62(5):457-465."},{"num":2,"text":"Wei L, et al. The Confusion Assessment Method: A Systematic Review. J Am Geriatr Soc. 2008;56(5):823-830."}]'::jsonb,
 false,
 7)
ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, subtitle=EXCLUDED.subtitle, sections=EXCLUDED.sections, citations=EXCLUDED.citations, shareable=EXCLUDED.shareable
;

COMMIT;
