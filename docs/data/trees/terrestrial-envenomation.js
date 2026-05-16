// MedKitt - Terrestrial Envenomations (Spider, Scorpion, Hymenoptera)
// EB Medicine 2024 + Boyer 2009 NEJM (Anascorp) + ACMT position statements + Wilderness Medical Society
// 6 modules: Triage -> Identify Organism -> Spider -> Scorpion -> Hymenoptera -> Disposition
export const TERRESTRIAL_ENVENOMATION_CRITICAL_ACTIONS = [
    { text: 'ABCs and anaphylaxis screen on every bite/sting — IM epinephrine if systemic signs', nodeId: 'te-triage' },
    { text: 'Identify organism class: spider vs scorpion vs hymenoptera vs other', nodeId: 'te-identify' },
    { text: 'Black widow: opioids + benzos first; antivenom (Merck) only for severe refractory cases', nodeId: 'te-widow' },
    { text: 'Brown recluse: wound care + observation; NO FDA antivenom in US; check CBC/UA for systemic loxoscelism', nodeId: 'te-recluse' },
    { text: 'Bark scorpion (peds, grade III-IV): Anascorp antivenom 3 vials IV over 10 min (Boyer 2009 NEJM)', nodeId: 'te-scorpion-tx' },
    { text: 'Anaphylaxis from hymenoptera: epi 0.3-0.5mg IM (adult) or 0.01 mg/kg (peds), repeat q5-15min', nodeId: 'te-hymenoptera-anaphylaxis' },
    { text: 'Massive envenomation (>50 stings): admit, check CK/BMP/UA/LFTs for rhabdo, AKI, hemolysis', nodeId: 'te-massive' },
    { text: 'Discharge with epinephrine auto-injector + allergist referral for any systemic hymenoptera reaction', nodeId: 'te-dispo-discharge' },
];
export const TERRESTRIAL_ENVENOMATION_NODES = [
    // ===================================================================
    // MODULE 1: Triage
    // ===================================================================
    {
        id: 'te-start',
        type: 'info',
        module: 1,
        title: 'Terrestrial Envenomations Overview',
        body: 'See [Steps Summary](#/info/te-steps-summary) for rapid-action checklist.\n\n**Scope:** Non-snake, non-marine envenomations seen in the US ED. [1,2]\n- **Spiders:** Black widow (*Latrodectus*), brown recluse (*Loxosceles*), hobo, tarantula\n- **Scorpions:** Bark scorpion (*Centruroides sculpturatus*, AZ/NM/southern CA)\n- **Hymenoptera:** Bees, wasps, hornets, fire ants — leading cause of envenomation deaths in US (anaphylaxis)\n- **Other:** Centipedes, millipedes, kissing bugs, blister beetles\n\n**Why it matters:** [1,3]\n- ~50 hymenoptera anaphylaxis deaths/year in US — most preventable with rapid IM epi\n- *Centruroides* envenomation in peds can cause respiratory failure; Anascorp dramatically reduces ICU time (Boyer 2009 NEJM)\n- *Loxosceles* systemic loxoscelism (hemolysis, DIC) occurs in <10% but carries high mortality if missed\n- Black widow envenomation mimics acute abdomen and is commonly misdiagnosed\n\n**Initial priorities:**\n1. **ABCs + anaphylaxis screen** — most deaths are from hymenoptera anaphylaxis, not direct venom toxicity\n2. **Identify the organism** by geography, exposure, and lesion pattern\n3. **Risk-stratify** for systemic effects (vital signs, neuro exam, CBC/CMP/CK as indicated)\n4. **Targeted antivenom** if appropriate (*Centruroides* grade III-IV, severe widow)',
        citation: [1, 2, 3],
        next: 'te-triage',
        summary: 'Spider, scorpion, hymenoptera envenomations. Hymenoptera anaphylaxis kills most. Anascorp dramatically reduces peds scorpion ICU time. Loxoscelism <10% but deadly.',
    },
    {
        id: 'te-steps-summary',
        type: 'info',
        module: 1,
        title: 'Steps Summary',
        body: '**Rapid-action checklist for terrestrial envenomations:** [1,2,3]\n\n1. **ABCs + anaphylaxis screen** — if systemic urticaria, hypotension, respiratory distress → IM epi 0.3-0.5 mg adult / 0.01 mg/kg peds\n2. **Identify organism** — spider vs scorpion vs hymenoptera vs other (geography, exposure, lesion)\n3. **Local vs systemic** — most are local, but ~10-15% develop systemic signs\n4. **Targeted workup:**\n   - **Severe widow:** consider antivenom if refractory to opioids/benzos\n   - **Suspected loxoscelism:** CBC, BMP, UA, LDH, haptoglobin, coags\n   - **Peds scorpion grade III-IV:** Anascorp 3 vials IV over 10 min\n   - **Massive stings (>50):** CK, BMP, LFTs, UA — admit for rhabdo/AKI monitoring\n5. **Wound care + tetanus** for any break in skin\n6. **Disposition** — most discharge with PO analgesia; admit for systemic effects, antivenom, refractory pain\n7. **Discharge with epi-pen + allergist referral** for any systemic hymenoptera reaction',
        citation: [1, 2, 3],
        next: 'te-triage',
        skippable: true,
    },
    {
        id: 'te-triage',
        type: 'question',
        module: 1,
        title: 'Initial Triage — Systemic Reaction?',
        body: '**Screen every patient for anaphylaxis and severe systemic envenomation before drilling down on the organism.** [1,3]\n\n**Anaphylaxis criteria (any of):**\n- Skin/mucosa + respiratory compromise (wheezing, stridor, hypoxia)\n- Skin/mucosa + hypotension or end-organ dysfunction\n- Known exposure + 2 of: skin, GI, respiratory, cardiovascular\n\n**Severe systemic envenomation (non-anaphylactic):**\n- Hypertension >180/110 with diaphoresis, agitation (black widow, scorpion)\n- Cranial nerve dysfunction, opsoclonus, fasciculations (peds bark scorpion grade III-IV)\n- Massive stings >50 (rhabdo, AKI, hepatic injury)\n\nSelect the patient\'s presentation:',
        citation: [1, 3],
        options: [
            {
                label: 'Anaphylaxis — give IM epi NOW',
                description: 'Urticaria + respiratory or hypotension, or 2-system involvement. Most often hymenoptera.',
                next: 'te-hymenoptera-anaphylaxis',
                urgency: 'critical',
            },
            {
                label: 'Severe systemic envenomation',
                description: 'HTN crisis, neuro dysfunction, cranial nerve signs, or >50 stings',
                next: 'te-identify',
                urgency: 'critical',
            },
            {
                label: 'Local reaction only — stable vitals',
                description: 'Localized pain, erythema, swelling at bite/sting site; no systemic signs',
                next: 'te-identify',
            },
        ],
    },
    // ===================================================================
    // MODULE 2: Identify Organism
    // ===================================================================
    {
        id: 'te-identify',
        type: 'question',
        module: 2,
        title: 'Identify the Organism',
        body: '**Geography, exposure, and lesion pattern usually pin the organism even if the patient never saw it.** [1,2]\n\n**Clues:**\n- **Black widow (*Latrodectus*):** dark spider with red hourglass; pain + abdominal rigidity + HTN + diaphoresis; bite mark may be invisible\n- **Brown recluse (*Loxosceles*):** South/Central US; "violin" marking; painless bite → necrotic ulcer over days; rare systemic loxoscelism (peds, hemolysis)\n- **Bark scorpion (*Centruroides sculpturatus*):** AZ/NM/southern CA; severe local pain + paresthesias → roving eye movements, cranial nerves in peds\n- **Hymenoptera:** stinger left behind = honeybee (scrape, don\'t squeeze); wasps/hornets sting repeatedly; fire ant stings = clustered pustules on lower extremities\n- **Centipede/millipede:** large arthropod exposure; centipede = sharp pain; millipede = chemical burn-like irritation\n\nSelect the suspected organism:',
        citation: [1, 2],
        options: [
            {
                label: 'Spider — black widow, brown recluse, other',
                description: 'Spider bite or characteristic lesion',
                next: 'te-spider-which',
                urgency: 'urgent',
            },
            {
                label: 'Scorpion — bark scorpion (AZ/NM)',
                description: 'Severe local pain + paresthesias; cranial nerve signs in peds',
                next: 'te-scorpion-grade',
                urgency: 'urgent',
            },
            {
                label: 'Hymenoptera — bee, wasp, hornet, fire ant',
                description: 'Sting(s); local vs systemic vs massive',
                next: 'te-hymenoptera-assess',
                urgency: 'urgent',
            },
            {
                label: 'Centipede, millipede, or other arthropod',
                description: 'Less venomous; mostly supportive care',
                next: 'te-other',
            },
        ],
    },
    // ===================================================================
    // MODULE 3: Spider Branches
    // ===================================================================
    {
        id: 'te-spider-which',
        type: 'question',
        module: 3,
        title: 'Which Spider?',
        body: '**Match the lesion and symptoms to the species.** [2,4,5]\n\n| Feature | Black Widow | Brown Recluse | Hobo/Tarantula |\n|---------|-------------|---------------|----------------|\n| Geography | US-wide | South/Central US | NW US (hobo); SW US (tarantula) |\n| Bite pain | Sharp, then dull | Painless, late necrosis | Mild |\n| Systemic | HTN, abd rigidity, sweating, tremor | Rare loxoscelism (hemolysis, DIC) | Minimal |\n| Lesion | Pinprick, target | "Red, white, blue" → necrotic ulcer over days | Local |\n| Antivenom | Merck (rare use) | None FDA-approved in US | None |\n\nSelect the spider:',
        citation: [2, 4, 5],
        options: [
            {
                label: 'Black widow (*Latrodectus*)',
                description: 'Latrodectism: abdominal rigidity, HTN, diaphoresis, painful muscle cramps',
                next: 'te-widow',
                urgency: 'urgent',
            },
            {
                label: 'Brown recluse (*Loxosceles*)',
                description: 'Necrotic ulcer; assess for systemic loxoscelism (peds, hemolysis)',
                next: 'te-recluse',
                urgency: 'urgent',
            },
            {
                label: 'Hobo, tarantula, or other non-medically-significant spider',
                description: 'Mostly supportive care; treat as wound',
                next: 'te-spider-supportive',
            },
        ],
    },
    {
        id: 'te-widow',
        type: 'info',
        module: 3,
        title: 'Black Widow (Latrodectism)',
        body: '**Mechanism:** alpha-latrotoxin → massive presynaptic neurotransmitter release (ACh, NE) → autonomic storm + muscle cramping. [2,4]\n\n**Clinical features:** [2,4]\n- Onset 30 min - 2 h post-bite\n- Severe muscle cramps (abdomen, back, thighs) — mimics acute abdomen\n- HTN, tachycardia, diaphoresis, tremor, hyperreflexia\n- "Facies latrodectismica" — sweating, grimacing, periorbital edema\n- Peaks at 12-24h, resolves over 2-3 days\n\n**Treatment (stepwise):** [2,4]\n\n| Step | Therapy |\n|------|---------|\n| 1 | **Opioids** — morphine 0.1 mg/kg IV or hydromorphone 0.015 mg/kg IV, titrate |\n| 2 | **Benzodiazepines** — lorazepam 1-2 mg IV or diazepam 5-10 mg IV for muscle spasm |\n| 3 | **Calcium gluconate** — historically used; evidence weak, **routine use NOT recommended** [4] |\n| 4 | **Antivenom (Merck *Latrodectus mactans*)** — reserved for severe refractory cases: pregnant patients with preterm labor risk, refractory HTN, severe pain unresponsive to opioids+benzos. **Anaphylaxis risk** — premedicate with diphenhydramine + steroid; have epi ready |\n\n**Disposition:** [2]\n- Discharge after 4-6 h of observation if symptoms controlled and stable\n- Admit for: refractory pain, antivenom administration, pregnancy with concern for preterm labor, comorbid HTN/CAD\n- Outpatient: oral opioid + benzo for 24-48 h with PCP follow-up',
        citation: [2, 4],
        next: 'te-dispo',
        summary: 'Black widow: opioids + benzos first-line; calcium gluconate NOT recommended; antivenom for refractory severe cases only (anaphylaxis risk).',
        safetyLevel: 'warning',
    },
    {
        id: 'te-recluse',
        type: 'info',
        module: 3,
        title: 'Brown Recluse (Loxoscelism)',
        body: '**Mechanism:** sphingomyelinase D → dermonecrosis + complement activation. [2,5]\n\n**Local (cutaneous loxoscelism):** [2,5]\n- Initial painless bite → 2-8 h erythema, blanching ("red-white-blue" sign), then central necrosis over 3-7 days\n- Final lesion: necrotic eschar with surrounding violaceous halo\n- Resolves over weeks to months; rarely requires surgery (avoid early debridement — delineate the lesion first)\n\n**Systemic loxoscelism (<10%, more common in children):** [2,5]\n- 24-72 h after bite\n- Fever, malaise, intravascular hemolysis (positive direct Coombs), thrombocytopenia, DIC, AKI, rhabdomyolysis\n- High mortality if missed\n\n**Workup:** [2,5]\n- **Local only:** wound care, no labs needed\n- **Systemic suspicion (peds, fever, jaundice, hemoglobinuria):** CBC, BMP, LDH, haptoglobin, peripheral smear, UA, coags, CK, fibrinogen, D-dimer\n\n**Treatment:** [2,5]\n\n| Modality | Comment |\n|----------|---------|\n| **Wound care** | Cleaning, dressing, elevation, immobilization. **Avoid early debridement** — wait for lesion to demarcate (3-6 weeks) |\n| **Tetanus** | Update if indicated |\n| **Antibiotics** | Only if secondary cellulitis — most ulcers are sterile |\n| **Dapsone** | **NOT recommended routinely** — no clear benefit, risk of hemolysis (especially G6PD), methemoglobinemia [5] |\n| **Antivenom** | **NO FDA-approved antivenom in the US**. Available in South America (Brazil) but not US standard of care |\n| **Systemic loxoscelism** | Supportive: IVF, transfusion for severe hemolysis, dialysis for AKI, ICU admission |\n\n**Disposition:** [2]\n- Local only: discharge with wound care instructions, recheck in 48-72 h\n- Suspected systemic: admit for monitoring, serial CBC/UA',
        citation: [2, 5],
        next: 'te-dispo',
        summary: 'Loxoscelism: wound care + observation; NO FDA antivenom in US; dapsone NOT recommended; systemic loxoscelism (<10%) in peds needs admission for hemolysis/DIC monitoring.',
        safetyLevel: 'warning',
    },
    {
        id: 'te-spider-supportive',
        type: 'info',
        module: 3,
        title: 'Hobo, Tarantula, Other Spiders',
        body: '**Most non-medically-significant spider bites cause only local reactions.** [2]\n\n**Hobo spider (*Eratigena agrestis*, NW US):** [2]\n- Historically blamed for necrotic lesions, but CDC removed from list of medically significant spiders in 2017\n- Treat as routine wound — soap and water, ice, NSAIDs, tetanus\n\n**Tarantulas:** [2]\n- Local pain, mild erythema; rarely systemic\n- Some species shed urticating hairs — ocular exposure can cause severe keratitis (consult ophthalmology)\n- Treatment: wound care, antihistamines, topical steroid for skin irritation\n\n**Common house spiders, wolf spiders, jumping spiders:** [2]\n- Almost never cause significant symptoms; reassurance\n\n**Treatment:**\n- Soap and water cleansing\n- Ice pack, NSAIDs for pain\n- Tetanus update if indicated\n- Antibiotics only for secondary infection\n- Return precautions: spreading erythema, fever, necrosis, systemic symptoms',
        citation: [2],
        next: 'te-dispo-discharge',
        summary: 'Hobo/tarantula/other spiders: mostly local; treat as routine wound; tarantula urticating hairs can cause keratitis if eye exposure.',
    },
    // ===================================================================
    // MODULE 4: Scorpion Branch
    // ===================================================================
    {
        id: 'te-scorpion-grade',
        type: 'question',
        module: 4,
        title: 'Bark Scorpion — Severity Grading',
        body: '**Centruroides Severity Grading (used to guide Anascorp antivenom use):** [3,6]\n\n| Grade | Findings |\n|-------|----------|\n| **I** | Local pain, paresthesias at sting site only |\n| **II** | Pain + paresthesias remote from sting site |\n| **III** | Either: (a) cranial nerve dysfunction (roving eye movements, blurred vision, dysphagia, slurred speech, tongue fasciculations) OR (b) somatic skeletal neuromuscular dysfunction (restless agitation, opsoclonus, fasciculations) |\n| **IV** | BOTH cranial nerve AND somatic neuromuscular dysfunction |\n\n**Key facts:** [3,6]\n- Grade I-II almost always adults — supportive care only\n- Grade III-IV almost always children (<10 yo) — Anascorp dramatically shortens duration of symptoms and reduces ICU admission (Boyer 2009 NEJM RCT)\n- Tachycardia + hypersalivation common; respiratory failure can occur in grade IV peds\n\nSelect the grade:',
        citation: [3, 6],
        options: [
            {
                label: 'Grade I-II — Local or remote paresthesias only',
                description: 'Supportive: analgesia, benzos for spasm',
                next: 'te-scorpion-supportive',
            },
            {
                label: 'Grade III-IV — Neuromuscular or cranial nerve dysfunction',
                description: 'Anascorp antivenom indicated (especially in children)',
                next: 'te-scorpion-tx',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'te-scorpion-supportive',
        type: 'info',
        module: 4,
        title: 'Grade I-II — Supportive Care',
        body: '**Grade I-II envenomation (local pain or remote paresthesias only):** [3,6]\n\n**Treatment:**\n- **Analgesia** — opioids (morphine 0.1 mg/kg IV or hydromorphone 0.015 mg/kg IV) titrated; NSAIDs adjunct\n- **Benzodiazepines** — lorazepam 0.05-0.1 mg/kg IV for muscle spasm or anxiety\n- **Cold compresses** to sting site\n- **Tetanus update** if indicated\n- **NO antivenom** — Anascorp reserved for grade III-IV\n\n**Observation:**\n- Monitor 4-6 h for progression to grade III\n- Children especially: serial neuro exams (cranial nerves, fasciculations)\n- Discharge when symptoms improving, tolerating PO, no progression\n\n**Discharge instructions:**\n- Return for: respiratory difficulty, drooling, abnormal eye movements, severe agitation, inability to control limbs\n- Most resolve within 24-48 h\n- PCP follow-up in 1-2 days',
        citation: [3, 6],
        next: 'te-dispo',
        summary: 'Grade I-II scorpion: opioids + benzos + observation 4-6 h; no antivenom; watch for progression to grade III in peds.',
    },
    {
        id: 'te-scorpion-tx',
        type: 'info',
        module: 4,
        title: 'Grade III-IV — Anascorp Antivenom',
        body: '**Anascorp (Centruroides immune F(ab\')₂) — Level A evidence per ACMT, FDA-approved 2011.** Dramatically reduces duration of symptoms and need for sedation/ICU in children with grade III-IV envenomation (Boyer 2009 NEJM RCT). [3,6]\n\n**Indications:**\n- Grade III or IV envenomation (any age, but especially children <10 yo)\n- Particularly indicated if respiratory compromise, severe agitation, or anticipated need for intubation\n\n**Dosing:** [3,6]\n\n| Step | Action |\n|------|--------|\n| 1 | Reconstitute **3 vials** of Anascorp in 50 mL normal saline |\n| 2 | Infuse IV over **10 minutes** |\n| 3 | Reassess at 60 minutes — if symptoms persist, give **1 additional vial** q30-60 min PRN |\n| 4 | Most children require only the initial 3 vials |\n\n**Pre-medication:**\n- Diphenhydramine 1 mg/kg IV (max 50 mg) is reasonable but not mandatory\n- Have epinephrine drawn up for anaphylaxis (rare with F(ab\')₂; rate <2.4%)\n\n**Expected response:** [3,6]\n- Cranial nerve and somatic findings resolve within 1-4 h (vs 10-15 h without antivenom)\n- Marked reduction in midazolam/sedation requirements\n- Reduces ICU admissions and length of stay\n\n**Adjunctive care:**\n- Cardiorespiratory monitoring (PICU if grade IV or peds)\n- Benzodiazepines for residual agitation\n- Analgesia (opioids titrated)\n- Anticholinergic atropine for severe hypersalivation only (rare)\n\n**Disposition:**\n- Grade III responding to antivenom: observation 4-6 h, then discharge or admit floor\n- Grade IV: admit, often PICU initially even after antivenom',
        citation: [3, 6],
        next: 'te-dispo',
        summary: 'Anascorp 3 vials IV over 10 min for grade III-IV scorpion envenomation (especially peds). Resolution 1-4 h vs 10-15 h without (Boyer 2009 NEJM). Anaphylaxis rate <2.4%.',
        safetyLevel: 'critical',
    },
    // ===================================================================
    // MODULE 5: Hymenoptera Branch
    // ===================================================================
    {
        id: 'te-hymenoptera-assess',
        type: 'question',
        module: 5,
        title: 'Hymenoptera — Local vs Systemic vs Massive',
        body: '**Hymenoptera (bees, wasps, hornets, fire ants) — most common envenomation; leading cause of envenomation deaths in US via anaphylaxis.** [1,7]\n\n**Categories:**\n- **Local reaction:** pain, erythema, swelling at sting site; large local reactions can be >10 cm but limited to one extremity\n- **Systemic / anaphylaxis:** urticaria distant from sting, respiratory compromise, hypotension, GI symptoms\n- **Massive envenomation (>50 stings, or Africanized "killer bee" attacks):** direct venom toxicity → rhabdo, hemolysis, AKI, hepatic injury, DIC\n- **Delayed serum sickness:** 7-14 days post-sting — fever, urticaria, arthralgias\n\nSelect the presentation:',
        citation: [1, 7],
        options: [
            {
                label: 'Anaphylaxis — give epi NOW',
                description: 'Urticaria + respiratory or hypotension, or 2-system involvement',
                next: 'te-hymenoptera-anaphylaxis',
                urgency: 'critical',
            },
            {
                label: 'Massive envenomation (>50 stings) or Africanized bees',
                description: 'Direct venom toxicity: rhabdo, AKI, hemolysis, hepatic injury',
                next: 'te-massive',
                urgency: 'critical',
            },
            {
                label: 'Local or large local reaction',
                description: 'Pain, swelling, erythema limited to sting area',
                next: 'te-hymenoptera-local',
            },
        ],
    },
    {
        id: 'te-hymenoptera-anaphylaxis',
        type: 'info',
        module: 5,
        title: 'Anaphylaxis Pathway',
        body: '**IM epinephrine is the only intervention proven to reduce mortality.** Give it BEFORE labs, IV access, or imaging. [7,8]\n\n**Epinephrine IM (anterolateral thigh):** [7,8]\n\n| Patient | Dose |\n|---------|------|\n| **Adult** | **0.3-0.5 mg IM** (0.3-0.5 mL of 1 mg/mL) — repeat q5-15 min PRN |\n| **Peds** | **0.01 mg/kg IM** (max 0.3 mg) — repeat q5-15 min PRN |\n| EpiPen | Adult 0.3 mg; Junior (15-30 kg) 0.15 mg |\n\n**Refractory anaphylaxis (no response to 2-3 IM doses):** [7,8]\n- **Epinephrine infusion:** start 0.1 mcg/kg/min, titrate (push-dose epi 5-20 mcg IV bolus while drip is mixed)\n- **IV fluids:** 1-2 L NS bolus (20 mL/kg peds), repeat\n- **Add vasopressor:** norepinephrine for persistent hypotension\n- **Glucagon 1-5 mg IV** if on beta-blockers (resistant to epi)\n\n**Adjunctive (do NOT delay epi for these):**\n- **H1 blocker** — diphenhydramine 25-50 mg IV (1 mg/kg peds)\n- **H2 blocker** — famotidine 20 mg IV\n- **Steroid** — methylprednisolone 1-2 mg/kg IV (may reduce biphasic reactions, evidence weak)\n- **Bronchodilator** — albuterol nebulized for bronchospasm\n\n**Local care for sting:**\n- Remove stinger by scraping (if honeybee) — do NOT squeeze\n- Ice, elevation, NSAIDs\n\n**Observation:**\n- Minimum 4-6 h after symptom resolution; consider 12-24 h if severe or biphasic risk factors\n- Biphasic reactions occur in 5-20%, usually within 6-12 h\n\n**Discharge:**\n- Two epinephrine auto-injectors\n- Allergist referral (venom immunotherapy reduces future reaction risk by >95%)\n- 3-day course of antihistamines ± oral steroid\n- Return precautions: any recurrent symptoms\n- Medical alert bracelet',
        citation: [7, 8],
        next: 'te-dispo',
        summary: 'IM epi 0.3-0.5 mg adult / 0.01 mg/kg peds q5-15 min — DO NOT delay for antihistamines/steroids. Observe 4-6 h, d/c with 2 epi-pens + allergist referral.',
        safetyLevel: 'critical',
    },
    {
        id: 'te-hymenoptera-local',
        type: 'info',
        module: 5,
        title: 'Local & Large Local Reactions',
        body: '**Local reaction:** [1,7]\n- Pain, erythema, swelling at sting site\n- Peaks at 24-48 h, resolves over 3-7 days\n\n**Large local reaction:** [1,7]\n- Contiguous swelling >10 cm, lasting >24 h\n- Can involve entire extremity\n- NOT anaphylaxis, NOT cellulitis\n- ~10% lifetime risk of progression to anaphylaxis on future stings (lower than systemic reaction history)\n\n**Treatment:**\n- **Stinger removal** — scrape with credit card edge if honeybee (do NOT squeeze with tweezers — may inject more venom)\n- **Ice pack, elevation** — reduces swelling\n- **NSAIDs** — ibuprofen 400-600 mg PO q6h (10 mg/kg peds)\n- **H1 antihistamine** — cetirizine 10 mg PO daily (5 mg peds 6-12 yo)\n- **Topical corticosteroid** — hydrocortisone 1% for itch\n- **Oral steroid** for severe large local reactions — prednisone 40-60 mg x 3-5 days (1 mg/kg peds)\n- **Tetanus update** if indicated\n- **Antibiotics** — only for secondary cellulitis; most "infections" early on are just inflammation\n\n**Disposition:**\n- Discharge home\n- Return precautions: signs of systemic reaction (urticaria away from sting, respiratory, GI)\n- PCP follow-up in 24-48 h if not improving\n- Allergist referral NOT routinely needed for large local reactions (low future anaphylaxis risk vs systemic reaction history)',
        citation: [1, 7],
        next: 'te-dispo-discharge',
        summary: 'Local/large local: scrape stinger, ice, NSAIDs, antihistamine, topical steroid; oral steroid for severe large local. NOT cellulitis early on. Discharge home.',
    },
    {
        id: 'te-massive',
        type: 'info',
        module: 5,
        title: 'Massive Envenomation Syndrome',
        body: '**>50 stings or Africanized ("killer bee") attacks → direct venom toxicity overwhelms.** [7,9]\n\n**Clinical features:** [7,9]\n- **Rhabdomyolysis** — CK can exceed 100,000\n- **Hemolysis** — anemia, jaundice, hemoglobinuria\n- **AKI** — multifactorial (rhabdo, hemoglobinuria, direct nephrotoxicity)\n- **Hepatic injury** — transaminitis\n- **DIC** — coagulopathy, thrombocytopenia\n- **Cardiac toxicity** — direct myocardial venom effects, MI in elderly\n- Can progress over 24-48 h after the event\n\n**Workup (mandatory):** [7,9]\n- CBC with smear (schistocytes)\n- BMP — K, Cr, urea\n- LFTs\n- **CK** (trend q6-8 h)\n- UA + urine myoglobin\n- LDH, haptoglobin, fibrinogen, D-dimer, PT/PTT\n- Type and screen\n- ECG, troponin\n\n**Treatment:**\n- **Aggressive IV crystalloid** — maintain urine output 1-2 mL/kg/h (rhabdo prophylaxis)\n- **Urinary alkalinization** — sodium bicarbonate 100-150 mEq in 1 L D5W at 200 mL/h if pH <6.5 and CK rising (evidence mixed but standard of care)\n- **Transfusion** for symptomatic anemia or active bleeding\n- **Hemodialysis** for AKI with refractory hyperkalemia, acidosis, or uremia\n- **Stinger removal** — many stingers; quickly with credit card scrape\n- **Anaphylaxis** can co-occur — give epi if systemic allergic features\n\n**Disposition:**\n- **Admit ALL** patients with >50 stings or any laboratory evidence of toxicity\n- ICU if any organ dysfunction (rhabdo, AKI, hemolysis, coagulopathy)\n- Serial labs q6-8 h x 24-48 h until trending down',
        citation: [7, 9],
        next: 'te-dispo-admit',
        summary: 'Massive stings (>50): rhabdo + AKI + hemolysis + hepatic injury + DIC. Aggressive IVF, monitor q6-8h labs, admit all, ICU for organ dysfunction.',
        safetyLevel: 'critical',
    },
    // ===================================================================
    // MODULE 6: Other Arthropods + Disposition
    // ===================================================================
    {
        id: 'te-other',
        type: 'info',
        module: 6,
        title: 'Centipedes, Millipedes, Kissing Bugs, Blister Beetles',
        body: '**Less venomous arthropods rarely cause systemic toxicity.** [1,2]\n\n**Centipede bite:** [1]\n- Severe, sharp local pain (worse than wasp)\n- Erythema, swelling, occasional lymphangitis\n- Treatment: hot water immersion (40-45°C), NSAIDs, opioids if needed, wound care, tetanus\n- Resolves over hours-days; rarely systemic\n\n**Millipede contact:** [1]\n- Defensive secretion = chemical irritant (benzoquinones)\n- Brown-black skin staining, burning sensation, blistering\n- Treatment: copious irrigation with soap and water, topical steroid, supportive\n- Eye exposure → ophthalmology consult (potential conjunctivitis, keratitis)\n\n**Kissing bug (*Triatoma*, vector of Chagas):** [1]\n- Painless nocturnal bite, often clusters on face/extremities\n- Local urticarial or papular reaction\n- Risk: **Chagas disease (*Trypanosoma cruzi*)** in endemic areas (Central/South America, southern US) — usually asymptomatic acutely but can cause cardiomyopathy decades later\n- Test serology if endemic exposure, consider in transplant/immunocompromised patients\n\n**Blister beetle (*Meloidae*):** [1]\n- Contact with crushed beetle → cantharidin → painful blistering 24-48 h later\n- Treatment: cool compresses, topical steroid, NSAIDs; do NOT unroof blisters\n\n**Treatment principles:**\n- Wound care, tetanus, NSAIDs\n- No antivenoms exist for these\n- Discharge with return precautions for spreading infection or systemic symptoms',
        citation: [1, 2],
        next: 'te-dispo-discharge',
        summary: 'Centipede: hot water + analgesia; millipede: irrigate, watch eyes; kissing bug: consider Chagas if endemic; blister beetle: cool compress, no unroofing.',
    },
    {
        id: 'te-dispo',
        type: 'question',
        module: 6,
        title: 'Disposition',
        body: 'Select disposition based on severity, response to treatment, and need for ongoing monitoring: [1,3,7]',
        citation: [1, 3, 7],
        options: [
            {
                label: 'Admit / ICU',
                description: 'Antivenom given, refractory symptoms, massive envenomation, systemic loxoscelism, severe anaphylaxis',
                next: 'te-dispo-admit',
                urgency: 'critical',
            },
            {
                label: 'Observe in ED 4-6 h then discharge',
                description: 'Anaphylaxis post-epi (asymptomatic), grade III scorpion responding to Anascorp, controlled latrodectism',
                next: 'te-dispo-observe',
                urgency: 'urgent',
            },
            {
                label: 'Discharge home',
                description: 'Local reaction only, mild scorpion grade I-II, mild widow, recluse local lesion only',
                next: 'te-dispo-discharge',
            },
        ],
    },
    {
        id: 'te-dispo-admit',
        type: 'result',
        module: 6,
        title: 'Admit',
        body: '**Admission criteria:** [3,7,9]\n- Severe systemic envenomation requiring ongoing treatment\n- Antivenom administered (Anascorp, Merck widow antivenom) — observe for serum sickness, late reactions\n- Massive envenomation (>50 stings) — serial labs q6-8 h x 24-48 h\n- Suspected systemic loxoscelism (hemolysis, DIC, AKI)\n- Severe anaphylaxis with refractory symptoms or biphasic risk\n- Grade IV scorpion or grade III peds requiring monitoring\n\n**Admission management:**\n- Cardiorespiratory monitoring (ICU if grade IV scorpion, refractory anaphylaxis, massive envenomation, AKI)\n- Serial labs as indicated\n- Continue analgesia, benzodiazepines, antihistamines, steroids per pathway\n- Wound care, tetanus, antibiotics if secondary infection\n- Allergist consult before discharge if hymenoptera anaphylaxis',
        recommendation: 'Admit to monitored bed (ICU if organ dysfunction, grade IV scorpion, or refractory anaphylaxis). Continue targeted antivenom/supportive therapy. Serial labs as indicated.',
        confidence: 'definitive',
        citation: [3, 7, 9],
    },
    {
        id: 'te-dispo-observe',
        type: 'result',
        module: 6,
        title: 'Observe 4-6 h Then Discharge',
        body: '**Observation criteria:** [7,8]\n- Anaphylaxis treated with epi, asymptomatic, no biphasic risk factors\n- Scorpion grade III adult responding to Anascorp\n- Black widow with controlled symptoms after opioids/benzos\n- Large local reaction with severe pain controlled\n\n**Observation period:**\n- Minimum 4-6 h after symptom resolution\n- Monitor for biphasic anaphylaxis (occurs in 5-20% within 6-12 h)\n- Reassess vitals, ABCs, neuro exam q1-2 h\n\n**Discharge criteria:**\n- Tolerating PO\n- Pain controlled on oral meds\n- No new or recurrent systemic symptoms\n- Reliable caregiver, return access\n\n**Discharge plan:**\n- 2 epinephrine auto-injectors (if anaphylaxis) + teach use\n- Allergist referral (hymenoptera anaphylaxis — venom immunotherapy >95% effective)\n- 3-day antihistamine + oral steroid course\n- PO opioids + benzos x 24-48 h for latrodectism\n- PCP recheck 24-48 h\n- Strict return precautions',
        recommendation: 'Observe 4-6 h after symptom resolution. Discharge with 2 epi-pens (if anaphylaxis), allergist referral, antihistamine + steroid course, return precautions, PCP follow-up.',
        confidence: 'recommended',
        citation: [7, 8],
    },
    {
        id: 'te-dispo-discharge',
        type: 'result',
        module: 6,
        title: 'Discharge Home',
        body: '**Discharge criteria:** [1,2,7]\n- Local reaction only, no systemic signs\n- Mild scorpion grade I-II with symptoms controlled\n- Mild latrodectism with controlled pain on PO regimen\n- Brown recluse lesion without systemic signs\n- Centipede, millipede, blister beetle exposure with local symptoms only\n\n**Discharge instructions:**\n- **Wound care:** soap and water cleansing, dry dressing, elevation\n- **Pain:** ibuprofen 400-600 mg PO q6h ± acetaminophen 1 g q6h; short opioid course if severe\n- **Itch:** cetirizine 10 mg PO daily, topical hydrocortisone 1%\n- **Tetanus:** update if last dose >5 yrs ago and dirty wound\n- **Steroid:** consider oral prednisone 40-60 mg x 3-5 days for severe large local hymenoptera reactions\n- **Antibiotics:** only if signs of secondary cellulitis\n\n**Strict return precautions:**\n- Systemic urticaria, throat tightness, wheezing, lightheadedness, vomiting\n- Spreading erythema, fever, purulent drainage (infection)\n- Black urine, jaundice, decreased urine output (systemic loxoscelism, rhabdo)\n- Increasing pain, abdominal rigidity, sweating (worsening latrodectism)\n- Roving eye movements, slurred speech, inability to control limbs (worsening scorpion)\n- New or evolving necrotic lesion (loxoscelism progression)\n\n**Follow-up:**\n- PCP in 24-48 h for any envenomation\n- Allergist referral if any systemic hymenoptera reaction\n- Wound check in 48-72 h for recluse bites\n- Specific recheck plan documented',
        recommendation: 'Discharge home with wound care, NSAIDs, antihistamines as appropriate, tetanus update, PCP recheck 24-48 h, strict return precautions documented. Allergist referral for any systemic hymenoptera reaction.',
        confidence: 'consider',
        citation: [1, 2, 7],
    },
];
export const TERRESTRIAL_ENVENOMATION_NODE_COUNT = TERRESTRIAL_ENVENOMATION_NODES.length;
export const TERRESTRIAL_ENVENOMATION_MODULE_LABELS = [
    'Triage',
    'Identify Organism',
    'Spider',
    'Scorpion',
    'Hymenoptera',
    'Disposition',
];
export const TERRESTRIAL_ENVENOMATION_CITATIONS = [
    { num: 1, text: 'EB Medicine. Terrestrial Envenomations: Evaluation and Management in the Emergency Department. Emerg Med Pract. Updated 2024. https://www.ebmedicine.net/topics/toxicology-environmental/terrestrial-envenomations' },
    { num: 2, text: 'Vetter RS, Isbister GK. Medical aspects of spider bites. Annu Rev Entomol. 2008;53:409-429. doi:10.1146/annurev.ento.53.103106.093503' },
    { num: 3, text: 'Boyer LV, Theodorou AA, Berg RA, et al. Antivenom for critically ill children with neurotoxicity from scorpion stings. N Engl J Med. 2009;360(20):2090-2098. doi:10.1056/NEJMoa0808455' },
    { num: 4, text: 'Monte AA. Black widow spider (Latrodectus mactans) antivenom in clinical practice. Curr Pharm Biotechnol. 2012;13(10):1935-1939.' },
    { num: 5, text: 'Swanson DL, Vetter RS. Loxoscelism. Clin Dermatol. 2006;24(3):213-221. doi:10.1016/j.clindermatol.2005.11.006' },
    { num: 6, text: 'ACMT Position Statement: Anascorp for Centruroides Scorpion Envenomation. American College of Medical Toxicology. J Med Toxicol. 2012;8(1):72-73.' },
    { num: 7, text: 'Golden DBK. Insect sting anaphylaxis. Immunol Allergy Clin North Am. 2007;27(2):261-272.' },
    { num: 8, text: 'Shaker MS, Wallace DV, Golden DBK, et al. Anaphylaxis - a 2020 practice parameter update, systematic review, and Grading of Recommendations, Assessment, Development and Evaluation (GRADE) analysis. J Allergy Clin Immunol. 2020;145(4):1082-1123. doi:10.1016/j.jaci.2020.01.017' },
    { num: 9, text: 'Vetter RS, Visscher PK, Camazine S. Mass envenomations by honey bees and wasps. West J Med. 1999;170(4):223-227.' },
    { num: 10, text: 'Auerbach PS, ed. Wilderness Medicine. 7th ed. Philadelphia: Elsevier; 2017. Chapters on arthropod envenomations.' },
];
