// MedKitt — Pelvic Inflammatory Disease
// Diagnosis → Risk Assessment → Outpatient Treatment → Inpatient Treatment → Disposition
// 5 modules: Diagnosis → Risk Assessment → Outpatient Treatment → Inpatient Treatment → Disposition
// 14 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PID_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: DIAGNOSIS
  // =====================================================================

  {
    id: 'pid-start',
    type: 'question',
    module: 1,
    title: 'PID — Clinical Diagnosis',
    body: '[PID Steps Summary](#/info/pid-steps)\n\n**Pelvic inflammatory disease** is infection of the upper genital tract (uterus, fallopian tubes, ovaries, peritoneum).\n\n**CDC 2021 Minimum Criteria** — treat if ALL present:\n• Sexually active female\n• Pelvic or lower abdominal pain\n• **Cervical motion tenderness**, OR\n• **Uterine tenderness**, OR\n• **Adnexal tenderness** (unilateral or bilateral)\n\nLow threshold to treat — missed PID leads to serious sequelae (infertility, ectopic pregnancy, chronic pelvic pain).',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'pid-criteria', label: 'CDC PID Criteria' },
    ],
    options: [
      {
        label: 'Minimum Criteria Met',
        description: 'CMT, uterine, or adnexal tenderness present',
        next: 'pid-additional-criteria',
      },
      {
        label: 'Criteria Not Met',
        description: 'Consider alternative diagnoses',
        next: 'pid-differential',
      },
    ],

    summary: 'CDC minimum: sexually active + pelvic pain + CMT/uterine/adnexal tenderness; low threshold to treat',
    safetyLevel: 'warning',
  },

  {
    id: 'pid-additional-criteria',
    type: 'info',
    module: 1,
    title: 'Additional Diagnostic Criteria',
    body: '**Additional criteria increase diagnostic specificity:**\n\n**Clinical:**\n• Oral temp >101°F (38.3°C)\n• Mucopurulent cervical discharge\n• Friable cervix\n\n**Laboratory:**\n• Elevated WBC on wet prep (>1 WBC per epithelial cell)\n• Elevated ESR or CRP\n• Positive NAAT for GC and/or CT\n• Positive cervical culture\n\n**Imaging/Definitive:**\n• Thickened, fluid-filled tubes on US (tubo-ovarian complex)\n• Tubo-ovarian abscess (TOA)\n• Laparoscopic findings\n• Endometrial biopsy showing endometritis\n\n**Obtain:**\n• Pregnancy test (rule out ectopic)\n• GC/CT NAAT\n• Wet prep\n• Consider HIV testing',
    citation: [1, 2],
    next: 'pid-workup',

    summary: 'Additional: fever >101F, mucopurulent discharge, elevated WBC on wet prep, positive GC/CT NAAT, US findings',
  },

  {
    id: 'pid-differential',
    type: 'info',
    module: 1,
    title: 'Differential Diagnosis',
    body: '**Consider alternative diagnoses if PID criteria not met:**\n\n**Gynecologic:**\n• Ectopic pregnancy — always check pregnancy test\n• Ovarian cyst rupture/torsion\n• Endometriosis\n• Ovarian tumor\n\n**GI:**\n• Appendicitis (RLQ pain, migration, anorexia)\n• Inflammatory bowel disease\n• Diverticulitis\n\n**Urologic:**\n• UTI/pyelonephritis\n• Nephrolithiasis\n\n**Other:**\n• Mesenteric lymphadenitis\n• Muscle strain\n\n**KEY:** If ectopic pregnancy is possible, imaging is mandatory before treating as PID.',
    citation: [1],
    next: 'pid-start',

    summary: 'Rule out ectopic pregnancy; consider appendicitis, ovarian torsion, UTI — imaging if diagnosis unclear',
  },

  {
    id: 'pid-workup',
    type: 'question',
    module: 1,
    title: 'Diagnostic Workup',
    body: '**Standard workup:**\n• **Pregnancy test** — mandatory (ectopic must be excluded)\n• **GC/CT NAAT** — cervical or urine\n• **Wet prep** — WBCs, clue cells, trichomonads, yeast\n• **CBC, CMP, CRP** — if systemic illness suspected\n• **HIV testing** — offer to all\n\n**Imaging:**\n• **Pelvic ultrasound** if:\n  - Pelvic mass palpated\n  - TOA suspected\n  - Diagnosis uncertain\n  - Pregnancy test positive\n  - Moderate-severe illness\n\nDoes the patient require ultrasound or have concerning features?',
    citation: [1, 2],
    options: [
      {
        label: 'Uncomplicated PID',
        description: 'Mild-moderate symptoms, no mass, pregnancy negative',
        next: 'pid-risk-assessment',
      },
      {
        label: 'Ultrasound Indicated',
        description: 'Mass, severe symptoms, or ectopic concern',
        next: 'pid-imaging',
        urgency: 'urgent',
      },
    ],

    summary: 'Pregnancy test mandatory; GC/CT NAAT; wet prep; US if mass, TOA suspected, or severe illness',
  },

  {
    id: 'pid-imaging',
    type: 'question',
    module: 1,
    title: 'Pelvic Ultrasound Findings',
    body: '**Ultrasound findings in PID:**\n\n**Suggestive of PID:**\n• Thickened, fluid-filled fallopian tubes\n• Free pelvic fluid\n• Tubo-ovarian complex (inflamed tube/ovary)\n\n**Tubo-ovarian abscess (TOA):**\n• Complex multiloculated pelvic mass\n• May involve tube, ovary, bowel\n• Requires IV antibiotics and possible drainage\n\n**Alternative findings:**\n• Simple ovarian cyst\n• Ectopic pregnancy\n• Appendicitis\n\nWhat are the ultrasound findings?',
    citation: [1, 2],
    options: [
      {
        label: 'No TOA — Uncomplicated PID',
        description: 'Mild changes or normal US',
        next: 'pid-risk-assessment',
      },
      {
        label: 'Tubo-Ovarian Abscess',
        description: 'Complex mass consistent with TOA',
        next: 'pid-toa',
        urgency: 'urgent',
      },
      {
        label: 'Alternative Diagnosis',
        description: 'Findings suggest different pathology',
        next: 'pid-differential',
      },
    ],

    summary: 'US for TOA: complex multiloculated mass; TOA requires IV antibiotics ± drainage',
  },

  // =====================================================================
  // MODULE 2: RISK ASSESSMENT
  // =====================================================================

  {
    id: 'pid-risk-assessment',
    type: 'question',
    module: 2,
    title: 'Risk Assessment — Inpatient vs Outpatient',
    body: '[PID Admission Criteria](#/info/pid-admission)\n\n**CDC criteria for hospitalization:**\n• Surgical emergency cannot be excluded (ectopic, appendicitis)\n• Tubo-ovarian abscess present\n• Pregnancy\n• Severe illness (high fever, nausea/vomiting, severe pain)\n• Unable to tolerate or follow outpatient regimen\n• No clinical response to oral antibiotics within 72 hours\n\n**Additional considerations:**\n• Immunocompromised (HIV with low CD4)\n• IUD in place (consider removal)\n• Adolescent (compliance concerns)',
    citation: [1, 2],
    options: [
      {
        label: 'Outpatient Criteria Met',
        description: 'Mild-moderate, able to take PO, reliable follow-up',
        next: 'pid-outpatient-tx',
      },
      {
        label: 'Admission Criteria Met',
        description: 'Severe illness, TOA, pregnancy, unable to take PO',
        next: 'pid-inpatient-tx',
        urgency: 'urgent',
      },
    ],

    summary: 'Admit if: TOA, pregnancy, severe illness, cannot tolerate PO, surgical emergency not excluded',
  },

  // =====================================================================
  // MODULE 3: OUTPATIENT TREATMENT
  // =====================================================================

  {
    id: 'pid-outpatient-tx',
    type: 'info',
    module: 3,
    title: 'Outpatient Treatment — CDC 2021',
    body: '[CDC PID Treatment Regimens](#/info/pid-treatment)\n\n**Recommended regimen:**\n\n**[Ceftriaxone](#/drug/ceftriaxone/pid) 500 mg IM × 1 dose**\n(If weight ≥150 kg: 1 g IM)\n\n**PLUS**\n\n**[Doxycycline](#/drug/doxycycline/pid) 100 mg PO BID × 14 days**\n\n**PLUS**\n\n**[Metronidazole](#/drug/metronidazole/pid) 500 mg PO BID × 14 days**\n\n---\n\n**Metronidazole rationale:**\n• Covers anaerobes and BV organisms\n• CDC recommends adding for all PID (previously optional)\n• Essential if BV on wet prep or TOA concern',
    citation: [1],
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone',
        dose: '500 mg (1 g if ≥150 kg)',
        route: 'IM',
        frequency: 'Single dose',
        duration: 'One-time injection',
        notes: 'Given in ED before discharge',
      },
      alternative: {
        drug: 'Doxycycline',
        dose: '100 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '14 days',
        notes: 'Add metronidazole 500 mg PO BID × 14 days',
      },
      pcnAllergy: {
        drug: 'If severe cephalosporin allergy',
        dose: 'Consult ID or CDC guidelines',
        route: '',
        frequency: '',
        duration: '',
        notes: 'May consider azithromycin + metronidazole, but GC coverage less reliable',
      },
      monitoring: 'Follow-up in 48-72 hours. If no improvement, admit for IV therapy.',
    },
    next: 'pid-outpatient-f-u',

    summary: 'Ceftriaxone 500mg IM × 1 + doxycycline 100mg BID × 14d + metronidazole 500mg BID × 14d',
    safetyLevel: 'warning',
  },

  {
    id: 'pid-outpatient-f-u',
    type: 'info',
    module: 3,
    title: 'Outpatient Follow-Up',
    body: '**Follow-up in 48-72 hours is mandatory.**\n\n**Expected improvement:**\n• Decreased pain\n• Resolution of fever\n• Improved tenderness on exam\n\n**If no improvement in 72 hours:**\n• Admit for IV antibiotics\n• Consider imaging for TOA\n• Reassess diagnosis\n\n**Additional counseling:**\n• Complete all antibiotics even if feeling better\n• No intercourse until treatment complete AND symptoms resolved AND partners treated\n• Return for worsening pain, fever, vomiting\n\n**Test of cure:**\n• GC/CT retest in 3 months (high reinfection rate)\n\n**IUD:**\n• CDC: IUD can remain in place during treatment\n• Consider removal only if no improvement after 48-72h',
    citation: [1],
    next: 'pid-partner-tx',

    summary: 'F/U in 48-72h mandatory; admit if no improvement; retest GC/CT in 3 months; IUD may remain during treatment',
  },

  {
    id: 'pid-partner-tx',
    type: 'info',
    module: 3,
    title: 'Partner Treatment',
    body: '[Partner Treatment Card](#/info/pid-partner)\n\n**All sexual partners within past 60 days must be treated.**\n\n**Partner regimen (for GC/CT):**\n• [Ceftriaxone](#/drug/ceftriaxone/gc) 500 mg IM × 1\n• [Doxycycline](#/drug/doxycycline/ct) 100 mg PO BID × 7 days\n\n**Expedited partner therapy (EPT):**\n• Legal in most states\n• Provide prescription or medication for partner(s)\n• Alternative when partner unlikely to seek care\n\n**Counseling:**\n• Partners should be treated even if asymptomatic\n• Abstain until both partners complete treatment\n• Use condoms consistently after treatment\n\n**Reporting:**\n• GC and CT are reportable diseases\n• Health department may assist with partner notification',
    citation: [1],
    next: 'pid-disposition',

    summary: 'Treat all partners from past 60 days; EPT is legal option; partners get ceftriaxone 500mg IM + doxy 7 days',
  },

  // =====================================================================
  // MODULE 4: INPATIENT TREATMENT
  // =====================================================================

  {
    id: 'pid-inpatient-tx',
    type: 'info',
    module: 4,
    title: 'Inpatient Treatment — CDC 2021',
    body: '**IV regimen options:**\n\n**OPTION A (preferred):**\n• [Cefotetan](#/drug/cefotetan/pid) 2 g IV q12h\n  OR [Cefoxitin](#/drug/cefoxitin/pid) 2 g IV q6h\n• **PLUS** [Doxycycline](#/drug/doxycycline/pid) 100 mg PO/IV q12h\n\n**OPTION B:**\n• [Clindamycin](#/drug/clindamycin/pid) 900 mg IV q8h\n• **PLUS** [Gentamicin](#/drug/gentamicin/pid) 2 mg/kg IV load, then 1.5 mg/kg IV q8h (or 5 mg/kg daily)\n\n---\n\n**Transition to oral:**\n• After clinical improvement (24-48h afebrile, decreased pain)\n• Complete 14-day total course\n• Doxycycline 100 mg PO BID + metronidazole 500 mg PO BID',
    citation: [1],
    treatment: {
      firstLine: {
        drug: 'Cefoxitin',
        dose: '2 g',
        route: 'IV',
        frequency: 'Every 6 hours',
        duration: 'Until clinical improvement (usually 24-48h)',
        notes: 'Plus doxycycline 100 mg PO/IV q12h. Alternative: Cefotetan 2 g IV q12h.',
      },
      alternative: {
        drug: 'Clindamycin + Gentamicin',
        dose: 'Clinda 900 mg IV q8h + Gent 5 mg/kg IV daily',
        route: 'IV',
        frequency: 'Clinda q8h; Gent daily or divided q8h',
        duration: 'Until clinical improvement',
        notes: 'Gent: monitor renal function, troughs. Transition to oral doxy + metro when improved.',
      },
      monitoring: 'Daily exam for clinical improvement. Temp, WBC, pain level. Transition to PO when 24-48h afebrile.',
    },
    next: 'pid-toa',

    summary: 'IV: cefoxitin 2g q6h + doxy 100mg q12h; or clinda 900mg q8h + gent; transition to PO after 24-48h improvement',
    safetyLevel: 'warning',
  },

  {
    id: 'pid-toa',
    type: 'info',
    module: 4,
    title: 'Tubo-Ovarian Abscess (TOA)',
    body: '**TOA requires IV antibiotics and possible drainage.**\n\n**Initial management:**\n• IV antibiotics (same regimens as severe PID)\n• Add [metronidazole](#/drug/metronidazole/toa) 500 mg IV q8h for enhanced anaerobic coverage\n• Serial imaging to monitor response\n\n**Drainage indications:**\n• Abscess >3-5 cm (varies by institution)\n• Failure to improve on antibiotics after 48-72h\n• Ruptured TOA (surgical emergency)\n\n**Drainage options:**\n• Interventional radiology: CT or US-guided percutaneous\n• Surgical: Laparoscopy or laparotomy\n\n**Ruptured TOA:**\n• Surgical emergency\n• Presents with peritonitis, septic shock\n• Requires emergent laparotomy',
    citation: [1, 2],
    next: 'pid-disposition',

    summary: 'TOA: IV antibiotics + metro; drainage if >3-5cm or no improvement 48-72h; ruptured TOA = surgical emergency',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 5: DISPOSITION
  // =====================================================================

  {
    id: 'pid-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Final disposition based on severity and treatment response.',
    citation: [1],
    options: [
      {
        label: 'Discharge with Outpatient Treatment',
        description: 'Mild-moderate PID, able to take PO, reliable follow-up',
        next: 'pid-dispo-discharge',
      },
      {
        label: 'Admit for IV Antibiotics',
        description: 'Severe PID, TOA, unable to take PO, pregnancy',
        next: 'pid-dispo-admit',
      },
      {
        label: 'Surgical Consultation',
        description: 'Ruptured TOA, peritonitis, failed medical management',
        next: 'pid-dispo-surgery',
        urgency: 'critical',
      },
    ],

    summary: 'Discharge if mild-moderate; admit if severe/TOA/pregnant; surgery if ruptured TOA or peritonitis',
  },

  {
    id: 'pid-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge',
    body: '**Discharge with outpatient treatment:**\n\n**Prescriptions:**\n• Doxycycline 100 mg PO BID × 14 days\n• Metronidazole 500 mg PO BID × 14 days\n• IM ceftriaxone given in ED\n\n**Follow-up:**\n• 48-72 hours for clinical reassessment (MANDATORY)\n• GC/CT retest in 3 months\n\n**Patient instructions:**\n• Complete all antibiotics\n• Partners must be treated\n• No intercourse until treatment complete + partners treated\n• Return for: worsening pain, fever >101°F, vomiting, inability to take meds\n\n**EPT:**\n• Provide partner treatment if patient requests',
    recommendation: 'Discharge with ceftriaxone IM + doxycycline + metronidazole. Mandatory 48-72h follow-up. Treat partners. Retest GC/CT in 3 months.',
    citation: [1],
  },

  {
    id: 'pid-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit',
    body: '**Admit for IV antibiotics:**\n\n**Orders:**\n• IV antibiotics per CDC regimen\n• IV fluids\n• Pain management\n• NPO if surgery possible\n• OB/GYN consultation\n\n**Monitoring:**\n• Vitals q4h\n• Daily abdominal/pelvic exam\n• WBC, temp trending\n\n**Transition to oral:**\n• After 24-48h afebrile with clinical improvement\n• Complete 14-day total course as outpatient\n\n**If TOA:**\n• IR or surgical consultation for drainage\n• Serial imaging',
    recommendation: 'Admit. IV cefoxitin + doxycycline (or clinda + gent). OB/GYN consult. Transition to PO after 24-48h improvement.',
    citation: [1],
  },

  {
    id: 'pid-dispo-surgery',
    type: 'result',
    module: 5,
    title: 'Surgical Consultation',
    body: '**Urgent/emergent surgical consultation:**\n\n**Indications:**\n• Ruptured TOA with peritonitis\n• Failed medical management of TOA\n• Septic shock\n• Diagnostic uncertainty (cannot exclude surgical emergency)\n\n**Surgical options:**\n• Laparoscopy for drainage and washout\n• Laparotomy for ruptured TOA\n• Possible salpingectomy or oophorectomy if necrotic tissue\n\n**Pre-operative:**\n• Broad-spectrum IV antibiotics\n• Aggressive fluid resuscitation\n• Blood type and screen\n• NPO',
    recommendation: 'Urgent OB/GYN surgical consultation. IV antibiotics. NPO. Consider OR for drainage or exploration.',
    citation: [1, 2],
  },

];

export const PID_MODULE_LABELS = [
  'Diagnosis',
  'Risk Assessment',
  'Outpatient Treatment',
  'Inpatient Treatment',
  'Disposition',
];

export const PID_CRITICAL_ACTIONS = [
  { text: 'Always rule out ectopic pregnancy — obtain pregnancy test', nodeId: 'pid-start' },
  { text: 'CDC minimum criteria: CMT, uterine, or adnexal tenderness + sexually active + pelvic pain', nodeId: 'pid-start' },
  { text: 'Outpatient: Ceftriaxone 500 mg IM × 1 + doxycycline 100 mg BID × 14d + metronidazole 500 mg BID × 14d', nodeId: 'pid-outpatient-tx' },
  { text: 'Mandatory 48-72 hour follow-up — admit if no improvement', nodeId: 'pid-outpatient-f-u' },
  { text: 'Treat all partners from past 60 days — EPT is legal option', nodeId: 'pid-partner-tx' },
  { text: 'Ruptured TOA = surgical emergency with peritonitis', nodeId: 'pid-toa' },
];

export const PID_CITATIONS: Citation[] = [
  { num: 1, text: 'Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187.' },
  { num: 2, text: 'Curry A, Williams T, Penny ML. Pelvic Inflammatory Disease: Diagnosis, Management, and Prevention. Am Fam Physician. 2019;100(6):357-364.' },
];
