-- =====================================================================
-- MedKitt — Angioedema Consult: Supabase INSERT Statements
-- Generated: 2026-03-23
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'angioedema',
  'Angioedema',
  'Airway → Classification → Histamine vs Bradykinin → Treatment → Disposition',
  '1.0',
  25,
  'angio-start',
  '["Initial Assessment","Classification","Histamine Treatment","Bradykinin Treatment","Abdominal Angioedema","Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('emergency-medicine', 'angioedema', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (25 citations)
DELETE FROM tree_citations WHERE tree_id = 'angioedema';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('angioedema', 1, 'Kelly M, et al. National estimates of emergency department visits for angioedema and allergic reactions in the United States. Allergy Asthma Proc. 2013;34(2):150-154.'),
('angioedema', 2, 'Zanichelli A, et al. Misdiagnosis trends in patients with hereditary angioedema from the real-world clinical setting. Ann Allergy Asthma Immunol. 2016;117(4):394-398.'),
('angioedema', 3, 'Long BJ, Koyfman A, Gottlieb M. Evaluation and management of angioedema in the emergency department. West J Emerg Med. 2019;20(4):587-600.'),
('angioedema', 4, 'Moellman JJ, et al. A consensus parameter for the evaluation and management of angioedema in the emergency department. Acad Emerg Med. 2014;21(4):469-484.'),
('angioedema', 5, 'Bernstein JA, et al. Angioedema in the emergency department: a practical guide to differential diagnosis and management. Int J Emerg Med. 2017;10(1):15.'),
('angioedema', 6, 'Depetri F, et al. Angioedema and emergency medicine: from pathophysiology to diagnosis and treatment. Eur J Intern Med. 2019;59:8-13.'),
('angioedema', 7, 'Ishoo E, et al. Predicting airway risk in angioedema: staging system based on presentation. Otolaryngol Head Neck Surg. 1999;121(3):263-268.'),
('angioedema', 8, 'Das C, et al. Evaluation of staging criteria for disposition and airway intervention in emergency department angioedema patients. Acute Med Surg. 2021;8(1):e704.'),
('angioedema', 9, 'Sandefur BJ, et al. Emergency department intubations in patients with angioedema: a report from the National Emergency Airway Registry. J Emerg Med. 2021;61(5):481-488.'),
('angioedema', 10, 'Banerji A, et al. Epidemiology of ACE inhibitor angioedema utilizing a large electronic health record. J Allergy Clin Immunol Pract. 2017;5(3):744-749.'),
('angioedema', 11, 'Craig TJ, et al. C1 esterase inhibitor concentrate in 1085 hereditary angioedema attacks — final results of the I.M.P.A.C.T.2 study. Allergy. 2011;66(12):1604-1611.'),
('angioedema', 12, 'Zuraw BL, et al. Nanofiltered C1 inhibitor concentrate for treatment of hereditary angioedema. N Engl J Med. 2010;363(6):513-522.'),
('angioedema', 13, 'Zuraw B, et al. Recombinant human C1-inhibitor for the treatment of acute angioedema attacks in patients with hereditary angioedema. J Allergy Clin Immunol. 2010;126(4):821-827.'),
('angioedema', 14, 'Lumry WR, et al. Randomized placebo-controlled trial of the bradykinin B2 receptor antagonist icatibant for the treatment of acute attacks of hereditary angioedema: the FAST-3 trial. Ann Allergy Asthma Immunol. 2011;107(6):529-537.'),
('angioedema', 15, 'Cicardi M, et al. Icatibant, a new bradykinin-receptor antagonist, in hereditary angioedema. N Engl J Med. 2010;363(6):532-541.'),
('angioedema', 16, 'Bas M, et al. A randomized trial of icatibant in ACE-inhibitor-induced angioedema. N Engl J Med. 2015;372(5):418-425.'),
('angioedema', 17, 'Straka BT, et al. Effect of bradykinin receptor antagonism on ACE inhibitor-associated angioedema. J Allergy Clin Immunol. 2017;140(1):242-248.'),
('angioedema', 18, 'Cicardi M, et al. Ecallantide for the treatment of acute attacks in hereditary angioedema. N Engl J Med. 2010;363(6):523-531.'),
('angioedema', 19, 'Saeb A, et al. Using fresh frozen plasma for acute airway angioedema to prevent intubation in the emergency department: a retrospective cohort study. Emerg Med Int. 2016;2016:6091510.'),
('angioedema', 20, 'Wilkerson RG, Winters ME. Angiotensin-converting enzyme inhibitor-induced angioedema. Immunol Allergy Clin North Am. 2023;43(3):513-532.'),
('angioedema', 21, 'Beauchêne C, et al. Tranexamic acid as first-line emergency treatment for episodes of bradykinin-mediated angioedema induced by ACE inhibitors. Rev Med Interne. 2018;39(10):772-776.'),
('angioedema', 22, 'Wang K, et al. Tranexamic acid for ACE inhibitor induced angioedema. Am J Emerg Med. 2021;43:292.e5-e7.'),
('angioedema', 23, 'Rosenbaum S, et al. Clinical practice statement: what is the emergency department management of patients with angioedema secondary to an ACE-inhibitor? J Emerg Med. 2021;61(1):105-112.'),
('angioedema', 24, 'Lacuesta G, et al. Angioedema. Allergy Asthma Clin Immunol. 2024;20(Suppl 3):65.'),
('angioedema', 25, 'Kesh S, Bernstein JA. Isolated angioedema: a review of classification and update on management. Ann Allergy Asthma Immunol. 2022;129(6):692-702.');

DELETE FROM decision_nodes WHERE tree_id = 'angioedema';
COMMIT;
