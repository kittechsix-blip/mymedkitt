// MedKitt — Fever Without a Source (FWS) in Infants 0–6 Months
// Age-stratified workup → inflammatory markers → risk stratification → treatment → disposition.
// 5 modules: Initial Assessment → Workup → Risk Stratification → Treatment → Disposition
// 36 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PEDS_FEVER_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT (shared nodes)
  // =====================================================================

  {
    id: 'pf-start',
    type: 'question',
    module: 1,
    title: 'Patient Age Group',
    body: '**Fever Without a Source (FWS):** T ≥38°C (100.4°F) rectally in an infant 0–6 months with no identifiable source on history and physical exam.\n\nREFERENCES\n\u2022 [HSV Workup Criteria](#/info/pf-hsv-criteria)\n\u2022 [UTI Risk Factors](#/info/pf-uti-risk)\n\u2022 [Ceftriaxone Contraindications](#/info/pf-ceftriaxone-ci)\n\u2022 [Antimicrobial Dosing](#/info/pf-abx-dosing)\n\nSelect the patient\u2019s age:',
    citation: [1],
    options: [
      {
        label: '0\u201321 Days',
        description: 'Full sepsis workup required \u2014 all neonates admitted',
        next: 'pf-neo-screen',
      },
      {
        label: '22\u201328 Days',
        description: 'Labs + inflammatory markers \u2192 risk stratification',
        next: 'pf-22-screen',
      },
      {
        label: '29\u201360 Days',
        description: 'Inflammatory markers guide LP and disposition',
        next: 'pf-60-screen',
      },
      {
        label: '2\u20136 Months',
        description: 'Source assessment \u2192 PCV status \u2192 UTI screen',
        next: 'pf-6m-screen',
      },
    ],

    summary: 'Age-stratified FWS pathway: rectal T >=38C in 0-6mo with no source; select age group to guide workup intensity',
  },

  {
    id: 'pf-off-pathway',
    type: 'result',
    module: 1,
    title: 'Off-Pathway \u2014 Alternate Management',
    body: 'Patient meets one or more exclusion criteria for the FWS pathway.\n\nEXCLUSION CRITERIA\n\u2022 Preterm (<37 weeks gestational age)\n\u2022 Immunocompromised\n\u2022 Indwelling devices (VP shunt, central line)\n\u2022 Known immune deficiency\n\u2022 Recent hospitalization (within 7 days)\n\u2022 Current antibiotics or recent (<48h)\n\nOFF-PATHWAY TRIGGERS\n\u2022 Focal bacterial infection identified (cellulitis, abscess, pneumonia, osteomyelitis)\n\u2022 Hypothermia (<36°C / 96.8°F)\n\u2022 Bronchiolitis with clear viral syndrome\n\u2022 Clinically ill-appearing (not toxic, but not well)',
    recommendation: 'Manage per condition-specific guidelines. These patients require individualized assessment and may need broader workup than the FWS pathway provides.',
    confidence: 'recommended',
    citation: [1, 9],
  },

  {
    id: 'pf-toxic',
    type: 'result',
    module: 1,
    title: 'Toxic / Ill-Appearing Infant',
    body: 'Ill-appearing infant requires full sepsis workup and empiric antibiotics regardless of age.\n\nFULL SEPSIS WORKUP\n\u2022 CBC with differential\n\u2022 Blood culture\n\u2022 CMP\n\u2022 UA + urine culture (catheterized)\n\u2022 Lumbar puncture: CSF cell count, glucose, protein, Gram stain, culture, meningitis/encephalitis PCR panel\n\u2022 Consider: CRP, Procalcitonin, stool culture (if diarrhea)\n\u2022 Consider: [HSV workup](#/info/pf-hsv-criteria) if <21 days or risk factors\n\nEMPIRIC ANTIBIOTICS BY AGE\n\u2022 **0\u20137 days:** [Ampicillin](#/drug/ampicillin) + [Gentamicin](#/drug/gentamicin)\n\u2022 **8\u201328 days:** [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) (or [Cefepime](#/drug/cefepime) if [CI](#/info/pf-ceftriaxone-ci)) + [Ampicillin](#/drug/ampicillin)\n\u2022 **29\u201360 days:** [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) + [Vancomycin](#/drug/vancomycin)\n\u2022 **>60 days:** [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) + [Vancomycin](#/drug/vancomycin)\n\nSee [Antimicrobial Dosing Reference](#/info/pf-abx-dosing) for weight-based doses.',
    images: [{ src: 'images/peds-fever/meningococcemia-purpura.jpg', alt: 'Non-blanching petechial and purpuric rash characteristic of meningococcemia on hand and wrist', caption: 'Meningococcemia purpura — non-blanching petechiae/purpura in a febrile child require immediate antibiotics before LP. Never delay treatment for rash with fever. (Public domain)' }],
    recommendation: 'ADMIT to inpatient or PICU. Full sepsis workup with age-appropriate empiric antibiotics. Add [Acyclovir](#/drug/acyclovir) if <21 days or HSV risk factors.',
    confidence: 'definitive',
    citation: [1, 2, 5],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone + Vancomycin',
        dose: 'Ceftriaxone 50 mg/kg (max 2g); Vancomycin 15 mg/kg',
        route: 'IV',
        frequency: 'Ceftriaxone q24h; Vancomycin q6h',
        duration: 'Pending culture results (typically 7-14 days)',
        notes: 'For age >28 days. See body for age-specific regimens.',
      },
      alternative: {
        drug: 'Ampicillin + Gentamicin',
        dose: 'Ampicillin 50 mg/kg; Gentamicin 4 mg/kg',
        route: 'IV',
        frequency: 'Ampicillin q8h; Gentamicin q24h',
        duration: 'Pending culture results',
        notes: 'For age 0-7 days',
      },
      monitoring: 'Blood cultures at 24-36h. Vancomycin trough before 4th dose (goal 15-20 mcg/mL). Renal function with aminoglycosides.',
    },
  },

  // =====================================================================
  // 0–21 DAY PATHWAY (8 nodes)
  // =====================================================================

  {
    id: 'pf-neo-screen',
    type: 'question',
    module: 1,
    title: '0\u201321 Days: Pathway Screening',
    body: 'Does the infant have any of the following off-pathway triggers?\n\n\u2022 Focal bacterial infection (cellulitis, abscess, pneumonia, osteomyelitis)\n\u2022 Hypothermia (<36°C / 96.8°F)\n\u2022 Bronchiolitis with clear viral syndrome\n\u2022 Clinically ill-appearing',
    citation: [1],
    options: [
      {
        label: 'Yes \u2014 Off-pathway trigger present',
        next: 'pf-off-pathway',
      },
      {
        label: 'No \u2014 Well-appearing, no focal source',
        next: 'pf-neo-labs',
        urgency: 'urgent',
      },
    ],

    summary: 'Screen for focal infection, hypothermia, bronchiolitis, or ill appearance before applying FWS pathway',
  },

  {
    id: 'pf-neo-labs',
    type: 'info',
    module: 2,
    title: 'Order Full Sepsis Workup',
    body: '**All 0\u201321 day neonates require full sepsis workup including LP.**\n\nLABS TO ORDER\n\u2022 CBC with differential\n\u2022 Blood culture\n\u2022 CMP\n\u2022 UA (catheterized) \u2014 if positive, send urine culture\n\u2022 Lumbar puncture:\n  \u2013 CSF cell count with differential\n  \u2013 CSF glucose, protein\n  \u2013 CSF Gram stain\n  \u2013 CSF culture\n  \u2013 Meningitis/encephalitis PCR panel\n  \u2013 Hold tube #4 (for HSV PCR if needed)\n\nOPTIONAL\n\u2022 CRP, Procalcitonin\n\u2022 Stool culture (if diarrhea present)',
    citation: [1, 2],
    next: 'pf-neo-hsv',

    summary: 'All 0-21d neonates: full sepsis workup with LP mandatory; CBC, blood culture, CMP, cath UA, CSF studies, hold tube 4',
  },

  {
    id: 'pf-neo-hsv',
    type: 'question',
    module: 3,
    title: 'HSV Workup Indicated?',
    body: 'Does the infant have [HSV risk factors or clinical features](#/info/pf-hsv-criteria)?\n\n\u2022 Skin vesicles (mouth, scalp, trunk)\n\u2022 Seizures\n\u2022 Lethargy, poor feeding\n\u2022 Hepatosplenomegaly\n\u2022 Thrombocytopenia or transaminitis\n\u2022 CSF pleocytosis\n\u2022 Maternal HSV history',
    citation: [1, 3],
    options: [
      {
        label: 'Yes \u2014 HSV risk factors present',
        description: 'Add Acyclovir and order HSV labs',
        next: 'pf-neo-hsv-rx',
        urgency: 'urgent',
      },
      {
        label: 'No \u2014 No HSV risk factors',
        description: 'Proceed to empiric antibiotics',
        next: 'pf-neo-age',
      },
    ],

    summary: 'HSV red flags: vesicles, seizures, lethargy, hepatosplenomegaly, thrombocytopenia, transaminitis, CSF pleocytosis',
    safetyLevel: 'critical',
  },

  {
    id: 'pf-neo-hsv-rx',
    type: 'info',
    module: 3,
    title: 'Add HSV Coverage',
    body: '**Add [Acyclovir](#/drug/acyclovir) 20 mg/kg IV q8h**\n\nHSV TESTING TO ORDER\n\u2022 HSV PCR \u2014 blood (plasma)\n\u2022 HSV PCR \u2014 CSF (from held tube #4)\n\u2022 Surface cultures: conjunctiva, throat, nasopharynx, rectum\n\u2022 Vesicle fluid: viral culture + PCR (if lesions present)\n\u2022 AST, ALT (hepatic involvement screen)\n\nDURATION\n\u2022 Minimum 5 doses or until HSV PCR results negative\n\u2022 If PCR not resulted after 5 doses \u2192 contact Infectious Disease\n\u2022 Ensure adequate hydration (crystalline nephropathy risk)',
    citation: [1, 3],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    next: 'pf-neo-age',

    summary: 'Acyclovir 20 mg/kg IV q8h; order HSV PCR blood + CSF, surface cultures; minimum 5 doses or until PCR negative',
    safetyLevel: 'critical',
  },

  {
    id: 'pf-neo-age',
    type: 'question',
    module: 4,
    title: 'Empiric Antibiotics by Age',
    body: 'Select the neonate\u2019s age to determine the appropriate empiric regimen.\n\nSee [Antimicrobial Dosing Reference](#/info/pf-abx-dosing) for complete dosing table.',
    citation: [1],
    options: [
      {
        label: '0\u20137 Days',
        description: 'Ampicillin 50 mg/kg IV q8h + Gentamicin 4 mg/kg IV q24h',
        next: 'pf-neo-csf',
      },
      {
        label: '8\u201321 Days',
        description: 'Ceftriaxone 50 mg/kg IV q24h (Cefepime if CI)',
        next: 'pf-neo-csf',
      },
    ],

    summary: 'Age-specific empiric abx: 0-7d ampicillin+gentamicin; 8-21d ceftriaxone (cefepime if contraindicated)',
  },

  {
    id: 'pf-neo-csf',
    type: 'question',
    module: 4,
    title: 'CSF Pleocytosis?',
    body: 'Review CSF results from the lumbar puncture.\n\n**ABNORMAL CSF (0\u201328 days):**\n\u2022 WBC >15 cells/mm\u00b3\n\u2022 Positive Gram stain\n\u2022 Traumatic tap or uninterpretable\n\nNote: Traumatic taps are common in neonates. If bloody, use correction ratio or treat as if abnormal.',
    citation: [1, 10],
    options: [
      {
        label: 'Abnormal / Traumatic / Uninterpretable',
        description: 'WBC >15, positive Gram stain, or cannot interpret',
        next: 'pf-neo-mening',
        urgency: 'urgent',
      },
      {
        label: 'Normal CSF',
        description: 'WBC \u226415, negative Gram stain',
        next: 'pf-neo-admit',
      },
    ],

    summary: 'CSF abnormal if WBC >15 or positive Gram stain; traumatic taps common in neonates — treat as abnormal if uninterpretable',
  },

  {
    id: 'pf-neo-mening',
    type: 'info',
    module: 4,
    title: 'Meningitis Protocol',
    body: '**Escalate to meningitic dosing based on age:**\n\n**0\u20137 DAYS**\n\u2022 [Ampicillin](#/drug/ampicillin) 100 mg/kg IV q8h (meningitic dose)\n\u2022 Add [Cefepime](#/drug/cefepime) 50 mg/kg IV q12h\n\u2022 Discontinue [Gentamicin](#/drug/gentamicin)\n\u2022 Consider [Acyclovir](#/drug/acyclovir) if not already started\n\n**8\u201321 DAYS**\n\u2022 [Ceftriaxone](#/drug/ceftriaxone/pediatric meningitis) 50 mg/kg IV q12h (meningitic dose)\n\u2022 Add [Ampicillin](#/drug/ampicillin) 75 mg/kg IV q6h (meningitic dose)\n\u2022 Consider [Acyclovir](#/drug/acyclovir) if not already started\n\nSee [Antimicrobial Dosing Reference](#/info/pf-abx-dosing) for complete dosing.',
    citation: [1, 6],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    next: 'pf-neo-admit',

    summary: 'Escalate to meningitic dosing; 0-7d: ampicillin 100 mg/kg + cefepime; 8-21d: ceftriaxone q12h + ampicillin q6h',
    safetyLevel: 'critical',
  },

  {
    id: 'pf-neo-admit',
    type: 'result',
    module: 5,
    title: 'Admit \u2014 Await Cultures',
    body: '**ALL 0\u201321 day neonates are admitted** regardless of clinical appearance or lab results.\n\nINPATIENT MANAGEMENT\n\u2022 Continue empiric antibiotics pending culture results\n\u2022 Blood cultures: finalized at 24\u201336 hours\n\u2022 CSF cultures: finalized at 48\u201372 hours\n\nIF PATHOGEN IDENTIFIED\n\u2022 Narrow antibiotics to targeted therapy\n\u2022 Duration based on organism and site\n\nIF NO PATHOGEN AT 24\u201336 HOURS + WELL-APPEARING\n\u2022 Discontinue antimicrobials\n\u2022 Observe for clinical stability\n\u2022 Manage supportively for duration of illness',
    recommendation: 'Admit to inpatient. Continue age-appropriate empiric antibiotics. If cultures negative at 24\u201336h and infant is well-appearing, discontinue antibiotics.',
    confidence: 'definitive',
    citation: [1, 5, 7],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone + Ampicillin',
        dose: 'Ceftriaxone 50 mg/kg (max 2g); Ampicillin 50 mg/kg',
        route: 'IV',
        frequency: 'Ceftriaxone q24h; Ampicillin q8h',
        duration: 'Until cultures negative at 24-36h, then discontinue',
        notes: 'For age 8-21 days. Age 0-7 days: Ampicillin + Gentamicin instead.',
      },
      alternative: {
        drug: 'Cefepime + Ampicillin',
        dose: 'Cefepime 50 mg/kg; Ampicillin 50 mg/kg',
        route: 'IV',
        frequency: 'Cefepime q12h; Ampicillin q8h',
        duration: 'Until cultures negative at 24-36h',
        notes: 'Use if ceftriaxone contraindicated (jaundice, hyperbilirubinemia)',
      },
      monitoring: 'Blood cultures finalized at 24-36h. CSF cultures at 48-72h. Daily clinical assessment.',
    }
  },

  // =====================================================================
  // 22–28 DAY PATHWAY (9 nodes)
  // =====================================================================

  {
    id: 'pf-22-screen',
    type: 'question',
    module: 1,
    title: '22\u201328 Days: Pathway Screening',
    body: 'Does the infant have any of the following off-pathway triggers?\n\n\u2022 Focal bacterial infection identified\n\u2022 Hypothermia (<36°C / 96.8°F)\n\u2022 Bronchiolitis with clear viral syndrome\n\u2022 Clinically ill-appearing',
    citation: [1],
    options: [
      {
        label: 'Yes \u2014 Off-pathway trigger present',
        next: 'pf-off-pathway',
      },
      {
        label: 'No \u2014 Well-appearing, no focal source',
        next: 'pf-22-labs',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'pf-22-labs',
    type: 'info',
    module: 2,
    title: 'Order Labs + Inflammatory Markers',
    body: 'LABS TO ORDER\n\u2022 CBC with differential\n\u2022 Blood culture\n\u2022 CMP\n\u2022 **Procalcitonin (PCT)**\n\u2022 UA (catheterized) \u2014 if positive, send urine culture\n\nOPTIONAL\n\u2022 CRP\n\u2022 Stool culture (if diarrhea present)\n\nLP is not automatically required for this age group \u2014 it depends on inflammatory marker results and shared decision-making.',
    citation: [1, 4],
    next: 'pf-22-im',

    summary: 'CBC, blood culture, CMP, procalcitonin, cath UA; LP depends on inflammatory markers and shared decision-making',
  },

  {
    id: 'pf-22-im',
    type: 'question',
    module: 3,
    title: 'Inflammatory Markers',
    body: 'Are ANY of the following inflammatory markers abnormal?\n\n**ABNORMAL CRITERIA:**\n\u2022 Temperature >38.5°C (101.3°F)\n\u2022 Procalcitonin >0.5 ng/mL\n\u2022 CRP >2.0 mg/dL\n\u2022 ANC >4,000 cells/mm\u00b3\n\nAny single abnormal marker \u2192 higher risk.\nAll normal \u2192 lower risk but still requires evaluation.',
    citation: [1, 4, 9],
    options: [
      {
        label: 'Abnormal \u2014 \u22651 marker elevated',
        description: 'Higher risk \u2014 LP recommended',
        next: 'pf-22-lp',
        urgency: 'urgent',
      },
      {
        label: 'All Normal',
        description: 'Lower risk \u2014 LP is shared decision',
        next: 'pf-22-lp',
      },
    ],

    summary: 'Abnormal: T >38.5, PCT >0.5, CRP >2.0, ANC >4000; any single abnormal marker indicates higher risk',
  },

  {
    id: 'pf-22-lp',
    type: 'question',
    module: 3,
    title: 'LP & CSF Results',
    body: 'Lumbar puncture is recommended if inflammatory markers are abnormal. For normal markers, LP is a shared decision with the family.\n\n**ABNORMAL CSF (22\u201328 days):**\n\u2022 WBC >15 cells/mm\u00b3\n\u2022 Positive Gram stain',
    citation: [1, 10],
    options: [
      {
        label: 'CSF Pleocytosis / Traumatic / Uninterpretable',
        description: 'WBC >15, positive Gram stain, or cannot interpret',
        next: 'pf-22-mening',
        urgency: 'urgent',
      },
      {
        label: 'CSF Normal',
        description: 'WBC \u226415, negative Gram stain',
        next: 'pf-22-ua',
      },
      {
        label: 'LP Not Performed / Not Obtained',
        description: 'Shared decision \u2014 LP deferred',
        next: 'pf-22-dispo',
      },
    ],

    summary: 'LP recommended if markers abnormal; shared decision if normal; CSF abnormal if WBC >15 or positive Gram stain',
  },

  {
    id: 'pf-22-mening',
    type: 'result',
    module: 4,
    title: 'Meningitis Protocol \u2014 ADMIT',
    body: '**MENINGITIS DOSING (22\u201328 DAYS)**\n\u2022 [Ceftriaxone](#/drug/ceftriaxone/pediatric meningitis) 50 mg/kg IV q12h (meningitic dose)\n\u2022 Add [Ampicillin](#/drug/ampicillin) 75 mg/kg IV q6h (meningitic dose)\n\u2022 Consider [Acyclovir](#/drug/acyclovir) 20 mg/kg IV q8h if HSV risk factors\n\nSee [Antimicrobial Dosing Reference](#/info/pf-abx-dosing) for complete dosing.',
    recommendation: 'ADMIT. Start meningitic-dose antibiotics immediately. Consider HSV coverage. Repeat LP in 24\u201348h if organism identified to document sterilization.',
    confidence: 'definitive',
    citation: [1, 6],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone + Ampicillin',
        dose: 'Ceftriaxone 50 mg/kg (max 2g); Ampicillin 75 mg/kg',
        route: 'IV',
        frequency: 'Ceftriaxone q12h (meningitic); Ampicillin q6h (meningitic)',
        duration: 'Minimum 14-21 days depending on organism',
        notes: 'Meningitic dosing with increased frequency',
      },
      pcnAllergy: {
        drug: 'Ceftriaxone + Vancomycin',
        dose: 'Ceftriaxone 50 mg/kg; Vancomycin 15 mg/kg',
        route: 'IV',
        frequency: 'Ceftriaxone q12h; Vancomycin q6h',
        duration: 'Minimum 14-21 days',
        notes: 'For penicillin allergy; add Acyclovir if HSV risk',
      },
      monitoring: 'Repeat LP in 24-48h if organism identified. Vancomycin trough goal 15-20 mcg/mL if used.',
    },
  },

  {
    id: 'pf-22-ua',
    type: 'question',
    module: 3,
    title: 'UA Results',
    body: 'Review the [urinalysis results](#/info/pf-ua-interpret).\n\n**Positive UA:** Leukocyte esterase, nitrites, >5 WBC/hpf, or bacteria on Gram stain.\n\nIf UA positive, ensure catheterized urine culture was sent.',
    citation: [1, 8],
    options: [
      {
        label: 'UA Positive',
        description: 'Likely UTI \u2014 start IV antibiotics',
        next: 'pf-22-uti',
      },
      {
        label: 'UA Negative',
        description: 'No UTI \u2014 proceed to disposition',
        next: 'pf-22-sdm',
      },
    ],
  },

  {
    id: 'pf-22-uti',
    type: 'result',
    module: 4,
    title: 'UTI \u2014 Admit for IV Antibiotics',
    body: '**ANTIBIOTIC TREATMENT**\n\u2022 [Cefazolin](#/drug/cefazolin) 17 mg/kg IV q8h (without bacteremia)\n\u2022 [Cefazolin](#/drug/cefazolin) 33 mg/kg IV q8h (with concurrent bacteremia)\n\u2022 Step-down to [Cephalexin](#/drug/cephalexin) 17 mg/kg PO TID when tolerating PO\n\u2022 Total duration: 10 days (IV + PO combined)\n\nADMIT for IV antibiotics and monitoring.',
    recommendation: 'ADMIT. Start IV [Cefazolin](#/drug/cefazolin/pediatric UTI). Step down to oral [Cephalexin](#/drug/cephalexin/pediatric UTI) when tolerating PO and clinically improving. Total 10-day course.',
    confidence: 'definitive',
    citation: [1, 8],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Cefazolin',
        dose: '17 mg/kg (33 mg/kg if bacteremia)',
        route: 'IV',
        frequency: 'q8h',
        duration: '10 days total (IV + oral combined)',
        notes: 'Step down to oral Cephalexin when tolerating PO',
      },
      alternative: {
        drug: 'Cephalexin',
        dose: '17 mg/kg',
        route: 'PO',
        frequency: 'TID',
        duration: '10 days total',
        notes: 'Oral step-down from IV Cefazolin',
      },
      monitoring: 'Urine culture results. Clinical improvement within 48-72h. Renal function.',
    }
  },

  {
    id: 'pf-22-sdm',
    type: 'question',
    module: 5,
    title: 'Shared Decision: Disposition',
    body: 'Normal CSF and negative UA. Disposition depends on inflammatory marker status and shared decision-making with the family.\n\n**IF ABNORMAL INFLAMMATORY MARKERS:**\nHigher risk \u2014 admission preferred. If family elects home observation:\n\u2022 [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) 50 mg/kg IM/IV x1 before discharge\n\u2022 Mandatory follow-up in 24 hours\n\n**IF NORMAL INFLAMMATORY MARKERS:**\nLower risk \u2014 home observation is reasonable.\n\u2022 Antibiotics optional (prefer off antibiotics)\n\u2022 Follow-up in 24 hours',
    citation: [1, 4, 9],
    options: [
      {
        label: 'Observe at Home',
        description: 'Family comfortable, follow-up confirmed',
        next: 'pf-22-dispo',
      },
      {
        label: 'Admit for Observation',
        description: 'Family preference or social concerns',
        next: 'pf-22-dispo',
      },
    ],
  },

  {
    id: 'pf-22-dispo',
    type: 'result',
    module: 5,
    title: 'Disposition',
    body: '**IF DISCHARGED HOME**\n\u2022 Review [Discharge Criteria](#/info/pf-discharge) \u2014 all must be met\n\u2022 Consider [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) 50 mg/kg IM/IV x1 if inflammatory markers abnormal\n\u2022 Mandatory PCP or ED follow-up within 24 hours\n\u2022 Provide [Return Precautions](#/info/pf-discharge)\n\u2022 Culture callback: blood culture results at 24\u201336h\n\n**IF ADMITTED**\n\u2022 Continue observation\n\u2022 If abnormal inflammatory markers: may give [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) 50 mg/kg IV q24h\n\u2022 If normal inflammatory markers: prefer off antibiotics, discuss close observation\n\u2022 Culture results at 24\u201336h determine next steps\n\n**IF LP NOT PERFORMED**\n\u2022 Abnormal inflammatory markers: recommend admission, prefer off antibiotics but may give Ceftriaxone\n\u2022 Normal inflammatory markers: home observation reasonable with 24h follow-up',
    recommendation: 'Disposition based on inflammatory marker status and shared decision-making. Ensure 24-hour follow-up regardless of disposition. Culture callback system in place.',
    confidence: 'recommended',
    citation: [1, 4, 7, 9],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone',
        dose: '50 mg/kg (max 2g)',
        route: 'IM/IV',
        frequency: 'x1 dose (if discharging with abnormal inflammatory markers)',
        duration: 'Single dose',
        notes: 'Give before discharge if inflammatory markers abnormal. May give q24h if admitted.',
      },
      monitoring: 'Culture callback at 24-36h. Mandatory 24-hour follow-up.',
    }
  },

  // =====================================================================
  // 29–60 DAY PATHWAY (9 nodes)
  // =====================================================================

  {
    id: 'pf-60-screen',
    type: 'question',
    module: 1,
    title: '29\u201360 Days: Pathway Screening',
    body: 'Does the infant have any of the following off-pathway triggers?\n\n\u2022 Focal bacterial infection identified\n\u2022 Hypothermia (<36°C / 96.8°F)\n\u2022 Bronchiolitis with clear viral syndrome\n\u2022 Clinically ill-appearing',
    citation: [1],
    options: [
      {
        label: 'Yes \u2014 Off-pathway trigger present',
        next: 'pf-off-pathway',
      },
      {
        label: 'No \u2014 Well-appearing, no focal source',
        next: 'pf-60-labs',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'pf-60-labs',
    type: 'info',
    module: 2,
    title: 'Order Labs',
    body: 'LABS TO ORDER\n\u2022 CBC with differential\n\u2022 Blood culture\n\u2022 CMP\n\u2022 **Procalcitonin (PCT)**\n\u2022 UA (catheterized) \u2014 if positive, send urine culture\n\nOPTIONAL\n\u2022 CRP\n\u2022 Stool culture (if diarrhea present)\n\nLP is determined by inflammatory marker results.',
    citation: [1, 4],
    next: 'pf-60-im',

    summary: 'CBC, blood culture, CMP, procalcitonin, cath UA; LP determined by inflammatory marker results',
  },

  {
    id: 'pf-60-im',
    type: 'question',
    module: 3,
    title: 'Inflammatory Markers',
    body: 'Are ANY of the following inflammatory markers abnormal?\n\n**ABNORMAL CRITERIA:**\n\u2022 Temperature >38.5°C (101.3°F)\n\u2022 Procalcitonin >0.5 ng/mL\n\u2022 CRP >2.0 mg/dL\n\u2022 ANC >4,000 cells/mm\u00b3\n\nAny single abnormal marker \u2192 higher risk \u2192 LP recommended.\nAll normal \u2192 lower risk \u2192 no LP needed.',
    citation: [1, 4, 9],
    options: [
      {
        label: 'Abnormal \u2014 \u22651 marker elevated',
        description: 'Higher risk \u2014 perform LP',
        next: 'pf-60-lp',
        urgency: 'urgent',
      },
      {
        label: 'All Normal',
        description: 'Lower risk \u2014 no LP needed',
        next: 'pf-60-low',
      },
    ],

    summary: 'Same criteria: T >38.5, PCT >0.5, CRP >2.0, ANC >4000; abnormal = LP recommended; all normal = no LP needed',
  },

  {
    id: 'pf-60-lp',
    type: 'question',
    module: 3,
    title: 'LP & CSF Results',
    body: 'Lumbar puncture recommended for elevated inflammatory markers.\n\n**ABNORMAL CSF (29\u201360 days):**\n\u2022 WBC >9 cells/mm\u00b3 (lower threshold than 0\u201328 days)\n\u2022 Positive Gram stain',
    citation: [1, 10],
    options: [
      {
        label: 'CSF Pleocytosis / Traumatic / Uninterpretable',
        description: 'WBC >9, positive Gram stain, or cannot interpret',
        next: 'pf-60-mening',
        urgency: 'urgent',
      },
      {
        label: 'CSF Normal',
        description: 'WBC \u22649, negative Gram stain',
        next: 'pf-60-ua',
      },
    ],

    summary: 'Lower CSF threshold for 29-60d: WBC >9 (vs >15 for 0-28d); positive Gram stain always abnormal',
  },

  {
    id: 'pf-60-mening',
    type: 'result',
    module: 4,
    title: 'Meningitis \u2014 ADMIT',
    body: '**MENINGITIS DOSING (29\u201360 DAYS)**\n\u2022 [Ceftriaxone](#/drug/ceftriaxone/pediatric meningitis) 50 mg/kg IV q12h (meningitic dose)\n\u2022 Add [Vancomycin](#/drug/vancomycin) 15 mg/kg IV q6h\n\u2022 Consider [Acyclovir](#/drug/acyclovir) 20 mg/kg IV q8h if HSV risk factors\n\nNote: [Vancomycin](#/drug/vancomycin) added (instead of [Ampicillin](#/drug/ampicillin)) to cover MRSA and resistant GBS/pneumococcus in this age group.\n\nSee [Antimicrobial Dosing Reference](#/info/pf-abx-dosing) for complete dosing.',
    recommendation: 'ADMIT. Start meningitic-dose [Ceftriaxone](#/drug/ceftriaxone/pediatric meningitis) + [Vancomycin](#/drug/vancomycin/pediatric meningitis). Consider HSV coverage. Obtain Vancomycin trough before 4th dose (goal 15\u201320 mcg/mL).',
    confidence: 'definitive',
    citation: [1, 6],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone + Vancomycin',
        dose: 'Ceftriaxone 50 mg/kg (max 2g); Vancomycin 15 mg/kg',
        route: 'IV',
        frequency: 'Ceftriaxone q12h (meningitic); Vancomycin q6h',
        duration: 'Minimum 14-21 days depending on organism',
        notes: 'Vancomycin replaces Ampicillin to cover MRSA and resistant organisms',
      },
      pcnAllergy: {
        drug: 'Meropenem + Vancomycin',
        dose: 'Meropenem 40 mg/kg; Vancomycin 15 mg/kg',
        route: 'IV',
        frequency: 'Meropenem q8h; Vancomycin q6h',
        duration: 'Minimum 14-21 days',
        notes: 'For severe beta-lactam allergy; ID consult recommended',
      },
      monitoring: 'Vancomycin trough before 4th dose (goal 15-20 mcg/mL). Repeat LP in 24-48h if organism identified.',
    },
  },

  {
    id: 'pf-60-ua',
    type: 'question',
    module: 3,
    title: 'UA Results',
    body: 'Review the [urinalysis results](#/info/pf-ua-interpret).\n\n**Positive UA:** Leukocyte esterase, nitrites, >5 WBC/hpf, or bacteria on Gram stain.\n\nIf UA positive, ensure catheterized urine culture was sent.',
    citation: [1, 8],
    options: [
      {
        label: 'UA Positive',
        description: 'Likely UTI \u2014 start IV antibiotics',
        next: 'pf-60-uti',
      },
      {
        label: 'UA Negative',
        description: 'No UTI \u2014 proceed to disposition',
        next: 'pf-60-sdm',
      },
    ],
  },

  {
    id: 'pf-60-uti',
    type: 'result',
    module: 4,
    title: 'UTI \u2014 Admit for IV Antibiotics',
    body: '**ANTIBIOTIC TREATMENT**\n\u2022 [Cefazolin](#/drug/cefazolin) 17 mg/kg IV q8h (without bacteremia)\n\u2022 [Cefazolin](#/drug/cefazolin) 33 mg/kg IV q8h (with concurrent bacteremia)\n\u2022 Step-down to [Cephalexin](#/drug/cephalexin) 17 mg/kg PO TID when tolerating PO\n\u2022 Total duration: 10 days (IV + PO combined)\n\nADMIT for IV antibiotics and monitoring.',
    recommendation: 'ADMIT. Start IV [Cefazolin](#/drug/cefazolin/pediatric UTI). Step down to oral [Cephalexin](#/drug/cephalexin/pediatric UTI) when tolerating PO and clinically improving. Total 10-day course.',
    confidence: 'definitive',
    citation: [1, 8],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Cefazolin',
        dose: '17 mg/kg (33 mg/kg if bacteremia)',
        route: 'IV',
        frequency: 'q8h',
        duration: '10 days total (IV + oral combined)',
        notes: 'Step down to oral Cephalexin when tolerating PO',
      },
      alternative: {
        drug: 'Cephalexin',
        dose: '17 mg/kg',
        route: 'PO',
        frequency: 'TID',
        duration: '10 days total',
        notes: 'Oral step-down from IV Cefazolin',
      },
      monitoring: 'Urine culture results. Clinical improvement within 48-72h. Renal function.',
    }
  },

  {
    id: 'pf-60-sdm',
    type: 'question',
    module: 5,
    title: 'Shared Decision: Disposition',
    body: 'Abnormal inflammatory markers but normal CSF and negative UA.\n\n\u2022 [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) 50 mg/kg IM/IV x1 recommended\n\u2022 Home observation with mandatory 24-hour follow-up\n\u2022 OR admit for observation',
    citation: [1, 4, 9],
    options: [
      {
        label: 'Observe at Home',
        description: 'Ceftriaxone x1 + 24h follow-up',
        next: 'pf-60-dispo',
      },
      {
        label: 'Admit for Observation',
        description: 'Family preference or social concerns',
        next: 'pf-60-dispo',
      },
    ],
  },

  {
    id: 'pf-60-dispo',
    type: 'result',
    module: 5,
    title: 'Disposition \u2014 High Risk',
    body: '**IF DISCHARGED HOME**\n\u2022 Review [Discharge Criteria](#/info/pf-discharge) \u2014 all must be met\n\u2022 [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) 50 mg/kg IM/IV x1 before discharge\n\u2022 Mandatory PCP or ED follow-up within 24 hours\n\u2022 Provide [Return Precautions](#/info/pf-discharge)\n\u2022 Culture callback: blood culture results at 24\u201336h\n\n**IF ADMITTED**\n\u2022 [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) 50 mg/kg IV q24h\n\u2022 Monitor for clinical deterioration\n\u2022 Culture results at 24\u201336h determine next steps',
    recommendation: 'Disposition based on shared decision-making. Give [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) x1 if discharging. Ensure 24-hour follow-up and culture callback system.',
    confidence: 'recommended',
    citation: [1, 4, 7, 9],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone',
        dose: '50 mg/kg (max 2g)',
        route: 'IM/IV',
        frequency: 'x1 dose before discharge; q24h if admitted',
        duration: 'Single dose if discharged; continue until cultures at 24-36h if admitted',
        notes: 'Required before discharge for high-risk patients',
      },
      monitoring: 'Culture callback at 24-36h. Mandatory 24-hour follow-up. Monitor for clinical deterioration.',
    }
  },

  {
    id: 'pf-60-low',
    type: 'result',
    module: 5,
    title: 'Low Risk \u2014 Disposition',
    body: 'All inflammatory markers normal \u2192 low risk for serious bacterial infection. No LP needed.\n\n**UA POSITIVE?**\n\u2022 If UA positive: [Cephalexin](#/drug/cephalexin) 17 mg/kg PO TID x 10 days + home\n\u2022 Ensure catheterized urine culture was sent\n\n**UA NEGATIVE?**\n\u2022 No antibiotics needed\n\u2022 Home observation with follow-up\n\n**DISCHARGE REQUIREMENTS**\n\u2022 Review [Discharge Criteria](#/info/pf-discharge)\n\u2022 PCP or ED follow-up within 24 hours\n\u2022 Provide [Return Precautions](#/info/pf-discharge)\n\u2022 Culture callback: blood culture results at 24\u201336h',
    recommendation: 'Low risk for SBI. If UTI: oral Cephalexin and home. If no UTI: no antibiotics, home observation with 24-hour follow-up.',
    confidence: 'recommended',
    citation: [1, 4, 7, 9],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Cephalexin',
        dose: '17 mg/kg',
        route: 'PO',
        frequency: 'TID',
        duration: '10 days',
        notes: 'Only if UA positive (UTI). No antibiotics if UA negative.',
      },
      monitoring: 'Urine culture results if UA positive. Culture callback at 24-36h. 24-hour follow-up.',
    }
  },

  // =====================================================================
  // 2–6 MONTH PATHWAY (6 nodes)
  // =====================================================================

  {
    id: 'pf-6m-screen',
    type: 'question',
    module: 1,
    title: '2\u20136 Months: Initial Assessment',
    body: '**Temperature threshold: \u226539°C (102.2°F) or <36°C**\n\nAssess the infant for source of fever:',
    citation: [1],
    options: [
      {
        label: 'Focal Bacterial Infection',
        description: 'Cellulitis, abscess, pneumonia, osteomyelitis, etc.',
        next: 'pf-6m-focal',
      },
      {
        label: 'Defined Viral Syndrome',
        description: 'Croup, bronchiolitis, stomatitis, influenza, varicella',
        next: 'pf-6m-viral',
      },
      {
        label: 'No Source Identified (FWAS)',
        description: 'Fever without an apparent source',
        next: 'pf-6m-workup',
      },
      {
        label: 'Toxic / Ill-Appearing',
        description: 'Full sepsis workup + empiric antibiotics',
        next: 'pf-toxic',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'pf-6m-focal',
    type: 'result',
    module: 2,
    title: 'Focal Bacterial Infection',
    body: 'Identifiable bacterial source found on exam. Manage per condition-specific guidelines.\n\nCOMMON FOCAL INFECTIONS\n\u2022 Urinary tract infection \u2192 UA + culture, antibiotics per UTI guidelines\n\u2022 Pneumonia \u2192 CXR, antibiotics per CAP guidelines\n\u2022 Cellulitis/abscess \u2192 I&D if fluctuant, antibiotics based on severity\n\u2022 Acute otitis media \u2192 antibiotics per AOM guidelines\n\u2022 Osteomyelitis/septic arthritis \u2192 urgent orthopedic and ID consult\n\n**RED FLAG:** Prolonged fever >5 days without clear source \u2192 consider Kawasaki disease or MIS-C.',
    recommendation: 'Manage the identified focal infection per condition-specific guidelines. Consider additional workup if the infant appears ill out of proportion to the identified source.',
    confidence: 'recommended',
    citation: [1],
  },

  {
    id: 'pf-6m-viral',
    type: 'question',
    module: 3,
    title: 'Viral Syndrome \u2014 UTI Screen',
    body: 'Defined viral syndrome identified. Supportive care for the viral illness.\n\nHowever, **still screen for UTI** \u2014 UTI can coexist with viral infections in this age group.\n\nObtain UA. See [UTI Risk Factors](#/info/pf-uti-risk) for screening criteria.',
    citation: [1, 8],
    options: [
      {
        label: 'UA Positive',
        description: 'Concurrent UTI suspected',
        next: 'pf-6m-uti',
      },
      {
        label: 'UA Negative or Low UTI Risk',
        description: 'Viral syndrome only \u2014 supportive care',
        next: 'pf-6m-dispo',
      },
    ],
  },

  {
    id: 'pf-6m-workup',
    type: 'question',
    module: 3,
    title: 'FWAS: Labs & Risk Assessment',
    body: '**Fever Without an Apparent Source (FWAS)**\n\nLABS TO ORDER\n\u2022 CBC with differential\n\u2022 Blood culture\n\u2022 UA (catheterized if [risk factors](#/info/pf-uti-risk) present)\n\u2022 Procalcitonin\n\nOPTIONAL: CMP, CRP, stool culture (if diarrhea)\n\nAssess PCV (pneumococcal conjugate vaccine) status and [UTI risk](#/info/pf-uti-risk):',
    citation: [1, 5],
    options: [
      {
        label: 'UA Positive',
        description: 'Likely UTI \u2014 manage accordingly',
        next: 'pf-6m-uti',
      },
      {
        label: 'PCV Incomplete (<2 doses) + UA Negative',
        description: 'Higher risk \u2014 may need empiric antibiotics',
        next: 'pf-6m-pcv',
      },
      {
        label: 'PCV Complete (\u22652 doses) + UA Negative + Well',
        description: 'Low risk \u2014 home observation',
        next: 'pf-6m-dispo',
      },
    ],
  },

  {
    id: 'pf-6m-pcv',
    type: 'result',
    module: 4,
    title: 'Incomplete PCV \u2014 Additional Workup',
    body: 'Infant has <2 PCV doses \u2192 higher risk for invasive pneumococcal disease.\n\n**ADDITIONAL ASSESSMENT**\n\u2022 If WBC >15,000 or <5,000 cells/mm\u00b3: obtain blood culture + consider empiric [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) 50 mg/kg IM/IV x1\n\u2022 If WBC 5,000\u201315,000: lower risk, observe\n\n**DISPOSITION**\n\u2022 If given Ceftriaxone: mandatory 24-hour follow-up\n\u2022 Review [Discharge Criteria](#/info/pf-discharge)\n\u2022 Provide [Return Precautions](#/info/pf-discharge)\n\u2022 Culture callback at 24\u201336h',
    recommendation: 'Assess WBC count. If abnormal, give empiric [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) x1 and ensure 24-hour follow-up. Culture callback system in place.',
    confidence: 'recommended',
    citation: [1, 5, 6],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone',
        dose: '50 mg/kg (max 2g)',
        route: 'IM/IV',
        frequency: 'x1 dose',
        duration: 'Single dose',
        notes: 'Only if WBC >15,000 or <5,000. If WBC 5,000-15,000: observe without antibiotics.',
      },
      monitoring: 'Culture callback at 24-36h. Mandatory 24-hour follow-up if Ceftriaxone given.',
    }
  },

  {
    id: 'pf-6m-uti',
    type: 'result',
    module: 4,
    title: 'UTI Management',
    body: '**TREATMENT OPTIONS BY CLINICAL STATUS**\n\nWELL-APPEARING + TOLERATING PO\n\u2022 [Cephalexin](#/drug/cephalexin) 17 mg/kg PO TID x 10 days\n\u2022 OR [Ceftriaxone](#/drug/ceftriaxone/pediatric fever) 50 mg/kg IM/IV x1, then oral step-down\n\nILL-APPEARING OR NOT TOLERATING PO\n\u2022 [Cefazolin](#/drug/cefazolin) 17 mg/kg IV q8h\n\u2022 Step-down to [Cephalexin](#/drug/cephalexin) 17 mg/kg PO TID when tolerating PO\n\u2022 If bacteremia: [Cefazolin](#/drug/cefazolin) 33 mg/kg IV q8h\n\nTotal duration: 10 days (IV + PO combined)\n\nENSURE: Catheterized urine culture sent. Follow up culture results.',
    recommendation: 'Treat UTI based on clinical status. Well-appearing: oral [Cephalexin](#/drug/cephalexin/pediatric UTI) or [Ceftriaxone](#/drug/ceftriaxone/pediatric UTI) x1 + oral. Ill: IV [Cefazolin](#/drug/cefazolin/pediatric UTI). Total 10-day course. Follow up urine culture.',
    confidence: 'definitive',
    citation: [1, 8],
    calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Cephalexin',
        dose: '17 mg/kg',
        route: 'PO',
        frequency: 'TID',
        duration: '10 days',
        notes: 'For well-appearing infants tolerating PO',
      },
      alternative: {
        drug: 'Ceftriaxone then Cephalexin',
        dose: 'Ceftriaxone 50 mg/kg x1, then Cephalexin 17 mg/kg',
        route: 'IM/IV then PO',
        frequency: 'Ceftriaxone x1; Cephalexin TID',
        duration: '10 days total',
        notes: 'Alternative for well-appearing: IM dose then oral step-down',
      },
      pcnAllergy: {
        drug: 'Cefazolin then Cephalexin',
        dose: 'Cefazolin 17 mg/kg (33 mg/kg if bacteremia); Cephalexin 17 mg/kg',
        route: 'IV then PO',
        frequency: 'Cefazolin q8h; Cephalexin TID',
        duration: '10 days total',
        notes: 'For ill-appearing or not tolerating PO. Step down when improving.',
      },
      monitoring: 'Urine culture results. Clinical improvement within 48-72h.',
    },
  },

  {
    id: 'pf-6m-dispo',
    type: 'result',
    module: 5,
    title: 'Disposition',
    body: '**ED DISCHARGE CRITERIA** (all must be met)\n\u2022 Well-appearing on exam\n\u2022 Tolerating oral liquids\n\u2022 Reliable caregiver with transportation\n\u2022 PCP or ED follow-up within 24 hours confirmed\n\u2022 Caregiver comfortable with home observation\n\u2022 Review [full Discharge Criteria](#/info/pf-discharge)\n\n**IF CRITERIA NOT MET \u2192 ADMIT**\n\n**FOLLOW-UP**\n\u2022 PCP or ED in 24 hours\n\u2022 Culture callback: blood culture results at 24\u201336h\n\u2022 Provide [Return Precautions](#/info/pf-discharge)',
    recommendation: 'Discharge home if all criteria met. Ensure 24-hour follow-up and culture callback system. Admit if discharge criteria not met.',
    confidence: 'recommended',
    citation: [1, 7, 9],
  },

];

export const PEDS_FEVER_NODE_COUNT = PEDS_FEVER_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const PEDS_FEVER_MODULE_LABELS = [
  'Initial Assessment',
  'Workup',
  'Risk Stratification',
  'Treatment',
  'Disposition',
];

// -------------------------------------------------------------------
// -------------------------------------------------------------------
// Critical Actions
// -------------------------------------------------------------------

export const PEDS_FEVER_CRITICAL_ACTIONS = [
  { text: 'Age-stratified workup: <21 days = full sepsis workup + empiric antibiotics, 22-28 days = Step-by-Step algorithm', nodeId: 'pf-start' },
  { text: 'Infants <21 days: blood culture, urine culture, CSF, HSV PCR (if risk factors), CXR, empiric ampicillin + gentamicin + acyclovir', nodeId: 'pf-0-21-workup' },
  { text: 'HSV workup if: <21 days, vesicular rash, seizures, CSF pleocytosis, maternal HSV, mucocutaneous lesions', nodeId: 'pf-hsv-criteria' },
  { text: 'Step-by-Step (22-90 days): CRP <20 + ANC <4000 + procalcitonin <0.5 + UA normal = low risk', nodeId: 'pf-step-by-step' },
  { text: 'UTI most common serious bacterial infection in febrile infants (5-10%)', nodeId: 'pf-uti' },
  { text: 'Ceftriaxone contraindicated in neonates receiving calcium-containing IV fluids (risk of precipitation)', nodeId: 'pf-ceftriaxone-ci' },
  { text: 'Circumcised males <3 months have lower UTI risk, but still get urine culture if febrile without source', nodeId: 'pf-uti-risk' },
  { text: 'LP required for infants <28 days and those appearing ill regardless of inflammatory markers', nodeId: 'pf-lp-indications' },
  { text: 'Discharge criteria: well-appearing, normal inflammatory markers, reliable follow-up in 24h', nodeId: 'pf-discharge' },
  { text: 'Do NOT give antipyretics before LP (may mask fever and delay diagnosis)', nodeId: 'pf-antipyretics' },
];

// Evidence Citations
// -------------------------------------------------------------------

export const PEDS_FEVER_CITATIONS: Citation[] = [
  { num: 1, text: 'Dell Children\u2019s EBOC. Fever Without a Source Clinical Guideline. September 2022.' },
  { num: 2, text: 'Byington CL, et al. Serious bacterial infections in febrile infants 1 to 90 days old with and without viral infections. Pediatrics. 2004;113(6):1662-6.' },
  { num: 3, text: 'Caviness AC, et al. Prevalence of neonatal HSV infection compared with serious bacterial illness in hospitalized neonates. J Pediatr. 2008;153(2):164-9.' },
  { num: 4, text: 'Gomez B, et al. Validation of the \u201cStep-by-Step\u201d Approach in Management of Young Febrile Infants. Pediatrics. 2016;138(2):e20154381.' },
  { num: 5, text: 'Biondi E, et al. Epidemiology of bacteremia in febrile infants in the United States. Pediatrics. 2013;132(6):990-6.' },
  { num: 6, text: 'Greenhow TL, et al. Changing epidemiology of bacteremia in infants aged 1 week to 3 months. Pediatrics. 2012;129:e590-e596.' },
  { num: 7, text: 'Pantell RH, et al. Management and outcomes of care of fever in early infancy. JAMA. 2004;291(10):1203-12.' },
  { num: 8, text: 'Schroeder AR, et al. Diagnostic Accuracy of the Urinalysis for UTI in Infants <3 Months of Age. Pediatrics. 2015;135(6):965-71.' },
  { num: 9, text: 'Biondi EA, et al. REVISE: Reducing Variability in the Infant Sepsis Evaluation. Pediatrics. 2019;144(3):e20182201.' },
  { num: 10, text: 'Nigrovic LE, et al. Clinical prediction rule for identifying children with CSF pleocytosis at very low risk for bacterial meningitis. JAMA. 2007;297(1):52-60.' },
];
