// MedKitt — Neck Trauma
// ED evaluation and management of penetrating and blunt neck trauma
// Sources: EAST Guidelines 2020, WTA Multicenter Study, AAST
// 6 modules: Primary Survey → Zone Assessment → Hard Signs → Imaging → Airway → Disposition
// ~20 nodes
export const NECK_TRAUMA_NODES = [
    // =====================================================================
    // MODULE 1: PRIMARY SURVEY
    // =====================================================================
    {
        id: 'nt-start',
        type: 'question',
        module: 1,
        title: 'Neck Trauma — ED Evaluation',
        body: '[Steps Summary](#/info/nt-steps)\n\n**Immediate Assessment:**\n1. Airway status — stridor, voice change, dysphagia?\n2. Breathing — expanding hematoma, tracheal deviation?\n3. Circulation — active bleeding, pulse deficit?\n4. Neurologic — lateralizing signs, altered mental status?\n\n**Mechanism:**\n• Penetrating (stab, GSW, impalement)\n• Blunt (MVC, strangulation, sports)\n\n**Critical Question:** Is the patient hemodynamically stable? [1][2]',
        options: [
            { label: 'Unstable — active hemorrhage or airway compromise', description: 'Expanding hematoma, airway obstruction', next: 'nt-unstable', urgency: 'critical' },
            { label: 'Stable — penetrating mechanism', description: 'Stab wound, GSW, impalement', next: 'nt-penetrating' },
            { label: 'Stable — blunt mechanism', description: 'MVC, assault, strangulation', next: 'nt-blunt' },
        ],
        citation: [1, 2],
        calculatorLinks: [
            { id: 'weight-dose', label: 'Weight Calculator' },
        ],
    },
    {
        id: 'nt-unstable',
        type: 'info',
        module: 1,
        title: 'Unstable Neck Trauma — Immediate Action',
        body: '**HARD SIGNS Present — OR Now:**\n\n**Airway:**\n• Secure airway BEFORE CT\n• Awake intubation if possible\n• Prepare for surgical airway\n• Avoid blind nasal attempts\n\n**Hemorrhage Control:**\n• Direct pressure (careful with hematoma)\n• Foley balloon tamponade if wound accessible\n• DO NOT probe wound or remove impaled objects\n\n**Activate:**\n• Trauma surgery STAT\n• Blood bank — consider MTP\n• OR team on standby\n\n**Proceed to OR for:**\n• Uncontrolled hemorrhage\n• Expanding hematoma\n• Airway compromise not controlled\n• Shock despite resuscitation [1][2]',
        next: 'nt-hard-signs',
        citation: [1, 2],
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 2: ZONE ASSESSMENT
    // =====================================================================
    {
        id: 'nt-penetrating',
        type: 'question',
        module: 2,
        title: 'Penetrating Neck Trauma — Zone Assessment',
        body: '**Anatomic Zones of the Neck:**\n\n| Zone | Boundaries | Key Structures |\n|------|------------|----------------|\n| **I** | Clavicles to cricoid | Subclavian vessels, thoracic duct, lung apex, esophagus |\n| **II** | Cricoid to angle of mandible | Carotid, jugular, trachea, esophagus, larynx |\n| **III** | Angle of mandible to skull base | Distal carotid, vertebral arteries, pharynx |\n\n**Zone II:** Most exposed, easiest surgical access\n**Zone I & III:** More difficult exposure, often need angiography\n\n**Modern approach:** CTA for ALL stable penetrating injuries (regardless of zone)\n\n**What zone is the injury?** [1][3]',
        options: [
            { label: 'Zone I (below cricoid)', description: 'Near clavicle/thoracic outlet', next: 'nt-zone1' },
            { label: 'Zone II (cricoid to mandible)', description: 'Mid-neck, most common', next: 'nt-zone2' },
            { label: 'Zone III (above mandible angle)', description: 'High neck near skull base', next: 'nt-zone3' },
            { label: 'Transcervical (crosses midline)', description: 'Highest risk injury', next: 'nt-transcervical', urgency: 'critical' },
        ],
        citation: [1, 3],
    },
    {
        id: 'nt-zone1',
        type: 'info',
        module: 2,
        title: 'Zone I — Thoracic Outlet Injuries',
        body: '**Zone I Concerns:**\n• Subclavian artery/vein injury\n• Thoracic duct (left side)\n• Lung apex — pneumothorax\n• Proximal trachea\n• Proximal esophagus\n• Vertebral artery origin\n\n**Imaging:**\n• CTA neck AND chest (include aortic arch)\n• CXR for pneumothorax/hemothorax\n\n**High index of suspicion for:**\n• Hemothorax (blood in chest, not neck)\n• Brachial plexus injury\n• Venous air embolism\n\n**Surgical access:** Sternotomy or thoracotomy may be needed [3][4]',
        next: 'nt-hard-signs',
        citation: [3, 4],
    },
    {
        id: 'nt-zone2',
        type: 'info',
        module: 2,
        title: 'Zone II — Mid-Neck Injuries',
        body: '**Zone II — Most Common Location:**\n• 50-80% of penetrating neck injuries\n• Most accessible surgically\n\n**Structures at risk:**\n• Carotid artery (common and internal)\n• Internal jugular vein\n• Trachea and larynx\n• Esophagus\n• Vagus nerve\n• Recurrent laryngeal nerve\n\n**Modern Management:**\n• CTA for ALL stable Zone II injuries\n• Replaced mandatory exploration\n• Sensitivity >95% for vascular injury\n\n**Continue to assess for hard signs.** [3][4]',
        next: 'nt-hard-signs',
        citation: [3, 4],
    },
    {
        id: 'nt-zone3',
        type: 'info',
        module: 2,
        title: 'Zone III — High Neck Injuries',
        body: '**Zone III Challenges:**\n• Difficult surgical exposure\n• Proximity to skull base\n• Often requires IR or ENT involvement\n\n**Structures at risk:**\n• Distal internal carotid\n• External carotid branches\n• Vertebral artery (V3 segment)\n• Pharynx\n• CN IX, X, XI, XII\n\n**Imaging:**\n• CTA neck with intracranial runoff\n• Consider 4-vessel angiography\n\n**Management:**\n• Endovascular repair often preferred\n• Open surgery difficult\n• High stroke risk with carotid injuries [3][4]',
        next: 'nt-hard-signs',
        citation: [3, 4],
    },
    {
        id: 'nt-transcervical',
        type: 'info',
        module: 2,
        title: 'Transcervical Injury — Highest Risk',
        body: '**Transcervical (Crosses Midline):**\n• Most dangerous trajectory\n• Bilateral structure injury\n• High mortality\n\n**At risk:**\n• Both carotid arteries\n• Trachea + esophagus combined\n• Spinal cord\n• Both vertebral arteries\n\n**Management:**\n• CTA neck + chest\n• Esophagoscopy/bronchoscopy often needed\n• Early surgical consultation\n• Very low threshold for OR\n\n**Prognosis:** Worse with combined aerodigestive tract injuries. [3][4]',
        next: 'nt-hard-signs',
        citation: [3, 4],
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 3: HARD SIGNS VS SOFT SIGNS
    // =====================================================================
    {
        id: 'nt-hard-signs',
        type: 'question',
        module: 3,
        title: 'Hard Signs vs Soft Signs',
        body: '**HARD SIGNS (Immediate OR):**\n🔴 Active arterial bleeding\n🔴 Expanding or pulsatile hematoma\n🔴 Bruit or thrill\n🔴 Hemoptysis or hematemesis\n🔴 Air bubbling through wound\n🔴 Massive subcutaneous emphysema\n🔴 Shock unresponsive to fluids\n🔴 Stroke/lateralizing neuro signs\n\n**SOFT SIGNS (Need imaging workup):**\n🟡 Stable hematoma (non-expanding)\n🟡 Dysphagia or odynophagia\n🟡 Dysphonia or hoarseness\n🟡 Subcutaneous emphysema (minor)\n🟡 Hemoptysis (minor)\n🟡 Nerve injury (except stroke)\n\n**Does patient have hard signs?** [2][5]',
        options: [
            { label: 'Hard signs present', description: 'Active bleeding, expanding hematoma, shock', next: 'nt-or-now', urgency: 'critical' },
            { label: 'Soft signs only', description: 'Stable hematoma, voice change, dysphagia', next: 'nt-cta' },
            { label: 'No hard or soft signs', description: 'Asymptomatic penetrating injury', next: 'nt-cta' },
        ],
        citation: [2, 5],
    },
    {
        id: 'nt-or-now',
        type: 'result',
        module: 3,
        title: 'Hard Signs — OR Now',
        body: '**Immediate Surgical Exploration:**\n\n**While preparing:**\n• Secure airway (awake intubation preferred)\n• Two large-bore IVs\n• Type & crossmatch 4+ units\n• Activate MTP if hemorrhaging\n\n**Direct pressure for hemorrhage:**\n• Manual compression\n• Foley catheter balloon tamponade\n• DO NOT clamp blindly\n• DO NOT remove impaled objects\n\n**Notify:**\n• Trauma surgery\n• Vascular surgery\n• ENT if airway involvement\n• Anesthesia for difficult airway\n\n**No CT if hard signs present — will delay definitive care.** [1][2]',
        recommendation: 'Hard signs of neck trauma. Secure airway, hemorrhage control, direct to OR. No CT. MTP if shock.',
        citation: [1, 2],
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 4: IMAGING
    // =====================================================================
    {
        id: 'nt-cta',
        type: 'info',
        module: 4,
        title: 'CTA Neck — Primary Imaging',
        body: '**CTA Protocol:**\n• Neck AND chest (especially Zone I)\n• Include circle of Willis for Zone III\n• Arterial phase timing\n\n**Evaluates:**\n• Vascular injury (pseudoaneurysm, dissection, occlusion)\n• Active extravasation\n• Trajectory assessment\n• Associated fractures\n\n**Sensitivity:**\n• >95% for significant vascular injury\n• May miss small intimal injuries\n\n**If CTA positive or indeterminate:**\n• Consider conventional angiography\n• Endovascular treatment option\n\n**Aerodigestive tract:**\n• CTA less sensitive for esophageal injury\n• Consider esophagoscopy/esophagram if high suspicion [4][5]',
        next: 'nt-cta-results',
        citation: [4, 5],
    },
    {
        id: 'nt-cta-results',
        type: 'question',
        module: 4,
        title: 'CTA Results',
        body: '**Review CTA for:**\n\n**Vascular Injury:**\n• Active extravasation\n• Pseudoaneurysm\n• Intimal flap/dissection\n• Occlusion or stenosis\n• A-V fistula\n\n**Aerodigestive:**\n• Air outside trachea\n• Tracheal wall injury\n• Esophageal thickening (indirect sign)\n\n**Other:**\n• Fractures (laryngeal, cervical spine)\n• Trajectory through critical structures\n\n**What does CTA show?** [4][5]',
        options: [
            { label: 'Vascular injury identified', description: 'Extravasation, pseudoaneurysm, dissection', next: 'nt-vascular-injury', urgency: 'urgent' },
            { label: 'Aerodigestive injury suspected', description: 'Extraluminal air, esophageal involvement', next: 'nt-aerodigestive' },
            { label: 'Negative CTA', description: 'No significant injury', next: 'nt-observation' },
            { label: 'Indeterminate', description: 'Need further workup', next: 'nt-further-workup' },
        ],
        citation: [4, 5],
    },
    {
        id: 'nt-vascular-injury',
        type: 'info',
        module: 4,
        title: 'Vascular Injury — Management',
        body: '**Vascular injury on CTA:**\n\n**Options based on injury type:**\n\n**Operative repair:**\n• Active hemorrhage\n• Expanding pseudoaneurysm\n• Major vessel transection\n\n**Endovascular:**\n• Zone I or III (difficult access)\n• Pseudoaneurysm (covered stent)\n• A-V fistula\n\n**Observation with anticoagulation:**\n• Small intimal flaps\n• Minor dissections\n• Non-flow-limiting injuries\n\n**Consult:**\n• Vascular surgery\n• Interventional radiology\n• Trauma surgery\n\n**Stroke risk:** High with carotid injuries — neuro checks q1h [5][6]',
        next: 'nt-disposition',
        citation: [5, 6],
        safetyLevel: 'warning',
    },
    {
        id: 'nt-aerodigestive',
        type: 'info',
        module: 4,
        title: 'Aerodigestive Tract Injury',
        body: '**Laryngotracheal Injury:**\n• Hoarseness, stridor, subcutaneous emphysema\n• Laryngoscopy/bronchoscopy for evaluation\n• Small tears: observation + antibiotics\n• Large tears: surgical repair\n\n**Esophageal Injury:**\n• Most commonly missed neck injury\n• High morbidity if delayed diagnosis\n• Water-soluble contrast swallow first\n• Follow with thin barium if negative\n• Esophagoscopy (rigid or flexible)\n\n**Combined injuries:**\n• Worse prognosis\n• Requires operative repair\n• Tissue flap between repairs\n\n**Antibiotics:**\n• Broad coverage (anaerobes + GNR)\n• Unasyn or Zosyn [5][6]',
        next: 'nt-disposition',
        citation: [5, 6],
    },
    {
        id: 'nt-further-workup',
        type: 'info',
        module: 4,
        title: 'Further Workup',
        body: '**Indeterminate CTA — Additional studies:**\n\n**Vascular:**\n• Conventional angiography (gold standard)\n• MRA if no contraindication\n• Repeat CTA in 24-48h\n\n**Esophagus:**\n• Water-soluble contrast swallow\n• Esophagoscopy\n• Sensitivity higher when combined\n\n**Larynx/Trachea:**\n• Direct laryngoscopy\n• Bronchoscopy\n• Fiberoptic if difficult airway\n\n**Spine:**\n• CT c-spine if not included\n• MRI for ligamentous injury\n\n**When in doubt:**\n• Observe with serial exams\n• Repeat imaging in 24h\n• Low threshold for endoscopy [5]',
        next: 'nt-disposition',
        citation: [5],
    },
    {
        id: 'nt-observation',
        type: 'info',
        module: 4,
        title: 'Negative CTA — Observation',
        body: '**Negative CTA + No Signs:**\n\n**Can consider discharge if ALL:**\n• No hard or soft signs\n• Normal CTA\n• Normal swallow\n• No voice changes\n• Reliable patient\n\n**However, most recommend:**\n• 24-hour observation\n• Serial neck exams\n• Monitor for delayed signs\n\n**Return immediately for:**\n• Voice changes\n• Difficulty swallowing\n• Increasing neck swelling\n• Fever\n• Coughing blood\n\n**Wound care:**\n• Primary closure if clean, <6h\n• Delayed closure if contaminated\n• Antibiotics not routine [5]',
        next: 'nt-disposition',
        citation: [5],
    },
    // =====================================================================
    // MODULE 5: BLUNT NECK TRAUMA
    // =====================================================================
    {
        id: 'nt-blunt',
        type: 'question',
        module: 5,
        title: 'Blunt Neck Trauma — Assessment',
        body: '**Blunt Mechanisms:**\n• MVC (seatbelt, steering wheel)\n• Strangulation/hanging\n• Direct blow (assault, sports)\n• Clothesline injury\n\n**Key Concerns:**\n• Blunt cerebrovascular injury (BCVI)\n• Laryngotracheal injury\n• Cervical spine injury\n• Esophageal injury (rare)\n\n**Signs of Laryngeal Injury:**\n• Hoarseness or aphonia\n• Stridor\n• Subcutaneous emphysema\n• Anterior neck tenderness\n• Loss of laryngeal landmarks\n\n**What is the primary concern?** [6][7]',
        options: [
            { label: 'Airway compromise', description: 'Stridor, voice change, swelling', next: 'nt-airway', urgency: 'critical' },
            { label: 'Strangulation', description: 'Hanging, choking, assault', next: 'nt-strangulation' },
            { label: 'Concern for BCVI', description: 'High-risk mechanism, neuro signs', next: 'nt-bcvi' },
            { label: 'Stable, minimal symptoms', description: 'Low-energy, no signs', next: 'nt-cta' },
        ],
        citation: [6, 7],
    },
    {
        id: 'nt-strangulation',
        type: 'info',
        module: 5,
        title: 'Strangulation — Special Considerations',
        body: '**Strangulation Types:**\n• Manual (hands)\n• Ligature (cord, belt)\n• Hanging (suicidal, accidental)\n\n**Immediate Concerns:**\n• Airway edema (delayed up to 24-36h)\n• BCVI (carotid/vertebral)\n• Laryngeal fracture\n• Aspiration\n\n**Exam Findings:**\n• Petechiae (conjunctival, facial, oral)\n• Ligature marks\n• Neck tenderness\n• Voice changes\n• Neurologic deficits\n\n**Workup:**\n• CTA neck (BCVI screening)\n• Laryngoscopy if voice change/stridor\n• CT c-spine if appropriate mechanism\n\n**Admit for:**\n• Any airway symptoms\n• Altered mental status\n• Positive imaging\n• High-risk mechanism\n• Forensic/safety concerns [7]',
        next: 'nt-cta',
        citation: [7],
    },
    {
        id: 'nt-bcvi',
        type: 'info',
        module: 5,
        title: 'Blunt Cerebrovascular Injury (BCVI)',
        body: '**BCVI Screening — Denver/Memphis Criteria:**\n\n**Screen with CTA if ANY:**\n• Cervical spine fracture (especially C1-C3)\n• Basilar skull fracture with carotid canal involvement\n• Le Fort II or III fracture\n• Diffuse axonal injury with GCS <6\n• Hanging/strangulation\n• Seat belt sign with altered mental status\n• Unexplained neuro deficit not explained by CT head\n\n**Grading:**\n• I: Intimal irregularity (<25% narrowing)\n• II: Dissection/intramural hematoma (≥25% narrowing)\n• III: Pseudoaneurysm\n• IV: Complete occlusion\n• V: Transection with extravasation\n\n**Treatment:**\n• Antiplatelet (ASA 325mg) or anticoagulation\n• Balance bleed risk (ICH, solid organ injury)\n• Neuro/vascular surgery consult [7]',
        next: 'nt-disposition',
        citation: [7],
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 6: AIRWAY + DISPOSITION
    // =====================================================================
    {
        id: 'nt-airway',
        type: 'info',
        module: 6,
        title: 'Airway Management — Neck Trauma',
        body: '**Principles:**\n• Anticipate difficult airway\n• Awake technique preferred if time allows\n• Prepare for surgical airway\n• Avoid paralysis if possible\n\n**Options (in order of preference):**\n1. Awake fiberoptic intubation\n2. Video laryngoscopy (awake or sedated)\n3. DSI then intubation\n4. Surgical airway (cricothyrotomy)\n\n**Avoid:**\n• Blind nasotracheal (risk false passage)\n• Multiple attempts (worsens edema)\n• Paralysis without backup plan\n\n**Surgical airway indications:**\n• Failed oral attempts\n• Expanding hematoma\n• Complete obstruction\n• Laryngeal fracture with instability\n\n**Tracheostomy preferred over cric if:**\n• Laryngeal injury below cricoid\n• Time and expertise available [1][8]',
        next: 'nt-disposition',
        citation: [1, 8],
        safetyLevel: 'critical',
    },
    {
        id: 'nt-disposition',
        type: 'question',
        module: 6,
        title: 'Disposition',
        body: '**Admit to ICU:**\n• Operative repair needed\n• Endovascular intervention\n• Airway compromise (intubated)\n• Vascular injury on anticoagulation\n• Neurologic deficit\n\n**Admit to floor:**\n• Observation after negative workup\n• Minor injury managed non-operatively\n• Serial exams needed\n\n**Discharge (rare):**\n• Superficial wound only\n• Completely negative workup\n• No hard or soft signs\n• Reliable patient with follow-up\n\n**What is the disposition?**',
        options: [
            { label: 'Admit ICU', description: 'OR, intervention, airway, or vascular injury', next: 'nt-admit-icu' },
            { label: 'Admit floor', description: 'Observation, serial exams', next: 'nt-admit-floor' },
            { label: 'Discharge', description: 'Superficial, negative workup', next: 'nt-discharge' },
        ],
        citation: [5],
    },
    {
        id: 'nt-admit-icu',
        type: 'result',
        module: 6,
        title: 'Admit ICU',
        body: '**ICU Admission Orders:**\n\n• Airway precautions (intubation/cric at bedside)\n• Neuro checks q1h (if vascular injury)\n• Serial neck exams q4h\n• NPO (potential OR)\n• Blood products available\n\n**If vascular injury:**\n• Antiplatelet or anticoagulation per consult\n• SBP goal <140 if pseudoaneurysm\n• Stroke protocol if deficit\n\n**If aerodigestive injury:**\n• NPO, IV antibiotics\n• Speech therapy eval\n• Surgical planning\n\n**Consults:**\n• Trauma surgery\n• Vascular surgery (if vascular injury)\n• ENT (if laryngeal injury)\n• Interventional radiology PRN',
        recommendation: 'Neck trauma with significant injury. Admit ICU. Neuro checks q1h. Airway precautions. Consult trauma/vascular/ENT as indicated.',
        citation: [1, 5],
    },
    {
        id: 'nt-admit-floor',
        type: 'result',
        module: 6,
        title: 'Admit Floor — Observation',
        body: '**Floor Admission:**\n\n**Indications:**\n• Negative CTA but mechanism concerning\n• Soft signs present\n• Need serial exams\n• Social/safety concerns\n\n**Monitoring:**\n• Serial neck exams q4-6h\n• Neuro checks if any concern for BCVI\n• Swallow eval before PO\n\n**Antibiotics:**\n• Not routine for clean wounds\n• If contaminated: Augmentin or Unasyn\n\n**Disposition criteria:**\n• No new symptoms x 24h\n• Normal swallow\n• No expanding hematoma\n• Follow-up arranged\n\n**Follow-up:**\n• Trauma clinic 1-2 weeks\n• Earlier if any new symptoms',
        recommendation: 'Neck trauma, stable. Admit for 24h observation. Serial neck exams q4-6h. Swallow eval before PO.',
        citation: [5],
    },
    {
        id: 'nt-discharge',
        type: 'result',
        module: 6,
        title: 'Discharge — Superficial Injury',
        body: '**Discharge Criteria (ALL must be met):**\n• Superficial wound only (not through platysma)\n• No hard or soft signs\n• Negative CTA (if obtained)\n• Normal voice and swallow\n• Reliable patient\n• Clear follow-up\n\n**Wound Care:**\n• Clean, irrigate\n• Primary closure if <6h, clean\n• Tetanus update if needed\n\n**Return Precautions:**\n• Any voice change\n• Difficulty swallowing\n• Neck swelling\n• Increasing pain\n• Fever\n• Coughing or spitting blood\n• Weakness or numbness\n\n**Follow-up:**\n• PCP or trauma clinic in 3-5 days\n• Wound check\n• Suture removal 5-7 days',
        recommendation: 'Superficial neck wound. Clean, primary closure. Tetanus PRN. Written return precautions. PCP follow-up 3-5 days.',
        citation: [5],
    },
];
// =====================================================================
// Module Labels
// =====================================================================
export const NECK_TRAUMA_MODULE_LABELS = [
    'Primary Survey',
    'Zone Assessment',
    'Hard Signs',
    'Imaging',
    'Blunt Trauma',
    'Airway/Disposition',
];
// =====================================================================
// Citations
// =====================================================================
export const NECK_TRAUMA_CITATIONS = [
    { num: 1, text: 'Inaba K, et al. Western Trauma Association Critical Decisions in Trauma: Penetrating Neck Trauma. J Trauma Acute Care Surg. 2019;87(5):1183-1189.' },
    { num: 2, text: 'Tisherman SA, et al. Clinical Practice Guideline: Penetrating Neck Trauma. J Trauma. 2008;64(5):1392-1405.' },
    { num: 3, text: 'Roon AJ, Christensen N. Evaluation and treatment of penetrating cervical injuries. J Trauma. 1979;19(6):391-397.' },
    { num: 4, text: 'Inaba K, et al. Prospective evaluation of multidetector computed tomography for extremity vascular trauma. J Trauma. 2011;70(4):808-815.' },
    { num: 5, text: 'EAST Practice Management Guidelines: Penetrating Neck Trauma. 2020.' },
    { num: 6, text: 'Verschueren DS, et al. Role of angiography in penetrating neck trauma. J Trauma. 1992;32(4):396-403.' },
    { num: 7, text: 'Geddes AE, et al. Blunt Cerebrovascular Injury: A Review of Current Screening Criteria. J Neurotrauma. 2021;38(3):301-309.' },
    { num: 8, text: 'Mandavia DP, et al. Emergency airway management in penetrating neck injury. Ann Emerg Med. 2000;35(3):221-225.' },
];
