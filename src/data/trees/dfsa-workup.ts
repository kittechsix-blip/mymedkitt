// MedKitt — Drug-Facilitated Sexual Assault (DFSA) Workup
// Time-driven forensic evidence collection with narrow detection windows.
// 6 modules: Initial Assessment → Consent & Safety → Specimen Collection → Drug Panel Selection → SANE & Forensic Exam → Prophylaxis & Disposition
// 38 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from '../../services/tree-service.js';

export const DFSA_WORKUP_CRITICAL_ACTIONS = [
  { text: 'URGENT: GHB undetectable after 6h blood, 12h urine - collect IMMEDIATELY', nodeId: 'dfsa-start' },
  { text: 'Gray-top tube (NaF/KOx) for GHB preservation - prevents in vitro production', nodeId: 'dfsa-collect-urgent' },
  { text: 'Standard hospital drug screens MISS most DFSA drugs - send to forensic lab', nodeId: 'dfsa-panel-select' },
  { text: 'Maintain chain of custody: label, seal tamper-evident, document all transfers', nodeId: 'dfsa-collect-urgent' },
  { text: 'Patient can consent to exam/specimens independently of police report', nodeId: 'dfsa-consent-intro' },
  { text: 'Place clothing in PAPER bags (NOT plastic - degrades DNA)', nodeId: 'dfsa-clothing' },
  { text: 'SANE nurse if available (higher prosecution rates, better evidence)', nodeId: 'dfsa-sane-check' },
  { text: 'STI prophylaxis: ceftriaxone 500mg IM + doxycycline 100mg BID x7d + metronidazole 2g', nodeId: 'dfsa-sti-prophylaxis' },
  { text: 'Emergency contraception: ulipristal 30mg preferred (effective up to 5 days)', nodeId: 'dfsa-pregnancy-prophylaxis' },
  { text: 'Hair collection at 4-6 weeks detects all DFSA agents if >5 days post-assault', nodeId: 'dfsa-collect-late' },
];

export const DFSA_WORKUP_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'dfsa-start',
    type: 'info',
    module: 1,
    title: 'Drug-Facilitated Sexual Assault — ED Workup',
    body: '[DFSA Steps Summary](#/info/dfsa-steps)\n\n**This consult is TIME-DRIVEN.** Detection windows for DFSA agents are narrow — GHB is undetectable after **6 hours in blood** and **12 hours in urine.**\n\nStandard hospital drug screens **miss most DFSA drugs.** Forensic specimens must go to a state crime lab or forensic reference laboratory.\n\n[Drug Detection Windows](#/info/dfsa-detection-windows) — full reference table\n[Forensic Specimen Guide](#/info/dfsa-specimen-guide) — tube types, volumes, chain of custody',
    citation: [1, 9, 12, 14],
    next: 'dfsa-red-flags',
  },

  {
    id: 'dfsa-red-flags',
    type: 'info',
    module: 1,
    title: 'Clinical Red Flags for DFSA',
    body: 'Suspect drug facilitation when **any** of the following are present:\n\n• Amnesia disproportionate to reported alcohol intake\n• Unexplained injuries or soreness (especially genital/anal)\n• Intermittent consciousness or "blackout" periods\n• Waking undressed or in unfamiliar location\n• Uncertain whether sexual contact occurred\n• Witnesses describe sudden incapacitation\n• Residual sedation, confusion, or ataxia on presentation\n• Reported unusual taste in drink\n\n**75% of DFSA cases involve multiple substances** — polydrug facilitation is the norm, not the exception.',
    citation: [1, 3, 12],
    next: 'dfsa-stabilize',
  },

  {
    id: 'dfsa-stabilize',
    type: 'question',
    module: 1,
    title: 'Medical Stability',
    body: 'Assess vitals, GCS, and perform trauma assessment.\n\n**Check for:**\n• Strangulation signs (petechiae, voice changes, neck tenderness)\n• Genital/anal trauma\n• Bite marks\n• Defensive injuries (forearms, hands)\n• Residual drug effects (sedation, respiratory depression)\n\nIs the patient medically stable?',
    citation: [6, 12],
    options: [
      {
        label: 'Stable',
        description: 'Vitals normal, GCS 15, no acute injuries requiring intervention',
        next: 'dfsa-time-since',
      },
      {
        label: 'Unstable — Stabilize First',
        description: 'Respiratory depression, altered mental status, hemodynamic instability, or significant trauma',
        next: 'dfsa-unstable-result',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'dfsa-unstable-result',
    type: 'result',
    module: 1,
    title: 'Medical Stabilization Required',
    body: 'Address life threats before forensic workup.\n\n**Preserve evidence while stabilizing:**\n• Place clothing in **paper bags** (NOT plastic)\n• Minimize bathing, oral care, and voiding if safely possible\n• Delay urinary catheter and rectal exam if not emergently needed\n• If intubation required, save ET tube for toxicology\n• Document all injuries encountered during resuscitation\n\nOnce stable, return to this consult for forensic workup.',
    recommendation: 'Stabilize medically. Preserve clothing and minimize contamination. Forensic specimens can be collected after stabilization — but every hour of delay narrows detection windows.',
    confidence: 'definitive',
    citation: [6, 12],
  },

  {
    id: 'dfsa-time-since',
    type: 'question',
    module: 1,
    title: 'Time Since Assault',
    body: '**Critical branch point.** Detection windows are substance-specific but uniformly narrow. GHB has the shortest window (4-6h blood, 3-12h urine).\n\nWhen did the assault occur (or when was the patient last known to be well)?',
    citation: [1, 9],
    options: [
      {
        label: '< 6 hours',
        description: 'GHB still detectable in blood — COLLECT IMMEDIATELY',
        next: 'dfsa-consent-intro',
        urgency: 'critical',
      },
      {
        label: '6-12 hours',
        description: 'GHB may still be in urine; most other agents detectable',
        next: 'dfsa-consent-intro',
        urgency: 'urgent',
      },
      {
        label: '12-72 hours',
        description: 'Most agents still detectable in urine; GHB window closed',
        next: 'dfsa-consent-intro',
      },
      {
        label: '72 hours — 5 days',
        description: 'Limited urine panel; some agents persist (cannabinoids, EtG)',
        next: 'dfsa-consent-intro',
      },
      {
        label: '> 5 days',
        description: 'Standard tox unlikely positive — plan hair collection at 4-6 weeks',
        next: 'dfsa-consent-intro',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: CONSENT & SAFETY
  // =====================================================================

  {
    id: 'dfsa-consent-intro',
    type: 'info',
    module: 2,
    title: 'Informed Consent Framework',
    body: 'The patient has the right to consent to **each element independently:**\n\n• Forensic medical examination\n• Injury photography\n• Specimen collection (blood, urine, hair)\n• Law enforcement notification\n• Release of evidence to police\n\n**The patient does NOT need to file a police report** to receive a forensic exam or have specimens collected. Specimens can be held by the hospital or crime lab.\n\n[VAWA Protections](#/info/dfsa-vawa) — federal rights for sexual assault survivors\n\n**Capacity assessment:** Can the patient understand the risks, benefits, and alternatives? If residual sedation is impairing capacity, proceed with time-critical specimen collection while documenting clinical rationale.',
    citation: [5, 6, 8],
    next: 'dfsa-consent-exam',
  },

  {
    id: 'dfsa-consent-exam',
    type: 'question',
    module: 2,
    title: 'Consent for Forensic Examination?',
    body: 'Explain the forensic exam process. Remind the patient they may **decline any component at any time** and can stop the exam at any point.\n\nDoes the patient consent to a forensic examination?',
    citation: [5, 6],
    options: [
      {
        label: 'Yes — Consents to exam',
        description: 'Proceed with forensic examination and evidence collection',
        next: 'dfsa-consent-specimens',
      },
      {
        label: 'Declines examination',
        description: 'Patient does not want forensic exam — still offer prophylaxis and support',
        next: 'dfsa-decline-exam',
      },
    ],
  },

  {
    id: 'dfsa-decline-exam',
    type: 'info',
    module: 2,
    title: 'Exam Declined — Still Offer Services',
    body: 'Even without a forensic exam, offer all of the following:\n\n• **STI prophylaxis** (gonorrhea, chlamydia, trichomoniasis)\n• **Pregnancy prophylaxis** (emergency contraception)\n• **HIV PEP assessment** — [PEP Consult](#/tree/pep)\n• **Hepatitis B vaccination** (if unvaccinated)\n• **Safety assessment** — is it safe to discharge?\n• **Victim advocacy referral**\n\nConsider offering **urine collection for toxicology** — the patient can hold the specimen while deciding whether to involve law enforcement.\n\n[Patient Handout](#/info/dfsa-patient-handout) — follow-up resources and rights',
    citation: [5, 6, 8],
    next: 'dfsa-safe-discharge',
  },

  {
    id: 'dfsa-consent-specimens',
    type: 'question',
    module: 2,
    title: 'Consent for Specimen Collection?',
    body: 'Forensic toxicology specimens include blood and urine (and potentially hair at follow-up).\n\n**Important:** Specimens can be held by the hospital or crime lab — the patient does **NOT** need to file a police report now. They can decide later.\n\nDoes the patient consent to forensic specimen collection?',
    citation: [6, 8],
    options: [
      {
        label: 'Yes — Collect specimens',
        description: 'Proceed with forensic blood and urine collection',
        next: 'dfsa-consent-photos',
      },
      {
        label: 'Declines specimen collection',
        description: 'Document refusal; inform about future hair collection option',
        next: 'dfsa-no-specimens',
      },
    ],
  },

  {
    id: 'dfsa-consent-photos',
    type: 'question',
    module: 2,
    title: 'Consent for Injury Photography?',
    body: 'Photo documentation of injuries significantly strengthens forensic evidence.\n\nDoes the patient consent to photography of injuries?',
    citation: [6],
    options: [
      {
        label: 'Yes — Photo documentation',
        description: 'Photograph all visible injuries with scale ruler',
        next: 'dfsa-collection-triage',
      },
      {
        label: 'Declines photography',
        description: 'Document injuries with written descriptions only',
        next: 'dfsa-collection-triage',
      },
    ],
  },

  {
    id: 'dfsa-no-specimens',
    type: 'info',
    module: 2,
    title: 'Specimen Collection Declined',
    body: 'Document the refusal in the medical record.\n\nInform the patient:\n• Specimens can be collected up to **5 days** post-assault (limited utility after 72h)\n• **Hair collection is possible at 4-6 weeks** post-assault — detects all major DFSA agents\n• They may change their mind at any time\n\nProceed with forensic exam (if consented) and prophylaxis.',
    citation: [9, 10],
    next: 'dfsa-sane-check',
  },

  // =====================================================================
  // MODULE 3: SPECIMEN COLLECTION TIMELINE
  // =====================================================================

  {
    id: 'dfsa-collection-triage',
    type: 'question',
    module: 3,
    title: 'Specimen Collection Priority',
    body: 'Confirm time since assault to guide specimen priority.\n\n[Drug Detection Windows](#/info/dfsa-detection-windows) — full reference\n[Forensic Specimen Guide](#/info/dfsa-specimen-guide) — tube types and volumes\n\nWhat is the collection time window?',
    citation: [1, 2, 9],
    options: [
      {
        label: '< 6 hours — URGENT',
        description: 'GHB still detectable — collect blood AND urine immediately',
        next: 'dfsa-collect-urgent',
        urgency: 'critical',
      },
      {
        label: '6-12 hours',
        description: 'GHB may persist in urine; blood for other agents',
        next: 'dfsa-collect-6-12',
        urgency: 'urgent',
      },
      {
        label: '12-72 hours',
        description: 'Urine primary, blood secondary',
        next: 'dfsa-collect-12-72',
      },
      {
        label: '72 hours — 5 days',
        description: 'Urine only; limited panel',
        next: 'dfsa-collect-72-5d',
      },
      {
        label: '> 5 days',
        description: 'Plan hair collection at 4-6 weeks',
        next: 'dfsa-collect-late',
      },
    ],
  },

  {
    id: 'dfsa-collect-urgent',
    type: 'info',
    module: 3,
    title: 'URGENT: < 6 Hour Collection',
    body: '**GHB IS STILL DETECTABLE — COLLECT IMMEDIATELY.**\n\nCollect **both** blood and urine before any other forensic procedures:\n\n**Blood:**\n• **Gray-top tube (NaF/KOx)** — sodium fluoride preserves GHB, prevents in vitro production\n• Lavender-top (EDTA) — standard forensic toxicology\n• Additional red-top — clinical labs (BAL, hepatitis, HIV)\n\n**Urine:**\n• **First-void specimen** — do NOT discard\n• Minimum **50-100 mL** in clean container\n• Do NOT use preservative-containing UA cups\n\n**Chain of custody:**\n• Label with patient name, DOB, date/time of collection, collector name\n• Seal with tamper-evident tape\n• Document transfer at every step\n\n[Forensic Specimen Guide](#/info/dfsa-specimen-guide)',
    citation: [1, 2, 6, 9],
    next: 'dfsa-panel-select',
  },

  {
    id: 'dfsa-collect-6-12',
    type: 'info',
    module: 3,
    title: '6-12 Hour Collection',
    body: '**GHB may still be detectable in urine** (window up to 12h). Collect urine urgently.\n\n**Urine (priority):**\n• First-void specimen, 50-100 mL\n• GHB may still be present — time is critical\n\n**Blood:**\n• Gray-top (NaF) — GHB unlikely in blood but still collect\n• Lavender-top (EDTA) — benzodiazepines, ketamine, zolpidem, opioids still detectable\n\n**Still detectable at 6-12h:**\n• Flunitrazepam (Rohypnol) — blood 24-72h\n• Ketamine — blood 24-48h\n• Zolpidem — blood up to 8h (borderline)\n• Benzodiazepines — blood 6-12h\n• Antihistamines — blood 24h\n• Opioids — blood 24-48h\n\n[Drug Detection Windows](#/info/dfsa-detection-windows)',
    citation: [1, 9],
    next: 'dfsa-panel-select',
  },

  {
    id: 'dfsa-collect-12-72',
    type: 'info',
    module: 3,
    title: '12-72 Hour Collection',
    body: '**Urine is the primary specimen.** Blood is secondary but still valuable.\n\n**GHB window is closed.** Focus on:\n\n**Urine (primary — longer windows):**\n• Flunitrazepam metabolite (7-aminoflunitrazepam) — up to 72h\n• Ketamine/norketamine — up to 96h\n• Benzodiazepines — 24-72h depending on agent\n• Zolpidem — up to 24h\n• Opioids — 48-96h\n• Antihistamines — 48-72h\n• Alcohol metabolites (EtG/EtS) — up to 80h\n\n**Blood (secondary):**\n• Flunitrazepam — up to 72h\n• Ketamine — up to 48h\n• Opioids — up to 48h\n\nCollect both gray-top and lavender-top blood tubes plus first-void urine.',
    citation: [1, 9],
    next: 'dfsa-panel-select',
  },

  {
    id: 'dfsa-collect-72-5d',
    type: 'info',
    module: 3,
    title: '72 Hours — 5 Day Collection',
    body: '**Urine only.** Blood is unlikely to yield results at this interval.\n\n**Still potentially detectable:**\n• Cannabinoids — weeks in urine (chronic use)\n• EtG/EtS (alcohol metabolite) — up to 80h in urine\n• Some benzodiazepines (long-acting) — variable\n• Opioids — 48-96h (some agents)\n• Ketamine metabolite (norketamine) — up to 96h\n\nCollect first-void urine specimen.\n\n**Plan for hair collection at 4-6 week follow-up** — hair analysis detects ALL major DFSA agents with a much longer window. Discuss this with the patient and document in follow-up plan.',
    citation: [9, 10],
    next: 'dfsa-panel-select',
  },

  {
    id: 'dfsa-collect-late',
    type: 'info',
    module: 3,
    title: '> 5 Days Post-Assault',
    body: 'Standard blood and urine toxicology are **unlikely to yield positive results** at this interval.\n\n**Hair collection is the primary option:**\n• Collect at **4-6 weeks post-assault** (allows drug to incorporate into hair shaft)\n• **Pencil-thickness bundle** from the posterior vertex\n• Cut at the scalp — do NOT pluck\n• Wrap in aluminum foil, label proximal end\n• Send to forensic reference laboratory (NMS Labs, Axiom Testing, RTL)\n\n**Hair detects:**\n• GHB, flunitrazepam, ketamine, zolpidem, benzodiazepines, opioids, cannabinoids, antihistamines, and other DFSA agents\n\nStill collect urine if patient presents — some long-acting agents may persist.\n\nDocument the plan for hair collection at follow-up.',
    citation: [9, 10],
    next: 'dfsa-panel-select',
  },

  // =====================================================================
  // MODULE 4: DRUG PANEL SELECTION
  // =====================================================================

  {
    id: 'dfsa-panel-select',
    type: 'info',
    module: 4,
    title: 'Forensic Drug Panel',
    body: '**Hospital drug screens are INADEQUATE for DFSA.**\n\nStandard hospital UDS/immunoassay:\n• Does **NOT** detect GHB\n• Does **NOT** detect flunitrazepam metabolites at relevant concentrations\n• Does **NOT** detect zolpidem, zaleplon, or zopiclone\n• Does **NOT** detect ketamine at low facilitative doses\n• Is **NOT forensically admissible** — lacks confirmation testing and chain of custody\n\n**Specimens MUST go to a state crime lab or forensic reference laboratory:**\n• NMS Labs (Willow Grove, PA)\n• Axiom Testing (San Diego, CA)\n• Redwood Toxicology Laboratory (Santa Rosa, CA)\n• Your state/regional crime lab\n\nThese labs use **GC-MS/LC-MS/MS confirmation** per SOFT/ANSI Standard 121.\n\n[SOFT Recommended Panel](#/info/dfsa-soft-panel) — complete analyte list',
    citation: [1, 2, 14],
    next: 'dfsa-hospital-tox',
  },

  {
    id: 'dfsa-hospital-tox',
    type: 'question',
    module: 4,
    title: 'Hospital Tox Screen in Parallel?',
    body: 'A hospital tox screen is useful for **clinical management** (e.g., identifying acute intoxication, guiding treatment) but does **NOT replace** the forensic panel.\n\nOrder a hospital UDS/serum tox in addition to forensic specimens?',
    citation: [1, 14],
    options: [
      {
        label: 'Yes — Order both',
        description: 'Hospital tox for clinical management + forensic specimens for evidence',
        next: 'dfsa-lab-note',
      },
      {
        label: 'Forensic specimens only',
        description: 'Skip hospital tox — no acute clinical indication',
        next: 'dfsa-lab-note',
      },
    ],
  },

  {
    id: 'dfsa-lab-note',
    type: 'info',
    module: 4,
    title: 'Lab Ordering & Specimen Handling',
    body: '**Clinical baseline labs:**\n• CBC, CMP\n• Urinalysis\n• Urine pregnancy test\n• Blood alcohol level\n• HIV Ag/Ab combo (4th gen)\n• Hepatitis B panel (HBsAg, HBsAb, HBcAb)\n• Hepatitis C Ab\n• RPR/VDRL\n\n**Forensic specimen handling:**\n• Label each specimen with patient name, DOB, date/time, collector\n• **Seal with tamper-evident tape**\n• Complete chain of custody form — document every transfer\n• Store refrigerated (NOT frozen) until crime lab pickup\n• Contact your state crime lab or forensic reference lab for transport/pickup instructions\n\n**Keep forensic and clinical specimens SEPARATE** — different chain of custody requirements.',
    citation: [2, 6],
    next: 'dfsa-sane-check',
  },

  // =====================================================================
  // MODULE 5: SANE & FORENSIC EXAM
  // =====================================================================

  {
    id: 'dfsa-sane-check',
    type: 'question',
    module: 5,
    title: 'SANE Nurse Available?',
    body: 'Is a Sexual Assault Nurse Examiner (SANE) available at your facility or on-call?\n\nSANE-collected evidence is significantly more likely to be admissible and complete. SANE exams have higher prosecution rates than non-SANE exams.',
    citation: [6, 14],
    options: [
      {
        label: 'Yes — SANE available',
        description: 'SANE nurse on-site or en route',
        next: 'dfsa-sane-handoff',
      },
      {
        label: 'No SANE available',
        description: 'No SANE at facility or on-call; physician will coordinate exam',
        next: 'dfsa-no-sane',
      },
    ],
  },

  {
    id: 'dfsa-sane-handoff',
    type: 'info',
    module: 5,
    title: 'SANE Nurse Handoff',
    body: '**Your role (ED physician):**\n• Medical stabilization\n• **Time-critical toxicology specimen collection** (do NOT wait for SANE if <6h)\n• Prophylaxis initiation (STI, pregnancy, HIV PEP)\n• Clinical lab ordering\n• Medical documentation\n\n**SANE role:**\n• Forensic evidence collection kit (swabs, combings)\n• Detailed injury documentation and photography\n• Evidence packaging and chain of custody\n• Patient advocacy coordination\n• Forensic-specific history taking\n\n**Communicate clearly:** Share time-since-assault, specimens already collected, and any injuries identified during medical exam.',
    citation: [6, 14],
    next: 'dfsa-clothing',
  },

  {
    id: 'dfsa-no-sane',
    type: 'info',
    module: 5,
    title: 'No SANE Available — Physician-Led Coordination',
    body: 'Contact **RAINN National Sexual Assault Hotline: 1-800-656-4673** for guidance on evidence collection.\n\n**Consider transfer** to a SANE-equipped facility if:\n• Patient is medically stable\n• Patient consents to transfer\n• Transfer will not close critical specimen windows\n\n**If performing evidence collection:**\n• Use your facility\'s sexual assault evidence collection kit\n• Follow kit instructions exactly — each step preserves different evidence\n• Key components: oral/vaginal/anal swabs, fingernail scrapings, pubic hair combings, dried secretion swabs\n• Maintain chain of custody throughout\n• Document all findings with body diagrams',
    citation: [6, 14],
    next: 'dfsa-clothing',
  },

  {
    id: 'dfsa-clothing',
    type: 'info',
    module: 5,
    title: 'Clothing & Physical Evidence',
    body: '**Clothing evidence handling:**\n• Place each item in a **separate PAPER bag** — **NOT plastic** (plastic promotes bacterial growth and degrades DNA evidence)\n• If patient is wearing the same clothes as during assault, collect all items\n• If patient changed clothes, attempt to obtain original clothing from home/car\n• Place paper sheet under patient while undressing to catch trace evidence\n\n**Additional evidence:**\n• Fingernail scrapings/cuttings if scratching occurred\n• Dried secretion swabs (Wood\'s lamp can identify)\n• Foreign material on skin or clothing\n• Bitemark swabs for saliva DNA\n\n**Document everything** — item descriptions, condition, how packaged, chain of custody.',
    citation: [6],
    next: 'dfsa-documentation',
  },

  {
    id: 'dfsa-documentation',
    type: 'info',
    module: 5,
    title: 'Documentation Requirements',
    body: '**Document in the medical record:**\n• **Patient statements in direct quotes** — use their exact words\n• Time of presentation and reported time of assault\n• All injuries: location, size, color, shape, age estimation\n• Specimens collected with date/time of each\n• Chain of custody transfers\n• Consents obtained and declined\n• All providers involved in care\n\n**Critical:** Document **objective findings only.** Do NOT:\n• State whether you believe an assault occurred\n• Characterize injuries as "consistent with" or "inconsistent with" assault\n• Offer opinions on patient credibility\n• Include irrelevant social or sexual history\n\nUse body diagrams and measurement scales in all injury documentation.',
    citation: [5, 6, 14],
    next: 'dfsa-prophylaxis-intro',
  },

  // =====================================================================
  // MODULE 6: PROPHYLAXIS & DISPOSITION
  // =====================================================================

  {
    id: 'dfsa-prophylaxis-intro',
    type: 'info',
    module: 6,
    title: 'Prophylaxis Overview',
    body: 'Three categories of prophylaxis to address independently:\n\n**1. STI Prophylaxis** — gonorrhea, chlamydia, trichomoniasis\n**2. Pregnancy Prophylaxis** — emergency contraception\n**3. HIV PEP** — based on exposure risk assessment\n\nPlus: **Hepatitis B vaccination** if unvaccinated.\n\nEach is offered independently — the patient may accept some and decline others.\n\n[STI Prophylaxis Regimens](#/info/dfsa-sti-regimens) — dosing reference',
    citation: [4, 5, 11],
    next: 'dfsa-sti-prophylaxis',
  },

  {
    id: 'dfsa-sti-prophylaxis',
    type: 'question',
    module: 6,
    title: 'STI Prophylaxis',
    body: '**Empiric prophylaxis for gonorrhea, chlamydia, and trichomoniasis:**\n\n• [Ceftriaxone](#/drug/ceftriaxone/sexual assault) **500 mg IM × 1** — gonorrhea\n• [Doxycycline](#/drug/doxycycline/sexual assault) **100 mg PO BID × 7 days** — chlamydia\n• [Metronidazole](#/drug/metronidazole/sexual assault) **2 g PO × 1 dose** — trichomoniasis\n\n**Cephalosporin allergy alternative:**\nGentamicin 240 mg IM × 1 + Azithromycin 2 g PO × 1\n\nAccept STI prophylaxis?',
    citation: [4],
    options: [
      {
        label: 'Yes — Give STI prophylaxis',
        description: 'Ceftriaxone 500mg IM + Doxycycline 100mg BID ×7d + Metronidazole 2g PO',
        next: 'dfsa-sti-result',
      },
      {
        label: 'Declines STI prophylaxis',
        description: 'Document refusal; recommend follow-up STI testing',
        next: 'dfsa-pregnancy-check',
      },
    ],
  },

  {
    id: 'dfsa-sti-result',
    type: 'result',
    module: 6,
    title: 'STI Prophylaxis Ordered',
    body: '**Administer in ED:**\n• Ceftriaxone 500 mg IM × 1\n• Metronidazole 2 g PO × 1\n\n**Prescribe:**\n• Doxycycline 100 mg PO BID × 7 days\n\n**Cephalosporin allergy:** Gentamicin 240 mg IM × 1 + Azithromycin 2 g PO × 1\n\n**Pregnancy modifications:** Substitute azithromycin 1 g PO × 1 for doxycycline. Metronidazole is safe in pregnancy (CDC category B).',
    recommendation: 'Follow-up STI testing: NAAT for GC/CT at 2 weeks. Repeat full STI panel (GC, CT, syphilis, HIV, Hep B/C) at 3 months. Test of cure not routinely needed unless symptoms persist.',
    confidence: 'definitive',
    citation: [4],
    next: 'dfsa-pregnancy-check',
  },

  {
    id: 'dfsa-pregnancy-check',
    type: 'question',
    module: 6,
    title: 'Pregnancy Risk?',
    body: 'Is the patient at risk for pregnancy?\n\n**Risk factors:**\n• Reproductive-age female (typically 12-50)\n• Not on reliable contraception (IUD, implant, tubal ligation, hysterectomy)\n• Vaginal penetration occurred or suspected\n\nUrine pregnancy test should have been collected with baseline labs.',
    citation: [5, 7],
    options: [
      {
        label: 'At risk — Offer EC',
        description: 'Reproductive-age, vaginal exposure, no reliable contraception',
        next: 'dfsa-pregnancy-prophylaxis',
      },
      {
        label: 'Not at risk / Not applicable',
        description: 'Reliable contraception, no vaginal exposure, not reproductive age, or male patient',
        next: 'dfsa-hep-b',
      },
    ],
  },

  {
    id: 'dfsa-pregnancy-prophylaxis',
    type: 'question',
    module: 6,
    title: 'Emergency Contraception',
    body: '**Ulipristal acetate (ella)** is preferred — effective up to **5 days** post-exposure with no decrease in efficacy over time.\n\n**Levonorgestrel (Plan B)** is an alternative — most effective within 72h, efficacy decreases with time and higher body weight.\n\n**Copper IUD** is the most effective EC option (>99%) if within 5 days — consider GYN consult for placement.\n\nSelect emergency contraception:',
    citation: [5, 7],
    options: [
      {
        label: 'Ulipristal 30 mg PO (Recommended)',
        description: 'ella — effective up to 5 days, preferred agent',
        next: 'dfsa-ec-result',
      },
      {
        label: 'Levonorgestrel 1.5 mg PO',
        description: 'Plan B — alternative, best within 72h',
        next: 'dfsa-ec-result',
      },
      {
        label: 'Declines EC',
        description: 'Document refusal; recommend pregnancy test at 2 weeks',
        next: 'dfsa-hep-b',
      },
    ],
  },

  {
    id: 'dfsa-ec-result',
    type: 'result',
    module: 6,
    title: 'Emergency Contraception Ordered',
    body: '**Ulipristal acetate (ella):** 30 mg PO × 1 dose\n• Effective up to 120h (5 days) post-exposure\n• Progesterone receptor modulator — delays ovulation\n• Do NOT take with levonorgestrel — they interfere\n• Hormonal contraception can resume 5 days after ulipristal\n\n**Levonorgestrel (Plan B):** 1.5 mg PO × 1 dose\n• Most effective within 72h\n• Efficacy may decrease if BMI > 25\n• Can resume hormonal contraception immediately\n\n**Copper IUD:** Most effective EC (>99%) — GYN consult for placement if within 5 days and patient desires.',
    recommendation: 'Follow-up pregnancy test at 2 weeks. If positive, early OB referral.',
    confidence: 'recommended',
    citation: [5, 7],
    next: 'dfsa-hep-b',
  },

  {
    id: 'dfsa-hep-b',
    type: 'question',
    module: 6,
    title: 'Hepatitis B Vaccination Status',
    body: 'Is the patient vaccinated against Hepatitis B?\n\nCheck HBsAb from baseline labs if available. If immune (HBsAb positive), no further Hep B intervention needed.',
    citation: [4, 12],
    options: [
      {
        label: 'Vaccinated / Immune',
        description: 'HBsAb positive or documented vaccination series',
        next: 'dfsa-hiv-pep',
      },
      {
        label: 'Unvaccinated / Unknown',
        description: 'No documented vaccination or immunity',
        next: 'dfsa-hep-b-result',
      },
    ],
  },

  {
    id: 'dfsa-hep-b-result',
    type: 'info',
    module: 6,
    title: 'Initiate Hepatitis B Vaccine',
    body: '**Hep B vaccine dose 1 today.** Schedule doses 2 and 3:\n• Dose 2: 1 month\n• Dose 3: 6 months\n\n**If source is known HBV-positive:**\n• Add **HBIG** (Hepatitis B Immune Globulin) 0.06 mL/kg IM\n• Administer at different injection site from vaccine\n• HBIG most effective within 24h of exposure, up to 7 days',
    citation: [4],
    next: 'dfsa-hiv-pep',
  },

  {
    id: 'dfsa-hiv-pep',
    type: 'question',
    module: 6,
    title: 'HIV PEP Assessment',
    body: 'Assess HIV transmission risk based on exposure type.\n\n**Higher risk — PEP recommended:**\n• Receptive anal intercourse\n• Source known HIV-positive with detectable viral load\n• Mucosal exposure to blood\n\n**Lower risk — PEP case-by-case:**\n• Receptive vaginal intercourse\n• Source HIV status unknown\n• Insertive anal/vaginal intercourse\n\nFor full HIV PEP evaluation including regimen selection and follow-up:\n[PEP Consult](#/tree/pep)',
    citation: [11],
    options: [
      {
        label: 'High risk — Initiate PEP',
        description: 'Penetrating exposure, high-risk source, or unknown source with risk factors',
        next: 'dfsa-hiv-pep-result',
      },
      {
        label: 'Low risk / Declines',
        description: 'Low-risk exposure or patient declines PEP after counseling',
        next: 'dfsa-safe-discharge',
      },
    ],
  },

  {
    id: 'dfsa-hiv-pep-result',
    type: 'info',
    module: 6,
    title: 'HIV PEP — Initiate Now',
    body: '**PEP must be started within 72 hours** of exposure. Earlier is better.\n\nFor full PEP workup including regimen selection, baseline labs, and 28-day follow-up schedule:\n\n[PEP Consult](#/tree/pep)\n\n**Key points:**\n• Preferred regimen: Biktarvy (BIC/TAF/FTC) × 28 days\n• Start ASAP — do not delay for source testing\n• Baseline: HIV Ag/Ab, CBC, CMP, Hep B/C\n• Follow-up HIV testing at 4-6 weeks and 3 months',
    citation: [11],
    next: 'dfsa-safe-discharge',
  },

  {
    id: 'dfsa-safe-discharge',
    type: 'question',
    module: 6,
    title: 'Safe Discharge Assessment',
    body: 'Screen for ongoing safety concerns before discharge.\n\n**Assess:**\n• Is the assailant known to the patient?\n• Does the patient share housing with the assailant?\n• Does the patient have a safe place to go tonight?\n• Is there an ongoing threat?\n• Are there children at risk?\n• Does the patient have access to transportation?',
    citation: [5, 6],
    options: [
      {
        label: 'Safe to discharge',
        description: 'Patient has safe housing, no ongoing threat, support available',
        next: 'dfsa-disposition',
      },
      {
        label: 'Safety concerns identified',
        description: 'Assailant has access, no safe housing, or ongoing threat',
        next: 'dfsa-unsafe-dispo',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'dfsa-unsafe-dispo',
    type: 'info',
    module: 6,
    title: 'Unsafe Discharge — Safety Resources',
    body: '**Activate safety resources:**\n\n• **Social work consult** — immediate\n• **Victim advocacy** — contact your facility\'s advocate or RAINN: **1-800-656-4673**\n• **Domestic violence shelter referral** — National DV Hotline: **1-800-799-7233**\n• **Safety planning** — develop specific plan with patient and advocate\n• **Law enforcement notification** — if patient consents and immediate threat exists\n\n**If no safe discharge option:**\n• Consider social admit for observation\n• Coordinate with advocacy for emergency housing\n• Do **NOT** discharge to an environment where the assailant has access\n\nDocument all safety concerns and resources activated.',
    citation: [5, 6],
    next: 'dfsa-disposition',
  },

  {
    id: 'dfsa-disposition',
    type: 'result',
    module: 6,
    title: 'Disposition & Follow-Up',
    body: '[Patient Handout](#/info/dfsa-patient-handout) — shareable follow-up guide with resources\n\n**Follow-up schedule:**\n• **2 weeks:** STI testing (NAAT for GC/CT), pregnancy test\n• **4-6 weeks:** Hair specimen collection if planned, HIV test (if PEP started)\n• **3 months:** Repeat full STI panel (GC, CT, syphilis, HIV, Hep B/C)\n• **6 months:** Final HIV test, Hep B vaccine dose 3\n\n**Resources:**\n• **RAINN:** 1-800-656-4673 (24/7 hotline)\n• **National DV Hotline:** 1-800-799-7233\n• **Crisis Text Line:** Text HOME to 741741\n• Local victim advocacy organization\n• Follow-up with PCP or GYN\n\n**Medication follow-up:**\n• Complete doxycycline 7-day course (if STI prophylaxis given)\n• Complete PEP 28-day course (if HIV PEP initiated)\n• Hep B vaccine doses 2 and 3 (if initiated)',
    recommendation: 'Ensure patient leaves with: written follow-up schedule, advocacy contact information, medication instructions, and patient handout. Arrange transportation. Coordinate warm handoff to victim advocacy before discharge.',
    confidence: 'recommended',
    citation: [4, 5, 6, 12, 13],
  },
];

export const DFSA_WORKUP_MODULE_LABELS: string[] = [
  'Initial Assessment',
  'Consent & Safety',
  'Specimen Collection',
  'Drug Panel Selection',
  'SANE & Forensic Exam',
  'Prophylaxis & Disposition',
];

export const DFSA_WORKUP_CITATIONS: Citation[] = [
  { num: 1, text: 'LeBeau MA, Andollo W, Hearn WL, et al. Recommendations for Toxicological Investigations of Drug-Facilitated Sexual Assaults. J Forensic Sci. 2011;56(5):1175-1179.' },
  { num: 2, text: 'Society of Forensic Toxicologists (SOFT) / ANSI ASB Standard 121. Forensic Toxicology Laboratory Guidelines. 2022.' },
  { num: 3, text: 'Du Mont J, Macdonald S, Rotbard N, et al. Drug-Facilitated Sexual Assault in Ontario, Canada: Toxicological and DNA Findings. J Forensic Leg Med. 2010;17(6):333-338.' },
  { num: 4, text: 'Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187.' },
  { num: 5, text: 'ACOG Committee Opinion No. 777. Sexual Assault. Obstet Gynecol. 2019;133(4):e296-e302.' },
  { num: 6, text: 'US Department of Justice, Office on Violence Against Women. A National Protocol for Sexual Assault Medical Forensic Examinations: Adults/Adolescents. 2nd ed. 2013.' },
  { num: 7, text: 'Glassman LW, Lara-Torre E. Emergency Contraception. StatPearls. Updated 2024.' },
  { num: 8, text: 'Violence Against Women Reauthorization Act of 2013, 42 USC §3796gg-4.' },
  { num: 9, text: 'Hurley M, Parker H, Wells DL. The Epidemiology of Drug Facilitated Sexual Assault. J Clin Forensic Med. 2006;13(4):181-185.' },
  { num: 10, text: 'Juhascik MP, Negrusz A, Faugno D, et al. An Estimate of the Proportion of Drug-Facilitation of Sexual Assault in Four U.S. Localities. J Forensic Sci. 2007;52(6):1396-1400.' },
  { num: 11, text: 'Centers for Disease Control and Prevention. Updated Guidelines for Antiretroviral Postexposure Prophylaxis After Sexual, Injection-Drug Use, or Other Nonoccupational Exposure to HIV. 2016 (updated 2025).' },
  { num: 12, text: 'Linden JA. Clinical Practice: Care of the Adult Patient After Sexual Assault. N Engl J Med. 2011;365(9):834-841.' },
  { num: 13, text: 'RAINN (Rape, Abuse & Incest National Network). What to Expect at the Hospital. https://www.rainn.org/articles/rape-kit. 2024.' },
  { num: 14, text: 'American College of Emergency Physicians. Evaluation and Management of the Sexually Assaulted or Sexually Abused Patient. 2nd ed. Dallas, TX: ACEP; 2013.' },
];
