// MedKitt — GI Foreign Body
// Object Identification → Location → Emergent → Urgent → Conservative → Disposition
// 6 modules: Object Identification → Location Assessment → Emergent Intervention → Urgent Intervention → Conservative Management → Disposition
// 17 nodes total.
export const GI_FOREIGN_BODY_NODES = [
    // =====================================================================
    // MODULE 1: OBJECT IDENTIFICATION
    // =====================================================================
    {
        id: 'gifb-start',
        type: 'question',
        module: 1,
        title: 'GI Foreign Body — Object Identification',
        body: '[GI Foreign Body Steps Summary](#/info/gifb-steps)\n\n**Object type determines urgency and management.**\n\n**High-risk objects (emergent/urgent):**\n• **Button batteries** — esophageal = emergent (<2h)\n• **Magnets** — multiple = urgent (can cause fistula)\n• **Sharp objects** — pins, bones, glass\n• **Superabsorbent polymers** — water beads\n\n**Lower-risk objects:**\n• Coins, small blunt objects\n• Small objects <2cm width, <5cm length\n\n**History:**\n• Time of ingestion\n• Object description (size, shape, material)\n• Symptoms: dysphagia, drooling, pain, respiratory distress',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'gifb-object-risk', label: 'Object Risk Classification' },
        ],
        options: [
            {
                label: 'Button Battery',
                description: 'Disc/coin battery — EMERGENT if esophageal',
                next: 'gifb-button-battery',
                urgency: 'critical',
            },
            {
                label: 'Sharp Object',
                description: 'Pin, needle, bone, glass, razor',
                next: 'gifb-sharp',
                urgency: 'urgent',
            },
            {
                label: 'Multiple Magnets',
                description: '≥2 magnets or magnet + metal — risk of fistula',
                next: 'gifb-magnets',
                urgency: 'urgent',
            },
            {
                label: 'Blunt Object / Food Bolus',
                description: 'Coin, toy, meat impaction',
                next: 'gifb-blunt',
            },
        ],
        summary: 'Object type determines urgency: button battery (emergent), sharp/magnets (urgent), blunt (often conservative)',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 2: LOCATION ASSESSMENT
    // =====================================================================
    {
        id: 'gifb-location',
        type: 'question',
        module: 2,
        title: 'Location Assessment',
        body: '**Imaging to determine location:**\n\n**X-ray (AP + lateral):**\n• First-line for radiopaque objects\n• Include neck through pelvis\n• Lateral view distinguishes esophageal from tracheal\n\n**Button battery on X-ray:**\n• "Double-ring" or "halo" sign on AP view\n• Step-off on lateral view\n\n**CT if:**\n• Suspected perforation\n• Object not visible on X-ray\n• Need precise localization\n\n**Where is the object?**',
        citation: [1, 2],
        options: [
            {
                label: 'Esophagus',
                description: 'Lodged in esophagus — highest risk',
                next: 'gifb-esophageal',
                urgency: 'critical',
            },
            {
                label: 'Stomach',
                description: 'Passed into stomach',
                next: 'gifb-gastric',
            },
            {
                label: 'Small Bowel / Beyond',
                description: 'Distal to stomach',
                next: 'gifb-distal',
            },
            {
                label: 'Not Visualized',
                description: 'Radiolucent or already passed',
                next: 'gifb-not-seen',
            },
        ],
        summary: 'X-ray neck-to-pelvis first; CT if perforation suspected; esophageal location = highest risk',
    },
    {
        id: 'gifb-esophageal',
        type: 'info',
        module: 2,
        title: 'Esophageal Foreign Body',
        body: '**Esophageal impaction is an emergency** — risk of perforation, mediastinitis, aspiration.\n\n**Common impaction sites:**\n• Cricopharyngeus (C6) — most common in children\n• Aortic arch (T4)\n• GE junction (T10-11)\n\n**Symptoms:**\n• Dysphagia, drooling, inability to swallow\n• Chest/neck pain\n• Respiratory distress (if tracheal compression)\n• Stridor (concerning for airway compromise)\n\n**Urgency by object:**\n• **Button battery:** <2 hours to endoscopy\n• **Sharp object:** <6 hours\n• **Food bolus:** <6-12 hours (complete obstruction) or <24h (partial)\n• **Blunt object:** <24 hours',
        citation: [1, 2, 3],
        next: 'gifb-eso-object',
        summary: 'Esophageal = emergency; button battery <2h, sharp <6h, food <6-24h depending on obstruction',
        safetyLevel: 'critical',
    },
    {
        id: 'gifb-eso-object',
        type: 'question',
        module: 2,
        title: 'Esophageal Object Type',
        body: 'What type of object is lodged in the esophagus?',
        citation: [1, 2],
        options: [
            {
                label: 'Button Battery',
                description: 'EMERGENT — severe mucosal injury in <2 hours',
                next: 'gifb-button-battery',
                urgency: 'critical',
            },
            {
                label: 'Sharp Object',
                description: 'Urgent — high perforation risk',
                next: 'gifb-sharp-eso',
                urgency: 'urgent',
            },
            {
                label: 'Food Bolus',
                description: 'Common in adults — assess for complete vs partial obstruction',
                next: 'gifb-food-bolus',
                urgency: 'urgent',
            },
            {
                label: 'Blunt Object (Coin, Toy)',
                description: 'Endoscopy within 24 hours',
                next: 'gifb-blunt-eso',
            },
        ],
        summary: 'Battery = emergent (<2h); sharp = urgent (<6h); food bolus = urgent (<6-24h); blunt = <24h',
    },
    // =====================================================================
    // MODULE 3: EMERGENT INTERVENTION
    // =====================================================================
    {
        id: 'gifb-button-battery',
        type: 'info',
        module: 3,
        title: 'Button Battery — EMERGENT',
        body: '**Esophageal button battery is a surgical emergency.**\n\n**Mechanism of injury:**\n• Generates electric current → liquefactive necrosis\n• Severe mucosal injury in <2 hours\n• Perforation risk increases after 2-4 hours\n• Can cause fistula to trachea, aorta (fatal)\n\n**IMMEDIATE ACTIONS:**\n\n**1. NPO** — no food or water\n\n**2. Give [honey](#/drug/honey/battery) or [sucralfate](#/drug/sucralfate/battery):**\n• Honey 10 mL q10 min (up to 6 doses) — viscous coating delays injury\n• Sucralfate 10 mL if honey unavailable\n• **Only if <12h since ingestion AND esophageal**\n• Do NOT delay endoscopy for additional doses\n\n**3. EMERGENT ENDOSCOPY** — target <2 hours from ED arrival\n\n**4. If endoscopy delayed:**\n• Transfer to center with pediatric GI/surgery\n• Continue honey/sucralfate during transport',
        citation: [1, 3, 4],
        treatment: {
            firstLine: {
                drug: 'Honey',
                dose: '10 mL',
                route: 'PO',
                frequency: 'Every 10 minutes',
                duration: 'Up to 6 doses while awaiting endoscopy',
                notes: 'Only if <12h since ingestion AND esophageal. Do NOT delay endoscopy. Contraindicated <1 year old (botulism risk).',
            },
            alternative: {
                drug: 'Sucralfate',
                dose: '10 mL (1 g)',
                route: 'PO',
                frequency: 'Every 10 minutes',
                duration: 'Up to 6 doses while awaiting endoscopy',
                notes: 'Alternative if honey unavailable.',
            },
            monitoring: 'Emergent GI/surgery consultation. Time to endoscopy. Signs of perforation.',
        },
        next: 'gifb-battery-gastric',
        summary: 'EMERGENT endoscopy <2h; give honey/sucralfate 10mL q10min while awaiting; severe injury in <2h',
        safetyLevel: 'critical',
    },
    {
        id: 'gifb-battery-gastric',
        type: 'question',
        module: 3,
        title: 'Button Battery — Gastric Location',
        body: '**If button battery has passed to stomach:**\n\nManagement depends on:\n• Battery size (≥20mm higher risk)\n• Patient age (<5 years higher risk)\n• Symptoms present\n• Time since ingestion\n\n**≥20mm battery or symptomatic → endoscopic removal**\n**<20mm, asymptomatic → may observe with serial X-rays**',
        citation: [1, 3],
        options: [
            {
                label: 'Still in Esophagus',
                description: 'Emergent removal required',
                next: 'gifb-dispo-emergent',
                urgency: 'critical',
            },
            {
                label: 'Gastric — High Risk',
                description: '≥20mm, age <5, symptomatic',
                next: 'gifb-dispo-urgent',
                urgency: 'urgent',
            },
            {
                label: 'Gastric — Low Risk',
                description: '<20mm, asymptomatic, age ≥5',
                next: 'gifb-battery-observe',
            },
            {
                label: 'Beyond Stomach',
                description: 'Has passed into small bowel',
                next: 'gifb-distal',
            },
        ],
        summary: 'Esophageal = emergent; gastric ≥20mm or symptomatic = urgent; gastric <20mm asymptomatic = may observe',
    },
    {
        id: 'gifb-battery-observe',
        type: 'info',
        module: 3,
        title: 'Button Battery — Observation',
        body: '**Low-risk gastric button battery may be observed:**\n\n**Criteria for observation:**\n• Battery <20mm diameter\n• Patient asymptomatic\n• Age ≥5 years\n• No prior GI surgery or strictures\n\n**Observation protocol:**\n• Repeat X-ray in 48 hours\n• If still in stomach at 48h → endoscopic removal\n• If passed to small bowel → continue observation\n• Daily X-rays until passed\n\n**Return precautions:**\n• Abdominal pain, vomiting, bloody stools\n• Fever\n• Decreased oral intake',
        citation: [1, 3],
        next: 'gifb-disposition',
        summary: 'Low-risk gastric battery: repeat X-ray 48h; remove if still in stomach; daily X-rays until passed',
    },
    // =====================================================================
    // MODULE 4: URGENT INTERVENTION
    // =====================================================================
    {
        id: 'gifb-sharp',
        type: 'question',
        module: 4,
        title: 'Sharp Object',
        body: '**Sharp objects have 15-35% perforation risk** if allowed to pass spontaneously.\n\n**Examples:**\n• Needles, pins, toothpicks\n• Fish/chicken bones\n• Glass fragments\n• Razor blades, dental hardware\n\n**Management depends on location:**\n• Esophageal → emergent/urgent endoscopy\n• Gastric → endoscopy recommended\n• Small bowel → surgical consultation, observation vs surgery',
        citation: [1, 2],
        options: [
            {
                label: 'Esophageal',
                description: 'Emergent endoscopy <6 hours',
                next: 'gifb-sharp-eso',
                urgency: 'urgent',
            },
            {
                label: 'Gastric',
                description: 'Urgent endoscopy recommended',
                next: 'gifb-sharp-gastric',
                urgency: 'urgent',
            },
            {
                label: 'Small Bowel / Distal',
                description: 'Surgical consultation',
                next: 'gifb-sharp-distal',
            },
        ],
        summary: 'Sharp objects: 15-35% perforation risk; esophageal <6h, gastric = urgent removal, distal = surgery consult',
        safetyLevel: 'warning',
    },
    {
        id: 'gifb-sharp-eso',
        type: 'info',
        module: 4,
        title: 'Esophageal Sharp Object',
        body: '**Urgent endoscopy within 6 hours.**\n\n**Endoscopic removal considerations:**\n• Use overtube or hood to protect mucosa during extraction\n• Grasp object so sharp end trails during removal\n• May require operative endoscopy or surgery if embedded\n\n**Signs of perforation:**\n• Severe chest/neck pain\n• Subcutaneous emphysema\n• Fever, tachycardia\n• Pneumomediastinum on imaging\n\n**If perforation suspected → CT neck/chest/abdomen, surgical consultation**',
        citation: [1, 2],
        next: 'gifb-dispo-urgent',
        summary: 'Esophageal sharp: endoscopy <6h with overtube; watch for perforation (emphysema, pneumomediastinum)',
        safetyLevel: 'critical',
    },
    {
        id: 'gifb-sharp-gastric',
        type: 'info',
        module: 4,
        title: 'Gastric Sharp Object',
        body: '**Endoscopic removal recommended for gastric sharp objects.**\n\n**Rationale:**\n• 15-35% perforation risk if allowed to pass\n• Gastric location allows safe endoscopic retrieval\n• Once past pylorus, intervention becomes more complex\n\n**Observation may be considered if:**\n• Object is small and has passed to small bowel\n• Patient asymptomatic\n• Daily X-rays show progression\n• Surgical backup available\n\n**Urgent endoscopy recommended within 24 hours for most gastric sharp objects.**',
        citation: [1, 2],
        next: 'gifb-dispo-urgent',
        summary: 'Gastric sharp: endoscopy recommended within 24h; 15-35% perforation risk if allowed to pass',
    },
    {
        id: 'gifb-sharp-distal',
        type: 'info',
        module: 4,
        title: 'Distal Sharp Object',
        body: '**Sharp object beyond reach of endoscopy — surgical consultation required.**\n\n**Management options:**\n• Conservative observation with daily X-rays if asymptomatic\n• 80-90% will pass spontaneously without complication\n• Surgical intervention if fails to progress in 3 days or symptoms develop\n\n**Surgical indications:**\n• Signs of perforation (fever, peritonitis, free air)\n• Failure to progress on serial X-rays (same location >3 days)\n• Development of obstruction\n• Persistent abdominal pain',
        citation: [1, 2],
        next: 'gifb-disposition',
        summary: 'Distal sharp: daily X-rays, surgery consult; 80-90% pass spontaneously; operate if no progress in 3 days or symptoms',
        safetyLevel: 'warning',
    },
    {
        id: 'gifb-magnets',
        type: 'info',
        module: 4,
        title: 'Multiple Magnets / Magnet + Metal',
        body: '**Multiple magnets or magnet + metal object = surgical emergency.**\n\n**Mechanism:**\n• Magnets attract through bowel walls → pressure necrosis → fistula, perforation, obstruction\n• Single magnet without metal is low risk\n\n**Management:**\n\n**If all objects in stomach:**\n• Urgent endoscopic removal\n\n**If beyond stomach or different locations:**\n• Surgical consultation\n• Likely requires operative removal\n• High risk of bowel necrosis if left in place\n\n**If single magnet alone:**\n• Observation similar to blunt object\n• Ensure no other magnets or metal ingested',
        citation: [1, 2],
        next: 'gifb-dispo-urgent',
        summary: 'Multiple magnets = emergency; can cause fistula/necrosis; urgent endoscopy if gastric, surgery if distal',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 5: CONSERVATIVE MANAGEMENT
    // =====================================================================
    {
        id: 'gifb-blunt',
        type: 'question',
        module: 5,
        title: 'Blunt Object',
        body: '**Most blunt objects pass spontaneously.**\n\n**Objects that typically pass:**\n• <2 cm width (adult pylorus ~2-2.5 cm)\n• <5-6 cm length (duodenal sweep)\n• Coins, small toys, marbles\n\n**Objects at risk of retention:**\n• >2 cm width or >5 cm length\n• Lodged in esophagus\n• Prior GI surgery or strictures\n\n**Location determines management:**',
        citation: [1, 2],
        options: [
            {
                label: 'Esophageal',
                description: 'Remove within 24 hours',
                next: 'gifb-blunt-eso',
            },
            {
                label: 'Gastric',
                description: 'Observe if small; remove if large or retained',
                next: 'gifb-gastric',
            },
            {
                label: 'Distal (Small Bowel/Colon)',
                description: 'Expectant management',
                next: 'gifb-distal',
            },
        ],
        summary: 'Blunt <2cm width, <5cm length usually pass; esophageal remove <24h; gastric observe vs remove',
    },
    {
        id: 'gifb-blunt-eso',
        type: 'info',
        module: 5,
        title: 'Esophageal Blunt Object',
        body: '**Blunt esophageal foreign body — removal within 24 hours.**\n\n**Coins:**\n• Most common pediatric esophageal FB\n• Usually lodge at cricopharyngeus\n• Endoscopic or Foley catheter removal options\n\n**Foley technique (for coins):**\n• Fluoroscopy guidance\n• Airway protection equipment ready\n• Only for objects <24h, coin-like, cooperative patient\n\n**Endoscopy preferred if:**\n• Object irregular shape\n• Ingestion >24 hours\n• Prior esophageal pathology\n• Failed Foley attempt',
        citation: [1, 2],
        next: 'gifb-disposition',
        summary: 'Esophageal blunt: endoscopy within 24h; Foley technique option for coins <24h in cooperative patient',
    },
    {
        id: 'gifb-food-bolus',
        type: 'info',
        module: 5,
        title: 'Esophageal Food Bolus',
        body: '**Food bolus impaction — common in adults with underlying pathology.**\n\n**Assess for complete vs partial obstruction:**\n• **Complete:** Cannot swallow secretions, drooling → endoscopy <6h\n• **Partial:** Can swallow liquids → endoscopy <24h\n\n**Pharmacologic options (limited efficacy):**\n• [Glucagon](#/drug/glucagon/food-bolus) 1 mg IV — relaxes LES; may help distal impactions\n• Effervescent agents — not recommended (aspiration risk)\n• Meat tenderizer — contraindicated (mucosal injury)\n\n**Underlying pathology:**\n• Eosinophilic esophagitis (most common in young adults)\n• Peptic stricture\n• Schatzki ring\n• Esophageal cancer\n• → Biopsies during endoscopy',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Glucagon',
                dose: '1 mg',
                route: 'IV',
                frequency: 'May repeat once in 20 min',
                duration: 'Single or two doses',
                notes: 'Limited efficacy; may help distal impactions. Causes nausea/vomiting. Do NOT delay endoscopy.',
            },
            monitoring: 'Monitor for aspiration. Endoscopy <6h if complete obstruction, <24h if partial.',
        },
        next: 'gifb-dispo-urgent',
        summary: 'Complete obstruction (drooling) = <6h endoscopy; partial = <24h; glucagon has limited efficacy',
        safetyLevel: 'warning',
    },
    {
        id: 'gifb-gastric',
        type: 'info',
        module: 5,
        title: 'Gastric Foreign Body',
        body: '**Gastric objects — management by type and size:**\n\n**Remove endoscopically if:**\n• Sharp objects (any size)\n• Button batteries ≥20mm or symptomatic\n• Multiple magnets\n• Objects >2 cm width or >5 cm length\n• Fails to pass in 3-4 weeks\n\n**May observe if:**\n• Blunt object <2 cm width and <5 cm length\n• Single small magnet (no metal co-ingestion)\n• Asymptomatic patient\n\n**Observation protocol:**\n• Weekly X-rays\n• If in stomach >3-4 weeks → endoscopic removal\n• Return if symptoms develop',
        citation: [1, 2],
        next: 'gifb-disposition',
        summary: 'Remove gastric objects if sharp, large (>2cm wide, >5cm long), battery, magnets; small blunt may observe',
    },
    {
        id: 'gifb-distal',
        type: 'info',
        module: 5,
        title: 'Distal Foreign Body',
        body: '**Object beyond stomach — expectant management for most.**\n\n**95% of objects that reach small bowel will pass spontaneously.**\n\n**Observation protocol:**\n• Regular diet (high fiber may help)\n• Strain stools to confirm passage\n• Weekly X-rays for concerning objects (sharp, large)\n• Most pass within 1 week\n\n**Return/surgical intervention if:**\n• Object fails to progress >3 days (same location)\n• Abdominal pain, vomiting, distension (obstruction)\n• Fever, peritoneal signs (perforation)\n• Bloody stools',
        citation: [1, 2],
        next: 'gifb-disposition',
        summary: '95% of objects past stomach pass spontaneously; strain stools; surgery if no progress >3 days or symptoms',
    },
    {
        id: 'gifb-not-seen',
        type: 'info',
        module: 5,
        title: 'Object Not Visualized',
        body: '**If object not visible on X-ray:**\n\n**Possibilities:**\n• Radiolucent object (plastic, wood, glass)\n• Already passed\n• Not actually ingested (false history)\n\n**Management:**\n• CT if high concern and radiolucent object suspected\n• Metal detector (for metallic objects)\n• Observation if low-risk history and asymptomatic\n• Endoscopy if symptomatic with negative imaging\n\n**High-risk radiolucent objects:**\n• Fish bones (may need CT neck/chest)\n• Wooden toothpicks\n• Plastic toy parts',
        citation: [1, 2],
        next: 'gifb-disposition',
        summary: 'Not seen: consider CT if radiolucent object suspected (fish bone, plastic); may have passed already',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'gifb-disposition',
        type: 'question',
        module: 6,
        title: 'Disposition',
        body: 'Final disposition based on object type and intervention status.',
        citation: [1],
        options: [
            {
                label: 'Emergent Endoscopy/Surgery',
                description: 'Esophageal battery, perforation, airway compromise',
                next: 'gifb-dispo-emergent',
                urgency: 'critical',
            },
            {
                label: 'Urgent Intervention (<24h)',
                description: 'Esophageal FB, gastric sharp/battery, magnets',
                next: 'gifb-dispo-urgent',
                urgency: 'urgent',
            },
            {
                label: 'Observation/Discharge',
                description: 'Low-risk object, passed to distal GI, asymptomatic',
                next: 'gifb-dispo-discharge',
            },
        ],
        summary: 'Emergent if battery/perforation; urgent if esophageal/sharp; discharge if low-risk distal object',
    },
    {
        id: 'gifb-dispo-emergent',
        type: 'result',
        module: 6,
        title: 'Emergent Intervention',
        body: '**Emergent endoscopy/surgery required:**\n\n**Indications:**\n• Esophageal button battery\n• Airway compromise\n• Signs of perforation\n• Complete esophageal obstruction with aspiration risk\n\n**Actions:**\n• NPO\n• IV access\n• GI and/or surgical consultation STAT\n• Transfer if endoscopy not available\n• For battery: honey/sucralfate while awaiting\n\n**Target time to intervention:**\n• Esophageal battery: <2 hours\n• Sharp esophageal object: <6 hours\n• Complete obstruction: <6 hours',
        recommendation: 'Emergent GI/surgical consultation. NPO. Endoscopy within 2-6 hours depending on object. Transfer if capability unavailable.',
        citation: [1, 3],
    },
    {
        id: 'gifb-dispo-urgent',
        type: 'result',
        module: 6,
        title: 'Urgent Intervention',
        body: '**Urgent endoscopy within 24 hours:**\n\n**Indications:**\n• Esophageal blunt object\n• Esophageal food bolus (partial obstruction)\n• Gastric sharp object\n• Gastric button battery (high-risk features)\n• Multiple magnets in stomach\n\n**Admission criteria:**\n• Await endoscopy\n• Unable to tolerate PO\n• Anticoagulation requiring reversal\n• High-risk comorbidities\n\n**May observe overnight and scope in AM if:**\n• Stable, low-risk object\n• Asymptomatic\n• Endoscopy not immediately available',
        recommendation: 'GI consultation. Admit for endoscopy within 24 hours. NPO. IV fluids.',
        citation: [1, 2],
    },
    {
        id: 'gifb-dispo-discharge',
        type: 'result',
        module: 6,
        title: 'Discharge with Observation',
        body: '**Safe for outpatient observation:**\n\n**Criteria:**\n• Object has passed to small bowel/colon\n• Blunt, small (<2cm wide, <5cm long)\n• Asymptomatic\n• No high-risk features\n\n**Discharge instructions:**\n• Strain all stools until object recovered\n• Normal diet (high fiber may help)\n• Return immediately for: abdominal pain, vomiting, bloody stools, fever\n\n**Follow-up:**\n• If not passed in 1 week → X-ray\n• If sharp object → weekly X-rays until passed\n• PCP or GI follow-up as needed',
        recommendation: 'Discharge with stool straining instructions. Return precautions for obstruction/perforation signs. X-ray if not passed in 1 week.',
        citation: [1, 2],
    },
];
export const GI_FOREIGN_BODY_MODULE_LABELS = [
    'Object Identification',
    'Location Assessment',
    'Emergent Intervention',
    'Urgent Intervention',
    'Conservative Management',
    'Disposition',
];
export const GI_FOREIGN_BODY_CRITICAL_ACTIONS = [
    { text: 'Esophageal button battery = emergent endoscopy <2 hours', nodeId: 'gifb-button-battery' },
    { text: 'Give honey 10 mL q10min (up to 6 doses) for esophageal battery while awaiting endoscopy', nodeId: 'gifb-button-battery' },
    { text: 'Sharp objects have 15-35% perforation risk — remove from esophagus <6h, stomach <24h', nodeId: 'gifb-sharp' },
    { text: 'Multiple magnets = surgical emergency (fistula/necrosis risk)', nodeId: 'gifb-magnets' },
    { text: 'Complete esophageal food impaction (cannot swallow secretions) = endoscopy <6 hours', nodeId: 'gifb-food-bolus' },
];
export const GI_FOREIGN_BODY_CITATIONS = [
    { num: 1, text: 'Kramer RE, Lerner DG, Lin T, et al. Management of Ingested Foreign Bodies in Children: A Clinical Report of the NASPGHAN Endoscopy Committee. J Pediatr Gastroenterol Nutr. 2015;60(4):562-574.' },
    { num: 2, text: 'ASGE Standards of Practice Committee. Management of Ingested Foreign Bodies and Food Impactions. Gastrointest Endosc. 2011;73(6):1085-1091.' },
    { num: 3, text: 'Anfang RR, Jatana KR, Engelen P, et al. pH-Neutralizing Esophageal Irrigations as a Novel Mitigation Strategy for Button Battery Injury. Laryngoscope. 2019;129(1):49-57.' },
    { num: 4, text: 'National Capital Poison Center. Button Battery Ingestion Guidelines. 2023.' },
];
