// MedKitt — Inflammatory Bowel Disease Flare
// ED evaluation and management of Crohn's and Ulcerative Colitis flares
// Sources: ACG Guidelines 2020, AGA Guidelines, ECCO Guidelines
// 6 modules: Assessment → Severity → Complications → Treatment → Biologics → Disposition
// ~20 nodes

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const IBD_FLARE_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'ibd-start',
    type: 'question',
    module: 1,
    title: 'IBD Flare — ED Evaluation',
    body: '[Steps Summary](#/info/ibd-steps)\n\n**Key History:**\n• IBD type (Crohn\'s vs UC) and extent\n• Current medications (biologics, steroids, immunomodulators)\n• Prior hospitalizations, surgeries\n• Recent med changes or non-adherence\n• Recent infections (C. diff risk)\n\n**Assess for:**\n• Dehydration\n• Anemia\n• Infection vs flare\n• Complications (obstruction, perforation, toxic megacolon)\n\n**What type of IBD?** [1][2]',
    options: [
      { label: 'Ulcerative Colitis', description: 'Colon only, bloody diarrhea', next: 'ibd-uc-severity' },
      { label: 'Crohn\'s Disease', description: 'Any GI location, varied presentation', next: 'ibd-crohn-severity' },
      { label: 'Unknown or new diagnosis', description: 'Undifferentiated IBD', next: 'ibd-new-diagnosis' },
      { label: 'Concern for complication', description: 'Obstruction, perforation, abscess', next: 'ibd-complications', urgency: 'critical' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'weight-dose', label: 'Weight Calculator' },
    ],
  },

  // =====================================================================
  // MODULE 2: SEVERITY ASSESSMENT
  // =====================================================================

  {
    id: 'ibd-uc-severity',
    type: 'question',
    module: 2,
    title: 'UC Severity — Truelove-Witts Criteria',
    body: '**Truelove-Witts Severity Criteria:**\n\n| Feature | Mild | Moderate | Severe |\n|---------|------|----------|--------|\n| Stools/day | <4 | 4-6 | >6 |\n| Blood in stool | Intermittent | Frequent | Continuous |\n| Temperature | Normal | <37.8°C | >37.8°C |\n| Heart rate | Normal | <90 | >90 |\n| Hemoglobin | >11 | 10-11 | <10 |\n| ESR/CRP | Normal | Elevated | >30/High |\n\n**Severe = ANY of:**\n• ≥6 bloody stools/day PLUS\n• ANY systemic sign (fever >37.8, HR >90, Hgb <10.5, ESR >30)\n\n**What is the severity?** [1][3]',
    options: [
      { label: 'Mild UC flare', description: '<4 stools, no systemic signs', next: 'ibd-mild-treatment' },
      { label: 'Moderate UC flare', description: '4-6 stools, minor systemic signs', next: 'ibd-moderate-treatment' },
      { label: 'Severe UC flare', description: '≥6 bloody stools + systemic signs', next: 'ibd-severe-uc', urgency: 'urgent' },
      { label: 'Fulminant/Toxic megacolon', description: '>10 stools, toxic, distension', next: 'ibd-toxic-megacolon', urgency: 'critical' },
    ],
    citation: [1, 3],
  },

  {
    id: 'ibd-crohn-severity',
    type: 'question',
    module: 2,
    title: 'Crohn\'s Severity Assessment',
    body: '**Crohn\'s Disease Activity Index (simplified):**\n\n**Mild-Moderate:**\n• Ambulatory\n• Tolerating PO\n• No obstruction, abscess, or systemic toxicity\n• <10% weight loss\n\n**Moderate-Severe:**\n• Failed outpatient treatment\n• Significant symptoms (pain, weight loss)\n• Fever, anemia, or elevated CRP\n• Concern for complications\n\n**Severe-Fulminant:**\n• Persistent symptoms despite steroids\n• High fever, vomiting, obstruction\n• Abscess, peritonitis\n• Cachexia\n\n**What is the severity?** [2][4]',
    options: [
      { label: 'Mild-Moderate Crohn\'s', description: 'Ambulatory, tolerating PO, no complications', next: 'ibd-mild-treatment' },
      { label: 'Moderate-Severe Crohn\'s', description: 'Failed outpatient, significant symptoms', next: 'ibd-moderate-treatment' },
      { label: 'Severe-Fulminant Crohn\'s', description: 'Systemic toxicity, possible complication', next: 'ibd-severe-crohn', urgency: 'urgent' },
      { label: 'Obstruction suspected', description: 'Vomiting, distension, prior strictures', next: 'ibd-obstruction', urgency: 'critical' },
    ],
    citation: [2, 4],
  },

  {
    id: 'ibd-new-diagnosis',
    type: 'info',
    module: 2,
    title: 'New/Undifferentiated IBD',
    body: '**First presentation of IBD:**\n\n**ED priorities:**\n1. Rule out infection (especially C. diff, bacterial)\n2. Assess severity and need for admission\n3. Start supportive care\n4. GI consultation for expedited workup\n\n**Workup:**\n• CBC, CMP, ESR, CRP\n• Stool studies: C. diff toxin, culture, O&P\n• Consider fecal calprotectin (if available)\n• Abdominal imaging if obstruction/perforation concern\n\n**Do NOT give steroids until:**\n• C. diff and other infections ruled out\n• OR patient critically ill and needs treatment\n\n**GI consult for:**\n• Inpatient colonoscopy if severe\n• Outpatient colonoscopy if stable [1][2]',
    next: 'ibd-workup',
    citation: [1, 2],
  },

  // =====================================================================
  // MODULE 3: COMPLICATIONS
  // =====================================================================

  {
    id: 'ibd-complications',
    type: 'question',
    module: 3,
    title: 'IBD Complications',
    body: '**Surgical emergencies in IBD:**\n\n**Toxic megacolon:**\n• Colonic dilation >6cm + systemic toxicity\n• Medical emergency, high mortality\n• Urgent surgical consult\n\n**Perforation:**\n• Free air, peritonitis\n• Emergent surgery\n\n**Obstruction:**\n• More common in Crohn\'s (strictures)\n• May need surgery if complete\n\n**Abscess:**\n• Crohn\'s with fistulizing disease\n• May need IR drainage\n\n**Massive hemorrhage:**\n• Rare, usually UC\n• May need emergent colectomy\n\n**What complication is suspected?** [2][5]',
    options: [
      { label: 'Toxic megacolon', description: 'Dilated colon, systemic toxicity', next: 'ibd-toxic-megacolon', urgency: 'critical' },
      { label: 'Perforation', description: 'Free air, peritonitis', next: 'ibd-perforation', urgency: 'critical' },
      { label: 'Small bowel obstruction', description: 'Crohn\'s with stricture', next: 'ibd-obstruction' },
      { label: 'Abscess', description: 'Fistulizing Crohn\'s', next: 'ibd-abscess' },
      { label: 'No surgical complication', description: 'Medical flare only', next: 'ibd-start' },
    ],
    citation: [2, 5],
  },

  {
    id: 'ibd-toxic-megacolon',
    type: 'info',
    module: 3,
    title: 'Toxic Megacolon — Emergency',
    body: '**Toxic Megacolon — Surgical Emergency:**\n\n**Diagnostic criteria:**\n• Radiographic colonic dilation (>6cm transverse colon)\n• PLUS ≥3 of: fever >38.6°C, HR >120, WBC >10.5, anemia\n• PLUS ≥1 of: dehydration, AMS, electrolyte disturbance, hypotension\n\n**Immediate management:**\n1. NPO, NG tube if vomiting\n2. IV fluids — aggressive resuscitation\n3. IV steroids: methylprednisolone 60mg or hydrocortisone 100mg q8h\n4. Broad-spectrum antibiotics (metronidazole + fluoroquinolone or ceftriaxone)\n5. DVT prophylaxis\n6. Serial abdominal exams q6-8h\n7. **Surgical consult STAT**\n\n**Avoid:**\n• Opioids, anticholinergics, antidiarrheals (↑ dilation)\n• Colonoscopy (perforation risk)\n\n**Surgery indicated if:** No improvement in 24-72h, perforation, or deterioration. [5][6]',
    next: 'ibd-disposition',
    citation: [5, 6],
    safetyLevel: 'critical',
  },

  {
    id: 'ibd-perforation',
    type: 'info',
    module: 3,
    title: 'Perforation — Emergent Surgery',
    body: '**Perforation — Surgical Emergency:**\n\n**Clinical features:**\n• Sudden severe abdominal pain\n• Peritoneal signs (guarding, rigidity, rebound)\n• Free air on imaging\n• Sepsis/shock\n\n**Immediate management:**\n1. NPO, NG tube\n2. Large-bore IV access, aggressive IVF\n3. Broad-spectrum antibiotics\n4. Blood products if needed\n5. **Surgery consult STAT**\n6. Prepare for OR\n\n**Imaging:**\n• Upright CXR (free air under diaphragm)\n• CT if stable and diagnosis uncertain\n\n**Surgery:**\n• Usually requires resection\n• May need diverting ostomy\n• High morbidity/mortality\n\n**Hold immunosuppressants** — infection risk, impaired healing. [5]',
    next: 'ibd-disposition',
    citation: [5],
    safetyLevel: 'critical',
  },

  {
    id: 'ibd-obstruction',
    type: 'info',
    module: 3,
    title: 'Small Bowel Obstruction',
    body: '**SBO in Crohn\'s Disease:**\n\n**Causes:**\n• Stricture (most common) — fibrotic vs inflammatory\n• Adhesions from prior surgery\n• Phlegmon/abscess causing mass effect\n\n**Inflammatory vs Fibrotic stricture:**\n| Feature | Inflammatory | Fibrotic |\n|---------|--------------|----------|\n| Onset | During flare | Insidious |\n| CRP | Elevated | Normal |\n| Response to steroids | Yes | No |\n| Treatment | Medical | Surgical |\n\n**Management:**\n1. NPO, NG tube if vomiting\n2. IV fluids, electrolyte correction\n3. CT abdomen/pelvis with contrast\n4. Surgery consult\n5. If inflammatory: trial of IV steroids\n6. If complete or not resolving: surgery\n\n**Strictureplasty vs resection** — surgery decision. [2][5]',
    next: 'ibd-disposition',
    citation: [2, 5],
  },

  {
    id: 'ibd-abscess',
    type: 'info',
    module: 3,
    title: 'Intra-abdominal Abscess',
    body: '**Abscess in Crohn\'s Disease:**\n\nCommon in fistulizing/penetrating Crohn\'s.\n\n**Clinical features:**\n• Fever, localized pain\n• Palpable mass\n• Elevated WBC, CRP\n• May have fistula drainage\n\n**Imaging:**\n• CT abdomen/pelvis with IV contrast\n• Look for fistula tracts\n\n**Management:**\n1. IV antibiotics (cover GNR + anaerobes)\n   - Ciprofloxacin + metronidazole OR\n   - Piperacillin-tazobactam\n2. IR drainage if >3cm and accessible\n3. NPO if concurrent obstruction\n4. Surgery consult\n5. **Hold biologics/immunosuppressants**\n\n**After drainage:**\n• Continue antibiotics 2-4 weeks\n• Delayed surgery often needed for fistula\n• May restart biologics once infection controlled [2][5]',
    next: 'ibd-disposition',
    citation: [2, 5],
  },

  // =====================================================================
  // MODULE 4: TREATMENT
  // =====================================================================

  {
    id: 'ibd-workup',
    type: 'info',
    module: 4,
    title: 'ED Workup',
    body: '**Standard IBD Flare Workup:**\n\n**Labs:**\n• CBC — anemia, leukocytosis\n• CMP — dehydration, electrolytes\n• ESR, CRP — inflammatory markers\n• Albumin — nutritional status, severity marker\n• LFTs — if on immunomodulators\n\n**Stool studies (CRITICAL):**\n• **C. difficile** — test ALL IBD flares\n   - High risk on immunosuppression\n   - Can mimic or trigger flare\n• Stool culture\n• Consider CMV if steroid-refractory\n\n**Imaging:**\n• AXR if obstruction concern (toxic megacolon screening)\n• CT abdomen/pelvis if: abscess, perforation, or obstruction suspected\n\n**Do NOT scope in ED** — perforation risk if severe. [1][2]',
    next: 'ibd-start',
    citation: [1, 2],
  },

  {
    id: 'ibd-mild-treatment',
    type: 'info',
    module: 4,
    title: 'Mild IBD Flare — Treatment',
    body: '**Mild Flare — Usually Outpatient:**\n\n**Ulcerative Colitis:**\n• Oral 5-ASA: mesalamine 4.8g/day\n• Topical therapy if distal:\n  - Mesalamine suppository (proctitis)\n  - Mesalamine enema (left-sided)\n• If not responding: oral prednisone 40mg/day\n\n**Crohn\'s Disease:**\n• Oral budesonide 9mg/day (ileal/right colon)\n• Or prednisone 40mg/day if more extensive\n• 5-ASA less effective in Crohn\'s\n\n**For both:**\n• Ensure adherence to maintenance meds\n• Avoid NSAIDs (trigger flares)\n• Antidiarrheals OK if no toxic megacolon risk\n\n**GI follow-up:** Within 1-2 weeks to assess response. [1][4]',
    next: 'ibd-disposition',
    citation: [1, 4],
  },

  {
    id: 'ibd-moderate-treatment',
    type: 'info',
    module: 4,
    title: 'Moderate IBD Flare — Treatment',
    body: '**Moderate Flare — May Need Admission:**\n\n**Treatment:**\n• IV fluids for dehydration\n• Oral prednisone 40-60mg/day if tolerating PO\n• If not tolerating PO or more severe:\n  - IV methylprednisolone 40-60mg/day OR\n  - IV hydrocortisone 300mg/day divided\n• Electrolyte repletion\n• DVT prophylaxis (IBD = hypercoagulable)\n\n**Rule out infection:**\n• C. diff testing mandatory\n• Treat C. diff if positive (oral vancomycin preferred)\n\n**Consider admission if:**\n• Unable to tolerate PO\n• Significant dehydration\n• Anemia requiring transfusion\n• Failed outpatient treatment\n• Social factors\n\n**GI consult** for biologic discussion if steroid-dependent. [1][2][4]',
    next: 'ibd-disposition',
    citation: [1, 2, 4],
  },

  {
    id: 'ibd-severe-uc',
    type: 'info',
    module: 4,
    title: 'Severe UC Flare — Admit',
    body: '**Severe UC — Requires Admission:**\n\n**Initial management:**\n1. **NPO** initially, advance diet as tolerated\n2. **IV steroids:** methylprednisolone 60mg/day or hydrocortisone 100mg q8h\n3. **IV fluids** — monitor I/O\n4. **DVT prophylaxis** — critical (hypercoagulable)\n5. **Check C. diff** — treat if positive\n6. **Daily labs:** CBC, CMP, CRP\n7. **Daily AXR** — monitor for toxic megacolon\n\n**Assess response at day 3:**\n• Stool frequency, blood, CRP\n• If not improving: salvage therapy\n\n**Salvage options (GI decision):**\n• Infliximab\n• Cyclosporine\n• Surgery (colectomy)\n\n**Surgical consult early** — may need colectomy if failing medical therapy. [3][6]',
    next: 'ibd-biologics',
    citation: [3, 6],
    safetyLevel: 'warning',
  },

  {
    id: 'ibd-severe-crohn',
    type: 'info',
    module: 4,
    title: 'Severe Crohn\'s Flare — Admit',
    body: '**Severe Crohn\'s — Requires Admission:**\n\n**Initial management:**\n1. Rule out surgical complications (abscess, obstruction, perforation)\n2. **IV steroids:** methylprednisolone 40-60mg/day\n3. **IV fluids**, electrolyte correction\n4. **Nutritional support** — may need TPN if prolonged NPO\n5. **DVT prophylaxis**\n6. **Infection workup:** C. diff, CMV if steroid-refractory\n\n**Imaging:**\n• CT enterography or MR enterography to assess disease extent\n• Look for abscess, fistula, stricture\n\n**If abscess present:**\n• Antibiotics + IR drainage\n• Hold biologics until controlled\n\n**If obstruction:**\n• NGT, bowel rest\n• Steroids if inflammatory\n• Surgery if fibrotic or not resolving\n\n**GI consult** for biologic management. [2][4]',
    next: 'ibd-biologics',
    citation: [2, 4],
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 5: BIOLOGICS
  // =====================================================================

  {
    id: 'ibd-biologics',
    type: 'info',
    module: 5,
    title: 'Biologics in IBD',
    body: '**Common Biologics — ED Considerations:**\n\n**Anti-TNF agents:**\n• Infliximab, adalimumab, certolizumab, golimumab\n• ↑ Infection risk (TB, fungal, bacterial)\n• Check TB, Hep B before starting (usually outpatient)\n\n**Anti-integrin:**\n• Vedolizumab (gut-selective, lower infection risk)\n\n**Anti-IL12/23:**\n• Ustekinumab\n\n**JAK inhibitors:**\n• Tofacitinib (UC only)\n• ↑ VTE risk, herpes zoster risk\n\n**ED considerations:**\n• **Continue biologics** during flare if no active infection\n• **Hold if:** active infection, abscess, surgery planned\n• Patients on biologics have higher infection risk\n• Consider opportunistic infections in workup\n\n**Do not start biologics in ED** — GI decision. [1][2]',
    next: 'ibd-disposition',
    citation: [1, 2],
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'ibd-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Admit to ICU:**\n• Toxic megacolon\n• Perforation/peritonitis\n• Sepsis/hemodynamic instability\n• Massive GI hemorrhage\n\n**Admit to floor:**\n• Severe UC or Crohn\'s flare\n• Unable to tolerate PO\n• Dehydration requiring IV fluids\n• Need for IV steroids\n• Anemia requiring transfusion\n• Obstruction or abscess\n\n**Discharge:**\n• Mild flare responding to treatment\n• Tolerating PO\n• Stable vital signs\n• Close GI follow-up arranged\n\n**What is the disposition?**',
    options: [
      { label: 'Admit ICU', description: 'Toxic megacolon, sepsis, surgery', next: 'ibd-admit-icu' },
      { label: 'Admit floor', description: 'Severe flare, IV steroids, dehydration', next: 'ibd-admit-floor' },
      { label: 'Discharge', description: 'Mild flare, stable, GI follow-up', next: 'ibd-discharge' },
    ],
    citation: [1],
  },

  {
    id: 'ibd-admit-icu',
    type: 'result',
    module: 6,
    title: 'Admit ICU',
    body: '**ICU Admission:**\n\n**Indications:**\n• Toxic megacolon\n• Perforation or pending surgery\n• Sepsis/shock\n• Massive hemorrhage\n\n**Orders:**\n• NPO, NG tube if indicated\n• IV steroids (hold if septic and no clear benefit)\n• Broad-spectrum antibiotics\n• Aggressive IVF, pressors if needed\n• Serial abdominal exams\n• DVT prophylaxis (mechanical if surgery imminent)\n• Blood products PRN\n\n**Consults:**\n• GI (urgent)\n• Surgery (stat if toxic megacolon, perforation)\n• IR (if abscess needs drainage)\n\n**Monitor for:** Perforation, worsening distension, organ failure.',
    recommendation: 'Admit ICU. NPO, IV steroids if appropriate, broad antibiotics. Surgery and GI consults stat.',
    citation: [5, 6],
  },

  {
    id: 'ibd-admit-floor',
    type: 'result',
    module: 6,
    title: 'Admit Floor',
    body: '**Floor Admission:**\n\n**Orders:**\n• Diet: NPO → clear liquids → low residue as tolerated\n• IV methylprednisolone 40-60mg/day (or hydrocortisone 100mg q8h)\n• IV fluids — correct dehydration\n• DVT prophylaxis (enoxaparin preferred)\n• Daily labs: CBC, CMP, CRP\n• Daily AXR if severe UC (toxic megacolon monitoring)\n• Stool C. diff if not already sent\n\n**GI consult:**\n• Timing of scope\n• Biologic escalation discussion\n• Nutritional support\n\n**Assess response:**\n• Day 3: if not improving, discuss salvage therapy\n• Surgical consult if medical therapy failing\n\n**VTE risk is HIGH** — do not skip prophylaxis.',
    recommendation: 'Admit for IV steroids, IVF. DVT prophylaxis mandatory. GI consult. Daily AXR if severe UC.',
    citation: [1, 3],
  },

  {
    id: 'ibd-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge — Mild Flare',
    body: '**Discharge Criteria:**\n• Mild flare only\n• Tolerating PO\n• Hemodynamically stable\n• No signs of complications\n• C. diff negative (or treated)\n• Reliable with close follow-up\n\n**Prescriptions:**\n• Prednisone 40mg PO daily (if escalating therapy)\n  - Taper per GI guidance (usually over 6-8 weeks)\n• Or optimize 5-ASA if not on maximal dose\n• Antidiarrheals PRN (if no toxic megacolon concern)\n\n**Instructions:**\n• Strict medication adherence\n• Avoid NSAIDs\n• Hydration, low residue diet during flare\n\n**Return immediately for:**\n• Fever, worsening abdominal pain\n• Bloody diarrhea >6x/day\n• Inability to tolerate PO\n• Dizziness or syncope\n\n**Follow-up:** GI within 1-2 weeks.',
    recommendation: 'Discharge with oral steroids or optimized 5-ASA. GI follow-up 1-2 weeks. Written return precautions.',
    citation: [1, 4],
  },

];

// =====================================================================
// Module Labels
// =====================================================================

export const IBD_FLARE_MODULE_LABELS = [
  'Assessment',
  'Severity',
  'Complications',
  'Treatment',
  'Biologics',
  'Disposition',
];

// =====================================================================
// Citations
// =====================================================================

export const IBD_FLARE_CITATIONS: Citation[] = [
  { num: 1, text: 'Rubin DT, et al. ACG Clinical Guideline: Ulcerative Colitis in Adults. Am J Gastroenterol. 2019;114(3):384-413.' },
  { num: 2, text: 'Lichtenstein GR, et al. ACG Clinical Guideline: Management of Crohn\'s Disease in Adults. Am J Gastroenterol. 2018;113(4):481-517.' },
  { num: 3, text: 'Truelove SC, Witts LJ. Cortisone in ulcerative colitis; final report on a therapeutic trial. Br Med J. 1955;2(4947):1041-1048.' },
  { num: 4, text: 'Torres J, et al. ECCO Guidelines on Therapeutics in Crohn\'s Disease: Medical Treatment. J Crohns Colitis. 2020;14(1):4-22.' },
  { num: 5, text: 'Berg DF, et al. Acute surgical emergencies in inflammatory bowel disease. Am J Surg. 2002;184(1):45-51.' },
  { num: 6, text: 'Gan SI, Beck PL. A new look at toxic megacolon: an update and review of incidence, etiology, pathogenesis, and management. Am J Gastroenterol. 2003;98(11):2363-2371.' },
];
