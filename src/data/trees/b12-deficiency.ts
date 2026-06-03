// MedKitt - Vitamin B12 (Cobalamin) Deficiency — Subacute Combined Degeneration focus
// Recognition (UMN signs + dorsal-column sensory loss) -> Etiology (incl N2O) -> Diagnosis (low-normal? get MMA/homocysteine) -> The folate trap & N2O -> Treatment (replace B12, EARLY) -> Differential (copper!) -> Disposition & Prognosis
// 8 modules. Core teaching: neuro damage WITHOUT anemia; check MMA/homocysteine in the gray zone; never folate alone; N2O causes SCD with normal B12; copper is the near-identical mimic.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const B12_DEFICIENCY_CRITICAL_ACTIONS = [
  { text: 'Recognize subacute combined degeneration: dorsal-column sensory loss (vibration/proprioception) PLUS corticospinal UMN signs', nodeId: 'b12-presentation' },
  { text: 'Neuro damage can occur WITHOUT anemia or macrocytosis — do not wait for a high MCV', nodeId: 'b12-presentation' },
  { text: 'B12 in the 200-400 pg/mL gray zone: send MMA + homocysteine (both elevated in true deficiency)', nodeId: 'b12-diagnosis' },
  { text: 'Do NOT give folate alone — it masks anemia while neurologic damage continues; replace B12 first/together', nodeId: 'b12-traps' },
  { text: 'Nitrous oxide (whippets) causes acute SCD with a NORMAL serum B12 — diagnose via MMA/homocysteine; stop exposure', nodeId: 'b12-traps' },
  { text: 'Replace B12 EARLY (parenteral for significant neuro disease) — late treatment leaves permanent deficits', nodeId: 'b12-treatment' },
  { text: 'Non-responder or normalized B12 still declining: check copper + ceruloplasmin (near-identical myelopathy)', nodeId: 'b12-differential' },
];

export const B12_DEFICIENCY_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'b12-start',
    type: 'info',
    module: 1,
    title: 'B12 Deficiency & Subacute Combined Degeneration',
    body: '**Subacute combined degeneration (SCD)** is demyelination of the **dorsal columns** and the **lateral corticospinal tracts** from cobalamin (vitamin B12) deficiency. "Combined" = both tract systems at once, producing the signature mix of **sensory loss + upper-motor-neuron signs**.\n\n**Why B12 matters:** it is a cofactor for methionine synthase (myelin methylation) and methylmalonyl-CoA mutase. Deficiency impairs myelin synthesis and lets neurotoxic metabolites (methylmalonic acid, homocysteine) accumulate. It also impairs DNA synthesis → **megaloblastic anemia** and CNS effects (memory loss to psychosis, "megaloblastic madness").\n\n**The trap that defines this consult:** the neurologic disease can appear **before — or without — any anemia.** A normal CBC does not clear B12 deficiency in a patient with a compatible myelopathy.',
    images: [{
      src: 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 240" font-family="sans-serif">'
        + '<rect width="420" height="240" fill="#0f172a"/>'
        + '<text x="210" y="24" fill="#e2e8f0" font-size="15" font-weight="bold" text-anchor="middle">Combined: two tract systems</text>'
        + '<ellipse cx="210" cy="135" rx="95" ry="75" fill="#1e293b" stroke="#64748b"/>'
        + '<ellipse cx="210" cy="135" rx="30" ry="55" fill="#334155" stroke="#94a3b8"/>'
        + '<path d="M180 80 q30 -18 60 0 q-10 30 -30 30 q-20 0 -30 -30" fill="#fbbf24" opacity="0.8"/>'
        + '<text x="210" y="74" fill="#fbbf24" font-size="10" text-anchor="middle">dorsal columns</text>'
        + '<text x="210" y="62" fill="#fbbf24" font-size="9" text-anchor="middle">vibration / proprioception</text>'
        + '<ellipse cx="150" cy="150" rx="16" ry="22" fill="#f87171" opacity="0.75"/>'
        + '<ellipse cx="270" cy="150" rx="16" ry="22" fill="#f87171" opacity="0.75"/>'
        + '<text x="120" y="200" fill="#f87171" font-size="9" text-anchor="middle">lateral corticospinal</text>'
        + '<text x="120" y="212" fill="#f87171" font-size="9" text-anchor="middle">(UMN: spastic, Babinski)</text>'
        + '<text x="320" y="200" fill="#94a3b8" font-size="9" text-anchor="middle">inverted-V</text>'
        + '<text x="320" y="212" fill="#94a3b8" font-size="9" text-anchor="middle">on MRI T2</text>'
        + '</svg>'),
      alt: 'Spinal cord cross-section schematic highlighting dorsal columns (vibration/proprioception) and lateral corticospinal tracts (UMN signs), with an inverted-V MRI note.',
      caption: 'SCD hits dorsal columns (vibration/proprioception) and lateral corticospinal tracts (UMN signs) together — the inverted-V on MRI T2. (Original schematic.)'
    }],
    citation: [1, 2, 3],
    next: 'b12-presentation',
    summary: 'B12 deficiency degenerates dorsal columns + corticospinal tracts (SCD). Neuro disease can precede/occur without anemia.',
  },

  {
    id: 'b12-presentation',
    type: 'question',
    module: 1,
    title: 'Clinical Presentation',
    body: '**Neurologic (the diagnostic core):**\n- Symmetric distal **paresthesias**, feet > hands — often the earliest symptom\n- **Loss of vibration & proprioception** (dorsal column) → **sensory ataxia**, **positive Romberg**\n- **Spastic weakness, hyperreflexia, Babinski** (corticospinal)\n- **The clue:** UMN signs coexisting with dorsal-column sensory loss\n\n**Cognitive/psychiatric:** memory loss, dementia, depression, psychosis.\n**Mucocutaneous:** glossitis (smooth, beefy-red tongue).\n**Hematologic:** macrocytic anemia with hypersegmented neutrophils — **but neuro disease can occur with a NORMAL hematocrit and normal MCV.**\n\n**Do not wait for a high MCV or low hematocrit** before working up a compatible myelopathy.',
    citation: [1, 2, 3, 5],
    options: [
      {
        label: 'Sensory ataxia + vibration/proprioception loss + UMN signs',
        description: 'Classic subacute combined degeneration — work it up now',
        next: 'b12-etiology',
      },
      {
        label: 'Cognitive/psychiatric change or unexplained macrocytic anemia',
        description: 'B12 still on the table — pursue diagnosis',
        next: 'b12-etiology',
      },
    ],
    summary: 'Paresthesias feet>hands, vibration/proprioception loss, sensory ataxia/Romberg, plus spastic UMN signs. Neuro disease can occur with NORMAL CBC/MCV.',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 2: ETIOLOGY
  // =====================================================================

  {
    id: 'b12-etiology',
    type: 'info',
    module: 2,
    title: 'Etiology',
    body: '**Find the cause — it sets the treatment route and duration:**\n\n- **Pernicious anemia** — autoimmune loss of intrinsic factor (anti-IF / anti-parietal-cell antibodies); the classic malabsorptive cause. Lifelong replacement.\n- **Dietary** — strict vegan/vegetarian (B12 is animal-sourced).\n- **Malabsorption** — ileal resection / Crohn, gastrectomy / bariatric surgery, bacterial overgrowth.\n- **Drugs** — long-term **metformin** and **PPIs / H2 blockers**.\n- **Nitrous oxide (N2O) abuse ("whippets")** — oxidizes cobalamin to its inactive form → a **functional** deficiency, increasingly common in young patients (see the traps node).\n- **Age** — atrophic gastritis and reduced acid-dependent absorption.',
    citation: [1, 2, 3, 9],
    next: 'b12-diagnosis',
    summary: 'Pernicious anemia, dietary (vegan), malabsorption (ileal/bariatric), drugs (metformin/PPI), N2O abuse, age.',
  },

  // =====================================================================
  // MODULE 3: DIAGNOSIS
  // =====================================================================

  {
    id: 'b12-diagnosis',
    type: 'info',
    module: 3,
    title: 'Diagnosis — Mind the Gray Zone',
    body: '- **Serum B12** — low confirms deficiency. **BUT the 200-400 pg/mL gray zone** does not exclude it: ~50% of subclinical deficiency has a "normal" B12.\n- **Methylmalonic acid (MMA)** — elevated; **the most specific** confirmatory test. Order it (with homocysteine) whenever B12 is borderline/low-normal or the clinical picture fits.\n- **Homocysteine** — elevated; sensitive but less specific (also raised by folate deficiency, renal impairment).\n- **CBC/smear** — macrocytosis, hypersegmented neutrophils; **may be normal despite neuro disease.**\n- **Anti-intrinsic-factor / anti-parietal-cell antibodies** — for pernicious anemia.\n- **MRI spine** — T2 hyperintensity in the **dorsal columns** (classic **inverted-"V" / "dot" sign**), cervical/thoracic, non-enhancing. *Note: indistinguishable from copper-deficiency myelopathy.*\n\n**MMA > homocysteine for specificity** — MMA best separates B12 from folate deficiency.',
    citation: [3, 10],
    calculatorLinks: [{ id: 'b12-gray-zone', label: 'B12 Gray-Zone Interpreter' }],
    next: 'b12-traps',
    summary: 'Low B12 confirms; 200-400 gray zone needs MMA + homocysteine (MMA most specific). CBC may be normal. MRI: inverted-V dorsal-column T2.',
  },

  // =====================================================================
  // MODULE 4: THE TRAPS (folate + N2O) — FLAGGED
  // =====================================================================

  {
    id: 'b12-traps',
    type: 'info',
    module: 4,
    title: 'Two Traps: Folate-Alone & Nitrous Oxide',
    body: '**Trap 1 — Do NOT give folate alone (FLAGGED).** Folate corrects the megaloblastic anemia (removing the hematologic warning sign) while **neurologic degeneration continues unchecked.** The masking effect is undisputed; some literature argues folate may even accelerate neuro damage. **Practical rule:** assess B12 status before or alongside any folate, and **replace B12 first / together.**\n\n**Trap 2 — Nitrous oxide causes SCD with a NORMAL serum B12 (FLAGGED).** N2O oxidizes the cobalt core of cobalamin (active → inactive), inactivating methionine synthase → a **functional** deficiency. ~29% of N2O neuro cases have a normal measured B12; diagnosis hinges on **elevated MMA + homocysteine** (raised in >80%).\n- **Draw biochemical samples before starting B12** (markers normalize quickly), but **do not delay treatment** for testing.\n- Stop the exposure; B12 repletion ± methionine adjunct (judgment call).\n\nN2O-induced disease can also mimic GBS — keep it in mind in young patients with myeloneuropathy.',
    citation: [4, 5, 7, 11],
    next: 'b12-treatment',
    summary: 'Never folate alone (masks anemia, neuro damage continues — replace B12 first). N2O causes SCD with NORMAL B12 — diagnose by MMA/homocysteine, stop exposure.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 5: TREATMENT
  // =====================================================================

  {
    id: 'b12-treatment',
    type: 'info',
    module: 5,
    title: 'Treatment — Replace Early',
    body: '**Replace B12 — early treatment is the key prognostic lever.**\n- **Parenteral (IM/SC) cyanocobalamin or hydroxocobalamin 1000 mcg (1 mg):** classic schedule **daily ~1 week → weekly ~1 month → monthly thereafter** (lifelong if the cause is irreversible, e.g., pernicious anemia). Hydroxocobalamin is retained somewhat better.\n- **For significant neurologic disease (SCD): more intensive loading — 1 mg IM on ALTERNATE DAYS until no further improvement** (British Society for Haematology / NICE 2024), then maintenance. Parenteral is preferred initially whenever neurologic involvement is present.\n- **High-dose oral (1000-2000 mcg/day)** is non-inferior for correcting anemia/levels in **non-malabsorptive** disease (and works even in pernicious anemia via passive diffusion) — reserve for milder/non-neurologic cases. *FLAGGED: the route threshold for a patient with neuro findings is a clinician call — default parenteral for significant neuro involvement.*\n- **Treat the underlying cause** (stop offending drug, address malabsorption, dietary counseling).\n- **N2O-induced:** stop exposure + parenteral B12; methionine sometimes added.\n\n**Timing:** neurologic recovery is best within a months-long window; deficits present for months-to-years tend to become **irreversible.**',
    citation: [8, 12, 4],
    next: 'b12-differential',
    summary: 'Parenteral B12 1 mg (daily->weekly->monthly) for neuro disease; high-dose oral for mild/non-malabsorptive. Treat the cause. Recover best if treated EARLY.',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 6: DIFFERENTIAL
  // =====================================================================

  {
    id: 'b12-differential',
    type: 'info',
    module: 6,
    title: 'Differential — Don\'t Miss Copper',
    body: '**Copper deficiency myelopathy ("human swayback") is clinically AND radiologically near-identical** — same dorsal-column sensory ataxia + corticospinal signs and the same inverted-"V" MRI sign.\n- Causes: bariatric/gastric surgery (~47%), **zinc excess** (denture cream, supplements; ~16%), malabsorption. Often with **cytopenias.**\n- **Check serum copper + ceruloplasmin** — especially if the patient keeps deteriorating despite B12 repletion and a normalized B12 level, or has a bariatric/zinc history. The two can coexist.\n\n**Other mimics:**\n- **[Guillain-Barré](#/tree/guillain-barre)** — ascending paralysis (N2O disease can mimic it)\n- **MS / [transverse myelitis](#/tree/transverse-myelitis)** — demyelinating, different MRI distribution/course\n- **Tabes dorsalis (neurosyphilis)** — dorsal-column degeneration; check RPR/treponemal serology\n- **HIV / vacuolar myelopathy**\n- **Compressive myelopathy** (cervical spondylosis) — excluded by MRI',
    citation: [13, 14, 5],
    next: 'b12-disposition',
    summary: 'Copper deficiency is the near-identical mimic (check copper + ceruloplasmin, esp. bariatric/zinc or non-responders). Also GBS, MS/TM, tabes, HIV, compression.',
  },

  // =====================================================================
  // MODULE 7: DISPOSITION & PROGNOSIS
  // =====================================================================

  {
    id: 'b12-disposition',
    type: 'result',
    module: 7,
    title: 'Disposition & Prognosis',
    body: '**Disposition:** most patients are managed **outpatient** with hematology and/or neurology follow-up. **Admit** for severe or rapidly progressive neuro deficits, hemodynamically significant anemia, or inability to arrange timely treatment/follow-up.\n\n**Prognosis:** reversibility depends on **duration before treatment** — emphasize early initiation. Some deficits become permanent if treatment is delayed months to years.\n\n**Counsel:** pernicious-anemia and other irreversible-cause patients need **lifelong replacement.** N2O users need cessation counseling.',
    recommendation: 'Recognize subacute combined degeneration (dorsal-column sensory loss + corticospinal UMN signs), and remember neuro disease can occur without anemia. In the 200-400 pg/mL gray zone, send MMA + homocysteine. Never give folate alone. Consider nitrous oxide (causes SCD with a normal B12 — diagnose by elevated MMA/homocysteine). Replace B12 early, parenterally for significant neuro disease. If the patient does not respond or keeps declining, check copper + ceruloplasmin. Most cases are outpatient; admit for severe/progressive deficits or significant anemia.',
    confidence: 'recommended',
    citation: [2, 5, 8],
    summary: 'Mostly outpatient; admit for severe/progressive deficits or significant anemia. Recovery depends on early treatment. Lifelong replacement for irreversible causes.',
  },

];

export const B12_DEFICIENCY_NODE_COUNT = B12_DEFICIENCY_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const B12_DEFICIENCY_MODULE_LABELS = [
  'Recognition',
  'Etiology',
  'Diagnosis',
  'The Traps',
  'Treatment',
  'Differential',
  'Disposition',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const B12_DEFICIENCY_CITATIONS: Citation[] = [
  { num: 1, text: 'Spinal Cord Subacute Combined Degeneration. StatPearls. Treasure Island (FL): StatPearls Publishing. NBK560728.' },
  { num: 2, text: 'Subacute Combined Degeneration. Merck Manual Professional Edition, Spinal Cord Disorders.' },
  { num: 3, text: 'Oh R, Brown DL. Vitamin B12 Deficiency. Am Fam Physician. 2003;67(5):979-986 (2017 update 96(6):384-389).' },
  { num: 4, text: 'Nitrous oxide-induced functional vitamin B12 deficiency causing subacute combined degeneration. Clin Med (Lond). PMC7354036.' },
  { num: 5, text: 'Nitrous Oxide-induced B12 Deficiency Presenting With Myeloneuropathy. PMC6777927.' },
  { num: 6, text: 'Subacute Combined Degeneration of the Cord due to Vitamin B12 Deficiency. J Brown Hosp Med. PMC11864464.' },
  { num: 7, text: 'Nitrous oxide-induced subacute combined degeneration of the cord: diagnosis and treatment. PMC10313972.' },
  { num: 8, text: 'Etiology, Clinical Manifestations, Diagnosis, and Treatment of Cobalamin (Vitamin B12) Deficiency. PMC10859001.' },
  { num: 9, text: 'Vitamin B12 (Cobalamin). StatPearls. NBK559132.' },
  { num: 10, text: 'Diagnostic Accuracy of Holotranscobalamin, Vitamin B12, MMA, and Homocysteine in Detecting B12 Deficiency. PMC7017578.' },
  { num: 11, text: 'Miller JW, et al. Excess Folic Acid and Vitamin B12 Deficiency: Clinical Implications? Food Nutr Bull. 2024.' },
  { num: 12, text: 'Wang H, et al. Oral versus intramuscular vitamin B12 for vitamin B12 deficiency. Cochrane Database Syst Rev. 2018.' },
  { num: 13, text: 'Copper deficiency myelopathy. J Neurol. PMC3691478.' },
  { num: 14, text: 'Kumar N, et al. Copper Deficiency Myelopathy (Human Swayback). Mayo Clin Proc.' },
];
