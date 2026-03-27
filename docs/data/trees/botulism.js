// MedKitt - Botulism Management
// Recognition & types -> Differentiation from GBS/MG -> Diagnostic workup -> Antitoxin treatment -> Supportive care -> Public health -> Disposition -> Prognosis
// 8 modules: Recognition & Types -> Differentiation -> Diagnostic Workup -> Antitoxin Treatment -> Supportive Care -> Public Health -> Disposition -> Prognosis
// 22 nodes total.
export const BOTULISM_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION & TYPES
    // =====================================================================
    {
        id: 'bot-start',
        type: 'info',
        module: 1,
        title: 'Botulism',
        body: '[Botulism Summary](#/info/bot-summary) - descending symmetric paralysis from Clostridium botulinum neurotoxin.\n\n**Botulism** is a rare but life-threatening neuroparalytic illness caused by botulinum toxin, the most potent biological toxin known.\n\n**CLASSIC PRESENTATION - The "4 Ds":**\n- **D**iplopia (double vision)\n- **D**ysarthria (slurred speech)\n- **D**ysphagia (difficulty swallowing)\n- **D**escending paralysis (cranial nerves first, then descending)\n\n**KEY DISTINGUISHING FEATURES:**\n- **Afebrile** (unlike infectious causes)\n- **Clear sensorium** (unlike stroke)\n- **Symmetric** (unlike stroke)\n- Normal reflexes early, then hyporeflexia\n\n**Autonomic features:**\n- Constipation, urinary retention\n- Dry mouth (decreased secretions)\n- Fixed, dilated pupils',
        citation: [1, 2, 3],
        calculatorLinks: [
            { id: 'bot-types', label: 'Botulism Types' },
            { id: 'bot-timeline', label: 'Symptom Timeline' },
        ],
        next: 'bot-presentation',
    },
    {
        id: 'bot-presentation',
        type: 'question',
        module: 1,
        title: 'Clinical Presentation Assessment',
        body: '**Assess for classic botulism features:**\n\n**Bulbar symptoms (earliest):**\n- Diplopia, blurred vision, ptosis\n- Dysarthria, dysphonia\n- Dysphagia\n- Facial weakness (symmetric)\n\n**Descending motor weakness:**\n- Proximal > distal\n- Upper extremities before lower\n- Progresses to respiratory muscles\n\n**Autonomic dysfunction:**\n- Dilated, fixed or sluggish pupils\n- Dry mouth, decreased secretions\n- Constipation, ileus\n- Urinary retention\n- Orthostatic hypotension\n\n**Sensory:** NORMAL (this helps differentiate from GBS)\n\n**Mental status:** NORMAL/CLEAR (helps differentiate from stroke/AMS)',
        citation: [1, 2],
        options: [
            {
                label: 'Descending paralysis with bulbar symptoms',
                description: 'Diplopia, dysarthria, dysphagia with descending weakness',
                next: 'bot-type-assessment',
                urgency: 'critical',
            },
            {
                label: 'Infant with hypotonia',
                description: 'Floppy baby, weak cry, poor feeding, constipation',
                next: 'bot-infant',
                urgency: 'critical',
            },
            {
                label: 'Uncertain - consider differential',
                description: 'Features overlap with GBS, MG, or other causes',
                next: 'bot-ddx',
            },
        ],
    },
    {
        id: 'bot-type-assessment',
        type: 'question',
        module: 1,
        title: 'Determine Botulism Type',
        body: '[Botulism Types Comparison](#/calculator/bot-types) - foodborne vs wound vs infant.\n\n**THREE MAIN TYPES - Identify the source:**\n\n**1. FOODBORNE BOTULISM**\n- Ingestion of PREFORMED toxin\n- Home-canned foods (low acid vegetables), fermented fish\n- Onset: 12-36 hours (range 6 hours to 10 days)\n- GI symptoms often precede neuro (nausea, vomiting, cramping)\n- Consider if >1 person affected from same meal\n\n**2. WOUND BOTULISM**\n- Toxin produced in INFECTED WOUND\n- Key population: IVDU (black tar heroin, skin-popping)\n- Sinusitis in cocaine users\n- Longer incubation: 4-14 days\n- NO GI symptoms\n- Fever may be present (from wound infection)\n- Wound may appear benign\n\n**3. INFANT BOTULISM**\n- Ingestion of SPORES that germinate in immature GI tract\n- <1 year old (peak 2-4 months)\n- Honey exposure classic (but often no clear source)\n- Most common form in US',
        citation: [1, 2, 4],
        calculatorLinks: [{ id: 'bot-types', label: 'Botulism Types' }],
        options: [
            {
                label: 'Foodborne - recent suspicious food exposure',
                description: 'Home-canned food, GI symptoms preceded neuro symptoms',
                next: 'bot-foodborne',
            },
            {
                label: 'Wound - IVDU or recent wound',
                description: 'Black tar heroin use, skin popping, infected wound',
                next: 'bot-wound',
                urgency: 'urgent',
            },
            {
                label: 'Type unclear - proceed with workup',
                description: 'No clear source identified',
                next: 'bot-ddx',
            },
        ],
    },
    {
        id: 'bot-foodborne',
        type: 'info',
        module: 1,
        title: 'Foodborne Botulism',
        body: '**Foodborne botulism** results from ingestion of preformed botulinum toxin in contaminated food.\n\n**High-risk foods:**\n- Home-canned vegetables (especially low-acid: green beans, corn, beets)\n- Fermented fish (Alaska Native communities)\n- Improperly stored foods (garlic in oil, baked potatoes in foil)\n- Home-cured meats, sausages\n- Honey (spores, not preformed toxin - relevant for infants)\n\n**Timeline:**\n- Onset: 12-36 hours after ingestion (range 6 hours to 10 days)\n- Shorter incubation = higher toxin load = more severe disease\n\n**GI prodrome:**\n- Nausea, vomiting, abdominal cramping, diarrhea\n- May occur BEFORE neurological symptoms\n- Not always present\n\n**Epidemiologic clues:**\n- Multiple people sick from same meal\n- Recent potluck, family gathering with homemade foods\n- Ask about ALL foods consumed in past 10 days',
        citation: [1, 2],
        calculatorLinks: [{ id: 'bot-types', label: 'Botulism Types' }],
        next: 'bot-ddx',
    },
    {
        id: 'bot-wound',
        type: 'info',
        module: 1,
        title: 'Wound Botulism',
        body: '[Wound Botulism in IVDU Checklist](#/calculator/bot-ivdu) - high-risk assessment.\n\n**Wound botulism** occurs when C. botulinum spores germinate in a wound and produce toxin locally.\n\n**KEY POPULATION: IV Drug Users**\n- Black tar heroin (contaminated with spores from soil/tar)\n- Skin-popping (subcutaneous injection)\n- Muscling (intramuscular injection)\n- Sinusitis in cocaine users (intranasal route)\n\n**Clinical differences from foodborne:**\n- **NO GI symptoms** (toxin produced locally, not ingested)\n- **Longer incubation: 4-14 days** (spores must germinate)\n- **Fever may be present** (from wound infection itself)\n- **Wound may appear benign** or already healing\n\n**Examination:**\n- Inspect ALL injection sites (skin-popping sites may be hidden)\n- Abscesses, cellulitis, wounds with necrotic tissue\n- Check sinuses if cocaine user\n- Wound may NOT look infected\n\n**Treatment differences:**\n- Requires wound debridement\n- Requires antibiotics (metronidazole or penicillin)\n- Still needs antitoxin',
        citation: [1, 2],
        calculatorLinks: [{ id: 'bot-ivdu', label: 'IVDU Checklist' }],
        next: 'bot-ddx',
    },
    {
        id: 'bot-infant',
        type: 'info',
        module: 1,
        title: 'Infant Botulism',
        body: '[Infant Botulism & BabyBIG Guide](#/calculator/bot-infant) - diagnosis and treatment specifics.\n\n**Infant botulism** is the most common form of botulism in the US.\n\n**Mechanism:**\n- Ingestion of C. botulinum SPORES (not preformed toxin)\n- Spores germinate in immature GI tract (lacks protective flora)\n- Toxin produced in vivo\n\n**Age:** <1 year (peak 2-4 months)\n\n**Classic presentation - "Floppy Baby":**\n- Constipation (often first symptom, may precede by weeks)\n- Weak cry, poor feeding\n- Decreased gag reflex\n- Ptosis, facial weakness\n- Generalized hypotonia\n- Loss of head control\n\n**Risk factors:**\n- Honey exposure (classic but often no clear source identified)\n- Corn syrup (some sources)\n- Environmental: soil exposure, construction dust, agricultural areas\n\n**CRITICAL DIFFERENCES IN TREATMENT:**\n- **BabyBIG (Botulism Immune Globulin Intravenous, Human)**\n- California Infant Botulism Treatment Program: **510-231-7600**\n- Human-derived (less reaction risk than equine antitoxin)\n- Dramatically reduces hospital stay and need for mechanical ventilation\n- **Do NOT give antibiotics** (may lyse bacteria and release more toxin)',
        citation: [2, 4],
        calculatorLinks: [{ id: 'bot-infant', label: 'BabyBIG Guide' }],
        next: 'bot-antitoxin-infant',
    },
    // =====================================================================
    // MODULE 2: DIFFERENTIATION FROM GBS AND MG
    // =====================================================================
    {
        id: 'bot-ddx',
        type: 'info',
        module: 2,
        title: 'Differential Diagnosis - Descending Paralysis',
        body: '[Descending Paralysis DDx](#/calculator/bot-ddx) - Botulism vs GBS vs MG vs Stroke.\n\n**KEY DIFFERENTIATOR TABLE:**\n\n| Feature | Botulism | GBS | MG |\n|---------|----------|-----|----|\n| Direction | DESCENDING | ASCENDING | Variable/fatigable |\n| Pupils | Dilated, fixed | Normal | Normal |\n| Reflexes | Normal->absent | Absent early | Normal |\n| Sensory | Normal | Abnormal | Normal |\n| Autonomic | Prominent | Variable | Minimal |\n| Fever | No (unless wound) | No | No |\n| CSF | Normal | Elevated protein | Normal |\n| Speed | Hours to days | Days to weeks | Variable |\n| History | Food/wound/honey | Post-infectious | Chronic/episodic |\n\n**BOTULISM vs STROKE:**\n- Botulism: SYMMETRIC, clear sensorium, no sensory loss\n- Stroke: Usually asymmetric, may have altered consciousness, sensory deficits\n\n**BOTULISM vs MYASTHENIA GRAVIS:**\n- Both have ptosis, diplopia, bulbar symptoms\n- MG: Fatigable weakness, improves with rest, responds to edrophonium\n- Botulism: Fixed weakness, autonomic involvement, no fatigability',
        citation: [1, 2, 3],
        calculatorLinks: [{ id: 'bot-ddx', label: 'DDx Comparison' }],
        next: 'bot-ddx-key-features',
    },
    {
        id: 'bot-ddx-key-features',
        type: 'info',
        module: 2,
        title: 'Key Differentiating Features',
        body: '**Botulism RED FLAGS (strongly suggests botulism over mimics):**\n\n1. **Dilated, fixed or sluggish pupils** - GBS and MG have normal pupils\n\n2. **Clear sensorium** - Patient is alert despite profound weakness\n\n3. **Descending pattern** - Starts cranial, moves caudally (GBS is ASCENDING)\n\n4. **Symmetric** - Asymmetry suggests stroke\n\n5. **Normal sensory exam** - Sensory abnormalities suggest GBS\n\n6. **Autonomic features** - Constipation, urinary retention, dry mouth\n\n7. **Afebrile** - Unless wound botulism with secondary infection\n\n8. **Multiple cases from same meal** - Pathognomonic for foodborne\n\n**EMG/NCS findings (if available):**\n- Brief, small amplitude motor potentials\n- **Incremental response to rapid repetitive stimulation** (>50 Hz)\n- This is the OPPOSITE of myasthenia gravis (which shows decremental response)\n\n**If still uncertain:** Treat empirically for botulism while pursuing workup - antitoxin is time-sensitive.',
        citation: [1, 3],
        next: 'bot-workup',
    },
    // =====================================================================
    // MODULE 3: DIAGNOSTIC WORKUP
    // =====================================================================
    {
        id: 'bot-workup',
        type: 'info',
        module: 3,
        title: 'Diagnostic Workup',
        body: '**CRITICAL: Botulism is a CLINICAL DIAGNOSIS.**\n**Do NOT wait for laboratory confirmation to treat - antitoxin is time-sensitive.**\n\n**Laboratory confirmation (takes days):**\n\n**Mouse bioassay** - Gold standard\n- Inject patient serum into mice, observe for paralysis\n- Takes 1-4 days\n- Send: serum, stool, gastric contents, wound culture\n\n**Samples to collect:**\n- Serum (before antitoxin if possible, but do not delay treatment)\n- Stool or rectal swab\n- Gastric contents/vomitus\n- Suspected food samples\n- Wound culture/tissue (wound botulism)\n\n**Standard labs:**\n- CBC, BMP, LFTs - typically NORMAL\n- No elevation in inflammatory markers\n- Helps rule out infection\n\n**CSF (lumbar puncture):**\n- NORMAL protein and cell count\n- Helps rule out GBS (which has elevated protein)',
        citation: [1, 2],
        next: 'bot-workup-imaging',
    },
    {
        id: 'bot-workup-imaging',
        type: 'info',
        module: 3,
        title: 'Imaging & Electrodiagnostics',
        body: '**Imaging:**\n\n**CT/MRI brain:**\n- NORMAL in botulism\n- Rules out stroke, brainstem lesion\n- Important given bulbar symptoms\n\n**MRI spine:**\n- NORMAL in botulism\n- Rules out cord compression, transverse myelitis\n\n**EMG/Nerve Conduction Studies:**\n- May support diagnosis but do not delay treatment\n- Classic findings:\n  - Low-amplitude compound muscle action potentials (CMAPs)\n  - **Incremental response** to rapid repetitive stimulation (>50 Hz)\n  - This is OPPOSITE of myasthenia gravis (decremental response)\n- Normal sensory nerve conduction\n\n**Tensilon (Edrophonium) Test:**\n- May show minimal/no improvement (vs robust response in MG)\n- Helps differentiate from myasthenia gravis\n- NOT recommended as primary diagnostic tool\n\n**EKG:**\n- Baseline for autonomic monitoring\n- Usually normal but arrhythmias possible',
        citation: [1, 3],
        next: 'bot-antitoxin',
    },
    // =====================================================================
    // MODULE 4: ANTITOXIN TREATMENT
    // =====================================================================
    {
        id: 'bot-antitoxin',
        type: 'info',
        module: 4,
        title: 'Antitoxin Treatment - Time Critical',
        body: '[Antitoxin Dosing & CDC Contact](#/calculator/bot-antitoxin) - critical treatment information.\n\n**ANTITOXIN IS TIME-SENSITIVE - DO NOT DELAY**\n\n**Mechanism:**\n- Neutralizes CIRCULATING toxin only\n- Does NOT reverse toxin already bound to nerve terminals\n- Earlier administration = better outcomes, less ventilator time\n\n**How to obtain (adults):**\n- **CDC Emergency Operations Center: 770-488-7100 (24/7)**\n- State health department can also facilitate\n- Antitoxin is held at CDC quarantine stations and released emergently\n\n**HEPTAVALENT BOTULISM ANTITOXIN (HBAT):**\n- Covers toxin types A through G\n- **Adult dose: 1 vial IV**\n- Equine-derived (horse serum)\n- ~10% hypersensitivity reaction rate\n\n**Pre-treatment:**\n- Have epinephrine at bedside (anaphylaxis risk)\n- Skin testing no longer routinely recommended (delays treatment)\n- Watch for: urticaria, pruritus, hypotension, bronchospasm\n\n**Administer even if diagnosis uncertain** - benefit of early treatment outweighs risks.',
        citation: [1, 2, 3, 5],
        calculatorLinks: [{ id: 'bot-antitoxin', label: 'Antitoxin Guide' }],
        treatment: {
            firstLine: {
                drug: 'Heptavalent Botulism Antitoxin (HBAT)',
                dose: '1 vial IV',
                route: 'IV infusion',
                frequency: 'Single dose',
                duration: 'One-time treatment',
                notes: 'Obtain through CDC: 770-488-7100. Have epinephrine ready. Do not delay for confirmatory testing.',
            },
            monitoring: 'Monitor for anaphylaxis during and 30 min after infusion. ~10% hypersensitivity rate (equine-derived).',
        },
        next: 'bot-antitoxin-admin',
    },
    {
        id: 'bot-antitoxin-admin',
        type: 'info',
        module: 4,
        title: 'Antitoxin Administration',
        body: '**Administration protocol:**\n\n1. Call CDC Emergency Operations: **770-488-7100**\n2. State health department facilitates release\n3. Antitoxin shipped emergently from nearest depot\n4. Pre-medicate with diphenhydramine + corticosteroid (optional)\n5. Have epinephrine at bedside\n6. Infuse HBAT per package insert (slow initial rate, increase as tolerated)\n\n**Reactions (10% incidence):**\n- Urticaria, pruritus (most common)\n- Anaphylaxis (rare but serious)\n- Serum sickness (delayed, 5-14 days post-infusion)\n\n**Management of reactions:**\n- Mild: slow/stop infusion, diphenhydramine, resume when resolved\n- Anaphylaxis: stop infusion, epinephrine, supportive care\n- Serum sickness: corticosteroids\n\n**When to give:**\n- As soon as botulism is clinically suspected\n- Before laboratory confirmation\n- Effective up to several days after symptom onset (but earlier = better)\n- No benefit once patient is fully paralyzed and stabilized (toxin already bound)',
        citation: [2, 3, 5],
        treatment: {
            firstLine: {
                drug: 'Diphenhydramine (pre-medication)',
                dose: '25-50 mg IV',
                route: 'IV',
                frequency: 'Once before antitoxin',
                duration: 'Pre-treatment',
                notes: 'Optional pre-medication. Have epinephrine ready for anaphylaxis.',
            },
            monitoring: 'Slow initial infusion rate. Monitor vitals continuously. Watch for urticaria, bronchospasm, hypotension.',
        },
        next: 'bot-antitoxin-infant',
    },
    {
        id: 'bot-antitoxin-infant',
        type: 'info',
        module: 4,
        title: 'Infant Botulism - BabyBIG',
        body: '[Infant Botulism Guide](#/calculator/bot-infant) - BabyBIG administration.\n\n**INFANT BOTULISM requires BabyBIG, NOT adult antitoxin.**\n\n**BabyBIG (Botulism Immune Globulin Intravenous, Human):**\n- Human-derived (lower reaction risk than equine)\n- Single dose: **50 mg/kg (1 mL/kg)**\n- Infusion over 1-2 hours\n\n**How to obtain:**\n- **California Infant Botulism Treatment Program: 510-231-7600**\n- Available 24/7\n- Shipped emergently nationwide\n\n**Benefits:**\n- Dramatically reduces hospital stay (5.5 weeks to 2.5 weeks)\n- Reduces ICU stay\n- Reduces need for mechanical ventilation\n- Reduces need for tube feeding\n- Cost-effective despite high upfront cost (~$45,000/dose)\n\n**CRITICAL - DO NOT GIVE ANTIBIOTICS:**\n- Antibiotics (especially aminoglycosides) may:\n  - Lyse bacteria, releasing more toxin\n  - Potentiate neuromuscular blockade\n- Clostridium is in the GUT, not causing systemic infection\n- Supportive care only',
        citation: [2, 4],
        calculatorLinks: [{ id: 'bot-infant', label: 'BabyBIG Guide' }],
        treatment: {
            firstLine: {
                drug: 'BabyBIG (Botulism Immune Globulin)',
                dose: '50 mg/kg (1 mL/kg)',
                route: 'IV infusion',
                frequency: 'Single dose',
                duration: 'Infuse over 1-2 hours',
                notes: 'Contact California Infant Botulism Program: 510-231-7600. Human-derived, lower reaction risk. Do NOT give antibiotics to infants with botulism.',
            },
            monitoring: 'Monitor for infusion reactions. Reduces hospital stay from 5.5 to 2.5 weeks.',
        },
        next: 'bot-supportive',
    },
    // =====================================================================
    // MODULE 5: SUPPORTIVE CARE
    // =====================================================================
    {
        id: 'bot-supportive',
        type: 'info',
        module: 5,
        title: 'Supportive Care - Airway Management',
        body: '**AIRWAY IS THE PRIORITY**\n\n**Respiratory failure is the primary cause of death in botulism.**\n\n**Early intubation criteria:**\n- Bulbar symptoms with aspiration risk\n- FVC declining or <12-15 mL/kg\n- Hypoxia, hypercapnia\n- Weak cough, inability to clear secretions\n- Progressive weakness despite antitoxin\n\n**Anticipate prolonged ventilation:**\n- Weeks to months until nerve terminals regenerate\n- Early tracheostomy consideration (day 7-14 if no improvement)\n- Lung-protective ventilation strategies\n\n**Serial monitoring:**\n- FVC every 4 hours (minimum)\n- Single breath count (<20 concerning, <10 critical)\n- Cough strength, secretion management\n- Oxygen saturation (continuous)\n\n**Nutrition:**\n- NG tube for feeding (gastroparesis common)\n- Aspiration precautions\n- Adequate calories for recovery',
        citation: [1, 2],
        next: 'bot-supportive-wound',
    },
    {
        id: 'bot-supportive-wound',
        type: 'info',
        module: 5,
        title: 'Wound Botulism - Additional Treatment',
        body: '**Wound botulism requires additional interventions:**\n\n**1. WOUND DEBRIDEMENT:**\n- Surgical consultation\n- Thorough debridement of infected/necrotic tissue\n- May need multiple debridements\n- Send wound tissue for culture\n\n**2. ANTIBIOTICS:**\n- Required for wound botulism (unlike foodborne/infant)\n- Targets C. botulinum and prevents further toxin production\n\n**Antibiotic options:**\n- [Metronidazole](#/drug/metronidazole/wound botulism) 500 mg IV q8h - Preferred\n- [Penicillin G](#/drug/penicillin-g/wound botulism) 3-4 million units IV q4h - Alternative\n\n**AVOID AMINOGLYCOSIDES:**\n- Clindamycin, aminoglycosides potentiate neuromuscular blockade\n- Can worsen respiratory failure\n\n**For IVDU patients:**\n- Social work consultation\n- Addiction medicine consultation\n- Harm reduction education\n- Consider MOUD (medications for opioid use disorder) upon recovery',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Metronidazole',
                dose: '500 mg IV',
                route: 'IV',
                frequency: 'Every 8 hours',
                duration: '7-10 days',
                notes: 'For wound botulism only. Also requires surgical debridement. AVOID aminoglycosides.',
            },
            alternative: {
                drug: 'Penicillin G',
                dose: '3-4 million units IV',
                route: 'IV',
                frequency: 'Every 4 hours',
                duration: '7-10 days',
                notes: 'Alternative to metronidazole for wound botulism.',
            },
            monitoring: 'Wound healing, signs of ongoing infection. Serial wound debridement may be needed.',
        },
        next: 'bot-supportive-general',
    },
    {
        id: 'bot-supportive-general',
        type: 'info',
        module: 5,
        title: 'General Supportive Care',
        body: '**DVT Prophylaxis:**\n- Paralyzed patients are HIGH risk for VTE\n- Pharmacologic: enoxaparin or heparin\n- Mechanical: SCDs, compression stockings\n- Continue until ambulatory\n\n**Autonomic management:**\n- Constipation/ileus: bowel regimen, prokinetics if needed\n- Urinary retention: Foley catheter\n- Orthostatic hypotension: volume, position changes\n- Cardiac monitoring (rare arrhythmias)\n\n**Communication (for intubated patients):**\n- Patients are typically ALERT with intact cognition\n- Profound paralysis with intact awareness is psychologically traumatic\n- Communication boards, eye-gaze devices\n- Explain everything, reassure about recovery\n- Early psych/social work involvement\n\n**Rehabilitation:**\n- PT/OT early involvement\n- Passive range of motion\n- Rehabilitation facility planning for recovery phase\n\n**NO ROLE FOR:**\n- Steroids (not effective)\n- Guanidine (historical, not recommended)\n- Additional antitoxin doses (single dose sufficient)',
        citation: [1, 2],
        next: 'bot-public-health',
    },
    // =====================================================================
    // MODULE 6: PUBLIC HEALTH
    // =====================================================================
    {
        id: 'bot-public-health',
        type: 'info',
        module: 6,
        title: 'Public Health Notification',
        body: '**BOTULISM IS A REPORTABLE DISEASE**\n\n**Notify health department IMMEDIATELY:**\n- State/local health department\n- CDC (they will be involved for antitoxin anyway)\n- Do not wait for laboratory confirmation\n\n**Why urgent reporting matters:**\n\n**1. Foodborne outbreak investigation:**\n- Identify contaminated food source\n- Prevent additional cases\n- Food recall if commercial product\n- May be multiple unreported cases\n\n**2. Bioterrorism consideration:**\n- Botulinum toxin is a Category A bioterrorism agent\n- Multiple simultaneous cases without common food source\n- Aerosolized toxin would present as respiratory syndrome\n- Public health must rule out intentional release\n\n**3. Contact evaluation:**\n- Household contacts who shared food source need medical evaluation\n- Even asymptomatic contacts may have been exposed\n- Monitor for 10 days post-exposure\n\n**Food sample collection:**\n- Save any remaining suspected food\n- Refrigerate (do not freeze)\n- Health department will arrange testing',
        citation: [1, 2, 3],
        next: 'bot-disposition',
    },
    // =====================================================================
    // MODULE 7: DISPOSITION
    // =====================================================================
    {
        id: 'bot-disposition',
        type: 'info',
        module: 7,
        title: 'Disposition',
        body: '**ALL SUSPECTED BOTULISM: ICU ADMISSION**\n\nThere is no outpatient management of suspected botulism.\n\n**ICU requirements:**\n- Continuous pulse oximetry\n- Serial FVC monitoring (q4h minimum)\n- Cardiac monitoring (autonomic instability)\n- Rapid access to intubation\n- Antitoxin administration and monitoring\n\n**Consultation:**\n- Infectious disease\n- Pulmonology/Critical care\n- Neurology (confirm diagnosis, exclude mimics)\n- Toxicology (if needed)\n- Surgery (wound botulism)\n\n**Communication:**\n- CDC/State health department (already involved for antitoxin)\n- Family (explain prolonged recovery course)\n- Palliative care (for goals of care if severe)\n\n**Transfer considerations:**\n- If at facility without ICU, transfer emergently\n- Antitoxin can be administered at any facility\n- Do not delay antitoxin for transfer\n- Intubate before transport if any airway concerns',
        citation: [1, 2],
        next: 'bot-monitoring',
    },
    {
        id: 'bot-monitoring',
        type: 'info',
        module: 7,
        title: 'Monitoring Parameters',
        body: '**Respiratory monitoring:**\n- FVC every 4 hours (more frequently if declining)\n- NIF (negative inspiratory force)\n- Single breath count\n- Cough strength assessment\n- Continuous pulse oximetry\n- ABG if clinical concern\n\n**Intubation thresholds:**\n- FVC <12-15 mL/kg\n- NIF weaker than -30 cmH2O\n- Any bulbar symptoms with aspiration risk\n- Rapid decline in respiratory parameters\n- Hypoxia or hypercapnia\n\n**Neurological monitoring:**\n- Serial cranial nerve exams\n- Motor strength assessment\n- Document progression/plateau/improvement\n\n**Autonomic monitoring:**\n- Continuous telemetry\n- Blood pressure (may have lability)\n- Bowel function (ileus common)\n- Urinary output (retention)\n\n**Lab monitoring:**\n- BMP (electrolytes with prolonged ICU stay)\n- Daily labs as clinically indicated\n- No specific "botulism labs" to follow',
        citation: [1, 2],
        next: 'bot-prognosis',
    },
    // =====================================================================
    // MODULE 8: PROGNOSIS
    // =====================================================================
    {
        id: 'bot-prognosis',
        type: 'result',
        module: 8,
        title: 'Prognosis',
        body: '**PROGNOSIS IS GOOD WITH MODERN ICU CARE**\n\n**Mortality:**\n- <5% with modern ICU care and antitoxin\n- Was 60% in pre-antitoxin era\n- Death usually from respiratory failure, aspiration, or delayed diagnosis\n\n**Recovery:**\n- **Weeks to months** - nerve terminals must regenerate\n- Full recovery expected in most cases\n- Earlier antitoxin = shorter ventilator course\n\n**Recovery timeline:**\n- Improvement begins when new nerve terminals sprout\n- Cranial nerve function recovers first\n- Proximal strength before distal\n- Full recovery may take 3-12 months\n\n**Factors affecting prognosis:**\n- Time to antitoxin (earlier = better)\n- Severity at presentation\n- Toxin type (Type A may be more severe)\n- Age and comorbidities\n- Quality of supportive care\n\n**Long-term:**\n- Most patients recover fully\n- Some report persistent fatigue, dyspnea with exertion\n- Rare: prolonged weakness, autonomic symptoms\n- No evidence of chronic neurological sequelae',
        recommendation: 'Admit ALL suspected botulism to ICU. Call CDC (770-488-7100) immediately for antitoxin. Do NOT wait for confirmatory testing. Monitor FVC q4h. Early intubation is safer than emergent intubation. Report to public health. Full recovery expected in most cases with modern care.',
        confidence: 'recommended',
        citation: [1, 2, 5],
    },
];
export const BOTULISM_NODE_COUNT = BOTULISM_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const BOTULISM_MODULE_LABELS = [
    'Recognition & Types',
    'Differentiation',
    'Diagnostic Workup',
    'Antitoxin Treatment',
    'Supportive Care',
    'Public Health',
    'Disposition',
    'Prognosis',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const BOTULISM_CITATIONS = [
    { num: 1, text: 'Sobel J. Botulism. Clin Infect Dis. 2005;41(8):1167-1173.' },
    { num: 2, text: 'CDC. Botulism: Epidemiology and Prevention. CDC Yellow Book. 2024.' },
    { num: 3, text: 'Arnon SS, Schechter R, Inglesby TV, et al. Botulinum Toxin as a Biological Weapon: Medical and Public Health Management. JAMA. 2001;285(8):1059-1070.' },
    { num: 4, text: 'Khouri JM, Payne JR, Arnon SS. More Clinical Mimics of Infant Botulism. J Pediatr. 2018;193:178-182.' },
    { num: 5, text: 'Chalk CH, Benstead TJ, Pound JD, Keezer MR. Medical Treatment for Botulism. Cochrane Database Syst Rev. 2019;4:CD008123.' },
];
