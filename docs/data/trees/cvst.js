// MedKitt — Cerebral Venous Sinus Thrombosis (CVST)
// ED evaluation, risk stratification, anticoagulation, and special populations
// 6 modules: Presentation → Diagnosis → Risk Stratification → Treatment → Special Populations → Disposition
// Based on AHA/ASA 2024 Scientific Statement and ESO 2017 Guidelines
export const CVST_NODES = [
    // ===================================================================
    // MODULE 1: Clinical Presentation
    // ===================================================================
    {
        id: 'cvst-start',
        type: 'info',
        module: 1,
        title: 'Cerebral Venous Thrombosis',
        body: '[CVST Steps Summary](#/info/cvst-summary) — diagnostic and treatment pathway.\n\n**CVST accounts for 0.5-3% of all strokes**, primarily affecting young adults and women of reproductive age (3:1 female predominance).\n\n**Classic presentation:**\n• **Headache** — >90% of cases, often severe, progressive\n• **Seizures** — 20-40%\n• **Focal neurologic deficits** — 20-50%\n• **Altered consciousness** — variable\n• **Papilledema** — suggests elevated ICP\n\n**High-risk populations:**\n• Pregnancy/puerperium (9 per 100,000 deliveries)\n• Oral contraceptive users (OR 7.59)\n• Prothrombotic conditions\n• Malignancy (~6% of cases)',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'cvt-gs', label: 'CVT-GS Score' },
            { id: 'iscvt-rs', label: 'ISCVT Risk Score' },
        ],
        next: 'cvst-clinical-syndrome',
    },
    {
        id: 'cvst-clinical-syndrome',
        type: 'question',
        module: 1,
        title: 'Clinical Syndrome',
        body: '**Identify the dominant clinical presentation:**\n\n**Isolated intracranial hypertension:**\n• Severe headache, papilledema, visual changes\n• No focal deficits, no encephalopathy\n\n**Focal syndrome:**\n• Hemiparesis, aphasia, hemisensory loss\n• May mimic arterial stroke\n\n**Encephalopathy:**\n• Altered mental status, confusion, stupor, coma\n• Bilateral deficits, multifocal signs\n\n**Seizure presentation:**\n• New-onset seizures with or without other features\n• May be focal or generalized',
        citation: [1],
        options: [
            { label: 'Isolated intracranial hypertension', description: 'Headache, papilledema, no focal deficits', next: 'cvst-diagnosis' },
            { label: 'Focal neurologic syndrome', description: 'Hemiparesis, aphasia, hemisensory', next: 'cvst-diagnosis' },
            { label: 'Encephalopathy/Altered mental status', description: 'Confusion, stupor, bilateral signs', next: 'cvst-diagnosis', urgency: 'critical' },
            { label: 'Seizure presentation', description: 'New-onset seizures ± other features', next: 'cvst-seizure-management' },
        ],
    },
    {
        id: 'cvst-seizure-management',
        type: 'info',
        module: 1,
        title: 'Seizure Management in CVST',
        body: '**Acute seizure treatment:**\n• Standard seizure protocol — [Lorazepam](#/drug/lorazepam/seizure) 4mg IV, then load AED\n• [Levetiracetam](#/drug/levetiracetam/seizure) 60mg/kg IV (max 4500mg) preferred\n\n**Key points on seizure prophylaxis:** [1,5]\n\n**Primary prophylaxis (no prior seizures): NOT RECOMMENDED**\n• Weak evidence, potential harm\n• Canadian Stroke Best Practices: strong recommendation against\n\n**After first seizure:**\n• Initiate anti-seizure medication\n• Continue for patients with supratentorial lesions\n\n**Seizure risk factors:**\n• Supratentorial lesions\n• Motor deficits\n• Superior sagittal sinus involvement\n• Cortical vein thrombosis\n• Hemorrhagic transformation',
        citation: [1, 5],
        next: 'cvst-diagnosis',
    },
    // ===================================================================
    // MODULE 2: Diagnosis
    // ===================================================================
    {
        id: 'cvst-diagnosis',
        type: 'info',
        module: 2,
        title: 'Diagnostic Approach',
        body: '**D-dimer role:** [2,3]\n• Sensitivity: 83-97.8%\n• NPV: 95-99.8%\n• **Measure BEFORE imaging UNLESS:**\n  — Isolated headache presentation\n  — Symptoms >1 week (higher false-negative rate)\n\n**Critical limitation:** Up to 10% of CVST patients have normal D-dimer\n\n**Imaging modalities (ranked):**\n\n**1. MRI + MRV (Gold Standard)**\n• Most sensitive for CVT diagnosis\n• TOF-MRV does not require contrast\n• GRE/SWI detects cortical vein thrombosis\n\n**2. CT + CTV**\n• Reliable alternative when MRI unavailable\n• Sensitivity 79% | Specificity 90%\n• **Empty delta sign:** contrast outlines thrombosed SSS\n\n**3. DSA** — reserved for inconclusive non-invasive imaging',
        citation: [2, 3],
        next: 'cvst-imaging-findings',
    },
    {
        id: 'cvst-imaging-findings',
        type: 'info',
        module: 2,
        title: 'Imaging Findings by Phase',
        body: '**MRI signal changes by thrombus age:**\n\n| Phase | Time | T1 | T2 |\n|-------|------|----|----|  \n| **Acute** | Days 1-7 | Isointense | Hypointense |\n| **Subacute** | Weeks 1-2 | Hyperintense | Hyperintense |\n| **Chronic** | >2 weeks | Variable | Variable |\n\n**CT findings:**\n• **Dense vein sign** — hyperdense cortical vein/sinus (non-contrast)\n• **Cord sign** — hyperdense cortical vein\n• **Empty delta sign** — contrast surrounds thrombus in SSS\n\n**Parenchymal findings:**\n• Venous infarction (often hemorrhagic)\n• Edema disproportionate to infarct size\n• Bilateral or parasagittal distribution (suggests SSS thrombosis)',
        citation: [2],
        next: 'cvst-confirmed',
    },
    {
        id: 'cvst-confirmed',
        type: 'question',
        module: 2,
        title: 'CVST Confirmed',
        body: '**Imaging confirms CVST.**\n\nBefore proceeding to treatment, assess:\n\n**1. Location of thrombosis:**\n• Superior sagittal sinus (most common)\n• Transverse/sigmoid sinus\n• Deep venous system (worse prognosis)\n• Cortical veins\n\n**2. Parenchymal involvement:**\n• Venous infarction present?\n• Hemorrhagic transformation?\n\n**3. Clinical severity:**\n• Mental status (GCS)\n• Focal deficits\n\nIs there **intracranial hemorrhage** on imaging?',
        citation: [1, 2],
        options: [
            { label: 'Yes — ICH present', description: 'Hemorrhagic venous infarction or parenchymal bleeding', next: 'cvst-ich-anticoag' },
            { label: 'No — No hemorrhage', description: 'Thrombosis without parenchymal bleeding', next: 'cvst-risk-stratification' },
        ],
    },
    {
        id: 'cvst-ich-anticoag',
        type: 'info',
        module: 2,
        title: 'ICH Does NOT Contraindicate Anticoagulation',
        body: '**CRITICAL CONCEPT:** [1,2,4]\n\n**Intracranial hemorrhage secondary to CVST is NOT a contraindication to anticoagulation.**\n\n**Rationale:**\n• ICH in CVST is a consequence of venous congestion, not the cause\n• Anticoagulation treats the underlying thrombosis\n• Hemorrhage extension risk is lower than risk of untreated CVST\n\n**Evidence:**\n• ISCVT study: No difference in hemorrhage extension with anticoagulation\n• Multiple observational studies support safety\n• AHA/ASA and ESO guidelines: Strong recommendation FOR anticoagulation despite ICH\n\n**Proceed to anticoagulation** — do not withhold based on ICH presence.',
        citation: [1, 2, 4],
        next: 'cvst-risk-stratification',
    },
    // ===================================================================
    // MODULE 3: Risk Stratification
    // ===================================================================
    {
        id: 'cvst-risk-stratification',
        type: 'info',
        module: 3,
        title: 'Risk Stratification',
        body: '**Use validated scoring systems to assess prognosis:**\n\n**CVT-GS (30-day mortality prediction):** [4]\nCalculates based on:\n• Parenchymal lesion >6 cm (+3)\n• Bilateral Babinski signs (+3)\n• Coma (+3)\n• Male sex (+2)\n• Parenchymal hemorrhage (+2)\n• Stupor (+2)\n• Somnolence (+1)\n\n**Score interpretation:**\n• Mild (0-2): 1.1% mortality\n• Moderate (3-7): 19.6% mortality\n• Severe (8-13): 61.4% mortality\n\n**ISCVT-RS (poor outcome prediction):** [4]\n• Malignancy (+2)\n• Coma (+2)\n• Deep venous thrombosis (+2)\n• Mental status disturbance (+1)\n• Male gender (+1)\n• Intracranial hemorrhage (+1)\n\n**High risk: ≥3 points**',
        citation: [4],
        calculatorLinks: [
            { id: 'cvt-gs', label: 'CVT-GS Score' },
            { id: 'iscvt-rs', label: 'ISCVT Risk Score' },
        ],
        next: 'cvst-treatment',
    },
    // ===================================================================
    // MODULE 4: Treatment
    // ===================================================================
    {
        id: 'cvst-treatment',
        type: 'info',
        module: 4,
        title: 'Anticoagulation — First-Line',
        body: '**Initiate anticoagulation IMMEDIATELY** [1,2,3]\n\n**Preferred: LMWH**\n• [Enoxaparin](#/drug/enoxaparin/cvst) 1 mg/kg SC q12h\n• More predictable anticoagulation\n• Lower HIT risk than UFH\n• No monitoring required\n\n**Alternative: UFH**\n• Weight-based IV infusion\n• aPTT goal: 1.5-2.5× control\n• Use if:\n  — Renal impairment (CrCl <30)\n  — Need for rapid reversal (surgery pending)\n  — Concern for deterioration requiring intervention\n\n**Key point:** Start anticoagulation even with ICH present',
        citation: [1, 2, 3],
        treatment: {
            firstLine: {
                drug: 'Enoxaparin',
                dose: '1 mg/kg',
                route: 'SC',
                frequency: 'q12h',
                duration: 'Until transition to oral anticoagulation',
                notes: 'Preferred over UFH for most patients',
            },
            alternative: {
                drug: 'Unfractionated Heparin',
                dose: 'Weight-based protocol',
                route: 'IV',
                frequency: 'Continuous infusion',
                duration: 'aPTT goal 1.5-2.5× control',
                notes: 'Use if renal impairment or need for rapid reversal',
            },
            monitoring: 'Clinical neuro checks q1-2h initially. Daily CBC for HIT surveillance. Anti-Xa levels if using LMWH in renal impairment.',
        },
        next: 'cvst-oral-anticoag',
    },
    {
        id: 'cvst-oral-anticoag',
        type: 'info',
        module: 4,
        title: 'Transition to Oral Anticoagulation',
        body: '**Timing:** After 5-15 days of parenteral therapy [1,3]\n\n**Options:**\n\n**DOACs (increasingly favored):**\n• Better safety profile than warfarin\n• No INR monitoring required\n• [Rivaroxaban](#/drug/rivaroxaban/cvst) 20mg daily with food\n• [Apixaban](#/drug/apixaban/cvst) 5mg BID\n\n**Warfarin:**\n• INR target: 2-3\n• Requires bridging with LMWH/UFH\n• Use when DOACs contraindicated\n\n**DOAC Contraindications:**\n• **Pregnancy** (teratogenic, crosses placenta)\n• **Antiphospholipid syndrome** (inferior efficacy)\n• **Severe renal impairment**',
        citation: [1, 3],
        next: 'cvst-duration',
    },
    {
        id: 'cvst-duration',
        type: 'info',
        module: 4,
        title: 'Duration of Anticoagulation',
        body: '**Duration depends on etiology:** [1,3]\n\n| Scenario | Duration |\n|----------|----------|\n| **Transient/reversible risk factor** | 3 months |\n| **Idiopathic or mild thrombophilia** | 6-12 months |\n| **Severe thrombophilia** | Indefinite |\n| **Recurrent CVST** | Indefinite |\n| **Active malignancy** | Duration of active disease |\n\n**Transient risk factors:**\n• OCP use (discontinue and reassess)\n• Pregnancy/puerperium\n• Recent surgery/trauma\n• Acute infection\n• Dehydration\n\n**Severe thrombophilia:**\n• Antiphospholipid syndrome\n• Homozygous Factor V Leiden\n• Protein C/S deficiency\n• Antithrombin III deficiency',
        citation: [1, 3],
        next: 'cvst-escalation',
    },
    {
        id: 'cvst-escalation',
        type: 'question',
        module: 4,
        title: 'Assess for Escalation',
        body: '**Monitor for deterioration despite anticoagulation:**\n\n**Signs requiring escalation:**\n• Progressive neurologic decline\n• Worsening mental status\n• New or expanding hemorrhage\n• Signs of herniation\n\n**Escalation options:**\n• Endovascular therapy (thrombectomy/thrombolysis)\n• Decompressive craniectomy\n\nIs the patient deteriorating despite adequate anticoagulation?',
        citation: [1, 2],
        options: [
            { label: 'Stable — Continue anticoagulation', description: 'No neurologic decline', next: 'cvst-special-populations' },
            { label: 'Deteriorating — Consider escalation', description: 'Progressive decline despite therapy', next: 'cvst-endovascular', urgency: 'critical' },
        ],
    },
    {
        id: 'cvst-endovascular',
        type: 'info',
        module: 4,
        title: 'Endovascular Therapy',
        body: '**Reserved for:** [1,2]\n1. Neurological deterioration despite adequate anticoagulation\n2. Absolute contraindication to anticoagulation\n3. Extensive thrombosis with severe deficit\n4. Deep venous system involvement with altered mental status\n\n**Modalities:**\n• Catheter-directed thrombolysis\n• Mechanical thrombectomy\n• Combined approach\n\n**Evidence:** Very low quality — ESO states "cannot provide a recommendation"\n\n**Consider if:**\n• Multiple sinuses involved\n• Deep venous system thrombosis\n• Rapid clinical deterioration\n• Poor response to anticoagulation',
        citation: [1, 2],
        next: 'cvst-craniectomy',
    },
    {
        id: 'cvst-craniectomy',
        type: 'info',
        module: 4,
        title: 'Decompressive Craniectomy',
        body: '**Life-saving intervention for malignant CVST:** [6]\n\n**Indications:**\n• Clinical signs of herniation (3rd nerve palsy, GCS decline)\n• CT showing:\n  — Midline shift ≥5 mm\n  — Effacement of basal cisterns\n  — Significant mass effect from hemorrhagic venous infarction\n\n**Outcomes:**\n• >50% favorable outcomes\n• ~20% mortality\n• Better than medical management alone for malignant course\n\n**Post-operative anticoagulation:**\n• Resume heparin 12 hours post-op at **half-dose**\n• Full dose at 24 hours\n• Continue anticoagulation per standard CVST protocol',
        citation: [6],
        next: 'cvst-special-populations',
    },
    // ===================================================================
    // MODULE 5: Special Populations
    // ===================================================================
    {
        id: 'cvst-special-populations',
        type: 'question',
        module: 5,
        title: 'Special Populations',
        body: '**Does the patient belong to a special population requiring modified management?**\n\n• **Pregnancy/postpartum** — LMWH throughout, DOAC contraindicated\n• **Malignancy** — prolonged anticoagulation, LMWH preferred\n• **OCP user** — discontinue estrogen-containing contraceptives',
        citation: [1, 7, 8],
        options: [
            { label: 'Pregnant or postpartum', next: 'cvst-pregnancy' },
            { label: 'Active malignancy', next: 'cvst-malignancy' },
            { label: 'OCP/estrogen user', next: 'cvst-ocp' },
            { label: 'None — Standard management', next: 'cvst-disposition' },
        ],
    },
    {
        id: 'cvst-pregnancy',
        type: 'info',
        module: 5,
        title: 'CVST in Pregnancy',
        body: '**Anticoagulation:** [7]\n• **LMWH throughout pregnancy** (does not cross placenta)\n• [Enoxaparin](#/drug/enoxaparin/pregnancy) 1 mg/kg SC q12h\n• Continue ≥6 weeks postpartum (minimum 3 months total)\n\n**CONTRAINDICATED:**\n• **DOACs** — teratogenic, excreted in breast milk\n• **Warfarin** — first trimester teratogenicity (nasal hypoplasia, stippled epiphyses)\n\n**Delivery considerations:**\n• Vaginal delivery is safe if facilitated by responsive team\n• C-section not routinely required\n• Neuraxial anesthesia: Contraindicated if herniation risk\n  — Timing depends on anticoagulation (hold LMWH 24h prior)\n\n**Future pregnancies:**\n• CVST alone is NOT a contraindication to future pregnancy\n• Prophylactic LMWH during pregnancy and 6 weeks postpartum\n• Avoid estrogen-containing contraceptives',
        citation: [7],
        next: 'cvst-disposition',
    },
    {
        id: 'cvst-malignancy',
        type: 'info',
        module: 5,
        title: 'CVST with Malignancy',
        body: '**~6% of CVST cases have coexisting malignancy** [8]\n\n**Treatment:**\n• **LMWH preferred** for initial and long-term therapy\n• Used in 71-74% of cancer-associated CVST cases\n• DOACs: Insufficient evidence in malignancy-related CVST\n\n**Duration:**\n• Minimum 3 months\n• Duration of active malignancy\n• Consider indefinite if high recurrence risk\n\n**Prognosis considerations:**\n• Higher intracranial hemorrhage risk (13-fold in brain cancer)\n• Prior CVST does NOT negatively impact cancer survival\n• Treat underlying malignancy concurrently',
        citation: [8],
        next: 'cvst-disposition',
    },
    {
        id: 'cvst-ocp',
        type: 'info',
        module: 5,
        title: 'OCP and Contraception',
        body: '**OCP-associated CVST risk:** [1,7]\n• OR 7.59 (95% CI 3.82-15.09) vs non-users\n• Third-generation pills (desogestrel, gestodene): Highest risk\n\n**Post-CVST contraception:**\n\n**DISCONTINUE:**\n• All estrogen-containing contraceptives\n• Combined OCPs\n• Estrogen patches/rings\n\n**SAFE ALTERNATIVES:**\n• **Progestin-only methods:**\n  — Levonorgestrel IUD (Mirena)\n  — Progestin-only pills (norethindrone)\n  — Depo-Provera (medroxyprogesterone)\n• **Non-hormonal:**\n  — Copper IUD\n  — Barrier methods\n\n**Counsel on:** Risk of future pregnancies (safe with prophylaxis), importance of thrombophilia workup',
        citation: [1, 7],
        next: 'cvst-disposition',
    },
    // ===================================================================
    // MODULE 6: Disposition
    // ===================================================================
    {
        id: 'cvst-disposition',
        type: 'result',
        module: 6,
        title: 'Admission and Follow-up',
        body: '**All CVST patients require admission:**\n\n**ICU admission if:**\n• Altered mental status / encephalopathy\n• Deep venous system involvement\n• Large hemorrhagic infarction\n• High CVT-GS score (≥3)\n• Concerns for herniation\n\n**Step-down/Neuro unit if:**\n• Stable neurologic exam\n• Isolated intracranial hypertension\n• Low CVT-GS score (0-2)\n\n**Monitoring:**\n• Neuro checks q1-2h initially\n• Serial imaging if deterioration\n• Daily platelet count for HIT surveillance\n\n**Discharge planning:**\n• Transition to oral anticoagulation\n• Thrombophilia workup (defer 4-6 weeks)\n• Neurology follow-up\n• Contraception counseling if applicable',
        recommendation: 'Admit to ICU or neuro unit based on severity. Continue anticoagulation. Plan transition to oral therapy and outpatient follow-up.',
        confidence: 'definitive',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'cvt-gs', label: 'CVT-GS Score' },
        ],
    },
];
export const CVST_NODE_COUNT = CVST_NODES.length;
export const CVST_MODULE_LABELS = [
    'Presentation',
    'Diagnosis',
    'Risk Stratification',
    'Treatment',
    'Special Populations',
    'Disposition',
];
export const CVST_CITATIONS = [
    {
        num: 1,
        text: 'Saposnik G, Bushnell C, Coutinho JM, et al. Diagnosis and management of cerebral venous thrombosis: A scientific statement from the American Heart Association. Stroke. 2024;55(3):e77-e90. doi:10.1161/STR.0000000000000456',
    },
    {
        num: 2,
        text: 'Ferro JM, Bousser MG, Canhao P, et al. European Stroke Organization guideline for the diagnosis and treatment of cerebral venous thrombosis. Eur J Neurol. 2017;24(10):1203-1213. doi:10.1111/ene.13381',
    },
    {
        num: 3,
        text: 'Stevens SM, Woller SC, Baumann Kreuziger L, et al. Executive summary: Antithrombotic therapy for VTE disease: Second update of the CHEST Guideline. Chest. 2021;160(6):2247-2259. doi:10.1016/j.chest.2021.07.056',
    },
    {
        num: 4,
        text: 'Aguiar de Sousa D, Canhao P, Ferro JM, et al. A practical score for prediction of outcome after cerebral venous thrombosis. Front Neurol. 2018;9:882. doi:10.3389/fneur.2018.00882',
    },
    {
        num: 5,
        text: 'Canadian Stroke Best Practices: Cerebral Venous Thrombosis. Heart and Stroke Foundation. 2024. https://www.strokebestpractices.ca/recommendations/cerebral-venous-thrombosis',
    },
    {
        num: 6,
        text: 'Ferro JM, Crassard I, Coutinho JM, et al. Decompressive surgery in cerebrovenous thrombosis: A multicenter registry and a systematic review of individual patient data. Stroke. 2011;42(10):2825-2831.',
    },
    {
        num: 7,
        text: 'Silvis SM, Lindgren E, Engelen M, et al. Pregnancy-associated cerebral venous thrombosis. Front Neurol. 2023;14:1167757. doi:10.3389/fneur.2023.1167757',
    },
    {
        num: 8,
        text: 'Silvis SM, Hiltunen S, Engelen M, et al. Cancer and risk of cerebral venous thrombosis: A case-control study. J Thromb Haemost. 2018;16(1):90-95.',
    },
];
export const CVST_CLINICAL_NOTES = [
    'ICH in CVST is NOT a contraindication to anticoagulation — it is a consequence of venous congestion',
    'LMWH is preferred over UFH for most patients',
    'DOACs are reasonable alternatives to warfarin except in pregnancy and antiphospholipid syndrome',
    'No seizure prophylaxis unless seizure has already occurred',
    'Duration of anticoagulation depends on etiology: 3 months (transient) to indefinite (severe thrombophilia)',
];
