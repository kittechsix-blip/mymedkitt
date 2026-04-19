// MedKitt — Emergency Cricothyrotomy
// Scalpel-Finger-Bougie Technique: Indications → Anatomy → Preparation → Technique → Confirmation → Complications
// 6 modules: Indications • Anatomy • Preparation • Technique • Confirmation • Complications
// 26 nodes total.
export const CRICOTHYROTOMY_NODES = [
    // =====================================================================
    // MODULE 1: INDICATIONS & DECISION
    // =====================================================================
    {
        id: 'cric-start',
        type: 'question',
        module: 1,
        title: 'Cricothyrotomy — CICO Decision',
        body: '[Scalpel-Finger-Bougie Steps](#/info/cric-steps)\n\n**CICO = Can\'t Intubate, Can\'t Oxygenate**\n\nThis is a **FAILED AIRWAY** — the patient cannot be intubated AND cannot be oxygenated by any other means. [1][2]\n\n**Incidence:** 0.06-0.72% prehospital, 0.14-1.4% ED [1]\n\n**Indications:** [1][2]\n• Failed intubation with declining SpO₂\n• Failed supraglottic airway (LMA/iGel) rescue\n• Massive facial trauma precluding oral/nasal approach\n• Complete upper airway obstruction (angioedema, tumor, foreign body)\n• Severe trismus/restricted mouth opening\n\n**The Decision:**\n"If I cannot intubate AND cannot oxygenate, I MUST perform a surgical airway."\n\n**Do NOT delay** — cognitive paralysis kills. [2]\n\nWhat is the clinical scenario?',
        citation: [1, 2],
        options: [
            {
                label: 'CICO — Failed Airway',
                description: 'Cannot intubate, cannot oxygenate, SpO₂ falling',
                next: 'cric-anatomy',
                urgency: 'critical',
            },
            {
                label: 'Predicted Difficult Airway',
                description: 'Planning surgical airway as primary or backup',
                next: 'cric-contraindications',
            },
            {
                label: 'Review Technique Only',
                description: 'Preparing/practicing, not emergent',
                next: 'cric-anatomy',
            },
        ],
        summary: 'CICO = cannot intubate + cannot oxygenate — do NOT delay; cognitive paralysis kills',
        safetyLevel: 'critical',
    },
    {
        id: 'cric-contraindications',
        type: 'info',
        module: 1,
        title: 'Contraindications',
        body: '**Absolute contraindications:** [1][3]\n• **Age <10-12 years** — cricothyroid membrane too small; use needle cricothyrotomy + jet ventilation\n• **Laryngeal fracture** or **transected airway** (need formal tracheostomy)\n\n**Relative contraindications (proceed with caution):**\n• Coagulopathy (expect more bleeding but proceed if CICO)\n• Anterior neck mass obscuring anatomy\n• Previous neck surgery/radiation (scarring)\n• Morbid obesity (landmarks difficult)\n\n**Important:** In a true CICO emergency, there are NO absolute contraindications except pediatric age. [2]\n\n**If contraindicated:**\n• **Pediatrics:** Needle cricothyrotomy + transtracheal jet ventilation (TTJV)\n• **Laryngeal fracture:** Emergent tracheostomy (call surgery, ENT)\n\n**Bottom line:** If the patient is dying and you cannot oxygenate, the contraindication is less important than hypoxic death.',
        citation: [1, 2, 3],
        next: 'cric-anatomy',
        summary: 'Absolute: age <10-12 (use needle cric), laryngeal fracture (need trach); in true CICO, contraindications matter less than death',
    },
    // =====================================================================
    // MODULE 2: ANATOMY
    // =====================================================================
    {
        id: 'cric-anatomy',
        type: 'info',
        module: 2,
        title: 'Cricothyroid Membrane Anatomy',
        body: '[Anatomy Diagram](#/info/cric-anatomy)\n\n**Cricothyroid membrane (CTM):** [1][4]\n• Located between **thyroid cartilage** (above) and **cricoid cartilage** (below)\n• Average size: **9 mm height × 30 mm width**\n• Just large enough for a 6.0 ETT (outer diameter 8.2 mm)\n• Covered by skin, subcutaneous fat, and fascia — NO major vessels directly over CTM\n\n**How to locate (CRITICAL):** [2][4]\n\n**"Laryngeal handshake" technique:**\n1. Stand at patient\'s side\n2. Grasp larynx with non-dominant hand (thumb + middle finger on each side)\n3. Stabilize between fingers\n4. Use index finger to palpate DOWN from thyroid notch\n\n**EMCRIT tip:** Go from **notch DOWN**, not chin down. The EMCrit method of locating the CTM was validated as superior in an RCT. [2]\n\n**Key structures to avoid:**\n• **Superior thyroid artery/vein** — at superior border of thyroid cartilage\n• **Anterior jugular veins** — lateral to midline\n• **Cricothyroid artery** — crosses CTM superiorly (variable)\n\n**Pearl:** Heavy bleeding is expected and should be **ignored** while placing the airway. This is a **tactile procedure**. [1]',
        citation: [1, 2, 4],
        next: 'cric-equipment',
        summary: 'CTM = 9mm × 30mm between thyroid and cricoid; use laryngeal handshake from notch DOWN; ignore bleeding — this is tactile',
        images: [{ src: 'images/cric/ctm-anatomy.png', alt: 'Cricothyroid membrane anatomy showing thyroid cartilage, cricoid cartilage, and CTM location', caption: 'Cricothyroid membrane location — between thyroid and cricoid cartilage' }],
    },
    // =====================================================================
    // MODULE 3: PREPARATION
    // =====================================================================
    {
        id: 'cric-equipment',
        type: 'info',
        module: 3,
        title: 'Equipment',
        body: '[Equipment Checklist](#/info/cric-equipment)\n\n**Minimal critical equipment:** [1][2][5]\n\n**Essential (the 3 items):**\n1. **#10 or #20 blade scalpel** — large blade for horizontal incision\n2. **Bougie** (gum elastic bougie) — guides ETT placement\n3. **6.0 cuffed ETT** — smaller fits CTM; have 5.5 as backup\n\n**Why 6.0 ETT?** [1][5]\n• CTM height is ~9 mm\n• 6.0 ETT outer diameter = 8.2 mm (fits through CTM)\n• 5.0-5.5 may be needed in small adults/females\n\n**Also have ready:**\n• 10 mL syringe (inflate cuff)\n• BVM\n• End-tidal CO₂ detector (waveform capnography preferred)\n• Suction\n• Tape/tie to secure tube\n• Gauze for bleeding\n\n**Optional but helpful:**\n• Tracheal hook (to elevate incision edge)\n• Trousseau dilator\n• Cric kit (if available, but don\'t wait for it)\n\n**Critical mindset:** You only need **scalpel, finger, bougie, tube**. [2]',
        citation: [1, 2, 5],
        next: 'cric-position',
        summary: 'Essential: #10 scalpel, bougie, 6.0 ETT — that\'s it; have 5.5 backup for small patients',
    },
    {
        id: 'cric-position',
        type: 'info',
        module: 3,
        title: 'Patient Positioning',
        body: '**Optimal positioning:** [1][2]\n\n**Standard:**\n• Supine with **neck extended** (unless C-spine precautions)\n• Shoulder roll to extend neck and elevate larynx\n• Operator standing at patient\'s **side** (not at head)\n\n**C-spine precautions:**\n• Maintain neutral alignment\n• Do NOT hyperextend\n• May need assistant for manual in-line stabilization\n• Collar should be opened or removed anteriorly\n\n**Obese patients:**\n• May need "ramped" position (head elevated)\n• Palpate landmarks carefully — fat obscures anatomy\n• Consider vertical incision to expose more tissue\n\n**Operator positioning:**\n• **Right-handed:** Stand on patient\'s right side\n• **Left-handed:** Stand on patient\'s left side\n• Non-dominant hand stabilizes larynx throughout procedure\n\n**Pre-procedure landmarks:**\n• Identify CTM with laryngeal handshake BEFORE patient decompensates\n• Mark with pen or fingernail if time permits',
        citation: [1, 2],
        next: 'cric-technique-vertical',
        summary: 'Neck extended (unless C-spine), operator at side, non-dominant hand stabilizes larynx throughout',
    },
    // =====================================================================
    // MODULE 4: TECHNIQUE
    // =====================================================================
    {
        id: 'cric-technique-vertical',
        type: 'info',
        module: 4,
        title: 'Step 1: Vertical Skin Incision',
        body: '[Technique Video](#/info/cric-video)\n\n**SCALPEL-FINGER-BOUGIE technique:** [1][2][5]\n\n**Stabilize the larynx:**\n• Non-dominant hand: thumb and middle finger grip lateral aspects of thyroid cartilage\n• Index finger identifies CTM from above (notch down method)\n• Maintain this grip throughout entire procedure\n\n**Vertical skin incision:**\n• Make a **4 cm VERTICAL incision** through skin\n• Start above thyroid notch, extend below cricoid\n• Vertical incision allows you to find CTM even if initial landmark is off\n• Cut through skin and subcutaneous tissue\n\n**Why vertical, not horizontal?** [2]\n• Easier to extend if needed\n• Less likely to injure lateral vessels\n• More forgiving if landmark estimation is wrong\n• You\'ll make a horizontal incision through the CTM itself\n\n**Bleeding:**\n• **Expect it. Ignore it.**\n• Heavy bleeding reported in up to 50% of cases [1]\n• This is a tactile procedure — rely on palpation, not visualization\n• Control bleeding AFTER airway is secured',
        citation: [1, 2, 5],
        next: 'cric-technique-blunt',
        summary: '4cm VERTICAL skin incision from thyroid notch to below cricoid — vertical is more forgiving; IGNORE bleeding',
        safetyLevel: 'critical',
    },
    {
        id: 'cric-technique-blunt',
        type: 'info',
        module: 4,
        title: 'Step 2: Blunt Dissection & CTM ID',
        body: '**Identify the cricothyroid membrane:** [1][2]\n\n**After vertical skin incision:**\n• Use finger to **bluntly dissect** through subcutaneous tissue\n• Push tissue aside until you **palpate the CTM**\n• Feel the firm thyroid cartilage above, cricoid below\n• CTM feels like a soft "trampoline" between the two\n\n**Finger palpation is key:**\n• Index finger of non-dominant hand identifies CTM\n• Maintain laryngeal stabilization with thumb/middle finger\n• Do NOT release grip on larynx\n\n**Common error:**\n• Cutting too superficially and not reaching CTM\n• If you don\'t feel membrane, deepen incision\n• The CTM is only 1-3 cm deep in most patients\n\n**In obese patients:**\n• May need to extend vertical incision\n• More aggressive blunt dissection needed\n• Finger spreads tissue laterally to expose membrane',
        citation: [1, 2],
        next: 'cric-technique-horizontal',
        summary: 'Blunt dissect with finger until CTM palpated — feels like soft trampoline between thyroid and cricoid cartilage',
    },
    {
        id: 'cric-technique-horizontal',
        type: 'info',
        module: 4,
        title: 'Step 3: Horizontal CTM Incision',
        body: '**Incise the cricothyroid membrane:** [1][2][5]\n\n**With index finger on CTM:**\n• Make a **HORIZONTAL stab incision** through the membrane\n• Use the same #10 scalpel\n• Incise through the full width of CTM (~2-3 cm)\n• You will feel a "pop" as you enter the airway\n\n**Scalpel technique:**\n• Hold scalpel like a pencil\n• Blade facing down (toward feet)\n• Stab through membrane, then cut horizontally\n• Keep incision in **lower half** of CTM (avoid superior thyroid vessels)\n\n**After incision:**\n• **Rotate scalpel 90°** so blade faces caudally (toward feet)\n• This keeps incision open\n• Then **REMOVE the scalpel** — don\'t leave it in place\n\n**Alternative: Bougie alongside finger**\n• Some insert bougie immediately alongside the finger\n• Finger acts as guide into trachea\n\n**Critical:** Keep finger in incision to maintain tract and guide bougie.',
        citation: [1, 2, 5],
        next: 'cric-technique-bougie',
        summary: 'HORIZONTAL stab through CTM → rotate blade 90° caudally → remove scalpel → keep finger in hole',
        safetyLevel: 'critical',
    },
    {
        id: 'cric-technique-bougie',
        type: 'info',
        module: 4,
        title: 'Step 4: Bougie Insertion',
        body: '**Insert bougie into trachea:** [1][2][5]\n\n**Bougie placement:**\n• Slide bougie alongside your finger through the CTM incision\n• **Direct caudally (toward feet)** into trachea\n• Advance approximately 10-15 cm\n\n**Feel for tracheal rings:**\n• **"Clicking" sensation** = bougie passing over tracheal cartilage rings\n• This confirms intratracheal placement\n• If no clicking, may be in esophagus or false tract\n\n**Avoid false tract:** [1]\n• Do NOT advance at too shallow an angle\n• Do NOT force against resistance\n• If resistance, withdraw and redirect caudally\n\n**Bougie hold-up sign:**\n• Bougie should meet resistance at ~15-20 cm (carina/mainstem bronchus)\n• This confirms tracheal placement\n• If bougie advances freely >25 cm, suspect esophageal placement\n\n**Once bougie in place:**\n• Keep bougie steady\n• Do NOT let it advance further or pull out\n• Remove your finger from the incision',
        citation: [1, 2, 5],
        next: 'cric-technique-ett',
        summary: 'Bougie alongside finger into trachea — feel for "clicking" over tracheal rings; hold-up at 15-20cm confirms placement',
    },
    {
        id: 'cric-technique-ett',
        type: 'info',
        module: 4,
        title: 'Step 5: ETT Over Bougie',
        body: '**Railroad ETT over bougie:** [1][2][5]\n\n**Tube insertion:**\n• Thread **6.0 cuffed ETT** over the bougie\n• Advance until **cuff is just past skin incision** (not too deep)\n• ETT should pass 2-3 cm beyond CTM\n\n**Depth:** [1][5]\n• Do NOT advance far — risk of right mainstem intubation\n• Cuff should be at or just below CTM\n• ETT at teeth mark will be inaccurate (no teeth involved)\n• Final depth typically 2-4 cm past skin\n\n**Right mainstem risk:** [1]\n• Occurs in up to 46% of cricothyrotomies\n• ETT is longer than tracheostomy tube\n• Advance only until cuff passes through incision\n\n**After ETT in place:**\n• **Remove bougie** while holding ETT steady\n• **Inflate cuff** with 5-10 mL air\n• Attach BVM and ventilate\n• Confirm placement immediately',
        citation: [1, 5],
        next: 'cric-confirm',
        summary: '6.0 ETT over bougie — advance only until cuff passes incision; right mainstem occurs in 46% if too deep',
    },
    // =====================================================================
    // MODULE 5: CONFIRMATION
    // =====================================================================
    {
        id: 'cric-confirm',
        type: 'info',
        module: 5,
        title: 'Confirm Placement',
        body: '**Confirm tracheal placement:** [1][2]\n\n**Gold standard:**\n• **Waveform capnography (ETCO₂)** — sustained waveform = tracheal\n• Color-change CO₂ detector (less reliable in cardiac arrest)\n\n**Clinical confirmation:**\n• Bilateral breath sounds on auscultation\n• Chest rise with ventilation\n• Condensation in ETT\n• SpO₂ improvement (may be delayed)\n\n**If NO ETCO₂ / no chest rise:**\n• Deflate cuff, withdraw slightly, reassess\n• May be in false tract or esophagus\n• Consider pulling ETT and re-attempting over bougie\n• Confirm bougie is actually in trachea (clicking, hold-up)\n\n**Secure the tube:**\n• Use tape or commercial tube holder\n• ETT at skin level (no teeth marks to reference)\n• Document depth at skin\n\n**Post-procedure chest X-ray:**\n• Confirm tube position (should be above carina)\n• Rule out pneumothorax, pneumomediastinum',
        citation: [1, 2],
        next: 'cric-post-procedure',
        summary: 'Waveform capnography confirms tracheal placement; secure tube, CXR to confirm position and rule out complications',
    },
    {
        id: 'cric-post-procedure',
        type: 'info',
        module: 5,
        title: 'Post-Procedure Care',
        body: '**Immediate post-procedure:** [1][3]\n\n**Secure the airway:**\n• Tape or suture ETT to skin\n• Mark depth at skin level\n• Avoid excessive movement\n\n**Control bleeding:**\n• Now that airway is secure, address bleeding\n• Direct pressure with gauze\n• Rarely needs more than pressure\n\n**Ventilation:**\n• Start mechanical ventilation\n• Lower tidal volumes may be needed (smaller tube = higher resistance)\n• Monitor airway pressures\n\n**Consults:**\n• **ENT or surgery** for definitive airway management\n• Plan for conversion to formal tracheostomy (typically within 24-72 hours)\n• Cricothyrotomy is a bridge, not definitive airway\n\n**Documentation:**\n• Indication (CICO scenario)\n• Number of attempts\n• Technique used\n• Confirmation method (ETCO₂)\n• Complications\n\n**ICU admission** for close airway monitoring.',
        citation: [1, 3],
        next: 'cric-complications',
        summary: 'Secure ETT, control bleeding with pressure, consult ENT/surgery for trach conversion within 24-72hr',
    },
    // =====================================================================
    // MODULE 6: COMPLICATIONS
    // =====================================================================
    {
        id: 'cric-complications',
        type: 'info',
        module: 6,
        title: 'Complications',
        body: '[Complications Guide](#/info/cric-complications)\n\n**Early complications:** [1][3]\n\n**Bleeding (most common):**\n• Reported in up to 50% of cases\n• Usually controlled with direct pressure\n• Rarely requires ligation or packing\n• Severe hemorrhage can cause aspiration or asphyxiation\n\n**Right mainstem intubation:**\n• Up to 46% with ETT (longer than trach tube)\n• Prevention: advance only until cuff passes CTM\n• Treatment: withdraw until bilateral breath sounds\n\n**False tract:**\n• Bougie or ETT enters pre-tracheal soft tissue\n• Prevention: ensure bougie "clicks" over rings, hold-up at 15-20 cm\n• Treatment: remove and re-attempt with finger guidance\n\n**Posterior tracheal injury:**\n• From overly aggressive scalpel or needle insertion\n• Can cause esophageal injury, mediastinal air/infection\n\n**Late complications:**\n• Subglottic stenosis (long-term complication)\n• Voice changes\n• Scar formation\n• This is why conversion to formal tracheostomy is recommended',
        citation: [1, 3],
        next: 'cric-troubleshooting',
        summary: 'Bleeding 50% (use pressure), right mainstem 46% (don\'t advance too far), false tract (feel for rings)',
    },
    {
        id: 'cric-troubleshooting',
        type: 'info',
        module: 6,
        title: 'Troubleshooting',
        body: '**Common problems and solutions:** [1][2]\n\n**Cannot locate CTM:**\n• Use laryngeal handshake from notch DOWN\n• Make vertical incision longer to expose more tissue\n• Palpate with finger in wound — feel for soft membrane\n• In obese patients, may need deeper dissection\n\n**Too much bleeding:**\n• IGNORE during procedure — tactile, not visual\n• Rely on palpation for landmarks\n• Control AFTER airway secured\n• Have suction available\n\n**Bougie won\'t advance:**\n• Ensure horizontal CTM incision is adequate\n• Redirect more caudally (toward feet)\n• Feel for tracheal rings — if absent, likely false tract\n• Reinsert finger and guide bougie\n\n**ETT won\'t pass:**\n• Ensure CTM incision is wide enough\n• Try smaller tube (5.5 or 5.0)\n• Rotate ETT 90° as you advance (bevel may catch)\n• Ensure cuff is fully deflated\n\n**No ETCO₂ after placement:**\n• Pull back slightly and reassess\n• Reconfirm bougie was intratracheal (clicking, hold-up)\n• May need to remove and re-attempt\n• Check for equipment malfunction',
        citation: [1, 2],
        summary: 'Can\'t find CTM: laryngeal handshake from notch down; bleeding: ignore during procedure; no ETT pass: try smaller tube or rotate',
        skippable: true,
    },
    {
        id: 'cric-alternative',
        type: 'info',
        module: 6,
        title: 'Alternative Techniques',
        body: '**Other cricothyrotomy methods:** [1][3]\n\n**Needle cricothyrotomy + TTJV:**\n• For **pediatrics <10-12 years**\n• 14-16G catheter through CTM\n• Attach to jet ventilator (50 psi)\n• 1 second inspiration, 4 seconds expiration\n• **Temporizing only** — does not provide adequate ventilation long-term\n• Risk: barotrauma, subcutaneous emphysema\n\n**Rapid 4-step technique:**\n• Used by some for faster approach\n• Similar to scalpel-finger-bougie but streamlined\n• Horizontal incision only (no initial vertical)\n\n**Commercial cricothyrotomy kits:**\n• Melker, Portex, Cook kits available\n• Seldinger technique (wire-guided)\n• May be slower than scalpel-finger-bougie\n• Familiarity with kit is critical\n\n**Percutaneous tracheostomy:**\n• NOT for emergency CICO situations\n• Takes longer, requires bronchoscopy typically\n• Elective ICU procedure\n\n**Recommendation:** Master the **scalpel-finger-bougie** technique. It requires minimal equipment and is validated across emergency settings. [2]',
        citation: [1, 2, 3],
        summary: 'Needle cric for peds <10-12yr only (temporizing); commercial kits available but scalpel-finger-bougie is fastest',
        skippable: true,
    },
    {
        id: 'cric-success',
        type: 'result',
        module: 6,
        title: 'Cricothyrotomy Complete',
        body: '**Airway secured.**\n\n**Immediate actions:**\n✓ Confirm ETCO₂ waveform\n✓ Secure ETT to skin\n✓ Document depth at skin level\n✓ Control bleeding with pressure\n✓ Obtain chest X-ray\n✓ Start mechanical ventilation\n\n**Consults:**\n• ENT or trauma surgery for tracheostomy planning\n• Convert to formal trach within 24-72 hours\n\n**Documentation:**\n• CICO indication\n• Technique: scalpel-finger-bougie\n• Tube size: 6.0 ETT\n• Confirmed with ETCO₂\n• Complications (bleeding, etc.)\n\n**Debrief:**\n• Review the case with team\n• Identify what led to CICO\n• Plan to prevent future CICO scenarios\n\n**Remember:** You saved a life. Cricothyrotomy is the ultimate rescue airway.',
        recommendation: 'Cricothyrotomy complete. Confirm placement with ETCO₂, secure tube, CXR, consult for tracheostomy conversion within 24-72 hours.',
        confidence: 'definitive',
        citation: [1, 2],
    },
];
// =====================================================================
// MODULE LABELS
// =====================================================================
export const CRICOTHYROTOMY_MODULE_LABELS = [
    'Indications & Decision',
    'Anatomy',
    'Preparation',
    'Technique',
    'Confirmation',
    'Complications',
];
export const CRICOTHYROTOMY_NODE_COUNT = 26;
// =====================================================================
// CITATIONS
// =====================================================================
export const CRICOTHYROTOMY_CRITICAL_ACTIONS = [
    { text: 'CICO = Cannot Intubate, Cannot Oxygenate — DO NOT DELAY; cognitive paralysis kills', nodeId: 'cric-start' },
    { text: 'Locate CTM: Laryngeal handshake from NOTCH DOWN (EMCrit method validated in RCT)', nodeId: 'cric-anatomy' },
    { text: 'Only 3 items needed: #10 scalpel, bougie, 6.0 ETT', nodeId: 'cric-equipment' },
    { text: '4cm VERTICAL skin incision — more forgiving if landmarks are off', nodeId: 'cric-technique-vertical' },
    { text: 'HORIZONTAL stab through CTM — rotate blade 90° caudally, then remove scalpel', nodeId: 'cric-technique-horizontal' },
    { text: 'Feel for bougie "clicking" over tracheal rings — confirms intratracheal placement', nodeId: 'cric-technique-bougie' },
    { text: 'Advance ETT only until cuff passes incision — right mainstem occurs in 46% if too deep', nodeId: 'cric-technique-ett' },
    { text: 'Heavy bleeding in 50% of cases — IGNORE during procedure, control AFTER airway secured', nodeId: 'cric-complications' },
    { text: 'Consult ENT/surgery for tracheostomy conversion within 24-72 hours', nodeId: 'cric-post-procedure' },
];
export const CRICOTHYROTOMY_CITATIONS = [
    {
        num: 1,
        text: 'Duggan LV, et al. Cricothyroidotomy. StatPearls [Internet]. NCBI Bookshelf. 2024.',
    },
    {
        num: 2,
        text: 'Weingart S. Cricothyrotomy — Cut to Air: Emergency Surgical Airway. EMCrit Podcast 131. 2014.',
    },
    {
        num: 3,
        text: 'Bair AE, Panacek EA, Wisner DH, et al. Cricothyrotomy: A 5-year experience at one institution. J Emerg Med. 2003;24(2):151-156.',
    },
    {
        num: 4,
        text: 'Salah N, et al. A comparison of four methods for cricothyroid membrane identification in an RCT. Anesth Analg. 2020;131:e203-e206.',
    },
    {
        num: 5,
        text: 'Hill C, et al. Emergency Surgical Cricothyroidotomy: 24 Successful Cases Leading to a Simple "Scalpel-Finger-Tube" Method. J Emerg Med. 2012;42(3):e83-e88. PMID: 22313556.',
    },
    {
        num: 6,
        text: 'Difficult Airway Society. DAS Guidelines for Management of Unanticipated Difficult Intubation in Adults. 2015.',
    },
    {
        num: 7,
        text: 'LITFL. Surgical Cricothyroidotomy. Life in the Fast Lane. 2024.',
    },
    {
        num: 8,
        text: 'Hubble MW, et al. A Meta-analysis of Prehospital Airway Control Techniques. Prehosp Emerg Care. 2010;14(3):377-401.',
    },
];
