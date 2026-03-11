-- =====================================================================
-- MedKitt — First Trimester Emergencies Consult: Supabase INSERT Statements
-- Generated: 2026-03-11
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'first-trimester',
  'First Trimester Emergencies',
  'Assessment → Ectopic → Miscarriage → NVP/Hyperemesis → Nonobstetric → Disposition',
  '1.0',
  33,
  'ft-start',
  '["Initial Assessment","Ectopic Pregnancy","Miscarriage","NVP / Hyperemesis","Nonobstetric","Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('ob-gyn', 'first-trimester', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (37 citations)
DELETE FROM tree_citations WHERE tree_id = 'first-trimester';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('first-trimester', 1, 'Pedigo R. First Trimester Pregnancy Emergencies: Recognition and Management. Emergency Medicine Practice. 2019;21(1):1-28.'),
('first-trimester', 2, 'Creanga AA, Syverson C, Seed K, et al. Pregnancy-related mortality in the United States, 2011-2013. Obstet Gynecol. 2017;130(2):366-373.'),
('first-trimester', 3, 'Dart RG, Kaplan B, Varaklis K. Predictive value of history and physical examination in patients with suspected ectopic pregnancy. Ann Emerg Med. 1999;33(3):283-290.'),
('first-trimester', 4, 'Kohn MA, Kerr K, Malkevich D, et al. Beta-human chorionic gonadotropin levels and the likelihood of ectopic pregnancy in emergency department patients with abdominal pain or vaginal bleeding. Acad Emerg Med. 2003;10(2):119-126.'),
('first-trimester', 5, 'Stein JC, Wang R, Adler N, et al. Emergency physician ultrasonography for evaluating patients at risk for ectopic pregnancy: a meta-analysis. Ann Emerg Med. 2010;56(6):674-683.'),
('first-trimester', 6, 'Handler A, Davis F, Ferre C, et al. The relationship of smoking and ectopic pregnancy. Am J Public Health. 1989;79(9):1239-1242.'),
('first-trimester', 7, 'Tal J, Haddad S, Gordon N, et al. Heterotopic pregnancy after ovulation induction and assisted reproductive technologies: a literature review from 1971 to 1993. Fertil Steril. 1996;66(1):1-12.'),
('first-trimester', 8, 'American College of Obstetricians and Gynecologists Practice Bulletin No. 193; Summary: Tubal Ectopic Pregnancy. Obstet Gynecol. 2018;131(3):613-615.'),
('first-trimester', 9, 'Barnhart KT, Sammel MD, Rinaudo PF, et al. Symptomatic patients with an early viable intrauterine pregnancy: hCG curves redefined. Obstet Gynecol. 2004;104(1):50-55.'),
('first-trimester', 10, 'Silva C, Sammel MD, Zhou L, et al. Human chorionic gonadotropin profile for women with ectopic pregnancy. Obstet Gynecol. 2006;107(3):605-610.'),
('first-trimester', 11, 'Menon S, Colins J, Barnhart KT. Establishing a human chorionic gonadotropin cutoff to guide methotrexate treatment of ectopic pregnancy: a systematic review. Fertil Steril. 2007;87(3):481-484.'),
('first-trimester', 12, 'Barnhart KT, Gosman G, Ashby R, et al. The medical management of ectopic pregnancy: a meta-analysis comparing "single dose" and "multidose" regimens. Obstet Gynecol. 2003;101(4):778-784.'),
('first-trimester', 13, 'American College of Obstetricians and Gynecologists Practice Bulletin No. 193; Summary: Tubal Ectopic Pregnancy. Obstet Gynecol. 2018;131(3):613-615.'),
('first-trimester', 14, 'ACOG Practice Bulletin No. 150. Early Pregnancy Loss. Obstet Gynecol. 2015;125(5):1258-1267.'),
('first-trimester', 15, 'Hasan R, Baird DD, Herring AH, et al. Association between first-trimester vaginal bleeding and miscarriage. Obstet Gynecol. 2009;114(4):860-867.'),
('first-trimester', 16, 'Saraswat L, Bhattacharya S, Maheshwari A, et al. Maternal and perinatal outcome in women with threatened miscarriage in the first trimester: a systematic review. BJOG. 2010;117(3):245-257.'),
('first-trimester', 17, 'Nanda K, Lopez LM, Grimes DA, et al. Expectant care (waiting) versus surgical treatment for miscarriage. Cochrane Database Syst Rev. 2012;(3):CD003518.'),
('first-trimester', 18, 'Bique C, Usta M, Debora B, et al. Comparison of misoprostol and manual vacuum aspiration for the treatment of incomplete abortion. Int J Gynaecol Obstet. 2007;98(3):222-226.'),
('first-trimester', 19, 'Trinder J, Brocklehurst P, Porter R, et al. Management of miscarriage: expectant, medical, or surgical? Results of randomised controlled trial (MIST trial). BMJ. 2006;332(7552):1235-1240.'),
('first-trimester', 20, 'ACOG Practice Bulletin No. 181: Prevention of Rh D Alloimmunization. Obstet Gynecol. 2017;130(2):e57-e70.'),
('first-trimester', 21, 'Hinkle SN, Mumford SL, Grantz KL, et al. Association of nausea and vomiting during pregnancy with pregnancy loss: a secondary analysis of a randomized clinical trial. JAMA Intern Med. 2016;176(11):1621-1627.'),
('first-trimester', 22, 'ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.'),
('first-trimester', 23, 'Adlan AS, Chooi KY, Mat Adenan NA. Acupressure as adjuvant treatment for the inpatient management of nausea and vomiting in early pregnancy: a double-blind randomized controlled trial. J Obstet Gynaecol Res. 2017;43(4):662-668.'),
('first-trimester', 24, 'Matthews A, Haas DM, O''Mathuna DP, et al. Interventions for nausea and vomiting in early pregnancy. Cochrane Database Syst Rev. 2015;(9):CD007575.'),
('first-trimester', 25, 'Tan PC, Omar SZ. Contemporary approaches to hyperemesis during pregnancy. Curr Opin Obstet Gynecol. 2011;23(2):87-93.'),
('first-trimester', 26, 'Danielsson B, Noor AH, Hoog A, et al. Association of ondansetron use in early pregnancy with congenital malformations. JAMA. 2018;320(23):2429-2437.'),
('first-trimester', 27, 'Kazemier BM, Koningstein FN, Schneeberger C, et al. Maternal and neonatal consequences of treated and untreated asymptomatic bacteriuria in pregnancy: a prospective cohort study with an embedded randomised controlled trial. Lancet Infect Dis. 2015;15(11):1324-1333.'),
('first-trimester', 28, 'ACOG Committee Opinion No. 717: Sulfonamides, Nitrofurantoin, and Risk of Birth Defects. Obstet Gynecol. 2017;130(3):e150-e152.'),
('first-trimester', 29, 'Wing DA, Hendershott CM, Debuque L, Millar LK. Outpatient treatment of acute pyelonephritis in pregnancy after 24 weeks. Obstet Gynecol. 1999;94(5 Pt 1):683-688.'),
('first-trimester', 30, 'Andersson RE, Lambe M. Incidence of appendicitis during pregnancy. Int J Epidemiol. 2001;30(6):1281-1285.'),
('first-trimester', 31, 'Mourad J, Elliott JP, Erickson L, et al. Appendicitis in pregnancy: new information that contradicts long-held clinical beliefs. Am J Obstet Gynecol. 2000;182(5):1027-1029.'),
('first-trimester', 32, 'Abbasi N, Patenaude V, Abenhaim HA. Evaluation of obstetrical and fetal outcomes in pregnancies complicated by acute appendicitis. Arch Gynecol Obstet. 2014;290(4):661-667.'),
('first-trimester', 33, 'Konrad J, Grand D, Lourenco A. MRI: first-line imaging modality for pregnant patients with suspected appendicitis. Abdom Imaging. 2015;40(8):3359-3364.'),
('first-trimester', 34, 'Duke E, Kalb B, Arif-Tiwari H, et al. A systematic review and meta-analysis of diagnostic performance of MRI for evaluation of acute appendicitis. AJR Am J Roentgenol. 2016;206(3):508-517.'),
('first-trimester', 35, 'Ray JG, Vermeulen MJ, Bharatha A, et al. Association between MRI exposure during pregnancy and fetal and childhood outcomes. JAMA. 2016;316(9):952-961.'),
('first-trimester', 36, 'ACOG Committee Opinion No. 723: Guidelines for Diagnostic Imaging During Pregnancy and Lactation. Obstet Gynecol. 2017;130(4):e210-e216.'),
('first-trimester', 37, 'Catlin A. Interdisciplinary guidelines for care of women presenting to the emergency department with pregnancy loss. MCN Am J Matern Child Nurs. 2018;43(1):13-18.');

DELETE FROM decision_nodes WHERE tree_id = 'first-trimester';

COMMIT;
