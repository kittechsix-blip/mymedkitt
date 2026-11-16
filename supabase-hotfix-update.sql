-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-16
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: nrp-cord-mgmt (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":1,"title":"Cord Management (2025 Update)","body":"DELAYED CORD CLAMPING (DCC) — 2025 GUIDELINES [1][5]\n\n**Vigorous term/late preterm:**\n• DCC **at least 60 seconds** recommended\n• Improves placental transfusion, iron stores, and hemoglobin\n\n**Non-vigorous ≥35 weeks:**\n• **Intact cord milking (ICM)** may be reasonable (compared to immediate clamping)\n• Milk cord toward baby 3–4 times over 2 seconds\n\n**Preterm 28+0 to 36+6 weeks:**\n• ICM only when DCC isn''t possible\n\n**<28 weeks:**\n• ICM is **NOT recommended** — risk of intraventricular hemorrhage\n\n**Clamp immediately if:**\n• Baby needs resuscitation and can''t wait\n• Placental abruption, cord avulsion, or other emergency\n\n**Communicate cord management plan to the team before delivery.** [5]","citation":[1,5],"next":"nrp-preterm","summary":"DCC at least 60 sec for vigorous term; intact cord milking if non-vigorous ≥35wk; NO milking <28wk (IVH risk); clamp immediately if resus needed"}'::jsonb
WHERE id = 'nrp-cord-mgmt' AND tree_id = 'neonatal-resus';

-- Node: nrp-uvc (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":5,"title":"Umbilical Venous Catheter (UVC)","body":"UVC PROCEDURE [1][2]\n\n**Umbilical cord anatomy:**\n• **2 arteries** — thick-walled, small lumen (at top of cross-section)\n• **1 vein** — thin-walled, large lumen (at bottom of cross-section)\n• **Catheterize the VEIN** — larger, easier to cannulate\n\n**Catheter size:**\n• **5 French** — term\n• **3.5 French** — preterm\n\n**Procedure:**\n1. Tie **umbilical tape** at base of stump — gentle tie to control bleeding\n2. Cut cord 1–2 cm above skin\n3. Identify the single large-lumen vein\n4. **Prime catheter** with NS\n5. Insert gently — **only 2–4 cm** until blood aspirates freely\n6. Do NOT advance further — risk of hepatic injury\n\n**IO access** is an acceptable alternative if UVC cannot be placed quickly.\n\n**Once access is established:** give IV epinephrine (preferred over ET route). [1][2]","citation":[1,2],"next":"nrp-persistent","images":[{"src":"images/neonatal-resus/uvc-anatomy.png","alt":"Umbilical cord cross-section showing 2 arteries and 1 vein, with side view of UVC insertion through umbilical stump — emergency insertion 2-4 cm, until free blood return","caption":"UVC anatomy: 2 arteries (thick, small) + 1 vein (thin, large). Emergency insertion: 2-4 cm, until blood aspirates freely."}],"summary":"UVC: catheterize the single large VEIN (not arteries), 5Fr term/3.5Fr preterm, insert only 2-4 cm until blood return, prime with NS"}'::jsonb
WHERE id = 'nrp-uvc' AND tree_id = 'neonatal-resus';

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'neonatal-resus';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('neonatal-resus', 1, 'Lee HC, Strand ML, et al. Part 5: Neonatal Resuscitation. Circulation 2025;152(16 suppl 2):S385-S423. PMID 41122887.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('neonatal-resus', 2, 'Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP). 8th ed. AAP; 2021.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('neonatal-resus', 3, 'Aziz K, Lee HC, Escobedo MB, et al. Part 5: Neonatal Resuscitation. Circulation. 2020;142(16 suppl 2):S524-S550.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('neonatal-resus', 4, 'Wyckoff MH, et al. Neonatal Life Support: 2020 ILCOR Consensus. Circulation. 2020;142(16 suppl 1):S185-S221.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('neonatal-resus', 5, 'ACOG Committee Opinion No. 684: Delayed Umbilical Cord Clamping. Obstet Gynecol. 2017;129(1):e5-e10.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('neonatal-resus', 6, 'Perlman JM, et al. Part 7: Neonatal Resuscitation. 2015 ILCOR Consensus. Circulation. 2015;132(16 suppl 1):S204-S241.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('neonatal-resus', 7, 'Kattwinkel J, et al. Part 15: Neonatal Resuscitation. Circulation. 2010;122(18 suppl 3):S909-S919.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('neonatal-resus', 8, 'McFarlin A. ED Management of Precipitous Delivery and Neonatal Resuscitation. Emerg Med Rep. 2019;40(11).');

COMMIT;