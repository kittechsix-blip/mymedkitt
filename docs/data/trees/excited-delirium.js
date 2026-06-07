// myMedKitt - Excited Delirium / Hyperactive Delirium with Severe Agitation
// Danger screen -> rapid sedation -> cooling -> acidosis/rhabdo -> QT/ECG -> disposition
export const EXCITED_DELIRIUM_MODULE_LABELS = [
    'Recognize & Secure',
    'Sedation Strategy',
    'Physiology Rescue',
    'Complications',
    'Special Populations',
    'Disposition',
];
export const EXCITED_DELIRIUM_CRITICAL_ACTIONS = [
    { text: 'Treat extreme agitation with hyperthermia, acidosis, or prolonged struggle as a resuscitation syndrome', nodeId: 'exdel-danger' },
    { text: 'Immediate threat: chemical control now. Do not delay lifesaving sedation for ECG or labs', nodeId: 'exdel-sedation-choice' },
    { text: 'Stimulant hyperthermia: benzodiazepines, rapid cooling, fluids, and complication screening are core therapy', nodeId: 'exdel-stimulant' },
    { text: 'Ketamine 4-5 mg/kg IM is appropriate when immediate violent threat prevents safer stepwise sedation', nodeId: 'exdel-ketamine' },
    { text: 'Older or frail patients usually need 25-50% lower initial doses and more respiratory monitoring', nodeId: 'exdel-elderly' },
    { text: 'Severe acidosis requires ventilation planning before intubation and early treatment of hyperthermia, shock, and rhabdo', nodeId: 'exdel-acidosis' },
    { text: 'QT risk: obtain ECG once safe, and before butyrophenones when practical in high-risk patients', nodeId: 'exdel-qt-risk' },
    { text: 'Screen early for rhabdomyolysis, hyperkalemia, AKI, DIC, liver injury, dysrhythmia, and occult trauma', nodeId: 'exdel-complications' },
];
export const EXCITED_DELIRIUM_CITATIONS = [
    {
        num: 1,
        text: 'American College of Emergency Physicians. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Out-of-Hospital or ED Patients Presenting With Severe Agitation. Ann Emerg Med. 2024.',
    },
    {
        num: 2,
        text: 'ACEP Task Force Report on Hyperactive Delirium with Severe Agitation in Emergency Settings. American College of Emergency Physicians. Accessed 2026-06-07.',
    },
    {
        num: 3,
        text: 'Wilson MP, Pepper D, Currier GW, Holloman GH Jr, Feifel D. The psychopharmacology of agitation: consensus statement of the American Association for Emergency Psychiatry Project BETA Psychopharmacology Workgroup. West J Emerg Med. 2012;13(1):26-34.',
    },
    {
        num: 4,
        text: 'UpToDate. The acutely agitated or violent adult: pharmacologic management and emergency evaluation. Accessed 2026-06-07.',
    },
    {
        num: 5,
        text: 'Farkas J. Sympathomimetic intoxication and withdrawal. EMCrit Internet Book of Critical Care. Updated 2025. Accessed 2026-06-07.',
    },
    {
        num: 6,
        text: 'American Heart Association. Adult and Pediatric Special Circumstances of Resuscitation: sympathomimetic poisoning. CPR and ECC Guidelines. Accessed 2026-06-07.',
    },
    {
        num: 7,
        text: 'Green SM, Roback MG, Kennedy RM, Krauss B. Clinical practice guideline for emergency department ketamine dissociative sedation. Ann Emerg Med. 2011;57(5):449-461.',
    },
    {
        num: 8,
        text: 'University of Illinois Chicago Drug Information Group. What is the risk of QT prolongation with droperidol? 2021.',
    },
    {
        num: 9,
        text: 'Schaefer TJ, Wolford RW. Disorders of Body Temperature. In: Tintinalli JE, et al. Tintinalli Emergency Medicine. 9th ed.',
    },
    {
        num: 10,
        text: 'McMahon GM, Zeng X, Waikar SS. A risk prediction score for kidney failure or mortality in rhabdomyolysis. JAMA Intern Med. 2013;173(19):1821-1828.',
    },
    {
        num: 11,
        text: 'AAST Critical Care Committee Clinical Consensus Document: Rhabdomyolysis. Trauma Surg Acute Care Open. 2022;7:e000836.',
    },
    {
        num: 12,
        text: 'American Geriatrics Society 2023 updated AGS Beers Criteria for potentially inappropriate medication use in older adults. J Am Geriatr Soc. 2023;71(7):2052-2081.',
    },
];
export const EXCITED_DELIRIUM_NODES = [
    {
        id: 'exdel-start',
        type: 'question',
        module: 1,
        title: 'Excited Delirium / Hyperactive Delirium: First Screen',
        body: `This consult is for severe hyperactive delirium with dangerous agitation, especially when paired with hyperthermia, acidosis, stimulant toxidrome, prolonged struggle, restraint, or physiologic collapse.

Use the term "excited delirium" for searchability, not as a final diagnosis. Treat the physiology first, then find the cause.`,
        citation: [1, 2, 3],
        options: [
            {
                label: 'Immediate threat, prolonged struggle, or physiologic danger',
                description: 'Cannot safely assess, violent threat, exhaustion, hyperthermia, acidosis, hypoxia, shock, or restraint struggle',
                next: 'exdel-danger',
                urgency: 'critical',
            },
            {
                label: 'Agitated but not currently dangerous',
                description: 'Can talk, separate from triggers, and obtain targeted vitals without unsafe restraint',
                next: 'exdel-not-danger',
                urgency: 'urgent',
            },
        ],
        summary: 'First decide whether this is a dangerous resuscitation syndrome or agitation that allows assessment first.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-danger',
        type: 'info',
        module: 1,
        title: 'Danger Path: Control the Room and the Physiology',
        body: `Treat as a resuscitation.

Immediate actions:
- Call security, nursing, respiratory therapy, and a physician team lead.
- Assign roles before contact: medication, airway, monitor, IV/IO/labs, cooling, restraints.
- Remove weapons and reduce noise/stimulation if this does not delay control.
- Avoid prone, hog-tie, or compressive restraint. Move to supine or lateral as soon as safely possible.
- Chemical control early. Physical restraint is a bridge to medication, not definitive treatment.
- Put on continuous pulse oximetry, cardiac monitor, BP cycling, and capnography as soon as safe.
- Obtain rectal/core temperature when feasible.

Stop the struggle. Heat, catecholamines, lactate, hypoxia, rhabdomyolysis, and positional asphyxia are the killers.`,
        citation: [1, 2, 3, 5, 6],
        next: 'exdel-rapid-screen',
        summary: 'Dangerous hyperactive delirium is a resuscitation syndrome: stop the struggle, sedate early, monitor, cool, and treat complications.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-not-danger',
        type: 'info',
        module: 1,
        title: 'Assessment-First Path: Keep It Short',
        body: `If the patient can be engaged safely, use verbal de-escalation while another clinician screens for reversible medical danger.

Rapid screen:
- Glucose.
- Oxygen saturation and ETCO2 if available.
- Temperature.
- Pulse, BP, respiratory rate.
- Trauma, toxidrome, meningismus, focal neuro deficit, hypoxia, hypoglycemia, sepsis, withdrawal, pregnancy, and medication causes.

Escalate immediately to the danger path if agitation worsens, temperature is high, the patient becomes exhausted, or staff cannot safely assess.`,
        citation: [2, 3, 4],
        next: 'exdel-rapid-screen',
        summary: 'If safe, de-escalate while rapidly screening for glucose, oxygenation, temperature, toxidrome, trauma, and infection.',
    },
    {
        id: 'exdel-rapid-screen',
        type: 'question',
        module: 1,
        title: 'Which Phenotype Fits Best?',
        body: 'Pick the dominant phenotype. You can return after the first sedation pass.',
        options: [
            {
                label: 'Hyperthermia, diaphoresis, mydriasis, tachycardia, hypertension',
                description: 'Cocaine, methamphetamine, synthetic cathinones, MDMA, serotonin syndrome, heat stroke, or mixed tox',
                next: 'exdel-stimulant',
                urgency: 'critical',
            },
            {
                label: 'Severe undifferentiated agitation or delirium',
                description: 'No clear toxidrome yet, but patient is unsafe or physiologically stressed',
                next: 'exdel-true-resus',
                urgency: 'critical',
            },
            {
                label: 'Possible older/frail delirium',
                description: 'Age, dementia, frailty, polypharmacy, infection, dehydration, urinary retention, hypoxia, or metabolic cause',
                next: 'exdel-elderly',
                urgency: 'urgent',
            },
            {
                label: 'Medical mimic likely',
                description: 'Sepsis, CNS infection/bleed, hypoglycemia, hypoxia, withdrawal, thyroid storm, NMS, serotonin syndrome, heat stroke',
                next: 'exdel-medical-mimics',
                urgency: 'critical',
            },
        ],
        summary: 'Identify stimulant/hyperthermic physiology, undifferentiated severe delirium, older frailty, or a medical mimic.',
    },
    {
        id: 'exdel-true-resus',
        type: 'info',
        module: 1,
        title: 'Core Syndrome: Hyperactive Delirium with Severe Agitation',
        body: `This is not a psychiatric clearance problem. It is a high-risk physiologic state until proven otherwise.

High-risk features:
- Extreme agitation, panic, paranoia, or incoherent delirium.
- Prolonged physical struggle or restraint.
- Hyperthermia or hot, diaphoretic skin.
- Tachycardia, hypertension, hypoxia, shock, or exhaustion.
- Severe lactate/acidosis, rhabdomyolysis, AKI, hyperkalemia, dysrhythmia, or seizures.

Treat first:
- Sedation to stop muscle activity and catecholamine surge.
- Cooling if temperature elevated.
- IV/IO access, fluids, core labs, ECG when safe, and complication surveillance.
- Search for tox, heat illness, infection, trauma, CNS, endocrine, withdrawal, and medication causes.`,
        citation: [1, 2, 4, 5, 6],
        next: 'exdel-sedation-choice',
        summary: 'Severe hyperactive delirium is dangerous until physiology is controlled and medical causes are excluded.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-stimulant',
        type: 'info',
        module: 1,
        title: 'Stimulant or Hyperthermic Phenotype',
        body: `Think cocaine, methamphetamine, MDMA, synthetic cathinones, PCP co-ingestion, serotonin syndrome, anticholinergic toxicity, or heat stroke.

Treatment priorities:
- Benzodiazepines are core therapy for stimulant agitation, sympathomimetic toxicity, and seizures.
- Rapid external cooling for life-threatening hyperthermia.
- IV crystalloid, electrolyte correction, and rhabdomyolysis surveillance.
- Avoid antipsychotic-only sedation in cocaine or stimulant-associated life-threatening hyperthermia.
- Do not use antipyretics for heat illness or exertional/stimulant hyperthermia. They do not fix the mechanism.

Red flags requiring ICU-level thinking now:
- Temperature >= 40 C.
- pH < 7.20, rising lactate after sedation, or shock.
- Seizure, coma, dysrhythmia, QRS widening, QTc > 500 ms, hyperkalemia.
- CK rising rapidly, AKI, DIC, liver injury, or persistent severe agitation despite initial sedation.`,
        citation: [5, 6, 9, 11],
        next: 'exdel-sedation-choice',
        summary: 'Stimulant hyperthermia needs benzodiazepines, cooling, fluids, and complication surveillance; avoid antipsychotic-only therapy.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-medical-mimics',
        type: 'info',
        module: 1,
        title: 'Do Not Miss Medical Causes',
        body: `Hyperactive delirium is a presentation, not the cause.

Actively evaluate:
- Hypoglycemia or hypoxia.
- Sepsis, meningitis, encephalitis.
- Intracranial hemorrhage, stroke, seizure/postictal state, head trauma.
- Heat stroke, serotonin syndrome, NMS, anticholinergic toxicity, salicylate/toxic alcohols, CO, alcohol or sedative withdrawal.
- Thyroid storm, adrenal crisis, hepatic/uremic encephalopathy.
- Pain, urinary retention, fecal impaction, medication toxicity, polypharmacy.

Useful myMedKitt cross-checks:
- Heat stroke: <a href="#/tree/heat-stroke">open Heat Stroke</a>
- Serotonin syndrome: <a href="#/tree/serotonin-syndrome">open Serotonin Syndrome</a>
- NMS: <a href="#/tree/nms">open NMS</a>
- Alcohol withdrawal: <a href="#/tree/alcohol-withdrawal">open Alcohol Withdrawal</a>
- Organic vs psych: <a href="#/tree/organic-vs-psych">open Organic vs Psychiatric Emergency</a>`,
        citation: [2, 4, 5, 6],
        next: 'exdel-sedation-choice',
        summary: 'Treat the agitation while looking for tox, heat illness, infection, CNS, endocrine, withdrawal, pain, and medication causes.',
    },
    {
        id: 'exdel-sedation-choice',
        type: 'question',
        module: 2,
        title: 'Sedation Strategy: Pick the Patient in Front of You',
        body: `The safest medication is the one that reliably stops dangerous muscle activity and lets the team monitor, cool, oxygenate, and diagnose.

Do not delay sedation for ECG or labs if the patient is an immediate violent threat or physiologically crashing.`,
        citation: [1, 3, 4],
        options: [
            {
                label: 'Immediate violent threat or cannot safely inject slowly',
                description: 'One decisive IM dose is safer than prolonged struggle',
                next: 'exdel-ketamine',
                urgency: 'critical',
            },
            {
                label: 'Stimulant, withdrawal, seizure risk, or hyperthermic toxidrome',
                description: 'Benzodiazepines are first-line physiology treatment',
                next: 'exdel-benzo',
                urgency: 'critical',
            },
            {
                label: 'Undifferentiated severe agitation without dominant tox hyperthermia',
                description: 'Droperidol plus midazolam, or antipsychotic plus benzodiazepine, is evidence-supported',
                next: 'exdel-droperidol-combo',
                urgency: 'urgent',
            },
            {
                label: 'Older/frail/dementia or high respiratory-risk patient',
                description: 'Dose reduction and respiratory monitoring matter more than speed alone',
                next: 'exdel-elderly',
                urgency: 'urgent',
            },
            {
                label: 'Known long QT, multiple QT drugs, electrolyte risk, or QTc > 500',
                description: 'Choose a QT-conscious pathway',
                next: 'exdel-qt-risk',
                urgency: 'urgent',
            },
            {
                label: 'Severe acidosis, exhaustion, shock, or possible airway failure',
                description: 'Sedation and ventilation planning must happen together',
                next: 'exdel-acidosis',
                urgency: 'critical',
            },
        ],
        summary: 'Choose sedation by immediate danger, stimulant/hyperthermia, undifferentiated agitation, frailty, QT risk, or acidosis.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-ketamine',
        type: 'result',
        module: 2,
        title: 'Immediate Threat: Ketamine Dissociation',
        body: `Use when the patient is an immediate danger and prolonged struggle is more dangerous than dissociation.

Good fit:
- Uncontrolled violent behavior preventing safe care.
- Failed or impossible stepwise sedation.
- Hyperthermic/exhausted patient who needs immediate control for cooling and monitoring.

Cautions:
- Prepare airway, suction, oxygen, monitor, and capnography.
- Watch for hypersalivation, laryngospasm, emesis, hypertension, tachycardia, and emergence.
- Post-ketamine intubation risk is higher in profoundly intoxicated, acidotic, or repeatedly sedated patients. Reassess early.`,
        recommendation: 'Ketamine provides fastest reliable control when immediate threat makes prolonged struggle unsafe.',
        treatment: {
            firstLine: {
                drug: 'Ketamine',
                dose: '4-5 mg/kg',
                route: 'IM',
                frequency: 'Once; reassess at 5-10 min',
                duration: 'Single dissociative dose',
                notes: 'Use actual body weight estimate. Have airway-ready monitoring at bedside.',
                confidence: 'critical',
            },
            alternative: {
                drug: 'Ketamine',
                dose: '1-2 mg/kg',
                route: 'IV/IO',
                frequency: 'Slow IV push when access and team control are available',
                duration: 'Single dissociative dose',
                notes: 'Consider lower end if older, shocky, or already sedated.',
                confidence: 'critical',
            },
            monitoring: 'Continuous SpO2, ETCO2, ECG, BP, airway readiness, temperature, and post-sedation reassessment for acidosis/hyperthermia.',
        },
        confidence: 'recommended',
        citation: [1, 4, 7],
        next: 'exdel-post-sedation',
        summary: 'Ketamine 4-5 mg/kg IM is fastest for immediate violent threat, but requires airway-ready monitoring.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-benzo',
        type: 'result',
        module: 2,
        title: 'Stimulant, Withdrawal, or Hyperthermic Toxidrome: Benzodiazepines',
        body: `Benzodiazepines directly treat sympathomimetic surge, withdrawal physiology, seizures, and muscle activity.

Use repeated titration when the patient remains dangerously agitated, hypertensive, tachycardic, hyperthermic, or seizing.

Avoid underdosing the crashing stimulant patient, but plan respiratory support in older, intoxicated, hypoventilating, or multi-sedative patients.`,
        recommendation: 'Use benzodiazepines as core therapy for stimulant/hyperthermic agitation, withdrawal, and seizure-risk agitation.',
        treatment: {
            firstLine: {
                drug: 'Midazolam',
                dose: '5 mg IM or 2-5 mg IV',
                route: 'IM/IV/IO',
                frequency: 'Repeat every 5-10 min to control dangerous agitation',
                duration: 'Until physiology controlled',
                notes: 'IM onset is rapid and practical when IV access is unsafe. Use lower starting dose in frail/older patients.',
                confidence: 'standard',
            },
            alternative: {
                drug: 'Lorazepam',
                dose: '2-4 mg',
                route: 'IV/IM',
                frequency: 'Repeat every 10-15 min as needed',
                duration: 'Until controlled',
                notes: 'Slower IM absorption than midazolam. Useful when longer effect is desired.',
                confidence: 'standard',
            },
            monitoring: 'Continuous SpO2, ETCO2 if available, respiratory rate, BP, ECG, temperature, and airway readiness.',
        },
        confidence: 'recommended',
        citation: [1, 3, 4, 5, 6],
        next: 'exdel-post-sedation',
        summary: 'Midazolam 5 mg IM or 2-5 mg IV, repeat q5-10 min, is core therapy for stimulant and withdrawal physiology.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-droperidol-combo',
        type: 'result',
        module: 2,
        title: 'Undifferentiated Severe Agitation: Droperidol + Midazolam',
        body: `For severe agitation without stimulant hyperthermia or high QT risk, ACEP supports droperidol plus midazolam, or an atypical antipsychotic plus midazolam, for more rapid and efficacious sedation than either class alone.

Do not let the ECG requirement create a dangerous delay. If the patient is an immediate threat, sedate first and obtain ECG as soon as safe.

Avoid this as antipsychotic-only therapy in cocaine/stimulant-associated life-threatening hyperthermia.`,
        recommendation: 'Use combination sedation when undifferentiated severe agitation needs fast reliable control and stimulant hyperthermia/QT risk are not dominant.',
        treatment: {
            firstLine: {
                drug: 'Droperidol + midazolam',
                dose: 'Droperidol 5-10 mg + midazolam 5 mg',
                route: 'IM or IV',
                frequency: 'Once, reassess in 10-15 min',
                duration: 'Single combination dose with reassessment',
                notes: 'Use lower doses in older/frail patients or when other sedatives are onboard.',
                confidence: 'standard',
            },
            alternative: {
                drug: 'Olanzapine',
                dose: '5-10 mg',
                route: 'IM/ODT/PO',
                frequency: 'Once, reassess',
                duration: 'Single dose with reassessment',
                notes: 'Do not give IM olanzapine close to parenteral benzodiazepines due to respiratory/cardiopulmonary risk.',
                confidence: 'caution',
            },
            monitoring: 'SpO2, ETCO2 if feasible, BP, ECG when safe, sedation depth, airway, and QT/electrolyte risk.',
        },
        confidence: 'recommended',
        citation: [1, 3, 4, 8],
        next: 'exdel-qt-risk',
        summary: 'Droperidol 5-10 mg plus midazolam 5 mg is evidence-supported for undifferentiated severe agitation when QT/stimulant hyperthermia are not dominant.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-elderly',
        type: 'info',
        module: 5,
        title: 'Older, Frail, Dementia, or Respiratory-Risk Patient',
        body: `Assume lower reserve, higher delirium burden, and higher harm from oversedation, aspiration, falls, QT prolongation, and anticholinergic load.

Principles:
- Treat pain, urinary retention, hypoxia, infection, dehydration, constipation, withdrawal, and medication toxicity.
- Use verbal de-escalation, family/reorientation, hearing aids/glasses, light, warmth, and bladder/pain treatment when safe.
- If medication is needed, start 25-50% lower than standard adult doses and reassess.
- Avoid benzodiazepines for routine geriatric delirium unless alcohol/sedative withdrawal, stimulant toxidrome, seizure risk, or immediate safety need.
- Avoid anticholinergics when possible.
- Avoid stacking IM olanzapine with parenteral benzodiazepines.

Reasonable starting doses:
- Haloperidol 0.5-1 mg PO/IM/IV, reassess.
- Olanzapine 2.5-5 mg PO/ODT/IM, avoid near parenteral benzodiazepines.
- Droperidol 1.25-2.5 mg IM/IV if QT risk acceptable.
- Midazolam 1-2 mg IM/IV only when benzo-indicated or immediate safety requires it.
- Ketamine 1-2 mg/kg IM or lower IV dosing only for immediate threat where slower options are unsafe.`,
        citation: [3, 4, 8, 12],
        next: 'exdel-qt-risk',
        summary: 'Older/frail patients usually need 25-50% lower doses, delirium trigger treatment, and more respiratory/QT monitoring.',
        safetyLevel: 'warning',
    },
    {
        id: 'exdel-qt-risk',
        type: 'question',
        module: 5,
        title: 'QT / ECG Decision',
        body: `Question: should ECG change medication timing?

Bottom line:
- Immediate threat: do not delay lifesaving sedation for ECG.
- High QT risk but controllable patient: get ECG and correct electrolytes before butyrophenones when practical.
- After haloperidol or droperidol: obtain ECG once safe if risk factors, higher doses, repeated dosing, electrolyte abnormality, or any concerning rhythm.`,
        citation: [1, 3, 4, 8],
        options: [
            {
                label: 'Immediate threat or unsafe to obtain ECG',
                description: 'Sedate now, then get ECG and electrolytes as soon as safe',
                next: 'exdel-qt-later',
                urgency: 'critical',
            },
            {
                label: 'Known long QT, QTc > 500, torsades history, high-risk meds, or low K/Mg',
                description: 'Avoid or minimize QT-prolonging sedatives when practical',
                next: 'exdel-qt-high',
                urgency: 'urgent',
            },
            {
                label: 'No known QT risk and standard dose planned',
                description: 'Reasonable to treat, monitor, and obtain ECG after control if clinically indicated',
                next: 'exdel-qt-standard',
                urgency: 'routine',
            },
        ],
        summary: 'Do not delay lifesaving sedation for ECG, but use ECG/electrolytes to guide QT-risk patients when practical.',
        safetyLevel: 'warning',
    },
    {
        id: 'exdel-qt-later',
        type: 'info',
        module: 5,
        title: 'ECG Later: Sedation Cannot Wait',
        body: `When the patient is an immediate threat, prolonged struggle is the bigger danger.

Action:
- Sedate with the medication most likely to control the threat.
- Place monitor as soon as possible.
- Obtain ECG after chemical control.
- Check K, Mg, Ca, pH, temperature, renal function, and co-ingestions.
- Correct K to high-normal and Mg if QT prolonged or torsades risk.

If QTc is > 500 ms after control, avoid further QT-prolonging drugs when possible and switch to benzodiazepine, ketamine, or airway/ICU sedation strategy as clinically appropriate.`,
        citation: [1, 4, 8],
        next: 'exdel-post-sedation',
        summary: 'For immediate threat, sedate first, then obtain ECG and correct electrolytes once safe.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-qt-high',
        type: 'info',
        module: 5,
        title: 'High QT Risk: Medication Choices',
        body: `High-risk QT features:
- Known long QT syndrome.
- QTc > 500 ms or torsades history.
- Multiple QT-prolonging medications.
- Hypokalemia, hypomagnesemia, hypocalcemia.
- Bradycardia, structural heart disease, severe renal/hepatic dysfunction, or high-dose/repeated antipsychotic exposure.

Prefer:
- Benzodiazepines when tox/withdrawal/stimulant physiology or severe immediate safety need.
- Ketamine for immediate uncontrolled threat.
- Olanzapine can be considered for primary psychiatric agitation, but avoid combining IM olanzapine with parenteral benzodiazepines.

Avoid/minimize:
- Additional haloperidol or droperidol when QTc > 500 ms unless benefit clearly outweighs risk and monitoring/electrolyte correction are active.`,
        citation: [1, 3, 4, 8],
        next: 'exdel-post-sedation',
        summary: 'QTc > 500 ms or major QT risk should push away from repeated butyrophenones when alternatives are workable.',
        safetyLevel: 'warning',
    },
    {
        id: 'exdel-qt-standard',
        type: 'info',
        module: 5,
        title: 'Standard QT Risk: Practical Monitoring',
        body: `For standard-dose droperidol or haloperidol in a patient without known QT risk:
- Give needed sedation.
- Monitor clinically and place ECG/cardiac monitor as soon as feasible.
- Obtain ECG earlier if repeated dosing, older/frail patient, polypharmacy, electrolyte risk, renal failure, chest pain, syncope, stimulant intoxication, or dysrhythmia.

Droperidol carries a boxed QT warning, but ED literature and specialty statements support low absolute risk at typical agitation doses when used with appropriate monitoring and patient selection.`,
        citation: [1, 3, 8],
        next: 'exdel-post-sedation',
        summary: 'Standard-risk patients can be sedated first with appropriate monitoring; escalate ECG concern with risk factors or repeated dosing.',
    },
    {
        id: 'exdel-post-sedation',
        type: 'question',
        module: 3,
        title: 'After Initial Sedation: Is Physiology Controlled?',
        body: `Reassess within minutes.

Controlled means:
- Patient can be monitored without prolonged struggle.
- Oxygenation and ventilation are acceptable.
- Temperature is measured and cooling is underway if elevated.
- BP/perfusion are acceptable or being actively resuscitated.
- Lactate/acidosis are expected to improve after control of struggle and heat.
- Team can obtain labs, ECG, and trauma/tox/infection evaluation.`,
        citation: [1, 2, 5, 6],
        options: [
            {
                label: 'Controlled enough to monitor and resuscitate',
                description: 'Proceed to cooling, labs, ECG, and complication screen',
                next: 'exdel-cooling',
                urgency: 'urgent',
            },
            {
                label: 'Still dangerous or medication failed',
                description: 'Refractory agitation, persistent violent movement, or unsafe monitoring',
                next: 'exdel-refractory',
                urgency: 'critical',
            },
            {
                label: 'Respiratory failure, severe acidosis, shock, or exhaustion',
                description: 'Sedation and airway/ventilation planning now',
                next: 'exdel-acidosis',
                urgency: 'critical',
            },
        ],
        summary: 'After sedation, immediately reassess control, oxygenation, ventilation, temperature, perfusion, and failure risk.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-refractory',
        type: 'info',
        module: 2,
        title: 'Refractory Agitation',
        body: `If initial sedation fails:
- Confirm dose, route, time since administration, and whether medication actually entered muscle/IV.
- Add a second class rather than repeating tiny ineffective doses.
- If benzodiazepines failed and immediate threat persists, use ketamine.
- If antipsychotic failed and stimulant/withdrawal physiology is possible, add benzodiazepine.
- If repeated sedation is required, move to airway-ready resuscitation and ICU-level sedation planning.
- Recheck the diagnosis: hypoxia, hypoglycemia, hyperthermia, seizure, head trauma, sepsis, serotonin syndrome, NMS, anticholinergic toxicity, PCP, salicylate, or withdrawal.

Do not keep piling physical restraint onto an actively fighting, hyperthermic, acidotic patient. That worsens the problem.`,
        citation: [1, 2, 3, 5, 6],
        next: 'exdel-acidosis',
        summary: 'Failed sedation needs decisive second-class therapy, ketamine for immediate threat, and airway/ICU planning if repeated doses are needed.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-acidosis',
        type: 'info',
        module: 3,
        title: 'Severe Acidosis, Exhaustion, or Shock',
        body: `Severe acidosis in this syndrome is usually from muscle activity, hyperthermia, seizure, hypoxia, shock, stimulant toxicity, or rhabdomyolysis. It can improve quickly once movement and heat are controlled, but it can also signal impending arrest.

Immediate actions:
- Stop muscle activity with sedation.
- Oxygenate and ventilate. Use ETCO2 and blood gas trends.
- Cool if hyperthermic.
- Treat shock and hypovolemia with crystalloid and vasopressors as needed.
- Check glucose, lactate/pH, K, Ca, Mg, CK, creatinine, troponin, ECG, tox labs when indicated.
- Treat hyperkalemia immediately if present.

Airway caution:
- If intubating a patient with profound metabolic acidosis, match or exceed pre-intubation minute ventilation immediately after paralysis. Post-intubation hypoventilation can precipitate arrest.
- Avoid paralytic-only control without a plan for sedation, cooling, ventilation, and ongoing resuscitation.

Bicarbonate:
- Do not use bicarbonate routinely for lactic acidosis from struggle.
- Consider sodium bicarbonate when severe acidemia is life-threatening, especially pH < 7.1 with shock, severe hyperkalemia, sodium-channel blockade, or selected rhabdomyolysis scenarios.
- For drip setup: <a href="#/tree/sodium-bicarbonate-drip">open Sodium Bicarbonate Drip Protocol</a>.`,
        citation: [5, 6, 10, 11],
        next: 'exdel-airway-decision',
        summary: 'Severe acidosis requires sedation, cooling, oxygenation, ventilation planning, shock treatment, and selective bicarbonate only for specific indications.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-airway-decision',
        type: 'question',
        module: 3,
        title: 'Need Airway or ICU Sedation Now?',
        body: 'Decide early. Intubation can be lifesaving, but it can also cause arrest if ventilation, acidemia, potassium, and shock are not anticipated.',
        options: [
            {
                label: 'Yes: airway failure, exhaustion, severe acidosis, shock, or repeated deep sedation',
                description: 'Plan airway with acid-base and hyperkalemia in mind',
                next: 'exdel-airway-plan',
                urgency: 'critical',
            },
            {
                label: 'No: controlled and ventilating adequately',
                description: 'Continue cooling, monitoring, labs, and complication screen',
                next: 'exdel-cooling',
                urgency: 'urgent',
            },
        ],
        summary: 'Intubate when airway, ventilation, exhaustion, shock, repeated sedation, or severe acidosis require controlled resuscitation.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-airway-plan',
        type: 'info',
        module: 3,
        title: 'Airway Plan for Acidotic Hyperactive Delirium',
        body: `Before RSI:
- Preoxygenate aggressively.
- Treat hyperkalemia if suspected or confirmed.
- Prepare vasopressor support for shock.
- Choose induction that fits hemodynamics.
- Avoid succinylcholine if hyperkalemia, severe rhabdomyolysis, crush, burn, neuromuscular disease, or prolonged immobilization is suspected. Use rocuronium.
- Have post-intubation sedation ready before paralysis.

After tube:
- Immediately match high minute ventilation if severe metabolic acidosis is present.
- Use ETCO2 and blood gas to avoid sudden CO2 rise.
- Continue active cooling.
- Continue fluids and electrolyte correction.
- Use ICU sedatives/analgesia as needed: propofol if BP tolerates, fentanyl, midazolam, dexmedetomidine in selected patients, or ketamine infusion when appropriate.

Parallel consults:
- Airway technique: <a href="#/tree/difficult-airway-bougie">open Difficult Airway</a>
- Acidosis/bicarbonate: <a href="#/tree/sodium-bicarbonate-drip">open Sodium Bicarbonate Drip</a>
- Hyperkalemia: <a href="#/tree/potassium">open Potassium Disorders</a>`,
        citation: [4, 5, 6, 7, 11],
        next: 'exdel-cooling',
        summary: 'For severe acidosis, preoxygenate, avoid succinylcholine if hyperK/rhabdo risk, and match minute ventilation immediately after intubation.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-cooling',
        type: 'info',
        module: 3,
        title: 'Hyperthermia: Cool While Sedating',
        body: `Measure core temperature when feasible. Do not wait for labs.

If temperature is elevated with severe agitation or stimulant/heat physiology:
- Stop muscle activity with sedation.
- Remove clothing and external heat sources.
- Evaporative cooling: spray water plus fans.
- Ice packs to neck, axillae, groin.
- Cold IV crystalloid can help but is not enough alone.
- Consider ice-water immersion or aggressive external cooling for life-threatening hyperthermia when operationally feasible.
- Treat shivering or recurrent agitation.

Targets:
- Rapidly reduce dangerous hyperthermia.
- Avoid overcooling once approaching 38-39 C depending on syndrome and trajectory.

Do not use acetaminophen/NSAIDs as primary therapy for heat stroke or stimulant hyperthermia.`,
        citation: [5, 6, 9],
        next: 'exdel-fluids',
        summary: 'Hyperthermic severe agitation needs immediate sedation plus active external cooling, not antipyretics.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-fluids',
        type: 'info',
        module: 3,
        title: 'Fluids and Perfusion',
        body: `Initial goals:
- Restore perfusion.
- Support renal flow in rhabdomyolysis.
- Correct hypovolemia from exertion, hyperthermia, diaphoresis, poor intake, and stimulant physiology.

Approach:
- Use balanced crystalloid or normal saline based on local practice, electrolytes, and acid-base status.
- Reassess after each bolus: BP, lung exam, urine output, lactate/pH, CK, creatinine, K, Ca.
- Place Foley if rhabdomyolysis, AKI, shock, or critical illness.
- Escalate to vasopressors if shock persists after appropriate fluids.

Rhabdomyolysis cross-check:
- <a href="#/tree/rhabdomyolysis">open Rhabdomyolysis</a>
- Use McMahon score when labs available to estimate risk.`,
        citation: [10, 11],
        calculatorLinks: [{ id: 'mcmahon-rhabdo', label: 'McMahon Rhabdo Risk' }],
        next: 'exdel-workup',
        summary: 'Use fluids to restore perfusion and protect kidneys, then reassess urine output, CK, creatinine, K, Ca, and acid-base status.',
        safetyLevel: 'warning',
    },
    {
        id: 'exdel-workup',
        type: 'info',
        module: 4,
        title: 'Minimum Workup After Control',
        body: `Tailor to the patient, but severe hyperactive delirium commonly needs:
- POC glucose.
- Core temperature.
- ECG and continuous monitoring.
- VBG/ABG with lactate if severe, hyperthermic, hypoxic, shocked, or exhausted.
- CMP, Mg, Phos, Ca.
- CK now and repeat if rising.
- UA for blood/myoglobin, urine output.
- CBC, cultures, antibiotics if infection possible.
- Troponin if stimulant, chest pain, dysrhythmia, shock, older patient, or concerning ECG.
- Coags, fibrinogen, LFTs if hyperthermia, DIC, liver injury, or severe illness.
- Acetaminophen, salicylate, ethanol, pregnancy test, and targeted tox testing when indicated.
- CT head/trauma imaging only after stabilization unless neuro catastrophe is driving the presentation.`,
        citation: [2, 4, 5, 6, 10, 11],
        next: 'exdel-complications',
        summary: 'After control, obtain ECG, core temp, acid-base/lactate, CK, renal/electrolytes, urine output, and targeted tox/infection/trauma testing.',
        safetyLevel: 'warning',
    },
    {
        id: 'exdel-complications',
        type: 'question',
        module: 4,
        title: 'Complication Screen: What Is Most Dangerous Right Now?',
        body: 'Pick the dominant active complication. Multiple may be present.',
        options: [
            {
                label: 'Rhabdomyolysis, AKI, dark urine, or CK rising',
                next: 'exdel-rhabdo',
                urgency: 'critical',
            },
            {
                label: 'Hyperkalemia, severe electrolyte abnormality, or ECG change',
                next: 'exdel-hyperkalemia',
                urgency: 'critical',
            },
            {
                label: 'Dysrhythmia, QT prolongation, ischemia, or chest pain',
                next: 'exdel-arrhythmia',
                urgency: 'critical',
            },
            {
                label: 'Hyperthermia organ injury, DIC, liver injury, seizure, or coma',
                next: 'exdel-hyperthermia-comp',
                urgency: 'critical',
            },
            {
                label: 'No major complication yet',
                next: 'exdel-restraints',
                urgency: 'urgent',
            },
        ],
        summary: 'Screen for rhabdo/AKI, hyperkalemia, dysrhythmia/QT/ischemia, and hyperthermia organ injury.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-rhabdo',
        type: 'info',
        module: 4,
        title: 'Rhabdomyolysis / AKI',
        body: `Triggers in this syndrome:
- Prolonged agitation, restraint struggle, stimulant/exertional hyperthermia, seizures, coma/immobility, trauma, or compartment syndrome.

Actions:
- IV crystalloid and urine output monitoring.
- Repeat CK, creatinine, K, Ca, Phos, Mg, lactate/pH.
- Treat hyperkalemia urgently.
- Look for compartment syndrome and traumatic injury.
- Avoid routine bicarbonate for CK alone.
- Consider bicarbonate when severe acidemia, hyperkalemia, sodium-channel blockade, or selected severe rhabdo scenarios justify it.
- Dialysis for standard indications: refractory hyperkalemia, severe acidosis, volume overload, uremic complications.

Open full consult: <a href="#/tree/rhabdomyolysis">Rhabdomyolysis</a>`,
        citation: [10, 11],
        calculatorLinks: [{ id: 'mcmahon-rhabdo', label: 'McMahon Rhabdo Risk' }],
        next: 'exdel-restraints',
        summary: 'Rhabdo needs fluids, urine output, CK/renal/electrolyte trends, hyperkalemia treatment, and full rhabdo pathway if severe.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-hyperkalemia',
        type: 'info',
        module: 4,
        title: 'Hyperkalemia / Electrolyte Threat',
        body: `Hyperkalemia may come from rhabdomyolysis, acidosis, renal failure, crush/trauma, or succinylcholine exposure.

Treat immediately if ECG changes, K severe, or patient unstable:
- Calcium for membrane stabilization.
- Insulin/dextrose, albuterol, and bicarbonate if severe acidemia or specific indication.
- Fluids and renal elimination strategy.
- Dialysis if refractory or renal failure severe.

Also correct:
- Hypomagnesemia and hypokalemia when QT prolongation or torsades risk.
- Hypocalcemia only if symptomatic, severe, or contributing to dysrhythmia. Do not chase mild asymptomatic hypocalcemia in rhabdomyolysis.

Open full consult: <a href="#/tree/potassium">Potassium Disorders</a>`,
        citation: [5, 6, 10, 11],
        next: 'exdel-restraints',
        summary: 'Treat unstable hyperkalemia immediately and correct Mg/K/Ca strategically, especially when QT risk is present.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-arrhythmia',
        type: 'info',
        module: 4,
        title: 'Dysrhythmia, QT, Ischemia, or Stimulant Cardiotoxicity',
        body: `Actions:
- ECG now if not already obtained.
- Correct hypoxia, hyperthermia, acidosis, K, Mg, Ca, and shock.
- Treat stimulant chest pain/HTN primarily with benzodiazepines and supportive care.
- Consider sodium bicarbonate for cocaine/sodium-channel blockade with QRS widening.
- Avoid additional QT-prolonging sedatives if QTc > 500 ms or torsades risk.
- Give magnesium for torsades or marked QT instability.
- Treat ACS, aortic catastrophe, myocarditis, or structural cardiac disease when the clinical picture fits.

If stimulant toxicity is the suspected driver, avoid beta-blocker-only reflexes in unstable mixed tox physiology. Treat the sympathomimetic state first.`,
        citation: [4, 5, 6, 8],
        next: 'exdel-restraints',
        summary: 'For dysrhythmia/QT/stimulant cardiotoxicity, correct physiology, electrolytes, temperature, acidosis, and use ECG-guided treatment.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-hyperthermia-comp',
        type: 'info',
        module: 4,
        title: 'Hyperthermia Organ Injury',
        body: `Severe hyperthermia can cause:
- Rhabdomyolysis and AKI.
- DIC and bleeding.
- Hepatic injury or failure.
- Encephalopathy, seizure, coma.
- ARDS.
- Myocardial injury, dysrhythmia, shock.

Actions:
- Continue rapid active cooling.
- ICU early.
- Trend temperature, lactate/pH, CK, Cr, K, Ca, Mg, LFTs, INR/PTT, fibrinogen, platelets, troponin, urine output.
- Treat seizures with benzodiazepines.
- Treat DIC/bleeding supportively with blood products guided by bleeding/procedures/labs.
- Search for heat stroke, serotonin syndrome, NMS, sepsis, stimulant/MDMA/cathinone tox, and exertional collapse.`,
        citation: [5, 6, 9, 11],
        next: 'exdel-restraints',
        summary: 'Severe hyperthermia can drive rhabdo, AKI, DIC, liver injury, seizure, shock, dysrhythmia, and ICU-level illness.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-restraints',
        type: 'info',
        module: 4,
        title: 'Restraint Safety After Medication',
        body: `Physical restraints should be brief and paired with chemical control and monitoring.

Do:
- Use trained team application with a leader.
- Move to supine or lateral position as soon as safely possible.
- Keep head/chest/abdomen free from compression.
- Monitor airway, breathing, circulation, neurovascular status, and mental status.
- Reassess restraints frequently and remove as soon as safe.
- Document why restraint was required, medication timing, reassessments, and complications screened.

Do not:
- Leave prone or hog-tied.
- Stack body weight on the torso.
- Continue physical struggle when medication has failed.
- Treat quietness as safety without checking ventilation, glucose, temperature, and perfusion.`,
        citation: [1, 2, 3],
        next: 'exdel-disposition',
        summary: 'Restraints are a bridge to medication and monitoring, not definitive treatment; avoid prone/compressive restraint.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-disposition',
        type: 'question',
        module: 6,
        title: 'Disposition',
        body: 'Disposition is driven by physiology, complication burden, repeated sedation, and ability to identify and reverse the cause.',
        options: [
            {
                label: 'ICU',
                description: 'Hyperthermia, severe acidosis, rhabdo/AKI, hyperK, DIC/liver injury, intubation, shock, seizures, repeated deep sedation',
                next: 'exdel-icu',
                urgency: 'critical',
            },
            {
                label: 'Medical admission / monitored observation',
                description: 'Controlled but ongoing delirium, abnormal labs, tox/withdrawal, infection, older/frail, or continued monitoring needed',
                next: 'exdel-admit',
                urgency: 'urgent',
            },
            {
                label: 'Psychiatric pathway only after medical danger excluded',
                description: 'Normal vitals/labs, no tox/heat/acidosis/rhabdo, baseline mentation returns, no medical driver found',
                next: 'exdel-psych',
                urgency: 'routine',
            },
            {
                label: 'Rare discharge',
                description: 'Clear reversible cause, full recovery, no complications, reliable observation, safe follow-up',
                next: 'exdel-discharge',
                urgency: 'routine',
            },
        ],
        summary: 'ICU for physiologic injury or repeated deep sedation; psych only after medical danger is excluded.',
        safetyLevel: 'warning',
    },
    {
        id: 'exdel-icu',
        type: 'result',
        module: 6,
        title: 'ICU Disposition',
        body: `ICU is appropriate for:
- Temperature >= 40 C or persistent hyperthermia.
- pH < 7.20, rising lactate after sedation, or severe metabolic acidosis.
- Intubation, respiratory failure, repeated deep sedation, or airway risk.
- Shock, vasopressors, severe dehydration, or perfusion failure.
- Rhabdomyolysis with AKI, severe CK trajectory, hyperkalemia, oliguria, or McMahon high risk.
- Dysrhythmia, QTc > 500 with instability, ischemia, QRS widening, torsades risk.
- DIC, liver injury/failure, seizure, coma, severe trauma, sepsis, serotonin syndrome, NMS, or heat stroke.
- Unclear cause with persistent delirium or need for continuous sedation/cooling.`,
        recommendation: 'Admit to ICU or resuscitation-capable monitored setting when physiologic injury, repeated sedation, airway risk, or organ injury is present.',
        confidence: 'recommended',
        citation: [2, 4, 5, 6, 10, 11],
        summary: 'ICU for hyperthermia, acidosis, organ injury, intubation, repeated sedation, dysrhythmia, shock, seizure, or unclear persistent delirium.',
        safetyLevel: 'critical',
    },
    {
        id: 'exdel-admit',
        type: 'result',
        module: 6,
        title: 'Medical Admission / Monitored Observation',
        body: `Medical admission or monitored observation fits when:
- Agitation is controlled, but delirium cause is not fully corrected.
- Labs are abnormal but not ICU-level.
- CK/Cr/K/lactate/temperature require trending.
- Older/frail patient has new delirium.
- Infection, withdrawal, intoxication, medication toxicity, or occult trauma remains possible.
- Additional sedation, sitter, telemetry, or serial exams are required.`,
        recommendation: 'Admit or observe medically until delirium cause, complications, and sedation effects are stable.',
        confidence: 'recommended',
        citation: [2, 4, 10, 11, 12],
        summary: 'Use medical admission or observation for ongoing delirium, abnormal trends, older/frail patients, or continued monitoring needs.',
        safetyLevel: 'warning',
    },
    {
        id: 'exdel-psych',
        type: 'result',
        module: 6,
        title: 'Psychiatric Pathway After Medical Exclusion',
        body: `Psychiatric evaluation is appropriate only after the dangerous medical physiology is resolved or excluded.

Reasonable criteria:
- Normal or explained vital signs.
- No hyperthermia, hypoxia, hypoglycemia, severe intoxication/withdrawal, sepsis, CNS emergency, or occult trauma requiring medical care.
- No clinically important acidosis, rhabdomyolysis, AKI, electrolyte threat, dysrhythmia, or organ injury.
- Sedation effects are understood and the patient can participate when clinically appropriate.

Document the medical reasoning. Do not label the event as "excited delirium" and stop the diagnostic workup.`,
        recommendation: 'Move to psychiatric assessment only after medical danger and physiologic complications have been addressed.',
        confidence: 'recommended',
        citation: [2, 3, 4],
        summary: 'Psych pathway is appropriate only after dangerous medical causes and complications are resolved or excluded.',
        safetyLevel: 'warning',
    },
    {
        id: 'exdel-discharge',
        type: 'result',
        module: 6,
        title: 'Rare Discharge Criteria',
        body: `Discharge is uncommon after true dangerous hyperactive delirium.

Minimum criteria:
- Clear reversible cause corrected.
- Returned to baseline mental status.
- Normal oxygenation, ventilation, temperature, perfusion, and gait as appropriate.
- No significant acidosis, rhabdomyolysis, AKI, hyperkalemia, dysrhythmia, ischemia, DIC/liver injury, trauma, infection, or ongoing tox/withdrawal risk.
- Sedating medication has worn off enough for safe reassessment.
- Safe environment, reliable adult observation, return precautions, and follow-up.

When uncertain, observe or admit.`,
        recommendation: 'Discharge only after full recovery, stable physiology, no complication signal, and reliable follow-up/observation.',
        confidence: 'consider',
        citation: [2, 4],
        summary: 'Discharge is rare and requires baseline mentation, stable physiology, no complication signal, and safe observation.',
        safetyLevel: 'warning',
    },
];
export const EXCITED_DELIRIUM_NODE_COUNT = EXCITED_DELIRIUM_NODES.length;
