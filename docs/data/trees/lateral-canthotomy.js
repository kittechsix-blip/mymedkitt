// MedKitt — Lateral Canthotomy & Inferior Cantholysis (LCIC) Consult
// Recognize OCS → Decide to act (IOP/VA) → Rule out globe rupture → Setup/anesthesia
//   → Canthotomy → Inferior cantholysis → Reassess ± superior crus → Disposition
// Categories: Procedures (canonical) + Ophthalmology (cross-listed).
// Sources: Scoville 2023 (PMID 37290250), Murali 2021 JACEP Open, StatPearls NBK557476,
//   EyeWiki OCS, REBEL EM, Iowa EyeRounds, LITFL, Merck Manual, Hayreh 1980 (PMID 6769079),
//   Gioia 1987 (PMID 3566607).
export const LATERAL_CANTHOTOMY_MODULE_LABELS = [
    'Recognize OCS',
    'Decide to Act',
    'Rule Out Globe Rupture',
    'Setup & Anesthesia',
    'Canthotomy & Cantholysis',
    'Reassess & Disposition',
];
export const LATERAL_CANTHOTOMY_CITATIONS = [
    { num: 1, text: 'Scoville NM, Ding L, Stacey AW. Success rates of lateral canthotomy and cantholysis for treatment of orbital compartment syndrome. Am J Emerg Med. 2023;70:160-164. PMID: 37290250.' },
    { num: 2, text: 'Murali S, Davis C, McCrea MJ, Plewa MC. Orbital compartment syndrome: pearls and pitfalls for the emergency physician. J Am Coll Emerg Physicians Open. 2021;2(2):e12372. PMID: 33778806.' },
    { num: 3, text: 'Vassallo S, Hartstein M, Howard D, Stetz J. Traumatic retrobulbar hemorrhage: emergent decompression by lateral canthotomy and cantholysis. J Emerg Med. 2002;22(3):251-256. PMID: 11932087.' },
    { num: 4, text: 'McCallum E, Keren S, Lapira M, Norris JH. Orbital Compartment Syndrome: An Update. StatPearls. NCBI Bookshelf NBK557476. Treasure Island (FL): StatPearls Publishing; 2024.' },
    { num: 5, text: 'EyeWiki (American Academy of Ophthalmology). Orbital Compartment Syndrome. https://eyewiki.org/Orbital_Compartment_Syndrome (accessed 2026).' },
    { num: 6, text: 'Rixen J, Verdick R, Allen RC, Carter KD. Lateral Canthotomy and Inferior Cantholysis. University of Iowa EyeRounds. https://webeye.ophth.uiowa.edu/eyeforum/tutorials/lateral-canthotomy-cantholysis.htm' },
    { num: 7, text: 'REBEL EM. Orbital Compartment Syndrome: Pearls and Pitfalls for the ED Physician. https://rebelem.com/orbital-compartment-syndrome-pearls-and-pitfalls-for-the-ed-physician/' },
    { num: 8, text: 'LITFL. Procedure: Lateral Canthotomy. https://litfl.com/procedure-lateral-canthotomy-instructions/' },
    { num: 9, text: 'Hayreh SS, Weingeist TA. Experimental occlusion of the central retinal artery of the retina. Br J Ophthalmol. 1980;64(11):818-825. PMID: 6769079.' },
    { num: 10, text: 'Gioia VM, Linberg JV, McCormick SA. The anatomy of the lateral canthal tendon. Arch Ophthalmol. 1987;105(4):529-532. PMID: 3566607.' },
];
export const LATERAL_CANTHOTOMY_CRITICAL_ACTIONS = [
    { text: 'Orbital compartment syndrome is a CLINICAL diagnosis — do NOT delay decompression for CT or ophthalmology', nodeId: 'lcc-start' },
    { text: 'Vision loss is a LATE sign (present in <50%) — act on proptosis + tense lids + RAPD, not on blindness', nodeId: 'lcc-recognize' },
    { text: 'The CANTHOLYSIS decompresses (~30 mmHg drop); canthotomy alone barely helps (~14 mmHg). Never stop at the skin cut', nodeId: 'lcc-cantholysis' },
    { text: 'Release the INFERIOR crus first; reserve the superior crus for persistent OCS (lacrimal artery/gland bleed superiorly)', nodeId: 'lcc-cantholysis' },
    { text: 'Retinal ischemia becomes irreversible at ~90-120 min — decompress within 2 hours of onset', nodeId: 'lcc-decide' },
];
export const LATERAL_CANTHOTOMY_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNIZE OCS
    // =====================================================================
    {
        id: 'lcc-start',
        type: 'info',
        module: 1,
        title: 'Lateral Canthotomy & Cantholysis',
        body: '> 🚨 **Sight-saving, time-critical procedure for orbital compartment syndrome (OCS).** The orbit is a closed bony box (~30 mL) sealed anteriorly only by the eyelids and orbital septum. A small added volume of blood (retrobulbar hemorrhage) spikes orbital and intraocular pressure, throttling the optic nerve and occluding the central retinal artery. Decompress before the retina dies.\n\n[Indications](#/info/lcc-indications) · [Procedure Steps](#/info/lcc-steps) · [Do NOT / Pitfalls](#/info/lateral-canthotomy-stop)\n\n**The single rule that saves the eye:** OCS is a **clinical** diagnosis. Do **NOT** wait for CT, tonometry, or ophthalmology when the picture is obvious — perform the procedure first, image after.\n\n**The single rule that saves the procedure:** it is the **cantholysis** (releasing the canthal tendon), not the **canthotomy** (the skin cut), that decompresses the orbit. Canthotomy alone drops IOP only ~14 mmHg; adding cantholysis drops it ~30 mmHg.',
        citation: [2, 4, 5],
        next: 'lcc-recognize',
        summary: 'OCS = closed-box orbit + retrobulbar blood → optic nerve/retinal ischemia. Clinical diagnosis; cantholysis is the decompressing step.',
        safetyLevel: 'critical',
        skippable: false,
    },
    {
        id: 'lcc-recognize',
        type: 'info',
        module: 1,
        title: 'Recognize Orbital Compartment Syndrome',
        body: '[Landmark anatomy](#/info/lcc-landmarks) — lateral canthal tendon, crura, Whitnall tubercle.\n\n**The actionable early triad (Erickson 2020):**\n1. **Relative proptosis** — the globe bulges forward; compare to the other side\n2. **Tense, tight eyelids** that resist opening; "rock-hard" globe with resistance to retropulsion\n3. **RAPD** (relative afferent pupillary defect / Marcus Gunn pupil) in the injured eye\n\n**Supporting signs:** severe eye pain, decreased visual acuity, ophthalmoplegia, markedly elevated IOP, chemosis, subconjunctival hemorrhage, cherry-red macula on fundoscopy.\n\n> ⚠️ **Vision loss is a LATE sign — present in fewer than half of OCS cases.** Do NOT wait for it. A patient with proptosis, a tense orbit, and an RAPD has OCS until proven otherwise even if acuity is still measurable.\n\n**Typical setting:** facial/orbital trauma, recent orbital or sinus surgery, retrobulbar block, anticoagulation. A spontaneous retrobulbar bleed can occur with Valsalva or coagulopathy.',
        citation: [4, 5, 7],
        next: 'lcc-decide',
        summary: 'Triad: relative proptosis + tense/tight lids + RAPD. Vision loss is LATE (<50%) — never wait for it.',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 2: DECIDE TO ACT
    // =====================================================================
    {
        id: 'lcc-decide',
        type: 'question',
        module: 2,
        title: 'Decide to Decompress',
        body: 'Combine the clinical picture with IOP if you can measure it quickly. **Never delay decompression to obtain tonometry** when the clinical picture is obvious, and **never measure IOP if you suspect globe rupture.**\n\n[IOP threshold tool](#/calculator/lcc-iop) — enter IOP + symptoms for the action tier.\n\n**Numbers to anchor on:**\n- Normal IOP 10–21 mmHg\n- IOP **>30 mmHg with symptoms** → call ophthalmology, prepare to decompress\n- IOP **>40 mmHg** → decompress now\n- Retinal ischemia becomes irreversible at roughly **90–120 minutes** — the clock started at symptom onset',
        options: [
            {
                label: 'OCS clinically obvious (proptosis + tense orbit + RAPD)',
                description: 'Decompress now — do not wait for IOP, CT, or ophthalmology',
                next: 'lcc-rupture-check',
                urgency: 'critical',
            },
            {
                label: 'IOP >40, or >30 with vision/pain symptoms',
                description: 'Meets the pressure threshold — proceed toward decompression',
                next: 'lcc-rupture-check',
                urgency: 'critical',
            },
            {
                label: 'Uncertain / mild — proptosis but soft orbit, normal VA & IOP',
                description: 'Not clearly OCS yet — temporize and re-examine closely',
                next: 'lcc-observe',
            },
        ],
        citation: [2, 5, 7, 9],
        summary: 'Decompress if clinically obvious OR IOP >40 (or >30 + symptoms). Ischemia irreversible ~90-120 min.',
        safetyLevel: 'critical',
    },
    {
        id: 'lcc-observe',
        type: 'result',
        module: 2,
        title: 'Equivocal — Temporize & Re-Examine',
        body: '**Not clearly OCS (soft orbit, normal acuity and IOP).** Do not perform canthotomy on a globe that is not under threat, but keep a very low threshold to act — OCS can declare itself over minutes as a bleed expands.',
        recommendation: '**Plan:**\n• Serial exams every 15–30 min: visual acuity, pupil/RAPD, IOP, degree of proptosis and lid tension\n• Elevate head of bed; reverse anticoagulation if present and feasible\n• Urgent ophthalmology consult and CT orbit to characterize the injury — but imaging is to plan, never a reason to delay if the eye declares itself\n• Temporizing medical adjuncts (do NOT substitute for decompression if OCS develops): consider IV acetazolamide, mannitol, topical IOP-lowering drops — limited, secondary role\n\n**Return to the decompression pathway immediately** if acuity drops, an RAPD appears, IOP climbs >40 (or >30 with symptoms), or the orbit becomes tense.',
        confidence: 'recommended',
        citation: [5, 7],
        summary: 'Equivocal: serial exams q15-30min, HOB up, reverse anticoagulation, ophtho + CT. Decompress the moment OCS declares.',
    },
    // =====================================================================
    // MODULE 3: RULE OUT GLOBE RUPTURE
    // =====================================================================
    {
        id: 'lcc-rupture-check',
        type: 'question',
        module: 3,
        title: 'Screen for Globe Rupture',
        body: 'Globe rupture is the main contraindication, because canthotomy + pressure on a ruptured globe extrudes intraocular contents. Screen quickly — but remember the signs overlap with OCS and a missed OCS also blinds.\n\n**Rupture clues (the discriminators):**\n- **Enophthalmos** (sunken globe) instead of proptosis\n- Teardrop / peaked or irregular pupil\n- Obvious corneal/scleral laceration, extruded uveal tissue\n- Hyphema; **low IOP (<5 mmHg)** rather than high\n- Positive Seidel sign',
        options: [
            {
                label: 'No rupture signs — proptotic, high-pressure globe',
                description: 'Classic OCS picture — proceed to the procedure',
                next: 'lcc-setup',
                urgency: 'critical',
            },
            {
                label: 'Rupture suspected (enophthalmos, teardrop pupil, low IOP)',
                description: 'Weigh carefully — see the rupture caution',
                next: 'lcc-rupture-caution',
                urgency: 'critical',
            },
        ],
        citation: [4, 5, 8],
        summary: 'Rupture clues: enophthalmos, teardrop pupil, hyphema, IOP <5, Seidel+. Overlaps with OCS; weigh both.',
        safetyLevel: 'warning',
    },
    {
        id: 'lcc-rupture-caution',
        type: 'result',
        module: 3,
        title: 'Suspected Globe Rupture — Weigh Carefully',
        body: '**Globe rupture is a relative, not absolute, contraindication in practice.** Rupture and OCS signs overlap, and an untreated OCS blinds just as surely. The deciding question is whether the eye is under tension from a compartment (decompress) or open and decompressed by the rupture itself (protect, do not cut).',
        recommendation: '**If rupture is likely and the orbit is NOT tense (low IOP, enophthalmos):**\n• Do **not** perform canthotomy. Protect the globe — rigid eye shield (no patch, no pressure), antiemetics, analgesia, tetanus, IV antibiotics, NPO\n• Emergent ophthalmology for operative repair; CT orbit\n\n**If both OCS and rupture are possible and the orbit IS tense / vision is threatened (LITFL guidance):**\n• Proceed with canthotomy and inferior cantholysis **while scrupulously avoiding any pressure on the globe** — keep forceps and scissors directed away from the globe, lift tissue outward, never push inward\n• A threatened eye from OCS will be lost without decompression; gentle technique lets you address both\n\n**When genuinely uncertain, involve ophthalmology emergently — but do not let the consult delay decompression of a tense, vision-threatened orbit.**',
        confidence: 'recommended',
        citation: [4, 8],
        summary: 'Rupture + soft orbit = shield, no cut, ophtho. Rupture + tense vision-threatened orbit = decompress gently, no globe pressure.',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 4: SETUP & ANESTHESIA
    // =====================================================================
    {
        id: 'lcc-setup',
        type: 'info',
        module: 4,
        title: 'Equipment & Anesthesia',
        body: 'Everything you need is in a standard laceration tray — do not hunt for a special kit.\n\n[Procedure steps overview](#/info/lcc-steps)\n\n**Equipment:**\n- Antiseptic, sterile drape, gauze, saline\n- Topical ophthalmic anesthetic drops (proparacaine/tetracaine)\n- [Lidocaine 1–2% with epinephrine](#/drug/lidocaine/canthotomy) on a 25-gauge needle (epi aids hemostasis)\n- **Straight hemostat / Kelly clamp** (for the crush step)\n- **Iris / Stevens tenotomy scissors** (preferred over a blade for control)\n- **Toothed forceps** ×2 (to grasp the lid and tension the crus)\n- Tono-Pen for pre/post IOP if available\n\n**Anesthesia:**\n1. Topical anesthetic drops to the globe\n2. Inject ~1–2 mL lidocaine **with epinephrine** into the lateral canthus, directing the needle tip **away from the globe**\n\n> Do not let anesthesia setup stall the procedure in a rapidly failing eye — a few mL of local is enough; the canthal skin is relatively insensate after topical drops.',
        citation: [4, 8],
        next: 'lcc-canthotomy',
        summary: 'Standard lac tray: lidocaine+epi (25G, away from globe), straight hemostat, iris scissors, toothed forceps, Tono-Pen.',
    },
    // =====================================================================
    // MODULE 5: CANTHOTOMY & CANTHOLYSIS
    // =====================================================================
    {
        id: 'lcc-canthotomy',
        type: 'info',
        module: 5,
        title: 'Step 1 — Crush & Canthotomy',
        body: '[Landmark anatomy](#/info/lcc-landmarks) — orient yourself before you cut.\n\n**a. Hemostat crush (optional but recommended).** Lay a straight hemostat across the lateral canthus from the canthal angle to the orbital rim and **crush for ~1 minute**. This devascularizes the tissue (less bleeding) and marks your incision line.\n\n**b. Canthotomy — the skin cut.** With toothed forceps lifting the skin **away from the globe**, cut horizontally through the crushed lateral canthus toward the orbital rim, **~1–2 cm** (do not exceed 2 cm — the temporal branch of the facial nerve runs nearby).\n\n> ⚠️ **The canthotomy alone does NOT decompress the orbit.** It only exposes the canthal tendon. Drop in IOP from canthotomy alone is ~14 mmHg. You are not done — the next step is the one that works.',
        citation: [2, 4, 6],
        next: 'lcc-cantholysis',
        summary: 'Crush canthus ~1 min, then cut horizontally ≤2 cm to the rim, skin lifted away from globe. Canthotomy alone ≠ decompression.',
        safetyLevel: 'warning',
    },
    {
        id: 'lcc-cantholysis',
        type: 'info',
        module: 5,
        title: 'Step 2 — Inferior Cantholysis (the decompressing step)',
        body: '📐 [See where to cut — annotated anatomy](#/info/lcc-landmarks)\n\nThis releases the **inferior crus of the lateral canthal tendon** and is what actually drops the pressure (~30 mmHg). This is the structure circled in blue in the teaching image: the inferior limb of the lateral canthal tendon.\n\n**Technique:**\n1. Grasp the **lower lid** at the lateral "last lash" with toothed forceps and pull it **up and out** (toward the ceiling, away from the face) to put the inferior crus on tension\n2. Point the scissors **inferiorly and posteriorly — toward the patient\'s nose, along the lateral orbital rim, away from the globe**\n3. **"Strum" the taut tendon** with the closed scissor tips; it twangs like a plucked guitar string. You will work largely by feel — bleeding usually obscures the white tendon\n4. **Cut the inferior crus** until the lower lid is completely free\n\n**Success sign = the "swinging eyelid":** the lateral lower lid now distracts freely from the globe with no tendon palpable on a forceps tug. A bloodless cut means you are in the correct (avascular) tendon plane; brisk bleeding suggests you are too superior or too deep.\n\n> 🛑 The **#1 failure** is incomplete cantholysis — the tendon is not fully released. If the orbit stays tight, re-explore and finish dividing the inferior crus before doing anything else.',
        citation: [2, 4, 6, 8],
        next: 'lcc-reassess',
        summary: 'Pull lower lid up/out, point scissors toward nose (away from globe), strum & cut inferior crus until lid swings free. ~30 mmHg drop.',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 6: REASSESS & DISPOSITION
    // =====================================================================
    {
        id: 'lcc-reassess',
        type: 'question',
        module: 6,
        title: 'Reassess — Did It Decompress?',
        body: 'Recheck immediately after the inferior cantholysis.\n\n**Endpoints of success:**\n- IOP reduced (target **<40 mmHg**, ideally <30)\n- Softening of the previously rock-hard globe; reduced proptosis\n- Improving visual acuity and resolving RAPD (can begin within minutes)\n- A freely **swinging eyelid**\n\n[IOP target tool](#/calculator/lcc-iop) — recheck the action tier with the new IOP.',
        options: [
            {
                label: 'Decompressed — IOP <40, globe soft, lid swings free',
                description: 'Procedure successful — move to disposition',
                next: 'lcc-disposition',
            },
            {
                label: 'Still tense / IOP high — inferior crus confirmed fully released',
                description: 'Release the superior crus next',
                next: 'lcc-superior-crus',
                urgency: 'critical',
            },
        ],
        citation: [1, 2, 4],
        summary: 'Success = IOP <40 (ideally <30), soft globe, improving VA/RAPD, swinging lid. Still tense → superior crus.',
        safetyLevel: 'warning',
    },
    {
        id: 'lcc-superior-crus',
        type: 'info',
        module: 6,
        title: 'Step 3 — Superior Cantholysis (if still tense)',
        body: 'Only after you have **confirmed the inferior crus is fully released** and the orbit remains tense.\n\n**Technique:** Grasp the **upper lid** laterally with toothed forceps, distract it **away and superiorly** to tension the superior crus, then cut it — staying directed away from the globe.\n\n> ⚠️ The superior region carries the **lacrimal gland, lacrimal artery, and levator aponeurosis** — this is why the superior crus is reserved for persistent OCS, not done routinely: higher bleeding risk and risk of post-procedure ptosis.\n\n**If still not decompressed after both crura are released:** this is refractory OCS — emergent ophthalmology/oculoplastics for OR orbital decompression (septal release / bony decompression). The procedure can also be repeated/extended; medical adjuncts (mannitol, acetazolamide, HOB elevation) are temporizing only.',
        citation: [4, 5, 7],
        next: 'lcc-disposition',
        summary: 'Superior crus only if inferior fully released and still tense. Lacrimal artery/gland + levator superiorly → bleed/ptosis risk. Refractory → OR.',
        safetyLevel: 'warning',
    },
    {
        id: 'lcc-disposition',
        type: 'result',
        module: 6,
        title: 'Disposition & Aftercare',
        body: 'The eye is decompressed. Now coordinate definitive care — **but the ophthalmology consult runs parallel to, never before, the procedure.**',
        recommendation: '**Disposition:**\n• **Emergent ophthalmology / oculoplastics** consult (EM success rates are comparable to ophthalmology — do not wait for them to perform it)\n• **CT orbit AFTER decompression** to characterize fractures and associated injury — never a reason to have waited\n• The **lid does not need immediate repair** — lateral canthal reconstruction / tarsal strip is done later by ophthalmology with good cosmetic and functional results\n• Admit for serial exams: monitor for re-accumulation, recurrent pressure rise, associated globe/retinal injury\n• If OCS recurs or persists → reassess, complete any unreleased crus, and escalate to OR\n\n**Things that do NOT replace decompression:** topical IOP drops, mannitol, acetazolamide, steroids — adjuncts only.\n\n**Document:** time of onset, time of decompression, pre/post IOP and visual acuity, RAPD status, which crura were released.',
        confidence: 'definitive',
        citation: [1, 4, 5, 7],
        summary: 'Ophtho parallel (not before), CT after, lid repair deferred, admit for serial exams. Adjuncts don\'t replace decompression.',
    },
];
export const LATERAL_CANTHOTOMY_NODE_COUNT = LATERAL_CANTHOTOMY_NODES.length;
