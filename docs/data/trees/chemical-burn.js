// MedKitt — Chemical Eye Burn / Ocular Chemical Injury
// Sources: OpenEvidence, EB Medicine, UpToDate, AAO EyeNet, StatPearls
// 5 modules: Recognition → Irrigation Protocol → Classification → Treatment Cascade → Disposition
// Ophthalmology consult #2
export const CHEMICAL_BURN_CRITICAL_ACTIONS = [
    { text: 'IRRIGATE BEFORE ANYTHING ELSE - do not delay for history, VA, or pH testing', nodeId: 'chemburn-immediate' },
    { text: 'Alkali burns WORSE than acid - lipophilic penetration reaches anterior chamber in <15 seconds', nodeId: 'chemburn-start' },
    { text: 'Cement/lime exposure - sweep fornices for particulate matter that continues releasing alkali', nodeId: 'chemburn-sweep' },
    { text: 'Target pH 7.0-7.4 - wait 5-10 min after stopping irrigation before checking pH (reservoir effect)', nodeId: 'chemburn-ph-check' },
    { text: 'Prednisolone 1% MUST be tapered by day 10-14 - risk of corneal perforation if continued', nodeId: 'chemburn-steroid-caution' },
    { text: 'Grade III-IV injury (opaque cornea, >50% limbal ischemia) - STAT ophthalmology, admission required', nodeId: 'chemburn-treatment-severe' },
    { text: 'Alkali burns require 30 min to 2+ hours irrigation - acid burns 15-30 minutes', nodeId: 'chemburn-irrigation' },
    { text: 'Limbal ischemia is KEY prognostic factor - document clock hours involved', nodeId: 'chemburn-classification' },
];
export const CHEMICAL_BURN_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'chemburn-start',
        type: 'info',
        module: 1,
        title: 'Chemical Eye Burn',
        body: '**True ocular emergency — IRRIGATE BEFORE ANYTHING ELSE.**\n\n**Mechanism:**\n- Alkali: Lipophilic penetration, liquefactive necrosis — **WORSE prognosis**\n- Acid: Coagulative necrosis, protein barrier limits penetration\n\n**Alkali can reach anterior chamber in <15 seconds.**\n\n**Time is cornea.** Every minute without irrigation = worse outcome.\n\n**Common Agents:**\n\n| Alkali (More Severe) | Acid |\n|---------------------|------|\n| Ammonia (cleaners) | Sulfuric acid (batteries) |\n| Sodium hydroxide (drain cleaner) | Hydrochloric acid (pool) |\n| Calcium hydroxide (cement/lime) | Hydrofluoric acid* |\n| Potassium hydroxide (fertilizer) | Acetic acid |\n\n*Hydrofluoric acid behaves like alkali — deep penetration.\n\n**Pearl:** Cement/lime particles continue releasing alkali — must sweep fornices. [1][2]',
        citation: [1, 2],
        next: 'chemburn-immediate',
    },
    {
        id: 'chemburn-immediate',
        type: 'info',
        module: 1,
        title: 'Immediate Action',
        body: '**DO NOT DELAY FOR:**\n- History\n- Visual acuity\n- Slit lamp exam\n- pH testing\n- Ophthalmology consult\n\n**START IRRIGATION NOW.**\n\n**At Scene:**\n- Any non-caustic fluid (tap water, saline, water fountain)\n- Continue during transport\n\n**In ED:**\n1. Topical anesthetic (proparacaine)\n2. Sweep fornices for particulate matter\n3. Begin continuous irrigation\n4. Morgan lens if available\n\n**Exception:** Suspected globe rupture — do NOT irrigate. Shield and consult. [1][2][3]',
        citation: [1, 2, 3],
        next: 'chemburn-agent-type',
    },
    {
        id: 'chemburn-agent-type',
        type: 'question',
        module: 1,
        title: 'Agent Type',
        body: '**What type of chemical exposure?**\n\nIf unknown, treat as alkali (worst-case).',
        citation: [1, 2],
        options: [
            {
                label: 'Alkali',
                description: 'Drain cleaner, cement, ammonia, oven cleaner',
                next: 'chemburn-irrigation',
                urgency: 'critical',
            },
            {
                label: 'Acid',
                description: 'Battery acid, pool chemicals, toilet cleaner',
                next: 'chemburn-irrigation',
            },
            {
                label: 'Hydrofluoric Acid',
                description: 'Industrial exposure — treat like alkali',
                next: 'chemburn-irrigation',
                urgency: 'critical',
            },
            {
                label: 'Unknown Agent',
                description: 'Treat as alkali until proven otherwise',
                next: 'chemburn-irrigation',
                urgency: 'critical',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: IRRIGATION PROTOCOL
    // =====================================================================
    {
        id: 'chemburn-irrigation',
        type: 'info',
        module: 2,
        title: 'Irrigation Protocol',
        body: '**Fluid Selection (in order of preference):**\n1. Diphoterine (amphoteric, if available)\n2. Balanced salt solution (BSS)\n3. Lactated Ringer\'s (LR) — preferred over NS\n4. Normal saline (NS) — pH can be 4.5-7.0\n5. Sterile water\n6. Tap water (acceptable at scene)\n\n**Avoid:** Hypotonic solutions increase chemical penetration.\n\n**Volume Guidelines:**\n\n| Severity | Volume |\n|----------|--------|\n| Mild (Grade I) | 2L minimum |\n| Moderate (Grade II) | 2-3L |\n| Severe (Grade III-IV) | 10-20L+ |\n\n**Duration:**\n\n| Agent | Minimum Duration |\n|-------|------------------|\n| Acid | 15-30 minutes |\n| Alkali | 30 minutes to 2+ hours |\n| Unknown | Treat as alkali |\n\n[pH Monitor Tool](#/calculator/chemburn-ph) [1][2][3]',
        citation: [1, 2, 3],
        calculatorLinks: [
            { id: 'chemburn-ph', label: 'pH Monitor' },
        ],
        next: 'chemburn-morgan',
    },
    {
        id: 'chemburn-morgan',
        type: 'info',
        module: 2,
        title: 'Morgan Lens Technique',
        body: '**Morgan Lens = hands-free continuous irrigation**\n\n**Insertion Steps:**\n1. Apply topical anesthetic (proparacaine 0.5%)\n2. Fill lens with irrigation fluid\n3. Have patient look down\n4. Insert lens under upper lid\n5. Have patient look up\n6. Tuck lens under lower lid\n7. Connect to IV tubing with fluid running\n\n**Flow Rate:**\n- Wide open initially\n- 250-500 mL over 15-20 min\n- Adjust based on tolerance\n\n**Contraindications:**\n- Suspected globe rupture\n- Severe corneal laceration\n- Uncooperative patient (relative)\n\n**Alternative:** Nasal cannula placed over bridge of nose, tubing in each eye.\n\n**Pearl:** LR preferred — NS at low pH causes discomfort. [1][3]',
        citation: [1, 3],
        next: 'chemburn-sweep',
    },
    {
        id: 'chemburn-sweep',
        type: 'info',
        module: 2,
        title: 'Fornix Sweep',
        body: '**CRITICAL for cement/lime/plite exposures:**\n\nParticulate alkali continues releasing hydroxide until removed.\n\n**Technique:**\n1. Apply topical anesthetic\n2. Double-evert upper lid\n3. Use moist cotton swab\n4. Sweep upper fornix systematically\n5. Repeat for lower fornix\n6. Check lid margins and puncta\n\n**Look for:**\n- White calcium hydroxide particles (lime)\n- Cement fragments\n- Plaster debris\n- Any retained foreign material\n\n**Remove ALL visible particles.**\n\nIf cement adherent to cornea, do NOT force removal — ophthalmology will handle.\n\n**Recheck fornices q15-30 min** — particles migrate from upper to lower fornix with irrigation. [1][2]',
        citation: [1, 2],
        next: 'chemburn-ph-check',
    },
    {
        id: 'chemburn-ph-check',
        type: 'info',
        module: 2,
        title: 'pH Monitoring',
        body: '**Target pH: 7.0-7.4**\n\n**Testing Protocol:**\n1. Check pH of BOTH eyes before irrigation (baseline)\n2. After irrigation, STOP flow\n3. Wait **5-10 minutes** (reservoir effect)\n4. Touch litmus paper to inferior fornix (NOT cornea)\n5. Read pH\n\n**Use narrow-range pH paper (5.0-8.0)** — more precise than universal strips.\n\n**Interpretation:**\n\n| pH | Action |\n|----|--------|\n| <7.0 | Continue irrigation |\n| 7.0-7.4 | Stop, recheck in 30 min |\n| >7.4 | Acceptable (normal tears 7.0-7.5) |\n\n**CRITICAL:** If pH rises after stopping irrigation, chemical still present. Resume irrigation.\n\n**Stable pH = same reading at 15-30 minute recheck.**\n\n[pH Monitor Tool](#/calculator/chemburn-ph) [1][2][3]',
        citation: [1, 2, 3],
        calculatorLinks: [
            { id: 'chemburn-ph', label: 'pH Monitor' },
        ],
        next: 'chemburn-ph-decision',
    },
    {
        id: 'chemburn-ph-decision',
        type: 'question',
        module: 2,
        title: 'pH Status',
        body: '**What is the pH after irrigation?**\n\n(Must wait 5-10 minutes after stopping irrigation to allow chemical release from tissues.)',
        citation: [1, 2],
        options: [
            {
                label: 'pH Normalized (7.0-7.4) and Stable',
                description: 'Confirmed stable x2 readings 30 min apart',
                next: 'chemburn-exam',
            },
            {
                label: 'pH Still Abnormal',
                description: '<7.0 or >7.4 — continue irrigation',
                next: 'chemburn-continue-irrigation',
            },
            {
                label: 'pH Rising After Stopping',
                description: 'Reservoir effect — resume irrigation',
                next: 'chemburn-continue-irrigation',
            },
        ],
    },
    {
        id: 'chemburn-continue-irrigation',
        type: 'info',
        module: 2,
        title: 'Continue Irrigation',
        body: '**pH not normalized — continue irrigation:**\n\n**Steps:**\n1. Resume irrigation for additional 15-30 minutes\n2. Re-sweep fornices for retained particles\n3. Ensure adequate volume and flow rate\n4. Recheck pH after 5-10 minute pause\n\n**Refractory pH:**\n- May indicate deep tissue penetration (severe alkali)\n- May indicate retained particulate\n- Consider ophthalmology consultation\n\n**Do NOT stop irrigation prematurely.**\n\nContinuous irrigation for 2+ hours may be needed for severe alkali burns.\n\n**When to escalate:**\n- pH still abnormal after 2L+ irrigation\n- Unable to visualize/remove particles\n- Corneal opacification visible [1][2]',
        citation: [1, 2],
        next: 'chemburn-ph-check',
    },
    // =====================================================================
    // MODULE 3: CLASSIFICATION
    // =====================================================================
    {
        id: 'chemburn-exam',
        type: 'info',
        module: 3,
        title: 'Post-Irrigation Examination',
        body: '**Once pH normalized, perform complete exam:**\n\n**1. Visual Acuity:**\n- Document in each eye\n- Use pinhole if reduced\n\n**2. External:**\n- Lid burns, periorbital skin involvement\n- Forniceal shortening (early symblepharon)\n\n**3. Cornea:**\n- Fluorescein — epithelial defect size\n- Stromal haze/opacity\n- Clarity (can you see iris details?)\n\n**4. Limbus:**\n- **Ischemia** — perilimbal blanching (KEY prognostic)\n- Clock hours involved\n\n**5. Conjunctiva:**\n- Chemosis, injection\n- Ischemia/necrosis (white areas)\n- Percentage involvement\n\n**6. Anterior Chamber:**\n- Cell/flare\n- Hyphema\n\n**7. IOP:**\n- May be elevated acutely\n- Applanation or Tono-Pen\n\n**8. Lens:**\n- Clarity (cataract from chemical penetration) [1][2][4]',
        citation: [1, 2, 4],
        next: 'chemburn-classification',
    },
    {
        id: 'chemburn-classification',
        type: 'info',
        module: 3,
        title: 'Roper-Hall Classification',
        body: '**Roper-Hall Classification (Most Common):**\n\n| Grade | Cornea | Limbal Ischemia | Prognosis |\n|-------|--------|-----------------|------------|\n| **I** | Clear, epithelial damage only | None (0%) | **Excellent** |\n| **II** | Hazy, iris details visible | <1/3 (33%) | **Good** |\n| **III** | Total epithelial loss, stromal haze | 1/3-1/2 (33-50%) | **Guarded** |\n| **IV** | Opaque, iris/pupil not visible | >1/2 (50%) | **Poor** |\n\n**Key Points:**\n- Limbal ischemia = stem cell damage = worse prognosis\n- Grade correlates with treatment intensity\n- Grade III-IV require aggressive therapy + admission\n\n[Grading Tool](#/calculator/chemburn-grade) [1][2][4]',
        citation: [1, 2, 4],
        calculatorLinks: [
            { id: 'chemburn-grade', label: 'Roper-Hall Grading' },
        ],
        next: 'chemburn-dua',
    },
    {
        id: 'chemburn-dua',
        type: 'info',
        module: 3,
        title: 'Dua Classification',
        body: '**Dua Classification (Newer, More Granular):**\n\n| Grade | Limbus (clock hours) | Conjunctiva | Prognosis |\n|-------|---------------------|-------------|------------|\n| **I** | 0 | 0% | Very good |\n| **II** | ≤3 | ≤30% | Good |\n| **III** | 3-6 | 30-50% | Good |\n| **IV** | 6-9 | 50-75% | Guarded |\n| **V** | 9-12 | 75-100% | Poor |\n| **VI** | Total (12) | Total (100%) | Very poor |\n\n**Advantages over Roper-Hall:**\n- More granular (6 grades vs 4)\n- Uses fluorescein staining (limbal uptake = damage)\n- Better predicts severe outcomes\n- Separates Grade III/IV into 4 categories\n\n**Either classification acceptable — document which you used.** [1][4]',
        citation: [1, 4],
        next: 'chemburn-grade-decision',
    },
    {
        id: 'chemburn-grade-decision',
        type: 'question',
        module: 3,
        title: 'Injury Grade',
        body: '**Select the injury grade (Roper-Hall):**',
        citation: [1, 2],
        options: [
            {
                label: 'Grade I (Clear Cornea)',
                description: 'Epithelial damage only, no limbal ischemia',
                next: 'chemburn-treatment-mild',
            },
            {
                label: 'Grade II (Hazy, Iris Visible)',
                description: '<1/3 limbal ischemia',
                next: 'chemburn-treatment-moderate',
            },
            {
                label: 'Grade III (Stromal Haze)',
                description: '1/3-1/2 limbal ischemia, iris obscured',
                next: 'chemburn-treatment-severe',
                urgency: 'critical',
            },
            {
                label: 'Grade IV (Opaque Cornea)',
                description: '>1/2 limbal ischemia, can\'t see iris/pupil',
                next: 'chemburn-treatment-severe',
                urgency: 'critical',
            },
        ],
    },
    // =====================================================================
    // MODULE 4: TREATMENT CASCADE
    // =====================================================================
    {
        id: 'chemburn-treatment-mild',
        type: 'info',
        module: 4,
        title: 'Grade I Treatment',
        body: '**Grade I — Mild Injury:**\n\n**Immediate:**\n- Ensure pH normalized and stable\n- Cycloplegic: Cyclopentolate 1% TID\n- Antibiotic: Erythromycin ointment QID\n- Steroid: Prednisolone 1% QID × 7 days\n\n**Supportive:**\n- Preservative-free tears q1-2h\n- Oral analgesics PRN\n- Cool compresses\n\n**Disposition:**\n- May discharge home\n- Ophthalmology follow-up in 24-48 hours\n- Return precautions: worsening pain, vision changes\n\n**Expected Course:**\n- Epithelial healing in 1-3 days\n- Excellent visual prognosis\n- No long-term sequelae expected [1][2]',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Cyclopentolate 1%',
                dose: '1 drop',
                route: 'Ophthalmic',
                frequency: 'TID',
                duration: 'Until ophthalmology follow-up',
                notes: 'Cycloplegic for pain relief and ciliary spasm',
            },
            alternative: {
                drug: 'Erythromycin 0.5% ointment',
                dose: '0.5 inch ribbon',
                route: 'Ophthalmic',
                frequency: 'QID',
                duration: 'Until epithelial healing (1-3 days)',
                notes: 'Prophylactic antibiotic coverage',
            },
            monitoring: 'Ophthalmology follow-up in 24-48 hours. Return for worsening pain, decreased vision, or increasing redness.',
        },
        next: 'chemburn-discharge',
    },
    {
        id: 'chemburn-treatment-moderate',
        type: 'info',
        module: 4,
        title: 'Grade II Treatment',
        body: '**Grade II — Moderate Injury:**\n\n**Medications:**\n\n| Drug | Dose | Frequency |\n|------|------|------------|\n| **Cycloplegic** | Atropine 1% or Scopolamine 0.25% | Daily-BID |\n| **Antibiotic** | Fluoroquinolone drops (moxifloxacin) | QID |\n| **Steroid** | Prednisolone 1% | Q1-2H while awake |\n| **Ascorbate** | Vitamin C 10% drops | Q1H while awake |\n| **Ascorbate** | Vitamin C 2g PO | QID |\n| **Citrate** | Sodium citrate 10% drops | Q2H |\n| **Tears** | Preservative-free | Q1-2H |\n\n**Doxycycline 100mg PO BID** — inhibits matrix metalloproteinases, reduces corneal melting.\n\n**IOP Management:**\n- If elevated: Timolol 0.5% BID ± acetazolamide 250mg PO q6h\n\n[Treatment Protocol Tool](#/calculator/chemburn-treatment) [1][2][4]',
        citation: [1, 2, 4],
        calculatorLinks: [
            { id: 'chemburn-treatment', label: 'Treatment Protocol' },
        ],
        treatment: {
            firstLine: {
                drug: 'Prednisolone acetate 1%',
                dose: '1 drop',
                route: 'Ophthalmic',
                frequency: 'Q1-2H while awake',
                duration: '7-10 days then taper (MUST taper by day 10-14)',
                notes: 'Critical: Begin taper by day 10-14 to avoid corneal melting',
            },
            alternative: {
                drug: 'Moxifloxacin 0.5%',
                dose: '1 drop',
                route: 'Ophthalmic',
                frequency: 'QID',
                duration: 'Until epithelial healing',
                notes: 'Prophylactic fluoroquinolone coverage',
            },
            monitoring: 'Ophthalmology follow-up within 24 hours mandatory. Daily IOP checks. Monitor for corneal melting after day 10.',
        },
        next: 'chemburn-ophtho-consult',
    },
    {
        id: 'chemburn-treatment-severe',
        type: 'info',
        module: 4,
        title: 'Grade III-IV Treatment',
        body: '**Grade III-IV — Severe Injury:**\n\n**ALL Grade II medications PLUS:**\n\n**Intensified Steroid:**\n- Prednisolone 1% Q1H around the clock (first 7-10 days)\n- **TAPER by day 10-14** — risk of corneal melting!\n- After day 14: Switch to medroxyprogesterone if needed\n\n**Ascorbate/Citrate:**\n- Ascorbate 10% drops Q1H\n- Citrate 10% drops Q1H\n- Vitamin C 2g PO QID (promotes collagen synthesis)\n\n**Consider:**\n- Amniotic membrane transplant (AMT)\n- Prokera device\n- Bandage contact lens\n- Autologous serum tears\n\n**Surgical Consultation:**\n- Debridement of necrotic tissue\n- Limbal stem cell transplant (if LSCD)\n- Corneal transplant (late)\n\n[Treatment Protocol Tool](#/calculator/chemburn-treatment) [1][2][4]',
        citation: [1, 2, 4],
        calculatorLinks: [
            { id: 'chemburn-treatment', label: 'Treatment Protocol' },
        ],
        treatment: {
            firstLine: {
                drug: 'Prednisolone acetate 1%',
                dose: '1 drop',
                route: 'Ophthalmic',
                frequency: 'Q1H around the clock',
                duration: '7-10 days then RAPID taper',
                notes: 'CRITICAL: Must taper by day 10-14. Risk of corneal perforation if continued. Switch to medroxyprogesterone after day 14 if anti-inflammatory still needed.',
            },
            alternative: {
                drug: 'Ascorbic acid 10%',
                dose: '1 drop',
                route: 'Ophthalmic',
                frequency: 'Q1H while awake',
                duration: 'Until epithelial healing',
                notes: 'Promotes collagen synthesis. Give with oral vitamin C 2g PO QID and sodium citrate 10% drops Q1H.',
            },
            monitoring: 'STAT ophthalmology consult. Admission required. Daily slit lamp exam. IOP monitoring. Watch for corneal melting especially after day 10.',
        },
        next: 'chemburn-ophtho-consult',
    },
    {
        id: 'chemburn-ophtho-consult',
        type: 'info',
        module: 4,
        title: 'Ophthalmology Consultation',
        body: '**Consultation Timing:**\n\n| Scenario | Timing |\n|----------|--------|\n| Grade III-IV | **STAT** |\n| All alkali burns | **STAT** |\n| Limbal ischemia present | **STAT** |\n| Vision loss | **STAT** |\n| IOP elevation | **STAT** |\n| Bilateral involvement | **STAT** |\n| Grade II | Same day/urgent |\n| Grade I with concerns | Urgent (24h) |\n| Grade I routine | 24-48h follow-up |\n\n**Information for Consultant:**\n- Agent (alkali vs acid, specific chemical if known)\n- Time of exposure\n- Initial pH and current pH\n- Irrigation volume and duration\n- Grade (Roper-Hall or Dua)\n- Visual acuity\n- IOP\n- Clock hours of limbal ischemia [1][2]',
        citation: [1, 2],
        next: 'chemburn-steroid-caution',
    },
    {
        id: 'chemburn-steroid-caution',
        type: 'info',
        module: 4,
        title: 'Steroid Timing Caution',
        body: '**⚠️ STEROID TIMING IS CRITICAL ⚠️**\n\n**Days 0-10:**\n- Steroids BENEFICIAL\n- Reduce inflammation\n- Limit scarring\n- Use aggressively (hourly for severe)\n\n**Days 10-14:**\n- Begin RAPID TAPER\n- Risk of corneal melting increases\n- Collagen synthesis impaired by steroids\n\n**After Day 14:**\n- **AVOID steroids** (or use minimal)\n- Switch to medroxyprogesterone if anti-inflammatory needed\n- Some experts use low-dose steroids carefully\n\n**Corneal Perforation Risk:**\n- Steroids inhibit collagen synthesis\n- Damaged cornea + steroids = perforation risk\n- This is why ophthalmology follow-up is mandatory\n\n**Document steroid start date and plan for taper.** [1][4]',
        citation: [1, 4],
        treatment: {
            firstLine: {
                drug: 'Prednisolone acetate 1%',
                dose: '1 drop',
                route: 'Ophthalmic',
                frequency: 'Q1H (severe) to QID (mild)',
                duration: 'Days 0-10 beneficial, TAPER days 10-14',
                notes: 'CRITICAL: Document start date. Risk of corneal perforation if continued >14 days. Steroids inhibit collagen synthesis in damaged cornea.',
            },
            alternative: {
                drug: 'Medroxyprogesterone 1%',
                dose: '1 drop',
                route: 'Ophthalmic',
                frequency: 'QID',
                duration: 'After day 14 if anti-inflammatory still needed',
                notes: 'Alternative to steroids after day 14. Does not inhibit collagen synthesis like corticosteroids.',
            },
            monitoring: 'Mandatory ophthalmology follow-up. Document steroid start date. Begin taper by day 10-14. Monitor for corneal thinning/melting.',
        },
        next: 'chemburn-dispo',
    },
    // =====================================================================
    // MODULE 5: DISPOSITION
    // =====================================================================
    {
        id: 'chemburn-dispo',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: '**Determine appropriate disposition:**',
        citation: [1, 2],
        options: [
            {
                label: 'Grade III-IV',
                description: 'Admission required',
                next: 'chemburn-admit',
                urgency: 'critical',
            },
            {
                label: 'Grade II',
                description: 'Admission vs close outpatient',
                next: 'chemburn-grade2-dispo',
            },
            {
                label: 'Grade I',
                description: 'Discharge with follow-up',
                next: 'chemburn-discharge',
            },
        ],
    },
    {
        id: 'chemburn-admit',
        type: 'info',
        module: 5,
        title: 'Admission Criteria',
        body: '**Admit for:**\n- Grade III-IV injury\n- Need for hourly medication administration\n- Bilateral severe burns\n- Unable to comply with outpatient regimen\n- Pediatric patients (consider)\n- Concurrent facial/respiratory burns\n- Non-compliant or unreliable patients\n\n**Admission Orders:**\n- Prednisolone 1% Q1H around the clock\n- Ascorbate 10% drops Q1H while awake\n- Citrate 10% drops Q2H while awake\n- Fluoroquinolone QID\n- Atropine 1% daily\n- Preservative-free tears Q1-2H\n- Vitamin C 2g PO QID\n- Doxycycline 100mg PO BID\n- IOP-lowering agents if needed\n- Ophthalmology to see daily [1][2]',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Prednisolone acetate 1%',
                dose: '1 drop',
                route: 'Ophthalmic',
                frequency: 'Q1H around the clock',
                duration: '7-10 days then taper',
                notes: 'Inpatient administration for severe burns. Taper by day 10-14.',
            },
            alternative: {
                drug: 'Doxycycline',
                dose: '100 mg',
                route: 'PO',
                frequency: 'BID',
                duration: 'Until epithelial healing',
                notes: 'MMP inhibitor to reduce corneal melting. Also give Vitamin C 2g PO QID.',
            },
            monitoring: 'Ophthalmology daily. IOP checks. Slit lamp exam for corneal status. Monitor for perforation risk after day 10 of steroids.',
        },
        options: [
            {
                label: 'Complete — Return to Start',
                next: 'chemburn-start',
            },
        ],
    },
    {
        id: 'chemburn-grade2-dispo',
        type: 'info',
        module: 5,
        title: 'Grade II Disposition',
        body: '**Grade II may go either way:**\n\n**Consider Admission if:**\n- Significant limbal ischemia (approaching 1/3)\n- High-risk agent (strong alkali)\n- Poor social situation\n- Unable to afford/obtain medications\n- Pediatric patient\n\n**May Discharge if:**\n- Reliable adult patient\n- Can obtain all medications\n- Confirmed ophthalmology follow-up within 24 hours\n- Clear understanding of medication regimen\n- Able to return immediately if worsening\n\n**Discharge Medications:**\n- Prednisolone 1% Q2H while awake\n- Fluoroquinolone QID\n- Cycloplegic daily\n- Preservative-free tears hourly\n- Vitamin C 2g PO QID\n- Doxycycline 100mg PO BID [1][2]',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Prednisolone acetate 1%',
                dose: '1 drop',
                route: 'Ophthalmic',
                frequency: 'Q2H while awake',
                duration: '7-10 days then taper',
                notes: 'Outpatient regimen for Grade II. Must taper by day 10-14.',
            },
            alternative: {
                drug: 'Moxifloxacin 0.5%',
                dose: '1 drop',
                route: 'Ophthalmic',
                frequency: 'QID',
                duration: 'Until epithelial healing',
                notes: 'Prophylactic fluoroquinolone. Also prescribe: cycloplegic daily, Vitamin C 2g PO QID, Doxycycline 100mg PO BID.',
            },
            monitoring: 'Ophthalmology follow-up within 24 hours mandatory. Return immediately for worsening pain, vision changes, or increasing redness.',
        },
        next: 'chemburn-discharge',
    },
    {
        id: 'chemburn-discharge',
        type: 'info',
        module: 5,
        title: 'Discharge Instructions',
        body: '**Discharge Criteria (Grade I-II):**\n- pH normalized and stable (×2 readings)\n- Ophthalmology follow-up confirmed\n- Medications provided/prescribed\n- Patient understands regimen\n\n**Medications:**\n- Antibiotic drops or ointment QID\n- Steroid drops (per grade)\n- Cycloplegic (per grade)\n- Preservative-free tears q1-2h\n- ± Oral vitamin C\n- ± Oral doxycycline\n\n**Return Precautions:**\n- Worsening pain\n- Decreased vision\n- Increasing redness\n- Discharge or crusting\n- Photophobia worsening\n\n**Follow-Up:**\n- Grade I: 24-48 hours\n- Grade II: 24 hours (mandatory)\n\n**Work/Activity:**\n- No eye rubbing\n- Protective eyewear\n- Avoid irritants [1][2]',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Erythromycin 0.5% ointment',
                dose: '0.5 inch ribbon',
                route: 'Ophthalmic',
                frequency: 'QID',
                duration: 'Until epithelial healing',
                notes: 'Or fluoroquinolone drops QID for Grade II. Grade-specific steroid and cycloplegic dosing applies.',
            },
            alternative: {
                drug: 'Moxifloxacin 0.5%',
                dose: '1 drop',
                route: 'Ophthalmic',
                frequency: 'QID',
                duration: 'Until epithelial healing',
                notes: 'Preferred for Grade II. Also give preservative-free tears q1-2h.',
            },
            monitoring: 'Ophthalmology follow-up: Grade I in 24-48h, Grade II in 24h (mandatory). Return for worsening pain, decreased vision, increasing redness, discharge, or worsening photophobia.',
        },
        options: [
            {
                label: 'Complete — Return to Start',
                next: 'chemburn-start',
            },
        ],
    },
    {
        id: 'chemburn-complications',
        type: 'info',
        module: 5,
        title: 'Potential Complications',
        body: '**Long-Term Complications:**\n\n| Complication | Mechanism | Incidence |\n|--------------|-----------|------------|\n| **Glaucoma** | TM damage, inflammation | 15-55% (severe) |\n| **Symblepharon** | Conjunctival scarring | Common Grade III-IV |\n| **Corneal scarring** | LSCD, stromal damage | Proportional to grade |\n| **Dry eye** | Goblet cell destruction | Very common |\n| **Entropion/Ectropion** | Lid scarring | Weeks-months |\n| **Cataract** | Direct chemical damage | Variable |\n| **Neovascularization** | LSCD, inflammation | Grade III-IV |\n| **Corneal perforation** | Steroids + severe injury | If steroids continued >14d |\n\n**LSCD = Limbal Stem Cell Deficiency**\n- Occurs with >50% limbal ischemia\n- Leads to persistent epithelial defects\n- May require limbal stem cell transplant [1][4]',
        citation: [1, 4],
        options: [
            {
                label: 'Complete — Return to Start',
                next: 'chemburn-start',
            },
        ],
    },
];
export const CHEMICAL_BURN_MODULE_LABELS = [
    'Recognition',
    'Irrigation Protocol',
    'Classification',
    'Treatment Cascade',
    'Disposition',
];
export const CHEMICAL_BURN_CITATIONS = [
    { num: 1, text: 'EB Medicine. Ophthalmic Emergencies: Acute Visual Complaints. 2024.' },
    { num: 2, text: 'AAO EyeNet. Treating Acute Chemical Injuries of the Cornea. 2023.' },
    { num: 3, text: 'StatPearls. Ocular Burns. 2024.' },
    { num: 4, text: 'OpenEvidence. Chemical Eye Injury ED Management. 2024.' },
];
