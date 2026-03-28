// MedKitt - Rhabdomyolysis
// ED evaluation and management of rhabdomyolysis with CK-based severity stratification
// 6 modules: Recognition -> Etiology -> Workup -> Treatment -> Complications -> Disposition
// ~28 nodes total
export const RHABDOMYOLYSIS_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION & SEVERITY STRATIFICATION
    // =====================================================================
    {
        id: 'rhabdo-start',
        type: 'info',
        module: 1,
        title: 'Rhabdomyolysis - Recognition',
        body: '**Rhabdomyolysis** is skeletal muscle breakdown releasing intracellular contents (myoglobin, CK, potassium, phosphate) into circulation.\n\n**Classic triad (present in <10%):**\n• Myalgia\n• Muscle weakness\n• Dark/tea-colored urine (myoglobinuria)\n\n**Diagnostic criteria:**\n• CK >5x upper limit of normal (~1,000 U/L)\n• Many clinicians use CK >1,000 U/L as threshold [1]\n\n**AKI incidence:** 15-55% of cases, higher with:\n• CK >15,000-16,000 U/L [2]\n• Concurrent dehydration or sepsis\n• Delayed fluid resuscitation (>6 hours)\n\n**Key point:** AKI risk increases progressively with CK level, but there is no absolute threshold that guarantees injury.',
        citation: [1, 2],
        next: 'rhabdo-severity',
        calculatorLinks: [
            { id: 'mcmahon-rhabdo', label: 'McMahon Score (AKI Risk)' },
        ],
    },
    {
        id: 'rhabdo-severity',
        type: 'question',
        module: 1,
        title: 'Severity Stratification by CK Level',
        body: '**CK level guides treatment intensity and disposition:**\n\n| CK Level | Severity | Fluid Target | AKI Risk |\n|----------|----------|--------------|----------|\n| 1,000-5,000 | Mild | 2-3 L/day | ~2% dialysis |\n| 5,000-15,000 | Moderate | 3-6 L/day | ~3-8% dialysis |\n| >15,000 | Severe | >6 L/day | ~5-14% dialysis |\n| >50,000 | Very Severe | Aggressive + ICU | ~9-21% dialysis |\n\n**2025 cohort study (n=73,036):** [2]\n• CK 1K-5K: 6.4% developed Cr ≥4\n• CK 50K-100K: 21% developed Cr ≥4\n• CK >100K: 25% developed Cr ≥4\n\n**McMahon Score ≥6** predicts need for RRT. [3]',
        citation: [2, 3],
        options: [
            {
                label: 'Mild (CK 1,000-5,000)',
                description: 'Low AKI risk, outpatient possible',
                next: 'rhabdo-etiology',
            },
            {
                label: 'Moderate (CK 5,000-15,000)',
                description: 'Moderate AKI risk, admission likely',
                next: 'rhabdo-etiology',
                urgency: 'urgent',
            },
            {
                label: 'Severe (CK >15,000)',
                description: 'High AKI risk, aggressive resuscitation',
                next: 'rhabdo-etiology',
                urgency: 'critical',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: ETIOLOGY
    // =====================================================================
    {
        id: 'rhabdo-etiology',
        type: 'question',
        module: 2,
        title: 'Etiology Assessment',
        body: '**Identify the underlying cause - guides management and prognosis.**\n\n**Traumatic/Physical:**\n• Crush injury, prolonged immobilization\n• Compartment syndrome\n• Excessive exercise (exertional rhabdo)\n• Seizures, electrical injury, burns\n\n**Non-traumatic:**\n• **Drugs/Toxins:** Statins (especially + fibrates/cyclosporine), alcohol, cocaine, amphetamines, heroin, NMS, serotonin syndrome\n• **Metabolic:** Hypokalemia, hypophosphatemia, hypothyroidism, DKA\n• **Infectious:** Viral (influenza, COVID-19), bacterial (Legionella)\n• **Inflammatory:** Polymyositis, dermatomyositis\n• **Genetic:** McArdle disease, CPT2 deficiency\n\n**Exertional rhabdo** has better prognosis than other causes. [3]',
        citation: [1, 3, 4],
        options: [
            {
                label: 'Traumatic / Crush Injury',
                description: 'Includes immobilization, compartment syndrome risk',
                next: 'rhabdo-compartment-eval',
                urgency: 'critical',
            },
            {
                label: 'Exertional',
                description: 'Exercise-induced, military/athletes, better prognosis',
                next: 'rhabdo-workup',
            },
            {
                label: 'Drug/Toxin-Induced',
                description: 'Statins, cocaine, alcohol, NMS, serotonin syndrome',
                next: 'rhabdo-drug-induced',
            },
            {
                label: 'Medical/Metabolic',
                description: 'Infection, electrolyte, inflammatory',
                next: 'rhabdo-workup',
            },
        ],
    },
    {
        id: 'rhabdo-drug-induced',
        type: 'info',
        module: 2,
        title: 'Drug/Toxin-Induced Rhabdomyolysis',
        body: '**Statin-induced:**\n• Risk ~0.1% overall, higher with:\n  - High-intensity statins (rosuvastatin, atorvastatin high-dose)\n  - Fibrate combination (avoid gemfibrozil)\n  - CYP3A4 inhibitors (cyclosporine, macrolides, azoles)\n• **Management:** STOP statin immediately. Can rechallenge with different statin after recovery if needed.\n\n**Cocaine/Amphetamines:**\n• Sympathomimetic excess + hyperthermia + vasoconstriction\n• Treat hyperthermia aggressively\n• Avoid beta-blockers (unopposed alpha)\n\n**Alcohol:**\n• Direct myotoxicity + immobilization + electrolyte derangement\n• Check and correct Mg, K, Phos\n\n**NMS/Serotonin Syndrome:**\n• See [Serotonin Syndrome](#/tree/serotonin-syndrome) consult\n• Cooling, benzodiazepines, supportive care\n• Cyproheptadine for serotonin syndrome\n• Dantrolene for NMS with severe rigidity',
        citation: [1, 4],
        next: 'rhabdo-workup',
    },
    {
        id: 'rhabdo-compartment-eval',
        type: 'info',
        module: 2,
        title: 'Compartment Syndrome Evaluation',
        body: '**Compartment syndrome requires urgent evaluation in crush/trauma patients.**\n\n**Early signs (6 Ps - unreliable order):**\n• **Pain** - disproportionate, worse with passive stretch\n• **Paresthesias** - nerve ischemia\n• **Pressure** - tense compartment on exam\n• **Pallor** - late sign\n• **Paralysis** - late sign (muscle death)\n• **Pulselessness** - very late sign\n\n**Diagnosis:**\n• Clinical suspicion is paramount\n• Compartment pressure measurement:\n  - Absolute pressure >30 mmHg concerning\n  - Delta pressure (DBP - compartment pressure) <30 mmHg = fasciotomy indicated [5]\n\n**Time-critical:** Delay >6 hours leads to irreversible muscle necrosis.\n\n**Management:**\n• Remove constrictive dressings\n• Keep limb at heart level (NOT elevated)\n• **Urgent orthopedic/surgical consult for fasciotomy**\n• Do NOT wait for pressure measurement if clinical suspicion high',
        citation: [5],
        next: 'rhabdo-workup',
    },
    // =====================================================================
    // MODULE 3: WORKUP
    // =====================================================================
    {
        id: 'rhabdo-workup',
        type: 'info',
        module: 3,
        title: 'Laboratory Workup',
        body: '**Initial labs:**\n\n**Muscle injury markers:**\n• **CK** - most sensitive marker, peaks 24-72h\n• **Myoglobin** - cleared faster than CK, may be negative with high CK\n• LDH, AST (also from muscle, not just liver)\n\n**Renal function:**\n• BUN, Creatinine, GFR\n• Urinalysis: + blood on dipstick but no RBCs = myoglobinuria\n• Urine myoglobin (if available, not necessary for diagnosis)\n\n**Electrolytes (critical):**\n• **Potassium** - life-threatening hyperkalemia possible\n• **Calcium** - often LOW early (Ca deposits in damaged muscle)\n• **Phosphorus** - often HIGH (released from muscle)\n• **Bicarbonate/ABG** - assess for metabolic acidosis\n\n**Other:**\n• CBC, coagulation studies (DIC risk)\n• ECG (hyperkalemia changes)\n• Lactate (if sepsis/shock concern)\n• TSH (hypothyroid myopathy)\n• Toxicology screen if indicated',
        citation: [1, 2],
        next: 'rhabdo-electrolyte-check',
    },
    {
        id: 'rhabdo-electrolyte-check',
        type: 'question',
        module: 3,
        title: 'Critical Electrolyte Abnormalities?',
        body: '**Check for life-threatening abnormalities requiring immediate intervention:**\n\n**Hyperkalemia:**\n• K >6.0 mEq/L or ECG changes\n• Treat immediately: calcium, insulin/glucose, albuterol, bicarbonate\n• See [Potassium Disorders](#/tree/potassium)\n\n**Hypocalcemia:**\n• Corrected Ca <7.0 mg/dL with symptoms\n• **Caution:** Only treat symptomatic hypocalcemia\n• Aggressive Ca replacement may worsen muscle calcium deposition\n\n**Metabolic acidosis:**\n• pH <7.2, bicarb <15\n• Bicarbonate therapy controversial (see treatment module)',
        citation: [1, 6],
        options: [
            {
                label: 'Hyperkalemia Present (K >6 or ECG changes)',
                description: 'Requires immediate treatment',
                next: 'rhabdo-hyperkalemia-tx',
                urgency: 'critical',
            },
            {
                label: 'Symptomatic Hypocalcemia',
                description: 'Tetany, seizures, QT prolongation',
                next: 'rhabdo-hypocalcemia-tx',
                urgency: 'critical',
            },
            {
                label: 'No Critical Abnormalities',
                description: 'Proceed to fluid resuscitation',
                next: 'rhabdo-fluid-resus',
            },
        ],
    },
    {
        id: 'rhabdo-hyperkalemia-tx',
        type: 'result',
        module: 3,
        title: 'Hyperkalemia Management',
        body: '**Life-threatening hyperkalemia requires immediate treatment:**\n\n**Cardiac membrane stabilization:**\n• [Calcium gluconate](#/drug/calcium-gluconate/hyperkalemia) 1-2 g IV over 2-3 min (preferred) OR\n• [Calcium chloride](#/drug/calcium-chloride/hyperkalemia) 500-1000 mg IV (central line preferred)\n\n**Potassium shifting:**\n• [Regular insulin](#/drug/regular-insulin/hyperkalemia) 10 units IV + [D50W](#/drug/dextrose/hyperkalemia) 25-50 mL\n• [Albuterol](#/drug/albuterol-neb/hyperkalemia) 10-20 mg nebulized\n• [Sodium bicarbonate](#/drug/sodium-bicarbonate/hyperkalemia) 50-100 mEq IV (if acidotic)\n\n**Potassium elimination:**\n• [Furosemide](#/drug/furosemide/hyperkalemia) 40-80 mg IV (if adequate urine output)\n• Dialysis for refractory cases or AKI\n\n**Continuous cardiac monitoring. Recheck K in 1-2 hours.**\n\nSee [Potassium Disorders](#/tree/potassium) for complete management.',
        recommendation: 'Treat hyperkalemia immediately with calcium, insulin/glucose, albuterol. Consider dialysis if refractory or anuric.',
        confidence: 'definitive',
        citation: [1, 6],
        treatment: {
            firstLine: {
                drug: 'Calcium gluconate',
                dose: '1-2 g (10-20 mL of 10%)',
                route: 'IV',
                frequency: 'Over 2-3 min, may repeat',
                duration: 'As needed for cardiac protection',
                notes: 'Cardiac membrane stabilization. Does NOT lower K.',
            },
            alternative: {
                drug: 'Regular insulin + D50W',
                dose: 'Insulin 10 units IV + D50W 25-50 mL',
                route: 'IV',
                frequency: 'Once, may repeat',
                duration: 'Effect lasts 4-6 hours',
                notes: 'Shifts K intracellularly. Monitor glucose q1h.',
            },
            monitoring: 'Continuous cardiac monitor. Recheck K in 1-2 hours. Glucose q1h after insulin.',
        },
    },
    {
        id: 'rhabdo-hypocalcemia-tx',
        type: 'result',
        module: 3,
        title: 'Symptomatic Hypocalcemia',
        body: '**Only treat symptomatic hypocalcemia:**\n\n**Symptoms requiring treatment:**\n• Tetany, carpopedal spasm, Chvostek/Trousseau signs\n• Seizures\n• QT prolongation with arrhythmia\n\n**Treatment:**\n• [Calcium gluconate](#/drug/calcium-gluconate/hypocalcemia) 1-2 g IV over 10-20 min\n• May need continuous infusion: 1-2 g/hr\n\n**CAUTION - Asymptomatic hypocalcemia:**\n• Common in early rhabdomyolysis (Ca deposits in damaged muscle)\n• Do NOT aggressively replace if asymptomatic\n• May worsen heterotopic calcification in muscle\n• Calcium often normalizes during recovery phase (may even rebound to hypercalcemia)\n\n**Correct hypomagnesemia:** Hypocalcemia may be refractory if Mg is low.',
        recommendation: 'Only treat symptomatic hypocalcemia. Avoid aggressive calcium replacement in asymptomatic patients - calcium often normalizes spontaneously.',
        confidence: 'recommended',
        citation: [1, 6],
        treatment: {
            firstLine: {
                drug: 'Calcium gluconate',
                dose: '1-2 g (10-20 mL of 10%)',
                route: 'IV',
                frequency: 'Over 10-20 min',
                duration: 'PRN symptoms',
                notes: 'Only for symptomatic hypocalcemia. Peripheral IV safe.',
            },
            monitoring: 'Ionized calcium q4-6h. Monitor for rebound hypercalcemia during recovery.',
        },
    },
    // =====================================================================
    // MODULE 4: TREATMENT - FLUID RESUSCITATION
    // =====================================================================
    {
        id: 'rhabdo-fluid-resus',
        type: 'info',
        module: 4,
        title: 'Fluid Resuscitation - Cornerstone of Treatment',
        body: '**Aggressive IV fluid resuscitation is the mainstay of treatment.** [1][7]\n\n**Goals:**\n• Maintain urine output **1-3 mL/kg/hr** (some recommend up to 200-300 mL/hr)\n• Early resuscitation (<6 hours) reduces AKI risk\n• Replace volume deficit AND ongoing losses\n\n**Fluid choice - NS vs LR:** [7]\n• **Both are acceptable** per AAST consensus\n• **LR may have advantages:**\n  - Better maintenance of alkaline urine pH\n  - Less hyperchloremic acidosis risk with large volumes\n  - Small K content (4 mEq/L) - clinically insignificant\n• **NS disadvantages:**\n  - Large volumes cause hyperchloremic metabolic acidosis\n  - May counteract urine alkalinization goals\n• **One small RCT (doxylamine rhabdo):** LR had higher urine/serum pH, less bicarbonate needed [7]\n\n**Starting rate:**\n• 400-500 mL/hr initially, then goal-directed\n• Moderate CK (5-15K): 3-6 L/day\n• Severe CK (>15K): >6 L/day or more',
        citation: [1, 7, 8],
        next: 'rhabdo-fluid-choice',
    },
    {
        id: 'rhabdo-fluid-choice',
        type: 'question',
        module: 4,
        title: 'Fluid Selection',
        body: '**Choose crystalloid based on clinical context:**\n\n**Lactated Ringers (preferred by many):**\n• Maintains alkaline urine pH better than NS\n• Avoids hyperchloremic acidosis with large volumes\n• K content (4 mEq/L) does NOT worsen hyperkalemia - this is a myth [7]\n• LR actually may LOWER K by avoiding acidosis-induced K shift\n\n**Normal Saline:**\n• Acceptable alternative\n• May require bicarbonate supplementation for urine alkalinization\n• Large volumes cause NAGMA\n\n**Volume targets:**\n• Initial: 1-2 L bolus\n• Maintenance: 200-500 mL/hr\n• Goal UOP: 1-3 mL/kg/hr (200-300 mL/hr)',
        citation: [7, 8],
        options: [
            {
                label: 'Lactated Ringers',
                description: 'Preferred - better pH maintenance, less NAGMA',
                next: 'rhabdo-lr-protocol',
            },
            {
                label: 'Normal Saline',
                description: 'Acceptable alternative',
                next: 'rhabdo-ns-protocol',
            },
            {
                label: 'Special Population (CHF, ESRD)',
                description: 'Modified fluid strategy needed',
                next: 'rhabdo-special-fluid',
            },
        ],
    },
    {
        id: 'rhabdo-lr-protocol',
        type: 'result',
        module: 4,
        title: 'LR Fluid Protocol',
        body: '**Lactated Ringers Protocol:**\n\n**Initial bolus:**\n• 1-2 L IV bolus (20 mL/kg if pediatric)\n\n**Maintenance:**\n• 200-500 mL/hr (adjust based on UOP)\n• Goal UOP: **1-3 mL/kg/hr** (or 200-300 mL/hr)\n\n**Monitoring:**\n• Urine output q1-2h (Foley catheter recommended)\n• Reassess volume status frequently\n• BMP, CK q6-12h\n\n**Duration:**\n• Continue until CK trending down AND <5,000 U/L\n• OR until clear urine (myoglobinuria resolved)\n\n**Watch for volume overload:**\n• JVD, pulmonary edema, peripheral edema\n• Reduce rate if signs develop\n• Consider diuretics if oliguric despite adequate resuscitation',
        recommendation: 'Aggressive LR resuscitation targeting UOP 1-3 mL/kg/hr. Continue until CK <5,000 and trending down.',
        confidence: 'recommended',
        citation: [1, 7, 8],
        treatment: {
            firstLine: {
                drug: 'Lactated Ringers',
                dose: '1-2 L bolus, then 200-500 mL/hr',
                route: 'IV',
                frequency: 'Continuous',
                duration: 'Until CK <5,000 and trending down',
                notes: 'Goal UOP 1-3 mL/kg/hr (200-300 mL/hr). Foley recommended for monitoring.',
            },
            monitoring: 'UOP q1-2h, BMP and CK q6-12h, volume status assessment, watch for pulmonary edema.',
        },
    },
    {
        id: 'rhabdo-ns-protocol',
        type: 'result',
        module: 4,
        title: 'NS Fluid Protocol',
        body: '**Normal Saline Protocol:**\n\n**Initial bolus:**\n• 1-2 L IV bolus\n\n**Maintenance:**\n• 200-500 mL/hr (adjust based on UOP)\n• Goal UOP: **1-3 mL/kg/hr**\n\n**Considerations:**\n• Monitor for hyperchloremic metabolic acidosis (NAGMA)\n• If severe acidosis develops, may need to:\n  - Switch to LR\n  - Add bicarbonate supplementation\n• Check urine pH - if goal is alkalinization, may need bicarbonate\n\n**Same duration and monitoring as LR protocol.**',
        recommendation: 'NS is acceptable. Monitor for hyperchloremic acidosis with large volumes. Goal UOP 1-3 mL/kg/hr.',
        confidence: 'recommended',
        citation: [7, 8],
        treatment: {
            firstLine: {
                drug: 'Normal Saline 0.9%',
                dose: '1-2 L bolus, then 200-500 mL/hr',
                route: 'IV',
                frequency: 'Continuous',
                duration: 'Until CK <5,000 and trending down',
                notes: 'Monitor for hyperchloremic acidosis. May need bicarbonate if targeting urine alkalinization.',
            },
            monitoring: 'UOP q1-2h, BMP and CK q6-12h, chloride and bicarb levels.',
        },
    },
    {
        id: 'rhabdo-special-fluid',
        type: 'result',
        module: 4,
        title: 'Special Populations - Modified Fluid Strategy',
        body: '**Heart Failure:**\n• Cautious fluid resuscitation\n• Smaller boluses (250-500 mL), reassess frequently\n• Lower maintenance rates\n• Continuous pulse oximetry, consider POCUS for volume assessment\n• May need loop diuretics if volume overloaded\n• Nephrology consult for early dialysis consideration\n\n**ESRD / Dialysis Patients:**\n• Minimal to no IV fluids needed\n• Focus on dialysis for volume/toxin removal\n• Urgent nephrology consult\n• Watch for severe hyperkalemia\n\n**Elderly:**\n• Higher AKI risk\n• More cautious fluid resuscitation\n• Lower threshold for ICU admission\n\n**Pregnancy:**\n• Aggressive resuscitation similar to non-pregnant\n• Fetal monitoring\n• OB consultation',
        recommendation: 'Modify fluid strategy for CHF and ESRD. Early nephrology consultation recommended.',
        confidence: 'recommended',
        citation: [1, 8],
    },
    // =====================================================================
    // MODULE 5: ADJUNCTIVE THERAPIES & COMPLICATIONS
    // =====================================================================
    {
        id: 'rhabdo-bicarb',
        type: 'info',
        module: 5,
        title: 'Urine Alkalinization (Bicarbonate) - Evidence',
        body: '**The role of bicarbonate for urine alkalinization is CONTROVERSIAL.** [9]\n\n**Theory:**\n• Myoglobin is more soluble at alkaline pH\n• Alkaline urine may prevent myoglobin precipitation in tubules\n• Target urine pH >6.5\n\n**Evidence (2025 meta-analysis):** [9]\n• 5 studies analyzed\n• Urine alkalinization NOT significantly effective in:\n  - Preventing AKI (OR 2.11, p=0.3)\n  - Preventing acute renal failure (OR 1.26, p=0.36)\n  - Reducing dialysis need (OR 4.25, p=0.25)\n\n**Bottom line:**\n• **No definitive evidence that bicarbonate is superior to fluids alone**\n• Aggressive fluid resuscitation is the priority\n• Consider bicarbonate only if:\n  - Severe acidosis (pH <7.1)\n  - Very high CK (>30,000) without AKI/oliguria\n  - Not volume overloaded\n\n**If using bicarbonate:**\n• 150 mEq NaHCO3 in 1L D5W at 150-200 mL/hr\n• Target urine pH >6.5\n• Monitor serum pH, K, ionized Ca',
        citation: [9, 10],
        next: 'rhabdo-adjunct-choice',
    },
    {
        id: 'rhabdo-adjunct-choice',
        type: 'question',
        module: 5,
        title: 'Adjunctive Therapy Decisions',
        body: '**Based on clinical scenario, select appropriate adjunctive measures:**',
        options: [
            {
                label: 'Severe Acidosis (pH <7.1)',
                description: 'Consider bicarbonate therapy',
                next: 'rhabdo-bicarb-protocol',
            },
            {
                label: 'Oliguria Despite Fluids',
                description: 'Consider diuretics or dialysis',
                next: 'rhabdo-oliguria',
            },
            {
                label: 'No Additional Therapies Needed',
                description: 'Continue fluid resuscitation',
                next: 'rhabdo-monitoring',
            },
        ],
    },
    {
        id: 'rhabdo-bicarb-protocol',
        type: 'result',
        module: 5,
        title: 'Bicarbonate Protocol (If Used)',
        body: '**If bicarbonate therapy chosen:**\n\n**Indications (weak evidence):**\n• Severe acidosis (pH <7.1)\n• Very high CK (>30,000) WITHOUT oliguria/AKI\n• Adequate volume status\n\n**Protocol:**\n• [Sodium bicarbonate](#/drug/sodium-bicarbonate/rhabdomyolysis) 150 mEq in 1L D5W\n• Run at 150-200 mL/hr\n• Target urine pH >6.5\n\n**Monitoring:**\n• Urine pH q2-4h\n• Serum pH, bicarb, K, ionized calcium q4-6h\n\n**Contraindications:**\n• Hypocalcemia (bicarb worsens it)\n• Pulmonary edema/volume overload\n• Severe hypernatremia\n\n**Stop if:**\n• No improvement in urine output\n• Worsening hypocalcemia\n• Volume overload develops',
        recommendation: 'Bicarbonate not routinely recommended. If used, target urine pH >6.5. Monitor for hypocalcemia.',
        confidence: 'consider',
        citation: [9, 10],
        treatment: {
            firstLine: {
                drug: 'Sodium bicarbonate 8.4%',
                dose: '150 mEq in 1L D5W',
                route: 'IV',
                frequency: '150-200 mL/hr',
                duration: 'Until CK trending down or target pH achieved',
                notes: 'Controversial benefit. Monitor urine pH, serum Ca, K.',
            },
            monitoring: 'Urine pH q2-4h (goal >6.5), serum bicarb/pH/ionized Ca/K q4-6h.',
        },
    },
    {
        id: 'rhabdo-oliguria',
        type: 'result',
        module: 5,
        title: 'Oliguria Management',
        body: '**Oliguria (<0.5 mL/kg/hr) despite adequate fluid resuscitation:**\n\n**Step 1 - Ensure adequate volume:**\n• Reassess volume status (POCUS, CVP if available)\n• If hypovolemic, continue aggressive fluids\n\n**Step 2 - Consider loop diuretics:**\n• [Furosemide](#/drug/furosemide/rhabdomyolysis) 40-80 mg IV\n• May help maintain urine output and aid K excretion\n• **No evidence diuretics prevent AKI** - use for volume management\n\n**Step 3 - Nephrology consultation for dialysis:**\n\n**Dialysis indications:**\n• Refractory hyperkalemia (K >6.5 despite treatment)\n• Severe metabolic acidosis (pH <7.1 despite bicarb)\n• Volume overload unresponsive to diuretics\n• Uremic symptoms (encephalopathy, pericarditis)\n• Progressive AKI (Cr >4, rapidly rising)\n\n**Mannitol:**\n• Previously recommended, now generally NOT recommended\n• May worsen outcomes in established AKI\n• Only consider if compartment syndrome with ICP concerns',
        recommendation: 'Ensure adequate volume first. Loop diuretics for volume management. Early nephrology consult if oliguria persists. Dialysis for standard indications.',
        confidence: 'recommended',
        citation: [1, 8, 10],
        treatment: {
            firstLine: {
                drug: 'Furosemide',
                dose: '40-80 mg',
                route: 'IV',
                frequency: 'Once, then q6-12h PRN',
                duration: 'PRN for volume or K management',
                notes: 'Does not prevent AKI. Use for volume management or hyperkalemia.',
            },
            monitoring: 'UOP, K, creatinine, volume status. Nephrology consult if no improvement.',
        },
    },
    {
        id: 'rhabdo-monitoring',
        type: 'info',
        module: 5,
        title: 'Monitoring Protocol',
        body: '**Serial monitoring is essential:**\n\n**Labs:**\n• CK: q6-12h until clearly trending down\n• BMP (K, Cr, bicarb): q6-12h initially\n• Calcium, phosphorus, magnesium: q12-24h\n• Urine output: q1-2h (Foley catheter)\n\n**CK trending:**\n• Peak typically 24-72 hours\n• Should decline by 50% every 48-72 hours\n• Persistent or rising CK suggests ongoing injury\n\n**Volume status:**\n• Daily weights\n• Lung exam, JVD assessment\n• I/O balance\n\n**Compartment syndrome surveillance:**\n• In trauma/crush injury: serial exams q4-6h\n• Pain assessment, compartment palpation\n• Low threshold for pressure measurement\n\n**ECG:**\n• Repeat if K abnormal or changing',
        citation: [1, 2],
        next: 'rhabdo-complications',
    },
    {
        id: 'rhabdo-complications',
        type: 'info',
        module: 5,
        title: 'Complications to Monitor',
        body: '**Acute Kidney Injury (15-55%):**\n• Peak incidence with CK >15,000\n• Most common cause: myoglobin-induced ATN\n• Usually reversible with supportive care\n• 5-8% require dialysis (higher with severe CK elevation)\n\n**Hyperkalemia:**\n• Can be life-threatening\n• Monitor ECG for peaked T-waves, widened QRS\n• Treat aggressively (see hyperkalemia node)\n\n**Hypocalcemia (early):**\n• Usually asymptomatic, self-limited\n• Only treat if symptomatic\n\n**Hypercalcemia (late/recovery phase):**\n• Calcium mobilizes from damaged muscle\n• Usually self-limited\n\n**Compartment Syndrome:**\n• In crush injury, immobilization\n• Surgical emergency\n\n**DIC (rare):**\n• Check PT, PTT, fibrinogen, D-dimer if suspected\n• Supportive treatment\n\n**Cardiac arrhythmias:**\n• From electrolyte abnormalities\n• Continuous monitoring recommended',
        citation: [1, 2, 5],
        next: 'rhabdo-disposition',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'rhabdo-disposition',
        type: 'question',
        module: 6,
        title: 'Disposition Decision',
        body: '**Disposition based on severity, response to treatment, and comorbidities:**\n\n**McMahon Score ≥6:** Predicts need for RRT - consider ICU admission [3]\n\n**Score components:**\n• Age >70: 2 points\n• Female: 1 point\n• Initial CK >40,000: 2 points\n• Initial phosphate >4.0: 2 points\n• Initial calcium <7.5: 2 points\n• Initial creatinine elevated: 2 points\n• Initial bicarbonate <19: 2 points\n• Cause NOT exercise, seizure, syncope, statin, myositis: 3 points',
        citation: [3, 11],
        options: [
            {
                label: 'ICU Admission',
                description: 'Severe rhabdo, AKI, electrolyte derangements',
                next: 'rhabdo-icu-criteria',
                urgency: 'critical',
            },
            {
                label: 'Floor Admission',
                description: 'Moderate rhabdo, stable electrolytes',
                next: 'rhabdo-floor-admit',
            },
            {
                label: 'Observation/Discharge Consideration',
                description: 'Mild rhabdo, low risk features',
                next: 'rhabdo-discharge',
            },
        ],
    },
    {
        id: 'rhabdo-icu-criteria',
        type: 'result',
        module: 6,
        title: 'ICU Admission Criteria',
        body: '**ICU admission recommended for:**\n\n• **CK >50,000 U/L** (some use >100,000)\n• **AKI with oliguria** (<0.5 mL/kg/hr despite fluids)\n• **Life-threatening hyperkalemia** (K >6.5, arrhythmias)\n• **Severe metabolic acidosis** (pH <7.1)\n• **Compartment syndrome** (post-fasciotomy care)\n• **Need for dialysis or high likelihood**\n• **McMahon Score ≥6**\n• **Multiorgan dysfunction**\n• **Hemodynamic instability**\n\n**ICU goals:**\n• Close electrolyte monitoring (q4-6h)\n• Aggressive fluid management\n• Early dialysis if indicated\n• Continuous cardiac monitoring\n• Frequent reassessment for complications',
        recommendation: 'ICU for severe rhabdomyolysis with AKI, severe hyperkalemia, acidosis, or need for dialysis.',
        confidence: 'definitive',
        citation: [3, 8, 11],
    },
    {
        id: 'rhabdo-floor-admit',
        type: 'result',
        module: 6,
        title: 'Floor Admission',
        body: '**Floor admission appropriate for:**\n\n• Moderate CK (5,000-15,000) OR\n• Mild CK (1,000-5,000) with risk factors\n• Stable electrolytes (K <5.5, normal creatinine)\n• Adequate urine output on fluids\n• No compartment syndrome concern\n• McMahon Score <6\n\n**Floor management:**\n• IV fluids to maintain UOP 1-3 mL/kg/hr\n• BMP, CK q12h\n• Telemetry if K abnormal\n• Serial exams for compartment syndrome (if applicable)\n\n**Discharge criteria:**\n• CK trending down\n• CK <5,000 U/L (some use <10,000)\n• Normal or improving creatinine\n• Adequate oral intake\n• Stable electrolytes\n• Underlying cause addressed',
        recommendation: 'Floor admission for moderate rhabdomyolysis with stable electrolytes and adequate urine output.',
        confidence: 'recommended',
        citation: [11],
    },
    {
        id: 'rhabdo-discharge',
        type: 'result',
        module: 6,
        title: 'Observation or Discharge',
        body: '**Discharge may be considered if ALL criteria met:** [11]\n\n**Safe discharge criteria:**\n• CK <5,000 U/L (conservative: <10,000)\n• **CK is trending DOWN** after hydration\n• Normal creatinine (or baseline if CKD)\n• Normal potassium\n• Able to tolerate oral fluids\n• Underlying cause identified and addressed\n• Reliable follow-up available\n\n**Observation (6-12 hour) with discharge:**\n• CK 5,000-10,000 with normal renal function\n• Give 2-3L IV fluids\n• Recheck CK and creatinine\n• If improving: discharge with oral hydration instructions\n\n**Discharge instructions:**\n• Aggressive oral hydration (2-3 L/day)\n• Avoid strenuous exercise until fully recovered\n• Return for dark urine, decreased urination, muscle weakness\n• PCP/nephrology follow-up in 1-2 weeks\n• Recheck CK and BMP in 48-72 hours\n\n**Do NOT discharge if:**\n• CK still rising\n• Creatinine elevated or rising\n• Inadequate oral intake\n• No reliable follow-up',
        recommendation: 'Discharge if CK <5,000 and trending down, normal creatinine, and cause addressed. Aggressive oral hydration and close follow-up.',
        confidence: 'recommended',
        citation: [11],
    },
];
export const RHABDOMYOLYSIS_NODE_COUNT = RHABDOMYOLYSIS_NODES.length;
export const RHABDOMYOLYSIS_MODULE_LABELS = [
    'Recognition',
    'Etiology',
    'Workup',
    'Treatment',
    'Complications',
    'Disposition',
];
export const RHABDOMYOLYSIS_CITATIONS = [
    { num: 1, text: 'Bosch X, Poch E, Grau JM. Rhabdomyolysis and acute kidney injury. N Engl J Med. 2009;361(1):62-72.' },
    { num: 2, text: 'Chavez LO, et al. Creatine Kinase Elevations and Risk of Renal Failure and Dialysis in Patients With Rhabdomyolysis. Am J Med. 2025;138(1):45-52.' },
    { num: 3, text: 'McMahon GM, et al. A risk prediction score for kidney failure or mortality in rhabdomyolysis. JAMA Intern Med. 2013;173(19):1821-8.' },
    { num: 4, text: 'Voermans NC. A Clinical Approach to Rhabdomyolysis. Neuromuscul Disord. 2024;34(2):78-89.' },
    { num: 5, text: 'Schmidt AH. Acute compartment syndrome. Injury. 2017;48 Suppl 1:S22-S25.' },
    { num: 6, text: 'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-3251.' },
    { num: 7, text: 'Brown CV, et al. Rhabdomyolysis: an American Association for the Surgery of Trauma Critical Care Committee Clinical Consensus Document. Trauma Surg Acute Care Open. 2022;7(1):e000836.' },
    { num: 8, text: 'EB Medicine. Rhabdomyolysis: Evidence-Based Management in the Emergency Department. 2024.' },
    { num: 9, text: 'Ghahramani M, et al. The Role of Urine Alkalinization in Preventing Rhabdomyolysis-Induced Acute Kidney Injury: A Systematic Review and Meta-Analysis. J Clin Med. 2025;14(1):112.' },
    { num: 10, text: 'Scharman EJ, Troutman WG. Prevention of kidney injury following rhabdomyolysis: a systematic review. Ann Pharmacother. 2013;47(1):90-105.' },
    { num: 11, text: 'Fernandez WG, et al. Prediction of safe discharge of emergency department patients with acute rhabdomyolysis. Crit Care Med. 2005;33(5):926-927.' },
];
