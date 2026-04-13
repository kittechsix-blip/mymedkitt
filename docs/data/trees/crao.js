// MedKitt — CRAO (Central Retinal Artery Occlusion)
// Sources: OpenEvidence, EB Medicine, UpToDate, AHA Statement, StatPearls
// 5 modules: Recognition → Exam/Fundoscopy → GCA Evaluation → Treatment → Disposition
// Ophthalmology consult #4
export const CRAO_CRITICAL_ACTIONS = [
    { text: 'Document precise time of symptom onset (last known well)', nodeId: 'crao-start' },
    { text: 'Confirm afferent pupillary defect (APD) with swinging flashlight test', nodeId: 'crao-exam' },
    { text: 'Perform fundoscopy looking for cherry-red spot and pale retina', nodeId: 'crao-fundoscopy' },
    { text: 'Rule out GCA in all patients ≥50 (ESR, CRP, symptoms)', nodeId: 'crao-age-check' },
    { text: 'Give IV methylprednisolone 1000mg if GCA suspected (do NOT wait for biopsy)', nodeId: 'crao-gca-treatment' },
    { text: 'Activate stroke protocol for non-arteritic CRAO', nodeId: 'crao-stroke-protocol' },
    { text: 'Give IV tPA 0.9mg/kg if <4.5 hours and no contraindications', nodeId: 'crao-tpa-treatment' },
    { text: 'Admit ALL CRAO patients for stroke workup (MRI, carotid US, echo)', nodeId: 'crao-dispo' },
    { text: 'Initiate secondary prevention: aspirin, statin, BP control', nodeId: 'crao-secondary-prevention' },
];
export const CRAO_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'crao-start',
        type: 'info',
        module: 1,
        title: 'CRAO: Stroke of the Eye',
        body: '**Central Retinal Artery Occlusion = CNS Infarction (Stroke)**\n\nPer AHA/ASA, CRAO is classified as a central nervous system stroke.\n\n**Why This Matters:**\n- 30%+ have concurrent cerebral ischemia\n- Risk of cerebral stroke peaks 1-7 days post-CRAO\n- Same embolic sources as stroke (carotid, cardiac)\n- Same time-critical treatment window\n\n**Classic Presentation:**\n- **Painless** (pain = think GCA)\n- **Sudden** (seconds to minutes)\n- **Monocular** vision loss\n\n**Time Windows:**\n\n| Window | Significance |\n|--------|-------------|\n| **90-100 min** | Irreversible retinal damage begins |\n| **4.5 hours** | IV tPA treatment window |\n| **12+ hours** | Treatment benefit unlikely |\n\n[tPA Window Tool](#/calculator/crao-window) [1][2]',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'crao-window', label: 'tPA Window' },
        ],
        next: 'crao-symptom-onset',
        summary: 'CRAO is a CNS stroke — 30%+ have concurrent cerebral ischemia, stroke risk peaks days 1-7',
        safetyLevel: 'warning',
    },
    {
        id: 'crao-symptom-onset',
        type: 'question',
        module: 1,
        title: 'Symptom Onset',
        body: '**When did vision loss begin?**\n\nPrecise timing is critical for treatment decisions.\n\nIf patient woke with symptoms, use "last known well" time.',
        citation: [1, 2],
        options: [
            {
                label: '< 4.5 Hours',
                description: 'Within tPA treatment window',
                next: 'crao-exam',
                urgency: 'critical',
            },
            {
                label: '4.5-12 Hours',
                description: 'Outside IV tPA window, HBO may help',
                next: 'crao-exam',
            },
            {
                label: '> 12 Hours',
                description: 'Unlikely to benefit from reperfusion',
                next: 'crao-exam',
            },
            {
                label: 'Unknown / Wake-Up',
                description: 'Use last known well time',
                next: 'crao-exam',
            },
        ],
        summary: 'Document precise onset time — retinal damage irreversible at 90-100 min, tPA window 4.5h',
    },
    // =====================================================================
    // MODULE 2: EXAM/FUNDOSCOPY
    // =====================================================================
    {
        id: 'crao-exam',
        type: 'info',
        module: 2,
        title: 'Key Examination',
        body: '**1. Visual Acuity:**\n- Often counting fingers (CF) or hand motion (HM)\n- May be light perception (LP) or no light perception (NLP)\n- Document in affected and unaffected eye\n\n**2. Pupil Exam (CRITICAL):**\n\n**Afferent Pupillary Defect (APD) / Marcus Gunn:**\n- Swinging flashlight test\n- Affected pupil DILATES when light swings to it\n- **92-98% sensitive** for asymmetric afferent pathway disease\n\n**Key Point:** If NO APD with "complete" vision loss, reconsider diagnosis.\n\n**3. Visual Fields:**\n- Usually dense central/total field loss\n- If peripheral sparing, may have cilioretinal artery preservation\n\n**4. External Eye:**\n- Usually normal\n- No injection, no pain [1][2][3]',
        citation: [1, 2, 3],
        next: 'crao-fundoscopy',
        summary: 'APD present in 92-98% — if NO APD with complete vision loss, reconsider the diagnosis',
    },
    {
        id: 'crao-fundoscopy',
        type: 'info',
        module: 2,
        title: 'Fundoscopic Findings',
        body: '**Classic CRAO Findings:**\n\n| Finding | Description | Frequency |\n|---------|-------------|------------|\n| **Cherry-red spot** | Red fovea, pale surrounding retina | 90% |\n| **Pale/white retina** | Ischemic swelling | 58% |\n| **Boxcarring** | Segmented blood columns in arteries | 19% |\n| **Attenuated arteries** | Thin, thread-like | 32% |\n| **Disc pallor** | Late finding | 39% |\n\n**Cherry-Red Spot Explained:**\nThe fovea has no inner retinal layers. You see the red choroid through the thin fovea, surrounded by pale, edematous, ischemic retina.\n\n**Emboli Types:**\n\n| Type | Appearance | Source |\n|------|------------|--------|\n| Cholesterol (Hollenhorst) | Orange/refractile | Carotid |\n| Calcific | White | Cardiac valves |\n| Platelet-fibrin | Dull white | Atherosclerotic plaques |\n\n[Fundus Findings Tool](#/calculator/crao-fundus) [1][2][3]',
        citation: [1, 2, 3],
        images: [{ src: 'images/crao/crao-fluorescein.jpg', alt: 'Fluorescein angiogram showing CRAO with poor retinal perfusion', caption: 'CRAO on FA: absent/delayed arterial filling with segmental perfusion — fundoscopy shows pale retina + cherry-red spot at fovea. Time-critical: treat within 4.5h (Wikimedia Commons, CC BY-SA 4.0)' }],
        calculatorLinks: [
            { id: 'crao-fundus', label: 'Fundus Findings' },
        ],
        next: 'crao-confirm-dx',
        summary: 'Cherry-red spot in 90% — pale retina from ischemic swelling, fovea visible through thin retinal layers',
    },
    {
        id: 'crao-confirm-dx',
        type: 'question',
        module: 2,
        title: 'Confirm Diagnosis',
        body: '**Does exam support CRAO?**\n\n**Required:**\n- APD present\n- Fundoscopic findings consistent\n- Painless, sudden, monocular',
        citation: [1, 2],
        options: [
            {
                label: 'Classic CRAO',
                description: 'APD + cherry-red spot + sudden painless loss',
                next: 'crao-age-check',
                urgency: 'critical',
            },
            {
                label: 'BRAO (Branch RAO)',
                description: 'Partial field loss, sectoral findings',
                next: 'crao-brao',
            },
            {
                label: 'Findings Not Consistent',
                description: 'Consider alternative diagnosis',
                next: 'crao-differential',
            },
        ],
        summary: 'APD + cherry-red spot + sudden painless monocular loss = classic CRAO — proceed to GCA evaluation',
    },
    {
        id: 'crao-differential',
        type: 'info',
        module: 2,
        title: 'Differential Diagnosis',
        body: '**CRAO Mimics:**\n\n| Condition | Key Differentiators |\n|-----------|---------------------|\n| **CRVO** | "Blood and thunder" - hemorrhages, dilated tortuous veins |\n| **Optic neuritis** | **PAINFUL** (especially with EOM), younger patients |\n| **Retinal detachment** | "Curtain" field loss, floaters, flashes |\n| **GCA/AION** | May look similar; check GCA symptoms |\n| **Vitreous hemorrhage** | No fundus view, diabetes/trauma history |\n| **Cortical stroke** | Bilateral, homonymous defect |\n\n**Key Questions:**\n- Is there pain? (CRAO = painless)\n- Is it monocular? (CRAO = one eye)\n- Was onset sudden? (CRAO = seconds)\n\nIf CRAO features absent, pursue alternative workup. [1][3]',
        citation: [1, 3],
        next: 'crao-age-check',
        summary: 'CRAO is painless — pain suggests GCA or optic neuritis; bilateral suggests cortical stroke',
    },
    {
        id: 'crao-brao',
        type: 'info',
        module: 2,
        title: 'Branch Retinal Artery Occlusion',
        body: '**BRAO — Partial Vision Loss:**\n\n**Presentation:**\n- Altitudinal or sectoral field defect\n- May be asymptomatic if small area\n- Less severe vision loss than CRAO\n\n**Fundoscopy:**\n- Whitening along distribution of occluded branch\n- May see embolus at bifurcation\n- Cherry-red spot usually absent\n\n**Management:**\n- Less emergent than CRAO\n- Still requires stroke workup\n- Same embolic sources\n- Same admission criteria\n\n**Prognosis:**\n- Better visual recovery than CRAO\n- 80% recover to 20/40 or better\n\n**Still warrants:** GCA evaluation, stroke workup, admission. [1][2]',
        citation: [1, 2],
        next: 'crao-age-check',
        summary: 'Branch RAO: partial field loss, 80% recover to 20/40 — still requires stroke workup and admission',
    },
    // =====================================================================
    // MODULE 3: GCA EVALUATION
    // =====================================================================
    {
        id: 'crao-age-check',
        type: 'question',
        module: 3,
        title: 'GCA Risk Assessment',
        body: '**Is the patient ≥50 years old?**\n\nGiant Cell Arteritis (GCA) can cause CRAO via arteritic mechanism. GCA-CRAO requires steroids, NOT tPA.\n\n**Must rule out GCA in ALL patients ≥50.**',
        citation: [1, 4],
        options: [
            {
                label: 'Age ≥50',
                description: 'Must evaluate for GCA',
                next: 'crao-gca-symptoms',
            },
            {
                label: 'Age <50',
                description: 'GCA unlikely, proceed to treatment',
                next: 'crao-stroke-protocol',
            },
        ],
        summary: 'Must rule out GCA in ALL patients ≥50 — arteritic CRAO needs steroids, NOT tPA',
        safetyLevel: 'warning',
    },
    {
        id: 'crao-gca-symptoms',
        type: 'info',
        module: 3,
        title: 'GCA Symptom Evaluation',
        body: '**GCA Symptoms to Ask About:**\n\n| Symptom | Sensitivity |\n|---------|-------------|\n| Headache (new) | 76% |\n| Scalp tenderness | 34% |\n| Jaw claudication | 50% |\n| Temporal artery abnormality | 65% |\n| Polymyalgia symptoms | 40% |\n| Constitutional (fever, weight loss, fatigue) | 40% |\n\n**Jaw Claudication:**\n- Pain/fatigue with chewing\n- **Most specific symptom (LR+ = 4.2)**\n\n**Key Exam:**\n- Palpate temporal arteries\n- Look for tenderness, nodularity, decreased pulse\n\n**GCA Labs:**\n- **ESR** (usually >50, can be >100)\n- **CRP** (more sensitive than ESR, 98.6%)\n- **Platelets** (thrombocytosis >400k more specific)\n\n**Both ESR + CRP elevated = 99% sensitive** [1][4]',
        citation: [1, 4],
        next: 'crao-gca-decision',
        summary: 'Jaw claudication most specific (LR+ 4.2) — both ESR + CRP elevated = 99% sensitive for GCA',
    },
    {
        id: 'crao-gca-decision',
        type: 'question',
        module: 3,
        title: 'GCA Suspicion',
        body: '**Is there clinical suspicion for GCA?**\n\n**High suspicion if:**\n- Jaw claudication present\n- Temporal artery abnormality\n- PMR symptoms\n- Constitutional symptoms + headache\n- ESR/CRP markedly elevated',
        citation: [1, 4],
        options: [
            {
                label: 'GCA Suspected',
                description: 'Treat as arteritic CRAO',
                next: 'crao-gca-treatment',
                urgency: 'critical',
            },
            {
                label: 'GCA Unlikely',
                description: 'No symptoms, labs negative/pending',
                next: 'crao-stroke-protocol',
            },
            {
                label: 'Uncertain',
                description: 'Some features present',
                next: 'crao-gca-uncertain',
            },
        ],
        summary: 'If GCA suspected, start IV methylprednisolone 1000mg immediately — do NOT wait for biopsy',
    },
    {
        id: 'crao-gca-treatment',
        type: 'info',
        module: 3,
        title: 'Arteritic CRAO (GCA)',
        body: '**⚠️ GCA-CRAO: START STEROIDS IMMEDIATELY ⚠️**\n\n**Do NOT give tPA for arteritic CRAO.**\n\n**High-Dose IV Methylprednisolone:**\n- 1000 mg IV daily × 3-5 days\n- Then transition to oral prednisone 1 mg/kg/day\n\n**Why Immediate Treatment?**\n- Fellow eye at risk (25-50% bilateral within days-weeks)\n- Steroids prevent fellow eye involvement\n- DO NOT wait for biopsy to start treatment\n\n**Temporal Artery Biopsy:**\n- Should be done within 2 weeks of starting steroids\n- Steroids don\'t affect biopsy for 2+ weeks\n- Arrange as inpatient\n\n**Consults:**\n- Rheumatology\n- Ophthalmology\n\n**Admission:** Required for steroid initiation and monitoring. [1][4]',
        citation: [1, 4],
        treatment: {
            firstLine: {
                drug: 'Methylprednisolone',
                dose: '1000 mg',
                route: 'IV',
                frequency: 'Daily',
                duration: '3-5 days',
                notes: 'Start immediately. Do NOT wait for biopsy. Transition to oral prednisone 1 mg/kg/day after IV course.',
            },
            alternative: {
                drug: 'Prednisone',
                dose: '1 mg/kg',
                route: 'PO',
                frequency: 'Daily',
                duration: 'Months (rheumatology-guided taper)',
                notes: 'Oral maintenance after IV pulse. Typical starting dose 60-80 mg daily.',
            },
            monitoring: 'Blood glucose, blood pressure, electrolytes. Watch for steroid-induced hyperglycemia. Rheumatology follow-up for taper guidance.',
        },
        next: 'crao-dispo',
        summary: 'IV methylpred 1000mg daily x 3-5d — fellow eye at risk (25-50% bilateral within days-weeks)',
        safetyLevel: 'critical',
    },
    {
        id: 'crao-gca-uncertain',
        type: 'info',
        module: 3,
        title: 'GCA Uncertain',
        body: '**If uncertain about GCA:**\n\n**Labs to Send:**\n- ESR (stat)\n- CRP (stat)\n- CBC with platelets\n\n**Consider starting steroids if:**\n- ESR significantly elevated (>50)\n- Clinical features suggestive\n- Risk of fellow eye involvement high\n\n**Can give steroids AND tPA?**\n- Controversial\n- If GCA ruled out, tPA is appropriate\n- If GCA confirmed, tPA not indicated (inflammatory, not embolic)\n\n**When in doubt:**\n- Start IV methylprednisolone\n- Consult ophthalmology urgently\n- Rheumatology consultation\n\n**Document reasoning clearly.** [1][4]',
        citation: [1, 4],
        treatment: {
            firstLine: {
                drug: 'Methylprednisolone',
                dose: '1000 mg',
                route: 'IV',
                frequency: 'Daily',
                duration: '3-5 days',
                notes: 'Start empirically if GCA suspicion moderate-high. Risk of fellow eye loss outweighs steroid risks.',
            },
            monitoring: 'ESR, CRP trending. Blood glucose. Arrange temporal artery biopsy within 2 weeks.',
        },
        next: 'crao-stroke-protocol',
        summary: 'When uncertain: start steroids empirically — risk of fellow eye loss outweighs steroid risks',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 4: TREATMENT
    // =====================================================================
    {
        id: 'crao-stroke-protocol',
        type: 'info',
        module: 4,
        title: 'Activate Stroke Protocol',
        body: '**CRAO = Stroke Emergency**\n\n**Immediate Actions:**\n\n1. **Stroke Alert** — Activate code stroke\n\n2. **CT Head** — Rule out hemorrhage before tPA\n\n3. **Labs:**\n- CBC, BMP, coags, glucose\n- ESR, CRP, platelets (GCA screen if ≥50)\n\n4. **ECG** — AFib screening\n\n5. **IV Access** — For potential tPA\n\n**Consults:**\n- Neurology/Stroke team (primary)\n- Ophthalmology (diagnosis confirmation)\n\n**Do NOT Delay for:**\n- Ocular massage\n- Eye drops\n- Paracentesis\n- Detailed fundoscopy\n\n[tPA Window Tool](#/calculator/crao-window) [1][2]',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'crao-window', label: 'tPA Window' },
        ],
        next: 'crao-tpa-decision',
        summary: 'Activate code stroke — CT head, labs, ECG; do NOT delay for ocular massage or eye drops',
    },
    {
        id: 'crao-tpa-decision',
        type: 'question',
        module: 4,
        title: 'tPA Decision',
        body: '**Is patient a candidate for IV tPA?**\n\n**Requirements:**\n- Symptom onset ≤4.5 hours\n- GCA ruled out (non-arteritic CRAO)\n- No contraindications to tPA\n- CT head negative for hemorrhage\n\n**Note:** Same contraindications as stroke tPA.',
        citation: [1, 2],
        options: [
            {
                label: '≤4.5 Hours + No Contraindications',
                description: 'tPA candidate',
                next: 'crao-tpa-treatment',
                urgency: 'critical',
            },
            {
                label: '>4.5 Hours or Contraindicated',
                description: 'tPA not indicated',
                next: 'crao-other-treatments',
            },
            {
                label: 'GCA Suspected',
                description: 'Steroids, not tPA',
                next: 'crao-gca-treatment',
            },
        ],
        summary: 'tPA candidate if ≤4.5h, non-arteritic, no contraindications, CT negative — same as stroke protocol',
    },
    {
        id: 'crao-tpa-treatment',
        type: 'info',
        module: 4,
        title: 'IV tPA for CRAO',
        body: '**IV Alteplase (tPA) for Non-Arteritic CRAO:**\n\n**Dose:** Same as stroke protocol\n- 0.9 mg/kg (max 90 mg)\n- 10% as bolus over 1 minute\n- 90% as infusion over 60 minutes\n\n**Evidence:**\n- NNT = 4 for functional visual recovery\n- 50% recovery rate within 4.5h window\n- No increased ICH risk in studies\n- No benefit if given >4.5 hours\n\n**Post-tPA Monitoring:**\n- Neuro checks q15min × 2h, then q30min × 6h, then q1h × 16h\n- BP monitoring (goal <180/105)\n- No antiplatelet/anticoagulant × 24h\n\n**IA tPA (Interventional):**\n- Some centers offer intra-arterial approach\n- Extended window (up to 6 hours)\n- Not widely available [1][2]',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Alteplase (tPA)',
                dose: '0.9 mg/kg (max 90 mg)',
                route: 'IV',
                frequency: 'Once (10% bolus over 1 min, 90% infusion over 60 min)',
                duration: 'Single dose',
                notes: 'Must be within 4.5 hours of symptom onset. Same contraindications as stroke tPA. GCA must be ruled out.',
            },
            alternative: {
                drug: 'Tenecteplase',
                dose: '0.25 mg/kg (max 25 mg)',
                route: 'IV bolus',
                frequency: 'Once',
                duration: 'Single dose',
                notes: 'Some centers use tenecteplase as alternative. Single bolus administration. Check institutional protocol.',
            },
            monitoring: 'Neuro checks q15min x 2h, then q30min x 6h, then q1h x 16h. BP goal <180/105. No antiplatelet/anticoagulant x 24h. Monitor for signs of ICH.',
        },
        next: 'crao-workup',
        summary: 'tPA 0.9 mg/kg (max 90mg) — NNT 4 for visual recovery within 4.5h window, 50% recovery rate',
        skippable: true,
        safetyLevel: 'critical',
    },
    {
        id: 'crao-other-treatments',
        type: 'info',
        module: 4,
        title: 'Other Treatment Options',
        body: '**Traditional Treatments (Limited/No Evidence):**\n\n| Treatment | Evidence |\n|-----------|----------|\n| Ocular massage | **No proven benefit** |\n| Anterior chamber paracentesis | **No proven benefit** |\n| Carbogen inhalation | **No proven benefit** |\n| IOP-lowering drops | **No proven benefit** |\n\n**2009 Cochrane Review:** None of these "conservative" treatments showed benefit over observation.\n\n**Hyperbaric Oxygen (HBO):**\n- May help if <12 hours (best if <2 hours)\n- Protocol: 2-2.5 atm × 90 minutes\n- Mixed evidence, limited availability\n- Consider if within window and available\n\n**Focus on:**\n1. Secondary prevention (stroke risk high)\n2. Embolic source workup\n3. Risk factor modification [1][2]',
        citation: [1, 2],
        next: 'crao-workup',
        summary: 'Ocular massage, paracentesis, IOP drops have NO proven benefit — focus on secondary prevention',
        skippable: true,
    },
    {
        id: 'crao-workup',
        type: 'info',
        module: 4,
        title: 'Inpatient Workup',
        body: '**All CRAO Patients Need Stroke Workup:**\n\n**Imaging:**\n- [ ] **MRI brain with DWI** — 20-32% have concurrent brain infarcts\n- [ ] **Carotid ultrasound/doppler** — stenosis, plaque\n- [ ] **MRA head/neck** — comprehensive vascular assessment\n\n**Cardiac:**\n- [ ] **Echocardiogram** (TTE, consider TEE)\n- [ ] **Telemetry** — continuous monitoring\n- [ ] **Holter monitor** — paroxysmal AFib detection\n\n**Labs:**\n- CBC, BMP, lipid panel, HbA1c\n- ESR, CRP (if not done)\n- Hypercoagulable workup (if young or recurrent)\n\n**Why Admit?**\n- 30%+ have concurrent cerebral ischemia\n- High stroke/MI risk in days following CRAO\n- Need comprehensive embolic workup [1][2]',
        citation: [1, 2],
        next: 'crao-dispo',
        summary: 'All CRAO need MRI brain (20-32% have concurrent infarcts), carotid US, echo, telemetry for AFib',
    },
    // =====================================================================
    // MODULE 5: DISPOSITION
    // =====================================================================
    {
        id: 'crao-dispo',
        type: 'info',
        module: 5,
        title: 'Disposition',
        body: '**ALL CRAO Patients Should Be Admitted.**\n\n**Rationale:**\n- 20-32% have concurrent cerebral infarcts\n- Stroke/MI risk peaks days 1-7\n- Need comprehensive embolic workup\n- Secondary prevention initiation\n\n**Admission Location:**\n- Stroke unit/Neurology service (primary)\n- Telemetry for AFib monitoring\n\n**Consults:**\n- Neurology/Stroke team (primary service)\n- Ophthalmology (diagnosis, follow-up)\n- Cardiology (if cardiac source suspected)\n- Rheumatology (if GCA)\n\n**Outpatient is NOT Appropriate:**\n- These patients are extremely high-risk\n- Do not discharge from ED\n\n[Disposition Tool](#/calculator/crao-dispo) [1][2]',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'crao-dispo', label: 'Disposition Tool' },
        ],
        next: 'crao-secondary-prevention',
        summary: 'ALL CRAO patients should be admitted — stroke unit for embolic workup and secondary prevention',
        skippable: true,
    },
    {
        id: 'crao-secondary-prevention',
        type: 'info',
        module: 5,
        title: 'Secondary Prevention',
        body: '**Initiate During Admission:**\n\n**Antithrombotic:**\n- Aspirin 81-325 mg daily (if not on anticoagulation)\n- Anticoagulation if AFib confirmed\n\n**Statin:**\n- High-intensity statin (atorvastatin 40-80 mg)\n- Regardless of baseline LDL\n\n**Blood Pressure:**\n- Goal <130/80 mmHg\n- Avoid aggressive lowering acutely\n\n**Glycemic Control:**\n- HbA1c goal <7% (individualized)\n\n**Carotid Stenosis:**\n- If >70% stenosis → vascular surgery consult\n- CEA/stenting consideration\n\n**Lifestyle:**\n- Smoking cessation\n- Diet modification\n- Exercise counseling [1][2]',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Aspirin',
                dose: '81-325 mg',
                route: 'PO',
                frequency: 'Daily',
                duration: 'Indefinite',
                notes: 'Unless on anticoagulation for AFib. Start after tPA window (24h post-tPA if given).',
            },
            alternative: {
                drug: 'Atorvastatin',
                dose: '40-80 mg',
                route: 'PO',
                frequency: 'Daily (at bedtime)',
                duration: 'Indefinite',
                notes: 'High-intensity statin regardless of baseline LDL. For statin intolerance, consider rosuvastatin 20-40 mg or ezetimibe.',
            },
            monitoring: 'LDL goal <70 mg/dL. Check LFTs at baseline and 4-12 weeks. Monitor for myalgias. BP goal <130/80.',
        },
        next: 'crao-prognosis',
        summary: 'Aspirin 81-325mg daily + high-intensity statin — anticoagulation if AFib confirmed',
    },
    {
        id: 'crao-prognosis',
        type: 'info',
        module: 5,
        title: 'Prognosis',
        body: '**Visual Prognosis:**\n\n| Presentation | VA Outcome |\n|--------------|------------|\n| CRAO (untreated) | 93% remain ≤20/400 |\n| CRAO with tPA <4.5h | 50% improve |\n| CRAO with cilioretinal sparing | Better central vision |\n| BRAO | 80% recover to 20/40+ |\n\n**Systemic Prognosis:**\n- 5-year mortality: 40% (higher than age-matched)\n- Stroke risk highest in first week\n- MI risk elevated for months\n\n**Follow-Up:**\n- Ophthalmology: 1-2 weeks\n- Neurology: per stroke protocol\n- PCP: ongoing risk factor management\n\n**Key Takeaway:**\nTreat the eye, but remember this is a systemic vascular disease. The CRAO is a warning of worse events to come. [1][2]',
        citation: [1, 2],
        options: [
            {
                label: 'Complete — Return to Start',
                next: 'crao-start',
            },
        ],
        summary: 'Untreated: 93% remain ≤20/400; with tPA <4.5h: 50% improve; 5-year mortality 40%',
        skippable: true,
    },
];
export const CRAO_MODULE_LABELS = [
    'Recognition',
    'Exam/Fundoscopy',
    'GCA Evaluation',
    'Treatment',
    'Disposition',
];
export const CRAO_CITATIONS = [
    { num: 1, text: 'AHA Scientific Statement. Management of CRAO. Stroke. 2021.' },
    { num: 2, text: 'StatPearls. Central Retinal Artery Occlusion. 2024.' },
    { num: 3, text: 'EyeWiki. Retinal Artery Occlusion. 2024.' },
    { num: 4, text: 'OpenEvidence. Giant Cell Arteritis ED Management. 2024.' },
];
