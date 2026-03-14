-- =====================================================================
-- MedKitt — Syncope Evaluation Consult: Supabase INSERT Statements
-- Generated: 2026-03-14
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'syncope',
  'Syncope Evaluation',
  'Life-Threat Screen → Etiology → Risk Stratification → Disposition',
  '1.0',
  28,
  'sync-start',
  '["Is This Syncope?","Initial Evaluation","Etiology Classification","Risk Stratification","Special Populations","Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('cardiology', 'syncope', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (56 citations)
DELETE FROM tree_citations WHERE tree_id = 'syncope';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('syncope', 1, 'Shen WK, et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients with Syncope. J Am Coll Cardiol. 2017;70(5):e39-e110.'),
('syncope', 2, 'Brignole M, et al. 2018 ESC Guidelines for the Diagnosis and Management of Syncope. Eur Heart J. 2018;39(21):1883-1948.'),
('syncope', 3, 'D''Ascenzo F, et al. Incidence, Etiology and Predictors of Adverse Outcomes in 43,315 Patients Presenting with Syncope: An International Meta-Analysis. Int J Cardiol. 2013;167(1):57-62.'),
('syncope', 4, 'Sheldon R, et al. Historical Criteria that Distinguish Syncope from Seizures. J Am Coll Cardiol. 2002;40(1):142-148.'),
('syncope', 5, 'Shmuely S, et al. Differentiating Motor Phenomena in Tilt-Induced Syncope and Convulsive Seizures. Neurology. 2018;90(15):e1339-e1346.'),
('syncope', 6, 'Brigo F, et al. The Diagnostic Value of Urinary Incontinence in the Differential Diagnosis of Seizures. Seizure. 2013;22(2):85-90.'),
('syncope', 7, 'Matz O, et al. Early Postictal Serum Lactate Concentrations Are Superior to CK in Distinguishing Generalized Tonic-Clonic Seizures from Syncopes. Intern Emerg Med. 2018;13(5):749-755.'),
('syncope', 8, 'Thiruganasambandamoorthy V, et al. Duration of ECG Monitoring of ED Patients with Syncope. Circulation. 2019;139(11):1396-1406.'),
('syncope', 9, 'Nishijima DK, et al. ECG Predictors of Cardiac Arrhythmias in Older Adults with Syncope. Ann Emerg Med. 2018;71(4):452-461.'),
('syncope', 10, 'Quinn J, McDermott D. Electrocardiogram Findings in ED Patients with Syncope. Acad Emerg Med. 2011;18(7):714-718.'),
('syncope', 11, 'Pérez-Rodon J, et al. Prognostic Value of the ECG in Patients with Syncope: Data from GESINUR. Heart Rhythm. 2014;11(11):2035-2044.'),
('syncope', 12, 'Toarta C, et al. Syncope Prognosis Based on ED Diagnosis: A Prospective Cohort Study. Acad Emerg Med. 2018;25(4):388-396.'),
('syncope', 13, 'Clark CL, et al. Do High-Sensitivity Troponin and Natriuretic Peptide Predict Death or Serious Cardiac Outcomes After Syncope? Acad Emerg Med. 2019;26(5):528-538.'),
('syncope', 14, 'Isbitan A, et al. Utility of BNP as a Predictor of Short Term Outcomes in Patients Presenting with Syncope to the ED. Cardiovasc Diagn Ther. 2016;6(3):234-240.'),
('syncope', 15, 'Du Fay De Lavallaz J, et al. B-Type Natriuretic Peptides and Cardiac Troponins for Diagnosis and Risk-Stratification of Syncope. Circulation. 2019;139(21):2403-2418.'),
('syncope', 16, 'Chou SC, et al. Trends in Advanced Imaging and Hospitalization for ED Syncope Care Before and After ACEP Clinical Policy. Am J Emerg Med. 2019;37(6):1037-1043.'),
('syncope', 17, 'Del Rosso A, et al. Relation of Clinical Presentation of Syncope to the Age of Patients. Am J Cardiol. 2005;96(10):1431-1435.'),
('syncope', 18, 'Shiyovich A, et al. Admission for Syncope: Evaluation, Cost and Prognosis According to Etiology. Isr Med Assoc J. 2008;10(2):104-108.'),
('syncope', 19, 'Brignole M, et al. Complementary Effectiveness of Carotid Sinus Massage and Tilt Testing for Reflex Syncope in Patients >40 Years. Europace. 2020;22(11):1737-1741.'),
('syncope', 20, 'Chang AM, et al. Recurrent Syncope Is Not an Independent Risk Predictor for Future Syncopal Events or Adverse Outcomes. Am J Emerg Med. 2019;37(5):869-872.'),
('syncope', 21, 'Solbiati M, et al. Syncope Recurrence and Mortality: A Systematic Review. Europace. 2015;17(2):300-308.'),
('syncope', 22, 'Sarasin FP, et al. Prevalence of Orthostatic Hypotension Among Patients Presenting with Syncope in the ED. Am J Emerg Med. 2002;20(6):497-501.'),
('syncope', 23, 'White JL, et al. Orthostatic Vital Signs Do Not Predict 30 Day Serious Outcomes in Older ED Patients with Syncope. Am J Emerg Med. 2019;37(12):2215-2223.'),
('syncope', 24, 'Schaffer JT, et al. Do Orthostatic Vital Signs Have Utility in the Evaluation of Syncope? J Emerg Med. 2018;55(6):780-787.'),
('syncope', 25, 'Aro AL, et al. Syncope and Risk of Sudden Cardiac Arrest in Coronary Artery Disease. Int J Cardiol. 2017;231:26-30.'),
('syncope', 26, 'Probst MA, et al. Predictors of Clinically Significant Echocardiography Findings in Older Adults with Syncope. J Hosp Med. 2018;13(12):823-828.'),
('syncope', 27, 'Han SK, et al. Transthoracic Echocardiogram in Syncope Patients with Normal Initial Evaluation. Am J Emerg Med. 2017;35(2):281-284.'),
('syncope', 28, 'Locati ET, et al. External Prolonged ECG Monitoring in Unexplained Syncope and Palpitations: SYNARR-Flash Study. Europace. 2016;18(8):1265-1272.'),
('syncope', 29, 'Costantino G, et al. Syncope Risk Stratification Tools vs Clinical Judgment: An Individual Patient Data Meta-Analysis. Am J Med. 2014;127(11):1126.e13-1126.e25.'),
('syncope', 30, 'Serrano LA, et al. Accuracy and Quality of Clinical Decision Rules for Syncope in the ED: A Systematic Review and Meta-Analysis. Ann Emerg Med. 2010;56(4):362-373.'),
('syncope', 31, 'Thiruganasambandamoorthy V, et al. Development of the Canadian Syncope Risk Score to Predict Serious Adverse Events After ED Assessment of Syncope. CMAJ. 2016;188(12):E289-E298.'),
('syncope', 32, 'Thiruganasambandamoorthy V, et al. Multicenter ED Validation of the Canadian Syncope Risk Score. JAMA Intern Med. 2020;180(5):737-744.'),
('syncope', 33, 'Quinn JV, et al. Derivation of the San Francisco Syncope Rule to Predict Patients with Short-Term Serious Outcomes. Ann Emerg Med. 2004;43(2):224-232.'),
('syncope', 34, 'Massin MM, et al. Syncope in Pediatric Patients Presenting to an ED. J Pediatrics. 2004;145(2):223-228.'),
('syncope', 35, 'Sanatani S, et al. Canadian Cardiovascular Society Position Statement on the Approach to Syncope in the Pediatric Patient. Can J Cardiol. 2017;33(2):189-198.'),
('syncope', 36, 'Goble MM, et al. ED Management of Pediatric Syncope: Searching for a Rationale. Am J Emerg Med. 2008;26(1):66-70.'),
('syncope', 37, 'Anpalahan M, Gibson S. The Prevalence of Neurally Mediated Syncope in Older Patients Presenting with Unexplained Falls. Eur J Intern Med. 2012;23(2):e48-e52.'),
('syncope', 38, 'Bhangu J, et al. The Prevalence of Unexplained Falls and Syncope in Older Adults Presenting to an Irish Urban ED. Eur J Emerg Med. 2019;26(2):100-104.'),
('syncope', 39, 'Ungar A, et al. Etiology of Syncope and Unexplained Falls in Elderly Adults with Dementia: SYD Study. J Am Geriatr Soc. 2016;64(8):1567-1573.'),
('syncope', 40, 'Ungar A, et al. Etiology of Syncope and Unexplained Falls in Elderly Adults with Dementia: SYD Study. J Am Geriatr Soc. 2016;64(8):1567-1573.'),
('syncope', 41, 'White JL, et al. QTc Prolongation as a Marker of 30-Day Serious Outcomes in Older Patients with Syncope. Am J Emerg Med. 2019;37(4):685-689.'),
('syncope', 42, 'Bo M, et al. Prevalence, Predictors and Clinical Implications of Prolonged QTc in Elderly Patients with Dementia and Suspected Syncope. Eur J Intern Med. 2019;61:34-39.'),
('syncope', 43, 'Probst MA, et al. Clinical Benefit of Hospitalization for Older Adults with Unexplained Syncope: A Propensity-Matched Analysis. Ann Emerg Med. 2019;74(2):260-269.'),
('syncope', 44, 'Roussanov O, et al. Outcomes of Unexplained Syncope in the Elderly. Am J Geriatr Cardiol. 2006;16(4):249-254.'),
('syncope', 45, 'Grossman SA, et al. Can Elderly Patients Without Risk Factors Be Discharged Home When Presenting to the ED with Syncope? Arch Gerontol Geriatr. 2013;58(1):110-114.'),
('syncope', 46, 'Kaul P, et al. Lack of Benefit from Hospitalization in Patients with Syncope: A Propensity Analysis. J Am Coll Emerg Physicians Open. 2020;1(5):716-722.'),
('syncope', 47, 'Grossman SA, et al. Can Benign Etiologies Predict Benign Outcomes in High-Risk Syncope Patients? J Emerg Med. 2011;40(5):592-597.'),
('syncope', 48, 'Sun BC, et al. Randomized Clinical Trial of an ED Observation Syncope Protocol vs Routine Inpatient Admission. Ann Emerg Med. 2014;64(2):167-175.'),
('syncope', 49, 'Barbic F, et al. Syncope in a Working-Age Population: Recurrence Risk and Related Risk Factors. J Clin Med. 2019;8(2).'),
('syncope', 50, 'Sorajja D, et al. Syncope While Driving: Clinical Characteristics, Causes, and Prognosis. Circulation. 2009;120(11):928-934.'),
('syncope', 51, 'Viau JA, et al. The Yield of CT of the Head Among Patients Presenting with Syncope: A Systematic Review. Acad Emerg Med. 2019;26(5):479-490.'),
('syncope', 52, 'Thiruganasambandamoorthy V, et al. Prevalence of PE Among ED Patients with Syncope: A Multicenter Prospective Cohort Study. Ann Emerg Med. 2019;73(5):500-510.'),
('syncope', 53, 'Oqab Z, et al. Prevalence of PE in Patients Presenting with Syncope: A Systematic Review and Meta-Analysis. Am J Emerg Med. 2018;36(4):551-555.'),
('syncope', 54, 'Stockley CJ, et al. The Utility of Routine D-Dimer Measurement in Syncope. Eur J Emerg Med. 2009;16(5):256-260.'),
('syncope', 55, 'Kelly C, et al. Diagnostic Yield of PE Testing in Patients Presenting to the ED with Syncope. Res Pract Thromb Haemost. 2020;4(2):263-268.'),
('syncope', 56, 'Richardson D. Complications of Carotid Sinus Massage — A Prospective Series of Older Patients. Age and Ageing. 2000;29(5):413-417.');

DELETE FROM decision_nodes WHERE tree_id = 'syncope';

-- 4. decision_nodes (23 nodes)

-- MODULE 1: IS THIS SYNCOPE?
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-start', 'syncope', 'question', 1,
 'Transient Loss of Consciousness (TLOC)',
 '[Syncope Evaluation Steps Summary](#/info/syncope-summary)

Patient presents with transient loss of consciousness. First priority: **exclude immediately life-threatening conditions.**

Are any of the following present?
• Persistent abnormal vital signs (hypotension, tachycardia, bradycardia, hypoxia, tachypnea)
• Neurologic deficit or headache
• Chest pain or dyspnea
• Abdominal pain or pulsatile mass
• Evidence of hemorrhage or hypovolemia',
 '[1,2]'::jsonb, '[{"label":"Yes — Life-threatening features present","next":"sync-life-threat","urgency":"critical"},{"label":"No — Vitals normal, no red flags","next":"sync-true-syncope"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-life-threat', 'syncope', 'result', 1,
 'Evaluate for Life-Threatening Etiology',
 '**TLOC with persistent abnormalities is NOT simple syncope until serious diagnoses are excluded.** [1,2]

Evaluate based on clinical findings:
• Hypotension + tachycardia → hemorrhage, PE, sepsis, AAA
• Chest pain → ACS, aortic dissection, PE, tension pneumothorax
• Headache + neuro deficit → SAH, stroke, ICH
• Abdominal pain → ruptured AAA, ectopic pregnancy
• Hypoxia + tachypnea → PE, pneumothorax
• Persistent bradycardia → high-grade AV block, sick sinus

Obtain ECG, targeted labs, and imaging as indicated. **Do not diagnose syncope until life-threatening causes are excluded.**',
 '[1,2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Workup directed by presenting symptoms. Syncope is a diagnosis of exclusion when life-threatening features are present.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-true-syncope', 'syncope', 'question', 1,
 'Seizure vs. Syncope',
 'Bystanders often call any convulsive activity a "seizure." **Syncope commonly causes myoclonic jerks** (especially if patient cannot lie flat). [4,5]

**Features favoring seizure:**
• Prolonged postictal disorientation (>few seconds)
• Tongue laceration (lateral)
• Head-turning, unusual posturing
• >20 rhythmic jerks

**Features favoring syncope:**
• Presyncope (lightheadedness, diaphoresis, palpitations)
• Loss of consciousness with prolonged standing/sitting
• <10 jerks, brief duration
• Rapid return to baseline

Urinary incontinence does NOT distinguish between seizure and syncope. [6]

Does the clinical picture suggest seizure?',
 '[4,5,6]'::jsonb, '[{"label":"Yes — Seizure likely","description":"Postictal state, tongue laceration, rhythmic convulsions","next":"sync-seizure"},{"label":"No — Syncope likely","description":"Rapid return to baseline, prodrome present","next":"sync-ecg"},{"label":"Uncertain","description":"Unwitnessed event or ambiguous features","next":"sync-ecg"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-seizure', 'syncope', 'result', 1,
 'Seizure Suspected',
 'Clinical features suggest **seizure rather than syncope.** Evaluate and manage per seizure pathway.

**Pearl:** Elevated serum lactate within 2 hours of the event is superior to CK for distinguishing seizure from syncope (positive LR 5.8). [7]

If seizure is excluded after further workup, return to syncope evaluation.',
 '[4,5,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Manage per seizure pathway. Consider serum lactate within 2 hours to help differentiate.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 3)
;


-- MODULE 2: INITIAL EVALUATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-ecg', 'syncope', 'question', 2,
 'ECG Assessment',
 '**ECG is mandatory for ALL syncope patients** — even those with suspected vasovagal syncope. [1,2]

Place on continuous telemetry. In low-risk patients, 50% of arrhythmic causes are detected within 2 hours; 6 hours for medium/high-risk. [8]

Review ECG carefully for:
• Nonsinus rhythm or significant ectopy
• Conduction abnormalities (AV block, BBB, pre-excitation)
• QTc prolongation (>460 ms concerning, >500 ms high-risk)
• ST changes or Q waves suggesting ischemia
• [High-risk ECG patterns](#/info/syncope-ecg) (Brugada, HCM, epsilon waves)

Is the ECG abnormal?',
 '[1,2,8,9]'::jsonb, '[{"label":"Yes — Abnormal ECG","description":"Conduction disease, ischemia, prolonged QTc, or high-risk pattern","next":"sync-abnormal-ecg","urgency":"urgent"},{"label":"No — Normal sinus rhythm, no abnormalities","next":"sync-history"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[{"src":"images/syncope/brugada-types.png","alt":"Brugada syndrome ECG patterns — Type 1 (coved ST elevation), Type 2 and 3 (saddleback)","caption":"Brugada ECG patterns: Only Type 1 (coved ST elevation in V1-V3) is diagnostic."},{"src":"images/syncope/hcm-ecg.png","alt":"Hypertrophic cardiomyopathy ECG showing deep narrow Q waves and LVH","caption":"HCM ECG: Deep \"dagger\" Q waves with LVH voltage criteria."}]'::jsonb, '[]'::jsonb, 4)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-abnormal-ecg', 'syncope', 'info', 2,
 'Abnormal ECG — High-Risk Feature',
 '**Abnormal ECG is a high-risk feature in all syncope risk stratification tools.** [1,2,10]

ECG findings associated with serious cardiac arrhythmias within 30 days: [9]
• Nonsinus rhythm
• Mobitz II or third-degree AV block
• Bundle branch block (especially new LBBB)
• QTc >460 ms
• Pre-excitation (WPW)
• Brugada type 1 pattern
• Epsilon waves (ARVC)
• "Dagger" Q waves (HCM)
• ST depression or T-wave inversions

Atrial fibrillation, IVCD, LVH, and ventricular pacing are independent predictors of mortality. [11]

Continue to history assessment — ECG findings will factor into risk stratification.',
 '[1,9,10,11]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'sync-history', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-history', 'syncope', 'question', 2,
 'Focused History',
 '**The history is the single most important tool** in identifying the cause of syncope. [1,2]

[Historical Features by Etiology](#/info/syncope-history-features)

Assess:
• **Activity at onset:** position, exertion, triggers (pain, blood, emotional)
• **Prodrome:** nausea, sweating, lightheadedness, palpitations, tunnel vision
• **During event:** duration, witnessed movements, skin color
• **After event:** orientation, confusion duration, injuries
• **Prior episodes:** recurrent? same triggers? prior workup?
• **Medications:** new or changed? antihypertensives, QT-prolonging drugs?
• **Cardiac history:** heart failure, CAD, valvular disease, prior arrhythmia?
• **Family history:** sudden cardiac death, drowning, unexplained MVCs in young relatives?

Does the history suggest a **clear benign etiology** (vasovagal, situational, orthostatic)?',
 '[1,2,12]'::jsonb, '[{"label":"Yes — Classic vasovagal or situational","description":"Clear trigger, prodrome, young patient, recurrent pattern","next":"sync-vasovagal"},{"label":"Yes — Orthostatic hypotension","description":"Positional, medication-related, volume depletion","next":"sync-orthostatic"},{"label":"No — Cardiac features or unclear","description":"Exertional, palpitations, no prodrome, cardiac history","next":"sync-cardiac-suspect"},{"label":"No — Etiology unclear","description":"No clear trigger, ambiguous history","next":"sync-risk-stratify"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-labs', 'syncope', 'info', 2,
 'Laboratory Testing',
 '**Labs are low-yield unless directed by history/exam.** [1,2]

Consider in patients without clear benign diagnosis:
• **CBC** — anemia (but initial Hgb may be normal in acute hemorrhage)
• **BMP** — electrolytes, renal function, glucose
• **Pregnancy test** — all women of childbearing age
• **Troponin (hs-cTnT)** — elevated troponin is an independent predictor of 30-day mortality [13]
• **BNP/NT-proBNP** — elevated BNP confers ~8× increased risk of serious outcomes; may distinguish cardiac from vasovagal [14,15]
• **Lactate** — if seizure vs syncope unclear (within 2 hours)

**Do NOT routinely obtain:**
• D-dimer (unless PE otherwise suspected by PERC/Wells)
• Head CT (unless neuro deficit or head trauma)
• EEG (unless seizure suspected)
• Stress testing (unless exertional syncope with ischemia concern)',
 '[7,13,14,15,16]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'sync-risk-stratify', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-no-head-ct', 'syncope', 'info', 2,
 'Head CT Is NOT Indicated',
 '**ACEP "Choosing Wisely" recommendation:** Avoid head CT in asymptomatic patients with syncope, minimal trauma, and a normal neurologic examination. [16]

**Evidence:**
• Head CT has very low yield (<0.1%) in determining the cause of syncope [51]
• Commonly ordered despite lack of utility — one study found 58% of pediatric syncope patients received head CT [36]
• No neurological symptoms + no head trauma + normal neuro exam = **no head CT needed** [16,51]

**Only obtain head CT if:**
• Significant head trauma from the fall
• Neurological deficit on examination
• Suspicion for SAH (thunderclap headache)',
 '[16,36,51]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 8)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-pe-screening', 'syncope', 'info', 2,
 'Pulmonary Embolism & Syncope',
 '**PE is uncommon among syncope patients.** [52,53]

Existing clinical decision rules (PERC) adequately identify syncope patients with PE. [52]

**Routine D-dimer is NOT indicated** in syncope patients without independent indications for PE evaluation. [54,55]

**When to consider PE:**
• Unexplained persistent tachycardia, hypotension, tachypnea, or hypoxia in ED
• Recent surgery, immobilization, or other VTE risk factors
• Syncope + dyspnea + pleuritic chest pain

**Apply standard PE rules** (PERC → Wells → CTPA) only when clinically indicated — do NOT screen all syncope patients for PE.',
 '[52,53,54,55]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9)
;


-- MODULE 3: ETIOLOGY CLASSIFICATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-vasovagal', 'syncope', 'result', 3,
 'Neurally Mediated (Reflex) Syncope',
 '**Most common identified cause of syncope.** Good long-term prognosis. [17,18]

**Subtypes:**
• **Vasovagal** — triggered by pain, blood, emotions, medical procedures; prodrome with nausea, sweating, warmth. More common age <40.
• **Situational** — Valsalva, post-exercise, coughing, swallowing, defecation
• **Carotid sinus** — head-turning, shaving (age >40)

**For unexplained syncope in patients >40 years**, consider carotid sinus massage (AHA/ESC recommendation) — diagnostic in up to 60% of appropriate candidates. [19]

**Recurrence:** Common but not a predictor of mortality. [20,21]

**If ECG is normal** and history is classic, this is a **low-risk diagnosis.**',
 '[1,2,17,18,19,20,21]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'sync-disposition-low', 'Low-risk. Discharge with reassurance and follow-up for recurrent episodes. Avoid known triggers. Counsel on counterpressure maneuvers.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-orthostatic', 'syncope', 'question', 3,
 'Orthostatic Hypotension',
 'Orthostatic hypotension = **SBP drop >20 mmHg upon standing**, or symptoms with position change. [1]

Most common cause: **medications** (~40% of cases). [22]

**Drug-related causes:**
• Antihypertensives (ACEi, ARBs, beta-blockers, CCBs)
• Diuretics
• Alpha-blockers (tamsulosin, doxazosin)
• Nitrates
• Antidepressants (TCAs, MAOIs)
• Antipsychotics

**Other causes:** volume depletion, autonomic failure (diabetes, Parkinson), adrenal insufficiency

**Important:** Orthostatic hypotension does NOT exclude more serious causes, especially in the elderly. One study found no difference in 30-day serious outcomes between elderly patients with normal vs abnormal orthostatic vitals. [23]

Is the orthostatic hypotension clearly **medication-related or volume-related** with an otherwise reassuring workup?',
 '[1,22,23]'::jsonb, '[{"label":"Yes — Clear medication/volume cause","description":"Modifiable cause identified, otherwise low-risk","next":"sync-orthostatic-disposition"},{"label":"No — Other risk factors present","description":"Elderly with comorbidities, unclear cause","next":"sync-risk-stratify"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-orthostatic-disposition', 'syncope', 'result', 3,
 'Orthostatic Syncope — Modifiable Cause',
 '**Medication or volume-related orthostatic syncope** with otherwise reassuring evaluation.

**Management:**
• IV fluids if volume-depleted
• Review and adjust offending medications
• Educate on slow position changes
• Compression stockings and increased salt/fluid intake for recurrent episodes
• PCP follow-up for medication adjustment

**Important:** In elderly patients, identifying orthostasis allows modification of fall risk factors (medications), but orthostasis alone should NOT be the sole factor in risk stratification. [23,24]',
 '[1,22,23,24]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'sync-disposition-low', 'Low to intermediate risk. Treat volume depletion, adjust medications, PCP follow-up for med reconciliation.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 12)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-cardiac-suspect', 'syncope', 'question', 3,
 'Cardiac Syncope Suspected',
 '**Cardiac syncope carries the highest morbidity** of all causes. Patients with underlying cardiac disease + syncope have higher all-cause mortality. [25]

**Features suggesting cardiac syncope:**
• Syncope during exertion
• Palpitations immediately before syncope
• Syncope while supine
• Syncope without prodrome (abrupt)
• History of structural heart disease (HF, CAD, valvular)
• Family history of sudden cardiac death or inherited arrhythmia
• Abnormal ECG

**Arrhythmias** are the most common cardiac cause — and may have resolved by ED evaluation. [1,2]

**Structural causes** (PE, aortic stenosis, HCM, aortic dissection) typically persist and are more easily identified.

Does the patient have **known structural heart disease or heart failure?**',
 '[1,2,25]'::jsonb, '[{"label":"Yes — Known structural/HF","description":"History of heart failure, CAD, valvular disease, cardiomyopathy","next":"sync-cardiac-workup","urgency":"urgent"},{"label":"No — Arrhythmia suspected","description":"Palpitations, abrupt onset, abnormal ECG, no structural disease","next":"sync-arrhythmia"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-cardiac-workup', 'syncope', 'info', 3,
 'Cardiac Syncope Workup',
 '**Structural heart disease + syncope = HIGH RISK.** [1,2,25]

**Recommended ED workup:**
• Continuous telemetry monitoring (minimum 6 hours for high-risk) [8]
• Troponin (hs-cTnT) — elevated is independent predictor of 30-day mortality [13]
• BNP/NT-proBNP — aids in recognition of cardiac syncope [14,15]
• Echocardiography — high yield when HF, CAD, abnormal ECG, or elevated biomarkers present [26]

**Consider echocardiography** if:
• History of heart failure
• Coronary artery disease
• Abnormal ECG
• Elevated hs-cTnT or NT-proBNP

Otherwise, echo has low yield for most syncope patients. [26,27]',
 '[1,8,13,14,15,26,27]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'sync-risk-stratify', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-arrhythmia', 'syncope', 'info', 3,
 'Arrhythmia Suspected',
 '**Arrhythmias are the most common cause of cardiac syncope** — and typically resolve before ED arrival. [1,2]

**Clues to arrhythmic syncope:**
• Abrupt onset without prodrome
• Syncope while sitting or supine
• Palpitations preceding the event
• Abnormal ECG (bundle branch block, prolonged QTc, pre-excitation, Brugada pattern)
• Known cardiac device (pacemaker/ICD)

**ED monitoring:**
• Continuous telemetry — 50% of arrhythmic causes detected within 2 hours (low-risk); 6 hours (medium/high-risk) [8]
• Consider early referral for ambulatory monitoring — higher diagnostic yield if initiated within 15 days of event [28]

**If arrhythmia captured on telemetry** → manage per specific rhythm.

**If no arrhythmia detected** → proceed to risk stratification for disposition.',
 '[1,2,8,28]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'sync-risk-stratify', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-carotid-massage', 'syncope', 'info', 3,
 'Carotid Sinus Massage',
 '**AHA and ESC recommend carotid sinus massage** in patients >40 years with undiagnosed syncope after initial evaluation. [1,2]

Diagnostic in up to 60% of patients (increasing with advanced age). [19]

**Positive result (carotid sinus hypersensitivity):**
• Syncope reproduced, OR
• Asystole >3 seconds, OR
• AV block, OR
• SBP drop ≥50 mmHg

**Contraindications:**
• Carotid bruit
• Known carotid stenosis >70%
• History of TIA or stroke within 3 months
• MI within 3 months
• History of VT or VF

**Complication rate:** ~0.1% neurologic complications — careful patient selection is important. [56]

Perform with **appropriate monitoring and resuscitation equipment** readily available.',
 '[1,2,19,56]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;


-- MODULE 4: RISK STRATIFICATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-risk-stratify', 'syncope', 'question', 4,
 'Risk Stratification',
 'For patients with **unexplained syncope** after history, exam, and ECG — apply risk stratification. [1,2]

**Risk stratification tools** do not consistently outperform clinical judgment, but help identify high-risk features. [29,30]

Use the calculators below to aid disposition:
• **CSRS** — Canadian Syncope Risk Score (best validated, multicenter) [31,32]
• **SFSR** — San Francisco Syncope Rule (simple binary screening) [33]

[Syncope Differential Diagnosis](#/info/syncope-ddx)

Does the patient have **any high-risk features?**

**High-risk (ESC):** [2]
• Major structural or coronary artery disease
• Clinical or ECG features suggesting arrhythmic syncope
• Syncope causing severe injury
• Important comorbidities (severe anemia, electrolyte disturbance)',
 '[1,2,29,30,31,32,33]'::jsonb, '[{"label":"Yes — High-risk features","next":"sync-disposition-high","urgency":"critical"},{"label":"Intermediate — Some risk factors","description":"Age ≥50, cardiac history, cardiac device, family hx SCD","next":"sync-disposition-intermediate","urgency":"urgent"},{"label":"No — Low-risk features","description":"Young, vasovagal, normal ECG, no cardiac history","next":"sync-disposition-low"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"csrs","label":"Canadian Syncope Risk Score"},{"id":"sfsr","label":"San Francisco Syncope Rule"}]'::jsonb, 17)
;


-- MODULE 5: SPECIAL POPULATIONS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-pediatric', 'syncope', 'info', 5,
 'Pediatric Syncope',
 '**Approach mirrors adults.** History, exam, and ECG are the most useful components. [34]

**80% of pediatric syncope is neurally mediated** — vast majority have benign etiology. Most cardiac syncope can be diagnosed by history, exam, and ECG. [34]

**Features suggesting cardiac cause in children:**
• Exertional syncope
• Syncope without prodrome
• Syncope while supine
• Family history of sudden cardiac death
• Syncope associated with a loud noise → evaluate for **long QT syndrome** [35]

**Common problem:** Excessive testing in pediatric syncope — one study found 58% received head CT with very low yield. 10% are admitted, but very few ultimately diagnosed with cardiac syncope. [36]

**Bottom line:** Unless cardiac features are present, pediatric syncope can be managed conservatively with ECG and PCP follow-up.',
 '[34,35,36]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-elderly', 'syncope', 'info', 5,
 'Elderly Syncope',
 '**Particularly challenging** — many present with unexplained falls rather than syncope. [37,38]

**Key points:**
• 25-50% of unexplained falls in elderly may be syncope-related [37,39]
• Almost half of elderly with dementia referred for unexplained falls receive a syncope diagnosis [40]
• Neurally mediated syncope is still common in this age group [37]
• QTc prolongation occurs in 25% of elderly — QTc >500 ms predicts 30-day and 1-year mortality [41,42]

**Hospitalization controversy:**
• Older adults often have multiple risk factors and worse outcomes overall
• However, for unexplained syncope WITHOUT a serious ED diagnosis, **hospitalization does not improve 30-day adverse outcomes** [43]
• Age >65 alone and unexplained syncope are NOT independent predictors of mortality [44,45]
• Mortality is related primarily to **underlying comorbidities**, not the syncope itself [43,46]

Hospitalization may increase likelihood of identifying a serious diagnosis, but does not appear to improve mortality.',
 '[37,38,39,40,41,42,43,44,45,46]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;


-- MODULE 6: DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-disposition-high', 'syncope', 'result', 6,
 'High-Risk — Admit',
 '**Hospital admission or observation unit recommended.** [1,2]

**Indications for admission:**
• Sustained or symptomatic ventricular tachycardia
• Symptomatic conduction system disease or high-grade AV block
• Symptomatic bradycardia or sinus pauses (not reflex-mediated)
• Symptomatic SVT
• Pacemaker/ICD malfunction
• Inheritable cardiovascular conditions predisposing to arrhythmias
• Cardiac ischemia
• Severe aortic stenosis
• Cardiac tamponade
• Hypertrophic cardiomyopathy
• Aortic dissection
• Pulmonary embolism
• Significant hemorrhage

**Monitoring:**
• Continuous telemetry
• Cardiology consultation
• Echocardiography if not already obtained
• Consider electrophysiology referral',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit to monitored bed. Cardiology consult. Continuous telemetry. Echo if structural disease suspected.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 20)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-disposition-intermediate', 'syncope', 'result', 6,
 'Intermediate Risk — Observation vs. Outpatient',
 '**Shared decision-making recommended.** [1,2]

**Intermediate-risk factors:** [1]
• Age ≥50 years
• Prior history of cardiac disease
• Cardiac device without dysfunction
• Family history of early sudden cardiac death
• Symptoms not consistent with reflex-mediated syncope

**Key point:** Patients with risk factors by PMH (CAD, HF) but with a **benign cause identified in the ED** (e.g., dehydration) may be discharged safely. [47]

**If observation/discharge:**
• Structured ED observation protocol may reduce admissions [48]
• Ensure close follow-up (PCP, cardiology)
• Consider referral for:
  - Ambulatory ECG monitoring (Holter, event monitor)
  - Tilt-table testing
  - Implantable loop recorder
  - Electrophysiology evaluation [1]

**If admitted:**
• Telemetry monitoring
• Targeted workup based on risk profile',
 '[1,2,47,48]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Shared decision-making. Consider ED observation protocol. If discharge: close follow-up + ambulatory monitoring referral.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 21)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('sync-disposition-low', 'syncope', 'result', 6,
 'Low Risk — Discharge',
 '**Low-risk patients should generally be discharged**, even with unexplained syncope. [1,2]

**Low-risk features (ESC):** [2]
• Young age with typical features of reflex syncope
• No history of cardiac disease
• Syncope only when standing
• Identifiable trigger (pain, blood, prolonged standing)
• Normal ECG
• Normal vital signs

**Discharge counseling:**
• Explain diagnosis and expected benign prognosis
• Counsel on avoidance of known triggers
• Counterpressure maneuvers (leg crossing, hand gripping) for prodromal symptoms
• Adequate hydration and salt intake
• Review fall risk and injury prevention

**Recurrence:** ~9% recurrence within 6 months; 3+ lifetime episodes most predictive of future recurrence [49]

**Driving:** Be familiar with state laws regarding driving after syncope. Consider referral before return to work for commercial drivers or high-risk occupations. [50]

**Follow-up:** PCP for recurrent or unexplained syncope.',
 '[1,2,49,50]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Discharge with reassurance, trigger avoidance counseling, and PCP follow-up. Address driving restrictions if applicable.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 22)
;


-- 6. info_pages (4 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syncope-summary', 'Syncope Evaluation Steps Summary', 'Systematic ED Approach to Transient Loss of Consciousness',
 '[{"heading":"Step 1: Exclude Life-Threatening Conditions","body":"• [Screen for persistent abnormal vital signs, neuro deficit, chest pain, abdominal pain, hemorrhage](#/node/sync-start)\n• Any positive finding → evaluate for specific life-threatening etiology\n• [Syncope is a diagnosis of exclusion when red flags present](#/node/sync-life-threat)"},{"heading":"Step 2: Seizure vs. Syncope","body":"• [Differentiate based on postictal state, tongue laceration, movement pattern, and prodrome](#/node/sync-true-syncope)\n• Myoclonic jerks are common in syncope — do not assume seizure\n• Serum lactate within 2 hours aids differentiation (LR+ 5.8)"},{"heading":"Step 3: ECG (Mandatory for All Patients)","body":"• [Obtain 12-lead ECG and place on telemetry](#/node/sync-ecg)\n• Review for conduction disease, ischemia, prolonged QTc, Brugada, HCM\n• 50% of arrhythmic causes detected within 2 hours (low-risk)"},{"heading":"Step 4: Focused History","body":"• [Assess triggers, prodrome, position, duration, cardiac history, medications, family history](#/node/sync-history)\n• History is the single most important tool\n• Classic vasovagal or situational → low risk"},{"heading":"Step 5: Classify Etiology","body":"• [Neurally mediated (reflex)](#/node/sync-vasovagal) — most common, benign prognosis\n• [Orthostatic hypotension](#/node/sync-orthostatic) — medication-related ~40%\n• [Cardiac syncope](#/node/sync-cardiac-suspect) — highest morbidity"},{"heading":"Step 6: Risk Stratify & Dispose","body":"• [Apply CSRS or SFSR for unexplained syncope](#/node/sync-risk-stratify)\n• [High risk → admit to monitored bed](#/node/sync-disposition-high)\n• [Intermediate → observation vs. outpatient with close follow-up](#/node/sync-disposition-intermediate)\n• [Low risk → discharge with reassurance](#/node/sync-disposition-low)"}]'::jsonb,
 '[{"num":1,"text":"Shen WK, et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients with Syncope. J Am Coll Cardiol. 2017;70(5):e39-e110."},{"num":2,"text":"Brignole M, et al. 2018 ESC Guidelines for the Diagnosis and Management of Syncope. Eur Heart J. 2018;39(21):1883-1948."}]'::jsonb,
 false,
 0)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syncope-ddx', 'Syncope Differential Diagnosis', 'Mimics, Life-Threatening Conditions & Classifications',
 '[{"heading":"Classifications of Syncope","body":"**Neurally Mediated (Reflex)**\n• Vasovagal — pain, emotions, blood, medical procedures\n• Situational — Valsalva, post-exercise, coughing, swallowing, defecation\n• Carotid sinus — head-turning, shaving (age >40)\n\n**Orthostatic Hypotension**\n• Drug-induced (most common cause)\n• Volume depletion\n• Autonomic failure (diabetes, Parkinson, MSA)\n\n**Cardiac**\n• Arrhythmia — bradycardia, tachycardia, channelopathies\n• Structural — aortic stenosis, HCM, PE, aortic dissection, tamponade"},{"heading":"Life-Threatening Conditions That Present with TLOC","body":"• **Subarachnoid hemorrhage** — thunderclap headache, neuro deficit\n• **Pulmonary embolism** — dyspnea, tachycardia, hypoxia, recent surgery/immobilization\n• **Aortic dissection** — tearing chest/back pain, BP differential between arms\n• **Ruptured AAA** — abdominal/back pain, pulsatile mass, hypotension\n• **Acute MI** — chest pain, ST changes, elevated troponin\n• **Tension pneumothorax** — unilateral absent breath sounds, hypotension\n• **Ectopic pregnancy** — abdominal pain, vaginal bleeding, positive βhCG\n• **GI hemorrhage** — melena, hematemesis, rectal bleeding\n• **Cardiac tamponade** — JVD, muffled heart sounds, hypotension\n• **High-grade AV block** — persistent bradycardia, syncope without warning"},{"heading":"Syncope Mimics (Non-Syncopal TLOC)","body":"• **Seizure** — postictal confusion >few seconds, tongue laceration, rhythmic jerks >20\n• **Psychogenic pseudosyncope** — prolonged duration, eyes closed, no injury, psychiatric history\n• **Hypoglycemia** — diabetic medications, altered mentation, rarely resolves spontaneously\n• **Posterior circulation TIA** — vertigo, diplopia, dysarthria, ataxia (rare cause of TLOC)\n• **Toxicologic** — overdose, poisoning (uncommonly resolves spontaneously)\n• **Metabolic** — severe electrolyte derangement, hypoxia"},{"heading":"Key Differentiating Features","body":"**Seizure vs. Syncope:**\n• Postictal disorientation >few seconds → seizure\n• Prodrome (lightheadedness, diaphoresis) → syncope\n• Tongue laceration → seizure\n• <10 jerks → syncope; >20 jerks → seizure [1]\n• Urinary incontinence → does NOT differentiate [2]\n• Serum lactate within 2h: elevated → seizure (LR+ 5.8) [3]\n\n**45% of unexplained syncope** patients may have past or current substance abuse history. [4]\nMen with psychiatric illness are more likely to have unexplained syncope. [5]"}]'::jsonb,
 '[{"num":1,"text":"Shmuely S, et al. Differentiating Motor Phenomena in Tilt-Induced Syncope and Convulsive Seizures. Neurology. 2018;90(15):e1339-e1346."},{"num":2,"text":"Brigo F, et al. The Diagnostic Value of Urinary Incontinence in the Differential Diagnosis of Seizures. Seizure. 2013;22(2):85-90."},{"num":3,"text":"Matz O, et al. Early Postictal Serum Lactate Concentrations Are Superior to CK in Distinguishing Generalized Tonic-Clonic Seizures from Syncopes. Intern Emerg Med. 2018;13(5):749-755."},{"num":4,"text":"Wiener Z, et al. Substance Abuse in ED Patients with Unexplained Syncope. Intern Emerg Med. 2014;9(3):331-334."},{"num":5,"text":"Wiener Z, et al. The Prevalence of Psychiatric Disease in ED Patients with Unexplained Syncope. Intern Emerg Med. 2013;8(5):427-430."}]'::jsonb,
 false,
 1)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syncope-ecg', 'High-Risk ECG Findings in Syncope', 'Brugada, HCM, Long QT, Pre-Excitation & Other Patterns',
 '[{"heading":"ECG Findings Associated with Serious Arrhythmias Within 30 Days","body":"• **Nonsinus rhythm** (atrial fibrillation, atrial flutter)\n• **Mobitz II or third-degree AV block**\n• **Bundle branch block** (especially new LBBB)\n• **QTc > 460 ms** (concerning); **> 500 ms** (high risk in elderly — predicts 30-day and 1-year mortality) [1]\n• **Pre-excitation** (delta wave, short PR = WPW)\n• **ST depression or T-wave inversions** (ischemia)\n• **Ventricular ectopy** (frequent PVCs, NSVT)\n\nAtrial fibrillation, IVCD, LVH, and ventricular pacing are **independent predictors of mortality**. [2]\n\nThe ECG is more likely to be diagnostic in patients **>40 years**. [3]"},{"heading":"Brugada Syndrome","body":"**Type 1 Brugada pattern** is the only diagnostic pattern — characterized by coved ST-segment elevation ≥2mm in V1-V3 followed by negative T wave. Types 2 and 3 (saddleback morphology) are suggestive but not diagnostic. [4]\n\nPatients with spontaneous type 1 Brugada morphology + syncope are at **high risk for ventricular fibrillation** and may need ICD evaluation. Family history is NOT an independent predictor for future arrhythmic events in the setting of a diagnostic type 1 Brugada pattern. [5]"},{"heading":"Hypertrophic Cardiomyopathy (HCM)","body":"**\"Dagger\" Q waves** — narrow, deep Q waves in leads I, aVL, and/or V4-V6 with associated LVH voltage criteria suggest HCM. [6]\n\nExertional syncope in a young patient with HCM features on ECG is a **high-risk presentation** requiring urgent echocardiography and cardiology evaluation.\n\nFamily history of sudden cardiac death in young relatives (including those classified as drowning or unexplained MVC) may indicate undiagnosed inheritable arrhythmogenic conditions."},{"heading":"Long QT Syndrome","body":"**QTc > 460 ms** on multiple ECGs is concerning for inherited long QT syndrome, especially with family history of sudden cardiac death. [7]\n\nIn pediatric patients, syncope associated with a **loud noise** should prompt evaluation for long QT syndrome (LQTS type 2). [8]\n\n**QTc > 500 ms** in elderly patients predicts both 30-day and 1-year mortality. [1]\n\n25% of elderly patients may have QTc prolongation — age-related and medication-related causes are common."},{"heading":"Other High-Risk Patterns","body":"• **Epsilon waves** — small positive deflections at the end of QRS in V1-V3, pathognomonic for arrhythmogenic right ventricular cardiomyopathy (ARVC)\n• **Early repolarization** — previously considered benign, but inferior or lateral early repolarization with horizontal/descending ST segment may be associated with increased risk\n• **Ventricular pacing** — may mask underlying conduction disease or ischemia\n• **Short QT interval** (QTc < 340 ms) — rare but associated with SCD risk"}]'::jsonb,
 '[{"num":1,"text":"White JL, et al. QTc Prolongation as a Marker of 30-Day Serious Outcomes in Older Patients with Syncope. Am J Emerg Med. 2019;37(4):685-689."},{"num":2,"text":"Pérez-Rodon J, et al. Prognostic Value of the ECG in Patients with Syncope: Data from GESINUR. Heart Rhythm. 2014;11(11):2035-2044."},{"num":3,"text":"Sun BC, et al. Low Diagnostic Yield of ECG Testing in Younger Patients with Syncope. Ann Emerg Med. 2008;51(3):240-246."},{"num":4,"text":"Wu W, et al. Risk Factors for Cardiac Events in Patients with Brugada Syndrome: A PRISMA-Compliant Meta-Analysis. Medicine. 2016;95(30):e4214."},{"num":5,"text":"Sarkozy A, et al. The Value of Family History of Sudden Death in Patients with Diagnostic Type I Brugada ECG Pattern. Eur Heart J. 2011;32(17):2153-2160."},{"num":6,"text":"Gatzoulis KA, et al. Correlation of Noninvasive ECG with Invasive Electrophysiology in Syncope of Unknown Origin. Ann Noninvasive Electrocardiol. 2009;14(2):119-127."},{"num":7,"text":"Okamura H, et al. Risk Stratification in Patients with Brugada Syndrome Without Previous Cardiac Arrest. Circ J. 2015;79(2):310-317."},{"num":8,"text":"Sanatani S, et al. Canadian Cardiovascular Society Position Statement on the Approach to Syncope in the Pediatric Patient. Can J Cardiol. 2017;33(2):189-198."}]'::jsonb,
 false,
 2)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syncope-history-features', 'Historical Features Suggesting Etiology', 'Pattern Recognition for Syncope Classification',
 '[{"heading":"Neurally Mediated (Reflex) Syncope","body":"• Triggered by pain, blood, emotional distress, medical procedures\n• Prolonged standing (especially in warm environments)\n• **Prodrome present:** nausea, sweating, warmth, lightheadedness, tunnel vision\n• Younger patient (< 40 years)\n• Recurrent episodes with similar triggers\n• Rapid return to baseline\n• Occurs during or after meals (postprandial)"},{"heading":"Situational Syncope","body":"• During or immediately after coughing, sneezing, laughing\n• During or after micturition (especially nocturnal)\n• During defecation or straining\n• During swallowing\n• Post-exercise (not during exertion)\n• After prolonged standing at attention (military, choir)"},{"heading":"Orthostatic Hypotension","body":"• Occurs on standing from sitting or lying position\n• After prolonged recumbency\n• Temporal relationship with starting or increasing antihypertensives, diuretics, vasodilators\n• History of autonomic neuropathy (diabetes, Parkinson disease)\n• Dehydration, hot weather, alcohol\n• Post-prandial in elderly"},{"heading":"Cardiac Syncope — Arrhythmic","body":"• **No prodrome** — abrupt onset, no warning\n• Syncope during exertion\n• Syncope while **supine or sitting** (rules out orthostatic)\n• **Palpitations** immediately preceding syncope\n• History of structural heart disease, prior arrhythmia\n• Family history of sudden cardiac death at young age\n• Family history of drowning, unexplained MVCs, or SIDS"},{"heading":"Cardiac Syncope — Structural","body":"• Syncope **during** exertion (HCM, aortic stenosis)\n• Known valvular disease or murmur\n• Recent surgery or immobilization (PE)\n• Dyspnea + chest pain + syncope (PE, aortic dissection)\n• History of heart failure\n• Audible murmur on exam"}]'::jsonb,
 '[{"num":1,"text":"Brignole M, et al. 2018 ESC Guidelines for the Diagnosis and Management of Syncope. Eur Heart J. 2018;39(21):1883-1948."},{"num":2,"text":"Shen WK, et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients with Syncope. J Am Coll Cardiol. 2017;70(5):e39-e110."}]'::jsonb,
 false,
 3)
;

COMMIT;
