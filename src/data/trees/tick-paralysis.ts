// MedKitt - Tick Paralysis
// Recognition (GBS mimic) -> FIND THE TICK (full skin search) -> Remove it (definitive Tx) -> Geographic risk-stratify (NA vs Australian) -> Differential -> Disposition & Prognosis
// 8 modules. The whole point: a perfect GBS mimic reversed in hours by pulling a tick. Normal CSF + findable tick + reversal after removal = the three pillars.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const TICK_PARALYSIS_CRITICAL_ACTIONS = [
  { text: 'Full head-to-toe skin search (scalp, hairline, behind ears, axillae, groin, perineum) to FIND the tick', nodeId: 'tp-find' },
  { text: 'Remove tick properly: fine forceps, close to skin, steady upward traction, do NOT crush or twist', nodeId: 'tp-remove' },
  { text: 'Serial respiratory monitoring (effort, vital capacity, bulbar function) — failure is the killer', nodeId: 'tp-monitor' },
  { text: 'Do NOT give IVIG/plasmapheresis — they do not work in tick paralysis', nodeId: 'tp-differential' },
  { text: 'Australian Ixodes holocyclus: admit and observe — paralysis can WORSEN after removal', nodeId: 'tp-geography' },
];

export const TICK_PARALYSIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'tp-start',
    type: 'info',
    module: 1,
    title: 'Tick Paralysis',
    body: '**Tick paralysis** is an acute ascending flaccid paralysis caused by a **neurotoxin** in the saliva of an engorged feeding female tick. There is no pathogen — it is a toxin, not an infection (distinct from Lyme/RMSF).\n\n**Why it matters:** it is a near-perfect **Guillain-Barré mimic** that is **reversed in hours** by a 30-second physical act — pulling the tick. Miss it and you watch a curable patient progress to respiratory failure; recognize it and you cure them at the bedside.\n\n**The toxin is only secreted late in feeding,** so symptoms appear after the tick has been attached ~4-7 days. The patient rarely reports a known bite.\n\n**Classic patient:** a young child, often a **girl with long thick hair** hiding a scalp tick. Pacific Northwest, Rocky Mountains, Southeast US (Dermacentor); eastern Australia (Ixodes holocyclus — far more severe).',
    images: [{
      src: 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 240" font-family="sans-serif">'
        + '<rect width="420" height="240" fill="#0f172a"/>'
        + '<text x="210" y="24" fill="#e2e8f0" font-size="15" font-weight="bold" text-anchor="middle">Three pillars vs GBS</text>'
        + '<rect x="30" y="44" width="120" height="150" rx="10" fill="#1e293b" stroke="#34d399"/>'
        + '<text x="90" y="68" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Tick paralysis</text>'
        + '<text x="90" y="92" fill="#cbd5e1" font-size="10" text-anchor="middle">CSF NORMAL</text>'
        + '<text x="90" y="112" fill="#cbd5e1" font-size="10" text-anchor="middle">tick FINDABLE</text>'
        + '<text x="90" y="132" fill="#cbd5e1" font-size="10" text-anchor="middle">reverses on</text>'
        + '<text x="90" y="146" fill="#cbd5e1" font-size="10" text-anchor="middle">removal</text>'
        + '<text x="90" y="170" fill="#cbd5e1" font-size="10" text-anchor="middle">sensation spared</text>'
        + '<rect x="270" y="44" width="120" height="150" rx="10" fill="#1e293b" stroke="#f87171"/>'
        + '<text x="330" y="68" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">GBS</text>'
        + '<text x="330" y="92" fill="#cbd5e1" font-size="10" text-anchor="middle">CSF high protein</text>'
        + '<text x="330" y="112" fill="#cbd5e1" font-size="10" text-anchor="middle">no tick</text>'
        + '<text x="330" y="132" fill="#cbd5e1" font-size="10" text-anchor="middle">slower (days-wk)</text>'
        + '<text x="330" y="156" fill="#cbd5e1" font-size="10" text-anchor="middle">needs IVIG/PLEX</text>'
        + '<text x="210" y="216" fill="#94a3b8" font-size="10" text-anchor="middle">Both: ascending, symmetric, areflexic, afebrile</text>'
        + '</svg>'),
      alt: 'Comparison panel of tick paralysis (normal CSF, findable tick, reverses on removal, sensation spared) versus GBS (high CSF protein, no tick, slower, needs IVIG/PLEX).',
      caption: 'Tick paralysis vs GBS — normal CSF, a findable tick, and reversal after removal are the three discriminators. (Original schematic.)'
    }],
    citation: [1, 2, 8],
    next: 'tp-presentation',
    summary: 'A neurotoxin-mediated GBS mimic reversed by removing the tick. Classic: young child, scalp tick attached 4-7 days.',
  },

  {
    id: 'tp-presentation',
    type: 'question',
    module: 1,
    title: 'Clinical Presentation',
    body: '**The syndrome (the GBS look-alike):**\n- **Prodrome:** anorexia, lethargy, irritability (esp. children)\n- **Ataxia frequently precedes weakness** — consider tick paralysis in ANY child with acute ataxia\n- **Acute symmetric ascending flaccid paralysis** (legs → trunk → arms) over 24-48 h\n- **Areflexia / hyporeflexia**\n- **Bulbar + respiratory involvement late** — dysarthria, dysphagia, then respiratory failure\n\n**The sparing features that point AWAY from a cord/brain lesion and toward tick paralysis:**\n- **Sensation SPARED** (intact sensory exam)\n- **Mental status NORMAL**\n- **Afebrile** (no infection)\n\nThis exact picture — ascending symmetric flaccid weakness, areflexia, spared sensation, normal mentation, afebrile — is why it gets mislabeled GBS.',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Ascending flaccid weakness ± ataxia, areflexia, sensation spared',
        description: 'The classic GBS-mimic picture — search for the tick',
        next: 'tp-find',
        urgency: 'critical',
      },
      {
        label: 'Bulbar / respiratory involvement (dysarthria, dysphagia, weak cough)',
        description: 'Late and life-threatening — monitor airway while searching',
        next: 'tp-monitor',
        urgency: 'critical',
      },
    ],
    summary: 'Ascending flaccid paralysis + areflexia + SPARED sensation + normal mentation + afebrile. Ataxia may come first in kids.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 2: FIND THE TICK
  // =====================================================================

  {
    id: 'tp-find',
    type: 'info',
    module: 2,
    title: 'FIND THE TICK — Full Skin Search',
    body: '**Diagnosis is clinical and there is no confirmatory test — the diagnosis IS finding the tick.** Patients rarely recall a bite, so a meticulous head-to-toe search is mandatory and is the single highest-yield action in this consult.\n\n**Search every hidden, hairy, and intertriginous site:**\n- **Entire scalp and hairline** (a fine-toothed comb helps) — most ticks hide here\n- **Behind the ears**, in the ear canal\n- **Axillae**, **groin / perineum**, gluteal cleft\n- Umbilicus, interdigital spaces, under breasts/skin folds\n- Back of the neck / base of skull and along the spine\n\nThe tick is on the **head or neck in ~60-70%** of cases. If you find one, **keep looking** — multiple ticks can be present.\n\n**Supporting labs (to separate from GBS, not to confirm tick paralysis):**\n- **CSF is NORMAL** (no albuminocytologic dissociation) — the key discriminator.\n- Nerve conduction (if done): reduced CMAP amplitude, preserved sensory potentials, NOT a demyelinating pattern; most useful late.',
    citation: [1, 2, 8, 3, 6],
    next: 'tp-remove',
    summary: 'No lab confirms it — the diagnosis is finding the tick. Search scalp/hairline/ears/axillae/groin/perineum. Found on head/neck in ~60-70%. CSF normal.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 3: REMOVE THE TICK (definitive treatment)
  // =====================================================================

  {
    id: 'tp-remove',
    type: 'info',
    module: 3,
    title: 'Remove the Tick — Definitive Treatment',
    body: '**Removing the tick IS the treatment.** North American (Dermacentor) tick paralysis reverses within **hours to days** of complete removal; supportive care alone is then curative.\n\n**Proper removal (CDC technique):**\n1. Grasp with **clean fine-tipped tweezers/forceps as close to the skin as possible.**\n2. Pull **straight up with steady, even pressure.** Do NOT twist or jerk.\n3. Do **NOT crush or squeeze the tick body** (avoids expressing more toxin/pathogen).\n4. **No folklore methods** — no petroleum jelly, nail polish, matches, or heat. These stress the tick into releasing more saliva/toxin.\n5. Clean the site and your hands. If mouthparts break off and won\'t lift easily, leave them; skin extrudes them over time.\n\n**Caveat (North American):** paralysis may continue to progress for **up to ~2 days** even after removal — keep monitoring.',
    images: [{
      src: 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 200" font-family="sans-serif">'
        + '<rect width="420" height="200" fill="#0f172a"/>'
        + '<text x="210" y="24" fill="#e2e8f0" font-size="15" font-weight="bold" text-anchor="middle">Removal: straight up, close to skin</text>'
        + '<rect x="60" y="120" width="300" height="40" fill="#3f2d23" stroke="#94a3b8"/>'
        + '<text x="210" y="180" fill="#94a3b8" font-size="10" text-anchor="middle">skin</text>'
        + '<ellipse cx="210" cy="118" rx="18" ry="12" fill="#475569" stroke="#cbd5e1"/>'
        + '<line x1="210" y1="118" x2="210" y2="135" stroke="#cbd5e1" stroke-width="2"/>'
        + '<line x1="198" y1="70" x2="208" y2="108" stroke="#34d399" stroke-width="4"/>'
        + '<line x1="222" y1="70" x2="212" y2="108" stroke="#34d399" stroke-width="4"/>'
        + '<text x="270" y="80" fill="#34d399" font-size="11">forceps at skin</text>'
        + '<line x1="210" y1="60" x2="210" y2="40" stroke="#fbbf24" stroke-width="2" marker-end="url(#a)"/>'
        + '<polygon points="210,34 205,46 215,46" fill="#fbbf24"/>'
        + '<text x="250" y="48" fill="#fbbf24" font-size="11">steady upward pull</text>'
        + '<text x="210" y="100" fill="#f87171" font-size="9" text-anchor="middle">do NOT twist / crush</text>'
        + '</svg>'),
      alt: 'Diagram of correct tick removal: fine forceps grasping at the skin surface and pulling straight up, with a note not to twist or crush.',
      caption: 'Grasp at the skin, pull straight up with steady pressure, no twisting/crushing, no folklore remedies. (Original schematic, CDC technique.)'
    }],
    citation: [1, 8, 9],
    next: 'tp-monitor',
    summary: 'Removal is curative (North American). Fine forceps at the skin, straight-up steady pull, no twist/crush/folklore. May progress up to ~2 days post-removal.',
  },

  // =====================================================================
  // MODULE 4: RESPIRATORY MONITORING
  // =====================================================================

  {
    id: 'tp-monitor',
    type: 'info',
    module: 4,
    title: 'Respiratory Monitoring',
    body: '**Respiratory failure is the cause of death** in untreated or severe tick paralysis — make monitoring the priority while you search for and remove the tick.\n\n**Watch for:**\n- Bulbar signs: weak cough, dysphagia, pooling secretions, dysarthria\n- Declining respiratory effort, rising CO2, fatigue on repeat exam\n- Single-breath count, vital capacity / bedside mechanics if available\n\n**Pulse oximetry is a late, poor indicator** of neuromuscular respiratory strength — do not be reassured by a normal SpO2.\n\n**Support the airway/ventilation** if respiratory muscles are involved; intubate for impending failure or inability to protect the airway.',
    citation: [1, 2, 5],
    next: 'tp-geography',
    summary: 'Respiratory failure is the killer. Monitor bulbar function + ventilation; SpO2 is a late indicator. Support airway for impending failure.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 5: GEOGRAPHIC RISK STRATIFICATION
  // =====================================================================

  {
    id: 'tp-geography',
    type: 'question',
    module: 5,
    title: 'Geographic Risk: North American vs Australian',
    body: '**The species changes everything.** Risk-stratify by geography/tick type.\n\n**North American (Dermacentor andersoni / variabilis):**\n- **Excellent prognosis** — rapid reversal (hours-days) after removal\n- Supportive care is curative; antitoxin NOT used\n- Can still progress up to ~2 days post-removal — monitor\n\n**Australian (Ixodes holocyclus — the paralysis tick):**\n- **Far more severe** — higher rate of respiratory paralysis, death possible within 1-2 days untreated\n- **Paralysis can WORSEN AFTER removal**, peaking in the first 12-48 h → mandatory inpatient observation\n- **Tick antitoxin (TAS)** is used (some give it at the time of removal) — *FLAGGED: specialist/toxicology decision; non-standardized dosing and allergy/serum-sickness risk*\n- Remove carefully to avoid compressing the tick body (compression may trigger venom release)',
    citation: [1, 5, 7, 4],
    options: [
      {
        label: 'North American (Dermacentor) — US Pacific NW / Rocky Mtn / SE',
        description: 'Expect rapid recovery; supportive care; monitor up to ~2 days',
        next: 'tp-differential',
      },
      {
        label: 'Australian (Ixodes holocyclus) — eastern Australia',
        description: 'Admit, observe for post-removal worsening; toxicology re: antitoxin',
        next: 'tp-differential',
        urgency: 'critical',
      },
    ],
    summary: 'North American = rapid recovery, supportive. Australian I. holocyclus = severe, can WORSEN post-removal, admit + toxicology for antitoxin.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 6: DIFFERENTIAL
  // =====================================================================

  {
    id: 'tp-differential',
    type: 'info',
    module: 6,
    title: 'Differential & Mimics',
    body: '**Tick paralysis sits in the acute-flaccid-paralysis differential — here is how it separates:**\n\n- **[Guillain-Barré (AIDP)](#/tree/guillain-barre)** — also ascending + areflexic, but CSF shows **albuminocytologic dissociation**, NCS is demyelinating, no tick, and it progresses slower. *Caveat: early GBS (≤4 days) may lack the CSF protein rise, so normal CSF supports but does not absolutely prove tick paralysis.*\n- **Miller Fisher variant** — ophthalmoplegia + ataxia + areflexia, anti-GQ1b; tick paralysis spares the eyes and has normal CSF.\n- **[Botulism](#/tree/botulism)** — **descending**, cranial-nerve-first, with **dilated/poorly reactive pupils** + autonomic signs. Tick paralysis is **ascending** with normal pupils.\n- **[Myasthenia gravis](#/tree/myasthenia-gravis)** — fatigable, ptosis/diplopia, reflexes preserved; no tick.\n- **[Transverse myelitis](#/tree/transverse-myelitis)** — sensory level + bowel/bladder + UMN signs / abnormal MRI; tick paralysis spares sensation.\n- **Hypokalemic periodic paralysis** — low K+, episodic; **check the potassium.**\n- **Polio / West Nile neuroinvasive** — often asymmetric, febrile, CSF pleocytosis.\n\n**Do NOT treat tick paralysis with IVIG or plasmapheresis — they do not work.** The treatment is the forceps.',
    citation: [1, 3, 8],
    next: 'tp-disposition',
    summary: 'GBS (CSF/NCS/no tick), MFS (eyes), botulism (descending/pupils), MG (fatigable), TM (sensory level), hypoK (check K+). IVIG/PLEX do NOT work — remove the tick.',
  },

  // =====================================================================
  // MODULE 7: DISPOSITION
  // =====================================================================

  {
    id: 'tp-disposition',
    type: 'info',
    module: 7,
    title: 'Disposition',
    body: '**Admit if:** any bulbar or respiratory involvement, ongoing progression, diagnostic uncertainty, or **any Australian I. holocyclus** exposure (observe several days for post-removal worsening).\n\n**North American, mild, tick removed, no respiratory/bulbar signs:** can often be observed and discharged once improving and ambulating safely, with clear return precautions — but err toward observation given that progression can continue up to ~2 days.\n\n**Always:**\n- Document the tick found/removed and the neurologic exam\n- Counsel on tick-bite prevention and return precautions (new weakness, breathing trouble, swallowing trouble)',
    citation: [1, 2, 5],
    next: 'tp-prognosis',
    summary: 'Admit for any respiratory/bulbar involvement, progression, uncertainty, or Australian exposure. North American mild cases can be observed/discharged when improving.',
  },

  // =====================================================================
  // MODULE 8: PROGNOSIS
  // =====================================================================

  {
    id: 'tp-prognosis',
    type: 'result',
    module: 8,
    title: 'Prognosis',
    body: '**North American type: excellent** — complete recovery is expected after tick removal, usually within hours to days.\n\n**Australian (I. holocyclus): guarded** — admit for several days; paralysis can worsen post-removal; respiratory support may be needed for >1 week; death possible within 1-2 days if inadequately treated.\n\n**The avoidable tragedy:** untreated tick paralysis (any type) progresses to respiratory failure and death, and unrecognized cases get committed to ineffective GBS therapy (IVIG/PLEX). Early recognition + a thorough skin search + proper removal is the entire game.',
    recommendation: 'Recognize the GBS mimic, perform a meticulous head-to-toe skin search and remove any tick with proper technique, and monitor respiratory/bulbar function. North American disease reverses rapidly; Australian I. holocyclus disease can worsen after removal — admit and involve toxicology regarding antitoxin. Do NOT give IVIG or plasmapheresis. Check a potassium to exclude hypokalemic periodic paralysis.',
    confidence: 'recommended',
    citation: [1, 2, 8],
    summary: 'North American: excellent recovery after removal. Australian: guarded, admit. Early recognition prevents respiratory death and unnecessary GBS treatment.',
  },

];

export const TICK_PARALYSIS_NODE_COUNT = TICK_PARALYSIS_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const TICK_PARALYSIS_MODULE_LABELS = [
  'Recognition',
  'Find the Tick',
  'Remove the Tick',
  'Respiratory Monitoring',
  'Geographic Risk',
  'Differential',
  'Disposition',
  'Prognosis',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const TICK_PARALYSIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Simon LV, West B, McKinney WP. Tick Paralysis. StatPearls. Treasure Island (FL): StatPearls Publishing; updated 2025.' },
  { num: 2, text: 'Tick paralysis. MedLink Neurology. Clinical course, GBS differentiation, management.' },
  { num: 3, text: 'Swift TR, Ignacio OJ. Tick paralysis: electrophysiologic studies. Neurology. 1975;25(12):1130-1133.' },
  { num: 4, text: 'Comprehensive analysis of the global impact and distribution of tick paralysis. Clin Microbiol Rev. 2024.' },
  { num: 5, text: 'Massive tick (Ixodes holocyclus) infestation with delayed facial-nerve palsy. Med J Aust. 2002;176(6):264-265.' },
  { num: 6, text: 'Child Neurology: Tick paralysis. Neurology. Pediatric NCS findings and GBS differentiation.' },
  { num: 7, text: 'A Rare Tick Tale: Australian Paralysis Tick Causing Multiple Cranial Neuropathies. PMC11221948.' },
  { num: 8, text: 'Felz MW, Smith CD, Swift TR. A Six-Year-Old Girl with Tick Paralysis. N Engl J Med. 2000;342(2):90-94.' },
  { num: 9, text: 'Centers for Disease Control and Prevention. What to Do After a Tick Bite / Tick Removal. CDC, 2024.' },
];
