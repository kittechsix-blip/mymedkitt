// MedKitt — Heat Stroke
// Recognition → Cooling → Resuscitation → Complications → Disposition
// 5 modules: Recognition → Rapid Cooling → Resuscitation → Complications → Disposition
// 22 nodes total.
export const HEAT_STROKE_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'hs-start',
        type: 'info',
        module: 1,
        title: 'Heat Stroke Management',
        body: '**Heat stroke is a TRUE EMERGENCY** — mortality 10-50% without rapid cooling. Every minute of delay increases mortality.\n\n**Definition:** Core temperature >40°C (104°F) + CNS dysfunction (altered mental status, seizures, coma).\n\n**Two types:**\n• **Classic (non-exertional):** Elderly, chronic illness, medications, heat waves\n• **Exertional:** Young healthy athletes, laborers, military [1][2][3]',
        citation: [1, 2, 3],
        calculatorLinks: [
            { id: 'heat-index', label: 'Heat Index Calculator' },
            { id: 'cooling-rate', label: 'Cooling Rate Monitor' },
            { id: 'rhabdo-risk', label: 'Rhabdo Risk Score' },
            { id: 'fluid-calculator', label: 'Fluid Calculator' },
        ],
        next: 'hs-recognize',
    },
    {
        id: 'hs-recognize',
        type: 'question',
        module: 1,
        title: 'Heat Illness Classification',
        body: '**Heat stroke criteria (BOTH required):**\n• Core temp >40°C (104°F) — use rectal or esophageal thermometry\n• CNS dysfunction (confusion, delirium, seizures, coma)\n\n**Heat exhaustion:**\n• Core temp <40°C\n• May have symptoms (headache, nausea, weakness) but **normal mentation**\n\n**CRITICAL:** Oral, axillary, and temporal thermometry are UNRELIABLE in heat illness — use rectal temp. [1][2][3]',
        citation: [1, 2, 3],
        options: [
            {
                label: 'Heat stroke — temp >40°C + AMS',
                next: 'hs-cooling-start',
                urgency: 'critical',
            },
            {
                label: 'Heat exhaustion — temp <40°C, normal mentation',
                next: 'hs-exhaustion',
            },
            {
                label: 'Uncertain — borderline temp or subtle AMS',
                next: 'hs-cooling-start',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'hs-exhaustion',
        type: 'result',
        module: 1,
        title: 'Heat Exhaustion Management',
        body: '**Heat exhaustion is NOT heat stroke** — but can progress rapidly.\n\n**Treatment:**\n• Move to cool environment\n• Remove excess clothing\n• Oral rehydration if tolerating PO\n• IV NS if unable to tolerate PO or severely symptomatic\n• External cooling (cool water misting, fans)\n\n**Monitor closely:** Any mental status change → reclassify as heat stroke. [2][3]',
        recommendation: 'Heat exhaustion — supportive care with cooling and rehydration. Close monitoring for progression.',
        confidence: 'recommended',
        citation: [2, 3],
        treatment: {
            firstLine: {
                drug: 'Oral rehydration',
                dose: '1-2 L over 1-2 hours',
                route: 'PO',
                frequency: 'As tolerated',
                duration: 'Until symptoms resolve',
                notes: 'Electrolyte solution preferred. IV NS if unable to tolerate PO.',
            },
            monitoring: 'Serial temp checks, mental status assessment every 15-30 minutes',
        },
    },
    // =====================================================================
    // MODULE 2: RAPID COOLING
    // =====================================================================
    {
        id: 'hs-cooling-start',
        type: 'info',
        module: 2,
        title: 'Immediate Cooling — TIME IS CRITICAL',
        body: '**"Cool first, transport second"** — begin cooling IMMEDIATELY. [1]\n\n**Target:** Core temp <39°C (102.2°F) within 30 minutes.\n• Mortality near-zero if cooled within 30 min\n• Mortality >50% if cooling delayed >2 hours [1][2]\n\n**Remove all clothing** and begin aggressive cooling while simultaneously establishing IV access and monitoring.\n\n**Do NOT delay cooling for:**\n• IV access\n• Labs\n• Imaging\n• Transport [1][3]',
        citation: [1, 2, 3],
        next: 'hs-cooling-method',
    },
    {
        id: 'hs-cooling-method',
        type: 'question',
        module: 2,
        title: 'Cooling Method Selection',
        body: '**Cold water immersion (CWI) is GOLD STANDARD** — cooling rate 0.2°C/min (fastest). [1][2]\n\n**Ice water immersion:** Patient submerged in ice water bath up to neck.\n• Best for exertional heat stroke\n• May be difficult in elderly or obese\n\n**Evaporative cooling:** Continuous water misting + high-flow fans.\n• More practical in ED setting\n• Cooling rate 0.1°C/min\n\n**What resources are available?** [1][2][3]',
        citation: [1, 2, 3],
        options: [
            {
                label: 'Ice water immersion available',
                next: 'hs-immersion',
                urgency: 'critical',
            },
            {
                label: 'Evaporative cooling (mist + fans)',
                next: 'hs-evaporative',
                urgency: 'critical',
            },
            {
                label: 'Limited resources — ice packs only',
                next: 'hs-ice-packs',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'hs-immersion',
        type: 'info',
        module: 2,
        title: 'Ice Water Immersion Protocol',
        body: '**GOLD STANDARD — cooling rate 0.2°C/min** [1][2]\n\n**Setup:**\n• Large tub/tank filled with ice water (1-17°C / 34-63°F)\n• Submerge patient to neck level\n• Continuous agitation of water (prevents thermal boundary layer)\n• Assign staff to hold patient\'s head above water\n\n**Monitoring during immersion:**\n• Continuous rectal temperature probe\n• **Stop immersion at 39°C (102.2°F)** — temp will continue to drift down\n• Cardiac monitoring (waterproof leads or pause briefly for rhythm check)\n\n**Shivering is NOT a contraindication** — shivering generates heat but CWI cooling rate still exceeds heat generation. [1]',
        citation: [1, 2],
        next: 'hs-cooling-endpoint',
        treatment: {
            firstLine: {
                drug: 'Ice water immersion',
                dose: 'Submerge to neck in 1-17°C water',
                route: 'External',
                frequency: 'Continuous with agitation',
                duration: 'Until core temp reaches 39°C',
                notes: 'Stop at 39°C — temp will continue to drift down. Assign staff for head support.',
            },
            monitoring: 'Continuous rectal temp probe, cardiac monitoring. Target: <39°C within 30 min.',
        },
    },
    {
        id: 'hs-evaporative',
        type: 'info',
        module: 2,
        title: 'Evaporative Cooling Protocol',
        body: '**Second-line if immersion unavailable — cooling rate ~0.1°C/min** [2][3]\n\n**Setup:**\n• Undress patient completely\n• Continuously spray lukewarm water (not ice cold) over entire body\n• High-flow fans directed at patient\n• Keep skin WET at all times\n\n**Physics:** Evaporation of water removes heat. Lukewarm water evaporates faster than ice-cold water.\n\n**Adjuncts:**\n• Ice packs to axillae, groin, neck (large vessels)\n• Cold IV fluids (4°C NS) — helpful but not primary cooling\n• Cooling blankets [2][3]',
        citation: [2, 3],
        next: 'hs-cooling-endpoint',
        treatment: {
            firstLine: {
                drug: 'Evaporative cooling',
                dose: 'Continuous lukewarm water spray + fans',
                route: 'External',
                frequency: 'Continuous',
                duration: 'Until core temp reaches 39°C',
                notes: 'Keep skin wet at all times. Add ice packs to axillae, groin, neck.',
            },
            alternative: {
                drug: 'Cold IV saline',
                dose: '4°C NS 500-1000 mL bolus',
                route: 'IV',
                frequency: 'PRN',
                duration: 'Adjunct to external cooling',
                notes: 'Helpful adjunct but NOT sufficient as sole cooling method.',
            },
            monitoring: 'Continuous rectal temp. Target: <39°C within 30 min.',
        },
    },
    {
        id: 'hs-ice-packs',
        type: 'info',
        module: 2,
        title: 'Ice Pack Cooling (Suboptimal)',
        body: '**LEAST effective method — cooling rate ~0.05°C/min** [2]\n\n**If this is all you have:**\n• Place ice packs to axillae, groin, neck, and entire torso\n• Wet sheets over patient + fans\n• Cold IV fluids (4°C NS)\n• Rotate ice packs frequently (they warm up)\n\n**Consider transfer** to facility with immersion or evaporative capability if cooling is inadequate.\n\n**Avoid:**\n• Cooling blankets alone (too slow)\n• Antipyretics ([Acetaminophen](#/drug/acetaminophen/heat stroke) and NSAIDs are USELESS — thermoregulatory setpoint is normal) [1][2]',
        citation: [1, 2],
        next: 'hs-cooling-endpoint',
        treatment: {
            firstLine: {
                drug: 'Ice packs',
                dose: 'To axillae, groin, neck, entire torso',
                route: 'External',
                frequency: 'Rotate frequently as they warm',
                duration: 'Until core temp reaches 39°C',
                notes: 'Least effective method. Consider transfer if inadequate cooling.',
            },
            monitoring: 'Continuous rectal temp. Target: <39°C within 30 min — may not be achievable with this method.',
        },
    },
    {
        id: 'hs-cooling-endpoint',
        type: 'info',
        module: 2,
        title: 'Cooling Endpoint & Overshoot Prevention',
        body: '**Stop active cooling at core temp 39°C (102.2°F)** [1][2]\n\n**Why 39°C?**\n• Temperature will continue to drift down after cooling stops (afterdrop)\n• Overcooling → shivering → heat generation → rebound hyperthermia\n• Hypothermia (<35°C) causes coagulopathy and arrhythmias\n\n**After reaching 39°C:**\n• Remove from ice bath / stop misting\n• Dry patient\n• Cover with light sheet\n• Continue rectal temp monitoring every 5-15 min\n\n**If temp rebounds >39°C:** Resume cooling. [1]',
        citation: [1, 2],
        next: 'hs-resuscitation',
    },
    // =====================================================================
    // MODULE 3: RESUSCITATION
    // =====================================================================
    {
        id: 'hs-resuscitation',
        type: 'info',
        module: 3,
        title: 'Fluid Resuscitation',
        body: '**Heat stroke causes SIGNIFICANT volume depletion** — hypovolemia, vasodilation, and third-spacing. [2][3]\n\n**Initial resuscitation:**\n• NS or LR 1-2 L bolus (adult)\n• Pediatric: 20 mL/kg bolus\n• Avoid dextrose-containing fluids initially\n\n**Goal:** MAP >65 mmHg, UOP >0.5 mL/kg/hr\n\n**Caution:**\n• Pulmonary edema can occur with aggressive fluids + capillary leak\n• POCUS-guided resuscitation preferred\n• If hypotensive despite 2-3 L fluids → consider vasopressors [2][3]',
        citation: [2, 3],
        next: 'hs-airway',
        treatment: {
            firstLine: {
                drug: 'Normal saline or Lactated Ringer',
                dose: '1-2 L bolus (adult) / 20 mL/kg (pediatric)',
                route: 'IV',
                frequency: 'Repeat PRN for hypotension',
                duration: 'Until euvolemic',
                notes: 'POCUS-guided. Caution with aggressive fluids — risk of pulmonary edema.',
            },
            monitoring: 'MAP >65, UOP >0.5 mL/kg/hr. POCUS for fluid responsiveness.',
        },
    },
    {
        id: 'hs-airway',
        type: 'question',
        module: 3,
        title: 'Airway & Ventilation',
        body: '**Indications for intubation:**\n• GCS ≤8 or unable to protect airway\n• Refractory seizures\n• Severe agitation requiring deep sedation\n• Respiratory failure\n\n**Considerations:**\n• RSI drugs: Avoid succinylcholine if rhabdomyolysis suspected (hyperkalemia risk)\n• Use rocuronium for paralysis\n• Cooling MUST continue during/after intubation [2]',
        citation: [2],
        options: [
            {
                label: 'Airway intact — GCS >8, protecting airway',
                next: 'hs-seizures',
            },
            {
                label: 'Needs intubation',
                next: 'hs-intubation',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'hs-intubation',
        type: 'info',
        module: 3,
        title: 'Intubation Considerations',
        body: '**RSI for heat stroke:**\n\n**Induction:** [Ketamine](#/drug/ketamine/heat stroke) 1-2 mg/kg IV or [Propofol](#/drug/propofol/heat stroke) 1-2 mg/kg IV\n\n**Paralysis:** [Rocuronium](#/drug/rocuronium/heat stroke) 1.2 mg/kg IV\n• **AVOID succinylcholine** — hyperkalemia risk with rhabdomyolysis\n\n**Post-intubation:**\n• Continue active cooling\n• Target normocapnia (avoid hyperventilation)\n• Sedation: propofol or midazolam + fentanyl [2]',
        citation: [2],
        next: 'hs-seizures',
        treatment: {
            firstLine: {
                drug: 'Rocuronium',
                dose: '1.2 mg/kg',
                route: 'IV',
                frequency: 'Once for RSI',
                duration: 'Single dose',
                notes: 'AVOID succinylcholine — hyperkalemia risk with rhabdomyolysis.',
            },
            monitoring: 'Continue active cooling post-intubation. Target normocapnia.',
        },
    },
    {
        id: 'hs-seizures',
        type: 'question',
        module: 3,
        title: 'Seizure Management',
        body: '**Seizures are common in heat stroke** — direct thermal brain injury + metabolic derangements.\n\nSeizures generate heat and worsen hyperthermia — must be controlled rapidly. [2][3]',
        citation: [2, 3],
        options: [
            {
                label: 'No seizures',
                next: 'hs-complications',
            },
            {
                label: 'Active seizures',
                next: 'hs-seizure-rx',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'hs-seizure-rx',
        type: 'info',
        module: 3,
        title: 'Seizure Treatment',
        body: '**First-line:** [Midazolam](#/drug/midazolam/heat stroke) 0.2 mg/kg IV or IM (max 10 mg)\n\n**Alternative:** [Lorazepam](#/drug/lorazepam/heat stroke) 0.1 mg/kg IV (max 4 mg)\n\n**If refractory:**\n• [Propofol](#/drug/propofol/heat stroke) infusion or\n• [Phenobarbital](#/drug/phenobarbital/heat stroke) 20 mg/kg IV\n\n**Avoid phenytoin/fosphenytoin** — may worsen hyperthermia and is less effective for toxin-induced seizures.\n\n**Continue aggressive cooling** — seizures generate significant heat. [2][3]',
        citation: [2, 3],
        next: 'hs-complications',
        treatment: {
            firstLine: {
                drug: 'Midazolam',
                dose: '0.2 mg/kg IV or IM (max 10 mg)',
                route: 'IV or IM',
                frequency: 'May repeat in 5 minutes',
                duration: 'Until seizures controlled',
                notes: 'IM route useful if no IV access. Continue cooling.',
            },
            alternative: {
                drug: 'Lorazepam',
                dose: '0.1 mg/kg IV (max 4 mg)',
                route: 'IV',
                frequency: 'May repeat in 5 minutes',
                duration: 'Until seizures controlled',
                notes: 'Alternative to midazolam. Avoid phenytoin.',
            },
            monitoring: 'Respiratory status, continue cooling. EEG if refractory.',
        },
    },
    // =====================================================================
    // MODULE 4: COMPLICATIONS
    // =====================================================================
    {
        id: 'hs-complications',
        type: 'info',
        module: 4,
        title: 'Heat Stroke Complications',
        body: '**Multi-organ dysfunction is common** — heat stroke is a systemic inflammatory response. [1][2][3]\n\n**Common complications:**\n• **Rhabdomyolysis** — CK >5x normal, especially exertional\n• **AKI** — from hypovolemia, rhabdomyolysis, direct thermal injury\n• **DIC** — coagulopathy, bleeding\n• **Hepatic failure** — can be delayed 24-72 hours\n• **ARDS** — from capillary leak\n• **Cardiac dysfunction** — arrhythmias, myocardial injury\n\n**Labs to order:**\n• CBC, CMP, LFTs, coags, lactate\n• CK (repeat q6-12h if elevated)\n• UA with myoglobin\n• ABG/VBG [2][3]',
        citation: [1, 2, 3],
        next: 'hs-rhabdo',
    },
    {
        id: 'hs-rhabdo',
        type: 'question',
        module: 4,
        title: 'Rhabdomyolysis Assessment',
        body: '**Rhabdomyolysis is common in EXERTIONAL heat stroke** — less common in classic.\n\n**Risk factors:**\n• Exertional heat stroke (military, athletes)\n• Prolonged hyperthermia\n• Seizures\n• Agitation requiring restraint\n\n**CK thresholds:**\n• >5x ULN (>1000 U/L) = rhabdomyolysis\n• >10,000 U/L = high risk for AKI\n• >40,000 U/L = very high risk [2][3]',
        citation: [2, 3],
        options: [
            {
                label: 'CK <5000 — low rhabdo risk',
                next: 'hs-coags',
            },
            {
                label: 'CK 5000-40,000 — moderate rhabdo',
                next: 'hs-rhabdo-rx',
                urgency: 'urgent',
            },
            {
                label: 'CK >40,000 — severe rhabdo',
                next: 'hs-rhabdo-severe',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'hs-rhabdo-rx',
        type: 'info',
        module: 4,
        title: 'Rhabdomyolysis Treatment',
        body: '**Goal: Prevent myoglobin-induced AKI** [2][3]\n\n**IV fluids:**\n• Aggressive NS or LR — target UOP 200-300 mL/hr\n• May need 10-20 L/day in severe cases\n• POCUS-guided to avoid overload\n\n**Urine alkalinization:**\n• Controversial — consider if urine pH <6.5\n• NaHCO3 150 mEq in 1L D5W at 200 mL/hr\n• Target urine pH >6.5\n\n**Monitor:**\n• CK every 6-12 hours until trending down\n• Creatinine, potassium (hyperkalemia risk)\n• Compartment syndrome in extremities [2][3]',
        citation: [2, 3],
        next: 'hs-coags',
        treatment: {
            firstLine: {
                drug: 'Crystalloid (NS or LR)',
                dose: 'Target UOP 200-300 mL/hr',
                route: 'IV',
                frequency: 'Continuous',
                duration: 'Until CK trending down',
                notes: 'May need 10-20 L/day in severe cases. POCUS-guided.',
            },
            alternative: {
                drug: 'Sodium bicarbonate',
                dose: '150 mEq in 1L D5W',
                route: 'IV at 200 mL/hr',
                frequency: 'Titrate to urine pH >6.5',
                duration: 'Until urine pH >6.5',
                notes: 'Controversial. Consider if urine pH <6.5.',
            },
            monitoring: 'CK q6-12h, Cr, K+. Watch for compartment syndrome.',
        },
    },
    {
        id: 'hs-rhabdo-severe',
        type: 'info',
        module: 4,
        title: 'Severe Rhabdomyolysis',
        body: '**CK >40,000 — high risk for AKI and dialysis** [2]\n\n**Management:**\n• Same as moderate rhabdo but more aggressive fluids\n• Early nephrology consult\n• Consider dialysis if:\n  - Refractory hyperkalemia (K+ >6.5)\n  - Severe metabolic acidosis\n  - Volume overload despite diuresis\n  - Anuria\n\n**Monitor for compartment syndrome:**\n• Pain out of proportion\n• Pain with passive stretch\n• Tense compartments\n• → Emergent fasciotomy if present [2]',
        citation: [2],
        next: 'hs-coags',
        treatment: {
            firstLine: {
                drug: 'Aggressive crystalloid',
                dose: 'Target UOP 200-300 mL/hr',
                route: 'IV',
                frequency: 'Continuous',
                duration: 'Until CK trending down or dialysis initiated',
                notes: 'Early nephrology consult. May need emergent dialysis.',
            },
            monitoring: 'CK q6h, Cr, K+, ABG. Continuous cardiac monitoring for hyperkalemia.',
        },
    },
    {
        id: 'hs-coags',
        type: 'info',
        module: 4,
        title: 'Coagulopathy & DIC',
        body: '**DIC is common in severe heat stroke** — direct thermal injury to endothelium + systemic inflammation. [2][3]\n\n**Labs:**\n• PT/INR, PTT, fibrinogen, D-dimer\n• Platelet count\n\n**Treatment:**\n• Supportive — treat underlying heat stroke\n• FFP if INR >2 AND bleeding\n• Platelets if <50,000 AND bleeding\n• Cryoprecipitate if fibrinogen <100 AND bleeding\n• TXA 1g IV if significant hemorrhage\n\n**Do NOT give platelets or FFP prophylactically** without active bleeding. [2]',
        citation: [2, 3],
        next: 'hs-disposition',
    },
    // =====================================================================
    // MODULE 5: DISPOSITION
    // =====================================================================
    {
        id: 'hs-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: '**ALL heat stroke patients require admission** — multi-organ dysfunction can be delayed 24-72 hours. [2][3]\n\nAssess severity to determine level of care.',
        citation: [2, 3],
        options: [
            {
                label: 'Rapid cooling achieved, stable, mild organ dysfunction',
                next: 'hs-admit-floor',
            },
            {
                label: 'Ongoing hypotension, significant organ dysfunction',
                next: 'hs-admit-icu',
                urgency: 'urgent',
            },
            {
                label: 'Intubated, vasopressors, or refractory',
                next: 'hs-admit-icu',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'hs-admit-floor',
        type: 'result',
        module: 5,
        title: 'Admit — Monitored Bed',
        body: '**Telemetry/step-down admission criteria:**\n• Cooled to <39°C within 30 minutes\n• Hemodynamically stable off vasopressors\n• GCS returned to baseline\n• No significant rhabdomyolysis (CK <10,000)\n• No active seizures\n\n**Monitoring:**\n• Continuous temp monitoring x 24h\n• Serial labs: CMP, LFTs, CK q12h\n• Neuro checks q4h\n• Watch for delayed hepatic failure (24-72h) [2][3]',
        recommendation: 'Admit to telemetry/step-down unit. Continue monitoring for delayed complications.',
        confidence: 'recommended',
        citation: [2, 3],
    },
    {
        id: 'hs-admit-icu',
        type: 'result',
        module: 5,
        title: 'ICU Admission',
        body: '**ICU admission criteria:**\n• Intubated or requiring airway protection\n• Vasopressor requirement\n• Severe rhabdomyolysis (CK >40,000)\n• DIC with active bleeding\n• Persistent altered mental status\n• Refractory hyperthermia\n• Multi-organ failure\n\n**ICU management:**\n• Continue temp monitoring (may have rebound hyperthermia)\n• Aggressive fluid resuscitation\n• Serial labs q6h: CMP, LFTs, CK, coags, lactate\n• Nephrology consult if AKI progressing\n• Consider targeted temperature management if refractory [2][3]',
        recommendation: 'ICU admission for ongoing critical care. High risk for multi-organ dysfunction.',
        confidence: 'definitive',
        citation: [2, 3],
    },
];
export const HEAT_STROKE_NODE_COUNT = HEAT_STROKE_NODES.length;
export const HEAT_STROKE_MODULE_LABELS = [
    'Recognition',
    'Rapid Cooling',
    'Resuscitation',
    'Complications',
    'Disposition',
];
export const HEAT_STROKE_CRITICAL_ACTIONS = [
    { text: 'Aggressive cooling: target core temp <39°C within 30 min (prevents end-organ damage)', nodeId: 'heat-cool-target' },
    { text: 'Evaporative cooling: mist + fans (fastest non-invasive method, 0.3°C/min)', nodeId: 'heat-evap' },
    { text: 'Ice water immersion if available (0.15-0.35°C/min) - stop at 38.5-39°C', nodeId: 'heat-immersion' },
    { text: 'Cold IV saline 1-2L (4°C) + ice packs to groin/axillae/neck', nodeId: 'heat-cold-fluids' },
    { text: 'Benzodiazepines for agitation/shivering (lorazepam 2-4 mg IV)', nodeId: 'heat-benzos' },
    { text: 'Avoid antipyretics (aspirin/acetaminophen) - ineffective and may worsen coagulopathy', nodeId: 'heat-avoid-antipyretics' },
    { text: 'Monitor for rhabdomyolysis: CK, myoglobin, aggressive IVF if CK >5000', nodeId: 'heat-rhabdo' },
    { text: 'Check DIC labs: PT/INR, fibrinogen, platelets (common complication)', nodeId: 'heat-dic' },
];
export const HEAT_STROKE_CITATIONS = [
    { num: 1, text: 'Farkas J. Heat stroke. Internet Book of Critical Care (EMCrit/IBCC). September 2024.' },
    { num: 2, text: 'Lipman GS, Gaudio FG, et al. Wilderness Medical Society Clinical Practice Guidelines for the Prevention and Treatment of Heat Illness: 2019 Update. Wilderness Environ Med. 2019;30(4S):S33-S46.' },
    { num: 3, text: 'Leon LR, Bouchama A. Heat stroke. Compr Physiol. 2015;5(2):611-647.' },
    { num: 4, text: 'Epstein Y, Yanovich R. Heatstroke. N Engl J Med. 2019;380(25):2449-2459.' },
    { num: 5, text: 'Casa DJ, McDermott BP, Lee EC, et al. Cold water immersion: the gold standard for exertional heatstroke treatment. Exerc Sport Sci Rev. 2007;35(3):141-149.' },
    { num: 6, text: 'Bouchama A, Knochel JP. Heat stroke. N Engl J Med. 2002;346(25):1978-1988.' },
];
