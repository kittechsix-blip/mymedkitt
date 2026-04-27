// MedKitt — Low Back Pain Decision Support
// High-Value Diagnostic Approach: Red Flag Screen → Neuro Exam → Imaging Decision → Treatment → Disposition
// 5 modules: Red Flag Screening • Neurologic Assessment • Imaging Decision • Treatment • Disposition
// 24 nodes total.
export const LOW_BACK_PAIN_NODES = [
    // =====================================================================
    // MODULE 1: RED FLAG SCREENING
    // =====================================================================
    {
        id: 'lbp-start',
        type: 'question',
        module: 1,
        title: 'Low Back Pain — Initial Assessment',
        body: '[Red Flag Checklist](#/info/lbp-red-flags)\n\n**The Problem:** Low back pain accounts for 2.6M ED visits/year in the US. Most cases are benign musculoskeletal strain. Imaging is often unnecessary and can lead to overtreatment. [1][2]\n\n**High-Value Approach:** Screen for red flags → targeted exam → image only when indicated → conservative treatment. [2][3]\n\n**Key Concept:** Routine imaging (X-ray, CT, MRI) for uncomplicated LBP increases costs, radiation exposure, and unnecessary interventions *without improving outcomes*. [2][4]\n\nIs this presentation **TRAUMATIC** or **ATRAUMATIC**?',
        citation: [1, 2, 3, 4],
        options: [
            {
                label: 'Traumatic — Mechanism Present',
                description: 'Fall, MVC, direct blow, sports injury',
                next: 'lbp-trauma',
                urgency: 'urgent',
            },
            {
                label: 'Atraumatic — No Trauma',
                description: 'Spontaneous onset, lifting, chronic',
                next: 'lbp-red-flag-screen',
            },
        ],
        summary: '2.6M ED visits/yr; routine imaging increases costs without improving outcomes — screen for red flags first',
    },
    {
        id: 'lbp-trauma',
        type: 'question',
        module: 1,
        title: 'Traumatic LBP — Fracture Risk',
        body: '**Assess fracture risk factors:** [3][5]\n\n**High-risk mechanisms:**\n• Fall from height (>3 feet or >5 stairs)\n• Motor vehicle collision (ejection, rollover, >40 mph)\n• Direct blow to spine\n• Axial loading (diving, compression)\n\n**Patient factors:**\n• Age >65 (osteoporosis risk)\n• Known osteoporosis\n• Chronic steroid use (>3 months)\n• History of spinal cancer or metastases\n\n**Physical exam findings:**\n• Midline tenderness to palpation\n• Step-off deformity\n• Neurologic deficit\n\nAre fracture risk factors present?',
        citation: [3, 5],
        options: [
            {
                label: 'Yes — High Fracture Risk',
                description: 'High-energy mechanism, osteoporosis, midline tenderness',
                next: 'lbp-imaging-fracture',
                urgency: 'urgent',
            },
            {
                label: 'No — Low-Energy / Minimal Risk',
                description: 'Minor mechanism, young healthy patient, no midline tenderness',
                next: 'lbp-red-flag-screen',
            },
        ],
        summary: 'High-risk: fall >3ft, MVC, age >65, steroids, osteoporosis, midline tenderness',
    },
    {
        id: 'lbp-red-flag-screen',
        type: 'question',
        module: 1,
        title: 'Red Flag Screening',
        body: '[Red Flag Checklist](#/info/lbp-red-flags)\n\n**Screen for emergent conditions:** [1][3][6]\n\n**CAUDA EQUINA SYNDROME (CES):**\n• Urinary retention or incontinence\n• Fecal incontinence\n• Saddle anesthesia\n• Bilateral leg weakness/numbness\n• Progressive neurologic deficit\n\n**INFECTION (Epidural Abscess/Osteomyelitis):**\n• Fever + back pain\n• IVDU\n• Recent spinal procedure (injection, surgery)\n• Immunosuppression (HIV, diabetes, steroids, chemo)\n\n**MALIGNANCY:**\n• Known cancer history (esp. breast, lung, prostate, myeloma)\n• Unexplained weight loss >10 lbs\n• Pain worse at night or with rest\n• Age >50 with new onset severe pain\n\n**VASCULAR:**\n• Pulsatile abdominal mass (AAA)\n• Tearing pain radiating to groin\n• Vascular risk factors + severe pain\n\nAre any red flags present?',
        citation: [1, 3, 6],
        options: [
            {
                label: 'Cauda Equina Suspected',
                description: 'Urinary retention, saddle anesthesia, bilateral neuro deficit',
                next: 'lbp-ces',
                urgency: 'critical',
            },
            {
                label: 'Infection Suspected',
                description: 'Fever, IVDU, immunocompromised, recent procedure',
                next: 'lbp-infection',
                urgency: 'critical',
            },
            {
                label: 'Malignancy Suspected',
                description: 'Cancer history, weight loss, night pain, age >50',
                next: 'lbp-malignancy',
                urgency: 'urgent',
            },
            {
                label: 'No Red Flags — Routine LBP',
                description: 'Mechanical, no concerning features',
                next: 'lbp-neuro-exam',
            },
        ],
        summary: 'CES: urinary retention, saddle anesthesia, bilateral weakness; Infection: fever + IVDU/immunocompromised; Malignancy: cancer hx, weight loss',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 2: NEUROLOGIC ASSESSMENT
    // =====================================================================
    {
        id: 'lbp-ces',
        type: 'info',
        module: 2,
        title: 'Cauda Equina Syndrome',
        body: '**EMERGENT — Time-critical diagnosis.** [6][7]\n\n**Classic Triad:**\n1. **Urinary retention** (most common — post-void residual >200 mL)\n2. **Saddle anesthesia** (perineal numbness)\n3. **Bilateral leg weakness or numbness**\n\n**Other features:**\n• Fecal incontinence or decreased anal tone\n• Sexual dysfunction\n• Progressive bilateral radiculopathy\n\n**Exam:**\n• **Rectal tone** — decreased or absent\n• **Perianal sensation** — test light touch S2-S5\n• **Bladder scan** — post-void residual >200 mL raises suspicion\n• **Bilateral lower extremity strength** — hip flexion, knee extension, ankle dorsiflexion\n\n**Management:**\n• **EMERGENT MRI** (gold standard)\n• **POCUS bladder scan** while awaiting MRI\n• **Neurosurgery STAT consult** — decompression within 48 hours improves outcomes\n• Do NOT delay for other workup\n\n[CES Exam Guide](#/info/lbp-ces-exam)',
        citation: [6, 7],
        next: 'lbp-imaging-emergent',
        safetyLevel: 'critical',
        summary: 'Urinary retention + saddle anesthesia + bilateral weakness — emergent MRI and neurosurgery consult within 48hr',
    },
    {
        id: 'lbp-infection',
        type: 'info',
        module: 2,
        title: 'Spinal Infection',
        body: '**Epidural Abscess / Vertebral Osteomyelitis — High mortality if missed.** [3][8]\n\n**Risk Factors:**\n• IVDU (most common risk factor)\n• Recent spinal injection or surgery\n• Immunosuppression (diabetes, HIV, steroids, chemo)\n• Bacteremia / endocarditis\n• Indwelling catheter / recent hospitalization\n\n**Clinical Features:**\n• Fever + localized back pain (may be subtle in immunocompromised)\n• Point tenderness over spine\n• Neurologic deficit (late finding — suggests cord compression)\n\n**Labs:**\n• CBC, CRP, ESR (ESR >20 highly sensitive)\n• Blood cultures × 2 (positive in 60%)\n• Procalcitonin\n\n**Imaging:**\n• **MRI with contrast** — gold standard\n• Plain films often normal early\n• CT if MRI unavailable (less sensitive for soft tissue)\n\n**Management:**\n• Blood cultures BEFORE antibiotics (unless septic)\n• Broad-spectrum IV antibiotics: vancomycin + ceftriaxone (or pip-tazo)\n• Neurosurgery consult if neurologic deficit or large abscess\n\n**Spinal Infection Workup**',
        citation: [3, 8],
        next: 'lbp-imaging-emergent',
        safetyLevel: 'critical',
        summary: 'IVDU + fever + back pain — ESR/CRP, blood cultures, MRI with contrast; vanc + CTX empirically',
    },
    {
        id: 'lbp-malignancy',
        type: 'info',
        module: 2,
        title: 'Malignancy / Metastatic Disease',
        body: '**Spinal metastases or primary malignancy.** [3][9]\n\n**High-Risk Features:**\n• History of cancer (especially breast, lung, prostate, kidney, thyroid, myeloma)\n• Unexplained weight loss >10 lbs / 4.5 kg\n• Age >50 with new, severe back pain\n• Pain worse at night or with rest\n• Failure to improve with conservative treatment\n\n**Physical Exam:**\n• Point tenderness over vertebral body\n• Neurologic deficit (suggests cord compression)\n• Lymphadenopathy, masses\n\n**Labs:**\n• CBC (anemia, leukocytosis)\n• CMP (hypercalcemia in myeloma, renal mets)\n• PSA (if prostate cancer suspected)\n• SPEP/UPEP (if myeloma suspected)\n\n**Imaging:**\n• **MRI with contrast** — best for soft tissue, cord compression\n• CT with contrast if MRI unavailable\n• Plain films may show lytic/blastic lesions (but low sensitivity)\n\n**Management:**\n• Pain control\n• Steroids if cord compression suspected (dexamethasone 10 mg IV)\n• Oncology / radiation oncology consult\n• Neurosurgery if cord compression',
        citation: [3, 9],
        next: 'lbp-imaging-emergent',
        summary: 'Cancer history + weight loss + night pain — MRI with contrast, dexamethasone 10mg if cord compression',
    },
    {
        id: 'lbp-neuro-exam',
        type: 'question',
        module: 2,
        title: 'Neurologic Examination',
        body: '[Dermatome Map](#/info/lbp-dermatomes)\n\n**Focused neuro exam for radiculopathy:** [3][10]\n\n**Motor (grade 0-5):**\n• L4 — Knee extension (quadriceps)\n• L5 — Great toe dorsiflexion (EHL), ankle dorsiflexion\n• S1 — Ankle plantarflexion, toe walking\n\n**Sensory:**\n• L4 — Medial leg/ankle\n• L5 — Dorsum of foot, first web space\n• S1 — Lateral foot, small toe\n\n**Reflexes:**\n• L4 — Patellar reflex\n• S1 — Achilles reflex\n\n**Provocative tests:**\n• **Straight leg raise (SLR)** — positive if radicular pain at <60° (high sensitivity for L5/S1 disc herniation)\n• **Crossed SLR** — pain in affected leg when raising contralateral leg (high specificity)\n\n**Gait:**\n• Heel walk (L4-L5)\n• Toe walk (S1)\n\nWhat are the neurologic findings?',
        citation: [3, 10],
        options: [
            {
                label: 'Severe / Progressive Deficit',
                description: 'Foot drop, inability to walk, rapid progression',
                next: 'lbp-imaging-emergent',
                urgency: 'critical',
            },
            {
                label: 'Radiculopathy — Stable',
                description: 'Single nerve root, stable weakness, sensory changes',
                next: 'lbp-radiculopathy',
            },
            {
                label: 'Normal Neuro Exam',
                description: 'No motor/sensory deficit, negative SLR',
                next: 'lbp-mechanical',
            },
        ],
        summary: 'SLR positive <60° = L5/S1 disc; test L4 (knee ext), L5 (great toe), S1 (ankle PF); reflexes patellar/Achilles',
    },
    {
        id: 'lbp-radiculopathy',
        type: 'info',
        module: 2,
        title: 'Lumbar Radiculopathy',
        body: '**Radicular pain from nerve root compression.** [3][10][11]\n\n**Most common levels:**\n• **L5** (45%) — weakness of great toe/ankle dorsiflexion, numbness dorsum of foot\n• **S1** (45%) — weakness of plantarflexion/toe walking, numbness lateral foot, decreased Achilles reflex\n• **L4** (5%) — weakness of knee extension, numbness medial leg, decreased patellar reflex\n\n**Natural history:**\n• **90% improve within 6-12 weeks** with conservative management\n• Disc herniations often resorb spontaneously\n• Imaging in first 6 weeks rarely changes management\n\n**When to image:**\n• Progressive neurologic deficit\n• Severe, disabling pain despite 4-6 weeks conservative treatment\n• Red flags present\n• Considering surgical intervention\n\n**Treatment:**\n• NSAIDs (first-line)\n• Acetaminophen adjunct\n• Short course oral steroids controversial (may provide short-term relief)\n• Activity modification (avoid bed rest)\n• Physical therapy referral\n\n**Radiculopathy Treatment Guide**',
        citation: [3, 10, 11],
        next: 'lbp-treatment',
        summary: 'L5/S1 most common; 90% improve in 6-12 weeks — no imaging in first 6 weeks unless red flags or progressive deficit',
        skippable: true,
    },
    {
        id: 'lbp-mechanical',
        type: 'info',
        module: 2,
        title: 'Mechanical / Musculoskeletal LBP',
        body: '**Benign, self-limited condition.** [2][3]\n\n**Characteristics:**\n• Worse with activity, better with rest\n• Paraspinal muscle tenderness\n• No neurologic deficit\n• No red flags\n• Often related to lifting, bending, poor posture\n\n**Differential:**\n• Muscular strain (most common)\n• Facet joint arthropathy\n• Degenerative disc disease\n• Lumbar spondylosis\n\n**Key Message for Patients:**\n• This is NOT a serious condition\n• Imaging is NOT needed and will NOT help\n• Most cases resolve in 2-4 weeks\n• Staying active is better than bed rest\n\n**DO NOT IMAGE** — ACR/ACEP guidelines recommend against routine imaging for uncomplicated LBP. [2][4]',
        citation: [2, 3, 4],
        next: 'lbp-treatment',
        summary: 'Benign, self-limited — no imaging needed; most resolve in 2-4 weeks; activity better than bed rest',
    },
    // =====================================================================
    // MODULE 3: IMAGING DECISION
    // =====================================================================
    {
        id: 'lbp-imaging-emergent',
        type: 'info',
        module: 3,
        title: 'Emergent Imaging',
        body: '**MRI is the gold standard for emergent spinal imaging.** [3][7]\n\n**Indications for EMERGENT MRI:**\n• Cauda equina syndrome\n• Spinal cord compression\n• Epidural abscess (fever + IVDU + back pain)\n• Severe/progressive neurologic deficit\n\n**MRI with contrast** preferred for:\n• Suspected infection (abscess, osteomyelitis)\n• Suspected malignancy\n\n**MRI without contrast** acceptable for:\n• Disc herniation\n• Cauda equina (if no infection concern)\n\n**If MRI unavailable or contraindicated:**\n• CT myelogram (invasive but detailed)\n• CT without contrast (better for bony pathology, fractures)\n\n**While awaiting MRI:**\n• POCUS bladder scan for post-void residual\n• Pain control\n• Dexamethasone 10 mg IV if cord compression suspected\n• Early neurosurgery consult',
        citation: [3, 7],
        next: 'lbp-disposition-admit',
        summary: 'Emergent MRI for CES, cord compression, abscess; add contrast for infection/malignancy; dex 10mg IV if cord compression',
    },
    {
        id: 'lbp-imaging-fracture',
        type: 'info',
        module: 3,
        title: 'Fracture Imaging',
        body: '**Plain films vs CT for suspected fracture.** [3][5]\n\n**Start with plain films (AP + lateral):**\n• Adequate for most compression fractures\n• Quick, low radiation, low cost\n• Sensitivity ~85% for acute fractures\n\n**CT spine indicated for:**\n• High-energy mechanism (fall >10 ft, MVC, axial load)\n• Neurologic deficit\n• Plain films suspicious but inconclusive\n• Known malignancy (better for lytic lesions)\n• Polytrauma patients\n\n**MRI indicated for:**\n• Neurologic deficit (to assess cord)\n• Concern for ligamentous injury\n• Osteoporotic fracture with unclear acuity\n• Malignancy with possible cord compression\n\n**Stable vs Unstable:**\n• **Stable:** Compression fracture <50% height loss, no posterior element involvement\n• **Unstable:** Burst fracture, >50% height loss, posterior ligamentous complex injury, neurologic deficit\n\n**Consult spine surgery** for unstable fractures or neurologic deficit.',
        citation: [3, 5],
        next: 'lbp-disposition-fracture',
        summary: 'Plain films first for most fractures; CT for high-energy, neuro deficit, or polytrauma; MRI if cord concern',
    },
    {
        id: 'lbp-imaging-avoid',
        type: 'info',
        module: 3,
        title: 'When NOT to Image',
        body: '**ACEP Choosing Wisely / ACR Guidelines:** [2][4]\n\n**DO NOT image uncomplicated LBP:**\n• No red flags\n• No neurologic deficit\n• Duration <6 weeks\n• Non-traumatic\n\n**Why avoid unnecessary imaging?**\n\n**Harms:**\n• **Radiation exposure** — lumbar CT = 6 mSv (equivalent to 3 years background radiation)\n• **Incidental findings** — lead to more tests, anxiety, unnecessary surgery\n• **Overdiagnosis** — "degenerative changes" on MRI are NORMAL in asymptomatic adults (67% at age 40, 88% at age 60)\n• **No outcome benefit** — RCTs show no difference in pain or function at 1 year\n\n**Costs:**\n• Lumbar MRI: $1,000-3,000\n• Unnecessary workup from incidentals: thousands more\n• Time, anxiety, lost work\n\n**What to tell patients:**\n"Your exam shows this is a muscle strain. An MRI would show normal age-related changes that everyone has — it wouldn\'t help and might lead to unnecessary treatments. The best evidence says you\'ll recover with time and staying active."',
        citation: [2, 4],
        next: 'lbp-treatment',
        summary: 'No imaging for uncomplicated LBP <6 weeks — radiation exposure, incidentals, no outcome benefit',
        skippable: true,
    },
    // =====================================================================
    // MODULE 4: TREATMENT
    // =====================================================================
    {
        id: 'lbp-treatment',
        type: 'info',
        module: 4,
        title: 'Conservative Treatment',
        body: '[Medication Guide](#/info/lbp-meds)\n\n**First-line medications:** [3][11][12]\n\n**NSAIDs** (most effective)\n• Ibuprofen 400-600 mg PO q6-8h\n• Naproxen 500 mg PO BID\n• Ketorolac 10 mg PO q4-6h (short-term)\n• *Caution: GI bleed, renal impairment, cardiac disease*\n\n**Acetaminophen** (adjunct)\n• 650-1000 mg PO q6h (max 3g/day)\n• *Less effective than NSAIDs for LBP*\n\n**Muscle relaxants** (second-line)\n• Cyclobenzaprine 5-10 mg PO TID × 7-10 days\n• Methocarbamol 750-1500 mg PO QID\n• *Caution: sedation, fall risk in elderly*\n\n**AVOID or use cautiously:**\n• **Opioids** — no better than NSAIDs, addiction risk, hyperalgesia\n• **Benzodiazepines** — no evidence of benefit, addiction risk\n• **Systemic steroids** — conflicting evidence, short-term benefit at best\n\n**Non-pharmacologic:**\n• **Stay active** — bed rest is harmful\n• Heat/ice for comfort\n• Physical therapy referral (especially if >2 weeks)',
        citation: [3, 11, 12],
        next: 'lbp-discharge',
        summary: 'NSAIDs first-line (most effective); acetaminophen adjunct; avoid opioids; stay active — bed rest harmful',
    },
    // =====================================================================
    // MODULE 5: DISPOSITION
    // =====================================================================
    {
        id: 'lbp-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge — Uncomplicated LBP',
        body: '[Discharge Instructions](#/info/lbp-discharge)\n\n**Discharge with:**\n• NSAIDs ± acetaminophen\n• Muscle relaxant if significant spasm (short course)\n• Activity modification (avoid heavy lifting, not bed rest)\n• Return precautions reviewed\n\n**Follow-up:**\n• PCP in 2-4 weeks if not improving\n• Physical therapy referral if symptoms >2-4 weeks\n• No imaging needed unless red flags develop\n\n**Return precautions — tell patient to return if:**\n• Urinary retention or incontinence\n• Fecal incontinence\n• Numbness in groin/buttocks (saddle area)\n• Weakness in legs getting worse\n• Fever with back pain\n• Severe pain not controlled by medications\n\n**Key patient education:**\n• "This is not a serious problem — most back pain resolves in 2-4 weeks"\n• "Staying active helps you heal faster than bed rest"\n• "An MRI is not needed and wouldn\'t change your treatment"',
        recommendation: 'Discharge with NSAIDs, return precautions for red flags. Follow-up PCP in 2-4 weeks if not improving. No imaging needed.',
        confidence: 'definitive',
        citation: [2, 3],
    },
    {
        id: 'lbp-disposition-admit',
        type: 'result',
        module: 5,
        title: 'Admission — Emergent Pathology',
        body: '**Admission criteria:** [3][7]\n\n**ICU/close monitoring:**\n• Hemodynamically unstable with spinal pathology\n• Sepsis from spinal infection\n\n**Floor admission:**\n• Cauda equina syndrome (awaiting surgery)\n• Epidural abscess (IV antibiotics, surgical planning)\n• Spinal cord compression from malignancy (steroids, XRT planning)\n• Unstable spine fracture\n\n**Services to consult:**\n• **Neurosurgery** — CES, epidural abscess, unstable fracture\n• **Orthopedic spine** — some fractures\n• **Oncology/Radiation oncology** — malignant cord compression\n• **Infectious disease** — epidural abscess, osteomyelitis\n\n**Pre-operative orders (if surgical candidate):**\n• NPO\n• Type and screen\n• Baseline labs (CBC, BMP, coags)\n• Foley catheter for urinary retention',
        recommendation: 'Admit for emergent spinal pathology. Consult neurosurgery for CES (decompression within 48hr). IV antibiotics for infection.',
        confidence: 'definitive',
        citation: [3, 7],
    },
    {
        id: 'lbp-disposition-fracture',
        type: 'result',
        module: 5,
        title: 'Fracture Disposition',
        body: '**Disposition depends on fracture stability:** [5]\n\n**Stable compression fracture (most common):**\n• May discharge with pain control\n• Spine surgery or orthopedic follow-up in 1-2 weeks\n• TLSO brace if prescribed\n• Osteoporosis workup (DXA, vitamin D, calcium)\n• Return if neurologic symptoms develop\n\n**Unstable fracture or neurologic deficit:**\n• Admit to spine service\n• Strict spinal precautions\n• Neurosurgery/orthopedic spine consult\n• Consider TLSO/CTLSO bracing\n\n**Pathologic fracture (malignancy):**\n• Admit for workup if new cancer diagnosis\n• Oncology consult\n• Consider vertebroplasty/kyphoplasty for pain\n\n**Follow-up imaging:**\n• Repeat X-ray in 2-4 weeks to assess healing\n• MRI if concern for ligamentous injury or malignancy',
        recommendation: 'Stable compression fracture may discharge with spine follow-up. Unstable fracture or neurologic deficit requires admission.',
        confidence: 'recommended',
        citation: [5],
    },
];
// =====================================================================
// MODULE LABELS
// =====================================================================
export const LOW_BACK_PAIN_MODULE_LABELS = [
    'Red Flag Screening',
    'Neurologic Assessment',
    'Imaging Decision',
    'Treatment',
    'Disposition',
];
export const LOW_BACK_PAIN_NODE_COUNT = 24;
// =====================================================================
// CITATIONS
// =====================================================================
export const LOW_BACK_PAIN_CRITICAL_ACTIONS = [
    { text: 'Screen ALL LBP patients for red flags: CES (urinary retention, saddle anesthesia), infection (fever + IVDU), malignancy (cancer hx)', nodeId: 'lbp-red-flag-screen' },
    { text: 'Cauda equina: emergent MRI + neurosurgery consult — decompression within 48 hours improves outcomes', nodeId: 'lbp-ces' },
    { text: 'Epidural abscess: blood cultures BEFORE antibiotics, MRI with contrast, vancomycin + ceftriaxone', nodeId: 'lbp-infection' },
    { text: 'DO NOT image uncomplicated LBP <6 weeks — no outcome benefit, leads to overtreatment', nodeId: 'lbp-imaging-avoid' },
    { text: 'NSAIDs are first-line (most effective); avoid opioids — no better than NSAIDs with addiction risk', nodeId: 'lbp-treatment' },
    { text: 'Activity is better than bed rest — educate patients that staying active speeds recovery', nodeId: 'lbp-discharge' },
    { text: 'Return precautions: urinary retention, saddle anesthesia, progressive weakness, fever', nodeId: 'lbp-discharge' },
];
export const LOW_BACK_PAIN_CITATIONS = [
    {
        num: 1,
        text: 'Friedman BW, et al. Managing Acute Low Back Pain in the Emergency Department. Ann Emerg Med. 2023;82(1):1-12.',
    },
    {
        num: 2,
        text: 'ACEP Choosing Wisely. Avoid imaging for uncomplicated low back pain in the emergency department. 2023.',
    },
    {
        num: 3,
        text: 'Casazza BA. Diagnosis and Treatment of Acute Low Back Pain. Am Fam Physician. 2012;85(4):343-350.',
    },
    {
        num: 4,
        text: 'Chou R, et al. ACR Appropriateness Criteria: Low Back Pain. J Am Coll Radiol. 2021;18(11):S421-S438.',
    },
    {
        num: 5,
        text: 'Patel ND, Broderick DF, Burns J, et al. ACR Appropriateness Criteria Low Back Pain. J Am Coll Radiol. 2016;13(9):1069-1078.',
    },
    {
        num: 6,
        text: 'Lavy C, et al. Cauda Equina Syndrome. BMJ. 2009;338:b936.',
    },
    {
        num: 7,
        text: 'Todd NV. Guidelines for cauda equina syndrome. Red flags and white flags. Br J Neurosurg. 2017;31(3):336-339.',
    },
    {
        num: 8,
        text: 'Darouiche RO. Spinal Epidural Abscess. N Engl J Med. 2006;355(19):2012-2020.',
    },
    {
        num: 9,
        text: 'Lawton AJ, et al. Assessment and Management of Patients with Metastatic Spinal Cord Compression. J Support Oncol. 2019;17(1):18-27.',
    },
    {
        num: 10,
        text: 'Kreiner DS, et al. An evidence-based clinical guideline for the diagnosis and treatment of lumbar disc herniation with radiculopathy. Spine J. 2014;14(1):180-191.',
    },
    {
        num: 11,
        text: 'Chou R, et al. Systemic Pharmacologic Therapies for Low Back Pain. Ann Intern Med. 2017;166(7):480-492.',
    },
    {
        num: 12,
        text: 'Qaseem A, et al. Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain: A Clinical Practice Guideline. Ann Intern Med. 2017;166(7):514-530.',
    },
];
