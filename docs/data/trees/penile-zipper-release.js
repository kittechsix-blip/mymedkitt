// MedKitt — Penile Zipper Entrapment Release
// Initial Assessment → Pain Control → Technique Selector → Wound Care → Tetanus/Wound/Return → Urology Criteria
// Category: Procedures. 6 modules, ~24 nodes.
// Sources: ALiEM, LITFL, StatPearls, AUA (open-access guideline language only).
// IMAGE TODO: Wikimedia Commons Zipper.svg (RRZEicons, CC BY-SA 3.0) could not be verified
// at build time (403 on automated fetch). Build shipped WITHOUT anatomy image rather than
// risk a copyrighted clinical photo. Re-attempt verification + manual download on next image
// approval gate.
export const PENILE_ZIPPER_RELEASE_MODULE_LABELS = [
    'Initial Assessment',
    'Pain Control',
    'Technique Selection',
    'Wound Care',
    'Tetanus, Antibiotics & Return',
    'Urology Consult Criteria',
];
export const PENILE_ZIPPER_RELEASE_CITATIONS = [
    { num: 1, text: 'Lin EM, Liss MA, Lefcourt JG, et al. Penile Zipper Entrapment. ALiEM. Available at: aliem.com/penile-zipper-entrapment/. Accessed 2026.' },
    { num: 2, text: 'Nickson C. Penile Zipper Injury. Life in the Fast Lane (LITFL). Available at: litfl.com/penile-zipper-injury/. Accessed 2026.' },
    { num: 3, text: 'Leslie SW, Sajjad H. Penile Zipper and Ring Injuries. In: StatPearls. Treasure Island (FL): StatPearls Publishing; 2024. NBK459308. Available at: ncbi.nlm.nih.gov/books/NBK459308/.' },
    { num: 4, text: 'Mishra SC. A device for the disengagement of skin caught in zipper. Br J Plast Surg. 2005;58(6):868-869.' },
    { num: 5, text: 'Strait RT. A novel method for removal of penile zipper entrapment. Pediatr Emerg Care. 1999;15(6):412-413.' },
    { num: 6, text: 'American Urological Association. Guidelines and Quality. AUA. Available at: auanet.org/guidelines-and-quality/guidelines. Accessed 2026.' },
    { num: 7, text: 'Centers for Disease Control and Prevention. Tetanus Vaccination Recommendations. CDC. 2024.' },
];
export const PENILE_ZIPPER_RELEASE_CRITICAL_ACTIONS = [
    { text: 'Active bleeding from urethral meatus → urology now, do not manipulate zipper', nodeId: 'pzr-triage' },
    { text: 'Significant skin avulsion already present → urology / plastics, do not unzip', nodeId: 'pzr-triage' },
    { text: 'First-line technique = mineral oil lubrication + gentle retrograde unzip if skin intact', nodeId: 'pzr-mineral-oil' },
    { text: 'Median-bar cut with bone/wire cutter is the most reliable destruction technique', nodeId: 'pzr-median-bar' },
    { text: 'Pediatric uncooperative patient → procedural sedation before any zipper manipulation', nodeId: 'pzr-pain-peds' },
    { text: 'Do NOT force a stuck slider — switch to a destruction technique', nodeId: 'pzr-technique-branch' },
    { text: 'Lateral teeth separation only when slider is jammed and median-bar cut is unavailable', nodeId: 'pzr-lateral-teeth' },
    { text: 'Tetanus prophylaxis if wound breaks skin and last Td/Tdap >5 years (tetanus-prone wound)', nodeId: 'pzr-tetanus' },
    { text: 'Routine prophylactic antibiotics NOT indicated for clean superficial skin tears', nodeId: 'pzr-antibiotics' },
];
export const PENILE_ZIPPER_RELEASE_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'pzr-start',
        type: 'info',
        module: 1,
        title: 'Penile Zipper Entrapment — Overview',
        body: '[Steps Summary](#/info/pzr-steps)\n\nForeskin or penile shaft skin caught in a zipper slider. Common in uncircumcised boys (commando, rushed dressing) and intoxicated adults. **Disproportionately distressing — calm + analgesia first, then technique selection.**\n\n**Goal:** release skin with the least trauma. Most cases are managed at bedside without urology consult. [1,2,3]\n\n**Zipper anatomy (every technique exploits one of these):**\n• **Slider** — the moving piece with the **median bar** connecting front and back faceplates\n• **Median bar** — the bridge inside the slider; cutting it releases both faceplates\n• **Teeth** — the interlocking elements; separating teeth distal to slider frees skin\n• **Faceplates** — front and back metal plates of the slider',
        citation: [1, 2, 3],
        next: 'pzr-triage',
        summary: 'Zipper anatomy: slider, median bar, teeth, faceplates — each technique targets one of these',
        skippable: true,
    },
    {
        id: 'pzr-triage',
        type: 'question',
        module: 1,
        title: 'Red Flags Before You Touch the Zipper',
        body: 'Screen for findings that require urology / plastics BEFORE any release attempt.',
        options: [
            {
                label: 'Bleeding from urethral meatus',
                description: 'Suggests urethral injury — do not manipulate',
                next: 'pzr-urology-now',
                urgency: 'critical',
            },
            {
                label: 'Significant skin avulsion or devascularized flap',
                description: 'Large skin loss already present — do not unzip blindly',
                next: 'pzr-urology-now',
                urgency: 'critical',
            },
            {
                label: 'Vascular compromise — dusky / cyanotic skin',
                description: 'Strangulating injury — time-sensitive',
                next: 'pzr-urology-now',
                urgency: 'critical',
            },
            {
                label: 'Skin entrapped, otherwise intact, viable',
                description: 'Standard presentation — proceed to assessment',
                next: 'pzr-assessment',
            },
        ],
        safetyLevel: 'critical',
        summary: 'Urethral bleeding, skin avulsion, or vascular compromise → urology BEFORE manipulation',
    },
    {
        id: 'pzr-urology-now',
        type: 'result',
        module: 1,
        title: 'Stop — Urology / Plastics Now',
        body: 'Findings suggest urethral injury, significant skin loss, or vascular compromise. ED bedside release is contraindicated.',
        recommendation: '**IMMEDIATE ACTIONS:**\n• Do NOT attempt zipper release\n• Cover wound with saline-moistened gauze\n• Pain control + IV access\n• Urinalysis, consider retrograde urethrogram if urethral injury suspected\n• Urology consult (plastics if large skin avulsion)\n• Update tetanus status — see [Tetanus Prophylaxis](#/calculator/tet-prophylaxis)\n\n**RATIONALE:**\nManipulating the zipper risks extending a urethral tear or worsening skin loss. Definitive repair belongs in the OR under sedation with adequate exposure. [1,3,6]',
        citation: [1, 3, 6],
        safetyLevel: 'critical',
        confidence: 'definitive',
        summary: 'Urethral bleeding, skin avulsion, or vascular compromise → no manipulation, urology now',
    },
    {
        id: 'pzr-assessment',
        type: 'info',
        module: 1,
        title: 'Bedside Assessment',
        body: '**Verify before pain control:** [1,2,3]\n• Age + cooperation (pediatric vs adult)\n• Exact location of entrapped skin (foreskin most common)\n• Position of the **slider** along the teeth (proximal/distal to skin)\n• Skin viability — pink and intact vs dusky\n• Swelling around the entrapment site\n• Time since entrapment (>2 hr → more edema, harder to release)\n\n**Document a brief NV exam of the glans and shaft.** Compare to the contralateral side or photo of pre-entrapment if available.',
        citation: [1, 2, 3],
        next: 'pzr-pain-route',
        summary: 'Age, slider position, skin viability, swelling, time elapsed drive technique + analgesia choice',
    },
    // =====================================================================
    // MODULE 2: PAIN CONTROL
    // =====================================================================
    {
        id: 'pzr-pain-route',
        type: 'question',
        module: 2,
        title: 'Pain Control Strategy',
        body: 'Choose the lowest-acuity option that will let you work without forcing patient movement.',
        options: [
            {
                label: 'Adult, cooperative, minimal swelling',
                description: 'Topical anesthetic ± gentle infiltration',
                next: 'pzr-pain-adult',
            },
            {
                label: 'Adult, anxious or significant swelling',
                description: 'Penile block or anxiolysis',
                next: 'pzr-pain-block',
            },
            {
                label: 'Pediatric patient, uncooperative',
                description: 'Procedural sedation before any manipulation',
                next: 'pzr-pain-peds',
                urgency: 'urgent',
            },
        ],
        summary: 'Adults → topical/local; anxious or swollen → penile block; uncooperative peds → sedation',
    },
    {
        id: 'pzr-pain-adult',
        type: 'info',
        module: 2,
        title: 'Topical / Local Anesthesia',
        body: '**Sequence:** [1,2,3]\n1. Apply topical **2% [lidocaine](#/drug/lidocaine/topical) gel** or **[LET / LAT](#/drug/lidocaine/topical)** for ~10 min if skin is intact (avoid open mucosa).\n2. If still tender, **infiltrate skin around the entrapment** with 1% [lidocaine](#/drug/lidocaine/local-infiltration) WITHOUT epinephrine.\n3. Stay subdermal — do **NOT** inject into the shaft proper.\n\n**Volume:** small wheals, usually <3 mL total. Track cumulative dose; the penis is an end-artery territory and the foreskin is thin.\n\n**Skip topical and go straight to penile block** if pain is severe, swelling is significant, or you anticipate destruction technique.',
        citation: [1, 2, 3],
        next: 'pzr-technique-branch',
        summary: 'Topical 2% lidocaine x10 min, then small subdermal wheals of plain 1% lidocaine if needed',
    },
    {
        id: 'pzr-pain-block',
        type: 'info',
        module: 2,
        title: 'Dorsal Penile Nerve Block',
        body: '**Use plain [lidocaine](#/drug/lidocaine/penile-block) 1% — NO epinephrine.** The dorsal penile arteries are end-arteries.\n\n**Technique:** [1,2]\n1. Sterile prep at the base of the penis.\n2. 25-27G needle, insert at 10 and 2 o\u2019clock positions just below the symphysis pubis.\n3. Aspirate, then inject 2-5 mL plain 1% lidocaine on each side, **deep to Buck\u2019s fascia.**\n4. Total typical volume **10 mL** plain 1% lidocaine (100 mg).\n5. Wait 5-10 min for full block before manipulation.\n\n**Hard stops:**\n• NEVER add epinephrine\n• Aspirate before every injection\n• Stop if you feel a pop into the corpus or get blood return — reposition',
        citation: [1, 2],
        next: 'pzr-technique-branch',
        summary: '10 mL plain 1% lidocaine at 10 and 2 o\u2019clock, deep to Buck\u2019s fascia, NO epinephrine',
    },
    {
        id: 'pzr-pain-peds',
        type: 'info',
        module: 2,
        title: 'Pediatric Procedural Sedation',
        body: '**A struggling child + a zipper near genitalia is a setup for iatrogenic injury. Sedate before you touch.** [1,3]\n\n**Approach:**\n• Anxiolysis first: intranasal **[midazolam](#/drug/midazolam/in-anxiolysis)** 0.2 mg/kg (max 10 mg) for a brief release attempt with mineral oil\n• Full sedation if destruction technique needed or if first attempt fails — see [Procedural Sedation](#/tree/procedural-sedation) consult\n• Common agents: intranasal/IV **[ketamine](#/drug/ketamine/procedural-sedation)** or IV **[propofol](#/drug/propofol/procedural-sedation)** per institution protocol\n• Continuous SpO\u2082, capnography, BP, HR monitoring\n• Have a second provider hold position; do NOT have the parent restrain\n\nA single brief sedation that works beats three traumatic attempts without it.',
        citation: [1, 3],
        next: 'pzr-technique-branch',
        summary: 'Sedate before manipulation; IN midazolam for brief tries, full sedation if destruction needed',
    },
    // =====================================================================
    // MODULE 3: TECHNIQUE SELECTION
    // =====================================================================
    {
        id: 'pzr-technique-branch',
        type: 'question',
        module: 3,
        title: 'Select Release Technique',
        body: 'Start with the **least destructive** option that fits the situation. Escalate if it fails — do NOT force a stuck slider.',
        options: [
            {
                label: 'Skin intact, slider not jammed — try first',
                description: 'Mineral-oil lubrication + retrograde unzip',
                next: 'pzr-mineral-oil',
            },
            {
                label: 'Slider jammed or oil failed — destroy the slider',
                description: 'Cut the median bar with bone / wire cutters',
                next: 'pzr-median-bar',
            },
            {
                label: 'No bone cutter available, slider intact',
                description: 'Separate teeth distal to slider with screwdriver',
                next: 'pzr-lateral-teeth',
            },
            {
                label: 'Slider destruction by cutting along the sides',
                description: 'Slider-side cut technique (alternate destruction)',
                next: 'pzr-slider-destruction',
            },
        ],
        summary: 'Mineral oil first → median-bar cut if jammed → lateral teeth or slider-side cut as alternates',
    },
    {
        id: 'pzr-mineral-oil',
        type: 'info',
        module: 3,
        title: 'Mineral-Oil Lubrication + Retrograde Unzip',
        body: '**First-line for intact skin.** Reduces friction and frequently allows the slider to back off without any cutting. [1,2,3]\n\n**Technique:**\n1. Soak the entrapped skin in **mineral oil** (or any liquid paraffin / lubricant) for **10-15 minutes**.\n2. Apply gentle traction to the skin away from the slider.\n3. With other hand, slowly slide the zipper in the **opposite (retrograde) direction** of the entrapment.\n4. Use steady, low force — if it does not budge, **stop**.\n\n**Success rate:** reasonable for fresh entrapments with intact skin; lower if there is edema or the slider is jammed.\n\n**If unsuccessful after 1-2 gentle attempts:** switch to median-bar cut. **Do not force.**',
        citation: [1, 2, 3],
        next: 'pzr-post-release',
        summary: 'Soak 10-15 min in mineral oil, gentle retrograde unzip; stop and escalate if it does not budge',
    },
    {
        id: 'pzr-median-bar',
        type: 'info',
        module: 3,
        title: 'Median-Bar Cut (Preferred Destruction Technique)',
        body: '**Most reliable rescue when oil fails or slider is jammed.** Cutting the median bar inside the slider releases both faceplates and the zipper falls apart. [1,2,3,4]\n\n**Equipment:**\n• Bone cutter, wire cutter, or trauma shears strong enough to bite through the slider bridge\n• Hemostat to stabilize the slider\n• Drape and protect surrounding skin (a tongue depressor between slider and skin is gold)\n\n**Technique:**\n1. Confirm adequate analgesia (block or sedation).\n2. Stabilize the slider with a hemostat.\n3. **Slide one jaw of the cutter under the median bar** — the bridge between front and back faceplates.\n4. Cut the median bar in **one decisive bite**.\n5. The two faceplates fall apart; the zipper teeth disengage and the skin lifts free.\n6. Irrigate, inspect skin, then proceed to wound care.\n\n**Pearl:** If a tongue depressor or small protector cannot fit, anesthetize and partial-thickness cut the zipper fabric first to expose the median bar — never sacrifice patient skin for cutter access.',
        citation: [1, 2, 3, 4],
        next: 'pzr-post-release',
        summary: 'Cut the median bar inside the slider with bone/wire cutters — faceplates fall off, skin frees',
    },
    {
        id: 'pzr-lateral-teeth',
        type: 'info',
        module: 3,
        title: 'Lateral Teeth Separation',
        body: '**Useful when no bone cutter is available and the slider is intact (not jammed inside the entrapped skin).** [2,5]\n\n**Technique:**\n1. Adequate analgesia first.\n2. Insert a **small flat-head screwdriver** (or hemostat tip) between the **front and back rows of teeth** at a point **distal** to the slider.\n3. Twist gently to pry the teeth apart along their entire distal length.\n4. Once teeth distal to the slider have separated, the zipper falls open and the skin lifts free.\n\n**Hard stop:** Do NOT try this if the slider is jammed inside the entrapped skin — there is no safe access point. Switch to median-bar cut. [2]\n\n**Pearl:** Some authors use the corner of a flat hemostat or a pair of needle drivers when no screwdriver is available.',
        citation: [2, 5],
        next: 'pzr-post-release',
        summary: 'Pry teeth apart distal to slider with screwdriver/hemostat — only if slider is NOT jammed',
    },
    {
        id: 'pzr-slider-destruction',
        type: 'info',
        module: 3,
        title: 'Slider Destruction (Side Cuts)',
        body: '**Alternate destruction technique** when the median bar is inaccessible or shears cannot reach it. [1,2,3]\n\n**Technique:**\n1. Adequate analgesia.\n2. Protect skin with a tongue depressor.\n3. Using bone / wire cutters, **cut along each side (the faceplate seam) of the slider**, top and bottom.\n4. The slider housing peels apart, releasing the median bar mechanism and freeing the teeth.\n5. Inspect skin, irrigate, proceed to wound care.\n\n**Notes:**\n• More cuts and more risk of skin contact than median-bar cut\n• Choose when slider access to median bar is blocked by entrapped skin\n• If at any point skin is at risk from the cutter, **stop** and consider urology',
        citation: [1, 2, 3],
        next: 'pzr-post-release',
        summary: 'Cut along both slider faceplate seams to peel housing apart — slower than median-bar cut',
    },
    // =====================================================================
    // MODULE 4: WOUND CARE
    // =====================================================================
    {
        id: 'pzr-post-release',
        type: 'question',
        module: 4,
        title: 'Post-Release Assessment',
        body: 'Skin is free. Inspect the entrapment site now.',
        options: [
            {
                label: 'Skin intact or minor abrasion',
                description: 'Clean, irrigate, simple wound care',
                next: 'pzr-wound-care',
            },
            {
                label: 'Partial-thickness skin tear',
                description: 'Local wound care, no closure usually needed',
                next: 'pzr-wound-care',
            },
            {
                label: 'Full-thickness laceration or significant skin loss',
                description: 'Urology / plastics for repair',
                next: 'pzr-urology-criteria',
                urgency: 'urgent',
            },
        ],
        summary: 'Inspect skin after release — minor injury → ED wound care; full-thickness loss → urology',
    },
    {
        id: 'pzr-wound-care',
        type: 'info',
        module: 4,
        title: 'Wound Care',
        body: '**Genital skin heals well by secondary intention.** [1,3,6]\n\n**Immediate:**\n1. Irrigate gently with sterile saline (low-pressure, just enough to clear debris).\n2. Pat dry, apply petrolatum or bacitracin ointment.\n3. Loose, non-adherent dressing — change daily.\n4. Leave most superficial wounds **open** — primary closure is rarely needed.\n\n**Patient counseling:**\n• Twice-daily gentle soap-and-water cleansing in the shower starting next day\n• Reapply ointment after each cleansing\n• Avoid tight clothing, no sexual activity until healed\n• Wear loose-fitting underwear or none for 24-48 hr\n\nProceed to tetanus + antibiotic decision.',
        citation: [1, 3, 6],
        next: 'pzr-tetanus',
        summary: 'Saline irrigation, ointment, loose dressing, heal by secondary intention; primary closure rare',
    },
    // =====================================================================
    // MODULE 5: TETANUS, ANTIBIOTICS & RETURN
    // =====================================================================
    {
        id: 'pzr-tetanus',
        type: 'info',
        module: 5,
        title: 'Tetanus Prophylaxis',
        body: 'Zipper-entrapment skin tears are **tetanus-prone** (contaminated, devitalized edge). [7]\n\n**Quick rule (CDC/ACIP):**\n• Wound breaks skin **AND** last Td/Tdap **>5 years** → give Tdap (or Td)\n• Unknown or <3 lifetime doses → give vaccine **and** consider TIG\n• Skin fully intact → no tetanus action needed\n\nUse the calculator for edge cases (immunocompromised, unknown history): [Tetanus Prophylaxis](#/calculator/tet-prophylaxis).',
        citation: [7],
        next: 'pzr-antibiotics',
        calculatorLinks: [
            { id: 'tet-prophylaxis', label: 'Tetanus Prophylaxis' },
        ],
        summary: 'Tetanus-prone wound; give Tdap if last booster >5 years and skin is broken',
    },
    {
        id: 'pzr-antibiotics',
        type: 'info',
        module: 5,
        title: 'Antibiotic Prophylaxis',
        body: '**Routine prophylactic antibiotics are NOT indicated** for clean, superficial zipper-related skin tears. [1,3,6]\n\n**Consider antibiotics ONLY for:**\n• Immunocompromised host (diabetes, HIV with CD4 <200, neutropenia, chemo, chronic steroids)\n• Full-thickness laceration with contamination\n• Signs of cellulitis at presentation or delayed presentation (>24 h)\n\n**If indicated (skin coverage):**\n• [Cephalexin](#/drug/cephalexin/skin-soft-tissue) 500 mg PO QID x 5 days, OR\n• [Amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/skin-soft-tissue) 875/125 mg PO BID x 5 days\n• PCN allergy: [Doxycycline](#/drug/doxycycline/skin-soft-tissue) 100 mg PO BID x 5 days OR clindamycin',
        citation: [1, 3, 6],
        next: 'pzr-return',
        summary: 'No routine antibiotics; cover only if immunocompromised, deep contamination, or cellulitis',
    },
    {
        id: 'pzr-return',
        type: 'info',
        module: 5,
        title: 'Return Precautions',
        body: '**Return to ED immediately for:** [1,3]\n• Worsening swelling, redness, or pain after 24-48 h\n• Purulent discharge or foul odor\n• Fever >100.4\u00B0F (38\u00B0C)\n• New blood in urine or trouble urinating\n• Skin color change (dusky, black, or pale)\n• Recurrent erection without stimulation (concern for vascular injury)\n\n**Routine follow-up:** PCP or urology in 3-5 days for wound check. Sooner if any concerns above.',
        citation: [1, 3],
        next: 'pzr-disposition',
        summary: 'Return for swelling, redness, discharge, fever, urinary symptoms, skin color change',
    },
    {
        id: 'pzr-disposition',
        type: 'result',
        module: 5,
        title: 'Disposition',
        body: 'Most patients discharge home after a successful bedside release.',
        recommendation: '**DISCHARGE CRITERIA:**\n• Zipper released, skin viable\n• Pain controlled with oral analgesics\n• Tetanus status addressed\n• Patient (or caregiver) understands wound care and return precautions\n\n**DISCHARGE INSTRUCTIONS:**\n• Wound care as in the wound-care node\n• Loose clothing 24-48 h\n• No sexual activity until healed (typically 5-10 days for superficial injury)\n• Follow-up with PCP or urology in 3-5 days\n\n**ADMIT / OBSERVE:**\n• Procedural sedation patients per institutional recovery criteria\n• Any concern for urethral injury after release',
        citation: [1, 3],
        confidence: 'recommended',
        summary: 'Discharge after release if pain controlled, wound stable, tetanus addressed; PCP/urology 3-5 days',
    },
    // =====================================================================
    // MODULE 6: UROLOGY CONSULT CRITERIA
    // =====================================================================
    {
        id: 'pzr-urology-criteria',
        type: 'info',
        module: 6,
        title: 'When to Call Urology',
        body: '**Consult urology (or plastics) for any of the following:** [1,3,6]\n\n• **Suspected urethral injury** — blood at meatus, hematuria, inability to void\n• **Significant skin loss** — full-thickness laceration, devascularized flap, or skin avulsion\n• **Failure of bedside release** after one destruction technique AND adequate analgesia\n• **Recurrent or strangulating injury** with vascular compromise\n• **Complex pediatric case** that cannot tolerate sedation\n\n**Documentation for the call:** mechanism, time entrapped, technique(s) attempted, current skin status, neurovascular exam, analgesia given.\n\nUse the [Urology Consult Template](#/info/pzr-urology-template) to standardize the handoff.',
        citation: [1, 3, 6],
        next: 'pzr-disposition',
        summary: 'Urology for urethral injury, significant skin loss, failed bedside release, or vascular compromise',
    },
];
export const PENILE_ZIPPER_RELEASE_NODE_COUNT = PENILE_ZIPPER_RELEASE_NODES.length;
