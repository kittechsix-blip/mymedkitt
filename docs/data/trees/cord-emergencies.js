// MedKitt — Cord Emergencies
// ED management of umbilical cord-related emergencies in pregnancy and delivery.
// 5 modules: Triage → Cord Prolapse → Nuchal Cord → Vasa Previa → Cord Accidents
// 27 nodes total.
// Sources: RCOG Green-top No. 50 (2014), Oyelese & Smulian (Obstet Gynecol 2006), SMFM #37 (2015),
// Schaefer/Mercer somersault maneuver (Midwifery Today 1987 / J Midwifery Womens Health 2005),
// Vago bladder-fill technique (Am J Obstet Gynecol 1970), Lin 2006, Collins 1997.
export const CORD_EMERGENCIES_CRITICAL_ACTIONS = [
    { text: 'If cord palpable: continuous manual elevation of presenting part', nodeId: 'cord-manual-elevate' },
    { text: 'Position: knee-chest OR left lateral Trendelenburg', nodeId: 'cord-position' },
    { text: 'Bladder fill 500–750 mL warm NS via Foley if transport delayed', nodeId: 'cord-bladder-fill' },
    { text: 'Tocolysis: Terbutaline 0.25 mg SC or NTG 50–100 mcg IV', nodeId: 'cord-tocolysis' },
    { text: 'Decision-to-delivery target <30 minutes (RCOG)', nodeId: 'cord-delivery-timing' },
    { text: 'Tight nuchal cord: try somersault BEFORE clamp-and-cut', nodeId: 'cord-somersault' },
    { text: 'Vasa previa with ROM + bleeding + sinusoidal FHT: STAT C-section', nodeId: 'cord-vasa-acute' },
    { text: 'Do NOT attempt to reduce prolapsed cord back into uterus', nodeId: 'cord-stop-ref' },
];
export const CORD_EMERGENCIES_NODES = [
    // =====================================================================
    // MODULE 1: TRIAGE & RECOGNITION
    // =====================================================================
    {
        id: 'cord-start',
        type: 'info',
        module: 1,
        title: 'Cord Emergencies',
        body: '[Cord Emergencies Steps Summary](#/info/cord-summary) — quick-reference overview of all four pathways.\n\n**Cord emergencies are time-critical obstetric events** — recognition → decompression/repositioning → emergent delivery determines neonatal outcome. This consult covers four ED scenarios:\n\n• Module 1: **Triage** — identify which cord emergency you face\n• Module 2: **Umbilical Cord Prolapse** — positioning, manual elevation, bladder fill, tocolysis, emergent C-section\n• Module 3: **Nuchal Cord at Delivery** — loose → slip, tight reducible → slip over shoulder, **too tight → somersault maneuver** (before clamp-and-cut)\n• Module 4: **Vasa Previa** — antenatal diagnosis vs acute fetal exsanguination (Apt test, sinusoidal FHT)\n• Module 5: **True Knots / Cord Accidents** — unexplained fetal bradycardia, monoamniotic twins\n\n**Page OB, Anesthesia, and Neonatology immediately** for any suspected cord emergency.',
        citation: [1, 2, 7],
        next: 'cord-triage',
        summary: 'Four pathways: prolapse, nuchal cord, vasa previa, accident. Page OB/Anesthesia/NICU now.',
        skippable: true,
    },
    {
        id: 'cord-triage',
        type: 'question',
        module: 1,
        title: 'Which Cord Emergency?',
        body: 'Identify the presentation to choose the pathway.\n\n**Palpable or visible cord** after ROM → **Umbilical cord prolapse** (1 in 200–500 deliveries, 9× rise in perinatal mortality if untreated). [1]\n\n**At delivery, cord around fetal neck** after head delivers → **Nuchal cord** (~20–35% of deliveries — most benign, but tight/locked cords need careful management). [8][9]\n\n**Painless vaginal bleeding + ROM + sinusoidal or bradycardic fetal heart tracing** → **Vasa previa** (1 in 2,500; fetal mortality 56% undiagnosed, <3% if known). [3][4]\n\n**Unexplained sudden fetal bradycardia** in active labor without visible cord, abruption, or uterine rupture → **Cord accident / true knot / body entanglement** (true knots ~1% of pregnancies). [11]',
        citation: [1, 3, 4, 8, 11],
        options: [
            { label: 'Cord palpable or visible in vagina', description: 'Umbilical cord prolapse — true emergency', next: 'cord-prolapse-start', urgency: 'critical' },
            { label: 'Cord around neck at delivery', description: 'Nuchal cord — after head delivers', next: 'cord-nuchal-palpate' },
            { label: 'PV bleed + sinusoidal FHT after ROM', description: 'Vasa previa — fetal exsanguination risk', next: 'cord-vasa-known', urgency: 'critical' },
            { label: 'Unexplained fetal bradycardia', description: 'Cord accident / true knot / entanglement', next: 'cord-accident-recognize', urgency: 'urgent' },
        ],
    },
    // =====================================================================
    // MODULE 2: UMBILICAL CORD PROLAPSE
    // =====================================================================
    {
        id: 'cord-prolapse-start',
        type: 'info',
        module: 2,
        title: 'Umbilical Cord Prolapse',
        body: '[Cord Prolapse Algorithm](#/info/cord-prolapse-algorithm) — full decision tree in one view.\n\n**Definitions:**\n• **Overt prolapse** — cord past presenting part with ROM; visible at introitus or palpable on vaginal exam\n• **Occult prolapse** — cord alongside presenting part; suspect with recurrent severe variable decelerations after ROM\n• **Funic (cord) presentation** — cord below presenting part with intact membranes; will become overt with ROM\n\n**Epidemiology:** 0.1–0.6% of deliveries (~1% in breech). Perinatal mortality <10% with prompt C-section; out-of-hospital mortality remains 38–44%. [1][2]\n\n**Risk factors:** breech (especially footling), transverse/oblique lie, unengaged presenting part, polyhydramnios, prematurity, multiparity, long cord >80 cm, second twin. ~50% are **iatrogenic** from AROM at high station, amnioinfusion, ECV, IUPC/scalp electrode placement. [1][2]\n\n**Diagnosis:** palpable/visible cord OR sudden profound fetal bradycardia / recurrent severe variable decels within 5 min of ROM — perform immediate vaginal exam.',
        citation: [1, 2],
        next: 'cord-prolapse-callhelp',
        summary: 'Overt vs occult prolapse — 50% iatrogenic. Examine vaginally within 5 min of any ROM with FHR changes.',
        images: [
            {
                src: 'images/cord-emergencies/cord-prolapse-overt.jpg',
                alt: 'Historical anatomical illustration showing overt umbilical cord prolapse with the cord visible past the presenting fetal part through the dilated cervix',
                caption: 'Overt cord prolapse. Illustration: W. Smellie, A Sett of Anatomical Tables (1792), public domain via Wikimedia Commons.',
            },
        ],
        safetyLevel: 'critical',
    },
    {
        id: 'cord-prolapse-callhelp',
        type: 'info',
        module: 2,
        title: 'Call for Help — Mobilize OR',
        body: '**PAGE NOW:**\n• OB — decision-to-delivery goal <30 min (RCOG); many centers target <15 min [1]\n• Anesthesia — STAT, for general or spinal\n• NICU / Neonatology — prepared for resuscitation at delivery\n• OR team — open the room, call the surgical tech\n\n**Activate massive transfusion protocol** if maternal bleeding (abruption or uterine rupture comorbidity).\n\n**Do NOT leave the patient.** One provider maintains manual elevation of the presenting part (next node) continuously until the fetus is delivered.\n\n**Document time of diagnosis** — medicolegal and QI critical.',
        citation: [1, 2],
        next: 'cord-position',
        summary: 'Page OB, Anesthesia, NICU, OR team. DDI goal <30 min. Do not leave patient.',
    },
    {
        id: 'cord-position',
        type: 'info',
        module: 2,
        title: 'Maternal Positioning',
        body: '[Knee-Chest & Positioning Guide](#/info/cord-knee-chest) — overlay with images.\n\nPosition the patient to **use gravity to decompress the cord**. Three equivalent options:\n\n**1. Knee-chest (genupectoral)** — most gravity assistance; face down with buttocks elevated. Best for stationary OR prep.\n\n**2. Trendelenburg** with left lateral tilt — head-down, 15–30° tilt. Best for transport and maintaining IV access.\n\n**3. Exaggerated Sims** — left lateral with hips elevated on pillows. Comfortable for longer waits; good for rural transfer.\n\n**All positions:** include **left lateral tilt ≥15°** to decompress the IVC and maintain uteroplacental perfusion. **Never transport supine.** [2]\n\n**Avoid supine position** at all costs — aortocaval compression worsens fetal hypoxia and maternal hypotension.',
        citation: [1, 2],
        images: [
            {
                src: 'images/cord-emergencies/knee-chest-position.jpg',
                alt: 'Medical illustration of patient in knee-chest (genupectoral) position with chest on bed, hips elevated, knees drawn up',
                caption: 'Knee-chest position — head down, buttocks up — for gravity decompression of prolapsed cord. Dorland (1901), public domain via Wikimedia Commons.',
            },
            {
                src: 'images/cord-emergencies/trendelenburg-position.jpg',
                alt: 'Patient in Trendelenburg position with head lower than feet',
                caption: 'Trendelenburg with left lateral tilt — alternative for transport. CC BY 4.0, Doyle & McCutcheon via Wikimedia Commons.',
            },
        ],
        next: 'cord-manual-elevate',
        summary: 'Knee-chest OR left-lat Trendelenburg. ALWAYS ≥15° left tilt. NEVER supine.',
    },
    {
        id: 'cord-manual-elevate',
        type: 'info',
        module: 2,
        title: 'Manual Elevation of Presenting Part',
        body: '**Gloved hand in vagina — lift presenting part off the cord.** Continuous pressure with fingers in the vagina, pushing the fetal presenting part (head, breech, shoulder) cephalad to keep it off the cord.\n\n**Maintain continuously** — do NOT remove your hand, including during transport to the OR, until the fetus is delivered.\n\n**Cord handling rules:**\n• **Minimize handling** — touching the cord causes vasospasm\n• If cord is outside introitus, **wrap loosely in warm saline-soaked gauze**\n• **Do NOT attempt to replace** the cord back into the uterus — historical teaching now discouraged; ineffective and worsens vasospasm [1][2]\n• **Do NOT clamp** the cord\n\nIf you need both hands free (to place a Foley for bladder fill, establish IV access), the nurse maintains elevation.',
        citation: [1, 2],
        next: 'cord-bladder-fill',
        summary: 'Fingers in vagina, push presenting part cephalad continuously. Keep cord warm & moist. NEVER reduce cord.',
        safetyLevel: 'critical',
    },
    {
        id: 'cord-bladder-fill',
        type: 'info',
        module: 2,
        title: 'Bladder Filling (Vago Procedure)',
        body: 'The **Vago technique** (1970) frees the provider\'s hand, elevates the presenting part, and reduces uterine contractility — **lifesaving adjunct when C-section is delayed** (rural transfer, OR not ready). [5]\n\n**Technique:**\n1. Insert 16F Foley catheter\n2. Instill **500–750 mL warm normal saline** via catheter\n3. **Clamp the catheter** to retain\n4. Elevates presenting part ~3–5 cm\n5. Reduces contraction frequency (bladder distension inhibits uterine tone)\n\n**Drain bladder immediately before skin incision** in OR — uncuff the catheter and empty.\n\n**Buys time** — can temporize for 30–60+ minutes of transfer. Documented safe in case series. [5]\n\n**Combine with** continuous manual elevation, left lateral tilt, and tocolysis.',
        citation: [5],
        next: 'cord-tocolysis',
        summary: 'Foley + 500-750 mL warm NS, clamp. Elevates presenting part, reduces contractions. Drain before skin incision.',
    },
    {
        id: 'cord-tocolysis',
        type: 'info',
        module: 2,
        title: 'Tocolysis for In-Utero Resuscitation',
        body: '[Tocolysis Dosing Guide](#/info/cord-tocolysis-guide) — full comparative table.\n\n**Indications:** in-utero resuscitation during OR prep, transport, or when delivery is delayed. Relaxes uterus → improves placental perfusion and reduces cord compression.\n\n**First-line — Terbutaline:** [Terbutaline](#/drug/terbutaline/tocolysis) 0.25 mg SC or IM × 1. Onset 1–5 min, duration 15–30 min. Watch maternal HR, glucose, K+. Avoid if maternal HR >120. [2]\n\n**Fastest onset — Nitroglycerin:** [Nitroglycerin](#/drug/nitroglycerin/tocolysis cord prolapse) 50–100 mcg IV push; may repeat q2min up to 400 mcg total. Onset 1–2 min. **Watch maternal BP — have phenylephrine and IV fluids ready.** [10]\n\n**Not appropriate — Magnesium sulfate:** onset 20+ min is too slow for acute cord compression. Reserve [Magnesium Sulfate](#/drug/magnesium-sulfate/eclampsia) for eclampsia or neuroprotection indications.\n\n**Maternal adjuncts:**\n• High-flow O2 10 L/min NRB\n• IV crystalloid bolus 500 mL–1 L\n• Left lateral tilt ≥15°',
        citation: [2, 10],
        next: 'cord-delivery-timing',
        summary: 'Terbutaline 0.25 mg SC first-line. NTG 50-100 mcg IV fastest. Mag TOO SLOW for acute cord.',
    },
    {
        id: 'cord-delivery-timing',
        type: 'question',
        module: 2,
        title: 'Can the Patient Reach the OR Safely?',
        body: 'Disposition depends on dilation, fetal station, and available resources.\n\n**OR within 30 minutes available?** → emergent C-section remains standard of care.\n\n**Fully dilated, vertex, presenting part at +2 or lower, skilled provider present, and delivery imminent (<5 min)?** → operative vaginal delivery by experienced provider may be faster than C-section — but do NOT delay transfer to OR if delivery is not truly imminent.\n\n**OR delayed (rural, transfer required)?** → maintain bladder fill + manual elevation + tocolysis indefinitely; can temporize >60 minutes. [1][5]',
        citation: [1, 5],
        options: [
            { label: 'OR ready <30 min — emergent C-section', description: 'Standard of care', next: 'cord-csection', urgency: 'critical' },
            { label: 'Vaginal delivery imminent (<5 min, +2 station, fully dilated)', description: 'Operative vaginal delivery by experienced provider', next: 'cord-vaginal-delivery' },
            { label: 'OR delayed — temporize', description: 'Bladder fill + elevation + tocolysis while arranging', next: 'cord-bladder-fill' },
        ],
    },
    {
        id: 'cord-csection',
        type: 'result',
        module: 2,
        title: 'Emergent Cesarean Section',
        body: 'Cord prolapse → Category 1 C-section. Target decision-to-delivery interval **<30 minutes (RCOG)**; many centers achieve <15 min. [1][12]\n\n**Anesthesia:**\n• **Spinal** acceptable IF fetus stable on manual elevation and placement does not delay delivery\n• **General** anesthesia if fetus unstable or spinal attempts delaying delivery\n\n**At delivery:**\n• NICU team present — neonate often needs resuscitation (review NRP if not fluent)\n• Consider neonatal volume resuscitation: 10 mL/kg NS or O-negative blood for severe HIE\n• Cord blood gas — documents acid-base status\n• Maternal: drain Foley, remove manual elevation, proceed with standard cesarean\n\n**Outcomes:** with DDI <30 min and prompt delivery, perinatal survival >95%. Longer DDI → increased risk of HIE and cerebral palsy.',
        recommendation: 'Category 1 C-section. DDI <30 min. NICU at delivery. Drain bladder before skin incision. Maintain manual elevation until delivery.',
        confidence: 'definitive',
        citation: [1, 12],
    },
    {
        id: 'cord-vaginal-delivery',
        type: 'result',
        module: 2,
        title: 'Assisted Vaginal Delivery',
        body: '**Only if ALL of the following:**\n• Fully dilated (10 cm) and completely effaced\n• Vertex presentation, +2 station or lower\n• Experienced provider (operative delivery skilled)\n• Delivery genuinely imminent <5 min\n• Head engaged\n\n**If any criterion missing → C-section.** Do not "try" vaginal delivery as a temporizing measure.\n\n**Proceed:**\n• Vacuum or forceps assisted delivery to minimize cord compression time\n• NICU team at bedside — neonate often needs resuscitation\n• Cross-link: [Precipitous Delivery consult](#/tree/precip-delivery) for standard delivery steps\n• After delivery: cord blood gas, APGAR, skin-to-skin unless resuscitation needed, active management of 3rd stage',
        recommendation: 'Operative vaginal delivery ONLY if fully dilated, +2 vertex, experienced provider, imminent <5 min. Otherwise C-section.',
        confidence: 'recommended',
        citation: [1, 2],
    },
    // =====================================================================
    // MODULE 3: NUCHAL CORD AT DELIVERY
    // =====================================================================
    {
        id: 'cord-nuchal-palpate',
        type: 'info',
        module: 3,
        title: 'Nuchal Cord — Palpate After Head Delivers',
        body: '**Nuchal cord** — umbilical cord looped around the fetal neck. Present in **~20–35% of all deliveries**; most clinically insignificant. Tight nuchal cords (unable to slip over head) occur in ~6%. [8][9]\n\n**After the head delivers** (before shoulder delivery):\n• Sweep index finger around the neck to palpate for cord\n• Identify the number of loops (single vs multiple)\n• Assess tightness and whether it can be reduced\n\n**Collins classification (1997):** [13]\n• **Type A ("unlocked / free"):** cord loops such that the placental end crosses over the umbilical end — can spontaneously unwind with fetal movement; easier to slip over head\n• **Type B ("locked"):** umbilical end crosses over placental end creating a true-knot configuration — cannot spontaneously unwind; higher risk for fetal distress and stillbirth',
        citation: [8, 13],
        images: [
            {
                src: 'images/cord-emergencies/nuchal-cord-type-a-free.gif',
                alt: 'Animated diagram showing Type A (unlocked / free) nuchal cord configuration where the cord can slide freely',
                caption: 'Type A — "unlocked" nuchal cord. Cord can slide freely with fetal movement. CC BY-SA 4.0, Jeanty et al. via Wikimedia Commons.',
            },
            {
                src: 'images/cord-emergencies/nuchal-cord-type-b-locked.gif',
                alt: 'Animated diagram showing Type B (locked) nuchal cord where ends cross forming a true knot configuration',
                caption: 'Type B — "locked" nuchal cord. Cannot spontaneously unwind; higher risk of fetal distress. CC BY-SA 4.0, Jeanty et al. via Wikimedia Commons.',
            },
        ],
        next: 'cord-nuchal-loose',
        summary: 'Sweep finger around neck after head delivers. Type A unlocked (easy) vs Type B locked (risky).',
    },
    {
        id: 'cord-nuchal-loose',
        type: 'question',
        module: 3,
        title: 'Loose, Tight but Reducible, or Too Tight?',
        body: 'Assess reducibility before proceeding with shoulder delivery.\n\n**Loose** → easily slipped over head with finger sweep\n\n**Tight but reducible** → can slip over shoulder with front-to-back maneuver (gently loop the cord over the shoulder that is about to deliver)\n\n**Too tight to slip in either direction** → **perform somersault maneuver — do NOT cut first**. Cutting a tight nuchal cord before delivery commits you to rapid delivery; if shoulder dystocia then develops, the fetus loses placental circulation → acute hypoxia and anemia. [6][7]',
        citation: [6, 7, 8],
        options: [
            { label: 'Loose — slip over head', description: 'Finger sweep under cord and lift over head', next: 'cord-nuchal-proceed' },
            { label: 'Tight but reducible — slip over shoulder', description: 'Front-to-back maneuver over shoulder', next: 'cord-nuchal-proceed' },
            { label: 'Too tight to slip — somersault', description: 'Deliver with cord intact — preferred over cutting', next: 'cord-somersault' },
        ],
    },
    {
        id: 'cord-somersault',
        type: 'info',
        module: 3,
        title: 'Somersault Maneuver',
        body: '[Somersault Maneuver Step-by-Step](#/info/cord-somersault-guide) — overlay with full technique and rationale.\n\n**Schaefer (1987) / Mercer (2005) technique** — for tight nuchal cord that cannot be slipped. **Preferred over clamp-and-cut** when possible. [6][7]\n\n**Steps:**\n1. **Keep fetal head flexed and close to mother\'s thigh / perineum** — chin to chest\n2. **Deliver the anterior shoulder** with gentle downward traction as usual\n3. **Deliver the posterior shoulder** with gentle upward traction\n4. As the **body delivers, allow the fetus to "somersault"** — the body rotates up and over the perineum while the head remains near the mother\'s thigh\n5. **Baby ends up face-up on mother\'s abdomen/thigh with cord still intact and wrapped**\n6. **Unwind the cord AFTER** complete delivery\n\n**Why somersault > clamp-and-cut:**\n• Preserves **placental transfusion** (~30% of neonatal blood volume)\n• Avoids iatrogenic neonatal **hypovolemia and anemia** (devastating if shoulder dystocia then occurs)\n• Avoids hypoxic-ischemic injury if delivery is delayed\n• Evidence: cutting a nuchal cord before delivery is associated with neonatal anemia, HIE, and cerebral palsy when followed by delayed delivery. [7]',
        citation: [6, 7],
        images: [
            {
                src: 'images/cord-emergencies/somersault-maneuver.svg',
                alt: 'Three-panel diagram showing the somersault maneuver: (1) head delivered and kept flexed toward mother\'s thigh with cord around neck, (2) shoulders delivering while body rotates up and over the perineum, (3) baby lying face-up on mother\'s thigh with cord still intact and wrapped',
                caption: 'Somersault maneuver — keep head flexed near thigh, deliver shoulders, let body rotate over perineum, unwind cord after delivery. Schaefer (1987) / Mercer (2005).',
            },
        ],
        next: 'cord-nuchal-proceed',
        summary: 'Head flexed to thigh → deliver shoulders → body somersaults up → unwind AFTER delivery. Preserves placental transfusion.',
        safetyLevel: 'warning',
    },
    {
        id: 'cord-nuchal-clamp',
        type: 'info',
        module: 3,
        title: 'Clamp and Cut — Last Resort Only',
        body: '**WARNING:** Only if somersault maneuver has failed and delivery cannot otherwise progress. **Commits you to immediate, unobstructed delivery** — if shoulder dystocia then develops, the fetus has **no placental circulation** → acute hypoxia and anemia.\n\n**Technique (only if committed):**\n1. Double-clamp the cord with two Kelly clamps, close together\n2. Cut between the clamps with sterile scissors\n3. **Deliver immediately** — shoulders and body, without delay\n4. Anticipate possible shoulder dystocia — have [Shoulder Dystocia](#/tree/shoulder-dystocia) algorithm ready\n5. Neonatal team at bedside — neonate may be pale, hypovolemic; prepare for volume resuscitation (10 mL/kg NS or O-neg blood)\n\n**Before cutting, ask:** "Is delivery truly obstructed?" In most cases, the somersault maneuver succeeds if attempted properly.',
        citation: [7],
        next: 'cord-nuchal-proceed',
        summary: 'LAST RESORT. Double clamp + cut. Commits to immediate delivery. Prepare for neonatal volume resus.',
        safetyLevel: 'critical',
    },
    {
        id: 'cord-nuchal-proceed',
        type: 'info',
        module: 3,
        title: 'Proceed with Delivery',
        body: 'Cord managed — continue with delivery per standard steps.\n\n**Cross-link:** [Precipitous Delivery consult](#/tree/precip-delivery) — for shoulder delivery, cord clamping (delayed 30–60 sec if vigorous), neonatal assessment (APGAR), placenta delivery, oxytocin, and postpartum monitoring.\n\n**After delivery of the baby:**\n• Unwind any cord loops that remain\n• Skin-to-skin with mother unless resuscitation needed\n• Delayed cord clamping 30–60 sec if vigorous — unless nuchal cord was cut (no benefit)\n• Neonatal assessment: dry, warm, stimulate; APGAR at 1 and 5 min\n• **If neonate pale, hypotonic, HR <100** → [Neonatal Resuscitation](#/tree/neonatal-resus) — may need volume for anemia\n\n**If shoulder dystocia (turtle sign, no progress) develops** → [Shoulder Dystocia](#/tree/shoulder-dystocia) algorithm.',
        citation: [8],
        next: 'cord-nuchal-result',
        summary: 'Continue per Precip Delivery. Skin-to-skin, APGAR, delayed clamping if vigorous.',
    },
    {
        id: 'cord-nuchal-result',
        type: 'result',
        module: 3,
        title: 'Nuchal Cord — Managed',
        body: 'Nuchal cord managed with appropriate technique (slip, somersault, or last-resort clamp/cut).\n\n**Post-delivery assessment:**\n• Neonatal APGAR at 1 and 5 min; 10 min if <7\n• Document: number of loops, tightness, maneuver used, any complications\n• Maternal: standard postpartum — uterine tone, lacerations, bleeding\n• Placental exam: cord length, vessel count (2 arteries + 1 vein), true knots\n\n**Continue with:** [Precipitous Delivery consult](#/tree/precip-delivery) for Stage 3 (placenta, oxytocin, lacerations, monitoring).',
        recommendation: 'Document technique and complications. Continue Stage 3 per Precip Delivery consult. Placental exam for cord abnormalities.',
        confidence: 'definitive',
        citation: [8],
    },
    // =====================================================================
    // MODULE 4: VASA PREVIA
    // =====================================================================
    {
        id: 'cord-vasa-known',
        type: 'question',
        module: 4,
        title: 'Vasa Previa — Known Antenatal Diagnosis?',
        body: 'Disposition depends on whether diagnosis is known before presentation.\n\n**Antenatal diagnosis:** transvaginal US with color Doppler identifies fetal vessels crossing over or within 2 cm of the internal cervical os, typically 2nd trimester. Patients usually have scheduled C-section at 34–37 weeks. [3][4]\n\n**Undiagnosed acute presentation:** classic triad after ROM:\n1. **Painless vaginal bleeding** (fetal blood — exsanguination risk)\n2. **Sinusoidal or bradycardic fetal heart tracing**\n3. **Pulsating vessels** palpable through dilated cervix (do NOT repeat digital exam if suspected)\n\n**Fetal blood volume is only 80–100 mL/kg (~250 mL at term)** — exsanguination occurs within minutes. [3]',
        citation: [3, 4],
        options: [
            { label: 'Known antenatal diagnosis', description: 'Planned C-section 34-37 wk', next: 'cord-vasa-planned' },
            { label: 'Acute undiagnosed presentation', description: 'Painless PV bleed + sinusoidal FHT', next: 'cord-vasa-acute', urgency: 'critical' },
        ],
    },
    {
        id: 'cord-vasa-planned',
        type: 'info',
        module: 4,
        title: 'Known Vasa Previa — Delivery Plan',
        body: '**Planned C-section at 34 0/7 – 37 0/7 weeks** per SMFM Consult Series #37 (2015). [4]\n\n**Antenatal management (outpatient or inpatient):**\n• Antenatal corticosteroids for lung maturity at 28–32 wks (betamethasone 12 mg IM × 2 doses, 24 hrs apart)\n• Some centers hospitalize at 30–34 wks for continuous monitoring and rapid C-section if ROM\n• Avoid digital cervical exam and amniotomy — rupturing membranes over fetal vessels = fetal exsanguination\n\n**If patient presents with:**\n• **ROM without bleeding** → STAT C-section regardless of gestational age\n• **Labor, bleeding, or NR fetal tracing** → STAT C-section\n• **Stable, not in labor, intact membranes** → admit, confirm US, steroids if not given, continuous FHR monitoring, plan delivery per gestational age\n\n**At delivery:**\n• Neonatal team with O-negative, CMV-negative, irradiated blood at bedside (10 mL/kg ready)\n• NICU admission — screen for anemia\n\n**Outcomes:** fetal mortality <3% with antenatal diagnosis and planned delivery. [3]',
        citation: [3, 4],
        images: [
            {
                src: 'images/cord-emergencies/vasa-previa-types.jpg',
                alt: 'Diagram showing two types of vasa previa: Type 1 with velamentous cord insertion and Type 2 with vessels connecting a bilobed or succenturiate-lobed placenta, both with fetal vessels crossing over the cervical os',
                caption: 'Vasa previa Types 1 and 2. Unprotected fetal vessels crossing the cervical os without Wharton\'s jelly. CC BY-SA 4.0, de Rooij via Wikimedia Commons.',
            },
        ],
        next: 'cord-vasa-result',
        summary: 'Planned C/S 34-37 wk. Steroids 28-32 wk. STAT C/S if ROM or labor.',
    },
    {
        id: 'cord-vasa-acute',
        type: 'info',
        module: 4,
        title: 'Acute Vasa Previa — STAT C-Section',
        body: '**Every minute matters.** Fetal blood volume 80–100 mL/kg — exsanguination in minutes. [3]\n\n**Immediate actions (simultaneous):**\n• **Page OB, Anesthesia, NICU — activate massive transfusion (neonatal side)**\n• **Prepare neonatal blood:** O-negative, CMV-negative, irradiated, 10 mL/kg ready at delivery\n• Maternal large-bore IV × 2, type & crossmatch (maternal type), notify blood bank\n• High-flow O2 10 L/min NRB\n• Left lateral tilt ≥15°\n• **Do NOT perform digital cervical exam** — risks rupturing more vessels\n• **Do NOT perform amniotomy** if membranes still intact\n\n**Consider [Apt test](#/node/cord-vasa-apt) while en route to OR** — confirms fetal blood (but do NOT delay C-section for results).\n\n**Anesthesia:** general anesthesia usually faster; spinal only if fetus stable.',
        citation: [3, 4],
        next: 'cord-vasa-apt',
        summary: 'STAT C/S. O-neg neonatal blood. NO digital exam. NO amniotomy. General anesthesia fastest.',
        safetyLevel: 'critical',
    },
    {
        id: 'cord-vasa-apt',
        type: 'info',
        module: 4,
        title: 'Apt Test — Fetal vs Maternal Blood',
        body: 'Bedside test to differentiate fetal from maternal hemoglobin — faster than Kleihauer-Betke, doable in ED in ~2 minutes. Apt-Downey (1955). [14]\n\n**Technique:**\n1. Mix the bloody fluid with a small amount of water in a test tube (hemolyzes RBCs)\n2. Centrifuge briefly\n3. Transfer 5 mL supernatant to a new tube\n4. Add **1 mL of 1% KOH (potassium hydroxide)** to the supernatant\n5. Wait 1–2 minutes, observe color\n\n**Interpretation:**\n• **Pink/red color** = **fetal hemoglobin** (resistant to alkaline denaturation) → **confirms vasa previa bleeding**\n• **Brown/yellow color** = **maternal (adult) hemoglobin** (denatures to hematin) → consider other causes (placenta previa, abruption, cervical bleeding)\n\n**DO NOT DELAY DELIVERY to wait for Apt test results** if fetal compromise present. Apt confirms diagnosis retrospectively but does not change acute management.',
        citation: [14],
        next: 'cord-vasa-result',
        summary: 'Pink=fetal Hgb (vasa previa). Brown=maternal. Do NOT delay C/S for results.',
    },
    {
        id: 'cord-vasa-result',
        type: 'result',
        module: 4,
        title: 'Vasa Previa — Emergent Delivery',
        body: 'Vasa previa = STAT Category 1 C-section when acute, planned C-section at 34–37 wk when antenatally diagnosed.\n\n**Outcomes:**\n• **Undiagnosed:** fetal mortality ~56% [3]\n• **Antenatally diagnosed and planned:** fetal mortality <3% [3][4]\n\n**At delivery:**\n• Neonatal blood ready: 10 mL/kg O-negative, CMV-negative, irradiated\n• Cord blood gas and CBC\n• NICU admission — high risk for severe anemia, HIE, transfusion requirement\n• Consider delayed cord clamping **only if neonate not anemic/hypovolemic** — usually not applicable here\n\n**Maternal:** cell salvage if bleeding is maternal-plus-fetal component; standard postpartum hemorrhage monitoring; Rh immune globulin if Rh-negative (fetal blood crossed into maternal circulation).',
        recommendation: 'Category 1 C-section. Neonatal O-neg blood 10 mL/kg at bedside. NICU admission. Cord blood gas + CBC.',
        confidence: 'definitive',
        citation: [3, 4],
    },
    // =====================================================================
    // MODULE 5: TRUE KNOTS / CORD ACCIDENTS / ENTANGLEMENT
    // =====================================================================
    {
        id: 'cord-accident-recognize',
        type: 'info',
        module: 5,
        title: 'Cord Accident / True Knot — Recognition',
        body: '**Unexplained sudden fetal bradycardia** in active labor without visible cord, abruption, or uterine rupture → consider **cord accident**: true knot, nuchal/body entanglement, cord compression. [11]\n\n**Differential for fetal bradycardia:**\n• **Cord compression** — nuchal, body entanglement, true knot, cord around limb\n• **Cord prolapse (occult)** — re-examine vagina immediately\n• **Placental abruption** — painful bleeding, hypertonic uterus\n• **Uterine rupture** — especially with prior cesarean; loss of contractions, maternal pain, recession of presenting part\n• **Maternal hypotension** — epidural, aortocaval compression, hemorrhage\n• **Hyperstimulation** — oxytocin-induced tachysystole\n\n**True knots:** ~1% of pregnancies. Risk factors: long cord >70 cm, polyhydramnios, small fetus, monoamniotic twins, advanced maternal age, male fetus. Increase stillbirth risk ~4-fold but most remain loose. [11]\n\n**Diagnosis rarely antenatal** — usually a postnatal finding on cord exam.',
        citation: [11],
        images: [
            {
                src: 'images/cord-emergencies/true-umbilical-knot.jpg',
                alt: 'Photograph of a newborn\'s umbilical cord showing a true knot',
                caption: 'True umbilical knot — postnatal finding. CC BY-SA 3.0, Tbsdy lives via Wikimedia Commons.',
            },
        ],
        next: 'cord-accident-resus',
        summary: 'Unexplained fetal brady ddx: cord compression, occult prolapse, abruption, rupture, maternal hypotension, tachysystole.',
    },
    {
        id: 'cord-accident-resus',
        type: 'info',
        module: 5,
        title: 'In-Utero Resuscitation',
        body: '**Goal:** restore fetal perfusion and oxygenation while determining etiology and planning delivery. Many cases resolve with resuscitation if recognized early.\n\n**Simultaneous actions:**\n\n**1. Positioning** — left lateral tilt ≥15°; trial right lateral or knee-chest if not improving.\n\n**2. Maternal oxygen** — 10 L/min non-rebreather mask.\n\n**3. IV fluid bolus** — 500 mL – 1 L crystalloid; corrects maternal hypotension from epidural or volume depletion.\n\n**4. Stop oxytocin** — immediately; turn off pump. Tachysystole (>5 contractions/10 min) is a major reversible cause.\n\n**5. Vaginal exam** — rule out occult cord prolapse; check cervical dilation and station.\n\n**6. Tocolysis if no improvement** — [Terbutaline](#/drug/terbutaline/tocolysis) 0.25 mg SC × 1 or [Nitroglycerin](#/drug/nitroglycerin/tocolysis cord prolapse) 50–100 mcg IV.\n\n**7. Continuous FHR monitoring** — expect improvement within 1–2 minutes of effective resuscitation.\n\n**Failure to improve in 5–10 minutes → delivery** (C-section or operative vaginal delivery per cervical exam and station).',
        citation: [11, 15],
        next: 'cord-monoamniotic',
        summary: 'Left tilt, O2, fluids, STOP oxytocin, vaginal exam for occult prolapse, tocolysis. No improvement in 5-10 min → deliver.',
    },
    {
        id: 'cord-monoamniotic',
        type: 'info',
        module: 5,
        title: 'Monoamniotic Twin Cord Entanglement',
        body: '**All monoamniotic-monochorionic (mono-mono) twins have cord entanglement.** Historical stillbirth rate 30–70%; now 10–20% with intensive antenatal surveillance. [15]\n\n**Standard management:**\n• Inpatient admission with continuous FHR monitoring from 24–28 weeks\n• Antenatal corticosteroids at 28 weeks for lung maturity\n• **Planned C-section at 32 0/7 – 34 0/7 weeks** (ACOG/SMFM) [15]\n\n**If mono-mono twin pregnancy presents to ED:**\n• Any sudden fetal bradycardia → STAT C-section\n• Do NOT attempt vaginal delivery in true mono-mono twins even if labor is advanced\n• NICU team ready for two neonates at delivery\n\n**Distinguish from:**\n• **Dichorionic twins** — two placentas, two amniotic sacs — standard twin delivery rules\n• **Monochorionic-diamniotic (mono-di) twins** — one placenta, two sacs — no cord entanglement; deliver per obstetric indications\n• **Monoamniotic-monochorionic (mono-mono)** — one placenta, one sac — always entangled, always C-section',
        citation: [15],
        next: 'cord-accident-result',
        summary: 'All mono-mono twins entangled. Planned C/S 32-34 wk. STAT C/S if fetal brady at any GA.',
    },
    {
        id: 'cord-accident-result',
        type: 'result',
        module: 5,
        title: 'Cord Accident — Disposition',
        body: 'Path forward depends on response to in-utero resuscitation:\n\n**Resuscitation successful (FHR normalizes):**\n• Continue monitoring, investigate and treat reversible causes (tachysystole, hypotension)\n• Consider operative vs expectant management per cervical exam\n• OB consult — may need to proceed with delivery if recurrent\n\n**Resuscitation fails OR recurrent events:**\n• **Category 1 or 2 C-section** depending on urgency\n• Operative vaginal delivery if fully dilated and presenting part at +2 or lower with experienced provider\n• Neonatal team at delivery\n\n**At delivery:**\n• **Inspect the cord** — document true knots, loops, length, insertion (velamentous, marginal, central)\n• Cord blood gas and neonatal APGAR\n• Placental pathology if any abnormalities found',
        recommendation: 'Respond to resuscitation → continue monitoring with investigation. Fails/recurs → Category 1/2 C-section. Always inspect cord at delivery.',
        confidence: 'recommended',
        citation: [11, 15],
    },
    // =====================================================================
    // UTILITY / CROSS-LINK NODE
    // =====================================================================
    {
        id: 'cord-stop-ref',
        type: 'info',
        module: 5,
        title: 'Critical Pitfalls — Do NOT',
        body: '[Cord Emergencies — Do NOT](#/info/cord-stop) — full list of critical pitfalls.\n\n**Top safety items:**\n• Do NOT attempt to reduce prolapsed cord back into uterus\n• Do NOT leave cord exposed or handle it repeatedly (vasospasm)\n• Do NOT clamp/cut tight nuchal cord as first-line — try somersault first\n• Do NOT transport cord prolapse patient supine\n• Do NOT rupture membranes in known/suspected vasa previa\n• Do NOT administer oxytocin during active cord prolapse\n• Do NOT perform digital cervical exam in suspected vasa previa with PV bleed',
        citation: [1, 3, 7],
        next: 'cord-start',
        summary: 'Reference only — key safety items. See Stop page for full list.',
        skippable: true,
    },
];
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const CORD_EMERGENCIES_MODULE_LABELS = [
    'Triage & Recognition',
    'Umbilical Cord Prolapse',
    'Nuchal Cord at Delivery',
    'Vasa Previa',
    'Cord Accidents & True Knots',
];
// -------------------------------------------------------------------
// Evidence Citations (15 references)
// -------------------------------------------------------------------
export const CORD_EMERGENCIES_CITATIONS = [
    { num: 1, text: 'Royal College of Obstetricians and Gynaecologists. Umbilical Cord Prolapse. Green-top Guideline No. 50. London: RCOG; November 2014.' },
    { num: 2, text: 'Lin MG. Umbilical cord prolapse. Obstet Gynecol Surv. 2006;61(4):269-277. doi:10.1097/01.ogx.0000210664.07651.2a' },
    { num: 3, text: 'Oyelese Y, Smulian JC. Placenta previa, placenta accreta, and vasa previa. Obstet Gynecol. 2006;107(4):927-941. doi:10.1097/01.AOG.0000207559.15715.98' },
    { num: 4, text: 'Society for Maternal-Fetal Medicine; Sinkey RG, Odibo AO, Dashe JS. SMFM Consult Series #37: Diagnosis and management of vasa previa. Am J Obstet Gynecol. 2015;213(5):615-619. doi:10.1016/j.ajog.2015.08.031' },
    { num: 5, text: 'Vago T. Prolapse of the umbilical cord: a method of management. Am J Obstet Gynecol. 1970;107(6):967-969.' },
    { num: 6, text: 'Schaefer G. The somersault maneuver for delivery of the infant with a nuchal cord. Midwifery Today. 1987.' },
    { num: 7, text: 'Mercer JS, Skovgaard RL, Peareara-Eaves J, Bowman TA. Nuchal cord management and nurse-midwifery practice. J Midwifery Womens Health. 2005;50(5):373-379. doi:10.1016/j.jmwh.2005.04.023' },
    { num: 8, text: 'Iffy L, Varadi V, Papp E. Untoward neonatal sequelae deriving from cutting of the umbilical cord before delivery. Med Law. 2001;20(4):627-634.' },
    { num: 9, text: 'Jackson H, Melvin C, Downe S. Midwives and the fetal nuchal cord: a survey of practices and perceptions. J Midwifery Womens Health. 2007;52(1):49-55.' },
    { num: 10, text: 'David M, Walka MM, Schmid B, et al. Nitroglycerin to facilitate fetal extraction during cesarean delivery. Obstet Gynecol. 1998;91(1):119-124.' },
    { num: 11, text: 'Hehir MP, Hartigan L, Mahony R. Perinatal death associated with umbilical cord prolapse. J Perinat Med. 2017;45(5):565-570.' },
    { num: 12, text: 'Holbrook BD, Phelan ST. Umbilical cord prolapse. Obstet Gynecol Clin North Am. 2013;40(1):1-14. doi:10.1016/j.ogc.2012.11.002' },
    { num: 13, text: 'Collins JH. Nuchal cord type A and type B. Am J Obstet Gynecol. 1997;177(1):94. doi:10.1016/s0002-9378(97)70451-5' },
    { num: 14, text: 'Apt L, Downey WS Jr. "Melena" neonatorum: the swallowed blood syndrome — a simple test for the differentiation of adult and fetal hemoglobin in bloody stools. J Pediatr. 1955;47(1):6-12.' },
    { num: 15, text: 'American College of Obstetricians and Gynecologists; Society for Maternal-Fetal Medicine. ACOG Practice Bulletin No. 231: Multifetal Gestations: Twin, Triplet, and Higher-Order Multifetal Pregnancies. Obstet Gynecol. 2021;137(6):e145-e162.' },
];
