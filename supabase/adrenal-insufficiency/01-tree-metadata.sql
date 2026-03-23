-- =====================================================================
-- MedKitt — Adrenal Insufficiency Consult: Supabase INSERT Statements
-- Generated: 2026-03-16
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'adrenal-insufficiency',
  'Adrenal Insufficiency',
  'Crisis Recognition → Treatment → Classification → Maintenance → Disposition',
  '1.0',
  27,
  'ai-start',
  '["Initial Assessment","Crisis Treatment","Type Classification","Diagnostic Workup","Maintenance & Stress Dosing","Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('nephro-rheum-endo', 'adrenal-insufficiency', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (18 citations)
DELETE FROM tree_citations WHERE tree_id = 'adrenal-insufficiency';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('adrenal-insufficiency', 1, 'Bornstein SR, Allolio B, Arlt W, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab. 2016;101(2):364-389.'),
('adrenal-insufficiency', 2, 'Rushworth RL, Torpy DJ, Falhammar H. Adrenal Crisis. N Engl J Med. 2019;381(9):852-861.'),
('adrenal-insufficiency', 3, 'Hahner S, Spinnler C, Fassnacht M, et al. High Incidence of Adrenal Crisis in Educated Patients With Chronic Adrenal Insufficiency: A Prospective Study. J Clin Endocrinol Metab. 2015;100(2):407-416.'),
('adrenal-insufficiency', 4, 'Puar TH, Stikkelbroeck NM, Smans LC, et al. Adrenal Crisis: Still a Deadly Event in the 21st Century. Am J Med. 2016;129(3):339.e1-339.e9.'),
('adrenal-insufficiency', 5, 'Husebye ES, Pearce SH, Krone NP, Kämpe O. Adrenal Insufficiency. Lancet. 2021;397(10274):613-629.'),
('adrenal-insufficiency', 6, 'Vaidya A, Findling J, Bancos I. Adrenal Insufficiency in Adults. JAMA. 2025;334(8):714-725.'),
('adrenal-insufficiency', 7, 'Lentz S, Collier KC, Willis G, et al. Diagnosis and Management of Adrenal Insufficiency and Adrenal Crisis in the Emergency Department. J Emerg Med. 2022;63(2):212-220.'),
('adrenal-insufficiency', 8, 'Dong J, Hahner S, Bancos I, Tomlinson JW. Clinical Features, Investigation, and Management of Addison''s Disease. Lancet Diabetes Endocrinol. 2026;S2213-8587(25)00393-6.'),
('adrenal-insufficiency', 9, 'Hahner S, Ross RJ, Arlt W, et al. Adrenal Insufficiency. Nat Rev Dis Primers. 2021;7(1):19.'),
('adrenal-insufficiency', 10, 'Simpson H, Tomlinson J, Wass J, et al. Guidance for the Prevention and Emergency Management of Adult Patients With Adrenal Insufficiency. Clin Med (Lond). 2020;20(4):371-378.'),
('adrenal-insufficiency', 11, 'Broersen LH, Pereira AM, Jorgensen JO, Dekkers OM. Adrenal Insufficiency in Corticosteroid Use: Systematic Review and Meta-Analysis. J Clin Endocrinol Metab. 2015;100(6):2171-2180.'),
('adrenal-insufficiency', 12, 'de Vries F, Bruin M, Lobatto DJ, et al. Opioids and Their Endocrine Effects: A Systematic Review and Meta-Analysis. J Clin Endocrinol Metab. 2020;105(3):1020-1029.'),
('adrenal-insufficiency', 13, 'Beuschlein F, Else T, Bancos I, et al. European Society of Endocrinology and Endocrine Society Joint Clinical Guideline: Diagnosis and Therapy of Glucocorticoid-Induced Adrenal Insufficiency. J Clin Endocrinol Metab. 2024;109(7):1657-1683.'),
('adrenal-insufficiency', 14, 'Ospina NS, Al Nofal A, Bancos I, et al. ACTH Stimulation Tests for the Diagnosis of Adrenal Insufficiency: Systematic Review and Meta-Analysis. J Clin Endocrinol Metab. 2016;101(2):427-434.'),
('adrenal-insufficiency', 15, 'Burger-Stritt S, Kardonski P, Pulzer A, et al. Management of Adrenal Emergencies in Educated Patients With Adrenal Insufficiency — A Prospective Study. Clin Endocrinol (Oxf). 2018;89(1):22-29.'),
('adrenal-insufficiency', 16, 'Burger-Stritt S, Eff A, Quinkler M, et al. Standardised Patient Education in Adrenal Insufficiency: A Prospective Multi-Centre Evaluation. Eur J Endocrinol. 2020;183(2):119-127.'),
('adrenal-insufficiency', 17, 'Bosch NA, Teja B, Law AC, et al. Comparative Effectiveness of Fludrocortisone and Hydrocortisone vs Hydrocortisone Alone Among Patients With Septic Shock. JAMA Intern Med. 2023;183(5):451-459.'),
('adrenal-insufficiency', 18, 'Mosteller RD. Simplified Calculation of Body-Surface Area. N Engl J Med. 1987;317(17):1098.');

DELETE FROM decision_nodes WHERE tree_id = 'adrenal-insufficiency';
COMMIT;
