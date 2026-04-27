// MedKitt — Pediatric Submersion Injuries
// ED evaluation, resuscitation, and disposition for drowning/near-drowning
// 6 modules: Scene/Rescue → Initial Assessment → Resuscitation → Complications → Special Populations → Disposition
// Based on ILCOR/AHA 2020 Guidelines and pediatric drowning literature
export const PEDS_SUBMERSION_CRITICAL_ACTIONS = [
    { text: 'Obtain accurate submersion duration (most important prognostic factor)', nodeId: 'submersion-start' },
    { text: 'Begin CPR immediately if pulseless (prolonged resuscitation may be successful)', nodeId: 'submersion-cpr' },
    { text: 'Warm hypothermic patients before declaring death', nodeId: 'submersion-hypothermia' },
    { text: 'Obtain chest X-ray for all symptomatic submersion patients', nodeId: 'submersion-imaging' },
    { text: 'Observe all symptomatic patients for minimum 4-8 hours', nodeId: 'submersion-observation' },
    { text: 'Admit patients with hypoxia, altered mental status, or respiratory distress', nodeId: 'submersion-dispo' },
    { text: 'Consider child abuse in submersion injuries <1 year or with inconsistent history', nodeId: 'submersion-abuse' },
    { text: 'Provide family support and anticipatory guidance', nodeId: 'submersion-dispo' },
];
export const PEDS_SUBMERSION_NODES = [
    // ===================================================================
    // MODULE 1: Scene Assessment & Rescue Context
    // ===================================================================
    {
        id: 'submersion-start',
        type: 'info',
        module: 1,
        title: 'Pediatric Submersion Injury',
        body: '**Submersion Summary** — resuscitation and disposition pathway.\n\n**Drowning** is the leading cause of injury death in children ages 1-4 and second leading cause ages 5-14.\n\n**Key prognostic factors:**\n• **Submersion duration** — most important predictor\n• Scene CPR and time to ROSC\n• Water temperature (cold water may be protective)\n• Initial GCS and pupil reactivity\n\n**Critical thresholds:**\n• <5 min submersion: generally good outcomes\n• 5-10 min: variable outcomes\n• >10 min: poor prognosis in normothermic patients\n• >25 min in warm water: futility likely\n\n**No "dry drowning" as distinct entity** — delayed complications occur within 4-8 hours of symptomatic presentation.',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'peds-submersion-severity', label: 'Submersion Severity' },
            { id: 'peds-drowning-prognosis', label: 'Outcome Prediction' },
            { id: 'submersion-observation', label: 'Observation Criteria' },
        ],
        next: 'submersion-scene-info',
        summary: 'Leading injury death ages 1-4; submersion duration is key prognostic factor; <5min good, >10min poor; no "dry drowning" entity',
    },
    {
        id: 'submersion-scene-info',
        type: 'question',
        module: 1,
        title: 'Scene Information',
        body: '**Critical history to obtain:**\n\n**Submersion details:**\n• Estimated duration of submersion\n• Water type (fresh vs salt, pool vs natural)\n• Water temperature\n• Witnessed or unwitnessed\n\n**Rescue details:**\n• Time to rescue and extrication\n• CPR at scene (bystander or EMS)\n• Time to first breath/pulse\n\n**Pre-event:**\n• Trauma (diving, fall)?\n• Seizure prior to event?\n• Underlying conditions?\n\nWhat is the patient\'s current status?',
        citation: [1, 3],
        options: [
            { label: 'Cardiac arrest/CPR ongoing', description: 'No pulse, active resuscitation', next: 'submersion-arrest' },
            { label: 'Altered mental status', description: 'GCS <15, obtunded, confused', next: 'submersion-ams' },
            { label: 'Respiratory symptoms only', description: 'Coughing, dyspnea, normal mentation', next: 'submersion-resp-symptoms' },
            { label: 'Asymptomatic', description: 'Normal exam, no symptoms', next: 'submersion-asymptomatic' },
        ],
        summary: 'Obtain submersion duration, water type/temp, scene CPR, time to first breath; stratify by current status',
    },
    // ===================================================================
    // MODULE 2: Initial Assessment & Resuscitation
    // ===================================================================
    {
        id: 'submersion-arrest',
        type: 'info',
        module: 2,
        title: 'Cardiac Arrest Management',
        body: '**Drowning cardiac arrest priorities:**\n\n**Airway first!** Drowning is a respiratory emergency:\n1. Clear airway of water/debris\n2. **5 rescue breaths** before compressions\n3. Then standard PALS CPR 15:2\n\n**Do NOT attempt Heimlich** — aspirated water cannot be expelled\n\n**Defibrillation:**\n• Initial rhythm usually asystole or PEA (hypoxic)\n• VF/pVT rare but shockable if present\n\n**Hypothermia considerations:**\n• If core temp <30°C: limit shocks to 3, hold meds\n• Continue CPR during rewarming\n• "Not dead until warm and dead"\n\n**Resuscitation duration:**\n• Prolonged resuscitation may be appropriate in hypothermia\n• Consider ECMO for refractory arrest with hypothermia',
        citation: [2, 4],
        calculatorLinks: [
            { id: 'peds-drowning-prognosis', label: 'Outcome Prediction' },
        ],
        next: 'submersion-arrest-continue',
        summary: 'Airway first: 5 rescue breaths before compressions; do NOT Heimlich; if cold <30C limit shocks to 3 and hold meds',
        safetyLevel: 'critical',
    },
    {
        id: 'submersion-arrest-continue',
        type: 'question',
        module: 2,
        title: 'Cardiac Arrest — Hypothermia Status',
        body: '**Assess core temperature:**\n\n**Mild hypothermia (32-35°C / 90-95°F):**\n• Standard PALS, active rewarming\n• Medications at standard intervals\n\n**Moderate hypothermia (28-32°C / 82-90°F):**\n• May have bradycardia, AF — often self-correcting\n• Space medication dosing (double intervals)\n\n**Severe hypothermia (<28°C / <82°F):**\n• VF may be refractory\n• Limit to 3 defibrillation attempts until >30°C\n• Withhold IV medications until >30°C\n• Consider ECMO rewarming if available\n\nWhat is the core temperature?',
        citation: [4, 5],
        options: [
            { label: 'Normothermic (>35°C)', description: 'Standard resuscitation', next: 'submersion-rosc-or-term' },
            { label: 'Mild hypothermia (32-35°C)', description: 'Active rewarming, standard PALS', next: 'submersion-mild-hypothermia' },
            { label: 'Moderate/Severe (<32°C)', description: 'Modified resuscitation, consider ECMO', next: 'submersion-severe-hypothermia' },
            { label: 'Unknown temperature', description: 'Obtain rectal/esophageal temp', next: 'submersion-rosc-or-term' },
        ],
    },
    {
        id: 'submersion-mild-hypothermia',
        type: 'info',
        module: 2,
        title: 'Mild Hypothermia Management',
        body: '**Mild hypothermia (32-35°C):**\n\n**Rewarming methods:**\n• Remove wet clothing\n• Warm blankets, forced-air warming (Bair Hugger)\n• Warm IV fluids (38-42°C)\n• Warm humidified oxygen\n\n**Expected rate:** 1-2°C/hour with external methods\n\n**Resuscitation:**\n• Standard PALS medications and dosing\n• Active CPR — do not withhold\n• Defibrillation for VF/pVT\n\n**Monitor for:**\n• "Afterdrop" — core temp may drop during rewarming\n• Rewarming arrhythmias (usually benign)\n• Hyperkalemia (cellular release during rewarming)',
        citation: [4, 5],
        next: 'submersion-rosc-or-term',
        summary: 'Mild 32-35C: standard PALS, active rewarming 1-2C/hr; moderate 28-32C: space med dosing; severe <28C: limit defib, consider ECMO',
    },
    {
        id: 'submersion-severe-hypothermia',
        type: 'info',
        module: 2,
        title: 'Severe Hypothermia Management',
        body: '**Severe hypothermia (<28°C) — "Not dead until warm and dead":**\n\n**Modified resuscitation:**\n• **Limit defibrillation to 3 attempts** until temp >30°C\n• **Withhold IV medications** until temp >30°C\n• Continue high-quality CPR\n\n**Rewarming priority:**\n\n**ECMO/cardiopulmonary bypass (if available):**\n• Gold standard for severe hypothermic arrest\n• Can rewarm at 9-10°C/hour\n• Consider transfer to ECMO center\n\n**If ECMO unavailable:**\n• Warm IV fluids (38-42°C)\n• Warm peritoneal lavage\n• Warm pleural lavage (thoracostomy)\n• Warm bladder irrigation\n\n**Continue CPR during transport** — prolonged resuscitation may be appropriate',
        citation: [4, 5],
        calculatorLinks: [
            { id: 'peds-drowning-prognosis', label: 'Outcome Prediction' },
        ],
        next: 'submersion-rosc-or-term',
        summary: 'Not dead until warm and dead; ECMO gold standard for severe hypothermic arrest; limit defib to 3 until >30C; withhold meds until >30C',
        safetyLevel: 'critical',
    },
    {
        id: 'submersion-rosc-or-term',
        type: 'question',
        module: 2,
        title: 'Resuscitation Outcome',
        body: '**Assess resuscitation progress:**\n\n**Favorable signs:**\n• Return of spontaneous circulation (ROSC)\n• Return of brainstem reflexes\n• Any purposeful movement\n\n**Poor prognostic indicators:**\n• Submersion >25 min in warm water\n• CPR >25 min without ROSC (normothermic)\n• Asystole as initial rhythm (not hypothermic)\n• No pupillary response after rewarming\n• Initial blood pH <6.75\n\n**ILCOR guidance:**\nNo single predictor should be used to determine termination. Consider multiple factors including hypothermia status.\n\nWhat is the resuscitation outcome?',
        citation: [2, 6],
        options: [
            { label: 'ROSC achieved', description: 'Pulse returned, post-arrest care', next: 'submersion-post-arrest' },
            { label: 'Resuscitation ongoing', description: 'Continue efforts', next: 'submersion-arrest-continue' },
            { label: 'Termination considered', description: 'Poor prognostic factors present', next: 'submersion-termination' },
        ],
    },
    {
        id: 'submersion-termination',
        type: 'info',
        module: 2,
        title: 'Termination Considerations',
        body: '**Consider termination when:**\n\n**Multiple poor prognostic factors present:**\n• Warm water submersion >25 minutes\n• Normothermic CPR >25 minutes without ROSC\n• Asystole as initial rhythm (without hypothermia)\n• pH <6.75 on initial ABG\n• Serum K+ >10 mEq/L\n\n**Do NOT terminate if:**\n• Core temperature <30°C (continue until rewarmed)\n• ECMO available and transfer possible\n• Any signs of life during resuscitation\n\n**Family communication:**\n• Involve family early when prognosis poor\n• Allow witnessed resuscitation if appropriate\n• Provide clear, compassionate explanation\n\n**Organ donation consideration if appropriate**',
        citation: [2, 6],
        next: undefined,
    },
    // ===================================================================
    // MODULE 3: Post-ROSC / Critical Care
    // ===================================================================
    {
        id: 'submersion-post-arrest',
        type: 'info',
        module: 3,
        title: 'Post-Arrest Care',
        body: '**Post-ROSC management priorities:**\n\n**Airway & Ventilation:**\n• Maintain intubation, lung-protective ventilation\n• Target SpO2 94-98% (avoid hyperoxia)\n• Avoid hyperventilation (worsens brain injury)\n\n**Circulation:**\n• Target MAP for age-appropriate cerebral perfusion\n• Avoid hypotension\n• Consider vasopressors if needed\n\n**Temperature management:**\n• **Targeted Temperature Management (TTM):**\n  — 32-34°C for 24-72 hours (comatose patients)\n  — Or maintain normothermia 36-37.5°C\n• Avoid hyperthermia (worsens outcomes)\n\n**Neuroprotection:**\n• Treat seizures aggressively\n• Avoid hypoglycemia and hyperglycemia\n• Early neurology consultation',
        citation: [2, 7],
        calculatorLinks: [
            { id: 'peds-gcs', label: 'Pediatric GCS' },
        ],
        next: 'submersion-icu-monitoring',
        summary: 'Target SpO2 94-98% (avoid hyperoxia); TTM 32-34C for comatose; treat seizures aggressively; avoid hypoglycemia/hyperglycemia',
    },
    {
        id: 'submersion-icu-monitoring',
        type: 'info',
        module: 3,
        title: 'ICU Monitoring & Complications',
        body: '**Monitor for complications:**\n\n**Pulmonary:**\n• ARDS — may develop 24-72 hours post-submersion\n• Aspiration pneumonitis/pneumonia\n• Bronchospasm\n\n**Neurologic:**\n• Hypoxic-ischemic encephalopathy\n• Cerebral edema — may worsen at 24-48 hours\n• Seizures (up to 30%)\n\n**Metabolic:**\n• Electrolyte disturbances (usually mild)\n  — Fresh water: hyponatremia (rare)\n  — Salt water: hypernatremia (rare)\n• Acidosis\n• Rhabdomyolysis\n\n**Infectious:**\n• Pneumonia (develops 48-72 hours post-event)\n• Empiric antibiotics only if sewage exposure\n\n**Labs:** ABG, CBC, CMP, lactate, glucose Q4-6h initially',
        citation: [3, 8],
        next: 'submersion-disposition-critical',
    },
    {
        id: 'submersion-disposition-critical',
        type: 'info',
        module: 3,
        title: 'Critical Patient Disposition',
        body: '**ICU admission criteria:**\n\n**Mandatory ICU admission:**\n• Post-cardiac arrest\n• Intubated/mechanically ventilated\n• GCS <13\n• Hemodynamic instability\n• Significant respiratory failure\n• Hypothermia requiring active rewarming\n\n**Transfer to higher level of care if:**\n• ECMO capability needed\n• Pediatric intensivist not available\n• Neurosurgical intervention anticipated\n\n**Prognosis communication:**\n• MRI at 3-5 days is best predictor of neurologic outcome\n• EEG for seizure monitoring\n• Avoid early prognostication (<72 hours)',
        citation: [6, 7],
        next: undefined,
    },
    // ===================================================================
    // MODULE 4: Altered Mental Status / Respiratory Symptoms
    // ===================================================================
    {
        id: 'submersion-ams',
        type: 'info',
        module: 4,
        title: 'Altered Mental Status',
        body: '**Patient with altered mentation post-submersion:**\n\n**Immediate assessment:**\n• Airway: Protected? Gag intact?\n• Breathing: Hypoxic? Work of breathing?\n• Circulation: Perfusion, heart rate, BP\n\n**Consider intubation if:**\n• GCS ≤8\n• Unable to protect airway\n• Severe hypoxia despite supplemental O2\n• Anticipated deterioration\n\n**Workup:**\n• Continuous SpO2, cardiac monitoring\n• ABG/VBG\n• Glucose (hypoglycemia as cause)\n• Consider CT head if trauma suspected\n\n**Do NOT attribute AMS solely to drowning** — rule out:\n• Hypoglycemia\n• Seizure (pre-drowning)\n• Head trauma\n• Toxic ingestion',
        citation: [1, 3],
        calculatorLinks: [
            { id: 'peds-gcs', label: 'Pediatric GCS' },
        ],
        next: 'submersion-ams-management',
    },
    {
        id: 'submersion-ams-management',
        type: 'question',
        module: 4,
        title: 'AMS Management Pathway',
        body: '**Assess severity and trajectory:**\n\n**Improving mental status:**\n• Serial neuro exams Q15-30 min\n• Continuous monitoring\n• Supportive care\n\n**Static or worsening:**\n• Intubation for airway protection\n• Consider head CT\n• ICU admission\n\n**Key interventions:**\n• High-flow O2 or intubation if needed\n• Treat seizures: [Lorazepam](#/drug/lorazepam/seizure) + AED load\n• Avoid hyperthermia\n• Correct glucose abnormalities\n\nWhat is the clinical trajectory?',
        citation: [3, 7],
        options: [
            { label: 'Improving/Stable GCS >8', description: 'Observation with close monitoring', next: 'submersion-observation-admit' },
            { label: 'GCS ≤8 or worsening', description: 'Intubate, ICU admission', next: 'submersion-post-arrest' },
            { label: 'Seizing', description: 'Seizure management needed', next: 'submersion-seizures' },
        ],
    },
    {
        id: 'submersion-seizures',
        type: 'info',
        module: 4,
        title: 'Seizure Management',
        body: '**Post-submersion seizures:**\n\n**First-line:** [Lorazepam](#/drug/lorazepam/seizure)\n• 0.1 mg/kg IV (max 4 mg)\n• May repeat x1 in 5 minutes\n\n**Second-line:** [Levetiracetam](#/drug/levetiracetam/seizure)\n• 60 mg/kg IV (max 4500 mg)\n• OR fosphenytoin 20 mg PE/kg\n\n**Refractory status:**\n• Intubate if not already\n• Midazolam or propofol infusion\n• Neurology consultation\n\n**Important considerations:**\n• Seizures may be due to hypoxic-ischemic injury\n• Also consider: hypoglycemia, hyponatremia, trauma\n• Aggressive treatment — seizures worsen brain injury\n• Continuous EEG monitoring in ICU',
        citation: [7],
        next: 'submersion-post-arrest',
    },
    {
        id: 'submersion-resp-symptoms',
        type: 'info',
        module: 4,
        title: 'Respiratory Symptoms',
        body: '**Patient with respiratory symptoms, normal mentation:**\n\n**Common symptoms:**\n• Cough (most common)\n• Dyspnea/tachypnea\n• Wheezing/crackles\n• Chest discomfort\n\n**Assessment:**\n• Vital signs including SpO2 on room air\n• Work of breathing\n• Auscultation (often abnormal initially)\n\n**Workup:**\n• SpO2 on room air\n• Consider CXR (often normal initially)\n• ABG/VBG if significant hypoxia\n\n**Pathophysiology:**\n• Surfactant washout → atelectasis\n• Noncardiogenic pulmonary edema\n• Both salt and fresh water cause similar injury\n• 1-3 mL/kg aspiration causes significant injury',
        citation: [3, 8],
        next: 'submersion-resp-treatment',
    },
    {
        id: 'submersion-resp-treatment',
        type: 'question',
        module: 4,
        title: 'Respiratory Treatment',
        body: '**Supplemental oxygen and monitoring:**\n\n**Mild symptoms (SpO2 >94% on room air):**\n• Supplemental O2 PRN\n• Observation 4-6 hours\n• Serial exams\n\n**Moderate symptoms (SpO2 90-94%, mild distress):**\n• Supplemental O2 to maintain SpO2 >94%\n• Consider CPAP/BiPAP\n• Prolonged observation or admission\n\n**Severe symptoms (SpO2 <90%, significant distress):**\n• High-flow O2 or NIPPV\n• Consider intubation if failing\n• ARDS-protocol ventilation if intubated\n\n**What NOT to use routinely:**\n• Diuretics (pulmonary edema is NOT fluid overload)\n• Steroids (unless bronchospasm)\n• Empiric antibiotics (unless sewage exposure)\n\nWhat is the respiratory status?',
        citation: [3, 8],
        options: [
            { label: 'Mild (SpO2 >94% RA, mild cough)', description: 'Observation candidate', next: 'submersion-observation-ed' },
            { label: 'Moderate (O2 requirement)', description: 'Admit for observation', next: 'submersion-observation-admit' },
            { label: 'Severe (respiratory failure)', description: 'ICU, consider intubation', next: 'submersion-post-arrest' },
        ],
    },
    // ===================================================================
    // MODULE 5: Asymptomatic Patient
    // ===================================================================
    {
        id: 'submersion-asymptomatic',
        type: 'info',
        module: 5,
        title: 'Asymptomatic Patient',
        body: '**Asymptomatic after submersion event:**\n\n**Good prognostic signs:**\n• Normal mental status (GCS 15)\n• Normal respiratory exam\n• SpO2 ≥95% on room air\n• Normal vital signs\n• Brief submersion (<5 min)\n\n**"Secondary drowning" myth:**\n• No evidence for delayed deterioration in truly asymptomatic patients\n• Complications manifest within 4-8 hours if they occur\n• Patient symptomatic at >8 hours extremely unlikely to be drowning-related\n\n**However, monitor if:**\n• Submersion >1 minute\n• Any CPR required\n• Any symptoms at any point\n• Concerning mechanism',
        citation: [3, 9],
        calculatorLinks: [
            { id: 'submersion-observation', label: 'Observation Criteria' },
        ],
        next: 'submersion-observation-ed',
        summary: 'Asymptomatic with GCS 15 and SpO2 >=95%: no delayed deterioration if truly asymptomatic; complications within 4-8 hours',
    },
    // ===================================================================
    // MODULE 6: Disposition
    // ===================================================================
    {
        id: 'submersion-observation-ed',
        type: 'info',
        module: 6,
        title: 'ED Observation Criteria',
        body: '**ED observation for low-risk patients:**\n\n**Observe for 4-8 hours if:**\n• GCS 15, normal mentation throughout\n• SpO2 ≥95% on room air at 4-6 hours\n• Normal vital signs\n• No respiratory symptoms or symptoms resolving\n• Adequate home observation possible\n\n**Safe discharge criteria at 4-8 hours:**\n• Asymptomatic throughout observation\n• Normal SpO2 on room air\n• Normal respiratory exam\n• Reliable caregiver for home observation\n\n**Return precautions:**\n• Any difficulty breathing\n• Persistent cough\n• Drowsiness or confusion\n• Vomiting\n• Fever',
        citation: [9, 10],
        calculatorLinks: [
            { id: 'submersion-observation', label: 'Observation Criteria' },
        ],
        next: 'submersion-discharge-criteria',
        summary: 'Observe 4-8h; safe discharge if asymptomatic throughout, normal SpO2 RA, normal resp exam, reliable caregiver',
    },
    {
        id: 'submersion-observation-admit',
        type: 'info',
        module: 6,
        title: 'Admission Criteria',
        body: '**Admit for observation if:**\n\n**Clinical indicators:**\n• Any persistent respiratory symptoms\n• Oxygen requirement (even minimal)\n• Abnormal chest X-ray\n• GCS <15 at any point\n• Prolonged submersion (>5 min)\n• Required CPR at scene\n• Concerning trajectory during ED observation\n\n**Disposition options:**\n\n**Floor/Observation unit:**\n• Stable vitals, improving\n• Minimal O2 requirement\n• GCS 14-15\n\n**ICU:**\n• GCS <14\n• Significant O2 requirement\n• Hemodynamic instability\n• Post-arrest\n• Anticipated deterioration',
        citation: [9, 10],
        next: undefined,
    },
    {
        id: 'submersion-discharge-criteria',
        type: 'info',
        module: 6,
        title: 'Discharge Criteria',
        body: '**Safe for discharge if ALL present:**\n\n**Clinical criteria:**\n• Normal mental status throughout\n• SpO2 ≥95% on room air at 4-6 hours\n• Normal respiratory exam\n• No persistent symptoms\n• Normal or unchanged chest X-ray (if obtained)\n\n**Social criteria:**\n• Reliable caregiver present\n• Able to return within 1 hour if needed\n• Understanding of return precautions\n• No child safety concerns\n\n**Discharge instructions:**\n• Watch for: difficulty breathing, persistent cough, drowsiness, vomiting, fever\n• Return immediately for any of above\n• Follow-up with PCP in 24-48 hours\n• Water safety counseling',
        citation: [9, 10],
        calculatorLinks: [
            { id: 'submersion-observation', label: 'Observation Criteria' },
        ],
        next: undefined,
    },
];
export const PEDS_SUBMERSION_CITATIONS = [
    { num: 1, text: 'Szpilman D, et al. Drowning. N Engl J Med. 2012;366(22):2102-2110.' },
    { num: 2, text: 'Topjian AA, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 AHA Guidelines. Circulation. 2020;142(16 Suppl 2):S469-S523.' },
    { num: 3, text: 'StatPearls. Drowning: Clinical Management. NCBI Bookshelf. 2024.' },
    { num: 4, text: 'Truhlář A, et al. European Resuscitation Council Guidelines: Cardiac arrest in special circumstances. Resuscitation. 2015;95:148-201.' },
    { num: 5, text: 'Brown DJ, et al. Accidental hypothermia. N Engl J Med. 2012;367(20):1930-1938.' },
    { num: 6, text: 'Kieboom JK, et al. Outcome after resuscitation beyond 30 minutes in drowned children. Pediatrics. 2015;136(2):e400-e410.' },
    { num: 7, text: 'Fink EL, et al. Targeted temperature management after pediatric cardiac arrest. Pediatr Crit Care Med. 2021;22(1):e21-e33.' },
    { num: 8, text: 'Brenner RA, et al. The epidemiology of drowning. Pediatrics. 2003;112(2):440-445.' },
    { num: 9, text: 'Causey AL, et al. Predicting discharge in uncomplicated near-drowning. Am J Emerg Med. 2000;18(1):9-11.' },
    { num: 10, text: 'Cohen N, et al. Duration of observation after submersion injury. Ann Emerg Med. 2021;77(6):651-659.' },
];
export const PEDS_SUBMERSION_NODE_COUNT = PEDS_SUBMERSION_NODES.length;
export const PEDS_SUBMERSION_MODULE_LABELS = ['Scene/Rescue', 'Resuscitation', 'Post-Arrest/Critical', 'AMS/Respiratory', 'Asymptomatic', 'Disposition'];
