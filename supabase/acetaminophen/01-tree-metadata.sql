-- =====================================================================
-- MedKitt — Acetaminophen Overdose Consult: Supabase INSERT Statements
-- Generated: 2026-03-24
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'acetaminophen',
  'Acetaminophen Overdose',
  'Assessment → Risk Stratification → NAC → Massive OD → Hepatic Failure → Disposition',
  '1.0',
  30,
  'apap-start',
  '["Initial Assessment","Risk Stratification","NAC Protocol","Massive Overdose","Hepatic Failure","Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('toxicology', 'acetaminophen', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (17 citations)
DELETE FROM tree_citations WHERE tree_id = 'acetaminophen';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('acetaminophen', 1, 'WikEM: Acetaminophen Toxicity. Last edited March 22, 2026. https://wikem.org/wiki/Acetaminophen_toxicity'),
('acetaminophen', 2, 'Smilkstein MJ, et al. Efficacy of oral N-acetylcysteine in the treatment of acetaminophen overdose. N Engl J Med. 1988;319(24):1557-1562. PMID 3059186'),
('acetaminophen', 3, 'Heard KJ. Acetylcysteine for acetaminophen poisoning. N Engl J Med. 2008;359(3):285-292. PMID 18635433'),
('acetaminophen', 4, 'Rumack BH. Acetaminophen hepatotoxicity: the first 35 years. J Toxicol Clin Toxicol. 2002;40(1):3-20. PMID 11990202'),
('acetaminophen', 5, 'O''Grady JG, et al. Early indicators of prognosis in fulminant hepatic failure. Gastroenterology. 1989;97(2):439-445. PMID 2490426'),
('acetaminophen', 6, 'Dart RC, et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open. 2023;6(8):e2327739. PMID 37552484'),
('acetaminophen', 7, 'Wong A, et al. Comparison of two- versus three-bag IV acetylcysteine protocols. Clin Toxicol. 2013;51(7):676-679.'),
('acetaminophen', 8, 'Hendrickson RG. What is the most appropriate dose of N-acetylcysteine after massive acetaminophen overdose? Clin Toxicol. 2019;57(8):686-691. PMID 30777470'),
('acetaminophen', 9, 'Gosselin S, et al. Extracorporeal treatment for acetaminophen poisoning: recommendations from the EXTRIP workgroup. Clin Toxicol. 2014;52(8):856-867. PMID 25133498'),
('acetaminophen', 10, 'Keays R, et al. Intravenous acetylcysteine in paracetamol induced fulminant hepatic failure: a prospective controlled trial. BMJ. 1991;303(6809):1026-1029. PMID 1954453'),
('acetaminophen', 11, 'Yarema M, et al. Anaphylactoid Reactions to Intravenous N-Acetylcysteine during Treatment for Acetaminophen Poisoning. J Med Toxicol. 2018;14(2):120-127. PMID 29423816'),
('acetaminophen', 12, 'Bunchorntavakul C, Reddy KR. Acetaminophen and Acute Liver Failure. Clin Liver Dis. 2018;22(2):325-346. PMID 29605069'),
('acetaminophen', 13, 'Chiew AL, et al. Updated guidelines for the management of paracetamol poisoning in Australia and New Zealand. Med J Aust. 2020;212(4):175-183. PMID 31786822'),
('acetaminophen', 14, 'Chiew AL, Buckley NA. Acetaminophen Poisoning. Crit Care Clin. 2021;37(3):543-561. PMID 34053705'),
('acetaminophen', 15, 'Kang AM, et al. The effect of 4-methylpyrazole on oxidative metabolism of acetaminophen in human volunteers. J Med Toxicol. 2020;16(2):169-176. PMID 31768936'),
('acetaminophen', 16, 'Fisher ES, Curry SC. Evaluation and treatment of acetaminophen toxicity. Adv Pharmacol. 2019;85:263-272. PMID 31307590'),
('acetaminophen', 17, 'Chidiac AS, et al. Paracetamol (acetaminophen) overdose and hepatotoxicity: mechanism, treatment, prevention measures, and estimates of burden of disease. Expert Opin Drug Metab Toxicol. 2023;19(5):297-317. PMID 37436926');

DELETE FROM decision_nodes WHERE tree_id = 'acetaminophen';
COMMIT;
