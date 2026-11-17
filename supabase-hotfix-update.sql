-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-17
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'pedi-resus-numbers';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pedi-resus-numbers', 1, 'Randall Children''s Hospital. Pediatric Emergency Quick Reference (Randall card). Oregon EMS for Children; Oct 2020. https://www.oregon.gov/oha/PH/PROVIDERPARTNERRESOURCES/EMS/EMSFORCHILDREN/Documents/Emergency-Quick-Reference-Randall.PDF');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pedi-resus-numbers', 2, 'Children''s Minnesota. Pediatric Emergency Reference Card M0055; 06/2025. https://cmn.education.childrensmn.org/sites/default/files/media/2025-06/M0055_CRT_EDT_Ped%20Emergency%20reference%20card.pdf');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pedi-resus-numbers', 3, 'Topjian AA, Raymond TT, Atkins D, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation. 2020;142(16 suppl 2):S469-S523.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pedi-resus-numbers', 4, 'Lasa JJ, Dhillon GS, Duff JP, et al. Part 8: Pediatric Advanced Life Support: 2025 American Heart Association and American Academy of Pediatrics Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation. 2025;152(16 suppl 2). doi:10.1161/CIR.0000000000001368.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pedi-resus-numbers', 5, 'European Resuscitation Council and Resuscitation Council UK. Paediatric Life Support Guidelines 2025. Resuscitation. 2025.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pedi-resus-numbers', 6, 'ECRI and ISMP. Joint hazard alert: action needed to address incorrect information on the Broselow Rainbow Tape; rev. Jan 22, 2026. https://home.ecri.org/blogs/ismp-alerts-and-articles-library/joint-hazard-alert-action-needed-to-address-incorrect-information-on-the-broselow-rainbow-tape');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pedi-resus-numbers', 7, 'Duracher C, Schmautz E, Martinon C, et al. Evaluation of cuffed tracheal tube size predicted using the Khine formula in children. Paediatr Anaesth. 2008;18(2):113-118. PMID 18184241.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pedi-resus-numbers', 8, 'Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics. 1957;19(5):823-832. PMID 13431307.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pedi-resus-numbers', 9, 'Luscombe M, Owens B. Weight estimation in resuscitation: is the current formula still valid? Arch Dis Child. 2007;92(5):412-415. PMID 17213259.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('pedi-resus-numbers', 10, 'Advanced Life Support Group. Advanced Paediatric Life Support: The Practical Approach. 5th ed. Wiley-Blackwell; 2011.');

COMMIT;