// MedKitt - Guillain-Barre Syndrome Management
// Recognition & diagnosis -> Respiratory monitoring -> Workup -> Treatment -> Supportive care -> Intubation -> Disposition
// 8 modules: Recognition -> Respiratory Monitoring -> Diagnostic Workup -> Treatment -> Supportive Care -> Intubation -> Disposition -> Prognosis
// 21 nodes total.
export const GUILLAIN_BARRE_CRITICAL_ACTIONS = [
    { text: 'Serial respiratory monitoring: NIF, FVC, O2 sat', nodeId: 'gbs-respiratory-monitoring' },
    { text: 'Intubate if NIF >-20, FVC <20 mL/kg, or impending failure', nodeId: 'gbs-intubation-criteria' },
    { text: 'LP for CSF: albuminocytologic dissociation confirms GBS', nodeId: 'gbs-csf' },
    { text: 'IVIG 0.4 g/kg/day x 5 days (preferred)', nodeId: 'gbs-treatment' },
    { text: 'Plasmapheresis if IVIG unavailable or contraindicated', nodeId: 'gbs-treatment' },
    { text: 'Admit all GBS patients for monitoring', nodeId: 'gbs-disposition' },
    { text: 'Neurology consult for all suspected GBS', nodeId: 'gbs-neuro-consult' },
    { text: 'DVT prophylaxis for all admitted GBS patients', nodeId: 'gbs-supportive' },
];
export const GUILLAIN_BARRE_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'gbs-start',
        type: 'info',
        module: 1,
        title: 'Guillain-Barre Syndrome',
        body: '**GBS Summary** - acute inflammatory polyneuropathy requiring early recognition and aggressive monitoring.\n\n**Guillain-Barre Syndrome (GBS)** is an acute immune-mediated polyradiculoneuropathy characterized by rapidly progressive, symmetric weakness and areflexia.\n\n**Key features:**\n- Ascending symmetric weakness (legs before arms)\n- Hyporeflexia or areflexia\n- Sensory symptoms (paresthesias, numbness) often precede weakness\n- Progression over days to 4 weeks (nadir typically by 4 weeks)\n\n**Antecedent infection in 2/3 of cases:**\n- Campylobacter jejuni (most common, associated with axonal variants)\n- CMV, EBV, Zika virus\n- Recent vaccination (rare)\n\n**3-5% mortality** from respiratory failure, autonomic dysfunction, or pulmonary embolism.',
        images: [{ src: 'images/guillain-barre/gbs-patterns.png', alt: 'Diagram showing the different clinical patterns of Guillain-Barré syndrome including AIDP, AMAN, AMSAN, Miller Fisher syndrome, and pharyngeal-cervical-brachial variants', caption: 'GBS variants — AIDP (ascending demyelinating, most common in West), AMAN/AMSAN (axonal, post-Campylobacter), Miller Fisher (ophthalmoplegia + ataxia + areflexia). All require IVIG or plasmapheresis for confirmed moderate-severe disease. (CC BY 4.0, Leonhard et al. 2019)' }],
        citation: [1, 2, 3],
        calculatorLinks: [{ id: 'gbs-variants', label: 'GBS Variants' }],
        next: 'gbs-presentation',
        summary: 'Ascending symmetric weakness with areflexia — 3-5% mortality from respiratory failure or PE',
    },
    {
        id: 'gbs-presentation',
        type: 'question',
        module: 1,
        title: 'Clinical Presentation',
        body: '**Classic GBS presentation:**\n- Symmetric ascending weakness starting in legs\n- Hyporeflexia or areflexia (early and key finding)\n- Sensory symptoms: paresthesias, numbness, pain\n- Cranial nerve involvement (facial weakness, bulbar symptoms) in 50%\n\n**Temporal pattern:**\n- Symptoms progress over days to 4 weeks\n- Nadir (worst point) typically reached by 2-4 weeks\n- If progression >8 weeks, consider CIDP (chronic form)\n\n**Red flags requiring immediate attention:**\n- Bulbar symptoms (dysphagia, dysarthria, drooling)\n- Respiratory symptoms (dyspnea, weak cough, orthopnea)\n- Autonomic dysfunction (BP lability, arrhythmias, urinary retention)\n- Rapid progression (<24-48 hours to severe weakness)',
        citation: [1, 2],
        options: [
            {
                label: 'Classic ascending weakness pattern',
                description: 'Symmetric leg weakness, areflexia, sensory symptoms',
                next: 'gbs-variants-check',
            },
            {
                label: 'Bulbar or respiratory symptoms present',
                description: 'Dysphagia, weak cough, dyspnea - high risk',
                next: 'gbs-respiratory-monitoring',
                urgency: 'critical',
            },
            {
                label: 'Atypical presentation - consider variant',
                description: 'Ataxia, ophthalmoplegia, or pure motor/sensory',
                next: 'gbs-variants',
            },
        ],
        summary: 'Bulbar symptoms (dysphagia, weak cough) or rapid progression = immediate respiratory assessment',
        safetyLevel: 'critical',
    },
    {
        id: 'gbs-variants-check',
        type: 'info',
        module: 1,
        title: 'GBS Variant Syndromes',
        body: '[GBS Variant Guide](#/calculator/gbs-variants) - detailed comparison of GBS subtypes.\n\n**AIDP (Acute Inflammatory Demyelinating Polyradiculoneuropathy)**\n- Most common variant in Western countries (90%)\n- Demyelinating pattern on EMG/NCS\n- Classic ascending weakness with areflexia\n\n**AMAN (Acute Motor Axonal Neuropathy)**\n- Strongly associated with Campylobacter jejuni infection\n- Pure motor involvement (no sensory symptoms)\n- Axonal pattern on EMG/NCS\n- More common in Asia, Mexico, South America\n- Anti-GM1, anti-GD1a antibodies\n\n**AMSAN (Acute Motor and Sensory Axonal Neuropathy)**\n- Axonal variant with sensory involvement\n- More severe, worse prognosis than AMAN\n- Prolonged recovery, higher disability rate\n\n**Miller Fisher Syndrome (MFS)**\n- Classic triad: **ataxia, areflexia, ophthalmoplegia**\n- Anti-GQ1b antibodies (>90% positive)\n- May overlap with GBS (MFS-GBS overlap)\n- Generally good prognosis',
        citation: [1, 2, 4],
        calculatorLinks: [{ id: 'gbs-variants', label: 'GBS Variants' }],
        next: 'gbs-respiratory-monitoring',
        summary: 'AIDP most common (90%); AMAN post-Campylobacter; Miller Fisher = ataxia + areflexia + ophthalmoplegia',
        skippable: true,
    },
    {
        id: 'gbs-variants',
        type: 'info',
        module: 1,
        title: 'Atypical GBS Variants',
        body: '**Miller Fisher Syndrome:**\n- Triad: ataxia, areflexia, ophthalmoplegia\n- Anti-GQ1b antibodies highly specific (>90%)\n- Often follows respiratory infection\n- May progress to classic GBS (overlap syndrome)\n- Treatment: supportive, IVIG if progresses\n\n**Pharyngeal-Cervical-Brachial variant:**\n- Weakness of oropharyngeal, neck, and arm muscles\n- Leg strength preserved\n- High risk of respiratory failure despite preserved leg strength\n\n**Pure sensory variant:**\n- Sensory ataxia, areflexia, paresthesias\n- No weakness (or minimal)\n- Consider CIDP if chronic\n\n**Acute pandysautonomia:**\n- Predominant autonomic dysfunction\n- Orthostatic hypotension, GI dysmotility, urinary retention\n- Minimal motor/sensory involvement\n\n**Bifacial weakness with paresthesias:**\n- Bilateral facial weakness\n- Distal paresthesias\n- Limb strength preserved',
        citation: [2, 4],
        calculatorLinks: [{ id: 'gbs-variants', label: 'GBS Variants' }],
        next: 'gbs-respiratory-monitoring',
        summary: 'Pharyngeal-cervical-brachial variant: high respiratory failure risk despite preserved leg strength',
        skippable: true,
    },
    // =====================================================================
    // MODULE 2: RESPIRATORY MONITORING - CRITICAL
    // =====================================================================
    {
        id: 'gbs-respiratory-monitoring',
        type: 'info',
        module: 2,
        title: 'Respiratory Monitoring - The 20/30/40 Rule',
        body: '[FVC/NIF Calculator](#/calculator/gbs-fvc-nif) - track respiratory function and predict need for intubation.\n\n**THE 20/30/40 RULE FOR IMPENDING RESPIRATORY FAILURE:**\n\n| Parameter | Threshold | Action |\n|-----------|-----------|--------|\n| FVC | <20 mL/kg (or <1L absolute) | Prepare for intubation |\n| NIF | Weaker than -30 cmH2O | Impending failure |\n| FVC decline | >30% from baseline | Escalate monitoring |\n| Predicted decline | >40% | High risk |\n\n**NIF interpretation:** Closer to 0 = WORSE (e.g., -15 is worse than -40)\n\n**Monitoring frequency:**\n- Q4-6h in all admitted GBS patients\n- Q2h if declining or concerning trend\n- Continuous pulse oximetry\n\n**Single breath count:**\n- Count out loud in one breath\n- <20 = concerning\n- <10 = imminent respiratory failure\n\n**Bulbar weakness increases aspiration risk independent of FVC** - may need earlier intubation for airway protection even with adequate ventilation.',
        citation: [1, 2, 3],
        calculatorLinks: [
            { id: 'gbs-fvc-nif', label: 'FVC/NIF Calculator' },
            { id: 'gbs-egris', label: 'EGRIS Score' },
        ],
        next: 'gbs-egris',
        summary: 'The 20/30/40 rule: FVC <20 mL/kg, NIF weaker than -30, FVC decline >30% = prepare for intubation',
        safetyLevel: 'critical',
    },
    {
        id: 'gbs-egris',
        type: 'info',
        module: 2,
        title: 'EGRIS - Erasmus GBS Respiratory Insufficiency Score',
        body: '[EGRIS Calculator](#/calculator/gbs-egris) - predict mechanical ventilation requirement.\n\n**EGRIS predicts need for mechanical ventilation in first week:**\n\n| Factor | Points |\n|--------|--------|\n| Days between weakness onset and admission | |\n| - >7 days | 0 |\n| - 4-7 days | 1 |\n| - <4 days | 2 |\n| Facial and/or bulbar weakness at admission | |\n| - Absent | 0 |\n| - Present | 1 |\n| MRC sum score at admission | |\n| - 60-51 | 0 |\n| - 50-41 | 1 |\n| - 40-31 | 2 |\n| - 30-21 | 3 |\n| - <=20 | 4 |\n\n**Risk stratification:**\n- Score 0-2: Low risk (4%)\n- Score 3-4: Intermediate risk (24%)\n- Score 5-7: High risk (65%)\n\n**MRC sum score:** Test 6 muscle groups bilaterally (shoulder abduction, elbow flexion, wrist extension, hip flexion, knee extension, ankle dorsiflexion). Score each 0-5. Max = 60.',
        citation: [2, 3],
        calculatorLinks: [{ id: 'gbs-egris', label: 'EGRIS Score' }],
        next: 'gbs-resp-decision',
        summary: 'EGRIS score 5-7 = 65% chance of needing mechanical ventilation in first week',
        skippable: true,
    },
    {
        id: 'gbs-resp-decision',
        type: 'question',
        module: 2,
        title: 'Respiratory Status Assessment',
        body: 'Evaluate current respiratory status and trajectory.\n\n**Indications for elective intubation:**\n- FVC <20 mL/kg or <1L\n- NIF weaker than -30 cmH2O\n- Rapid decline (>30% in 24h)\n- Unable to protect airway (bulbar weakness)\n- Hypoxia or hypercapnia\n\n**Early intubation is safer than emergent intubation.**\n\nPatients may appear comfortable but have critically low reserve.',
        citation: [1, 2],
        calculatorLinks: [{ id: 'gbs-fvc-nif', label: 'FVC/NIF Calculator' }],
        options: [
            {
                label: 'Respiratory parameters stable',
                description: 'FVC >20 mL/kg, NIF stronger than -30, no rapid decline',
                next: 'gbs-workup',
            },
            {
                label: 'Concerning respiratory trend',
                description: 'Declining FVC/NIF, approaching thresholds',
                next: 'gbs-intubation',
                urgency: 'urgent',
            },
            {
                label: 'Meets intubation criteria',
                description: 'FVC <20 mL/kg, NIF weaker than -30, or airway compromise',
                next: 'gbs-intubation',
                urgency: 'critical',
            },
        ],
        summary: 'Early elective intubation is safer than emergent — patients may appear comfortable with critically low reserve',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 3: DIAGNOSTIC WORKUP
    // =====================================================================
    {
        id: 'gbs-workup',
        type: 'info',
        module: 3,
        title: 'Diagnostic Workup',
        body: '[LP Interpretation Guide](#/calculator/gbs-lp-interp) - albuminocytologic dissociation analysis.\n\n**Lumbar puncture findings:**\n- **Albuminocytologic dissociation** = elevated protein + normal WBC count\n- Protein may be NORMAL in first week (repeat if high suspicion)\n- WBC typically <10 cells/microL\n- **WBC >50 cells/microL:** Consider HIV, Lyme, CMV, sarcoidosis\n\n**EMG/Nerve Conduction Studies:**\n- May be normal in first 1-2 weeks\n- Demyelinating pattern (AIDP): prolonged distal latencies, conduction block, prolonged F-waves\n- Axonal pattern (AMAN/AMSAN): reduced amplitudes, normal latencies\n\n**Anti-ganglioside antibodies:**\n- GM1: AMAN\n- GQ1b: Miller Fisher syndrome (>90% positive)\n- GD1a: AMAN, pharyngeal-cervical-brachial variant\n- Note: Results take days - do NOT delay treatment\n\n**Laboratory workup:**\n- CBC, BMP (electrolytes), LFTs, ESR/CRP\n- HIV (especially if WBC elevated in CSF)\n- Campylobacter serology\n- Consider: Lyme, CMV, EBV titers',
        citation: [1, 2, 4],
        calculatorLinks: [{ id: 'gbs-lp-interp', label: 'LP Interpretation' }],
        next: 'gbs-imaging',
        summary: 'LP: albuminocytologic dissociation (elevated protein, normal WBC) — may be normal in first week',
    },
    {
        id: 'gbs-imaging',
        type: 'info',
        module: 3,
        title: 'Imaging & Additional Studies',
        body: '**MRI spine with contrast:**\n- Primary role: **rule out compressive lesion** (cord compression, epidural abscess)\n- GBS findings: nerve root enhancement (especially cauda equina)\n- Enhancement may be absent early\n- Not required for diagnosis but helps exclude mimics\n\n**GBS mimics to consider:**\n- Transverse myelitis (sensory level, MRI cord signal)\n- Cord compression (back pain, sensory level)\n- Myasthenia gravis (fatigable weakness, ocular predominant)\n- Botulism (descending paralysis, pupil involvement, recent food exposure)\n- Tick paralysis (find the tick!)\n- Critical illness polyneuropathy (ICU setting)\n- Hypokalemia, hypophosphatemia\n- Porphyria (abdominal pain, psychiatric symptoms)\n\n**Electrocardiogram:**\n- Baseline for autonomic dysfunction\n- Monitor for arrhythmias\n\n**Pulmonary function tests:**\n- Bedside FVC and NIF (already covered)\n- Formal PFTs not required in acute setting',
        citation: [1, 2],
        next: 'gbs-treatment-decision',
        summary: 'MRI spine to rule out compressive lesion — tick paralysis, botulism, MG are key mimics',
        skippable: true,
    },
    // =====================================================================
    // MODULE 4: TREATMENT - IVIG vs PLASMAPHERESIS
    // =====================================================================
    {
        id: 'gbs-treatment-decision',
        type: 'info',
        module: 4,
        title: 'Treatment Principles',
        body: '[IVIG vs PLEX Comparison](#/calculator/gbs-ivig-plex) - treatment selection guide.\n\n**KEY PRINCIPLE: START TREATMENT EARLY**\n- Most effective within **2 weeks of symptom onset**\n- Benefit diminishes after 4 weeks\n- Do NOT wait for confirmatory testing\n\n**Treatment is indicated for:**\n- Unable to walk independently\n- Rapidly progressive weakness\n- Respiratory compromise\n- Significant bulbar dysfunction\n\n**Two equivalent options:**\n1. **IVIG** (Intravenous Immunoglobulin)\n2. **Plasmapheresis (PLEX)**\n\nBoth are equally effective. Choice depends on availability, patient factors, and contraindications.\n\n**CRITICAL: Do NOT combine IVIG + PLEX**\n- No additional benefit\n- PLEX may remove IVIG, reducing efficacy\n- Choose one or the other\n\n**Corticosteroids: NOT effective for GBS**\n- Multiple RCTs show no benefit\n- May delay recovery\n- Do NOT use',
        citation: [1, 2, 5],
        calculatorLinks: [{ id: 'gbs-ivig-plex', label: 'IVIG vs PLEX' }],
        next: 'gbs-treatment-choice',
        summary: 'Start IVIG or plasmapheresis within 2 weeks of onset — do NOT combine both, do NOT use steroids',
        safetyLevel: 'critical',
    },
    {
        id: 'gbs-treatment-choice',
        type: 'question',
        module: 4,
        title: 'Treatment Selection',
        body: 'Select immunomodulatory therapy based on patient factors and resource availability.\n\n**IVIG advantages:**\n- Easier to administer (peripheral IV)\n- No central line required\n- More widely available\n- Can be given at smaller hospitals\n\n**PLEX advantages:**\n- May work faster in severe cases\n- No infusion reactions\n- May be preferred if IVIG contraindicated\n\n**Neither is clearly superior** - base decision on practical factors.',
        citation: [2, 5],
        options: [
            {
                label: 'IVIG (Intravenous Immunoglobulin)',
                description: 'Easier access, no central line, more available',
                next: 'gbs-ivig',
            },
            {
                label: 'Plasmapheresis (PLEX)',
                description: 'May be faster in severe cases, requires central line',
                next: 'gbs-plex',
            },
            {
                label: 'Mild GBS - supportive care only',
                description: 'Ambulatory, minimal weakness, stable respiratory function',
                next: 'gbs-supportive',
            },
        ],
        summary: 'IVIG easier (peripheral IV, more available); PLEX may be faster in severe cases — equal efficacy',
    },
    {
        id: 'gbs-ivig',
        type: 'info',
        module: 4,
        title: 'IVIG Protocol',
        body: '**IVIG Dosing:**\n- **0.4 g/kg/day x 5 days** (total 2 g/kg)\n- Alternative: 1 g/kg/day x 2 days (same total dose)\n\n**Administration:**\n- Peripheral IV access adequate\n- Infuse slowly initially, increase rate as tolerated\n- Premedication with acetaminophen and diphenhydramine for infusion reactions\n\n**Contraindications:**\n- **IgA deficiency** (risk of anaphylaxis) - check IgA level if possible\n- Recent MI or stroke (risk of thrombosis)\n- Severe renal impairment (sucrose-containing formulations)\n\n**Common side effects:**\n- Headache (most common)\n- Fever, chills, myalgias\n- Nausea\n\n**Serious side effects:**\n- Aseptic meningitis (severe headache, meningismus)\n- Acute renal failure (especially with sucrose-containing products)\n- Thrombosis (MI, stroke, DVT, PE)\n- Hemolytic anemia\n- TRALI (transfusion-related acute lung injury)',
        citation: [2, 5],
        treatment: {
            firstLine: {
                drug: 'IVIG (Intravenous Immunoglobulin)',
                dose: '0.4 g/kg/day',
                route: 'IV infusion',
                frequency: 'Daily',
                duration: '5 days (total 2 g/kg)',
                notes: 'Check IgA level. Premedicate with acetaminophen and diphenhydramine. Alternative: 1 g/kg/day x 2 days.',
            },
            monitoring: 'Monitor for infusion reactions, headache, renal function. Watch for thrombosis in at-risk patients.',
        },
        calculatorLinks: [{ id: 'gbs-ivig-plex', label: 'IVIG vs PLEX' }],
        next: 'gbs-treatment-response',
        summary: 'IVIG 0.4 g/kg/day x 5 days — check IgA level first (anaphylaxis risk if IgA deficient)',
        safetyLevel: 'warning',
    },
    {
        id: 'gbs-plex',
        type: 'info',
        module: 4,
        title: 'Plasmapheresis (PLEX) Protocol',
        body: '**Plasmapheresis Dosing:**\n- **5 exchanges over 1-2 weeks**\n- Each exchange: 1-1.5 plasma volumes\n- Typically every other day\n\n**Requirements:**\n- Central venous access (dialysis catheter)\n- Specialized equipment and trained personnel\n- Usually requires transfer to tertiary center\n\n**Advantages over IVIG:**\n- May have faster onset of action\n- No infusion reaction risk\n- Some evidence suggests better outcomes in severe/rapidly progressive cases\n\n**Disadvantages:**\n- Requires central line (infection, bleeding risk)\n- More resource-intensive\n- Less widely available\n- Hemodynamic shifts during procedure\n\n**Complications:**\n- Hypotension during exchanges\n- Hypocalcemia (citrate anticoagulant)\n- Coagulopathy (removal of clotting factors)\n- Line-related complications (infection, thrombosis)\n- Autonomic instability may be exacerbated',
        citation: [2, 5],
        treatment: {
            firstLine: {
                drug: 'Plasmapheresis (PLEX)',
                dose: '1-1.5 plasma volumes per exchange',
                route: 'Central venous access',
                frequency: 'Every other day',
                duration: '5 exchanges over 1-2 weeks',
                notes: 'Requires central line and specialized equipment. Consider transfer to tertiary center.',
            },
            monitoring: 'Monitor hemodynamics during exchanges. Check calcium, coagulation studies. Watch for line complications.',
        },
        calculatorLinks: [{ id: 'gbs-ivig-plex', label: 'IVIG vs PLEX' }],
        next: 'gbs-treatment-response',
        summary: 'Plasmapheresis: 5 exchanges over 1-2 weeks — requires central line and specialized equipment',
        skippable: true,
    },
    {
        id: 'gbs-treatment-response',
        type: 'info',
        module: 4,
        title: 'Treatment Response & Relapse',
        body: '**Expected response:**\n- Clinical improvement typically begins within 1-2 weeks of completing treatment\n- Maximum improvement may take 6-12 months\n- 80% walk independently at 6 months\n\n**Treatment-related fluctuation (TRF):**\n- Worsening after initial improvement, occurring within 8 weeks\n- Occurs in ~10% of patients\n- May repeat same treatment (IVIG or PLEX)\n\n**No response to initial treatment:**\n- Consider switching modality (IVIG to PLEX or vice versa)\n- Re-evaluate diagnosis (is this really GBS?)\n- Consider CIDP if progression >8 weeks\n\n**Relapse (after 8 weeks):**\n- Consider CIDP (chronic inflammatory demyelinating polyneuropathy)\n- Requires different treatment approach (maintenance immunotherapy)\n\n**Do NOT give steroids** - evidence shows they are ineffective and may delay recovery.',
        citation: [1, 2, 5],
        next: 'gbs-supportive',
        summary: '10% have treatment-related fluctuation — may repeat same treatment, never use steroids',
        skippable: true,
    },
    // =====================================================================
    // MODULE 5: SUPPORTIVE CARE
    // =====================================================================
    {
        id: 'gbs-supportive',
        type: 'info',
        module: 5,
        title: 'Supportive Care',
        body: '**DVT Prophylaxis - HIGH PRIORITY:**\n- GBS patients are immobile and high risk for VTE\n- Pharmacologic prophylaxis: enoxaparin or heparin\n- Mechanical: SCDs, graduated compression stockings\n- Continue until ambulatory\n\n**Pain Management:**\n- Neuropathic pain is common and often severe\n- [Gabapentin](#/drug/gabapentin/neuropathic) 300-900 mg TID\n- [Pregabalin](#/drug/pregabalin/neuropathic) 75-150 mg BID\n- NSAIDs and acetaminophen for musculoskeletal pain\n- Opioids may be needed but use cautiously (respiratory depression)\n\n**Autonomic Dysfunction Monitoring:**\n- Blood pressure lability (hypertension AND hypotension)\n- Cardiac arrhythmias (continuous telemetry)\n- Urinary retention (may need Foley catheter)\n- Constipation/ileus\n- Treatment: supportive, short-acting agents for BP control\n\n**Early Rehabilitation:**\n- PT/OT consultation on admission\n- Passive range of motion to prevent contractures\n- Position changes to prevent pressure ulcers\n- Early mobilization when stable',
        citation: [1, 2],
        next: 'gbs-nutrition-psych',
        summary: 'DVT prophylaxis is HIGH PRIORITY — immobile patients at major VTE risk. Gabapentin for pain',
    },
    {
        id: 'gbs-nutrition-psych',
        type: 'info',
        module: 5,
        title: 'Nutrition & Psychological Support',
        body: '**Nutritional Support:**\n- Assess swallowing before oral intake (bulbar involvement)\n- Speech therapy evaluation for dysphagia\n- NG tube if unable to swallow safely\n- Early consideration of PEG if prolonged intubation expected\n- Adequate calories for healing and rehabilitation\n\n**Psychological Support - CRITICAL:**\n- GBS causes sudden, profound paralysis in previously healthy individuals\n- Patients are often fully alert and aware of their condition\n- Anxiety and depression are extremely common\n- Fear of permanent disability\n- Explain prognosis honestly: most patients recover significantly\n\n**Communication strategies for intubated patients:**\n- Letter boards, eye-gaze devices\n- Yes/no questions with eye blinks or movements\n- Regular orientation and reassurance\n- Family involvement in care\n\n**Screen for:**\n- Depression\n- Anxiety/panic\n- ICU delirium\n- PTSD (in recovery phase)',
        citation: [1, 2],
        next: 'gbs-autonomic',
        summary: 'Assess swallowing before PO, psychological support critical — patients are fully aware of paralysis',
        skippable: true,
    },
    {
        id: 'gbs-autonomic',
        type: 'info',
        module: 5,
        title: 'Autonomic Dysfunction Management',
        body: '**Autonomic involvement occurs in 70% of GBS patients.**\n\n**Cardiovascular:**\n- Continuous telemetry monitoring\n- Sinus tachycardia (most common)\n- Bradycardia, asystole (may be fatal)\n- Blood pressure lability: alternating hypertension and hypotension\n- Avoid triggers: suctioning, turning, bladder distension\n\n**Management principles:**\n- Use short-acting agents for BP control\n- Avoid long-acting antihypertensives (risk of rebound hypotension)\n- Caution with beta-blockers (may unmask bradycardia)\n- Volume resuscitation for hypotension\n- Atropine and transcutaneous pacing available for bradycardia\n\n**GI dysfunction:**\n- Ileus, constipation common\n- Bowel regimen from admission\n- May need prokinetic agents\n\n**GU dysfunction:**\n- Urinary retention common\n- Check post-void residual\n- Foley catheter if significant retention\n\n**Other:**\n- Excessive sweating\n- Pupillary abnormalities\n- Syndrome of inappropriate ADH (SIADH)',
        citation: [1, 2],
        next: 'gbs-intubation',
        summary: 'Autonomic dysfunction in 70% — bradycardia can be fatal, use short-acting BP agents only',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 6: INTUBATION CONSIDERATIONS
    // =====================================================================
    {
        id: 'gbs-intubation',
        type: 'info',
        module: 6,
        title: 'Intubation Considerations',
        body: '[GBS Intubation Checklist](#/calculator/gbs-intubation) - preparation and medication selection.\n\n**CRITICAL: Avoid succinylcholine**\n- Denervated muscle releases excessive potassium\n- Risk of life-threatening hyperkalemia\n- Use [rocuronium](#/drug/rocuronium/RSI) for RSI\n\n**Intubation timing:**\n- Early elective intubation is safer than emergent\n- Do not wait until respiratory failure\n- Criteria: FVC <20 mL/kg, NIF weaker than -30, bulbar compromise\n\n**Anticipate complications:**\n- Autonomic instability during laryngoscopy\n- Bradycardia, hypotension, or hypertension\n- Have atropine, vasopressors ready\n\n**RSI considerations:**\n- Rocuronium 1.2 mg/kg (avoid succinylcholine)\n- Standard induction agents (ketamine, propofol, etomidate)\n- Prepare for prolonged ventilator course\n\n**Post-intubation:**\n- Expect prolonged mechanical ventilation (weeks to months)\n- Early tracheostomy consideration if not improving\n- Sedation may be minimal (patients want to communicate)\n- Lung-protective ventilation strategies',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Rocuronium',
                dose: '1.2 mg/kg IV',
                route: 'IV push',
                frequency: 'Single dose for RSI',
                duration: 'RSI paralysis',
                notes: 'AVOID succinylcholine - risk of hyperkalemia from denervated muscle.',
            },
            monitoring: 'Anticipate autonomic instability. Have atropine and vasopressors ready. Continuous monitoring.',
        },
        calculatorLinks: [{ id: 'gbs-intubation', label: 'Intubation Checklist' }],
        next: 'gbs-vent-management',
        summary: 'AVOID succinylcholine (lethal hyperkalemia from denervated muscle) — use rocuronium 1.2 mg/kg',
        safetyLevel: 'critical',
    },
    {
        id: 'gbs-vent-management',
        type: 'info',
        module: 6,
        title: 'Ventilator Management',
        body: '**Ventilator settings:**\n- Lung-protective ventilation\n- Tidal volume 6-8 mL/kg IBW\n- PEEP as needed for oxygenation\n- GBS is primarily a ventilatory failure (muscle weakness), not oxygenation failure\n\n**Weaning considerations:**\n- May require weeks to months of ventilator support\n- Daily SBT when clinically improving\n- Track NIF and vital capacity recovery\n- Weaning success correlates with clinical neurological recovery\n\n**Tracheostomy:**\n- Consider early if no improvement expected within 2 weeks\n- Typically performed at 2-3 weeks if still ventilator-dependent\n- Facilitates weaning, comfort, oral care\n- Does not affect overall outcome\n\n**Sedation:**\n- Minimize sedation when possible\n- Patients often cognitively intact and aware\n- Communicate with patient, explain procedures\n- Consider pain control needs (neuropathic pain persists)\n\n**Complications to monitor:**\n- VAP (ventilator-associated pneumonia)\n- Atelectasis\n- Critical illness polyneuropathy/myopathy superimposed\n- DVT/PE despite prophylaxis',
        citation: [1, 2],
        next: 'gbs-disposition',
        summary: 'GBS is ventilatory failure (muscle weakness), not oxygenation failure — may need weeks on vent',
        skippable: true,
    },
    // =====================================================================
    // MODULE 7: DISPOSITION
    // =====================================================================
    {
        id: 'gbs-disposition',
        type: 'info',
        module: 7,
        title: 'Disposition',
        body: '**ALL suspected GBS patients require admission.**\n\n**ICU admission criteria (most GBS patients):**\n- Any respiratory compromise or declining FVC/NIF\n- Bulbar symptoms\n- Autonomic dysfunction\n- Rapidly progressive weakness\n- EGRIS score >=3\n\n**Step-down/floor admission:**\n- Stable, mild weakness\n- Normal respiratory parameters after 24-48h observation\n- No bulbar or autonomic involvement\n- Still requires Q4-6h FVC/NIF monitoring\n\n**Discharge from ED:**\n- Rarely appropriate\n- Only if very mild symptoms AND:\n  - Normal respiratory function\n  - No progression over observation period\n  - Reliable follow-up within 24-48h\n  - Clear return precautions given\n  - Low threshold to return for any worsening\n\n**Specialist consultation:**\n- Neurology (all cases)\n- Pulmonology/critical care if respiratory involvement\n- PM&R for rehabilitation planning',
        citation: [1, 2],
        next: 'gbs-prognosis',
        summary: 'ALL suspected GBS patients require admission — most need ICU for respiratory and autonomic monitoring',
    },
    // =====================================================================
    // MODULE 8: PROGNOSIS
    // =====================================================================
    {
        id: 'gbs-prognosis',
        type: 'result',
        module: 8,
        title: 'Prognosis',
        body: '**Overall prognosis is favorable:**\n- 80% walk independently at 6 months\n- Full recovery in 60-70%\n- 5-10% have persistent significant disability\n- 3-5% mortality\n\n**Causes of death:**\n- Respiratory failure\n- Autonomic dysfunction (arrhythmias, cardiac arrest)\n- Pulmonary embolism\n- Sepsis\n\n**Poor prognostic factors:**\n- Older age (>60 years)\n- Rapid progression to nadir (<7 days)\n- Need for mechanical ventilation\n- Axonal variants (AMAN, AMSAN)\n- Preceding Campylobacter infection\n- Low MRC sum score at nadir (<40)\n- Delayed treatment initiation\n\n**Recovery timeline:**\n- Plateau phase: days to weeks\n- Recovery phase: months to years\n- Maximum recovery typically by 12-18 months\n- Fatigue and mild weakness may persist\n\n**Long-term issues:**\n- Chronic fatigue (60-80%)\n- Residual weakness (20%)\n- Sensory symptoms (30%)\n- Pain syndromes\n- Anxiety and depression',
        recommendation: 'Admit all suspected GBS patients. ICU for respiratory/bulbar/autonomic involvement. Start IVIG or PLEX within 2 weeks of symptom onset. Monitor FVC/NIF Q4-6h. Avoid succinylcholine if intubation needed. Most patients recover - communicate prognosis optimistically but honestly.',
        confidence: 'recommended',
        citation: [1, 2, 3],
        summary: '80% walk independently at 6 months — poor prognosis if age >60, rapid progression, axonal variant',
    },
];
export const GUILLAIN_BARRE_NODE_COUNT = GUILLAIN_BARRE_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const GUILLAIN_BARRE_MODULE_LABELS = [
    'Recognition',
    'Respiratory Monitoring',
    'Diagnostic Workup',
    'Treatment',
    'Supportive Care',
    'Intubation',
    'Disposition',
    'Prognosis',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const GUILLAIN_BARRE_CITATIONS = [
    { num: 1, text: 'Wijdicks EFM, et al. Guillain-Barre Syndrome. Mayo Clin Proc. 2017;92(3):467-479.' },
    { num: 2, text: 'Leonhard SE, et al. Diagnosis and Management of Guillain-Barre Syndrome in Ten Steps. Nat Rev Neurol. 2019;15(11):671-683.' },
    { num: 3, text: 'van den Berg B, et al. Guillain-Barre Syndrome: Pathogenesis, Diagnosis, Treatment and Prognosis. Nat Rev Neurol. 2014;10(8):469-482.' },
    { num: 4, text: 'Fokke C, et al. Diagnosis of Guillain-Barre Syndrome and Validation of Brighton Criteria. Brain. 2014;137(Pt 1):33-43.' },
    { num: 5, text: 'Hughes RA, et al. Immunotherapy for Guillain-Barre Syndrome: A Systematic Review. Cochrane Database Syst Rev. 2014;(9):CD002063.' },
];
