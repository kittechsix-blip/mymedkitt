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
COMMIT;
