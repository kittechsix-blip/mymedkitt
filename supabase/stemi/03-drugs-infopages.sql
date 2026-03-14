BEGIN;
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
