// myMedKitt — WingMan skill-surface: safety-critical gates + required-disambiguation
// registry + cross-consult references. (Additive; no change to existing clinical data.)
//
// This is the myMedKitt analog of my-vertigo-app's skill-gates.ts, adapted for the
// COORDINATOR shape (many consults, one skill). It encodes the WingMan doctrine
// (kittech-wingman/STANDARDS.md rules 16–23):
//
//   • SKILL_GATES — point-of-use forcing-function questions for "looks-benign/
//     looks-central-but-context-flips-it" traps. Wording lives here once; skill
//     templates reference by id ({{gate:<id>}}), never restate.
//   • REQUIRED_DISAMBIGUATIONS — node IDs (within a named tree) whose teaching MUST
//     reach the skill, keyed independently of any per-node flag → deletion fails the
//     build coverage check.
//   • CROSS_REFERENCES — known multi-consult interactions (Coordinator rule 14). This
//     is NEW clinical IP (not a single artifact in the app) → physician sign-off.
//
// ⚠️ SIGN-OFF REQUIRED (Andy, EM physician): every `prompt`, `note`, and the seed
// selection below is clinician-facing. Each is drafted as a faithful synthesis of
// existing app content (cited source nodes), asserts no NEW rule, and carries a
// `signedOff` flag. Do not ship a gate/cross-ref with signedOff:false to production.
//
// SIGN-OFF LOG (Andy Kitlowski, EM physician):
//   2026-05-29 — APPROVED: negative-ncct-does-not-exclude-sah,
//     negative-ct-does-not-exclude-posterior-stroke,
//     normal-score-imaging-does-not-exclude-nsti, normal-lactate-does-not-exclude-ami,
//     negative-troponin-does-not-exclude-stemi, stability-does-not-differentiate-vt-svt,
//     normal-pvr-does-not-exclude-ces, and cross-reference seizure-hyponatremia.
//   2026-05-29 — APPROVED (next tier): low-twist-does-not-exclude-testicular-torsion,
//     normal-doppler-does-not-exclude-ovarian-torsion, indeterminate-us-does-not-exclude-ectopic,
//     normal-cxr-does-not-exclude-airway-fb, normal-imaging-does-not-exclude-shunt-malfunction,
//     crystals-do-not-exclude-septic-arthritis, normal-urate-does-not-exclude-gout,
//     normal-cxr-does-not-exclude-dissection, normal-disc-does-not-exclude-optic-neuritis.
//   GATE SET COMPLETE for this scaffold: 16 gates + 1 cross-reference, all signed.
//   2026-07-18 — SHIP APPROVED (Andy, via conversation): promote fresh 351-consult
//     build to docs/skill/ (served Jun-23 build was missing 17 consults incl.
//     toxic-alcohols and carried superseded torsades Mg dosing + EXTRIP thresholds).
//     Gate set unchanged (16/16 byte-identical served vs fresh). The 17 newly
//     carried consults + 46 changed consults ship under the existing universal
//     gates. DEEP GATE-COVERAGE REVIEW of the 43 consults added/changed since
//     2026-05-29 sign-off is DUE ≤2026-07-25 (Bedside Proof plan, WS1) —
//     risk-tier first: torsion, limb-ischemia, hemoptysis, palpitations hubs.
export const SKILL_GATES = {
    // Generalizes the "a negative test is falsely reassuring in the wrong context"
    // class to the coordinator level. Seed #1: SAH.
    "negative-ncct-does-not-exclude-sah": {
        id: "negative-ncct-does-not-exclude-sah",
        ruleId: "negative-ct-rules-out-sah",
        prompt: "Before treating a negative non-contrast head CT as ruling out subarachnoid hemorrhage, FIRST establish: (1) how long after headache ONSET was the CT, and (2) what is the pretest probability? A negative NCCT effectively excludes SAH ONLY when performed within ~6 hours of onset, read by a qualified reader, in a low-pretest-probability patient. Beyond ~6 hours, or with high pretest probability (thunderclap, peak within 1 minute, exertional onset, neck pain/stiffness), a negative CT does NOT exclude SAH — pursue LP (xanthochromia) or CTA. Do not discharge a thunderclap headache on a late or low-yield negative CT alone.",
        appliesWhen: "NCCT within ~6h of onset, qualified reader, low pretest probability.",
        doesNotApplyWhen: "CT >6h from onset, OR high pretest probability — LP/CTA required despite a negative CT.",
        sourceTreeId: "sah",
        // sah-ottawa carries the high-pretest descriptors; sah-ct the sensitivity window.
        sourceNodeIds: ["sah-early-neg", "sah-lp", "sah-ottawa", "sah-ct"],
        appliesToConsults: ["sah", "headache-hub"],
        signedOff: true,
    },
    // Seed #2: posterior-circulation stroke masquerading as peripheral vertigo (the
    // myMedKitt vertigo consult's central analog of the vertigo-app gate).
    "negative-ct-does-not-exclude-posterior-stroke": {
        id: "negative-ct-does-not-exclude-posterior-stroke",
        ruleId: "negative-ct-rules-out-posterior-stroke",
        prompt: "In a patient with acute vestibular syndrome (continuous vertigo), do NOT use a negative early CT (or even early MRI) to exclude posterior-circulation stroke. The decisive bedside data are the HINTS exam findings: any central HINTS finding — or a NORMAL head-impulse test in a patient with continuous spontaneous vertigo — points CENTRAL and warrants a stroke workup even when imaging is negative. Early DWI-MRI is falsely negative in a meaningful fraction of posterior strokes. Route on the exam, not on the early scan.",
        appliesWhen: "HINTS performed correctly in a patient with continuous vertigo + spontaneous nystagmus at rest.",
        doesNotApplyWhen: "Never rely on a negative early CT/MRI to discharge AVS — a central HINTS finding or normal head-impulse = central.",
        sourceTreeId: "vertigo",
        // vert-hints-check carries the "HINTS without spontaneous nystagmus is INVALID/DANGEROUS" guardrail.
        sourceNodeIds: ["vert-hints-central", "vert-hints-check"],
        appliesToConsults: ["vertigo"],
        signedOff: true,
    },
    // ── Batch 2 (PENDING SIGN-OFF) — the top-5 "normal-result-is-falsely-reassuring"
    //    traps the verification surfaced. Each is a faithful synthesis of the cited
    //    source node; no new clinical claim. ───────────────────────────────────────
    "normal-score-imaging-does-not-exclude-nsti": {
        id: "normal-score-imaging-does-not-exclude-nsti",
        ruleId: "normal-lrinec-or-ct-rules-out-nsti",
        prompt: "Necrotizing soft-tissue infection is a CLINICAL/SURGICAL diagnosis. A normal or low LRINEC score does NOT rule out NSTI (it is an adjunct only, with a meaningful false-negative rate), and a normal CT does NOT exclude EARLY NSTI. If the exam is concerning — pain out of proportion, rapid progression, systemic toxicity, skin changes — do NOT let a reassuring score or scan delay surgical consultation and exploration. The decision to operate is driven by clinical suspicion, not by a score or imaging.",
        appliesWhen: "Score/imaging interpreted alongside a low-suspicion exam.",
        doesNotApplyWhen: "Concerning exam — a normal LRINEC or CT must NOT defer surgical consult/exploration.",
        sourceTreeId: "necrotizing-fasciitis",
        sourceNodeIds: ["nf-soft-signs", "nf-lrinec", "nf-imaging"],
        appliesToConsults: ["necrotizing-fasciitis", "peds-ssti"],
        signedOff: true,
    },
    "normal-lactate-does-not-exclude-ami": {
        id: "normal-lactate-does-not-exclude-ami",
        ruleId: "normal-lactate-rules-out-mesenteric-ischemia",
        prompt: "In suspected acute mesenteric ischemia, a normal lactate does NOT rule out AMI — lactate rises LATE, once transmural necrosis has occurred, so a normal value early is common and falsely reassuring. With pain out of proportion to exam and arterial risk factors, treat as AMI until proven otherwise: do not delay CT angiography or surgical/IR consultation while waiting on a 'reassuring' lactate.",
        appliesWhen: "Lactate interpreted late, with necrosis already present.",
        doesNotApplyWhen: "Early presentation — a normal lactate cannot exclude AMI; image and consult on clinical suspicion.",
        sourceTreeId: "mesenteric-ischemia",
        sourceNodeIds: ["ami-labs", "ami-start"],
        appliesToConsults: ["mesenteric-ischemia", "abdominal-pain-hub"],
        signedOff: true,
    },
    "negative-troponin-does-not-exclude-stemi": {
        id: "negative-troponin-does-not-exclude-stemi",
        ruleId: "negative-troponin-rules-out-stemi",
        prompt: "STEMI is an ECG diagnosis, not a troponin diagnosis. A negative troponin does NOT rule out STEMI — troponin can be normal early in an evolving infarct, and a STEMI on the ECG mandates immediate reperfusion regardless of the troponin value. Do not wait for or be reassured by an early negative troponin in a patient with ischemic symptoms and ST elevation; activate the cath lab / reperfusion pathway on the ECG.",
        appliesWhen: "Serial troponins interpreted in the full clinical + ECG context.",
        doesNotApplyWhen: "An early negative troponin must NOT delay reperfusion when the ECG shows STEMI.",
        sourceTreeId: "stemi",
        sourceNodeIds: ["stemi-start"],
        appliesToConsults: ["stemi", "chest-pain-hub"],
        signedOff: true,
    },
    "stability-does-not-differentiate-vt-svt": {
        id: "stability-does-not-differentiate-vt-svt",
        ruleId: "stability-means-svt",
        prompt: "Hemodynamic stability does NOT differentiate VT from SVT — patients can be awake and talking in sustained VT. A wide, regular complex tachycardia is VT until proven otherwise (pre-test probability of VT is high and rises with age, structural heart disease, and prior MI). Do not treat a stable wide-complex tachycardia as SVT (e.g., reflexive AV-nodal blockers) on the basis of stability; default to the VT pathway unless you have specific evidence otherwise.",
        appliesWhen: "Narrowing the differential with diagnostic ECG criteria (AV dissociation, fusion/capture beats).",
        doesNotApplyWhen: "Stability alone — it tells you nothing about VT vs SVT; treat wide+regular as VT until proven otherwise.",
        sourceTreeId: "wide-complex-tachycardia",
        sourceNodeIds: ["wct-start", "wct-pathognomonic"],
        appliesToConsults: ["wide-complex-tachycardia", "ventricular-tachycardia", "svt"],
        signedOff: true,
    },
    "normal-pvr-does-not-exclude-ces": {
        id: "normal-pvr-does-not-exclude-ces",
        ruleId: "normal-pvr-rules-out-cauda-equina",
        prompt: "A low/normal post-void residual does NOT exclude cauda equina syndrome — about half of CES-Incomplete (CES-I) cases have a PVR <200 mL. PVR is helpful when POSITIVE (high volume raises CES odds), much less reliable when negative. Do not use a low PVR alone to rule out CES if there are bilateral symptoms, saddle anesthesia, bowel symptoms, or an absent bulbocavernosus reflex — proceed to urgent MRI on clinical suspicion.",
        appliesWhen: "An elevated PVR is being used to raise CES suspicion.",
        doesNotApplyWhen: "A low PVR with red-flag symptoms must NOT exclude CES — image urgently.",
        sourceTreeId: "cauda-equina",
        sourceNodeIds: ["ces-pvr", "ces-negative-mri"],
        appliesToConsults: ["cauda-equina", "low-back-pain", "back-pain-hub"],
        signedOff: true,
    },
    // ── Batch 3 (PENDING SIGN-OFF) — next tier of "normal-result-is-falsely-reassuring"
    //    traps, each a faithful synthesis of the cited source node. ──────────────────
    "low-twist-does-not-exclude-testicular-torsion": {
        id: "low-twist-does-not-exclude-testicular-torsion",
        ruleId: "low-twist-or-flow-rules-out-testicular-torsion",
        prompt: "A low TWIST score does NOT exclude testicular torsion in a classic scenario (sudden severe pain, vomiting, high-riding testis). Doppler flow can be preserved or intermittent — torsion that has detorsed shows flow, and 'pain resolved' is the classic reason a torsion is wrongly discharged (intermittent torsion rebounds). With a convincing history, obtain urgent urology consult / surgical exploration; do not let a low score or present flow defer it.",
        appliesWhen: "Risk score / Doppler interpreted alongside an equivocal history.",
        doesNotApplyWhen: "Classic history — a low TWIST or present/intermittent flow must NOT exclude torsion.",
        sourceTreeId: "testicular-torsion",
        sourceNodeIds: ["tt-low-risk", "tt-pitfalls", "tt-atypical-entry"],
        appliesToConsults: ["testicular-torsion"],
        signedOff: true,
    },
    "normal-doppler-does-not-exclude-ovarian-torsion": {
        id: "normal-doppler-does-not-exclude-ovarian-torsion",
        ruleId: "normal-doppler-rules-out-ovarian-torsion",
        prompt: "Pelvic ultrasound with Doppler is first-line for ovarian torsion, but normal arterial/venous flow does not rule out torsion — the ovary has dual blood supply and flow is often preserved early, so a 'normal Doppler' is falsely reassuring. With acute, severe, often intermittent pelvic pain (especially with an enlarged ovary or mass), pursue gynecology consult / surgical evaluation on clinical suspicion, not on Doppler alone.",
        appliesWhen: "Doppler interpreted with a low-suspicion presentation.",
        doesNotApplyWhen: "Convincing presentation — preserved flow must NOT exclude torsion.",
        sourceTreeId: "pelvic-pain-female-hub",
        sourceNodeIds: ["ppf-torsion"],
        appliesToConsults: ["pelvic-pain-female-hub"],
        signedOff: true,
    },
    "indeterminate-us-does-not-exclude-ectopic": {
        id: "indeterminate-us-does-not-exclude-ectopic",
        ruleId: "indeterminate-us-rules-out-ectopic",
        prompt: "In a pregnant patient with pain or bleeding, an indeterminate ultrasound (no definite intrauterine pregnancy) does NOT exclude ectopic pregnancy — it is a pregnancy of unknown location until proven intrauterine. Do not discharge as 'reassured' on an indeterminate scan; arrange the appropriate β-hCG trend + ultrasound follow-up and gynecology pathway, and treat instability as a possible ruptured ectopic regardless of the scan.",
        appliesWhen: "A definite intrauterine pregnancy is visualized.",
        doesNotApplyWhen: "Indeterminate/empty-uterus scan — does NOT exclude ectopic; treat as PUL.",
        sourceTreeId: "pelvic-pain-female-hub",
        sourceNodeIds: ["ppf-pregnant-bleeding"],
        appliesToConsults: ["pelvic-pain-female-hub", "first-trimester", "vaginal-bleeding-hub"],
        signedOff: true,
    },
    "normal-cxr-does-not-exclude-airway-fb": {
        id: "normal-cxr-does-not-exclude-airway-fb",
        ruleId: "normal-cxr-rules-out-airway-fb",
        prompt: "In a child with concern for an aspirated/airway foreign body, a normal chest X-ray does NOT exclude airway FB — most aspirated objects (food, plastic) are radiolucent, and early films can be normal. With a suggestive history (witnessed choking, sudden cough/wheeze, focal findings), pursue the airway-FB pathway (bronchoscopy evaluation) regardless of a normal radiograph.",
        appliesWhen: "Imaging interpreted with a low-suspicion, well-appearing history.",
        doesNotApplyWhen: "Suggestive history — a normal CXR must NOT exclude airway FB.",
        sourceTreeId: "peds-foreign-body",
        sourceNodeIds: ["peds-fb-start", "peds-fb-airway-imaging"],
        appliesToConsults: ["peds-foreign-body"],
        signedOff: true,
    },
    "normal-imaging-does-not-exclude-shunt-malfunction": {
        id: "normal-imaging-does-not-exclude-shunt-malfunction",
        ruleId: "normal-imaging-rules-out-shunt-malfunction",
        prompt: "In a VP-shunt patient, normal ventricular size on CT does NOT exclude shunt malfunction — ventricles may not enlarge (slit-ventricle syndrome, non-compliant ventricles), and a normal-feeling shunt does not exclude obstruction. With symptoms of raised ICP (headache, vomiting, lethargy, vision change), pursue the malfunction pathway (shunt series, neurosurgery) on clinical grounds even when imaging looks normal.",
        appliesWhen: "Imaging interpreted with a reassuring clinical picture and a known compliant baseline.",
        doesNotApplyWhen: "ICP symptoms — normal ventricular size / normal-feeling shunt must NOT exclude malfunction.",
        sourceTreeId: "vp-shunt",
        sourceNodeIds: ["vps-imaging", "vps-physical-exam", "vps-summary"],
        appliesToConsults: ["vp-shunt"],
        signedOff: true,
    },
    "crystals-do-not-exclude-septic-arthritis": {
        id: "crystals-do-not-exclude-septic-arthritis",
        ruleId: "crystals-rule-out-septic-arthritis",
        prompt: "Finding crystals on joint aspiration does NOT exclude a concurrent septic joint — gout/CPPD and infection can coexist (dual diagnosis), and a septic joint is limb-threatening. Do not stop at 'it's just gout' when crystals are present: if the synovial cell count, clinical picture, or risk factors suggest infection, send/await culture and treat empirically for septic arthritis. Crystals are not protective.",
        appliesWhen: "Crystals interpreted with a low-infection-risk picture and reassuring cell count.",
        doesNotApplyWhen: "Any infection concern — crystals do NOT exclude a septic joint; treat empirically.",
        sourceTreeId: "gout",
        sourceNodeIds: ["gout-when-aspirate", "gout-septic-concern"],
        appliesToConsults: ["gout", "approach-to-arthritis", "septic-arthritis"],
        signedOff: true,
    },
    "normal-urate-does-not-exclude-gout": {
        id: "normal-urate-does-not-exclude-gout",
        ruleId: "normal-urate-rules-out-gout",
        prompt: "A normal serum uric acid does NOT exclude acute gout — urate can be NORMAL during an acute flare in up to ~40% of cases (it often drops during the attack). Do not rule out gout on a normal urate; diagnose on the clinical picture and, where needed, arthrocentesis with crystal analysis (and remember crystals don't exclude infection).",
        appliesWhen: "Urate interpreted between flares for chronic management.",
        doesNotApplyWhen: "During an acute flare — a normal urate must NOT exclude gout.",
        sourceTreeId: "gout",
        sourceNodeIds: ["gout-serum-urate"],
        appliesToConsults: ["gout", "approach-to-arthritis"],
        signedOff: true,
    },
    "normal-cxr-does-not-exclude-dissection": {
        id: "normal-cxr-does-not-exclude-dissection",
        ruleId: "normal-cxr-rules-out-aortic-dissection",
        prompt: "A normal chest X-ray does NOT rule out aortic dissection — a substantial fraction have a normal mediastinum on CXR. With a compelling story (tearing/migrating pain, pulse or BP differential, neuro deficit + pain, malperfusion), pursue CT angiography on clinical suspicion; do not be reassured by a normal CXR (or a normal D-dimer used in isolation).",
        appliesWhen: "CXR interpreted with a low-risk story and ADD-RS low.",
        doesNotApplyWhen: "Compelling story / high-risk features — a normal CXR must NOT exclude dissection.",
        sourceTreeId: "aortic-dissection",
        sourceNodeIds: ["dissect-immediate-workup", "dissect-imaging"],
        appliesToConsults: ["aortic-dissection", "chest-pain-hub"],
        signedOff: true,
    },
    "normal-disc-does-not-exclude-optic-neuritis": {
        id: "normal-disc-does-not-exclude-optic-neuritis",
        ruleId: "normal-disc-rules-out-optic-neuritis",
        prompt: "A normal optic disc on fundoscopy does NOT rule out optic neuritis — two-thirds are retrobulbar (the disc looks normal; 'the patient sees nothing and the doctor sees nothing'). With subacute monocular vision loss, pain on eye movement, a relative afferent pupillary defect, or dyschromatopsia, pursue the ON pathway (MRI orbits with gad/fat-sat, neuro/ophtho) even with a normal-appearing disc.",
        appliesWhen: "Disc exam interpreted with a non-suggestive presentation.",
        doesNotApplyWhen: "Suggestive features (RAPD, painful EOM, dyschromatopsia) — a normal disc must NOT exclude ON.",
        sourceTreeId: "optic-neuritis",
        sourceNodeIds: ["on-confirm", "on-mri"],
        appliesToConsults: ["optic-neuritis", "optic-neuropathy-hub", "monocular-vision-loss-hub"],
        signedOff: true,
    },
};
/**
 * Disambiguations that MUST appear in every build. Keyed by (treeId, nodeId) — the
 * canonical source. The build asserts each node's body is emitted; deleting a gate
 * does NOT remove the requirement (this registry does), so a drop fails the build.
 */
export const REQUIRED_DISAMBIGUATIONS = [
    {
        treeId: "sah",
        nodeId: "sah-early-neg",
        gate: "negative-ncct-does-not-exclude-sah",
        reason: "A late or low-yield negative CT misroutes thunderclap headache to discharge instead of LP/CTA.",
        mustContainPhrase: "may not be 100%",
    },
    {
        treeId: "vertigo",
        nodeId: "vert-hints-central",
        gate: "negative-ct-does-not-exclude-posterior-stroke",
        reason: "A negative early scan misroutes a central AVS (posterior stroke) to a benign-peripheral disposition.",
        mustContainPhrase: "posterior circulation stroke until proven otherwise",
    },
    // ── Batch 2 (pending sign-off) ──
    {
        treeId: "necrotizing-fasciitis",
        nodeId: "nf-soft-signs",
        gate: "normal-score-imaging-does-not-exclude-nsti",
        reason: "A reassuring LRINEC/CT defers surgical exploration in early NSTI — a limb/life-threatening delay.",
        mustContainPhrase: "LRINEC score does NOT rule out NSTI",
    },
    {
        treeId: "mesenteric-ischemia",
        nodeId: "ami-labs",
        gate: "normal-lactate-does-not-exclude-ami",
        reason: "A normal early lactate falsely reassures and delays CTA/consult in AMI (lactate rises late).",
        mustContainPhrase: "Normal lactate does NOT rule out AMI",
    },
    {
        treeId: "stemi",
        nodeId: "stemi-start",
        gate: "negative-troponin-does-not-exclude-stemi",
        reason: "Waiting on/ trusting an early negative troponin delays reperfusion in an ECG-diagnosed STEMI.",
        mustContainPhrase: "negative troponin does NOT rule out STEMI",
    },
    {
        treeId: "wide-complex-tachycardia",
        nodeId: "wct-start",
        gate: "stability-does-not-differentiate-vt-svt",
        reason: "Treating a stable wide-complex tachycardia as SVT (AV-nodal blockers) can be catastrophic in VT.",
        mustContainPhrase: "Hemodynamic stability does NOT differentiate VT from SVT",
    },
    {
        treeId: "cauda-equina",
        nodeId: "ces-pvr",
        gate: "normal-pvr-does-not-exclude-ces",
        reason: "A low PVR used alone to exclude CES misses ~half of CES-Incomplete cases.",
        mustContainPhrase: "Do NOT use low PVR alone to exclude CES",
    },
    // ── Batch 3 (pending sign-off) ──
    {
        treeId: "testicular-torsion",
        nodeId: "tt-low-risk",
        gate: "low-twist-does-not-exclude-testicular-torsion",
        reason: "A low score / present flow discharges a torsion; intermittent torsion rebounds → testis loss.",
        mustContainPhrase: "Low TWIST does NOT exclude torsion",
    },
    {
        treeId: "pelvic-pain-female-hub",
        nodeId: "ppf-torsion",
        gate: "normal-doppler-does-not-exclude-ovarian-torsion",
        reason: "Preserved Doppler flow falsely reassures and delays surgery in ovarian torsion.",
        mustContainPhrase: "normal arterial/venous flow does not rule out torsion",
    },
    {
        treeId: "pelvic-pain-female-hub",
        nodeId: "ppf-pregnant-bleeding",
        gate: "indeterminate-us-does-not-exclude-ectopic",
        reason: "An indeterminate scan discharged as reassured misses a ruptured ectopic.",
        mustContainPhrase: "indeterminate ultrasound does not exclude ectopic pregnancy",
    },
    {
        treeId: "peds-foreign-body",
        nodeId: "peds-fb-start",
        gate: "normal-cxr-does-not-exclude-airway-fb",
        reason: "Radiolucent airway FB with a normal CXR is discharged → delayed obstruction/pneumonia.",
        mustContainPhrase: "normal chest X-ray does NOT exclude airway FB",
    },
    {
        treeId: "vp-shunt",
        nodeId: "vps-imaging",
        gate: "normal-imaging-does-not-exclude-shunt-malfunction",
        reason: "Normal ventricle size discharges a shunt malfunction → raised ICP / herniation.",
        mustContainPhrase: "normal ventricular size does NOT exclude malfunction",
    },
    {
        treeId: "gout",
        nodeId: "gout-when-aspirate",
        gate: "crystals-do-not-exclude-septic-arthritis",
        reason: "Stopping at 'just gout' when crystals are present misses a coexisting septic joint.",
        mustContainPhrase: "Crystals do NOT exclude infection",
    },
    {
        treeId: "gout",
        nodeId: "gout-serum-urate",
        gate: "normal-urate-does-not-exclude-gout",
        reason: "A normal urate during a flare wrongly excludes gout.",
        mustContainPhrase: "Urate can be NORMAL during acute flare",
    },
    {
        treeId: "aortic-dissection",
        nodeId: "dissect-immediate-workup",
        gate: "normal-cxr-does-not-exclude-dissection",
        reason: "A normal CXR discharges a dissection; a normal mediastinum is common.",
        mustContainPhrase: "Normal CXR does NOT rule out dissection",
    },
    {
        treeId: "optic-neuritis",
        nodeId: "on-confirm",
        gate: "normal-disc-does-not-exclude-optic-neuritis",
        reason: "Two-thirds of ON is retrobulbar; a normal disc wrongly excludes it.",
        mustContainPhrase: "normal disc does NOT rule out ON",
    },
];
/**
 * Known multi-consult interactions the coordinator must surface when both contexts
 * are in play (STANDARDS rule 14). NEW clinical IP — PENDING SIGN-OFF.
 */
export const CROSS_REFERENCES = [
    {
        id: "seizure-hyponatremia",
        consults: ["status-epilepticus", "sodium"],
        interaction: "Seizure driven by (or co-existing with) hyponatremia",
        note: "Hyponatremia is a reversible cause of seizure/status — check sodium early in any seizure workup. If hyponatremia is the driver, the seizure may be refractory to benzodiazepines/antiseizure meds until sodium is corrected, and acute symptomatic hyponatremic seizures warrant hypertonic saline. BUT respect the correction-rate ceiling (osmotic demyelination / ODS risk) once the seizure is controlled — the emergent bolus for active seizures is the exception, not license to overcorrect. Coordinate the status-epilepticus and sodium pathways together.",
        signedOff: true,
    },
];
export function getGate(id) {
    const g = SKILL_GATES[id];
    if (!g)
        throw new Error(`Unknown skill gate: ${id}`);
    return g;
}
