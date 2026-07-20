// MedKitt — Acute Lymphadenopathy / Swollen Glands Hub (type: 'hub')
//
// Enlarged nodes span benign reactive adenitis to hematologic malignancy, deep-space infection
// with airway risk, and HIV seroconversion. Localized vs generalized + B-symptoms drives the split.
//
// 5-Module rule-in/rule-out skeleton:
//   1. Sick Check
//   2. Rule In / Rule Out — per-pattern chains: entry -> gate(s) -> verdict
//   3. Rescue / Reassess (initial workup bundle)
//   4. Imaging
//   5. Disposition
//
// EBM-only citations. NOTE: malignancy (lymphoma/leukemia), Kawasaki, EBV mono, and cat-scratch
// do not yet have deep-dive consults; those verdicts route to explicit plain-text guidance and are
// logged as consult gaps for /build-consult.
export const LYMPHADENOPATHY_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check
    // ============================================================
    {
        id: 'lad-start',
        type: 'info',
        module: 1,
        title: 'Acute Lymphadenopathy — Sick Check First',
        body: '**\u26A0\uFE0F Most swollen glands are benign reactive nodes. But screen for the dangerous ones:**\n1. **Airway-threatening deep-space infection** \u2014 suppurative node + trismus, drooling, stridor, "hot-potato" voice, neck swelling / torticollis.\n2. **Sepsis from a suppurative source** \u2014 fever + toxic appearance + fluctuant node.\n3. **New hematologic malignancy** \u2014 hard / fixed / matted / painless nodes + B-symptoms (fever, drenching night sweats, >10% weight loss); a rapidly enlarging node with SVC features (facial swelling, distended neck veins) is an oncologic emergency.\n4. **Acute HIV (retroviral syndrome)** \u2014 generalized adenopathy + fever + rash + pharyngitis + risk exposure.\n\n**First 60 seconds:**\n- **Airway / breathing** \u2014 stridor, voice change, trismus, drool? If yes, protect the airway and treat as deep-neck space infection immediately.\n- **Vitals** \u2014 fever, tachycardia, hypotension (sepsis)?\n- **The node itself** \u2014 solitary vs generalized; tender/mobile (reactive/infective) vs hard/fixed/matted/painless (malignant); overlying erythema + fluctuance (abscess); supraclavicular (always concerning \u2014 high malignancy yield).\n\n**If airway threat or sepsis physiology:** resuscitate / secure the airway in parallel \u2014 do not funnel down a "swollen gland" pathway.\n\n**If stable:** go to Rule In / Rule Out.',
        citation: [1, 2],
        next: 'lad-triage',
        summary: 'Sick check: airway (deep-space infection), sepsis, malignancy red flags, acute HIV. Resuscitate/secure airway in parallel if unstable.',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Rule In / Rule Out
    // ============================================================
    {
        id: 'lad-triage',
        type: 'question',
        module: 2,
        title: 'Rule In / Rule Out — Pattern & Danger First',
        body: 'Characterize the node pattern and hunt the dangerous causes to an explicit verdict, one at a time. Excluded loops back here for the next branch.\n\n**Key discriminators:** localized vs generalized \u00B7 tender/mobile vs hard/fixed/matted \u00B7 B-symptoms present? \u00B7 supraclavicular (concerning) \u00B7 duration (>2\u20134 wk persistent = workup) \u00B7 age (new persistent adenopathy in >40 raises malignancy pretest).',
        options: [
            { label: 'Suppurative node + airway / deep-space features', description: 'Trismus, stridor, neck swelling \u2014 airway first', next: 'lad-deepneck-entry', urgency: 'critical' },
            { label: 'Malignancy phenotype (hard/fixed/matted + B-symptoms or supraclav)', description: 'Lymphoma / leukemia / metastasis workup', next: 'lad-malignancy-entry', urgency: 'urgent' },
            { label: 'Acute HIV / generalized adenopathy + risk', description: 'Fever + rash + pharyngitis + exposure', next: 'lad-hiv-entry', urgency: 'urgent' },
            { label: 'Subacute constitutional (TB / chronic)', description: 'Weeks of fever, sweats, weight loss, cough', next: 'lad-tb-entry', urgency: 'urgent' },
            { label: 'Reactive to local infection (pharyngitis / skin)', description: 'Tender mobile node + obvious local source', next: 'lad-reactive-entry', urgency: 'routine' },
            { label: 'Pediatric suppurative adenitis / Kawasaki phenotype', description: 'Child: unilateral tender node vs \u22655-day fever criteria', next: 'lad-peds-entry', urgency: 'urgent' },
            { label: 'None fit — well-appearing, undifferentiated', description: 'Initial workup bundle + reassess', next: 'lad-rescue' },
        ],
        citation: [1, 2],
        summary: 'Characterize node pattern; walk the dangerous branch to a verdict. Excluded loops back.',
        safetyLevel: 'warning',
    },
    // -------------------- DEEP NECK / SUPPURATIVE --------------------
    {
        id: 'lad-deepneck-entry',
        type: 'question',
        module: 2,
        title: 'Suppurative Node — Airway / Deep-Space Gate',
        body: 'A fluctuant, rapidly enlarging, or hot tender node with **trismus, dysphagia, drooling, stridor, torticollis, or "hot-potato" voice** is a deep-neck-space infection until proven otherwise (peritonsillar, retropharyngeal, submandibular / Ludwig angina).',
        options: [
            { label: 'Airway signs, trismus, or systemic toxicity', description: 'Deep-space infection \u2014 airway + antibiotics now', next: 'lad-deepneck-verdict', urgency: 'critical' },
            { label: 'Small fluctuant node, no airway threat, well', description: 'Simple abscess / adenitis \u2014 drain + antibiotics, move on', next: 'lad-deepneck-excluded', urgency: 'routine' },
        ],
        citation: [3],
        summary: 'Airway signs / trismus / toxicity = deep-space emergency; small fluctuant node no airway threat = simple.',
        safetyLevel: 'critical',
    },
    {
        id: 'lad-deepneck-verdict',
        type: 'result',
        module: 2,
        title: 'Deep Neck Space Infection — Treat',
        body: 'Open [Deep Neck Infection](#/tree/deep-neck-infection).\n\n**Next 5 minutes:**\n- **Protect the airway first** \u2014 anticipate a difficult airway; involve anesthesia / ENT early; have a surgical-airway plan.\n- **Broad-spectrum IV antibiotics** covering oral flora: ampicillin-sulbactam 3 g IV, or clindamycin; add MRSA coverage (vancomycin) if risk.\n- CT neck with IV contrast once the airway is safe \u2014 defines abscess vs phlegmon for surgical drainage.\n- ENT / OMFS consult for incision and drainage; keep the patient upright, NPO.',
        recommendation: 'Airway first, broad-spectrum IV abx, CT neck with contrast, urgent ENT/OMFS for drainage.',
        citation: [3],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'lad-deepneck-excluded',
        type: 'result',
        module: 2,
        title: 'Simple Suppurative Adenitis',
        body: 'A small fluctuant node without airway threat or toxicity is a simple suppurative lymphadenitis. Incision and drainage if fluctuant; empiric antibiotics covering staph/strep (and MRSA per local rates); warm compresses; close follow-up. **Reassess for airway progression** \u2014 if trismus, voice change, or neck swelling develops, return to the deep-space pathway.\n\nReturn to the hub if another pattern remains open.',
        recommendation: 'I&D if fluctuant + staph/strep (\u00B1 MRSA) antibiotics; return precautions for airway progression.',
        citation: [3],
        next: 'lad-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- MALIGNANCY --------------------
    {
        id: 'lad-malignancy-entry',
        type: 'question',
        module: 2,
        title: 'Malignancy Phenotype — Red-Flag Gate',
        body: '**Nodes that raise malignancy pretest probability:** hard, fixed, matted, painless, >2 cm, persistently enlarging over weeks, supraclavicular location, or accompanied by **B-symptoms** (fever, drenching night sweats, >10% weight loss). A rapidly enlarging mediastinal/nodal mass with SVC syndrome (facial/neck swelling, distended veins, dyspnea) is an oncologic emergency.',
        options: [
            { label: 'SVC syndrome, tumor lysis, or airway compromise from mass', description: 'Oncologic emergency \u2014 stabilize + urgent onc/heme', next: 'lad-malignancy-emergency', urgency: 'critical' },
            { label: 'Hard/fixed/matted or supraclavicular + B-symptoms, stable', description: 'Malignancy workup \u2014 labs + imaging + biopsy referral', next: 'lad-malignancy-verdict', urgency: 'urgent' },
            { label: 'Soft, mobile, tender, no B-symptoms', description: 'Malignancy unlikely \u2014 move on', next: 'lad-malignancy-excluded', urgency: 'routine' },
        ],
        citation: [4],
        summary: 'SVC/tumor lysis = emergency; hard/fixed/supraclav + B-symptoms = malignancy workup + biopsy; soft mobile = unlikely.',
        safetyLevel: 'warning',
    },
    {
        id: 'lad-malignancy-emergency',
        type: 'result',
        module: 2,
        title: 'Oncologic Emergency — Stabilize',
        body: '**A new hematologic malignancy can present in extremis.** \u26A0\uFE0F No dedicated deep-dive consult yet \u2014 manage here and escalate.\n\n- **SVC syndrome:** elevate head of bed, oxygen, avoid upper-extremity IVs, urgent CT chest with contrast, emergent oncology / radiation-oncology consult. Airway and hemodynamic support as needed.\n- **Tumor lysis (high-grade lymphoma / leukemia):** check K+, phosphate, calcium, uric acid, creatinine; aggressive IV fluids; rasburicase / allopurinol per oncology; treat hyperkalemia.\n- **Leukostasis / blast crisis** (very high WBC, hypoxia, altered): urgent heme, avoid transfusing RBCs before cytoreduction if hyperviscous.\n- CBC with differential + smear, LDH, uric acid, LFTs, coags/DIC screen. **Admit; urgent heme/onc.**',
        recommendation: 'Treat SVC syndrome / tumor lysis / leukostasis; CBC+smear, LDH, uric acid; admit + urgent heme-onc.',
        citation: [4],
        safetyLevel: 'critical',
        confidence: 'recommended',
    },
    {
        id: 'lad-malignancy-verdict',
        type: 'result',
        module: 2,
        title: 'Suspected Nodal Malignancy — Workup Pathway',
        body: '\u26A0\uFE0F No deep-dive consult yet \u2014 initiate the ED workup and arrange definitive diagnosis.\n\n- **Labs:** CBC with differential + peripheral smear, LDH, uric acid, LFTs, ESR/CRP, HIV, and (per exposure) EBV / CMV serologies.\n- **Imaging:** CT neck/chest/abdomen/pelvis with contrast (or CXR + node US in the ED) to map nodal burden and find a mediastinal mass.\n- **Tissue is the answer:** an **excisional lymph-node biopsy** (not FNA) is preferred for lymphoma architecture \u2014 arrange urgent hematology/oncology or surgical referral.\n- **Do not steroid-treat an undiagnosed node** \u2014 empiric steroids can obscure lymphoma histology.\n\nAdmit if B-symptoms with systemic illness, cytopenias, high LDH/uric acid, or unreliable follow-up; otherwise expedited outpatient heme-onc.',
        recommendation: 'CBC+smear, LDH, uric acid, HIV; CT staging; expedited EXCISIONAL biopsy + heme-onc. Avoid empiric steroids.',
        citation: [4],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'lad-malignancy-excluded',
        type: 'result',
        module: 2,
        title: 'Malignancy — Lower Probability',
        body: 'Soft, mobile, tender nodes without B-symptoms, in a well patient, favor a reactive/infective cause. **But persistence matters:** any node that persists >2\u20134 weeks, keeps enlarging, is supraclavicular, or develops B-symptoms needs referral for biopsy regardless of initial reassurance.\n\nReturn to the hub for the next pattern.',
        recommendation: 'Malignancy lower probability now; refer for biopsy if node persists >2-4 wk, enlarges, is supraclavicular, or B-symptoms appear.',
        citation: [4],
        next: 'lad-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- ACUTE HIV --------------------
    {
        id: 'lad-hiv-entry',
        type: 'question',
        module: 2,
        title: 'Acute HIV — Retroviral Syndrome Gate',
        body: 'Acute (primary) HIV presents as **generalized tender lymphadenopathy + fever + maculopapular rash + pharyngitis + myalgias**, typically 2\u20134 weeks after exposure. A 4th-generation Ag/Ab test can be negative in the earliest window \u2014 **HIV RNA (viral load) is the test for suspected acute infection.**',
        options: [
            { label: 'Compatible syndrome + risk exposure', description: 'Test for acute HIV (Ag/Ab + RNA)', next: 'lad-hiv-verdict', urgency: 'urgent' },
            { label: 'No compatible syndrome / no risk', description: 'Acute HIV unlikely \u2014 move on', next: 'lad-hiv-excluded', urgency: 'routine' },
        ],
        citation: [5],
        summary: 'Generalized adenopathy + fever + rash + pharyngitis + exposure. 4th-gen Ag/Ab AND HIV RNA (window).',
        safetyLevel: 'warning',
    },
    {
        id: 'lad-hiv-verdict',
        type: 'result',
        module: 2,
        title: 'Suspected Acute HIV — Treat',
        body: 'Open [HIV](#/tree/hiv).\n\n**Next steps:**\n- **4th-generation HIV Ag/Ab AND HIV-1 RNA (viral load)** \u2014 RNA detects infection before antibody seroconversion.\n- Counsel + link to care urgently; early ART reduces transmission and reservoir.\n- Screen for co-infections (syphilis, gonorrhea/chlamydia, hepatitis B/C, TB).\n- If a source-exposure is <72 h and ongoing risk, consider PEP; discuss PrEP for future risk.',
        recommendation: '4th-gen Ag/Ab + HIV RNA (viral load); urgent linkage to care + co-infection screen.',
        citation: [5],
        safetyLevel: 'warning',
        confidence: 'definitive',
    },
    {
        id: 'lad-hiv-excluded',
        type: 'result',
        module: 2,
        title: 'Acute HIV — Unlikely',
        body: 'Without a compatible syndrome or risk exposure, acute HIV is unlikely. **Still send an HIV test as part of any unexplained persistent lymphadenopathy workup** \u2014 it is cheap, high-yield, and part of standard adenopathy evaluation.\n\nReturn to the hub for the next pattern.',
        recommendation: 'Acute HIV unlikely; still include HIV testing in any unexplained persistent adenopathy workup.',
        citation: [5],
        next: 'lad-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- TB / SUBACUTE --------------------
    {
        id: 'lad-tb-entry',
        type: 'question',
        module: 2,
        title: 'TB / Subacute Constitutional — Gate',
        body: 'Weeks of fever, drenching **night sweats**, weight loss, and cough \u2014 with a firm cervical/supraclavicular node (scrofula = TB lymphadenitis) \u2014 point to TB, especially with risk factors (endemic exposure, HIV, immunosuppression, incarceration, homelessness).',
        options: [
            { label: 'Constitutional symptoms + TB risk / suggestive node', description: 'Work up TB', next: 'lad-tb-verdict', urgency: 'urgent' },
            { label: 'No constitutional symptoms / no TB risk', description: 'TB unlikely \u2014 move on', next: 'lad-tb-excluded', urgency: 'routine' },
        ],
        citation: [6],
        summary: 'Night sweats + weight loss + firm node + TB risk. CXR + IGRA/TST + isolate if pulmonary features.',
        safetyLevel: 'warning',
    },
    {
        id: 'lad-tb-verdict',
        type: 'result',
        module: 2,
        title: 'Suspected TB — Treat',
        body: 'Open [Tuberculosis](#/tree/tuberculosis).\n\n**Next steps:**\n- **Airborne isolation** if any pulmonary features (cough, infiltrate) until active pulmonary TB is excluded.\n- CXR; sputum for AFB smear \u00D7 3 + culture + NAAT if pulmonary; **IGRA or TST**.\n- For isolated TB lymphadenitis (scrofula): node FNA/excisional biopsy with AFB stain, culture, and NAAT.\n- HIV testing (co-infection); notify public health; involve ID for treatment.',
        recommendation: 'Airborne isolation if pulmonary features; CXR + sputum AFB/NAAT + IGRA/TST; node biopsy for scrofula; HIV test + ID/public health.',
        citation: [6],
        safetyLevel: 'warning',
        confidence: 'definitive',
    },
    {
        id: 'lad-tb-excluded',
        type: 'result',
        module: 2,
        title: 'TB — Unlikely',
        body: 'Absence of constitutional symptoms and TB risk makes TB unlikely. Keep it on the differential for any persistent firm node with night sweats, especially in higher-risk patients \u2014 subacute presentations are easy to miss.\n\nReturn to the hub for the next pattern.',
        recommendation: 'TB unlikely now; reconsider for persistent firm node + night sweats or new risk exposure.',
        citation: [6],
        next: 'lad-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- REACTIVE --------------------
    {
        id: 'lad-reactive-entry',
        type: 'question',
        module: 2,
        title: 'Reactive Adenopathy — Local Source Gate',
        body: 'A tender, mobile, soft node with an obvious adjacent infection (pharyngitis, dental, skin/soft-tissue, conjunctivitis, scalp) is most often reactive. Treat the source and reassess. **EBV mononucleosis** (posterior cervical adenopathy + exudative pharyngitis + fatigue \u00B1 splenomegaly) and **cat-scratch** (regional node + cat exposure/papule) are common benign causes without dedicated consults yet.',
        options: [
            { label: 'Clear local infective source (e.g., pharyngitis)', description: 'Treat the source \u2014 reactive node', next: 'lad-reactive-verdict', urgency: 'routine' },
            { label: 'No source found, node persists', description: 'Undifferentiated \u2014 workup bundle', next: 'lad-rescue', urgency: 'routine' },
        ],
        citation: [1, 2],
        summary: 'Tender mobile node + local source = reactive; treat source. No source + persistence = workup bundle.',
    },
    {
        id: 'lad-reactive-verdict',
        type: 'result',
        module: 2,
        title: 'Reactive Lymphadenopathy — Treat the Source',
        body: 'Treat the driving infection and let the node follow:\n\n- **Streptococcal / bacterial pharyngitis** with tender anterior cervical nodes \u2192 open [Adult Pharyngitis](#/tree/adult-pharyngitis).\n- **EBV mononucleosis** (no deep-dive yet): supportive care, avoid amoxicillin (rash), **counsel splenic-precaution / no contact sports \u00D7 3\u20134 weeks** for splenomegaly; monofocal heterophile / EBV serologies.\n- **Cat-scratch (Bartonella)** (no deep-dive yet): usually self-limited; azithromycin for large/symptomatic nodes or immunocompromised.\n- **Skin / dental / scalp source** \u2192 treat the primary infection.\n\n**Safety net:** any node that fails to regress over 2\u20134 weeks, keeps enlarging, or develops B-symptoms needs re-evaluation for biopsy.',
        recommendation: 'Treat the driving infection; EBV \u2192 splenic precautions + avoid amoxicillin; re-evaluate/biopsy if node persists >2-4 wk.',
        citation: [1, 2],
        confidence: 'recommended',
    },
    // -------------------- PEDIATRIC --------------------
    {
        id: 'lad-peds-entry',
        type: 'question',
        module: 2,
        title: 'Pediatric — Adenitis vs Kawasaki Gate',
        body: 'In a child, distinguish **acute bacterial cervical adenitis** (unilateral, tender, warm, often staph/strep \u2014 may suppurate) from **Kawasaki disease**, where cervical lymphadenopathy (\u22651.5 cm, usually unilateral) is one of the principal criteria alongside \u22655 days of fever, conjunctivitis, oral changes, rash, and extremity changes.',
        options: [
            { label: '\u22655 days fever + \u22652 Kawasaki features', description: 'Kawasaki suspected \u2014 urgent evaluation', next: 'lad-peds-kawasaki', urgency: 'urgent' },
            { label: 'Unilateral tender warm node, no Kawasaki criteria', description: 'Bacterial adenitis \u2014 antibiotics \u00B1 I&D', next: 'lad-peds-adenitis', urgency: 'routine' },
        ],
        citation: [7],
        summary: '\u22655-day fever + Kawasaki features = urgent (echo, IVIG); unilateral tender node alone = bacterial adenitis.',
        safetyLevel: 'warning',
    },
    {
        id: 'lad-peds-kawasaki',
        type: 'result',
        module: 2,
        title: 'Kawasaki Disease Suspected — Urgent',
        body: '\u26A0\uFE0F No deep-dive consult yet \u2014 recognize and escalate; **untreated Kawasaki risks coronary artery aneurysms.**\n\n- **Criteria:** \u22655 days of fever PLUS \u22654 of \u2014 bilateral non-exudative conjunctivitis, oral mucosal changes (strawberry tongue, cracked lips), polymorphous rash, extremity changes (edema/erythema, later periungual peeling), cervical lymphadenopathy \u22651.5 cm. Consider **incomplete Kawasaki** in prolonged unexplained fever with fewer features.\n- **Workup:** CBC, CRP/ESR, LFTs, albumin, urinalysis (sterile pyuria); **urgent echocardiogram**.\n- **Treatment (with pediatrics/cardiology):** **IVIG 2 g/kg** + aspirin; treat within 10 days of fever onset to reduce aneurysm risk. **Admit.**',
        recommendation: 'Apply Kawasaki criteria (incl. incomplete); labs + urgent echo; IVIG 2 g/kg + aspirin within 10 days; admit + peds/cardiology.',
        citation: [7],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'lad-peds-adenitis',
        type: 'result',
        module: 2,
        title: 'Pediatric Bacterial Adenitis — Treat',
        body: 'Acute unilateral bacterial cervical adenitis (staph/strep) in a child: empiric antibiotics covering staph/strep (and MRSA per local rates) \u2014 e.g., clindamycin or cephalexin; warm compresses; **ultrasound + I&D if fluctuant/abscessed**; close follow-up.\n\n**Return precautions:** airway signs, spreading erythema, worsening fever/toxicity, or failure to improve in 48\u201372 h \u2192 re-image (US/CT), consider IV antibiotics and ENT.\n\nReturn to the hub if another pattern remains open.',
        recommendation: 'Empiric staph/strep (\u00B1 MRSA) antibiotics; US + I&D if fluctuant; 48-72 h follow-up with airway/spread precautions.',
        citation: [1, 2],
        next: 'lad-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // ============================================================
    // Module 3 — Rescue / Reassess (Workup Bundle)
    // ============================================================
    {
        id: 'lad-rescue',
        type: 'info',
        module: 3,
        title: 'Initial Workup Bundle — Undifferentiated Adenopathy',
        body: 'No emergency ruled in; the node is undifferentiated. Base the ED workup on pattern and duration:\n\n- **History:** duration, growth rate, B-symptoms (fever, night sweats, weight loss), exposures (cats, TB contacts, travel, sexual history, tick), medications (phenytoin, allopurinol \u2192 drug-induced), constitutional symptoms.\n- **Exam:** localized vs generalized, size, consistency (soft/firm/hard), mobility (mobile vs fixed/matted), supraclavicular check, hepatosplenomegaly.\n- **Labs (targeted):** CBC with differential + peripheral smear, LDH, ESR/CRP, **HIV**, monospot / EBV & CMV serologies per story, and RPR if sexual-risk. Consider Bartonella serology with cat exposure.\n- **The 2\u20134 week rule:** unexplained localized adenopathy that persists beyond 2\u20134 weeks, generalized adenopathy without a clear infective cause, supraclavicular nodes, or hard/fixed/matted nodes \u2192 **refer for excisional biopsy.**\n\n**Reassess** based on results + clinical trajectory.',
        citation: [1, 2],
        next: 'lad-reassess',
        summary: 'History (B-symptoms, exposures, drugs) + exam (localized/generalized, consistency, supraclav) + targeted labs. 2-4 wk persistence = biopsy referral.',
    },
    {
        id: 'lad-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess — Results & Trajectory',
        body: 'Integrate history, exam, and available labs. Decide the next step.',
        options: [
            { label: 'Clear benign/reactive cause + well-appearing', description: 'Treat source \u2192 discharge with follow-up', next: 'lad-disposition' },
            { label: 'Red flags emerged (B-symptoms, hard/fixed, supraclav, cytopenias)', description: 'STOP \u2014 malignancy pathway', next: 'lad-malignancy-entry', urgency: 'urgent' },
            { label: 'Airway / toxic features developing', description: 'STOP \u2014 deep-space / sepsis pathway', next: 'lad-deepneck-entry', urgency: 'critical' },
            { label: 'Undifferentiated but well \u2014 needs imaging or time', description: 'Imaging + outpatient plan', next: 'lad-imaging' },
        ],
        citation: [1, 2],
        summary: 'Benign = discharge; red flags = malignancy pathway; airway/toxic = deep-space; undifferentiated well = image + outpatient.',
    },
    // ============================================================
    // Module 4 — Imaging
    // ============================================================
    {
        id: 'lad-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging Decision Cheat-Sheet',
        body: 'Image by the question you are asking:\n\n**Ultrasound (first-line for a discrete node):** characterizes size, shape, hilum (benign reactive nodes keep a fatty hilum; loss of hilum + round shape favors malignancy), and guides FNA/biopsy. Good for pediatric and cervical nodes.\n\n**CT neck with IV contrast:** suspected deep-space infection / abscess (define drainable collection, airway).\n\n**CT chest/abdomen/pelvis with contrast:** malignancy staging, mediastinal mass, generalized adenopathy \u2014 maps nodal burden and finds a primary.\n\n**CXR:** quick screen for mediastinal/hilar adenopathy (lymphoma, TB, sarcoid) and pulmonary TB.\n\n**Tissue beats imaging for diagnosis:** imaging localizes and stratifies, but an **excisional lymph-node biopsy** (not FNA) is the definitive test when lymphoma is suspected.',
        citation: [1, 4],
        next: 'lad-disposition',
        summary: 'US first for a discrete node; CT neck for deep-space; CT C/A/P for staging; CXR screen. Excisional biopsy is definitive for lymphoma.',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'lad-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Match disposition to the dominant pattern.',
        options: [
            { label: 'Admit \u2014 deep-space infection, sepsis, oncologic emergency, systemic illness', description: 'Admit per pathway', next: 'lad-dispo-admit', urgency: 'urgent' },
            { label: 'Discharge \u2014 benign/reactive or stable workup with reliable follow-up', description: 'Discharge + biopsy safety net', next: 'lad-dispo-discharge' },
        ],
        citation: [1, 2],
        summary: 'Admit for infection/sepsis/oncologic emergency/systemic illness; discharge benign with structured follow-up.',
    },
    {
        id: 'lad-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit',
        body: 'Admit for: deep-neck-space infection / airway concern, sepsis from a suppurative source, oncologic emergency (SVC syndrome, tumor lysis, leukostasis, symptomatic cytopenias), Kawasaki disease, active TB needing isolation, or any systemically ill patient.\n\n**Service:** ENT / OMFS (deep-space infection); Heme-Onc + Medicine (new malignancy, cytopenias, tumor lysis); Pediatrics + Cardiology (Kawasaki); ID / Medicine (TB, disseminated infection); ICU for airway compromise or shock.\n\n**Handoff:** node characteristics + timeline, B-symptoms, vitals trend, airway status, CBC/smear + LDH/uric acid, imaging findings, antibiotics/IVIG given (drug + time), isolation status, HIV/TB testing pending, biopsy plan.',
        recommendation: 'Admit per dominant pattern; match service; ICU for airway/shock; carry the biopsy + isolation plan in handoff.',
        citation: [1, 2],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'lad-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge — With a Biopsy Safety Net',
        body: 'Discharge when: well-appearing, no airway/sepsis/oncologic-emergency features, a plausible benign/reactive cause or a stable workup in progress, and **reliable follow-up secured**.\n\n**Before discharge:** (1) document node size / character / location, (2) send / plan the targeted labs (incl. HIV), (3) treat any local source, (4) **written return precautions**, (5) **explicit follow-up with a hard 2\u20134 week re-evaluation**, and (6) referral pathway for excisional biopsy if the node does not regress.\n\n**Return precautions:** rapidly enlarging node, hard/fixed node, drenching night sweats / fevers / weight loss, easy bruising or bleeding, facial/neck swelling or breathing difficulty (SVC / airway), or trismus / drooling. Counsel: "Most swollen glands settle in a couple of weeks. If this one keeps growing, gets hard, or you get night sweats or weight loss, you need to be seen again for a biopsy."',
        recommendation: 'Discharge only if well + reliable follow-up; document node, send HIV + targeted labs, mandatory 2-4 wk recheck + biopsy pathway.',
        citation: [1, 2],
        confidence: 'recommended',
    },
];
export const LYMPHADENOPATHY_HUB_CRITICAL_ACTIONS = [
    { text: 'Airway first: suppurative node + trismus / stridor / neck swelling = deep-neck-space infection \u2014 secure airway + IV antibiotics before CT.', nodeId: 'lad-deepneck-entry' },
    { text: 'Hard/fixed/matted or supraclavicular node + B-symptoms \u2192 malignancy workup; arrange EXCISIONAL biopsy (not FNA). Avoid empiric steroids on an undiagnosed node.', nodeId: 'lad-malignancy-entry' },
    { text: 'Suspected acute HIV: send 4th-gen Ag/Ab AND HIV RNA \u2014 RNA detects infection before antibody seroconversion.', nodeId: 'lad-hiv-entry' },
    { text: 'The 2\u20134 week rule: any node that persists, enlarges, is supraclavicular, or brings B-symptoms needs biopsy referral \u2014 never discharge without a hard recheck.', nodeId: 'lad-dispo-discharge' },
];
export const LYMPHADENOPATHY_HUB_CITATIONS = [
    { num: 1, text: 'Gaddey HL, Riegel AM. Unexplained Lymphadenopathy: Evaluation and Differential Diagnosis. Am Fam Physician. 2016;94(11):896-903.' },
    { num: 2, text: 'Freeman AM, Matto P. Adenopathy. In: StatPearls. Treasure Island (FL): StatPearls Publishing; 2023.' },
    { num: 3, text: 'Brook I. Microbiology and management of deep neck infections. Curr Infect Dis Rep. 2015;17(11):47.' },
    { num: 4, text: 'Zelenetz AD, Gordon LI, Abramson JS, et al. NCCN Clinical Practice Guidelines in Oncology: B-Cell Lymphomas. J Natl Compr Canc Netw. 2019;17(6):650-661.' },
    { num: 5, text: 'DHHS Panel on Antiretroviral Guidelines for Adults and Adolescents. Guidelines for the Use of Antiretroviral Agents in Adults and Adolescents with HIV. 2023.' },
    { num: 6, text: 'Lewinsohn DM, Leonard MK, LoBue PA, et al. Official ATS/IDSA/CDC Clinical Practice Guidelines: Diagnosis of Tuberculosis in Adults and Children. Clin Infect Dis. 2017;64(2):e1-e33.' },
    { num: 7, text: 'McCrindle BW, Rowley AH, Newburger JW, et al. Diagnosis, Treatment, and Long-Term Management of Kawasaki Disease: AHA Scientific Statement. Circulation. 2017;135(17):e927-e999.' },
];
export const LYMPHADENOPATHY_HUB_NODE_COUNT = LYMPHADENOPATHY_HUB_NODES.length;
export const LYMPHADENOPATHY_HUB_MODULE_LABELS = [
    'Sick Check',
    'Rule In / Rule Out',
    'Workup Bundle',
    'Imaging',
    'Disposition',
];
