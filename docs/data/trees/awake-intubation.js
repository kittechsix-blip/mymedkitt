// myMedKitt — Awake Intubation Consult
// Comprehensive 6-module approach to awake intubation in the ED.
// Indications → Preparation → Topicalization → Sedation → Technique → Complications
// Sources: EMCrit, DAS Guidelines 2020, Annals EM 2024, LITFL, NYSORA
// Categories: anesthesia-airway, procedures
export const AWAKE_INTUBATION_CRITICAL_ACTIONS = [
    { text: 'Identify indications: cannot intubate/ventilate predicted, airway obstruction, C-spine injury', nodeId: 'awake-indications' },
    { text: 'Prepare all equipment before starting: bougie, video laryngoscope, surgical airway kit', nodeId: 'awake-preparation' },
    { text: 'Topicalize airway thoroughly: lidocaine nebulizer, atomizer, and superior laryngeal nerve block', nodeId: 'awake-topicalization' },
    { text: 'Use low-dose ketamine (0.2-0.5mg/kg) for sedation while preserving airway reflexes', nodeId: 'awake-sedation' },
    { text: 'Perform video laryngoscopy first (confirm view BEFORE committing)', nodeId: 'awake-technique' },
    { text: 'Use bougie-first technique through vocal cords', nodeId: 'awake-technique' },
    { text: 'Give propofol/rocuronium ONLY after tube through cords', nodeId: 'awake-technique' },
    { text: 'Have immediate surgical airway backup ready', nodeId: 'awake-complications' },
];
export const AWAKE_INTUBATION_NODES = [
    // =====================================================================
    // MODULE 1: PATIENT SELECTION & INDICATIONS
    // =====================================================================
    {
        id: 'awake-start',
        type: 'info',
        module: 1,
        title: 'Awake Intubation: When RSI Is Too Risky',
        body: `**Awake intubation preserves spontaneous ventilation and protective reflexes during airway instrumentation.**

**The Core Principle:**
"Look before you leap" — Confirm vocal cord visualization BEFORE administering paralytic.

**National Registry Data (NEAR):**
- Used in 0.4-2% of ED intubations
- Overall first-attempt success: **85%**
- Nasal fiberoptic: **92%** success
- Oral fiberoptic: **57%** success
- Video laryngoscopy awake: **89%** success

**Time Requirement:**
Awake techniques require **15-30 minutes** of preparation. If you don't have this time, consider Delayed Sequence Intubation (DSI) first. [1][2]`,
        citation: [1, 2],
        calculatorLinks: [
            { id: 'awake-who-needs', label: 'Who Needs Awake?' },
        ],
        next: 'awake-indications',
    },
    {
        id: 'awake-indications',
        type: 'question',
        module: 1,
        title: 'Primary Indication?',
        body: `**When you MUST avoid RSI/paralysis:**

**Structural Obstruction:**
- Angioedema (RSI contraindicated)
- Epiglottitis / supraglottitis
- Ludwig's angina / deep neck infection
- Laryngeal mass or vocal cord paralysis
- Oral/pharyngeal tumor

**Anatomic Considerations:**
- Neck trauma with distorted anatomy
- Wired jaw / mandibular fixation
- Severely limited mouth opening
- History of difficult intubation

**Physiologic:**
- Severe metabolic acidosis (must maintain ventilation)
- Cannot tolerate brief apnea

**What is the primary indication?**`,
        citation: [1, 3],
        options: [
            { label: 'Angioedema', description: 'Progressive airway edema', next: 'awake-angioedema', urgency: 'critical' },
            { label: 'Epiglottitis / Supraglottitis', description: 'Infectious obstruction', next: 'awake-epiglottitis', urgency: 'critical' },
            { label: 'Predicted difficult airway', description: 'Anatomy, prior history, limited mouth opening', next: 'awake-difficult', urgency: 'routine' },
            { label: 'Neck trauma / mass', description: 'Distorted anatomy', next: 'awake-trauma', urgency: 'urgent' },
            { label: 'Metabolic acidosis', description: 'Cannot tolerate apnea', next: 'awake-acidosis', urgency: 'urgent' },
        ],
    },
    {
        id: 'awake-angioedema',
        type: 'info',
        module: 1,
        title: 'Angioedema: Double-Setup Required',
        body: `**Angioedema is the most common indication for awake intubation in the ED (32% of cases).**

**Key Principles:**
- RSI is **contraindicated** — paralysis risks CICO emergency
- Prepare surgical airway BEFORE any intubation attempt (double-setup)
- ED physicians achieve **81%** first-attempt success with awake techniques
- Cricothyrotomy required in <5% of cases

**Airway Assessment:**
- Voice changes (hot potato voice) = supraglottic edema
- Stridor = glottic/subglottic involvement
- Drooling = severe obstruction
- Sitting up / tripoding = ominous sign

**Treatment While Preparing:**
- Epinephrine 0.3-0.5 mg IM (if allergic)
- Icatibant 30 mg SQ (if hereditary/ACEi-induced)
- Methylprednisolone 125 mg IV
- Diphenhydramine 50 mg IV (if allergic)

**Proceed to topicalization protocol →** [1][5]`,
        citation: [1, 5],
        next: 'awake-contraindications',
    },
    {
        id: 'awake-epiglottitis',
        type: 'info',
        module: 1,
        title: 'Epiglottitis: High-Risk Airway',
        body: `**Traditional RSI likely to provoke CICO emergency.**

**Key Principles:**
- Maintain spontaneous ventilation at all costs
- Double-setup with surgical airway ready
- Consider calling anesthesia/ENT backup early
- Avoid agitating patient (may worsen obstruction)

**Clinical Signs of Impending Obstruction:**
- Muffled "hot potato" voice
- Severe odynophagia
- Drooling (cannot swallow secretions)
- Tripoding / sitting forward
- Stridor (late/ominous sign)

**Management While Preparing:**
- Heliox 70:30 if available (reduces turbulent flow)
- Dexamethasone 10 mg IV
- Broad-spectrum antibiotics (ceftriaxone 2g IV)
- Humidified oxygen
- Keep patient calm and seated upright

**DO NOT:**
- Lay patient flat (obstruction worse)
- Agitate patient with multiple exams
- Insert tongue depressor (may trigger complete obstruction)

**Proceed to topicalization protocol →** [1][6]`,
        citation: [1, 6],
        next: 'awake-contraindications',
    },
    {
        id: 'awake-difficult',
        type: 'info',
        module: 1,
        title: 'Predicted Difficult Airway',
        body: `**Awake intubation allows confirmation of visualization before losing spontaneous breathing.**

**Indications:**
- Prior documented difficult intubation
- Mallampati IV with other risk factors
- Severely limited mouth opening (<3 cm)
- Immobile cervical spine
- Morbid obesity with short neck
- Obstructive sleep apnea with difficult anatomy

**Risk-Benefit:**
If patient CAN tolerate brief apnea and you have:
- Videolaryngoscopy available
- Surgical airway capability
- Skilled operator

Then RSI with backup plan may be reasonable.

**Choose awake when:**
- Multiple difficult airway predictors
- Prior failed intubation documented
- Anticipated difficult cricothyrotomy
- Patient physiologically fragile

**Proceed to contraindications check →**`,
        citation: [1, 2],
        next: 'awake-contraindications',
    },
    {
        id: 'awake-trauma',
        type: 'info',
        module: 1,
        title: 'Neck Trauma / Mass Effect',
        body: `**Distorted anatomy increases risk of CICO with paralysis.**

**Considerations:**
- Laryngeal fracture may cause complete obstruction with manipulation
- Expanding hematoma can displace/compress airway
- Tumor may distort landmarks
- Surgical airway may also be difficult (landmarks obscured)

**Approach:**
1. Maintain spontaneous breathing as long as possible
2. Prepare double-setup (surgical airway ready)
3. Consider smaller ETT (6.0-7.0 mm)
4. Have tracheostomy tray available if cricothyrotomy risky
5. Call ENT/surgery early if available

**Signs of Impending Obstruction:**
- Voice changes
- Stridor
- Subcutaneous emphysema
- Rapidly expanding hematoma
- Difficulty swallowing secretions

**Proceed to contraindications check →**`,
        citation: [1, 3],
        next: 'awake-contraindications',
    },
    {
        id: 'awake-acidosis',
        type: 'info',
        module: 1,
        title: 'Severe Metabolic Acidosis',
        body: `**Patient is breathing to compensate — apnea may be fatal.**

**The Problem:**
- DKA, sepsis, toxin ingestion with severe acidosis
- Patient compensating with massive minute ventilation
- Even brief apnea causes rapid pH drop
- Post-intubation mechanical ventilation may not match patient's compensatory drive

**Awake Approach Benefits:**
- Maintains spontaneous ventilation throughout
- Patient continues to compensate during procedure
- Smooth transition to mechanical ventilation

**Alternative: Delayed Sequence Intubation (DSI)**
If patient too agitated for awake approach:
1. Ketamine 1-2 mg/kg dissociative dose
2. Preoxygenate while dissociated (patient still breathing)
3. Then RSI once optimized

**Post-Intubation:**
- Set RR 20-30 to match patient's compensatory rate
- Target low normal EtCO2 initially
- Recheck blood gas within 30 minutes

**Proceed to contraindications check →**`,
        citation: [1, 7],
        next: 'awake-contraindications',
    },
    {
        id: 'awake-contraindications',
        type: 'question',
        module: 1,
        title: 'Any Contraindications to Awake Approach?',
        body: `**Contraindications to Awake Intubation:**

**Absolute:**
- Uncooperative/severely agitated patient (unable to follow commands)
- Local anesthetic allergy (rare but ask)
- Severe airway bleeding (relative — may use VL instead of fiberoptic)

**Relative:**
- Severely limited time for preparation
- Full stomach with high aspiration risk
- Patient refusing procedure

**If Patient Uncooperative:**
Consider Delayed Sequence Intubation (DSI):
1. Ketamine 1-1.5 mg/kg IV for dissociation
2. Preoxygenate/prepare while dissociated
3. Then proceed with awake technique once calm

**Any contraindications present?**`,
        citation: [1, 2],
        options: [
            { label: 'No contraindications', description: 'Proceed with awake approach', next: 'awake-prep-overview', urgency: 'routine' },
            { label: 'Patient uncooperative', description: 'Consider DSI first', next: 'awake-dsi', urgency: 'urgent' },
            { label: 'Severe bleeding / aspiration risk', description: 'Modify approach', next: 'awake-modified', urgency: 'urgent' },
        ],
    },
    {
        id: 'awake-dsi',
        type: 'info',
        module: 1,
        title: 'Delayed Sequence Intubation (DSI)',
        body: `**For uncooperative patients who need awake technique but cannot cooperate.**

**DSI Protocol:**

**Step 1: Dissociate**
- Ketamine 1-1.5 mg/kg IV push
- Patient becomes dissociated but maintains breathing

**Step 2: Preoxygenate**
- Apply non-rebreather or high-flow nasal cannula
- Patient continues spontaneous ventilation
- Target SpO2 >95% (or as high as achievable)
- Takes 3-5 minutes

**Step 3: Topicalize (if time permits)**
- Nebulized lidocaine while dissociated
- MAD spray to cords if able to visualize

**Step 4: Intubate**
- Perform awake intubation technique
- Patient still breathing but dissociated
- Confirm visualization before any paralytic

**Key Points:**
- Ketamine preserves respiratory drive (usually)
- Watch for apnea/laryngospasm at higher doses
- Have paralytic and bag-mask ready
- This is a bridge to awake technique, not RSI

**Proceed to preparation →**`,
        citation: [1, 7],
        next: 'awake-prep-overview',
    },
    {
        id: 'awake-modified',
        type: 'info',
        module: 1,
        title: 'Modified Approach: Bleeding / Aspiration Risk',
        body: `**Fiberoptic may be difficult with blood/secretions. Video laryngoscopy may be better.**

**For Airway Bleeding:**
- Consider awake video laryngoscopy instead of fiberoptic
- Suction immediately available
- Smaller scope if using fiberoptic (easier to clear)
- Have multiple ETT sizes ready

**For High Aspiration Risk:**
- Position patient head-up 30-45 degrees
- Have suction immediately available
- Consider NG decompression if full stomach
- Rapid topicalization protocol (minimal sedation)
- Glycopyrrolate antisialagogue still helpful

**Awake Video Laryngoscopy:**
- Registry success rate: **89%**
- Less dependent on clear view than fiberoptic
- Can suction and intubate simultaneously
- Hyperangulated blade may help with difficult anatomy

**Proceed to preparation →**`,
        citation: [1, 2],
        next: 'awake-prep-overview',
    },
    // =====================================================================
    // MODULE 2: PREPARATION
    // =====================================================================
    {
        id: 'awake-prep-overview',
        type: 'info',
        module: 2,
        title: 'Preparation Phase',
        body: `**Awake intubation requires 15-30 minutes of meticulous preparation.**

**Equipment Checklist:**
□ Fiberoptic scope (or VL with hyperangulated blade)
□ ETT 6.0, 6.5, 7.0 mm (smaller than usual)
□ Warm saline for ETT softening
□ Surgical lubricant / lidocaine jelly
□ Nasal trumpets (28-36 French)
□ MAD atomizer device
□ Nebulizer setup

**Medications:**
□ 4% lidocaine solution (nebulizer + MAD)
□ 4% lidocaine viscous (gargle)
□ Oxymetazoline nasal spray (vasoconstrictor)
□ Glycopyrrolate 0.2-0.3 mg (antisialagogue)
□ Ketamine vial (for sedation)
□ Paralytic (for after visualization)

**Backup/Rescue:**
□ Surgical airway tray open and ready
□ Bougie
□ LMA as backup
□ Second operator available

**Timeline:**
- T-15 min: Glycopyrrolate + start nebulized lidocaine
- T-5 min: Viscous lidocaine gargle + nasal prep
- T-0: Begin sedation and procedure`,
        citation: [3, 4],
        calculatorLinks: [
            { id: 'awake-topical-prep', label: 'Topical Prep Recipe' },
            { id: 'awake-atomized-recipe', label: 'Atomized Recipe' },
        ],
        next: 'awake-antisialagogue',
    },
    {
        id: 'awake-antisialagogue',
        type: 'info',
        module: 2,
        title: 'Step 1: Antisialagogue',
        body: `**Drying the airway is CRITICAL for topical anesthesia to work.**

**Glycopyrrolate (Preferred):**
- **Dose: 0.2-0.3 mg IV**
- Give 15 minutes before topicalization
- Minimal CNS effects (doesn't cross BBB)
- Longer duration than atropine

**Alternative: Atropine**
- Dose: 0.5 mg IV
- Crosses BBB (may cause confusion in elderly)
- Faster onset but shorter duration

**Ondansetron (Adjunct):**
- **4 mg IV**
- Helps blunt gag reflex
- Give with antisialagogue

**Goal:**
- Dry mouth completely with gauze before applying anesthetics
- Wet mucosa dilutes topical lidocaine → poor anesthesia
- Take time here — this is where awake intubations fail

**Timing:**
Give antisialagogue NOW, then proceed to topicalization in 10-15 minutes. [3][4]`,
        citation: [3, 4],
        next: 'awake-route',
    },
    {
        id: 'awake-route',
        type: 'question',
        module: 2,
        title: 'Nasal or Oral Route?',
        body: `**Choose based on anatomy, indication, and operator preference.**

**Nasal Fiberoptic (Preferred for most):**
- **92% first-attempt success**
- More comfortable for patient
- Better scope stability
- Smaller tube limitation (7.0 mm max)
- Risk of epistaxis

**Oral Fiberoptic:**
- **57% first-attempt success**
- Larger tube possible (8.0-8.5 mm)
- No epistaxis risk
- More gag stimulation
- Requires patient to keep mouth open

**Awake Video Laryngoscopy:**
- **89% first-attempt success**
- Best for bleeding/secretions
- Standard tube sizes
- Less dependent on topical anesthesia quality

**Which approach?**`,
        citation: [2, 4],
        options: [
            { label: 'Nasal fiberoptic', description: '92% success, most comfortable', next: 'awake-nasal-prep', urgency: 'routine' },
            { label: 'Oral fiberoptic', description: 'Larger tube, no epistaxis', next: 'awake-oral-prep', urgency: 'routine' },
            { label: 'Awake video laryngoscopy', description: 'Best for bleeding/secretions', next: 'awake-vl-prep', urgency: 'routine' },
        ],
    },
    // =====================================================================
    // MODULE 3: TOPICALIZATION
    // =====================================================================
    {
        id: 'awake-nasal-prep',
        type: 'info',
        module: 3,
        title: 'Nasal Route: Topicalization Protocol',
        body: `**Complete nasal and pharyngeal anesthesia is essential.**

**Phase 1: Nebulized Lidocaine (5-10 min)**
- 4-5 mL of **4% lidocaine** in nebulizer
- Patient breathes deeply for 5-10 minutes
- Anesthetizes lower airway/trachea

**Phase 2: Viscous Lidocaine Gargle**
- 3-4 mL of **4% viscous lidocaine**
- Patient gargles, swishes, advances posteriorly
- Self-anesthetizes pharynx

**Phase 3: Nasal Vasoconstriction (FIRST!)**
- **Oxymetazoline 0.05%** nasal spray × 2-3 sprays each naris
- OR phenylephrine 1% drops
- Wait 2-3 minutes before lidocaine
- Reduces epistaxis and systemic absorption

**Phase 4: Nasal Anesthesia**
- **4% lidocaine** spray into each naris (5-10 mL total)
- OR lidocaine-soaked pledgets in nasal cavity

**Phase 5: Serial Dilation**
- Insert 28-French nasal trumpet coated with lidocaine jelly
- Leave 1-2 min, then advance to 32-36 French if possible
- Prepare BOTH nares

**Max Lidocaine: 9 mg/kg lean body weight** [3][4]`,
        citation: [3, 4],
        calculatorLinks: [
            { id: 'awake-topical-prep', label: 'Topical Prep Recipe' },
        ],
        next: 'awake-mad-spray',
    },
    {
        id: 'awake-oral-prep',
        type: 'info',
        module: 3,
        title: 'Oral Route: Topicalization Protocol',
        body: `**Oral approach requires excellent pharyngeal anesthesia to control gag.**

**Phase 1: Nebulized Lidocaine (5-10 min)**
- 4-5 mL of **4% lidocaine** in nebulizer
- Patient breathes deeply
- Anesthetizes lower airway/trachea

**Phase 2: Dry the Mouth**
- Glycopyrrolate should be working by now
- Use gauze to dry oral cavity completely

**Phase 3: Viscous Lidocaine Technique**
- **Method A: Gargle**
  - 4-5 mL of 4% viscous lidocaine
  - Patient gargles, swishes, advances posteriorly

- **Method B: Tongue Depressor**
  - Thumbnail-sized blob of 5% lidocaine ointment on tongue blade
  - Cover with gauze to prevent dripping
  - Patient places in mouth, sucks, advances posteriorly

**Phase 4: MAD Spray to Cords**
- When patient can tolerate, spray epiglottis/cords
- Expect cough (protective, indicates reaching target)

**Bite Block:**
- May need to prevent patient biting scope
- Place after adequate anesthesia

**Max Lidocaine: 9 mg/kg lean body weight** [3][4]`,
        citation: [3, 4],
        calculatorLinks: [
            { id: 'awake-topical-prep', label: 'Topical Prep Recipe' },
        ],
        next: 'awake-mad-spray',
    },
    {
        id: 'awake-vl-prep',
        type: 'info',
        module: 3,
        title: 'Video Laryngoscopy: Topicalization',
        body: `**VL approach is less dependent on perfect topical anesthesia but still benefits from it.**

**Minimum Preparation:**
- Nebulized lidocaine 4% (if time permits)
- Viscous lidocaine gargle
- MAD spray to posterior pharynx

**Advantages of VL Awake:**
- Can suction and visualize simultaneously
- Less affected by secretions/blood
- Standard tube sizes
- Faster than fiberoptic if experienced

**Blade Selection:**
- Hyperangulated blade (GlideScope, McGrath) preferred
- Allows indirect visualization
- Less stimulation than direct laryngoscopy

**Technique:**
- Patient sitting up or semi-recumbent
- Gentle blade insertion
- Minimal jaw lift needed
- Visualize cords → confirm → then ketamine + paralytic

**This is essentially "look before you leap" with VL instead of fiber.** [2]`,
        citation: [2],
        next: 'awake-mad-spray',
    },
    {
        id: 'awake-mad-spray',
        type: 'info',
        module: 3,
        title: 'MAD Spray: Epiglottis & Cords',
        body: `**Final topicalization step: direct anesthesia of larynx.**

**Equipment:**
- 10 mL Luer-lock syringe
- MADgic atomizer device
- 4-6 mL of **4% aqueous lidocaine**

**Technique:**
1. Attach MAD device to syringe
2. Position patient sitting up, mouth open
3. Aim at epiglottis (visible with tongue depressor)
4. Quick spray — patient will cough
5. Wait 30-60 seconds
6. Repeat spray to vocal cords if possible

**Alternative: Spray-as-you-go**
- Spray through fiberscope channel during procedure
- 2-3 mL aliquots as you advance
- Allows real-time anesthesia of tissues you're about to touch

**Safety:**
- Wear face/eye protection (patient may cough spray back)
- Watch total lidocaine dose (add to prior doses)

**Proceed to sedation →** [4]`,
        citation: [4],
        images: [{ src: 'images/awake-intubation/larynx-anatomy.png', alt: 'Diagram of human larynx anatomy', caption: 'Larynx anatomy: epiglottis, arytenoids, and vocal cords — key landmarks for awake intubation topicalization and scope navigation (Wikimedia Commons, CC BY-SA 4.0)' }],
        calculatorLinks: [
            { id: 'awake-atomized-recipe', label: 'Atomized Recipe' },
        ],
        next: 'awake-sedation',
    },
    // =====================================================================
    // MODULE 4: SEDATION
    // =====================================================================
    {
        id: 'awake-sedation',
        type: 'question',
        module: 4,
        title: 'Sedation Strategy',
        body: `**Goal: Light sedation, patient still responsive and breathing spontaneously.**

**Options:**

**Ketamine (Most Common in ED):**
- Preserves airway reflexes
- Maintains spontaneous breathing
- Dissociative properties helpful
- Risk: increased airway tone, laryngospasm at high doses

**Dexmedetomidine:**
- "Cooperative sedation" — calm but awake
- NO respiratory depression
- Excellent antisialagogue effect
- Slower onset (needs infusion)

**Midazolam:**
- Less ideal (depresses airway reflexes more)
- Use when others contraindicated

**Which sedation approach?**`,
        citation: [1, 7, 8],
        options: [
            { label: 'Ketamine', description: 'Preferred in ED — 20 mg aliquots', next: 'awake-ketamine', urgency: 'routine' },
            { label: 'Dexmedetomidine', description: 'Infusion — best comfort, no resp depression', next: 'awake-dex', urgency: 'routine' },
            { label: 'Minimal sedation', description: 'Topical only — very cooperative patient', next: 'awake-minimal-sed', urgency: 'routine' },
        ],
    },
    {
        id: 'awake-ketamine',
        type: 'info',
        module: 4,
        title: 'Ketamine Sedation Protocol',
        body: `**Titrated ketamine is the workhorse sedative for ED awake intubation.**

**Dosing:**
- **20 mg IV aliquots every 2 minutes**
- Titrate to effect (drowsy but responsive)
- Typical total: 40-60 mg over 5-10 minutes
- Goal: Light sedation, follows simple commands

**What to Watch For:**
- Patient drowsy but breathing well ✓
- Can follow command "take a deep breath" ✓
- Eyes may be open with nystagmus ✓

**Red Flags (too much):**
- Apnea or significant hypoventilation
- Cannot respond to commands
- Laryngospasm

**If Apnea/Laryngospasm:**
- Stop sedation
- Bag-mask ventilation
- Small dose succinylcholine 20-50 mg if spasm persists
- Let patient recover before proceeding

**After Visualization Confirmed:**
- Give ketamine 1-2 mg/kg for full induction
- OR propofol/etomidate at standard doses
- Then paralytic if desired

**Key Point:** Never paralyze until you see cords. [1][7]`,
        citation: [1, 7],
        next: 'awake-technique-choice',
    },
    {
        id: 'awake-dex',
        type: 'info',
        module: 4,
        title: 'Dexmedetomidine Protocol',
        body: `**Best patient comfort and fewest desaturation episodes.**

**Loading Dose:**
- **0.5-1 mcg/kg IV over 10 minutes**
- Use 1 mcg/kg for anxious patients
- Use 0.5 mcg/kg for elderly (>65)

**Maintenance Infusion:**
- **0.6-0.7 mcg/kg/hour**
- Range: 0.2-1 mcg/kg/hour
- Titrate to calm but arousable

**Characteristics:**
- Onset: 5-10 minutes
- "Cooperative sedation" — patient calm, follows commands
- Excellent antisialagogue (bonus effect)
- NO respiratory depression when used alone

**Watch For:**
- Bradycardia (common at higher doses)
- Hypotension (can occur)
- Pretreat with glycopyrrolate if concerned about bradycardia

**Advantages:**
- Meta-analysis: Fewer desaturation episodes than other agents
- Patients more comfortable
- Smooth emergence

**Disadvantage:**
- Requires infusion pump
- Slower onset than ketamine
- Not ideal for truly agitated patients [8]`,
        citation: [8],
        next: 'awake-technique-choice',
    },
    {
        id: 'awake-minimal-sed',
        type: 'info',
        module: 4,
        title: 'Minimal Sedation Approach',
        body: `**For highly cooperative patients — topical anesthesia only.**

**When Appropriate:**
- Patient understands procedure and consents
- Excellent topical anesthesia achieved
- Not overly anxious
- May add small dose midazolam for anxiolysis

**Anxiolysis Only:**
- Midazolam 1-2 mg IV single dose
- Reduces anxiety without heavy sedation

**Coaching:**
- Explain each step before doing it
- "You'll feel pressure but no pain"
- "Breathe normally, don't hold your breath"
- "Coughing is normal and expected"

**Advantages:**
- Maximum airway protection
- Patient can report discomfort (indicates inadequate anesthesia)
- Fastest recovery

**This approach is common in planned OR cases but challenging in ED setting due to patient anxiety/illness.** [3]`,
        citation: [3],
        next: 'awake-technique-choice',
    },
    // =====================================================================
    // MODULE 5: TECHNIQUE
    // =====================================================================
    {
        id: 'awake-technique-choice',
        type: 'question',
        module: 5,
        title: 'Proceed with Intubation',
        body: `**Patient is prepared, topicalized, and sedated. Ready to intubate.**

**Final Checks:**
□ Surgical airway ready (double-setup)
□ Suction available
□ Paralytic drawn up (for after visualization)
□ Second operator available
□ Patient breathing spontaneously

**Which technique are you using?**`,
        citation: [1, 2],
        options: [
            { label: 'Nasal fiberoptic', description: '92% success rate', next: 'awake-nasal-technique', urgency: 'routine' },
            { label: 'Oral fiberoptic', description: '57% success rate', next: 'awake-oral-technique', urgency: 'routine' },
            { label: 'Awake video laryngoscopy', description: '89% success rate', next: 'awake-vl-technique', urgency: 'routine' },
        ],
    },
    {
        id: 'awake-nasal-technique',
        type: 'info',
        module: 5,
        title: 'Nasal Fiberoptic Technique',
        body: `**Step-by-Step Procedure:**

**Position:**
- Patient sitting or semi-recumbent (sitting preferred)
- Head neutral to slightly extended
- High-flow nasal O2 in contralateral naris

**1. Load ETT on Scope**
- 6.5-7.0 mm ETT (softened in warm saline)
- Lubricate generously with lidocaine jelly
- Advance ETT to just above scope tip

**2. Insert Scope**
- Enter patent naris (previously dilated)
- Hug septum, avoid turbinates
- Advance slowly, follow the airway

**3. Visualize**
- Ask patient "take a breath" to open glottis
- Suction secretions if needed
- Identify epiglottis → cords

**4. Advance Through Cords**
- When cords visualized, advance scope between them
- Go 2-3 cm past cords into trachea
- Confirm tracheal rings visible

**5. Railroad ETT**
- Hold scope steady
- Advance ETT over scope with gentle rotation
- If resistance at cords: withdraw 1cm, rotate 90° counterclockwise, re-advance

**6. Confirm Position**
- Visualize tube tip above carina
- Remove scope, confirm with capnography

**NOW safe to give ketamine induction + paralytic if desired.** [4]`,
        citation: [4],
        calculatorLinks: [
            { id: 'awake-nasal-steps', label: 'Nasal Steps Quick Ref' },
        ],
        next: 'awake-post-intubation',
    },
    {
        id: 'awake-oral-technique',
        type: 'info',
        module: 5,
        title: 'Oral Fiberoptic Technique',
        body: `**Step-by-Step Procedure:**

**Position:**
- Patient sitting up (STRONGLY preferred for oral)
- Head extended, chin forward
- Mouth wide open

**1. Place Bite Block/Airway**
- Ovassapian or Williams airway
- Protects scope from biting
- Keeps tongue forward

**2. Load ETT**
- 7.5-8.0 mm ETT possible with oral route
- Lubricate generously

**3. Insert Scope**
- Midline over tongue
- Stay in midline to avoid lateral pharyngeal wall
- Advance toward epiglottis

**4. Visualize Cords**
- Ask patient "take a breath"
- Suction if needed
- May need to lift epiglottis with scope tip

**5. Advance Through Cords**
- Same as nasal technique
- Confirm tracheal rings

**6. Railroad ETT**
- Hold scope, advance tube
- Resistance more common with oral (angle is sharper)
- Rotate counterclockwise if stuck

**7. Remove Scope & Confirm**
- Capnography confirmation
- Secure tube before inducing

**NOW safe to give ketamine induction + paralytic.** [4]`,
        citation: [4],
        calculatorLinks: [
            { id: 'awake-oral-steps', label: 'Oral Steps Quick Ref' },
        ],
        next: 'awake-post-intubation',
    },
    {
        id: 'awake-vl-technique',
        type: 'info',
        module: 5,
        title: 'Awake Video Laryngoscopy Technique',
        body: `**"Look Before You Leap" with Video Laryngoscopy**

**Position:**
- Semi-recumbent or sitting
- Standard sniffing position if tolerated

**1. Prepare**
- Hyperangulated blade preferred (GlideScope, McGrath)
- Bougie loaded in ETT
- Suction ready

**2. Insert Blade**
- Gentle insertion, minimal force
- Let patient accommodate
- Don't rush

**3. Visualize Cords**
- Confirm clear view of vocal cords
- Grade the view (Cormack-Lehane)

**4. DECISION POINT: Can You See Cords?**

**If YES (Grade 1-2):**
- Additional ketamine 20 mg IV
- Advance ETT under direct vision
- Once tube passes cords → full induction dose
- Then paralytic if desired

**If NO (Grade 3-4):**
- DO NOT PARALYZE
- Withdraw, reassess
- Try different blade, position
- Switch to fiberoptic
- Consider surgical airway if multiple failures

**Key Advantage:** You've confirmed the airway before losing it. [2]`,
        citation: [2],
        calculatorLinks: [
            { id: 'awake-see-cords-go', label: 'See Cords → Go Checklist' },
        ],
        next: 'awake-post-intubation',
    },
    // =====================================================================
    // MODULE 6: POST-INTUBATION & COMPLICATIONS
    // =====================================================================
    {
        id: 'awake-post-intubation',
        type: 'info',
        module: 6,
        title: 'Post-Intubation Management',
        body: `**Tube is in and confirmed. Now complete the induction.**

**After ETT Confirmed in Trachea:**

**Option 1: Full Induction**
- Ketamine 1-2 mg/kg IV OR
- Propofol 1-2 mg/kg IV OR
- Etomidate 0.3 mg/kg IV
- Then paralytic (rocuronium 1.2 mg/kg) if needed

**Option 2: Paralytic Only**
- If patient adequately sedated from procedural ketamine
- Rocuronium 1.2 mg/kg IV
- Watch for awareness if sedation wears off

**Option 3: No Paralytic**
- Some patients don't need paralysis post-intubation
- Continue sedation infusion
- Patient may breathe over ventilator initially

**Ventilator Settings:**
- Start with moderate settings
- If severe acidosis: high RR (20-30) to match compensation
- Recheck blood gas within 30 minutes

**Documentation:**
- Note technique used
- Grade of view achieved
- Medications given with doses/times
- Complications encountered`,
        citation: [1, 7],
        next: 'awake-complications',
    },
    {
        id: 'awake-complications',
        type: 'question',
        module: 6,
        title: 'Any Complications?',
        body: `**Awake intubation complications and troubleshooting.**

**Most Common (12%):**
- Hypoxia/desaturation

**Other:**
- Epistaxis (nasal route)
- Laryngospasm
- Failed visualization
- Oversedation

**Any complications?**`,
        citation: [2],
        options: [
            { label: 'None — successful', description: 'Proceed to disposition', next: 'awake-success', urgency: 'routine' },
            { label: 'Desaturation', description: 'SpO2 dropping', next: 'awake-desat', urgency: 'critical' },
            { label: 'Epistaxis', description: 'Nasal bleeding', next: 'awake-epistaxis', urgency: 'urgent' },
            { label: 'Laryngospasm', description: 'Airway obstruction', next: 'awake-laryngospasm', urgency: 'critical' },
            { label: 'Cannot visualize', description: 'Failed technique', next: 'awake-failed', urgency: 'urgent' },
        ],
    },
    {
        id: 'awake-desat',
        type: 'info',
        module: 6,
        title: 'Desaturation Management',
        body: `**Desaturation is the most common complication (12% of awake intubations).**

**Immediate Actions:**
1. **STOP** — Remove scope/blade
2. **OXYGENATE** — Bag-mask ventilation or NRB
3. **RECOVER** — Wait for SpO2 to recover
4. **REASSESS** — Then resume when stable

**Prevention (Next Attempt):**
- High-flow nasal oxygen during procedure
- Apneic oxygenation reduces desaturation to 0-1.5%
- Consider dexmedetomidine (fewer desat episodes)

**If Cannot Recover SpO2:**
- Paralytic + intubate (convert to RSI)
- Have surgical airway ready
- This is now CICO territory

**Key Point:**
Awake technique preserves spontaneous breathing. If patient becomes apneic or cannot oxygenate, you may need to convert to rapid intubation and accept the risks. [2]`,
        citation: [2],
        next: 'awake-success',
    },
    {
        id: 'awake-epistaxis',
        type: 'info',
        module: 6,
        title: 'Epistaxis Management',
        body: `**Nasal bleeding can obscure view and complicate procedure.**

**Prevention:**
- Oxymetazoline BEFORE lidocaine
- Gentle manipulation
- Proper serial dilation

**If Bleeding Occurs:**

**Minor (oozing):**
- Gentle suction only (vigorous makes worse)
- Apply topical epinephrine (1:10,000) on pledget
- Continue procedure if view adequate

**Moderate (obscuring view):**
- Consider switching to oral approach
- Pack bleeding naris, use contralateral

**Severe (cannot visualize):**
- Abort nasal approach
- Switch to oral fiberoptic or VL
- May need nasal packing after intubation

**Post-Intubation:**
- Check for continued bleeding
- Pack if necessary
- ENT consultation if severe`,
        citation: [4],
        next: 'awake-success',
    },
    {
        id: 'awake-laryngospasm',
        type: 'info',
        module: 6,
        title: 'Laryngospasm Management',
        body: `**Life-threatening complication — act fast.**

**Risk Factors:**
- Higher ketamine doses (>1 mg/kg)
- Inadequate topical anesthesia
- Oversedation
- Airway instrumentation triggering reflex

**Immediate Management:**

**Step 1: Remove Stimulus**
- Pull back scope/blade immediately

**Step 2: Positive Pressure Ventilation**
- 100% O2 via bag-mask
- Continuous positive pressure may break spasm

**Step 3: If Spasm Persists (>30 sec):**
- **Succinylcholine 20-50 mg IV** (sub-intubating dose)
- This will relax cords
- Be ready to ventilate and intubate

**Step 4: Full Paralysis if Needed**
- Succinylcholine 1-1.5 mg/kg
- Convert to RSI
- Accept that awake approach has failed

**Prevention:**
- Dense topical anesthesia
- Light sedation (not heavy)
- Have succinylcholine immediately available
- Experienced operator with gentle technique [1][7]`,
        citation: [1, 7],
        next: 'awake-success',
    },
    {
        id: 'awake-failed',
        type: 'info',
        module: 6,
        title: 'Failed Visualization',
        body: `**Cannot see cords — DO NOT PARALYZE.**

**Troubleshooting:**

**1. Inadequate Anesthesia?**
- Patient coughing/gagging excessively
- More topical anesthesia needed
- Allow time for effect (2-3 min)

**2. Excessive Secretions/Blood?**
- Suction carefully
- Was antisialagogue given?
- Consider VL instead of fiberoptic

**3. Anatomic Issues?**
- Try different blade/approach
- Jaw thrust by assistant
- Change patient position

**4. Operator Experience?**
- Call for backup
- More experienced operator may succeed

**After 3 Failed Attempts:**

**Option 1: Continue Awake**
- Additional topicalization
- Different technique
- Different operator

**Option 2: Surgical Airway**
- If anatomy precludes any visualization
- Double-setup should already be ready

**Option 3: Convert to RSI**
- Accept the risk
- Only if ventilation possible
- Surgical airway truly ready

**DO NOT paralyze a patient whose airway you cannot visualize without a clear backup plan.** [1][2]`,
        citation: [1, 2],
        next: 'awake-success',
    },
    {
        id: 'awake-success',
        type: 'result',
        module: 6,
        title: 'Successful Awake Intubation',
        body: `**Patient intubated with preservation of spontaneous ventilation.**

**Post-Procedure Checklist:**
□ ETT position confirmed (capnography, auscultation)
□ Tube secured appropriately
□ Full sedation/paralysis given as appropriate
□ Ventilator settings optimized
□ CXR ordered to confirm position
□ Document procedure in detail

**Documentation Should Include:**
- Indication for awake technique
- Topicalization protocol used
- Sedation agents and doses
- Route and technique (nasal/oral fiberoptic, VL)
- Grade of view achieved
- Complications and management
- Total lidocaine dose given

**Disposition:**
- ICU admission (all intubated patients)
- Continue sedation/analgesia
- Monitor for post-procedure complications

**Teaching Point:**
Awake intubation is a valuable skill. Each successful case builds experience for the next difficult airway.`,
        recommendation: 'Document procedure thoroughly. ICU admission for all intubated patients. Debrief with team after difficult cases.',
        confidence: 'definitive',
        citation: [1, 2],
    },
];
export const AWAKE_INTUBATION_NODE_COUNT = AWAKE_INTUBATION_NODES.length;
export const AWAKE_INTUBATION_MODULE_LABELS = [
    'Patient Selection & Indications',
    'Preparation',
    'Topicalization',
    'Sedation',
    'Technique',
    'Post-Intubation & Complications',
];
export const AWAKE_INTUBATION_CITATIONS = [
    { num: 1, text: 'Farkas J. Awake Intubation for Emergency and Critical Care. EMCrit IBCC. 2024. https://emcrit.org/emcrit/awakeintubation/' },
    { num: 2, text: 'Driver BE, et al. Managing Awake Intubation. Annals of Emergency Medicine. 2024. doi:10.1016/j.annemergmed.2024.05.010' },
    { num: 3, text: 'Ahmad I, et al. Difficult Airway Society Guidelines for Awake Tracheal Intubation (ATI) in Adults. Anaesthesia. 2020;75(4):509-528. PMID: 31729018' },
    { num: 4, text: 'LITFL. Awake Intubation. Life in the Fast Lane. 2024. https://litfl.com/awake-intubation/' },
    { num: 5, text: 'Farkas J. Angioedema. EMCrit IBCC. 2024. https://emcrit.org/ibcc/angioedema/' },
    { num: 6, text: 'Farkas J. Epiglottitis. EMCrit IBCC. 2024. https://emcrit.org/ibcc/epiglottitis/' },
    { num: 7, text: 'Weingart SD. Ketamine-Based Alternatives to Rapid Sequence Intubation. Emerg Med Clin North Am. 2019;37(3):473-491. PMID: 31262415' },
    { num: 8, text: 'Hu R, et al. Dexmedetomidine versus Other Sedatives for Awake Fiberoptic Intubation: A Meta-Analysis. PLoS One. 2022;17(7):e0271429. PMID: 35862447' },
    { num: 9, text: 'NYSORA. Regional and Topical Anesthesia for Awake Endotracheal Intubation. 2024. https://www.nysora.com/techniques/head-and-neck-blocks/airway/' },
];
