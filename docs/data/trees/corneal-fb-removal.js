// MedKitt — Corneal/Conjunctival Foreign Body Removal Consult
// Pre-procedure (Seidel) → Anesthesia + VA → Eyelid eversion → Removal ladder → Post-removal care → Follow-up
// Category: Procedures. 6 modules, ~16 nodes.
// Sources: ALiEM, LITFL, StatPearls NBK536957, AAO Preferred Practice Pattern.
export const CORNEAL_FB_REMOVAL_MODULE_LABELS = [
    'Pre-Procedure Screen',
    'Anesthesia & VA',
    'Eyelid Eversion',
    'Removal Ladder',
    'Post-Removal Care',
    'Follow-up',
];
export const CORNEAL_FB_REMOVAL_CITATIONS = [
    { num: 1, text: 'Aslam SA, Sheth HG, Vaughan AJ. Emergency management of corneal injuries. Injury. 2007;38(5):594-597. PMID: 17472791.' },
    { num: 2, text: 'Camodeca AJ, Anderson EP. Corneal Foreign Body. StatPearls. Treasure Island (FL): StatPearls Publishing; 2024. Bookshelf ID: NBK536957.' },
    { num: 3, text: 'Liston RL, Olson RJ, Mamalis N. Slit lamp technique for corneal foreign body removal. Am J Ophthalmol. 1995;120(2):265-266. PMID: 7639300.' },
    { num: 4, text: 'Wakai A, Lawrenson JG, Lawrenson AL, et al. Topical non-steroidal anti-inflammatory drugs for analgesia in traumatic corneal abrasions. Cochrane Database Syst Rev. 2017;5(5):CD009781. PMID: 28516471.' },
    { num: 5, text: 'Yeh S, Colyer MH, Weichel ED. Current trends in the management of intraocular foreign bodies. Curr Opin Ophthalmol. 2008;19(3):225-233. PMID: 18408499.' },
    { num: 6, text: 'Lim CHL, Turner A, Lim BX. Patching for corneal abrasion. Cochrane Database Syst Rev. 2016;7(7):CD004764. PMID: 27457359.' },
    { num: 7, text: 'ALiEM. Corneal Foreign Body Removal. https://www.aliem.com/corneal-foreign-body-removal/' },
    { num: 8, text: 'LITFL. Corneal Foreign Body. https://litfl.com/corneal-foreign-body/' },
];
export const CORNEAL_FB_REMOVAL_CRITICAL_ACTIONS = [
    { text: 'Rule out open globe (positive Seidel) BEFORE any manipulation', nodeId: 'cfb-seidel' },
    { text: 'Document visual acuity before and after procedure', nodeId: 'cfb-anesthesia' },
    { text: 'Evert upper lid to exclude tarsal foreign body', nodeId: 'cfb-eversion' },
    { text: 'NEVER prescribe topical anesthetic for home use — toxicity to corneal epithelium', nodeId: 'cfb-post-care' },
    { text: 'Central visual axis FB or vegetative material = ophthalmology now', nodeId: 'cfb-failure' },
];
export const CORNEAL_FB_REMOVAL_NODES = [
    // =====================================================================
    // MODULE 1: PRE-PROCEDURE SCREEN
    // =====================================================================
    {
        id: 'cfb-start',
        type: 'info',
        module: 1,
        title: 'Corneal Foreign Body Removal',
        body: '> 🚨 **STOP if open globe suspected.** Mechanism + Seidel test FIRST. If you cannot rule out open globe, do not touch the eye except to apply a rigid shield. See [Globe Rupture](#/tree/globe-rupture).\n\n[Steps Summary](#/info/cfb-steps) — full procedural walkthrough.\n\n**Scope of this consult:** Removal of superficial corneal or conjunctival foreign body in the ED. Excludes intraocular FB (penetrating), open globe, and central visual axis material requiring ophthalmology.\n\n**Mechanism risk-stratification:**\n- **Low velocity / blunt:** simple grinding, dust, debris under lid — usually superficial\n- **High velocity / metal-on-metal:** grinder without eye protection, hammering metal — assume intraocular FB until proven otherwise; CT orbit usually indicated\n- **Vegetative material:** plant, wood — higher fungal infection risk, lower threshold for ophthalmology referral',
        citation: [1, 2, 5, 8],
        next: 'cfb-seidel',
        summary: 'Superficial corneal/conjunctival FB only; rule out open globe with mechanism + Seidel first',
        safetyLevel: 'critical',
        skippable: false,
    },
    {
        id: 'cfb-seidel',
        type: 'question',
        module: 1,
        title: 'Seidel Test & Mechanism Screen',
        body: '**Seidel test:** Apply fluorescein strip, examine at slit lamp with cobalt blue. Aqueous leaking from a perforation will dilute the orange fluorescein into a bright green stream (the "Seidel positive" waterfall).\n\n**Mechanism-based imaging:** If high-velocity metal-on-metal or any suspicion of intraocular FB → **CT orbit (thin cuts)** before any manipulation. Avoid MRI if metal FB is possible.\n\n**Also screen for:** hyphema, irregular pupil, severe pain out of proportion, decreased VA, blood in the anterior chamber.',
        options: [
            {
                label: 'Seidel negative, low-risk mechanism, FB clearly superficial',
                description: 'Safe to proceed with removal',
                next: 'cfb-anesthesia',
            },
            {
                label: 'Seidel POSITIVE or open globe suspected',
                description: 'Visible perforation, aqueous leak, irregular pupil, hyphema',
                next: 'cfb-open-globe',
                urgency: 'critical',
            },
            {
                label: 'High-velocity mechanism, no obvious open globe',
                description: 'Metal grinder, hammering — image first to exclude IOFB',
                next: 'cfb-iofb',
                urgency: 'urgent',
            },
        ],
        citation: [1, 2, 5],
        summary: 'Seidel test rules out open globe; high-velocity mechanism = CT orbit first',
        safetyLevel: 'critical',
    },
    {
        id: 'cfb-open-globe',
        type: 'result',
        module: 1,
        title: 'Open Globe — STOP, Do NOT Remove',
        body: '**Seidel positive or open globe suspected. Hands off the eye.** Any pressure (including the eyelid retractor or pressing for slit lamp exam) can extrude intraocular contents.',
        recommendation: '**Immediate actions:**\n1. **Rigid eye shield** (not a patch) — Fox shield or commercial shield. No pressure on the globe.\n2. NPO, head up 30°, anti-emetic (vomiting raises IOP) — [Ondansetron](#/drug/ondansetron/general) 4mg IV\n3. Pain control with IV analgesia — avoid topical drops\n4. **Tetanus** if not up to date\n5. **IV antibiotics**: [Vancomycin](#/drug/vancomycin/open-globe) 25mg/kg IV + [Ceftriaxone](#/drug/ceftriaxone/open-globe) 2g IV (or [Moxifloxacin](#/drug/moxifloxacin/open-globe) 400mg IV if PCN/cephalosporin allergy) — Gram-positive and Gram-negative endophthalmitis coverage\n6. **Emergent ophthalmology consult** for OR\n7. CT orbit (thin cuts, no contrast) to characterize injury, but do not delay ophthalmology call\n\n**Cross-link:** [Globe Rupture / Open Globe](#/tree/globe-rupture)',
        treatment: {
            firstLine: {
                drug: 'Rigid eye shield + IV antibiotics',
                dose: 'Vancomycin 25mg/kg IV + Ceftriaxone 2g IV',
                route: 'IV',
                frequency: 'Once in ED, continue per ophthalmology',
                duration: 'Until OR',
                notes: 'No pressure on the globe. NPO. Anti-emetic. Tetanus. Ophthalmology STAT.',
            },
            monitoring: 'Continuous, head up 30°, no Valsalva',
        },
        confidence: 'definitive',
        citation: [1, 5],
        safetyLevel: 'critical',
        summary: 'Rigid shield, NPO, IV vanc + cef, anti-emetic, ophthalmology STAT; do not remove FB',
    },
    {
        id: 'cfb-iofb',
        type: 'result',
        module: 1,
        title: 'Intraocular FB Suspected — Image Before Touching',
        body: 'High-velocity mechanism (metal grinder, hammering, gunshot wadding) requires intraocular FB workup before manipulation.',
        recommendation: '**Workup:**\n• **CT orbit (thin cuts)** — workup of choice; detects metallic FB ≥0.5mm\n• Avoid MRI if any chance of ferromagnetic FB\n• B-scan ultrasound only by ophthalmology, gently, after open globe excluded\n\n**If CT shows IOFB:** emergent ophthalmology, IV antibiotics as for open globe, NPO, no further ED manipulation.\n\n**If CT is clean and Seidel negative and the FB is clearly superficial on slit lamp:** proceed with [removal ladder](#/node/cfb-removal-ladder).',
        confidence: 'recommended',
        citation: [1, 5],
        summary: 'High-velocity mechanism = CT orbit first; positive IOFB = ophthalmology STAT, no ED removal',
    },
    // =====================================================================
    // MODULE 2: ANESTHESIA & VISUAL ACUITY
    // =====================================================================
    {
        id: 'cfb-anesthesia',
        type: 'info',
        module: 2,
        title: 'Topical Anesthesia + Visual Acuity',
        body: '**Document visual acuity BEFORE and AFTER the procedure** — both eyes, with correction if available, pinhole if reduced. This is the single most important documentation point and protects you medico-legally.\n\n**Anesthesia:** [Proparacaine](#/drug/proparacaine/corneal-fb) or [Tetracaine](#/drug/tetracaine/corneal-fb) — 1-2 drops to affected eye. Onset 15-30 seconds, lasts 15-20 minutes.\n\n**NEVER prescribe topical anesthetic for home use.** Even brief outpatient use causes corneal epithelial toxicity, melting, and infection — a sentinel patient safety event. Counsel the patient explicitly.\n\n**Cycloplegic (optional, for ciliary spasm pain):** [Cyclopentolate 1%](#/drug/cyclopentolate/corneal-abrasion) 1 drop in clinic, then once at home for symptom relief. Skip if mild abrasion only.',
        citation: [2, 4, 7],
        next: 'cfb-eversion',
        summary: 'Proparacaine 1-2 drops, document VA pre/post, NEVER prescribe topical anesthetic for home use',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 3: EYELID EVERSION
    // =====================================================================
    {
        id: 'cfb-eversion',
        type: 'info',
        module: 3,
        title: 'Eyelid Eversion — Exclude Tarsal FB',
        body: '**Always evert the upper lid** even if the FB looks corneal. A tarsal FB will be invisible until you flip the lid, and it will keep scratching the cornea with every blink.\n\n[Eversion technique reference](#/info/cfb-eversion) — single and double eversion technique.\n\n**Single eversion (most cases):**\n1. Anesthetize the eye\n2. Ask the patient to look down (NOT close)\n3. Grasp the upper lashes; place a cotton-tip applicator horizontally across the upper lid crease\n4. Roll the lid up and over the cotton-tip — exposes the tarsal conjunctiva\n5. Wipe any FB off the tarsal surface with a moistened cotton-tip\n6. Release; the lid returns to position naturally\n\n**Double eversion** (rarely needed in ED): use a Desmarres retractor or bent paper-clip to expose deeper fornices — typically ophthalmology territory.\n\n**Also check:** lower fornix (pull down lower lid, ask patient to look up).',
        citation: [2, 7, 8],
        next: 'cfb-removal-ladder',
        summary: 'Single eversion with cotton-tip + downward gaze; wipe tarsal FB with moistened cotton-tip',
    },
    // =====================================================================
    // MODULE 4: REMOVAL LADDER
    // =====================================================================
    {
        id: 'cfb-removal-ladder',
        type: 'question',
        module: 4,
        title: 'Removal Ladder — Start Gentle',
        body: '**Escalate from least to most invasive.** Most superficial FB come off with irrigation or a cotton-tip; needle removal at the slit lamp is reserved for embedded particles.\n\n[Removal ladder reference](#/info/cfb-removal-ladder) — technique details and pitfalls.\n\n**Choose your starting step:**',
        options: [
            {
                label: 'Loose surface FB or conjunctival sac debris',
                description: 'Try saline irrigation first',
                next: 'cfb-irrigation',
            },
            {
                label: 'FB sitting on cornea, not embedded',
                description: 'Moistened cotton-tip',
                next: 'cfb-cotton-tip',
            },
            {
                label: 'FB embedded in cornea (small, peripheral)',
                description: '25-27g needle at slit lamp, tangential bevel',
                next: 'cfb-needle',
            },
            {
                label: 'Metallic FB with rust ring',
                description: 'Needle removal + ophthalmic burr for rust',
                next: 'cfb-rust-ring',
            },
            {
                label: 'Central / visual axis / vegetative / multiple',
                description: 'Ophthalmology — do not attempt ED removal',
                next: 'cfb-failure',
                urgency: 'urgent',
            },
        ],
        citation: [2, 3, 7, 8],
        summary: 'Ladder: irrigation → cotton-tip → 25-27g needle at slit lamp → burr for rust ring',
    },
    {
        id: 'cfb-irrigation',
        type: 'info',
        module: 4,
        title: 'Saline Irrigation',
        body: '**Indication:** Loose surface FB, conjunctival sac debris, dust, eyelash, particulate material.\n\n**Technique:**\n1. Patient supine, head turned to affected side, towel under cheek\n2. **20-50 mL normal saline** via syringe with no needle, or IV tubing + bag held high\n3. Direct stream from medial to lateral canthus, flushing across the surface and into the fornices\n4. Have patient look in all directions to expose fornices\n5. Examine again at slit lamp — if FB still present, advance to cotton-tip or needle',
        citation: [2, 7],
        next: 'cfb-post-care',
        summary: '20-50 mL saline irrigation medial to lateral; reassess at slit lamp if FB persists',
    },
    {
        id: 'cfb-cotton-tip',
        type: 'info',
        module: 4,
        title: 'Moistened Cotton-Tip Removal',
        body: '**Indication:** FB sitting on the cornea surface, not embedded — typically loose dust, fiber, or small particles.\n\n**Technique:**\n1. Moisten cotton-tip applicator with sterile saline (dry cotton can scrape epithelium)\n2. At slit lamp with patient stabilized\n3. **Gentle dabbing motion** — never rub. Touch the FB only, lift it off.\n4. If it sticks to the cotton, dispose of cotton-tip; if it stays on cornea, FB is embedded → move to needle technique\n\n**Pitfall:** Dragging a cotton-tip across the cornea creates a large abrasion. Always dab, do not drag.',
        citation: [2, 7],
        next: 'cfb-post-care',
        summary: 'Moistened cotton-tip, dab not drag; if FB stuck, escalate to needle technique',
    },
    {
        id: 'cfb-needle',
        type: 'info',
        module: 4,
        title: '25-27g Needle at Slit Lamp',
        body: '**Indication:** Embedded corneal FB, small, peripheral (NOT central visual axis).\n\n**Technique:**\n1. Patient seated at slit lamp, both eyes open (uninvolved eye fixates on target)\n2. Anesthetize affected eye\n3. **25 or 27 gauge needle** on a tuberculin syringe (the syringe gives you a handle; the needle does the work)\n4. Approach **tangentially** — bevel parallel to the cornea, NOT pointing at the cornea. The needle slides under the FB and lifts it off.\n5. Brace your hand on the slit lamp — any patient movement plus a perpendicular needle = corneal perforation\n6. **Sweeping motion, not stabbing**\n7. Remove the FB in one or two attempts\n\n**Pitfall:** If the FB is central (over the pupil), an inexperienced operator should refer rather than risk a scar in the visual axis.',
        citation: [2, 3, 7, 8],
        next: 'cfb-rust-ring',
        summary: '25-27g needle tangential bevel at slit lamp, brace hand, sweep not stab; central FB = ophtho',
        safetyLevel: 'warning',
    },
    {
        id: 'cfb-rust-ring',
        type: 'info',
        module: 4,
        title: 'Rust Ring Management',
        body: '**Metallic FB (most often steel from grinding) oxidizes within hours and leaves a rust ring** even after the FB itself is removed. The rust is corneal injury and must come out — but timing matters.\n\n**Options:**\n1. **Same-day removal with ophthalmic burr (Algerbrush)** — preferred when available. Light touch under slit lamp, mechanical curettage of softened rust. Stop before reaching Bowman\'s layer.\n2. **Defer 24-48h to ophthalmology** — many EDs do this. The rust ring softens with time and is easier to remove. The patient is on prophylactic antibiotics in the meantime.\n3. **Leave a tiny residual ring** if peripheral and small — it often migrates to the surface and sloughs off; ophthalmology will recheck.\n\n**Do not chase the rust into the stroma.** Stop when the surface is clean even if a faint stain remains. Ophthalmology will finish the job at follow-up.',
        citation: [2, 3, 7, 8],
        next: 'cfb-post-care',
        summary: 'Burr same-day OR defer 24-48h to ophthalmology; do not chase rust into stroma',
    },
    // =====================================================================
    // MODULE 5: POST-REMOVAL CARE
    // =====================================================================
    {
        id: 'cfb-post-care',
        type: 'info',
        module: 5,
        title: 'Post-Removal Care',
        body: '[Eye drop selector reference](#/info/cfb-drop-selector) — comparison of antibiotic and adjunct drops.\n\n**Recheck visual acuity** — must match or improve compared with pre-procedure.\n\n**Topical antibiotic prophylaxis (3-5 days):**\n• [Erythromycin ointment](#/drug/erythromycin-ointment/corneal-abrasion) qid (cheap, gentle)\n• OR [Polymyxin B–Trimethoprim](#/drug/polymyxin-trimethoprim/corneal-abrasion) 1 drop qid\n• **Contact lens wearers must get Pseudomonas coverage** — [Ciprofloxacin 0.3%](#/drug/ciprofloxacin-ophthalmic/contact-lens-keratitis) or [Moxifloxacin 0.5%](#/drug/moxifloxacin-ophthalmic/contact-lens-keratitis) 1 drop qid x 5-7 days\n• **Vegetative FB** (plant, wood): consider adding antifungal — defer to ophthalmology\n\n**Adjuncts:**\n• Cycloplegic for ciliary spasm pain ([Cyclopentolate 1%](#/drug/cyclopentolate/corneal-abrasion) BID x 1-2 days) — optional, only if significant photophobia\n• **Topical NSAID drops with caution** — limited duration, watch for corneal melt (rare with short courses)\n• **No patching** — Cochrane 2016 found no benefit and possible harm\n• Oral analgesia ([Acetaminophen](#/drug/acetaminophen/general) and/or [Ibuprofen](#/drug/ibuprofen/general))\n\n**Counsel:** No rubbing the eye, no contact lenses until cleared by ophthalmology, return for worsening pain, decreased vision, purulent discharge, or photophobia.',
        citation: [2, 4, 6, 7],
        next: 'cfb-followup',
        summary: 'VA recheck, erythromycin/polytrim qid x3-5d, cipro/moxi if contact lens wearer, no patching',
    },
    // =====================================================================
    // MODULE 6: FOLLOW-UP
    // =====================================================================
    {
        id: 'cfb-followup',
        type: 'result',
        module: 6,
        title: 'Disposition & Follow-up',
        body: 'Most patients discharge with primary care or optometry follow-up. Ophthalmology referral is for specific situations.',
        recommendation: '**Discharge criteria:**\n• Successful FB removal\n• Symptoms improving (post-anesthesia pain expected for 24-48h as epithelium heals)\n• VA at baseline or better\n• Antibiotic drops/ointment prescribed\n• Patient understands return precautions\n\n**Follow-up timing:**\n• **24-48h** for residual rust ring, large abrasion, contact lens wearer, vegetative material, or any uncertainty\n• **3-5 days** for routine small abrasions\n• PCP or optometry is acceptable for simple cases; ophthalmology for the indications above\n\n**Return precautions:** worsening pain, decreased vision, purulent discharge, expanding redness, photophobia.\n\n**Counsel on eye protection** — most ED corneal FBs are from grinding without safety glasses. Strongly recommend protective eyewear going forward.',
        confidence: 'recommended',
        citation: [2, 7, 8],
        summary: 'Discharge with abx drops, 24-48h follow-up for rust/contact lens/vegetative, return for vision change',
    },
    {
        id: 'cfb-failure',
        type: 'result',
        module: 6,
        title: 'Refer to Ophthalmology',
        body: 'Specific situations require ophthalmology referral rather than ED removal.',
        recommendation: '**Refer (urgent or emergent) for:**\n• Central or visual-axis FB — scar risk\n• Penetrating or deep FB (any concern for partial-thickness perforation)\n• Multiple FBs or contaminated wound\n• Vegetative material (plant, wood) — fungal risk\n• Persistent rust ring after first ED attempt\n• Failure to remove with 1-2 ED attempts\n• Contact lens wearer with significant infiltrate or ulcer\n• Decreased visual acuity not explained by surface injury\n\n**Bridge therapy while awaiting ophthalmology:**\n• Topical antibiotic per [post-care guide](#/node/cfb-post-care) — Pseudomonas coverage for contact lens users\n• No patching\n• Rigid shield only if open globe suspected\n• Oral analgesia',
        confidence: 'recommended',
        citation: [2, 5, 7],
        summary: 'Central/vegetative/persistent rust/contact lens infiltrate/decreased VA = ophthalmology',
    },
];
export const CORNEAL_FB_REMOVAL_NODE_COUNT = CORNEAL_FB_REMOVAL_NODES.length;
