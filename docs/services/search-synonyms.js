/**
 * Clinical and drug synonyms for the Home search. Pure data (no imports) so the
 * Node gold-set test builds exactly the same documents as the app.
 */
/** Clinical synonyms for common queries */
export const CLINICAL_SYNONYMS = {
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
export const DRUG_SYNONYMS = {
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
