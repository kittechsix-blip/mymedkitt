// MedKitt — Auricular Hematoma Drainage Consult
// Timing screen → Anesthesia → Aspirate vs I&D → Bolster → Aftercare → Failure pathway
// Category: Procedures. 6 modules, ~17 nodes.
// Sources: ALiEM, LITFL, StatPearls NBK531499, AAO-HNS guidance.
export const AURICULAR_HEMATOMA_DRAINAGE_MODULE_LABELS = [
    'Timing & Confirmation',
    'Anesthesia',
    'Drainage Technique',
    'Bolster & Compression',
    'Aftercare',
    'Failure & Recurrence',
];
export const AURICULAR_HEMATOMA_DRAINAGE_CITATIONS = [
    { num: 1, text: 'Greywoode JD, Pribitkin EA, Krein H. Management of auricular hematoma and the cauliflower ear. Facial Plast Surg. 2010;26(6):451-455. PMID: 21086234.' },
    { num: 2, text: 'Patel BC, Skidmore K, Hutchison J, Hatcher JD. Auricular Hematoma. StatPearls. Treasure Island (FL): StatPearls Publishing; 2024. Bookshelf ID: NBK531499.' },
    { num: 3, text: 'Krogmann RJ, King KC. Auricular Hematoma Drainage. Roberts and Hedges\' Clinical Procedures in Emergency Medicine. 7th ed. 2019.' },
    { num: 4, text: 'Eagles K, Fralich L, Stevenson JH. Ear trauma. Clin Sports Med. 2013;32(2):303-316. PMID: 23522513.' },
    { num: 5, text: 'Jones SE, Mahendran S. Interventions for acute auricular haematoma. Cochrane Database Syst Rev. 2004;(2):CD004166. PMID: 15106240.' },
    { num: 6, text: 'Roy S, Smith LP. A novel technique for treating auricular hematomas in mixed martial artists (ultimate fighters). Am J Otolaryngol. 2010;31(1):21-24. PMID: 19944895.' },
    { num: 7, text: 'ALiEM. Trick of the Trade: Auricular Hematoma Drainage. https://www.aliem.com/auricular-hematoma-drainage/' },
    { num: 8, text: 'LITFL. Auricular Haematoma. https://litfl.com/auricular-haematoma/' },
    { num: 9, text: 'Managing Auricular Hematoma: An Emergency Medicine Narrative Review. J Emerg Med. 2024. doi:10.1016/j.jemermed.2024.05.003. (Confirms: drain fluctuant hematoma within 7 days; needle aspiration or I&D + bolster; 7-10 day antipseudomonal prophylaxis — fluoroquinolone in adults, amoxicillin-clavulanate in children.)' },
];
export const AURICULAR_HEMATOMA_DRAINAGE_CRITICAL_ACTIONS = [
    { text: 'Evacuate within 7 days (ideally <48-72h) to prevent cauliflower ear', nodeId: 'ahd-start' },
    { text: 'Use great auricular + auriculotemporal nerve block for full ear anesthesia', nodeId: 'ahd-anesthesia' },
    { text: 'Bolster compression is MANDATORY — drainage without bolster will re-accumulate', nodeId: 'ahd-bolster' },
    { text: 'Recheck at 24-48h for re-accumulation; remove bolster at 7-10 days', nodeId: 'ahd-aftercare' },
    { text: 'Perichondritis (red, hot, fever) = IV antipseudomonal + ENT urgently', nodeId: 'ahd-failure' },
];
export const AURICULAR_HEMATOMA_DRAINAGE_NODES = [
    // =====================================================================
    // MODULE 1: TIMING & CONFIRMATION
    // =====================================================================
    {
        id: 'ahd-start',
        type: 'info',
        module: 1,
        title: 'Auricular Hematoma Drainage',
        body: '> 🚨 **Time-critical procedure.** Untreated auricular hematomas cause cauliflower ear deformity from cartilage avascular necrosis and neocartilage proliferation. Drainage window: ideally **<48-72h**, acceptable up to **7 days** with full technique. After 7 days, the organized hematoma needs ENT.\n\n[Steps Summary](#/info/ahd-steps) — full procedural walkthrough.\n\n**Definition:** Subperichondrial blood collection of the pinna, typically from blunt trauma (wrestling, MMA, rugby, assault). The shearing force separates the perichondrium from the underlying cartilage, depriving cartilage of its only blood supply.\n\n**Key principle:** Drainage alone is not enough. **Compression bolstering is mandatory** to re-approximate the perichondrium to the cartilage, or the cavity re-fills within hours.\n\n**Anatomy reminder:** Cartilage gets all its blood supply through the perichondrium. Hematoma separates the two → cartilage dies → fibrocartilage replacement → cauliflower deformity.',
        citation: [1, 2, 3, 4],
        next: 'ahd-confirm',
        summary: 'Drain within 48-72h ideally, up to 7 days; bolster is mandatory; cartilage dies without perichondrial blood supply',
        safetyLevel: 'critical',
        skippable: false,
    },
    {
        id: 'ahd-confirm',
        type: 'question',
        module: 1,
        title: 'Confirm Diagnosis & Timing',
        body: 'Confirm a true auricular hematoma and decide if ED drainage is appropriate.\n\n**Diagnostic features:**\n- Fluctuant, tender swelling of the anterior pinna (most common at scapha/triangular fossa)\n- Loss of normal cartilaginous contour\n- History of blunt trauma\n- Ecchymosis or overlying laceration may be present\n\n**Exclude:** simple ecchymosis (non-fluctuant), cellulitis, perichondritis (red, hot, fever, systemic), abscess.',
        options: [
            {
                label: 'Acute hematoma <48h, no infection',
                description: 'Fluctuant, tender, no fever/redness — ideal ED drainage candidate',
                next: 'ahd-anesthesia',
            },
            {
                label: 'Subacute 48h to 7 days, no infection',
                description: 'Still amenable to ED drainage — favor I&D over needle aspiration',
                next: 'ahd-anesthesia',
            },
            {
                label: '>7 days or organized/firm',
                description: 'Likely organized clot or early cauliflower — needs ENT for formal drainage',
                next: 'ahd-late-presentation',
            },
            {
                label: 'Signs of perichondritis or abscess',
                description: 'Red, hot, fever, fluctuant pus, systemic illness',
                next: 'ahd-perichondritis',
                urgency: 'critical',
            },
        ],
        citation: [1, 2, 4],
        summary: 'Fluctuant tender pinna swelling; drain if <7d, no infection; >7d or infected = ENT',
        safetyLevel: 'warning',
    },
    {
        id: 'ahd-late-presentation',
        type: 'result',
        module: 1,
        title: 'Late Presentation (>7 days)',
        body: '**>7 days old or organized/firm hematoma = ENT consult.** ED needle aspiration usually fails because the clot has organized into fibrin and early neocartilage. Forced drainage risks cartilage injury and incomplete evacuation.',
        recommendation: '**Disposition:**\n• Urgent ENT or facial plastics referral within 24-48h\n• They may still drain in clinic/OR with formal incision and through-and-through bolster\n• If patient declines ENT and the deformity is unacceptable, late surgical contouring is an option (but at that point the cartilage damage is mostly done)\n• No emergent ED drainage attempt — risks making the deformity worse',
        confidence: 'recommended',
        citation: [1, 4],
        summary: '>7d organized hematoma needs ENT; ED drainage will fail and may worsen deformity',
    },
    {
        id: 'ahd-perichondritis',
        type: 'result',
        module: 1,
        title: 'Perichondritis or Abscess — STOP',
        body: '**Red, hot pinna with fever or systemic features = perichondritis until proven otherwise.** This is a soft-tissue infection of the perichondrium, most commonly **Pseudomonas aeruginosa**. Untreated perichondritis destroys cartilage and produces the same cauliflower deformity as untreated hematoma, plus sepsis risk.',
        recommendation: '**Immediate management:**\n• IV antipseudomonal coverage: [Ciprofloxacin](#/drug/ciprofloxacin/perichondritis) 400mg IV q12h OR [Piperacillin-tazobactam](#/drug/piperacillin-tazobactam/perichondritis) 3.375g IV q6h\n• Urgent ENT consultation for incision and drainage if abscess present\n• Do NOT perform routine hematoma drainage — this is infection, not hematoma\n• Admit for IV therapy if systemic illness, immunocompromised, or failed outpatient management\n• Cultures from any drained pus\n\n**Discharge only if:** afebrile, no abscess, reliable patient, oral ciprofloxacin 750mg BID x 7-10 days, ENT follow-up 24-48h.',
        treatment: {
            firstLine: {
                drug: 'Ciprofloxacin',
                dose: '400mg IV q12h (or 750mg PO BID if outpatient)',
                route: 'IV or PO',
                frequency: 'q12h IV / BID PO',
                duration: '7-10 days',
                notes: 'Pseudomonas coverage is essential. Avoid in pregnancy and pediatrics where possible — use piperacillin-tazobactam instead.',
            },
            monitoring: 'Recheck 24-48h; escalate to admission if worsening',
        },
        confidence: 'definitive',
        citation: [1, 2, 4],
        safetyLevel: 'critical',
        summary: 'Red hot pinna ± fever = perichondritis; cover Pseudomonas (cipro or pip-tazo); urgent ENT',
    },
    // =====================================================================
    // MODULE 2: ANESTHESIA
    // =====================================================================
    {
        id: 'ahd-anesthesia',
        type: 'info',
        module: 2,
        title: 'Anesthesia — Great Auricular + Auriculotemporal Block',
        body: '[Block landmarks reference](#/info/ahd-block) — landmark and technique details.\n\n**Why regional block beats local infiltration:** Direct infiltration into already-swollen, tense skin is painful and distorts anatomy. A field block from outside the hematoma is more comfortable and provides complete anesthesia.\n\n**Technique:** Inject [Lidocaine 1%](#/drug/lidocaine/auricular-block) **without epinephrine** as a ring block around the base of the auricle, targeting the great auricular nerve (posterior/inferior) and auriculotemporal nerve (anterior/superior). 5-10 mL total typically sufficient.\n\n**Epinephrine on the pinna:** Modern evidence shows lidocaine-with-epi on the ear is generally safe in well-perfused patients (no documented necrosis in case series), but the **traditional teaching avoids it** and there is no advantage to its use here — plain lidocaine is preferred for the auricular block.\n\n**Pediatric consideration:** Procedural sedation may be needed for children — see [Procedural Sedation](#/tree/procedural-sedation).',
        citation: [2, 3, 7],
        next: 'ahd-technique',
        summary: 'Great auricular + auriculotemporal ring block with plain lidocaine 1%; avoid epi on pinna by convention',
    },
    // =====================================================================
    // MODULE 3: DRAINAGE TECHNIQUE
    // =====================================================================
    {
        id: 'ahd-technique',
        type: 'question',
        module: 3,
        title: 'Aspiration vs Incision & Drainage',
        body: '**Cochrane review (Jones 2004) found no high-quality trials comparing the two approaches.** Practice has shifted toward I&D for most hematomas because of lower recurrence rates.\n\n[Aspirate vs I&D comparison](#/info/ahd-aspirate-vs-id) — full pros/cons table.\n\n**Practical guidance:**\n- **Small acute (<2 cm, <48h, first episode):** needle aspiration is reasonable as first attempt\n- **Larger (≥2 cm), >48h old, recurrent, or organized:** go straight to I&D — aspiration will likely fail',
        options: [
            {
                label: 'Small, acute, first episode',
                description: '<2 cm, <48h, no prior drainage — try aspiration',
                next: 'ahd-aspirate',
            },
            {
                label: 'Large, subacute, or recurrent',
                description: '≥2 cm OR 48h-7d OR prior aspiration failed',
                next: 'ahd-incision',
            },
        ],
        citation: [1, 2, 5, 6],
        summary: 'Small acute first-episode = needle aspirate; larger/older/recurrent = I&D',
    },
    {
        id: 'ahd-aspirate',
        type: 'info',
        module: 3,
        title: 'Needle Aspiration Technique',
        body: '**Indication:** Small (<2 cm), acute (<48h), first-episode hematoma.\n\n**Steps:**\n1. Sterile prep, drape\n2. Confirm anesthesia from regional block\n3. Insert **18-gauge needle** on 5-10 mL syringe at the **dependent (inferior)** edge of the hematoma at an oblique angle\n4. Aspirate to dryness — expect dark non-clotting blood; if clotted material returns, switch to I&D\n5. Milk the cavity from the periphery to express residual blood\n6. Withdraw needle; immediately move to bolster placement\n\n**Aspiration is the procedure, but bolstering is what prevents re-accumulation.** Skipping the bolster is the most common reason aspiration fails.\n\n**Failure rate:** Aspiration alone (no bolster) recurs in ~70%. Aspiration + bolster recurs in ~15-30%. I&D + bolster recurs in <15%.',
        citation: [1, 2, 5, 6],
        next: 'ahd-bolster',
        summary: '18G needle at dependent edge, aspirate to dryness, milk cavity; bolster is what prevents recurrence',
    },
    {
        id: 'ahd-incision',
        type: 'info',
        module: 3,
        title: 'Incision & Drainage Technique',
        body: '**Indication:** ≥2 cm, 48h-7d old, recurrent, or organized clot.\n\n**Steps:**\n1. Sterile prep, drape\n2. Confirm regional block\n3. Make a **curvilinear incision** parallel to the rim of the helix along the most prominent point of the hematoma — keeps the scar hidden in a natural skin fold\n4. Incision length: just long enough to admit a hemostat tip (typically 1-2 cm)\n5. Evacuate clot with **gentle hemostat sweep + suction + saline irrigation**\n6. Inspect the cavity — ensure cartilage is intact, no underlying laceration\n7. **Do not close the skin** — leaving it open allows drainage if any re-accumulation occurs\n8. Apply bolster immediately\n\n**Pearl:** Resist the urge to use a wide incision. A small 1-cm curvilinear incision is enough, heals well, and is cosmetically acceptable.',
        citation: [1, 2, 3, 6],
        next: 'ahd-bolster',
        summary: 'Curvilinear incision parallel to helix rim, sweep clot with hemostat, irrigate, leave open, bolster immediately',
    },
    // =====================================================================
    // MODULE 4: BOLSTER & COMPRESSION
    // =====================================================================
    {
        id: 'ahd-bolster',
        type: 'info',
        module: 4,
        title: 'Bolster Construction — MANDATORY',
        body: '**Drainage without bolster will re-accumulate within hours.** This is the most important step.\n\n[Bolster build options](#/info/ahd-bolster-build) — dental rolls vs button bolsters vs commercial silicone splints.\n\n**Through-and-through dental roll technique (most common ED method):**\n1. Cut **two dental rolls** (or rolls of cotton gauze) to the size of the hematoma cavity\n2. Place one anteriorly (over the drainage site) and one posteriorly (behind the ear)\n3. **2-0 or 3-0 nylon** mattress sutures through-and-through the pinna (skin → cartilage → skin → cartilage → skin) tying over both rolls\n4. Place 2-4 sutures depending on hematoma size, distributed across the cavity\n5. Tie firmly — the goal is to compress perichondrium to cartilage, but not so tight that the skin blanches (necrosis risk)\n\n**Alternative bolsters:** silicone splint (Roy/Smith 2010), button bolster, magnetic bolster, suction drain with foam — all work; dental rolls are cheapest and most ED-available.\n\n**Compression matters on BOTH sides** — anterior alone fails because the posterior pocket re-fills.',
        citation: [1, 2, 3, 6, 7],
        next: 'ahd-aftercare',
        summary: 'Through-and-through nylon sutures over anterior+posterior dental rolls; firm but not blanching; 2-4 sutures',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 5: AFTERCARE
    // =====================================================================
    {
        id: 'ahd-aftercare',
        type: 'info',
        module: 5,
        title: 'Aftercare & Antibiotics',
        body: '[Antibiotic decision tree](#/info/ahd-antibiotics) — when to cover, what to cover.\n\n**Discharge instructions:**\n• Keep dressing clean and dry\n• No contact sports, headgear, or trauma to the ear for **at least 2 weeks**\n• Recheck **24-48h** — examine for re-accumulation around the bolster, signs of infection, bolster slippage\n• Bolster removal at **7-10 days** by you or by ENT\n• Return precautions: fever, increasing pain, expanding swelling, drainage, red streaking\n\n**Antibiotic decision:**\n- Routine prophylaxis is **controversial**. Most ED references recommend short-course prophylaxis because cartilage exposure (from drainage) + Pseudomonas risk justify it, and the consequence of perichondritis is severe.\n- **Cover Pseudomonas:** [Ciprofloxacin](#/drug/ciprofloxacin/auricular-hematoma) 500-750mg PO BID x 5-7 days for most adult patients post-drainage.\n- Pediatrics, pregnancy, or contraindication to fluoroquinolone: use [Amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/auricular-hematoma) 875mg PO BID — coverage is less ideal for Pseudomonas but acceptable.\n\n**ENT follow-up:** Required within 7-10 days for bolster removal and recheck.',
        citation: [1, 2, 4, 7],
        next: 'ahd-disposition',
        summary: 'No contact x 2 weeks, recheck 24-48h, bolster removal 7-10d; cipro 500-750 BID x 5-7d for Pseudomonas cover',
    },
    {
        id: 'ahd-disposition',
        type: 'result',
        module: 5,
        title: 'Disposition',
        body: 'Most patients discharge home after successful drainage + bolster placement.',
        recommendation: '**Discharge criteria:**\n• Successful drainage with bolster in place\n• No signs of perichondritis\n• Adequate pain control\n• Patient understands return precautions\n• ENT follow-up arranged within 24-48h for first recheck, then 7-10 days for bolster removal\n\n**Reasons to admit or escalate:**\n• Active perichondritis with systemic signs\n• Failed outpatient management (recurrent hematoma despite proper technique)\n• Immunocompromised patient with uncertain follow-up\n• Pediatric patient with concerns about compliance with restrictions',
        confidence: 'recommended',
        citation: [1, 2, 4],
        summary: 'Discharge with bolster + 24-48h recheck + 7-10d bolster removal + ciprofloxacin prophylaxis',
    },
    // =====================================================================
    // MODULE 6: FAILURE & RECURRENCE
    // =====================================================================
    {
        id: 'ahd-failure',
        type: 'question',
        module: 6,
        title: 'Recurrence or Complication',
        body: 'Patient returning with re-accumulation or new symptoms after drainage.',
        options: [
            {
                label: 'Re-accumulation, no infection',
                description: 'Hematoma re-formed, no fever or redness',
                next: 'ahd-recurrence',
            },
            {
                label: 'Signs of perichondritis',
                description: 'Red, hot, fever, expanding pain',
                next: 'ahd-perichondritis',
                urgency: 'critical',
            },
            {
                label: 'Bolster slipped or fell out',
                description: 'Loose sutures, bolster displaced, hematoma re-filling',
                next: 'ahd-recurrence',
            },
        ],
        summary: 'Re-accumulation = ENT for OR drainage; infection signs = perichondritis pathway',
    },
    {
        id: 'ahd-recurrence',
        type: 'result',
        module: 6,
        title: 'Recurrence Management',
        body: 'After one failed ED drainage attempt, escalate to ENT rather than repeating ED drainage indefinitely.',
        recommendation: '**Plan:**\n• Repeat I&D + new bolster in ED is acceptable if technique was inadequate the first time (e.g., needle aspiration without bolster, or bolster fell out within hours)\n• If two ED attempts have failed → urgent ENT for OR drainage with formal bolster + possible skin excision over the cavity\n• If patient is high-risk for cauliflower (wrestler, MMA fighter, rugby player) → consider proactive ENT referral after first recurrence — they may use silicone splints or magnetic bolsters with better retention\n\n**Counsel:** Recurrence is more common in patients who return to contact activity early or who have a known tendency to re-bleed. Set firm activity restrictions and consider headgear post-healing.',
        confidence: 'recommended',
        citation: [1, 4, 6],
        summary: 'One ED failure = repeat with better bolster; two failures = ENT for OR drainage',
    },
];
export const AURICULAR_HEMATOMA_DRAINAGE_NODE_COUNT = AURICULAR_HEMATOMA_DRAINAGE_NODES.length;
