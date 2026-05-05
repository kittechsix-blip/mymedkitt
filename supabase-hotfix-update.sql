-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-05
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'pea-arrest';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 1, 'Farkas J. PEA Cardiac Arrest. EMCrit IBCC. https://emcrit.org/ibcc/pea/');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 2, 'Littmann L et al. A Simplified Teaching Tool for PEA. Med Princ Pract. 2014;23(1):1-6.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 3, 'Breitkreutz R et al. Focused Echo in Life Support and Periresuscitation. Resuscitation. 2010;81(11):1431-1433.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 4, 'Driver BE et al. Identification of Treatable Causes of Cardiac Arrest by Ultrasound. Resuscitation. 2017;120:116-120.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 5, 'AHA Guidelines for CPR and ECC. Part 9: Adult Advanced Life Support. Circulation. 2025.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 6, 'Taming the SRU. RUSH Exam in Cardiac Arrest. tamingthesru.com.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 7, 'Soar J et al. ERC Guidelines 2021: Advanced Life Support. Resuscitation. 2021;161:115-151.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 8, 'First10EM. PEA Cardiac Arrest — What Works? first10em.com.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 9, 'Link MS et al. Part 7: Adult Advanced Cardiovascular Life Support. Circulation. 2015.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 10, 'Myerburg RJ et al. Electrolyte Derangements in Cardiac Arrest. Circulation. 2018.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 11, 'Perera P et al. The RUSH Exam: Rapid Ultrasound in Shock. Emerg Med Clin North Am. 2010;28(1):29-56.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 12, 'Helman A, Simard R, Weingart S. PEA Arrest, PseudoPEA and PREM. Emergency Medicine Cases. October 2019. https://emergencymedicinecases.com/pea-arrest-pseudopea-prem');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 13, 'Paradis NA et al. Aortic pressure during human cardiac arrest: identification of pseudo-electromechanical dissociation. Chest. 1992;101:123-128.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 14, 'Weingart S. Pulseless Electrical Activity is Stupid. EMCrit. https://emcrit.org/emcrit/pea-is-stupid/');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pea-arrest', 15, 'Bergman R. Wide vs Narrow QRS Complex Approach to PEA Arrest. Resuscitation. 2016;109:e13.');

-- Node: rosc-ttm-coma (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":3,"title":"Comatose — Prevent Fever Aggressively","body":"**Comatose after ROSC: prevent fever aggressively.**\n\n**TTM2 Trial (2021):** 33°C vs 37.5°C showed no difference in mortality or neurological outcome.\n\n**Current approach (2023 AHA):**\n• Target **normothermia** — actively prevent fever >37.8°C × 72h (32-37.5°C for at least 36h per AHA 2025)\n• Cooling to 32-36°C is acceptable but NOT required\n• Surface cooling devices, IV cold saline bolus, or intravascular cooling\n\n**Anti-shivering protocol:**\n• [Magnesium Sulfate](#/drug/magnesium-sulfate/ttm) 4g IV (raises shivering threshold)\n• Sedation: propofol or midazolam infusion\n• [Meperidine](#/drug/meperidine/shivering) 25-50mg IV (centrally acting)\n• Neuromuscular blockade if refractory\n\n**Monitor:** Core temp continuously (esophageal or bladder probe). Avoid overcooling.","citation":[2,3,4,10],"next":"rosc-neuro","summary":"TTM2: no benefit of cooling to 33C — prevent fever >37.7C x72h, anti-shivering protocol required","safetyLevel":"critical"}'::jsonb
WHERE id = 'rosc-ttm-coma' AND tree_id = 'post-rosc';

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'post-rosc';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 1, 'Callaway CW et al. Part 8: Post-Cardiac Arrest Care. Circulation. 2015;132(18 Suppl 2):S465-S482.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 2, 'AHA Guidelines for CPR and ECC. Part 11: Post-Cardiac Arrest Care. Circulation. 2025.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 3, 'Dankiewicz J et al. Hypothermia versus Normothermia after OHCA (TTM2). NEJM. 2021;384:2283-2294.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 4, 'Nielsen N et al. Targeted Temperature Management at 33°C versus 36°C (TTM). NEJM. 2013;369:2197-2206.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 5, 'Soar J et al. ERC Guidelines 2021: Advanced Life Support. Resuscitation. 2021;161:115-151.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 6, 'Nolan JP et al. ERC/ESICM Guidelines on Post-Resuscitation Care. Resuscitation. 2021;161:220-269.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 7, 'Dumas F et al. Routine Post-Resuscitation ECG to Predict Early Coronary Angiography. JACC. 2012.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 8, 'Sandroni C et al. Prognostication in Comatose Survivors of Cardiac Arrest. Intensive Care Med. 2014;40(12):1816-1831.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 9, 'Elmer J et al. Long-Term Outcomes of Post-Arrest Patients. Neurology. 2016.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 10, 'Donnino MW et al. Temperature Management After Cardiac Arrest. Circulation. 2015.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 11, 'Farkas J. Post-Cardiac Arrest Care. EMCrit IBCC. https://emcrit.org/ibcc/post-arrest/');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 12, 'Geocadin RG et al. Standards for Studies of Neurological Prognostication in Comatose Survivors. Resuscitation. 2019.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 13, 'Zanuttini D et al. Routine Coronary Angiography After OHCA Without Obvious Non-Cardiac Cause. Resuscitation. 2012;83(10):1259-1263.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('post-rosc', 14, 'Lemkes JJ et al. Coronary Angiography After OHCA Without STEMI (COACT). NEJM. 2019;380:1397-1407.');

COMMIT;