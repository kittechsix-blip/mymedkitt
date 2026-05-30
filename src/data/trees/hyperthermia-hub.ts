// MedKitt - Hyperthermia Hub
// Distinguishes true hyperthermia (failed thermoregulation) from fever, then routes
// to the correct cause-specific consult. Routing hub - does not duplicate management.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const HYPERTHERMIA_HUB_CRITICAL_ACTIONS = [
  { text: 'Measure a CORE temperature (rectal/esophageal/bladder) - peripheral temps underestimate; >40C with AMS is a cooling emergency', nodeId: 'hyper-start' },
  { text: 'For temp >40C with altered mental status, start active cooling within minutes - do not wait for the diagnosis', nodeId: 'hyper-cooling' },
  { text: 'Antipyretics (acetaminophen/NSAIDs) do NOT work in true hyperthermia - the set point is normal; the problem is heat dissipation', nodeId: 'hyper-cooling' },
  { text: 'Do not discharge undifferentiated hyperthermia with AMS, rigidity, rhabdomyolysis, or hemodynamic instability', nodeId: 'hyper-dispo' },
];

export const HYPERTHERMIA_HUB_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION / SICK CHECK
  // =====================================================================
  {
    id: 'hyper-start',
    type: 'info',
    module: 1,
    title: 'Hyperthermia Hub - Core Temp First',
    body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Heat stroke** \u2014 core >40\u00B0C + altered mentation \u2192 immediate active cooling.\n2. **Neuroleptic malignant syndrome** \u2014 rigidity + hyperthermia + dopamine-blocker exposure.\n3. **Serotonin syndrome** \u2014 clonus, hyperreflexia, agitation, serotonergic drugs.\n4. **Thyroid storm** \u2014 fever, tachyarrhythmia, agitation, goiter/Graves history.\n5. **Malignant hyperthermia / sepsis** \u2014 recent anesthesia (succinylcholine/volatiles), or infectious source.\n\nOpen first:\n- [Hub Steps Summary](#/info/hyper-steps)\n- [Hub Stop / Pitfalls](#/info/hyper-stop)\n\n**Hyperthermia vs fever - they are not the same:**\n- **Fever** = the hypothalamic set point is RAISED (infection, inflammation). Antipyretics work. Skin can sweat.\n- **True hyperthermia** = set point is NORMAL but heat production exceeds dissipation (heat illness, toxidromes, NMS, thyroid storm). Antipyretics do NOT work. Active cooling does.\n\n**First 60 seconds:**\n- **Core temperature** (rectal/esophageal/bladder). Peripheral/oral temps underestimate - a normal axillary temp does not exclude life-threatening core hyperthermia.\n- ABCs, continuous monitoring, IV access, fingerstick glucose.\n- If **core >40C (104F) with altered mental status** -> this is a cooling emergency. Start active cooling NOW (see Cooling Principles) while you work the cause.\n- Quick scan: drug/medication history, environmental exposure/exertion, muscle tone (rigid vs clonus vs flaccid), pupils, skin (sweating vs dry), recent anesthesia.\n\nIf infection physiology is plausible (source, rigors, immunocompromise), run [Sepsis Management](#/tree/sepsis) in parallel - fever and hyperthermia can coexist.',
    citation: [1, 2],
    next: 'hyper-triage',
    summary: 'Get a CORE temp. True hyperthermia (normal set point, failed dissipation) needs active cooling, not antipyretics. >40C + AMS = cool now.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 2: TIME-CRITICAL TRIAGE - PICK THE DOMINANT CLUE
  // =====================================================================
  {
    id: 'hyper-triage',
    type: 'question',
    module: 2,
    title: 'Pick the Dominant Clue',
    body: 'Match the strongest feature to the most likely cause. You can return after starting cooling. Use the toolbar to jump directly to any pathway.',
    options: [
      { label: 'Exertion or hot environment; collapse during/after heat exposure', description: 'Heat exhaustion / heat stroke - hot skin, may be dry or sweating, no offending drug', next: 'hyper-heat', urgency: 'critical' },
      { label: 'Serotonergic drug + clonus, hyperreflexia, dilated pupils, rapid onset (hours)', description: 'Serotonin syndrome - hyperkinetic, lower-limb clonus is the hallmark', next: 'hyper-serotonin', urgency: 'critical' },
      { label: 'Dopamine antagonist (antipsychotic) + lead-pipe rigidity, slow onset (days), bradyreflexia', description: 'Neuroleptic malignant syndrome', next: 'hyper-nms', urgency: 'critical' },
      { label: 'Hyperthyroid history, AF/tachycardia, agitation, goiter, recent illness/iodine load', description: 'Thyroid storm', next: 'hyper-thyroid', urgency: 'critical' },
      { label: 'Dry/flushed skin, mydriasis, urinary retention, absent bowel sounds, delirium', description: 'Anticholinergic toxidrome', next: 'hyper-anticholinergic', urgency: 'urgent' },
      { label: 'Tinnitus, hyperpnea, mixed respiratory alkalosis + anion-gap metabolic acidosis', description: 'Salicylate toxicity', next: 'hyper-salicylate', urgency: 'critical' },
      { label: 'Source of infection, rigors, hypotension, immunocompromise, lactate concern', description: 'Sepsis / true fever physiology', next: 'hyper-sepsis', urgency: 'critical' },
    ],
    citation: [1, 2, 3],
    summary: 'Branch on the dominant clue: exertion->heat stroke, serotonergic+clonus->SS, antipsychotic+rigidity->NMS, hyperthyroid->storm, dry+mydriasis->anticholinergic, tinnitus/AG->salicylate, infection->sepsis.',
    safetyLevel: 'critical',
  },

  {
    id: 'hyper-heat',
    type: 'result',
    module: 2,
    title: 'Heat Stroke / Heat Illness',
    body: 'Open [Heat Stroke](#/tree/heat-stroke) for the full pathway.\n\n**Defining feature:** core temp >40C with CNS dysfunction after exertional or environmental heat exposure. Skin may be sweating (exertional) or dry (classic/elderly).\n\n**First minutes:** active cooling immediately - cold-water immersion is fastest for exertional heat stroke; evaporative + ice packs to groin/axillae/neck for classic. Stop cooling at ~38.5-39C to avoid overshoot. Cold IV fluids, monitor for rhabdo/AKI/DIC.',
    recommendation: 'Suspected heat stroke: cool first, target ~38.5C, then manage end-organ injury. Cold-water immersion is the fastest cooling method for exertional cases.',
    citation: [4],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },

  {
    id: 'hyper-serotonin',
    type: 'result',
    module: 2,
    title: 'Serotonin Syndrome',
    body: 'Open [Serotonin Syndrome](#/tree/serotonin-syndrome) for Hunter Criteria and treatment.\n\n**Defining features:** serotonergic agent + clonus (spontaneous/inducible/ocular), hyperreflexia worse in the lower limbs, mydriasis, rapid onset (within 24h, often <6h).\n\n**First minutes:** stop the serotonergic agent, benzodiazepines for agitation/myoclonus, active cooling, cyproheptadine for moderate-severe. Distinguish from NMS (rigid + bradyreflexic + slow onset).',
    recommendation: 'Serotonin syndrome: stop the agent, benzodiazepines, cooling, cyproheptadine for moderate-severe. Clonus is the discriminator from NMS.',
    citation: [5],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },

  {
    id: 'hyper-nms',
    type: 'result',
    module: 2,
    title: 'Neuroleptic Malignant Syndrome',
    body: 'Open [NMS](#/tree/nms) for the full pathway.\n\n**Defining features:** dopamine antagonist exposure (antipsychotic, antiemetic) or abrupt dopamine-agonist withdrawal + lead-pipe rigidity, hyperthermia, autonomic instability, AMS, very high CK. Onset over days. Bradyreflexia (opposite of serotonin syndrome).\n\n**First minutes:** stop the offending agent, aggressive cooling, IV fluids, benzodiazepines; dantrolene and/or bromocriptine for severe cases. Bromocriptine is contraindicated in serotonin syndrome - confirm the diagnosis.',
    recommendation: 'NMS: stop the dopamine antagonist, cool, fluids, benzodiazepines; dantrolene/bromocriptine for severe. Rigidity + slow onset distinguishes it from serotonin syndrome.',
    citation: [6],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },

  {
    id: 'hyper-thyroid',
    type: 'result',
    module: 2,
    title: 'Thyroid Storm',
    body: 'Open [Thyroid Disorders](#/tree/thyroid) for the storm pathway.\n\n**Defining features:** known/undiagnosed hyperthyroidism + hyperthermia, tachyarrhythmia (often AF), agitation/delirium, GI/hepatic dysfunction, often a precipitant (infection, surgery, iodine load, DKA). Use the Burch-Wartofsky score.\n\n**First minutes:** beta-blockade (propranolol), thionamide (PTU/methimazole), then iodine at least 1h AFTER thionamide, hydrocortisone, active cooling, treat the precipitant.',
    recommendation: 'Thyroid storm: beta-blocker, thionamide, iodine (>=1h after thionamide), steroids, cooling, treat precipitant. Score with Burch-Wartofsky.',
    citation: [7],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },

  {
    id: 'hyper-anticholinergic',
    type: 'result',
    module: 2,
    title: 'Anticholinergic Toxidrome',
    body: '**"Hot as a hare, dry as a bone, red as a beet, mad as a hatter, blind as a bat."**\n\n**Defining features:** hyperthermia with DRY/flushed skin, mydriasis, urinary retention, absent bowel sounds, delirium, tachycardia. Distinguishes from sympathomimetic (which sweats) and serotonin syndrome (clonus/hyperreflexia).\n\n**First minutes:**\n- Active cooling (evaporative); the skin cannot sweat, so passive cooling fails.\n- Benzodiazepines for agitation.\n- IV fluids; monitor for rhabdo.\n- **Physostigmine** may be considered for pure anticholinergic delirium with a clear agent - avoid if mixed/TCA ingestion or any conduction delay on ECG (seizure/asystole risk). Discuss with toxicology/poison center.\n- Get an ECG to screen for sodium-channel blockade (wide QRS) before considering physostigmine.',
    recommendation: 'Anticholinergic toxidrome: evaporative cooling (dry skin defeats passive cooling), benzodiazepines, fluids. Physostigmine only for pure cases with normal ECG - consult toxicology.',
    citation: [3, 8],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },

  {
    id: 'hyper-salicylate',
    type: 'result',
    module: 2,
    title: 'Salicylate Toxicity',
    body: 'Open [Salicylate Toxicity](#/tree/salicylate) for the full pathway.\n\n**Defining features:** tinnitus, hyperpnea/tachypnea, nausea, AMS, and the classic mixed acid-base picture (primary respiratory alkalosis + primary anion-gap metabolic acidosis). Hyperthermia signals UNCOUPLED oxidative phosphorylation and is a marker of severe, life-threatening toxicity.\n\n**First minutes:** check salicylate level + VBG/ABG, serum alkalinization (sodium bicarbonate) with potassium repletion, glucose (give dextrose even if euglycemic if AMS), and EARLY hemodialysis for severe toxicity (AMS, hyperthermia, level >90-100, renal failure, refractory acidosis). Intubation is dangerous - it can collapse the protective hyperventilation.',
    recommendation: 'Salicylate toxicity with hyperthermia = severe. Alkalinize, replete K, early dialysis. Hyperthermia indicates uncoupled oxidative phosphorylation. Avoid hypoventilation around intubation.',
    citation: [9],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },

  {
    id: 'hyper-sepsis',
    type: 'result',
    module: 2,
    title: 'Sepsis / Fever Physiology',
    body: 'Open [Sepsis Management](#/tree/sepsis).\n\n**When this is true fever, not hyperthermia:** an infectious source, rigors, the set point is raised so antipyretics help, and skin can still sweat. But fever and true hyperthermia can coexist (e.g., infection precipitating thyroid storm or NMS).\n\n**First minutes:** lactate, cultures (do not delay antibiotics), early broad-spectrum antibiotics, fluids for hypoperfusion, source control, vasopressors for persistent hypotension. Reassess for a second hyperthermic process if temp is disproportionate or rigidity/clonus appears.',
    recommendation: 'If infection physiology fits, run the sepsis pathway. Keep a hyperthermic toxidrome/NMS/storm on the differential if temp is disproportionate or neuromuscular signs appear.',
    citation: [10],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },

  // =====================================================================
  // MODULE 3: SHARED COOLING PRINCIPLES
  // =====================================================================
  {
    id: 'hyper-cooling',
    type: 'info',
    module: 3,
    title: 'Cooling Principles (All Causes)',
    body: 'These apply across every true-hyperthermia pathway while the cause-specific consult runs.\n\n**Start now if core >40C with AMS - do not wait for the diagnosis.**\n\n- **Antipyretics do NOT work** in true hyperthermia. The set point is normal; acetaminophen/NSAIDs are ineffective and NSAIDs add renal/GI/coagulopathy risk.\n- **Active external cooling:**\n  - Exertional heat stroke: **cold-water immersion** is fastest.\n  - Other causes / classic heat stroke: **evaporative** (mist + fan) plus ice packs to groin, axillae, neck.\n- **Cold IV fluids** support cooling and perfusion.\n- **Benzodiazepines** reduce agitation, shivering, and muscular heat production (shivering during cooling is counterproductive).\n- **Target ~38.5-39C, then stop** active cooling to avoid overshoot hypothermia.\n- **Intractable hyperthermia (>41C) with rigidity:** consider intubation + paralysis to abolish muscular heat generation. **Avoid succinylcholine** if rhabdomyolysis/hyperkalemia is suspected - use rocuronium/vecuronium.\n- **Cause-specific antidotes are not interchangeable:** cyproheptadine (serotonin syndrome), dantrolene/bromocriptine (NMS), thionamide+beta-blocker+iodine (thyroid storm). Confirm the diagnosis before giving them.\n- Monitor for **rhabdomyolysis, AKI, DIC, hepatic injury** in any severe case.',
    citation: [1, 2, 4],
    next: 'hyper-dispo',
    summary: 'Active cooling (immersion for exertional, evaporative otherwise), cold fluids, benzodiazepines, target ~38.5C then stop. Antipyretics fail. Paralysis for intractable >41C - avoid succinylcholine with rhabdo.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: DISPOSITION
  // =====================================================================
  {
    id: 'hyper-dispo',
    type: 'question',
    module: 4,
    title: 'Disposition',
    body: 'Disposition follows the cause and the severity of end-organ injury.',
    options: [
      { label: 'Core >40C, AMS, rigidity, rhabdo/AKI, DIC, hemodynamic or respiratory instability', description: 'ICU - and the cause-specific consult drives definitive therapy', next: 'hyper-dispo-icu', urgency: 'critical' },
      { label: 'Resolving with cooling, identified reversible cause, no end-organ injury', description: 'Admit/observe with serial core temp and labs', next: 'hyper-dispo-admit' },
    ],
    citation: [1, 2],
    summary: 'ICU for >40C, AMS, rigidity, rhabdo/AKI, DIC, or instability. Admit/observe milder cases with serial monitoring.',
  },

  {
    id: 'hyper-dispo-icu',
    type: 'result',
    module: 4,
    title: 'ICU / Cause-Specific Pathway',
    body: 'ICU for core >40C, persistent AMS, rigidity requiring paralysis, rhabdomyolysis with renal risk, DIC, hepatic injury, or hemodynamic/respiratory instability. The cause-specific consult ([Heat Stroke](#/tree/heat-stroke), [Serotonin Syndrome](#/tree/serotonin-syndrome), [NMS](#/tree/nms), [Thyroid Disorders](#/tree/thyroid), [Salicylate](#/tree/salicylate), [Sepsis](#/tree/sepsis)) drives definitive therapy and monitoring.',
    recommendation: 'Severe undifferentiated or confirmed hyperthermia with end-organ injury is an ICU admission. Continue active cooling and run the cause-specific consult.',
    citation: [1, 2],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },

  {
    id: 'hyper-dispo-admit',
    type: 'result',
    module: 4,
    title: 'Admit / Observation',
    body: 'Admit or observe when hyperthermia is resolving with cooling, the cause is identified and reversible, and there is no end-organ injury. Serial core temperature, CK, renal function, and coagulation studies. Confirm the offending agent is stopped (toxidromes/SS/NMS) and arrange the relevant follow-up.\n\n**Return/escalation precautions:** rising temperature, new rigidity or clonus, falling urine output or dark urine (rhabdo), confusion, bleeding, or hemodynamic instability.',
    recommendation: 'Observe with serial temp and labs; escalate on rising temp, new rigidity/clonus, rhabdo signs, or instability. Confirm the offending agent is discontinued.',
    citation: [1, 2],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
];

export const HYPERTHERMIA_HUB_NODE_COUNT = HYPERTHERMIA_HUB_NODES.length;

export const HYPERTHERMIA_HUB_MODULE_LABELS = [
  'Recognition / Sick Check',
  'Triage - Pick the Cause',
  'Cooling Principles',
  'Disposition',
];

export const HYPERTHERMIA_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Walter EJ, Carraretto M. The neurological and cognitive consequences of hyperthermia. Crit Care. 2016;20:199.' },
  { num: 2, text: 'EMCrit/IBCC. Hyperthermia and the differential of the hot patient. https://emcrit.org/ibcc/' },
  { num: 3, text: 'Nelson LS, Howland MA, Lewin NA, et al. Goldfrank\'s Toxicologic Emergencies. 12th ed. McGraw Hill; 2023.' },
  { num: 4, text: 'Epstein Y, Yanovich R. Heatstroke. N Engl J Med. 2019;380(25):2449-2459.' },
  { num: 5, text: 'Boyer EW, Shannon M. The serotonin syndrome. N Engl J Med. 2005;352(11):1112-1120.' },
  { num: 6, text: 'Berman BD. Neuroleptic malignant syndrome: a review for neurohospitalists. Neurohospitalist. 2011;1(1):41-47.' },
  { num: 7, text: 'Ross DS, Burch HB, Cooper DS, et al. 2016 ATA guidelines for diagnosis and management of hyperthyroidism and thyrotoxicosis. Thyroid. 2016;26(10):1343-1421.' },
  { num: 8, text: 'Dawson AH, Buckley NA. Pharmacological management of anticholinergic delirium - theory, evidence and practice. Br J Clin Pharmacol. 2016;81(3):516-524.' },
  { num: 9, text: 'Palmer BF, Clegg DJ. Salicylate toxicity. N Engl J Med. 2020;382(26):2544-2555.' },
  { num: 10, text: 'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: international guidelines 2021. Intensive Care Med. 2021;47(11):1181-1247.' },
];
