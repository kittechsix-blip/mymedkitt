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
// TBSA Calculator — Slider-Based Body Diagram
// -------------------------------------------------------------------
// Tap a body region → it expands with a slider to select % burned.
// No 2nd/3rd degree distinction — only 2nd+ burns count toward TBSA.
const SVG_NS = 'http://www.w3.org/2000/svg';
const BURN_STROKE = '#FF7800';
const EMPTY_FILL = 'var(--color-surface)';
const EMPTY_STROKE = '#555';
function createSvgPath(d) {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    return path;
}
// Inject slider thumb styles (can't be done inline)
function injectSliderStyles() {
    if (document.getElementById('tbsa-slider-styles'))
        return;
    const style = document.createElement('style');
    style.id = 'tbsa-slider-styles';
    style.textContent = `
    input.tbsa-slider { -webkit-appearance:none; width:100%; height:10px; border-radius:5px; outline:none; margin:16px 0; }
    input.tbsa-slider::-webkit-slider-thumb { -webkit-appearance:none; width:36px; height:36px; border-radius:50%; background:#FF7800; cursor:pointer; border:3px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.3); }
  `;
    document.head.appendChild(style);
}
function buildSliderDiagram(container, frontRegions, backRegions, perineum, onUpdate) {
    injectSliderStyles();
    const allRegions = [...frontRegions, ...backRegions];
    if (perineum)
        allRegions.push(perineum);
    // State: burn percentage per region (0-100% of that region)
    const burnState = {};
    for (const r of allRegions)
        burnState[r.id] = 0;
    let selectedRegionId = null;
    // --- Warning: 1st degree excluded ---
    const warning = document.createElement('div');
    warning.style.cssText = 'font-size:13px;color:#FF9800;margin-bottom:12px;line-height:1.4;padding:10px 12px;background:rgba(255,152,0,0.1);border-radius:8px;border-left:3px solid #FF9800;';
    warning.textContent = 'Do NOT include 1st degree (superficial) burns. Only 2nd degree (partial thickness) and 3rd degree (full thickness) burns count toward TBSA.';
    container.appendChild(warning);
    // --- Instruction ---
    const instrEl = document.createElement('div');
    instrEl.style.cssText = 'font-size:13px;color:var(--color-text-muted);margin-bottom:12px;line-height:1.4;';
    instrEl.textContent = 'Tap a body region to expand it, then use the slider to set what percentage of that region is burned.';
    container.appendChild(instrEl);
    // --- Total display + Clear ---
    const topRow = document.createElement('div');
    topRow.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;';
    const totalEl = document.createElement('div');
    totalEl.style.cssText = 'font-size:24px;font-weight:700;color:var(--color-primary);';
    totalEl.textContent = 'TBSA: 0%';
    const clearBtn = document.createElement('button');
    clearBtn.style.cssText = 'padding:8px 16px;border-radius:8px;background:var(--color-surface);color:var(--color-text-muted);border:1px solid var(--color-text-muted);font-size:13px;cursor:pointer;min-height:44px;';
    clearBtn.textContent = 'Clear All';
    topRow.appendChild(totalEl);
    topRow.appendChild(clearBtn);
    container.appendChild(topRow);
    // --- SVG wrapper ---
    const svgWrap = document.createElement('div');
    svgWrap.style.cssText = 'display:flex;justify-content:center;gap:16px;margin-bottom:6px;';
    function buildSilhouette(regions, viewLabel) {
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('viewBox', '0 0 130 310');
        svg.setAttribute('width', '145');
        svg.setAttribute('height', '345');
        svg.style.cssText = 'touch-action:manipulation;user-select:none;-webkit-user-select:none;';
        const text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute('x', '65');
        text.setAttribute('y', '308');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'var(--color-text-muted)');
        text.setAttribute('font-size', '11');
        text.textContent = viewLabel;
        svg.appendChild(text);
        for (const region of regions) {
            const group = document.createElementNS(SVG_NS, 'g');
            group.setAttribute('data-region', region.id);
            group.style.cursor = 'pointer';
            for (const d of region.paths) {
                const path = createSvgPath(d);
                path.setAttribute('fill', EMPTY_FILL);
                path.setAttribute('stroke', EMPTY_STROKE);
                path.setAttribute('stroke-width', '0.8');
                path.setAttribute('stroke-linejoin', 'round');
                group.appendChild(path);
            }
            // Percentage label
            const pctLabel = document.createElementNS(SVG_NS, 'text');
            pctLabel.setAttribute('text-anchor', 'middle');
            pctLabel.setAttribute('fill', 'var(--color-text-muted)');
            pctLabel.setAttribute('font-size', '7');
            pctLabel.setAttribute('pointer-events', 'none');
            pctLabel.textContent = `${region.pct}%`;
            group.appendChild(pctLabel);
            group.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectRegion(region.id);
            });
            svg.appendChild(group);
        }
        return svg;
    }
    // --- Region fill based on burn percentage ---
    function updateRegionFill(regionId) {
        const pct = burnState[regionId];
        const opacity = 0.3 + (pct / 100) * 0.5;
        const isSelected = regionId === selectedRegionId;
        svgWrap.querySelectorAll(`g[data-region="${regionId}"] path`).forEach(p => {
            if (pct > 0) {
                p.setAttribute('fill', `rgba(255, 120, 0, ${opacity})`);
                p.setAttribute('stroke', BURN_STROKE);
                p.setAttribute('stroke-width', isSelected ? '2.5' : '1.5');
            }
            else {
                p.setAttribute('fill', EMPTY_FILL);
                p.setAttribute('stroke', isSelected ? '#fff' : EMPTY_STROKE);
                p.setAttribute('stroke-width', isSelected ? '2.5' : '0.8');
            }
        });
        // Perineum button
        if (regionId === 'perineum') {
            const periBtn = container.querySelector('[data-perineum-btn]');
            if (periBtn) {
                if (pct > 0) {
                    periBtn.style.background = `rgba(255, 120, 0, ${opacity})`;
                    periBtn.style.borderColor = BURN_STROKE;
                    periBtn.style.color = '#fff';
                }
                else {
                    periBtn.style.background = 'var(--color-surface)';
                    periBtn.style.borderColor = isSelected ? '#fff' : '#555';
                    periBtn.style.color = 'var(--color-text)';
                }
            }
        }
    }
    // --- Detail panel (appears below SVGs when region selected) ---
    const detailPanel = document.createElement('div');
    detailPanel.style.cssText = 'display:none;padding:16px;background:var(--color-surface);border-radius:12px;border:2px solid #FF7800;margin-bottom:14px;';
    function selectRegion(regionId) {
        if (selectedRegionId === regionId) {
            selectedRegionId = null;
            detailPanel.style.display = 'none';
            updateAllHighlights();
            return;
        }
        selectedRegionId = regionId;
        showDetailPanel(regionId);
        updateAllHighlights();
    }
    function updateAllHighlights() {
        for (const r of allRegions)
            updateRegionFill(r.id);
    }
    function showDetailPanel(regionId) {
        const region = allRegions.find(r => r.id === regionId);
        detailPanel.innerHTML = '';
        detailPanel.style.display = 'block';
        // Title row
        const titleRow = document.createElement('div');
        titleRow.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;';
        const titleEl = document.createElement('div');
        titleEl.style.cssText = 'font-size:16px;font-weight:700;color:var(--color-text);';
        titleEl.textContent = region.label;
        const maxEl = document.createElement('div');
        maxEl.style.cssText = 'font-size:14px;color:var(--color-text-muted);';
        maxEl.textContent = `Max: ${region.pct}% TBSA`;
        titleRow.appendChild(titleEl);
        titleRow.appendChild(maxEl);
        detailPanel.appendChild(titleRow);
        // Zoomed SVG of the region
        const zoomWrap = document.createElement('div');
        zoomWrap.style.cssText = 'display:flex;justify-content:center;margin:8px 0;';
        if (region.paths.length > 0) {
            const zoomSvg = document.createElementNS(SVG_NS, 'svg');
            zoomSvg.setAttribute('width', '140');
            zoomSvg.setAttribute('height', '120');
            zoomSvg.style.cssText = 'pointer-events:none;';
            for (const d of region.paths) {
                const path = createSvgPath(d);
                const bp = burnState[regionId];
                const op = bp > 0 ? 0.3 + (bp / 100) * 0.5 : 0;
                path.setAttribute('fill', bp > 0 ? `rgba(255, 120, 0, ${op})` : 'var(--color-surface)');
                path.setAttribute('stroke', bp > 0 ? BURN_STROKE : '#888');
                path.setAttribute('stroke-width', '2');
                path.setAttribute('stroke-linejoin', 'round');
                zoomSvg.appendChild(path);
            }
            zoomWrap.appendChild(zoomSvg);
            detailPanel.appendChild(zoomWrap);
            // Set viewBox to bounding box after rendering
            requestAnimationFrame(() => {
                const paths = zoomSvg.querySelectorAll('path');
                if (paths.length > 0) {
                    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                    paths.forEach(p => {
                        const bbox = p.getBBox();
                        minX = Math.min(minX, bbox.x);
                        minY = Math.min(minY, bbox.y);
                        maxX = Math.max(maxX, bbox.x + bbox.width);
                        maxY = Math.max(maxY, bbox.y + bbox.height);
                    });
                    const pad = 6;
                    zoomSvg.setAttribute('viewBox', `${minX - pad} ${minY - pad} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`);
                }
            });
        }
        // Slider
        const currentPct = burnState[regionId];
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '100';
        slider.step = '5';
        slider.value = String(currentPct);
        slider.className = 'tbsa-slider';
        slider.style.background = sliderGradient(currentPct);
        // Value display
        const valueEl = document.createElement('div');
        valueEl.style.cssText = 'text-align:center;font-size:18px;font-weight:600;color:var(--color-text);margin-top:4px;';
        const contribution = Math.round(region.pct * currentPct / 100 * 10) / 10;
        valueEl.textContent = currentPct > 0 ? `${currentPct}% burned = ${contribution}% TBSA` : 'No burn';
        // Quick-set buttons row
        const quickRow = document.createElement('div');
        quickRow.style.cssText = 'display:flex;gap:6px;margin-top:10px;justify-content:center;flex-wrap:wrap;';
        for (const qv of [0, 25, 50, 75, 100]) {
            const qBtn = document.createElement('button');
            qBtn.style.cssText = `padding:8px 14px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;min-height:38px;border:1px solid ${qv === currentPct ? '#FF7800' : '#555'};background:${qv === currentPct ? 'rgba(255,120,0,0.2)' : 'var(--color-surface)'};color:${qv === currentPct ? '#FF7800' : 'var(--color-text-muted)'};`;
            qBtn.textContent = qv === 0 ? 'None' : `${qv}%`;
            qBtn.addEventListener('click', () => {
                slider.value = String(qv);
                slider.dispatchEvent(new Event('input'));
            });
            quickRow.appendChild(qBtn);
        }
        slider.addEventListener('input', () => {
            const val = parseInt(slider.value, 10);
            burnState[regionId] = val;
            slider.style.background = sliderGradient(val);
            const contrib = Math.round(region.pct * val / 100 * 10) / 10;
            valueEl.textContent = val > 0 ? `${val}% burned = ${contrib}% TBSA` : 'No burn';
            // Update zoomed SVG fill
            zoomWrap.querySelectorAll('path').forEach(p => {
                const op = val > 0 ? 0.3 + (val / 100) * 0.5 : 0;
                p.setAttribute('fill', val > 0 ? `rgba(255, 120, 0, ${op})` : 'var(--color-surface)');
                p.setAttribute('stroke', val > 0 ? BURN_STROKE : '#888');
            });
            // Update quick-set button highlights
            quickRow.querySelectorAll('button').forEach((b, i) => {
                const qv = [0, 25, 50, 75, 100][i];
                b.style.borderColor = qv === val ? '#FF7800' : '#555';
                b.style.background = qv === val ? 'rgba(255,120,0,0.2)' : 'var(--color-surface)';
                b.style.color = qv === val ? '#FF7800' : 'var(--color-text-muted)';
            });
            updateRegionFill(regionId);
            recalc();
        });
        detailPanel.appendChild(slider);
        detailPanel.appendChild(valueEl);
        detailPanel.appendChild(quickRow);
        // Scroll detail into view
        requestAnimationFrame(() => {
            detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    function sliderGradient(val) {
        return `linear-gradient(to right, #FF7800 0%, #FF7800 ${val}%, #333 ${val}%, #333 100%)`;
    }
    function recalc() {
        let total = 0;
        const vals = {};
        for (const r of allRegions) {
            const contribution = Math.round(r.pct * burnState[r.id] / 100 * 10) / 10;
            vals[r.id] = contribution;
            total += contribution;
        }
        total = Math.round(total * 10) / 10;
        vals['__tbsa'] = total;
        totalEl.textContent = `TBSA: ${total}%`;
        onUpdate(vals);
    }
    // --- Build and append SVGs ---
    const frontSvg = buildSilhouette(frontRegions, 'FRONT');
    const backSvg = buildSilhouette(backRegions, 'BACK');
    svgWrap.appendChild(frontSvg);
    svgWrap.appendChild(backSvg);
    container.appendChild(svgWrap);
    // Perineum button
    if (perineum) {
        const periWrap = document.createElement('div');
        periWrap.style.cssText = 'display:flex;justify-content:center;margin-bottom:10px;';
        const periBtn = document.createElement('button');
        periBtn.style.cssText = 'padding:10px 20px;border-radius:8px;background:var(--color-surface);color:var(--color-text);border:1px solid #555;font-size:13px;cursor:pointer;min-height:44px;';
        periBtn.textContent = `Perineum (${perineum.pct}%)`;
        periBtn.setAttribute('data-perineum-btn', '');
        periBtn.addEventListener('click', () => selectRegion(perineum.id));
        periWrap.appendChild(periBtn);
        container.appendChild(periWrap);
    }
    // Detail panel below SVGs
    container.appendChild(detailPanel);
    // Legend
    const legendEl = document.createElement('div');
    legendEl.style.cssText = 'display:flex;gap:16px;justify-content:center;font-size:12px;color:var(--color-text-muted);margin-bottom:8px;';
    legendEl.innerHTML = '<span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:rgba(255,120,0,0.75);border:1px solid #FF7800;"></span>Burned (2nd\u00B0/3rd\u00B0)</span>';
    container.appendChild(legendEl);
    clearBtn.addEventListener('click', () => {
        for (const r of allRegions) {
            burnState[r.id] = 0;
            updateRegionFill(r.id);
        }
        selectedRegionId = null;
        detailPanel.style.display = 'none';
        recalc();
    });
    // Position percentage labels after SVG is in DOM
    requestAnimationFrame(() => {
        [frontSvg, backSvg].forEach(svg => {
            svg.querySelectorAll('g[data-region]').forEach(g => {
                const paths = g.querySelectorAll('path');
                const textEl = g.querySelector('text');
                if (paths.length > 0 && textEl) {
                    const bbox = paths[0].getBBox();
                    textEl.setAttribute('x', String(bbox.x + bbox.width / 2));
                    textEl.setAttribute('y', String(bbox.y + bbox.height / 2 + 3));
                }
            });
        });
    });
}
// -------------------------------------------------------------------
// TBSA Adult — Rule of 9's (Slider)
// -------------------------------------------------------------------
// Arms merged into single regions (4.5% each side)
const ADULT_FRONT_REGIONS = [
    { id: 'head-front', label: 'Head (front)', pct: 4.5, paths: [
            'M65,4 C52,4 43,12 43,23 C43,33 50,40 58,42 L58,48 L72,48 L72,42 C80,40 87,33 87,23 C87,12 78,4 65,4 Z'
        ] },
    { id: 'chest', label: 'Chest', pct: 9, paths: [
            'M42,54 C42,50 50,48 58,48 L72,48 C80,48 88,50 88,54 L90,98 L40,98 Z'
        ] },
    { id: 'abdomen', label: 'Abdomen', pct: 9, paths: [
            'M40,100 L90,100 L86,168 L44,168 Z'
        ] },
    { id: 'left-arm-front', label: 'L Arm (front)', pct: 4.5, paths: [
            'M38,52 L20,58 C18,59 16,60 16,62 L16,96 C16,98 17,100 19,100 L38,100 Z',
            'M19,102 L38,102 L34,156 C34,158 32,160 30,160 L8,154 C6,153 5,151 5,149 Z',
        ] },
    { id: 'right-arm-front', label: 'R Arm (front)', pct: 4.5, paths: [
            'M92,52 L110,58 C112,59 114,60 114,62 L114,96 C114,98 113,100 111,100 L92,100 Z',
            'M92,102 L111,102 L125,149 C125,151 124,153 122,154 L100,160 C98,160 96,158 96,156 Z',
        ] },
    { id: 'left-thigh-front', label: 'L Thigh', pct: 4.5, paths: [
            'M44,170 L63,170 C63,170 62,200 61,220 L60,238 L46,238 C46,238 45,210 44,170 Z'
        ] },
    { id: 'left-lower-leg-front', label: 'L Lower Leg/Foot', pct: 4.5, paths: [
            'M46,240 L60,240 L58,288 C58,292 56,296 54,298 L50,298 C48,296 47,292 47,288 Z'
        ] },
    { id: 'right-thigh-front', label: 'R Thigh', pct: 4.5, paths: [
            'M67,170 L86,170 C86,170 85,210 84,238 L70,238 C69,220 68,200 67,170 Z'
        ] },
    { id: 'right-lower-leg-front', label: 'R Lower Leg/Foot', pct: 4.5, paths: [
            'M70,240 L84,240 L83,288 C83,292 82,296 80,298 L76,298 C74,296 72,292 72,288 Z'
        ] },
];
const ADULT_BACK_REGIONS = [
    { id: 'head-back', label: 'Head (back)', pct: 4.5, paths: [
            'M65,4 C52,4 43,12 43,23 C43,33 50,40 58,42 L58,48 L72,48 L72,42 C80,40 87,33 87,23 C87,12 78,4 65,4 Z'
        ] },
    { id: 'upper-back', label: 'Upper Back', pct: 9, paths: [
            'M42,54 C42,50 50,48 58,48 L72,48 C80,48 88,50 88,54 L90,98 L40,98 Z'
        ] },
    { id: 'lower-back', label: 'Lower Back/Buttocks', pct: 9, paths: [
            'M40,100 L90,100 L86,168 L44,168 Z'
        ] },
    { id: 'left-arm-back', label: 'L Arm (back)', pct: 4.5, paths: [
            'M38,52 L20,58 C18,59 16,60 16,62 L16,96 C16,98 17,100 19,100 L38,100 Z',
            'M19,102 L38,102 L34,156 C34,158 32,160 30,160 L8,154 C6,153 5,151 5,149 Z',
        ] },
    { id: 'right-arm-back', label: 'R Arm (back)', pct: 4.5, paths: [
            'M92,52 L110,58 C112,59 114,60 114,62 L114,96 C114,98 113,100 111,100 L92,100 Z',
            'M92,102 L111,102 L125,149 C125,151 124,153 122,154 L100,160 C98,160 96,158 96,156 Z',
        ] },
    { id: 'left-thigh-back', label: 'L Thigh (back)', pct: 4.5, paths: [
            'M44,170 L63,170 C63,170 62,200 61,220 L60,238 L46,238 C46,238 45,210 44,170 Z'
        ] },
    { id: 'left-lower-leg-back', label: 'L Lower Leg/Foot (back)', pct: 4.5, paths: [
            'M46,240 L60,240 L58,288 C58,292 56,296 54,298 L50,298 C48,296 47,292 47,288 Z'
        ] },
    { id: 'right-thigh-back', label: 'R Thigh (back)', pct: 4.5, paths: [
            'M67,170 L86,170 C86,170 85,210 84,238 L70,238 C69,220 68,200 67,170 Z'
        ] },
    { id: 'right-lower-leg-back', label: 'R Lower Leg/Foot (back)', pct: 4.5, paths: [
            'M70,240 L84,240 L83,288 C83,292 82,296 80,298 L76,298 C74,296 72,292 72,288 Z'
        ] },
];
const ADULT_PERINEUM = { id: 'perineum', label: 'Perineum', pct: 1, paths: [] };
function tbsaComputeResult(values, isPeds) {
    const tbsa = values['__tbsa'] || 0;
    if (tbsa === 0) {
        return { value: '0%', label: 'No Burn Selected', description: 'Tap a body region and use the slider to set burn percentage.', colorVar: '--color-text-muted' };
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
    description: 'Interactive body diagram for estimating burn TBSA in adults using the Rule of 9s. Tap a region, then slide to set the percentage burned.',
    fields: [],
    results: [],
    thresholdNote: 'ABA Burn Center referral criteria: partial thickness >10% TBSA, full thickness any size, burns to face/hands/feet/genitalia/perineum/major joints, electrical/chemical/inhalation, circumferential burns.',
    citations: [
        'Wallace AB. The Exposure Treatment of Burns. Lancet. 1951;1(6653):501-504.',
        'American Burn Association. Burn Center Referral Criteria. 2006.',
    ],
    computeResult: (values) => tbsaComputeResult(values, false),
    customRender: (container, onUpdate) => {
        buildSliderDiagram(container, ADULT_FRONT_REGIONS, ADULT_BACK_REGIONS, ADULT_PERINEUM, onUpdate);
    },
};
const LUND_BROWDER_AGES = [
    { label: '0-1 year', headHalf: 9.5, thighHalf: 2.75, lowerLegHalf: 2.5 },
    { label: '1-4 years', headHalf: 8.5, thighHalf: 3.25, lowerLegHalf: 2.5 },
    { label: '5-9 years', headHalf: 6.5, thighHalf: 4, lowerLegHalf: 2.75 },
    { label: '10-14 years', headHalf: 5.5, thighHalf: 4.25, lowerLegHalf: 3 },
    { label: '>14 years', headHalf: 3.5, thighHalf: 4.75, lowerLegHalf: 3.5 },
];
const LB_NECK = 1;
const LB_TRUNK_ANT = 13;
const LB_TRUNK_POST = 13;
const LB_ARM = 4; // Upper arm (2) + forearm (1.5) + hand (0.5) combined
const LB_BUTTOCK = 2.5;
const LB_FOOT = 1.75;
const LB_PERINEUM = 1;
function buildPedsRegions(ageIdx) {
    const age = LUND_BROWDER_AGES[ageIdx];
    const front = [
        { id: 'head-front', label: 'Head (front)', pct: age.headHalf, paths: [
                'M65,4 C50,4 40,14 40,28 C40,40 48,50 58,52 L58,56 L72,56 L72,52 C82,50 90,40 90,28 C90,14 80,4 65,4 Z'
            ] },
        { id: 'neck-front', label: 'Neck (front)', pct: LB_NECK, paths: [
                'M56,57 L74,57 L74,64 L56,64 Z'
            ] },
        { id: 'trunk-ant', label: 'Trunk (anterior)', pct: LB_TRUNK_ANT, paths: [
                'M38,66 C38,64 48,62 56,62 L74,62 C82,62 92,64 92,66 L90,130 L40,130 Z'
            ] },
        { id: 'left-arm-front', label: 'L Arm (front)', pct: LB_ARM, paths: [
                'M36,66 L20,70 C18,71 16,72 16,74 L16,100 L34,100 Z',
                'M16,102 L34,102 L30,132 L12,128 Z',
                'M10,130 L30,134 L26,148 C26,150 24,152 22,152 L8,148 C6,147 5,145 5,143 Z',
            ] },
        { id: 'right-arm-front', label: 'R Arm (front)', pct: LB_ARM, paths: [
                'M94,66 L110,70 C112,71 114,72 114,74 L114,100 L96,100 Z',
                'M96,102 L114,102 L118,128 L100,132 Z',
                'M100,134 L120,130 L125,143 C125,145 124,147 122,148 L108,152 C106,152 104,150 104,148 Z',
            ] },
        { id: 'left-thigh-front', label: 'L Thigh', pct: age.thighHalf, paths: [
                'M40,132 L62,132 L60,210 L42,210 Z'
            ] },
        { id: 'left-lower-leg-front', label: 'L Lower Leg', pct: age.lowerLegHalf, paths: [
                'M42,212 L60,212 L58,272 L44,272 Z'
            ] },
        { id: 'left-foot-front', label: 'L Foot', pct: LB_FOOT, paths: [
                'M43,274 L59,274 L58,290 C58,293 56,296 53,296 L48,296 C46,296 44,293 44,290 Z'
            ] },
        { id: 'right-thigh-front', label: 'R Thigh', pct: age.thighHalf, paths: [
                'M68,132 L90,132 L88,210 L70,210 Z'
            ] },
        { id: 'right-lower-leg-front', label: 'R Lower Leg', pct: age.lowerLegHalf, paths: [
                'M70,212 L88,212 L86,272 L72,272 Z'
            ] },
        { id: 'right-foot-front', label: 'R Foot', pct: LB_FOOT, paths: [
                'M71,274 L87,274 L86,290 C86,293 84,296 82,296 L77,296 C74,296 72,293 72,290 Z'
            ] },
    ];
    const back = [
        { id: 'head-back', label: 'Head (back)', pct: age.headHalf, paths: [
                'M65,4 C50,4 40,14 40,28 C40,40 48,50 58,52 L58,56 L72,56 L72,52 C82,50 90,40 90,28 C90,14 80,4 65,4 Z'
            ] },
        { id: 'neck-back', label: 'Neck (back)', pct: LB_NECK, paths: [
                'M56,57 L74,57 L74,64 L56,64 Z'
            ] },
        { id: 'trunk-post', label: 'Trunk (posterior)', pct: LB_TRUNK_POST, paths: [
                'M38,66 C38,64 48,62 56,62 L74,62 C82,62 92,64 92,66 L90,116 L40,116 Z'
            ] },
        { id: 'left-buttock', label: 'L Buttock', pct: LB_BUTTOCK, paths: [
                'M40,118 L64,118 L62,130 L40,130 Z'
            ] },
        { id: 'right-buttock', label: 'R Buttock', pct: LB_BUTTOCK, paths: [
                'M66,118 L90,118 L90,130 L68,130 Z'
            ] },
        { id: 'left-arm-back', label: 'L Arm (back)', pct: LB_ARM, paths: [
                'M36,66 L20,70 C18,71 16,72 16,74 L16,100 L34,100 Z',
                'M16,102 L34,102 L30,132 L12,128 Z',
                'M10,130 L30,134 L26,148 C26,150 24,152 22,152 L8,148 C6,147 5,145 5,143 Z',
            ] },
        { id: 'right-arm-back', label: 'R Arm (back)', pct: LB_ARM, paths: [
                'M94,66 L110,70 C112,71 114,72 114,74 L114,100 L96,100 Z',
                'M96,102 L114,102 L118,128 L100,132 Z',
                'M100,134 L120,130 L125,143 C125,145 124,147 122,148 L108,152 C106,152 104,150 104,148 Z',
            ] },
        { id: 'left-thigh-back', label: 'L Thigh (back)', pct: age.thighHalf, paths: [
                'M40,132 L62,132 L60,210 L42,210 Z'
            ] },
        { id: 'left-lower-leg-back', label: 'L Lower Leg (back)', pct: age.lowerLegHalf, paths: [
                'M42,212 L60,212 L58,272 L44,272 Z'
            ] },
        { id: 'left-foot-back', label: 'L Foot (back)', pct: LB_FOOT, paths: [
                'M43,274 L59,274 L58,290 C58,293 56,296 53,296 L48,296 C46,296 44,293 44,290 Z'
            ] },
        { id: 'right-thigh-back', label: 'R Thigh (back)', pct: age.thighHalf, paths: [
                'M68,132 L90,132 L88,210 L70,210 Z'
            ] },
        { id: 'right-lower-leg-back', label: 'R Lower Leg (back)', pct: age.lowerLegHalf, paths: [
                'M70,212 L88,212 L86,272 L72,272 Z'
            ] },
        { id: 'right-foot-back', label: 'R Foot (back)', pct: LB_FOOT, paths: [
                'M71,274 L87,274 L86,290 C86,293 84,296 82,296 L77,296 C74,296 72,293 72,290 Z'
            ] },
    ];
    const perineum = { id: 'perineum', label: 'Perineum', pct: LB_PERINEUM, paths: [] };
    return { front, back, perineum };
}
const TBSA_PEDS_CALCULATOR = {
    id: 'tbsa-peds',
    title: 'TBSA \u2014 Lund-Browder',
    subtitle: 'Pediatric Total Body Surface Area',
    description: 'Age-adjusted Lund-Browder chart for pediatric burn TBSA. Tap a region, then slide to set burn percentage.',
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
        const ageRow = document.createElement('div');
        ageRow.style.cssText = 'margin-bottom:12px;';
        const ageLabel = document.createElement('label');
        ageLabel.style.cssText = 'font-size:14px;font-weight:600;color:var(--color-text);display:block;margin-bottom:6px;';
        ageLabel.textContent = 'Patient Age Group';
        ageRow.appendChild(ageLabel);
        const ageSelect = document.createElement('select');
        ageSelect.style.cssText = 'width:100%;padding:12px;border-radius:8px;background:var(--color-surface);color:var(--color-text);border:1px solid #666;font-size:16px;min-height:44px;';
        for (let i = 0; i < LUND_BROWDER_AGES.length; i++) {
            const opt = document.createElement('option');
            opt.value = String(i);
            opt.textContent = LUND_BROWDER_AGES[i].label;
            ageSelect.appendChild(opt);
        }
        ageRow.appendChild(ageSelect);
        container.appendChild(ageRow);
        const diagramContainer = document.createElement('div');
        container.appendChild(diagramContainer);
        function buildDiagram() {
            diagramContainer.innerHTML = '';
            const regions = buildPedsRegions(currentAgeIdx);
            buildSliderDiagram(diagramContainer, regions.front, regions.back, regions.perineum, onUpdate);
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
