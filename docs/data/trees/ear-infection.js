// MedKitt — Ear Infection Consult
// Otitis Media → Otitis Externa → Malignant OE → Fungal → Perforated TM → Mastoiditis
// 7 modules: Initial Assessment → Otitis Media → Otitis Externa → Malignant OE → Fungal/Otomycosis → Perforated TM → Mastoiditis
// Comprehensive ear infection decision support
export const EAR_INFECTION_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'ear-start',
        type: 'question',
        module: 1,
        title: 'Ear Infection — Initial Assessment',
        body: '[Ear Infection Overview](#/info/ear-overview)\n\n**Key Differentiating Features:**\n\n• **Tragal tenderness** → Otitis Externa\n• **Bulging TM** → Acute Otitis Media\n• **Granulation tissue at bony-cartilaginous junction** → Malignant OE\n• **Postauricular swelling/tenderness** → Mastoiditis\n• **Fluffy debris, failed topical Abx** → Fungal (Otomycosis)\n\n**Red Flags — Immediate Concern:**\n• Facial nerve palsy (CN VII)\n• Postauricular swelling with pinna protrusion\n• Cranial nerve involvement\n• Immunocompromised with severe pain\n• Diabetes with OE not responding to treatment\n\nWhat is the primary presentation?',
        citation: [1, 2, 3],
        options: [
            {
                label: 'Middle Ear Pain / TM Findings',
                description: 'Bulging TM, effusion, ear pain without tragal tenderness',
                next: 'ear-aom-assess',
            },
            {
                label: 'Canal Inflammation / Tragal Tenderness',
                description: 'Ear canal edema, debris, pain with pinna manipulation',
                next: 'ear-oe-assess',
            },
            {
                label: 'Postauricular Swelling',
                description: 'Swelling behind ear, pinna displaced forward',
                next: 'ear-mastoid-assess',
                urgency: 'urgent',
            },
            {
                label: 'Perforated TM / Drainage',
                description: 'Visible perforation, otorrhea, recent trauma or AOM',
                next: 'ear-perf-assess',
            },
        ],
        summary: 'Key differentiators: tragal tenderness=OE, bulging TM=AOM, postauricular swelling=mastoiditis, granulation tissue=malignant OE',
    },
    // =====================================================================
    // MODULE 2: ACUTE OTITIS MEDIA
    // =====================================================================
    {
        id: 'ear-aom-assess',
        type: 'info',
        module: 2,
        title: 'Acute Otitis Media — Diagnosis',
        body: '[AOM Diagnostic Criteria](#/info/ear-aom-criteria)\n\n**AAP 2013 Diagnostic Criteria — Diagnose AOM when:** [1][2]\n\n• **Moderate-severe bulging of TM**, OR\n• **New onset otorrhea** (not from OE), OR\n• **Mild bulging** with recent (<48h) ear pain OR intense TM erythema\n\n**Must have middle ear effusion (MEE)** confirmed by:\n• Pneumatic otoscopy (decreased TM mobility)\n• Tympanometry\n\n**Key Point:** Bulging TM is the best discriminator — 92% of children with AOM have bulging vs 0% with OME (effusion only). [1]\n\n**Cannot diagnose AOM without MEE** — TM erythema alone is insufficient (can be from crying, fever).',
        citation: [1, 2],
        next: 'ear-aom-severity',
        summary: 'AOM diagnosis: bulging TM (92% sensitive) + middle ear effusion; TM erythema alone is insufficient',
    },
    {
        id: 'ear-aom-severity',
        type: 'question',
        module: 2,
        title: 'AOM — Severity Assessment',
        body: '**Assess severity to guide treatment decision:** [1][2]\n\n**Severe Symptoms (ANY of the following):**\n• Moderate-severe otalgia\n• Otalgia ≥48 hours duration\n• Temperature ≥39°C (102.2°F)\n\n**Mild Symptoms:**\n• Otalgia <48 hours\n• Fever <39°C\n• Pain controlled with OTC analgesics\n\n**Age considerations:**\n• <6 months → Always treat\n• 6-23 months → Treat bilateral AOM or severe symptoms\n• ≥24 months → May observe mild unilateral or bilateral',
        citation: [1, 2],
        options: [
            {
                label: 'Severe Symptoms',
                description: 'Moderate-severe pain, otalgia ≥48h, or temp ≥39°C',
                next: 'ear-aom-treat',
            },
            {
                label: 'Mild Symptoms, Age <24 months, Bilateral',
                description: 'Bilateral AOM in infant/toddler',
                next: 'ear-aom-treat',
            },
            {
                label: 'Mild Symptoms, Age ≥24 months',
                description: 'Unilateral or bilateral, mild pain, tolerating PO',
                next: 'ear-aom-observe',
            },
            {
                label: 'Otorrhea with AOM',
                description: 'Spontaneous TM perforation with drainage',
                next: 'ear-aom-treat',
            },
        ],
        summary: 'Severe AOM: otalgia >=48h, temp >=39C, or moderate-severe pain → treat; mild symptoms age >=24mo → may observe',
    },
    {
        id: 'ear-aom-observe',
        type: 'info',
        module: 2,
        title: 'Watchful Waiting Option',
        body: '[AOM Watchful Waiting Protocol](#/info/ear-aom-watchful)\n\n**Watchful Waiting Criteria (ALL must be met):** [1][2]\n\n• Age ≥6 months\n• Mild symptoms (pain <48h, temp <39°C)\n• Unilateral OR bilateral with mild symptoms in child ≥24 months\n• Reliable follow-up available within 48-72 hours\n• Parent/caregiver understands when to fill prescription\n\n**Safety-Net Antibiotic Prescription (SNAP):**\nGive prescription with instructions NOT to fill unless:\n• Persistent ear pain beyond 48 hours\n• Severe pain not relieved with OTC meds\n• Development of ear drainage\n• Fever >39°C\n\n**Evidence:** 80% of parents do NOT fill the prescription. [2]\n\n**Exclusions from Watchful Waiting:**\n• Age <6 months\n• Tympanostomy tubes\n• Immune deficiencies\n• Craniofacial abnormalities\n• Recurrent/chronic OM',
        citation: [1, 2],
        next: 'ear-aom-analgesia',
        summary: 'Watchful waiting: age >=6mo, mild symptoms, reliable follow-up 48-72h; give safety-net prescription — 80% never fill',
    },
    {
        id: 'ear-aom-treat',
        type: 'info',
        module: 2,
        title: 'AOM — Antibiotic Treatment',
        body: '[AOM Antibiotic Dosing](#/info/ear-aom-abx)\n\n**First-Line: High-Dose Amoxicillin** [1][2][3]\n\n| Population | Dose | Frequency | Duration |\n|------------|------|-----------|----------|\n| Children | 80-90 mg/kg/day | Divided BID | See below |\n| Adults | 500-875 mg | TID or BID | 5-7 days |\n\n**Duration by Age/Severity:**\n• Children <2 years: **10 days**\n• Children ≥2 years, mild-moderate: **5 days**\n• Children ≥2 years, severe: **10 days**\n• Perforated TM: **10 days**\n\n**Use Amoxicillin-Clavulanate if:** [3]\n• Amoxicillin use within past 30 days\n• Concurrent purulent conjunctivitis\n• History of AOM refractory to amoxicillin\n• Treatment failure after 48-72 hours\n\n**Amox-Clav Dosing:**\n• Children: 90 mg/kg/day (amox component) divided BID\n• Adults: 875/125 mg BID × 5-10 days',
        citation: [1, 2, 3],
        next: 'ear-aom-allergy',
        summary: 'First-line: high-dose amoxicillin 80-90mg/kg/day BID; use amox-clav if recent abx, purulent conjunctivitis, or failure',
    },
    {
        id: 'ear-aom-allergy',
        type: 'question',
        module: 2,
        title: 'Penicillin Allergy Status',
        body: '**Select penicillin allergy history:**\n\n**Type I (Severe/Anaphylactic):**\n• Anaphylaxis, angioedema, urticaria\n• Immediate reaction within 1 hour\n• Avoid ALL beta-lactams\n\n**Non-Type I (Non-Severe):**\n• Delayed rash (>24 hours)\n• GI upset\n• Cephalosporins usually safe (cross-reactivity <2%)',
        citation: [3],
        options: [
            {
                label: 'No Penicillin Allergy',
                description: 'Proceed with amoxicillin or amox-clav',
                next: 'ear-aom-analgesia',
            },
            {
                label: 'Non-Type I Allergy',
                description: 'Delayed rash, GI upset — cephalosporins OK',
                next: 'ear-aom-ceph',
            },
            {
                label: 'Type I / Severe Allergy',
                description: 'Anaphylaxis, urticaria, angioedema',
                next: 'ear-aom-macro',
            },
        ],
        summary: 'PCN allergy: Type I (anaphylaxis) → avoid beta-lactams; Non-Type I → cephalosporins safe (<2% cross-react)',
    },
    {
        id: 'ear-aom-ceph',
        type: 'info',
        module: 2,
        title: 'Cephalosporin Alternatives',
        body: '**Non-Type I PCN Allergy — Cephalosporin Options:** [3]\n\n| Drug | Pediatric Dose | Adult Dose | Duration |\n|------|----------------|------------|----------|\n| Cefdinir | 14 mg/kg/day ÷ q12-24h (max 600 mg/day) | 300 mg BID | 5-7 days |\n| Cefuroxime | 30 mg/kg/day ÷ BID (max 500 mg/dose) | 500 mg BID | 5-7 days |\n| Cefpodoxime | 10 mg/kg/day ÷ BID (max 200 mg/dose) | 200 mg BID | 5-7 days |\n\n**Treatment Failure on First-Line:**\n• **Ceftriaxone** 50 mg/kg IM daily × 3 days (max 1g/dose)\n\n**Cross-Reactivity Note:**\nCephalosporin cross-reactivity with penicillin is <2% for non-Type I allergies. Safe to use.',
        citation: [3],
        next: 'ear-aom-analgesia',
        summary: 'Non-Type I PCN allergy: cefdinir 14mg/kg/day, cefuroxime 30mg/kg/day, or cefpodoxime 10mg/kg/day; ceftriaxone IM x3 for failures',
    },
    {
        id: 'ear-aom-macro',
        type: 'info',
        module: 2,
        title: 'Macrolide Alternatives',
        body: '**Type I (Severe) PCN Allergy — Avoid ALL Beta-Lactams:** [3]\n\n| Drug | Pediatric Dose | Adult Dose | Duration |\n|------|----------------|------------|----------|\n| Azithromycin | Day 1: 10 mg/kg (max 500 mg) | 500 mg | Day 1 |\n| | Days 2-5: 5 mg/kg (max 250 mg) | 250 mg | Days 2-5 |\n\n**Alternative 3-Day Course:**\n• Azithromycin 10 mg/kg/day × 3 days (max 500 mg)\n\n**⚠️ Important Limitation:**\nMacrolides have LIMITED efficacy against:\n• H. influenzae (many strains resistant)\n• Many S. pneumoniae strains\n\nUse ONLY when beta-lactams are truly contraindicated.',
        citation: [3],
        next: 'ear-aom-analgesia',
        summary: 'Type I PCN allergy: azithromycin 10mg/kg day 1 then 5mg/kg days 2-5; limited efficacy vs H. flu and S. pneumo',
    },
    {
        id: 'ear-aom-analgesia',
        type: 'info',
        module: 2,
        title: 'Pain Management',
        body: '**Adequate analgesia is essential** — pain may persist 24-48 hours after antibiotics started. [1]\n\n**Oral Analgesics (First-Line):**\n\n| Drug | Pediatric Dose | Adult Dose | Frequency |\n|------|----------------|------------|----------|\n| Acetaminophen | 15 mg/kg/dose | 650-1000 mg | q4-6h PRN |\n| Ibuprofen | 10 mg/kg/dose | 400-600 mg | q6-8h PRN |\n\n**Topical Anesthetic Drops:**\n• Antipyrine/benzocaine (Auralgan): 3-4 drops q1-2h PRN\n• 1% lidocaine drops may provide additional relief\n• **Contraindicated if TM perforated**\n• Limited evidence; not FDA-approved for AOM\n\n**NOT Recommended:**\n• Decongestants — no benefit, side effects\n• Antihistamines — no benefit for AOM',
        citation: [1, 4],
        next: 'ear-aom-followup',
        summary: 'Pain management: acetaminophen 15mg/kg or ibuprofen 10mg/kg; topical drops (contraindicated if TM perforated)',
    },
    {
        id: 'ear-aom-followup',
        type: 'info',
        module: 2,
        title: 'Follow-Up & Referral',
        body: '**Follow-Up Instructions:**\n• Return if no improvement in 48-72 hours\n• Return immediately if worsening (fever, severe pain, swelling behind ear)\n• Hearing should return to normal within 2-3 months\n\n**Treatment Failure (No improvement at 48-72h):**\n• Switch to amox-clav if on amoxicillin\n• Consider ceftriaxone IM × 3 days\n• ENT referral if multiple failures\n\n**ENT Referral Indications:**\n• **Recurrent AOM:** 3 episodes in 6 months OR 4 in 12 months\n• Treatment failures despite escalated therapy\n• Chronic OME (>3 months with hearing loss)\n• Suspected cholesteatoma\n• Tympanostomy tube consideration\n\n**Tympanostomy Tubes (AAO-HNSF 2022):**\n• Recurrent AOM with MEE at time of evaluation\n• Reduces recurrence frequency significantly',
        citation: [1, 5],
        next: 'ear-dispo',
        summary: 'Follow-up 48-72h if no improvement; ENT referral for recurrent AOM (3 in 6mo or 4 in 12mo) or treatment failures',
    },
    // =====================================================================
    // MODULE 3: OTITIS EXTERNA
    // =====================================================================
    {
        id: 'ear-oe-assess',
        type: 'question',
        module: 3,
        title: 'Otitis Externa — Risk Assessment',
        body: '[Otitis Externa Overview](#/info/ear-oe-overview)\n\n**Classic OE Features:** [6]\n• Rapid onset (<48 hours)\n• **Tragal tenderness** (classic finding)\n• Pain with pinna manipulation\n• Ear canal edema, erythema, debris\n• ± Otorrhea\n\n**Distinguish from AOM:**\n• OE: Tragal tenderness, visible canal inflammation\n• AOM: TM findings, no tragal tenderness\n\n**Assess for Malignant OE Risk Factors:**',
        citation: [6, 7],
        options: [
            {
                label: 'Low Risk — Typical OE',
                description: 'Immunocompetent, no diabetes, first episode',
                next: 'ear-oe-treat',
            },
            {
                label: 'Diabetes or Immunocompromised',
                description: 'DM, HIV, chemo, transplant, elderly',
                next: 'ear-oe-risk',
                urgency: 'urgent',
            },
            {
                label: 'Failed Topical Treatment',
                description: 'No improvement after 7-10 days of topical therapy',
                next: 'ear-oe-failed',
                urgency: 'urgent',
            },
            {
                label: 'Suspect Fungal (Otomycosis)',
                description: 'Fluffy debris, itching > pain, failed antibacterials',
                next: 'ear-fungal-assess',
            },
        ],
        summary: 'OE: tragal tenderness (classic), pain with pinna manipulation, canal edema; distinguish from AOM by location',
    },
    {
        id: 'ear-oe-risk',
        type: 'question',
        module: 3,
        title: 'Malignant OE Red Flags',
        body: '[Malignant OE Red Flags](#/info/ear-moe-flags)\n\n**Assess for Necrotizing (Malignant) Otitis Externa:** [7][8]\n\n**High-Risk Red Flags:**\n• **Granulation tissue** at bony-cartilaginous junction of EAC\n• **Cranial nerve palsy** (CN VII most common, also IX, X, XI, XII)\n• **Severe, deep, unrelenting pain** disproportionate to exam\n• **Trismus**\n• OE not responding to topical treatment after 7-10 days\n• Fever in setting of OE\n\n**Malignant OE is an EMERGENCY** — osteomyelitis of skull base, mortality up to 20% if untreated.\n\nAre ANY red flags present?',
        citation: [7, 8],
        options: [
            {
                label: 'Red Flags Present',
                description: 'Granulation tissue, CN palsy, severe pain, trismus, fever',
                next: 'ear-moe-workup',
                urgency: 'critical',
            },
            {
                label: 'No Red Flags — High-Risk Patient',
                description: 'Diabetic/immunocompromised but no red flags yet',
                next: 'ear-oe-treat-escalate',
            },
        ],
        summary: 'Malignant OE red flags: granulation tissue, CN VII palsy, severe disproportionate pain, trismus, failed topical Rx',
    },
    {
        id: 'ear-oe-treat',
        type: 'info',
        module: 3,
        title: 'OE — Topical Treatment',
        body: '[OE Treatment Guide](#/info/ear-oe-treatment)\n\n**First-Line Topical Antibiotics:** [6][9]\n\n| Medication | Dose | Frequency | Duration |\n|------------|------|-----------|----------|\n| Cipro/dex (Ciprodex) | 4 drops | BID | 7 days |\n| Ofloxacin 0.3% | 5-10 drops | Daily | 7 days |\n| Ciprofloxacin 0.2% | 3-4 drops | BID | 7 days |\n\n**Acidifying Agents (Mild OE/Prevention):**\n• Acetic acid 2%: 5 drops TID × 7 days\n• Acetic acid/hydrocortisone: 5 drops TID-QID × 7 days\n\n**Administration Technique:**\n1. Warm drops in hands 1-2 minutes\n2. Lie with affected ear up\n3. Instill drops\n4. Maintain position 60 seconds\n5. Keep ear DRY between treatments\n\n**Severe Swelling — Place Ear Wick:**\nIf canal too swollen for drops to penetrate, insert wick (Merocel, Pope Oto-Wick) and apply drops to external end.',
        citation: [6, 9],
        next: 'ear-oe-wick',
        summary: 'Topical fluoroquinolone drops: Ciprodex 4 drops BID or ofloxacin daily × 7 days; keep ear dry',
    },
    {
        id: 'ear-oe-wick',
        type: 'info',
        module: 3,
        title: 'Ear Wick Placement',
        body: '**When to Place Ear Wick:** [9]\n• Severe ear canal edema preventing drop penetration\n• Canal too swollen to visualize TM\n• Drops not reaching deep canal\n\n**Wick Options:**\n• Commercial expandable wicks (Merocel, Pope Oto-Wick)\n• 0.25-inch gauze packing\n\n**Technique:**\n1. Clean canal of debris if possible (suction or curette)\n2. Insert wick gently into canal\n3. Apply antibiotic drops to external end of wick\n4. Drops will wick into canal\n5. Apply drops 2-4 times daily per medication frequency\n\n**Follow-Up:**\n• Wick typically falls out as swelling decreases (2-3 days)\n• Remove manually if not out by 48-72 hours\n• Re-evaluate if no improvement in 48-72 hours',
        citation: [9],
        next: 'ear-oe-oral',
        summary: 'Ear wick for severe swelling: insert wick, apply drops to external end; wick falls out in 2-3 days as swelling resolves',
    },
    {
        id: 'ear-oe-oral',
        type: 'info',
        module: 3,
        title: 'When Oral Antibiotics Needed',
        body: '**Indications for Oral Antibiotics:** [6][9]\n\n• Infection extending beyond ear canal (cellulitis of face/neck)\n• Fever\n• Immunocompromised patients\n• Diabetes mellitus\n• Severe edema preventing topical penetration even with wick\n• Failed topical therapy after 7-10 days\n\n**Oral Antibiotic Options:**\n\n| Medication | Dose | Frequency | Duration |\n|------------|------|-----------|----------|\n| Ciprofloxacin | 500 mg | BID | 10 days |\n| Cephalexin | 500 mg | QID | 10 days |\n\n**Choose based on:**\n• Cipro if Pseudomonas suspected (water exposure, diabetic)\n• Cephalexin if Staph more likely\n\n**Note:** 20-40% of OE patients receive oral antibiotics inappropriately. Reserve for above indications only.',
        citation: [6, 9],
        next: 'ear-dispo',
        summary: 'Oral abx for OE: only if extension beyond canal, fever, immunocompromised, DM, or failed topical; cipro 500mg BID × 10d',
    },
    {
        id: 'ear-oe-treat-escalate',
        type: 'info',
        module: 3,
        title: 'High-Risk OE — Escalated Treatment',
        body: '**High-Risk Patient (DM/Immunocompromised) WITHOUT Red Flags:** [7][8]\n\n**Treatment:**\n• Start topical fluoroquinolone drops (Ciprodex or ofloxacin)\n• LOWER threshold for oral antibiotics\n• Consider starting oral ciprofloxacin 500 mg BID empirically\n\n**Close Monitoring:**\n• Re-evaluate in 48-72 hours\n• Obtain baseline ESR, CRP (will help monitor if progresses)\n• Consider early ENT referral\n\n**Escalation Triggers — Return Immediately If:**\n• Worsening pain despite treatment\n• Development of cranial nerve symptoms\n• Fever\n• Granulation tissue develops\n• No improvement in 1 week\n\n**If ANY Red Flags Develop → Malignant OE Workup**',
        citation: [7, 8],
        next: 'ear-dispo',
        summary: 'High-risk OE: lower threshold for oral cipro; baseline ESR/CRP; close follow-up 48-72h; immediate return if red flags develop',
    },
    {
        id: 'ear-oe-failed',
        type: 'question',
        module: 3,
        title: 'Failed Topical Treatment',
        body: '**OE Not Responding After 7-10 Days of Topical Therapy:**\n\nConsider:\n• **Malignant OE** (especially in diabetic/immunocompromised)\n• **Fungal infection** (otomycosis)\n• **Incorrect diagnosis** (contact dermatitis, psoriasis, carcinoma)\n• **Resistant organism**\n\n**Next Step Based on Clinical Picture:**',
        citation: [7, 10],
        options: [
            {
                label: 'Diabetic / Immunocompromised',
                description: 'High suspicion for malignant OE',
                next: 'ear-moe-workup',
                urgency: 'critical',
            },
            {
                label: 'Fluffy Debris / Itching > Pain',
                description: 'Suspect fungal (otomycosis)',
                next: 'ear-fungal-assess',
            },
            {
                label: 'Immunocompetent, No Fungal Signs',
                description: 'Consider resistant bacteria, dermatitis',
                next: 'ear-oe-refer',
            },
        ],
        summary: 'Failed topical OE treatment: rule out malignant OE (in DM/immunocompromised), fungal, or alternative diagnosis',
    },
    {
        id: 'ear-oe-refer',
        type: 'info',
        module: 3,
        title: 'ENT Referral for Refractory OE',
        body: '**Refractory OE in Immunocompetent Patient:**\n\n**Consider Alternative Diagnoses:**\n• Contact dermatitis (nickel earrings, hearing aids, ear drops)\n• Psoriasis\n• Seborrheic dermatitis\n• Squamous cell carcinoma (rare but important)\n• Chronic granulomatous conditions\n\n**Management:**\n• Culture ear canal drainage\n• ENT referral for examination, possible biopsy\n• May need steroid drops if inflammatory condition\n• Allergy evaluation if contact dermatitis suspected\n\n**Referral Urgency:**\n• Routine if stable and improving slowly\n• Urgent if any red flags or high-risk features',
        citation: [6],
        next: 'ear-dispo',
        summary: 'Refractory OE in immunocompetent: consider contact dermatitis, psoriasis, carcinoma; culture and ENT referral',
    },
    // =====================================================================
    // MODULE 4: MALIGNANT (NECROTIZING) OTITIS EXTERNA
    // =====================================================================
    {
        id: 'ear-moe-workup',
        type: 'info',
        module: 4,
        title: 'Malignant OE — Workup',
        body: '[Malignant OE Overview](#/info/ear-moe-overview)\n\n**THIS IS AN EMERGENCY** — Skull base osteomyelitis, mortality up to 20%.\n\n**Laboratory Studies:** [7][8]\n\n| Test | Expected Finding |\n|------|------------------|\n| ESR | Elevated (often >65-100 mm/h) |\n| CRP | Elevated |\n| WBC | Usually normal or mildly elevated |\n| Glucose | Check/optimize in diabetics |\n| Creatinine | Baseline for antibiotic dosing |\n\n**Imaging:**\n\n| Modality | Indication |\n|----------|------------|\n| **CT with contrast** | First-line: bone erosion, soft tissue extent |\n| **MRI** | Better for soft tissue, intracranial extension |\n| **Tc-99m bone scan** | Disease activity (sensitive, not specific) |\n| **Gallium-67 / FDG-PET** | Treatment response monitoring |\n\n**Cultures:**\n• Culture ear canal drainage\n• Blood cultures if febrile',
        citation: [7, 8],
        next: 'ear-moe-treatment',
        summary: 'Malignant OE workup: ESR/CRP (invariably elevated), CT with contrast for bone involvement, culture drainage',
    },
    {
        id: 'ear-moe-treatment',
        type: 'info',
        module: 4,
        title: 'Malignant OE — Treatment',
        body: '[Malignant OE IV Antibiotics](#/info/ear-moe-abx)\n\n**Pseudomonas Coverage is ESSENTIAL** (>95% of cases) [7][8]\n\n**First-Line IV Treatment:**\n\n| Medication | Dose | Route | Duration |\n|------------|------|-------|----------|\n| Ciprofloxacin | 400 mg IV q8-12h | IV→PO | 6-8 weeks minimum |\n\n**Alternative IV Regimens (if FQ resistance or allergy):**\n\n| Medication | Dose | Frequency |\n|------------|------|----------|\n| Ceftazidime | 2g IV | q8h |\n| Piperacillin-tazobactam | 4.5g IV | q6h |\n| Cefepime | 2g IV | q8h |\n| Meropenem | 1g IV | q8h |\n\n**Treatment Duration:**\n• **Minimum 6 weeks** of culture-directed therapy\n• Continue until clinical resolution AND normalized ESR/CRP\n• Some cases require up to 29 weeks\n\n**Consults Required:**\n• Otolaryngology (debridement)\n• Infectious Disease\n• Neurosurgery (if intracranial involvement)',
        citation: [7, 8],
        next: 'ear-moe-admit',
        summary: 'Malignant OE: IV ciprofloxacin 400mg q8h or anti-pseudomonal beta-lactam; 6-8 weeks minimum; ENT + ID consult',
    },
    {
        id: 'ear-moe-admit',
        type: 'result',
        module: 4,
        title: 'Admit — Malignant OE',
        body: 'Necrotizing otitis externa requires admission for IV antibiotics and multidisciplinary care.',
        recommendation: '**ADMISSION REQUIRED**\n\n**Diagnosis:** Necrotizing (Malignant) Otitis Externa\n\n**Disposition:**\n• Admit to medicine or ENT service\n• IV antibiotics × 6-8 weeks\n• PICC line for outpatient IV after stabilization\n\n**Consults:**\n• ENT (surgical debridement of granulation tissue)\n• Infectious Disease\n• Neurosurgery (if intracranial extension)\n• Endocrinology (diabetes optimization critical for healing)\n\n**Monitoring:**\n• Weekly ESR/CRP during treatment\n• Repeat imaging (Gallium or PET) to assess response\n• Audiometry baseline\n\n**Glucose Control:**\nOptimize diabetes — critical for treatment success.',
        citation: [7, 8],
        summary: 'Admit for malignant OE: IV abx 6-8 weeks, ENT debridement, ID consult, optimize glucose control',
    },
    // =====================================================================
    // MODULE 5: FUNGAL (OTOMYCOSIS)
    // =====================================================================
    {
        id: 'ear-fungal-assess',
        type: 'info',
        module: 5,
        title: 'Otomycosis — Assessment',
        body: '[Otomycosis Overview](#/info/ear-fungal-overview)\n\n**When to Suspect Fungal Otitis:** [10]\n\n• OE not responding to topical antibacterials\n• Immunocompromised patient\n• Prolonged antibiotic use (topical or systemic)\n• Chronic otorrhea\n• Previous otomycosis\n• Humid climate / frequent water exposure\n\n**Visual Findings:**\n\n**Aspergillus spp (90% of cases):**\n• Black or yellow dots/spores\n• Fuzzy white or gray masses\n• "Wet newspaper" or cotton-like debris\n• Black-headed hyphae visible\n\n**Candida spp (10% of cases):**\n• Thick, creamy white discharge\n• White, cheesy material\n\n**Symptoms:**\n• Intense itching (often > pain)\n• Fullness sensation\n• Hearing loss\n• Minimal erythema compared to bacterial OE',
        citation: [10],
        next: 'ear-fungal-treat',
        summary: 'Otomycosis: suspect if failed antibacterials, itching > pain; Aspergillus (black spores, fuzzy debris) or Candida (white cheesy)',
    },
    {
        id: 'ear-fungal-treat',
        type: 'info',
        module: 5,
        title: 'Otomycosis — Treatment',
        body: '**Step 1: Aural Toilet (ESSENTIAL)** [10]\n• Thorough cleaning/suctioning of fungal debris\n• Do NOT irrigate (promotes fungal spread)\n• May need repeated cleanings\n\n**Step 2: Topical Antifungals**\n\n| Medication | Dose | Frequency | Duration |\n|------------|------|-----------|----------|\n| Clotrimazole 1% solution | Fill canal | BID | 14 days |\n| Miconazole 2% | Fill canal | BID | 14 days |\n| Acetic acid 2% | 5 drops | TID-QID | 14 days |\n\n**Clotrimazole efficacy: 95-100%** — broad-spectrum against Aspergillus and Candida, not ototoxic.\n\n**Step 3: Keep Dry**\n• Avoid water exposure\n• Cotton ball with petroleum jelly for showering\n\n**Refractory Cases:**\n• Oral itraconazole 100-200 mg daily × 2-4 weeks\n• Oral fluconazole 100-200 mg daily × 2-4 weeks (better for Candida)\n\n**Follow-Up:** 2 weeks for response assessment. High recurrence rate.',
        citation: [10],
        next: 'ear-dispo',
        summary: 'Otomycosis: aural toilet (no irrigation), clotrimazole 1% BID × 14 days, keep ear dry; high recurrence rate',
    },
    // =====================================================================
    // MODULE 6: PERFORATED TYMPANIC MEMBRANE
    // =====================================================================
    {
        id: 'ear-perf-assess',
        type: 'question',
        module: 6,
        title: 'TM Perforation — Etiology',
        body: '[TM Perforation Overview](#/info/ear-perf-overview)\n\n**Traumatic Perforation:**\n• Direct trauma (Q-tips, bobby pins, pencils)\n• Barotrauma (diving, flying, blast)\n• Slag/welding burns\n• Slap to ear\n• Usually clean edges, central location\n\n**Infectious Perforation:**\n• Complication of AOM\n• Spontaneous rupture from pressure\n• Often with purulent drainage\n• Pain typically IMPROVES after rupture (pressure release)\n\n**Etiology:**',
        citation: [11, 12],
        options: [
            {
                label: 'Traumatic Perforation',
                description: 'Direct injury, barotrauma, blast',
                next: 'ear-perf-trauma',
            },
            {
                label: 'Infectious / AOM Complication',
                description: 'Spontaneous rupture with purulent drainage',
                next: 'ear-perf-infection',
            },
        ],
        summary: 'TM perforation: traumatic (direct injury, barotrauma) or infectious (AOM complication, pain improves after rupture)',
    },
    {
        id: 'ear-perf-trauma',
        type: 'info',
        module: 6,
        title: 'Traumatic TM Perforation',
        body: '**Assessment:**\n• Document size and location of perforation\n• Test hearing (Weber and Rinne)\n• Assess for vertigo (inner ear involvement)\n• Check facial nerve function\n• Look for CSF leak (clear watery fluid)\n\n**Safe Drops for Perforated TM:** [11][12]\n\n**USE (Fluoroquinolones — non-ototoxic):**\n• Ciprofloxacin 0.3% — 3-4 drops BID\n• Ofloxacin 0.3% — 5-10 drops daily\n• Ciprofloxacin/dexamethasone — 4 drops BID\n\n**AVOID (Ototoxic Aminoglycosides):**\n• Neomycin\n• Tobramycin\n• Polymyxin B\n• Gentamicin\n• Alcohol-containing drops\n\n**Urgent ENT Referral:**\n• Sensorineural hearing loss\n• Vertigo\n• Suspected ossicular damage\n• Facial nerve palsy\n• CSF leak',
        citation: [11, 12],
        next: 'ear-perf-healing',
        summary: 'Traumatic TM perf: only use fluoroquinolone drops (ofloxacin, cipro) — aminoglycosides are ototoxic; urgent ENT if SNHL or vertigo',
    },
    {
        id: 'ear-perf-infection',
        type: 'info',
        module: 6,
        title: 'Infectious TM Perforation',
        body: '**AOM with Spontaneous Perforation:**\n\n**Treatment:** [1][11]\n• Treat as AOM (oral antibiotics)\n• Amoxicillin 80-90 mg/kg/day divided BID × **10 days** (longer course for perforation)\n• OR Amox-clav if indicated\n\n**Topical Drops (Safe for Perforated TM):**\n• Ofloxacin 0.3% — 5-10 drops daily × 7 days\n• Ciprofloxacin/dexamethasone — 4 drops BID\n• May help clear drainage faster\n\n**Pain Management:**\n• Acetaminophen/ibuprofen\n• **Do NOT use benzocaine drops** (TM perforated)\n\n**Follow-Up:**\n• Recheck in 2-4 weeks to assess healing\n• Most AOM perforations heal within 1 month',
        citation: [1, 11],
        next: 'ear-perf-healing',
        summary: 'Infectious TM perf: oral amoxicillin × 10 days (extended course) + fluoroquinolone drops; most heal within 1 month',
    },
    {
        id: 'ear-perf-healing',
        type: 'info',
        module: 6,
        title: 'Healing Expectations',
        body: '**Spontaneous Closure Rates:** [12]\n\n• Overall: **80-94% heal spontaneously**\n• Traumatic perforations: 85-94%\n• AOM perforations: 94% within 1 month\n\n**Healing Timeline:**\n\n| Perforation Size | Expected Healing Time |\n|------------------|----------------------|\n| Small (<25% TM) | 2-4 weeks |\n| Medium (25-50%) | 3-4 weeks |\n| Large (>50%) | ~47 days; many fail to heal |\n| Marginal perforation | 45% not healed at 12 weeks |\n\n**Factors Affecting Healing:**\n• Size (larger = less likely to heal)\n• Location (central better than marginal)\n• Wet vs dry (dry heals faster)\n• Infection (delays healing)\n\n**Patient Instructions:**\n• Keep ear DRY (cotton ball + petroleum jelly for showering)\n• No swimming until healed\n• Avoid forceful nose blowing\n• Follow-up in 2-4 weeks\n\n**Surgical Repair (Tympanoplasty):**\n• Perforation persisting >2-3 months\n• Large defects unlikely to heal\n• Success rate: 90-95%',
        citation: [12],
        next: 'ear-dispo',
        summary: 'TM healing: 80-94% spontaneous closure; small perfs 2-4 weeks; keep dry; tympanoplasty if persisting >2-3 months',
    },
    // =====================================================================
    // MODULE 7: MASTOIDITIS
    // =====================================================================
    {
        id: 'ear-mastoid-assess',
        type: 'info',
        module: 7,
        title: 'Mastoiditis — Assessment',
        body: '[Mastoiditis Overview](#/info/ear-mastoid-overview)\n\n**Classic Triad:** [13]\n1. **Postauricular swelling and erythema** (over mastoid process)\n2. **Tenderness over mastoid**\n3. **Protrusion/displacement of pinna** (pushed forward and outward)\n\n**Other Signs:**\n• Fever\n• Otalgia\n• Otorrhea (often profuse, may have pulsatile quality)\n• Loss of postauricular crease\n• Fluctuance (if subperiosteal abscess)\n• History of recent or concurrent AOM\n\n**Intracranial Complications (6-23% of cases):**\n• Headache\n• Altered mental status\n• Nuchal rigidity\n• Seizures\n• Focal neurological signs\n\n**⚠️ This is a SURGICAL EMERGENCY if abscess present**',
        citation: [13],
        next: 'ear-mastoid-workup',
        summary: 'Mastoiditis triad: postauricular swelling, mastoid tenderness, pinna protrusion; 6-23% have intracranial complications',
    },
    {
        id: 'ear-mastoid-workup',
        type: 'info',
        module: 7,
        title: 'Mastoiditis — Workup',
        body: '**Laboratory Studies:**\n• CBC with differential\n• BMP, CRP\n• Blood cultures\n\n**Imaging — CT with IV Contrast:** [13]\n\n| Finding | Significance |\n|---------|-------------|\n| Mastoid opacification | Non-specific (also in AOM/OME) |\n| Loss of bony septae | **Coalescent mastoiditis** |\n| Cortical bone destruction | Advanced disease |\n| Subperiosteal abscess | **Requires surgical drainage** |\n| Tegmen defect | Intracranial extension risk |\n| Sigmoid plate erosion | Lateral sinus thrombosis risk |\n\n**Indications for CT:**\n• Confirm clinical diagnosis\n• No improvement after 24-48 hours IV antibiotics\n• New focal neurological signs\n• Clinical deterioration\n• Suspected subperiosteal abscess\n\n**MRI if:**\n• Suspected intracranial extension\n• Cranial nerve involvement',
        citation: [13],
        next: 'ear-mastoid-treat',
        summary: 'Mastoiditis workup: CT with contrast looking for coalescent mastoiditis, subperiosteal abscess, intracranial extension',
    },
    {
        id: 'ear-mastoid-treat',
        type: 'info',
        module: 7,
        title: 'Mastoiditis — Treatment',
        body: '[Mastoiditis IV Antibiotics](#/info/ear-mastoid-abx)\n\n**Common Pathogens:**\n• Streptococcus pneumoniae (most common)\n• Streptococcus pyogenes (GAS)\n• Staphylococcus aureus\n• Haemophilus influenzae\n• Pseudomonas (if chronic OM, tubes, recent abx)\n\n**First-Line Empiric Regimens:** [13][14]\n\n| Scenario | Antibiotic | Pediatric Dose | Adult Dose |\n|----------|------------|----------------|------------|\n| Standard | Ceftriaxone | 50-100 mg/kg/day ÷ q12-24h | 1-2g IV daily |\n| | + Clindamycin | 30-40 mg/kg/day ÷ q6-8h | 600-900 mg IV q8h |\n| Alternative | Ampicillin-sulbactam | 50 mg/kg q6h | 1.5-3g IV q6h |\n\n**Add Vancomycin if:**\n• MRSA risk factors\n• No improvement on initial therapy\n• Pediatric: 15 mg/kg IV q6h\n• Adult: 15-20 mg/kg IV q8-12h\n\n**Pseudomonas Coverage (chronic OM, tubes):**\n• Piperacillin-tazobactam 100 mg/kg IV q6h (peds) / 4.5g IV q6h (adult)\n\n**Duration:**\n• IV therapy: 7-14 days\n• Total course: 14 days minimum',
        citation: [13, 14],
        next: 'ear-mastoid-surgery',
        summary: 'Mastoiditis: ceftriaxone + clindamycin IV; add vancomycin if MRSA risk; ENT consult for surgical evaluation',
    },
    {
        id: 'ear-mastoid-surgery',
        type: 'info',
        module: 7,
        title: 'Surgical Indications',
        body: '**Absolute Indications for Surgery:** [13]\n\n• **Subperiosteal abscess** → Incision and drainage\n• **Coalescent mastoiditis on CT** → Myringotomy + mastoidectomy\n• **Intracranial complication** (abscess, thrombosis)\n• **No improvement after 48 hours IV antibiotics**\n\n**Surgical Options:**\n\n| Procedure | Indication |\n|-----------|------------|\n| Myringotomy ± tube | Drain middle ear, obtain culture |\n| Subperiosteal abscess I&D | Fluctuant postauricular collection |\n| Cortical mastoidectomy | Coalescent mastoiditis, failed medical therapy |\n| Radical mastoidectomy | Extensive disease, cholesteatoma |\n\n**Complications Requiring Surgical Management:**\n• Bezold\'s abscess (neck extension via mastoid tip)\n• Labyrinthitis\n• Petrous apicitis\n• Lateral sinus thrombosis (may need anticoagulation)\n• Epidural/brain abscess\n• Meningitis',
        citation: [13],
        next: 'ear-mastoid-admit',
        summary: 'Surgical indications: subperiosteal abscess, coalescent mastoiditis, intracranial complication, or failed 48h IV abx',
    },
    {
        id: 'ear-mastoid-admit',
        type: 'result',
        module: 7,
        title: 'Admit — Mastoiditis',
        body: 'Mastoiditis requires admission for IV antibiotics and urgent ENT evaluation.',
        recommendation: '**ADMISSION REQUIRED**\n\n**Diagnosis:** Acute Mastoiditis\n\n**Disposition:**\n• Admit to pediatrics or medicine/ENT service\n• IV antibiotics minimum 7-14 days\n\n**Orders:**\n• IV access\n• Ceftriaxone + clindamycin (± vancomycin)\n• CT temporal bone with IV contrast if not done\n• Blood cultures\n• Pain management\n\n**Consults:**\n• ENT (urgent) — surgical evaluation\n• Infectious Disease if complex\n• Neurosurgery if intracranial involvement\n\n**Monitoring:**\n• Neurologic checks q4h (if CNS concern)\n• Daily exam for abscess formation\n• Repeat CT if no improvement in 48 hours',
        citation: [13, 14],
        summary: 'Admit mastoiditis: IV ceftriaxone + clindamycin, CT temporal bone, urgent ENT consult, neuro checks if CNS concern',
    },
    // =====================================================================
    // DISPOSITION
    // =====================================================================
    {
        id: 'ear-dispo',
        type: 'question',
        module: 1,
        title: 'Disposition',
        body: '**Final Disposition:**',
        options: [
            {
                label: 'Discharge Home',
                description: 'Uncomplicated AOM or OE, reliable follow-up',
                next: 'ear-discharge',
            },
            {
                label: 'ENT Referral (Outpatient)',
                description: 'Recurrent infections, refractory OE, TM perforation not healing',
                next: 'ear-discharge',
            },
            {
                label: 'Admission Required',
                description: 'Mastoiditis, malignant OE, intracranial complications',
                next: 'ear-admit-final',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'ear-discharge',
        type: 'result',
        module: 1,
        title: 'Discharge Instructions',
        body: 'Uncomplicated ear infection — safe for discharge with appropriate follow-up.',
        recommendation: '**Ear Infection — Discharge Instructions**\n\n**Return Immediately If:**\n• Swelling or redness behind the ear\n• Facial weakness or drooping\n• Severe headache or stiff neck\n• High fever (>39°C/102.2°F)\n• Worsening pain despite treatment\n• Dizziness or hearing loss\n\n**General Instructions:**\n• Keep ear DRY (cotton ball + petroleum jelly for showering)\n• Complete full course of antibiotics\n• Pain medication as prescribed\n• No swimming until cleared\n\n**Follow-Up:**\n• Primary care in 2-4 weeks\n• Sooner if no improvement in 48-72 hours\n• ENT referral if recurrent infections',
        citation: [1, 6],
        summary: 'Discharge: return if postauricular swelling, facial weakness, high fever, or worsening; keep ear dry; follow-up 2-4 weeks',
    },
    {
        id: 'ear-admit-final',
        type: 'result',
        module: 1,
        title: 'Admission — Ear Emergency',
        body: 'Serious ear infection requiring admission for IV antibiotics and specialist consultation.',
        recommendation: '**ADMISSION REQUIRED**\n\n**Potential Diagnoses:**\n• Acute Mastoiditis\n• Necrotizing (Malignant) Otitis Externa\n• Intracranial Extension of Infection\n\n**Immediate Actions:**\n• IV antibiotics (see specific condition)\n• CT temporal bone with contrast\n• ENT consult (urgent)\n• Blood cultures\n• Baseline labs (CBC, BMP, ESR, CRP)\n\n**Consults as Needed:**\n• Infectious Disease\n• Neurosurgery (if intracranial involvement)\n• Endocrinology (diabetes optimization)',
        summary: 'Admit for mastoiditis, malignant OE, or intracranial extension: IV abx, CT temporal bone, urgent ENT consult',
    },
];
// =====================================================================
// MODULE LABELS
// =====================================================================
export const EAR_INFECTION_MODULE_LABELS = [
    'Initial Assessment',
    'Acute Otitis Media',
    'Otitis Externa',
    'Malignant OE',
    'Otomycosis',
    'Perforated TM',
    'Mastoiditis',
];
// =====================================================================
// CITATIONS
// =====================================================================
export const EAR_INFECTION_CITATIONS = [
    { num: 1, text: 'Lieberthal AS, et al. The Diagnosis and Management of Acute Otitis Media. AAP Clinical Practice Guideline. Pediatrics. 2013;131(3):e964-e999.' },
    { num: 2, text: 'Siddiq S, Grainger J. The diagnosis and management of acute otitis media: American Academy of Pediatrics Guidelines 2013. Arch Dis Child Educ Pract Ed. 2015;100(4):193-197.' },
    { num: 3, text: 'Acute Otitis Media Empiric Therapy. Medscape Reference. Updated 2024.' },
    { num: 4, text: 'Foxlee R, et al. Topical analgesia for acute otitis media. Cochrane Database Syst Rev. 2006;(3):CD005657.' },
    { num: 5, text: 'Rosenfeld RM, et al. Clinical Practice Guideline: Tympanostomy Tubes in Children (Update). AAO-HNSF. Otolaryngol Head Neck Surg. 2022;166(1_suppl):S1-S55.' },
    { num: 6, text: 'Rosenfeld RM, et al. Clinical Practice Guideline: Acute Otitis Externa. AAO-HNSF. Otolaryngol Head Neck Surg. 2014;150(1 Suppl):S1-S24.' },
    { num: 7, text: 'Carfrae MJ, Kesser BW. Malignant Otitis Externa. Otolaryngol Clin North Am. 2008;41(3):537-549.' },
    { num: 8, text: 'Necrotizing (Malignant) External Otitis. StatPearls. NCBI Bookshelf. Updated 2024.' },
    { num: 9, text: 'Schaefer P, Baugh RF. Acute Otitis Externa: An Update. Am Fam Physician. 2012;86(11):1055-1061.' },
    { num: 10, text: 'Vennewald I, Klemm E. Otomycosis: Diagnosis and Treatment. Clin Dermatol. 2010;28(2):202-211.' },
    { num: 11, text: 'Isaacson B, et al. Ototopical agents: a review of the literature. Ann Otol Rhinol Laryngol. 2003;112(8):691-697.' },
    { num: 12, text: 'Lou ZC, et al. Traumatic tympanic membrane perforation: a study of etiology and factors affecting outcome. Am J Otolaryngol. 2012;33(5):549-555.' },
    { num: 13, text: 'Laulajainen-Hongisto A, et al. Acute Mastoiditis in Children: Diagnostic and Treatment Challenges. Int J Pediatr Otorhinolaryngol. 2021;144:110666.' },
    { num: 14, text: 'Johns Hopkins Acute Mastoiditis Clinical Pathway. Johns Hopkins All Children\'s Hospital. Updated 2020.' },
];
// =====================================================================
// CRITICAL ACTIONS
// =====================================================================
export const EAR_INFECTION_CRITICAL_ACTIONS = [
    { text: 'Malignant OE Red Flags: granulation tissue at bony-cartilaginous junction, cranial nerve palsy (especially CN VII), severe disproportionate pain, diabetes/immunocompromised — requires CT and admission', nodeId: 'ear-oe-risk' },
    { text: 'Mastoiditis Classic Triad: postauricular swelling, mastoid tenderness, pinna protrusion — surgical emergency if abscess present', nodeId: 'ear-mastoid-assess' },
    { text: 'AVOID ototoxic drops in perforated TM: no neomycin, tobramycin, polymyxin B, gentamicin — use fluoroquinolones (ofloxacin, ciprofloxacin) only', nodeId: 'ear-perf-trauma' },
    { text: 'AOM diagnosis requires middle ear effusion (pneumatic otoscopy) — TM erythema alone is insufficient; bulging TM is 92% sensitive for AOM', nodeId: 'ear-aom-assess' },
    { text: 'Watchful waiting for AOM: age ≥6mo, mild symptoms, reliable follow-up — 80% of parents never fill the safety-net prescription', nodeId: 'ear-aom-observe' },
    { text: 'Fungal OE (otomycosis): failed antibacterials + fluffy debris + itching > pain — treat with aural toilet + clotrimazole, NOT antibacterial drops', nodeId: 'ear-fungal-assess' },
];
