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
        body: '[Red Flag Checklist](#/info/lbp-red-flags)\n\n**The Problem:** Low back pain accounts for 2.6M ED visits/year in the US. Most cases are benign musculoskeletal strain. Imaging is often unnecessary and can lead to overtreatment. [1][2]\n\n**High-Value Approach:** Screen for red flags → targeted exam → image only when indicated → conservative treatment. [2][14]\n\n**Key Concept:** Routine imaging (X-ray, CT, MRI) for uncomplicated LBP increases costs, radiation exposure, and unnecessary interventions *without improving outcomes*. [2][4]\n\n*Basis: the 2.6M annual ED visit figure is the 2.63 million (95% CI 2.32–2.93M) NHAMCS estimate reported in [1]; the do-not-image position is ACEP Choosing Wisely [2] and ACR Appropriateness Criteria [4]; the red-flag-first diagnostic sequence is the ACP/APS joint guideline [14].*\n\nIs this presentation **TRAUMATIC** or **ATRAUMATIC**?',
        citation: [1, 2, 4, 14],
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
        body: '**Assess fracture risk factors:** [13][22][23]\n\n**High-risk mechanisms:**\n• Fall from height (>3 feet or >5 stairs)\n• Motor vehicle collision (ejection, rollover, >40 mph)\n• Direct blow to spine\n• Axial loading (diving, compression)\n\n**Patient factors:**\n• Age >65 (osteoporosis risk)\n• Known osteoporosis\n• Chronic steroid use (>3 months)\n• History of spinal cancer or metastases\n\n**Physical exam findings:**\n• Midline tenderness to palpation\n• Step-off deformity\n• Neurologic deficit\n\n*Basis: age, corticosteroid use and significant-trauma red flags for vertebral fracture are from the Downie 2013 systematic review of red-flag diagnostic accuracy [13]; imaging thresholds follow ACR Appropriateness Criteria Suspected Spine Trauma [22] and the AAST prospective thoracolumbar decision rule [23]. The ACR Appropriateness Criteria for Low Back Pain cover non-traumatic pain and are deliberately not cited here, because they do not address acute spine trauma.*\n\nAre fracture risk factors present?',
        citation: [13, 22, 23],
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
        body: '[Red Flag Checklist](#/info/lbp-red-flags)\n\n**Screen for emergent conditions:** [13][14]\n\n**CAUDA EQUINA SYNDROME (CES):**\n• Urinary retention or incontinence\n• Fecal incontinence\n• Saddle anesthesia\n• Bilateral leg weakness/numbness\n• Progressive neurologic deficit\n\n**INFECTION (Epidural Abscess/Osteomyelitis):**\n• Fever + back pain\n• IVDU\n• Recent spinal procedure (injection, surgery)\n• Immunosuppression (HIV, diabetes, steroids, chemo)\n\n**MALIGNANCY:**\n• Known cancer history (esp. breast, lung, prostate, myeloma)\n• Unexplained weight loss >10 lbs\n• Pain worse at night or with rest\n• Age >50 with new onset severe pain\n\n**VASCULAR:**\n• Pulsatile abdominal mass (AAA)\n• Tearing pain radiating to groin\n• Vascular risk factors + severe pain\n\n*Basis, by red-flag lane — each lane rests on a source that covers that specific condition: cauda equina syndrome [6]; spinal epidural abscess / vertebral osteomyelitis [15]; malignancy and metastatic extradural cord compression [21]; abdominal aortic aneurysm, including the pulsatile-mass and back/flank-pain presentation [24]. Diagnostic accuracy of the individual red flags for malignancy and fracture is reviewed in [13]; the overall screen-before-imaging framework is the ACP/APS joint guideline [14].*\n\nAre any red flags present?',
        citation: [6, 13, 14, 15, 21, 24],
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
        body: '**EMERGENT — Time-critical diagnosis.** [6][7]\n\n**Classic Triad:**\n1. **Urinary retention** (most common — post-void residual >200 mL)\n2. **Saddle anesthesia** (perineal numbness)\n3. **Bilateral leg weakness or numbness**\n\n**Other features:**\n• Fecal incontinence or decreased anal tone\n• Sexual dysfunction\n• Progressive bilateral radiculopathy\n\n**Exam:**\n• **Rectal tone** — decreased or absent\n• **Perianal sensation** — test light touch S2-S5\n• **Bladder scan** — post-void residual >200 mL raises suspicion\n• **Bilateral lower extremity strength** — hip flexion, knee extension, ankle dorsiflexion\n\n**Management:**\n• **EMERGENT MRI** (gold standard)\n• **POCUS bladder scan** while awaiting MRI\n• **Neurosurgery STAT consult** — decompression within 48 hours improves outcomes\n• Do NOT delay for other workup\n\n*Basis: CES clinical syndrome, exam findings and emergent-MRI standard [6][7]. The post-void residual >200 mL threshold is from a prospective study of 260 patients with suspected CES in which PVR ≥200 mL predicted MRI-confirmed cauda equina compression with sensitivity 94.1% and NPV 98.7%, outperforming individual red-flag symptoms [19]. The 48-hour decompression window is from a meta-analysis of surgical outcomes in CES secondary to lumbar disc herniation [18], and is echoed in the CES triage review [7].*\n\n[CES Exam Guide](#/info/lbp-ces-exam)',
        citation: [6, 7, 18, 19],
        next: 'lbp-imaging-emergent',
        safetyLevel: 'critical',
        summary: 'Urinary retention + saddle anesthesia + bilateral weakness — emergent MRI and neurosurgery consult within 48hr',
    },
    {
        id: 'lbp-infection',
        type: 'info',
        module: 2,
        title: 'Spinal Infection',
        body: '**Epidural Abscess / Vertebral Osteomyelitis — High mortality if missed.** [8][15]\n\n**Risk Factors:**\n• IVDU (most common risk factor)\n• Recent spinal injection or surgery\n• Immunosuppression (diabetes, HIV, steroids, chemo)\n• Bacteremia / endocarditis\n• Indwelling catheter / recent hospitalization\n\n**Clinical Features:**\n• Fever + localized back pain (may be subtle in immunocompromised)\n• Point tenderness over spine\n• Neurologic deficit (late finding — suggests cord compression)\n\n**Labs:**\n• CBC, CRP, ESR (ESR >20 highly sensitive)\n• Blood cultures × 2 (positive in 60%)\n• Procalcitonin\n\n**Imaging:**\n• **MRI with contrast** — gold standard\n• Plain films often normal early\n• CT if MRI unavailable (less sensitive for soft tissue)\n\n**Management:**\n• Blood cultures BEFORE antibiotics (unless septic)\n• Broad-spectrum IV antibiotics: vancomycin + ceftriaxone (or pip-tazo)\n• Neurosurgery consult if neurologic deficit or large abscess\n\n*Basis: spinal epidural abscess syndrome, risk factors, blood-culture yield and gadolinium-enhanced MRI as the diagnostic standard [8]. Microbiologic strategy — obtaining blood cultures before empiric antibiotics in the non-septic patient, empiric Gram-positive plus Gram-negative coverage, and the role of image-guided biopsy — follows the IDSA native vertebral osteomyelitis guideline [15]; that guideline is the instrument that actually addresses abscess microbiology and antibiotic selection. The ESR-based ED screening strategy and the impact of diagnostic delay on outcome are from ED cohort studies [16][17].*\n\n**Spinal Infection Workup**',
        citation: [8, 15, 16, 17],
        next: 'lbp-imaging-emergent',
        safetyLevel: 'critical',
        summary: 'IVDU + fever + back pain — ESR/CRP, blood cultures, MRI with contrast; vanc + CTX empirically',
    },
    {
        id: 'lbp-malignancy',
        type: 'info',
        module: 2,
        title: 'Malignancy / Metastatic Disease',
        body: '**Spinal metastases or primary malignancy.** [9][13]\n\n**High-Risk Features:**\n• History of cancer (especially breast, lung, prostate, kidney, thyroid, myeloma)\n• Unexplained weight loss >10 lbs / 4.5 kg\n• Age >50 with new, severe back pain\n• Pain worse at night or with rest\n• Failure to improve with conservative treatment\n\n**Physical Exam:**\n• Point tenderness over vertebral body\n• Neurologic deficit (suggests cord compression)\n• Lymphadenopathy, masses\n\n**Labs:**\n• CBC (anemia, leukocytosis)\n• CMP (hypercalcemia in myeloma, renal mets)\n• PSA (if prostate cancer suspected)\n• SPEP/UPEP (if myeloma suspected)\n\n**Imaging:**\n• **MRI with contrast** — best for soft tissue, cord compression\n• CT with contrast if MRI unavailable\n• Plain films may show lytic/blastic lesions (but low sensitivity)\n\n**Management:**\n• Pain control\n• Steroids if cord compression suspected (dexamethasone 10 mg IV)\n• Oncology / radiation oncology consult\n• Neurosurgery if cord compression\n\n*Basis: assessment, whole-spine MRI strategy and multidisciplinary management of metastatic spinal cord compression [9]. Diagnostic accuracy of the malignancy red flags (prior cancer history, unexplained weight loss, age) is reviewed in [13] — that review found prior cancer history to be the only red flag with a meaningful positive likelihood ratio, and the others to be weak in isolation. The corticosteroid recommendation derives from a randomised trial of high-dose dexamethasone plus radiotherapy in metastatic cord compression [20] and from the Cancer Care Ontario updated systematic review and practice guideline for malignant extradural spinal cord compression [21]; the specific 10 mg IV loading dose above is this consult\'s operational choice within the dexamethasone regimens described in [21], not a verbatim guideline dose.*',
        citation: [9, 13, 20, 21],
        next: 'lbp-imaging-emergent',
        summary: 'Cancer history + weight loss + night pain — MRI with contrast, dexamethasone 10mg if cord compression',
    },
    {
        id: 'lbp-neuro-exam',
        type: 'question',
        module: 2,
        title: 'Neurologic Examination',
        body: '[Dermatome Map](#/info/lbp-dermatomes)\n\n**Focused neuro exam for radiculopathy:** [10][14]\n\n**Motor (grade 0-5):**\n• L4 — Knee extension (quadriceps)\n• L5 — Great toe dorsiflexion (EHL), ankle dorsiflexion\n• S1 — Ankle plantarflexion, toe walking\n\n**Sensory:**\n• L4 — Medial leg/ankle\n• L5 — Dorsum of foot, first web space\n• S1 — Lateral foot, small toe\n\n**Reflexes:**\n• L4 — Patellar reflex\n• S1 — Achilles reflex\n\n**Provocative tests:**\n• **Straight leg raise (SLR)** — positive if radicular pain at <60° (high sensitivity for L5/S1 disc herniation)\n• **Crossed SLR** — pain in affected leg when raising contralateral leg (high specificity)\n\n**Gait:**\n• Heel walk (L4-L5)\n• Toe walk (S1)\n\n*Basis: level-by-level motor, sensory and reflex mapping and the definition of radiculopathy [10][14]. The operating characteristics of the straight leg raise (high sensitivity, low specificity) and the crossed SLR (low sensitivity, high specificity) for herniated lumbar disc are from a systematic review of the test of Lasègue [25].*\n\nWhat are the neurologic findings?',
        citation: [10, 14, 25],
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
        body: '**Radicular pain from nerve root compression.** [3][10][11]\n\n**Most common levels:**\n• **L5** (45%) — weakness of great toe/ankle dorsiflexion, numbness dorsum of foot\n• **S1** (45%) — weakness of plantarflexion/toe walking, numbness lateral foot, decreased Achilles reflex\n• **L4** (5%) — weakness of knee extension, numbness medial leg, decreased patellar reflex\n\n**Natural history:**\n• **90% improve within 6-12 weeks** with conservative management\n• Disc herniations often resorb spontaneously\n• Imaging in first 6 weeks rarely changes management\n\n**When to image:**\n• Progressive neurologic deficit\n• Severe, disabling pain despite 4-6 weeks conservative treatment\n• Red flags present\n• Considering surgical intervention\n\n**Treatment:**\n• NSAIDs (first-line)\n• Acetaminophen adjunct\n• Short course oral steroids controversial (may provide short-term relief)\n• Activity modification (avoid bed rest)\n• Physical therapy referral\n\n*Basis: level distribution, natural history, imaging thresholds and surgical-referral criteria are from the NASS evidence-based guideline for lumbar disc herniation with radiculopathy [10]. Pharmacologic options are from the ACP systematic review of systemic drug therapies for low back pain [11]; the "short course oral steroids controversial" statement reflects that review\'s finding of limited/short-term benefit. General diagnostic framing [3][14].*\n\n**Radiculopathy Treatment Guide**',
        citation: [3, 10, 11, 14],
        next: 'lbp-treatment',
        summary: 'L5/S1 most common; 90% improve in 6-12 weeks — no imaging in first 6 weeks unless red flags or progressive deficit',
        skippable: true,
    },
    {
        id: 'lbp-mechanical',
        type: 'info',
        module: 2,
        title: 'Mechanical / Musculoskeletal LBP',
        body: '**Benign, self-limited condition.** [2][3]\n\n**Characteristics:**\n• Worse with activity, better with rest\n• Paraspinal muscle tenderness\n• No neurologic deficit\n• No red flags\n• Often related to lifting, bending, poor posture\n\n**Differential:**\n• Muscular strain (most common)\n• Facet joint arthropathy\n• Degenerative disc disease\n• Lumbar spondylosis\n\n**Key Message for Patients:**\n• This is NOT a serious condition\n• Imaging is NOT needed and will NOT help\n• Most cases resolve in 2-4 weeks\n• Staying active is better than bed rest\n\n**DO NOT IMAGE** — ACR/ACEP guidelines recommend against routine imaging for uncomplicated LBP. [2][4]\n\n*Basis: the against-routine-imaging recommendation is ACEP Choosing Wisely item 3 of its second list [2] and ACR Appropriateness Criteria Low Back Pain: 2021 Update [4]. Expected course and non-pharmacologic first-line management are from the ACP noninvasive-treatment guideline [12] and the ACP/APS joint guideline [14]; clinical characterisation of mechanical low back pain [3]. Note that both no-imaging recommendations are conditional on the absence of the red flags screened for earlier in this tree.*',
        citation: [2, 3, 4, 12, 14],
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
        body: '**MRI is the gold standard for emergent spinal imaging.** [4][7]\n\n**Indications for EMERGENT MRI:**\n• Cauda equina syndrome\n• Spinal cord compression\n• Epidural abscess (fever + IVDU + back pain)\n• Severe/progressive neurologic deficit\n\n**MRI with contrast** preferred for:\n• Suspected infection (abscess, osteomyelitis)\n• Suspected malignancy\n\n**MRI without contrast** acceptable for:\n• Disc herniation\n• Cauda equina (if no infection concern)\n\n**If MRI unavailable or contraindicated:**\n• CT myelogram (invasive but detailed)\n• CT without contrast (better for bony pathology, fractures)\n\n**While awaiting MRI:**\n• POCUS bladder scan for post-void residual\n• Pain control\n• Dexamethasone 10 mg IV if cord compression suspected\n• Early neurosurgery consult\n\n*Basis: modality selection, contrast indications and the CT-myelogram fallback are from ACR Appropriateness Criteria Low Back Pain: 2021 Update [4], which rates MRI without and with contrast for the cauda equina, infection and neoplasm variants. Emergent-MRI triage in suspected cauda equina [7]. Contrast-enhanced MRI as the diagnostic standard for suspected spinal infection [15]. The dexamethasone 10 mg IV bridge for suspected cord compression is sourced to [20][21] — see the Malignancy node for the dosing basis disclosure.*',
        citation: [4, 7, 15, 20, 21],
        next: 'lbp-disposition-admit',
        summary: 'Emergent MRI for CES, cord compression, abscess; add contrast for infection/malignancy; dex 10mg IV if cord compression',
    },
    {
        id: 'lbp-imaging-fracture',
        type: 'info',
        module: 3,
        title: 'Fracture Imaging',
        body: '**Plain films vs CT for suspected fracture.** [22][23]\n\n**Start with plain films (AP + lateral):**\n• Adequate for most compression fractures\n• Quick, low radiation, low cost\n• Sensitivity ~85% for acute fractures\n\n**CT spine indicated for:**\n• High-energy mechanism (fall >10 ft, MVC, axial load)\n• Neurologic deficit\n• Plain films suspicious but inconclusive\n• Known malignancy (better for lytic lesions)\n• Polytrauma patients\n\n**MRI indicated for:**\n• Neurologic deficit (to assess cord)\n• Concern for ligamentous injury\n• Osteoporotic fracture with unclear acuity\n• Malignancy with possible cord compression\n\n**Stable vs Unstable:**\n• **Stable:** Compression fracture <50% height loss, no posterior element involvement\n• **Unstable:** Burst fracture, >50% height loss, posterior ligamentous complex injury, neurologic deficit\n\n**Consult spine surgery** for unstable fractures or neurologic deficit.\n\n*Basis: modality selection in suspected acute spine trauma, including the CT-over-radiography position for high-energy mechanisms and MRI for suspected ligamentous or cord injury, is ACR Appropriateness Criteria Suspected Spine Trauma [22]. The clinical criteria triggering thoracolumbar imaging after blunt trauma are from the AASTs prospective multicentre derivation study [23]. Vertebral compression fracture imaging and follow-up [5]. The plain-film sensitivity figure and the stable/unstable morphology criteria above are the consult\'s own operational summary and are not lifted verbatim from a single cited document.*',
        citation: [5, 22, 23],
        next: 'lbp-disposition-fracture',
        summary: 'Plain films first for most fractures; CT for high-energy, neuro deficit, or polytrauma; MRI if cord concern',
    },
    {
        id: 'lbp-imaging-avoid',
        type: 'info',
        module: 3,
        title: 'When NOT to Image',
        body: '**ACEP Choosing Wisely / ACR Guidelines:** [2][4]\n\n**DO NOT image uncomplicated LBP:**\n• No red flags\n• No neurologic deficit\n• Duration <6 weeks\n• Non-traumatic\n\n**Why avoid unnecessary imaging?**\n\n**Harms:**\n• **Radiation exposure** — lumbar CT = 6 mSv (equivalent to 3 years background radiation)\n• **Incidental findings** — lead to more tests, anxiety, unnecessary surgery\n• **Overdiagnosis** — "degenerative changes" on MRI are NORMAL in asymptomatic adults (67% at age 40, 88% at age 60)\n• **No outcome benefit** — RCTs show no difference in pain or function at 1 year\n\n**Costs:**\n• Lumbar MRI: $1,000-3,000\n• Unnecessary workup from incidentals: thousands more\n• Time, anxiety, lost work\n\n**What to tell patients:**\n"Your exam shows this is a muscle strain. An MRI would show normal age-related changes that everyone has — it wouldn\'t help and might lead to unnecessary treatments. The best evidence says you\'ll recover with time and staying active."\n\n*Basis: the do-not-image recommendation is ACEP Choosing Wisely item 3 of its second list (October 2014) [2], ACR Appropriateness Criteria Low Back Pain: 2021 Update [4], and the ACP noninvasive-treatment guideline [12]. The lumbar CT effective dose of ~6 mSv is from a published catalog of effective doses in radiology [27]. The 67% (age 40) and 88% (age 60) prevalences of degenerative MRI findings are the disc-degeneration figures from a systematic review of spinal imaging findings in asymptomatic populations [26]. The dollar cost ranges above are illustrative US price estimates and are not sourced to any cited document.*',
        citation: [2, 4, 12, 26, 27],
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
        body: '[Medication Guide](#/info/lbp-meds)\n\n**First-line medications:** [3][11][12]\n\n**NSAIDs** (most effective)\n• Ibuprofen 400-600 mg PO q6-8h\n• Naproxen 500 mg PO BID\n• Ketorolac 10 mg PO q4-6h (short-term)\n• *Caution: GI bleed, renal impairment, cardiac disease*\n\n**Acetaminophen** (adjunct)\n• 650-1000 mg PO q6h (max 3g/day)\n• *Less effective than NSAIDs for LBP*\n\n**Muscle relaxants** (second-line)\n• Cyclobenzaprine 5-10 mg PO TID × 7-10 days\n• Methocarbamol 750-1500 mg PO QID\n• *Caution: sedation, fall risk in elderly*\n\n**AVOID or use cautiously:**\n• **Opioids** — no better than NSAIDs, addiction risk, hyperalgesia\n• **Benzodiazepines** — no evidence of benefit, addiction risk\n• **Systemic steroids** — conflicting evidence, short-term benefit at best\n\n**Non-pharmacologic:**\n• **Stay active** — bed rest is harmful\n• Heat/ice for comfort\n• Physical therapy referral (especially if >2 weeks)\n\n*Basis: comparative efficacy of NSAIDs, acetaminophen, skeletal muscle relaxants, benzodiazepines and systemic corticosteroids is from the ACP systematic review of systemic pharmacologic therapies [11] and the ACP clinical practice guideline built on it [12], which is also the source for "stay active" and heat as first-line non-pharmacologic care. The specific claim that opioids are no better than NSAIDs rests on a randomised trial of naproxen plus placebo vs naproxen plus oxycodone/acetaminophen vs naproxen plus cyclobenzaprine, which found no functional benefit from either add-on [28]. The muscle-relaxant add-on position is supported by a randomised ED trial of naproxen with or without orphenadrine or methocarbamol [29]. The individual dose ranges listed above are this consult\'s operational dosing, not doses specified in [11] or [12]; ketorolac 10 mg PO in particular is a labeled short-term dose and is not addressed by either ACP document.*',
        citation: [3, 11, 12, 28, 29],
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
        body: '[Discharge Instructions](#/info/lbp-discharge)\n\n**Discharge with:**\n• NSAIDs ± acetaminophen\n• Muscle relaxant if significant spasm (short course)\n• Activity modification (avoid heavy lifting, not bed rest)\n• Return precautions reviewed\n\n**Follow-up:**\n• PCP in 2-4 weeks if not improving\n• Physical therapy referral if symptoms >2-4 weeks\n• No imaging needed unless red flags develop\n\n**Return precautions — tell patient to return if:**\n• Urinary retention or incontinence\n• Fecal incontinence\n• Numbness in groin/buttocks (saddle area)\n• Weakness in legs getting worse\n• Fever with back pain\n• Severe pain not controlled by medications\n\n**Key patient education:**\n• "This is not a serious problem — most back pain resolves in 2-4 weeks"\n• "Staying active helps you heal faster than bed rest"\n• "An MRI is not needed and wouldn\'t change your treatment"\n\n*Basis: discharge without imaging applies only to the red-flag-negative patient screened earlier in this tree; the underlying recommendation is ACEP Choosing Wisely item 3 of its second list [2] and the ACP/APS joint guideline [14]. Analgesia, activity advice and physical-therapy timing are from the ACP noninvasive-treatment guideline [12]. The return-precaution list mirrors the red-flag set whose diagnostic accuracy is reviewed in [13]. The 2-4 week follow-up interval is an operational disposition choice, not a guideline-specified interval.*',
        recommendation: 'Discharge with NSAIDs, return precautions for red flags. Follow-up PCP in 2-4 weeks if not improving. No imaging needed.',
        confidence: 'definitive',
        citation: [2, 12, 13, 14],
    },
    {
        id: 'lbp-disposition-admit',
        type: 'result',
        module: 5,
        title: 'Admission — Emergent Pathology',
        body: '**Admission criteria:** [7][15]\n\n**ICU/close monitoring:**\n• Hemodynamically unstable with spinal pathology\n• Sepsis from spinal infection\n\n**Floor admission:**\n• Cauda equina syndrome (awaiting surgery)\n• Epidural abscess (IV antibiotics, surgical planning)\n• Spinal cord compression from malignancy (steroids, XRT planning)\n• Unstable spine fracture\n\n**Services to consult:**\n• **Neurosurgery** — CES, epidural abscess, unstable fracture\n• **Orthopedic spine** — some fractures\n• **Oncology/Radiation oncology** — malignant cord compression\n• **Infectious disease** — epidural abscess, osteomyelitis\n\n**Pre-operative orders (if surgical candidate):**\n• NPO\n• Type and screen\n• Baseline labs (CBC, BMP, coags)\n• Foley catheter for urinary retention\n\n*Basis: cauda equina triage, admission and surgical urgency including the 48-hour decompression window [7][18]; inpatient management, IV antibiotic course and ID/surgical co-management of native vertebral osteomyelitis and epidural abscess [15]; admission, steroid and radiotherapy planning for malignant extradural cord compression [21]. The pre-operative order set (NPO, type and screen, baseline labs, Foley) is generic peri-operative institutional practice and is not drawn from any of the cited guidelines.*',
        recommendation: 'Admit for emergent spinal pathology. Consult neurosurgery for CES (decompression within 48hr). IV antibiotics for infection.',
        confidence: 'definitive',
        citation: [7, 15, 18, 21],
    },
    {
        id: 'lbp-disposition-fracture',
        type: 'result',
        module: 5,
        title: 'Fracture Disposition',
        body: '**Disposition depends on fracture stability:** [22][23]\n\n**Stable compression fracture (most common):**\n• May discharge with pain control\n• Spine surgery or orthopedic follow-up in 1-2 weeks\n• TLSO brace if prescribed\n• Osteoporosis workup (DXA, vitamin D, calcium)\n• Return if neurologic symptoms develop\n\n**Unstable fracture or neurologic deficit:**\n• Admit to spine service\n• Strict spinal precautions\n• Neurosurgery/orthopedic spine consult\n• Consider TLSO/CTLSO bracing\n\n**Pathologic fracture (malignancy):**\n• Admit for workup if new cancer diagnosis\n• Oncology consult\n• Consider vertebroplasty/kyphoplasty for pain\n\n**Follow-up imaging:**\n• Repeat X-ray in 2-4 weeks to assess healing\n• MRI if concern for ligamentous injury or malignancy\n\n*Basis: the stable-versus-unstable distinction, the role of CT versus MRI, and the indication for MRI when ligamentous or posterior-element injury is suspected follow the ACR Appropriateness Criteria for Suspected Spine Trauma [22] and the EAST/AAST practice management guidance on thoracolumbar spine trauma [23]; malignant/pathologic fracture management follows the metastatic spinal cord compression literature [21]. Osteoporosis workup (DXA, vitamin D, calcium), TLSO/CTLSO bracing and the 2-4 week repeat radiograph are conventional orthopaedic follow-up practice and are not specified by the cited criteria.*',
        recommendation: 'Stable compression fracture may discharge with spine follow-up. Unstable fracture or neurologic deficit requires admission.',
        confidence: 'recommended',
        citation: [21, 22, 23],
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
    { text: 'VASCULAR red flags: pulsatile abdominal mass (AAA), tearing pain radiating to groin', nodeId: 'lbp-red-flag-screen' },
    { text: 'Cauda equina: emergent MRI + neurosurgery consult — decompression within 48 hours improves outcomes', nodeId: 'lbp-ces' },
    { text: 'Cauda equina: Bladder scan — post-void residual >200 mL raises suspicion', nodeId: 'lbp-ces' },
    { text: 'Cauda equina: Do NOT delay for other workup', nodeId: 'lbp-ces' },
    { text: 'Epidural abscess: blood cultures BEFORE antibiotics', nodeId: 'lbp-infection' },
    { text: 'Epidural abscess: MRI with contrast', nodeId: 'lbp-infection' },
    { text: 'Epidural abscess: vancomycin + ceftriaxone', nodeId: 'lbp-infection' },
    { text: 'Epidural abscess: Neurosurgery consult if neurologic deficit or large abscess', nodeId: 'lbp-infection' },
    { text: 'Malignancy: Steroids if cord compression suspected (dexamethasone 10 mg IV)', nodeId: 'lbp-malignancy' },
    { text: 'Fracture: Consult spine surgery for unstable fractures or neurologic deficit', nodeId: 'lbp-imaging-fracture' },
    { text: 'DO NOT image uncomplicated LBP <6 weeks — no outcome benefit, leads to overtreatment', nodeId: 'lbp-imaging-avoid' },
    { text: 'NSAIDs are first-line (most effective)', nodeId: 'lbp-treatment' },
    { text: 'Avoid opioids — no better than NSAIDs with addiction risk', nodeId: 'lbp-treatment' },
    { text: 'Activity is better than bed rest — educate patients that staying active speeds recovery', nodeId: 'lbp-discharge' },
    { text: 'Return precautions: urinary retention, saddle anesthesia, progressive weakness, fever', nodeId: 'lbp-discharge' },
];
export const LOW_BACK_PAIN_CITATIONS = [
    {
        num: 1,
        text: 'Friedman BW, Chilstrom M, Bijur PE, Gallagher EJ. Diagnostic testing and treatment of low back pain in United States emergency departments: a national perspective. Spine (Phila Pa 1976). 2010;35(24):E1406-E1411. PMID: 21030902. doi:10.1097/BRS.0b013e3181d952a5',
    },
    {
        num: 2,
        text: 'American College of Emergency Physicians. Choosing Wisely: Avoid lumbar spine imaging in the emergency department for adults with non-traumatic back pain unless the patient has severe or progressive neurologic deficits or is suspected of having a serious underlying condition (such as vertebral infection, cauda equina syndrome, or cancer with cord compression). ABIM Foundation Choosing Wisely, ACEP second list, item 3, released 28 October 2014. https://www.choosingwisely.org/clinician-lists/ (No PMID or DOI: society recommendation list, not a journal article. URL is the machine identifier.)',
    },
    {
        num: 3,
        text: 'Casazza BA. Diagnosis and treatment of acute low back pain. Am Fam Physician. 2012;85(4):343-350. PMID: 22335313. https://www.aafp.org/pubs/afp/issues/2012/0215/p343.html (No DOI assigned by the publisher; PMID and publisher URL are the machine identifiers.) Note: general primary-care narrative review. Supports the outpatient/mechanical and general pharmacologic content only; it is not a source for epidural-abscess microbiology, oncologic emergencies, spine trauma or aortic pathology.',
    },
    {
        num: 4,
        text: 'Expert Panel on Neurological Imaging: Hutchins TA, Peckham M, Shah LM, et al. ACR Appropriateness Criteria Low Back Pain: 2021 Update. J Am Coll Radiol. 2021;18(11S):S361-S379. PMID: 34794594. doi:10.1016/j.jacr.2021.08.002',
    },
    {
        num: 5,
        text: 'Patel ND, Broderick DF, Burns J, et al. ACR Appropriateness Criteria Low Back Pain. J Am Coll Radiol. 2016;13(9):1069-1078. PMID: 27496288. doi:10.1016/j.jacr.2016.06.008 SUPERSEDED by the 2021 update [4]; retained only for the vertebral compression fracture variant. Note: the ACR Low Back Pain criteria address non-traumatic back pain and are not the instrument for acute spine trauma; see [22].',
    },
    {
        num: 6,
        text: 'Lavy C, James A, Wilson-MacDonald J, Fairbank J. Cauda equina syndrome. BMJ. 2009;338:b936. PMID: 19336488. doi:10.1136/bmj.b936',
    },
    {
        num: 7,
        text: 'Todd NV. Guidelines for cauda equina syndrome. Red flags and white flags. Systematic review and implications for triage. Br J Neurosurg. 2017;31(3):336-339. PMID: 28637110. doi:10.1080/02688697.2017.1297364',
    },
    {
        num: 8,
        text: 'Darouiche RO. Spinal epidural abscess. N Engl J Med. 2006;355(19):2012-2020. PMID: 17093252. doi:10.1056/NEJMra055111',
    },
    {
        num: 9,
        text: 'Lawton AJ, Lee KA, Cheville AL, et al. Assessment and management of patients with metastatic spinal cord compression: a multidisciplinary review. J Clin Oncol. 2019;37(1):61-71. PMID: 30395488. doi:10.1200/JCO.2018.78.1211',
    },
    {
        num: 10,
        text: 'Kreiner DS, Hwang SW, Easa JE, et al. An evidence-based clinical guideline for the diagnosis and treatment of lumbar disc herniation with radiculopathy. North American Spine Society. Spine J. 2014;14(1):180-191. PMID: 24239490. doi:10.1016/j.spinee.2013.08.003',
    },
    {
        num: 11,
        text: 'Chou R, Deyo R, Friedly J, et al. Systemic pharmacologic therapies for low back pain: a systematic review for an American College of Physicians clinical practice guideline. Ann Intern Med. 2017;166(7):480-492. PMID: 28192790. doi:10.7326/M16-2458',
    },
    {
        num: 12,
        text: 'Qaseem A, Wilt TJ, McLean RM, Forciea MA; Clinical Guidelines Committee of the American College of Physicians. Noninvasive treatments for acute, subacute, and chronic low back pain: a clinical practice guideline from the American College of Physicians. Ann Intern Med. 2017;166(7):514-530. PMID: 28192789. doi:10.7326/M16-2367 Note: scope is noninvasive TREATMENT of non-radicular and radicular low back pain. It is not a diagnostic guideline and does not cover infection, malignancy, trauma or vascular causes.',
    },
    {
        num: 13,
        text: 'Downie A, Williams CM, Henschke N, et al. Red flags to screen for malignancy and fracture in patients with low back pain: systematic review. BMJ. 2013;347:f7095. PMID: 24335669. doi:10.1136/bmj.f7095',
    },
    {
        num: 14,
        text: 'Chou R, Qaseem A, Snow V, et al. Diagnosis and treatment of low back pain: a joint clinical practice guideline from the American College of Physicians and the American Pain Society. Ann Intern Med. 2007;147(7):478-491. PMID: 17909209. doi:10.7326/0003-4819-147-7-200710020-00006',
    },
    {
        num: 15,
        text: 'Berbari EF, Kanj SS, Kowalski TJ, et al. 2015 Infectious Diseases Society of America (IDSA) clinical practice guidelines for the diagnosis and treatment of native vertebral osteomyelitis in adults. Clin Infect Dis. 2015;61(6):e26-e46. PMID: 26229122. doi:10.1093/cid/civ482',
    },
    {
        num: 16,
        text: 'Davis DP, Salazar A, Chan TC, Vilke GM. Prospective evaluation of a clinical decision guideline to diagnose spinal epidural abscess in patients who present to the emergency department with spine pain. J Neurosurg Spine. 2011;14(6):765-770. PMID: 21417700. doi:10.3171/2011.1.SPINE1091',
    },
    {
        num: 17,
        text: 'Davis DP, Wold RM, Patel RJ, et al. The clinical presentation and impact of diagnostic delays on emergency department patients with spinal epidural abscess. J Emerg Med. 2004;26(3):285-291. PMID: 15028325. doi:10.1016/j.jemermed.2003.11.013',
    },
    {
        num: 18,
        text: 'Ahn UM, Ahn NU, Buchowski JM, et al. Cauda equina syndrome secondary to lumbar disc herniation: a meta-analysis of surgical outcomes. Spine (Phila Pa 1976). 2000;25(12):1515-1522. PMID: 10851100. doi:10.1097/00007632-200006150-00010',
    },
    {
        num: 19,
        text: 'Katzouraki G, Zubairi AJ, Hershkovich O, Grevitt MP. A prospective study of the role of bladder scanning and post-void residual volume measurement in improving diagnostic accuracy of cauda equina syndrome. Bone Joint J. 2020;102-B(6):677-682. PMID: 32475252. doi:10.1302/0301-620X.102B6.BJJ-2020-0195.R1',
    },
    {
        num: 20,
        text: 'Sorensen S, Helweg-Larsen S, Mouridsen H, Hansen HH. Effect of high-dose dexamethasone in carcinomatous metastatic spinal cord compression treated with radiotherapy: a randomised trial. Eur J Cancer. 1994;30A(1):22-27. PMID: 8142159. doi:10.1016/s0959-8049(05)80011-5',
    },
    {
        num: 21,
        text: 'Loblaw DA, Mitera G, Ford M, Laperriere NJ. A 2011 updated systematic review and clinical practice guideline for the management of malignant extradural spinal cord compression. Int J Radiat Oncol Biol Phys. 2012;84(2):312-317. PMID: 22420969. doi:10.1016/j.ijrobp.2012.01.014',
    },
    {
        num: 22,
        text: 'Expert Panel on Neurological Imaging and Musculoskeletal Imaging: Beckmann NM, West OC, Nunez D Jr, et al. ACR Appropriateness Criteria Suspected Spine Trauma. J Am Coll Radiol. 2019;16(5S):S264-S285. PMID: 31054754. doi:10.1016/j.jacr.2019.02.002',
    },
    {
        num: 23,
        text: 'Inaba K, Nosanov L, Menaker J, et al. Prospective derivation of a clinical decision rule for thoracolumbar spine evaluation after blunt trauma: an American Association for the Surgery of Trauma Multi-Institutional Trials Group Study. J Trauma Acute Care Surg. 2015;78(3):459-465. PMID: 25710414. doi:10.1097/TA.0000000000000560',
    },
    {
        num: 24,
        text: 'Chaikof EL, Dalman RL, Eskandari MK, et al. The Society for Vascular Surgery practice guidelines on the care of patients with an abdominal aortic aneurysm. J Vasc Surg. 2018;67(1):2-77.e2. PMID: 29268916. doi:10.1016/j.jvs.2017.10.044',
    },
    {
        num: 25,
        text: 'Deville WL, van der Windt DA, Dzaferagic A, Bezemer PD, Bouter LM. The test of Lasegue: systematic review of the accuracy in diagnosing herniated discs. Spine (Phila Pa 1976). 2000;25(9):1140-1147. PMID: 10788860. doi:10.1097/00007632-200005010-00016',
    },
    {
        num: 26,
        text: 'Brinjikji W, Luetmer PH, Comstock B, et al. Systematic literature review of imaging features of spinal degeneration in asymptomatic populations. AJNR Am J Neuroradiol. 2015;36(4):811-816. PMID: 25430861. doi:10.3174/ajnr.A4173',
    },
    {
        num: 27,
        text: 'Mettler FA Jr, Huda W, Yoshizumi TT, Mahesh M. Effective doses in radiology and diagnostic nuclear medicine: a catalog. Radiology. 2008;248(1):254-263. PMID: 18566177. doi:10.1148/radiol.2481071451',
    },
    {
        num: 28,
        text: 'Friedman BW, Dym AA, Davitt M, et al. Naproxen with cyclobenzaprine, oxycodone/acetaminophen, or placebo for treating acute low back pain: a randomized clinical trial. JAMA. 2015;314(15):1572-1580. PMID: 26501533. doi:10.1001/jama.2015.13043',
    },
    {
        num: 29,
        text: 'Friedman BW, Cisewski D, Irizarry E, et al. A randomized, double-blind, placebo-controlled trial of naproxen with or without orphenadrine or methocarbamol for acute low back pain. Ann Emerg Med. 2018;71(3):348-356.e5. PMID: 29089169. doi:10.1016/j.annemergmed.2017.09.031',
    },
];
