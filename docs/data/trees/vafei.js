// MedKitt — Video-Assisted Flexible Endoscopic Intubation (VAFEI) Consult
// Indications → Preparation → Topicalization → Procedure → Troubleshooting
// Category: Anesthesia/Airway. 5 modules, ~25 nodes.
// Sources: ACEP Now (Strayer/Caputo 2022), PMC, UpToDate, EMCrit, LITFL
export const VAFEI_MODULE_LABELS = [
    'Indications & Contraindications',
    'Preparation & Equipment',
    'Topicalization & Sedation',
    'VAFEI Procedure',
    'Troubleshooting & Confirmation',
];
export const VAFEI_CITATIONS = [
    { num: 1, text: 'Strayer RJ, Caputo N. How to Use Video-Assisted Flexible Endoscopic Intubation. ACEP Now. 2022 Nov.' },
    { num: 2, text: 'Sandefur BJ, et al. Flexible endoscopic intubation in emergency medicine: A mixed-methods needs assessment. AEM Educ Train. 2024;8(3):e10992.' },
    { num: 3, text: 'Stolz AJ. Managing Awake Intubation. Ann Emerg Med. 2024.' },
    { num: 4, text: 'Weingart SD. EMCrit 247: The Dissociated Awake Intubation with Ketamine. EMCrit. 2018.' },
    { num: 5, text: 'Driver BE, et al. Alternatives to Rapid Sequence Intubation: Contemporary Airway Management with Ketamine. West J Emerg Med. 2019;20(3):461-471.' },
    { num: 6, text: 'Benumof JL. Management of the Difficult Adult Airway. Anesthesiology. 1991;75(6):1087-1110.' },
    { num: 7, text: 'Ahmad I, et al. Difficult Airway Society guidelines for awake tracheal intubation. Anaesthesia. 2020;75(4):509-528.' },
    { num: 8, text: 'UpToDate. Flexible scope intubation for anesthesia. 2024.' },
    { num: 9, text: 'Higgs A, et al. Guidelines for the management of tracheal intubation in critically ill adults. Br J Anaesth. 2018;120(2):323-352.' },
];
export const VAFEI_CRITICAL_ACTIONS = [
    { text: 'VAFEI preserves spontaneous breathing - ideal for "can\'t paralyze" airways', nodeId: 'vafei-start' },
    { text: 'Maximum lidocaine dose 7 mg/kg - calculate before topicalization', nodeId: 'vafei-topical' },
    { text: 'Always have paralytic drawn and ready - laryngospasm can occur', nodeId: 'vafei-ketamine' },
    { text: 'VL operator suctions aggressively - soiled airway obscures both views', nodeId: 'vafei-procedure' },
    { text: 'The right speed is SLOWER than your instincts - do not rush', nodeId: 'vafei-procedure' },
    { text: 'Confirm carina visualization before railroading ETT', nodeId: 'vafei-railroad' },
];
export const VAFEI_NODES = [
    // =====================================================================
    // MODULE 1: INDICATIONS & CONTRAINDICATIONS
    // =====================================================================
    {
        id: 'vafei-start',
        type: 'info',
        module: 1,
        title: 'VAFEI — Overview',
        body: '**Video-Assisted Flexible Endoscopic Intubation (VAFEI)** combines video laryngoscopy to expose the airway with flexible endoscopy to guide tube delivery. Pronounced "vaffy." [1]\n\n**WHY VAFEI?**\nCombines the best of both techniques:\n• VL clears path through mouth, lifts epiglottis\n• FE provides continuous visualization through cords\n• No nasal route needed (avoids epistaxis)\n• Allows awake/breathing approach\n\n**KEY ADVANTAGES:**\n• Maintains spontaneous ventilation\n• Continuous visualization during tube passage\n• Two operators = two sets of eyes\n• Works when VL alone fails to pass tube\n\n**SUCCESS RATES:**\n• Awake FE intubation: 92% first-pass (nasal), 57% (oral) [3]\n• VAFEI addresses oral route challenges by using VL to guide scope',
        citation: [1, 2, 3],
        next: 'vafei-indications',
        summary: 'VAFEI combines VL + flexible endoscope; VL clears path, FE guides tube through cords; maintains breathing',
    },
    {
        id: 'vafei-indications',
        type: 'info',
        module: 1,
        title: 'Indications for VAFEI',
        body: '**PRIMARY INDICATIONS:** [2,6,7]\n\n**Anatomically Difficult/Distorted Airways:**\n• Angioedema (most common indication)\n• Ludwig angina / deep neck infection\n• Oropharyngeal abscess / hematoma\n• Laryngeal or orofacial trauma\n• Airway tumors / masses\n• Prior surgery or radiation to head/neck\n\n**Intrinsic Difficult Airway Features:**\n• Micrognathia / retrognathia\n• Limited mouth opening (trismus)\n• Morbid obesity\n• Failed 3-3-2 rule\n• Mallampati IV\n• History of difficult intubation\n\n**Clinical Scenarios:**\n• "Scared to paralyze" - anticipated CICO risk\n• Failed VL intubation (can oxygenate)\n• Cervical spine immobility + predicted difficult airway\n• Need for continuous visualization (laryngeal trauma)',
        citation: [2, 6, 7],
        next: 'vafei-contraindications',
        summary: 'Angioedema, Ludwig, trauma, tumors, morbid obesity, failed VL, "scared to paralyze" patients',
    },
    {
        id: 'vafei-contraindications',
        type: 'info',
        module: 1,
        title: 'Relative Contraindications',
        body: '**RELATIVE CONTRAINDICATIONS:** [6,8]\n\n**Visualization Barriers:**\n• Massive upper airway bleeding (obscures scope)\n• Profuse secretions / vomiting\n• Complete upper airway obstruction\n\n**Time Constraints:**\n• Severely diminished ventilation / impending arrest\n• Cannot preoxygenate adequately\n• Rapidly deteriorating airway with no time\n\n**Patient Factors:**\n• Severely uncooperative / combative (for awake approach)\n• Severe hypoxemia not responsive to BVM\n\n**IMPORTANT NOTES:**\n• Most contraindications are RELATIVE\n• Aggressive suctioning can address secretions\n• VL operator must clear blood/secretions\n• If patient deteriorates during attempt → abort → rescue airway',
        citation: [6, 8],
        next: 'vafei-approach-branch',
        summary: 'Relative CIs: massive bleeding, complete obstruction, impending arrest, severely uncooperative',
    },
    {
        id: 'vafei-approach-branch',
        type: 'question',
        module: 1,
        title: 'Select Approach',
        body: 'Choose intubation approach based on patient status and airway assessment.',
        options: [
            {
                label: 'Awake/Breathing VAFEI',
                description: 'Patient maintains spontaneous ventilation throughout',
                next: 'vafei-prep-awake',
            },
            {
                label: 'RSI then VAFEI',
                description: 'Standard RSI, use VAFEI as rescue when VL fails',
                next: 'vafei-prep-rsi',
            },
            {
                label: 'Ketamine-Only (KOBI)',
                description: 'Dissociative dose, no paralytic, breathing preserved',
                next: 'vafei-kobi',
            },
        ],
        summary: 'Awake = safest for distorted airways; RSI-then-VAFEI for rescue; KOBI = ketamine-only breathing',
    },
    // =====================================================================
    // MODULE 2: PREPARATION & EQUIPMENT
    // =====================================================================
    {
        id: 'vafei-prep-awake',
        type: 'info',
        module: 2,
        title: 'Preparation — Awake Approach',
        body: '**AWAKE VAFEI PREPARATION:** [1,3,7]\n\n**Equipment Setup:**\n• Video laryngoscope (hyperangulated preferred)\n• Flexible endoscope with ETT preloaded\n• Suction x2 (VL operator + backup)\n• Topical anesthetics (4% lidocaine)\n• Antisialagogue (glycopyrrolate)\n• Low-dose ketamine + midazolam drawn\n• Standard airway backup + cricothyrotomy kit\n\n**Operator Positioning:**\n• **VL Operator:** Behind patient\'s LEFT shoulder\n• **FE Operator:** Behind patient\'s HEAD\n• **Patient:** Semi-Fowler position (30-45°)\n• **Monitor:** Single split-screen over patient\'s bed\n\n**Patient Preparation:**\n• Explain procedure, set expectations\n• Preoxygenate (HFNC ideal if available)\n• Hemodynamic optimization\n• IV access confirmed',
        citation: [1, 3, 7],
        next: 'vafei-antisialagogue',
        summary: 'VL operator at left shoulder, FE operator at head; patient semi-Fowler; split-screen monitor',
    },
    {
        id: 'vafei-prep-rsi',
        type: 'info',
        module: 2,
        title: 'Preparation — RSI Rescue VAFEI',
        body: '**RSI-THEN-VAFEI (RESCUE SCENARIO):** [1]\n\nWhen standard VL intubation fails but patient is oxygenating:\n\n**Setup (should already be ready):**\n• VL in place with view obtained\n• Flexible endoscope preloaded with ETT\n• Second operator available\n\n**Transition to VAFEI:**\n1. VL operator maintains laryngeal view\n2. FE operator brings scope to bedside\n3. No additional meds needed (already paralyzed)\n4. Proceed directly to scope insertion\n\n**KEY POINT:**\nHaving FE available and preloaded BEFORE RSI allows immediate rescue if VL alone fails.\n\n**Time Considerations:**\n• Apnea time limited\n• May need BVM ventilation between attempts\n• Consider supraglottic rescue if prolonged',
        citation: [1],
        next: 'vafei-procedure',
        summary: 'For RSI rescue: VL maintains view, FE operator brings scope, proceed directly; have FE ready pre-RSI',
    },
    {
        id: 'vafei-kobi',
        type: 'info',
        module: 2,
        title: 'Ketamine-Only Breathing Intubation (KOBI)',
        body: '**KOBI APPROACH:** [4,5]\n\nDissociative-dose ketamine WITHOUT paralytic. Patient breathes throughout.\n\n**INDICATIONS:**\n• Distorted airway where paralysis is dangerous\n• Need to maintain spontaneous ventilation\n• Alternative to awake approach in uncooperative patient\n\n**KETAMINE DOSING:**\n• **Dissociative:** 1-2 mg/kg IV\n• **Titration method:** 25 mg aliquots q15 seconds until dissociated\n• Have RSI backup ready\n\n**CRITICAL SAFETY:**\n• **ALWAYS have paralytic drawn and ready**\n• Laryngospasm can occur\n• Increased muscle tone may impair laryngoscopy\n• Patient may gag, cough, adduct cords\n\n**PROCEED TO VAFEI:**\nOnce dissociated, perform VAFEI as described.\nTopical lidocaine still helpful to reduce cord reactivity.',
        citation: [4, 5],
        next: 'vafei-procedure',
        summary: 'Ketamine 1-2 mg/kg or 25mg aliquots; maintains breathing; MUST have paralytic ready for laryngospasm',
    },
    {
        id: 'vafei-antisialagogue',
        type: 'info',
        module: 2,
        title: 'Antisialagogue & Drying',
        body: '**DRY THE AIRWAY FIRST:** [3,7,8]\n\nTopical anesthesia works better on dry mucosa.\n\n**GLYCOPYRROLATE (preferred):**\n• Dose: 0.2 mg IV or 0.4 mg IM\n• Give 10-20 minutes before procedure\n• Does not cross blood-brain barrier\n• Less tachycardia than atropine\n\n**ATROPINE (alternative):**\n• Dose: 0.5-1.0 mg IV or IM\n• Faster onset than glycopyrrolate\n• More tachycardia, can cause confusion\n\n**MECHANICAL DRYING:**\n• Gauze to physically dry tongue and oropharynx\n• Suction oral secretions\n• Patient can spit into basin\n\n**TIMING:**\nIf possible, give antisialagogue 10-20 min before starting topicalization for maximum effect.',
        citation: [3, 7, 8],
        next: 'vafei-topical',
        summary: 'Glycopyrrolate 0.2mg IV or 0.4mg IM; give 10-20 min before; dry mucosa enhances lidocaine effect',
    },
    // =====================================================================
    // MODULE 3: TOPICALIZATION & SEDATION
    // =====================================================================
    {
        id: 'vafei-topical',
        type: 'info',
        module: 3,
        title: 'Topical Airway Anesthesia',
        body: '**TOPICALIZATION TECHNIQUE:** [3,7,8]\n\n**MAXIMUM LIDOCAINE DOSE: 7 mg/kg** — calculate before starting!\n\n**NEBULIZED LIDOCAINE:**\n• 4% lidocaine via nebulizer\n• Low flow rate (4-8 L/min)\n• 4-5 mL over 10-15 minutes\n• Anesthetizes entire upper airway\n\n**ATOMIZED LIDOCAINE:**\n• MAD (Mucosal Atomization Device) or LMA MAD\n• 4% lidocaine in 10 mL syringe\n• Spray tonsillar pillars, posterior pharynx\n• Spray base of tongue, vallecula\n\n**VISCOUS LIDOCAINE:**\n• 2% viscous on tongue depressor\n• Drip down posterior pharynx\n• Patient swallows small amounts\n\n**DIRECT CORD SPRAY (via scope):**\n• 2-3 mL of 4% lidocaine through FE working channel\n• Spray directly onto vocal cords before advancing\n• "Spray as you go" technique',
        citation: [3, 7, 8],
        next: 'vafei-lidocaine-calc',
        summary: 'Max lidocaine 7 mg/kg; nebulize + atomize + viscous; spray cords through scope channel',
    },
    {
        id: 'vafei-lidocaine-calc',
        type: 'info',
        module: 3,
        title: 'Lidocaine Dose Calculation',
        body: '**LIDOCAINE TOXICITY PREVENTION:** [3]\n\n**MAXIMUM DOSE: 7 mg/kg**\n\n**QUICK CALCULATION:**\n• 70 kg patient: max 490 mg\n• 4% lidocaine = 40 mg/mL\n• 490 mg ÷ 40 mg/mL = ~12 mL of 4%\n\n**TYPICAL DISTRIBUTION:**\n• Nebulizer: 4-5 mL (160-200 mg)\n• Atomizer to pharynx: 3-4 mL (120-160 mg)\n• Through scope to cords: 2-3 mL (80-120 mg)\n• Total: ~9-12 mL (360-480 mg)\n\n**LIDOCAINE TOXICITY SIGNS:**\n• Perioral numbness, metallic taste\n• Tinnitus, visual disturbances\n• Lightheadedness, confusion\n• Seizures, cardiac arrhythmias\n\n**IF TOXICITY SUSPECTED:**\n• Stop lidocaine immediately\n• Support airway/breathing\n• Consider lipid emulsion for severe toxicity',
        citation: [3],
        next: 'vafei-sedation',
        summary: '7 mg/kg max; 70kg patient = ~12 mL of 4% lidocaine total; watch for toxicity signs',
    },
    {
        id: 'vafei-sedation',
        type: 'info',
        module: 3,
        title: 'Sedation for Awake Intubation',
        body: '**SEDATION OPTIONS:** [3,4]\n\nGoal: Anxiolysis and comfort while maintaining airway reflexes and breathing.\n\n**KETAMINE (preferred):**\n• Low-dose: 0.1-0.5 mg/kg IV (10-30 mg typical)\n• Titrate with 20 mg aliquots q2 minutes\n• Preserves respiratory drive and reflexes\n• Provides analgesia and amnesia\n\n**MIDAZOLAM (adjunct):**\n• 0.5-1 mg IV aliquots\n• Provides anxiolysis and amnesia\n• Use cautiously — can cause apnea\n\n**FENTANYL (optional):**\n• 25-50 mcg IV aliquots\n• Suppresses cough reflex\n• Risk of chest wall rigidity at high doses\n\n**DEXMEDETOMIDINE (when available):**\n• 1 mcg/kg over 10 min loading\n• Excellent sedation without respiratory depression\n• Requires time to administer\n\n**CAUTION:**\nOver-sedation defeats the purpose of awake intubation. Start low, titrate slowly.',
        citation: [3, 4],
        next: 'vafei-ketamine',
        summary: 'Ketamine 10-30mg titrated preferred; midazolam 0.5-1mg adjunct; avoid over-sedation',
    },
    {
        id: 'vafei-ketamine',
        type: 'info',
        module: 3,
        title: 'Ketamine Specifics',
        body: '**KETAMINE FOR AWAKE INTUBATION:** [4,5]\n\n**LOW-DOSE (Procedural Sedation):**\n• 0.3-0.5 mg/kg IV (20-30 mg typical)\n• Maintains protective reflexes\n• Patient arousable but comfortable\n• Can follow commands\n\n**TITRATION METHOD:**\n• Draw 100 mg ketamine in 10 mL syringe (10 mg/mL)\n• Give 20 mg (2 mL) every 2 minutes\n• Stop when patient appears relaxed but breathing\n\n**DISSOCIATIVE DOSE (KOBI):**\n• 1-2 mg/kg IV\n• Patient fully dissociated\n• Still breathing spontaneously\n• Cannot follow commands\n\n**CRITICAL SAFETY POINT:**\n⚠️ **ALWAYS HAVE PARALYTIC DRAWN AND READY**\n• Rocuronium 1.2 mg/kg or succinylcholine 1.5 mg/kg\n• Laryngospasm can occur even with low-dose ketamine\n• Muscle rigidity may impair laryngoscopy',
        citation: [4, 5],
        next: 'vafei-procedure',
        summary: 'Low-dose 20-30mg titrated; KOBI 1-2 mg/kg; ALWAYS have paralytic ready for laryngospasm',
    },
    // =====================================================================
    // MODULE 4: VAFEI PROCEDURE
    // =====================================================================
    {
        id: 'vafei-procedure',
        type: 'info',
        module: 4,
        title: 'VAFEI Procedure — Step by Step',
        body: '**THE VAFEI TECHNIQUE:** [1]\n\n**STEP 1: VL INSERTION**\n• VL operator inserts blade, obtains laryngeal view\n• Maintains position with LEFT hand\n• Keeps suction ready in RIGHT hand\n• "Sets the table" for FE operator\n\n**STEP 2: FE INSERTION**\n• FE operator looks INTO patient\'s mouth (direct vision)\n• Advances scope to tip of VL blade under direct view\n• Then looks at VL SCREEN to guide scope to cords\n\n**STEP 3: CORD PASSAGE**\n• Spray lidocaine on cords via FE channel (if awake)\n• Advance FE through vocal cords\n• Use VL screen OR FE screen (whichever view is better)\n• Continue until CARINA is visualized\n\n**STEP 4: TUBE DELIVERY**\n• FE operator holds scope steady\n• Assistant (or VL operator) railroads ETT over scope\n• Advance until ETT tip visible on FE screen\n• Position just proximal to carina\n\n**KEY PEARL:**\n"The right speed is SLOWER than your instincts." [1]',
        images: [
            {
                src: 'images/vafei/vafei-positioning.png',
                alt: 'VAFEI operator positioning: VL operator at left shoulder, FE operator at head, patient semi-Fowler',
                caption: 'VAFEI positioning: VL operator at left shoulder, FE operator behind head, patient semi-Fowler, split-screen monitor above.',
            },
        ],
        citation: [1],
        next: 'vafei-railroad',
        summary: 'VL obtains view → FE advances to blade tip → guides through cords on VL screen → carina → railroad ETT',
    },
    {
        id: 'vafei-railroad',
        type: 'info',
        module: 4,
        title: 'Railroading the ETT',
        body: '**ETT DELIVERY OVER FLEXIBLE SCOPE:** [1,8]\n\n**PRE-LOADED SETUP:**\n• ETT should be loaded on FE BEFORE starting\n• Standard 7.0-7.5 (women) or 7.5-8.0 (men)\n• Lubricate both scope and ETT\n\n**RAILROADING TECHNIQUE:**\n1. FE operator holds scope steady at carina\n2. Assistant advances ETT over scope\n3. Rotate ETT 90° counterclockwise if resistance at cords\n4. Advance until cuff passes cords (visible on FE screen)\n5. Continue until ETT tip visible just above carina\n\n**TUBE HANG-UP AT CORDS:**\nCommon problem - ETT catches on arytenoids.\n\n**SOLUTIONS:**\n• Rotate ETT 90° counterclockwise (bevel posterior)\n• Withdraw slightly and re-advance\n• Jaw thrust by VL operator\n• Smaller ETT (6.5-7.0)\n\n**AFTER TUBE PLACEMENT:**\n• Withdraw FE while watching ETT position\n• Confirm ETT 2-3 cm above carina\n• Inflate cuff, attach to ventilator\n• Confirm with waveform capnography',
        citation: [1, 8],
        next: 'vafei-confirm',
        summary: 'Pre-load ETT on scope; rotate 90° CCW if hang-up at cords; confirm position 2-3cm above carina',
    },
    {
        id: 'vafei-confirm',
        type: 'info',
        module: 4,
        title: 'Confirmation & Securing',
        body: '**CONFIRM SUCCESSFUL INTUBATION:** [1,9]\n\n**PRIMARY CONFIRMATION:**\n• **Waveform capnography** — MANDATORY\n• Sustained ETCO2 waveform for 5-6 breaths\n• No capnography = not confirmed\n\n**SECONDARY CONFIRMATION:**\n• Bilateral breath sounds\n• Chest rise\n• Misting in ETT\n• SpO2 maintained/improving\n\n**DEPTH CONFIRMATION:**\n• Visualize carina through scope before withdrawal\n• ETT tip 2-3 cm above carina\n• Typical depth: 21-23 cm at teeth (women), 23-25 cm (men)\n• Secure at appropriate depth\n\n**POST-INTUBATION:**\n• CXR for final position confirmation\n• Sedation/analgesia\n• Ventilator settings\n• OG/NG tube if indicated',
        citation: [1, 9],
        next: 'vafei-troubleshoot',
        summary: 'Waveform capnography mandatory; ETT 2-3cm above carina; secure at 21-25cm at teeth',
    },
    // =====================================================================
    // MODULE 5: TROUBLESHOOTING & CONFIRMATION
    // =====================================================================
    {
        id: 'vafei-troubleshoot',
        type: 'question',
        module: 5,
        title: 'Troubleshooting',
        body: 'Select the issue you are encountering:',
        options: [
            {
                label: 'Poor visualization (blood/secretions)',
                description: 'Cannot see on VL or FE screen',
                next: 'vafei-trouble-viz',
            },
            {
                label: 'Cannot advance scope through cords',
                description: 'Scope at glottis but cords not opening',
                next: 'vafei-trouble-cords',
            },
            {
                label: 'ETT won\'t pass over scope',
                description: 'Tube catches at cords',
                next: 'vafei-trouble-tube',
            },
            {
                label: 'Patient desaturating',
                description: 'SpO2 dropping during procedure',
                next: 'vafei-trouble-desat',
            },
            {
                label: 'Intubation successful',
                description: 'Tube placed, ready for post-procedure',
                next: 'vafei-success',
            },
        ],
    },
    {
        id: 'vafei-trouble-viz',
        type: 'info',
        module: 5,
        title: 'Poor Visualization',
        body: '**ADDRESSING VISUALIZATION PROBLEMS:** [1]\n\n**SOILED AIRWAY (blood/secretions):**\n• VL operator MUST suction aggressively\n• Suction is in VL operator\'s right hand at all times\n• Clear pharynx before FE insertion\n• May need repeated suctioning\n\n**FOGGING:**\n• Warm scope in warm water before use\n• Anti-fog solution on lens\n• Wipe lens on mucosa gently\n\n**POOR VL VIEW:**\n• Reposition patient (more sniffing position)\n• External laryngeal manipulation (BURP)\n• Different blade geometry\n• Suction aggressively\n\n**POOR FE VIEW:**\n• Withdraw scope slightly, clean lens\n• Suction through FE channel\n• Advance/withdraw to find better angle\n• Use VL view to guide if FE view poor\n\n**IF CANNOT CLEAR SECRETIONS:**\nConsider aborting attempt → BVM → alternative approach',
        citation: [1],
        next: 'vafei-troubleshoot',
        summary: 'VL operator suctions aggressively; warm scope to prevent fog; reposition; BURP; clean lens',
    },
    {
        id: 'vafei-trouble-cords',
        type: 'info',
        module: 5,
        title: 'Cannot Advance Through Cords',
        body: '**CORDS NOT OPENING:** [1,3,4]\n\n**AWAKE PATIENT:**\n• More topical lidocaine to cords (via FE channel)\n• Wait 30-60 seconds for effect\n• Ask patient to take deep breath\n• Advance during inspiration when cords open\n\n**LARYNGOSPASM:**\n• STOP attempting to advance\n• Withdraw scope slightly\n• More lidocaine to cords if possible\n• If persistent: give paralytic (this is why it\'s drawn!)\n  - Rocuronium 1.2 mg/kg or\n  - Succinylcholine 1.5 mg/kg\n\n**CORD ADDUCTION (KOBI/dissociated):**\n• Ketamine can increase muscle tone\n• May need small dose paralytic\n• Wait for patient to take breath, advance during inspiration\n\n**MECHANICAL OBSTRUCTION:**\n• Tumor, mass, edema\n• Smaller scope if available\n• May need surgical airway',
        citation: [1, 3, 4],
        next: 'vafei-troubleshoot',
        summary: 'More lidocaine + wait; advance during inspiration; if laryngospasm → give paralytic',
    },
    {
        id: 'vafei-trouble-tube',
        type: 'info',
        module: 5,
        title: 'ETT Won\'t Pass Over Scope',
        body: '**TUBE HANG-UP SOLUTIONS:** [1,8]\n\n**AT THE VOCAL CORDS:**\nMost common - tube catches on right arytenoid.\n\n**SOLUTIONS:**\n1. **Rotate 90° counterclockwise** — most effective\n   - Turns bevel posteriorly\n   - Slides past arytenoids\n\n2. **Withdraw and re-advance**\n   - Pull back 1-2 cm\n   - Re-advance with rotation\n\n3. **Jaw thrust**\n   - VL operator lifts jaw\n   - Opens glottic inlet\n\n4. **Smaller ETT**\n   - Try 6.5 or 6.0 tube\n   - Easier passage, can upsize later\n\n**IN THE TRACHEA:**\n• Tube hitting carina or right mainstem\n• Withdraw scope/tube as unit\n• Reposition with scope just above carina\n\n**DO NOT FORCE** — forceful advancement can cause tracheal injury',
        citation: [1, 8],
        next: 'vafei-troubleshoot',
        summary: 'Rotate ETT 90° CCW; withdraw + re-advance; jaw thrust; try smaller tube; DO NOT FORCE',
    },
    {
        id: 'vafei-trouble-desat',
        type: 'info',
        module: 5,
        title: 'Desaturation During Procedure',
        body: '**MANAGING DESATURATION:** [1,9]\n\n**IMMEDIATE ACTIONS:**\n1. **STOP** procedure\n2. Remove FE and VL\n3. **BVM ventilate** with 100% O2\n4. Reassess airway patency\n\n**IF PATIENT OXYGENATING:**\n• Allow recovery to SpO2 >95%\n• Consider apneic oxygenation (nasal cannula 15 L/min)\n• Reattempt when stable\n\n**IF CANNOT VENTILATE:**\n• Reposition airway (jaw thrust, head tilt)\n• Two-person BVM technique\n• **PLACE SUPRAGLOTTIC AIRWAY** (LMA/iGel)\n• Consider FE intubation through SGA\n\n**IF CANNOT OXYGENATE:**\n• CICO situation → **SURGICAL AIRWAY**\n• Cricothyrotomy\n\n**PREVENTION:**\n• Preoxygenate thoroughly before starting\n• Apneic oxygenation throughout (NC 15 L/min or HFNC)\n• Don\'t prolong attempts',
        citation: [1, 9],
        next: 'vafei-troubleshoot',
        summary: 'STOP → remove equipment → BVM → if no improvement → SGA → if CICO → cricothyrotomy',
    },
    {
        id: 'vafei-success',
        type: 'result',
        module: 5,
        title: 'VAFEI Successful',
        body: 'VAFEI completed successfully.',
        recommendation: '**POST-INTUBATION CHECKLIST:**\n\n**CONFIRMATION:**\n☐ Waveform capnography confirmed\n☐ Bilateral breath sounds\n☐ ETT depth appropriate (21-25 cm)\n☐ ETT secured\n\n**IMMEDIATE CARE:**\n☐ Sedation/analgesia initiated\n☐ Ventilator settings adjusted\n☐ OG/NG tube placed if indicated\n☐ CXR ordered for position confirmation\n\n**DOCUMENTATION:**\n☐ Intubation details (technique, attempts, view)\n☐ ETT size and depth\n☐ Medications used\n☐ Complications (if any)\n\n**DISPOSITION:**\n☐ ICU admission for ongoing ventilation\n☐ Notify receiving team of intubation details\n☐ Consider early extubation planning if appropriate',
        citation: [1, 9],
        summary: 'Confirm with capnography, bilateral breath sounds; secure tube; sedate; CXR; document',
    },
];
