// MedKitt — Thrombotic Thrombocytopenic Purpura (TTP)
// Recognition → Diagnosis → Initial Treatment → Adjunctive Therapy → Special Populations → Monitoring
// 6 modules: Recognition & Risk → Diagnostic Workup → Initial Treatment → Adjunctive Therapy → Special Populations → Disposition & Monitoring
// 30 nodes total.
export const TTP_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION & RISK
    // =====================================================================
    {
        id: 'ttp-start',
        type: 'info',
        module: 1,
        title: 'TTP — Recognition',
        body: '[TTP Steps Summary](#/info/ttp-steps)\n\n**Thrombotic Thrombocytopenic Purpura (TTP)** is a life-threatening thrombotic microangiopathy characterized by ADAMTS13 deficiency causing microvascular platelet aggregation. [1][2]\n\n**Mortality without treatment: >90%**\n**Mortality with prompt TPE: <10%** [3]\n\n**Key Principle:** TTP is a clinical diagnosis requiring emergent plasma exchange (TPE). Do NOT wait for ADAMTS13 results to start treatment if clinical suspicion is high. [4]\n\n**Classic Pentad** (present in <5% of cases): [1]\n1. Microangiopathic hemolytic anemia (MAHA)\n2. Thrombocytopenia\n3. Neurological abnormalities\n4. Renal dysfunction\n5. Fever\n\n**Modern criteria:** MAHA + thrombocytopenia without alternative explanation is sufficient to suspect TTP and initiate workup. [2][4]',
        citation: [1, 2, 3, 4],
        calculatorLinks: [
            { id: 'ttp-plasmic', label: 'PLASMIC Score' },
        ],
        next: 'ttp-maha-check',
    },
    {
        id: 'ttp-maha-check',
        type: 'question',
        module: 1,
        title: 'MAHA + Thrombocytopenia Present?',
        body: '**Microangiopathic hemolytic anemia (MAHA)** is defined by: [1][2]\n• **Schistocytes** on peripheral smear (fragmented RBCs)\n• **Elevated LDH** (often markedly elevated)\n• **Undetectable haptoglobin**\n• **Elevated indirect bilirubin**\n• **Negative direct Coombs** (not immune-mediated hemolysis)\n\n**Thrombocytopenia in TTP:** [4]\n• Usually severe (<30 × 10⁹/L)\n• May be moderate (30-100 × 10⁹/L)\n• NOT due to consumption by DIC (normal coags in TTP)\n\n**Order immediately:**\n• CBC with smear review\n• LDH, haptoglobin, indirect bilirubin\n• Reticulocyte count\n• PT/INR, PTT, fibrinogen\n• Creatinine\n• ADAMTS13 activity (send before plasma infusion/exchange)\n\nDoes the patient have MAHA + thrombocytopenia?',
        citation: [1, 2, 4],
        options: [
            {
                label: 'Yes — MAHA + Thrombocytopenia Confirmed',
                description: 'Schistocytes + low platelets + hemolysis markers',
                next: 'ttp-plasmic',
            },
            {
                label: 'Possible — Labs Pending',
                description: 'Clinical suspicion high, awaiting smear/labs',
                next: 'ttp-pending-labs',
            },
            {
                label: 'No — Does Not Meet MAHA Criteria',
                description: 'Consider alternative diagnoses',
                next: 'ttp-alt-diagnoses',
            },
        ],
    },
    {
        id: 'ttp-pending-labs',
        type: 'info',
        module: 1,
        title: 'While Awaiting Labs',
        body: '**Do not delay treatment in critically ill patients.** [3][4]\n\n**While awaiting smear and hemolysis markers:**\n\n**If hemodynamically unstable or neurological symptoms:**\n• Draw ADAMTS13 before any plasma exposure\n• Call hematology emergently\n• Prepare for emergent TPE\n• Consider FFP infusion (30 mL/kg) as bridge if TPE delayed\n\n**If stable:**\n• Expedite peripheral smear review (call lab directly)\n• STAT LDH, haptoglobin results\n• Calculate PLASMIC score once labs available\n\n**Pearl:** A skilled technician/pathologist can confirm schistocytes on smear within 30-60 minutes. Push for urgent smear read. [2]',
        citation: [2, 3, 4],
        next: 'ttp-plasmic',
    },
    {
        id: 'ttp-alt-diagnoses',
        type: 'result',
        module: 1,
        title: 'TTP Unlikely — Consider Alternatives',
        body: '**Without MAHA and thrombocytopenia, TTP is unlikely.** [1][2]\n\n**Alternative diagnoses to consider:**\n\n**If thrombocytopenia WITHOUT hemolysis:**\n• ITP (immune thrombocytopenia)\n• Drug-induced thrombocytopenia\n• Heparin-induced thrombocytopenia (HIT)\n• Bone marrow failure\n• Splenic sequestration\n\n**If hemolysis WITHOUT schistocytes:**\n• Autoimmune hemolytic anemia (AIHA)\n• Paroxysmal nocturnal hemoglobinuria (PNH)\n• Drug-induced hemolysis\n• G6PD deficiency\n\n**If both present, consider other TMAs:**\n• HUS (especially with bloody diarrhea, severe AKI)\n• DIC (abnormal coags, underlying illness)\n• HELLP (pregnancy)\n• Drug-induced TMA\n• Malignant hypertension',
        recommendation: 'Without confirmed MAHA + thrombocytopenia, TTP is unlikely. Pursue alternative workup based on clinical picture.',
        confidence: 'recommended',
        citation: [1, 2],
    },
    // =====================================================================
    // MODULE 2: DIAGNOSTIC WORKUP
    // =====================================================================
    {
        id: 'ttp-plasmic',
        type: 'question',
        module: 2,
        title: 'PLASMIC Score',
        body: '**PLASMIC score** predicts probability of severe ADAMTS13 deficiency (<10%). [5]\n\n[PLASMIC Calculator](#/calc/ttp-plasmic)\n\n| Parameter | Criteria | Points |\n|-----------|----------|--------|\n| **P**latelet count | <30 × 10⁹/L | 1 |\n| hemo**L**ysis | Retic >2.5%, haptoglobin undetectable, OR indirect bili >2 mg/dL | 1 |\n| **A**bsence of active cancer | No active malignancy | 1 |\n| **S**tem cell/solid organ transplant | No transplant history | 1 |\n| **M**CV | <90 fL | 1 |\n| **I**NR | <1.5 | 1 |\n| **C**reatinine | <2.0 mg/dL | 1 |\n\n**Interpretation:** [5]\n• **0-4 points:** Low risk (5% probability of TTP)\n• **5 points:** Intermediate risk (24% probability)\n• **6-7 points:** High risk (72% probability)\n\n**Performance:** c-statistic 0.94; NPV 98% for low-intermediate. [5]\n\nWhat is the PLASMIC score?',
        citation: [5],
        calculatorLinks: [
            { id: 'ttp-plasmic', label: 'PLASMIC Calculator' },
        ],
        options: [
            {
                label: '6-7 — High Risk',
                description: '72% probability of severe ADAMTS13 deficiency',
                next: 'ttp-ddx-tma',
                urgency: 'critical',
            },
            {
                label: '5 — Intermediate Risk',
                description: '24% probability — consider TPE while awaiting ADAMTS13',
                next: 'ttp-ddx-tma',
                urgency: 'urgent',
            },
            {
                label: '0-4 — Low Risk',
                description: '5% probability — TTP unlikely, pursue other TMA causes',
                next: 'ttp-low-plasmic',
            },
        ],
    },
    {
        id: 'ttp-low-plasmic',
        type: 'info',
        module: 2,
        title: 'Low PLASMIC — Consider Other TMAs',
        body: '**PLASMIC 0-4 has 98% negative predictive value for TTP.** [5]\n\n**More likely diagnoses with low PLASMIC:** [6]\n\n**Hemolytic Uremic Syndrome (HUS):**\n• STEC-HUS (Shiga toxin): bloody diarrhea, severe AKI\n• Atypical HUS (complement-mediated): recurrent, familial\n\n**DIC:**\n• Abnormal coags (prolonged PT/PTT, low fibrinogen)\n• Underlying trigger (sepsis, trauma, malignancy, OB)\n\n**Drug-Induced TMA:** [7]\n• Quinine (most common)\n• Ticlopidine, clopidogrel\n• Cyclosporine, tacrolimus\n• Gemcitabine, mitomycin\n\n**HELLP Syndrome:**\n• Pregnancy (3rd trimester or postpartum)\n• Resolves with delivery\n\n**Malignant Hypertension:**\n• Severe HTN (usually >180/120)\n• End-organ damage\n\n**Still concerned for TTP?**\n• Await ADAMTS13 results\n• Consider hematology consultation\n• If clinical deterioration, treat empirically',
        citation: [5, 6, 7],
        next: 'ttp-ddx-tma',
    },
    {
        id: 'ttp-ddx-tma',
        type: 'question',
        module: 2,
        title: 'Differentiate TMA Causes',
        body: '[TMA Differential Table](#/info/ttp-tma-ddx)\n\n**Key differentiating features:** [6][7]\n\n| | TTP | HUS | DIC | HELLP |\n|---|---|---|---|---|\n| **ADAMTS13** | <10% | Normal | Normal | Low (>10%) |\n| **Coags** | Normal | Normal | Abnormal | Normal |\n| **Renal** | Mild | Severe | Variable | Moderate |\n| **Neuro** | Prominent | Less common | Variable | Less common |\n| **Trigger** | Autoimmune | STEC/complement | Sepsis/trauma | Pregnancy |\n\n**Red flags for TTP vs other TMAs:** [4]\n• Normal PT/PTT/fibrinogen (rules out DIC)\n• Mild renal dysfunction (Cr <2 favors TTP over HUS)\n• Neurological symptoms (63% of TTP patients)\n\n**Critical Pearl:** HELLP resolves with delivery within 2-3 days; TTP continues to deteriorate postpartum without TPE. [8]\n\nHave you ruled out DIC and other TMAs?',
        citation: [4, 6, 7, 8],
        options: [
            {
                label: 'Yes — Coags Normal, TTP Most Likely',
                description: 'Normal PT/PTT/fibrinogen, no alternative TMA',
                next: 'ttp-adamts13',
            },
            {
                label: 'Abnormal Coags — DIC Suspected',
                description: 'Prolonged PT/PTT, low fibrinogen, elevated D-dimer',
                next: 'ttp-dic-pathway',
            },
            {
                label: 'Severe AKI + Diarrhea — HUS Suspected',
                description: 'Creatinine >3, bloody diarrhea history',
                next: 'ttp-hus-pathway',
            },
            {
                label: 'Pregnant/Postpartum — HELLP vs TTP',
                description: 'Differentiate pregnancy-related TMA',
                next: 'ttp-pregnancy',
            },
        ],
    },
    {
        id: 'ttp-dic-pathway',
        type: 'result',
        module: 2,
        title: 'DIC — Different Pathway',
        body: '**DIC is NOT treated with plasma exchange.** [6]\n\n**Key differences from TTP:**\n• **Coags:** Prolonged PT/PTT, elevated D-dimer, low fibrinogen\n• **Mechanism:** Systemic activation of coagulation cascade\n• **Treatment:** Address underlying cause (sepsis, malignancy, OB emergency)\n\n**DIC management:**\n• Treat underlying cause (antibiotics, delivery, tumor)\n• Supportive care\n• Transfuse for bleeding only:\n  - FFP if PT >1.5× normal and bleeding\n  - Platelets if <50k and bleeding (or <20k prophylactic)\n  - Cryoprecipitate if fibrinogen <100 mg/dL\n\n**If DIC + TTP features overlap:**\n• Send ADAMTS13\n• Consider hematology consultation\n• Some patients have concurrent conditions',
        recommendation: 'Abnormal coagulation studies indicate DIC rather than TTP. Treat underlying cause. TPE is not indicated for DIC.',
        confidence: 'recommended',
        citation: [6],
    },
    {
        id: 'ttp-hus-pathway',
        type: 'result',
        module: 2,
        title: 'HUS — Different Pathway',
        body: '**HUS is characterized by severe renal involvement.** [6][9]\n\n**STEC-HUS (typical HUS):**\n• Shiga toxin-producing E. coli (O157:H7)\n• Bloody diarrhea → MAHA/thrombocytopenia → severe AKI\n• **Antibiotics may worsen** (increase toxin release)\n• **Supportive care:** dialysis PRN, avoid platelets\n• Usually self-limited (2-3 weeks)\n\n**Atypical HUS (aHUS):**\n• Complement-mediated (genetic or acquired)\n• No diarrheal prodrome\n• Recurrent episodes, family history\n• **Treatment:** Eculizumab (complement inhibitor)\n\n**Key point:** ADAMTS13 is NORMAL (>10%) in HUS. [9]\n\n**If HUS vs TTP unclear:**\n• Send ADAMTS13 and complement studies\n• Hematology consultation\n• May start TPE empirically while awaiting results',
        recommendation: 'Severe AKI with diarrheal prodrome suggests STEC-HUS. Supportive care is mainstay. For aHUS, consider eculizumab. ADAMTS13 should be normal.',
        confidence: 'recommended',
        citation: [6, 9],
    },
    {
        id: 'ttp-adamts13',
        type: 'info',
        module: 2,
        title: 'ADAMTS13 Testing',
        body: '**ADAMTS13 activity <10% is diagnostic of TTP.** [2][4]\n\n**Important:** Draw ADAMTS13 BEFORE any plasma exposure (FFP or TPE). Plasma contains ADAMTS13 and will falsely elevate levels. [4]\n\n**Interpretation:** [2]\n• **<10%:** Severe deficiency = TTP confirmed\n• **10-20%:** Possible TTP — repeat testing, treat if symptomatic\n• **>20%:** TTP unlikely — consider other TMA causes\n\n**Turnaround time:** [4]\n• Send-out test: 2-7 days in most institutions\n• **Do NOT wait for results if PLASMIC 6-7 or clinically critical**\n\n**Anti-ADAMTS13 antibody:** [2]\n• If ADAMTS13 <10%, send inhibitor titer\n• Positive inhibitor = immune TTP (iTTP) — most common\n• Negative inhibitor = consider congenital TTP (rare)\n\n**ISTH 2025 Update:** Confirm ADAMTS13 relapse with 2 consecutive tests <20% within 1-2 weeks. [10]',
        citation: [2, 4, 10],
        next: 'ttp-platelet-warning',
    },
    {
        id: 'ttp-platelet-warning',
        type: 'info',
        module: 2,
        title: '⚠️ DO NOT Transfuse Platelets',
        body: '**Platelet transfusion is CONTRAINDICATED in TTP** except for life-threatening bleeding. [4][11]\n\n**"Adding fuel to the fire"** [11]\n\n**Rationale:**\n• TTP is a prothrombotic state with microvascular platelet aggregation\n• Transfused platelets may worsen microvascular thrombosis\n• Historical reports of sudden death, MI, and stroke after platelet transfusion\n\n**Only transfuse platelets if:** [4]\n• CNS hemorrhage\n• Life-threatening bleeding requiring emergent surgery\n• Discuss with hematology before transfusing\n\n**RBC transfusion is SAFE** for symptomatic anemia. [4]\n\n**Pearl:** Severe thrombocytopenia in TTP rarely causes spontaneous bleeding because platelets are consumed in microthrombi, not hemorrhage.',
        citation: [4, 11],
        next: 'ttp-treatment-decision',
    },
    // =====================================================================
    // MODULE 3: INITIAL TREATMENT
    // =====================================================================
    {
        id: 'ttp-treatment-decision',
        type: 'question',
        module: 3,
        title: 'Initiate Treatment',
        body: '**Treatment is a medical emergency.** [3][4]\n\n**Initiate TPE within 4-8 hours** of suspected TTP. [3]\n\n**TPE is the cornerstone of TTP treatment:** [3][4]\n• Removes ultra-large vWF multimers\n• Removes anti-ADAMTS13 autoantibodies\n• Replaces functional ADAMTS13\n• **Reduces mortality from >90% to <10%**\n\n**While awaiting TPE:**\n• Call hematology emergently\n• Arrange TPE (apheresis team, vascular access)\n• Start corticosteroids\n• Consider FFP bridge if TPE will be delayed >4-6 hours\n\nIs TPE immediately available?',
        citation: [3, 4],
        calculatorLinks: [
            { id: 'ttp-tpe-volume', label: 'TPE Volume Calculator' },
        ],
        options: [
            {
                label: 'Yes — TPE Available Within 4-6 Hours',
                description: 'Proceed with standard TTP protocol',
                next: 'ttp-tpe-protocol',
            },
            {
                label: 'No — TPE Delayed (Transfer Required)',
                description: 'Start FFP bridge, arrange emergent transfer',
                next: 'ttp-ffp-bridge',
            },
        ],
    },
    {
        id: 'ttp-ffp-bridge',
        type: 'info',
        module: 3,
        title: 'FFP Bridge While Awaiting TPE',
        body: '**If TPE will be delayed >4-6 hours:** [3][4]\n\n**FFP Infusion Protocol:**\n• **30 mL/kg** as temporizing measure\n• Provides exogenous ADAMTS13\n• NOT a substitute for TPE — only a bridge\n• Monitor for volume overload\n\n**Practical considerations:**\n• 30 mL/kg ≈ 2.1 L for 70 kg patient\n• May need to give in divided doses\n• Consider diuretics if volume-sensitive\n• Cryo-poor plasma (CPP) is alternative if available\n\n**While infusing FFP:**\n• Start corticosteroids immediately\n• Arrange emergent transfer to TPE-capable facility\n• Call receiving hematologist\n• Document ADAMTS13 drawn pre-FFP\n\n**Pearl:** Do NOT let FFP availability delay transfer. The patient needs TPE.',
        citation: [3, 4],
        next: 'ttp-steroids',
    },
    {
        id: 'ttp-tpe-protocol',
        type: 'info',
        module: 3,
        title: 'Plasma Exchange (TPE) Protocol',
        body: '**TPE is EMERGENT — goal is initiation within 4-8 hours.** [3][4]\n\n[TPE Volume Calculator](#/calc/ttp-tpe-volume)\n\n**TPE Parameters:** [3][4]\n• **Volume:** 1.0-1.5 plasma volumes (40-60 mL/kg) per session\n• **Replacement fluid:** FFP or cryo-poor plasma (CPP)\n• **Frequency:** Daily (including weekends) until remission\n• **Vascular access:** Large-bore central catheter (apheresis catheter)\n\n**Monitoring during TPE:**\n• Vital signs q15min\n• Citrate toxicity (hypocalcemia): paresthesias, muscle cramps\n• Allergic reactions to plasma\n• Hypotension (volume shifts)\n\n**Remission criteria:** [4]\n• Platelet count >150 × 10⁹/L for 2 consecutive days\n• LDH trending toward normal\n• Clinical improvement\n\n**Typical course:** 5-10 TPE sessions (median 7). [3]',
        citation: [3, 4],
        calculatorLinks: [
            { id: 'ttp-tpe-volume', label: 'TPE Volume Calculator' },
        ],
        next: 'ttp-steroids',
    },
    {
        id: 'ttp-steroids',
        type: 'info',
        module: 3,
        title: 'Corticosteroids',
        body: '**Start corticosteroids immediately with TPE.** [3][4]\n\n**Mechanism:** Suppress autoantibody production. [4]\n\n**Dosing options:** [4][12]\n\n| Regimen | Dose | Notes |\n|---------|------|-------|\n| **Standard** | Prednisone 1 mg/kg/day | Most common, continue until remission |\n| **High-dose pulse** | Methylprednisolone 10 mg/kg/day × 3 days → 2.5 mg/kg/day | May improve remission rates |\n| **Pulse (refractory)** | Methylprednisolone 1 g/day × 3 days | For acute deterioration |\n\n**High-dose pulse approach:** [12]\n• Single-center data suggests improved complete remission (66% vs 41%)\n• Consider if neurological/cardiac involvement\n• Transition to oral prednisone after IV pulse\n\n**Duration:**\n• Continue steroids through TPE course\n• Taper after platelet normalization (over 4-8 weeks)\n• Adjust based on ADAMTS13 recovery',
        citation: [3, 4, 12],
        next: 'ttp-adjunctive-decision',
    },
    // =====================================================================
    // MODULE 4: ADJUNCTIVE THERAPY
    // =====================================================================
    {
        id: 'ttp-adjunctive-decision',
        type: 'question',
        module: 4,
        title: 'Adjunctive Therapy',
        body: '**Modern TTP treatment includes adjunctive therapies beyond TPE + steroids.** [3][4][13]\n\n**Caplacizumab:** [13]\n• Anti-vWF nanobody — blocks platelet aggregation\n• HERCULES trial: 74% reduction in composite outcome\n• Faster platelet normalization\n• Now standard of care for acute iTTP\n\n**Rituximab:** [14]\n• Anti-CD20 monoclonal antibody\n• Depletes B cells producing anti-ADAMTS13 antibodies\n• Used for refractory or relapsing TTP\n• Also for prophylaxis in remission\n\n**ISTH 2025 Update:** Caplacizumab + immunosuppression may be effective without additional TPE in select cases, but TPE remains standard. [10]\n\nIs this a straightforward first episode or refractory/relapsing case?',
        citation: [3, 4, 10, 13, 14],
        options: [
            {
                label: 'First Episode — Add Caplacizumab',
                description: 'Standard acute iTTP treatment',
                next: 'ttp-caplacizumab',
            },
            {
                label: 'Refractory (No Response by Day 5-7)',
                description: 'Add rituximab, escalate steroids',
                next: 'ttp-refractory',
            },
            {
                label: 'Relapsing TTP (Prior Episodes)',
                description: 'History of previous TTP episode',
                next: 'ttp-relapse',
            },
        ],
    },
    {
        id: 'ttp-caplacizumab',
        type: 'info',
        module: 4,
        title: 'Caplacizumab (Cablivi)',
        body: '**Caplacizumab** is an anti-vWF nanobody that prevents platelet aggregation. [13]\n\n**HERCULES Trial Results:** [13]\n• 74% reduction in composite outcome (death, recurrence, thromboembolism)\n• Faster platelet normalization\n• Lower recurrence during treatment\n\n**Dosing:** [13]\n• **Loading:** 10 mg IV before first TPE\n• **Maintenance:** 10 mg SC daily\n• **Duration:** Continue until 30 days after last TPE\n• Can extend up to 28 additional days if ADAMTS13 remains <10%\n\n**Side effects:** [13]\n• Epistaxis (29%)\n• Headache (21%)\n• Gingival bleeding (16%)\n• Mucocutaneous bleeding (monitor closely)\n\n**Cost:** ~$10,000-15,000/dose (discuss with pharmacy early)\n\n**Pearl:** Start caplacizumab with first TPE — do not delay waiting for ADAMTS13 results if clinical picture supports iTTP.',
        citation: [13],
        next: 'ttp-monitoring',
    },
    {
        id: 'ttp-refractory',
        type: 'info',
        module: 4,
        title: 'Refractory TTP',
        body: '**Refractory TTP:** No response to TPE + steroids by day 5-7. [4][14]\n\n**Criteria for refractory:** [4]\n• Persistent thrombocytopenia despite 5-7 daily TPE\n• No improvement in LDH\n• Clinical deterioration\n• Persistent neurological symptoms\n\n**Escalation strategies:** [4][14]\n\n**1. Add Rituximab:**\n• 375 mg/m² weekly × 4 weeks\n• Alternative: 375 mg/m² × 2 doses within 4 days, + 3rd at day 15\n• **TPE timing:** Hold TPE for ≥4 hours after rituximab infusion to prevent removal\n\n**2. Escalate Steroids:**\n• Methylprednisolone 1 g/day × 3 days\n\n**3. Increase TPE Frequency:**\n• Twice-daily TPE in severe cases\n\n**4. Ensure Caplacizumab Added:**\n• If not already on therapy\n\n**Hematology involvement critical for refractory cases.**',
        citation: [4, 14],
        next: 'ttp-monitoring',
    },
    {
        id: 'ttp-relapse',
        type: 'info',
        module: 4,
        title: 'Relapsing TTP',
        body: '**Relapse risk:** 20-50% of patients relapse, most within first 2 years. [15]\n\n**Two types of relapse:** [10][15]\n\n**1. Clinical relapse:**\n• Return of thrombocytopenia + MAHA + ADAMTS13 <10%\n• Treat as acute episode (TPE + steroids + caplacizumab)\n\n**2. ADAMTS13 relapse (biochemical):**\n• ADAMTS13 <20% without clinical symptoms\n• Can be treated preemptively to prevent clinical relapse\n• Rituximab 375 mg/m² × 4 weekly doses\n\n**Early symptoms of relapse:** [15]\n• Lethargy, fatigue (most common early sign)\n• Headache\n• Dark urine\n\n**Monitoring in remission:** [10]\n• ADAMTS13 activity every 3-6 months\n• CBC and hemolysis markers\n• Educate patient on warning symptoms\n\n**Prevention:** Rituximab prophylaxis for patients with persistently low ADAMTS13 during remission. [14]',
        citation: [10, 14, 15],
        next: 'ttp-monitoring',
    },
    // =====================================================================
    // MODULE 5: SPECIAL POPULATIONS
    // =====================================================================
    {
        id: 'ttp-pregnancy',
        type: 'question',
        module: 5,
        title: 'Pregnancy-Associated TTP',
        body: '**TTP in pregnancy:** Incidence 1 in 25,000-100,000 pregnancies. [8][16]\n\n**Key differentiator from HELLP:** [8]\n• **HELLP resolves with delivery** (improvement within 2-3 days)\n• **TTP continues to deteriorate** postpartum without TPE\n\n**ADAMTS13 levels:** [8]\n• HELLP: Low but >10% (average 31%)\n• TTP: <10%\n\n**Treatment in pregnancy:** [16]\n• TPE + steroids remain mainstay\n• Caplacizumab can be considered (limited data)\n• Rituximab can be used if needed\n\n**Fetal outcomes:** [16]\n• Fetal loss >40% if untreated\n• Improved with prompt treatment\n\n**Congenital TTP in pregnancy:** [17]\n• Requires regular ADAMTS13 supplementation\n• Plasma infusion every other week → weekly from 2nd trimester\n• Recombinant ADAMTS13 (Adzynma) now approved for cTTP\n\nIs this pregnancy-associated TTP vs HELLP?',
        citation: [8, 16, 17],
        options: [
            {
                label: 'Likely TTP — ADAMTS13 <10% or Not Improving Post-Delivery',
                description: 'Continue TTP treatment pathway',
                next: 'ttp-monitoring',
            },
            {
                label: 'Likely HELLP — Improving After Delivery',
                description: 'Monitor, supportive care, TTP treatment if deteriorates',
                next: 'ttp-hellp-monitor',
            },
        ],
    },
    {
        id: 'ttp-hellp-monitor',
        type: 'result',
        module: 5,
        title: 'HELLP — Monitor for TTP',
        body: '**HELLP should improve within 48-72 hours of delivery.** [8]\n\n**Monitor closely:**\n• Daily CBC, LDH, haptoglobin\n• Renal function\n• Neurological status\n\n**If NOT improving by 72 hours post-delivery:** [8]\n• Suspect TTP rather than HELLP\n• Send/expedite ADAMTS13\n• Initiate TPE + steroids\n• Hematology consultation\n\n**Red flags for TTP during HELLP monitoring:**\n• Worsening thrombocytopenia\n• Rising LDH\n• New neurological symptoms\n• Continued hemolysis\n\n**Pearl:** Do not wait for full ADAMTS13 result if clinical deterioration — treat empirically.',
        recommendation: 'Monitor post-delivery. HELLP should improve within 72 hours. If deterioration or no improvement, suspect TTP and initiate treatment.',
        confidence: 'recommended',
        citation: [8],
    },
    // =====================================================================
    // MODULE 6: DISPOSITION & MONITORING
    // =====================================================================
    {
        id: 'ttp-monitoring',
        type: 'info',
        module: 6,
        title: 'Acute Monitoring',
        body: '**TTP requires ICU admission.** [4]\n\n**Daily monitoring:** [4]\n\n| Parameter | Target |\n|-----------|--------|\n| Platelet count | Normalization (>150k × 2 days) |\n| LDH | Trending toward normal |\n| Hemoglobin | Stabilization |\n| Creatinine | Stability or improvement |\n| Neuro checks | Q4h minimum — no deterioration |\n\n**When to stop TPE:** [4]\n• Platelet count >150 × 10⁹/L for 2 consecutive days\n• LDH normalizing\n• Clinical improvement\n• ADAMTS13 >20% (if available)\n\n**Continue caplacizumab:** [13]\n• 30 days after last TPE\n• Extend if ADAMTS13 remains <10%\n\n**Taper steroids:**\n• After platelet normalization\n• Over 4-8 weeks\n• Monitor for relapse during taper',
        citation: [4, 13],
        next: 'ttp-disposition',
    },
    {
        id: 'ttp-disposition',
        type: 'result',
        module: 6,
        title: 'Disposition & Follow-Up',
        body: '**All TTP patients require ICU admission.** [4]\n\n**Rationale:**\n• Can deteriorate rapidly and abruptly\n• Requires emergent TPE\n• High mortality without treatment\n• Neurological monitoring essential\n\n**Hematology involvement:** [4]\n• Emergent consultation at diagnosis\n• Daily follow-up during acute treatment\n• Arrange outpatient follow-up before discharge\n\n**Long-term monitoring:** [10]\n• ADAMTS13 every 3-6 months in remission\n• CBC and hemolysis markers\n• Anti-ADAMTS13 antibody levels\n\n**Patient education:**\n• Recognize early relapse symptoms (lethargy, headache)\n• Carry emergency information\n• Avoid delays in seeking care for symptoms\n\n**Relapse prevention:** [14]\n• Rituximab prophylaxis if ADAMTS13 persistently <20%\n• Consider for all patients after first episode',
        recommendation: 'ICU admission is mandatory. Arrange emergent hematology consultation and TPE. After recovery, establish close follow-up with hematology for ADAMTS13 monitoring every 3-6 months.',
        confidence: 'definitive',
        citation: [4, 10, 14],
    },
    {
        id: 'ttp-hematology-call',
        type: 'result',
        module: 6,
        title: 'Call Hematology Emergently',
        body: '**TTP requires emergent hematology involvement.** [4]\n\n**When to call:**\n• Immediately when TTP is suspected (PLASMIC ≥5)\n• Before initiating TPE if possible (but do NOT delay treatment)\n• Any neurological or cardiac deterioration\n• Refractory cases (no response by day 5-7)\n• Rituximab or caplacizumab decision-making\n\n**Information for hematologist:**\n• PLASMIC score\n• Current labs (CBC, smear, LDH, haptoglobin, Cr, coags)\n• ADAMTS13 sent (time drawn, any plasma exposure?)\n• Neurological status\n• Current treatment\n• TPE access/timing\n\n**If hematology unavailable:**\n• Do NOT delay treatment for consultation\n• Initiate TPE + steroids empirically\n• Transfer to higher level of care if needed',
        recommendation: 'Emergent hematology consultation is essential. Provide PLASMIC score, current labs, ADAMTS13 status, and treatment plan. Do not delay treatment while awaiting consultation.',
        confidence: 'definitive',
        citation: [4],
    },
];
export const TTP_MODULE_LABELS = [
    'Recognition & Risk',
    'Diagnostic Workup',
    'Initial Treatment',
    'Adjunctive Therapy',
    'Special Populations',
    'Disposition & Monitoring',
];
export const TTP_CITATIONS = [
    { num: 1, text: 'Joly BS, Coppo P, Veyradier A. Thrombotic thrombocytopenic purpura. Blood. 2017;129(21):2836-2846.' },
    { num: 2, text: 'Scully M, et al. Guidelines on the diagnosis and management of thrombotic thrombocytopenic purpura. Br J Haematol. 2012;158(3):323-335.' },
    { num: 3, text: 'Rock GA, et al. Comparison of plasma exchange with plasma infusion in TTP. N Engl J Med. 1991;325(6):393-397.' },
    { num: 4, text: 'Zheng XL, et al. ISTH guidelines for treatment of TTP. J Thromb Haemost. 2020;18(10):2496-2502.' },
    { num: 5, text: 'Bendapudi PK, et al. Derivation and external validation of the PLASMIC score for rapid assessment of adults with thrombotic microangiopathies. Lancet Haematol. 2017;4(4):e157-e164.' },
    { num: 6, text: 'George JN, Nester CM. Syndromes of thrombotic microangiopathy. N Engl J Med. 2014;371(7):654-666.' },
    { num: 7, text: 'Al-Nouri ZL, et al. Drug-induced thrombotic microangiopathy: a systematic review. Blood. 2015;125(4):616-618.' },
    { num: 8, text: 'Pourrat O, et al. HELLP syndrome with and without TTP: similarities and differences. Thromb Res. 2015;136(6):1203-1209.' },
    { num: 9, text: 'Fakhouri F, et al. Haemolytic uraemic syndrome. Lancet. 2017;390(10095):681-696.' },
    { num: 10, text: 'Scully M, et al. ISTH 2025 update on management of iTTP. J Thromb Haemost. 2025.' },
    { num: 11, text: 'Swisher KK, et al. Pancreatitis preceding acute episodes of TTP-HUS: report of 5 patients. Am J Hematol. 2007;82(4):311-313.' },
    { num: 12, text: 'Balduini CL, et al. High versus standard dose methylprednisolone in acute TTP. Ann Hematol. 2010;89(6):591-596.' },
    { num: 13, text: 'Scully M, et al. Caplacizumab treatment for acquired TTP (HERCULES). N Engl J Med. 2019;380(4):335-346.' },
    { num: 14, text: 'Scully M, et al. Rituximab prophylaxis to prevent relapse in TTP. Blood Adv. 2017;1(15):1159-1166.' },
    { num: 15, text: 'Upreti H, et al. Long-term risk of relapse in immune-mediated TTP. Blood. 2023;141(3):285-292.' },
    { num: 16, text: 'Moatti-Cohen M, et al. TTP in pregnancy. Biomedicines. 2024;14(2):441.' },
    { num: 17, text: 'Scully M, et al. Recombinant ADAMTS13 for congenital TTP. N Engl J Med. 2024.' },
];
export const TTP_CRITICAL_ACTIONS = [
    { text: 'PLASMIC score 6-7 = initiate TPE within 4-8 hours — do NOT wait for ADAMTS13 results', nodeId: 'ttp-plasmic' },
    { text: 'Draw ADAMTS13 BEFORE any plasma exposure (FFP or TPE) to avoid false elevation', nodeId: 'ttp-adamts13' },
    { text: 'DO NOT transfuse platelets — "adding fuel to the fire" — contraindicated except for life-threatening bleeding', nodeId: 'ttp-platelet-warning' },
    { text: 'Normal PT/PTT/fibrinogen distinguishes TTP from DIC', nodeId: 'ttp-ddx-tma' },
    { text: 'FFP bridge (30 mL/kg) if TPE delayed >4-6 hours', nodeId: 'ttp-ffp-bridge' },
    { text: 'Start corticosteroids immediately with TPE (prednisone 1 mg/kg/day or methylprednisolone pulse)', nodeId: 'ttp-steroids' },
    { text: 'Caplacizumab 10mg IV before first TPE, then 10mg SC daily', nodeId: 'ttp-caplacizumab' },
    { text: 'TPE daily (including weekends) until platelets >150k × 2 consecutive days', nodeId: 'ttp-tpe-protocol' },
    { text: 'All TTP patients require ICU admission — can deteriorate abruptly', nodeId: 'ttp-disposition' },
    { text: 'HELLP resolves with delivery; TTP continues to deteriorate without TPE', nodeId: 'ttp-pregnancy' },
    { text: 'Monitor ADAMTS13 every 3-6 months in remission — 20-50% relapse rate', nodeId: 'ttp-relapse' },
];
