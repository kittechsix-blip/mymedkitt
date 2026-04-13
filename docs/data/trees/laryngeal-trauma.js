// MedKitt — Laryngeal Trauma
// Critical Airway Decision: Don't Paralyze → Trach preferred over intubation
// 6 modules: Recognition → Airway Decision → Classification → Imaging → Management → Disposition
// ~26 nodes total.
export const LARYNGEAL_TRAUMA_CRITICAL_ACTIONS = [
    { text: 'Do NOT paralyze - RSI is contraindicated', nodeId: 'larynx-start' },
    { text: 'Awake tracheostomy preferred over intubation', nodeId: 'larynx-unstable-airway' },
    { text: 'ENT/surgery consult immediately for hard signs', nodeId: 'larynx-unstable-airway' },
    { text: 'CT neck with contrast for stable patients', nodeId: 'larynx-imaging' },
    { text: 'Flexible laryngoscopy by ENT for all suspected injuries', nodeId: 'larynx-stable-management' },
    { text: 'Schaefer-Fuhrman grading guides surgical timing', nodeId: 'larynx-classification' },
];
export const LARYNGEAL_TRAUMA_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'larynx-start',
        type: 'info',
        module: 1,
        title: 'Laryngeal Trauma',
        body: '**Rare but lethal** — second most common cause of death in head/neck trauma after intracranial injury [1]\n\n**Incidence:** 1:5,000 to 1:137,000 trauma patients\n\n**CRITICAL WARNING:**\n> **RSI is CONTRAINDICATED** in suspected laryngeal trauma.\n> Paralysis removes spontaneous ventilation. If intubation fails → CICO catastrophe.\n> **Awake tracheostomy is preferred.** [1][2]',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'schaefer-fuhrman', label: 'Schaefer-Fuhrman Grading' },
            { id: 'laryngeal-airway', label: 'Airway Decision Tool' },
        ],
        next: 'larynx-mechanism',
        summary: 'Laryngeal trauma: airway loss can be rapid and unpredictable — prepare for surgical airway immediately',
        safetyLevel: 'critical',
    },
    {
        id: 'larynx-mechanism',
        type: 'info',
        module: 1,
        title: 'Mechanism of Injury',
        body: '**Blunt Trauma:**\n• Motor vehicle accidents (historically most common, reduced with seatbelts/airbags)\n• **Clothesline injuries** — rider strikes horizontal object; high-velocity crush against C-spine; often cricotracheal separation + bilateral RLN injury\n• Direct blows — assault, sports, steering wheel impact\n• **Strangulation/hanging** — compression of all neck structures [1][3]\n\n**Penetrating Trauma:**\n• Knife wounds, gunshot wounds\n• Higher risk of vascular injury\n• Often requires emergent surgical exploration [1]',
        citation: [1, 3],
        next: 'larynx-signs',
        summary: 'Blunt (clothesline, MVC, strangulation) vs penetrating — both can rapidly compromise airway',
    },
    {
        id: 'larynx-signs',
        type: 'question',
        module: 1,
        title: 'Clinical Signs Assessment',
        body: '**HARD SIGNS (immediate concern):**\n| Sign | Significance |\n|------|-------------|\n| Stridor | Active airway compromise |\n| Respiratory distress | Impending obstruction |\n| Subcutaneous emphysema | Mucosal disruption |\n| Loss of thyroid prominence | Cartilage fracture |\n| Hemoptysis | Mucosal laceration |\n| Expanding hematoma | Vascular injury |\n\n**SOFT SIGNS:**\n• Dysphonia/hoarseness (most common — 85%)\n• Dysphagia, odynophagia\n• Anterior neck tenderness/ecchymosis\n• Bony crepitus on palpation\n• Aphonia (complete vocal cord dysfunction) [1][2]',
        citation: [1, 2],
        options: [
            {
                label: 'Hard signs present — unstable airway',
                next: 'larynx-unstable-airway',
                urgency: 'critical',
            },
            {
                label: 'Soft signs only — stable airway',
                next: 'larynx-flex-laryngoscopy',
                urgency: 'urgent',
            },
            {
                label: 'Asymptomatic with mechanism',
                next: 'larynx-observation',
            },
        ],
        summary: 'Hoarseness, subcutaneous emphysema, stridor, dysphagia, anterior neck tenderness = laryngeal injury',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 2: AIRWAY DECISION
    // =====================================================================
    {
        id: 'larynx-unstable-airway',
        type: 'info',
        module: 2,
        title: 'Unstable Airway — Immediate Action',
        body: '**CRITICAL: DO NOT PARALYZE**\n\n**RSI is contraindicated:**\n• Paralysis removes spontaneous ventilation\n• If intubation fails → no backup (can\'t mask, can\'t wake)\n• Laryngeal manipulation can create false passage or complete obstruction\n• Risk of "can\'t intubate, can\'t oxygenate" (CICO) [1][2]\n\n**Preferred approach:**\n1. **Awake tracheostomy** (surgical airway of choice)\n2. Call anesthesia, ENT, trauma surgery NOW\n3. Prepare surgical airway kit at bedside',
        citation: [1, 2],
        next: 'larynx-airway-options',
        summary: 'Airway distress: prepare for surgical airway — intubation may worsen injury or create false passage',
        safetyLevel: 'critical',
    },
    {
        id: 'larynx-airway-options',
        type: 'question',
        module: 2,
        title: 'Airway Options',
        body: '| Option | When to Use | Cautions |\n|--------|-------------|----------|\n| **Awake tracheostomy** | PREFERRED for significant laryngeal trauma | Requires time, OR access |\n| **Awake fiberoptic** | Stable airway, need to assess before trach | Blood/secretions obscure; slow |\n| **Cricothyrotomy** | Emergent CICO, cannot wait | CONTRAINDICATED if laryngeal fracture or cricotracheal separation |\n| **RSI/DL** | AVOID in laryngeal trauma | Risk of false passage, worsening injury |\n\nWhat resources are available?',
        citation: [1, 2],
        options: [
            {
                label: 'ENT/anesthesia available → awake trach',
                next: 'larynx-awake-trach',
            },
            {
                label: 'Emergent CICO — no time for trach',
                next: 'larynx-crico-decision',
                urgency: 'critical',
            },
            {
                label: 'Stabilize with awake fiberoptic first',
                next: 'larynx-awake-foi',
                urgency: 'urgent',
            },
        ],
        summary: 'Airway approach depends on stability: awake FOI, awake trach, or emergent surgical airway',
        safetyLevel: 'critical',
    },
    {
        id: 'larynx-awake-trach',
        type: 'info',
        module: 2,
        title: 'Awake Tracheostomy',
        body: '**Procedure:**\n1. Local anesthesia to anterior neck\n2. Patient maintains spontaneous ventilation\n3. Vertical incision, identify trachea below injury\n4. Confirm placement with ETCO₂, breath sounds\n\n**Double setup:**\nHave both ENT and anesthesia present. Prepare simultaneously for:\n• Awake fiberoptic intubation\n• Awake tracheostomy\n\n**Post-trach:** Continue resuscitation, CT imaging when stable [1][2]',
        citation: [1, 2],
        next: 'larynx-imaging',
        summary: 'Awake tracheostomy is gold standard for laryngeal trauma airway — avoids passing through injury site',
        safetyLevel: 'critical',
    },
    {
        id: 'larynx-crico-decision',
        type: 'question',
        module: 2,
        title: 'Cricothyrotomy Decision',
        body: '**CRICOTHYROTOMY CONTRAINDICATIONS:**\n• Laryngeal fracture\n• Laryngotracheal disruption\n• Tracheal transection\n\nIn these cases → proceed directly to **tracheostomy BELOW the injury** [1][2]\n\nIs there suspected laryngeal fracture or tracheal disruption?',
        citation: [1, 2],
        options: [
            {
                label: 'Yes — fracture/disruption suspected',
                next: 'larynx-emergent-trach',
                urgency: 'critical',
            },
            {
                label: 'No — cric may be appropriate',
                next: 'larynx-cric-proceed',
                urgency: 'critical',
            },
        ],
        summary: 'Cricothyrotomy risks further laryngeal damage — tracheostomy preferred if any time available',
        safetyLevel: 'critical',
    },
    {
        id: 'larynx-emergent-trach',
        type: 'info',
        module: 2,
        title: 'Emergent Tracheostomy',
        body: '**When cricothyrotomy is contraindicated:**\n\nProceed directly to tracheostomy **below the level of injury**.\n\n**Technique (emergent):**\n1. Vertical midline incision from cricoid to sternal notch\n2. Blunt dissection to trachea\n3. Identify intact trachea below injury\n4. Incision between tracheal rings\n5. Insert trach tube, confirm with ETCO₂\n\n**If tracheal transection:** May need to retrieve distal trachea from mediastinum [1]',
        citation: [1],
        next: 'larynx-imaging',
        summary: 'Emergent tracheostomy by ENT/surgery when airway is failing — cricothyrotomy as absolute last resort',
        safetyLevel: 'critical',
    },
    {
        id: 'larynx-cric-proceed',
        type: 'info',
        module: 2,
        title: 'Cricothyrotomy Technique',
        body: '**Standard surgical cricothyrotomy:**\n1. Identify cricothyroid membrane\n2. Vertical skin incision\n3. Horizontal stab through membrane\n4. Bougie insertion\n5. 6.0 ETT or trach tube over bougie\n6. Confirm with ETCO₂\n\n**Post-procedure:**\n• Secure airway\n• Continue trauma evaluation\n• CT imaging when stable\n• ENT consult for definitive management [1]',
        citation: [1],
        next: 'larynx-imaging',
        summary: 'Cricothyrotomy only if cannot ventilate and trach not immediately available — may worsen injury',
        safetyLevel: 'critical',
    },
    {
        id: 'larynx-awake-foi',
        type: 'info',
        module: 2,
        title: 'Awake Fiberoptic Intubation',
        body: '**Indications:**\n• Stable airway but concern for laryngeal injury\n• Need to assess before tracheostomy decision\n\n**Technique:**\n1. Topicalize airway (lidocaine nebulizer, atomizer)\n2. Maintain spontaneous ventilation\n3. Advance fiberoptic scope through nose or mouth\n4. Assess laryngeal injury\n5. If passable → advance ETT\n6. If not passable → proceed to tracheostomy\n\n**Have surgical airway kit ready** — prepared to convert if needed [2]',
        citation: [2],
        next: 'larynx-imaging',
        summary: 'Awake fiberoptic intubation: visualize injury, pass tube under direct vision — if anatomy allows',
    },
    {
        id: 'larynx-flex-laryngoscopy',
        type: 'info',
        module: 2,
        title: 'Flexible Laryngoscopy',
        body: '**Performed early in stable patients:**\n• Assesses mucosal integrity, hematoma, vocal cord mobility\n• Can miss injuries masked by edema (repeat after swelling resolves)\n\n**Findings that suggest significant injury:**\n• Mucosal lacerations\n• Vocal cord immobility\n• Arytenoid dislocation\n• Epiglottic hematoma\n• Exposed cartilage\n\n**If normal:** Proceed to CT imaging [1][2]',
        citation: [1, 2],
        next: 'larynx-imaging',
        summary: 'Bedside flexible laryngoscopy by ENT to assess injury severity and guide airway management',
    },
    // =====================================================================
    // MODULE 3: CLASSIFICATION
    // =====================================================================
    {
        id: 'larynx-classification',
        type: 'info',
        module: 3,
        title: 'Schaefer-Fuhrman Classification',
        body: '| Grade | Findings | Airway |\n|-------|----------|--------|\n| **I** | Minor hematoma/laceration, no fracture | Stable |\n| **II** | Edema, hematoma, nondisplaced fracture, minor mucosal disruption | Variable |\n| **III** | Massive edema, displaced fractures, exposed cartilage, vocal cord immobility | Compromised |\n| **IV** | Severe disruption, unstable fractures, extensive mucosal injury, anterior commissure involvement | Severely compromised |\n| **V** | Complete laryngotracheal separation | Critical |\n\n**Epidemiology:**\n• Grade I: 52% of cases\n• Grade II: 37-45%\n• Grades III-V: Minority but highest morbidity/mortality [1][2]',
        citation: [1, 2],
        next: 'larynx-management-by-grade',
        summary: 'Schaefer-Fuhrman classification grades I-V guides management: observation vs OR vs emergent airway',
    },
    // =====================================================================
    // MODULE 4: IMAGING
    // =====================================================================
    {
        id: 'larynx-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging Studies',
        body: '**CT Neck with IV Contrast (Gold Standard):**\n• Only perform if airway is stable or secured\n• Identifies: soft tissue edema, hematoma, cartilage fractures, cricoarytenoid dislocation\n• Low threshold for imaging — subtle CT findings may indicate significant injury [1]\n\n**CT Angiography:**\n• Add for penetrating trauma or suspected vascular injury\n• Assess carotid/vertebral dissection\n\n**Direct Laryngoscopy + Esophagoscopy:**\n• Performed in OR after airway secured\n• Complete assessment of endolaryngeal and esophageal injuries [1][2]',
        citation: [1, 2],
        next: 'larynx-classification',
        summary: 'CT neck with contrast for stable patients — assess cartilage fractures, soft tissue injury, vascular',
    },
    // =====================================================================
    // MODULE 5: MANAGEMENT
    // =====================================================================
    {
        id: 'larynx-management-by-grade',
        type: 'question',
        module: 5,
        title: 'Management by Grade',
        body: '**Key principle:** Early repair (24-48h) yields better outcomes:\n• Early: 58% good voice, 87% good airway\n• Delayed (>48h): 22% good voice, 55% good airway [1][2]\n\nWhat is the injury grade?',
        citation: [1, 2],
        options: [
            {
                label: 'Grade I — minor injury',
                next: 'larynx-grade1',
            },
            {
                label: 'Grade II — moderate injury',
                next: 'larynx-grade2',
                urgency: 'urgent',
            },
            {
                label: 'Grade III-IV — severe injury',
                next: 'larynx-grade34',
                urgency: 'critical',
            },
            {
                label: 'Grade V — laryngotracheal separation',
                next: 'larynx-grade5',
                urgency: 'critical',
            },
        ],
        summary: 'Grade I-II: observation. Grade III-IV: OR repair within 24h. Grade V: emergent surgical airway',
    },
    {
        id: 'larynx-grade1',
        type: 'result',
        module: 5,
        title: 'Grade I — Conservative Management',
        body: '**Treatment:**\n• Humidified air\n• Voice rest\n• Head of bed elevation\n• [Dexamethasone](#/drug/dexamethasone/laryngeal) 10 mg IV + nebulized steroids\n• Anti-reflux medications (PPI or H2 blocker)\n• Antibiotics if mucosal disruption\n\n**Monitoring:**\n• ICU observation 24-48 hours\n• Serial flexible laryngoscopy\n• Watch for delayed edema/hematoma expansion [1]',
        recommendation: 'Conservative management with steroids, voice rest, humidified air. ICU observation 24-48h.',
        confidence: 'recommended',
        citation: [1],
        treatment: {
            firstLine: {
                drug: 'Dexamethasone',
                dose: '10 mg IV',
                route: 'IV',
                frequency: 'Q8 hours',
                duration: '24-48 hours',
                notes: 'Add nebulized steroids. Voice rest, humidified air.',
            },
            monitoring: 'Serial laryngoscopy, watch for progression',
        },
        summary: 'Grade I: minor edema, no fracture — observe 24h with humidified air, HOB elevated, voice rest',
        skippable: true,
    },
    {
        id: 'larynx-grade2',
        type: 'result',
        module: 5,
        title: 'Grade II — Conservative or Surgical',
        body: '**Usually conservative (same as Grade I):**\n• Humidified air, voice rest, HOB elevation\n• IV dexamethasone + nebulized steroids\n• Anti-reflux, antibiotics if mucosal disruption\n\n**May require tracheostomy if:**\n• Significant airway compromise develops\n• Edema progression despite steroids\n\n**Close monitoring:**\n• ICU observation\n• Serial exams for progression\n• Some may need surgical exploration [1][2]',
        recommendation: 'Conservative management. May require tracheostomy if airway compromises. ICU observation.',
        confidence: 'recommended',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Dexamethasone',
                dose: '10 mg IV',
                route: 'IV',
                frequency: 'Q8 hours',
                duration: '24-48 hours',
                notes: 'Tracheostomy if airway compromises',
            },
            monitoring: 'Serial exams, ICU observation, watch for progression',
        },
        summary: 'Grade II: edema with non-displaced fracture — admit, observe, ENT follow-up within 24h',
        skippable: true,
    },
    {
        id: 'larynx-grade34',
        type: 'result',
        module: 5,
        title: 'Grade III-IV — Surgical Management',
        body: '**Surgical approach:**\n1. **Secure airway** (tracheostomy preferred)\n2. CT imaging if not already done\n3. Direct laryngoscopy + esophagoscopy in OR\n4. **Open repair:** ORIF of displaced fractures, mucosal repair\n5. Thyrotomy approach for endolaryngeal access\n6. Laryngeal stent if anterior commissure involvement\n\n**Timing:** Ideally within **24-48 hours** [1][2]\n\n**Consults:**\n• ENT (primary)\n• Trauma surgery\n• Anesthesia (airway management)',
        recommendation: 'Surgical management within 24-48 hours. Tracheostomy, ORIF of fractures, mucosal repair.',
        confidence: 'definitive',
        citation: [1, 2],
        summary: 'Grade III-IV: displaced fractures, exposed cartilage — OR exploration and repair within 24h',
        safetyLevel: 'warning',
    },
    {
        id: 'larynx-grade5',
        type: 'result',
        module: 5,
        title: 'Grade V — Laryngotracheal Separation',
        body: '**EMERGENT SURGICAL MANAGEMENT:**\n\n1. **Immediate tracheostomy** below level of injury\n2. Emergent surgical repair in OR\n3. Primary anastomosis if possible\n4. Highest mortality category\n\n**Special considerations:**\n• May need to retrieve distal trachea from mediastinum\n• Risk of bilateral RLN injury\n• Associated c-spine injury common [1][2]',
        recommendation: 'Emergent tracheostomy below injury, immediate surgical repair. Highest mortality category.',
        confidence: 'definitive',
        citation: [1, 2],
        summary: 'Grade V: complete laryngeal disruption — emergent surgical airway and OR reconstruction',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION & ASSOCIATED INJURIES
    // =====================================================================
    {
        id: 'larynx-observation',
        type: 'info',
        module: 6,
        title: 'Asymptomatic Patient Observation',
        body: '**Delayed presentation warning:**\n• Initially mild symptoms may accompany severe injury\n• Edema and hematoma can progress over hours to days\n\n**For asymptomatic patients with mechanism:**\n• Flexible laryngoscopy\n• CT neck if any suspicion\n• Observation 6-12 hours minimum\n\n**Discharge only if:**\n• Normal flexible laryngoscopy\n• No airway symptoms\n• Reliable patient with close follow-up [1][2]',
        citation: [1, 2],
        next: 'larynx-associated',
        summary: 'Observation protocol: HOB 30 degrees, humidified air, voice rest, serial airway assessments',
        skippable: true,
    },
    {
        id: 'larynx-associated',
        type: 'info',
        module: 6,
        title: 'Associated Injuries — Check For',
        body: '| Injury | Incidence | Workup |\n|--------|-----------|--------|\n| Intracranial | 13-15% | CT head |\n| Skull base/facial fractures | 21% | CT face |\n| C-spine fractures | **8%** | CT c-spine, maintain precautions |\n| Esophageal/pharyngeal | 3% | Esophagoscopy, contrast swallow |\n| Vascular | Variable | CT angiography |\n\n**Maintain c-spine precautions** until cleared — 8% have associated cervical spine injuries [1][2]',
        citation: [1, 2],
        next: 'larynx-consults',
        summary: 'Check for associated injuries: C-spine, vascular (carotid/vertebral), esophageal, recurrent laryngeal nerve',
        safetyLevel: 'warning',
    },
    {
        id: 'larynx-consults',
        type: 'result',
        module: 6,
        title: 'Consults & Disposition',
        body: '| Specialty | When to Consult |\n|-----------|----------------|\n| **ENT** | ALL suspected laryngeal injuries |\n| **Trauma Surgery** | Penetrating trauma, polytrauma, vascular injury |\n| **Anesthesia** | Difficult airway, awake intubation planned |\n| **Thoracic Surgery** | Tracheal injury, mediastinal involvement |\n| **IR** | Vascular injury on CTA |\n\n**Disposition:**\n• Grade I-II: ICU observation 24-48h\n• Grade III-V: OR, then ICU\n• All significant injuries: ENT follow-up mandatory',
        recommendation: 'ENT consult for all suspected laryngeal injuries. ICU admission for significant injuries.',
        confidence: 'definitive',
        citation: [1, 2],
        summary: 'ENT and/or trauma surgery consultation for all confirmed laryngeal injuries — early involvement critical',
    },
];
export const LARYNGEAL_TRAUMA_MODULE_LABELS = [
    'Recognition',
    'Airway Decision',
    'Classification',
    'Imaging',
    'Management',
    'Disposition',
];
export const LARYNGEAL_TRAUMA_CITATIONS = [
    { num: 1, text: 'StatPearls. Laryngeal Injury. National Library of Medicine. 2024.' },
    { num: 2, text: 'StatPearls. Laryngeal Fracture. National Library of Medicine. 2024.' },
    { num: 3, text: 'ACEP Now. Laryngeal Injuries: An Introduction. American College of Emergency Physicians. 2023.' },
    { num: 4, text: 'Brown EM Blog. Imaging and Management of Blunt Laryngeal Trauma. 2019.' },
    { num: 5, text: 'AAO-HNS. Trauma Chapter 8: Laryngeal Trauma. Resident Manual. 2023.' },
    { num: 6, text: 'Medscape. Laryngeal Fractures Overview. 2024.' },
];
