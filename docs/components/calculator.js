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
const BURN_COLOR = '#FF7800';
const BODY_FILL = '#ffffff';
const BODY_STROKE = '#333333';
// Human body silhouette - Adult FRONT view
// FULLY CONTINUOUS path - traces entire body outline without lifting pen
// Start at top of head, go left around entire body, back to start
// Viewbox: 0 0 100 280
const ADULT_BODY_FRONT_PATH = `
M 50 5
C 42 5, 36 11, 36 20
C 36 29, 40 35, 45 38
L 45 42
C 38 44, 30 50, 26 62
C 22 74, 18 90, 16 108
C 14 126, 14 140, 18 150
L 20 156
L 20 195
L 18 230
C 18 248, 22 260, 30 266
L 40 268
L 42 240
L 44 200
L 46 178
L 46 200
L 46 252
C 46 262, 48 270, 50 270
C 52 270, 54 262, 54 252
L 54 200
L 54 178
L 56 200
L 58 240
L 60 268
L 70 266
C 78 260, 82 248, 82 230
L 80 195
L 80 156
L 82 150
C 86 140, 86 126, 84 108
C 82 90, 78 74, 74 62
C 70 50, 62 44, 55 42
L 55 38
C 60 35, 64 29, 64 20
C 64 11, 58 5, 50 5
Z
`;
// Adult BACK view (same silhouette)
const ADULT_BODY_BACK_PATH = ADULT_BODY_FRONT_PATH;
// Human body silhouette - Pediatric FRONT view
// Larger head, shorter body proportions
// Viewbox: 0 0 100 280
const PEDS_BODY_FRONT_PATH = `
M 50 4
C 40 4, 32 12, 32 24
C 32 36, 38 44, 45 48
L 45 54
C 36 56, 28 64, 24 78
C 20 92, 16 110, 14 130
C 12 150, 12 166, 16 178
L 18 186
L 18 220
L 16 252
C 16 266, 22 276, 32 280
L 42 280
L 44 252
L 46 215
L 47 192
L 47 215
L 47 260
C 47 270, 48 276, 50 276
C 52 276, 53 270, 53 260
L 53 215
L 53 192
L 54 215
L 56 252
L 58 280
L 68 280
C 78 276, 84 266, 84 252
L 82 220
L 82 186
L 84 178
C 88 166, 88 150, 86 130
C 84 110, 80 92, 76 78
C 72 64, 64 56, 55 54
L 55 48
C 62 44, 68 36, 68 24
C 68 12, 60 4, 50 4
Z
`;
const PEDS_BODY_BACK_PATH = PEDS_BODY_FRONT_PATH;
function buildEburnPainter(container, frontRegions, backRegions, perineum, onUpdate, calculatorType = 'adult') {
    // Canvas sized to fit on mobile without scrolling
    // Body paths use 100x280 viewbox (both adult and peds)
    const CANVAS_WIDTH = 220;
    const CANVAS_HEIGHT = 280;
    const SVG_VIEWBOX_WIDTH = 100;
    const SVG_VIEWBOX_HEIGHT = 280;
    const SCALE_X = CANVAS_WIDTH / SVG_VIEWBOX_WIDTH;
    const SCALE_Y = CANVAS_HEIGHT / SVG_VIEWBOX_HEIGHT;
    // Use anatomical body paths
    const frontBodyPath = calculatorType === 'peds' ? PEDS_BODY_FRONT_PATH : ADULT_BODY_FRONT_PATH;
    const backBodyPath = calculatorType === 'peds' ? PEDS_BODY_BACK_PATH : ADULT_BODY_BACK_PATH;
    // Collect all regions for perineum tracking
    const allRegions = [...frontRegions, ...backRegions];
    if (perineum)
        allRegions.push(perineum);
    // State
    const state = {
        frontCanvas: document.createElement('canvas'),
        backCanvas: document.createElement('canvas'),
        frontMask: document.createElement('canvas'),
        backMask: document.createElement('canvas'),
        frontCtx: null,
        backCtx: null,
        frontMaskCtx: null,
        backMaskCtx: null,
        isDrawing: false,
        isErasing: false,
        brushSize: 28,
        lastX: 0,
        lastY: 0,
        perineumPct: 0,
        showingFront: true,
    };
    // Initialize canvases
    [state.frontCanvas, state.backCanvas, state.frontMask, state.backMask].forEach(c => {
        c.width = CANVAS_WIDTH;
        c.height = CANVAS_HEIGHT;
    });
    state.frontCtx = state.frontCanvas.getContext('2d', { willReadFrequently: true });
    state.backCtx = state.backCanvas.getContext('2d', { willReadFrequently: true });
    state.frontMaskCtx = state.frontMask.getContext('2d');
    state.backMaskCtx = state.backMask.getContext('2d');
    // --- Calculator switcher (Adult / Peds) ---
    const switcherWrap = document.createElement('div');
    switcherWrap.style.cssText = 'display:flex;gap:8px;justify-content:center;margin-bottom:12px;';
    const adultLink = document.createElement('a');
    adultLink.href = '#/calculator/tbsa-adult';
    adultLink.style.cssText = `padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;min-height:48px;display:flex;align-items:center;justify-content:center;${calculatorType === 'adult' ? 'background:#FF7800;color:#fff;border:2px solid #FF7800;' : 'background:var(--color-surface);color:var(--color-text);border:2px solid #666;'}`;
    adultLink.textContent = 'Adult';
    const pedsLink = document.createElement('a');
    pedsLink.href = '#/calculator/tbsa-peds';
    pedsLink.style.cssText = `padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;min-height:48px;display:flex;align-items:center;justify-content:center;${calculatorType === 'peds' ? 'background:#FF7800;color:#fff;border:2px solid #FF7800;' : 'background:var(--color-surface);color:var(--color-text);border:2px solid #666;'}`;
    pedsLink.textContent = 'Pediatric';
    switcherWrap.appendChild(adultLink);
    switcherWrap.appendChild(pedsLink);
    container.appendChild(switcherWrap);
    // --- Large TBSA display ---
    const totalWrap = document.createElement('div');
    totalWrap.style.cssText = 'text-align:center;margin-bottom:8px;';
    const totalEl = document.createElement('div');
    totalEl.style.cssText = 'font-size:56px;font-weight:800;color:var(--color-text-muted);line-height:1;';
    totalEl.textContent = '0%';
    const totalLabel = document.createElement('div');
    totalLabel.style.cssText = 'font-size:14px;color:var(--color-text-muted);margin-top:2px;';
    totalLabel.textContent = 'TBSA';
    totalWrap.appendChild(totalEl);
    totalWrap.appendChild(totalLabel);
    container.appendChild(totalWrap);
    // --- Toolbar: Flip + Draw/Erase + Reset ---
    const toolbarWrap = document.createElement('div');
    toolbarWrap.style.cssText = 'display:flex;gap:6px;justify-content:center;margin-bottom:8px;flex-wrap:wrap;';
    // Flip button
    const flipBtn = document.createElement('button');
    flipBtn.style.cssText = 'padding:10px 16px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;min-height:48px;display:flex;align-items:center;gap:6px;border:2px solid #666;background:var(--color-surface);color:var(--color-text);';
    flipBtn.innerHTML = '↻ Flip';
    const drawBtn = document.createElement('button');
    drawBtn.style.cssText = 'padding:10px 16px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;min-height:48px;display:flex;align-items:center;gap:6px;border:2px solid #FF7800;background:#FF7800;color:#fff;';
    drawBtn.innerHTML = '✏️ Draw';
    const eraseBtn = document.createElement('button');
    eraseBtn.style.cssText = 'padding:10px 16px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;min-height:48px;display:flex;align-items:center;gap:6px;border:2px solid #666;background:var(--color-surface);color:var(--color-text);';
    eraseBtn.innerHTML = '🧹 Erase';
    const resetBtn = document.createElement('button');
    resetBtn.style.cssText = 'padding:10px 16px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;min-height:48px;display:flex;align-items:center;gap:6px;border:2px solid #666;background:var(--color-surface);color:var(--color-text);';
    resetBtn.innerHTML = 'Reset';
    function setMode(erasing) {
        state.isErasing = erasing;
        if (erasing) {
            eraseBtn.style.background = '#666';
            eraseBtn.style.borderColor = '#888';
            eraseBtn.style.color = '#fff';
            drawBtn.style.background = 'var(--color-surface)';
            drawBtn.style.borderColor = '#666';
            drawBtn.style.color = 'var(--color-text)';
        }
        else {
            drawBtn.style.background = '#FF7800';
            drawBtn.style.borderColor = '#FF7800';
            drawBtn.style.color = '#fff';
            eraseBtn.style.background = 'var(--color-surface)';
            eraseBtn.style.borderColor = '#666';
            eraseBtn.style.color = 'var(--color-text)';
        }
    }
    drawBtn.addEventListener('click', () => setMode(false));
    eraseBtn.addEventListener('click', () => setMode(true));
    toolbarWrap.appendChild(flipBtn);
    toolbarWrap.appendChild(drawBtn);
    toolbarWrap.appendChild(eraseBtn);
    toolbarWrap.appendChild(resetBtn);
    container.appendChild(toolbarWrap);
    // --- Brush size slider ---
    const brushWrap = document.createElement('div');
    brushWrap.style.cssText = 'display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:8px;padding:0 16px;';
    const brushLabel = document.createElement('span');
    brushLabel.style.cssText = 'font-size:12px;color:var(--color-text-muted);white-space:nowrap;';
    brushLabel.textContent = 'Brush:';
    const brushSlider = document.createElement('input');
    brushSlider.type = 'range';
    brushSlider.min = '16';
    brushSlider.max = '60';
    brushSlider.value = '28';
    brushSlider.style.cssText = 'flex:1;max-width:150px;height:28px;';
    brushSlider.addEventListener('input', () => {
        state.brushSize = parseInt(brushSlider.value, 10);
    });
    const brushPreview = document.createElement('div');
    brushPreview.style.cssText = 'width:44px;height:44px;display:flex;align-items:center;justify-content:center;';
    const brushDot = document.createElement('div');
    brushDot.style.cssText = `width:28px;height:28px;border-radius:50%;background:${BURN_COLOR};`;
    brushPreview.appendChild(brushDot);
    brushSlider.addEventListener('input', () => {
        const size = Math.min(44, parseInt(brushSlider.value, 10));
        brushDot.style.width = `${size}px`;
        brushDot.style.height = `${size}px`;
    });
    brushWrap.appendChild(brushLabel);
    brushWrap.appendChild(brushSlider);
    brushWrap.appendChild(brushPreview);
    container.appendChild(brushWrap);
    // --- View label (FRONT / BACK) ---
    const viewLabel = document.createElement('div');
    viewLabel.style.cssText = 'text-align:center;font-size:14px;font-weight:700;color:var(--color-text);margin-bottom:4px;letter-spacing:1px;';
    viewLabel.textContent = 'FRONT';
    container.appendChild(viewLabel);
    // --- Single Canvas container ---
    const canvasWrap = document.createElement('div');
    canvasWrap.style.cssText = 'display:flex;justify-content:center;margin-bottom:10px;';
    const canvasContainer = document.createElement('div');
    canvasContainer.style.cssText = 'position:relative;touch-action:none;background:#1a1a1a;border-radius:12px;padding:8px;';
    // Style canvases
    state.frontCanvas.style.cssText = 'touch-action:none;user-select:none;-webkit-user-select:none;border-radius:8px;display:block;max-width:100%;';
    state.backCanvas.style.cssText = 'touch-action:none;user-select:none;-webkit-user-select:none;border-radius:8px;display:none;max-width:100%;';
    canvasContainer.appendChild(state.frontCanvas);
    canvasContainer.appendChild(state.backCanvas);
    canvasWrap.appendChild(canvasContainer);
    container.appendChild(canvasWrap);
    // Create body mask from single path
    function createBodyMaskFromPath(ctx, pathStr) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = '#000';
        ctx.save();
        ctx.scale(SCALE_X, SCALE_Y);
        const path = new Path2D(pathStr);
        ctx.fill(path);
        ctx.restore();
    }
    // Draw body outline on canvas with anatomical appearance
    function drawBodyOutlineFromPath(ctx, pathStr) {
        ctx.save();
        ctx.scale(SCALE_X, SCALE_Y);
        // Fill with light color
        ctx.fillStyle = BODY_FILL;
        const path = new Path2D(pathStr);
        ctx.fill(path);
        // Clean dark stroke outline (like E-burn)
        ctx.strokeStyle = BODY_STROKE;
        ctx.lineWidth = 1 / SCALE_X;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke(path);
        ctx.restore();
    }
    // Zone labels will be shown as HTML below the canvas instead of on the canvas
    // This avoids issues with text visibility on white body fill
    function drawZoneLabels(_ctx, _isFront) {
        // Intentionally empty - labels shown via HTML legend below
    }
    // Create masks
    createBodyMaskFromPath(state.frontMaskCtx, frontBodyPath);
    createBodyMaskFromPath(state.backMaskCtx, backBodyPath);
    // Draw initial body outlines with zone labels
    drawBodyOutlineFromPath(state.frontCtx, frontBodyPath);
    drawZoneLabels(state.frontCtx, true);
    drawBodyOutlineFromPath(state.backCtx, backBodyPath);
    drawZoneLabels(state.backCtx, false);
    // Flip handler
    function flipView() {
        state.showingFront = !state.showingFront;
        if (state.showingFront) {
            state.frontCanvas.style.display = 'block';
            state.backCanvas.style.display = 'none';
            viewLabel.textContent = 'FRONT';
        }
        else {
            state.frontCanvas.style.display = 'none';
            state.backCanvas.style.display = 'block';
            viewLabel.textContent = 'BACK';
        }
    }
    flipBtn.addEventListener('click', flipView);
    // Paint function
    function paint(ctx, maskCtx, bodyPath, x, y, fromX, fromY) {
        const maskData = maskCtx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
        // Check if point is inside body mask
        const checkInBody = (px, py) => {
            const ix = Math.floor(px);
            const iy = Math.floor(py);
            if (ix < 0 || ix >= CANVAS_WIDTH || iy < 0 || iy >= CANVAS_HEIGHT)
                return false;
            const idx = (iy * CANVAS_WIDTH + ix) * 4;
            return maskData[idx] === 0; // Black pixels are inside body
        };
        ctx.save();
        if (state.isErasing) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0,0,0,1)';
        }
        else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = BURN_COLOR;
        }
        const radius = state.brushSize / 2;
        // Draw line from last point to current point
        if (fromX !== undefined && fromY !== undefined) {
            const dist = Math.sqrt((x - fromX) ** 2 + (y - fromY) ** 2);
            const steps = Math.max(1, Math.ceil(dist / (radius / 2)));
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const px = fromX + (x - fromX) * t;
                const py = fromY + (y - fromY) * t;
                if (checkInBody(px, py)) {
                    ctx.beginPath();
                    ctx.arc(px, py, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        else if (checkInBody(x, y)) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
        // Redraw body outline on top if erasing
        if (state.isErasing) {
            drawBodyOutlineFromPath(ctx, bodyPath);
            // Re-add zone labels after redraw
            const isFront = ctx === state.frontCtx;
            drawZoneLabels(ctx, isFront);
        }
    }
    // Count painted pixels
    function calculateTbsa() {
        const frontData = state.frontCtx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
        const backData = state.backCtx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
        const frontMaskData = state.frontMaskCtx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
        const backMaskData = state.backMaskCtx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
        let totalFrontBody = 0;
        let totalBackBody = 0;
        let paintedFront = 0;
        let paintedBack = 0;
        // Count pixels
        for (let i = 0; i < frontMaskData.length; i += 4) {
            // Front
            if (frontMaskData[i] === 0) {
                totalFrontBody++;
                const r = frontData[i];
                const g = frontData[i + 1];
                const b = frontData[i + 2];
                if (r > 200 && g > 80 && g < 160 && b < 50) {
                    paintedFront++;
                }
            }
            // Back
            if (backMaskData[i] === 0) {
                totalBackBody++;
                const r = backData[i];
                const g = backData[i + 1];
                const b = backData[i + 2];
                if (r > 200 && g > 80 && g < 160 && b < 50) {
                    paintedBack++;
                }
            }
        }
        // Front = ~50%, Back = ~49%, Perineum = ~1%
        const frontRegionTbsa = frontRegions.reduce((sum, r) => sum + r.pct, 0);
        const backRegionTbsa = backRegions.reduce((sum, r) => sum + r.pct, 0);
        const frontPct = totalFrontBody > 0 ? paintedFront / totalFrontBody : 0;
        const backPct = totalBackBody > 0 ? paintedBack / totalBackBody : 0;
        const tbsaFromFront = frontPct * frontRegionTbsa;
        const tbsaFromBack = backPct * backRegionTbsa;
        const perineumContrib = state.perineumPct > 0 && perineum ? (state.perineumPct / 100) * perineum.pct : 0;
        return Math.round((tbsaFromFront + tbsaFromBack + perineumContrib) * 10) / 10;
    }
    // Update display
    function updateTbsaDisplay() {
        const tbsa = calculateTbsa();
        totalEl.textContent = `${tbsa}%`;
        if (tbsa === 0) {
            totalEl.style.color = 'var(--color-text-muted)';
        }
        else if (tbsa < 10) {
            totalEl.style.color = 'var(--color-primary)';
        }
        else if (tbsa < 20) {
            totalEl.style.color = '#FF9800';
        }
        else if (tbsa < 40) {
            totalEl.style.color = '#FF7800';
        }
        else {
            totalEl.style.color = '#E53935';
        }
        onUpdate({ '__tbsa': tbsa });
    }
    // Touch/mouse event handlers
    function getCanvasPoint(e, canvas) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        if ('touches' in e) {
            const touch = e.touches[0] || e.changedTouches[0];
            return {
                x: (touch.clientX - rect.left) * scaleX,
                y: (touch.clientY - rect.top) * scaleY,
            };
        }
        else {
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY,
            };
        }
    }
    function setupCanvasEvents(canvas, ctx, maskCtx, bodyPath) {
        let activeCanvas = false;
        const startDraw = (e) => {
            e.preventDefault();
            state.isDrawing = true;
            activeCanvas = true;
            const pt = getCanvasPoint(e, canvas);
            state.lastX = pt.x;
            state.lastY = pt.y;
            paint(ctx, maskCtx, bodyPath, pt.x, pt.y);
            updateTbsaDisplay();
        };
        const moveDraw = (e) => {
            if (!state.isDrawing || !activeCanvas)
                return;
            e.preventDefault();
            const pt = getCanvasPoint(e, canvas);
            paint(ctx, maskCtx, bodyPath, pt.x, pt.y, state.lastX, state.lastY);
            state.lastX = pt.x;
            state.lastY = pt.y;
            updateTbsaDisplay();
        };
        const endDraw = () => {
            state.isDrawing = false;
            activeCanvas = false;
        };
        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', moveDraw);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mouseleave', endDraw);
        canvas.addEventListener('touchstart', startDraw, { passive: false });
        canvas.addEventListener('touchmove', moveDraw, { passive: false });
        canvas.addEventListener('touchend', endDraw);
        canvas.addEventListener('touchcancel', endDraw);
    }
    setupCanvasEvents(state.frontCanvas, state.frontCtx, state.frontMaskCtx, frontBodyPath);
    setupCanvasEvents(state.backCanvas, state.backCtx, state.backMaskCtx, backBodyPath);
    // Reset handler
    resetBtn.addEventListener('click', () => {
        state.frontCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        state.backCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawBodyOutlineFromPath(state.frontCtx, frontBodyPath);
        drawZoneLabels(state.frontCtx, true);
        drawBodyOutlineFromPath(state.backCtx, backBodyPath);
        drawZoneLabels(state.backCtx, false);
        state.perineumPct = 0;
        updateTbsaDisplay();
    });
    // --- Perineum toggle ---
    if (perineum) {
        const periWrap = document.createElement('div');
        periWrap.style.cssText = 'display:flex;justify-content:center;gap:8px;margin-bottom:10px;align-items:center;';
        const periLabel = document.createElement('span');
        periLabel.style.cssText = 'font-size:13px;color:var(--color-text);';
        periLabel.textContent = `Perineum (${perineum.pct}%):`;
        const periNone = document.createElement('button');
        periNone.style.cssText = 'padding:8px 14px;border-radius:6px;font-size:12px;cursor:pointer;min-height:40px;border:2px solid #FF7800;background:#FF7800;color:#fff;';
        periNone.textContent = 'None';
        const periHalf = document.createElement('button');
        periHalf.style.cssText = 'padding:8px 14px;border-radius:6px;font-size:12px;cursor:pointer;min-height:40px;border:2px solid #666;background:var(--color-surface);color:var(--color-text);';
        periHalf.textContent = 'Half';
        const periFull = document.createElement('button');
        periFull.style.cssText = 'padding:8px 14px;border-radius:6px;font-size:12px;cursor:pointer;min-height:40px;border:2px solid #666;background:var(--color-surface);color:var(--color-text);';
        periFull.textContent = 'Full';
        function updatePerineumBtns() {
            [periNone, periHalf, periFull].forEach(btn => {
                btn.style.background = 'var(--color-surface)';
                btn.style.borderColor = '#666';
                btn.style.color = 'var(--color-text)';
            });
            if (state.perineumPct === 0) {
                periNone.style.background = '#FF7800';
                periNone.style.borderColor = '#FF7800';
                periNone.style.color = '#fff';
            }
            else if (state.perineumPct === 50) {
                periHalf.style.background = 'rgba(255, 120, 0, 0.6)';
                periHalf.style.borderColor = '#FF7800';
                periHalf.style.color = '#fff';
            }
            else {
                periFull.style.background = '#FF7800';
                periFull.style.borderColor = '#FF7800';
                periFull.style.color = '#fff';
            }
        }
        periNone.addEventListener('click', () => { state.perineumPct = 0; updatePerineumBtns(); updateTbsaDisplay(); });
        periHalf.addEventListener('click', () => { state.perineumPct = 50; updatePerineumBtns(); updateTbsaDisplay(); });
        periFull.addEventListener('click', () => { state.perineumPct = 100; updatePerineumBtns(); updateTbsaDisplay(); });
        periWrap.appendChild(periLabel);
        periWrap.appendChild(periNone);
        periWrap.appendChild(periHalf);
        periWrap.appendChild(periFull);
        container.appendChild(periWrap);
    }
    // --- Rule of 9s Zone Legend ---
    const zoneLegend = document.createElement('div');
    zoneLegend.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:10px;padding:8px;background:rgba(50,50,50,0.8);border:1px solid #555;border-radius:8px;font-size:11px;';
    if (calculatorType === 'adult') {
        zoneLegend.innerHTML = `
      <div style="text-align:center;"><span style="font-weight:700;color:#FF7800;">9%</span><br><span style="color:var(--color-text-muted);">Head</span></div>
      <div style="text-align:center;"><span style="font-weight:700;color:#FF7800;">18%</span><br><span style="color:var(--color-text-muted);">Trunk (each side)</span></div>
      <div style="text-align:center;"><span style="font-weight:700;color:#FF7800;">9%</span><br><span style="color:var(--color-text-muted);">Each Arm</span></div>
      <div style="text-align:center;"><span style="font-weight:700;color:#FF7800;">18%</span><br><span style="color:var(--color-text-muted);">Each Leg</span></div>
      <div style="text-align:center;"><span style="font-weight:700;color:#FF7800;">1%</span><br><span style="color:var(--color-text-muted);">Perineum</span></div>
      <div style="text-align:center;"><span style="font-weight:700;color:var(--color-text-muted);">100%</span><br><span style="color:var(--color-text-muted);">Total</span></div>
    `;
    }
    else {
        // Pediatric percentages vary by age - simplified
        zoneLegend.innerHTML = `
      <div style="text-align:center;"><span style="font-weight:700;color:#FF7800;">18%</span><br><span style="color:var(--color-text-muted);">Head (infant)</span></div>
      <div style="text-align:center;"><span style="font-weight:700;color:#FF7800;">18%</span><br><span style="color:var(--color-text-muted);">Trunk (each side)</span></div>
      <div style="text-align:center;"><span style="font-weight:700;color:#FF7800;">9%</span><br><span style="color:var(--color-text-muted);">Each Arm</span></div>
      <div style="text-align:center;"><span style="font-weight:700;color:#FF7800;">14%</span><br><span style="color:var(--color-text-muted);">Each Leg (infant)</span></div>
      <div style="text-align:center;"><span style="font-weight:700;color:#FF7800;">1%</span><br><span style="color:var(--color-text-muted);">Perineum</span></div>
      <div style="text-align:center;color:var(--color-text-muted);font-size:10px;">Use Lund-Browder for age-adjusted %</div>
    `;
    }
    container.appendChild(zoneLegend);
    // --- Warning at bottom ---
    const warning = document.createElement('div');
    warning.style.cssText = 'font-size:11px;color:#FF9800;margin-top:8px;line-height:1.4;padding:6px 10px;background:rgba(255,152,0,0.1);border-radius:6px;text-align:center;';
    warning.textContent = '2nd/3rd degree burns only. Do NOT include superficial burns.';
    container.appendChild(warning);
}
// Alias for backward compatibility
function buildSliderDiagram(container, frontRegions, backRegions, perineum, onUpdate, calculatorType = 'adult') {
    buildEburnPainter(container, frontRegions, backRegions, perineum, onUpdate, calculatorType);
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
        return { value: '0%', label: 'No Burn Selected', description: 'Draw on the body to paint burn areas. Use the eraser to correct.', colorVar: '--color-text-muted' };
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
        buildSliderDiagram(container, ADULT_FRONT_REGIONS, ADULT_BACK_REGIONS, ADULT_PERINEUM, onUpdate, 'adult');
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
            buildSliderDiagram(diagramContainer, regions.front, regions.back, regions.perineum, onUpdate, 'peds');
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
