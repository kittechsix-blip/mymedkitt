// MedKitt — Tracheo-Innominate Fistula (TIF)
// Recognition → Hyperinflate Cuff → Finger Tamponade → Surgical Alert → Stabilize
// 5 modules: Recognize Sentinel Bleed → Hyperinflate Cuff → Finger Tamponade → Surgical Alert → Stabilize
// 22 nodes total.
export const TRACHEO_INNOMINATE_FISTULA_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNIZE SENTINEL BLEED
    // =====================================================================
    {
        id: 'tif-start',
        type: 'info',
        module: 1,
        title: 'Tracheo-Innominate Fistula',
        body: '[TIF Steps Summary](#/info/tif-steps)\n\n**Tracheo-Innominate Fistula (TIF)** is a catastrophic complication of tracheostomy with near-100% mortality without intervention and 50-70% mortality even with surgery. [1][2]\n\n**Key Principle:** Massive hemorrhage occurring 3 days to 6 weeks after tracheostomy is **TIF until proven otherwise**. [1][3]\n\n**Incidence:** 0.1-1% of tracheostomies; accounts for ~10% of significant tracheostomy bleeds. [2]\n\n**This consult covers:**\n- Recognizing the sentinel bleed (warning sign)\n- Cuff hyperinflation technique\n- Finger tamponade (Utley maneuver)\n- Surgical activation\n- Stabilization and airway management\n\n**Time is critical.** A sentinel bleed precedes massive hemorrhage by only 24-48 hours. [1][4]',
        citation: [1, 2, 3, 4],
        next: 'tif-timing-check',
    },
    {
        id: 'tif-timing-check',
        type: 'question',
        module: 1,
        title: 'Timing of Bleeding',
        body: '**The timing of tracheostomy bleeding is critical for risk stratification.** [1][2]\n\n**TIF time window:** 3 days to 6 weeks post-tracheostomy\n- Peak incidence: 7-14 days (first 3 weeks = 72% of cases)\n- Minimum development time: 48 hours post-procedure\n- Late presentations (>1 year) documented but rare\n\n**Early bleeding (<72 hours):** Usually benign [5]\n- Suctioning trauma\n- Manipulation injury\n- Surgical site tracking\n- Coagulopathy\n\n**Late bleeding (>72 hours):** More concerning [5]\n- Granulation tissue\n- Stoma infection\n- Tracheitis\n- **TIF (3 days to 6 weeks)**\n\nWhen was the tracheostomy placed?',
        citation: [1, 2, 5],
        options: [
            {
                label: '3 Days to 6 Weeks Ago',
                description: 'HIGH RISK for TIF - proceed with TIF protocol',
                next: 'tif-sentinel-bleed',
                urgency: 'critical',
            },
            {
                label: '< 72 Hours Ago',
                description: 'Lower risk - likely benign cause, but evaluate carefully',
                next: 'tif-early-bleeding',
            },
            {
                label: '> 6 Weeks Ago',
                description: 'Lower risk but TIF still possible - evaluate based on bleeding characteristics',
                next: 'tif-late-bleeding',
            },
        ],
    },
    {
        id: 'tif-early-bleeding',
        type: 'info',
        module: 1,
        title: 'Early Bleeding (<72h)',
        body: '**Early bleeding is usually benign but warrants evaluation.** [5]\n\n**Common causes:**\n- Suctioning trauma\n- Manipulation/movement\n- Surgical site oozing\n- Coagulopathy\n- Granulation tissue (forming)\n\n**Management:**\n- Gentle suctioning to assess source\n- Check coagulation studies\n- Evaluate for proper tube positioning\n- Local hemostatic measures\n- Optimize cuff pressure (20-25 cm H2O)\n\n**Red flags requiring escalation:**\n- Arterial-appearing blood\n- Pulsatile bleeding\n- Large volume (>50 mL)\n- Not responding to conservative measures\n\n**If concerning features present** or bleeding is significant, proceed with TIF workup despite early timing.',
        citation: [5],
        next: 'tif-sentinel-bleed',
    },
    {
        id: 'tif-late-bleeding',
        type: 'info',
        module: 1,
        title: 'Late Bleeding (>6 Weeks)',
        body: '**Late bleeding is less commonly TIF but still possible.** [2]\n\n**Common causes:**\n- Granulation tissue (most common)\n- Stoma infection\n- Tracheitis\n- Mucosal erosion\n- Malignancy (rare)\n\n**Late TIF still occurs:**\n- Case reports of TIF >1 year post-tracheostomy\n- Risk factors: high cuff pressure, chronic inflammation\n\n**Evaluate based on bleeding characteristics:**\n\n**Low concern (granulation tissue):**\n- Small volume, venous-appearing\n- Associated with tube changes/suctioning\n- Self-limited\n\n**High concern (possible TIF):**\n- Arterial-appearing, pulsatile\n- Large volume\n- Tube pulsating with heartbeat\n\n**If ANY high-concern features** present, proceed with full TIF protocol.',
        citation: [2],
        next: 'tif-sentinel-bleed',
    },
    {
        id: 'tif-sentinel-bleed',
        type: 'question',
        module: 1,
        title: 'Sentinel Bleed Recognition',
        body: '**The sentinel bleed is your warning sign.** [1][4]\n\n**Definition:** A brief, self-limited hemorrhage that spontaneously stops - preceding catastrophic massive hemorrhage by 24-48 hours.\n\n**Key statistics:** [4]\n- 50% of TIF patients have sentinel bleed before massive hemorrhage\n- Only 35% exhibit the "pathognomonic triad"\n\n**Pathognomonic triad:** [1]\n1. Sentinel bleeding (small bleed that stops)\n2. Pulsations of tracheostomy tube coinciding with heartbeat\n3. Tracheostomy site bleeding\n\n**Red flags for TIF:** [1][3]\n- Pulsatile bleeding\n- Arterial-appearing blood (bright red)\n- Tube pulsating with heartbeat\n- ANY bleeding in 3-day to 6-week window\n\n**Diagnostic limitation:** CTA, bronchoscopy, and angiography combined have only **20-30% sensitivity**. Diagnosis is clinical. [3]\n\nWhat is the current bleeding status?',
        citation: [1, 3, 4],
        options: [
            {
                label: 'Active Massive Hemorrhage',
                description: 'Large volume, ongoing arterial bleeding',
                next: 'tif-hyperinflate',
                urgency: 'critical',
            },
            {
                label: 'Sentinel Bleed (Small, Self-Limited)',
                description: 'Brief bleed that stopped - CRITICAL: massive hemorrhage may follow',
                next: 'tif-sentinel-management',
                urgency: 'urgent',
            },
            {
                label: 'Minor Bleeding, Low Concern',
                description: 'Small volume, venous, self-limited, no red flags',
                next: 'tif-low-risk',
            },
        ],
    },
    {
        id: 'tif-sentinel-management',
        type: 'info',
        module: 1,
        title: 'Sentinel Bleed Management',
        body: '**A sentinel bleed is NOT reassuring - it is a WARNING.** [1][4]\n\n**Sentinel bleed = imminent massive hemorrhage within 24-48 hours.** [4]\n\n**IMMEDIATE actions:**\n1. **Call surgery STAT** (CT surgery/vascular/trauma)\n2. **Activate MTP** - have blood at bedside\n3. **Type and crossmatch** - anticipate massive transfusion\n4. **Keep patient NPO** - prepare for emergent OR\n5. **Do NOT send for imaging** if it delays surgical consultation\n\n**Monitoring:**\n- Continuous observation\n- Frequent vital signs\n- Large-bore IV access x2\n- Equipment at bedside: suction, oral ETT, extra trach\n\n**2024 data:** Sentinel bleed presentation = 50% mortality vs 75% without warning (p=0.005). [4]\n\n**Pearl:** The sentinel bleed gives you a narrow window to prepare for massive hemorrhage. Use it wisely.',
        citation: [1, 4],
        next: 'tif-hyperinflate',
    },
    {
        id: 'tif-low-risk',
        type: 'result',
        module: 1,
        title: 'Lower Risk Bleeding',
        body: '**If bleeding is truly low-risk, conservative management may be appropriate.** [5]\n\n**Low-risk features:**\n- Small volume (<10 mL)\n- Venous-appearing (dark)\n- Associated with manipulation/suctioning\n- Self-limited and non-recurrent\n- No pulsatile component\n- Tube NOT pulsating with heartbeat\n\n**Management:**\n- Gentle suctioning\n- Check cuff pressure (20-25 cm H2O)\n- Humidification optimization\n- Evaluate for infection, granulation tissue\n- Consider ENT consultation\n\n**HOWEVER - maintain vigilance:**\n- Monitor closely for 48 hours minimum\n- Return precautions to nursing/caregivers\n- Lower threshold to escalate if recurs\n- Any change in character = re-evaluate for TIF\n\n**When in doubt, treat as TIF.**',
        recommendation: 'Conservative management appropriate if truly low-risk. Monitor closely for 48 hours. Any recurrence or change in bleeding character warrants immediate TIF workup.',
        confidence: 'consider',
        citation: [5],
    },
    // =====================================================================
    // MODULE 2: HYPERINFLATE CUFF
    // =====================================================================
    {
        id: 'tif-hyperinflate',
        type: 'info',
        module: 2,
        title: 'Hyperinflate Cuff - First Maneuver',
        body: '**Cuff hyperinflation is the FIRST-LINE maneuver for TIF bleeding.** [1][6]\n\n**Technique:**\n1. **Slowly add air** to the tracheostomy cuff balloon\n2. **Target:** ~50 mL total volume (much higher than normal)\n3. **Goal:** Tamponade the bleeding vessel by compressing against tracheal wall\n\n**Success rate: 85%** [6]\n\n**2024 data:** Cuff overinflation reduced mortality from 80% to 52.2% (p<0.001). [4]\n\n**Critical points:**\n- This is a **temporizing measure only**\n- Even successful tamponade can fail with tube movement\n- Continue to prepare for OR\n- Surgery is still required for definitive management\n\n**While hyperinflating:**\n- Call surgery if not already done\n- Activate MTP\n- Prepare finger tamponade equipment\n- Set up for oral intubation',
        citation: [1, 4, 6],
        images: [
            {
                src: 'images/tracheo-innominate-fistula/cuff-hyperinflation.png',
                alt: 'Cuff hyperinflation technique showing tracheostomy cuff inflated to tamponade the innominate artery against the tracheal wall',
                caption: 'Cuff hyperinflation: inflate cuff with ~50 mL air to tamponade the innominate artery.',
            },
        ],
        next: 'tif-hyperinflate-result',
    },
    {
        id: 'tif-hyperinflate-result',
        type: 'question',
        module: 2,
        title: 'Cuff Hyperinflation Result',
        body: '**Assess response to cuff hyperinflation.** [1][6]\n\n**Monitor for:**\n- Cessation of bleeding\n- Reduction in bleeding volume\n- Blood in suction catheter\n\n**If bleeding continues:**\n- Fistula may be **proximal to the cuff**\n- Cuff may not be achieving adequate tamponade\n- Proceed to finger tamponade (Utley maneuver)\n\n**If bleeding stops:**\n- **DO NOT relax vigilance**\n- **DO NOT move the tube**\n- Maintain cuff inflation\n- Continue to OR for definitive surgery\n\n**Pearl:** The tube is your friend. Do NOT remove unless proceeding to finger tamponade.\n\nDid cuff hyperinflation control the bleeding?',
        citation: [1, 6],
        options: [
            {
                label: 'Yes - Bleeding Controlled',
                description: 'Maintain cuff inflation, continue to OR',
                next: 'tif-cuff-success',
            },
            {
                label: 'No - Bleeding Continues',
                description: 'Proceed to finger tamponade (Utley maneuver)',
                next: 'tif-finger-tamponade',
                urgency: 'critical',
            },
            {
                label: 'Partial - Bleeding Reduced',
                description: 'Consider adding ETT, prepare for finger tamponade',
                next: 'tif-partial-control',
            },
        ],
    },
    {
        id: 'tif-cuff-success',
        type: 'info',
        module: 2,
        title: 'Cuff Hyperinflation Successful',
        body: '**Bleeding controlled - but this is NOT definitive treatment.** [1][6]\n\n**Maintain strict precautions:**\n\n**DO:**\n- Keep cuff hyperinflated\n- Keep patient completely still\n- Continue surgical preparation\n- Maintain MTP activation\n- Have finger tamponade equipment ready\n- Keep oral ETT at bedside\n\n**DO NOT:**\n- Move the tracheostomy tube\n- Deflate the cuff\n- Suction through the trach\n- Send patient for imaging\n- Delay surgical consultation\n\n**Remember:** Even successful tamponade can fail with slight tube movement. Re-bleeding can occur at any moment.\n\n**Proceed to OR** for definitive surgical management.',
        citation: [1, 6],
        next: 'tif-surgical-alert',
    },
    {
        id: 'tif-partial-control',
        type: 'info',
        module: 2,
        title: 'Partial Bleeding Control',
        body: '**If bleeding is reduced but not stopped:** [1][6]\n\n**Option 1 - Add oral ETT:**\n1. Have assistant continue to add air to trach cuff\n2. Perform oral intubation with DEEP advancement\n3. ETT cuff should be 2 cm past the stoma site\n4. Inflate ETT cuff for additional tamponade\n5. This provides backup airway if trach fails\n\n**Option 2 - Replace trach with cuffed ETT through stoma:**\n1. Remove tracheostomy tube\n2. Insert cuffed ETT through stoma\n3. Advance distal to bleeding site\n4. Inflate cuff for tamponade\n\n**If bleeding continues despite these measures:**\n- Proceed immediately to finger tamponade (Utley maneuver)\n- This is a time-critical decision\n\n**Do not delay** if patient is deteriorating.',
        citation: [1, 6],
        next: 'tif-finger-tamponade',
    },
    // =====================================================================
    // MODULE 3: FINGER TAMPONADE (UTLEY MANEUVER)
    // =====================================================================
    {
        id: 'tif-finger-tamponade',
        type: 'info',
        module: 3,
        title: 'Finger Tamponade - Utley Maneuver',
        body: '**The Utley maneuver is THE lifesaving bedside intervention when cuff hyperinflation fails.** [1][7]\n\n**Success rate: >80%** for controlling hemorrhage via direct tamponade. [7]\n\n**CRITICAL RULE:** The provider who performs this maneuver **MUST NOT MOVE THEIR FINGER until the patient is in the OR under surgical care.** [1][7]\n\n**You will be physically attached to this patient during transport to OR.**\n\n**Before starting:**\n1. Ensure airway backup plan (oral ETT ready)\n2. Have surgical team en route\n3. Blood products running or ready\n4. OR notified and preparing\n5. Transport team assembled',
        citation: [1, 7],
        images: [
            {
                src: 'images/tracheo-innominate-fistula/utley-maneuver.png',
                alt: 'Utley maneuver technique showing finger inserted through tracheostomy stoma compressing the innominate artery against the posterior sternum',
                caption: 'Utley maneuver: finger through stoma compresses innominate artery against sternum.',
            },
        ],
        next: 'tif-utley-technique',
    },
    {
        id: 'tif-utley-technique',
        type: 'info',
        module: 3,
        title: 'Utley Maneuver - Step by Step',
        body: '**Finger Tamponade Technique:** [1][7]\n\n**Step 1 - Secure Airway:**\n- Deflate tracheostomy cuff\n- Insert cuffed oral ETT **deep** (cuff 2 cm past stoma)\n- Inflate ETT cuff\n- Confirm ventilation\n\n**Step 2 - Remove Tracheostomy:**\n- With airway secured, remove tracheostomy tube\n- May need to **extend stoma incision vertically** for access\n\n**Step 3 - Insert Finger:**\n- Insert index finger through stoma into **pretracheal space**\n- Use blunt dissection to create space if needed\n- Advance finger anteriorly\n\n**Step 4 - Compress Artery:**\n- Compress innominate artery **anteriorly against posterior sternum/manubrium**\n- Apply firm, steady pressure\n\n**Step 5 - External Counter-Pressure:**\n- Place thumb in sternal notch\n- "Pinch" the artery between finger and thumb\n\n**Step 6 - MAINTAIN PRESSURE:**\n- Do NOT release until patient is in OR under surgical care\n- You are now attached to this patient',
        citation: [1, 7],
        images: [
            {
                src: 'images/tracheo-innominate-fistula/utley-maneuver.png',
                alt: 'Utley maneuver step-by-step showing finger through stoma compressing the innominate artery against the posterior sternum',
                caption: 'Utley maneuver: finger through stoma, compress artery anteriorly against sternum.',
            },
        ],
        next: 'tif-utley-considerations',
    },
    {
        id: 'tif-utley-considerations',
        type: 'info',
        module: 3,
        title: 'Utley Maneuver Considerations',
        body: '**Practical considerations for finger tamponade:** [1][7]\n\n**Anatomic orientation:**\n- Innominate artery crosses anterior to trachea\n- Usually at rings 6-9, but can be higher (high-riding variant)\n- Your finger compresses artery between itself and sternum\n\n**Stoma too small?**\n- Extend incision inferiorly with scalpel\n- Blunt dissection of pretracheal space\n- You need enough room to maneuver\n\n**Alternative if cannot access pretracheal space:**\n- Apply **external pressure at sternal notch**\n- Less effective but may temporize\n\n**During transport to OR:**\n- Maintain continuous pressure\n- Keep patient supine\n- IV access must be secure\n- Blood products running\n- Clear path to OR\n\n**Communication:**\n- OR must know you are physically attached to patient\n- Surgical team must be ready to take over immediately\n- Anesthesia aware of airway situation',
        citation: [1, 7],
        next: 'tif-surgical-alert',
    },
    // =====================================================================
    // MODULE 4: SURGICAL ALERT
    // =====================================================================
    {
        id: 'tif-surgical-alert',
        type: 'info',
        module: 4,
        title: 'Surgical Activation',
        body: '**TIF is a SURGICAL EMERGENCY.** [1][2][8]\n\n**Mortality without surgery: ~100%** [2]\n**Mortality with surgery: 50-70%** (but survival is possible) [4]\n\n**Call IMMEDIATELY:**\n- CT surgery / Cardiothoracic surgery\n- Vascular surgery\n- Trauma surgery (depending on institution)\n- Anesthesia\n- OR charge nurse\n\n**Information for surgical team:**\n- Time of tracheostomy placement\n- Current bleeding status\n- Interventions performed (cuff, finger tamponade)\n- Blood products given/running\n- Current airway status\n- Patient stability\n\n**OR preparation:**\n- Sternotomy tray\n- Vascular instruments\n- Cell saver if available\n- Blood products in room\n- Perfusion on standby',
        citation: [1, 2, 4, 8],
        next: 'tif-surgical-options',
    },
    {
        id: 'tif-surgical-options',
        type: 'info',
        module: 4,
        title: 'Surgical Management Options',
        body: '**Definitive surgical management:** [2][8]\n\n**Standard approach - Median sternotomy:**\n1. Median sternotomy (or collar + partial upper sternotomy)\n2. Identify innominate artery and fistula\n3. **Ligate AND divide** innominate artery proximal and distal to fistula\n4. Cover tracheal defect with muscle flap (usually pectoralis major)\n\n**CRITICAL:** Ligation WITHOUT division is **contraindicated** - artery can re-fistulize. [8]\n\n**Endovascular option (emerging):** [4]\n- Stent-graft placement across fistula\n- 2024 data: Equivalent mortality to open surgery (48.6% both)\n- Lower complication rate (30% vs 50%, p=0.045)\n- May temporize unstable patients before open repair\n- Occlusion balloon can buy time for resuscitation\n\n**Neurological risk of innominate ligation:** [8]\n- Up to 10% incidence of right-sided neurological deficit\n- Dependent on Circle of Willis retrograde flow\n- Vigilant postoperative neuro monitoring required',
        citation: [2, 4, 8],
        next: 'tif-stabilize',
    },
    // =====================================================================
    // MODULE 5: STABILIZE
    // =====================================================================
    {
        id: 'tif-stabilize',
        type: 'info',
        module: 5,
        title: 'Stabilization',
        body: '**Resuscitation while preparing for OR:** [1][3]\n\n**Massive Transfusion Protocol:**\n- Activate immediately\n- Blood products at bedside\n- Anticipate massive blood loss (liters)\n- 1:1:1 ratio PRBCs:FFP:Platelets\n\n**IV Access:**\n- Large-bore IV x2 minimum\n- Consider central line if time permits\n- Rapid infuser ready\n\n**Airway Management:**\n- If trach in place with controlled bleeding: leave it\n- If finger tamponade: oral ETT already placed\n- Always have backup airway plan\n\n**Medications:**\n- Resuscitative medications ready\n- TXA if institutional protocol\n- Vasopressors if needed for blood pressure\n\n**Team:**\n- Multiple providers needed simultaneously\n- Airway control AND hemorrhage control\n- Respiratory therapy\n- Blood bank liaison',
        citation: [1, 3],
        next: 'tif-donts',
    },
    {
        id: 'tif-donts',
        type: 'info',
        module: 5,
        title: 'Critical DO NOTs',
        body: '**Actions that can be FATAL in TIF:** [1][3]\n\n**DO NOT:**\n\n1. **Remove the tracheostomy tube** unless proceeding to finger tamponade\n   - The tube provides tamponade and airway\n\n2. **Delay for imaging** if clinical suspicion is high\n   - CTA/bronchoscopy only 20-30% sensitive\n   - Clinical diagnosis is sufficient\n\n3. **Attempt ligation without division**\n   - Artery can re-fistulize\n   - Must ligate AND divide\n\n4. **Suction aggressively** through trach during active bleeding\n   - May dislodge clot\n   - May worsen bleeding\n\n5. **Move the patient unnecessarily**\n   - Especially with cuff tamponade\n   - Direct transport to OR only\n\n6. **Release finger tamponade** before surgical takeover\n   - You are committed once you start\n   - Maintain until surgeon is ready',
        citation: [1, 3],
        next: 'tif-disposition',
    },
    {
        id: 'tif-disposition',
        type: 'result',
        module: 5,
        title: 'Disposition',
        body: '**All TIF patients go directly to OR.** [1][2]\n\n**There is no observation period for suspected TIF.**\n\n**Disposition pathway:**\n1. ED/ICU recognition\n2. Immediate hemorrhage control (cuff/finger tamponade)\n3. Surgical activation\n4. Direct transport to OR\n5. Postoperative ICU\n\n**Postoperative considerations:** [8]\n- ICU admission mandatory\n- Vigilant neuro monitoring (right-sided deficits possible)\n- Airway management (likely still intubated)\n- Continue blood product resuscitation\n- Watch for re-bleeding\n\n**Survival:**\n- Only 25-30% of patients who reach OR survive [2]\n- Early recognition and intervention improve outcomes\n- Sentinel bleed mortality 50% vs no warning 75% [4]\n\n**Pearl:** The best outcome in TIF is recognizing the sentinel bleed and getting to OR before massive hemorrhage.',
        recommendation: 'Direct transport to OR for definitive surgical management. Postoperative ICU admission. Monitor for neurological deficits and re-bleeding.',
        confidence: 'definitive',
        citation: [1, 2, 4, 8],
    },
];
export const TRACHEO_INNOMINATE_FISTULA_MODULE_LABELS = [
    'Recognize Sentinel Bleed',
    'Hyperinflate Cuff',
    'Finger Tamponade',
    'Surgical Alert',
    'Stabilize',
];
export const TRACHEO_INNOMINATE_FISTULA_CITATIONS = [
    { num: 1, text: 'ACEP Now. How To Manage Tracheo-Innominate Fistula. acepnow.com' },
    { num: 2, text: 'Allan JS, Wright CD. Tracheoinnominate fistula: diagnosis and management. Chest Surg Clin N Am. 2003;13(2):331-341.' },
    { num: 3, text: 'Jones JW, Reynolds M, Hewitt RL, Drapanas T. Tracheo-innominate artery erosion: successful surgical management. Ann Surg. 1976;184(2):194-204.' },
    { num: 4, text: 'Yang L, et al. Mortality associations in tracheoinnominate fistula: A systematic review. 2024.' },
    { num: 5, text: 'Epstein SK. Late complications of tracheostomy. Respir Care. 2005;50(4):542-549.' },
    { num: 6, text: 'Scalise P, et al. Tracheoinnominate fistula: immediate management. StatPearls. NCBI Bookshelf.' },
    { num: 7, text: 'Utley JR, et al. Definitive management of innominate artery hemorrhage complicating tracheostomy. JAMA. 1972;220(4):577-579.' },
    { num: 8, text: 'Gasparri MG, et al. Tracheoinnominate artery fistula: surgical management. Operative Techniques in Thoracic and Cardiovascular Surgery. 2009.' },
];
export const TRACHEO_INNOMINATE_FISTULA_CRITICAL_ACTIONS = [
    { text: 'Bleeding 3 days to 6 weeks post-tracheostomy = TIF until proven otherwise', nodeId: 'tif-timing-check' },
    { text: 'Sentinel bleed precedes massive hemorrhage by 24-48 hours - ACT IMMEDIATELY', nodeId: 'tif-sentinel-bleed' },
    { text: 'HYPERINFLATE CUFF FIRST - add ~50 mL air, 85% success rate', nodeId: 'tif-hyperinflate' },
    { text: 'If cuff fails: Utley maneuver (finger through stoma, compress artery vs sternum)', nodeId: 'tif-finger-tamponade' },
    { text: 'Once finger tamponade started, DO NOT release until surgeon takes over in OR', nodeId: 'tif-utley-technique' },
    { text: 'DO NOT remove tracheostomy tube unless proceeding to finger tamponade', nodeId: 'tif-donts' },
    { text: 'DO NOT delay treatment for imaging - CTA/bronchoscopy only 20-30% sensitive', nodeId: 'tif-sentinel-bleed' },
    { text: 'Surgical ligation must include DIVISION of artery - ligation alone risks re-fistulization', nodeId: 'tif-surgical-options' },
    { text: 'Call CT surgery/vascular surgery STAT - mortality without surgery approaches 100%', nodeId: 'tif-surgical-alert' },
];
