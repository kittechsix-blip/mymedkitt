// MedKitt — Oncological Emergencies (Triage → Recognition → Time-Critical Management)
// Triage → Febrile Neutropenia → TLS → Hypercalcemia of Malignancy → MSCC → SVC Syndrome → Hyperviscosity/Leukostasis → Disposition
// 8 modules covering the 6 core ED oncologic emergencies + chemo regimen reference

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const ONCOLOGICAL_EMERGENCIES_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Febrile neutropenia: ANC <500 + Temp ≥38.3°C (single) or ≥38.0°C sustained 1h — empiric antibiotics within 60 minutes', nodeId: 'onc-fn-recognize' },
  { text: 'TLS: aggressive IVF (NS 2-3 L/m²/day) FIRST; rasburicase if uric acid >8 or rapid rise — check G6PD if time allows', nodeId: 'onc-tls-treat' },
  { text: 'Hypercalcemia >14 mg/dL or symptomatic: NS 200-300 mL/hr + calcitonin 4 IU/kg SC q12h + zoledronic acid 4 mg IV', nodeId: 'onc-hyperca-treat' },
  { text: 'MSCC: dexamethasone 10 mg IV stat BEFORE imaging if high suspicion; emergent MRI whole spine within 24h', nodeId: 'onc-mscc-treat' },
  { text: 'SVC syndrome with cerebral edema or airway compromise: head elevation, dexamethasone, urgent stent or RT', nodeId: 'onc-svc-treat' },
  { text: 'Leukostasis (WBC >100k with symptoms): hydration + cytoreduction (hydroxyurea or leukapheresis); HOLD transfusions if possible', nodeId: 'onc-leuko-treat' },
];

export const ONCOLOGICAL_EMERGENCIES_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: TRIAGE / RECOGNITION
  // =====================================================================

  {
    id: 'onc-start',
    type: 'question',
    module: 1,
    title: 'Oncological Emergencies — Triage',
    body: '[Onc Emergency Steps Summary](#/info/onc-emergency-summary) | [Chemotherapy Regimens & Toxicities](#/info/chemo-regimens)\n\n**Background:** Cancer patients account for ~5% of ED visits but disproportionate morbidity. Six "must-not-miss" oncologic emergencies share a common trait: **early recognition + rapid time-critical action prevents death or permanent disability**. [1][2]\n\n**Always ask:**\n1. What is the cancer type and stage?\n2. What chemotherapy or targeted agent? When was last dose? (See [Chemo Regimens](#/info/chemo-regimens))\n3. Last ANC, platelets, electrolytes?\n4. Performance status (ECOG)?\n\nWhat is the chief complaint?',
    citation: [1, 2, 9],
    calculatorLinks: [
      { id: 'ecog-performance', label: 'ECOG Performance Status' },
      { id: 'mascc-score', label: 'MASCC Risk Index' },
    ],
    options: [
      {
        label: 'Fever in cancer patient',
        description: 'On chemo or recent chemo — suspect febrile neutropenia',
        next: 'onc-fn-recognize',
        urgency: 'critical',
      },
      {
        label: 'New lab abnormalities (K↑, PO4↑, Ca↓, urate↑)',
        description: 'Lymphoma/leukemia on induction or recent — suspect TLS',
        next: 'onc-tls-recognize',
        urgency: 'critical',
      },
      {
        label: 'AMS / weakness / polyuria / nausea',
        description: 'Breast/lung/myeloma → suspect hypercalcemia of malignancy',
        next: 'onc-hyperca-recognize',
      },
      {
        label: 'Back pain ± neuro deficit',
        description: 'Known cancer or new — suspect malignant cord compression',
        next: 'onc-mscc-recognize',
        urgency: 'critical',
      },
      {
        label: 'Facial/upper extremity swelling, dyspnea',
        description: 'Lung cancer/lymphoma — suspect SVC syndrome',
        next: 'onc-svc-recognize',
      },
      {
        label: 'Markedly elevated WBC + symptoms',
        description: 'AML/CML — suspect leukostasis or hyperviscosity',
        next: 'onc-leuko-recognize',
        urgency: 'critical',
      },
    ],
    summary: 'Six core onc emergencies: febrile neutropenia, TLS, hyperCa, MSCC, SVC syndrome, leukostasis',
  },

  // =====================================================================
  // MODULE 2: FEBRILE NEUTROPENIA
  // =====================================================================

  {
    id: 'onc-fn-recognize',
    type: 'question',
    module: 2,
    title: 'Febrile Neutropenia — Definition',
    body: '**IDSA/NCCN Definition:** [3][4]\n\n* **Fever:** Single oral temp **≥38.3°C (101°F)** OR sustained **≥38.0°C (100.4°F)** for ≥1 hour\n* **Neutropenia:** ANC **<500 cells/mm³** OR ANC <1000 with predicted decline to <500 within 48h\n\n**Profound neutropenia:** ANC <100 — highest infection risk\n\n**Key principle:** Up to 50% of febrile neutropenic patients have an established or occult infection. Bacteremia present in 10-25%. **Mortality without treatment exceeds 70%; with prompt antibiotics drops to <10%.** [3]\n\n**Time to antibiotics:** within **60 minutes of triage**. Every hour of delay increases mortality. [4]\n\nIs the patient febrile + neutropenic by these criteria?',
    citation: [3, 4],
    options: [
      {
        label: 'Yes — meets criteria',
        next: 'onc-fn-mascc',
        urgency: 'critical',
      },
      {
        label: 'No — afebrile but neutropenic',
        description: 'Still high infection risk — examine for occult source',
        next: 'onc-fn-occult',
      },
    ],
    summary: 'FN = ANC <500 + Temp ≥38.3°C single OR ≥38.0°C × 1hr; antibiotics within 60 min, mortality drops 70% → <10%',
  },

  {
    id: 'onc-fn-mascc',
    type: 'question',
    module: 2,
    title: 'MASCC Risk Stratification',
    body: '**MASCC Score** — predicts low-risk febrile neutropenia eligible for outpatient oral therapy. [5]\n\n| Variable | Points |\n|----------|--------|\n| Burden of illness: no/mild symptoms | 5 |\n| Burden of illness: moderate symptoms | 3 |\n| No hypotension (SBP >90) | 5 |\n| No COPD | 4 |\n| Solid tumor or no prior fungal infection | 4 |\n| No dehydration requiring IV fluids | 3 |\n| Outpatient at fever onset | 3 |\n| Age <60 years | 2 |\n\n**Score ≥21:** Low risk — outpatient oral therapy may be considered\n**Score <21:** High risk — admit, IV antibiotics\n\n**ALWAYS HIGH RISK regardless of score:**\n* ANC <100 expected >7 days\n* Hemodynamic instability\n* Mucositis interfering with PO\n* GI symptoms (abdominal pain, N/V, diarrhea)\n* Neurologic/mental changes\n* Indwelling catheter infection\n* Pulmonary infiltrate or hypoxia\n* Hepatic/renal insufficiency\n\nWhat is the risk category?',
    citation: [5],
    calculatorLinks: [
      { id: 'mascc-score', label: 'MASCC Calculator' },
    ],
    options: [
      {
        label: 'High Risk (MASCC <21 OR any high-risk feature)',
        next: 'onc-fn-high-risk',
        urgency: 'critical',
      },
      {
        label: 'Low Risk (MASCC ≥21, stable, reliable)',
        next: 'onc-fn-low-risk',
      },
    ],
    summary: 'MASCC ≥21 = low risk (oral outpatient possible); always high risk: ANC<100 >7d, instability, GI sx, hypoxia',
  },

  {
    id: 'onc-fn-high-risk',
    type: 'result',
    module: 2,
    title: 'High-Risk FN — Inpatient IV Antibiotics',
    body: '**Empiric Antibiotic Selection — within 60 minutes:** [3][4]\n\n**Monotherapy (preferred):**\n* **[Cefepime](#/drug/cefepime/febrile-neutropenia)** 2 g IV q8h, OR\n* **[Piperacillin-tazobactam](#/drug/piperacillin-tazobactam/febrile-neutropenia)** 4.5 g IV q6h, OR\n* **[Meropenem](#/drug/meropenem/febrile-neutropenia)** 1 g IV q8h (if ESBL or prior beta-lactam reaction)\n\n**Add Vancomycin if:** [3]\n* Hemodynamic instability / suspected sepsis\n* Suspected catheter-related infection\n* Skin/soft tissue infection\n* Pneumonia (until MRSA ruled out)\n* Severe mucositis\n* Known MRSA colonization\n* **NOT routine** — does not improve outcomes if not indicated\n\n**Add antifungal (echinocandin or [voriconazole](#/drug/voriconazole/invasive-aspergillus)) if:**\n* Persistent fever >4-7 days on broad-spectrum antibiotics\n* High-risk hematologic malignancy\n* Prolonged neutropenia\n\n**Workup:** [3][4]\n* 2 sets blood cultures (one peripheral + one from each port if applicable)\n* CBC, BMP, LFTs, lactate, UA + culture\n* CXR\n* Cultures from any suspected sites (sputum, wounds, stool if diarrhea)\n* Consider respiratory viral panel, CMV, RSV in season',
    recommendation: '**Admit. Cefepime 2g IV q8h within 60 min. Add vanc if unstable/catheter/MRSA risk. Cultures × 2 + UA + CXR.**',
    confidence: 'definitive',
    citation: [3, 4],
    summary: 'High-risk FN: monotherapy (cefepime/pip-tazo/meropenem) within 60 min + vanc only if specific indication',
  },

  {
    id: 'onc-fn-low-risk',
    type: 'result',
    module: 2,
    title: 'Low-Risk FN — Possible Outpatient Therapy',
    body: '**Outpatient oral therapy may be appropriate IF ALL of the following:** [3][5]\n\n* MASCC ≥21\n* No high-risk features (see prior node)\n* Reliable patient with reliable transportation\n* Phone access + can return within 1 hour\n* No medical contraindication to PO antibiotics\n* Oncologist agrees with outpatient management\n* Close follow-up arranged within 24-48h\n\n**Oral Regimen (combination required):** [3]\n* **[Ciprofloxacin](#/drug/ciprofloxacin/febrile-neutropenia)** 750 mg PO BID\n* PLUS **[Amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/febrile-neutropenia)** 875/125 mg PO BID\n* (If PCN allergic: cipro + clindamycin 600 mg PO TID)\n\n**Observation period:** Most centers observe 4-24 hours after first dose to ensure tolerance and stability before discharge.\n\n**ED management before discharge:**\n* First IV dose of cefepime (some centers)\n* OR first oral dose observed in ED\n* Anti-emetics PRN\n* Clear instructions: return for new fever, hypotension, AMS, vomiting\n\n**Default to admission if any uncertainty.**',
    recommendation: '**Low-risk FN: cipro + amox-clav PO; ED observation 4-24h; oncology follow-up within 24-48h. Default to admit if doubt.**',
    confidence: 'definitive',
    citation: [3, 5],
    summary: 'Low-risk FN: cipro 750 BID + amox-clav 875 BID + ED obs 4-24h + close oncology f/u; admit if any doubt',
  },

  {
    id: 'onc-fn-occult',
    type: 'result',
    module: 2,
    title: 'Neutropenic — Afebrile but High Risk',
    body: '**Even without fever, neutropenic patients can have life-threatening infection** — neutrophils are required to mount fever response. [3]\n\n**Look hard for occult infection:**\n* Catheter site (line tunnel pain, erythema)\n* Perirectal pain (perianal abscess can present without typical exam findings)\n* Oral mucositis with new pain\n* Subtle abdominal pain (typhlitis = neutropenic enterocolitis)\n* Sinus pain (consider mucormycosis)\n* New cough or hypoxia\n\n**Workup if any suspicion:**\n* CBC, BMP, lactate, blood cultures × 2\n* CT chest/abdomen if abdominal symptoms\n* Empiric antibiotics if any localizing finding\n\n**If truly asymptomatic + ANC >100:** monitor closely, neutropenic precautions, oncology follow-up.',
    recommendation: '**Afebrile neutropenia: hunt for occult source; treat empirically if any localizing sign; admit if ANC <100 or unstable.**',
    confidence: 'recommended',
    citation: [3],
    summary: 'Afebrile neutropenia: still high risk; look for catheter, perirectal, mucositis, typhlitis, sinus mucor',
  },

  // =====================================================================
  // MODULE 3: TUMOR LYSIS SYNDROME (TLS)
  // =====================================================================

  {
    id: 'onc-tls-recognize',
    type: 'info',
    module: 3,
    title: 'Tumor Lysis Syndrome — Cairo-Bishop Criteria',
    body: '**Cairo-Bishop Laboratory TLS** — ≥2 of the following within 3 days before to 7 days after cytotoxic therapy: [6][7]\n\n| Lab | Criterion |\n|-----|-----------|\n| Uric acid | ≥8 mg/dL or 25% increase |\n| Potassium | ≥6 mEq/L or 25% increase |\n| Phosphate | ≥4.5 mg/dL (adult) or 25% increase |\n| Calcium | ≤7 mg/dL or 25% decrease |\n\n**Clinical TLS** = Lab TLS + at least one of:\n* Creatinine ≥1.5× ULN\n* Cardiac dysrhythmia / sudden death\n* Seizure\n\n**Highest risk:**\n* Burkitt lymphoma\n* T-cell ALL with high WBC\n* Bulky non-Hodgkin lymphoma\n* AML with high WBC\n* CLL with bulky disease starting venetoclax\n* Hepatocellular carcinoma with TACE\n* Spontaneous TLS (rare, in highly proliferative tumors)\n\n**Key risk factors:** baseline elevated uric acid, baseline renal dysfunction, dehydration, oliguria.',
    citation: [6, 7],
    next: 'onc-tls-treat',
    summary: 'Cairo-Bishop: ≥2 lab abnormalities (urate↑, K↑, PO4↑, Ca↓); clinical TLS = lab + Cr/arrhythmia/seizure',
  },

  {
    id: 'onc-tls-treat',
    type: 'info',
    module: 3,
    title: 'TLS Management — Aggressive IVF + Hypouricemic Agent',
    body: '**Step 1 — Aggressive IV Hydration (cornerstone):** [6][7]\n* **Normal saline 2-3 L/m²/day** (200-250 mL/hr in adults if no CHF)\n* Goal urine output: **>100 mL/hr** (maintain even if oliguric — push fluids unless overload)\n* AVOID potassium-containing fluids (no LR)\n* AVOID alkalinization (urine alkalinization no longer recommended — promotes calcium phosphate precipitation)\n\n**Step 2 — Hypouricemic Therapy:** [6][8]\n\n**[Allopurinol](#/drug/allopurinol/tls)** for low-intermediate risk:\n* 300 mg PO daily, start 2-3 days before chemo\n* Blocks xanthine oxidase → prevents NEW urate formation\n* Does NOT lower existing urate\n\n**[Rasburicase](#/drug/rasburicase/tls)** for high-risk or established TLS:\n* 0.2 mg/kg IV × 1 (single dose effective in most cases)\n* Recombinant urate oxidase — converts urate to allantoin\n* Drops urate within hours\n* **CHECK G6PD if time allows** — contraindicated in G6PD deficiency (causes hemolysis)\n* CONTRAINDICATED in pregnancy, breastfeeding\n* **Sample handling:** post-rasburicase uric acid samples must be on ice — false low otherwise\n\n**Step 3 — Manage Electrolyte Derangements:**\n* **Hyperkalemia:** see [Hyperkalemia consult] — calcium gluconate, insulin/D50, kayexalate, dialysis\n* **Hyperphosphatemia:** [sevelamer](#/drug/sevelamer/hyperphosphatemia) 800-1600 mg PO TID with meals; aluminum hydroxide acutely\n* **Hypocalcemia:** treat ONLY if symptomatic (Ca + PO4 product >60 → precipitation risk); calcium gluconate 1-2g IV slow\n* **Hyperuricemia:** rasburicase as above\n\n**Step 4 — Renal Replacement Therapy if:**\n* K >6.5 refractory to medical therapy\n* PO4 >10 or rapidly rising\n* Symptomatic hypocalcemia from PO4 binding\n* Volume overload preventing adequate hydration\n* Uremia symptoms\n* Acidosis refractory\n\n**Disposition:** ICU for clinical TLS or high-risk lab TLS; telemetry minimum for any lab TLS.',
    citation: [6, 7, 8],
    calculatorLinks: [
      { id: 'corrected-calcium', label: 'Corrected Calcium' },
    ],
    next: 'onc-tls-disposition',
    summary: 'TLS: NS 2-3 L/m²/d (UOP >100 mL/hr) + rasburicase if urate >8 (check G6PD!); no alkalinization; HD for refractory K/PO4',
  },

  {
    id: 'onc-tls-disposition',
    type: 'result',
    module: 3,
    title: 'TLS — Admit ICU or Telemetry',
    body: '**Disposition:**\n* **Clinical TLS** (renal/arrhythmia/seizure) → **ICU**\n* **Lab TLS with high-risk tumor or rapidly worsening labs** → **ICU**\n* **Lab TLS, stable** → **Telemetry** with q4-6h electrolytes\n* Continue IVF + rasburicase/allopurinol\n* Nephrology consult if Cr rising or RRT considered\n\n**Monitoring (q4-6h initially):**\n* BMP, phosphate, calcium, magnesium, uric acid\n* Strict I/O\n* Continuous cardiac monitoring',
    recommendation: '**ICU for clinical TLS or high-risk lab TLS. Continue NS 200-250 mL/hr, rasburicase 0.2 mg/kg, q4-6h labs.**',
    confidence: 'definitive',
    citation: [6, 7],
    summary: 'Clinical TLS → ICU; lab TLS → telemetry/ICU; q4-6h labs, strict I/O, continuous cardiac monitoring',
  },

  // =====================================================================
  // MODULE 4: HYPERCALCEMIA OF MALIGNANCY
  // =====================================================================

  {
    id: 'onc-hyperca-recognize',
    type: 'question',
    module: 4,
    title: 'Hypercalcemia of Malignancy — Severity',
    body: '**Most common metabolic complication of cancer** — occurs in 20-30% of patients during disease course. Usually indicates advanced disease; median survival 30 days untreated. [9][10]\n\n**Mechanisms:**\n* **PTHrP (humoral)** — squamous (lung, H&N), renal, breast, ovarian (~80%)\n* **Osteolytic mets** — breast, multiple myeloma, lymphoma\n* **1,25-vit-D production** — lymphomas, granulomatous\n* **Ectopic PTH** — extremely rare\n\n**Symptoms by Severity:**\n* **Mild (Ca 10.5-12)**: often asymptomatic; polyuria, fatigue, constipation\n* **Moderate (12-14)**: nausea, vomiting, weakness, dehydration, AMS\n* **Severe (>14)**: lethargy, coma, arrhythmia, AKI — MEDICAL EMERGENCY\n\n**Always order:**\n* Albumin (correct Ca)\n* Ionized calcium (gold standard)\n* PTH (suppressed in HCM), PTHrP, vit D 25-OH and 1,25-OH\n* Phosphate, Mg, Cr, BUN\n* ECG (look for short QT, J wave, AV block)\n\n**Corrected Ca = measured Ca + 0.8 × (4 − albumin)**\n\nWhat is the corrected/ionized calcium level?',
    citation: [9, 10],
    calculatorLinks: [
      { id: 'corrected-calcium', label: 'Corrected Calcium' },
    ],
    options: [
      {
        label: 'Severe (Ca >14 OR symptomatic)',
        next: 'onc-hyperca-treat',
        urgency: 'critical',
      },
      {
        label: 'Moderate (12-14, mild-moderate sx)',
        next: 'onc-hyperca-treat',
      },
      {
        label: 'Mild (10.5-12, asymptomatic)',
        next: 'onc-hyperca-mild',
      },
    ],
    summary: 'HCM: PTHrP 80% (squamous, breast, renal); severe = Ca >14 or symptomatic; check PTH, PTHrP, vit D',
  },

  {
    id: 'onc-hyperca-treat',
    type: 'info',
    module: 4,
    title: 'HCM Treatment — IVF + Calcitonin + Bisphosphonate',
    body: '**Step 1 — Aggressive IV Hydration (cornerstone):** [9][10]\n* **Normal saline 200-300 mL/hr** until euvolemic, then 100-150 mL/hr\n* Goal urine output >100 mL/hr\n* Most patients are profoundly volume depleted from hypercalcemia-induced nephrogenic DI\n* Avoid LR (contains calcium)\n* AVOID loop diuretics in routine cases — only use if volume overload develops; prior dogma of forced calciuresis with furosemide is not supported by evidence and can worsen depletion [10]\n\n**Step 2 — Calcitonin (rapid onset, short duration):**\n* **[Calcitonin](#/drug/calcitonin/hypercalcemia)** 4 IU/kg SC or IM q12h\n* Drops Ca by 1-2 mg/dL within 4-6 hours\n* Tachyphylaxis develops within 48-72 hours\n* Bridge while bisphosphonate takes effect\n\n**Step 3 — Bisphosphonate (sustained effect):**\n* **[Zoledronic acid](#/drug/zoledronic-acid/hypercalcemia)** 4 mg IV over 15-30 minutes — preferred over pamidronate (more potent, faster)\n* Onset 24-48 hours; peak effect 4-7 days; duration 4 weeks\n* Adjust dose for renal function (avoid if CrCl <30)\n* Risks: osteonecrosis of jaw (long-term), atypical femur fracture, acute kidney injury\n\n**Step 4 — Denosumab (if renal failure or bisphosphonate-refractory):**\n* **[Denosumab](#/drug/denosumab/hypercalcemia)** 120 mg SC\n* RANKL inhibitor — does not require renal clearance\n* Use when CrCl <30 or refractory after 7 days of bisphosphonate\n* Risk: severe hypocalcemia (monitor)\n\n**Step 5 — Steroids (if vit-D mediated):**\n* Lymphoma, myeloma, granulomatous disease\n* [Prednisone](#/drug/prednisone/hypercalcemia) 40-60 mg PO daily\n\n**Step 6 — Hemodialysis if:**\n* Ca >18 with neuro/cardiac sx\n* Renal failure preventing IVF\n* Refractory to medical therapy',
    citation: [9, 10],
    calculatorLinks: [
      { id: 'corrected-calcium', label: 'Corrected Calcium' },
    ],
    next: 'onc-hyperca-disposition',
    summary: 'HCM: NS 200-300 mL/hr + calcitonin 4 IU/kg q12h (rapid bridge) + zoledronic acid 4 mg IV (sustained); avoid loop diuretics',
  },

  {
    id: 'onc-hyperca-mild',
    type: 'result',
    module: 4,
    title: 'Mild HCM — Treat Underlying Cause',
    body: '**Mild asymptomatic hypercalcemia (Ca 10.5-12):**\n\n* Generous oral hydration (3-4 L/day)\n* Avoid thiazides, lithium, calcium/vit D supplements\n* Mobilization (immobility worsens calcium release)\n* Treat underlying malignancy — most effective long-term strategy\n* Outpatient endocrine + oncology follow-up within 1 week\n* Repeat Ca in 24-48h to confirm stable\n\n**Admit if:**\n* Rising despite hydration\n* New symptoms develop\n* Concomitant illness',
    recommendation: '**Mild HCM: oral hydration, avoid thiazides/Ca/vit-D, mobilize, oncology f/u 1 week. Admit if rising.**',
    confidence: 'recommended',
    citation: [9],
    summary: 'Mild HCM: PO fluids, stop thiazides/Ca/vit-D, mobilize, treat underlying cancer, 1-wk f/u',
  },

  {
    id: 'onc-hyperca-disposition',
    type: 'result',
    module: 4,
    title: 'HCM — Admit',
    body: '**Disposition:**\n* **Severe (Ca >14) or symptomatic** → ICU or telemetry depending on AMS/arrhythmia\n* **Moderate (12-14)** → telemetry or stepdown\n* Repeat Ca q6-12h\n* Endocrinology + oncology consult\n* Ca usually drops 1-2 mg/dL/day with treatment\n* Calcitonin tachyphylaxis after 48-72h — bisphosphonate carries the long-term load',
    recommendation: '**Admit. ICU/telemetry. Continue NS + calcitonin + zoledronic acid. Recheck Ca q6-12h. Endo + onc consult.**',
    confidence: 'definitive',
    citation: [9, 10],
    summary: 'HCM admit: ICU if severe/AMS, tele if moderate, q6-12h Ca, expect 1-2 mg/dL/day decline',
  },

  // =====================================================================
  // MODULE 5: METASTATIC SPINAL CORD COMPRESSION (MSCC)
  // =====================================================================

  {
    id: 'onc-mscc-recognize',
    type: 'question',
    module: 5,
    title: 'MSCC — Red Flag Recognition',
    body: '**MSCC affects 5-10% of cancer patients.** First sign of cancer in 20%. **Time-critical: ambulatory at presentation predicts ambulatory at 30 days; paraplegia is largely irreversible.** [11][12]\n\n**Most Common Primaries:**\n* Lung, breast, prostate (50% of cases)\n* Multiple myeloma, lymphoma, renal, melanoma\n\n**Location:**\n* Thoracic 60-70% (most common)\n* Lumbosacral 20-30%\n* Cervical 10%\n* Multi-level in 30%\n\n**Red flags in cancer patient with back pain:**\n* New or worsening back pain (often weeks before neuro signs)\n* Pain worse at night or recumbent\n* Pain on Valsalva, cough, sneeze\n* Saddle anesthesia\n* Bowel/bladder dysfunction (urinary retention or incontinence)\n* Weakness in legs (usually symmetric, gradual)\n* Sensory level on exam\n* Hyperreflexia or upgoing toes (UMN signs)\n* Spinal tenderness on percussion\n\n**Exam essentials:** complete motor + sensory exam (with sensory level), reflexes, rectal tone, post-void residual, gait if safe.\n\nDo any of these red flags apply?',
    citation: [11, 12],
    options: [
      {
        label: 'Yes — high suspicion for MSCC',
        next: 'onc-mscc-treat',
        urgency: 'critical',
      },
      {
        label: 'Back pain only, no neuro signs',
        description: 'Still consider — pain often precedes neuro deficit by weeks',
        next: 'onc-mscc-imaging',
      },
    ],
    summary: 'MSCC: lung/breast/prostate top 3; thoracic 60%; ambulatory at presentation = ambulatory at 30d; act fast',
  },

  {
    id: 'onc-mscc-treat',
    type: 'info',
    module: 5,
    title: 'MSCC — Steroids First, Then Image',
    body: '**Step 1 — Dexamethasone IMMEDIATELY (do not wait for imaging):** [11][13]\n* **[Dexamethasone](#/drug/dexamethasone/mscc)** 10 mg IV bolus, then 4 mg IV/PO q6h\n* Some protocols use higher loading dose (96 mg) for severe deficit — efficacy similar, more side effects\n* Reduces vasogenic edema → preserves neurologic function\n* Start before imaging if high suspicion — every minute of cord compression risks permanent deficit\n\n**Step 2 — Emergent MRI of WHOLE Spine:** [11][12]\n* MRI with gadolinium\n* **Image entire spine** — multi-level disease in 30%, missing co-lesions affects radiation planning\n* If MRI unavailable: CT myelogram\n* CT alone insufficient\n\n**Step 3 — Multi-disciplinary Consults (call from ED):**\n* **Neurosurgery** (spine surgery) — for surgical decompression candidates\n* **Radiation Oncology** — for emergent radiation\n* **Medical Oncology** — for tumor type, primary tx options\n\n**Step 4 — Definitive Treatment Selection:**\n\n**Surgery + Radiation (Patchell 2005 trial standard):** [13]\n* For ambulatory or recently non-ambulatory (<48h) patients with ≥3 month life expectancy\n* Single-level compression\n* Stable spine\n* Demonstrated to preserve ambulation in RCT (84% vs 57% with RT alone)\n\n**Radiation alone:**\n* Patients not surgical candidates\n* Multi-level disease\n* Radiosensitive tumors (lymphoma, myeloma, small cell lung, germ cell)\n* Life expectancy <3 months\n\n**Chemotherapy:**\n* Highly chemo-sensitive tumors (germ cell, lymphoma, SCLC)\n* Adjunct to RT/surgery\n\n**Step 5 — Supportive:**\n* Foley catheter if retention\n* Bowel regimen\n* DVT prophylaxis (mechanical only if surgery imminent; chemical otherwise)\n* Pain control: opioids, gabapentin for neuropathic component',
    citation: [11, 12, 13],
    next: 'onc-mscc-disposition',
    summary: 'MSCC: dex 10 mg IV STAT (before imaging) → MRI whole spine → neurosurg + rad onc consult; surgery + RT > RT alone if ambulatory',
  },

  {
    id: 'onc-mscc-imaging',
    type: 'info',
    module: 5,
    title: 'Cancer + Back Pain — Image Liberally',
    body: '**Cancer patient with new back pain — even without neurologic findings — warrants urgent imaging.** Pain precedes neurologic deficit by weeks in most cases. Recovery of function once neurologic deficit develops is dismal.\n\n**Approach:**\n* MRI whole spine with gadolinium within 24 hours\n* Plain films are inadequate to rule out MSCC\n* Consider dexamethasone empirically if delay anticipated and high pretest probability\n* Discuss with oncology: outpatient MRI (if next-day available + reliable patient + no neuro signs) vs ED MRI\n\nIf imaging confirms compression → return to MSCC treatment pathway.',
    citation: [11, 12],
    next: 'onc-mscc-treat',
    summary: 'Cancer + new back pain: urgent MRI within 24h; pain often precedes deficit by weeks',
  },

  {
    id: 'onc-mscc-disposition',
    type: 'result',
    module: 5,
    title: 'MSCC — Admit Neurosurgery / Onc',
    body: '**Disposition:**\n* Admit to **Neurosurgery** if surgical candidate, OR **Oncology** if RT-only plan\n* Telemetry if high thoracic/cervical lesion (autonomic risk)\n* Continue dexamethasone\n* Foley if retention\n* Strict bedrest with logroll until surgical/RT plan finalized for unstable spine\n* DVT prophylaxis (mechanical pre-op, then chemical post-op)\n\n**Outcomes:**\n* Ambulatory at presentation → 70-80% remain ambulatory at 30 days\n* Non-ambulatory at presentation → only 20-30% regain ambulation\n* Median survival post-MSCC: 3-6 months (depends on primary)',
    recommendation: '**Admit. Continue dex 4 mg IV q6h. Neurosurg vs RT-onc plan. Foley if retention. Logroll precautions until spine cleared.**',
    confidence: 'definitive',
    citation: [11, 12, 13],
    summary: 'MSCC admit: neurosurg if surgical, onc if RT; logroll precautions; ambulatory at presentation predicts outcome',
  },

  // =====================================================================
  // MODULE 6: SVC SYNDROME
  // =====================================================================

  {
    id: 'onc-svc-recognize',
    type: 'question',
    module: 6,
    title: 'SVC Syndrome — Recognition',
    body: '**SVC syndrome** = obstruction of superior vena cava → impaired venous drainage from head, neck, upper extremities. Cancer is the cause in **>60% of cases** (lung cancer 50%, lymphoma 25%). Indwelling catheter thrombosis is the leading non-malignant cause and is increasing. [14][15]\n\n**Classic presentation:**\n* Facial swelling/plethora (worse on bending forward — Pemberton sign)\n* Distended neck and chest wall veins\n* Upper extremity edema\n* Dyspnea, cough\n* Hoarseness, dysphagia (laryngeal/esophageal compression)\n* Headache, dizziness, visual changes\n* AMS, syncope (cerebral edema = emergency)\n* Stridor (airway compromise = emergency)\n\n**Yale Severity Grade:**\n| Grade | Findings |\n|-------|----------|\n| 0 | Asymptomatic, radiographic only |\n| 1 | Mild edema, no functional impairment |\n| 2 | Moderate edema, functional impairment (hoarseness, mild dyspnea) |\n| 3 | Severe edema with cerebral or laryngeal effect |\n| 4 | Life-threatening: significant cerebral edema, airway compromise, hemodynamic collapse |\n| 5 | Death |\n\nWhat is the severity?',
    citation: [14, 15],
    options: [
      {
        label: 'Grade 4 — life-threatening (cerebral edema, airway, shock)',
        next: 'onc-svc-emergency',
        urgency: 'critical',
      },
      {
        label: 'Grade 2-3 — symptomatic',
        next: 'onc-svc-workup',
      },
      {
        label: 'Grade 0-1 — minimal symptoms',
        next: 'onc-svc-workup',
      },
    ],
    summary: 'SVC: lung 50%, lymphoma 25%; Yale grade 4 = cerebral edema/airway/shock = emergent',
  },

  {
    id: 'onc-svc-emergency',
    type: 'result',
    module: 6,
    title: 'SVC — Life-Threatening (Yale 4)',
    body: '**EMERGENT INTERVENTION REQUIRED:** [14][15]\n\n**Immediate stabilization:**\n* Head of bed elevated 30-45°\n* Supplemental oxygen\n* Avoid IV access in upper extremities (use lower extremity or femoral)\n* **Consider intubation** if airway compromise — anticipate difficult airway (edema, friable tissue)\n* Hemodynamic support if shock\n\n**Empiric Steroids (if airway/CNS compromise — controversial in lymphoma without tissue dx):**\n* **[Dexamethasone](#/drug/dexamethasone/svc-syndrome)** 10 mg IV, then 4 mg q6h\n* CAUTION: steroids can obscure histology in lymphoma — get tissue dx first if possible, but do not delay if life-threatening\n\n**Definitive:**\n* **Endovascular SVC stent** (IR consult immediately) — fastest symptom relief, often within 24-48 hours\n* Anticoagulation if catheter-associated thrombus\n* Radiation as soon as histology confirmed\n\n**Avoid empiric chemo without tissue dx** — destroys histologic detail, prevents definitive diagnosis.',
    recommendation: '**Yale 4 SVC: HOB up, lower extremity IV, dexamethasone 10 mg IV, urgent IR consult for stent, secure airway if needed.**',
    confidence: 'definitive',
    citation: [14, 15],
    summary: 'SVC emergency: HOB up, LE IV access, dex 10 mg IV, urgent IR for stent; intubate carefully if airway compromise',
  },

  {
    id: 'onc-svc-workup',
    type: 'info',
    module: 6,
    title: 'SVC — Workup Before Empiric Treatment',
    body: '**Workup priorities:** [14][15]\n\n1. **CT chest with IV contrast** — confirms SVC obstruction, identifies cause and extent (mass vs thrombus)\n2. **Tissue diagnosis** — critical before therapy selection:\n   * Bronchoscopy if endobronchial mass\n   * Mediastinoscopy or CT-guided biopsy of mass\n   * Excisional biopsy if peripheral lymphadenopathy\n   * Bone marrow biopsy if hematologic malignancy suspected\n3. **Labs:** CBC, CMP, LDH, uric acid (TLS risk if lymphoma), coags\n4. **Consult oncology + radiation oncology + IR**\n\n**Initial measures (Yale 0-3):**\n* HOB elevated 30°\n* Supplemental O2 PRN\n* Loop diuretic only if symptomatic edema (avoid aggressive diuresis — hypotension worsens delivery)\n* Avoid upper extremity IVs/lines\n\n**Definitive Treatment by Tumor Type:**\n* **Small cell lung cancer / lymphoma / germ cell:** chemotherapy first (chemo-sensitive)\n* **NSCLC:** SVC stent + radiation\n* **Indolent or stable presentation:** stent + tissue dx + targeted therapy\n* **Catheter-associated thrombus:** anticoagulation, catheter removal if not essential, consider thrombolysis if recent\n\n**Stent timing:** First-line for symptomatic relief in most cases — provides relief in 95%+ within 72 hours. Radiation alone takes 1-2 weeks.',
    citation: [14, 15],
    calculatorLinks: [
      { id: 'ecog-performance', label: 'ECOG' },
    ],
    next: 'onc-svc-disposition',
    summary: 'SVC workup: CT chest + tissue dx BEFORE empiric tx; stent first-line (95% relief in 72h); chemo if SCLC/lymphoma/germ cell',
  },

  {
    id: 'onc-svc-disposition',
    type: 'result',
    module: 6,
    title: 'SVC — Admit',
    body: '**Disposition:**\n* **Yale 4** → ICU\n* **Yale 2-3** → telemetry/stepdown\n* **Yale 0-1** → admit oncology\n* HOB elevated, lower extremity IV access\n* IR + oncology + radiation oncology consults\n* Anticoagulation decision based on cause (thrombus vs mass)',
    recommendation: '**Admit. Severity-appropriate level. HOB up, LE IV, IR + onc + RT-onc consults. Anticoagulate if catheter thrombus.**',
    confidence: 'definitive',
    citation: [14, 15],
    summary: 'SVC admit: ICU if Yale 4, tele if Yale 2-3, ward if Yale 0-1; HOB up, LE IV, multi-disciplinary consult',
  },

  // =====================================================================
  // MODULE 7: HYPERVISCOSITY / LEUKOSTASIS
  // =====================================================================

  {
    id: 'onc-leuko-recognize',
    type: 'question',
    module: 7,
    title: 'Leukostasis vs Hyperviscosity — Recognition',
    body: '**Two related but distinct emergencies:** [16][17]\n\n**Leukostasis** (cellular hyperviscosity):\n* WBC **>100,000/mm³** (usually with blast cells) — but symptoms can occur at lower WBC in AML\n* **AML > ALL > CML in blast crisis**\n* Symptoms: hypoxia, dyspnea, headache, dizziness, AMS, visual changes, retinal hemorrhage, priapism\n* Mortality 20-40% in first week if untreated\n\n**Hyperviscosity Syndrome** (protein):\n* Markedly elevated **IgM (Waldenström) > IgA > IgG**\n* Serum viscosity >4 cp (normal 1.4-1.8)\n* Symptoms: epistaxis, gingival bleeding, blurred vision, headache, AMS, "sausage-link" retinal veins\n\n**Common features:** AMS, visual changes, dyspnea, fundoscopic abnormalities, mucosal bleeding\n\n**Workup:**\n* CBC with differential and peripheral smear (look for blasts)\n* DIC panel (PT/PTT/fibrinogen/D-dimer)\n* Uric acid, K, PO4 (TLS comorbidity)\n* SPEP/UPEP if hyperviscosity suspected\n* Serum viscosity\n* Type and cross\n* Fundoscopy\n\nWhat is the picture?',
    citation: [16, 17],
    options: [
      {
        label: 'Leukostasis (WBC >100k + symptoms)',
        next: 'onc-leuko-treat',
        urgency: 'critical',
      },
      {
        label: 'Hyperviscosity (paraprotein, viscosity >4)',
        next: 'onc-hyperviscosity-treat',
        urgency: 'critical',
      },
      {
        label: 'High WBC, asymptomatic',
        next: 'onc-leuko-asymptomatic',
      },
    ],
    summary: 'Leukostasis = cellular (AML, WBC >100k); hyperviscosity = protein (IgM Waldenström); both → AMS, vision, dyspnea',
  },

  {
    id: 'onc-leuko-treat',
    type: 'info',
    module: 7,
    title: 'Leukostasis Management',
    body: '**Step 1 — Hydration + TLS Prophylaxis:** [16][17]\n* IV fluids (NS, avoid LR)\n* **[Allopurinol](#/drug/allopurinol/tls)** 300 mg PO daily OR rasburicase if uric acid >8 (anticipate TLS as cells lyse)\n* Strict I/O\n\n**Step 2 — Cytoreduction:**\n\n**Hydroxyurea (first-line if available):**\n* **[Hydroxyurea](#/drug/hydroxyurea/leukostasis)** 50-100 mg/kg/day PO divided BID-TID\n* Drops WBC by 50-80% within 24-48 hours\n* Continued until induction chemo started\n\n**Leukapheresis:**\n* Indicated for severe leukostasis (especially neuro/respiratory)\n* Drops WBC 30-60% in single session\n* **CONTRAINDICATED in APL (acute promyelocytic leukemia, M3 AML)** — can precipitate severe DIC\n* Bridge to definitive induction chemo\n\n**Definitive — Induction chemotherapy** (oncology drives this) — only definitive treatment\n\n**Step 3 — Avoid Pitfalls:**\n* **Hold packed RBC transfusions if possible** — increases viscosity, can worsen leukostasis (transfuse only if Hgb <7 or symptomatic anemia)\n* Diuretics worsen viscosity\n* Avoid nephrotoxic contrast if possible\n\n**Step 4 — Manage Comorbidities:**\n* TLS prophylaxis (see TLS module)\n* DIC if present\n* Respiratory failure may require intubation; consider ECMO bridge\n* Suspected APL → start [ATRA](#/drug/atra/apl) (all-trans retinoic acid) 45 mg/m²/day immediately on suspicion (do not wait for confirmation)',
    citation: [16, 17],
    calculatorLinks: [
      { id: 'corrected-calcium', label: 'Corrected Ca' },
    ],
    next: 'onc-leuko-disposition',
    summary: 'Leukostasis: hydration + allopurinol + hydroxyurea 50-100 mg/kg or leukapheresis (NOT in APL) + induction chemo; HOLD pRBCs',
  },

  {
    id: 'onc-hyperviscosity-treat',
    type: 'result',
    module: 7,
    title: 'Hyperviscosity Syndrome — Plasmapheresis',
    body: '**Treatment:** [17]\n\n**Step 1 — Plasmapheresis (definitive symptom relief):**\n* Hematology consult immediately\n* Removes paraprotein quickly — symptom relief within 24 hours\n* 1-1.5 plasma volume exchange\n* May need repeat sessions until induction therapy effective\n\n**Step 2 — Underlying disease therapy:**\n* Waldenström macroglobulinemia: rituximab + chemo (BTK inhibitors)\n* Multiple myeloma: chemo + steroids + ASCT planning\n\n**Step 3 — Avoid:**\n* **Avoid pRBC transfusion** before plasmapheresis (worsens viscosity)\n* Caution with IV contrast\n\n**Disposition:** Admit hematology, ICU if neurologic compromise.',
    recommendation: '**Plasmapheresis emergently (heme consult). Avoid pRBC transfusion until viscosity reduced. Admit heme/ICU.**',
    confidence: 'definitive',
    citation: [17],
    summary: 'Hyperviscosity: plasmapheresis emergently; avoid pRBCs; underlying tx (rituximab if WM, chemo if MM)',
  },

  {
    id: 'onc-leuko-asymptomatic',
    type: 'result',
    module: 7,
    title: 'High WBC, Asymptomatic',
    body: '**Asymptomatic patient with high WBC:**\n\n* Admit hematology/oncology for monitoring + TLS prophylaxis\n* IV hydration\n* Allopurinol\n* Frequent labs (q6h initially)\n* Pre-emptive cytoreduction if WBC trajectory rising rapidly or AML\n* Watch for symptom development\n\n**Threshold for empiric cytoreduction varies by lineage:**\n* AML: WBC >50-100k → hydroxyurea even if asymptomatic\n* CML chronic phase: usually well-tolerated, manage outpatient with imatinib\n* CLL: rarely causes leukostasis (smaller cells)',
    recommendation: '**Admit heme/onc. IVF + allopurinol + frequent labs. Cytoreduce if AML >50k or rising rapidly.**',
    confidence: 'recommended',
    citation: [16, 17],
    summary: 'Asymptomatic high WBC: admit, IVF, allopurinol, q6h labs; cytoreduce AML >50-100k or rising fast',
  },

  {
    id: 'onc-leuko-disposition',
    type: 'result',
    module: 7,
    title: 'Leukostasis — ICU Admit',
    body: '**Disposition:**\n* **Symptomatic leukostasis** → ICU\n* Heme/onc + apheresis service consults from ED\n* Continue hydration, allopurinol/rasburicase, hydroxyurea\n* Plan for leukapheresis (unless APL) or immediate induction\n* Strict transfusion stewardship\n* Monitor for TLS (often worsens with cytoreduction)\n\n**APL (suspected M3 AML):**\n* **DO NOT leukapheresis** — high DIC risk\n* Start ATRA 45 mg/m²/day immediately on clinical suspicion\n* Aggressive blood product support (cryo, FFP, platelets)\n* Coagulopathy is the leading cause of early death',
    recommendation: '**ICU. Continue hydration, allopurinol, hydroxyurea. Heme/apheresis consult. NO apheresis if APL — start ATRA immediately.**',
    confidence: 'definitive',
    citation: [16, 17],
    summary: 'Leukostasis ICU: continue cytoreduction, watch for TLS; APL is the exception — no apheresis, ATRA immediately',
  },

  // =====================================================================
  // MODULE 8: REFERENCE / CHEMO SIDE EFFECTS
  // =====================================================================

  {
    id: 'onc-chemo-reference',
    type: 'info',
    module: 8,
    title: 'Chemotherapy Reference — Nadirs & Toxicities',
    body: '[Comprehensive Chemotherapy Regimens & Side Effects](#/info/chemo-regimens)\n\n**ED-Critical Toxicity Patterns:**\n\n**Cardiotoxicity:**\n* Anthracyclines (doxorubicin, daunorubicin) — cumulative dose-dependent CHF\n* Trastuzumab — reversible LV dysfunction\n* 5-FU, capecitabine — coronary vasospasm\n* Immune checkpoint inhibitors — myocarditis (rare but lethal)\n\n**Pulmonary:**\n* Bleomycin — pulmonary fibrosis (avoid high FiO2)\n* Methotrexate — pneumonitis\n* Checkpoint inhibitors — pneumonitis (steroids)\n\n**Nephrotoxicity:**\n* Cisplatin — tubular injury\n* Methotrexate — crystalluria (alkalinize, leucovorin rescue)\n* Ifosfamide — Fanconi syndrome\n\n**Neurotoxicity:**\n* Vincristine — peripheral neuropathy, never IT (fatal)\n* Oxaliplatin — cold-triggered dysesthesia\n* Ifosfamide — encephalopathy (methylene blue rescue)\n* Cisplatin — ototoxicity\n\n**Hematologic Nadirs:**\n* Most cytotoxics: nadir day 7-14, recovery day 21-28\n* Carboplatin/cisplatin: nadir day 14-21\n* Mitomycin: delayed nadir day 28-42\n* Always check date of last cycle and nadir expectation\n\n**Immune-Related Adverse Events (ICI):**\n* Can occur weeks to months after dose\n* Colitis (steroids + infliximab if refractory)\n* Hepatitis\n* Endocrinopathies (thyroiditis, hypophysitis, adrenalitis)\n* Pneumonitis\n* Myocarditis\n\n**Extravasation Emergencies:**\n* Anthracyclines, vinca alkaloids → severe tissue necrosis\n* Stop infusion, aspirate, do NOT flush\n* Anthracycline: dexrazoxane antidote within 6h\n* Vinca: hyaluronidase + warm compress\n* Mitomycin: cold compress + DMSO',
    citation: [18, 19],
    next: 'onc-disposition-summary',
    summary: 'Chemo toxicities: cardiotox (anthracyclines), pulm (bleo), neuro (vinca), nadir d7-14; ICI = irAEs weeks-months later',
  },

  {
    id: 'onc-disposition-summary',
    type: 'result',
    module: 8,
    title: 'Final Disposition Summary',
    body: '**Common ED Disposition Threads:**\n\n* **Always involve oncology** — primary team knows the patient, prognosis, goals of care\n* **Goals of care discussion** — many patients have advance directives or prognostic limitations affecting decisions\n* **Pain control** — under-treated in cancer patients; standard opioid principles apply\n* **Anti-emetics** — ondansetron + dexamethasone preferred; avoid prochlorperazine in setting of seizure risk\n* **DVT prophylaxis** — cancer patients are hypercoagulable; chemical prophylaxis unless active bleeding\n* **Document performance status** (ECOG/Karnofsky) — guides decision-making\n\n**Send-Home Pearls:**\n* Return immediately for fever, new shortness of breath, weakness, severe pain\n* Provide direct line to oncology team\n* Confirm next chemo cycle / clinic appointment',
    recommendation: '**Always: oncology consult, goals-of-care discussion, performance status documented, clear return precautions.**',
    confidence: 'definitive',
    citation: [1, 2],
    summary: 'Disposition: always loop in oncology; document ECOG; goals of care; clear return precautions',
  },
];

// =====================================================================
// MODULE LABELS
// =====================================================================

export const ONCOLOGICAL_EMERGENCIES_MODULE_LABELS = [
  'Triage',
  'Febrile Neutropenia',
  'Tumor Lysis',
  'Hypercalcemia',
  'Cord Compression',
  'SVC Syndrome',
  'Leukostasis',
  'Chemo Reference',
];

// =====================================================================
// CITATIONS
// =====================================================================

export const ONCOLOGICAL_EMERGENCIES_CITATIONS: Citation[] = [
  { num: 1, text: 'Higdon ML, Atkinson CJ, Lawrence KV. Oncologic Emergencies: Recognition and Initial Management. Am Fam Physician. 2018;97(11):741-748.' },
  { num: 2, text: 'Lewis MA, Hendrickson AW, Moynihan TJ. Oncologic Emergencies: Pathophysiology, Presentation, Diagnosis, and Treatment. CA Cancer J Clin. 2011;61(5):287-314.' },
  { num: 3, text: 'Freifeld AG, et al. Clinical Practice Guideline for the Use of Antimicrobial Agents in Neutropenic Patients with Cancer: 2010 Update by the IDSA. Clin Infect Dis. 2011;52(4):e56-e93.' },
  { num: 4, text: 'NCCN Clinical Practice Guidelines in Oncology: Prevention and Treatment of Cancer-Related Infections. v2.2024.' },
  { num: 5, text: 'Klastersky J, et al. The Multinational Association for Supportive Care in Cancer Risk Index: A Multinational Scoring System for Identifying Low-Risk Febrile Neutropenic Cancer Patients. J Clin Oncol. 2000;18(16):3038-3051.' },
  { num: 6, text: 'Coiffier B, et al. Guidelines for the Management of Pediatric and Adult Tumor Lysis Syndrome: An Evidence-Based Review. J Clin Oncol. 2008;26(16):2767-2778.' },
  { num: 7, text: 'Howard SC, Jones DP, Pui CH. The Tumor Lysis Syndrome. N Engl J Med. 2011;364(19):1844-1854.' },
  { num: 8, text: 'Cairo MS, et al. Recommendations for the Evaluation of Risk and Prophylaxis of Tumour Lysis Syndrome. Br J Haematol. 2010;149(4):578-586.' },
  { num: 9, text: 'Stewart AF. Hypercalcemia Associated with Cancer. N Engl J Med. 2005;352(4):373-379.' },
  { num: 10, text: 'Goldner W. Cancer-Related Hypercalcemia. J Oncol Pract. 2016;12(5):426-432.' },
  { num: 11, text: 'Loblaw DA, Mitera G, Ford M, Laperriere NJ. A 2011 Updated Systematic Review and Clinical Practice Guideline for the Management of Malignant Extradural Spinal Cord Compression. Int J Radiat Oncol Biol Phys. 2012;84(2):312-317.' },
  { num: 12, text: 'Cole JS, Patchell RA. Metastatic Epidural Spinal Cord Compression. Lancet Neurol. 2008;7(5):459-466.' },
  { num: 13, text: 'Patchell RA, et al. Direct Decompressive Surgical Resection in the Treatment of Spinal Cord Compression Caused by Metastatic Cancer: A Randomised Trial. Lancet. 2005;366(9486):643-648.' },
  { num: 14, text: 'Wilson LD, Detterbeck FC, Yahalom J. Superior Vena Cava Syndrome with Malignant Causes. N Engl J Med. 2007;356(18):1862-1869.' },
  { num: 15, text: 'Yu JB, Wilson LD, Detterbeck FC. Superior Vena Cava Syndrome — A Proposed Classification System and Algorithm for Management. J Thorac Oncol. 2008;3(8):811-814.' },
  { num: 16, text: 'Ganzel C, Becker J, Mintz PD, Lazarus HM, Rowe JM. Hyperleukocytosis, Leukostasis and Leukapheresis: Practice Management. Blood Rev. 2012;26(3):117-122.' },
  { num: 17, text: 'Stone MJ, Bogen SA. Evidence-Based Focused Review of Management of Hyperviscosity Syndrome. Blood. 2012;119(10):2205-2208.' },
  { num: 18, text: 'Schwartzberg LS, Navari RM. Safety of Polysorbate 80 in the Oncology Setting. Adv Ther. 2018;35(6):754-767.' },
  { num: 19, text: 'Postow MA, Sidlow R, Hellmann MD. Immune-Related Adverse Events Associated with Immune Checkpoint Blockade. N Engl J Med. 2018;378(2):158-168.' },
];

export const ONCOLOGICAL_EMERGENCIES_NODE_COUNT = ONCOLOGICAL_EMERGENCIES_NODES.length;
