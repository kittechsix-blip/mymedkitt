-- =====================================================================
-- MedKitt — Syphilis ED Evaluation Consult: Supabase INSERT Statements
-- Generated: 2026-03-23
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'syphilis',
  'Syphilis ED Evaluation',
  'Staging → Testing → Interpretation → Treatment → Disposition',
  '1.0',
  32,
  'syph-start',
  '["Initial Assessment","Stage Classification","Risk Assessment & Testing","Test Interpretation","Treatment","Special Populations & Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('infectious-disease', 'syphilis', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (48 citations)
DELETE FROM tree_citations WHERE tree_id = 'syphilis';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('syphilis', 1, 'New York City Department of Health and Mental Hygiene. The diagnosis, management, and prevention of syphilis: an update and review. 2019.'),
('syphilis', 2, 'Ramchandani MS, Cannon CA, Marra CM. Syphilis: a modern resurgence. Infect Dis Clin North Am. 2023;37(2):195-222.'),
('syphilis', 3, 'Eppes CS, Stafford I, Rac M. Syphilis in pregnancy: an ongoing public health threat. Am J Obstet Gynecol. 2022;227(6):822-838.'),
('syphilis', 4, 'US Centers for Disease Control and Prevention. Sexually transmitted infections surveillance, 2024 (provisional). 2025.'),
('syphilis', 5, 'Hazra A, Collison MW, Davis AM. CDC sexually transmitted infections treatment guidelines, 2021. JAMA. 2022;327(9):870-871.'),
('syphilis', 6, 'Papp JR, Park IU, Fakile Y, et al. CDC laboratory recommendations for syphilis testing, United States, 2024. MMWR Recomm Rep. 2024;73(1):1-32.'),
('syphilis', 7, 'Smit DP, Cunningham ET Jr, Thorne JE, et al. Ocular syphilis. Ocul Immunol Inflamm. 2023;31(7):1313-1314.'),
('syphilis', 8, 'Ren M, Dashwood T, Walmsley S. The intersection of HIV and syphilis: update on the key considerations in testing and management. Curr HIV/AIDS Rep. 2021;18(4):280-288.'),
('syphilis', 9, 'Chesson HW, Pinkerton SD, Voigt R, et al. HIV infections and associated costs attributable to syphilis coinfection among African Americans. Am J Public Health. 2003;93(6):943-948.'),
('syphilis', 10, 'Uku A, Albujasim Z, Dwivedi T, et al. Syphilis in pregnancy: the impact of "the great imitator." Eur J Obstet Gynecol Reprod Biol. 2021;259:207-210.'),
('syphilis', 11, 'Wan Z, Zhang H, Xu H, et al. Maternal syphilis treatment and pregnancy outcomes: a retrospective study in Jiangxi Province, China. BMC Pregnancy Childbirth. 2020;20(1):648.'),
('syphilis', 12, 'Thean L, Moore A, Nourse C. New trends in congenital syphilis: epidemiology, testing in pregnancy, and management. Curr Opin Infect Dis. 2022;35(5):452-460.'),
('syphilis', 13, 'Peeling RW, Mabey D, Chen XS, et al. Syphilis. Lancet. 2023;402(10398):336-346.'),
('syphilis', 14, 'US Centers for Disease Control and Prevention. Sexually transmitted disease surveillance 2021.'),
('syphilis', 15, 'US Centers for Disease Control and Prevention. National overview of STIs, 2022. Sexually transmitted infections surveillance, 2022.'),
('syphilis', 16, 'Centers for Disease Control and Prevention. Syphilis & MSM (men who have sex with men) – CDC fact sheet. 2024.'),
('syphilis', 17, 'Wu S, Wang J, Guo Q, et al. Prevalence of HIV, syphilis, and hepatitis B and C in pregnant women: a systematic review and meta-analysis. Clin Microbiol Infect. 2023;29(8):1000-1007.'),
('syphilis', 18, 'Chevalier FJ, Bacon O, Johnson KA, et al. Syphilis: a review. JAMA. 2025;334(21):1927-1940.'),
('syphilis', 19, 'Avila-Nieto C, Pedreno-Lopez N, Mitja O, et al. Syphilis vaccine: challenges, controversies and opportunities. Front Immunol. 2023;14:1126170.'),
('syphilis', 20, 'US Department of Health and Human Services. Syphilis: a provider''s guide to treatment and prevention.'),
('syphilis', 21, 'Guidance for STD clinical preventive services for persons infected with HIV. Sex Transm Dis. 2001;28(8):460-463.'),
('syphilis', 22, 'Larsen SA, Steiner BM, Rudolph AH. Laboratory diagnosis and interpretation of tests for syphilis. Clin Microbiol Rev. 1995;8(1):1-21.'),
('syphilis', 23, 'Wendel GD Jr, Sheffield JS, Hollier LM, et al. Treatment of syphilis in pregnancy and prevention of congenital syphilis. Clin Infect Dis. 2002;35(Suppl 2):S200-209.'),
('syphilis', 24, 'Baffi CW, Aban I, Willig JH, et al. New syphilis cases and concurrent STI screening in a Southeastern US HIV clinic. AIDS Patient Care STDS. 2010;24(1):23-29.'),
('syphilis', 25, 'Risseeuw-Appel IM, Kothe FC. Transfusion syphilis: a case report. Sex Transm Dis. 1983;10(4):200-201.'),
('syphilis', 26, 'Saxena AK, Panhotra BR, Naguib M, et al. Nosocomial transmission of syphilis during haemodialysis. Scand J Infect Dis. 2002;34(2):88-92.'),
('syphilis', 27, 'Jordan EOB, W. Textbook of Bacteriology. 14th ed. Philadelphia, PA: Saunders; 1945.'),
('syphilis', 28, 'Mahoney JF, Arnold RC, Harris A. Penicillin treatment of early syphilis — a preliminary report. Am J Public Health Nations Health. 1943;33(12):1387-1391.'),
('syphilis', 29, 'Stokes JH, Sternberg TH, Schwartz WH, et al. The action of penicillin in late syphilis. JAMA. 1944;126(2):73-80.'),
('syphilis', 30, 'Clement ME, Okeke NL, Hicks CB. Treatment of syphilis: a systematic review. JAMA. 2014;312(18):1905-1917.'),
('syphilis', 31, 'Wong T, Singh AE, De P. Primary syphilis: serological treatment response to doxycycline/tetracycline versus benzathine penicillin. Am J Med. 2008;121(10):903-908.'),
('syphilis', 32, 'Li J, Zheng HY. Early syphilis: serological treatment response to doxycycline/tetracycline versus benzathine penicillin. J Infect Dev Ctries. 2014;8(2):228-232.'),
('syphilis', 33, 'Hook EW 3rd, Martin DH, Stephens J, et al. A randomized, comparative pilot study of azithromycin versus benzathine penicillin G for treatment of early syphilis. Sex Transm Dis. 2002;29(8):486-490.'),
('syphilis', 34, 'Riedner G, Rusizoka M, Todd J, et al. Single-dose azithromycin versus penicillin G benzathine for the treatment of early syphilis. N Engl J Med. 2005;353(12):1236-1244.'),
('syphilis', 35, 'Lukehart SA, Godornes C, Molini BJ, et al. Macrolide resistance in Treponema pallidum in the United States and Ireland. N Engl J Med. 2004;351(2):154-158.'),
('syphilis', 36, 'Mitchell SJ, Engelman J, Kent CK, et al. Azithromycin-resistant syphilis infection: San Francisco, California, 2000-2004. Clin Infect Dis. 2006;42(3):337-345.'),
('syphilis', 37, 'Tobin MJ. Fiftieth anniversary of uncovering the Tuskegee syphilis study. Am J Respir Crit Care Med. 2022;205(10):1145-1158.'),
('syphilis', 38, 'Rockwell DH, Yobs AR, Moore MB Jr. The Tuskegee study of untreated syphilis; the 30th year of observation. Arch Intern Med. 1964;114:792-798.'),
('syphilis', 39, 'Semeniuk I, Reverby S. A shocking discovery. Nature. 2010;467(7316):645.'),
('syphilis', 40, 'Roberts CP, Raich A, Stafylis C, et al. Alternative treatments for syphilis during pregnancy. Sex Transm Dis. 2019;46(10):637-640.'),
('syphilis', 41, 'Stafylis C, Keith K, Mehta S, et al. Clinical efficacy of cefixime for the treatment of early syphilis. Clin Infect Dis. 2021;73(5):907-910.'),
('syphilis', 42, 'Luetkemeyer AF, Donnell D, Dombrowski JC, et al. Postexposure doxycycline to prevent bacterial sexually transmitted infections. N Engl J Med. 2023;388(14):1296-1306.'),
('syphilis', 43, 'Molina JM, Charreau I, Chidiac C, et al. Post-exposure prophylaxis with doxycycline to prevent sexually transmitted infections in men who have sex with men. Lancet Infect Dis. 2018;18(3):308-317.'),
('syphilis', 44, 'Tuddenham S, Hamill MM, Ghanem KG. Diagnosis and treatment of sexually transmitted infections: a review. JAMA. 2022;327(2):161-172.'),
('syphilis', 45, 'Chevalier FJ, Bacon O, Johnson KA, Cohen SE. Syphilis. JAMA. 2025;:2840085.'),
('syphilis', 46, 'Ghanem KG, Ram S, Rice PA. The modern epidemic of syphilis. N Engl J Med. 2020;382(9):845-854.'),
('syphilis', 47, 'Hook EW, Dionne JA, Workowski K, et al. One dose versus three doses of benzathine penicillin G in early syphilis. N Engl J Med. 2025;393(9):869-878.'),
('syphilis', 48, 'Park IU, Tran A, Pereira L, Fakile Y. Sensitivity and specificity of treponemal-specific tests for the diagnosis of syphilis. Clin Infect Dis. 2020;71(Suppl 1):S13-S20.');

DELETE FROM decision_nodes WHERE tree_id = 'syphilis';

-- 4. decision_nodes (32 nodes)

-- MODULE 1: INITIAL ASSESSMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-start', 'syphilis', 'question', 1,
 'Syphilis — ED Evaluation',
 '[Syphilis Steps Summary](#/info/syph-steps-summary)

207,255 total US cases in 2022 (80% increase since 2018). 59,233 primary/secondary cases. Congenital syphilis increased 755% from 2012-2022. Known as "the great imitator" — can mimic many conditions. [1][2][4]',
 '[1,2,4]'::jsonb, '[{"label":"Genital or Oral Lesion","description":"Painless ulcer/chancre, oral lesion","next":"syph-primary-exam"},{"label":"Diffuse Rash or Systemic Symptoms","description":"Palmar/plantar rash, condylomata lata, prodrome","next":"syph-secondary-exam"},{"label":"Positive Syphilis Screening Test","description":"Incidental finding, prenatal screen, STI panel","next":"syph-test-interpret"},{"label":"Partner Notification / Contact Tracing","description":"Notified of partner''s syphilis diagnosis","next":"syph-partner-exposure"},{"label":"Neurologic, Ocular, or Otic Symptoms","description":"Vision changes, hearing loss, cognitive changes","next":"syph-neuro-screen","urgency":"urgent"},{"label":"Pregnancy With Syphilis Concern","description":"Prenatal positive, new exposure, or active lesion","next":"syph-pregnancy","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"syphilis-serology","label":"Serology Interpreter"}]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-partner-exposure', 'syphilis', 'info', 1,
 'Partner Notification Exposure',
 'Exposed contacts of primary/secondary syphilis within the preceding **90 days** should be treated presumptively, even if seronegative. [5][21]

Contacts >90 days ago should be tested and treated based on results.

**Contact tracing windows by stage:**
• Primary syphilis: 3 months + symptom duration
• Secondary syphilis: 6 months + symptom duration
• Early latent: 1 year

[Partner Notification & Reporting](#/info/syph-partner-notification)',
 '[5,21]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-risk-factors', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-neuro-screen', 'syphilis', 'question', 1,
 'Neurological, Ocular, or Otic Symptoms',
 'Neurosyphilis can occur at **ANY stage** of syphilis infection. Ocular and otosyphilis are clinical diagnoses that require neurosyphilis-level treatment regardless of CSF findings. [1][6]

**Key findings:**
• **Ocular:** uveitis (most common), vision loss, floaters, disc edema, retinitis
• **Otic:** hearing loss (conductive or sensorineural), tinnitus, vertigo
• **Meningeal:** headache, stiff neck, photophobia, CN VI/VII/VIII palsies
• **Late neuro:** cognitive decline, personality changes, Argyll Robertson pupils, tabes dorsalis ("foot-slapping" gait), general paresis
• **Vascular:** stuttering stroke-like symptoms from meningovascular disease',
 '[1,6,7]'::jsonb, '[{"label":"Ocular or Otic Symptoms Present","description":"Vision changes, uveitis, hearing loss, tinnitus","next":"syph-neuro-route","urgency":"critical"},{"label":"Other Neurological Symptoms","description":"Cognitive changes, CN palsies, meningismus, stroke-like","next":"syph-neuro-route","urgency":"critical"},{"label":"No Neuro/Ocular/Otic Symptoms","description":"Proceed to stage classification","next":"syph-stage-classify"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-neuro-route', 'syphilis', 'result', 1,
 'Neurosyphilis Pathway',
 'Patient has neurological, ocular, or otic symptoms with known or suspected syphilis. This requires the **neurosyphilis evaluation pathway**.

[Neurosyphilis Evaluation & Treatment](#/tree/neurosyphilis) — full CSF workup and IV Penicillin G protocol.

**Key principles:**
• Ocular/otosyphilis is treated as neurosyphilis **regardless of CSF findings** — do NOT delay treatment for LP results
• [Penicillin G (IV)](#/drug/penicillin-g-iv/neurosyphilis) 18-24 million units/day (3-4M units q4h) × 10-14 days
• [Benzathine Penicillin G](#/drug/benzathine-penicillin/primary) does NOT achieve treponemicidal CSF levels — inadequate for neurosyphilis
• Emergent ophthalmology consult for ocular syphilis, ENT/audiology for otosyphilis',
 '[1,6,7,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Route to Neurosyphilis consult for CSF evaluation and IV Penicillin G protocol.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-pregnancy', 'syphilis', 'info', 1,
 'Syphilis in Pregnancy',
 'Syphilis in pregnancy is a **public health emergency**. Congenital syphilis cases increased 755% from 2012-2022 (3,761 cases in 2022), with 282 stillbirths and infant deaths. [3][10][11]

**Critical rules:**
• ALL pregnant patients with syphilis must receive **penicillin** — there are **NO adequate alternatives**
• If PCN-allergic: **desensitization is MANDATORY** (oral protocol preferred, can be done in ED/L&D with monitoring)
• Vertical transmission risk is highest in primary/secondary syphilis but can occur at any stage

**Screening schedule:**
• First prenatal visit
• Beginning of third trimester (28 weeks)
• At delivery (in high-prevalence areas)

**Jarisch-Herxheimer reaction:** Can precipitate preterm labor and fetal distress. Monitor with continuous fetal monitoring × 24h if viable gestational age. [3][12]

[Congenital Syphilis Risks & Signs](#/info/syph-congenital)',
 '[3,10,11,12]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-stage-classify', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4)
;


-- MODULE 2: STAGE CLASSIFICATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-stage-classify', 'syphilis', 'question', 2,
 'Syphilis Stage Classification',
 'Classification determines treatment. Staging is based on clinical findings, serologic history, and time since acquisition. [1][2]

[Stage Classification Guide](#/info/syph-stages)

Syphilis progresses through defined stages. Previous infection does **not** confer immunity, and reinfected patients are less likely to be symptomatic.',
 '[1,2]'::jsonb, '[{"label":"Primary Syphilis","description":"Painless chancre at inoculation site, usually single","next":"syph-primary-exam"},{"label":"Secondary Syphilis","description":"Rash (palms/soles), condylomata lata, systemic symptoms","next":"syph-secondary-exam"},{"label":"Early Latent (< 1 Year)","description":"Asymptomatic, documented seroconversion or exposure < 1 year","next":"syph-latent-early"},{"label":"Late Latent (> 1 Year or Unknown)","description":"Asymptomatic, no documentation of acquisition time","next":"syph-latent-late"},{"label":"Tertiary (Non-Neurologic)","description":"Gummatous disease, cardiovascular syphilis","next":"syph-tertiary"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-primary-exam', 'syphilis', 'info', 2,
 'Primary Syphilis',
 '**Classic chancre:** painless, firm, round, indurated ulcer with clean base at the inoculation site. Appears 10-90 days after exposure (average 21 days). Heals spontaneously in 3-6 weeks even without treatment. [1][14][15]

**Characteristics:**
• Usually **single**, but can be multiple (especially in HIV+ patients or with high spirochete load)
• Common sites: penis, vulva, cervix, anus, mouth (oral sexual contact), fingers
• Bilateral, painless inguinal lymphadenopathy in ~70%
• Patients often do not notice the primary lesion because it is **not painful** and may not be easily visible

**Atypical presentations:** painful lesions, multiple lesions, atypical appearance — maintain high suspicion in at-risk populations.

**Definitive diagnosis:** Dark-field microscopy of lesion fluid (rarely available in EDs). PCR testing is emerging but not FDA-approved.

[Differential Diagnosis of Genital Lesions](#/info/syph-genital-ddx)',
 '[1,14,15]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-risk-factors', NULL, NULL, NULL, '[{"src":"assets/images/syphilis/chancre.png","alt":"Primary syphilis chancre — painless indurated ulcer","caption":"Primary syphilis chancre. Firm, round, painless ulcer at the site of inoculation."}]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-secondary-exam', 'syphilis', 'info', 2,
 'Secondary Syphilis',
 'Occurs **4-10 weeks after chancre** (which may still be present). Represents hematogenous dissemination of T. pallidum. [1][16][17]

**Rash:**
• Diffuse, symmetric, maculopapular
• Classically involves **palms and soles** (50-80% of cases)
• Non-pruritic, red to red-brown, flat and scaly
• Can be more generalized — "the great imitator" can mimic virtually any dermatologic condition
• May be difficult to identify on darker skin tones
• Can present atypically: vesicular, pustular, follicular, smooth, or as **malignant syphilis** (lues maligna — cutaneous ulcers with central necrosis and black-brown crust)

**Other findings:**
• **Condylomata lata:** moist, flat, broad-based, highly infectious lesions in warm/moist areas (perineum, vulva, inner thighs)
• **Mucous patches:** painless, silvery-gray oral/genital erosions
• **Moth-eaten alopecia:** patchy, non-scarring hair loss

**Systemic symptoms:** low-grade fever, malaise, weight loss, diffuse lymphadenopathy, arthralgias, hepatitis, nephrotic syndrome, uveitis

Untreated: resolves in 3-12 weeks, then enters latent phase. [1][16]',
 '[1,16,17]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-risk-factors', NULL, NULL, NULL, '[{"src":"assets/images/syphilis/palms-rash.png","alt":"Secondary syphilis palmar rash — red-brown maculopapular lesions","caption":"Secondary syphilis rash on palms. Classic red-brown, flat, scaly lesions."},{"src":"assets/images/syphilis/diffuse-rash.png","alt":"Secondary syphilis diffuse cutaneous rash","caption":"Diffuse maculopapular rash of secondary syphilis on trunk."}]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-latent-early', 'syphilis', 'info', 2,
 'Early Latent Syphilis',
 'Acquired within the preceding year but **no clinical signs or symptoms**. [1][5]

**Diagnosed when:**
• Documented seroconversion or 4-fold titer rise within 12 months
• History of primary/secondary symptoms within 12 months
• Sex partner with primary, secondary, or early latent syphilis within 12 months
• Reactive NTT and TT only in persons previously tested seronegative within 12 months

**Clinical significance:**
• Still sexually transmissible — ~25% may relapse to secondary stage
• Treatment is same as primary/secondary: single dose benzathine PCN-G',
 '[1,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-risk-factors', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 8)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-latent-late', 'syphilis', 'info', 2,
 'Late Latent / Unknown Duration',
 'Acquired **> 1 year ago** OR unknown duration of infection. [1][5]

**Key points:**
• Not sexually transmissible (except in pregnancy — can transmit vertically at any stage)
• Can progress to tertiary syphilis (in ~30% of untreated patients) over years to decades
• If no documentation of timing, classified as **late latent** (more conservative treatment — 3 weekly doses)

**Evaluate for neurosyphilis if:**
• Neurologic symptoms present
• Treatment failure (no 4-fold titer decline)
• HIV co-infection
• RPR titer ≥ 1:32
• Planned treatment with non-penicillin agent (must rule out neurosyphilis first — doxycycline does NOT penetrate CSF) [1]',
 '[1,5,18]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-risk-factors', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-tertiary', 'syphilis', 'info', 2,
 'Tertiary Syphilis',
 'Occurs in **~30% of untreated** patients, 3-15+ years after initial infection. Now rare in developed countries. [1][19]

**Gummatous syphilis (~15%):**
• Granulomatous, nodular lesions with necrotic center surrounded by immune cells
• Found in skin, bone, liver, testes, and other organs
• Destructive but responds well to treatment

**Cardiovascular syphilis (~10%):**
• Aortitis, ascending aortic aneurysm, aortic valve insufficiency
• Coronary ostial stenosis, myocarditis
• Typically 15-30 years after initial infection
• Antibiotic treatment does not reverse existing aortic damage — treats active infection

**Neurologic involvement:** Must rule out before treating as non-neurologic tertiary.

[Neurosyphilis Evaluation](#/tree/neurosyphilis)',
 '[1,19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-risk-factors', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;


-- MODULE 3: RISK ASSESSMENT & TESTING
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-risk-factors', 'syphilis', 'info', 3,
 'Risk Factor Assessment',
 'Document risk factors to guide testing strategy and counseling. [1][2][14]

**High-risk populations:**
• **MSM** — highest incidence (56% of primary/secondary cases, rate 240× higher than women)
• **HIV co-infection** — syphilis facilitates HIV acquisition 2-5× and vice versa
• **Persons on PrEP** — test at initiation and at least every 6 months (every 3 months for high-risk MSM)
• **Multiple sexual partners**, sex work, incarceration history
• **IV drug users** — needle-sharing and higher-risk sexual activity
• **Prior STI history** — indicates higher-risk exposure

**Co-testing (MANDATORY with syphilis):**
• HIV Ag/Ab (4th gen combo)
• Gonorrhea/Chlamydia NAAT (urine or swab)
• Hepatitis B surface Ag/Ab/core Ab
• Hepatitis C antibody [24][25]',
 '[1,2,14,24,25]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-testing-strategy', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-testing-strategy', 'syphilis', 'question', 3,
 'Diagnostic Testing Strategy',
 'Two serologic algorithms exist. Most labs now use the **reverse algorithm** (start with treponemal test). No single test is definitive in all scenarios — the combination of NTT + TT + clinical context determines diagnosis. [6][22][23]

[Testing Algorithm Guide](#/info/syph-testing-algorithm)

**Nontreponemal tests (NTT):** RPR, VDRL — detect antibodies to tissue damage, not T. pallidum itself. Quantitative titers correlate with disease activity.

**Treponemal tests (TT):** TP-PA, FTA-ABS, EIA, CIA — detect specific T. pallidum antibodies. Remain positive for life after treatment.',
 '[6,22,23]'::jsonb, '[{"label":"Clinical Suspicion — Order Labs From ED","description":"Primary/secondary findings, exposure, partner notification","next":"syph-ed-orders"},{"label":"Labs Already Resulted — Interpret","description":"RPR/VDRL + treponemal test results available","next":"syph-test-interpret"},{"label":"Point-of-Care Testing Available","description":"Rapid treponemal test, dark-field microscopy","next":"syph-poc-testing"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"syphilis-serology","label":"Serology Interpreter"}]'::jsonb, 12)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-ed-orders', 'syphilis', 'info', 3,
 'ED Lab Orders for Syphilis',
 '**Standard ED workup:** [22][23]

**Serologic testing:**
• RPR (quantitative) — nontreponemal test, reflects disease activity
• Treponemal test (TP-PA or FTA-ABS) — if not already reflexed by lab

**Co-testing:**
• HIV Ag/Ab combo (4th generation) — mandatory
• GC/CT NAAT (urine or swab)
• Hepatitis B surface Ag/Ab/core Ab, Hepatitis C Ab

**If neurologic symptoms:**
• LP for CSF-VDRL, cell count, protein → [Neurosyphilis Evaluation](#/tree/neurosyphilis)

**Direct detection (if lesion present):**
• Dark-field microscopy — definitive for primary syphilis (rarely available in EDs)
• PCR testing — emerging, not yet FDA-approved in US

**Window period:** NTTs become reactive 1-4 weeks after chancre appears. TTs seroconvert slightly earlier. Very early primary syphilis can be **seronegative** — if clinical suspicion is high, treat empirically and repeat serologies in 2-4 weeks. [22][25]',
 '[22,23,25]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-test-interpret', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-poc-testing', 'syphilis', 'info', 3,
 'Point-of-Care Testing',
 'Rapid treponemal POC tests are becoming available in the US (Syphilis Health Check™, DPP® HIV-syphilis assay). [26][27]

**Performance:**
• Sensitivity 85-98%, specificity 95-99% for treponemal antibodies
• Comparable to laboratory-based treponemal testing

**Limitations:**
• Like all treponemal tests, remain positive for **life** after treatment
• Cannot distinguish active from previously treated infection
• Still require NTT (RPR) for staging and treatment monitoring
• Positive result must be followed by confirmatory NTT and treponemal testing

**Dark-field microscopy:** Gold standard for primary chancre diagnosis. Requires immediate examination of fluid from lesion base. Specialized equipment rarely available in EDs.

**PCR-based testing:** Emerging but no FDA-approved tests currently available in the US.',
 '[26,27]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-test-interpret', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;


-- MODULE 4: TEST INTERPRETATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-test-interpret', 'syphilis', 'question', 4,
 'Serologic Test Interpretation',
 'Interpret the combination of **nontreponemal test** (NTT = RPR or VDRL) and **treponemal test** (TT = TP-PA, FTA-ABS, EIA, or CIA). Both tests may be nonreactive in up to **30% of patients with primary syphilis**. [6][22][23]

[Testing Algorithm Guide](#/info/syph-testing-algorithm)',
 '[6,22,23]'::jsonb, '[{"label":"NTT Reactive + TT Reactive","description":"RPR+ and TP-PA/FTA-ABS+ — active or recently treated","next":"syph-both-reactive"},{"label":"NTT Nonreactive + TT Reactive","description":"RPR- but TP-PA+ — previously treated, early primary, or late latent","next":"syph-ntt-neg-tt-pos"},{"label":"NTT Reactive + TT Nonreactive","description":"RPR+ but TP-PA- — possible biologic false positive","next":"syph-ntt-pos-tt-neg"},{"label":"Both Nonreactive","description":"RPR- and TP-PA- — no syphilis or incubating","next":"syph-both-nonreactive"},{"label":"Results Pending — Treat Empirically","description":"High clinical suspicion, treat before results","next":"syph-empiric-treat","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"syphilis-serology","label":"Serology Interpreter"}]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-both-reactive', 'syphilis', 'info', 4,
 'NTT Reactive + TT Reactive',
 'This is the **classic positive result** — confirms treponemal infection. Must distinguish active from previously treated. [6][22][23]

**No prior treatment history:**
• New diagnosis — classify stage based on clinical findings and treat accordingly
• Quantitative RPR titer helps assess disease activity (higher titers = more active)
• RPR ≥ 1:32 correlates with higher risk of neurosyphilis

**Prior treatment history:**
• Compare current RPR titer to prior documented titer
• **4-fold rise** in titer (e.g., 1:4 → 1:16) = **reinfection or treatment failure** — re-treat
• Stable low titer (**serofast state**): RPR may remain low-titer positive for life (~10% of treated patients). May not need re-treatment unless clinical concern.

**Treponemal tests remain positive for life** regardless of treatment — they cannot distinguish active from past infection. [22]',
 '[6,22,23,28]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-determine-treatment', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-ntt-neg-tt-pos', 'syphilis', 'info', 4,
 'NTT Nonreactive + TT Reactive',
 'Several possibilities — clinical context determines the interpretation. [6][22][23]

**Most common: Previously treated syphilis**
• TT remains reactive for life; NTT reverts to nonreactive after successful treatment
• If prior treatment is documented and patient is asymptomatic → no further treatment needed

**Very early primary syphilis:**
• TT seroconverts before NTT in the earliest stages
• If chancre is present: treat empirically and repeat RPR in 2-4 weeks

**Very late latent syphilis:**
• NTT can revert to nonreactive in up to 25% of untreated late latent cases
• If no prior treatment is documented → consider treatment for late latent

**Reverse algorithm discordance:**
• Reactive TT (EIA/CIA) with nonreactive NTT → confirm with **second, different treponemal test** (e.g., TP-PA if EIA was screening)
• If second TT also reactive → likely prior treated or late latent
• If second TT nonreactive → likely false-positive initial TT (no treatment if low risk) [29]',
 '[6,22,23,29]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-determine-treatment', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-ntt-pos-tt-neg', 'syphilis', 'info', 4,
 'NTT Reactive + TT Nonreactive',
 'Most likely a **biologic false-positive (BFP)** RPR/VDRL. No syphilis treatment indicated. [6][22][30]

**Common causes of BFP:**
• Pregnancy, autoimmune disease (SLE, antiphospholipid syndrome)
• Acute febrile illness, recent vaccination
• IV drug use, chronic liver disease
• Advanced age, malignancy, HIV

**Classification:**
• **Acute BFP** (< 6 months): usually low titer (≤ 1:8), transient
• **Chronic BFP** (> 6 months): consider autoimmune workup (ANA, anti-dsDNA, anticardiolipin Ab)

**Action:** No syphilis treatment. Consider repeating TT with a different assay. Evaluate for underlying cause of BFP.

⚠️ **Prozone phenomenon:** In secondary syphilis, very high antibody titers can **saturate the assay** and produce a false-negative NTT. If secondary syphilis is clinically suspected with a negative RPR → request **diluted/prozone-checked RPR**. [22]',
 '[6,22,30]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-both-nonreactive', 'syphilis', 'info', 4,
 'Both Tests Nonreactive',
 '**No serologic evidence of syphilis.** [6][22][23]

**If high clinical suspicion (e.g., chancre present):**
• May be in the **incubating syphilis window** (pre-seroconversion): 1-4 weeks after chancre appears
• Dark-field microscopy of lesion if available — definitive
• Treat empirically and repeat serologies in 2-4 weeks

**If known recent exposure (< 90 days):**
• Within window period — treat presumptively per partner notification protocol
• Repeat serologies in 2-4 weeks

**If low clinical suspicion:**
• Syphilis excluded
• Consider alternative diagnoses for presenting symptoms',
 '[6,22,23]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;


-- MODULE 5: TREATMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-determine-treatment', 'syphilis', 'question', 5,
 'Treatment by Stage',
 '**Penicillin G** is the only proven treatment for syphilis. Treatment regimen is determined by disease stage. [1][5][31]

[Treatment Summary Table](#/info/syph-treatment-table)

Jarisch-Herxheimer reaction may occur within hours of treatment — counsel all patients. [32]',
 '[1,5,31,32]'::jsonb, '[{"label":"Primary / Secondary / Early Latent","description":"Benzathine PCN-G 2.4M units IM × 1","next":"syph-treat-early"},{"label":"Late Latent / Tertiary (Non-Neuro)","description":"Benzathine PCN-G 2.4M units IM weekly × 3","next":"syph-treat-late"},{"label":"Neurosyphilis / Ocular / Otic","description":"IV Penicillin G — see neurosyphilis consult","next":"syph-neuro-route","urgency":"critical"},{"label":"Penicillin Allergy","description":"Alternative agents or desensitization","next":"syph-pcn-allergy"},{"label":"Pregnant","description":"PCN ONLY — desensitize if allergic","next":"syph-treat-pregnancy","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-treat-early', 'syphilis', 'result', 5,
 'Early Syphilis Treatment',
 '**Primary / Secondary / Early Latent (< 1 year):** [1][5][31]

[Benzathine Penicillin G](#/drug/benzathine-penicillin/primary) **2.4 million units IM × 1 dose**

Administer as a single injection (can split into two gluteal sites for comfort).

**Jarisch-Herxheimer reaction:** [32]
• Occurs in 10-35% of primary, 75-90% of secondary syphilis
• Onset 2-8 hours after treatment, resolves within 24 hours
• Fever, rigors, myalgias, headache, tachycardia, flushing, worsening of rash
• **NOT an allergic reaction** — caused by immune response to dying spirochetes
• Treat supportively (antipyretics, fluids). Do NOT withhold future treatment.

[Jarisch-Herxheimer Reaction](#/info/syph-jarisch-herxheimer)

**Follow-up:** Quantitative RPR at 6 and 12 months. Expect **4-fold titer decline** by 6-12 months (e.g., 1:64 → 1:16).',
 '[1,5,31,32]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-disposition', 'Benzathine PCN-G 2.4M units IM × 1. Counsel regarding Jarisch-Herxheimer. RPR at 6 and 12 months.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-treat-late', 'syphilis', 'result', 5,
 'Late Syphilis Treatment',
 '**Late Latent / Tertiary (non-neurologic):** [1][5][31]

[Benzathine Penicillin G](#/drug/benzathine-penicillin/late latent) **2.4 million units IM weekly × 3 weeks** (total 7.2 million units)

**Missed dose:** If > 14 days between doses, restart the 3-dose series.

**Before treating:**
• Must rule out neurosyphilis (neurologic exam; consider LP if RPR ≥ 1:32, HIV+, or any neurologic symptoms)
• Gummatous disease: responds well to treatment, lesions resolve
• Cardiovascular: treatment addresses active infection but does **not** reverse existing aortic damage

**Follow-up:** Quantitative RPR at 6, 12, and 24 months. If no 4-fold decline → evaluate for treatment failure or neurosyphilis.',
 '[1,5,31]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-disposition', 'Benzathine PCN-G 2.4M units IM weekly × 3 weeks. Rule out neurosyphilis. RPR at 6, 12, 24 months.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-pcn-allergy', 'syphilis', 'question', 5,
 'Penicillin Allergy Alternatives',
 'PCN allergy management depends on the syphilis stage and pregnancy status. **Desensitization is preferred** whenever possible because penicillin is the only proven curative therapy. [1][5][31][33]

**Azithromycin is NOT recommended** — chromosomal mutations conferring macrolide resistance are documented, with treatment failures reported in the US. [34][35][36]',
 '[1,5,31,33,34,35,36]'::jsonb, '[{"label":"Non-Pregnant, Early Syphilis","description":"Doxycycline is the primary alternative","next":"syph-alt-early"},{"label":"Non-Pregnant, Late Latent / Tertiary","description":"Doxycycline 28 days","next":"syph-alt-late"},{"label":"Non-Pregnant, Neurosyphilis","description":"Ceftriaxone or desensitization","next":"syph-alt-neuro"},{"label":"Pregnant — Any Stage","description":"MUST desensitize — no alternatives","next":"syph-treat-pregnancy","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 23)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-alt-early', 'syphilis', 'result', 5,
 'PCN Allergy — Early Syphilis Alternatives',
 '**Non-pregnant, Primary / Secondary / Early Latent:** [1][5][31]

**First alternative:**
[Doxycycline](#/drug/doxycycline/primary) **100 mg PO BID × 14 days**
• Well-tolerated, 82-100% serological cure rate
• Contraindicated in pregnancy and children < 8 years

**Second alternative:**
[Ceftriaxone](#/drug/ceftriaxone/neurosyphilis) **1-2g IM/IV daily × 10-14 days**
• Limited data, CDC-recommended alternative
• Cross-reactivity with penicillin allergy is ~2-5% (lower than historically believed)

**NOT recommended:** Azithromycin — documented macrolide resistance and treatment failures. [34][35][36]',
 '[1,5,31,34,35,36]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-disposition', 'Doxycycline 100mg PO BID × 14 days. RPR at 6 and 12 months.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 24)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-alt-late', 'syphilis', 'result', 5,
 'PCN Allergy — Late Syphilis Alternatives',
 '**Non-pregnant, Late Latent / Tertiary:** [1][5][31]

**Preferred alternative:**
[Doxycycline](#/drug/doxycycline/late latent) **100 mg PO BID × 28 days**

**Critical:** Must rule out neurosyphilis **before** using doxycycline — it does **NOT** achieve adequate CSF levels.

Evidence is weaker than for early syphilis. Close follow-up with Infectious Disease is essential.

If neurosyphilis cannot be excluded → [Neurosyphilis PCN Allergy pathway](#/node/syph-alt-neuro)',
 '[1,5,31]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-disposition', 'Doxycycline 100mg PO BID × 28 days. Rule out neurosyphilis first. RPR at 6, 12, 24 months.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 25)
;


-- MODULE 6: SPECIAL POPULATIONS & DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-treat-pregnancy', 'syphilis', 'result', 6,
 'Syphilis in Pregnancy — Treatment',
 '**Penicillin is the ONLY acceptable treatment in pregnancy.** No alternatives have been proven adequate for preventing congenital syphilis. [3][10][11][12]

**If PCN-allergic:** Desensitization is **MANDATORY** (oral desensitization protocol preferred, can be done in ED/L&D with monitoring). This is not optional.

**Treatment by stage:** Same regimen as non-pregnant:
• Early: [Benzathine Penicillin G](#/drug/benzathine-penicillin/primary) 2.4M units IM × 1
• Late: [Benzathine Penicillin G](#/drug/benzathine-penicillin/late latent) 2.4M units IM weekly × 3

**Jarisch-Herxheimer reaction in pregnancy:**
• Can precipitate preterm labor and fetal distress
• Monitor with continuous fetal monitoring × 24h if viable gestational age
• Should NOT prevent or delay treatment

[Jarisch-Herxheimer Reaction](#/info/syph-jarisch-herxheimer)
[Congenital Syphilis](#/info/syph-congenital)

**Inadequate treatment for congenital prevention:**
• Non-penicillin regimen used
• Treatment completed < 30 days before delivery
• No documented 4-fold titer decline',
 '[3,10,11,12]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-disposition', 'PCN per stage. If PCN-allergic: desensitize. Monitor for Jarisch-Herxheimer. OB involvement mandatory.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 26)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-alt-neuro', 'syphilis', 'result', 6,
 'Neurosyphilis — PCN Allergy',
 'Cross-reference with neurosyphilis consult for full workup: [Neurosyphilis Evaluation](#/tree/neurosyphilis) [1][7][8]

**If not true IgE-mediated allergy:**
Desensitization strongly preferred — penicillin is the only proven therapy for neurosyphilis.

**Alternative:**
[Ceftriaxone](#/drug/ceftriaxone/neurosyphilis) **2g IV daily × 10-14 days**
• CDC-recommended alternative with limited data
• Cross-reactivity between PCN and 3rd-gen cephalosporins is ~2-5% (lower than historically believed)

[Procaine Penicillin + Probenecid](#/drug/procaine-penicillin/neurosyphilis) — requires desensitization (still penicillin-based).

If true IgE-mediated PCN anaphylaxis: desensitization under allergist supervision is the safest approach.',
 '[1,7,8,33]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-disposition', 'Desensitize if possible. Alternative: Ceftriaxone 2g IV daily × 10-14 days.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 27)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-empiric-treat', 'syphilis', 'result', 6,
 'Empiric Treatment',
 'When clinical suspicion is high and results are pending: [1][5]

**Indications for empiric treatment:**
• Partner notification with exposure < 90 days
• Classic chancre consistent with primary syphilis
• Classic secondary rash (palms/soles involvement)
• High-risk patient with concerning lesion

[Benzathine Penicillin G](#/drug/benzathine-penicillin/primary) **2.4 million units IM × 1**

**IMPORTANT:** Draw serologic testing (RPR + treponemal test) **BEFORE** administering treatment. This establishes baseline titers for monitoring.

Follow up results and determine if stage-specific treatment adjustments are needed (e.g., if late latent → needs 2 additional weekly doses).',
 '[1,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'syph-disposition', 'Draw RPR + TT first, then Benzathine PCN-G 2.4M IM × 1. Follow up results.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 28)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-disposition', 'syphilis', 'question', 6,
 'Disposition',
 'Most syphilis patients are treated and **discharged from the ED**. Admission is rarely required. [1][5]

**All patients require:**
• Mandatory reporting to state/local public health department (syphilis is reportable in all 50 states)
• Partner notification and treatment
• Follow-up RPR titer monitoring

[Partner Notification & Reporting](#/info/syph-partner-notification)',
 '[1,5]'::jsonb, '[{"label":"Discharge — Uncomplicated Syphilis","description":"Early or late syphilis, treated, stable","next":"syph-discharge"},{"label":"Admit — Neurosyphilis or Complications","description":"IV PCN, cardiac involvement, pregnancy complications","next":"syph-admit","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 29)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-discharge', 'syphilis', 'result', 6,
 'Discharge Plan',
 '[1][5][21]

**Mandatory actions:**
• File public health report (syphilis is reportable in all 50 US states)
• Partner notification — assist with partner services or refer to health department

**Patient counseling:**
• Avoid sexual contact until **7 days after treatment** AND until all lesions have resolved
• Consistent condom use reduces transmission risk
• Jarisch-Herxheimer reaction counseling (fever, body aches within 24h — supportive care)
• Return immediately if new vision changes, hearing changes, or neurologic symptoms develop

**Follow-up:**
• ID or STD clinic within 1-2 weeks
• Quantitative RPR at 6, 12, and 24 months
• HIV testing result follow-up if pending

[Partner Notification & Reporting](#/info/syph-partner-notification)',
 '[1,5,21]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'File mandatory report. Partner notification. STI clinic follow-up. RPR at 6, 12, 24 months.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 30)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('syph-admit', 'syphilis', 'result', 6,
 'Admission Criteria',
 '**Admit for:** [1][6][7]

• **Neurosyphilis** — IV Penicillin G × 10-14 days → [Neurosyphilis Evaluation](#/tree/neurosyphilis)
• **Ocular syphilis** — IV PCN + emergent ophthalmology consult
• **Otosyphilis** — IV PCN + ENT/audiology consult
• **PCN desensitization** — requires monitored setting (ED or L&D)
• **Pregnant with Jarisch-Herxheimer risk** at viable gestational age → continuous fetal monitoring
• **Tertiary cardiovascular** with acute cardiac complications (aortic emergency)
• **Congenital syphilis in newborn** — 10 days of IV PCN, NICU involvement

**For all admitted patients:** ID consult mandatory.',
 '[1,6,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit for IV Penicillin G. ID consult. Ophthalmology/ENT if ocular/otic.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 31)
;


-- 6. info_pages (8 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syph-steps-summary', 'Syphilis ED Evaluation — Steps Summary', 'Quick Reference Flowchart',
 '[{"heading":"Initial Assessment","body":"• [Identify presentation and chief complaint](#/node/syph-start)\n• [Screen for neurologic, ocular, or otic symptoms](#/node/syph-neuro-screen)\n• [Assess for pregnancy and congenital risk](#/node/syph-pregnancy)"},{"heading":"Stage Classification","body":"• [Classify by stage: primary, secondary, early latent, late latent, tertiary](#/node/syph-stage-classify)\n• [Primary: painless chancre, 10-90 days after exposure](#/node/syph-primary-exam)\n• [Secondary: rash (palms/soles), condylomata lata, systemic symptoms](#/node/syph-secondary-exam)\n• [Tertiary: gummatous, cardiovascular — rule out neurosyphilis](#/node/syph-tertiary)"},{"heading":"Testing","body":"• [Risk factor assessment and co-testing (HIV, GC/CT, Hep B/C)](#/node/syph-risk-factors)\n• [Order RPR (quantitative) + treponemal test](#/node/syph-ed-orders)\n• [Interpret NTT/TT combination in clinical context](#/node/syph-test-interpret)"},{"heading":"Treatment","body":"• [Early syphilis: Benzathine PCN-G 2.4M IM × 1](#/node/syph-treat-early)\n• [Late syphilis: Benzathine PCN-G 2.4M IM weekly × 3](#/node/syph-treat-late)\n• [Neurosyphilis: IV Penicillin G × 10-14 days](#/tree/neurosyphilis)\n• [PCN allergy: Doxycycline or Ceftriaxone alternatives](#/node/syph-pcn-allergy)\n• [Pregnancy: PCN ONLY — desensitize if allergic](#/node/syph-treat-pregnancy)"},{"heading":"Disposition","body":"• [Discharge: mandatory reporting, partner notification, RPR follow-up](#/node/syph-discharge)\n• [Admit: neurosyphilis, ocular/otic, desensitization, pregnancy complications](#/node/syph-admit)"}]'::jsonb,
 '[{"num":1,"text":"Hazra A, et al. CDC STI Treatment Guidelines, 2021. JAMA. 2022;327(9):870-871."}]'::jsonb,
 false,
 0)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syph-stages', 'Syphilis Stage Classification', 'Clinical Features by Stage',
 '[{"heading":"Primary Syphilis","body":"**Incubation:** 10-90 days (average 21 days)\n\n**Classic presentation:** Single, painless, firm, round, indurated ulcer (chancre) at the site of inoculation. Clean base, raised edges.\n\n**Key features:**\n• Usually single — multiple chancres possible (especially HIV+)\n• Sites: penis, vulva, cervix, anus, mouth, fingers\n• Bilateral painless inguinal lymphadenopathy in ~70%\n• Heals spontaneously in 3-6 weeks even without treatment\n• Often unnoticed by patient (painless, may be in non-visible location)\n\n**Atypical:** Painful, multiple, or atypical-appearing lesions can occur"},{"heading":"Secondary Syphilis","body":"**Timing:** 4-10 weeks after chancre (which may still be present)\n\n**Rash:** Diffuse, symmetric, maculopapular. Red to red-brown, flat, scaly. Classically involves **palms and soles** (50-80%). Non-pruritic. Can be difficult to identify on darker skin.\n\n**Other findings:**\n• **Condylomata lata:** moist, flat, broad-based lesions in warm/moist areas — highly infectious\n• **Mucous patches:** painless, silvery-gray oral/genital erosions\n• **Moth-eaten alopecia:** patchy, non-scarring hair loss\n• **Malignant syphilis (lues maligna):** rare — cutaneous ulcers with central necrosis\n\n**Systemic:** fever, malaise, weight loss, lymphadenopathy, arthralgias, hepatitis, uveitis\n\nResolves in 3-12 weeks untreated → enters latent phase"},{"heading":"Latent Syphilis","body":"**Asymptomatic** — diagnosed by serologic testing only.\n\n**Early latent (< 1 year):** Documented seroconversion or exposure within 12 months. Still sexually transmissible — ~25% may relapse to secondary.\n\n**Late latent (> 1 year or unknown):** Not sexually transmissible (except vertical in pregnancy). Can progress to tertiary in ~30% untreated. If timing unknown → classified as late latent (conservative treatment)."},{"heading":"Tertiary Syphilis","body":"**Timing:** 3-15+ years after initial infection. Rare in developed countries.\n\n**Gummatous (~15%):** Granulomatous nodular lesions — skin, bone, liver, testes. Destructive but treatable.\n\n**Cardiovascular (~10%):** Aortitis, ascending aortic aneurysm, aortic regurgitation, coronary ostial stenosis. Typically 15-30 years post-infection.\n\n**Neurosyphilis:** Can occur at any stage. See [Neurosyphilis Evaluation](#/tree/neurosyphilis)."},{"heading":"Congenital Syphilis","body":"Vertical transmission from infected mother to fetus. Higher risk with primary/secondary syphilis in pregnancy but can occur at any stage.\n\n**Early congenital (< 2 years):** hepatosplenomegaly, rash, rhinitis (''snuffles''), pseudoparalysis, osteochondritis, anemia, low birthweight\n\n**Late congenital (> 2 years):** Hutchinson teeth, interstitial keratitis, eighth nerve deafness (Hutchinson triad), saber shins, saddle nose, frontal bossing\n\n12% higher risk for miscarriage, preterm labor, or stillbirth. ~40% of infected newborns are symptomatic at birth. [3]"}]'::jsonb,
 '[{"num":1,"text":"NYC DOHMH. Diagnosis, management, and prevention of syphilis. 2019."},{"num":3,"text":"Eppes CS, et al. Syphilis in pregnancy. Am J Obstet Gynecol. 2022;227(6):822-838."}]'::jsonb,
 false,
 1)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syph-testing-algorithm', 'Syphilis Testing Algorithms', 'Traditional vs Reverse Sequence',
 '[{"heading":"Traditional Algorithm (NTT First)","body":"1. **Screen with NTT** (RPR or VDRL)\n2. If reactive → **confirm with TT** (TP-PA, FTA-ABS)\n3. Both reactive → **active or past syphilis** — quantitative RPR for staging\n4. NTT reactive + TT nonreactive → **biologic false positive**\n\n**Advantages:** NTT provides quantitative titers for monitoring. Cost-effective screening.\n**Limitations:** May miss early primary (NTT not yet reactive) and late latent (NTT may revert)."},{"heading":"Reverse Sequence Algorithm (TT First)","body":"1. **Screen with TT** (EIA or CIA — automated, high-throughput)\n2. If reactive → **reflex NTT** (RPR)\n3. Both reactive → **active or past syphilis**\n4. TT reactive + NTT nonreactive → **confirm with second, different TT**\n   • Second TT reactive → prior treated or late latent\n   • Second TT nonreactive → likely false-positive initial TT\n\n**Advantages:** Higher sensitivity for early primary and late latent. Automated testing.\n**Limitations:** Cannot distinguish active from past infection with TT alone."},{"heading":"Serologic Timeline","body":"**Nontreponemal tests (RPR/VDRL):**\n• Become reactive 3-4 weeks after infection (1-2 weeks after chancre)\n• Peak during secondary syphilis\n• Decline after treatment (4-fold drop = cure)\n• May decline even without treatment in late disease\n• ~10% remain low-titer positive for life (serofast state)\n\n**Treponemal tests (TP-PA/FTA-ABS):**\n• Seroconvert slightly earlier than NTTs\n• Remain positive for **life** regardless of treatment\n• Cannot monitor treatment response\n\n**Window period:** Both tests may be nonreactive in up to **30%** of primary syphilis. If clinical suspicion is high and both negative → treat empirically and repeat in 2-4 weeks."},{"heading":"Key Pitfalls","body":"• **Prozone phenomenon:** Very high NTT titers in secondary syphilis can saturate the assay → false negative. Request diluted RPR if clinically suspected.\n• **BFP (biologic false positive):** NTT reactive + TT nonreactive. Causes: pregnancy, SLE, IVDU, HIV, vaccination, liver disease.\n• **Serofast state:** ~10% of treated patients maintain persistently low NTT titers despite adequate treatment.\n• **RPR vs VDRL:** Not interchangeable. RPR titers run slightly higher. Always compare same test type. [6]"}]'::jsonb,
 '[{"num":6,"text":"Papp JR, et al. CDC Laboratory Recommendations for Syphilis Testing, 2024. MMWR. 2024;73(1):1-32."}]'::jsonb,
 false,
 2)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syph-treatment-table', 'Syphilis Treatment Summary', 'By Stage With Drug Links',
 '[{"heading":"Primary / Secondary / Early Latent","body":"**First-line:** [Benzathine Penicillin G](#/drug/benzathine-penicillin/primary) 2.4 million units IM × **1 dose**\n\n**PCN allergy (non-pregnant):**\n• [Doxycycline](#/drug/doxycycline/primary) 100 mg PO BID × 14 days\n• [Ceftriaxone](#/drug/ceftriaxone/neurosyphilis) 1-2g IM/IV daily × 10-14 days (limited data)\n\n**Follow-up:** RPR at 6 and 12 months. Expect 4-fold titer decline."},{"heading":"Late Latent / Tertiary (Non-Neurologic)","body":"**First-line:** [Benzathine Penicillin G](#/drug/benzathine-penicillin/late latent) 2.4 million units IM weekly × **3 weeks** (total 7.2M units)\n\n• Missed dose > 14 days → restart 3-dose series\n• Rule out neurosyphilis before treating (especially if RPR ≥ 1:32 or HIV+)\n\n**PCN allergy (non-pregnant):**\n• [Doxycycline](#/drug/doxycycline/late latent) 100 mg PO BID × 28 days\n• Must exclude neurosyphilis first (doxycycline has poor CSF penetration)\n\n**Follow-up:** RPR at 6, 12, and 24 months."},{"heading":"Neurosyphilis / Ocular / Otic","body":"**First-line:** [Penicillin G IV](#/drug/penicillin-g-iv/neurosyphilis) 18-24 million units/day (3-4M units q4h) × 10-14 days\n\n**Alternative:** [Procaine Penicillin](#/drug/procaine-penicillin/neurosyphilis) 2.4M units IM daily + Probenecid 500mg PO QID × 10-14 days\n\n**PCN allergy:** [Ceftriaxone](#/drug/ceftriaxone/neurosyphilis) 2g IV daily × 10-14 days (limited data)\n\nSee [Neurosyphilis Evaluation](#/tree/neurosyphilis) for full workup.\n\n**Follow-up:** CSF re-examination at 6 months."},{"heading":"Pregnancy (Any Stage)","body":"**Penicillin is the ONLY acceptable treatment.**\n\nSame dosing as non-pregnant by stage. If PCN-allergic → **desensitization is mandatory** (no alternatives proven for congenital syphilis prevention).\n\nMonitor for Jarisch-Herxheimer reaction with fetal monitoring × 24h if viable gestational age.\n\nInadequate for preventing congenital syphilis:\n• Non-penicillin regimen used\n• Treatment < 30 days before delivery\n• No documented 4-fold titer decline"},{"heading":"Doxycycline Post-Exposure Prophylaxis (DoxyPEP)","body":"**Emerging evidence (not yet standard practice):**\n\nSingle 200mg oral doxycycline dose within 72 hours (preferably 24 hours) of unprotected intercourse reduced syphilis by 87% in the DoxyPEP trial (MSM and transgender women). [42][43]\n\nFurther research needed before becoming standard recommendation."}]'::jsonb,
 '[{"num":5,"text":"Hazra A, et al. CDC STI Treatment Guidelines, 2021. JAMA. 2022;327(9):870-871."},{"num":42,"text":"Luetkemeyer AF, et al. Postexposure doxycycline to prevent bacterial STIs. N Engl J Med. 2023;388(14):1296-1306."},{"num":43,"text":"Molina JM, et al. Doxycycline PEP in MSM. Lancet Infect Dis. 2018;18(3):308-317."}]'::jsonb,
 false,
 3)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syph-jarisch-herxheimer', 'Jarisch-Herxheimer Reaction', 'Treatment-Related Immune Response',
 '[{"heading":"Mechanism","body":"Acute febrile reaction caused by **cytokine release from dying spirochetes** after treatment initiation. This is NOT an allergic reaction — it is an inflammatory immune response to treatment.\n\nDo NOT withhold future doses of treatment."},{"heading":"Incidence by Stage","body":"• **Primary syphilis:** 10-35%\n• **Secondary syphilis:** 75-90%\n• **Late/latent syphilis:** uncommon but possible\n\nMore common with higher spirochete burden."},{"heading":"Clinical Features","body":"**Timing:** Onset 2-8 hours after treatment, resolves within 24 hours.\n\n**Symptoms:**\n• Fever, rigors, chills\n• Headache, myalgias, arthralgias\n• Tachycardia, mild hypotension\n• Flushing, worsening of existing rash\n\n**Treatment:** Supportive care only\n• Antipyretics (acetaminophen, NSAIDs)\n• Oral fluids\n• Rest\n• Reassurance — self-limited"},{"heading":"Pregnancy Considerations","body":"Jarisch-Herxheimer reaction can precipitate:\n• **Preterm contractions** and labor\n• **Fetal distress** (variable decelerations)\n• Rarely, fetal demise\n\n**Management:**\n• Continuous fetal monitoring × 24 hours if viable gestational age\n• OB consultation before or immediately after treatment\n• **Should NOT prevent or delay treatment** — untreated syphilis poses greater risk to fetus\n\nTreatment earlier in pregnancy (especially first trimester) is associated with better fetal outcomes and lower Jarisch-Herxheimer severity."}]'::jsonb,
 '[{"num":1,"text":"NYC DOHMH. Diagnosis, management, and prevention of syphilis. 2019."}]'::jsonb,
 false,
 4)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syph-partner-notification', 'Partner Notification & Reporting', 'Public Health Requirements',
 '[{"heading":"Mandatory Reporting","body":"Syphilis is a **reportable sexually transmitted infection in all 50 US states**.\n\nAll positive cases must be reported to the state or local public health department.\n\nProvide accurate patient contact information — public health agencies conduct partner notification and facilitate treatment."},{"heading":"Contact Tracing Windows","body":"Evaluate and test sexual partners within these exposure windows:\n\n• **Primary syphilis:** 3 months + symptom duration\n• **Secondary syphilis:** 6 months + symptom duration\n• **Early latent:** 1 year\n\n**Presumptive treatment:** Partners exposed within 90 days should be treated presumptively, even if seronegative (may be in window period).\n\n**Partners exposed > 90 days ago:** Test and treat based on results."},{"heading":"Patient Counseling","body":"**During treatment:**\n• Avoid all sexual contact until **7 days after treatment** AND until all lesions have fully resolved\n• Syphilis lesions are infectious — any skin contact can spread the disease\n\n**Prevention:**\n• Consistent condom use reduces transmission risk (but does not eliminate it — lesions outside the condom area can transmit)\n• Regular STI screening for high-risk individuals\n• Monogamous sexual relationships lower risk\n• If on PrEP for HIV: test for syphilis at least every 6 months\n\n**Follow-up:**\n• Return for RPR testing at 6, 12, and 24 months\n• Return immediately if new symptoms develop (vision changes, hearing changes, neurologic symptoms, new rash or lesion)\n\n**Jarisch-Herxheimer reaction:** Fever, body aches, and worsening rash may occur within 24 hours of treatment. This is expected and self-limited. Take acetaminophen for comfort. Seek care if symptoms are severe."}]'::jsonb,
 '[{"num":5,"text":"Hazra A, et al. CDC STI Treatment Guidelines, 2021. JAMA. 2022;327(9):870-871."}]'::jsonb,
 true,
 5)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syph-congenital', 'Congenital Syphilis', 'Prevention, Recognition, and Consequences',
 '[{"heading":"Epidemiology","body":"Congenital syphilis cases in the US have increased **755% from 2012 to 2022** (from ~335 to 3,761 cases), with **282 stillbirths and infant deaths** in 2022 alone. [3][4]\n\nThis increase mirrors rising syphilis rates among reproductive-age women and reflects gaps in prenatal screening and treatment."},{"heading":"Risk of Transmission","body":"• **Primary/secondary syphilis in pregnancy:** highest vertical transmission risk (60-100%)\n• **Early latent:** moderate risk (40%)\n• **Late latent:** lower but still present (10%)\n\nRisk is reduced by:\n• Treatment before or early in pregnancy (ideally first trimester — 0% congenital syphilis if treated in first trimester in a Chinese cohort of 682 patients) [11]\n• Treatment ≥ 30 days before delivery\n• Documented 4-fold titer decline after treatment"},{"heading":"Early Congenital Syphilis (< 2 years)","body":"Approximately **40% of infected newborns are symptomatic at birth.**\n\n**Clinical findings:**\n• Hepatosplenomegaly\n• Diffuse rash, desquamation\n• Rhinitis (''snuffles'') — bloody/mucoid nasal discharge\n• Pseudoparalysis of Parrot (painful limb immobility from osteochondritis)\n• Anemia, thrombocytopenia\n• Low birthweight, failure to thrive\n• Jaundice, nephrotic syndrome\n\n**Neurologic:** Seizures, cranial nerve deficits, hearing loss, blindness"},{"heading":"Late Congenital Syphilis (> 2 years)","body":"**Hutchinson Triad:**\n1. **Hutchinson teeth** — smaller, widely spaced teeth with notching along biting surface\n2. **Interstitial keratitis** — corneal inflammation causing pain, photophobia, vision loss\n3. **Eighth nerve deafness** — sensorineural hearing loss\n\n**Other findings:**\n• **Saber shins** — anterior tibial bowing from periostitis\n• **Saddle nose** — nasal bridge collapse from cartilage destruction\n• **Frontal bossing** — prominent forehead\n• **Clutton joints** — painless bilateral knee effusions\n• **Mulberry molars** — defective first molars"},{"heading":"Prevention","body":"**Screen ALL pregnant women:**\n• First prenatal visit\n• Third trimester (28 weeks)\n• At delivery (in high-prevalence areas)\n\n**Treatment:** Penicillin is the ONLY acceptable treatment in pregnancy. Desensitize if allergic.\n\n**Inadequate treatment (infant at risk):**\n• Mother received non-penicillin regimen\n• Treatment completed < 30 days before delivery\n• No documented 4-fold titer decline\n• No treatment during pregnancy\n\n**Newborn treatment:** Aqueous crystalline penicillin G 50,000 units/kg IV q12h (< 7 days old) or q8h (> 7 days) × 10 days."}]'::jsonb,
 '[{"num":3,"text":"Eppes CS, et al. Syphilis in pregnancy. Am J Obstet Gynecol. 2022;227(6):822-838."},{"num":4,"text":"CDC. STI Surveillance, 2024 (provisional). 2025."},{"num":11,"text":"Wan Z, et al. Maternal syphilis treatment and pregnancy outcomes. BMC Pregnancy Childbirth. 2020;20(1):648."}]'::jsonb,
 false,
 6)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('syph-genital-ddx', 'Differential Diagnosis of Genital Lesions', 'Syphilis vs Other Causes',
 '[{"heading":"Infectious Causes","body":"**Syphilis (T. pallidum):**\n• Painless, firm, indurated ulcer (chancre)\n• Usually single, clean base\n• Bilateral painless lymphadenopathy\n• Heals in 3-6 weeks\n\n**Herpes Simplex (HSV-1/2):**\n• **Painful**, grouped vesicles on erythematous base\n• May coalesce into shallow ulcers\n• Recurrent episodes common\n• Tender inguinal lymphadenopathy\n\n**Chancroid (H. ducreyi):**\n• **Painful**, ragged, undermined ulcer with purulent base\n• Soft, non-indurated edges\n• Unilateral tender inguinal bubo (may suppurate)\n• Rare in US\n\n**Lymphogranuloma Venereum (Chlamydia L1-L3):**\n• Small painless papule/ulcer (often unnoticed) → heals\n• Followed by painful unilateral inguinal/femoral lymphadenopathy (2-6 weeks later)\n• ''Groove sign'' — enlarged nodes above and below inguinal ligament\n\n**Granuloma Inguinale (Donovanosis):**\n• Painless, progressive, beefy-red granulomatous ulcer\n• Bleeds easily on contact\n• Rare in US"},{"heading":"Non-Infectious Causes","body":"**Fixed drug eruption:**\n• Recurrent, well-demarcated round lesion in same location\n• Often related to NSAIDs, tetracyclines, sulfonamides\n\n**Behçet disease:**\n• Recurrent painful oral AND genital ulcers\n• Associated with uveitis, skin lesions, pathergy\n\n**Traumatic ulcer:**\n• History of trauma, friction, or sexual activity\n• Irregular borders, painful\n\n**Squamous cell carcinoma:**\n• Persistent, non-healing ulcer or nodule\n• Irregular borders, induration\n• Risk factors: HPV, immunosuppression\n• Biopsy indicated for non-healing lesions > 4 weeks"},{"heading":"Clinical Pearl","body":"**When in doubt, test for syphilis.** The chancre of primary syphilis is painless and often missed. Consider syphilis testing in ANY sexually active patient with a genital lesion, especially in high-risk populations (MSM, HIV+, PrEP users).\n\nMultiple STIs can coexist — always test for HIV, GC/CT, and syphilis together."}]'::jsonb,
 '[{"num":1,"text":"NYC DOHMH. Diagnosis, management, and prevention of syphilis. 2019."}]'::jsonb,
 false,
 7)
;

COMMIT;
