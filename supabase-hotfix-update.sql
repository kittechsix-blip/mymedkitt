-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-09-07
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'electrocution';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 1, 'Corrall S, Laws S, Rice A. Low-voltage electrical injuries and the electrocardiogram: is a "normal" electrocardiogram sufficient for safe discharge from care? A systematic review. Br Paramed J. 2023;8(3):27-36. doi:10.29045/14784726.2023.12.8.3.27');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 2, 'Pilecky D, Vamos M, Bogyi P, et al. Risk of cardiac arrhythmias after electrical accident: a single-center study of 480 patients. Clin Res Cardiol. 2019;108(8):901-908. doi:10.1007/s00392-019-01420-2');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 3, 'Davis C, Engeln A, Johnson EL, et al. Wilderness Medical Society Practice Guidelines for the Prevention and Treatment of Lightning Injuries: 2014 Update. Wilderness Environ Med. 2014;25(4 Suppl):S86-S95. doi:10.1016/j.wem.2014.08.011');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 4, 'Ahmed J, Stenkula C, Omar S, et al. Patient outcomes after electrical injury — a retrospective study. Scand J Trauma Resusc Emerg Med. 2021;29:114. doi:10.1186/s13049-021-00920-3');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 5, 'Beyene R (content expert). Electrical Injury Practice Management Guideline. Vanderbilt University Medical Center Burn Center. Revised July 2026 (review July 2028). https://www.vumc.org/burn/sites/default/files/public_files/Protocols/Electrical-Injury-July-2026.pdf');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 6, 'Douillet D, Kalwant S, Amro Y, et al. Use of troponin assay after electrical injuries: a 15-year multicentre retrospective cohort in emergency departments. Scand J Trauma Resusc Emerg Med. 2021;29:141. doi:10.1186/s13049-021-00955-6');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 7, 'Einarson A, Bailey B, Inocencion G, Ormond K, Koren G. Accidental electric shock in pregnancy: a prospective cohort study. Am J Obstet Gynecol. 1997;176(3):678-681. doi:10.1016/s0002-9378(97)70569-6');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 8, 'Vilke G, Chan T, Bozeman WP, Childers R. Emergency Department Evaluation After Conducted Energy Weapon Use: Review of the Literature for the Clinician. J Emerg Med. 2019;57(5):740-746. doi:10.1016/j.jemermed.2019.06.037');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 9, 'Hoffman KA, Trigger CC. Pediatric Oral Commissure Burn. Clin Pract Cases Emerg Med. 2017;1(1):59-60. PMC5965444.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 10, 'Emergency Medicine Residents'' Association. Electrical Injuries in Children. EM Resident (adapted from Pediatric Emergency Medicine Practice, September 2013). https://www.emra.org/emresident/article/electrical-injuries-in-children');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 11, 'American Burn Association. Guidelines for Burn Patient Referral (Advice on Transfer and Consultation). 2022. https://ameriburn.org/burnreferral');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 12, 'Zemaitis MR, Guirguis M, Cindass R. Electrical Injuries. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; updated July 2025. https://www.ncbi.nlm.nih.gov/books/NBK448087/');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 13, 'Jensen JD, Thurman J, Vincent AL. Lightning Injuries. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2023. https://www.ncbi.nlm.nih.gov/books/NBK441920/');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('electrocution', 14, 'Smith I, Kidd S, Kim S, Tennill RM. Assessment and Management of Electrical Injuries in Adults in the Emergency Department. Cureus. 2026;18(4):e107162. doi:10.7759/cureus.107162');

COMMIT;