import type { DecisionNode } from '../../models/types.js';

export const HEARING_LOSS_NODES: DecisionNode[] = [
  {
    id: "sudden-hearing-loss-start",
    type: "info",
    module: 1,
    title: "Sudden Hearing Loss: Preserve the Treatment Window",
    body: "Adult pathway for a new sudden or rapidly progressive hearing change. A blocked or full ear with a normal otoscopic examination may be sensorineural hearing loss. Document the exact onset and pre-existing hearing baseline. [1,2]\n\n[Steps](#/info/hearing-loss-steps) | [Treatment windows](#/info/hearing-loss-timeline)",
    citation: [
      1,
      2
    ],
    next: "hearing-loss-emergency",
    safetyLevel: "warning",
    summary: "Sudden unexplained hearing loss needs urgent classification, ENT and audiometry."
  },
  {
    id: "hearing-loss-emergency",
    type: "question",
    module: 1,
    title: "Neurologic or Other Emergency?",
    body: "Ask about focal weakness, sensory change, diplopia, dysarthria, facial weakness, severe new imbalance, acute vertigo and significant trauma. Examine cranial nerves and gait when safe. New hearing loss with acute vestibular or neurologic findings may reflect posterior-circulation ischemia. [1,2]\n\nDo not let an ear diagnosis delay an indicated stroke or trauma evaluation.",
    citation: [
      1,
      2
    ],
    options: [
      {
        label: "Neurologic findings or concern for stroke",
        next: "hearing-loss-neuro"
      },
      {
        label: "Significant trauma, severe infection or facial weakness/vesicles",
        next: "hearing-loss-specific-cause"
      },
      {
        label: "No emergency features identified",
        next: "hearing-loss-history"
      }
    ]
  },
  {
    id: "hearing-loss-neuro",
    type: "result",
    module: 1,
    title: "Emergency Neurologic Evaluation",
    body: "Activate the appropriate emergency neurologic/stroke pathway. Hearing loss with acute vestibular symptoms can be vascular; a normal bedside hearing or tuning-fork result does not exclude stroke. Obtain indicated emergency imaging. [1,2]\n\n[Stroke pathway](#/tree/stroke)",
    citation: [
      1,
      2
    ],
    recommendation: "Emergency assessment for a central cause; do not wait for routine audiometry or outpatient MRI.",
    confidence: "recommended",
    safetyLevel: "critical"
  },
  {
    id: "hearing-loss-specific-cause",
    type: "result",
    module: 1,
    title: "Cause-Specific Urgent Assessment",
    body: "Trauma/barotrauma, severe ear infection, vesicles with facial weakness, or other identifiable disease needs urgent ENT and targeted investigation. Temporal-bone injury or complicated infection may require targeted CT; the restriction on routine head CT for idiopathic SSNHL does not apply to an indicated study. [1,2]\n\nDo not treat an identified infection with the idiopathic steroid-only pathway.",
    citation: [
      1,
      2
    ],
    recommendation: "Urgent specialist-directed evaluation and treatment of the identified or suspected cause.",
    confidence: "recommended",
    safetyLevel: "warning"
  },
  {
    id: "hearing-loss-history",
    type: "info",
    module: 2,
    title: "Define Onset, Side and Associated Symptoms",
    body: "Record onset date/time, unilateral versus bilateral change, prior hearing, tinnitus, fullness, vertigo, recurrent episodes, acoustic/barotrauma exposure, ototoxic drugs and infectious or systemic symptoms. Bilateral or recurrent loss warrants directed evaluation. [1]\n\nThe usual audiometric definition is sensorineural loss ≥30 dB across ≥3 consecutive frequencies developing within 72 hours. Do not wait for this measurement before referring suspected sudden loss. [1]",
    citation: [
      1
    ],
    next: "hearing-loss-otoscopy",
    summary: "Document onset precisely; suspected sudden loss is urgent before audiometric confirmation."
  },
  {
    id: "hearing-loss-otoscopy",
    type: "question",
    module: 2,
    title: "Is There an External or Middle-Ear Explanation?",
    body: "Inspect the canal and tympanic membrane for cerumen, effusion, perforation or infection. A normal examination does not exclude SSNHL. Conductive and sensorineural loss can coexist. [1,2]",
    citation: [
      1,
      2
    ],
    options: [
      {
        label: "Plausible conductive cause identified",
        next: "hearing-loss-conductive"
      },
      {
        label: "Normal, incomplete or uncertain examination",
        next: "hearing-loss-forks"
      }
    ]
  },
  {
    id: "hearing-loss-conductive",
    type: "info",
    module: 2,
    title: "Treat the Cause, Then Reassess Hearing",
    body: "Manage the identified canal/middle-ear problem when appropriate and reassess. Persistent loss, disproportionate symptoms or uncertainty requires audiometry; do not assume visible cerumen or effusion explains the entire hearing change. [1,2]\n\nProceed to bedside classification if feasible. Do not delay urgent referral for unresolved suspected sudden sensorineural loss.",
    citation: [
      1,
      2
    ],
    next: "hearing-loss-forks",
    summary: "Reassess after addressing conductive disease; persistent sudden loss remains urgent."
  },
  {
    id: "hearing-loss-forks",
    type: "info",
    module: 2,
    title: "Weber and Rinne: Support the Classification",
    body: "Use a gently activated 512-Hz tuning fork in a quiet environment. Weber: place the base on the forehead midline and ask whether sound is central or louder in either ear. Rinne: compare mastoid bone conduction with air conduction beside the canal, then repeat on the other ear. [3,4]\n\nAir greater than bone (positive Rinne) occurs with normal hearing OR sensorineural loss. Midline Weber does not establish normal hearing. Audiometry confirms the type and degree. [3]\n\n[Open the visual Fork Lab](#/calculator/hearing-fork)",
    citation: [
      3,
      4
    ],
    next: "hearing-loss-classification",
    images: [
      {
        src: "images/sudden-hearing-loss/weber-realistic.png",
        alt: "Weber technique and lateralization toward a conductive-loss ear or away from a sensorineural-loss ear",
        caption: "Original AI-generated myMedKitt clinical illustration. Interpret with Rinne, otoscopy and audiometry."
      },
      {
        src: "images/sudden-hearing-loss/rinne-realistic.png",
        alt: "Rinne sequence comparing mastoid bone conduction with air conduction beside the ear canal",
        caption: "Original AI-generated myMedKitt clinical illustration. Positive Rinne does not mean hearing is normal."
      }
    ],
    calculatorLinks: [
      {
        id: "hearing-fork",
        label: "Fork Lab"
      }
    ],
    summary: "Fork findings support classification but cannot exclude sudden sensorineural hearing loss."
  },
  {
    id: "hearing-loss-classification",
    type: "question",
    module: 2,
    title: "What Do the Combined Findings Support?",
    body: "Weber toward the affected ear plus bone greater than air there supports conductive loss. Weber toward the better ear with air greater than bone bilaterally supports sensorineural loss in the symptomatic ear. [3]\n\nProfound unilateral SNHL can produce a false-negative Rinne through cross-hearing by the opposite cochlea. Conflicting, equal or absent responses are inconclusive, not reassuring. [3]",
    citation: [
      3
    ],
    options: [
      {
        label: "Sensorineural pattern",
        next: "hearing-loss-urgent-referral"
      },
      {
        label: "Uncertain, mixed or conflicting pattern",
        next: "hearing-loss-urgent-referral"
      },
      {
        label: "Conductive pattern and convincing otoscopic cause",
        next: "hearing-loss-conductive-followup"
      }
    ]
  },
  {
    id: "hearing-loss-conductive-followup",
    type: "result",
    module: 3,
    title: "Conductive Pattern: Confirm Resolution",
    body: "Treat the identified cause and arrange appropriate reassessment/audiometry. If sudden loss remains unexplained, is disproportionate or does not resolve, use the urgent SSNHL pathway. [1,2]\n\n[Urgent ENT and audiometry](#/node/hearing-loss-urgent-referral)",
    citation: [
      1,
      2
    ],
    recommendation: "A conductive bedside pattern does not independently rule out coexisting sensorineural loss.",
    confidence: "recommended"
  },
  {
    id: "hearing-loss-urgent-referral",
    type: "info",
    module: 3,
    title: "Urgent ENT and Audiometry",
    body: "Coordinate ENT and audiometry today when possible. NICE recommends assessment within 24 hours for unexplained sudden loss developing within 3 days and beginning within the past 30 days. [2]\n\nAAO-HNS recommends audiometry as soon as possible and within 14 days of onset. This is an outer limit, not a reason to wait. If audiometry is unavailable and SSNHL is suspected, discuss empiric corticosteroids promptly with ENT after assessing risks. Do not wait for routine MRI. [1,4]",
    citation: [
      1,
      2,
      4
    ],
    next: "hearing-loss-onset",
    safetyLevel: "warning",
    summary: "Same-day coordination; preserve treatment access even when audiometry is delayed."
  },
  {
    id: "hearing-loss-onset",
    type: "question",
    module: 3,
    title: "How Long Since Onset?",
    body: "Use the actual symptom-onset date, not today’s diagnosis date. Late presentation still warrants specialist assessment, retrocochlear evaluation and consideration of salvage/rehabilitation. [1,2]",
    citation: [
      1,
      2
    ],
    options: [
      {
        label: "Within 2 weeks",
        next: "hearing-loss-early-steroids"
      },
      {
        label: "More than 2 weeks or uncertain onset",
        next: "hearing-loss-late"
      }
    ]
  },
  {
    id: "hearing-loss-early-steroids",
    type: "info",
    module: 4,
    title: "Offer an Early Steroid Discussion",
    body: "Corticosteroids are an initial treatment option within 2 weeks of onset. Discuss uncertain benefit, spontaneous recovery and patient-specific harms. They are not guaranteed to restore hearing. [1]\n\n[Systemic regimen and safety review](#/info/hearing-loss-steroids). If systemic therapy is unsuitable, discuss intratympanic treatment with ENT. Do not substitute low-dose dose-packs or routine antivirals. [1]",
    citation: [
      1
    ],
    next: "hearing-loss-safety",
    summary: "Shared decision-making about prompt corticosteroids, with ENT-directed regimen and risk review."
  },
  {
    id: "hearing-loss-safety",
    type: "info",
    module: 4,
    title: "Assess Systemic Steroid Risks",
    body: "Review glucose control, active infection, severe prior psychiatric steroid effects, gastrointestinal bleeding risk, concurrent immunosuppression and other patient-specific risks. Diabetes requires a monitoring plan rather than automatic denial of treatment. [1]\n\nIf systemic risk is substantial, coordinate an alternative intratympanic strategy with ENT. [Steroid reference](#/info/hearing-loss-steroids)",
    citation: [
      1
    ],
    next: "hearing-loss-workup",
    summary: "Choose treatment with the patient and ENT; arrange a clear risk-monitoring plan."
  },
  {
    id: "hearing-loss-late",
    type: "info",
    module: 4,
    title: "Late Presentation or Incomplete Recovery",
    body: "Incomplete recovery warrants ENT review for intratympanic steroid salvage within 2–6 weeks after onset. HBOT with steroids is an optional salvage approach within 1 month. Treatment availability and uncertainty require shared decision-making. [1]\n\nNICE recommends review within 2 weeks when sudden loss began over 30 days ago, or loss worsened rapidly over 4–90 days. New emergency features still override these outpatient targets. [2]",
    citation: [
      1,
      2
    ],
    next: "hearing-loss-workup",
    summary: "Do not abandon late-presenting patients: evaluate salvage options and plan rehabilitation."
  },
  {
    id: "hearing-loss-workup",
    type: "info",
    module: 5,
    title: "Evaluate Retrocochlear Disease",
    body: "Arrange ENT-coordinated MRI with an appropriate internal auditory canal/brain protocol to assess retrocochlear pathology such as vestibular schwannoma. Hearing recovery does not remove the need for evaluation. [1]\n\nABR is an alternative when MRI cannot be obtained, but can miss retrocochlear lesions; MRI is preferred when feasible. Routine MRI should not delay early treatment. [1]\n\n[Workup and differential](#/info/hearing-loss-workup)",
    citation: [
      1
    ],
    next: "hearing-loss-avoid",
    summary: "Coordinate retrocochlear evaluation without delaying acute treatment."
  },
  {
    id: "hearing-loss-avoid",
    type: "info",
    module: 5,
    title: "Avoid Low-Yield Routine Treatment and Testing",
    body: "Do not routinely order head CT or broad laboratory panels for presumed idiopathic SSNHL. Focal neurologic findings, trauma or chronic ear disease may justify targeted imaging; use the appropriate emergency or disease-specific pathway. [1]\n\nDo not routinely prescribe antivirals, thrombolytics, vasodilators or vasoactive drugs for idiopathic SSNHL. Identified zoster, syphilis or another specific cause needs targeted treatment. [1]",
    citation: [
      1
    ],
    next: "hearing-loss-followup",
    summary: "No routine head CT, broad laboratory panels or antivirals for idiopathic SSNHL."
  },
  {
    id: "hearing-loss-followup",
    type: "info",
    module: 5,
    title: "Document Recovery and Plan Salvage",
    body: "Repeat audiometry at treatment completion and within 6 months after treatment completion. Incomplete recovery: offer or refer for intratympanic steroid salvage within 2–6 weeks after onset. HBOT is an option only with steroids, within 2 weeks initially or within 1 month as salvage. [1]\n\nAddress persistent hearing impairment, tinnitus, communication needs and audiologic rehabilitation. [Timeline](#/info/hearing-loss-timeline)",
    citation: [
      1
    ],
    next: "hearing-loss-disposition",
    summary: "Track recovery objectively and arrange salvage within its treatment window."
  },
  {
    id: "hearing-loss-disposition",
    type: "result",
    module: 5,
    title: "Close the Loop Before Discharge",
    body: "Confirm a specific ENT/audiology plan, treatment decision and monitoring arrangements. Document onset, side, baseline, otoscopy, fork findings and neurologic examination. Explain that new weakness, facial change, severe imbalance or other neurologic symptoms require immediate reassessment. [1,2]\n\n[Steps](#/info/hearing-loss-steps) | [Timeline](#/info/hearing-loss-timeline)",
    citation: [
      1,
      2
    ],
    recommendation: "Urgent specialist follow-up with a documented treatment and reassessment plan; no routine-imaging delay.",
    confidence: "recommended",
    safetyLevel: "warning"
  }
];

export const HEARING_LOSS_MODULE_LABELS = ['Safety', 'Classify', 'Urgent Access', 'Treatment', 'Workup & Follow-up'];

export const HEARING_LOSS_CRITICAL_ACTIONS = [
  {
    text: "Sudden unexplained hearing loss: coordinate urgent ENT and audiometry; do not wait for routine MRI.",
    nodeId: "hearing-loss-urgent-referral"
  },
  {
    text: "New neurologic or concerning acute vestibular findings require emergency stroke assessment.",
    nodeId: "hearing-loss-emergency"
  },
  {
    text: "Corticosteroids are an initial option within 2 weeks; assess risks and discuss benefits promptly.",
    nodeId: "hearing-loss-early-steroids"
  },
  {
    text: "A positive Rinne does not mean normal hearing; uncertain forks cannot exclude SSNHL.",
    nodeId: "hearing-loss-forks"
  }
];

export const HEARING_LOSS_CITATIONS = [
  {
    num: 1,
    text: "Chandrasekhar SS, et al. Clinical Practice Guideline: Sudden Hearing Loss (Update). Otolaryngol Head Neck Surg. 2019;161(1_suppl):S1-S45. Includes Table 10 corticosteroid regimens. https://aao-hnsfjournals.onlinelibrary.wiley.com/doi/10.1177/0194599819859885"
  },
  {
    num: 2,
    text: "NICE. Hearing loss in adults: assessment and management (NG98). Recommendations 1.1 and 1.4. https://www.nice.org.uk/guidance/ng98/chapter/Recommendations"
  },
  {
    num: 3,
    text: "British Society of Audiology. Recommended Procedure: Rinne and Weber tuning fork tests. February 2022. https://www.thebsa.org.uk/wp-content/uploads/2023/10/OD104-51-BSA-Recommended-Procedure-Rinne-Weber-Tuning-Fork-Tests-February-2022.pdf"
  },
  {
    num: 4,
    text: "Defense Health Agency Hearing Center of Excellence. SSNHL Coding Guidance: Primary Care. Document version June 2020; posted November 2024. https://health.mil/Reference-Center/Clinical-Practice-Guidelines/2024/11/25/SSNHL-Coding-Guidance--Primary-Care"
  }
];
