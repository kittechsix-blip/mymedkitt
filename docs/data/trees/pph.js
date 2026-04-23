// myMedKitt — Postpartum Hemorrhage (PPH)
// Stepwise approach to postpartum hemorrhage in the ED: Recognition → Immediate Measures →
// 4 T's Differential → Uterotonic Ladder → Advanced Interventions → Disposition.
// 34 nodes, 6 modules. Cross-listed: OB/GYN + Emergency Medicine.
// Primary sources:
//   - ACOG Practice Bulletin No. 183: Postpartum Hemorrhage (2017, reaffirmed 2023)
//   - WHO Recommendations for the Prevention and Treatment of Postpartum Haemorrhage (2012, 2017 update)
//   - SMFM Consult Series No. 44: Management of bleeding in the late preterm period (2018)
//   - California Maternal Quality Care Collaborative (CMQCC) OB Hemorrhage Toolkit v3.0 (2022)
//   - WOMAN Trial (Lancet 2017) — TXA in PPH
//   - Bienstock JL, Eke AC, Hueppchen NA. NEJM. 2021;384:1635-45 — Postpartum Hemorrhage review
//   - SOAP Consensus Statement on Obstetric Hemorrhage (2019)
export const PPH_CRITICAL_ACTIONS = [
    { text: 'Call for help: OB, anesthesia, blood bank, charge nurse', nodeId: 'pph-call-team' },
    { text: 'Two large-bore IVs, T&C 4-6 units, CBC/PT/PTT/fibrinogen', nodeId: 'pph-access-labs' },
    { text: 'Bimanual uterine massage immediately — do not delay', nodeId: 'pph-massage-fundus' },
    { text: 'Tranexamic acid 1 g IV within 3 hours', nodeId: 'pph-txa' },
    { text: 'Start oxytocin infusion — never give IV push', nodeId: 'pph-oxytocin' },
    { text: 'Check the 4 T\'s: Tone, Trauma, Tissue, Thrombin', nodeId: 'pph-four-ts' },
    { text: 'If ongoing bleeding: Bakri balloon ± MTP activation', nodeId: 'pph-bakri' },
];
export const PPH_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION & CALL FOR HELP
    // =====================================================================
    {
        id: 'pph-start',
        type: 'info',
        module: 1,
        title: 'Postpartum Hemorrhage',
        body: '[PPH Steps Summary](#/info/pph-steps-summary) — quick-reference checklist to review before and during resuscitation.\n\n**Postpartum hemorrhage (PPH)** is the leading cause of maternal mortality worldwide and remains a top cause of preventable maternal death in the US. [1][2]\n\n**Call for help early.** Mortality triples when diagnosis or escalation is delayed.\n\nThis consult walks through ED management of PPH in **6 modules**:\n\n• Module 1: Recognition & Call for Help\n• Module 2: Immediate Measures — massage, TXA, bimanual compression\n• Module 3: 4 T\'s Differential — Tone, Trauma, Tissue, Thrombin\n• Module 4: Uterotonic Ladder — Oxytocin → Methergine → Hemabate → Misoprostol\n• Module 5: Advanced Interventions — Bakri balloon, MTP, surgical\n• Module 6: Disposition\n\n**This consult assumes the placenta has already delivered.** For active delivery in progress, see the [Precipitous Delivery](#/tree/precip-delivery) consult.',
        citation: [1, 2],
        next: 'pph-definition',
        summary: 'Leading cause of maternal mortality — call for help early. 6-module approach starts here.',
        skippable: true,
        images: [
            {
                src: 'images/pph/gray1170-uterine-artery.png',
                alt: 'Schematic drawing of the uterine artery ascending along the lateral uterus and anastomosing with the ovarian artery, showing the vascular arcades feeding the fundus',
                caption: 'Uterine vascular supply: uterine artery anastomoses with the ovarian artery — the rich arcade is why atony bleeds fast. (Gray\'s Anatomy, Plate 1170 — Public Domain.)',
            },
        ],
    },
    {
        id: 'pph-definition',
        type: 'info',
        module: 1,
        title: 'PPH Definition (ACOG 2017)',
        body: 'ACOG / reVITALize consensus definition (2017): [1]\n\n**Cumulative blood loss ≥1000 mL** OR **blood loss accompanied by signs or symptoms of hypovolemia** within 24 hours following the birth process — regardless of delivery route.\n\n**Timing:**\n• **Primary (early) PPH** — within 24 hours of delivery — ~99% of cases\n• **Secondary (late) PPH** — 24 hours to 12 weeks postpartum — think retained products, endometritis, subinvolution, gestational trophoblastic disease\n\n**Incidence:** 3–5% of all deliveries; severe PPH (≥1500 mL or transfusion) in ~1–2%. [1][2]\n\n**Underestimation is the rule.** Visual estimation undercounts blood loss by 30–50%. Use calibrated under-buttocks drapes, weigh sponges, and trust the vital signs and [shock index](#/calculator/shock-index) over the estimate.\n\n**Most common cause:** uterine atony (~70–80% of cases). But **always check the 4 T\'s** — missing a laceration or retained placenta delays definitive treatment.',
        citation: [1, 2],
        next: 'pph-initial-assess',
        summary: '≥1000 mL OR signs of hypovolemia within 24h post-delivery — EBL is underestimated 30-50%.',
        skippable: true,
    },
    {
        id: 'pph-initial-assess',
        type: 'question',
        module: 1,
        title: 'Hemodynamic Assessment',
        body: 'Assess the patient **before** fixating on blood estimation:\n\n• Vital signs — HR, SBP, SpO₂, mental status\n• [Shock Index](#/calculator/shock-index) — HR/SBP ratio (>0.9 abnormal in pregnancy; >1.0 = hemorrhagic shock) [3]\n• Skin: pallor, cold, clammy, mottling\n• Urine output if catheterized\n\n**Pregnancy physiology obscures early shock.** Healthy peripartum patients compensate well — tachycardia and narrowed pulse pressure appear before hypotension. By the time SBP drops, blood loss is often ≥25% of blood volume (~1500 mL).\n\n**Use the shock index — it outperforms HR or SBP alone for detecting occult obstetric hemorrhage.** [3][4]',
        citation: [3, 4],
        options: [
            {
                label: 'Unstable — SI >1.0, SBP <90, or altered mental status',
                description: 'Activate hemorrhage protocol NOW',
                next: 'pph-unstable',
                urgency: 'critical',
            },
            {
                label: 'Stable but actively bleeding',
                description: 'Call team, initiate measures',
                next: 'pph-call-team',
                urgency: 'urgent',
            },
        ],
        summary: 'Shock Index >0.9 abnormal in pregnancy; >1.0 = shock. Pregnancy masks early hypotension.',
    },
    {
        id: 'pph-unstable',
        type: 'info',
        module: 1,
        title: 'Unstable — Activate Protocol',
        body: '**HEMORRHAGE EMERGENCY — EXECUTE IN PARALLEL**\n\n**Call STAT:** OB attending, anesthesia, charge nurse, blood bank ("MTP on standby for OB hemorrhage"), OR if not already aware.\n\n**Position:** Trendelenburg, 2–3 assistants at bedside.\n\n**Airway/Breathing:** High-flow O₂ via NRB, prepare for intubation if obtunded.\n\n**Circulation:**\n• **2 large-bore IVs (16-18g)** or IO if access fails\n• **Warmed crystalloid** bolus (LR or NS) — 1–2 L, but **do not dilute** — move to blood products early\n• **Emergency release O-negative blood** if crossmatched unavailable — 2 units\n• **Activate [Massive Transfusion Protocol](#/tree/massive-transfusion)** if ongoing bleeding or [Shock Index](#/calculator/shock-index) >1.0 with blood loss\n\n**Monitoring:** Foley for strict I/O, continuous pulse ox, ECG, arterial line if feasible.\n\n**Keep warm** — hypothermia worsens coagulopathy. Warm blankets, Bair Hugger, warm fluids.\n\n**The first 30 minutes determine outcome.** [1][5][8]',
        citation: [1, 5, 8],
        next: 'pph-call-team',
        summary: 'Trendelenburg + 2 large-bore IVs + O-neg blood + activate MTP if SI >1.0. Keep patient warm.',
        safetyLevel: 'critical',
    },
    {
        id: 'pph-call-team',
        type: 'info',
        module: 1,
        title: 'Team Assembly',
        body: '**CALL FOR HELP — assign roles:**\n\n• **OB attending** — definitive management, surgical decisions\n• **OB anesthesia** — airway, access, hemodynamic support, arterial line\n• **Blood bank** — activate MTP, confirm sample available, send emergency-release cooler\n• **Charge nurse** — runner, documentation, recorder\n• **Second RN** — dedicated to medications and blood products\n• **Pharmacy** — mix uterotonics, prepare TXA\n\n**Announce clearly:** "Postpartum hemorrhage. Estimated blood loss X mL. We need [blood/team/OR]."\n\n**Designate a timekeeper** — call out every 5 minutes. PPH mortality is driven by cumulative delay.\n\n**Notify pediatrics** if newborn remains in the room — they should not be forgotten during maternal resuscitation. [5][9]',
        citation: [5, 9],
        next: 'pph-access-labs',
        summary: 'Announce PPH clearly, assign OB/Anesthesia/Blood Bank/Timekeeper roles, designate a recorder.',
    },
    {
        id: 'pph-access-labs',
        type: 'info',
        module: 1,
        title: 'Access, Labs & Blood',
        body: '**VASCULAR ACCESS**\n• 2 large-bore IVs (16-18g) minimum — IO if peripheral access fails\n• Arterial line if ongoing resuscitation\n\n**LABS (send STAT)**\n• CBC with platelets, fibrinogen, PT/PTT, INR\n• **Type & crossmatch 4-6 units pRBC** (if not already typed, draw and send)\n• Basic metabolic panel, LFTs, lactate\n• Ionized calcium (hypocalcemia from citrated blood worsens coagulopathy)\n• ABG if unstable\n\n**FIBRINOGEN IS CRITICAL** — in pregnancy, baseline fibrinogen is elevated (400-600 mg/dL at term). A "normal" 300 mg/dL actually indicates consumption. **Fibrinogen <200 mg/dL** is the earliest lab marker of severe PPH and predicts massive hemorrhage. [1][6]\n\n**BLOOD PRODUCTS — ORDER EARLY**\n• 2 units pRBC emergency release (O-negative or type-specific if known)\n• For MTP: 1:1:1 ratio of pRBC : FFP : platelets [See Massive Transfusion consult](#/tree/massive-transfusion)\n• **Cryoprecipitate 10 units** if fibrinogen <200 mg/dL (target >200 mg/dL) [6]\n\n**Consider Rh status** — document and plan for [Rh Immune Globulin (RhoGAM)](#/drug/rh-immune-globulin/rh negative postpartum) if Rh-negative mother.',
        citation: [1, 6],
        next: 'pph-massage-fundus',
        summary: '2 IVs, CBC/fibrinogen/coags/T&C 4-6u. Fibrinogen <200 = severe PPH. Early blood products.',
    },
    // =====================================================================
    // MODULE 2: IMMEDIATE MEASURES
    // =====================================================================
    {
        id: 'pph-massage-fundus',
        type: 'info',
        module: 2,
        title: 'Fundal Massage — Do This NOW',
        body: '**External fundal massage is the first mechanical intervention.** Do not wait for uterotonics to mix.\n\n**TECHNIQUE**\n1. Place one hand flat on the lower abdomen, palm over the uterine fundus\n2. **Massage firmly in a circular motion** — "cup" the fundus and knead\n3. Apply downward compression toward the pelvis\n4. Continue until the uterus feels firm, globular, and well-contracted\n5. **Keep massaging intermittently** for the first hour post-delivery — atony recurs\n\n**ASSESS TONE CONSTANTLY**\n• "Boggy" uterus = atony = active bleeding\n• Firm, well-contracted uterus ≈ tone is not the primary problem\n\n**EMPTY THE BLADDER** — a distended bladder prevents uterine contraction. Place a Foley catheter if not already done. This alone often reduces bleeding. [1][5]\n\n**Fundal massage + bladder drainage is the fastest, cheapest, most forgotten intervention.** [5]',
        citation: [1, 5],
        next: 'pph-txa',
        summary: 'Cup fundus + circular massage + empty bladder — fastest intervention for atony.',
    },
    {
        id: 'pph-txa',
        type: 'info',
        module: 2,
        title: 'Tranexamic Acid (TXA) — Within 3 Hours',
        body: '**Give [Tranexamic Acid](#/drug/tranexamic-acid/postpartum hemorrhage) 1 g IV over 10 minutes as soon as PPH is diagnosed.**\n\n**EVIDENCE — WOMAN TRIAL (Lancet 2017)** [7]\n• 20,060 women with PPH, 21 countries\n• TXA vs placebo within 3 hours of delivery\n• **Death from bleeding: 1.5% vs 1.9%** (RR 0.81, p=0.045)\n• **Best effect when given within 1 hour** (RR 0.69 for death from bleeding)\n• **NO BENEFIT if given >3 hours post-delivery** — do not give late\n\n**DOSE**\n• 1 g IV over 10 minutes (infuse at 1 mL/min — faster infusion causes hypotension)\n• **Repeat 1 g IV at 30 minutes** if bleeding continues or restarts within 24 hours\n\n**NO DELAY FOR LABS OR FIBRINOGEN.** TXA is safe at standard obstetric doses — no increase in thromboembolic events in the WOMAN trial.\n\n**CONTRAINDICATIONS**\n• Known hypersensitivity\n• Acquired defective color vision\n• Active thromboembolic disease (rare to be true CI in active hemorrhage)\n\n**DO NOT DELAY uterotonics or mechanical measures to give TXA** — it is an adjunct, not a substitute. [7]',
        citation: [7],
        next: 'pph-bimanual-compression',
        summary: 'TXA 1g IV within 3h of delivery (WOMAN trial) — faster is better, repeat at 30 min if ongoing.',
        safetyLevel: 'warning',
    },
    {
        id: 'pph-bimanual-compression',
        type: 'info',
        module: 2,
        title: 'Bimanual Uterine Compression',
        body: '**If bleeding continues despite massage and uterotonics are mixing — perform bimanual uterine compression.** This is the single most effective mechanical maneuver for uterine atony.\n\n**TECHNIQUE** (see diagram)\n1. **Gloved, dominant hand** — insert into vagina, form a fist, and press against the anterior vaginal fornix\n2. **Non-dominant hand** — place flat on the abdomen and **cup the posterior uterine wall from above**\n3. **Compress the uterus firmly between both hands** — the uterus is sandwiched anteriorly and posteriorly\n4. Maintain compression continuously for **5-10 minutes or until bleeding controlled**\n5. Keep pressure during transport to OR or interventional radiology\n\n**What you are doing:** mechanically tamponading open arteries in the uterine wall and stimulating myometrial contraction.\n\n**It is tiring.** Trade off with a second provider every 5 minutes if possible.\n\n**Bimanual compression buys time** — for uterotonics to take effect, for blood to arrive, for OR/IR to be ready. It is a **bridge, not a destination**. [1][5]\n\n**If bleeding does not slow within 5 minutes of compression + uterotonics → prepare for Bakri balloon and escalation.**',
        citation: [1, 5],
        next: 'pph-four-ts',
        summary: 'Vaginal fist + abdominal hand compress uterus between both — 5-10 min or until bleeding controlled.',
        safetyLevel: 'warning',
        images: [
            {
                src: 'images/pph/bimanual-compression.jpg',
                alt: 'Cross-sectional illustration showing one hand in the vagina forming a fist beneath the uterus while the other hand presses the fundus through the abdominal wall, compressing the uterus between both hands',
                caption: 'Bimanual uterine compression: vaginal fist anteriorly, abdominal hand posteriorly, compressing the uterus between them. (Hirst, A Text-Book of Obstetrics, 1898 — Public Domain.)',
            },
        ],
    },
    // =====================================================================
    // MODULE 3: 4 T'S DIFFERENTIAL
    // =====================================================================
    {
        id: 'pph-four-ts',
        type: 'info',
        module: 3,
        title: 'The 4 T\'s of PPH',
        body: '[4 T\'s Differential Reference](#/info/pph-four-ts-info) — full differential with clinical clues.\n\n**The 4 T\'s** is the universal PPH differential. Commit it to memory — you will use it in every hemorrhage. [1][5][8]\n\n| **T** | **Cause** | **Frequency** | **Clinical clue** |\n|---|---|---|---|\n| **Tone** | Uterine atony | ~70-80% | Boggy, soft uterus; fundus above umbilicus |\n| **Trauma** | Lacerations, hematoma, inversion, uterine rupture | ~20% | Firm uterus but active bleeding |\n| **Tissue** | Retained placenta/products, accreta | ~10% | Incomplete placenta on exam; persistent bleeding |\n| **Thrombin** | Coagulopathy (DIC, AFE, HELLP, dilutional) | <1% | Oozing from IV sites, hematuria, petechiae |\n\n**Always check Tone first.** If the uterus is firm and well-contracted but bleeding continues — think **Trauma** or **Tissue**.\n\n**Physical exam BEFORE diving deeper:**\n• Fundus position and tone\n• Speculum exam of cervix and vagina for lacerations\n• Inspect placenta for completeness (every cotyledon, intact membranes)\n• IV site oozing, gingival bleeding, petechiae (Thrombin)',
        citation: [1, 5, 8],
        next: 'pph-four-ts-q',
        summary: 'Tone (70%) → Trauma (20%) → Tissue (10%) → Thrombin (<1%). Check tone first.',
    },
    {
        id: 'pph-four-ts-q',
        type: 'question',
        module: 3,
        title: 'Primary Cause?',
        body: 'Based on the exam, what is the most likely primary cause of bleeding?\n\n**Tone = boggy/soft uterus**\n**Trauma = firm uterus, active bleeding from canal, or signs of inversion/rupture**\n**Tissue = incomplete placenta or persistent bleeding despite firm uterus and no lacerations**\n**Thrombin = generalized oozing (IV sites, mucosa) or known coagulopathy/AFE**\n\nIf unclear, default to **Tone** — it is the most common and uterotonics buy time.',
        options: [
            {
                label: 'Tone — Boggy uterus',
                description: 'Uterine atony (most common)',
                next: 'pph-atony-intro',
            },
            {
                label: 'Trauma — Laceration, inversion, or rupture',
                description: 'Genital tract injury',
                next: 'pph-trauma-assess',
            },
            {
                label: 'Tissue — Retained placenta/products',
                description: 'Manual exploration needed',
                next: 'pph-tissue',
            },
            {
                label: 'Thrombin — Coagulopathy',
                description: 'DIC, AFE, dilutional',
                next: 'pph-thrombin',
            },
        ],
        summary: '4-way branch: Tone (boggy) / Trauma (firm + bleeding) / Tissue (retained) / Thrombin (oozing).',
    },
    {
        id: 'pph-trauma-assess',
        type: 'question',
        module: 3,
        title: 'Trauma — Which Injury?',
        body: '**Firm uterus + active bleeding = trauma.** Speculum exam under adequate light and analgesia.\n\n**Inspect systematically:**\n• Cervix — grasp with ring forceps, walk around every quadrant\n• Vagina — sidewalls and posterior fornix\n• Perineum — 1st–4th degree laceration grading\n• Vulvar/paravaginal mass — hematoma\n• Fundus — appears indented or absent abdominally = uterine inversion\n\n**Uterine rupture** (prior C-section, trauma, extreme multiparity) — severe pain, loss of fetal station, abdominal tenderness, hemodynamic collapse.',
        options: [
            {
                label: 'Cervical / vaginal / perineal laceration',
                description: 'Visible tear with active bleeding',
                next: 'pph-laceration',
            },
            {
                label: 'Uterine inversion',
                description: 'Dimpled or absent fundus abdominally',
                next: 'pph-uterine-inversion',
                urgency: 'critical',
            },
            {
                label: 'Vulvar / paravaginal hematoma',
                description: 'Expanding firm mass',
                next: 'pph-hematoma',
            },
            {
                label: 'Suspected uterine rupture',
                description: 'Severe pain, hemodynamic collapse',
                next: 'pph-rupture',
                urgency: 'critical',
            },
        ],
        summary: 'Speculum every quadrant — cervix, vagina, perineum. Check fundus for inversion.',
    },
    {
        id: 'pph-laceration',
        type: 'info',
        module: 3,
        title: 'Laceration Repair',
        body: '**GENITAL TRACT LACERATIONS**\n\n**Classification (perineal):**\n• **1st degree** — skin/mucosa only\n• **2nd degree** — extends to perineal muscles\n• **3rd degree** — involves anal sphincter\n• **4th degree** — extends through rectal mucosa\n\n**Cervical lacerations** — common at 3 and 9 o\'clock; bleed briskly. Use ring forceps to walk around the entire cervix.\n\n**MANAGEMENT**\n• **Optimize exposure** — adequate lighting, retractors, assistants, analgesia (pudendal block, regional, or moderate sedation)\n• **Repair in layers** — 2-0 or 3-0 absorbable suture (Vicryl or chromic)\n• **1st and 2nd degree** — can be repaired by EM provider if comfortable\n• **3rd, 4th degree, or any cervical laceration** — defer to OB for specialist repair\n\n**WHILE WAITING FOR REPAIR**\n• Direct pressure with packed gauze against the tear\n• Continue uterotonics and volume resuscitation\n• **Never pack blindly** — identifying the source is essential\n\n**Large cervical or high vaginal tears may be difficult to visualize** — move to OR for exam under anesthesia if not controlled. [1][8]',
        citation: [1, 8],
        next: 'pph-bleeding-check',
        summary: '1st/2nd OK for EM; 3rd/4th/cervical → OB. Optimize exposure before repair.',
        images: [
            {
                src: 'images/pph/perineal-laceration.jpg',
                alt: 'Illustration of a postpartum perineum with a midline laceration extending through the perineal body, and an additional lateral vaginal sulcus tear',
                caption: 'Perineal laceration with sulcus tear — inspect every quadrant before assuming atony. (Hirst, A Text-Book of Obstetrics, 1898 — Public Domain.)',
            },
        ],
    },
    {
        id: 'pph-uterine-inversion',
        type: 'info',
        module: 3,
        title: 'Uterine Inversion — Emergency',
        body: '**UTERINE INVERSION — TRUE OBSTETRIC EMERGENCY**\n\nIncidence: 1 in 2,000–20,000 deliveries. Mortality reaches 15% with delayed recognition. [10]\n\n**CLINICAL CLUES**\n• Sudden, profuse hemorrhage after placental delivery\n• **Absent or dimpled fundus on abdominal palpation**\n• Bluish-gray fleshy mass visible at introitus (complete inversion) or palpable in the vagina\n• Neurogenic shock **out of proportion** to blood loss (vagal response from traction on peritoneum)\n\n**IMMEDIATE MANAGEMENT — TIME-CRITICAL**\n\n1. **STOP ALL UTEROTONICS** — contracted cervical ring prevents replacement\n2. **Call OB and anesthesia STAT** — may need general anesthesia or tocolysis\n3. **Attempt manual replacement immediately** — Johnson maneuver:\n   • Grasp the inverted uterus with the palm of the hand, fingers splayed\n   • **Push the fundus upward along the long axis of the vagina** toward the umbilicus\n   • Hold continuously until the uterus is reverted\n   • Do NOT release until uterotonics are administered to maintain tone\n\n4. **If cervical ring has formed** — use tocolysis to relax:\n   • Nitroglycerin 50-100 mcg IV push (quick, reversible) OR\n   • [Terbutaline](#/drug/terbutaline/uterine tocolysis) 0.25 mg IV/SC OR\n   • Magnesium sulfate 2-4 g IV over 5-10 min OR\n   • General anesthesia (halogenated agent) for uterine relaxation\n\n5. **Once replaced** → resume uterotonics to prevent re-inversion\n\n**IF MANUAL REPLACEMENT FAILS** → OR for operative replacement (Huntington or Haultain procedure).\n\n**Do not attempt to remove an adherent placenta before reducing the inversion** — unnecessary traction worsens the problem. [1][5][10]',
        citation: [1, 5, 10],
        next: 'pph-bleeding-check',
        summary: 'STOP uterotonics → Johnson maneuver (push fundus up) → tocolyze if needed → resume uterotonics.',
        safetyLevel: 'critical',
        images: [
            {
                src: 'images/pph/uterine-inversion.jpg',
                alt: 'Line drawing showing complete uterine inversion with the fundus protruding through the cervix into the vagina with the placenta still attached',
                caption: 'Complete uterine inversion — fundus protrudes through the cervix into the vagina. (Lusk, The Science and Art of Midwifery, 1897 — Public Domain.)',
            },
            {
                src: 'images/pph/uterine-inversion-reduction.jpg',
                alt: 'Three-panel illustration showing sequential manual reinversion of the uterus: the fundus is pushed upward along the long axis of the vagina while tocolysis relaxes the cervical ring',
                caption: 'Manual reduction of uterine inversion (Johnson maneuver lineage): push the fundus upward along the long axis of the vagina until reverted. (Hirst, 1899 — Public Domain.)',
            },
        ],
    },
    {
        id: 'pph-hematoma',
        type: 'info',
        module: 3,
        title: 'Vulvar / Paravaginal Hematoma',
        body: '**VULVAR AND PARAVAGINAL HEMATOMAS**\n\nUnlike laceration bleeding, hematomas occur from injured vessels under intact mucosa. Blood accumulates rapidly in the pelvic soft tissue and can hide significant volume loss.\n\n**CLINICAL CLUES**\n• Severe, **disproportionate** perineal or rectal pain\n• Expanding firm mass at the vulva or vaginal sidewall\n• Hemodynamic decline without visible blood loss\n• Inability to void (urethral obstruction)\n\n**MANAGEMENT**\n• **Stable, small (<5 cm), non-expanding** — pressure + ice, serial exams, analgesia; often managed conservatively with close observation\n• **Expanding or hemodynamically significant** — incise, evacuate clot, ligate bleeding vessel(s), pack, and close in OR with OB\n• **Retroperitoneal/supralevator hematoma** — may require interventional radiology (uterine artery embolization) or surgical exploration\n• Broad-spectrum antibiotics after evacuation (infection risk)\n\n**Do not ignore a "hard, painful mass" after delivery** — hematomas can conceal 1-2 L of blood with little external bleeding. [1][11]',
        citation: [1, 11],
        next: 'pph-bleeding-check',
        summary: 'Expanding mass + disproportionate pain → OR for evacuation. IR if supralevator.',
    },
    {
        id: 'pph-rupture',
        type: 'info',
        module: 3,
        title: 'Uterine Rupture',
        body: '**UTERINE RUPTURE**\n\nCatastrophic disruption of the uterine wall. Incidence 0.3-0.7% in VBAC (trial of labor after cesarean), ~0.02% in unscarred uterus. [12]\n\n**RISK FACTORS**\n• Prior C-section or uterine surgery (including myomectomy)\n• Trauma (MVC, penetrating, blunt abdominal)\n• Oxytocin augmentation, induction with prostaglandins\n• Grand multiparity, obstructed labor\n\n**CLINICAL CLUES**\n• **Severe abdominal pain** — may feel "like a pop"\n• Fetal bradycardia or loss of fetal heart tones (if antepartum)\n• **Loss of fetal station** on vaginal exam\n• Vaginal bleeding (variable; often less impressive than intra-abdominal)\n• Rapid maternal hemodynamic decline, abdominal distension\n• Free fluid on FAST (hemoperitoneum)\n\n**MANAGEMENT**\n• **OR immediately** — only definitive treatment is laparotomy\n• Activate MTP — ruptures bleed massively\n• Contact OB and surgery simultaneously\n• FAST can confirm hemoperitoneum but do not delay transport to OR\n• Anticipate hysterectomy in severe cases; repair may be possible in stable patients\n\n**This is a surgical emergency — mobilize the OR while resuscitating.** [12]',
        citation: [12],
        next: 'pph-bleeding-check',
        summary: 'Prior C-section + severe pain + loss of fetal station → OR for laparotomy. Activate MTP.',
        safetyLevel: 'critical',
    },
    {
        id: 'pph-tissue',
        type: 'info',
        module: 3,
        title: 'Tissue — Retained Products',
        body: '**RETAINED PLACENTA / PRODUCTS OF CONCEPTION**\n\n**CLINICAL CLUES**\n• Placenta appears incomplete on inspection (missing cotyledon, torn edge, ragged membranes)\n• Firm uterus but persistent bleeding\n• Placenta not delivered within 30 minutes postpartum (retained placenta by definition)\n• Bedside ultrasound: echogenic material in the uterine cavity\n\n**MANAGEMENT**\n\n**1. MANUAL EXTRACTION / EXPLORATION**\n• Adequate analgesia — regional, procedural sedation, or general anesthesia\n• Insert a gloved hand into the uterus, sweep with fingers to detach adherent placenta or fragments\n• **Stop if you encounter a plane of cleavage resistance** — suspect [placenta accreta spectrum](#/info/pph-accreta)\n• Broad-spectrum antibiotics (ampicillin + gentamicin or cefoxitin)\n\n**2. CURETTAGE (if needed)** — in OR with ultrasound guidance, blunt curette preferred over sharp\n\n**3. IF ACCRETA / INCRETA / PERCRETA SUSPECTED**\n• **DO NOT force separation** — catastrophic hemorrhage\n• Leave placenta in situ, resuscitate, transfer to OR for controlled delivery and likely hysterectomy\n• Risk factors: prior C-section (especially multiple), prior uterine surgery, placenta previa overlying scar, advanced maternal age\n\n**4. SECONDARY (LATE) PPH** — retained products are the most common cause of hemorrhage 24 hours to 6 weeks postpartum; treat with [methylergonovine](#/drug/methylergonovine/postpartum hemorrhage), antibiotics, and consider D&C with ultrasound guidance. [1][13]',
        citation: [1, 13],
        next: 'pph-bleeding-check',
        summary: 'Explore uterus manually — stop if resistance (accreta). Ultrasound-guided D&C if needed.',
        images: [
            {
                src: 'images/pph/placenta-accreta.png',
                alt: 'Side-by-side diagram of a uterus showing three types of abnormal placental invasion — accreta (attached to myometrium), increta (into myometrium), and percreta (through serosa)',
                caption: 'Placenta accreta spectrum: accreta (attached to myometrium) → increta (invades into myometrium) → percreta (penetrates serosa and can invade adjacent organs). (Wikimedia Commons — Public Domain.)',
            },
        ],
    },
    {
        id: 'pph-thrombin',
        type: 'info',
        module: 3,
        title: 'Thrombin — Coagulopathy',
        body: '**COAGULOPATHY IN PPH**\n\nLess than 1% of PPH as primary cause, but **common as a secondary complication** after massive transfusion or prolonged severe hemorrhage. Early recognition changes management.\n\n**CAUSES**\n• **Dilutional coagulopathy** — after large crystalloid or unbalanced blood product resuscitation\n• **DIC (disseminated intravascular coagulation)** — severe PPH, sepsis, abruption, intrauterine fetal demise\n• **Amniotic fluid embolism (AFE)** — cardiogenic collapse + DIC + respiratory failure, often within minutes of delivery\n• **HELLP / severe preeclampsia** — low platelets + hepatic coagulopathy\n• **Pre-existing** — vWD, hemophilia carrier, therapeutic anticoagulation\n\n**CLINICAL CLUES**\n• Oozing from IV sites, incisions, mucosal surfaces\n• Petechiae, ecchymoses\n• Hematuria\n• Non-clotting blood in the specimen tube or on drapes\n\n**LABS** — CBC, fibrinogen, PT/PTT, INR, D-dimer, thromboelastography/ROTEM if available\n\n**MANAGEMENT**\n• **Balanced transfusion — 1:1:1 pRBC:FFP:platelets** via [Massive Transfusion Protocol](#/tree/massive-transfusion)\n• **Cryoprecipitate 10 units** if fibrinogen <200 mg/dL — maintain fibrinogen >200\n• **Platelets** to maintain >50,000 (>100,000 if ongoing bleeding)\n• **Calcium gluconate 1-2 g IV** per every 4 units blood (citrate chelation)\n• **Keep warm** — hypothermia triples coagulopathy severity\n• **Correct acidosis** — pH <7.2 impairs clotting\n• **TXA** — already given if within 3h of delivery onset\n• **AFE** — supportive, consider ECMO, hysterectomy; mortality ~40% [1][14]\n\n**The lethal triad: hypothermia + acidosis + coagulopathy** — treat all three. [6]',
        citation: [1, 6, 14],
        next: 'pph-bleeding-check',
        summary: 'Oozing + labs (fibrinogen <200) → 1:1:1 MTP + cryo + Ca + keep warm. Treat lethal triad.',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 4: UTEROTONIC LADDER (Atony branch)
    // =====================================================================
    {
        id: 'pph-atony-intro',
        type: 'info',
        module: 4,
        title: 'Uterine Atony — Start the Ladder',
        body: '[Uterotonic Ladder Reference](#/info/pph-uterotonic-ladder) — full comparison with contraindications.\n\n**Boggy uterus = atony = #1 cause of PPH (70-80%).**\n\n**MECHANICAL MEASURES** (continue while starting meds)\n• Fundal massage (ongoing)\n• Bimanual compression\n• Empty bladder (Foley)\n\n**UTEROTONIC LADDER — escalate every 5-10 minutes if bleeding uncontrolled:**\n\n1. **[Oxytocin](#/drug/oxytocin/postpartum hemorrhage)** — first-line (already running for prevention)\n2. **[Methylergonovine (Methergine)](#/drug/methylergonovine/postpartum hemorrhage)** — 2nd line — **AVOID in HTN, preeclampsia**\n3. **[Carboprost (Hemabate)](#/drug/carboprost/postpartum hemorrhage)** — 3rd line — **AVOID in asthma, pulmonary HTN**\n4. **[Misoprostol](#/drug/misoprostol/postpartum hemorrhage)** — adjunct/alternative — few contraindications\n\n**Use medications in parallel with mechanical measures and TXA — not sequentially.** [1][5][8]',
        citation: [1, 5, 8],
        next: 'pph-oxytocin',
        summary: '4-drug ladder: Oxytocin → Methergine (avoid HTN) → Hemabate (avoid asthma) → Miso. Use in parallel with mechanical measures.',
    },
    {
        id: 'pph-oxytocin',
        type: 'info',
        module: 4,
        title: 'Oxytocin (Pitocin) — First Line',
        body: '**[Oxytocin (Pitocin)](#/drug/oxytocin/postpartum hemorrhage)** — first-line uterotonic in every PPH.\n\n**DOSE**\n• **20 units in 1 L NS or LR — infuse at 250 mL/hr** (≈10 mU/min)\n• Alternative if no IV access: **10 units IM**\n• **NEVER give IV push** — causes profound hypotension and can trigger cardiac arrest\n\n**MAX** 40 units / 500 mL (higher concentrations trigger hypotension)\n\n**CAUTIONS**\n• Water intoxication with prolonged high-dose infusion (antidiuretic effect)\n• Hypotension with rapid bolus\n\n**ASSESS IN 5-10 MINUTES**\n• Uterus firm? → Continue infusion, monitor\n• Still boggy / still bleeding → **escalate to Methylergonovine** [1][8]',
        citation: [1, 8],
        next: 'pph-methergine-check',
        summary: '20u in 1L NS at 250 mL/hr (or 10u IM). NEVER IV push. Reassess in 5-10 min.',
        treatment: {
            firstLine: {
                drug: 'Oxytocin',
                dose: '20 units in 1L NS or LR',
                route: 'IV infusion',
                frequency: '250 mL/hr (~10 mU/min)',
                duration: 'Until uterine tone maintained',
                notes: 'Never IV push — causes profound hypotension. Alternative: 10 units IM if no IV.',
            },
            monitoring: 'Uterine tone every 5 min, vital signs, urine output. If still boggy at 5-10 min → escalate.',
        },
    },
    {
        id: 'pph-methergine-check',
        type: 'question',
        module: 4,
        title: 'Second-Line — HTN / Preeclampsia?',
        body: '**Before giving methylergonovine**, screen for the key contraindication:\n\n**METHYLERGONOVINE CONTRAINDICATIONS**\n• Hypertension (any SBP ≥140 or DBP ≥90)\n• Preeclampsia, eclampsia, HELLP\n• Coronary artery disease (vasoconstriction risk)\n• Raynaud\'s phenomenon\n\nMethylergonovine causes significant vasoconstriction and has triggered MI, CVA, and severe hypertensive emergencies when misused in these patients.',
        options: [
            {
                label: 'No HTN, no preeclampsia, no CAD — safe to give',
                description: 'Proceed to methylergonovine',
                next: 'pph-methergine',
            },
            {
                label: 'HTN / preeclampsia / CAD present — CANNOT give',
                description: 'Skip to misoprostol or check carboprost',
                next: 'pph-carboprost-check',
            },
        ],
        summary: 'Methergine CI: HTN, preeclampsia, CAD, Raynaud. If any present → skip to Hemabate/Miso.',
    },
    {
        id: 'pph-methergine',
        type: 'info',
        module: 4,
        title: 'Methylergonovine (Methergine)',
        body: '**[Methylergonovine (Methergine)](#/drug/methylergonovine/postpartum hemorrhage)** — ergot alkaloid uterotonic.\n\n**DOSE**\n• **0.2 mg IM** — onset 2-5 minutes, duration 3 hours\n• May **repeat every 2-4 hours** as needed, maximum 5 doses (1 mg total)\n• **NEVER give IV** — severe hypertensive reactions, MI, CVA reported\n\n**CONTRAINDICATIONS** (re-verify)\n• Hypertension / preeclampsia / eclampsia\n• CAD, recent MI, CVA\n• Raynaud\'s\n• Sepsis (risk of vasospasm, gangrene)\n\n**ADVERSE EFFECTS**\n• Nausea, vomiting (give antiemetic prophylactically)\n• Transient HTN (expected; significant HTN is pathologic)\n• Coronary vasospasm → chest pain\n\n**ASSESS IN 5-10 MINUTES**\n• Uterus firm + bleeding controlled → monitor\n• Still bleeding → **escalate to Carboprost (Hemabate)**. May also repeat methylergonovine q2-4h as adjunct.',
        citation: [1, 8],
        next: 'pph-carboprost-check',
        summary: '0.2 mg IM, may repeat q2-4h (max 5 doses). NEVER IV. Reassess in 5-10 min.',
        treatment: {
            firstLine: {
                drug: 'Methylergonovine (Methergine)',
                dose: '0.2 mg',
                route: 'IM',
                frequency: 'q2-4h PRN, max 5 doses',
                duration: 'Short-term — single dose often sufficient',
                notes: 'NEVER IV. CONTRAINDICATED in HTN, preeclampsia, CAD, Raynaud, sepsis.',
            },
            monitoring: 'BP (check before each dose), uterine tone, nausea.',
        },
        safetyLevel: 'warning',
    },
    {
        id: 'pph-carboprost-check',
        type: 'question',
        module: 4,
        title: 'Third-Line — Asthma / Pulmonary HTN?',
        body: '**Before giving carboprost (Hemabate)**, screen for the key contraindication:\n\n**CARBOPROST CONTRAINDICATIONS**\n• **Asthma (active or history) — absolute CI** (causes bronchospasm, can trigger fatal attack)\n• Pulmonary hypertension\n• Significant cardiac, renal, or hepatic disease\n• Active pelvic inflammatory disease\n\nCarboprost is a PGF2α analog. Bronchoconstriction is the most dangerous adverse effect.',
        options: [
            {
                label: 'No asthma, no pulmonary HTN — safe to give',
                description: 'Proceed to carboprost',
                next: 'pph-carboprost',
            },
            {
                label: 'Asthma or pulm HTN present — CANNOT give',
                description: 'Skip to misoprostol',
                next: 'pph-misoprostol',
            },
        ],
        summary: 'Hemabate CI: asthma (absolute), pulmonary HTN, severe cardiac/hepatic disease.',
    },
    {
        id: 'pph-carboprost',
        type: 'info',
        module: 4,
        title: 'Carboprost (Hemabate)',
        body: '**[Carboprost (Hemabate)](#/drug/carboprost/postpartum hemorrhage)** — 15-methyl PGF2α analog.\n\n**DOSE**\n• **0.25 mg (250 mcg) IM** — into the deltoid or vastus lateralis\n• **May repeat every 15-90 minutes** to a maximum of **8 doses (2 mg total)**\n• Onset: 3-5 minutes; duration ~2 hours\n• **Intramyometrial dosing** (by OB during laparotomy) also effective — 0.25 mg directly into the myometrium\n\n**CONTRAINDICATIONS** (re-verify)\n• **Asthma (any history) — absolute**\n• Pulmonary hypertension\n• Active hepatic, pulmonary, cardiac, or renal disease\n\n**ADVERSE EFFECTS (~20-30% of patients)**\n• **Bronchospasm** (stop immediately if wheezing develops)\n• Nausea, vomiting, diarrhea (common — premedicate with antiemetic and antidiarrheal)\n• Fever and flushing\n• Hypertension\n• Uterine hyperstimulation\n\n**ASSESS IN 15 MINUTES**\n• Bleeding controlled → monitor and continue scheduled doses as needed\n• Still bleeding despite uterotonics → **escalate to misoprostol + advanced interventions ([Bakri balloon](#/node/pph-bakri))**. [1][8]',
        citation: [1, 8],
        next: 'pph-misoprostol',
        summary: '0.25 mg IM q15-90 min (max 8 doses = 2 mg). ABSOLUTE CI: asthma. Causes GI side effects.',
        treatment: {
            firstLine: {
                drug: 'Carboprost (Hemabate)',
                dose: '0.25 mg (250 mcg)',
                route: 'IM (or intramyometrial)',
                frequency: 'q15-90 min PRN, max 8 doses (2 mg)',
                duration: 'Short-term',
                notes: 'ABSOLUTE CI: asthma. Premedicate with ondansetron + loperamide for GI side effects.',
            },
            monitoring: 'Uterine tone, respiratory exam (bronchospasm), temperature, BP.',
        },
        safetyLevel: 'warning',
    },
    {
        id: 'pph-misoprostol',
        type: 'info',
        module: 4,
        title: 'Misoprostol (Cytotec)',
        body: '**[Misoprostol (Cytotec)](#/drug/misoprostol/postpartum hemorrhage)** — synthetic PGE1 analog. Useful when other uterotonics are contraindicated (HTN + asthma).\n\n**DOSE**\n• **800-1000 mcg PR (rectal) or SL (sublingual)** — single dose\n• Onset: 10-15 minutes rectally, faster SL\n• Cheap, shelf-stable, does not require refrigeration — widely used globally\n\n**CONTRAINDICATIONS**\n• Known hypersensitivity to prostaglandins — essentially none other than this\n• **No contraindication in HTN, preeclampsia, asthma, or cardiac disease** — fills the gap left by methylergonovine and carboprost\n\n**ADVERSE EFFECTS**\n• **Fever, shivering** — very common (~30-50%); not infection\n• Diarrhea\n• Nausea, vomiting\n\n**EVIDENCE**\n• WHO recommends for PPH in settings where injectable uterotonics are unavailable\n• Less effective than oxytocin as first-line but valuable as an adjunct or when other agents CI\n\n**REASSESS BLEEDING**\n\nIf bleeding persists despite **mechanical measures + TXA + full uterotonic ladder** → **advanced interventions**.',
        citation: [1, 8, 15],
        next: 'pph-bleeding-check',
        summary: '800-1000 mcg PR or SL. Few CIs — useful when HTN + asthma block other agents. Fever/shivering common.',
        treatment: {
            firstLine: {
                drug: 'Misoprostol (Cytotec)',
                dose: '800-1000 mcg',
                route: 'PR or SL',
                frequency: 'Single dose',
                duration: '-',
                notes: 'No major contraindications. Fever and shivering expected — not infection.',
            },
            monitoring: 'Uterine tone, temperature, bleeding volume.',
        },
    },
    // =====================================================================
    // MODULE 5: ADVANCED INTERVENTIONS
    // =====================================================================
    {
        id: 'pph-bleeding-check',
        type: 'question',
        module: 5,
        title: 'Reassess — Bleeding Controlled?',
        body: 'After mechanical measures + TXA + targeted 4T\'s treatment, reassess:\n\n**CONTROLLED**\n• Uterus firm\n• Bleeding <100 mL in last 15 minutes\n• Vital signs stabilizing or normalized\n• No expanding hematoma\n\n**UNCONTROLLED / ONGOING**\n• Any of: persistent heavy bleeding, worsening shock, cumulative EBL ≥1500 mL, ongoing transfusion need, falling fibrinogen\n• Escalate to **advanced interventions**.',
        options: [
            {
                label: 'Controlled — bleeding has stopped',
                description: 'Transition to monitoring',
                next: 'pph-post-monitoring',
            },
            {
                label: 'Ongoing or recurrent bleeding',
                description: 'Escalate: Bakri, MTP, OR/IR',
                next: 'pph-bakri',
                urgency: 'urgent',
            },
        ],
        summary: 'Controlled = firm uterus, <100 mL/15 min. Ongoing → advanced interventions.',
    },
    {
        id: 'pph-bakri',
        type: 'info',
        module: 5,
        title: 'Bakri Balloon — Intrauterine Tamponade',
        body: '[Bakri Balloon Placement Guide](#/info/pph-bakri-technique) — detailed step-by-step.\n\n**Bakri balloon** is the first-line advanced intervention when uterotonics fail. Success rate **75-86%** for atony, reducing the need for hysterectomy. [16]\n\n**INDICATIONS**\n• Persistent uterine atony despite maximal medical therapy\n• Bleeding from lower uterine segment (placental site after previa)\n• Temporizing measure during transport to OR or IR\n\n**CONTRAINDICATIONS**\n• Known uterine anomaly preventing balloon placement\n• Uterine rupture\n• Active uterine infection\n\n**TECHNIQUE (SUMMARY)**\n1. Empty bladder (Foley)\n2. Visualize cervix with speculum\n3. Insert deflated Bakri into uterine cavity under ultrasound guidance\n4. **Inflate with 300-500 mL sterile saline** (max 500 mL — Bakri)\n5. Apply gentle downward traction on drainage port and secure balloon stem to thigh\n6. **Monitor drainage port** — >100 mL/hr of ongoing bloody drainage = tamponade failure → escalate\n7. Continue oxytocin infusion\n8. Antibiotics (ampicillin-sulbactam or cefazolin)\n9. **Leave in place 12-24 hours**, then deflate in a controlled setting\n\n**ALTERNATIVES** if no Bakri available: Foley catheter (30-60 mL balloon, less effective), Sengstaken-Blakemore tube, or manually-packed gauze.\n\n**If bleeding continues despite Bakri → OR / Interventional Radiology.** [1][16]',
        citation: [1, 16],
        next: 'pph-mtp',
        summary: 'Bakri 300-500 mL saline under US — 75-86% success. >100 mL/hr drainage = failure.',
        safetyLevel: 'warning',
    },
    {
        id: 'pph-mtp',
        type: 'info',
        module: 5,
        title: 'Activate Massive Transfusion Protocol',
        body: '**When to activate [Massive Transfusion Protocol (MTP)](#/tree/massive-transfusion):**\n• Ongoing hemorrhage after 2 units pRBC without control\n• Shock Index >1.0 with active bleeding\n• Cumulative EBL ≥1500 mL with ongoing transfusion need\n• Hemodynamic collapse (SBP <90 or lactate >4)\n• Cardiac arrest from hemorrhage (cPR with ongoing transfusion)\n\n**RATIO**\n• **1:1:1** pRBC : FFP : platelets (or closest institutional equivalent)\n• Cryoprecipitate 10 units if fibrinogen <200 mg/dL (keep >200)\n\n**ADJUNCTS**\n• **Calcium gluconate 1-2 g IV** per 4 units of citrated blood (prevents hypocalcemic cardiovascular collapse)\n• **Keep warm** — fluid warmer, Bair Hugger, warm blankets\n• **Correct acidosis** (pH <7.2 cripples clotting factors)\n• **[Tranexamic Acid](#/drug/tranexamic-acid/postpartum hemorrhage)** 1 g IV (if not already given within 3h of delivery)\n\n**ROTEM / TEG** if available — guides targeted factor/product replacement. **Empiric balanced resuscitation is the standard** in the first wave.\n\n**LETHAL TRIAD** — hypothermia, acidosis, coagulopathy — treat all three aggressively. [6][9]',
        citation: [6, 9],
        next: 'pph-surgical',
        summary: '1:1:1 pRBC:FFP:plts; cryo if fib <200; Ca per 4u blood; TXA + warm + correct pH. Treat lethal triad.',
        safetyLevel: 'critical',
    },
    {
        id: 'pph-surgical',
        type: 'info',
        module: 5,
        title: 'Surgical & Interventional Options',
        body: '**If bleeding persists despite uterotonics + Bakri + MTP → definitive intervention.**\n\n**INTERVENTIONAL RADIOLOGY**\n• **Uterine artery embolization (UAE)** — fertility-preserving; ideal for stable-enough-to-transport patient\n• Success rate ~80-90%\n• Requires rapid access to IR suite — not a solution for the crashing patient\n\n**SURGICAL (in OR with OB)**\n• **B-Lynch compression suture** — vertical suture compresses uterine body; preserves fertility; 80%+ success for atony\n• **Uterine artery ligation (O\'Leary)** — stepwise ligation of uterine → utero-ovarian → internal iliac arteries\n• **Hypogastric (internal iliac) artery ligation** — reduces pelvic pulse pressure ~85%\n• **Hysterectomy** — **definitive** treatment when above fail; **indicated without delay** for placenta accreta spectrum, catastrophic rupture, or refractory atony\n\n**DECISION POINT**\n• Stable, transportable, fertility-preserving desired → **IR / B-Lynch**\n• Unstable, catastrophic, or accreta → **hysterectomy** — do not delay out of fertility preservation at the cost of maternal life\n\n**Call early.** OR and IR both have setup times measured in tens of minutes. Activating them before the patient is in extremis saves lives. [1][8][17]',
        citation: [1, 8, 17],
        next: 'pph-massive-reassess',
        summary: 'IR (UAE) for stable; B-Lynch, O\'Leary, hypogastric ligation; hysterectomy for refractory/accreta.',
        images: [
            {
                src: 'images/pph/gray667-pelvic-arteries.png',
                alt: 'Line drawing of the female pelvic arterial tree showing internal iliac, uterine, and ovarian arteries posterior to the pelvic organs',
                caption: 'Female pelvic arterial supply — the internal iliac, uterine, and ovarian arteries are the key targets for stepwise surgical ligation and embolization. (Gray\'s Anatomy, Plate 667 — Public Domain.)',
            },
        ],
    },
    {
        id: 'pph-massive-reassess',
        type: 'question',
        module: 5,
        title: 'Definitive Control?',
        body: 'After escalation to surgical or interventional management, reassess:\n\n**CONTROLLED**\n• Bleeding stopped\n• Hemodynamics improving\n• Transfusion requirements decreasing\n\n**REFRACTORY**\n• Ongoing bleeding despite uterotonics + Bakri + MTP + IR/OR\n• **Proceed to hysterectomy** — this is the final life-saving step',
        options: [
            {
                label: 'Bleeding controlled after intervention',
                description: 'Transition to ICU monitoring',
                next: 'pph-controlled',
            },
            {
                label: 'Refractory — hysterectomy needed',
                description: 'Definitive surgical treatment',
                next: 'pph-hysterectomy',
                urgency: 'critical',
            },
        ],
        summary: 'Controlled → ICU. Refractory despite everything → hysterectomy is the final step.',
    },
    {
        id: 'pph-hysterectomy',
        type: 'info',
        module: 5,
        title: 'Peripartum Hysterectomy',
        body: '**Peripartum hysterectomy — the final life-saving step.**\n\nIncidence: ~1 in 1000 deliveries; the most common indication is **placenta accreta spectrum**, followed by refractory atony, rupture, and lacerations. [17]\n\n**INDICATIONS (any one triggers operative discussion)**\n• Refractory hemorrhage despite all conservative and fertility-preserving measures\n• Placenta accreta / increta / percreta\n• Uterine rupture with extensive injury\n• Broad ligament or cervical lacerations not amenable to repair\n\n**OPTIONS**\n• **Supracervical (subtotal)** — faster, less morbidity; reserves when patient is crashing\n• **Total hysterectomy** — required for cervical or lower segment bleeding\n\n**COUNSELING** (when time permits)\n• Loss of fertility — confirm patient understanding if conscious\n• Document the indication clearly — imminent mortality without surgery\n• In unconscious/unstable patients: proceed based on life-saving indication with two-physician consent per institutional policy\n\n**DO NOT DELAY** peripartum hysterectomy out of inappropriate attachment to fertility preservation when the patient\'s life is threatened. Maternal mortality rises sharply with every additional hour of uncontrolled hemorrhage. [17][18]',
        citation: [17, 18],
        next: 'pph-uncontrolled',
        summary: 'Final step when all else fails. Supracervical faster; total needed for lower-segment bleeding.',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'pph-post-monitoring',
        type: 'info',
        module: 6,
        title: 'Post-PPH Monitoring',
        body: '**After bleeding is controlled, intensive monitoring for 4-24 hours.** Late decompensation and re-bleeding are common.\n\n**MONITORING**\n• Vital signs every 15 minutes × 1 hour, then q30 min × 2 hours, then hourly × 24 hours\n• **Uterine tone checks** every 15 min × 1 hour, then hourly — recurrent atony triggers re-bleeding\n• Foley catheter strict I/O — urine output goal >30 mL/hr\n• CBC, fibrinogen, coags at 2-4 hours\n• Continuous pulse ox, telemetry\n\n**LABS**\n• Repeat CBC in 2-4 hours to confirm hemoglobin stabilization\n• Fibrinogen trend — continued decline predicts re-bleeding\n• Lactate trend — clearance in 2-4 hours\n\n**ONGOING MEDS**\n• [Oxytocin](#/drug/oxytocin/postpartum hemorrhage) infusion continued for 4-24 hours\n• Methylergonovine q4-6h for 24 hours if atony was the cause (and no HTN)\n• Iron supplementation once stable\n• **VTE prophylaxis** (mechanical, delay pharmacologic until hemostasis confirmed and fibrinogen >200) — PPH dramatically increases post-partum VTE risk\n\n**ADMIT**\n• ICU if transfused ≥4 units, hysterectomy, or persistent instability\n• Step-down / L&D with close monitoring for controlled PPH with stable vitals [1][5]',
        citation: [1, 5],
        next: 'pph-rh-check',
        summary: 'VS q15min ×1h → q30 ×2h → hourly ×24h. Oxytocin infusion 4-24h. Repeat CBC/fibrinogen 2-4h.',
    },
    {
        id: 'pph-rh-check',
        type: 'info',
        module: 6,
        title: 'Rh Status & Other Postpartum Care',
        body: '**RH IMMUNE GLOBULIN (RhoGAM)**\n• All **Rh-negative mothers with Rh-positive or unknown newborn** should receive **[Rh Immune Globulin](#/drug/rh-immune-globulin/rh negative postpartum) 300 mcg IM within 72 hours of delivery**\n• Even if mother was previously sensitized, standard of care is to give — consult OB\n• Larger doses if large fetomaternal hemorrhage suspected (Kleihauer-Betke test guides dosing)\n\n**ANTIBIOTIC PROPHYLAXIS**\n• Following manual placental extraction, uterine exploration, Bakri balloon, or laceration repair\n• Single dose cefazolin or ampicillin-sulbactam, or extend for 24 hours if instrumentation\n\n**THROMBOPROPHYLAXIS**\n• Pregnancy is hypercoagulable; PPH + immobility + large transfusion dramatically increases VTE risk\n• **Mechanical (SCDs)** immediately\n• **Pharmacologic (enoxaparin)** — start once hemostasis confirmed and fibrinogen ≥200, typically 12-24 hours post-bleeding\n\n**MENTAL HEALTH**\n• Severe PPH is associated with post-traumatic stress and postpartum depression\n• Acknowledge the experience with the patient when she is awake and stable\n• Lactation support; newborn bonding often disrupted — coordinate with pediatrics and nursing',
        citation: [1, 5, 19],
        next: 'pph-controlled',
        summary: 'RhoGAM if Rh-neg mom w/in 72h; abx after instrumentation; mechanical VTE prophylaxis immediately.',
        skippable: true,
    },
    {
        id: 'pph-controlled',
        type: 'result',
        module: 6,
        title: 'PPH Controlled — Disposition',
        body: '**Postpartum hemorrhage controlled with appropriate measures.**\n\n[PPH Discharge Instructions](#/info/pph-discharge) — shareable return precautions for once the patient is ready for discharge or transfer to the postpartum unit.\n\n**DISPOSITION**\n• **ICU admission** if: ≥4 units transfused, hysterectomy, hemodynamic instability, coagulopathy, AFE, or requiring vasopressors\n• **Step-down / OB unit** if: controlled bleeding, stable vitals, <4 units transfused, no ongoing organ dysfunction\n\n**24-HOUR MANAGEMENT GOALS**\n• Hemodynamic stability off vasopressors\n• Uterus firm and not re-bleeding\n• Hemoglobin stable (trend)\n• Fibrinogen >200 mg/dL\n• Urine output >30 mL/hr\n• VTE prophylaxis started once hemostatic\n\n**DOCUMENT**\n• Estimated blood loss (cumulative)\n• Interventions performed and their timing\n• Products transfused (pRBC, FFP, platelets, cryo, factors)\n• Primary cause (Tone / Trauma / Tissue / Thrombin)\n• Consultants involved (OB, anesthesia, IR, blood bank)\n• Debrief team after stabilization — quality improvement, emotional processing\n\n**FOLLOW-UP**\n• OB follow-up in 1-2 weeks\n• Lactation support\n• Postpartum depression screening\n• Iron supplementation as needed',
        recommendation: 'PPH controlled. Admit to ICU if ≥4 units transfused, hysterectomy, or instability; otherwise step-down / L&D. Continue oxytocin infusion 4-24h. Repeat labs at 2-4h. VTE prophylaxis (mechanical immediate, pharmacologic once hemostasis confirmed). Document cause, interventions, timing, team. OB follow-up 1-2 weeks.',
        confidence: 'recommended',
        citation: [1, 5, 8],
    },
    {
        id: 'pph-uncontrolled',
        type: 'result',
        module: 6,
        title: 'Refractory PPH — OR / Hysterectomy',
        body: '**Refractory postpartum hemorrhage despite full medical, mechanical, and initial surgical measures.**\n\n**DEFINITIVE SURGICAL MANAGEMENT — OR NOW**\n\n**PROCEED WITH:**\n• **Peripartum hysterectomy** (supracervical if crashing; total for lower-segment or cervical bleeding)\n• Anticipated blood product requirements: ≥10 units pRBC, matching FFP and platelets, cryoprecipitate\n• Continued TXA, calcium replacement, warming\n• Anticipate post-operative ICU with mechanical ventilation, vasopressor support\n\n**AFTER SURGICAL CONTROL**\n• ICU for ongoing resuscitation, ventilator support, monitoring for organ injury\n• Serial labs q4-6h: CBC, fibrinogen, coags, lactate, ABG\n• Continue balanced transfusion until hemodynamics, coagulation, and fibrinogen stabilize\n• Early VTE prophylaxis (mechanical, then pharmacologic once stable)\n• Infection prophylaxis — broad-spectrum antibiotics ×24-48h after surgery\n\n**DEBRIEF**\n• Multidisciplinary debrief within 24 hours\n• Institutional PPH review — track metrics (time to TXA, MTP activation, time to hysterectomy)\n• Emotional support for patient, family, and team — severe PPH is traumatic for everyone present',
        recommendation: 'Refractory PPH → OR for peripartum hysterectomy. Continue MTP, TXA, calcium, warming. Post-op ICU with ventilator support, vasopressors, q4-6h labs. Multidisciplinary debrief within 24 hours.',
        confidence: 'definitive',
        citation: [1, 8, 17, 18],
    },
];
export const PPH_NODE_COUNT = PPH_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const PPH_MODULE_LABELS = [
    'Recognition & Call for Help',
    'Immediate Measures',
    '4 T\'s Differential',
    'Uterotonic Ladder',
    'Advanced Interventions',
    'Disposition',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const PPH_CITATIONS = [
    { num: 1, text: 'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186. Reaffirmed 2023. https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2017/10/postpartum-hemorrhage' },
    { num: 2, text: 'Bienstock JL, Eke AC, Hueppchen NA. Postpartum Hemorrhage. N Engl J Med. 2021;384(17):1635-1645. https://www.nejm.org/doi/full/10.1056/NEJMra1513247' },
    { num: 3, text: 'El Ayadi AM, et al. Combined Analysis of the Predictive Accuracy of the Shock Index in Postpartum Hemorrhage. PLoS One. 2016;11(2):e0148729.' },
    { num: 4, text: 'Sohn CH, et al. Prognostic value of the shock index for postpartum hemorrhage. Int J Gynaecol Obstet. 2013;123(2):116-120.' },
    { num: 5, text: 'California Maternal Quality Care Collaborative (CMQCC). Obstetric Hemorrhage Toolkit Version 3.0. 2022. https://www.cmqcc.org/resources-tool-kits/toolkits/ob-hemorrhage-toolkit' },
    { num: 6, text: 'Collins PW, et al. Fibrinogen in Postpartum Hemorrhage. Blood. 2014;124(11):1727-1736.' },
    { num: 7, text: 'WOMAN Trial Collaborators. Effect of early tranexamic acid administration on mortality, hysterectomy, and other morbidities in women with post-partum haemorrhage (WOMAN): an international, randomised, double-blind, placebo-controlled trial. Lancet. 2017;389(10084):2105-2116. https://pubmed.ncbi.nlm.nih.gov/28456509/' },
    { num: 8, text: 'WHO Recommendations for the Prevention and Treatment of Postpartum Haemorrhage. World Health Organization; 2012, 2017 update. https://www.who.int/publications/i/item/9789241548502' },
    { num: 9, text: 'Society for Obstetric Anesthesia and Perinatology (SOAP) Consensus Statement on Obstetric Hemorrhage. Anesth Analg. 2019;129(2):458-465.' },
    { num: 10, text: 'Leal RF, et al. Acute Postpartum Uterine Inversion: A Review. Obstet Gynecol Surv. 2014;69(10):589-598.' },
    { num: 11, text: 'Rani PR, Begum J. Recent Advances in the Management of Major Postpartum Haemorrhage — A Review. J Clin Diagn Res. 2017;11(2):QE01-QE05.' },
    { num: 12, text: 'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019;133(2):e110-e127.' },
    { num: 13, text: 'Jauniaux E, et al. FIGO Consensus Guidelines on Placenta Accreta Spectrum Disorders. Int J Gynaecol Obstet. 2018;140(3):291-298.' },
    { num: 14, text: 'Pacheco LD, et al. Amniotic Fluid Embolism: Diagnosis and Management. Am J Obstet Gynecol. 2016;215(2):B16-B24.' },
    { num: 15, text: 'Blum J, et al. Treatment of Postpartum Hemorrhage with Sublingual Misoprostol versus Oxytocin in Women Not Exposed to Oxytocin During Labour. Lancet. 2010;375(9710):217-223.' },
    { num: 16, text: 'Aibar L, et al. Bakri Balloon for the Management of Postpartum Hemorrhage. Acta Obstet Gynecol Scand. 2013;92(4):465-467.' },
    { num: 17, text: 'B-Lynch C, et al. The B-Lynch Surgical Technique for the Control of Massive Postpartum Haemorrhage. Br J Obstet Gynaecol. 1997;104(3):372-375.' },
    { num: 18, text: 'Shields LE, et al. Comprehensive Maternal Hemorrhage Protocols Reduce the Use of Blood Products and Improve Patient Safety. Am J Obstet Gynecol. 2015;212(3):272-280.' },
    { num: 19, text: 'ACOG Committee Opinion No. 736: Optimizing Postpartum Care. Obstet Gynecol. 2018;131(5):e140-e150.' },
];
