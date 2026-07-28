// MedKitt — Painless Scrotal Swelling / Mass Front Door (Rule-In / Rule-Out Engine, type: 'hub')
//
// 5-Module rule-in/rule-out skeleton (matches dyspnea-hub / abdominal-pain-hub template
// codified in CLAUDE.md "Chief-Complaint Hub Template"):
//   1. Sick Check
//   2. Rule In / Rule Out — per-differential chains: entry -> gate(s) -> verdict
//      (excluded verdicts loop back to psm-triage; confirmed verdicts link out to deep-dive)
//   3. Initial bundle / Reassess
//   4. Imaging
//   5. Disposition
//
// EBM-only citations. qSOFA (Fournier / sepsis screen) lives in the bottom toolbar.
// Consult gaps handled as plain-text result nodes: incarcerated inguinoscrotal hernia,
// epididymitis/epididymo-orchitis, testicular tumor / mass, hydrocele/varicocele workup.
//
// BASIS DISCLOSURE (FDA 21st Century Cures Act CDS exemption, Prong 4 — the clinician must be
// able to independently review the basis for every recommendation):
// Every recommendation, threshold, and critical action in this hub is traceable to a numbered
// source in PAINLESS_SCROTAL_MASS_HUB_CITATIONS below. Each reference carries a DOI, PMID, or a
// resolvable URL so it can be retrieved and read independently. The evidentiary base is:
//   [1] AFP scrotal-mass review (2022; supersedes the 2014 edition) + Tintinalli 9e
//   [2] AFP testicular torsion review + Sheth TWIST-score validation (J Urol 2016)
//   [3] Fournier gangrene review (Ther Adv Urol 2015) + IDSA SSTI guideline (2014)
//   [4] CDC STI Treatment Guidelines 2021 (epididymitis) — CURRENT edition
//   [5] HerniaSurge international groin hernia guidelines (2018, updated 2023)
//   [6] Penile emergencies review (Emerg Med Clin North Am 2011)
//   [7] AUA/SMSNA Acute Ischemic Priapism Guideline (2021)
//   [8] AUA early-stage testicular cancer guideline (2019, amended 2023) + EAU 2023
//   [9] ACR Appropriateness Criteria — acute scrotal pain (2024) + palpable scrotal mass (2022)
//  [10] Sepsis-3 / qSOFA (JAMA 2016)
// This hub is decision SUPPORT. It does not replace clinical judgement, and every recommendation
// is intended to be independently verifiable against the cited source before it is acted upon.
export const PAINLESS_SCROTAL_MASS_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check
    // ============================================================
    {
        id: 'psm-sick-check',
        type: 'info',
        module: 1,
        title: 'Painless Scrotal Swelling — Sick Check First',
        body: '**"Painless" is a trap — do NOT label a hydrocele until you have excluded the masqueraders.** Torsion can be intermittent and only intermittently painful, malignancy is famously painless, and a constricting object or an incarcerated hernia can devastate the testis or bowel while the presenting complaint is just "swelling."\n\n**⚠️ 5 DO-NOT-MISS diagnoses**\n1. **Missed / intermittent testicular torsion** — a painless or waxing-waning scrotum with a horizontal or high-riding testis, absent cremasteric reflex; the salvage window is short.\n2. **Fournier gangrene** — a necrotizing infection of the perineum/scrotum: systemic toxicity, pain out of proportion, crepitus, dusky skin. A surgical emergency.\n3. **Incarcerated inguinoscrotal hernia** — a tender, non-reducible scrotal mass with GI symptoms; risks bowel strangulation and ischemia.\n4. **Constricting object / paraphimosis / zipper entrapment** — a tourniquet on the penis or scrotum threatens tissue.\n5. **Priapism with scrotal/penile involvement** — a persistent erection is a GU emergency masquerading as "swelling."\n\n**First 60 seconds:** vitals (fever/toxicity → screen sepsis with qSOFA in the toolbar; think Fournier), inspect and palpate — testicular lie, cremasteric reflex, transillumination, reducibility, skin changes/crepitus, and whether the mass is separate from or part of the testis. **Any acute or intermittent pain, or an abnormal lie → treat as torsion until Doppler proves otherwise.**',
        citation: [1, 2, 3, 5, 6, 7, 10],
        next: 'psm-triage',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Rule In / Rule Out
    // ============================================================
    {
        id: 'psm-triage',
        type: 'question',
        module: 2,
        title: 'Rule In / Rule Out — Pick the Thread',
        body: 'Work the dangerous causes first, then the benign ones. Each branch runs a tight clinical gate to an explicit verdict; excluded branches return here for the next differential.',
        options: [
            { label: '🔴 Abnormal lie / intermittent pain / absent cremasteric reflex', description: 'Missed / intermittent torsion', next: 'psm-torsion-entry', urgency: 'critical' },
            { label: '🔴 Toxicity / crepitus / dusky perineal skin / pain out of proportion', description: 'Fournier gangrene', next: 'psm-fournier-entry', urgency: 'critical' },
            { label: 'Tender, non-reducible mass + GI symptoms', description: 'Incarcerated inguinoscrotal hernia', next: 'psm-hernia-entry', urgency: 'urgent' },
            { label: 'Constricting object / paraphimosis / persistent erection', description: 'Constriction / priapism emergency', next: 'psm-constrict-entry', urgency: 'critical' },
            { label: 'Young + sexually active + epididymal tenderness / discharge', description: 'Epididymo-orchitis / STI', next: 'psm-epidi-entry', urgency: 'urgent' },
            { label: 'Soft, transilluminating, separate from testis, non-tender', description: 'Benign hydrocele / varicocele / cyst', next: 'psm-benign-entry', urgency: 'routine' },
        ],
        citation: [1, 2, 3, 5, 6, 7],
        summary: 'Six-branch triage: torsion / Fournier / incarcerated hernia / constriction-priapism / epididymo-orchitis / benign.',
    },
    // -------------------- MISSED / INTERMITTENT TORSION --------------------
    {
        id: 'psm-torsion-entry',
        type: 'question',
        module: 2,
        title: 'Testicular Torsion — Lie + Doppler Gate',
        body: '**A painless or intermittently painful scrotum does NOT exclude torsion.** Intermittent torsion/detorsion presents with recurrent brief pain and swelling; a missed torsion may be subacute. Red flags: **horizontal or high-riding testis, absent cremasteric reflex, negative Prehn sign**. **TWIST score** (hard testis, swelling, nausea/vomiting, absent cremasteric, high-riding) risk-stratifies. **A high-probability exam is a straight-to-OR situation — do not delay for imaging.** Otherwise, color Doppler ultrasound (reduced/absent flow) confirms.',
        options: [
            { label: 'Abnormal lie / high TWIST / reduced flow on Doppler', description: 'Treat as torsion', next: 'psm-torsion-verdict', urgency: 'critical' },
            { label: 'Normal lie, normal cremasteric, normal Doppler flow', description: 'Torsion unlikely \u2014 move on', next: 'psm-torsion-excluded', urgency: 'routine' },
        ],
        citation: [1, 2, 9],
        summary: 'Painless/intermittent still needs torsion excluded. TWIST + abnormal lie; high probability = OR, do not wait for imaging.',
        safetyLevel: 'critical',
    },
    {
        id: 'psm-torsion-verdict',
        type: 'result',
        module: 2,
        title: 'Torsion — Emergent Urology + Manual Detorsion',
        body: 'Open [Testicular Torsion](#/tree/testicular-torsion) for the full pathway.\n\n**Next steps:**\n- **Emergent urology consult for surgical exploration** \u2014 salvage falls off sharply after ~6 hours of ischemia. Do NOT wait for imaging if the exam is convincing.\n- **Attempt manual detorsion** while arranging the OR (classically "open book" \u2014 medial-to-lateral rotation of the affected testis); relief of pain and normalization of lie suggests success but does NOT replace surgery.\n- Analgesia, NPO, IV access.\n- Color Doppler ultrasound only if it will not delay definitive care.',
        recommendation: 'Emergent urology for exploration + attempt manual detorsion; do not delay surgery for imaging. Salvage is time-dependent.',
        citation: [1, 2, 9],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'psm-torsion-excluded',
        type: 'result',
        module: 2,
        title: 'Torsion — Unlikely',
        body: 'A normal testicular lie, an intact cremasteric reflex, and preserved Doppler flow make torsion unlikely right now. **Intermittent torsion can still be the cause of recurrent painless swelling** \u2014 counsel the patient about recurrence and arrange urology follow-up; recurrent episodes may warrant elective orchidopexy.\n\nReturn to the hub for the next differential.',
        recommendation: 'Torsion unlikely with normal lie/flow; consider intermittent torsion for recurrent swelling and refer to urology.',
        citation: [1, 2, 9],
        next: 'psm-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- FOURNIER GANGRENE --------------------
    {
        id: 'psm-fournier-entry',
        type: 'question',
        module: 2,
        title: 'Fournier Gangrene — Toxicity Gate',
        body: '**Fournier gangrene is a necrotizing soft-tissue infection of the perineum/scrotum \u2014 a surgical emergency.** The alarm is **pain out of proportion + systemic toxicity**, with dusky/necrotic skin, crepitus, foul odor, or rapidly spreading erythema. Diabetes, immunocompromise, obesity, and alcohol use raise the risk. **Do NOT wait for imaging to consult surgery** if the exam is convincing.',
        options: [
            { label: 'Toxicity + crepitus / dusky skin / pain out of proportion', description: 'Resuscitate + emergent surgery', next: 'psm-fournier-verdict', urgency: 'critical' },
            { label: 'No toxicity, benign skin, localized non-tender swelling', description: 'Fournier unlikely \u2014 move on', next: 'psm-fournier-excluded', urgency: 'routine' },
        ],
        citation: [3, 10],
        summary: 'Pain out of proportion + toxicity + crepitus/dusky skin = Fournier; resuscitate + emergent debridement.',
        safetyLevel: 'critical',
    },
    {
        id: 'psm-fournier-verdict',
        type: 'result',
        module: 2,
        title: 'Fournier Gangrene — Resuscitate + Emergent Debridement',
        body: 'Open [Necrotizing Fasciitis](#/tree/necrotizing-fasciitis) \u2014 Fournier is a necrotizing infection and follows the same pathway.\n\n**Next steps:**\n- **Emergent surgical consult for operative debridement \u2014 do NOT wait for imaging.** Source control is the definitive treatment; mortality rises with every hour of delay.\n- **Broad-spectrum antibiotics:** cover gram-positives, gram-negatives, and anaerobes (e.g., vancomycin + piperacillin-tazobactam) **plus clindamycin for toxin suppression**.\n- **Aggressive resuscitation** \u2014 run the [Sepsis](#/tree/sepsis) pathway (IV fluids, blood cultures, lactate); qSOFA in the toolbar.\n- CT can map extent if it will not delay surgery, but a convincing exam goes straight to the OR.',
        recommendation: 'Emergent operative debridement (do not wait for imaging) + broad-spectrum abx with clindamycin + aggressive sepsis resuscitation.',
        citation: [3, 10],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'psm-fournier-excluded',
        type: 'result',
        module: 2,
        title: 'Fournier — Unlikely',
        body: 'No systemic toxicity, benign overlying skin, and localized non-tender swelling make Fournier gangrene unlikely right now. **It evolves fast** \u2014 if toxicity, crepitus, spreading erythema, or skin necrosis appears on reassessment, resuscitate and consult surgery immediately.\n\nReturn to the hub for the next differential.',
        recommendation: 'Fournier unlikely without toxicity/skin signs; re-examine and escalate immediately if necrotizing features evolve.',
        citation: [3, 10],
        next: 'psm-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- INCARCERATED INGUINOSCROTAL HERNIA (consult gap: plain-text) --------------------
    {
        id: 'psm-hernia-entry',
        type: 'question',
        module: 2,
        title: 'Incarcerated Inguinoscrotal Hernia — Reducibility Gate',
        body: '**A scrotal mass that is separate from the testis, extends up toward the inguinal canal, and is non-reducible \u2014 especially with GI symptoms (pain, vomiting, obstipation) \u2014 is an incarcerated hernia until proven otherwise.** Incarceration risks strangulation and bowel ischemia. Reducible hernias are not emergencies; **non-reducible + tender + systemic/GI symptoms = surgical emergency.**',
        options: [
            { label: 'Non-reducible + tender \u00B1 GI symptoms / obstruction', description: 'Treat as incarcerated \u00B1 strangulated', next: 'psm-hernia-verdict', urgency: 'urgent' },
            { label: 'Reducible, non-tender, no GI symptoms', description: 'Not incarcerated \u2014 move on', next: 'psm-hernia-excluded', urgency: 'routine' },
        ],
        citation: [1, 5],
        summary: 'Non-reducible + tender + GI sx = incarcerated hernia, risk of strangulation; reducible = not an emergency.',
        safetyLevel: 'warning',
    },
    {
        id: 'psm-hernia-verdict',
        type: 'result',
        module: 2,
        title: 'Incarcerated Hernia — Reduce / Surgery',
        body: '**Incarcerated inguinoscrotal hernia** (no dedicated consult yet \u2014 manage here):\n\n- **A single gentle taxis (manual reduction) attempt is reasonable** for an incarcerated hernia WITHOUT signs of strangulation (Trendelenburg, analgesia, gentle sustained pressure). **Do NOT attempt reduction if there is any concern for strangulation** (severe tenderness, skin changes, systemic toxicity) \u2014 reducing dead bowel is dangerous.\n- **Emergent general-surgery consult** for irreducible or strangulated hernias.\n- **If bowel ischemia is suspected** (pain out of proportion, acidosis, peritonism), resuscitate and work it up on the [Mesenteric Ischemia](#/tree/mesenteric-ischemia) pathway; obtain labs (lactate) and imaging (CT).\n- NPO, IV fluids, analgesia, antiemetics; NG tube if obstructed.\n- (Consult gap \u2014 managed in-hub.)',
        recommendation: 'One gentle taxis only if NO strangulation signs; otherwise emergent surgery. Suspected ischemia → mesenteric-ischemia workup. NPO/IV/analgesia.',
        citation: [5],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'psm-hernia-excluded',
        type: 'result',
        module: 2,
        title: 'Incarcerated Hernia — Excluded',
        body: 'A reducible, non-tender inguinoscrotal bulge without GI symptoms is not incarcerated. Refer to general surgery for elective repair and counsel on incarceration warning signs (a non-reducible, painful, or discolored bulge with vomiting → return immediately).\n\nReturn to the hub for the next differential.',
        recommendation: 'Reducible hernia is not an emergency; elective surgical referral + strict incarceration return precautions.',
        citation: [5],
        next: 'psm-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- CONSTRICTION / PRIAPISM --------------------
    {
        id: 'psm-constrict-entry',
        type: 'question',
        module: 2,
        title: 'Constriction / Priapism — GU Emergency Gate',
        body: '**A constricting object (hair tourniquet, ring, zipper), paraphimosis, or a persistent erection is a genital emergency masquerading as "swelling."** Each threatens tissue via ischemia. Inspect carefully: is there a tourniquet, an entrapment, a retracted-and-swollen foreskin (paraphimosis), or a rigid painful erection >4 h (priapism)?',
        options: [
            { label: 'Constricting object / zipper entrapment / paraphimosis', description: 'Release / reduce now', next: 'psm-constrict-verdict', urgency: 'critical' },
            { label: 'Persistent painful erection >4 h', description: 'Priapism pathway', next: 'psm-priapism-verdict', urgency: 'critical' },
            { label: 'No constriction / no priapism', description: 'Excluded \u2014 move on', next: 'psm-constrict-excluded', urgency: 'routine' },
        ],
        citation: [6, 7],
        summary: 'Constricting object / paraphimosis / priapism = time-critical GU emergencies; release / reduce / detumesce.',
        safetyLevel: 'critical',
    },
    {
        id: 'psm-constrict-verdict',
        type: 'result',
        module: 2,
        title: 'Constriction / Zipper / Paraphimosis — Relieve Now',
        body: '**Relieve the constriction immediately \u2014 tissue is ischemic while it is on.**\n\n- **Zipper entrapment:** open [Penile Zipper Release](#/tree/penile-zipper-release) (mineral oil, cut the median bar, or unzip after lubrication).\n- **Constricting ring / hair tourniquet:** remove with lubrication, ring cutter, or careful incision of a hair tourniquet under magnification; check for a deep/embedded strand.\n- **Paraphimosis:** reduce it \u2014 compress the edematous glans (manual, osmotic sugar, ice), then reduce the foreskin over the glans; dorsal slit / urology if it fails.\n- Analgesia / local block; urology if any measure fails or tissue looks compromised.',
        recommendation: 'Immediate release of the constricting object / reduction of paraphimosis; analgesia; urology if it fails or tissue is compromised.',
        citation: [6],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'psm-priapism-verdict',
        type: 'result',
        module: 2,
        title: 'Priapism — Time-Critical Detumescence',
        body: 'Open [Priapism](#/tree/priapism) for the full pathway. **Ischemic (low-flow) priapism is time-critical for erectile function.**\n\n- Confirm ischemic vs non-ischemic with corporal aspirate blood gas \u00B1 Doppler.\n- **Ischemic:** corporal aspiration \u00B1 irrigation, then **intracavernosal phenylephrine** with cardiovascular monitoring; surgical shunt if refractory. **Urgent urology.**\n- Treat the trigger (sickle cell, drugs); analgesia throughout.',
        recommendation: 'Confirm ischemic type, then aspiration + intracavernosal phenylephrine + urgent urology; treat the underlying trigger.',
        citation: [6, 7],
        next: 'psm-triage',
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'psm-constrict-excluded',
        type: 'result',
        module: 2,
        title: 'Constriction / Priapism — Excluded',
        body: 'No constricting object, no paraphimosis, and no persistent erection \u2014 a genital-constriction emergency is not the driver here.\n\nReturn to the hub for the next differential.',
        recommendation: 'Constriction/priapism excluded; reassess if an entrapment or persistent erection develops.',
        citation: [6, 7],
        next: 'psm-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- EPIDIDYMO-ORCHITIS / STI (consult gap: plain-text) --------------------
    {
        id: 'psm-epidi-entry',
        type: 'question',
        module: 2,
        title: 'Epididymo-Orchitis / STI — Risk Gate',
        body: '**Epididymo-orchitis is the main torsion mimic** \u2014 gradual-onset swelling, epididymal tenderness, sometimes a **positive Prehn sign** (relief with elevation) and preserved cremasteric reflex, \u00B1 dysuria/discharge. In young sexually active men it is usually GC/CT (send NAAT); in older men or those with GU obstruction it is usually gram-negative/enteric. **You must still be confident it is not torsion** \u2014 if in doubt, Doppler.',
        options: [
            { label: 'Epididymal tenderness + STI/UTI risk, torsion excluded', description: 'Treat as epididymo-orchitis', next: 'psm-epidi-verdict', urgency: 'urgent' },
            { label: 'Not the picture / torsion not excluded', description: 'Reassess \u2014 move on', next: 'psm-epidi-excluded', urgency: 'routine' },
        ],
        citation: [1, 2, 4],
        summary: 'Epididymo-orchitis mimics torsion (Prehn +, cremasteric preserved). NAAT if young; enteric if older. Exclude torsion first.',
        safetyLevel: 'warning',
    },
    {
        id: 'psm-epidi-verdict',
        type: 'result',
        module: 2,
        title: 'Epididymo-Orchitis — Test + Empiric Antibiotics',
        body: '**Epididymo-orchitis** (no dedicated consult yet \u2014 manage here). If STI features, open [STI Comprehensive](#/tree/sti-comprehensive) for the full workup.\n\n- **Send UA + culture and NAAT for GC/CT** (and consider enteric coverage in older men or those with obstruction).\n- **Empiric antibiotics per current CDC guidance:** for likely STI \u2014 ceftriaxone + doxycycline; for enteric organisms (older men, insertive anal sex, or GU obstruction) \u2014 a fluoroquinolone or add appropriate gram-negative coverage.\n- Supportive care: scrotal elevation, NSAIDs, ice, analgesia.\n- **If you cannot confidently exclude torsion, get a Doppler ultrasound.**\n- Urology follow-up; return precautions for worsening pain/swelling or systemic symptoms; consider abscess if not improving.\n- (Consult gap \u2014 managed in-hub.)',
        recommendation: 'NAAT + UA/culture; empiric CDC-guided abx (STI vs enteric by risk); scrotal support/NSAIDs; Doppler if torsion not confidently excluded.',
        citation: [4, 9],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'psm-epidi-excluded',
        type: 'result',
        module: 2,
        title: 'Epididymo-Orchitis — Not the Picture',
        body: 'The exam and risk profile do not fit epididymo-orchitis \u2014 or torsion has not yet been confidently excluded. **When in doubt between torsion and epididymo-orchitis, the safe move is Doppler ultrasound and urology input**, because a missed torsion loses the testis.\n\nReturn to the hub for the next differential.',
        recommendation: 'If epididymo-orchitis does not fit or torsion is not excluded, get Doppler + urology \u2014 do not under-triage.',
        citation: [2, 4, 9],
        next: 'psm-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- BENIGN (hydrocele / varicocele / cyst) --------------------
    {
        id: 'psm-benign-entry',
        type: 'question',
        module: 2,
        title: 'Benign Scrotal Mass — Characterize the Lesion',
        body: '**Once the emergencies are excluded, characterize the benign lesion** \u2014 but remember **a solid mass ON the testis is a tumor until proven otherwise.**\n- **Hydrocele:** soft, cystic, **transilluminates**, surrounds the testis. New/tense hydrocele in an adult \u2192 ultrasound to exclude an underlying tumor.\n- **Varicocele:** "bag of worms," more prominent standing / with Valsalva, usually left-sided. **A new right-sided or non-decompressing varicocele warrants imaging** (rule out a retroperitoneal/renal mass).\n- **Spermatocele / epididymal cyst:** cystic, separate from and superior to the testis, transilluminates.\n- **Solid intratesticular mass:** does NOT transilluminate \u2192 **ultrasound + tumor markers + urology (testicular tumor).**',
        options: [
            { label: 'Soft, transilluminating, separate from testis \u2014 clearly benign', description: 'Reassure + outpatient workup', next: 'psm-benign-verdict', urgency: 'routine' },
            { label: 'Solid mass on the testis / does not transilluminate / new firm mass', description: 'Treat as possible tumor', next: 'psm-tumor-verdict', urgency: 'urgent' },
        ],
        citation: [1, 8, 9],
        summary: 'Characterize benign lesions by transillumination/location; a solid intratesticular mass is a tumor until proven otherwise.',
    },
    {
        id: 'psm-benign-verdict',
        type: 'result',
        module: 2,
        title: 'Benign Scrotal Mass — Reassure + Follow-Up',
        body: '**A soft, transilluminating mass separate from the testis (hydrocele, spermatocele, epididymal cyst, simple varicocele)** in a well patient is benign.\n\n- Reassure; no emergent intervention needed.\n- **Get a scrotal ultrasound as an outpatient** for a new/tense adult hydrocele, a new right-sided or non-decompressing varicocele, or any diagnostic uncertainty \u2014 to exclude an underlying tumor or retroperitoneal cause.\n- Urology follow-up; return precautions for acute pain, rapid enlargement, a firm/solid area, or systemic symptoms.\n- (Deep-dive consult gap \u2014 managed in-hub.)',
        recommendation: 'Reassure benign transilluminating lesions; outpatient ultrasound for new/atypical hydrocele or right-sided varicocele; urology follow-up.',
        citation: [1, 9],
        next: 'psm-disposition',
        confidence: 'recommended',
    },
    {
        id: 'psm-tumor-verdict',
        type: 'result',
        module: 2,
        title: 'Possible Testicular Tumor — Ultrasound + Markers + Urology',
        body: '**A solid, firm intratesticular mass that does NOT transilluminate is a testicular tumor until proven otherwise** \u2014 painless is the classic presentation, and germ-cell tumors are the most common solid malignancy in young men (no dedicated consult yet \u2014 manage here):\n\n- **Scrotal ultrasound** (the key test to characterize an intratesticular mass).\n- **Serum tumor markers: AFP, beta-hCG, LDH** before any intervention.\n- **Urgent urology referral** \u2014 do NOT biopsy transscrotally; the standard is radical inguinal orchiectomy for diagnosis/treatment.\n- Consider staging (chest imaging) per urology/oncology; check for bulky disease or metastatic symptoms.\n- Counsel and arrange timely follow-up \u2014 this is a highly curable cancer when caught early.\n- (Consult gap \u2014 managed in-hub.)',
        recommendation: 'Solid intratesticular mass = tumor until proven otherwise: scrotal US + AFP/beta-hCG/LDH + urgent urology (radical inguinal orchiectomy; no transscrotal biopsy).',
        citation: [1, 8, 9],
        next: 'psm-disposition',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // ============================================================
    // Module 3 — Initial Bundle / Reassess
    // ============================================================
    {
        id: 'psm-rescue',
        type: 'info',
        module: 3,
        title: 'Initial Bundle',
        body: '**The scrotal-swelling work-up bundle (scale to acuity):**\n- **Focused exam:** testicular lie, cremasteric reflex, Prehn sign, transillumination, reducibility, skin changes/crepitus, and whether the mass is intratesticular or separate.\n- **Color Doppler ultrasound** is the workhorse \u2014 but **do NOT let imaging delay the OR for a convincing torsion or Fournier.**\n- **Vitals + qSOFA** if any toxicity; resuscitate and screen for Fournier/sepsis.\n- **UA + culture + NAAT for GC/CT** when epididymo-orchitis/STI is on the table.\n- **Tumor markers (AFP, beta-hCG, LDH)** for a solid intratesticular mass.\n- Analgesia; NPO + IV access for anyone potentially heading to the OR.',
        citation: [1, 2, 4, 8, 9, 10],
        next: 'psm-reassess',
    },
    {
        id: 'psm-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess After the Bundle',
        body: 'After the focused exam \u00B1 Doppler and initial labs \u2014 where does the patient stand?',
        options: [
            { label: 'Torsion / Fournier / strangulation / toxic', description: 'Escalate: OR + source control + admit', next: 'psm-imaging', urgency: 'critical' },
            { label: 'Stable, cause identified, benign or treatable', description: 'Move to disposition', next: 'psm-disposition', urgency: 'routine' },
        ],
        citation: [1, 2, 3, 5],
        summary: 'Torsion/Fournier/strangulation → escalate to OR + admit; stable + diagnosed → disposition.',
    },
    // ============================================================
    // Module 4 — Imaging
    // ============================================================
    {
        id: 'psm-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging',
        body: '**Match the study to the question:**\n- **Color Doppler scrotal ultrasound** \u2014 the primary test: assesses testicular flow (torsion), characterizes masses (cystic vs solid, intra- vs extratesticular), and evaluates the epididymis. **Do NOT delay definitive surgery for a convincing torsion or Fournier.**\n- **CT / MRI of the perineum and pelvis** \u2014 to map necrotizing infection extent or an incarcerated/obstructing hernia, if it will not delay the OR.\n- **Retroperitoneal/renal imaging** \u2014 for a new right-sided or non-decompressing varicocele.\n- Imaging is generally NOT needed for a classic, clearly benign transilluminating hydrocele in a well patient (outpatient US suffices).',
        citation: [1, 3, 5, 9],
        next: 'psm-disposition',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'psm-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Where does this patient go?',
        options: [
            { label: 'Torsion / Fournier / strangulated hernia / toxic', description: 'OR / admit', next: 'psm-dispo-admit', urgency: 'critical' },
            { label: 'Treated but needs monitoring / borderline / uncertain', description: 'Observe / urology in ED', next: 'psm-dispo-observe', urgency: 'urgent' },
            { label: 'Benign lesion / epididymo-orchitis treated / constriction relieved', description: 'Discharge with follow-up', next: 'psm-dispo-discharge', urgency: 'routine' },
        ],
        citation: [1, 2, 3, 5],
        summary: 'OR/admit the surgical emergencies; observe the borderline; discharge benign/treated with urology follow-up.',
    },
    {
        id: 'psm-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit / OR',
        body: '**To the OR / admit** the surgical emergency.\n\n- **Torsion \u2192 emergent scrotal exploration** (detorsion + bilateral orchidopexy or orchiectomy).\n- **Fournier \u2192 emergent debridement**, broad-spectrum antibiotics, ICU-level resuscitation as needed.\n- **Strangulated hernia \u2192 emergent repair \u00B1 bowel resection.**\n- Ongoing resuscitation, analgesia, and specialty (urology / general surgery) management; ICU for septic/unstable patients.',
        recommendation: 'OR for torsion / Fournier / strangulation; broad-spectrum abx + resuscitation; ICU if unstable.',
        citation: [2, 3, 5, 10],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'psm-dispo-observe',
        type: 'result',
        module: 5,
        title: 'Observe / Urology in the ED',
        body: '**Observation / ED urology consult** for the borderline patient \u2014 e.g., torsion not fully excluded despite reassuring Doppler, a reduced hernia needing a period of observation, or a new solid mass needing expedited workup.\n\n- Serial exams, repeat Doppler if the picture changes, and specialist input before disposition.\n- Ensure reliable, timely follow-up before any discharge; treat pain.',
        recommendation: 'Short observation + specialist input, serial exams / repeat Doppler, then admit or discharge with tight follow-up.',
        citation: [1, 2, 5, 9],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'psm-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge',
        body: '**Discharge** the well patient with a clear plan.\n\n- **Benign lesion (hydrocele/varicocele/cyst):** reassurance, outpatient scrotal ultrasound if new/atypical, urology follow-up.\n- **Epididymo-orchitis:** empiric antibiotics given, scrotal support/NSAIDs, partner therapy if STI, follow-up, and **strict return precautions** (worsening pain/swelling, fever, or new severe pain \u2014 reconsider torsion/abscess).\n- **Constriction relieved:** wound care and follow-up.\n- Written return precautions and a named follow-up; explicit torsion/tumor red-flag counseling.',
        recommendation: 'Discharge benign/treated patients with outpatient US as needed, antibiotics + partner therapy if STI, and explicit torsion/tumor return precautions.',
        citation: [1, 2, 4, 6, 9],
        confidence: 'recommended',
    },
];
export const PAINLESS_SCROTAL_MASS_HUB_CRITICAL_ACTIONS = [
    { text: 'Sick Check first — "painless" does not exclude torsion, Fournier, incarceration, or tumor', nodeId: 'psm-sick-check' },
    { text: 'Abnormal lie / intermittent pain / high TWIST → treat as torsion; a convincing exam goes straight to the OR — do not delay for imaging', nodeId: 'psm-torsion-entry' },
    { text: 'Confirmed torsion: emergent urology for exploration + attempt manual detorsion while arranging the OR — salvage is time-dependent', nodeId: 'psm-torsion-verdict' },
    { text: 'Toxicity + crepitus + pain out of proportion = Fournier gangrene — do not wait for imaging to consult surgery', nodeId: 'psm-fournier-entry' },
    { text: 'Fournier gangrene: emergent operative debridement + broad-spectrum antibiotics with clindamycin + aggressive sepsis resuscitation', nodeId: 'psm-fournier-verdict' },
    { text: 'Solid intratesticular mass that does not transilluminate → testicular tumor: scrotal US + AFP/beta-hCG/LDH + urgent urology, no transscrotal biopsy', nodeId: 'psm-tumor-verdict' },
];
export const PAINLESS_SCROTAL_MASS_HUB_CITATIONS = [
    { num: 1, text: 'Langan RC, Puente ME. Scrotal Masses. Am Fam Physician. 2022;106(2):184-189. https://www.aafp.org/pubs/afp/issues/2022/0800/scrotal-masses.html \u2014 SUPERSEDED prior edition: Crawford P, Crop JA. Evaluation of Scrotal Masses. Am Fam Physician. 2014;89(9):723-727. PMID 24784335. Background text: Tintinalli JE, et al., eds. Tintinalli\u2019s Emergency Medicine: A Comprehensive Study Guide. 9th ed. McGraw-Hill; 2020 (Male Genital Problems chapter).' },
    { num: 2, text: 'Sharp VJ, Kieran K, Arlen AM. Testicular Torsion: Diagnosis, Evaluation, and Management. Am Fam Physician. 2013;88(12):835-840. PMID 24364548. https://www.aafp.org/pubs/afp/issues/2013/1215/p835.html \u2014 TWIST score validation: Sheth KR, Keays M, Grimsby GM, et al. Diagnosing Testicular Torsion before Urological Consultation and Imaging: Validation of the TWIST Score. J Urol. 2016;195(6):1870-1876. doi:10.1016/j.juro.2016.01.101. PMID 26835833.' },
    { num: 3, text: 'Chennamsetty A, Khourdaji I, Burks F, Killinger KA. Contemporary Diagnosis and Management of Fournier\u2019s Gangrene. Ther Adv Urol. 2015;7(4):203-215. doi:10.1177/1756287215584740. PMID 26445600. \u2014 Antibiotic and necrotizing-infection guidance: Stevens DL, Bisno AL, Chambers HF, et al. Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update by the Infectious Diseases Society of America. Clin Infect Dis. 2014;59(2):e10-e52 (print executive summary paginated 59(2):147-159). doi:10.1093/cid/ciu296. PMID 24947530 [correction: Clin Infect Dis. 2015;60(9):1448]. https://academic.oup.com/cid/article/59/2/e10/2895845' },
    { num: 4, text: 'Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021 (Epididymitis section). MMWR Recomm Rep. 2021;70(4):1-187. doi:10.15585/mmwr.rr7004a1. PMID 34292926. https://www.cdc.gov/std/treatment-guidelines/STI-Guidelines-2021.pdf \u2014 CURRENT CDC edition. Narrative review: McConaghy JR, Panchal B. Epididymitis: An Overview. Am Fam Physician. 2016;94(9):723-726. PMID 27929243.' },
    { num: 5, text: 'HerniaSurge Group. International Guidelines for Groin Hernia Management (incarceration, taxis, and emergency repair). Hernia. 2018;22(1):1-165. doi:10.1007/s10029-017-1668-x. PMID 29330835. \u2014 Current update: Stabilini C, van Veenendaal N, Aasvang E, et al. Update of the International HerniaSurge Guidelines for Groin Hernia Management. BJS Open. 2023;7(5):zrad080. doi:10.1093/bjsopen/zrad080.' },
    { num: 6, text: 'Dubin J, Davis JE. Penile Emergencies (paraphimosis, constriction/entrapment injury, zipper injury, priapism). Emerg Med Clin North Am. 2011;29(3):485-499. doi:10.1016/j.emc.2011.04.006. https://www.emed.theclinics.com/article/S0733-8627(11)00040-X/abstract' },
    { num: 7, text: 'Bivalacqua TJ, Allen BK, Brock G, et al. Acute Ischemic Priapism: An AUA/SMSNA Guideline. J Urol. 2021;206(5):1114-1121. doi:10.1097/JU.0000000000002236. https://www.auanet.org/guidelines-and-quality/guidelines/acute-ischemic-priapism' },
    { num: 8, text: 'Stephenson A, Eggener SE, Bass EB, et al. Diagnosis and Treatment of Early Stage Testicular Cancer: AUA Guideline (serum AFP/beta-hCG/LDH before orchiectomy; radical inguinal orchiectomy; avoid transscrotal biopsy). J Urol. 2019;202(2):272-281. doi:10.1097/JU.0000000000000318. PMID 31059667 \u2014 amended 2023: Stephenson A, Bass EB, Bixler BR, et al. J Urol. 2023. doi:10.1097/JU.0000000000003694. \u2014 European counterpart: Patrikidou A, Cazzaniga W, Berney D, et al. European Association of Urology Guidelines on Testicular Cancer: 2023 Update. Eur Urol. 2023;84(3):289-301. PMID 37183161.' },
    { num: 9, text: 'Expert Panel on Urological Imaging; Gerena M, Allen BC, Turkbey B, et al. ACR Appropriateness Criteria\u00AE Acute Onset of Scrotal Pain \u2014 Without Trauma, Without Antecedent Mass: 2024 Update. J Am Coll Radiol. 2024;21(11S):S364-S371. doi:10.1016/j.jacr.2024.08.011. PMID 39488348. \u2014 Painless/palpable mass pathway: Expert Panel on Urological Imaging; Lyshchik A, Nikolaidis P, Khatri G, et al. ACR Appropriateness Criteria\u00AE Newly Diagnosed Palpable Scrotal Abnormality. J Am Coll Radiol. 2022;19(5S):S114-S120. doi:10.1016/j.jacr.2022.02.018. PMID 35550796.' },
    { num: 10, text: 'Singer M, Deutschman CS, Seymour CW, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3) \u2014 qSOFA criteria. JAMA. 2016;315(8):801-810. doi:10.1001/jama.2016.0287. PMID 26903338. PMCID PMC4968574.' },
];
export const PAINLESS_SCROTAL_MASS_HUB_NODE_COUNT = PAINLESS_SCROTAL_MASS_HUB_NODES.length;
export const PAINLESS_SCROTAL_MASS_HUB_MODULE_LABELS = [
    'Sick Check',
    'Rule In / Rule Out',
    'Initial Bundle / Reassess',
    'Imaging',
    'Disposition',
];
