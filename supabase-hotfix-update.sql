-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-19
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: acute-keratitis-microbial (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":4,"title":"Suspected Microbial Corneal Ulcer","body":"Contact ophthalmology now. Determine whether urgent corneal sampling is indicated and immediately available using [Escalate](#/info/keratitis-escalate). Obtain indicated samples before antibiotics when feasible, but do not delay sight-saving treatment during prolonged transfer. [1,2]\n\nContact-lens-associated disease requires antipseudomonal coverage. An abrasion prophylaxis or conjunctivitis-frequency regimen is inadequate for an established ulcer. [1]","citation":[1,2],"next":"acute-keratitis-severity","summary":"Ophthalmology, appropriate sampling and intensive topical therapy proceed without avoidable delay.","safetyLevel":"critical"}'::jsonb
WHERE id = 'acute-keratitis-microbial' AND tree_id = 'acute-keratitis';

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'acute-keratitis';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 1, 'American Academy of Ophthalmology. Bacterial Keratitis Preferred Practice Pattern. Ophthalmology. 2024. https://www.aaojournal.org/article/S0161-6420(24)00007-1/fulltext');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 2, 'American Academy of Ophthalmology EyeWiki. Bacterial Keratitis. https://eyewiki.aao.org/Bacterial_Keratitis');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 3, 'Ciprofloxacin hydrochloride ophthalmic solution 0.3% (Sandoz). US prescribing information, 2022. Corneal ulcer regimen. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ab52b14d-345b-47ff-a832-465caddd3801');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 4, 'White ML, Chodosh J. Herpes Simplex Virus Keratitis: A Treatment Guideline. Massachusetts Eye and Ear; accepted by AAO, 2014. https://www.aao.org/Assets/6564936e-9929-48b6-93cd-15872a1b388e/635424082284100000/hsv-keratitis-treatment-guideline-harvard-pdf');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 5, 'ZIRGAN (ganciclovir ophthalmic gel 0.15%). FDA prescribing information. 2026. https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/022211s007lbl.pdf');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 6, 'American Academy of Ophthalmology EyeNet. Herpes Zoster Ophthalmicus: Pearls. https://www.aao.org/eyenet/article/herpes-zoster-ophthalmicus-pearls');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 7, 'VALTREX (valacyclovir). US prescribing information. Herpes zoster and renal adjustment. https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=56a62c21-bead-4f3b-a24e-c3fd0b4a732f');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 8, 'NATACYN (natamycin ophthalmic suspension 5%). FDA prescribing information. 2025. https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/050514s022lbl.pdf');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 9, 'Centers for Disease Control and Prevention. Clinical Overview of Acanthamoeba Keratitis. https://www.cdc.gov/acanthamoeba/hcp/clinical-overview-acanthamoeba-keratitis/');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 10, 'American Academy of Ophthalmology EyeWiki. Photokeratitis. https://eyewiki.aao.org/Photokeratitis');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 11, 'American Academy of Ophthalmology EyeWiki. Exposure Keratopathy. https://eyewiki.aao.org/Exposure_Keratopathy');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 12, 'Green SM, et al. Use of Topical Anesthetics in the Management of Patients With Simple Corneal Abrasions: Consensus Guidelines From ACEP. Ann Emerg Med. 2024. https://www.annemergmed.com/article/S0196064424000040/pdf');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('acute-keratitis', 13, 'Merck Manual Professional Edition. Corneal Ulcer. Reviewed/revised 2026. https://www.merckmanuals.com/professional/eye-disorders/corneal-disorders/corneal-ulcer');

COMMIT;