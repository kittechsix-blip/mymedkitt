// MedKitt — Cauda Equina Syndrome (CES)
// Emergency recognition and management of cauda equina compression
// Sources: GIRFT 2023, EMDocs, StatPearls, AJNR 2024
// 6 modules: Recognition → Red Flags → Exam → Imaging → Neurosurgery → Disposition
// ~20 nodes
export const CAUDA_EQUINA_CRITICAL_ACTIONS = [
    { text: 'Ask EVERY back pain patient about bladder, bowel, and saddle sensation — CES is easily missed', nodeId: 'ces-start' },
    { text: 'Post-void residual >500 mL + bilateral sciatica = 48x odds of CES — get MRI STAT', nodeId: 'ces-pvr' },
    { text: 'Bulbocavernosus reflex INTACT = CES excluded (100% sensitivity) — if absent, workup required', nodeId: 'ces-exam' },
    { text: 'MRI within 4 hours of suspected CES — call neurosurgery PARALLEL with imaging, not sequential', nodeId: 'ces-imaging' },
    { text: 'CES-Incomplete (still voiding) = true emergency — surgery <24h prevents progression to CES-Retention', nodeId: 'ces-incomplete' },
    { text: 'Normal post-void residual does NOT exclude CES — 50% of CES-Incomplete have PVR <200 mL', nodeId: 'ces-pvr-caveat' },
];
export const CAUDA_EQUINA_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION & RED FLAGS
    // =====================================================================
    {
        id: 'ces-start',
        type: 'question',
        module: 1,
        title: 'Cauda Equina Syndrome — Recognition',
        body: '**CES is compression of the cauda equina nerve roots causing a surgical emergency.**\n\n**Classic Triad (when present = high suspicion):**\n1. 🦵 **Bilateral leg pain/weakness** or sciatica\n2. 🩲 **Saddle anesthesia** (S3-S5: perineum, genitals, inner thighs)\n3. 🚽 **Bladder/bowel dysfunction** (retention, incontinence)\n\n⚠️ **No single symptom is pathognomonic** — CES is a clinical constellation.\n\n**Key Risk Factors:**\n• Large central disc herniation (most common cause)\n• Trauma with vertebral fracture\n• Epidural abscess or hematoma\n• Spinal tumor/metastasis\n• Post-surgical complication\n\n**ED Imperative:** Screen EVERY back pain patient for red flags! [1][2]',
        options: [
            { label: 'Red flags present', description: 'Bilateral symptoms + any saddle/bladder/bowel complaint', next: 'ces-red-flags', urgency: 'critical' },
            { label: 'Unilateral sciatica only', description: 'No red flags, intact exam', next: 'ces-low-suspicion' },
            { label: 'Perform detailed exam', description: 'Check for subtle findings', next: 'ces-exam' },
        ],
        citation: [1, 2],
        calculatorLinks: [
            { id: 'ces-screening', label: 'CES Screen' },
        ],
    },
    {
        id: 'ces-red-flags',
        type: 'info',
        module: 1,
        title: '🚨 CES Red Flags — Mandatory Screening',
        body: '**Ask EVERY back pain patient these questions:**\n\n**Bladder:**\n• "Any trouble starting or stopping urination?"\n• "Feeling like you can\'t fully empty?"\n• "Any loss of bladder control?"\n\n**Bowel:**\n• "Any loss of bowel control?"\n• "Can you feel when your rectum is full?"\n\n**Sensation:**\n• "Any numbness around your genitals or bottom?"\n• "Can you feel yourself wipe after using the bathroom?"\n\n**Motor:**\n• "Any weakness in both legs?"\n• "Difficulty walking?" (new gait disturbance)\n\n**Sexual (if appropriate):**\n• "Any new loss of sensation during intimacy?"\n\n| Finding | Odds Ratio for CES |\n|---------|-------------------|\n| Severe bilateral neuro deficit | **15x** |\n| Loss of rectal fullness sensation | **>10x** |\n| PVR >500 mL + bilateral sciatica | **48x** |\n| Absent bilateral ankle reflexes | **High** |\n\n**If ANY positive → immediate workup** [1][3]',
        citation: [1, 3],
        next: 'ces-exam',
    },
    // =====================================================================
    // MODULE 2: PHYSICAL EXAMINATION
    // =====================================================================
    {
        id: 'ces-exam',
        type: 'info',
        module: 2,
        title: 'CES Physical Examination',
        body: '**Exam Technique & Diagnostic Value:**\n\n**1. Saddle Sensation (S3-S5)**\n• Test perineum, inner thighs, genitals with light touch/pinprick\n• Sensitivity: 60% | Specificity: 68%\n• Low sensitivity but MUST document\n\n**2. Rectal Tone**\n• Digital rectal exam for sphincter tone\n• Sensitivity: 80% | Specificity: 86% | NPV: 96-100%\n• Reduced tone is specific but misses 20% of cases\n\n**3. Bulbocavernosus Reflex (BCR)**\n• Stroke perineal skin at midline → watch/feel for anal sphincter contraction\n• **Sensitivity: 100% | Specificity: 100%**\n• ✅ **If BCR intact = CES EXCLUDED**\n• ❌ If BCR absent = requires full workup\n\n**4. Post-Void Residual (PVR)**\n• Bedside bladder ultrasound after patient voids\n• <100 mL: Normal\n• <200 mL: NPV 97% (but 50% of CES-I still have low PVR!)\n• >200 mL: 43% probability of CES\n• >500 mL: Very high probability with other findings\n\n**5. Bilateral Ankle Reflexes**\n• Absent bilaterally = increased CES likelihood [3][4]',
        citation: [3, 4],
        calculatorLinks: [
            { id: 'ces-pvr', label: 'PVR Interpretation' },
        ],
        next: 'ces-exam-decision',
    },
    {
        id: 'ces-exam-decision',
        type: 'question',
        module: 2,
        title: 'Exam Findings — Decision Point',
        body: '**Synthesize your clinical findings:**\n\n**HIGH SUSPICION (emergent MRI):**\n• Bilateral neuro deficit + ANY red flag\n• Absent BCR\n• Reduced rectal tone + urinary symptoms\n• PVR >500 mL with bilateral sciatica\n\n**INTERMEDIATE SUSPICION (urgent MRI):**\n• Isolated perianal sensory loss\n• Borderline PVR (200-500 mL)\n• Unilateral symptoms with ANY bladder complaint\n\n**LOW SUSPICION (outpatient):**\n• Unilateral leg pain only\n• Intact exam including BCR\n• Normal PVR\n• No bladder/bowel/saddle symptoms',
        options: [
            { label: 'High suspicion', description: 'Bilateral deficits + red flags', next: 'ces-imaging', urgency: 'critical' },
            { label: 'Intermediate suspicion', description: 'Some findings, not classic triad', next: 'ces-intermediate' },
            { label: 'Low suspicion', description: 'Unilateral, intact exam, no red flags', next: 'ces-low-suspicion' },
        ],
        citation: [1, 4],
    },
    {
        id: 'ces-pvr',
        type: 'info',
        module: 2,
        title: 'Post-Void Residual — Interpretation',
        body: '**Bedside Bladder Ultrasound Protocol:**\n\n1. Have patient void (attempt to empty completely)\n2. Scan bladder within 10 minutes\n3. Measure in 3 dimensions, calculate volume\n\n**Interpretation:**\n\n| PVR Volume | Interpretation | Action |\n|------------|----------------|--------|\n| <100 mL | Normal | Reassuring if exam otherwise normal |\n| 100-200 mL | Borderline | NPV 97% — consider other findings |\n| 200-500 mL | Elevated | 43% probability CES — urgent imaging |\n| >500 mL | Retention | With bilateral sciatica: 48x odds of CES |\n\n**⚠️ CRITICAL CAVEAT:**\n**50% of CES-Incomplete (CES-I) have PVR <200 mL!**\n\nDo NOT use low PVR alone to exclude CES if:\n• Patient has bilateral symptoms\n• Saddle anesthesia present\n• Bowel symptoms present\n• BCR is absent\n\n**PVR is helpful when POSITIVE, less reliable when negative** [4][5]',
        citation: [4, 5],
        next: 'ces-exam-decision',
    },
    // =====================================================================
    // MODULE 3: IMAGING
    // =====================================================================
    {
        id: 'ces-imaging',
        type: 'info',
        module: 3,
        title: 'Imaging Strategy — MRI vs CT',
        body: '**MRI is the Gold Standard**\n\n**Timing per GIRFT Pathway:**\n• Suspected CES → MRI within **4 hours**\n• Do NOT defer to "next day"\n\n**MRI Protocol:**\n• T1/T2 sagittal and axial lumbar spine\n• Key findings: Central disc herniation, epidural mass, compression\n\n**When CT is Acceptable (if MRI unavailable 24/7):**\n• 2024 data: CT achieves **97% sensitivity/specificity** for disc pathology\n• Use optimized lumbar protocol with thin-cut reconstructions\n• Thecal sac effacement <50% reliably rules out CES (NPV 99%)\n\n**CT Limitations:**\n• Less soft tissue detail than MRI\n• Can miss non-discal causes (abscess, tumor)\n• If CT negative but high clinical suspicion → transfer for MRI\n\n**Parallel Process:**\n• Call neurosurgery WHILE imaging is being obtained\n• Do NOT wait for MRI result before consultation [1][5]',
        citation: [1, 5],
        calculatorLinks: [
            { id: 'ces-timing', label: 'Surgery Timing' },
        ],
        next: 'ces-imaging-result',
    },
    {
        id: 'ces-imaging-result',
        type: 'question',
        module: 3,
        title: 'Imaging Result',
        body: '**MRI/CT Findings:**\n\n**Positive for CES:**\n• Large central disc herniation compressing cauda equina\n• Epidural abscess with cord/root compression\n• Epidural hematoma\n• Tumor/metastasis causing compression\n• Fracture fragments in spinal canal\n\n**Negative Imaging:**\n• No compression visible\n• May be false negative if:\n  - Small disc herniation with severe symptoms\n  - Dynamic compression (positional)\n  - Imaging performed after spontaneous decompression',
        options: [
            { label: 'Compression confirmed', description: 'Cauda equina compression on imaging', next: 'ces-surgery', urgency: 'critical' },
            { label: 'Negative imaging, high suspicion', description: 'Clinical picture concerning despite negative MRI', next: 'ces-negative-mri' },
            { label: 'Negative imaging, low suspicion', description: 'Reassuring imaging matches reassuring exam', next: 'ces-low-suspicion' },
        ],
        citation: [1, 5],
    },
    {
        id: 'ces-negative-mri',
        type: 'info',
        module: 3,
        title: 'Negative MRI with High Clinical Suspicion',
        body: '**When imaging doesn\'t match clinical picture:**\n\n**Consider:**\n1. **Repeat imaging** — dynamic compression may need flexion/extension views\n2. **Spinal infarction** — may not show on initial MRI; DWI sequences helpful\n3. **Conus medullaris syndrome** — higher lesion, different imaging plane needed\n4. **Aortic dissection** — can present with leg weakness; consider CT angio\n5. **Guillain-Barré** — ascending weakness; CSF analysis, nerve conduction\n\n**Management:**\n• Admit for observation\n• Serial neuro exams q4-6h\n• Neurology consultation\n• Consider repeat MRI in 24-48h if symptoms persist\n• Low threshold for LP if infection suspected\n\n**Do NOT discharge** patients with bilateral neuro deficits and bladder symptoms just because MRI is negative [1][6]',
        citation: [1, 6],
        next: 'ces-disposition',
    },
    // =====================================================================
    // MODULE 4: CLASSIFICATION & SURGERY
    // =====================================================================
    {
        id: 'ces-incomplete',
        type: 'info',
        module: 4,
        title: 'CES Classification — I vs R',
        body: '**Two Types with Different Urgency:**\n\n**CES-Incomplete (CES-I) — TRUE EMERGENCY**\n• Altered urinary sensation\n• Difficulty voiding, weak stream\n• **But CAN still void** (even if difficult)\n• ~40% of presentations\n• **Better prognosis if treated urgently**\n• **Goal:** Prevent progression to CES-R\n• **Surgery timing:** <24 hours strongly recommended\n\n**CES-Retention (CES-R) — LESS TIME-SENSITIVE**\n• **Painless urinary retention**\n• Overflow incontinence\n• Complete loss of bladder control\n• ~60% of presentations\n• **More guarded prognosis** — damage often permanent\n• **Surgery:** Still indicated, but not as time-critical\n\n**Key Concept:**\n• CES-I → CES-R is **irreversible progression**\n• Operating on CES-I before it becomes CES-R = best outcomes\n• Bladder function at time of surgery = strongest predictor of recovery [2][6]',
        citation: [2, 6],
        next: 'ces-surgery',
    },
    {
        id: 'ces-surgery',
        type: 'result',
        module: 4,
        title: 'Neurosurgical Management',
        body: '**Surgical Decompression is Definitive Treatment**\n\n**Timing Evidence:**\n\n| Timing | Outcome Data |\n|--------|-------------|\n| <24 hours | Superior outcomes (NISC database) |\n| 24-48 hours | Acceptable but inferior to <24h |\n| >48 hours | 9.6x mortality, 2.4x non-routine discharge |\n\n**Pre-Surgical Management:**\n1. **Foley catheter** — document PVR, sensation to insertion, catheter tug test\n2. **Steroids** (if inflammatory cause suspected):\n   • [Dexamethasone](#/drug/dexamethasone/CES) 10-16 mg IV at diagnosis\n   • Strongest evidence in abscess, tumor; weak in disc herniation\n3. **NPO** — prepare for OR\n4. **Pain control** — multimodal, avoid excessive opioids affecting neuro exam\n\n**Surgical Procedure:**\n• Laminectomy with discectomy (most common for disc herniation)\n• Abscess drainage if infectious cause\n• Tumor resection/debulking if malignancy\n\n**Post-op Monitoring:**\n• Serial neuro exams\n• Bladder function recovery may take weeks-months\n• Some patients have permanent deficits despite timely surgery [2][6][7]',
        recommendation: 'Emergent neurosurgery consultation. Surgery within 24 hours for CES-I, as soon as feasible for CES-R. Foley placement with documented sensation. Consider steroids for inflammatory causes.',
        citation: [2, 6, 7],
    },
    // =====================================================================
    // MODULE 5: INTERMEDIATE & LOW SUSPICION
    // =====================================================================
    {
        id: 'ces-intermediate',
        type: 'info',
        module: 5,
        title: 'Intermediate Suspicion — Approach',
        body: '**When findings are concerning but not classic:**\n\n**Examples:**\n• Isolated perianal numbness, otherwise normal exam\n• Borderline PVR (200-400 mL) without bilateral symptoms\n• Unilateral sciatica with vague bladder symptoms\n• BCR equivocal or unable to assess\n\n**Management:**\n1. **Urgent MRI** — within 4-6 hours (same day)\n2. **Serial exams** — q2-4h while awaiting imaging\n3. **Neurology or neurosurgery consultation** — low threshold\n4. **Document carefully** — CES is high medicolegal risk\n\n**If MRI negative:**\n• Observation 6-12 hours with serial exams\n• Clear discharge instructions with red flags\n• Return precautions in writing\n• Follow-up with spine specialist within 1 week\n\n**If ANY worsening** → upgrade to emergent workup [1][3]',
        citation: [1, 3],
        next: 'ces-disposition',
    },
    {
        id: 'ces-low-suspicion',
        type: 'result',
        module: 5,
        title: 'Low Suspicion — Outpatient Management',
        body: '**Low suspicion criteria (ALL must be present):**\n• ✅ Unilateral leg pain only\n• ✅ Normal rectal tone\n• ✅ Intact BCR (if tested)\n• ✅ Normal PVR (<100-200 mL)\n• ✅ No saddle anesthesia\n• ✅ No bladder/bowel symptoms\n• ✅ Able to ambulate\n\n**Outpatient Management:**\n• NSAIDs / acetaminophen for pain\n• Activity as tolerated\n• Physical therapy referral\n• Spine clinic follow-up if symptoms persist >4-6 weeks\n\n**MUST PROVIDE WRITTEN RETURN PRECAUTIONS:**\n\n🚨 **Return immediately if:**\n• Numbness around genitals or bottom (saddle area)\n• Difficulty urinating or loss of bladder control\n• Loss of bowel control\n• Weakness in BOTH legs\n• Worsening or new symptoms\n\n**Document that patient understands** and received written instructions [1]',
        recommendation: 'Discharge with strict return precautions. Written red flag instructions mandatory. Spine clinic follow-up if persistent symptoms.',
        citation: [1],
    },
    // =====================================================================
    // MODULE 6: DISPOSITION & PITFALLS
    // =====================================================================
    {
        id: 'ces-disposition',
        type: 'question',
        module: 6,
        title: 'Disposition Planning',
        body: '**Disposition based on workup results:**',
        options: [
            { label: 'CES confirmed — surgery', description: 'Compression on imaging, neurosurgery consulted', next: 'ces-surgery', urgency: 'critical' },
            { label: 'Admit for observation', description: 'Negative imaging but concerning exam', next: 'ces-observation' },
            { label: 'Discharge with precautions', description: 'Low suspicion, reassuring exam and imaging', next: 'ces-low-suspicion' },
            { label: 'Transfer', description: 'No neurosurgery capability at this facility', next: 'ces-transfer' },
        ],
        citation: [1],
    },
    {
        id: 'ces-observation',
        type: 'result',
        module: 6,
        title: 'Admission for Observation',
        body: '**Indications for observation despite negative imaging:**\n• High clinical suspicion with negative MRI\n• Equivocal exam findings\n• Unable to obtain MRI (CT only available)\n• Patient unreliable for return precautions\n\n**Observation Protocol:**\n• Serial neuro exams q4-6h\n• Strict I/O with bladder scans\n• Low threshold for repeat imaging\n• Neurology consultation\n• Upgrade to emergent workup if ANY deterioration\n\n**Duration:**\n• Minimum 12-24 hours\n• Until confident CES excluded or alternative diagnosis made',
        recommendation: 'Admit to monitored bed. Serial neuro exams q4-6h. Bladder scans. Low threshold for repeat MRI. Neurology consult.',
        citation: [1, 6],
    },
    {
        id: 'ces-transfer',
        type: 'result',
        module: 6,
        title: 'Transfer to Neurosurgical Center',
        body: '**When to transfer:**\n• CES confirmed or highly suspected\n• No neurosurgery at this facility\n• No MRI available and high clinical suspicion\n\n**Pre-transfer:**\n1. Stabilize patient\n2. Place Foley catheter (document sensation)\n3. Start steroids if indicated\n4. Pain control\n5. NPO for potential surgery\n6. Send all imaging with patient\n\n**Communication:**\n• Direct physician-to-physician handoff\n• Emphasize time-sensitivity (surgery <24h goal)\n• Confirm accepting neurosurgeon\n\n**Do NOT delay transfer** for additional workup if CES is suspected and no surgical capability [7]',
        recommendation: 'Emergent transfer to neurosurgical center. Foley placed, steroids given if indicated, imaging sent. Direct MD-to-MD handoff.',
        citation: [7],
    },
    {
        id: 'ces-pitfalls',
        type: 'info',
        module: 6,
        title: 'Common ED Pitfalls',
        body: '**How CES Gets Missed:**\n\n| Pitfall | Solution |\n|---------|----------|\n| Don\'t ask about bladder/bowel | Mandatory screening ALL back pain |\n| Miss saddle anesthesia | Always test perineal sensation |\n| Rely on normal PVR | 50% of CES-I have PVR <200 mL |\n| "Just chronic back pain" | Escalate NEW symptoms in chronic patients |\n| Wait for MRI result to call surgery | Parallel process — call while imaging |\n| Negative exam = no CES | Symptoms trump exam; no single finding excludes |\n| Discharge without written precautions | Always document red flags given |\n\n**Medicolegal Reality:**\n• CES is one of the most common causes of spinal malpractice suits\n• Documentation of screening questions is protective\n• "I asked and patient denied" is better than nothing documented\n• Low threshold for imaging in equivocal cases [1][3]',
        citation: [1, 3],
        next: 'ces-start',
    },
];
export const CAUDA_EQUINA_MODULE_LABELS = [
    'Recognition & Red Flags',
    'Physical Examination',
    'Imaging',
    'Classification & Surgery',
    'Intermediate/Low Suspicion',
    'Disposition & Pitfalls',
];
export const CAUDA_EQUINA_CITATIONS = [
    { num: 1, text: 'GIRFT (Getting It Right First Time) Cauda Equina Syndrome Pathway. NHS England. 2023.' },
    { num: 2, text: 'Todd NV. Guidelines for cauda equina syndrome. Red flags and white flags. Systematic review and implications for triage. Br J Neurosurg. 2017;31(3):336-339.' },
    { num: 3, text: 'Woodfield J, et al. Diagnosis and management of suspected cauda equina syndrome: Assessment and early investigation systematic review. Eur Spine J. 2025.' },
    { num: 4, text: 'Fairbank J, et al. Physical examination predictive value for cauda equina syndrome. PMC. 2022.' },
    { num: 5, text: 'Karsy M, et al. Optimized CT protocol for cauda equina syndrome triage. AJNR. 2024.' },
    { num: 6, text: 'Korse NS, et al. Characteristics of 256 patients with cauda equina syndrome. Eur Spine J. 2023.' },
    { num: 7, text: 'EMDocs. Cauda equina syndrome: Why do we miss it? How to improve. emDocs.net. 2024.' },
];
