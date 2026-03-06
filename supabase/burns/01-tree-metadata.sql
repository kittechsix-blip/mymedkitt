-- =====================================================================
-- MedKitt — Burns Management Consult: Supabase INSERT Statements
-- Generated: 2026-03-05
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'burns',
  'Burns Management',
  'Assessment → TBSA → Resuscitation → Wound Care → Disposition',
  '1.0',
  49,
  'burn-start',
  '["Initial Assessment","TBSA Calculation","Fluid Resuscitation","Airway & Inhalation","Escharotomy","Chemical Burns","Wound Care & Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('trauma-surg', 'burns', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (23 citations)
DELETE FROM tree_citations WHERE tree_id = 'burns';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('burns', 1, 'Walker PF et al. Diagnosis and management of inhalation injury: an updated review. Crit Care. 2015;19:351.'),
('burns', 2, 'Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.'),
('burns', 3, 'Singer AJ, Dagum AB. Current Management of Acute Cutaneous Wounds. NEJM. 2008;359(10):1037-46.'),
('burns', 4, 'Bitter CC et al. WMS Clinical Practice Guideline on Care of Burns in the Wilderness. Wilderness Environ Med. 2025;36(4):549-558.'),
('burns', 5, 'Weaver LK. Carbon Monoxide Poisoning. NEJM. 2009;360(12):1217-25.'),
('burns', 6, 'Cho DH et al. Practical Recommendations for Cardiac Injury in CO Poisoning. JACC Heart Fail. 2024;12(8):1343-1352.'),
('burns', 7, 'Lavonas EJ et al. AHA Focused Update on Management of Patients with Cardiac Arrest or Life-Threatening Toxicity Due to Poisoning. Circulation. 2023;148(16):e149-e184.'),
('burns', 8, 'Sheridan RL. Fire-Related Inhalation Injury. NEJM. 2016;375(5):464-9.'),
('burns', 9, 'Henretig FM et al. Hazardous Chemical Emergencies and Poisonings. NEJM. 2019;380(17):1638-1655.'),
('burns', 10, 'Baud FJ et al. Elevated Blood Cyanide Concentrations in Victims of Smoke Inhalation. NEJM. 1991;325(25):1761-6.'),
('burns', 11, 'Mataro I et al. Releasing Burn-Induced Compartment Syndrome by Enzymatic Escharotomy-Debridement. J Burn Care Res. 2020;41(5):1097-1103.'),
('burns', 12, 'Butts CC et al. Surgical Escharotomy and Decompressive Therapies in Burns. J Burn Care Res. 2020;41(2):263-269.'),
('burns', 13, 'Clayton JM et al. Sequential Circulatory Changes in the Circumferentially Burned Limb. Ann Surg. 1977;185(4):391-6.'),
('burns', 14, 'de Barros MEPM et al. Revisiting Escharotomy in Patients With Burns in Extremities. J Burn Care Res. 2017;38(4):e691-e698.'),
('burns', 15, 'Rizzo JA et al. Higher Initial Formula for Resuscitation After Severe Burn Injury Means Higher 24-Hour Volumes. J Burn Care Res. 2023;44(5):1017-1022.'),
('burns', 16, 'Hewett Brumberg EK et al. AHA and ARC Guidelines for First Aid. Circulation. 2024;150(24):e519-e579.'),
('burns', 17, 'Wasiak J et al. Dressings for Superficial and Partial Thickness Burns. Cochrane. 2013;(3):CD002106.'),
('burns', 18, 'Dell-Seton (DSMC-UT) Institutional Burn Resuscitation Protocol.'),
('burns', 19, 'Akelma H et al. Rare Chemical Burns: Review of the Literature. Int Wound J. 2019;16(6):1330-1338.'),
('burns', 20, 'Colson CD et al. EasyTBSA as a Method for Calculating TBSA Burned. Emerg Med J. 2023;40(4):279-284.'),
('burns', 21, 'Pegg SP. Escharotomy in Burns. Ann Acad Med Singapore. 1992;21(5):682-4.'),
('burns', 22, 'James AJ et al. Anatomy of Grayson''s and Cleland''s Ligaments: Basis of Digit Escharotomy. Ann Plast Surg. 2025;95(1):51-53.'),
('burns', 23, 'Cuttle L et al. Management of Non-Severe Burn Wounds in Children. Lancet Child Adolesc Health. 2022;6(4):269-278.');

DELETE FROM decision_nodes WHERE tree_id = 'burns';


COMMIT;
