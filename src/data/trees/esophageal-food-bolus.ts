// MedKitt — Esophageal Food Bolus Impaction (Disimpaction)
// The "steakhouse syndrome" soft-food bolus pathway: triage by secretions,
// exclude perforation and a hidden dangerous object, bridge pharmacologically,
// then definitive endoscopy + mandatory work-up for the underlying cause (EoE).

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ESOPHAGEAL_FOOD_BOLUS_NODES: DecisionNode[] = [
  {
    id: 'efb-start',
    type: 'info',
    module: 1,
    title: 'Esophageal Food Bolus: Disimpaction',
    body: 'Adult who suddenly cannot swallow during a meal ("steakhouse syndrome"). The bolus is almost always lodged at a pathologic narrowing. Priorities: triage by secretions, exclude perforation, exclude a hidden dangerous object, then relieve the obstruction and find the cause.\n\nOpen first:\n- [Disimpaction Steps](#/info/efb-steps)\n- [ASGE Timing Windows](#/info/efb-timing)\n- [Do NOT](#/info/efb-stop)\n\nCore sequence:\n1. Can the patient handle secretions? Drooling/cannot swallow saliva = complete obstruction = emergent.\n2. Screen for perforation (crepitus, chest/back pain, fever) — if present, STOP, image, no push/pharm.\n3. If a button battery, sharp bone, or other true foreign body is suspected, use [GI Foreign Body](#/tree/gi-foreign-body).\n4. Pharmacologic bridge (glucagon) is low-yield but reasonable while arranging endoscopy.\n5. Endoscopy is definitive — push or retrieve.\n6. Treat the underlying cause; biopsy for eosinophilic esophagitis.',
    citation: [1, 2, 3],
    images: [
      {
        src: 'images/esophageal-food-bolus/food-bolus-obstruction.jpg',
        alt: 'Endoscopic view of a food bolus impacted in the esophageal lumen',
        caption: 'Endoscopic view of an impacted esophageal food bolus. Image: Wikimedia Commons, CC BY 3.0.',
      },
    ],
    next: 'efb-secretions',
    summary: 'Triage by secretions, exclude perforation and dangerous objects, bridge, then scope and biopsy.',
    safetyLevel: 'warning',
  },
  {
    id: 'efb-secretions',
    type: 'question',
    module: 1,
    title: 'Can the Patient Handle Secretions?',
    body: 'The single most important triage question is whether the obstruction is complete. A patient who is drooling and cannot swallow their own saliva has a **complete** obstruction and is at risk of aspiration — this is an airway/emergent problem.',
    options: [
      {
        label: 'Drooling / cannot swallow saliva (complete)',
        description: 'Complete obstruction, aspiration risk — emergent endoscopy (within ~6 h)',
        next: 'efb-perforation',
        urgency: 'critical',
      },
      {
        label: 'Tolerating secretions (partial)',
        description: 'Can swallow saliva, discomfort/pressure — urgent but not immediately airway-threatening',
        next: 'efb-perforation',
        urgency: 'urgent',
      },
    ],
    citation: [1, 2],
    summary: 'Drooling / cannot swallow saliva = complete obstruction = emergent endoscopy.',
  },
  {
    id: 'efb-perforation',
    type: 'question',
    module: 2,
    title: 'Any Sign of Perforation?',
    body: 'Before any reduction maneuver or pharmacology, screen for esophageal perforation — a feared complication that changes everything.\n\n**Red flags:** subcutaneous crepitus (neck/chest), severe or tearing chest/back pain, fever, tachycardia/sepsis, Hamman crunch, or a prolonged impaction (>24 h) with a sharp/bony bolus.',
    options: [
      {
        label: 'No signs of perforation',
        description: 'No crepitus, no severe pain out of proportion, no fever/sepsis',
        next: 'efb-object-check',
        urgency: 'urgent',
      },
      {
        label: 'Suspected perforation',
        description: 'Crepitus, severe chest/back pain, fever, Hamman crunch, or sepsis',
        next: 'efb-perforation-stop',
        urgency: 'critical',
      },
    ],
    citation: [2, 4, 5],
    summary: 'Crepitus/severe pain/fever = suspected perforation: STOP, image, no push or pharmacology.',
  },
  {
    id: 'efb-perforation-stop',
    type: 'result',
    module: 2,
    title: 'Suspected Perforation — STOP',
    body: 'Do not attempt pharmacologic disimpaction, blind passage, or effervescent agents.\n\n- Make the patient NPO; resuscitate; IV access, fluids, broad-spectrum antibiotics covering oral/anaerobic flora.\n- Imaging: **CT chest with water-soluble (not barium) oral contrast** or a water-soluble contrast esophagram. Avoid barium when perforation is suspected.\n- Consult **thoracic/GI surgery** and gastroenterology emergently.\n- Glucagon, effervescent agents, and forceful endoscopic push are contraindicated when perforation is suspected.',
    recommendation: 'NPO, resuscitate, water-soluble contrast CT/esophagram, antibiotics, emergent surgical + GI consult. No push, no pharmacology.',
    confidence: 'definitive',
    citation: [2, 4, 5],
    summary: 'Suspected perforation: NPO, water-soluble CT, antibiotics, surgery/GI; no push or pharmacology.',
    safetyLevel: 'critical',
  },
  {
    id: 'efb-object-check',
    type: 'question',
    module: 2,
    title: 'Is This Truly Just Soft Food?',
    body: 'Confirm the impaction is a soft food bolus and not a dangerous true foreign body that happens to be stuck with food. A button battery in the esophagus is a same-hour emergency; sharp bones, long/large objects, and magnets follow different rules.',
    options: [
      {
        label: 'Soft food bolus (meat/bread, no hard object)',
        description: 'Typical steakhouse-syndrome bolus, no battery/sharp/magnet',
        next: 'efb-timing',
        urgency: 'urgent',
      },
      {
        label: 'Button battery / sharp bone / magnet / true foreign body',
        description: 'Hard or dangerous object — different time-critical protocol',
        next: 'efb-foreign-body',
        urgency: 'critical',
      },
    ],
    citation: [1, 2],
    summary: 'Confirm soft food only; a button battery or sharp object routes to GI Foreign Body.',
  },
  {
    id: 'efb-foreign-body',
    type: 'result',
    module: 2,
    title: 'Dangerous Object — Use GI Foreign Body Pathway',
    body: 'This is not a simple food bolus. A button battery in the esophagus can cause liquefactive necrosis within hours and is a **same-hour emergency**; sharp/pointed objects, long (>5-6 cm) objects, and multiple magnets also need urgent endoscopy.\n\nGo to [GI Foreign Body](#/tree/gi-foreign-body) for object-specific timing, battery protocol, sharp-object handling, and magnet rules.',
    recommendation: 'Route to the GI Foreign Body pathway for object-specific, time-critical management.',
    confidence: 'definitive',
    citation: [1, 2],
    summary: 'Battery/sharp/magnet/true foreign body: switch to the GI Foreign Body consult.',
    safetyLevel: 'critical',
  },
  {
    id: 'efb-timing',
    type: 'info',
    module: 3,
    title: 'Timing & ASGE Windows',
    body: 'Timing drives urgency (ASGE/ESGE):\n\n- **Complete obstruction (cannot manage secretions):** endoscopy **emergently, within ~6 hours** — aspiration risk.\n- **Partial obstruction / food bolus without complete obstruction:** endoscopy **urgently, within 24 hours**.\n- A bolus should **not** be left impacted **beyond 24 hours** — prolonged contact causes pressure necrosis, ulceration, and perforation risk.\n\nDo not delay definitive endoscopy waiting for a pharmacologic agent to work in a patient with complete obstruction.',
    citation: [1, 2, 6],
    next: 'efb-pharm',
    summary: 'Complete: scope <6 h. Partial: scope <24 h. Never leave a bolus impacted >24 h.',
  },
  {
    id: 'efb-pharm',
    type: 'info',
    module: 3,
    title: 'Pharmacologic Bridge (Optional, Low-Yield)',
    body: 'Pharmacology is an **adjunct**, not a substitute for endoscopy. Success rates are low and it must never delay scope in complete obstruction.\n\n**Glucagon** ([glucagon](#/drug/glucagon/esophageal food bolus)) relaxes lower esophageal sphincter smooth muscle:\n- 1 mg IV slow push; may repeat once after ~10-20 min if no response.\n- Common: nausea/vomiting (which can occasionally dislodge the bolus, but also raises aspiration/Boerhaave concern); warn the patient.\n- Avoid in pheochromocytoma/insulinoma.\n\n**Do NOT use:**\n- **Papain / meat tenderizer** — contraindicated; associated with esophageal perforation and severe mucosal injury.\n- **Effervescent/gas-forming agents** in a *complete* obstruction — gas trapped above a complete block raises perforation risk.\n\nIf the bolus does not pass promptly, proceed to endoscopy within the timing window above.',
    citation: [3, 7, 8],
    next: 'efb-endoscopy',
    summary: 'Glucagon 1 mg IV (low-yield, may vomit). NO papain. No effervescent in complete obstruction.',
    safetyLevel: 'warning',
  },
  {
    id: 'efb-endoscopy',
    type: 'info',
    module: 4,
    title: 'Definitive Endoscopy',
    body: 'Flexible endoscopy is the definitive treatment and is successful in the large majority of cases.\n\n**Approaches:**\n- **Push technique:** gently advance the bolus into the stomach once the distal lumen is confirmed patent — preferred when safe and quick.\n- **Retrieval:** extract piecemeal with a Roth net, snare, or forceps; an overtube protects the airway and allows repeated passes.\n- Airway protection (overtube or intubation) for large/complete obstructions with aspiration risk.\n\nDuring the same procedure, inspect for and characterize the underlying cause (ring, stricture, mass, eosinophilic esophagitis) — see next step.',
    citation: [1, 2, 6],
    images: [
      {
        src: 'images/esophageal-food-bolus/schatzki-ring.jpg',
        alt: 'Endoscopic image of a Schatzki ring at the gastroesophageal junction',
        caption: 'Schatzki ring at the gastroesophageal junction \u2014 a common structural cause of food bolus impaction. Image: Wikimedia Commons (Jmarchn), CC BY-SA 3.0.',
      },
    ],
    next: 'efb-cause',
    summary: 'Endoscopy is definitive: push to stomach or retrieve; protect the airway in complete obstruction.',
  },
  {
    id: 'efb-cause',
    type: 'info',
    module: 5,
    title: 'Find the Underlying Cause — Biopsy for EoE',
    body: 'A food bolus impaction is a symptom of a narrowed esophagus until proven otherwise. Identify and address the cause.\n\n**Common structural causes:** Schatzki ring, peptic stricture, eosinophilic esophagitis, and (especially in older patients with weight loss/progressive dysphagia) **malignancy**.\n\n**Eosinophilic esophagitis (EoE)** is the leading cause of food impaction in young adults, especially men, and recurrent impactions.\n- Obtain **esophageal biopsies (typically \u22656, proximal and distal)** at the index endoscopy — even if the mucosa looks normal — unless contraindicated.\n- Start a **PPI** ([omeprazole](#/drug/omeprazole/eosinophilic esophagitis) or [pantoprazole](#/drug/pantoprazole/reflux)); PPI is both diagnostic-therapeutic for EoE and treats peptic stricture.\n\nDilation of a ring/stricture may be done at the same or a follow-up procedure per the endoscopist.',
    citation: [9, 10, 11],
    next: 'efb-dispo',
    summary: 'Impaction = narrowed esophagus until proven otherwise; biopsy for EoE (\u22656), start a PPI.',
  },
  {
    id: 'efb-dispo',
    type: 'result',
    module: 6,
    title: 'Disposition & Follow-up',
    body: 'After the bolus is cleared and the cause addressed:\n\n**Discharge** an uncomplicated patient who is comfortable, tolerating secretions and oral intake, with no perforation concern.\n- Start/continue a **PPI**.\n- Arrange **gastroenterology follow-up** for biopsy results, EoE management, and dilation planning.\n- Counsel on recurrence prevention: chew thoroughly, avoid large meat boluses, treat reflux/EoE.\n\n**Admit / observe** for: perforation concern, difficult or incomplete extraction, significant mucosal injury, aspiration, inability to tolerate oral intake, or significant comorbidity.\n\n**Return precautions:** recurrent obstruction, chest/back pain, fever, vomiting blood, or inability to swallow.',
    recommendation: 'Discharge uncomplicated, secretion-tolerant patients on a PPI with GI follow-up for EoE/biopsy and dilation; admit perforation, difficult extraction, or aspiration.',
    confidence: 'recommended',
    citation: [1, 9, 10, 12],
    summary: 'Home on PPI with GI follow-up for EoE/biopsy/dilation; admit complications.',
  },
];

export const ESOPHAGEAL_FOOD_BOLUS_CRITICAL_ACTIONS = [
  { text: 'Drooling / inability to swallow saliva = complete obstruction = emergent endoscopy within ~6 hours.', nodeId: 'efb-secretions' },
  { text: 'Screen for perforation (crepitus, severe pain, fever) before any pharmacology — if present, NPO + water-soluble CT, no push.', nodeId: 'efb-perforation' },
  { text: 'Exclude a button battery / sharp object / magnet; route those to the GI Foreign Body pathway.', nodeId: 'efb-object-check' },
  { text: 'Never leave a food bolus impacted beyond 24 hours.', nodeId: 'efb-timing' },
  { text: 'Do NOT use papain/meat tenderizer; biopsy for eosinophilic esophagitis at endoscopy and start a PPI.', nodeId: 'efb-cause' },
];

export const ESOPHAGEAL_FOOD_BOLUS_CITATIONS: Citation[] = [
  { num: 1, text: 'ASGE Standards of Practice Committee. Management of ingested foreign bodies and food impactions. Gastrointest Endosc. 2011;73(6):1085-1091.' },
  { num: 2, text: 'Birk M, Bauerfeind P, Deprez PH, et al. Removal of foreign bodies in the upper gastrointestinal tract in adults: ESGE Clinical Guideline. Endoscopy. 2016;48(5):489-496.' },
  { num: 3, text: 'Sodeman TC, Harewood GC, Baron TH. Assessment of the predictors of response to glucagon in the setting of acute esophageal food bolus impaction. Dysphagia. 2004;19(1):18-21.' },
  { num: 4, text: 'Brinster CJ, Singhal S, Lee L, et al. Evolving options in the management of esophageal perforation. Ann Thorac Surg. 2004;77(4):1475-1483.' },
  { num: 5, text: 'Sdralis EIK, Petousis S, Rashid F, et al. Epidemiology, diagnosis, and management of esophageal perforations: systematic review. Dis Esophagus. 2017;30(8):1-6.' },
  { num: 6, text: 'Sperry SLW, Crockett SD, Miller CB, et al. Esophageal foreign-body impactions: epidemiology, time trends, and the impact of the increasing prevalence of eosinophilic esophagitis. Gastrointest Endosc. 2011;74(5):985-991.' },
  { num: 7, text: 'Khayyat YM. Pharmacological management of esophageal food bolus impaction. Emerg Med Int. 2013;2013:924015.' },
  { num: 8, text: 'Tibbling L, Bjorkhoel A, Jansson E, Stenkvist M. Effect of spasmolytic drugs on esophageal foreign bodies. Dysphagia. 1995;10(2):126-127.' },
  { num: 9, text: 'Dellon ES, Gonsalves N, Hirano I, et al. ACG Clinical Guideline: Evidenced Based Approach to the Diagnosis and Management of Esophageal Eosinophilia and Eosinophilic Esophagitis. Am J Gastroenterol. 2013;108(5):679-692.' },
  { num: 10, text: 'Hirano I, Chan ES, Rank MA, et al. AGA/JTF Clinical Guidelines on the Management of Eosinophilic Esophagitis. Gastroenterology. 2020;158(6):1776-1786.' },
  { num: 11, text: 'Goyal RK, Bauer JL, Spiro HM. The nature and location of esophageal contraction rings (Schatzki ring). N Engl J Med. 1971;284(20):1175-1180.' },
  { num: 12, text: 'Tintinalli JE, et al. Tintinalli\u2019s Emergency Medicine: A Comprehensive Study Guide. Esophageal emergencies chapter. 9th ed. 2020.' },
];

export const ESOPHAGEAL_FOOD_BOLUS_NODE_COUNT = ESOPHAGEAL_FOOD_BOLUS_NODES.length;
export const ESOPHAGEAL_FOOD_BOLUS_MODULE_LABELS = ['Triage', 'Red Flags', 'Timing & Bridge', 'Endoscopy', 'Cause', 'Disposition'];
