BEGIN;
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
COMMIT;
