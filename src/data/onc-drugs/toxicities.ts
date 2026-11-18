import type { Cited, Toxicity } from './types.js';

// Screening questions are built only from the presenting-symptom lists in ASCO 2021 (sections cited in the research file) and SITC 2021.
// Lethality: 1 = most lethal. Basis per entry is documented in the content-pass report (Wang 2018 case-fatality and share-of-deaths, SITC, ASCO).
const ASCO = ['asco-2021'];
const SITC = ['sitc-2021'];
const q = (v: string, cite: string[] = ASCO): Cited => ({ v, cite });

const ONC = 'oncological-emergencies';
const page = (node: string) => ({ tree: ONC, node });
const own = (node: string) => ({ tree: 'onc-drug-side-effects', node });

export const ONC_TOXICITIES: Toxicity[] = [
  {
    id: 'pneumonitis', label: 'Pneumonitis', page: page('onc-ici-pneumonitis'), lethality: 2,
    complaints: ['dyspnea-cough', 'chest-pain', 'fever'],
    ask: [q('New or worsening cough?'), q('Short of breath, or more breathless than usual?'), q('Chest pain?'), q('Fever?')],
  },
  {
    id: 'colitis', label: 'Colitis', page: page('onc-ici-colitis'), lethality: 2,
    complaints: ['diarrhea-abdominal-pain', 'fever'],
    ask: [q('Diarrhea?'), q('More stools than usual?', SITC), q('Abdominal pain?'), q('Blood or mucus in the stool?'), q('Fever?')],
  },
  {
    id: 'hepatitis', label: 'Hepatitis', page: page('onc-ici-hepatitis'), lethality: 2,
    complaints: ['jaundice-lfts', 'diarrhea-abdominal-pain', 'vomiting-polyuria', 'bleeding-bruising', 'fever'],
    ask: [q('Yellow skin or eyes?'), q('Dark, tea-colored urine?'), q('Nausea, vomiting or loss of appetite?'), q('Pain in the right upper abdomen?'), q('Bruising or bleeding more easily?')],
  },
  {
    id: 'myocarditis', label: 'Myocarditis', page: page('onc-ici-myocarditis'), lethality: 1,
    complaints: ['chest-pain', 'fatigue-hypotension', 'dyspnea-cough', 'weakness'],
    ask: [q('Chest pain?'), q('Heart racing or pounding?'), q('Fainted, or felt about to faint?'), q('Short of breath, or swelling in the legs?'), q('Unusual fatigue, muscle pain or weakness?')],
  },
  {
    id: 'hypophysitis', label: 'Hypophysitis', page: page('onc-ici-endocrine'), lethality: 2,
    complaints: ['headache-vision', 'fatigue-hypotension', 'vomiting-polyuria', 'weakness'],
    ask: [
      q('New or worsening headache?'), q('Any change in your vision?'),
      q('Unusual fatigue, nausea, vomiting or weakness?', SITC), q('Loss of sex drive or erectile dysfunction?', SITC),
    ],
  },
  {
    id: 'adrenal-insufficiency', label: 'Adrenal insufficiency', page: page('onc-ici-endocrine'), lethality: 2,
    complaints: ['diarrhea-abdominal-pain', 'fatigue-hypotension', 'vomiting-polyuria'],
    ask: [q('Nausea, vomiting or abdominal pain?'), q('Weight loss?'), q('Lightheaded on standing, or fainted?'), q('Profound fatigue?')],
  },
  {
    id: 'thyroid', label: 'Thyroid dysfunction', page: page('onc-ici-endocrine'), lethality: 3,
    complaints: ['diarrhea-abdominal-pain', 'fatigue-hypotension'],
    ask: [
      q('Feeling cold when others are not?'), q('Unusually dry skin?'), q('Constipation?'), q('Weight gain?'), q('Unusual tiredness?'),
      q('Heart racing or pounding?'), q('Feeling hot when others are not?'), q('Trouble sleeping?'), q('More bowel movements than usual?'), q('Weight loss?'),
    ],
  },
  {
    id: 'type1-diabetes', label: 'Type 1 diabetes / DKA', page: page('onc-ici-endocrine'), lethality: 2,
    complaints: ['diarrhea-abdominal-pain', 'vomiting-polyuria', 'fatigue-hypotension'],
    ask: [q('Passing a lot of urine, or very thirsty?'), q('Nausea or vomiting?'), q('Abdominal pain?'), q('Blurred vision?')],
  },
  {
    id: 'nephritis', label: 'Nephritis', page: page('onc-ici-other'), lethality: 2,
    complaints: ['vomiting-polyuria', 'confusion-neuro'],
    ask: [
      q('Urinating more often, or dark or cloudy urine?'), q('Swelling of the face, abdomen or legs, or sudden weight gain?'),
      q('Abdominal or pelvic pain, nausea or vomiting?'), q('New drowsiness?'),
    ],
  },
  {
    id: 'neurologic', label: 'Neurologic (myasthenia gravis, Guillain-Barre, encephalitis, meningitis)', page: own('odse-tox-neuro'), lethality: 1,
    complaints: ['headache-vision', 'weakness', 'confusion-neuro', 'fever', 'dyspnea-cough'],
    ask: [
      q('Droopy eyelids or double vision?'),
      q('Weakness that fluctuates or worsens with use, or trouble swallowing, speaking or holding the head up?'),
      q('Weakness spreading upward, numbness or tingling, or shortness of breath?'),
      q('Early low back or thigh pain before the weakness?', SITC),
      q('Headache with light sensitivity or a stiff neck?'),
      q('New confusion, behavior change, memory loss, trouble speaking or seizure-like activity?'),
    ],
  },
  {
    id: 'myositis', label: 'Myositis (and myocarditis + myasthenia overlap)', page: own('odse-tox-myositis-overlap'), lethality: 2,
    complaints: ['weakness', 'dyspnea-cough', 'jaundice-lfts'],
    ask: [
      q('Muscle pain or weakness, especially trouble standing up or lifting the arms?'),
      q('Restricted eye movement, or trouble swallowing or speaking?', SITC),
    ],
  },
  {
    id: 'severe-skin', label: 'Severe skin reactions', page: own('odse-tox-severe-skin'), lethality: 2,
    complaints: ['rash-skin', 'fever'],
    ask: [
      q('New rash or itching?'), q('Blistering?'), q('Skin pain or peeling?'),
      q('Sores in the mouth, eyes or genitals?', SITC), q('Fever with a widespread rash, or swelling of the face or arms?'),
    ],
  },
  {
    id: 'ocular', label: 'Ocular inflammation', page: page('onc-ici-other'), lethality: 3,
    complaints: ['headache-vision'],
    ask: [
      q('Blurred vision or a change in color vision?'), q('Eye pain, redness or sensitivity to light?'),
      q('Double vision?'), q('Blind spots, or part of your vision missing?'), q('Floaters?', SITC),
    ],
  },
  {
    id: 'hematologic', label: 'Hematologic', page: page('onc-ici-other'), lethality: 2,
    complaints: ['bleeding-bruising', 'jaundice-lfts', 'fever', 'fatigue-hypotension', 'rash-skin', 'dyspnea-cough', 'confusion-neuro', 'weakness', 'diarrhea-abdominal-pain', 'vomiting-polyuria', 'headache-vision'],
    ask: [
      q('Easy bruising, or bleeding from the gums or nose?'),
      q('Tiny red or purple spots on the skin, especially the lower legs?'),
      q('Dark-colored urine?'),
      q('Yellow skin or eyes?'),
      q('Unusual tiredness or weakness?'),
      q('More short of breath than usual?'),
    ],
  },
  {
    id: 'pancreatitis', label: 'Pancreatitis', page: page('onc-ici-other'), lethality: 3,
    complaints: ['diarrhea-abdominal-pain'],
    ask: [q('Pain in the upper abdomen?', SITC)],
  },
  {
    id: 'infusion-reaction', label: 'Infusion-related reaction', page: own('odse-tox-infusion-reaction'), lethality: 3,
    complaints: ['fever', 'rash-skin', 'chest-pain', 'dyspnea-cough', 'fatigue-hypotension'],
    ask: [
      q('Fever, chills, headache or nausea during or after the infusion?'),
      q('Chest pain, cough, shortness of breath or wheeze?'),
      q('Flushing, sweating, or hives or itching?'),
      q('Swelling of the tongue?', SITC),
      q('Racing heart, or feeling faint?'),
    ],
  },
  {
    id: 'fluoropyrimidine-toxicity', label: 'Fluorouracil or capecitabine early severe toxicity or overdose', page: own('odse-tox-fluoropyrimidine'), lethality: 1,
    complaints: ['diarrhea-abdominal-pain', 'confusion-neuro', 'chest-pain', 'vomiting-polyuria', 'fever', 'fatigue-hypotension'],
    ask: [
      q('Is the chemotherapy pump still running?', ['g-eviq-fluoropyrimidine-overdose']),
      q('Any new confusion, unsteadiness or drowsiness?', ['pi-fluorouracil', 'g-eviq-fluoropyrimidine-overdose']),
      q('Mouth sores or severe diarrhea since the last dose?', ['pi-fluorouracil', 'g-eviq-fluoropyrimidine-overdose']),
      q('When did the last infusion or capecitabine dose end?', ['pi-vistogard']),
      q('Any chest pain or palpitations?', ['g-eviq-fluoropyrimidine-overdose']),
    ],
  },
  {
    id: 'fluoropyrimidine-cardiotoxicity', label: 'Fluorouracil or capecitabine cardiotoxicity', page: own('odse-tox-fluoropyrimidine-cardiac'), lethality: 1,
    complaints: ['chest-pain', 'dyspnea-cough', 'fatigue-hypotension'],
    ask: [
      q('Any chest pain or pressure during or after the infusion?', ['pi-fluorouracil', 'g-aha-cardio-oncology-2019']),
      q('Palpitations or a racing or irregular heartbeat?', ['pi-fluorouracil']),
      q('New shortness of breath or leg swelling?', ['pi-fluorouracil']),
      q('Is the infusion continuous (pump) rather than a short bolus?', ['pi-fluorouracil']),
    ],
  },
  {
    id: 'methotrexate-toxicity', label: 'Methotrexate delayed clearance and kidney injury', page: own('odse-tox-methotrexate'), lethality: 1,
    complaints: ['vomiting-polyuria', 'fatigue-hypotension'],
    ask: [
      q('Was this a high-dose methotrexate infusion and when did it start?', ['g-glucarpidase-us-2018']),
      q('Any fever, vomiting or infection now?', ['g-mtx-delayed-clearance-eu-2024']),
      q('Any NSAIDs, aspirin, acid reducers or antibiotics taken?', ['g-mtx-delayed-clearance-eu-2024']),
    ],
  },
  {
    id: 'ifosfamide-encephalopathy', label: 'Ifosfamide encephalopathy', page: own('odse-tox-ifosfamide-encephalopathy'), lethality: 2,
    complaints: ['confusion-neuro'],
    ask: [
      q('Any new confusion, sleepiness or agitation since ifosfamide started?', ['pi-ifosfamide', 'g-eviq-ifosfamide-encephalopathy']),
      q('Any hallucinations or blurred vision?', ['pi-ifosfamide', 'g-eviq-ifosfamide-encephalopathy']),
      q('Any jerking movements or seizure?', ['g-eviq-ifosfamide-encephalopathy']),
      q('Any alcohol, opioids or sedatives taken?', ['pi-ifosfamide', 'g-eviq-ifosfamide-encephalopathy']),
    ],
  },
  {
    id: 'hemorrhagic-cystitis', label: 'Hemorrhagic cystitis', page: own('odse-tox-hemorrhagic-cystitis'), lethality: 2,
    complaints: ['blood-in-urine', 'vomiting-polyuria', 'bleeding-bruising'],
    ask: [
      q('Any blood or clots in the urine?', ['g-eviq-haemorrhagic-cystitis']),
      q('Burning, urgency or frequent urination?', ['g-eviq-haemorrhagic-cystitis']),
      q('Lower belly discomfort or trouble passing urine?', ['g-eviq-haemorrhagic-cystitis']),
      q('Was the mesna given with each ifosfamide dose?', ['pi-mesnex']),
    ],
  },
  {
    id: 'chemo-extravasation', label: 'Extravasation', page: own('odse-tox-extravasation'), lethality: 2,
    complaints: ['iv-site-pain-swelling'],
    ask: [
      q('Is there burning or stinging at the IV site?', ['pi-doxorubicin']),
      q('Is there swelling, redness or blanching around the IV?', ['g-ons-asco-extravasation-2026']),
      q('Does the IV site look swollen or red even if it does not hurt?', ['pi-doxorubicin']),
      q('Which drug was running?', ['g-ons-asco-extravasation-2026']),
    ],
  },
  {
    id: 'differentiation-syndrome', label: 'Differentiation syndrome', page: own('odse-tox-differentiation'), lethality: 1,
    complaints: ['fever', 'dyspnea-cough', 'fatigue-hypotension'],
    ask: [
      q('Any new fever with no clear cause?', ['pi-arsenic-trioxide', 'pi-ivosidenib', 'pi-enasidenib', 'pi-olutasidenib', 'pi-revumenib', 'pi-gilteritinib']),
      q('New shortness of breath?', ['pi-arsenic-trioxide', 'pi-ivosidenib', 'pi-enasidenib', 'pi-olutasidenib', 'pi-revumenib', 'pi-gilteritinib']),
      q('Rapid weight gain or leg swelling?', ['pi-arsenic-trioxide', 'pi-ivosidenib', 'pi-enasidenib', 'pi-olutasidenib', 'pi-revumenib', 'pi-gilteritinib']),
      q('Passing less urine?', ['pi-arsenic-trioxide']),
    ],
  },
  {
    id: 'qt-prolongation', label: 'QT prolongation (arsenic trioxide)', page: own('odse-tox-qt-arsenic'), lethality: 1,
    complaints: ['chest-pain', 'fatigue-hypotension'],
    ask: [
      q('Any fainting or near-fainting?', ['g-eln-apl-2019']),
      q('Palpitations or a racing heartbeat?', ['g-eln-apl-2019']),
      q('Any new antibiotics, antifungals or anti-nausea medicines?', ['g-eln-apl-2019']),
    ],
  },
  {
    id: 'chemo-diarrhea-enterocolitis', label: 'Diarrhea and enterocolitis (cytotoxic chemotherapy)', page: own('odse-tox-chemo-diarrhea'), lethality: 1,
    complaints: ['diarrhea-abdominal-pain', 'fever', 'vomiting-polyuria', 'bleeding-bruising'],
    ask: [
      q('Are you having many more stools a day than usual?', ['g-eviq-treatment-induced-diarrhoea']),
      q('Do you have belly cramping?', ['g-nci-pdq-gi-complications']),
      q('Do you have a fever?', ['g-nci-pdq-gi-complications']),
      q('Are you vomiting?', ['g-nci-pdq-gi-complications']),
      q('Have you seen blood in the stool?', ['g-nci-pdq-gi-complications']),
    ],
  },
  {
    id: 'irinotecan-cholinergic', label: 'Irinotecan early cholinergic syndrome', page: own('odse-tox-irinotecan-cholinergic'), lethality: 3,
    complaints: ['diarrhea-abdominal-pain', 'infusion-reaction-during'],
    ask: [
      q('Do you have a runny nose or are you drooling during or just after the infusion?', ['pi-irinotecan']),
      q('Are your eyes watering, or are you sweating or flushed?', ['pi-irinotecan']),
      q('Do you have belly cramping?', ['pi-irinotecan']),
    ],
  },
  {
    id: 'chemo-hypersensitivity', label: 'Hypersensitivity and infusion reactions', page: own('odse-tox-chemo-hypersensitivity'), lethality: 1,
    complaints: ['dyspnea-cough', 'rash-skin', 'fatigue-hypotension', 'chest-pain', 'infusion-reaction-during'],
    ask: [
      q('Does your throat feel tight?', ['g-eviq-hypersensitivity']),
      q('Are you flushed, itchy or have a rash?', ['g-eviq-hypersensitivity']),
      q('Are you wheezing or short of breath?', ['g-cepo-platinum-taxane-hsr-2014']),
      q('Do you feel dizzy?', ['g-eviq-hypersensitivity']),
      q('Do you have back or belly pain?', ['g-eviq-hypersensitivity']),
      q('Does cold air or a cold drink bring on throat tingling or tightness?', ['pi-oxaliplatin-gland']),
    ],
  },
  {
    id: 'chemo-cardiotoxicity', label: 'Cardiotoxicity (anthracycline and other cytotoxics)', page: own('odse-tox-chemo-cardiac'), lethality: 1,
    complaints: ['chest-pain', 'dyspnea-cough', 'fatigue-hypotension'],
    ask: [
      q('Any new fast, slow or irregular heartbeat?', ['pi-doxorubicin']),
      q('New shortness of breath or leg swelling?', ['pi-doxorubicin']),
    ],
  },
  {
    id: 'chemo-pulmonary-toxicity', label: 'Lung toxicity (cytotoxic chemotherapy)', page: own('odse-tox-chemo-pulmonary'), lethality: 1,
    complaints: ['dyspnea-cough', 'fever', 'chest-pain'],
    ask: [
      q('Are you short of breath?', ['g-eviq-pulmonary-toxicity']),
      q('Do you have a dry cough?', ['g-eviq-pulmonary-toxicity']),
      q('Are you coughing up blood?', ['g-eviq-pulmonary-toxicity']),
      q('Do you have chest pain when you breathe in?', ['g-eviq-pulmonary-toxicity']),
      q('Do you have a low fever?', ['g-eviq-pulmonary-toxicity']),
    ],
  },
  {
    id: 'chemo-nephrotoxicity', label: 'Kidney toxicity (cisplatin and other cytotoxics)', page: own('odse-tox-chemo-renal'), lethality: 2,
    complaints: ['vomiting-polyuria', 'weakness'],
    ask: [
      q('Are you passing much more urine than usual?', ['g-eviq-cisplatin-nephrotoxicity']),
      q('Do you have muscle spasms or cramps?', ['pi-cisplatin-hikma']),
      q('Have vomiting or diarrhea left you unable to keep up with fluids?', ['pi-irinotecan']),
    ],
  },
  {
    id: 'vinca-wrong-route', label: 'Wrong-route (intrathecal) vinca injection', page: own('odse-vinca-intrathecal'), lethality: 1,
    complaints: ['weakness'],
    ask: [],
  },
  {
    id: 'chemo-neuropathy-ileus', label: 'Neuropathy and ileus (vinca alkaloids, oxaliplatin)', page: own('odse-tox-chemo-neuropathy'), lethality: 2,
    complaints: ['weakness', 'diarrhea-abdominal-pain', 'numbness-tingling'],
    ask: [
      q('Do you have numbness or tingling in your hands, feet, mouth or throat?', ['pi-oxaliplatin-gland']),
      q('Does cold make it worse?', ['pi-oxaliplatin-gland']),
      q('Do you have trouble walking or foot slapping?', ['pi-vincristine']),
      q('Are you constipated or do you have belly pain?', ['pi-vincristine']),
      q('Do you have jaw spasm?', ['pi-oxaliplatin-gland']),
    ],
  },
  {
    id: 'chemo-cns-toxicity', label: 'CNS toxicity (cytarabine, nelarabine, fludarabine)', page: own('odse-tox-chemo-cns'), lethality: 2,
    complaints: ['confusion-neuro', 'headache-vision', 'weakness'],
    ask: [
      q('Are you unusually sleepy or confused?', ['pi-nelarabine']),
      q('Are you unsteady or have a tremor?', ['pi-nelarabine']),
      q('Have you had a seizure?', ['pi-nelarabine']),
      q('Do you have new numbness or weakness?', ['pi-nelarabine']),
      q('Do you have a headache or have you lost vision?', ['pi-gemcitabine']),
      q('Have you had chemotherapy into the spinal fluid or radiation to the head and spine?', ['pi-nelarabine']),
    ],
  },
  {
    id: 'chemo-tma', label: 'Thrombotic microangiopathy', page: own('odse-tox-chemo-tma-capleak'), lethality: 2,
    complaints: ['bleeding-bruising', 'fatigue-hypotension'],
    ask: [],
  },
  {
    id: 'chemo-capillary-leak', label: 'Capillary leak syndrome', page: own('odse-tox-chemo-tma-capleak'), lethality: 2,
    complaints: ['fatigue-hypotension'],
    ask: [],
  },
  {
    id: 'drug-tma', label: 'Thrombotic microangiopathy', page: own('odse-tox-route-tma'), lethality: 2,
    complaints: ['bleeding-bruising', 'fatigue-hypotension'],
    ask: [],
  },
  {
    id: 'drug-capillary-leak', label: 'Capillary leak syndrome', page: own('odse-tox-route-capillary-leak'), lethality: 1,
    complaints: ['fatigue-hypotension', 'dyspnea-cough'],
    ask: [],
  },
  {
    id: 'chemo-pancreatitis', label: 'Asparaginase pancreatitis', page: own('odse-tox-asparaginase'), lethality: 2,
    complaints: ['diarrhea-abdominal-pain', 'vomiting-polyuria'],
    ask: [
      q('Do you have belly pain?', ['g-asparaginase-adult-2025']),
      q('Are you nauseated?', ['g-asparaginase-adult-2025']),
      q('Are you vomiting?', ['g-asparaginase-adult-2025']),
    ],
  },
  {
    id: 'chemo-thrombosis-bleeding', label: 'Asparaginase thrombosis or bleeding', page: own('odse-tox-asparaginase'), lethality: 2,
    complaints: ['bleeding-bruising', 'dyspnea-cough', 'headache-vision'],
    ask: [
      q('Any severe headache, arm or leg swelling, shortness of breath or chest pain?', ['pi-calaspargase-pegol']),
      q('Any unusual bruising?', ['pi-asparaginase-erwinia-recombinant']),
      q('Any nosebleeds?', ['pi-asparaginase-erwinia-recombinant']),
    ],
  },
  {
    id: 'chemo-hepatotoxicity', label: 'Liver toxicity and VOD (cytotoxic chemotherapy)', page: own('odse-tox-chemo-hepatic'), lethality: 2,
    complaints: ['jaundice-lfts'],
    ask: [
      q('Are your eyes or skin yellow?', ['pi-melphalan-evomela']),
    ],
  },
  {
    id: 'chemo-severe-skin', label: 'Severe skin reactions (cytotoxic chemotherapy)', page: own('odse-tox-chemo-skin'), lethality: 2,
    complaints: ['rash-skin'],
    ask: [
      q('Do you have blisters or peeling skin?', ['pi-pemetrexed']),
      q('Is the rash getting worse?', ['pi-capecitabine']),
    ],
  },
  {
    id: 'chemo-myelosuppression', label: 'Myelosuppression and neutropenic fever', page: page('onc-fn-recognize'), lethality: 1,
    complaints: ['fever', 'bleeding-bruising'],
    ask: [
      q('Do you have a fever?', ['pi-cisplatin']),
      q('Any bleeding or bruising?', ['pi-carboplatin']),
      q('Fever with belly pain?', ['pi-capecitabine']),
    ],
  },
  {
    id: 'chemo-tumor-lysis', label: 'Tumor lysis syndrome', page: page('onc-tls-recognize'), lethality: 1,
    complaints: [],
    ask: [],
  },
  {
    id: 'chemo-hyponatremia-siadh', label: 'Hyponatremia or SIADH', page: { tree: 'sodium', node: 'na-siad-treatment' }, lethality: 2,
    complaints: [],
    ask: [],
  },
  {
    id: 'cytokine-release-syndrome', label: 'Cytokine release syndrome', page: page('onc-crs-recognize'), lethality: 1,
    complaints: ['fever', 'fatigue-hypotension', 'dyspnea-cough'],
    ask: [
      q('Fever?', ['pi-idecabtagene-vicleucel']),
      q('Difficulty breathing?', ['pi-idecabtagene-vicleucel']),
      q('Dizziness or light-headedness?', ['pi-idecabtagene-vicleucel']),
      q('Fast heartbeat?', ['pi-idecabtagene-vicleucel']),
      q('Headache?', ['pi-idecabtagene-vicleucel']),
    ],
  },
  {
    id: 'neurotoxicity-icans', label: 'Neurotoxicity (ICANS)', page: page('onc-icans-recognize'), lethality: 1,
    complaints: ['confusion-neuro', 'headache-vision', 'weakness'],
    ask: [
      q('Any new confusion or disorientation?', ['pi-ciltacabtagene-autoleucel']),
      q('Difficulty speaking, reading or writing?', ['pi-ciltacabtagene-autoleucel']),
      q('Any seizure?', ['pi-ciltacabtagene-autoleucel']),
      q('Tremor or slower movements?', ['pi-ciltacabtagene-autoleucel']),
    ],
  },
  {
    id: 'hlh-mas', label: 'HLH / macrophage activation (MAS)', page: own('odse-tox-route-hlh'), lethality: 1,
    complaints: ['fever', 'bleeding-bruising', 'jaundice-lfts', 'fatigue-hypotension'],
    ask: [],
  },
  {
    id: 'drug-hemorrhage', label: 'Hemorrhage', page: own('odse-tox-route-hemorrhage'), lethality: 1,
    complaints: ['bleeding-bruising', 'headache-vision', 'confusion-neuro', 'dyspnea-cough', 'blood-in-urine', 'fatigue-hypotension'],
    ask: [],
  },
  {
    id: 'drug-thromboembolism', label: 'Thromboembolism and ischemic events', page: own('odse-tox-route-thromboembolism'), lethality: 1,
    complaints: ['chest-pain', 'dyspnea-cough', 'confusion-neuro', 'weakness', 'limb-swelling'],
    ask: [],
  },
  {
    id: 'drug-gi-perforation', label: 'Gastrointestinal perforation', page: { tree: 'abdominal-pain-hub', node: 'ap-perf-entry' }, lethality: 1,
    complaints: ['diarrhea-abdominal-pain', 'fever', 'fatigue-hypotension'],
    ask: [],
  },
  {
    id: 'serious-infection', label: 'Serious infection', page: own('odse-tox-route-infection'), lethality: 1,
    complaints: ['fever', 'dyspnea-cough', 'confusion-neuro', 'fatigue-hypotension'],
    ask: [
      q('Fever?', ['pi-idecabtagene-vicleucel']),
      q('Chills?', ['pi-idecabtagene-vicleucel']),
      q('New weakness?', ['pi-ibrutinib']),
      q('New confusion?', ['pi-ibrutinib']),
      q('Flu-like symptoms?', ['pi-acalabrutinib']),
      q('New cough?', ['pi-ofatumumab']),
    ],
  },
  {
    id: 'drug-lung-toxicity', label: 'Lung toxicity or pneumonitis', page: own('odse-tox-route-lung-toxicity'), lethality: 1,
    complaints: ['dyspnea-cough', 'fever', 'chest-pain'],
    ask: [],
  },
  {
    id: 'drug-cardiotoxicity', label: 'Cardiotoxicity (heart failure, cardiomyopathy)', page: own('odse-tox-route-cardiotoxicity'), lethality: 1,
    complaints: ['chest-pain', 'dyspnea-cough', 'fatigue-hypotension', 'fainting-palpitations', 'limb-swelling'],
    ask: [],
  },
  {
    id: 'drug-qt-prolongation', label: 'QT prolongation', page: { tree: 'torsades-de-pointes', node: 'tdp-risk-factors' }, lethality: 2,
    complaints: ['fatigue-hypotension', 'chest-pain', 'fainting-palpitations'],
    ask: [],
  },
  {
    id: 'drug-adrenal-insufficiency', label: 'Drug-induced adrenal insufficiency', page: { tree: 'adrenal-insufficiency', node: 'ai-start' }, lethality: 2,
    complaints: ['fatigue-hypotension', 'vomiting-polyuria', 'diarrhea-abdominal-pain'],
    ask: [],
  },
  {
    id: 'drug-hyperglycemia', label: 'Hyperglycemia', page: own('odse-tox-route-hyperglycemia'), lethality: 2,
    complaints: ['vomiting-polyuria', 'fatigue-hypotension', 'confusion-neuro'],
    ask: [
      q('Excessive thirst?', ['pi-alpelisib']),
      q('Urinating more often than usual, or a larger amount of urine than usual?', ['pi-alpelisib']),
      q('Increased appetite with weight loss?', ['pi-alpelisib']),
      q('Dry mouth?', ['pi-alpelisib']),
      q('Confusion?', ['pi-alpelisib']),
      q('Nausea or vomiting?', ['pi-alpelisib']),
      q('Fruity odor on the breath?', ['pi-alpelisib']),
      q('Difficulty breathing?', ['pi-alpelisib']),
      q('Dry or flushed skin?', ['pi-alpelisib']),
    ],
  },
  {
    id: 'drug-hypertension', label: 'Hypertension', page: { tree: 'hypertensive-emergency-adult', node: 'hypertensive-emergency-adult-start' }, lethality: 2,
    complaints: ['headache-vision', 'chest-pain', 'confusion-neuro'],
    ask: [],
  },
  {
    id: 'drug-hepatotoxicity', label: 'Liver toxicity', page: { tree: 'hepatitis', node: 'hepatitis-start' }, lethality: 2,
    complaints: ['jaundice-lfts', 'diarrhea-abdominal-pain', 'bleeding-bruising'],
    ask: [],
  },
  {
    id: 'drug-severe-skin', label: 'Drug-induced severe skin reactions', page: { tree: 'sjs-ten', node: 'sjs-ten-start' }, lethality: 2,
    complaints: ['rash-skin', 'fever'],
    ask: [],
  },
  {
    id: 'drug-nephrotoxicity', label: 'Kidney toxicity', page: own('odse-tox-route-nephrotoxicity'), lethality: 2,
    complaints: ['vomiting-polyuria'],
    ask: [],
  },
  {
    id: 'drug-cns-toxicity', label: 'CNS toxicity', page: own('odse-tox-route-cns-toxicity'), lethality: 2,
    complaints: ['confusion-neuro', 'headache-vision'],
    ask: [],
  },
  {
    id: 'drug-electrolyte', label: 'Electrolyte disturbance', page: own('odse-tox-route-electrolyte'), lethality: 2,
    complaints: ['weakness', 'confusion-neuro'],
    ask: [],
  },
  {
    id: 'drug-pancreatitis', label: 'Drug-induced pancreatitis', page: { tree: 'acute-pancreatitis', node: 'ap-start' }, lethality: 2,
    complaints: ['diarrhea-abdominal-pain', 'vomiting-polyuria'],
    ask: [],
  },
  {
    id: 'rhabdomyolysis', label: 'Rhabdomyolysis', page: { tree: 'rhabdomyolysis', node: 'rhabdo-start' }, lethality: 2,
    complaints: ['weakness'],
    ask: [],
  },
  {
    id: 'tumor-flare', label: 'Tumor flare', page: own('odse-tox-route-tumor-flare'), lethality: 3,
    complaints: ['weakness', 'numbness-tingling', 'dyspnea-cough'],
    ask: [],
  },
  {
    id: 'drug-fluid-retention', label: 'Fluid retention and effusions', page: own('odse-tox-route-fluid-retention'), lethality: 2,
    complaints: ['dyspnea-cough', 'chest-pain', 'fatigue-hypotension', 'limb-swelling'],
    ask: [],
  },
  {
    id: 'drug-arrhythmia', label: 'Arrhythmia', page: own('odse-tox-route-arrhythmia'), lethality: 2,
    complaints: ['fatigue-hypotension', 'chest-pain', 'fainting-palpitations'],
    ask: [],
  },
  {
    id: 'drug-diarrhea-colitis', label: 'Diarrhea and colitis', page: own('odse-tox-route-diarrhea-colitis'), lethality: 2,
    complaints: ['diarrhea-abdominal-pain'],
    ask: [],
  },
  {
    id: 'drug-ocular-toxicity', label: 'Eye toxicity', page: own('odse-tox-route-ocular-toxicity'), lethality: 3,
    complaints: ['headache-vision'],
    ask: [],
  },
  {
    id: 'drug-neuropathy', label: 'Peripheral neuropathy', page: own('odse-tox-route-neuropathy'), lethality: 3,
    complaints: ['weakness', 'numbness-tingling'],
    ask: [],
  },
  {
    id: 'drug-cardiopulmonary-arrest', label: 'Cardiopulmonary arrest or sudden death', page: own('odse-tox-route-cardiopulmonary-arrest'), lethality: 1,
    complaints: ['chest-pain', 'fainting-palpitations'],
    ask: [],
  },
  {
    id: 'late-neurotoxicity', label: 'Late neurotoxicity (parkinsonism, Guillain-Barre, cranial nerve palsy)', page: own('odse-tox-route-late-neurotoxicity'), lethality: 1,
    complaints: ['weakness', 'confusion-neuro', 'numbness-tingling'],
    ask: [],
  },
];
