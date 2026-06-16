-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-06-16
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: burn-eschar-technique (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":5,"title":"Escharotomy Technique — Extremity","body":"[Escharotomy Technique](#/info/burns-escharotomy)\n\n**Escharotomy is an emergency bedside procedure** — performed through insensate full-thickness eschar. If the patient has full-thickness burns, the incision should be painless (no local anesthesia needed in the eschar). Provide sedation/analgesia for patient comfort.\n\n**Incision lines — medial and lateral mid-axial lines:**\n\n**Upper extremity:**\n• Lateral: axilla → lateral epicondyle → dorsal wrist\n• Medial: axilla → medial epicondyle → volar wrist\n• Avoid the ulnar nerve at the medial epicondyle\n• If hand involved: incisions on dorsum between metacarpals, NOT on palmar surface\n\n**Lower extremity:**\n• Lateral: groin → lateral malleolus\n• Medial: groin → medial malleolus (posterior to medial malleolus to avoid saphenous vein/nerve)\n• Avoid the common peroneal nerve at the fibular head\n\n**Technique:**\n1. Incise through eschar down to subcutaneous fat — the wound should visibly open/separate\n2. Use electrocautery or scalpel\n3. Extend incisions proximally and distally until eschar releases\n4. If crossing a joint, use a Z-incision or S-curve to prevent contracture\n5. Hemostasis with electrocautery or topical hemostatic agents\n6. Cover with silver sulfadiazine or moist dressings\n\n**Post-procedure:** Reassess with Doppler every 15 min × 1 hr. If no improvement → consider **fasciotomy** (deeper decompression requiring OR).","citation":[11,12,14,21,22,24],"next":"burn-transfer","images":[{"src":"images/burns/burns-escharotomy-cut-lines.svg","alt":"Escharotomy cut-line map for chest, arms, hands, legs, and feet","caption":"Red lines show where to cut: limb mid-axial lines, chest anterior/mid-axillary decompression lines, and dorsal hand/foot extensions. Black marks show danger zones to avoid."}],"summary":"Mid-axial incisions through eschar to subQ — avoid ulnar nerve","skippable":true}'::jsonb
WHERE id = 'burn-eschar-technique' AND tree_id = 'burns';

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'burns';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 1, 'Walker PF et al. Diagnosis and management of inhalation injury: an updated review. Crit Care. 2015;19:351.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 2, 'Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 3, 'Singer AJ, Dagum AB. Current Management of Acute Cutaneous Wounds. NEJM. 2008;359(10):1037-46.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 4, 'Bitter CC et al. WMS Clinical Practice Guideline on Care of Burns in the Wilderness. Wilderness Environ Med. 2025;36(4):549-558.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 5, 'Weaver LK. Carbon Monoxide Poisoning. NEJM. 2009;360(12):1217-25.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 6, 'Cho DH et al. Practical Recommendations for Cardiac Injury in CO Poisoning. JACC Heart Fail. 2024;12(8):1343-1352.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 7, 'Lavonas EJ et al. AHA Focused Update on Management of Patients with Cardiac Arrest or Life-Threatening Toxicity Due to Poisoning. Circulation. 2023;148(16):e149-e184.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 8, 'Sheridan RL. Fire-Related Inhalation Injury. NEJM. 2016;375(5):464-9.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 9, 'Henretig FM et al. Hazardous Chemical Emergencies and Poisonings. NEJM. 2019;380(17):1638-1655.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 10, 'Baud FJ et al. Elevated Blood Cyanide Concentrations in Victims of Smoke Inhalation. NEJM. 1991;325(25):1761-6.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 11, 'Mataro I et al. Releasing Burn-Induced Compartment Syndrome by Enzymatic Escharotomy-Debridement. J Burn Care Res. 2020;41(5):1097-1103.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 12, 'Butts CC et al. Surgical Escharotomy and Decompressive Therapies in Burns. J Burn Care Res. 2020;41(2):263-269.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 13, 'Clayton JM et al. Sequential Circulatory Changes in the Circumferentially Burned Limb. Ann Surg. 1977;185(4):391-6.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 14, 'de Barros MEPM et al. Revisiting Escharotomy in Patients With Burns in Extremities. J Burn Care Res. 2017;38(4):e691-e698.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 15, 'Rizzo JA et al. Higher Initial Formula for Resuscitation After Severe Burn Injury Means Higher 24-Hour Volumes. J Burn Care Res. 2023;44(5):1017-1022.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 16, 'Hewett Brumberg EK et al. AHA and ARC Guidelines for First Aid. Circulation. 2024;150(24):e519-e579.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 17, 'Wasiak J et al. Dressings for Superficial and Partial Thickness Burns. Cochrane. 2013;(3):CD002106.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 18, 'Aydelotte JD. Dell-Seton (DSMC-UT) Institutional Burn Resuscitation Protocol. Dr. Jayson D. Aydelotte MD FACS, Burn Medical Director, The University of Texas at Austin Dell Medical School.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 19, 'Akelma H et al. Rare Chemical Burns: Review of the Literature. Int Wound J. 2019;16(6):1330-1338.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 20, 'Colson CD et al. EasyTBSA as a Method for Calculating TBSA Burned. Emerg Med J. 2023;40(4):279-284.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 21, 'Pegg SP. Escharotomy in Burns. Ann Acad Med Singapore. 1992;21(5):682-4.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 22, 'James AJ et al. Anatomy of Grayson''s and Cleland''s Ligaments: Basis of Digit Escharotomy. Ann Plast Surg. 2025;95(1):51-53.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 23, 'Cuttle L et al. Management of Non-Severe Burn Wounds in Children. Lancet Child Adolesc Health. 2022;6(4):269-278.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('burns', 24, 'NSW Agency for Clinical Innovation. Escharotomy for burn patients: a guide for clinicians. August 2025.');

COMMIT;