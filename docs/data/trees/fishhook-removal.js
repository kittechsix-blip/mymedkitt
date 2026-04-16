// MedKitt — Fishhook Removal Consult
// Triage → Assessment → Technique Selection → Removal → Wound Care
// Category: Procedures. 5 modules, ~25 nodes.
// Sources: AAFP, ACEP Now, ALiEM, PMC literature
export const FISHHOOK_REMOVAL_MODULE_LABELS = [
    'Anatomy & Triage',
    'Assessment',
    'Technique Selection',
    'Removal Procedure',
    'Wound Care & Disposition',
];
export const FISHHOOK_REMOVAL_CITATIONS = [
    { num: 1, text: 'Gammons MG, Jackson E. Fishhook Removal. Am Fam Physician. 2001;63(11):2231-2236.' },
    { num: 2, text: 'Ahmad Khan H, Kamal Y, Rashid A. Advance Without Cut and Retrograde Removal of Embedded Fishhook. Adv J Emerg Med. 2021;5(1):e12.' },
    { num: 3, text: 'ACEP Now. Emergency Medicine Techniques for Removing Fishhooks. 2016.' },
    { num: 4, text: 'Doser C, et al. The Simplest Method for Fishhook Removal: The String-Yank Technique. Cureus. 2024;16(12):e75273.' },
    { num: 5, text: 'Reichman EF. Emergency Medicine Procedures. 2nd ed. McGraw-Hill; 2013. Ch 100.' },
    { num: 6, text: 'Buttaravoli P, Leffler SM. Minor Emergencies. 3rd ed. Elsevier; 2012.' },
    { num: 7, text: 'Prats M. Trick of the Trade: Fishhook Removal Techniques. ALiEM. 2014.' },
    { num: 8, text: 'Thommasen HV, Thomson MJ. The occasional fishhook removal. Can J Rural Med. 2005;10(4):254-259.' },
];
export const FISHHOOK_REMOVAL_CRITICAL_ACTIONS = [
    { text: 'Eye involvement = STOP — emergent ophthalmology consult, do not attempt removal', nodeId: 'fh-eye-injury' },
    { text: 'Assess neurovascular status before and after removal', nodeId: 'fh-assessment' },
    { text: 'X-ray if deep penetration, large hook, or uncertain hook type', nodeId: 'fh-imaging' },
    { text: 'String-yank requires FIXED body part — never on earlobe or free skin', nodeId: 'fh-string-yank' },
    { text: 'Advance-and-cut is almost always successful even for large hooks', nodeId: 'fh-advance-cut' },
    { text: 'Tetanus prophylaxis if >5 years since last booster', nodeId: 'fh-wound-care' },
    { text: 'Antibiotics NOT routine — consider only for deep wounds, immunocompromised, or joints/tendons', nodeId: 'fh-antibiotics' },
];
export const FISHHOOK_REMOVAL_NODES = [
    // =====================================================================
    // MODULE 1: ANATOMY & TRIAGE
    // =====================================================================
    {
        id: 'fh-start',
        type: 'info',
        module: 1,
        title: 'Fishhook Removal — Overview',
        body: 'Fishhook injuries are common presentations. Most can be managed in the ED with proper technique selection. **The barb is the key challenge** — it prevents simple retrograde removal.\n\n**HOOK ANATOMY:**\n• **Eye:** Loop for line attachment\n• **Shank:** Straight portion from eye to bend\n• **Bend:** Curved portion\n• **Point:** Sharp penetrating tip\n• **Barb:** Angled projection preventing easy removal\n• **Gap/Gape:** Distance from point to shank\n\n**HOOK TYPES:**\n• **Single-barbed:** Most common recreational hook\n• **Treble hook:** Three hooks joined at eye (lures)\n• **Multiple barbs:** Commercial fishing hooks\n• **Barbless:** Catch-and-release hooks (easy removal)\n\n**KEY PRINCIPLE:** Match technique to hook type, location, and depth.',
        citation: [1, 5],
        next: 'fh-triage',
        summary: 'Barb prevents simple removal; four techniques available; match technique to hook type and location',
    },
    {
        id: 'fh-triage',
        type: 'question',
        module: 1,
        title: 'Emergent Findings?',
        body: 'Screen for conditions requiring immediate specialty consultation.',
        options: [
            {
                label: 'Eye or eyelid involvement',
                description: 'Hook in globe, cornea, or eyelid',
                next: 'fh-eye-injury',
                urgency: 'critical',
            },
            {
                label: 'Vital structure involvement',
                description: 'Near carotid, radial artery, testicle, peritoneum',
                next: 'fh-vital-structure',
                urgency: 'critical',
            },
            {
                label: 'Deep penetration near joint/tendon',
                description: 'Large hook, suspected joint space or tendon involvement',
                next: 'fh-deep-injury',
                urgency: 'urgent',
            },
            {
                label: 'Superficial soft tissue only',
                description: 'Hand, finger, extremity, scalp, trunk — no vital structures',
                next: 'fh-assessment',
            },
        ],
        summary: 'Screen for eye, vital structure, or deep joint/tendon involvement before attempting removal',
    },
    {
        id: 'fh-eye-injury',
        type: 'result',
        module: 1,
        title: 'Eye Involvement — STOP',
        body: 'Fishhook in the eye, eyelid, or orbit requires immediate ophthalmology consultation.',
        recommendation: '**IMMEDIATE ACTIONS:**\n• Do NOT attempt removal\n• Cover eye with rigid shield (metal cup/patch)\n• Do NOT apply pressure\n• Keep patient calm, minimize eye movement\n• Emergent ophthalmology consult\n• Consider CT orbit if deep penetration suspected\n\n**DISPOSITION:**\n• Operating room for removal under controlled conditions\n• Never attempt ED removal for ocular fishhook injuries\n\n**RATIONALE:**\nUncontrolled removal risks:\n• Globe perforation\n• Lens damage\n• Vitreous loss\n• Retinal detachment',
        citation: [1, 3],
        safetyLevel: 'critical',
        summary: 'Ocular fishhook = emergent ophthalmology; cover with rigid shield; do NOT attempt removal',
    },
    {
        id: 'fh-vital-structure',
        type: 'result',
        module: 1,
        title: 'Vital Structure Involvement',
        body: 'Hooks embedded near or in vital structures require specialist consultation.',
        recommendation: '**STRUCTURES REQUIRING CONSULTATION:**\n• Carotid artery or jugular vein\n• Radial/ulnar artery\n• Femoral vessels\n• Peritoneum/abdominal wall\n• Testicle or urethra\n• Trachea or larynx\n\n**MANAGEMENT:**\n• Do not attempt removal\n• Obtain imaging (CT or ultrasound) to assess depth\n• Appropriate surgical consultation\n• Stabilize hook to prevent further injury\n\n**DISPOSITION:**\n• Operating room or procedural suite with surgical backup',
        citation: [1, 5],
        safetyLevel: 'critical',
        summary: 'Vital structure involvement = surgical consultation; imaging to assess depth; OR removal',
    },
    {
        id: 'fh-deep-injury',
        type: 'info',
        module: 1,
        title: 'Deep Penetration Assessment',
        body: '**Large hooks or deep penetration near joints/tendons require careful evaluation.** [1,5]\n\n**CONCERNING FEATURES:**\n• Large commercial hooks (>2cm gap)\n• Pain with passive ROM of adjacent joint\n• Hook near flexor tendon sheath\n• Penetration depth >1.5-2cm\n• Unable to assess depth clinically\n\n**NEXT STEPS:**\n• X-ray to assess hook position and size\n• Consider ultrasound for soft tissue assessment\n• If joint space or tendon involvement suspected → hand surgery or orthopedic consult\n\n**IF SUPERFICIAL ON IMAGING:**\nProceed to technique selection — advance-and-cut technique is usually successful for large hooks.',
        citation: [1, 5],
        next: 'fh-imaging',
        summary: 'Deep penetration near joints/tendons needs imaging; consider specialty consult if joint space involved',
    },
    // =====================================================================
    // MODULE 2: ASSESSMENT
    // =====================================================================
    {
        id: 'fh-assessment',
        type: 'info',
        module: 2,
        title: 'Pre-Procedure Assessment',
        body: '**Systematic evaluation before removal:** [1,3,5]\n\n**HISTORY:**\n• Hook type (single, treble, barbed, barbless)\n• Time of injury\n• How it occurred (casting accident, handling fish)\n• Water exposure (fresh, salt, contaminated)\n• Tetanus status\n\n**PHYSICAL EXAM:**\n• Entry point location\n• Direction of barb (critical for technique selection)\n• Depth of penetration\n• Proximity to vital structures\n• Neurovascular status distal to injury\n• Associated injuries (other hooks, lacerations)\n\n**HAVE PATIENT DRAW/DESCRIBE THE HOOK** if not visible — helps plan technique.\n\n**TIP:** Remove all attached fishing line, bait, and lure components first. Tape/cut uninvolved hooks on treble hooks.',
        citation: [1, 3, 5],
        next: 'fh-imaging',
        summary: 'Determine hook type, barb direction, depth, NV status; have patient describe hook; remove line/bait first',
    },
    {
        id: 'fh-imaging',
        type: 'info',
        module: 2,
        title: 'Imaging',
        body: '**X-ray is not required for all fishhook injuries but helpful in specific situations.** [1,5]\n\n**INDICATIONS FOR X-RAY:**\n• Deep penetration with uncertain depth\n• Large hook size\n• Near bone or joint\n• Multiple hooks (treble) with unclear positions\n• Unknown hook type\n• Failed removal attempt\n\n**X-RAY FINDINGS:**\n• Hook type (single vs treble)\n• Hook size and orientation\n• Proximity to bone/joint\n• Depth of penetration\n• Barb direction\n\n**ULTRASOUND:**\n• May help visualize hook in soft tissue\n• Can assess proximity to tendons/vessels\n• Useful if X-ray findings unclear\n\n**NOTE:** Do not delay removal for imaging if hook type is known and location is superficial.',
        citation: [1, 5],
        next: 'fh-prep',
        summary: 'X-ray for deep, large, or uncertain hooks; shows type, size, orientation, proximity to structures',
    },
    {
        id: 'fh-prep',
        type: 'info',
        module: 2,
        title: 'Preparation & Equipment',
        body: '**EQUIPMENT CHECKLIST:** [1,3,5,7]\n\n**Required:**\n• Needle driver or hemostat\n• Wire cutters (must cut through hook metal)\n• 18-gauge needle\n• Antiseptic (povidone-iodine or chlorhexidine)\n• String/suture material (0-silk or fishing line)\n• Local anesthetic (lidocaine without epinephrine)\n• 25-27 gauge needle for infiltration\n• Eye protection for patient AND provider\n\n**PREPARATION:**\n1. Remove all attached line, bait, lures\n2. Clean area with antiseptic\n3. Tape or cut uninvolved hooks on treble hooks\n4. Position patient comfortably with good lighting\n5. Put on eye protection (hook can fly during string-yank)\n\n**ANESTHESIA:**\n• String-yank: Often no anesthesia needed (fastest, least painful)\n• All other techniques: Local infiltration around hook\n• Digital block for finger/toe involvement',
        citation: [1, 3, 5, 7],
        next: 'fh-technique-branch',
        summary: 'Wire cutters, hemostat, 18G needle, string, local anesthetic, eye protection; clean area; tape treble hooks',
    },
    // =====================================================================
    // MODULE 3: TECHNIQUE SELECTION
    // =====================================================================
    {
        id: 'fh-technique-branch',
        type: 'question',
        module: 3,
        title: 'Select Removal Technique',
        body: 'Choose technique based on hook characteristics and location. **Start with least traumatic option.**',
        options: [
            {
                label: 'Barbless or very superficial',
                description: 'Hook backing out easily, no barb resistance',
                next: 'fh-retrograde',
            },
            {
                label: 'Small-medium hook, fixed body part',
                description: 'Finger, hand, arm, back, scalp — NOT earlobe',
                next: 'fh-string-yank',
            },
            {
                label: 'Large hook or barb near skin surface',
                description: 'Point almost through skin, or large gap hook',
                next: 'fh-advance-cut',
            },
            {
                label: 'Deeply embedded or sensitive area',
                description: 'Face, ear, nose, joint area',
                next: 'fh-needle-cover',
            },
        ],
        summary: 'Retrograde for barbless; string-yank for small hooks on fixed parts; advance-cut for large hooks; needle-cover for sensitive areas',
    },
    {
        id: 'fh-retrograde',
        type: 'info',
        module: 3,
        title: 'Retrograde Technique',
        body: '**The simplest technique but lowest success rate. Best for barbless or minimally embedded hooks.** [1,4]\n\n**INDICATIONS:**\n• Barbless hooks\n• Very superficially embedded hooks\n• Barb not yet engaged in tissue\n\n**TECHNIQUE:**\n1. Apply downward pressure on hook shank to disengage barb\n2. While maintaining pressure, back hook out along entry path\n3. Use smooth, steady motion\n\n**SUCCESS RATE:** ~30-40%\n\n**IF RESISTANCE FELT:**\n• Stop immediately\n• Barb is engaged — switch to another technique\n• Do not force\n\n**ADVANTAGE:** No additional tissue trauma if successful\n**DISADVANTAGE:** Rarely successful for barbed hooks',
        citation: [1, 4],
        next: 'fh-post-removal',
        summary: 'Simplest technique; press shank down to disengage barb; back out along entry path; stop if resistance',
    },
    {
        id: 'fh-string-yank',
        type: 'info',
        module: 3,
        title: 'String-Yank Technique',
        body: '**Highly effective, minimally traumatic, often requires no anesthesia.** [1,4,7]\n\n**CONTRAINDICATION:**\n• **Free-floating body parts** (earlobe, nose, lip)\n• Must have stable surface to press against\n\n**EQUIPMENT:**\n• 0-silk suture, fishing line, or umbilical tape (~18 inches)\n• Eye protection for all personnel\n\n**TECHNIQUE:**\n1. Wrap string around bend of hook at midpoint\n2. Wind string around index finger for secure grip\n3. Stabilize skin surface (press against table/flat surface)\n4. **Apply firm downward pressure on hook shank** (to disengage barb)\n5. While maintaining shank pressure, **jerk string parallel to shank** in one quick motion\n6. **WARNING:** Hook will fly — ensure clear trajectory\n\n**SUCCESS RATE:** 65-90%\n\n**ADVANTAGES:**\n• Often no anesthesia needed\n• No new wound created\n• Can be done in field\n• Least painful technique',
        citation: [1, 4, 7],
        images: [
            {
                src: 'images/fishhook/string-yank.png',
                alt: 'String-yank technique diagram showing string wrapped around hook bend, downward pressure on shank, and parallel jerk direction',
                caption: 'String-yank technique: Wrap string at bend, press shank down to disengage barb, jerk parallel to shank in quick motion.',
            },
        ],
        next: 'fh-post-removal',
        summary: 'Wrap string at bend; press shank down; jerk parallel to shank; NOT for earlobes; 65-90% success',
    },
    {
        id: 'fh-advance-cut',
        type: 'info',
        module: 3,
        title: 'Advance-and-Cut Technique',
        body: '**Almost always successful, even for large hooks. Best when barb is near skin surface.** [1,5,6]\n\n**INDICATIONS:**\n• Large hooks\n• Barb visible near skin surface\n• String-yank failed or contraindicated\n• Multiple-barbed hooks\n\n**ANESTHESIA:** Always required — local infiltration at exit point\n\n**TECHNIQUE FOR SINGLE-BARBED HOOKS:**\n1. Anesthetize skin where barb will exit\n2. Grasp shank with needle driver/hemostat\n3. Advance hook forward through tissue until barb exits skin\n4. Cut barb off with wire cutters\n5. Back remaining hook out through entry wound\n\n**TECHNIQUE FOR TREBLE/MULTIPLE HOOKS:**\n1. Advance hook until barb exits\n2. Cut shank at entry point (not the barb)\n3. Pull entire hook through in direction of advancement\n4. Avoids backing barb through tissue\n\n**SUCCESS RATE:** >95%\n\n**DISADVANTAGE:** Creates second wound (exit point)',
        citation: [1, 5, 6],
        images: [
            {
                src: 'images/fishhook/advance-cut.png',
                alt: 'Advance-and-cut technique showing hook being pushed through until barb exits, then cut and backed out',
                caption: 'Advance-and-cut: Push hook through until barb exits skin, cut off barb, back out remainder. Almost always successful.',
            },
        ],
        next: 'fh-post-removal',
        summary: 'Push through until barb exits; cut barb; back out remainder; >95% success; creates second wound',
    },
    {
        id: 'fh-needle-cover',
        type: 'info',
        module: 3,
        title: 'Needle-Cover Technique',
        body: '**More technically difficult but useful for sensitive areas where advance-and-cut is undesirable.** [1,5,7]\n\n**INDICATIONS:**\n• Face, ear, nose (where new wound undesirable)\n• Large hooks with prominent barbs\n• Single-barbed hooks only\n\n**EQUIPMENT:**\n• 18-gauge needle (or larger for big hooks)\n• Local anesthesia required\n\n**TECHNIQUE:**\n1. Anesthetize thoroughly around hook\n2. Insert 18G needle along entry tract, **bevel facing hook curve**\n3. Advance needle to cover the barb\n4. Once barb is sheathed, advance hook slightly to engage barb in needle lumen\n5. Back out hook and needle together as a unit\n6. Rotate/twist to help engage barb in needle\n\n**SUCCESS RATE:** 60-70%\n\n**CHALLENGES:**\n• Requires dexterity\n• Difficult to engage barb blind\n• Works best with superficially embedded hooks\n\n**MODIFICATION:**\nSome authors use #11 scalpel blade to create small nick for needle entry',
        citation: [1, 5, 7],
        images: [
            {
                src: 'images/fishhook/needle-cover.png',
                alt: 'Needle-cover technique showing 18G needle inserted to cover barb, then both withdrawn together',
                caption: 'Needle-cover: Insert 18G needle bevel toward hook curve to cover barb; back out together.',
            },
        ],
        next: 'fh-post-removal',
        summary: 'Insert 18G needle to cover barb; back out together; technically difficult; 60-70% success',
    },
    // =====================================================================
    // MODULE 4: REMOVAL PROCEDURE
    // =====================================================================
    {
        id: 'fh-post-removal',
        type: 'question',
        module: 4,
        title: 'Removal Outcome',
        body: 'What was the result of the removal attempt?',
        options: [
            {
                label: 'Successful removal',
                description: 'Hook removed completely',
                next: 'fh-wound-care',
            },
            {
                label: 'Failed — hook still embedded',
                description: 'Technique unsuccessful, hook still in place',
                next: 'fh-failed-removal',
            },
            {
                label: 'Complication during removal',
                description: 'Bleeding, suspected deeper injury, broken hook',
                next: 'fh-complications',
            },
        ],
    },
    {
        id: 'fh-failed-removal',
        type: 'info',
        module: 4,
        title: 'Failed Removal — Next Steps',
        body: '**If initial technique fails, reassess before trying again.** [1,3]\n\n**AFTER FAILED ATTEMPT:**\n1. **Limit attempts to 2 maximum** — each attempt causes more edema and bleeding\n2. Reassess hook position and depth\n3. Consider imaging if not already done\n4. Switch to different technique\n\n**ESCALATION OPTIONS:**\n• String-yank failed → Try advance-and-cut\n• Needle-cover failed → Try advance-and-cut\n• Advance-and-cut failed → Rarely fails; if it does, consult surgery\n\n**WHEN TO REFER:**\n• Two failed attempts\n• Significant bleeding or edema\n• Patient intolerance/distress\n• Hook in technically difficult location\n• Concern for deeper structure involvement\n\n**DISPOSITION:**\nHand surgery or plastic surgery consultation for difficult cases',
        citation: [1, 3],
        next: 'fh-technique-branch',
        summary: 'Limit to 2 attempts; switch technique if first fails; advance-and-cut rarely fails; refer after 2 failed attempts',
    },
    {
        id: 'fh-complications',
        type: 'info',
        module: 4,
        title: 'Complications During Removal',
        body: '**Potential complications and management:** [1,5]\n\n**BROKEN HOOK:**\n• May occur with corroded or old hooks\n• X-ray to confirm fragment location\n• Remove if accessible; may require surgical extraction\n• Document retained foreign body\n\n**SIGNIFICANT BLEEDING:**\n• Apply direct pressure\n• Usually venous — responds to pressure\n• If arterial (pulsatile), consider vascular consultation\n• Tourniquet rarely needed\n\n**SUSPECTED TENDON/NERVE INJURY:**\n• Reassess motor and sensory function\n• Compare to pre-procedure exam\n• New deficit = consultation\n• May have been present pre-removal\n\n**EMBEDDED HOOK FRAGMENT:**\n• Small fragments without symptoms may be observed\n• Tetanus prophylaxis\n• Antibiotics if deep or contaminated\n• Close follow-up',
        citation: [1, 5],
        next: 'fh-wound-care',
        summary: 'Broken hook needs X-ray; bleeding usually responds to pressure; new neuromotor deficit = consult',
    },
    // =====================================================================
    // MODULE 5: WOUND CARE & DISPOSITION
    // =====================================================================
    {
        id: 'fh-wound-care',
        type: 'info',
        module: 5,
        title: 'Wound Care',
        body: '**Post-removal wound management:** [1,3,6]\n\n**IMMEDIATE CARE:**\n1. Explore wound for retained foreign body (bait, debris)\n2. Irrigate thoroughly with saline or tap water\n3. **Leave wound open** — do not suture\n4. Apply triple antibiotic ointment\n5. Simple dressing\n\n**TETANUS PROPHYLAXIS:**\n• Administer Td/Tdap if >5 years since last booster\n• If never immunized or unknown: Td + TIG\n\n**WOUND CARE INSTRUCTIONS:**\n• Keep clean and dry for 24 hours\n• Then wash gently with soap and water daily\n• Change dressing daily or if wet/dirty\n• Watch for signs of infection:\n  - Increasing redness, warmth, swelling\n  - Purulent drainage\n  - Fever\n  - Red streaking (lymphangitis)',
        citation: [1, 3, 6],
        next: 'fh-antibiotics',
        summary: 'Explore for FB, irrigate, leave open, triple antibiotic ointment, tetanus if >5 years',
    },
    {
        id: 'fh-antibiotics',
        type: 'info',
        module: 5,
        title: 'Antibiotic Prophylaxis',
        body: '**Antibiotics are NOT routinely indicated.** [1,3,6]\n\n**NO ANTIBIOTICS NEEDED FOR:**\n• Superficial embeddings\n• Clean wounds\n• Immunocompetent patients\n• Freshwater exposure\n\n**CONSIDER PROPHYLACTIC ANTIBIOTICS FOR:**\n• Immunocompromised patients\n• Diabetes or peripheral vascular disease\n• Deep wounds involving tendon, cartilage, or bone\n• Saltwater or brackish water exposure\n• Heavily contaminated wounds\n• Delayed presentation (>24 hours)\n\n**IF ANTIBIOTICS INDICATED:**\n\n*Freshwater exposure:*\n• Amoxicillin-clavulanate 875/125mg PO BID x 5-7 days\n• OR Doxycycline 100mg PO BID + Ciprofloxacin 500mg PO BID\n\n*Saltwater exposure (Vibrio coverage):*\n• Doxycycline 100mg PO BID x 5-7 days\n• OR Ciprofloxacin 500mg PO BID x 5-7 days\n• OR TMP-SMX DS BID + Fluoroquinolone',
        citation: [1, 3, 6],
        next: 'fh-disposition',
        summary: 'Antibiotics NOT routine; consider for immunocompromised, deep wounds, saltwater exposure; doxycycline for Vibrio',
    },
    {
        id: 'fh-disposition',
        type: 'result',
        module: 5,
        title: 'Disposition & Follow-Up',
        body: 'Most fishhook injuries can be discharged home after successful removal.',
        recommendation: '**DISCHARGE CRITERIA:**\n• Successful hook removal\n• Wound cleaned and dressed\n• Tetanus status addressed\n• Patient understands wound care\n\n**DISCHARGE INSTRUCTIONS:**\n• Wound care as described\n• Return precautions for infection signs\n• Activity as tolerated\n• Follow up with PCP in 3-5 days OR sooner if concerns\n\n**REASONS TO RETURN:**\n• Increasing pain, redness, swelling after 48h\n• Purulent drainage\n• Fever >101°F (38.3°C)\n• Red streaking from wound\n• Opening of wound\n\n**SPECIALTY FOLLOW-UP:**\n• Hand surgery if tendon or nerve injury suspected\n• Ophthalmology if any eye involvement\n• Plastic surgery for complex facial wounds',
        citation: [1, 3],
        summary: 'Discharge home after successful removal; return for infection signs; PCP follow-up 3-5 days',
    },
];
