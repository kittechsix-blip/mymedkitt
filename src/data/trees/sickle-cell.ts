// Sickle Cell Disease — ED Management
// Source: EB Medicine Pediatric Emergency Medicine Practice, Nov 2024
// Authors: Jackson KM, Beamon B, Crawford EB, Burroughs ZT
// Cross-listed: Heme/Onc + Pediatrics

import type { DecisionNode } from '../../models/types';

interface Citation {
  num: number;
  text: string;
}

// ============================================================
// MODULE 1: Presentation & Triage
// ============================================================

export const SICKLE_CELL_NODES: DecisionNode[] = [
  {
    id: 'scd-start',
    type: 'question',
    module: 1,
    title: 'Sickle Cell Disease — ED Management',
    body: '[SCD Steps Summary](#/info/scd-steps-summary)\n\nSickle cell disease (SCD) affects ~100,000 Americans. Occurs in ~1 of 365 Black/African American births and ~1 of 16,300 Hispanic American births. [1][2]\n\nMultiple acute complications can affect any organ system. Prompt recognition and management reduces morbidity and mortality. [1][3]\n\n[SCD Genotypes & Severity](#/info/scd-genotypes)\n\n**Key History to Obtain:**\n• SCD genotype (HbSS, HbSC, HbSβ0, HbSβ+)\n• Baseline hemoglobin (HbSS: 6–8 g/dL, HbSC: 10–15 g/dL)\n• Prior complications (ACS, stroke, splenic sequestration)\n• Individualized pain plan from hematologist\n• Immunization status (PCV, meningococcal) + penicillin prophylaxis\n• Hydroxyurea use, last transfusion, last HbS%\n• Pregnancy status',
    citation: [1, 2, 3],
    calculatorLinks: [{ id: 'scd-triage', label: 'SCD Triage Calculator' }],
    options: [
      { label: 'Pain Crisis (VOC)', description: 'Most common SCD ED presentation', next: 'scd-voc-start' },
      { label: 'Fever ≥ 38.5°C', description: 'Medical emergency — functional asplenia', next: 'scd-fever-start', urgency: 'urgent' },
      { label: 'Respiratory / Chest Pain', description: 'Evaluate for acute chest syndrome', next: 'scd-acs-start', urgency: 'urgent' },
      { label: 'Neurologic Symptoms', description: 'Focal deficit, altered mental status, seizure', next: 'scd-stroke-start', urgency: 'critical' },
      { label: 'Abdominal Distension / Pallor', description: 'Splenic sequestration — life-threatening', next: 'scd-splenic-start', urgency: 'critical' },
      { label: 'Priapism', description: 'Urologic emergency — cross-link to Priapism consult', next: 'scd-priapism-route' },
      { label: 'Exertional Collapse (Sickle Trait)', description: 'ECAST, rhabdomyolysis, renal complications', next: 'scd-sct-start' },
    ],
  },

  {
    id: 'scd-history',
    type: 'info',
    module: 1,
    title: 'Key History & Baseline Assessment',
    body: '**SCD Genotype & Severity:**\n• **HbSS** — most severe, baseline Hgb 6–8 g/dL\n• **HbSβ0-thalassemia** — similar severity to HbSS\n• **HbSC** — moderate severity, baseline Hgb 10–15 g/dL\n• **HbSβ+-thalassemia** — moderate, baseline Hgb 9–12 g/dL\n• **HbAS (Sickle Cell Trait)** — generally benign carrier state\n\n[SCD Genotypes & Severity](#/info/scd-genotypes)\n\n**Critical History Elements:**\n• Prior complications (ACS, stroke, splenic sequestration, priapism)\n• Individualized pain plan from hematologist\n• Baseline hemoglobin and reticulocyte count\n• Immunization status — PCV15/PCV20/PPSV23, meningococcal\n• Penicillin prophylaxis compliance (recommended through age 5) [4]\n• Hydroxyurea use\n• Last transfusion date and last known HbS%\n• Pregnancy status\n• Home pain medication regimen and last dose [5]',
    citation: [1, 4, 5],
    next: 'scd-start',
  },

  {
    id: 'scd-priapism-route',
    type: 'result',
    module: 1,
    title: 'Priapism in SCD',
    body: '**Priapism** affects ~40% of males with SCD. [1]\n\nIntervention should occur within **4 hours** of erection duration to prevent permanent scarring and erectile dysfunction.\n\n**Initial Management:**\n• IV hydration\n• Analgesia (per VOC pathway)\n• Supplemental oxygen\n• Oral pseudoephedrine 30–60 mg may be considered [1]\n• Ketamine at procedural sedation doses has been shown to assist with corporal detumescence [1]\n\n**Definitive Management:**\n[Priapism Management](#/tree/priapism) — full aspiration, irrigation, and phenylephrine injection protocol\n\nEmergent urology consultation for definitive management.',
    recommendation: 'Initiate IV hydration, analgesia, and O2. If >4 hours duration, proceed to corporal aspiration per Priapism consult. Emergent urology consultation.',
    confidence: 'recommended',
    citation: [1, 21],
  },

  // ============================================================
  // MODULE 2: VOC Pain Management
  // ============================================================

  {
    id: 'scd-voc-start',
    type: 'info',
    module: 2,
    title: 'Vaso-Occlusive Crisis (VOC)',
    body: '[VOC Pain Management Algorithm](#/info/scd-voc-algorithm)\n[Differential Diagnosis](#/info/scd-differential)\n\nVOC is the **most common SCD complication** and leading cause of ED visits (~40,000 annual pediatric ED visits in the US). [1][3]\n\n**Pathophysiology:** HbS polymerization → sickled RBC → microvascular occlusion → tissue ischemia and infarction. [1]\n\n**Common Triggers:**\n• Dehydration\n• Infection / fever\n• Cold exposure / weather changes\n• Hypoxia / acidosis\n• Physical or emotional stress\n• Air pollution\n\n**Diagnosis is CLINICAL** — no biomarkers or imaging validate pain severity. Patient report is the criterion standard. [1][4][5]\n\n**Differential Diagnosis:**\n• Osteomyelitis (Salmonella, S. aureus)\n• Avascular necrosis (femoral/humeral head)\n• Septic arthritis\n• Appendicitis, cholecystitis\n• Dactylitis (hand-foot syndrome in age <2 yr)\n\n**Check for individualized pain plan** from hematologist — 24% decrease in admission rates when used. [9]',
    citation: [1, 3, 4, 5, 9],
    next: 'scd-voc-triage',
  },

  {
    id: 'scd-voc-triage',
    type: 'info',
    module: 2,
    title: 'Triage — Intranasal Fentanyl',
    body: '**GOAL: Analgesia within 30 minutes of triage, 60 minutes of ED arrival.** [4]\n\n**Intranasal Fentanyl at Triage (before IV access):**\n[Fentanyl](#/drug/fentanyl/scd pain triage) 1–1.5 mcg/kg IN via MAD atomizer (max 100 mcg)\n• Onset 5–10 min\n• Shortens ED length of stay [7]\n• Administer BEFORE establishing IV access\n\n**Triage Actions:**\n• Place PIV / access port\n• Obtain labs: CBC, reticulocyte count, CMP\n• Urine HCG (females >10 years)\n• If ill-appearing: T&S, Hgb electrophoresis (STAT)\n• If febrile: use SCD Fever pathway concurrently\n• If chest pain with hypoxia or fever: concurrent ACS evaluation\n\n**Supportive Measures:**\n• Heat packs to painful sites\n• Continuous pulse oximetry\n• Offer opioid premeds if ordered (e.g., PO diphenhydramine)\n\n**Triage Questions:**\n• History of acute chest syndrome?\n• Last pain crisis?\n• Current fever, cough, chest pain?\n• Does patient have an individualized pain plan?',
    citation: [4, 5, 7],
    next: 'scd-voc-iv',
  },

  {
    id: 'scd-voc-iv',
    type: 'info',
    module: 2,
    title: 'IV Analgesia & Fluids',
    body: '**NSAID (administer with first opioid dose):**\n[Ketorolac](#/drug/ketorolac/scd pain crisis) 0.5 mg/kg IV\n• Max 15 mg if <16 years, max 30 mg if ≥16 years\n• Reduces opioid requirements [8]\n• **Contraindications:** pregnancy, renal impairment, ketorolac within 5 days, ibuprofen within 6 hours, bleeding concerns, history of renal impairment\n\n**Opioid (choose one based on patient preference/pain plan):**\n[Morphine](#/drug/morphine/scd pain crisis) 0.1–0.2 mg/kg IV (max 8 mg)\nOR\n[Hydromorphone](#/drug/hydromorphone/scd pain crisis) 0.015–0.02 mg/kg IV (max 1 mg)\nOR\n[Fentanyl](#/drug/fentanyl/scd pain crisis iv) 2 mcg/kg IV (max 100 mcg)\n\nIf unable to obtain IV: Oxycodone 0.1 mg/kg PO (max 10 mg)\n\n**IV Fluids:**\n• NS 10 mL/kg bolus (max 1L) over 60 minutes\n• If concern for dehydration: 20 mL/kg bolus (max 1L)\n• Then start 1× maintenance IVF\n• **Avoid overhydration** — can worsen ACS [4][19]\n\n**Incentive Spirometry:**\nStart in ED — shown to **prevent development of ACS** during hospitalization. [1]\n\n**AVOID corticosteroids** — risk of rebound pain, stroke, and other complications. [4][5]',
    citation: [1, 4, 5, 8, 19],
    next: 'scd-voc-reassess',
  },

  {
    id: 'scd-voc-reassess',
    type: 'question',
    module: 2,
    title: 'Reassess Pain (q30 min)',
    body: '**RN reassess pain 30 minutes after each opioid dose.** [4][5]\n\n• May give up to **3 doses** of opioid\n• Wake patient to reassess even if sleeping\n• Notify provider before each additional dose\n• Continue incentive spirometry\n\n**Monitor for:**\n• Respiratory depression (SpO2, respiratory rate)\n• Sedation level\n• Developing fever, chest pain, or dyspnea (→ ACS)',
    citation: [4, 5, 9],
    options: [
      { label: 'Pain Improved — Tolerating PO', description: 'Pain controlled, able to eat/drink', next: 'scd-voc-discharge' },
      { label: 'Pain Persists After 2–3 Doses', description: 'Refractory to standard analgesia', next: 'scd-voc-refractory' },
    ],
  },

  {
    id: 'scd-voc-refractory',
    type: 'info',
    module: 2,
    title: 'Refractory Pain',
    body: '**Sub-dissociative Ketamine (ASH-recommended adjunct):** [5]\n[Ketamine](#/drug/ketamine/scd adjunct) 0.1–0.3 mg/kg IV over 10–15 min\n• Reduces opioid consumption in pediatric SCD patients [10]\n• May repeat q15–20 min PRN\n• ACEP supports use for SCD pain\n\n**Additional Steps:**\n• Contact hematology for pain plan guidance\n• Consider patient-controlled analgesia (PCA) if admitting\n• Review for other diagnoses: osteomyelitis, avascular necrosis, compartment syndrome\n\n**Evaluate for Developing ACS:**\n• Obtain CXR if ANY respiratory symptoms develop\n• New infiltrate + fever/resp symptoms = ACS → proceed to ACS pathway\n• ACS develops in first 3–4 days of hospitalization in up to 10–20% of VOC admissions',
    citation: [5, 10],
    next: 'scd-voc-admit',
  },

  {
    id: 'scd-voc-discharge',
    type: 'result',
    module: 2,
    title: 'VOC — Discharge',
    body: '**Discharge Criteria:**\n• Pain controlled with oral medications\n• Tolerating oral fluids\n• Afebrile\n• Stable hemoglobin\n• Reliable caregivers\n\n**Discharge Plan:**\n• Continue home pain regimen (scheduled NSAID + PRN opioid)\n• Refill home pain medications for 2–3 day supply if needed\n• Hematology follow-up within 24–48 hours\n• Continue incentive spirometry at home\n\n**Return Precautions:**\n• Fever ≥ 38.5°C (101.3°F)\n• Worsening or new pain\n• Shortness of breath or chest pain\n• Weakness, pallor, or dizziness\n• Abdominal swelling\n\n**ED → Page hematology before discharge for follow-up plan.** [4]',
    recommendation: 'Discharge with oral pain regimen. Hematology follow-up within 24–48 hours. Return for fever, worsening pain, SOB, or chest pain.',
    confidence: 'recommended',
    citation: [1, 4, 5],
  },

  {
    id: 'scd-voc-admit',
    type: 'result',
    module: 2,
    title: 'VOC — Admission',
    body: '**Admission Criteria:**\n• Pain not controlled after 3 opioid doses in ED\n• New respiratory symptoms (evaluate for ACS)\n• Unable to tolerate oral fluids/medications\n• Hemodynamic instability\n• Significant hemoglobin decline from baseline\n\n**Inpatient Management:**\n• PCA morphine or hydromorphone\n• Scheduled NSAIDs + PRN opioids (multimodal)\n• Incentive spirometry q2h while awake\n• Maintenance IV fluids (avoid overhydration)\n• Hematology consult\n\n**Monitor for ACS:**\n• ACS is most common during first 3–4 days of admission\n• Daily assessment for fever, cough, hypoxia, chest pain\n• Low threshold for CXR if symptoms develop',
    recommendation: 'Admit for IV PCA, multimodal analgesia, incentive spirometry. Hematology consult. Monitor for ACS development.',
    confidence: 'recommended',
    citation: [1, 4, 5],
  },

  // ============================================================
  // MODULE 3: Acute Febrile Illness
  // ============================================================

  {
    id: 'scd-fever-start',
    type: 'info',
    module: 3,
    title: 'Fever — Medical Emergency',
    body: '[Fever Evaluation Algorithm](#/info/scd-fever-eval)\n\n**Fever ≥ 38.5°C (101.3°F) in SCD = MEDICAL EMERGENCY** [4]\n\n**Why fever is dangerous in SCD:**\n• Functional asplenia develops by 3 months of age\n• Impaired clearance of encapsulated organisms\n• Risk for overwhelming sepsis and death\n\n**Most Likely Pathogens:**\n• **Streptococcus pneumoniae** (most common)\n• Haemophilus influenzae\n• Neisseria meningitidis\n• Salmonella species (osteomyelitis)\n• Mycoplasma and atypical bacteria\n\n**Historical Context:**\n• Pre-PCV/penicillin prophylaxis: bacteremia risk 15–20%\n• Post-PCV + penicillin prophylaxis: bacteremia risk ~1.1% [11]\n• PCV7 vaccine reduced invasive pneumococcal disease by 90% [1]\n\n**NHLBI: Administer antibiotics within 1 hour of presentation** [4]\n\n**Caution:** Scheduled acetaminophen/ibuprofen can mask fever — evaluate as if febrile if on scheduled antipyretics with infectious symptoms. [1]',
    citation: [1, 4, 11],
    next: 'scd-fever-workup',
  },

  {
    id: 'scd-fever-workup',
    type: 'info',
    module: 3,
    title: 'Fever — Workup',
    body: '**Obtain BEFORE antibiotics:**\n• Blood culture (ALWAYS — regardless of how well the patient appears) [1][4]\n\n**Laboratory Studies:**\n• CBC with differential + reticulocyte count\n• CMP (comprehensive metabolic panel)\n• Urinalysis if UTI concern\n\n**Imaging:**\n• **CXR if ANY respiratory symptoms** (cough, chest pain, hypoxia, tachypnea) — evaluate for ACS [1]\n\n**Additional Assessment:**\n• Vaccination status — PCV15/PCV20, PPSV23, meningococcal\n• Penicillin prophylaxis compliance\n• Central line → increased bacteremia risk\n• History of splenectomy → increased bacteremia risk\n\n**Viral Testing:**\n• Comprehensive viral testing is optional\n• A **positive viral test does NOT exclude bacteremia** in SCD [1]\n\n**Age <60 days:**\n• Full sepsis workup per AAP 2021 guidelines [1][13]',
    citation: [1, 4, 11, 12],
    next: 'scd-fever-abx',
  },

  {
    id: 'scd-fever-abx',
    type: 'question',
    module: 3,
    title: 'Empiric Antibiotics',
    body: '**GIVE IMMEDIATELY after blood cultures:** [4]\n\n[Ceftriaxone](#/drug/ceftriaxone/scd febrile illness) 50 mg/kg IV (max 2 g)\n\nCovers: S. pneumoniae, H. influenzae, N. meningitidis, most Salmonella [1]\n\nIs there concern for meningitis?',
    citation: [1, 4],
    options: [
      { label: 'Meningitis Concern', description: 'Meningeal signs, altered mental status, ill-appearing, bulging fontanelle', next: 'scd-fever-meningitis', urgency: 'urgent' },
      { label: 'No Meningeal Signs', description: 'Well-appearing after antibiotics, no focal infection requiring expanded coverage', next: 'scd-fever-disposition' },
    ],
  },

  {
    id: 'scd-fever-meningitis',
    type: 'info',
    module: 3,
    title: 'Meningitis Coverage',
    body: '**Meningitic Antibiotic Dosing:**\n[Ceftriaxone](#/drug/ceftriaxone/scd meningitis) 100 mg/kg IV (max 2 g) — meningitic dose\nPLUS\n[Vancomycin](#/drug/vancomycin/scd meningitis) 20 mg/kg IV (max 1500 mg)\n\nThe increased ceftriaxone dose ensures adequate CNS penetration. Vancomycin covers resistant pneumococcus and MRSA. [1][4]\n\n**Age <60 Days:**\nFull sepsis workup per AAP 2021 guidelines required:\n[Peds Fever < 6 Months](#/tree/peds-fever)\n\n**Parvovirus B19 / Aplastic Crisis:**\n• 80% of SCD patients infected with parvovirus B19 develop transient red cell aplasia (TRCA) [1]\n• Reticulocyte count <1% + Hgb drop >30% from baseline\n• Self-limited over 7–10 days\n• May need simple blood transfusion or IVIG [1]\n• DDx for profound anemia with low reticulocyte count',
    citation: [1, 4, 13],
    next: 'scd-fever-disposition',
  },

  {
    id: 'scd-fever-disposition',
    type: 'result',
    module: 3,
    title: 'Fever — Disposition',
    body: '**Safe to Discharge:** [4][12]\n• Well-appearing after observation\n• Reliable caregivers\n• Hematology follow-up confirmed within 24 hours\n• Completed pneumococcal vaccine series\n• No focal bacterial infection requiring IV antibiotics\n• Parenteral antibiotics given in ED\n\n**Must Admit:** [4]\n• Ill-appearing\n• WBC >30,000 or <5,000 /mcL [13]\n• Hypotensive for age\n• Continued fever despite antibiotics\n• CXR infiltrate (→ ACS pathway)\n• Age <60 days\n• Unable to ensure 24-hour follow-up\n• Unvaccinated — consider lower threshold for admission [1]\n\n**Always:** Page hematology before discharge.\n\n**Follow-up of blood cultures** must be ensured — either via outpatient hematology or inpatient observation. [4]',
    recommendation: 'Well-appearing, vaccinated patients may be discharged after parenteral antibiotics with confirmed 24-hour hematology follow-up. Admit ill-appearing patients, those with abnormal WBC, hemodynamic instability, or CXR infiltrate.',
    confidence: 'recommended',
    citation: [1, 4, 12, 13],
  },

  // ============================================================
  // MODULE 4: Acute Chest Syndrome
  // ============================================================

  {
    id: 'scd-acs-start',
    type: 'info',
    module: 4,
    title: 'Acute Chest Syndrome (ACS)',
    body: '[ACS Recognition & Management](#/info/scd-acs-guide)\n\n**Definition:** New radiodensity on chest imaging WITH fever and/or respiratory symptoms [1]\n\n**ACS accounts for up to 25% of SCD-related deaths.** [1]\n\n**Common Triggers:**\n• Infection — S. pneumoniae, Mycoplasma, Chlamydia, viral\n• Fat embolism from bone marrow infarction\n• In situ sickling\n• Pulmonary infarction from VOC\n\n**Clinical Presentation:**\n• Chest pain, cough, dyspnea, tachypnea\n• Fever\n• Hypoxemia (may be absent initially)\n• Decreased breath sounds, crackles\n\n**Critical Points:**\n• Asthma is a common comorbidity AND trigger for ACS [14]\n• Asthma exacerbation does NOT exclude ACS\n• V/Q mismatch → predisposes to ACS development\n• CXR infiltrate may lag behind clinical symptoms\n• In older teens with SCD, consider MI with acute chest pain [5]\n\n**Prior ACS episodes should raise index of suspicion.**',
    citation: [1, 5, 14, 15],
    next: 'scd-acs-treatment',
  },

  {
    id: 'scd-acs-treatment',
    type: 'info',
    module: 4,
    title: 'ACS — Treatment',
    body: '**Antibiotics (cover typical + atypical):**\n[Ceftriaxone](#/drug/ceftriaxone/scd febrile illness) 50 mg/kg IV (max 2 g)\nPLUS\n[Azithromycin](#/drug/azithromycin/scd acs) 10 mg/kg IV (max 500 mg)\n\n**Oxygen Management:**\n• Supplemental O2 **ONLY for SpO2 <90%** [1]\n• Higher O2 in non-hypoxic patients blunts bone marrow response to RBC breakdown\n• Target SpO2 ≥ 92%\n\n**Respiratory Support:**\n• **Incentive spirometry q2h while awake** — proven to prevent ACS progression [1]\n• Bronchodilators PRN for wheezing component\n\n**Pain Management:**\n• Per VOC pathway — adequate analgesia reduces splinting and atelectasis\n\n**AVOID Corticosteroids:**\n• Can cause rebound pain\n• Associated with stroke risk [5]\n• Use ONLY if concurrent bronchospasm component, and with extreme caution',
    citation: [1, 4, 5, 15],
    next: 'scd-acs-transfusion',
  },

  {
    id: 'scd-acs-transfusion',
    type: 'question',
    module: 4,
    title: 'ACS — Transfusion Decision',
    body: '[Transfusion Guidelines](#/info/scd-transfusion)\n\n**Simple Transfusion Indications:** [4]\n• Hgb drops >1 g/dL below baseline\n• Goal: decrease HbS to <30%\n\n**Transfusion Targets:**\n• Hgb ~10 g/dL\n• HbS <30%\n• Do NOT exceed Hgb 11 g/dL (hyperviscosity risk)\n\nWhat is the patient\'s clinical trajectory?',
    citation: [1, 4, 16],
    options: [
      { label: 'Stable — Responding to Treatment', description: 'Simple transfusion adequate, improving respiratory status', next: 'scd-acs-admit' },
      { label: 'Worsening Despite Treatment', description: 'Progressive hypoxia, worsening infiltrates, declining status', next: 'scd-acs-exchange', urgency: 'critical' },
    ],
  },

  {
    id: 'scd-acs-exchange',
    type: 'info',
    module: 4,
    title: 'ACS — Exchange Transfusion',
    body: '**Exchange Transfusion Indications:** [4]\n• Worsening respiratory distress despite O2\n• Worsening hypoxia while on supplemental oxygen\n• Progressive pulmonary infiltrates on CXR\n• Worsening anemia after simple transfusion\n• Multilobar disease\n• Rapid clinical deterioration\n\n**Targets:**\n• HbS <30%\n• Hgb ~10 g/dL (avoid >11 g/dL)\n\n**Contact blood bank EARLY:**\n• Extended antigen matching required (anti-C, E, Kell)\n• Sickle-negative units\n• Exchange transfusion is resource-intensive — notify early\n\n**Severity Data:**\n• ~20% of ACS patients require ICU admission [1]\n• ~10% require mechanical ventilation [1]\n• 1–3% of pediatric ACS episodes are fatal [1]',
    citation: [1, 4, 15, 16],
    next: 'scd-acs-admit',
  },

  {
    id: 'scd-acs-admit',
    type: 'result',
    module: 4,
    title: 'ACS — Admission',
    body: '**Admit ALL patients with ACS.** [4]\n\n**ICU Criteria:**\n• Exchange transfusion needed\n• FiO2 >40% to maintain SpO2 ≥ 92%\n• Worsening respiratory status\n• Hemodynamic instability\n• Rapidly progressive infiltrates\n• Multilobar disease\n\n**Ongoing Management:**\n• Continue antibiotics (ceftriaxone + azithromycin)\n• Incentive spirometry q2h while awake\n• Judicious IV fluids — **avoid overhydration** (worsens pulmonary edema)\n• Serial CXR if clinically worsening\n• Continuous SpO2 monitoring\n• Hematology co-management\n\n**Monitor for multi-organ failure** — ACS can rapidly progress.',
    recommendation: 'Admit all ACS patients. ICU if exchange transfusion, FiO2 >40%, worsening status, or hemodynamic instability. Continue antibiotics + incentive spirometry.',
    confidence: 'definitive',
    citation: [1, 4, 15],
  },

  // ============================================================
  // MODULE 5: Stroke & Splenic Sequestration
  // ============================================================

  {
    id: 'scd-stroke-start',
    type: 'info',
    module: 5,
    title: 'SCD — Acute Stroke',
    body: '**A child with SCD is 33× more likely to have an ischemic stroke** than an age-matched healthy counterpart. [1]\n\n**Incidence:** Highest between ages 2–9 years. Prior to stroke-reducing protocols, ischemic stroke affected 10% of children with SCD. [1][6]\n\n**Pathophysiology:**\n• Decreased cerebrovascular reserve\n• Increased baseline cerebral blood flow\n• Impaired cerebral autoregulatory function\n• Increased baseline O2 extraction fraction\n\n**Presentation (similar to non-SCD stroke):**\n• Hemiparesis / hemiplegia\n• Aphasia / dysarthria\n• Seizures\n• Severe headache\n• Altered mental status\n• Abnormal gait / coordination\n• Facial droop\n• Numbness\n\n**ACTIVATE STROKE ALERT immediately.**\n**NOTIFY HEMATOLOGY immediately.** [6]',
    citation: [1, 6, 17],
    next: 'scd-stroke-workup',
  },

  {
    id: 'scd-stroke-workup',
    type: 'info',
    module: 5,
    title: 'Stroke — Workup & Imaging',
    body: '**Imaging:**\n• **Emergent CT head** — rule out hemorrhage (hemorrhagic stroke more common in adult SCD)\n• **MRI/MRA** if hemorrhage ruled out — define infarct, identify large vessel vasculopathy (stenosis/occlusion with or without moyamoya collaterals) [1][6]\n\n**Laboratory:**\n• CBC with reticulocyte count\n• Coagulation studies\n• Hemoglobin electrophoresis — determine HbS% [1]\n• Type and crossmatch — prepare for exchange transfusion\n\n**Clinical Assessment:**\n• Pediatric NIHSS (National Institutes of Health Stroke Scale) [1]\n• Complete neurologic examination\n\n**Cross-link to full ischemic stroke protocol:**\n[Ischemic Stroke Protocol](#/tree/stroke)',
    citation: [1, 6],
    next: 'scd-stroke-treatment',
  },

  {
    id: 'scd-stroke-treatment',
    type: 'info',
    module: 5,
    title: 'Stroke — Transfusion',
    body: '[Transfusion Guidelines](#/info/scd-transfusion)\n\n**ASH recommends transfusion within 2 hours of neurologic symptom onset.** [6]\n\n**Exchange transfusion is recommended over simple transfusion.** [6]\n• Target: HbS <30%, HbA >70%, Hgb ~10 g/dL\n• Simple transfusion can be done first to avoid delays, followed by exchange transfusion\n\n**Important Thresholds:**\n• If HbS already <50% → exchange transfusion may not be indicated [6]\n• If Hgb >8.5 g/dL → simple transfusion NOT indicated (hyperviscosity syndrome risk) [6]\n• Do NOT exceed Hgb 11 g/dL\n\n**tPA (Tissue Plasminogen Activator):**\n• **NOT recommended for children <18 years** [6]\n• For adults ≥18: may consider per standard stroke protocol if presenting within 4.5 hours, no hemorrhage on CT, no contraindications to thrombolysis [6]\n\n**Presentation >72 hours after onset without recent worsening:**\n• Assess HbS% and hemoglobin\n• Case-by-case transfusion decision with hematology [6]',
    citation: [1, 6],
    next: 'scd-stroke-dispo',
  },

  {
    id: 'scd-stroke-dispo',
    type: 'result',
    module: 5,
    title: 'Stroke — Disposition',
    body: '**Admit to ICU.** [1][6]\n\n• Continuous cardiac monitoring\n• Serial neurologic assessments\n• Neurology + hematology co-management\n\n**Long-term Management:**\n• Chronic transfusion program — monthly transfusions to maintain HbS <30% [6]\n• Stroke prevention protocols (transcranial Doppler screening) have led to 10-fold decrease in stroke over the last decade [1]\n• After ≥1 year of chronic transfusion with normalized TCD velocities, select children without severe vasculopathy may transition to hydroxyurea [6]',
    recommendation: 'Admit ICU. Exchange transfusion targeting HbS <30%. Neurology + hematology co-management. Chronic transfusion program for secondary prevention.',
    confidence: 'definitive',
    citation: [1, 6],
  },

  {
    id: 'scd-splenic-start',
    type: 'info',
    module: 5,
    title: 'Splenic Sequestration',
    body: '**Life-threatening complication** — can progress to shock and cardiac arrest within hours. [1]\n\n**Pathophysiology:** Sickling in the relatively hypoxic splenic environment → RBCs trapped → ongoing cycle of sequestration → acute splenomegaly + severe anemia + thrombocytopenia [1]\n\n**Typical Age:**\n• HbSS: 6 months – 5 years (median 1.4 years) — before autoinfarction of spleen [1]\n• HbSC / HbSβ+: can present later in life [1]\n\n**Presentation:**\n• Fussiness, irritability (infants)\n• Abdominal pain, distension\n• Tachycardia (often first sign)\n• Pallor, weakness\n• Palpable rapidly enlarging spleen\n• → Can progress to circulatory shock and arrest [1]\n\n**DDx:** Aplastic crisis (low retic), hepatic sequestration\n\n**Emergent Studies:**\n• CBC, reticulocyte count, total/indirect bilirubin\n• Type and crossmatch\n• Establish **two large-bore IVs**\n• Ultrasound can confirm splenomegaly if diagnostic uncertainty',
    citation: [1, 4, 18],
    next: 'scd-splenic-treatment',
  },

  {
    id: 'scd-splenic-treatment',
    type: 'result',
    module: 5,
    title: 'Splenic Sequestration — Treatment',
    body: '**Transfusion — CRITICAL NUANCE:** [4]\n\n• pRBC in **5 mL/kg aliquots**, standard infusion rate (3–4 hours)\n• **DO NOT transfuse past Hgb 8 g/dL**\n\n**Why the Hgb 8 ceiling matters:**\nSequestered RBCs eventually re-enter the bloodstream ("reverse sequestration" or "autotransfusion"). If over-transfused → severe **hyperviscosity** → hypertension, heart failure, intracerebral hemorrhage. [1][4]\n\n**Fluid Resuscitation:**\n• Crystalloid boluses for hypovolemic shock\n• Maintain hemodynamic stability while preparing blood\n\n**Monitoring:**\n• Serial abdominal exams q1–2 hours (spleen size)\n• Serial hemoglobin checks after each transfusion aliquot\n• Continuous cardiac monitoring\n\n**Disposition:**\n• **Admit ALL patients** [1]\n• Hematology consult\n• Recurrence rate: 50–78% [1]\n• Consider splenectomy or chronic transfusion therapy for recurrent episodes\n• **Teach parents to palpate spleen daily** for early detection [1]',
    recommendation: 'Emergent pRBC transfusion in 5 mL/kg aliquots. Do NOT exceed Hgb 8 g/dL. Admit all. Hematology consult. High recurrence rate — consider splenectomy.',
    confidence: 'definitive',
    citation: [1, 4, 18],
  },

  // ============================================================
  // MODULE 6: SCT & Special Populations
  // ============================================================

  {
    id: 'scd-sct-start',
    type: 'info',
    module: 6,
    title: 'Sickle Cell Trait (HbAS)',
    body: '[SCT Complications](#/info/scd-sct-complications)\n\n**Sickle cell trait (SCT) is NOT sickle cell disease.** [1]\n\n• ~8% of African Americans carry HbAS\n• Generally a benign carrier condition\n• Red blood cells function normally under typical conditions\n\n**However, specific risks exist under physiologic stress:**\n• High altitude\n• Severe dehydration\n• High-intensity or prolonged physical exertion\n• These conditions can induce sickling and vaso-occlusion [1]\n\n**Key SCT Complications:**\n• Exercise Collapse Associated with Sickle Cell Trait (ECAST)\n• Exertional rhabdomyolysis\n• Renal papillary necrosis\n• Renal medullary carcinoma\n• Splenic infarction at altitude\n• Hyposthenuria (inability to concentrate urine → dehydration risk)',
    citation: [1, 19],
    next: 'scd-sct-ecast',
  },

  {
    id: 'scd-sct-ecast',
    type: 'info',
    module: 6,
    title: 'ECAST — Exertional Collapse',
    body: '**Exercise Collapse Associated with Sickle Cell Trait (ECAST)**\n\nAssociated with competitive athletes and military training. Kark et al (1987) found **28× increased risk of exercise-related death** among recruits with SCT compared to those without. [19]\n\n**Pathophysiology:**\nMetabolic crisis from known sickling risk factors during intense exercise:\n• Dehydration + acidosis + hypoxia + hyperthermia → sickling in SCT [1]\n\n**Presentation (can progress rapidly):**\n• Extremity pain during/after intense exertion\n• → Rhabdomyolysis (elevated CK)\n• → Acute kidney injury\n• → Altered mental status\n• → Decompensated shock\n• → Coronary vasoconstriction, arrhythmias\n• → Disseminated intravascular coagulation (DIC)\n\n**Management:**\n• **STOP exercise immediately**\n• Cool the patient (remove from heat, active cooling)\n• **Aggressive IV fluid hydration** — target UO 200–300 mL/hr\n• Continuous cardiac monitoring\n• Serial labs: BMP, CK (rhabdomyolysis), blood gas (acid-base), coagulation studies\n\n**Note:** A 2016 study of ~48,000 Black US Army soldiers found mortality risk with SCT was similar to those without SCT when risk mitigation strategies were employed. [20]',
    citation: [1, 19, 20],
    next: 'scd-sct-renal',
  },

  {
    id: 'scd-sct-renal',
    type: 'info',
    module: 6,
    title: 'SCT — Renal Complications',
    body: '**Renal Papillary Necrosis** (most common cause of hematuria in SCT) [1]\n\n• Painless gross hematuria\n• Microinfarctions in renal medulla from sickling in vasa recta capillaries\n• Hypoxic, acidotic environment promotes sickling\n\n**Workup:** Urinalysis, urine culture, BMP (renal function), renal ultrasound with bladder\n\n**Management:**\n• Mild: outpatient — bed rest, oral hydration, urine alkalinization\n• Severe: inpatient — desmopressin infusion, ureteroscopic tamponade, or epsilon aminocaproic acid [1]\n\n---\n\n**Renal Medullary Carcinoma** — RARE but AGGRESSIVE [21]\n\n• Highly malignant primary renal tumor\n• Almost exclusively in SCT carriers (young adults)\n• Median survival: **15 weeks** (usually disseminated at diagnosis)\n\n**Red Flag:** Flank pain + hematuria in SCT patient\n→ **CT urography** to evaluate for renal medullary carcinoma [1][21]\n\n---\n\n**Hyposthenuria:**\n• Inability to concentrate urine → chronic dehydration risk\n• Counsel on increased fluid intake, especially during exercise',
    citation: [1, 21],
    next: 'scd-sct-dispo',
  },

  {
    id: 'scd-sct-dispo',
    type: 'result',
    module: 6,
    title: 'SCT — Disposition',
    body: '**ECAST:**\n• Admit to ICU for aggressive fluid resuscitation\n• Serial CK, BMP, blood gas monitoring\n• Continuous cardiac monitoring\n• Watch for rhabdomyolysis, AKI, DIC\n\n**Hematuria:**\n• Mild painless hematuria: outpatient with urology referral\n• Flank pain + hematuria: CT urography to rule out renal medullary carcinoma\n• Severe hematuria: admit for urologic management\n\n**Counseling:**\n• Exertional risks — avoid extreme exertion without acclimatization\n• Gradual training progression\n• Adequate hydration before, during, and after exercise\n• Avoid extreme altitude and heat without preparation\n• Routine physical activity IS safe and beneficial [1]',
    recommendation: 'ECAST: admit ICU with aggressive fluids and monitoring. Hematuria: urology referral, CT urography if flank pain. Counsel on exertional risks and hydration.',
    confidence: 'recommended',
    citation: [1, 19, 20, 21],
  },

  {
    id: 'scd-special-pop',
    type: 'info',
    module: 6,
    title: 'Special Populations & Considerations',
    body: '**Pregnant Patients:** [1]\n• Increased risk for VOC, ACS, preeclampsia/eclampsia, stillbirth, cesarean delivery, low birth weight\n• Early multidisciplinary team: obstetrics + hematology\n• More aggressive monitoring and lower intervention thresholds\n\n**Unvaccinated Children:** [1]\n• PCV7 vaccine reduced pneumococcal infection by 90%\n• Unvaccinated children at dramatically higher risk even on penicillin prophylaxis\n• Lower threshold for admission and IV antibiotics\n\n**High ED Utilizers (>3 visits/year for pain):** [1][22]\n• Address implicit bias — SCD pain is REAL\n• Opioid misuse rate in SCD is **LOWER than general population** [1]\n• Negative provider attitudes lead to undertreatment of pain\n• **Treat pain first**, then involve hematology if concern for addiction\n• Individualized pain plans reduce admissions by 24% [9]\n\n**Adolescents in Transition:**\n• Transition from pediatric to adult hematology is a vulnerable period\n• Ensure continuity of care and pain plan communication\n\n**Parvovirus B19 (Transient Red Cell Aplasia):** [1]\n• 80% of SCD patients infected develop TRCA\n• Reticulocyte count <1%, Hgb drops >30%\n• Self-limited 7–10 days\n• May need simple transfusion or IVIG\n• WBC and platelets may also decline',
    citation: [1, 3, 4, 9, 22],
  },
];

// ============================================================
// MODULE LABELS
// ============================================================

export const SICKLE_CELL_MODULE_LABELS: string[] = [
  'Presentation & Triage',
  'VOC Pain Management',
  'Acute Febrile Illness',
  'Acute Chest Syndrome',
  'Stroke & Splenic Sequestration',
  'SCT & Special Populations',
];

// ============================================================
// CITATIONS
// ============================================================

export const SICKLE_CELL_CITATIONS: Citation[] = [
  { num: 1, text: 'Jackson KM, Beamon B, Crawford EB, Burroughs ZT. Emergency Department Management of Acute Pediatric Sickle Cell Disease Complications. Pediatr Emerg Med Pract. 2024;21(11):1-28.' },
  { num: 2, text: 'Piel FB, Rees DC, DeBaun MR, et al. Defining global strategies to improve outcomes in sickle cell disease: a Lancet Haematology Commission. Lancet Haematol. 2023;10(8):e633-e686. DOI: 10.1016/S2352-3026(23)00096-0' },
  { num: 3, text: 'Kavanagh PL, Fasipe TA, Wun T. Sickle cell disease: a review. JAMA. 2022;328(1):57-68. DOI: 10.1001/jama.2022.10233' },
  { num: 4, text: 'National Heart, Lung, and Blood Institute. Evidence-Based Management of Sickle Cell Disease: Expert Panel Report. 2014.' },
  { num: 5, text: 'Brandow AM, Carroll CP, Creary S, et al. American Society of Hematology 2020 guidelines for sickle cell disease: management of acute and chronic pain. Blood Adv. 2020;4(12):2656-2701. DOI: 10.1182/bloodadvances.2020001851' },
  { num: 6, text: 'DeBaun MR, Jordan LC, King AA, et al. American Society of Hematology 2020 guidelines for sickle cell disease: prevention, diagnosis, and treatment of cerebrovascular disease in children and adults. Blood Adv. 2020;4(8):1554-1588. DOI: 10.1182/asheducation-2011.1.427' },
  { num: 7, text: 'Fein DM, Avner JR, Scharbach K, et al. Intranasal fentanyl for initial treatment of vaso-occlusive crisis in sickle cell disease. Pediatr Blood Cancer. 2017;64(6). (Randomized, double-blind, placebo-controlled trial; 49 patients)' },
  { num: 8, text: 'Dunlop RJ, Bennett KC. Pain management for sickle cell disease. Cochrane Database Syst Rev. 2006(2):CD003350. (Cochrane review; 9 randomized controlled trials)' },
  { num: 9, text: 'Wachnik AA, Welch-Coltrane JL, Adams MCB, et al. A standardized emergency department order set decreases admission rates and in-patient length of stay for adults patients with sickle cell disease. Pain Med. 2022;23(12):2050-2060.' },
  { num: 10, text: 'Hagedorn JM, Monico EC. Ketamine infusion for pain control in acute pediatric sickle cell painful crises. Pediatr Emerg Care. 2019;35(1):78-79.' },
  { num: 11, text: 'Rineer S, Walsh PS, Smart LR, et al. Risk of bacteremia in febrile children and young adults with sickle cell disease in a multicenter emergency department cohort. JAMA Netw Open. 2023;6(6):e2318904. (Retrospective; 1118 patients)' },
  { num: 12, text: 'Baskin MN, Goh XL, Heeney MM, Harper MB. Bacteremia risk and outpatient management of febrile patients with sickle cell disease. Pediatrics. 2013;131(6):1035-1041. (Retrospective cohort study; 1118 febrile episodes)' },
  { num: 13, text: 'Sirigaddi K, Aban I, Jantz A, et al. Outcomes of febrile events in pediatric patients with sickle cell anemia. Pediatr Blood Cancer. 2018;65(11):e27379. (Retrospective study; 427 patients)' },
  { num: 14, text: 'DeBaun MR, Strunk RC. The intersection between asthma and acute chest syndrome in children with sickle-cell anaemia. Lancet. 2016;387(10037):2545-2553.' },
  { num: 15, text: 'Crabtree EA, Mariscalco MM, Hesselgrave J, et al. Improving care for children with sickle cell disease/acute chest syndrome. Pediatrics. 2011;127(2):e480-e488. (Quality improvement project; 139 patients)' },
  { num: 16, text: 'Dolatkhah R, Dastgiri S. Blood transfusions for treating acute chest syndrome in people with sickle cell disease. Cochrane Database Syst Rev. 2020;1(1):CD007843. (Cochrane review; 1 trial, 237 patients)' },
  { num: 17, text: 'Yawn BP, John-Sowah J. Management of sickle cell disease: recommendations from the 2014 expert panel report. Am Fam Physician. 2015;92(12):1069-1076.' },
  { num: 18, text: 'Kane I, Kumar A, Atalla E, et al. Splenic sequestration crisis. StatPearls. 2024.' },
  { num: 19, text: 'Kark JA, Posey DM, Schumacher HR, et al. Sickle-cell trait as a risk factor for sudden death in physical training. N Engl J Med. 1987;317(13):781-787. (Retrospective observational study; 2 million patients)' },
  { num: 20, text: 'Nelson DA, Deuster PA, Carter R 3rd, et al. Sickle cell trait, rhabdomyolysis, and mortality among U.S. Army soldiers. N Engl J Med. 2016;375(5):435-442.' },
  { num: 21, text: 'Alappan N, Marak CP, Chopra A, et al. Renal medullary cancer in a patient with sickle cell trait. Case Rep Oncol Med. 2013;2013:129813.' },
  { num: 22, text: 'Glassberg JA, Tanabe P, Chow A, et al. Emergency provider analgesic practices and attitudes toward patients with sickle cell disease. Ann Emerg Med. 2013;62(4):293-302.' },
];
