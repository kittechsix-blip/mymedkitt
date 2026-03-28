// MedKitt - High-Flow Nasal Cannula (HFNC) Management
// Indications -> Device Setup -> Monitoring & ROX Index -> Escalation -> Special Populations -> Disposition
// 6 modules: Indications & Setup -> Device Settings -> Monitoring & ROX Index -> Escalation Criteria -> Special Populations -> Disposition
// 26 nodes total
export const HFNC_NODES = [
    // =====================================================================
    // MODULE 1: INDICATIONS & INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'hfnc-start',
        type: 'question',
        module: 1,
        title: 'High-Flow Nasal Cannula: Initial Assessment',
        body: '**High-Flow Nasal Cannula (HFNC)** delivers warmed, humidified gas at flow rates up to 60-70 L/min via nasal prongs. [1][2]\n\n**Key Physiological Benefits:** [1][3]\n- **High FiO2 delivery:** Near 100% at max settings (vs NRB ~60-70%)\n- **PEEP effect:** 3-5 cm H2O at 50-60 L/min (mouth closed)\n- **Dead space washout:** Reduces anatomic dead space, improves CO2 clearance\n- **Reduced work of breathing:** Even if SpO2 adequate, higher flow reduces WOB\n- **Patient comfort:** Allows eating, talking, prolonged use without nasal ulceration\n\n**Why abandon the NRB?** Standard NRB delivers only 10-15 L/min - insufficient for patients with elevated minute ventilation. Room air entrainment occurs, reducing actual FiO2 to 60-70%. [4]\n\n[ROX Index Calculator](#/calculator/rox)\n\nWhat is the clinical indication?',
        citation: [1, 2, 3, 4],
        calculatorLinks: [
            { id: 'rox-index', label: 'ROX Index Calculator' },
        ],
        options: [
            {
                label: 'Hypoxemic Respiratory Failure',
                description: 'PaO2/FiO2 <300, pneumonia, ARDS, COVID-19',
                next: 'hfnc-hypoxemic',
            },
            {
                label: 'Post-Extubation Support',
                description: 'Preventing reintubation after planned extubation',
                next: 'hfnc-post-extubation',
            },
            {
                label: 'Pre-Oxygenation / Apneic Oxygenation',
                description: 'RSI preparation, procedural sedation',
                next: 'hfnc-preoxygenation',
            },
            {
                label: 'CHF / Pulmonary Edema',
                description: 'Cardiogenic pulmonary edema, SCAPE',
                next: 'hfnc-chf',
            },
            {
                label: 'Immunocompromised Patient',
                description: 'Hematologic malignancy, transplant, HIV',
                next: 'hfnc-immunocompromised',
            },
        ],
    },
    {
        id: 'hfnc-hypoxemic',
        type: 'info',
        module: 1,
        title: 'HFNC for Hypoxemic Respiratory Failure',
        body: '**FLORALI Trial Evidence (Frat 2015):** [5]\n- 310 patients with acute hypoxemic respiratory failure (PaO2/FiO2 <300)\n- HFNC vs NIV vs standard O2\n- **No difference in intubation rate overall**\n- **Subgroup PaO2/FiO2 ≤200:** HFNC significantly reduced intubation (38% vs 47% vs 50%)\n- **90-day mortality:** HFNC 12% vs standard O2 23% vs NIV 28%\n\n**Why HFNC > NRB for severe hypoxemia:** [1][4]\n- NRB maxes at 10-15 L/min - patients with high minute ventilation entrain room air\n- HFNC at 60 L/min meets or exceeds patient inspiratory demand\n- Dead space washout improves ventilatory efficiency\n- PEEP effect recruits atelectatic lung\n\n**Key Principle:** HFNC is arguably **front-line therapy** for parenchymal lung disease (pneumonia, ARDS). The FLORALI trial showed superiority over NIV in acute lung injury. [1][5]',
        citation: [1, 4, 5],
        next: 'hfnc-setup',
    },
    {
        id: 'hfnc-post-extubation',
        type: 'info',
        module: 1,
        title: 'HFNC for Post-Extubation Support',
        body: '**Evidence for Post-Extubation HFNC:** [6][7]\n\n**Hernandez 2016 (High-Risk Patients):**\n- HFNC vs NIV in high-risk extubation patients\n- Non-inferior for reintubation at 72h (22.8% vs 19.1%)\n- Better tolerated, fewer complications\n\n**Maggiore 2014:**\n- HFNC at 50 L/min vs standard O2 post-extubation\n- Better oxygenation at all time points\n- Lower reintubation rate (4% vs 21%)\n\n**Current Practice:** [1][7]\n- HFNC preferred over standard O2 for most post-extubation patients\n- Consider NIV only for hypercapnic respiratory failure (COPD)\n- Start at 50-60 L/min immediately post-extubation\n- Wean flow as tolerated\n\n**Titration:** Increase flow rate as high as patient tolerates - higher flow = more dead space washout = less work of breathing.',
        citation: [1, 6, 7],
        next: 'hfnc-setup',
    },
    {
        id: 'hfnc-preoxygenation',
        type: 'info',
        module: 1,
        title: 'HFNC for Pre-Oxygenation & Apneic Oxygenation',
        body: '**Pre-Oxygenation for RSI:** [8][9]\n- Standard approach: NRB or BVM for 3-5 minutes\n- **HFNC advantage:** 60 L/min flow maintains high FiO2, washes out nitrogen\n- Can continue during laryngoscopy (apneic oxygenation)\n\n**Apneic Oxygenation:** [8]\n- Leave nasal cannula at 15-60 L/min during intubation attempt\n- Extends safe apnea time by 2-4 minutes\n- Particularly valuable in difficult airways\n\n**Evidence is Mixed:** [9]\n- FELLOW trial (2017): No difference in lowest SpO2 during intubation\n- However, sicker patients and those requiring multiple attempts may benefit\n\n**Practical Approach:**\n- Use standard NC at 15 L/min or HFNC at 60 L/min during laryngoscopy\n- Ensure head-up positioning (20-30 degrees)\n- Continue oxygen flow throughout attempt\n- Benefit most pronounced in patients with limited oxygen reserves',
        citation: [8, 9],
        next: 'hfnc-setup',
    },
    {
        id: 'hfnc-chf',
        type: 'info',
        module: 1,
        title: 'HFNC in CHF / Pulmonary Edema',
        body: '**HFNC vs CPAP/BiPAP in Cardiogenic Pulmonary Edema:**\n\n**Key Consideration:** CPAP/BiPAP provides higher PEEP (~10-15 cm H2O) vs HFNC (~3-5 cm H2O). For **SCAPE (Sympathetic Crashing Acute Pulmonary Edema)**, BiPAP remains first-line. [10]\n\n**When to Consider HFNC in CHF:**\n- Mild-moderate pulmonary edema (not SCAPE)\n- BiPAP intolerance (claustrophobia, facial trauma)\n- Post-diuresis maintenance\n- Bridge while setting up BiPAP\n\n**HFNC Settings for CHF:**\n- Start 40-60 L/min\n- FiO2 titrate to SpO2 92-96%\n- Monitor for improvement vs escalation need\n\n**Escalation Criteria:**\n- Persistent RR >30 despite HFNC\n- SpO2 <90% on HFNC 60 L/min, FiO2 100%\n- Worsening work of breathing\n- Accessory muscle use, tripoding\n\n**Transition to BiPAP** if not improving within 15-30 minutes. [10]\n\n[CHF Exacerbation Consult](#/tree/chf-exacerbation)',
        citation: [10],
        next: 'hfnc-setup',
    },
    {
        id: 'hfnc-immunocompromised',
        type: 'info',
        module: 1,
        title: 'HFNC in Immunocompromised Patients',
        body: '**Meta-Analysis Evidence (Azoulay 2010, Frat 2015):** [5][11]\n- Immunocompromised patients with ARF have high mortality\n- Intubation associated with increased mortality risk\n- Avoiding intubation improves outcomes\n\n**HFNC Advantages:** [11][12]\n- Reduced intubation rate vs standard O2 and NIV in meta-analyses\n- Better tolerated for prolonged periods\n- Allows oral intake and communication\n- Lower infection risk than NIV (no rebreathing)\n\n**Specific Populations:**\n- **Hematologic malignancy:** HFNC may delay or prevent intubation\n- **Post-transplant:** Consider infection control precautions\n- **HIV/AIDS:** Same indications as immunocompetent\n\n**COVID-19:** [12]\n- HFNC successful in ~53% of hospitalized COVID patients\n- ROX index predictive of success (>4.88 at 12h = good prognosis)\n- Mortality lower in HFNC responders\n- Aerosol generation concerns led to early NIV preference - now reconsidered\n\n**Caution:** Close monitoring essential - delayed intubation associated with worse outcomes.',
        citation: [5, 11, 12],
        next: 'hfnc-setup',
    },
    // =====================================================================
    // MODULE 2: DEVICE SETTINGS
    // =====================================================================
    {
        id: 'hfnc-setup',
        type: 'info',
        module: 2,
        title: 'HFNC Device Setup & Initial Settings',
        body: '**Equipment Components:** [1][2]\n- Air/oxygen blender (21-100% FiO2)\n- Heated humidifier (37C, 100% relative humidity)\n- Single heated-wire circuit\n- Large-bore nasal cannula (sized appropriately)\n\n**Initial Settings:**\n\n| Parameter | Starting Value | Titration |\n|-----------|---------------|------------|\n| Flow Rate | 30-40 L/min | Titrate to WOB (up to 60-70 L/min) |\n| FiO2 | 50-60% | Titrate to SpO2 92-96% |\n| Temperature | 37C | Can decrease to 34C if uncomfortable |\n\n**Flow Rate Principle:** [1]\n- Flow is titrated against **work of breathing** (respiratory rate, accessory muscle use)\n- Higher flow = more dead space washout = reduced ventilatory demand\n- Even if SpO2 adequate, increasing flow reduces WOB\n- For severe ARF: start at 60 L/min and titrate down\n\n**FiO2 Principle:**\n- Titrate against SpO2 via pulse oximetry\n- ABG unnecessary if pulse ox adequate\n- Target SpO2 92-96% (88-92% in COPD with chronic hypercapnia)\n\n**Nasal Cannula Fit:** Prongs should not occlude nares completely - allows for exhalation.',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'hfnc-settings', label: 'Initial Settings Guide' },
        ],
        next: 'hfnc-titration',
    },
    {
        id: 'hfnc-titration',
        type: 'info',
        module: 2,
        title: 'HFNC Titration Strategy',
        body: '**Flow Rate Titration:** [1][2]\n\n**Increasing Flow (20 -> 60 L/min):**\n- Primary benefit: Dead space washout, reduced WOB\n- Secondary benefit: Modest PEEP increase (~1 cm H2O per 10 L/min)\n- Oxygenation benefit minimal above baseline matching inspiratory demand\n\n**When to Increase Flow:**\n- RR >25 despite adequate SpO2\n- Accessory muscle use\n- Patient reports dyspnea\n- Speaking in short sentences\n\n**FiO2 Titration:**\n- Start 50-60% for moderate hypoxemia\n- Start 100% for severe hypoxemia, titrate down as able\n- Target SpO2 92-96% (avoid hyperoxia)\n\n**Temperature:**\n- 37C optimal for mucosal comfort and humidification\n- 34C if patient reports discomfort\n- Lower temperatures reduce humidification effectiveness\n\n**Weaning Parameters:** [1]\nPatient ready for standard NC when tolerating:\n- Flow 20 L/min\n- FiO2 50%\n- RR <25\n- No accessory muscle use\n\nTrial standard NC at 6 L/min (~40-50% FiO2).',
        citation: [1, 2],
        next: 'hfnc-comparison',
    },
    {
        id: 'hfnc-comparison',
        type: 'info',
        module: 2,
        title: 'HFNC vs NRB vs NIV Comparison',
        body: '**Comparison of Oxygen Delivery Devices:** [1][4]\n\n| Feature | Standard NC | NRB | HFNC | NIV |\n|---------|------------|-----|------|-----|\n| Max Flow | 6 L/min | 15 L/min | 60-70 L/min | N/A |\n| FiO2 | ~40% | ~60-70% | ~100% | ~100% |\n| PEEP | None | None | 3-5 cm H2O | 5-15 cm H2O |\n| Dead Space Washout | No | No | Yes | Variable |\n| Humidification | No | No | Yes (heated) | Yes |\n| Tolerability | Good | Fair | Good | Poor |\n| Eating/Talking | Yes | No | Yes | No |\n\n**Why NRB Should Be Abandoned:** [4]\n- Flow rate (10-15 L/min) insufficient for patients with high minute ventilation\n- Room air entrainment reduces actual FiO2 to 60-70%\n- Risk of CO2 rebreathing at low flow rates\n- Covers face, interferes with communication\n- Aspiration risk, pressure injury potential\n- **If patient needs NRB, they likely need HFNC or higher level of care**\n\n**Key Concept:** HFNC bridges the gap between standard O2 and NIV. For parenchymal lung disease (pneumonia, ARDS), HFNC may be superior to NIV.',
        citation: [1, 4],
        next: 'hfnc-rox-monitoring',
    },
    // =====================================================================
    // MODULE 3: MONITORING & ROX INDEX
    // =====================================================================
    {
        id: 'hfnc-rox-monitoring',
        type: 'info',
        module: 3,
        title: 'Monitoring on HFNC & ROX Index',
        body: '**Continuous Monitoring Parameters:** [1][13]\n- SpO2 (continuous pulse oximetry)\n- Respiratory rate\n- Heart rate\n- Work of breathing (accessory muscle use, nasal flaring)\n- Mental status\n- Ability to speak in sentences\n\n**The ROX Index:** [13][14]\nDeveloped to predict HFNC failure and need for intubation.\n\n**Formula:**\n```\nROX = (SpO2/FiO2) / Respiratory Rate\n```\n\n**Example:** SpO2 95%, FiO2 60% (0.60), RR 24\n- ROX = (95/60) / 24 = 1.58 / 24 = 0.066... Wait, that\'s wrong.\n- ROX = (SpO2/FiO2) / RR = (95/0.60) / 24 = 158.3 / 24 = **6.6**\n\n**Interpretation (at 12 hours):** [13][14]\n- **ROX ≥4.88:** Low risk of HFNC failure (~80% PPV for success)\n- **ROX <3.85:** High risk of HFNC failure (consider escalation)\n- **ROX 3.85-4.88:** Gray zone, close monitoring required\n\n[ROX Index Calculator](#/calculator/rox)',
        citation: [1, 13, 14],
        calculatorLinks: [
            { id: 'rox-index', label: 'ROX Index Calculator' },
        ],
        next: 'hfnc-rox-timing',
    },
    {
        id: 'hfnc-rox-timing',
        type: 'question',
        module: 3,
        title: 'ROX Index: Timing & Interpretation',
        body: '**ROX Index Timing:** [13][14]\n\n| Time Point | Failure Threshold | Success Threshold |\n|------------|-------------------|-------------------|\n| 2 hours | <2.85 | ≥4.88 |\n| 6 hours | <3.47 | ≥4.88 |\n| 12 hours | <3.85 | ≥4.88 |\n\n**Key Findings from ROX Validation:** [13]\n- Validated in FLORALI cohort\n- At 12-20 hours: PPV for success >80% if ROX ≥4.88\n- Gray zone (3.85-4.88) at 12h: only 11% of patients, 33% ultimately intubated\n\n**ROX-HR (Modified):** [15]\nSome centers incorporate heart rate:\n- ROX-HR = (ROX / HR) x 100\n- May improve predictive accuracy\n\n**Clinical Integration:**\n- Calculate ROX at 2, 6, and 12 hours\n- Trend is as important as absolute value\n- Declining ROX = concerning even if above threshold\n- ROX should not replace clinical judgment\n\nWhat is the current ROX index?',
        citation: [13, 14, 15],
        calculatorLinks: [
            { id: 'rox-index', label: 'ROX Index Calculator' },
        ],
        options: [
            {
                label: 'ROX ≥4.88 (Low Risk)',
                description: 'Continue HFNC, monitor for improvement',
                next: 'hfnc-success',
            },
            {
                label: 'ROX 3.85-4.88 (Gray Zone)',
                description: 'Close monitoring, reassess in 1-2 hours',
                next: 'hfnc-grayzone',
            },
            {
                label: 'ROX <3.85 (High Risk)',
                description: 'High risk of failure, consider escalation',
                next: 'hfnc-failure-criteria',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'hfnc-success',
        type: 'info',
        module: 3,
        title: 'HFNC Success - Continue & Wean',
        body: '**ROX ≥4.88 indicates low risk of HFNC failure** [13][14]\n\n**Continue Current Therapy:**\n- Maintain HFNC at current settings\n- Reassess ROX every 4-6 hours\n- Monitor for improvement vs stability\n\n**Signs of Improvement:**\n- RR decreasing (<25)\n- Able to speak in full sentences\n- Reduced accessory muscle use\n- SpO2 maintained on lower FiO2\n- Patient reports comfort\n\n**Weaning Strategy:** [1]\n1. **Wean FiO2 first** - target SpO2 92-96%\n2. **Then wean flow** - decrease by 10 L/min increments\n3. **Ready for standard NC when:** Flow 20 L/min + FiO2 50%\n4. **Trial standard NC** at 6 L/min\n5. **If tolerated 2-4 hours** - continue standard O2 or room air\n\n**Caution:** Do not wean too aggressively. HFNC failure after initial success associated with worse outcomes.',
        citation: [1, 13, 14],
        next: 'hfnc-disposition',
    },
    {
        id: 'hfnc-grayzone',
        type: 'info',
        module: 3,
        title: 'ROX Gray Zone - Close Monitoring',
        body: '**ROX 3.85-4.88 = Indeterminate Risk** [13]\n\nAt 12 hours, only 11% of patients fall in this zone. Among them, 33% ultimately required intubation.\n\n**Management:**\n1. **Optimize HFNC settings:**\n   - Increase flow to 60 L/min if not already\n   - Ensure FiO2 appropriate for target SpO2\n   - Check nasal cannula fit\n\n2. **Address reversible factors:**\n   - Secretion clearance\n   - Positioning (head of bed elevation)\n   - Treat underlying cause (antibiotics, bronchodilators)\n   - Ensure adequate analgesia if pain limiting breathing\n\n3. **Reassess in 1-2 hours:**\n   - Recalculate ROX\n   - Assess trend (improving vs worsening)\n   - Evaluate work of breathing\n\n4. **Escalation discussion:**\n   - Early ICU consult if not already in ICU\n   - Discuss intubation plan with patient/family\n   - Have NIV available as bridge if needed\n\n**Key Principle:** Gray zone patients require vigilance. Trend matters more than single value.',
        citation: [13],
        next: 'hfnc-rox-timing',
    },
    // =====================================================================
    // MODULE 4: ESCALATION CRITERIA
    // =====================================================================
    {
        id: 'hfnc-failure-criteria',
        type: 'info',
        module: 4,
        title: 'HFNC Failure Criteria',
        body: '**Clinical Signs of HFNC Failure:** [1][13][14]\n\n**ROX Index:**\n- ROX <2.85 at 2 hours\n- ROX <3.47 at 6 hours\n- ROX <3.85 at 12 hours\n- Declining ROX despite optimization\n\n**Clinical Indicators:**\n- **RR >35** despite maximal HFNC\n- **SpO2 <88%** on HFNC 60 L/min, FiO2 100%\n- **Accessory muscle use** - sternocleidomastoid recruitment\n- **Paradoxical abdominal breathing**\n- **Altered mental status** - confusion, agitation, somnolence\n- **Inability to speak** in sentences\n- **Hemodynamic instability** - requiring vasopressors\n- **Copious secretions** patient cannot clear\n\n**Risk of Delayed Intubation:** [16]\n- Prolonged HFNC trial before intubation associated with worse outcomes\n- HFNC success/failure usually apparent within 24-48 hours\n- If no improvement by 24-48 hours, strongly consider escalation\n\n**Key Message:** HFNC failure is not a failure of the modality - it is recognition that the patient needs more support. Early recognition prevents adverse outcomes.',
        citation: [1, 13, 14, 16],
        calculatorLinks: [
            { id: 'hfnc-escalation', label: 'Failure Criteria Checker' },
        ],
        next: 'hfnc-escalation-options',
    },
    {
        id: 'hfnc-escalation-options',
        type: 'question',
        module: 4,
        title: 'Escalation Options',
        body: '**When HFNC Fails, Options Include:** [1][2]\n\n**1. Non-Invasive Ventilation (NIV/BiPAP):**\n- Higher PEEP (10-15 cm H2O vs 3-5 cm H2O)\n- Pressure support reduces WOB further\n- Best for: COPD, CHF, mild-moderate ARDS\n- Caution: May delay necessary intubation\n\n**2. Intubation & Mechanical Ventilation:**\n- Definitive airway protection\n- Full ventilatory support\n- Required for: altered mental status, inability to protect airway, refractory hypoxemia, hemodynamic instability\n\n**ERS Guidelines Recommendation:** [2]\n- HFNC suggested over NIV for acute hypoxemic respiratory failure (weak recommendation)\n- NIV suggested over HFNC for acute hypercapnic respiratory failure (COPD)\n\n**Decision Framework:**\n- If failure due to hypoxemia alone and patient protecting airway: Trial NIV\n- If failure with altered mental status or hemodynamic instability: Intubate\n- If failure with hypercapnia (COPD): NIV preferred\n\nSelect escalation pathway:',
        citation: [1, 2],
        options: [
            {
                label: 'Trial NIV/BiPAP',
                description: 'Protecting airway, no hemodynamic instability',
                next: 'hfnc-niv-trial',
            },
            {
                label: 'Proceed to Intubation',
                description: 'AMS, hemodynamic instability, or NIV failure',
                next: 'hfnc-intubation',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'hfnc-niv-trial',
        type: 'info',
        module: 4,
        title: 'Transition to NIV',
        body: '**NIV Settings After HFNC Failure:** [1][2]\n\n**Initial BiPAP Settings:**\n- IPAP: 12-16 cm H2O\n- EPAP: 8-10 cm H2O\n- FiO2: 100% initially, titrate down\n- Rise time: 150-200 ms\n\n**CPAP (for CHF):**\n- Start 8-10 cm H2O\n- Titrate up to 15-20 cm H2O as needed\n- FiO2 to maintain SpO2 92-96%\n\n**Monitoring on NIV:**\n- Reassess within 1-2 hours\n- If no improvement, proceed to intubation\n- Do not delay intubation for prolonged NIV trial\n\n**Contraindications to NIV:**\n- Altered mental status (GCS <10)\n- Hemodynamic instability\n- Copious secretions\n- Facial trauma or surgery\n- High aspiration risk\n- Inability to cooperate\n\n**Failure of NIV:** If no improvement within 1-2 hours or any contraindication develops, proceed to intubation immediately.',
        citation: [1, 2],
        next: 'hfnc-disposition',
    },
    {
        id: 'hfnc-intubation',
        type: 'info',
        module: 4,
        title: 'Intubation After HFNC Failure',
        body: '**Intubation Considerations:** [1][8]\n\n**Pre-Intubation Optimization:**\n- Continue HFNC during preparation (apneic oxygenation benefit)\n- Head-up positioning 20-30 degrees\n- Preoxygenate 3-5 minutes at max HFNC settings\n- Have vasopressors ready (push-dose epinephrine or norepinephrine)\n\n**Induction Agent Selection:**\n- **Ketamine:** 1-2 mg/kg IV - preserves hemodynamics, bronchodilation\n- **Etomidate:** 0.3 mg/kg IV - hemodynamically neutral\n- **Propofol:** 1-2 mg/kg IV - caution with hypotension\n\n**Apneic Oxygenation:** [8]\n- Leave nasal cannula (standard or HFNC) at 15-60 L/min during attempt\n- Extends safe apnea time\n\n**Post-Intubation:**\n- Lung-protective ventilation (6-8 mL/kg IBW)\n- PEEP titration per ARDSNet or driving pressure\n- Target SpO2 92-96%, avoid hyperoxia\n- Early sedation optimization\n\n[Push-Dose Pressors](#/tree/push-dose-pressors)',
        citation: [1, 8],
        next: 'hfnc-disposition',
    },
    // =====================================================================
    // MODULE 5: SPECIAL POPULATIONS
    // =====================================================================
    {
        id: 'hfnc-copd',
        type: 'info',
        module: 5,
        title: 'HFNC in COPD',
        body: '**COPD Considerations:** [2][17]\n\n**Traditional Teaching:** NIV is first-line for COPD exacerbation with hypercapnia.\n\n**Emerging Role of HFNC in COPD:**\n- May be effective for mild-moderate exacerbations\n- Better tolerated than NIV for prolonged use\n- Dead space washout improves CO2 clearance\n- Less effective than NIV for severe hypercapnia (pH <7.25)\n\n**ROX Index in COPD:** [17]\n- ROX index was developed in pneumonia patients\n- Predictive value less clear in COPD\n- Use clinical judgment alongside ROX\n\n**When to Use HFNC in COPD:**\n- Mild hypercapnia (pH >7.35, PCO2 45-55)\n- NIV intolerance\n- Stable COPD with hypoxemia\n- Weaning from NIV\n\n**When to Use NIV in COPD:**\n- Moderate-severe hypercapnia (pH <7.35, PCO2 >55)\n- COPD-CHF overlap with pulmonary edema\n- Prior successful NIV use\n\n**Key Point:** Do not use HFNC as substitute for NIV in severe hypercapnic respiratory failure.',
        citation: [2, 17],
        next: 'hfnc-disposition',
    },
    {
        id: 'hfnc-obesity',
        type: 'info',
        module: 5,
        title: 'HFNC in Obesity',
        body: '**Obese Patients Present Unique Challenges:** [1][2]\n\n**Physiological Considerations:**\n- Reduced FRC due to abdominal pressure on diaphragm\n- Increased atelectasis, especially when supine\n- Higher oxygen consumption\n- Difficult airway risk if intubation needed\n\n**HFNC Benefits in Obesity:**\n- PEEP effect helps recruit atelectatic lung\n- Better tolerated than NIV mask on obese face\n- Continuous O2 delivery during apneic periods\n\n**Positioning:** [1]\n- **Reverse Trendelenburg** or sitting upright essential\n- Supine position worsens atelectasis and hypoxemia\n- 30-45 degree head elevation minimum\n\n**HFNC Settings:**\n- Higher flow rates often needed (50-70 L/min)\n- FiO2 titrate to SpO2 92-96%\n\n**Escalation Threshold:**\n- Lower threshold for NIV trial due to atelectasis component\n- BiPAP may recruit lung more effectively\n- Early intubation if needed - difficult airway anticipated\n\n**Key Point:** Positioning is critical in obese patients. Reverse Trendelenburg dramatically improves oxygenation.',
        citation: [1, 2],
        next: 'hfnc-disposition',
    },
    {
        id: 'hfnc-pediatrics',
        type: 'info',
        module: 5,
        title: 'HFNC in Pediatric Patients',
        body: '**Pediatric HFNC Applications:** [18]\n\n**Bronchiolitis:**\n- Most studied pediatric indication\n- HFNC reduces need for ICU admission\n- May prevent intubation in moderate-severe bronchiolitis\n\n**Flow Rate by Age:**\n| Age | Starting Flow | Max Flow |\n|-----|--------------|----------|\n| Infant | 2 L/kg/min | 2 L/kg/min (max ~8 L/min) |\n| 1-5 years | 1-2 L/kg/min | Up to 20-25 L/min |\n| >5 years | 1 L/kg/min | Up to 50 L/min |\n\n**Pediatric Considerations:**\n- Smaller nasal cannula sizes available\n- Temperature tolerance varies (may need 34C)\n- Close monitoring essential (children decompensate quickly)\n- Family anxiety - explain device and expected sounds\n\n**Failure Indicators:**\n- Increasing RR or WOB after 1-2 hours\n- Declining mental status\n- Poor feeding\n- Apnea\n\n**Note:** Pediatric ROX index not well validated - use clinical judgment.',
        citation: [18],
        next: 'hfnc-disposition',
    },
    {
        id: 'hfnc-dnr-comfort',
        type: 'info',
        module: 5,
        title: 'HFNC in DNR/Comfort Care',
        body: '**HFNC as Comfort Measure:** [1]\n\n**Advantages for Comfort Care:**\n- Reduces dyspnea without invasive intervention\n- Allows communication with family\n- Permits oral intake\n- More comfortable than NRB mask\n- Maintains dignity\n\n**Settings for Comfort:**\n- Titrate to patient comfort, not SpO2 goals\n- Lower flow rates may be sufficient\n- Humidity provides comfort for dry airways\n\n**Goals of Care Discussion:**\n- HFNC is **not** life-sustaining in same way as intubation\n- Can be consistent with comfort-focused care\n- Clarify that HFNC does not prevent natural death from respiratory failure\n- Can be discontinued if patient declines further\n\n**Family Expectations:**\n- Explain device will ease breathing but not cure disease\n- Patient can still speak, eat, interact\n- May provide time for family presence\n- Death from respiratory failure will still occur if that is disease trajectory\n\n**Documentation:** Clearly document goals of care, HFNC rationale, and that this is consistent with comfort-focused approach.',
        citation: [1],
        next: 'hfnc-disposition',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'hfnc-disposition',
        type: 'result',
        module: 6,
        title: 'HFNC Disposition Recommendations',
        body: '**ICU Admission Criteria:** [1][2]\n- HFNC flow >40 L/min + FiO2 >50%\n- ROX <4.88 at any time point\n- Concern for impending respiratory failure\n- Hemodynamic instability\n- Need for frequent reassessment\n- Post-intubation care\n\n**Step-Down/Telemetry:**\n- Stable on HFNC ≤40 L/min, FiO2 ≤50%\n- ROX >4.88 and stable/improving\n- No hemodynamic concerns\n- Underlying cause being treated\n\n**Floor (if HFNC available):**\n- Weaning HFNC with plan for standard O2\n- Low risk for deterioration\n- Some hospitals have floor HFNC protocols\n\n**Discharge Considerations:**\n- Rarely discharged directly from ED on HFNC\n- Home HFNC exists but requires careful patient selection\n- Ensure standard O2 needs can be met at home\n- Follow-up with pulmonology within 1 week',
        recommendation: 'Disposition based on HFNC settings, ROX index, hemodynamic stability, and trajectory. ICU for high FiO2/flow requirements or ROX <4.88. Step-down for stable patients with improving trajectory. Ensure monitoring capability matches patient acuity.',
        confidence: 'recommended',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'rox-index', label: 'ROX Index Calculator' },
        ],
    },
    {
        id: 'hfnc-summary',
        type: 'info',
        module: 6,
        title: 'HFNC Quick Reference',
        body: '**HFNC Key Points Summary:**\n\n**Indications:**\n- Hypoxemic respiratory failure (PaO2/FiO2 <300)\n- Post-extubation support\n- Pre-oxygenation/apneic oxygenation\n- Immunocompromised with ARF\n- NIV intolerance\n\n**Initial Settings:**\n- Flow: 30-60 L/min (titrate to WOB)\n- FiO2: 50-100% (titrate to SpO2 92-96%)\n- Temperature: 37C (decrease if uncomfortable)\n\n**ROX Index:**\n- Formula: (SpO2/FiO2) / RR\n- Success: ≥4.88 at 2, 6, or 12 hours\n- Failure: <2.85 (2h), <3.47 (6h), <3.85 (12h)\n\n**When to Escalate:**\n- ROX below thresholds\n- RR >35 despite max HFNC\n- SpO2 <88% on max settings\n- Altered mental status\n- Hemodynamic instability\n\n**Key Principle:** HFNC is front-line for parenchymal lung disease. Higher flow = less work of breathing, even if SpO2 is adequate. Abandon the NRB.',
        citation: [1, 2, 4, 5, 13],
        calculatorLinks: [
            { id: 'rox-index', label: 'ROX Index Calculator' },
        ],
    },
];
// =====================================================================
// MODULE LABELS
// =====================================================================
export const HFNC_MODULE_LABELS = [
    'Indications & Assessment',
    'Device Settings',
    'Monitoring & ROX Index',
    'Escalation Criteria',
    'Special Populations',
    'Disposition',
];
export const HFNC_NODE_COUNT = 23;
// =====================================================================
// CITATIONS
// =====================================================================
export const HFNC_CITATIONS = [
    {
        num: 1,
        text: 'Farkas J. Noninvasive Respiratory Support. Internet Book of Critical Care (IBCC). EMCrit. 2025.',
    },
    {
        num: 2,
        text: 'Oczkowski S, Ergan B, Bos L, et al. ERS Clinical Practice Guidelines: High-Flow Nasal Cannula in Acute Respiratory Failure. Eur Respir J. 2022;59(4):2101574.',
    },
    {
        num: 3,
        text: 'Nishimura M. High-Flow Nasal Cannula Oxygen Therapy in Adults: Physiological Benefits, Indication, Clinical Benefits, and Adverse Effects. Respir Care. 2016;61(4):529-541.',
    },
    {
        num: 4,
        text: 'Weingart SD. Why the Nonrebreather Should Be Abandoned. ACEP Now. 2024.',
    },
    {
        num: 5,
        text: 'Frat JP, Thille AW, Mercat A, et al. High-Flow Oxygen Through Nasal Cannula in Acute Hypoxemic Respiratory Failure (FLORALI). N Engl J Med. 2015;372(23):2185-2196.',
    },
    {
        num: 6,
        text: 'Hernandez G, Vaquero C, Colinas L, et al. Effect of Postextubation High-Flow Nasal Cannula vs Noninvasive Ventilation on Reintubation and Postextubation Respiratory Failure in High-Risk Patients. JAMA. 2016;316(15):1565-1574.',
    },
    {
        num: 7,
        text: 'Maggiore SM, Idone FA, Vaschetto R, et al. Nasal High-Flow versus Venturi Mask Oxygen Therapy After Extubation. Am J Respir Crit Care Med. 2014;190(3):282-288.',
    },
    {
        num: 8,
        text: 'Weingart SD. High-Flow Nasal Cannula for Apneic Oxygenation. PulmCrit (EMCrit). 2015.',
    },
    {
        num: 9,
        text: 'Semler MW, Janz DR, Lentz RJ, et al. Randomized Trial of Apneic Oxygenation During Endotracheal Intubation of the Critically Ill (FELLOW). Am J Respir Crit Care Med. 2016;193(3):273-280.',
    },
    {
        num: 10,
        text: 'Weingart SD. EMCrit IBCC: Sympathetic Crashing Acute Pulmonary Edema (SCAPE). emcrit.org/ibcc/scape. 2024.',
    },
    {
        num: 11,
        text: 'Cortegiani A, Crimi C, Sanfilippo F, et al. High Flow Nasal Therapy in Immunocompromised Patients with Acute Respiratory Failure: A Systematic Review and Meta-Analysis. J Crit Care. 2019;50:250-256.',
    },
    {
        num: 12,
        text: 'Davis MD. 2023 Year in Review: High-Flow Nasal Cannula for COVID-19. Respir Care. 2024;69(12):1599-1608.',
    },
    {
        num: 13,
        text: 'Roca O, Caralt B, Messika J, et al. An Index Combining Respiratory Rate and Oxygenation to Predict Outcome of Nasal High-Flow Therapy. Am J Respir Crit Care Med. 2019;199(11):1368-1376.',
    },
    {
        num: 14,
        text: 'Roca O, Messika J, Caralt B, et al. Predicting Success of High-Flow Nasal Cannula in Pneumonia Patients with Hypoxemic Respiratory Failure: The Utility of the ROX Index. J Crit Care. 2016;35:200-205.',
    },
    {
        num: 15,
        text: 'Goh KJ, Chai HZ, Ong TH, et al. Early Prediction of High Flow Nasal Cannula Therapy Outcomes Using a Modified ROX Index Incorporating Heart Rate. PLoS One. 2020;15(8):e0236629.',
    },
    {
        num: 16,
        text: 'Kang BJ, Koh Y, Lim CM, et al. Failure of High-Flow Nasal Cannula Therapy May Delay Intubation and Increase Mortality. Intensive Care Med. 2015;41(4):623-632.',
    },
    {
        num: 17,
        text: 'Schaeffer BZ, Fazio SA, Stocking JC, et al. Using the ROX Index to Predict Treatment Outcome for High-Flow Nasal Cannula and/or Noninvasive Ventilation in Patients With COPD Exacerbations. Respir Care. 2024;69(12):1599-1608.',
    },
    {
        num: 18,
        text: 'Milesi C, Boubal M, Jacquot A, et al. High-Flow Nasal Cannula: Recommendations for Daily Practice in Pediatrics. Ann Intensive Care. 2014;4:29.',
    },
];
