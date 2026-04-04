# CT Scan Decision Support — Comprehensive Research

**Compiled:** April 4, 2026
**Source Article:** "The Renewed Necessity of Robust Clinical Judgment in CT Scan Utilization" — ACEP Now, Dec 10, 2025
**Purpose:** Build a CT Decision Support consult for myMedKitt

---

## 1. ACEP SOURCE ARTICLE

**Authors:** Chinonso A. Nwakama, BS; Bess M. Storch, MD; Ugo A. Ezenkwele, MD, MPH, FACEP
**Publication:** ACEP Now, December 10, 2025
**URL:** https://www.acepnow.com/article/the-renewed-necessity-of-robust-clinical-judgment-in-ct-scan-utilization/

### Key Points:
- **103,000 new cancers annually** attributable to CT imaging in the U.S. (Smith-Bindman et al.)
- This represents approximately **5% of all annual cancer diagnoses**
- Analysis based on **93 million CT scans** performed in 2023
- CT used in **27 per 100 ED patient encounters** (2019 survey of 1,000+ EDs)
- Nearly equivalent to ECG usage at 28 per 100 patients
- ~19% of ED visits lead to inpatient admission with potential additional imaging
- Chest X-ray = 0.1 mSv vs Chest CT = 7 mSv (70-fold difference)
- Average American background radiation: ~6.2 mSv/year
- Health equity concern: vulnerable populations relying on EDs face disproportionate radiation exposure

### Primary Study Referenced:
- Smith-Bindman R, et al. "Projected Lifetime Cancer Risks From Current Computed Tomography Imaging." *JAMA Internal Medicine*. Published online April 14, 2025. PMID: 40227719.
- Retrospective modeling from CT data 2018-2020, projected to 2023 volumes
- **NOTE:** ACR criticized the study as "theoretical" — not based on actual patient outcomes. AAPM also published concerns.

---

## 2. CLINICAL DECISION RULES — COMPLETE CRITERIA

### 2A. CANADIAN CT HEAD RULE (CCHR)

**Citation:** Stiell IG, Wells GA, Vandemheen K, et al. "The Canadian CT Head Rule for patients with minor head injury." *Lancet*. 2001;357(9266):1391-1396. PMID: 11356436.

**Applies to:** Adults (age ≥16) with minor head injury (GCS 13-15) AND witnessed LOC, definite amnesia, or witnessed disorientation. Must present within 24h.

**Exclusions:** Age <16, no clear history of trauma, GCS <13, unstable vital signs, obvious open skull fracture, bleeding disorder/anticoagulation, seizure prior to assessment, pregnancy.

**HIGH-RISK CRITERIA (for neurosurgical intervention):**
1. GCS score <15 at 2 hours after injury
2. Suspected open or depressed skull fracture
3. Any sign of basal skull fracture (hemotympanum, raccoon eyes, CSF otorrhea/rhinorrhea, Battle sign)
4. Vomiting ≥2 episodes
5. Age ≥65 years

**MEDIUM-RISK CRITERIA (for brain injury on CT):**
6. Retrograde amnesia ≥30 minutes before impact
7. Dangerous mechanism (pedestrian struck, ejected from vehicle, fall >3 ft or >5 stairs)

**Performance:**
- High-risk criteria: **100% sensitive** (95% CI 92-100%) for neurosurgical intervention; would require only 32% of patients to get CT
- All 7 criteria: **98.4% sensitive** (95% CI 96-99%), 49.6% specific for clinically important brain injury; would require 54% of patients to get CT
- External validations show variable results; some lower sensitivity in non-Canadian populations

**ACEP Clinical Policy (2023):** Level B recommendation to use CCHR for decision support in adults with minor head injury.

---

### 2B. NEXUS CRITERIA (Cervical Spine)

**Citation:** Hoffman JR, Mower WR, Wolfson AB, et al. "Validity of a Set of Clinical Criteria to Rule Out Injury to the Cervical Spine in Patients with Blunt Trauma." *NEJM*. 2000;343(2):94-99. PMID: 10891516.

**The 5 NEXUS Low-Risk Criteria (ALL must be met to clear):**
1. No posterior midline cervical tenderness
2. No evidence of intoxication
3. Normal level of alertness (alert and oriented)
4. No focal neurologic deficit
5. No painful distracting injuries

**If ALL 5 criteria are met → No imaging needed**
**If ANY criterion is NOT met → Imaging indicated**

**Performance:**
- Sensitivity: **99.6%** (missed 8 of 818 injuries in 34,069 patients)
- Specificity: **12.9%**
- NPV: **99.8%** (95% CI 99.6-100%)
- PPV: 2.7%

**Validated in:** >34,000 patients across 21 US centers (NEXUS study)

---

### 2C. CANADIAN C-SPINE RULE (CCR)

**Citation:** Stiell IG, Wells GA, Vandemheen KL, et al. "The Canadian C-spine rule for radiography in alert and stable trauma patients." *JAMA*. 2001;286(15):1841-1848. PMID: 11597285.

**Applies to:** Alert (GCS 15), stable trauma patients with potential c-spine injury.

**Algorithm (3 sequential questions):**

**Step 1 — Any HIGH-RISK factor? (mandates imaging)**
- Age ≥65 years
- Dangerous mechanism:
  - Fall ≥3 feet / ≥5 stairs
  - Axial load to head (e.g., diving)
  - MVC at high speed (>100 km/h), rollover, ejection
  - Motorized recreational vehicle accident
  - Bicycle collision
- Paresthesias in extremities

→ If YES to any → **Image the c-spine**

**Step 2 — Any LOW-RISK factor allowing safe ROM assessment?**
- Simple rear-end MVC (excludes: pushed into oncoming traffic, hit by bus/large truck, rollover, hit by high-speed vehicle)
- Sitting position in ED
- Ambulatory at any time post-injury
- Delayed onset of neck pain (not immediate)
- Absence of midline c-spine tenderness

→ If NO low-risk factors → **Image the c-spine**

**Step 3 — Can patient actively rotate neck 45° left AND right?**
→ If YES → **No imaging needed**
→ If NO → **Image the c-spine**

**Performance:**
- Sensitivity: **100%** for clinically important c-spine injury
- Specificity: **42.5%**
- Superior to NEXUS in head-to-head comparison (Stiell et al., NEJM 2003, PMID: 14695411)

---

### 2D. PECARN (Pediatric Head Trauma)

**Citation:** Kuppermann N, Holmes JF, Dayan PS, et al. "Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study." *Lancet*. 2009;374(9696):1160-1170. PMID: 19758692.

**Validated in:** 42,412 children across 25 PECARN EDs — largest pediatric head trauma study ever

**CHILDREN <2 YEARS OLD — 6 Criteria:**

**Very Low Risk (CT NOT recommended) — NONE of the following:**
1. GCS <15 / Altered mental status (agitation, somnolence, repetitive questioning, slow response)
2. Palpable skull fracture
3. LOC ≥5 seconds
4. Non-frontal scalp hematoma (occipital, parietal, or temporal)
5. Severe mechanism of injury (MVC with patient ejection/death of another passenger/rollover, pedestrian/bicyclist without helmet struck by motorized vehicle, fall >3 feet, head struck by high-impact object)
6. Not acting normally per parent assessment

**Risk Stratification:**
- 0 criteria → <0.02% risk of ciTBI → **CT not recommended**
- Any of criteria 3-6 alone (without 1 or 2) → 0.9% risk → **Observation vs CT (physician discretion/shared decision-making)**
- Criteria 1 or 2 present → 4.4% risk → **CT recommended**

**Performance (age <2):** Sensitivity 100% (95% CI 86.3-100%), NPV 100% (95% CI 99.7-100%)

---

**CHILDREN ≥2 YEARS OLD — 6 Criteria:**

**Very Low Risk (CT NOT recommended) — NONE of the following:**
1. GCS <15 / Altered mental status
2. Signs of basilar skull fracture (hemotympanum, raccoon eyes, CSF otorrhea/rhinorrhea, Battle sign)
3. Any loss of consciousness
4. History of vomiting
5. Severe mechanism of injury (same definitions as above)
6. Severe headache

**Risk Stratification:**
- 0 criteria → <0.05% risk of ciTBI → **CT not recommended**
- Any of criteria 3-6 alone (without 1 or 2) → 0.8% risk → **Observation vs CT (physician discretion)**
- Criteria 1 or 2 present → 4.3% risk → **CT recommended**

**Performance (age ≥2):** Sensitivity 96.8% (95% CI 89.0-99.6%), NPV 99.95% (95% CI 99.81-99.99%)

---

### 2E. WELLS CRITERIA — PULMONARY EMBOLISM

**Citation:** Wells PS, Anderson DR, Rodger M, et al. "Derivation of a simple clinical model to categorize patients probability of pulmonary embolism: increasing the models utility with the SimpliRED D-dimer." *Thromb Haemost*. 2000;83(3):416-420. PMID: 10744147.

**Scoring (Total 0-12.5):**

| Criterion | Points |
|-----------|--------|
| Clinical signs/symptoms of DVT (leg swelling, pain with palpation) | +3.0 |
| PE is #1 diagnosis OR equally likely | +3.0 |
| Heart rate >100 bpm | +1.5 |
| Immobilization ≥3 days OR surgery in prior 4 weeks | +1.5 |
| Previous PE or DVT | +1.5 |
| Hemoptysis | +1.0 |
| Malignancy (treatment within 6 months or palliative) | +1.0 |

**Interpretation:**
- **Score ≤4:** PE "unlikely" → proceed to D-dimer (if negative, PE excluded)
- **Score >4:** PE "likely" → proceed to CTPA

**Traditional 3-tier:**
- 0-1: Low risk (~1.3% PE prevalence)
- 2-6: Moderate risk (~16.2%)
- ≥7: High risk (~37.5%)

---

### 2F. PERC RULE (Pulmonary Embolism Rule-Out Criteria)

**Citation:** Kline JA, Mitchell AM, Kabrhel C, et al. "Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism." *J Thromb Haemost*. 2004;2(8):1247-1255. PMID: 15304025.

**Use ONLY when pre-test probability is LOW (gestalt <15% or Wells ≤4)**

**ALL 8 criteria must be met to rule out PE without D-dimer:**
1. Age <50 years
2. Heart rate <100 bpm
3. SpO2 ≥95% on room air
4. No hemoptysis
5. No estrogen use (OCPs, HRT)
6. No prior DVT or PE
7. No unilateral leg swelling
8. No surgery or trauma requiring hospitalization in prior 4 weeks

**If ALL 8 met in a low-risk patient → PE ruled out, no further testing needed**
**If ANY criterion NOT met → Proceed to D-dimer**

**Performance:** Sensitivity ~97.4%, false-negative rate <2% when properly applied to low-risk patients.

**Critical safety net:** PERC only applies when clinical gestalt is LOW pretest probability. Never use in moderate or high pretest probability patients.

---

### 2G. WELLS CRITERIA — DVT

**Citation:** Wells PS, Anderson DR, Bormanis J, et al. "Value of assessment of pretest probability of deep-vein thrombosis in clinical management." *Lancet*. 1997;350(9094):1795-1798. PMID: 9428249.

**Scoring (9 items, range -2 to +9):**

| Criterion | Points |
|-----------|--------|
| Active cancer (treatment within 6 months or palliative) | +1 |
| Paralysis, paresis, or recent cast immobilization of lower extremity | +1 |
| Recently bedridden >3 days OR major surgery within 12 weeks | +1 |
| Localized tenderness along distribution of deep venous system | +1 |
| Entire leg swollen | +1 |
| Calf swelling ≥3 cm larger than asymptomatic side (measured 10 cm below tibial tuberosity) | +1 |
| Pitting edema confined to symptomatic leg | +1 |
| Collateral superficial veins (non-varicose) | +1 |
| Alternative diagnosis at least as likely as DVT | **-2** |

**Interpretation:**
- **≤0 points:** Low risk (~5% DVT prevalence)
- **1-2 points:** Moderate risk (~17%)
- **≥3 points:** High risk (~53%)

**Two-level model (simplified):**
- ≤1: DVT unlikely → D-dimer
- ≥2: DVT likely → Ultrasound

---

### 2H. OTTAWA ANKLE RULES

**Citation:** Stiell IG, Greenberg GH, McKnight RD, et al. "A study to develop clinical decision rules for the use of radiography in acute ankle injuries." *Ann Emerg Med*. 1992;21(4):384-390. PMID: 1554175.

**Ankle X-ray indicated if pain in malleolar zone AND any of:**
1. Bone tenderness along distal 6 cm of posterior edge of **tibia** or tip of **medial malleolus**
2. Bone tenderness along distal 6 cm of posterior edge of **fibula** or tip of **lateral malleolus**
3. Inability to bear weight for **4 steps** both immediately after injury AND in the ED

**Foot X-ray indicated if pain in midfoot zone AND any of:**
1. Bone tenderness at the **base of 5th metatarsal**
2. Bone tenderness at the **navicular bone**
3. Inability to bear weight for **4 steps** both immediately after injury AND in the ED

**Performance:**
- Sensitivity: **97.6%** (pooled from 27 studies)
- Specificity: ~31.5% (median)
- Sensitivity for midfoot fractures: **100%** (95% CI 82-100%)
- Can reduce ankle radiographs by 30-40%

**Exclusions:** Age <18 (some studies validate in children ≥6), pregnant women, diminished ability to follow test (head injury, intoxication), injuries >10 days old.

---

### 2I. OTTAWA KNEE RULES

**Citation:** Stiell IG, Greenberg GH, Wells GA, et al. "Prospective validation of a decision rule for the use of radiography in acute knee injuries." *JAMA*. 1996;275(8):611-615. PMID: 8594242.

**Knee X-ray indicated if ANY of the following 5 criteria:**
1. Age ≥55 years
2. Isolated tenderness of the patella (no other bone tenderness of knee)
3. Tenderness at head of fibula
4. Inability to flex knee to 90°
5. Inability to bear weight for 4 steps both immediately after injury AND in the ED

**Performance:**
- Sensitivity: **98-100%** for clinically significant knee fractures
- Can reduce knee radiographs by ~28%

---

### 2J. PITTSBURGH KNEE RULES

**Citation:** Seaberg DC, Jackson R. "Clinical decision rule for knee radiographs." *Am J Emerg Med*. 1994;12(5):541-543. PMID: 8060729.

**Knee X-ray indicated if:**
- Mechanism is **fall or blunt trauma** AND either:
  1. Age <12 OR >50 years, OR
  2. Inability to walk 4 weight-bearing steps in the ED

**Exclusions:**
- Presentation >6 days after injury
- Superficial lacerations/abrasions only
- Prior history of knee surgery on affected knee
- Reassessment of same injury

**Performance:**
- Sensitivity: **99%**
- Specificity: **60%** (higher than Ottawa Knee Rules)
- Could reduce knee radiography by ~52%

---

### 2K. ALVARADO SCORE (Appendicitis)

**Citation:** Alvarado A. "A practical score for the early diagnosis of acute appendicitis." *Ann Emerg Med*. 1986;15(5):557-564. PMID: 3963537.

**Mnemonic: MANTRELS (8 items, max 10 points):**

| Criterion | Points |
|-----------|--------|
| **M**igration of pain to RLQ | 1 |
| **A**norexia | 1 |
| **N**ausea / Vomiting | 1 |
| **T**enderness in RLQ | **2** |
| **R**ebound pain | 1 |
| **E**levated temperature (≥37.3°C / 99.1°F) | 1 |
| **L**eukocytosis (WBC >10,000) | **2** |
| **S**hift to left (>75% neutrophils) | 1 |

**Interpretation:**
- **0-4:** Appendicitis unlikely → Discharge with return precautions
- **5-6:** Compatible with appendicitis → Observation, serial exams, consider imaging
- **7-8:** Probable appendicitis → Surgical consult, CT if equivocal
- **9-10:** Very probable appendicitis → Surgical consult

**Performance:**
- At cutoff ≥5: Sensitivity **99%** overall (96% men, 99% women, 99% children)
- At cutoff ≥7: Specificity improves significantly but sensitivity drops
- Designed to reduce unnecessary appendectomies and guide CT usage

---

## 3. CT ALTERNATIVES — WHEN TO USE OTHER MODALITIES

### Point-of-Care Ultrasound (POCUS)

**Preferred over CT when:**
- **Unstable trauma:** eFAST when patient too unstable for CT transport
- **Gallbladder disease:** POCUS within 60 min saves ~22 hours ED LOS vs delayed imaging
- **Appendicitis:** Pooled sensitivity 91% (surgeons/EM physicians). Negative does NOT rule out. Good first-line in pediatrics and pregnancy.
- **Kidney stones:** No difference from CT in high-risk patients; lower radiation, shorter ED stay
- **DVT evaluation:** Compression ultrasound is the primary diagnostic test (not CT)
- **Cardiac:** Pericardial effusion, EF estimation, RV strain (PE)
- **Lung:** B-lines for CHF, lung sliding for pneumothorax. High accuracy for pneumonia.
- **First trimester bleeding:** Transvaginal US is first-line for ectopic/miscarriage
- **AAA screening:** Bedside POCUS highly sensitive for detecting AAA

**POCUS Limitations:**
- Cannot replace CT for pulmonary embolism diagnosis
- Operator-dependent
- Limited by body habitus
- Cannot evaluate retroperitoneal structures well

### Plain Radiographs (X-ray)

**Preferred over CT when:**
- **Ankle/foot injuries:** Use Ottawa Ankle Rules → X-ray if criteria met
- **Knee injuries:** Ottawa/Pittsburgh Knee Rules → X-ray if criteria met
- **Chest:** Standard CXR for initial pneumonia/CHF/pneumothorax evaluation
- **C-spine:** If clinical decision rule mandates imaging, start with plain films (3-view) in low-risk mechanism; CT for high-risk or inadequate plain films
- **Fractures:** Simple long bone fractures rarely need CT

### MRI

**Preferred over CT when:**
- **Soft tissue evaluation:** Ligament/tendon injuries, spinal cord pathology
- **Stroke:** MRI with DWI superior for acute ischemic stroke detection (CT better for hemorrhage rule-out)
- **Pediatric brain:** When CT can be deferred and MRI is available (no radiation)
- **Pregnancy:** Preferred for abdominal pathology (no ionizing radiation; avoid gadolinium in first trimester)
- **Appendicitis in pregnancy:** MRI sensitivity/specificity comparable to CT without radiation

---

## 4. RADIATION EXPOSURE DATA

### Typical Effective Doses for Common CT Scans

| CT Examination | Typical Dose (mSv) | Equivalent CXRs | Equivalent Background Radiation |
|---------------|-------------------|-----------------|-------------------------------|
| Head CT | 2 mSv | 20 | 4 months |
| C-spine CT | 3-4 mSv | 30-40 | 6 months |
| Chest CT | 7 mSv | 70 | 1.1 years |
| CT Abdomen/Pelvis (single phase) | 10 mSv | 100 | 1.6 years |
| CT Abdomen/Pelvis (multiphase) | 31 mSv (median) | 310 | 5 years |
| CT Pulmonary Angiogram | 10-15 mSv | 100-150 | 1.6-2.4 years |
| Chest X-ray (reference) | 0.1 mSv | 1 | 6 days |

**Background radiation:** ~6.2 mSv/year (US average)

### Cancer Risk Estimates (per 1,000 patients)

| CT Type | Median Lifetime Attributable Risk | Range |
|---------|----------------------------------|-------|
| Head CT | 0.23 cancers per 1,000 | 0.03-0.70 |
| Chest CT | 1.5 cancers per 1,000 | — |
| Multiphase Abd/Pelvis CT | 4.0 cancers per 1,000 | 0.83-11.1 |

### Key Dose Variation Finding
- **13-fold variation** in dose between highest and lowest dose for each study type
- Widest range: multiphase abdomen/pelvis CT (6.4 mSv to 90.4 mSv)
- Source: Smith-Bindman R et al. "Radiation dose associated with common computed tomography examinations." *Arch Intern Med*. 2009;169(22):2078-2086.

### Cumulative Risk
- Risk increases linearly with cumulative dose (Linear No-Threshold model)
- Slightly but significantly increased cancer risk at <50 mSv cumulative exposure (~3 or more CTs)
- Children are more radiosensitive: higher cell proliferation rate, longer remaining lifespan for cancer to manifest

### ALARA Principle
- **As Low As Reasonably Achievable** — developed 1960s by Atomic Energy Commission
- Every CT should use minimum radiation necessary for diagnostic quality
- Key strategies: weight-based protocols, automatic exposure control, iterative reconstruction, limiting scan phases, limiting scan range

---

## 5. SPECIAL POPULATIONS

### 5A. Pediatric Considerations

**Image Gently Campaign (est. 2008):**
Four founding societies: SPR, ASRT, ACR, AAPM

**Four principles:**
1. **Child-size** the radiation dose (weight/size-based protocols)
2. Scan **only when necessary** (use clinical decision rules)
3. Scan **only the indicated region** (limit scan length)
4. Scan **once** (avoid multiphase scanning)

**Key facts:**
- Children <10 years are **several times more radiosensitive** than adults
- Organs have higher cell proliferation rate → more susceptible to radiation damage
- More remaining years of life → higher cumulative cancer risk
- Use **PECARN** before head CT in minor trauma
- Consider **observation period** before CT (PECARN intermediate risk: shared decision-making)
- **Ultrasound first** for appendicitis, pyloric stenosis, intussusception
- **MRI when available** for conditions that don't require emergent diagnosis

### 5B. Pregnancy

**Fetal radiation thresholds:**
- **<50 mGy:** No identifiable developmental defects. **Pregnancy interruption NOT warranted.**
- **50-100 mGy:** Threshold for teratogenic effects (only in first 15 weeks post-conception)
- **>100 mGy:** Increased risk of malformations — extremely rare from diagnostic imaging

**Typical fetal doses from CT:**
- CT head: <0.01 mGy (negligible — uterus far from field)
- CT chest: 0.01-0.66 mGy (minimal)
- CT abdomen/pelvis: **10-25 mGy** (modern scanners with AEC: ~13 mGy)
- CTPA for PE: 0.01-0.66 mGy (primarily chest field)

**All typical fetal doses are well below the 50 mGy threshold.**

**Key principles (ACR/ACOG):**
- Do NOT withhold medically indicated CT from pregnant patients
- Risk of missed diagnosis (e.g., PE, appy) far exceeds radiation risk
- Use ALARA protocols
- Avoid repeat/multiphase scanning when possible
- Iodinated contrast: crosses placenta but no proven teratogenicity at diagnostic doses; use when necessary
- MRI preferred for abdominal pathology when clinically appropriate (no ionizing radiation)
- Gadolinium: avoid in pregnancy (especially first trimester) — crosses placenta, unknown long-term fetal effects
- **ACOG Committee Opinion 723 (2017):** "Guidelines for Diagnostic Imaging During Pregnancy and Lactation"

### 5C. Contrast Allergy Protocols

**ACR Manual on Contrast Media (2024 Edition):**

**Major paradigm shift — 2024-2025 updates:**

**For MILD prior reactions (hives, nausea, limited urticaria):**
- **Premedication NO LONGER routinely recommended**
- Primary strategy: **switch to a different contrast agent** when the causative agent is known
- Breakthrough reaction rate: 25.8% same agent → 6.9% different agent

**For MODERATE prior reactions:**
- Shared decision-making between ordering provider, patient, radiologist
- Premedication may be considered but is NOT always needed
- Contrast agent switching is preferred when feasible

**For SEVERE prior reactions (anaphylaxis, laryngeal edema, hypotension):**
- Premedication still recommended when no acceptable alternative study exists
- Consider if the study is truly necessary or if alternative imaging suffices

**Traditional premedication regimens (when indicated):**

**13-hour oral regimen:**
- Prednisone 50 mg PO at 13h, 7h, and 1h before contrast
- Diphenhydramine 50 mg PO/IV/IM 1h before contrast

**5-hour IV regimen (emergency):**
- Methylprednisolone 40 mg IV (or Hydrocortisone 200 mg IV) at 5h and 1h before
- Diphenhydramine 50 mg IV 1h before contrast

**1-hour emergency breakthrough protocol:**
- Methylprednisolone 40 mg IV + Diphenhydramine 50 mg IV
- Note: Evidence for efficacy of single-dose steroids is weak

**Key 2025 consensus (ACR/AAAAI joint statement):**
- Document ALL contrast reactions in the EHR with specific agent, reaction type, severity
- Contrast agent switching may be MORE effective than premedication
- Allergist referral for severe reactions

---

## 6. CHOOSING WISELY — ACEP RECOMMENDATIONS

**Source:** American College of Emergency Physicians Choosing Wisely lists (2013, 2014)
**URL:** https://www.choosingwisely.org/societies/american-college-of-emergency-physicians/

### CT-Specific Recommendations:

1. **Head CT for syncope:** Avoid CT of the head in asymptomatic adult patients with syncope, insignificant trauma, and normal neurological evaluation. Abnormalities are rarely found.

2. **CTPA for PE:** Avoid CT pulmonary angiography in patients with low pretest probability of PE AND either a negative PERC or a negative D-dimer.

3. **CT abdomen for kidney stones:** Avoid CT abdomen/pelvis in young, otherwise healthy patients with known history of kidney stones presenting with symptoms of uncomplicated renal colic (patients <50, no fever, no concern for alternative diagnosis).

4. **CT head for minor head injury:** Do not order CT of the head for patients with minor head injury who meet Canadian CT Head Rule or NEXUS II low-risk criteria.

5. **Lumbar spine imaging:** Avoid lumbar spine imaging in the ED for adults with atraumatic back pain unless severe/progressive neurologic deficits or suspected serious underlying condition (infection, cancer with bony mets).

### ACEP Quality Network (E-QUAL):
- 2016: Launched "Reduce Avoidable Imaging Initiative"
- Implementing Choosing Wisely recommendations through CDS (clinical decision support) embedded in EHR order entry

---

## 7. DOCUMENTATION REQUIREMENTS

### When ORDERING CT — Document:

1. **Clinical indication:** Specific signs/symptoms prompting the study
2. **Pre-test probability assessment:** Document which clinical decision rule was applied and the result (e.g., "Wells score = 6, PE likely")
3. **Clinical question:** What specific diagnosis are you evaluating?
4. **Risk-benefit discussion:** Especially for pregnant patients, pediatrics, or patients with recent prior CTs
5. **Contrast decision:** Why contrast is/is not needed; allergy status; eGFR if contrast indicated
6. **Alternative imaging considered:** Document why CT was chosen over ultrasound, MRI, or plain films
7. **Medical necessity language:** Tie the order to the presenting complaint and clinical findings

### When NOT ORDERING CT — Document:

1. **Clinical decision rule applied and result** (e.g., "PECARN negative — no high-risk features. CT not indicated. Observation plan discussed with family.")
2. **Shared decision-making:** Document discussion with patient/family about observation vs imaging
3. **Return precautions given:** Specific instructions for when to return (e.g., worsening headache, vomiting, confusion)
4. **Follow-up plan:** Who to see and when
5. **Capacity to understand:** Patient/family demonstrated understanding of return precautions

### Medical-Legal Protection:
- **Document the rule, not just the conclusion.** "Canadian CT Head Rule applied: no high-risk or medium-risk criteria met" is stronger than "CT head not indicated."
- **Document shared decision-making** when observation is chosen over imaging
- **Explicit return precautions** with specific red flags for the clinical scenario
- **Document any discordance** between the rule result and clinical gestalt, and how it was resolved

---

## 8. RECENT EVIDENCE / 2024-2025 UPDATES

### CT & Cancer Risk (2025)
- **Smith-Bindman R, et al.** "Projected Lifetime Cancer Risks From Current Computed Tomography Imaging." *JAMA Intern Med*. 2025. PMID: 40227719. — 103,000 projected cancers from 2023 CT volume (controversial; ACR and AAPM critiqued methodology as theoretical modeling, not observed outcomes)

### C-Spine Rules (2024-2025)
- **2025 Radiology study** (Pubs.rsna.org): "Evaluating NEXUS and Canadian C-Spine Rule Criteria and Their Clinical Impact on Cervical Spine Imaging: Best Practice" — reinforces CCR superiority over NEXUS for specificity
- **2024 Pakistan validation** of CCHR showed lower sensitivity (64%) than original study — possibly due to different population characteristics
- **2025 pilot study**: CCHR in seizure-related head injuries showed modest performance (LR+ 1.72, LR- 0.34) — may not apply well to seizure-related falls

### PECARN Updates (2024-2025)
- **2022 study (PMID: 36278996)**: Modified age-specific rule for infants <3 months — original PECARN may underperform in very young infants
- **Ongoing research** on PECARN implementation as computerized decision support showing reduced CT rates without missed injuries

### Contrast Allergy (2025)
- **ACR/AAAAI Joint Consensus (2025)**: Major shift away from routine premedication for mild reactions. Emphasis on contrast agent switching. Published in *J Allergy Clin Immunol In Practice*.
- **CAR/CSACI Practice Guidance (2025)**: Canadian guidelines aligned with contrast switching approach

### CMS Appropriate Use Criteria
- AUC program **paused by CMS** in CY 2024 — no timeline for resumption. Was intended to require CDS consultation before ordering advanced imaging.

### PE Workup
- **2024 PMC study (PMC11608861)**: Safety and diagnostic utility of PERC and D-dimer in ED — confirms PERC+D-dimer strategy is safe in low-risk patients
- **Legend Score (2024)**: New composite score synthesizing Wells, PERC, Geneva, and D-dimer to predict PE prior to imaging — published in *Pulmonology*

---

## 9. SUMMARY — KEY DECISION RULES BY CLINICAL SCENARIO

| Clinical Scenario | Decision Rule(s) | Action if Rule Negative |
|------------------|------------------|----------------------|
| Minor head injury (adult) | Canadian CT Head Rule | No CT needed |
| Pediatric head trauma (<2y) | PECARN <2 | No CT (or observation) |
| Pediatric head trauma (≥2y) | PECARN ≥2 | No CT (or observation) |
| C-spine clearance | Canadian C-Spine Rule → NEXUS | No imaging needed |
| Suspected PE (low risk) | PERC → if fails, D-dimer → if pos, Wells | PERC negative = done |
| Suspected DVT | Wells DVT → D-dimer → US | Low risk + neg D-dimer = done |
| Ankle/foot injury | Ottawa Ankle Rules | No X-ray needed |
| Knee injury | Ottawa Knee Rules / Pittsburgh | No X-ray needed |
| Suspected appendicitis | Alvarado Score | Low score = obs/discharge |
| Syncope | ACEP Choosing Wisely | No head CT if normal neuro |

---

## 10. CITATIONS INDEX

1. Nwakama CA, Storch BM, Ezenkwele UA. "The Renewed Necessity of Robust Clinical Judgment in CT Scan Utilization." *ACEP Now*. Dec 10, 2025. https://www.acepnow.com/article/the-renewed-necessity-of-robust-clinical-judgment-in-ct-scan-utilization/
2. Smith-Bindman R, et al. "Projected Lifetime Cancer Risks From Current Computed Tomography Imaging." *JAMA Intern Med*. 2025. PMID: 40227719.
3. Stiell IG, et al. "The Canadian CT Head Rule for patients with minor head injury." *Lancet*. 2001;357:1391-1396. PMID: 11356436.
4. Hoffman JR, et al. "Validity of a Set of Clinical Criteria to Rule Out Injury to the Cervical Spine in Patients with Blunt Trauma." *NEJM*. 2000;343:94-99. PMID: 10891516.
5. Stiell IG, et al. "The Canadian C-spine rule for radiography in alert and stable trauma patients." *JAMA*. 2001;286:1841-1848. PMID: 11597285.
6. Stiell IG, et al. "The Canadian C-Spine Rule versus the NEXUS Low-Risk Criteria in Patients with Trauma." *NEJM*. 2003;349:2510-2518. PMID: 14695411.
7. Kuppermann N, et al. "Identification of children at very low risk of clinically-important brain injuries after head trauma." *Lancet*. 2009;374:1160-1170. PMID: 19758692.
8. Wells PS, et al. "Derivation of a simple clinical model to categorize patients probability of pulmonary embolism." *Thromb Haemost*. 2000;83:416-420. PMID: 10744147.
9. Kline JA, et al. "Clinical criteria to prevent unnecessary diagnostic testing in ED patients with suspected PE." *J Thromb Haemost*. 2004;2:1247-1255. PMID: 15304025.
10. Wells PS, et al. "Value of assessment of pretest probability of deep-vein thrombosis in clinical management." *Lancet*. 1997;350:1795-1798. PMID: 9428249.
11. Stiell IG, et al. "A study to develop clinical decision rules for the use of radiography in acute ankle injuries." *Ann Emerg Med*. 1992;21:384-390. PMID: 1554175.
12. Stiell IG, et al. "Prospective validation of a decision rule for the use of radiography in acute knee injuries." *JAMA*. 1996;275:611-615. PMID: 8594242.
13. Seaberg DC, Jackson R. "Clinical decision rule for knee radiographs." *Am J Emerg Med*. 1994;12:541-543. PMID: 8060729.
14. Alvarado A. "A practical score for the early diagnosis of acute appendicitis." *Ann Emerg Med*. 1986;15:557-564. PMID: 3963537.
15. Smith-Bindman R, et al. "Radiation dose associated with common computed tomography examinations." *Arch Intern Med*. 2009;169:2078-2086.
16. ACOG Committee Opinion No. 723. "Guidelines for Diagnostic Imaging During Pregnancy and Lactation." Oct 2017. Reaffirmed 2021.
17. ACR Committee on Drugs and Contrast Media. *ACR Manual on Contrast Media*. 2024 Edition. https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual
18. ACR/AAAAI Joint Consensus Statement. "Management and Prevention of Hypersensitivity Reactions to Radiocontrast Media." *J Allergy Clin Immunol In Practice*. 2025.
19. Image Gently Campaign. http://www.imagegently.org/
20. ACEP Choosing Wisely Recommendations. https://www.choosingwisely.org/societies/american-college-of-emergency-physicians/
21. NCI Fact Sheet. "Computed Tomography (CT) Scans and Cancer." https://www.cancer.gov/about-cancer/diagnosis-staging/ct-scans-fact-sheet
22. RadiologyInfo.org. "Radiation Dose from X-Ray and CT Exams." https://www.radiologyinfo.org/en/info/safety-xray
