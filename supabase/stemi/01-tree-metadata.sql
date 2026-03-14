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


COMMIT;
