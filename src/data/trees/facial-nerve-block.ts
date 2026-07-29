// MedKitt — Facial Peripheral Nerve Block (Procedures)
//
// Comprehensive bedside regional anesthesia of the face for laceration repair,
// abscess I&D, foreign-body removal, and burn/wound care. Covers the major
// ED-relevant trigeminal terminal branches plus the external ear:
//   - V1 (ophthalmic): supraorbital + supratrochlear (forehead, anterior scalp);
//        infratrochlear (medial canthus, side/bridge of nose)
//   - V2 (maxillary): infraorbital (lower eyelid, medial cheek, lateral nose,
//        upper lip); external nasal branch (nasal tip/ala)
//   - V3 (mandibular): mental (lower lip, chin); inferior alveolar (mandibular
//        teeth, lower lip via mental); auriculotemporal (temple, anterior ear)
//   - External ear ring block (auriculotemporal + great auricular territories)
//
// Evidence base: Roberts & Hedges' Clinical Procedures in Emergency Medicine
// and Acute Care (8th ed., 2025, ed. Birnbaumer), Ch. 29 "Local and Topical
// Anesthesia" and Ch. 30 "Regional Anesthesia of the Head and Neck";
// Tintinalli regional anesthesia; Moskovitz & Sabatino, "Regional nerve blocks
// of the face," Emerg Med Clin North Am 2013 (PMID 23601486); plus
// block-specific primary anatomy/technique literature (see citations).
//
// IMAGES: per project CLAUDE.md commercial-license rule (CC0 / PD / US-Gov-Work
// ONLY), image hooks are intentionally OMITTED from this initial build pending
// Andy's explicit approval. Candidate PD reference: Gray's Anatomy trigeminal
// plates (Henry Vandyke Carter, 1858 — PD-old-100 via Wikimedia Commons). When
// approved, drop a `NodeImage` array onto the relevant anatomy node referencing
// `images/facial-nerve-block/<file>.png` and add the file +
// `docs/images/facial-nerve-block/MANIFEST.json` (R23 format) in the same commit.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const FACIAL_NERVE_BLOCK_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Entry + Why regional anesthesia for the face
  // ============================================================
  {
    id: 'fnb-start',
    type: 'info',
    module: 1,
    title: 'Facial Peripheral Nerve Block — ED Procedure',
    body: 'Regional anesthesia of the face anesthetizes a whole sensory territory from ONE distant injection — superior to local infiltration for facial wounds because it: (1) avoids tissue distortion of wound margins (critical for accurate cosmetic approximation, especially the vermilion border), (2) needs far less anesthetic volume, and (3) is less painful than multiple infiltrations.\n\nUse for laceration repair, abscess I&D, foreign-body removal, and burn care of the face.\n\nOpen first:\n- [Contraindications + pre-procedure checks](#/node/fnb-contra)\n- [Shared technique for all facial blocks](#/node/fnb-shared-technique)\n- [Procedure Steps Summary](#/info/fnb-steps)\n- [Stop / Pitfalls](#/info/fnb-stop)\n- Tools: [Max LA Dose](#/calculator/fnb-la-max-dose) calculator in the toolbar\n\nThen select which region you need to anesthetize.',
    citation: [1, 15],
    next: 'fnb-region',
    summary: 'Regional block of the face: no wound-margin distortion, less volume, less pain than infiltration.',
    safetyLevel: 'warning',
  },
  {
    id: 'fnb-region',
    type: 'question',
    module: 1,
    title: 'Which Region Needs Anesthesia?',
    body: 'Select the facial region of the wound or procedure. Each routes to the specific terminal trigeminal branch (or ear block) that covers it. Confirm the wound is suitable for delayed repair time (blocks add 5–10 min onset) and that there is no overlying infection at the planned injection site.',
    options: [
      {
        label: 'Forehead / anterior scalp',
        description: 'Supraorbital + supratrochlear nerve block (V1)',
        next: 'fnb-supraorbital',
        urgency: 'routine',
      },
      {
        label: 'Medial canthus / side of nose bridge',
        description: 'Infratrochlear nerve block (V1)',
        next: 'fnb-infratrochlear',
        urgency: 'routine',
      },
      {
        label: 'Lower eyelid / cheek / upper lip / lateral nose',
        description: 'Infraorbital nerve block (V2)',
        next: 'fnb-infraorbital',
        urgency: 'routine',
      },
      {
        label: 'Nasal tip / ala',
        description: 'External nasal branch + infraorbital (V1/V2)',
        next: 'fnb-nasal',
        urgency: 'routine',
      },
      {
        label: 'Lower lip / chin',
        description: 'Mental nerve block (V3)',
        next: 'fnb-mental',
        urgency: 'routine',
      },
      {
        label: 'Mandibular teeth / hemi-lower-lip',
        description: 'Inferior alveolar nerve block (V3)',
        next: 'fnb-inferior-alveolar',
        urgency: 'routine',
      },
      {
        label: 'Temple / anterior ear region',
        description: 'Auriculotemporal nerve block (V3)',
        next: 'fnb-auriculotemporal',
        urgency: 'routine',
      },
      {
        label: 'External ear (auricle)',
        description: 'Ear ring block (auriculotemporal + great auricular)',
        next: 'fnb-ear-ring',
        urgency: 'routine',
      },
    ],
    citation: [1, 3],
    summary: 'Pick region → routes to supraorbital, infratrochlear, infraorbital, nasal, mental, inferior alveolar, auriculotemporal, or ear ring block.',
  },

  // ============================================================
  // Module 2 — Pre-procedure: contraindications + shared setup
  // ============================================================
  {
    id: 'fnb-contra',
    type: 'info',
    module: 2,
    title: 'Contraindications + Pre-procedure Checks',
    body: 'Absolute:\n- Overlying skin infection / cellulitis at the planned injection site (do not inject through infected tissue)\n- Known true allergy to the local anesthetic class (ester allergy more common than amide; if unsure, use a preservative-free amide or consult)\n- Patient refusal / inability to cooperate\n\nRelative — weigh risk/benefit:\n- Therapeutic anticoagulation (these are superficial blocks; bleeding risk is low — apply pressure, document)\n- Distorted anatomy from prior trauma/surgery at the foramen\n- Wound grossly contaminated and better served by infiltration after irrigation\n\nConfirm before any block:\n1. Informed consent (transient numbness, failed/partial block, vascular injection, hematoma, nerve irritation)\n2. Allergies (LA, latex, antiseptic)\n3. Anticoagulation status\n4. Calculate the [maximum safe LA dose](#/calculator/fnb-la-max-dose) BEFORE drawing up — facial blocks use small volumes (1–3 mL) so toxicity is rare, but verify when combining with wound infiltration.\n5. Aspirate before every injection — the face is highly vascular.',
    citation: [2, 4],
    next: 'fnb-region',
    summary: 'No infection at site, no LA allergy; verify max LA dose; aspirate before injecting (vascular face).',
    safetyLevel: 'critical',
  },
  {
    id: 'fnb-shared-technique',
    type: 'info',
    module: 2,
    title: 'Shared Technique — All Facial Blocks',
    body: 'Equipment:\n- 3 mL syringe, 25–27 gauge needle (1–1.5 inch)\n- Antiseptic prep (chlorhexidine or alcohol)\n- 2x2 gauze, bandage\n\nAgent (choose one):\n- [Lidocaine 1–2%](#/drug/lidocaine/facial nerve block) — fast onset (2–5 min), 1–2 h duration\n- [Bupivacaine 0.25–0.5%](#/drug/bupivacaine/facial nerve block) — slower onset (5–10 min), 4–8 h duration; good for prolonged repairs\n- Epinephrine-containing LA is acceptable for most facial blocks and prolongs duration / reduces bleeding. AVOID epinephrine near end-arteries (nasal tip in compromised circulation) — though the classic \"no epi in the nose/ear\" dogma has been largely refuted, use judgment in vasculopaths.\n- Buffer lidocaine 9:1 with sodium bicarbonate to reduce injection pain.\n\nUniversal steps:\n1. Prep skin; let dry.\n2. Warn the patient of a brief sting.\n3. Insert needle, ADVANCE toward the target, ASPIRATE.\n4. Inject SLOWLY (slow injection = less pain). Never inject directly INTO a foramen (nerve injury) — deposit anesthetic adjacent to it.\n5. Wait 5–10 min and TEST the territory before starting the procedure.',
    citation: [2, 5],
    next: 'fnb-region',
    summary: '25–27 ga, lidocaine (fast) or bupivacaine (long), aspirate, inject slowly NEXT TO not into the foramen, wait 5–10 min.',
  },

  // ============================================================
  // Module 3 — Individual blocks (indication / distribution / landmarks)
  // ============================================================

  // ---- V1: Supraorbital + Supratrochlear ----
  {
    id: 'fnb-supraorbital',
    type: 'info',
    module: 3,
    title: 'Supraorbital + Supratrochlear Block (V1)',
    body: '**Indication:** Lacerations/procedures of the forehead and anterior scalp to the vertex.\n\n**Distribution of anesthesia:** Ipsilateral forehead and anterior scalp (supraorbital covers the bulk; supratrochlear covers the medial forehead near the midline). Block both together for full hemi-forehead coverage.\n\n**Landmarks:**\n- The **supraorbital foramen/notch** sits on the superior orbital rim at the **mid-pupillary line** (palpable notch in many patients), roughly in vertical line with the pupil when looking straight ahead.\n- The **supratrochlear nerve** exits ~1–1.5 cm MEDIAL to the supraorbital foramen, near the superomedial orbital angle.\n\n**Technique:**\n1. Palpate the supraorbital notch at the mid-pupillary line on the brow ridge.\n2. Insert the needle just lateral to the notch and direct medially; raise a 1–2 mL wheal over the foramen (do not enter it). Aspirate first.\n3. Without withdrawing fully, redirect medially along the orbital rim toward the superomedial angle and inject another 1 mL to capture the supratrochlear nerve.\n4. Total ~2–3 mL. Apply pressure to limit eyelid ecchymosis.\n\nPitfall: injecting too inferiorly causes upper-eyelid swelling — stay on the rim.',
    citation: [6, 12],
    next: 'fnb-test',
    summary: 'Forehead/anterior scalp. Supraorbital foramen at mid-pupillary line on brow ridge; supratrochlear 1 cm medial. ~2–3 mL.',
  },

  // ---- V1: Infratrochlear ----
  {
    id: 'fnb-infratrochlear',
    type: 'info',
    module: 3,
    title: 'Infratrochlear Block (V1)',
    body: '**Indication:** Lacerations of the medial canthal region, the bridge/upper-lateral side of the nose, and the medial lower eyelid.\n\n**Distribution of anesthesia:** Skin of the medial canthus, root and bridge of the nose, medial upper eyelid, and lacrimal sac region.\n\n**Landmarks:**\n- The **infratrochlear nerve** exits below the trochlea at the **superomedial corner of the orbit**, at the junction of the orbital roof and medial wall (just above the medial canthal tendon / medial canthus).\n\n**Technique:**\n1. Identify the medial canthus and the superomedial orbital angle.\n2. Insert at the superomedial orbital rim, just above the medial canthus, directing toward the bony angle. Aspirate.\n3. Inject 1–2 mL adjacent to the bone. Keep the needle superficial and aim AWAY from the globe.\n\nPitfall: medial orbital structures and the angular vessels — aspirate, inject slowly, and apply pressure to avoid hematoma.',
    citation: [7, 12],
    next: 'fnb-test',
    summary: 'Medial canthus / nose bridge. Exits at superomedial orbital angle just above medial canthus. 1–2 mL, aim away from globe.',
  },

  // ---- V2: Infraorbital ----
  {
    id: 'fnb-infraorbital',
    type: 'info',
    module: 3,
    title: 'Infraorbital Block (V2)',
    body: '**Indication:** The workhorse facial block — lacerations of the lower eyelid, medial cheek, lateral side of the nose, and the UPPER LIP (preserves the vermilion border without distortion).\n\n**Distribution of anesthesia:** Ipsilateral lower eyelid, medial cheek, lateral nose, and upper lip (and via anterior superior alveolar branches, the maxillary incisors/canine).\n\n**Landmarks:**\n- The **infraorbital foramen** lies ~**1 cm below the infraorbital rim**, in the **mid-pupillary line** — vertically aligned with the supraorbital notch and the mental foramen.\n\n**Two approaches:**\n- **Intraoral (preferred — less painful, smaller scar risk):**\n  1. Palpate the foramen externally and keep a fingertip over it.\n  2. Retract the upper lip; insert the needle in the gingivobuccal sulcus above the 2nd premolar / canine, parallel to the long axis of the tooth.\n  3. Advance ~1.5–2 cm toward the palpating finger over the foramen. Aspirate.\n  4. Inject 2–3 mL adjacent to (NOT into) the foramen. The palpating finger prevents superior spread toward the orbit.\n- **Extraoral (percutaneous):** insert ~1 cm below the rim at the mid-pupillary line, direct toward the foramen, aspirate, inject 2–3 mL beside it.\n\nPitfall: never force the needle into the foramen — paresthesia/nerve injury. Keep the finger over the foramen during intraoral approach to direct flow and protect the eye.',
    citation: [8, 15],
    next: 'fnb-test',
    summary: 'Lower eyelid/cheek/upper lip/lateral nose. Foramen 1 cm below infraorbital rim at mid-pupillary line. Intraoral via gingivobuccal sulcus, finger over foramen, 2–3 mL.',
  },

  // ---- V1/V2: Nasal tip / ala ----
  {
    id: 'fnb-nasal',
    type: 'info',
    module: 3,
    title: 'External Nasal / Nasal Tip Block (V1 + V2)',
    body: '**Indication:** Lacerations of the nasal tip, ala, and columella.\n\n**Distribution of anesthesia:** The nasal tip and dorsum are supplied by the **external nasal branch of the anterior ethmoidal nerve (V1)**; the ala and lateral nose by the **infraorbital nerve (V2)**. Full tip anesthesia often needs BOTH.\n\n**Landmarks:**\n- The **external nasal branch** emerges at the junction of the **nasal bone and the upper lateral cartilage** (where the bony dorsum meets the cartilaginous dorsum), in the midline-to-paramedian dorsum.\n\n**Technique:**\n1. For the dorsum/tip: raise a small wheal (0.5–1 mL) at the bony-cartilaginous junction of the nasal dorsum on each side, where the external nasal branch emerges.\n2. For the ala/lateral nose: add a bilateral [infraorbital block](#/node/fnb-infraorbital) as above.\n3. Use small volumes (highly vascular, end-arterial tip). Aspirate. Apply gentle pressure.\n\nPitfall: the nasal tip has limited collateral flow — keep volumes small; the old \"never use epinephrine on the nose\" rule is no longer absolute, but be conservative in vasculopaths.',
    citation: [9, 15],
    next: 'fnb-test',
    summary: 'Nasal tip/ala. External nasal branch at nasal bone–cartilage junction (0.5–1 mL each side) ± bilateral infraorbital. Small volumes.',
  },

  // ---- V3: Mental ----
  {
    id: 'fnb-mental',
    type: 'info',
    module: 3,
    title: 'Mental Nerve Block (V3)',
    body: '**Indication:** Lacerations/procedures of the LOWER LIP and chin (preserves the vermilion border).\n\n**Distribution of anesthesia:** Ipsilateral lower lip and chin skin/mucosa (terminal branch of the inferior alveolar nerve).\n\n**Landmarks:**\n- The **mental foramen** lies below the **2nd mandibular premolar (apex)**, roughly midway between the upper and lower borders of the mandible, in the **mid-pupillary line** (vertically aligned with the supraorbital and infraorbital foramina). In edentulous patients it migrates superiorly toward the alveolar ridge.\n\n**Two approaches:**\n- **Intraoral (preferred):**\n  1. Retract the lower lip; identify the gingivobuccal sulcus at the 2nd premolar.\n  2. Insert the needle into the sulcus aiming toward the foramen; advance ~1 cm. Aspirate.\n  3. Inject 1–2 mL adjacent to the foramen.\n- **Extraoral:** palpate the foramen below the 2nd premolar; inject 1–2 mL percutaneously beside it.\n\nPitfall: do not enter the foramen (nerve injury). Bilateral blocks needed for midline lower-lip wounds crossing midline.',
    citation: [10, 15],
    next: 'fnb-test',
    summary: 'Lower lip/chin. Mental foramen below 2nd premolar at mid-pupillary line. Intraoral via sulcus, 1–2 mL beside foramen. Bilateral for midline.',
  },

  // ---- V3: Inferior alveolar ----
  {
    id: 'fnb-inferior-alveolar',
    type: 'info',
    module: 3,
    title: 'Inferior Alveolar Nerve Block (V3)',
    body: '**Indication:** Mandibular dental pain/procedures, and extensive lower-lip/chin wounds where a more proximal block than the mental nerve is needed (anesthetizes the entire hemi-mandible and ipsilateral lower lip).\n\n**Distribution of anesthesia:** All ipsilateral mandibular teeth, the body of the mandible, the ipsilateral lower lip and chin (via the mental branch), and the anterior 2/3 of the tongue + floor of mouth on that side (lingual nerve co-block is common).\n\n**Landmarks:**\n- Target the **mandibular foramen** on the medial ramus. The needle entry is at the **coronoid notch / pterygomandibular raphe**, ~1 cm above the mandibular occlusal plane.\n\n**Technique (intraoral):**\n1. Palpate the coronoid notch (deepest concavity on the anterior ramus) with the thumb; rest fingers on the posterior ramus to stabilize.\n2. Approach from the contralateral premolars; insert the needle lateral to the pterygomandibular raphe at the level ~1 cm above the lower molar occlusal surface.\n3. Advance ~2–2.5 cm until you gently contact bone (medial ramus), then withdraw 1 mm. Aspirate (the inferior alveolar artery/vein run with the nerve).\n4. Inject 1.5–2 mL. Onset 3–5 min; expect lower-lip numbness as the sign of success.\n\nPitfall: highly vascular — aspirate carefully; positive aspiration → withdraw/redirect. This is a deeper, more technical block; if unfamiliar, a mental block usually suffices for skin wounds.',
    citation: [11, 15],
    next: 'fnb-test',
    summary: 'Hemi-mandible/teeth + lower lip. Mandibular foramen via coronoid notch, contact bone, withdraw 1mm, aspirate, 1.5–2 mL. Vascular.',
    safetyLevel: 'warning',
  },

  // ---- V3: Auriculotemporal ----
  {
    id: 'fnb-auriculotemporal',
    type: 'info',
    module: 3,
    title: 'Auriculotemporal Nerve Block (V3)',
    body: '**Indication:** Lacerations/procedures of the temple, the tragus and anterior/superior auricle, and the skin anterior to the ear.\n\n**Distribution of anesthesia:** Temple skin, anterior/superior external ear (tragus, anterior helix), anterior external auditory canal, and the TMJ region.\n\n**Landmarks:**\n- The **auriculotemporal nerve** runs with the **superficial temporal artery** just ANTERIOR to the tragus/ear, crossing the zygomatic root. Palpate the superficial temporal pulse anterior to the tragus.\n\n**Technique:**\n1. Palpate the superficial temporal artery anterior to the tragus.\n2. Insert just anterior and superior to the tragus, posterior to the palpated artery. Aspirate (artery is right there).\n3. Inject 2–3 mL of LA in a subcutaneous fan anterior to the ear at the level of the zygomatic root.\n\nPitfall: the superficial temporal artery is immediately adjacent — ALWAYS aspirate; intravascular injection risk is real here.',
    citation: [12, 15],
    next: 'fnb-test',
    summary: 'Temple / anterior ear. Auriculotemporal nerve runs with superficial temporal artery anterior to tragus. Aspirate (artery!), 2–3 mL fan.',
    safetyLevel: 'warning',
  },

  // ---- External ear ring block ----
  {
    id: 'fnb-ear-ring',
    type: 'info',
    module: 3,
    title: 'External Ear Ring Block',
    body: '**Indication:** Lacerations, hematoma I&D (auricular hematoma/cauliflower ear), and procedures of the external ear (auricle) — anesthetizes the whole auricle except the concha/EAC.\n\n**Distribution of anesthesia:** The auricle receives a quadruple supply: **great auricular nerve** (most of the posterior/inferior auricle), **auriculotemporal nerve** (anterior/superior auricle), **lesser occipital** (small superoposterior area), and the **auricular branch of the vagus (Arnold)** (concha + EAC — NOT covered by a ring block; supplement with local infiltration of the concha if needed).\n\n**Landmarks / technique (subcutaneous ring around the ear):**\n1. Insert at the **superior** ear attachment; direct the needle inferiorly along the ANTERIOR (anterior to tragus) sulcus and inject ~1.5–2 mL as you withdraw.\n2. Redirect from the same superior entry posteriorly along the POSTERIOR auricular sulcus; inject ~1.5–2 mL.\n3. Repeat from the **inferior** ear attachment (lobule), injecting anteriorly and posteriorly, creating a complete diamond/ring of anesthetic around the ear base.\n4. Aspirate at each pass. Total ~6–8 mL — verify against the [max LA dose](#/calculator/fnb-la-max-dose).\n5. The concha and external canal (Arnold/vagal supply) need separate local infiltration.\n\nPitfall: classic teaching avoided epinephrine in the ear; current evidence shows epinephrine is generally safe, but stay conservative in vasculopaths and avoid encircling pressure that could compromise the auricle.',
    citation: [13, 16],
    next: 'fnb-test',
    summary: 'Whole auricle (not concha/canal). Subcutaneous ring from superior + inferior entries, anterior + posterior passes, ~6–8 mL, aspirate. Concha = Arnold/vagus, infiltrate separately.',
  },

  // ============================================================
  // Module 4 — Verify, complications, documentation
  // ============================================================
  {
    id: 'fnb-test',
    type: 'question',
    module: 4,
    title: 'Test the Block Before Proceeding',
    body: 'Wait 5–10 minutes, then test pinprick/sharp sensation across the intended territory and compare to the contralateral side.\n\nIs the territory anesthetized?',
    options: [
      {
        label: 'Yes — fully numb',
        description: 'Proceed with the wound repair or procedure',
        next: 'fnb-complications',
        urgency: 'routine',
      },
      {
        label: 'Partial / patchy',
        description: 'Supplement: re-block (verify landmark) or add small-volume local infiltration at the deficient edge (stay under max LA dose)',
        next: 'fnb-partial',
        urgency: 'routine',
      },
      {
        label: 'No effect after 10 min',
        description: 'Recheck landmark and foramen position; consider anatomic variation; re-attempt once or switch to local infiltration',
        next: 'fnb-partial',
        urgency: 'routine',
      },
    ],
    citation: [1, 6],
    summary: 'Wait 5–10 min, test pinprick vs contralateral. Full → proceed. Partial/none → supplement or re-block within max dose.',
  },
  {
    id: 'fnb-partial',
    type: 'info',
    module: 4,
    title: 'Rescue a Partial / Failed Block',
    body: 'Causes of failure:\n- Wrong foramen level (recheck the mid-pupillary line alignment for supraorbital/infraorbital/mental)\n- Anatomic variation in foramen position\n- Insufficient wait time (bupivacaine can take 8–10 min)\n- Too little volume\n\nRescue options:\n1. Re-confirm the landmark and re-inject 1–2 mL adjacent to the foramen (aspirate first).\n2. Add targeted LOCAL infiltration at the still-sensate wound edge — small volume, injected slowly, from within the wound margin to minimize pain.\n3. ALWAYS re-check the running total against the [max LA dose](#/calculator/fnb-la-max-dose) before adding more anesthetic.\n4. If still failing, proceed with full local infiltration or reassess the plan.',
    citation: [2, 6],
    next: 'fnb-complications',
    summary: 'Failure = wrong level / variation / short wait / low volume. Re-block, add local infiltration, recheck max dose.',
  },
  {
    id: 'fnb-complications',
    type: 'info',
    module: 4,
    title: 'Complications + Recognition',
    body: 'Common / minor:\n- Local hematoma or ecchymosis (especially periorbital blocks and auriculotemporal near the temporal artery) — apply pressure\n- Transient pain on injection\n- Failed/partial block\n- Prolonged numbness beyond expected duration (self-limited)\n\nUncommon but important:\n- **Intravascular injection** — facial vasculature is dense (angular, infraorbital, superficial temporal, inferior alveolar vessels). Aspirate before EVERY injection. Systemic LA toxicity (perioral numbness, tinnitus, metallic taste → seizures, cardiac) is the feared endpoint — keep total dose under the calculated maximum.\n- **Nerve injury / persistent paresthesia** — from injecting INTO a foramen or intraneural injection. Prevent by depositing anesthetic ADJACENT to, never inside, the foramen, and stopping if the patient reports an electric shock.\n- **Globe injury** — only a risk with periorbital (supraorbital/infratrochlear) blocks; keep the needle on the orbital rim and direct away from the globe.\n- **Infection** — rare with antiseptic prep; never inject through infected skin.\n\n**Local anesthetic systemic toxicity (LAST):** if suspected → stop injecting, give O2, manage airway, treat seizures (benzodiazepine), and give 20% **lipid emulsion** 1.5 mL/kg bolus then infusion. Have it available for high-volume blocks.',
    citation: [4, 14],
    next: 'fnb-doc',
    summary: 'Hematoma, intravascular injection (aspirate!), nerve injury (inject beside not into foramen), globe risk (periorbital), LAST → lipid emulsion.',
    safetyLevel: 'warning',
  },
  {
    id: 'fnb-doc',
    type: 'result',
    module: 4,
    title: 'Procedure Note Template',
    body: '**Procedure:** [Supraorbital+supratrochlear / Infratrochlear / Infraorbital / External nasal / Mental / Inferior alveolar / Auriculotemporal / Ear ring] nerve block, [right/left/bilateral].\n**Indication:** [Facial laceration repair / abscess I&D / foreign-body removal / burn care] at [site].\n**Consent:** Verbal informed consent obtained; risks of transient numbness, failed/partial block, hematoma, intravascular injection, and nerve irritation discussed; patient agrees.\n**Allergies / anticoagulation:** [documented].\n**Agent / dose:** [Lidocaine 1% / Bupivacaine 0.25–0.5%] [± epinephrine], [X] mL total — confirmed under maximum weight-based dose ([X] mg/kg).\n**Landmarks:** [foramen at mid-pupillary line / coronoid notch / superficial temporal pulse / ear ring], identified by palpation.\n**Technique:** [intraoral / extraoral / ring]; 25–27 ga needle; negative aspiration before each injection; slow injection adjacent to (not into) the foramen.\n**Effect:** Adequate anesthesia confirmed by pinprick at [X] min; procedure performed.\n**Tolerance / complications:** Tolerated well; no hematoma, intravascular injection, or LAST.\n**Disposition:** [wound aftercare + return precautions given].',
    recommendation: 'Document block type, indication, consent, agent/dose (under max), landmarks, aspiration, confirmed effect, and disposition.',
    confidence: 'definitive',
    citation: [1, 3],
    summary: 'Note must capture: block type, indication, consent, agent/dose under max, landmarks, aspiration, confirmed effect, dispo.',
  },
];

export const FACIAL_NERVE_BLOCK_CRITICAL_ACTIONS = [
  { text: 'No overlying infection at the injection site and no true LA allergy before any block.', nodeId: 'fnb-contra' },
  { text: 'Calculate the maximum weight-based LA dose before drawing up — especially when combining a block with wound infiltration.', nodeId: 'fnb-contra' },
  { text: 'Ear ring block uses a higher total volume (~6–8 mL) — verify it against the maximum LA dose before injecting.', nodeId: 'fnb-ear-ring' },
  { text: 'ASPIRATE before every injection — the face is densely vascular (angular, infraorbital, superficial temporal, inferior alveolar vessels).', nodeId: 'fnb-complications' },
  { text: 'Deposit anesthetic ADJACENT to the foramen, never INTO it — intraneural injection causes persistent paresthesia.', nodeId: 'fnb-shared-technique' },
  { text: 'For periorbital blocks (supraorbital, infratrochlear), keep the needle on the orbital rim and direct away from the globe.', nodeId: 'fnb-complications' },
  { text: 'Wait 5–10 min and TEST the territory before starting the procedure.', nodeId: 'fnb-test' },
  { text: 'Suspected LAST → stop, O2, treat seizures, give 20% lipid emulsion 1.5 mL/kg.', nodeId: 'fnb-complications' },
];

export const FACIAL_NERVE_BLOCK_CITATIONS: Citation[] = [
  { num: 1, text: 'Birnbaumer DM, ed. Roberts and Hedges\u2019 Clinical Procedures in Emergency Medicine and Acute Care. 8th ed. Philadelphia: Elsevier; 2025. Ch. 30, Regional Anesthesia of the Head and Neck. ISBN 9780323779227.' },
  { num: 2, text: 'Birnbaumer DM, ed. Roberts and Hedges\u2019 Clinical Procedures in Emergency Medicine and Acute Care. 8th ed. Philadelphia: Elsevier; 2025. Ch. 29, Local and Topical Anesthesia. ISBN 9780323779227.' },
  { num: 3, text: 'Tintinalli JE, Ma OJ, Yealy DM, et al., eds. Tintinalli\u2019s Emergency Medicine: A Comprehensive Study Guide. 9th ed. New York: McGraw-Hill; 2020. Local and Regional Anesthesia. ISBN 9781260019933.' },
  { num: 4, text: 'Neal JM, Neal EJ, Weinberg GL. American Society of Regional Anesthesia and Pain Medicine local anesthetic systemic toxicity checklist: 2020 version. Reg Anesth Pain Med. 2021;46(1):81-82. PMID 33148630. (Supersedes the 2017/2018 Third ASRA Practice Advisory executive summary, PMID 29356773.)' },
  { num: 5, text: 'Christoph RA, Buchanan L, Begalla K, Schwartz S. Pain reduction in local anesthetic administration through pH buffering. Ann Emerg Med. 1988;17(2):117-120. PMID 2827545. (Replaces Cepeda MS, et al. Cochrane Database Syst Rev. 2010;(12):CD006581, PMID 21154371 \u2014 WITHDRAWN from the Cochrane Library in 2015, PMID 25993661.)' },
  { num: 6, text: 'Salam GA. Regional anesthesia for office procedures: part I. Head and neck surgeries. Am Fam Physician. 2004;69(3):585-590. PMID 14971840.' },
  { num: 7, text: 'Shin KJ, Lee SH, Shin HJ. Emergence point of the infratrochlear nerve with reference to the nasion for periorbital nerve block. J Oral Maxillofac Surg. 2025;83(10):1209-1215. PMID 40609964.' },
  { num: 8, text: 'Lynch MT, Syverud SA, Schwab RA, Jenkins JM, Edlich R. Comparison of intraoral and percutaneous approaches for infraorbital nerve block. Acad Emerg Med. 1994;1(6):514-519. PMID 7600397.' },
  { num: 9, text: 'Mortimer NJ, Hussain W, Sladden MJ, Salmon PJ. Regional nerve blockade prior to direct injection to achieve anaesthesia of the nasal ala. Br J Dermatol. 2010;162(4):819-821. PMID 20222925.' },
  { num: 10, text: 'Syverud SA, Jenkins JM, Schwab RA, Lynch MT, Knoop K, Trott A. A comparative study of the percutaneous versus intraoral technique for mental nerve block. Acad Emerg Med. 1994;1(6):509-513. PMID 7600396.' },
  { num: 11, text: 'Malamed SF. Handbook of Local Anesthesia. 7th ed. St. Louis: Elsevier; 2020. Ch. 14, Techniques of Mandibular Anesthesia. ISBN 9780323676861.' },
  { num: 12, text: 'Andersen NB, Bovim G, Sjaastad O. The frontotemporal peripheral nerves. Topographic variations of the supraorbital, supratrochlear and auriculotemporal nerves and their possible clinical significance. Surg Radiol Anat. 2001;23(2):97-104. PMID 11462869.' },
  { num: 13, text: 'Flores S, Herring AA. Ultrasound-guided greater auricular nerve block for emergency department ear laceration and ear abscess drainage. J Emerg Med. 2016;50(4):651-655. PMID 26589558.' },
  { num: 14, text: 'Weinberg GL. Lipid emulsion infusion: resuscitation for local anesthetic and other drug overdose. Anesthesiology. 2012;117(1):180-187. PMID 22627464.' },
  { num: 15, text: 'Moskovitz JB, Sabatino F. Regional nerve blocks of the face. Emerg Med Clin North Am. 2013;31(2):517-527. PMID 23601486.' },
  { num: 16, text: 'Kravchik L, Ng M, Hsu NM, VanHoy TB. Peripheral nerve block of the external ear. In: StatPearls. Treasure Island (FL): StatPearls Publishing; updated 2026 Jan. PMID 30860741. NOTE: tertiary, non-peer-reviewed reference work \u2014 supporting/orientation source only, not a primary evidence basis.' },
];

export const FACIAL_NERVE_BLOCK_NODE_COUNT = FACIAL_NERVE_BLOCK_NODES.length;
export const FACIAL_NERVE_BLOCK_MODULE_LABELS = ['Region', 'Pre-procedure', 'Blocks', 'Verify & Document'];
