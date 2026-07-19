-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-07-19
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'bleeding-av-fistula';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('bleeding-av-fistula', 1, 'Lok CE, Huber TS, Lee T, et al. KDOQI Clinical Practice Guideline for Vascular Access: 2019 Update. Am J Kidney Dis. 2020;75(4 Suppl 2):S1-S164.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('bleeding-av-fistula', 2, 'National Kidney Foundation KDOQI Vascular Access Implementation Tool 17. AV Access Aneurysm and Pseudoaneurysm Management. Accessed 2026.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('bleeding-av-fistula', 3, 'Kidney Care UK. Controlling bleeds from a fistula or graft. Accessed 2026.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('bleeding-av-fistula', 4, 'Eberle ML, Schechter-Perkins EM, Altawil Z. Topical tranexamic acid (TXA) for the management of a bleeding arteriovenous fistula. Am J Emerg Med. 2020;38(2):407.e5-407.e6. doi:10.1016/j.ajem.2019.158441.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('bleeding-av-fistula', 5, 'Lai Q, Zhang H, Chen B, et al. A simple tourniquet technique for bleeding control after percutaneous hemodialysis fistula and graft interventions. BMC Nephrol. 2020;21:112. doi:10.1186/s12882-020-01784-y.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('bleeding-av-fistula', 6, 'A simple technique to control a bleeding arteriovenous fistula. Ann R Coll Surg Engl. 2007;89(5):W12-W13.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('bleeding-av-fistula', 7, 'EMCrit/IBCC. Anticoagulant reversal: protamine, DDAVP, TXA, PCC, DOAC reversal. Accessed 2026.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('bleeding-av-fistula', 8, 'Desborough MJ, Oakland KA, Landoni G, et al. Desmopressin for treatment of platelet dysfunction and reversal of antiplatelet agents: systematic review and meta-analysis. J Thromb Haemost. 2017;15(2):263-272.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('bleeding-av-fistula', 9, 'Evaluating the Emergency Management of Arteriovenous Fistula and Graft Bleeds. Ann Vasc Surg. 2025. doi:10.1016/j.avsg.2025.06.xxx. (>1/3 of ED AV access bleeds are life-threatening/high-risk requiring urgent operative intervention; up to 40% of fatal bleeds preceded by a herald bleed or infection; access salvage prioritized over tunneled-catheter conversion, which carries the poorest 1-yr outcomes.)');

COMMIT;