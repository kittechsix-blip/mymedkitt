-- =====================================================================
-- MedKitt — Thyroid Disorders Consult: Supabase INSERT Statements
-- Generated: 2026-03-23
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'thyroid',
  'Thyroid Disorders',
  'Storm vs Myxedema → Recognition → Multimodal Treatment → Disposition',
  '1.0',
  32,
  'thyroid-start',
  '["Initial Assessment","Decompensated Hypothyroidism — Evaluation","Decompensated Hypothyroidism — Monitoring","Thyroid Storm — Treatment Sequence","Thyroid Storm — Special Situations","Subclinical Findings"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('nephro-rheum-endo', 'thyroid', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (18 citations)
DELETE FROM tree_citations WHERE tree_id = 'thyroid';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('thyroid', 1, 'Ono Y, Ono S, Yasunaga H, et al. Clinical characteristics and outcomes of myxedema coma: analysis of a national inpatient database in Japan. J Epidemiol. 2017;27(3):117-122.'),
('thyroid', 2, 'Farkas J. Thyroid Storm. Internet Book of Critical Care (IBCC). Updated November 25, 2025. https://emcrit.org/ibcc/thyroid-storm/'),
('thyroid', 3, 'Farkas J. Decompensated Hypothyroidism (aka Myxedema Coma). Internet Book of Critical Care (IBCC). Updated November 29, 2025. https://emcrit.org/ibcc/myxedema/'),
('thyroid', 4, 'Burch HB, Wartofsky L. Life-threatening thyrotoxicosis. Thyroid storm. Endocrinol Metab Clin North Am. 1993;22(2):263-277.'),
('thyroid', 5, 'Jonklaas J, Bianco AC, Bauer AJ, et al. Guidelines for the treatment of hypothyroidism: prepared by the American Thyroid Association Task Force on Thyroid Hormone Replacement. Thyroid. 2014;24(12):1670-1751.'),
('thyroid', 6, 'Bourcier S, Coutrot M, Ferré A, et al. Critically ill severe hypothyroidism: a retrospective multicenter cohort study. Ann Intensive Care. 2023;13(1):15.'),
('thyroid', 7, 'Senda A, Endo A, Tachimori H, et al. Early administration of glucocorticoid for thyroid storm: analysis of a national administrative database. Crit Care. 2020;24(1):470.'),
('thyroid', 8, 'Ross DS, Burch HB, Cooper DS, et al. 2016 American Thyroid Association guidelines for diagnosis and management of hyperthyroidism and other causes of thyrotoxicosis. Thyroid. 2016;26(10):1343-1421.'),
('thyroid', 9, 'Akamizu T, Satoh T, Isozaki O, et al. Diagnostic criteria, clinical features, and incidence of thyroid storm based on nationwide surveys. Thyroid. 2012;22(7):661-679.'),
('thyroid', 10, 'Swee DS, Chng CL, Lim A. Clinical characteristics and outcome of thyroid storm: a case series and review of neuropsychiatric derangements in thyrotoxicosis. Endocr Pract. 2015;21(2):182-189.'),
('thyroid', 11, 'Galindo RJ, Hurtado CR, Pasquel FJ, et al. National trends in incidence, mortality, and clinical outcomes of patients hospitalized for thyrotoxicosis with and without thyroid storm in the United States, 2004-2013. Thyroid. 2019;29(1):36-43.'),
('thyroid', 12, 'Ono Y, Ono S, Yasunaga H, et al. Factors associated with mortality of thyroid storm: analysis using a national inpatient database in Japan. Medicine. 2016;95(7):e2848.'),
('thyroid', 13, 'Vyas AA, Vyas P, Fillipon NL, et al. Successful treatment of thyroid storm with plasmapheresis in a patient with methimazole-induced agranulocytosis. Endocr Pract. 2010;16(4):673-676.'),
('thyroid', 14, 'Kruithoff ML, Gigliotti BJ. Thyroid Emergencies: A Narrative Review. Endocr Pract. 2025;31(10):1310-1318.'),
('thyroid', 15, 'Alexander EK, Pearce EN, Brent GA, et al. 2017 Guidelines of the American Thyroid Association for the diagnosis and management of thyroid disease during pregnancy and the postpartum. Thyroid. 2017;27(3):315-389.'),
('thyroid', 16, 'Kaykhaei MA, Shams M, Sadegholvad A, et al. Low doses of cholestyramine in the treatment of hyperthyroidism. Endocrine. 2008;34(1-3):52-55.'),
('thyroid', 17, 'Rodondi N, den Elzen WPJ, Bauer DC, et al. Subclinical hypothyroidism and the risk of coronary heart disease and mortality. JAMA. 2010;304(12):1365-1374.'),
('thyroid', 18, 'Satoh T, Isozaki O, Suzuki A, et al. 2016 Guidelines for the management of thyroid storm from The Japan Thyroid Association and Japan Endocrine Society. Endocr J. 2016;63(12):1025-1064.');

DELETE FROM decision_nodes WHERE tree_id = 'thyroid';
COMMIT;
