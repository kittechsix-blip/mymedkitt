export const RADICULOPATHIES_NODES = [
    {
        id: "rad-start",
        type: "question",
        module: 1,
        title: "Radiculopathies · adult bedside evaluation",
        body: "[Bedside steps](#/info/rad-steps)\n\nAsk what changed: hand use, walking, leg power, bladder sensation or voiding, bowel control and saddle sensation. Examine both sides for weakness, altered reflexes and a sensory level.\n\nSudden maximal pain, major trauma, fever or bacteremia, injection drug use, immunosuppression, known cancer, anticoagulation or recent spinal procedure changes the pathway.",
        citation: [1, 2, 3, 7, 8],
        options: [
            { label: "Possible cord, cauda equina or other emergency", next: "rad-urgent" },
            { label: "Stable focal symptoms · localize the root", next: "rad-region" }
        ]
    },
    {
        id: "rad-urgent",
        type: "result",
        module: 1,
        title: "Time-sensitive deficit or secondary cause",
        body: "**New saddle or sphincter symptoms** → emergency lumbar MRI and immediate spine consultation. A low postvoid residual or preserved rectal tone cannot clear suspected [cauda equina syndrome](#/tree/cauda-equina).\n\n**Progressive or substantial weakness, cord signs or sensory level** → urgent MRI of the relevant spine and spine consultation. Compare gait, hand dexterity, leg reflexes and plantar responses.\n\n**Infection, tumor or epidural bleeding** → expedite cause-specific imaging and specialist management. Fever can be absent. Discuss contrast for infection or tumor. After trauma, protect the spine and follow the trauma imaging pathway. Sudden focal neurologic symptoms also warrant a stroke/vascular assessment.",
        citation: [1, 2, 7, 8, 9, 10],
        recommendation: "Arrange transfer when emergency imaging or definitive spine care is unavailable locally.",
        confidence: "recommended",
        safetyLevel: "critical"
    },
    {
        id: "rad-region",
        images: [{ src: 'images/radiculopathies/dermatomes.png', alt: 'Anterior and posterior spinal dermatomes', caption: 'Approximate territories overlap. Finger anchors are C6 thumb, C7 middle finger and C8 little finger. Facial territories are trigeminal. Goran tek-en, Wikimedia Commons, CC BY-SA 4.0. Co1 labels corrected and white background added.' }],
        type: "question",
        module: 2,
        title: "Where does the patient feel it?",
        body: "[Enlarge illustration](#/image/radiculopathies/dermatomes.png) · [Reflex exam and image credits](#/info/rad-reflex)\n\nAsk the patient to trace the pain with one finger. Map light touch or pinprick separately, then compare strength against resistance and tendon reflexes side to side. Record strength from 0–5 and whether pain limits effort. Adjacent roots overlap. Pain alone often crosses textbook borders.",
        citation: [1, 2, 3, 4],
        options: [
            { label: "Occiput, neck, shoulder or arm", next: "rad-arm" },
            { label: "Chest, flank or abdominal band", next: "rad-trunk" },
            { label: "Groin, thigh, lower leg or foot", next: "rad-leg" },
            { label: "Saddle, posterior thigh or coccyx", next: "rad-sacral" },
            { label: "Mixed distribution or unclear findings", next: "rad-uncertain" }
        ]
    },
    {
        id: "rad-arm",
        images: [{ src: 'images/radiculopathies/upper-motor-exam.webp', alt: 'Upper limb key muscle tests for C5 through T1', caption: 'Compare elbow flexion, wrist extension, elbow extension, middle-finger tip flexion and little-finger abduction against resistance. Kittech Six · AI-assisted illustration.' }],
        type: "question",
        module: 2,
        title: "Occiput, shoulder, arm or hand",
        body: "[Enlarge illustration](#/image/radiculopathies/upper-motor-exam.webp) · [Reflex exam and image credits](#/info/rad-reflex)\n\nAfter excluding trauma, instability and myelopathy, gentle Spurling testing can support a root source if it reproduces familiar radiating arm symptoms. Local neck pain alone is nonspecific. A negative test does not exclude disease. Check legs and gait even with isolated arm complaints.",
        citation: [1, 4, 11],
        options: [
            { label: "Occiput, side of neck or shoulder cape · C1–C4", next: "rad-upperneck" },
            { label: "Lateral shoulder or upper arm · C5", next: "rad-c5" },
            { label: "Radial forearm or thumb · C6", next: "rad-c6" },
            { label: "Posterior arm or middle finger · C7", next: "rad-c7" },
            { label: "Ulnar hand or medial forearm · C8/T1", next: "rad-c8t1" }
        ]
    },
    {
        id: "rad-upperneck",
        type: "info",
        module: 2,
        title: "C1–C4 · upper neck and shoulder cape",
        body: "**C1** has no consistent cutaneous territory or isolated limb test. **C2** pain can travel from upper neck to occiput or behind the ear. **C3** can involve the lateral neck. **C4** may extend into the trapezius and shoulder cape. Compare posterior scalp, neck and the top of each shoulder. There is no dependable limb reflex for these levels.\n\nFacet pain and occipital neuralgia overlap. A new abrupt occipital headache, focal neurologic finding or Horner syndrome warrants vascular assessment.",
        citation: [1, 4, 11, 12],
        next: "rad-decision"
    },
    {
        id: "rad-c5",
        type: "info",
        module: 2,
        title: "C5 · lateral shoulder",
        body: "Pain often reaches the lateral upper arm. Compare sensation over the lateral deltoid, resisted shoulder abduction and elbow flexion. The biceps reflex (C5–C6) may diminish.\n\nA painful weak shoulder with preserved elbow power and reflexes also suggests rotator cuff disease. Isolated deltoid weakness after shoulder dislocation suggests axillary nerve injury.",
        citation: [1, 4],
        next: "rad-decision"
    },
    {
        id: "rad-c6",
        type: "info",
        module: 2,
        title: "C6 · radial forearm and thumb",
        body: "Pain may extend from neck or scapula through the radial forearm into thumb or index finger. Compare thumb sensation, resisted wrist extension and elbow flexion. Check brachioradialis and biceps reflexes.\n\nMedian neuropathy at the wrist can affect thumb sensation while sparing wrist extension and proximal reflexes. A foraminal C5–6 disc lesion typically affects the exiting C6 root.",
        citation: [1, 4],
        next: "rad-decision"
    },
    {
        id: "rad-c7",
        type: "info",
        module: 2,
        title: "C7 · posterior arm and middle finger",
        body: "Ask about pain from the scapula down the posterior arm to the middle finger. Compare middle-finger sensation, resisted elbow extension and the triceps reflex. Finger extension and wrist flexion may also weaken.\n\nIf finger extension is weak, test wrist flexion and pronation as well: weakness outside radial-nerve muscles supports a more proximal lesion.",
        citation: [1, 4],
        next: "rad-decision"
    },
    {
        id: "rad-c8t1",
        type: "info",
        module: 2,
        title: "C8 and T1 · ulnar hand and medial forearm",
        body: "**C8:** symptoms often reach the little finger. Stabilize the middle phalanx and resist flexion of the middle fingertip.\n\n**T1:** compare sensation along the medial forearm and resist little-finger abduction. C8 and T1 overlap. Neither has a reliable routine tendon reflex.\n\nUlnar entrapment can weaken finger spread. Medial forearm sensory loss or weakness of median-innervated thumb abduction suggests broader root or lower-plexus involvement. C8 exits between C7 and T1.",
        citation: [1, 4],
        next: "rad-decision"
    },
    {
        id: "rad-trunk",
        type: "question",
        module: 2,
        title: "T1–T12 · a band around the trunk",
        body: "A unilateral burning strip from spine to chest or abdomen can reflect thoracic root disease. Ask about exertional or pleuritic pain, dyspnea, syncope, severe abrupt pain and visceral symptoms. Examine vitals, heart, lungs, abdomen, skin, gait and leg reflexes.",
        citation: [2, 9],
        options: [
            { label: "Cardiopulmonary, vascular or abdominal cause possible", next: "rad-visceral" },
            { label: "Gait, cord or systemic warning signs", next: "rad-urgent" },
            { label: "Stable segmental chest or abdominal symptoms", next: "rad-thoracic" }
        ]
    },
    {
        id: "rad-visceral",
        type: "result",
        module: 2,
        title: "Evaluate the chest or abdomen first",
        body: "Assess for ACS, acute aortic syndrome, pulmonary embolism or an acute abdominal process according to the presentation. Pain with movement or a band-like distribution alone cannot exclude these conditions.",
        citation: [2, 9],
        recommendation: "Use the appropriate emergency pathway before assigning a spinal cause.",
        confidence: "recommended"
    },
    {
        id: "rad-thoracic",
        type: "info",
        module: 2,
        title: "Thoracic sensory landmarks",
        body: "Compare both sides at the same height. Approximate anterior anchors: **T2** axilla, **T3–T5** upper chest (T4 near the fourth interspace), **T6** xiphoid, **T7–T9** between xiphoid and umbilicus, **T10** umbilicus, **T11–T12** lower abdomen toward the inguinal region. T1 may produce intrinsic hand weakness.\n\nIntercostal and abdominal muscles share roots. No routine isolated limb myotome or tendon reflex identifies T2–T12. Look for asymmetric allodynia, rash or abdominal-wall weakness. Consider zoster, diabetes, foraminal disc disease and tumor. Thoracic MRI without contrast is usually appropriate for clinical thoracic radiculopathy.",
        citation: [2, 4, 9],
        next: "rad-decision"
    },
    {
        id: "rad-leg",
        images: [{ src: 'images/radiculopathies/lower-motor-exam.webp', alt: 'Lower limb key muscle tests for L2 through S1', caption: 'Compare hip flexion, knee extension, ankle dorsiflexion, great-toe extension and a supported single-leg heel raise. Kittech Six · AI-assisted illustration.' }],
        type: "question",
        module: 2,
        title: "Groin, leg or foot",
        body: "[Enlarge illustration](#/image/radiculopathies/lower-motor-exam.webp) · [Reflex exam and image credits](#/info/rad-reflex)\n\nStraight-leg raise: with knee extended, slowly raise the supine leg. Familiar radiating leg pain supports lower lumbar/sacral root irritation. Hamstring tightness alone is nonspecific. Reproduction in the symptomatic leg when lifting the opposite leg adds specificity. For anterior thigh pain, prone knee flexion with gentle hip extension can support upper lumbar root irritation.",
        citation: [3, 4],
        options: [
            { label: "Groin or anterior thigh · L1–L3", next: "rad-l123" },
            { label: "Medial shin or ankle · L4", next: "rad-l4" },
            { label: "Dorsum of foot or great toe · L5", next: "rad-l5" },
            { label: "Posterior calf, lateral foot or sole · S1", next: "rad-s1" },
            { label: "Posterior thigh, saddle or sphincter symptoms · S2–Co1", next: "rad-sacral" }
        ]
    },
    {
        id: "rad-l123",
        type: "info",
        module: 2,
        title: "L1–L3 · groin, anterior thigh and medial knee",
        body: "**L1:** groin/inguinal pain. There is no reliable isolated limb test. Check hip, pelvis and abdominal sources.\n\n**L2:** anterior proximal thigh. Compare resisted hip flexion.\n\n**L3:** anterior thigh to medial knee. Test knee extension and hip adduction. The patellar reflex (L3–L4) may decrease. Hip rotation provoking groin pain favors hip disease. Weak adduction accompanying quadriceps weakness argues against an isolated femoral neuropathy.",
        citation: [3, 4],
        next: "rad-decision"
    },
    {
        id: "rad-l4",
        type: "info",
        module: 2,
        title: "L4 · medial shin or ankle",
        body: "Pain may cross the knee into the medial shin. Compare sensation at the medial malleolus, resisted knee extension and ankle dorsiflexion, and patellar reflexes.\n\nWeak ankle dorsiflexion in addition to weak quadriceps suggests a lesion extending beyond the femoral nerve. Strength and reflex findings overlap with L3 and L5.",
        citation: [3, 4],
        next: "rad-decision"
    },
    {
        id: "rad-l5",
        type: "info",
        module: 2,
        title: "L5 · dorsum of foot and great toe",
        body: "Compare the dorsum of each foot, great-toe extension and ankle dorsiflexion. Also test ankle inversion and hip abduction: weakness there favors L5 involvement over isolated common fibular neuropathy. L5 has no dependable routine deep tendon reflex.\n\nA paracentral L4–5 disc typically affects the traversing L5 root. A foraminal or far-lateral L4–5 disc typically affects the exiting L4 root. Match MRI side and level to the exam.",
        citation: [3, 4],
        next: "rad-decision"
    },
    {
        id: "rad-s1",
        type: "info",
        module: 2,
        title: "S1 · posterior calf and lateral foot",
        body: "Pain often runs from buttock down posterior calf to lateral foot or sole. Check sensation along the lateral foot, compare Achilles reflexes and observe repeated single-leg heel raises if safe. Inability to rise on the affected toes supports plantarflexor weakness. A local Achilles tendon injury may also impair heel rise: examine the tendon.",
        citation: [3, 4],
        next: "rad-decision"
    },
    {
        id: "rad-sacral",
        type: "question",
        module: 2,
        title: "S2–Co1 · posterior thigh, saddle or tailbone",
        body: "**S2:** posterior thigh or popliteal fossa. Knee flexion shares L5–S2 input. **S3:** lower buttock/ischial region. **S4–S5:** perianal skin. S2–S4 collectively support bladder, bowel and sexual function. With consent, assess perineal sensation when indicated.\n\n**Co1:** the coccygeal plexus supplies a small area near the coccyx. Focal tenderness with sitting is nonspecific. No isolated limb myotome or reflex reliably identifies Co1.",
        citation: [4, 8, 13],
        options: [
            { label: "New saddle change, voiding difficulty or bowel/sexual dysfunction", next: "rad-urgent" },
            { label: "Stable symptoms without cauda equina concern", next: "rad-decision" }
        ]
    },
    {
        id: "rad-decision",
        type: "question",
        module: 3,
        title: "Do the exam and trajectory fit?",
        body: "Disc herniation and degenerative foraminal stenosis commonly affect one root. Multifocal symptoms or a discordant examination broaden the differential to plexus, inflammatory, infectious or neoplastic disease. A matching sensory, motor and reflex pattern strengthens localization. An isolated painful distribution with preserved power may represent radicular pain. Record the side, muscle tested, strength and reflex to make the next exam comparable.",
        citation: [1, 3, 4],
        options: [
            { label: "New major or progressive deficit, cord or cauda signs", next: "rad-urgent" },
            { label: "Localization unclear or multiple nerves involved", next: "rad-uncertain" },
            { label: "Persistent disabling symptoms or stable objective weakness", next: "rad-workup" },
            { label: "Stable cervical or upper-limb syndrome", next: "rad-neckcare" },
            { label: "Stable thoracic syndrome", next: "rad-trunkcare" },
            { label: "Stable lumbar or sacral syndrome", next: "rad-lumbarcare" }
        ]
    },
    {
        id: "rad-uncertain",
        type: "question",
        module: 3,
        title: "When the pattern crosses roots or nerves",
        body: "Compare muscles that share a root but use different peripheral nerves. Look for plexopathy, entrapment, length-dependent neuropathy and central disease. Ask how quickly weakness has spread and assess bulbar and respiratory function.\n\nFor persistent diagnostic uncertainty, arrange nerve conduction studies with needle EMG. Denervation may take several weeks to appear in distal muscles. A normal early study or a purely sensory presentation can miss radiculopathy.",
        citation: [1, 3, 5, 14],
        options: [
            { label: "Rapid bilateral weakness, often with reduced reflexes · possible Guillain–Barré", next: "rad-gbs" },
            { label: "Stable or persistent discordant findings", next: "rad-workup" }
        ]
    },
    {
        id: "rad-gbs",
        type: "result",
        module: 3,
        title: "Possible acute polyradiculoneuropathy",
        body: "Rapidly evolving bilateral weakness with reduced reflexes, facial or bulbar weakness, or dyspnea raises concern for Guillain–Barré syndrome. Assess airway, cough, swallowing and respiratory muscle strength urgently, including serial vital capacity where feasible. Check for autonomic instability.",
        citation: [14],
        recommendation: "Obtain emergency neurology input and admit for respiratory and autonomic monitoring. Involve critical care early for bulbar dysfunction, respiratory decline or rapid progression.",
        confidence: "recommended",
        safetyLevel: "critical"
    },
    {
        id: "rad-workup",
        type: "result",
        module: 3,
        title: "Select imaging and referral by deficit and region",
        body: "**New objective weakness:** establish severity and trajectory, arrange expedited specialist review and imaging as appropriate. Progressive or disabling motor loss needs urgent assessment today.\n\n**Cervical:** MRI without contrast for persistent radiculopathy despite conservative care or earlier with neurologic deficit. **Lumbar:** consider MRI after about 6 weeks of ongoing symptoms if intervention is being considered. **Thoracic:** MRI is appropriate once clinical thoracic radiculopathy is suspected. Select contrast with radiology for suspected infection or malignancy. Incidental disc abnormalities are common.",
        citation: [1, 3, 7, 9, 10],
        recommendation: "Correlate the imaging with the symptomatic side, sensory findings and weak muscles before procedural referral.",
        confidence: "recommended"
    },
    {
        id: "rad-neckcare",
        type: "info",
        module: 4,
        title: "Stable cervical radiculopathy",
        body: "Encourage tolerable activity and a graded cervical/scapular strengthening program with physical therapy. Consider a short course of an NSAID when appropriate after checking renal, GI, cardiovascular and bleeding risk. Persistent severe arm pain or persistent weakness warrants MRI and spine assessment. Cervical injections require specialist risk–benefit discussion. [Cervical spine evaluation](#/tree/cervical-spine-nontraumatic)",
        citation: [1, 7],
        next: "rad-follow"
    },
    {
        id: "rad-trunkcare",
        type: "info",
        module: 4,
        title: "Stable thoracic radiculopathy",
        body: "Direct treatment toward the cause. Inspect for an evolving zoster eruption, review diabetes and weight loss, and evaluate structural disease with thoracic MRI. If a mechanical root lesion is likely and the neurologic exam is stable, use activity modification, analgesia tailored to risk and guided rehabilitation. Progressive neurologic symptoms change the urgency.",
        citation: [2, 9],
        next: "rad-follow"
    },
    {
        id: "rad-lumbarcare",
        type: "info",
        module: 4,
        title: "Stable lumbosacral radiculopathy",
        body: "Encourage walking and usual activities as tolerated. Offer exercise-based rehabilitation. An NSAID trial has limited evidence in sciatica: use the lowest effective dose briefly if GI, renal and cardiovascular risks permit. Avoid routine oral corticosteroids, gabapentinoids and benzodiazepines for sciatica. Avoid opioids for chronic sciatica.\n\nFor acute severe sciatica, a specialist may consider epidural local anesthetic/steroid. Persistent disabling symptoms with concordant imaging can justify surgical evaluation. [Low back pain evaluation](#/tree/low-back-pain)",
        citation: [3, 6],
        next: "rad-follow"
    },
    {
        id: "rad-follow",
        type: "result",
        module: 4,
        title: "Before discharge",
        body: "Document bilateral power, gait, sensory findings, reflexes and baseline bladder/bowel function. Confirm safe mobility and adequate analgesia. Arrange a specific follow-up for repeat strength testing, earlier with any objective deficit. If reliable reassessment or safe ambulation cannot be arranged, reconsider disposition.",
        citation: [1, 3, 8],
        recommendation: "Return immediately for new weakness, foot drop, inability to walk, saddle numbness, altered voiding, bowel dysfunction, fever with worsening spinal pain or new symptoms in both limbs.",
        confidence: "recommended"
    }
];
export const RADICULOPATHIES_NODE_COUNT = RADICULOPATHIES_NODES.length;
export const RADICULOPATHIES_MODULE_LABELS = ['Emergency screen', 'Localize', 'Investigate', 'Treat and reassess'];
export const RADICULOPATHIES_CITATIONS = [
    {
        num: 1,
        text: "AAPM&R. Cervical Radiculopathy. https://now.aapmr.org/cervical-radiculopathy/"
    },
    {
        num: 2,
        text: "AAPM&R. Thoracic Radiculopathy/Myelopathy. https://now.aapmr.org/thoracic-radiculopathymyelopathy/"
    },
    {
        num: 3,
        text: "AAPM&R. Lumbar Radiculopathy. https://now.aapmr.org/lumbar-radiculopathy/"
    },
    {
        num: 4,
        text: "Rupp R et al. International Standards for Neurological Classification of Spinal Cord Injury, revised 2019. Key muscles and sensory points. https://doi.org/10.46292/sci2702-1"
    },
    {
        num: 5,
        text: "AAPM&R. Electrodiagnosis of Radiculopathies. https://now.aapmr.org/electrodiagnosis-of-radiculopathies-cervical-thoracic-and-lumbar/"
    },
    {
        num: 6,
        text: "NICE NG59. Low back pain and sciatica in over 16s, recommendations. https://www.nice.org.uk/guidance/ng59/chapter/Recommendations"
    },
    {
        num: 7,
        text: "ACR Appropriateness Criteria. Cervical Pain or Cervical Radiculopathy. https://acsearch.acr.org/docs/69426/Narrative/"
    },
    {
        num: 8,
        text: "WFNS Spine Committee. Cauda equina, conus medullaris and syndromes mimicking sciatic pain. 2024. https://pmc.ncbi.nlm.nih.gov/articles/PMC10943478/"
    },
    {
        num: 9,
        text: "ACR Appropriateness Criteria. Thoracic Back Pain. 2024. https://acsearch.acr.org/docs/3195158/Narrative/"
    },
    {
        num: 10,
        text: "ACR Appropriateness Criteria. Low Back Pain. https://acsearch.acr.org/docs/69483/Narrative/"
    },
    {
        num: 11,
        text: "International Headache Society. ICHD-3 Appendix A11.2.4, Headache attributed to upper cervical radiculopathy. https://doi.org/10.1177/0333102417738202"
    },
    {
        num: 12,
        text: "Ross DA, Ross MN. Diagnosis and Treatment of C4 Radiculopathy. https://pubmed.ncbi.nlm.nih.gov/27054454/"
    },
    {
        num: 13,
        text: "Woon JT, Stringer MD. Redefining the coccygeal plexus. Clinical Anatomy. https://doi.org/10.1002/ca.22242"
    },
    { num: 14, text: "EAN/PNS Guideline on diagnosis and treatment of Guillain–Barré syndrome. 2023. https://pubmed.ncbi.nlm.nih.gov/37814552/" }
];
