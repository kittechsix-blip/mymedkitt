-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-25
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'ed-extubation';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('ed-extubation', 1, 'American Association for Respiratory Care. AARC Clinical Practice Guideline: Removal of the Endotracheal Tube. Respir Care. 2007;52(1):81-93.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('ed-extubation', 2, 'Ouellette DR, et al. AARC Clinical Practice Guideline: Spontaneous Breathing Trials for Liberation From Adult Mechanical Ventilation. Respir Care. 2024;69(7):891-901.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('ed-extubation', 3, 'Schmidt GA, et al. Official Executive Summary of an ATS/ACCP Clinical Practice Guideline: Liberation From Mechanical Ventilation in Critically Ill Adults. Am J Respir Crit Care Med. 2017;195(1):115-119.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('ed-extubation', 4, 'Girard TD, et al. An Official ATS/ACCP Clinical Practice Guideline: Liberation From Mechanical Ventilation in Critically Ill Adults. Cuff Leak Tests and Corticosteroids. Am J Respir Crit Care Med. 2017;195(1):120-133.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('ed-extubation', 5, 'Rochwerg B, et al. Official ERS/ATS Clinical Practice Guidelines: Noninvasive Ventilation for Acute Respiratory Failure. Eur Respir J. 2017;50(2):1602426.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('ed-extubation', 6, 'Hernandez G, et al. Effect of Postextubation High-Flow Nasal Cannula vs Noninvasive Ventilation on Reintubation in High-Risk Patients. JAMA. 2016;316(15):1565-1574.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('ed-extubation', 7, 'Kuriyama A, Jackson JL, Kamei J. Performance of the Cuff Leak Test in Adults in Predicting Post-Extubation Airway Complications: Systematic Review and Meta-analysis. Crit Care. 2020;24:640.');

COMMIT;