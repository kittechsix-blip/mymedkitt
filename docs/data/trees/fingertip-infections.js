// MedKitt — Fingertip Infections (Ortho)
// Photo-recognition-first ED workup of paronychia, felon, herpetic whitlow,
// and subungual infection. Differentiates from broader hand-infections consult
// by going deep on fingertip-specific exam, image-based pattern recognition,
// and bedside drainage technique.
// 6 modules: Recognition -> Paronychia -> Felon -> Herpetic Whitlow ->
// Subungual hematoma vs abscess -> Escalation/FTS
export const FTI_NODES = [
    // =====================================================================
    // MODULE 1: VISUAL RECOGNITION & TRIAGE
    // =====================================================================
    {
        id: 'fti-start',
        type: 'question',
        module: 1,
        title: 'Fingertip Infection - Photo Triage',
        body: '[Steps Summary](#/info/fti-steps)\n\n[Photo Atlas](#/info/fti-photo-atlas) - open to compare patient against side-by-side images.\n\n**Quick visual cues:**\n- **Nail fold** swelling/pus -> **Paronychia**\n- **Tense, throbbing pulp** -> **Felon**\n- **Grouped clear vesicles** -> **Herpetic Whitlow** (do NOT incise)\n- **Dark blood under nail** after trauma -> **Subungual hematoma**\n- **Yellow/white pus under nail** without trauma -> **Subungual abscess**\n\n**Before branching, screen for [Kanavel signs](#/info/fti-kanavel)** - any positive = treat as flexor tenosynovitis, escalate.\n\nWhich pattern fits? [1,2]',
        options: [
            { label: 'Nail fold swelling / pus', description: 'Paronychia (acute or chronic)', next: 'fti-paronychia' },
            { label: 'Tense throbbing pulp', description: 'Felon - pulp space abscess', next: 'fti-felon' },
            { label: 'Grouped clear vesicles', description: 'Herpetic whitlow - viral', next: 'fti-whitlow' },
            { label: 'Discoloration under the nail', description: 'Subungual hematoma vs abscess', next: 'fti-subungual' },
            { label: 'Fusiform finger swelling / Kanavel positive', description: 'Suspected flexor tenosynovitis', next: 'fti-fts-escalation' },
        ],
        citation: [1, 2],
        calculatorLinks: [
            { id: 'weight-dose', label: 'Weight-Based Dose' },
        ],
    },
    // =====================================================================
    // MODULE 2: PARONYCHIA
    // =====================================================================
    {
        id: 'fti-paronychia',
        type: 'question',
        module: 2,
        title: 'Paronychia - Acute vs Chronic',
        body: 'See [Photo Atlas - Paronychia](#/info/fti-photo-atlas) for visual comparison.\n\n**Acute (<6 weeks):** bacterial, usually Staph aureus, occasionally anaerobes/oral flora after nail-biting. Tender, erythematous nail fold, may be fluctuant.\n\n**Chronic (>=6 weeks):** inflammatory, frequent water exposure, often Candida-colonized. Boggy, less tender, multiple digits possible. Cuticle absent.\n\nWhich is this? [3,4]',
        options: [
            { label: 'Acute - tender, fluctuant or pus visible', description: 'Bacterial - drainage decision next', next: 'fti-paronychia-acute' },
            { label: 'Acute - red and tender, no pus yet', description: 'Early cellulitis', next: 'fti-paronychia-early' },
            { label: 'Chronic >=6 weeks', description: 'Inflammatory, ?Candida', next: 'fti-paronychia-chronic' },
        ],
        citation: [3, 4],
    },
    {
        id: 'fti-paronychia-acute',
        type: 'info',
        module: 2,
        title: 'Acute Paronychia - Bedside Drainage',
        body: '**Decision:** Subungual extension changes the procedure.\n\n**Simple lateral fold abscess** (no pus tracking under nail):\n1. Skin prep, no anesthesia for superficial; digital block if extensive.\n2. Slide a #11 blade or 18g needle **parallel to the nail**, bevel up, between cuticle and nail plate at the point of maximal fluctuance.\n3. Lift the eponychial fold off the nail to release pus. Do NOT incise the nail fold itself - scarring + nail dystrophy.\n4. Express pus, irrigate with saline, loose gauze.\n\n**Subungual extension** (pus visible under nail edge):\n- Remove the **lateral one-quarter of the nail** with a small hemostat. Keep the rest of the nail in place as a biologic dressing.\n- Total nail avulsion only if the entire subungual space is involved.\n\n**After drainage:**\n- Warm soaks TID starting day 2.\n- Dressing change in 24-48 h.\n- Antibiotics usually NOT required after adequate drainage. Add **[Cephalexin](#/drug/cephalexin/skin)** 500 mg QID x 5-7 days only if surrounding cellulitis. **[TMP-SMX](#/drug/tmp-smx/skin)** DS BID if MRSA risk (recurrent abscess, nasal colonization, contact with MRSA).\n- Hand follow-up only if subungual involvement or immunocompromised. [3,4,5]',
        citation: [3, 4, 5],
        images: [
            {
                src: 'images/fingertip-infections/paronychia-acute.jpg',
                alt: 'Acute paronychia with erythema and pus along the lateral nail fold',
                caption: 'Acute paronychia: tender, erythematous nail fold with visible pus collection. (CC, Wikimedia Commons)',
            },
        ],
        next: 'fti-disposition-outpatient',
    },
    {
        id: 'fti-paronychia-early',
        type: 'result',
        module: 2,
        title: 'Early Paronychia - No Drainage Yet',
        body: '**Conservative management** for non-fluctuant cellulitis:\n- Warm soaks 15-20 min, 3-4x daily.\n- Elevation, keep dry between soaks.\n- Avoid manipulation, biting, picking.\n\n**Antibiotics often unnecessary.** Reserve for spreading erythema, immunocompromise, or failure at 48 h:\n- **[Cephalexin](#/drug/cephalexin/skin)** 500 mg QID x 5-7 days, OR\n- **[TMP-SMX](#/drug/tmp-smx/skin)** DS BID if MRSA risk.\n\n**Reassess at 48 h.** If fluctuance develops -> drain (see acute pathway). [3,4]',
        recommendation: 'Early paronychia without abscess. Warm soaks, no antibiotics unless cellulitis or risk factors. Recheck 48 h.',
        confidence: 'recommended',
        citation: [3, 4],
    },
    {
        id: 'fti-paronychia-chronic',
        type: 'result',
        module: 2,
        title: 'Chronic Paronychia',
        body: '**Pathophysiology:** chronic irritant/inflammatory, with Candida as a colonizer rather than primary pathogen. Repeated wet work disrupts the cuticle barrier.\n\n**ED management:**\n1. **Stop wet exposure** - cotton-lined gloves for housework/dishwashing.\n2. **Topical high-potency steroid** (triamcinolone 0.1% or clobetasol BID x 3 weeks) - more effective than antifungals in head-to-head trials.\n3. Topical antifungal (clotrimazole BID) if Candida present.\n4. Keep dry. Avoid drainage attempts - worsens inflammation.\n\n**Avoid:** systemic antibiotics (not bacterial), repeat I&D.\n\n**Refer:** dermatology or hand surgery if no improvement at 6 weeks. [4,6]',
        recommendation: 'Chronic paronychia is inflammatory. Topical steroid + dry + glove strategy. No oral antibiotics. Derm referral if refractory.',
        confidence: 'recommended',
        citation: [4, 6],
        images: [
            {
                src: 'images/fingertip-infections/paronychia-chronic.jpg',
                alt: 'Chronic paronychia with absent cuticle and boggy proximal nail fold',
                caption: 'Chronic paronychia: absent cuticle, boggy proximal nail fold, often Candida-colonized. (CC, Wikimedia Commons)',
            },
        ],
    },
    // =====================================================================
    // MODULE 3: FELON
    // =====================================================================
    {
        id: 'fti-felon',
        type: 'question',
        module: 3,
        title: 'Felon - Pulp Space Abscess',
        body: 'See [Photo Atlas - Felon](#/info/fti-photo-atlas).\n\n**Anatomy:** distal pulp is partitioned by 15-20 fibrous septa into closed compartments. Pus raises pressure rapidly -> ischemia, septic DIP arthritis, distal phalanx osteomyelitis.\n\n**Classic exam:** tense, glove-tight pulp; throbbing pain out of proportion; minor puncture/splinter often the trigger; Staph aureus most common.\n\nIs there a true abscess (fluctuance, point tenderness, visible pus) or only early cellulitis? [2,5]',
        options: [
            { label: 'Abscess - fluctuant or visible pus', description: 'I&D required', next: 'fti-felon-drainage' },
            { label: 'Early cellulitis only', description: 'No abscess yet', next: 'fti-felon-conservative' },
        ],
        citation: [2, 5],
    },
    {
        id: 'fti-felon-drainage',
        type: 'info',
        module: 3,
        title: 'Felon - Bedside I&D Technique',
        body: '**Anesthesia:** digital block with **[Lidocaine](#/drug/lidocaine/digital-block)** 1% plain (no epi), 1-2 mL each side at the base of the digit. Allow 5-10 min. Penrose tourniquet at the base for hemostasis.\n\n**Choose the incision based on abscess location:**\n\n**1. Volar longitudinal (preferred for superficial midline pus):**\n- Single midline incision over the point of maximal fluctuance, NOT crossing the DIP flexion crease.\n- Spread with a small hemostat, breaking septa to ensure complete drainage.\n\n**2. Unilateral lateral (preferred for deeper or off-midline pus):**\n- Single longitudinal incision 0.5 cm distal to the DIP crease, parallel to the nail plate, on the **non-pinch side** (ulnar side of thumb/index, radial side of small).\n- Stay dorsal to the digital neurovascular bundle.\n- Extend from lateral nail fold toward the tip; break ALL septa with a hemostat.\n\n**Avoid:**\n- Fishmouth (transverse through-and-through) incision - causes pulp necrosis, unstable pad.\n- Hockey-stick or J-incision - injures the digital nerve.\n- Crossing the DIP crease - flexion contracture.\n\n**After drainage:**\n- Loose iodoform gauze wick, remove at 24-48 h.\n- **[Cephalexin](#/drug/cephalexin/skin)** 500 mg QID x 7-10 days (or **[TMP-SMX](#/drug/tmp-smx/skin)** DS BID if MRSA risk).\n- Warm soaks TID starting day 2; elevate.\n- Hand follow-up at 48-72 h. Get plain film if pain persists past 1 week (osteomyelitis). [2,5]',
        citation: [2, 5],
        images: [
            {
                src: 'images/fingertip-infections/felon.jpg',
                alt: 'Felon of the thumb with infection in the distal pulp space',
                caption: 'Felon / pulp-space infection of the thumb. James Heilman, MD, CC BY-SA 3.0, Wikimedia Commons.',
            },
        ],
        next: 'fti-disposition-outpatient',
    },
    {
        id: 'fti-felon-conservative',
        type: 'result',
        module: 3,
        title: 'Early Felon - Conservative Trial',
        body: '**Without true abscess:**\n- **[Cephalexin](#/drug/cephalexin/skin)** 500 mg QID x 7-10 days (**[Clindamycin](#/drug/clindamycin/skin)** 300-450 mg TID if penicillin-allergic).\n- Warm soaks 3-4x/day, elevate.\n- **Recheck in 24 h** - low threshold to drain if any progression. Early felons declare themselves quickly. [2,5]',
        recommendation: 'Early felon, no abscess: oral antibiotics + soaks, recheck 24 h, drain if any progression.',
        confidence: 'recommended',
        citation: [2, 5],
    },
    // =====================================================================
    // MODULE 4: HERPETIC WHITLOW
    // =====================================================================
    {
        id: 'fti-whitlow',
        type: 'info',
        module: 4,
        title: 'Herpetic Whitlow - Recognize, Do NOT Incise',
        body: 'See [Photo Atlas - Whitlow](#/info/fti-photo-atlas).\n\n**Recognition:**\n- Grouped **clear vesicles on an erythematous base**, often coalescing.\n- Burning/throbbing pain typically out of proportion to exam early on.\n- Prodrome: tingling 24-48 h before vesicles appear.\n- High-risk groups: dental/respiratory therapy workers, kids who suck thumbs, healthcare workers; HSV-1 > HSV-2.\n- Self-limited 2-4 weeks. Recurrences possible.\n\n**Why it matters:**\n- **DO NOT incise.** Incision causes bacterial superinfection, viremia, and slower healing. This is the most common ED error in fingertip infections.\n- Often misdiagnosed as felon or paronychia early - the **vesicles** are the clue.\n\n**Confirmatory testing (only if diagnosis uncertain):**\n- HSV PCR from de-roofed vesicle fluid (most sensitive).\n- Tzanck smear: multinucleated giant cells (low sensitivity, fast).\n- Viral culture (slow, less commonly available).\n\n**Treatment:**\n- **[Acyclovir](#/drug/acyclovir/herpes-simplex)** 400 mg PO 5x/day x 7-10 days, OR **[Valacyclovir](#/drug/valacyclovir/herpes-simplex)** 1 g PO BID x 7-10 days.\n- Most benefit if started **within 48 h** of vesicle onset.\n- Dry occlusive dressing to prevent autoinoculation/spread to others.\n- Analgesia.\n\n**Suppression** for >=6 recurrences/year: **[Acyclovir](#/drug/acyclovir/herpes-simplex)** 400 mg BID or **[Valacyclovir](#/drug/valacyclovir/herpes-simplex)** 500 mg daily. [7,8]',
        citation: [7, 8],
        images: [
            {
                src: 'images/fingertip-infections/herpetic-whitlow.jpg',
                alt: 'Herpetic whitlow with grouped clear vesicles on erythematous base',
                caption: 'Herpetic whitlow: grouped clear vesicles on an erythematous base. DO NOT incise — causes superinfection. (CC, Wikimedia Commons)',
            },
        ],
        next: 'fti-disposition-outpatient',
    },
    // =====================================================================
    // MODULE 5: SUBUNGUAL HEMATOMA vs SUBUNGUAL ABSCESS
    // =====================================================================
    {
        id: 'fti-subungual',
        type: 'question',
        module: 5,
        title: 'Subungual: Hematoma vs Abscess',
        body: 'See [Photo Atlas - Subungual](#/info/fti-photo-atlas) for side-by-side comparison.\n\n**The trap:** dark discoloration under the nail looks similar at first glance, but the management is opposite.\n\n| Feature | Hematoma | Abscess |\n|---|---|---|\n| Color | Dark red/blue/black | Yellow-white pus, may be pink-red |\n| History | Crush/blunt trauma | No trauma (or minor manicure/biting) |\n| Time course | Onset within hours of injury | Days of progressive pain |\n| Pain | Throbbing, pressure-type, peaks early | Throbbing + warmth + cellulitis nearby |\n| Surrounding skin | Bruise/cellulitis only if associated injury | Erythematous nail fold, often paronychia |\n| Fluctuance | No | Yes - may track from paronychia |\n\n**Always X-ray** if mechanism could fracture distal phalanx (crush, door-jam injury, sports). Tuft fracture changes management to splint/antibiotic for open fracture. [9,10]\n\nWhich is this?',
        options: [
            { label: 'Hematoma after trauma', description: 'Trephination decision', next: 'fti-trephination' },
            { label: 'Abscess (no trauma, pus visible)', description: 'Drain through nail or fold', next: 'fti-subungual-abscess' },
        ],
        citation: [9, 10],
    },
    {
        id: 'fti-trephination',
        type: 'info',
        module: 5,
        title: 'Subungual Hematoma - Trephination',
        body: '**Indication:** painful subungual hematoma, regardless of size. Pain relief is dramatic and immediate.\n\n**Old teaching to avoid:** the "drain only if >50% of nail" rule has been **abandoned**. Trephinate based on pain, not percentage. [9]\n\n**Tuft fracture is NOT a contraindication.** Multiple studies and updated guidelines show trephination of a hematoma overlying a closed tuft fracture does not increase infection risk and is preferred over nail removal in stable nail beds. [9,10]\n\n**Technique - electrocautery (preferred):**\n- Hold the cautery tip perpendicular to the nail at the center of the hematoma.\n- Touch lightly; the heated tip melts through in 1-2 seconds. Stop the moment you see blood escape - the cautery cools instantly on contact with liquid.\n- Painless because the nail has no innervation.\n\n**Alternative - heated paperclip / 18g needle twirl:**\n- Heat a paperclip end red-hot or use a sterile 18g needle bevel rotated like a drill.\n- Same endpoint: through-and-through with blood release.\n\n**After drainage:**\n- Apply gentle pressure, dry dressing.\n- Keep dry 24 h, then normal hygiene.\n- Splint distal phalanx if associated tuft fracture (mallet-style splint, ortho follow-up 1-2 weeks).\n- Antibiotics generally not needed even with tuft fracture in healthy patients. Consider if grossly contaminated, immunocompromised, or open laceration of nail bed.\n\n**Nail removal indications** (rare): nail plate avulsed/floppy, nail bed laceration requiring repair (visible disruption through transparent nail), surrounding paronychia. [9,10]',
        citation: [9, 10],
        images: [
            {
                src: 'images/fingertip-infections/subungual-hematoma.jpg',
                alt: 'Subungual hematoma — dark blood collection visible under the nail plate after trauma',
                caption: 'Subungual hematoma: dark blood under nail after crush/blunt trauma. Trephinate based on pain, not percentage. (CC, Wikimedia Commons)',
            },
        ],
        next: 'fti-disposition-outpatient',
    },
    {
        id: 'fti-subungual-abscess',
        type: 'info',
        module: 5,
        title: 'Subungual Abscess - Drainage',
        body: '**Often an extension of paronychia** that has tracked under the nail.\n\n**Approach by extent:**\n\n**Lateral edge only:**\n- Digital block with **[Lidocaine](#/drug/lidocaine/digital-block)** 1% plain.\n- Lift the lateral nail fold and slide a hemostat under the nail edge to release pus.\n- If pus persists, remove the **lateral one-quarter** of the nail with a small hemostat.\n\n**Central or under most of the nail:**\n- Trephinate the nail directly over the abscess (electrocautery), allowing decompression - this is often enough.\n- Total nail avulsion only if the entire bed is involved or for poor response.\n\n**Antibiotics after drainage:**\n- **[Cephalexin](#/drug/cephalexin/skin)** 500 mg QID x 5-7 days, OR\n- **[TMP-SMX](#/drug/tmp-smx/skin)** DS BID if MRSA risk.\n\n**Follow-up:** wound check 48-72 h, hand surgery if no improvement. [3,4,5]',
        citation: [3, 4, 5],
        images: [
            {
                src: 'images/fingertip-infections/subungual-abscess.jpg',
                alt: 'Subungual abscess with yellow-white pus visible under the nail plate',
                caption: 'Subungual abscess: yellow-white pus under nail, often extending from a paronychia. Drain through nail or fold. (CC, Wikimedia Commons)',
            },
        ],
        next: 'fti-disposition-outpatient',
    },
    // =====================================================================
    // MODULE 6: ESCALATION - FLEXOR TENOSYNOVITIS / DEEP SPACE
    // =====================================================================
    {
        id: 'fti-fts-escalation',
        type: 'result',
        module: 6,
        title: 'Suspected Flexor Tenosynovitis - Escalate',
        body: '**This is no longer a fingertip problem.** Kanavel signs = flexor sheath infection until proven otherwise. Time to treatment determines outcome - delays >24 h drive tendon necrosis and amputation risk.\n\n**[Kanavel Signs Reference](#/info/fti-kanavel)** - any one positive raises concern; 3 of 4 is highly specific.\n\n**Immediate ED steps:**\n1. **Hand surgery consult NOW** - do not wait for imaging if classic.\n2. NPO; mark cellulitis border; serial exams.\n3. **IV antibiotics:** **[Vancomycin](#/drug/vancomycin/skin)** + piperacillin-tazobactam (or **[Cefepime](#/drug/cefepime/skin)**). Cover Staph (incl. MRSA), Strep, gram-negatives, and oral flora if bite/penetration history.\n4. Tetanus update if indicated.\n5. Splint in functional position; elevate.\n\nFor full FTS workup, drainage technique, and disposition see the dedicated [Hand Infections consult](#/tree/hand-infections).\n\n**Do NOT** drain at the bedside in the ED - flexor sheath drainage is an OR procedure. [1,2]',
        recommendation: 'Suspected FTS: hand surgery consult now, IV broad-spectrum antibiotics (Vanc + pip-tazo), splint, elevate. Cross to Hand Infections consult for FTS pathway.',
        confidence: 'definitive',
        citation: [1, 2],
    },
    // =====================================================================
    // SHARED DISPOSITION
    // =====================================================================
    {
        id: 'fti-disposition-outpatient',
        type: 'result',
        module: 6,
        title: 'Disposition - Outpatient',
        body: '**Discharge criteria:**\n- Source controlled (drained or not yet abscess).\n- No Kanavel signs, no deep space involvement.\n- Reliable patient, can return.\n- No systemic signs (fever, leukocytosis, lymphangitis).\n\n**Discharge package:**\n- Oral antibiotic if indicated (see specific module).\n- Warm soaks TID, elevation, dry between soaks.\n- Wound check / dressing change at 24-48 h.\n- Hand or PCP follow-up at 48-72 h, sooner if worse.\n- Tetanus if indicated.\n\n**Strict return precautions:**\n- Worsening pain or swelling.\n- Spreading redness, red streaking up the arm.\n- Fever, chills.\n- New finger stiffness or pain on passive extension (FTS).\n- Numbness or color change of the fingertip. [1,5]',
        recommendation: 'Outpatient: drained or early infection, no FTS or deep involvement. Antibiotics per pathway, soaks, 48-72 h follow-up.',
        confidence: 'recommended',
        citation: [1, 5],
    },
];
export const FTI_MODULE_LABELS = [
    'Photo Triage',
    'Paronychia',
    'Felon',
    'Herpetic Whitlow',
    'Subungual',
    'Escalation & Disposition',
];
export const FTI_CITATIONS = [
    { num: 1, text: 'Tosti R, Iorio ML. Hand Infections. StatPearls Publishing; 2024.' },
    { num: 2, text: 'Rerucha CM, Ewing JT, Oppenlander KE, Cowan WC. Acute Hand Infections. Am Fam Physician. 2019;99(4):228-236.' },
    { num: 3, text: 'Shafritz AB, Coppage JM. Acute and chronic paronychia of the hand. J Am Acad Orthop Surg. 2014;22(3):165-174.' },
    { num: 4, text: 'Rigopoulos D, Larios G, Gregoriou S, Alevizos A. Acute and chronic paronychia. Am Fam Physician. 2008;77(3):339-346.' },
    { num: 5, text: 'Clark DC. Common acute hand infections. Am Fam Physician. 2003;68(11):2167-2176.' },
    { num: 6, text: 'Wollina U. Acute paronychia: comparative treatment with topical antibiotic alone or in combination with corticosteroid. J Eur Acad Dermatol Venereol. 2018;32(7):1171.' },
    { num: 7, text: 'Wu IB, Schwartz RA. Herpetic whitlow. Cutis. 2007;79(3):193-196.' },
    { num: 8, text: 'Klotz D, Schaefer C. Herpetic whitlow. CMAJ. 2017;189(38):E1199.' },
    { num: 9, text: 'Roser SE, Gellman H. Comparison of nail bed repair vs nail trephination for subungual hematomas in children. J Hand Surg Am. 1999;24(6):1166-1170. (with current updates abandoning the >50% rule).' },
    { num: 10, text: 'Patel L. Management of simple nail bed lacerations and subungual hematomas in the emergency department. Pediatr Emerg Care. 2014;30(10):742-745.' },
];
export const FTI_NODE_COUNT = FTI_NODES.length;
export const FTI_CRITICAL_ACTIONS = [
    { text: 'Do NOT incise herpetic whitlow - causes superinfection and viremia', nodeId: 'fti-whitlow' },
    { text: 'Felon I&D: avoid fishmouth and hockey-stick incisions; preserve pulp anatomy', nodeId: 'fti-felon-drainage' },
    { text: 'Subungual hematoma: trephinate based on pain, not percentage; tuft fracture is NOT a contraindication', nodeId: 'fti-trephination' },
    { text: 'Kanavel signs positive -> hand surgery consult immediately, IV antibiotics, no bedside drainage', nodeId: 'fti-fts-escalation' },
];
