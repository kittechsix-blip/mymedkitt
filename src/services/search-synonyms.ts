/**
 * Clinical and drug synonyms for the Home search. Pure data (no imports) so the
 * Node gold-set test builds exactly the same documents as the app.
 */

/** Alternative names that should resolve directly in the Home title lookup. */
export const CONSULT_TITLE_ALIASES: Record<string, string[]> = {
  'dress-syndrome': ['DRESS', 'drug reaction with eosinophilia and systemic symptoms', 'DIHS', 'drug induced hypersensitivity syndrome'],
  'lyme-disease': ['Lyme', 'borreliosis', 'Borrelia', 'erythema migrans', 'tick bite'],
  'sudden-hearing-loss': ['SSNHL', 'sudden sensorineural hearing loss', 'sudden deafness'],
  'radiculopathies': [
    'radiculoapthies', 'radiculopathy', 'cervical radiculopathy', 'thoracic radiculopathy',
    'lumbar radiculopathy', 'sacral radiculopathy', 'lumbosacral radiculopathy',
    'coccygeal radiculopathy', 'sciatica', 'dermatomes', 'myotomes',
  ],
};

/** Clinical synonyms for common queries */
export const CLINICAL_SYNONYMS: Record<string, string[]> = {
  'dress-syndrome': ['DRESS', 'DRESS syndrome', 'drug reaction with eosinophilia and systemic symptoms', 'drug reaction with eosinophilia', 'DIHS', 'drug induced hypersensitivity syndrome', 'drug rash with eosinophilia', 'DRESS steroid taper', 'RegiSCAR'],
  'lyme-disease': ['Lyme', 'borrelia', 'borreliosis', 'erythema migrans', 'bull\'s eye rash', 'bullseye rash', 'deer tick', 'blacklegged tick', 'ixodes', 'tick bite', 'tick bite prophylaxis', 'Lyme carditis', 'Lyme facial palsy', 'Lyme arthritis', 'SILC score'],
  'sudden-hearing-loss': ['sudden sensorineural hearing loss', 'SSNHL', 'sudden deafness', 'idiopathic hearing loss', 'sudden hearing loss first line treatment', 'Weber', 'Rinne', 'Rhrine', 'tuning fork', 'conductive versus sensorineural', 'blocked ear normal otoscopy', 'urgent audiometry', 'hearing loss steroids'],
  'acute-keratitis': ['keratitis', 'corneal ulcer', 'contact lens infection', 'dendritic ulcer', 'HSV keratitis', 'pseudodendrite', 'herpes zoster ophthalmicus', 'photokeratitis', 'welding flash', 'Acanthamoeba keratitis', 'fungal keratitis', 'fluorescein uptake patterns'],
  'radiculopathies': [...CONSULT_TITLE_ALIASES['radiculopathies'], 'pinched nerve', 'nerve root localization'],
  'primary-care-screening': ['preventive care', 'health maintenance', 'screening guidelines', 'USPSTF', 'what is my patient due for', 'vaccines due', 'adult immunization schedule', 'cancer screening', 'colonoscopy age', 'mammogram age', 'pap smear interval', 'lung cancer screening', 'PSA screening', 'no primary care', 'safety net', 'wellness visit'],
  'decompression-sickness': ['decompression illness', 'DCS', 'DCI', 'scuba diving', 'diving injury', 'diver', 'bends', 'caisson disease', 'rapid ascent', 'fast ascent', 'spinal decompression sickness', 'arterial gas embolism', 'recompression', 'hyperbaric oxygen', 'weakness urinary retention after scuba'],
  'thyroid': ['myxedema coma', 'myxoedema coma', 'decompensated hypothyroidism'],
  'paracentesis': ['sbp', 'spontaneous bacterial peritonitis', 'infected ascites', 'cirrhosis fever', 'sbp albumin'],
  'onc-drug-side-effects': ['chemo side effects', 'chemo side-effects', 'chemotherapy side effects', 'oncology drugs', 'oncology drug side effects', 'cancer drug', 'cancer drugs', 'cancer drug side effects', 'immunotherapy side effects', 'drug toxicity cancer'],
  'oncological-emergencies': ['neutropenia', 'neutropenic', 'chemo', 'chemotherapy', 'anc', 'absolute neutrophil count'],
  'alcohol-withdrawal': ['delirium tremens', 'dts', 'alcohol detox', 'etoh withdrawal', 'ciwa', 'alcohol withdrawal seizure'],
  'afib-rvr': ['afib', 'a-fib', 'atrial fibrillation', 'rvr', 'rapid ventricular', 'rate control', 'cardioversion'],
  'pe-treatment': ['pe', 'pulmonary embolism', 'dvt', 'anticoagulation', 'clot', 'thrombus'],
  'pneumothorax': ['pneumo', 'ptx', 'collapsed lung', 'chest tube', 'needle decompression'],
  'burns': ['burn', 'thermal burn', 'scald', 'flame burn', 'eschar', 'escharotomy', 'circumferential burn', 'compartment syndrome', 'inhalation injury', 'carbon monoxide', 'cyanide', 'tbsa', 'parkland', 'rule of nines', 'hydrofluoric acid', 'hydroflouric acid', 'hydrofloric acid', 'hf burn', 'hf acid', 'fluoride burn', 'calcium gluconate burn', 'chemical burn', 'burn center'],
  'sepsis': ['septic', 'infection', 'bacteremia', 'lactate', 'qsofa', 'sofa'],
  'stroke': ['cva', 'tpa', 'thrombectomy', 'nihss', 'ischemic', 'hemorrhagic'],
  'stemi': ['mi', 'myocardial infarction', 'heart attack', 'pci', 'cath lab'],
  'nstemi': ['mi', 'acs', 'acute coronary', 'troponin'],
  'intubation': ['rsi', 'airway', 'etomidate', 'rocuronium', 'tube'],
  'dka': ['diabetic ketoacidosis', 'hyperglycemia', 'insulin', 'bicarb'],
  'hypoglycemia': ['low blood sugar', 'low glucose', 'dextrose', 'd50', 'd10', 'glucagon', 'sulfonylurea', 'glipizide', 'glyburide', 'glimepiride', 'octreotide', 'insulin overdose', 'recurrent hypoglycemia', 'diabetes', 'endocrine', 'critical sample'],
  'dementia': ['memory loss', 'memory problem', 'cognitive decline', 'cognitive impairment', 'new dementia', 'suspected dementia', 'major neurocognitive disorder', 'mild cognitive impairment', 'mci', 'alzheimer', 'alzheimers', 'alzheimer disease', 'vascular dementia', 'lewy body', 'frontotemporal dementia', 'nph', 'wandering', 'caregiver', 'caregiver failure', 'unsafe home', 'delirium first', 'confusion chronic', 'agitation dementia'],
  'dementia-agitation': ['dementia agitation', 'agitated dementia', 'behavior crisis dementia', 'lewy body agitation', 'parkinson dementia agitation', 'capacity dementia', 'wandering agitation', 'sundowning'],
  'thrombocytopenia': ['low platelets', 'platelets low', 'platelet count', 'thrombocytopaenia', 'petechiae', 'purpura', 'mucosal bleeding', 'itp', 'immune thrombocytopenia', 'ttp', 'thrombotic thrombocytopenic purpura', 'tma', 'thrombotic microangiopathy', 'schistocytes', 'plasmic', 'dic', 'disseminated intravascular coagulation', 'hit', 'heparin induced thrombocytopenia', '4ts', 'platelet transfusion', 'drug induced thrombocytopenia', 'pseudothrombocytopenia', 'hellp', 'acute leukemia', 'marrow failure'],
  'unilateral-facial-pain-hub': ['facial pain-unilateral', 'facial pain unilateral', 'facial pain', 'unilateral facial pain', 'face pain', 'jaw pain', 'cheek pain', 'temple pain', 'orbital pain', 'eye pain', 'trigeminal neuralgia', 'tic douloureux', 'cluster headache', 'tac', 'trigeminal autonomic cephalalgia', 'dental pain', 'tooth pain', 'odontogenic infection', 'sinus pain', 'rhinosinusitis', 'zoster', 'hzo', 'herpes zoster ophthalmicus', 'ramsay hunt', 'tmj', 'temporal arteritis', 'giant cell arteritis', 'gca', 'carotid dissection', 'vertebral dissection', 'horner', 'red eye', 'aacg'],
  'dental-extraction-complications': ['dental extraction', 'tooth extraction', 'post extraction', 'post-extraction', 'post extraction bleeding', 'socket bleeding', 'dry socket', 'alveolar osteitis', 'oral bleeding', 'post extraction infection', 'odontogenic infection', 'gelfoam', 'surgicel', 'tranexamic acid', 'txa', 'tea bag', 'oroantral communication', 'sinus communication', 'dental box', 'extraction complications'],
  'syncope': ['passed out', 'fainted', 'loss of consciousness', 'loc'],
  'meningitis': ['meningeal', 'lumbar puncture', 'lp', 'csf'],
  'syphilis': ['neurosyphilis', 'treponemal', 'rpr', 'vdrl'],
  'status-epilepticus': ['seizure', 'convulsion', 'epilepsy', 'benzodiazepine'],
};

/** Drug synonyms */
export const DRUG_SYNONYMS: Record<string, string[]> = {
  'metoprolol': ['lopressor', 'beta blocker', 'bb'],
  'diltiazem': ['cardizem', 'calcium channel blocker', 'ccb'],
  'amiodarone': ['cordarone', 'antiarrhythmic'],
  'heparin': ['anticoagulant', 'blood thinner'],
  'enoxaparin': ['lovenox', 'lmwh', 'anticoagulant'],
  'fentanyl': ['pain', 'opioid', 'narcotic', 'sedation'],
  'ketamine': ['sedation', 'dissociative', 'psi'],
  'propofol': ['diprivan', 'sedation', 'induction'],
  'rocuronium': ['paralytic', 'nmb', 'rsi'],
  'succinylcholine': ['sux', 'paralytic', 'depolarizing'],
  'norepinephrine': ['levophed', 'norepi', 'pressor', 'vasopressor'],
  'epinephrine': ['epi', 'adrenaline', 'pressor'],
  'magnesium': ['mag', 'torsades', 'eclampsia'],
};
