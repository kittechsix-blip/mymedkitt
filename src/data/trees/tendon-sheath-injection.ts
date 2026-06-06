// MedKitt — ED Tendon-Sheath Steroid Injection: de Quervain + Trigger Finger
// (Procedures: MSK / Regional)
//
// de Quervain tenosynovitis (first dorsal compartment) and trigger finger (A1
// pulley) are frequent ED/urgent-care complaints where a single corticosteroid
// injection is first-line and gives same-visit relief instead of a referral and
// weeks of pain. EM under-uses it because landmark/sheath-confirmation technique
// is unfamiliar. Two-target selector with tendon-excursion confirmation and
// subcutaneous-atrophy avoidance.
//
// IMAGES: first dorsal compartment + A1 pulley landmark diagrams are the planned
// references. Image hooks are intentionally OMITTED pending Andy's approval per
// project image rule. When approved, attach NodeImage arrays to `tsi-dq-landmark`
// and `tsi-tf-landmark` and add the files + MANIFEST.json in the same commit.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const TENDON_SHEATH_INJECTION_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Diagnose + Select Target
  // ============================================================
  {
    id: 'tsi-start',
    type: 'info',
    module: 1,
    title: 'Tendon-Sheath Steroid Injection — de Quervain / Trigger Finger',
    body: 'A single corticosteroid injection into the tendon sheath is first-line for de Quervain tenosynovitis and trigger finger, often giving same-visit relief.\n\nTools (open first):\n- [Procedure Steps Summary](#/info/tsi-steps)\n- [Steroid Prep + Dose Card](#/info/tsi-steroid-dose)\n- [Sheath-vs-Tendon Confirmation Checklist](#/info/tsi-sheath-confirm)\n- [Skin Atrophy / Depigmentation Caution](#/info/tsi-atrophy)\n- [Hand-Surgery Referral Criteria](#/info/tsi-referral)',
    citation: [1, 2],
    next: 'tsi-diagnose',
    summary: 'Single steroid injection is first-line for de Quervain + trigger finger; confirm sheath, avoid SC deposit.',
    safetyLevel: 'warning',
  },
  {
    id: 'tsi-diagnose',
    type: 'question',
    module: 1,
    title: 'Which Condition?',
    body: 'Confirm the diagnosis clinically and exclude infection before injecting any steroid.',
    options: [
      {
        label: 'de Quervain tenosynovitis',
        description: 'Radial-sided wrist pain over the first dorsal compartment; positive Finkelstein (pain with thumb-in-fist ulnar deviation); tender/swollen over the radial styloid.',
        next: 'tsi-contra',
        urgency: 'routine',
      },
      {
        label: 'Trigger finger (stenosing tenosynovitis, A1 pulley)',
        description: 'Catching/locking of a finger in flexion; palpable tender nodule at the A1 pulley over the distal palm/MCP; painful triggering with flexion-extension.',
        next: 'tsi-contra',
        urgency: 'routine',
      },
      {
        label: 'Uncertain / red flags',
        description: 'Signs of infection (flexor tenosynovitis — Kanavel signs), trauma, or atypical features. Do NOT inject; work up first.',
        next: 'tsi-redflag',
        urgency: 'urgent',
      },
    ],
    citation: [1, 2, 3],
    summary: 'de Quervain (Finkelstein) vs trigger finger (A1 nodule/triggering); exclude infection.',
  },
  {
    id: 'tsi-redflag',
    type: 'result',
    module: 1,
    title: 'Do NOT Inject — Work Up First',
    body: 'Steroid into an infected sheath is dangerous. Exclude **flexor tenosynovitis** (Kanavel signs: fusiform swelling, finger held in flexion, tenderness along the flexor sheath, pain on passive extension) — this is a surgical emergency, not an injection.\n\nIf infection or trauma is suspected:\n- Do NOT inject corticosteroid\n- Evaluate for septic flexor tenosynovitis → urgent hand surgery\n- Image / work up atypical masses or trauma before any injection',
    recommendation: 'Exclude flexor tenosynovitis and infection before any tendon-sheath steroid injection.',
    confidence: 'definitive',
    citation: [3],
    safetyLevel: 'critical',
    summary: 'Rule out flexor tenosynovitis (Kanavel) / infection before injecting; surgical if present.',
  },
  {
    id: 'tsi-contra',
    type: 'info',
    module: 1,
    title: 'Contraindications + Consent',
    body: 'Before injecting:\n- **Absolute:** overlying skin infection, suspected septic tenosynovitis, known steroid/anesthetic allergy\n- **Relative / counsel:** poorly controlled diabetes (transient glucose rise), prior injections at the same site (limit repeats; diminishing returns and tissue effects), anticoagulation (superficial injection, low risk; hold pressure)\n- **Consent points:** transient post-injection flare, fat atrophy and skin depigmentation at the site (more visible in darker skin — see [Skin Atrophy / Depigmentation Caution](#/info/tsi-atrophy)), tendon rupture if injected into the tendon itself, infection, and that symptoms may recur and need surgery',
    citation: [2, 4],
    next: 'tsi-select',
    summary: 'No infection/septic sheath/allergy; counsel flare, fat atrophy/depigmentation, rupture, recurrence.',
    safetyLevel: 'warning',
  },
  {
    id: 'tsi-select',
    type: 'question',
    module: 1,
    title: 'Proceed to Target',
    body: 'Pick the compartment to inject. Each uses the same principle: deposit steroid + anesthetic INTO the sheath (free flow, low resistance), not into the tendon.',
    options: [
      {
        label: 'First dorsal compartment (de Quervain)',
        description: 'Inject the sheath of APL/EPB at the radial styloid.',
        next: 'tsi-dq-landmark',
        urgency: 'routine',
      },
      {
        label: 'A1 pulley (trigger finger)',
        description: 'Inject the flexor sheath at the A1 pulley over the distal palm.',
        next: 'tsi-tf-landmark',
        urgency: 'routine',
      },
    ],
    citation: [1, 2],
    summary: 'Choose first dorsal compartment (de Quervain) or A1 pulley (trigger finger).',
  },

  // ============================================================
  // Module 2 — Landmarks + Technique
  // ============================================================
  {
    id: 'tsi-dq-landmark',
    type: 'info',
    module: 2,
    title: 'de Quervain — Landmarks',
    body: 'Target: the first dorsal compartment sheath containing **abductor pollicis longus (APL)** and **extensor pollicis brevis (EPB)** at the radial styloid.\n\n1. Identify the radial styloid; palpate the tender APL/EPB tendons as the patient extends/abducts the thumb.\n2. Beware the **radial sensory nerve** branches and the radial artery in the anatomical snuffbox just distal/dorsal — avoid them.\n3. Watch for a septum dividing EPB into its own subcompartment (present in a substantial minority) — a cause of injection failure; ultrasound guidance improves accuracy if available.\n\n**[IMAGE PENDING ANDY APPROVAL]** \u2014 a first-dorsal-compartment landmark diagram is planned here pending approval per project image rule.',
    citation: [1, 5],
    next: 'tsi-technique',
    summary: 'First dorsal compartment (APL/EPB) at radial styloid; avoid radial sensory nerve/artery; watch for septum.',
  },
  {
    id: 'tsi-tf-landmark',
    type: 'info',
    module: 2,
    title: 'Trigger Finger — Landmarks',
    body: 'Target: the **flexor tendon sheath at the A1 pulley**, located over the metacarpal head / distal palmar crease region of the affected digit (palpable tender nodule that moves with the tendon).\n\n1. Palpate the A1 pulley nodule at the distal palm over the MCP of the affected finger.\n2. Approach from the palmar surface at a shallow angle aimed proximally/into the sheath; the digital neurovascular bundles run along the sides of the finger \u2014 stay midline over the tendon.\n\n**[IMAGE PENDING ANDY APPROVAL]** \u2014 an A1-pulley landmark diagram is planned here pending approval per project image rule.',
    citation: [2, 6],
    next: 'tsi-technique',
    summary: 'A1 pulley at distal palm over MCP nodule; palmar midline approach; avoid lateral digital bundles.',
  },
  {
    id: 'tsi-technique',
    type: 'info',
    module: 2,
    title: 'Injection Technique',
    body: 'Same principle for both targets. Dose details in [Steroid Prep + Dose Card](#/info/tsi-steroid-dose).\n\n1. Sterile prep. Draw corticosteroid + a small volume of [Lidocaine 1%](#/drug/lidocaine/tendon sheath injection) (e.g., ~1 mL total injectate).\n2. Insert a 25-27 ga needle into the sheath at the landmark.\n3. **Confirm you are in the sheath, not the tendon** \u2014 use the [Sheath-vs-Tendon Confirmation Checklist](#/info/tsi-sheath-confirm): the injectate should flow with LOW resistance; if you meet high resistance, you are likely in the tendon \u2014 withdraw slightly. A classic confirmation is watching the needle move with passive tendon excursion (in-tendon) vs staying still (in-sheath); back the needle out until it no longer moves with the tendon.\n4. Inject slowly. Stop and reposition if resistance is high.\n5. Keep the deposit deep in the sheath, NOT subcutaneous (subcutaneous steroid causes fat atrophy/depigmentation).',
    citation: [1, 2, 4],
    next: 'tsi-resistance',
    summary: 'Steroid + lidocaine into sheath; low-resistance flow; back out if needle moves with tendon; avoid SC.',
    safetyLevel: 'critical',
  },
  {
    id: 'tsi-resistance',
    type: 'question',
    module: 2,
    title: 'High Resistance on Injection?',
    body: 'Resistance is the key intra-procedural safety signal. **High resistance = needle in the tendon \u2014 injecting risks rupture.**',
    options: [
      {
        label: 'Low resistance, free flow',
        description: 'You are in the sheath. Complete the injection slowly.',
        next: 'tsi-aftercare',
        urgency: 'routine',
      },
      {
        label: 'High resistance / needle moves with tendon',
        description: 'Stop. Withdraw the needle 1-2 mm until flow is free and the needle no longer moves with passive tendon motion, then inject.',
        next: 'tsi-aftercare',
        urgency: 'urgent',
      },
    ],
    citation: [4],
    safetyLevel: 'critical',
    summary: 'Low resistance → inject; high resistance → withdraw off the tendon before injecting.',
  },

  // ============================================================
  // Module 3 — Aftercare + Disposition
  // ============================================================
  {
    id: 'tsi-aftercare',
    type: 'info',
    module: 3,
    title: 'Aftercare + Counseling',
    body: '1. Apply a small dressing; brief pressure.\n2. Counsel:\n- Relief typically over days; up to ~70% improve after a single injection for trigger finger; de Quervain also responds well, especially with a complete sheath block.\n- A transient post-injection pain flare in the first 24-48 h is common.\n- Watch the injection site for fat atrophy / skin depigmentation (usually months later, often reversible).\n- Return for signs of infection (spreading redness, warmth, fever) or for tendon-rupture symptoms (sudden loss of motion).\n3. Activity: relative rest; a thumb spica (de Quervain) or brief splinting can be adjunctive.\n4. Repeat injections have diminishing returns \u2014 persistent/recurrent cases go to hand surgery (see [Hand-Surgery Referral Criteria](#/info/tsi-referral)).',
    citation: [2, 4, 6],
    next: 'tsi-doc',
    summary: 'Counsel days-to-relief (~70% trigger finger), flare, atrophy/depigmentation, infection/rupture return.',
  },
  {
    id: 'tsi-doc',
    type: 'result',
    module: 3,
    title: 'Procedure Note Template',
    body: '**Procedure:** Tendon-sheath corticosteroid injection \u2014 [first dorsal compartment, de Quervain / A1 pulley, trigger finger], [right/left] [thumb/finger].\n**Indication:** [de Quervain tenosynovitis (positive Finkelstein) / trigger finger (A1 nodule + triggering)]; infection/septic tenosynovitis excluded.\n**Consent:** Risks of flare, fat atrophy/depigmentation, tendon rupture, infection, and recurrence discussed; patient agrees.\n**Agent:** [Triamcinolone / methylprednisolone / dexamethasone] [dose] + lidocaine 1% ~[X] mL.\n**Technique:** 25-27 ga into the sheath; low-resistance free flow confirmed; needle did not move with passive tendon excursion; deposit kept off subcutaneous tissue.\n**Tolerance:** Tolerated well; no complications.\n**Disposition:** Discharged; [splint]; return precautions; hand-surgery follow-up if no improvement or recurrence.',
    recommendation: 'Document target, diagnosis, infection exclusion, agent/dose, sheath confirmation, dispo/referral.',
    confidence: 'definitive',
    citation: [2],
    summary: 'Note: target, diagnosis, infection excluded, agent/dose, sheath confirmation, dispo + referral.',
  },
];

export const TENDON_SHEATH_INJECTION_CRITICAL_ACTIONS = [
  { text: 'Exclude flexor (septic) tenosynovitis \u2014 Kanavel signs \u2014 before any steroid injection; that is surgical, not injectable.', nodeId: 'tsi-redflag' },
  { text: 'Inject INTO the sheath, not the tendon: low-resistance free flow; if the needle moves with tendon excursion, withdraw.', nodeId: 'tsi-technique' },
  { text: 'High resistance on injection = needle in tendon \u2014 stop and withdraw before injecting to avoid rupture.', nodeId: 'tsi-resistance' },
  { text: 'Keep the steroid deep in the sheath \u2014 subcutaneous deposit causes fat atrophy and depigmentation (worse in darker skin).', nodeId: 'tsi-technique' },
  { text: 'Persistent or recurrent cases (and de Quervain with an EPB septum) go to hand surgery; repeat injections have diminishing returns.', nodeId: 'tsi-aftercare' },
];

export const TENDON_SHEATH_INJECTION_CITATIONS: Citation[] = [
  { num: 1, text: 'Tallia AF, Cardone DA. Diagnostic and therapeutic injection of the wrist and hand region. Am Fam Physician. 2003;67(4):745-750.' },
  { num: 2, text: 'Makkouk AH, Oetgen ME, Swigart CR, Dodds SD. Trigger finger: etiology, evaluation, and treatment. Curr Rev Musculoskelet Med. 2008;1(2):92-96. (See also Medscape Trigger Finger Treatment & Management.)' },
  { num: 3, text: 'Kennedy CD, Huang JI, Hanel DP. In Brief: Kanavel\u2019s Signs and Pyogenic Flexor Tenosynovitis. Clin Orthop Relat Res. 2016;474(1):280-284.' },
  { num: 4, text: 'Roberts JR, Custalow CB, Thomsen TW. Roberts and Hedges\u2019 Clinical Procedures in Emergency Medicine and Acute Care \u2014 MSK/soft-tissue injection (domain comparator only).' },
  { num: 5, text: 'Goel R, Abzug JM. de Quervain\u2019s tenosynovitis: a review of the rehabilitative options. Hand (N Y). 2015;10(1):1-5. (See also Medscape de Quervain Tenosynovitis Technique.)' },
  { num: 6, text: 'Peters-Veluthamaningal C, et al. Corticosteroid injection for trigger finger in adults. Cochrane Database Syst Rev. 2009;(1):CD005617.' },
];

export const TENDON_SHEATH_INJECTION_NODE_COUNT = TENDON_SHEATH_INJECTION_NODES.length;
export const TENDON_SHEATH_INJECTION_MODULE_LABELS = ['Diagnose + Select', 'Landmarks + Technique', 'Aftercare + Disposition'];
