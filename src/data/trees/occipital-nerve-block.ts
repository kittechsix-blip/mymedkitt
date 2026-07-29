// MedKitt — Occipital Nerve Block (Procedures)
//
// First split of the headache-hub batch (PLAN.md Phase 4, canary order #1).
// ED-relevant peripheral nerve block for:
//   - Cluster headache (acute attack rescue + bridge)
//   - Occipital neuralgia
//   - Cervicogenic headache
//   - Post-traumatic headache
//   - Hemicrania continua (indomethacin-responsive)
//   - Status migrainosus refractory to parenteral cocktail
//
// IMAGES: per project CLAUDE.md commercial-license rule (CC0 / PD / US-Gov-Work
// ONLY) and Andy's 2026-05-22 image-strategy decision, the only licensable
// candidate is Gray's Anatomy plate 800 (Henry Vandyke Carter, 1858 — PD-old-100
// via Wikimedia Commons https://commons.wikimedia.org/wiki/File:Gray800.png).
// Image hooks are intentionally OMITTED from this initial build pending Andy's
// explicit approval per project rule. When approved, drop a `NodeImage` array
// onto `onb-anatomy` referencing `images/occipital-nerve-block/gray800.png` and
// add the file + `docs/images/occipital-nerve-block/MANIFEST.json` (R23 format)
// in the same commit.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const OCCIPITAL_NERVE_BLOCK_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Entry + Indication screening
  // ============================================================
  {
    id: 'onb-start',
    type: 'info',
    module: 1,
    title: 'Greater Occipital Nerve Block — ED Procedure',
    body: 'Bedside peripheral block for cluster headache rescue, occipital neuralgia, cervicogenic headache, post-traumatic headache, hemicrania continua, and refractory status migrainosus.\n\nOpen first:\n- [Procedure Steps Summary](#/info/onb-steps)\n- [Anatomy Reference](#/node/onb-anatomy-ref)\n- [Stop / Pitfalls](#/info/onb-stop)\n\nReturn to [Headache Hub](#/tree/headache-hub) for the broader workup if diagnosis is uncertain.',
    citation: [1, 2],
    next: 'onb-indication',
    summary: 'Peripheral block: 5-15 min onset, 4-6 h LA duration, ~78% acute cluster response.',
    safetyLevel: 'warning',
  },
  {
    id: 'onb-indication',
    type: 'question',
    module: 1,
    title: 'Why Are You Blocking?',
    body: 'Confirm a benign headache phenotype has been worked up. Secondary causes (SAH, dissection, CVST, AACG, hypertensive emergency, meningitis) MUST be excluded first.',
    options: [
      {
        label: 'Cluster headache — acute attack',
        description: 'Severe unilateral periorbital/temporal pain with autonomic features; failed O2 + SQ triptan or contraindication',
        next: 'onb-contra',
        urgency: 'urgent',
      },
      {
        label: 'Cluster headache — bridge therapy',
        description: 'Active cluster bout; transitioning to verapamil prophylaxis; oral steroid contraindicated',
        next: 'onb-contra',
        urgency: 'urgent',
      },
      {
        label: 'Occipital neuralgia',
        description: 'Paroxysmal sharp shooting pain in GON distribution; tender over GON; reproducible on palpation',
        next: 'onb-contra',
        urgency: 'routine',
      },
      {
        label: 'Cervicogenic / post-traumatic HA',
        description: 'Unilateral headache with cervical movement triggers, or persistent post-traumatic occipital pain',
        next: 'onb-contra',
        urgency: 'routine',
      },
      {
        label: 'Status migrainosus — refractory',
        description: 'Migraine >72 h refractory to IV cocktail (Metoclopramide + Diphenhydramine + Ketorolac + Dexamethasone + IVF) and DHE',
        next: 'onb-contra',
        urgency: 'urgent',
      },
      {
        label: 'Diagnosis unclear — return to hub',
        description: 'Send back through the Headache Hub red-flag screener first',
        next: 'onb-no-indication',
      },
    ],
    citation: [1, 2, 3, 5],
    summary: 'Cluster (acute + bridge), occipital neuralgia, cervicogenic, post-traumatic, refractory status migrainosus.',
  },
  {
    id: 'onb-no-indication',
    type: 'result',
    module: 1,
    title: 'Return to Headache Hub for Workup',
    body: 'No clear indication for occipital block. Re-screen for red flags + complete diagnostic workup before considering a procedural option.\n\nOpen [Headache Hub](#/tree/headache-hub).',
    recommendation: 'Do not perform ONB without a defined indication.',
    confidence: 'definitive',
    citation: [1, 3],
    safetyLevel: 'warning',
  },

  // ============================================================
  // Module 2 — Contraindications / Pre-procedure
  // ============================================================
  {
    id: 'onb-contra',
    type: 'info',
    module: 2,
    title: 'Contraindications + Pre-procedure Checks',
    body: 'Absolute:\n- Overlying skin infection at injection site\n- Known allergy to local anesthetic class (amide LA cross-reactivity is rare; ester allergy is more common)\n- Patient refusal\n\nRelative — escalate / consult:\n- Therapeutic anticoagulation (INR >3, new DOAC dose <24 h, unfractionated heparin gtt) — per ASRA 2018 deep peripheral block guidance, ONB is superficial and bleeding risk is low, but document risk/benefit\n- Prior skull defect / craniectomy at injection site (palpate carefully, ultrasound if available)\n- Active occipital scalp pathology (alopecia areata in injection field, cellulitis, prior infection)\n- Pregnancy: LA is generally safe; AVOID steroid adjunct (use LA-only)\n\nConfirm:\n1. Informed verbal/written consent (vasovagal, transient numbness, alopecia at site if steroid used, intra-arterial injection risk)\n2. Allergies (LA, latex, antiseptic)\n3. Anticoagulation status + last dose\n4. IV access if vasovagal-prone or anxious patient\n5. Monitor in place for 15 min post-procedure',
    citation: [2, 4, 14, 15],
    next: 'onb-anatomy-ref',
    summary: 'No skin infection, no LA allergy, document anticoag risk/benefit; no steroid in pregnancy.',
    safetyLevel: 'critical',
  },
  {
    id: 'onb-anatomy-ref',
    type: 'info',
    module: 2,
    title: 'Anatomy — GON, LON, Occipital Artery',
    body: 'Greater Occipital Nerve (GON):\n- Origin: medial branch of C2 dorsal ramus\n- Emerges through trapezius/semispinalis capitis ~2-3 cm lateral to midline at the level of the superior nuchal line\n- Landmark: ~1/3 of the distance from external occipital protuberance (inion) to the mastoid process\n- Lies MEDIAL to the occipital artery (palpate the artery to avoid intra-arterial injection)\n\nLesser Occipital Nerve (LON):\n- Origin: C2-C3 (cervical plexus, sensory)\n- Located lateral to GON, approximately 2/3 of the way from inion to mastoid along the superior nuchal line\n\nClinical pearl: when targeting cluster headache, blocking GON alone is often sufficient (78% acute response). For occipital neuralgia or post-traumatic HA, consider a combined GON + LON block on the symptomatic side.\n\n**[IMAGE PENDING ANDY APPROVAL]** Gray\'s Anatomy plate 800 (PD-old-100) is the planned anatomical reference; will land in a follow-up commit once approved per project image rule.',
    citation: [6, 7],
    next: 'onb-setup',
    summary: 'GON medial to occipital artery, 1/3 inion-mastoid; LON lateral, 2/3 distance.',
  },

  // ============================================================
  // Module 3 — Setup + Technique
  // ============================================================
  {
    id: 'onb-setup',
    type: 'info',
    module: 3,
    title: 'Setup — Patient + Equipment',
    body: 'Patient position:\n- Seated with head flexed forward, forehead resting on a pillow (preferred), OR\n- Prone if cluster patient cannot tolerate sitting up\n\nEquipment:\n- 3 mL syringe\n- 25-27 gauge needle (1-1.5 inch / 25-38 mm)\n- Chlorhexidine or alcohol prep\n- Sterile gloves (clean technique acceptable; full sterile is overkill for a superficial peripheral block)\n- 2x2 gauze for hemostasis\n- Adhesive bandage\n\nMedications — choose one:\n- [Bupivacaine 0.5%](#/drug/bupivacaine/occipital nerve block) 2-3 mL PLAIN (no epinephrine — risk of vasoconstriction near vertebral system)\n- [Lidocaine 1-2%](#/drug/lidocaine/occipital nerve block) 2-3 mL PLAIN if bupivacaine unavailable or shorter duration desired\n\nOptional steroid adjunct — case-dependent:\n- [Methylprednisolone depot](#/drug/methylprednisolone/occipital nerve block) 40 mg mixed with LA, OR\n- [Dexamethasone](#/drug/dexamethasone/occipital nerve block) 4 mg mixed with LA\n\nEvidence note: RCTs (Ashkenazi 2008, Cuadrado 2017) show steroid does NOT add benefit beyond LA-alone for cluster. Steroid adjunct is reasonable for cervicogenic headache and hemicrania continua only. Avoid steroid in pregnancy and in repeated blocks (alopecia, Cushingoid features).',
    citation: [2, 8, 9, 10],
    next: 'onb-mark',
    summary: 'Seated head-down or prone; 25-27 ga needle; bupivacaine 0.5% PLAIN 2-3 mL; steroid only for cervicogenic.',
  },
  {
    id: 'onb-mark',
    type: 'info',
    module: 3,
    title: 'Step 1 — Identify + Mark Landmarks',
    body: '1. Palpate the external occipital protuberance (inion) — bony midline prominence at the back of the head.\n2. Palpate the mastoid process — bony prominence behind the ear.\n3. Draw an imaginary line between them along the superior nuchal line.\n4. Mark a point ~1/3 of the distance from inion to mastoid — this is the GON target.\n5. Palpate for the occipital artery pulse at this point. **The GON lies MEDIAL to the artery.** Mark the GON injection point 1-2 cm medial to the pulse.\n6. If blocking LON: mark a second point ~2/3 of the inion-to-mastoid distance.\n7. Prep skin with chlorhexidine or alcohol; let dry.',
    citation: [6, 7, 8],
    next: 'onb-inject',
    summary: '1/3 inion-mastoid for GON; medial to occipital artery pulse; 2/3 distance for LON.',
  },
  {
    id: 'onb-inject',
    type: 'info',
    module: 3,
    title: 'Step 2 — Inject',
    body: '1. Hold the syringe perpendicular to the skull.\n2. Advance the needle slowly until you contact bone (skull is the safety stop — prevents intracranial penetration).\n3. Withdraw 1-2 mm off bone.\n4. **ASPIRATE** before injecting. If blood returns → withdraw, redirect 1-2 mm medially, re-aspirate. Intra-arterial injection into the occipital artery (which feeds into the vertebral system via collaterals) can cause seizure or transient neurologic symptoms.\n5. Inject 2-3 mL of LA (± steroid adjunct) in a slow, steady manner over ~30 seconds. Patient may report referred pressure or transient sharp pain — normal.\n6. Withdraw needle, apply pressure with gauze for 1-2 min, place bandage.\n7. Repeat on contralateral side ONLY if bilateral indication (cluster is unilateral — only block the symptomatic side; bilateral block for migraine variants is acceptable per AHS).\n\n**Maximum safe LA dose:** Bupivacaine plain ~2 mg/kg (e.g., 14 mg for 70 kg = ~3 mL of 0.5%); Lidocaine plain ~4.5 mg/kg.',
    citation: [8, 9, 16],
    next: 'onb-aspirate-positive',
    summary: 'Contact bone, withdraw 1-2 mm, ASPIRATE, inject 2-3 mL slowly.',
    safetyLevel: 'critical',
  },
  {
    id: 'onb-aspirate-positive',
    type: 'question',
    module: 3,
    title: 'Aspirate Returned Blood — What Now?',
    body: 'You aspirated before injecting (good) and got blood return. The occipital artery runs near the GON target. Do NOT inject at this position.',
    options: [
      {
        label: 'Withdraw and redirect medially 1-2 mm',
        description: 'GON lies medial to the artery. Re-aspirate. Inject only if dry.',
        next: 'onb-post-procedure',
        urgency: 'urgent',
      },
      {
        label: 'Abort the procedure',
        description: 'If unable to redirect to a dry pocket after 2 attempts, do not proceed. Discuss alternative (sphenopalatine block, pharmacologic) with patient.',
        next: 'onb-post-procedure',
      },
    ],
    citation: [8, 15],
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 4 — Post-procedure + Complications
  // ============================================================
  {
    id: 'onb-post-procedure',
    type: 'info',
    module: 4,
    title: 'Post-procedure Care',
    body: 'Immediate:\n- Observe for 15 min for vasovagal syncope (1-3% incidence)\n- Document baseline + post-procedure neuro exam (especially the GON sensory distribution — occiput, vertex, posterior scalp)\n- Onset of relief: 5-15 minutes for cluster\n- LA-only duration: 4-6 hours (bupivacaine) or 1-2 hours (lidocaine)\n- LA + steroid duration: weeks to months (for cervicogenic / hemicrania continua)\n\nDischarge instructions:\n- Numbness in occipital distribution is expected for 4-6 h (or longer with steroid)\n- Mild local soreness for 1-2 days is normal\n- Return precautions: severe new headache, fever, expanding hematoma, neurologic deficit beyond expected numbness, signs of infection at injection site\n- Follow-up with neurology / headache specialist within 1-2 weeks for outpatient prophylaxis planning\n- If this was a CLUSTER acute block: also discharge with verapamil-bridge plan (see [Cluster Headache](#/tree/cluster-headache))',
    citation: [12, 13],
    next: 'onb-complications',
    summary: 'Observe 15 min, document neuro exam, onset 5-15 min, LA 4-6h, return for fever/deficit/expanding hematoma.',
  },
  {
    id: 'onb-complications',
    type: 'info',
    module: 4,
    title: 'Complications + Recognition',
    body: 'Common (1-5%):\n- Vasovagal syncope — preventable with supine positioning post-procedure + 15 min observation\n- Local soreness 1-2 days\n- Transient occipital numbness extending beyond intended duration\n\nUncommon but serious:\n- **Intra-arterial injection (occipital artery → vertebral collateral)** — can cause seizure, transient neurologic deficit, or stroke. PREVENT by aspirating before every injection.\n- Infection at injection site (rare with clean technique; treat as cellulitis if it occurs)\n- Persistent neuropathic pain or paresthesia in GON distribution (rare; usually self-limited)\n- Alopecia at injection site (with steroid use; usually patchy and reversible)\n- Cushingoid features with repeated steroid blocks (limit to ≤4 per year)\n- Allergic reaction (rare; amide LA cross-reactivity is uncommon)\n\n**Action if complication suspected:**\n- Seizure / neuro deficit → immediate stroke workup ([SAH](#/tree/sah) / [ICH](#/tree/ich) protocol depending on findings)\n- Infection → standard cellulitis workup + treatment\n- Expanding hematoma → direct pressure, observation, ultrasound if concerning',
    citation: [11, 12, 15],
    next: 'onb-doc',
    summary: 'Vasovagal 1-3%, intra-arterial → seizure/deficit, alopecia/Cushingoid with steroid.',
    safetyLevel: 'warning',
  },
  {
    id: 'onb-doc',
    type: 'result',
    module: 4,
    title: 'Procedure Note Template',
    body: '**Procedure:** Greater occipital nerve block, [right/left/bilateral]\n**Indication:** [Cluster headache acute attack / Cluster bridge / Occipital neuralgia / Cervicogenic HA / Post-traumatic HA / Status migrainosus refractory]\n**Consent:** Verbal informed consent obtained; risks of vasovagal, transient numbness, intra-arterial injection, infection, alopecia (if steroid) discussed; patient agrees to proceed.\n**Landmarks:** Inion and mastoid palpated; injection point marked 1/3 distance from inion to mastoid along superior nuchal line; occipital artery pulse identified and avoided (injection 1-2 cm medial).\n**Prep:** Chlorhexidine prep × 1; sterile technique.\n**Agent:** [Bupivacaine 0.5% 2-3 mL plain / Lidocaine 1-2% 2-3 mL plain] [± Methylprednisolone 40 mg / Dexamethasone 4 mg].\n**Technique:** 25-gauge needle advanced perpendicular to bone, withdrawn 1-2 mm, negative aspiration, slow injection over 30 sec.\n**Tolerance:** Patient tolerated well; no complications.\n**Post-procedure:** Onset of numbness at [X] min; pain relief at [X] min (cluster); observed 15 min; no vasovagal symptoms; discharged with return precautions and [follow-up plan].',
    recommendation: 'Document indication, landmarks, agent, aspiration, response, and disposition.',
    confidence: 'definitive',
    citation: [12, 13],
    summary: 'Procedure note must capture: indication, consent, landmarks, agent, aspiration, response, observation, dispo.',
  },
];

export const OCCIPITAL_NERVE_BLOCK_CRITICAL_ACTIONS = [
  { text: 'Exclude SAH, dissection, CVST, AACG, meningitis before performing ONB for any headache complaint.', nodeId: 'onb-indication' },
  { text: 'No skin infection, no LA allergy; document anticoagulation risk/benefit.', nodeId: 'onb-contra' },
  { text: 'GON lies MEDIAL to the occipital artery — palpate the pulse and aim medial.', nodeId: 'onb-mark' },
  { text: 'ASPIRATE before every injection — intra-arterial → vertebral collateral → seizure risk.', nodeId: 'onb-inject' },
  { text: 'Observe for 15 min post-procedure for vasovagal syncope.', nodeId: 'onb-post-procedure' },
  { text: 'Avoid steroid adjunct in pregnancy — use LA-only.', nodeId: 'onb-contra' },
  { text: 'Limit repeated steroid-containing occipital blocks to ≤4 per year (Cushingoid features, alopecia at site).', nodeId: 'onb-complications' },
];

export const OCCIPITAL_NERVE_BLOCK_CITATIONS: Citation[] = [
  { num: 1, text: 'Robbins MS, Starling AJ, Pringsheim TM, Becker WJ, Schwedt TJ. Treatment of Cluster Headache: The American Headache Society Evidence-Based Guidelines. Headache. 2016;56(7):1093-1106. PMID 27432623. (Verified current as of this audit \u2014 no superseding AHS cluster headache guideline has been published.)' },
  { num: 2, text: 'Blumenfeld A, Ashkenazi A, Napchan U, et al. Expert consensus recommendations for the performance of peripheral nerve blocks for headaches\u2014a narrative review. Headache. 2013;53(3):437-446. PMID 23406160.' },
  { num: 3, text: 'Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018;38(1):1-211. PMID 29368949. (ICHD-3)' },
  { num: 4, text: 'Horlocker TT, Vandermeuelen E, Kopp SL, Gogarten W, Leffert LR, Benzon HT. Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy: American Society of Regional Anesthesia and Pain Medicine Evidence-Based Guidelines (Fourth Edition). Reg Anesth Pain Med. 2018;43(3):263-309. PMID 29561531. NOTE: superseded by the fifth edition \u2014 see reference 14.' },
  { num: 5, text: 'Ailani J, Burch RC, Robbins MS; Board of Directors of the American Headache Society. The American Headache Society Consensus Statement: Update on integrating new migraine treatments into clinical practice. Headache. 2021;61(7):1021-1039. PMID 34160823.' },
  { num: 6, text: 'Tubbs RS, Salter EG, Wellons JC 3rd, Blount JP, Oakes WJ. Landmarks for the identification of the cutaneous nerves of the occiput and nuchal regions. Clin Anat. 2007;20(3):235-238. PMID 16944523.' },
  { num: 7, text: 'Loukas M, El-Sedfy A, Tubbs RS, et al. Identification of greater occipital nerve landmarks for the treatment of occipital neuralgia. Folia Morphol (Warsz). 2006;65(4):337-342. PMID 17171613.' },
  { num: 8, text: 'Tobin J, Flitman S. Occipital nerve blocks: when and what to inject? Headache. 2009;49(10):1521-1533. PMID 19674126.' },
  { num: 9, text: 'Ashkenazi A, Matro R, Shaw JW, Abbas MA, Silberstein SD. Greater occipital nerve block using local anaesthetics alone or with triamcinolone for transformed migraine: a randomised comparative study. J Neurol Neurosurg Psychiatry. 2008;79(4):415-417. PMID 17682008.' },
  { num: 10, text: 'Cuadrado ML, Aledo-Serrano A, Navarro P, et al. Short-term effects of greater occipital nerve blocks in chronic migraine: A double-blind, randomised, placebo-controlled clinical trial. Cephalalgia. 2017;37(9):864-872. PMID 27296456.' },
  { num: 11, text: 'Lavin PJ, Workman R. Cushing syndrome induced by serial occipital nerve blocks containing corticosteroids. Headache. 2001;41(9):902-904. PMID 11703480.' },
  { num: 12, text: 'Levin M. Nerve blocks in the treatment of headache. Neurotherapeutics. 2010;7(2):197-203. PMID 20430319.' },
  { num: 13, text: 'Leroux E, Valade D, Taifas I, et al. Suboccipital steroid injections for transitional treatment of patients with more than two cluster headache attacks per day: a randomised, double-blind, placebo-controlled trial. Lancet Neurol. 2011;10(10):891-897. PMID 21903477.' },
  { num: 14, text: 'Kopp SL, Vandermeulen E, McBane RD, Perlas A, Leffert L, Horlocker T. Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy: American Society of Regional Anesthesia and Pain Medicine Evidence-Based Guidelines (fifth edition). Reg Anesth Pain Med. 2025 Oct 17 [Epub ahead of print]. doi:10.1136/rapm-2024-105766. PMID 39880411. (Supersedes the fourth edition, reference 4.)' },
  { num: 15, text: 'Stern JI, Chiang CC, Kissoon NR, Robertson CE. Narrative review of peripheral nerve blocks for the management of headache. Headache. 2022;62(9):1077-1092. PMID 36286600.' },
  { num: 16, text: 'Birnbaumer DM, ed. Roberts and Hedges\u2019 Clinical Procedures in Emergency Medicine and Acute Care. 8th ed. Philadelphia: Elsevier; 2025. Ch. 29, Local and Topical Anesthesia (maximum recommended local anesthetic doses). ISBN 9780323779227.' },
];

export const OCCIPITAL_NERVE_BLOCK_NODE_COUNT = OCCIPITAL_NERVE_BLOCK_NODES.length;
export const OCCIPITAL_NERVE_BLOCK_MODULE_LABELS = ['Indication', 'Pre-procedure', 'Technique', 'Post-procedure'];
