// MedKitt — Clinical Calculator Component
// Standalone calculators for scoring systems (PESI, sPESI, etc.)
// Renders interactive forms with real-time score computation.
import { router } from '../services/router.js';
// -------------------------------------------------------------------
// PESI Calculator Definition
// -------------------------------------------------------------------
const PESI_CALCULATOR = {
    id: 'pesi',
    title: 'PESI Score',
    subtitle: 'Pulmonary Embolism Severity Index',
    description: 'The PESI is an 11-variable clinical prediction tool that stratifies patients with acute PE according to their 30-day mortality risk.',
    fields: [
        { name: 'age', label: 'Age', type: 'number', points: 0, valueIsPoints: true, unit: 'years', description: 'Points = age in years' },
        { name: 'male', label: 'Male sex', type: 'toggle', points: 10 },
        { name: 'cancer', label: 'History of cancer', type: 'toggle', points: 30 },
        { name: 'heart-failure', label: 'History of heart failure', type: 'toggle', points: 10 },
        { name: 'chronic-lung', label: 'History of chronic lung disease', type: 'toggle', points: 10 },
        { name: 'hr', label: 'Heart rate \u2265 110', type: 'toggle', points: 20 },
        { name: 'sbp', label: 'Systolic BP < 100 mmHg', type: 'toggle', points: 30 },
        { name: 'rr', label: 'Respiratory rate \u2265 30', type: 'toggle', points: 20 },
        { name: 'temp', label: 'Temperature < 36\u00B0C (96.8\u00B0F)', type: 'toggle', points: 20 },
        { name: 'ams', label: 'Altered mental status', type: 'toggle', points: 60, description: 'Disorientation, lethargy, stupor, or coma' },
        { name: 'spo2', label: 'O\u2082 saturation < 90%', type: 'toggle', points: 20 },
    ],
    results: [
        { min: -Infinity, max: 66, label: 'Class I', risk: 'Very Low Risk', mortality: '30-day mortality: 0\u20131.6%', colorVar: '--color-primary' },
        { min: 66, max: 86, label: 'Class II', risk: 'Low Risk', mortality: '30-day mortality: 1.7\u20133.5%', colorVar: '--color-primary' },
        { min: 86, max: 106, label: 'Class III', risk: 'Intermediate Risk', mortality: '30-day mortality: 3.2\u20137.1%', colorVar: '--color-warning' },
        { min: 106, max: 126, label: 'Class IV', risk: 'High Risk', mortality: '30-day mortality: 4.0\u201311.4%', colorVar: '--color-danger' },
        { min: 126, max: Infinity, label: 'Class V', risk: 'Very High Risk', mortality: '30-day mortality: 10.0\u201324.5%', colorVar: '--color-danger' },
    ],
    thresholdNote: 'Clinical severity threshold: PESI > 86 (Class III+) = High severity',
    citations: [
        'Aujesky D, et al. Derivation and Validation of a Prognostic Model for Pulmonary Embolism. Am J Respir Crit Care Med. 2005;172(8):1041-1046.',
        'Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020;41(4):543-603.',
    ],
};
// -------------------------------------------------------------------
// sPESI Calculator Definition
// -------------------------------------------------------------------
const SPESI_CALCULATOR = {
    id: 'spesi',
    title: 'sPESI Score',
    subtitle: 'Simplified Pulmonary Embolism Severity Index',
    description: 'The sPESI is a 6-item scoring system that stratifies PE patients by 30-day mortality risk. Each present variable scores 1 point.',
    fields: [
        { name: 'age80', label: 'Age > 80 years', type: 'toggle', points: 1 },
        { name: 'cancer', label: 'History of cancer', type: 'toggle', points: 1 },
        { name: 'cardiopulm', label: 'History of chronic cardiopulmonary disease', type: 'toggle', points: 1, description: 'Heart failure or chronic lung disease' },
        { name: 'hr', label: 'Heart rate > 109/min', type: 'toggle', points: 1 },
        { name: 'sbp', label: 'Systolic BP < 100 mmHg', type: 'toggle', points: 1 },
        { name: 'spo2', label: 'O\u2082 saturation < 90%', type: 'toggle', points: 1 },
    ],
    results: [
        { min: -Infinity, max: 1, label: 'Score 0', risk: 'Low Risk', mortality: '30-day mortality: ~1.0%', colorVar: '--color-primary' },
        { min: 1, max: Infinity, label: 'Score \u2265 1', risk: 'Intermediate / High Risk', mortality: '30-day mortality: ~10.9%', colorVar: '--color-danger' },
    ],
    thresholdNote: 'Clinical severity threshold: sPESI \u2265 1 = High severity',
    citations: [
        'Jim\u00E9nez D, et al. Simplification of the Pulmonary Embolism Severity Index for Prognostication in Patients With Acute Symptomatic PE. Arch Intern Med. 2010;170(15):1383-1389.',
        'Freund Y, et al. Acute Pulmonary Embolism: A Review. JAMA. 2022;328(13):1336-1345.',
    ],
};
// -------------------------------------------------------------------
// CHA₂DS₂-VASc Calculator Definition
// -------------------------------------------------------------------
const CHA2DS2VASC_CALCULATOR = {
    id: 'cha2ds2vasc',
    title: 'CHA\u2082DS\u2082-VASc Score',
    subtitle: 'Stroke Risk in Atrial Fibrillation',
    description: 'The CHA\u2082DS\u2082-VASc score estimates stroke risk in patients with non-valvular atrial fibrillation to guide anticoagulation decisions. Score ranges from 0-9.',
    fields: [
        { name: 'chf', label: 'Congestive Heart Failure', type: 'toggle', points: 1, description: 'CHF or LV ejection fraction \u226440%' },
        { name: 'htn', label: 'Hypertension', type: 'toggle', points: 1, description: 'Resting BP >140/90 or current antihypertensive use' },
        { name: 'age75', label: 'Age \u2265 75 years', type: 'toggle', points: 2 },
        { name: 'diabetes', label: 'Diabetes Mellitus', type: 'toggle', points: 1, description: 'Fasting glucose >125 or on hypoglycemic treatment' },
        { name: 'stroke', label: 'Stroke / TIA / Thromboembolism', type: 'toggle', points: 2, description: 'Prior stroke, TIA, or systemic embolism' },
        { name: 'vascular', label: 'Vascular Disease', type: 'toggle', points: 1, description: 'Prior MI, peripheral artery disease, or aortic plaque' },
        { name: 'age65', label: 'Age 65-74 years', type: 'toggle', points: 1 },
        { name: 'female', label: 'Female Sex', type: 'toggle', points: 1 },
    ],
    results: [
        { min: -Infinity, max: 1, label: 'Score 0', risk: 'Low Risk', mortality: 'Annual stroke risk: 0%', colorVar: '--color-primary' },
        { min: 1, max: 2, label: 'Score 1', risk: 'Low-Moderate Risk', mortality: 'Annual stroke risk: 1.3%', colorVar: '--color-warning' },
        { min: 2, max: 3, label: 'Score 2', risk: 'Moderate Risk', mortality: 'Annual stroke risk: 2.2%', colorVar: '--color-warning' },
        { min: 3, max: 4, label: 'Score 3', risk: 'Moderate-High Risk', mortality: 'Annual stroke risk: 3.2%', colorVar: '--color-danger' },
        { min: 4, max: 5, label: 'Score 4', risk: 'High Risk', mortality: 'Annual stroke risk: 4.0%', colorVar: '--color-danger' },
        { min: 5, max: 6, label: 'Score 5', risk: 'High Risk', mortality: 'Annual stroke risk: 6.7%', colorVar: '--color-danger' },
        { min: 6, max: 7, label: 'Score 6', risk: 'Very High Risk', mortality: 'Annual stroke risk: 9.8%', colorVar: '--color-danger' },
        { min: 7, max: 8, label: 'Score 7', risk: 'Very High Risk', mortality: 'Annual stroke risk: 9.6%', colorVar: '--color-danger' },
        { min: 8, max: 9, label: 'Score 8', risk: 'Very High Risk', mortality: 'Annual stroke risk: 6.7%', colorVar: '--color-danger' },
        { min: 9, max: Infinity, label: 'Score 9', risk: 'Very High Risk', mortality: 'Annual stroke risk: 15.2%', colorVar: '--color-danger' },
    ],
    thresholdNote: 'Score \u22652 (men) or \u22653 (women): Anticoagulation recommended. Score 1 (men) or 2 (women): Consider anticoagulation. Score 0 (men) or 1 (women): May omit anticoagulation.',
    citations: [
        'Lip GY, et al. Refining Clinical Risk Stratification for Predicting Stroke and Thromboembolism in Atrial Fibrillation Using a Novel Risk Factor-Based Approach: The Euro Heart Survey on Atrial Fibrillation. Chest. 2010;137(2):263-272.',
        'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. J Am Coll Cardiol. 2024;83(1):109-279.',
    ],
};
// -------------------------------------------------------------------
// NIHSS Calculator Definition
// -------------------------------------------------------------------
const NIHSS_CALCULATOR = {
    id: 'nihss',
    title: 'NIHSS',
    subtitle: 'NIH Stroke Scale',
    description: 'The NIHSS is a 15-item clinical assessment tool used to quantify stroke severity. Score ranges from 0 (no symptoms) to 42 (maximum deficit). Guides treatment decisions including thrombolysis eligibility and EVT criteria.',
    fields: [
        {
            name: 'loc',
            label: '1a. Level of Consciousness',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Alert', points: 0 },
                { label: 'Not alert, arousable by minor stimulation', points: 1 },
                { label: 'Not alert, requires repeated stimulation', points: 2 },
                { label: 'Unresponsive or reflexive responses only', points: 3 },
            ],
        },
        {
            name: 'loc-questions',
            label: '1b. LOC Questions',
            type: 'select',
            points: 0,
            description: 'Ask month and age',
            selectOptions: [
                { label: 'Both correct', points: 0 },
                { label: 'One correct', points: 1 },
                { label: 'Neither correct', points: 2 },
            ],
        },
        {
            name: 'loc-commands',
            label: '1c. LOC Commands',
            type: 'select',
            points: 0,
            description: 'Open/close eyes, grip and release',
            selectOptions: [
                { label: 'Both correct', points: 0 },
                { label: 'One correct', points: 1 },
                { label: 'Neither correct', points: 2 },
            ],
        },
        {
            name: 'gaze',
            label: '2. Best Gaze',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Normal', points: 0 },
                { label: 'Partial gaze palsy', points: 1 },
                { label: 'Forced deviation or total gaze paresis', points: 2 },
            ],
        },
        {
            name: 'visual',
            label: '3. Visual Fields',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No visual loss', points: 0 },
                { label: 'Partial hemianopia', points: 1 },
                { label: 'Complete hemianopia', points: 2 },
                { label: 'Bilateral hemianopia (blind)', points: 3 },
            ],
        },
        {
            name: 'facial',
            label: '4. Facial Palsy',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Normal symmetric movements', points: 0 },
                { label: 'Minor paralysis (flattened nasolabial fold)', points: 1 },
                { label: 'Partial paralysis (lower face)', points: 2 },
                { label: 'Complete paralysis (upper and lower face)', points: 3 },
            ],
        },
        {
            name: 'left-arm',
            label: '5a. Left Arm Motor',
            type: 'select',
            points: 0,
            description: 'Hold arm at 90\u00B0 (sitting) or 45\u00B0 (supine) for 10 sec',
            selectOptions: [
                { label: 'No drift \u2014 holds for full 10 sec', points: 0 },
                { label: 'Drift \u2014 holds but drifts before 10 sec', points: 1 },
                { label: 'Some effort against gravity', points: 2 },
                { label: 'No effort against gravity', points: 3 },
                { label: 'No movement', points: 4 },
            ],
        },
        {
            name: 'right-arm',
            label: '5b. Right Arm Motor',
            type: 'select',
            points: 0,
            description: 'Hold arm at 90\u00B0 (sitting) or 45\u00B0 (supine) for 10 sec',
            selectOptions: [
                { label: 'No drift \u2014 holds for full 10 sec', points: 0 },
                { label: 'Drift \u2014 holds but drifts before 10 sec', points: 1 },
                { label: 'Some effort against gravity', points: 2 },
                { label: 'No effort against gravity', points: 3 },
                { label: 'No movement', points: 4 },
            ],
        },
        {
            name: 'left-leg',
            label: '6a. Left Leg Motor',
            type: 'select',
            points: 0,
            description: 'Hold leg at 30\u00B0 (supine) for 5 sec',
            selectOptions: [
                { label: 'No drift \u2014 holds for full 5 sec', points: 0 },
                { label: 'Drift \u2014 holds but drifts before 5 sec', points: 1 },
                { label: 'Some effort against gravity', points: 2 },
                { label: 'No effort against gravity', points: 3 },
                { label: 'No movement', points: 4 },
            ],
        },
        {
            name: 'right-leg',
            label: '6b. Right Leg Motor',
            type: 'select',
            points: 0,
            description: 'Hold leg at 30\u00B0 (supine) for 5 sec',
            selectOptions: [
                { label: 'No drift \u2014 holds for full 5 sec', points: 0 },
                { label: 'Drift \u2014 holds but drifts before 5 sec', points: 1 },
                { label: 'Some effort against gravity', points: 2 },
                { label: 'No effort against gravity', points: 3 },
                { label: 'No movement', points: 4 },
            ],
        },
        {
            name: 'ataxia',
            label: '7. Limb Ataxia',
            type: 'select',
            points: 0,
            description: 'Finger-nose-finger and heel-shin',
            selectOptions: [
                { label: 'Absent', points: 0 },
                { label: 'Present in one limb', points: 1 },
                { label: 'Present in two or more limbs', points: 2 },
            ],
        },
        {
            name: 'sensory',
            label: '8. Sensory',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Normal \u2014 no sensory loss', points: 0 },
                { label: 'Mild-moderate \u2014 less sharp or dull', points: 1 },
                { label: 'Severe or total \u2014 unaware of touch', points: 2 },
            ],
        },
        {
            name: 'language',
            label: '9. Best Language',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No aphasia \u2014 normal', points: 0 },
                { label: 'Mild-moderate aphasia', points: 1 },
                { label: 'Severe aphasia \u2014 fragmentary expression', points: 2 },
                { label: 'Mute or global aphasia', points: 3 },
            ],
        },
        {
            name: 'dysarthria',
            label: '10. Dysarthria',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Normal', points: 0 },
                { label: 'Mild-moderate \u2014 slurring but understandable', points: 1 },
                { label: 'Severe \u2014 unintelligible or mute', points: 2 },
            ],
        },
        {
            name: 'extinction',
            label: '11. Extinction/Inattention',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No abnormality', points: 0 },
                { label: 'Inattention to one modality (visual, tactile, auditory, spatial)', points: 1 },
                { label: 'Profound hemi-inattention or extinction to more than one modality', points: 2 },
            ],
        },
    ],
    results: [
        { min: -Infinity, max: 1, label: 'Score 0', risk: 'No Stroke Symptoms', mortality: 'No measurable deficit', colorVar: '--color-primary' },
        { min: 1, max: 5, label: 'Score 1\u20134', risk: 'Minor Stroke', mortality: 'Consider DAPT, MRI preferred', colorVar: '--color-primary' },
        { min: 5, max: 16, label: 'Score 5\u201315', risk: 'Moderate Stroke', mortality: 'IVT candidate if within window', colorVar: '--color-warning' },
        { min: 16, max: 21, label: 'Score 16\u201320', risk: 'Moderate-Severe Stroke', mortality: 'IVT + evaluate for EVT', colorVar: '--color-danger' },
        { min: 21, max: Infinity, label: 'Score 21\u201342', risk: 'Severe Stroke', mortality: 'IVT + EVT if LVO. High mortality risk.', colorVar: '--color-danger' },
    ],
    thresholdNote: 'NIHSS \u22656: EVT eligibility threshold (anterior LVO). NIHSS 0\u20135 with disabling deficit: still consider IVT. NIHSS 0\u20135 nondisabling: DAPT pathway.',
    citations: [
        'Brott T, et al. Measurements of Acute Cerebral Infarction: A Clinical Examination Scale. Stroke. 1989;20(7):864-870.',
        'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
        'Mendelson SJ, Prabhakaran S. Diagnosis and Management of TIA and Acute Ischemic Stroke: A Review. JAMA. 2021;325(11):1088-1098.',
    ],
};
// -------------------------------------------------------------------
// TIMI Risk Score Calculator Definition
// -------------------------------------------------------------------
const TIMI_CALCULATOR = {
    id: 'timi',
    title: 'TIMI Risk Score',
    subtitle: 'Thrombolysis in Myocardial Infarction — NSTEMI/UA',
    description: 'The TIMI Risk Score for UA/NSTEMI is a 7-variable risk assessment tool that predicts 14-day mortality, new/recurrent MI, and severe recurrent ischemia requiring urgent revascularization. Each variable scores 1 point.',
    fields: [
        { name: 'age65', label: 'Age ≥ 65 years', type: 'toggle', points: 1 },
        { name: 'cad-risk', label: '≥ 3 CAD risk factors', type: 'toggle', points: 1, description: 'HTN, DM, dyslipidemia, smoking, family history of premature CAD' },
        { name: 'stenosis', label: 'Known CAD (stenosis ≥ 50%)', type: 'toggle', points: 1, description: 'Prior catheterization showing ≥50% stenosis' },
        { name: 'st-deviation', label: 'ST deviation ≥ 0.5mm', type: 'toggle', points: 1, description: 'ST depression or transient ST elevation on presenting ECG' },
        { name: 'anginal-events', label: '≥ 2 anginal events in 24h', type: 'toggle', points: 1, description: 'Severe anginal symptoms in prior 24 hours' },
        { name: 'aspirin-use', label: 'Aspirin use in prior 7 days', type: 'toggle', points: 1, description: 'Patient was taking aspirin before presentation' },
        { name: 'biomarkers', label: 'Elevated cardiac biomarkers', type: 'toggle', points: 1, description: 'Troponin I or T above institutional upper limit of normal' },
    ],
    results: [
        { min: -Infinity, max: 1, label: 'Score 0', risk: 'Very Low Risk', mortality: '14-day event rate: 4.7%', colorVar: '--color-primary' },
        { min: 1, max: 2, label: 'Score 1', risk: 'Low Risk', mortality: '14-day event rate: 4.7%', colorVar: '--color-primary' },
        { min: 2, max: 3, label: 'Score 2', risk: 'Low Risk', mortality: '14-day event rate: 8.3%', colorVar: '--color-primary' },
        { min: 3, max: 4, label: 'Score 3', risk: 'Intermediate Risk', mortality: '14-day event rate: 13.2%', colorVar: '--color-warning' },
        { min: 4, max: 5, label: 'Score 4', risk: 'High Risk', mortality: '14-day event rate: 19.9%', colorVar: '--color-danger' },
        { min: 5, max: 6, label: 'Score 5', risk: 'High Risk', mortality: '14-day event rate: 26.2%', colorVar: '--color-danger' },
        { min: 6, max: 7, label: 'Score 6-7', risk: 'Very High Risk', mortality: '14-day event rate: 40.9%', colorVar: '--color-danger' },
        { min: 7, max: Infinity, label: 'Score 6-7', risk: 'Very High Risk', mortality: '14-day event rate: 40.9%', colorVar: '--color-danger' },
    ],
    thresholdNote: 'TIMI 0-2: Low risk (conservative strategy reasonable). TIMI 3: Intermediate (delayed invasive 25-72h). TIMI ≥4: High risk (early invasive <24h recommended).',
    citations: [
        'Antman EM, et al. The TIMI Risk Score for Unstable Angina/Non-ST Elevation MI: A Method for Prognostication and Therapeutic Decision Making. JAMA. 2000;284(7):835-842.',
        'Amsterdam EA, et al. 2014 AHA/ACC Guideline for the Management of Patients with Non-ST-Elevation Acute Coronary Syndromes. J Am Coll Cardiol. 2014;64(24):e189-e228.',
    ],
};
// -------------------------------------------------------------------
// BAS (Bronchiolitis Assessment Score) Calculator Definition
// -------------------------------------------------------------------
const BAS_CALCULATOR = {
    id: 'bas',
    title: 'BAS',
    subtitle: 'Bronchiolitis Assessment Score',
    description: 'The BAS is a 6-variable clinical assessment tool used to quantify bronchiolitis severity in pediatric patients. Score ranges from 0 (mild) to 12 (severe). Guides respiratory support escalation, weaning decisions, and disposition.',
    fields: [
        {
            name: 'respiratory-rate',
            label: 'Respiratory Rate (age-adjusted)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '<2 mos: <50 \u00B7 2-12 mos: <40 \u00B7 >1 yr: <30', points: 0 },
                { label: '<2 mos: 50-60 \u00B7 2-12 mos: 40-50 \u00B7 >1 yr: 30-40', points: 1 },
                { label: '<2 mos: >60 \u00B7 2-12 mos: >50 \u00B7 >1 yr: >40', points: 2 },
            ],
        },
        {
            name: 'fio2-spo2',
            label: 'FiO\u2082 AND O\u2082 Sat',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'FiO\u2082 \u226424% AND SpO\u2082 >90%', points: 0 },
                { label: 'FiO\u2082 25-39% AND SpO\u2082 >90%', points: 1 },
                { label: 'FiO\u2082 \u226540% AND SpO\u2082 >90%', points: 2 },
            ],
        },
        {
            name: 'breath-sounds',
            label: 'Breath Sounds',
            type: 'select',
            points: 0,
            description: 'Crackles don\u2019t change score',
            selectOptions: [
                { label: 'Good air movement, few crackles, few wheezes', points: 0 },
                { label: 'Decreased air movement, I-E wheezes, or crackles', points: 1 },
                { label: 'Diminished or absent breath sounds, severe wheezing, prolonged expiratory phase', points: 2 },
            ],
        },
        {
            name: 'work-of-breathing',
            label: 'Work of Breathing',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'None to mild subcostal retractions, abdominal breathing', points: 0 },
                { label: 'Moderate retractions, nasal flaring', points: 1 },
                { label: 'Severe retractions, nasal flaring, grunting, head bobbing', points: 2 },
            ],
        },
        {
            name: 'mental-status',
            label: 'Mental Status',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Normal to mildly irritable', points: 0 },
                { label: 'Agitated, restless', points: 1 },
                { label: 'Lethargic', points: 2 },
            ],
        },
        {
            name: 'color',
            label: 'Color',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Normal', points: 0 },
                { label: 'Pale', points: 1 },
                { label: 'Cyanotic', points: 2 },
            ],
        },
    ],
    results: [
        { min: -Infinity, max: 4, label: 'Mild', risk: 'Mild', mortality: 'Weanable. Consider discharge if feeding and hydrating well.', colorVar: '--color-primary' },
        { min: 4, max: 9, label: 'Moderate', risk: 'Moderate', mortality: 'Maintain current support. Supplemental O\u2082 or HFNC may be needed.', colorVar: '--color-warning' },
        { min: 9, max: Infinity, label: 'Severe', risk: 'Severe', mortality: 'Increase support. Contact primary team. Consider critical care consult.', colorVar: '--color-danger' },
    ],
    thresholdNote: 'Mild (0-3): Weanable. Moderate (4-8): Maintain. Severe (9-12): Increase support. Reassess Q15min on HFNC initiation, Q4h on maintenance.',
    citations: [
        'Dell Children\u2019s Medical Center EBOC. Bronchiolitis Clinical Pathway. Rev Oct 2019.',
        'Dell Children\u2019s Medical Center EBOC. HFNC Initiation, Maintenance, and Weaning Pathway. Rev Nov 2021.',
    ],
};
// -------------------------------------------------------------------
// Free Water Deficit Calculator (Formula-Based)
// -------------------------------------------------------------------
const FWD_CALCULATOR = {
    id: 'fwd',
    title: 'Free Water Deficit',
    subtitle: 'Hypernatremia Correction',
    description: 'Calculates the free water deficit for hypernatremia correction. Formula: TBW \u00D7 [(Na/140) - 1], where TBW = weight \u00D7 correction factor (0.6 for males, 0.5 for females/elderly).',
    fields: [
        {
            name: 'serum-na',
            label: 'Serum Sodium',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'mEq/L',
            description: 'Current serum sodium level',
        },
        {
            name: 'weight',
            label: 'Weight',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'kg',
            description: 'Patient weight in kilograms',
        },
        {
            name: 'sex',
            label: 'Sex / Body Composition',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Male (TBW factor = 0.6)', points: 60 },
                { label: 'Female / Elderly (TBW factor = 0.5)', points: 50 },
            ],
        },
    ],
    results: [],
    thresholdNote: 'Replace deficit over 48-72h for chronic hypernatremia. Max correction: 10-12 mEq/L per 24h. Enteral free water preferred; D5W if NPO.',
    citations: [
        'Adrogu\u00E9 HJ, Madias NE. Hypernatremia. NEJM. 2000;342(20):1493-1499.',
        'Lindner G et al. Hypernatremia in Critically Ill. J Crit Care. 2013;28(2):216.e11-20.',
    ],
    computeResult: (values) => {
        const na = values['serum-na'] || 0;
        const weight = values['weight'] || 0;
        const tbwFactor = (values['sex'] || 60) / 100; // 60\u21920.6, 50\u21920.5
        if (na <= 0 || weight <= 0) {
            return {
                value: '--',
                label: 'Enter values',
                description: 'Enter serum sodium and weight to calculate deficit.',
                colorVar: '--color-text-muted',
            };
        }
        if (na <= 140) {
            return {
                value: '0 L',
                label: 'No Deficit',
                description: 'Serum Na \u2264140 mEq/L \u2014 no free water deficit.',
                colorVar: '--color-primary',
            };
        }
        const tbw = weight * tbwFactor;
        const deficit = tbw * ((na / 140) - 1);
        const deficitRounded = Math.round(deficit * 10) / 10;
        let label;
        let colorVar;
        if (deficitRounded < 3) {
            label = 'Mild Deficit';
            colorVar = '--color-primary';
        }
        else if (deficitRounded < 6) {
            label = 'Moderate Deficit';
            colorVar = '--color-warning';
        }
        else {
            label = 'Severe Deficit';
            colorVar = '--color-danger';
        }
        return {
            value: `${deficitRounded} L`,
            label,
            description: `TBW: ${Math.round(tbw * 10) / 10} L (${weight} kg \u00D7 ${tbwFactor}). Replace over 48-72h for chronic hypernatremia. Account for ongoing losses.`,
            colorVar,
        };
    },
};
// -------------------------------------------------------------------
// Corrected Sodium Calculator (Formula-Based)
// -------------------------------------------------------------------
const CORRECTED_NA_CALCULATOR = {
    id: 'corrected-na',
    title: 'Corrected Sodium',
    subtitle: 'Hyperglycemia Correction',
    description: 'Corrects measured sodium for hyperglycemia. Formula: Corrected Na = Measured Na + 1.6 × [(Glucose - 100) / 100]. Uses correction factor of 2.4 when glucose exceeds 400 mg/dL.',
    fields: [
        {
            name: 'measured-na',
            label: 'Measured Sodium',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'mEq/L',
            description: 'Lab-reported serum sodium',
        },
        {
            name: 'glucose',
            label: 'Serum Glucose',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'mg/dL',
            description: 'Serum glucose level',
        },
    ],
    results: [],
    thresholdNote: 'If corrected Na is normal (≥135), the hyponatremia is translocational — treat the hyperglycemia, not the sodium. If corrected Na remains low, true hypotonic hyponatremia coexists with hyperglycemia.',
    citations: [
        'Katz MA. Hyperglycemia-Induced Hyponatremia — Calculation of Expected Serum Sodium Depression. NEJM. 1973;289(16):843-844.',
        'Hillier TA et al. Hyponatremia: Evaluating the Correction Factor for Hyperglycemia. Am J Med. 1999;106(4):399-403.',
    ],
    computeResult: (values) => {
        const na = values['measured-na'] || 0;
        const glucose = values['glucose'] || 0;
        if (na <= 0 || glucose <= 0) {
            return {
                value: '--',
                label: 'Enter values',
                description: 'Enter measured sodium and serum glucose to calculate corrected sodium.',
                colorVar: '--color-text-muted',
            };
        }
        if (glucose <= 100) {
            return {
                value: `${na} mEq/L`,
                label: 'No Correction Needed',
                description: `Glucose ≤100 mg/dL — no hyperglycemic correction needed. Measured Na = corrected Na.`,
                colorVar: '--color-primary',
            };
        }
        // Use 1.6 factor for glucose ≤400, 2.4 factor for >400
        const factor = glucose > 400 ? 2.4 : 1.6;
        const correction = factor * ((glucose - 100) / 100);
        const correctedNa = Math.round((na + correction) * 10) / 10;
        let label;
        let colorVar;
        if (correctedNa >= 135) {
            label = 'Normal (Translocational)';
            colorVar = '--color-primary';
        }
        else if (correctedNa >= 130) {
            label = 'Mild Hyponatremia';
            colorVar = '--color-warning';
        }
        else if (correctedNa >= 120) {
            label = 'Moderate Hyponatremia';
            colorVar = '--color-warning';
        }
        else {
            label = 'Severe Hyponatremia';
            colorVar = '--color-danger';
        }
        const factorNote = glucose > 400
            ? '2.4 mEq/L per 100 mg/dL (glucose >400)'
            : '1.6 mEq/L per 100 mg/dL';
        return {
            value: `${correctedNa} mEq/L`,
            label,
            description: `Correction: +${Math.round(correction * 10) / 10} mEq/L (factor: ${factorNote}). ${correctedNa >= 135 ? 'Hyponatremia is translocational — treat hyperglycemia, not sodium.' : 'True hypotonic hyponatremia coexists with hyperglycemia — proceed with hyponatremia workup.'}`,
            colorVar,
        };
    },
};
// -------------------------------------------------------------------
// TBSA Calculator — E-burn Style Finger-Paint
// -------------------------------------------------------------------
// Draw/paint burn areas directly on body silhouette.
// Single view at a time with flip button (like E-burn app).
// Pixel counting for precise TBSA calculation.
// ===================================================================
// TBSA Freehand Paint Calculator — Medical Illustration SVG Paths
// Canvas-based finger painting with proportional region TBSA
// ===================================================================
// Adult front view SVG paths — medical illustration standard
// Head: cranium only. Neck is part of chest (trunk 18%)
const TBSA_ADULT_FRONT = {
    'head-front': 'M 100 10 C 80 10, 72 24, 72 38 C 72 48, 76 56, 82 60 C 86 64, 92 66, 100 67 C 108 66, 114 64, 118 60 C 124 56, 128 48, 128 38 C 128 24, 120 10, 100 10 Z',
    'chest': 'M 90 67 C 88 68, 88 70, 88 74 L 88 80 C 80 80, 70 78, 64 80 C 58 82, 56 86, 56 92 C 56 110, 58 130, 60 152 L 140 152 C 142 130, 144 110, 144 92 C 144 86, 142 82, 136 80 C 130 78, 120 80, 112 80 L 112 74 C 112 70, 112 68, 110 67 C 108 66, 104 66, 100 67 C 96 66, 92 66, 90 67 Z',
    'abdomen': 'M 60 152 L 140 152 C 140 168, 138 182, 136 196 C 134 208, 130 216, 126 222 C 118 228, 110 230, 100 230 C 90 230, 82 228, 74 222 C 70 216, 66 208, 64 196 C 62 182, 60 168, 60 152 Z',
    'perineum': 'M 92 230 C 96 234, 100 237, 100 237 C 100 237, 104 234, 108 230 C 104 230, 100 231, 100 231 C 100 231, 96 230, 92 230 Z',
    'right-upper-arm-front': 'M 136 80 C 142 80, 148 82, 152 86 C 156 92, 158 100, 160 112 L 162 136 C 162 142, 160 148, 158 152 L 144 152 C 144 130, 144 110, 144 92 Z',
    'right-forearm-front': 'M 144 152 L 158 152 C 160 168, 162 184, 164 200 L 164 210 L 150 214 C 148 200, 146 184, 144 168 Z',
    'right-hand': 'M 150 214 L 164 210 C 166 218, 168 226, 168 234 C 168 240, 166 246, 162 250 C 160 254, 156 256, 152 254 C 148 250, 148 244, 148 238 C 148 230, 148 222, 150 214 Z',
    'left-upper-arm-front': 'M 64 80 C 58 80, 52 82, 48 86 C 44 92, 42 100, 40 112 L 38 136 C 38 142, 40 148, 42 152 L 56 152 C 56 130, 56 110, 56 92 Z',
    'left-forearm-front': 'M 56 152 L 42 152 C 40 168, 38 184, 36 200 L 36 210 L 50 214 C 52 200, 54 184, 56 168 Z',
    'left-hand': 'M 50 214 L 36 210 C 34 218, 32 226, 32 234 C 32 240, 34 246, 38 250 C 40 254, 44 256, 48 254 C 52 250, 52 244, 52 238 C 52 230, 52 222, 50 214 Z',
    'right-thigh-front': 'M 108 230 L 126 222 C 130 236, 132 256, 132 276 C 132 296, 130 316, 128 330 L 124 336 L 106 336 C 106 316, 106 296, 106 276 C 106 256, 106 244, 108 230 Z',
    'right-lower-leg-front': 'M 106 336 L 124 336 C 126 356, 126 376, 124 400 C 122 418, 120 432, 118 442 L 110 442 C 108 432, 106 418, 106 400 C 104 376, 104 356, 106 336 Z',
    'right-foot': 'M 110 442 L 118 442 C 120 450, 122 456, 124 462 C 126 470, 124 476, 118 480 C 114 482, 110 480, 108 476 C 104 468, 106 456, 110 442 Z',
    'left-thigh-front': 'M 92 230 L 74 222 C 70 236, 68 256, 68 276 C 68 296, 70 316, 72 330 L 76 336 L 94 336 C 94 316, 94 296, 94 276 C 94 256, 94 244, 92 230 Z',
    'left-lower-leg-front': 'M 94 336 L 76 336 C 74 356, 74 376, 76 400 C 78 418, 80 432, 82 442 L 90 442 C 92 432, 94 418, 94 400 C 96 376, 96 356, 94 336 Z',
    'left-foot': 'M 90 442 L 82 442 C 80 450, 78 456, 76 462 C 74 470, 76 476, 82 480 C 86 482, 90 480, 92 476 C 96 468, 94 456, 90 442 Z',
};
const TBSA_ADULT_BACK = {
    'head-back': TBSA_ADULT_FRONT['head-front'],
    'upper-back': 'M 90 67 C 88 68, 88 70, 88 74 L 88 80 C 80 80, 70 78, 64 80 C 58 82, 56 86, 56 92 C 56 110, 58 130, 60 152 L 140 152 C 142 130, 144 110, 144 92 C 144 86, 142 82, 136 80 C 130 78, 120 80, 112 80 L 112 74 C 112 70, 112 68, 110 67 C 108 66, 104 66, 100 67 C 96 66, 92 66, 90 67 Z',
    'lower-back': 'M 60 152 L 140 152 C 140 168, 138 182, 136 196 C 134 208, 130 214, 126 218 L 74 218 C 70 214, 66 208, 64 196 C 62 182, 60 168, 60 152 Z',
    'right-buttock': 'M 100 218 L 126 218 C 130 224, 130 230, 126 234 C 120 240, 110 242, 100 242 Z',
    'left-buttock': 'M 100 218 L 74 218 C 70 224, 70 230, 74 234 C 80 240, 90 242, 100 242 Z',
    'right-upper-arm-back': TBSA_ADULT_FRONT['right-upper-arm-front'],
    'right-forearm-back': TBSA_ADULT_FRONT['right-forearm-front'],
    'left-upper-arm-back': TBSA_ADULT_FRONT['left-upper-arm-front'],
    'left-forearm-back': TBSA_ADULT_FRONT['left-forearm-front'],
    'right-thigh-back': 'M 100 242 L 126 234 C 130 250, 132 270, 132 290 C 132 310, 130 324, 128 330 L 124 336 L 106 336 C 106 316, 106 296, 106 276 C 106 256, 106 248, 100 242 Z',
    'right-lower-leg-back': TBSA_ADULT_FRONT['right-lower-leg-front'],
    'left-thigh-back': 'M 100 242 L 74 234 C 70 250, 68 270, 68 290 C 68 310, 70 324, 72 330 L 76 336 L 94 336 C 94 316, 94 296, 94 276 C 94 256, 94 248, 100 242 Z',
    'left-lower-leg-back': TBSA_ADULT_FRONT['left-lower-leg-front'],
};
// Pediatric front view — larger head proportionally
const TBSA_PEDS_FRONT = {
    'head-front': 'M 100 8 C 72 8, 58 28, 58 50 C 58 66, 66 80, 76 86 C 84 90, 92 93, 100 94 C 108 93, 116 90, 124 86 C 134 80, 142 66, 142 50 C 142 28, 128 8, 100 8 Z',
    'chest': 'M 92 94 C 90 95, 88 98, 88 102 L 88 108 C 80 108, 70 106, 64 108 C 58 110, 56 114, 56 120 C 56 135, 58 148, 60 162 L 140 162 C 142 148, 144 135, 144 120 C 144 114, 142 110, 136 108 C 130 106, 120 108, 112 108 L 112 102 C 112 98, 110 95, 108 94 C 106 93, 102 93, 100 94 C 98 93, 94 93, 92 94 Z',
    'abdomen': 'M 60 162 L 140 162 C 140 178, 138 192, 136 204 C 134 214, 130 220, 126 226 C 118 232, 110 234, 100 234 C 90 234, 82 232, 74 226 C 70 220, 66 214, 64 204 C 62 192, 60 178, 60 162 Z',
    'perineum': 'M 92 234 C 96 238, 100 240, 100 240 C 100 240, 104 238, 108 234 C 104 234, 100 235, 100 235 C 100 235, 96 234, 92 234 Z',
    'right-upper-arm-front': 'M 136 108 C 142 108, 148 110, 152 114 C 156 120, 158 128, 160 140 L 160 152 C 160 156, 158 160, 156 162 L 144 162 C 144 148, 144 135, 144 120 Z',
    'right-forearm-front': 'M 144 162 L 156 162 C 158 176, 160 190, 162 204 L 162 212 L 150 216 C 148 204, 146 190, 144 176 Z',
    'right-hand': 'M 150 216 L 162 212 C 164 220, 166 228, 164 236 C 162 240, 158 244, 154 242 C 150 240, 150 234, 150 228 C 150 224, 150 220, 150 216 Z',
    'left-upper-arm-front': 'M 64 108 C 58 108, 52 110, 48 114 C 44 120, 42 128, 40 140 L 40 152 C 40 156, 42 160, 44 162 L 56 162 C 56 148, 56 135, 56 120 Z',
    'left-forearm-front': 'M 56 162 L 44 162 C 42 176, 40 190, 38 204 L 38 212 L 50 216 C 52 204, 54 190, 56 176 Z',
    'left-hand': 'M 50 216 L 38 212 C 36 220, 34 228, 36 236 C 38 240, 42 244, 46 242 C 50 240, 50 234, 50 228 C 50 224, 50 220, 50 216 Z',
    'right-thigh-front': 'M 108 234 L 126 226 C 130 240, 132 260, 132 280 C 132 300, 130 314, 128 324 L 124 330 L 106 330 C 106 314, 106 298, 106 280 C 106 260, 106 248, 108 234 Z',
    'right-lower-leg-front': 'M 106 330 L 124 330 C 126 348, 126 366, 124 388 C 122 404, 120 416, 118 426 L 110 426 C 108 416, 106 404, 106 388 C 104 366, 104 348, 106 330 Z',
    'right-foot': 'M 110 426 L 118 426 C 120 434, 122 440, 124 446 C 126 454, 124 460, 118 464 C 114 466, 110 464, 108 460 C 104 452, 106 440, 110 426 Z',
    'left-thigh-front': 'M 92 234 L 74 226 C 70 240, 68 260, 68 280 C 68 300, 70 314, 72 324 L 76 330 L 94 330 C 94 314, 94 298, 94 280 C 94 260, 94 248, 92 234 Z',
    'left-lower-leg-front': 'M 94 330 L 76 330 C 74 348, 74 366, 76 388 C 78 404, 80 416, 82 426 L 90 426 C 92 416, 94 404, 94 388 C 96 366, 96 348, 94 330 Z',
    'left-foot': 'M 90 426 L 82 426 C 80 434, 78 440, 76 446 C 74 454, 76 460, 82 464 C 86 466, 90 464, 92 460 C 96 452, 94 440, 90 426 Z',
};
const TBSA_PEDS_BACK = {
    'head-back': TBSA_PEDS_FRONT['head-front'],
    'upper-back': TBSA_PEDS_FRONT['chest'],
    'lower-back': 'M 60 162 L 140 162 C 140 178, 138 192, 136 204 C 134 214, 130 218, 126 222 L 74 222 C 70 218, 66 214, 64 204 C 62 192, 60 178, 60 162 Z',
    'right-buttock': 'M 100 222 L 126 222 C 130 228, 130 234, 126 238 C 120 244, 110 246, 100 246 Z',
    'left-buttock': 'M 100 222 L 74 222 C 70 228, 70 234, 74 238 C 80 244, 90 246, 100 246 Z',
    'right-upper-arm-back': TBSA_PEDS_FRONT['right-upper-arm-front'],
    'right-forearm-back': TBSA_PEDS_FRONT['right-forearm-front'],
    'left-upper-arm-back': TBSA_PEDS_FRONT['left-upper-arm-front'],
    'left-forearm-back': TBSA_PEDS_FRONT['left-forearm-front'],
    'right-thigh-back': 'M 100 246 L 126 238 C 130 254, 132 274, 132 294 C 132 314, 130 324, 128 330 L 124 336 L 106 336 C 106 320, 106 304, 106 288 C 106 268, 106 254, 100 246 Z',
    'right-lower-leg-back': TBSA_PEDS_FRONT['right-lower-leg-front'],
    'left-thigh-back': 'M 100 246 L 74 238 C 70 254, 68 274, 68 294 C 68 314, 70 324, 72 330 L 76 336 L 94 336 C 94 320, 94 304, 94 288 C 94 268, 94 254, 100 246 Z',
    'left-lower-leg-back': TBSA_PEDS_FRONT['left-lower-leg-front'],
};
// Adult Rule of 9s percentages per region
const TBSA_ADULT_PCT = {
    'head-front': 4.5, 'head-back': 4.5,
    'chest': 9, 'abdomen': 9,
    'upper-back': 9, 'lower-back': 9,
    'right-upper-arm-front': 2, 'right-upper-arm-back': 2,
    'right-forearm-front': 1.5, 'right-forearm-back': 1.5, 'right-hand': 1,
    'left-upper-arm-front': 2, 'left-upper-arm-back': 2,
    'left-forearm-front': 1.5, 'left-forearm-back': 1.5, 'left-hand': 1,
    'right-thigh-front': 4.5, 'right-thigh-back': 4.5,
    'right-lower-leg-front': 3.5, 'right-lower-leg-back': 3.5, 'right-foot': 1,
    'left-thigh-front': 4.5, 'left-thigh-back': 4.5,
    'left-lower-leg-front': 3.5, 'left-lower-leg-back': 3.5, 'left-foot': 1,
    'right-buttock': 2.5, 'left-buttock': 2.5, 'perineum': 1,
};
const LB_AGES = [
    { label: '0-1 year', headTotal: 19, eachThighTotal: 5.5, eachLowerLegTotal: 5 },
    { label: '1-4 years', headTotal: 17, eachThighTotal: 6.5, eachLowerLegTotal: 5 },
    { label: '5-9 years', headTotal: 13, eachThighTotal: 8, eachLowerLegTotal: 5.5 },
    { label: '10-14 years', headTotal: 11, eachThighTotal: 8.5, eachLowerLegTotal: 6 },
];
function buildPedsPct(ageIdx) {
    const a = LB_AGES[ageIdx];
    return {
        'head-front': a.headTotal / 2, 'head-back': a.headTotal / 2,
        'chest': 6.5, 'abdomen': 6.5, 'upper-back': 6.5, 'lower-back': 6.5,
        'right-upper-arm-front': 2, 'right-upper-arm-back': 2,
        'right-forearm-front': 1.5, 'right-forearm-back': 1.5, 'right-hand': 1.25,
        'left-upper-arm-front': 2, 'left-upper-arm-back': 2,
        'left-forearm-front': 1.5, 'left-forearm-back': 1.5, 'left-hand': 1.25,
        'right-thigh-front': a.eachThighTotal / 2, 'right-thigh-back': a.eachThighTotal / 2,
        'right-lower-leg-front': a.eachLowerLegTotal / 2, 'right-lower-leg-back': a.eachLowerLegTotal / 2,
        'right-foot': 1.75, 'left-foot': 1.75,
        'left-thigh-front': a.eachThighTotal / 2, 'left-thigh-back': a.eachThighTotal / 2,
        'left-lower-leg-front': a.eachLowerLegTotal / 2, 'left-lower-leg-back': a.eachLowerLegTotal / 2,
        'right-buttock': 2.5, 'left-buttock': 2.5, 'perineum': 1,
    };
}
// Freehand paint TBSA calculator — canvas-based
function buildTbsaPainter(container, frontPaths, backPaths, pctMap, onUpdate) {
    const CW = 400, CH = 1000, SVG_W = 200;
    const SCALE = CW / SVG_W;
    const BRUSH = 18;
    const BURN_RGBA = [232, 71, 42, 200];
    const BODY_CLR = '#c8b8a8';
    const STROKE_CLR = '#8a7a6a';
    let currentView = 'front';
    let regionMap = new Int16Array(0);
    let regionList = [];
    let bodyClipPath = null; // composite clip of all regions
    const history = [];
    let isPainting = false;
    let lastPt = null;
    // Wrapper
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;';
    // View toggle + controls
    const toolbar = document.createElement('div');
    toolbar.style.cssText = 'display:flex;gap:8px;justify-content:center;flex-wrap:wrap;';
    const btnStyle = 'padding:8px 16px;border-radius:8px;background:var(--color-surface);color:var(--color-text);border:1px solid #444;font-size:14px;min-height:44px;cursor:pointer;';
    const viewBtn = document.createElement('button');
    viewBtn.style.cssText = btnStyle;
    viewBtn.textContent = 'Show Back';
    const undoBtn = document.createElement('button');
    undoBtn.style.cssText = btnStyle;
    undoBtn.textContent = 'Undo';
    const clearBtn = document.createElement('button');
    clearBtn.style.cssText = btnStyle;
    clearBtn.textContent = 'Clear All';
    toolbar.appendChild(viewBtn);
    toolbar.appendChild(undoBtn);
    toolbar.appendChild(clearBtn);
    wrap.appendChild(toolbar);
    // View label
    const viewLabel = document.createElement('div');
    viewLabel.style.cssText = 'font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:center;';
    viewLabel.textContent = 'Anterior (Front)';
    wrap.appendChild(viewLabel);
    // Canvas container
    const canvasWrap = document.createElement('div');
    canvasWrap.style.cssText = 'position:relative;width:100%;max-width:300px;aspect-ratio:200/500;touch-action:none;user-select:none;-webkit-user-select:none;';
    const bodyCanvas = document.createElement('canvas');
    bodyCanvas.width = CW;
    bodyCanvas.height = CH;
    bodyCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;touch-action:none;';
    const paintCanvas = document.createElement('canvas');
    paintCanvas.width = CW;
    paintCanvas.height = CH;
    paintCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;touch-action:none;';
    canvasWrap.appendChild(bodyCanvas);
    canvasWrap.appendChild(paintCanvas);
    wrap.appendChild(canvasWrap);
    // Disclaimer
    const disc = document.createElement('div');
    disc.style.cssText = 'font-size:11px;color:#c8a032;background:rgba(200,160,50,0.1);border-radius:8px;padding:10px;text-align:center;max-width:300px;';
    disc.textContent = 'Exclude 1st-degree (superficial) burns. Only count partial thickness (2nd degree) and full thickness (3rd/4th degree).';
    wrap.appendChild(disc);
    container.appendChild(wrap);
    function getPaths() {
        return currentView === 'front' ? frontPaths : backPaths;
    }
    function buildRegionMap() {
        const paths = getPaths();
        const entries = Object.entries(paths);
        regionList = entries.map(([id, d]) => ({ id, path: new Path2D(d), totalPx: 0 }));
        // Build composite clip path from all regions
        const clip = new Path2D();
        for (const r of regionList)
            clip.addPath(r.path);
        bodyClipPath = clip;
        const map = new Int16Array(CW * CH).fill(-1);
        const tc = document.createElement('canvas');
        tc.width = CW;
        tc.height = CH;
        const tctx = tc.getContext('2d');
        tctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        for (let ri = 0; ri < regionList.length; ri++) {
            tctx.clearRect(0, 0, CW, CH);
            tctx.fillStyle = '#fff';
            tctx.fill(regionList[ri].path);
            const d = tctx.getImageData(0, 0, CW, CH).data;
            let count = 0;
            for (let i = 0; i < CW * CH; i++) {
                if (d[i * 4 + 3] > 128) {
                    if (map[i] === -1)
                        map[i] = ri;
                    count++;
                }
            }
            regionList[ri].totalPx = count;
        }
        regionMap = map;
    }
    function drawBody() {
        const ctx = bodyCanvas.getContext('2d');
        ctx.clearRect(0, 0, CW, CH);
        ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        const paths = getPaths();
        for (const d of Object.values(paths)) {
            const p = new Path2D(d);
            ctx.fillStyle = BODY_CLR;
            ctx.fill(p);
            ctx.strokeStyle = STROKE_CLR;
            ctx.lineWidth = 0.5;
            ctx.stroke(p);
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    function clearPaint() {
        paintCanvas.getContext('2d').clearRect(0, 0, CW, CH);
        history.length = 0;
    }
    function calcTbsa() {
        const ctx = paintCanvas.getContext('2d');
        const d = ctx.getImageData(0, 0, CW, CH).data;
        const counts = new Array(regionList.length).fill(0);
        for (let i = 0; i < CW * CH; i++) {
            if (d[i * 4 + 3] > 50) {
                const ri = regionMap[i];
                if (ri >= 0)
                    counts[ri]++;
            }
        }
        let total = 0;
        for (let ri = 0; ri < regionList.length; ri++) {
            if (counts[ri] > 0 && regionList[ri].totalPx > 0) {
                const frac = Math.min(counts[ri] / regionList[ri].totalPx, 1);
                total += frac * (pctMap[regionList[ri].id] || 0);
            }
        }
        total = Math.min(Math.round(total * 10) / 10, 100);
        onUpdate({ '__tbsa': total });
    }
    function saveSnap() {
        const snap = paintCanvas.getContext('2d').getImageData(0, 0, CW, CH);
        history.push(snap);
        if (history.length > 30)
            history.shift();
    }
    function isInBody(cx, cy) {
        const px = Math.round(cx), py = Math.round(cy);
        if (px < 0 || px >= CW || py < 0 || py >= CH)
            return false;
        return regionMap[py * CW + px] >= 0;
    }
    function paintAt(cx, cy) {
        if (!isInBody(cx, cy))
            return;
        const ctx = paintCanvas.getContext('2d');
        ctx.save();
        // Clip to body silhouette so paint never bleeds outside
        if (bodyClipPath) {
            ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
            ctx.clip(bodyClipPath);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = `rgba(${BURN_RGBA[0]},${BURN_RGBA[1]},${BURN_RGBA[2]},0.85)`;
        ctx.beginPath();
        ctx.arc(cx, cy, BRUSH, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    function paintLine(x1, y1, x2, y2) {
        const dx = x2 - x1, dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(Math.ceil(dist / (BRUSH * 0.4)), 1);
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            paintAt(x1 + dx * t, y1 + dy * t);
        }
    }
    function clientToCanvas(e) {
        const rect = canvasWrap.getBoundingClientRect();
        return { x: ((e.clientX - rect.left) / rect.width) * CW, y: ((e.clientY - rect.top) / rect.height) * CH };
    }
    function onPointerDown(e) {
        const pt = clientToCanvas(e);
        if (!pt || !isInBody(pt.x, pt.y))
            return; // allow scroll outside body
        e.preventDefault();
        isPainting = true;
        saveSnap();
        paintAt(pt.x, pt.y);
        lastPt = pt;
    }
    function onPointerMove(e) {
        if (!isPainting)
            return;
        e.preventDefault();
        const pt = clientToCanvas(e);
        if (pt) {
            if (lastPt)
                paintLine(lastPt.x, lastPt.y, pt.x, pt.y);
            else
                paintAt(pt.x, pt.y);
            lastPt = pt;
        }
    }
    function onPointerUp() {
        if (!isPainting)
            return;
        isPainting = false;
        lastPt = null;
        calcTbsa();
    }
    paintCanvas.addEventListener('pointerdown', onPointerDown);
    paintCanvas.addEventListener('pointermove', onPointerMove);
    paintCanvas.addEventListener('pointerup', onPointerUp);
    paintCanvas.addEventListener('pointerleave', onPointerUp);
    paintCanvas.addEventListener('pointercancel', onPointerUp);
    // Prevent pointer capture so move events keep firing
    paintCanvas.addEventListener('gotpointercapture', (e) => {
        e.target?.releasePointerCapture(e.pointerId);
    });
    viewBtn.addEventListener('click', () => {
        currentView = currentView === 'front' ? 'back' : 'front';
        viewBtn.textContent = currentView === 'front' ? 'Show Back' : 'Show Front';
        viewLabel.textContent = currentView === 'front' ? 'Anterior (Front)' : 'Posterior (Back)';
        clearPaint();
        buildRegionMap();
        drawBody();
        onUpdate({ '__tbsa': 0 });
    });
    undoBtn.addEventListener('click', () => {
        if (history.length === 0)
            return;
        const snap = history.pop();
        paintCanvas.getContext('2d').putImageData(snap, 0, 0);
        calcTbsa();
    });
    clearBtn.addEventListener('click', () => {
        if (!confirm('Clear all burns?'))
            return;
        saveSnap();
        paintCanvas.getContext('2d').clearRect(0, 0, CW, CH);
        calcTbsa();
    });
    // Initialize
    buildRegionMap();
    drawBody();
    return {
        destroy: () => {
            paintCanvas.removeEventListener('pointerdown', onPointerDown);
            paintCanvas.removeEventListener('pointermove', onPointerMove);
            paintCanvas.removeEventListener('pointerup', onPointerUp);
            paintCanvas.removeEventListener('pointerleave', onPointerUp);
            paintCanvas.removeEventListener('pointercancel', onPointerUp);
        },
    };
}
function tbsaComputeResult(values, isPeds) {
    const tbsa = values['__tbsa'] || 0;
    if (tbsa === 0) {
        return { value: '0%', label: 'No Burn Selected', description: 'Draw on the body to paint burn areas.', colorVar: '--color-text-muted' };
    }
    let label;
    let colorVar;
    let desc;
    const parklandMult = isPeds ? '3-4' : '4';
    if (tbsa < 10) {
        label = 'Minor Burn';
        colorVar = '--color-primary';
        desc = `${tbsa}% TBSA. Minor burn \u2014 outpatient management may be appropriate if no other criteria.`;
    }
    else if (tbsa < 20) {
        label = 'Moderate Burn';
        colorVar = '--color-warning';
        desc = `${tbsa}% TBSA. Moderate burn \u2014 consider burn center referral. Parkland: ${parklandMult} mL x kg x ${tbsa}% over 24h.`;
    }
    else if (tbsa < 40) {
        label = 'Major Burn';
        colorVar = '--color-warning';
        desc = `${tbsa}% TBSA. Major burn \u2014 fluid resuscitation required. Parkland: ${parklandMult} mL x kg x ${tbsa}% over 24h (half in first 8h).`;
    }
    else {
        label = 'Critical Burn';
        colorVar = '--color-danger';
        desc = `${tbsa}% TBSA. Critical burn \u2014 immediate aggressive resuscitation. Parkland: ${parklandMult} mL x kg x ${tbsa}% over 24h (half in first 8h).`;
    }
    return { value: `${tbsa}%`, label, description: desc, colorVar };
}
const TBSA_ADULT_CALCULATOR = {
    id: 'tbsa-adult',
    title: 'TBSA \u2014 Rule of 9s',
    subtitle: 'Adult Total Body Surface Area',
    description: 'Draw burn areas directly on the body diagram. Finger-paint interface for precise TBSA estimation. Rule of 9s for adults.',
    fields: [],
    results: [],
    thresholdNote: 'ABA Burn Center referral criteria: partial thickness >10% TBSA, full thickness any size, burns to face/hands/feet/genitalia/perineum/major joints, electrical/chemical/inhalation, circumferential burns.',
    citations: [
        'Wallace AB. The Exposure Treatment of Burns. Lancet. 1951;1(6653):501-504.',
        'American Burn Association. Burn Center Referral Criteria. 2006.',
    ],
    computeResult: (values) => tbsaComputeResult(values, false),
    customRender: (container, onUpdate) => {
        buildTbsaPainter(container, TBSA_ADULT_FRONT, TBSA_ADULT_BACK, TBSA_ADULT_PCT, onUpdate);
    },
};
const TBSA_PEDS_CALCULATOR = {
    id: 'tbsa-peds',
    title: 'TBSA \u2014 Lund-Browder',
    subtitle: 'Pediatric Total Body Surface Area',
    description: 'Draw burn areas on the Lund-Browder chart. Finger-paint interface with age-adjusted percentages for pediatric burns.',
    fields: [],
    results: [],
    thresholdNote: 'Pediatric burn center referral: >10% TBSA partial thickness, any full thickness, burns to face/hands/feet/genitalia/perineum/joints, electrical/chemical/inhalation, circumferential burns, suspected abuse.',
    citations: [
        'Lund CC, Browder NC. The Estimation of Areas of Burns. Surg Gynecol Obstet. 1944;79:352-358.',
        'American Burn Association. Burn Center Referral Criteria. 2006.',
    ],
    computeResult: (values) => tbsaComputeResult(values, true),
    customRender: (container, onUpdate) => {
        let currentAgeIdx = 0;
        let painter = null;
        const ageRow = document.createElement('div');
        ageRow.style.cssText = 'margin-bottom:12px;';
        const ageLabel = document.createElement('label');
        ageLabel.style.cssText = 'font-size:14px;font-weight:600;color:var(--color-text);display:block;margin-bottom:6px;';
        ageLabel.textContent = 'Patient Age Group';
        ageRow.appendChild(ageLabel);
        const ageSelect = document.createElement('select');
        ageSelect.style.cssText = 'width:100%;padding:12px;border-radius:8px;background:var(--color-surface);color:var(--color-text);border:1px solid #666;font-size:16px;min-height:44px;';
        for (let i = 0; i < LB_AGES.length; i++) {
            const opt = document.createElement('option');
            opt.value = String(i);
            opt.textContent = LB_AGES[i].label;
            ageSelect.appendChild(opt);
        }
        ageRow.appendChild(ageSelect);
        container.appendChild(ageRow);
        const diagramContainer = document.createElement('div');
        container.appendChild(diagramContainer);
        function buildDiagram() {
            if (painter)
                painter.destroy();
            diagramContainer.innerHTML = '';
            const pct = buildPedsPct(currentAgeIdx);
            painter = buildTbsaPainter(diagramContainer, TBSA_PEDS_FRONT, TBSA_PEDS_BACK, pct, onUpdate);
        }
        ageSelect.addEventListener('change', () => {
            currentAgeIdx = parseInt(ageSelect.value, 10);
            buildDiagram();
            onUpdate({ '__tbsa': 0 });
        });
        buildDiagram();
    },
};
// -------------------------------------------------------------------
// Rule of 10's Calculator
// -------------------------------------------------------------------
const RULE_OF_10_CALCULATOR = {
    id: 'burn-rule-of-10',
    title: 'Rule of 10s',
    subtitle: 'Initial Burn Fluid Rate',
    description: 'Quick initial LR rate for burn resuscitation. Formula: %TBSA x 10 = initial LR rate (mL/hr). Add 100 mL/hr for every 10 kg above 80 kg.',
    fields: [
        { name: 'tbsa', label: 'TBSA', type: 'number', points: 0, valueIsPoints: true, unit: '%', description: 'Total body surface area burned (2nd/3rd degree)' },
        { name: 'weight', label: 'Weight', type: 'number', points: 0, valueIsPoints: true, unit: 'kg', description: 'Patient weight in kilograms' },
    ],
    results: [],
    thresholdNote: 'Rule of 10s is a rapid estimation for initial resuscitation. Titrate to urine output 0.5-1 mL/kg/hr (adults) or 1 mL/kg/hr (children). Transition to formal Parkland or protocol calculation as soon as possible.',
    citations: [
        'Chung KK, et al. Simple Method of Calculating Fluid Resuscitation Rate for Initial Burn Management. J Trauma. 2009;67(6):1361-1365.',
        'ISBI Practice Guidelines Committee. ISBI Practice Guidelines for Burn Care. Burns. 2016;42(5):953-1021.',
    ],
    computeResult: (values) => {
        const tbsa = values['tbsa'] || 0;
        const weight = values['weight'] || 0;
        if (tbsa <= 0 || weight <= 0) {
            return { value: '--', label: 'Enter values', description: 'Enter TBSA % and weight to calculate initial LR rate.', colorVar: '--color-text-muted' };
        }
        let baseRate = tbsa * 10;
        let weightAdj = 0;
        if (weight > 80) {
            weightAdj = Math.floor((weight - 80) / 10) * 100;
        }
        const totalRate = baseRate + weightAdj;
        const weightNote = weight > 80
            ? ` + ${weightAdj} mL/hr weight adjustment (${Math.floor((weight - 80) / 10)} x 100 for ${weight - 80} kg above 80 kg)`
            : '';
        let colorVar;
        if (tbsa < 20) {
            colorVar = '--color-primary';
        }
        else if (tbsa < 40) {
            colorVar = '--color-warning';
        }
        else {
            colorVar = '--color-danger';
        }
        return {
            value: `${totalRate} mL/hr`,
            label: 'Initial LR Rate',
            description: `Base rate: ${tbsa}% x 10 = ${baseRate} mL/hr${weightNote}. Total: ${totalRate} mL/hr LR. Titrate to UOP 0.5-1 mL/kg/hr.`,
            colorVar,
        };
    },
};
// -------------------------------------------------------------------
// Parkland Formula Calculator
// -------------------------------------------------------------------
const PARKLAND_CALCULATOR = {
    id: 'burn-parkland',
    title: 'Parkland Formula',
    subtitle: 'Burn Fluid Resuscitation',
    description: 'Calculates 24-hour crystalloid resuscitation volume for burn patients. Formula: 4 mL x weight (kg) x %TBSA. First half given over initial 8 hours from time of burn, second half over next 16 hours.',
    fields: [
        { name: 'weight', label: 'Weight', type: 'number', points: 0, valueIsPoints: true, unit: 'kg', description: 'Patient weight in kilograms' },
        { name: 'tbsa', label: 'TBSA', type: 'number', points: 0, valueIsPoints: true, unit: '%', description: 'Total body surface area burned (2nd/3rd degree)' },
        { name: 'hours-elapsed', label: 'Hours Since Burn', type: 'number', points: 0, valueIsPoints: true, unit: 'hours', description: 'Time elapsed since burn injury (0-24)' },
    ],
    results: [],
    thresholdNote: 'Parkland formula is a starting point. Titrate to urine output 0.5-1 mL/kg/hr (adults), 1 mL/kg/hr (children <30 kg). Monitor for fluid creep. Consider colloids if exceeding 6 mL/kg/%TBSA in first 24h.',
    citations: [
        'Baxter CR, Shires T. Physiological Response to Crystalloid Resuscitation of Severe Burns. Ann N Y Acad Sci. 1968;150(3):874-894.',
        'ISBI Practice Guidelines Committee. ISBI Practice Guidelines for Burn Care. Burns. 2016;42(5):953-1021.',
        'Greenhalgh DG. Burn Resuscitation: The Results of the ISBI/ABA Survey. Burns. 2010;36(2):176-182.',
    ],
    computeResult: (values) => {
        const weight = values['weight'] || 0;
        const tbsa = values['tbsa'] || 0;
        const hoursElapsed = Math.min(Math.max(values['hours-elapsed'] || 0, 0), 24);
        if (weight <= 0 || tbsa <= 0) {
            return { value: '--', label: 'Enter values', description: 'Enter weight and TBSA % to calculate resuscitation volume.', colorVar: '--color-text-muted' };
        }
        const total24h = 4 * weight * tbsa;
        const firstHalf = total24h / 2;
        const secondHalf = total24h / 2;
        let desc;
        let rateLabel;
        let currentRate;
        if (hoursElapsed >= 24) {
            currentRate = 0;
            rateLabel = '24h Complete';
            desc = `24h total: ${Math.round(total24h).toLocaleString()} mL LR. Resuscitation period complete. Transition to maintenance fluids. Reassess volume status.`;
        }
        else if (hoursElapsed < 8) {
            const remainingFirst8 = 8 - hoursElapsed;
            const volumeGivenFirst8 = (hoursElapsed / 8) * firstHalf;
            const volumeRemaining = firstHalf - volumeGivenFirst8;
            currentRate = Math.round(volumeRemaining / remainingFirst8);
            rateLabel = `First 8h Rate`;
            desc = `24h total: ${Math.round(total24h).toLocaleString()} mL LR. First 8h: ${Math.round(firstHalf).toLocaleString()} mL (${Math.round(firstHalf / 8)} mL/hr). ` +
                `${hoursElapsed > 0 ? `${hoursElapsed}h elapsed — remaining ${Math.round(volumeRemaining).toLocaleString()} mL over ${remainingFirst8}h = ` : ''}${currentRate} mL/hr. ` +
                `Next 16h: ${Math.round(secondHalf).toLocaleString()} mL (${Math.round(secondHalf / 16)} mL/hr).`;
        }
        else {
            const remainingSecond16 = 24 - hoursElapsed;
            const hoursIntoSecondPhase = hoursElapsed - 8;
            const volumeGivenSecond = (hoursIntoSecondPhase / 16) * secondHalf;
            const volumeRemaining = secondHalf - volumeGivenSecond;
            currentRate = Math.round(volumeRemaining / remainingSecond16);
            rateLabel = `Next 16h Rate`;
            desc = `24h total: ${Math.round(total24h).toLocaleString()} mL LR. First 8h phase complete (${Math.round(firstHalf).toLocaleString()} mL). ` +
                `${hoursIntoSecondPhase > 0 ? `${hoursIntoSecondPhase}h into second phase — remaining ${Math.round(volumeRemaining).toLocaleString()} mL over ${remainingSecond16}h = ` : ''}${currentRate} mL/hr.`;
        }
        let colorVar;
        if (tbsa < 20) {
            colorVar = '--color-primary';
        }
        else if (tbsa < 40) {
            colorVar = '--color-warning';
        }
        else {
            colorVar = '--color-danger';
        }
        return {
            value: hoursElapsed >= 24 ? `${Math.round(total24h).toLocaleString()} mL` : `${currentRate} mL/hr`,
            label: rateLabel,
            description: desc,
            colorVar,
        };
    },
};
// -------------------------------------------------------------------
// Dell-Seton Burn Protocol Calculator
// -------------------------------------------------------------------
const DELL_SETON_CALCULATOR = {
    id: 'burn-dell-seton',
    title: 'Dell-Seton Protocol',
    subtitle: 'Burn Resuscitation Protocol',
    description: 'Dell Seton Medical Center burn resuscitation protocol. Auto-selects fluid strategy based on TBSA tier: 20-39% starts LR (Rule of 10s) then adds FFP; >=40% starts FFP immediately with trialysis.',
    fields: [
        { name: 'weight', label: 'Weight', type: 'number', points: 0, valueIsPoints: true, unit: 'kg', description: 'Patient weight in kilograms' },
        { name: 'tbsa', label: 'TBSA', type: 'number', points: 0, valueIsPoints: true, unit: '%', description: 'Total body surface area burned (2nd/3rd degree)' },
    ],
    results: [],
    thresholdNote: 'Dell-Seton protocol uses early FFP to reduce crystalloid volume and mitigate fluid creep. Titrate to UOP 0.5-1 mL/kg/hr. Volume caps prevent over-resuscitation. Trialysis = LR + FFP + albumin for burns >=40%.',
    citations: [
        'Aydelotte JD. Dell Seton Medical Center Burn Resuscitation Protocol. Dr. Jayson D. Aydelotte MD FACS, Burn Medical Director, The University of Texas at Austin Dell Medical School.',
        'Pham TN, et al. Impact of Tight Glycemic Control in Severely Burned Children. J Trauma. 2005;59(5):1148-1154.',
        'Cochran A, et al. Early Colloid in Burn Resuscitation. J Burn Care Res. 2007;28(5):639-644.',
    ],
    computeResult: (values) => {
        const weight = values['weight'] || 0;
        const tbsa = values['tbsa'] || 0;
        if (weight <= 0 || tbsa <= 0) {
            return { value: '--', label: 'Enter values', description: 'Enter weight and TBSA % to calculate protocol recommendations.', colorVar: '--color-text-muted' };
        }
        if (tbsa < 20) {
            return {
                value: `${tbsa}% TBSA`,
                label: 'Protocol Not Indicated',
                description: `TBSA <20% — formal burn resuscitation protocol not indicated. Standard IVF management. Consider Parkland formula if clinical concern warrants fluid resuscitation.`,
                colorVar: '--color-primary',
            };
        }
        // Rule of 10s base rate
        let baseRate = tbsa * 10;
        let weightAdj = 0;
        if (weight > 80) {
            weightAdj = Math.floor((weight - 80) / 10) * 100;
        }
        const startingRate = baseRate + weightAdj;
        const ffpSwitch = Math.round(15 * tbsa * weight);
        const volumeCap = Math.round(20 * tbsa * weight);
        if (tbsa >= 40) {
            // Tier 2: >=40% TBSA — start FFP immediately
            return {
                value: `${startingRate} mL/hr FFP`,
                label: 'Tier 2: Immediate FFP + Trialysis',
                description: `TBSA >=40% — Start FFP at ${startingRate} mL/hr (Rule of 10s: ${tbsa}% x 10${weightAdj > 0 ? ` + ${weightAdj} weight adj` : ''}). ` +
                    `Volume cap: ${volumeCap.toLocaleString()} mL (20 cc x ${tbsa}% x ${weight} kg). ` +
                    `Initiate TRIALYSIS immediately (LR + FFP + albumin). Titrate to UOP 0.5-1 mL/kg/hr. ` +
                    `Consider vasopressin if rate exceeds cap.`,
                colorVar: '--color-danger',
            };
        }
        // Tier 1: 20-39% TBSA — start LR, switch to FFP
        return {
            value: `${startingRate} mL/hr LR`,
            label: 'Tier 1: LR Start, FFP Switch',
            description: `TBSA 20-39% — Start LR at ${startingRate} mL/hr (Rule of 10s: ${tbsa}% x 10${weightAdj > 0 ? ` + ${weightAdj} weight adj` : ''}). ` +
                `FFP switch trigger: ${ffpSwitch.toLocaleString()} mL cumulative (15 cc x ${tbsa}% x ${weight} kg). ` +
                `Volume cap: ${volumeCap.toLocaleString()} mL (20 cc x ${tbsa}% x ${weight} kg). ` +
                `Titrate to UOP 0.5-1 mL/kg/hr. Switch from LR to FFP when cumulative volume reaches trigger.`,
            colorVar: '--color-warning',
        };
    },
};
// -------------------------------------------------------------------
// ICH Score Calculator
// -------------------------------------------------------------------
const ICH_SCORE_CALCULATOR = {
    id: 'ich-score',
    title: 'ICH Score',
    subtitle: 'Intracerebral Hemorrhage Score',
    description: 'The ICH Score is the most widely used clinical grading scale for intracerebral hemorrhage. It predicts 30-day mortality based on 5 components: GCS, hematoma volume, intraventricular hemorrhage, infratentorial origin, and age. Score range: 0\u20136.',
    fields: [
        {
            name: 'gcs',
            label: 'Glasgow Coma Scale (GCS)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'GCS 13\u201315', points: 0 },
                { label: 'GCS 5\u201312', points: 1 },
                { label: 'GCS 3\u20134', points: 2 },
            ],
        },
        {
            name: 'volume',
            label: 'Hematoma Volume (ABC/2)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '<30 mL', points: 0 },
                { label: '\u226530 mL', points: 1 },
            ],
        },
        {
            name: 'ivh',
            label: 'Intraventricular Hemorrhage (IVH)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No', points: 0 },
                { label: 'Yes', points: 1 },
            ],
        },
        {
            name: 'infratentorial',
            label: 'Infratentorial Origin',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No (supratentorial)', points: 0 },
                { label: 'Yes (cerebellar or brainstem)', points: 1 },
            ],
        },
        {
            name: 'age',
            label: 'Age',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '<80 years', points: 0 },
                { label: '\u226580 years', points: 1 },
            ],
        },
    ],
    results: [
        { min: -Infinity, max: 1, label: 'ICH Score 0', risk: 'Very Low Risk', mortality: '30-day mortality: ~0%', colorVar: '--color-primary' },
        { min: 1, max: 2, label: 'ICH Score 1', risk: 'Low Risk', mortality: '30-day mortality: ~13%', colorVar: '--color-primary' },
        { min: 2, max: 3, label: 'ICH Score 2', risk: 'Moderate Risk', mortality: '30-day mortality: ~26%', colorVar: '--color-warning' },
        { min: 3, max: 4, label: 'ICH Score 3', risk: 'High Risk', mortality: '30-day mortality: ~72%', colorVar: '--color-danger' },
        { min: 4, max: 5, label: 'ICH Score 4', risk: 'Very High Risk', mortality: '30-day mortality: ~97%', colorVar: '--color-danger' },
        { min: 5, max: Infinity, label: 'ICH Score 5\u20136', risk: 'Critical', mortality: '30-day mortality: ~100%', colorVar: '--color-danger' },
    ],
    thresholdNote: 'ICH Score should NOT be used in isolation to make withdrawal-of-care decisions. Limitations: does not distinguish tiny vs massive IVH, pontine vs cerebellar bleeds, or account for frailty/pre-morbid function. Self-fulfilling prophecy bias is well-documented \u2014 aggressive early treatment may improve outcomes beyond score predictions.',
    citations: [
        'Hemphill JC 3rd, Bonovich DC, Besmertis L, et al. The ICH Score: A Simple, Reliable Grading Scale for Intracerebral Hemorrhage. Stroke. 2001;32(4):891-897.',
        'Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage. Stroke. 2022;53(7):e282-e361.',
    ],
};
// -------------------------------------------------------------------
// FUNC Score Calculator
// -------------------------------------------------------------------
const FUNC_SCORE_CALCULATOR = {
    id: 'func-score',
    title: 'FUNC Score',
    subtitle: 'Functional Outcome After ICH',
    description: 'The FUNC Score estimates the likelihood of functional independence at 90 days after intracerebral hemorrhage. Higher scores predict better outcomes. Score range: 0\u201311.',
    fields: [
        {
            name: 'volume',
            label: 'ICH Volume (ABC/2)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '\u226560 mL', points: 0 },
                { label: '30\u201359 mL', points: 2 },
                { label: '<30 mL', points: 4 },
            ],
        },
        {
            name: 'age',
            label: 'Age',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '\u226580 years', points: 0 },
                { label: '70\u201379 years', points: 1 },
                { label: '<70 years', points: 2 },
            ],
        },
        {
            name: 'location',
            label: 'ICH Location',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Infratentorial', points: 0 },
                { label: 'Deep (basal ganglia, thalamus)', points: 1 },
                { label: 'Lobar', points: 2 },
            ],
        },
        {
            name: 'gcs',
            label: 'Glasgow Coma Scale (GCS)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'GCS <9', points: 0 },
                { label: 'GCS \u22659', points: 2 },
            ],
        },
        {
            name: 'cognitive',
            label: 'Pre-ICH Cognitive Impairment',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Yes', points: 0 },
                { label: 'No', points: 1 },
            ],
        },
    ],
    results: [
        { min: -Infinity, max: 5, label: 'FUNC 0\u20134', risk: 'Very Poor', mortality: 'Functional independence at 90 days: 0\u20132%', colorVar: '--color-danger' },
        { min: 5, max: 8, label: 'FUNC 5\u20137', risk: 'Poor', mortality: 'Functional independence at 90 days: 6\u201329%', colorVar: '--color-danger' },
        { min: 8, max: 9, label: 'FUNC 8', risk: 'Intermediate', mortality: 'Functional independence at 90 days: ~42%', colorVar: '--color-warning' },
        { min: 9, max: 11, label: 'FUNC 9\u201310', risk: 'Favorable', mortality: 'Functional independence at 90 days: 55\u201366%', colorVar: '--color-primary' },
        { min: 11, max: Infinity, label: 'FUNC 11', risk: 'Good', mortality: 'Functional independence at 90 days: ~80%', colorVar: '--color-primary' },
    ],
    thresholdNote: 'FUNC Score shares many limitations with the ICH Score. Should NOT be used to justify withdrawal of care. Does not account for timing of intervention, reversible causes of decreased consciousness (e.g., hydrocephalus treatable with EVD), or pre-morbid frailty.',
    citations: [
        'Rost NS, Smith EE, Chang Y, et al. Prediction of Functional Outcome in Patients With Primary Intracerebral Hemorrhage: The FUNC Score. Stroke. 2008;39(8):2304-2309.',
        'Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage. Stroke. 2022;53(7):e282-e361.',
    ],
};
// -------------------------------------------------------------------
// CSF Traumatic Tap Correction Calculator
// -------------------------------------------------------------------
const CSF_CORRECTION_CALCULATOR = {
    id: 'csf-correction',
    title: 'CSF Tap Correction',
    subtitle: 'Traumatic Lumbar Puncture WBC Correction',
    description: 'Corrects CSF WBC count when a traumatic lumbar puncture introduces peripheral blood into the sample. Formula: Predicted CSF WBCs = CSF RBCs \u00d7 (Blood WBCs / Blood RBCs). Subtract predicted from observed CSF WBCs to get the true CSF WBC count.',
    fields: [
        {
            name: 'csf-wbc',
            label: 'Observed CSF WBCs',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'cells/mcL',
            description: 'Total WBC count in CSF sample',
        },
        {
            name: 'csf-rbc',
            label: 'CSF RBCs',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'cells/mcL',
            description: 'RBC count in CSF sample (from traumatic tap)',
        },
        {
            name: 'blood-wbc',
            label: 'Peripheral Blood WBCs',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: '\u00d710\u00b3/mcL',
            description: 'Serum WBC count (e.g., 10.5)',
        },
        {
            name: 'blood-rbc',
            label: 'Peripheral Blood RBCs',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: '\u00d710\u2076/mcL',
            description: 'Serum RBC count (e.g., 4.8)',
        },
    ],
    results: [],
    thresholdNote: 'More accurate than the traditional rule of subtracting 1 WBC per 500\u20131500 RBCs. Compare Tube 1 and Tube 4 cell counts \u2014 decreasing RBCs suggest traumatic tap rather than SAH. Normal CSF: <5 WBCs, 0 RBCs.',
    citations: [
        'Costerus JM, et al. Community-acquired bacterial meningitis. Curr Opin Infect Dis. 2017;30(1):135-141.',
        'Mazor SS, et al. Interpretation of traumatic lumbar punctures: who can go home? Pediatrics. 2003;111(3):525-528.',
    ],
    computeResult: (values) => {
        const csfWbc = values['csf-wbc'] || 0;
        const csfRbc = values['csf-rbc'] || 0;
        const bloodWbc = values['blood-wbc'] || 0;
        const bloodRbc = values['blood-rbc'] || 0;
        if (csfWbc <= 0 || csfRbc <= 0 || bloodWbc <= 0 || bloodRbc <= 0) {
            return {
                value: '--',
                label: 'Enter values',
                description: 'Enter all four values to calculate corrected CSF WBC count. Use peripheral blood WBC in \u00d710\u00b3/mcL and RBC in \u00d710\u2076/mcL as reported by the lab.',
                colorVar: '--color-text-muted',
            };
        }
        // Convert to same units: blood WBC is ×10³, blood RBC is ×10⁶
        // Ratio blood WBC/RBC = (WBC × 10³) / (RBC × 10⁶) = WBC / (RBC × 1000)
        const ratio = bloodWbc / (bloodRbc * 1000);
        const predictedWbc = csfRbc * ratio;
        const correctedWbc = Math.max(0, csfWbc - predictedWbc);
        const correctedRounded = Math.round(correctedWbc * 10) / 10;
        const predictedRounded = Math.round(predictedWbc * 10) / 10;
        if (correctedRounded < 5) {
            return {
                value: `${correctedRounded} WBCs/mcL`,
                label: 'Normal Corrected Count',
                description: `Predicted contamination WBCs: ${predictedRounded}\nObserved CSF WBCs: ${csfWbc}\nCorrected (true) CSF WBCs: ${correctedRounded}\n\nCorrected count is within normal limits (<5 WBCs/mcL). Elevated observed WBCs likely due to traumatic tap contamination.`,
                colorVar: '--color-primary',
            };
        }
        if (correctedRounded < 100) {
            return {
                value: `${correctedRounded} WBCs/mcL`,
                label: 'Mild Pleocytosis',
                description: `Predicted contamination WBCs: ${predictedRounded}\nObserved CSF WBCs: ${csfWbc}\nCorrected (true) CSF WBCs: ${correctedRounded}\n\nMild pleocytosis after correction. Consider viral meningitis (typical: 5\u20131000 WBCs, lymphocyte predominance). Clinical correlation required.`,
                colorVar: '--color-warning',
            };
        }
        return {
            value: `${correctedRounded} WBCs/mcL`,
            label: 'Significant Pleocytosis',
            description: `Predicted contamination WBCs: ${predictedRounded}\nObserved CSF WBCs: ${csfWbc}\nCorrected (true) CSF WBCs: ${correctedRounded}\n\nSignificant pleocytosis persists after correction. Bacterial meningitis typically >100 WBCs. Continue empiric antibiotics and pursue definitive diagnostics.`,
            colorVar: '--color-danger',
        };
    },
};
const OTTAWA_SAH_CALCULATOR = {
    id: 'ottawa-sah',
    title: 'Ottawa SAH Rule',
    subtitle: 'Ottawa Subarachnoid Hemorrhage Rule',
    description: 'Clinical decision rule for patients with acute nontraumatic headache reaching maximal intensity within 1 hour and a normal neurologic examination. If ALL criteria are absent, SAH can be excluded with 100% sensitivity.',
    fields: [
        { name: 'age', label: 'Age ≥40 years', type: 'toggle', points: 1 },
        { name: 'neck-pain', label: 'Neck pain or stiffness', type: 'toggle', points: 1 },
        { name: 'loc', label: 'Witnessed loss of consciousness', type: 'toggle', points: 1 },
        { name: 'exertion', label: 'Onset during exertion', type: 'toggle', points: 1 },
        { name: 'thunderclap', label: 'Thunderclap headache (peak within 1 minute)', type: 'toggle', points: 1 },
        { name: 'neck-flexion', label: 'Limited neck flexion on examination', type: 'toggle', points: 1 },
    ],
    results: [
        { min: 0, max: 0, label: 'Rule Negative — Low Risk', risk: 'No Ottawa SAH Rule criteria present', mortality: 'May not require imaging per ACEP 2019. Sensitivity 100%, specificity 27.5%.', colorVar: '--color-primary' },
        { min: 1, max: 6, label: 'Rule Positive — Workup Required', risk: '≥1 Ottawa SAH Rule criteria present', mortality: 'Obtain noncontrast head CT. If negative, consider LP based on timing and clinical suspicion.', colorVar: '--color-danger' },
    ],
    thresholdNote: 'Applies only to alert patients with acute nontraumatic headache reaching maximal intensity within 1 hour and normal neurologic examination. Does not apply to patients with focal neurologic deficits, papilledema, or history of aneurysm/SAH.',
    citations: ['Perry JJ, Stiell IG, Sivilotti ML, et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255.', 'Perry JJ, Sivilotti MLA, Émond M, et al. Prospective Implementation of the Ottawa Subarachnoid Hemorrhage Rule and 6-Hour Computed Tomography Rule. Stroke. 2020;51(2):424-430.'],
};
const HUNT_HESS_CALCULATOR = {
    id: 'hunt-hess',
    title: 'Hunt & Hess Scale',
    subtitle: 'Hunt and Hess Classification of Subarachnoid Hemorrhage',
    description: 'Grading scale for clinical severity of subarachnoid hemorrhage. Higher grade correlates with higher inpatient mortality. Most widely used clinical SAH grading scale.',
    fields: [
        {
            name: 'grade',
            label: 'Clinical Presentation',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Grade 1 — Asymptomatic or mild headache, slight nuchal rigidity', points: 1 },
                { label: 'Grade 2 — Moderate-severe headache, nuchal rigidity, no focal deficit (except CN palsy)', points: 2 },
                { label: 'Grade 3 — Drowsy, confused, or mild focal deficit', points: 3 },
                { label: 'Grade 4 — Stupor, moderate-severe hemiparesis, possible decerebrate rigidity', points: 4 },
                { label: 'Grade 5 — Deep coma, decerebrate posturing, moribund appearance', points: 5 },
            ],
        },
    ],
    results: [
        { min: 1, max: 1, label: 'Grade 1 — Low Risk', risk: 'Minimal symptoms', mortality: '~1% surgical mortality', colorVar: '--color-primary' },
        { min: 2, max: 2, label: 'Grade 2 — Low-Moderate Risk', risk: 'Severe headache, no focal deficits', mortality: '~5% surgical mortality', colorVar: '--color-info' },
        { min: 3, max: 3, label: 'Grade 3 — Moderate Risk', risk: 'Drowsy with mild deficit', mortality: '~19% surgical mortality', colorVar: '--color-warning' },
        { min: 4, max: 4, label: 'Grade 4 — High Risk', risk: 'Stupor, hemiparesis', mortality: '~42% surgical mortality', colorVar: '--color-danger' },
        { min: 5, max: 5, label: 'Grade 5 — Very High Risk', risk: 'Coma, decerebrate', mortality: '~77% surgical mortality', colorVar: '--color-danger' },
    ],
    thresholdNote: 'Grade at time of initial assessment. Higher grades (4-5) historically had 70-90% mortality, but modern neurocritical care has significantly improved outcomes. Aggressive treatment may still be warranted.',
    citations: ['Hunt WE, Hess RM. Surgical risk as related to time of intervention in the repair of intracranial aneurysms. J Neurosurg. 1968;28(1):14-20.'],
};
const MODIFIED_FISHER_CALCULATOR = {
    id: 'modified-fisher',
    title: 'Modified Fisher Scale',
    subtitle: 'Modified Fisher Scale for SAH Vasospasm Risk',
    description: 'Predicts risk of symptomatic cerebral vasospasm after subarachnoid hemorrhage based on CT findings. Accounts for both subarachnoid blood thickness and intraventricular hemorrhage.',
    fields: [
        {
            name: 'grade',
            label: 'CT Findings',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Grade 0 — No subarachnoid hemorrhage or intraventricular hemorrhage', points: 0 },
                { label: 'Grade 1 — Thin SAH, no intraventricular hemorrhage (IVH)', points: 1 },
                { label: 'Grade 2 — Thin SAH with intraventricular hemorrhage', points: 2 },
                { label: 'Grade 3 — Thick SAH, no intraventricular hemorrhage', points: 3 },
                { label: 'Grade 4 — Thick SAH with intraventricular hemorrhage', points: 4 },
            ],
        },
    ],
    results: [
        { min: 0, max: 0, label: 'Grade 0 — No Hemorrhage', risk: 'No SAH or IVH identified', mortality: '0% symptomatic vasospasm', colorVar: '--color-primary' },
        { min: 1, max: 1, label: 'Grade 1 — Low Vasospasm Risk', risk: 'Thin SAH without IVH', mortality: '24% symptomatic vasospasm', colorVar: '--color-info' },
        { min: 2, max: 2, label: 'Grade 2 — Moderate Risk', risk: 'Thin SAH with IVH', mortality: '33% symptomatic vasospasm', colorVar: '--color-warning' },
        { min: 3, max: 3, label: 'Grade 3 — High Risk', risk: 'Thick SAH without IVH', mortality: '33% symptomatic vasospasm', colorVar: '--color-warning' },
        { min: 4, max: 4, label: 'Grade 4 — Highest Risk', risk: 'Thick SAH with IVH', mortality: '40% symptomatic vasospasm', colorVar: '--color-danger' },
    ],
    thresholdNote: 'Thick SAH = clots >1mm in thickness or complete filling of any cistern. Thin SAH = less than 1mm thick. Vasospasm peak incidence is 7-10 days post-SAH. All confirmed SAH patients should receive nimodipine 60 mg PO q4h regardless of Fisher grade.',
    citations: ['Frontera JA, Claassen J, Schmidt JM, et al. Prediction of symptomatic vasospasm after subarachnoid hemorrhage: the modified Fisher scale. Neurosurgery. 2006;59(1):21-27.'],
};
// -------------------------------------------------------------------
// Calculator Registry
// -------------------------------------------------------------------
const CALCULATORS = {
    'pesi': PESI_CALCULATOR,
    'spesi': SPESI_CALCULATOR,
    'cha2ds2vasc': CHA2DS2VASC_CALCULATOR,
    'nihss': NIHSS_CALCULATOR,
    'timi': TIMI_CALCULATOR,
    'bas': BAS_CALCULATOR,
    'fwd': FWD_CALCULATOR,
    'corrected-na': CORRECTED_NA_CALCULATOR,
    'tbsa-adult': TBSA_ADULT_CALCULATOR,
    'tbsa-peds': TBSA_PEDS_CALCULATOR,
    'burn-rule-of-10': RULE_OF_10_CALCULATOR,
    'burn-parkland': PARKLAND_CALCULATOR,
    'burn-dell-seton': DELL_SETON_CALCULATOR,
    'ich-score': ICH_SCORE_CALCULATOR,
    'func-score': FUNC_SCORE_CALCULATOR,
    'csf-correction': CSF_CORRECTION_CALCULATOR,
    'ottawa-sah': OTTAWA_SAH_CALCULATOR,
    'hunt-hess': HUNT_HESS_CALCULATOR,
    'modified-fisher': MODIFIED_FISHER_CALCULATOR,
};
/** Get all available calculators sorted alphabetically by title */
export function getAllCalculators() {
    return Object.values(CALCULATORS)
        .map(c => ({ id: c.id, title: c.title, subtitle: c.subtitle }))
        .sort((a, b) => a.title.localeCompare(b.title));
}
// -------------------------------------------------------------------
// Render: Calculator List (Medical Calculators category)
// -------------------------------------------------------------------
/** Render the calculator list view with search */
export function renderCalculatorList(container) {
    container.innerHTML = '';
    // Back button
    const backBtn = document.createElement('button');
    backBtn.className = 'btn-text';
    backBtn.textContent = '\u2190 Categories';
    backBtn.addEventListener('click', () => router.navigate('/'));
    container.appendChild(backBtn);
    // Header
    const header = document.createElement('div');
    header.className = 'category-view-header';
    const icon = document.createElement('span');
    icon.className = 'category-view-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '\uD83E\uDDEE'; // 🧮
    const name = document.createElement('h2');
    name.className = 'category-view-name';
    name.textContent = 'Medical Calculators';
    header.appendChild(icon);
    header.appendChild(name);
    container.appendChild(header);
    // Search bar
    const searchWrap = document.createElement('div');
    searchWrap.className = 'calculator-search-wrap';
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.className = 'calculator-search-input';
    searchInput.placeholder = 'Search calculators\u2026';
    searchInput.setAttribute('aria-label', 'Search calculators');
    searchWrap.appendChild(searchInput);
    container.appendChild(searchWrap);
    // Calculator list
    const list = document.createElement('div');
    list.className = 'tree-list';
    container.appendChild(list);
    const allCalcs = getAllCalculators();
    function renderList(filter) {
        list.innerHTML = '';
        const query = filter.toLowerCase().trim();
        const filtered = query
            ? allCalcs.filter(c => c.title.toLowerCase().includes(query) || c.subtitle.toLowerCase().includes(query))
            : allCalcs;
        if (filtered.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            const emptyText = document.createElement('p');
            emptyText.textContent = 'No calculators match your search.';
            empty.appendChild(emptyText);
            list.appendChild(empty);
            return;
        }
        for (const calc of filtered) {
            const card = document.createElement('button');
            card.className = 'tree-card';
            card.setAttribute('aria-label', `${calc.title} \u2014 ${calc.subtitle}`);
            card.addEventListener('click', () => {
                router.navigate(`/calculator/${calc.id}`);
            });
            const title = document.createElement('div');
            title.className = 'tree-card-title';
            title.textContent = calc.title;
            const subtitle = document.createElement('div');
            subtitle.className = 'tree-card-subtitle';
            subtitle.textContent = calc.subtitle;
            card.appendChild(title);
            card.appendChild(subtitle);
            list.appendChild(card);
        }
    }
    searchInput.addEventListener('input', () => renderList(searchInput.value));
    renderList('');
}
// -------------------------------------------------------------------
// Render: Calculator
// -------------------------------------------------------------------
/** Render a clinical calculator into a container */
export function renderCalculator(container, calculatorId) {
    const calc = CALCULATORS[calculatorId];
    if (!calc) {
        renderCalcNotFound(container, calculatorId);
        return;
    }
    container.innerHTML = '';
    // Back button
    const backBtn = document.createElement('button');
    backBtn.className = 'btn-text';
    backBtn.textContent = '\u2190 Back';
    backBtn.addEventListener('click', () => history.back());
    container.appendChild(backBtn);
    // Header
    const header = document.createElement('div');
    header.className = 'calculator-header';
    const title = document.createElement('h1');
    title.className = 'calculator-title';
    title.textContent = calc.title;
    header.appendChild(title);
    const subtitle = document.createElement('p');
    subtitle.className = 'calculator-subtitle';
    subtitle.textContent = calc.subtitle;
    header.appendChild(subtitle);
    container.appendChild(header);
    // Description
    const desc = document.createElement('p');
    desc.className = 'calculator-description';
    desc.textContent = calc.description;
    container.appendChild(desc);
    // Score display (will update in real-time)
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'calculator-score-display';
    scoreDisplay.id = 'calc-score-display';
    container.appendChild(scoreDisplay);
    // Custom render path (e.g., SVG body diagrams)
    if (calc.customRender) {
        const customContainer = document.createElement('div');
        customContainer.className = 'calculator-form';
        container.appendChild(customContainer);
        calc.customRender(customContainer, (values) => {
            if (calc.computeResult) {
                const result = calc.computeResult(values);
                scoreDisplay.innerHTML = '';
                const scoreNum = document.createElement('div');
                scoreNum.className = 'calculator-score-number';
                scoreNum.textContent = result.value;
                scoreDisplay.appendChild(scoreNum);
                const labelEl = document.createElement('div');
                labelEl.className = 'calculator-result-label';
                labelEl.textContent = result.label;
                labelEl.style.color = `var(${result.colorVar})`;
                scoreDisplay.appendChild(labelEl);
                const descEl = document.createElement('div');
                descEl.className = 'calculator-result-risk';
                descEl.textContent = result.description;
                scoreDisplay.appendChild(descEl);
            }
        });
        // Threshold note
        const threshold = document.createElement('div');
        threshold.className = 'calculator-threshold';
        threshold.textContent = calc.thresholdNote;
        container.appendChild(threshold);
        // Citations
        const citationSection = document.createElement('details');
        citationSection.className = 'calculator-citations';
        const citSummary = document.createElement('summary');
        citSummary.textContent = `References (${calc.citations.length})`;
        citationSection.appendChild(citSummary);
        const citList = document.createElement('ol');
        citList.className = 'calculator-citation-list';
        for (const cit of calc.citations) {
            const li = document.createElement('li');
            li.textContent = cit;
            citList.appendChild(li);
        }
        citationSection.appendChild(citList);
        container.appendChild(citationSection);
        // Initial render with empty state
        if (calc.computeResult) {
            const initial = calc.computeResult({ '__tbsa': 0, '__tbsa_2nd': 0, '__tbsa_3rd': 0 });
            scoreDisplay.innerHTML = '';
            const scoreNum = document.createElement('div');
            scoreNum.className = 'calculator-score-number';
            scoreNum.textContent = initial.value;
            scoreDisplay.appendChild(scoreNum);
            const labelEl = document.createElement('div');
            labelEl.className = 'calculator-result-label';
            labelEl.textContent = initial.label;
            labelEl.style.color = `var(${initial.colorVar})`;
            scoreDisplay.appendChild(labelEl);
            const descEl = document.createElement('div');
            descEl.className = 'calculator-result-risk';
            descEl.textContent = initial.description;
            scoreDisplay.appendChild(descEl);
        }
        return;
    }
    // Form
    const form = document.createElement('div');
    form.className = 'calculator-form';
    // State for field values
    const fieldValues = {};
    for (const field of calc.fields) {
        fieldValues[field.name] = 0;
    }
    // Render fields
    for (const field of calc.fields) {
        const fieldEl = document.createElement('div');
        fieldEl.className = 'calculator-field';
        if (field.type === 'number') {
            renderNumberField(fieldEl, field, fieldValues, () => updateScore(calc, fieldValues, scoreDisplay));
        }
        else if (field.type === 'select') {
            renderSelectField(fieldEl, field, fieldValues, () => updateScore(calc, fieldValues, scoreDisplay));
        }
        else {
            renderToggleField(fieldEl, field, fieldValues, () => updateScore(calc, fieldValues, scoreDisplay));
        }
        form.appendChild(fieldEl);
    }
    container.appendChild(form);
    // Threshold note
    const threshold = document.createElement('div');
    threshold.className = 'calculator-threshold';
    threshold.textContent = calc.thresholdNote;
    container.appendChild(threshold);
    // Citations
    const citationSection = document.createElement('details');
    citationSection.className = 'calculator-citations';
    const citSummary = document.createElement('summary');
    citSummary.textContent = `References (${calc.citations.length})`;
    citationSection.appendChild(citSummary);
    const citList = document.createElement('ol');
    citList.className = 'calculator-citation-list';
    for (const cit of calc.citations) {
        const li = document.createElement('li');
        li.textContent = cit;
        citList.appendChild(li);
    }
    citationSection.appendChild(citList);
    container.appendChild(citationSection);
    // Initial score render
    updateScore(calc, fieldValues, scoreDisplay);
}
// -------------------------------------------------------------------
// Field Renderers
// -------------------------------------------------------------------
function renderNumberField(container, field, values, onChange) {
    const label = document.createElement('label');
    label.className = 'calculator-field-label';
    label.textContent = field.label;
    container.appendChild(label);
    if (field.description) {
        const desc = document.createElement('span');
        desc.className = 'calculator-field-desc';
        desc.textContent = field.description;
        container.appendChild(desc);
    }
    const inputRow = document.createElement('div');
    inputRow.className = 'calculator-number-row';
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'calculator-number-input';
    input.inputMode = 'numeric';
    input.min = '0';
    input.max = '150';
    input.placeholder = '0';
    input.setAttribute('aria-label', field.label);
    input.addEventListener('input', () => {
        const val = parseInt(input.value, 10);
        values[field.name] = isNaN(val) ? 0 : val;
        onChange();
    });
    inputRow.appendChild(input);
    if (field.unit) {
        const unit = document.createElement('span');
        unit.className = 'calculator-number-unit';
        unit.textContent = field.unit;
        inputRow.appendChild(unit);
    }
    container.appendChild(inputRow);
    // Points indicator
    const points = document.createElement('span');
    points.className = 'calculator-field-points';
    points.textContent = field.valueIsPoints ? 'pts = age' : `+${field.points} pts`;
    container.appendChild(points);
}
function renderToggleField(container, field, values, onChange) {
    const row = document.createElement('div');
    row.className = 'calculator-toggle-row';
    const labelWrap = document.createElement('div');
    labelWrap.className = 'calculator-toggle-label-wrap';
    const label = document.createElement('span');
    label.className = 'calculator-field-label';
    label.textContent = field.label;
    labelWrap.appendChild(label);
    if (field.description) {
        const desc = document.createElement('span');
        desc.className = 'calculator-field-desc';
        desc.textContent = field.description;
        labelWrap.appendChild(desc);
    }
    row.appendChild(labelWrap);
    // Points badge
    const pointsBadge = document.createElement('span');
    pointsBadge.className = 'calculator-field-points';
    pointsBadge.textContent = `+${field.points}`;
    row.appendChild(pointsBadge);
    // Toggle switch
    const toggleLabel = document.createElement('label');
    toggleLabel.className = 'calculator-toggle';
    toggleLabel.setAttribute('aria-label', `${field.label}: toggle`);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'calculator-toggle-input';
    const slider = document.createElement('span');
    slider.className = 'calculator-toggle-slider';
    toggleLabel.appendChild(checkbox);
    toggleLabel.appendChild(slider);
    row.appendChild(toggleLabel);
    checkbox.addEventListener('change', () => {
        values[field.name] = checkbox.checked ? field.points : 0;
        onChange();
    });
    container.appendChild(row);
}
function renderSelectField(container, field, values, onChange) {
    const row = document.createElement('div');
    row.className = 'calculator-select-row';
    const labelWrap = document.createElement('div');
    labelWrap.className = 'calculator-toggle-label-wrap';
    const label = document.createElement('span');
    label.className = 'calculator-field-label';
    label.textContent = field.label;
    labelWrap.appendChild(label);
    if (field.description) {
        const desc = document.createElement('span');
        desc.className = 'calculator-field-desc';
        desc.textContent = field.description;
        labelWrap.appendChild(desc);
    }
    row.appendChild(labelWrap);
    container.appendChild(row);
    const selectRow = document.createElement('div');
    selectRow.className = 'calculator-select-input-row';
    const select = document.createElement('select');
    select.className = 'calculator-select-input';
    select.setAttribute('aria-label', field.label);
    if (field.selectOptions) {
        for (const opt of field.selectOptions) {
            const option = document.createElement('option');
            option.value = String(opt.points);
            option.textContent = `${opt.label} (${opt.points})`;
            select.appendChild(option);
        }
    }
    select.addEventListener('change', () => {
        values[field.name] = parseInt(select.value, 10);
        onChange();
    });
    selectRow.appendChild(select);
    container.appendChild(selectRow);
}
// -------------------------------------------------------------------
// Score Computation & Display
// -------------------------------------------------------------------
function updateScore(calc, values, display) {
    // Formula-based calculator override
    if (calc.computeResult) {
        const result = calc.computeResult(values);
        display.innerHTML = '';
        const scoreNum = document.createElement('div');
        scoreNum.className = 'calculator-score-number';
        scoreNum.textContent = result.value;
        display.appendChild(scoreNum);
        const labelEl = document.createElement('div');
        labelEl.className = 'calculator-result-label';
        labelEl.textContent = result.label;
        labelEl.style.color = `var(${result.colorVar})`;
        display.appendChild(labelEl);
        const descEl = document.createElement('div');
        descEl.className = 'calculator-result-risk';
        descEl.textContent = result.description;
        display.appendChild(descEl);
        return;
    }
    // Sum all field values
    let score = 0;
    for (const field of calc.fields) {
        if (field.valueIsPoints) {
            score += values[field.name]; // Number field: value IS the points
        }
        else {
            score += values[field.name]; // Toggle: 0 or field.points
        }
    }
    // Find matching result range
    let result = null;
    for (const r of calc.results) {
        if (score >= r.min && score < r.max) {
            result = r;
            break;
        }
    }
    // Render score display
    display.innerHTML = '';
    const scoreNum = document.createElement('div');
    scoreNum.className = 'calculator-score-number';
    scoreNum.textContent = String(score);
    display.appendChild(scoreNum);
    if (result) {
        const badge = document.createElement('div');
        badge.className = 'calculator-risk-badge';
        badge.style.borderColor = `var(${result.colorVar})`;
        badge.style.color = `var(${result.colorVar})`;
        const classLabel = document.createElement('span');
        classLabel.className = 'calculator-risk-class';
        classLabel.textContent = result.label;
        badge.appendChild(classLabel);
        const riskLabel = document.createElement('span');
        riskLabel.className = 'calculator-risk-level';
        riskLabel.textContent = result.risk;
        badge.appendChild(riskLabel);
        display.appendChild(badge);
        const mortality = document.createElement('div');
        mortality.className = 'calculator-mortality';
        mortality.textContent = result.mortality;
        display.appendChild(mortality);
    }
}
// -------------------------------------------------------------------
// Not Found
// -------------------------------------------------------------------
function renderCalcNotFound(container, id) {
    container.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'empty-state';
    const icon = document.createElement('div');
    icon.className = 'empty-state-icon';
    icon.textContent = '\u2753';
    const title = document.createElement('h3');
    title.textContent = 'Calculator Not Found';
    const sub = document.createElement('p');
    sub.textContent = `No calculator with ID "${id}" exists.`;
    const homeBtn = document.createElement('button');
    homeBtn.className = 'btn-primary';
    homeBtn.textContent = 'Go Home';
    homeBtn.style.marginTop = '16px';
    homeBtn.addEventListener('click', () => router.navigate('/'));
    wrap.appendChild(icon);
    wrap.appendChild(title);
    wrap.appendChild(sub);
    wrap.appendChild(homeBtn);
    container.appendChild(wrap);
}
