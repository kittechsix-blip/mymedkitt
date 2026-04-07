// MedKitt — Cardiac Arrest Hub
// Scene Assessment → First 2 Minutes → Rhythm Routing → Universal Principles → Reversible Causes → Termination / ROSC
// 6 modules, ~22 nodes. Routes to sub-protocols: VF, PEA, Bradycardic, VT, TdP, Post-ROSC.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const CARDIAC_ARREST_CRITICAL_ACTIONS = [
  { text: 'Confirm arrest in ≤10 sec → CPR immediately', nodeId: 'ca-confirm' },
  { text: 'ETCO2 waveform capnography after airway secured — target >20 mmHg', nodeId: 'ca-universal' },
  { text: 'IO access if no IV within 60 seconds', nodeId: 'ca-access' },
  { text: 'Identify and treat reversible cause at every pulse check with POCUS', nodeId: 'ca-hs-ts' },
  { text: 'Rhythm check every 2 minutes — minimize interruptions <10 sec', nodeId: 'ca-rhythm-check' },
  { text: 'Epi 1mg IV/IO: non-shockable after 1st cycle; shockable after 2nd shock', nodeId: 'ca-epi' },
  { text: 'POCUS only during pulse checks — do not interrupt CPR', nodeId: 'ca-pocus-arrest' },
  { text: 'TOR: ETCO2 <10 after 20 min + adequate CPR + no reversible cause', nodeId: 'ca-tor-criteria' },
];

export const CARDIAC_ARREST_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: SCENE ASSESSMENT / RECOGNITION
  // =====================================================================

  {
    id: 'ca-start',
    type: 'question',
    module: 1,
    title: 'Cardiac Arrest — Scene Assessment',
    body: '[Cardiac Arrest Steps Summary](#/info/ca-steps-summary)\n\n**Scene assessment:** Are there obvious signs of death present that preclude resuscitation?\n\n• Decapitation\n• Hemicorporectomy\n• Dependent lividity\n• Rigor mortis\n• Decomposition\n• Valid DNAR\n• Obviously non-survivable traumatic injury',
    citation: [5, 6],
    options: [
      {
        label: 'Yes — obvious death signs',
        next: 'ca-no-cpr',
      },
      {
        label: 'No — proceed',
        next: 'ca-confirm',
      },
    ],
  },

  {
    id: 'ca-no-cpr',
    type: 'result',
    module: 1,
    title: 'Do NOT Initiate CPR',
    body: '**Do NOT initiate resuscitation** when any of the following are present:\n\n• **Decapitation**\n• **Hemicorporectomy** (transection of the torso)\n• **Dependent lividity** (non-blanching discoloration in dependent areas)\n• **Rigor mortis** (stiffening of joints and muscles)\n• **Decomposition**\n• **Valid DNAR/POLST** — verify document, confirm identity\n• **Obviously non-survivable traumatic injury** (e.g., massive cranial destruction)\n\n[When NOT to Initiate CPR](#/info/ca-no-cpr-criteria)\n\n**Document** findings and time of death. Notify family. Consider organ/tissue donation if applicable.',
    recommendation: 'Document signs of obvious death. Do not initiate CPR. Time of death = time of discovery.',
    confidence: 'definitive',
    citation: [5, 7],
  },

  {
    id: 'ca-confirm',
    type: 'info',
    module: 1,
    title: 'Confirm Cardiac Arrest',
    body: '**Confirm arrest in ≤10 seconds:**\n• No pulse (carotid)\n• No breathing or only agonal gasps\n\n**Begin CPR immediately.** Do not delay for equipment.\n\n**Quick pulse check:** ≤10 seconds. If unsure — start CPR. It is better to perform CPR on a patient with a pulse than to withhold it from a patient without one.\n\n**Activate the team:**\n• Call for defibrillator/AED\n• Assign roles: compressor, airway, timer, medications, recorder\n• Designate a team leader',
    citation: [5, 6],
    next: 'ca-cpr-start',
  },

  // =====================================================================
  // MODULE 2: FIRST 2 MINUTES
  // =====================================================================

  {
    id: 'ca-cpr-start',
    type: 'info',
    module: 2,
    title: 'CPR — First 2 Minutes',
    body: '**High-quality CPR checklist:**\n• **Rate:** 100-120 compressions/min\n• **Depth:** 2-2.4 inches (5-6 cm) in adults\n• **Full recoil** — allow complete chest recoil between compressions\n• **Minimize interruptions** — <10 sec for rhythm checks and shocks\n• **Rotate compressor** every 2 minutes (or sooner if fatigued)\n\n**Monitoring:**\n• Attach waveform **ETCO2 immediately** after airway secured\n• ETCO2 >20 mmHg = adequate CPR quality [1]\n\n**Access:**\n• Attempt large-bore peripheral IV\n• **IO within 60 sec** if no IV — tibial plateau preferred in adults',
    citation: [1, 5, 8],
    next: 'ca-airway',
  },

  {
    id: 'ca-airway',
    type: 'info',
    module: 2,
    title: 'Airway Strategy',
    body: '**Initial airway:**\n• **BVM first** — adequate oxygenation without interrupting compressions\n• Defer intubation early in the resuscitation — CPR quality is the priority\n• OPA/NPA adjuncts as needed\n\n**Advanced airway (when ready):**\n• If intubated → attach **waveform capnography** immediately\n• **Continuous compressions** with advanced airway — no 30:2 cycles\n• Ventilate every 6 seconds (10 breaths/min)\n• Avoid hyperventilation — increases intrathoracic pressure, decreases venous return\n\n**Supraglottic airway** (iGel, King LT) is an acceptable alternative to ETT during CPR [5][6]',
    citation: [5, 6],
    next: 'ca-rhythm-check',
  },

  {
    id: 'ca-rhythm-check',
    type: 'question',
    module: 2,
    title: 'First Rhythm Check',
    body: '**At 2 minutes:** Pause compressions briefly (<10 sec) for rhythm analysis.\n\n**Is the rhythm shockable or non-shockable?**\n\n• **Shockable:** VF (chaotic, no organized QRS) or pulseless VT (wide, regular, fast)\n• **Non-shockable:** PEA (organized rhythm, no pulse) or asystole (flatline — confirm in 2 leads)',
    citation: [5],
    options: [
      {
        label: 'Shockable (VF/pVT)',
        next: 'ca-shockable-branch',
        urgency: 'critical',
      },
      {
        label: 'Non-shockable (PEA/Asystole)',
        next: 'ca-nonshockable-branch',
      },
    ],
  },

  {
    id: 'ca-shockable-branch',
    type: 'question',
    module: 2,
    title: 'Shockable Rhythm — Which Pattern?',
    body: '**Differentiate the shockable rhythm:**\n\n• **VF / Refractory VF:** Chaotic, disorganized electrical activity. No discernible QRS complexes.\n• **Pulseless VT:** Wide-complex, regular, rapid rhythm without a pulse.\n• **Polymorphic VT / Torsades:** Twisting QRS axis, often with prolonged QTc. **Do NOT give amiodarone.**',
    citation: [5, 12, 16],
    options: [
      {
        label: 'VF / Refractory VF',
        next: 'ca-vf-link',
      },
      {
        label: 'Pulseless VT',
        next: 'ca-pvt-link',
      },
      {
        label: 'Polymorphic VT / Torsades',
        next: 'ca-tdp-link',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: RHYTHM ROUTING
  // =====================================================================

  {
    id: 'ca-vf-link',
    type: 'info',
    module: 3,
    title: 'VF Identified',
    body: 'VF identified → proceed to VF/VT Arrest Protocol for shock-first approach, antiarrhythmics, DSD, and ECPR.\n\n[VF/VT Arrest Protocol](#/tree/refractory-vfvt)',
    citation: [5, 12, 16],
    next: 'ca-universal',
  },

  {
    id: 'ca-pvt-link',
    type: 'info',
    module: 3,
    title: 'Pulseless VT Identified',
    body: 'Pulseless VT → check for polymorphic features and QTc.\n\n[Ventricular Tachycardia Protocol](#/tree/ventricular-tachycardia)',
    citation: [5],
    next: 'ca-universal',
  },

  {
    id: 'ca-tdp-link',
    type: 'info',
    module: 3,
    title: 'Torsades de Pointes Identified',
    body: 'Polymorphic VT with prolonged QTc = Torsades de Pointes.\n\n**\u26a0\ufe0f Do NOT give amiodarone** — it prolongs QT and will worsen TdP.\n\n[Torsades de Pointes Protocol](#/tree/torsades-de-pointes)',
    citation: [5, 16],
    next: 'ca-universal',
  },

  {
    id: 'ca-nonshockable-branch',
    type: 'question',
    module: 3,
    title: 'Non-Shockable Rhythm — PEA or Asystole?',
    body: '**Differentiate the non-shockable rhythm:**\n\n• **PEA:** Organized electrical activity on the monitor, but **no palpable pulse**. May have narrow or wide QRS. POCUS at first pulse check is critical — look for cardiac activity and reversible causes.\n• **Asystole / Extreme bradycardia:** Flatline (confirm in 2 leads, check connections) or profoundly slow rate progressing to arrest.',
    citation: [5, 9],
    options: [
      {
        label: 'PEA — organized rhythm, no pulse',
        next: 'ca-pea-link',
      },
      {
        label: 'Asystole / Bradycardic arrest',
        next: 'ca-brady-link',
      },
    ],
  },

  {
    id: 'ca-pea-link',
    type: 'info',
    module: 3,
    title: 'PEA Identified',
    body: 'PEA identified → POCUS at first pulse check is critical. Look for cardiac activity, tamponade, RV dilation, and other reversible causes.\n\n[PEA Arrest Protocol](#/tree/pea-arrest)',
    citation: [2, 9],
    next: 'ca-universal',
  },

  {
    id: 'ca-brady-link',
    type: 'info',
    module: 3,
    title: 'Bradycardic Arrest / Asystole',
    body: 'Extreme bradycardia or asystole → pacing FIRST.\n\nConfirm asystole in 2 leads. Check lead connections. If any organized activity present, consider transcutaneous pacing.\n\n[Bradycardic Arrest Protocol](#/tree/bradycardic-arrest)',
    citation: [5, 6],
    next: 'ca-universal',
  },

  // =====================================================================
  // MODULE 4: UNIVERSAL PRINCIPLES
  // =====================================================================

  {
    id: 'ca-universal',
    type: 'info',
    module: 4,
    title: 'Universal Resuscitation Principles',
    body: '**ETCO2 targets (waveform capnography):**\n• **>20 mmHg** = adequate CPR quality\n• **<10 mmHg after 20 min** = consider termination of resuscitation\n• **Sudden jump >10 mmHg** = likely ROSC — check pulse\n\n**CPR quality optimization:**\n• Use compression feedback device if available\n• Rotate compressor every 2 minutes\n• Minimize interruptions — all pauses <10 sec\n• Real-time ETCO2 as compression quality metric [1][5]\n\n[ETCO\u2082 in Cardiac Arrest](#/info/ca-etco2-guide)',
    citation: [1, 5, 8],
    next: 'ca-access',
  },

  {
    id: 'ca-access',
    type: 'info',
    module: 4,
    title: 'Vascular Access',
    body: '**Access priority (do not delay CPR):**\n1. **Large-bore peripheral IV** — antecubital preferred, follow with 20 mL flush\n2. **External jugular (EJ)** — if peripheral access fails\n3. **IO** — if no IV within 60 seconds\n\n**IO sites:**\n• **Proximal tibia** (tibial plateau) — preferred in adults\n• **Proximal humerus** — alternative, faster drug delivery to central circulation\n• **Distal tibia** — pediatric alternative\n\n**Key:** IO drug delivery is equivalent to IV in cardiac arrest. Do not delay medications for central line placement [5][8].',
    citation: [5, 8],
    next: 'ca-epi',
  },

  {
    id: 'ca-epi',
    type: 'info',
    module: 4,
    title: 'Epinephrine Dosing',
    body: '**[Epinephrine](#/drug/epinephrine/cardiac arrest) 1 mg IV/IO every 3-5 minutes**\n\n**Timing by rhythm:**\n| Rhythm | When to Give |\n|--------|-------------|\n| Non-shockable (PEA/asystole) | After 1st cycle — **give ASAP** |\n| Shockable (VF/pVT) | After 2nd shock |\n\n**Key points:**\n• Follow each dose with 20 mL NS flush\n• **Do NOT use high-dose epinephrine** (Class 3: No Benefit) [5][15]\n• Earlier epi in non-shockable rhythms associated with improved outcomes [15]\n• Continue throughout resuscitation until ROSC or termination',
    citation: [5, 15],
    next: 'ca-hs-ts',
    treatment: {
      firstLine: {
        drug: 'Epinephrine',
        dose: '1 mg IV/IO push',
        route: 'IV/IO',
        frequency: 'Every 3-5 minutes',
        duration: 'Throughout resuscitation',
        notes: 'Non-shockable: after 1st cycle. Shockable: after 2nd shock. High-dose NOT recommended.',
      },
      monitoring: 'Continuous rhythm, ETCO2, pulse checks every 2 min',
    },
  },

  // =====================================================================
  // MODULE 5: REVERSIBLE CAUSES & MEDICATIONS
  // =====================================================================

  {
    id: 'ca-hs-ts',
    type: 'info',
    module: 5,
    title: 'H\'s & T\'s — Reversible Causes',
    body: '**Search for reversible causes at EVERY pulse check.**\n\n**The 5 H\'s:**\n• **Hypoxia** — POCUS: lung sliding, B-lines. Rx: secure airway, FiO2 100%\n• **Hypovolemia** — POCUS: flat IVC, no cardiac activity. Rx: volume, blood\n• **H+ (Acidosis)** — wide QRS, prolonged arrest. Rx: NaHCO3 1-2 mEq/kg\n• **Hypo/HyperK** — peaked T\'s, sine wave (hyperK); flat T\'s, U waves (hypoK). Rx: calcium, insulin/dextrose\n• **Hypothermia** — core temp <30\u00b0C. Rx: active rewarming, prolonged resuscitation\n\n**The 5 T\'s:**\n• **Tension PTX** — POCUS: absent lung sliding. Rx: needle decompression → chest tube\n• **Tamponade** — POCUS: pericardial effusion + RV collapse. Rx: pericardiocentesis\n• **Thrombosis (PE)** — POCUS: RV dilation, McConnell\'s sign. Rx: tPA, surgical/catheter embolectomy\n• **Thrombosis (MI)** — consider emergent cath. Rx: PCI if available\n• **Toxins** — wide QRS (TCA/Na-channel), bradycardia (beta/CCB). Rx: specific antidotes\n\n[H\'s & T\'s Quick Reference](#/info/ca-hs-ts-table)',
    citation: [1, 4, 5, 11],
    next: 'ca-pocus-arrest',
  },

  {
    id: 'ca-pocus-arrest',
    type: 'info',
    module: 5,
    title: 'POCUS in Cardiac Arrest',
    body: '**POCUS during pulse checks ONLY** — do NOT interrupt compressions.\n\n**Timing:** <10 seconds during scheduled pulse/rhythm checks.\n\n**RUSH Exam targets:**\n• **Cardiac activity** — any wall motion? (prognostic)\n• **Tamponade** — pericardial effusion + RV diastolic collapse\n• **RV dilation** — RV:LV >1:1 suggests massive PE\n• **Absent lung sliding** — tension pneumothorax\n• **IVC** — flat/empty suggests hypovolemia\n\n**Prognostic value:**\n• **No cardiac activity** after adequate resuscitation = strong futility signal [4][10][11]\n• Cardiac standstill on initial POCUS: survival <2% in OHCA\n• Organized cardiac activity without pulse: 10-15% survival',
    citation: [4, 10, 11],
    next: 'ca-special-meds',
  },

  {
    id: 'ca-special-meds',
    type: 'info',
    module: 5,
    title: 'Situation-Specific Medications',
    body: '**Beyond epinephrine — give when indicated:**\n\n• **Sodium bicarbonate** 1-2 mEq/kg IV:\n  Wide QRS / TCA toxicity, known hyperkalemia, prolonged arrest, pre-existing metabolic acidosis\n\n• **Calcium** (1g calcium gluconate or 1g calcium chloride IV):\n  Hyperkalemia, calcium channel blocker OD, hypermagnesemia\n\n• **Magnesium sulfate** 2g IV over 1-2 min:\n  Refractory VF, torsades de pointes (polymorphic VT + long QT)\n\n• **Lipid emulsion** (Intralipid 20%) 1.5 mL/kg bolus:\n  Local anesthetic systemic toxicity (LAST)\n\n**Do NOT routinely give NaHCO3 or calcium** — only for specific indications above [5][8].',
    citation: [5, 8],
    next: 'ca-rosc',
  },

  // =====================================================================
  // MODULE 6: TERMINATION / ROSC
  // =====================================================================

  {
    id: 'ca-rosc',
    type: 'result',
    module: 6,
    title: 'ROSC Achieved',
    body: '**ROSC achieved — immediate priorities:**\n\n1. **12-lead ECG** immediately — STEMI? New arrhythmia?\n2. **Avoid hypoxia** — titrate FiO2 to SpO2 92-98% (do not hyperoxgenate)\n3. **Avoid hypotension** — target SBP >90, MAP >65. Vasopressors as needed.\n4. **Waveform capnography** — confirm ETT placement, monitor ventilation\n5. **Targeted temperature management** — initiate per protocol\n6. **Electrolytes** — check and correct K+, Mg2+, Ca2+\n\n**Disposition:** ICU with continuous monitoring.\n\n[Post-Cardiac Arrest Care](#/tree/post-rosc)',
    recommendation: 'Immediate 12-lead ECG, avoid hypoxia and hypotension, initiate TTM, emergent cath if STEMI. ICU admission.',
    confidence: 'definitive',
    citation: [5, 14, 17, 18],
  },

  {
    id: 'ca-tor-criteria',
    type: 'info',
    module: 6,
    title: 'Termination of Resuscitation Criteria',
    body: '**BLS Termination Rule (all must be present):**\n• Arrest not witnessed by EMS\n• No bystander CPR\n• No AED shock delivered\n• No ROSC before transport\n\n**ALS Termination Rule (BLS criteria PLUS):**\n• No ROSC before transport\n• No shocks delivered by EMS\n\n**ETCO2 Guidance:**\n• **ETCO2 <10 mmHg after 20 min** of high-quality CPR → very low survival probability\n• Combined with no cardiac activity on POCUS = near-zero survival [1][3]\n\n**These are guidelines, not mandates.** Clinical judgment supersedes. Consider prolonging resuscitation for: hypothermia, toxin ingestion, young patients, PE (may respond to tPA).\n\n[Termination of Resuscitation](#/info/ca-tor-rules)',
    citation: [1, 3, 5, 13],
    next: 'ca-no-activity',
  },

  {
    id: 'ca-no-activity',
    type: 'info',
    module: 6,
    title: 'No Cardiac Activity on POCUS',
    body: '**No cardiac activity on POCUS after adequate resuscitation = strong futility signal.**\n\nCombined with ETCO2 <10 mmHg after 20 minutes = near-zero survival probability (EMCrit) [1][4][11].\n\n**Before termination, confirm:**\n• Adequate CPR quality maintained (ETCO2 was >20 at some point)\n• All reversible causes considered and treated\n• No hypothermia (warm the patient before declaring death)\n• No toxin ingestion requiring prolonged resuscitation\n• ECPR not available or not indicated\n\nIf all criteria met and team consensus → proceed to termination.',
    citation: [1, 4, 11],
    next: 'ca-code-called',
  },

  {
    id: 'ca-code-called',
    type: 'result',
    module: 6,
    title: 'Code Called — Termination of Resuscitation',
    body: '**Document the resuscitation thoroughly:**\n\n• **Time of arrest** (witnessed or estimated)\n• **Time CPR initiated**\n• **All interventions:** shocks, medications (doses + times), airway management\n• **ETCO2 values** throughout resuscitation\n• **POCUS findings** at each pulse check\n• **Reversible causes** considered and treated\n• **Reasoning for termination**\n• **Time of death**\n\n**Post-termination:**\n• Family notification — in person, with empathy\n• Organ/tissue donation consideration — contact OPO\n• Team debrief — immediate or scheduled\n• Staff wellness check',
    recommendation: 'Document all interventions, ETCO2 values, and reasoning for termination.',
    confidence: 'definitive',
    citation: [5, 7, 13],
  },

];

export const CARDIAC_ARREST_MODULE_LABELS = [
  'Scene Assessment',
  'First 2 Minutes',
  'Rhythm Routing',
  'Universal Principles',
  'Reversible Causes',
  'Termination / ROSC',
];

export const CARDIAC_ARREST_CITATIONS: Citation[] = [
  { num: 1, text: 'EMCrit (Josh Farkas). ACLS protocols, ETCO2-guided resuscitation. emcrit.org.' },
  { num: 2, text: 'IBCC (Internet Book of Critical Care). PEA, post-cardiac arrest care. emcrit.org/ibcc.' },
  { num: 3, text: 'First10EM (Justin Morgenstern). Cardiac arrest pearls. first10em.com.' },
  { num: 4, text: 'Taming the SRU. POCUS in arrest, RUSH exam. tamingthesru.com.' },
  { num: 5, text: 'Panchal AR et al. 2023 AHA Focused Update on ACLS. Circulation. 2023.' },
  { num: 6, text: 'Soar J et al. ERC Guidelines 2021: Advanced Life Support. Resuscitation. 2021;161:115-151.' },
  { num: 7, text: 'Perkins GD et al. ERC Guidelines 2021: Executive Summary. Resuscitation. 2021;161:1-60.' },
  { num: 8, text: 'Neumar RW et al. Part 8: Adult ACLS. Circulation. 2010.' },
  { num: 9, text: 'Littmann L et al. Simplified Teaching Tool for PEA. Med Princ Pract. 2014.' },
  { num: 10, text: 'Breitkreutz R et al. Focused Echo in Life Support. Resuscitation. 2010.' },
  { num: 11, text: 'Driver BE et al. Treatable Causes of Cardiac Arrest by Ultrasound. Resuscitation. 2017.' },
  { num: 12, text: 'Myerburg RJ et al. DSD for Refractory VF. J Am Coll Cardiol. 2019.' },
  { num: 13, text: 'Deakin CD et al. ALS Training and Outcomes. Resuscitation. 2010.' },
  { num: 14, text: 'Dumas F et al. Routine Post-Resuscitation ECG. JACC. 2012.' },
  { num: 15, text: 'Donnino MW et al. Time to Epinephrine and Outcome. JAMA. 2014.' },
  { num: 16, text: 'Kudenchuk PJ et al. Amiodarone, Lidocaine, or Placebo (ALPS). NEJM. 2016.' },
  { num: 17, text: 'Nielsen N et al. TTM at 33\u00b0C vs 36\u00b0C. NEJM. 2013.' },
  { num: 18, text: 'Dankiewicz J et al. TTM2 Trial. NEJM. 2021.' },
];
