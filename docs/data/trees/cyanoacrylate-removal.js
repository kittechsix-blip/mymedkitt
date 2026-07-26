// MedKitt — Cyanoacrylate (Super Glue) Eyelid + Skin Removal (Procedures: Eye / Wound)
//
// Cyanoacrylate eye/eyelid exposure ("adhesive tarsorrhaphy") is rising because
// glue bottles resemble eyedrop bottles. Patients present with eyelids glued
// shut and high anxiety. The wrong move — forceful manual separation or acetone
// near the eye — risks lid/corneal injury. The right approach is simple, safe,
// and reassuring: topical anesthetic + gentle hook/ointment-dwell for lids;
// petroleum/oil for skin; NEVER acetone near the eye; most self-resolves.
//
// IMAGES: an optional diagram of hook insertion through the lid fissure could
// help; no image is embedded. Any image requires Andy's approval per project rule.
export const CYANOACRYLATE_REMOVAL_NODES = [
    // ============================================================
    // Module 1 — Triage Location
    // ============================================================
    {
        id: 'cya-start',
        type: 'info',
        module: 1,
        title: 'Super Glue (Cyanoacrylate) Removal \u2014 Eye / Eyelid / Skin',
        body: 'Cyanoacrylate exposure is alarming but usually benign. **Two rules: NEVER use acetone near the eye, and NEVER force glued eyelids apart \u2014 both cause injury. Most exposures self-resolve without intervention \u2014 but tell the patient it takes days, not hours (typically 1\u20134 days for lids, longer in some series).**\n\nTools (open first):\n- [Procedure Steps Summary](#/info/cya-steps)\n- [Eye vs Eyelid vs Skin Triage Card](#/info/cya-triage)\n- [Topical Anesthetic Options](#/info/cya-anesthetic)\n- [Fluorescein / Corneal-Abrasion Check](#/info/cya-fluorescein)\n- [Do-NOT: Acetone Near Eye](#/info/cya-stop)',
        citation: [1, 2],
        next: 'cya-triage',
        summary: 'Never acetone near eye, never force lids; most cyanoacrylate exposures self-resolve.',
        safetyLevel: 'critical',
    },
    {
        id: 'cya-triage',
        type: 'question',
        module: 1,
        title: 'Where Is the Glue?',
        body: 'Location determines the technique. Use the [Eye vs Eyelid vs Skin Triage Card](#/info/cya-triage) to sort it out.',
        options: [
            {
                label: 'Eyelids glued shut (lid skin / lashes)',
                description: 'Lids stuck together or lashes matted, but the eye can likely open under the glue. Most common presentation.',
                next: 'cya-globe-check',
                urgency: 'urgent',
            },
            {
                label: 'Glue on the ocular surface / suspect true instillation',
                description: 'Patient instilled glue thinking it was eyedrops, foreign-body sensation, glue fragments on cornea/conjunctiva.',
                next: 'cya-globe-check',
                urgency: 'urgent',
            },
            {
                label: 'Skin only (fingers, lips, other skin)',
                description: 'No eye involvement \u2014 simple skin de-adhesion.',
                next: 'cya-skin',
                urgency: 'routine',
            },
        ],
        citation: [1, 2],
        summary: 'Sort: eyelid-glued vs ocular-surface vs skin-only; eye involvement needs globe assessment.',
    },
    {
        id: 'cya-globe-check',
        type: 'info',
        module: 1,
        title: 'Rule Out Globe Injury First',
        body: 'Before any manipulation around the eye:\n- Assess visual acuity (each eye, best you can with lids involved)\n- Look for signs of globe injury or true corneal involvement; cyanoacrylate hardens fast and usually sits ON the surface rather than penetrating, but hardened fragments can cause corneal abrasion\n- If there is any suspicion of open-globe or significant ocular trauma, treat per [Ocular Trauma](#/tree/ocular-trauma) / [Globe Rupture](#/tree/globe-rupture) and consult ophthalmology before manipulating\n\nIf no globe injury, proceed to the appropriate de-adhesion technique.',
        citation: [2, 3],
        next: 'cya-eyelid',
        summary: 'Check acuity + rule out globe injury before manipulation; ophtho if trauma suspected.',
        safetyLevel: 'warning',
    },
    // ============================================================
    // Module 2 — De-adhesion Technique
    // ============================================================
    {
        id: 'cya-eyelid',
        type: 'question',
        module: 2,
        title: 'Eyelid De-adhesion \u2014 Choose Approach',
        body: 'For glued lids, two safe, evidence-described approaches. **Do not force the lids apart with traction.** Apply topical anesthetic first ([Topical Anesthetic Options](#/info/cya-anesthetic)).',
        options: [
            {
                label: 'Antibiotic-ointment dwell (passive, reassuring)',
                description: 'Apply erythromycin or bacitracin ophthalmic ointment liberally along the glued lid margin. It lubricates and protects the cornea rather than dissolving the glue; lids separate as lashes shed, typically over 1\u20134 days (sometimes up to a week). Best for stable patients who can wait.',
                next: 'cya-eyelid-ointment',
                urgency: 'routine',
            },
            {
                label: 'Hook technique (gentle, active)',
                description: 'After topical anesthetic, gently pass a smooth instrument (e.g., a muscle/Jameson hook or a moistened cotton swab) through any small gap in the lid fissure and gently roll/lift to peel glued lashes apart \u2014 NO forceful traction.',
                next: 'cya-eyelid-hook',
                urgency: 'urgent',
            },
        ],
        citation: [1, 4],
        summary: 'Eyelids: antibiotic-ointment dwell (passive) or gentle hook technique; never force apart.',
        safetyLevel: 'warning',
    },
    {
        id: 'cya-eyelid-ointment',
        type: 'info',
        module: 2,
        title: 'Antibiotic-Ointment Dwell',
        body: '1. Instill topical anesthetic for comfort.\n2. Apply [Bacitracin](#/drug/bacitracin/eyelid glue removal) or erythromycin ophthalmic ointment generously along and into the glued lid margin/lashes.\n3. Have the patient reapply every few hours.\n\n\u26a0\ufe0f **Mechanism honesty:** ointment does **NOT** dissolve cyanoacrylate. In vitro, bacitracin, K-Y jelly, baby shampoo, and water were all no better than control; only acetone dissolved the polymer, and acetone is contraindicated near the eye. [6] Ointment works by **lubricating the lid margin, protecting the cornea, and letting normal lash shedding and epithelial turnover release the bond.**\n\n4. **Expected time course:** first-aid guidance quotes 1\u20134 days, but controlled/observational data run longer \u2014 mean \u22486 days in vitro-correlated series and a mean of 8.5 days (range 5\u201312) in a pediatric series. Set expectations accordingly so the patient does not return frustrated on day 2.\n5. Do not pull. As the bond loosens, lashes release; trim any persistently glued lashes with scissors rather than yanking.\n6. \ud83d\udeab **Never apply cotton or wool to wet/uncured adhesive** \u2014 cyanoacrylate reacts exothermically with cotton fibers and causes thermal burns.\n7. Recheck the cornea once the lids open (next step).',
        citation: [1, 4, 6],
        next: 'cya-reassess',
        summary: 'Ointment lubricates (does NOT dissolve glue); lids release over 1\u20134 d up to ~1 wk; trim, don\u2019t pull; no cotton on wet glue.',
    },
    {
        id: 'cya-eyelid-hook',
        type: 'info',
        module: 2,
        title: 'Gentle Hook Technique',
        body: '1. Topical anesthetic first.\n2. Identify any small gap in the lid fissure.\n3. Gently introduce a smooth blunt instrument (muscle/Jameson hook or moistened swab) and roll/lift to free glued lashes a few at a time. Lubricate with ophthalmic ointment to ease release.\n4. **No forceful traction at any point** \u2014 if it does not release easily, switch to the ointment-dwell approach and let time do the work.\n5. Trim stubborn glued lashes with scissors rather than pulling.\n6. Recheck the cornea once open.',
        citation: [4],
        next: 'cya-reassess',
        summary: 'Gentle hook/swap through fissure gap, free lashes a few at a time; never force; trim stubborn lashes.',
        safetyLevel: 'warning',
    },
    {
        id: 'cya-skin',
        type: 'info',
        module: 2,
        title: 'Skin-Only De-adhesion',
        body: 'For glue on fingers, lips, or other non-ocular skin:\n1. Soak in warm soapy water.\n2. Apply a petroleum-based product (petrolatum, mineral oil, or a petroleum-based hand cleaner) and gently roll the skin apart \u2014 do not rip glued skin surfaces apart.\n3. Acetone may be used for skin AWAY from the eye and mucous membranes, but petroleum is gentler and preferred; never use acetone near the eye, lips margins, or mucosa.\n4. Glued lips: warm water + gentle peeling from inside the mouth; reassure that the bond releases.\n5. \ud83d\udeab **Never use cotton, wool, gauze with cotton fill, or cotton clothing on wet/uncured adhesive** \u2014 cyanoacrylate polymerizes exothermically on contact with cotton fibers and can cause a thermal burn. [5]\n6. Most skin bonds release within minutes to hours.',
        citation: [2, 5],
        next: 'cya-reassess',
        summary: 'Skin: warm soapy soak + petroleum, roll apart gently; acetone only far from eye/mucosa.',
    },
    // ============================================================
    // Module 3 — Reassess + Disposition
    // ============================================================
    {
        id: 'cya-reassess',
        type: 'info',
        module: 3,
        title: 'Recheck Cornea + Reassure',
        body: 'Once the eye is accessible:\n- Perform a [Fluorescein / Corneal-Abrasion Check](#/info/cya-fluorescein); hardened glue fragments can cause corneal abrasion.\n- Treat any abrasion per standard care (topical antibiotic, analgesia, ophthalmology follow-up; do NOT patch if contact-lens-related risk or as per local practice).\n- Remove loose glue fragments from the conjunctival surface gently; do not chase well-adhered fragments \u2014 they slough over days.\n- Reassure: residual glue on the ocular surface typically self-detaches over hours to days; forcing it off causes more harm than leaving it.',
        citation: [2, 3],
        next: 'cya-dispo',
        summary: 'Fluorescein-check for abrasion, treat if present; remove only loose fragments; reassure self-resolution.',
        safetyLevel: 'warning',
    },
    {
        id: 'cya-dispo',
        type: 'result',
        module: 3,
        title: 'Disposition + Note',
        body: 'Disposition:\n- **Discharge** most patients once lids are open / skin freed and the cornea is intact or has a small abrasion managed routinely.\n- **Ophthalmology referral** for: corneal abrasion needing follow-up, retained adherent ocular-surface glue causing symptoms, or any concern for globe injury.\n- Return precautions: worsening pain, vision change, photophobia, discharge, or signs of infection.\n\n**Note template:**\n**Exposure:** Cyanoacrylate to [eyelids / ocular surface / skin], mechanism [mistaken for eyedrops / other].\n**Globe:** Visual acuity [OD/OS]; no open-globe signs; fluorescein [negative / abrasion managed].\n**Technique:** [Antibiotic-ointment dwell / gentle hook / skin petroleum soak]; no forceful traction; no acetone near eye.\n**Disposition:** Discharged with reassurance + return precautions; [ophthalmology follow-up if indicated].',
        recommendation: 'Discharge once lids open + cornea intact; ophthalmology for abrasion/retained glue/globe concern.',
        confidence: 'recommended',
        citation: [2, 3],
        summary: 'Discharge most w/ reassurance; ophtho for abrasion/retained glue/globe concern.',
    },
];
export const CYANOACRYLATE_REMOVAL_CRITICAL_ACTIONS = [
    { text: 'NEVER use acetone near the eye, lid margins, or mucous membranes \u2014 it causes chemical injury.', nodeId: 'cya-start' },
    { text: 'NEVER force glued eyelids apart with traction \u2014 it tears lid skin and can injure the cornea.', nodeId: 'cya-eyelid' },
    { text: 'Rule out globe injury and check visual acuity before any periocular manipulation.', nodeId: 'cya-globe-check' },
    { text: 'Use ophthalmic ointment dwell or a gentle hook to release lashes; trim stubborn lashes rather than pulling. Ointment lubricates \u2014 it does not dissolve the glue.', nodeId: 'cya-eyelid-ointment' },
    { text: 'NEVER apply cotton or wool to wet/uncured cyanoacrylate \u2014 the exothermic reaction causes thermal burns.', nodeId: 'cya-skin' },
    { text: 'Fluorescein-check the cornea after de-adhesion; residual ocular-surface glue self-detaches over days \u2014 don\u2019t force it.', nodeId: 'cya-reassess' },
];
export const CYANOACRYLATE_REMOVAL_CITATIONS = [
    { num: 1, text: 'McLean CJ. Ocular superglue injury. J Accid Emerg Med. 1997;14(1):40-41. PMID 9023623.' },
    { num: 2, text: 'EMRA. The Superglued Eye: management of ocular cyanoacrylate exposure. emra.org.' },
    { num: 3, text: 'Roberts JR, Custalow CB, Thomsen TW. Roberts and Hedges\u2019 Clinical Procedures in Emergency Medicine and Acute Care \u2014 ophthalmologic procedures (domain comparator only).' },
    { num: 4, text: 'Jijelava K, Le H, Parker J, Yee J. Getting Hooked: A Simple Technique for the Treatment of Adhesive Injuries to the Eyelids. J Emerg Med. 2017;52(1):74-76. PMID 27745915.' },
    { num: 5, text: 'Carstairs SD, Koh C, Qian L, et al. Sticky situations: cyanoacrylate exposures reported to a poison control system. Clin Toxicol (Phila). 2017;55(9):1001-1003. PMID 28535077.' },
    { num: 6, text: 'Prouty H, Adams DS, Heard K. Treatment of cyanoacrylate adhesive ocular exposure: an in vitro study. Cutan Ocul Toxicol. 2008;27(1):11-14. PMID 18330829. (No treatment except acetone outperformed control for dissolution.)' },
];
export const CYANOACRYLATE_REMOVAL_NODE_COUNT = CYANOACRYLATE_REMOVAL_NODES.length;
export const CYANOACRYLATE_REMOVAL_MODULE_LABELS = ['Triage Location', 'De-adhesion Technique', 'Reassess + Disposition'];
