// MedKitt — Acute Stroke Consult (Wizard Format)
// Based on AHA/ASA 2019 Guidelines
// Mayo/Stroke MD pattern for step-by-step decision support
export const ACUTE_STROKE_WIZARD = {
    id: 'acute-stroke-wizard',
    name: 'Acute Stroke',
    category: 'neurology',
    accentColor: '#92400E', // Neurology brown
    steps: [
        {
            id: 'stability',
            title: 'Initial Assessment',
            question: 'Is the patient hemodynamically stable with a secure airway?',
            subtitle: 'ABCs first - address immediate threats',
            info: 'Unstable patients need immediate airway management and hemodynamic support before stroke workup. Hypotension (SBP <90) and hypoxia worsen stroke outcomes.',
            options: [
                {
                    id: 'unstable',
                    label: 'Unstable - Needs resuscitation',
                    shortLabel: 'Unstable',
                    variant: 'urgent',
                    isTerminal: true,
                },
                {
                    id: 'stable',
                    label: 'Stable - Proceed with stroke workup',
                    shortLabel: 'Stable',
                    variant: 'safe',
                    nextStep: 'timing',
                },
            ],
        },
        {
            id: 'timing',
            title: 'Time of Onset',
            question: 'When was the patient last known well (LKW)?',
            subtitle: 'Critical for treatment eligibility',
            info: 'Last Known Well (LKW) is when the patient was last seen at baseline neurological function. For wake-up strokes, LKW is when they went to sleep.',
            options: [
                {
                    id: 'within-3h',
                    label: 'Within 3 hours',
                    shortLabel: '<3h',
                    variant: 'safe',
                    nextStep: 'nihss',
                    info: 'IV tPA window. Most time-sensitive.',
                },
                {
                    id: '3-4.5h',
                    label: '3 to 4.5 hours',
                    shortLabel: '3-4.5h',
                    variant: 'warning',
                    nextStep: 'nihss',
                    info: 'Extended tPA window with additional exclusion criteria.',
                },
                {
                    id: '4.5-24h',
                    label: '4.5 to 24 hours',
                    shortLabel: '4.5-24h',
                    nextStep: 'lvo-screen',
                    info: 'Outside tPA window. Evaluate for mechanical thrombectomy.',
                },
                {
                    id: 'over-24h',
                    label: 'Over 24 hours or unknown',
                    shortLabel: '>24h',
                    nextStep: 'no-acute',
                },
            ],
        },
        {
            id: 'nihss',
            title: 'NIHSS Score',
            question: 'What is the NIH Stroke Scale score?',
            subtitle: 'Quantifies stroke severity',
            info: 'NIHSS ranges 0-42. Higher scores = more severe stroke. NIHSS >=6 suggests LVO.',
            calculatorLink: { label: 'Calculate NIHSS', id: 'nihss' },
            options: [
                {
                    id: 'nihss-mild',
                    label: 'NIHSS 0-4 (Mild)',
                    shortLabel: 'NIHSS 0-4',
                    nextStep: 'mild-decision',
                },
                {
                    id: 'nihss-moderate',
                    label: 'NIHSS 5-15 (Moderate)',
                    shortLabel: 'NIHSS 5-15',
                    variant: 'warning',
                    nextStep: 'tpa-eligible',
                },
                {
                    id: 'nihss-severe',
                    label: 'NIHSS 16+ (Severe)',
                    shortLabel: 'NIHSS 16+',
                    variant: 'urgent',
                    nextStep: 'tpa-eligible',
                    info: 'High probability of LVO. Activate neuro-IR early.',
                },
            ],
        },
        {
            id: 'mild-decision',
            title: 'Mild Stroke',
            question: 'Are the symptoms disabling to the patient?',
            subtitle: 'Consider baseline function and occupation',
            info: 'A pianist with finger weakness or interpreter with aphasia may have disabling symptoms despite low NIHSS.',
            options: [
                {
                    id: 'disabling',
                    label: 'Yes - Symptoms are disabling',
                    shortLabel: 'Disabling',
                    nextStep: 'tpa-eligible',
                },
                {
                    id: 'not-disabling',
                    label: 'No - Minor symptoms',
                    shortLabel: 'Non-disabling',
                    nextStep: 'observe',
                },
            ],
        },
        {
            id: 'tpa-eligible',
            title: 'tPA Eligibility',
            question: 'Confirm NO absolute contraindications present:',
            subtitle: 'Check each item to confirm absence',
            type: 'checklist',
            info: 'Per AHA/ASA 2026 guidelines. Checking confirms the contraindication is ABSENT (safe to proceed).',
            options: [
                {
                    id: 'no-ich',
                    label: 'No intracranial hemorrhage on CT',
                    info: 'Any ICH (intraparenchymal, SAH, subdural) is absolute contraindication.',
                },
                {
                    id: 'no-prior-ich',
                    label: 'No history of prior ICH',
                    info: 'Prior ICH history - consider time elapsed and cause.',
                },
                {
                    id: 'bp-controlled',
                    label: 'BP <185/110 (or controlled with meds)',
                    info: 'Must achieve and maintain before tPA.',
                },
                {
                    id: 'no-recent-surgery',
                    label: 'No intracranial surgery <3 months',
                    info: 'Recent CNS surgery increases hemorrhage risk.',
                },
                {
                    id: 'no-head-trauma',
                    label: 'No severe head trauma <3 months',
                    info: 'Risk of bleeding into contusions.',
                },
                {
                    id: 'plt-ok',
                    label: 'Platelets >100,000',
                    info: 'Adequate hemostasis required.',
                },
                {
                    id: 'inr-ok',
                    label: 'INR ≤1.7 (if on warfarin)',
                    info: 'INR >1.7 is contraindicated.',
                },
                {
                    id: 'no-doac',
                    label: 'No therapeutic DOAC <48h (or coags normal)',
                    info: 'DOAC within 48h excluded unless anti-Xa/thrombin time confirms no effect.',
                },
                {
                    id: 'no-ischemic-changes',
                    label: 'No extensive early ischemic changes (>1/3 MCA)',
                    info: 'Large established infarct increases hemorrhage risk.',
                    nextStep: 'tpa-dose',
                },
            ],
        },
        {
            id: 'tpa-dose',
            title: 'tPA Dosing',
            question: 'Calculate tPA dose: 0.9 mg/kg (max 90mg)',
            subtitle: '10% bolus, 90% infusion over 60 min',
            options: [
                {
                    id: 'tpa-given',
                    label: 'tPA administered',
                    shortLabel: 'tPA given',
                    variant: 'safe',
                    nextStep: 'lvo-screen',
                },
            ],
        },
        {
            id: 'lvo-screen',
            title: 'Large Vessel Occlusion',
            question: 'Is there suspicion for LVO?',
            subtitle: 'NIHSS >=6, cortical signs, or CTA showing proximal occlusion',
            info: 'LVO indicators: NIHSS >=6, gaze deviation, neglect, aphasia with hemiparesis, proximal MCA/ICA/basilar occlusion on CTA.',
            options: [
                {
                    id: 'lvo-yes',
                    label: 'Yes - LVO confirmed or suspected',
                    shortLabel: 'LVO+',
                    variant: 'urgent',
                    nextStep: 'thrombectomy',
                },
                {
                    id: 'lvo-no',
                    label: 'No - No LVO on imaging',
                    shortLabel: 'LVO-',
                    nextStep: 'admit',
                },
            ],
        },
        {
            id: 'thrombectomy',
            title: 'Thrombectomy',
            question: 'Does patient meet thrombectomy criteria?',
            subtitle: 'Within 24h with favorable imaging',
            info: 'Criteria: Proximal anterior circulation (ICA, M1, M2), pre-stroke mRS 0-1, NIHSS >=6, ASPECTS >=6.',
            options: [
                {
                    id: 'thrombectomy-yes',
                    label: 'Meets criteria - Activate neuro-IR',
                    shortLabel: 'Thrombectomy',
                    variant: 'safe',
                    isTerminal: true,
                },
                {
                    id: 'thrombectomy-no',
                    label: 'Does not meet criteria',
                    shortLabel: 'No thrombectomy',
                    nextStep: 'admit',
                },
            ],
        },
        {
            id: 'admit',
            title: 'Disposition',
            question: 'Admit to stroke unit for monitoring',
            options: [
                {
                    id: 'admit-icu',
                    label: 'Neuro ICU (post-tPA or severe)',
                    shortLabel: 'Neuro ICU',
                    variant: 'urgent',
                    isTerminal: true,
                },
                {
                    id: 'admit-stroke-unit',
                    label: 'Stroke Unit',
                    shortLabel: 'Stroke Unit',
                    variant: 'safe',
                    isTerminal: true,
                },
            ],
        },
        {
            id: 'observe',
            title: 'Observation',
            question: 'Mild non-disabling stroke',
            options: [
                {
                    id: 'observe-admit',
                    label: 'Admit for stroke workup',
                    shortLabel: 'Admit',
                    isTerminal: true,
                },
                {
                    id: 'observe-obs',
                    label: 'Observation with urgent follow-up',
                    shortLabel: 'Obs unit',
                    isTerminal: true,
                },
            ],
        },
        {
            id: 'no-acute',
            title: 'Outside Window',
            question: 'Patient is outside acute intervention windows',
            options: [
                {
                    id: 'secondary-prevention',
                    label: 'Proceed with secondary prevention',
                    shortLabel: 'Secondary prevention',
                    isTerminal: true,
                },
            ],
        },
    ],
    terminalSteps: {
        unstable: {
            title: 'Resuscitate First',
            summary: 'Patient is unstable. Secure airway, IV access, address hypotension. Stroke workup after stabilization.',
            actions: [
                'Secure airway if GCS <=8',
                'Establish 2 large-bore IVs',
                'Target SBP >90',
                'Target SpO2 >94%',
                'Stat CT head once stable',
            ],
        },
        'thrombectomy-yes': {
            title: 'Mechanical Thrombectomy',
            summary: 'Patient meets thrombectomy criteria. Activate neuro-IR team. Door-to-groin goal: 90 minutes.',
            actions: [
                'Activate neuro-IR immediately',
                'Continue IV tPA if given',
                'NPO, consent for procedure',
                'Goal door-to-groin <90 min',
                'Admit to Neuro ICU post-procedure',
            ],
            returnPrecautions: [
                'Monitor for reperfusion injury',
                'Neuro checks q1h for 24h',
                'Repeat imaging if decline',
            ],
        },
        'admit-icu': {
            title: 'Neuro ICU Admission',
            summary: 'ICU-level monitoring for post-tPA care or severe stroke.',
            actions: [
                'Neuro checks q1h (q15min x2h post-tPA)',
                'BP goal: SBP <180/105 post-tPA',
                'Hold anticoagulation 24h if tPA given',
                'Repeat CT head at 24h',
                'Swallow eval before PO',
                'Start secondary prevention workup',
            ],
            returnPrecautions: [
                'New or worsening neuro symptoms',
                'Severe headache (hemorrhage concern)',
                'Nausea/vomiting',
                'Altered mental status',
            ],
        },
        'admit-stroke-unit': {
            title: 'Stroke Unit Admission',
            summary: 'Admit for monitoring, workup, and secondary prevention.',
            actions: [
                'Neuro checks q4h',
                'Telemetry (AF detection)',
                'Swallow eval before PO',
                'PT/OT/Speech consults',
                'Secondary prevention: TTE, carotid US, lipids, HbA1c',
                'Start aspirin + high-intensity statin',
            ],
            returnPrecautions: [
                'New weakness or numbness',
                'Speech difficulty',
                'Vision changes',
                'Severe headache',
            ],
        },
        'observe-admit': {
            title: 'Admit for Workup',
            summary: 'Mild stroke. Admit for comprehensive workup and secondary prevention.',
            actions: [
                'Admit to stroke unit or telemetry',
                'MRI brain, MRA, TTE, carotid imaging',
                'Consider Holter for AF',
                'Start aspirin + statin',
                'PT/OT evaluation',
            ],
            returnPrecautions: [
                'Any worsening of symptoms',
                'New neurological deficits',
            ],
        },
        'observe-obs': {
            title: 'Observation Unit',
            summary: 'TIA or minor stroke. Observation with urgent outpatient follow-up.',
            actions: [
                'CT head, CTA head/neck',
                'Telemetry monitoring',
                'Start aspirin + statin',
                'Urgent neurology follow-up (48-72h)',
                'Outpatient TTE and Holter',
            ],
            returnPrecautions: [
                'Return immediately for recurrent symptoms',
                'New weakness, numbness, vision changes',
                'Severe headache',
            ],
        },
        'secondary-prevention': {
            title: 'Secondary Prevention',
            summary: 'Outside acute windows. Focus on preventing recurrent stroke.',
            actions: [
                'Complete stroke workup',
                'Antiplatelet therapy',
                'High-intensity statin',
                'BP goal <130/80',
                'Diabetes optimization',
                'Smoking cessation',
                'Neurology follow-up',
            ],
            returnPrecautions: [
                'Any new neuro symptoms',
                'Recurrent stroke = call 911',
            ],
        },
        'thrombectomy-no': {
            title: 'Medical Management',
            summary: 'LVO present but does not meet thrombectomy criteria.',
            actions: [
                'Admit to Neuro ICU or Stroke Unit',
                'Aggressive medical management',
                'Neuro checks q1-2h',
                'Secondary prevention workup',
            ],
            returnPrecautions: [
                'Monitor for worsening',
                'May reconsider thrombectomy if imaging changes',
            ],
        },
    },
};
