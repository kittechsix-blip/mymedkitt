// myMedKitt — Psychogenic Nonepileptic Seizures (PNES) / Functional Seizures
// ED Recognition → Avoid Iatrogenic Harm → Semiologic Features → Diagnosis Communication →
// Safety Planning → Disposition & Follow-up.
// 32 nodes, 6 modules. Category: Emergency Medicine.
// Primary sources:
//   - AAN/ILAE Practice Guideline: Management of Functional Seizures (Neurology 2024)
//   - Avbersek A, Bhattacharya M. Dissociative seizures in the emergency room. BMC Emerg Med. 2024
//   - Bacchi S, et al. Minimising harm: avoiding intubation for PNES. MJA. 2024;220(7):347-349
//   - Popkirov S, et al. Acta Epileptol. 2020 — First-line ED management of PNES
//   - Meta-analysis: Using Semiology to Classify ES vs PNES. JAMA Neurology 2022
//   - LaFrance WC Jr, et al. Cognitive behavioral therapy for PNES. JAMA Psychiatry 2014
//   - Cleveland Clinic Journal of Medicine 2022 — PNES: An empathetic, practical approach
export const PNES_CRITICAL_ACTIONS = [
    { text: 'Do NOT give benzodiazepines for suspected PNES — 26% adverse effects including respiratory depression', nodeId: 'pnes-avoid-harm' },
    { text: 'Do NOT intubate — associated with worse short-term and long-term outcomes, including death', nodeId: 'pnes-avoid-harm' },
    { text: 'Look for positive semiologic signs: eye closure, asynchronous movements, preserved awareness', nodeId: 'pnes-semiology' },
    { text: '10-30% of PNES patients also have epilepsy — do not assume all seizures are functional', nodeId: 'pnes-comorbid-epilepsy' },
    { text: 'Communicate diagnosis with empathy — "real seizures, different mechanism, treatable"', nodeId: 'pnes-communication' },
    { text: 'Arrange neurology follow-up and mental health referral — CBT reduces seizure frequency by 50-60%', nodeId: 'pnes-disposition' },
];
export const PNES_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION & INITIAL APPROACH
    // =====================================================================
    {
        id: 'pnes-start',
        type: 'info',
        module: 1,
        title: 'Functional Seizures (PNES)',
        body: '**Psychogenic nonepileptic seizures (PNES)**, now preferably called **functional seizures** or **dissociative seizures**, are paroxysmal episodes that resemble epileptic seizures but are NOT caused by abnormal electrical brain activity. [1][2]\n\n**Epidemiology:**\n• 5-10% of epilepsy outpatients, 20-40% of epilepsy inpatients\n• 11-27% of ED "seizure" presentations\n• 70% female, peak age 20-40 years\n• Mean diagnostic delay: **7.2 years**\n\n**Key Point:** These are **real seizures** — patients are not faking. PNES are classified as functional neurological disorder (FND) / conversion disorder under DSM-5. The brain\'s "software" is malfunctioning, not its "hardware."\n\n**This consult covers:**\n• Module 1: Recognition & Initial Approach\n• Module 2: Avoiding Iatrogenic Harm\n• Module 3: Semiologic Features\n• Module 4: Diagnosis Communication\n• Module 5: Safety & Comorbidities\n• Module 6: Disposition & Follow-up',
        citation: [1, 2, 3],
        next: 'pnes-red-flags',
        summary: '5-10% of epilepsy patients. 7-year diagnostic delay. Real seizures — not faking.',
        skippable: true,
    },
    {
        id: 'pnes-red-flags',
        type: 'question',
        module: 1,
        title: 'Rule Out Dangerous Mimics First',
        body: '**Before considering PNES, exclude life-threatening conditions:**\n\n🚩 **True Status Epilepticus:**\n• Continuous seizure >5 min or recurrent without recovery\n• Tongue bite (lateral, not tip)\n• Incontinence + prolonged postictal confusion\n• If ANY doubt → treat as epileptic seizure\n\n🚩 **Syncope / Cardiac:**\n• Convulsive syncope can mimic seizure\n• Check ECG if concern for arrhythmia\n\n🚩 **Hypoglycemia:**\n• Always check fingerstick glucose\n\n🚩 **Toxic/Metabolic:**\n• Drug intoxication, withdrawal\n• Hyponatremia, uremia, hepatic encephalopathy\n\n🚩 **CNS Pathology:**\n• Consider if focal deficits, fever, headache\n\n**Clinical pearl:** If uncertain between PNES and epileptic seizure, it is SAFER to initially treat as epileptic seizure. However, if high suspicion for PNES based on semiologic features (see next), withhold benzodiazepines.',
        citation: [1, 4],
        options: [
            {
                label: 'Red flags present — treat as epileptic seizure',
                description: 'Status epilepticus protocol',
                next: 'pnes-defer-to-epilepsy',
                urgency: 'critical',
            },
            {
                label: 'No red flags — suspected PNES',
                description: 'Proceed to avoid iatrogenic harm',
                next: 'pnes-avoid-harm',
            },
        ],
        summary: 'Rule out status epilepticus, syncope, hypoglycemia, toxic/metabolic, CNS pathology first.',
    },
    {
        id: 'pnes-defer-to-epilepsy',
        type: 'info',
        module: 1,
        title: 'Treat as Epileptic Seizure',
        body: '**If red flags present or diagnostic uncertainty, treat as epileptic seizure.**\n\nSee [Status Epilepticus](#/tree/status-epilepticus) consult for management.\n\n**Key points:**\n• Benzodiazepines are first-line for status epilepticus\n• Airway protection if prolonged seizure\n• Monitor for complications\n\n**After stabilization:**\n• If seizure features were atypical, reconsider PNES\n• Video-EEG monitoring may be needed to differentiate\n• Neurology consultation recommended\n\n**Remember:** 10-30% of PNES patients ALSO have epilepsy. A single patient can have both epileptic seizures and functional seizures.',
        citation: [1, 5],
        next: undefined,
        summary: 'If uncertain, treat as epileptic seizure first. PNES and epilepsy can coexist (10-30%).',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 2: AVOIDING IATROGENIC HARM
    // =====================================================================
    {
        id: 'pnes-avoid-harm',
        type: 'info',
        module: 2,
        title: 'Avoid Iatrogenic Harm',
        body: '**Misdiagnosis of PNES as status epilepticus causes significant harm.** [3][4]\n\n**DO NOT give benzodiazepines for suspected PNES:**\n• 26% adverse effect rate in RAMPART/ESETT trials when given to PNES patients [3]\n• Respiratory depression requiring intervention\n• 1 in 5 PNES patients given benzos were admitted to ICU\n• Cumulative dosing worsens outcomes\n\n**DO NOT intubate:**\n• Associated with prolonged hospitalization\n• Higher rates of subsequent PNES-related hospitalizations\n• **Deaths reported** from attempted intubation for PNES [3]\n\n**DO NOT escalate anti-seizure medications:**\n• ASMs are ineffective for PNES\n• Expose patients to unnecessary side effects\n• Delay appropriate psychiatric treatment\n\n**Safe initial approach:**\n• Ensure patient safety (side rails, remove hazards)\n• Observe and document semiology\n• Speak calmly: "You are safe, we are here to help"\n• Time the event — PNES often last longer than epileptic seizures (>2 min)',
        citation: [3, 4],
        next: 'pnes-safe-observation',
        summary: 'No benzos (26% adverse effects). No intubation (deaths reported). No ASM escalation.',
        safetyLevel: 'warning',
    },
    {
        id: 'pnes-safe-observation',
        type: 'info',
        module: 2,
        title: 'Safe Observation Approach',
        body: '**During the event — supportive observation:**\n\n**Safety measures:**\n• Side rails up, remove nearby hazards\n• Do NOT restrain — may worsen event\n• Protect head from injury (pillow, cushion)\n• Do NOT put anything in mouth\n\n**Verbal reassurance:**\n• Speak calmly: "You are safe. I am Dr. [name]. You are in the emergency room."\n• Avoid alarming language\n• Do NOT suggest the patient is faking\n\n**Document semiology** (see next module):\n• Eye position (open vs closed)\n• Movement pattern (synchronous vs asynchronous)\n• Duration\n• Responsiveness during event\n• Recovery pattern\n\n**Video recording:**\n• If possible, video record the event (with family consent)\n• Invaluable for neurology review\n• Can be compared to prior events\n\n**Most PNES episodes resolve spontaneously within 2-15 minutes.**',
        citation: [1, 4],
        next: 'pnes-semiology',
        summary: 'Safety measures, verbal reassurance, document semiology, video record if possible.',
    },
    // =====================================================================
    // MODULE 3: SEMIOLOGIC FEATURES
    // =====================================================================
    {
        id: 'pnes-semiology',
        type: 'info',
        module: 3,
        title: 'Semiologic Signs Overview',
        body: '**No single sign is pathognomonic.** However, certain features strongly favor PNES over epileptic seizures. [5][6]\n\n**High specificity for PNES (PLR >5):**\n\n| Sign | Positive Likelihood Ratio |\n|------|---------------------------|\n| **Ictal eye closure** | **40.5** |\n| **Asynchronous movements** | **10.2** |\n| **Ictal weeping/crying** | **8.2** |\n| Fluctuating course | High |\n| Side-to-side head shaking | High |\n| Hip thrusting | High |\n\n**Suggestive of PNES:**\n• Long duration (>2 minutes)\n• Gradual onset/offset\n• Preserved awareness during bilateral motor activity\n• Pelvic thrusting\n• Postictal recall of information presented during event\n• Eye fluttering\n• Event intensity modulated by bystanders\n\n**Suggestive of epileptic seizure:**\n• **Ictal head version** (PLR 5.0)\n• Abrupt onset\n• **Ictal eye-opening**\n• Postictal confusion/sleep\n\n[PNES Semiologic Checklist](#/info/pnes-semiology-checklist) — printable assessment tool',
        citation: [5, 6],
        next: 'pnes-eye-closure',
        summary: 'Eye closure PLR 40.5, asynchronous movements PLR 10.2, ictal weeping PLR 8.2.',
    },
    {
        id: 'pnes-eye-closure',
        type: 'info',
        module: 3,
        title: 'Ictal Eye Closure — Key Sign',
        body: '**Ictal eye closure is the MOST predictive sign of PNES.** [5][6]\n\n**Positive Likelihood Ratio: 40.5**\n\n**What to observe:**\n• Eyes **forcibly closed** during the event\n• Resistance to passive eye opening\n• May have flutter or rapid blinking\n\n**Why it matters:**\n• Epileptic seizures typically cause eye **opening** at onset\n• Tonic/clonic seizures: eyes deviated upward or to one side, **open**\n• Temporal lobe seizures: staring with **open** eyes\n\n**Clinical pearl:**\nIf a patient\'s eyes are closed during bilateral motor activity, PNES is much more likely than epileptic seizure.\n\n**Caution:**\n• Not 100% specific — some frontal lobe seizures can have eye closure\n• Use in combination with other semiologic features\n• Do not rely on any single sign alone',
        citation: [5, 6],
        next: 'pnes-movements',
        summary: 'Eye closure during seizure: PLR 40.5 for PNES. Epileptic seizures usually have eyes OPEN.',
    },
    {
        id: 'pnes-movements',
        type: 'info',
        module: 3,
        title: 'Movement Patterns',
        body: '**Asynchronous limb movements strongly favor PNES.** [5][6]\n\n**PNES movement patterns:**\n• **Asynchronous** — limbs move out of phase with each other (PLR 10.2)\n• **Side-to-side head shaking** — "no-no" pattern\n• **Pelvic thrusting** — though can occur in frontal lobe epilepsy\n• **Opisthotonus (back arching)** — "arc de cercle"\n• **Trembling/shaking** — non-rhythmic\n• **Fluctuating intensity** — waxing and waning\n\n**Epileptic seizure patterns:**\n• **Synchronous** — both sides move together in rhythm\n• **Tonic → clonic evolution** — stiffening then rhythmic jerking\n• **Clonic movements slow** toward end of seizure\n• **Stereotyped** — same pattern each time\n• **Brief** — typically 60-90 seconds for GTC\n\n**Duration:**\n• PNES: often >2 minutes, can last 10-30+ minutes\n• Epileptic GTC: typically 60-90 seconds\n\n**Important:** Frontal lobe seizures can have bizarre movements and be mistaken for PNES. They are typically brief (<30 sec), stereotyped, and can occur from sleep.',
        citation: [5, 6],
        next: 'pnes-awareness',
        summary: 'Asynchronous movements PLR 10.2. PNES longer (>2 min), fluctuating. Epileptic: synchronous, brief.',
    },
    {
        id: 'pnes-awareness',
        type: 'info',
        module: 3,
        title: 'Awareness & Responsiveness',
        body: '**Preserved awareness during bilateral motor activity strongly suggests PNES.** [5][6]\n\n**Testing during event (if safe):**\n• Call patient\'s name — do they respond?\n• Give a simple command: "Squeeze my hand"\n• Present a word or object — can they recall it postictally?\n\n**PNES features:**\n• **Preserved awareness** during bilateral limb movements\n• Can follow commands during event\n• **Postictal recall** of information presented during event\n• Rapid return to baseline after event\n• Can remember things said during event\n\n**Epileptic seizure features:**\n• **Impaired awareness** during bilateral tonic-clonic activity\n• Cannot follow commands\n• **No recall** of ictal period\n• Prolonged postictal confusion (minutes to hours)\n• Postictal sleep/drowsiness\n\n**Clinical pearl:**\nIf a patient is having bilateral shaking but can squeeze your hand on command, this strongly suggests PNES.',
        citation: [5, 6],
        next: 'pnes-other-features',
        summary: 'Preserved awareness + bilateral motor = PNES. Epileptic: impaired awareness, postictal confusion.',
    },
    {
        id: 'pnes-other-features',
        type: 'info',
        module: 3,
        title: 'Other Distinguishing Features',
        body: '**Additional features to assess:** [5][6]\n\n**Ictal crying/weeping** (PLR 8.2):\n• Emotional vocalization during or after event\n• Very rare in epileptic seizures\n\n**Stuttering/stammering:**\n• Suggests PNES\n• True aphasic speech arrest is different\n\n**Gradual onset:**\n• PNES often build up slowly\n• Epileptic seizures usually have abrupt onset\n\n**Modulation by bystanders:**\n• Seizure intensity changes when attention is given/withdrawn\n• Suggests functional mechanism\n\n**PNES does NOT occur from sleep:**\n• Event from apparent "sleep" but with awake-pattern EEG = PNES\n• True epileptic seizures CAN occur from sleep\n\n**Features that do NOT distinguish:**\n• ❌ Urinary incontinence — occurs in both\n• ❌ Tongue biting (lateral tip) — occurs in both\n• ❌ Back arching — occurs in both\n• ❌ Aura — occurs in both\n\n**Remember:** No single feature is diagnostic. Use the overall clinical picture.',
        citation: [5, 6],
        next: 'pnes-history',
        summary: 'Ictal crying PLR 8.2. Incontinence/tongue bite do NOT distinguish. PNES not from true sleep.',
    },
    {
        id: 'pnes-history',
        type: 'info',
        module: 3,
        title: 'Historical Features',
        body: '**History features suggestive of PNES:** [1][2][7]\n\n**Demographic:**\n• Female (70%)\n• Young adult (peak 20-40 years)\n• History of other functional symptoms (chronic pain, fibromyalgia, IBS)\n\n**Psychiatric history:**\n• Depression, anxiety, PTSD (very common)\n• History of trauma (30-40%) — but do NOT ask directly in ED\n• Borderline personality disorder\n• Somatization\n• Prior conversion symptoms\n\n**Seizure history:**\n• Refractory to multiple ASMs\n• Events triggered by stress, conflict, specific situations\n• Events only when others are present\n• Very frequent events (multiple per day)\n• No nocturnal events (unless pseudosleep)\n\n**Prior workup:**\n• Normal EEGs despite frequent events\n• Normal MRI\n• Prior video-EEG capturing "typical event" without epileptiform activity\n\n**Important:** History alone cannot diagnose PNES. Video-EEG remains gold standard.',
        citation: [1, 2, 7],
        next: 'pnes-comorbid-epilepsy',
        summary: 'Female, 20-40yo, psychiatric comorbidity, refractory to ASMs, stress-triggered, no nocturnal events.',
    },
    {
        id: 'pnes-comorbid-epilepsy',
        type: 'info',
        module: 3,
        title: 'PNES + Epilepsy Comorbidity',
        body: '**10-30% of PNES patients ALSO have epilepsy.** [1][5]\n\n**Clinical implications:**\n• Cannot assume ALL seizures in a PNES patient are functional\n• Must distinguish which events are epileptic vs functional\n• ASMs may still be needed for comorbid epilepsy\n\n**How to approach:**\n• Ask: "Do all your seizures look the same?"\n• Compare current event to prior documented events\n• Review prior video-EEG reports if available\n• Consider that new-onset different seizure type may be epileptic\n\n**Situations requiring caution:**\n• Known epilepsy patient with "different" seizure type\n• PNES patient with new nocturnal events\n• Prolonged postictal confusion (atypical for their PNES)\n• Injury during event (tongue bite, fall with fracture)\n\n**Video-EEG monitoring:**\n• Gold standard for differentiating\n• Captures typical event with simultaneous EEG\n• Helps identify which events are epileptic vs functional\n\n**Neurology referral essential for these patients.**',
        citation: [1, 5],
        next: 'pnes-diagnosis-certainty',
        summary: '10-30% have both PNES and epilepsy. Cannot assume all seizures are functional.',
    },
    // =====================================================================
    // MODULE 4: DIAGNOSIS COMMUNICATION
    // =====================================================================
    {
        id: 'pnes-diagnosis-certainty',
        type: 'question',
        module: 4,
        title: 'Diagnostic Certainty',
        body: '**Determine your level of diagnostic certainty:** [1][8]\n\n**Gold standard:** Video-EEG capturing typical event with no epileptiform activity and history/semiology consistent with PNES.\n\n**In the ED, you can achieve:**\n\n• **Possible PNES** — suggestive history and semiologic features, no video-EEG\n• **Probable PNES** — witnessed event with multiple positive semiologic signs (eye closure, asynchronous movements, preserved awareness), suggestive history, no features of epileptic seizure\n• **Established PNES** — prior video-EEG documented diagnosis\n\n**For established PNES (known diagnosis):**\n• 31% of ED PNES visits are patients with known diagnosis [4]\n• Use EMR best practice alerts if available\n• Review prior documentation of semiology\n• Communicate with patient\'s neurologist if possible\n\n**Select your scenario:**',
        citation: [1, 8],
        options: [
            {
                label: 'Established PNES — prior video-EEG diagnosis',
                description: 'Confirmed diagnosis, avoid iatrogenic harm',
                next: 'pnes-established',
            },
            {
                label: 'Suspected PNES — no prior video-EEG',
                description: 'Communicate with appropriate uncertainty',
                next: 'pnes-communication',
            },
        ],
        summary: 'Gold standard = video-EEG. ED can achieve "possible" or "probable" PNES diagnosis.',
    },
    {
        id: 'pnes-established',
        type: 'info',
        module: 4,
        title: 'Established PNES Diagnosis',
        body: '**For patients with established PNES diagnosis:** [4]\n\n**Verify the diagnosis:**\n• Review EMR for prior video-EEG report\n• Confirm current event matches their typical semiology\n• Ask patient: "Does this feel like your usual seizures?"\n\n**Management:**\n• Supportive observation — no benzos, no intubation\n• Verbal reassurance during event\n• Brief period of observation post-event\n\n**If event is DIFFERENT from usual:**\n• Consider epileptic seizure (10-30% have both)\n• May need new evaluation\n• Lower threshold for ED workup\n\n**EMR best practice alerts:**\n• If your institution has BPAs for PNES patients, follow them\n• Studies show BPAs reduce iatrogenic interventions by 50%+ [4]\n\n**Focus of ED visit:**\n• Why did they come in today?\n• Is something different?\n• Are they adhering to therapy (CBT, mental health follow-up)?\n• Any new stressors or safety concerns?',
        citation: [4],
        next: 'pnes-safety-assessment',
        summary: 'Verify diagnosis, confirm typical semiology, supportive care, assess why they came in today.',
    },
    {
        id: 'pnes-communication',
        type: 'info',
        module: 4,
        title: 'Communicating the Diagnosis',
        body: '**How you communicate the diagnosis significantly impacts outcomes.** [7][8]\n\n**Key messages:**\n\n1. **"Your seizures are REAL"**\n   • "I can see these events are distressing and real."\n   • "You are not making this up or faking."\n\n2. **"This is a recognized medical condition"**\n   • "This is called functional seizures (or psychogenic nonepileptic seizures)."\n   • "It\'s related to how your brain processes stress and emotions."\n   • "Think of it like your brain\'s software, not hardware."\n\n3. **"This is TREATABLE"**\n   • "The good news is that this condition responds well to treatment."\n   • "Therapy, particularly cognitive behavioral therapy, helps most people."\n   • "Many patients have significant improvement or complete resolution."\n\n4. **"Epilepsy medications won\'t help"**\n   • "Seizure medications work by changing brain electrical activity."\n   • "Your seizures aren\'t caused by abnormal electrical activity, so those medications won\'t help and can cause side effects."\n\n**Avoid:**\n❌ "It\'s all in your head"\n❌ "There\'s nothing wrong with you"\n❌ "It\'s just stress"\n❌ "You\'re faking"',
        citation: [7, 8],
        next: 'pnes-communication-script',
        summary: 'Real seizures, recognized condition, treatable with therapy. Avoid minimizing language.',
    },
    {
        id: 'pnes-communication-script',
        type: 'info',
        module: 4,
        title: 'Sample Communication Script',
        body: '**Example script for explaining PNES to patient/family:** [7][8]\n\n---\n\n*"I\'ve had a chance to observe your seizure and review your records. I want to share what I\'ve found.*\n\n*First, I want you to know that your seizures are real. You\'re not making them up, and you\'re not crazy. What you\'re experiencing is a recognized medical condition called functional seizures.*\n\n*The best way to explain it: your brain has two parts — the hardware (the physical brain structure) and the software (how the brain processes information). In your case, the hardware is fine — there\'s no tumor, no infection, no abnormal electrical activity like in epilepsy. But the software has a glitch — your brain is processing stress or emotions in a way that causes these seizure-like episodes.*\n\n*The good news is this is treatable. Studies show that therapy, especially a type called CBT, helps most people with this condition. Some people have complete resolution of their seizures.*\n\n*Epilepsy medications won\'t help because they target electrical activity, which isn\'t the problem here. In fact, they could cause unnecessary side effects.*\n\n*Do you have any questions?"*\n\n---\n\n[PNES Patient Handout](#/info/pnes-patient-info) — printable information to take home',
        citation: [7, 8],
        next: 'pnes-safety-assessment',
        summary: 'Real, recognized, treatable. Hardware vs software analogy. CBT is effective.',
    },
    // =====================================================================
    // MODULE 5: SAFETY & COMORBIDITIES
    // =====================================================================
    {
        id: 'pnes-safety-assessment',
        type: 'info',
        module: 5,
        title: 'Safety Assessment',
        body: '**PNES patients have high rates of psychiatric comorbidity. Screen for safety.** [1][2]\n\n**Psychiatric comorbidities (screen in ED):**\n• **Depression** — very common\n• **Anxiety disorders** — very common\n• **PTSD** — common (but do NOT probe for trauma details in ED)\n• **Suicidal ideation** — actively screen\n• **Self-harm history**\n\n**Ask directly:**\n• "Are you having any thoughts of hurting yourself?"\n• "Have you ever tried to hurt yourself?"\n• "Do you feel safe at home?"\n\n**If suicidal ideation present:**\n• Psychiatric evaluation before discharge\n• Safety planning\n• May need admission for psychiatric stabilization\n\n**Do NOT probe for trauma history in ED:**\n• 30-40% of PNES patients have trauma history\n• Asking directly can be retraumatizing\n• Leave trauma exploration to outpatient therapy\n• Focus on current safety and immediate needs',
        citation: [1, 2],
        next: 'pnes-injury-assessment',
        summary: 'Screen for suicidal ideation, depression, anxiety. Do NOT probe trauma in ED.',
    },
    {
        id: 'pnes-injury-assessment',
        type: 'info',
        module: 5,
        title: 'Injury Assessment',
        body: '**Evaluate for injuries sustained during event:**\n\n**Common PNES-related injuries:**\n• Head trauma from falls\n• Soft tissue injuries\n• Burns (if event near heat source)\n• MVA if driving\n\n**Less common but possible:**\n• Fractures from falls\n• Shoulder dislocation (posterior — consider epileptic seizure)\n• Vertebral compression fractures\n\n**Physical exam:**\n• Head: lacerations, hematomas\n• Oral: tongue bite (lateral = more suggestive of epileptic)\n• Extremities: injuries, range of motion\n• Neurologic: baseline exam for comparison\n\n**Consider imaging if:**\n• Significant head trauma\n• Loss of consciousness with fall\n• Focal neurologic findings\n• Concerning mechanism\n\n**Important:** Injuries can occur in PNES. Presence of injury does NOT confirm epileptic seizure. However, severe injuries (posterior shoulder dislocation, vertebral fractures) are more common with epileptic GTC.',
        citation: [1],
        next: 'pnes-workup',
        summary: 'Assess for injuries. Severe injuries (fractures) more common with epileptic seizures.',
    },
    {
        id: 'pnes-workup',
        type: 'info',
        module: 5,
        title: 'ED Workup',
        body: '**Limited workup needed for suspected PNES with typical presentation:** [1][4]\n\n**Routinely obtain:**\n• **Fingerstick glucose** — always\n• **Basic vitals** — including SpO2\n\n**Consider based on presentation:**\n• **BMP** — if concern for metabolic cause\n• **Serum prolactin** — elevated 10-20 min post-event suggests epileptic seizure (limited utility)\n• **Drug screen** — if intoxication suspected\n• **ECG** — if syncope considered\n\n**Usually NOT needed:**\n• CT head — unless trauma, focal findings, or first seizure workup\n• Routine labs in known PNES patient with typical event\n• EEG in ED (rarely available, often non-diagnostic)\n\n**In one ED study (n=32 PNES visits):** [4]\n• 31% received CT head\n• 9% received EEG\n• 25% received benzodiazepines (inappropriately)\n• 28% received ASM loading (inappropriately)\n\n**Goal:** Minimize unnecessary testing while ensuring safety.',
        citation: [1, 4],
        next: 'pnes-disposition',
        summary: 'Fingerstick glucose always. CT/labs only if clinically indicated. Minimize unnecessary testing.',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION & FOLLOW-UP
    // =====================================================================
    {
        id: 'pnes-disposition',
        type: 'question',
        module: 6,
        title: 'Disposition Decision',
        body: '**Determine appropriate disposition:**\n\n**Discharge home if:**\n• Event resolved, returned to baseline\n• No injuries requiring admission\n• No active suicidal ideation\n• Safe environment, reliable support system\n• Follow-up can be arranged\n\n**Observation / Admit if:**\n• Diagnostic uncertainty (? epileptic seizure)\n• Recurrent events not resolving\n• Significant injuries\n• Suicidal ideation or psychiatric crisis\n• Unable to arrange safe follow-up\n• First presentation, needs workup\n\n**Psychiatric admission if:**\n• Active suicidal ideation with plan/intent\n• Unsafe to discharge\n• Acute psychiatric decompensation\n\n**Select disposition:**',
        citation: [1, 4],
        options: [
            {
                label: 'Discharge home',
                description: 'Resolved, safe, follow-up arranged',
                next: 'pnes-discharge',
            },
            {
                label: 'Observation / Admit',
                description: 'Uncertain diagnosis, recurrent events, or safety concern',
                next: 'pnes-admit',
            },
        ],
        summary: 'Discharge if resolved, safe, and follow-up arranged. Admit if uncertain, recurrent, or unsafe.',
    },
    {
        id: 'pnes-discharge',
        type: 'info',
        module: 6,
        title: 'Discharge Planning',
        body: '**Essential components of PNES discharge:** [1][7][8]\n\n**Education:**\n• Explain diagnosis using empathetic, clear language\n• Provide [PNES Patient Handout](#/info/pnes-patient-info)\n• Reassure that condition is treatable\n\n**Follow-up — CRITICAL:**\n\n1. **Neurology** (within 2-4 weeks)\n   • For video-EEG if not yet done\n   • Confirm diagnosis\n   • Manage any comorbid epilepsy\n   • Coordinate care\n\n2. **Mental health** (within 1-2 weeks)\n   • CBT is first-line treatment\n   • Reduces seizure frequency by 50-60% [9]\n   • Psychiatry for medication management if needed\n\n3. **PCP** (within 1-2 weeks)\n   • Care coordination\n   • Depression/anxiety treatment\n   • Ongoing support\n\n**If patient already has neurology/psychiatry:**\n• Contact their providers\n• Fax/send discharge summary\n• Ensure follow-up appointment scheduled\n\n**Recognition of PNES diagnosis reduces ED visits by 39-75%** [4][10]',
        citation: [1, 4, 7, 8, 9, 10],
        next: 'pnes-discharge-instructions',
        summary: 'Neurology (2-4 wk) for video-EEG, mental health (1-2 wk) for CBT, PCP. Proper diagnosis reduces ED visits.',
    },
    {
        id: 'pnes-discharge-instructions',
        type: 'info',
        module: 6,
        title: 'Discharge Instructions',
        body: '**Provide clear written instructions:**\n\n**What the patient should know:**\n• You had a functional seizure (also called PNES)\n• This is a real medical condition, not "faking"\n• Treatment with therapy (CBT) is effective\n• Epilepsy medications will not help\n\n**Return to ED if:**\n• Seizure lasting >5 minutes without recovery\n• Injury during seizure\n• Seizure looks different from your usual events\n• Thoughts of hurting yourself\n• High fever with seizure\n• Unable to return to baseline\n\n**Safety guidance:**\n• Avoid driving until evaluated by neurology\n• Avoid heights, water activities until seizures controlled\n• Have someone with you if seizures frequent\n\n**Resources:**\n• Epilepsy Foundation: epilepsy.org/PNES\n• FND Hope: fndhope.org\n• National Alliance on Mental Illness: nami.org\n\n**Medications:**\n• Continue current medications unless told otherwise by your neurologist\n• Do NOT start new seizure medications without neurology input',
        citation: [1, 7],
        next: undefined,
        summary: 'Return if >5 min seizure, different event, SI, or injury. No driving until neuro eval.',
    },
    {
        id: 'pnes-admit',
        type: 'info',
        module: 6,
        title: 'Admission Considerations',
        body: '**Indications for admission:**\n\n**Medical/Neurological:**\n• Diagnostic uncertainty — need inpatient video-EEG\n• Recurrent events not resolving\n• Significant injuries requiring monitoring\n• First presentation needing workup\n• Concern for comorbid epilepsy with breakthrough seizures\n\n**Psychiatric:**\n• Active suicidal ideation\n• Psychiatric crisis requiring stabilization\n• Medication adjustment under supervision\n• Safety concerns\n\n**Admission orders:**\n• Seizure precautions (fall risk, safety)\n• Neurology consult\n• Psychiatry consult if psychiatric concerns\n• Video-EEG if available\n• Avoid routine benzodiazepines\n• PRN medications for anxiety (non-benzo): hydroxyzine 25-50 mg\n\n**Communication to inpatient team:**\n• Suspected or confirmed PNES diagnosis\n• Document semiologic features observed\n• Avoid escalation of ASMs\n• Goal: video-EEG confirmation, establish follow-up plan\n\n**Avoid:**\n• ICU admission for PNES (unless other indication)\n• Intubation\n• Aggressive medication escalation',
        citation: [1, 4],
        next: undefined,
        summary: 'Admit for diagnostic uncertainty, recurrent events, injuries, or psychiatric crisis. Avoid ICU/intubation.',
    },
];
export const PNES_MODULE_LABELS = [
    'Recognition & Initial Approach',
    'Avoiding Iatrogenic Harm',
    'Semiologic Features',
    'Diagnosis Communication',
    'Safety & Comorbidities',
    'Disposition & Follow-up',
];
export const PNES_CITATIONS = [
    { num: 1, text: 'AAN/ILAE Practice Guideline: Management of Functional Seizures. Neurology. 2024. https://www.neurology.org/doi/10.1212/WNL.0000000000214466' },
    { num: 2, text: 'Popkirov S, et al. The first-line management of psychogenic non-epileptic seizures (PNES) in adults in the emergency: a practical approach. Acta Epileptol. 2020;2:16. https://link.springer.com/article/10.1186/s42494-020-00016-y' },
    { num: 3, text: 'Bacchi S, et al. Minimising harm: avoiding intubation for psychogenic non-epileptic seizures. Med J Aust. 2024;220(7):347-349. https://www.mja.com.au/journal/2024/220/7/minimising-harm-avoiding-intubation-psychogenic-non-epileptic-seizures' },
    { num: 4, text: 'Avbersek A, et al. Dissociative seizures in the emergency room: room for improvement. BMC Emerg Med. 2024;24:47. https://pmc.ncbi.nlm.nih.gov/articles/PMC10958294/' },
    { num: 5, text: 'Seneviratne U, et al. Using Semiology to Classify Epileptic Seizures vs Psychogenic Nonepileptic Seizures: A Meta-analysis. JAMA Neurol. 2022;79(6):604-612. https://pmc.ncbi.nlm.nih.gov/articles/PMC9208424/' },
    { num: 6, text: 'Avbersek A, Bhattacharya M. Predictive semiology of psychogenic non-epileptic seizures in an epilepsy monitoring unit. Epilepsy Behav Rep. 2021;16:100462. https://pmc.ncbi.nlm.nih.gov/articles/PMC8456070/' },
    { num: 7, text: 'Mayor R, et al. Psychogenic nonepileptic seizure: An empathetic, practical approach. Cleve Clin J Med. 2022;89(5):252-259. https://www.ccjm.org/content/89/5/252' },
    { num: 8, text: 'LaFrance WC Jr, et al. What Are We Communicating When We Present the Diagnosis of PNES? Epilepsy Behav. 2015;49:342-347. https://pmc.ncbi.nlm.nih.gov/articles/PMC4657778/' },
    { num: 9, text: 'LaFrance WC Jr, et al. Multicenter Pilot Treatment Trial for Psychogenic Nonepileptic Seizures: A Randomized Clinical Trial. JAMA Psychiatry. 2014;71(9):997-1005. https://pubmed.ncbi.nlm.nih.gov/25006867/' },
    { num: 10, text: 'Razvi S, et al. Recognition of psychogenic nonepileptic seizures diminishes acute care utilization. Epilepsy Behav. 2011;22(2):304-307. https://pubmed.ncbi.nlm.nih.gov/21813334/' },
];
