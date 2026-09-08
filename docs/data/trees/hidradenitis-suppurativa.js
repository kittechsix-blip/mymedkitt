// MedKitt — Hidradenitis Suppurativa Consult
// Recognize → Differential & Red Flags → Stage & Score → Acute Flare → Medical Ladder → Comorbidities → Disposition
// 7 modules, 26 nodes total.
// Evidence: Okun JEM 2022 (ED review); Alikhan JAAD 2019 Parts I-II (North American guidelines);
// Alhusayen JAAD 2025 (special populations); Zouboulis JEADV 2025 (European S2k Part 2);
// Zouboulis BJD 2017 (IHS4); FDA labels for adalimumab, secukinumab, bimekizumab.
export const HIDRADENITIS_SUPPURATIVA_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNIZE IT
    // =====================================================================
    {
        id: 'hs-start',
        type: 'info',
        module: 1,
        title: 'Hidradenitis Suppurativa: Recognize It',
        body: '[HS Steps Summary](#/info/hs-summary) — one-screen checklist for the whole consult.\n\n**The patient back for the fifth "recurrent abscess" I&D in the same skin fold does not have a recurrent abscess. They have hidradenitis suppurativa (HS)** — a chronic inflammatory disease of the folliculopilosebaceous unit, not a primary infection. Average delay from onset to diagnosis is 7–10 years, and most of those years are spent in emergency departments being drained.\n\nHS affects about 1% of the population, women 3:1, onset after puberty (peak 20s–30s), with strong links to smoking and obesity. Every I&D that is not paired with the diagnosis and a dermatology referral commits the patient to another decade of the same visit.',
        images: [
            { src: 'images/hidradenitis-suppurativa/hs-nodules.jpg', alt: 'Cluster of inflamed hidradenitis suppurativa nodules on skin', caption: 'Inflamed HS nodules — the recurring, painful deep nodule is the earliest lesion. HidradenitisAwareness, CC BY-SA 4.0, via Wikimedia Commons.' },
        ],
        citation: [1, 2, 6],
        next: 'hs-criteria',
        summary: 'Recurrent abscesses in the same skin fold = HS until proven otherwise; average 7–10 year diagnostic delay',
        safetyLevel: 'warning',
    },
    {
        id: 'hs-criteria',
        type: 'question',
        module: 1,
        title: 'Three Diagnostic Criteria — All Present?',
        body: 'The diagnosis is clinical. **All three** are required:\n\n**1. Typical lesions** — painful deep-seated nodules, abscesses, draining sinus tracts (tunnels), double-headed ("tombstone") comedones, rope-like hypertrophic scars.\n\n**2. Typical sites** — axillae, inguinal and genitofemoral folds, inframammary and intermammary skin, perineum, perianal and gluteal skin. Hair-bearing, apocrine-rich, friction-prone folds.\n\n**3. Chronicity and recurrence** — **two or more flares in 6 months**, or persistent lesions.\n\nAsk directly: "How many times has this happened? Where else do you get these?" Examine every fold, not just the one that hurts today.',
        images: [
            { src: 'images/hidradenitis-suppurativa/hs-hurley-ii-axilla.jpg', alt: 'Hidradenitis suppurativa Hurley stage II in the axilla with nodules, sinus tracts and scarring', caption: 'Hurley stage II disease in the axilla — recurrent nodules with tunnels and scarring. Alharbi Z, Kauczok J, Pallua N, BMC Dermatology 2012, CC BY 2.5, via Wikimedia Commons.' },
        ],
        options: [
            {
                label: 'Yes — typical lesions, typical sites, ≥2 flares in 6 months',
                description: 'HS confirmed clinically',
                next: 'hs-redflags',
            },
            {
                label: 'Typical lesion and site, but first episode or only one prior',
                description: 'Probable early HS — cannot yet meet the chronicity criterion',
                next: 'hs-possible-early',
            },
            {
                label: 'No — atypical lesion, site, or pattern',
                description: 'Work the differential',
                next: 'hs-ddx',
            },
        ],
        citation: [1, 2, 5],
        summary: 'Typical lesions + typical sites + ≥2 flares in 6 months = HS',
    },
    {
        id: 'hs-possible-early',
        type: 'info',
        module: 1,
        title: 'Probable Early HS',
        body: 'A single abscess in an axilla or groin is usually just an abscess — but a second one in a skin fold, comedones or scarring nearby, a family history (about one-third have an affected relative), smoking, obesity, or onset in adolescence all raise the odds.\n\n**Treat today\'s lesion**, then do the two things that shorten the diagnostic delay:\n• **Document "possible hidradenitis suppurativa"** in the chart and discharge paperwork so the next clinician sees it\n• **Refer to dermatology or primary care** for follow-up rather than "return if it comes back"\n\nEarly, Hurley I disease responds to topical and oral therapy that the patient will never be offered if every visit ends with an I&D and no diagnosis.',
        citation: [1, 2, 7],
        next: 'hs-redflags',
        summary: 'Second fold abscess, family history, or comedones = document "possible HS" and refer',
    },
    // =====================================================================
    // MODULE 2: DIFFERENTIAL & RED FLAGS
    // =====================================================================
    {
        id: 'hs-redflags',
        type: 'question',
        module: 2,
        title: 'Red Flags — Sick Patient or Something Else?',
        body: 'HS itself rarely makes a patient systemically ill. **Fever, tachycardia, hypotension, or pain out of proportion in a perineal or gluteal patient is a different disease until proven otherwise.**\n\n**Fournier gangrene / necrotizing infection:** perineal or genital disease with systemic toxicity, pain out of proportion to the exam, rapid spread over hours, crepitus, dusky or bullous skin, dishwater drainage. HS patients with chronic perineal tunnels are at elevated risk and the chronic scarring hides early changes.\n\n**Squamous cell carcinoma:** a chronic non-healing ulcer, an indurated or verrucous mass, or a lesion that has "changed character" in long-standing (10+ years) Hurley III gluteal or perineal disease — SCC arises in about 1–4% of severe cases, mostly men, and is often diagnosed late and fatal.',
        options: [
            {
                label: 'Systemic toxicity, pain out of proportion, crepitus, or rapid spread',
                description: 'Necrotizing infection / Fournier pathway — time-critical',
                next: 'hs-fournier',
                urgency: 'critical',
            },
            {
                label: 'Chronic non-healing ulcer or new mass in long-standing Hurley III',
                description: 'Squamous cell carcinoma until biopsied',
                next: 'hs-scc',
                urgency: 'urgent',
            },
            {
                label: 'Neither — well-appearing, disease confined to the folds',
                next: 'hs-ddx',
            },
        ],
        citation: [1, 2, 6],
        summary: 'Toxic perineal patient = Fournier until proven otherwise; chronic ulcer in Hurley III = SCC until biopsied',
        safetyLevel: 'critical',
    },
    {
        id: 'hs-fournier',
        type: 'info',
        module: 2,
        title: 'Fournier / Necrotizing Infection — Treat as NSTI',
        body: 'Manage per [Necrotizing Fasciitis](#/tree/necrotizing-fasciitis) — this card only covers what is different in the HS patient.\n\n• **Emergent surgical consult** (general surgery or urology for genital involvement) — the diagnosis is made in the OR, not on CT\n• **Broad-spectrum IV antibiotics within 1 hour** including anaerobic and MRSA coverage; add clindamycin for toxin suppression\n• **Resuscitate** per [Sepsis](#/tree/sepsis); lactate, CBC, BMP, glucose, coags, type and screen\n• **CT pelvis with contrast** if it will not delay surgery — looks for gas tracking along fascial planes; a negative CT does not exclude the diagnosis\n\n**LRINEC** is in the toolbar as an adjunct only. Chronic HS inflammation raises CRP and WBC at baseline, so the score is neither sensitive nor specific here — a low score never overrides a concerning exam.\n\nHS patients have the added risk that chronic perineal tunnels and scarring mask early skin changes; examine the whole perineum, scrotum or labia, and gluteal cleft with the patient in lithotomy or lateral position.',
        calculatorLinks: [
            { id: 'lrinec', label: 'LRINEC Score (adjunct only)' },
        ],
        citation: [1, 6],
        next: 'hs-dispo-admit',
        summary: 'Emergent surgery, broad IV antibiotics within 1 h, resuscitate; LRINEC unreliable with chronic HS inflammation',
        safetyLevel: 'critical',
    },
    {
        id: 'hs-scc',
        type: 'info',
        module: 2,
        title: 'Suspected Squamous Cell Carcinoma',
        body: 'Marjolin-type SCC in chronic HS carries a poor prognosis largely because it is diagnosed late — the lesion is assumed to be "just the HS."\n\n**Features that demand biopsy:** ulcer that fails to heal over months, verrucous or exophytic growth, fixed induration, new bleeding, worsening pain in a previously stable area, weight loss, or inguinal lymphadenopathy out of proportion to the surrounding disease.\n\n**In the ED:** do not shave or punch the lesion yourself unless dermatology asks — a superficial biopsy of a chronically inflamed field is often non-diagnostic. Document size, location, and photograph with consent. Arrange **urgent dermatology or surgical oncology referral (within 1–2 weeks)** and make the concern explicit in the discharge paperwork.\n\nThen continue the standard pathway for today\'s inflammatory disease.',
        citation: [1, 2, 6],
        next: 'hs-stage',
        summary: 'Non-healing ulcer or mass in Hurley III = urgent derm/surg-onc referral for biopsy; document and photograph',
        safetyLevel: 'warning',
    },
    {
        id: 'hs-ddx',
        type: 'info',
        module: 2,
        title: 'Differential Diagnosis',
        body: 'Most mimics are separated by **pattern** — HS is bilateral, multi-site, recurrent, and scarred; a mimic is usually solitary, first-time, or in the wrong place.\n\n• **Simple abscess / furunculosis / carbuncle** — solitary, no comedones, no tunnels, no scarring, resolves completely after drainage. Repeated lesions in *different* non-fold sites with positive *S. aureus* cultures favors furunculosis — see [Peds SSTI](#/tree/peds-ssti) for the decolonization protocol.\n• **Cutaneous or perianal Crohn disease** — perianal fistulae, fissures, skin tags, knife-cut ulcers, plus diarrhea, weight loss, or abdominal pain; the two coexist, so ask the GI questions in every perianal HS patient — [IBD Flare](#/tree/ibd-flare).\n• **Pilonidal disease** — midline sacrococcygeal sinus with hair; can coexist with gluteal HS.\n• **Bartholin abscess** — unilateral posterior labial swelling at the 4 or 8 o\'clock position, no comedones or tunnels.\n• **Epidermoid (inclusion) cyst** — solitary, mobile, central punctum, cheesy contents.\n• **Lymphogranuloma venereum / granuloma inguinale** — sexually acquired inguinal buboes or beefy painless ulcers; sexual history and travel; STI testing.\n• **Infected Bartholin, pilonidal, or perianal abscess with systemic toxicity** — go back to the [red flag screen](#/node/hs-redflags).\n\nOther inflammatory folliculitides (acne conglobata, dissecting cellulitis of the scalp, pilonidal disease) travel with HS as the "follicular occlusion tetrad."',
        images: [
            { src: 'images/hidradenitis-suppurativa/hs-lesions.jpg', alt: 'Multiple hidradenitis suppurativa lesions with nodules, scarring and drainage on skin', caption: 'HS lesions — multiple nodules with scarring and drainage; the multi-lesion, scarred pattern separates HS from a solitary abscess. BRI72783, CC BY-SA 4.0, via Wikimedia Commons.' },
        ],
        citation: [1, 2, 6],
        next: 'hs-stage',
        summary: 'Pattern separates HS from mimics: bilateral, recurrent, scarred, in folds; ask GI questions in perianal disease',
    },
    // =====================================================================
    // MODULE 3: STAGE & SCORE
    // =====================================================================
    {
        id: 'hs-stage',
        type: 'question',
        module: 3,
        title: 'Hurley Stage',
        body: 'Staging takes 30 seconds and decides the treatment ladder and how urgently dermatology needs to see the patient. Open **Hurley** in the toolbar to log it.\n\n**Hurley I** — one or more abscesses or nodules, **no** sinus tracts, **no** scarring. Looks like recurrent boils.\n\n**Hurley II** — recurrent abscesses **with** tunnels and scarring, but lesions are separated by normal skin (shown in the axilla image on the criteria card).\n\n**Hurley III** — diffuse or near-diffuse involvement of a whole region with multiple **interconnected** tunnels and abscesses; no normal skin between lesions.\n\nHurley describes the static extent of damage; it does not change flare to flare and does not capture inflammatory activity — that is what IHS4 adds next.',
        images: [
            { src: 'images/hidradenitis-suppurativa/hs-hurley-ii-axilla.jpg', alt: 'Hurley stage II hidradenitis suppurativa of the axilla with separated nodules, tunnels and scars', caption: 'Hurley II — tunnels and scarring with intervening normal skin. Alharbi Z, Kauczok J, Pallua N, BMC Dermatology 2012, CC BY 2.5, via Wikimedia Commons.' },
            { src: 'images/hidradenitis-suppurativa/hs-hurley-iii.jpg', alt: 'Hurley stage III hidradenitis suppurativa with diffuse interconnected tunnels, abscesses and scarring', caption: 'Hurley III — diffuse, interconnected tunnels and scarring with no intervening normal skin. HidradenitisAwareness, CC BY-SA 4.0, via Wikimedia Commons.' },
        ],
        calculatorLinks: [
            { id: 'hs-hurley', label: 'Hurley Stage' },
        ],
        options: [
            {
                label: 'Hurley I — abscesses only, no tunnels or scars',
                next: 'hs-ihs4',
            },
            {
                label: 'Hurley II — tunnels and scars, lesions separated',
                next: 'hs-ihs4',
            },
            {
                label: 'Hurley III — diffuse interconnected tunnels',
                next: 'hs-ihs4',
                urgency: 'urgent',
            },
        ],
        citation: [1, 2, 8],
        summary: 'Hurley I no tunnels/scars; II tunnels + scars, separated; III diffuse interconnected',
    },
    {
        id: 'hs-ihs4',
        type: 'info',
        module: 3,
        title: 'IHS4 — Score Today\'s Inflammatory Activity',
        body: 'The **International HS Severity Score System (IHS4)** counts what is inflamed right now and is the validated dynamic score used to select and follow therapy. Open **IHS4** in the toolbar.\n\n**IHS4 = (nodules × 1) + (abscesses × 2) + (draining tunnels × 4)**\n• **Mild ≤ 3**\n• **Moderate 4–10**\n• **Severe ≥ 11**\n\nCount inflammatory nodules (tender, red, deep), abscesses (fluctuant collections), and draining tunnels (sinus tracts with active discharge) across **all** sites. Scars, comedones, and quiescent tunnels do not count.\n\nRecord Hurley stage and IHS4 in the note — dermatology will use both to decide whether the patient qualifies for a biologic, and it turns a "recurrent abscess" chart into an HS chart.',
        calculatorLinks: [
            { id: 'hs-ihs4', label: 'IHS4 Calculator' },
        ],
        citation: [5, 8],
        next: 'hs-flare',
        summary: 'IHS4 = nodules + 2×abscesses + 4×draining tunnels; mild ≤3, moderate 4–10, severe ≥11',
    },
    // =====================================================================
    // MODULE 4: ACUTE FLARE IN THE ED
    // =====================================================================
    {
        id: 'hs-flare',
        type: 'question',
        module: 4,
        title: 'What Is the Acute Problem Today?',
        body: 'Match the intervention to the lesion. The procedure guide in the toolbar compares each option.',
        options: [
            {
                label: 'Tense, fluctuant abscess',
                description: 'Needs drainage — choose the technique',
                next: 'hs-procedure-choice',
            },
            {
                label: 'Inflamed nodule(s) < 2 cm, not fluctuant',
                description: 'Intralesional steroid, not a scalpel',
                next: 'hs-il-steroid',
            },
            {
                label: 'Spreading cellulitis, fever, immunosuppressed, or atypical pattern',
                description: 'Workup and antibiotics before deciding on a procedure',
                next: 'hs-workup',
                urgency: 'urgent',
            },
            {
                label: 'No acute lesion — chronic pain, drainage, or here for help',
                description: 'Skip to the treatment ladder and referral',
                next: 'hs-ladder',
            },
        ],
        summary: 'Abscess → drain; nodule → intralesional steroid; sick → workup; chronic → ladder',
    },
    {
        id: 'hs-procedure-choice',
        type: 'question',
        module: 4,
        title: 'Drain It — Which Technique?',
        body: '**Simple I&D is a rescue procedure, not treatment.** It relieves the tense abscess but leaves the folliculopilosebaceous unit and the tunnel roof behind, so **recurrence approaches 100%** at the same site. Guidelines recommend it only when a tense fluctuant abscess must be decompressed and nothing better is feasible.\n\n**Punch debridement ("mini-deroofing")** removes the roof of the lesion *and* the inflamed follicular unit with a 5–7 mm punch or by unroofing with scissors or electrocautery, then leaves the cavity open. It takes a few minutes longer, is well within ED scope for a single lesion, and has substantially lower recurrence.\n\n**Formal deroofing or wide excision** of tunnels and whole regions belongs to dermatology or surgery — refer, do not attempt in the ED.\n\nOpen **Procedure** in the toolbar for step-by-step technique.',
        images: [
            { src: 'images/hidradenitis-suppurativa/hs-hurley-ii-abscess.jpg', alt: 'Acne inversa with a tense abscess, Hurley stage II', caption: 'Acne inversa (HS) with an acute abscess, Hurley stage II — the lesion that gets drained. Dr. Thomas Brinkmeier (WIKIDERM), CC BY 4.0, via Wikimedia Commons.' },
        ],
        options: [
            {
                label: 'Punch debridement / mini-deroofing feasible',
                description: 'Single or few accessible lesions, patient tolerates local anesthesia',
                next: 'hs-punch',
            },
            {
                label: 'Simple I&D as rescue only',
                description: 'Tense abscess, unable to do more today',
                next: 'hs-iandd',
            },
        ],
        citation: [1, 2, 14],
        summary: 'I&D = rescue only, recurrence ~100%; punch debridement removes the roof and follicular unit',
    },
    {
        id: 'hs-punch',
        type: 'info',
        module: 4,
        title: 'Punch Debridement / Mini-Deroofing',
        body: '**Anesthesia:** field block with [Lidocaine](#/drug/lidocaine/hidradenitis) 1% with epinephrine (buffered with bicarbonate) or [Bupivacaine](#/drug/bupivacaine/local infiltration) 0.25% for longer post-procedure comfort. Inflamed acidic tissue blunts local anesthetics — inject widely around the lesion, not into it, and wait.\n\n**Technique:**\n1. Prep; identify the lesion and any probe-able tunnel opening\n2. Use a 5–7 mm biopsy punch (or scissors) centered on the lesion to remove the roof and the follicular unit down to the base of the cavity\n3. Explore the cavity with a blunt probe; unroof any short tunnel that communicates\n4. Curette or scrub the gelatinous base; irrigate\n5. **Leave open — no packing.** Apply petrolatum gauze or an absorbent dressing\n\n**Aftercare:** daily showers, non-adherent dressing, no wick changes. Healing by secondary intention over 2–4 weeks.\n\n**Do not culture** routinely — see analgesia and culture rules on the next card.',
        citation: [1, 2, 13, 14],
        next: 'hs-analgesia',
        summary: 'Field block, 5–7 mm punch removes roof + follicular unit, unroof short tunnels, leave open, no packing',
    },
    {
        id: 'hs-iandd',
        type: 'info',
        module: 4,
        title: 'Simple I&D — Rescue Only',
        body: 'Same anesthesia as punch debridement: [Lidocaine](#/drug/lidocaine/hidradenitis) field block, generous and peripheral.\n\n**Technique:** a small linear incision along skin tension lines over the point of maximal fluctuance, express and irrigate. Keep the incision small — every I&D scar becomes part of the tunnel network.\n\n**No packing.** Packing simple abscesses is painful and does not reduce recurrence or treatment failure; in HS it also feeds the tunnels. Non-adherent dressing and daily showers.\n\n**Tell the patient the truth:** this drains the abscess but does not treat the disease, the lesion will likely come back, and the way out is the treatment ladder plus dermatology — [set that up before discharge](#/node/hs-ladder).',
        citation: [1, 2, 13],
        next: 'hs-analgesia',
        summary: 'Small linear incision, no packing, and explicit counseling that I&D does not treat HS',
    },
    {
        id: 'hs-il-steroid',
        type: 'info',
        module: 4,
        title: 'Intralesional Triamcinolone for Inflamed Nodules',
        body: 'An inflamed, non-fluctuant nodule under 2 cm should be **injected, not cut**. Intralesional corticosteroid shrinks the lesion and relieves pain within 24–48 hours and is recommended by both North American and European guidelines for acute flares.\n\n[Triamcinolone acetonide](#/drug/triamcinolone/hidradenitis) **10 mg/mL, about 0.5–1 mL per nodule**, injected with a 27–30 gauge needle into the center of the inflamed lesion until it blanches slightly. Several nodules can be treated in one visit.\n\n• No incision, no dressing, no packing\n• Warn about transient local atrophy or hypopigmentation\n• Not a substitute for systemic therapy — it treats today\'s nodule only\n\nA fluctuant lesion should be drained instead; steroid into a pus-filled cavity does nothing.',
        citation: [2, 3, 5, 12],
        next: 'hs-analgesia',
        summary: 'Triamcinolone 10 mg/mL, 0.5–1 mL into each inflamed nodule <2 cm; drain if fluctuant instead',
    },
    {
        id: 'hs-analgesia',
        type: 'info',
        module: 4,
        title: 'Analgesia, Cultures & Anesthesia Notes',
        body: '**Pain is the dominant symptom** and is under-treated. Multimodal, opioid-sparing:\n• [Ibuprofen](#/drug/ibuprofen/pain adult) or another NSAID scheduled for 3–5 days, plus [Acetaminophen](#/drug/acetaminophen/analgesia)\n• A **short course of opioid (≤3 days)** only for a large drained abscess or extensive Hurley III disease when the above is inadequate; HS patients have high rates of chronic pain and opioid use disorder, so avoid open-ended prescriptions\n• Warm compresses; loose clothing; avoid friction and shaving of the affected fold\n\n**Cultures:** HS lesions are usually **sterile or polymicrobial** with skin and anaerobic flora — a culture rarely changes management. Obtain one only for systemic signs, spreading cellulitis, immunosuppression, or an atypical pattern (solitary non-fold lesion, suspicion of MRSA furunculosis).\n\n**Labs and imaging** (CBC, BMP, lactate, glucose, bedside ultrasound) are for the septic, cellulitic, or Fournier-concern patient — not routine for a flare.',
        citation: [1, 2, 6],
        next: 'hs-ladder',
        summary: 'NSAID + acetaminophen, opioid ≤3 days only if needed; culture only for systemic signs, cellulitis, immunosuppression, or atypical pattern',
    },
    {
        id: 'hs-workup',
        type: 'question',
        module: 4,
        title: 'Systemic Signs or Cellulitis — Workup & Empiric Antibiotics',
        body: 'HS is inflammatory, but secondary bacterial infection happens — and the immunosuppressed patient (biologic, diabetes, HIV) can be truly septic from a "routine" flare.\n\n**Order:** CBC, BMP, glucose (diabetes is a comorbidity and a Fournier risk), lactate if any hemodynamic concern; wound culture from the deepest accessible site; **bedside ultrasound** to find the drainable collection under scar.\n\n**Empiric antibiotics for true secondary infection** (fever, spreading erythema, lymphangitis), covering skin flora and, in perineal disease, anaerobes:\n• [Cephalexin](#/drug/cephalexin/cellulitis) for non-purulent cellulitis around HS lesions\n• [TMP-SMX](#/drug/tmp-smx/mrsa ssti) or doxycycline if purulent or MRSA risk\n• [Amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/hidradenitis) for perianal, perineal, or gluteal disease (anaerobic coverage)\n• Admitted patients: IV [Clindamycin](#/drug/clindamycin/hidradenitis inpatient) as a short course, then step down to the oral ladder\n\n**Do not prescribe a 7-day antibiotic course as "HS treatment."** The disease-modifying regimens are 8–12 weeks and live on the ladder.',
        options: [
            {
                label: 'Sepsis, extensive cellulitis, Fournier concern, or uncontrolled pain',
                description: 'Admit',
                next: 'hs-dispo-admit',
                urgency: 'critical',
            },
            {
                label: 'Stable — localized cellulitis, tolerating PO, reliable follow-up',
                description: 'Drain what needs draining, then the ladder',
                next: 'hs-analgesia',
            },
        ],
        citation: [1, 5, 6],
        summary: 'Labs, ultrasound, culture for the sick or cellulitic patient; short antibiotic course is not HS treatment',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 5: MEDICAL TREATMENT LADDER
    // =====================================================================
    {
        id: 'hs-ladder',
        type: 'question',
        module: 5,
        title: 'Treatment Ladder — Start the Right Rung',
        body: 'The ED can start the first rungs today and name the ones dermatology will add. Choose by **Hurley stage and IHS4**:',
        options: [
            {
                label: 'Mild — Hurley I or IHS4 ≤ 3',
                description: 'Topicals + tetracycline',
                next: 'hs-ladder-mild',
            },
            {
                label: 'Moderate — Hurley II or IHS4 4–10',
                description: 'Clindamycin + rifampin, adjuncts, name the biologic',
                next: 'hs-ladder-moderate',
            },
            {
                label: 'Severe — Hurley III or IHS4 ≥ 11',
                description: 'Biologic candidate — bridge and refer urgently',
                next: 'hs-ladder-severe',
                urgency: 'urgent',
            },
        ],
        citation: [3, 5, 7],
        summary: 'Ladder by Hurley/IHS4: mild → topical + tetracycline; moderate → clinda-rifampin; severe → biologic',
    },
    {
        id: 'hs-ladder-mild',
        type: 'info',
        module: 5,
        title: 'Mild Disease — Topicals + Tetracycline',
        body: '**Topical (all patients, any stage):**\n• **Clindamycin 1% solution or lotion BID** to affected folds — the only topical antibiotic with RCT support (SORT B)\n• **Chlorhexidine 4% or benzoyl peroxide 5–10% wash** daily to the folds as antiseptic skin care\n\n**Oral tetracycline, 8–12 weeks** (SORT B):\n• [Doxycycline](#/drug/doxycycline/hidradenitis) 100 mg PO daily to BID, **or**\n• [Minocycline](#/drug/minocycline/hidradenitis) 100 mg PO BID\n\nThese are anti-inflammatory courses, not infection courses — prescribe the full 8–12 weeks or a bridge until the dermatology visit, and say so on the script.\n\n**Lifestyle (SORT B, every visit):** smoking cessation and weight reduction each independently reduce flare frequency and severity. Offer cessation pharmacotherapy today.\n\n**Pregnancy or breastfeeding:** tetracyclines are contraindicated — use topical clindamycin and washes and refer; see special-populations guidance in the referral criteria.',
        citation: [3, 4, 5, 7],
        next: 'hs-comorbid',
        summary: 'Topical clindamycin BID + antiseptic wash; doxycycline or minocycline 8–12 wk; smoking cessation and weight loss',
    },
    {
        id: 'hs-ladder-moderate',
        type: 'info',
        module: 5,
        title: 'Moderate Disease — Clindamycin + Rifampin, Adjuncts, Name the Biologic',
        body: 'Everything from the mild rung continues. Add:\n\n**Clindamycin + rifampin, 10–12 weeks** — the best-studied oral combination for Hurley II and as a bridge to a biologic:\n• [Clindamycin](#/drug/clindamycin/hidradenitis oral) 300 mg PO BID\n• [Rifampin](#/drug/rifampin/hidradenitis) 300 mg PO BID\n• Rifampin is a potent CYP inducer — **oral contraceptives fail**, DOACs, warfarin, antiretrovirals, and many others drop; counsel on backup contraception and orange body fluids. *C. difficile* risk from clindamycin.\n\n**Hormonal / metabolic adjuncts:**\n• [Spironolactone](#/drug/spironolactone/hidradenitis) 25–100 mg PO daily for women, particularly with premenstrual flares, PCOS, or acne\n• [Metformin](#/drug/metformin/hidradenitis) titrated to 1.5–2 g/day, especially with insulin resistance, PCOS, or obesity\n\n**Name the biologic.** A patient with Hurley II disease that has failed or will predictably fail antibiotics is a candidate for adalimumab, secukinumab, or bimekizumab. The ED does not prescribe it, but telling the patient "there is an FDA-approved injectable treatment for this and dermatology can start it" changes whether they show up to the appointment.',
        citation: [3, 5, 7],
        next: 'hs-comorbid',
        summary: 'Clindamycin 300 + rifampin 300 BID × 10–12 wk (contraceptive failure!); spironolactone or metformin; name the biologic',
    },
    {
        id: 'hs-ladder-severe',
        type: 'info',
        module: 5,
        title: 'Severe Disease — Biologic Candidate',
        body: 'Hurley III or IHS4 ≥ 11 is biologic-level disease. **Dermatology initiates biologics** after TB, hepatitis B/C, and HIV screening; the ED role is to bridge, name the option, and secure the referral within 2–4 weeks.\n\n**FDA-approved biologics for moderate-to-severe HS:**\n• [Adalimumab](#/drug/adalimumab/hidradenitis) (anti-TNF, approved 2015; ≥12 y) — 160 mg SC day 1, 80 mg day 15, then 40 mg **weekly** from day 29. SORT A; the most experience.\n• [Secukinumab](#/drug/secukinumab/hidradenitis) (anti-IL-17A, approved 2023; ≥12 y) — 300 mg SC weekly × 5 (weeks 0–4), then every 4 weeks; may escalate to every 2 weeks.\n• [Bimekizumab](#/drug/bimekizumab/hidradenitis) (anti-IL-17A/F, approved Nov 2024) — 320 mg SC every 2 weeks through week 16, then every 4 weeks.\n\n**Bridge from the ED:** clindamycin + rifampin from the [moderate rung](#/node/hs-ladder-moderate), intralesional triamcinolone to the worst nodules, analgesia, and skin care. Some centers use a short oral prednisone taper for a severe flare — leave that to dermatology unless already established.\n\n**Surgical referral in parallel:** Hurley III regions with interconnected tunnels ultimately need deroofing or wide excision; biologics reduce inflammation but do not remove established tunnels.\n\n**Already on a biologic and flaring or infected?** Ask when the last dose was, do not tell the patient to stop it, and route infection concerns through the prescribing dermatologist — anti-TNF and anti-IL-17 agents raise infection risk and IL-17 blockade can unmask inflammatory bowel disease.',
        citation: [3, 4, 5, 7, 9, 10, 11],
        next: 'hs-comorbid',
        summary: 'Adalimumab, secukinumab, or bimekizumab via dermatology within 2–4 wk; bridge with clinda-rifampin + IL steroid; surgical referral in parallel',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 6: COMORBIDITIES & COMPLICATIONS
    // =====================================================================
    {
        id: 'hs-comorbid',
        type: 'info',
        module: 6,
        title: 'Comorbidity Screen — The ED Sees Them First',
        body: 'HS is a systemic inflammatory disease. The comorbidities are common, under-diagnosed, and several are more dangerous than the skin. Open **Comorbid** in the toolbar to run and document the screen.\n\n• **Metabolic syndrome and type 2 diabetes** — roughly half of HS patients; check a glucose today and A1c if not done in a year; obesity is present in most — [Diabetes Management](#/tree/diabetes-management)\n• **Polycystic ovary syndrome** — irregular menses, hirsutism, acne; supports spironolactone and metformin\n• **Inflammatory bowel disease** — Crohn disease in particular; diarrhea, blood, weight loss, perianal fistulae that are not HS — [IBD Flare](#/tree/ibd-flare)\n• **Depression, anxiety, and suicide** — depression in a third or more; **completed suicide risk is roughly doubled**. Ask the two-question screen and the direct question about suicidal thoughts — [Suicide Risk Assessment](#/tree/suicide-risk-assessment)\n• **Anemia of chronic disease** — fatigue, low hemoglobin on the CBC you drew\n• **Inflammatory arthritis / spondyloarthropathy** — inflammatory back pain, enthesitis\n• **Smoking and substance use** — 70–90% are current or former smokers; cessation is disease-modifying\n\nDocument what you screened and hand it to the dermatologist — they will need it to choose and safely start a biologic.',
        images: [
            { src: 'images/hidradenitis-suppurativa/hs-abdomen-hurley-iii.jpg', alt: 'Hurley stage III hidradenitis suppurativa on the abdomen with extensive scarring and malodorous drainage', caption: 'Hurley III disease on the abdomen with malodorous drainage — extensive disease in a non-classic site signals a systemic inflammatory burden. HidradenitisAwareness, CC BY-SA 4.0, via Wikimedia Commons.' },
        ],
        calculatorLinks: [
            { id: 'hs-comorbidity-screen', label: 'Comorbidity Screen' },
        ],
        citation: [1, 2, 6],
        next: 'hs-complications',
        summary: 'Screen metabolic syndrome/T2DM, PCOS, IBD, depression and suicide risk, anemia, arthritis, smoking; document for derm',
        safetyLevel: 'warning',
    },
    {
        id: 'hs-complications',
        type: 'info',
        module: 6,
        title: 'Disease Complications',
        body: 'Long-standing Hurley II–III disease produces complications that present to the ED as something else:\n\n• **Fistulae** — anal, rectal, urethral, or vaginal fistulae from perineal tunnels; feculent or urinary drainage from a skin lesion, pneumaturia, recurrent UTI. Imaging (MRI pelvis or fistulogram) and colorectal or urology referral; exclude Crohn.\n• **Lymphedema** — chronic genital, scrotal, or limb lymphedema from lymphatic scarring; predisposes to cellulitis and further infection.\n• **Contractures and restricted motion** — axillary scarring limiting abduction.\n• **Secondary amyloidosis** — nephrotic-range proteinuria or unexplained renal failure in a patient with decades of suppuration; check urinalysis for protein.\n• **Squamous cell carcinoma** — covered in the [red flags](#/node/hs-scc).\n• **Chronic pain and opioid dependence** — coordinate a single prescriber.\n\nEach of these is a reason to escalate from "return if it comes back" to a named specialist and a date.',
        citation: [1, 2, 6],
        next: 'hs-dispo',
        summary: 'Fistulae (anal, urethral), lymphedema, contractures, amyloidosis, SCC, chronic pain — each needs a named referral',
    },
    // =====================================================================
    // MODULE 7: DISPOSITION
    // =====================================================================
    {
        id: 'hs-dispo',
        type: 'question',
        module: 7,
        title: 'Disposition',
        body: 'Most HS flares go home. The **Referral** tool in the toolbar lists the criteria and the urgency for each pathway.',
        options: [
            {
                label: 'Discharge with dermatology referral and flare plan',
                description: 'Well-appearing, pain controlled, tolerating PO, lesion addressed',
                next: 'hs-dispo-discharge',
            },
            {
                label: 'Surgical referral — deroofing or wide excision',
                description: 'Hurley II–III with tunnels, recurrent same-site disease, contracture, fistula',
                next: 'hs-dispo-surgical',
            },
            {
                label: 'Admit',
                description: 'Sepsis, extensive cellulitis, Fournier, uncontrolled pain, IV antibiotics needed',
                next: 'hs-dispo-admit',
                urgency: 'critical',
            },
        ],
        summary: 'Discharge with derm referral and flare plan; surgical referral for tunnels; admit for sepsis, Fournier, uncontrolled pain',
    },
    {
        id: 'hs-dispo-discharge',
        type: 'result',
        module: 7,
        title: 'Discharge — Referral + Written Flare Plan',
        body: '**Before the patient leaves, all of the following:**\n• **Diagnosis written down** — "hidradenitis suppurativa, Hurley __, IHS4 __" on the discharge paperwork, not "abscess"\n• **Dermatology referral with a date**, or at minimum the clinic phone number and a note in the chart; urgency by stage (mild: routine; moderate: 4–6 weeks; severe: 2–4 weeks)\n• **Prescriptions from the ladder** — topical clindamycin + antiseptic wash for everyone; the 8–12-week tetracycline or clindamycin-rifampin course for moderate disease; analgesia plan\n• **A written flare plan:** warm compresses, NSAID + acetaminophen schedule, when a nodule can be injected rather than cut, wound care for the drained lesion (daily showers, no packing), and which lesions justify a return visit\n• **Smoking cessation** offer and weight-management referral documented\n• **Comorbidity screen** results forwarded to dermatology and primary care\n\n**Return precautions:** fever or rigors, rapidly spreading redness, pain out of proportion or a dusky area in the groin or perineum, inability to control pain, feculent or urinary drainage from a lesion, or suicidal thoughts.',
        recommendation: 'Discharge with the diagnosis named on paper, a dated dermatology referral, ladder prescriptions, a written flare plan, smoking cessation, and comorbidity screen results. Return for fever, spreading redness, pain out of proportion, uncontrolled pain, fistula drainage, or suicidal thoughts.',
        confidence: 'recommended',
        citation: [1, 2, 3, 7],
        summary: 'Name the diagnosis, dated derm referral, ladder scripts, written flare plan, cessation, return precautions',
    },
    {
        id: 'hs-dispo-surgical',
        type: 'result',
        module: 7,
        title: 'Surgical Referral — Deroofing or Excision',
        body: 'Tunnels do not resolve with antibiotics or biologics; established Hurley II–III regions need a procedure to stop the cycle.\n\n**Refer to dermatologic surgery, plastic surgery, or general surgery (depending on local practice) for:**\n• Recurrent disease at the same site despite medical therapy\n• Hurley II with a limited number of tunnels — **deroofing** (unroofing the entire tunnel and leaving it to heal by secondary intention; low recurrence, office-based)\n• Hurley III regions — **wide excision** of the whole involved unit with secondary intention healing, grafting, or flap; usually under general anesthesia\n• Contractures, chronic fistulae, lymphedema, or suspected SCC (urgent)\n\n**Coordinate with dermatology** — surgery works best on disease that has first been cooled with a biologic or clindamycin-rifampin, and patients on biologics generally continue them through surgery.\n\nDischarge otherwise as for the [discharge pathway](#/node/hs-dispo-discharge) — the same prescriptions, flare plan, and precautions apply while they wait.',
        recommendation: 'Refer to dermatologic, plastic, or general surgery for deroofing (Hurley II tunnels) or wide excision (Hurley III regions); urgent if SCC suspected. Discharge with the full medical plan in the meantime.',
        confidence: 'recommended',
        citation: [2, 5, 14],
        summary: 'Deroofing for Hurley II tunnels, wide excision for Hurley III regions; coordinate with derm; same discharge plan meanwhile',
    },
    {
        id: 'hs-dispo-admit',
        type: 'result',
        module: 7,
        title: 'Admit',
        body: '**Admission criteria:**\n• Sepsis or systemic toxicity — [Sepsis](#/tree/sepsis)\n• Fournier gangrene or necrotizing infection — surgical service, OR, ICU as indicated\n• Extensive cellulitis, failure of outpatient antibiotics, or immunosuppression with infection\n• Pain uncontrolled with oral multimodal analgesia\n• Need for IV antibiotics, operative drainage or deroofing under general anesthesia, or extensive perineal disease preventing self-care\n\n**Orders:**\n• IV [Clindamycin](#/drug/clindamycin/hidradenitis inpatient) as a short course for the infected flare, broadened per [Necrotizing Fasciitis](#/tree/necrotizing-fasciitis) if there is any concern; step down to the oral ladder before discharge\n• Wound care orders: daily showers, non-adherent dressings, no packing\n• Glucose control, VTE prophylaxis, nutrition\n• **Inpatient dermatology consult** — this is the admission that finally gets the disease staged and a biologic started\n• Surgical consult for deroofing or excision during the stay if appropriate\n• Psychiatry or social work if the suicide screen was positive',
        recommendation: 'Admit for sepsis, Fournier / necrotizing infection, extensive cellulitis, uncontrolled pain, or need for IV antibiotics or operative management. IV clindamycin short course (broaden for NSTI), wound care without packing, and inpatient dermatology and surgical consults.',
        confidence: 'recommended',
        citation: [1, 5, 6],
        summary: 'Admit for sepsis, Fournier, extensive cellulitis, uncontrolled pain, IV abx; inpatient derm + surgery consults',
    },
];
export const HIDRADENITIS_SUPPURATIVA_MODULE_LABELS = [
    'Recognize It',
    'Differential & Red Flags',
    'Stage & Score',
    'Acute Flare',
    'Medical Ladder',
    'Comorbidities',
    'Disposition',
];
export const HIDRADENITIS_SUPPURATIVA_CRITICAL_ACTIONS = [
    { text: 'Recurrent abscesses in the same skin fold = hidradenitis suppurativa — name it, stage it, refer it', nodeId: 'hs-start' },
    { text: 'Toxic perineal or gluteal patient with pain out of proportion = Fournier / NSTI until proven otherwise', nodeId: 'hs-redflags' },
    { text: 'Chronic non-healing ulcer or mass in long-standing Hurley III = squamous cell carcinoma until biopsied', nodeId: 'hs-scc' },
    { text: 'Hurley stage + IHS4 in the note — drives the ladder and the referral urgency', nodeId: 'hs-stage' },
    { text: 'I&D is rescue only (recurrence ~100%); punch debridement removes the roof and follicular unit; never pack', nodeId: 'hs-procedure-choice' },
    { text: 'Inflamed nodule <2 cm: intralesional triamcinolone 10 mg/mL, not a scalpel', nodeId: 'hs-il-steroid' },
    { text: 'Disease-modifying antibiotics are 8–12-week courses; clindamycin + rifampin causes contraceptive failure', nodeId: 'hs-ladder-moderate' },
    { text: 'Screen for depression and suicidal ideation — suicide risk is roughly doubled in HS', nodeId: 'hs-comorbid' },
    { text: 'Discharge with the diagnosis on paper, a dated dermatology referral, and a written flare plan', nodeId: 'hs-dispo-discharge' },
];
export const HIDRADENITIS_SUPPURATIVA_CITATIONS = [
    { num: 1, text: 'Okun MM, Flamm A, Werley EB, Kirby JS. Hidradenitis Suppurativa: Diagnosis and Management in the Emergency Department. J Emerg Med. 2022;63(5):636-644. doi:10.1016/j.jemermed.2022.07.003. PMID 36243614.' },
    { num: 2, text: 'Alikhan A, Sayed C, Alavi A, et al. North American clinical management guidelines for hidradenitis suppurativa: A publication from the United States and Canadian Hidradenitis Suppurativa Foundations: Part I: Diagnosis, evaluation, and the use of complementary and procedural management. J Am Acad Dermatol. 2019;81(1):76-90. doi:10.1016/j.jaad.2019.02.067' },
    { num: 3, text: 'Alikhan A, Sayed C, Alavi A, et al. North American clinical management guidelines for hidradenitis suppurativa: A publication from the United States and Canadian Hidradenitis Suppurativa Foundations: Part II: Topical, intralesional, and systemic medical management. J Am Acad Dermatol. 2019;81(1):91-101. doi:10.1016/j.jaad.2019.02.068' },
    { num: 4, text: 'Alhusayen R, Dienes S, Lam M, et al. North American clinical practice guidelines for the medical management of hidradenitis suppurativa in special patient populations. J Am Acad Dermatol. 2025;92(4):825-852 (published online December 2024). doi:10.1016/j.jaad.2024.11.071' },
    { num: 5, text: 'Zouboulis CC, Bechara FG, Benhadou F, et al. European S2k guidelines for hidradenitis suppurativa/acne inversa part 2: Treatment. J Eur Acad Dermatol Venereol. 2025;39(5):899-941. doi:10.1111/jdv.20472' },
    { num: 6, text: 'Ballard K, Shuman VL. Hidradenitis Suppurativa. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2023. https://www.ncbi.nlm.nih.gov/books/NBK534867/' },
    { num: 7, text: 'Wipperman J, Bragg DA, Litzner B. Hidradenitis Suppurativa: Rapid Evidence Review. Am Fam Physician. 2019;100(9):562-569. PMID 31674740.' },
    { num: 8, text: 'Zouboulis CC, Tzellos T, Kyrgidis A, et al. Development and validation of the International Hidradenitis Suppurativa Severity Score System (IHS4), a novel dynamic scoring system to assess HS severity. Br J Dermatol. 2017;177(5):1401-1409. doi:10.1111/bjd.15748' },
    { num: 9, text: 'HUMIRA (adalimumab) injection, for subcutaneous use. Prescribing Information. AbbVie Inc. Hidradenitis suppurativa indication approved 2015; adolescent (≥12 years, ≥30 kg) dosing added October 2018. https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/125057s410lbl.pdf' },
    { num: 10, text: 'COSENTYX (secukinumab) injection, for subcutaneous use. Prescribing Information. Novartis Pharmaceuticals. Hidradenitis suppurativa indication approved October 2023; expanded to patients ≥12 years.' },
    { num: 11, text: 'BIMZELX (bimekizumab-bkzx) injection, for subcutaneous use. Prescribing Information. UCB, Inc. Hidradenitis suppurativa indication approved November 2024. https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/761151s010lbl.pdf' },
    { num: 12, text: 'Riis PT, Boer J, Prens EP, et al. Intralesional triamcinolone for flares of hidradenitis suppurativa (HS): A case series. J Am Acad Dermatol. 2016;75(6):1151-1155. doi:10.1016/j.jaad.2016.06.049' },
    { num: 13, text: 'O\'Malley GF, Dominici P, Giraldo P, et al. Routine packing of simple cutaneous abscesses is painful and probably unnecessary. Acad Emerg Med. 2009;16(5):470-473. doi:10.1111/j.1553-2712.2009.00409.x' },
    { num: 14, text: 'van der Zee HH, Prens EP, Boer J. Deroofing: a tissue-saving surgical technique for the treatment of mild to moderate hidradenitis suppurativa lesions. J Am Acad Dermatol. 2010;63(3):475-480. doi:10.1016/j.jaad.2009.12.018' },
];
export const HIDRADENITIS_SUPPURATIVA_NODE_COUNT = HIDRADENITIS_SUPPURATIVA_NODES.length;
