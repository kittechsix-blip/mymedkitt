-- =====================================================================
-- MedKitt — Sickle Cell Disease Consult: Supabase INSERT Statements
-- Generated: 2026-03-23
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'sickle-cell',
  'Sickle Cell Disease',
  'VOC Pain → Fever → ACS → Stroke → Splenic Sequestration → SCT',
  '1.0',
  33,
  'scd-start',
  '["Presentation & Triage","VOC Pain Management","Acute Febrile Illness","Acute Chest Syndrome","Stroke & Splenic Sequestration","SCT & Special Populations"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('heme-onc', 'sickle-cell', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('pediatrics', 'sickle-cell', NULL, NULL, NULL, 1)
ON CONFLICT (category_id, tree_id) DO UPDATE SET
  display_title = EXCLUDED.display_title,
  display_subtitle = EXCLUDED.display_subtitle,
  entry_node_id = EXCLUDED.entry_node_id,
  sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (22 citations)
DELETE FROM tree_citations WHERE tree_id = 'sickle-cell';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('sickle-cell', 1, 'Jackson KM, Beamon B, Crawford EB, Burroughs ZT. Emergency Department Management of Acute Pediatric Sickle Cell Disease Complications. Pediatr Emerg Med Pract. 2024;21(11):1-28.'),
('sickle-cell', 2, 'Piel FB, Rees DC, DeBaun MR, et al. Defining global strategies to improve outcomes in sickle cell disease: a Lancet Haematology Commission. Lancet Haematol. 2023;10(8):e633-e686. DOI: 10.1016/S2352-3026(23)00096-0'),
('sickle-cell', 3, 'Kavanagh PL, Fasipe TA, Wun T. Sickle cell disease: a review. JAMA. 2022;328(1):57-68. DOI: 10.1001/jama.2022.10233'),
('sickle-cell', 4, 'National Heart, Lung, and Blood Institute. Evidence-Based Management of Sickle Cell Disease: Expert Panel Report. 2014.'),
('sickle-cell', 5, 'Brandow AM, Carroll CP, Creary S, et al. American Society of Hematology 2020 guidelines for sickle cell disease: management of acute and chronic pain. Blood Adv. 2020;4(12):2656-2701. DOI: 10.1182/bloodadvances.2020001851'),
('sickle-cell', 6, 'DeBaun MR, Jordan LC, King AA, et al. American Society of Hematology 2020 guidelines for sickle cell disease: prevention, diagnosis, and treatment of cerebrovascular disease in children and adults. Blood Adv. 2020;4(8):1554-1588. DOI: 10.1182/asheducation-2011.1.427'),
('sickle-cell', 7, 'Fein DM, Avner JR, Scharbach K, et al. Intranasal fentanyl for initial treatment of vaso-occlusive crisis in sickle cell disease. Pediatr Blood Cancer. 2017;64(6). (Randomized, double-blind, placebo-controlled trial; 49 patients)'),
('sickle-cell', 8, 'Dunlop RJ, Bennett KC. Pain management for sickle cell disease. Cochrane Database Syst Rev. 2006(2):CD003350. (Cochrane review; 9 randomized controlled trials)'),
('sickle-cell', 9, 'Wachnik AA, Welch-Coltrane JL, Adams MCB, et al. A standardized emergency department order set decreases admission rates and in-patient length of stay for adults patients with sickle cell disease. Pain Med. 2022;23(12):2050-2060.'),
('sickle-cell', 10, 'Hagedorn JM, Monico EC. Ketamine infusion for pain control in acute pediatric sickle cell painful crises. Pediatr Emerg Care. 2019;35(1):78-79.'),
('sickle-cell', 11, 'Rineer S, Walsh PS, Smart LR, et al. Risk of bacteremia in febrile children and young adults with sickle cell disease in a multicenter emergency department cohort. JAMA Netw Open. 2023;6(6):e2318904. (Retrospective; 1118 patients)'),
('sickle-cell', 12, 'Baskin MN, Goh XL, Heeney MM, Harper MB. Bacteremia risk and outpatient management of febrile patients with sickle cell disease. Pediatrics. 2013;131(6):1035-1041. (Retrospective cohort study; 1118 febrile episodes)'),
('sickle-cell', 13, 'Sirigaddi K, Aban I, Jantz A, et al. Outcomes of febrile events in pediatric patients with sickle cell anemia. Pediatr Blood Cancer. 2018;65(11):e27379. (Retrospective study; 427 patients)'),
('sickle-cell', 14, 'DeBaun MR, Strunk RC. The intersection between asthma and acute chest syndrome in children with sickle-cell anaemia. Lancet. 2016;387(10037):2545-2553.'),
('sickle-cell', 15, 'Crabtree EA, Mariscalco MM, Hesselgrave J, et al. Improving care for children with sickle cell disease/acute chest syndrome. Pediatrics. 2011;127(2):e480-e488. (Quality improvement project; 139 patients)'),
('sickle-cell', 16, 'Dolatkhah R, Dastgiri S. Blood transfusions for treating acute chest syndrome in people with sickle cell disease. Cochrane Database Syst Rev. 2020;1(1):CD007843. (Cochrane review; 1 trial, 237 patients)'),
('sickle-cell', 17, 'Yawn BP, John-Sowah J. Management of sickle cell disease: recommendations from the 2014 expert panel report. Am Fam Physician. 2015;92(12):1069-1076.'),
('sickle-cell', 18, 'Kane I, Kumar A, Atalla E, et al. Splenic sequestration crisis. StatPearls. 2024.'),
('sickle-cell', 19, 'Kark JA, Posey DM, Schumacher HR, et al. Sickle-cell trait as a risk factor for sudden death in physical training. N Engl J Med. 1987;317(13):781-787. (Retrospective observational study; 2 million patients)'),
('sickle-cell', 20, 'Nelson DA, Deuster PA, Carter R 3rd, et al. Sickle cell trait, rhabdomyolysis, and mortality among U.S. Army soldiers. N Engl J Med. 2016;375(5):435-442.'),
('sickle-cell', 21, 'Alappan N, Marak CP, Chopra A, et al. Renal medullary cancer in a patient with sickle cell trait. Case Rep Oncol Med. 2013;2013:129813.'),
('sickle-cell', 22, 'Glassberg JA, Tanabe P, Chow A, et al. Emergency provider analgesic practices and attitudes toward patients with sickle cell disease. Ann Emerg Med. 2013;62(4):293-302.');

DELETE FROM decision_nodes WHERE tree_id = 'sickle-cell';

-- 4. decision_nodes (31 nodes)

-- MODULE 1: PRESENTATION & TRIAGE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-start', 'sickle-cell', 'question', 1,
 'Sickle Cell Disease — ED Management',
 '[SCD Steps Summary](#/info/scd-steps-summary)

Sickle cell disease (SCD) affects ~100,000 Americans. Occurs in ~1 of 365 Black/African American births and ~1 of 16,300 Hispanic American births. [1][2]

Multiple acute complications can affect any organ system. Prompt recognition and management reduces morbidity and mortality. [1][3]

[SCD Genotypes & Severity](#/info/scd-genotypes)

**Key History to Obtain:**
• SCD genotype (HbSS, HbSC, HbSβ0, HbSβ+)
• Baseline hemoglobin (HbSS: 6–8 g/dL, HbSC: 10–15 g/dL)
• Prior complications (ACS, stroke, splenic sequestration)
• Individualized pain plan from hematologist
• Immunization status (PCV, meningococcal) + penicillin prophylaxis
• Hydroxyurea use, last transfusion, last HbS%
• Pregnancy status',
 '[1,2,3]'::jsonb, '[{"label":"Pain Crisis (VOC)","description":"Most common SCD ED presentation","next":"scd-voc-start"},{"label":"Fever ≥ 38.5°C","description":"Medical emergency — functional asplenia","next":"scd-fever-start","urgency":"urgent"},{"label":"Respiratory / Chest Pain","description":"Evaluate for acute chest syndrome","next":"scd-acs-start","urgency":"urgent"},{"label":"Neurologic Symptoms","description":"Focal deficit, altered mental status, seizure","next":"scd-stroke-start","urgency":"critical"},{"label":"Abdominal Distension / Pallor","description":"Splenic sequestration — life-threatening","next":"scd-splenic-start","urgency":"critical"},{"label":"Priapism","description":"Urologic emergency — cross-link to Priapism consult","next":"scd-priapism-route"},{"label":"Exertional Collapse (Sickle Trait)","description":"ECAST, rhabdomyolysis, renal complications","next":"scd-sct-start"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"scd-triage","label":"SCD Triage Calculator"}]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-history', 'sickle-cell', 'info', 1,
 'Key History & Baseline Assessment',
 '**SCD Genotype & Severity:**
• **HbSS** — most severe, baseline Hgb 6–8 g/dL
• **HbSβ0-thalassemia** — similar severity to HbSS
• **HbSC** — moderate severity, baseline Hgb 10–15 g/dL
• **HbSβ+-thalassemia** — moderate, baseline Hgb 9–12 g/dL
• **HbAS (Sickle Cell Trait)** — generally benign carrier state

[SCD Genotypes & Severity](#/info/scd-genotypes)

**Critical History Elements:**
• Prior complications (ACS, stroke, splenic sequestration, priapism)
• Individualized pain plan from hematologist
• Baseline hemoglobin and reticulocyte count
• Immunization status — PCV15/PCV20/PPSV23, meningococcal
• Penicillin prophylaxis compliance (recommended through age 5) [4]
• Hydroxyurea use
• Last transfusion date and last known HbS%
• Pregnancy status
• Home pain medication regimen and last dose [5]',
 '[1,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-start', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-priapism-route', 'sickle-cell', 'result', 1,
 'Priapism in SCD',
 '**Priapism** affects ~40% of males with SCD. [1]

Intervention should occur within **4 hours** of erection duration to prevent permanent scarring and erectile dysfunction.

**Initial Management:**
• IV hydration
• Analgesia (per VOC pathway)
• Supplemental oxygen
• Oral pseudoephedrine 30–60 mg may be considered [1]
• Ketamine at procedural sedation doses has been shown to assist with corporal detumescence [1]

**Definitive Management:**
[Priapism Management](#/tree/priapism) — full aspiration, irrigation, and phenylephrine injection protocol

Emergent urology consultation for definitive management.',
 '[1,21]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Initiate IV hydration, analgesia, and O2. If >4 hours duration, proceed to corporal aspiration per Priapism consult. Emergent urology consultation.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 2)
;


-- MODULE 2: VOC PAIN MANAGEMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-voc-start', 'sickle-cell', 'info', 2,
 'Vaso-Occlusive Crisis (VOC)',
 '[VOC Pain Management Algorithm](#/info/scd-voc-algorithm)
[Differential Diagnosis](#/info/scd-differential)

VOC is the **most common SCD complication** and leading cause of ED visits (~40,000 annual pediatric ED visits in the US). [1][3]

**Pathophysiology:** HbS polymerization → sickled RBC → microvascular occlusion → tissue ischemia and infarction. [1]

**Common Triggers:**
• Dehydration
• Infection / fever
• Cold exposure / weather changes
• Hypoxia / acidosis
• Physical or emotional stress
• Air pollution

**Diagnosis is CLINICAL** — no biomarkers or imaging validate pain severity. Patient report is the criterion standard. [1][4][5]

**Differential Diagnosis:**
• Osteomyelitis (Salmonella, S. aureus)
• Avascular necrosis (femoral/humeral head)
• Septic arthritis
• Appendicitis, cholecystitis
• Dactylitis (hand-foot syndrome in age <2 yr)

**Check for individualized pain plan** from hematologist — 24% decrease in admission rates when used. [9]',
 '[1,3,4,5,9]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-voc-triage', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-voc-triage', 'sickle-cell', 'info', 2,
 'Triage — Intranasal Fentanyl',
 '**GOAL: Analgesia within 30 minutes of triage, 60 minutes of ED arrival.** [4]

**Intranasal Fentanyl at Triage (before IV access):**
[Fentanyl](#/drug/fentanyl/scd pain triage) 1–1.5 mcg/kg IN via MAD atomizer (max 100 mcg)
• Onset 5–10 min
• Shortens ED length of stay [7]
• Administer BEFORE establishing IV access

**Triage Actions:**
• Place PIV / access port
• Obtain labs: CBC, reticulocyte count, CMP
• Urine HCG (females >10 years)
• If ill-appearing: T&S, Hgb electrophoresis (STAT)
• If febrile: use SCD Fever pathway concurrently
• If chest pain with hypoxia or fever: concurrent ACS evaluation

**Supportive Measures:**
• Heat packs to painful sites
• Continuous pulse oximetry
• Offer opioid premeds if ordered (e.g., PO diphenhydramine)

**Triage Questions:**
• History of acute chest syndrome?
• Last pain crisis?
• Current fever, cough, chest pain?
• Does patient have an individualized pain plan?',
 '[4,5,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-voc-iv', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-voc-iv', 'sickle-cell', 'info', 2,
 'IV Analgesia & Fluids',
 '**NSAID (administer with first opioid dose):**
[Ketorolac](#/drug/ketorolac/scd pain crisis) 0.5 mg/kg IV
• Max 15 mg if <16 years, max 30 mg if ≥16 years
• Reduces opioid requirements [8]
• **Contraindications:** pregnancy, renal impairment, ketorolac within 5 days, ibuprofen within 6 hours, bleeding concerns, history of renal impairment

**Opioid (choose one based on patient preference/pain plan):**
[Morphine](#/drug/morphine/scd pain crisis) 0.1–0.2 mg/kg IV (max 8 mg)
OR
[Hydromorphone](#/drug/hydromorphone/scd pain crisis) 0.015–0.02 mg/kg IV (max 1 mg)
OR
[Fentanyl](#/drug/fentanyl/scd pain crisis iv) 2 mcg/kg IV (max 100 mcg)

If unable to obtain IV: Oxycodone 0.1 mg/kg PO (max 10 mg)

**IV Fluids:**
• NS 10 mL/kg bolus (max 1L) over 60 minutes
• If concern for dehydration: 20 mL/kg bolus (max 1L)
• Then start 1× maintenance IVF
• **Avoid overhydration** — can worsen ACS [4][19]

**Incentive Spirometry:**
Start in ED — shown to **prevent development of ACS** during hospitalization. [1]

**AVOID corticosteroids** — risk of rebound pain, stroke, and other complications. [4][5]',
 '[1,4,5,8,19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-voc-reassess', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-voc-reassess', 'sickle-cell', 'question', 2,
 'Reassess Pain (q30 min)',
 '**RN reassess pain 30 minutes after each opioid dose.** [4][5]

• May give up to **3 doses** of opioid
• Wake patient to reassess even if sleeping
• Notify provider before each additional dose
• Continue incentive spirometry

**Monitor for:**
• Respiratory depression (SpO2, respiratory rate)
• Sedation level
• Developing fever, chest pain, or dyspnea (→ ACS)',
 '[4,5,9]'::jsonb, '[{"label":"Pain Improved — Tolerating PO","description":"Pain controlled, able to eat/drink","next":"scd-voc-discharge"},{"label":"Pain Persists After 2–3 Doses","description":"Refractory to standard analgesia","next":"scd-voc-refractory"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-voc-refractory', 'sickle-cell', 'info', 2,
 'Refractory Pain',
 '**Sub-dissociative Ketamine (ASH-recommended adjunct):** [5]
[Ketamine](#/drug/ketamine/scd adjunct) 0.1–0.3 mg/kg IV over 10–15 min
• Reduces opioid consumption in pediatric SCD patients [10]
• May repeat q15–20 min PRN
• ACEP supports use for SCD pain

**Additional Steps:**
• Contact hematology for pain plan guidance
• Consider patient-controlled analgesia (PCA) if admitting
• Review for other diagnoses: osteomyelitis, avascular necrosis, compartment syndrome

**Evaluate for Developing ACS:**
• Obtain CXR if ANY respiratory symptoms develop
• New infiltrate + fever/resp symptoms = ACS → proceed to ACS pathway
• ACS develops in first 3–4 days of hospitalization in up to 10–20% of VOC admissions',
 '[5,10]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-voc-admit', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-voc-discharge', 'sickle-cell', 'result', 2,
 'VOC — Discharge',
 '**Discharge Criteria:**
• Pain controlled with oral medications
• Tolerating oral fluids
• Afebrile
• Stable hemoglobin
• Reliable caregivers

**Discharge Plan:**
• Continue home pain regimen (scheduled NSAID + PRN opioid)
• Refill home pain medications for 2–3 day supply if needed
• Hematology follow-up within 24–48 hours
• Continue incentive spirometry at home

**Return Precautions:**
• Fever ≥ 38.5°C (101.3°F)
• Worsening or new pain
• Shortness of breath or chest pain
• Weakness, pallor, or dizziness
• Abdominal swelling

**ED → Page hematology before discharge for follow-up plan.** [4]',
 '[1,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Discharge with oral pain regimen. Hematology follow-up within 24–48 hours. Return for fever, worsening pain, SOB, or chest pain.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 8)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-voc-admit', 'sickle-cell', 'result', 2,
 'VOC — Admission',
 '**Admission Criteria:**
• Pain not controlled after 3 opioid doses in ED
• New respiratory symptoms (evaluate for ACS)
• Unable to tolerate oral fluids/medications
• Hemodynamic instability
• Significant hemoglobin decline from baseline

**Inpatient Management:**
• PCA morphine or hydromorphone
• Scheduled NSAIDs + PRN opioids (multimodal)
• Incentive spirometry q2h while awake
• Maintenance IV fluids (avoid overhydration)
• Hematology consult

**Monitor for ACS:**
• ACS is most common during first 3–4 days of admission
• Daily assessment for fever, cough, hypoxia, chest pain
• Low threshold for CXR if symptoms develop',
 '[1,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit for IV PCA, multimodal analgesia, incentive spirometry. Hematology consult. Monitor for ACS development.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 9)
;


-- MODULE 3: ACUTE FEBRILE ILLNESS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-fever-start', 'sickle-cell', 'info', 3,
 'Fever — Medical Emergency',
 '[Fever Evaluation Algorithm](#/info/scd-fever-eval)

**Fever ≥ 38.5°C (101.3°F) in SCD = MEDICAL EMERGENCY** [4]

**Why fever is dangerous in SCD:**
• Functional asplenia develops by 3 months of age
• Impaired clearance of encapsulated organisms
• Risk for overwhelming sepsis and death

**Most Likely Pathogens:**
• **Streptococcus pneumoniae** (most common)
• Haemophilus influenzae
• Neisseria meningitidis
• Salmonella species (osteomyelitis)
• Mycoplasma and atypical bacteria

**Historical Context:**
• Pre-PCV/penicillin prophylaxis: bacteremia risk 15–20%
• Post-PCV + penicillin prophylaxis: bacteremia risk ~1.1% [11]
• PCV7 vaccine reduced invasive pneumococcal disease by 90% [1]

**NHLBI: Administer antibiotics within 1 hour of presentation** [4]

**Caution:** Scheduled acetaminophen/ibuprofen can mask fever — evaluate as if febrile if on scheduled antipyretics with infectious symptoms. [1]',
 '[1,4,11]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-fever-workup', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-fever-workup', 'sickle-cell', 'info', 3,
 'Fever — Workup',
 '**Obtain BEFORE antibiotics:**
• Blood culture (ALWAYS — regardless of how well the patient appears) [1][4]

**Laboratory Studies:**
• CBC with differential + reticulocyte count
• CMP (comprehensive metabolic panel)
• Urinalysis if UTI concern

**Imaging:**
• **CXR if ANY respiratory symptoms** (cough, chest pain, hypoxia, tachypnea) — evaluate for ACS [1]

**Additional Assessment:**
• Vaccination status — PCV15/PCV20, PPSV23, meningococcal
• Penicillin prophylaxis compliance
• Central line → increased bacteremia risk
• History of splenectomy → increased bacteremia risk

**Viral Testing:**
• Comprehensive viral testing is optional
• A **positive viral test does NOT exclude bacteremia** in SCD [1]

**Age <60 days:**
• Full sepsis workup per AAP 2021 guidelines [1][13]',
 '[1,4,11,12]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-fever-abx', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-fever-abx', 'sickle-cell', 'question', 3,
 'Empiric Antibiotics',
 '**GIVE IMMEDIATELY after blood cultures:** [4]

[Ceftriaxone](#/drug/ceftriaxone/scd febrile illness) 50 mg/kg IV (max 2 g)

Covers: S. pneumoniae, H. influenzae, N. meningitidis, most Salmonella [1]

Is there concern for meningitis?',
 '[1,4]'::jsonb, '[{"label":"Meningitis Concern","description":"Meningeal signs, altered mental status, ill-appearing, bulging fontanelle","next":"scd-fever-meningitis","urgency":"urgent"},{"label":"No Meningeal Signs","description":"Well-appearing after antibiotics, no focal infection requiring expanded coverage","next":"scd-fever-disposition"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-fever-meningitis', 'sickle-cell', 'info', 3,
 'Meningitis Coverage',
 '**Meningitic Antibiotic Dosing:**
[Ceftriaxone](#/drug/ceftriaxone/scd meningitis) 100 mg/kg IV (max 2 g) — meningitic dose
PLUS
[Vancomycin](#/drug/vancomycin/scd meningitis) 20 mg/kg IV (max 1500 mg)

The increased ceftriaxone dose ensures adequate CNS penetration. Vancomycin covers resistant pneumococcus and MRSA. [1][4]

**Age <60 Days:**
Full sepsis workup per AAP 2021 guidelines required:
[Peds Fever < 6 Months](#/tree/peds-fever)

**Parvovirus B19 / Aplastic Crisis:**
• 80% of SCD patients infected with parvovirus B19 develop transient red cell aplasia (TRCA) [1]
• Reticulocyte count <1% + Hgb drop >30% from baseline
• Self-limited over 7–10 days
• May need simple blood transfusion or IVIG [1]
• DDx for profound anemia with low reticulocyte count',
 '[1,4,13]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-fever-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-fever-disposition', 'sickle-cell', 'result', 3,
 'Fever — Disposition',
 '**Safe to Discharge:** [4][12]
• Well-appearing after observation
• Reliable caregivers
• Hematology follow-up confirmed within 24 hours
• Completed pneumococcal vaccine series
• No focal bacterial infection requiring IV antibiotics
• Parenteral antibiotics given in ED

**Must Admit:** [4]
• Ill-appearing
• WBC >30,000 or <5,000 /mcL [13]
• Hypotensive for age
• Continued fever despite antibiotics
• CXR infiltrate (→ ACS pathway)
• Age <60 days
• Unable to ensure 24-hour follow-up
• Unvaccinated — consider lower threshold for admission [1]

**Always:** Page hematology before discharge.

**Follow-up of blood cultures** must be ensured — either via outpatient hematology or inpatient observation. [4]',
 '[1,4,12,13]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Well-appearing, vaccinated patients may be discharged after parenteral antibiotics with confirmed 24-hour hematology follow-up. Admit ill-appearing patients, those with abnormal WBC, hemodynamic instability, or CXR infiltrate.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 14)
;


-- MODULE 4: ACUTE CHEST SYNDROME
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-acs-start', 'sickle-cell', 'info', 4,
 'Acute Chest Syndrome (ACS)',
 '[ACS Recognition & Management](#/info/scd-acs-guide)

**Definition:** New radiodensity on chest imaging WITH fever and/or respiratory symptoms [1]

**ACS accounts for up to 25% of SCD-related deaths.** [1]

**Common Triggers:**
• Infection — S. pneumoniae, Mycoplasma, Chlamydia, viral
• Fat embolism from bone marrow infarction
• In situ sickling
• Pulmonary infarction from VOC

**Clinical Presentation:**
• Chest pain, cough, dyspnea, tachypnea
• Fever
• Hypoxemia (may be absent initially)
• Decreased breath sounds, crackles

**Critical Points:**
• Asthma is a common comorbidity AND trigger for ACS [14]
• Asthma exacerbation does NOT exclude ACS
• V/Q mismatch → predisposes to ACS development
• CXR infiltrate may lag behind clinical symptoms
• In older teens with SCD, consider MI with acute chest pain [5]

**Prior ACS episodes should raise index of suspicion.**',
 '[1,5,14,15]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-acs-treatment', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-acs-treatment', 'sickle-cell', 'info', 4,
 'ACS — Treatment',
 '**Antibiotics (cover typical + atypical):**
[Ceftriaxone](#/drug/ceftriaxone/scd febrile illness) 50 mg/kg IV (max 2 g)
PLUS
[Azithromycin](#/drug/azithromycin/scd acs) 10 mg/kg IV (max 500 mg)

**Oxygen Management:**
• Supplemental O2 **ONLY for SpO2 <90%** [1]
• Higher O2 in non-hypoxic patients blunts bone marrow response to RBC breakdown
• Target SpO2 ≥ 92%

**Respiratory Support:**
• **Incentive spirometry q2h while awake** — proven to prevent ACS progression [1]
• Bronchodilators PRN for wheezing component

**Pain Management:**
• Per VOC pathway — adequate analgesia reduces splinting and atelectasis

**AVOID Corticosteroids:**
• Can cause rebound pain
• Associated with stroke risk [5]
• Use ONLY if concurrent bronchospasm component, and with extreme caution',
 '[1,4,5,15]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-acs-transfusion', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-acs-transfusion', 'sickle-cell', 'question', 4,
 'ACS — Transfusion Decision',
 '[Transfusion Guidelines](#/info/scd-transfusion)

**Simple Transfusion Indications:** [4]
• Hgb drops >1 g/dL below baseline
• Goal: decrease HbS to <30%

**Transfusion Targets:**
• Hgb ~10 g/dL
• HbS <30%
• Do NOT exceed Hgb 11 g/dL (hyperviscosity risk)

What is the patient''s clinical trajectory?',
 '[1,4,16]'::jsonb, '[{"label":"Stable — Responding to Treatment","description":"Simple transfusion adequate, improving respiratory status","next":"scd-acs-admit"},{"label":"Worsening Despite Treatment","description":"Progressive hypoxia, worsening infiltrates, declining status","next":"scd-acs-exchange","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-acs-exchange', 'sickle-cell', 'info', 4,
 'ACS — Exchange Transfusion',
 '**Exchange Transfusion Indications:** [4]
• Worsening respiratory distress despite O2
• Worsening hypoxia while on supplemental oxygen
• Progressive pulmonary infiltrates on CXR
• Worsening anemia after simple transfusion
• Multilobar disease
• Rapid clinical deterioration

**Targets:**
• HbS <30%
• Hgb ~10 g/dL (avoid >11 g/dL)

**Contact blood bank EARLY:**
• Extended antigen matching required (anti-C, E, Kell)
• Sickle-negative units
• Exchange transfusion is resource-intensive — notify early

**Severity Data:**
• ~20% of ACS patients require ICU admission [1]
• ~10% require mechanical ventilation [1]
• 1–3% of pediatric ACS episodes are fatal [1]',
 '[1,4,15,16]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-acs-admit', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-acs-admit', 'sickle-cell', 'result', 4,
 'ACS — Admission',
 '**Admit ALL patients with ACS.** [4]

**ICU Criteria:**
• Exchange transfusion needed
• FiO2 >40% to maintain SpO2 ≥ 92%
• Worsening respiratory status
• Hemodynamic instability
• Rapidly progressive infiltrates
• Multilobar disease

**Ongoing Management:**
• Continue antibiotics (ceftriaxone + azithromycin)
• Incentive spirometry q2h while awake
• Judicious IV fluids — **avoid overhydration** (worsens pulmonary edema)
• Serial CXR if clinically worsening
• Continuous SpO2 monitoring
• Hematology co-management

**Monitor for multi-organ failure** — ACS can rapidly progress.',
 '[1,4,15]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit all ACS patients. ICU if exchange transfusion, FiO2 >40%, worsening status, or hemodynamic instability. Continue antibiotics + incentive spirometry.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 19)
;


-- MODULE 5: STROKE & SPLENIC SEQUESTRATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-stroke-start', 'sickle-cell', 'info', 5,
 'SCD — Acute Stroke',
 '**A child with SCD is 33× more likely to have an ischemic stroke** than an age-matched healthy counterpart. [1]

**Incidence:** Highest between ages 2–9 years. Prior to stroke-reducing protocols, ischemic stroke affected 10% of children with SCD. [1][6]

**Pathophysiology:**
• Decreased cerebrovascular reserve
• Increased baseline cerebral blood flow
• Impaired cerebral autoregulatory function
• Increased baseline O2 extraction fraction

**Presentation (similar to non-SCD stroke):**
• Hemiparesis / hemiplegia
• Aphasia / dysarthria
• Seizures
• Severe headache
• Altered mental status
• Abnormal gait / coordination
• Facial droop
• Numbness

**ACTIVATE STROKE ALERT immediately.**
**NOTIFY HEMATOLOGY immediately.** [6]',
 '[1,6,17]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-stroke-workup', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-stroke-workup', 'sickle-cell', 'info', 5,
 'Stroke — Workup & Imaging',
 '**Imaging:**
• **Emergent CT head** — rule out hemorrhage (hemorrhagic stroke more common in adult SCD)
• **MRI/MRA** if hemorrhage ruled out — define infarct, identify large vessel vasculopathy (stenosis/occlusion with or without moyamoya collaterals) [1][6]

**Laboratory:**
• CBC with reticulocyte count
• Coagulation studies
• Hemoglobin electrophoresis — determine HbS% [1]
• Type and crossmatch — prepare for exchange transfusion

**Clinical Assessment:**
• Pediatric NIHSS (National Institutes of Health Stroke Scale) [1]
• Complete neurologic examination

**Cross-link to full ischemic stroke protocol:**
[Ischemic Stroke Protocol](#/tree/stroke)',
 '[1,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-stroke-treatment', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-stroke-treatment', 'sickle-cell', 'info', 5,
 'Stroke — Transfusion',
 '[Transfusion Guidelines](#/info/scd-transfusion)

**ASH recommends transfusion within 2 hours of neurologic symptom onset.** [6]

**Exchange transfusion is recommended over simple transfusion.** [6]
• Target: HbS <30%, HbA >70%, Hgb ~10 g/dL
• Simple transfusion can be done first to avoid delays, followed by exchange transfusion

**Important Thresholds:**
• If HbS already <50% → exchange transfusion may not be indicated [6]
• If Hgb >8.5 g/dL → simple transfusion NOT indicated (hyperviscosity syndrome risk) [6]
• Do NOT exceed Hgb 11 g/dL

**tPA (Tissue Plasminogen Activator):**
• **NOT recommended for children <18 years** [6]
• For adults ≥18: may consider per standard stroke protocol if presenting within 4.5 hours, no hemorrhage on CT, no contraindications to thrombolysis [6]

**Presentation >72 hours after onset without recent worsening:**
• Assess HbS% and hemoglobin
• Case-by-case transfusion decision with hematology [6]',
 '[1,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-stroke-dispo', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-stroke-dispo', 'sickle-cell', 'result', 5,
 'Stroke — Disposition',
 '**Admit to ICU.** [1][6]

• Continuous cardiac monitoring
• Serial neurologic assessments
• Neurology + hematology co-management

**Long-term Management:**
• Chronic transfusion program — monthly transfusions to maintain HbS <30% [6]
• Stroke prevention protocols (transcranial Doppler screening) have led to 10-fold decrease in stroke over the last decade [1]
• After ≥1 year of chronic transfusion with normalized TCD velocities, select children without severe vasculopathy may transition to hydroxyurea [6]',
 '[1,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit ICU. Exchange transfusion targeting HbS <30%. Neurology + hematology co-management. Chronic transfusion program for secondary prevention.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 23)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-splenic-start', 'sickle-cell', 'info', 5,
 'Splenic Sequestration',
 '**Life-threatening complication** — can progress to shock and cardiac arrest within hours. [1]

**Pathophysiology:** Sickling in the relatively hypoxic splenic environment → RBCs trapped → ongoing cycle of sequestration → acute splenomegaly + severe anemia + thrombocytopenia [1]

**Typical Age:**
• HbSS: 6 months – 5 years (median 1.4 years) — before autoinfarction of spleen [1]
• HbSC / HbSβ+: can present later in life [1]

**Presentation:**
• Fussiness, irritability (infants)
• Abdominal pain, distension
• Tachycardia (often first sign)
• Pallor, weakness
• Palpable rapidly enlarging spleen
• → Can progress to circulatory shock and arrest [1]

**DDx:** Aplastic crisis (low retic), hepatic sequestration

**Emergent Studies:**
• CBC, reticulocyte count, total/indirect bilirubin
• Type and crossmatch
• Establish **two large-bore IVs**
• Ultrasound can confirm splenomegaly if diagnostic uncertainty',
 '[1,4,18]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-splenic-treatment', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 24)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-splenic-treatment', 'sickle-cell', 'result', 5,
 'Splenic Sequestration — Treatment',
 '**Transfusion — CRITICAL NUANCE:** [4]

• pRBC in **5 mL/kg aliquots**, standard infusion rate (3–4 hours)
• **DO NOT transfuse past Hgb 8 g/dL**

**Why the Hgb 8 ceiling matters:**
Sequestered RBCs eventually re-enter the bloodstream ("reverse sequestration" or "autotransfusion"). If over-transfused → severe **hyperviscosity** → hypertension, heart failure, intracerebral hemorrhage. [1][4]

**Fluid Resuscitation:**
• Crystalloid boluses for hypovolemic shock
• Maintain hemodynamic stability while preparing blood

**Monitoring:**
• Serial abdominal exams q1–2 hours (spleen size)
• Serial hemoglobin checks after each transfusion aliquot
• Continuous cardiac monitoring

**Disposition:**
• **Admit ALL patients** [1]
• Hematology consult
• Recurrence rate: 50–78% [1]
• Consider splenectomy or chronic transfusion therapy for recurrent episodes
• **Teach parents to palpate spleen daily** for early detection [1]',
 '[1,4,18]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Emergent pRBC transfusion in 5 mL/kg aliquots. Do NOT exceed Hgb 8 g/dL. Admit all. Hematology consult. High recurrence rate — consider splenectomy.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 25)
;


-- MODULE 6: SCT & SPECIAL POPULATIONS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-sct-start', 'sickle-cell', 'info', 6,
 'Sickle Cell Trait (HbAS)',
 '[SCT Complications](#/info/scd-sct-complications)

**Sickle cell trait (SCT) is NOT sickle cell disease.** [1]

• ~8% of African Americans carry HbAS
• Generally a benign carrier condition
• Red blood cells function normally under typical conditions

**However, specific risks exist under physiologic stress:**
• High altitude
• Severe dehydration
• High-intensity or prolonged physical exertion
• These conditions can induce sickling and vaso-occlusion [1]

**Key SCT Complications:**
• Exercise Collapse Associated with Sickle Cell Trait (ECAST)
• Exertional rhabdomyolysis
• Renal papillary necrosis
• Renal medullary carcinoma
• Splenic infarction at altitude
• Hyposthenuria (inability to concentrate urine → dehydration risk)',
 '[1,19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-sct-ecast', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 26)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-sct-ecast', 'sickle-cell', 'info', 6,
 'ECAST — Exertional Collapse',
 '**Exercise Collapse Associated with Sickle Cell Trait (ECAST)**

Associated with competitive athletes and military training. Kark et al (1987) found **28× increased risk of exercise-related death** among recruits with SCT compared to those without. [19]

**Pathophysiology:**
Metabolic crisis from known sickling risk factors during intense exercise:
• Dehydration + acidosis + hypoxia + hyperthermia → sickling in SCT [1]

**Presentation (can progress rapidly):**
• Extremity pain during/after intense exertion
• → Rhabdomyolysis (elevated CK)
• → Acute kidney injury
• → Altered mental status
• → Decompensated shock
• → Coronary vasoconstriction, arrhythmias
• → Disseminated intravascular coagulation (DIC)

**Management:**
• **STOP exercise immediately**
• Cool the patient (remove from heat, active cooling)
• **Aggressive IV fluid hydration** — target UO 200–300 mL/hr
• Continuous cardiac monitoring
• Serial labs: BMP, CK (rhabdomyolysis), blood gas (acid-base), coagulation studies

**Note:** A 2016 study of ~48,000 Black US Army soldiers found mortality risk with SCT was similar to those without SCT when risk mitigation strategies were employed. [20]',
 '[1,19,20]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-sct-renal', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 27)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-sct-renal', 'sickle-cell', 'info', 6,
 'SCT — Renal Complications',
 '**Renal Papillary Necrosis** (most common cause of hematuria in SCT) [1]

• Painless gross hematuria
• Microinfarctions in renal medulla from sickling in vasa recta capillaries
• Hypoxic, acidotic environment promotes sickling

**Workup:** Urinalysis, urine culture, BMP (renal function), renal ultrasound with bladder

**Management:**
• Mild: outpatient — bed rest, oral hydration, urine alkalinization
• Severe: inpatient — desmopressin infusion, ureteroscopic tamponade, or epsilon aminocaproic acid [1]

---

**Renal Medullary Carcinoma** — RARE but AGGRESSIVE [21]

• Highly malignant primary renal tumor
• Almost exclusively in SCT carriers (young adults)
• Median survival: **15 weeks** (usually disseminated at diagnosis)

**Red Flag:** Flank pain + hematuria in SCT patient
→ **CT urography** to evaluate for renal medullary carcinoma [1][21]

---

**Hyposthenuria:**
• Inability to concentrate urine → chronic dehydration risk
• Counsel on increased fluid intake, especially during exercise',
 '[1,21]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'scd-sct-dispo', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 28)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-sct-dispo', 'sickle-cell', 'result', 6,
 'SCT — Disposition',
 '**ECAST:**
• Admit to ICU for aggressive fluid resuscitation
• Serial CK, BMP, blood gas monitoring
• Continuous cardiac monitoring
• Watch for rhabdomyolysis, AKI, DIC

**Hematuria:**
• Mild painless hematuria: outpatient with urology referral
• Flank pain + hematuria: CT urography to rule out renal medullary carcinoma
• Severe hematuria: admit for urologic management

**Counseling:**
• Exertional risks — avoid extreme exertion without acclimatization
• Gradual training progression
• Adequate hydration before, during, and after exercise
• Avoid extreme altitude and heat without preparation
• Routine physical activity IS safe and beneficial [1]',
 '[1,19,20,21]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'ECAST: admit ICU with aggressive fluids and monitoring. Hematuria: urology referral, CT urography if flank pain. Counsel on exertional risks and hydration.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 29)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('scd-special-pop', 'sickle-cell', 'info', 6,
 'Special Populations & Considerations',
 '**Pregnant Patients:** [1]
• Increased risk for VOC, ACS, preeclampsia/eclampsia, stillbirth, cesarean delivery, low birth weight
• Early multidisciplinary team: obstetrics + hematology
• More aggressive monitoring and lower intervention thresholds

**Unvaccinated Children:** [1]
• PCV7 vaccine reduced pneumococcal infection by 90%
• Unvaccinated children at dramatically higher risk even on penicillin prophylaxis
• Lower threshold for admission and IV antibiotics

**High ED Utilizers (>3 visits/year for pain):** [1][22]
• Address implicit bias — SCD pain is REAL
• Opioid misuse rate in SCD is **LOWER than general population** [1]
• Negative provider attitudes lead to undertreatment of pain
• **Treat pain first**, then involve hematology if concern for addiction
• Individualized pain plans reduce admissions by 24% [9]

**Adolescents in Transition:**
• Transition from pediatric to adult hematology is a vulnerable period
• Ensure continuity of care and pain plan communication

**Parvovirus B19 (Transient Red Cell Aplasia):** [1]
• 80% of SCD patients infected develop TRCA
• Reticulocyte count <1%, Hgb drops >30%
• Self-limited 7–10 days
• May need simple transfusion or IVIG
• WBC and platelets may also decline',
 '[1,3,4,9,22]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 30)
;


-- 5. drugs (2 new drugs)
INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('hydromorphone', 'Hydromorphone (Dilaudid)', 'Hydromorphone hydrochloride', 'Opioid analgesic', 'IV',
 '["SCD pain crisis","Severe acute pain"]'::jsonb,
 '[{"indication":"SCD pain crisis","regimen":"0.015-0.02 mg/kg IV over 2-3 minutes. Max initial dose 1 mg. Reassess q30 min. May repeat up to 3 doses. 5-7× more potent than morphine mg-for-mg.","weightCalc":{"dosePerKg":0.02,"unit":"mg","maxDose":1}}]'::jsonb,
 '["Severe respiratory depression without ventilatory support","Paralytic ileus"]'::jsonb,
 '["More potent than morphine — dose carefully","Less histamine release than morphine (fewer hypotensive episodes)","Respiratory depression potentiated by benzodiazepines","Reduce dose 25-50% in elderly or hepatic/renal impairment"]'::jsonb,
 'Continuous SpO2, respiratory rate, pain scores, sedation level. Have naloxone available.',
 'Alternative to morphine for SCD pain crisis. 5-7× more potent mg-for-mg. Less histamine release → less hypotension and pruritus than morphine. Preferred by some patients based on individualized pain plans.',
 NULL,
 '["Brandow AM, et al. ASH 2020 guidelines for sickle cell disease: management of acute and chronic pain. Blood Adv. 2020;4(12):2656-2701.","Jackson KM, et al. Emergency Department Management of Acute Pediatric Sickle Cell Disease Complications. Pediatr Emerg Med Pract. 2024;21(11):1-28."]'::jsonb,
 0)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('ketorolac', 'Ketorolac (Toradol)', 'Ketorolac tromethamine', 'NSAID (nonsteroidal anti-inflammatory)', 'IV/IM',
 '["SCD pain crisis","Acute moderate-severe pain"]'::jsonb,
 '[{"indication":"SCD pain crisis","regimen":"0.5 mg/kg IV. Max 15 mg if <16 years, max 30 mg if ≥16 years. Onset 10-15 min. Duration 4-6 hours. Administer with first opioid dose for multimodal analgesia. Limit to 5 days total NSAID therapy.","weightCalc":[{"dosePerKg":0.5,"unit":"mg","maxDose":15,"label":"Pediatric (<16 yr)"},{"dosePerKg":0.5,"unit":"mg","maxDose":30,"label":"Adult (≥16 yr)"}]}]'::jsonb,
 '["Active GI bleeding or peptic ulcer disease","Renal impairment (CrCl <30 mL/min) or history of SCD nephropathy","Coagulopathy or active bleeding","Third trimester pregnancy","Prior NSAID hypersensitivity or aspirin-exacerbated respiratory disease","Ketorolac use within previous 5 days","Ibuprofen use within 6 hours"]'::jsonb,
 '["Limit total NSAID duration to 5 days","Use with caution in dehydrated patients","Monitor renal function — SCD patients have baseline nephropathy risk","GI bleeding risk increases with concurrent anticoagulants or steroids"]'::jsonb,
 'BMP (renal function), bleeding signs. Limit to 5-day max course.',
 'First-line NSAID for SCD pain crisis. Reduces opioid requirements when used as part of multimodal analgesia. NHLBI and ASH guidelines recommend NSAIDs for VOC pain management. Administer early alongside opioids. Avoid in patients with known SCD nephropathy or renal impairment.',
 NULL,
 '["Brandow AM, et al. ASH 2020 guidelines for sickle cell disease: management of acute and chronic pain. Blood Adv. 2020;4(12):2656-2701.","NHLBI. Evidence-Based Management of Sickle Cell Disease: Expert Panel Report. 2014."]'::jsonb,
 1)
;


-- 5b. drugs — UPDATE existing entries (6 drugs)
-- Updating Morphine Sulfate with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Burns pain","Severe acute pain","SCD pain crisis"]'::jsonb,
  dosing = '[{"indication":"Burns — adult","regimen":"0.1 mg/kg IV over 5 min, q2-4h PRN. Titrate to pain control. Max initial dose 10 mg.","weightCalc":{"dosePerKg":0.1,"unit":"mg","maxDose":10}},{"indication":"Burns — pediatric","regimen":"0.05-0.1 mg/kg IV q2-4h PRN. Max initial dose 5 mg. Consider intranasal fentanyl as alternative for initial dosing.","weightCalc":{"dosePerKg":0.1,"unit":"mg","maxDose":5,"label":"Pediatric"}},{"indication":"ACS / Refractory Pain","regimen":"4-8 mg IV initially (lower doses for elderly). Repeat 2-4 mg IV q5-15 min PRN.\n\nUse only for pain refractory to nitroglycerin. Morphine may delay P2Y12 inhibitor absorption and was associated with higher mortality in ACS (CRUSADE trial). Clinical judgment recommended."},{"indication":"SCD pain crisis","regimen":"0.1-0.2 mg/kg IV over 5 min. Max initial dose 8 mg. Reassess pain q30 min. May repeat up to 3 doses. Transition to PCA if admitting. NHLBI recommends analgesia within 30 min of triage.","weightCalc":{"dosePerKg":0.2,"unit":"mg","maxDose":8}}]'::jsonb,
  contraindications = '["Severe respiratory depression without ventilatory support","Paralytic ileus"]'::jsonb,
  cautions = '["Histamine release → hypotension, especially in volume-depleted burn patients","Respiratory depression potentiated by benzodiazepines","Reduce dose 25-50% in elderly or hepatic impairment","Nausea/vomiting common — have ondansetron available"]'::jsonb,
  monitoring = 'Continuous SpO2, respiratory rate, pain scores, sedation level. Blood pressure (histamine-related hypotension). Have naloxone available.',
  notes = 'Standard opioid for moderate-severe burn pain. Longer duration (3-5h) than fentanyl makes it better for sustained pain relief. Histamine release can cause hypotension — use with caution in actively resuscitating patients (consider fentanyl or ketamine instead). For severe burns, consider multimodal approach: morphine + ketamine sub-dissociative + scheduled NSAID/APAP.',
  citations = '["Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.","Bitter CC et al. WMS Clinical Practice Guideline on Care of Burns in the Wilderness. Wilderness Environ Med. 2025;36(4):549-558."]'::jsonb
WHERE id = 'morphine';

-- Updating Fentanyl with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Burns pain","Acute severe pain","Pediatric analgesia (intranasal)","SCD pain crisis"]'::jsonb,
  dosing = '[{"indication":"Burns — IV analgesia","regimen":"1-1.5 mcg/kg IV over 1-2 minutes. May repeat q30-60 min PRN. Rapid onset (2-3 min), short duration (30-60 min).","weightCalc":{"dosePerKg":1.5,"unit":"mcg","maxDose":100}},{"indication":"Burns — pediatric intranasal","regimen":"1.5 mcg/kg IN via atomizer (MAD device). Max 100 mcg per nare. Onset 5-10 min. May repeat ×1 after 10-15 min if needed.","weightCalc":{"dosePerKg":1.5,"unit":"mcg","maxDose":100}},{"indication":"SCD pain triage (intranasal)","regimen":"1-1.5 mcg/kg IN via MAD atomizer. Max 100 mcg per nare. Administer at TRIAGE before IV access. Onset 5-10 min. May repeat ×1 after 10-15 min. Shortens ED length of stay for VOC.","weightCalc":{"dosePerKg":1.5,"unit":"mcg","maxDose":100,"label":"Intranasal (triage)"}},{"indication":"SCD pain crisis IV","regimen":"2 mcg/kg IV over 1-2 minutes. Max 100 mcg. Onset 2-3 min. Duration 30-60 min. ED-only option for patients who prefer fentanyl over morphine/hydromorphone.","weightCalc":{"dosePerKg":2,"unit":"mcg","maxDose":100,"label":"IV"}}]'::jsonb,
  contraindications = '["MAO inhibitor use within 14 days","Severe respiratory depression without ventilatory support"]'::jsonb,
  cautions = '["Chest wall rigidity with rapid IV push (especially >5 mcg/kg)","Short duration — may need repeated dosing or transition to longer-acting opioid","Respiratory depression potentiated by benzodiazepines"]'::jsonb,
  monitoring = 'Continuous SpO2, respiratory rate, sedation level. Have naloxone immediately available.',
  notes = 'Preferred opioid for burn pain when rapid onset and short duration are desired. Intranasal route is first-line for pediatric burns — avoids IV in a distressed child. Hemodynamically stable (no histamine release like morphine). For prolonged pain management, consider morphine or ketamine infusion.',
  citations = '["Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.","Bitter CC et al. WMS Clinical Practice Guideline on Care of Burns in the Wilderness. Wilderness Environ Med. 2025;36(4):549-558."]'::jsonb
WHERE id = 'fentanyl';

-- Updating Ceftriaxone with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Neurosyphilis (PCN allergy alternative)","Bacterial meningitis","Various serious infections","Pediatric sepsis / neonatal fever","Pediatric meningitis","Pediatric UTI","Pyelonephritis in pregnancy","SCD febrile illness","SCD meningitis"]'::jsonb,
  dosing = '[{"indication":"Neurosyphilis (if desensitization not feasible)","regimen":"2 g IV daily × 10–14 days."},{"indication":"Pediatric Fever / Neonatal Sepsis","regimen":"50 mg/kg IV q24h (standard). 50 mg/kg IM/IV x1 (single pre-discharge dose). Max 2 g/dose.","weightCalc":[{"dosePerKg":50,"unit":"mg","maxDose":2000,"label":"Standard (q24h)"},{"dosePerKg":50,"unit":"mg","maxDose":2000,"label":"Single dose (IM/IV x1)"}]},{"indication":"Pediatric Meningitis","regimen":"50 mg/kg IV q12h (meningitic dose). Max 2 g/dose.","weightCalc":{"dosePerKg":50,"unit":"mg","maxDose":2000,"label":"Meningitic (q12h)"}},{"indication":"Pediatric UTI (inpatient/pre-discharge)","regimen":"75 mg/kg IV or IM prior to discharge. Max 2 g/dose.","weightCalc":{"dosePerKg":75,"unit":"mg","maxDose":2000}},{"indication":"Pyelonephritis in pregnancy","regimen":"1 g IV daily. Continue until afebrile 48 hours, then transition to oral cephalexin guided by culture sensitivities. Admit all pregnant patients with pyelonephritis."},{"indication":"Adult Bacterial Meningitis","regimen":"2 g IV q12h. Higher dose required for consistent CNS penetration. Combine with vancomycin (± ampicillin if age ≥50, pregnant, or immunocompromised). Administer with dexamethasone 0.15 mg/kg IV q6h."},{"indication":"SCD febrile illness","regimen":"50 mg/kg IV. Max 2 g/dose. Administer IMMEDIATELY after blood cultures. Covers encapsulated organisms (S. pneumoniae, H. influenzae, N. meningitidis). NHLBI recommends within 1 hour of presentation.","weightCalc":{"dosePerKg":50,"unit":"mg","maxDose":2000,"label":"SCD fever"}},{"indication":"SCD meningitis","regimen":"100 mg/kg IV. Max 2 g/dose. Meningitic dosing for SCD patients with meningeal signs, AMS, or ill appearance. Combine with Vancomycin 20 mg/kg IV.","weightCalc":{"dosePerKg":100,"unit":"mg","maxDose":2000,"label":"SCD meningitis"}}]'::jsonb,
  contraindications = '["Severe cephalosporin allergy","Note: ~2–5% cross-reactivity with penicillin allergy — lower than historically believed"]'::jsonb,
  cautions = '["Biliary sludging — avoid co-administration with calcium-containing IV solutions in neonates","Not first-line for neurosyphilis — limited evidence compared to IV penicillin G. Use only if desensitization is not feasible."]'::jsonb,
  monitoring = 'CSF re-examination at 6 months post-treatment to document improvement.',
  notes = NULL,
  citations = '["CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.","Marra CM, et al. Ceftriaxone for Neurosyphilis. Clin Infect Dis. 2019."]'::jsonb
WHERE id = 'ceftriaxone';

-- Updating Azithromycin (Zithromax) with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Traveler''s diarrhea (fluoroquinolone-resistant regions)","Acute infectious diarrhea","SCD acute chest syndrome"]'::jsonb,
  dosing = '[{"indication":"Traveler diarrhea","regimen":"1000 mg PO × 1 dose, or 500 mg PO daily × 3 days. Preferred for Southeast Asia travel (>80% fluoroquinolone-resistant Campylobacter)."},{"indication":"Pediatric diarrhea","regimen":"10 mg/kg PO daily × 3 days. Max 500 mg/dose.","weightCalc":{"dosePerKg":10,"unit":"mg","maxDose":500}},{"indication":"SCD acute chest syndrome","regimen":"10 mg/kg IV. Max 500 mg/dose. Covers atypical organisms (Mycoplasma, Chlamydia). Combine with Ceftriaxone for ACS.","weightCalc":{"dosePerKg":10,"unit":"mg","maxDose":500,"label":"SCD ACS"}}]'::jsonb,
  contraindications = '["Known hypersensitivity to azithromycin or macrolides","History of cholestatic jaundice/hepatic dysfunction with prior azithromycin use"]'::jsonb,
  cautions = '["QT prolongation risk — avoid with other QT-prolonging agents","Hepatotoxicity — monitor for signs of liver injury"]'::jsonb,
  monitoring = 'QTc if concurrent QT-prolonging agents. LFTs if prolonged use or hepatic disease.',
  notes = 'First-line for traveler''s diarrhea from Southeast Asia due to high rates of fluoroquinolone-resistant Campylobacter (>80%). Also effective for Shigella and non-typhoidal Salmonella.',
  citations = '["Riddle MS, et al. ACG Clinical Guideline: Diagnosis, Treatment, and Prevention of Acute Diarrheal Infections in Adults. Am J Gastroenterol. 2016;111(5):602-622.","CDC. Travelers'' Diarrhea. Yellow Book 2024."]'::jsonb
WHERE id = 'azithromycin';

-- Updating Vancomycin with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Meningitis (>28 days, added to Ceftriaxone for MRSA/resistant organism coverage)","C. difficile infection (first-line, ORAL)","SCD meningitis"]'::jsonb,
  dosing = '[{"indication":"Meningitic","regimen":"15 mg/kg IV q6h."},{"indication":"Non-meningitic","regimen":"15 mg/kg IV q8h."},{"indication":"C difficile","regimen":"Non-severe and severe: 125 mg PO QID × 10-14 days. Fulminant: 500 mg PO/NG QID + IV metronidazole 500 mg q8h ± rectal vancomycin enema. NOTE: This is ORAL vancomycin — not systemically absorbed."},{"indication":"SCD meningitis","regimen":"20 mg/kg IV over 60 min. Max 1500 mg. Combined with Ceftriaxone 100 mg/kg IV for suspected meningitis in SCD patients with meningeal signs, altered mental status, or ill appearance.","weightCalc":{"dosePerKg":20,"unit":"mg","maxDose":1500,"label":"SCD meningitis"}}]'::jsonb,
  contraindications = '["Known hypersensitivity to vancomycin"]'::jsonb,
  cautions = '["Red Man Syndrome — infuse over at least 1 hour","Nephrotoxicity — especially with concurrent aminoglycosides","Ototoxicity with prolonged use"]'::jsonb,
  monitoring = 'Obtain trough before 4th dose (goal trough 15-20 mcg/mL for meningitis). Renal function (BUN, creatinine). Drug levels needed if >2 doses anticipated.',
  notes = 'Added to Ceftriaxone for meningitis in infants >28 days to cover MRSA and resistant GBS/pneumococcus. Not needed in the 0-28 day empiric sepsis regimen (Ampicillin + Gentamicin or Ampicillin + Ceftriaxone provides adequate coverage).',
  citations = '["Tunkel AR, et al. Practice Guidelines for the Management of Bacterial Meningitis. Clin Infect Dis. 2004;39(9):1267-1284.","Red Book: 2021-2024 Report of the Committee on Infectious Diseases. American Academy of Pediatrics."]'::jsonb
WHERE id = 'vancomycin';

-- Updating Ketamine with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Burns analgesia","Burns procedural sedation","RSI induction","Refractory SE","Acute agitation (refractory)","SCD adjunct analgesia"]'::jsonb,
  dosing = '[{"indication":"Burns — sub-dissociative analgesia","regimen":"0.1-0.3 mg/kg IV over 10-15 min. May repeat q15-20 min PRN. Infusion: 0.1-0.2 mg/kg/hr for dressing changes/prolonged procedures.","weightCalc":{"dosePerKg":0.3,"unit":"mg","label":"Sub-dissociative (max dose)"}},{"indication":"Burns — procedural sedation (dissociative)","regimen":"1-2 mg/kg IV over 1 min (onset 1 min, duration 15-20 min). IM: 4-5 mg/kg (onset 5 min, duration 20-30 min). May give additional 0.5-1 mg/kg IV boluses for prolonged procedures.","weightCalc":[{"dosePerKg":1.5,"unit":"mg","label":"IV dissociative"},{"dosePerKg":4,"unit":"mg","label":"IM dissociative"}]},{"indication":"RSI induction","regimen":"1-2 mg/kg IV push. Hemodynamically stable induction agent — ideal for burns/trauma patients.","weightCalc":{"dosePerKg":1.5,"unit":"mg"}},{"indication":"Refractory SE — continuous infusion","regimen":"Load 0.5-3 mg/kg IV bolus, then infuse 0.1-5 mg/kg/hr. NMDA receptor antagonist — different mechanism from GABAergic agents. Consider when midazolam and propofol fail. Some case reports suggest trial of ketamine before other IV anesthetics to potentially avoid intubation. Requires continuous EEG monitoring.","weightCalc":{"dosePerKg":2,"unit":"mg","label":"Loading bolus"}},{"indication":"Acute agitation (refractory)","regimen":"4 mg/kg IM (onset 5 min, reliable sedation) or 1-2 mg/kg IV over 1 min. For refractory agitation not responding to antipsychotics and benzodiazepines. Rapid, reliable onset. Prepare for possible intubation — 29% intubation rate in one prehospital study. Avoid in elderly patients and patients with heart disease or schizophrenia.","weightCalc":[{"dosePerKg":4,"unit":"mg","label":"IM agitation dose"},{"dosePerKg":1.5,"unit":"mg","label":"IV agitation dose"}]},{"indication":"SCD adjunct analgesia","regimen":"0.1-0.3 mg/kg IV over 10-15 min as adjunct for opioid-refractory VOC pain. May repeat q15-20 min PRN. ASH 2020 guidelines recommend sub-dissociative ketamine for SCD pain refractory to opioids. ACEP supports use in SCD.","weightCalc":{"dosePerKg":0.3,"unit":"mg","label":"Sub-dissociative (SCD)"}}]'::jsonb,
  contraindications = '["Age <3 months (relative)","Known psychotic disorder (relative)"]'::jsonb,
  cautions = '["Emergence reactions (10-20% adults, rare in children) — prophylactic midazolam 0.05 mg/kg can prevent","Laryngospasm (rare, 0.3%) — have suction and BVM ready","Increases secretions — consider glycopyrrolate 0.005 mg/kg if problematic","Brief sympathomimetic effect — increases HR/BP (beneficial in hemodynamically compromised patients)"]'::jsonb,
  monitoring = 'Continuous SpO2, capnography if available, cardiac monitor. Suction and BVM at bedside. Recovery typically 60-120 min.',
  notes = 'Ideal analgesic/sedative for burn patients: provides profound analgesia at sub-dissociative doses, full procedural sedation at dissociative doses, and RSI induction — one drug for three burn care needs. Maintains airway reflexes and spontaneous respirations at dissociative doses. Does NOT cause respiratory depression at analgesic doses. Hemodynamic stability makes it superior to opioids alone for burn resuscitation patients. Particularly valuable for repeated painful procedures (dressing changes, debridement).',
  citations = '["Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.","Bitter CC et al. WMS Clinical Practice Guideline on Care of Burns in the Wilderness. Wilderness Environ Med. 2025;36(4):549-558."]'::jsonb
WHERE id = 'ketamine';


-- 6. info_pages (8 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('scd-steps-summary', 'SCD Management Steps Summary', 'Quick-reference — jump to any pathway',
 '[{"heading":"Initial Assessment","body":"• [Identify SCD genotype, baseline Hgb, prior complications](#/node/scd-start)\n• Check for individualized pain plan from hematology\n• Use SCD Triage Calculator to classify presentation"},{"heading":"VOC Pain Crisis","body":"• [IN Fentanyl at triage BEFORE IV access](#/node/scd-voc-triage)\n• [IV Ketorolac + opioid (Morphine, Hydromorphone, or Fentanyl)](#/node/scd-voc-iv)\n• [NS bolus 10 mL/kg + incentive spirometry (prevents ACS)](#/node/scd-voc-iv)\n• [Reassess q30 min × 3 doses → PO transition or admit](#/node/scd-voc-reassess)"},{"heading":"Fever (Emergency)","body":"• [Blood culture BEFORE antibiotics — always](#/node/scd-fever-workup)\n• [Ceftriaxone 50 mg/kg IV IMMEDIATELY](#/node/scd-fever-abx)\n• [Add Vancomycin if meningitis concern](#/node/scd-fever-meningitis)\n• [CXR if any respiratory symptoms (r/o ACS)](#/node/scd-fever-workup)"},{"heading":"Acute Chest Syndrome","body":"• [Ceftriaxone + Azithromycin — cover typical + atypical](#/node/scd-acs-treatment)\n• [O2 only for SpO2 <90% — higher O2 blunts marrow response](#/node/scd-acs-treatment)\n• [Simple transfusion if Hgb drops >1 from baseline](#/node/scd-acs-transfusion)\n• [Exchange transfusion if worsening — AVOID steroids](#/node/scd-acs-exchange)"},{"heading":"Stroke (Critical)","body":"• [Activate stroke alert + notify hematology STAT](#/node/scd-stroke-start)\n• [Emergent CT head → MRI/MRA if no hemorrhage](#/node/scd-stroke-workup)\n• [Exchange transfusion — target HbS <30%](#/node/scd-stroke-treatment)\n• [tPA NOT recommended <18 years](#/node/scd-stroke-treatment)"},{"heading":"Splenic Sequestration (Critical)","body":"• [Emergent CBC, retic, T&C — 2 large-bore IVs](#/node/scd-splenic-start)\n• [pRBC 5 mL/kg aliquots — do NOT exceed Hgb 8 g/dL](#/node/scd-splenic-treatment)\n• [Admit all — 50–78% recurrence rate](#/node/scd-splenic-treatment)"}]'::jsonb,
 '[{"num":1,"text":"Jackson KM, et al. Pediatric Sickle Cell Disease: ED Evaluation and Management. Pediatr Emerg Med Pract. 2024;21(11):1-28."},{"num":2,"text":"NHLBI. Evidence-Based Management of Sickle Cell Disease: Expert Panel Report. 2014."}]'::jsonb,
 false,
 0)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('scd-genotypes', 'SCD Genotypes & Disease Severity', 'Genotype determines baseline severity and complication risk',
 '[{"heading":"HbSS (Sickle Cell Anemia)","body":"**Most severe phenotype.** Both β-globin genes carry HbS mutation. No HbA produced.\n\n• Baseline Hgb: 6–8 g/dL\n• Highest risk for all complications (ACS, stroke, splenic sequestration)\n• Functional asplenia by 3 months of age\n• Most common genotype\n• Reticulocyte count chronically elevated (10–14 day RBC lifespan vs 120 days normal)"},{"heading":"HbSβ0-Thalassemia","body":"**Severe phenotype** (similar to HbSS). No β-globin protein produced.\n\n• Baseline Hgb: 6–8 g/dL\n• Similar complication profile to HbSS\n• Diagnosed by hemoglobin electrophoresis (no HbA present)"},{"heading":"HbSC Disease","body":"**Moderate severity.** One HbS gene + one HbC gene.\n\n• Baseline Hgb: 10–15 g/dL\n• Less frequent VOC than HbSS\n• Splenic sequestration can occur later in life (spleen not autoinfarcts as early)\n• Higher risk for retinopathy and avascular necrosis\n• ~50% HbS + ~50% HbC on electrophoresis"},{"heading":"HbSβ+-Thalassemia","body":"**Moderate severity** (similar to HbSC). Small amount of β-globin produced.\n\n• Baseline Hgb: 9–12 g/dL\n• Similar morbidity/mortality as HbSC\n• 10–25% HbA present on electrophoresis\n• Splenic sequestration can present later in life"},{"heading":"HbAS (Sickle Cell Trait)","body":"**Generally benign carrier state.** One HbS gene + one normal gene.\n\n• Normal hemoglobin levels\n• ~8% of African Americans\n• NOT sickle cell disease — different complications (ECAST, renal)\n• Red blood cells function normally under typical conditions\n• Sickling possible under extreme physiologic stress (altitude, dehydration, intense exertion)"}]'::jsonb,
 '[{"num":1,"text":"Ware RE, et al. Sickle cell disease. Lancet. 2017;390(10091):311-323."},{"num":2,"text":"Jackson KM, et al. Pediatric Sickle Cell Disease. Pediatr Emerg Med Pract. 2024;21(11):1-28."}]'::jsonb,
 false,
 1)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('scd-differential', 'SCD Differential Diagnosis', 'DDx by presenting complaint',
 '[{"heading":"Pain","body":"• **Vaso-occlusive crisis** — typical pattern, no focal findings\n• **Osteomyelitis** — Salmonella (most common in SCD), S. aureus; focal tenderness, fever\n• **Avascular necrosis** — femoral head (most common), humeral head; point tenderness, pain with ROM\n• **Septic arthritis** — joint effusion, inability to bear weight\n• **Dactylitis (hand-foot syndrome)** — swelling of fingers/toes, age <2 years\n• **Non-SCD trauma** — fracture, sprain (assess for atypical pain location)"},{"heading":"Fever","body":"• **Bacteremia/sepsis** — encapsulated organisms (S. pneumoniae #1)\n• **Viral illness** — does NOT exclude bacteremia in SCD\n• **Parvovirus B19** — aplastic crisis (retic <1%, profound anemia)\n• **ACS** — fever + respiratory symptoms + infiltrate\n• **Osteomyelitis** — fever + focal bone pain\n• **UTI** — consider in all febrile SCD patients"},{"heading":"Respiratory / Chest Pain","body":"• **Acute chest syndrome** — new infiltrate + fever/resp symptoms; up to 25% of SCD deaths\n• **Pneumonia** — clinically and radiographically similar to ACS\n• **Asthma exacerbation** — common comorbidity; does NOT exclude ACS\n• **Pulmonary embolism** — hypercoagulable state in SCD\n• **Rib/sternal VOC** — chest wall pain without infiltrate\n• **Myocardial infarction** — consider in older teens"},{"heading":"Neurologic","body":"• **Ischemic stroke** — 33× increased risk; peak age 2–9 years\n• **Hemorrhagic stroke** — more common in adult SCD\n• **Meningitis** — encapsulated organisms, functional asplenia\n• **Seizure** — may be presenting sign of stroke\n• **Posterior reversible encephalopathy (PRES)** — hypertension + seizures\n• **Transient ischemic attack** — consider even if symptoms resolve"},{"heading":"Abdominal","body":"• **Splenic sequestration** — rapid splenomegaly + anemia; age 6mo–5yr for HbSS\n• **Hepatic sequestration** — similar mechanism in liver; RUQ pain + hepatomegaly\n• **Aplastic crisis** — parvovirus B19; profound anemia but LOW reticulocyte count\n• **Cholelithiasis/cholecystitis** — pigment gallstones from chronic hemolysis\n• **Appendicitis** — always consider in abdominal pain"}]'::jsonb,
 '[{"num":1,"text":"Jackson KM, et al. Pediatric Sickle Cell Disease. Pediatr Emerg Med Pract. 2024;21(11):1-28."}]'::jsonb,
 false,
 2)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('scd-voc-algorithm', 'VOC Pain Management Algorithm', 'Based on Dell Children’s EBOC + ASH/NHLBI Guidelines',
 '[{"heading":"Triage (Goal: 0–30 Minutes)","body":"• Triage Level 2 (Emergency)\n• Administer Fentanyl 1–1.5 mcg/kg intranasal (max 100 mcg/dose)\n• Place PIV / Access Port\n• Obtain labs: CBC, retic, CMP, urine HCG (females >10 years)\n• If ill-appearing: T&S, Hgb electrophoresis (STAT)\n• If febrile: Use SCD Fever pathway concurrently\n• Offer heat packs to painful sites\n• Continuous pulse oximetry\n\n**Triage Questions:**\n• History of acute chest syndrome?\n• Last pain crisis?\n• Current fever, cough, chest pain?\n• Does patient have an individualized pain plan?"},{"heading":"Initial Analgesia (Goal: 31–60 Minutes)","body":"**Opioid (choose one):**\n• Morphine 0.1–0.2 mg/kg IV (max 8 mg)\n• Hydromorphone 0.015–0.02 mg/kg IV (max 1 mg)\n• Fentanyl 2 mcg/kg IV (max 100 mcg) — ED only\n\n**PLUS NSAID:**\n• Ketorolac 0.5 mg/kg IV (<16yo max 15mg, ≥16yo max 30mg) × 1 dose\n\n**PLUS Fluids:**\n• NS 10 mL/kg bolus (max 1L) over 60 min\n• If dehydration concern: 20 mL/kg bolus (max 1L)\n• Then start 1× maintenance IVF\n\nIf unable to obtain IV: Oxycodone 0.1 mg/kg PO (max 10 mg)"},{"heading":"Ketorolac Contraindications","body":"• Pregnancy\n• Renal impairment or SCD nephropathy\n• Last dose of ketorolac within 5 days\n• Last dose of ibuprofen within 6 hours\n• Active bleeding or coagulopathy\n• History of peptic ulcer disease"},{"heading":"Reassessment (q30 Minutes)","body":"RN reassess pain 30 minutes after each opioid administration.\n\n• If patient asleep, wake to reassess\n• May give 2nd and 3rd opioid doses\n• Notify provider before each additional dose\n• Start incentive spirometry (prevents ACS development)\n\n**AVOID corticosteroids** — risk of rebound pain, stroke, and other complications [4][5]"},{"heading":"Disposition","body":"**Pain Improved → Discharge:**\n• Observe 1 hour post last opioid\n• Encourage PO intake\n• Discharge with home pain regimen (2–3 day opioid supply)\n• Hematology follow-up within 24–48 hours\n\n**Pain Not Improved After 3 Doses → Admit:**\n• Contact hematology for further management\n• Consider sub-dissociative ketamine 0.1–0.3 mg/kg IV\n• PCA morphine or hydromorphone\n• Monitor for ACS development (first 3–4 days)"}]'::jsonb,
 '[{"num":1,"text":"Dell Children’s Medical Center EBOC. Pain Management Algorithm for SCD VOC. Updated April 2023."},{"num":2,"text":"Brandow AM, et al. ASH 2020 guidelines for sickle cell disease: management of acute and chronic pain. Blood Adv. 2020;4(12):2656-2701."},{"num":3,"text":"NHLBI. Evidence-Based Management of Sickle Cell Disease: Expert Panel Report. 2014."}]'::jsonb,
 false,
 3)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('scd-acs-guide', 'ACS Recognition & Management', 'Acute chest syndrome — up to 25% of SCD deaths',
 '[{"heading":"Diagnostic Criteria","body":"**New radiodensity on chest imaging** PLUS any of:\n• Fever\n• Respiratory symptoms (cough, chest pain, dyspnea, tachypnea)\n• Hypoxemia\n\nNote: CXR infiltrate may lag behind clinical symptoms. Consider repeat imaging if high suspicion with initially clear CXR."},{"heading":"Triggers & Etiology","body":"• **Infection** (most common in children) — S. pneumoniae, Mycoplasma, Chlamydia, viral\n• **Fat embolism** — from bone marrow infarction during VOC\n• **In situ sickling** — V/Q mismatch from local hypoxia\n• **Pulmonary infarction** — vaso-occlusion in pulmonary vasculature\n\n**Key:** ACS often develops during days 1–4 of hospitalization for VOC."},{"heading":"Treatment Algorithm","body":"**1. Antibiotics** (cover typical + atypical):\n• Ceftriaxone 50 mg/kg IV (max 2g)\n• Azithromycin 10 mg/kg IV (max 500mg)\n\n**2. Oxygen:**\n• Supplement ONLY for SpO2 <90%\n• Why? Higher O2 in non-hypoxic patients blunts erythropoietic drive — reduces bone marrow response to RBC breakdown\n\n**3. Incentive spirometry** q2h while awake\n\n**4. Bronchodilators** PRN for wheezing\n\n**5. Pain management** per VOC pathway\n\n**6. AVOID corticosteroids** — rebound pain, stroke risk"},{"heading":"Transfusion Strategy","body":"**Simple Transfusion:**\n• If Hgb drops >1 g/dL from baseline\n• Target: Hgb ~10 g/dL, HbS <30%\n• Do NOT exceed Hgb 11 g/dL (hyperviscosity)\n\n**Exchange Transfusion Indications:**\n• Worsening respiratory distress on O2\n• Worsening hypoxia despite supplemental O2\n• Progressive pulmonary infiltrates\n• Worsening anemia post-simple transfusion\n• Multilobar disease\n• Rapid clinical deterioration\n\n**Blood Bank:** Extended antigen matching (anti-C, E, Kell), sickle-negative units. Notify early — exchange is resource-intensive."}]'::jsonb,
 '[{"num":1,"text":"Jackson KM, et al. Pediatric Sickle Cell Disease. Pediatr Emerg Med Pract. 2024;21(11):1-28."},{"num":2,"text":"NHLBI. Evidence-Based Management of Sickle Cell Disease. 2014."},{"num":3,"text":"Dolatkhah R, et al. Blood transfusions for ACS in SCD. Cochrane Database Syst Rev. 2020;1(1):CD007843."}]'::jsonb,
 false,
 4)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('scd-transfusion', 'SCD Transfusion Guidelines', 'Simple vs exchange transfusion thresholds',
 '[{"heading":"Simple Transfusion","body":"**Mechanism:** Donor blood given without removing patient’s blood.\n\n**Indications:**\n• Hgb drops >1 g/dL below baseline (ACS)\n• Symptomatic anemia\n• Splenic sequestration (in 5 mL/kg aliquots)\n• Aplastic crisis (parvovirus B19)\n\n**Targets:**\n• Hgb ~10 g/dL\n• Do NOT exceed Hgb 11 g/dL"},{"heading":"Exchange Transfusion","body":"**Mechanism:** Patient’s blood removed and replaced with donor blood simultaneously.\n\n**Indications:**\n• Acute ischemic stroke (preferred over simple)\n• Severe/worsening ACS\n• Multiorgan failure\n• Pre-operative (goal HbS <30%)\n\n**Targets:**\n• HbS <30%\n• HbA >70%\n• Hgb ~10 g/dL"},{"heading":"Critical Thresholds (Do NOT Exceed)","body":"**Splenic sequestration:** Do NOT transfuse past Hgb **8 g/dL** — sequestered cells re-enter circulation (“reverse sequestration”) → hyperviscosity, HTN, CHF, ICH [1]\n\n**Stroke:** Simple transfusion NOT indicated if Hgb >**8.5 g/dL** (hyperviscosity risk). Use exchange transfusion instead. [2]\n\n**All scenarios:** Do NOT exceed Hgb **11 g/dL** — hyperviscosity syndrome [1]\n\n**Stroke with HbS <50%:** Exchange transfusion may not be indicated [2]"},{"heading":"Blood Bank Considerations","body":"• **Extended antigen matching** required (anti-C, anti-E, anti-Kell) — reduces alloimmunization\n• **Sickle-negative units** — verify HbS-negative donor blood\n• **Notify blood bank EARLY** — exchange transfusion is resource-intensive\n• **Monitor for delayed hemolytic transfusion reaction** up to 28 days post-transfusion\n• **Hemoglobin electrophoresis** can track HbS% response to transfusion"}]'::jsonb,
 '[{"num":1,"text":"NHLBI. Evidence-Based Management of Sickle Cell Disease: Expert Panel Report. 2014."},{"num":2,"text":"DeBaun MR, et al. ASH 2020 guidelines: cerebrovascular disease in SCD. Blood Adv. 2020;4(8):1554-1588."},{"num":3,"text":"Dolatkhah R, et al. Blood transfusions for ACS in SCD. Cochrane Database Syst Rev. 2020."}]'::jsonb,
 false,
 5)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('scd-fever-eval', 'SCD Fever Evaluation', 'Fever ≥ 38.5°C is a medical emergency in SCD',
 '[{"heading":"Why Fever Is Dangerous","body":"**Functional asplenia** develops by 3 months of age in HbSS disease.\n\n• Impaired clearance of encapsulated bacteria\n• S. pneumoniae is the #1 pathogen\n• H. influenzae, N. meningitidis, Salmonella also high risk\n• Pre-PCV bacteremia risk: 15–20%\n• Post-PCV + penicillin prophylaxis: ~1.1% [1]\n\n**Even with low bacteremia rates, the consequences of missed infection are catastrophic.**"},{"heading":"Antibiotic Algorithm","body":"**ALL febrile SCD patients:**\n• Blood culture × 2 BEFORE antibiotics (ALWAYS)\n• Ceftriaxone 50 mg/kg IV (max 2g) — IMMEDIATELY\n\n**If meningitis concern** (meningeal signs, AMS, ill-appearing):\n• Ceftriaxone 100 mg/kg IV (max 2g) — meningitic dose\n• PLUS Vancomycin 20 mg/kg IV (max 1500 mg)\n\n**Timing:** NHLBI recommends antibiotics within 1 hour of presentation [2]\n\n**Caution:** Scheduled acetaminophen/ibuprofen can mask fever. If on scheduled antipyretics with infectious symptoms, evaluate as if febrile."},{"heading":"Disposition Criteria","body":"**Safe to Discharge:**\n• Well-appearing after observation\n• Reliable caregivers\n• Hematology follow-up within 24 hours (confirmed)\n• Completed pneumococcal vaccine series\n• Parenteral antibiotics given in ED\n\n**Must Admit:**\n• Ill-appearing\n• WBC >30,000 or <5,000 /mcL\n• Hypotensive for age\n• Continued fever\n• CXR infiltrate (→ ACS pathway)\n• Age <60 days\n• Unable to ensure 24-hour follow-up\n• Unvaccinated\n\n**Always page hematology before discharge.**"},{"heading":"Parvovirus B19 (Aplastic Crisis)","body":"**Transient Red Cell Aplasia (TRCA):**\n• 80% of SCD patients infected with parvovirus B19 develop TRCA\n• Reticulocyte count **<1%** (key diagnostic finding)\n• Hemoglobin drops **>30%** from baseline\n• WBC and platelets may also decline\n• Self-limited: 7–10 days\n\n**Management:**\n• Simple blood transfusion for symptomatic anemia\n• IVIG may be considered\n• Isolation precautions (contagious to other SCD patients and pregnant women)"}]'::jsonb,
 '[{"num":1,"text":"Rineer S, et al. Risk of bacteremia in febrile children with SCD. JAMA Netw Open. 2023;6(6):e2318904."},{"num":2,"text":"NHLBI. Evidence-Based Management of Sickle Cell Disease. 2014."},{"num":3,"text":"Baskin MN, et al. Bacteremia risk in febrile patients with SCD. Pediatrics. 2013;131(6):1035-1041."}]'::jsonb,
 false,
 6)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('scd-sct-complications', 'Sickle Cell Trait Complications', 'SCT is NOT SCD — but has specific risks',
 '[{"heading":"ECAST (Exercise Collapse)","body":"**Exercise Collapse Associated with Sickle Cell Trait**\n\n• Associated with competitive athletics and military training\n• 28× increased risk of exercise-related death (Kark 1987) [1]\n• Metabolic crisis: dehydration + acidosis + hypoxia + hyperthermia → sickling\n\n**Progression:** Extremity pain → rhabdomyolysis → AKI → AMS → shock → arrhythmias → DIC\n\n**Management:**\n• STOP exercise immediately\n• Cool the patient\n• Aggressive IV fluids (target UO 200–300 mL/hr)\n• Continuous cardiac monitoring\n• Serial: BMP, CK, blood gas, coagulation studies\n\n**Note:** 2016 study of ~48,000 Black US Army soldiers found mortality similar to those without SCT when risk mitigation employed. [2]"},{"heading":"Renal Papillary Necrosis","body":"**Most common cause of hematuria in SCT.**\n\n• Painless gross hematuria\n• Microinfarctions in renal medulla — hypoxic, acidotic environment of vasa recta promotes sickling\n\n**Workup:** UA, urine culture, BMP, renal ultrasound with bladder\n\n**Management:**\n• Mild: outpatient — bed rest, oral hydration, urine alkalinization\n• Severe: inpatient — desmopressin infusion, ureteroscopic tamponade, or epsilon aminocaproic acid"},{"heading":"Renal Medullary Carcinoma","body":"**Rare but highly aggressive malignancy.**\n\n• Almost exclusively in SCT carriers\n• Predominantly young adults\n• Median survival: **15 weeks** (usually disseminated at diagnosis)\n\n**Red Flag:** Flank pain + hematuria in SCT patient\n→ **CT urography** to evaluate\n\nDo not assume hematuria is benign renal papillary necrosis if flank pain is present."},{"heading":"Other SCT Complications","body":"• **Hyposthenuria** — inability to concentrate urine → chronic dehydration risk. Counsel on increased fluid intake.\n• **Splenic infarction at altitude** — can occur at >8,000 feet; presents with LUQ pain\n• **Exertional rhabdomyolysis** — even without full ECAST, can develop isolated rhabdomyolysis during intense exercise\n\n**Prevention Counseling:**\n• Gradual acclimatization to altitude and heat\n• Adequate hydration before, during, and after exercise\n• Avoid extreme exertion without preparation\n• Routine physical activity IS safe and beneficial"}]'::jsonb,
 '[{"num":1,"text":"Kark JA, et al. Sickle-cell trait as a risk factor for sudden death in physical training. NEJM. 1987;317(13):781-787."},{"num":2,"text":"Nelson DA, et al. Sickle cell trait, rhabdomyolysis, and mortality among US Army soldiers. NEJM. 2016;375(5):435-442."},{"num":3,"text":"Alappan N, et al. Renal medullary cancer in a patient with sickle cell trait. Case Rep Oncol Med. 2013."}]'::jsonb,
 false,
 7)
;

COMMIT;
