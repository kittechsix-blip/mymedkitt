// MedKitt — Pediatric Foreign Body (Aspiration + Esophageal)
// Recognition → Stabilization → Airway FB → Esophageal Triage → BB / Magnet / Coin / Sharp / Food Bolus → Disposition
// Category: Pediatrics. 7 modules, ~32 nodes.
// Sources: NASPGHAN (Kramer 2015), ESPGHAN 2021, National Capital Poison Center BB Guideline 2024,
// CHOP/Arkansas/CHOR pathways, StatPearls 2024, EB Medicine, Lowe 2024, Powers 2024, Norii 2024 MOCHI, Waltzman 2005.

import type { DecisionNode } from '../../models/types.js';

interface Citation { num: number; text: string; }

export const PEDS_FB_MODULE_LABELS = [
  'Recognition',
  'Initial Stabilization',
  'Airway (Tracheobronchial) FB',
  'Esophageal Triage',
  'Button Battery (Esophageal)',
  'Magnets / Coins / Sharps / Food Bolus',
  'Disposition & Prevention',
];

export const PEDS_FB_CITATIONS: Citation[] = [
  { num: 1, text: 'Kramer RE, Lerner DG, Lin T, et al. (NASPGHAN Endoscopy Committee). Management of ingested foreign bodies in children: a clinical report. J Pediatr Gastroenterol Nutr. 2015;60(4):562-574.' },
  { num: 2, text: 'Mubarak A, Benninga MA, Broekaert I, et al. (ESPGHAN). Diagnosis, management, and prevention of button battery ingestion in childhood: ESPGHAN position paper. J Pediatr Gastroenterol Nutr. 2021;73(1):129-136.' },
  { num: 3, text: 'National Capital Poison Center. Button Battery Ingestion Triage and Treatment Guideline. Updated 2024. https://www.poison.org/battery/guideline' },
  { num: 4, text: 'Powers K, Baldassari C, Lucas J. Pediatric esophageal foreign bodies and caustic ingestions. Otolaryngol Clin North Am. 2024;57(4):623-633.' },
  { num: 5, text: 'Anfang RR, Jatana KR, Linn RL, et al. pH-neutralizing esophageal irrigations as a novel mitigation strategy for button battery injury. Laryngoscope. 2019;129(1):49-57.' },
  { num: 6, text: 'Jatana KR, Rhoades K, Milkovich S, Jacobs IN. Basic mechanism of button battery injury and clinical strategies. Laryngoscope. 2017;127(6):1276-1282.' },
  { num: 7, text: 'StatPearls. Foreign Body Airway Obstruction. NCBI Bookshelf. Last updated July 17, 2024.' },
  { num: 8, text: 'Lowe E, et al. Principal diagnostic features of paediatric foreign body aspiration. Int J Pediatr Otorhinolaryngol. 2024;177:111846.' },
  { num: 9, text: 'Sunman B, et al. Foreign body aspiration through the eyes of a pediatric pulmonologist. Turk J Pediatr. 2024;66(5):578-587.' },
  { num: 10, text: 'Waltzman ML, Baskin M, Wypij D, et al. A randomized clinical trial of the management of esophageal coins in children. Pediatrics. 2005;116(3):614-619.' },
  { num: 11, text: 'Norii T, et al. (MOCHI Registry). Bystander interventions for foreign body airway obstruction and outcomes. Resuscitation. 2024;199:110198.' },
  { num: 12, text: 'Topjian AA, Raymond TT, Atkins D, et al. Part 4: Pediatric Basic and Advanced Life Support. Circulation. 2020;142(suppl 2):S469-S523.' },
  { num: 13, text: 'Hussain SZ, Bousvaros A, Gilger M, et al. Management of ingested magnets in children. J Pediatr Gastroenterol Nutr. 2012;55(3):239-242.' },
  { num: 14, text: 'Sink JR, Kitsko DJ, Mehta DK, et al. Diagnosis of pediatric foreign body ingestion. Otolaryngol Head Neck Surg. 2016;155(3):501-507.' },
  { num: 15, text: 'Even L, Heno N, Talmon Y, et al. Diagnostic evaluation of foreign body aspiration in children: a prospective study. J Pediatr Surg. 2005;40(7):1122-1127.' },
  { num: 16, text: 'CHOP Foreign Body Ingestion Clinical Pathway. Children\'s Hospital of Philadelphia. 2024 update.' },
  { num: 17, text: 'Alzate-Ricaurte S, et al. Cluster analysis of symptoms in pediatric foreign bodies. Sci Rep. 2025;15(1):213.' },
  { num: 18, text: 'CPSC Reese\'s Law. Safety Standard for Button Cell Batteries (16 CFR 1263). 2024.' },
];

export const PEDS_FB_CRITICAL_ACTIONS = [
  { text: 'Witnessed choking + sudden cough in 6mo–5yr = aspiration until proven otherwise — normal CXR does NOT rule out [7,8]', nodeId: 'peds-fb-start' },
  { text: 'Effective cough = "watch don\'t touch" — do NOT do blind finger sweeps [12]', nodeId: 'peds-fb-bls' },
  { text: 'Esophageal button battery = OR within 2 hours regardless of symptoms [2,3]', nodeId: 'peds-fb-bb' },
  { text: 'Honey 10 mL PO q10min × up to 6 doses if ≥12mo, awake, <12h since BB ingestion [5,6]', nodeId: 'peds-fb-bb-honey' },
  { text: 'Multiple magnets OR magnet + metallic co-ingestion = surgical consult [13]', nodeId: 'peds-fb-magnet' },
  { text: 'Rigid bronchoscopy is gold standard for tracheobronchial FB [4,9]', nodeId: 'peds-fb-airway-imaging' },
] as const;

export const PEDS_FB_NODES: DecisionNode[] = [

  // ====================================================================
  // MODULE 1: RECOGNITION
  // ====================================================================
  {
    id: 'peds-fb-start',
    type: 'info',
    module: 1,
    title: 'Pediatric Foreign Body — Overview',
    body: '[Steps Summary](#/info/peds-fb-steps-summary) · [Esophageal Timing Table](#/info/peds-fb-timing-table) · [BB Honey Protocol](#/info/peds-fb-honey-protocol)\n\n**Highest risk:** 6 months – 5 years. Peak around toddlers exploring orally. [7,8]\n\n**Two pathways:**\n- **AIRWAY (tracheobronchial)** — choking event, cough, wheeze, focal decreased breath sounds\n- **ESOPHAGEAL** — drooling, dysphagia, refusing PO, chest/throat pain, may be silent\n\n**Classic aspiration triad** (cough + wheeze + decreased breath sounds) is only ~50% sensitive. Absence does NOT rule out. [4,15]\n\n**A normal chest X-ray does NOT exclude airway FB.** Most aspirated objects (food, plastic) are radiolucent. Radiographic signs may be delayed >24h. [7,8]\n\n**Time-critical scenarios:**\n- Complete airway obstruction → BLS choking algorithm NOW\n- Esophageal button battery → OR within 2 hours [2,3]\n- Multiple magnets → urgent removal [13]',
    citation: [4, 7, 8, 15],
    next: 'peds-fb-presentation',
    summary: '6mo–5yr peak; classic triad only ~50% sensitive; normal CXR does NOT rule out; BB esophagus → OR <2h',
  },

  {
    id: 'peds-fb-presentation',
    type: 'question',
    module: 1,
    title: 'Initial Presentation',
    body: 'Which scenario best fits the patient now?',
    options: [
      { label: 'Acute choking, active airway compromise', description: 'Stridor, cyanosis, ineffective cough, LOC', next: 'peds-fb-bls' },
      { label: 'Witnessed or suspected aspiration, stable', description: 'Choking event, now coughing/wheezing, oxygenating', next: 'peds-fb-airway-eval' },
      { label: 'Witnessed or suspected ingestion (esophageal/GI)', description: 'Swallowed coin/battery/magnet/sharp/food', next: 'peds-fb-esoph-triage' },
      { label: 'Chronic/occult — recurrent pneumonia, persistent wheeze', description: 'No witnessed event but high suspicion', next: 'peds-fb-airway-eval' },
    ],
    summary: 'Acute choking → BLS; stable aspiration → airway eval; ingestion → esophageal triage; occult → airway eval',
  },

  // ====================================================================
  // MODULE 2: INITIAL STABILIZATION (BLS)
  // ====================================================================
  {
    id: 'peds-fb-bls',
    type: 'info',
    module: 2,
    title: 'BLS Choking Algorithm — by Age',
    body: '[PALS Choking Algorithm](#/info/peds-fb-pals-choking)\n\n**STEP 1 — Assess cough effectiveness** [12]\n- **Effective cough** (can cry/speak, color normal): **WATCH, do not intervene**. Encourage cough. Transport.\n- **Ineffective cough** (no sound, cyanotic, decreasing LOC): **ACT NOW**\n\n**STEP 2 — Age-appropriate maneuver** [12]\n\n**Infant <1 year (conscious):**\n- 5 back blows (heel of hand, between scapulae, head down)\n- 5 chest thrusts (2 fingers on sternum, same location as CPR)\n- Repeat until object out or LOC\n\n**Child ≥1 year (conscious):**\n- 5 abdominal thrusts (Heimlich — fist above umbilicus, below xiphoid)\n- Repeat until object out or LOC\n\n**Any age, UNCONSCIOUS:**\n- Start CPR (chest compressions FIRST — may dislodge FB)\n- Look in mouth before each rescue breath; remove visible object\n- **Never blind finger sweep** — risk of pushing FB deeper [12]\n\n**Bystander outcomes:** Effective bystander relief before EMS arrival → better neurological outcomes (MOCHI registry). [11]',
    citation: [11, 12],
    next: 'peds-fb-post-bls',
    summary: 'Effective cough = watch; ineffective = back blows/chest thrusts <1yr OR Heimlich ≥1yr; CPR if unconscious; never blind sweep',
  },

  {
    id: 'peds-fb-post-bls',
    type: 'question',
    module: 2,
    title: 'Post-Stabilization Status',
    body: 'After BLS maneuvers, what is the patient\'s status?',
    options: [
      { label: 'Object expelled, fully recovered', description: 'Asymptomatic, normal exam', next: 'peds-fb-airway-eval' },
      { label: 'Object expelled but residual symptoms', description: 'Persistent cough, wheeze, focal exam', next: 'peds-fb-airway-eval' },
      { label: 'Object still present, breathing now', description: 'Stable enough for imaging', next: 'peds-fb-airway-eval' },
      { label: 'Persistent obstruction, deteriorating', description: 'Failed BLS, ENT/anesthesia/OR activation', next: 'peds-fb-cant-extract' },
    ],
    summary: 'All survivors of choking still need airway evaluation — retained particulate is common',
  },

  {
    id: 'peds-fb-cant-extract',
    type: 'info',
    module: 2,
    title: 'Failed BLS — Critical Airway',
    body: '**Cannot ventilate, cannot extract FB:**\n\n**Activate:**\n- ENT, anesthesia, OR, PICU NOW\n- Pediatric advanced airway resources\n\n**Bridge maneuvers:**\n- Direct laryngoscopy + Magill forceps if FB supraglottic and visible\n- BVM ventilation between attempts (may push obstructing FB distal to one mainstem → restores ventilation through other lung)\n- Consider intentional right mainstem intubation to push FB into right bronchus, ventilate left lung\n- Surgical airway (cricothyrotomy / tracheostomy) if all above fail — last resort\n\n**Definitive:** Emergent rigid bronchoscopy in OR. [4,9]',
    citation: [4, 9, 12],
    next: 'peds-fb-airway-imaging',
    summary: 'Failed BLS = ENT/anesth/OR/PICU; Magill if visible; push FB distal as last bridge; rigid bronch is definitive',
  },

  // ====================================================================
  // MODULE 3: AIRWAY (TRACHEOBRONCHIAL) FB
  // ====================================================================
  {
    id: 'peds-fb-airway-eval',
    type: 'info',
    module: 3,
    title: 'Airway FB — Clinical Evaluation',
    body: '**History red flags** [4,8,14]\n- Witnessed choking event (specificity ~95%, sensitivity 76-92%) [8]\n- Sudden cough or apnea while eating/playing\n- Persistent unilateral wheeze\n- Recurrent same-lobe pneumonia\n\n**Exam findings (any may be absent):**\n- Focal decreased breath sounds (most specific finding)\n- Unilateral wheeze\n- Stridor (extrathoracic/laryngeal FB)\n- Drooling, dysphonia\n\n**Key point:** Up to 30% of confirmed FBA have normal exam at presentation. [8,14]\n\n**Common aspirated items** [4]\n- Peanuts (most common in <3yr)\n- Other nuts, seeds, popcorn\n- Hot dog, grape, candy\n- Small toy parts, balloon fragments, pen caps\n- Coins (can lodge in airway if very small)',
    citation: [4, 8, 14],
    next: 'peds-fb-airway-imaging',
    summary: 'Witnessed event = 95% specific; focal ↓ BS = most specific finding; 30% have normal exam; peanuts most common <3yr',
  },

  {
    id: 'peds-fb-airway-imaging',
    type: 'info',
    module: 3,
    title: 'Airway FB — Imaging Strategy',
    body: '**Standard:** PA + lateral chest X-ray [4,7]\n\n**Findings (any/none):**\n- Radiopaque FB (rare — most are food/plastic)\n- Unilateral hyperinflation (ball-valve obstruction, expiratory air trapping)\n- Atelectasis distal to FB\n- Mediastinal shift\n- Consolidation (post-obstructive pneumonia)\n\n**Specialized views to detect air trapping** when standard CXR is normal but suspicion high:\n- **Inspiratory + expiratory CXR** (if child cooperates) — air trapping on expiration = ball valve\n- **Bilateral decubitus films** in younger child — dependent lung normally collapses; affected side stays inflated\n- **Fluoroscopy** if available — dynamic air trapping\n\n**CT chest** — high sensitivity but radiation + sedation in young child. Reserve for diagnostic uncertainty when bronchoscopy not immediately available. [4]\n\n**Bottom line:** Normal imaging in a child with witnessed choking event still warrants ENT/pulm consultation for diagnostic rigid bronchoscopy. [4,9]',
    images: [
      { src: 'images/peds-fb/airway-hyperinflation.png', alt: 'Pediatric chest X-ray showing right-sided hyperinflation from foreign body aspiration', caption: 'Unilateral hyperinflation from ball-valve obstruction — affected (right) lung remains expanded on expiratory film. Open-source educational image.' },
    ],
    citation: [4, 7, 9],
    next: 'peds-fb-airway-disposition',
    summary: 'CXR may be normal; insp/exp or decubitus to detect air trapping; CT only if rigid bronch unavailable; high suspicion → bronch',
  },

  {
    id: 'peds-fb-airway-disposition',
    type: 'question',
    module: 3,
    title: 'Disposition by Suspicion + Imaging',
    body: 'Stratify based on clinical suspicion and imaging findings.',
    options: [
      { label: 'High suspicion (witnessed + symptoms)', description: 'Imaging positive OR negative — proceed to rigid bronch', next: 'peds-fb-rigid-bronch' },
      { label: 'Moderate suspicion, imaging negative', description: 'Pulm consult, observation, repeat imaging', next: 'peds-fb-obs-airway' },
      { label: 'Low suspicion, asymptomatic, exam normal', description: 'Discharge with return precautions', next: 'peds-fb-discharge' },
    ],
    summary: 'High suspicion → rigid bronch regardless of imaging; mod → obs + pulm; low + asx → home',
  },

  {
    id: 'peds-fb-rigid-bronch',
    type: 'info',
    module: 3,
    title: 'Rigid Bronchoscopy — Gold Standard',
    body: '**Rigid bronchoscopy under GA** — diagnostic AND therapeutic for tracheobronchial FB. [4,9]\n\n**Indication threshold:** Any one of:\n- Witnessed aspiration event with persistent symptoms\n- Radiologic findings (hyperinflation, atelectasis)\n- Recurrent same-lobe pneumonia\n- Persistent focal wheeze unresponsive to bronchodilator\n\n**Pre-op:**\n- NPO\n- IV access\n- Anesthesia + ENT/pediatric surgery\n- Discuss with family (consent, risks: airway edema, pneumothorax, mucosal injury)\n\n**Post-op management** [4]\n- ICU/inpatient observation 24h minimum\n- [Dexamethasone](#/drug/dexamethasone/airway-edema) 0.6 mg/kg IV/PO × 1 (max 16 mg) for post-procedure airway edema\n- Racemic [epinephrine](#/drug/epinephrine/stridor) 0.5 mL of 2.25% nebulized if post-op stridor\n- CXR post-procedure\n- Antibiotics if obstructive pneumonia present',
    citation: [4, 9],
    calculatorLinks: [
      { id: 'pals-weight', label: 'PALS Weight' },
    ],
    next: 'peds-fb-discharge',
    summary: 'Rigid bronch under GA = gold standard; dexamethasone + racemic epi prn post-op edema; 24h obs',
  },

  {
    id: 'peds-fb-obs-airway',
    type: 'info',
    module: 3,
    title: 'Observation — Moderate Suspicion',
    body: '**Setting:** Inpatient or extended ED observation, pulmonology / ENT consultation. [4]\n\n**Monitor for:**\n- Persistent or worsening cough/wheeze\n- New focal exam findings\n- Recurrent same-lobe pneumonia\n- Persistent hypoxemia\n\n**Repeat imaging** at 24-48h if symptoms persist.\n\n**Threshold to escalate to bronchoscopy:** Low. When in doubt, the diagnostic yield of rigid bronchoscopy in moderate-suspicion cases is acceptable given the morbidity of missed FBA (chronic atelectasis, bronchiectasis, recurrent pneumonia). [9]',
    citation: [4, 9],
    next: 'peds-fb-discharge',
    summary: 'Mod suspicion = inpatient obs + pulm/ENT; low threshold to escalate to bronch if persistent symptoms',
  },

  // ====================================================================
  // MODULE 4: ESOPHAGEAL TRIAGE
  // ====================================================================
  {
    id: 'peds-fb-esoph-triage',
    type: 'question',
    module: 4,
    title: 'Esophageal FB — Object Triage',
    body: '[Esophageal Timing Table](#/info/peds-fb-timing-table)\n\n**Obtain STAT AP + lateral X-ray** (neck, chest, abdomen) before triage. Lateral identifies "halo" sign of button battery vs single-density coin. [1,3]\n\n**Select the most concerning object known or imaged:**',
    options: [
      { label: 'Button battery (any size, any age)', description: 'TRUE EMERGENCY — esophageal location = OR <2h', next: 'peds-fb-bb' },
      { label: 'Magnet(s) — single or multiple', description: 'Single = observe; multiple OR + metal = surgery', next: 'peds-fb-magnet' },
      { label: 'Coin', description: 'Symptomatic <2h; asymptomatic ≤24h or observation trial', next: 'peds-fb-coin' },
      { label: 'Sharp object (needle, pin, bone, glass)', description: 'Any esophageal location = endoscopy <2h if symptomatic, <24h if asx', next: 'peds-fb-sharp' },
    ],
    summary: 'AP+lateral first; BB = stat OR; multiple magnets = surgery; coin/sharp = symptom-based timing',
  },

  // ====================================================================
  // MODULE 5: BUTTON BATTERY (ESOPHAGEAL)
  // ====================================================================
  {
    id: 'peds-fb-bb',
    type: 'info',
    module: 5,
    title: 'Button Battery — Esophageal',
    body: '**TRUE EMERGENCY — OR within 2 hours regardless of symptoms.** [2,3]\n\nFor full button battery workflow (gastric, distal, complications) see → [Button Battery consult](#/tree/button-battery).\n\n**Immediate parallel actions:**\n1. **Activate:** ENT, GI, anesthesia, OR\n2. **Call:** National Battery Hotline **1-800-498-8666** (24/7)\n3. **STAT XR** AP + lateral confirms esophageal location (BB has "halo/double-ring" on AP, step-off on lateral) [3]\n4. **NPO** strict\n5. **Pre-removal mitigation** → next node\n\n**Mechanism of injury (why minutes matter):**\n- Battery generates hydroxide at negative pole\n- pH >12 within 15 minutes\n- Liquefactive necrosis → perforation, fistula (TEF, aortoesophageal)\n- Lithium 3V cells most dangerous\n- ≥20 mm batteries → high impaction + injury risk [3,6]\n\n**Complications even after removal:**\n- Esophageal stricture (38%)\n- Tracheoesophageal fistula (48%)\n- Aortoesophageal fistula — can occur up to 28 days post-removal [3]',
    citation: [2, 3, 6],
    next: 'peds-fb-bb-honey',
    summary: 'OR <2h regardless of sx; halo sign on AP; ENT+GI+anesth+OR + battery hotline; NPO; injury starts in 15min',
  },

  {
    id: 'peds-fb-bb-honey',
    type: 'info',
    module: 5,
    title: 'BB Pre-Removal Mitigation — Honey / Sucralfate',
    body: '[BB Honey Protocol](#/info/peds-fb-honey-protocol)\n\n**Honey (pH-neutralizing, viscous coating) — first-line mitigation** [5,6]\n\n**Eligibility:**\n- Age **≥12 months** (infant botulism risk under 12mo — NEVER give honey <12mo)\n- Awake, able to swallow safely\n- **<12 hours** since ingestion\n- No mediastinitis or perforation signs\n- En route to or awaiting OR\n\n**Dose:** **[Honey](#/drug/honey/button-battery)** 10 mL PO every 10 minutes, up to **6 doses** total before OR.\n\n**Sucralfate** — alternative if honey unavailable or age <12mo:\n- **[Sucralfate](#/drug/sucralfate/button-battery)** 10 mL of 1g/10mL suspension PO q10min × up to 3 doses\n- Hospital pharmacy only (not in most homes)\n\n**Do NOT delay OR for mitigation.** Honey/sucralfate are bridge therapy in parallel with OR mobilization, not a substitute. [3,5]\n\n**Evidence:** Animal (piglet) and clinical case series show reduced injury severity and stricture when honey/sucralfate given <12h. [5,6]',
    citation: [3, 5, 6],
    next: 'peds-fb-bb-postop',
    summary: 'Honey 10mL q10min ×6 doses if ≥12mo, awake, <12h; sucralfate alternative; NEVER delay OR; never honey <12mo',
  },

  {
    id: 'peds-fb-bb-postop',
    type: 'info',
    module: 5,
    title: 'BB Post-Removal Surveillance',
    body: '**Immediate post-removal** [3]\n- Document depth, orientation, duration, injury appearance at endoscopy\n- Esophagram or CT angio if any concern for vascular involvement\n- ICU/inpatient admission\n\n**Surveillance for delayed complications** [3]\n- Repeat esophagram at **4 weeks** if significant circumferential injury → assess for stricture\n- Endoscopic dilation if stricture develops (≥4 weeks healing minimizes perforation risk)\n- **28-day vigilance** for aortoesophageal fistula — any hematemesis, chest pain, syncope = STAT CT angio\n- Respiratory symptoms → evaluate for TEF\n\n**Anticipatory guidance for family** [18]\n- CPSC Reese\'s Law (2024) requires child-resistant battery compartments\n- Remove household sources of loose button batteries\n- Reinforce: button battery + child = ER immediately, no waiting',
    citation: [3, 18],
    next: 'peds-fb-disposition',
    summary: 'ICU admit; esophagram at 4wk if circ injury; 28-day AEF vigilance; family education on Reese\'s Law',
  },

  // ====================================================================
  // MODULE 6: MAGNETS / COINS / SHARPS / FOOD BOLUS
  // ====================================================================
  {
    id: 'peds-fb-magnet',
    type: 'info',
    module: 6,
    title: 'Magnet(s) — Single vs Multiple',
    body: '**Critical question:** Single magnet OR multiple magnets / magnet + metal? [1,13]\n\n**Single magnet, esophageal:**\n- Symptomatic → endoscopic removal <2h\n- Asymptomatic → ≤24h endoscopic removal\n\n**Single magnet, beyond esophagus, asymptomatic:**\n- Observation + serial X-rays q4-6h to confirm passage\n- Strict isolation from other magnets/metal\n\n**Multiple magnets OR magnet + metallic co-ingestion (ANY location):**\n- Attraction across bowel walls → pressure necrosis, perforation, fistula\n- **Esophageal/gastric → urgent endoscopic removal**\n- **Beyond stomach + symptomatic → surgical consult (laparoscopy/laparotomy)** [13]\n- Beyond stomach + asymptomatic → admission, serial XR, surgical consult if no progression\n\n**Neodymium magnets** (rare-earth, "Buckyballs") — >5× force of standard magnets, much higher injury risk. Treat with high suspicion. [13]\n\n**Anticipatory guidance:** CPSC banned high-powered magnet sets for children under federal rule (2022). Reinforce removal from home. [13]',
    citation: [1, 13],
    next: 'peds-fb-disposition',
    summary: 'Single = observe/remove by symptoms; multiple OR magnet+metal = surgical consult; neodymium = worst; esoph BB ≠ magnet (different timing rules)',
  },

  {
    id: 'peds-fb-coin',
    type: 'info',
    module: 6,
    title: 'Esophageal Coin',
    body: '**Symptomatic (drooling, refusing PO, chest pain, respiratory):**\n- Endoscopic removal **<2 hours** [1,10]\n\n**Asymptomatic, esophageal coin:**\n- Option A: Endoscopic removal **<24 hours** [1]\n- Option B (older child, distal esophagus): Observation trial with **repeat X-ray at 16-24 hours** — 25-30% pass spontaneously, more likely with distal location and age >5yr [10] (Waltzman RCT)\n\n**Coin in stomach (asymptomatic):**\n- Vast majority pass spontaneously\n- Discharge with stool/symptom precautions, repeat XR in 2-4 weeks if no documented passage\n\n**Removal techniques (selected based on local expertise):** [1]\n- Flexible endoscopy (preferred at most centers)\n- Magill forceps under direct laryngoscopy (very proximal coin)\n- Bougienage (advance to stomach) — controversial, only in highly selected stable cases by experienced provider\n- Foley catheter retrieval — largely abandoned, aspiration risk\n\n**Glucagon** — anecdotal use for food bolus; minimal data for coins, generally not effective. [1]',
    citation: [1, 10],
    next: 'peds-fb-disposition',
    summary: 'Sx coin = <2h; asx = <24h or 16-24h obs trial (25-30% pass); gastric coin = discharge; glucagon not useful for coins',
  },

  {
    id: 'peds-fb-sharp',
    type: 'info',
    module: 6,
    title: 'Sharp / Long Object',
    body: '**Sharp objects** (needles, pins, fish/chicken bones, broken glass, open safety pins): [1,4]\n\n**Esophageal:**\n- Endoscopic removal regardless of symptoms — risk of perforation\n- **Symptomatic → <2 hours**\n- **Asymptomatic → <24 hours**\n\n**Gastric, sharp object:**\n- Endoscopic removal if technically feasible (point-trailing technique)\n- Failed endoscopy + sharp object → close observation + serial imaging\n\n**Long objects (>5cm in <1yr, >6-10cm in older child):**\n- Endoscopic removal — won\'t round duodenal sweep\n\n**Beyond duodenum:**\n- Serial daily X-rays\n- Surgical consult if no progression × 3 days or symptoms develop',
    citation: [1, 4],
    next: 'peds-fb-disposition',
    summary: 'Sharp esoph = endoscopy regardless of sx (<2h sx, <24h asx); long objects >5cm <1yr or >6cm older = endoscopy',
  },

  {
    id: 'peds-fb-food',
    type: 'info',
    module: 6,
    title: 'Food Bolus Impaction',
    body: '**Esophageal food bolus** (uncommon in young children without underlying disease — eosinophilic esophagitis, stricture, web): [1,4]\n\n**Symptomatic, unable to handle secretions:** Endoscopic removal <2 hours\n\n**Symptomatic, handling secretions:** Endoscopic removal <24 hours\n\n**Pharmacologic options (limited evidence in peds):**\n- **[Glucagon](#/drug/glucagon/food-bolus)** 0.5 mg IV in child (1 mg in adolescent) — relaxes LES, may allow passage. Side effect: vomiting (risk if recently fed). Modest success in adults; pediatric data limited. [1]\n- No role for nifedipine or carbonated beverages in pediatrics\n\n**Post-extraction:**\n- All pediatric food bolus = referral to GI for EGD + biopsy (EoE workup)\n- Strict avoidance of solid food until cleared',
    citation: [1, 4],
    next: 'peds-fb-disposition',
    summary: 'Peds food bolus rare without dz; sx + no secretions = <2h; glucagon limited peds data; ALL peds food bolus → GI for EoE workup',
  },

  // ====================================================================
  // MODULE 7: DISPOSITION & PREVENTION
  // ====================================================================
  {
    id: 'peds-fb-disposition',
    type: 'info',
    module: 7,
    title: 'Disposition & Caregiver Education',
    body: '**Admit:**\n- Any post-bronchoscopy / post-endoscopy patient × 24h\n- Button battery (regardless of clinical course) — ICU level\n- Multiple magnet ingestion, observation phase\n- Respiratory symptoms persisting post-extraction\n\n**Discharge criteria:**\n- Asymptomatic, normal exam, normal imaging\n- Object known to have passed OR very low-risk gastric position\n- Family understands return precautions\n- Follow-up arranged (GI / pulm / ENT as appropriate)\n\n**Return precautions (give all families):**\n- Difficulty breathing, persistent cough or wheeze\n- Drooling, refusing PO, vomiting, abdominal pain\n- Fever, blood in stool, hematemesis\n- Chest or back pain\n\n**Prevention / anticipatory guidance** [1,18]\n- Foods to avoid age <4yr: whole grapes, hot dogs, popcorn, nuts, hard candy, raw carrots — cut into small pieces\n- Keep button batteries, magnets, coins, small toys out of reach\n- CPSC Reese\'s Law (2024): button battery compartments must be child-resistant — counsel families to check household devices\n- Banned high-powered magnet sets (CPSC 2022) — remove from home',
    citation: [1, 18],
    next: 'peds-fb-discharge',
    summary: 'Admit any post-op + BB + multiple magnets; D/C with strict precautions; counsel on food age cutoffs + battery/magnet safety',
  },

  {
    id: 'peds-fb-discharge',
    type: 'result',
    module: 7,
    title: 'Pathway Complete',
    body: 'Pediatric foreign body pathway complete.\n\n**Documentation reminders:**\n- Witnessed event details (object, time, witness)\n- Imaging findings\n- Procedures performed\n- Mitigation given (honey/sucralfate timing for BB)\n- Family education provided and return precautions documented',
    recommendation: 'Discharge or admit per disposition criteria with appropriate follow-up.',
    confidence: 'definitive',
    summary: 'Document everything — witness, object, time, mitigation, education',
  },
];
