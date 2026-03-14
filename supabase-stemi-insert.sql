-- =====================================================================
-- MedKitt — STEMI Management Consult: Supabase INSERT Statements
-- Generated: 2026-03-14
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'stemi',
  'STEMI Management',
  'Recognition → ECG Pattern → Reperfusion → Complications → Disposition',
  '1.0',
  21,
  'stemi-start',
  '["Recognition & ECG","ECG Patterns","Initial Therapies","Reperfusion Strategy","Complications & Special","Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('cardiology', 'stemi', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (31 citations)
DELETE FROM tree_citations WHERE tree_id = 'stemi';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('stemi', 1, 'Gokhroo RK, et al. Sweating: a Specific Predictor of ST-Segment Elevation Myocardial Infarction Among the Symptoms of ACS (SWIMI Study). Clin Cardiol. 2016;39(2):90-95.'),
('stemi', 2, 'Fanaroff AC, et al. Does This Patient with Chest Pain Have Acute Coronary Syndrome? JAMA. 2015;314(18):1955-1965.'),
('stemi', 3, 'Brieger D, et al. Acute Coronary Syndromes Without Chest Pain, an Underdiagnosed and Undertreated High-Risk Group. Chest. 2004;126(2):461-469.'),
('stemi', 4, 'Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction (2018). Eur Heart J. 2019;40(3):237-269.'),
('stemi', 5, 'O’Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425.'),
('stemi', 6, 'Hassen GW, et al. Lead aVL on Electrocardiogram: Emerging as Important Lead in Early Diagnosis of Myocardial Infarction? Am J Emerg Med. 2014;32(7):785-788.'),
('stemi', 7, 'Wong C-K, White HD. Patients with Circumflex Occlusions Miss Out on Reperfusion. Curr Opin Cardiol. 2012;27(4):327-330.'),
('stemi', 8, 'Ibanez B, et al. 2017 ESC Guidelines for the Management of Acute Myocardial Infarction in Patients Presenting with ST-Segment Elevation. Eur Heart J. 2018;39(2):119-177.'),
('stemi', 9, 'Smith SW, et al. Diagnosis of STEMI in the Presence of Left Bundle Branch Block with the ST-Elevation to S-Wave Ratio in a Modified Sgarbossa Rule. Ann Emerg Med. 2012;60(6):766-776.'),
('stemi', 10, 'Tabas JA, et al. Electrocardiographic Criteria for Detecting Acute MI in Patients with Left Bundle Branch Block: A Meta-Analysis. Ann Emerg Med. 2008;52(4):329-336.'),
('stemi', 11, 'Harhash AA, et al. aVR ST Segment Elevation: Acute STEMI or Not? Incidence of an Acute Coronary Occlusion. Am J Med. 2019;132(5):622-630.'),
('stemi', 12, 'Tanguay A, et al. Detection of STEMI Using Prehospital Serial 12-Lead Electrocardiograms. Prehosp Emerg Care. 2018;22(4):419-426.'),
('stemi', 13, 'Sabia P, et al. Value of Regional Wall Motion Abnormality in the Emergency Room Diagnosis of Acute Myocardial Infarction. Circulation. 1991;84(3 Suppl):I85-I92.'),
('stemi', 14, 'Lange RA, Hillis LD. Acute Pericarditis. N Engl J Med. 2004;351(21):2195-2202.'),
('stemi', 15, 'Hofmann R, et al. Oxygen Therapy in Suspected Acute Myocardial Infarction. N Engl J Med. 2017;377(13):1240-1249.'),
('stemi', 16, 'Meine TJ, et al. Association of Intravenous Morphine Use and Outcomes in Acute Coronary Syndromes: Results from the CRUSADE Quality Improvement Initiative. Am Heart J. 2005;149(6):1043-1049.'),
('stemi', 17, 'Kubica J, et al. Morphine Delays and Attenuates Ticagrelor Exposure and Action in Patients with Myocardial Infarction (IMPRESSION Trial). Eur Heart J. 2016;37(3):245-252.'),
('stemi', 18, 'Olier I, et al. Association of Different Antiplatelet Therapies with Mortality After Primary PCI. Heart. 2018;104(20):1683-1690.'),
('stemi', 19, 'Wallentin L, et al. Ticagrelor versus Clopidogrel in Patients with Acute Coronary Syndromes (PLATO). N Engl J Med. 2009;361(11):1045-1057.'),
('stemi', 20, 'Koski R, Kennedy B. Comparative Review of Oral P2Y(12) Inhibitors. P T. 2018;43(6):352-357.'),
('stemi', 21, 'American College of Emergency Physicians Clinical Policies Subcommittee. Clinical Policy: Emergency Department Management of Patients Needing Reperfusion Therapy for Acute STEMI. Ann Emerg Med. 2017;70(5):724-739.'),
('stemi', 22, 'Armstrong PW, et al. Fibrinolysis or Primary PCI in ST-Segment Elevation Myocardial Infarction (STREAM). N Engl J Med. 2013;368(15):1379-1387.'),
('stemi', 23, 'Rao SV, et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients with Acute Coronary Syndromes. J Am Coll Cardiol. 2025;85(22):2135-2237.'),
('stemi', 24, 'Gildea TH, Levis JT. ECG Diagnosis: Accelerated Idioventricular Rhythm. Perm J. 2018;22:17-173.'),
('stemi', 25, 'Meine TJ, et al. Incidence, Predictors, and Outcomes of High-Degree AV Block Complicating Acute MI Treated with Thrombolytic Therapy. Am Heart J. 2005;149(4):670-674.'),
('stemi', 26, 'Vahdatpour C, et al. Cardiogenic Shock. J Am Heart Assoc. 2019;8(8):e011991.'),
('stemi', 27, 'Kinch JW, Ryan TJ. Right Ventricular Infarction. N Engl J Med. 1994;330(17):1211-1217.'),
('stemi', 28, 'Mehta LS, et al. Acute Myocardial Infarction in Women: AHA Scientific Statement. Circulation. 2016;133(9):916-947.'),
('stemi', 29, 'Engberding N, Wenger NK. Acute Coronary Syndromes in the Elderly. F1000Research. 2017;6:1791.'),
('stemi', 30, 'McCord J, et al. Management of Cocaine-Associated Chest Pain and Myocardial Infarction: AHA Scientific Statement. Circulation. 2008;117(14):1897-1907.'),
('stemi', 31, 'Yannopoulos D, et al. The Evolving Role of the Cardiac Catheterization Laboratory in the Management of Patients with Out-of-Hospital Cardiac Arrest: AHA Scientific Statement. Circulation. 2019;139(12).');

DELETE FROM decision_nodes WHERE tree_id = 'stemi';

-- 4. decision_nodes (23 nodes)

-- MODULE 1: RECOGNITION & ECG
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-start', 'stemi', 'info', 1,
 'Suspect STEMI',
 '[STEMI Steps Summary](#/info/stemi-summary)

**Obtain 12-lead ECG within 10 minutes of first medical contact.**

Classic presentation: chest pain/pressure ± radiation to arms, jaw, or back, with diaphoresis, nausea/vomiting, or dyspnea.

**High-risk features:**
• Chest pain + diaphoresis = highest likelihood ratio for STEMI [1]
• Radiation to both arms — 96% specific (but only 11% sensitive) [2]
• 8.4% of ACS presents WITHOUT chest pain — dyspnea, diaphoresis, nausea, syncope most common [3]

**STEMI is an ECG diagnosis.** Do NOT delay for troponin. A negative troponin does NOT rule out STEMI.',
 '[1,2,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'stemi-ecg-pattern', NULL, NULL, NULL, '[{"src":"images/stemi/vascular-territories.png","alt":"ECG lead vascular territory map","caption":"12-lead ECG territories: leads map to coronary artery distributions"}]'::jsonb, '[]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-ecg-pattern', 'stemi', 'question', 1,
 'ECG Pattern Assessment',
 '**STEMI criteria:** New J-point elevation in ≥2 contiguous leads:
• ≥1 mm in all leads EXCEPT V2-V3
• V2-V3: ≥2 mm in men ≥40y, ≥2.5 mm in men <40y, ≥1.5 mm in women

Also look for reciprocal changes — [PAILS Mnemonic](#/info/stemi-reciprocal)

What does the 12-lead ECG show?',
 '[4,5]'::jsonb, '[{"label":"Clear ST elevation meeting criteria","description":"STE in ≥2 contiguous leads with reciprocal changes","next":"stemi-confirmed","urgency":"critical"},{"label":"ST depression V1-V3 (suspect posterior MI)","description":"Anterior ST depression with upright T waves","next":"stemi-posterior","urgency":"urgent"},{"label":"LBBB or ventricular paced rhythm","description":"Apply Sgarbossa criteria","next":"stemi-lbbb"},{"label":"aVR elevation + diffuse ST depression","description":"Concern for left main or triple vessel disease","next":"stemi-avr","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;


-- MODULE 2: ECG PATTERNS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-confirmed', 'stemi', 'info', 2,
 'STEMI Confirmed — Activate Cath Lab',
 '**Immediately activate cardiac catheterization laboratory.**

**Identify territory by STE distribution:**
• **Anterior:** V1-V4 — LAD occlusion
• **Inferior:** II, III, aVF — RCA (85%) or LCx (15%)
• **Lateral:** I, aVL, V5, V6 — LCx occlusion
• **Posterior:** V7-V9 STE (± V1-V3 ST depression) — LCx

**If inferior STEMI:** Get right-sided leads to assess for RV involvement (→ avoid nitrates, volume-dependent)

See [Vascular Territories](#/info/stemi-vascular-territories) | [Pericarditis vs STEMI](#/info/stemi-pericarditis-diff)

Start initial therapies immediately while preparing for reperfusion.',
 '[4,5,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'stemi-initial-tx', NULL, NULL, NULL, '[{"src":"images/stemi/inferior-stemi.png","alt":"Inferior STEMI ECG","caption":"Inferior STEMI: ST elevation in II, III, aVF with reciprocal depression in aVL"},{"src":"images/stemi/lateral-mi.png","alt":"Lateral STEMI ECG","caption":"Lateral STEMI: ST elevation in I, aVL, V5, V6"}]'::jsonb, '[]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-posterior', 'stemi', 'question', 2,
 'Evaluate for Posterior STEMI',
 'ST depression in V1-V3 with upright T waves and prominent R wave suggests posterior (inferobasal) STEMI.

**Obtain posterior leads V7, V8, V9:**
• V7 — posterior axillary line at level of V6
• V8 — tip of scapula
• V9 — halfway between V8 and left paraspinal muscles

**Diagnostic criteria:** STE ≥0.5 mm in any posterior lead (≥1 mm in men <40y has higher specificity)

Posterior STEMI accounts for ~3% of acute MIs and is frequently missed. Per ESC guidelines, manage as STEMI. [7][8]',
 '[4,7,8]'::jsonb, '[{"label":"Yes — posterior leads show STE","description":"Posterior STEMI confirmed","next":"stemi-confirmed","urgency":"critical"},{"label":"No STE on posterior leads","description":"Continue workup with serial ECGs","next":"stemi-serial"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[{"src":"images/stemi/posterior-leads.png","alt":"Posterior lead placement V7-V9","caption":"Posterior lead placement: V7, V8, V9 on left posterior chest"},{"src":"images/stemi/posterior-mi.png","alt":"Posterior MI ECG pattern","caption":"Posterior STEMI: ST depression V1-V3 on standard ECG, STE on posterior leads"}]'::jsonb, '[]'::jsonb, 3)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-lbbb', 'stemi', 'question', 2,
 'LBBB / Paced Rhythm — Sgarbossa Criteria',
 'In LBBB or ventricular pacing, standard STEMI criteria cannot be applied. Use [Sgarbossa Criteria](#/calculator/sgarbossa) to evaluate.

**Sgarbossa Criteria (any ONE positive = STEMI):**
• Concordant STE ≥1 mm in leads with positive QRS (5 pts)
• Concordant ST depression ≥1 mm in V1-V3 (3 pts)
• Discordant STE ≥5 mm in leads with negative QRS (2 pts)

**Modified Sgarbossa (Smith criteria):**
• Replace 3rd criterion with ST/S ratio < −0.25
• Significantly more accurate than original 3rd criterion [9]

Score ≥3 = 98% specificity for STEMI. [10]

Per 2017 ESC guidelines: LBBB + ongoing ischemic symptoms → manage as STEMI regardless of whether LBBB is old or new. [8]',
 '[4,8,9,10]'::jsonb, '[{"label":"Sgarbossa positive — STEMI","next":"stemi-confirmed","urgency":"critical"},{"label":"Sgarbossa negative, high suspicion","description":"Ongoing ischemic symptoms","next":"stemi-serial","urgency":"urgent"},{"label":"Sgarbossa negative, low suspicion","description":"Consider NSTEMI workup","next":"stemi-nstemi-workup"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[{"src":"images/stemi/sgarbossa-criteria.png","alt":"Sgarbossa criteria diagram","caption":"Sgarbossa criteria for STEMI in LBBB: concordant STE, concordant STD in V1-V3, excessive discordant STE"},{"src":"images/stemi/anterior-stemi.png","alt":"LBBB ECG pattern","caption":"LBBB pattern: evaluate each lead for concordance vs expected discordance"}]'::jsonb, '[{"id":"sgarbossa","label":"Sgarbossa Criteria"}]'::jsonb, 4)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-avr', 'stemi', 'question', 2,
 'aVR Elevation — Left Main Concern',
 'STE in aVR with ≥1 mm ST depression in multiple leads may suggest:
• **Left main coronary artery** stenosis or occlusion
• Triple vessel disease
• Diffuse subendocardial ischemia

**Important:** Only 10% of patients with this pattern have acute thrombotic coronary occlusion. [11] Clinical context is critical.

Assess hemodynamic status — instability strongly favors emergent catheterization.',
 '[5,11]'::jsonb, '[{"label":"Hemodynamically unstable","description":"Emergent cath indicated","next":"stemi-confirmed","urgency":"critical"},{"label":"Hemodynamically stable","description":"Consult cardiology, consider echo, serial ECGs","next":"stemi-serial"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[{"src":"images/stemi/avr-elevation.png","alt":"aVR elevation with diffuse ST depression","caption":"aVR elevation with widespread ST depression: consider left main or triple vessel disease"}]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-serial', 'stemi', 'question', 2,
 'Serial ECGs & Continued Monitoring',
 'Obtain serial ECGs at **15- to 30-minute intervals** for the first 1–2 hours.

• 8% of all STEMIs are identified only on repeat ECG [12]
• Dynamic ST changes are expected in evolving AMI
• Use fixed electrode positions for comparison

**Consider bedside echo:** RWMA present in 93% of AMI patients (but also in 43% without AMI — sensitive but not specific) [13]

**STEMI is an ECG diagnosis.** Do NOT wait for troponin to make treatment decisions. [4]

See [STEMI Mimics](#/info/stemi-mimics)',
 '[4,12,13]'::jsonb, '[{"label":"Repeat ECG shows STEMI criteria","next":"stemi-confirmed","urgency":"critical"},{"label":"ECG unchanged, ongoing symptoms","description":"Admit for observation, consult cardiology","next":"stemi-nstemi-workup"},{"label":"Alternative diagnosis identified","description":"Pericarditis, hyperkalemia, etc.","next":"stemi-alt-dx"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-nstemi-workup', 'stemi', 'result', 2,
 'NSTEMI / ACS Workup',
 'STEMI criteria not met but ACS remains on differential.

• Serial troponins q3–6h
• Continuous cardiac monitoring
• [Aspirin](#/drug/aspirin/acs) 162–325 mg if not already given
• Consider anticoagulation per NSTEMI protocol
• Consult cardiology for risk stratification

See [NSTEMI Management](#/tree/nstemi) for full NSTEMI decision pathway.',
 '[4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Manage as NSTEMI/ACS. Serial troponins, cardiology consult, risk stratification. See NSTEMI consult for detailed management.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-alt-dx', 'stemi', 'result', 2,
 'Alternative Diagnosis',
 'ST elevation identified as non-ACS etiology.

**Common STEMI mimics:**
• Pericarditis — diffuse concave STE, PR depression, no reciprocal changes
• Hyperkalemia — peaked T waves, wide QRS, pseudo-STEMI pattern
• Left ventricular hypertrophy — strain pattern
• Benign early repolarization
• Takotsubo cardiomyopathy — apical ballooning
• Brugada syndrome

See [Pericarditis vs STEMI](#/info/stemi-pericarditis-diff)

Manage underlying condition appropriately.',
 '[5,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Treat underlying condition. Maintain index of suspicion for ACS if clinical picture evolves.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 8)
;


-- MODULE 3: INITIAL THERAPIES
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-initial-tx', 'stemi', 'info', 3,
 'Initial Medical Therapy',
 'Start simultaneously with cath lab activation:

**Antiplatelet:**
• [Aspirin](#/drug/aspirin/acs) 162–325 mg chewed (if not given prehospital)
• P2Y12 inhibitor loading — select agent next

**Pain / Symptom management:**
• [Nitroglycerin](#/drug/nitroglycerin/acs) 0.4 mg SL q5min × 3 (avoid if SBP <90, suspected RV infarct, or PDE-5 inhibitor use within 24–48h)
• O₂ only if SpO₂ <90% — routine O₂ may INCREASE infarct size [15]
• [Morphine](#/drug/morphine/acs) 4–8 mg IV only if refractory pain — may delay P2Y12 absorption and increase mortality [16][17]

**Beta blocker:**
• [Metoprolol](#/drug/metoprolol/acs) within 24h if no contraindications (do not need to start in ED)',
 '[5,15,16,17]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'stemi-p2y12', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-p2y12', 'stemi', 'question', 3,
 'P2Y12 Inhibitor Selection',
 'Load with ONE P2Y12 inhibitor before or at time of PCI. Discuss with interventional cardiologist.

**[Prasugrel](#/drug/prasugrel/acs)** 60 mg loading → 10 mg daily
• More potent platelet inhibition, lower 30-day and 1-year mortality vs clopidogrel/ticagrelor [18]
• **CONTRAINDICATED:** prior stroke/TIA
• **No benefit:** age >75y, weight <60 kg

**[Ticagrelor](#/drug/ticagrelor/acs)** 180 mg loading → 90 mg BID
• Fewer stent thromboses and lower death rate vs clopidogrel [19]
• Higher stroke/ICH risk vs clopidogrel

**[Clopidogrel](#/drug/clopidogrel/acs)** 600 mg loading → 75 mg daily
• Variable metabolism (CYP2C19)
• Use if CI to prasugrel AND ticagrelor, or high bleeding risk

All three are Class I, Level B recommendations. [5]',
 '[5,18,19,20]'::jsonb, '[{"label":"Prasugrel (preferred if no CI)","next":"stemi-anticoag"},{"label":"Ticagrelor","next":"stemi-anticoag"},{"label":"Clopidogrel (CI to others or high bleed risk)","next":"stemi-anticoag"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-anticoag', 'stemi', 'info', 3,
 'Anticoagulation',
 '**For primary PCI:**
• [UFH](#/drug/ufh/stemi) 70–100 units/kg IV bolus (without GP IIb/IIIa) OR 50–70 units/kg (with GP IIb/IIIa)
• [Bivalirudin](#/drug/bivalirudin/acs) 0.75 mg/kg IV bolus then 1.75 mg/kg/hr — preferred if high bleeding risk

**For fibrinolytic therapy** (minimum 48 hours):
• [UFH](#/drug/ufh/stemi) weight-based bolus + infusion
• [Enoxaparin](#/drug/enoxaparin/stemi) — alternative (age-adjusted dosing)
• [Fondaparinux](#/drug/fondaparinux/stemi) 2.5 mg SC daily — alternative

See [Anticoagulation Details](#/info/stemi-anticoag-detail)',
 '[5,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'stemi-reperfusion-q', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;


-- MODULE 4: REPERFUSION STRATEGY
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-reperfusion-q', 'stemi', 'question', 4,
 'Reperfusion Strategy',
 'Primary PCI is preferred over fibrinolysis.

See [Reperfusion Decision Pathway](#/info/stemi-reperfusion-pathway)

**Time targets:**
• FMC-to-device ≤90 min at PCI-capable facility
• FMC-to-device ≤120 min for transfer patients
• DIDO (door-in–door-out) ≤30 min at referring hospital
• Door-to-needle ≤30 min for fibrinolytics

Is PCI available within target timeframes?',
 '[5,8,21]'::jsonb, '[{"label":"PCI available — FMC-to-device ≤90 min","description":"At PCI-capable facility","next":"stemi-pci"},{"label":"Transfer can achieve ≤120 min","next":"stemi-transfer"},{"label":"PCI NOT available within 120 min","description":"Consider fibrinolytics","next":"stemi-lytics","urgency":"urgent"},{"label":"Cardiogenic shock or severe HF","description":"Transfer immediately regardless of time","next":"stemi-shock","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-pci', 'stemi', 'info', 4,
 'Primary PCI',
 '**Goal: First medical contact-to-device ≤90 minutes.**

• Indicated for symptom onset <12 hours
• Between 12–24 hours: reasonable if clinical or ECG evidence of ongoing ischemia
• >24 hours, asymptomatic, stable: PCI NOT recommended (no benefit) [22]

**Advantages over fibrinolysis:**
• Higher infarct artery patency rates
• Lower rates of recurrent ischemia, reinfarction, ICH, and death

**Potential complications:** access site problems, contrast reactions, reperfusion arrhythmias, stent thrombosis.

**Reperfusion arrhythmias** are common after successful PCI — assess next.',
 '[5,22]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'stemi-complications', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-transfer', 'stemi', 'info', 4,
 'Transfer for PCI',
 '**Goal: Total FMC-to-device ≤120 minutes. DIDO ≤30 minutes.**

• Consider helicopter EMS to reduce transport time
• Continue anticoagulation during transport
• Prehospital cath lab activation reduces FMC-to-balloon time
• Bypass non-PCI facilities if transport time <30 min to PCI center [5]

**If transfer cannot achieve 120 min:** Switch to fibrinolytic strategy.

**Cardiogenic shock or severe HF:** Transfer immediately regardless of time delay from MI onset. [5]',
 '[5,21]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'stemi-complications', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-lytics', 'stemi', 'question', 4,
 'Fibrinolytic Therapy',
 '**Door-to-needle ≤30 minutes.** Fibrin-specific agents preferred.

Check [Fibrinolytic Contraindications](#/info/stemi-lytic-contraindications)

**Agents** (see [Fibrinolytic Dosing](#/info/stemi-lytic-agents)):
• [Tenecteplase](#/drug/tenecteplase/stemi) — single weight-based IV bolus (preferred)
• [Alteplase](#/drug/alteplase/stemi) — accelerated 90-min regimen
• [Reteplase](#/drug/reteplase/stemi) — 10 + 10 unit double bolus

**Age >75 years:** Consider half-dose tenecteplase (reduced ICH risk) [23]

**After fibrinolysis:** Transfer to PCI center. Angiography within 3–24 hours (NOT within first 2–3 hours). [5]

Any contraindications to fibrinolysis?',
 '[5,8,23]'::jsonb, '[{"label":"No contraindications — give fibrinolytic","next":"stemi-post-lytics"},{"label":"Absolute contraindication","description":"Must transfer for PCI regardless of time","next":"stemi-transfer","urgency":"critical"},{"label":"Relative contraindication","description":"Weigh risks vs benefits, consider transfer","next":"stemi-transfer","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-post-lytics', 'stemi', 'info', 4,
 'Post-Fibrinolysis Management',
 '**After administering fibrinolytic:**

**1. Anticoagulation** (minimum 48 hours):
• [UFH](#/drug/ufh/stemi) weight-based bolus + infusion, OR
• [Enoxaparin](#/drug/enoxaparin/stemi) (age-adjusted), OR
• [Fondaparinux](#/drug/fondaparinux/stemi) 2.5 mg SC daily

**2. Transfer** to PCI-capable center for angiography:
• Within 3–24 hours (NOT within first 2–3 hours after lytics)
• Rescue PCI if fibrinolysis fails (persistent symptoms/STE)

**3. Monitor for reperfusion signs:**
• Pain resolution
• ≥50% ST-segment resolution within 60–90 min
• Reperfusion arrhythmias (PVCs, AIVR)

**AIVR** (accelerated idioventricular rhythm) — well-tolerated, self-limited. Do NOT treat with antidysrhythmics (may cause hemodynamic collapse). [24]',
 '[5,24]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'stemi-complications', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;


-- MODULE 5: COMPLICATIONS & SPECIAL
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-complications', 'stemi', 'question', 5,
 'Complications Assessment',
 'Assess for STEMI complications:
• **Cardiogenic shock** (5–10% of AMI) — hypotension, cool skin, AMS
• **RV involvement** (33–50% of inferior STEMIs) — hypotension with clear lungs
• **Reperfusion arrhythmias** — PVCs, VT, AIVR, AF, VF
• **AV block** (7% with thrombolytics) [25]
• **Mechanical complications** — VSD, papillary muscle rupture, free wall rupture',
 '[5,25,26]'::jsonb, '[{"label":"Cardiogenic shock","next":"stemi-shock","urgency":"critical"},{"label":"Suspected RV involvement","description":"Inferior STEMI with hypotension","next":"stemi-rv","urgency":"urgent"},{"label":"Reperfusion arrhythmia","next":"stemi-arrhythmia"},{"label":"No complications","next":"stemi-special"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-shock', 'stemi', 'result', 5,
 'Cardiogenic Shock',
 'Cardiogenic shock complicates 5–10% of AMI. [26]

**Immediate management:**
• **PCI regardless of time from MI onset** (Class I)
• Volume resuscitation if no pulmonary edema
• Vasopressors to maintain coronary perfusion (norepinephrine preferred)
• Consider mechanical circulatory support (IABP, Impella, ECMO)

**Do NOT withhold vasopressors** for fear of worsening ischemia — the goal is coronary perfusion until revascularization.

If at non-PCI center: **transfer immediately regardless of time delay.**',
 '[5,26]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Emergent PCI regardless of timing. Vasopressors for perfusion. Transfer immediately if not at PCI center. Consider mechanical support.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-rv', 'stemi', 'info', 5,
 'Right Ventricular Involvement',
 '33–50% of inferior STEMIs involve the right ventricle. [27]

**Diagnosis — get right-sided leads:**
• STE ≥1 mm in V4R is diagnostic
• Place V1R-V6R as mirror image of standard precordial leads

**Management — volume-dependent:**
• **AVOID nitrates** (reduce preload → hemodynamic collapse)
• **AVOID diuretics**
• Volume resuscitation with NS boluses (250–500 mL, reassess)
• If hypotensive despite fluids: dobutamine or milrinone for RV support
• Reperfusion via PCI remains the priority',
 '[5,27]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'stemi-special', NULL, NULL, NULL, '[{"src":"images/stemi/right-sided-leads.png","alt":"Right-sided ECG lead placement","caption":"Right-sided precordial leads (V1R–V6R): mirror standard placement to right chest"}]'::jsonb, '[]'::jsonb, 19)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-arrhythmia', 'stemi', 'info', 5,
 'Reperfusion Arrhythmias',
 'Most common reperfusion arrhythmias: PVCs, VT, AIVR, AF, VF. [24]

**AIVR (Accelerated Idioventricular Rhythm):**
• Regular wide-complex rhythm, rate 50–110 bpm
• Usually a SIGN OF SUCCESSFUL REPERFUSION
• Well-tolerated and self-limited
• **Do NOT treat with antidysrhythmics** — may cause hemodynamic collapse
• Resolves when sinus rate exceeds ventricular focus

**VT/VF:** Defibrillate per ACLS protocol

**AV block:** Incidence 7% with thrombolytic therapy. Manage bradycardia (atropine, transcutaneous pacing). [25]

**Atrial fibrillation:** Rate control, see [A-Fib RVR](#/tree/afib-rvr) consult if needed.',
 '[24,25]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'stemi-special', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-special', 'stemi', 'info', 5,
 'Special Populations',
 '**Women:**
• Less likely to present with central chest pain [28]
• Same risk factors and treatment as men
• CV mortality has remained higher in women since 1980s

**Elderly (>75 years):**
• More atypical presentations (dyspnea, syncope, nausea)
• Higher complication rate, more contraindications to reperfusion
• Age alone is NOT a reason to withhold reperfusion [29]
• Consider half-dose tenecteplase if fibrinolysis indicated

**Cocaine-associated STEMI:**
• PCI strongly preferred over fibrinolysis (higher ICH risk with lytics)
• Benzodiazepines for chest pain, HR, and BP control
• **Avoid pure beta-blockers** (unopposed alpha stimulation); consider [Labetalol](#/drug/labetalol/acs) if beta-blockade needed [30]

**Post-cardiac arrest with STEMI:**
• Early cath for sustained ROSC with STEMI or new LBBB
• 2–3× higher favorable survival with early cath lab access [31]
• Consider ECMO for refractory VF/pVT',
 '[28,29,30,31]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'stemi-dispo', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;


-- MODULE 6: DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('stemi-dispo', 'stemi', 'result', 6,
 'Disposition — Admit ICU/CCU',
 '**All STEMI patients are admitted** after reperfusion (PCI or fibrinolysis).

**In-hospital management:**
• Continuous cardiac monitoring for reperfusion arrhythmias
• [Metoprolol](#/drug/metoprolol/acs) within 24h if no CI (HR, BP permitting)
• [Atorvastatin](#/drug/atorvastatin/acs) 80 mg (start immediately)
• ACE inhibitor/ARB within 24h if EF ≤40%, HTN, or diabetes
• DAPT: Aspirin 81 mg + P2Y12 inhibitor × 12 months

**Goals of care discussions** should be held for elderly patients and those with severe comorbidities. DNR/POLST/advance directives do NOT necessarily preclude intervention. [29]

**Cardiac rehabilitation** referral before discharge (25% reduction in CV mortality). [5]',
 '[5,29]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit ICU/CCU. Start GDMT: beta-blocker, high-intensity statin, ACEi/ARB. Continue DAPT ×12 months. Cardiac rehab referral.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 22)
;


-- 5. drugs (1 new drugs)
INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('reteplase', 'Reteplase', 'Reteplase', 'Thrombolytic (tissue plasminogen activator)', 'IV',
 '["Acute STEMI"]'::jsonb,
 '[{"indication":"STEMI / Fibrinolysis","regimen":"10 units IV bolus over 2 minutes, then repeat 10 units IV bolus 30 minutes later.\n\nPatency rate: 60% (TIMI grade 3 flow at 90 min).\n\nMust be given with anticoagulation (UFH or enoxaparin) for minimum 48 hours.\n\nFibrin-specific agent. Contraindicated within 6 months of streptokinase exposure."}]'::jsonb,
 '[]'::jsonb,
 '[]'::jsonb,
 NULL,
 'Double-bolus fibrinolytic for STEMI when PCI not available within 120 minutes. Administer with concomitant anticoagulation. Less commonly used than tenecteplase (single bolus) but acceptable alternative.',
 NULL,
 '[]'::jsonb,
 0)
;


-- 6. info_pages (9 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('stemi-summary', 'STEMI Management Steps', 'Quick Reference — Recognition Through Disposition',
 '[{"heading":"Recognition & ECG","body":"• [Obtain ECG within 10 minutes of first medical contact](#/node/stemi-start)\n• [Identify ECG pattern — standard STEMI, posterior, LBBB, aVR](#/node/stemi-ecg-pattern)"},{"heading":"ECG Patterns","body":"• [Clear STEMI — activate cath lab immediately](#/node/stemi-confirmed)\n• [Posterior MI — obtain V7-V9 leads](#/node/stemi-posterior)\n• [LBBB/Paced — apply Sgarbossa criteria](#/node/stemi-lbbb)\n• [aVR elevation — assess hemodynamic stability](#/node/stemi-avr)\n• [Nondiagnostic — serial ECGs q15-30 min](#/node/stemi-serial)"},{"heading":"Initial Therapies","body":"• [Aspirin 162-325 mg chewed + P2Y12 loading](#/node/stemi-initial-tx)\n• [P2Y12 selection — prasugrel vs ticagrelor vs clopidogrel](#/node/stemi-p2y12)\n• [Anticoagulation — UFH or bivalirudin for PCI](#/node/stemi-anticoag)"},{"heading":"Reperfusion","body":"• [PCI available ≤90 min → primary PCI](#/node/stemi-pci)\n• [Transfer achievable ≤120 min → transfer for PCI](#/node/stemi-transfer)\n• [PCI not available → fibrinolytic therapy](#/node/stemi-lytics)\n• [Post-fibrinolysis — transfer for angiography 3-24h](#/node/stemi-post-lytics)"},{"heading":"Complications","body":"• [Cardiogenic shock — emergent PCI regardless of time](#/node/stemi-shock)\n• [RV involvement — right-sided leads, avoid nitrates](#/node/stemi-rv)\n• [Reperfusion arrhythmias — AIVR is benign](#/node/stemi-arrhythmia)\n• [Special populations — women, elderly, cocaine, post-arrest](#/node/stemi-special)"},{"heading":"Disposition","body":"• [All STEMI patients admitted ICU/CCU](#/node/stemi-dispo)"}]'::jsonb,
 '[]'::jsonb,
 false,
 0)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('stemi-vascular-territories', 'ECG Vascular Territories', 'Lead Distribution by Coronary Artery',
 '[{"heading":"Anterior Wall — LAD","body":"**Leads:** V1, V2, V3, V4\n**Artery:** Left anterior descending (LAD)\n**Reciprocal changes:** ST depression in inferior leads (II, III, aVF)\n\nLargest territory. Anterior STEMI carries highest mortality risk."},{"heading":"Inferior Wall — RCA (or LCx)","body":"**Leads:** II, III, aVF\n**Artery:** Right coronary artery (85%) or left circumflex (15%)\n**Reciprocal changes:** ST depression in aVL (most sensitive early sign), lead I\n\n33-50% involve the right ventricle — get right-sided leads (V4R). [1]"},{"heading":"Lateral Wall — LCx","body":"**Leads:** I, aVL (high lateral) and V5, V6 (low lateral)\n**Artery:** Left circumflex (LCx)\n**Reciprocal changes:** ST depression in inferior leads (III, aVF)"},{"heading":"Posterior Wall — LCx (or RCA)","body":"**Standard ECG clue:** ST depression in V1-V3 with upright T waves and prominent R wave\n**Posterior leads (V7-V9):** STE ≥0.5 mm diagnostic\n**Artery:** Left circumflex, occasionally RCA\n\nAccounts for ~3% of acute MIs. Frequently missed because posterior leads are not routinely obtained. [2]"},{"heading":"Left Main — LMCA","body":"**Pattern:** STE in aVR with diffuse ST depression in multiple leads\n**Note:** Only 10% have acute thrombotic occlusion — pattern also seen in triple vessel disease, diffuse subendocardial ischemia, and tachycardia. [3]\n\nHemodynamic instability strongly favors emergent catheterization."},{"heading":"PAILS Mnemonic — Reciprocal Changes","body":"**P**osterior → **A**nterior (V1-V3 depression)\n**A**nterior → **I**nferior (II, III, aVF depression)\n**I**nferior → **L**ateral (I, aVL depression)\n**L**ateral → **I**nferior + **S**eptal (II, III, aVF + V1 depression)\n\nReciprocal changes help differentiate true STEMI from mimics (e.g., pericarditis has NO reciprocal changes). Presence indicates larger myocardial territory at risk. [4]"}]'::jsonb,
 '[{"num":1,"text":"Kinch JW, Ryan TJ. Right Ventricular Infarction. N Engl J Med. 1994;330(17):1211-1217."},{"num":2,"text":"Wong C-K, White HD. Patients with Circumflex Occlusions Miss Out on Reperfusion. Curr Opin Cardiol. 2012;27(4):327-330."},{"num":3,"text":"Harhash AA, et al. aVR ST Segment Elevation: Acute STEMI or Not? Am J Med. 2019;132(5):622-630."},{"num":4,"text":"Kidambi A, et al. Reciprocal ECG Change in Reperfused STEMI Is Associated with Myocardial Salvage and Area at Risk. Heart. 2013;99(22):1658-1662."}]'::jsonb,
 false,
 1)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('stemi-pericarditis-diff', 'Pericarditis vs STEMI', 'ECG Differentiation',
 '[{"body":"Acute pericarditis can mimic STEMI with ST-segment elevation. Distinguishing features help avoid unnecessary cath lab activation. [1]"},{"heading":"Favors STEMI","body":"• **Regional** ST elevation following arterial distribution\n• **Convex (dome-shaped)** ST morphology\n• **Reciprocal ST depression** present\n• Hyperacute T waves\n• Q waves developing\n• Dynamic ECG changes over minutes to hours"},{"heading":"Favors Pericarditis","body":"• **Diffuse** ST elevation (not following arterial distribution)\n• **Concave (scooped)** ST morphology\n• **No reciprocal changes** (except aVR)\n• **PR depression** (highly specific, seen in >80% of pericarditis) [2]\n• ST elevation in II > III (suggestive but not reliable alone) [3]\n• Pain worse supine, improved sitting forward\n• Pericardial friction rub on exam"},{"heading":"ECG Evolution in Pericarditis","body":"**Phase I:** Diffuse STE + PR depression (>80% of cases)\n**Phase II:** ST and PR normalize\n**Phase III:** T-wave inversion\n**Phase IV:** T-wave normalization\n\nPhase I changes must be differentiated from AMI. [2]"},{"heading":"When in Doubt","body":"If the clinical picture is ambiguous, consider bedside echocardiography to assess for wall motion abnormalities (93% sensitive for AMI) or pericardial effusion. Discuss with cardiology before cath lab activation."}]'::jsonb,
 '[{"num":1,"text":"Lange RA, Hillis LD. Acute Pericarditis. N Engl J Med. 2004;351(21):2195-2202."},{"num":2,"text":"Khandaker MH, et al. Pericardial Disease: Diagnosis and Management. Mayo Clin Proc. 2010;85(6):572-593."},{"num":3,"text":"Henning D, et al. Evaluating the Utility of ST Elevation in Lead II > Lead III in Differentiating Pericardial Disease from STEMI. Scand J Trauma Resus Emerg Med. 2012;20(Suppl 2):P20."}]'::jsonb,
 false,
 2)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('stemi-lytic-contraindications', 'Fibrinolytic Contraindications', 'Absolute and Relative — STEMI',
 '[{"heading":"Absolute Contraindications","body":"• Any prior intracranial hemorrhage\n• Known structural cerebrovascular lesion (AVM, aneurysm)\n• Known malignant intracranial neoplasm\n• Ischemic stroke within 3 months\n• Suspected aortic dissection\n• Active bleeding or bleeding diathesis (excluding menses)\n• Significant closed-head or facial trauma within 3 months\n• Intracranial or intraspinal surgery within 2 months\n• Severe uncontrolled hypertension (SBP >180 or DBP >110) unresponsive to therapy [1]"},{"heading":"Relative Contraindications","body":"• Chronic severe poorly controlled hypertension\n• Significant hypertension on presentation (SBP >180 or DBP >110)\n• Prior ischemic stroke >3 months ago\n• Dementia or known intracranial pathology not covered in absolute CI\n• Traumatic or prolonged CPR (>10 minutes)\n• Major surgery within 3 weeks\n• Recent internal bleeding (2-4 weeks)\n• Noncompressible vascular punctures\n• Pregnancy\n• Active peptic ulcer\n• Current use of anticoagulants (higher INR = higher bleeding risk) [1]"},{"heading":"If Absolute Contraindication Exists","body":"Patient MUST be transferred for PCI regardless of anticipated time delay. Fibrinolysis cannot be given.\n\nIf relative contraindication exists, weigh bleeding risk against benefit of reperfusion. Consider PCI transfer as alternative."}]'::jsonb,
 '[{"num":1,"text":"O’Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425."}]'::jsonb,
 false,
 3)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('stemi-lytic-agents', 'Fibrinolytic Agents', 'Dosing and Patency Rates — STEMI',
 '[{"body":"Fibrin-specific agents are preferred. All require concomitant anticoagulation for minimum 48 hours. [1]"},{"heading":"Dosing Regimens","body":"","drugTable":[{"drug":"Tenecteplase (PREFERRED)","regimen":"Single IV bolus over 5 sec:\n<60 kg: 30 mg | 60-69 kg: 35 mg | 70-79 kg: 40 mg | 80-89 kg: 45 mg | ≥90 kg: 50 mg\nAge >75y: consider HALF dose.\nPatency: 63% TIMI-3 flow."},{"drug":"Alteplase (tPA)","regimen":"Accelerated 90-min regimen:\n15 mg IV bolus → 0.75 mg/kg (max 50 mg) over 30 min → 0.5 mg/kg (max 35 mg) over 60 min.\nTotal max: 100 mg.\nPatency: 54% TIMI-3 flow."},{"drug":"Reteplase","regimen":"10 units IV bolus over 2 min, then repeat 10 units IV bolus 30 min later.\nPatency: 60% TIMI-3 flow."}]},{"heading":"Key Points","body":"• Tenecteplase preferred for ease of single-bolus dosing\n• Fibrin-specific agents have significant mortality reduction vs streptokinase (GUSTO trial) [2]\n• Streptokinase is no longer available in the United States\n• Maximum benefit when given within 120 minutes of symptom onset\n• After fibrinolysis: transfer to PCI center for angiography within 3-24 hours (NOT within first 2-3 hours)"}]'::jsonb,
 '[{"num":1,"text":"O’Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425."},{"num":2,"text":"GUSTO Investigators. An International Randomized Trial Comparing Four Thrombolytic Strategies for Acute MI. N Engl J Med. 1993;329(10):673-682."}]'::jsonb,
 false,
 4)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('stemi-reperfusion-pathway', 'Reperfusion Decision Pathway', 'PCI vs Fibrinolysis — Time-Based Algorithm',
 '[{"heading":"Step 1: Confirm STEMI","body":"ECG diagnosis of STEMI (or STEMI equivalent) + ischemic symptoms.\nActivate cath lab and start initial therapies simultaneously."},{"heading":"Step 2: Assess PCI Availability","body":"**At PCI-capable hospital?**\n• YES → Primary PCI. Goal: FMC-to-device ≤90 min.\n• NO → Can transfer achieve FMC-to-device ≤120 min?\n  - YES → Transfer for PCI. DIDO ≤30 min.\n  - NO → Fibrinolytic therapy. Door-to-needle ≤30 min."},{"heading":"Step 3: Time from Symptom Onset","body":"**<12 hours:** PCI or fibrinolysis indicated\n**12-24 hours:** PCI reasonable if ongoing ischemia or hemodynamic instability\n**>24 hours, stable, asymptomatic:** PCI NOT recommended (no benefit)\n\n**Exception:** Cardiogenic shock or severe HF → PCI regardless of time from onset [1]"},{"heading":"Step 4: After Fibrinolysis","body":"• Transfer to PCI-capable center\n• Angiography within 3-24 hours (pharmaco-invasive approach)\n• NOT within first 2-3 hours after fibrinolytic administration\n• Rescue PCI if fibrinolysis fails (persistent symptoms or STE) [1]"},{"heading":"Special Situations","body":"• **Cardiogenic shock:** Immediate PCI regardless of time delay or facility\n• **Absolute lytic CI:** Must transfer for PCI regardless of time\n• **Age >75y:** Half-dose tenecteplase if lytics indicated\n• **Cocaine-associated:** PCI strongly preferred (higher ICH risk with lytics)"}]'::jsonb,
 '[{"num":1,"text":"O’Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425."}]'::jsonb,
 false,
 5)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('stemi-reciprocal', 'PAILS Mnemonic', 'Reciprocal Changes in STEMI',
 '[{"body":"Reciprocal changes are ST-segment depression that mirrors the ST-segment elevation. Their presence helps confirm STEMI and differentiate from mimics (pericarditis has NO reciprocal changes). [1]"},{"heading":"PAILS Mnemonic","body":"**P**osterior → look for reciprocal changes in **A**nterior leads (V1-V3)\n**A**nterior → look for reciprocal changes in **I**nferior leads (II, III, aVF)\n**I**nferior → look for reciprocal changes in **L**ateral leads (I, aVL)\n**L**ateral → look for reciprocal changes in **I**nferior + **S**eptal leads"},{"heading":"Clinical Significance","body":"• aVL is almost completely opposite lead III — reciprocal changes in aVL are the most sensitive early sign of inferior STEMI [2]\n• Reciprocal changes indicate a significantly larger myocardial territory at risk [3]\n• May identify patients with greater potential for salvage with revascularization\n• Early ST depression or T-wave inversion in aVL may appear before STE develops in inferior leads"}]'::jsonb,
 '[{"num":1,"text":"Birnbaum Y, et al. ST Segment Depression in aVL: A Sensitive Marker for Acute Inferior Myocardial Infarction. Eur Heart J. 1993;14(1):4-7."},{"num":2,"text":"Hassen GW, et al. Lead aVL on ECG: Emerging as Important Lead in Early Diagnosis of MI. Am J Emerg Med. 2014;32(7):785-788."},{"num":3,"text":"Kidambi A, et al. Reciprocal ECG Change in Reperfused STEMI. Heart. 2013;99(22):1658-1662."}]'::jsonb,
 false,
 6)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('stemi-mimics', 'STEMI Mimics', 'Differential Diagnosis of ST-Segment Elevation',
 '[{"body":"ST-segment elevation has many causes beyond acute coronary occlusion. Clinical context, ECG pattern, and serial ECGs help differentiate. [1]"},{"heading":"Benign / Non-Emergency","body":"• **Benign early repolarization** — concave STE, young healthy patients, stable\n• **Normal variant** — persistent juvenile pattern, athlete''s heart\n• **Left ventricular hypertrophy** — strain pattern in lateral leads"},{"heading":"Potentially Life-Threatening","body":"• **Pericarditis** — diffuse concave STE, PR depression, no reciprocal changes\n• **Myocarditis** — focal or diffuse STE, may mimic STEMI closely\n• **Takotsubo (stress) cardiomyopathy** — anterior STE, apical ballooning on echo\n• **Aortic dissection** — may cause STEMI if dissection involves coronary ostium\n• **Pulmonary embolism** — right heart strain, STE in V1, S1Q3T3\n• **Hyperkalemia** — peaked T waves, widened QRS, pseudo-STEMI pattern"},{"heading":"Key Differentiating Features","body":"• **Reciprocal changes** strongly favor true STEMI (absent in pericarditis)\n• **Regional vs diffuse** STE — regional follows arterial distribution (STEMI)\n• **Convex vs concave** ST morphology — convex more concerning for STEMI\n• **Dynamic changes** on serial ECGs — evolving pattern favors STEMI\n• **Point-of-care echo** — RWMA in 93% of AMI (but also 43% of non-AMI) [2]\n• **Check serum potassium** if hyperkalemia suspected — rapid POC testing"}]'::jsonb,
 '[{"num":1,"text":"Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction (2018). Eur Heart J. 2019;40(3):237-269."},{"num":2,"text":"Sabia P, et al. Value of Regional Wall Motion Abnormality in the ER Diagnosis of Acute MI. Circulation. 1991;84(3 Suppl):I85-I92."}]'::jsonb,
 false,
 7)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('stemi-anticoag-detail', 'Anticoagulation for STEMI', 'PCI and Fibrinolysis Regimens',
 '[{"heading":"For Primary PCI","body":"","drugTable":[{"drug":"UFH (standard)","regimen":"Without GP IIb/IIIa: 70-100 units/kg IV bolus\nWith GP IIb/IIIa: 50-70 units/kg IV bolus\nAdditional boluses PRN for therapeutic ACT"},{"drug":"Bivalirudin (high bleed risk)","regimen":"0.75 mg/kg IV bolus, then 1.75 mg/kg/hr infusion\nWith or without prior UFH"}]},{"heading":"For Fibrinolytic Therapy (minimum 48 hours)","body":"","drugTable":[{"drug":"UFH","regimen":"60 units/kg bolus (max 4,000 units)\n12 units/kg/hr infusion (max 1,000 units/hr)\nTarget aPTT 1.5-2× control"},{"drug":"Enoxaparin","regimen":"Age <75: 30 mg IV bolus then 1 mg/kg SC q12h\nAge ≥75: No bolus, 0.75 mg/kg SC q12h\nCrCl <30: 1 mg/kg SC q24h"},{"drug":"Fondaparinux","regimen":"2.5 mg IV with first fibrinolytic dose\nThen 2.5 mg SC daily\nAvoid if CrCl <30. Supplement UFH if PCI needed."}]}]'::jsonb,
 '[{"num":1,"text":"O’Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425."}]'::jsonb,
 false,
 8)
;

COMMIT;
