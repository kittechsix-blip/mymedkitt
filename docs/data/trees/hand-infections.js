// MedKitt — Hand Infections
// ED evaluation and management of hand infections
// Sources: StatPearls, AAFP, IDSA MRSA Guidelines, emDocs
// 6 modules: Assessment → Felon → Paronychia → Flexor Tenosynovitis → Fight Bite → Deep Space
// ~20 nodes
export const HAND_INFECTIONS_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'hi-start',
        type: 'question',
        module: 1,
        title: 'Hand Infection — ED Evaluation',
        body: '[Steps Summary](#/info/hi-steps)\n\n**Initial Assessment:**\n1. Location and extent of infection\n2. Mechanism (puncture, laceration, bite?)\n3. Time since onset\n4. Prior treatment attempts\n5. Immunocompromise (diabetes, HIV, chemotherapy)\n\n**Critical Questions:**\n• Is there purulence or fluctuance?\n• Is flexor sheath involved (Kanavel signs)?\n• Is this a human bite (fight bite)?\n• Are there signs of deep space infection?\n\n**What is the primary presentation?** [1]',
        options: [
            { label: 'Fingertip infection (felon)', description: 'Painful, swollen, tense distal pulp', next: 'hi-felon' },
            { label: 'Periungual infection (paronychia)', description: 'Swelling at nail fold', next: 'hi-paronychia' },
            { label: 'Finger swelling + Kanavel signs', description: 'Flexor tenosynovitis suspected', next: 'hi-fts', urgency: 'critical' },
            { label: 'Dorsal hand/MCP bite wound', description: 'Fight bite / clenched fist injury', next: 'hi-fight-bite', urgency: 'urgent' },
            { label: 'Vesicles on finger', description: 'Possible herpetic whitlow', next: 'hi-whitlow' },
            { label: 'Deep palm/web swelling', description: 'Deep space infection', next: 'hi-deep-space', urgency: 'critical' },
        ],
        citation: [1],
        calculatorLinks: [
            { id: 'weight-dose', label: 'Weight Calculator' },
        ],
    },
    // =====================================================================
    // MODULE 2: FELON
    // =====================================================================
    {
        id: 'hi-felon',
        type: 'question',
        module: 2,
        title: 'Felon — Pulp Space Abscess',
        body: '**Anatomy:**\nClosed compartment with 15-20 fibrous septa. Minimal expansion room → elevated pressure → severe pain.\n\n**Classic Presentation:**\n• Tense, swollen distal pulp\n• Throbbing pain out of proportion\n• Often follows minor trauma/puncture\n• Staph aureus most common\n\n**Complications if untreated:**\n• Osteomyelitis of distal phalanx\n• Septic DIP arthritis\n• Necrosis of pulp\n\n**Is there fluctuance or abscess formation?** [2]',
        options: [
            { label: 'Yes — abscess present', description: 'Fluctuant, purulent collection', next: 'hi-felon-drainage' },
            { label: 'No — early cellulitis only', description: 'Erythema, mild swelling, no abscess', next: 'hi-felon-conservative' },
        ],
        citation: [2],
    },
    {
        id: 'hi-felon-drainage',
        type: 'info',
        module: 2,
        title: 'Felon — I&D Technique',
        body: '**Anesthesia:**\n• Digital block (bupivacaine 0.5% without epi preferred)\n• Digital tourniquet (Penrose drain at base)\n\n**Incision Options:**\n\n**1. Volar Longitudinal (preferred for superficial):**\n• Midline incision over point of maximal fluctuance\n• Blunt dissection to break septa\n• Does not cross DIP flexion crease\n\n**2. Lateral (preferred for deep):**\n• Single incision 0.5 cm distal to DIP crease\n• Parallel to nail plate (not fishmouth)\n• Extend from lateral nail fold to tip\n• Break all septa with hemostat\n\n**Key Points:**\n• MUST break all fibrous septa for complete drainage\n• Pack wound loosely with iodoform gauze\n• Remove packing in 24-48h\n• Wound heals by secondary intention\n\n**Post-procedure:**\n• Oral antibiotics x 7-10 days\n• Warm soaks TID starting day 2\n• Hand surgery follow-up 48-72h [2]',
        citation: [2],
        next: 'hi-antibiotics',
    },
    {
        id: 'hi-felon-conservative',
        type: 'result',
        module: 2,
        title: 'Early Felon — Conservative Management',
        body: '**Early Cellulitis Without Abscess:**\n\n**Management:**\n• Warm soaks 3-4x daily for 20 minutes\n• Elevation\n• Oral antibiotics x 7-10 days\n• Close follow-up in 24-48h\n\n**Antibiotic Options:**\n• **First-line:** Cephalexin 500mg QID or Dicloxacillin 500mg QID\n• **MRSA risk:** TMP-SMX DS 1-2 tabs BID or Doxycycline 100mg BID\n• **Severe:** Clindamycin 300-450mg TID\n\n**Return Precautions:**\n• Worsening pain despite treatment\n• Development of fluctuance\n• Fever or red streaking\n\n**If no improvement in 24-48h:**\nRe-examine for abscess formation → may need I&D [2]',
        recommendation: 'Early felon without abscess. Oral antibiotics, warm soaks, elevation. Recheck in 24-48h. Return if worsening.',
        citation: [2],
    },
    // =====================================================================
    // MODULE 3: PARONYCHIA
    // =====================================================================
    {
        id: 'hi-paronychia',
        type: 'question',
        module: 3,
        title: 'Paronychia — Periungual Infection',
        body: '**Anatomy:**\nInfection of lateral or proximal nail fold.\n\n**Acute vs Chronic:**\n• **Acute:** <6 weeks, bacterial (Staph 50%, polymicrobial)\n• **Chronic:** >6 weeks, inflammatory ± Candida\n\n**Assessment:**\n• Location: lateral fold vs eponychium vs subungual\n• Fluctuance present?\n• Extent of involvement\n\n**Is there a drainable abscess?** [3]',
        options: [
            { label: 'Yes — visible pus or fluctuance', description: 'Abscess present, needs drainage', next: 'hi-paronychia-drainage' },
            { label: 'No — cellulitis only', description: 'Red, swollen, non-fluctuant', next: 'hi-paronychia-conservative' },
            { label: 'Chronic (>6 weeks)', description: 'Recurrent, episodic swelling', next: 'hi-paronychia-chronic' },
        ],
        citation: [3],
    },
    {
        id: 'hi-paronychia-drainage',
        type: 'info',
        module: 3,
        title: 'Paronychia — Drainage Technique',
        body: '**Anesthesia:**\n• Digital block often not needed for simple drainage\n• Consider if extensive or anxious patient\n\n**Technique Options:**\n\n**1. Needle Elevation (superficial):**\n• 21-23g needle inserted parallel to nail\n• Lift lateral fold, allow pus to drain\n• Minimal tissue trauma\n\n**2. Incision (more extensive):**\n• 11-blade incision at point of fluctuance\n• Parallel to nail fold\n• Lift eponychial fold off nail if needed\n\n**3. Partial Nail Removal (subungual extension):**\n• If pus tracks under nail\n• Remove lateral 1/4 of nail\n• Do NOT remove entire nail unless necessary\n\n**Post-drainage:**\n• Loose mesh gauze dressing\n• Remove in 24-48h\n• Warm soaks TID thereafter\n• Antibiotics usually NOT needed after drainage unless extensive cellulitis [3]',
        citation: [3],
        next: 'hi-disposition-outpatient',
    },
    {
        id: 'hi-paronychia-conservative',
        type: 'result',
        module: 3,
        title: 'Paronychia — Conservative Management',
        body: '**Early Paronychia Without Abscess:**\n\n**Management:**\n• Warm water soaks 3-4x daily for 15-20 min\n• Elevation\n• Keep clean and dry between soaks\n\n**Antibiotics:**\n• Often NOT needed for early, localized paronychia\n• Consider if extensive cellulitis:\n  - Cephalexin 500mg QID or\n  - TMP-SMX DS BID (if MRSA concern)\n\n**Follow-up:**\n• Re-examine in 48-72h\n• If abscess develops → drainage\n\n**Prevention:**\n• Avoid nail biting, cuticle manipulation\n• Keep hands dry\n• Treat underlying conditions (diabetes) [3]',
        recommendation: 'Early paronychia without abscess. Warm soaks QID, keep dry. No antibiotics unless extensive cellulitis. Recheck 48-72h.',
        citation: [3],
    },
    {
        id: 'hi-paronychia-chronic',
        type: 'result',
        module: 3,
        title: 'Chronic Paronychia',
        body: '**Chronic Paronychia (>6 weeks):**\n\nTypically inflammatory, not primarily infectious.\n\n**Etiology:**\n• Repeated wet exposure (dishwashers, bartenders)\n• Candida colonization (secondary)\n• Contact dermatitis\n• Eczema/psoriasis\n\n**Management:**\n1. **Avoid wet work** — use cotton-lined gloves\n2. **Topical steroid** — triamcinolone 0.1% BID x 3 weeks\n3. **Keep dry** — critical for resolution\n4. **Topical antifungal** — if Candida suspected (nystatin, clotrimazole)\n\n**Not recommended:**\n• Oral antibiotics (not bacterial)\n• Repeated drainage (worsens inflammation)\n\n**Referral:**\n• Dermatology if refractory to conservative measures\n• Hand surgery only if >6 months failed medical therapy [3]',
        recommendation: 'Chronic paronychia. Avoid wet work, topical steroid, keep dry. Dermatology referral if refractory.',
        citation: [3],
    },
    // =====================================================================
    // MODULE 4: FLEXOR TENOSYNOVITIS
    // =====================================================================
    {
        id: 'hi-fts',
        type: 'info',
        module: 4,
        title: 'Flexor Tenosynovitis — Surgical Emergency',
        body: '**KANAVEL\'S 4 CARDINAL SIGNS:**\n\n| Sign | Description |\n|------|-------------|\n| 1. **Fusiform swelling** | Diffuse "sausage" swelling of entire digit |\n| 2. **Finger held in flexion** | Resting posture is semi-flexed |\n| 3. **Tenderness along flexor sheath** | Pain with palpation over A1-A5 pulleys |\n| 4. **Pain with passive extension** | EARLIEST sign — exquisite pain on stretch |\n\n**Sensitivity:** 91-97% when all 4 present\n**BUT:** Only 54% of patients have all 4 signs\n\n**Clinical Pearl:** Pain with passive extension is the EARLIEST and most sensitive sign. High suspicion + ANY 2 Kanavel signs = urgent hand surgery consult.\n\n**Pathogen:**\n• Staph aureus most common\n• Polymicrobial if penetrating trauma\n• Neisseria if sexually active + no clear mechanism\n\n**Why Emergency:**\n• Tendon ischemia occurs rapidly\n• Permanent loss of function if delayed [4][5]',
        citation: [4, 5],
        safetyLevel: 'critical',
        next: 'hi-fts-management',
    },
    {
        id: 'hi-fts-management',
        type: 'result',
        module: 4,
        title: 'Flexor Tenosynovitis — Management',
        body: '**Immediate Actions:**\n\n1. **IV Antibiotics** — Start immediately\n   • Vancomycin 15-20mg/kg + Ceftriaxone 2g or\n   • Ampicillin-sulbactam 3g q6h\n   • Add gentamicin if GNR concern\n\n2. **Hand Surgery Consult** — URGENT, same day\n   • Most require operative drainage within 24h\n   • Catheter irrigation or open drainage\n\n3. **Splint** — Intrinsic plus position\n   • Wrist 30° extension\n   • MCP 70-90° flexion\n   • IP extended\n\n4. **Elevation** — Above heart level\n\n5. **NPO** — Anticipate OR\n\n**Admission:** ALL flexor tenosynovitis requires admission.\n\n**Prognosis:**\n• Early treatment (<24h): good outcomes\n• Delayed treatment: stiffness, adhesions, amputation [4][5]',
        recommendation: 'Flexor tenosynovitis — surgical emergency. IV antibiotics now, NPO, hand surgery urgent consult, admit. Most need OR within 24h.',
        citation: [4, 5],
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 5: FIGHT BITE
    // =====================================================================
    {
        id: 'hi-fight-bite',
        type: 'info',
        module: 5,
        title: 'Fight Bite — Clenched Fist Injury',
        body: '**Why High Risk:**\n\n1. **Mechanism:** Tooth penetrates MCP joint when fist strikes mouth\n2. **Inoculation:** Oral flora (Eikenella, anaerobes) + skin flora\n3. **Retraction:** Skin moves when fist unclenches, covering deep contamination\n4. **Airless space:** Ideal for anaerobic growth\n5. **Up to 75%** have bone/joint/tendon involvement\n\n**Classic Presentation:**\n• Laceration over MCP (knuckle)\n• Patient often denies punch mechanism\n• May present 24-48h later with infection\n\n**Key Exam:**\n• Examine through FULL range of motion\n• Wound may track deeper in extension\n• Assess for joint capsule violation\n• Crepitus = gas-forming organism\n\n**All fight bites require:**\n• Wound exploration\n• X-ray (foreign body, fracture, air)\n• Broad-spectrum antibiotics [6]',
        citation: [6],
        safetyLevel: 'warning',
        next: 'hi-fight-bite-management',
    },
    {
        id: 'hi-fight-bite-management',
        type: 'question',
        module: 5,
        title: 'Fight Bite — Management',
        body: '**Wound Management:**\n• **Explore wound** through full range of motion\n• **Irrigate** copiously with saline\n• **Debride** nonviable tissue\n• **NEVER primary close** — heal by secondary intention\n• **Loose packing** if deep\n\n**Antibiotics:**\n• **First choice:** Amoxicillin-clavulanate 875/125mg BID\n• **PCN allergy:** Moxifloxacin 400mg daily + metronidazole 500mg TID\n• **MRSA risk:** Add TMP-SMX or doxycycline\n• **Duration:** 7-10 days\n\n**X-ray Findings:**\n• Fracture (Bennett, boxer\'s)\n• Foreign body (tooth fragment)\n• Subcutaneous air\n\n**Is there joint/tendon/bone involvement or signs of established infection?** [6]',
        options: [
            { label: 'Yes — deep involvement or infection', description: 'Purulence, exposed tendon, joint violation', next: 'hi-fight-bite-admit', urgency: 'critical' },
            { label: 'No — superficial, early presentation', description: 'Clean wound, <24h, no systemic signs', next: 'hi-fight-bite-discharge' },
        ],
        citation: [6],
    },
    {
        id: 'hi-fight-bite-admit',
        type: 'result',
        module: 5,
        title: 'Fight Bite — Admit',
        body: '**Admission Criteria:**\n• Joint capsule violation\n• Tendon involvement\n• Fracture with contamination\n• Purulence or established infection\n• Failed outpatient treatment\n• Unreliable patient\n• Immunocompromised\n\n**Inpatient Management:**\n• IV antibiotics: Ampicillin-sulbactam 3g q6h or Cefoxitin 2g q6h\n• Add vancomycin if MRSA concern\n• Hand surgery consult — likely operative washout\n• Splint in position of function\n• Elevation\n• Tetanus update\n\n**Operative Indications:**\n• Joint violation confirmed\n• Deep tissue necrosis\n• Foreign body retained\n• Abscess formation\n• Septic arthritis/osteomyelitis [6]',
        recommendation: 'Fight bite with deep involvement. IV antibiotics (amp-sulbactam), hand surgery consult, admit. Likely operative washout.',
        citation: [6],
        safetyLevel: 'critical',
    },
    {
        id: 'hi-fight-bite-discharge',
        type: 'result',
        module: 5,
        title: 'Fight Bite — Discharge',
        body: '**Outpatient Criteria (ALL must be met):**\n• ✅ Early presentation (<24h)\n• ✅ No purulence\n• ✅ No joint/tendon/bone involvement\n• ✅ No systemic signs\n• ✅ Reliable follow-up\n• ✅ Immunocompetent\n\n**Discharge Instructions:**\n\n**Antibiotics:**\n• Amoxicillin-clavulanate 875/125mg PO BID x 7-10 days\n• PCN allergy: Moxifloxacin + metronidazole\n\n**Wound Care:**\n• Leave wound OPEN (no closure)\n• Daily dressing changes\n• Warm soaks TID starting day 2\n• Keep elevated\n\n**Follow-up:**\n• Hand surgery or ED recheck in 24-48h\n• Return IMMEDIATELY if: fever, increased swelling, red streaking, increased pain\n\n**Tetanus:** Update if needed [6]',
        recommendation: 'Superficial fight bite. Leave open, amoxicillin-clavulanate x 10 days. Mandatory 24-48h follow-up. Written return precautions.',
        citation: [6],
    },
    // =====================================================================
    // MODULE 6: DEEP SPACE & SPECIAL CASES
    // =====================================================================
    {
        id: 'hi-whitlow',
        type: 'result',
        module: 6,
        title: 'Herpetic Whitlow',
        body: '**Herpetic Whitlow (HSV-1 or HSV-2):**\n\n**Differentiation from Felon:**\n• Vesicles (initially clear, may become turbid)\n• Pulp NOT tense (unlike felon)\n• Pain out of proportion\n• Often healthcare workers or autoinoculation\n\n**Diagnosis:**\n• Clinical appearance\n• Tzanck smear: multinucleated giant cells\n• Viral culture or PCR if uncertain\n\n**Treatment:**\n• **Antivirals** (if <48h): Valacyclovir 1g TID x 7 days or Acyclovir 400mg 5x/day\n• Self-limited: resolves in 2-4 weeks\n• Keep covered to prevent spread\n\n**CRITICAL: DO NOT INCISE**\n• Incision risks secondary bacterial infection\n• Incision risks viral dissemination\n• Antibiotics only if secondary bacterial superinfection\n\n**Recurrence:** 30-50% — consider suppressive therapy [7]',
        recommendation: 'Herpetic whitlow. DO NOT incise. Antivirals if <48h. Self-limited 2-4 weeks. Keep covered to prevent spread.',
        citation: [7],
    },
    {
        id: 'hi-deep-space',
        type: 'info',
        module: 6,
        title: 'Deep Space Infections — Surgical Emergency',
        body: '**Deep Space Anatomy:**\n\n| Space | Location | Presentation |\n|-------|----------|-------------|\n| **Thenar** | Thumb web | Loss of 1st web contour, thumb abducted |\n| **Midpalmar** | Central palm | Dorsal > palmar swelling, pain with finger extension |\n| **Web space** | Between fingers | "Collar button" — dual incision needed |\n\n**Clinical Features:**\n• Severe pain, swelling\n• Loss of normal hand contours\n• Finger held in flexion\n• Pain with passive motion\n• May have dorsal hand swelling (edema tracks dorsally)\n\n**CRITICAL: IV antibiotics ALONE will NOT control abscess.**\n\n**Management:**\n• IV antibiotics: Vancomycin + piperacillin-tazobactam\n• Hand surgery consult — URGENT\n• NPO for OR\n• Elevation, splint\n• Admit [8]',
        citation: [8],
        safetyLevel: 'critical',
        next: 'hi-disposition-admit',
    },
    {
        id: 'hi-antibiotics',
        type: 'info',
        module: 6,
        title: 'Antibiotic Selection',
        body: '**Outpatient (Oral):**\n\n| Indication | First Choice | MRSA Alternative |\n|------------|--------------|------------------|\n| Cellulitis | Cephalexin 500mg QID | TMP-SMX DS BID |\n| Felon/paronychia | Dicloxacillin 500mg QID | Doxycycline 100mg BID |\n| Fight bite | Amox-clav 875mg BID | Moxifloxacin + metronidazole |\n| Duration | 7-10 days | 7-10 days |\n\n**Inpatient (IV):**\n\n| Indication | First Choice | MRSA Alternative |\n|------------|--------------|------------------|\n| Flexor tenosynovitis | Cefazolin 2g q8h | Vancomycin 15-20mg/kg q12h |\n| Deep space | Pip-tazo 4.5g q6h | Vancomycin + pip-tazo |\n| Fight bite | Amp-sulbactam 3g q6h | Vancomycin + ceftriaxone |\n| Severe cellulitis | Cefazolin 2g q8h | Vancomycin + ceftriaxone |\n\n**MRSA Risk Factors:**\n• Prior MRSA infection\n• Recent hospitalization\n• IV drug use\n• Close contact with MRSA\n• Failure of first-line antibiotics [1][9]',
        citation: [1, 9],
        next: 'hi-disposition-outpatient',
    },
    {
        id: 'hi-disposition-outpatient',
        type: 'result',
        module: 6,
        title: 'Discharge — Outpatient Management',
        body: '**Discharge Criteria:**\n• ✅ No deep space involvement\n• ✅ No flexor tenosynovitis\n• ✅ No systemic toxicity\n• ✅ Reliable follow-up available\n• ✅ Able to comply with elevation/wound care\n\n**Discharge Instructions:**\n\n**Medications:**\n• Complete full antibiotic course\n• NSAIDs for pain (avoid if diabetic/renal disease)\n\n**Wound Care:**\n• Warm soaks 3-4x daily for 15-20 min\n• Keep elevated as much as possible\n• Daily dressing changes if packed\n\n**Follow-up:**\n• Primary care or hand surgery: 24-48h for post-drainage\n• 5-7 days for cellulitis without drainage\n\n**Return to ED if:**\n• Worsening pain or swelling\n• Fever >101°F\n• Red streaking up arm\n• New drainage or pus\n• Finger becomes numb or white',
        recommendation: 'Discharge with oral antibiotics, warm soaks, elevation. Follow-up 24-48h. Written return precautions.',
        citation: [1],
    },
    {
        id: 'hi-disposition-admit',
        type: 'result',
        module: 6,
        title: 'Admit — Inpatient Management',
        body: '**Admission Criteria:**\n• Flexor tenosynovitis (ALL cases)\n• Deep space infection (ALL cases)\n• Fight bite with deep involvement\n• Severe cellulitis with systemic signs\n• Failed outpatient therapy\n• Immunocompromised with hand infection\n• Unable to comply with outpatient management\n\n**Admission Orders:**\n• IV antibiotics (see antibiotic selection)\n• Hand surgery consult\n• Splint in position of function\n• Elevation above heart level\n• NPO if OR anticipated\n• Pain management\n• Tetanus update\n\n**Position of Function Splint:**\n• Wrist: 20-30° extension\n• MCP: 70-90° flexion\n• IP joints: slight flexion or extended\n\n**Labs:** CBC, BMP, ESR/CRP if osteomyelitis concern [1]',
        recommendation: 'Admit for IV antibiotics and hand surgery consult. Splint in position of function, elevation, NPO if OR anticipated.',
        citation: [1],
    },
];
export const HAND_INFECTIONS_MODULE_LABELS = [
    'Initial Assessment',
    'Felon',
    'Paronychia',
    'Flexor Tenosynovitis',
    'Fight Bite',
    'Deep Space & Disposition',
];
export const HAND_INFECTIONS_CITATIONS = [
    { num: 1, text: 'Stevenson A, Tyrell P, Kammani M, et al. The evaluation and management of hand infections in the emergency department. emDocs. 2024.' },
    { num: 2, text: 'Rigopoulos D, Larios G, Gregoriou S, et al. Acute and chronic paronychia. Am Fam Physician. 2008;77(3):339-346.' },
    { num: 3, text: 'Rockwell PG. Acute and chronic paronychia. Am Fam Physician. 2001;63(6):1113-1116.' },
    { num: 4, text: 'Pang HN, Teoh LC, Yam AK, et al. Factors affecting the prognosis of pyogenic flexor tenosynovitis. J Bone Joint Surg Am. 2007;89(8):1742-1748.' },
    { num: 5, text: 'Gutowski KA, Stav A, Baddley JW, et al. Pyogenic flexor tenosynovitis. StatPearls. 2024.' },
    { num: 6, text: 'Talan DA, Citron DM, Abrahamian FM, et al. Bacteriologic analysis of infected dog and cat bites. N Engl J Med. 1999;340(2):85-92.' },
    { num: 7, text: 'Rubright JH, Shafritz AB. The herpetic whitlow. J Hand Surg Am. 2011;36(2):340-342.' },
    { num: 8, text: 'Houshian S, Seyedipour S, Wedderkopp N. Epidemiology of bacterial hand infections. Int J Infect Dis. 2006;10(4):315-319.' },
    { num: 9, text: 'Liu C, Bayer A, Cosgrove SE, et al. Clinical practice guidelines by the IDSA for the treatment of MRSA infections. Clin Infect Dis. 2011;52(3):e18-55.' },
];
export const HAND_INFECTIONS_NODE_COUNT = HAND_INFECTIONS_NODES.length;
