// MedKitt — Myasthenia Gravis Management
// Recognition → Crisis → Cholinergic vs Myasthenic → Diagnostics → Drug Triggers → Treatment → Airway → Thymectomy → Disposition.
// 9 modules: Recognition → Myasthenic Crisis → Cholinergic Crisis → Diagnostics → Drug Triggers → Acute Treatment → Airway → Thymectomy → Disposition
// 27 nodes total.
export const MYASTHENIA_GRAVIS_CRITICAL_ACTIONS = [
    { text: 'FVC <15-20 mL/kg or NIF weaker than -20 to -25 → intubate', nodeId: 'mg-airway' },
    { text: 'STOP all anticholinesterase if uncertain myasthenic vs cholinergic crisis', nodeId: 'mg-uncertain-crisis' },
    { text: 'Atropine 0.5-1 mg IV for cholinergic crisis (SLUDGE/BBB symptoms)', nodeId: 'mg-cholinergic-treatment' },
    { text: 'IVIG or plasmapheresis for crisis - start immediately, do NOT delay', nodeId: 'mg-ivig-plex' },
    { text: 'Steroids can cause initial worsening - give with IVIG/PLEX "cover" in moderate-severe disease', nodeId: 'mg-steroids' },
    { text: 'Rocuronium 0.3-0.5 mg/kg (1/3 normal dose) if NMB needed - MG patients very sensitive', nodeId: 'mg-airway' },
    { text: 'Ice pack test: >2mm improvement in ptosis = 80% sensitive for ocular MG', nodeId: 'mg-diagnostics' },
    { text: 'Avoid: aminoglycosides, FQs, beta-blockers, magnesium IV - all can precipitate crisis', nodeId: 'mg-triggers' },
];
export const MYASTHENIA_GRAVIS_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'mg-start',
        type: 'info',
        module: 1,
        title: 'Myasthenia Gravis',
        body: '[MG Quick Reference](#/info/mg-summary) — recognition, crisis management, and treatment pathway.\n\n**Myasthenia gravis (MG)** is an autoimmune disorder affecting the neuromuscular junction, caused by antibodies against acetylcholine receptors (AChR) or related proteins.\n\n**Hallmark feature:** Fatigable weakness — worse with use, better with rest.\n\n**Key patterns:**\n• Ocular symptoms (ptosis, diplopia) present in **85% at onset**\n• Bulbar involvement: dysarthria, dysphagia, facial weakness\n• Limb weakness: proximal > distal\n• Respiratory muscles can be involved — this is the emergency\n• **Diurnal variation** — symptoms worsen throughout the day\n\n**Critical distinction:** MG weakness fluctuates and improves with rest. GBS weakness is progressive and does not fluctuate.',
        images: [{ src: 'images/myasthenia-gravis/mg-ptosis-diplopia.jpg', alt: 'Patient with myasthenia gravis showing bilateral ptosis and strabismus attempting to look upward — classic fatigable ocular muscle weakness', caption: 'Myasthenic crisis — bilateral ptosis and diplopia from fatigable ocular muscle weakness. Present in 85% at onset. Respiratory compromise (FVC <20 mL/kg or NIF worse than -30 cmH₂O) defines crisis requiring intubation. (CC BY-SA 3.0, James Heilman MD)' }],
        citation: [1, 4],
        next: 'mg-mgfa-class',
    },
    {
        id: 'mg-mgfa-class',
        type: 'info',
        module: 1,
        title: 'MGFA Classification',
        body: '[MGFA Classification Tool](#/calc/mg-mgfa) — standardized severity grading.\n\n**Myasthenia Gravis Foundation of America (MGFA) Classification:**\n\n**Class I:** Ocular MG only\n• Ptosis, diplopia\n• No other muscle involvement\n\n**Class II:** Mild generalized weakness\n• IIa: Predominantly limb/axial\n• IIb: Predominantly bulbar/respiratory\n\n**Class III:** Moderate generalized weakness\n• IIIa: Predominantly limb/axial\n• IIIb: Predominantly bulbar/respiratory\n\n**Class IV:** Severe generalized weakness\n• IVa: Predominantly limb/axial\n• IVb: Predominantly bulbar/respiratory\n\n**Class V:** Intubation required\n• With or without mechanical ventilation\n• Defines **myasthenic crisis**\n\nHigher classes correlate with crisis risk and need for aggressive immunotherapy.',
        citation: [1],
        calculatorLinks: [{ id: 'mg-mgfa', label: 'MGFA Classification' }],
        next: 'mg-is-crisis',
    },
    {
        id: 'mg-is-crisis',
        type: 'question',
        module: 1,
        title: 'Is This Crisis?',
        body: 'Assess for signs of impending or active respiratory failure.\n\n**Red flags for crisis:**\n• Dyspnea at rest or with minimal exertion\n• Orthopnea, inability to lie flat\n• Use of accessory muscles\n• Weak cough, difficulty clearing secretions\n• Staccato speech (gasping between words)\n• Severe bulbar weakness (aspiration risk)\n\n**Objective measures:**\n• FVC <15-20 mL/kg\n• NIF weaker than -20 to -25 cmH2O\n• SpO2 declining despite supplemental O2\n\n[FVC/NIF Monitoring Tool](#/calc/mg-fvc-nif) — respiratory parameter tracking.',
        citation: [2],
        calculatorLinks: [{ id: 'mg-fvc-nif', label: 'FVC/NIF Monitor' }],
        options: [
            {
                label: 'Respiratory compromise — crisis',
                description: 'FVC <20 mL/kg, NIF weaker than -25, or respiratory distress',
                next: 'mg-crisis',
                urgency: 'critical',
            },
            {
                label: 'Worsening but stable respiratory status',
                description: 'Symptomatic but FVC >20 mL/kg, NIF stronger than -25',
                next: 'mg-crisis-vs-cholinergic',
                urgency: 'urgent',
            },
            {
                label: 'Stable MG — no respiratory concerns',
                description: 'Ocular symptoms, mild weakness, or known stable disease',
                next: 'mg-diagnostics',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: MYASTHENIC CRISIS
    // =====================================================================
    {
        id: 'mg-crisis',
        type: 'info',
        module: 2,
        title: 'Myasthenic Crisis',
        body: '**Myasthenic crisis** = respiratory failure requiring mechanical ventilation in a patient with MG.\n\n**Epidemiology:**\n• **15-20%** of MG patients will experience crisis\n• Modern mortality: **4-8%** (down from 40% historically)\n• Mean ICU stay: 2 weeks\n\n**Common triggers:**\n• Infection (most common — 40%)\n• Surgery (especially thymectomy)\n• Medication changes (starting/stopping immunotherapy)\n• Non-compliance with pyridostigmine or immunosuppressants\n• Pregnancy/postpartum\n• Offending medications (see Drug Triggers module)\n\n**Key differences from GBS:**\n• MG: fluctuating weakness, history of MG, may respond to pyridostigmine\n• GBS: progressive ascending weakness, sensory symptoms, no fluctuation\n\n**Immediate actions:**\n• Airway assessment — intubation threshold is LOW\n• Serial FVC/NIF measurements q2-4h\n• ICU admission\n• Identify and treat trigger',
        citation: [2, 3],
        next: 'mg-crisis-vs-cholinergic',
    },
    // =====================================================================
    // MODULE 3: CHOLINERGIC CRISIS — CRITICAL DIFFERENTIATION
    // =====================================================================
    {
        id: 'mg-crisis-vs-cholinergic',
        type: 'question',
        module: 3,
        title: 'Myasthenic or Cholinergic Crisis?',
        body: '[Crisis Differentiator Tool](#/calc/mg-crisis) — side-by-side comparison.\n\n**This distinction is CRITICAL** — treatment is opposite.\n\n**Myasthenic crisis:** Worsening MG from disease\n• DRY — no excessive secretions\n• Mydriasis (dilated pupils)\n• No fasciculations\n• Weakness improves with more anticholinesterase\n\n**Cholinergic crisis:** EXCESS pyridostigmine (overdose)\n• WET — **SLUDGE/BBB** symptoms\n• Miosis (constricted pupils)\n• Fasciculations present\n• Weakness WORSENS with more anticholinesterase\n\n**SLUDGE/BBB:**\n**S**alivation, **L**acrimation, **U**rination, **D**efecation, **GI** cramping, **E**mesis\n**B**radycardia, **B**ronchorrhea, **B**ronchospasm\n\n**If in doubt:** STOP all anticholinesterase medications, support airway, give atropine for secretions.',
        citation: [2, 3],
        calculatorLinks: [{ id: 'mg-crisis', label: 'Crisis Differentiator' }],
        options: [
            {
                label: 'Myasthenic crisis — DRY, no SLUDGE',
                description: 'Weakness without cholinergic signs',
                next: 'mg-treatment-acute',
                urgency: 'critical',
            },
            {
                label: 'Cholinergic crisis — WET, SLUDGE symptoms',
                description: 'Excessive secretions, miosis, fasciculations',
                next: 'mg-cholinergic-treatment',
                urgency: 'critical',
            },
            {
                label: 'Uncertain — cannot differentiate',
                description: 'Mixed features or unclear presentation',
                next: 'mg-uncertain-crisis',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'mg-cholinergic-treatment',
        type: 'info',
        module: 3,
        title: 'Cholinergic Crisis Management',
        body: '**Cholinergic crisis** results from excessive acetylcholinesterase inhibitor (pyridostigmine overdose).\n\n**Immediate management:**\n\n1. **STOP all anticholinesterase medications** — pyridostigmine, neostigmine\n\n2. **Airway management:**\n• Suction copious secretions\n• Intubate early if significant bronchorrhea/bronchospasm\n• Have atropine ready before intubation\n\n3. **Atropine** for muscarinic effects:\n• 0.5-1 mg IV, repeat q5-10min as needed\n• Targets secretions, bradycardia, bronchospasm\n• Does NOT reverse nicotinic effects (weakness, fasciculations)\n\n4. **Supportive care:**\n• IV fluids\n• Monitor for aspiration\n• Cardiac monitoring (bradycardia can be severe)\n\n**Recovery:**\n• Effects resolve as pyridostigmine metabolizes (half-life 1-2 hours)\n• Can carefully restart pyridostigmine at lower dose after resolution\n• Re-evaluate total daily dose — maximum typically 480-600 mg/day\n\n**Edrophonium test** is rarely done now — risk of worsening cholinergic crisis.',
        citation: [2, 3],
        treatment: {
            firstLine: {
                drug: 'Atropine',
                dose: '0.5-1 mg IV',
                route: 'IV',
                frequency: 'Repeat q5-10min as needed',
                duration: 'Until secretions controlled',
                notes: 'For muscarinic effects only (secretions, bradycardia, bronchospasm). Does NOT reverse weakness.',
            },
            monitoring: 'STOP all anticholinesterase medications. Airway management priority. Cardiac monitoring for bradycardia.',
        },
        next: 'mg-airway',
    },
    {
        id: 'mg-uncertain-crisis',
        type: 'info',
        module: 3,
        title: 'Uncertain Crisis Type — Safe Approach',
        body: '**When you cannot distinguish myasthenic from cholinergic crisis:**\n\n**Step 1: STOP all anticholinesterase medications**\n• This is safe for both crisis types\n• If cholinergic: patient will improve as drug clears\n• If myasthenic: won\'t worsen acutely (pyridostigmine is symptomatic, not disease-modifying)\n\n**Step 2: Support the airway**\n• Low threshold for intubation\n• Suction secretions\n• Atropine 0.5-1 mg IV if significant secretions\n\n**Step 3: Observe**\n• Reassess in 30-60 minutes\n• Cholinergic: secretions should decrease, fasciculations stop\n• Myasthenic: weakness persists or worsens without cholinergic signs\n\n**Step 4: Treat underlying crisis type**\n• Once differentiated, proceed to appropriate treatment pathway\n\n**Do NOT give more pyridostigmine** until you are confident this is myasthenic crisis.\n\n**Historical note:** Edrophonium (Tensilon) test was used to differentiate — brief-acting anticholinesterase. Improvement = myasthenic, worsening = cholinergic. Rarely used now due to risk and availability.',
        citation: [2, 3],
        treatment: {
            firstLine: {
                drug: 'Hold pyridostigmine',
                dose: 'Stop all anticholinesterase medications',
                route: 'N/A',
                frequency: 'Until diagnosis clear',
                duration: 'Minimum 30-60 minutes observation',
                notes: 'Safe for both crisis types. Do not restart until diagnosis is certain.',
            },
            alternative: {
                drug: 'Atropine',
                dose: '0.5-1 mg IV',
                route: 'IV',
                frequency: 'As needed for secretions',
                duration: 'PRN',
                notes: 'For excessive secretions regardless of crisis type.',
            },
            monitoring: 'Reassess in 30-60 min. Watch for resolution of cholinergic signs vs persistent weakness.',
        },
        next: 'mg-airway',
    },
    // =====================================================================
    // MODULE 4: DIAGNOSTIC WORKUP
    // =====================================================================
    {
        id: 'mg-diagnostics',
        type: 'info',
        module: 4,
        title: 'Diagnostic Workup',
        body: '**Bedside tests:**\n\n[Ice Pack Test](#/calc/mg-ice-test) — simple, non-invasive\n• Place ice on closed eyelid for 2 minutes\n• >2mm improvement in ptosis = positive\n• **80% sensitive** for ocular MG\n• Works because cold improves neuromuscular transmission\n\n**Antibody testing:**\n• **AChR antibodies:** 85% sensitive in generalized MG, 50% in ocular MG\n• **Anti-MuSK:** 5-10% of "seronegative" MG\n• **Anti-LRP4:** Rare, newer marker\n• Seronegative MG exists — 5-10% have no detectable antibodies\n\n**Electrodiagnostics:**\n• **Repetitive nerve stimulation (RNS):** >10% decrement is positive\n• **Single-fiber EMG:** Most sensitive test (92-99%), but requires expertise\n\n**Imaging:**\n• **CT chest:** Thymoma in 10-15%, thymic hyperplasia in 65%\n• All newly diagnosed MG patients need chest imaging\n\n**Associated conditions:**\n• Autoimmune thyroid disease — check TFTs\n• Other autoimmune disorders (lupus, RA)',
        citation: [1, 4],
        calculatorLinks: [{ id: 'mg-ice-test', label: 'Ice Pack Test' }],
        next: 'mg-triggers',
    },
    // =====================================================================
    // MODULE 5: DRUG-INDUCED EXACERBATION
    // =====================================================================
    {
        id: 'mg-triggers',
        type: 'info',
        module: 5,
        title: 'Drug-Induced Exacerbation',
        body: '[Drugs to Avoid in MG](#/calc/mg-drugs-avoid) — comprehensive contraindication list.\n\n**MEDICATIONS THAT CAN PRECIPITATE CRISIS:**\n\n**Antibiotics:**\n• Aminoglycosides (gentamicin, tobramycin, amikacin)\n• Fluoroquinolones (especially respiratory FQs — levofloxacin, moxifloxacin)\n• Macrolides (azithromycin, erythromycin, clarithromycin)\n\n**Cardiovascular:**\n• Beta-blockers (including ophthalmic — timolol drops!)\n• Calcium channel blockers\n• Procainamide, quinidine\n\n**Critical care:**\n• **Magnesium IV** — neuromuscular blockade\n• Neuromuscular blockers — **prolonged effect** (use succinylcholine cautiously, rocuronium at reduced dose)\n\n**Other:**\n• Botulinum toxin\n• D-penicillamine (can induce MG)\n• **Immune checkpoint inhibitors** (nivolumab, pembrolizumab) — can trigger new-onset MG\n• Interferons\n• Chloroquine/hydroxychloroquine\n• Statins (case reports)\n\n**Safe antibiotics in MG:**\n• Penicillins, cephalosporins, carbapenems\n• Trimethoprim-sulfamethoxazole\n• Vancomycin',
        citation: [3, 4],
        calculatorLinks: [{ id: 'mg-drugs-avoid', label: 'Drugs to Avoid' }],
        next: 'mg-treatment-acute',
    },
    // =====================================================================
    // MODULE 6: TREATMENT — ACUTE
    // =====================================================================
    {
        id: 'mg-treatment-acute',
        type: 'info',
        module: 6,
        title: 'Acute Treatment Overview',
        body: '**Acute MG treatment has two components:**\n\n**1. Symptomatic therapy:**\n• [Pyridostigmine (Mestinon)](#/drug/pyridostigmine) — improves transmission at NMJ\n• Does NOT modify disease course\n• May need to HOLD if concern for cholinergic crisis\n\n**2. Immunotherapy:**\n• **Rapid-acting:** IVIG, plasmapheresis (PLEX)\n• **Slower-acting:** Corticosteroids, steroid-sparing agents\n\n**Treatment selection depends on:**\n• Severity (mild vs moderate-severe vs crisis)\n• Urgency (stable vs rapidly worsening)\n• Comorbidities (diabetes, infection risk)\n\n**Approach by severity:**\n• **Ocular only:** Pyridostigmine ± low-dose prednisone\n• **Mild generalized:** Pyridostigmine + prednisone\n• **Moderate-severe:** Pyridostigmine + IVIG or PLEX + steroids\n• **Crisis:** IVIG or PLEX (first) + hold pyridostigmine if cholinergic concern + ICU',
        citation: [1, 3],
        next: 'mg-pyridostigmine',
    },
    {
        id: 'mg-pyridostigmine',
        type: 'info',
        module: 6,
        title: 'Pyridostigmine (Mestinon)',
        body: '[Pyridostigmine Dosing Guide](#/calc/mg-pyridostigmine) — titration and monitoring.\n\n**Mechanism:** Acetylcholinesterase inhibitor — increases acetylcholine at NMJ.\n\n**Dosing:**\n• Start: 30 mg PO TID (with meals)\n• Titrate: Increase by 30 mg q3-5 days as tolerated\n• Typical maintenance: 60 mg PO q4-6h (while awake)\n• Maximum: 120 mg per dose, ~480-600 mg/day total\n\n**Onset:** 30-45 minutes; duration 3-6 hours\n\n**Extended-release (Mestinon Timespan):**\n• 180 mg at bedtime for overnight coverage\n• Do NOT crush or chew\n• Absorption less predictable\n\n**Common side effects (cholinergic):**\n• GI: cramping, diarrhea, nausea\n• Increased salivation, lacrimation\n• Muscle twitching\n\n**Watch for cholinergic crisis** if excessive dosing — see SLUDGE/BBB symptoms.\n\n**Key point:** Pyridostigmine is symptomatic only. It does NOT prevent crisis or modify disease course. Immunotherapy is needed for disease control.',
        citation: [1, 3],
        calculatorLinks: [{ id: 'mg-pyridostigmine', label: 'Pyridostigmine Dosing' }],
        treatment: {
            firstLine: {
                drug: 'Pyridostigmine (Mestinon)',
                dose: '30-60 mg PO',
                route: 'PO',
                frequency: 'q4-6h while awake',
                duration: 'Ongoing — symptomatic therapy',
                notes: 'Start 30 mg TID, titrate up. Max 120 mg/dose, 480-600 mg/day. Take with food to reduce GI effects.',
            },
            alternative: {
                drug: 'Pyridostigmine ER (Mestinon Timespan)',
                dose: '180 mg PO',
                route: 'PO',
                frequency: 'At bedtime',
                duration: 'Overnight coverage',
                notes: 'Do NOT crush. For nocturnal symptoms. Less predictable absorption.',
            },
            monitoring: 'Watch for cholinergic side effects. STOP if SLUDGE symptoms develop.',
        },
        next: 'mg-ivig-plex',
    },
    {
        id: 'mg-ivig-plex',
        type: 'question',
        module: 6,
        title: 'IVIG vs Plasmapheresis',
        body: '[IVIG vs PLEX Comparison](#/calc/mg-ivig-plex) — efficacy, logistics, and side effects.\n\n**Both are equally effective for MG crisis and acute exacerbation.**\n\n**IVIG:**\n• Dose: 0.4 g/kg/day × 5 days OR 1 g/kg/day × 2 days\n• Onset: 2-5 days\n• Duration of effect: 3-6 weeks\n• Advantages: Easier logistics, peripheral IV access, no central line\n• Disadvantages: Risk of thrombosis, aseptic meningitis, renal toxicity\n• Contraindicated: IgA deficiency (anaphylaxis risk)\n\n**Plasmapheresis (PLEX):**\n• Protocol: 5 exchanges over 10-14 days (alternate days)\n• Onset: Faster than IVIG (1-2 days)\n• Duration of effect: 4-6 weeks\n• Advantages: Faster onset, useful if IVIG contraindicated\n• Disadvantages: Requires central venous access, specialized equipment\n• Complications: Hypotension, citrate toxicity, line infection\n\n**Choice often depends on availability and patient factors.**\n\nBoth provide temporary benefit — must add maintenance immunotherapy.',
        citation: [1, 3, 5],
        calculatorLinks: [{ id: 'mg-ivig-plex', label: 'IVIG vs PLEX' }],
        options: [
            {
                label: 'IVIG — proceed',
                description: 'Easier access, no central line needed',
                next: 'mg-ivig-dosing',
            },
            {
                label: 'Plasmapheresis — proceed',
                description: 'Faster onset, or IVIG contraindicated',
                next: 'mg-plex-dosing',
            },
            {
                label: 'Steroids only (mild exacerbation)',
                description: 'Not in crisis, stable respiratory status',
                next: 'mg-steroids',
            },
        ],
    },
    {
        id: 'mg-ivig-dosing',
        type: 'info',
        module: 6,
        title: 'IVIG Dosing',
        body: '**Intravenous Immunoglobulin (IVIG) for MG:**\n\n**Standard dosing:**\n• **Option 1:** 0.4 g/kg/day × 5 days (total 2 g/kg)\n• **Option 2:** 1 g/kg/day × 2 days (total 2 g/kg)\n\n**Practical example (80 kg patient):**\n• Option 1: 32 g/day × 5 days = 160 g total\n• Option 2: 80 g/day × 2 days = 160 g total\n\n**Administration:**\n• Start slow: 0.5-1 mL/kg/hr for first 30 min\n• Titrate up to 4-8 mL/kg/hr as tolerated\n• Premedicate with acetaminophen ± diphenhydramine\n\n**Side effects:**\n• Common: Headache (30%), fever, chills, myalgias\n• Aseptic meningitis (severe headache, meningismus)\n• **Thrombosis** — especially in elderly, immobile, hypercoagulable\n• Acute kidney injury (sucrose-containing formulations)\n• Hemolytic anemia (blood type incompatibility)\n\n**Contraindication:** IgA deficiency — risk of anaphylaxis\n• Check IgA level before first dose if not known\n\n**Onset:** 2-5 days; **Duration:** 3-6 weeks\n\nMust add maintenance immunotherapy — IVIG effect is temporary.',
        citation: [1, 3],
        treatment: {
            firstLine: {
                drug: 'IVIG',
                dose: '0.4 g/kg/day × 5 days OR 1 g/kg/day × 2 days',
                route: 'IV infusion',
                frequency: 'Daily for 2-5 days',
                duration: 'Total dose 2 g/kg',
                notes: 'Start slow (0.5-1 mL/kg/hr), titrate up. Premedicate with acetaminophen. Check IgA level.',
            },
            monitoring: 'Watch for headache, fever, thrombosis. Monitor renal function. Effect lasts 3-6 weeks.',
        },
        next: 'mg-steroids',
    },
    {
        id: 'mg-plex-dosing',
        type: 'info',
        module: 6,
        title: 'Plasmapheresis (PLEX)',
        body: '**Plasmapheresis for MG:**\n\n**Protocol:**\n• 5 exchanges over 10-14 days\n• Typically every other day (Mon-Wed-Fri-Mon-Wed)\n• Each exchange removes 1-1.5 plasma volumes\n• Replacement fluid: 5% albumin (preferred) or FFP\n\n**Mechanism:** Physically removes circulating AChR antibodies.\n\n**Advantages over IVIG:**\n• Faster onset (1-2 days vs 2-5 days)\n• Can repeat without cumulative toxicity\n• No IgA deficiency concern\n\n**Requirements:**\n• Central venous catheter (dialysis-type)\n• Specialized apheresis equipment and trained staff\n• Often limited to tertiary centers\n\n**Complications:**\n• Hypotension (during procedure)\n• Citrate toxicity (hypocalcemia) — paresthesias, muscle cramps\n• Line infection/thrombosis\n• Coagulopathy (removes clotting factors)\n• Allergic reactions to albumin\n\n**Practical note:** If PLEX unavailable, IVIG is equally effective.\n\n**Duration of effect:** 4-6 weeks — must add maintenance immunotherapy.',
        citation: [1, 3],
        treatment: {
            firstLine: {
                drug: 'Plasmapheresis',
                dose: '1-1.5 plasma volumes per exchange',
                route: 'Central venous access',
                frequency: '5 exchanges over 10-14 days',
                duration: 'Every other day typically',
                notes: 'Replacement with 5% albumin. Faster onset than IVIG. Requires specialized equipment.',
            },
            monitoring: 'Monitor for hypotension during procedure. Check calcium (citrate toxicity). Watch line site for infection.',
        },
        next: 'mg-steroids',
    },
    {
        id: 'mg-steroids',
        type: 'info',
        module: 6,
        title: 'Corticosteroids',
        body: '**Corticosteroids in MG:**\n\n**Dosing:**\n• High-dose: Prednisone 1 mg/kg/day (max 60-80 mg)\n• OR pulse: Methylprednisolone 1 g IV × 3-5 days, then oral taper\n\n**⚠️ CRITICAL WARNING:**\n**Steroids can cause INITIAL WORSENING in first 1-2 weeks.**\n• Up to 50% of patients experience transient worsening\n• Can precipitate myasthenic crisis\n• **Start in hospital if moderate-severe disease**\n\n**Safe steroid initiation strategies:**\n\n**Option 1 — High-dose with IVIG/PLEX "cover":**\n• Give IVIG or PLEX first\n• Start high-dose steroids while immunotherapy takes effect\n• IVIG/PLEX "bridges" past the steroid-induced weakness\n\n**Option 2 — Low-dose escalation (outpatient, mild disease):**\n• Start prednisone 10-20 mg/day\n• Increase by 5-10 mg every 3-5 days\n• Slower, avoids acute worsening\n• Takes 4-6 weeks to reach therapeutic dose\n\n**Response:** 70-80% improve on steroids. Onset 2-4 weeks.\n\n**Long-term:** Taper slowly over months. Add steroid-sparing agent (azathioprine, mycophenolate) for maintenance.',
        citation: [1, 3, 4],
        treatment: {
            firstLine: {
                drug: 'Prednisone',
                dose: '1 mg/kg/day (max 60-80 mg)',
                route: 'PO',
                frequency: 'Daily',
                duration: 'Months, then slow taper',
                notes: 'WARNING: Can cause initial worsening. Start in hospital if moderate-severe. Give with IVIG/PLEX cover.',
            },
            alternative: {
                drug: 'Methylprednisolone',
                dose: '1 g IV daily',
                route: 'IV',
                frequency: 'Daily × 3-5 days',
                duration: 'Then transition to oral prednisone',
                notes: 'Pulse dosing for severe exacerbation or crisis.',
            },
            monitoring: 'Monitor for initial worsening × 2 weeks. Blood glucose. Consider PPI and calcium/vitamin D supplementation.',
        },
        next: 'mg-airway',
    },
    // =====================================================================
    // MODULE 7: AIRWAY MANAGEMENT
    // =====================================================================
    {
        id: 'mg-airway',
        type: 'info',
        module: 7,
        title: 'Airway Management',
        body: '**Intubation indications (same thresholds as GBS):**\n• FVC <15-20 mL/kg (or <1 L in average adult)\n• NIF weaker than -20 to -25 cmH2O\n• Declining trend despite treatment\n• Severe bulbar dysfunction (aspiration risk)\n• Respiratory distress, accessory muscle use\n\n**⚠️ NEUROMUSCULAR BLOCKER CONSIDERATIONS:**\n\n**Succinylcholine:**\n• Variable response — may be RESISTANT (need higher dose) or SENSITIVE\n• Resistance due to reduced functional AChRs\n• Generally AVOID if possible\n\n**Rocuronium:**\n• MG patients are VERY SENSITIVE\n• Use **1/3 to 1/2 normal dose** (0.3-0.5 mg/kg instead of 0.6-1.2 mg/kg)\n• Prolonged duration of action\n• Sugammadex can reverse\n\n**Preferred approach:**\n• If possible, use topical anesthesia + sedation only (awake intubation)\n• If paralysis needed, low-dose rocuronium with sugammadex available\n\n**BiPAP:**\n• May temporize in mild respiratory failure\n• **AVOID if severe bulbar involvement** — aspiration risk\n• Not a substitute for intubation if criteria met\n\n**Anticipate difficult weaning** — may need prolonged ventilatory support.',
        citation: [2, 3],
        treatment: {
            firstLine: {
                drug: 'Rocuronium (if NMB needed)',
                dose: '0.3-0.5 mg/kg IV (1/3 to 1/2 normal dose)',
                route: 'IV',
                frequency: 'Single dose for intubation',
                duration: 'Prolonged effect expected',
                notes: 'MG patients very sensitive. Have sugammadex available. Avoid succinylcholine if possible.',
            },
            monitoring: 'Serial FVC/NIF q2-4h until stable. Low threshold for intubation. Anticipate difficult weaning.',
        },
        next: 'mg-thymectomy',
    },
    // =====================================================================
    // MODULE 8: THYMECTOMY
    // =====================================================================
    {
        id: 'mg-thymectomy',
        type: 'info',
        module: 8,
        title: 'Thymectomy',
        body: '**Indications for thymectomy:**\n\n**Definite indication:**\n• Thymoma (any stage) — must resect for oncologic reasons\n• Present in 10-15% of MG patients\n\n**Strong indication (MGTX trial):**\n• Generalized MG, age 18-65, AChR antibody positive\n• Even WITHOUT thymoma\n• MGTX trial showed: thymectomy + prednisone > prednisone alone\n• Better clinical status, lower prednisone requirements at 3 years\n\n**Less clear benefit:**\n• Ocular MG only\n• MuSK-positive MG (thymus usually normal)\n• Age >65 (less thymic tissue)\n• Seronegative MG\n\n**Timing:**\n• **Elective procedure** — NOT emergent\n• Stabilize medically first (optimize with IVIG/PLEX + steroids)\n• Do NOT operate during crisis\n• Wait until FVC stable and patient off ventilator\n\n**Surgical approach:**\n• Video-assisted thoracoscopic surgery (VATS) or robotic\n• Median sternotomy for larger thymomas\n\n**Post-op:** Monitor closely — up to 30% experience post-thymectomy crisis.',
        citation: [1, 5],
        next: 'mg-disposition',
    },
    // =====================================================================
    // MODULE 9: DISPOSITION
    // =====================================================================
    {
        id: 'mg-disposition',
        type: 'question',
        module: 9,
        title: 'Disposition',
        body: 'Disposition depends on presentation severity and response to treatment.\n\n**Consider:**\n• Respiratory status (FVC, NIF)\n• Bulbar function (swallowing, secretion management)\n• Response to initial treatment\n• Ability to manage at home (medication compliance, follow-up)\n• Social support',
        citation: [1, 2],
        options: [
            {
                label: 'ICU — myasthenic crisis',
                description: 'Respiratory failure, intubated, or impending crisis',
                next: 'mg-dispo-icu',
                urgency: 'critical',
            },
            {
                label: 'Admit — worsening or new diagnosis with bulbar/respiratory symptoms',
                description: 'Needs monitoring, not yet crisis',
                next: 'mg-dispo-admit',
                urgency: 'urgent',
            },
            {
                label: 'Outpatient — stable ocular MG or mild exacerbation',
                description: 'No respiratory concerns, reliable follow-up',
                next: 'mg-dispo-outpatient',
            },
        ],
    },
    {
        id: 'mg-dispo-icu',
        type: 'result',
        module: 9,
        title: 'ICU Admission',
        body: '**Myasthenic crisis requires ICU admission.**\n\n**ICU management:**\n• Mechanical ventilation if intubated\n• Serial FVC/NIF q4-6h if not intubated\n• IVIG or plasmapheresis (begin immediately)\n• Hold pyridostigmine initially (risk of cholinergic crisis, secretions)\n• Steroids after IVIG/PLEX initiated (not before — worsening risk)\n• Identify and treat trigger (infection most common)\n• DVT prophylaxis\n• Nutrition support (may need NG/PEG if prolonged intubation)\n\n**Expected ICU stay:** 1-2 weeks average\n\n**Weaning from ventilator:**\n• Often prolonged — days to weeks\n• Wean as immunotherapy takes effect\n• May need tracheostomy if prolonged\n\n**Consults:**\n• Neurology (MG specialist if available)\n• Pulmonology/critical care\n• Consider neurosurgery if thymoma',
        recommendation: 'ICU admission for myasthenic crisis. Begin IVIG or PLEX immediately. Hold pyridostigmine initially. Identify trigger. Neurology consultation.',
        confidence: 'definitive',
        citation: [2, 3],
    },
    {
        id: 'mg-dispo-admit',
        type: 'result',
        module: 9,
        title: 'Hospital Admission',
        body: '**Admit to monitored bed (step-down or floor with telemetry).**\n\n**Indications for admission:**\n• New diagnosis with bulbar or respiratory symptoms\n• Worsening symptoms despite outpatient treatment\n• Starting high-dose steroids (risk of initial worsening)\n• Need for IVIG or plasmapheresis\n• Unreliable follow-up or social situation\n\n**Inpatient management:**\n• Serial FVC/NIF q6-8h initially\n• Continue/adjust pyridostigmine\n• Initiate immunotherapy (IVIG/PLEX if indicated, steroids)\n• Avoid MG-exacerbating medications\n• Swallow evaluation if bulbar symptoms\n• Monitor for progression to crisis\n\n**Discharge criteria:**\n• FVC stable and adequate (>25-30 mL/kg)\n• Tolerating oral intake\n• On stable medication regimen\n• Neurology follow-up arranged within 1-2 weeks\n• Patient/family educated on warning signs',
        recommendation: 'Admit to monitored bed. Serial respiratory monitoring. Initiate appropriate immunotherapy. Neurology consultation. Educate on warning signs before discharge.',
        confidence: 'recommended',
        citation: [1, 2],
    },
    {
        id: 'mg-dispo-outpatient',
        type: 'result',
        module: 9,
        title: 'Outpatient Management',
        body: '**Outpatient management appropriate for:**\n• Ocular MG only (Class I)\n• Mild, stable generalized symptoms\n• No respiratory or bulbar concerns\n• Reliable patient with good follow-up\n\n**Outpatient plan:**\n\n**1. Medications:**\n• Start or adjust pyridostigmine (30-60 mg TID)\n• Consider low-dose prednisone (10-20 mg, slow escalation) if not responding to pyridostigmine alone\n\n**2. Patient education:**\n• Warning signs requiring ED return: difficulty breathing, swallowing, speaking\n• Medication list to avoid (provide written list)\n• Do not take extra pyridostigmine without guidance\n• Symptoms often worse at end of day — normal pattern\n\n**3. Follow-up:**\n• Neurology within 1-2 weeks (sooner if new diagnosis)\n• Consider antibody testing, EMG if not yet diagnosed\n• Chest CT to evaluate for thymoma\n\n**4. Lifestyle:**\n• Adequate rest, avoid overexertion\n• Avoid extreme heat (worsens symptoms)\n• MedicAlert bracelet recommended',
        recommendation: 'Outpatient management with pyridostigmine. Neurology follow-up within 1-2 weeks. Provide medication avoidance list. Educate on warning signs. Chest imaging to rule out thymoma.',
        confidence: 'recommended',
        citation: [1, 4],
    },
];
export const MYASTHENIA_GRAVIS_NODE_COUNT = MYASTHENIA_GRAVIS_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const MYASTHENIA_GRAVIS_MODULE_LABELS = [
    'Recognition',
    'Myasthenic Crisis',
    'Cholinergic Crisis',
    'Diagnostics',
    'Drug Triggers',
    'Acute Treatment',
    'Airway Management',
    'Thymectomy',
    'Disposition',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const MYASTHENIA_GRAVIS_CITATIONS = [
    { num: 1, text: 'Sanders DB, Wolfe GI, Benatar M, et al. International Consensus Guidance for Management of Myasthenia Gravis: Executive Summary. Neurology. 2016;87(4):419-425.' },
    { num: 2, text: 'Wendell LC, Levine JM. Myasthenic Crisis. Neurohospitalist. 2011;1(1):16-22.' },
    { num: 3, text: 'Farmakidis C, Pasnoor M, Dimachkie MM, Barohn RJ. Treatment of Myasthenia Gravis. Neurol Clin. 2018;36(2):311-337.' },
    { num: 4, text: 'Gilhus NE. Myasthenia Gravis. N Engl J Med. 2016;375(26):2570-2581.' },
    { num: 5, text: 'Wolfe GI, Kaminski HJ, Aban IB, et al. Randomized Trial of Thymectomy in Myasthenia Gravis (MGTX). N Engl J Med. 2016;375(6):511-522.' },
];
