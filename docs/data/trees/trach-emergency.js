// MedKitt - Tracheostomy Emergencies
// Emergency Algorithm → Trach Types → Obstruction → Dislodgement → Bleeding → Fresh vs Mature → Disposition
// 6 modules: Emergency Algorithm → Tracheostomy Types → Obstruction Management → Dislodgement → Bleeding → Disposition
// 28 nodes total.
export const TRACH_EMERGENCY_CRITICAL_ACTIONS = [
    { text: 'Apply high-flow O2 to BOTH face AND stoma', nodeId: 'trach-start' },
    { text: 'Remove inner cannula FIRST for obstruction', nodeId: 'trach-obstruction-start' },
    { text: 'Deflate cuff if unable to ventilate', nodeId: 'trach-obstruction-start' },
    { text: 'Do NOT blind replace fresh trach (<7 days)', nodeId: 'trach-fresh-emergency' },
    { text: 'Oral intubation for fresh trach dislodgement', nodeId: 'trach-oral-intubation' },
    { text: 'Hyperinflate cuff (50 mL) for TIF hemorrhage', nodeId: 'trach-bleeding-massive' },
    { text: 'Call ENT/surgery for fresh trach or TIF', nodeId: 'trach-disposition-ent' },
    { text: 'Confirm placement with capnography after replacement', nodeId: 'trach-confirm-placement' },
];
export const TRACH_EMERGENCY_NODES = [
    // =====================================================================
    // MODULE 1: EMERGENCY ALGORITHM (NTSP Green Algorithm)
    // =====================================================================
    {
        id: 'trach-start',
        type: 'info',
        module: 1,
        title: 'Tracheostomy Emergency',
        body: '**NTSP Emergency Algorithm: Tracheostomy patient in distress**\n\n**FIRST ACTIONS (simultaneous):**\n1. Call for expert airway help\n2. Apply high-flow O2 to BOTH face AND stoma\n3. Assess: Is this a tracheostomy or laryngectomy?\n\n**Critical distinction:**\n- **Tracheostomy:** Upper airway may be patent - can oxygenate from above\n- **Laryngectomy:** NO connection between mouth and lungs - stoma is ONLY airway\n\n**Look for:**\n- Red bedside sign = Laryngectomy (stoma only)\n- Green bedside sign = Tracheostomy (dual airway)\n\nCheck bedhead sign or ask patient/family. [1][2][3]',
        citation: [1, 2, 3],
        calculatorLinks: [
            { id: 'trach-algorithm', label: 'NTSP Algorithm' },
        ],
        next: 'trach-vs-laryngectomy',
    },
    {
        id: 'trach-vs-laryngectomy',
        type: 'question',
        module: 1,
        title: 'Tracheostomy or Laryngectomy?',
        body: '**Laryngectomy = Total surgical removal of larynx**\n- NO connection between oropharynx and airway\n- CANNOT be intubated from above\n- Stoma is the ONLY airway\n\n**Tracheostomy = Tube through trachea, larynx intact**\n- Upper airway may be patent\n- Can potentially oxygenate/intubate from above\n- Dual oxygenation strategy possible\n\n**If uncertain:** Attempt to feel airflow from mouth during ventilation. No airflow = likely laryngectomy. [1][2]',
        citation: [1, 2],
        options: [
            {
                label: 'Tracheostomy (upper airway intact)',
                next: 'trach-assessment',
            },
            {
                label: 'Laryngectomy (stoma only airway)',
                next: 'laryngectomy-emergency',
                urgency: 'critical',
            },
            {
                label: 'Unknown - proceed with caution',
                next: 'trach-assessment',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'laryngectomy-emergency',
        type: 'info',
        module: 1,
        title: 'Laryngectomy Emergency',
        body: '**CRITICAL: Stoma is ONLY airway - cannot oxygenate from above**\n\n**Emergency management:**\n1. Apply O2 directly to stoma (pediatric face mask or trach collar)\n2. If not breathing: BVM over stoma with pediatric face mask\n3. Remove any devices/dressings from stoma\n4. Suction stoma gently\n5. If tube present: deflate cuff, remove inner cannula, attempt suction\n\n**If tube removal needed:**\n- Replace with tracheostomy tube or ETT through stoma\n- Size 6.0 cuffed ETT fits most adult stomas\n- Do NOT attempt oral/nasal intubation\n\n**Call ENT/surgeon immediately.** [1][2][3]',
        citation: [1, 2, 3],
        next: 'trach-disposition-ent',
    },
    {
        id: 'trach-assessment',
        type: 'question',
        module: 1,
        title: 'Initial Assessment: Problem Type?',
        body: '**Look, listen, feel at both mouth AND stoma**\n\n**Signs of OBSTRUCTION:**\n- Unable to pass suction catheter\n- High resistance to BVM ventilation\n- Visible secretions/blood in tube\n\n**Signs of DISLODGEMENT:**\n- Tube appears malpositioned or loose\n- Subcutaneous emphysema\n- Unable to ventilate through tube despite clear lumen\n\n**Signs of BLEEDING:**\n- Blood from stoma or tube\n- Sentinel bleed (small bleed preceding massive hemorrhage)\n- Recent trach placement (<3 weeks)\n\n**Apply waveform capnography** to assess ventilation. [1][2][4]',
        citation: [1, 2, 4],
        options: [
            {
                label: 'Suspected obstruction',
                next: 'trach-obstruction-start',
                urgency: 'critical',
            },
            {
                label: 'Suspected dislodgement',
                next: 'trach-dislodge-assess',
                urgency: 'critical',
            },
            {
                label: 'Significant bleeding',
                next: 'trach-bleeding-start',
                urgency: 'critical',
            },
            {
                label: 'Patient stable - equipment check',
                next: 'trach-equipment',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: TRACHEOSTOMY TYPES & EQUIPMENT
    // =====================================================================
    {
        id: 'trach-equipment',
        type: 'info',
        module: 2,
        title: 'Tracheostomy Equipment Checklist',
        body: '**Bedside equipment for EVERY trach patient:**\n\n**Immediate access:**\n- Spare tracheostomy tube (same size + one size smaller)\n- Spare inner cannula (if applicable)\n- Suction equipment with appropriate catheters\n- 10 mL syringe for cuff deflation\n- Stitch cutters/scissors\n- Water-soluble lubricant\n- Tracheal dilators (for mature stomas)\n\n**Nearby access:**\n- Bag-valve-mask with pediatric face mask (for stoma ventilation)\n- Flexible bronchoscope\n- Size 6.0 cuffed ETT (fits most adult stomas)\n- Standard airway cart/difficult airway equipment\n- Capnography\n\n**Know your tube:** Inner cannula? Cuffed? Fenestrated? [2][4][5]',
        citation: [2, 4, 5],
        calculatorLinks: [
            { id: 'trach-tube-size', label: 'Tube Sizing Guide' },
        ],
        next: 'trach-tube-types',
    },
    {
        id: 'trach-tube-types',
        type: 'info',
        module: 2,
        title: 'Tracheostomy Tube Types',
        body: '**CUFFED vs UNCUFFED:**\n- **Cuffed:** Inflatable balloon creates seal for mechanical ventilation\n- **Uncuffed:** For spontaneous breathers, allows speech with finger occlusion\n\n**INNER CANNULA:**\n- Removable inner tube for easy cleaning\n- **ALWAYS remove inner cannula first** when troubleshooting obstruction\n- Not all tubes have inner cannulas\n\n**FENESTRATED:**\n- Holes in outer cannula allow airflow through vocal cords\n- Used for speech and weaning\n- **Must use non-fenestrated inner cannula for suctioning**\n- Fenestrations can cause granulation tissue formation\n\n**SPEAKING VALVES (Passy-Muir):**\n- One-way valve allows air through cords on exhalation\n- **MUST deflate cuff** before placing speaking valve\n- Remove immediately if respiratory distress [2][4][5]',
        citation: [2, 4, 5],
        next: 'trach-sizing',
    },
    {
        id: 'trach-sizing',
        type: 'info',
        module: 2,
        title: 'Tracheostomy Sizing & Replacement',
        body: '**Tracheostomy tube sizing:**\n- **ID (inner diameter):** Corresponds roughly to ETT size (7.0, 8.0, etc.)\n- **OD (outer diameter):** Critical for stoma fit\n- **Length:** Standard vs extended length for obese patients\n\n**Common adult sizes:**\n- Female: 6.0-7.0 ID\n- Male: 7.0-8.0 ID\n- Shiley, Portex, Bivona are common brands (not interchangeable)\n\n**Replacement strategy:**\n- Use same brand/model if possible\n- If unavailable: use one size smaller trach or appropriate ETT\n- **ETT through stoma:** Size ~6.0 cuffed for most adults\n- Do NOT advance ETT too far (risk of right mainstem)\n\n**Lubrication:** Water-soluble only. [2][4][5]',
        citation: [2, 4, 5],
        next: 'trach-assessment',
    },
    // =====================================================================
    // MODULE 3: OBSTRUCTION MANAGEMENT
    // =====================================================================
    {
        id: 'trach-obstruction-start',
        type: 'info',
        module: 3,
        title: 'Obstruction: Sequential Algorithm',
        body: '**NTSP Obstruction Algorithm - work through sequentially:**\n\n**Step 1: Remove any external devices**\n- Speaking valve, cap, HME filter\n- Trach collar or humidity device\n\n**Step 2: Remove inner cannula**\n- Pull out and inspect\n- Reassess ventilation immediately\n\n**Step 3: Pass suction catheter**\n- If passes easily: suction and reassess\n- If cannot pass: complete obstruction present\n\n**Step 4: Deflate cuff (if present)**\n- Allows air to bypass around tube\n- May relieve false passage obstruction\n\n**Step 5: Remove entire tracheostomy tube**\n- If all above fails, remove tube entirely\n- Oxygenate via face or stoma as appropriate\n\n**Use capnography to assess each intervention.** [1][2][3][4]',
        citation: [1, 2, 3, 4],
        next: 'trach-obstruction-decision',
    },
    {
        id: 'trach-obstruction-decision',
        type: 'question',
        module: 3,
        title: 'Obstruction: Response to Algorithm?',
        body: '**Reassess after working through algorithm:**\n\n**Improved:**\n- Can now pass suction catheter\n- Capnography shows waveform\n- Patient oxygenating\n\n**Not improved:**\n- Still cannot ventilate\n- No capnography waveform\n- Patient deteriorating\n\n**Common obstruction causes:**\n- Mucus plug (most common)\n- Blood clot\n- Granulation tissue\n- False passage/displacement\n- Tracheal stenosis [1][2][4]',
        citation: [1, 2, 4],
        options: [
            {
                label: 'Obstruction cleared - patient improved',
                next: 'trach-post-obstruction',
            },
            {
                label: 'Still obstructed after tube removal',
                next: 'trach-obstruction-refractory',
                urgency: 'critical',
            },
            {
                label: 'Need to replace tube',
                next: 'trach-fresh-vs-mature',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'trach-post-obstruction',
        type: 'info',
        module: 3,
        title: 'Post-Obstruction Care',
        body: '**Obstruction cleared - next steps:**\n\n**Immediate:**\n- Replace inner cannula (cleaned or new)\n- Confirm ventilation with capnography\n- Humidification to prevent recurrence\n- Document intervention\n\n**Prevention of recurrence:**\n- Regular inner cannula cleaning/replacement\n- Adequate humidification\n- Regular suctioning PRN\n- Hydration\n\n**If recurrent obstructions:**\n- Consider bronchoscopy to evaluate for granulation tissue\n- ENT/pulmonology consult\n- May need tube downsizing or change [2][4][5]',
        citation: [2, 4, 5],
        next: 'trach-disposition-stable',
    },
    {
        id: 'trach-obstruction-refractory',
        type: 'info',
        module: 3,
        title: 'Refractory Obstruction: Rescue Airway',
        body: '**Tube removed but still cannot ventilate - RESCUE AIRWAY**\n\n**If mature stoma (>7 days):**\n1. Insert tracheal dilators to maintain stoma patency\n2. Replace with smaller trach tube or ETT through stoma\n3. Consider fiberoptic guidance\n4. If failure: oral intubation (advance cuff past stoma)\n\n**If fresh stoma (<7 days) - HIGH RISK:**\n1. Do NOT attempt blind reinsertion\n2. Oxygenate via face (BVM, oral intubation)\n3. Occlude stoma during oral ventilation\n4. Call surgeon immediately\n\n**Cannot intubate/cannot oxygenate:**\n- Consider LMA over stoma\n- Emergency front-of-neck access (new cricothyrotomy) [1][2][3]',
        citation: [1, 2, 3],
        next: 'trach-disposition-ent',
    },
    // =====================================================================
    // MODULE 4: DISLODGEMENT
    // =====================================================================
    {
        id: 'trach-dislodge-assess',
        type: 'question',
        module: 4,
        title: 'Dislodgement: Fresh or Mature Trach?',
        body: '**CRITICAL DISTINCTION: Age of tracheostomy**\n\n**Fresh tracheostomy (<7 days):**\n- Tract NOT fully epithelialized\n- HIGH RISK of false passage with blind reinsertion\n- Stoma may close rapidly\n- DO NOT attempt blind replacement\n\n**Mature tracheostomy (>7 days):**\n- Established epithelialized tract\n- Generally safe for bedside replacement\n- May still close over hours if left open\n\n**Risk factors for difficult reinsertion:**\n- Obesity\n- Short/thick neck\n- High ventilatory requirements\n- Agitation\n- Percutaneous (vs surgical) technique [3][4][5]',
        citation: [3, 4, 5],
        options: [
            {
                label: 'Fresh trach (<7 days) - HIGH RISK',
                next: 'trach-fresh-emergency',
                urgency: 'critical',
            },
            {
                label: 'Mature trach (>7 days)',
                next: 'trach-mature-replace',
                urgency: 'urgent',
            },
            {
                label: 'Uncertain age - assume fresh',
                next: 'trach-fresh-emergency',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'trach-fresh-emergency',
        type: 'info',
        module: 4,
        title: 'Fresh Trach (<7 days): DO NOT REPLACE',
        body: '**CRITICAL: Blind reinsertion contraindicated in fresh trach**\n\n**Risks of blind reinsertion:**\n- False passage into pretracheal space\n- Subcutaneous emphysema\n- Pneumomediastinum\n- Complete loss of airway\n- Death\n\n**Immediate management:**\n1. Call for help (anesthesia, ENT, surgery)\n2. Oxygenate via FACE: BVM or oral intubation\n3. Occlude stoma with gauze/finger during face ventilation\n4. Advance ETT cuff PAST stoma level\n5. Keep patient calm, positioned upright if possible\n\n**Definitive management:**\n- Surgeon replacement under direct visualization\n- Fiberoptic guidance through stoma\n- OR for difficult cases [1][2][3][4]',
        citation: [1, 2, 3, 4],
        next: 'trach-disposition-ent',
    },
    {
        id: 'trach-mature-replace',
        type: 'info',
        module: 4,
        title: 'Mature Trach (>7 days): Replacement',
        body: '**Mature stoma replacement - generally safe bedside procedure:**\n\n**Preparation:**\n1. Gather equipment: same size tube + one size smaller, lubricant, suction\n2. Oxygenate patient well before attempt\n3. Position: slight neck extension, shoulder roll\n4. Deflate cuff completely\n\n**Replacement technique:**\n1. Remove old tube gently along curve\n2. Inspect stoma briefly\n3. Lubricate new tube\n4. Insert along natural tract angle (posterior then inferior)\n5. Inflate cuff, confirm placement with capnography\n6. Secure with ties\n\n**If difficulty:**\n- Use tracheal dilators to open stoma\n- Try one size smaller tube\n- Consider bougie or fiberoptic guidance\n- DO NOT force - may create false passage [2][4][5]',
        citation: [2, 4, 5],
        next: 'trach-confirm-placement',
    },
    {
        id: 'trach-confirm-placement',
        type: 'info',
        module: 4,
        title: 'Confirm Trach Placement',
        body: '**ALWAYS confirm proper placement after replacement:**\n\n**Clinical confirmation:**\n- Capnography waveform (GOLD STANDARD)\n- Suction catheter passes easily past tube tip\n- Bilateral chest rise with ventilation\n- Bilateral breath sounds\n\n**DO NOT rely solely on:**\n- Misting in tube (can occur with false passage)\n- Patient phonation\n- Oxygen saturation (delayed indicator)\n\n**If uncertain placement:**\n- Do NOT inflate cuff\n- Oxygenate via face while reassessing\n- Consider fiberoptic through tube to visualize tracheal rings\n- Low threshold for oral intubation if any doubt\n\n**False passage signs:**\n- Increasing resistance to ventilation\n- Subcutaneous emphysema\n- No capnography waveform [1][2][4]',
        citation: [1, 2, 4],
        next: 'trach-disposition-stable',
    },
    // =====================================================================
    // MODULE 5: BLEEDING
    // =====================================================================
    {
        id: 'trach-bleeding-start',
        type: 'question',
        module: 5,
        title: 'Bleeding: Timing & Severity',
        body: '**Tracheostomy bleeding - assess timing and severity:**\n\n**Early bleeding (<48 hours post-op):**\n- Usually minor: skin edges, granulation\n- Related to suctioning, manipulation\n- Rarely life-threatening\n\n**Late bleeding (>72 hours, especially 7-14 days):**\n- **HIGH RISK for tracheo-innominate fistula (TIF)**\n- Innominate artery erosion - mortality approaches 50%\n- Any late bleeding may be "sentinel bleed" before massive hemorrhage\n\n**Sentinel bleed:**\n- Small self-limited bleed preceding massive hemorrhage (up to 50% of TIF cases)\n- **TREAT ANY LATE BLEEDING AS POTENTIAL TIF** [4][6][7][8]',
        citation: [4, 6, 7, 8],
        calculatorLinks: [
            { id: 'trach-bleeding', label: 'Bleeding Risk Assessment' },
        ],
        options: [
            {
                label: 'Minor oozing, stable patient',
                next: 'trach-bleeding-minor',
            },
            {
                label: 'Moderate bleeding, 7-21 days post-trach',
                next: 'trach-bleeding-tif-concern',
                urgency: 'critical',
            },
            {
                label: 'Massive hemorrhage',
                next: 'trach-bleeding-massive',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'trach-bleeding-minor',
        type: 'info',
        module: 5,
        title: 'Minor Bleeding Management',
        body: '**Minor trach site bleeding:**\n\n**Immediate actions:**\n- Suction to clear blood from airway\n- Direct pressure to stoma site\n- Inspect for obvious source (granulation, skin edge)\n\n**Local hemostasis:**\n- Topical epinephrine (1:1000 on gauze)\n- Hemostatic agents (Surgicel, gelfoam)\n- Silver nitrate cautery for granulation tissue\n- Tranexamic acid-soaked gauze\n\n**Systemic considerations:**\n- Check coagulation (PT/INR, platelets)\n- Hold/reverse anticoagulation if safe\n- Correct coagulopathy\n\n**If bleeding persists:**\n- ENT consultation\n- May need stoma exploration\n- Consider bronchoscopy to evaluate internal source [4][6][7]',
        citation: [4, 6, 7],
        next: 'trach-disposition-stable',
    },
    {
        id: 'trach-bleeding-tif-concern',
        type: 'info',
        module: 5,
        title: 'Tracheo-Innominate Fistula Concern',
        body: '**Tracheo-innominate fistula (TIF) - LIFE-THREATENING**\n\n**Risk factors:**\n- Trach placement 7-21 days ago (peak incidence)\n- Low stoma site (below 4th tracheal ring)\n- High cuff pressure\n- Excessive tube movement\n- Prior radiation\n\n**ANY bleeding 7+ days post-trach = sentinel bleed until proven otherwise**\n\n**Immediate actions:**\n1. Call for HELP (vascular surgery, ENT, OR team)\n2. Type and crossmatch, prepare for massive transfusion\n3. Large bore IV access x2\n4. Prepare for cuff hyperinflation\n5. DO NOT remove tracheostomy tube\n\n**Prepare for hemorrhage control** - escalate if bleeding worsens. [4][6][7][8]',
        citation: [4, 6, 7, 8],
        next: 'trach-bleeding-massive',
    },
    {
        id: 'trach-bleeding-massive',
        type: 'info',
        module: 5,
        title: 'Massive Trach Hemorrhage',
        body: '**MASSIVE HEMORRHAGE - TIF protocol:**\n\n**Step 1: Hyperinflate the cuff**\n- Inject 50 mL air into cuff (adult)\n- Creates tamponade against innominate artery\n- If uncuffed tube: replace with cuffed ETT\n\n**Step 2: If cuff hyperinflation fails - UTLEY MANEUVER**\n- Insert finger into tracheostomy stoma\n- Apply digital compression of innominate artery against posterior sternum\n- Maintain pressure until OR\n\n**Step 3: Resuscitate**\n- Activate massive transfusion protocol\n- Reverse anticoagulation\n- Aggressive suctioning of blood\n\n**Definitive treatment:**\n- Emergency OR for median sternotomy\n- Innominate artery ligation and resection\n- Cardiothoracic surgery consultation STAT\n\n**Do NOT attempt interventional radiology - mortality too high.** [4][6][7][8]',
        citation: [4, 6, 7, 8],
        next: 'trach-disposition-ent',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'trach-fresh-vs-mature',
        type: 'question',
        module: 6,
        title: 'Fresh vs Mature: Management Path',
        body: '**Determining stoma maturity:**\n\n**Fresh (<7 days):**\n- Recently placed\n- May have stay sutures\n- Tract not epithelialized\n- Document in chart: "FRESH TRACH - NO BLIND REINSERTION"\n\n**Mature (>7 days):**\n- Established tract\n- Healed stoma edges\n- Generally safe for bedside exchange\n\n**Special cases:**\n- 7-14 days: "Intermediate" - use caution, consider fiberoptic\n- Difficult anatomy: treat as fresh regardless of timing\n- Percutaneous trach: may take longer to mature [3][4][5]',
        citation: [3, 4, 5],
        options: [
            {
                label: 'Fresh trach - need specialist',
                next: 'trach-fresh-emergency',
                urgency: 'critical',
            },
            {
                label: 'Mature trach - can replace',
                next: 'trach-mature-replace',
            },
        ],
    },
    {
        id: 'trach-disposition-stable',
        type: 'result',
        module: 6,
        title: 'Stable After Intervention',
        body: '**Patient stable after tracheostomy emergency:**\n\n**Documentation:**\n- Detailed description of event and interventions\n- Current tube type, size, brand\n- Stoma age and maturity\n- Confirmation of placement (capnography)\n\n**Orders:**\n- Bedside emergency equipment check\n- Appropriate monitoring (SpO2, capnography if indicated)\n- Humidification\n- Suction PRN\n\n**Consults:**\n- ENT/surgery if any concerns\n- Respiratory therapy for trach care education\n- Speech therapy if appropriate\n\n**Disposition:**\n- Most can remain at current level of care\n- Consider ICU if recurrent events or high-risk features [2][4][5]',
        recommendation: 'Stable after tracheostomy emergency. Ensure bedside equipment, appropriate monitoring, and document intervention thoroughly.',
        confidence: 'recommended',
        citation: [2, 4, 5],
    },
    {
        id: 'trach-disposition-ent',
        type: 'result',
        module: 6,
        title: 'ENT/Surgical Consultation Required',
        body: '**Indications for urgent ENT/surgical consultation:**\n\n**Absolute:**\n- Fresh trach dislodgement\n- Bleeding concerning for TIF\n- Failed bedside replacement\n- Suspected false passage\n- Laryngectomy emergency\n\n**Relative:**\n- Recurrent obstruction\n- Difficult anatomy\n- Need for trach change to different type/size\n- Granulation tissue causing symptoms\n\n**Information for consultant:**\n- Original indication for tracheostomy\n- Placement date and technique (surgical vs percutaneous)\n- Current tube type, size, brand\n- Description of emergency and interventions\n- Current airway status and ventilator settings [1][2][3][4]',
        recommendation: 'ENT/surgical consultation required for specialist management. Stabilize airway while awaiting consultation.',
        confidence: 'recommended',
        citation: [1, 2, 3, 4],
    },
    {
        id: 'trach-oxygenation-strategies',
        type: 'info',
        module: 1,
        title: 'Dual Oxygenation Strategy',
        body: '**EMCrit "Double-bagging" approach:**\n\n**Apply oxygen to BOTH sites simultaneously:**\n1. Non-rebreather or BVM to face\n2. Tracheostomy collar or pediatric face mask to stoma\n\n**When ventilating via face:**\n- Occlude stoma with gauze or finger\n- Prevents air leak through stoma\n- May need to deflate trach cuff\n\n**When ventilating via stoma:**\n- Occlude nose and mouth\n- Or use tracheostomy BVM adapter\n- Pediatric face mask works well over stoma\n\n**LMA options:**\n- Standard LMA over face for upper airway\n- LMA over stoma can provide rescue ventilation\n\n**CAUTION:** If trach in false passage, BVM through tube may insufflate mediastinum. [1][2][3]',
        citation: [1, 2, 3],
        next: 'trach-assessment',
    },
    {
        id: 'trach-oral-intubation',
        type: 'info',
        module: 4,
        title: 'Oral Intubation with Tracheostomy',
        body: '**When to intubate orally:**\n- Fresh trach dislodgement (< 7 days)\n- Failed stoma replacement\n- Cannot ventilate through stoma\n- Upper airway confirmed patent\n\n**Technique:**\n1. Standard oral intubation approach\n2. Use UNCUT endotracheal tube\n3. Advance cuff PAST the tracheostomy stoma level\n4. Confirm placement with capnography\n5. Occlude stoma to prevent air leak\n\n**Considerations:**\n- May need to deflate trach cuff if still in place\n- Stoma may continue to leak air\n- Apply occlusive dressing to stoma\n- Do NOT remove trach tube unless causing obstruction\n\n**After stabilization:** Surgeon should evaluate stoma and replace trach under controlled conditions. [1][2][3][4]',
        citation: [1, 2, 3, 4],
        next: 'trach-disposition-ent',
    },
    {
        id: 'trach-granulation',
        type: 'info',
        module: 3,
        title: 'Granulation Tissue',
        body: '**Granulation tissue formation:**\n\n**Causes:**\n- Tube friction against tracheal wall\n- Fenestrated tubes (tissue grows through holes)\n- Chronic irritation\n- Infection\n- High cuff pressure\n\n**Presentation:**\n- Recurrent obstruction\n- Bleeding with suctioning\n- Difficulty passing suction catheter\n- Stridor after tube removal\n\n**Management:**\n- Bronchoscopy for diagnosis and treatment\n- Silver nitrate cautery\n- Laser ablation\n- Consider tube change (non-fenestrated, different size)\n- May require surgical resection\n\n**Prevention:**\n- Proper tube fit\n- Low cuff pressure (<25 cmH2O)\n- Minimize tube manipulation [4][5][9]',
        citation: [4, 5, 9],
        next: 'trach-disposition-ent',
    },
    {
        id: 'trach-stenosis',
        type: 'info',
        module: 3,
        title: 'Tracheal Stenosis',
        body: '**Post-tracheostomy tracheal stenosis (PTTS):**\n\n**Incidence:** 3-12% develop clinically significant stenosis\n\n**Causes:**\n- High cuff pressure (most common)\n- Infection\n- Excessive tube movement\n- Prolonged intubation before trach\n- Low trach placement\n\n**Presentation:**\n- Failure to wean from ventilator\n- High peak airway pressures\n- Difficulty passing suction catheter\n- Stridor after decannulation\n- Dyspnea on exertion\n\n**Diagnosis:**\n- Bronchoscopy (gold standard)\n- CT neck/chest with 3D reconstruction\n\n**Management:**\n- Dilation (balloon or rigid)\n- Stenting\n- Surgical resection and anastomosis\n- T-tube placement [4][5][9][10]',
        citation: [4, 5, 9, 10],
        next: 'trach-disposition-ent',
    },
];
export const TRACH_EMERGENCY_MODULE_LABELS = [
    'Emergency Algorithm',
    'Tracheostomy Types',
    'Obstruction Management',
    'Dislodgement',
    'Bleeding',
    'Disposition',
];
export const TRACH_EMERGENCY_CITATIONS = [
    { num: 1, text: 'McGrath BA, Bates L, Atkinson D, Moore JA. Multidisciplinary guidelines for the management of tracheostomy and laryngectomy airway emergencies. Anaesthesia. 2012;67(9):1025-1041.' },
    { num: 2, text: 'National Tracheostomy Safety Project. Emergency Tracheostomy Management Algorithm. tracheostomy.org.uk. Accessed 2026.' },
    { num: 3, text: 'Weingart SD. EMCrit 195 - Management of Tracheostomy and Laryngectomy Emergencies. EMCrit. 2017 (Updated 2025).' },
    { num: 4, text: 'Mitchell RB, et al. Critical Care Device Series: Tracheostomy Complications and Troubleshooting in the ED. EMRA. 2023.' },
    { num: 5, text: 'Cheung NH, Napolitano LM. Tracheostomy: Epidemiology, Indications, Timing, Technique, and Outcomes. Respir Care. 2014;59(6):895-919.' },
    { num: 6, text: 'Nickson C. Bleeding Tracheostomy. Life in the Fast Lane (LITFL). 2020.' },
    { num: 7, text: 'Allan JS, Wright CD. Tracheoinnominate fistula: diagnosis and management. Chest Surg Clin N Am. 2003;13(2):331-341.' },
    { num: 8, text: 'Ailawadi G. Technique for managing tracheo-innominate artery fistula. Oper Tech Thorac Cardiovasc Surg. 2009;14(1):66-72.' },
    { num: 9, text: 'Epstein SK. Late complications of tracheostomy. Respir Care. 2005;50(4):542-549.' },
    { num: 10, text: 'Fraga JC, Souza JC, Kruel J. Pediatric tracheostomy. J Pediatr (Rio J). 2009;85(2):97-103.' },
    { num: 11, text: 'Difficult Airway Society. Tracheostomy Emergency Guidelines. das.uk.com. 2025.' },
    { num: 12, text: 'ACEP Now. Tracheostomy Complications and the Emergency Setting. acepnow.com. 2024.' },
];
