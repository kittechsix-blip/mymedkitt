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
// SFSR (San Francisco Syncope Rule) Calculator Definition
// -------------------------------------------------------------------
const SFSR_CALCULATOR = {
    id: 'sfsr',
    title: 'San Francisco Syncope Rule',
    subtitle: 'SFSR — 7-Day Serious Outcome Prediction',
    description: 'The San Francisco Syncope Rule is a binary screening tool: ANY one positive criterion indicates HIGH RISK for serious outcomes within 7 days. Originally reported 96% sensitive; external validation found sensitivity as low as 76%.',
    fields: [
        { name: 'chf', label: 'History of congestive heart failure', type: 'toggle', points: 1 },
        { name: 'hematocrit', label: 'Hematocrit < 30%', type: 'toggle', points: 1 },
        { name: 'ecg', label: 'Abnormal ECG', type: 'toggle', points: 1, description: 'New changes or non-sinus rhythm' },
        { name: 'sob', label: 'Complaint of shortness of breath', type: 'toggle', points: 1 },
        { name: 'sbp', label: 'Systolic BP < 90 mmHg at triage', type: 'toggle', points: 1 },
    ],
    results: [
        { min: -Infinity, max: 1, label: 'Score 0', risk: 'Low Risk', mortality: 'No high-risk criteria met. 7-day serious outcome risk: ~2%', colorVar: '--color-primary' },
        { min: 1, max: Infinity, label: 'Score ≥1', risk: 'High Risk', mortality: 'One or more criteria positive. Sensitivity 76–98% for 7-day serious outcomes. Consider admission or observation.', colorVar: '--color-danger' },
    ],
    thresholdNote: 'Any single positive criterion = HIGH RISK. Mnemonic: C-H-E-S-S (CHF, Hematocrit, ECG, Shortness of breath, Systolic BP). External validation found sensitivity 76–98%, specificity 52–62%.',
    citations: [
        'Quinn JV, et al. Derivation of the San Francisco Syncope Rule to Predict Patients with Short-Term Serious Outcomes. Ann Emerg Med. 2004;43(2):224-232.',
        'Sun BC, et al. External Validation of the San Francisco Syncope Rule. Ann Emerg Med. 2007;49(4):420-427.',
        'Saccilotto RT, et al. San Francisco Syncope Rule to Predict Short-Term Serious Outcomes: A Systematic Review. CMAJ. 2011;183(15):E1116-E1126.',
    ],
};
// -------------------------------------------------------------------
// CSRS (Canadian Syncope Risk Score) Calculator Definition
// -------------------------------------------------------------------
const CSRS_CALCULATOR = {
    id: 'csrs',
    title: 'Canadian Syncope Risk Score',
    subtitle: 'CSRS — 30-Day Serious Adverse Event Prediction',
    description: 'The Canadian Syncope Risk Score is a validated 9-variable tool that predicts 30-day serious adverse events after ED assessment of syncope. Validated in a multicenter study of 3,819 patients with AUC 0.91. Variables include clinical, ECG, and diagnostic predictors.',
    fields: [
        {
            name: 'vasovagal',
            label: 'Predisposition to vasovagal symptoms',
            type: 'select',
            points: 0,
            description: 'Triggered by prolonged standing, heat, emotion, pain, or medical procedure',
            selectOptions: [
                { label: 'No vasovagal predisposition', points: 0 },
                { label: 'Yes — vasovagal predisposition', points: -1 },
            ],
        },
        { name: 'heart-disease', label: 'Heart disease history or elevated BNP', type: 'toggle', points: 1, description: 'CAD, atrial fibrillation/flutter, CHF, or valvular heart disease; or elevated BNP/NT-proBNP' },
        {
            name: 'sbp-abnormal',
            label: 'Any ED systolic BP reading',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'SBP 90–180 mmHg (normal)', points: 0 },
                { label: 'SBP < 90 or > 180 mmHg', points: 2 },
            ],
        },
        { name: 'troponin', label: 'Elevated troponin (> 99th percentile)', type: 'toggle', points: 2 },
        { name: 'qrs-axis', label: 'Abnormal QRS axis', type: 'toggle', points: 1, description: '< −30° or > 100°' },
        { name: 'qrs-duration', label: 'QRS duration > 130 ms', type: 'toggle', points: 1 },
        { name: 'qtc', label: 'QTc > 480 ms', type: 'toggle', points: 2 },
        {
            name: 'ed-diagnosis',
            label: 'ED diagnosis',
            type: 'select',
            points: 0,
            description: 'Clinical impression after evaluation',
            selectOptions: [
                { label: 'Other / Unclear', points: 0 },
                { label: 'Vasovagal syncope', points: -2 },
                { label: 'Cardiac syncope', points: 2 },
            ],
        },
    ],
    results: [
        { min: -Infinity, max: -2, label: 'Very Low Risk', risk: 'Score ≤ −2', mortality: '30-day serious adverse event rate: 0.3%', colorVar: '--color-primary' },
        { min: -2, max: 1, label: 'Low Risk', risk: 'Score −1 to 0', mortality: '30-day serious adverse event rate: 0.7%', colorVar: '--color-primary' },
        { min: 1, max: 4, label: 'Medium Risk', risk: 'Score 1 to 3', mortality: '30-day serious adverse event rate: 4.7%', colorVar: '--color-warning' },
        { min: 4, max: 6, label: 'High Risk', risk: 'Score 4 to 5', mortality: '30-day serious adverse event rate: 12.7%', colorVar: '--color-danger' },
        { min: 6, max: Infinity, label: 'Very High Risk', risk: 'Score ≥ 6', mortality: '30-day serious adverse event rate: 51.3%', colorVar: '--color-danger' },
    ],
    thresholdNote: 'Score ≤ −2 is very low risk (0.3%). Score ≥ −1 is 97.8% sensitive for 30-day serious outcomes (sensitivity 97.8%, specificity 44.3%). Validated in 3,819 patients across 9 Canadian EDs (AUC 0.91).',
    citations: [
        'Thiruganasambandamoorthy V, et al. Development of the Canadian Syncope Risk Score to Predict Serious Adverse Events After ED Assessment of Syncope. CMAJ. 2016;188(12):E289-E298.',
        'Thiruganasambandamoorthy V, et al. Multicenter ED Validation of the Canadian Syncope Risk Score. JAMA Intern Med. 2020;180(5):737-744.',
    ],
};
// -------------------------------------------------------------------
// Sgarbossa Criteria Calculator Definition
// -------------------------------------------------------------------
const SGARBOSSA_CALCULATOR = {
    id: 'sgarbossa',
    title: 'Sgarbossa Criteria',
    subtitle: 'STEMI Diagnosis in LBBB / Paced Rhythm',
    description: 'The Sgarbossa criteria identify STEMI in the presence of LBBB or ventricular paced rhythm, where standard STEMI criteria cannot be applied. A score \u22653 has 98% specificity for STEMI. The modified Sgarbossa (Smith) rule replaces the 3rd criterion with an ST/S ratio for improved accuracy.',
    fields: [
        {
            name: 'concordant-ste',
            label: 'Concordant STE \u22651 mm in leads with positive QRS',
            type: 'toggle',
            points: 5,
            description: 'ST elevation in the same direction as the QRS complex (both positive)',
        },
        {
            name: 'concordant-std',
            label: 'Concordant ST depression \u22651 mm in V1-V3',
            type: 'toggle',
            points: 3,
            description: 'ST depression in anterior leads where QRS is negative (concordant)',
        },
        {
            name: 'discordant-ste',
            label: 'Excessive discordant STE \u22655 mm',
            type: 'toggle',
            points: 2,
            description: 'ST elevation >5 mm opposite to QRS direction. Consider modified rule: ST/S ratio < -0.25 is more accurate.',
        },
    ],
    results: [
        { min: -Infinity, max: 3, label: 'Score 0-2', risk: 'Negative', mortality: 'Does not meet Sgarbossa criteria for STEMI. Consider clinical context and serial ECGs.', colorVar: '--color-primary' },
        { min: 3, max: 5, label: 'Score 3', risk: 'Positive \u2014 STEMI Likely', mortality: 'Score \u22653: 98% specificity for STEMI. Activate cath lab.', colorVar: '--color-danger' },
        { min: 5, max: 8, label: 'Score 5+', risk: 'Positive \u2014 STEMI', mortality: 'Concordant STE present. 98% specificity, high sensitivity. Activate cath lab immediately.', colorVar: '--color-danger' },
        { min: 8, max: Infinity, label: 'Score 8+', risk: 'Positive \u2014 STEMI', mortality: 'Multiple Sgarbossa criteria met. Activate cath lab immediately.', colorVar: '--color-danger' },
    ],
    thresholdNote: 'Score \u22653 = 98% specificity, 20% sensitivity for STEMI in LBBB. Score \u22655 = 100% specificity, 14% sensitivity. Modified Sgarbossa (ST/S ratio < -0.25) significantly improves accuracy of 3rd criterion. If Sgarbossa negative but high clinical suspicion, manage as STEMI per ESC 2017 guidelines.',
    citations: [
        'Sgarbossa EB, et al. Electrocardiographic Diagnosis of Evolving Acute MI in the Presence of Left Bundle-Branch Block. N Engl J Med. 1996;334(8):481-487.',
        'Smith SW, et al. Diagnosis of STEMI in the Presence of LBBB with the ST-Elevation to S-Wave Ratio in a Modified Sgarbossa Rule. Ann Emerg Med. 2012;60(6):766-776.',
        'Tabas JA, et al. ECG Criteria for Detecting Acute MI in Patients with LBBB: A Meta-Analysis. Ann Emerg Med. 2008;52(4):329-336.',
    ],
};
// -------------------------------------------------------------------
// Acid-Base Calculator Definitions
// -------------------------------------------------------------------
const ANION_GAP_CALCULATOR = {
    id: 'anion-gap',
    title: 'Anion Gap + Corrected AG',
    subtitle: 'Metabolic Acidosis Classification',
    description: 'Calculates the serum anion gap and albumin-corrected anion gap. AG = Na − (Cl + HCO3). Corrected AG = AG + 2.5 × (4.2 − Albumin). Albumin correction prevents false-negative AG in hypoalbuminemia.',
    fields: [
        { name: 'sodium', label: 'Sodium (Na+)', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
        { name: 'chloride', label: 'Chloride (Cl−)', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
        { name: 'bicarb', label: 'Bicarbonate (HCO3−)', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
        { name: 'albumin', label: 'Albumin (optional)', type: 'number', points: 0, valueIsPoints: true, unit: 'g/dL', description: 'Leave at 0 to skip correction (assumes normal 4.2 g/dL)' },
    ],
    results: [],
    thresholdNote: 'Normal AG: 8-12 mEq/L. Modern analyzers may yield values as low as 6 ± 3. Always correct for albumin in critically ill patients.',
    citations: [
        'Emmett M, Narins RG. Clinical use of the anion gap. Medicine. 1977;56(1):38-54.',
        'Figge J et al. Anion gap and hypoalbuminemia. Crit Care Med. 1998;26(11):1807-1810.',
    ],
    computeResult: (values) => {
        const na = values['sodium'] || 0;
        const cl = values['chloride'] || 0;
        const hco3 = values['bicarb'] || 0;
        const albumin = values['albumin'] || 0;
        if (na <= 0 || cl <= 0 || hco3 <= 0) {
            return { value: '--', label: 'Enter values', description: 'Enter Na, Cl, and HCO3 to calculate anion gap.', colorVar: '--color-text-muted' };
        }
        const ag = na - (cl + hco3);
        const hasAlbumin = albumin > 0 && albumin < 10;
        const correctedAg = hasAlbumin ? Math.round((ag + 2.5 * (4.2 - albumin)) * 10) / 10 : ag;
        const displayAg = hasAlbumin ? correctedAg : ag;
        let label;
        let colorVar;
        if (displayAg <= 12) {
            label = 'Normal AG';
            colorVar = '--color-primary';
        }
        else if (displayAg <= 20) {
            label = 'Mild Elevation';
            colorVar = '--color-warning';
        }
        else {
            label = 'Significant Elevation';
            colorVar = '--color-danger';
        }
        const desc = hasAlbumin
            ? `AG = ${na} − (${cl} + ${hco3}) = ${ag} mEq/L\nCorrected AG = ${ag} + 2.5 × (4.2 − ${albumin}) = ${correctedAg} mEq/L\n\nAlbumin correction accounts for lost unmeasured anion buffer.`
            : `AG = ${na} − (${cl} + ${hco3}) = ${ag} mEq/L\n\nEnter albumin for corrected AG (important in critically ill patients).`;
        return { value: `${displayAg} mEq/L`, label, description: desc, colorVar };
    },
};
const DELTA_GAP_CALCULATOR = {
    id: 'delta-gap',
    title: 'Delta Gap (Delta-Delta)',
    subtitle: 'Mixed Metabolic Disorder Detection',
    description: 'Evaluates the proportionality of anion gap increase to bicarbonate decrease. Delta Ratio = (AG − 12) / (24 − HCO3). Detects concurrent non-AG acidosis or metabolic alkalosis.',
    fields: [
        { name: 'ag', label: 'Anion Gap', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
        { name: 'hco3', label: 'Bicarbonate (HCO3−)', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
    ],
    results: [],
    thresholdNote: 'Delta < 1: concurrent non-AG acidosis. Delta 1-2: pure AG acidosis. Delta > 2: concurrent metabolic alkalosis.',
    citations: [
        'Emmett M, Narins RG. Clinical use of the anion gap. Medicine. 1977;56(1):38-54.',
    ],
    computeResult: (values) => {
        const ag = values['ag'] || 0;
        const hco3 = values['hco3'] || 0;
        if (ag <= 0 || hco3 <= 0) {
            return { value: '--', label: 'Enter values', description: 'Enter anion gap and bicarbonate.', colorVar: '--color-text-muted' };
        }
        if (hco3 >= 24) {
            return { value: 'N/A', label: 'No Metabolic Acidosis', description: 'HCO3 is ≥ 24 mEq/L — no metabolic acidosis to assess. The delta gap is only meaningful when HCO3 is below normal.', colorVar: '--color-primary' };
        }
        if (ag <= 12) {
            return { value: 'N/A', label: 'No AG Elevation', description: 'Anion gap is ≤ 12 mEq/L (normal). The delta gap assesses mixed disorders in the setting of an elevated AG acidosis.', colorVar: '--color-primary' };
        }
        const deltaAg = ag - 12;
        const deltaHco3 = 24 - hco3;
        const ratio = Math.round((deltaAg / deltaHco3) * 100) / 100;
        let label;
        let colorVar;
        let interpretation;
        if (ratio < 1) {
            label = 'Concurrent Non-AG Acidosis';
            colorVar = '--color-danger';
            interpretation = 'HCO3 fell MORE than the AG rose. A concurrent hyperchloremic (non-AG) acidosis is present alongside the AG acidosis. Check for diarrhea, RTA, or saline resuscitation.';
        }
        else if (ratio <= 2) {
            label = 'Pure AG Acidosis';
            colorVar = '--color-primary';
            interpretation = 'AG rise is proportional to HCO3 drop. This is a pure anion gap metabolic acidosis without evidence of a concurrent metabolic process.';
        }
        else {
            label = 'Concurrent Metabolic Alkalosis';
            colorVar = '--color-warning';
            interpretation = 'AG rose MORE than HCO3 fell. A concurrent metabolic alkalosis is partially offsetting the acidosis. Look for vomiting, NG suction, or diuretic use.';
        }
        return {
            value: ratio.toFixed(2),
            label,
            description: `ΔAG = ${ag} − 12 = ${deltaAg}\nΔHCO3 = 24 − ${hco3} = ${deltaHco3}\nDelta Ratio = ${deltaAg} / ${deltaHco3} = ${ratio.toFixed(2)}\n\n${interpretation}`,
            colorVar,
        };
    },
};
const WINTERS_FORMULA_CALCULATOR = {
    id: 'winters-formula',
    title: "Winter's Formula",
    subtitle: 'Respiratory Compensation for Metabolic Acidosis',
    description: "Predicts the expected pCO2 for a given bicarbonate level in metabolic acidosis. Expected pCO2 = 1.5 × [HCO3] + 8 ± 2. Compares actual pCO2 to detect concurrent respiratory disturbances.",
    fields: [
        { name: 'hco3', label: 'Bicarbonate (HCO3−)', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
        { name: 'pco2', label: 'Actual pCO2', type: 'number', points: 0, valueIsPoints: true, unit: 'mmHg' },
    ],
    results: [],
    thresholdNote: "If actual pCO2 is within the expected range, respiratory compensation is appropriate. If higher → concurrent respiratory acidosis. If lower → concurrent respiratory alkalosis.",
    citations: [
        'Schwartz WB, Relman AS. A critique of the parameters used in the evaluation of acid-base disorders. NEJM. 1963;268:1382-1388.',
    ],
    computeResult: (values) => {
        const hco3 = values['hco3'] || 0;
        const pco2 = values['pco2'] || 0;
        if (hco3 <= 0 || pco2 <= 0) {
            return { value: '--', label: 'Enter values', description: 'Enter bicarbonate and actual pCO2.', colorVar: '--color-text-muted' };
        }
        const expectedPco2 = 1.5 * hco3 + 8;
        const low = Math.round((expectedPco2 - 2) * 10) / 10;
        const high = Math.round((expectedPco2 + 2) * 10) / 10;
        let label;
        let colorVar;
        let interpretation;
        if (pco2 >= low && pco2 <= high) {
            label = 'Appropriately Compensated';
            colorVar = '--color-primary';
            interpretation = 'Actual pCO2 is within the expected range. This is a pure metabolic acidosis with appropriate respiratory compensation.';
        }
        else if (pco2 > high) {
            label = 'Concurrent Respiratory Acidosis';
            colorVar = '--color-danger';
            interpretation = 'Actual pCO2 is HIGHER than expected. The patient is not hyperventilating enough — a concurrent respiratory acidosis is present. This is dangerous: both processes worsen the acidemia.';
        }
        else {
            label = 'Concurrent Respiratory Alkalosis';
            colorVar = '--color-warning';
            interpretation = 'Actual pCO2 is LOWER than expected. The patient is hyperventilating beyond metabolic compensation. Consider salicylate toxicity, PE, or early sepsis.';
        }
        return {
            value: `${low}–${high} mmHg`,
            label,
            description: `Expected pCO2 = 1.5 × ${hco3} + 8 = ${Math.round(expectedPco2 * 10) / 10} mmHg\nExpected range: ${low}–${high} mmHg\nActual pCO2: ${pco2} mmHg\n\n${interpretation}`,
            colorVar,
        };
    },
};
const OSMOLAR_GAP_CALCULATOR = {
    id: 'osmolar-gap',
    title: 'Osmolar Gap',
    subtitle: 'Toxic Alcohol Screening',
    description: 'Calculates the difference between measured and calculated serum osmolality. Elevated gap suggests unmeasured osmoles (toxic alcohols, mannitol). Calculated Osm = 2×Na + Glucose/18 + BUN/2.8 + EtOH/3.7.',
    fields: [
        { name: 'measured-osm', label: 'Measured Osmolality', type: 'number', points: 0, valueIsPoints: true, unit: 'mOsm/kg' },
        { name: 'sodium', label: 'Sodium (Na+)', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
        { name: 'glucose', label: 'Glucose', type: 'number', points: 0, valueIsPoints: true, unit: 'mg/dL' },
        { name: 'bun', label: 'BUN', type: 'number', points: 0, valueIsPoints: true, unit: 'mg/dL' },
        { name: 'etoh', label: 'Ethanol Level (optional)', type: 'number', points: 0, valueIsPoints: true, unit: 'mg/dL', description: 'Enter 0 if not measured — unmeasured EtOH will falsely elevate the gap' },
    ],
    results: [],
    thresholdNote: 'Gap > 10: elevated — consider toxic alcohol. Gap > 50: almost certainly toxic ingestion. Include EtOH if available to avoid false positive.',
    citations: [
        'Emmett M, Narins RG. Clinical use of the anion gap. Medicine. 1977;56(1):38-54.',
    ],
    computeResult: (values) => {
        const measuredOsm = values['measured-osm'] || 0;
        const na = values['sodium'] || 0;
        const glucose = values['glucose'] || 0;
        const bun = values['bun'] || 0;
        const etoh = values['etoh'] || 0;
        if (measuredOsm <= 0 || na <= 0) {
            return { value: '--', label: 'Enter values', description: 'Enter measured osmolality and sodium at minimum.', colorVar: '--color-text-muted' };
        }
        let calcOsm = 2 * na + glucose / 18 + bun / 2.8;
        let formula = `2×${na} + ${glucose}/18 + ${bun}/2.8`;
        if (etoh > 0) {
            calcOsm += etoh / 3.7;
            formula += ` + ${etoh}/3.7`;
        }
        calcOsm = Math.round(calcOsm * 10) / 10;
        const gap = Math.round((measuredOsm - calcOsm) * 10) / 10;
        let label;
        let colorVar;
        let interpretation;
        if (gap <= 10) {
            label = 'Normal';
            colorVar = '--color-primary';
            interpretation = 'No significant osmolar gap. Toxic alcohol ingestion is unlikely (though late presentations after metabolism may have a closed gap with persistent AG acidosis).';
        }
        else if (gap <= 50) {
            label = 'Elevated';
            colorVar = '--color-warning';
            interpretation = 'Elevated osmolar gap. Consider: methanol, ethylene glycol, isopropanol, propylene glycol (lorazepam/diazepam/phenytoin infusions), mannitol, lithium.';
        }
        else {
            label = 'Highly Elevated';
            colorVar = '--color-danger';
            interpretation = 'Osmolar gap > 50 — almost certainly toxic alcohol ingestion. Initiate fomepizole. Consult toxicology and nephrology.';
        }
        return {
            value: `${gap} mOsm/kg`,
            label,
            description: `Calculated Osm = ${formula} = ${calcOsm} mOsm/kg\nMeasured Osm: ${measuredOsm} mOsm/kg\nOsmolar Gap: ${measuredOsm} − ${calcOsm} = ${gap}\n\n${interpretation}`,
            colorVar,
        };
    },
};
const STEWART_SIG_CALCULATOR = {
    id: 'stewart-sig',
    title: 'Stewart SID/SIG Analysis',
    subtitle: 'Simplified Stewart Approach (Story Method)',
    description: 'Quantitative acid-base analysis using strong ion difference (SID), lactate, albumin, and base excess. Decomposes the base excess into its component causes. BE = (Na−Cl−35) + (1−Lactate) + 2.5×(4.2−Albumin) + Other Ions.',
    fields: [
        { name: 'sodium', label: 'Sodium (Na+)', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
        { name: 'chloride', label: 'Chloride (Cl−)', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
        { name: 'lactate', label: 'Lactate', type: 'number', points: 0, valueIsPoints: true, unit: 'mmol/L' },
        { name: 'albumin', label: 'Albumin', type: 'number', points: 0, valueIsPoints: true, unit: 'g/dL' },
        { name: 'be', label: 'Base Excess (or enter 0)', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L', description: 'Standard base excess from ABG. If unavailable, calculate as 24.2 − HCO3' },
    ],
    results: [],
    thresholdNote: 'SIG (Other Ions) > 2: unmeasured anions present. SIG ≤ 2: disturbance explained by Na-Cl, lactate, and albumin. If BE unavailable: use 24.2 − HCO3 as approximate base deficit (enter as negative number).',
    citations: [
        'Story DA. Stewart acid-base: a simplified bedside approach. Anesth Analg. 2016;123(2):511-515.',
        'Stewart PA. Independent and dependent variables of acid-base control. Respir Physiol. 1978;33(1):9-26.',
    ],
    computeResult: (values) => {
        const na = values['sodium'] || 0;
        const cl = values['chloride'] || 0;
        const lactate = values['lactate'] || 0;
        const albumin = values['albumin'] || 0;
        const be = values['be'] || 0;
        if (na <= 0 || cl <= 0) {
            return { value: '--', label: 'Enter values', description: 'Enter at minimum Na and Cl to begin analysis.', colorVar: '--color-text-muted' };
        }
        const naClEffect = na - cl - 35;
        const lactateEffect = 1 - lactate;
        const albuminEffect = albumin > 0 ? Math.round(2.5 * (4.2 - albumin) * 10) / 10 : 0;
        const sig = Math.round((be - naClEffect - lactateEffect - albuminEffect) * 10) / 10;
        let label;
        let colorVar;
        let sigInterpretation;
        if (Math.abs(sig) <= 2) {
            label = 'No Significant Unmeasured Ions';
            colorVar = '--color-primary';
            sigInterpretation = 'Disturbance is fully explained by Na-Cl, lactate, and albumin.';
        }
        else if (sig > 2) {
            label = 'Unmeasured Anions Present';
            colorVar = '--color-danger';
            sigInterpretation = 'SIG > 2: unmeasured anions (ketoacids, uremia, toxic alcohols, salicylates, D-lactate). Check BHB and osmolar gap.';
        }
        else {
            label = 'Unmeasured Cations';
            colorVar = '--color-warning';
            sigInterpretation = 'SIG < −2: unmeasured cations (hypercalcemia, hyperMg, myeloma proteins, lithium, bromide interference).';
        }
        const naClLabel = naClEffect < 0 ? 'acidosis' : naClEffect > 0 ? 'alkalosis' : 'neutral';
        const lacLabel = lactateEffect < 0 ? 'acidosis' : 'neutral';
        const albLabel = albuminEffect > 0 ? 'alkalosis (hypoalbuminemia)' : albuminEffect < 0 ? 'acidosis (hyperalbuminemia)' : 'neutral';
        return {
            value: `SIG: ${sig}`,
            label,
            description: `Na−Cl effect: ${na}−${cl}−35 = ${naClEffect > 0 ? '+' : ''}${naClEffect} (${naClLabel})\nLactate effect: 1−${lactate} = ${lactateEffect > 0 ? '+' : ''}${lactateEffect} (${lacLabel})\nAlbumin effect: 2.5×(4.2−${albumin}) = ${albuminEffect > 0 ? '+' : ''}${albuminEffect} (${albLabel})\nBase Excess: ${be > 0 ? '+' : ''}${be}\n\nSIG (Other Ions) = ${be} − (${naClEffect > 0 ? '+' : ''}${naClEffect}) − (${lactateEffect > 0 ? '+' : ''}${lactateEffect}) − (${albuminEffect > 0 ? '+' : ''}${albuminEffect}) = ${sig}\n\n${sigInterpretation}`,
            colorVar,
        };
    },
};
const RASS_CALCULATOR = {
    id: 'rass',
    title: 'RASS',
    subtitle: 'Richmond Agitation-Sedation Scale',
    description: 'The RASS is a 10-point scale (-5 to +4) used to assess the level of agitation or sedation in clinical patients. It classifies delirium subtypes (hypoactive vs hyperactive) and guides pharmacological management decisions.',
    fields: [
        {
            name: 'rass-observation',
            label: 'Observed Behavior',
            type: 'select',
            points: 0,
            description: 'Assess the patient\'s current level of agitation or sedation',
            selectOptions: [
                { label: '+4 Combative — violent, immediate danger to staff', points: 9 },
                { label: '+3 Very agitated — pulls/removes tubes, aggressive', points: 8 },
                { label: '+2 Agitated — frequent non-purposeful movement', points: 7 },
                { label: '+1 Restless — anxious, apprehensive, not aggressive', points: 6 },
                { label: '0 Alert and calm', points: 5 },
                { label: '-1 Drowsy — not fully alert, sustained awakening to voice (>10s)', points: 4 },
                { label: '-2 Light sedation — briefly awakens to voice, eye contact <10s', points: 3 },
                { label: '-3 Moderate sedation — movement or eye opening to voice, no eye contact', points: 2 },
                { label: '-4 Deep sedation — no response to voice, movement to physical stimulation', points: 1 },
                { label: '-5 Unarousable — no response to voice or physical stimulation', points: 0 },
            ],
        },
    ],
    results: [
        { min: 7, max: Infinity, label: 'RASS +2 to +4', risk: 'Hyperactive Delirium', mortality: 'Agitated — pharmacological sedation likely needed. Screen for excited delirium syndrome if RASS +3 or +4.', colorVar: '--color-danger' },
        { min: 6, max: 7, label: 'RASS +1', risk: 'Mild Agitation', mortality: 'Restless — attempt nonpharmacological interventions first (verbal de-escalation, environmental modification).', colorVar: '--color-warning' },
        { min: 5, max: 6, label: 'RASS 0', risk: 'Alert & Calm', mortality: 'Target level. Patient may still have delirium (inattention) — screen with CAM if clinically suspected.', colorVar: '--color-primary' },
        { min: 2, max: 5, label: 'RASS -1 to -3', risk: 'Hypoactive Delirium', mortality: 'Most commonly missed subtype (32-67% undiagnosed). Higher mortality than hyperactive. Focus on identifying and treating underlying cause — antipsychotics are NOT beneficial.', colorVar: '--color-info' },
        { min: 0, max: 2, label: 'RASS -4 to -5', risk: 'Deep Sedation / Unarousable', mortality: 'Cannot assess for delirium at this level. Evaluate for structural, toxic, or metabolic cause of obtundation. Consider intubation for airway protection.', colorVar: '--color-danger' },
    ],
    thresholdNote: 'RASS ≠ 0 warrants CAM screening for delirium. RASS -4 to -5: cannot assess — prioritize treating underlying cause.',
    citations: [
        'Sessler CN, et al. The Richmond Agitation-Sedation Scale: Validity and Reliability in Adult ICU Patients. Am J Respir Crit Care Med. 2002;166(10):1338-1344.',
        'Ely EW, et al. Monitoring Sedation Status Over Time in ICU Patients: Reliability and Validity of the RASS. JAMA. 2003;289(22):2983-2991.',
    ],
};
// -------------------------------------------------------------------
// Compensation Rule Calculators (ABG Acid-Base)
// -------------------------------------------------------------------
const COMP_RULE_1_CALCULATOR = {
    id: 'comp-rule-1',
    title: 'Rule 1: Acute Resp Acidosis',
    subtitle: 'Expected HCO3 Compensation',
    description: 'For acute respiratory acidosis (< 48h): HCO3 rises ~1 mEq/L for each 10 mmHg rise in pCO2. Expected HCO3 = 24 + 1 × (pCO2 − 40)/10.',
    fields: [
        { name: 'pco2', label: 'Measured pCO2', type: 'number', points: 0, valueIsPoints: true, unit: 'mmHg' },
        { name: 'hco3', label: 'Measured HCO3', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
    ],
    results: [],
    thresholdNote: 'If measured HCO3 exceeds expected → concurrent metabolic alkalosis. If below → concurrent metabolic acidosis.',
    citations: ['Schwartz WB, Relman AS. A critique of the parameters used in evaluation of acid-base disorders. NEJM. 1963;268:1382-1388.'],
    computeResult: (values) => {
        const pco2 = values['pco2'] || 0;
        const hco3 = values['hco3'] || 0;
        if (pco2 <= 0 || hco3 <= 0)
            return { value: '--', label: 'Enter values', description: 'Enter pCO2 and HCO3.', colorVar: '--color-text-muted' };
        const expected = 24 + 1 * (pco2 - 40) / 10;
        const expLow = Math.round((expected - 2) * 10) / 10;
        const expHigh = Math.round((expected + 2) * 10) / 10;
        let label;
        let colorVar;
        let interp;
        if (hco3 >= expLow && hco3 <= expHigh) {
            label = 'Appropriate Compensation';
            colorVar = '--color-primary';
            interp = 'Measured HCO3 is within expected range. Pure acute respiratory acidosis.';
        }
        else if (hco3 > expHigh) {
            label = 'Concurrent Metabolic Alkalosis';
            colorVar = '--color-warning';
            interp = 'HCO3 is HIGHER than expected for acute compensation. A concurrent metabolic alkalosis is present.';
        }
        else {
            label = 'Concurrent Metabolic Acidosis';
            colorVar = '--color-danger';
            interp = 'HCO3 is LOWER than expected. A concurrent metabolic acidosis is worsening the acidemia.';
        }
        return { value: `${expLow}–${expHigh} mEq/L`, label, description: `Expected HCO3 = 24 + 1×(${pco2}−40)/10 = ${Math.round(expected * 10) / 10}\nExpected range: ${expLow}–${expHigh} mEq/L\nMeasured HCO3: ${hco3} mEq/L\n\n${interp}`, colorVar };
    },
};
const COMP_RULE_2_CALCULATOR = {
    id: 'comp-rule-2',
    title: 'Rule 2: Chronic Resp Acidosis',
    subtitle: 'Expected HCO3 Compensation',
    description: 'For chronic respiratory acidosis (> 3-5 days): HCO3 rises ~3.5 mEq/L for each 10 mmHg rise in pCO2. Expected HCO3 = 24 + 3.5 × (pCO2 − 40)/10.',
    fields: [
        { name: 'pco2', label: 'Measured pCO2', type: 'number', points: 0, valueIsPoints: true, unit: 'mmHg' },
        { name: 'hco3', label: 'Measured HCO3', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
    ],
    results: [],
    thresholdNote: 'Full renal compensation takes 3-5 days. If measured HCO3 exceeds expected → concurrent metabolic alkalosis.',
    citations: ['Schwartz WB, Relman AS. A critique of the parameters used in evaluation of acid-base disorders. NEJM. 1963;268:1382-1388.'],
    computeResult: (values) => {
        const pco2 = values['pco2'] || 0;
        const hco3 = values['hco3'] || 0;
        if (pco2 <= 0 || hco3 <= 0)
            return { value: '--', label: 'Enter values', description: 'Enter pCO2 and HCO3.', colorVar: '--color-text-muted' };
        const expected = 24 + 3.5 * (pco2 - 40) / 10;
        const expLow = Math.round((expected - 2) * 10) / 10;
        const expHigh = Math.round((expected + 2) * 10) / 10;
        let label;
        let colorVar;
        let interp;
        if (hco3 >= expLow && hco3 <= expHigh) {
            label = 'Appropriate Compensation';
            colorVar = '--color-primary';
            interp = 'Measured HCO3 is within expected range. Pure chronic respiratory acidosis with full renal compensation.';
        }
        else if (hco3 > expHigh) {
            label = 'Concurrent Metabolic Alkalosis';
            colorVar = '--color-warning';
            interp = 'HCO3 is HIGHER than expected. A concurrent metabolic alkalosis is present (e.g., diuretics, vomiting).';
        }
        else {
            label = 'Concurrent Metabolic Acidosis';
            colorVar = '--color-danger';
            interp = 'HCO3 is LOWER than expected. A concurrent metabolic acidosis is present, OR compensation is not yet complete (< 3-5 days).';
        }
        return { value: `${expLow}–${expHigh} mEq/L`, label, description: `Expected HCO3 = 24 + 3.5×(${pco2}−40)/10 = ${Math.round(expected * 10) / 10}\nExpected range: ${expLow}–${expHigh} mEq/L\nMeasured HCO3: ${hco3} mEq/L\n\n${interp}`, colorVar };
    },
};
const COMP_RULE_3_CALCULATOR = {
    id: 'comp-rule-3',
    title: 'Rule 3: Acute Resp Alkalosis',
    subtitle: 'Expected HCO3 Compensation',
    description: 'For acute respiratory alkalosis: HCO3 drops ~2 mEq/L for each 10 mmHg drop in pCO2. Expected HCO3 = 24 − 2 × (40 − pCO2)/10.',
    fields: [
        { name: 'pco2', label: 'Measured pCO2', type: 'number', points: 0, valueIsPoints: true, unit: 'mmHg' },
        { name: 'hco3', label: 'Measured HCO3', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
    ],
    results: [],
    thresholdNote: 'If measured HCO3 is lower than expected → concurrent metabolic acidosis. If higher → concurrent metabolic alkalosis.',
    citations: ['Schwartz WB, Relman AS. A critique of the parameters used in evaluation of acid-base disorders. NEJM. 1963;268:1382-1388.'],
    computeResult: (values) => {
        const pco2 = values['pco2'] || 0;
        const hco3 = values['hco3'] || 0;
        if (pco2 <= 0 || hco3 <= 0)
            return { value: '--', label: 'Enter values', description: 'Enter pCO2 and HCO3.', colorVar: '--color-text-muted' };
        const expected = 24 - 2 * (40 - pco2) / 10;
        const expLow = Math.round((expected - 2) * 10) / 10;
        const expHigh = Math.round((expected + 2) * 10) / 10;
        let label;
        let colorVar;
        let interp;
        if (hco3 >= expLow && hco3 <= expHigh) {
            label = 'Appropriate Compensation';
            colorVar = '--color-primary';
            interp = 'Measured HCO3 is within expected range. Pure acute respiratory alkalosis.';
        }
        else if (hco3 < expLow) {
            label = 'Concurrent Metabolic Acidosis';
            colorVar = '--color-danger';
            interp = 'HCO3 is LOWER than expected. A concurrent metabolic acidosis is present.';
        }
        else {
            label = 'Concurrent Metabolic Alkalosis';
            colorVar = '--color-warning';
            interp = 'HCO3 is HIGHER than expected. A concurrent metabolic alkalosis is present, OR compensation is incomplete.';
        }
        return { value: `${expLow}–${expHigh} mEq/L`, label, description: `Expected HCO3 = 24 − 2×(40−${pco2})/10 = ${Math.round(expected * 10) / 10}\nExpected range: ${expLow}–${expHigh} mEq/L\nMeasured HCO3: ${hco3} mEq/L\n\n${interp}`, colorVar };
    },
};
const COMP_RULE_4_CALCULATOR = {
    id: 'comp-rule-4',
    title: 'Rule 4: Chronic Resp Alkalosis',
    subtitle: 'Expected HCO3 Compensation',
    description: 'For chronic respiratory alkalosis (> 3-5 days): HCO3 drops ~5 mEq/L for each 10 mmHg drop in pCO2. Expected HCO3 = 24 − 5 × (40 − pCO2)/10.',
    fields: [
        { name: 'pco2', label: 'Measured pCO2', type: 'number', points: 0, valueIsPoints: true, unit: 'mmHg' },
        { name: 'hco3', label: 'Measured HCO3', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
    ],
    results: [],
    thresholdNote: 'Full renal compensation takes 3-5 days. Chronic resp alkalosis can lower HCO3 to ~12-15 mEq/L.',
    citations: ['Schwartz WB, Relman AS. A critique of the parameters used in evaluation of acid-base disorders. NEJM. 1963;268:1382-1388.'],
    computeResult: (values) => {
        const pco2 = values['pco2'] || 0;
        const hco3 = values['hco3'] || 0;
        if (pco2 <= 0 || hco3 <= 0)
            return { value: '--', label: 'Enter values', description: 'Enter pCO2 and HCO3.', colorVar: '--color-text-muted' };
        const expected = 24 - 5 * (40 - pco2) / 10;
        const expLow = Math.round((expected - 2) * 10) / 10;
        const expHigh = Math.round((expected + 2) * 10) / 10;
        let label;
        let colorVar;
        let interp;
        if (hco3 >= expLow && hco3 <= expHigh) {
            label = 'Appropriate Compensation';
            colorVar = '--color-primary';
            interp = 'Measured HCO3 is within expected range. Pure chronic respiratory alkalosis with full renal compensation.';
        }
        else if (hco3 < expLow) {
            label = 'Concurrent Metabolic Acidosis';
            colorVar = '--color-danger';
            interp = 'HCO3 is LOWER than expected. A concurrent metabolic acidosis is present.';
        }
        else {
            label = 'Concurrent Metabolic Alkalosis';
            colorVar = '--color-warning';
            interp = 'HCO3 is HIGHER than expected. Compensation may not yet be complete (< 3-5 days), or a concurrent metabolic alkalosis is present.';
        }
        return { value: `${expLow}–${expHigh} mEq/L`, label, description: `Expected HCO3 = 24 − 5×(40−${pco2})/10 = ${Math.round(expected * 10) / 10}\nExpected range: ${expLow}–${expHigh} mEq/L\nMeasured HCO3: ${hco3} mEq/L\n\n${interp}`, colorVar };
    },
};
const COMP_RULE_5_CALCULATOR = {
    id: 'comp-rule-5',
    title: "Rule 5: Winter's Formula",
    subtitle: 'Expected pCO2 for Metabolic Acidosis',
    description: "Expected pCO2 = 1.5 × [HCO3] + 8 ± 2. Checks if respiratory compensation is appropriate for a primary metabolic acidosis.",
    fields: [
        { name: 'hco3', label: 'Measured HCO3', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
        { name: 'pco2', label: 'Measured pCO2', type: 'number', points: 0, valueIsPoints: true, unit: 'mmHg' },
    ],
    results: [],
    thresholdNote: "If actual pCO2 is within expected range → appropriate compensation. Higher → concurrent resp acidosis. Lower → concurrent resp alkalosis.",
    citations: ['Schwartz WB, Relman AS. A critique of the parameters used in evaluation of acid-base disorders. NEJM. 1963;268:1382-1388.'],
    computeResult: (values) => {
        const hco3 = values['hco3'] || 0;
        const pco2 = values['pco2'] || 0;
        if (hco3 <= 0 || pco2 <= 0)
            return { value: '--', label: 'Enter values', description: 'Enter HCO3 and pCO2.', colorVar: '--color-text-muted' };
        const expected = 1.5 * hco3 + 8;
        const low = Math.round((expected - 2) * 10) / 10;
        const high = Math.round((expected + 2) * 10) / 10;
        let label;
        let colorVar;
        let interp;
        if (pco2 >= low && pco2 <= high) {
            label = 'Appropriate Compensation';
            colorVar = '--color-primary';
            interp = 'Actual pCO2 is within expected range. Pure metabolic acidosis with appropriate respiratory compensation.';
        }
        else if (pco2 > high) {
            label = 'Concurrent Respiratory Acidosis';
            colorVar = '--color-danger';
            interp = 'pCO2 is HIGHER than expected. Patient is not hyperventilating enough — a concurrent respiratory acidosis is present.';
        }
        else {
            label = 'Concurrent Respiratory Alkalosis';
            colorVar = '--color-warning';
            interp = 'pCO2 is LOWER than expected. Patient is hyperventilating beyond compensation — consider salicylate, PE, or early sepsis.';
        }
        return { value: `${low}–${high} mmHg`, label, description: `Expected pCO2 = 1.5×${hco3} + 8 = ${Math.round(expected * 10) / 10}\nExpected range: ${low}–${high} mmHg\nActual pCO2: ${pco2} mmHg\n\n${interp}`, colorVar };
    },
};
const COMP_RULE_6_CALCULATOR = {
    id: 'comp-rule-6',
    title: 'Rule 6: Metabolic Alkalosis',
    subtitle: 'Expected pCO2 Compensation',
    description: 'For metabolic alkalosis: pCO2 rises ~0.7 mmHg per 1 mEq/L increase in HCO3. Expected pCO2 = 40 + 0.7 × (HCO3 − 24). Max compensatory pCO2 ≈ 55 mmHg.',
    fields: [
        { name: 'hco3', label: 'Measured HCO3', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L' },
        { name: 'pco2', label: 'Measured pCO2', type: 'number', points: 0, valueIsPoints: true, unit: 'mmHg' },
    ],
    results: [],
    thresholdNote: 'Maximum compensatory pCO2 is ~55 mmHg. If pCO2 exceeds this, suspect concurrent respiratory acidosis.',
    citations: ['Schwartz WB, Relman AS. A critique of the parameters used in evaluation of acid-base disorders. NEJM. 1963;268:1382-1388.'],
    computeResult: (values) => {
        const hco3 = values['hco3'] || 0;
        const pco2 = values['pco2'] || 0;
        if (hco3 <= 0 || pco2 <= 0)
            return { value: '--', label: 'Enter values', description: 'Enter HCO3 and pCO2.', colorVar: '--color-text-muted' };
        let expected = 40 + 0.7 * (hco3 - 24);
        const cappedNote = expected > 55 ? ' (capped at physiological max ~55)' : '';
        if (expected > 55)
            expected = 55;
        const low = Math.round((expected - 2) * 10) / 10;
        const high = Math.round((expected + 2) * 10) / 10;
        let label;
        let colorVar;
        let interp;
        if (pco2 >= low && pco2 <= high) {
            label = 'Appropriate Compensation';
            colorVar = '--color-primary';
            interp = 'Actual pCO2 is within expected range. Pure metabolic alkalosis with appropriate respiratory compensation.';
        }
        else if (pco2 > high) {
            label = 'Concurrent Respiratory Acidosis';
            colorVar = '--color-danger';
            interp = 'pCO2 is HIGHER than expected. A concurrent respiratory acidosis is present (e.g., COPD, sedation).';
        }
        else {
            label = 'Concurrent Respiratory Alkalosis';
            colorVar = '--color-warning';
            interp = 'pCO2 is LOWER than expected. A concurrent respiratory alkalosis is present.';
        }
        return { value: `${low}–${high} mmHg`, label, description: `Expected pCO2 = 40 + 0.7×(${hco3}−24) = ${Math.round((40 + 0.7 * (hco3 - 24)) * 10) / 10}${cappedNote}\nExpected range: ${low}–${high} mmHg\nActual pCO2: ${pco2} mmHg\n\n${interp}`, colorVar };
    },
};
const BSA_CALCULATOR = {
    id: 'bsa',
    title: 'Body Surface Area (BSA)',
    subtitle: 'Mosteller Formula',
    description: 'Calculates body surface area using the Mosteller formula. Used for pediatric hydrocortisone dosing in adrenal insufficiency, chemotherapy dosing, and other BSA-based calculations.',
    fields: [
        {
            name: 'height',
            label: 'Height',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'cm',
            description: 'Patient height in centimeters',
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
    ],
    results: [],
    thresholdNote: 'Pediatric HC dosing: Crisis = 50 mg/m² IV bolus. Maintenance = 6-10 mg/m²/day divided TID. Stress = 50-100 mg/m²/day.',
    citations: [
        'Mosteller RD. Simplified Calculation of Body-Surface Area. N Engl J Med. 1987;317(17):1098.',
        'Bornstein SR, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency. JCEM. 2016;101(2):364-389.',
    ],
    computeResult: (values) => {
        const height = values['height'] || 0;
        const weight = values['weight'] || 0;
        if (height <= 0 || weight <= 0) {
            return {
                value: '--',
                label: 'Enter values',
                description: 'Enter height (cm) and weight (kg) to calculate BSA.',
                colorVar: '--color-text-muted',
            };
        }
        const bsa = Math.sqrt((height * weight) / 3600);
        const bsaRounded = Math.round(bsa * 100) / 100;
        const crisisDose = Math.round(bsaRounded * 50);
        const maintLow = Math.round(bsaRounded * 6);
        const maintHigh = Math.round(bsaRounded * 10);
        const stressLow = Math.round(bsaRounded * 50);
        const stressHigh = Math.round(bsaRounded * 100);
        return {
            value: bsaRounded + ' m\u00B2',
            label: 'Body Surface Area',
            description: 'BSA = \u221A(' + height + ' \u00D7 ' + weight + ' / 3600) = ' + bsaRounded + ' m\u00B2\n\nHydrocortisone Dosing:\n\u2022 Crisis: 50 mg/m\u00B2 = ' + crisisDose + ' mg IV bolus\n\u2022 Maintenance: 6-10 mg/m\u00B2/day = ' + maintLow + '-' + maintHigh + ' mg/day divided TID\n\u2022 Stress dose: 50-100 mg/m\u00B2/day = ' + stressLow + '-' + stressHigh + ' mg/day',
            colorVar: '--color-primary',
        };
    },
};
// -------------------------------------------------------------------
// Epi Infusion Calculator (Anaphylaxis)
// -------------------------------------------------------------------
const EPI_INFUSION_CALCULATOR = {
    id: 'epi-infusion',
    title: 'Epi Infusion Calculator',
    subtitle: 'IV Epinephrine Infusion Rate for Anaphylaxis',
    description: 'Calculates epinephrine infusion rate (mL/hr) based on desired dose (mcg/min) and concentration. Protocol: Loading 20 mcg/min \u00D7 2 min \u2192 Maintenance 10 mcg/min \u2192 Titrate \u2192 AGGRESSIVELY WEAN.',
    fields: [
        {
            name: 'concentration',
            label: 'Concentration (mcg/mL)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '10 mcg/mL (1 mg in 100 mL NS)', points: 10 },
                { label: '4 mcg/mL (1 mg in 250 mL NS)', points: 4 },
            ],
        },
        {
            name: 'dose',
            label: 'Desired Dose (mcg/min)',
            type: 'number',
            points: 0,
        },
    ],
    results: [],
    thresholdNote: 'Protocol: Loading 20 mcg/min \u00D7 2 min \u2192 Maintenance 10 mcg/min \u2192 Titrate \u2192 AGGRESSIVELY WEAN after resolution.\nDo NOT give 1 mg IV push to patients with a pulse.',
    citations: [
        'Farkas J. PulmCrit \u2014 How to use IV epinephrine for anaphylaxis. EMCrit/PulmCrit. 2019.',
        'Brown SGA, et al. Insect sting anaphylaxis; prospective evaluation of treatment with IV adrenaline. Emerg Med J. 2004;21(2):149-154.',
    ],
    computeResult: (values) => {
        const conc = values['concentration'] || 10;
        const dose = values['dose'] || 0;
        if (dose <= 0) {
            return {
                value: '--',
                label: 'Enter desired dose',
                description: 'Enter desired mcg/min to calculate infusion rate.\n\nTypical ranges:\n\u2022 Loading: 20 mcg/min\n\u2022 Maintenance: 5-15 mcg/min\n\u2022 Peri-arrest bolus: 20-50 mcg IV push',
                colorVar: '--color-text-muted',
            };
        }
        const mlPerHr = Math.round((dose / conc) * 60 * 10) / 10;
        const mlPerMin = Math.round((dose / conc) * 10) / 10;
        let label;
        let colorVar;
        if (dose <= 5) {
            label = 'Low Dose (weaning range)';
            colorVar = '--color-decision-active';
        }
        else if (dose <= 15) {
            label = 'Standard Maintenance';
            colorVar = '--color-warning';
        }
        else {
            label = 'High / Loading Dose';
            colorVar = '--color-danger';
        }
        return {
            value: mlPerHr + ' mL/hr',
            label: label,
            description: dose + ' mcg/min at ' + conc + ' mcg/mL = ' + mlPerMin + ' mL/min = ' + mlPerHr + ' mL/hr\n\nProtocol reminder:\n\u2022 Loading: 20 mcg/min \u00D7 2 min (~40 mcg)\n\u2022 Maintenance: 10 mcg/min\n\u2022 Peri-arrest: 20-50 mcg IV push\n\u2022 AGGRESSIVELY WEAN after resolution',
            colorVar: colorVar,
        };
    },
};
// -------------------------------------------------------------------
// Anaphylaxis Criteria (WAO 2020)
// -------------------------------------------------------------------
const ANAPHYLAXIS_CRITERIA_CALCULATOR = {
    id: 'anaphylaxis-criteria',
    title: 'Anaphylaxis Criteria',
    subtitle: 'WAO 2020 — Rapid Yes/No Assessment',
    description: 'Rapidly determine if presentation meets World Allergy Organization 2020 diagnostic criteria for anaphylaxis. Toggle findings that are present.',
    fields: [
        {
            name: 'skin',
            label: 'Skin / Mucosal',
            description: 'Urticaria, flushing, angioedema, pruritus',
            type: 'toggle',
            points: 1,
        },
        {
            name: 'respiratory',
            label: 'Respiratory',
            description: 'Dyspnea, wheeze, stridor, hypoxemia',
            type: 'toggle',
            points: 1,
        },
        {
            name: 'hypotension',
            label: 'Hypotension / End-Organ',
            description: 'Low BP, syncope, collapse, incontinence',
            type: 'toggle',
            points: 1,
        },
        {
            name: 'gi',
            label: 'Severe GI Symptoms',
            description: 'Crampy abdominal pain, repetitive vomiting',
            type: 'toggle',
            points: 1,
        },
        {
            name: 'allergen',
            label: 'Known / Likely Allergen Exposure',
            description: 'Recent exposure to a known or probable allergen',
            type: 'toggle',
            points: 1,
        },
    ],
    results: [],
    thresholdNote: 'WAO 2020: Criterion 1 = Skin + (Respiratory OR Hypotension OR Severe GI). Criterion 2 = Known allergen + any 2 organ systems.',
    citations: [
        'Golden DBK, et al. Anaphylaxis: A 2023 Practice Parameter Update. Ann Allergy Asthma Immunol. 2024;132(2):124-176.',
        'Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). 2025.',
    ],
    computeResult: (values) => {
        const skin = values['skin'] || 0;
        const resp = values['respiratory'] || 0;
        const hypo = values['hypotension'] || 0;
        const gi = values['gi'] || 0;
        const allergen = values['allergen'] || 0;
        const organCount = skin + resp + hypo + gi;
        // No findings toggled
        if (organCount === 0) {
            return {
                value: '--',
                label: 'Toggle findings above',
                description: 'Select all clinical findings that are present to assess anaphylaxis criteria.',
                colorVar: '--color-text-muted',
            };
        }
        // Criterion 1: Skin + at least one of (respiratory, hypotension, severe GI)
        const criterion1 = skin === 1 && (resp === 1 || hypo === 1 || gi === 1);
        // Criterion 2: Known allergen + 2 or more organ systems
        const criterion2 = allergen === 1 && organCount >= 2;
        if (criterion1 || criterion2) {
            const metCriteria = [];
            if (criterion1)
                metCriteria.push('Criterion 1: Skin/mucosal + respiratory/hypotension/GI');
            if (criterion2)
                metCriteria.push('Criterion 2: Known allergen + ' + organCount + ' organ systems');
            return {
                value: 'ANAPHYLAXIS',
                label: 'Give Epinephrine NOW',
                description: metCriteria.join('\n') + '\n\nEpinephrine 0.5 mg IM anterolateral thigh immediately.\nPediatric: 0.01 mg/kg IM (max 0.5 mg).\nNo absolute contraindications.',
                colorVar: '--color-danger',
            };
        }
        // Does not meet criteria
        let reason = '';
        if (skin === 1 && organCount === 1) {
            reason = 'Skin involvement alone without respiratory, hypotension, or GI does not meet criteria.';
        }
        else if (allergen === 1 && organCount === 1) {
            reason = 'Known allergen + only 1 organ system. Need 2+ organ systems for Criterion 2.';
        }
        else if (organCount >= 2 && allergen === 0) {
            reason = '2+ organ systems but no skin involvement (Criterion 1 requires skin) and no known allergen (Criterion 2 requires allergen).';
        }
        else {
            reason = 'Current findings do not meet WAO 2020 anaphylaxis criteria.';
        }
        return {
            value: 'NOT MET',
            label: 'Criteria not met',
            description: reason + '\n\nMonitor closely \u2014 anaphylaxis can evolve rapidly. Low threshold to give epinephrine if clinical suspicion is high.',
            colorVar: '--color-decision-active',
        };
    },
};
// -------------------------------------------------------------------
// Burch-Wartofsky Score (Thyroid Storm Diagnostic Criteria)
// -------------------------------------------------------------------
const BURCH_WARTOFSKY_CALCULATOR = {
    id: 'burch-wartofsky',
    title: 'Burch-Wartofsky Score',
    subtitle: 'Thyroid Storm Diagnostic Criteria',
    description: 'Grades severity of thyrotoxicosis symptoms to assess likelihood of thyroid storm. Score \u226545 is highly suggestive but NOT diagnostic \u2014 clinical judgment supersedes. Originally developed by Burch & Wartofsky (1993).',
    fields: [
        {
            name: 'temperature',
            label: 'Temperature',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '< 99\u00B0F (37.2\u00B0C)', points: 0 },
                { label: '99-99.9\u00B0F (37.2-37.7\u00B0C)', points: 5 },
                { label: '100-100.9\u00B0F (37.8-38.2\u00B0C)', points: 10 },
                { label: '101-101.9\u00B0F (38.3-38.8\u00B0C)', points: 15 },
                { label: '102-102.9\u00B0F (38.9-39.4\u00B0C)', points: 20 },
                { label: '103-103.9\u00B0F (39.5-39.9\u00B0C)', points: 25 },
                { label: '\u2265 104\u00B0F (40\u00B0C)', points: 30 },
            ],
        },
        {
            name: 'cns-effects',
            label: 'CNS Effects',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Absent', points: 0 },
                { label: 'Mild agitation', points: 10 },
                { label: 'Delirium, psychosis, extreme lethargy', points: 20 },
                { label: 'Seizure or coma', points: 30 },
            ],
        },
        {
            name: 'gi-hepatic',
            label: 'GI-Hepatic Dysfunction',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Absent', points: 0 },
                { label: 'Diarrhea, nausea/vomiting, abdominal pain', points: 10 },
                { label: 'Unexplained jaundice', points: 20 },
            ],
        },
        {
            name: 'heart-rate',
            label: 'Heart Rate (bpm)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '< 100', points: 0 },
                { label: '100-109', points: 5 },
                { label: '110-119', points: 10 },
                { label: '120-129', points: 15 },
                { label: '130-139', points: 20 },
                { label: '\u2265 140', points: 25 },
            ],
        },
        {
            name: 'chf',
            label: 'Congestive Heart Failure',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Absent', points: 0 },
                { label: 'Mild \u2014 pedal edema', points: 5 },
                { label: 'Moderate \u2014 bibasilar rales', points: 10 },
                { label: 'Severe \u2014 pulmonary edema', points: 15 },
            ],
        },
        {
            name: 'afib',
            label: 'Atrial Fibrillation',
            type: 'toggle',
            points: 10,
        },
        {
            name: 'precipitant',
            label: 'Precipitant History',
            type: 'toggle',
            points: 10,
            description: 'Identifiable precipitant (infection, surgery, trauma, iodine load, medication change)',
        },
    ],
    results: [
        { min: -Infinity, max: 25, label: 'Score < 25', risk: 'Thyroid Storm Unlikely', mortality: 'Low likelihood of thyroid storm. Consider alternative diagnoses.', colorVar: '--color-primary' },
        { min: 25, max: 45, label: 'Score 25-44', risk: 'Impending Storm', mortality: 'Suggestive of impending thyroid storm. Consider initiating treatment.', colorVar: '--color-warning' },
        { min: 45, max: Infinity, label: 'Score \u226545', risk: 'Thyroid Storm', mortality: 'Highly suggestive of thyroid storm. Initiate aggressive multimodal treatment immediately.', colorVar: '--color-danger' },
    ],
    thresholdNote: 'The Burch-Wartofsky Score was developed in 1993 and has NOT been prospectively validated. It is sensitive but not specific \u2014 a high score does not prove thyroid storm (sepsis can score \u226545), and a low score does not exclude it. Use as a clinical framework, not a definitive diagnostic tool.',
    citations: [
        'Burch HB, Wartofsky L. Life-threatening thyrotoxicosis. Thyroid storm. Endocrinol Metab Clin North Am. 1993;22(2):263-277.',
        'Akamizu T et al. Diagnostic criteria, clinical features, and incidence of thyroid storm. Thyroid. 2012;22(7):661-679.',
    ],
};
// -------------------------------------------------------------------
// Steroid Equivalency Calculator (Formula-Based)
// -------------------------------------------------------------------
const STEROID_EQUIVALENCY_CALCULATOR = {
    id: 'steroid-equivalency',
    title: 'Steroid Equivalency Calculator',
    subtitle: 'Glucocorticoid Dose Conversion',
    description: 'Converts between equivalent doses of common glucocorticoids based on anti-inflammatory potency. Useful for switching between steroids or comparing dose intensity.',
    fields: [
        {
            name: 'steroid-type',
            label: 'Current Steroid',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Hydrocortisone (20 mg equiv)', points: 1 },
                { label: 'Cortisone (25 mg equiv)', points: 2 },
                { label: 'Prednisone / Prednisolone (5 mg equiv)', points: 3 },
                { label: 'Methylprednisolone (4 mg equiv)', points: 4 },
                { label: 'Triamcinolone (4 mg equiv)', points: 5 },
                { label: 'Dexamethasone (0.75 mg equiv)', points: 6 },
            ],
        },
        {
            name: 'dose',
            label: 'Current Dose',
            type: 'number',
            points: 0,
            unit: 'mg',
            description: 'Enter total daily dose in mg',
        },
    ],
    results: [],
    thresholdNote: 'These equivalencies are based on anti-inflammatory (glucocorticoid) potency only. Mineralocorticoid activity differs significantly between agents. Hydrocortisone has the highest mineralocorticoid activity; dexamethasone has essentially none.',
    citations: [
        'Bornstein SR et al. Diagnosis and Treatment of Primary Adrenal Insufficiency. JCEM. 2016;101(2):364-389.',
    ],
    computeResult: (values) => {
        const steroidId = values['steroid-type'] || 1;
        const dose = values['dose'] || 0;
        if (dose <= 0) {
            return { value: '--', label: 'Enter Dose', description: 'Enter a steroid dose above to calculate equivalencies.', colorVar: '--color-primary' };
        }
        // Map select index to actual equivalent dose in mg
        const equivDoses = { 1: 20, 2: 25, 3: 5, 4: 4, 5: 4, 6: 0.75 };
        const equivNames = { 1: 'Hydrocortisone', 2: 'Cortisone', 3: 'Prednisone/Prednisolone', 4: 'Methylprednisolone', 5: 'Triamcinolone', 6: 'Dexamethasone' };
        const equivalentDose = equivDoses[steroidId] || 20;
        const sourceName = equivNames[steroidId] || 'Hydrocortisone';
        // Calculate ratio: how many "units" of the base steroid
        const ratio = dose / equivalentDose;
        // Calculate all equivalents
        const hc = (ratio * 20).toFixed(1);
        const cortisone = (ratio * 25).toFixed(1);
        const pred = (ratio * 5).toFixed(1);
        const mp = (ratio * 4).toFixed(1);
        const tri = (ratio * 4).toFixed(1);
        const dex = (ratio * 0.75).toFixed(1);
        const desc = sourceName + ' ' + dose + ' mg/day equivalents: HC ' + hc + ' mg | Cortisone ' + cortisone + ' mg | Pred ' + pred + ' mg | MethylPred ' + mp + ' mg | Triam ' + tri + ' mg | Dex ' + dex + ' mg. Mineralocorticoid: High (HC, Cortisone), Low (Pred), None (MethylPred, Dex, Triam).';
        return { value: pred + ' mg Pred', label: 'Steroid Equivalency', description: desc, colorVar: '--color-primary' };
    },
};
// -------------------------------------------------------------------
// Syphilis Serology Interpreter
// -------------------------------------------------------------------
const SYPHILIS_SEROLOGY_CALCULATOR = {
    id: 'syphilis-serology',
    title: 'Syphilis Serology Interpreter',
    subtitle: 'NTT/TT Result Interpretation',
    description: 'Interprets syphilis serologic test results based on nontreponemal test (RPR/VDRL), treponemal test (TP-PA/FTA-ABS/EIA), prior history, clinical presentation, and pregnancy status. Based on CDC 2021 STI Treatment Guidelines and 2024 Laboratory Recommendations.',
    fields: [
        {
            name: 'ntt-result',
            label: 'Nontreponemal Test (RPR/VDRL)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Nonreactive', points: 0 },
                { label: 'Reactive', points: 1 },
            ],
        },
        {
            name: 'tt-result',
            label: 'Treponemal Test (TP-PA/FTA-ABS/EIA)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Not performed', points: 0 },
                { label: 'Nonreactive', points: 1 },
                { label: 'Reactive', points: 2 },
            ],
        },
        {
            name: 'prior-history',
            label: 'Prior Syphilis History',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'None / Unknown', points: 0 },
                { label: 'Previously treated', points: 1 },
            ],
        },
        {
            name: 'clinical-presentation',
            label: 'Clinical Presentation',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Asymptomatic (screening)', points: 0 },
                { label: 'Primary (chancre)', points: 1 },
                { label: 'Secondary (rash/systemic)', points: 2 },
                { label: 'Tertiary signs', points: 3 },
                { label: 'Neurologic/ocular/otic symptoms', points: 4 },
            ],
        },
        {
            name: 'pregnancy-status',
            label: 'Pregnancy Status',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Not pregnant', points: 0 },
                { label: 'Pregnant', points: 1 },
            ],
        },
    ],
    results: [],
    thresholdNote: 'Based on CDC 2021 STI Treatment Guidelines and CDC 2024 Laboratory Recommendations for Syphilis Testing.',
    citations: [
        'Hazra A, et al. CDC STI Treatment Guidelines, 2021. JAMA. 2022;327(9):870-871.',
        'Papp JR, et al. CDC Laboratory Recommendations for Syphilis Testing, 2024. MMWR. 2024;73(1):1-32.',
        'Tuddenham S, et al. Diagnosis and Treatment of STIs: A Review. JAMA. 2022;327(2):161-172.',
    ],
    computeResult: (values) => {
        const ntt = values['ntt-result'] || 0;
        const tt = values['tt-result'] || 0;
        const history = values['prior-history'] || 0;
        const presentation = values['clinical-presentation'] || 0;
        const pregnant = values['pregnancy-status'] || 0;
        // If TT not performed, guide based on NTT alone
        if (tt === 0) {
            if (ntt === 1) {
                return {
                    value: 'NTT Reactive — Confirm',
                    label: 'Treponemal test needed for confirmation',
                    description: 'A reactive nontreponemal test (RPR/VDRL) requires confirmatory treponemal testing (TP-PA, FTA-ABS, or EIA).\n\nDo not treat based on NTT alone unless clinical suspicion is very high (classic chancre, high-risk exposure < 90 days).\n\nFalse-positive NTTs occur with: pregnancy, autoimmune disease, HIV, IVDU, acute febrile illness, vaccination, chronic liver disease.',
                    colorVar: '--color-warning',
                };
            }
            return {
                value: 'Incomplete Testing',
                label: 'Order both NTT and treponemal test',
                description: 'Complete serologic evaluation requires BOTH a nontreponemal test (RPR or VDRL) AND a treponemal test (TP-PA, FTA-ABS, or EIA).\n\nNeither test alone is sufficient for diagnosis.',
                colorVar: '--color-text-muted',
            };
        }
        // Neurologic presentation always recommends neurosyphilis workup
        if (presentation === 4 && (ntt === 1 || tt === 2)) {
            const pregNote = pregnant === 1 ? '\n\n⚠️ PREGNANT: Penicillin is the ONLY acceptable treatment. Desensitize if PCN-allergic.' : '';
            return {
                value: 'NEUROSYPHILIS EVALUATION',
                label: 'Neurologic symptoms with positive serology — LP recommended',
                description: 'Neurologic, ocular, or otic symptoms with positive syphilis serology require neurosyphilis evaluation.\n\nPerform LP for CSF-VDRL, cell count, protein.\n\nTreatment: IV aqueous crystalline penicillin G 18-24 million units/day (3-4M units q4h) × 10-14 days.\n\nOcular/otosyphilis: Treat as neurosyphilis REGARDLESS of CSF findings — do not delay treatment for LP results.' + pregNote,
                colorVar: '--color-danger',
            };
        }
        // Both reactive
        if (ntt === 1 && tt === 2) {
            if (history === 1) {
                const pregNote = pregnant === 1 ? '\n\n⚠️ PREGNANT: Must use penicillin. Desensitize if allergic. Monitor for Jarisch-Herxheimer reaction with fetal monitoring.' : '';
                return {
                    value: 'Possible Reinfection',
                    label: 'Compare current RPR titer to prior documented titer',
                    description: 'Both tests reactive in a previously treated patient. Compare quantitative RPR to prior post-treatment titer.\n\n• 4-fold titer rise (e.g., 1:4 → 1:16) = REINFECTION — re-treat per stage\n• Stable low titer = serofast state (~10% of treated patients) — may not need re-treatment\n\nTreponemal tests remain positive for life and cannot distinguish active from past infection.\n\nEvaluate for neurosyphilis if RPR ≥ 1:32 or neurologic symptoms present.' + pregNote,
                    colorVar: '--color-warning',
                };
            }
            let stageNote = '';
            if (presentation === 1)
                stageNote = '\n\nPrimary syphilis (chancre present): Benzathine PCN-G 2.4M units IM × 1 dose.';
            else if (presentation === 2)
                stageNote = '\n\nSecondary syphilis (rash/systemic): Benzathine PCN-G 2.4M units IM × 1 dose. Jarisch-Herxheimer reaction occurs in 75-90%.';
            else if (presentation === 3)
                stageNote = '\n\nTertiary syphilis: Rule out neurosyphilis first. Benzathine PCN-G 2.4M units IM weekly × 3 weeks.';
            else
                stageNote = '\n\nClassify stage based on clinical findings and time since acquisition to determine treatment regimen.';
            const pregNote = pregnant === 1 ? '\n\n⚠️ PREGNANT: Must use penicillin. Desensitize if allergic. Risk of congenital syphilis — urgent treatment required.' : '';
            return {
                value: 'ACTIVE SYPHILIS',
                label: 'Confirmed infection — treat per stage',
                description: 'Both nontreponemal and treponemal tests reactive in a patient without prior treatment history confirms active syphilis infection.' + stageNote + '\n\nCo-test for HIV, gonorrhea, chlamydia, hepatitis B/C.\nReport to public health. Notify and treat sexual partners.' + pregNote,
                colorVar: '--color-danger',
            };
        }
        // NTT nonreactive, TT reactive
        if (ntt === 0 && tt === 2) {
            if (history === 1) {
                return {
                    value: 'Previously Treated',
                    label: 'No treatment needed — treponemal tests remain positive for life',
                    description: 'Nonreactive NTT with reactive TT in a previously treated patient is the expected serologic pattern after successful treatment.\n\nTreponemal antibodies persist for life. The nonreactive NTT confirms adequate treatment response.\n\nNo further treatment needed unless new symptoms develop or new exposure occurs.',
                    colorVar: '--color-primary',
                };
            }
            if (presentation === 1) {
                const pregNote = pregnant === 1 ? '\n\n⚠️ PREGNANT: Treat empirically now. Must use penicillin.' : '';
                return {
                    value: 'Possible Early Primary',
                    label: 'TT seroconverts before NTT — treat if chancre present',
                    description: 'Reactive treponemal test with nonreactive NTT and a chancre present suggests very early primary syphilis (TT seroconverts 1-2 weeks before NTT).\n\nTreat empirically: Benzathine PCN-G 2.4M units IM × 1.\nRepeat RPR in 2-4 weeks to confirm seroconversion.\n\nAlternatively, dark-field microscopy of the lesion can provide immediate diagnosis if available.' + pregNote,
                    colorVar: '--color-warning',
                };
            }
            const pregNote = pregnant === 1 ? '\n\n⚠️ PREGNANT: Consider treatment for late latent syphilis to prevent congenital transmission. Must use penicillin.' : '';
            return {
                value: 'Prior Treated or Late Latent',
                label: 'Confirm with second treponemal test (different assay)',
                description: 'Reactive treponemal test with nonreactive NTT has several interpretations:\n\n• Previously treated syphilis (most common if prior history unknown)\n• Very late latent syphilis (NTT reverts in up to 25% of untreated late latent)\n• Very early primary syphilis (TT seroconverts before NTT)\n• False-positive TT (confirm with second, different treponemal test)\n\nIf reverse algorithm: confirm with TP-PA (if EIA/CIA was screening) or vice versa.\nIf second TT reactive + no prior treatment documented → consider late latent treatment (Benzathine PCN-G 2.4M IM weekly × 3).\nIf second TT nonreactive → likely false-positive (no treatment if low risk).' + pregNote,
                colorVar: '--color-warning',
            };
        }
        // NTT reactive, TT nonreactive
        if (ntt === 1 && tt === 1) {
            if (presentation === 2) {
                return {
                    value: 'Check for Prozone',
                    label: 'Request diluted/prozone-checked RPR',
                    description: 'Reactive NTT with nonreactive TT in a patient with secondary syphilis features (rash) raises concern for the PROZONE PHENOMENON.\n\nIn secondary syphilis, very high antibody titers can saturate the assay and paradoxically produce a false-negative or weakly reactive NTT.\n\nRequest a diluted/prozone-checked RPR from the laboratory.\n\nIf clinical suspicion remains high, treat empirically and repeat serologies.',
                    colorVar: '--color-warning',
                };
            }
            return {
                value: 'Biologic False Positive',
                label: 'No syphilis treatment indicated',
                description: 'Reactive NTT (RPR/VDRL) with nonreactive treponemal test most likely represents a biologic false-positive (BFP).\n\nCommon causes:\n• Pregnancy, autoimmune disease (SLE, antiphospholipid syndrome)\n• Acute febrile illness, recent vaccination\n• IV drug use, chronic liver disease, advanced age, malignancy, HIV\n\n• Acute BFP (< 6 months): usually low titer (≤ 1:8), transient\n• Chronic BFP (> 6 months): consider autoimmune workup (ANA, anti-dsDNA, anticardiolipin Ab)\n\nNo syphilis treatment needed. Consider repeating TT with different assay. Evaluate for underlying cause.',
                colorVar: '--color-primary',
            };
        }
        // Both nonreactive
        if (ntt === 0 && tt === 1) {
            if (presentation === 1) {
                const pregNote = pregnant === 1 ? '\n\n⚠️ PREGNANT: Treat empirically if chancre suspicious. Must use penicillin.' : '';
                return {
                    value: 'Possible Incubating',
                    label: 'Chancre present but seronegative — may be in window period',
                    description: 'Both tests nonreactive but chancre present suggests possible incubating syphilis (pre-seroconversion window).\n\nNTTs become reactive 1-4 weeks after chancre appears. Up to 30% of primary syphilis is seronegative.\n\nDark-field microscopy of the lesion if available (definitive).\nTreat empirically: Benzathine PCN-G 2.4M units IM × 1.\nRepeat serologies in 2-4 weeks.' + pregNote,
                    colorVar: '--color-warning',
                };
            }
            return {
                value: 'No Evidence of Syphilis',
                label: 'Syphilis excluded (or very early incubating)',
                description: 'Both nontreponemal and treponemal tests nonreactive. No serologic evidence of syphilis.\n\nIf recent exposure (< 90 days): may be within window period. Treat presumptively per partner notification protocol and repeat serologies in 2-4 weeks.\n\nIf no risk factors or exposure: syphilis excluded.\n\nConsider alternative diagnoses for presenting symptoms.',
                colorVar: '--color-primary',
            };
        }
        return {
            value: '--',
            label: 'Select all fields',
            description: 'Complete all fields to generate interpretation.',
            colorVar: '--color-text-muted',
        };
    },
};
// -------------------------------------------------------------------
// Salicylate Toxicity Management Guide
// -------------------------------------------------------------------
const SAL_TOX_GUIDE_CALCULATOR = {
    id: 'sal-tox-guide',
    title: 'Salicylate Toxicity Management Guide',
    subtitle: 'Treatment tier based on EXTRIP guidelines + clinical severity',
    description: 'Integrates salicylate level, pH, clinical status, chronicity, and renal function to recommend treatment tier (observation \u2192 alkalinization \u2192 hemodialysis). Based on EXTRIP workgroup guidelines and IBCC/LITFL clinical frameworks.',
    fields: [
        {
            name: 'sal-level',
            label: 'Salicylate Level (mg/dL)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Not yet available', points: 0 },
                { label: '< 30 mg/dL (subtherapeutic/therapeutic)', points: 1 },
                { label: '30-50 mg/dL (mild toxicity)', points: 2 },
                { label: '50-80 mg/dL (moderate toxicity)', points: 3 },
                { label: '80-100 mg/dL (severe toxicity)', points: 4 },
                { label: '> 100 mg/dL (potentially lethal)', points: 5 },
            ],
        },
        {
            name: 'serum-ph',
            label: 'Serum pH',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '> 7.45 (alkalemic)', points: 0 },
                { label: '7.35-7.45 (normal)', points: 1 },
                { label: '7.20-7.34 (mild acidemia)', points: 2 },
                { label: '< 7.20 (severe acidemia)', points: 3 },
            ],
        },
        {
            name: 'mental-status',
            label: 'Mental Status',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Alert and oriented', points: 0 },
                { label: 'Confused or agitated', points: 1 },
                { label: 'Obtunded, seizures, or coma', points: 2 },
            ],
        },
        {
            name: 'respiratory',
            label: 'Respiratory Status',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Normal or tachypneic (compensating)', points: 0 },
                { label: 'Tiring or losing tachypnea', points: 1 },
                { label: 'Pulmonary edema or respiratory failure', points: 2 },
            ],
        },
        {
            name: 'chronicity',
            label: 'Exposure Type',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Acute (single ingestion)', points: 0 },
                { label: 'Chronic (repeated dosing)', points: 1 },
            ],
        },
        {
            name: 'renal-function',
            label: 'Renal Function',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Normal', points: 0 },
                { label: 'Impaired (Cr > 1.5 or oliguria)', points: 1 },
            ],
        },
    ],
    results: [],
    thresholdNote: 'Decision-logic tool based on EXTRIP guidelines + clinical severity. Priority: HD indications > alkalinization > observation.',
    citations: [
        'Juurlink DN, et al. EXTRIP Workgroup. Ann Emerg Med. 2015;66(2):165-181.',
        'Farkas J. Salicylate Intoxication. IBCC/EMCrit. 2025.',
        'Long N. Salicylate Toxicity. LITFL. 2020.',
        'Palmer BF, Clegg DJ. Salicylate Toxicity. NEJM. 2020;382(26):2544-2555.',
    ],
    computeResult: (values) => {
        const level = values['sal-level'] || 0;
        const ph = values['serum-ph'] || 0;
        const ms = values['mental-status'] || 0;
        const resp = values['respiratory'] || 0;
        const chronic = values['chronicity'] || 0;
        const renal = values['renal-function'] || 0;
        // --- EMERGENT HD tier ---
        if (level >= 5) {
            return { value: 'EMERGENT HD', label: 'Level > 100 mg/dL \u2014 emergent hemodialysis', description: 'EXTRIP: Strongly recommended. Level > 100 mg/dL (7.2 mmol/L) in acute ingestion.\nCall nephrology STAT. Continue NaHCO3 during and after HD.\nAnticipate post-HD rebound from tissue redistribution.', colorVar: '--color-danger' };
        }
        if (ph >= 3) {
            return { value: 'EMERGENT HD', label: 'Severe acidemia (pH < 7.20) \u2014 emergent hemodialysis', description: 'EXTRIP: Strongly recommended for pH \u2264 7.20 despite resuscitation.\nContinue NaHCO3. HD corrects acidosis AND removes salicylate simultaneously.\nDo NOT delay \u2014 acidemia drives CNS salicylate penetration (death spiral).', colorVar: '--color-danger' };
        }
        if (ms >= 2) {
            return { value: 'EMERGENT HD', label: 'Obtundation / seizures \u2014 emergent hemodialysis', description: 'Severe CNS toxicity. BZDs for seizures. D50W for neuroglycopenia.\nContinue NaHCO3. Call nephrology STAT.\nAVOID intubation if possible \u2014 death spiral risk.\nIf must intubate: pre-bolus bicarb, RR 30-35, target pH not pCO2.', colorVar: '--color-danger' };
        }
        if (resp >= 2) {
            return { value: 'EMERGENT HD', label: 'Pulmonary edema / respiratory failure \u2014 emergent hemodialysis', description: 'Non-cardiogenic pulmonary edema from direct capillary injury.\nVolume-restrict. BiPAP may temporize. HD is definitive treatment.\nAVOID intubation if possible \u2014 death spiral risk.', colorVar: '--color-danger' };
        }
        // --- HD RECOMMENDED tier ---
        if (level >= 4 && renal >= 1) {
            return { value: 'HD RECOMMENDED', label: 'Level 80-100 + renal impairment \u2014 HD recommended', description: 'EXTRIP: Recommended. Impaired renal clearance means alkalinization alone may be insufficient.\nEarly nephrology consult. Continue NaHCO3 while arranging HD.', colorVar: '--color-danger' };
        }
        if (level >= 4 && ms >= 1) {
            return { value: 'HD RECOMMENDED', label: 'Level 80-100 + altered mental status \u2014 HD recommended', description: 'EXTRIP: Recommended when elevated level with clinical toxicity.\nCall nephrology early. Continue alkalinization while arranging HD.', colorVar: '--color-danger' };
        }
        if (chronic === 1 && level >= 2 && (ms >= 1 || ph >= 2)) {
            return { value: 'HD RECOMMENDED', label: 'Chronic toxicity with clinical deterioration \u2014 HD recommended', description: 'Chronic salicylate toxicity is lethal at LOWER levels than acute.\nAMS or acidemia in chronic toxicity = severe poisoning.\nDo NOT rely on level alone. Early HD is safer than watching deterioration.', colorVar: '--color-danger' };
        }
        if (resp >= 1) {
            return { value: 'HD RECOMMENDED', label: 'Respiratory fatigue \u2014 losing compensatory tachypnea', description: 'CRITICAL: A patient who stops hyperventilating is DECOMPENSATING.\nThis is the beginning of the death spiral.\nConsider emergent HD. Push NaHCO3 boluses.\nPrepare for possible intubation with extreme caution.', colorVar: '--color-warning' };
        }
        // --- ALKALINIZE tier ---
        if (level >= 2) {
            return { value: 'ALKALINIZE', label: 'Start urinary alkalinization with NaHCO3', description: 'NaHCO3 150 mEq in 1L D5W at 150-200 mL/hr.\nTarget urine pH 7.5-8.0. Serum pH 7.45-7.55.\nMUST replete K+ (\u2265 4.0 mEq/L) or alkalinization will fail.\nAdd D5W to all fluids. Monitor urine pH hourly, ABG/BMP q2h, sal levels q2h.', colorVar: '--color-warning' };
        }
        // --- OBSERVATION tier ---
        if (level === 1) {
            return { value: 'OBSERVE', label: 'Observation with serial levels', description: 'Level < 30 mg/dL and asymptomatic.\nRepeat salicylate level at 2h and 4h.\nEnteric-coated: observe 12h minimum (delayed absorption).\nIf levels declining and asymptomatic, may discharge with precautions.\nPsychiatric evaluation if intentional ingestion.', colorVar: '--color-decision-active' };
        }
        // --- Default ---
        return { value: '\u2014', label: 'Select all fields', description: 'Complete all fields to generate a treatment recommendation.', colorVar: '--color-text-muted' };
    },
};
// -------------------------------------------------------------------
// SCD Complication Triage Calculator
// -------------------------------------------------------------------
const SCD_TRIAGE_CALCULATOR = {
    id: 'scd-triage',
    title: 'SCD Complication Triage',
    subtitle: 'Rapid complication classifier for sickle cell disease',
    description: 'Classifies the acute SCD presentation based on chief complaint, vitals, and exam findings to identify the most likely complication and recommended pathway. Based on EB Medicine Pediatric Emergency Medicine Practice, Nov 2024.',
    fields: [
        {
            name: 'chief-complaint',
            label: 'Chief Complaint',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Pain only', points: 0 },
                { label: 'Fever', points: 1 },
                { label: 'Chest pain / SOB / Cough', points: 2 },
                { label: 'Neurologic symptoms', points: 3 },
                { label: 'Abdominal distension / Pallor', points: 4 },
                { label: 'Priapism', points: 5 },
            ],
        },
        {
            name: 'temperature',
            label: 'Temperature \u2265 38.5\u00b0C (101.3\u00b0F)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No', points: 0 },
                { label: 'Yes', points: 1 },
            ],
        },
        {
            name: 'spo2',
            label: 'SpO2',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '\u2265 95%', points: 0 },
                { label: '90\u201394%', points: 1 },
                { label: '< 90%', points: 2 },
            ],
        },
        {
            name: 'spleen',
            label: 'Spleen Palpable / Enlarged',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No', points: 0 },
                { label: 'Yes', points: 1 },
            ],
        },
        {
            name: 'neuro-deficit',
            label: 'Focal Neurologic Deficit',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No', points: 0 },
                { label: 'Yes', points: 1 },
            ],
        },
        {
            name: 'cxr',
            label: 'CXR Finding',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Not obtained', points: 0 },
                { label: 'No infiltrate', points: 1 },
                { label: 'New infiltrate', points: 2 },
            ],
        },
    ],
    results: [],
    thresholdNote: 'Decision-logic triage based on clinical findings. Priority: Stroke > Splenic Sequestration > ACS > Febrile Illness > Hypoxia > VOC > Priapism.',
    citations: [
        'Jackson KM, et al. Emergency Department Management of Acute Pediatric Sickle Cell Disease Complications. Pediatr Emerg Med Pract. 2024;21(11):1-28.',
        'NHLBI. Evidence-Based Management of Sickle Cell Disease: Expert Panel Report. 2014.',
    ],
    computeResult: (values) => {
        const complaint = values['chief-complaint'] || 0;
        const temp = values['temperature'] || 0;
        const spo2 = values['spo2'] || 0;
        const spleen = values['spleen'] || 0;
        const neuro = values['neuro-deficit'] || 0;
        const cxr = values['cxr'] || 0;
        // Priority 1: Focal neuro deficit → STROKE
        if (neuro === 1) {
            return {
                value: 'STROKE',
                label: 'Critical \u2014 Stroke Alert',
                description: 'Focal neurologic deficit in SCD patient. Activate stroke alert, notify hematology STAT. Emergent CT head to rule out hemorrhage. Exchange transfusion preferred over simple \u2014 target HbS <30%. tPA NOT recommended for children <18 years.',
                colorVar: '--color-danger',
            };
        }
        // Priority 2: Splenic sequestration
        if (spleen === 1 && complaint === 4) {
            return {
                value: 'SPLENIC SEQUESTRATION',
                label: 'Critical \u2014 Splenic Sequestration',
                description: 'Enlarged spleen with abdominal distension/pallor. Life-threatening emergency. Two large-bore IVs. Emergent CBC, retic, T&C. pRBC 5 mL/kg aliquots. CRITICAL: Do NOT transfuse past Hgb 8 g/dL (reverse sequestration \u2192 hyperviscosity, HTN, CHF, ICH). Admit all.',
                colorVar: '--color-danger',
            };
        }
        // Priority 3: ACS (new infiltrate + fever or resp symptoms)
        if (cxr === 2 && (temp === 1 || complaint === 2)) {
            return {
                value: 'ACUTE CHEST SYNDROME',
                label: 'Critical \u2014 ACS',
                description: 'New CXR infiltrate with fever or respiratory symptoms = acute chest syndrome. Ceftriaxone 50 mg/kg + Azithromycin 10 mg/kg IV. O2 only for SpO2 <90%. Incentive spirometry q2h. Simple transfusion if Hgb drops >1 g/dL from baseline. Exchange transfusion if worsening. AVOID corticosteroids. Admit all.',
                colorVar: '--color-danger',
            };
        }
        // Priority 4: Fever (medical emergency in SCD)
        if (temp === 1) {
            return {
                value: 'ACUTE FEBRILE ILLNESS',
                label: 'Urgent \u2014 Fever Emergency',
                description: 'Fever \u2265 38.5\u00b0C is a medical emergency in SCD due to functional asplenia. Blood cultures BEFORE antibiotics. Ceftriaxone 50 mg/kg IV (max 2g) IMMEDIATELY. CXR if any respiratory symptoms (r/o ACS). Add Vancomycin 20 mg/kg if meningitis concern.',
                colorVar: '--color-warning',
            };
        }
        // Priority 5: Severe hypoxia without infiltrate
        if (spo2 === 2) {
            return {
                value: 'EVALUATE ACS / PULMONARY',
                label: 'Urgent \u2014 Hypoxia',
                description: 'SpO2 <90% without CXR infiltrate. Obtain CXR if not done. Consider evolving ACS (CXR may lag symptoms), pulmonary embolism (hypercoagulable state), or pulmonary hypertension. Supplemental O2. Repeat imaging in 12\u201324h if high suspicion.',
                colorVar: '--color-warning',
            };
        }
        // Priority 6: Spleen palpable but different chief complaint
        if (spleen === 1) {
            return {
                value: 'SPLENIC CONCERN',
                label: 'Urgent \u2014 Evaluate Spleen',
                description: 'Palpable spleen in SCD patient. Emergent CBC, retic, bilirubin, T&C. Compare Hgb to baseline \u2014 drop \u22652 g/dL suggests sequestration. Monitor for rapid progression. Even if stable, strongly consider admission for observation.',
                colorVar: '--color-warning',
            };
        }
        // New infiltrate without fever or resp symptoms
        if (cxr === 2) {
            return {
                value: 'POSSIBLE ACS',
                label: 'Urgent \u2014 New Infiltrate',
                description: 'New CXR infiltrate without typical ACS features. Treat empirically with antibiotics (Ceftriaxone + Azithromycin). Monitor closely for ACS development. Incentive spirometry. Admit for observation.',
                colorVar: '--color-warning',
            };
        }
        // Respiratory symptoms without CXR
        if (complaint === 2 && cxr === 0) {
            return {
                value: 'OBTAIN CXR',
                label: 'Action Needed',
                description: 'Chest pain/SOB/cough in SCD patient without CXR. Obtain CXR immediately to evaluate for ACS. A new infiltrate with these symptoms = ACS. If CXR clear, consider PE, pulmonary hypertension, rib/sternal infarct, or pleural effusion.',
                colorVar: '--color-warning',
            };
        }
        // Pain only
        if (complaint === 0) {
            return {
                value: 'VASO-OCCLUSIVE CRISIS',
                label: 'Urgent \u2014 VOC',
                description: 'Pain crisis without fever, hypoxia, or other red flags. IN Fentanyl 1\u20131.5 mcg/kg at triage. IV access + labs. Ketorolac 0.5 mg/kg IV + opioid. NS bolus 10 mL/kg. Reassess q30 min \u00d7 3 doses. Incentive spirometry. Discharge if pain controlled with PO meds.',
                colorVar: '--color-warning',
            };
        }
        // Priapism
        if (complaint === 5) {
            return {
                value: 'PRIAPISM',
                label: 'Urgent \u2014 Priapism',
                description: 'Priapism in SCD patient. Urologic emergency \u2014 intervene within 4 hours. IV hydration, analgesia, O2. Consider pseudoephedrine 30\u201360 mg PO. Ketamine may assist detumescence. Urology consult for aspiration/phenylephrine if >4 hours.',
                colorVar: '--color-warning',
            };
        }
        // Mild hypoxia
        if (spo2 === 1) {
            return {
                value: 'MONITOR \u2014 MILD HYPOXIA',
                label: 'Monitor',
                description: 'SpO2 90\u201394%. Obtain CXR if not done. May represent baseline for this patient, early ACS, or dehydration. O2 supplementation only if SpO2 <90%. Reassess frequently for clinical deterioration.',
                colorVar: '--color-decision-active',
            };
        }
        // Respiratory symptoms with clear CXR
        if (complaint === 2 && cxr === 1) {
            return {
                value: 'MONITOR \u2014 CHEST SYMPTOMS',
                label: 'Monitor',
                description: 'Respiratory symptoms with clear CXR. ACS unlikely but CXR can lag behind clinical symptoms. Consider: rib/sternal VOC, asthma exacerbation, PE, pulmonary hypertension. Repeat CXR if symptoms persist or worsen. Incentive spirometry.',
                colorVar: '--color-decision-active',
            };
        }
        return {
            value: 'ASSESS',
            label: 'Further Assessment Needed',
            description: 'Complete the clinical assessment. Select the findings that best match the patient presentation to generate a triage recommendation.',
            colorVar: '--color-text-muted',
        };
    },
};
// -------------------------------------------------------------------
// QRS Risk Stratifier (TCA Overdose)
// -------------------------------------------------------------------
const QRS_RISK_CALCULATOR = {
    id: 'qrs-risk',
    title: 'QRS Risk Stratifier',
    subtitle: 'TCA Overdose ECG Risk Assessment',
    description: 'Stratifies risk of seizures and ventricular arrhythmias in TCA overdose based on QRS duration and R wave in aVR. Based on Boehnert & Lovejoy 1985 (NEJM) and Liebelt et al 1995 (Ann Emerg Med).',
    fields: [
        {
            name: 'qrs',
            label: 'QRS Duration',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'ms',
            description: 'Measured from 12-lead ECG',
        },
        {
            name: 'avr',
            label: 'R wave in aVR > 3 mm',
            type: 'toggle',
            points: 0,
            description: 'Terminal R wave amplitude in lead aVR (Liebelt 1995)',
        },
    ],
    results: [],
    thresholdNote: 'In the context of poisoning, "wide QRS" is anything >100 ms (not >120 ms)',
    citations: [
        'Boehnert MT, Lovejoy FH Jr. Value of the QRS duration versus the serum drug level in predicting seizures and ventricular arrhythmias after an acute overdose of tricyclic antidepressants. N Engl J Med. 1985;313(8):474-479.',
        'Liebelt EL, et al. ECG lead aVR versus QRS interval in predicting seizures and arrhythmias in acute tricyclic antidepressant toxicity. Ann Emerg Med. 1995;26(2):195-201.',
    ],
    computeResult: (values) => {
        const qrs = values['qrs'] || 0;
        const avr = values['avr'] || 0;
        if (qrs === 0) {
            return {
                value: '—',
                label: 'Enter QRS Duration',
                description: 'Measure QRS duration from 12-lead ECG to assess risk.',
                colorVar: '--color-text-secondary',
            };
        }
        if (qrs < 100 && avr === 0) {
            return {
                value: qrs + ' ms',
                label: 'Low Risk',
                description: 'Normal QRS, no aVR findings.\n\n• Monitor with serial ECGs q15-30 min for first 2 hours\n• Continuous telemetry × 6 hours minimum\n• Toxicity can still develop rapidly — do not be reassured\n• If QRS widens at any point → immediate sodium bicarbonate',
                colorVar: '--color-decision-active',
            };
        }
        if (qrs < 100 && avr === 1) {
            return {
                value: qrs + ' ms + aVR+',
                label: 'Moderate Risk',
                description: 'QRS normal but R wave in aVR >3 mm suggests subclinical sodium channel blockade.\n\n• Consider prophylactic sodium bicarbonate\n• Serial ECGs q15-30 min\n• Lower threshold for treatment\n• aVR may be more sensitive than QRS alone (Liebelt 1995)',
                colorVar: '--color-warning',
            };
        }
        if (qrs >= 100 && qrs < 120) {
            return {
                value: qrs + ' ms',
                label: 'Moderate Risk — Seizure Risk ~10%',
                description: 'QRS 100-120 ms indicates sodium channel blockade.\n\n• Administer sodium bicarbonate 1-2 mEq/kg IV push\n• Target serum pH 7.50-7.55\n• Serial ECGs q15 min to assess response\n• ~33% chance of seizures at QRS >100 ms (Boehnert 1985)',
                colorVar: '--color-warning',
            };
        }
        if (qrs >= 120 && qrs <= 160) {
            return {
                value: qrs + ' ms',
                label: 'High Risk — Seizure Risk ~30%',
                description: 'Significant sodium channel blockade.\n\n• Aggressive sodium bicarbonate therapy — repeat boluses q3-5 min\n• Continuous infusion after QRS narrows\n• Prepare for seizures and ventricular arrhythmias\n• Consider early lidocaine if QRS not responding to bicarb\n• ICU admission mandatory',
                colorVar: '--color-danger',
            };
        }
        // qrs > 160
        return {
            value: qrs + ' ms',
            label: 'Critical Risk — High VT/VF Risk',
            description: '~50% risk of ventricular arrhythmias at QRS >160 ms.\n\n• Immediate sodium bicarbonate bolus + infusion\n• If intubated: hyperventilate simultaneously\n• Consider lidocaine 1-1.5 mg/kg IV for refractory widening\n• Prepare for cardiovascular collapse\n• Have lipid emulsion and ECMO consultation available\n• Massive bicarb doses may be needed (case report: 2650 mEq)',
            colorVar: '--color-danger',
        };
    },
};
// -------------------------------------------------------------------
// NaHCO₃ Dose Calculator (TCA Overdose)
// -------------------------------------------------------------------
const BICARB_DOSE_CALCULATOR = {
    id: 'bicarb-dose',
    title: 'NaHCO₃ Dose Calculator',
    subtitle: 'Sodium Bicarbonate Dosing for TCA Overdose',
    description: 'Calculates bolus and infusion dosing of 8.4% sodium bicarbonate for sodium channel blockade in TCA overdose.',
    fields: [
        {
            name: 'weight',
            label: 'Patient Weight',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'kg',
        },
    ],
    results: [],
    thresholdNote: '1 amp = 50 mEq/50 mL of 8.4% NaHCO₃ (1 mEq/mL, 1000 mOsm/L)',
    citations: [
        'Woolf AD, et al. Tricyclic antidepressant poisoning: an evidence-based consensus guideline. Clin Toxicol. 2007;45(3):203-233.',
        'Farkas J. Sodium Channel Blocker Toxicity. IBCC. 2025.',
    ],
    computeResult: (values) => {
        const weight = values['weight'] || 0;
        if (weight === 0) {
            return {
                value: '—',
                label: 'Enter Patient Weight',
                description: 'Enter weight in kg to calculate bicarbonate dosing.',
                colorVar: '--color-text-secondary',
            };
        }
        const lowDose = Math.round(weight * 1);
        const highDose = Math.round(weight * 2);
        const lowAmps = Math.ceil(lowDose / 50);
        const highAmps = Math.ceil(highDose / 50);
        return {
            value: lowDose + '–' + highDose + ' mEq',
            label: 'Bolus + Infusion Dosing',
            description: '▸ BOLUS: ' + lowDose + '–' + highDose + ' mEq IV push (~' + lowAmps + '–' + highAmps + ' amps)\n' +
                '   Repeat q3-5 min until QRS narrows\n\n' +
                '▸ INFUSION: 150 mEq (3 amps) in 1L D5W\n' +
                '   Rate: 150-250 mL/hr\n\n' +
                '▸ GOALS:\n' +
                '   • Serum pH 7.50-7.55\n' +
                '   • QRS < 100 ms\n' +
                '   • Serum Na ≤ 155 mEq/L\n\n' +
                '▸ MONITOR:\n' +
                '   • ABG/VBG q30-60 min\n' +
                '   • K+ (hypokalemia from alkalosis — replete simultaneously)\n' +
                '   • Ionized Ca²⁺ (drops with alkalosis)\n' +
                '   • Serial ECGs q15-30 min',
            colorVar: '--color-decision-active',
        };
    },
};
// -------------------------------------------------------------------
// Rumack-Matthew Nomogram Interpreter
// -------------------------------------------------------------------
const RUMACK_MATTHEW_CALCULATOR = {
    id: 'rumack-matthew',
    title: 'Rumack-Matthew Nomogram',
    subtitle: 'Acetaminophen Toxicity Risk Stratification',
    description: 'Determines need for NAC treatment based on serum APAP level and time since acute single ingestion. Valid ONLY for acute ingestion (<24h) with reliable history.',
    fields: [
        {
            name: 'hours',
            label: 'Hours Since Ingestion',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'hours',
            description: 'Time since end of ingestion (must be ≥4 hours)',
        },
        {
            name: 'apap-level',
            label: 'Serum APAP Level',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'mcg/mL',
        },
    ],
    results: [],
    thresholdNote: 'The Rumack-Matthew nomogram is valid ONLY for acute single ingestions with reliable history. It does NOT apply to: chronic/repeated ingestion, extended-release formulations (may need serial levels), unknown timing, or unreliable history. For chronic ingestions, use the (ALT)(APAP) Product calculator instead.',
    citations: [
        'Rumack BH. Acetaminophen hepatotoxicity: the first 35 years. J Toxicol Clin Toxicol. 2002;40(1):3-20. PMID 11990202',
        'Dart RC, et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open. 2023;6(8):e2327739. PMID 37552484',
    ],
    computeResult: (values) => {
        const hours = values['hours'];
        const apapLevel = values['apap-level'];
        if (!hours || !apapLevel)
            return { value: '--', label: 'Enter values', description: 'Enter hours post-ingestion and APAP level', colorVar: '--color-text-muted' };
        if (hours < 4)
            return { value: 'Too Early', label: 'Cannot interpret', description: 'APAP level drawn before 4 hours post-ingestion cannot be reliably plotted on the nomogram. Redraw at ≥4 hours. If >2 hours post-ingestion and undetectable, significant ingestion is unlikely — but confirm with toxicology if concerned.', colorVar: '--color-warning' };
        if (hours > 24)
            return { value: 'Not Applicable', label: 'Beyond nomogram range', description: 'The Rumack-Matthew nomogram is only validated for 4-24 hours post-ingestion. At >24 hours, treat based on clinical status, transaminases, and INR. If any concern, start NAC empirically.', colorVar: '--color-warning' };
        // Treatment line: 150 mcg/mL at 4h, exponential decay
        // Half-life of the line is ~4 hours: ln(2)/4 ≈ 0.173
        const k = 0.173;
        const treatmentLine = 150 * Math.exp(-k * (hours - 4));
        const highRiskLine = 300 * Math.exp(-k * (hours - 4));
        const treatmentRounded = Math.round(treatmentLine);
        const highRiskRounded = Math.round(highRiskLine);
        if (apapLevel >= highRiskLine) {
            return {
                value: `${apapLevel} mcg/mL at ${hours}h`,
                label: 'ABOVE HIGH-RISK LINE (300)',
                description: `Level ${apapLevel} is above the high-risk line (${highRiskRounded} mcg/mL at ${hours}h). This is a MASSIVE overdose.\n\n• Start HIGH-DOSE NAC (Hendrickson protocol)\n• Strongly consider fomepizole (CYP2E1 inhibitor)\n• Activated charcoal even if >4 hours\n• Evaluate for hemodialysis (EXTRIP criteria)\n• Consult toxicology/poison control immediately`,
                colorVar: '--color-danger',
            };
        }
        if (apapLevel >= treatmentLine) {
            return {
                value: `${apapLevel} mcg/mL at ${hours}h`,
                label: 'ABOVE TREATMENT LINE — Start NAC',
                description: `Level ${apapLevel} is above the treatment line (${treatmentRounded} mcg/mL at ${hours}h).\n\n• Start IV NAC immediately (21-hour 3-bag protocol)\n• GI decontamination with activated charcoal if within 4 hours\n• Recheck APAP level, AST/ALT, INR q6h\n• NAC is nearly 100% effective within 8 hours of ingestion`,
                colorVar: '--color-warning',
            };
        }
        return {
            value: `${apapLevel} mcg/mL at ${hours}h`,
            label: 'Below Treatment Line — Low Risk',
            description: `Level ${apapLevel} is below the treatment line (${treatmentRounded} mcg/mL at ${hours}h).\n\n• Low risk of hepatotoxicity if this is an acute single ingestion with reliable history\n• Observe 4-6 hours with repeat labs before discharge\n• Special cases requiring serial levels: extended-release formulations, opioid/anticholinergic coingestants (redraw in 4-6h if >10 mcg/mL)\n• If any doubt, start NAC — it is extremely safe`,
            colorVar: '--color-primary',
        };
    },
};
// -------------------------------------------------------------------
// NAC IV Dosing Calculator
// -------------------------------------------------------------------
const NAC_DOSING_CALCULATOR = {
    id: 'nac-dosing',
    title: 'NAC IV Dosing Calculator',
    subtitle: 'N-Acetylcysteine 21-Hour Protocol',
    description: 'Calculates weight-based IV NAC doses for the standard 3-bag protocol. Doses are capped at 100 kg body weight per consensus guidelines.',
    fields: [
        {
            name: 'weight',
            label: 'Patient Weight',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'kg',
        },
    ],
    results: [],
    thresholdNote: 'Standard 21-hour IV protocol. For massive overdose (above 300 line), increase Bag 3 infusion rate per Hendrickson protocol: 2× for >300, 3× for >450, 4× for >600 line. During hemodialysis, double the rate (max 25 mg/kg/hr). Cap weight at 100 kg for morbid obesity.',
    citations: [
        'Dart RC, et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open. 2023;6(8):e2327739. PMID 37552484',
        'Heard KJ. Acetylcysteine for acetaminophen poisoning. N Engl J Med. 2008;359(3):285-292. PMID 18635433',
    ],
    computeResult: (values) => {
        const rawWeight = values['weight'];
        if (!rawWeight || rawWeight <= 0)
            return { value: '--', label: 'Enter weight', description: 'Enter patient weight in kg', colorVar: '--color-text-muted' };
        const weight = Math.min(rawWeight, 100); // Cap at 100 kg
        const capped = rawWeight > 100;
        const bag1Mg = Math.round(weight * 150);
        const bag2Mg = Math.round(weight * 50);
        const bag3Mg = Math.round(weight * 100);
        const totalMg = bag1Mg + bag2Mg + bag3Mg;
        const bag2Rate = Math.round(bag2Mg / 4);
        const bag3Rate = Math.round(bag3Mg / 16);
        let desc = `**Bag 1 (Loading):** ${bag1Mg} mg in 200 mL D5W over 60 min\n`;
        desc += `**Bag 2:** ${bag2Mg} mg in 500 mL D5W over 4 hours (${bag2Rate} mg/hr)\n`;
        desc += `**Bag 3:** ${bag3Mg} mg in 1000 mL D5W over 16 hours (${bag3Rate} mg/hr)\n\n`;
        desc += `**Total: ${totalMg} mg (${Math.round(totalMg / 1000 * 10) / 10} g) over 21 hours**`;
        if (capped)
            desc += `\n\n⚠️ Dose capped at 100 kg (actual weight: ${rawWeight} kg)`;
        desc += `\n\n**Stopping criteria:** APAP <10 mcg/mL + INR <2 + AST/ALT improving (>25-50% from peak) + clinically well. If not met, repeat Bag 3 indefinitely.`;
        return {
            value: `${totalMg} mg total`,
            label: `Standard 3-Bag Protocol (${weight} kg)`,
            description: desc,
            colorVar: '--color-primary',
        };
    },
};
// -------------------------------------------------------------------
// King's College Criteria
// -------------------------------------------------------------------
const KINGS_COLLEGE_CALCULATOR = {
    id: 'kings-college',
    title: "King's College Criteria",
    subtitle: 'Acetaminophen-Induced Acute Liver Failure',
    description: "Determines need for liver transplant referral in acetaminophen-induced acute hepatic failure. Meeting criteria warrants immediate transfer to a transplant center.",
    fields: [
        {
            name: 'ph',
            label: 'Arterial pH (after adequate fluid resuscitation)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '≥ 7.30', points: 0 },
                { label: '< 7.30', points: 1 },
            ],
        },
        {
            name: 'inr',
            label: 'INR (Prothrombin Time)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '< 6.5', points: 0 },
                { label: '≥ 6.5 (PT > 100 sec)', points: 1 },
            ],
        },
        {
            name: 'creatinine',
            label: 'Serum Creatinine',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '< 3.4 mg/dL', points: 0 },
                { label: '≥ 3.4 mg/dL', points: 1 },
            ],
        },
        {
            name: 'encephalopathy',
            label: 'Hepatic Encephalopathy Grade',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'None or Grade I-II', points: 0 },
                { label: 'Grade III-IV', points: 1 },
            ],
        },
    ],
    results: [],
    thresholdNote: "King's College Criteria for APAP-induced ALF: pH <7.30 alone (after resuscitation) OR all three: INR ≥6.5 + Creatinine ≥3.4 + Grade III-IV encephalopathy. Additional poor prognostic markers include lactate >3.5 mmol/L after resuscitation and phosphate >3.75 mg/dL at 48-96h.",
    citations: [
        "O'Grady JG, et al. Early indicators of prognosis in fulminant hepatic failure. Gastroenterology. 1989;97(2):439-445. PMID 2490426",
        'Bernal W, et al. Lessons from look-back in acute liver failure? A single centre experience of 3300 patients. J Hepatol. 2013;59(1):74-80.',
    ],
    computeResult: (values) => {
        const ph = values['ph'] || 0;
        const inr = values['inr'] || 0;
        const creatinine = values['creatinine'] || 0;
        const encephalopathy = values['encephalopathy'] || 0;
        // pH <7.30 alone = criteria met
        if (ph === 1) {
            return {
                value: 'CRITERIA MET',
                label: 'Transplant Referral — pH Criterion',
                description: "**King's College Criteria MET** (pH <7.30 after adequate resuscitation alone is sufficient).\n\n• **Transfer to liver transplant center immediately**\n• Continue IV NAC indefinitely\n• Aggressive supportive care: coagulopathy management, cerebral edema prevention, glucose monitoring\n• Contact transplant surgery EARLY — do not wait for further deterioration\n• Patients with acute hepatic failure CAN be transplant candidates even after recent suicidal ingestion",
                colorVar: '--color-danger',
            };
        }
        // All three: INR ≥6.5 + Cr ≥3.4 + Grade III-IV encephalopathy
        if (inr === 1 && creatinine === 1 && encephalopathy === 1) {
            return {
                value: 'CRITERIA MET',
                label: 'Transplant Referral — INR/Cr/Encephalopathy',
                description: "**King's College Criteria MET** (INR ≥6.5 + Creatinine ≥3.4 + Grade III-IV encephalopathy).\n\n• **Transfer to liver transplant center immediately**\n• Continue IV NAC indefinitely\n• Manage cerebral edema: elevate HOB 30°, hypertonic saline, mannitol\n• FFP only if active bleeding (preserves INR as prognostic marker)\n• D10W infusion for hypoglycemia\n• Low threshold for broad-spectrum antibiotics",
                colorVar: '--color-danger',
            };
        }
        // Partial criteria — concerning but not met
        const concerning = inr === 1 || creatinine === 1 || encephalopathy === 1;
        if (concerning) {
            return {
                value: 'NOT MET (Partial)',
                label: 'Criteria Not Met — Monitor Closely',
                description: "King's College Criteria not fully met, but one or more concerning features present.\n\n• Continue IV NAC and aggressive supportive care\n• Serial labs q6h (INR is the most important prognostic marker)\n• **Consider early discussion with transplant center** — don't wait for full criteria to be met\n• Additional poor prognostic markers: lactate >3.5 mmol/L (after resuscitation), phosphate >3.75 mg/dL (48-96h)",
                colorVar: '--color-warning',
            };
        }
        return {
            value: 'NOT MET',
            label: 'Criteria Not Met',
            description: "King's College Criteria not met. Continue supportive care and NAC per protocol.\n\n• Reassess if clinical deterioration\n• Serial labs q6h — INR trending is the best prognostic marker\n• Most patients who don't develop severe hepatotoxicity (AST/ALT <1000) will recover completely",
            colorVar: '--color-primary',
        };
    },
};
// -------------------------------------------------------------------
// (ALT)(APAP) Product
// -------------------------------------------------------------------
const ALT_APAP_PRODUCT_CALCULATOR = {
    id: 'alt-apap-product',
    title: '(ALT)(APAP) Product',
    subtitle: 'Hepatotoxicity Prediction',
    description: 'Predicts hepatotoxicity risk using the product of ALT and APAP concentration. Most useful for chronic/repeated supratherapeutic ingestion or delayed presentation where the Rumack-Matthew nomogram does not apply.',
    fields: [
        {
            name: 'alt',
            label: 'ALT (Alanine Aminotransferase)',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'IU/L',
        },
        {
            name: 'apap',
            label: 'APAP Concentration',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'mcg/mL',
        },
    ],
    results: [],
    thresholdNote: 'The (ALT)(APAP) product is particularly useful when the Rumack-Matthew nomogram cannot be applied: chronic/repeated ingestion, unknown timing, delayed presentation, or unreliable history. A product >10,000 is strongly associated with hepatotoxicity. A product <1,500 makes significant hepatotoxicity very unlikely.',
    citations: [
        'Chidiac AS, et al. Paracetamol (acetaminophen) overdose and hepatotoxicity: mechanism, treatment, prevention measures, and estimates of burden of disease. Expert Opin Drug Metab Toxicol. 2023;19(5):297-317. PMID 37436926',
        'Internet Book of Critical Care: Acetaminophen Toxicity. Josh Farkas, PulmCrit/IBCC. Updated August 2025.',
    ],
    computeResult: (values) => {
        const alt = values['alt'];
        const apap = values['apap'];
        if (!alt && alt !== 0 || !apap && apap !== 0)
            return { value: '--', label: 'Enter values', description: 'Enter ALT and APAP concentration', colorVar: '--color-text-muted' };
        if (alt === 0 || apap === 0) {
            if (alt === 0 && apap === 0)
                return { value: '0', label: 'Both values are zero', description: 'If APAP is undetectable and ALT is normal, hepatotoxicity from acetaminophen is very unlikely. Consider other diagnoses if clinical concern persists.', colorVar: '--color-primary' };
            return { value: '0', label: 'Product is zero', description: alt === 0 ? 'ALT is normal. If APAP is detectable, monitor with serial labs q6h.' : 'APAP is undetectable. If ALT is elevated, consider other causes of hepatitis. NAC may still be indicated if recent APAP history.', colorVar: '--color-primary' };
        }
        const product = alt * apap;
        const formatted = product.toLocaleString();
        if (product > 10000) {
            return {
                value: formatted,
                label: 'HIGH RISK — Hepatotoxicity Likely',
                description: `(ALT)(APAP) product = ${formatted} (>10,000)\n\n**Strongly associated with hepatotoxicity.**\n• Start NAC immediately if not already initiated\n• Serial labs q6h (APAP, AST/ALT, INR, BMP)\n• If massive ingestion: high-dose NAC, consider fomepizole\n• Monitor for progression to hepatic failure`,
                colorVar: '--color-danger',
            };
        }
        if (product >= 1500) {
            return {
                value: formatted,
                label: 'INTERMEDIATE RISK',
                description: `(ALT)(APAP) product = ${formatted} (1,500–10,000)\n\n**Intermediate risk — clinical correlation required.**\n• Consider starting NAC (when in doubt, treat)\n• Serial labs q6h\n• Consult toxicology/poison control\n• Reassess with repeat (ALT)(APAP) product in 4-6 hours`,
                colorVar: '--color-warning',
            };
        }
        return {
            value: formatted,
            label: 'LOW RISK — Hepatotoxicity Unlikely',
            description: `(ALT)(APAP) product = ${formatted} (<1,500)\n\n**Hepatotoxicity very unlikely.**\n• Continue monitoring with serial labs\n• Consider discharge if APAP trending down, normal INR, and clinically well\n• If chronic ingestion with risk factors (alcoholism, CYP2E1 inducers), maintain lower threshold for treatment`,
            colorVar: '--color-primary',
        };
    },
};
// -------------------------------------------------------------------
// qSOFA Score
// -------------------------------------------------------------------
const QSOFA_CALCULATOR = {
    id: 'qsofa',
    title: 'qSOFA Score',
    subtitle: 'Quick Sequential Organ Failure Assessment',
    description: 'The qSOFA identifies patients with suspected infection at high risk for in-hospital mortality. Score ≥2 associated with poor outcomes. Note: SSC 2021 recommends AGAINST qSOFA as sole screening tool due to low sensitivity.',
    fields: [
        { name: 'ams', label: 'Altered mental status (GCS <15)', type: 'toggle', points: 1 },
        { name: 'sbp', label: 'Systolic BP ≤ 100 mmHg', type: 'toggle', points: 1 },
        { name: 'rr', label: 'Respiratory rate ≥ 22/min', type: 'toggle', points: 1 },
    ],
    results: [
        { min: -Infinity, max: 2, label: 'Score 0-1', risk: 'Low Risk', mortality: 'Low risk of in-hospital mortality. Does NOT exclude sepsis — qSOFA has low sensitivity.', colorVar: '--color-primary' },
        { min: 2, max: Infinity, label: 'Score ≥ 2', risk: 'High Risk', mortality: '3-14x increased risk of in-hospital mortality. Evaluate for organ dysfunction (full SOFA) and initiate sepsis workup.', colorVar: '--color-danger' },
    ],
    thresholdNote: 'qSOFA ≥ 2 associated with poor outcomes. Low sensitivity for sepsis screening — do NOT use as sole screening tool (SSC 2021).',
    citations: [
        'Seymour CW, et al. Assessment of Clinical Criteria for Sepsis: For the Third International Consensus Definitions (Sepsis-3). JAMA. 2016;315(8):762-774.',
        'Evans L, et al. Surviving Sepsis Campaign Guidelines 2021. Crit Care Med. 2021;49(11):e1063.',
    ],
};
// -------------------------------------------------------------------
// MAP Calculator
// -------------------------------------------------------------------
const MAP_CALCULATOR = {
    id: 'map-calculator',
    title: 'Mean Arterial Pressure (MAP)',
    subtitle: 'Perfusion Pressure Target',
    description: 'Calculates MAP from systolic and diastolic blood pressure. MAP = (SBP + 2×DBP) / 3. Target MAP ≥65 mmHg in septic shock (SSC 2021). Individualize within 60-70 mmHg range based on patient factors.',
    fields: [
        { name: 'sbp', label: 'Systolic BP', type: 'number', points: 0, valueIsPoints: true, unit: 'mmHg' },
        { name: 'dbp', label: 'Diastolic BP', type: 'number', points: 0, valueIsPoints: true, unit: 'mmHg' },
    ],
    results: [],
    thresholdNote: 'Target MAP ≥65 mmHg for septic shock. Consider 60-65 in elderly (65-Trial) or 80-85 for chronic HTN (SEPSISPAM). DBP <40 suggests vasoplegia.',
    citations: [
        'Evans L, et al. Surviving Sepsis Campaign Guidelines 2021. Crit Care Med. 2021;49(11):e1063.',
        'Lamontagne F, et al. Effect of Reduced Exposure to Vasopressors on 90-Day Mortality (65-Trial). JAMA. 2020;323(10):938-949.',
        'Asfar P, et al. High versus Low BP Target in Septic Shock (SEPSISPAM). NEJM. 2014;370(17):1583-1593.',
    ],
    computeResult: (values) => {
        const sbp = values['sbp'] || 0;
        const dbp = values['dbp'] || 0;
        if (sbp <= 0 || dbp <= 0) {
            return { value: '--', label: 'Enter values', description: 'Enter systolic and diastolic blood pressure to calculate MAP.', colorVar: '--color-text-muted' };
        }
        if (dbp >= sbp) {
            return { value: '--', label: 'Invalid', description: 'Diastolic BP must be less than systolic BP.', colorVar: '--color-text-muted' };
        }
        const map = Math.round(((sbp + 2 * dbp) / 3) * 10) / 10;
        const pp = sbp - dbp;
        let label;
        let colorVar;
        let desc;
        if (map < 60) {
            label = 'Critical Hypotension';
            colorVar = '--color-danger';
            desc = `MAP = (${sbp} + 2×${dbp}) / 3 = ${map} mmHg\nPulse pressure: ${pp} mmHg\n\n⚠️ MAP <60 mmHg — severe hypoperfusion risk. Initiate or escalate vasopressors immediately.`;
        }
        else if (map < 65) {
            label = 'Below Target';
            colorVar = '--color-warning';
            desc = `MAP = (${sbp} + 2×${dbp}) / 3 = ${map} mmHg\nPulse pressure: ${pp} mmHg\n\nBelow standard sepsis target (≥65). May be acceptable in select patients (65-Trial).`;
        }
        else if (map <= 70) {
            label = 'At Target';
            colorVar = '--color-primary';
            desc = `MAP = (${sbp} + 2×${dbp}) / 3 = ${map} mmHg\nPulse pressure: ${pp} mmHg\n\nWithin target range for septic shock resuscitation (65-70 mmHg).`;
        }
        else {
            label = 'Above Target';
            colorVar = '--color-primary';
            desc = `MAP = (${sbp} + 2×${dbp}) / 3 = ${map} mmHg\nPulse pressure: ${pp} mmHg\n\nAbove standard target. Consider vasopressor reduction if on pressors. Higher targets (80-85) may benefit chronic HTN patients.`;
        }
        if (dbp < 40) {
            desc += '\n\n⚠️ DBP <40 mmHg strongly suggests vasoplegia — initiate vasopressor if not already started.';
        }
        if (pp < 40) {
            desc += `\n\n⚠️ Narrow pulse pressure (${pp} mmHg) may suggest low stroke volume — consider POCUS and inotrope assessment.`;
        }
        return { value: `${map} mmHg`, label, description: desc, colorVar };
    },
};
// -------------------------------------------------------------------
// Meningitis Empiric Antibiotics Calculator
// -------------------------------------------------------------------
const MENING_ABX_CALCULATOR = {
    id: 'mening-abx',
    title: 'Meningitis Empiric Abx',
    subtitle: 'Age & Risk-Based Antimicrobial Regimens',
    description: 'Provides exact empiric antibiotic dosing for suspected bacterial meningitis based on age, risk factors, and comorbidities. Includes pediatric regimens.',
    fields: [
        {
            name: 'age-group',
            label: 'Age Group',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Neonate (0-28 days)', points: 1 },
                { label: 'Infant (1-23 months)', points: 2 },
                { label: 'Child (2-17 years)', points: 3 },
                { label: 'Adult 18-49 years', points: 4 },
                { label: 'Adult ≥50 years', points: 5 },
            ],
        },
        {
            name: 'weight',
            label: 'Weight',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'kg',
            description: 'For weight-based dosing',
        },
        {
            name: 'immunocompromised',
            label: 'Immunocompromised?',
            type: 'toggle',
            points: 1,
            description: 'HIV, transplant, immunosuppressants, cancer',
        },
        {
            name: 'pregnant',
            label: 'Pregnant?',
            type: 'toggle',
            points: 1,
            description: '10-20× increased Listeria risk',
        },
        {
            name: 'healthcare-associated',
            label: 'Healthcare-Associated?',
            type: 'toggle',
            points: 1,
            description: 'Recent neurosurgery, shunts, CSF leak, basilar skull fx',
        },
        {
            name: 'encephalitis',
            label: 'Encephalitis Features?',
            type: 'toggle',
            points: 1,
            description: 'Focal deficits, seizures, personality changes',
        },
        {
            name: 'pcn-allergy',
            label: 'Penicillin Allergy?',
            type: 'toggle',
            points: 1,
            description: 'Severe/anaphylactic reaction',
        },
    ],
    results: [],
    thresholdNote: 'Give antibiotics within 1 HOUR of suspicion. Give dexamethasone WITH or up to 15-20 min BEFORE first antibiotic dose.',
    citations: [
        'van de Beek D, et al. ESCMID guideline: diagnosis and treatment of acute bacterial meningitis. Clin Microbiol Infect. 2016;22:S37-S62.',
        'Tunkel AR, et al. Practice guidelines for the management of bacterial meningitis. Clin Infect Dis. 2004;39(9):1267-1284.',
        'AAP Red Book 2024.',
    ],
    computeResult: (values) => {
        const ageGroup = values['age-group'] || 0;
        const weight = values['weight'] || 0;
        const immuno = values['immunocompromised'] || 0;
        const pregnant = values['pregnant'] || 0;
        const hcAssoc = values['healthcare-associated'] || 0;
        const enceph = values['encephalitis'] || 0;
        const pcnAllergy = values['pcn-allergy'] || 0;
        if (ageGroup === 0) {
            return {
                value: '—',
                label: 'Select Age Group',
                description: 'Select patient age group to generate empiric regimen.',
                colorVar: '--color-text-secondary',
            };
        }
        let drugs = [];
        let targets = '';
        let notes = [];
        const needsListeria = ageGroup === 1 || ageGroup === 5 || immuno === 1 || pregnant === 1;
        // Healthcare-associated takes priority
        if (hcAssoc === 1) {
            targets = 'MRSA, Pseudomonas, gram-negatives';
            if (weight > 0) {
                const vancDose = Math.round(weight * 17.5);
                drugs.push(`Vancomycin ${vancDose} mg IV q8-12h (15-20 mg/kg)`);
            }
            else {
                drugs.push('Vancomycin 15-20 mg/kg IV q8-12h');
            }
            drugs.push('Meropenem 2 g IV q8h (or Cefepime 2 g IV q8h)');
            notes.push('Covers MRSA + Pseudomonas + resistant gram-negatives');
            notes.push('CSF lactate is particularly useful — postop inflammation does NOT affect lactate');
        }
        // Neonates (0-28 days)
        else if (ageGroup === 1) {
            targets = 'GBS, E. coli, Listeria, HSV';
            if (weight > 0) {
                const ampDose = Math.round(weight * 100);
                const cefoDose = Math.round(weight * 50);
                const acycDose = Math.round(weight * 20);
                drugs.push(`Ampicillin ${ampDose} mg IV q6h (100 mg/kg/dose)`);
                drugs.push(`Cefotaxime ${cefoDose} mg IV q6h (50 mg/kg/dose) OR Gentamicin 4-5 mg/kg IV q24h`);
                drugs.push(`Acyclovir ${acycDose} mg IV q8h (20 mg/kg/dose) — HSV coverage`);
            }
            else {
                drugs.push('Ampicillin 100 mg/kg IV q6h');
                drugs.push('Cefotaxime 50 mg/kg IV q6h OR Gentamicin 4-5 mg/kg IV q24h');
                drugs.push('Acyclovir 20 mg/kg IV q8h — HSV coverage');
            }
            notes.push('⚠️ Use CEFOTAXIME, not ceftriaxone, in neonates (bilirubin displacement)');
            notes.push('HSV encephalitis is common in neonates — always cover');
        }
        // Infants (1-23 months)
        else if (ageGroup === 2) {
            targets = 'S. pneumoniae, N. meningitidis, H. influenzae, Listeria (if <3 mo)';
            if (weight > 0) {
                const ctrxDose = Math.round(weight * 50);
                const vancDose = Math.round(weight * 15);
                drugs.push(`Ceftriaxone ${ctrxDose} mg IV q12h (50 mg/kg/dose, max 2g)`);
                drugs.push(`Vancomycin ${vancDose} mg IV q6h (15 mg/kg/dose)`);
                if (ageGroup === 2 && weight < 10) { // <3 months proxy
                    const ampDose = Math.round(weight * 75);
                    drugs.push(`Ampicillin ${ampDose} mg IV q6h (75 mg/kg/dose) — Listeria coverage if <3 months`);
                }
            }
            else {
                drugs.push('Ceftriaxone 50 mg/kg IV q12h (max 2 g/dose)');
                drugs.push('Vancomycin 15 mg/kg IV q6h');
                drugs.push('Consider Ampicillin 75 mg/kg IV q6h if <3 months (Listeria)');
            }
            notes.push('Dexamethasone 0.15 mg/kg IV q6h × 2-4 days — give BEFORE or WITH antibiotics');
        }
        // Children (2-17 years)
        else if (ageGroup === 3) {
            targets = 'S. pneumoniae, N. meningitidis';
            if (weight > 0) {
                const ctrxDose = Math.min(Math.round(weight * 50), 2000);
                const vancDose = Math.round(weight * 15);
                const dexDose = Math.round(weight * 0.15 * 10) / 10;
                drugs.push(`Ceftriaxone ${ctrxDose} mg IV q12h (50 mg/kg, max 2g)`);
                drugs.push(`Vancomycin ${vancDose} mg IV q6h (15 mg/kg)`);
                drugs.push(`Dexamethasone ${dexDose} mg IV q6h × 2-4 days`);
            }
            else {
                drugs.push('Ceftriaxone 50 mg/kg IV q12h (max 2 g/dose)');
                drugs.push('Vancomycin 15 mg/kg IV q6h');
                drugs.push('Dexamethasone 0.15 mg/kg IV q6h × 2-4 days');
            }
        }
        // Adult 18-49
        else if (ageGroup === 4 && !needsListeria) {
            targets = 'S. pneumoniae, N. meningitidis';
            drugs.push('Ceftriaxone 2 g IV q12h');
            if (weight > 0) {
                const vancDose = Math.round(weight * 17.5);
                drugs.push(`Vancomycin ${vancDose} mg IV q8-12h (15-20 mg/kg)`);
                const dexDose = Math.round(weight * 0.15 * 10) / 10;
                drugs.push(`Dexamethasone ${dexDose} mg IV q6h × 2-4 days`);
            }
            else {
                drugs.push('Vancomycin 15-20 mg/kg IV q8-12h');
                drugs.push('Dexamethasone 0.15 mg/kg IV q6h × 2-4 days');
            }
        }
        // Adult ≥50 or Listeria risk
        else {
            targets = 'S. pneumoniae, N. meningitidis, L. monocytogenes';
            drugs.push('Ceftriaxone 2 g IV q12h');
            if (weight > 0) {
                const vancDose = Math.round(weight * 17.5);
                drugs.push(`Vancomycin ${vancDose} mg IV q8-12h (15-20 mg/kg)`);
                const dexDose = Math.round(weight * 0.15 * 10) / 10;
                drugs.push(`Dexamethasone ${dexDose} mg IV q6h × 2-4 days`);
            }
            else {
                drugs.push('Vancomycin 15-20 mg/kg IV q8-12h');
                drugs.push('Dexamethasone 0.15 mg/kg IV q6h × 2-4 days');
            }
            if (pcnAllergy === 1) {
                drugs.push('Meropenem 2 g IV q8h (replaces ceftriaxone + covers Listeria)');
                notes.push('Meropenem covers Listeria — ampicillin not needed');
            }
            else {
                drugs.push('Ampicillin 2 g IV q4h — Listeria coverage');
            }
            if (pregnant === 1) {
                notes.push('⚠️ Pregnant: 10-20× increased Listeria risk');
            }
            if (immuno === 1) {
                notes.push('⚠️ Immunocompromised: expanded pathogen coverage essential');
            }
        }
        // Add acyclovir for encephalitis
        if (enceph === 1) {
            if (weight > 0) {
                const acycDose = Math.round(weight * 10);
                drugs.push(`Acyclovir ${acycDose} mg IV q8h (10 mg/kg) — HSV encephalitis`);
            }
            else {
                drugs.push('Acyclovir 10 mg/kg IV q8h — HSV encephalitis');
            }
            notes.push('HSV encephalitis mortality: 70% untreated → 9% with acyclovir');
        }
        // PCN allergy notes
        if (pcnAllergy === 1 && ageGroup !== 5 && !needsListeria && hcAssoc !== 1) {
            notes.push('For severe PCN allergy: Meropenem 2 g IV q8h can replace ceftriaxone');
        }
        let desc = `**Targets:** ${targets}\n\n**REGIMEN:**\n`;
        drugs.forEach(d => { desc += `• ${d}\n`; });
        if (notes.length > 0) {
            desc += '\n**NOTES:**\n';
            notes.forEach(n => { desc += `• ${n}\n`; });
        }
        desc += '\n⏱️ Give antibiotics within 1 HOUR of suspicion — delays increase mortality.';
        return {
            value: drugs.length + ' drugs',
            label: 'Empiric Regimen',
            description: desc,
            colorVar: '--color-primary',
        };
    },
};
// -------------------------------------------------------------------
// LP Interpretation Calculator
// -------------------------------------------------------------------
const LP_INTERP_CALCULATOR = {
    id: 'lp-interp',
    title: 'LP Interpretation',
    subtitle: 'CSF Pattern Analysis for CNS Infections',
    description: 'Analyzes CSF values to determine bacterial vs viral vs fungal meningitis pattern. Includes key biomarkers and diagnostic guidance.',
    fields: [
        {
            name: 'wbc',
            label: 'CSF WBC Count',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'cells/μL',
            description: 'Normal: <5 cells/μL',
        },
        {
            name: 'neutrophils',
            label: 'Neutrophil %',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: '%',
            description: 'Predominant cell type',
        },
        {
            name: 'csf-glucose',
            label: 'CSF Glucose',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'mg/dL',
            description: 'Normal: 40-70 mg/dL',
        },
        {
            name: 'serum-glucose',
            label: 'Serum Glucose',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'mg/dL',
            description: 'For CSF:serum ratio',
        },
        {
            name: 'protein',
            label: 'CSF Protein',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'mg/dL',
            description: 'Normal: <50 mg/dL',
        },
        {
            name: 'lactate',
            label: 'CSF Lactate',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'mg/dL',
            description: 'Normal: <35 mg/dL. Key discriminator.',
        },
        {
            name: 'opening-pressure',
            label: 'Opening Pressure',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'cm H₂O',
            description: 'Normal: <20 cm H₂O',
        },
        {
            name: 'gram-stain',
            label: 'Gram Stain Result',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Not yet available', points: 0 },
                { label: 'Negative', points: 1 },
                { label: 'Gram-positive cocci', points: 2 },
                { label: 'Gram-negative diplococci', points: 3 },
                { label: 'Gram-positive rods', points: 4 },
                { label: 'Gram-negative rods', points: 5 },
            ],
        },
    ],
    results: [],
    thresholdNote: '6% of culture-proven bacterial meningitis cases have NO elevated WBC. 10% have lymphocyte-predominant CSF. When in doubt, treat as bacterial.',
    citations: [
        'Costerus JM, et al. Community-acquired bacterial meningitis. Curr Opin Infect Dis. 2017;30(1):135-141.',
        'Sakushima K, et al. CSF lactate for differentiating bacterial from aseptic meningitis: meta-analysis. J Infect. 2011;62(4):255-262.',
        'van de Beek D, et al. Clinical features and prognostic factors in adults with bacterial meningitis. NEJM. 2004;351(18):1849-1859.',
    ],
    computeResult: (values) => {
        const wbc = values['wbc'] ?? -1;
        const neut = values['neutrophils'] ?? -1;
        const csfGluc = values['csf-glucose'] ?? -1;
        const serumGluc = values['serum-glucose'] ?? -1;
        const protein = values['protein'] ?? -1;
        const lactate = values['lactate'] ?? -1;
        const op = values['opening-pressure'] ?? -1;
        const gram = values['gram-stain'] || 0;
        // Need at least WBC to interpret
        if (wbc < 0) {
            return {
                value: '—',
                label: 'Enter CSF Values',
                description: 'Enter CSF WBC count and other values for pattern analysis.',
                colorVar: '--color-text-secondary',
            };
        }
        // Calculate CSF:serum glucose ratio
        let glucRatio = -1;
        if (csfGluc > 0 && serumGluc > 0) {
            glucRatio = Math.round((csfGluc / serumGluc) * 100) / 100;
        }
        // Scoring for bacterial likelihood
        let bacterialPoints = 0;
        let viralPoints = 0;
        let fungalPoints = 0;
        const findings = [];
        // WBC analysis
        if (wbc < 5) {
            findings.push(`WBC: ${wbc} cells/μL — NORMAL`);
            viralPoints += 1;
        }
        else if (wbc >= 5 && wbc < 100) {
            findings.push(`WBC: ${wbc} cells/μL — mildly elevated (5-100)`);
            viralPoints += 1;
        }
        else if (wbc >= 100 && wbc < 1000) {
            findings.push(`WBC: ${wbc} cells/μL — moderately elevated`);
            bacterialPoints += 1;
        }
        else if (wbc >= 1000) {
            findings.push(`WBC: ${wbc} cells/μL — highly elevated (bacterial typical: 1000-5000)`);
            bacterialPoints += 2;
        }
        // Neutrophil predominance
        if (neut >= 0) {
            if (neut >= 80) {
                findings.push(`Neutrophils: ${neut}% — NEUTROPHIL predominant (bacterial pattern)`);
                bacterialPoints += 2;
            }
            else if (neut >= 50) {
                findings.push(`Neutrophils: ${neut}% — mixed cellularity`);
                bacterialPoints += 1;
            }
            else {
                findings.push(`Neutrophils: ${neut}% — LYMPHOCYTE predominant (viral/fungal pattern)`);
                viralPoints += 1;
                fungalPoints += 1;
            }
        }
        // CSF:serum glucose ratio
        if (glucRatio > 0) {
            if (glucRatio > 0.67) {
                findings.push(`CSF:serum glucose ratio: ${glucRatio} — NORMAL (>0.67)`);
                viralPoints += 1;
            }
            else if (glucRatio >= 0.36 && glucRatio <= 0.67) {
                findings.push(`CSF:serum glucose ratio: ${glucRatio} — mildly decreased`);
                bacterialPoints += 1;
            }
            else if (glucRatio < 0.36) {
                findings.push(`CSF:serum glucose ratio: ${glucRatio} — SIGNIFICANTLY LOW (<0.36, bacterial/fungal)`);
                bacterialPoints += 2;
                fungalPoints += 2;
            }
        }
        else if (csfGluc > 0) {
            if (csfGluc < 40) {
                findings.push(`CSF glucose: ${csfGluc} mg/dL — LOW (bacterial/fungal pattern)`);
                bacterialPoints += 1;
                fungalPoints += 1;
            }
            else {
                findings.push(`CSF glucose: ${csfGluc} mg/dL — normal range`);
            }
        }
        // Protein
        if (protein >= 0) {
            if (protein < 50) {
                findings.push(`CSF protein: ${protein} mg/dL — NORMAL (<50)`);
            }
            else if (protein >= 50 && protein < 135) {
                findings.push(`CSF protein: ${protein} mg/dL — mildly elevated`);
                viralPoints += 1;
            }
            else if (protein >= 135) {
                findings.push(`CSF protein: ${protein} mg/dL — ELEVATED (>135, bacterial pattern)`);
                bacterialPoints += 2;
            }
        }
        // Lactate — best discriminator
        if (lactate >= 0) {
            if (lactate < 35) {
                findings.push(`CSF lactate: ${lactate} mg/dL — NORMAL (<35, favors viral)`);
                viralPoints += 2;
            }
            else if (lactate >= 35) {
                findings.push(`CSF lactate: ${lactate} mg/dL — ELEVATED (≥35, 93% sens / 97% spec for BACTERIAL)`);
                bacterialPoints += 3;
            }
        }
        // Opening pressure
        if (op >= 0) {
            if (op < 20) {
                findings.push(`Opening pressure: ${op} cm H₂O — NORMAL (<20)`);
            }
            else if (op >= 20 && op < 40) {
                findings.push(`Opening pressure: ${op} cm H₂O — elevated`);
                bacterialPoints += 1;
            }
            else if (op >= 40) {
                findings.push(`Opening pressure: ${op} cm H₂O — MARKEDLY ELEVATED (39% of bacterial meningitis)`);
                bacterialPoints += 2;
                fungalPoints += 2;
            }
        }
        // Gram stain
        if (gram >= 2) {
            bacterialPoints += 5; // Definitive
            const organisms = {
                2: 'Gram-positive cocci (S. pneumoniae, S. aureus)',
                3: 'Gram-negative diplococci (N. meningitidis)',
                4: 'Gram-positive rods (L. monocytogenes)',
                5: 'Gram-negative rods (E. coli, Klebsiella, Pseudomonas)',
            };
            findings.push(`Gram stain: ${organisms[gram]} — BACTERIAL CONFIRMED`);
        }
        else if (gram === 1) {
            findings.push('Gram stain: Negative (does NOT exclude bacterial — 60-99% sensitivity)');
        }
        // Determine pattern
        let pattern;
        let label;
        let colorVar;
        let guidance;
        if (gram >= 2) {
            pattern = 'BACTERIAL — CONFIRMED';
            label = 'Bacterial Meningitis';
            colorVar = '--color-danger';
            guidance = 'Continue empiric antibiotics. Tailor based on sensitivities. Continue dexamethasone if S. pneumoniae.';
        }
        else if (bacterialPoints >= 5) {
            pattern = 'HIGH PROBABILITY BACTERIAL';
            label = 'Bacterial Pattern';
            colorVar = '--color-danger';
            guidance = 'Continue empiric antibiotics pending cultures/PCR. Continue dexamethasone. Admit to ICU or monitored bed.';
        }
        else if (bacterialPoints >= 3 && bacterialPoints > viralPoints) {
            pattern = 'CONCERNING FOR BACTERIAL';
            label = 'Indeterminate — Treat as Bacterial';
            colorVar = '--color-warning';
            guidance = '6% of bacterial meningitis has normal WBC. 10% has lymphocyte predominance. TREAT AS BACTERIAL until cultures negative. Continue dexamethasone.';
        }
        else if (fungalPoints >= 4) {
            pattern = 'FUNGAL PATTERN';
            label = 'Suspect Fungal';
            colorVar = '--color-warning';
            guidance = 'Lymphocyte predominant + very low glucose + elevated OP = fungal pattern. Send CSF CrAg. ID consultation for antifungal therapy. Do NOT give corticosteroids.';
        }
        else if (viralPoints >= 3 && bacterialPoints < 2) {
            pattern = 'VIRAL PATTERN';
            label = 'Probable Viral';
            colorVar = '--color-primary';
            guidance = 'Lymphocyte predominant, normal/mild glucose decrease, normal lactate = viral pattern. Add acyclovir if ANY encephalitis features. May be appropriate for discharge if nontoxic and symptoms controlled.';
        }
        else {
            pattern = 'EQUIVOCAL';
            label = 'Equivocal — Treat as Bacterial';
            colorVar = '--color-warning';
            guidance = 'Pattern does not clearly fit one category. TREAT AS BACTERIAL until cultures negative. Early bacterial meningitis may mimic viral patterns.';
        }
        let desc = `**PATTERN:** ${pattern}\n\n**FINDINGS:**\n`;
        findings.forEach(f => { desc += `• ${f}\n`; });
        desc += `\n**GUIDANCE:** ${guidance}`;
        return {
            value: pattern,
            label,
            description: desc,
            colorVar,
        };
    },
};
// -------------------------------------------------------------------
// Calculator Registry
// -------------------------------------------------------------------
// AUB TREATMENT CALCULATOR
// -------------------------------------------------------------------
const AUB_TREATMENT_CALCULATOR = {
    id: 'aub-treatment',
    title: 'AUB Treatment Selector',
    subtitle: 'Evidence-Based Medical Management for Acute Uterine Bleeding',
    description: 'Recommends optimal medical therapy for acute abnormal uterine bleeding based on hemodynamic status, bleeding severity, age, comorbidities, and contraindications. All regimens require pregnancy exclusion.',
    fields: [
        {
            name: 'hemodynamic',
            label: 'Hemodynamic Status',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Stable — normal vitals', points: 1 },
                { label: 'Unstable — tachycardia, hypotension, or orthostasis', points: 2 },
            ],
        },
        {
            name: 'bleeding-severity',
            label: 'Bleeding Severity',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Moderate — concerning but not heavy/active', points: 1 },
                { label: 'Heavy/Active — soaking pads rapidly', points: 2 },
            ],
        },
        {
            name: 'age',
            label: 'Age',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'years',
            description: 'For endometrial cancer risk assessment',
        },
        {
            name: 'obesity',
            label: 'Obesity / PCOS',
            type: 'toggle',
            points: 1,
            description: 'Anovulation likely — progesterone-based therapy preferred',
        },
        {
            name: 'vte-history',
            label: 'VTE/PE History',
            type: 'toggle',
            points: 1,
            description: 'History of DVT, PE, or known thrombophilia',
        },
        {
            name: 'migraine-aura',
            label: 'Migraine with Aura',
            type: 'toggle',
            points: 1,
            description: 'Estrogen contraindicated',
        },
        {
            name: 'smoker',
            label: 'Smoker Age ≥35',
            type: 'toggle',
            points: 1,
            description: 'Estrogen contraindicated in smoker ≥35',
        },
        {
            name: 'liver-disease',
            label: 'Active Liver Disease',
            type: 'toggle',
            points: 1,
            description: 'Severe hepatic dysfunction',
        },
        {
            name: 'breast-cancer',
            label: 'Current/Past Breast Cancer',
            type: 'toggle',
            points: 1,
            description: 'Estrogen contraindicated',
        },
        {
            name: 'coagulopathy',
            label: 'Known Coagulopathy',
            type: 'toggle',
            points: 1,
            description: 'vWD or other bleeding disorder — TXA beneficial',
        },
    ],
    results: [],
    thresholdNote: 'All hormonal therapies require pregnancy exclusion (hCG negative). Consult ACOG Committee Opinion 557.',
    citations: [
        'ACOG Committee Opinion No. 557. Management of Acute Abnormal Uterine Bleeding in Nonpregnant Reproductive-Aged Women. Obstet Gynecol. 2013;121(4):891-896.',
        'Munro MG, Mainor N, Basu R. Oral medroxyprogesterone acetate and combination oral contraceptives for acute uterine bleeding: a randomized controlled trial. Obstet Gynecol. 2006;108:924-929.',
        'DeVore GR, Owens O, Kase N. Use of intravenous Premarin in the treatment of dysfunctional uterine bleeding. Obstet Gynecol. 1982;59(3):285-291.',
    ],
    computeResult: (values) => {
        const hemodynamic = values['hemodynamic'] || 0;
        const severity = values['bleeding-severity'] || 0;
        const age = values['age'] || 0;
        const obesity = values['obesity'] || 0;
        const vte = values['vte-history'] || 0;
        const migraine = values['migraine-aura'] || 0;
        const smoker = values['smoker'] || 0;
        const liver = values['liver-disease'] || 0;
        const breastCa = values['breast-cancer'] || 0;
        const coag = values['coagulopathy'] || 0;
        if (hemodynamic === 0 || severity === 0) {
            return {
                value: '—',
                label: 'Complete Required Fields',
                description: 'Select hemodynamic status and bleeding severity to generate treatment recommendation.',
                colorVar: '--color-text-secondary',
            };
        }
        // Check estrogen contraindications
        const estrogenContraindicated = vte === 1 || migraine === 1 || smoker === 1 || liver === 1 || breastCa === 1;
        let regimen = '';
        let dosing = '';
        let efficacy = '';
        let notes = [];
        let colorVar = '--color-text-secondary';
        // UNSTABLE → IV Conjugated Estrogen (Premarin)
        if (hemodynamic === 2) {
            if (estrogenContraindicated) {
                regimen = 'Tranexamic Acid + Medroxyprogesterone + GYN Consult';
                dosing = '• TXA: 10 mg/kg IV (max 600 mg) q8h\n• MPA: 20 mg PO TID × 7 days (when able to tolerate PO)\n• EMERGENT GYN CONSULT — consider intrauterine tamponade';
                efficacy = 'TXA reduces bleeding 30-55%; MPA 76% efficacy when stable';
                colorVar = '--color-critical';
                notes.push('⚠️ UNSTABLE + ESTROGEN CONTRAINDICATED — limited options');
                notes.push('2 large-bore IVs, crystalloid bolus, type & crossmatch');
                notes.push('Intrauterine tamponade: 26F Foley with 30 mL saline in uterine cavity');
                notes.push('May need procedural intervention (D&C, embolization)');
            }
            else {
                regimen = 'IV Conjugated Estrogen (Premarin)';
                dosing = '• Premarin 25 mg IV q4-6h × max 24h (max 6 doses)\n• Ondansetron 4-8 mg IV prophylactically (significant nausea)\n• MUST follow with MPA 10 mg PO daily × 10 days after bleeding controlled';
                efficacy = '72% stop bleeding within 8 hours — ONLY FDA-approved therapy for acute AUB';
                colorVar = '--color-critical';
                notes.push('⚠️ HEMODYNAMICALLY UNSTABLE');
                notes.push('2 large-bore IVs, crystalloid bolus, type & crossmatch');
                notes.push('Emergent GYN consult');
                notes.push('Unopposed estrogen risks endometrial hyperplasia — progestin follow-up mandatory');
                if (coag === 1) {
                    notes.push('🧪 COAGULOPATHY: Add TXA 10 mg/kg IV q8h as adjunct');
                }
            }
        }
        // STABLE + HEAVY ACTIVE BLEEDING
        else if (severity === 2) {
            if (estrogenContraindicated) {
                regimen = 'Medroxyprogesterone Acetate (MPA)';
                dosing = '• MPA 20 mg PO TID × 7 days\n• Add TXA 1.3 g PO TID × 5 days for more rapid hemostasis';
                efficacy = '76% stop bleeding within median 3 days';
                colorVar = '--color-urgent';
                notes.push('🚫 Estrogen contraindicated — progestin-only regimen');
                if (obesity === 1) {
                    notes.push('💡 EXCELLENT choice for obesity/PCOS — anovulation is likely mechanism');
                }
                if (coag === 1) {
                    notes.push('🧪 COAGULOPATHY: TXA is ESSENTIAL adjunct (reduces bleeding 30-55%)');
                }
                notes.push('Iron supplementation: Ferrous sulfate 325 mg PO daily');
            }
            else {
                // Heavy bleeding + no estrogen contraindications → OCPs preferred over IV estrogen if stable
                regimen = 'Combined Oral Contraceptive (High-Dose Taper)';
                dosing = '• Monophasic OCP (35 mcg ethinyl estradiol): 1 tablet TID × 7 days\n• Then taper to 1 tablet daily for cycle regulation\n• Add TXA 1.3 g PO TID × 5 days for more rapid control';
                efficacy = '88% stop bleeding within median 3 days';
                colorVar = '--color-urgent';
                notes.push('Preferred for ovulatory dysfunction AUB (most common cause)');
                notes.push('Provides both acute control and long-term cycle regulation');
                if (coag === 1) {
                    notes.push('🧪 COAGULOPATHY: TXA adjunct reduces bleeding 30-55%');
                    notes.push('⚠️ Caution: Additive thrombotic risk with OCP + TXA (use clinical judgment)');
                }
                if (obesity === 1) {
                    notes.push('💡 PCOS/Obesity: OCPs reduce endometrial hyperplasia risk long-term');
                }
                notes.push('Iron supplementation if anemic');
            }
        }
        // STABLE + MODERATE BLEEDING
        else {
            if (estrogenContraindicated) {
                regimen = 'Medroxyprogesterone Acetate (MPA) ± TXA';
                dosing = '• MPA 20 mg PO TID × 7 days\n• Optional: TXA 1.3 g PO TID × 5 days if more rapid control needed';
                efficacy = '76% stop bleeding within median 3 days';
                colorVar = '--color-warning';
                notes.push('🚫 Estrogen contraindicated — progestin-only regimen');
                if (obesity === 1) {
                    notes.push('💡 EXCELLENT choice for obesity/PCOS');
                }
                if (coag === 1) {
                    notes.push('🧪 COAGULOPATHY: Add TXA (reduces bleeding 30-55%)');
                }
            }
            else {
                regimen = 'Combined Oral Contraceptive (Standard Taper)';
                dosing = '• Monophasic OCP (35 mcg ethinyl estradiol): 1 tablet TID × 7 days\n• Then taper to 1 tablet daily for cycle regulation';
                efficacy = '88% stop bleeding within median 3 days';
                colorVar = '--color-warning';
                notes.push('First-line for moderate AUB with no estrogen contraindications');
                notes.push('Provides cycle regulation as well as acute control');
                if (coag === 1) {
                    notes.push('🧪 COAGULOPATHY: Consider adding TXA 1.3 g PO TID × 5 days');
                }
                if (obesity === 1) {
                    notes.push('💡 PCOS/Obesity: Long-term OCPs reduce endometrial cancer risk');
                }
            }
        }
        // Age-based endometrial biopsy guidance
        if (age >= 45) {
            notes.push(`🔬 AGE ≥45: Endometrial biopsy INDICATED per ACOG (rule out hyperplasia/malignancy)`);
            notes.push('Arrange urgent GYN follow-up for biopsy within 1-2 weeks');
        }
        else if (age > 0 && age < 45 && (obesity === 1 || severity === 2)) {
            notes.push('🔬 Consider endometrial biopsy: Age <45 with obesity/PCOS or persistent AUB');
        }
        // Disposition guidance
        const disposition = hemodynamic === 2 ? 'ADMIT' : (severity === 2 ? 'Consider admission vs close GYN follow-up' : 'Discharge with GYN follow-up in 1-2 weeks');
        notes.push(`📋 Disposition: ${disposition}`);
        // Return precautions
        notes.push('⚠️ Return if: soaking >1 pad/hour × 2+ hours, lightheadedness, syncope, fever');
        const fullDescription = `**Recommended Regimen:**\n\n${dosing}\n\n**Efficacy:** ${efficacy}\n\n**Clinical Guidance:**\n${notes.map(n => `• ${n}`).join('\n')}`;
        return {
            value: regimen,
            label: regimen,
            description: fullDescription,
            colorVar,
        };
    },
};
// -------------------------------------------------------------------
// PE TREATMENT CALCULATOR
// -------------------------------------------------------------------
const PE_TREATMENT_CALCULATOR = {
    id: 'pe-treatment',
    title: 'PE Treatment Selector',
    subtitle: 'Risk-Stratified Anticoagulation for Acute Pulmonary Embolism',
    description: 'Recommends optimal anticoagulation regimen for acute PE based on hemodynamic status, RV dysfunction, biomarkers, renal function, and patient-specific factors. Follows 2019 ESC Guidelines and 2021 CHEST Guidelines.',
    fields: [
        {
            name: 'hemodynamic',
            label: 'Hemodynamic Status',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Massive PE — hypotension/shock/arrest', points: 3 },
                { label: 'Submassive PE — normotensive with RV strain/biomarkers', points: 2 },
                { label: 'Low-Risk PE — normal hemodynamics, no RV dysfunction', points: 1 },
            ],
        },
        {
            name: 'rv-dysfunction',
            label: 'RV Dysfunction on Echo/CT',
            type: 'toggle',
            points: 1,
            description: 'RV/LV ratio >0.9, McConnell sign, TAPSE <16mm',
        },
        {
            name: 'elevated-biomarkers',
            label: 'Elevated Troponin or BNP',
            type: 'toggle',
            points: 1,
            description: 'Elevated troponin AND/OR BNP/NT-proBNP',
        },
        {
            name: 'pesi',
            label: 'PESI/sPESI Score',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Not calculated', points: 0 },
                { label: 'PESI Class I-II or sPESI = 0 (Low-Risk)', points: 1 },
                { label: 'PESI Class III-V or sPESI ≥1 (Higher-Risk)', points: 2 },
            ],
            description: 'Use PESI or sPESI calculator for low-risk patients',
        },
        {
            name: 'crcl',
            label: 'Creatinine Clearance',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'mL/min',
            description: 'For anticoagulant dosing selection',
        },
        {
            name: 'bleeding-risk',
            label: 'High Bleeding Risk',
            type: 'toggle',
            points: 1,
            description: 'Active bleeding, recent surgery, or high bleeding risk',
        },
        {
            name: 'pregnancy',
            label: 'Pregnant',
            type: 'toggle',
            points: 1,
            description: 'DOACs contraindicated — LMWH only',
        },
        {
            name: 'cancer',
            label: 'Cancer-Associated VTE',
            type: 'toggle',
            points: 1,
            description: 'Active malignancy',
        },
        {
            name: 'outpatient-eligible',
            label: 'Outpatient Eligible (Hestia)',
            type: 'toggle',
            points: 1,
            description: 'Stable, no O₂ need, good support, CrCl >30',
        },
    ],
    results: [],
    thresholdNote: 'Risk stratification: Massive (mortality >15%), Submassive-High (3-15%), Submassive-Low (<3%), Low-Risk (<1%). Minimum 3 months anticoagulation.',
    citations: [
        'Konstantinides SV, Meyer G, et al. 2019 ESC Guidelines for the Diagnosis and Management of Acute Pulmonary Embolism. Eur Heart J. 2020;41(4):543-603.',
        'Stevens SM, Woller SC, et al. Antithrombotic Therapy for VTE Disease: Second Update of the CHEST Guideline. CHEST. 2021;160(6):e545-e608.',
        'Jaff MR, McMurtry MS, et al. Management of Massive and Submassive Pulmonary Embolism. Circulation. 2011;123(16):1788-830.',
    ],
    computeResult: (values) => {
        const hemodynamic = values['hemodynamic'] || 0;
        const rvDysfunction = values['rv-dysfunction'] || 0;
        const biomarkers = values['elevated-biomarkers'] || 0;
        const pesi = values['pesi'] || 0;
        const crcl = values['crcl'] || 0;
        const bleedingRisk = values['bleeding-risk'] || 0;
        const pregnancy = values['pregnancy'] || 0;
        const cancer = values['cancer'] || 0;
        const outpatient = values['outpatient-eligible'] || 0;
        if (hemodynamic === 0) {
            return {
                value: '—',
                label: 'Select Hemodynamic Status',
                description: 'Select hemodynamic status to generate treatment recommendation.',
                colorVar: '--color-text-secondary',
            };
        }
        // ========== RISK STRATIFICATION ==========
        // Calculate composite risk score
        let riskCategory = '';
        let colorVar = '--color-text-secondary';
        let disposition = '';
        let needsThrombolysis = false;
        // Determine risk tier
        if (hemodynamic === 3) {
            // MASSIVE PE
            riskCategory = 'MASSIVE PE (High-Risk)';
            colorVar = '--color-critical';
            needsThrombolysis = bleedingRisk === 0; // Only if no bleeding contraindication
            disposition = 'ADMIT ICU — IMMEDIATE INTERVENTION';
        }
        else if (hemodynamic === 2) {
            // SUBMASSIVE PE — further stratify by RV + biomarkers
            const intermHigh = rvDysfunction === 1 && biomarkers === 1;
            if (intermHigh) {
                riskCategory = 'SUBMASSIVE PE — Intermediate-High Risk';
                colorVar = '--color-critical';
                disposition = 'ADMIT ICU — CLOSE MONITORING';
            }
            else {
                riskCategory = 'SUBMASSIVE PE — Intermediate-Low Risk';
                colorVar = '--color-urgent';
                disposition = 'ADMIT (Step-Down Unit)';
            }
        }
        else {
            // LOW-RISK PE — further stratify by PESI
            riskCategory = 'LOW-RISK PE';
            colorVar = '--color-warning';
            if (pesi === 2) {
                disposition = 'ADMIT for 24-48h observation';
            }
            else if (pesi === 1 && outpatient === 1) {
                disposition = 'OUTPATIENT MANAGEMENT';
            }
            else {
                disposition = 'ADMIT for 24-48h observation';
            }
        }
        // ========== DRUG SELECTION (applies across all risk tiers) ==========
        let regimen = '';
        let dosing = '';
        let notes = [];
        // Priority 1: Pregnancy (overrides everything except thrombolysis need)
        if (pregnancy === 1) {
            regimen = 'Enoxaparin (LMWH) — Pregnancy-Safe';
            dosing = '• Enoxaparin: 1 mg/kg SC q12h\n• DO NOT use DOACs (teratogenic)\n• Weight-based dosing throughout pregnancy';
            notes.push('🤰 PREGNANCY — LMWH is ONLY safe option');
            notes.push('Continue throughout pregnancy and 6 weeks postpartum');
            if (needsThrombolysis) {
                dosing = '• UFH: 80 units/kg IV bolus → 18 units/kg/hr\n• ALTEPLASE: 100 mg IV over 2h (use if life-threatening despite pregnancy risk)\n• Pregnancy is RELATIVE contraindication — use clinical judgment';
                notes.push('⚠️ MASSIVE PE in pregnancy — thrombolysis may be necessary despite risk');
            }
        }
        // Priority 2: Severe renal impairment
        else if (crcl > 0 && crcl < 15) {
            regimen = 'UFH (Severe Renal Impairment)';
            dosing = '• UFH: 80 units/kg IV bolus → 18 units/kg/hr infusion\n• Adjust based on aPTT (goal 1.5-2.5× control)\n• Renally independent clearance';
            notes.push('🫘 SEVERE RENAL IMPAIRMENT (CrCl <15) — UFH only safe option');
            if (needsThrombolysis) {
                dosing = '• UFH: 80 units/kg IV bolus → 18 units/kg/hr\n• ALTEPLASE: 100 mg IV over 2h\n• Accelerated (cardiac arrest): 0.6 mg/kg (max 50 mg) over 15 min';
            }
        }
        // Priority 3: Moderate renal impairment
        else if (crcl > 0 && crcl < 30) {
            regimen = 'UFH or Dose-Adjusted LMWH';
            dosing = '• UFH: 80 units/kg IV bolus → 18 units/kg/hr (preferred), OR\n• Enoxaparin: 1 mg/kg SC DAILY (not q12h) for CrCl 15-30\n• Alternative: Apixaban (least renal elimination among DOACs)';
            notes.push('🫘 RENAL IMPAIRMENT (CrCl 15-30) — adjust dosing');
            notes.push('Apixaban may be used cautiously (28% renal excretion)');
            if (needsThrombolysis) {
                regimen = 'UFH + Thrombolysis';
                dosing = '• UFH: 80 units/kg IV bolus → 18 units/kg/hr\n• ALTEPLASE: 100 mg IV over 2h';
            }
        }
        // Priority 4: Massive PE needing thrombolysis
        else if (needsThrombolysis) {
            if (bleedingRisk === 1) {
                regimen = 'UFH + Catheter-Directed Therapy (NO THROMBOLYSIS)';
                dosing = '• UFH: 80 units/kg IV bolus → 18 units/kg/hr\n• EMERGENT INTERVENTIONAL CARDIOLOGY/IR CONSULT\n• Catheter-directed therapy or surgical embolectomy\n• Consider ECMO as bridge in refractory shock';
                notes.push('🚫 HIGH BLEEDING RISK — thrombolysis contraindicated');
            }
            else {
                regimen = 'UFH + Systemic Thrombolysis';
                dosing = '• UFH: 80 units/kg IV bolus → 18 units/kg/hr\n• ALTEPLASE: 100 mg IV over 2h\n• Accelerated (cardiac arrest): 0.6 mg/kg (max 50 mg) over 15 min';
                notes.push('⚠️ MASSIVE PE — thrombolysis INDICATED');
                notes.push('If thrombolysis fails → catheter-directed therapy or embolectomy');
            }
            notes.push('Vasopressor support: Norepinephrine preferred');
            notes.push('Cautious fluids: >500 mL can worsen RV failure');
        }
        // Priority 5: Intermediate-High (rescue thrombolysis ready)
        else if (hemodynamic === 2 && rvDysfunction === 1 && biomarkers === 1) {
            regimen = 'Enoxaparin or UFH + Rescue Thrombolysis Ready';
            dosing = '• Enoxaparin: 1 mg/kg SC q12h (standard), OR\n• UFH: 80 units/kg IV bolus → 18 units/kg/hr (if anticipating escalation)\n• RESCUE THROMBOLYSIS if deterioration: Alteplase 100 mg IV over 2h';
            notes.push('⚠️ BOTH RV dysfunction AND elevated biomarkers — HIGH-RISK');
            notes.push('Mortality 3-15% — watch closely for hemodynamic decompensation');
            notes.push('Consider half-dose alteplase (50 mg) if needed to reduce bleeding risk');
            if (bleedingRisk === 1) {
                notes.push('🚫 High bleeding risk — thrombolysis only if absolutely necessary');
            }
        }
        // Priority 6: Cancer-associated VTE (affects drug choice)
        else if (cancer === 1) {
            if (hemodynamic === 2) {
                // Submassive with cancer → parenteral anticoagulation
                regimen = 'Enoxaparin (LMWH) or UFH';
                dosing = '• Enoxaparin: 1 mg/kg SC q12h, OR\n• UFH: 80 units/kg IV bolus → 18 units/kg/hr if concern for escalation';
            }
            else {
                // Low-risk with cancer → DOAC preferred
                regimen = 'DOAC (Apixaban or Rivaroxaban for Cancer)';
                dosing = '• Apixaban: 10 mg BID × 7 days → 5 mg BID, OR\n• Rivaroxaban: 15 mg BID × 21 days → 20 mg daily (with food)\n• Alternative: LMWH (enoxaparin 1 mg/kg SC q12h) if GI malignancy or high bleeding risk';
            }
            notes.push('🎗️ CANCER-ASSOCIATED VTE — DOACs now preferred over LMWH');
            notes.push('Apixaban/rivaroxaban have lower GI bleeding than edoxaban');
            notes.push('Duration: Continue anticoagulation as long as cancer is active');
        }
        // Priority 7: Intermediate-Low or Low-Risk → DOAC or parenteral based on setting
        else {
            if (hemodynamic === 2) {
                // Submassive (intermediate-low) → admit with parenteral anticoag
                regimen = 'Enoxaparin (LMWH) or UFH';
                dosing = '• Enoxaparin: 1 mg/kg SC q12h, OR\n• UFH: 80 units/kg IV bolus → 18 units/kg/hr if concern for escalation';
                if (rvDysfunction === 1 || biomarkers === 1) {
                    notes.push('Either RV dysfunction OR biomarkers present (not both)');
                }
            }
            else {
                // Low-risk → DOAC (outpatient-friendly)
                if (outpatient === 1 && pesi === 1) {
                    regimen = 'DOAC (Outpatient)';
                    dosing = '• Apixaban: 10 mg BID × 7 days → 5 mg BID, OR\n• Rivaroxaban: 15 mg BID × 21 days → 20 mg daily (with food)';
                    notes.push('✅ OUTPATIENT ELIGIBLE — Hestia criteria met');
                    notes.push('No parenteral bridge needed with apixaban/rivaroxaban');
                    notes.push('Follow-up: 3-7 days with primary care or hematology');
                    notes.push('⚠️ Return precautions: worsening dyspnea, chest pain, hemoptysis, syncope');
                }
                else {
                    regimen = 'DOAC (Brief Admission)';
                    dosing = '• Apixaban: 10 mg BID × 7 days → 5 mg BID, OR\n• Rivaroxaban: 15 mg BID × 21 days → 20 mg daily (with food)';
                    notes.push('🏥 Brief admission (24-48h) for initiation and observation');
                }
            }
        }
        // ========== ADD RISK-SPECIFIC CONTEXT NOTES ==========
        if (hemodynamic === 3) {
            notes.push('⚠️ MORTALITY >15% — immediate intervention required');
            notes.push('🏥 Disposition: ICU admission with continuous monitoring');
            notes.push('ICD-10: I26.02 (saddle embolus with acute cor pulmonale)');
        }
        else if (hemodynamic === 2) {
            if (rvDysfunction === 1 && biomarkers === 1) {
                notes.push('Mortality 3-15% — high risk of deterioration');
                notes.push('Reassess q4-6h for progression to massive PE');
            }
            else {
                notes.push('Thrombolysis NOT indicated unless deterioration');
                notes.push('Reassess if clinical worsening → escalate to intermediate-high');
            }
            notes.push(`🏥 Disposition: ${disposition}`);
        }
        else {
            notes.push('Mortality <1% with appropriate anticoagulation');
            if (pesi === 2) {
                notes.push('⚠️ PESI III-V or sPESI ≥1 — admission recommended despite low-risk classification');
            }
            notes.push(`🏥 Disposition: ${disposition}`);
        }
        // General notes for all categories
        if (pregnancy !== 1) {
            notes.push('📅 Duration: Minimum 3 months — extend for unprovoked PE or recurrent VTE');
        }
        if (cancer === 1 && pregnancy !== 1) {
            notes.push('🎗️ Cancer VTE: Continue anticoagulation as long as malignancy is active');
        }
        const fullDescription = `**Risk Category:** ${riskCategory}\n\n**Recommended Regimen:**\n\n${dosing}\n\n**Clinical Guidance:**\n${notes.map(n => `• ${n}`).join('\n')}\n\n**Disposition:** ${disposition}`;
        return {
            value: riskCategory,
            label: regimen,
            description: fullDescription,
            colorVar,
        };
    },
};
// -------------------------------------------------------------------
// HF Acid Burns Treatment Protocol
// -------------------------------------------------------------------
const HF_TREATMENT_CALCULATOR = {
    id: 'hf-treatment',
    title: 'HF Acid Burns: Treatment Protocol',
    subtitle: 'Step-by-step calcium gluconate dosing & mixing',
    description: 'Hydrofluoric acid burn treatment ladder with exact calcium gluconate dosing, mixing instructions, and systemic monitoring requirements.',
    results: [],
    thresholdNote: '',
    citations: [
        'CDC NIOSH. Hydrogen Fluoride/Hydrofluoric Acid: Systemic Agent. Emergency Response Card 29750030.',
        'NPIS. Emergency treatment of hydrofluoric acid (HF) burns and injury. 2021.',
        'Bertolini JC. Hydrofluoric acid: a review of toxicity. J Emerg Med. 1992;10(2):163-8.',
    ],
    fields: [
        {
            name: 'burn-size',
            label: 'Burn surface area',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Small (<25 cm²)', points: 1 },
                { label: 'Large (≥25 cm²)', points: 2 },
            ],
        },
        {
            name: 'hf-concentration',
            label: 'HF concentration',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '>50% (immediate pain)', points: 3 },
                { label: '20-50% (delayed 1-8h)', points: 2 },
                { label: '<20% (delayed up to 24h)', points: 1 },
            ],
        },
        {
            name: 'systemic-risk',
            label: 'Systemic toxicity risk',
            type: 'toggle',
            points: 1,
            description: 'Burns >25 cm² OR >50% HF concentration',
        },
    ],
    computeResult: (values) => {
        const burnSize = values['burn-size'] || 1;
        const concentration = values['hf-concentration'] || 1;
        const systemicRisk = values['systemic-risk'] || 0;
        // Treatment protocol - all patients get the same ladder, but systemic monitoring varies
        const protocol = [
            '**STEP 1: Immediate Decontamination**',
            '• Remove all contaminated clothing',
            '• Irrigate with copious water or saline × 15-30 minutes',
            '• Continue irrigation until calcium therapy available',
            '',
            '**STEP 2: Topical Calcium Gluconate 2.5% Gel**',
            '• Apply liberally to burn and surrounding area',
            '• Massage into skin with gloved hand × 15-30 minutes',
            '• Reapply every 15-30 minutes until pain relief',
            '',
            '**Mixing Instructions for 2.5% Gel:**',
            '• Option A: 3.5g calcium gluconate powder + 150 mL water-soluble lubricant (K-Y Jelly)',
            '• Option B: 1 ampule 10% calcium gluconate (10 mL) + 30 mL K-Y Jelly',
            '',
            '**STEP 3: Subcutaneous/Intradermal Injection**',
            '• Indication: Pain persists despite topical therapy',
            '• **Dose: 0.5 mL per cm² of affected skin**',
            '• Dilute 10% calcium gluconate to 5% with sterile saline (1:1)',
            '• Use 27-30 gauge needle',
            '• Maximum 0.5 mL per injection site',
            '• May repeat if pain recurs',
            '',
            '**STEP 4: Intra-Arterial Calcium (Hand/Digit Burns)**',
            '• Indication: Unresponsive to topical + subcutaneous',
            '• **Dose: 10 mL of 10% calcium gluconate in 40 mL NS**',
            '• Infuse via radial artery catheter over 4 hours',
            '• Requires vascular surgery or interventional radiology',
            '• Monitor for arterial spasm, compartment syndrome',
            '',
            '**STEP 5: Surgical Debridement**',
            '• Indication: All above measures fail',
            '• Excision of necrotic tissue',
            '• Burn surgery consultation',
        ];
        const systemicMonitoring = systemicRisk === 1 ? [
            '',
            '⚠️ **SYSTEMIC TOXICITY MONITORING REQUIRED**',
            '',
            '**Indications for systemic monitoring:**',
            '• Burns >25 cm² (size of patient\'s palm)',
            '• HF concentration >50%',
            '• Any signs of systemic toxicity',
            '',
            '**Monitoring protocol:**',
            '• Continuous cardiac telemetry',
            '• Serial ECG — watch for QT prolongation, widened QRS, bradycardia',
            '• Labs q2-4h: Ca, Mg, K, iCa',
            '• Treat hypocalcemia: calcium gluconate 10% IV 10-20 mL over 10 min',
            '• Treat hypomagnesemia: magnesium sulfate 2g IV',
            '• Treat hyperkalemia per standard protocol',
            '',
            '**Cardiac arrest risk:** Fluoride binds calcium/magnesium → severe electrolyte disturbances. Cardiac arrest from hypocalcemia, hyperkalemia, or dysrhythmia is the most common cause of death.',
        ] : [
            '',
            '✓ **Small burn, low systemic risk**',
            '• Outpatient management possible if pain controlled with topical therapy',
            '• Return precautions: worsening pain, paresthesias, weakness',
            '• Recheck in 24-48h to assess burn depth progression',
        ];
        const eyeProtocol = [
            '',
            '**EYE EXPOSURE (if applicable):**',
            '• Immediate irrigation with water or saline × 30 minutes',
            '• Follow with 1% calcium gluconate solution via Morgan lens × 20 min',
            '• **Mixing 1% solution:** 10 mL of 10% calcium gluconate + 90 mL sterile saline',
            '• Ophthalmology consult for slit lamp exam',
        ];
        const inhalationProtocol = [
            '',
            '**INHALATION EXPOSURE (if applicable):**',
            '• 100% O₂ via non-rebreather',
            '• Nebulized 2.5% calcium gluconate solution',
            '• **Mixing nebulizer solution:** 10 mL of 10% calcium gluconate + 30 mL sterile saline',
            '• Continuous monitoring for airway edema',
            '• Early intubation if stridor or respiratory distress',
        ];
        const fullProtocol = [
            ...protocol,
            ...systemicMonitoring,
            ...eyeProtocol,
            ...inhalationProtocol,
        ].join('\n');
        let colorVar = '--color-moderate';
        let riskLabel = 'Local Burn';
        if (systemicRisk === 1 || concentration === 3) {
            colorVar = '--color-critical';
            riskLabel = 'High Systemic Risk';
        }
        else if (burnSize === 2 || concentration === 2) {
            colorVar = '--color-severe';
            riskLabel = 'Moderate Risk';
        }
        return {
            value: riskLabel,
            label: 'HF Burn Protocol',
            description: fullProtocol,
            colorVar,
        };
    },
};
// -------------------------------------------------------------------
const COWS_CALCULATOR = {
    id: 'cows',
    title: 'COWS Score',
    subtitle: 'Clinical Opioid Withdrawal Scale',
    description: 'The COWS is an 11-item clinician-administered scale that rates common signs and symptoms of opioid withdrawal. It is used to assess the severity of opioid withdrawal and guide initiation of medications for opioid use disorder (MOUD), particularly buprenorphine.',
    fields: [
        {
            name: 'pulse',
            label: 'Resting Pulse Rate',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Pulse rate ≤ 80', points: 0 },
                { label: 'Pulse rate 81–100', points: 1 },
                { label: 'Pulse rate 101–120', points: 2 },
                { label: 'Pulse rate > 120', points: 4 },
            ],
        },
        {
            name: 'sweating',
            label: 'Sweating',
            type: 'select',
            points: 0,
            description: 'Over past half hour, not accounted for by room temperature or patient activity',
            selectOptions: [
                { label: 'No report of chills or flushing', points: 0 },
                { label: 'Subjective report of chills or flushing', points: 1 },
                { label: 'Flushed or observable moisture on face', points: 2 },
                { label: 'Beads of sweat on brow or face', points: 3 },
                { label: 'Sweat streaming off face', points: 4 },
            ],
        },
        {
            name: 'restlessness',
            label: 'Restlessness',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Able to sit still', points: 0 },
                { label: 'Reports difficulty sitting still, but is able to do so', points: 1 },
                { label: 'Frequent shifting or extraneous movements of legs/arms', points: 3 },
                { label: 'Unable to sit still for more than a few seconds', points: 5 },
            ],
        },
        {
            name: 'pupils',
            label: 'Pupil Size',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Pupils pinned or normal size for room light', points: 0 },
                { label: 'Pupils possibly larger than normal for room light', points: 1 },
                { label: 'Pupils moderately dilated', points: 2 },
                { label: 'Pupils so dilated that only the rim of the iris is visible', points: 5 },
            ],
        },
        {
            name: 'boneJoint',
            label: 'Bone or Joint Aches',
            type: 'select',
            points: 0,
            description: 'If patient was having pain previously, only the additional component attributed to opioid withdrawal is scored',
            selectOptions: [
                { label: 'Not present', points: 0 },
                { label: 'Mild diffuse discomfort', points: 1 },
                { label: 'Patient reports severe diffuse aching of joints/muscles', points: 2 },
                { label: 'Patient is rubbing joints or muscles and unable to sit still because of discomfort', points: 4 },
            ],
        },
        {
            name: 'nose',
            label: 'Runny Nose or Tearing',
            type: 'select',
            points: 0,
            description: 'Not accounted for by cold symptoms or allergies',
            selectOptions: [
                { label: 'Not present', points: 0 },
                { label: 'Nasal stuffiness or unusually moist eyes', points: 1 },
                { label: 'Nose running or tearing', points: 2 },
                { label: 'Nose constantly running or tears streaming down cheeks', points: 4 },
            ],
        },
        {
            name: 'gi',
            label: 'GI Upset',
            type: 'select',
            points: 0,
            description: 'Over last half hour',
            selectOptions: [
                { label: 'No GI symptoms', points: 0 },
                { label: 'Stomach cramps', points: 1 },
                { label: 'Nausea or loose stool', points: 2 },
                { label: 'Vomiting or diarrhea', points: 3 },
                { label: 'Multiple episodes of diarrhea or vomiting', points: 5 },
            ],
        },
        {
            name: 'tremor',
            label: 'Tremor',
            type: 'select',
            points: 0,
            description: 'Observation of outstretched hands',
            selectOptions: [
                { label: 'No tremor', points: 0 },
                { label: 'Tremor can be felt, but not observed', points: 1 },
                { label: 'Slight tremor observable', points: 2 },
                { label: 'Gross tremor or muscle twitching', points: 4 },
            ],
        },
        {
            name: 'yawning',
            label: 'Yawning',
            type: 'select',
            points: 0,
            description: 'Observation during assessment',
            selectOptions: [
                { label: 'No yawning', points: 0 },
                { label: 'Yawning once or twice during assessment', points: 1 },
                { label: 'Yawning three or more times during assessment', points: 2 },
                { label: 'Yawning several times per minute', points: 4 },
            ],
        },
        {
            name: 'anxiety',
            label: 'Anxiety or Irritability',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'None', points: 0 },
                { label: 'Patient reports increasing irritability or anxiousness', points: 1 },
                { label: 'Patient obviously irritable or anxious', points: 2 },
                { label: 'Patient so irritable or anxious that participation is difficult', points: 4 },
            ],
        },
        {
            name: 'gooseflesh',
            label: 'Gooseflesh Skin',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Skin is smooth', points: 0 },
                { label: 'Piloerection of skin can be felt or hairs standing up on arms', points: 3 },
                { label: 'Prominent piloerection', points: 5 },
            ],
        },
    ],
    results: [
        { min: 0, max: 5, label: 'No Withdrawal', risk: 'COWS 0\u20134', mortality: 'Observe. Do not initiate buprenorphine. Reassess in 1\u20132 hours if concern for evolving withdrawal.', colorVar: '--color-primary' },
        { min: 5, max: 13, label: 'Mild Withdrawal', risk: 'COWS 5\u201312', mortality: 'Consider buprenorphine induction (COWS \u2265 8) or symptomatic treatment with non-opioid adjuncts.', colorVar: '--color-primary' },
        { min: 13, max: 25, label: 'Moderate Withdrawal', risk: 'COWS 13\u201324', mortality: 'Initiate opioid agonist therapy. Safe threshold for buprenorphine induction, including fentanyl-dependent patients.', colorVar: '--color-warning' },
        { min: 25, max: 37, label: 'Moderately Severe', risk: 'COWS 25\u201336', mortality: 'Aggressive treatment indicated. High-dose buprenorphine induction (up to 32 mg) or methadone + adjunctive therapy.', colorVar: '--color-danger' },
        { min: 37, max: 48, label: 'Severe Withdrawal', risk: 'COWS 37\u201347', mortality: 'Emergent treatment. High-dose buprenorphine or methadone. IV fluids. Monitor closely for dehydration and hemodynamic instability.', colorVar: '--color-danger' },
    ],
    thresholdNote: 'COWS \u2265 8: Generally safe for standard buprenorphine induction. COWS \u2265 13: Recommended threshold for fentanyl-dependent patients to reduce risk of buprenorphine-precipitated withdrawal.',
    citations: [
        'Wesson DR, Ling W. The Clinical Opiate Withdrawal Scale (COWS). J Psychoactive Drugs. 2003;35(2):253-259.',
        'Tompkins DA, Bigelow GE, Harrison JA, et al. Concurrent Validation of the Clinical Opiate Withdrawal Scale (COWS) and Single-Item Indices Against the Clinical Institute Narcotic Assessment (CINA) Opioid Withdrawal Instrument. Drug Alcohol Depend. 2009;105(1-2):154-159.',
        'Herring AA, Vosooghi AA, Luftig J, et al. High-Dose Buprenorphine Induction in the Emergency Department for Treatment of Opioid Use Disorder. JAMA Netw Open. 2021;4(7):e2117128.',
    ],
};
// -------------------------------------------------------------------
// PAWSS (Prediction of Alcohol Withdrawal Severity Scale)
// -------------------------------------------------------------------
const PAWSS_CALCULATOR = {
    id: 'pawss',
    title: 'PAWSS',
    subtitle: 'Prediction of Alcohol Withdrawal Severity Scale',
    description: 'The PAWSS is a 10-item screening tool validated to predict clinically significant alcohol withdrawal in hospitalized patients. A score ≥4 has high sensitivity and specificity for predicting complicated withdrawal (seizures, DT, ICU admission).',
    fields: [
        { name: 'bac-pos', label: 'Blood alcohol level >200 mg/dL OR positive breathalyzer on admission', type: 'toggle', points: 1 },
        { name: 'alcohol-smell', label: 'Evidence of increased autonomic activity (HR >120, tremor, agitation, diaphoresis, nausea)', type: 'toggle', points: 1 },
        { name: 'heavy-use', label: 'Patient reports heavy alcohol use (daily or near-daily use)', type: 'toggle', points: 1 },
        { name: 'prior-withdrawal', label: 'History of prior alcohol withdrawal symptoms', type: 'toggle', points: 1 },
        { name: 'prior-seizure', label: 'History of alcohol withdrawal seizures', type: 'toggle', points: 1 },
        { name: 'prior-dt', label: 'History of delirium tremens', type: 'toggle', points: 1 },
        { name: 'prior-detox', label: 'History of prior alcohol detoxification or rehab', type: 'toggle', points: 1 },
        { name: 'concurrent-drug', label: 'Concurrent use of benzodiazepines, barbiturates, or other sedatives', type: 'toggle', points: 1 },
        { name: 'recent-binge', label: 'Recent binge drinking (≥5 drinks/day for men, ≥4 for women)', type: 'toggle', points: 1 },
        { name: 'last-drink', label: 'Last drink within 24 hours of assessment', type: 'toggle', points: 1 },
    ],
    results: [
        { min: -Infinity, max: 4, label: 'Score 0-3', risk: 'Low Risk', mortality: 'Low probability of clinically significant alcohol withdrawal. Standard monitoring may be sufficient.', colorVar: '--color-primary' },
        { min: 4, max: 7, label: 'Score 4-6', risk: 'Moderate Risk', mortality: 'Moderate probability of clinically significant withdrawal. Prophylactic treatment and close monitoring recommended.', colorVar: '--color-warning' },
        { min: 7, max: Infinity, label: 'Score 7-10', risk: 'High Risk', mortality: 'High probability of severe withdrawal (seizures, DT). Aggressive prophylaxis and monitoring. Consider ICU-level care.', colorVar: '--color-danger' },
    ],
    thresholdNote: 'PAWSS ≥4 is the validated threshold for predicting clinically significant alcohol withdrawal (sensitivity 93%, specificity 99%). Use to guide prophylactic treatment decisions in at-risk hospitalized patients.',
    citations: [
        'Maldonado JR, Sher Y, Das S, et al. Prospective Validation Study of the Prediction of Alcohol Withdrawal Severity Scale (PAWSS) in Medically Ill Inpatients. Alcohol Alcohol. 2015;50(5):509-518.',
        'Wood E, Albarqouni L, Tkachuk S, et al. Will This Hospitalized Patient Develop Severe Alcohol Withdrawal Syndrome? The Rational Clinical Examination Systematic Review. JAMA. 2018;320(8):825-833.',
    ],
};
// -------------------------------------------------------------------
// CIWA-Ar (Clinical Institute Withdrawal Assessment for Alcohol, Revised)
// -------------------------------------------------------------------
const CIWA_AR_CALCULATOR = {
    id: 'ciwa-ar',
    title: 'CIWA-Ar',
    subtitle: 'Clinical Institute Withdrawal Assessment for Alcohol — Revised',
    description: 'The CIWA-Ar is a 10-item validated scale used to quantify the severity of alcohol withdrawal and guide symptom-triggered therapy. Score ranges from 0 to 67. Widely used for medication titration in alcohol withdrawal management.',
    fields: [
        {
            name: 'nausea',
            label: 'Nausea/Vomiting',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No nausea or vomiting (0)', points: 0 },
                { label: 'Mild nausea, no vomiting (1)', points: 1 },
                { label: 'Intermittent nausea (2-3)', points: 3 },
                { label: 'Constant nausea, frequent dry heaves/vomiting (4-7)', points: 7 },
            ],
        },
        {
            name: 'tremor',
            label: 'Tremor (arms extended, fingers spread)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No tremor (0)', points: 0 },
                { label: 'Not visible, can be felt fingertip to fingertip (1)', points: 1 },
                { label: 'Moderate, with arms extended (2-3)', points: 3 },
                { label: 'Severe, even with arms not extended (4-7)', points: 7 },
            ],
        },
        {
            name: 'sweating',
            label: 'Paroxysmal Sweats',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No sweat visible (0)', points: 0 },
                { label: 'Barely perceptible sweating, palms moist (1)', points: 1 },
                { label: 'Beads of sweat on forehead (2-3)', points: 3 },
                { label: 'Drenching sweats (4-7)', points: 7 },
            ],
        },
        {
            name: 'anxiety',
            label: 'Anxiety',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'No anxiety, at ease (0)', points: 0 },
                { label: 'Mildly anxious (1)', points: 1 },
                { label: 'Moderately anxious, or guarded (2-3)', points: 3 },
                { label: 'Equivalent to acute panic states, severe (4-7)', points: 7 },
            ],
        },
        {
            name: 'agitation',
            label: 'Agitation',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Normal activity (0)', points: 0 },
                { label: 'Somewhat more than normal activity (1)', points: 1 },
                { label: 'Moderately fidgety and restless (2-3)', points: 3 },
                { label: 'Paces back and forth, or constantly thrashes about (4-7)', points: 7 },
            ],
        },
        {
            name: 'tactile',
            label: 'Tactile Disturbances',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'None (0)', points: 0 },
                { label: 'Mild itching, pins and needles, burning, numbness (1)', points: 1 },
                { label: 'Moderate itching, burning, numbness (2-3)', points: 3 },
                { label: 'Hallucinations or severe burning/numbness (4-5)', points: 5 },
                { label: 'Continuous hallucinations (6-7)', points: 7 },
            ],
        },
        {
            name: 'auditory',
            label: 'Auditory Disturbances',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Not present (0)', points: 0 },
                { label: 'Very mild harshness or ability to frighten (1)', points: 1 },
                { label: 'Mild harshness or frightening (2-3)', points: 3 },
                { label: 'Moderate hallucinations (4-5)', points: 5 },
                { label: 'Continuous hallucinations (6-7)', points: 7 },
            ],
        },
        {
            name: 'visual',
            label: 'Visual Disturbances',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Not present (0)', points: 0 },
                { label: 'Mild sensitivity to light (1)', points: 1 },
                { label: 'Moderate sensitivity (2-3)', points: 3 },
                { label: 'Moderate hallucinations (4-5)', points: 5 },
                { label: 'Continuous hallucinations (6-7)', points: 7 },
            ],
        },
        {
            name: 'headache',
            label: 'Headache, Fullness in Head',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Not present (0)', points: 0 },
                { label: 'Very mild (1)', points: 1 },
                { label: 'Mild-moderate headache (2-3)', points: 3 },
                { label: 'Moderately severe (4-5)', points: 5 },
                { label: 'Extremely severe (6-7)', points: 7 },
            ],
        },
        {
            name: 'orientation',
            label: 'Orientation and Clouding of Sensorium',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Oriented, can do serial additions (0)', points: 0 },
                { label: 'Cannot do serial additions, uncertain about date (1)', points: 1 },
                { label: 'Date uncertain by more than 2 days (2)', points: 2 },
                { label: 'Disoriented in date by >2 days (3)', points: 3 },
                { label: 'Disoriented in place and/or person (4)', points: 4 },
            ],
        },
    ],
    results: [
        { min: -Infinity, max: 8, label: 'Score 0-7', risk: 'Minimal Withdrawal', mortality: 'No medication indicated in most cases. Continue monitoring q4-6h.', colorVar: '--color-primary' },
        { min: 8, max: 16, label: 'Score 8-15', risk: 'Mild Withdrawal', mortality: 'Consider medical management. Symptom-triggered dosing when score ≥8. Monitor q2-4h.', colorVar: '--color-primary' },
        { min: 16, max: 21, label: 'Score 16-20', risk: 'Moderate Withdrawal', mortality: 'Medical management recommended. Symptom-triggered dosing. Monitor q1-2h. Consider ICU for comorbidities.', colorVar: '--color-warning' },
        { min: 21, max: Infinity, label: 'Score ≥21', risk: 'Severe Withdrawal', mortality: 'Aggressive treatment required. High risk for seizures and DT. ICU monitoring recommended. Frequent reassessment (q10-15 min during active treatment).', colorVar: '--color-danger' },
    ],
    thresholdNote: 'CIWA-Ar ≥8: Medicate (symptom-triggered therapy). CIWA-Ar <8: Withhold medication, continue monitoring. For intubated patients, use RASS instead — CIWA-Ar requires patient cooperation. Max possible score: 67.',
    citations: [
        'Sullivan JT, Sykora K, Schneiderman J, et al. Assessment of alcohol withdrawal: the revised clinical institute withdrawal assessment for alcohol scale (CIWA-Ar). Br J Addict. 1989;84(11):1353-1357.',
        'Saitz R, et al. Individualized treatment for alcohol withdrawal: A randomized double-blind controlled trial. JAMA. 1994;272(7):519-523.',
    ],
};
const FACTOR_DOSING_CALCULATOR = {
    id: 'factor-dosing',
    title: 'Factor Dosing',
    subtitle: 'Factor VIII / IX Replacement Dosing Calculator',
    description: 'Calculate clotting factor replacement dose based on hemophilia type, target level, and patient weight. Factor VIII: 1 unit/kg raises level by 2%. Factor IX: 1 unit/kg raises level by 1%.',
    fields: [
        {
            name: 'weight',
            label: 'Patient Weight (kg)',
            type: 'number',
            points: 0,
        },
        {
            name: 'factor-type',
            label: 'Hemophilia Type',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: 'Hemophilia A (Factor VIII) — 1 U/kg = +2%', points: 2 },
                { label: 'Hemophilia B (Factor IX) — 1 U/kg = +1%', points: 1 },
            ],
        },
        {
            name: 'target-level',
            label: 'Target Factor Level (%)',
            type: 'select',
            points: 0,
            selectOptions: [
                { label: '30–50% — Minor mucosal bleed', points: 40 },
                { label: '40–60% — Hemarthrosis / muscle', points: 50 },
                { label: '50% — Hematuria', points: 50 },
                { label: '80% — Iliopsoas / GI bleed', points: 80 },
                { label: '100% — ICH / major trauma', points: 100 },
            ],
        },
        {
            name: 'baseline-level',
            label: 'Baseline Factor Level (%, 0 if severe/unknown)',
            type: 'number',
            points: 0,
        },
    ],
    results: [],
    thresholdNote: 'Round dose UP to nearest whole vial. Check post-infusion levels at 30–60 min for major bleeds.',
    citations: [
        'Treatment Guidelines Working Group. Guidelines for the management of hemophilia. 2nd ed. WFH. 2012.',
        'Schwartz KR, Rubinstein M. Hemophilia and vWD in children. Pediatr Emerg Med Pract. 2015;12(9):1-24.',
    ],
    computeResult: (values) => {
        const weight = values['weight'] || 0;
        const factorIncrement = values['factor-type'] || 2; // 2 for FVIII, 1 for FIX
        const targetLevel = values['target-level'] || 50;
        const baselineLevel = values['baseline-level'] || 0;
        if (weight <= 0) {
            return { value: '--', label: 'Enter weight', description: 'Enter patient weight in kg.', colorVar: '--color-text-muted' };
        }
        const levelNeeded = Math.max(targetLevel - baselineLevel, 0);
        const dose = Math.ceil((levelNeeded / factorIncrement) * weight);
        const factorName = factorIncrement === 2 ? 'Factor VIII' : 'Factor IX';
        const halfLife = factorIncrement === 2 ? '8–12' : '18–24';
        const redoseInterval = factorIncrement === 2 ? 'q8–12h' : 'q18–24h';
        if (levelNeeded <= 0) {
            return { value: '0 units', label: 'No replacement needed', description: `Baseline level (${baselineLevel}%) already meets or exceeds target (${targetLevel}%).`, colorVar: '--color-primary' };
        }
        return {
            value: `${dose.toLocaleString()} units`,
            label: `${factorName} dose`,
            description: `${factorName}: ${dose.toLocaleString()} units IV\nTarget: ${targetLevel}% (from baseline ${baselineLevel}%)\nExpected rise: ${levelNeeded}%\nHalf-life: ${halfLife} hours\nRedose: ${redoseInterval} if ongoing treatment needed\n\nRound up to nearest whole vial.`,
            colorVar: targetLevel >= 80 ? '--color-danger' : '--color-primary',
        };
    },
};
// -------------------------------------------------------------------
// TB Calculators
// -------------------------------------------------------------------
const TB_RISK_CALCULATOR = {
    id: 'tb-risk',
    title: 'R/O TB',
    subtitle: 'TB Risk Stratification',
    description: 'Clinical and epidemiologic risk assessment for active pulmonary tuberculosis. Guides testing urgency and isolation decisions.',
    fields: [
        { name: 'cough', label: 'Cough >2–3 weeks', type: 'toggle', points: 2 },
        { name: 'fever', label: 'Fevers or night sweats', type: 'toggle', points: 1 },
        { name: 'weightloss', label: 'Unexplained weight loss', type: 'toggle', points: 1 },
        { name: 'hemoptysis', label: 'Hemoptysis', type: 'toggle', points: 2 },
        { name: 'cxr', label: 'CXR: upper lobe infiltrate or cavitation', type: 'toggle', points: 3 },
        { name: 'exposure', label: 'Known TB exposure or close contact', type: 'toggle', points: 2 },
        { name: 'endemic', label: 'Birth/residence/travel in TB-endemic area', type: 'toggle', points: 1 },
        { name: 'hiv', label: 'HIV infection', type: 'toggle', points: 2 },
        { name: 'immunosuppressed', label: 'Other immunosuppression (TNF-α inhibitors, transplant, chronic steroids)', type: 'toggle', points: 1 },
        { name: 'congregate', label: 'Congregate setting (shelter, jail, long-term care)', type: 'toggle', points: 1 },
        { name: 'prior', label: 'Prior TB infection or incomplete treatment', type: 'toggle', points: 1 },
    ],
    results: [
        { min: 0, max: 2, label: 'Low Risk', risk: 'TB unlikely', mortality: 'Standard workup, no isolation needed', colorVar: '--color-primary' },
        { min: 3, max: 5, label: 'Moderate Risk', risk: 'TB possible', mortality: 'Obtain sputum AFB + NAA, consider isolation', colorVar: '--color-warning' },
        { min: 6, max: 10, label: 'High Risk', risk: 'TB probable', mortality: 'Isolate immediately, urgent AFB + NAA + culture, start empiric treatment if clinical suspicion high', colorVar: '--color-danger' },
        { min: 11, max: Infinity, label: 'Very High Risk', risk: 'TB very likely', mortality: 'Immediate isolation and empiric RIPE treatment while awaiting confirmatory testing', colorVar: '--color-danger' },
    ],
    thresholdNote: 'This tool aids clinical decision-making but does not replace clinical judgment. Any patient with concerning symptoms and risk factors should be evaluated with appropriate microbiologic testing.',
    citations: ['Bernardo J. Diagnosis of pulmonary tuberculosis disease in adults. UpToDate. Updated Jan 30, 2026.'],
};
const TB_DRUG_CARD_CALCULATOR = {
    id: 'tb-drug-card',
    title: 'TB Drug Card',
    subtitle: 'Quick Weight-Based TB Dosing',
    description: 'Enter patient weight to calculate all first-line TB drug doses for the RIPE regimen.',
    fields: [
        { name: 'weight', label: 'Patient weight (kg)', type: 'number', points: 0 },
    ],
    results: [],
    computeResult: (values) => {
        const w = values['weight'] || 0;
        if (w <= 0)
            return { value: '--', label: 'Enter weight', description: 'Enter patient weight to calculate RIPE doses.', colorVar: '--color-primary' };
        const inh = Math.min(Math.round(w * 5), 300);
        const rif = Math.min(Math.round(w * 10), 600);
        const pza = Math.min(Math.round(w * 25), 2000);
        const emb = Math.min(Math.round(w * 15), 1600);
        const inhLatent = Math.min(Math.round(w * 15), 900);
        return {
            value: `${w} kg`,
            label: `INH: ${inh} mg daily | RIF: ${rif} mg daily | PZA: ${pza} mg daily | EMB: ${emb} mg daily`,
            description: `Pyridoxine B6: 25–50 mg daily | INH weekly (3HP): ${inhLatent} mg | Rifapentine: 900 mg weekly`,
            colorVar: '--color-primary',
        };
    },
    thresholdNote: 'Doses shown are for daily administration. Max doses: INH 300 mg, RIF 600 mg, PZA 2000 mg, EMB 1600 mg. Always co-administer pyridoxine (B6) with isoniazid.',
    citations: ['Nahid P, et al. ATS/CDC/IDSA: treatment of drug-susceptible tuberculosis. Clin Infect Dis. 2016;63(7):e147-e195.'],
};
const TB_INTERACTION_CALCULATOR = {
    id: 'tb-interaction',
    title: 'TB Drug Interactions',
    subtitle: 'Rifamycin / CYP3A4 Interaction Checker',
    description: 'Check for significant drug interactions between TB medications and concurrent drugs, especially antiretrovirals.',
    fields: [
        { name: 'rifampin', label: 'Patient is on RIFAMPIN', type: 'toggle', points: 0 },
        { name: 'rifabutin', label: 'Patient is on RIFABUTIN (alternative)', type: 'toggle', points: 0 },
        { name: 'bedaquiline', label: 'Patient is on BEDAQUILINE', type: 'toggle', points: 0 },
        { name: 'moxifloxacin', label: 'Patient is on MOXIFLOXACIN', type: 'toggle', points: 0 },
        { name: 'linezolid', label: 'Patient is on LINEZOLID', type: 'toggle', points: 0 },
        { name: 'pi', label: 'Concurrent: Protease inhibitor (atazanavir, darunavir, lopinavir)', type: 'toggle', points: 0 },
        { name: 'dtg', label: 'Concurrent: Dolutegravir (DTG)', type: 'toggle', points: 0 },
        { name: 'efv', label: 'Concurrent: Efavirenz (EFV)', type: 'toggle', points: 0 },
        { name: 'ral', label: 'Concurrent: Raltegravir (RAL)', type: 'toggle', points: 0 },
        { name: 'warfarin', label: 'Concurrent: Warfarin', type: 'toggle', points: 0 },
        { name: 'ocp', label: 'Concurrent: Oral contraceptives', type: 'toggle', points: 0 },
        { name: 'ssri', label: 'Concurrent: SSRI/SNRI', type: 'toggle', points: 0 },
        { name: 'methadone', label: 'Concurrent: Methadone', type: 'toggle', points: 0 },
    ],
    results: [],
    computeResult: (values) => {
        const warnings = [];
        const rif = values['rifampin'] === 1;
        const rib = values['rifabutin'] === 1;
        const bdq = values['bedaquiline'] === 1;
        const moxi = values['moxifloxacin'] === 1;
        const lzd = values['linezolid'] === 1;
        if (rif && values['pi'] === 1)
            warnings.push('⚠️ CONTRAINDICATED: Rifampin + PI — rifampin reduces PI levels by >75%. Use rifabutin instead.');
        if (rif && values['dtg'] === 1)
            warnings.push('⚠️ DOSE ADJUST: Rifampin + DTG — increase dolutegravir to 50 mg BID (from daily).');
        if (rif && values['efv'] === 1)
            warnings.push('✓ COMPATIBLE: Rifampin + EFV — standard doses, no adjustment needed.');
        if (rif && values['ral'] === 1)
            warnings.push('⚠️ DOSE ADJUST: Rifampin + RAL — increase raltegravir to 800 mg BID.');
        if (rif && values['warfarin'] === 1)
            warnings.push('⚠️ MAJOR: Rifampin + Warfarin — dramatically reduces warfarin levels. Requires frequent INR monitoring and significant dose increases (2-3×).');
        if (rif && values['ocp'] === 1)
            warnings.push('⚠️ MAJOR: Rifampin + OCP — reduces OCP efficacy. Use alternative contraception (barrier method or IUD).');
        if (rif && values['methadone'] === 1)
            warnings.push('⚠️ MAJOR: Rifampin + Methadone — reduces methadone levels by 33-68%. Monitor for withdrawal, increase methadone dose.');
        if (rif && bdq)
            warnings.push('⚠️ CONTRAINDICATED: Rifampin + Bedaquiline — rifampin reduces bedaquiline levels by 50%. Do NOT combine.');
        if (rib && values['pi'] === 1)
            warnings.push('⚠️ DOSE ADJUST: Rifabutin + PI — reduce rifabutin to 150 mg daily or 300 mg 3×/week. Monitor.');
        if (rib && values['dtg'] === 1)
            warnings.push('✓ COMPATIBLE: Rifabutin + DTG — standard doses.');
        if (rib && values['efv'] === 1)
            warnings.push('⚠️ DOSE ADJUST: Rifabutin + EFV — increase rifabutin to 450-600 mg daily.');
        if (bdq && moxi)
            warnings.push('⚠️ QTc RISK: Bedaquiline + Moxifloxacin — both prolong QTc. Mandatory monthly ECG monitoring. Hold if QTc >500 ms.');
        if (lzd && values['ssri'] === 1)
            warnings.push('⚠️ SEROTONIN SYNDROME: Linezolid + SSRI/SNRI — linezolid is a weak MAOI. Risk of serotonin syndrome. Avoid if possible or monitor closely.');
        if (lzd && values['methadone'] === 1)
            warnings.push('⚠️ SEROTONIN RISK: Linezolid + Methadone — potential serotonin syndrome risk. Monitor.');
        if (warnings.length === 0) {
            return { value: '0', label: 'No Interactions Detected', description: 'Select TB drugs and concurrent medications to check for interactions.', colorVar: '--color-primary' };
        }
        return {
            value: `${warnings.length}`,
            label: `${warnings.length} Interaction(s) Found`,
            description: warnings.join(' | '),
            colorVar: warnings.some(w => w.includes('CONTRAINDICATED')) ? '--color-danger' : '--color-warning',
        };
    },
    thresholdNote: 'This checker covers major TB drug interactions. It is NOT comprehensive. Always verify with a pharmacist or drug interaction database for complete assessment.',
    citations: ['Brust JCM. Treatment of pulmonary TB in adults with HIV infection. UpToDate. Updated Feb 2026.', 'Heysell SK. Treatment of drug-resistant pulmonary tuberculosis. UpToDate. Updated Jan 2026.'],
};
const TB_DURATION_CALCULATOR = {
    id: 'tb-duration',
    title: 'TB Duration',
    subtitle: 'Treatment Duration Guide',
    description: 'Determines recommended treatment duration based on clinical factors: cavitary disease, culture status, and HIV.',
    fields: [
        { name: 'cavitary', label: 'Cavitary disease on initial CXR', type: 'toggle', points: 1 },
        { name: 'culture2mo', label: 'Positive sputum culture at 2 months', type: 'toggle', points: 2 },
        { name: 'hiv', label: 'HIV co-infection', type: 'toggle', points: 0 },
        { name: 'pza_omit', label: 'Pyrazinamide omitted (hepatotoxicity or contraindication)', type: 'toggle', points: 2 },
        { name: 'fourmonth', label: 'Eligible for 4-month rifapentine-moxifloxacin regimen', type: 'toggle', points: 0 },
    ],
    results: [],
    computeResult: (values) => {
        const cavitary = values['cavitary'] === 1;
        const pos2mo = values['culture2mo'] === 1;
        const hiv = values['hiv'] === 1;
        const pzaOmit = values['pza_omit'] === 1;
        const fourMonth = values['fourmonth'] === 1;
        if (fourMonth && !cavitary && !pos2mo && !pzaOmit) {
            return {
                value: '4 mo',
                label: '4 Months (17 Weeks)',
                description: 'Eligible for shortened rifapentine-moxifloxacin regimen. Must meet ALL selection criteria: age ≥12, non-cavitary, drug-susceptible, smear ≤2+, HIV-negative or CD4 >100. Regimen: INH + Rifapentine + Moxifloxacin + PZA (2 months) → INH + Rifapentine + Moxifloxacin (2 months)',
                colorVar: '--color-primary',
            };
        }
        if (pzaOmit) {
            return {
                value: '9 mo',
                label: '9 Months Minimum',
                description: 'Pyrazinamide omitted — must extend total treatment to 9 months (2-month intensive with INH + RIF + EMB, then 7-month continuation with INH + RIF). Without PZA, the sterilizing effect is reduced and longer treatment is needed to prevent relapse.',
                colorVar: '--color-warning',
            };
        }
        if (pos2mo) {
            return {
                value: '9 mo',
                label: '9 Months Minimum',
                description: cavitary
                    ? 'Positive culture at 2 months — extend continuation phase to 7 months (9 months total). Repeat DST. Ensure DOT adherence. Cavitary disease + positive 2-month culture = highest relapse risk. Expert consultation recommended.'
                    : 'Positive culture at 2 months — extend continuation phase to 7 months (9 months total). Repeat DST. Ensure DOT adherence. Reassess adherence, drug interactions, and consider therapeutic drug monitoring.',
                colorVar: '--color-danger',
            };
        }
        if (cavitary) {
            return {
                value: '9 mo',
                label: '9 Months (Consider)',
                description: 'Cavitary disease with negative 2-month culture — consider extending to 9 months total (7-month continuation). Cavitary disease increases relapse risk even with negative 2-month cultures. Extension is recommended but not mandatory in all cases.',
                colorVar: '--color-warning',
            };
        }
        return {
            value: '6 mo',
            label: '6 Months (Standard)',
            description: 'Standard RIPE regimen: 2-month intensive phase (RIPE daily) → 4-month continuation phase (INH + RIF daily or 3×/week by DOT). Completion criteria: ≥6 months total, ≥4 months continuation, and ≥2 negative cultures during continuation.',
            colorVar: '--color-primary',
        };
    },
    thresholdNote: 'Duration recommendations are based on ATS/CDC/IDSA 2016 guidelines and CDC 2022 interim guidance. HIV patients follow the same durations with ARV interaction management.',
    citations: ['Sterling TR. Treatment of drug-susceptible pulmonary tuberculosis. UpToDate. Updated Nov 2025.', 'CDC. Interim guidance: 4-month rifapentine-moxifloxacin regimen. MMWR. 2022.'],
};
// -------------------------------------------------------------------
// Anticoagulant Reversal Calculators
// -------------------------------------------------------------------
const PCC_DOSING_CALCULATOR = {
    id: 'pcc-dosing',
    title: 'PCC Dosing Calculator',
    subtitle: 'INR-based 4-Factor PCC dosing for warfarin and Xa inhibitor reversal',
    description: 'Calculates weight-based PCC (Kcentra) dose by INR tier for warfarin reversal, or fixed/weight-based dosing for factor Xa inhibitor reversal. Source: AHA/ASA 2022, ESO/EANS 2025, IBCC 2025.',
    fields: [
        {
            name: 'weight',
            label: 'Weight',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'kg',
        },
        {
            name: 'indication',
            label: 'Indication',
            type: 'select',
            points: 0,
            valueIsPoints: true,
            selectOptions: [
                { label: 'Warfarin reversal', points: 1 },
                { label: 'Xa inhibitor reversal (CNS bleeding)', points: 2 },
                { label: 'Xa inhibitor reversal (non-CNS)', points: 3 },
            ],
        },
        {
            name: 'inr',
            label: 'INR (for warfarin)',
            type: 'select',
            points: 0,
            valueIsPoints: true,
            selectOptions: [
                { label: 'INR 1.3-2', points: 15 },
                { label: 'INR 2-4', points: 25 },
                { label: 'INR 4-6', points: 35 },
                { label: 'INR >6', points: 50 },
                { label: 'Unknown / Not applicable', points: 0 },
            ],
        },
    ],
    results: [],
    thresholdNote: 'Always co-administer Vitamin K 10 mg IV for warfarin reversal. PCC effect lasts only 6-8 hours.',
    citations: [
        'Greenberg SM, et al. 2022 AHA/ASA Guideline for Spontaneous ICH. Stroke. 2022;53(7):e282-e361.',
        'ESO/EANS 2025 Guideline on Stroke due to Spontaneous ICH. Eur Stroke J. 2025;10(4):1007-1086.',
        'Cuker A, et al. Reversal of DOACs: Anticoagulation Forum Guidance. Am J Hematol. 2019;94(6):697-709.',
        'Farkas J. Anticoagulant Reversal. IBCC. Updated April 25, 2025.',
    ],
    computeResult: (values) => {
        const weight = values['weight'] || 0;
        const indication = values['indication'] || 0;
        const inrTier = values['inr'] || 0;
        if (weight <= 0) {
            return { value: '--', label: 'Enter weight', description: 'Enter patient weight in kg to calculate PCC dose.', colorVar: '--color-text-muted' };
        }
        if (indication === 0) {
            return { value: '--', label: 'Select indication', description: 'Select warfarin or Xa inhibitor reversal.', colorVar: '--color-text-muted' };
        }
        let dose = 0;
        let maxDose = 5000;
        let label = '';
        let description = '';
        if (indication === 1) {
            // Warfarin reversal — INR-based
            if (inrTier === 0) {
                return { value: '--', label: 'Select INR', description: 'Select INR tier for warfarin reversal dosing.', colorVar: '--color-text-muted' };
            }
            const unitsPerKg = inrTier; // 15, 25, 35, or 50
            dose = Math.round(weight * unitsPerKg);
            const maxByTier = { 15: 1500, 25: 2500, 35: 3500, 50: 5000 };
            maxDose = maxByTier[unitsPerKg] || 5000;
            if (dose > maxDose)
                dose = maxDose;
            const tierLabel = { 15: 'INR 1.3-2', 25: 'INR 2-4', 35: 'INR 4-6', 50: 'INR >6' };
            label = `Warfarin Reversal (${tierLabel[unitsPerKg]})`;
            description = `${unitsPerKg} units/kg × ${weight} kg = ${Math.round(weight * unitsPerKg)} units${dose < Math.round(weight * unitsPerKg) ? ` (capped at ${maxDose})` : ''}\n\nCo-administer: Vitamin K 10 mg IV over 30 min\nOnset: 10-15 min | Duration: 6-8h\nMonitor INR at 30 min, 6h, 24h`;
        }
        else if (indication === 2) {
            // Xa inhibitor — CNS bleeding
            dose = Math.round(weight * 50);
            if (dose > 5000)
                dose = 5000;
            label = 'Xa Inhibitor Reversal (CNS)';
            description = `50 units/kg × ${weight} kg = ${Math.round(weight * 50)} units${dose < Math.round(weight * 50) ? ' (capped at 5,000)' : ''}\n\nPCC will NOT change anti-Xa level\nMonitor: INR after PCC, then q6h\nThese DOACs are NOT dialyzable`;
        }
        else {
            // Xa inhibitor — non-CNS
            const weightBased = Math.round(weight * 25);
            const capped = weightBased > 2500 ? 2500 : weightBased;
            dose = 2000; // fixed dose has best evidence
            label = 'Xa Inhibitor Reversal (Non-CNS)';
            description = `Fixed dose: 2,000 units (simplest, best evidence)\nOR weight-based: 25 u/kg × ${weight} kg = ${weightBased} units${capped < weightBased ? ' (max 2,500)' : ''}\n\nMay repeat if hemostasis not achieved\nPCC will NOT change anti-Xa level`;
        }
        return {
            value: `${dose.toLocaleString()} units`,
            label,
            description,
            colorVar: '--color-danger',
        };
    },
};
const PROTAMINE_DOSING_CALCULATOR = {
    id: 'protamine-dosing',
    title: 'Protamine Dosing Calculator',
    subtitle: 'Time-based protamine dosing for UFH and LMWH reversal',
    description: 'Calculates protamine dose based on heparin type, dose given, and time elapsed since last administration. Source: IBCC 2025, NCC 2016, Wallisch 2023.',
    fields: [
        {
            name: 'heparin-type',
            label: 'Heparin Type',
            type: 'select',
            points: 0,
            valueIsPoints: true,
            selectOptions: [
                { label: 'UFH — Bolus', points: 1 },
                { label: 'UFH — Infusion', points: 2 },
                { label: 'Enoxaparin (LMWH)', points: 3 },
            ],
        },
        {
            name: 'heparin-dose',
            label: 'Heparin dose given',
            type: 'number',
            points: 0,
            valueIsPoints: true,
            unit: 'units (UFH) or mg (enoxaparin)',
        },
        {
            name: 'time-since',
            label: 'Time since last dose',
            type: 'select',
            points: 0,
            valueIsPoints: true,
            selectOptions: [
                { label: '< 30 minutes', points: 100 },
                { label: '30-60 minutes', points: 63 },
                { label: '1-2 hours', points: 44 },
                { label: '2-6 hours', points: 31 },
                { label: '6-8 hours', points: 50 },
                { label: '8-12 hours', points: 50 },
                { label: '> 12 hours', points: 0 },
            ],
        },
    ],
    results: [],
    thresholdNote: 'Max single dose: 50 mg. Give slowly over 15 minutes. Excess protamine causes paradoxical anticoagulation.',
    citations: [
        'Frontera JA, et al. Guideline for Reversal of Antithrombotics in ICH. Neurocrit Care. 2016;24(1):6-46.',
        'Wallisch WJ, et al. Coagulopathy and Emergent Reversal. Anesthesiol Clin. 2023;41(1):249-261.',
        'Farkas J. Anticoagulant Reversal. IBCC. Updated April 25, 2025.',
    ],
    computeResult: (values) => {
        const hType = values['heparin-type'] || 0;
        const hDose = values['heparin-dose'] || 0;
        const timeSince = values['time-since'] || 0;
        if (hType === 0) {
            return { value: '--', label: 'Select heparin type', description: 'Choose UFH bolus, UFH infusion, or enoxaparin.', colorVar: '--color-text-muted' };
        }
        if (hDose <= 0) {
            return { value: '--', label: 'Enter dose', description: 'Enter the heparin dose given (units for UFH, mg for enoxaparin).', colorVar: '--color-text-muted' };
        }
        if (timeSince === 0 && hType !== 2) {
            return { value: '0 mg', label: 'Protamine unlikely to help', description: '>12 hours since last dose. Drug has likely been cleared. Protamine is unlikely to provide benefit.', colorVar: '--color-text-muted' };
        }
        let dose = 0;
        let label = '';
        let description = '';
        if (hType === 1) {
            // UFH bolus — ratio depends on time
            const ratioMap = {
                100: { ratio: 1.0, desc: '<30 min: 1 mg per 100 units' },
                63: { ratio: 0.625, desc: '30-60 min: 0.5-0.75 mg per 100 units' },
                44: { ratio: 0.4375, desc: '1-2h: 0.375-0.5 mg per 100 units' },
                31: { ratio: 0.3125, desc: '2-6h: 0.25-0.375 mg per 100 units' },
            };
            const entry = ratioMap[timeSince];
            if (!entry) {
                return { value: '0 mg', label: 'Consider clinical reassessment', description: '>6 hours since bolus. Heparin effect has largely dissipated. Reassess clinically.', colorVar: '--color-text-muted' };
            }
            dose = Math.round((hDose / 100) * entry.ratio * 10) / 10;
            if (dose > 50)
                dose = 50;
            label = 'UFH Bolus Reversal';
            description = `${entry.desc}\n${hDose} units heparin × ${entry.ratio} mg/100u = ${Math.round((hDose / 100) * entry.ratio * 10) / 10} mg${dose === 50 ? ' → capped at 50 mg' : ''}`;
        }
        else if (hType === 2) {
            // UFH infusion — use last 2 hours of infusion
            dose = Math.round((hDose / 100) * 10) / 10;
            if (dose > 50)
                dose = 50;
            label = 'UFH Infusion Reversal';
            description = `Enter the total UFH given over last 2 hours (rate × 2).\n1 mg protamine per 100 units = ${Math.round((hDose / 100) * 10) / 10} mg${dose === 50 ? ' → capped at 50 mg' : ''}`;
        }
        else {
            // Enoxaparin
            const timeMap = {
                100: { ratio: 1.0, desc: '<8h: 1 mg per 1 mg enoxaparin' },
                63: { ratio: 1.0, desc: '<8h: 1 mg per 1 mg enoxaparin' },
                44: { ratio: 1.0, desc: '<8h: 1 mg per 1 mg enoxaparin' },
                31: { ratio: 1.0, desc: '<8h: 1 mg per 1 mg enoxaparin' },
                50: { ratio: 0.5, desc: '8-12h: 0.5 mg per 1 mg enoxaparin' },
            };
            const entry = timeMap[timeSince];
            if (!entry) {
                return { value: '0 mg', label: 'Protamine unlikely to help', description: '>12 hours since enoxaparin dose. Drug has largely been cleared. Protamine is unlikely to provide meaningful reversal.', colorVar: '--color-text-muted' };
            }
            dose = Math.round(hDose * entry.ratio * 10) / 10;
            if (dose > 50)
                dose = 50;
            label = 'Enoxaparin Reversal (Partial)';
            description = `${entry.desc}\n${hDose} mg enoxaparin × ${entry.ratio} = ${Math.round(hDose * entry.ratio * 10) / 10} mg${dose === 50 ? ' → capped at 50 mg' : ''}\n\nProtamine only reverses ~50% of enoxaparin.\nMay re-dose 0.5 mg/mg if bleeding persists (max 25 mg).`;
        }
        description += '\n\nGive slowly over 15 min. Monitor PTT at 10-15 min, 2h, q4h × 24h.';
        return {
            value: `${dose} mg`,
            label,
            description,
            colorVar: '--color-danger',
        };
    },
};
const CALCULATORS = {
    'cows': COWS_CALCULATOR,
    'rass': RASS_CALCULATOR,
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
    'sfsr': SFSR_CALCULATOR,
    'csrs': CSRS_CALCULATOR,
    'sgarbossa': SGARBOSSA_CALCULATOR,
    'anion-gap': ANION_GAP_CALCULATOR,
    'delta-gap': DELTA_GAP_CALCULATOR,
    'winters-formula': WINTERS_FORMULA_CALCULATOR,
    'osmolar-gap': OSMOLAR_GAP_CALCULATOR,
    'stewart-sig': STEWART_SIG_CALCULATOR,
    'comp-rule-1': COMP_RULE_1_CALCULATOR,
    'comp-rule-2': COMP_RULE_2_CALCULATOR,
    'comp-rule-3': COMP_RULE_3_CALCULATOR,
    'comp-rule-4': COMP_RULE_4_CALCULATOR,
    'comp-rule-5': COMP_RULE_5_CALCULATOR,
    'comp-rule-6': COMP_RULE_6_CALCULATOR,
    'bsa': BSA_CALCULATOR,
    'epi-infusion': EPI_INFUSION_CALCULATOR,
    'anaphylaxis-criteria': ANAPHYLAXIS_CRITERIA_CALCULATOR,
    'burch-wartofsky': BURCH_WARTOFSKY_CALCULATOR,
    'steroid-equivalency': STEROID_EQUIVALENCY_CALCULATOR,
    'syphilis-serology': SYPHILIS_SEROLOGY_CALCULATOR,
    'scd-triage': SCD_TRIAGE_CALCULATOR,
    'qrs-risk': QRS_RISK_CALCULATOR,
    'bicarb-dose': BICARB_DOSE_CALCULATOR,
    'rumack-matthew': RUMACK_MATTHEW_CALCULATOR,
    'nac-dosing': NAC_DOSING_CALCULATOR,
    'kings-college': KINGS_COLLEGE_CALCULATOR,
    'alt-apap-product': ALT_APAP_PRODUCT_CALCULATOR,
    'sal-tox-guide': SAL_TOX_GUIDE_CALCULATOR,
    'qsofa': QSOFA_CALCULATOR,
    'map-calculator': MAP_CALCULATOR,
    'mening-abx': MENING_ABX_CALCULATOR,
    'lp-interp': LP_INTERP_CALCULATOR,
    'aub-treatment': AUB_TREATMENT_CALCULATOR,
    'pe-treatment': PE_TREATMENT_CALCULATOR,
    'hf-treatment': HF_TREATMENT_CALCULATOR,
    'pawss': PAWSS_CALCULATOR,
    'ciwa-ar': CIWA_AR_CALCULATOR,
    'factor-dosing': FACTOR_DOSING_CALCULATOR,
    'tb-risk': TB_RISK_CALCULATOR,
    'tb-drug-card': TB_DRUG_CARD_CALCULATOR,
    'tb-interaction': TB_INTERACTION_CALCULATOR,
    'tb-duration': TB_DURATION_CALCULATOR,
    'pcc-dosing': PCC_DOSING_CALCULATOR,
    'protamine-dosing': PROTAMINE_DOSING_CALCULATOR,
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
/** Ranked search for calculators — prefix matches first */
function rankedCalcSearch(calcs, query) {
    const scored = [];
    for (const calc of calcs) {
        const title = calc.title.toLowerCase();
        const sub = calc.subtitle.toLowerCase();
        // Exact title match
        if (title === query) {
            scored.push({ calc, rank: 0 });
            continue;
        }
        // Title starts with query
        if (title.startsWith(query)) {
            scored.push({ calc, rank: 1 });
            continue;
        }
        // Any word in title or subtitle starts with query
        const words = `${title} ${sub}`.split(/[\s/(),\-]+/);
        if (words.some(w => w.startsWith(query))) {
            scored.push({ calc, rank: 2 });
            continue;
        }
        // Substring match
        if (title.includes(query) || sub.includes(query)) {
            scored.push({ calc, rank: 3 });
            continue;
        }
    }
    scored.sort((a, b) => a.rank - b.rank || a.calc.title.localeCompare(b.calc.title));
    return scored.map(s => s.calc);
}
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
            ? rankedCalcSearch(allCalcs, query)
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
/** Add a persistent custom scroll indicator for iOS (which hides native scrollbars).
 *  The track is appended inside the scrollable container so it gets cleaned up
 *  automatically when the container's innerHTML is cleared on route change. */
function addScrollIndicator(scrollParent) {
    const track = document.createElement('div');
    track.className = 'calc-scroll-track';
    const thumb = document.createElement('div');
    thumb.className = 'calc-scroll-thumb';
    track.appendChild(thumb);
    // Append inside the scroll container — cleared automatically on route change
    scrollParent.appendChild(track);
    function update() {
        const el = scrollParent;
        const scrollH = el.scrollHeight;
        const clientH = el.clientHeight;
        if (scrollH <= clientH) {
            track.style.display = 'none';
            return;
        }
        track.style.display = 'block';
        const ratio = clientH / scrollH;
        const thumbH = Math.max(ratio * clientH, 40);
        const maxScroll = scrollH - clientH;
        const scrollPct = el.scrollTop / maxScroll;
        const maxTop = clientH - thumbH;
        thumb.style.height = `${thumbH}px`;
        thumb.style.top = `${scrollPct * maxTop}px`;
    }
    scrollParent.addEventListener('scroll', update, { passive: true });
    // Initial check after content renders
    setTimeout(update, 200);
    setTimeout(update, 800);
}
export function renderCalculator(container, calculatorId) {
    const calc = CALCULATORS[calculatorId];
    if (!calc) {
        renderCalcNotFound(container, calculatorId);
        return;
    }
    container.innerHTML = '';
    // Add custom scroll indicator for TBSA calculators (iOS hides native scrollbar)
    if (calculatorId.startsWith('tbsa')) {
        addScrollIndicator(container);
    }
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
    // Initialize value with first option
    if (field.selectOptions && field.selectOptions.length > 0) {
        values[field.name] = field.selectOptions[0].points;
    }
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
