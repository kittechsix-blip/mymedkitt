BEGIN;
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



COMMIT;
