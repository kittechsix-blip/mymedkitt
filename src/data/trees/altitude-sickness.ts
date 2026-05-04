// MedKitt — Altitude Sickness
// ED evaluation and management of acute mountain sickness, HACE, and HAPE
// Sources: Wilderness Medical Society Guidelines 2019, Lake Louise Criteria
// 6 modules: Assessment → AMS → HACE → HAPE → Treatment → Disposition
// ~20 nodes

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const ALTITUDE_SICKNESS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'alt-start',
    type: 'question',
    module: 1,
    title: 'Altitude Sickness — ED Evaluation',
    body: '[Steps Summary](#/info/alt-steps)\n\n**Altitude Illness Spectrum:**\n• **AMS** — Acute Mountain Sickness (mild)\n• **HACE** — High Altitude Cerebral Edema (severe)\n• **HAPE** — High Altitude Pulmonary Edema (severe)\n\n**Key History:**\n• Current and recent altitude exposure\n• Rate of ascent\n• Time at altitude\n• Prior altitude illness\n• Acclimatization attempts\n\n**Risk factors:** Rapid ascent, sleeping at altitude, prior AMS/HACE/HAPE, exertion, dehydration\n\n**What is the presentation?** [1][2]',
    options: [
      { label: 'Headache + GI/fatigue symptoms', description: 'Possible AMS', next: 'alt-ams-assessment' },
      { label: 'Ataxia, confusion, or altered mental status', description: 'Possible HACE', next: 'alt-hace', urgency: 'critical' },
      { label: 'Dyspnea at rest, cough, or hypoxia', description: 'Possible HAPE', next: 'alt-hape', urgency: 'critical' },
      { label: 'Mixed symptoms', description: 'HACE + HAPE can coexist', next: 'alt-hace', urgency: 'critical' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'weight-dose', label: 'Weight Calculator' },
    ],
  },

  // =====================================================================
  // MODULE 2: ACUTE MOUNTAIN SICKNESS
  // =====================================================================

  {
    id: 'alt-ams-assessment',
    type: 'question',
    module: 2,
    title: 'AMS — Lake Louise Criteria',
    body: '**Lake Louise Acute Mountain Sickness Score:**\n\nRecent gain in altitude PLUS headache AND ≥1 of:\n\n| Symptom | 0 | 1 | 2 | 3 |\n|---------|---|---|---|---|\n| Headache | None | Mild | Moderate | Severe |\n| GI symptoms | None | Poor appetite/nausea | Mod nausea/vomiting | Severe |\n| Fatigue/weakness | None | Mild | Moderate | Severe |\n| Dizziness | None | Mild | Moderate | Severe |\n\n**Scoring:**\n• 3-5 = Mild AMS\n• 6+ = Moderate-Severe AMS\n• Any ataxia = HACE (not AMS)\n\n**What is the Lake Louise Score?** [1][3]',
    options: [
      { label: 'Score 3-5 (Mild AMS)', description: 'Headache + minor symptoms', next: 'alt-ams-mild' },
      { label: 'Score 6+ (Moderate-Severe AMS)', description: 'Significant symptoms', next: 'alt-ams-severe' },
      { label: 'Score <3 or no headache', description: 'Does not meet AMS criteria', next: 'alt-other-causes' },
      { label: 'Ataxia present', description: 'This is HACE, not AMS', next: 'alt-hace', urgency: 'critical' },
    ],
    citation: [1, 3],
  },

  {
    id: 'alt-ams-mild',
    type: 'info',
    module: 2,
    title: 'Mild AMS — Management',
    body: '**Mild AMS (Lake Louise 3-5):**\n\n**Treatment:**\n• **STOP ascent** — do not go higher\n• Symptomatic treatment:\n  - Acetaminophen or ibuprofen for headache\n  - Ondansetron for nausea\n• Rest at current altitude\n• Hydration (avoid alcohol)\n\n**Optional medications:**\n• Acetazolamide 125-250mg PO BID (speeds acclimatization)\n• Dexamethasone 4mg PO q6h (if acetazolamide contraindicated)\n\n**When to descend:**\n• Symptoms worsen despite treatment\n• No improvement in 24-48 hours\n• Development of ataxia or altered mental status\n\n**Key point:** AMS is self-limiting if ascent stops. Most improve within 24-72h at same altitude. [1][4]',
    next: 'alt-disposition',
    citation: [1, 4],
  },

  {
    id: 'alt-ams-severe',
    type: 'info',
    module: 2,
    title: 'Moderate-Severe AMS — Management',
    body: '**Moderate-Severe AMS (Lake Louise 6+):**\n\n**Treatment:**\n• **DESCEND** — minimum 500-1000m (1500-3000 ft)\n• Dexamethasone 8mg PO/IM/IV x1, then 4mg q6h\n• Acetazolamide 250mg PO BID\n• Supplemental O2 if available\n• Symptomatic treatment (antiemetics, analgesics)\n\n**If descent impossible:**\n• Portable hyperbaric chamber (Gamow bag)\n• Simulates descent of ~1500-2000m\n• Temporary measure only\n\n**Monitor for progression to HACE:**\n• Ataxia (heel-to-toe walk)\n• Confusion\n• Behavioral changes\n• Decreasing GCS\n\n**Do NOT delay descent if available.** [1][4]',
    next: 'alt-disposition',
    citation: [1, 4],
    safetyLevel: 'warning',
  },

  {
    id: 'alt-other-causes',
    type: 'info',
    module: 2,
    title: 'Does Not Meet AMS Criteria',
    body: '**Consider alternative diagnoses:**\n\n**Common mimics:**\n• Dehydration\n• Exhaustion/overexertion\n• Viral illness (coincidental)\n• Migraine\n• Carbon monoxide poisoning (stoves in tents)\n• Hypothermia\n• Hyponatremia (overhydration)\n\n**Red flags requiring workup:**\n• Focal neurologic signs\n• Fever\n• Neck stiffness\n• Rash\n• No altitude exposure history\n\n**If symptoms persist or worsen:**\n• Reassess for AMS/HACE/HAPE\n• Consider broader workup\n• Low threshold to treat empirically if at altitude [1]',
    next: 'alt-disposition',
    citation: [1],
  },

  // =====================================================================
  // MODULE 3: HACE
  // =====================================================================

  {
    id: 'alt-hace',
    type: 'info',
    module: 3,
    title: 'HACE — High Altitude Cerebral Edema',
    body: '**HACE is a MEDICAL EMERGENCY:**\n\nAMS that has progressed to encephalopathy.\n\n**Diagnostic criteria:**\n• Recent altitude gain\n• Either:\n  - Change in mental status AND/OR\n  - Ataxia in person with AMS\n• OR: Both ataxia AND mental status change (even without AMS history)\n\n**Clinical features:**\n• Truncal ataxia (cannot walk heel-to-toe)\n• Confusion, disorientation\n• Drowsiness progressing to coma\n• Behavioral changes (irritability, combativeness)\n• Hallucinations\n• Papilledema (if can examine)\n\n**Pathophysiology:** Vasogenic cerebral edema from hypoxia-induced BBB disruption.\n\n**Mortality:** Can be fatal within 24 hours if untreated. [1][2][5]',
    next: 'alt-hace-treatment',
    citation: [1, 2, 5],
    safetyLevel: 'critical',
  },

  {
    id: 'alt-hace-treatment',
    type: 'info',
    module: 3,
    title: 'HACE — Treatment',
    body: '**HACE Treatment — Life-Threatening Emergency:**\n\n**Immediate actions:**\n1. **DESCEND IMMEDIATELY** — minimum 1000m (3000 ft)\n   - This is the definitive treatment\n   - Do not wait for medications to work\n2. **Dexamethasone** 8mg IV/IM/PO x1, then 4mg q6h\n3. **Supplemental O2** — maintain SpO2 >90%\n4. Keep patient warm (hypothermia worsens outcome)\n\n**If descent impossible (weather, terrain, nighttime):**\n• Portable hyperbaric chamber (Gamow bag) at 2-4 PSI\n• Temporary measure — still need descent ASAP\n• Continue dexamethasone\n\n**Do NOT give:**\n• Sedatives (mask neurologic decline)\n• Excessive fluids (can worsen edema)\n\n**Evacuation:** Helicopter if available. Patient may need assistance walking. [1][5]',
    next: 'alt-hace-monitoring',
    citation: [1, 5],
    safetyLevel: 'critical',
  },

  {
    id: 'alt-hace-monitoring',
    type: 'info',
    module: 3,
    title: 'HACE — Monitoring & Prognosis',
    body: '**Monitoring:**\n• Neurologic checks q1-2h\n• GCS tracking\n• Pulse oximetry\n• Watch for concurrent HAPE (common)\n\n**Response to descent:**\n• Should improve within hours of descent\n• Full recovery expected if treated promptly\n• Persistent symptoms: consider CT/MRI to rule out other pathology\n\n**CT/MRI findings:**\n• White matter edema (especially corpus callosum)\n• May be normal early\n• Not required for diagnosis if classic presentation\n\n**Return to altitude:**\n• Avoid re-ascent for at least 72 hours after resolution\n• Slower ascent rate required\n• Prophylaxis recommended (acetazolamide or dexamethasone)\n• Some recommend avoiding high altitude permanently after severe HACE [5]',
    next: 'alt-disposition',
    citation: [5],
  },

  // =====================================================================
  // MODULE 4: HAPE
  // =====================================================================

  {
    id: 'alt-hape',
    type: 'info',
    module: 4,
    title: 'HAPE — High Altitude Pulmonary Edema',
    body: '**HAPE is a MEDICAL EMERGENCY:**\n\nNon-cardiogenic pulmonary edema from hypoxic pulmonary vasoconstriction.\n\n**Diagnostic criteria (≥2 symptoms + ≥2 signs):**\n\n**Symptoms:**\n• Dyspnea at rest\n• Cough (dry → productive)\n• Decreased exercise tolerance\n• Chest tightness\n\n**Signs:**\n• Crackles or wheezing\n• Central cyanosis\n• Tachypnea\n• Tachycardia\n\n**Typically occurs:**\n• 2-4 days after arrival at altitude\n• More common >2500m (8000 ft)\n• Often at night (recumbent position)\n\n**Risk factors:** Prior HAPE, rapid ascent, exertion, cold, viral URI, unilateral PA [1][2][6]',
    next: 'alt-hape-treatment',
    citation: [1, 2, 6],
    safetyLevel: 'critical',
  },

  {
    id: 'alt-hape-treatment',
    type: 'info',
    module: 4,
    title: 'HAPE — Treatment',
    body: '**HAPE Treatment — Life-Threatening Emergency:**\n\n**Immediate actions:**\n1. **DESCEND IMMEDIATELY** — minimum 1000m (3000 ft)\n   - Definitive treatment\n   - Patient may need to be carried\n2. **Supplemental O2** — high flow, target SpO2 >90%\n   - Most important intervention if descent delayed\n3. **Minimize exertion** — even walking worsens hypoxia\n4. Keep patient warm\n\n**Medications (adjunctive, do not delay descent):**\n• Nifedipine 30mg SR PO q12h (reduces PAP)\n• Sildenafil 50mg PO q8h (alternative)\n• Tadalafil 10mg PO q12h (alternative)\n\n**If descent impossible:**\n• Hyperbaric chamber + O2\n• Continuous positive airway pressure if available\n\n**Do NOT give:**\n• Diuretics (patient is volume depleted)\n• Dexamethasone alone (does not treat HAPE, but give if HACE coexists) [1][6]',
    next: 'alt-hape-monitoring',
    citation: [1, 6],
    safetyLevel: 'critical',
  },

  {
    id: 'alt-hape-monitoring',
    type: 'info',
    module: 4,
    title: 'HAPE — Monitoring & Prognosis',
    body: '**Monitoring:**\n• Continuous pulse oximetry\n• Work of breathing\n• Mental status (HACE can develop)\n• Response to descent/O2\n\n**Response to treatment:**\n• Dramatic improvement expected within hours of descent\n• Radiographic clearing may take days\n• Full recovery typical if treated promptly\n\n**CXR findings:**\n• Patchy infiltrates (often right > left, perihilar)\n• Kerley B lines\n• May mimic pneumonia\n\n**Labs (if obtained):**\n• ABG: hypoxemia, respiratory alkalosis\n• BNP may be elevated (not heart failure)\n• No infection\n\n**Return to altitude:**\n• Wait until fully recovered (usually 2-3 days)\n• Slower ascent required\n• Nifedipine prophylaxis recommended\n• Some susceptible individuals should avoid high altitude [6]',
    next: 'alt-disposition',
    citation: [6],
  },

  // =====================================================================
  // MODULE 5: PHARMACOLOGY
  // =====================================================================

  {
    id: 'alt-meds',
    type: 'info',
    module: 5,
    title: 'Altitude Medications — Dosing',
    body: '**Acetazolamide (Diamox):**\n• MOA: Carbonic anhydrase inhibitor, induces metabolic acidosis → hyperventilation\n• Prevention: 125-250mg PO BID, start 1 day before ascent\n• Treatment: 250mg PO BID\n• Side effects: Paresthesias, dysgeusia, polyuria\n• CI: Sulfa allergy (relative), severe renal/hepatic disease\n\n**Dexamethasone:**\n• MOA: Reduces vasogenic edema, stabilizes BBB\n• Prevention: 2mg q6h or 4mg q12h\n• AMS treatment: 4mg q6h\n• HACE treatment: 8mg x1, then 4mg q6h\n• Caution: Does not aid acclimatization\n\n**Nifedipine (for HAPE):**\n• MOA: Reduces pulmonary artery pressure\n• Dose: 30mg SR q12h or 20mg SR q8h\n• Use extended-release only\n\n**Sildenafil/Tadalafil (for HAPE):**\n• Alternative to nifedipine\n• Sildenafil 50mg q8h, Tadalafil 10mg q12h [1][4]',
    next: 'alt-disposition',
    citation: [1, 4],
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'alt-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Admit to ICU:**\n• HACE with altered mental status\n• Severe HAPE requiring intubation/high O2\n• Concurrent HACE + HAPE\n• Hemodynamically unstable\n\n**Admit to floor:**\n• Moderate HAPE with O2 requirement\n• HACE responding to treatment\n• Need for observation after descent\n\n**Discharge:**\n• Mild AMS, improved with treatment\n• Patient has descended to safe altitude\n• No hypoxia, normal mental status\n• Can return to lower altitude\n\n**What is the disposition?**',
    options: [
      { label: 'Admit ICU', description: 'HACE/HAPE, unstable, high O2 needs', next: 'alt-admit-icu' },
      { label: 'Admit floor', description: 'Observation, moderate symptoms', next: 'alt-admit-floor' },
      { label: 'Discharge', description: 'Mild AMS, resolved, at low altitude', next: 'alt-discharge' },
    ],
    citation: [1],
  },

  {
    id: 'alt-admit-icu',
    type: 'result',
    module: 6,
    title: 'Admit ICU',
    body: '**ICU Admission — HACE/HAPE:**\n\n**Orders:**\n• Continuous pulse oximetry\n• Neuro checks q1-2h (HACE)\n• Supplemental O2 to maintain SpO2 >90%\n• Dexamethasone 4mg IV q6h (HACE)\n• Nifedipine 30mg SR q12h (HAPE)\n• IV access, labs (CBC, BMP, ABG)\n• CXR\n• CT head if focal neuro signs or not improving\n\n**Avoid:**\n• Excessive IV fluids\n• Sedatives (mask neuro changes)\n\n**Consults:**\n• Pulmonology (HAPE)\n• Neurology (HACE with persistent deficits)\n\n**Expected course:** Should improve significantly within 24-48h with supportive care at low altitude.',
    recommendation: 'Admit ICU for HACE/HAPE. O2 >90%, dexamethasone if HACE, nifedipine if HAPE. Neuro checks. CT head if not improving.',
    citation: [1, 5, 6],
  },

  {
    id: 'alt-admit-floor',
    type: 'result',
    module: 6,
    title: 'Admit Floor — Observation',
    body: '**Floor Admission:**\n\n**Indications:**\n• Moderate HAPE improving on O2\n• HACE responding to dexamethasone\n• Severe AMS requiring monitoring\n• Need for rehydration\n\n**Orders:**\n• Pulse oximetry q4h\n• Neuro checks q4h\n• Continue medications (acetazolamide, dexamethasone)\n• PO intake as tolerated\n• Activity as tolerated\n\n**Discharge criteria:**\n• SpO2 >93% on room air\n• Normal mental status\n• Able to ambulate\n• Symptoms resolved or significantly improved\n• Safe to return to low altitude\n\n**Follow-up:** PCP within 1 week, consider altitude medicine specialist if recurrent.',
    recommendation: 'Admit for observation. O2 PRN, continue acetazolamide/dexamethasone. Discharge when SpO2 >93% RA, asymptomatic.',
    citation: [1],
  },

  {
    id: 'alt-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge — Mild AMS',
    body: '**Discharge Criteria (ALL must be met):**\n• Mild AMS only (Lake Louise 3-5)\n• Improved with treatment/rest\n• SpO2 >93% on room air\n• Normal mental status, no ataxia\n• At low altitude or returning to low altitude\n• Reliable, can return if symptoms worsen\n\n**Discharge Medications:**\n• Acetazolamide 125-250mg PO BID x 2-3 days\n• Ibuprofen or acetaminophen PRN headache\n• Ondansetron PRN nausea\n\n**Instructions:**\n• Do NOT ascend until fully recovered\n• If returning to altitude: ascend slowly (<300m/day above 3000m)\n• Hydrate well, avoid alcohol\n• Consider acetazolamide prophylaxis for future ascents\n\n**Return immediately for:**\n• Confusion or difficulty walking\n• Worsening headache despite meds\n• Shortness of breath at rest\n• Persistent vomiting',
    recommendation: 'Discharge with acetazolamide. Do not re-ascend until recovered. Written return precautions. PCP follow-up PRN.',
    citation: [1, 4],
  },

];

// =====================================================================
// Module Labels
// =====================================================================

export const ALTITUDE_SICKNESS_MODULE_LABELS = [
  'Assessment',
  'AMS',
  'HACE',
  'HAPE',
  'Medications',
  'Disposition',
];

// =====================================================================
// Citations
// =====================================================================

export const ALTITUDE_SICKNESS_CITATIONS: Citation[] = [
  { num: 1, text: 'Luks AM, et al. Wilderness Medical Society Clinical Practice Guidelines for the Prevention and Treatment of Acute Altitude Illness: 2019 Update. Wilderness Environ Med. 2019;30(4S):S3-S18.' },
  { num: 2, text: 'Hackett PH, Roach RC. High-Altitude Illness. N Engl J Med. 2001;345(2):107-114.' },
  { num: 3, text: 'Roach RC, et al. The 2018 Lake Louise Acute Mountain Sickness Score. High Alt Med Biol. 2018;19(1):4-6.' },
  { num: 4, text: 'Luks AM, et al. Acute high-altitude sickness. Eur Respir Rev. 2017;26(143):160096.' },
  { num: 5, text: 'Hackett PH, Yarnell PR, Hill R, et al. High-altitude cerebral edema evaluated with magnetic resonance imaging. JAMA. 1998;280(22):1920-1925.' },
  { num: 6, text: 'Stream JO, Grissom CK. Update on high-altitude pulmonary edema: pathogenesis, prevention, and treatment. Wilderness Environ Med. 2008;19(4):293-303.' },
];
