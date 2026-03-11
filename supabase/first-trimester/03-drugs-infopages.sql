BEGIN;
-- 5. drugs (11 new drugs)
INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('amoxicillin', 'Amoxicillin', 'Amoxicillin', 'Aminopenicillin', 'PO',
 '["UTI in pregnancy","Asymptomatic bacteriuria in pregnancy"]'::jsonb,
 '[{"indication":"UTI / Asymptomatic bacteriuria in pregnancy","regimen":"875 mg PO BID × 7 days. First-line option for UTI in pregnancy. Guided by local resistance patterns and culture sensitivities."}]'::jsonb,
 '["Penicillin allergy","History of amoxicillin-associated cholestatic jaundice/hepatic dysfunction"]'::jsonb,
 '["High local E. coli resistance may limit empiric use — check antibiogram","Mononucleosis — rash risk with aminopenicillins"]'::jsonb,
 'Urine culture to confirm sensitivity. Repeat culture after treatment to confirm eradication.',
 'Generally considered safe in all trimesters of pregnancy. Local resistance patterns should guide empiric therapy — discuss with OB and ID if uncertain.',
 NULL,
 '["Pedigo R. First Trimester Pregnancy Emergencies. Emergency Medicine Practice. 2019;21(1):1-28.","ACOG Committee Opinion No. 717: Sulfonamides, Nitrofurantoin, and Risk of Birth Defects. Obstet Gynecol. 2017;130(3):e150-e152."]'::jsonb,
 0)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('dimenhydrinate', 'Dimenhydrinate', 'Dimenhydrinate', 'Antihistamine / Antiemetic', 'IV/PO',
 '["Nausea and vomiting of pregnancy (NVP)","Hyperemesis gravidarum"]'::jsonb,
 '[{"indication":"NVP — oral","regimen":"50 mg PO QID as needed. Max 200 mg/day if also taking doxylamine. Second-line oral agent per ACOG stepwise pathway."},{"indication":"NVP — IV","regimen":"50 mg IV in 50 mL normal saline over 20 min, every 6 hours. For patients unable to tolerate oral medications."}]'::jsonb,
 '["Known hypersensitivity"]'::jsonb,
 '["Sedation — warn about drowsiness","Max 200 mg/day when combined with doxylamine (both antihistamines)","Anticholinergic effects — dry mouth, urinary retention, constipation"]'::jsonb,
 'Symptom improvement. Sedation level.',
 'Second-line oral antiemetic in the ACOG stepwise NVP pathway. Contains diphenhydramine + 8-chlorotheophylline. Can be used orally or IV. Reduce maximum daily dose when combined with doxylamine to avoid excessive antihistamine effects.',
 NULL,
 '["ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30."]'::jsonb,
 1)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('diphenhydramine', 'Diphenhydramine', 'Diphenhydramine hydrochloride', 'Antihistamine / Antiemetic', 'PO/IV',
 '["Nausea and vomiting of pregnancy (NVP)","Allergic reactions","Insomnia"]'::jsonb,
 '[{"indication":"NVP — oral","regimen":"25-50 mg PO every 6 hours as needed. Second-line oral agent per ACOG stepwise pathway. Alternative to dimenhydrinate."}]'::jsonb,
 '["Known hypersensitivity","Neonates/premature infants (not applicable in this context)"]'::jsonb,
 '["Significant sedation — warn about drowsiness","Anticholinergic effects","Avoid combination with other CNS depressants"]'::jsonb,
 'Symptom improvement. Sedation level.',
 'Alternative second-line antiemetic for NVP. Generally considered safe in pregnancy. The active antihistamine component of dimenhydrinate.',
 NULL,
 '["ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30."]'::jsonb,
 2)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('doxylamine', 'Doxylamine', 'Doxylamine succinate', 'Antihistamine / Antiemetic', 'PO',
 '["Nausea and vomiting of pregnancy (NVP)"]'::jsonb,
 '[{"indication":"NVP — combination with pyridoxine (first-line)","regimen":"12.5 mg PO TID (with pyridoxine 10-25 mg PO TID). Adjust schedule per symptom severity. ACOG Level A recommendation as first-line pharmacologic therapy for NVP. Superior to pyridoxine alone."},{"indication":"NVP — delayed-release combination product (Diclegis/Bonjesta)","regimen":"Diclegis: pyridoxine 10 mg / doxylamine 10 mg — 2 tabs at bedtime initially, up to 4 tabs/day (1 AM + 1 midafternoon + 2 bedtime). Bonjesta: pyridoxine 20 mg / doxylamine 20 mg — 1 tab at bedtime, up to 2 tabs/day. Consider generic pyridoxine + doxylamine for significant cost savings."}]'::jsonb,
 '["Known hypersensitivity","MAO inhibitor use (within 14 days)"]'::jsonb,
 '["Sedation — take bedtime dose first","Anticholinergic effects","Available OTC as sleep aid (Unisom SleepTabs) — can be split for NVP dosing"]'::jsonb,
 'Symptom improvement. Ensure patient is tolerating combination.',
 'First-line pharmacologic therapy for NVP when combined with pyridoxine (ACOG Level A). The delayed-release combination product (Diclegis) is FDA-approved but expensive. Generic pyridoxine + OTC doxylamine (Unisom SleepTabs, NOT SleepGels which contain diphenhydramine) is a cost-effective alternative.',
 NULL,
 '["ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.","McParlin C, O''Donnell A, Robson SC, et al. Treatments for hyperemesis gravidarum and nausea and vomiting in pregnancy: a systematic review. JAMA. 2016;316(13):1392-1401."]'::jsonb,
 3)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('methotrexate', 'Methotrexate', 'Methotrexate', 'Antimetabolite / Folic acid antagonist', 'IM',
 '["Ectopic pregnancy (medical management)"]'::jsonb,
 '[{"indication":"Ectopic pregnancy — single-dose regimen","regimen":"50 mg/m² IM single dose. Administered in consultation with OB. Follow-up beta-hCG on day 4 and day 7. If <15% decline between day 4-7, repeat dose. Success rate >90% when beta-hCG <5000 mIU/mL."}]'::jsonb,
 '["Immunodeficiency","Cytopenia (anemia, leukopenia, thrombocytopenia)","Active pulmonary disease","Active peptic ulcer disease","Hepatic dysfunction","Renal dysfunction (creatinine >1.5 mg/dL)","Breastfeeding","Known hypersensitivity"]'::jsonb,
 '["Beta-hCG >5000 mIU/mL — OR 5.45 for treatment failure","Fetal cardiac activity present — OR 9.1 for failure","Patient must be reliable for follow-up (serial beta-hCG monitoring)","Avoid NSAIDs, folate supplements during treatment (reduce efficacy)","Avoid alcohol, sun exposure"]'::jsonb,
 'Beta-hCG on day 4 and day 7 post-injection. CBC, BMP, LFTs prior to administration. Weekly beta-hCG until undetectable.',
 'Medical management of stable, unruptured tubal ectopic pregnancy. Single-dose regimen is most common in ED/OB setting. Multi-dose regimens (MTX on days 1, 3, 5, 7 with leucovorin rescue) have higher success rates but more side effects. Patients should avoid conception for 3 months after treatment. Always coordinate with OB — this is not typically initiated independently by the ED.',
 NULL,
 '["ACOG Practice Bulletin No. 193; Summary: Tubal Ectopic Pregnancy. Obstet Gynecol. 2018;131(3):613-615.","Menon S, Colins J, Barnhart KT. Establishing a human chorionic gonadotropin cutoff to guide methotrexate treatment of ectopic pregnancy: a systematic review. Fertil Steril. 2007;87(3):481-484.","Barnhart KT, Gosman G, Ashby R, et al. The medical management of ectopic pregnancy: a meta-analysis comparing \"single dose\" and \"multidose\" regimens. Obstet Gynecol. 2003;101(4):778-784."]'::jsonb,
 4)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('metoclopramide', 'Metoclopramide', 'Metoclopramide hydrochloride', 'Dopamine antagonist / Prokinetic antiemetic', 'IV/PO',
 '["Nausea and vomiting of pregnancy (NVP)","Hyperemesis gravidarum"]'::jsonb,
 '[{"indication":"NVP / Hyperemesis — IV","regimen":"10 mg IV every 8 hours. Reasonable first-line IV antiemetic in pregnancy — no association with fetal malformations."},{"indication":"NVP — oral","regimen":"10 mg PO every 8 hours, 30 minutes before meals. For patients tolerating oral medications who have failed pyridoxine/doxylamine."}]'::jsonb,
 '["GI obstruction, perforation, or hemorrhage","Pheochromocytoma","Seizure disorder (lowers seizure threshold)","Known hypersensitivity","Concurrent use of other dopamine antagonists"]'::jsonb,
 '["Extrapyramidal symptoms (dystonia, akathisia) — more common in young women","Tardive dyskinesia with prolonged use (>12 weeks)","Treat acute dystonia with diphenhydramine 50 mg IV","QT prolongation risk — avoid in patients with baseline QT prolongation"]'::jsonb,
 'Symptom improvement. Watch for extrapyramidal symptoms (especially acute dystonia).',
 'Preferred IV antiemetic for pregnancy-related nausea because it has not been associated with fetal malformations, unlike ondansetron which has a possible small risk of fetal cardiac abnormalities. Promotes gastric emptying in addition to central antiemetic effects.',
 NULL,
 '["ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.","Pedigo R. First Trimester Pregnancy Emergencies. Emergency Medicine Practice. 2019;21(1):1-28."]'::jsonb,
 5)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('misoprostol', 'Misoprostol', 'Misoprostol', 'Prostaglandin E1 analog', 'Intravaginal/PO/SL',
 '["Incomplete miscarriage (medical management)","Missed miscarriage","Cervical ripening"]'::jsonb,
 '[{"indication":"Miscarriage — medical management","regimen":"800 mcg intravaginally, single dose. 91% effective within 7 days. May repeat once if incomplete passage. Expect significant cramping and bleeding. Premedicate with ibuprofen 600 mg PO for pain."}]'::jsonb,
 '["Confirmed ectopic pregnancy","Hemodynamic instability (needs surgical evacuation)","Septic abortion","Known hypersensitivity to prostaglandins","IUD in place"]'::jsonb,
 '["Significant cramping and bleeding expected — counsel patient","Up to 40% may ultimately require unplanned surgical management","Fever and chills are common side effects (not necessarily infection)","Diarrhea may occur"]'::jsonb,
 'Follow-up ultrasound in 1-2 weeks to confirm complete passage. Return to ED for heavy bleeding, fever >100.4°F, or foul-smelling discharge.',
 'Medical management of nonviable pregnancy as an alternative to expectant management or D&C. High patient satisfaction rates comparable to surgical management. Intravaginal route preferred for miscarriage management (higher efficacy than oral). Always in consultation with OB.',
 NULL,
 '["Bique C, Usta M, Debora B, et al. Comparison of misoprostol and manual vacuum aspiration for the treatment of incomplete abortion. Int J Gynaecol Obstet. 2007;98(3):222-226.","Kim C, Barnard S, Neilson JP, et al. Medical treatments for incomplete miscarriage. Cochrane Database Syst Rev. 2017;1:CD007223."]'::jsonb,
 6)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('nitrofurantoin', 'Nitrofurantoin', 'Nitrofurantoin monohydrate/macrocrystals', 'Nitrofuran antibiotic', 'PO',
 '["UTI in pregnancy","Asymptomatic bacteriuria in pregnancy","Uncomplicated cystitis"]'::jsonb,
 '[{"indication":"UTI / Asymptomatic bacteriuria in pregnancy","regimen":"100 mg (macrobid) PO BID × 7 days. ACOG: appropriate in first trimester only \"when no other suitable alternative antibiotics are available.\" Safe in second and third trimesters."},{"indication":"Uncomplicated cystitis (non-pregnant)","regimen":"100 mg (macrobid) PO BID × 5 days."}]'::jsonb,
 '["CrCl <30 mL/min (inadequate urinary concentration)","G6PD deficiency (hemolytic anemia risk)","Term pregnancy (38-42 weeks) — risk of neonatal hemolytic anemia","Known hypersensitivity"]'::jsonb,
 '["First trimester use: ACOG advises only when no suitable alternatives available","Pulmonary toxicity (rare, with chronic use)","Peripheral neuropathy (rare)","GI upset — take with food","Colors urine brown/rust — warn patient"]'::jsonb,
 'Urine culture to confirm eradication. Watch for pulmonary symptoms with prolonged use.',
 'Concentrated in urine — effective for lower UTI but NOT for pyelonephritis (does not achieve adequate serum/tissue levels). ACOG 2017 review found the association between nitrofurantoin and birth defects is uncertain, but recommends caution in the first trimester as a precaution. Safe and effective in second/third trimesters. Good option when local E. coli resistance to amoxicillin/ampicillin is high.',
 NULL,
 '["ACOG Committee Opinion No. 717: Sulfonamides, Nitrofurantoin, and Risk of Birth Defects. Obstet Gynecol. 2017;130(3):e150-e152.","Kazemier BM, et al. Maternal and neonatal consequences of treated and untreated asymptomatic bacteriuria in pregnancy. Lancet Infect Dis. 2015;15(11):1324-1333."]'::jsonb,
 7)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('prochlorperazine', 'Prochlorperazine', 'Prochlorperazine', 'Phenothiazine / Dopamine antagonist antiemetic', 'PR/IM',
 '["Nausea and vomiting of pregnancy (NVP)","Nausea/vomiting (general)"]'::jsonb,
 '[{"indication":"NVP — rectal","regimen":"25 mg PR every 12 hours. Second-line agent in ACOG stepwise NVP pathway. Useful when patient cannot tolerate oral medications."},{"indication":"Nausea/vomiting — IM","regimen":"5-10 mg IM every 6-8 hours (max 40 mg/day)."}]'::jsonb,
 '["Known hypersensitivity to phenothiazines","CNS depression / comatose states","Bone marrow suppression"]'::jsonb,
 '["Extrapyramidal symptoms (dystonia, akathisia) — treat with diphenhydramine","Neuroleptic malignant syndrome (rare)","Orthostatic hypotension","Sedation","QT prolongation"]'::jsonb,
 'Symptom improvement. Watch for extrapyramidal symptoms.',
 'Second-line antiemetic for NVP. Rectal route is preferred in the ACOG stepwise pathway for patients who cannot tolerate oral medications. Effective but carries risk of extrapyramidal effects, particularly in young women.',
 NULL,
 '["ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30."]'::jsonb,
 8)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('promethazine', 'Promethazine', 'Promethazine hydrochloride', 'Phenothiazine / Antihistamine antiemetic', 'IV/PO/PR',
 '["Nausea and vomiting of pregnancy (NVP)","Hyperemesis gravidarum","Nausea/vomiting (general)"]'::jsonb,
 '[{"indication":"NVP — oral/rectal","regimen":"12.5 mg PO or PR every 6 hours. Second-line agent in ACOG stepwise NVP pathway."},{"indication":"NVP / Hyperemesis — IV","regimen":"12.5 mg IV every 6 hours. MUST dilute and administer slowly. NEVER give IV push undiluted — severe tissue necrosis risk."}]'::jsonb,
 '["Known hypersensitivity to phenothiazines","CNS depression / comatose states","Intra-arterial injection (gangrene risk)","Subcutaneous injection (tissue necrosis)"]'::jsonb,
 '["SEVERE tissue necrosis if extravasation or intra-arterial injection — black box warning","Preferred route is deep IM or well-running IV, diluted, slow push","Significant sedation","Respiratory depression (especially combined with opioids)","Extrapyramidal symptoms"]'::jsonb,
 'IV site integrity (extravasation risk). Sedation and respiratory status. Symptom improvement.',
 'Available in oral, rectal, and parenteral formulations. IV administration carries a BLACK BOX WARNING for severe tissue injury — must be diluted and given through a well-running IV line. IM injection should be deep into large muscle. Despite risks, widely used and effective antiemetic in pregnancy.',
 NULL,
 '["ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30."]'::jsonb,
 9)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('rh-immune-globulin', 'Rh(D) Immune Globulin (RhoGAM)', 'Rh(D) immune globulin', 'Immune globulin', 'IM',
 '["Prevention of Rh D alloimmunization","First trimester vaginal bleeding (Rh-negative patients)","Miscarriage in Rh-negative patients"]'::jsonb,
 '[{"indication":"First trimester — vaginal bleeding or miscarriage","regimen":"50 mcg (MICRhoGAM) IM within 72 hours. If 50 mcg unavailable, 300 mcg (standard RhoGAM) dose may be substituted. Only for Rh(D)-negative AND unsensitized patients."},{"indication":"Second/third trimester or significant hemorrhage","regimen":"300 mcg (standard RhoGAM) IM within 72 hours of sensitizing event. Kleihauer-Betke test if large fetomaternal hemorrhage suspected — additional doses may be needed."}]'::jsonb,
 '["Rh(D)-positive patient","Patient already sensitized to anti-D antibodies","Known hypersensitivity to human immune globulin","IgA deficiency with anti-IgA antibodies (anaphylaxis risk)"]'::jsonb,
 '["First trimester use is controversial — ACOG 2017 states no evidence-based recommendation can be made for use at or before 12 weeks","Reasonable to withhold in minimal early first trimester bleeding","Consider administration for heavy bleeding or near 12 weeks gestation","Discuss institutional policy with OB department"]'::jsonb,
 'Confirm Rh status and antibody screen prior to administration. Type and screen.',
 'Prevents maternal alloimmunization to Rh(D) antigen which can cause hemolytic disease of the fetus in subsequent pregnancies. ACOG 2017 specifically states that administration in threatened miscarriage at or before 12 weeks is controversial — the decision should be individualized and discussed with OB. The 50 mcg dose (MICRhoGAM) is sufficient for first trimester events but may not be stocked at all facilities.',
 NULL,
 '["ACOG Practice Bulletin No. 181: Prevention of Rh D Alloimmunization. Obstet Gynecol. 2017;130(2):e57-e70.","Hannafin B, Lovecchio F, Blackburn P. Do Rh-negative women with first trimester spontaneous abortions need Rh immune globulin? Am J Emerg Med. 2006;24(4):487-489."]'::jsonb,
 10)
;


-- 6. info_pages (7 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ft-summary', 'First Trimester Emergency Steps', 'Quick Reference — Key Decision Points',
 '[{"heading":"Initial Assessment","body":"• [Pregnancy test in ALL reproductive-age women with abdominal pain/bleeding](#/node/ft-start)\n• [Hemodynamic stability assessment](#/node/ft-stability)\n• [Unstable → assume ruptured ectopic until proven otherwise](#/node/ft-unstable-ectopic)"},{"heading":"Ectopic Pregnancy","body":"• [Bedside US + quantitative beta-hCG](#/node/ft-us-eval)\n• [IUP confirmed → rules out ectopic (except ART patients)](#/node/ft-iup-confirmed)\n• [Pregnancy of unknown location → 48h beta-hCG recheck](#/node/ft-pul)\n• [Ectopic confirmed → methotrexate vs surgery](#/node/ft-ectopic-confirmed)"},{"heading":"Miscarriage","body":"• [Classify type: threatened, complete, missed, inevitable, incomplete, septic](#/node/ft-miscarriage-type)\n• [Nonviable → expectant vs medical (misoprostol) vs surgical (D&C)](#/node/ft-nonviable-mgmt)\n• [Rh status → consider RhoGAM if Rh-negative](#/node/ft-rh-rhogam)"},{"heading":"Nausea & Vomiting","body":"• [Severity assessment — tolerating PO?](#/node/ft-nvp-assess)\n• [Mild: pyridoxine ± doxylamine (ACOG first-line)](#/node/ft-nvp-oral)\n• [Moderate: add dimenhydrinate, diphenhydramine, or promethazine](#/node/ft-nvp-oral-step2)\n• [Severe/IV: metoclopramide or ondansetron + D5NS + thiamine](#/node/ft-nvp-iv)\n• [Hyperemesis gravidarum → OB consult, admit](#/node/ft-hg-admit)"},{"heading":"Nonobstetric Emergencies","body":"• [UTI / bacteriuria — MUST treat in pregnancy](#/node/ft-uti-eval)\n• [Pyelonephritis — admit ALL for IV ceftriaxone](#/node/ft-pyelo)\n• [Appendicitis — surgical, imaging: US → MRI → CT](#/node/ft-appendicitis)"},{"heading":"Disposition","body":"• [PUL → discharge with 48h beta-hCG recheck](#/node/ft-dispo-pul)\n• [Miscarriage → discharge with management plan + grief resources](#/node/ft-dispo-miscarriage)\n• [NVP → discharge with prescriptions if tolerating PO](#/node/ft-dispo-nvp)\n• [Admit: ruptured ectopic, pyelonephritis, appendicitis, hyperemesis, septic abortion](#/node/ft-dispo-general)"}]'::jsonb,
 '[{"num":1,"text":"Pedigo R. First Trimester Pregnancy Emergencies: Recognition and Management. Emergency Medicine Practice. 2019;21(1):1-28."}]'::jsonb,
 false,
 0)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ft-ectopic-risk', 'Ectopic Pregnancy Sites & Risk Factors', 'Location Distribution & Clinical Risk Assessment',
 '[{"heading":"Implantation Sites","body":"**98% of ectopic pregnancies are tubal** [1]\n\n• **Distal third (ampullary):** most common (~40%)\n• **Middle third (isthmic):** ~37%\n• **Proximal third:** ~12%\n• **Fimbrial:** ~5%\n• **Fimbrial-ovarian:** ~1.5%\n• **Interstitial (cornual):** ~1.2% — high rupture morbidity due to increased vascularity\n• **Abdominal:** ~1.4%\n• **Cervical:** ~0.15%\n• **Ovarian:** ~0.15%"},{"heading":"Major Risk Factors","body":"• **Prior ectopic pregnancy** — strongest predictor of recurrence\n• **History of salpingitis / PID** — tubal damage\n• **History of sexually transmitted infections** — chlamydia, gonorrhea\n• **Prior tubal surgery** — sterilization, reversal, salpingostomy\n• **Smoking** — dose-response relationship (>1 pack/day: OR 4) — ciliary dysmotility impairs ovum transport [2]\n• **IUD in situ** — if pregnancy occurs despite IUD, >50% are ectopic [3]\n• **Assisted reproductive technology (ART)** — also increases heterotopic risk to 1 in 100\n• **DES exposure in utero**\n• **Endometriosis**"},{"heading":"Important Caveats","body":"**Nearly half of patients with ectopic pregnancy will have NO identifiable risk factors.** [1]\n\nPresence or absence of risk factors should NOT alter the standard diagnostic approach.\n\nNo historical or physical exam features can reliably rule in or rule out ectopic pregnancy. [4]"},{"heading":"Heterotopic Pregnancy","body":"Coexistence of IUP + ectopic pregnancy:\n• **General population:** 1 in 4,000 to 1 in 30,000\n• **ART patients:** ~1 in 100 [5]\n\nConfirming an IUP does NOT exclude ectopic in ART patients. Maintain clinical suspicion if IUP + lateral pain/adnexal mass."}]'::jsonb,
 '[{"num":1,"text":"Pedigo R. First Trimester Pregnancy Emergencies. Emergency Medicine Practice. 2019;21(1):1-28."},{"num":2,"text":"Handler A, Davis F, Ferre C, et al. The relationship of smoking and ectopic pregnancy. Am J Public Health. 1989;79(9):1239-1242."},{"num":3,"text":"Backman T, Rauramo I, Huhtala S, et al. Pregnancy during the use of levonorgestrel intrauterine system. Am J Obstet Gynecol. 2004;190(1):50-54."},{"num":4,"text":"Dart RG, Kaplan B, Varaklis K. Predictive value of history and physical examination in patients with suspected ectopic pregnancy. Ann Emerg Med. 1999;33(3):283-290."},{"num":5,"text":"Tal J, Haddad S, Gordon N, et al. Heterotopic pregnancy after ovulation induction and assisted reproductive technologies. Fertil Steril. 1996;66(1):1-12."}]'::jsonb,
 false,
 1)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ft-miscarriage-types', 'Miscarriage Classification', 'Types, Physical Exam & Ultrasound Findings',
 '[{"heading":"Threatened Miscarriage","body":"**Cervical os:** Closed\n**Ultrasound:** Viable IUP (fetal cardiac activity present)\n**Presentation:** Vaginal bleeding with viable pregnancy\n**Prognosis:** If FCA present, only 3.4% progress to miscarriage. Heavy bleeding → 11-18% miscarriage rate. [1]"},{"heading":"Complete Miscarriage","body":"**Cervical os:** Closed\n**Ultrasound:** No IUP (previously confirmed)\n**Presentation:** Passage of all products of conception\n**Management:** Confirm with US. Serial beta-hCG to zero. OB follow-up."},{"heading":"Missed Miscarriage","body":"**Cervical os:** Closed\n**Ultrasound:** CRL ≥7 mm without cardiac motion; OR gestational sac ≥25 mm without embryo [2]\n**Presentation:** Nonviable uterine gestation — often discovered incidentally\n**Management:** Expectant, medical (misoprostol), or surgical (D&C)"},{"heading":"Inevitable Miscarriage","body":"**Cervical os:** Open\n**Ultrasound:** IUP present, no passage of products yet\n**Presentation:** Open os indicates process will proceed\n**Management:** Expectant, medical, or surgical — consult OB"},{"heading":"Incomplete Miscarriage","body":"**Cervical os:** Open\n**Ultrasound:** Partially expelled products of conception\n**Presentation:** Some tissue has passed, but retained products remain\n**Management:** If tissue visible in cervix — remove with ring forceps at bedside. Medical or surgical management for retained products."},{"heading":"Septic Abortion","body":"**Cervical os:** Any (open or closed)\n**Ultrasound:** Any finding possible\n**Presentation:** Intrauterine infection — **fever, uterine tenderness, purulent discharge**\n**Management:** EMERGENT — IV broad-spectrum antibiotics + surgical evacuation. May progress rapidly to sepsis/septic shock. [3]"}]'::jsonb,
 '[{"num":1,"text":"Hasan R, Baird DD, Herring AH, et al. Association between first-trimester vaginal bleeding and miscarriage. Obstet Gynecol. 2009;114(4):860-867."},{"num":2,"text":"ACOG Practice Bulletin No. 150. Early Pregnancy Loss. Obstet Gynecol. 2015;125(5):1258-1267."},{"num":3,"text":"Pedigo R. First Trimester Pregnancy Emergencies. Emergency Medicine Practice. 2019;21(1):1-28."}]'::jsonb,
 false,
 2)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ft-nvp-pathway', 'NVP Stepwise Treatment Pathway', 'ACOG 2018 Recommended Approach',
 '[{"heading":"Step 1 — First-Line Oral (Level A)","body":"**Pyridoxine (B6)** 10-25 mg PO TID\n± **Doxylamine** 12.5 mg PO TID\n\nAdjuncts:\n• **Ginger** 250 mg PO QID\n• **P6 acupressure** wristband\n• Convert prenatal vitamin to **folic acid only**\n\n💊 Generic pyridoxine + OTC doxylamine (Unisom SleepTabs) is significantly cheaper than Diclegis/Bonjesta."},{"heading":"Step 2 — Second-Line Oral","body":"Add one of:\n• **Dimenhydrinate** 50 mg PO QID (max 200 mg/day if taking doxylamine)\n• **Diphenhydramine** 25-50 mg PO QID\n• **Prochlorperazine** 25 mg PR q12h\n• **Promethazine** 12.5 mg PO or PR q6h"},{"heading":"Step 3 — IV Therapy","body":"**Rehydration:** D5NS preferred (slightly better than NS for nausea)\n**Thiamine** 100 mg IV before dextrose if protracted vomiting\n\nIV antiemetics — choose one:\n• **Metoclopramide** 10 mg IV q8h — preferred (no fetal malformation risk)\n• **Ondansetron** 4-8 mg IV over 15 min q12h — effective but exhaust other options first\n• **Dimenhydrinate** 50 mg IV in 50 mL NS over 20 min q6h\n• **Promethazine** 12.5 mg IV q6h (dilute, slow push — tissue necrosis risk)"},{"heading":"Step 4 — Admit (Hyperemesis Gravidarum)","body":"If no improvement after IV therapy:\n• **OB consultation**\n• Admit for continued IV rehydration\n• Electrolyte monitoring\n• Daily thiamine\n• Parenteral antiemetic regimen\n• Nutritional assessment\n\n**Definition:** ≥5% loss of prepregnancy body weight + persistent nausea/vomiting + ketonuria"},{"heading":"Key Evidence Notes","body":"• No high-quality evidence supports one specific drug over another for NVP [1]\n• Pyridoxine + doxylamine is superior to pyridoxine alone [2]\n• Ondansetron: possible small risk of fetal cardiac abnormalities — use after exhausting alternatives [3]\n• Metoclopramide: no association with fetal malformations — reasonable first-line IV agent [2]\n• NVP is actually protective against pregnancy loss (HR 0.20 for nausea + vomiting) [4]"}]'::jsonb,
 '[{"num":1,"text":"Matthews A, Haas DM, O''Mathuna DP, et al. Interventions for nausea and vomiting in early pregnancy. Cochrane Database Syst Rev. 2015;(9):CD007575."},{"num":2,"text":"ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30."},{"num":3,"text":"Danielsson B, Noor AH, Hoog A, et al. Association of ondansetron use in early pregnancy with congenital malformations. JAMA. 2018;320(23):2429-2437."},{"num":4,"text":"Hinkle SN, Mumford SL, Grantz KL, et al. Association of nausea and vomiting during pregnancy with pregnancy loss. JAMA Intern Med. 2016;176(11):1621-1627."}]'::jsonb,
 false,
 3)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ft-imaging-safety', 'Imaging Safety in Pregnancy', 'Radiation Doses, Modality Selection & Contrast Considerations',
 '[{"heading":"Key Principles","body":"• **Do not withhold indicated imaging** for fear of radiation — missed/delayed diagnosis may cause worse fetal outcomes [1]\n• **Ultrasound and MRI (without gadolinium)** are preferred first-line modalities\n• **Single CT study** does not exceed threshold dose for fetal harm\n• **Document risks/benefits discussion** with patient for studies involving direct fetal radiation"},{"heading":"No Pregnancy Testing Needed (ACR)","body":"These produce negligible fetal exposure: [2]\n• Head or neck imaging (any modality)\n• Extremity radiography or CT (except possibly hip)\n• Chest radiography (first and second trimesters)"},{"heading":"Fetal Radiation Doses","body":"**Very low (<0.1 mGy):**\n• C-spine XR: <0.001 mGy\n• Extremity XR: <0.001 mGy\n• Chest XR (2 views): 0.0005-0.01 mGy\n\n**Low to moderate (0.1-10 mGy):**\n• Abdominal XR: 0.1-3.0 mGy\n• Chest CT / CTPA: 0.01-0.66 mGy\n• Head/neck CT: 1.0-10 mGy\n• Bone scan: 4-5 mGy\n\n**Higher (10-50 mGy):**\n• Abdominal CT: 1.3-35 mGy\n• Pelvic CT: 10-50 mGy\n\n**Reference:** Annual background radiation = 1.1-2.5 mGy [3]"},{"heading":"Contrast Media","body":"**Iodinated contrast (CT):**\n• Crosses placenta but no known harm in limited data\n• ACOG: use only if \"absolutely required\" — precautionary, not evidence-based [1]\n\n**Gadolinium (MRI):**\n• **AVOID unless absolutely necessary**\n• Associated with increased stillbirth, neonatal death, and rheumatologic/inflammatory skin conditions [4]\n• MRI for appendicitis should always be ordered WITHOUT contrast\n\n**MRI without gadolinium** is safe — no fetal risk demonstrated through age 4 years in >1.4 million pregnancies [4]"},{"heading":"Appendicitis Imaging Algorithm","body":"1. **Ultrasound first** — but visualization rate as low as 7%, sensitivity only 18% in pregnancy [5]\n2. **MRI without contrast** — sensitivity 94%, specificity 97%. Preferred if available. [6]\n3. **CT abdomen/pelvis** — if US indeterminate and MRI unavailable. High sensitivity/specificity. Single study does not exceed threshold. [1]\n\nBoth US and MRI have high specificity (97-99%) — a positive result can be relied upon."}]'::jsonb,
 '[{"num":1,"text":"ACOG Committee Opinion No. 723: Guidelines for Diagnostic Imaging During Pregnancy and Lactation. Obstet Gynecol. 2017;130(4):e210-e216."},{"num":2,"text":"American College of Radiology. ACR-SPR Practice Parameter for Imaging Pregnant or Potentially Pregnant Adolescents and Women with Ionizing Radiation. 2013."},{"num":3,"text":"Tremblay E, Therasse E, Thomassin-Naggara I, Trop I. Quality initiatives: guidelines for use of medical imaging during pregnancy and lactation. RadioGraphics. 2012;32:897-911."},{"num":4,"text":"Ray JG, Vermeulen MJ, Bharatha A, et al. Association between MRI exposure during pregnancy and fetal and childhood outcomes. JAMA. 2016;316(9):952-961."},{"num":5,"text":"Konrad J, Grand D, Lourenco A. MRI: first-line imaging modality for pregnant patients with suspected appendicitis. Abdom Imaging. 2015;40(8):3359-3364."},{"num":6,"text":"Duke E, Kalb B, Arif-Tiwari H, et al. A systematic review and meta-analysis of diagnostic performance of MRI for evaluation of acute appendicitis. AJR Am J Roentgenol. 2016;206(3):508-517."}]'::jsonb,
 false,
 4)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ft-abx-safety', 'Antibiotic Safety in Pregnancy', 'First Trimester Considerations for Common Antibiotics',
 '[{"heading":"Generally Safe in All Trimesters","body":"• **Amoxicillin** — first-line for UTI in pregnancy\n• **Cephalosporins** (cephalexin, ceftriaxone, cefazolin) — widely used, well-studied\n• **Penicillins** — extensive safety record\n• **Azithromycin** — safe for atypical coverage"},{"heading":"Use with Caution in First Trimester","body":"• **Nitrofurantoin** — ACOG 2017: safe in 2nd/3rd trimester but use in 1st trimester only \"when no other suitable alternative antibiotics are available\" [1]\n• **Sulfonamides (TMP-SMX)** — same ACOG caveat as nitrofurantoin. Theoretical risk of folate antagonism. [1]"},{"heading":"Avoid in Pregnancy","body":"• **Fluoroquinolones** (ciprofloxacin, levofloxacin) — cartilage damage in animal studies; avoid if alternatives exist\n• **Tetracyclines** (doxycycline, minocycline) — tooth discoloration and bone growth effects after first trimester\n• **Aminoglycosides** (gentamicin) — ototoxicity risk; use only when benefits clearly outweigh risks (e.g., septic abortion)\n• **Metronidazole** — generally avoided in first trimester (conflicting data, likely safe but alternatives preferred)"},{"heading":"UTI Treatment in Pregnancy","body":"**Preferred regimens (7-day course):**\n• Amoxicillin 875 mg PO BID\n• Cephalexin 500 mg PO q6h\n• Nitrofurantoin 100 mg PO BID (if no alternatives — 1st trimester only)\n\n**Key points:**\n• **ALWAYS send urine culture** — negative UA does not exclude bacteriuria [2]\n• **Treat asymptomatic bacteriuria** when found — reduces pyelonephritis risk from 2.4% to 0.6% [3]\n• Shorter courses may be less effective than 7-day regimens [4]\n• Local antibiograms should guide empiric therapy"},{"heading":"Pyelonephritis","body":"**Admit ALL pregnant patients** for initial IV antibiotics:\n• Ceftriaxone 1 g IV daily\n• Continue until afebrile 48 hours\n• Transition to oral agent guided by sensitivities\n\nInsufficient evidence for outpatient management in pregnancy. [5]"}]'::jsonb,
 '[{"num":1,"text":"ACOG Committee Opinion No. 717: Sulfonamides, Nitrofurantoin, and Risk of Birth Defects. Obstet Gynecol. 2017;130(3):e150-e152."},{"num":2,"text":"Angelescu K, Nussbaumer-Streit B, Sieben W, et al. Benefits and harms of screening for and treatment of asymptomatic bacteriuria in pregnancy. BMC Pregnancy Childbirth. 2016;16(1):336."},{"num":3,"text":"Kazemier BM, et al. Maternal and neonatal consequences of treated and untreated asymptomatic bacteriuria in pregnancy. Lancet Infect Dis. 2015;15(11):1324-1333."},{"num":4,"text":"Guinto VT, De Guia B, Festin MR, et al. Different antibiotic regimens for treating asymptomatic bacteriuria in pregnancy. Cochrane Database Syst Rev. 2010;(9):CD007855."},{"num":5,"text":"Pedigo R. First Trimester Pregnancy Emergencies. Emergency Medicine Practice. 2019;21(1):1-28."}]'::jsonb,
 false,
 5)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ft-miscarriage-discharge', 'Miscarriage Discharge Instructions', 'Patient Information & Return Precautions',
 '[{"heading":"What Has Happened","body":"You have experienced a miscarriage (also called early pregnancy loss). This is unfortunately common — it occurs in up to 1 in 4 pregnancies. Most miscarriages are caused by genetic abnormalities in the pregnancy and are not caused by anything you did or did not do."},{"heading":"What to Expect","body":"• **Bleeding:** You may have vaginal bleeding and cramping for 1-2 weeks. This is normal.\n• **Pain:** Cramping is expected. Take ibuprofen (Advil/Motrin) 600 mg every 6 hours as needed for pain.\n• **Passing tissue:** You may pass blood clots or tissue. This is part of the natural process.\n• **Bleeding should gradually decrease** over the next 1-2 weeks."},{"heading":"Activity & Self-Care","body":"• **Rest** as needed — there is no strict bed rest requirement\n• **Avoid** placing anything in the vagina (tampons, douching, intercourse) for **2 weeks** or until bleeding stops\n• **Hydrate** well and eat as tolerated\n• You may shower and bathe normally"},{"heading":"Return to the Emergency Department If","body":"• **Heavy bleeding** — soaking more than 1 pad per hour for 2 or more hours in a row\n• **Fever** greater than 100.4°F (38°C)\n• **Foul-smelling vaginal discharge**\n• **Severe abdominal pain** not relieved by ibuprofen\n• **Dizziness, lightheadedness, or fainting**\n• **Persistent heavy bleeding** beyond 2 weeks"},{"heading":"Follow-Up","body":"• See your OB/GYN within **1-2 weeks**\n• Your doctor may check a blood test (beta-hCG) to confirm the miscarriage is complete\n• Discuss future pregnancy planning with your OB/GYN when you are ready\n• Most women who have a miscarriage go on to have healthy pregnancies in the future"},{"heading":"Emotional Support","body":"• A miscarriage is a loss, and it is normal to grieve\n• Everyone experiences grief differently — there is no \"right way\" to feel\n• Talk to your partner, family, or a trusted friend\n• Your doctor can refer you to a grief counselor or pregnancy loss support group\n• **National support:** Share Pregnancy & Infant Loss Support — www.nationalshare.org"}]'::jsonb,
 '[{"num":1,"text":"Catlin A. Interdisciplinary guidelines for care of women presenting to the emergency department with pregnancy loss. MCN Am J Matern Child Nurs. 2018;43(1):13-18."}]'::jsonb,
 true,
 6)
;

COMMIT;
