-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-14
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: cric-position (3 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":3,"title":"Patient Positioning","body":"**Optimal positioning:** [1][2]\n\n**Standard:**\n• Supine with **neck extended** (unless C-spine precautions)\n• Shoulder roll to extend neck and elevate larynx\n• Operator standing at patient''s **side** (not at head)\n\n**C-spine precautions:**\n• Maintain neutral alignment\n• Do NOT hyperextend\n• May need assistant for manual in-line stabilization\n• Collar should be opened or removed anteriorly\n\n**Obese patients:**\n• May need \"ramped\" position (head elevated)\n• Palpate landmarks carefully — fat obscures anatomy\n• Consider vertical incision to expose more tissue\n\n**Operator positioning:**\n• **Right-handed:** Stand on patient''s right side\n• **Left-handed:** Stand on patient''s left side\n• Non-dominant hand stabilizes larynx throughout procedure\n\n**Pre-procedure landmarks:**\n• Identify CTM with laryngeal handshake BEFORE patient decompensates\n• Mark with pen or fingernail if time permits\n• **Ultrasound** can localize CTM when palpation is difficult (obese, edema, anatomic distortion) — DAS 2025 explicitly endorses [6]","citation":[1,2,6],"next":"cric-technique-vertical","summary":"Neck extended (unless C-spine), operator at side, non-dominant hand stabilizes larynx throughout; US for difficult CTM (DAS 2025)"}'::jsonb
WHERE id = 'cric-position' AND tree_id = 'cricothyrotomy';

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'cricothyrotomy';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('cricothyrotomy', 1, 'Duggan LV, et al. Cricothyroidotomy. StatPearls [Internet]. NCBI Bookshelf. 2024.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('cricothyrotomy', 2, 'Weingart S. Cricothyrotomy — Cut to Air: Emergency Surgical Airway. EMCrit Podcast 131. 2014.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('cricothyrotomy', 3, 'Bair AE, Panacek EA, Wisner DH, et al. Cricothyrotomy: A 5-year experience at one institution. J Emerg Med. 2003;24(2):151-156.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('cricothyrotomy', 4, 'Salah N, et al. A comparison of four methods for cricothyroid membrane identification in an RCT. Anesth Analg. 2020;131:e203-e206.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('cricothyrotomy', 5, 'Hill C, et al. Emergency Surgical Cricothyroidotomy: 24 Successful Cases Leading to a Simple "Scalpel-Finger-Tube" Method. J Emerg Med. 2012;42(3):e83-e88. PMID: 22313556.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('cricothyrotomy', 6, 'Ahmad I, El-Boghdadly K, Iliff H, et al. Difficult Airway Society 2025 guidelines for management of unanticipated difficult tracheal intubation in adults. Br J Anaesth. 2026 Jan;136(1):283-307. (Updates DAS 2015; reaffirms scalpel-bougie-tube as first-line eFONA; adds ultrasound for difficult CTM landmarks.)');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('cricothyrotomy', 7, 'LITFL. Surgical Cricothyroidotomy. Life in the Fast Lane. 2024.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('cricothyrotomy', 8, 'Hubble MW, et al. A Meta-analysis of Prehospital Airway Control Techniques. Prehosp Emerg Care. 2010;14(3):377-401.');

COMMIT;