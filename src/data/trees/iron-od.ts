// MedKitt — Iron Overdose
// Common pediatric poisoning - looks like candy. Elemental iron calculation → Stage recognition → GI decontamination → Deferoxamine → Rescue therapies → Disposition
// 7 modules: Recognition & Toxicity → Classic Stages → Diagnostic Workup → GI Decontamination → Deferoxamine Therapy → Rescue Therapies → Disposition
// 25 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const IRON_OD_CRITICAL_ACTIONS = [
  { text: 'Calculate ELEMENTAL iron dose (ferrous sulfate 20%, gluconate 12%, fumarate 33%)', nodeId: 'iron-start' },
  { text: 'Serum iron level at 4-6 hours post-ingestion (peak absorption)', nodeId: 'iron-workup' },
  { text: 'Activated charcoal does NOT work for iron - use whole bowel irrigation if pills visible', nodeId: 'iron-gi-decon' },
  { text: 'Deferoxamine if iron >500 mcg/dL OR severe symptoms (shock, acidosis, AMS)', nodeId: 'iron-deferoxamine' },
  { text: 'Start deferoxamine at 5 mg/kg/hr IV, titrate to 15 mg/kg/hr (max 6g/24h)', nodeId: 'iron-dfo-dosing' },
  { text: 'Do NOT rely on "vin rose" urine to guide therapy (unreliable)', nodeId: 'iron-dfo-duration' },
  { text: 'Continue deferoxamine until clinical improvement AND iron normalized AND acidosis resolved', nodeId: 'iron-dfo-duration' },
  { text: 'Monitor for Stage 2 "latent phase" - apparent improvement while toxicity progresses', nodeId: 'iron-stages' },
  { text: 'Whole bowel irrigation: GoLYTELY 500 mL/hr peds, 1-2 L/hr adults until clear effluent', nodeId: 'iron-wbi' },
];

export const IRON_OD_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & TOXICITY THRESHOLDS
  // =====================================================================

  {
    id: 'iron-start',
    type: 'question',
    module: 1,
    title: 'Iron Overdose — Recognition & Toxicity',
    body: '**Iron Overdose Steps Summary**\n\nIron is a **common pediatric poisoning** - prenatal vitamins and children\'s chewables look like candy. Toxicity depends on **elemental iron content**, not total pill weight. [1][2]\n\n**Elemental iron content by formulation:**\n- **Ferrous sulfate:** 20% elemental iron\n- **Ferrous gluconate:** 12% elemental iron\n- **Ferrous fumarate:** 33% elemental iron\n\n**Toxicity thresholds (elemental iron):** [1][2]\n- **<20 mg/kg:** Minimal/no toxicity expected\n- **20-60 mg/kg:** GI symptoms, possible systemic toxicity\n- **>60 mg/kg:** Serious systemic toxicity likely\n- **>200-250 mg/kg:** Potentially lethal\n\n**Mechanism:** Free iron causes direct GI mucosal injury (hemorrhagic gastroenteritis) and systemic toxicity via free radical formation, lipid peroxidation, and mitochondrial dysfunction leading to metabolic acidosis and cardiovascular collapse. [2]\n\nCalculate elemental iron dose:',
    images: [
      { src: 'images/iron-od/iron-od-abdominal-xray.jpg', alt: 'Abdominal X-ray showing radiopaque substances in stomach', caption: 'Abdominal X-ray showing radiopaque material in the GI tract. Iron tablets are radiopaque and visible on plain film — a negative X-ray does NOT exclude ingestion (liquid, chewable, or dissolved tablets may not be visible). CC BY-SA 4.0 Wikimedia Commons.' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'iron-calc', label: 'Elemental Iron Calculator' },
      { id: 'iron-level', label: 'Iron Level Interpretation' },
      { id: 'iron-stages', label: 'Classic Stages Quick Reference' },
    ],
    options: [
      {
        label: '<20 mg/kg Elemental Iron',
        description: 'Minimal toxicity expected - observation only',
        next: 'iron-minimal',
      },
      {
        label: '20-60 mg/kg Elemental Iron',
        description: 'Potential toxicity - evaluate and monitor',
        next: 'iron-moderate-eval',
      },
      {
        label: '>60 mg/kg Elemental Iron',
        description: 'Serious toxicity expected - aggressive treatment',
        next: 'iron-severe-eval',
        urgency: 'urgent',
      },
      {
        label: 'Unknown Amount Ingested',
        description: 'Unreliable history or unknown formulation',
        next: 'iron-unknown',
      },
    ],
    summary: 'Iron OD: >60 mg/kg elemental iron is potentially lethal — toxicity peaks at 6-24 hours',
    safetyLevel: 'critical',
  },

  {
    id: 'iron-minimal',
    type: 'info',
    module: 1,
    title: 'Minimal Ingestion (<20 mg/kg)',
    body: '**Elemental iron <20 mg/kg is unlikely to cause significant toxicity.** [1][4]\n\n**Management:**\n- **No GI decontamination needed**\n- **No labs required** if asymptomatic\n- Observe for 6 hours from time of ingestion\n- Discharge if remains asymptomatic with no GI symptoms\n\n**Reasons to upgrade concern:**\n- Development of any GI symptoms (nausea, vomiting, diarrhea, abdominal pain)\n- Blood in stool\n- Altered mental status\n- Unreliable history\n\n**Return precautions:** Vomiting, bloody stool, abdominal pain, lethargy, confusion.\n\n**Poison Control: 1-800-222-1222**',
    citation: [1, 4],
    next: 'iron-dispo-observe',
    summary: '<20 mg/kg elemental iron: minimal toxicity expected — observe 6h, discharge if asymptomatic',
    skippable: true,
  },

  {
    id: 'iron-unknown',
    type: 'info',
    module: 1,
    title: 'Unknown Ingestion Amount',
    body: '**Unable to calculate elemental iron dose - treat based on clinical presentation and labs.** [1][2]\n\n**Immediate actions:**\n- Draw serum iron level at 4-6 hours post-ingestion\n- Abdominal X-ray (iron tablets are radiopaque, but not all formulations visible)\n- Full labs: CBC, BMP, LFTs, coags, lactate, type & screen\n- ABG/VBG if symptomatic\n\n**Clinical indicators of significant ingestion:**\n- Persistent vomiting\n- Hematemesis or bloody diarrhea\n- Abdominal pain\n- Altered mental status\n- Metabolic acidosis\n\n**When in doubt, assume significant ingestion** and manage aggressively. Err on the side of caution with pediatric patients.',
    citation: [1, 2],
    next: 'iron-workup',
    summary: 'Unknown ingestion amount: treat as potentially significant — 6h observation minimum, check serum iron',
  },

  // =====================================================================
  // MODULE 2: CLASSIC STAGES OF IRON POISONING
  // =====================================================================

  {
    id: 'iron-stages',
    type: 'info',
    module: 2,
    title: 'Classic Stages of Iron Poisoning',
    body: '**Iron Poisoning Stages**\n\n**Five classic stages - timing is approximate:** [2][3]\n\n**Stage 1 (0-6 hours) - GI Phase:**\n- Nausea, vomiting, diarrhea, abdominal pain\n- GI hemorrhage (hematemesis, melena, hematochezia)\n- Direct corrosive injury to GI mucosa\n\n**Stage 2 (6-24 hours) - Latent Phase:**\n- Apparent clinical improvement\n- **"Quiescent period" - DO NOT BE FOOLED**\n- Patient may appear stable while cellular toxicity progresses\n- Resolution of GI symptoms does NOT mean resolution of toxicity\n\n**Stage 3 (12-48 hours) - Shock Phase:**\n- Cardiovascular collapse\n- Profound metabolic acidosis (AG)\n- Coagulopathy\n- Shock refractory to fluids\n\n**Stage 4 (2-4 days) - Hepatotoxicity:**\n- Hepatic necrosis (iron is directly hepatotoxic)\n- Hypoglycemia\n- Coagulopathy worsens\n- May progress to hepatic failure\n\n**Stage 5 (2-6 weeks) - GI Scarring:**\n- Gastric outlet obstruction\n- Pyloric stenosis\n- Intestinal strictures\n- Late complication of survived severe poisoning',
    citation: [2, 3],
    calculatorLinks: [
      { id: 'iron-stages', label: 'Classic Stages Quick Reference' },
    ],
    next: 'iron-workup',
    summary: 'Phase 1 (0-6h): GI. Phase 2 (6-24h): deceptive calm. Phase 3 (12-48h): shock and organ failure',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 3: DIAGNOSTIC WORKUP
  // =====================================================================

  {
    id: 'iron-moderate-eval',
    type: 'info',
    module: 3,
    title: 'Moderate Ingestion (20-60 mg/kg) - Evaluation',
    body: '**Elemental iron 20-60 mg/kg - potential for significant toxicity.** [1][2]\n\n**Immediate actions:**\n- IV access\n- Draw serum iron level at 4-6 hours post-ingestion (peak level)\n- Abdominal X-ray - radiopaque tablets may be visible\n- Labs: CBC, BMP, LFTs, coags, lactate, type & screen\n- ABG/VBG if any symptoms present\n\n**Observe closely for Stage 1 symptoms:**\n- Nausea, vomiting, diarrhea\n- Abdominal pain\n- GI bleeding\n\n**Consider GI decontamination** if significant pill burden on X-ray or recent ingestion of large amounts.',
    citation: [1, 2],
    next: 'iron-workup',
    summary: 'Moderate (20-60 mg/kg): obtain serum iron at 4-6h, abdominal XR, BMP, CBC, coags, LFTs',
  },

  {
    id: 'iron-severe-eval',
    type: 'info',
    module: 3,
    title: 'Severe Ingestion (>60 mg/kg) - Evaluation',
    body: '**Elemental iron >60 mg/kg - expect serious systemic toxicity.** [1][2][3]\n\n**Immediate actions:**\n- Large bore IV access x2\n- Aggressive IV fluid resuscitation\n- Type & screen (may need transfusion)\n- Draw serum iron level at 4-6 hours post-ingestion\n- Abdominal X-ray\n- Labs: CBC, BMP, LFTs, coags, lactate, ABG\n\n**Anticipate:**\n- GI hemorrhage - prepare for blood products\n- Metabolic acidosis - may need bicarbonate\n- Cardiovascular collapse\n- Need for deferoxamine\n- Possible whole bowel irrigation\n\n**Call Poison Control early: 1-800-222-1222**\n\nThese patients need ICU admission.',
    citation: [1, 2, 3],
    next: 'iron-workup',
    summary: 'Severe (>60 mg/kg): aggressive resuscitation, early deferoxamine, monitor for organ failure',
    safetyLevel: 'critical',
  },

  {
    id: 'iron-workup',
    type: 'question',
    module: 3,
    title: 'Diagnostic Workup',
    body: '**Serum iron level is the key diagnostic test.** [1][2][3]\n\n**Timing:** Draw at **4-6 hours post-ingestion** (peak absorption). Earlier levels may underestimate toxicity.\n\n**Interpretation:** [1][2]\n- **<350 mcg/dL:** Usually minimal symptoms\n- **350-500 mcg/dL:** Moderate toxicity\n- **>500 mcg/dL:** Severe toxicity - deferoxamine indicated\n\n**TIBC (Total Iron Binding Capacity):**\n- **NOT useful** in acute poisoning\n- Falsely elevated in iron overdose\n- Do NOT use TIBC to guide management [1]\n\n**Other studies:**\n- **Abdominal X-ray:** Radiopaque pills (not all formulations visible; liquids and chewables often not seen)\n- **ABG:** Metabolic acidosis = severe toxicity marker\n- **Lactate:** Elevated = tissue hypoperfusion\n- **CBC:** Leukocytosis common; monitor for GI bleeding\n- **BMP:** Anion gap acidosis, renal function\n- **LFTs:** Baseline and trend (hepatotoxicity Stage 4)\n- **Coags:** Coagulopathy = severe toxicity or hepatic failure\n\nWhat is the serum iron level?',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'iron-level', label: 'Iron Level Interpretation' },
    ],
    options: [
      {
        label: 'Iron <350 mcg/dL',
        description: 'Minimal toxicity expected',
        next: 'iron-low-level',
      },
      {
        label: 'Iron 350-500 mcg/dL',
        description: 'Moderate toxicity - supportive care, consider deferoxamine',
        next: 'iron-moderate-level',
        urgency: 'urgent',
      },
      {
        label: 'Iron >500 mcg/dL',
        description: 'Severe toxicity - deferoxamine indicated',
        next: 'iron-high-level',
        urgency: 'critical',
      },
      {
        label: 'Pills Visible on X-ray',
        description: 'Ongoing absorption - consider GI decontamination',
        next: 'iron-gi-decon',
      },
    ],
    summary: 'STAT labs: serum iron (4-6h peak), BMP, CBC, coags, LFTs, VBG — abdominal XR for radiopaque tablets',
  },

  {
    id: 'iron-low-level',
    type: 'info',
    module: 3,
    title: 'Iron Level <350 mcg/dL',
    body: '**Serum iron <350 mcg/dL at 4-6 hours post-ingestion suggests minimal toxicity.** [1][2]\n\n**Management:**\n- Supportive care\n- IV fluids for hydration\n- Antiemetics PRN\n- Serial clinical reassessment\n\n**No deferoxamine needed** for levels <350 mcg/dL in absence of symptoms.\n\n**Reasons to escalate treatment:**\n- Persistent GI symptoms despite level <350\n- GI hemorrhage\n- Metabolic acidosis\n- Altered mental status\n- Clinical deterioration\n\n**If asymptomatic with level <350:**\n- 6-hour observation\n- Repeat labs at 6 hours if any concern\n- Discharge if remains well',
    citation: [1, 2],
    next: 'iron-dispo-observe',
    summary: 'Serum iron <350: generally non-toxic — observe, supportive care, discharge if asymptomatic at 6h',
    skippable: true,
  },

  {
    id: 'iron-moderate-level',
    type: 'info',
    module: 3,
    title: 'Iron Level 350-500 mcg/dL',
    body: '**Serum iron 350-500 mcg/dL indicates moderate toxicity.** [1][2]\n\n**Management:**\n- IV fluids - aggressive hydration\n- Antiemetics\n- Serial labs q4-6h (iron level, CBC, BMP, coags, lactate)\n- Close monitoring for progression\n\n**Consider deferoxamine if ANY of the following:** [1][2]\n- Symptomatic (persistent vomiting, diarrhea, abdominal pain)\n- Metabolic acidosis (even mild)\n- Signs of systemic toxicity (lethargy, tachycardia)\n- Level trending upward\n- Clinical deterioration\n\n**Admit for observation** - these patients can deteriorate during the "latent phase."',
    citation: [1, 2],
    next: 'iron-deferoxamine',
    summary: 'Serum iron 350-500: moderate toxicity — IV fluids, monitor closely, consider WBI if tablets visible on XR',
  },

  {
    id: 'iron-high-level',
    type: 'info',
    module: 3,
    title: 'Iron Level >500 mcg/dL - Severe Toxicity',
    body: '**Serum iron >500 mcg/dL = severe poisoning. Deferoxamine is indicated.** [1][2][3]\n\n**Immediate actions:**\n- Start deferoxamine\n- Aggressive IV fluid resuscitation\n- ICU admission\n- Serial labs q4h\n- Prepare for cardiovascular collapse\n\n**Clinical features to expect:**\n- Hemorrhagic gastroenteritis\n- Metabolic acidosis (high anion gap)\n- Coagulopathy\n- Cardiovascular instability\n- Altered mental status\n\n**Call Poison Control: 1-800-222-1222**\n\nThese patients are critically ill.',
    citation: [1, 2, 3],
    next: 'iron-deferoxamine',
    summary: 'Serum iron >500: severe toxicity — start deferoxamine 15 mg/kg/hr, ICU admission',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: GI DECONTAMINATION
  // =====================================================================

  {
    id: 'iron-gi-decon',
    type: 'question',
    module: 4,
    title: 'GI Decontamination',
    body: '**GI Decontamination in Iron Overdose**\n\n**Activated charcoal does NOT adsorb iron - it is NOT effective.** [1][2]\n\n**Whole Bowel Irrigation (WBI):** [1][2][4]\n- **Indication:** Large ingestion, pill fragments visible on X-ray, sustained-release formulations\n- **Solution:** GoLYTELY (PEG-electrolyte solution)\n- **Pediatric dose:** 500 mL/hr via NG tube\n- **Adult dose:** 1-2 L/hr via NG tube\n- **Endpoint:** Clear rectal effluent AND no pills on repeat X-ray\n\n**Gastric Lavage:**\n- Only consider for recent massive ingestion\n- Requires large bore orogastric tube\n- Iron tablets may be too large to pass through tube\n- Risk of aspiration\n\n**Endoscopic Removal:**\n- Consider for bezoars or large pill masses\n- Tablets may coalesce into concretions\n\nSelect decontamination approach:',
    citation: [1, 2, 4],
    calculatorLinks: [
      { id: 'iron-wbi', label: 'Whole Bowel Irrigation Protocol' },
    ],
    options: [
      {
        label: 'Whole Bowel Irrigation',
        description: 'Pills on X-ray or large ingestion',
        next: 'iron-wbi',
      },
      {
        label: 'No Decontamination Needed',
        description: 'No pills on X-ray, small ingestion, >2 hours since ingestion',
        next: 'iron-workup',
      },
      {
        label: 'Consider Endoscopy',
        description: 'Bezoar, pill mass, or failed WBI',
        next: 'iron-endoscopy',
      },
    ],
    summary: 'Activated charcoal does NOT bind iron — WBI with GoLYTELY is the only effective GI decontamination',
    safetyLevel: 'warning',
  },

  {
    id: 'iron-wbi',
    type: 'info',
    module: 4,
    title: 'Whole Bowel Irrigation Protocol',
    body: '**GoLYTELY Protocol**\n\n**Whole bowel irrigation mechanically flushes iron tablets through the GI tract.** [1][4]\n\n**Indications:**\n- Large ingestion (>60 mg/kg elemental iron)\n- Visible pills/fragments on abdominal X-ray\n- Sustained-release iron preparations\n- Ongoing GI absorption suspected\n\n**Contraindications:**\n- Unprotected airway (intubate first if needed)\n- Bowel obstruction or perforation\n- Ileus\n- Hemodynamic instability (stabilize first)\n- Intractable vomiting (may need antiemetics/prokinetics)\n\n**Protocol:**\n- Insert NG tube\n- **Pediatric:** 500 mL/hr (25 mL/kg/hr, max 500 mL/hr)\n- **Adult:** 1-2 L/hr (start at 1 L/hr, increase as tolerated)\n- Position patient upright or on left side\n- Use bedside commode or rectal tube for effluent\n\n**Continue until:**\n- Rectal effluent is clear\n- Repeat abdominal X-ray shows no remaining pills\n- Typically requires 4-6+ hours\n\n**Complications:** Vomiting, abdominal distension, electrolyte abnormalities.',
    citation: [1, 4],
    treatment: {
      firstLine: {
        drug: 'GoLYTELY (PEG-electrolyte solution)',
        dose: 'Peds: 500 mL/hr (25 mL/kg/hr, max 500 mL/hr); Adults: 1-2 L/hr',
        route: 'NG tube',
        frequency: 'Continuous infusion',
        duration: 'Until clear effluent and no pills on X-ray',
        notes: 'Contraindicated if unprotected airway, bowel obstruction, ileus, or hemodynamic instability.',
      },
      monitoring: 'Serial abdominal X-rays to confirm pill clearance. Monitor for vomiting, distension, electrolyte abnormalities.',
    },
    next: 'iron-workup',
    summary: 'WBI: GoLYTELY 1-2 L/hr (adult) via NG until clear effluent and no tablets on repeat XR',
  },

  {
    id: 'iron-endoscopy',
    type: 'info',
    module: 4,
    title: 'Endoscopic Removal',
    body: '**Endoscopic removal may be needed for iron bezoars or large pill concretions.** [1][2]\n\n**Indications:**\n- Large pill mass visible on X-ray\n- Failed whole bowel irrigation\n- Bezoar formation\n- Gastric concretion with ongoing absorption\n\n**Considerations:**\n- Iron tablets can coalesce into hard concretions\n- Mucosal injury may complicate endoscopy\n- Risk of perforation with friable GI mucosa\n- May require surgical consultation\n\n**Surgical removal** is rarely needed but may be considered for:\n- Massive concretion\n- Failed endoscopy\n- Perforation\n- Ongoing clinical deterioration despite aggressive management\n\n**Consult GI and/or surgery early** for patients with large pill burdens.',
    citation: [1, 2],
    next: 'iron-workup',
    summary: 'Endoscopic removal for massive tablet load not clearing with WBI — rarely needed',
    skippable: true,
  },

  // =====================================================================
  // MODULE 5: DEFEROXAMINE THERAPY
  // =====================================================================

  {
    id: 'iron-deferoxamine',
    type: 'question',
    module: 5,
    title: 'Deferoxamine Therapy',
    body: '**Deferoxamine Protocol**\n\n**Mechanism:** Deferoxamine chelates free (unbound) iron, forming ferrioxamine - a water-soluble complex excreted by the kidneys. [1][2][3]\n\n**Indications for deferoxamine:** [1][2]\n- Peak serum iron **>500 mcg/dL**\n- **Severe symptoms** regardless of level:\n  - Shock or hypotension\n  - Altered mental status\n  - Metabolic acidosis\n  - Significant GI bleeding\n  - Lethargy or coma\n- **Clinical deterioration** despite supportive care\n\n**Deferoxamine does NOT rely on iron level alone** - treat the patient, not the number. A symptomatic patient with lower levels may still need chelation.\n\nDoes the patient meet deferoxamine criteria?',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'iron-dfo', label: 'Deferoxamine Dosing Protocol' },
    ],
    options: [
      {
        label: 'Start Deferoxamine',
        description: 'Level >500 OR severe symptoms',
        next: 'iron-dfo-dosing',
        urgency: 'critical',
      },
      {
        label: 'Observe Without Deferoxamine',
        description: 'Level <500 AND asymptomatic/mild symptoms',
        next: 'iron-moderate-level',
      },
    ],
    summary: 'Deferoxamine 15 mg/kg/hr IV continuous — start if serum iron >500 or shock/metabolic acidosis',
    safetyLevel: 'critical',
  },

  {
    id: 'iron-dfo-dosing',
    type: 'info',
    module: 5,
    title: 'Deferoxamine Dosing',
    body: '**Deferoxamine**\n\n**IV Infusion (preferred route):** [1][2][4]\n\n**Starting dose:** 5 mg/kg/hr IV\n**Titrate up to:** 15 mg/kg/hr as tolerated\n**Maximum dose:** 6 grams per 24 hours in adults [1]\n\n**Rate titration:**\n- Start at 5 mg/kg/hr to minimize hypotension\n- Increase by 5 mg/kg/hr every 30-60 minutes as BP tolerates\n- Target 15 mg/kg/hr in severe poisoning\n\n**IM route (if no IV access):**\n- 90 mg/kg IM (max 1 g per injection site)\n- Only use temporarily until IV access obtained\n- Less reliable absorption\n\n**"Vin rose" urine:** [2]\n- Classically described pinkish-orange urine indicates ferrioxamine excretion\n- **NOT reliable** - absence does not mean chelation isn\'t working\n- Do NOT use urine color to guide therapy',
    citation: [1, 2, 4],
    treatment: {
      firstLine: {
        drug: 'Deferoxamine',
        dose: 'Start 5 mg/kg/hr, titrate to 15 mg/kg/hr',
        route: 'IV infusion',
        frequency: 'Continuous infusion',
        duration: 'Until clinical improvement and iron normalized (usually 24-48 hours)',
        notes: 'Max 6 g/24h in adults. Start low to avoid hypotension, titrate up as tolerated.',
      },
      alternative: {
        drug: 'Deferoxamine',
        dose: '90 mg/kg IM (max 1 g per site)',
        route: 'IM',
        frequency: 'May repeat q4-6h',
        duration: 'Until IV access obtained',
        notes: 'IM only if no IV access. Convert to IV as soon as possible.',
      },
      monitoring: 'BP closely during infusion (hypotension). Urine output. Serial iron levels, lactate, ABG. Continue until clinically improved.',
    },
    next: 'iron-dfo-duration',
    summary: 'Deferoxamine 15 mg/kg/hr continuous IV — max 6-8 g/day, vin rosé urine = chelation working',
  },

  {
    id: 'iron-dfo-duration',
    type: 'info',
    module: 5,
    title: 'Deferoxamine - Duration & Monitoring',
    body: '**Continue deferoxamine until ALL criteria are met:** [1][2][3]\n\n✅ Patient clinically improved\n✅ Resolution of metabolic acidosis\n✅ Serum iron normalized (<350 mcg/dL)\n✅ Resolution of GI symptoms\n✅ Hemodynamic stability\n\n**Typical duration:** 24-48 hours [2]\n\n**DO NOT use "vin rose" urine color to stop therapy** - it is unreliable. [2]\n\n**Side effects:** [1][2]\n- **Hypotension** - most common, infuse slowly\n- **ARDS** - associated with prolonged infusion (>24 hours)\n- **Yersinia sepsis** - iron is a growth factor for Yersinia; deferoxamine-iron complex provides iron to bacteria [2]\n- Tachycardia\n- Urticaria\n- Visual/auditory disturbances (with chronic use)\n\n**Prolonged deferoxamine (>24 hours):**\n- Increased risk of ARDS\n- Balance ongoing need against this risk\n- Consider if patient not improving despite 24 hours of chelation',
    citation: [1, 2, 3],
    next: 'iron-rescue',
    summary: 'Stop deferoxamine when urine clears, patient improves, and iron <350 — limit to <24h if possible',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 6: RESCUE THERAPIES
  // =====================================================================

  {
    id: 'iron-rescue',
    type: 'question',
    module: 6,
    title: 'Rescue Therapies - Severe Cases',
    body: '**For severe, refractory iron poisoning, additional interventions may be needed.** [2][3]\n\n**Exchange transfusion:** [2]\n- Consider in pediatric massive ingestion\n- Refractory shock despite aggressive resuscitation\n- Removes free iron from circulation\n\n**Hemodialysis:** [2][3]\n- Removes ferrioxamine complex (NOT free iron)\n- Consider if:\n  - Renal failure (cannot excrete ferrioxamine)\n  - ARDS developing from prolonged deferoxamine\n  - Severe refractory acidosis\n- Limited role since free iron is not dialyzable\n\n**Supportive care for complications:**\n- **Vasopressors** for refractory shock\n- **Blood products** for coagulopathy/GI bleeding\n- **Glucose** for hypoglycemia (hepatic failure)\n- **Bicarbonate** for severe acidosis\n\nDoes the patient need rescue therapy?',
    citation: [2, 3],
    options: [
      {
        label: 'Exchange Transfusion',
        description: 'Pediatric massive ingestion, refractory shock',
        next: 'iron-exchange',
        urgency: 'critical',
      },
      {
        label: 'Hemodialysis',
        description: 'Renal failure, ARDS from deferoxamine, severe acidosis',
        next: 'iron-dialysis',
        urgency: 'critical',
      },
      {
        label: 'Supportive Care Only',
        description: 'Responding to deferoxamine and standard treatment',
        next: 'iron-supportive',
      },
    ],
    summary: 'Refractory iron toxicity: consider exchange transfusion or dialysis (removes deferoxamine-iron complex)',
  },

  {
    id: 'iron-exchange',
    type: 'info',
    module: 6,
    title: 'Exchange Transfusion',
    body: '**Exchange transfusion removes iron-laden blood and replaces with fresh blood.** [2]\n\n**Indications:**\n- Pediatric massive ingestion with refractory shock\n- Cardiovascular collapse not responding to deferoxamine + fluids + pressors\n- Profound metabolic acidosis not improving\n\n**Logistics:**\n- Requires large bore central venous access\n- Typically performed in ICU or PICU\n- Consult hematology/transfusion medicine\n- May exchange 1-2 blood volumes\n\n**Limitations:**\n- Resource-intensive\n- Requires adequate blood bank supply\n- Complications: hypothermia, hypocalcemia, coagulopathy\n\n**This is a salvage therapy for the most severe cases.**',
    citation: [2],
    next: 'iron-dispo-icu',
    summary: 'Exchange transfusion for massive ingestions not responding to deferoxamine — rarely needed',
    skippable: true,
  },

  {
    id: 'iron-dialysis',
    type: 'info',
    module: 6,
    title: 'Hemodialysis in Iron Poisoning',
    body: '**Hemodialysis has a LIMITED role in iron poisoning.** [2][3]\n\n**What dialysis does:**\n- Removes ferrioxamine (deferoxamine-iron complex)\n- Does NOT remove free iron (protein-bound)\n- Corrects severe metabolic acidosis\n- Supports renal failure\n\n**Indications:**\n- Renal failure preventing ferrioxamine excretion\n- ARDS developing from prolonged deferoxamine (>24h)\n- Severe refractory metabolic acidosis\n- Volume overload from aggressive resuscitation\n\n**Dialysis is NOT a substitute for deferoxamine** - continue chelation during dialysis.\n\n**CRRT (continuous renal replacement therapy):**\n- Alternative for hemodynamically unstable patients\n- Slower solute clearance but better tolerated',
    citation: [2, 3],
    next: 'iron-dispo-icu',
    summary: 'Hemodialysis removes deferoxamine-iron complex (ferrioxamine) — consider in renal failure',
    skippable: true,
  },

  {
    id: 'iron-supportive',
    type: 'info',
    module: 6,
    title: 'Supportive Care',
    body: '**Comprehensive supportive care is essential.** [1][2]\n\n**Fluid resuscitation:**\n- Aggressive crystalloid for hypovolemia\n- GI losses can be massive\n- Target adequate urine output\n\n**Blood products:**\n- PRBCs for anemia from GI bleeding\n- FFP/platelets for coagulopathy\n- Type & screen early - may need multiple units\n\n**Vasopressors:**\n- Norepinephrine first-line for refractory shock\n- May need multiple agents\n\n**Glucose:**\n- Monitor for hypoglycemia (hepatic failure)\n- D10W infusion if needed\n\n**Acidosis:**\n- Bicarbonate for pH <7.1 (controversial, supportive)\n- Address underlying cause (resuscitation, deferoxamine)\n\n**Serial labs:**\n- Iron level q4-6h until normalizing\n- CBC, BMP, LFTs, coags, lactate\n- ABG for acidosis monitoring',
    citation: [1, 2],
    next: 'iron-dispo-icu',
    summary: 'Aggressive IV fluids for GI losses, correct coagulopathy, monitor for hepatic failure at 48-72h',
  },

  // =====================================================================
  // MODULE 7: DISPOSITION
  // =====================================================================

  {
    id: 'iron-dispo-observe',
    type: 'result',
    module: 7,
    title: 'Disposition - 6-Hour Observation',
    body: '**Low-risk ingestion - 6-hour observation period.** [1][4]\n\n**Criteria for observation only:**\n- Elemental iron <20 mg/kg ingested\n- Asymptomatic at presentation\n- No pills visible on X-ray (if obtained)\n- Iron level <350 mcg/dL (if drawn)\n\n**Safe to discharge after 6 hours if:**\n✅ Remains asymptomatic (no GI symptoms)\n✅ No abdominal pain\n✅ Normal mental status\n✅ If labs obtained: normal or non-concerning\n\n**Return precautions:**\n- Vomiting, bloody stool, severe abdominal pain\n- Lethargy, confusion, passing out\n- Any concerning symptoms\n\n**Poison Control: 1-800-222-1222**\n\n**Child safety counseling** for pediatric ingestions - secure iron supplements out of reach.',
    recommendation: 'Discharge after 6-hour asymptomatic observation. Provide return precautions and safety counseling.',
    confidence: 'recommended',
    citation: [1, 4],
    summary: 'Observe 6h minimum for all >20 mg/kg ingestions — discharge if asymptomatic with normal labs',
  },

  {
    id: 'iron-dispo-admit',
    type: 'result',
    module: 7,
    title: 'Disposition - Admit for Monitoring',
    body: '**Admit for monitoring and continued care.** [1][2]\n\n**Admission criteria:**\n- Any symptomatic patient (GI symptoms, lethargy)\n- Iron level 350-500 mcg/dL\n- Elemental iron ingested 20-60 mg/kg\n- Ongoing GI decontamination (WBI)\n- Unreliable history with concerning features\n- Pediatric patient with significant ingestion\n\n**Monitoring:**\n- Serial iron levels q4-6h until trending down\n- CBC, BMP, LFTs, coags\n- Clinical reassessment for Stage 2-3 progression\n\n**Escalate to ICU if:**\n- Deferoxamine required\n- Metabolic acidosis develops\n- Hemodynamic instability\n- Altered mental status\n- GI hemorrhage\n\n**Watch for the "latent phase"** - clinical improvement does not mean resolution of toxicity.',
    recommendation: 'Admit for serial monitoring. Low threshold for ICU transfer if clinical deterioration.',
    confidence: 'recommended',
    citation: [1, 2],
    summary: 'Admit moderate toxicity: persistent GI symptoms, elevated serum iron, or WBI in progress',
  },

  {
    id: 'iron-dispo-icu',
    type: 'result',
    module: 7,
    title: 'Disposition - ICU Admission',
    body: '**ICU admission for severe iron poisoning.** [1][2][3]\n\n**ICU criteria:**\n- Deferoxamine therapy required\n- Iron level >500 mcg/dL\n- Elemental iron ingested >60 mg/kg\n- Metabolic acidosis\n- Cardiovascular instability / shock\n- Altered mental status\n- Significant GI hemorrhage\n- Need for rescue therapies (exchange, dialysis)\n\n**ICU management:**\n- Continuous deferoxamine infusion\n- Aggressive fluid resuscitation\n- Vasopressor support as needed\n- Blood product transfusion\n- Serial labs q4h: iron, CBC, BMP, LFTs, coags, lactate, ABG\n- Repeat imaging to assess pill clearance\n- Close monitoring for Stage 3-4 progression\n\n**Consult:**\n- Poison Control: 1-800-222-1222\n- Toxicology\n- Nephrology (if considering dialysis)\n- Pediatric ICU (if pediatric patient)\n\n**Mortality in severe iron poisoning** correlates with peak iron level, degree of acidosis, and time to treatment.',
    recommendation: 'ICU admission for close monitoring and aggressive treatment. Continue deferoxamine until all stopping criteria met.',
    confidence: 'definitive',
    citation: [1, 2, 3],
    summary: 'ICU for severe toxicity: deferoxamine infusion, shock, metabolic acidosis, or organ failure',
  },

];

export const IRON_OD_NODE_COUNT = IRON_OD_NODES.length;

export const IRON_OD_MODULE_LABELS = [
  'Recognition & Toxicity',
  'Classic Stages',
  'Diagnostic Workup',
  'GI Decontamination',
  'Deferoxamine Therapy',
  'Rescue Therapies',
  'Disposition',
];

export const IRON_OD_CITATIONS: Citation[] = [
  { num: 1, text: 'Manoguerra AS, et al. Iron Ingestion: An Evidence-Based Consensus Guideline for Out-of-Hospital Management. Clin Toxicol (Phila). 2005;43(6):553-570. PMID 16255338' },
  { num: 2, text: 'Perrone J. Iron. In: Nelson LS, Howland MA, Lewin NA, et al., eds. Goldfrank\'s Toxicologic Emergencies. 11th ed. McGraw-Hill; 2019.' },
  { num: 3, text: 'Chang TP, Rangan C. Iron Poisoning: A Literature-Based Review of Epidemiology, Diagnosis, and Management. Pediatr Emerg Care. 2011;27(10):978-985. PMID 21975503' },
  { num: 4, text: 'Baranwal AK, Singhi SC. Acute Iron Poisoning: Management Guidelines. Indian Pediatr. 2003;40(6):534-540. PMID 12824662' },
];
