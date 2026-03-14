// MedKitt — Syncope Evaluation
// Life-Threat Screen → Seizure vs Syncope → Etiology → Risk Stratification → Disposition
// 6 modules: Is This Syncope? → Initial Evaluation → Etiology → Risk Stratification → Special Populations → Disposition
// 28 nodes total.
export const SYNCOPE_NODES = [
    // =====================================================================
    // MODULE 1: IS THIS SYNCOPE?
    // =====================================================================
    {
        id: 'sync-start',
        type: 'question',
        module: 1,
        title: 'Transient Loss of Consciousness (TLOC)',
        body: '[Syncope Evaluation Steps Summary](#/info/syncope-summary)\n\nPatient presents with transient loss of consciousness. First priority: **exclude immediately life-threatening conditions.**\n\nAre any of the following present?\n• Persistent abnormal vital signs (hypotension, tachycardia, bradycardia, hypoxia, tachypnea)\n• Neurologic deficit or headache\n• Chest pain or dyspnea\n• Abdominal pain or pulsatile mass\n• Evidence of hemorrhage or hypovolemia',
        citation: [1, 2],
        options: [
            {
                label: 'Yes — Life-threatening features present',
                next: 'sync-life-threat',
                urgency: 'critical',
            },
            {
                label: 'No — Vitals normal, no red flags',
                next: 'sync-true-syncope',
            },
        ],
    },
    {
        id: 'sync-life-threat',
        type: 'result',
        module: 1,
        title: 'Evaluate for Life-Threatening Etiology',
        body: '**TLOC with persistent abnormalities is NOT simple syncope until serious diagnoses are excluded.** [1,2]\n\nEvaluate based on clinical findings:\n• Hypotension + tachycardia → hemorrhage, PE, sepsis, AAA\n• Chest pain → ACS, aortic dissection, PE, tension pneumothorax\n• Headache + neuro deficit → SAH, stroke, ICH\n• Abdominal pain → ruptured AAA, ectopic pregnancy\n• Hypoxia + tachypnea → PE, pneumothorax\n• Persistent bradycardia → high-grade AV block, sick sinus\n\nObtain ECG, targeted labs, and imaging as indicated. **Do not diagnose syncope until life-threatening causes are excluded.**',
        recommendation: 'Workup directed by presenting symptoms. Syncope is a diagnosis of exclusion when life-threatening features are present.',
        confidence: 'definitive',
        citation: [1, 2, 3],
    },
    {
        id: 'sync-true-syncope',
        type: 'question',
        module: 1,
        title: 'Seizure vs. Syncope',
        body: 'Bystanders often call any convulsive activity a "seizure." **Syncope commonly causes myoclonic jerks** (especially if patient cannot lie flat). [4,5]\n\n**Features favoring seizure:**\n• Prolonged postictal disorientation (>few seconds)\n• Tongue laceration (lateral)\n• Head-turning, unusual posturing\n• >20 rhythmic jerks\n\n**Features favoring syncope:**\n• Presyncope (lightheadedness, diaphoresis, palpitations)\n• Loss of consciousness with prolonged standing/sitting\n• <10 jerks, brief duration\n• Rapid return to baseline\n\nUrinary incontinence does NOT distinguish between seizure and syncope. [6]\n\nDoes the clinical picture suggest seizure?',
        citation: [4, 5, 6],
        options: [
            {
                label: 'Yes — Seizure likely',
                description: 'Postictal state, tongue laceration, rhythmic convulsions',
                next: 'sync-seizure',
            },
            {
                label: 'No — Syncope likely',
                description: 'Rapid return to baseline, prodrome present',
                next: 'sync-ecg',
            },
            {
                label: 'Uncertain',
                description: 'Unwitnessed event or ambiguous features',
                next: 'sync-ecg',
            },
        ],
    },
    {
        id: 'sync-seizure',
        type: 'result',
        module: 1,
        title: 'Seizure Suspected',
        body: 'Clinical features suggest **seizure rather than syncope.** Evaluate and manage per seizure pathway.\n\n**Pearl:** Elevated serum lactate within 2 hours of the event is superior to CK for distinguishing seizure from syncope (positive LR 5.8). [7]\n\nIf seizure is excluded after further workup, return to syncope evaluation.',
        recommendation: 'Manage per seizure pathway. Consider serum lactate within 2 hours to help differentiate.',
        confidence: 'recommended',
        citation: [4, 5, 7],
    },
    // =====================================================================
    // MODULE 2: INITIAL EVALUATION
    // =====================================================================
    {
        id: 'sync-ecg',
        type: 'question',
        module: 2,
        title: 'ECG Assessment',
        body: '**ECG is mandatory for ALL syncope patients** — even those with suspected vasovagal syncope. [1,2]\n\nPlace on continuous telemetry. In low-risk patients, 50% of arrhythmic causes are detected within 2 hours; 6 hours for medium/high-risk. [8]\n\nReview ECG carefully for:\n• Nonsinus rhythm or significant ectopy\n• Conduction abnormalities (AV block, BBB, pre-excitation)\n• QTc prolongation (>460 ms concerning, >500 ms high-risk)\n• ST changes or Q waves suggesting ischemia\n• [High-risk ECG patterns](#/info/syncope-ecg) (Brugada, HCM, epsilon waves)\n\nIs the ECG abnormal?',
        images: [
            { src: 'images/syncope/brugada-types.png', alt: 'Brugada syndrome ECG patterns — Type 1 (coved ST elevation), Type 2 and 3 (saddleback)', caption: 'Brugada ECG patterns: Only Type 1 (coved ST elevation in V1-V3) is diagnostic.' },
            { src: 'images/syncope/hcm-ecg.png', alt: 'Hypertrophic cardiomyopathy ECG showing deep narrow Q waves and LVH', caption: 'HCM ECG: Deep "dagger" Q waves with LVH voltage criteria.' },
        ],
        citation: [1, 2, 8, 9],
        options: [
            {
                label: 'Yes — Abnormal ECG',
                description: 'Conduction disease, ischemia, prolonged QTc, or high-risk pattern',
                next: 'sync-abnormal-ecg',
                urgency: 'urgent',
            },
            {
                label: 'No — Normal sinus rhythm, no abnormalities',
                next: 'sync-history',
            },
        ],
    },
    {
        id: 'sync-abnormal-ecg',
        type: 'info',
        module: 2,
        title: 'Abnormal ECG — High-Risk Feature',
        body: '**Abnormal ECG is a high-risk feature in all syncope risk stratification tools.** [1,2,10]\n\nECG findings associated with serious cardiac arrhythmias within 30 days: [9]\n• Nonsinus rhythm\n• Mobitz II or third-degree AV block\n• Bundle branch block (especially new LBBB)\n• QTc >460 ms\n• Pre-excitation (WPW)\n• Brugada type 1 pattern\n• Epsilon waves (ARVC)\n• "Dagger" Q waves (HCM)\n• ST depression or T-wave inversions\n\nAtrial fibrillation, IVCD, LVH, and ventricular pacing are independent predictors of mortality. [11]\n\nContinue to history assessment — ECG findings will factor into risk stratification.',
        citation: [1, 9, 10, 11],
        next: 'sync-history',
    },
    {
        id: 'sync-history',
        type: 'question',
        module: 2,
        title: 'Focused History',
        body: '**The history is the single most important tool** in identifying the cause of syncope. [1,2]\n\n[Historical Features by Etiology](#/info/syncope-history-features)\n\nAssess:\n• **Activity at onset:** position, exertion, triggers (pain, blood, emotional)\n• **Prodrome:** nausea, sweating, lightheadedness, palpitations, tunnel vision\n• **During event:** duration, witnessed movements, skin color\n• **After event:** orientation, confusion duration, injuries\n• **Prior episodes:** recurrent? same triggers? prior workup?\n• **Medications:** new or changed? antihypertensives, QT-prolonging drugs?\n• **Cardiac history:** heart failure, CAD, valvular disease, prior arrhythmia?\n• **Family history:** sudden cardiac death, drowning, unexplained MVCs in young relatives?\n\nDoes the history suggest a **clear benign etiology** (vasovagal, situational, orthostatic)?',
        citation: [1, 2, 12],
        options: [
            {
                label: 'Yes — Classic vasovagal or situational',
                description: 'Clear trigger, prodrome, young patient, recurrent pattern',
                next: 'sync-vasovagal',
            },
            {
                label: 'Yes — Orthostatic hypotension',
                description: 'Positional, medication-related, volume depletion',
                next: 'sync-orthostatic',
            },
            {
                label: 'No — Cardiac features or unclear',
                description: 'Exertional, palpitations, no prodrome, cardiac history',
                next: 'sync-cardiac-suspect',
            },
            {
                label: 'No — Etiology unclear',
                description: 'No clear trigger, ambiguous history',
                next: 'sync-risk-stratify',
            },
        ],
    },
    {
        id: 'sync-labs',
        type: 'info',
        module: 2,
        title: 'Laboratory Testing',
        body: '**Labs are low-yield unless directed by history/exam.** [1,2]\n\nConsider in patients without clear benign diagnosis:\n• **CBC** — anemia (but initial Hgb may be normal in acute hemorrhage)\n• **BMP** — electrolytes, renal function, glucose\n• **Pregnancy test** — all women of childbearing age\n• **Troponin (hs-cTnT)** — elevated troponin is an independent predictor of 30-day mortality [13]\n• **BNP/NT-proBNP** — elevated BNP confers ~8× increased risk of serious outcomes; may distinguish cardiac from vasovagal [14,15]\n• **Lactate** — if seizure vs syncope unclear (within 2 hours)\n\n**Do NOT routinely obtain:**\n• D-dimer (unless PE otherwise suspected by PERC/Wells)\n• Head CT (unless neuro deficit or head trauma)\n• EEG (unless seizure suspected)\n• Stress testing (unless exertional syncope with ischemia concern)',
        citation: [7, 13, 14, 15, 16],
        next: 'sync-risk-stratify',
    },
    // =====================================================================
    // MODULE 3: ETIOLOGY CLASSIFICATION
    // =====================================================================
    {
        id: 'sync-vasovagal',
        type: 'result',
        module: 3,
        title: 'Neurally Mediated (Reflex) Syncope',
        body: '**Most common identified cause of syncope.** Good long-term prognosis. [17,18]\n\n**Subtypes:**\n• **Vasovagal** — triggered by pain, blood, emotions, medical procedures; prodrome with nausea, sweating, warmth. More common age <40.\n• **Situational** — Valsalva, post-exercise, coughing, swallowing, defecation\n• **Carotid sinus** — head-turning, shaving (age >40)\n\n**For unexplained syncope in patients >40 years**, consider carotid sinus massage (AHA/ESC recommendation) — diagnostic in up to 60% of appropriate candidates. [19]\n\n**Recurrence:** Common but not a predictor of mortality. [20,21]\n\n**If ECG is normal** and history is classic, this is a **low-risk diagnosis.**',
        recommendation: 'Low-risk. Discharge with reassurance and follow-up for recurrent episodes. Avoid known triggers. Counsel on counterpressure maneuvers.',
        confidence: 'definitive',
        citation: [1, 2, 17, 18, 19, 20, 21],
        next: 'sync-disposition-low',
    },
    {
        id: 'sync-orthostatic',
        type: 'question',
        module: 3,
        title: 'Orthostatic Hypotension',
        body: 'Orthostatic hypotension = **SBP drop >20 mmHg upon standing**, or symptoms with position change. [1]\n\nMost common cause: **medications** (~40% of cases). [22]\n\n**Drug-related causes:**\n• Antihypertensives (ACEi, ARBs, beta-blockers, CCBs)\n• Diuretics\n• Alpha-blockers (tamsulosin, doxazosin)\n• Nitrates\n• Antidepressants (TCAs, MAOIs)\n• Antipsychotics\n\n**Other causes:** volume depletion, autonomic failure (diabetes, Parkinson), adrenal insufficiency\n\n**Important:** Orthostatic hypotension does NOT exclude more serious causes, especially in the elderly. One study found no difference in 30-day serious outcomes between elderly patients with normal vs abnormal orthostatic vitals. [23]\n\nIs the orthostatic hypotension clearly **medication-related or volume-related** with an otherwise reassuring workup?',
        citation: [1, 22, 23],
        options: [
            {
                label: 'Yes — Clear medication/volume cause',
                description: 'Modifiable cause identified, otherwise low-risk',
                next: 'sync-orthostatic-disposition',
            },
            {
                label: 'No — Other risk factors present',
                description: 'Elderly with comorbidities, unclear cause',
                next: 'sync-risk-stratify',
            },
        ],
    },
    {
        id: 'sync-orthostatic-disposition',
        type: 'result',
        module: 3,
        title: 'Orthostatic Syncope — Modifiable Cause',
        body: '**Medication or volume-related orthostatic syncope** with otherwise reassuring evaluation.\n\n**Management:**\n• IV fluids if volume-depleted\n• Review and adjust offending medications\n• Educate on slow position changes\n• Compression stockings and increased salt/fluid intake for recurrent episodes\n• PCP follow-up for medication adjustment\n\n**Important:** In elderly patients, identifying orthostasis allows modification of fall risk factors (medications), but orthostasis alone should NOT be the sole factor in risk stratification. [23,24]',
        recommendation: 'Low to intermediate risk. Treat volume depletion, adjust medications, PCP follow-up for med reconciliation.',
        confidence: 'recommended',
        citation: [1, 22, 23, 24],
        next: 'sync-disposition-low',
    },
    {
        id: 'sync-cardiac-suspect',
        type: 'question',
        module: 3,
        title: 'Cardiac Syncope Suspected',
        body: '**Cardiac syncope carries the highest morbidity** of all causes. Patients with underlying cardiac disease + syncope have higher all-cause mortality. [25]\n\n**Features suggesting cardiac syncope:**\n• Syncope during exertion\n• Palpitations immediately before syncope\n• Syncope while supine\n• Syncope without prodrome (abrupt)\n• History of structural heart disease (HF, CAD, valvular)\n• Family history of sudden cardiac death or inherited arrhythmia\n• Abnormal ECG\n\n**Arrhythmias** are the most common cardiac cause — and may have resolved by ED evaluation. [1,2]\n\n**Structural causes** (PE, aortic stenosis, HCM, aortic dissection) typically persist and are more easily identified.\n\nDoes the patient have **known structural heart disease or heart failure?**',
        citation: [1, 2, 25],
        options: [
            {
                label: 'Yes — Known structural/HF',
                description: 'History of heart failure, CAD, valvular disease, cardiomyopathy',
                next: 'sync-cardiac-workup',
                urgency: 'urgent',
            },
            {
                label: 'No — Arrhythmia suspected',
                description: 'Palpitations, abrupt onset, abnormal ECG, no structural disease',
                next: 'sync-arrhythmia',
            },
        ],
    },
    {
        id: 'sync-cardiac-workup',
        type: 'info',
        module: 3,
        title: 'Cardiac Syncope Workup',
        body: '**Structural heart disease + syncope = HIGH RISK.** [1,2,25]\n\n**Recommended ED workup:**\n• Continuous telemetry monitoring (minimum 6 hours for high-risk) [8]\n• Troponin (hs-cTnT) — elevated is independent predictor of 30-day mortality [13]\n• BNP/NT-proBNP — aids in recognition of cardiac syncope [14,15]\n• Echocardiography — high yield when HF, CAD, abnormal ECG, or elevated biomarkers present [26]\n\n**Consider echocardiography** if:\n• History of heart failure\n• Coronary artery disease\n• Abnormal ECG\n• Elevated hs-cTnT or NT-proBNP\n\nOtherwise, echo has low yield for most syncope patients. [26,27]',
        citation: [1, 8, 13, 14, 15, 26, 27],
        next: 'sync-risk-stratify',
    },
    {
        id: 'sync-arrhythmia',
        type: 'info',
        module: 3,
        title: 'Arrhythmia Suspected',
        body: '**Arrhythmias are the most common cause of cardiac syncope** — and typically resolve before ED arrival. [1,2]\n\n**Clues to arrhythmic syncope:**\n• Abrupt onset without prodrome\n• Syncope while sitting or supine\n• Palpitations preceding the event\n• Abnormal ECG (bundle branch block, prolonged QTc, pre-excitation, Brugada pattern)\n• Known cardiac device (pacemaker/ICD)\n\n**ED monitoring:**\n• Continuous telemetry — 50% of arrhythmic causes detected within 2 hours (low-risk); 6 hours (medium/high-risk) [8]\n• Consider early referral for ambulatory monitoring — higher diagnostic yield if initiated within 15 days of event [28]\n\n**If arrhythmia captured on telemetry** → manage per specific rhythm.\n\n**If no arrhythmia detected** → proceed to risk stratification for disposition.',
        citation: [1, 2, 8, 28],
        next: 'sync-risk-stratify',
    },
    // =====================================================================
    // MODULE 4: RISK STRATIFICATION
    // =====================================================================
    {
        id: 'sync-risk-stratify',
        type: 'question',
        module: 4,
        title: 'Risk Stratification',
        body: 'For patients with **unexplained syncope** after history, exam, and ECG — apply risk stratification. [1,2]\n\n**Risk stratification tools** do not consistently outperform clinical judgment, but help identify high-risk features. [29,30]\n\nUse the calculators below to aid disposition:\n• **CSRS** — Canadian Syncope Risk Score (best validated, multicenter) [31,32]\n• **SFSR** — San Francisco Syncope Rule (simple binary screening) [33]\n\n[Syncope Differential Diagnosis](#/info/syncope-ddx)\n\nDoes the patient have **any high-risk features?**\n\n**High-risk (ESC):** [2]\n• Major structural or coronary artery disease\n• Clinical or ECG features suggesting arrhythmic syncope\n• Syncope causing severe injury\n• Important comorbidities (severe anemia, electrolyte disturbance)',
        citation: [1, 2, 29, 30, 31, 32, 33],
        calculatorLinks: [
            { id: 'csrs', label: 'Canadian Syncope Risk Score' },
            { id: 'sfsr', label: 'San Francisco Syncope Rule' },
        ],
        options: [
            {
                label: 'Yes — High-risk features',
                next: 'sync-disposition-high',
                urgency: 'critical',
            },
            {
                label: 'Intermediate — Some risk factors',
                description: 'Age ≥50, cardiac history, cardiac device, family hx SCD',
                next: 'sync-disposition-intermediate',
                urgency: 'urgent',
            },
            {
                label: 'No — Low-risk features',
                description: 'Young, vasovagal, normal ECG, no cardiac history',
                next: 'sync-disposition-low',
            },
        ],
    },
    // =====================================================================
    // MODULE 5: SPECIAL POPULATIONS
    // =====================================================================
    {
        id: 'sync-pediatric',
        type: 'info',
        module: 5,
        title: 'Pediatric Syncope',
        body: '**Approach mirrors adults.** History, exam, and ECG are the most useful components. [34]\n\n**80% of pediatric syncope is neurally mediated** — vast majority have benign etiology. Most cardiac syncope can be diagnosed by history, exam, and ECG. [34]\n\n**Features suggesting cardiac cause in children:**\n• Exertional syncope\n• Syncope without prodrome\n• Syncope while supine\n• Family history of sudden cardiac death\n• Syncope associated with a loud noise → evaluate for **long QT syndrome** [35]\n\n**Common problem:** Excessive testing in pediatric syncope — one study found 58% received head CT with very low yield. 10% are admitted, but very few ultimately diagnosed with cardiac syncope. [36]\n\n**Bottom line:** Unless cardiac features are present, pediatric syncope can be managed conservatively with ECG and PCP follow-up.',
        citation: [34, 35, 36],
    },
    {
        id: 'sync-elderly',
        type: 'info',
        module: 5,
        title: 'Elderly Syncope',
        body: '**Particularly challenging** — many present with unexplained falls rather than syncope. [37,38]\n\n**Key points:**\n• 25-50% of unexplained falls in elderly may be syncope-related [37,39]\n• Almost half of elderly with dementia referred for unexplained falls receive a syncope diagnosis [40]\n• Neurally mediated syncope is still common in this age group [37]\n• QTc prolongation occurs in 25% of elderly — QTc >500 ms predicts 30-day and 1-year mortality [41,42]\n\n**Hospitalization controversy:**\n• Older adults often have multiple risk factors and worse outcomes overall\n• However, for unexplained syncope WITHOUT a serious ED diagnosis, **hospitalization does not improve 30-day adverse outcomes** [43]\n• Age >65 alone and unexplained syncope are NOT independent predictors of mortality [44,45]\n• Mortality is related primarily to **underlying comorbidities**, not the syncope itself [43,46]\n\nHospitalization may increase likelihood of identifying a serious diagnosis, but does not appear to improve mortality.',
        citation: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'sync-disposition-high',
        type: 'result',
        module: 6,
        title: 'High-Risk — Admit',
        body: '**Hospital admission or observation unit recommended.** [1,2]\n\n**Indications for admission:**\n• Sustained or symptomatic ventricular tachycardia\n• Symptomatic conduction system disease or high-grade AV block\n• Symptomatic bradycardia or sinus pauses (not reflex-mediated)\n• Symptomatic SVT\n• Pacemaker/ICD malfunction\n• Inheritable cardiovascular conditions predisposing to arrhythmias\n• Cardiac ischemia\n• Severe aortic stenosis\n• Cardiac tamponade\n• Hypertrophic cardiomyopathy\n• Aortic dissection\n• Pulmonary embolism\n• Significant hemorrhage\n\n**Monitoring:**\n• Continuous telemetry\n• Cardiology consultation\n• Echocardiography if not already obtained\n• Consider electrophysiology referral',
        recommendation: 'Admit to monitored bed. Cardiology consult. Continuous telemetry. Echo if structural disease suspected.',
        confidence: 'definitive',
        citation: [1, 2],
    },
    {
        id: 'sync-disposition-intermediate',
        type: 'result',
        module: 6,
        title: 'Intermediate Risk — Observation vs. Outpatient',
        body: '**Shared decision-making recommended.** [1,2]\n\n**Intermediate-risk factors:** [1]\n• Age ≥50 years\n• Prior history of cardiac disease\n• Cardiac device without dysfunction\n• Family history of early sudden cardiac death\n• Symptoms not consistent with reflex-mediated syncope\n\n**Key point:** Patients with risk factors by PMH (CAD, HF) but with a **benign cause identified in the ED** (e.g., dehydration) may be discharged safely. [47]\n\n**If observation/discharge:**\n• Structured ED observation protocol may reduce admissions [48]\n• Ensure close follow-up (PCP, cardiology)\n• Consider referral for:\n  - Ambulatory ECG monitoring (Holter, event monitor)\n  - Tilt-table testing\n  - Implantable loop recorder\n  - Electrophysiology evaluation [1]\n\n**If admitted:**\n• Telemetry monitoring\n• Targeted workup based on risk profile',
        recommendation: 'Shared decision-making. Consider ED observation protocol. If discharge: close follow-up + ambulatory monitoring referral.',
        confidence: 'recommended',
        citation: [1, 2, 47, 48],
    },
    {
        id: 'sync-disposition-low',
        type: 'result',
        module: 6,
        title: 'Low Risk — Discharge',
        body: '**Low-risk patients should generally be discharged**, even with unexplained syncope. [1,2]\n\n**Low-risk features (ESC):** [2]\n• Young age with typical features of reflex syncope\n• No history of cardiac disease\n• Syncope only when standing\n• Identifiable trigger (pain, blood, prolonged standing)\n• Normal ECG\n• Normal vital signs\n\n**Discharge counseling:**\n• Explain diagnosis and expected benign prognosis\n• Counsel on avoidance of known triggers\n• Counterpressure maneuvers (leg crossing, hand gripping) for prodromal symptoms\n• Adequate hydration and salt intake\n• Review fall risk and injury prevention\n\n**Recurrence:** ~9% recurrence within 6 months; 3+ lifetime episodes most predictive of future recurrence [49]\n\n**Driving:** Be familiar with state laws regarding driving after syncope. Consider referral before return to work for commercial drivers or high-risk occupations. [50]\n\n**Follow-up:** PCP for recurrent or unexplained syncope.',
        recommendation: 'Discharge with reassurance, trigger avoidance counseling, and PCP follow-up. Address driving restrictions if applicable.',
        confidence: 'definitive',
        citation: [1, 2, 49, 50],
    },
    {
        id: 'sync-no-head-ct',
        type: 'info',
        module: 2,
        title: 'Head CT Is NOT Indicated',
        body: '**ACEP "Choosing Wisely" recommendation:** Avoid head CT in asymptomatic patients with syncope, minimal trauma, and a normal neurologic examination. [16]\n\n**Evidence:**\n• Head CT has very low yield (<0.1%) in determining the cause of syncope [51]\n• Commonly ordered despite lack of utility — one study found 58% of pediatric syncope patients received head CT [36]\n• No neurological symptoms + no head trauma + normal neuro exam = **no head CT needed** [16,51]\n\n**Only obtain head CT if:**\n• Significant head trauma from the fall\n• Neurological deficit on examination\n• Suspicion for SAH (thunderclap headache)',
        citation: [16, 36, 51],
    },
    {
        id: 'sync-pe-screening',
        type: 'info',
        module: 2,
        title: 'Pulmonary Embolism & Syncope',
        body: '**PE is uncommon among syncope patients.** [52,53]\n\nExisting clinical decision rules (PERC) adequately identify syncope patients with PE. [52]\n\n**Routine D-dimer is NOT indicated** in syncope patients without independent indications for PE evaluation. [54,55]\n\n**When to consider PE:**\n• Unexplained persistent tachycardia, hypotension, tachypnea, or hypoxia in ED\n• Recent surgery, immobilization, or other VTE risk factors\n• Syncope + dyspnea + pleuritic chest pain\n\n**Apply standard PE rules** (PERC → Wells → CTPA) only when clinically indicated — do NOT screen all syncope patients for PE.',
        citation: [52, 53, 54, 55],
    },
    {
        id: 'sync-carotid-massage',
        type: 'info',
        module: 3,
        title: 'Carotid Sinus Massage',
        body: '**AHA and ESC recommend carotid sinus massage** in patients >40 years with undiagnosed syncope after initial evaluation. [1,2]\n\nDiagnostic in up to 60% of patients (increasing with advanced age). [19]\n\n**Positive result (carotid sinus hypersensitivity):**\n• Syncope reproduced, OR\n• Asystole >3 seconds, OR\n• AV block, OR\n• SBP drop ≥50 mmHg\n\n**Contraindications:**\n• Carotid bruit\n• Known carotid stenosis >70%\n• History of TIA or stroke within 3 months\n• MI within 3 months\n• History of VT or VF\n\n**Complication rate:** ~0.1% neurologic complications — careful patient selection is important. [56]\n\nPerform with **appropriate monitoring and resuscitation equipment** readily available.',
        citation: [1, 2, 19, 56],
    },
];
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const SYNCOPE_MODULE_LABELS = [
    'Is This Syncope?',
    'Initial Evaluation',
    'Etiology Classification',
    'Risk Stratification',
    'Special Populations',
    'Disposition',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const SYNCOPE_CITATIONS = [
    { num: 1, text: 'Shen WK, et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients with Syncope. J Am Coll Cardiol. 2017;70(5):e39-e110.' },
    { num: 2, text: 'Brignole M, et al. 2018 ESC Guidelines for the Diagnosis and Management of Syncope. Eur Heart J. 2018;39(21):1883-1948.' },
    { num: 3, text: 'D\'Ascenzo F, et al. Incidence, Etiology and Predictors of Adverse Outcomes in 43,315 Patients Presenting with Syncope: An International Meta-Analysis. Int J Cardiol. 2013;167(1):57-62.' },
    { num: 4, text: 'Sheldon R, et al. Historical Criteria that Distinguish Syncope from Seizures. J Am Coll Cardiol. 2002;40(1):142-148.' },
    { num: 5, text: 'Shmuely S, et al. Differentiating Motor Phenomena in Tilt-Induced Syncope and Convulsive Seizures. Neurology. 2018;90(15):e1339-e1346.' },
    { num: 6, text: 'Brigo F, et al. The Diagnostic Value of Urinary Incontinence in the Differential Diagnosis of Seizures. Seizure. 2013;22(2):85-90.' },
    { num: 7, text: 'Matz O, et al. Early Postictal Serum Lactate Concentrations Are Superior to CK in Distinguishing Generalized Tonic-Clonic Seizures from Syncopes. Intern Emerg Med. 2018;13(5):749-755.' },
    { num: 8, text: 'Thiruganasambandamoorthy V, et al. Duration of ECG Monitoring of ED Patients with Syncope. Circulation. 2019;139(11):1396-1406.' },
    { num: 9, text: 'Nishijima DK, et al. ECG Predictors of Cardiac Arrhythmias in Older Adults with Syncope. Ann Emerg Med. 2018;71(4):452-461.' },
    { num: 10, text: 'Quinn J, McDermott D. Electrocardiogram Findings in ED Patients with Syncope. Acad Emerg Med. 2011;18(7):714-718.' },
    { num: 11, text: 'Pérez-Rodon J, et al. Prognostic Value of the ECG in Patients with Syncope: Data from GESINUR. Heart Rhythm. 2014;11(11):2035-2044.' },
    { num: 12, text: 'Toarta C, et al. Syncope Prognosis Based on ED Diagnosis: A Prospective Cohort Study. Acad Emerg Med. 2018;25(4):388-396.' },
    { num: 13, text: 'Clark CL, et al. Do High-Sensitivity Troponin and Natriuretic Peptide Predict Death or Serious Cardiac Outcomes After Syncope? Acad Emerg Med. 2019;26(5):528-538.' },
    { num: 14, text: 'Isbitan A, et al. Utility of BNP as a Predictor of Short Term Outcomes in Patients Presenting with Syncope to the ED. Cardiovasc Diagn Ther. 2016;6(3):234-240.' },
    { num: 15, text: 'Du Fay De Lavallaz J, et al. B-Type Natriuretic Peptides and Cardiac Troponins for Diagnosis and Risk-Stratification of Syncope. Circulation. 2019;139(21):2403-2418.' },
    { num: 16, text: 'Chou SC, et al. Trends in Advanced Imaging and Hospitalization for ED Syncope Care Before and After ACEP Clinical Policy. Am J Emerg Med. 2019;37(6):1037-1043.' },
    { num: 17, text: 'Del Rosso A, et al. Relation of Clinical Presentation of Syncope to the Age of Patients. Am J Cardiol. 2005;96(10):1431-1435.' },
    { num: 18, text: 'Shiyovich A, et al. Admission for Syncope: Evaluation, Cost and Prognosis According to Etiology. Isr Med Assoc J. 2008;10(2):104-108.' },
    { num: 19, text: 'Brignole M, et al. Complementary Effectiveness of Carotid Sinus Massage and Tilt Testing for Reflex Syncope in Patients >40 Years. Europace. 2020;22(11):1737-1741.' },
    { num: 20, text: 'Chang AM, et al. Recurrent Syncope Is Not an Independent Risk Predictor for Future Syncopal Events or Adverse Outcomes. Am J Emerg Med. 2019;37(5):869-872.' },
    { num: 21, text: 'Solbiati M, et al. Syncope Recurrence and Mortality: A Systematic Review. Europace. 2015;17(2):300-308.' },
    { num: 22, text: 'Sarasin FP, et al. Prevalence of Orthostatic Hypotension Among Patients Presenting with Syncope in the ED. Am J Emerg Med. 2002;20(6):497-501.' },
    { num: 23, text: 'White JL, et al. Orthostatic Vital Signs Do Not Predict 30 Day Serious Outcomes in Older ED Patients with Syncope. Am J Emerg Med. 2019;37(12):2215-2223.' },
    { num: 24, text: 'Schaffer JT, et al. Do Orthostatic Vital Signs Have Utility in the Evaluation of Syncope? J Emerg Med. 2018;55(6):780-787.' },
    { num: 25, text: 'Aro AL, et al. Syncope and Risk of Sudden Cardiac Arrest in Coronary Artery Disease. Int J Cardiol. 2017;231:26-30.' },
    { num: 26, text: 'Probst MA, et al. Predictors of Clinically Significant Echocardiography Findings in Older Adults with Syncope. J Hosp Med. 2018;13(12):823-828.' },
    { num: 27, text: 'Han SK, et al. Transthoracic Echocardiogram in Syncope Patients with Normal Initial Evaluation. Am J Emerg Med. 2017;35(2):281-284.' },
    { num: 28, text: 'Locati ET, et al. External Prolonged ECG Monitoring in Unexplained Syncope and Palpitations: SYNARR-Flash Study. Europace. 2016;18(8):1265-1272.' },
    { num: 29, text: 'Costantino G, et al. Syncope Risk Stratification Tools vs Clinical Judgment: An Individual Patient Data Meta-Analysis. Am J Med. 2014;127(11):1126.e13-1126.e25.' },
    { num: 30, text: 'Serrano LA, et al. Accuracy and Quality of Clinical Decision Rules for Syncope in the ED: A Systematic Review and Meta-Analysis. Ann Emerg Med. 2010;56(4):362-373.' },
    { num: 31, text: 'Thiruganasambandamoorthy V, et al. Development of the Canadian Syncope Risk Score to Predict Serious Adverse Events After ED Assessment of Syncope. CMAJ. 2016;188(12):E289-E298.' },
    { num: 32, text: 'Thiruganasambandamoorthy V, et al. Multicenter ED Validation of the Canadian Syncope Risk Score. JAMA Intern Med. 2020;180(5):737-744.' },
    { num: 33, text: 'Quinn JV, et al. Derivation of the San Francisco Syncope Rule to Predict Patients with Short-Term Serious Outcomes. Ann Emerg Med. 2004;43(2):224-232.' },
    { num: 34, text: 'Massin MM, et al. Syncope in Pediatric Patients Presenting to an ED. J Pediatrics. 2004;145(2):223-228.' },
    { num: 35, text: 'Sanatani S, et al. Canadian Cardiovascular Society Position Statement on the Approach to Syncope in the Pediatric Patient. Can J Cardiol. 2017;33(2):189-198.' },
    { num: 36, text: 'Goble MM, et al. ED Management of Pediatric Syncope: Searching for a Rationale. Am J Emerg Med. 2008;26(1):66-70.' },
    { num: 37, text: 'Anpalahan M, Gibson S. The Prevalence of Neurally Mediated Syncope in Older Patients Presenting with Unexplained Falls. Eur J Intern Med. 2012;23(2):e48-e52.' },
    { num: 38, text: 'Bhangu J, et al. The Prevalence of Unexplained Falls and Syncope in Older Adults Presenting to an Irish Urban ED. Eur J Emerg Med. 2019;26(2):100-104.' },
    { num: 39, text: 'Ungar A, et al. Etiology of Syncope and Unexplained Falls in Elderly Adults with Dementia: SYD Study. J Am Geriatr Soc. 2016;64(8):1567-1573.' },
    { num: 40, text: 'Ungar A, et al. Etiology of Syncope and Unexplained Falls in Elderly Adults with Dementia: SYD Study. J Am Geriatr Soc. 2016;64(8):1567-1573.' },
    { num: 41, text: 'White JL, et al. QTc Prolongation as a Marker of 30-Day Serious Outcomes in Older Patients with Syncope. Am J Emerg Med. 2019;37(4):685-689.' },
    { num: 42, text: 'Bo M, et al. Prevalence, Predictors and Clinical Implications of Prolonged QTc in Elderly Patients with Dementia and Suspected Syncope. Eur J Intern Med. 2019;61:34-39.' },
    { num: 43, text: 'Probst MA, et al. Clinical Benefit of Hospitalization for Older Adults with Unexplained Syncope: A Propensity-Matched Analysis. Ann Emerg Med. 2019;74(2):260-269.' },
    { num: 44, text: 'Roussanov O, et al. Outcomes of Unexplained Syncope in the Elderly. Am J Geriatr Cardiol. 2006;16(4):249-254.' },
    { num: 45, text: 'Grossman SA, et al. Can Elderly Patients Without Risk Factors Be Discharged Home When Presenting to the ED with Syncope? Arch Gerontol Geriatr. 2013;58(1):110-114.' },
    { num: 46, text: 'Kaul P, et al. Lack of Benefit from Hospitalization in Patients with Syncope: A Propensity Analysis. J Am Coll Emerg Physicians Open. 2020;1(5):716-722.' },
    { num: 47, text: 'Grossman SA, et al. Can Benign Etiologies Predict Benign Outcomes in High-Risk Syncope Patients? J Emerg Med. 2011;40(5):592-597.' },
    { num: 48, text: 'Sun BC, et al. Randomized Clinical Trial of an ED Observation Syncope Protocol vs Routine Inpatient Admission. Ann Emerg Med. 2014;64(2):167-175.' },
    { num: 49, text: 'Barbic F, et al. Syncope in a Working-Age Population: Recurrence Risk and Related Risk Factors. J Clin Med. 2019;8(2).' },
    { num: 50, text: 'Sorajja D, et al. Syncope While Driving: Clinical Characteristics, Causes, and Prognosis. Circulation. 2009;120(11):928-934.' },
    { num: 51, text: 'Viau JA, et al. The Yield of CT of the Head Among Patients Presenting with Syncope: A Systematic Review. Acad Emerg Med. 2019;26(5):479-490.' },
    { num: 52, text: 'Thiruganasambandamoorthy V, et al. Prevalence of PE Among ED Patients with Syncope: A Multicenter Prospective Cohort Study. Ann Emerg Med. 2019;73(5):500-510.' },
    { num: 53, text: 'Oqab Z, et al. Prevalence of PE in Patients Presenting with Syncope: A Systematic Review and Meta-Analysis. Am J Emerg Med. 2018;36(4):551-555.' },
    { num: 54, text: 'Stockley CJ, et al. The Utility of Routine D-Dimer Measurement in Syncope. Eur J Emerg Med. 2009;16(5):256-260.' },
    { num: 55, text: 'Kelly C, et al. Diagnostic Yield of PE Testing in Patients Presenting to the ED with Syncope. Res Pract Thromb Haemost. 2020;4(2):263-268.' },
    { num: 56, text: 'Richardson D. Complications of Carotid Sinus Massage — A Prospective Series of Older Patients. Age and Ageing. 2000;29(5):413-417.' },
];
