// MedKitt — Dental / Intraoral Nerve Blocks (Procedures)
//
// Comprehensive bedside intraoral regional anesthesia for the ED: odontogenic
// pain, dental fractures, intraoral/dentoalveolar lacerations, alveolar abscess
// (adjunct), and tooth-related procedures. Covers the ED-relevant maxillary (V2)
// and mandibular (V3) intraoral techniques:
//   - Supraperiosteal (local) infiltration — single maxillary tooth
//   - Anterior superior alveolar (ASA) / infraorbital — maxillary incisors–canine
//   - Middle superior alveolar (MSA) — maxillary premolars
//   - Posterior superior alveolar (PSA) — maxillary molars
//   - Greater (anterior) palatine — posterior hard palate
//   - Nasopalatine — anterior hard palate
//   - Inferior alveolar (IANB) — all mandibular teeth of a quadrant + lower lip
//   - Lingual — anterior 2/3 tongue, floor of mouth, lingual gingiva (co-block w/ IANB)
//   - (Long) buccal — buccal gingiva/mucosa of mandibular molars
//   - Mental (± incisive) — mandibular premolars to midline, lower lip/chin
//
// Evidence base: Roberts & Hedges' Clinical Procedures in Emergency Medicine and
// Acute Care (8th ed.), Ch. 64 "Regional Nerve Blocks of the Head and Neck" and
// Ch. 30 "Local and Topical Anesthesia"; Malamed SF, Handbook of Local Anesthesia
// (7th ed.); Tintinalli's Emergency Medicine (9th ed.) oral/dental emergencies.
//
// IMAGES: per project CLAUDE.md commercial-license rule (CC0 / PD / US-Gov-Work
// ONLY), image hooks are intentionally OMITTED from this initial build pending
// Andy's explicit approval. Candidate PD references: Gray's Anatomy maxillary /
// mandibular nerve plates (Henry Vandyke Carter, 1858 — PD-old-100 via Wikimedia
// Commons) and Wikimedia CC0 intraoral landmark diagrams. When approved, drop a
// `NodeImage` array onto the relevant block node referencing
// `images/dental-nerve-blocks/<file>.png` plus a
// `docs/images/dental-nerve-blocks/MANIFEST.json` (R23 format) in the same commit.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const DENTAL_NERVE_BLOCKS_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Entry + region selection
  // ============================================================
  {
    id: 'dnb-start',
    type: 'info',
    module: 1,
    title: 'Dental / Intraoral Nerve Blocks — ED Procedure',
    body: 'Intraoral regional anesthesia controls odontogenic (toothache) pain, anesthetizes for dental fracture/avulsion management, and enables repair of intraoral and dentoalveolar lacerations — often more effective and humane than systemic analgesia alone.\n\nKey principle: the maxillary teeth (V2) are usually anesthetized by SUPRAPERIOSTEAL infiltration or superior-alveolar blocks because maxillary bone is porous; the mandibular teeth (V3) require an INFERIOR ALVEOLAR NERVE BLOCK because dense cortical bone blocks infiltration.\n\nOpen first:\n- [Contraindications + pre-procedure checks](#/node/dnb-contra)\n- [Shared technique for all intraoral blocks](#/node/dnb-shared-technique)\n- [Procedure Steps Summary](#/info/dnb-steps)\n- [Stop / Pitfalls](#/info/dnb-stop)\n- Tools: [Max LA Dose](#/calculator/dnb-la-max-dose) and [Block Selector](#/calculator/dnb-block-selector) in the toolbar\n\nThen select which tooth or region needs anesthesia.',
    citation: [1, 2],
    next: 'dnb-region',
    summary: 'Maxillary teeth (V2) = supraperiosteal/superior-alveolar (porous bone). Mandibular teeth (V3) = inferior alveolar block (dense bone).',
    safetyLevel: 'warning',
  },
  {
    id: 'dnb-region',
    type: 'question',
    module: 1,
    title: 'Which Tooth or Region Needs Anesthesia?',
    body: 'Select the tooth or intraoral region. Maxillary = upper arch; mandibular = lower arch. Each routes to the block(s) that cover that territory. Confirm no overlying infection at the injection site and calculate the max LA dose first.',
    options: [
      {
        label: 'Single maxillary tooth (any)',
        description: 'Supraperiosteal (local) infiltration — fastest for one upper tooth',
        next: 'dnb-supraperiosteal',
        urgency: 'routine',
      },
      {
        label: 'Maxillary incisors / canine',
        description: 'Anterior superior alveolar (ASA) / infraorbital block (V2)',
        next: 'dnb-asa',
        urgency: 'routine',
      },
      {
        label: 'Maxillary premolars',
        description: 'Middle superior alveolar (MSA) block (V2)',
        next: 'dnb-msa',
        urgency: 'routine',
      },
      {
        label: 'Maxillary molars',
        description: 'Posterior superior alveolar (PSA) block (V2)',
        next: 'dnb-psa',
        urgency: 'routine',
      },
      {
        label: 'Posterior hard palate (palatal soft tissue)',
        description: 'Greater (anterior) palatine block (V2)',
        next: 'dnb-greater-palatine',
        urgency: 'routine',
      },
      {
        label: 'Anterior hard palate (behind upper incisors)',
        description: 'Nasopalatine block (V2)',
        next: 'dnb-nasopalatine',
        urgency: 'routine',
      },
      {
        label: 'Any / all mandibular teeth of a quadrant',
        description: 'Inferior alveolar nerve block (IANB) ± lingual (V3)',
        next: 'dnb-ianb',
        urgency: 'routine',
      },
      {
        label: 'Mandibular premolars to midline / lower lip / chin',
        description: 'Mental (± incisive) nerve block (V3)',
        next: 'dnb-mental',
        urgency: 'routine',
      },
      {
        label: 'Buccal gingiva of mandibular molars',
        description: '(Long) buccal nerve block (V3) — adjunct to IANB',
        next: 'dnb-buccal',
        urgency: 'routine',
      },
    ],
    citation: [1, 2, 3],
    summary: 'Pick tooth/region → supraperiosteal, ASA, MSA, PSA, greater palatine, nasopalatine, IANB, mental, or long buccal.',
  },

  // ============================================================
  // Module 2 — Pre-procedure: contraindications + shared setup
  // ============================================================
  {
    id: 'dnb-contra',
    type: 'info',
    module: 2,
    title: 'Contraindications + Pre-procedure Checks',
    body: 'Absolute:\n- Active infection/cellulitis at the planned injection site (do not inject through infected tissue — risks spreading infection and the block often fails in acidic infected tissue)\n- Known true allergy to the local anesthetic class\n- Patient unable to cooperate / protect the airway with an anesthetized tongue and floor of mouth\n\nRelative — weigh risk/benefit:\n- Therapeutic anticoagulation (intraoral blocks are mostly superficial/low-risk except deep IANB where the inferior alveolar vessels run with the nerve — aspirate, apply pressure)\n- Bisphosphonate/antiresorptive use (caution with any dentoalveolar trauma; coordinate with dentistry)\n- Trismus limiting access for an IANB\n\nConfirm before any block:\n1. Informed consent (transient numbness of lip/tongue, self-inflicted bite injury while numb, failed/partial block, hematoma, vascular injection, transient facial nerve palsy with a misdirected IANB).\n2. Allergies (LA, latex, antiseptic, topical benzocaine).\n3. Anticoagulation status.\n4. Calculate the [maximum safe LA dose](#/calculator/dnb-la-max-dose) BEFORE drawing up. Dental cartridges are 1.8 mL — track cartridge count.\n5. Apply topical anesthetic (benzocaine 20% or lidocaine gel) to the dried mucosa for 1–2 min to reduce needle-stick pain.\n6. Aspirate before every injection.',
    citation: [1, 4],
    next: 'dnb-region',
    summary: 'No infection at site, no LA allergy; topical first; verify max LA dose (1.8 mL/cartridge); aspirate (esp. IANB — vessels with nerve).',
    safetyLevel: 'critical',
  },
  {
    id: 'dnb-shared-technique',
    type: 'info',
    module: 2,
    title: 'Shared Technique — All Intraoral Blocks',
    body: 'Equipment:\n- 3 mL syringe (or dental aspirating syringe), 25–27 gauge needle (1 inch for infiltration; 1.5 inch/“long” for IANB)\n- Topical benzocaine 20% gel on a cotton applicator\n- 2x2 gauze to dry mucosa and retract\n- Good light + suction\n\nAgent (choose one):\n- [Lidocaine 2% with epinephrine 1:100,000](#/drug/lidocaine/dental nerve block) — standard dental concentration; fast onset, ~60 min pulpal / 3–4 h soft-tissue; epinephrine prolongs and reduces bleeding (intraoral end-arteries are not a concern).\n- [Bupivacaine 0.5% with epinephrine](#/drug/bupivacaine/dental nerve block) — slower onset, long duration (good for prolonged pain control / overnight relief).\n- Articaine 4% (dental) is widely used by dentistry for superior diffusion; lidocaine is the default ED agent.\n- Buffer lidocaine 9:1 with sodium bicarbonate to reduce sting.\n\nUniversal steps:\n1. Dry mucosa, apply topical for 1–2 min.\n2. Retract the lip/cheek; keep the tissue taut.\n3. Insert with bevel toward bone; advance to the target depth.\n4. ASPIRATE (rotate 90° and re-aspirate for the IANB).\n5. Inject SLOWLY (≥1 min per cartridge — slow = less pain and safer).\n6. Wait for onset (3–5 min infiltration; 5–10 min IANB) and TEST before proceeding.',
    citation: [1, 2, 5],
    next: 'dnb-region',
    summary: 'Topical first; 25–27 ga (long needle for IANB); lidocaine 2% w/ epi standard; bevel to bone; aspirate (double for IANB); inject slowly; test.',
  },

  // ============================================================
  // Module 3 — Maxillary (V2) blocks
  // ============================================================
  {
    id: 'dnb-supraperiosteal',
    type: 'info',
    module: 3,
    title: 'Supraperiosteal (Local) Infiltration — Maxillary',
    body: '**Indication:** Anesthesia of a SINGLE maxillary tooth and its buccal soft tissue — the workhorse for one upper tooth (toothache, fracture, simple repair). Works because maxillary alveolar bone is thin and porous.\n\n**Distribution of anesthesia:** The targeted maxillary tooth (pulp) and the overlying buccal gingiva/mucosa. Does NOT anesthetize the palatal soft tissue (add a palatal injection if palatal work is needed).\n\n**Landmarks:**\n- The **mucobuccal fold (gingivobuccal sulcus)** at the apex of the target tooth. The root apex is the target.\n\n**Technique:**\n1. Retract the lip; dry and apply topical at the mucobuccal fold over the tooth.\n2. Orient the bevel toward bone. Insert at the height of the mucobuccal fold above the apex of the tooth.\n3. Advance only a few millimeters until the needle tip is at/above the apex (do not contact bone forcefully). Aspirate.\n4. Deposit ~1–1.8 mL slowly. The anesthetic diffuses through the porous cortex to the apical nerves.\n5. Onset 3–5 min.\n\nPitfall: depositing below the apex (too shallow) gives soft-tissue but not pulpal anesthesia — get the tip to the apex level.',
    citation: [1, 2, 6],
    next: 'dnb-test',
    summary: 'Single maxillary tooth. Inject at mucobuccal fold to the root apex, bevel to bone, ~1–1.8 mL. Buccal only (palate not covered).',
  },
  {
    id: 'dnb-asa',
    type: 'info',
    module: 3,
    title: 'Anterior Superior Alveolar / Infraorbital Block (V2)',
    body: '**Indication:** The maxillary central/lateral incisors and canine on one side (and their facial soft tissue) — useful for multiple anterior teeth or when local infiltration over an infected anterior tooth is undesirable.\n\n**Distribution of anesthesia:** Via the infraorbital nerve and its anterior superior alveolar branch: the maxillary incisors and canine (pulp), plus the lower eyelid, lateral nose, and upper lip skin (the cutaneous infraorbital territory).\n\n**Landmarks:**\n- The **infraorbital foramen** is ~1 cm below the infraorbital rim at the **mid-pupillary line**. The intraoral entry is the **mucobuccal fold above the maxillary 1st premolar/canine**.\n\n**Technique (intraoral, preferred):**\n1. Palpate the infraorbital foramen externally; keep a fingertip over it to guide and to prevent superior spread toward the orbit.\n2. Retract the upper lip; insert at the mucobuccal fold above the 1st premolar, parallel to the long axis of the tooth, advancing toward the palpating finger over the foramen (~1.5–2 cm).\n3. Aspirate. Deposit 1.5–3 mL adjacent to (NOT into) the foramen.\n4. Massage over the foramen to encourage anterior/middle superior alveolar diffusion (needed for pulpal anesthesia of the incisors).\n\nPitfall: never force the needle into the foramen (paresthesia). The finger over the foramen protects the eye and directs flow toward the teeth.',
    citation: [1, 2, 7],
    next: 'dnb-test',
    summary: 'Maxillary incisors/canine + cheek/lip skin. Infraorbital foramen 1 cm below rim, mid-pupillary line. Intraoral via 1st-premolar sulcus, finger over foramen, 1.5–3 mL.',
  },
  {
    id: 'dnb-msa',
    type: 'info',
    module: 3,
    title: 'Middle Superior Alveolar (MSA) Block (V2)',
    body: '**Indication:** The maxillary premolars (and the mesiobuccal root of the 1st molar) when present — note the MSA nerve is absent in ~30–50% of people, in whom the ASA/infraorbital block covers the premolars.\n\n**Distribution of anesthesia:** The maxillary 1st and 2nd premolars (pulp) and overlying buccal gingiva; the mesiobuccal root of the 1st molar.\n\n**Landmarks:**\n- The **mucobuccal fold above the maxillary 2nd premolar**.\n\n**Technique:**\n1. Retract the cheek; dry and apply topical at the mucobuccal fold above the 2nd premolar.\n2. Bevel toward bone; insert until the tip is above the apex of the 2nd premolar. Aspirate.\n3. Deposit ~0.9–1.8 mL slowly.\n4. Onset 3–5 min.\n\nPitfall: if anesthesia of the premolars fails, the MSA may be absent — fall back to a supraperiosteal infiltration over each tooth or an ASA/infraorbital block.',
    citation: [1, 2, 8],
    next: 'dnb-test',
    summary: 'Maxillary premolars + mesiobuccal root of 1st molar. Inject at mucobuccal fold above 2nd premolar apex, ~0.9–1.8 mL. MSA absent in ~30–50% (use ASA).',
  },
  {
    id: 'dnb-psa',
    type: 'info',
    module: 3,
    title: 'Posterior Superior Alveolar (PSA) Block (V2)',
    body: '**Indication:** The maxillary molars (except the mesiobuccal root of the 1st molar, often MSA-supplied) and their buccal gingiva.\n\n**Distribution of anesthesia:** Maxillary 2nd and 3rd molars and the distobuccal/palatal roots of the 1st molar (pulp), plus the overlying buccal gingiva. Add a supraperiosteal infiltration over the 1st molar if its mesiobuccal root is not numb.\n\n**Landmarks:**\n- The **mucobuccal fold above the maxillary 2nd molar**, aiming for the **posterosuperior aspect of the maxillary tuberosity** where the PSA nerve enters foramina.\n\n**Technique:**\n1. Retract the cheek; dry and apply topical above the 2nd molar.\n2. Insert at the mucobuccal fold above the 2nd molar; advance the needle UP, IN, and BACK (superiorly, medially, and posteriorly) at ~45° to ~16 mm depth following the curve of the tuberosity.\n3. ASPIRATE carefully — the **pterygoid venous plexus** lies here; this is the highest-hematoma-risk intraoral block.\n4. Deposit ~0.9–1.8 mL slowly.\n\nPitfall: over-insertion or positive aspiration → pterygoid plexus hematoma (rapid facial swelling). Aspirate, do not over-advance, and apply pressure.',
    citation: [1, 2, 9],
    next: 'dnb-test',
    summary: 'Maxillary molars + buccal gingiva. Inject above 2nd molar, advance up/in/back ~16 mm along tuberosity, ~0.9–1.8 mL. Aspirate — pterygoid plexus = hematoma risk.',
    safetyLevel: 'warning',
  },
  {
    id: 'dnb-greater-palatine',
    type: 'info',
    module: 3,
    title: 'Greater (Anterior) Palatine Block (V2)',
    body: '**Indication:** Palatal soft-tissue anesthesia of the POSTERIOR hard palate — needed for palatal lacerations, palatal abscess drainage, or palatal manipulation of maxillary premolars/molars.\n\n**Distribution of anesthesia:** The palatal mucosa and bone from the distal of the canine back to the posterior hard palate, on the injected side (does NOT anesthetize teeth pulp — pair with a buccal/PSA block for tooth work).\n\n**Landmarks:**\n- The **greater palatine foramen** lies on the hard palate ~**1 cm medial to the gingival margin of the maxillary 2nd/3rd molar**, at the junction of the alveolar process and the palatine bone. A soft-tissue depression can often be felt with a cotton applicator.\n\n**Technique:**\n1. Apply firm pressure with a cotton applicator at the foramen site for ischemia/pre-anesthesia (palatal injections are painful) and topical.\n2. Insert at/just anterior to the foramen with the bevel toward the tissue; advance gently to bone.\n3. Aspirate. Deposit ONLY 0.3–0.5 mL slowly — the palatal mucosa is tightly bound; small volume, slow injection.\n\nPitfall: palatal injections hurt — use pressure anesthesia, small volume, and slow injection. Over-volume causes painful tissue blanching/sloughing.',
    citation: [1, 2, 10],
    next: 'dnb-test',
    summary: 'Posterior hard palate soft tissue. Greater palatine foramen ~1 cm medial to 2nd/3rd molar gingiva. Pressure first, 0.3–0.5 mL only, slow.',
  },
  {
    id: 'dnb-nasopalatine',
    type: 'info',
    module: 3,
    title: 'Nasopalatine Block (V2)',
    body: '**Indication:** Palatal soft-tissue anesthesia of the ANTERIOR hard palate behind the upper incisors — for anterior palatal lacerations or bilateral anterior palatal procedures.\n\n**Distribution of anesthesia:** The palatal mucosa and bone of the anterior hard palate from canine to canine (bilateral) — one injection covers both sides.\n\n**Landmarks:**\n- The **incisive foramen**, beneath the **incisive papilla** — the small bulge of mucosa in the midline just behind (palatal to) the two central incisors.\n\n**Technique:**\n1. Apply pressure with a cotton applicator on the incisive papilla and topical (this is one of the most sensitive intraoral sites).\n2. Insert just LATERAL to the papilla (not directly into it — less painful), bevel toward tissue; advance gently toward the foramen until bone.\n3. Aspirate. Deposit ONLY 0.3–0.5 mL very slowly.\n\nPitfall: the incisive papilla is exquisitely sensitive — pressure anesthesia, lateral approach, tiny volume, very slow injection.',
    citation: [1, 2, 11],
    next: 'dnb-test',
    summary: 'Anterior hard palate (canine to canine, bilateral). Incisive foramen under the incisive papilla behind central incisors. Approach lateral to papilla, 0.3–0.5 mL only.',
  },

  // ============================================================
  // Module 4 — Mandibular (V3) blocks
  // ============================================================
  {
    id: 'dnb-ianb',
    type: 'info',
    module: 4,
    title: 'Inferior Alveolar Nerve Block (IANB) (V3)',
    body: '**Indication:** The single most useful ED dental block — anesthetizes ALL mandibular teeth of one quadrant, useful for any lower toothache, mandibular fracture/avulsion, or extensive lower-lip wounds. Mandibular teeth cannot be reliably infiltrated (dense cortical bone), so the IANB is required.\n\n**Distribution of anesthesia:** All ipsilateral mandibular teeth (pulp), the body of the mandible, the buccal mucosa anterior to the mental foramen, and — via the mental branch — the ipsilateral lower lip and chin. A LINGUAL nerve co-block (almost always achieved) adds the anterior 2/3 of the tongue, the floor of the mouth, and the lingual gingiva on that side. It does NOT cover the buccal gingiva of the molars (add a [long buccal block](#/node/dnb-buccal)).\n\n**Landmarks:**\n- Target the **mandibular foramen** on the medial surface of the ramus. Entry is at the **coronoid notch / pterygomandibular raphe**, ~**1 cm above the mandibular occlusal plane**.\n\n**Technique (intraoral):**\n1. Palpate the **coronoid notch** (greatest concavity of the anterior ramus) with the thumb; rest fingers on the posterior border of the ramus to gauge depth.\n2. Position the barrel of the syringe over the **contralateral premolars**. Insert lateral to the pterygomandibular raphe, ~1 cm above the occlusal plane, between the thumbnail (notch) and the raphe.\n3. Advance ~20–25 mm until you GENTLY contact bone (medial ramus). Withdraw ~1 mm.\n4. ASPIRATE (the inferior alveolar artery/vein run with the nerve — rotate the syringe and re-aspirate). \n5. Deposit ~1.5 mL over the nerve. Then withdraw halfway and deposit ~0.5 mL to catch the **lingual nerve**.\n6. Onset 5–10 min; the SIGN of success is numbness of the ipsilateral lower lip.\n\nPitfall: inserting too deep WITHOUT contacting bone risks injecting into the parotid → **transient facial nerve (CN VII) palsy**. Always contact bone before injecting. Positive aspiration → withdraw/redirect. Warn the patient not to bite the numb lip/tongue.',
    citation: [1, 2, 12],
    next: 'dnb-test',
    summary: 'All mandibular teeth + lower lip/chin + (lingual) tongue/floor. Coronoid notch, barrel over contralateral premolars, contact bone at ~20–25mm, withdraw 1mm, aspirate, 1.5mL + 0.5mL on withdrawal for lingual. No bone contact → CN VII palsy risk.',
    safetyLevel: 'warning',
  },
  {
    id: 'dnb-buccal',
    type: 'info',
    module: 4,
    title: '(Long) Buccal Nerve Block (V3)',
    body: '**Indication:** Anesthesia of the BUCCAL soft tissue (gingiva/mucosa) of the mandibular MOLARS — an adjunct to the IANB when buccal soft-tissue work is needed (e.g., buccal laceration, rubber-dam clamp, surgical access to molars). The IANB alone does NOT numb the buccal gingiva of the molars.\n\n**Distribution of anesthesia:** The buccal soft tissue and gingiva lateral to the mandibular molars (does not anesthetize teeth).\n\n**Landmarks:**\n- The **buccal mucosa distal and buccal to the most posterior mandibular molar**, at the level of the occlusal plane.\n\n**Technique:**\n1. Retract the cheek laterally; dry and apply topical at the mucosa distal/buccal to the last molar.\n2. Insert a few millimeters into the mucosa at the occlusal-plane level; aspirate.\n3. Deposit ~0.3 mL as tissue blanches.\n4. Onset is rapid (1–2 min).\n\nPitfall: this is a small soft-tissue infiltration — overshooting deep is unnecessary; keep it submucosal.',
    citation: [1, 2, 13],
    next: 'dnb-test',
    summary: 'Buccal gingiva of mandibular molars (adjunct to IANB). Inject submucosally distal/buccal to last molar at occlusal plane, ~0.3 mL.',
  },
  {
    id: 'dnb-mental',
    type: 'info',
    module: 4,
    title: 'Mental (± Incisive) Nerve Block (V3)',
    body: '**Indication:** The mandibular premolars to the midline (incisors, canine, premolars) and/or the lower lip and chin — when a full IANB is not needed (e.g., anterior lower-lip laceration, anterior lower tooth pain). Adding intraforaminal pressure converts it to an INCISIVE nerve block for pulpal anesthesia of the anterior teeth.\n\n**Distribution of anesthesia:** Mental block → lower lip, chin, and labial/buccal mucosa anterior to the foramen. With incisive component (pressure to drive anesthetic into the foramen) → pulp of the ipsilateral premolars, canine, and incisors.\n\n**Landmarks:**\n- The **mental foramen** lies below/between the apices of the **mandibular 1st and 2nd premolars**, in the **mid-pupillary line** (vertically aligned with the supraorbital and infraorbital foramina). In edentulous patients it migrates toward the alveolar crest.\n\n**Technique (intraoral):**\n1. Palpate the foramen externally; retract the lower lip and identify the mucobuccal fold at the premolars.\n2. Insert at the mucobuccal fold just anterior to/at the foramen, directing toward it; advance ~5–6 mm. Aspirate.\n3. Deposit ~1–1.8 mL. For pulpal (incisive) anesthesia of the anterior teeth, apply finger pressure over the foramen for ~1–2 min to drive anesthetic in.\n\nPitfall: do not enter the foramen (paresthesia). For wounds crossing the midline, the lower lip needs a BILATERAL block.',
    citation: [1, 2, 14],
    next: 'dnb-test',
    summary: 'Mandibular premolars-to-midline + lower lip/chin. Mental foramen below 1st/2nd premolars, mid-pupillary line. ~1–1.8 mL; pressure over foramen = incisive (pulpal) block. Bilateral for midline lip.',
  },

  // ============================================================
  // Module 5 — Verify, complications, documentation
  // ============================================================
  {
    id: 'dnb-test',
    type: 'question',
    module: 5,
    title: 'Test the Block Before Proceeding',
    body: 'Wait for onset (3–5 min for infiltration/maxillary blocks; 5–10 min for the IANB). Test:\n- Soft tissue: pinprick the gingiva/lip vs the contralateral side. For the IANB, lower-lip numbness is the classic sign.\n- Tooth (pulp): cold test or gentle percussion is painless when anesthetized.\n\nIs the target anesthetized?',
    options: [
      {
        label: 'Yes — fully numb',
        description: 'Proceed with the repair / procedure / pain control',
        next: 'dnb-complications',
        urgency: 'routine',
      },
      {
        label: 'Partial / patchy',
        description: 'Supplement: re-block (verify landmark), add buccal/palatal injection, or supraperiosteal over the deficient tooth (stay under max dose)',
        next: 'dnb-partial',
        urgency: 'routine',
      },
      {
        label: 'No effect after 10 min',
        description: 'Recheck landmark/depth; consider accessory innervation or absent MSA; re-attempt once or escalate',
        next: 'dnb-partial',
        urgency: 'routine',
      },
    ],
    citation: [1, 2],
    summary: 'Wait 3–10 min, test pinprick/cold vs contralateral (lower-lip numb = IANB success). Full → proceed. Partial/none → supplement or re-block within max dose.',
  },
  {
    id: 'dnb-partial',
    type: 'info',
    module: 5,
    title: 'Rescue a Partial / Failed Block',
    body: 'Common causes of failure:\n- **IANB:** too anterior/low, or not deep enough — the most commonly missed block. Re-confirm the coronoid notch and that you contacted bone ~20–25 mm in. Accessory innervation (mylohyoid nerve) can supply lower molars — add a buccal-floor infiltration.\n- **Maxillary:** tip below the apex (soft tissue only, no pulp), or absent MSA for premolars.\n- Insufficient wait (bupivacaine 8–10 min), too little volume, or block attempted in acidic infected tissue.\n\nRescue options:\n1. Re-confirm the landmark and re-inject (aspirate first).\n2. Add a supraperiosteal infiltration over the specific deficient maxillary tooth, or a buccal/palatal injection for soft-tissue gaps.\n3. For a failed IANB, consider repeating with attention to depth/bone contact, or an alternative mandibular technique.\n4. ALWAYS re-check the running total against the [max LA dose](#/calculator/dnb-la-max-dose) before adding more.',
    citation: [1, 4],
    next: 'dnb-complications',
    summary: 'IANB fails most (too low/shallow or accessory mylohyoid) — re-confirm bone contact. Maxillary: tip-below-apex or absent MSA. Re-block / infiltrate / recheck max dose.',
  },
  {
    id: 'dnb-complications',
    type: 'info',
    module: 5,
    title: 'Complications + Recognition',
    body: 'Common / minor:\n- Failed/partial block (especially IANB)\n- Self-inflicted bite/burn injury of the numb lip, cheek, or tongue — WARN every patient, especially children\n- Transient pain on injection (palatal blocks worst)\n- Trismus / soreness at the IANB site\n\nUncommon but important:\n- **Hematoma** — highest risk with the PSA block (pterygoid venous plexus → rapid facial swelling) and the IANB (inferior alveolar vessels). Aspirate before injecting; apply pressure; ice + reassurance for most.\n- **Transient facial nerve (CN VII) palsy** — from an IANB needle placed too deep/posterior into the parotid gland; presents as ipsilateral facial droop and inability to close the eye. Self-limited (resolves as LA wears off); protect the eye, reassure. Prevent by contacting bone before injecting.\n- **Intravascular injection** — aspirate before EVERY injection; the IANB and PSA are highest-risk.\n- **Nerve injury / persistent paresthesia** — deposit beside, not into, the foramen; stop if the patient reports an electric shock.\n- **Needle breakage** — rare; never bend the needle or insert to the hub; use a long needle for the IANB.\n\n**Local anesthetic systemic toxicity (LAST):** perioral numbness, tinnitus, metallic taste → seizures, cardiac collapse. If suspected → stop injecting, O2, manage airway, treat seizures (benzodiazepine), and give 20% **lipid emulsion** 1.5 mL/kg bolus then infusion. Keep total dose under the calculated maximum.',
    citation: [1, 4, 15],
    next: 'dnb-doc',
    summary: 'Bite injury (warn!), hematoma (PSA pterygoid plexus, IANB vessels — aspirate), transient CN VII palsy (IANB too deep), intravascular injection, LAST → lipid emulsion.',
    safetyLevel: 'warning',
  },
  {
    id: 'dnb-doc',
    type: 'result',
    module: 5,
    title: 'Procedure Note Template',
    body: '**Procedure:** [Supraperiosteal infiltration / ASA-infraorbital / MSA / PSA / greater palatine / nasopalatine / inferior alveolar / long buccal / mental] block, [tooth #/region], [right/left/bilateral].\n**Indication:** [Odontogenic pain / dental fracture / dentoalveolar or intraoral laceration repair / abscess management] at [site].\n**Consent:** Verbal informed consent obtained; risks of transient lip/tongue numbness, self-inflicted bite injury, failed/partial block, hematoma, intravascular injection, and (for IANB) transient facial palsy discussed; patient agrees.\n**Allergies / anticoagulation:** [documented].\n**Agent / dose:** [Lidocaine 2% with epinephrine 1:100,000 / Bupivacaine 0.5%], [X] cartridges = [X] mL ([X] mg) total — confirmed under maximum weight-based dose ([X] mg/kg).\n**Topical:** Benzocaine 20% applied to dried mucosa prior to injection.\n**Landmarks:** [mucobuccal fold at apex / infraorbital foramen / greater palatine foramen / incisive papilla / coronoid notch with bone contact / mental foramen], identified by palpation.\n**Technique:** Negative aspiration before each injection (double-aspiration for IANB); slow injection adjacent to (not into) the foramen.\n**Effect:** Adequate anesthesia confirmed at [X] min ([lower-lip numbness for IANB]); procedure performed.\n**Tolerance / complications:** Tolerated well; no hematoma, intravascular injection, facial palsy, or LAST.\n**Disposition:** [dental follow-up, bite-precaution and return instructions given].',
    recommendation: 'Document block type, tooth/region, indication, consent (incl. bite-injury warning), agent/dose (cartridges → mg, under max), landmarks with bone contact for IANB, aspiration, confirmed effect, and dental follow-up.',
    confidence: 'definitive',
    citation: [1],
    summary: 'Note must capture: block type, tooth/region, indication, consent w/ bite warning, agent/dose (cartridges→mg, under max), landmarks, aspiration, confirmed effect, dental f/u.',
  },
];

export const DENTAL_NERVE_BLOCKS_CRITICAL_ACTIONS = [
  { text: 'No active infection/cellulitis at the injection site and no true LA allergy before any block; apply topical first.', nodeId: 'dnb-contra' },
  { text: 'Calculate the maximum weight-based LA dose before drawing up — dental cartridges are 1.8 mL; track cartridge count and convert to mg.', nodeId: 'dnb-contra' },
  { text: 'ASPIRATE before every injection; double-aspirate (rotate 90°) for the inferior alveolar block — the IA artery/vein run with the nerve.', nodeId: 'dnb-shared-technique' },
  { text: 'For the IANB, advance until you GENTLY contact bone before injecting — no bone contact risks parotid injection and transient facial-nerve palsy.', nodeId: 'dnb-ianb' },
  { text: 'Deposit anesthetic ADJACENT to the foramen, never INTO it — intraneural injection causes persistent paresthesia.', nodeId: 'dnb-shared-technique' },
  { text: 'Warn every patient (especially children) not to bite or burn the numb lip, cheek, or tongue.', nodeId: 'dnb-complications' },
  { text: 'Wait for onset and TEST the territory (lower-lip numbness for IANB) before starting the procedure.', nodeId: 'dnb-test' },
  { text: 'Suspected LAST → stop, O2, treat seizures, give 20% lipid emulsion 1.5 mL/kg.', nodeId: 'dnb-complications' },
];

export const DENTAL_NERVE_BLOCKS_CITATIONS: Citation[] = [
  { num: 1, text: 'Roberts JR, Custalow CB, Thomsen TW, eds. Roberts and Hedges\u2019 Clinical Procedures in Emergency Medicine and Acute Care. 8th ed. Philadelphia: Elsevier; 2023. Ch. 64, Regional Nerve Blocks of the Head and Neck.' },
  { num: 2, text: 'Malamed SF. Handbook of Local Anesthesia. 7th ed. St. Louis: Elsevier; 2020. Techniques of Maxillary and Mandibular Anesthesia.' },
  { num: 3, text: 'Roberts JR, Custalow CB, Thomsen TW, eds. Roberts and Hedges\u2019 Clinical Procedures in Emergency Medicine and Acute Care. 8th ed. Philadelphia: Elsevier; 2023. Ch. 30, Local and Topical Anesthesia.' },
  { num: 4, text: 'Neal JM, Barrington MJ, Fettiplace MR, et al. The Third American Society of Regional Anesthesia and Pain Medicine Practice Advisory on Local Anesthetic Systemic Toxicity: Executive Summary 2017. Reg Anesth Pain Med. 2018;43(2):113-123.' },
  { num: 5, text: 'Cepeda MS, Tzortzopoulou A, Thackrey M, et al. Adjusting the pH of lidocaine for reducing pain on injection. Cochrane Database Syst Rev. 2010;(12):CD006581.' },
  { num: 6, text: 'Tintinalli JE, et al., eds. Tintinalli\u2019s Emergency Medicine: A Comprehensive Study Guide. 9th ed. New York: McGraw-Hill; 2020. Oral and Dental Emergencies; Local and Regional Anesthesia.' },
  { num: 7, text: 'Lynch MT, Syverud SA, Schwab RA, Jenkins JM, Edlich R. Comparison of intraoral and percutaneous approaches for infraorbital nerve block. Acad Emerg Med. 1994;1(6):514-519.' },
  { num: 8, text: 'Malamed SF. Handbook of Local Anesthesia. 7th ed. St. Louis: Elsevier; 2020. Middle Superior Alveolar Nerve Block (MSA absent in 30\u201350%).' },
  { num: 9, text: 'Malamed SF. Handbook of Local Anesthesia. 7th ed. St. Louis: Elsevier; 2020. Posterior Superior Alveolar Nerve Block and pterygoid plexus hematoma risk.' },
  { num: 10, text: 'Malamed SF. Handbook of Local Anesthesia. 7th ed. St. Louis: Elsevier; 2020. Greater (Anterior) Palatine Nerve Block.' },
  { num: 11, text: 'Malamed SF. Handbook of Local Anesthesia. 7th ed. St. Louis: Elsevier; 2020. Nasopalatine Nerve Block.' },
  { num: 12, text: 'Malamed SF. Handbook of Local Anesthesia. 7th ed. St. Louis: Elsevier; 2020. Inferior Alveolar Nerve Block; transient facial nerve palsy from over-insertion.' },
  { num: 13, text: 'Malamed SF. Handbook of Local Anesthesia. 7th ed. St. Louis: Elsevier; 2020. (Long) Buccal Nerve Block.' },
  { num: 14, text: 'Syverud SA, Jenkins JM, Schwab RA, Lynch MT, Knoop K, Trott A. A comparative study of the percutaneous versus intraoral technique for mental nerve block. Acad Emerg Med. 1994;1(6):509-513.' },
  { num: 15, text: 'Weinberg GL. Lipid emulsion infusion: resuscitation for local anesthetic and other drug overdose. Anesthesiology. 2012;117(1):180-187.' },
];

export const DENTAL_NERVE_BLOCKS_NODE_COUNT = DENTAL_NERVE_BLOCKS_NODES.length;
export const DENTAL_NERVE_BLOCKS_MODULE_LABELS = ['Region', 'Pre-procedure', 'Maxillary Blocks', 'Mandibular Blocks', 'Verify & Document'];
