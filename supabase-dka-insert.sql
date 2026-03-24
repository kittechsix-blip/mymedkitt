-- =====================================================================
-- MedKitt — Diabetic Ketoacidosis Consult: Supabase INSERT Statements
-- Generated: 2026-03-24
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'dka',
  'Diabetic Ketoacidosis',
  'Diagnosis → Severity → Fluids → Insulin → Electrolytes → Special Scenarios',
  '1.0',
  45,
  'dka-start',
  '["Diagnosis — Is This DKA?","Severity Assessment","Evaluate Precipitating Cause","Initial Resuscitation — Fluids","Insulin Management & Potassium","Electrolytes & Monitoring","Special Scenarios & Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('nephro-rheum-endo', 'dka', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (15 citations)
DELETE FROM tree_citations WHERE tree_id = 'dka';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('dka', 1, 'Umpierrez GE, Davis GM, ElSayed NA, et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report. Diabetes Care. 2024;47(8):1257-1275.'),
('dka', 2, 'Farkas J. Diabetic Ketoacidosis (DKA). Internet Book of Critical Care (IBCC). Updated Sep 2025.'),
('dka', 3, 'Dhatariya KK, Glaser NS, Codner E, Umpierrez GE. Diabetic ketoacidosis. Nat Rev Dis Primers. 2020;6(1):40.'),
('dka', 4, 'Canadian Diabetes Association, Goguen J, Gilbert J. Hyperglycemic emergencies in adults. Can J Diabetes. 2013;37 Suppl 1:S72-6.'),
('dka', 5, 'Long B, Willis GC, Lentz S, et al. Evaluation and Management of the Critically Ill Adult With Diabetic Ketoacidosis. J Emerg Med. 2020;59(3):371-383.'),
('dka', 6, 'Griffey RT, Schneider RM, et al. SQuID II: Clinical and operational effectiveness of subcutaneous insulin protocol. Acad Emerg Med. 2025;32(1):61-71.'),
('dka', 7, 'Slovis CM, Mork VG, et al. Diabetic ketoacidosis and infection: leukocyte count and neutrophil-to-lymphocyte ratio as early predictors. Am J Emerg Med. 1987;5(1):1-5.'),
('dka', 8, 'Self WH, Evans CS, Jenkins CA, et al. Clinical Effects of Balanced Crystalloids vs Saline in Adults With Diabetic Ketoacidosis. JAMA Netw Open. 2020;3(11):e2024596.'),
('dka', 9, 'Cardoso L, Vicente N, et al. Controversies in management of hyperglycaemic emergencies. Metabolism. 2017;68:43-54.'),
('dka', 10, 'Rawla P, Vellipuram AR, et al. Euglycemic diabetic ketoacidosis: a diagnostic and therapeutic dilemma. Endocrinol Diabetes Metab Case Rep. 2017;2017:17-0081.'),
('dka', 11, 'Long B, Lentz S, et al. Euglycemic diabetic ketoacidosis: Etiologies, evaluation, and management. Am J Emerg Med. 2021;44:157-160.'),
('dka', 12, 'Kitabchi AE, Umpierrez GE, et al. Hyperglycemic crises in adult patients with diabetes: a practical approach. Diabetes Care. 2009;32(7):1335-43.'),
('dka', 13, 'Mehta AE, Zimmerman R. Classic diabetic ketoacidosis and the euglycemic variant. Cleve Clin J Med. 2025;92(1):33-39.'),
('dka', 14, 'Fayfman M, Pasquel FJ, Umpierrez GE. Management of Hyperglycemic Crises: Diabetic Ketoacidosis and Hyperglycemic Hyperosmolar State. Med Clin North Am. 2017;101(3):587-606.'),
('dka', 15, 'EBMedicine. Diabetic Hyperglycemic Emergencies: A Systematic Approach to Diagnosis and Management. Emergency Medicine Practice. 2020;22(2):1-20.');

DELETE FROM decision_nodes WHERE tree_id = 'dka';

-- 4. decision_nodes (39 nodes)

-- MODULE 1: DIAGNOSIS — IS THIS DKA?
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-start', 'dka', 'question', 1,
 'Suspected Diabetic Ketoacidosis — Diagnosis',
 '**DKA is a life-threatening metabolic emergency.** Defined by the 2024 consensus as: hyperglycemia (glucose >200 mg/dL, or known diabetes) + ketonemia (β-hydroxybutyrate >3 mmol/L or urine ketones 2+) + metabolic acidosis (pH <7.3 and/or bicarbonate <18 mEq/L). [1]

Incidence: ~200,000 cases/year in the US. Mortality: 1-5% in young adults, up to 15% in elderly. Main precipitants: infection (30%), insulin noncompliance (25%), new diabetes diagnosis (20%), SGLT2 inhibitors (5-10%). [1][2]

**KEY:** DKA can present with euglycemia (<200 mg/dL) — increasingly recognized with SGLT2i use. Maintain high suspicion in patients with diabetes and GI symptoms or dyspnea.',
 '[1,2,3]'::jsonb, '[{"label":"Confirmed DKA","description":"Hyperglycemia + ketonemia + acidosis (pH <7.3 or HCO3 <18)","next":"dka-severity-assess","urgency":"critical"},{"label":"Suspected DKA — Workup Needed","description":"Unclear lab findings or euglycemic presentation","next":"dka-workup-labs"},{"label":"Alternative Diagnosis","description":"Hyperglycemia without ketonemia or acidosis","next":"dka-exclude"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-workup-labs', 'dka', 'info', 1,
 'Diagnostic Workup — Laboratory Assessment',
 '**Initial labs for suspected DKA:**

**Acid-base & Electrolytes:**
• Arterial or venous blood gas — pH, HCO3 (reliable on VBG for pH and HCO3)
• Anion gap = Na - (Cl + HCO3). Normal ~10-12. AG >12-14 suggests metabolic acidosis. [2]
• BMP: sodium, potassium, chloride, glucose, BUN, creatinine

**Ketone Assessment (most important for diagnosis):**
• **β-hydroxybutyrate (most specific):** >3 mmol/L = DKA confirmed, 1-3 = moderate ketosis (investigate further), <1 = unlikely DKA [1][2]
• Serum/urine acetoacetate (rapid but less specific)
• Urine dipstick ketones (insensitive, may miss euglycemic DKA)

**Other critical labs:**
• CBC with differential, lactate, phosphate, magnesium
• Urinalysis with culture
• Blood cultures if infection suspected
• ECG (assess for peaked T-waves from hyperkalemia)
• Pregnancy test in reproductive-age females

**Imaging:**
• Chest X-ray if infection suspected or respiratory distress
• Abdominal imaging only if surgical abdomen suspected (DKA itself causes abd pain)

**β-hydroxybutyrate correlation with severity:** >10 mmol/L = severe DKA. [1][3]',
 '[1,2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-bohb-interpret', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-bohb-interpret', 'dka', 'question', 1,
 'β-Hydroxybutyrate Interpretation',
 '**β-hydroxybutyrate (BOHB) is the gold standard for ketone diagnosis.**

Unlike urine/serum acetoacetate or nitroprusside-based "ketones," BOHB:
• Does not miss euglycemic DKA
• Correlates with severity
• Is the predominant ketone produced in DKA
• Is NOT measured by urine dipstick (major cause of false-negative urine ketones in DKA)

**BOHB level interpretation:**
• >3 mmol/L: DKA confirmed — proceed to severity assessment
• 1-3 mmol/L: Moderate ketosis — evaluate for precipitant and other causes of AG acidosis
• <1 mmol/L: Unlikely DKA — consider alternative diagnosis (lactic acidosis, renal failure, alcoholic ketoacidosis)',
 '[1,2]'::jsonb, '[{"label":"BOHB >3 mmol/L","description":"DKA Confirmed","next":"dka-severity-assess","urgency":"critical"},{"label":"BOHB 1-3 mmol/L","description":"Moderate Ketosis","next":"dka-moderate-ketosis"},{"label":"BOHB <1 mmol/L","description":"Unlikely DKA","next":"dka-exclude"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-moderate-ketosis', 'dka', 'question', 1,
 'Moderate Ketosis (BOHB 1-3 mmol/L)',
 '**BOHB in the 1-3 mmol/L range may represent:**

• Early/resolving DKA
• Alcoholic ketoacidosis (history of heavy alcohol use, recent withdrawal, minimal hyperglycemia)
• Starvation ketosis (minimal hyperglycemia, high AG acidosis without severe ketonemia)
• Other AG metabolic acidosis (lactic acidosis, methanol/ethylene glycol, uremia)

**Key discriminators:**
• Glucose level: >200 favors DKA; <150 favors alcoholic ketoacidosis or starvation
• Lactate: elevated suggests lactic acidosis
• Osmolality: >320 increases ICU risk
• pH <7.0 + bicarb <10 = severe metabolic acidosis regardless of BOHB level

**Special case — Euglycemic DKA:**
• Glucose <200 (often 150-250) with BOHB >3 and pH <7.3
• Risk factors: SGLT2 inhibitors, recent illness, insulin dose reduction
• Same treatment as classic DKA but requires earlier recognition',
 '[2,10,11]'::jsonb, '[{"label":"Glucose >200 + AG acidosis","description":"Likely DKA or early presentation","next":"dka-severity-assess","urgency":"urgent"},{"label":"Glucose <150 + high AG acidosis","description":"Suspect alcoholic or starvation ketoacidosis","next":"dka-alt-ketosis"},{"label":"Euglycemic presentation (glucose 150-250)","description":"Euglycemic DKA — SGLT2i risk","next":"dka-euglycemic"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-alt-ketosis', 'dka', 'result', 1,
 'Alternative Ketosis Diagnosis',
 '**If BOHB 1-3 mmol/L with glucose <150 and AG acidosis:**

**Likely diagnoses:**
• **Alcoholic ketoacidosis:** Heavy alcohol use, recent cessation, minimal hyperglycemia, often hypoglycemic. Treatment: dextrose + fluids, NOT insulin. [5]
• **Starvation ketosis:** Prolonged fasting, minimal hyperglycemia, normal lactate. Resolves with oral intake/dextrose.
• **Lactic acidosis:** Check lactate level (>2-4 mmol/L). Elevated lactate + AG acidosis. Different treatment paradigm.

**Management:**
• Hold insulin — may worsen hypoglycemia in alcoholic ketoacidosis
• Start [D5W or D50 bolus](#/drug/dextrose/hypoglycemia) — glucose correction is primary therapy
• IV fluids: NS ± dextrose, thiamine 100 mg IV (25% of patients are thiamine deficient)
• Address underlying cause
• Do NOT treat as DKA — insulin protocol inappropriate

**Lactate check essential:** Lactate >4 mmol/L suggests lactic acidosis requiring different management.',
 '[5,12]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Do not initiate DKA insulin protocol. Give dextrose, IV fluids, thiamine. Hold insulin if hypoglycemic. Treat underlying cause. Lactate level determines lactic acidosis diagnosis.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-exclude', 'dka', 'result', 1,
 'DKA Excluded — Alternative Diagnosis',
 '**If BOHB <1 mmol/L or absence of AG acidosis:**

**Alternative diagnoses to consider:**
• **Hyperglycemic hyperosmolar state (HHS):** Glucose >600, osmolality >320, minimal ketonemia. Risk factors: older age, renal impairment, medication-induced. [9]
• **Diabetic hyperglycemia without ketoacidosis:** Mild hyperglycemia, stress hyperglycemia, or medication-related
• **Non-diabetic AG acidosis:** Lactic acidosis, methanol/ethylene glycol toxicity, salicylate poisoning, uremia

**Management:**
• Treat underlying cause and hyperglycemia
• Do NOT use aggressive DKA insulin protocol
• IV fluids, electrolyte monitoring
• Endocrinology or toxicology consultation PRN

**If HHS suspected:** Slower glucose correction (50 mg/dL/hr), careful fluid balance given osmolality risk.',
 '[1,9]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Exclude DKA confirmed. Identify alternative diagnosis. Adjust treatment accordingly.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;


-- MODULE 2: SEVERITY ASSESSMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-severity-assess', 'dka', 'question', 2,
 'DKA Severity Classification',
 '**DKA severity determines urgency, ICU admission, and management intensity.** [1]

**2024 Consensus Criteria:**

| Severity | pH | HCO3 (mEq/L) | BOHB (mmol/L) | Altered Mental Status? |
|----------|-----|-----|-----|-----|
| **Mild** | 7.25-7.30 | 15-18 | 3-5 | No |
| **Moderate** | 7.00-7.24 | 10-14 | 5-10 | Variable |
| **Severe** | <7.00 | <10 | >10 | Often yes |

**Additional risk factors requiring ICU:**
• Osmolality >320 mOsm/kg (increased risk of cerebral edema in children)
• Presentation in shock (SBP <90, lactate >5, altered MS)
• Age >65 years
• Pregnancy
• Comorbidities (renal failure, cardiac disease, infection)

**Severe DKA pathway:** pH <7.0 or HCO3 <10 requires ICU admission, aggressive management, closer monitoring for complications.',
 '[1,2,5]'::jsonb, '[{"label":"Mild DKA","description":"pH 7.25-7.30, HCO3 15-18, alert and oriented","next":"dka-precipitant-screen"},{"label":"Moderate DKA","description":"pH 7.00-7.24, HCO3 10-14","next":"dka-risk-factors","urgency":"urgent"},{"label":"Severe DKA","description":"pH <7.00, HCO3 <10, or altered mental status","next":"dka-severe-pathway","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-risk-factors', 'dka', 'question', 2,
 'Special Populations & Risk Factors',
 '**Certain populations have higher DKA mortality and require modified management:**

**Higher-risk groups:**
• **Hemodialysis patients:** Euvolemic/hypervolemic, cannot tolerate aggressive fluids, avoid K supplementation
• **Insulin pump users:** Rapid presentation, missed boluses cause rapid DKA
• **Pregnant patients:** DKA can occur at lower glucose (<200), higher fetal mortality, requires ICU/L&D coordination, continuous fetal monitoring
• **SGLT2i-associated:** Euglycemic DKA, may present at glucose 150-300, avoid SGLT2i permanently
• **New diabetes diagnosis:** Often presents with severe DKA; consider HHS overlap

**Comorbidity assessment:**
• Renal impairment (eGFR <30): slower glucose correction, K monitoring
• Heart failure: aggressive fluids increase decompensation risk
• Sepsis: additional ICU admission criterion
• Cerebrovascular disease: osmolality >320 increases stroke risk',
 '[1,2,10,11]'::jsonb, '[{"label":"Standard Risk","description":"No major comorbidities or special populations","next":"dka-precipitant-screen"},{"label":"High Risk — Special Protocol Needed","description":"Pregnancy, HD, pump user, SGLT2i, severe comorbidity","next":"dka-special-protocol","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-severe-pathway', 'dka', 'info', 2,
 'Severe DKA — Immediate Management',
 '**Severe DKA (pH <7.0, HCO3 <10) requires aggressive, immediate intervention:**

**Immediate actions (parallel, do NOT delay):**
• **IV access:** Two large-bore IVs, continuous cardiac monitor
• **Labs:** VBG, CBC, BMP, lactate, BOHB, cultures, UA, EKG
• **Fluids:** [Normal saline](#/drug/saline-0.9%) 500-1000 mL IV bolus over 30-60 min. Reassess HR, BP, perfusion.
• **Insulin:** Consider 10 U IV bolus IF: serum K <5.3 AND pH <6.9 AND delay to insulin drip. Otherwise start drip immediately (see Module 5). [1]
• **Potassium:** Check K level STAT. If <3.3, HOLD insulin and replete K first (critical). If 3.3-5.3, start K repletion concurrent with insulin. [1]
• **Bicarbonate:** Consider IV bicarbonate if pH <6.9 and BOHB >15 — risk of cardiovascular collapse. Hypertonic 8.4% bicarb: 100 mL IV over 5-10 min, recheck pH in 2-4 hrs. [2]

**Disposition:** ICU admission mandatory.
**Monitoring:** Reassess labs q1-2h initially.',
 '[1,2,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-precipitant-screen', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 8)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-special-protocol', 'dka', 'info', 2,
 'Special Population Management Overview',
 '**High-risk populations require protocol modifications to prevent harm:**

**Hemodialysis patients:**
• Problem: Often euvolemic/hypervolemic; aggressive fluid resuscitation causes volume overload, pulmonary edema, hypertension
• Solution: Target fluid resuscitation carefully; may only need insulin + modest fluids + dextrose
• Insulin: Same 0.1 U/kg/hr drip protocol
• Dialysis: Consider during severe DKA for K removal, HCO3 correction, acidosis clearance
• Potassium: Very restricted; use [potassium acetate](#/drug/potassium-acetate/DKA) preferentially over KCl
• Resolution marker: Use BOHB <1 mmol/L, not AG normalization (AG may not normalize in renal disease)

**SGLT2 inhibitor-associated & Euglycemic DKA:**
• Discontinue SGLT2i permanently — high recurrence risk
• Lower glucose threshold for suspicion (<200 acceptable)
• Same insulin + fluid protocol as classic DKA
• Earlier basal glargine to prevent recurrence

**Pregnancy:**
• Higher risk, lower glucose threshold
• Continuous fetal monitoring
• Obstetric & endocrinology co-management
• Insulin demand increases significantly in third trimester — may need 10-20 U/kg/day
• Avoid bicarb if pH >6.9

**Insulin pump users:**
• Rapid onset — often severe at presentation
• Check pump function and infusion set
• Aggressive insulin dosing (iv drip + basal glargine early)
• Transition to basal-bolus SC insulin post-acute phase

**Details for each path available in Module 7.**',
 '[1,10,11,13,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-precipitant-screen', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9)
;


-- MODULE 3: EVALUATE PRECIPITATING CAUSE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-precipitant-screen', 'dka', 'info', 3,
 'Common Precipitating Causes — "Five Is"',
 '**Common triggers for DKA — "Five Is" framework:** [1][2][3]

• **Infection (30-40%):** Most common. Bacterial infection in adults (UTI, aspiration pneumonia, meningitis), viral in children. Fever, WBC >20-25k, bands elevated, CRP >70, lactate >2.
• **Ischemia/Infarction:** Myocardial infarction, stroke, mesenteric ischemia. High mortality.
• **Insulin noncompliance (20-30%):** Missed injections, running out of insulin, deliberate reduction, cost/access issues.
• **Intoxication:** Alcohol withdrawal, cocaine, other drugs. Rare direct DKA cause but common precipitant of noncompliance.
• **Iatrogenic (10-20%):** Steroid use (high-dose corticosteroids, IVIG), SGLT2 inhibitors, some antipsychotics (clozapine), thiazide diuretics.

**~10% have no identifiable precipitant.** [1]

**Workup steps:**
1. History: Fever? Missed insulin? Recent medication changes? Alcohol use? Sick days?
2. Vitals: Fever, tachycardia, hypotension?
3. Labs from diagnostic workup: WBC, bands, lactate, UA for pyuria/nitrites, blood cultures, CXR
4. Abdominal exam: Severe pain out of proportion to mild ketoacidosis argues AGAINST DKA as primary cause',
 '[1,2,3,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-infection-screen', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-infection-screen', 'dka', 'question', 3,
 'Red Flags for Infection?',
 '**DKA impairs immune function — infection may be underappreciated at presentation.**

**Red flags for occult infection:**
• Fever (any temp >38°C is abnormal in DKA and suggests infection)
• WBC >20-25k or <4k
• Bands >10% (left shift)
• Lactate >2 mmol/L (suggests tissue hypoperfusion/infection)
• CRP >70 mg/L (sensitive for bacterial infection)
• Neutrophil-to-lymphocyte ratio (NLR) >15 (strong infection predictor) [7]
• Any focal symptoms: dysuria, cough, throat pain, wound infection

**Sepsis screening:**
• qSOFA: altered mentation, SBP <100, RR ≥22 — if ≥2, sepsis likely
• Blood cultures ×2 if infection suspected
• Urinalysis + culture
• Chest X-ray if respiratory symptoms or any fever

**Important:** Absence of fever does NOT exclude infection in DKA — young, immunocompromised, or severe illness may blunt fever response.',
 '[1,2,7]'::jsonb, '[{"label":"No Infection Red Flags","description":"Afebrile, normal WBC, normal lactate, no focal symptoms","next":"dka-precipitant-other"},{"label":"Possible Infection","description":"Fever, elevated WBC/lactate, focal symptoms","next":"dka-infection-treatment","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-infection-treatment', 'dka', 'info', 3,
 'Infection Management in DKA',
 '**Infection in DKA requires aggressive treatment — high mortality if missed.**

**Empiric antibiotics:**
• Do NOT wait for culture results — start empiric coverage immediately
• **Community-acquired:** [Ceftriaxone](#/drug/ceftriaxone/community-acquired) 1-2 g IV q12h + [azithromycin](#/drug/azithromycin/atypical-coverage) 500 mg IV/PO q24h (covers S. pneumoniae, atypicals, H. influenzae)
• **Hospital-acquired or immunocompromised:** Add [vancomycin](#/drug/vancomycin/gram-positive) 15-20 mg/kg IV q8-12h (MRSA coverage)
• **Aspiration concern:** Add [clindamycin](#/drug/clindamycin/anaerobic) 600 mg IV q6h or [metronidazole](#/drug/metronidazole/anaerobic) 500 mg IV q8h
• **Urinary symptoms:** [Fluoroquinolone](#/drug/fluoroquinolone/UTI) preferred if creatinine normal

**Sepsis management:**
• Aggressive fluids (may exceed typical DKA fluid targets in sepsis)
• Consider vasopressors if shock refractory to fluids (norepinephrine first-line)
• Source control: catheterize for UTI, possible imaging for source
• Repeat lactate in 2-4 hrs

**ICU admission criterion met.** Coordinate infectious disease consultation if not already involved.',
 '[1,2,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-fluid-management', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-precipitant-other', 'dka', 'question', 3,
 'Other Precipitants',
 '**If infection excluded, assess for other triggers:**

**Insulin noncompliance:**
• Missed injections? Patient reports or history?
• Running out of insulin — cost, access, supply issues?
• Intentional reduction?
• Pump failure or disconnection?

**Medication-related (Iatrogenic):**
• Recent steroid initiation or high-dose (prednisone >20 mg/day)? [Dexamethasone](#/drug/dexamethasone/indication) or IV methylprednisolone?
• SGLT2 inhibitors (canagliflozin, dapagliflozin, empagliflozin)? → Permanent discontinuation
• Antipsychotics (clozapine > others)?
• Thiazide diuretics?

**Cardiac/Vascular ischemia:**
• Chest pain, EKG changes, elevated troponin?
• Stroke symptoms?
• Abdominal pain suggesting mesenteric ischemia?

**New diabetes diagnosis:**
• No prior known diabetes, presenting in DKA → often severe, consider HHS overlap, check osmolality
• Check C-peptide/autoimmune markers for type 1 vs type 2

**Alcohol withdrawal or intoxication:**
• History of heavy use, recent cessation?
• Tremor, autonomic instability?
• May also reflect noncompliance with insulin

**Unknown (10% of cases):**
• Supportive care, optimize insulin, monitor for late-presenting infection',
 '[1,2,3]'::jsonb, '[{"label":"Insulin Noncompliance Identified","description":"Missed doses, cost, access issues, pump failure","next":"dka-noncompliance-address"},{"label":"Medication-Related (Steroids, SGLT2i, Antipsych)","description":"New steroid, SGLT2i, or antipsychotic initiation","next":"dka-medication-adjust"},{"label":"Ischemia or Infarction Suspected","description":"Chest pain, EKG changes, abdominal pain","next":"dka-ischemia-workup","urgency":"critical"},{"label":"New Diabetes Diagnosis or Unknown Cause","description":"No prior history or precipitant unclear","next":"dka-fluid-management"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-noncompliance-address', 'dka', 'info', 3,
 'Insulin Noncompliance — Management & Prevention',
 '**High recurrence risk in noncompliance-triggered DKA — requires intervention:**

**During acute phase:**
• Provide insulin pen/vial supply before discharge
• Refer to social work/case management for insulin access programs
• If cost is barrier: Samples from clinic, 340B pharmacy programs, manufacturer copay assistance programs
• If access/storage: Distribute to safe location, deliver to home

**Diabetes education:**
• Reinforce sick-day insulin rules: NEVER stop insulin, even if vomiting
• Recognition of early DKA symptoms (nausea, abdominal pain, dyspnea)
• Insulin storage, rotation, injection technique

**Follow-up plan:**
• Endocrinology or primary care within 1-2 weeks
• Consider insulin pump if basal-bolus noncompliance (single daily pump may improve adherence)
• Behavioral health assessment if intentional noncompliance

**Special consideration:** Recurrent DKA (>2 episodes/year) may indicate mental health crisis, substance use, or homelessness — screening essential. [1][5]',
 '[1,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-fluid-management', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-medication-adjust', 'dka', 'info', 3,
 'Medication-Related DKA — Adjustments',
 '**Remove or modify offending agent if possible:**

**Steroids:**
• If high-dose (prednisone >20 mg/day): Taper rapidly if clinically feasible
• If essential (cancer, autoimmune): Continue, increase insulin doses significantly (may need 10-50% increase or more)
• Educate on insulin adjustment with steroid taper

**SGLT2 Inhibitors:**
• **PERMANENTLY discontinue** — euglycemic DKA recurrence risk very high [10][11]
• Document in allergy section: "SGLT2i-associated DKA"
• Switch to alternative agent (GLP-1 agonist, DPP-4 inhibitor, sulfonylurea if renal function adequate)
• Counsel on euglycemic DKA risk if SGLT2i restarted

**Antipsychotics:**
• If clozapine: Consider switch to other agent if DKA recurs
• Avoid if possible, but if essential for psychiatric stability: Continue with close monitoring
• Increase insulin doses

**Thiazides & Loop Diuretics:**
• May worsen hyperglycemia; consider alternative BP agent if possible
• ACE inhibitor or ARB preferred in diabetes

**Follow-up:** Ensure new medications are not restarted without endocrinology input.',
 '[1,10,11]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-fluid-management', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-ischemia-workup', 'dka', 'info', 3,
 'Ischemic Complications — Evaluation',
 '**DKA in setting of possible ischemia has very high mortality (~30-50%).**

**Myocardial infarction:**
• Troponin I or T (high sensitivity preferred) — check at 0, 3, 6 hours
• Serial EKG
• Echocardiography if ejection fraction uncertain (affects fluid management)
• Consider cardiology consultation
• Management: Cautious fluid resuscitation (HFrEF risk with aggressive fluids), insulin therapy, possible IABP/mechanical support

**Cerebral vascular accident:**
• Head CT (r/o hemorrhage) if altered MS or focal neuro findings
• Consider hyperglycemia as risk factor for worse stroke outcome
• Glucose control essential but avoid overcorrection (>50-70 mg/dL/hr glucose drop)

**Mesenteric ischemia:**
• Severe abdominal pain with minimal exam findings (pain out of proportion)
• Elevated lactate >5, worsening metabolic acidosis despite insulin therapy
• CT angiography abdomen/pelvis if suspicion high
• Surgery consultation if imaging confirms ischemia

**Mortality drivers:** Ischemic events account for 10-15% of DKA deaths. Early recognition and specialist input reduce mortality.',
 '[1,2,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-fluid-management', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;


-- MODULE 4: INITIAL RESUSCITATION — FLUIDS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-fluid-management', 'dka', 'info', 4,
 'Fluid Resuscitation Strategy',
 '**Aggressive but careful IV fluid therapy is cornerstone of DKA management.** [1][2][8]

**Overall strategy:**
• Correct dehydration: Most DKA patients are 5-8L depleted (sometimes >10L in severe DKA)
• Target: Replace half deficit in first 8-12 hours, remainder over next 24 hours
• Monitor: Reassess HR, BP, urine output, perfusion q1-2h
• Adjust based on clinical response

**Fluid choice:**
• **[Normal saline (0.9%)](#/drug/saline-0.9/) — FIRST-LINE:** Preferred in initial resuscitation and ongoing therapy. No dextrose initially.
• Alternative: [Balanced crystalloid (LR, Plasmalyte)](#/drug/balanced-crystalloid/DKA) if available — may reduce hyperchloremic acidosis and NAGMA risk [8]

**Initial bolus:**
• For volume depletion/shock: 500 mL-1 L NS IV bolus over 30-60 min
• Reassess hemodynamics, urine output
• Repeat bolus if needed to achieve HR <100-110, SBP >90-100
• Caution in heart failure, ESRD, pregnancy — use POCUS to assess intravascular volume vs edema

**Ongoing fluids after bolus:**
• Depends on glucose level — see next decision point',
 '[1,2,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-glucose-threshold', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-glucose-threshold', 'dka', 'question', 4,
 'Current Glucose Level?',
 '**Fluid composition changes based on glucose level to prevent hypoglycemia once acidosis resolves.**

**Glucose >300 mg/dL:**
• Continue [normal saline](#/drug/saline-0.9/) at 150-200 mL/hr (or per urine output + insensible losses)
• Goal: Replace remaining deficit gradually
• NO dextrose yet

**Glucose ≤300 mg/dL (most commonly 200-300):**
• This is the critical transition point in DKA
• **"Drop and Split":** Cut NS rate IN HALF + add [D10W](#/drug/dextrose-10%) at equal rate
• Example: If on 200 mL/hr NS → switch to 100 mL/hr NS + 100 mL/hr D10W = 200 mL/hr total
• D10W is safe for peripheral IV (non-vesicant), can Y-site with NS
• Goal: Continue replacing deficit while providing dextrose to prevent hypoglycemia during insulin therapy
• Insulin therapy should NOT stop when glucose drops — reduce rate instead, use dextrose

**Special populations:**
• **Hemodialysis patient:** May require earlier switch to D10W (lower glucose tolerance), minimal NS (volume-overload risk)
• **Pregnancy:** Watch glucose closely — insulin demands increase, need frequent reassessment
• **Osmolality >320:** More cautious fluid resuscitation (cerebral edema risk); reduce rate to 100-150 mL/hr',
 '[1,2,5]'::jsonb, '[{"label":"Glucose >300 mg/dL","description":"Continue NS — no dextrose yet","next":"dka-ns-protocol"},{"label":"Glucose ≤300 mg/dL","description":"\"Drop and Split\" — reduce NS, add D10W","next":"dka-drop-split-protocol"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-ns-protocol', 'dka', 'info', 4,
 'NS Protocol (Glucose >300)',
 '**Continue [normal saline](#/drug/saline-0.9/) at 150-200 mL/hr.**

Monitoring:
• Recheck glucose q1-2h (expect 50-70 mg/dL/hr drop with insulin therapy running)
• UOP goal: 0.5-1 mL/kg/hr
• When glucose reaches ≤300 → **IMMEDIATELY switch to "Drop and Split"** (see next node)
• Do NOT delay dextrose addition — hypoglycemia risk as pH normalizes and insulin continues

Common error: Continuing NS after glucose drops below 300 → severe iatrogenic hypoglycemia despite ongoing acidosis. This is a critical transition point.

Re-evaluate: Any signs of volume overload (crackles, JVD, pulmonary edema)? Reduce rate to 100 mL/hr. Any hypotension despite fluids? Reassess for cardiogenic shock, sepsis, or need for vasopressors.',
 '[1,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-potassium-check', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-drop-split-protocol', 'dka', 'info', 4,
 '"Drop and Split" Protocol (Glucose ≤300)',
 '**At glucose ≤300, implement the critical "Drop and Split" strategy:**

**Action:**
• CUT [normal saline](#/drug/saline-0.9/) rate IN HALF
• ADD [D10W](#/drug/dextrose-10/) at EQUAL rate to dropped NS rate
• Example: 200 mL/hr NS → becomes 100 mL/hr NS + 100 mL/hr D10W

**Why this works:**
• Continues deficit replacement with dextrose to prevent hypoglycemia
• Glucose typically drops 5-10 mg/dL/min once acidosis improving and glucose clearance increases
• Allows insulin infusion to continue (CRITICAL) — stopping insulin can paradoxically worsen acidosis even if glucose normalized
• Once dextrose running, hypoglycemia risk minimal

**D10W peripheral IV safety:**
• D10W is NON-vesicant — safe for peripheral IV
• Can Y-site with NS in same line (preferred — fewer IVs)
• Do NOT use for CVL extravasation concern

**Reassessment every 1-2 hours:**
• If glucose <150 → increase D10W rate or decrease NS further
• If glucose >300 again → switch back to full-rate NS without dextrose

**Critical point:** This transition is where most iatrogenic hypoglycemia in DKA occurs. Earlier switch = safer.',
 '[1,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-potassium-check', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-hemodialysis-fluid', 'dka', 'result', 4,
 'Hemodialysis Patient — Fluid Protocol',
 '**Hemodialysis patients often euvolemic or hypervolemic — aggressive fluids cause harm:**

**Assessment:**
• POCUS or clinical exam: JVD, edema, crackles?
• Weight compared to dry weight
• Recent dialysis: When was last session? Any fluid removal?

**Modified fluid strategy:**
• Very cautious initial bolus: 250-500 mL NS only if hypotensive
• Maintenance: Minimal — often 50-100 mL/hr NS (smaller total than non-HD DKA)
• Often can omit separate fluids if on scheduled HD during DKA treatment

**Insulin + dextrose approach:**
• Start insulin drip per standard protocol (0.1 U/kg/hr)
• Add [D10W or D5W](#/drug/dextrose/) to provide calories/glucose without volume burden
• Minimal or no NS — insulin + dextrose often sufficient

**Potassium management:**
• Very restricted — DO NOT supplement even if K normal (paradoxically rises with acidosis correction)
• Use [potassium acetate](#/drug/potassium-acetate/DKA) if any supplementation necessary (preferred over KCl to reduce Cl load)

**Dialysis timing:**
• Consider dialysis during severe DKA (pH <6.9, K >6.5, bicarb <5) for acid/K removal and hemodynamic support
• Coordinate with nephrology

**Resolution:** Use BOHB <1 mmol/L (not AG normalization) as stopping point.',
 '[1,2,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Minimal fluid resuscitation in HD patient. Insulin + dextrose protocol. Restricted K. Consider dialysis for severe DKA. Coordinate with nephrology.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;


-- MODULE 5: INSULIN MANAGEMENT & POTASSIUM
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-potassium-check', 'dka', 'question', 5,
 'Serum Potassium Level — Critical Gate',
 '**Potassium is the MOST CRITICAL electrolyte in DKA — wrong management is fatal.**

**Paradox of DKA potassium:**
• Presents with NORMAL or HIGH potassium despite total-body K depletion (often 1-2 L deficit)
• Why? Acidosis shifts K OUT of cells — ECF K appears high, but ICF K is LOW
• When insulin + bicarbonate given → K shifts BACK into cells → severe hypokalemia develops (risk of arrhythmia, cardiac arrest)
• Therefore: HOLD insulin if K <3.3, or DELAY insulin start until K repleted to >3.3

**Potassium tiers:**
• **K <3.3 mEq/L (HYPOKALEMIA):** HOLD insulin until K >3.3 — CRITICAL urgency [1]
• **K 3.3-5.3 mEq/L (NORMAL/MILD LOW):** Safe to start insulin WITH concurrent K repletion [1]
• **K >5.3 mEq/L (HYPERKALEMIA):** Safe to start insulin immediately (insulin will bring K down) [1]

**EKG findings correlate with danger:**
• K >6: peaked T-waves
• K >7: prolonged PR, widened QRS, atrial fibrillation possible
• Physiology: Insulin + bicarb will LOWER K further → life-threatening hypokalemia if started without K repletion

**ACTION:** If K <3.3, potassium chloride (KCl) or potassium acetate must be given BEFORE insulin infusion starts.',
 '[1,2,5,12]'::jsonb, '[{"label":"K <3.3 mEq/L","description":"HYPOKALEMIA — HOLD insulin","next":"dka-hypokalemia-protocol","urgency":"critical"},{"label":"K 3.3-5.3 mEq/L","description":"Normal/mild low — start insulin WITH K repletion","next":"dka-insulin-start"},{"label":"K >5.3 mEq/L","description":"Hyperkalemia — start insulin immediately","next":"dka-insulin-start"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-hypokalemia-protocol', 'dka', 'info', 5,
 'Hypokalemia Management (K <3.3)',
 '**CRITICAL: Do NOT start insulin until K >3.3 — fatal arrhythmias if K falls further.**

**Aggressive potassium repletion:**
• **[Potassium chloride (KCl)](#/drug/kcl/DKA) IV:** 40 mEq/hr maximum (or potassium acetate if preferring to avoid Cl load)
• Goal: Bring K to 3.3-3.5 before insulin starts
• Check K q1-2h during repletion — often need 40-80 mEq to raise K by 0.5-1 mEq/L
• Do NOT trust estimates — must recheck lab

**Oral potassium (if tolerating PO):**
• [Potassium chloride solution or salt substitute](#/drug/kcl/oral) 60 mEq q2-4h
• Much slower but useful adjunct if GI tolerant

**Cardiac monitoring:**
• Continuous monitor if possible
• Watch for peaked T-waves, prolonged PR
• Do NOT rely on EKG — renal or acid-base factors affect threshold

**When insulin becomes safe:**
• Once K >3.3, proceed to insulin protocol
• But continue aggressive K repletion SIMULTANEOUSLY
• Insulin lowers K rapidly once given — need replacement drip running during insulin infusion

**Time consideration:** May delay insulin 1-2 hours to replete K — this is appropriate and safer than rushing insulin with low K.',
 '[1,5,12]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-k-repleted', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 23)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-k-repleted', 'dka', 'info', 5,
 'K Repleted — Now Safe for Insulin',
 '**Once K >3.3, insulin infusion can now be started safely.**

But REMEMBER: Insulin will lower K further. You must:
• Continue potassium supplementation DURING insulin therapy
• Target serum K >5 mEq/L during acute phase (normal renal function)
• Check K q1-2h × 4-6 hrs, then q4h
• Adjust K supplementation based on trending

**Proceed to DKA insulin protocol (next node).**',
 '[1,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-insulin-start', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 24)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-insulin-start', 'dka', 'info', 5,
 'Insulin Infusion Protocol',
 '**Standard DKA insulin regimen:**

**Dosing:**
• [Regular insulin](#/drug/insulin-regular/DKA) IV infusion: **0.1 U/kg/hr** (starting dose, max 15 U/hr for safety)
• Example: 70 kg patient → 7 U/hr. 100 kg patient → 10 U/hr.
• Prepare: 100 units insulin in 100 mL normal saline = 1 U/mL solution. Use dedicated insulin drip IV (separate from fluid lines if possible to avoid delays in rate adjustment)

**Bolus insulin (optional, consider if):**
• 10 U IV bolus of regular insulin IF any of:
  - Severe hyperkalemia (K >6.5) — insulin helps drive K into cells
  - Severe acidosis (pH <6.9 or BOHB >15)
  - Significant delay to drip establishment
• Bolus is NOT required if drip starting immediately

**Titration:**
• Goal: Glucose drop 50-70 mg/dL per hour [1]
• Reassess glucose q1-2h
• If glucose dropping too slowly (<50 mg/dL/hr): Increase drip to 0.15 U/kg/hr or 15-20 U/hr
• If glucose dropping too fast (>100 mg/dL/hr): Decrease drip; increase dextrose rate

**When glucose reaches ~250 mg/dL:**
• Reduce insulin to 0.05 U/kg/hr (holding rate, roughly 5 U/hr for 100 kg patient)
• Continue until acidosis resolved (see stopping criteria)

**Critical rule:** NEVER stop insulin even if glucose <100 — give MORE DEXTROSE instead. Continue insulin until acid-base normalized.',
 '[1,2,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-basal-insulin', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 25)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-basal-insulin', 'dka', 'info', 5,
 'Early Basal Insulin (Glargine)',
 '**Give basal insulin on admission — this is critical to prevent recurrent DKA.**

**Timing:** Administer [insulin glargine](#/drug/insulin-glargine/DKA basal) within first 6-12 hours of DKA presentation. Do NOT wait until glucose normalized or acidosis resolved.

**Dosing:**
• **Known diabetes on insulin:** Use home insulin glargine dose if known (or home total daily insulin × 0.5 if not on glargine)
• **New diagnosis or dose unknown:** 0.25 U/kg once daily (example: 70 kg → 17-18 units once daily)
• Some experts use 0.3 U/kg for new diagnosis
• Starting glargine is SEPARATE from IV insulin drip — not calculated from drip rate

**Why so early?**
• IV insulin drip stops once acidosis resolves, but patient still has insulin requirement
• Basal insulin prevents relapse (DKA recurrence common if basal not given)
• Provides 24-hour coverage while transitioning from drip

**Administration:**
• [Insulin glargine (Lantus, Basagam)](#/drug/insulin-glargine/) SC daily (preferred: evening, or AM if long-acting preferred)
• Can overlap with IV drip — no problem

**Transition planning (later, see Module 6):** Transition from drip to basal + bolus SC insulin once patient eating and stable.',
 '[1,5,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-electrolytes-monitor', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 26)
;


-- MODULE 6: ELECTROLYTES & MONITORING
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-electrolytes-monitor', 'dka', 'info', 6,
 'Electrolyte Management & Monitoring',
 '**Aggressive potassium and phosphate/magnesium repletion is essential to prevent complications.**

**Potassium Target:**
• Goal: Maintain K >5 mEq/L during acute DKA (normal renal function) [1]
• Aggressive repletion: [Potassium acetate](#/drug/potassium-acetate/DKA) IV (preferred over KCl to reduce chloride load and NAGMA risk) or [potassium chloride](#/drug/kcl/DKA)
• IV: 40 mEq/hr maximum, or oral potassium citrate 60 mEq q2-4h [1]
• Can give up to 40 mEq/hr IV with continuous cardiac monitoring if aggressive repletion needed
• Check K q1-2h × 6 hours, then q4h minimum

**Magnesium & Phosphate:**
• Check both on admission and q4-6h during acute phase
• Repletion needed: Mg <1.5 mg/dL or Phos <1.5 mg/dL
• [Magnesium sulfate](#/drug/magnesium/DKA): 1-2 g IV over 10-15 min (recheck after 2-4 hrs) [1]
• Phosphate repletion: Often done PO if tolerating (K2PO4 salt, 30 mmol q2-4h) or IV if severe
• Both common in DKA — 25-50% of patients are Mg/Phos depleted

**Thiamine (Vitamin B1):**
• Give [thiamine](#/drug/thiamine/DKA) 100 mg IV on admission — 25% of DKA patients are thiamine deficient [1]
• Prevents Wernicke encephalopathy if alcohol history

**Monitoring Schedule:**
• Glucose: q1-2h × 4h, then q2-4h
• BMP (Na, K, Cl, HCO3): q2-4h until improving, then q4-6h
• Mg, Phos, Ca: admission + q4-6h
• Lactate: q4h if elevated initially
• VBG: q2-4h to assess pH, HCO3 progress
• EKG: admission, and if K abnormal
• BOHB or serum ketones: q4-6h (optional but useful)

**Trend interpretation:**
• AG should decrease as insulin works (ketones being metabolized)
• HCO3 should rise gradually
• Glucose should drop 50-70 mg/dL/hr',
 '[1,2,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-nagma-screen', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 27)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-nagma-screen', 'dka', 'question', 6,
 'NAGMA (Hyperchloremic Acidosis) — Screen?',
 '**Normal anion gap metabolic acidosis (NAGMA) complicates ~30% of DKA cases as AG closes.**

**What is NAGMA?**
• Normal or low AG acidosis that develops as ketoacidosis improves
• Caused by: aggressive normal saline (chloride load), urinary bicarb losses, impaired renal excretion
• Delayed resolution — patient may seem "stuck" with persistent acidosis despite improving ketones

**Detection:**
• Calculate predicted final bicarb: **Predicted final HCO3 = Na - Cl - 10** (chloride is the anion replacing HCO3)
• Example: Na 140, Cl 110 → predicted final HCO3 = 140 - 110 - 10 = 20 mEq/L
• If this predicted value is <<20 (like 15-17), patient has NAGMA already or developing

**Risk factors:**
• High-dose normal saline infusion
• Hyperchloremia (Cl >110-115)
• Severe initial acidosis requiring large NS volumes
• Renal dysfunction

**Clinical significance:**
• Slows acidosis resolution (limits recovery to HCO3 ~18-20 despite resolved ketonemia)
• May require bicarbonate therapy to speed recovery
• Does NOT change DKA treatment but explains delayed recovery',
 '[1,2]'::jsonb, '[{"label":"No NAGMA Developing","description":"Cl <110, predicted final HCO3 >20, good AG closure","next":"dka-stopping-criteria"},{"label":"NAGMA Present or Developing","description":"Hyperchloremia, predicted final HCO3 <20, slow HCO3 recovery","next":"dka-nagma-treatment"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 28)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-nagma-treatment', 'dka', 'info', 6,
 'NAGMA Treatment — IV Bicarbonate',
 '**If NAGMA present (Cl >110 or predicted final HCO3 <20), consider IV bicarbonate to speed resolution.**

**Timing:**
• Usually appears when initial acidosis improving (AG closing) and pH 7.15-7.30 range
• Can start IV bicarb once AG <12 and HCO3 rising
• Goal: Raise bicarb to >18-20

**Bicarbonate Dosing Options:**

**Option 1: Isotonic bicarbonate (preferred)**
• [Sodium bicarbonate](#/drug/sodium-bicarbonate/DKA) 250 mL of isotonic solution (150 mEq/L bicarb in 250 mL D5W) IV at 250 mL/hr
• Infuse until HCO3 >18-20
• Gentler, lower hypernatremia risk

**Option 2: Hypertonic bicarbonate (for urgent correction)**
• [Sodium bicarbonate](#/drug/sodium-bicarbonate/DKA) ampules: 50 mEq in 50 mL (8.4%) IV over 5-10 min
• Can repeat q2-4h if HCO3 still <18
• Higher hypernatremia risk — use cautiously

**Monitoring:**
• Check BMP q2-4h to assess HCO3 rise
• Watch sodium (risk of hypernatremia from bicarbonate)
• Continue insulin, K repletion, fluids
• Often can transition off drip once HCO3 >18

**Controversial:** Some experts avoid routine bicarb unless pH <7.0; others use when HCO3 <10. Use clinical judgment.',
 '[1,2,5,9]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-stopping-criteria', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 29)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-stopping-criteria', 'dka', 'info', 6,
 'DKA Resolution — Stopping Insulin Infusion',
 '**ALL of the following criteria must be met to stop IV insulin and transition to SC insulin:**

**Stopping criteria (modified from ADA 2024):** [1]
1. **Anion gap <12** (essentially normalized, or approaching normal for chronic renal disease)
2. **Serum bicarbonate ≥18 mEq/L** (or ≥15-20 if NAGMA present, pH >7.30)
3. **Basal insulin given** (glargine or equivalent) at least 2 hours prior to stopping drip — ensures 24-hour coverage
4. **Glucose <250 mg/dL** (well-controlled)
5. **Patient tolerate oral intake** (able to eat, holding down food/fluids) — critical for transition to meal-associated insulin

**Do NOT stop insulin if:**
• Any single criterion not met
• Patient still vomiting — cannot absorb SC insulin
• Acidosis worsening or not improving
• K still critically low despite repletion

**Transition protocol:**
• Once all criteria met, stop IV insulin drip
• Continue basal glargine (given on admission)
• Start meal-time insulin: regular insulin or rapid-acting (aspart, lispro) with meals
• Sliding scale insulin for glucose >150: 2-4 units per 50 mg/dL above 150
• Target glucose 120-180 mg/dL during hospitalization

**Timing:** Usually 12-24 hours from presentation if no complications. Longer if severe DKA or complications present.',
 '[1,2,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-disposition-plan', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 30)
;


-- MODULE 7: SPECIAL SCENARIOS & DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-euglycemic', 'dka', 'result', 7,
 'Euglycemic DKA Management',
 '**Euglycemic DKA: glucose 150-250 + BOHB >3 + pH <7.3, often with SGLT2i use.**

**Presentation:**
• Minimal hyperglycemia (may be euglycemic or only mildly elevated) — easily missed!
• Nausea, vomiting, dyspnea, abdominal pain
• Risk factors: SGLT2 inhibitors (primary), insulin pump with reduced basal dose, GLP-1 use, illness with reduced eating
• Diagnosis: BOHB >3, pH <7.3, low-normal glucose

**Unique management:**

**Fluids:**
• Start [D10W or D5W](#/drug/dextrose/) immediately — do NOT wait for glucose to drop
• Euglycemic DKA requires dextrose infusion from the START (unlike classic DKA which waits for glucose 200-300)
• [Normal saline](#/drug/saline-0.9/) at 100-150 mL/hr PLUS [D10W](#/drug/dextrose/) at 100-150 mL/hr
• Goal: Prevent further glucose drop while treating acidosis

**Insulin:**
• 0.1 U/kg/hr IV drip (same as classic DKA)
• Titrate to pH/HCO3 improvement, not glucose
• Glucose may actually decrease during early treatment (insulin + dextrose in parallel manages this)

**Potassium & Electrolytes:**
• Same aggressive approach as classic DKA
• Check K early and often

**Basal insulin:**
• [Insulin glargine](#/drug/insulin-glargine/DKA) 0.25 U/kg on admission

**CRITICAL: Discontinue SGLT2i permanently** — very high recurrence risk. Document as contraindication. [10][11]

**Disposition:** ICU admission if pH <7.15 or altered mental status. Many cases can be managed on monitored floor bed with closer monitoring.',
 '[10,11,13]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Start D10W immediately. IV insulin 0.1 U/kg/hr. Aggressive K repletion. Discontinue SGLT2i permanently. Monitor closely for late hypoglycemia.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 31)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-intubation', 'dka', 'info', 7,
 'Intubation in DKA — Avoid if Possible',
 '**Intubation in DKA is HIGH RISK and generally avoided unless absolutely necessary.** [5]

**Why avoid intubation:**
• Removal of spontaneous hyperventilation → paradoxical CO2 retention and acidosis worsening
• Positive pressure ventilation increases PEEP → worse acidosis
• Risk of post-intubation hypotension despite fluids (loss of sympathetic tone)
• Aspiration risk if altered MS or vomiting
• Prolongs ICU stay

**Indications for intubation (rare in pure DKA):**
• Loss of airway protective reflexes + inability to protect
• Respiratory failure (RR >35-40 with fatigue, inadequate gas exchange on ABG)
• Severe altered mental status with risk of aspiration
• Aspiration event already occurred
• Septic shock requiring pressors (not DKA alone)

**If intubation unavoidable:**

**Preoperative management:**
• AGGRESSIVE pre-intubation resuscitation — 1-2L fluid bolus if not already given
• [Intravenous bicarbonate](#/drug/sodium-bicarbonate/DKA): Consider if pH <6.9 prior to intubation
• Correct severe hyperkalemia (K >6.5) with insulin bolus

**Drug selection:**
• Induction: [Ketamine](#/drug/ketamine/induction) preferred (maintains BP, does not worsen acidosis)
• Avoid propofol (myocardial depression), avoid theophylline derivatives

**Ventilation post-intubation:**
• High minute ventilation (MV): 12-18 L/min to maintain hyperventilation 
• Large ETT: ≥7.5 to allow high tidal volumes without excessive pressure
• Mode: Assist-control (not pressure-limited)
• PEEP: Minimize (0-5 cm H2O)

**Monitoring:** Frequent ABGs (q30min × 2h, then q1-2h), K monitoring, sedation adequate to allow hyperventilation',
 '[1,2,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'dka-disposition-plan', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 32)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-recurrent', 'dka', 'result', 7,
 'Recurrent DKA (Prior Episode)',
 '**Recurrent DKA (≥2 episodes in 12 months) is a marker of adherence, psychiatric, or social problems with very high mortality (~5-10% per episode).**

**Management differs from first presentation:**

**Acute phase:**
• Same insulin protocol (0.1 U/kg/hr drip or higher if needed)
• Aggressive K repletion — maintain K >5 throughout
• TREAT NAGMA aggressively with IV bicarbonate (more likely to develop in recurrent cases)
• Higher threshold for ICU admission — coordinate psychiatry/social work early

**Basal insulin intensification:**
• Significantly uptitrate [insulin glargine](#/drug/insulin-glargine/DKA) at discharge
• May need 0.4-0.5 U/kg/day (higher than standard new-onset doses)
• Consider basal-bolus therapy (basal glargine + meal-time rapid-acting insulin)
• Consider insulin pump if on MDI (some patients adhere better to pump)

**Addressing root cause:**
• **Psychiatric evaluation:** Screen for depression, bipolar disorder, anxiety — DKA often triggered by psychiatric crisis or substance use
• **Behavioral health referral:** Therapy, crisis plan, medication optimization
• **Social work:** Address food insecurity, housing, healthcare access, insurance
• **Substance use screening:** Alcohol, opioids, stimulants — may precipitate missed insulin doses
• **Provider continuity:** Assign primary care and endocrinology team to reduce fragmentation

**Education:**
• Intensive diabetes education (some patients benefit from home health nursing)
• Sick-day rules written down and reviewed
• Emergency contact numbers — encourage use before ER visit

**Disposition:** Admission to monitored bed (or ICU if severe). Psychiatry, case management, and endocrinology consults mandatory before discharge. Discharge directly to outpatient support (not home alone).',
 '[1,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'ICU or monitored admission. Aggressive basal insulin uptitration. Psychiatry evaluation and referral. Social work intervention. Address adherence barriers. Endocrinology continuity.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 33)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-hd-patient-result', 'dka', 'result', 7,
 'Hemodialysis Patient — Detailed Protocol',
 '**HD patients with DKA have unique needs: euvolemia/hypervolemia, limited K tolerance, accelerated correction possible via dialysis.**

**Pathophysiology:**
• Usually euvolemic or hypervolemic — aggressive fluids cause pulmonary edema, hypertensive crisis
• K does NOT drain into dialysate if K concentration in bath = patient K (thus K may rise despite dialysis if not on low-K bath)
• Acidosis can be corrected rapidly via hemodialysis (HCO3 diffusion and lactate clearance)

**Fluid management:**
• MINIMAL: 250-500 mL NS bolus only if hypotensive (SBP <90)
• Maintenance: 50-100 mL/hr NS at most, often no separate NS infusion
• Primary therapy: Insulin + dextrose

**Insulin:**
• 0.1 U/kg/hr IV drip (standard)
• Once glucose <300 → switch to D10W (minimal NS)
• Do NOT restrict insulin based on glucose alone — titrate to acid-base improvement

**Potassium:**
• VERY restrictive — do NOT supplement potassium even if K 4.5-5.5 (high end normal)
• May only need [potassium acetate](#/drug/potassium-acetate/DKA) if K <3.0 (rare)
• Use LOW-potassium dialysate bath (usually 1-2 mEq/L)
• Coordinate dialysis K bath with nephrology

**Dialysis integration:**
• Schedule dialysis within first 4-6 hours of DKA diagnosis if available
• Hemodialysis rapidly corrects K, H+, and metabolic acidosis (much faster than IV therapy alone) [1]
• Dialysate composition: Low K bath (1 mEq/L) + bicarb bath 35-40 mEq/L
• May need higher blood flow (300-400 mL/min) during DKA

**Resolution criteria (differ from non-HD):**
• Use **BOHB <1 mmol/L** as resolution marker (not AG normalization — AG may not close with renal disease)
• May discharge when BOHB <1, able to eat, K stable, prior bicarb level achieved
• pH <7.30 acceptable if trending up and BOHB very low

**Disposition:** Monitored bed (ICU if severe). Nephrology co-management. Dialysis as first-line for severe DKA (pH <6.9, K >6.5).',
 '[1,2,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Minimal fluid resuscitation. Insulin + dextrose protocol. Restrict K. Coordinate dialysis STAT for K/acid removal. Use BOHB <1 for resolution. Nephrology co-management.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 34)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-disposition-plan', 'dka', 'question', 7,
 'Disposition Planning',
 '**DKA severity, presence of complications, and social stability determine discharge vs admission level.**

**ICU admission criteria:**
• pH <7.1 or HCO3 <10 (severe DKA)
• Altered mental status (GCS <13)
• Respiratory distress (RR >30, O2 requirement, considered for intubation)
• Hemodynamic instability (SBP <90 despite fluids, need vasopressors)
• Complications: myocardial infarction, stroke, mesenteric ischemia, sepsis
• Recurrent DKA or behavioral/psychiatric crisis
• Age >65 with comorbidities
• Pregnancy
• ESRD/HD patient
• Osmolality >320

**Monitored floor bed criteria:**
• Mild-moderate DKA (pH 7.00-7.30, HCO3 10-18)
• Stable hemodynamics
• Alert and oriented
• No acute complications
• Social stability (home support, follow-up capability)

**Step-down to general floor (rare, usually still needs monitoring):**
• Well-controlled glucose on SC insulin
• Eating well
• No complications
• Very mild presentation (pH >7.25 only)

**Discharge direct from ED (extremely rare):**
• Very mild DKA (pH ~7.25-7.30, minimal symptoms)
• Reliable patient, good support system
• Can follow up within 24 hours with primary care + endocrinology
• Most DKA patients should be admitted for monitoring',
 '[1,2,5]'::jsonb, '[{"label":"ICU Admission","description":"Severe DKA, complications, hemodynamic instability, altered MS","next":"dka-icu-orders","urgency":"critical"},{"label":"Monitored Floor Admission","description":"Moderate DKA, stable hemodynamics, alert, no complications","next":"dka-floor-orders"},{"label":"Consider Discharge Planning","description":"Very mild DKA, excellent adherence history, strong support","next":"dka-discharge-planning"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 35)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-icu-orders', 'dka', 'result', 7,
 'ICU Admission Orders',
 '**ICU-level DKA management:**

**Monitoring:**
• Continuous cardiac monitor, pulse oximetry, capnography if intubated
• Arterial line if shock or severe acidosis (pH <6.9)
• Hourly vitals, UOP q1h, neuro q1h
• Labs: VBG/ABG q1-2h × 4h, then q2-4h. BMP q2h × 6h then q4h. Lactate q4h. BOHB q4-6h

**Medications:**
• [Regular insulin IV drip](#/drug/insulin-regular/DKA): 0.1 U/kg/hr (adjust per protocol)
• [Insulin glargine](#/drug/insulin-glargine/DKA) 0.25-0.3 U/kg SC daily (given on admission)
• [Potassium chloride or acetate IV](#/drug/kcl/DKA): Aggressive repletion (40 mEq/hr if K <3.3, then maintenance per K level)
• [Normal saline or balanced crystalloid](#/drug/saline-0.9/): IV bolus then maintenance (or switch to D10W once glucose <300)
• [Magnesium sulfate](#/drug/magnesium/DKA): 1-2 g IV once if Mg <1.5
• [Thiamine](#/drug/thiamine/DKA): 100 mg IV on admission
• Consider [sodium bicarbonate](#/drug/sodium-bicarbonate/DKA) if pH <6.9 (250 mL isotonic or ampules)

**Consultations:**
• Endocrinology (mandatory)
• Nephrology if ESRD/HD or worsening Cr
• Cardiology if troponin elevated or EKG abnormal
• Infectious disease if sepsis confirmed
• Psychiatry if recurrent DKA or suicidal ideation

**Disposition trigger:** When stable (pH >7.25, HCO3 >15, glucose controlled, tolerating PO), stepdown to monitored floor; discharge when all stopping criteria met.',
 '[1,2,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'ICU admission. Hourly reassessment. Insulin + aggressive electrolyte repletion. Endocrinology, and specialist consultations as indicated. Serial labs q1-4h.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 36)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-floor-orders', 'dka', 'result', 7,
 'Monitored Floor Admission Orders',
 '**Moderate DKA on monitored medical floor:**

**Monitoring:**
• Continuous cardiac monitor + continuous pulse oximetry
• Vitals q2h, UOP q1h
• Labs: VBG/ABG q2-4h initially, then q4-6h. BMP q2-4h × 6h then q6h. Lactate q4-6h initially.
• Neuro checks q2-4h (watch for cerebral edema — rare but catastrophic)

**Medications:**
• [Regular insulin IV drip](#/drug/insulin-regular/DKA): 0.1 U/kg/hr IV (adjust per glucose response)
• [Insulin glargine](#/drug/insulin-glargine/DKA) 0.25 U/kg SC daily (given on admission)
• [Potassium chloride or acetate IV](#/drug/kcl/DKA): 20-40 mEq/hr per K level (goal K >5)
• [Normal saline](#/drug/saline-0.9/) then [D10W](#/drug/dextrose/) per "drop and split" protocol
• [Magnesium sulfate](#/drug/magnesium/DKA): 1-2 g IV if Mg low
• [Thiamine](#/drug/thiamine/DKA): 100 mg IV on admission

**Consultations:**
• Endocrinology (routine, can consult next business day if needed)
• Case management/social work (address precipitants, discharge planning)
• Psychiatry if recurrent DKA or mental health concern

**Diet/Activity:**
• NPO until tolerating PO and glucose <250
• Once able to eat: start meal-associated insulin (regular or rapid-acting 2-4U with meals)
• Add sliding scale (2-4 U per 50 mg/dL glucose >150)

**Discharge criteria:**
• All DKA stopping criteria met (AG <12, HCO3 >18, basal insulin given 2+ hrs ago, glucose <250, tolerating PO)
• Stable glucose on SC insulin ×2-4 doses
• Patient education completed
• Follow-up arranged (endocrinology within 1-2 weeks, PCP within 1 week)
• Discharge medications and sick-day rules provided',
 '[1,2,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit to monitored floor. Insulin + electrolyte protocol. Endocrinology and case management consults. Discharge when stopping criteria met + patient stable on SC insulin.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 37)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('dka-discharge-planning', 'dka', 'result', 7,
 'Discharge Planning & Follow-Up',
 '**For very mild DKA (pH >7.25, HCO3 >15) in highly reliable patient with excellent support:**

**Discharge checklist (ALL must be met):**
• ✓ DKA resolved per stopping criteria (AG <12, HCO3 >18, tolerating PO, glucose <250)
• ✓ Stable on SC basal + bolus insulin ×2-4 doses
• ✓ Electrolytes normal (K 3.5-5.5, Mg >1.5, Phos >1.5)
• ✓ Understanding of sick-day rules
• ✓ Adequate insulin supply (pens, vials, syringes, or pump supplies)
• ✓ Emergency glucagon kit or similar hypoglycemia rescue
• ✓ Reliable transportation
• ✓ Phone access for follow-up calls
• ✓ Identified prescriber (PCP or endocrinologist)

**Discharge medications:**
• [Insulin glargine](#/drug/insulin-glargine/maintenance) (basal) — dose from hospitalization
• Rapid-acting or regular insulin (bolus) — meal-time dosing
• Metformin or other agents if not contraindicated (often held during acute phase, restart if GFR adequate)

**Discharge education (written):**
• **Sick-day rules:** Never skip insulin even if unable to eat; use dextrose instead of meal
• **Hypoglycemia symptoms & glucagon use:** When to call 911 vs treat at home
• **Hyperglycemia warning signs:** Nausea, dyspnea, fruity breath — seek care immediately
• **Insulin administration:** Injection technique, storage, expiration
• **Dietary guidelines:** Regular meals, hydration, carbohydrate consistency
• **Exercise:** Adjust insulin for activity, carry fast carbs

**Follow-up (CRITICAL):**
• **Endocrinology:** Appointment within 2-4 weeks
• **Primary care:** Within 1 week
• **Diabetes educator:** Within 1-2 weeks (certified educators preferred)
• **Case management:** Phone call within 24 hours to confirm discharge arrangements

**Documentation:**
• Precipitant clearly documented
• Discharge summary includes basal + bolus insulin regimen, K level at discharge, glucose trend
• Copy to endocrinologist + PCP

**Return precautions (written & verbal):**
• Nausea/vomiting >2 episodes
• Dyspnea or chest pain
• Altered mental status
• Inability to take insulin or eat for 2+ hours
• Glucose >400 despite insulin
• Fever or signs of infection
• Any DKA symptoms: fruity breath, severe fatigue, abdominal pain',
 '[1,2,5,15]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Discharge to home with strong outpatient support. Insulin supply + glucagon kit. Written sick-day rules & warning signs. PCP + endocrinology within 1-2 weeks. Case management follow-up call within 24h.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 38)
;

COMMIT;
