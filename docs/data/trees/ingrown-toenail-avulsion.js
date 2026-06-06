// MedKitt — Ingrown Toenail: Partial Nail Avulsion + Phenol Matrixectomy (Procedures)
//
// High-frequency ED/urgent-care minor procedure. The teaching gap this consult
// closes: most EM clinicians do avulsion ALONE and skip phenol matrixectomy, the
// step that drops recurrence from ~10% (avulsion only) to ~1.4% (avulsion +
// phenol). Tree walks: assess/select → digital block → tourniquet → partial
// avulsion → phenol vs avulsion-only decision → phenol timing/neutralization →
// dressing/aftercare.
//
// IMAGES: lateral nail-fold anatomy + avulsion-line diagram and phenol
// application-zone diagram are the planned anatomical references. Image hooks are
// intentionally OMITTED pending Andy's explicit approval per project image rule
// (CLAUDE.md). When approved, attach a NodeImage array to `itn-anatomy` and
// `itn-phenol` and add the files + MANIFEST.json in the same commit.
export const INGROWN_TOENAIL_AVULSION_NODES = [
    // ============================================================
    // Module 1 — Assess + Select
    // ============================================================
    {
        id: 'itn-start',
        type: 'info',
        module: 1,
        title: 'Ingrown Toenail — Avulsion + Phenol Matrixectomy',
        body: 'Definitive bedside management of onychocryptosis. **The high-yield point: partial nail avulsion ALONE recurs ~10%; adding phenol matrixectomy drops recurrence to ~1.4%.** Do the matrix step unless contraindicated.\n\nTools (open first):\n- [Procedure Steps Summary](#/info/itn-steps)\n- [Digital Block Dosing](#/info/itn-block-dosing)\n- [Phenol Contact-Time Checklist](#/info/itn-phenol-timer)\n- [Diabetic / PVD Stop-Check](#/info/itn-vascular-stop)\n- [Aftercare + Return Precautions](#/info/itn-aftercare)',
        citation: [1, 2],
        next: 'itn-assess',
        summary: 'Partial avulsion + phenol = definitive (recurrence ~1.4% vs ~10% avulsion-only).',
        safetyLevel: 'warning',
    },
    {
        id: 'itn-assess',
        type: 'question',
        module: 1,
        title: 'Stage + Vascular Screen',
        body: 'Grade the ingrown nail and screen perfusion before committing to a procedure. Open the [Diabetic / PVD Stop-Check](#/info/itn-vascular-stop) if any vascular concern.',
        options: [
            {
                label: 'Stage 1 — erythema/edema, no granulation or pus',
                description: 'Mild. A trial of conservative care (warm soaks, cotton wisp / dental-floss elevation, proper trimming) is reasonable before a procedure.',
                next: 'itn-conservative',
                urgency: 'routine',
            },
            {
                label: 'Stage 2 — drainage / early granulation tissue',
                description: 'Recurrent or symptomatic. Partial nail avulsion indicated; add phenol unless contraindicated.',
                next: 'itn-vascular-check',
                urgency: 'routine',
            },
            {
                label: 'Stage 3 — chronic granulation / hypertrophic nail fold',
                description: 'Definitive avulsion + phenol matrixectomy is first-line. Granulation regresses after the offending nail edge is removed.',
                next: 'itn-vascular-check',
                urgency: 'routine',
            },
        ],
        citation: [1, 2],
        summary: 'Stage 1 → conservative trial; Stage 2-3 → partial avulsion + phenol.',
    },
    {
        id: 'itn-conservative',
        type: 'result',
        module: 1,
        title: 'Stage 1 — Conservative Trial First',
        body: 'For a first, mild presentation without granulation or infection:\n- Warm soaks 10-20 min BID-TID\n- Lift the lateral nail edge with a wisp of cotton or a strip of dental floss under the corner; replace daily\n- Cut the nail STRAIGHT across, not rounded; do not dig into the corner\n- Wide toe-box footwear\n\nReassess in 1-2 weeks. If no improvement, recurrent, or granulation/infection develops → partial nail avulsion (± phenol).',
        recommendation: 'Conservative care for first mild presentation; escalate to avulsion if recurrent or worsening.',
        confidence: 'recommended',
        citation: [1],
        summary: 'Soaks + cotton/floss elevation + straight trimming; escalate if recurrent or granulating.',
    },
    {
        id: 'itn-vascular-check',
        type: 'question',
        module: 1,
        title: 'Perfusion + Phenol Safety',
        body: 'Phenol is a chemical cautery that depends on local tissue healing. **Poor arterial inflow + phenol = risk of delayed healing or necrosis.** Review the [Diabetic / PVD Stop-Check](#/info/itn-vascular-stop) now.',
        options: [
            {
                label: 'Good perfusion — palpable pulses, brisk cap refill, no diabetes/PVD',
                description: 'Proceed with avulsion + phenol matrixectomy.',
                next: 'itn-block',
                urgency: 'routine',
            },
            {
                label: 'Diabetic / PVD / poor perfusion',
                description: 'Avulsion may still relieve symptoms, but AVOID phenol (impaired healing). Consider podiatry/surgery referral for definitive matrixectomy.',
                next: 'itn-vascular-path',
                urgency: 'urgent',
            },
            {
                label: 'Active cellulitis / spreading infection',
                description: 'Treat infection first; drain abscess if present. Avulsion of the offending spicule is appropriate for source control, but defer phenol.',
                next: 'itn-infection-path',
                urgency: 'urgent',
            },
        ],
        citation: [1, 3],
        safetyLevel: 'critical',
        summary: 'Good perfusion → avulsion + phenol; diabetic/PVD → avulsion only, refer; infection → treat first.',
    },
    {
        id: 'itn-vascular-path',
        type: 'result',
        module: 1,
        title: 'Avulsion Only — Defer Phenol, Refer',
        body: 'In diabetes or peripheral arterial disease, phenol risks delayed healing, ulceration, or necrosis.\n\n- Partial nail avulsion for symptom relief is acceptable for source control\n- Do NOT apply phenol\n- Refer to podiatry/foot-and-ankle surgery for definitive matrixectomy under controlled conditions\n- Optimize glycemic control and document pedal pulses / ABI if vascular disease suspected',
        recommendation: 'Diabetic/PVD: avulsion only, no phenol; refer for definitive matrixectomy.',
        confidence: 'definitive',
        citation: [1, 3],
        safetyLevel: 'critical',
        summary: 'No phenol in diabetic/PVD foot; avulse for relief and refer for definitive care.',
    },
    {
        id: 'itn-infection-path',
        type: 'result',
        module: 1,
        title: 'Infected — Source Control First',
        body: 'With active cellulitis or abscess:\n- Incise/drain any paronychial abscess\n- Avulse the offending lateral nail spicule (this is the source — removing it is often curative for the infection)\n- Oral antibiotics only if cellulitis extends beyond the nail fold (cover skin flora; consider MRSA per local patterns)\n- DEFER phenol until inflammation resolves; reassess for elective matrixectomy if recurrence\n- Tetanus per status; return precautions for spreading infection',
        recommendation: 'Drain + avulse offending spicule for source control; defer phenol until inflammation resolves.',
        confidence: 'recommended',
        citation: [1, 4],
        safetyLevel: 'warning',
        summary: 'Drain abscess, avulse offending spicule, antibiotics if spreading; phenol deferred.',
    },
    // ============================================================
    // Module 2 — Anesthesia + Hemostasis
    // ============================================================
    {
        id: 'itn-block',
        type: 'info',
        module: 2,
        title: 'Step 1 — Digital Block',
        body: 'Achieve complete anesthesia before any cutting. Full dosing in [Digital Block Dosing](#/info/itn-block-dosing).\n\nTechnique (traditional two-injection digital block):\n1. Prep the toe with chlorhexidine.\n2. Insert a 25-27 ga needle at the dorsolateral base of the proximal phalanx; raise a wheal, then advance toward the plantar surface, aspirate, and inject [Lidocaine 1-2% PLAIN](#/drug/lidocaine/digital block) (no epinephrine in traditional teaching — see dosing page for the modern nuance).\n3. Repeat on the contralateral side of the toe base.\n4. Wait 5-10 minutes for full onset; test before incising.\n\n**Max lidocaine plain ~4.5 mg/kg.** Use the smallest effective volume (typically 2-4 mL total for a digital block).',
        citation: [4, 5],
        next: 'itn-tourniquet',
        summary: 'Two-point digital block, lidocaine plain, wait 5-10 min, test before cutting.',
        safetyLevel: 'warning',
    },
    {
        id: 'itn-tourniquet',
        type: 'info',
        module: 2,
        title: 'Step 2 — Tourniquet (Bloodless Field)',
        body: 'Phenol is INACTIVATED by blood and tissue fluid — a bloodless field is mandatory for an effective matrixectomy.\n\n1. After the block is fully set, apply a digital tourniquet at the base of the toe (a sterile Penrose drain, a cut surgical glove finger, or a commercial digital tourniquet).\n2. **Set a visible timer the moment the tourniquet goes on.** Document the time.\n3. Keep total tourniquet time well under 15-20 minutes; never leave it on after the patient departs.\n\n**Single most common digital-tourniquet error: forgetting to remove it.** Write the on-time on the chart and on a piece of tape on the patient where you will see it.',
        citation: [5, 6],
        next: 'itn-avulse',
        summary: 'Digital tourniquet for bloodless field (phenol needs it); timer on, remove <15-20 min.',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 3 — Avulsion + Matrixectomy
    // ============================================================
    {
        id: 'itn-anatomy',
        type: 'info',
        module: 3,
        title: 'Anatomy — Lateral Nail Fold + Matrix',
        body: 'Key structures for a partial avulsion:\n- **Lateral nail fold** — the soft-tissue groove where the offending nail edge digs in\n- **Nail plate** — the visible nail; you remove only the offending lateral 3-5 mm strip, NOT the whole nail\n- **Germinal matrix** — sits PROXIMAL, under the proximal nail fold (eponychium). This is the tissue phenol must ablate to prevent regrowth of the spicule. It extends ~5 mm proximal to the visible cuticle.\n- **Lateral horn of the matrix** — the corner the phenol most needs to reach; incomplete ablation here is the usual cause of recurrence.\n\n**[IMAGE PENDING ANDY APPROVAL]** — lateral nail-fold cross-section and avulsion-line diagram are planned for this node; they will land in a follow-up commit once approved per project image rule.',
        citation: [1, 2],
        next: 'itn-avulse',
        summary: 'Remove only the offending lateral strip; matrix (esp. lateral horn) is the phenol target.',
    },
    {
        id: 'itn-avulse',
        type: 'info',
        module: 3,
        title: 'Step 3 — Partial Nail Avulsion',
        body: '1. With the field bloodless, slide a Freer elevator (or a small hemostat) under the offending lateral edge of the nail plate to free it from the nail bed and from the proximal nail fold.\n2. Cut a longitudinal strip ~3-5 mm wide from the lateral nail using an English nail splitter or straight scissors, advancing PROXIMALLY all the way under the eponychium to the matrix. The cut must reach the proximal-most extent of that nail strip.\n3. Grasp the freed strip with a hemostat and remove it with a steady proximal-and-rotational pull. Confirm you removed a complete strip including its proximal corner — a retained proximal spicule is a guaranteed recurrence.\n4. Curette/debride any granulation tissue in the lateral fold.\n\nReview [Anatomy](#/node/itn-anatomy) if unsure where the strip ends proximally.',
        citation: [1, 2],
        next: 'itn-phenol-decision',
        summary: 'Free + cut a 3-5 mm lateral strip proximally to the matrix; remove whole strip incl. corner.',
        safetyLevel: 'warning',
    },
    {
        id: 'itn-phenol-decision',
        type: 'question',
        module: 3,
        title: 'Phenol Matrixectomy — Do It?',
        body: 'The avulsion relieves today\'s pain; **phenol prevents the bounceback.** With a clean bloodless field and good perfusion, ablate the matrix.',
        options: [
            {
                label: 'Yes — perform phenol matrixectomy',
                description: 'Good perfusion, no diabetes/PVD, bloodless field achieved. Recurrence ~1.4%.',
                next: 'itn-phenol',
                urgency: 'routine',
            },
            {
                label: 'No — avulsion only (contraindication)',
                description: 'Diabetic/PVD, active infection, or unable to achieve a bloodless field. Recurrence ~10%; counsel and arrange follow-up.',
                next: 'itn-avulsion-only',
            },
        ],
        citation: [1, 2],
        summary: 'Phenol if perfusion good + bloodless field; otherwise avulsion-only with recurrence counseling.',
    },
    {
        id: 'itn-phenol',
        type: 'info',
        module: 3,
        title: 'Step 4 — Phenol Matrixectomy',
        body: 'Phenol (~88% liquified) chemically ablates the germinal matrix. **Protect surrounding skin and respect contact time** — full protocol in [Phenol Contact-Time Checklist](#/info/itn-phenol-timer).\n\n1. Ensure the field is dry and bloodless (phenol is neutralized by blood).\n2. Protect the perionychium: apply petrolatum to the surrounding skin so phenol only contacts the matrix groove.\n3. Using a tightly-wound cotton-tipped applicator, apply phenol to the exposed lateral matrix (especially the lateral horn) for **three 30-second applications** (≈90 s total), or per your protocol (30-60-90 s ranges are described). Roll the applicator firmly into the matrix groove.\n4. **Neutralize immediately** with copious isopropyl alcohol (or sterile saline) flush after each/the final application to stop ongoing burn.\n\n**[IMAGE PENDING ANDY APPROVAL]** — a phenol application-zone diagram is planned here pending approval per project image rule.',
        citation: [1, 2, 7],
        next: 'itn-dressing',
        summary: 'Protect skin w/ petrolatum; phenol to matrix 3×30 s; neutralize w/ isopropyl alcohol.',
        safetyLevel: 'critical',
    },
    {
        id: 'itn-avulsion-only',
        type: 'info',
        module: 3,
        title: 'Avulsion Only — Counsel Recurrence',
        body: 'No phenol applied. The lateral strip is removed for symptom relief but the matrix is intact, so the spicule can regrow.\n\n- Recurrence ~10% (vs ~1.4% with phenol)\n- Counsel the patient explicitly that the nail may grow back ingrown\n- Arrange podiatry/surgery follow-up for definitive matrixectomy if it recurs\n- Proceed to dressing + aftercare',
        citation: [1, 2],
        next: 'itn-dressing',
        summary: 'Avulsion-only: ~10% recurrence; counsel and arrange definitive-care follow-up.',
    },
    // ============================================================
    // Module 4 — Dressing, Tourniquet Off, Aftercare
    // ============================================================
    {
        id: 'itn-dressing',
        type: 'info',
        module: 4,
        title: 'Step 5 — Tourniquet Off + Dressing',
        body: '1. **REMOVE THE DIGITAL TOURNIQUET NOW.** Confirm brisk capillary refill returns to the toe before dressing. Document removal time.\n2. Apply a non-adherent dressing (petrolatum gauze or bacitracin-impregnated gauze) over the nail fold.\n3. Apply a bulky absorbent toe dressing; tube gauze or a loose wrap. Avoid circumferential tightness.\n4. Tetanus prophylaxis per status.\n\nHand off the [Aftercare + Return Precautions](#/info/itn-aftercare) sheet.',
        citation: [4, 6],
        next: 'itn-doc',
        summary: 'Remove tourniquet + confirm reperfusion; non-adherent dressing; tetanus; give aftercare sheet.',
        safetyLevel: 'critical',
    },
    {
        id: 'itn-doc',
        type: 'result',
        module: 4,
        title: 'Procedure Note Template',
        body: '**Procedure:** Partial nail avulsion, [right/left] [great/—] toe, [lateral/medial] border [± phenol matrixectomy].\n**Indication:** Stage [1/2/3] onychocryptosis [recurrent / with granulation / infected].\n**Consent:** Risks of bleeding, infection, recurrence, delayed healing, and (if phenol) chemical burn discussed; patient agrees.\n**Anesthesia:** Digital block with lidocaine [1/2]% plain, [X] mL, full anesthesia confirmed.\n**Tourniquet:** Digital tourniquet on at [time], off at [time], reperfusion confirmed.\n**Avulsion:** ~3-5 mm lateral strip removed proximally to the matrix; complete strip including proximal corner removed; granulation curetted.\n**Matrixectomy:** [Phenol 3×30 s to lateral matrix, neutralized with isopropyl alcohol / Not performed — contraindication: ____].\n**Dressing:** Non-adherent + bulky toe wrap. Tetanus [up to date / given].\n**Disposition:** Discharged with aftercare; follow-up [PCP/podiatry] in [X] days.',
        recommendation: 'Document stage, anesthesia, tourniquet on/off times, strip completeness, phenol details, dispo.',
        confidence: 'definitive',
        citation: [2],
        summary: 'Note must capture stage, block, tourniquet on/off, strip completeness, phenol detail, dispo.',
    },
];
export const INGROWN_TOENAIL_AVULSION_CRITICAL_ACTIONS = [
    { text: 'Screen perfusion BEFORE phenol — avoid phenol in diabetes/PVD/poor perfusion (delayed healing/necrosis).', nodeId: 'itn-vascular-check' },
    { text: 'Phenol is inactivated by blood — a digital tourniquet / bloodless field is mandatory for matrixectomy.', nodeId: 'itn-tourniquet' },
    { text: 'Remove the entire lateral nail strip including its proximal corner — a retained spicule guarantees recurrence.', nodeId: 'itn-avulse' },
    { text: 'Protect surrounding skin with petrolatum and neutralize phenol with isopropyl alcohol to limit chemical burn.', nodeId: 'itn-phenol' },
    { text: 'REMOVE the digital tourniquet and confirm reperfusion before dressing — never leave it on at discharge.', nodeId: 'itn-dressing' },
];
export const INGROWN_TOENAIL_AVULSION_CITATIONS = [
    { num: 1, text: 'Mayeaux EJ Jr, Carter C, Murphy TE. Ingrown Toenail Management. Am Fam Physician. 2019;100(3):158-164.' },
    { num: 2, text: 'Royal Australian College of General Practitioners (RACGP) HANDI. Partial nail avulsion and matricectomy (phenolisation) for ingrown toenail. RACGP HANDI intervention summary.' },
    { num: 3, text: 'Khunger N, Kandhari R. Ingrown toenails. Indian J Dermatol Venereol Leprol. 2012;78(3):279-289.' },
    { num: 4, text: 'Heidelbaugh JJ, Lee H. Management of the ingrown toenail. Am Fam Physician. 2009;79(4):303-308.' },
    { num: 5, text: 'Roberts JR, Custalow CB, Thomsen TW. Roberts and Hedges\u2019 Clinical Procedures in Emergency Medicine and Acute Care. (Digital block + nail procedures — used as domain comparator only.)' },
    { num: 6, text: 'Eekhof JAH, Van Wijk B, Knuistingh Neven A, van der Wouden JC. Interventions for ingrowing toenails. Cochrane Database Syst Rev. 2012;(4):CD001541.' },
    { num: 7, text: 'Comparative analysis of partial nail avulsion with vs without phenolization, recurrence outcomes. PMC12147675 (2024).' },
];
export const INGROWN_TOENAIL_AVULSION_NODE_COUNT = INGROWN_TOENAIL_AVULSION_NODES.length;
export const INGROWN_TOENAIL_AVULSION_MODULE_LABELS = ['Assess + Select', 'Anesthesia + Hemostasis', 'Avulsion + Matrixectomy', 'Aftercare'];
