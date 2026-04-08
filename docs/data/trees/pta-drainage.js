// MedKitt — Peritonsillar Abscess (PTA) Drainage
// Diagnosis → Ultrasound → Aspiration vs I&D → Medications → Disposition
// 6 modules: Diagnosis → POCUS → Needle Aspiration → Incision & Drainage → Medications → Disposition
// Based on Roberts & Hedges, EMCrit, EB Medicine
export const PTA_DRAINAGE_CRITICAL_ACTIONS = [
    { text: 'Use intraoral ultrasound to confirm abscess vs cellulitis - sensitivity 91%', nodeId: 'pta-pocus' },
    { text: 'NEEDLE DEPTH LIMIT: 8-10mm maximum to avoid carotid injury - mark syringe', nodeId: 'pta-aspiration-technique' },
    { text: 'Target SUPERIOR POLE of tonsil - 70% of abscesses located here', nodeId: 'pta-aspiration-technique' },
    { text: 'Use Color Doppler to identify carotid artery before any drainage procedure', nodeId: 'pta-pocus-technique' },
    { text: 'Dexamethasone 10mg single dose reduces pain, trismus, and speeds recovery', nodeId: 'pta-steroids' },
    { text: 'If no pus obtained despite confirmed position, likely peritonsillar cellulitis - antibiotics only', nodeId: 'pta-no-pus' },
    { text: 'Amoxicillin-clavulanate 875mg BID x 10 days for polymicrobial coverage', nodeId: 'pta-antibiotics' },
    { text: 'ENT follow-up in 24-36 hours mandatory - assess for reaccumulation', nodeId: 'pta-discharge' },
];
export const PTA_DRAINAGE_NODES = [
    // =====================================================================
    // MODULE 1: DIAGNOSIS
    // =====================================================================
    {
        id: 'pta-start',
        type: 'info',
        module: 1,
        title: 'Peritonsillar Abscess — Diagnosis',
        body: '[PTA Drainage Steps Summary](#/info/pta-steps)\n\n**Peritonsillar abscess (PTA)** is a collection of pus between the tonsillar capsule and pharyngeal muscles. [1][2]\n\n**Classic presentation:**\n• Severe sore throat (odynophagia)\n• "Hot potato" voice (muffled, wet)\n• Trismus (difficulty opening mouth) — 30-60%\n• Uvular deviation (pushed to opposite side)\n• Unilateral tonsillar swelling and exudate\n• Fever\n• Drooling\n\n**Symptom duration:** Typically 4+ days before abscess forms [2]\n\n**Key distinction:** Abscess vs peritonsillar cellulitis\n• Cellulitis: No drainable pus, antibiotics alone\n• Abscess: Requires drainage + antibiotics',
        citation: [1, 2],
        next: 'pta-clinical-exam',
    },
    {
        id: 'pta-clinical-exam',
        type: 'question',
        module: 1,
        title: 'Clinical Examination',
        body: '**Physical exam findings:** [1][2]\n\n**Inspect oropharynx:**\n• Asymmetric tonsillar swelling\n• Soft palate bulging\n• Uvula deviated AWAY from affected side\n• Tonsillar exudate\n\n**Assess trismus:**\n• Limited mouth opening (<3 cm)\n• May limit examination and procedure access\n\n**Palpate (if tolerated):**\n• Fluctuance over anterior tonsillar pillar\n• Tenderness\n\n**Clinical exam alone has sensitivity ~75%, specificity ~50%** [3]\n\n**Ultrasound improves diagnosis significantly — proceed to POCUS**',
        citation: [1, 2, 3],
        options: [
            {
                label: 'Classic PTA Findings',
                description: 'Uvular deviation, unilateral swelling, trismus',
                next: 'pta-pocus',
            },
            {
                label: 'Uncertain — Needs Imaging',
                description: 'Equivocal exam or bilateral findings',
                next: 'pta-pocus',
            },
            {
                label: 'Severe Trismus Limiting Exam',
                description: 'Cannot adequately visualize oropharynx',
                next: 'pta-trismus-management',
            },
        ],
    },
    {
        id: 'pta-trismus-management',
        type: 'info',
        module: 1,
        title: 'Managing Severe Trismus',
        body: '**Severe trismus limits examination and procedure access:** [1][2]\n\n**Strategies:**\n\n1. **Dexamethasone 10 mg IV/IM** — give first\n   • Reduces edema and trismus within 30-60 min\n   • Improves mouth opening significantly\n\n2. **Topical anesthesia spray**\n   • Benzocaine 20% or lidocaine 10%\n   • Reduces reflex guarding\n\n3. **Analgesics**\n   • Morphine 0.1 mg/kg IV or hydromorphone 1-2 mg IV\n   • Reduces pain-induced guarding\n\n4. **Procedural sedation** (if still inadequate)\n   • Propofol or ketamine\n   • Reserve for uncooperative patients or children\n\n**After trismus improves, proceed to ultrasound and drainage.**',
        citation: [1, 2],
        next: 'pta-pocus',
    },
    // =====================================================================
    // MODULE 2: POINT-OF-CARE ULTRASOUND
    // =====================================================================
    {
        id: 'pta-pocus',
        type: 'info',
        module: 2,
        title: 'Intraoral Ultrasound for PTA',
        body: '**Intraoral POCUS is gold standard for ED diagnosis:** [3][4]\n\n**Test characteristics:**\n• Sensitivity: 91%\n• Specificity: 75%\n• Eliminates need for CT in most cases\n\n**Advantages:**\n• Confirms abscess vs cellulitis\n• Measures abscess size and depth\n• Identifies carotid artery location\n• Guides needle aspiration in real-time\n\n**Indications for CT instead:**\n• Deep space infection concern (parapharyngeal, retropharyngeal)\n• Airway compromise\n• Failed ultrasound visualization\n• Atypical presentation\n\n[IMAGE: PTA Ultrasound Appearance](#/image/pta-ultrasound)',
        citation: [3, 4],
        next: 'pta-pocus-technique',
    },
    {
        id: 'pta-pocus-technique',
        type: 'info',
        module: 2,
        title: 'POCUS Technique',
        body: '**Equipment:** [3][4][5]\n• Endocavitary probe (preferred) with sterile sheath\n• Alternative: Linear hockey-stick probe\n• Sterile gel\n\n**Patient preparation:**\n• Upright position, head extended\n• Topical anesthetic spray to oropharynx\n• Wait 1-2 minutes for effect\n\n**Scanning technique:**\n1. Insert sheathed probe intraorally\n2. Direct toward suspected abscess\n3. Scan systematically: superior pole (70%), mid-tonsil, inferior pole\n4. Look for **hypoechoic/anechoic collection** = pus\n\n**Critical safety step:**\n• **Use Color Doppler to identify carotid artery**\n• Appears as pulsatile vessel posterior/lateral to abscess\n• Typically 2.5-4 cm deep to mucosal surface\n\n[IMAGE: Intraoral US Technique](#/image/pta-us-technique)\n\n**Measurements to document:**\n• Abscess size (cm)\n• Depth from mucosal surface\n• Distance to carotid artery',
        citation: [3, 4, 5],
        next: 'pta-us-findings',
    },
    {
        id: 'pta-us-findings',
        type: 'question',
        module: 2,
        title: 'Ultrasound Findings',
        body: '**Interpret the ultrasound:** [3][4]\n\n**Abscess (drainable):**\n• Hypoechoic or anechoic fluid collection\n• Well-defined borders\n• May have debris/loculations\n\n**Cellulitis (no drainage):**\n• Diffuse edema, no discrete collection\n• Hyperechoic "dirty" appearance\n• No anechoic pocket\n\n**What did ultrasound show?**',
        citation: [3, 4],
        options: [
            {
                label: 'Abscess Confirmed',
                description: 'Discrete hypoechoic collection identified',
                next: 'pta-drainage-decision',
            },
            {
                label: 'Cellulitis — No Abscess',
                description: 'Diffuse edema, no drainable collection',
                next: 'pta-cellulitis',
            },
            {
                label: 'Equivocal / Unclear',
                description: 'Cannot definitively confirm collection',
                next: 'pta-equivocal',
            },
        ],
    },
    {
        id: 'pta-cellulitis',
        type: 'result',
        module: 2,
        title: 'Peritonsillar Cellulitis — No Drainage',
        body: '**No drainable abscess identified — treat with antibiotics alone:** [1][2]\n\n**Management:**\n• IV antibiotics if unable to tolerate PO\n• Dexamethasone 10 mg IV/IM single dose\n• Observation 4-6 hours for improvement\n• IV fluids if dehydrated\n\n**Antibiotics:**\n• [Amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/pta) 875/125 mg PO BID × 10 days\n• Or [Clindamycin](#/drug/clindamycin/pta) 300-450 mg PO Q8h × 10 days\n\n**Consider admission if:**\n• Unable to tolerate oral intake\n• Severe dehydration\n• Immunocompromised\n• No improvement after 4-6h observation\n\n**Follow-up:**\n• ENT/PCP within 24-48 hours\n• If worsening → repeat ultrasound (abscess may develop)',
        recommendation: 'Peritonsillar cellulitis — antibiotics + steroids, no drainage. Close follow-up.',
        confidence: 'definitive',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Amoxicillin-clavulanate',
                dose: '875/125 mg',
                route: 'PO',
                frequency: 'BID',
                duration: '10 days',
                notes: 'Good anaerobic + aerobic coverage',
            },
            monitoring: 'ENT/PCP follow-up within 24-48h. Repeat US if worsening.',
        },
    },
    {
        id: 'pta-equivocal',
        type: 'info',
        module: 2,
        title: 'Equivocal Ultrasound',
        body: '**If ultrasound findings are unclear:** [1][4]\n\n**Options:**\n\n1. **Diagnostic needle aspiration**\n   • Even if US equivocal, aspiration attempt is reasonable\n   • No pus obtained = cellulitis (treat medically)\n   • Pus obtained = abscess (continue drainage)\n\n2. **CT scan with contrast**\n   • More definitive if diagnosis uncertain\n   • Especially if concern for deep space extension\n   • Consider if: atypical presentation, failed aspiration, airway concern\n\n3. **Trial of antibiotics + steroids with close follow-up**\n   • If low clinical suspicion\n   • Repeat exam/US in 24 hours\n\n**Recommended approach:** Proceed to diagnostic aspiration unless CT clearly indicated.',
        citation: [1, 4],
        next: 'pta-drainage-decision',
    },
    {
        id: 'pta-drainage-decision',
        type: 'question',
        module: 2,
        title: 'Choose Drainage Method',
        body: '**Needle aspiration vs Incision & Drainage:** [1][2][6]\n\n**Needle Aspiration:**\n• First-line for most patients\n• Less painful, faster\n• Success rate 85-95%\n• Can be US-guided\n\n**Incision & Drainage:**\n• For large abscesses (>2 cm)\n• Recurrent drainage needed\n• Failed needle aspiration (2 attempts)\n• Multiple loculations\n• Patient preference\n\n**Which approach?**',
        citation: [1, 2, 6],
        options: [
            {
                label: 'Needle Aspiration',
                description: 'First-line, US-guided preferred',
                next: 'pta-aspiration-prep',
            },
            {
                label: 'Incision & Drainage',
                description: 'Large abscess, recurrent, or aspiration failed',
                next: 'pta-id-prep',
            },
        ],
    },
    // =====================================================================
    // MODULE 3: NEEDLE ASPIRATION
    // =====================================================================
    {
        id: 'pta-aspiration-prep',
        type: 'info',
        module: 3,
        title: 'Aspiration — Preparation',
        body: '**Equipment:** [1][5][6]\n• 18-gauge needle on 10 mL syringe\n• Needle guard or **depth limiter** (CRITICAL)\n• Headlamp for visualization\n• Yankauer suction\n• Topical anesthetic spray (benzocaine 20% or lidocaine 10%)\n• Local anesthetic: Lidocaine 1% with epinephrine (optional)\n\n**Set up depth limiter:**\n• Mark syringe at **10 mm** from needle tip\n• Or use commercial needle guard\n• **Maximum insertion depth: 8-10 mm**\n\n[IMAGE: Needle Depth Limiter Setup](#/image/pta-needle-guard)\n\n**Patient positioning:**\n• Upright, seated\n• Head extended slightly backward\n• Mouth open maximally\n• Basin available to spit (not swallow)',
        citation: [1, 5, 6],
        next: 'pta-anesthesia',
    },
    {
        id: 'pta-anesthesia',
        type: 'info',
        module: 3,
        title: 'Anesthesia',
        body: '**Topical anesthesia (always):** [1][6]\n• Spray benzocaine 20% (Cetacaine) or lidocaine 10% generously\n• Cover tonsil, soft palate, base of tongue\n• Wait 1-2 minutes for effect\n• Reduces gag reflex and provides mucosal anesthesia\n\n**Local infiltration (optional, for I&D or difficult aspiration):**\n• Lidocaine 1% with epinephrine\n• 27-gauge needle, 6-10 mL total\n• Inject around fluctuant area\n• Inject at base of uvula\n• Inject along anterior tonsillar pillar\n• **Aspirate before each injection** (avoid intravascular)\n• Wait 2-3 minutes for effect\n\n**Dexamethasone 10 mg IV/IM** — give before or during procedure\n• Reduces edema, pain, trismus\n• Improves outcomes',
        citation: [1, 6],
        next: 'pta-aspiration-technique',
    },
    {
        id: 'pta-aspiration-technique',
        type: 'info',
        module: 3,
        title: 'Needle Aspiration Technique',
        body: '**CRITICAL SAFETY: Limit needle depth to 8-10 mm** [1][5][6]\n\nCarotid artery is 2.5-4 cm posterior/lateral to tonsil.\n\n**Target:** Superior pole of tonsil (70% of abscesses)\n\n**Technique:**\n1. Visualize with headlamp and tongue depressor\n2. Insert 18g needle at 45° angle toward tonsillar fossa\n3. Advance **MAXIMUM 8-10 mm** (use depth limiter!)\n4. Aspirate while slowly withdrawing\n5. If no pus, redirect slightly and repeat\n6. Maximum 2-3 passes in superior pole area\n\n[IMAGE: PTA Aspiration Technique](#/image/pta-aspiration)\n\n**Ultrasound-guided (preferred):**\n• Attach needle guide to US probe\n• Visualize needle tip entering collection in real-time\n• Maintain needle visualization throughout\n• Color Doppler confirms vessel location\n\n**Volume expectations:**\n• Small abscess: 1-5 mL\n• Moderate: 5-15 mL\n• Large: >15 mL',
        citation: [1, 5, 6],
        next: 'pta-aspiration-result',
    },
    {
        id: 'pta-aspiration-result',
        type: 'question',
        module: 3,
        title: 'Aspiration Result',
        body: '**Assess what was aspirated:** [1][6]\n\n**Successful aspiration:**\n• Purulent material obtained\n• Patient often feels immediate relief\n• Swelling/bulge may decrease\n\n**Unsuccessful:**\n• No pus despite 2-3 attempts in correct location\n• Only blood obtained',
        options: [
            {
                label: 'Pus Obtained',
                description: 'Successful drainage of abscess',
                next: 'pta-post-aspiration',
            },
            {
                label: 'No Pus — Position Confirmed',
                description: 'Needle in correct location but no purulent material',
                next: 'pta-no-pus',
            },
            {
                label: 'Aspiration Failed — Need I&D',
                description: 'Unable to drain adequately, proceed to incision',
                next: 'pta-id-prep',
            },
        ],
    },
    {
        id: 'pta-no-pus',
        type: 'result',
        module: 3,
        title: 'No Pus Obtained — Likely Cellulitis',
        body: '**If needle position confirmed but no pus:** [1][2]\n\n**This is likely peritonsillar cellulitis, not abscess.**\n\n**Management:**\n• Treat as cellulitis (antibiotics alone)\n• Dexamethasone 10 mg if not already given\n• Observe 4-6 hours for improvement\n\n**Antibiotics:**\n• [Amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/pta) 875/125 mg PO BID × 10 days\n• PCN allergy: [Clindamycin](#/drug/clindamycin/pta) 300-450 mg Q8h × 10 days\n\n**Consider CT if:**\n• Clinical suspicion very high despite negative aspiration\n• Concern for deep space infection\n• No clinical improvement despite antibiotics\n\n**Follow-up:**\n• ENT 24-48 hours\n• May develop abscess requiring drainage later',
        recommendation: 'Likely cellulitis. Treat with antibiotics + steroids. Close follow-up mandatory.',
        confidence: 'recommended',
        citation: [1, 2],
    },
    {
        id: 'pta-post-aspiration',
        type: 'info',
        module: 3,
        title: 'Post-Aspiration Care',
        body: '**After successful needle aspiration:** [1][6]\n\n**Immediate care:**\n• Withdraw needle slowly while observing for bleeding\n• Have patient spit (not swallow) any blood/drainage\n• Ice water gargles × 2-3 minutes — reduces bleeding, promotes drainage\n• Observe 30-45 minutes\n\n**Assess adequacy:**\n• Patient reports pain relief\n• Swelling decreased\n• Voice improved\n• Trismus improved\n\n**If significant residual collection:**\n• May repeat aspiration once\n• Consider I&D if large remaining pocket\n\n**Next steps:**\n• Medications (antibiotics + steroids)\n• Disposition planning',
        citation: [1, 6],
        next: 'pta-antibiotics',
    },
    // =====================================================================
    // MODULE 4: INCISION & DRAINAGE
    // =====================================================================
    {
        id: 'pta-id-prep',
        type: 'info',
        module: 4,
        title: 'Incision & Drainage — Preparation',
        body: '**Indications for I&D over aspiration:** [1][6][7]\n• Large abscess (>2 cm diameter)\n• Recurrent abscess or prior failed aspiration\n• Multiple loculations suspected\n• Uncooperative patient (with sedation)\n• Patient or provider preference\n\n**Equipment:**\n• #11 or #15 scalpel blade\n• Curved hemostat (Kelly or Mosquito)\n• Headlamp\n• Yankauer suction\n• Local anesthetic (1% lidocaine with epi, 27g needle)\n• Topical anesthetic spray\n\n**Anesthesia:**\n• Topical spray first (benzocaine 20%)\n• Local infiltration: 6-10 mL lidocaine 1% with epi\n  - Around fluctuant area\n  - Base of uvula\n  - Anterior tonsillar pillar\n• Wait 2-3 minutes for effect',
        citation: [1, 6, 7],
        next: 'pta-id-technique',
    },
    {
        id: 'pta-id-technique',
        type: 'info',
        module: 4,
        title: 'I&D Technique',
        body: '**Incision & Drainage technique:** [1][6][7]\n\n**Incision location:**\n• Anterior tonsillar pillar (mucosa only)\n• Curvilinear or vertical incision\n• From base of uvula toward last mandibular molar\n• Length: 1.0-1.5 cm\n• Stay on ANTERIOR pillar — avoid lateral (carotid) direction\n\n**Depth:**\n• Superficial incision through mucosa only\n• Penetrate just enough to enter abscess cavity\n• Limit depth to **5-8 mm**\n• Scalpel angle: 45°, directed medially\n\n[IMAGE: PTA Incision Site](#/image/pta-incision)\n\n**Blunt dissection:**\n1. After incision, insert closed hemostat into cavity\n2. Spread gently in 2-3 directions\n3. Opens cavity and breaks loculations\n4. One large deliberate spread usually sufficient\n5. Evacuate pus with suction\n\n**Do NOT suture** — leave open for continued drainage (heals in 3-5 days)',
        citation: [1, 6, 7],
        next: 'pta-post-id',
    },
    {
        id: 'pta-post-id',
        type: 'info',
        module: 4,
        title: 'Post-I&D Care',
        body: '**After incision and drainage:** [1][6]\n\n**Immediate:**\n• Suction any remaining pus/blood\n• Have patient spit (not swallow)\n• Ice water gargles × 2-3 minutes\n• Observe for 30-45 minutes\n\n**Complications to watch for:**\n• Bleeding (usually minor, self-limited)\n• Aspiration of pus\n• Inadequate drainage (may need revision)\n\n**If brisk bleeding:**\n• Direct pressure with gauze\n• Consider topical epinephrine (1:1000)\n• Usually resolves with 10-15 min pressure\n• Persistent bleeding → ENT consultation\n\n**Next steps:**\n• Medications (antibiotics + steroids)\n• Disposition planning',
        citation: [1, 6],
        next: 'pta-antibiotics',
    },
    // =====================================================================
    // MODULE 5: MEDICATIONS
    // =====================================================================
    {
        id: 'pta-antibiotics',
        type: 'info',
        module: 5,
        title: 'Antibiotic Selection',
        body: '**PTA is polymicrobial — need anaerobic + aerobic coverage:** [1][2][8]\n\n**First-line oral:**\n• [Amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/pta) 875/125 mg PO BID × 10-14 days\n\n**Penicillin allergy:**\n• [Clindamycin](#/drug/clindamycin/pta) 300-450 mg PO Q6-8h × 10-14 days\n\n**IV options (if admission):**\n• Ampicillin-sulbactam 3 g IV Q6h\n• OR Clindamycin 600-900 mg IV Q6-8h\n\n**Severe/immunocompromised:**\n• Clindamycin 600 mg IV Q6h + Ceftriaxone 1-2 g IV Q12h\n• Add Vancomycin if MRSA concern\n\n**Pediatric dosing:**\n• Amoxicillin-clavulanate: 45 mg/kg/day divided Q12h (max 875 mg/dose)\n• Clindamycin: 10 mg/kg Q8h (max 600 mg/dose)',
        citation: [1, 2, 8],
        next: 'pta-steroids',
    },
    {
        id: 'pta-steroids',
        type: 'info',
        module: 5,
        title: 'Corticosteroids',
        body: '**Single-dose steroids improve outcomes:** [1][2][9]\n\n**Adult dose:**\n• [Dexamethasone](#/drug/dexamethasone/pta) 10 mg IV/IM/PO × 1\n• OR Methylprednisolone 2-3 mg/kg IV/IM\n\n**Pediatric dose:**\n• Dexamethasone 0.6 mg/kg PO × 1 (max 10 mg)\n\n**Benefits:**\n• Reduces pain and trismus\n• Decreases edema\n• Shortens hospital stay\n• Speeds recovery\n\n**Timing:** Give at or before drainage for maximum benefit\n\n**Safety:** Single dose is safe — no increased infection risk',
        citation: [1, 2, 9],
        next: 'pta-pain-management',
    },
    {
        id: 'pta-pain-management',
        type: 'info',
        module: 5,
        title: 'Pain Management',
        body: '**Adequate analgesia improves oral intake:** [1]\n\n**Oral options:**\n• Acetaminophen 650-1000 mg Q6h\n• Ibuprofen 400-600 mg Q6h\n• Combination: Alternate acetaminophen/ibuprofen Q3h\n\n**Topical:**\n• Benzocaine spray Q2-3h PRN for throat comfort\n• Viscous lidocaine 2% swish and spit\n\n**Opioids (for severe pain):**\n• Hydrocodone/acetaminophen 5/325 mg Q4-6h PRN\n• Limited course (3-5 days)\n\n**Other comfort measures:**\n• Ice chips, cold liquids\n• Soft, bland diet\n• Avoid acidic foods',
        citation: [1],
        next: 'pta-disposition-decision',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'pta-disposition-decision',
        type: 'question',
        module: 6,
        title: 'Disposition Decision',
        body: '**Assess for safe discharge:** [1][2][10]\n\n**Discharge criteria:**\n• Post-drainage observation 30-45 min without complication\n• Patient tolerates oral fluids\n• Pain controlled\n• Minimal bleeding\n• Reliable follow-up\n• Able to take oral antibiotics\n\n**Admission criteria:**\n• Unable to tolerate oral intake/medications\n• Severe dehydration\n• Airway compromise (stridor, drooling)\n• Deep neck space infection concern\n• Signs of sepsis\n• Immunocompromised or age >40\n• Complications (hemorrhage, aspiration)\n• Failed outpatient management',
        citation: [1, 2, 10],
        options: [
            {
                label: 'Safe for Discharge',
                description: 'Meets all discharge criteria',
                next: 'pta-discharge',
            },
            {
                label: 'Requires Admission',
                description: 'Cannot tolerate PO, airway concern, or other admission criteria',
                next: 'pta-admission',
            },
        ],
    },
    {
        id: 'pta-discharge',
        type: 'result',
        module: 6,
        title: 'PTA — Discharge',
        body: '**Discharge planning:** [1][2][10]\n\n**Prescriptions:**\n• Antibiotics × 10-14 days (see antibiotic section)\n• Dexamethasone 10 mg PO × 1 if not given IV\n• Analgesics PRN\n\n**Follow-up:**\n• **ENT or PCP within 24-36 hours** — MANDATORY\n• Check for reaccumulation, assess healing\n• Earlier if symptoms worsen\n\n**Return precautions:**\n• Difficulty breathing or swallowing\n• Worsening pain or swelling\n• Fever >24h after drainage\n• Significant bleeding\n• Unable to tolerate fluids\n\n**Instructions:**\n• Soft, bland diet\n• Stay hydrated\n• Complete entire antibiotic course\n• Chlorhexidine mouthwash BID optional\n\n**Tonsillectomy referral:**\n• Discuss if recurrent PTA (>1 episode in 12 months)',
        recommendation: 'Discharge with antibiotics 10-14 days. ENT follow-up within 24-36 hours mandatory.',
        confidence: 'definitive',
        citation: [1, 2, 10],
    },
    {
        id: 'pta-admission',
        type: 'result',
        module: 6,
        title: 'PTA — Admission',
        body: '**Admission orders:** [1][2]\n\n**Nursing:**\n• NPO if surgical intervention anticipated\n• IV fluids (NS or LR)\n• Head of bed elevated 30°\n• Strict I&Os\n\n**Medications:**\n• IV antibiotics: Ampicillin-sulbactam 3 g Q6h\n  OR Clindamycin 600-900 mg Q6-8h\n• Dexamethasone 10 mg IV × 1 if not given\n• IV analgesics PRN\n• IV fluids for hydration\n\n**Consultations:**\n• ENT (all admissions)\n• Anesthesia consult if airway concern\n\n**Monitoring:**\n• Airway assessment Q4h\n• Pain score\n• Ability to tolerate oral intake\n• Fever curve\n\n**CT scan if:**\n• Concern for deep space spread\n• No improvement within 24h\n• Atypical presentation',
        recommendation: 'Admit for IV antibiotics, hydration, ENT consultation. Monitor airway closely.',
        confidence: 'definitive',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Ampicillin-sulbactam',
                dose: '3 g',
                route: 'IV',
                frequency: 'Q6h',
                duration: 'Until tolerating PO',
                notes: 'Then complete with oral amoxicillin-clavulanate',
            },
            alternative: {
                drug: 'Clindamycin',
                dose: '600-900 mg',
                route: 'IV',
                frequency: 'Q6-8h',
                duration: 'Until tolerating PO',
                notes: 'For penicillin allergy',
            },
            monitoring: 'Airway assessment Q4h, ability to tolerate PO, fever curve. CT if no improvement 24h.',
        },
    },
    // =====================================================================
    // COMPLICATIONS NODE
    // =====================================================================
    {
        id: 'pta-complications',
        type: 'info',
        module: 4,
        title: 'Complications & Prevention',
        body: '**Procedure complications:** [1][6][11]\n\n**Carotid artery injury** (most feared)\n• Prevention: Depth limit 8-10mm, Color Doppler, medial needle direction\n• If hemorrhage: Direct pressure ± topical epi\n• Uncontrolled: ENT/vascular surgery emergently\n\n**Post-aspiration hemorrhage**\n• Usually minor, self-limited\n• Ice water gargles, direct pressure\n• Delayed hemorrhage (>24h) → rule out pseudoaneurysm\n\n**Aspiration**\n• Keep patient upright\n• Spit, not swallow\n• Suction available\n\n**Recurrence**\n• Rate: 2-15%\n• Risk factors: incomplete drainage, large abscess, inadequate antibiotics\n• Prevention: Complete evacuation, full antibiotic course, close follow-up\n\n**If recurrent (>1 episode/12 months):**\n• Tonsillectomy referral',
        citation: [1, 6, 11],
    },
];
export const PTA_DRAINAGE_MODULE_LABELS = [
    'Diagnosis',
    'POCUS',
    'Needle Aspiration',
    'Incision & Drainage',
    'Medications',
    'Disposition',
];
export const PTA_DRAINAGE_CITATIONS = [
    { num: 1, text: 'Roberts JR, Hedges JR. Clinical Procedures in Emergency Medicine and Acute Care, 8th ed. Elsevier, 2023.' },
    { num: 2, text: 'Galioto NJ. Peritonsillar Abscess. Am Fam Physician. 2017;95(8):501-506.' },
    { num: 3, text: 'Costantino TG, et al. Test characteristics of ultrasound for peritonsillar abscess: Systematic review and meta-analysis. Acad Emerg Med. 2023;30(3):261-269.' },
    { num: 4, text: 'Secko M, et al. A Novel Technique for Intraoral Ultrasound-Guided Aspiration of Peritonsillar Abscess. West J Emerg Med. 2018;19(5):823-826.' },
    { num: 5, text: 'ALiEM. Tricks: Peritonsillar Abscess Drainage 3.0 — All Steps and Variations. aliem.com.' },
    { num: 6, text: 'StatPearls. Peritonsillar Abscess. NCBI Bookshelf, 2024.' },
    { num: 7, text: 'Children\'s Minnesota. Incision and Drainage of a Peritonsillar Abscess. childrensmn.org.' },
    { num: 8, text: 'Emergency Care BC. Clinical Summary: Peritonsillar Abscess. emergencycarebc.ca.' },
    { num: 9, text: 'Ozbek C, et al. Use of steroids in the treatment of peritonsillar abscess. J Laryngol Otol. 2004;118(6):439-42.' },
    { num: 10, text: 'Management Protocol for Uncomplicated Peritonsillar Abscess. PMC. 2024.' },
    { num: 11, text: 'Carotid Hemorrhage: Complication of Peritonsillar Abscess. Laryngoscope. 1985.' },
];
