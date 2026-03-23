// MedKitt — Drug Reference Store
// Centralized drug data for all medications used across decision trees.
// Each entry includes class, indications, dosing, contraindications, and citations.

export interface WeightCalc {
  dosePerKg: number;       // dose per kg (e.g., 0.6 for 0.6 mg/kg)
  unit: string;            // "mg", "mcg", "units", etc.
  maxDose?: number;        // max single dose cap
  dailyDivided?: number;   // if /day dose, number of divisions (e.g., 3 for q8h)
  label?: string;          // optional label override (e.g., "Low-dose alternative")
}

export interface DrugDose {
  indication: string;
  regimen: string;
  weightCalc?: WeightCalc | WeightCalc[];
}

export interface DrugEntry {
  id: string;
  name: string;
  genericName: string;
  drugClass: string;
  route: string;
  indications: string[];
  dosing: DrugDose[];
  contraindications?: string[];
  cautions?: string[];
  monitoring?: string;
  notes?: string;
  image?: { src: string; alt: string; caption?: string };
  citations: string[];
}

// -------------------------------------------------------------------
// Drug Definitions (Alphabetical)
// -------------------------------------------------------------------

const ACETAZOLAMIDE: DrugEntry = {
  id: 'acetazolamide',
  name: 'Acetazolamide',
  genericName: 'Acetazolamide',
  drugClass: 'Carbonic anhydrase inhibitor',
  route: 'IV/PO',
  indications: ['Hyperkalemia (nephron bomb — third diuretic)', 'Hypokalemic periodic paralysis (prevention)', 'Metabolic alkalosis', 'Acute mountain sickness'],
  dosing: [
    {
      indication: 'Hyperkalemia (nephron bomb)',
      regimen: '250-1000 mg IV or PO. Third agent added to loop + thiazide for maximal kaliuresis.',
    },
    {
      indication: 'Periodic paralysis prevention',
      regimen: 'Variable dosing — no standardized regimen. Typically 125-500 mg PO BID.',
    },
    {
      indication: 'Metabolic alkalosis',
      regimen: '250-500 mg IV q6-8h.',
    },
  ],
  contraindications: [
    'Severe hepatic insufficiency',
    'Hyponatremia',
    'Hypokalemia (except when combined with K-sparing agents)',
    'Sulfonamide allergy (cross-reactivity)',
  ],
  cautions: [
    'Causes metabolic acidosis (loss of bicarbonate) — desired effect in alkalosis but monitor in acidotic patients',
    'Kidney stones (long-term use)',
    'Paresthesias common',
  ],
  monitoring: 'Serum bicarbonate, potassium, renal function. ABG if concern for worsening acidosis.',
  notes: 'Blocks carbonic anhydrase in proximal tubule — promotes sodium bicarbonate excretion. In the nephron bomb, provides a third point of sequential nephron blockade (proximal tubule). For hypokalemic periodic paralysis: first-line preventive agent — mechanism may involve systemic acidosis reducing attack susceptibility.',
  citations: [
    'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-51.',
    'Statland JM, et al. Review of the Diagnosis and Treatment of Periodic Paralysis. Muscle Nerve. 2018;57(4):522-530.',
  ],
};

const ACETAMINOPHEN: DrugEntry = {
  id: 'acetaminophen',
  name: 'Acetaminophen (Tylenol)',
  genericName: 'Acetaminophen',
  drugClass: 'Non-opioid analgesic / Antipyretic',
  route: 'PO / IV',
  indications: ['Headache / Analgesia', 'Fever', 'Pediatric fever / pain'],
  dosing: [
    {
      indication: 'Headache / Analgesia',
      regimen: '1000 mg PO or IV every 6 hours. Max 4000 mg/24h (2000 mg/24h in hepatic impairment or chronic alcohol use). IV administered over 15 minutes.',
    },
    {
      indication: 'Pediatric fever / pain',
      regimen: '15 mg/kg PO/PR every 4-6 hours. Max 75 mg/kg/day (not to exceed 4000 mg/day).',
      weightCalc: { dosePerKg: 15, unit: 'mg', maxDose: 1000 },
    },
  ],
  contraindications: ['Severe hepatic impairment or active liver disease', 'Known hypersensitivity'],
  cautions: ['Hepatotoxicity at supratherapeutic doses (>4 g/day)', 'Reduce max dose to 2 g/day in chronic alcohol use or hepatic impairment', 'IV formulation: weight-based dosing for patients <50 kg (15 mg/kg, max 750 mg/dose)'],
  monitoring: 'LFTs if prolonged use or hepatic risk factors. Serum level if overdose suspected.',
  notes: 'First-line analgesic for SAH-associated headache. Preferred over NSAIDs (impair platelet function) and opioids (confound neurologic examination). IV onset 5-10 min vs PO 30-60 min. In thyroid storm: use for hyperthermia management. AVOID aspirin and NSAIDs — they displace T4 from thyroxine-binding globulin, increasing free (active) thyroid hormone levels.',
  citations: ['Connolly ES Jr, et al. AHA/ASA Guidelines for management of aneurysmal subarachnoid hemorrhage. Stroke. 2012;43(6):1711-1737.'],
};

const ACYCLOVIR: DrugEntry = {
  id: 'acyclovir',
  name: 'Acyclovir',
  genericName: 'Acyclovir',
  drugClass: 'Antiviral (Nucleoside Analog)',
  route: 'IV',
  indications: ['Neonatal HSV (suspected or confirmed)', 'HSV encephalitis'],
  dosing: [
    {
      indication: 'Neonatal HSV (0-3 months)',
      regimen: '20 mg/kg IV q8h. Duration: minimum 5 doses or until HSV PCR results negative. If PCR not resulted after 5 doses, contact ID.',
    },
    {
      indication: 'Adult/Adolescent Encephalitis (HSV, VZV)',
      regimen: '10 mg/kg IV q8h. Infuse over 1 hour. Continue pending HSV/VZV PCR results. If PCR negative but high clinical suspicion, continue and repeat PCR at 3-7 days. Duration: 14-21 days for confirmed HSV encephalitis.',
      weightCalc: { dosePerKg: 10, unit: 'mg' },
    },
  ],
  cautions: [
    'Crystalline nephropathy — ensure adequate hydration',
    'Infuse over 1 hour',
  ],
  monitoring: 'Renal function (BUN, creatinine). Urine output. Hold tube #4 CSF for HSV PCR. Surface cultures: conjunctiva, throat, nasopharynx, rectum, vesicle fluid if present.',
  notes: 'Empiric acyclovir should be started in any neonate with suspected HSV — fever, seizures, vesicular rash, CSF pleocytosis, or elevated LFTs without other explanation. Do not wait for PCR results to initiate treatment.',
  citations: [
    'Kimberlin DW, et al. Guidance on Management of Asymptomatic Neonates Born to Women with Active Genital Herpes Lesions. Pediatrics. 2013;131(2):e572-e579.',
    'Red Book: 2021-2024 Report of the Committee on Infectious Diseases. American Academy of Pediatrics.',
  ],
};

const ALBUTEROL_NEB: DrugEntry = {
  id: 'albuterol-neb',
  name: 'Albuterol (Nebulized)',
  genericName: 'Albuterol sulfate',
  drugClass: 'Beta-2 adrenergic agonist',
  route: 'Inhaled (nebulized)',
  indications: ['Hyperkalemia (potassium shift)', 'Acute bronchospasm', 'Anaphylaxis bronchospasm'],
  dosing: [
    {
      indication: 'Hyperkalemia',
      regimen: '10-20 mg nebulized (4-8 standard 2.5 mg nebulizers administered back-to-back). Onset: 30 minutes. Peak: 90-120 minutes. Duration: 2-4 hours.',
    },
    {
      indication: 'Bronchospasm',
      regimen: '2.5 mg nebulized q20 min x 3 doses, then q1-4h PRN.',
    },
    {
      indication: 'Anaphylaxis bronchospasm',
      regimen: '2.5-5 mg nebulized, may give continuous if severe bronchospasm. For persistent wheezing despite adequate epinephrine, especially with asthma overlap. Epinephrine is the primary bronchodilator in anaphylaxis — albuterol is adjunctive only.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to albuterol',
  ],
  cautions: [
    'Nearly always UNDERDOSED for hyperkalemia in clinical practice',
    'Standard 2.5 mg neb dose is inadequate — need 10-20 mg total',
    'Efficacy ~50% lower in ESRD patients',
    'Tachycardia, tremor, hyperglycemia',
  ],
  monitoring: 'Heart rate, potassium level, glucose.',
  notes: 'In reality, albuterol is nearly always underdosed for hyperkalemia. The real-world efficacy is consequently minimal. Terbutaline SQ is preferred when available — logistically simpler (single injection vs. prolonged nebulization). Expected K+ reduction: 0.6-1.0 mEq/L (at adequate dose).',
  citations: [
    'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
  ],
};

const AMOXICILLIN: DrugEntry = {
  id: 'amoxicillin',
  name: 'Amoxicillin',
  genericName: 'Amoxicillin',
  drugClass: 'Aminopenicillin',
  route: 'PO',
  indications: ['UTI in pregnancy', 'Asymptomatic bacteriuria in pregnancy'],
  dosing: [
    {
      indication: 'UTI / Asymptomatic bacteriuria in pregnancy',
      regimen: '875 mg PO BID × 7 days. First-line option for UTI in pregnancy. Guided by local resistance patterns and culture sensitivities.',
    },
  ],
  contraindications: [
    'Penicillin allergy',
    'History of amoxicillin-associated cholestatic jaundice/hepatic dysfunction',
  ],
  cautions: [
    'High local E. coli resistance may limit empiric use — check antibiogram',
    'Mononucleosis — rash risk with aminopenicillins',
  ],
  monitoring: 'Urine culture to confirm sensitivity. Repeat culture after treatment to confirm eradication.',
  notes: 'Generally considered safe in all trimesters of pregnancy. Local resistance patterns should guide empiric therapy — discuss with OB and ID if uncertain.',
  citations: [
    'Pedigo R. First Trimester Pregnancy Emergencies. Emergency Medicine Practice. 2019;21(1):1-28.',
    'ACOG Committee Opinion No. 717: Sulfonamides, Nitrofurantoin, and Risk of Birth Defects. Obstet Gynecol. 2017;130(3):e150-e152.',
  ],
};

const AMOXICILLIN_CLAVULANATE: DrugEntry = {
  id: 'amoxicillin-clavulanate',
  name: 'Amoxicillin-Clavulanate (Augmentin)',
  genericName: 'Amoxicillin / Clavulanic acid',
  drugClass: 'Aminopenicillin + beta-lactamase inhibitor',
  route: 'PO',
  indications: ['Pediatric UTI (alternative outpatient)', 'Otitis media', 'Sinusitis', 'Bite wounds'],
  dosing: [
    {
      indication: 'Pediatric UTI',
      regimen: '20-40 mg/kg/day divided BID. Max 875 mg/dose.',
      weightCalc: { dosePerKg: 40, unit: 'mg', maxDose: 875, dailyDivided: 2 },
    },
  ],
  contraindications: [
    'IgE-mediated penicillin allergy',
    'History of cholestatic jaundice with amoxicillin-clavulanate',
  ],
  cautions: [
    'Diarrhea common (clavulanate component)',
    'Hepatotoxicity rare but possible',
  ],
  monitoring: 'Clinical response. LFTs if prolonged course or hepatic symptoms. Repeat urine culture if no improvement at 48-72 hours.',
  notes: 'Alternative empiric outpatient antibiotic for pediatric febrile UTI when cephalexin not tolerated. Per DCMC EBOC guidelines.',
  citations: [
    'Dell Children\'s EBOC. First Febrile Urinary Tract Infection Clinical Pathway. May 2017.',
    'Roberts KB. Urinary tract infection: clinical practice guideline for febrile infants and children 2 to 24 months. Pediatrics. 2011;128(3):595-610.',
  ],
};

const AMPICILLIN: DrugEntry = {
  id: 'ampicillin',
  name: 'Ampicillin',
  genericName: 'Ampicillin sodium',
  drugClass: 'Aminopenicillin',
  route: 'IV',
  indications: ['Neonatal sepsis (empiric)', 'Meningitis (GBS, Listeria, Enterococcus coverage)'],
  dosing: [
    {
      indication: 'Non-meningitic (0-7 days)',
      regimen: '50 mg/kg IV q8h.',
    },
    {
      indication: 'Non-meningitic (8-28 days)',
      regimen: '50 mg/kg IV q6h.',
    },
    {
      indication: 'Meningitic (0-7 days)',
      regimen: '100 mg/kg IV q8h.',
    },
    {
      indication: 'Meningitic (8-28 days)',
      regimen: '75 mg/kg IV q6h.',
    },
    {
      indication: 'Meningitic (>28 days, added to Ceftriaxone)',
      regimen: '75 mg/kg IV q6h.',
    },
    {
      indication: 'Adult Meningitis (Listeria coverage)',
      regimen: '2 g IV q4h. Add to ceftriaxone + vancomycin for patients age ≥50, pregnant, or immunocompromised. Active against L. monocytogenes, which is not covered by cephalosporins. Mortality from listerial meningitis: 17-30%.',
    },
  ],
  contraindications: [
    'IgE-mediated penicillin allergy',
  ],
  cautions: [
    'Rash common (non-allergic maculopapular rash, especially with concurrent EBV infection)',
  ],
  monitoring: 'Clinical response. CBC, CRP, blood cultures. CSF cultures if meningitis suspected.',
  notes: 'Covers GBS, Listeria monocytogenes, and Enterococcus — organisms not covered by cephalosporins. Always pair with Gentamicin (0-7d) or Ceftriaxone/Cefepime (8-28d). Meningitic doses are higher to achieve adequate CSF penetration.',
  citations: [
    'Puopolo KM, et al. Management of Neonates Born at ≥35 0/7 Weeks\' Gestation With Suspected or Proven Early-Onset Bacterial Sepsis. Pediatrics. 2018;142(6):e20182894.',
    'Red Book: 2021-2024 Report of the Committee on Infectious Diseases. American Academy of Pediatrics.',
  ],
};

const ALTEPLASE: DrugEntry = {
  id: 'alteplase',
  name: 'Alteplase (tPA)',
  genericName: 'Alteplase',
  drugClass: 'Thrombolytic (tissue plasminogen activator)',
  route: 'IV',
  indications: ['Massive (high-risk) pulmonary embolism', 'Acute ischemic stroke', 'Acute STEMI'],
  dosing: [
    {
      indication: 'High-risk PE',
      regimen: '100 mg IV over 2 hours: 0.6 mg/kg (max 50 mg) over first 15 min, remainder over next 1 hr 45 min. Stop UFH drip before infusion. Post-infusion: check PTT \u2014 if \u226475 restart UFH without bolus; if >75 repeat PTT q2hr until \u226475.',
      weightCalc: { dosePerKg: 0.6, unit: 'mg', maxDose: 50, label: 'Bolus (first 15 min)' },
    },
    {
      indication: 'Acute ischemic stroke (0\u20134.5h)',
      regimen: '0.9 mg/kg IV (max 90 mg): Give 10% as IV bolus over 1 min, remaining 90% infused over 60 min. BP must be <185/110 before and <180/105 for 24h after. No antithrombotics \u00D7 24h post-infusion.',
      weightCalc: { dosePerKg: 0.9, unit: 'mg', maxDose: 90 },
    },
    {
      indication: 'STEMI / Fibrinolysis',
      regimen: 'Accelerated 90-minute regimen:\n\u2022 15 mg IV bolus\n\u2022 Then 0.75 mg/kg (max 50 mg) IV over 30 minutes\n\u2022 Then 0.5 mg/kg (max 35 mg) IV over 60 minutes\n\u2022 Total max dose: 100 mg\n\nPatency rate: 54% (TIMI grade 3 flow at 90 min).',
      weightCalc: [
        { dosePerKg: 0.75, unit: 'mg', maxDose: 50, label: '30-min infusion' },
        { dosePerKg: 0.5, unit: 'mg', maxDose: 35, label: '60-min infusion' },
      ],
    },
  ],
  contraindications: [
    'Absolute: Haemorrhagic stroke or stroke of unknown origin, Ischaemic stroke within 6 months, CNS neoplasm, Major trauma/surgery/head injury within 3 weeks, Bleeding diathesis, Active bleeding',
    'Relative: TIA within 6 months, Oral anticoagulation, Pregnancy or first postpartum week, Non-compressible puncture sites, Traumatic resuscitation, Refractory HTN (SBP >180), Advanced liver disease, Infective endocarditis, Active peptic ulcer',
  ],
  monitoring: 'Assess hemodynamic response 1\u20132 hours post-infusion. Check PTT before restarting heparin.',
  notes: 'Fibrinolytic therapy is the first-line reperfusion strategy for high-risk PE with hemodynamic instability (ESC 2019, Class I, Level B).',
  citations: [
    'Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020;41(4):543-603.',
  ],
};

const AMIODARONE: DrugEntry = {
  id: 'amiodarone',
  name: 'Amiodarone',
  genericName: 'Amiodarone hydrochloride',
  drugClass: 'Class III antiarrhythmic (multichannel blocker)',
  route: 'IV / PO',
  indications: ['A-Fib / A-Flutter rate control', 'A-Fib / A-Flutter rhythm control (cardioversion)', 'Ventricular tachycardia', 'Cardiac arrest (VF/pulseless VT)'],
  dosing: [
    {
      indication: 'A-Fib rate control',
      regimen: 'Load: 150 mg IV over 10 min. Infusion: 1 mg/min x 6 hr, then 0.5 mg/min x 18 hr. May re-bolus 150 mg x2-3 PRN (total 150-450 mg boluses). Do not conclude failure without adequate re-bolusing.',
    },
    {
      indication: 'A-Fib rhythm control (cardioversion)',
      regimen: 'Load: 300 mg (or 5-7 mg/kg) IV over 30-60 min. Then 1 mg/min infusion. Total 24hr IV dose: 1,200-3,000 mg. Convert to PO 400 mg BID after >24hr IV, until 10g cumulative dose reached, then 200 mg daily maintenance.',
      weightCalc: { dosePerKg: 5, unit: 'mg', label: 'Load (5 mg/kg)' },
    },
    {
      indication: 'Cardiac arrest (VF/pVT)',
      regimen: '300 mg IV/IO push. May repeat 150 mg x1.',
    },
  ],
  contraindications: [
    'Cardiogenic shock',
    'Severe sinus node dysfunction without pacemaker',
    'Second/third-degree AV block without pacemaker',
    'Known hypersensitivity to iodine (contains iodine)',
  ],
  cautions: [
    'QT prolongation \u2014 monitor QTc, hold if QTc >500ms',
    'Hepatotoxicity \u2014 check LFTs at baseline and periodically',
    'Thyroid dysfunction (both hypo and hyper) \u2014 contains 37% iodine by weight',
    'Pulmonary toxicity with chronic use \u2014 baseline CXR and PFTs recommended',
    'Phlebitis with peripheral IV \u2014 use central line when possible for infusions >24hr',
    'Potentiates warfarin \u2014 reduce warfarin dose by 30-50% when initiating',
  ],
  monitoring: 'Continuous telemetry during IV loading. QTc interval. LFTs, TFTs, CXR at baseline. For chronic use: TFTs, LFTs, PFTs, ophthalmologic exam every 6-12 months.',
  notes: 'Amiodarone is useful for critically ill patients due to relative hemodynamic stability compared to beta-blockers and CCBs. Achieves rate control in ~74% of patients. Chemical cardioversion may occur \u2014 continue infusion until critical illness resolves to prevent AF recurrence. Chronic use causes numerous side effects \u2014 plan transition to safer long-term agent (e.g., beta-blocker) after recovery.',
  citations: [
    'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.',
    'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
    'Bosch NA, et al. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434.',
  ],
};

const ASPIRIN: DrugEntry = {
  id: 'aspirin',
  name: 'Aspirin',
  genericName: 'Acetylsalicylic acid',
  drugClass: 'Antiplatelet (COX inhibitor)',
  route: 'PO',
  indications: ['Acute ischemic stroke', 'Acute coronary syndrome', 'Secondary stroke prevention', 'DAPT (dual antiplatelet therapy)'],
  dosing: [
    {
      indication: 'Acute ischemic stroke (no IVT)',
      regimen: '160\u2013325 mg PO within 24\u201348 hours of symptom onset. If given via NG tube: use non-enteric-coated formulation or crush enteric-coated.',
    },
    {
      indication: 'Post-IVT stroke',
      regimen: 'Hold aspirin for 24 hours post-thrombolysis. Obtain NCCT at 24h to exclude hemorrhagic transformation before starting. Then 81\u2013325 mg daily.',
    },
    {
      indication: 'DAPT (minor stroke)',
      regimen: '325 mg loading dose + clopidogrel 300 mg on day 1. Then aspirin 81 mg + clopidogrel 75 mg daily \u00D7 21 days, followed by single antiplatelet.',
    },
  ],
  contraindications: [
    'Active intracranial hemorrhage',
    'Known aspirin allergy or NSAID-exacerbated respiratory disease',
    'Active GI bleeding',
  ],
  cautions: [
    'GI bleeding risk \u2014 consider PPI co-therapy if DAPT',
    'Platelet dysfunction lasts 7\u201310 days (irreversible COX inhibition)',
    'Avoid concurrent NSAIDs (competitive COX-1 binding reduces aspirin efficacy)',
  ],
  monitoring: 'No routine monitoring required. Monitor for signs of bleeding.',
  notes: 'Aspirin within 24\u201348h of acute ischemic stroke reduces early recurrent stroke (IST and CAST trials). DAPT with aspirin + clopidogrel for 21 days (POINT trial) reduces stroke recurrence in minor stroke/TIA (NNT 38) with modest bleeding increase.',
  citations: [
    'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
    'Johnston SC, et al. Clopidogrel and Aspirin in Acute Ischemic Stroke and High-Risk TIA (POINT). N Engl J Med. 2018;379(3):215-225.',
  ],
};

const ATAZANAVIR: DrugEntry = {
  id: 'atazanavir',
  name: 'Atazanavir (Reyataz)',
  genericName: 'Atazanavir',
  drugClass: 'Protease inhibitor (PI)',
  route: 'PO',
  indications: ['HIV treatment', 'HIV — ED management'],
  dosing: [
    {
      indication: 'HIV Treatment (boosted)',
      regimen: '300 mg PO once daily + ritonavir 100 mg PO once daily. Must take with food. Requires acidic environment for absorption — avoid PPIs, separate H2 blockers by 12h.',
    },
    {
      indication: 'HIV — Nephrolithiasis / Jaundice',
      regimen: 'Atazanavir causes RADIOLUCENT kidney stones (drug metabolite stones not visible on standard noncontrast CT — look for secondary signs: hydroureter, perinephric stranding). Also causes benign indirect hyperbilirubinemia via UDP-glucuronosyltransferase inhibition → jaundice (resolves on discontinuation). Discuss with HIV provider regarding dose adjustment or alternative.',
    },
  ],
  contraindications: ['Severe hepatic impairment'],
  cautions: [
    'Radiolucent kidney stones — CT may be falsely negative',
    'Indirect hyperbilirubinemia/jaundice (benign)',
    'CYP3A4 substrate — multiple drug interactions',
    'Requires acidic gastric pH for absorption — PPIs contraindicated',
    'QTc prolongation reported',
  ],
  monitoring: 'Serum bilirubin (expected elevation), renal function, urinalysis if flank pain',
  notes: 'Most commonly used PI alongside darunavir. Stones from PIs are radiolucent if composed purely of concentrated drug metabolites. In patients with ongoing renal colic symptoms, consult urology for ureteroscopy.',
  citations: [
    'Saag MS, Gandhi RT, Hoy JF, et al. Antiretroviral drugs for treatment and prevention of HIV infection in adults: 2020 recommendations of the International Antiviral Society-USA panel. JAMA. 2020;324(16):1651-1669.',
    'Izzedine H, Lescure FX, Bonnet F. HIV medication-based urolithiasis. Clin Kidney J. 2014;7(2):121-126.',
  ],
};

const ATORVASTATIN: DrugEntry = {
  id: 'atorvastatin',
  name: 'Atorvastatin (Lipitor)',
  genericName: 'Atorvastatin calcium',
  drugClass: 'HMG-CoA reductase inhibitor (statin)',
  route: 'PO',
  indications: ['Acute coronary syndrome', 'Hyperlipidemia', 'Secondary cardiovascular prevention'],
  dosing: [
    {
      indication: 'ACS / NSTEMI (high-intensity)',
      regimen: 'Atorvastatin 80 mg PO daily. Initiate within 24 hours of presentation regardless of baseline LDL. Continue indefinitely. Alternative: Rosuvastatin 20-40 mg daily.',
    },
  ],
  contraindications: [
    'Active liver disease or unexplained persistent transaminase elevation',
    'Pregnancy and lactation',
  ],
  cautions: [
    'Myopathy/rhabdomyolysis — risk increased with CYP3A4 inhibitors, high dose, advanced age, renal impairment',
    'Hepatotoxicity — check LFTs at baseline and if symptoms develop',
    'New-onset diabetes — modest risk increase with high-intensity therapy (NNH ~250)',
    'Drug interactions — avoid concomitant strong CYP3A4 inhibitors (clarithromycin, itraconazole, HIV protease inhibitors)',
  ],
  monitoring: 'Lipid panel at 4-12 weeks, then annually. LFTs at baseline. CK if myalgia develops. Target LDL <70 mg/dL (consider <55 if very high risk).',
  notes: 'PROVE IT-TIMI 22 trial: high-intensity atorvastatin 80mg reduced cardiovascular events by 16% vs moderate-intensity pravastatin after ACS. Pleiotropic effects include plaque stabilization, anti-inflammatory properties, and endothelial function improvement. Initiate before discharge — in-hospital statin initiation improves long-term adherence.',
  citations: [
    'Cannon CP, et al. Intensive versus Moderate Lipid Lowering with Statins after Acute Coronary Syndromes (PROVE IT-TIMI 22). N Engl J Med. 2004;350(15):1495-1504.',
    'Grundy SM, et al. 2018 AHA/ACC Guideline on the Management of Blood Cholesterol. J Am Coll Cardiol. 2019;73(24):e285-e350.',
  ],
};

const AZITHROMYCIN: DrugEntry = {
  id: 'azithromycin',
  name: 'Azithromycin (Zithromax)',
  genericName: 'Azithromycin',
  drugClass: 'Macrolide antibiotic',
  route: 'PO/IV',
  indications: ['Traveler\'s diarrhea (fluoroquinolone-resistant regions)', 'Acute infectious diarrhea'],
  dosing: [
    {
      indication: 'Traveler diarrhea',
      regimen: '1000 mg PO × 1 dose, or 500 mg PO daily × 3 days. Preferred for Southeast Asia travel (>80% fluoroquinolone-resistant Campylobacter).',
    },
    {
      indication: 'Pediatric diarrhea',
      regimen: '10 mg/kg PO daily × 3 days. Max 500 mg/dose.',
      weightCalc: { dosePerKg: 10, unit: 'mg', maxDose: 500 },
    },
  ],
  contraindications: [
    'Known hypersensitivity to azithromycin or macrolides',
    'History of cholestatic jaundice/hepatic dysfunction with prior azithromycin use',
  ],
  cautions: [
    'QT prolongation risk \u2014 avoid with other QT-prolonging agents',
    'Hepatotoxicity \u2014 monitor for signs of liver injury',
  ],
  monitoring: 'QTc if concurrent QT-prolonging agents. LFTs if prolonged use or hepatic disease.',
  notes: 'First-line for traveler\'s diarrhea from Southeast Asia due to high rates of fluoroquinolone-resistant Campylobacter (>80%). Also effective for Shigella and non-typhoidal Salmonella.',
  citations: [
    'Riddle MS, et al. ACG Clinical Guideline: Diagnosis, Treatment, and Prevention of Acute Diarrheal Infections in Adults. Am J Gastroenterol. 2016;111(5):602-622.',
    'CDC. Travelers\' Diarrhea. Yellow Book 2024.',
  ],
};

const APIXABAN: DrugEntry = {
  id: 'apixaban',
  name: 'Apixaban',
  genericName: 'Apixaban',
  drugClass: 'Direct oral anticoagulant (Factor Xa inhibitor)',
  route: 'PO',
  indications: ['Pulmonary embolism', 'Deep vein thrombosis', 'Atrial fibrillation (stroke prevention)'],
  dosing: [
    {
      indication: 'PE / DVT treatment',
      regimen: '10 mg twice daily \u00D7 7 days, then 5 mg twice daily \u00D7 3\u20136 months. Extended therapy: 5 mg or 2.5 mg twice daily.',
    },
    {
      indication: 'Atrial fibrillation (stroke prevention)',
      regimen: '5 mg BID. Dose-reduce to 2.5 mg BID if \u22652 of: age \u226580, weight \u226460 kg, creatinine \u22651.5 mg/dL.',
    },
  ],
  cautions: [
    'Severe renal impairment (CrCl <25 mL/min) \u2014 limited data',
    'Moderate hepatic impairment (Child-Pugh B) \u2014 use with caution',
    'Strong CYP3A4 and P-gp inhibitors/inducers \u2014 avoid concomitant use',
  ],
  notes: 'Single-drug oral therapy \u2014 no initial parenteral heparin required. Particularly convenient for outpatient PE management.',
  citations: [
    'Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.',
    'Renner E, Barnes GD. Antithrombotic Management of VTE: JACC Focus Seminar. J Am Coll Cardiol. 2020.',
  ],
};

const BIKTARVY: DrugEntry = {
  id: 'biktarvy',
  name: 'Biktarvy (BIC/FTC/TAF)',
  genericName: 'Bictegravir / Emtricitabine / Tenofovir alafenamide',
  drugClass: 'INSTI + dual NRTI combination (single-tablet regimen)',
  route: 'PO',
  indications: ['HIV post-exposure prophylaxis (PEP)', 'HIV treatment (ART)'],
  dosing: [
    {
      indication: 'HIV PEP',
      regimen: '1 tablet (50/200/25 mg) PO once daily x 28 days. Take with or without food. Start as soon as possible, within 72 hours of exposure.',
    },
    {
      indication: 'HIV Treatment (ongoing therapy)',
      regimen: '1 tablet (50/200/25 mg) PO once daily. Preferred INSTI-based single-tablet regimen per HHS and IAS-USA guidelines. ~90% of patients attain undetectable VL through 96 weeks.',
    },
  ],
  contraindications: [
    'Co-administration with dofetilide',
    'Co-administration with rifampin (reduces bictegravir levels)',
  ],
  cautions: [
    'CrCl <30 mL/min \u2014 not recommended (limited data)',
    'Lactic acidosis / severe hepatomegaly with steatosis \u2014 rare but serious class effect of NRTIs',
    'HBV co-infection \u2014 severe hepatitis flare may occur upon discontinuation (contains FTC/TAF, active against HBV)',
    'Drug interactions \u2014 avoid polyvalent cation-containing antacids within 2 hours',
  ],
  monitoring: 'Renal function (BMP) at baseline and 2 weeks. HIV testing at baseline, 4\u20136 weeks, and 3 months.',
  notes: 'Preferred single-tablet PEP regimen per 2025 CDC guidelines. High barrier to resistance. Well tolerated with low discontinuation rates. TAF has less renal/bone toxicity than TDF.',
  citations: [
    'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV. MMWR. 2025;74(1):1-56.',
    'Gandhi RT, et al. Antiretroviral Drugs for Treatment and Prevention of HIV. JAMA. 2023;329(1):63-84.',
  ],
};

const BIVALIRUDIN: DrugEntry = {
  id: 'bivalirudin',
  name: 'Bivalirudin (Angiomax)',
  genericName: 'Bivalirudin',
  drugClass: 'Direct thrombin inhibitor',
  route: 'IV',
  indications: ['ACS undergoing PCI', 'HIT with thrombosis requiring anticoagulation'],
  dosing: [
    {
      indication: 'NSTEMI undergoing PCI',
      regimen: 'Bolus: 0.75 mg/kg IV, then infusion 1.75 mg/kg/hr during procedure. Discontinue at end of PCI or continue at 0.25 mg/kg/hr if needed. ACT target: 225-300 seconds.',
      weightCalc: [{ dosePerKg: 0.75, unit: 'mg', label: 'IV Bolus' }, { dosePerKg: 1.75, unit: 'mg', label: 'Infusion (per hour)' }],
    },
  ],
  contraindications: [
    'Active major bleeding',
    'Hypersensitivity to bivalirudin',
  ],
  cautions: [
    'Acute stent thrombosis — higher risk in first 4 hours post-PCI vs UFH+GPI. Mitigated by continuing infusion post-procedure.',
    'Renal impairment — reduce infusion rate: CrCl 10-29 mL/min reduce to 1 mg/kg/hr; dialysis 0.25 mg/kg/hr',
    'Short half-life (25 min) — advantage for bleeding risk but requires attention to timing',
    'No reversal agent — allow drug to clear (short half-life is the "antidote")',
  ],
  monitoring: 'ACT during PCI (target 225-300s). aPTT if used post-PCI. Renal function. Signs of bleeding.',
  notes: 'HORIZONS-AMI and EUROMAX trials demonstrated reduced bleeding with bivalirudin vs UFH + glycoprotein IIb/IIIa inhibitors during PCI, at cost of increased acute stent thrombosis (mitigated by post-PCI infusion). Preferred when bleeding risk is high or HIT history.',
  citations: [
    'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.',
    'Stone GW, et al. Bivalirudin during Primary PCI (HORIZONS-AMI). N Engl J Med. 2008;358(21):2218-2230.',
  ],
};

const BISMUTH_SUBSALICYLATE: DrugEntry = {
  id: 'bismuth-subsalicylate',
  name: 'Bismuth Subsalicylate (Pepto-Bismol)',
  genericName: 'Bismuth subsalicylate',
  drugClass: 'Antisecretory / antimicrobial',
  route: 'PO',
  indications: ['Acute diarrhea (symptomatic relief)', 'Traveler\'s diarrhea (treatment and prevention)', 'Nausea/dyspepsia with diarrhea'],
  dosing: [
    {
      indication: 'Acute diarrhea',
      regimen: '524 mg (2 tablets or 30 mL) PO every 30-60 minutes PRN. Max 8 doses per day (4.2 g/day).',
    },
    {
      indication: 'Traveler diarrhea',
      regimen: '524 mg PO every 30-60 minutes PRN. Max 8 doses per day. For prevention: 524 mg QID during travel.',
    },
  ],
  contraindications: [
    'Aspirin/salicylate allergy',
    'Children or teenagers recovering from chickenpox or flu (Reye syndrome risk)',
    'Concurrent anticoagulant therapy (contains salicylate)',
  ],
  cautions: [
    'Contains salicylate \u2014 avoid in pregnancy',
    'May cause black tongue and black stools (benign)',
    'Avoid in patients taking aspirin or other salicylates (additive toxicity)',
    'Not recommended for children under 12',
  ],
  monitoring: 'Salicylate levels if overdose suspected. Inform patients that black stools are expected and benign.',
  notes: 'Anti-diarrheal effects via antisecretory mechanism, bacterial toxin binding, and inherent antimicrobial activity. Also alleviates nausea/vomiting by topical effect on gastric mucosa \u2014 preferred when nausea is a prominent complaint. In prevention trials, reduced traveler\'s diarrhea from 61% to 23%.',
  citations: [
    'DuPont HL, et al. Prevention of Traveler\'s Diarrhea: Prophylactic Administration of Subsalicylate Bismuth. JAMA. 1980;243(3):237-241.',
    'Burg MD, Hovanessian HC. Diarrhea: Identifying Serious Illness and Providing Relief. Emergency Medicine Practice. 2004;6(7):1-24.',
  ],
};

const BUDESONIDE_NEB: DrugEntry = {
  id: 'budesonide-neb',
  name: 'Budesonide (Nebulized)',
  genericName: 'Budesonide',
  drugClass: 'Inhaled corticosteroid',
  route: 'Inhaled (nebulized)',
  indications: ['Croup (alternative to oral dexamethasone)', 'Asthma (maintenance)'],
  dosing: [
    {
      indication: 'Croup',
      regimen: '2 mg nebulized as a single dose. Use when child cannot tolerate oral medication. Onset: 2-4 hours.',
    },
    {
      indication: 'Asthma maintenance',
      regimen: '0.25-1 mg nebulized BID.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to budesonide',
    'Primary treatment of status asthmaticus (not for acute rescue)',
  ],
  cautions: [
    'Slower onset than oral dexamethasone for croup',
    'Oral thrush with repeated use — rinse mouth after administration',
    'More expensive and less convenient than oral dexamethasone',
  ],
  monitoring: 'Clinical response. Reassess croup severity 2-4 hours after administration.',
  notes: 'Reserved for children who cannot tolerate oral dexamethasone (vomiting, refusal). A 2023 Cochrane review confirmed efficacy for croup, but oral dexamethasone remains preferred due to ease of administration and faster onset. Single-dose safety profile is excellent.',
  citations: [
    'Aregbesola A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955.',
    'Gates A, Johnson DW, Klassen TP. Glucocorticoids for Croup in Children. JAMA Pediatrics. 2019;173(6):595-596.',
  ],
};

const BUMETANIDE: DrugEntry = {
  id: 'bumetanide',
  name: 'Bumetanide',
  genericName: 'Bumetanide',
  drugClass: 'Loop diuretic',
  route: 'IV',
  indications: ['Hyperkalemia (kaliuresis — alternative to furosemide)', 'Volume overload'],
  dosing: [
    {
      indication: 'Hyperkalemia (nephron bomb)',
      regimen: '2-5 mg IV. Equivalent to furosemide 80-200 mg IV (1:40 ratio).',
    },
    {
      indication: 'Volume overload',
      regimen: '0.5-2 mg IV, may repeat q2-3h.',
    },
  ],
  contraindications: [
    'Anuria',
    'Severe hypovolemia',
    'Hepatic coma',
  ],
  cautions: [
    'More predictable oral bioavailability than furosemide (~80% vs ~50%)',
    'Same electrolyte monitoring as furosemide',
    'Replace urine losses',
  ],
  monitoring: 'Urine output, electrolytes including K/Mg, fluid balance.',
  notes: 'Alternative loop diuretic when furosemide is unavailable. Conversion: bumetanide 1 mg ≈ furosemide 40 mg. Same mechanism (Na-K-2Cl blockade in thick ascending limb).',
  citations: [
    'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
  ],
};

const BENZATHINE_PENICILLIN: DrugEntry = {
  id: 'benzathine-penicillin',
  name: 'Benzathine Penicillin G',
  genericName: 'Benzathine penicillin G',
  drugClass: 'Natural penicillin (long-acting IM depot)',
  route: 'IM',
  indications: ['Primary syphilis', 'Secondary syphilis', 'Early latent syphilis', 'Late latent syphilis', 'Tertiary syphilis (non-neurologic)'],
  dosing: [
    {
      indication: 'Primary / Secondary / Early latent syphilis',
      regimen: '2.4 million units IM \u00D7 1 dose.',
    },
    {
      indication: 'Late latent / Tertiary syphilis (non-neurologic)',
      regimen: '2.4 million units IM weekly \u00D7 3 weeks (3 doses).',
    },
  ],
  contraindications: [
    'Penicillin allergy (IgE-mediated / anaphylaxis)',
  ],
  cautions: [
    'Jarisch-Herxheimer reaction \u2014 fever, myalgia, headache within 24 hr of treatment. Self-limited. More common in secondary syphilis.',
    'Does NOT achieve treponemicidal levels in CSF \u2014 not adequate for neurosyphilis.',
  ],
  monitoring: 'Quantitative RPR at 6, 12, and 24 months post-treatment. Expect 4-fold decline by 6\u201312 months.',
  citations: [
    'CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.',
    'IDSA. Practice Guidelines for the Management of Syphilis. 2025.',
  ],
};

const CALCIUM_CHLORIDE: DrugEntry = {
  id: 'calcium-chloride',
  name: 'Calcium Chloride',
  genericName: 'Calcium chloride',
  drugClass: 'Electrolyte / membrane stabilizer',
  route: 'IV (central line only)',
  indications: ['Hyperkalemia (membrane stabilization)', 'Hypocalcemia (severe)', 'HF acid burns with systemic hypocalcemia'],
  dosing: [
    {
      indication: 'Hyperkalemia (central access)',
      regimen: '1 gram IV over 10 minutes. May repeat 1-2 times. Effect lasts 30-60 minutes.',
    },
    {
      indication: 'Severe hypocalcemia',
      regimen: '500 mg-1 gram IV over 10 minutes.',
    },
    {
      indication: 'HF acid burn — severe/systemic',
      regimen: '1 gram IV over 10 min for systemic hypocalcemia from HF exposure. Central line required. Monitor iCa closely.',
    },
  ],
  contraindications: [
    'Peripheral IV administration (causes severe tissue necrosis)',
    'Digoxin toxicity (relative)',
    'Hypercalcemia',
  ],
  cautions: [
    'CENTRAL LINE ONLY — causes severe extravasation injury peripherally',
    'Contains 3x more elemental calcium than calcium gluconate per gram',
    'Rapid infusion → bradycardia, cardiac arrest',
  ],
  monitoring: 'Continuous cardiac monitoring. Check ionized calcium. Verify central line placement before infusion.',
  notes: 'Preferred over calcium gluconate when CENTRAL access is available — provides 3x more elemental calcium per gram (~270 mg Ca per gram). Use calcium gluconate if only peripheral access. For hyperkalemia: treats the rhythm, not the potassium — must follow with definitive K+ lowering therapy.',
  citations: [
    'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
    'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-51.',
  ],
};

const CALCIUM_GLUCONATE: DrugEntry = {
  id: 'calcium-gluconate',
  name: 'Calcium Gluconate',
  genericName: 'Calcium gluconate',
  drugClass: 'Electrolyte / membrane stabilizer',
  route: 'IV',
  indications: ['Hyperkalemia (membrane stabilization)', 'Hypocalcemia', 'Hydrofluoric acid burns (subcutaneous/intra-arterial)'],
  dosing: [
    {
      indication: 'Hyperkalemia (peripheral access)',
      regimen: '3 grams IV over 10 minutes. May repeat 1-2 times if persistent dangerous arrhythmia. Effect lasts 30-60 minutes.',
    },
    {
      indication: 'Hypocalcemia',
      regimen: '1-2 grams IV over 10-20 minutes.',
    },
    {
      indication: 'HF acid burn — subcutaneous',
      regimen: '5% solution (dilute 10% to 5%): inject 0.5 mL per cm² of affected area using 27-30G needle. Max 0.5 mL per digit. For intra-arterial: 10 mL of 10% CaGluc in 40 mL NS via radial artery catheter over 4 hours.',
    },
  ],
  contraindications: [
    'Digoxin toxicity (relative — calcium may worsen digitalis effects)',
    'Hypercalcemia',
  ],
  cautions: [
    'Lasts only 30-60 minutes — must address underlying hyperkalemia',
    'Rapid infusion may cause flushing, nausea, hypotension',
    'Chronic renal failure without ECG changes: risk of calciphylaxis — may withhold',
  ],
  monitoring: 'Continuous cardiac monitoring during infusion. Repeat ECG after dose. Check ionized calcium — avoid iCa >3 mM.',
  notes: 'First-line for hyperkalemia with ECG changes. Use calcium gluconate for PERIPHERAL access (less tissue necrosis risk than calcium chloride). Contains ~270 mg elemental calcium per 10 mL (1 gram). For isolated peaked T-waves without other ECG changes, use is controversial.',
  citations: [
    'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
    'Rossignol P, et al. Emergency management of severe hyperkalemia. Pharmacol Res. 2016;113(Pt A):585-591.',
  ],
};

const CEFAZOLIN: DrugEntry = {
  id: 'cefazolin',
  name: 'Cefazolin (Ancef)',
  genericName: 'Cefazolin sodium',
  drugClass: 'First-generation cephalosporin',
  route: 'IV',
  indications: ['Pediatric UTI (inpatient first-line)', 'Surgical prophylaxis'],
  dosing: [
    {
      indication: 'Pediatric UTI (inpatient)',
      regimen: '50 mg/kg/day divided q8h. Max 2000 mg/dose.',
      weightCalc: { dosePerKg: 50, unit: 'mg', maxDose: 2000, dailyDivided: 3 },
    },
    {
      indication: 'Neonatal UTI',
      regimen: '50 mg/kg/day divided q8h.',
      weightCalc: { dosePerKg: 50, unit: 'mg', dailyDivided: 3 },
    },
  ],
  contraindications: [
    'IgE-mediated cephalosporin allergy',
  ],
  cautions: [
    'Adjust for renal impairment',
  ],
  monitoring: 'Renal function, CBC with prolonged use. Repeat urine culture if no clinical improvement at 48-72 hours.',
  notes: 'First-line empiric IV antibiotic for inpatient pediatric UTI per DCMC EBOC guidelines.',
  citations: [
    'Dell Children\'s EBOC. First Febrile Urinary Tract Infection Clinical Pathway. May 2017.',
    'Dell Children\'s EBOC. UTI Management Pathway (Neonatal). September 2024.',
    'Roberts KB. Urinary tract infection: clinical practice guideline for febrile infants and children 2 to 24 months. Pediatrics. 2011;128(3):595-610.',
  ],
};

const CEFEPIME: DrugEntry = {
  id: 'cefepime',
  name: 'Cefepime (Maxipime)',
  genericName: 'Cefepime hydrochloride',
  drugClass: '4th-Generation Cephalosporin',
  route: 'IV',
  indications: ['Neonatal sepsis/meningitis (alternative when Ceftriaxone contraindicated)'],
  dosing: [
    {
      indication: 'Sepsis/meningitis (0-28 days)',
      regimen: '50 mg/kg IV q12h.',
    },
    {
      indication: 'Meningitis (>28 days)',
      regimen: '50 mg/kg IV q8h.',
    },
    {
      indication: 'Adult Nosocomial/Healthcare-Associated Meningitis',
      regimen: '2 g IV q8h. Alternative to meropenem for Pseudomonas coverage in post-neurosurgical or healthcare-associated meningitis. Combine with vancomycin for MRSA coverage.',
    },
  ],
  contraindications: [
    'Severe cephalosporin allergy',
  ],
  cautions: [
    'Neurotoxicity (seizures) — especially in renal impairment',
    'Dose adjust for renal impairment',
  ],
  monitoring: 'Renal function, CBC. Monitor for neurotoxicity (altered mental status, seizures) especially with renal impairment or prolonged courses.',
  notes: 'Use when Ceftriaxone is contraindicated: GA <37 weeks, postnatal age <7 days, receiving calcium-containing IV products, or bilirubin >10 mg/dL. Broader gram-negative coverage than Ceftriaxone including Pseudomonas aeruginosa.',
  citations: [
    'Puopolo KM, et al. Management of Neonates Born at ≥35 0/7 Weeks\' Gestation With Suspected or Proven Early-Onset Bacterial Sepsis. Pediatrics. 2018;142(6):e20182894.',
    'Bradley JS, et al. Nelson\'s Pediatric Antimicrobial Therapy. 29th ed. American Academy of Pediatrics; 2023.',
  ],
};

const CEFTRIAXONE: DrugEntry = {
  id: 'ceftriaxone',
  name: 'Ceftriaxone',
  genericName: 'Ceftriaxone',
  drugClass: 'Third-generation cephalosporin',
  route: 'IV',
  indications: ['Neurosyphilis (PCN allergy alternative)', 'Bacterial meningitis', 'Various serious infections', 'Pediatric sepsis / neonatal fever', 'Pediatric meningitis', 'Pediatric UTI', 'Pyelonephritis in pregnancy'],
  dosing: [
    {
      indication: 'Neurosyphilis (if desensitization not feasible)',
      regimen: '2 g IV daily \u00D7 10\u201314 days.',
    },
    {
      indication: 'Pediatric Fever / Neonatal Sepsis',
      regimen: '50 mg/kg IV q24h (standard). 50 mg/kg IM/IV x1 (single pre-discharge dose). Max 2 g/dose.',
      weightCalc: [
        { dosePerKg: 50, unit: 'mg', maxDose: 2000, label: 'Standard (q24h)' },
        { dosePerKg: 50, unit: 'mg', maxDose: 2000, label: 'Single dose (IM/IV x1)' },
      ],
    },
    {
      indication: 'Pediatric Meningitis',
      regimen: '50 mg/kg IV q12h (meningitic dose). Max 2 g/dose.',
      weightCalc: { dosePerKg: 50, unit: 'mg', maxDose: 2000, label: 'Meningitic (q12h)' },
    },
    {
      indication: 'Pediatric UTI (inpatient/pre-discharge)',
      regimen: '75 mg/kg IV or IM prior to discharge. Max 2 g/dose.',
      weightCalc: { dosePerKg: 75, unit: 'mg', maxDose: 2000 },
    },
    {
      indication: 'Pyelonephritis in pregnancy',
      regimen: '1 g IV daily. Continue until afebrile 48 hours, then transition to oral cephalexin guided by culture sensitivities. Admit all pregnant patients with pyelonephritis.',
    },
    {
      indication: 'Adult Bacterial Meningitis',
      regimen: '2 g IV q12h. Higher dose required for consistent CNS penetration. Combine with vancomycin (\u00b1 ampicillin if age \u226550, pregnant, or immunocompromised). Administer with dexamethasone 0.15 mg/kg IV q6h.',
    },
  ],
  contraindications: [
    'Severe cephalosporin allergy',
    'Note: ~2\u20135% cross-reactivity with penicillin allergy \u2014 lower than historically believed',
  ],
  cautions: [
    'Biliary sludging \u2014 avoid co-administration with calcium-containing IV solutions in neonates',
    'Not first-line for neurosyphilis \u2014 limited evidence compared to IV penicillin G. Use only if desensitization is not feasible.',
  ],
  monitoring: 'CSF re-examination at 6 months post-treatment to document improvement.',
  citations: [
    'CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.',
    'Marra CM, et al. Ceftriaxone for Neurosyphilis. Clin Infect Dis. 2019.',
  ],
};

const CEPHALEXIN: DrugEntry = {
  id: 'cephalexin',
  name: 'Cephalexin (Keflex)',
  genericName: 'Cephalexin',
  drugClass: 'First-generation cephalosporin',
  route: 'PO',
  indications: ['Pediatric UTI (first-line outpatient)', 'Skin and soft tissue infections'],
  dosing: [
    {
      indication: 'Pediatric UTI',
      regimen: '50-100 mg/kg/day divided TID-QID. Max 1000 mg/dose.',
      weightCalc: { dosePerKg: 75, unit: 'mg', maxDose: 1000, dailyDivided: 4 },
    },
    {
      indication: 'Neonatal UTI',
      regimen: '\u226428 days: 75 mg/kg/day divided q8h. \u226529 days: 100 mg/kg/day divided q6h.',
      weightCalc: [{ dosePerKg: 75, unit: 'mg', dailyDivided: 3, label: '\u226428 days (q8h)' }, { dosePerKg: 100, unit: 'mg', dailyDivided: 4, label: '\u226529 days (q6h)' }],
    },
  ],
  contraindications: [
    'IgE-mediated cephalosporin allergy',
  ],
  cautions: [
    'Adjust for renal impairment',
    'GI side effects common',
  ],
  monitoring: 'Renal function in neonates and prolonged courses. Repeat urine culture if no clinical improvement at 48-72 hours.',
  notes: 'First-line empiric outpatient antibiotic for pediatric febrile UTI per DCMC EBOC guidelines.',
  citations: [
    'Dell Children\'s EBOC. First Febrile Urinary Tract Infection Clinical Pathway. May 2017.',
    'Dell Children\'s EBOC. UTI Management Pathway (Neonatal). September 2024.',
    'Roberts KB. Urinary tract infection: clinical practice guideline for febrile infants and children 2 to 24 months. Pediatrics. 2011;128(3):595-610.',
  ],
};

const DARUNAVIR: DrugEntry = {
  id: 'darunavir',
  name: 'Darunavir (Prezista)',
  genericName: 'Darunavir',
  drugClass: 'Protease inhibitor (PI)',
  route: 'PO',
  indications: ['HIV post-exposure prophylaxis (alternative regimen)', 'HIV treatment (ART)'],
  dosing: [
    {
      indication: 'HIV PEP (alternative)',
      regimen: '800 mg PO once daily + ritonavir 100 mg PO once daily x 28 days. Must be taken with food. Always co-administer with ritonavir (pharmacokinetic booster).',
    },
  ],
  contraindications: [
    'Co-administration with alfuzosin, ergot derivatives, cisapride, pimozide, oral midazolam/triazolam, St. John\u2019s wort, lovastatin, simvastatin',
    'Severe hepatic impairment (Child-Pugh C)',
  ],
  cautions: [
    'Sulfonamide allergy \u2014 darunavir contains a sulfonamide moiety; use with caution',
    'Hepatotoxicity \u2014 monitor LFTs, especially in HBV/HCV co-infection',
    'Multiple CYP3A4 drug interactions \u2014 review full medication list',
    'Skin rash \u2014 including rare Stevens-Johnson syndrome',
  ],
  monitoring: 'LFTs at baseline and 2 weeks. Renal function. HIV testing at baseline, 4\u20136 weeks, and 3 months.',
  notes: 'Alternative 3rd agent for PEP when INSTI-based regimen cannot be used. Must be boosted with ritonavir. Higher pill burden and more drug interactions than dolutegravir.',
  citations: [
    'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV. MMWR. 2025;74(1):1-56.',
    'Gandhi RT, et al. Antiretroviral Drugs for Treatment and Prevention of HIV. JAMA. 2023;329(1):63-84.',
  ],
};

const DEXAMETHASONE: DrugEntry = {
  id: 'dexamethasone',
  name: 'Dexamethasone',
  genericName: 'Dexamethasone',
  drugClass: 'Corticosteroid (glucocorticoid)',
  route: 'PO/IM/IV',
  indications: ['Croup (standard of care)', 'Cerebral edema', 'Antiemetic (chemotherapy)', 'Bacterial meningitis (adjunctive)', 'Airway edema', 'Adrenal crisis (alternative)', 'Adrenal maintenance (alternative)', 'Anaphylaxis (adjunctive)'],
  dosing: [
    {
      indication: 'Croup',
      regimen: '0.6 mg/kg PO as a single dose (max 16 mg). Low-dose alternative: 0.15 mg/kg PO (non-inferior). If unable to tolerate oral: 0.6 mg/kg IM.',
      weightCalc: [{ dosePerKg: 0.6, unit: 'mg', maxDose: 16, label: 'Standard dose' }, { dosePerKg: 0.15, unit: 'mg', label: 'Low-dose alternative' }],
    },
    {
      indication: 'Cerebral edema',
      regimen: '10 mg IV loading dose, then 4 mg IV/IM q6h.',
    },
    {
      indication: 'Airway edema / post-extubation stridor',
      regimen: '0.5 mg/kg IV q6h x 4 doses, starting 12-24 hours before planned extubation.',
      weightCalc: { dosePerKg: 0.5, unit: 'mg' },
    },
    {
      indication: 'Bacterial Meningitis (adjunctive)',
      regimen: '0.15 mg/kg IV q6h × 2-4 days. Give WITH or up to 15-20 min BEFORE first antibiotic dose. Reduces mortality in pneumococcal meningitis (Cochrane 2015). STOP if Listeria or Cryptococcus identified — worsened outcomes.',
      weightCalc: { dosePerKg: 0.15, unit: 'mg', dailyDivided: 4 },
    },
    {
      indication: 'Adrenal crisis (alternative)',
      regimen: '4 mg IV every 24 hours. Use when hydrocortisone is unavailable OR when cosyntropin stimulation test is planned — dexamethasone does NOT cross-react with cortisol assays, allowing meaningful cortisol measurement during treatment. Zero mineralocorticoid activity — add fludrocortisone for primary AI once on maintenance.',
    },
    {
      indication: 'Adrenal maintenance (alternative)',
      regimen: '0.25-0.5 mg PO once daily. Long half-life (~36 hours) allows once-daily dosing. No mineralocorticoid activity — must add fludrocortisone for primary AI. Higher growth suppression risk in children compared to hydrocortisone.',
    },
    {
      indication: 'Anaphylaxis (adjunctive)',
      regimen: '10 mg IV × 1 dose. Second-line only — controversial, no RCTs demonstrating clear benefit. Consider if refractory to 2+ IM epinephrine doses or asthma overlap. Does NOT prevent biphasic reactions. Not needed for discharge.',
    },
  ],
  contraindications: [
    'Systemic fungal infections',
    'Known hypersensitivity to dexamethasone',
  ],
  cautions: [
    'Single-dose use for croup is safe with minimal adverse effects',
    'Hyperglycemia with repeated dosing — monitor glucose in diabetics',
    'Immunosuppression with prolonged use — not a concern with single dose',
    'May mask signs of infection with prolonged use',
  ],
  monitoring: 'Clinical response. For croup: reassess severity 2-3 hours after dose. For prolonged use: blood glucose, signs of infection.',
  notes: 'Standard of care for croup in ALL severities. A 2023 Cochrane review (45 RCTs, 5,888 children) showed glucocorticoids significantly reduce croup scores at 2, 6, 12, and 24 hours vs placebo. NNT = 7 to prevent one return visit. Single dose provides sustained benefit due to long half-life (~36 hours). Reduces return visits/readmissions by ~50% (RR 0.52). Low-dose (0.15 mg/kg) is non-inferior to standard dose in a 1,252-patient RCT.',
  citations: [
    'Aregbesola A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955.',
    'Bjornson CL, et al. A Randomized Trial of a Single Dose of Oral Dexamethasone for Mild Croup. N Engl J Med. 2004;351(13):1306-13.',
    'Parker CM, Cooper MN. Prednisolone Versus Dexamethasone for Croup: A Randomized Controlled Trial. Pediatrics. 2019;144(3):e20183772.',
    'Gates A, Johnson DW, Klassen TP. Glucocorticoids for Croup in Children. JAMA Pediatrics. 2019;173(6):595-596.',
  ],
};

const DESMOPRESSIN: DrugEntry = {
  id: 'desmopressin',
  name: 'Desmopressin (DDAVP)',
  genericName: 'Desmopressin acetate',
  drugClass: 'Synthetic vasopressin analog (V2 agonist)',
  route: 'IV / Intranasal',
  indications: ['Hyponatremia (DDAVP clamp)', 'Overcorrection rescue', 'Central diabetes insipidus', 'DI diagnostic trial'],
  dosing: [
    {
      indication: 'DDAVP clamp (hyponatremia)',
      regimen: '2 mcg IV q6-8h. Prevents overcorrection by blocking free water excretion. Pair with 100 mL 3% NaCl boluses to raise Na at controlled rate. Check Na q2h.',
    },
    {
      indication: 'Overcorrection rescue',
      regimen: '2 mcg IV stat. Give immediately if Na rises >10 mEq/L in 24h (or >8 in high-risk). Combine with D5W 3 mL/kg/hr to re-lower Na to safe trajectory.',
    },
    {
      indication: 'Central diabetes insipidus',
      regimen: '2 mcg IV q8-12h OR 10 mcg intranasal BID. Titrate to urine output and serum Na. Chronic: intranasal or oral formulations.',
    },
    {
      indication: 'DI diagnostic trial',
      regimen: '2 mcg IV x1. Central DI: urine osmolality rises >50% within 2 hours. Nephrogenic DI: minimal response (<50% rise).',
    },
  ],
  contraindications: [
    'Type IIb von Willebrand disease',
    'Habitual or psychogenic polydipsia (risk of severe hyponatremia)',
    'Hyponatremia with volume overload (HF, cirrhosis)',
  ],
  cautions: [
    'Monitor Na q2h during DDAVP clamp — overcorrection still possible if clamp interrupted',
    'Track urine output and fluid balance closely',
    'Hyponatremia is the primary adverse effect — the therapeutic goal in clamp, but a risk in DI treatment',
    'IV preferred over intranasal in acute settings (more predictable absorption)',
  ],
  monitoring: 'Serum sodium q2h during clamp, urine output, fluid balance, urine osmolality for DI.',
  notes: 'The DDAVP clamp strategy is a paradigm shift in hyponatremia management — it separates the water problem from the sodium problem. DDAVP blocks free water excretion via V2 receptors on collecting duct, then 3% NaCl boluses raise Na at a controlled, predictable rate. This prevents the dangerous autocorrection that occurs when the underlying cause is treated (e.g., volume repletion in hypovolemic hyponatremia). High-risk patients for overcorrection: alcoholics, malnourished, hypokalemia, thiazide-induced.',
  citations: [
    'Adrogué HJ et al. Diagnosis and Management of Hyponatremia. JAMA. 2022;328(3):280-291.',
    'Sterns RH. Disorders of Plasma Sodium. NEJM. 2015;372(1):55-65.',
  ],
};

const CLEVIDIPINE: DrugEntry = {
  id: 'clevidipine',
  name: 'Clevidipine (Cleviprex)',
  genericName: 'Clevidipine butyrate',
  drugClass: 'Ultra-short-acting dihydropyridine CCB',
  route: 'IV',
  indications: ['Acute hypertension in stroke (pre/post thrombolysis)', 'Perioperative hypertension', 'Hypertensive emergency'],
  dosing: [
    {
      indication: 'Acute stroke BP management',
      regimen: 'Start 1\u20132 mg/hr IV. Double dose every 90 seconds until target BP achieved. Usual maintenance: 4\u20136 mg/hr. Max 21 mg/hr (or 1000 mL per 24h due to lipid load).',
    },
    {
      indication: 'ICH blood pressure control (target SBP 130\u2013150)',
      regimen: 'Start 1\u20132 mg/hr IV. Double every 90 sec until SBP 130\u2013150 mmHg. Usual maintenance 4\u20136 mg/hr. Max 21 mg/hr. Smoothest titration agent \u2014 ultra-short t\u00BD (~1 min). Avoid SBP <130 or drops >70 mmHg in first hour.',
    },
    {
      indication: 'SAH blood pressure control (target SBP <160)',
      regimen: 'Start 1-2 mg/hr IV. Double every 90 sec until SBP <160 mmHg. Usual maintenance 4-6 mg/hr. Max 21 mg/hr. Ultra-short t\u00BD (~1 min) allows precise titration.',
    },
  ],
  contraindications: [
    'Severe aortic stenosis',
    'Defective lipid metabolism (e.g., pathologic hyperlipidemia, lipoid nephrosis, acute pancreatitis with hyperlipidemia)',
    'Allergy to soy or egg products (lipid emulsion vehicle)',
  ],
  cautions: [
    'Lipid emulsion vehicle \u2014 contributes 2 kcal/mL to caloric intake',
    'No preservative \u2014 must be used within 12 hours of puncture',
    'Rebound hypertension possible if discontinued abruptly \u2014 transition to oral agent',
    'Reflex tachycardia may occur',
  ],
  monitoring: 'Continuous arterial BP monitoring recommended. Heart rate. Lipid panel if prolonged use >24h.',
  notes: 'Ultra-short half-life (~1 min) allows precise, rapid BP titration. Achieves target BP faster than nicardipine in clinical trials. Arterial-selective vasodilator \u2014 reduces afterload without venodilation. Does not reduce cerebral blood flow. Consider when nicardipine is unavailable or faster titration is needed.',
  citations: [
    'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
    'Pollack CV, et al. Clevidipine for Acute Hypertension: A Systematic Review and Meta-Analysis. Crit Care Med. 2019.',
  ],
};

const CHLOROTHIAZIDE: DrugEntry = {
  id: 'chlorothiazide',
  name: 'Chlorothiazide',
  genericName: 'Chlorothiazide sodium',
  drugClass: 'Thiazide diuretic',
  route: 'IV',
  indications: ['Hyperkalemia (nephron bomb — synergistic with loop diuretic)', 'Volume overload (diuretic resistance)'],
  dosing: [
    {
      indication: 'Hyperkalemia (nephron bomb)',
      regimen: '500-1000 mg IV. Give WITH loop diuretic for sequential nephron blockade.',
    },
  ],
  contraindications: [
    'Anuria',
    'Sulfonamide hypersensitivity (cross-reactivity possible)',
  ],
  cautions: [
    'Only use WITH a loop diuretic — thiazide alone has minimal effect on K+ excretion',
    'Risk of severe hypokalemia, hyponatremia, hypomagnesemia when combined with loop diuretic',
    'Monitor electrolytes frequently',
  ],
  monitoring: 'Electrolytes q2-4h when used in nephron bomb. Urine output.',
  notes: 'IV thiazide for synergistic diuresis ("sequential nephron blockade") — blocks NaCl cotransporter in distal convoluted tubule. Metolazone (PO) is an alternative if IV chlorothiazide unavailable.',
  citations: [
    'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-51.',
  ],
};

const CIPROFLOXACIN: DrugEntry = {
  id: 'ciprofloxacin',
  name: 'Ciprofloxacin',
  genericName: 'Ciprofloxacin',
  drugClass: 'Fluoroquinolone',
  route: 'PO/IV',
  indications: ['Pediatric UTI (IgE-mediated allergy to penicillins AND cephalosporins)', 'Complicated UTI', 'Acute infectious diarrhea (adults)', 'Traveler\'s diarrhea (adults)'],
  dosing: [
    {
      indication: 'Pediatric UTI',
      regimen: '20 mg/kg/day divided BID. Max 750 mg/dose (oral).',
      weightCalc: { dosePerKg: 20, unit: 'mg', maxDose: 750, dailyDivided: 2 },
    },
    {
      indication: 'Acute diarrhea',
      regimen: '500 mg PO BID × 3-5 days. First-line empiric antibiotic for adults with fever >38.5°C + positive fecal markers, acute dysentery, or diarrhea >48 hours.',
    },
    {
      indication: 'Traveler diarrhea',
      regimen: '500 mg PO BID × 3 days. First-line for most regions. For Southeast Asia: use azithromycin instead (>80% fluoroquinolone-resistant Campylobacter).',
    },
    {
      indication: 'Meningococcal Postexposure Prophylaxis',
      regimen: '500 mg PO × 1 dose. Single-dose alternative to ceftriaxone IM or rifampin for close contacts of confirmed N. meningitidis cases.',
    },
  ],
  contraindications: [
    'Concurrent tizanidine use',
    'QT prolongation risk',
  ],
  cautions: [
    'FDA black box warnings (tendon rupture, peripheral neuropathy, CNS effects)',
    'Generally avoided in children except when benefits outweigh risks',
    'Musculoskeletal adverse events in pediatric patients',
  ],
  monitoring: 'Renal function, QTc if concurrent QT-prolonging agents. Monitor for tendon pain, neuropathy symptoms.',
  notes: 'Reserved for IgE-mediated allergy to penicillins AND cephalosporins in pediatric UTI. Use with caution in pediatric patients \u2014 FDA approval limited. TMP-SMX only 71% susceptible among E. coli isolates, making ciprofloxacin preferred fluoroquinolone alternative.',
  citations: [
    'Dell Children\'s EBOC. First Febrile Urinary Tract Infection Clinical Pathway. May 2017.',
    'Roberts KB. Urinary tract infection: clinical practice guideline for febrile infants and children 2 to 24 months. Pediatrics. 2011;128(3):595-610.',
  ],
};

const CONJUGATED_ESTROGEN: DrugEntry = {
  id: 'conjugated-estrogen',
  name: 'Conjugated Estrogen (Premarin)',
  genericName: 'Conjugated equine estrogens',
  drugClass: 'Estrogen',
  route: 'IV',
  indications: ['Acute abnormal uterine bleeding (unstable or heavy)'],
  dosing: [
    {
      indication: 'Unstable AUB / Acute Heavy Bleeding',
      regimen: '25 mg IV over 5 min, may repeat q4-6h for up to 24h (max 6 doses). 72% stop bleeding within 8h (only FDA-approved treatment for acute AUB). MUST follow with progestin (medroxyprogesterone 10 mg PO daily × 10 days) after bleeding controlled to stabilize endometrium and prevent rebound. Start antiemetic prophylaxis (ondansetron) — IV estrogen causes significant nausea.',
    },
  ],
  contraindications: [
    'Active or past venous thromboembolism (DVT/PE)',
    'Active or past arterial thromboembolic disease (stroke, MI)',
    'Breast cancer (estrogen-receptor positive)',
    'Active hepatic disease or liver dysfunction',
    'Known thrombophilia',
  ],
  cautions: [
    'VTE risk increases with duration of use — limit to 24h acute treatment',
    'Nausea/vomiting very common with IV dosing — premedicate with ondansetron',
    'Must be followed by progestin therapy to stabilize endometrium',
    'Use with caution in patients with cardiovascular risk factors',
    'Not for long-term use — transition to OCPs or progestin for maintenance',
  ],
  monitoring: 'Bleeding reassessment q4-6h. Hemodynamics. CBC q6h if unstable. Watch for signs of VTE.',
  notes: 'Only treatment specifically FDA-approved for acute AUB. Mechanism: promotes rapid endometrial growth over denuded areas, stabilizing fragile vessels. DeVore 1982 RCT showed 72% efficacy vs 38% placebo within 8h. Must always be followed by a progestin course to prevent unopposed estrogen effects (endometrial hyperplasia).',
  citations: [
    'ACOG Committee Opinion No. 557. Management of Acute AUB in Nonpregnant Reproductive-Aged Women. Obstet Gynecol. 2013;121(4):891-896.',
    'DeVore GR, et al. IV Premarin for dysfunctional uterine bleeding. Obstet Gynecol. 1982;59(3):285-291.',
  ],
};

const CLOPIDOGREL: DrugEntry = {
  id: 'clopidogrel',
  name: 'Clopidogrel (Plavix)',
  genericName: 'Clopidogrel bisulfate',
  drugClass: 'Antiplatelet (P2Y12 antagonist)',
  route: 'PO',
  indications: ['Minor ischemic stroke (DAPT)', 'High-risk TIA', 'Acute coronary syndrome', 'Secondary prevention (stent, PAD)', 'ACS / NSTEMI (P2Y12 inhibitor)'],
  dosing: [
    {
      indication: 'Minor stroke / high-risk TIA (DAPT)',
      regimen: '300 mg loading dose on day 1 + aspirin 325 mg. Then 75 mg daily + aspirin 81 mg \u00D7 21 days total DAPT. After 21 days: single antiplatelet (either agent).',
    },
    {
      indication: 'ACS / NSTEMI (conservative strategy)',
      regimen: '300 mg loading dose, then 75 mg daily \u00D7 12 months.',
    },
    {
      indication: 'ACS / NSTEMI (pre-PCI)',
      regimen: '600 mg loading dose, then 75 mg daily \u00D7 12 months. Hold \u22655 days before CABG.',
    },
  ],
  contraindications: [
    'Active pathological bleeding (intracranial hemorrhage, GI bleeding)',
    'Hypersensitivity to clopidogrel',
  ],
  cautions: [
    'CYP2C19 poor metabolizers \u2014 reduced conversion to active metabolite, diminished antiplatelet effect. Consider ticagrelor if known poor metabolizer.',
    'Concurrent omeprazole/esomeprazole \u2014 may reduce clopidogrel efficacy (CYP2C19 inhibition). Use pantoprazole if PPI needed.',
    'Hold 5\u20137 days before elective surgery',
    'Increased bleeding risk with DAPT \u2014 NNH 122 for moderate-severe hemorrhage (POINT trial)',
  ],
  monitoring: 'No routine monitoring. CYP2C19 genotyping if available may guide therapy. Monitor for bleeding.',
  notes: 'POINT trial: DAPT \u00D7 21 days reduced 90-day stroke from 6.5% to 5.0% (NNT 38) in minor stroke/TIA. CHANCE trial: similar benefit in Chinese population. Duration beyond 21 days increases bleeding without additional benefit.',
  citations: [
    'Johnston SC, et al. Clopidogrel and Aspirin in Acute Ischemic Stroke and High-Risk TIA (POINT). N Engl J Med. 2018;379(3):215-225.',
    'Wang Y, et al. Clopidogrel with Aspirin in Acute Minor Stroke or TIA (CHANCE). N Engl J Med. 2013;369(1):11-19.',
  ],
};

const DABIGATRAN: DrugEntry = {
  id: 'dabigatran',
  name: 'Dabigatran',
  genericName: 'Dabigatran etexilate',
  drugClass: 'Direct oral anticoagulant (Direct thrombin inhibitor)',
  route: 'PO',
  indications: ['Pulmonary embolism', 'Deep vein thrombosis', 'Atrial fibrillation (stroke prevention)'],
  dosing: [
    {
      indication: 'PE / DVT treatment',
      regimen: 'Requires 5\u201310 days parenteral anticoagulation (LMWH or UFH) first, then 150 mg twice daily.',
    },
  ],
  cautions: [
    'CrCl <30 mL/min \u2014 contraindicated (predominantly renal clearance ~80%)',
    'Strong P-gp inhibitors in CrCl <50 mL/min \u2014 dose reduction or avoidance',
    'No dose adjustment for hepatic impairment (not hepatically metabolized)',
  ],
  notes: 'Requires initial parenteral anticoagulation bridge (unlike apixaban/rivaroxaban). Specific reversal agent: idarucizumab (Praxbind).',
  citations: [
    'Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.',
  ],
};

const DIGOXIN: DrugEntry = {
  id: 'digoxin',
  name: 'Digoxin',
  genericName: 'Digoxin',
  drugClass: 'Cardiac glycoside',
  route: 'IV / PO',
  indications: ['A-Fib / A-Flutter rate control (adjunctive)', 'Heart failure with reduced EF'],
  dosing: [
    {
      indication: 'A-Fib rate control (acute)',
      regimen: 'IV loading: 0.25 mg IV every 2 hours, up to 1.5 mg total. Onset: ~3 hours (vs 5 min for diltiazem). Slow onset makes it unsuitable as sole agent for acute rate control.',
    },
    {
      indication: 'A-Fib rate control (maintenance)',
      regimen: '0.125-0.25 mg PO daily. Adjust for renal function and age.',
    },
  ],
  contraindications: [
    'Hypertrophic obstructive cardiomyopathy (HOCM)',
    'WPW syndrome with atrial fibrillation',
    'Ventricular tachycardia/fibrillation',
    'Severe hypokalemia (increases toxicity risk)',
  ],
  cautions: [
    'Renal impairment \u2014 reduce dose, monitor levels (CrCl <50: reduce dose 50%)',
    'Hypokalemia and hypomagnesemia potentiate toxicity',
    'Post hoc analyses associate digoxin with increased mortality in AF \u2014 use at low doses',
    'Limited exertional efficacy \u2014 slows primarily resting heart rate',
    'Narrow therapeutic index \u2014 toxicity at levels >2.0 ng/mL',
    'Drug interactions: amiodarone increases digoxin levels 70-100%',
  ],
  monitoring: 'Serum digoxin level (target 0.5-0.9 ng/mL for AF). Serum potassium, magnesium, creatinine. ECG for toxicity signs (ST scooping, PAT with block, bidirectional VT).',
  notes: 'Best used as adjunctive therapy when hypotension limits further titration of beta-blockers or CCBs. Particularly useful in patients with concurrent heart failure. Avoid as sole agent for acute rate control due to slow onset. Use at lowest effective dose given mortality concerns.',
  citations: [
    'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.',
    'Michaud GF, Stevenson WG. Atrial Fibrillation. N Engl J Med. 2021;384(4):353-361.',
    'Ko D, et al. Atrial Fibrillation: A Review. JAMA. 2025;333(4):329-342.',
  ],
};

const DIMENHYDRINATE: DrugEntry = {
  id: 'dimenhydrinate',
  name: 'Dimenhydrinate',
  genericName: 'Dimenhydrinate',
  drugClass: 'Antihistamine / Antiemetic',
  route: 'IV/PO',
  indications: ['Nausea and vomiting of pregnancy (NVP)', 'Hyperemesis gravidarum'],
  dosing: [
    {
      indication: 'NVP — oral',
      regimen: '50 mg PO QID as needed. Max 200 mg/day if also taking doxylamine. Second-line oral agent per ACOG stepwise pathway.',
    },
    {
      indication: 'NVP — IV',
      regimen: '50 mg IV in 50 mL normal saline over 20 min, every 6 hours. For patients unable to tolerate oral medications.',
    },
  ],
  contraindications: [
    'Known hypersensitivity',
  ],
  cautions: [
    'Sedation — warn about drowsiness',
    'Max 200 mg/day when combined with doxylamine (both antihistamines)',
    'Anticholinergic effects — dry mouth, urinary retention, constipation',
  ],
  monitoring: 'Symptom improvement. Sedation level.',
  notes: 'Second-line oral antiemetic in the ACOG stepwise NVP pathway. Contains diphenhydramine + 8-chlorotheophylline. Can be used orally or IV. Reduce maximum daily dose when combined with doxylamine to avoid excessive antihistamine effects.',
  citations: [
    'ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.',
  ],
};

const DIPHENHYDRAMINE: DrugEntry = {
  id: 'diphenhydramine',
  name: 'Diphenhydramine',
  genericName: 'Diphenhydramine hydrochloride',
  drugClass: 'Antihistamine / Antiemetic',
  route: 'PO/IV',
  indications: ['Nausea and vomiting of pregnancy (NVP)', 'Allergic reactions', 'Insomnia', 'Anaphylaxis (H1 blocker)', 'Angioedema'],
  dosing: [
    {
      indication: 'NVP — oral',
      regimen: '25-50 mg PO every 6 hours as needed. Second-line oral agent per ACOG stepwise pathway. Alternative to dimenhydrinate.',
    },
    {
      indication: 'Anaphylaxis (H1 blocker)',
      regimen: '50 mg IV every 6 hours. Second-line adjunct only — give AFTER epinephrine. Combine with H2 blocker (famotidine) — H1+H2 is superior to H1 alone for cutaneous symptoms.\n\nDoes NOT treat hypotension or bronchospasm. Primarily reduces urticaria, flushing, and pruritus. Should never delay or replace epinephrine.',
    },
    {
      indication: 'Angioedema — IV',
      regimen: '25-50 mg IV. First-generation H1 antagonist. Used as adjunct to epinephrine for histamine-mediated angioedema/anaphylaxis. Relieves cutaneous symptoms (urticaria, itching). Combine with a second-generation antihistamine (cetirizine) and H2 blocker (famotidine) for dual antihistamine therapy. Pediatric: 1 mg/kg IV (max 50 mg).',
      weightCalc: { dosePerKg: 1, unit: 'mg', maxDose: 50, label: 'Pediatric dose' },
    },
  ],
  contraindications: [
    'Known hypersensitivity',
    'Neonates/premature infants (not applicable in this context)',
  ],
  cautions: [
    'Significant sedation — warn about drowsiness',
    'Anticholinergic effects',
    'Avoid combination with other CNS depressants',
  ],
  monitoring: 'Symptom improvement. Sedation level.',
  notes: 'Alternative second-line antiemetic for NVP. Generally considered safe in pregnancy. The active antihistamine component of dimenhydrinate.',
  citations: [
    'ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.',
  ],
};

const DOLUTEGRAVIR: DrugEntry = {
  id: 'dolutegravir',
  name: 'Dolutegravir (Tivicay)',
  genericName: 'Dolutegravir',
  drugClass: 'Integrase strand transfer inhibitor (INSTI)',
  route: 'PO',
  indications: ['HIV post-exposure prophylaxis (PEP)', 'HIV treatment (ART)'],
  dosing: [
    {
      indication: 'HIV PEP',
      regimen: '50 mg PO once daily x 28 days (with TDF/FTC backbone). Take with or without food.',
    },
  ],
  contraindications: [
    'Co-administration with dofetilide (increased dofetilide levels)',
  ],
  cautions: [
    'Drug interactions \u2014 avoid polyvalent cation-containing antacids/supplements within 2 hours (chelation reduces absorption)',
    'Metformin \u2014 dolutegravir increases metformin levels; limit metformin to 1000 mg/day',
    'Insomnia and neuropsychiatric effects \u2014 reported in some patients',
    'Weight gain \u2014 observed with long-term INSTI use',
  ],
  monitoring: 'HIV testing at baseline, 4\u20136 weeks, and 3 months. Renal function if on TDF backbone.',
  notes: 'Preferred 3rd agent for PEP when used with TDF/FTC backbone. High barrier to resistance. Well tolerated. Safe in pregnancy.',
  citations: [
    'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV. MMWR. 2025;74(1):1-56.',
    'Gandhi RT, et al. Antiretroviral Drugs for Treatment and Prevention of HIV. JAMA. 2023;329(1):63-84.',
  ],
};

const DILTIAZEM: DrugEntry = {
  id: 'diltiazem',
  name: 'Diltiazem',
  genericName: 'Diltiazem hydrochloride',
  drugClass: 'Nondihydropyridine calcium channel blocker',
  route: 'IV',
  indications: ['A-Fib / A-Flutter rate control', 'Supraventricular tachycardia'],
  dosing: [
    {
      indication: 'A-Fib rate control (acute)',
      regimen: 'Initial bolus: 0.25 mg/kg IV over 2 min (typically 20-25 mg). If inadequate response after 15 min, second bolus: 0.35 mg/kg IV over 2 min. Then continuous infusion: 5-15 mg/hr, titrate to heart rate.',
      weightCalc: [{ dosePerKg: 0.25, unit: 'mg', label: 'Initial bolus' }, { dosePerKg: 0.35, unit: 'mg', label: 'Second bolus (if needed)' }],
    },
  ],
  contraindications: [
    'EF \u226440% or moderate-to-severe LV systolic dysfunction (Class 3: Harm)',
    'Decompensated heart failure',
    'Severe hypotension (SBP <90)',
    'Sick sinus syndrome without pacemaker',
    'Second/third-degree AV block without pacemaker',
    'WPW with atrial fibrillation',
    'Concurrent IV beta-blocker use',
  ],
  cautions: [
    'Hypotension \u2014 most common adverse effect, especially with continuous infusion',
    'Obtain echo or check history for EF if unknown \u2014 CCBs are dangerous in HFrEF',
    'Accumulation with prolonged infusions \u2014 monitor closely and titrate down when able',
    'Negative inotropic effects may worsen borderline hemodynamics',
    'Consider metoprolol over diltiazem in critically ill patients due to lower hypotension risk',
  ],
  monitoring: 'Continuous heart rate and blood pressure monitoring during IV infusion. Reassess hemodynamics frequently. Transition to oral rate control agent when stable.',
  notes: 'Achieves rate control more rapidly than digoxin or amiodarone (90% vs 74%, with faster time to HR <90). First-line for A-Fib rate control when EF >40%. Do NOT combine with IV beta-blockers \u2014 risk of synergistic hypotension and bradycardia.',
  citations: [
    'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.',
    'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
  ],
};

const DOXYCYCLINE: DrugEntry = {
  id: 'doxycycline',
  name: 'Doxycycline',
  genericName: 'Doxycycline',
  drugClass: 'Tetracycline antibiotic',
  route: 'PO',
  indications: ['Syphilis (PCN allergy alternative)', 'Chlamydia', 'Tick-borne diseases', 'Acne', 'Malaria prophylaxis'],
  dosing: [
    {
      indication: 'Primary / Secondary / Early latent syphilis (PCN allergy)',
      regimen: '100 mg PO BID \u00D7 14 days.',
    },
    {
      indication: 'Late latent / Tertiary syphilis (PCN allergy)',
      regimen: '100 mg PO BID \u00D7 28 days.',
    },
  ],
  contraindications: [
    'Pregnancy \u2014 tetracyclines cause fetal bone/teeth abnormalities',
    'Children < 8 years (tooth discoloration)',
  ],
  cautions: [
    'Photosensitivity \u2014 advise sun protection',
    'Esophageal ulceration \u2014 take with full glass of water, remain upright 30 min',
    'Not adequate for neurosyphilis \u2014 poor CSF penetration',
  ],
  monitoring: 'Quantitative RPR at 6, 12, and 24 months post-treatment.',
  notes: 'Alternative for non-pregnant PCN-allergic patients with early syphilis. Evidence is weaker than for penicillin G.',
  citations: [
    'CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.',
  ],
};

const DOXYLAMINE: DrugEntry = {
  id: 'doxylamine',
  name: 'Doxylamine',
  genericName: 'Doxylamine succinate',
  drugClass: 'Antihistamine / Antiemetic',
  route: 'PO',
  indications: ['Nausea and vomiting of pregnancy (NVP)'],
  dosing: [
    {
      indication: 'NVP — combination with pyridoxine (first-line)',
      regimen: '12.5 mg PO TID (with pyridoxine 10-25 mg PO TID). Adjust schedule per symptom severity. ACOG Level A recommendation as first-line pharmacologic therapy for NVP. Superior to pyridoxine alone.',
    },
    {
      indication: 'NVP — delayed-release combination product (Diclegis/Bonjesta)',
      regimen: 'Diclegis: pyridoxine 10 mg / doxylamine 10 mg — 2 tabs at bedtime initially, up to 4 tabs/day (1 AM + 1 midafternoon + 2 bedtime). Bonjesta: pyridoxine 20 mg / doxylamine 20 mg — 1 tab at bedtime, up to 2 tabs/day. Consider generic pyridoxine + doxylamine for significant cost savings.',
    },
  ],
  contraindications: [
    'Known hypersensitivity',
    'MAO inhibitor use (within 14 days)',
  ],
  cautions: [
    'Sedation — take bedtime dose first',
    'Anticholinergic effects',
    'Available OTC as sleep aid (Unisom SleepTabs) — can be split for NVP dosing',
  ],
  monitoring: 'Symptom improvement. Ensure patient is tolerating combination.',
  notes: 'First-line pharmacologic therapy for NVP when combined with pyridoxine (ACOG Level A). The delayed-release combination product (Diclegis) is FDA-approved but expensive. Generic pyridoxine + OTC doxylamine (Unisom SleepTabs, NOT SleepGels which contain diphenhydramine) is a cost-effective alternative.',
  citations: [
    'ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.',
    'McParlin C, O\'Donnell A, Robson SC, et al. Treatments for hyperemesis gravidarum and nausea and vomiting in pregnancy: a systematic review. JAMA. 2016;316(13):1392-1401.',
  ],
};

const EDOXABAN: DrugEntry = {
  id: 'edoxaban',
  name: 'Edoxaban',
  genericName: 'Edoxaban',
  drugClass: 'Direct oral anticoagulant (Factor Xa inhibitor)',
  route: 'PO',
  indications: ['Pulmonary embolism', 'Deep vein thrombosis', 'Atrial fibrillation (stroke prevention)'],
  dosing: [
    {
      indication: 'PE / DVT treatment',
      regimen: 'Requires 5\u201310 days parenteral anticoagulation (LMWH) first, then 60 mg once daily. Reduce to 30 mg once daily if: CrCl 15\u201350 mL/min, body weight <60 kg, or concomitant P-glycoprotein inhibitors.',
    },
  ],
  cautions: [
    'CrCl >95 mL/min \u2014 reduced efficacy vs warfarin (avoid in AF indication)',
    'CrCl <15 mL/min \u2014 not recommended',
    'Moderate-severe hepatic impairment \u2014 not recommended',
  ],
  notes: 'Requires initial parenteral anticoagulation bridge. Once-daily dosing may improve adherence.',
  citations: [
    'Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.',
  ],
};

const EPINEPHRINE: DrugEntry = {
  id: 'epinephrine',
  name: 'Epinephrine',
  genericName: 'Epinephrine',
  drugClass: 'Non-selective adrenergic agonist (alpha + beta)',
  route: 'IM/IV/IO/SQ/ET/Intracavernosal',
  indications: ['Anaphylaxis / angioedema', 'Hyperkalemia with hemodynamic instability', 'Ischemic priapism (alternative to phenylephrine)', 'Neonatal resuscitation (NRP)'],
  dosing: [
    {
      indication: 'Anaphylaxis — IM (first-line)',
      regimen: '0.5 mg IM (0.5 mL of 1 mg/mL) into anterolateral thigh. Repeat every 5 minutes up to 3 doses if no response. NO absolute contraindications in anaphylaxis.\n\nPediatric: 0.01 mg/kg IM (max 0.5 mg).\n\nAnterolateral thigh provides faster peak plasma levels than deltoid or subcutaneous injection (Simons 2001). Do NOT delay epinephrine for IV access, antihistamines, or steroids.',
      weightCalc: { dosePerKg: 0.01, unit: 'mg', maxDose: 0.5, label: 'Pediatric IM' },
    },
    {
      indication: 'Anaphylaxis — IV infusion',
      regimen: 'Mix 1 mg in 100 mL NS (10 mcg/mL). Loading: 20 mcg/min × 2 minutes. Maintenance: 5-15 mcg/min. Titrate to effect. AGGRESSIVELY WEAN after resolution — reluctance to stop is the greatest weakness of epi infusion.\n\nBrown et al 2014: 19 patients treated at 5-15 mcg/min, all responded within 5 minutes.\n\nOnly with pre-existing IV access and experienced resuscitationist. IM remains first-line for the vast majority of anaphylaxis cases.',
    },
    {
      indication: 'Anaphylaxis — push dose (peri-arrest)',
      regimen: '20-50 mcg IV push. For peri-arrest / impending cardiovascular collapse ONLY.\n\nFrom infusion bag: 2-5 mL of 10 mcg/mL solution.\nOr dilute: 0.1 mL of 1 mg/mL in 10 mL NS = 10 mcg/mL, give 2-5 mL.\n\nDo NOT give cardiac arrest dose (1 mg IV) to a patient with a pulse — 61-fold overdose risk with IV bolus vs IM.',
    },
    {
      indication: 'Hyperkalemia with hypotension/bradycardia',
      regimen: 'Epinephrine infusion 2-10 mcg/min IV. Treats both hyperkalemia AND hemodynamic instability simultaneously. Beta-2 effect shifts K+ intracellularly.',
    },
    {
      indication: 'Ischemic priapism',
      regimen: '20 mcg (2 mL of 10 mcg/mL solution) intracavernosal every 5 minutes, up to 5 doses total (100 mcg max). Mix: 1 mL epi from cardiac amp (100 mcg/mL) + 9 mL NS = 10 mcg/mL.',
    },
    {
      indication: 'Neonatal resuscitation (NRP) — IV/IO',
      regimen: '0.01-0.03 mg/kg of 1:10,000 (0.1-0.3 mL/kg) IV/IO. Repeat every 3-5 minutes. Flush with 1-3 mL NS. IV/IO preferred over ET route.',
      weightCalc: [
        { dosePerKg: 0.01, unit: 'mg', label: 'Low dose (0.01 mg/kg)' },
        { dosePerKg: 0.03, unit: 'mg', label: 'High dose (0.03 mg/kg)' },
      ],
    },
    {
      indication: 'Neonatal resuscitation (NRP) — ET',
      regimen: '0.05-0.1 mg/kg of 1:10,000 (0.5-1 mL/kg) via endotracheal tube. Use only if IV/IO access not available. Higher dose needed — absorption is unpredictable via ET route.',
      weightCalc: [
        { dosePerKg: 0.05, unit: 'mg', label: 'Low dose ET (0.05 mg/kg)' },
        { dosePerKg: 0.1, unit: 'mg', label: 'High dose ET (0.1 mg/kg)' },
      ],
    },
  ],
  contraindications: [
    'Uncontrolled hypertension',
    'MAO inhibitor use',
    'Do NOT give cardiac arrest doses (1 mg) to patients with a pulse',
  ],
  cautions: [
    'Has alpha AND beta1/2 effects \u2014 higher cardiovascular risk than phenylephrine',
    'Monitor BP and HR every 5 min between injections',
    'Hold if SBP > 160 or HR > 110',
  ],
  monitoring: 'BP/HR every 5 min during injections. Observe 60 min post-detumescence.',
  notes: 'Use only if phenylephrine is unavailable. Phenylephrine is preferred due to pure alpha-1 selectivity and lower cardiovascular risk. Onset: 1 min. Duration: 5\u201310 min.\n\nMIXING INSTRUCTIONS (10 mcg/mL):\n1. Take a 10 mL syringe and draw up 9 mL of normal saline\n2. Draw up 1 mL of epinephrine from the cardiac amp (cardiac amp contains 100 mcg/mL)\n3. Now you have 10 mL of epinephrine at 10 mcg/mL\n4. Each dose = 2 mL (20 mcg)\n\n\u26A0\uFE0F Do NOT give cardiac arrest doses (1 mg) to patients with a pulse.',
  citations: [
    'Bivalacqua TJ, et al. AUA/SMSNA Guideline on Priapism. J Urol. 2022;208(1):43-52.',
    'Graham BA, et al. Emergency Pharmacotherapy for Priapism. Expert Opin Pharmacother. 2022;23(12):1371-80.',
    'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
    'AHA/AAP. 2025 Guidelines for Neonatal Resuscitation. Circulation. 2025;152(Suppl 1):S399-S445.',
  ],
};

const ENOXAPARIN: DrugEntry = {
  id: 'enoxaparin',
  name: 'Enoxaparin (LMWH)',
  genericName: 'Enoxaparin sodium',
  drugClass: 'Low molecular weight heparin',
  route: 'SC',
  indications: ['Pulmonary embolism', 'Deep vein thrombosis', 'ACS', 'VTE prophylaxis'],
  dosing: [
    {
      indication: 'PE / DVT treatment',
      regimen: '1 mg/kg SC every 12 hours, or 1.5 mg/kg SC once daily.',
      weightCalc: [{ dosePerKg: 1, unit: 'mg', label: 'BID dosing' }, { dosePerKg: 1.5, unit: 'mg', label: 'Daily dosing' }],
    },
    {
      indication: 'VTE prophylaxis',
      regimen: '40 mg SC once daily.',
    },
    {
      indication: 'ACS / NSTEMI',
      regimen: '1 mg/kg SC every 12 hours. Duration: until invasive strategy or up to 8 days. CrCl <30 mL/min: 1 mg/kg SC once daily. If PCI >8h after last SC dose: supplemental 0.3 mg/kg IV bolus in cath lab.',
      weightCalc: { dosePerKg: 1, unit: 'mg' },
    },
    {
      indication: 'STEMI / Fibrinolysis',
      regimen: 'Age <75 years: 30 mg IV bolus, then 1 mg/kg SC q12h (max 100 mg for first 2 doses).\nAge \u226575 years: No IV bolus, 0.75 mg/kg SC q12h (max 75 mg for first 2 doses).\nCrCl <30: 1 mg/kg SC q24h.\n\nContinue for duration of hospitalization or until revascularization.',
      weightCalc: [
        { dosePerKg: 1, unit: 'mg', maxDose: 100, label: 'Age <75 SC dose' },
        { dosePerKg: 0.75, unit: 'mg', maxDose: 75, label: 'Age \u226575 SC dose' },
      ],
    },
  ],
  contraindications: [
    'Heparin-induced thrombocytopenia (HIT) \u2014 absolute contraindication due to cross-reactivity with HIT antibodies',
    'Active major bleeding',
  ],
  cautions: [
    'Severe renal insufficiency (CrCl \u226430 mL/min) \u2014 significantly increased bleeding risk (OR 2.25 for major bleeding). Consider UFH when CrCl <25\u201330 mL/min.',
    'Neuraxial anesthesia \u2014 administer LMWH \u226512 hr before catheter placement/removal; delay dosing \u22654 hr after removal. No twice-daily LMWH with indwelling neuraxial catheter.',
    'Extreme body weight (<40 kg or >100 kg), pregnancy, pediatrics \u2014 consider anti-Xa monitoring. Monitor if >150 kg.',
    'Effects cannot be completely reversed by protamine sulfate.',
  ],
  monitoring: 'Anti-Xa levels if renal impairment, extremes of weight, or pregnancy. Platelet count if > 4 days of therapy (HIT screening).',
  citations: [
    'Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020.',
    'Garcia DA, et al. Parenteral Anticoagulants: ACCP Evidence-Based Clinical Practice Guidelines. Chest. 2012.',
  ],
};

const FAMOTIDINE: DrugEntry = {
  id: 'famotidine',
  name: 'Famotidine',
  genericName: 'Famotidine',
  drugClass: 'H2 receptor antagonist',
  route: 'IV/PO',
  indications: ['Anaphylaxis (H2 blocker)', 'Allergic reactions (adjunctive)'],
  dosing: [
    {
      indication: 'Anaphylaxis (H2 blocker)',
      regimen: '20 mg IV every 12 hours (inpatient). Second-line adjunct — give AFTER epinephrine. Combine with H1 blocker (diphenhydramine) — H1+H2 combination is superior to H1 alone for cutaneous symptoms.\n\nDoes NOT treat hypotension or bronchospasm. Onset ~30-45 minutes even IV.',
    },
    {
      indication: 'Allergic reactions (discharge)',
      regimen: '20 mg PO BID × 3-5 days. Optional short-course for discharge. No evidence this prevents biphasic reactions.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to famotidine or other H2 blockers',
  ],
  cautions: [
    'Dose adjust in renal impairment (CrCl <50 mL/min: 20 mg once daily)',
    'Headache, dizziness uncommon',
    'Drug interactions with atazanavir (reduced absorption — avoid combination)',
  ],
  monitoring: 'Clinical symptom improvement.',
  notes: 'H2 blockade in anaphylaxis is adjunctive only. Histamine acts on both H1 and H2 receptors to increase vascular permeability and edema. Combined H1+H2 blockade was superior to H1 alone in a prospective randomized trial of 91 adults with acute allergic reactions (Lin et al 2000). However, antihistamines of any type do NOT treat the life-threatening components of anaphylaxis (hypotension, bronchospasm, airway edema).',
  citations: [
    'Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). 2025.',
    'Lin RY, et al. Improved outcomes in patients with acute allergic syndromes who are treated with combined H1 and H2 antagonists. Ann Emerg Med. 2000;36(5):462-468.',
  ],
};

const ESMOLOL: DrugEntry = {
  id: 'esmolol',
  name: 'Esmolol',
  genericName: 'Esmolol hydrochloride',
  drugClass: 'Ultra-short-acting beta-1 selective blocker',
  route: 'IV',
  indications: ['A-Fib / A-Flutter rate control', 'Supraventricular tachycardia', 'Perioperative tachycardia/hypertension', 'Thyroid storm (rate control)'],
  dosing: [
    {
      indication: 'A-Fib rate control',
      regimen: 'Loading dose: 500 mcg/kg IV over 1 minute. Infusion: 50-200 mcg/kg/min, titrate by 50 mcg/kg/min every 4 min. May repeat loading dose with each infusion increase.',
    },
    {
      indication: 'Thyroid storm (rate control)',
      regimen: '250-500 mcg/kg IV loading dose over 1 min, then 50-100 mcg/kg/min infusion. PREFERRED over propranolol in thyroid storm (IBCC): ultra-short acting (half-life 9 min), immediately titratable, can be stopped instantly if hypotension develops. ONLY use with preserved EF on echocardiogram. Cardioselective — safer in reactive airway disease than propranolol.',
    },
  ],
  contraindications: [
    'Severe sinus bradycardia',
    'Heart block greater than first degree without pacemaker',
    'Cardiogenic shock',
    'Decompensated heart failure',
    'WPW with atrial fibrillation',
  ],
  cautions: [
    'Hypotension \u2014 may occur especially at higher infusion rates',
    'Must be given as continuous infusion \u2014 eliminated within 9 min of stopping',
    'Use cautiously in patients on calcium channel blockers \u2014 risk of additive bradycardia/hypotension',
    'Bronchospasm \u2014 theoretical risk, though beta-1 selectivity is lost at high doses',
  ],
  monitoring: 'Continuous heart rate and blood pressure monitoring during infusion. Effects resolve within minutes of discontinuation \u2014 ideal for titration.',
  notes: 'Ultra-short-acting beta-blocker (half-life ~9 min). Particularly useful when rapid titration or reversal is needed \u2014 if hypotension occurs, effects resolve within minutes of stopping infusion. Ideal for patients with uncertain hemodynamics or when testing beta-blocker tolerance before committing to longer-acting agents.',
  citations: [
    'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
    'Prystowsky EN, et al. Treatment of Atrial Fibrillation. JAMA. 2015;314(3):278-88.',
  ],
};

const LIDOCAINE: DrugEntry = {
  id: 'lidocaine',
  name: 'Lidocaine 1% (Without Epinephrine)',
  genericName: 'Lidocaine',
  drugClass: 'Amide local anesthetic',
  route: 'Local injection',
  indications: ['Dorsal penile nerve block', 'Hematoma block', 'Local anesthesia for minor procedures', 'Nerve blocks'],
  dosing: [
    {
      indication: 'Dorsal penile nerve block',
      regimen: '10 mL total of 1% lidocaine WITHOUT epinephrine: 5 mL injected at 10 o\u2019clock and 5 mL at 2 o\u2019clock at penile base, under Buck\u2019s fascia.',
    },
    {
      indication: 'Hematoma block',
      regimen: '5–10 mL of 1% plain lidocaine (10 mg/mL) injected directly into fracture hematoma via 20-gauge needle. Aspirate dark blood to confirm placement. US-guided for improved accuracy. Wait 5–10 min for full effect. For combined radius + ulna fractures, second injection into ulnar hematoma.',
      weightCalc: { dosePerKg: 4.5, unit: 'mg', label: 'Max dose (1% = 10 mg/mL)' },
    },
  ],
  contraindications: [
    'Allergy to amide local anesthetics',
    'NEVER use with epinephrine on the penis \u2014 end-artery territory, risk of ischemic necrosis',
  ],
  cautions: [
    'Max dose without epi: 4.5 mg/kg',
    'Aspirate before injecting to avoid intravascular injection',
    'Wait 5\u201310 min for full anesthetic effect',
    'Hematoma block: fracture hematoma contiguous with marrow space — rapid systemic absorption similar to IO',
  ],
  monitoring: 'Test block adequacy with pinprick before procedure. Onset: 2\u20135 min. Duration: 30\u201360 min.',
  notes: 'For penile block, NEVER use formulations containing epinephrine. The penis is supplied by end-arteries \u2014 epinephrine can cause ischemic necrosis.',
  citations: [
    'Burnett AL, Sharlip ID. Standard Operating Procedures for Priapism. J Sex Med. 2013;10(1):180-94.',
  ],
};

const LOPERAMIDE: DrugEntry = {
  id: 'loperamide',
  name: 'Loperamide (Imodium)',
  genericName: 'Loperamide hydrochloride',
  drugClass: 'Opioid receptor agonist (peripheral)',
  route: 'PO',
  indications: ['Acute diarrhea (symptomatic relief)', 'Traveler\'s diarrhea (adjunct)', 'Diarrhea in pregnancy'],
  dosing: [
    {
      indication: 'Acute diarrhea',
      regimen: '4 mg PO initially, then 2 mg after each loose stool. Max 16 mg per day.',
    },
    {
      indication: 'Traveler diarrhea',
      regimen: '4 mg PO initially, then 2 mg after each loose stool. Max 16 mg per day. Use as adjunct with antibiotics \u2014 combination reduces duration by 1 additional day.',
    },
    {
      indication: 'Pregnancy',
      regimen: '4 mg PO initially, then 2 mg after each loose stool. Max 16 mg per day. FDA Category B \u2014 safest antimotility option in pregnancy.',
    },
  ],
  contraindications: [
    'Bloody diarrhea or dysentery',
    'Suspected Shiga toxin-producing E. coli (STEC) \u2014 increases HUS risk',
    'High fever (>38.5\u00b0C) with suspected invasive bacterial pathogen',
    'Children under 2 years',
  ],
  cautions: [
    'Avoid in immunocompromised patients with suspected infectious diarrhea',
    'Avoid with suspected inflammatory diarrhea (positive fecal leukocytes)',
    'Risk of toxic megacolon with C. difficile or IBD',
    'Not recommended in children for acute gastroenteritis',
    'Overdose can cause cardiac arrhythmias \u2014 do not exceed recommended dose',
  ],
  monitoring: 'Clinical response. Discontinue if symptoms worsen, fever develops, or abdominal distension occurs.',
  notes: 'Preferred antimotility agent \u2014 slows intraluminal flow by inhibiting peristalsis, increasing intestinal absorption of fluid and electrolytes. Peripheral opioid that does NOT penetrate the CNS: no central side effects or addiction potential. When combined with antibiotics in traveler\'s diarrhea, reduces illness duration by 1 additional day.',
  citations: [
    'Burg MD, Hovanessian HC. Diarrhea: Identifying Serious Illness and Providing Relief. Emergency Medicine Practice. 2004;6(7):1-24.',
    'Riddle MS, et al. ACG Clinical Guideline: Diagnosis, Treatment, and Prevention of Acute Diarrheal Infections in Adults. Am J Gastroenterol. 2016;111(5):602-622.',
  ],
};

const FONDAPARINUX: DrugEntry = {
  id: 'fondaparinux',
  name: 'Fondaparinux (Arixtra)',
  genericName: 'Fondaparinux sodium',
  drugClass: 'Synthetic factor Xa inhibitor (indirect)',
  route: 'SC',
  indications: ['ACS / NSTEMI (conservative management)', 'DVT/PE treatment', 'VTE prophylaxis'],
  dosing: [
    {
      indication: 'NSTEMI (conservative / ischemia-guided strategy)',
      regimen: '2.5 mg SC once daily. Start on presentation, continue until discharge or up to 8 days. If patient goes to PCI: supplement with UFH 60 units/kg bolus (catheter thrombosis risk).',
    },
    {
      indication: 'STEMI / Fibrinolysis',
      regimen: '2.5 mg IV bolus with first dose of fibrinolytic, then 2.5 mg SC daily.\n\nAvoid if CrCl <30 mL/min.\n\nIf proceeding to PCI: supplement with UFH (catheter thrombosis risk with fondaparinux alone).',
    },
  ],
  contraindications: [
    'CrCl <30 mL/min — contraindicated',
    'Active major bleeding',
    'Bacterial endocarditis',
    'Body weight <50 kg — increased bleeding risk',
  ],
  cautions: [
    'Catheter thrombosis if used alone during PCI — must supplement with UFH bolus in cath lab',
    'Cannot monitor with aPTT — use anti-Xa levels if monitoring needed',
    'Neuraxial anesthesia — risk of spinal/epidural hematoma',
    'No reversal agent available',
  ],
  monitoring: 'Renal function at baseline. Anti-Xa levels only if needed (not routine). CBC for bleeding. Signs of catheter thrombosis if proceeding to PCI.',
  notes: 'OASIS-5 trial: fondaparinux 2.5 mg daily was noninferior to enoxaparin for ischemic events in NSTEMI but with 50% reduction in major bleeding (2.2% vs 4.1%) and significantly lower mortality at 6 months. Preferred anticoagulant for conservative/ischemia-guided management strategy. Must supplement with UFH if patient undergoes PCI due to catheter thrombosis risk.',
  citations: [
    'Yusuf S, et al. Comparison of Fondaparinux and Enoxaparin in Acute Coronary Syndromes (OASIS-5). N Engl J Med. 2006;354(14):1464-1476.',
    'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.',
  ],
};

const FLUDROCORTISONE: DrugEntry = {
  id: 'fludrocortisone',
  name: 'Fludrocortisone',
  genericName: 'Fludrocortisone acetate',
  drugClass: 'Mineralocorticoid',
  route: 'PO',
  indications: ['Hyperkalemia (adjunct — stimulates renal K+ excretion)', 'Adrenal insufficiency', 'Orthostatic hypotension', 'Adrenal insufficiency maintenance (PAI only)', 'Pediatric AI maintenance'],
  dosing: [
    {
      indication: 'Hyperkalemia adjunct',
      regimen: '0.2 mg PO once. Especially useful in patients on ACEi/ARB, tacrolimus, or with suspected type IV RTA.',
    },
    {
      indication: 'Adrenal insufficiency maintenance (PAI only)',
      regimen: '50-200 μg (0.05-0.2 mg) PO once daily. For PRIMARY adrenal insufficiency only — NOT needed in secondary or tertiary AI (renin-angiotensin-aldosterone axis intact). Starting dose: 50-100 μg. Titrate based on plasma renin activity (target normal range), blood pressure, and serum potassium.',
    },
    {
      indication: 'Pediatric AI maintenance',
      regimen: '50-200 μg PO daily. Higher doses may be needed in infants with salt-wasting congenital adrenal hyperplasia. Salt supplementation 1-2 g/day may be needed in infants. Monitor blood pressure, serum potassium, and plasma renin activity.',
      weightCalc: { dosePerKg: 0.05, unit: 'mg', maxDose: 0.2, label: 'Starting dose — titrate to renin' },
    },
  ],
  contraindications: [
    'Systemic fungal infections',
    'Active heart failure (sodium retention)',
  ],
  cautions: [
    'Sodium retention → fluid overload, edema, hypertension',
    'Hypokalemia with prolonged use',
    'Consider if patient making urine but K+ not falling (inadequate urine K+ content)',
  ],
  monitoring: 'Blood pressure, serum potassium, fluid status.',
  notes: 'Underutilized adjunct for hyperkalemia. Replaces the mineralocorticoid effect suppressed by ACEi/ARBs, tacrolimus, and other causes of type IV RTA. Stimulates ENaC sodium reabsorption and ROMK potassium secretion in the collecting duct. Most effective when combined with adequate sodium delivery to the collecting duct (i.e., after volume resuscitation).',
  citations: [
    'Palmer BF, Clegg DJ. Diagnosis and Treatment of Hyperkalemia. Cleve Clin J Med. 2017;84(12):934-942.',
  ],
};

const FUROSEMIDE: DrugEntry = {
  id: 'furosemide',
  name: 'Furosemide',
  genericName: 'Furosemide',
  drugClass: 'Loop diuretic',
  route: 'IV / PO',
  indications: ['Hyperkalemia (kaliuresis)', 'Volume overload / pulmonary edema', 'Acute kidney injury (oliguric)', 'Sodium disorders (SIAD)', 'Hypernatremia (volume overload)'],
  dosing: [
    {
      indication: 'Hyperkalemia (normal renal function)',
      regimen: '40-80 mg IV. May be sufficient as sole diuretic.',
    },
    {
      indication: 'Hyperkalemia (moderate-severe renal dysfunction)',
      regimen: '160-250 mg IV. Combine with thiazide +/- acetazolamide for synergistic "nephron bomb."',
    },
    {
      indication: 'Volume overload',
      regimen: '40-160 mg IV, dose based on renal function and prior diuretic exposure.',
    },
    {
      indication: 'SIAD (with salt tabs)',
      regimen: '20-40 mg PO daily with NaCl tablets 3-9 g/day. Loop diuretic generates electrolyte-free water clearance when combined with increased solute load.',
    },
    {
      indication: 'Hypernatremia (volume overload)',
      regimen: '20-40 mg IV. Produces hypotonic urine, allowing concurrent free water replacement to correct hypernatremia while removing excess volume.',
    },
  ],
  contraindications: [
    'Anuria unresponsive to fluid challenge',
    'Severe hypovolemia/dehydration',
    'Hepatic coma (electrolyte shifts)',
  ],
  cautions: [
    'Higher doses needed in renal dysfunction (diuretic resistance)',
    'Replace urine losses with crystalloid to avoid hypovolemia — use isotonic bicarb if bicarb <22, LR if bicarb ≥22',
    'Monitor electrolytes: K, Mg, Na, Ca frequently',
    'Ototoxicity at very high doses or rapid infusion',
  ],
  monitoring: 'Urine output (target response within 1-2 hours), serum electrolytes including Mg, fluid balance.',
  notes: 'Cornerstone of kaliuresis strategy. For life-threatening hyperkalemia, err on the side of more diuretic — excessive diuresis is easily corrected with crystalloid, but inadequate diuretic may lead to unnecessary dialysis. In the "nephron bomb," furosemide blocks the Na-K-2Cl cotransporter in the thick ascending limb.',
  citations: [
    'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-51.',
    'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
  ],
};

const GENTAMICIN: DrugEntry = {
  id: 'gentamicin',
  name: 'Gentamicin',
  genericName: 'Gentamicin sulfate',
  drugClass: 'Aminoglycoside',
  route: 'IV',
  indications: ['Neonatal sepsis (0-7 days, synergy with Ampicillin)'],
  dosing: [
    {
      indication: 'Neonatal sepsis (0-7 days)',
      regimen: '4 mg/kg IV q24h.',
    },
    {
      indication: 'Neonatal sepsis (8-28 days, if extended use)',
      regimen: '5 mg/kg IV q24h.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to aminoglycosides',
  ],
  cautions: [
    'Nephrotoxicity — monitor renal function',
    'Ototoxicity — risk increases with prolonged use',
    'Neuromuscular blockade — caution with concurrent paralytics',
  ],
  monitoring: 'Drug levels not needed for empiric rule-out period (≤48h). If >2 doses anticipated, obtain trough before 3rd dose (goal <1 mcg/mL). Renal function (BUN, creatinine). Audiometry if prolonged course.',
  notes: 'Provides synergistic bactericidal activity with Ampicillin against GBS and Listeria. Standard empiric pairing for neonatal sepsis in the first week of life (Ampicillin + Gentamicin). Transition to Ceftriaxone/Cefepime-based regimen after 7 days of life.',
  citations: [
    'Puopolo KM, et al. Management of Neonates Born at ≥35 0/7 Weeks\' Gestation With Suspected or Proven Early-Onset Bacterial Sepsis. Pediatrics. 2018;142(6):e20182894.',
    'Red Book: 2021-2024 Report of the Committee on Infectious Diseases. American Academy of Pediatrics.',
  ],
};

const GLUCAGON: DrugEntry = {
  id: 'glucagon',
  name: 'Glucagon',
  genericName: 'Glucagon hydrochloride',
  drugClass: 'Hyperglycemic agent / Beta-blocker reversal',
  route: 'IV/IM',
  indications: ['Anaphylaxis in beta-blocked patients (last resort)', 'Beta-blocker overdose', 'Hypoglycemia'],
  dosing: [
    {
      indication: 'Anaphylaxis (beta-blocked patient)',
      regimen: 'Adults: 1-5 mg IV over 5 minutes, then infusion 5-15 mcg/min if needed.\nPediatric: 20-30 mcg/kg IV (max 1 mg) over 5 minutes.\n\nDISCOURAGED by critical care experts — weak evidence (scattered case reports only), only bypasses beta-1 receptors (NOT beta-2), and HIGH emesis risk which may compromise unsecured airway.\n\nReserve for LAST RESORT when epinephrine, methylene blue, and volume resuscitation have failed.',
      weightCalc: { dosePerKg: 0.02, unit: 'mg', maxDose: 1, label: 'Pediatric (20 mcg/kg)' },
    },
    {
      indication: 'Beta-blocker overdose',
      regimen: '3-10 mg IV over 1 minute, then 3-5 mg/hr infusion. Bypasses beta-1 blockade via cAMP pathway independent of beta-adrenergic receptors.',
    },
    {
      indication: 'Hypoglycemia',
      regimen: '1 mg IM/SQ/IV. If no response in 15 min, may repeat × 1.',
    },
  ],
  contraindications: [
    'Pheochromocytoma (may provoke catecholamine surge)',
    'Insulinoma (rebound hypoglycemia)',
  ],
  cautions: [
    'HIGH emesis risk — have suction ready, aspiration precautions',
    'Only bypasses beta-1 receptors, NOT beta-2 — does not address mast cell stabilization, bronchospasm, or vasodilation',
    'Transient hyperglycemia',
    'Hypokalemia',
    'Very short-acting — may require infusion',
  ],
  monitoring: 'Heart rate, blood pressure, blood glucose, emesis.',
  notes: 'Historically recommended for beta-blocked anaphylaxis but now DISCOURAGED by critical care experts (Farkas/IBCC). The rationale for glucagon is to bypass beta-1 blockade in the heart (improving inotropy and chronotropy via cAMP). However, this does NOT address the core pathophysiology of anaphylaxis — mast cell stabilization and vasodilation are mediated by beta-2 receptors, which glucagon does not affect. The high risk of emesis in a patient with a potentially compromised airway makes glucagon a poor choice. Methylene blue (guanylate cyclase inhibitor) and higher-dose epinephrine are preferred for refractory anaphylaxis in beta-blocked patients.',
  citations: [
    'Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). 2025.',
    'Nunez J, Santillanes G. Anaphylaxis in Pediatric Patients. Pediatric Emergency Medicine Practice (EB Medicine). 2019;16(6):1-24.',
  ],
};

const HYPERTONIC_SALINE: DrugEntry = {
  id: 'hypertonic-saline',
  name: 'Hypertonic Saline (3% NaCl)',
  genericName: 'Sodium chloride 3%',
  drugClass: 'Hypertonic crystalloid',
  route: 'IV',
  indications: ['Severe symptomatic hyponatremia', 'DDAVP clamp bolus correction'],
  dosing: [
    {
      indication: 'Severe symptomatic hyponatremia',
      regimen: '100-150 mL IV bolus over 10-20 minutes. May repeat x2 (up to 3 boluses total). Target: 4-6 mEq/L rise in Na to resolve acute symptoms. Do NOT exceed 10 mEq/L correction in first 24 hours.',
    },
    {
      indication: 'DDAVP clamp bolus correction',
      regimen: '100 mL IV bolus. Each bolus raises Na ~2 mEq/L in a 70 kg adult. Administer during DDAVP clamp to achieve controlled, predictable Na rise. Check Na q2h.',
    },
  ],
  contraindications: [
    'Hypernatremia',
    'Volume overload without severe symptomatic hyponatremia',
  ],
  cautions: [
    'Check Na q2h during administration — overcorrection causes osmotic demyelination syndrome (ODS)',
    'Central line preferred for continuous infusions; peripheral access OK for boluses',
    'Max correction: 10 mEq/L in 24h (8 mEq/L for high-risk patients: alcoholics, malnourished, hypokalemia)',
    'SALSA trial showed bolus therapy achieves faster symptom relief than continuous infusion',
  ],
  monitoring: 'Serum sodium q2h during treatment, neurological status, fluid balance.',
  notes: '3% NaCl contains 513 mEq/L of sodium. The bolus approach (100-150 mL over 10-20 min, repeat PRN) is now preferred over continuous infusion based on the SALSA trial. Each 100 mL bolus raises Na ~2 mEq/L in a 70 kg adult. The goal is to raise Na enough to reverse acute cerebral edema symptoms (usually 4-6 mEq/L), NOT to normalize Na. Subsequent correction should be slow and controlled.',
  citations: [
    'Baek SH et al. SALSA Trial: Bolus vs Continuous 3% Saline. JAMA Intern Med. 2021;181(1):81-92.',
    'Spasovski G et al. Clinical Practice Guideline on Hyponatraemia. Eur J Endocrinol. 2014;170(3):G1-G47.',
  ],
};

const LABETALOL: DrugEntry = {
  id: 'labetalol',
  name: 'Labetalol',
  genericName: 'Labetalol hydrochloride',
  drugClass: 'Combined alpha-1 and beta-adrenergic blocker',
  route: 'IV',
  indications: ['Acute stroke BP management (pre/post thrombolysis)', 'Hypertensive emergency', 'Preeclampsia/eclampsia'],
  dosing: [
    {
      indication: 'Pre-thrombolysis BP (target <185/110)',
      regimen: '10\u201320 mg IV bolus over 1\u20132 min. May repeat once. If BP still >185/110 after 2 doses, consider nicardipine infusion. Do NOT proceed with thrombolysis if BP remains uncontrolled.',
    },
    {
      indication: 'Post-thrombolysis BP (target <180/105 \u00D7 24h)',
      regimen: '10 mg IV bolus, then 2\u20138 mg/min continuous infusion. Titrate to maintain BP <180/105. Max 300 mg/24h.',
    },
    {
      indication: 'ICH blood pressure control (target SBP 130\u2013150)',
      regimen: '10\u201320 mg IV bolus over 1\u20132 min. May repeat every 10\u201315 min. If repeated boluses needed, start infusion at 2\u20138 mg/min. Target SBP 130\u2013150. Avoid SBP <130 or drops >70 mmHg in first hour. Max 300 mg/24h.',
    },
    {
      indication: 'SAH blood pressure control (target SBP <160)',
      regimen: '10-20 mg IV bolus over 1-2 min. May repeat every 10-15 min. If repeated boluses needed, start infusion at 2-8 mg/min. Target SBP <160 mmHg until aneurysm is secured. Max 300 mg/24h. Avoid nitroprusside (increases ICP).',
    },
    {
      indication: 'ACS / Cocaine-Associated',
      regimen: '10-20 mg IV over 2 minutes. May repeat or double dose q10 min (max 300 mg total).\n\nPreferred beta-blocker in cocaine-associated STEMI due to combined alpha/beta blockade (avoids unopposed alpha stimulation).\n\nAvoid pure beta-blockers (metoprolol, atenolol) in acute cocaine-associated ACS.',
    },
  ],
  contraindications: [
    'Severe bradycardia (HR <60)',
    'Heart block greater than first degree without pacemaker',
    'Cardiogenic shock or decompensated HF',
    'Severe reactive airway disease / status asthmaticus',
    'Pheochromocytoma (without prior alpha-blockade)',
  ],
  cautions: [
    'Bronchospasm \u2014 beta-2 blockade at higher doses may precipitate bronchospasm in asthma/COPD',
    'Bradycardia \u2014 monitor HR; hold if HR <55',
    'Hepatotoxicity \u2014 rare idiosyncratic reaction; monitor LFTs if prolonged use',
    'Orthostatic hypotension \u2014 keep patient supine during IV administration',
  ],
  monitoring: 'Continuous BP monitoring (arterial line preferred). Heart rate. Neuro checks every 15 min during active titration.',
  notes: 'First-line IV antihypertensive for acute stroke per AHA/ASA guidelines. Onset: 2\u20135 min IV. Duration: 2\u20134 hours. Alpha:beta blockade ratio is ~1:7 (predominantly beta). Does not increase intracranial pressure. Preferred over nitroprusside (which can raise ICP).',
  citations: [
    'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
    'Whelton PK, et al. 2017 ACC/AHA Guideline for Prevention, Detection, Evaluation, and Management of High Blood Pressure. J Am Coll Cardiol. 2018;71(19):e127-e248.',
  ],
};

const MAGNESIUM_SULFATE: DrugEntry = {
  id: 'magnesium-sulfate',
  name: 'Magnesium Sulfate',
  genericName: 'Magnesium sulfate',
  drugClass: 'Electrolyte / Antiarrhythmic adjunct',
  route: 'IV',
  indications: ['A-Fib / A-Flutter adjunctive rate and rhythm control', 'Torsades de pointes', 'Hypomagnesemia', 'Eclampsia / Pre-eclampsia seizure prophylaxis', 'Hypomagnesemia / Hypokalemia adjunct'],
  dosing: [
    {
      indication: 'A-Fib (adjunctive)',
      regimen: 'Bolus: 2-4 g IV over 15-30 min. For aggressive repletion: continuous infusion per institutional protocol. Target serum level ~3-4 mg/dL for antiarrhythmic effect. Most administered magnesium is renally excreted \u2014 continuous infusion may be needed to replete intracellular stores.',
    },
    {
      indication: 'Torsades de pointes',
      regimen: '1-2 g IV over 5-60 min (faster for unstable patients).',
    },
    {
      indication: 'Hypomagnesemia / Hypokalemia (adjunct)',
      regimen: '2 g IV over 1 hour. Correct hypomagnesemia before potassium repletion \u2014 hypokalemia is refractory until Mg is repleted.',
    },
    {
      indication: 'Eclampsia / Pregnancy SE',
      regimen: 'Loading dose: 4-6 g IV over 15-20 min. Maintenance: 1-2 g/hr continuous infusion. Primary treatment for eclamptic seizures. If seizures persist despite magnesium, add benzodiazepines then standard SE algorithm. Monitor deep tendon reflexes (loss = first sign of toxicity), respiratory rate, urine output. Antidote for Mg toxicity: Calcium gluconate 1 g IV.',
    },
  ],
  contraindications: [
    'Severe renal failure (GFR <30 mL/min or oliguria) for continuous infusion \u2014 use intermittent boluses instead',
    'Hypermagnesemia (>4 mg/dL)',
    'Myasthenia gravis (may worsen weakness)',
  ],
  cautions: [
    'Monitor for hypermagnesemia: loss of deep tendon reflexes (first sign), respiratory depression, cardiac arrest',
    'Check renal function before continuous infusion',
    'Calcium gluconate 1g IV is the antidote for magnesium toxicity',
  ],
  monitoring: 'Serum magnesium levels every 6-8 hours during infusion. Deep tendon reflexes. Respiratory rate. Renal function.',
  notes: 'Excellent safety profile \u2014 one meta-analysis detected no reported adverse events. Blocks slow calcium channels in SA and AV nodes. Even when cardioversion does not occur, magnesium reduces heart rate and augments efficacy of other antiarrhythmics and DC cardioversion. In one RCT, continuous magnesium infusion was superior to amiodarone for new-onset AF. The combination of aggressive magnesium loading plus amiodarone achieved 90% cardioversion rate in critically ill patients.',
  citations: [
    'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.',
    'Moran JL, et al. Parenteral MgSO4 vs Amiodarone for Atrial Tachyarrhythmias. Crit Care Med. 1995;23(11):1816-24.',
    'Bosch NA, et al. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434.',
  ],
};

const MEDROXYPROGESTERONE: DrugEntry = {
  id: 'medroxyprogesterone',
  name: 'Medroxyprogesterone Acetate (MPA)',
  genericName: 'Medroxyprogesterone acetate',
  drugClass: 'Progestin',
  route: 'PO',
  indications: ['Acute abnormal uterine bleeding', 'Endometrial stabilization post-estrogen'],
  dosing: [
    {
      indication: 'AUB — Acute Management',
      regimen: '20 mg PO TID × 7 days. 76% efficacy in stopping acute bleeding. Preferred when estrogen is contraindicated (VTE history, migraine with aura, smoker >35). Especially appropriate for obese/PCOS patients — progesterone withdrawal stabilizes the endometrium.',
    },
    {
      indication: 'Post-IV Estrogen Stabilization',
      regimen: '10 mg PO daily × 10 days. Must follow IV conjugated estrogen to prevent rebound bleeding from unopposed estrogen stimulation of the endometrium.',
    },
  ],
  contraindications: [
    'Active deep vein thrombosis or pulmonary embolism',
    'Active or recent arterial thromboembolic disease',
    'Current or past breast cancer',
    'Impaired liver function or liver disease',
    'Known or suspected pregnancy',
  ],
  cautions: [
    'Breakthrough bleeding common during first cycle of treatment',
    'May cause mood changes, headache, bloating, breast tenderness',
    'Transition to long-term hormonal therapy (LNG-IUD, OCPs) after acute course',
    'For obese/PCOS patients: ongoing hormonal management needed to prevent endometrial hyperplasia',
  ],
  monitoring: 'Bleeding pattern reassessment at GYN follow-up (1-2 weeks). CBC if anemic at discharge.',
  notes: 'Munro 2006 RCT compared MPA 20 mg TID vs OCPs TID for acute AUB: MPA stopped bleeding in 76% vs 88% for OCPs. MPA is preferred over OCPs when estrogen is contraindicated. Mechanism: stabilizes endometrium by providing the progesterone that anovulatory patients lack, then organized withdrawal bleeding occurs after stopping the course.',
  citations: [
    'ACOG Committee Opinion No. 557. Management of Acute AUB in Nonpregnant Reproductive-Aged Women. Obstet Gynecol. 2013;121(4):891-896.',
    'Munro MG, et al. Oral MPA and combination OCPs for acute uterine bleeding: RCT. Obstet Gynecol. 2006;108:924-929.',
  ],
};

const METHYLPREDNISOLONE: DrugEntry = {
  id: 'methylprednisolone',
  name: 'Methylprednisolone (Solu-Medrol)',
  genericName: 'Methylprednisolone sodium succinate',
  drugClass: 'Corticosteroid (glucocorticoid)',
  route: 'IV / PO',
  indications: ['Adrenal crisis (alternative to hydrocortisone)', 'Thyroid crisis (alternative)', 'Anaphylaxis (adjunctive, alternative)', 'Anaphylaxis / angioedema (adjunct)'],
  dosing: [
    {
      indication: 'Adrenal crisis (alternative)',
      regimen: '40 mg IV every 24 hours. Use ONLY when hydrocortisone is unavailable. Minimal mineralocorticoid activity — consider adding fludrocortisone once transitioned to maintenance doses in patients with primary adrenal insufficiency.',
    },
    {
      indication: 'Thyroid crisis (alternative)',
      regimen: '125 mg IV loading dose, then 60 mg IV daily. Alternative when hydrocortisone unavailable. For decompensated hypothyroidism: 40 mg IV as alternative to hydrocortisone.',
    },
    {
      indication: 'Anaphylaxis (adjunctive, alternative)',
      regimen: '60 mg IV × 1 dose. Alternative to dexamethasone. Controversial — no clear evidence of benefit in anaphylaxis. Consider if refractory to epinephrine or asthma overlap. Not needed for discharge.',
    },
    {
      indication: 'Anaphylaxis / angioedema (adjunct)',
      regimen: '125 mg IV. Adjunct to epinephrine and antihistamines for histamine-mediated angioedema/anaphylaxis. NOT effective for bradykinin-mediated angioedema. Delayed onset of action — should never be used as monotherapy. Limited RCT evidence for angioedema specifically, but commonly administered. Weigh benefits against hyperglycemia, hypertension, and infection risk.',
    },
  ],
  contraindications: [
    'Systemic fungal infections (relative — do NOT withhold in adrenal crisis)',
  ],
  cautions: [
    'Minimal mineralocorticoid activity — inferior to hydrocortisone for adrenal crisis where both glucocorticoid and mineralocorticoid replacement are needed',
    'Hyperglycemia',
    'Immunosuppression with prolonged use',
  ],
  monitoring: 'Blood glucose, electrolytes (Na, K), blood pressure, fluid status.',
  notes: 'Second-line alternative for adrenal crisis when hydrocortisone is unavailable. Glucocorticoid potency is ~5× hydrocortisone (4 mg methylprednisolone = 20 mg hydrocortisone), but has minimal mineralocorticoid effect. Preferred over dexamethasone when some mineralocorticoid activity is desired.',
  citations: [
    'Rushworth RL, et al. Adrenal Crisis. N Engl J Med. 2019;381(9):852-861.',
    'Bornstein SR, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency. JCEM. 2016;101(2):364-389.',
  ],
};

const METHYLENE_BLUE: DrugEntry = {
  id: 'methylene-blue',
  name: 'Methylene Blue',
  genericName: 'Methylthioninium chloride',
  drugClass: 'Guanylate cyclase inhibitor / Vasopressor adjunct',
  route: 'IV',
  indications: ['Refractory anaphylaxis (vasodilatory shock)', 'Vasoplegia (post-cardiopulmonary bypass)'],
  dosing: [
    {
      indication: 'Refractory anaphylaxis',
      regimen: '1-2 mg/kg IV over 5-10 minutes. May repeat × 1 in 30-60 minutes if partial response.\n\nInhibits guanylate cyclase → blocks nitric oxide-mediated vasodilation (a key contributor to refractory shock in anaphylaxis).\n\nSupported by case reports and small case series only — no RCTs. Consider when epinephrine infusion, volume resuscitation, and standard adjuncts have failed.',
      weightCalc: [
        { dosePerKg: 1, unit: 'mg', label: 'Standard dose (1 mg/kg)' },
        { dosePerKg: 2, unit: 'mg', label: 'High dose (2 mg/kg)' },
      ],
    },
  ],
  contraindications: [
    'G6PD deficiency (risk of severe hemolytic anemia)',
    'Concurrent serotonergic drugs — SSRIs, SNRIs, MAOIs (serotonin syndrome risk)',
    'Severe renal impairment (relative — renally excreted)',
  ],
  cautions: [
    'Turns urine and skin blue-green — warn patient and staff',
    'Serotonin syndrome risk with any serotonergic medication',
    'May interfere with pulse oximetry readings (falsely low SpO2)',
    'Hypertension possible if vasodilation is overcorrected',
    'Avoid extravasation — causes tissue necrosis',
  ],
  monitoring: 'Blood pressure (hypertension risk), SpO2 (may read falsely low), methemoglobin level, signs of hemolysis in G6PD-unknown patients.',
  notes: 'Methylene blue inhibits guanylate cyclase, blocking the NO → cGMP → vasodilation pathway that contributes to refractory anaphylactic shock. This is the same mechanism exploited in post-cardiopulmonary bypass vasoplegia. Evidence in anaphylaxis is limited to case reports and small series, but the physiologic rationale is strong for refractory vasodilatory shock that is not responding to catecholamines. Preferred over glucagon for refractory anaphylaxis in beta-blocked patients — addresses vasodilation directly rather than attempting to bypass beta-1 blockade.',
  citations: [
    'Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). 2025.',
    'Krishnaswamy G. Critical Care Management of the Patient With Anaphylaxis. Crit Care Med. 2021;49(5):838-857.',
  ],
};

const METHOTREXATE: DrugEntry = {
  id: 'methotrexate',
  name: 'Methotrexate',
  genericName: 'Methotrexate',
  drugClass: 'Antimetabolite / Folic acid antagonist',
  route: 'IM',
  indications: ['Ectopic pregnancy (medical management)'],
  dosing: [
    {
      indication: 'Ectopic pregnancy — single-dose regimen',
      regimen: '50 mg/m² IM single dose. Administered in consultation with OB. Follow-up beta-hCG on day 4 and day 7. If <15% decline between day 4-7, repeat dose. Success rate >90% when beta-hCG <5000 mIU/mL.',
    },
  ],
  contraindications: [
    'Immunodeficiency',
    'Cytopenia (anemia, leukopenia, thrombocytopenia)',
    'Active pulmonary disease',
    'Active peptic ulcer disease',
    'Hepatic dysfunction',
    'Renal dysfunction (creatinine >1.5 mg/dL)',
    'Breastfeeding',
    'Known hypersensitivity',
  ],
  cautions: [
    'Beta-hCG >5000 mIU/mL — OR 5.45 for treatment failure',
    'Fetal cardiac activity present — OR 9.1 for failure',
    'Patient must be reliable for follow-up (serial beta-hCG monitoring)',
    'Avoid NSAIDs, folate supplements during treatment (reduce efficacy)',
    'Avoid alcohol, sun exposure',
  ],
  monitoring: 'Beta-hCG on day 4 and day 7 post-injection. CBC, BMP, LFTs prior to administration. Weekly beta-hCG until undetectable.',
  notes: 'Medical management of stable, unruptured tubal ectopic pregnancy. Single-dose regimen is most common in ED/OB setting. Multi-dose regimens (MTX on days 1, 3, 5, 7 with leucovorin rescue) have higher success rates but more side effects. Patients should avoid conception for 3 months after treatment. Always coordinate with OB — this is not typically initiated independently by the ED.',
  citations: [
    'ACOG Practice Bulletin No. 193; Summary: Tubal Ectopic Pregnancy. Obstet Gynecol. 2018;131(3):613-615.',
    'Menon S, Colins J, Barnhart KT. Establishing a human chorionic gonadotropin cutoff to guide methotrexate treatment of ectopic pregnancy: a systematic review. Fertil Steril. 2007;87(3):481-484.',
    'Barnhart KT, Gosman G, Ashby R, et al. The medical management of ectopic pregnancy: a meta-analysis comparing "single dose" and "multidose" regimens. Obstet Gynecol. 2003;101(4):778-784.',
  ],
};

const METOCLOPRAMIDE: DrugEntry = {
  id: 'metoclopramide',
  name: 'Metoclopramide',
  genericName: 'Metoclopramide hydrochloride',
  drugClass: 'Dopamine antagonist / Prokinetic antiemetic',
  route: 'IV/PO',
  indications: ['Nausea and vomiting of pregnancy (NVP)', 'Hyperemesis gravidarum'],
  dosing: [
    {
      indication: 'NVP / Hyperemesis — IV',
      regimen: '10 mg IV every 8 hours. Reasonable first-line IV antiemetic in pregnancy — no association with fetal malformations.',
    },
    {
      indication: 'NVP — oral',
      regimen: '10 mg PO every 8 hours, 30 minutes before meals. For patients tolerating oral medications who have failed pyridoxine/doxylamine.',
    },
  ],
  contraindications: [
    'GI obstruction, perforation, or hemorrhage',
    'Pheochromocytoma',
    'Seizure disorder (lowers seizure threshold)',
    'Known hypersensitivity',
    'Concurrent use of other dopamine antagonists',
  ],
  cautions: [
    'Extrapyramidal symptoms (dystonia, akathisia) — more common in young women',
    'Tardive dyskinesia with prolonged use (>12 weeks)',
    'Treat acute dystonia with diphenhydramine 50 mg IV',
    'QT prolongation risk — avoid in patients with baseline QT prolongation',
  ],
  monitoring: 'Symptom improvement. Watch for extrapyramidal symptoms (especially acute dystonia).',
  notes: 'Preferred IV antiemetic for pregnancy-related nausea because it has not been associated with fetal malformations, unlike ondansetron which has a possible small risk of fetal cardiac abnormalities. Promotes gastric emptying in addition to central antiemetic effects.',
  citations: [
    'ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.',
    'Pedigo R. First Trimester Pregnancy Emergencies. Emergency Medicine Practice. 2019;21(1):1-28.',
  ],
};

const METRONIDAZOLE: DrugEntry = {
  id: 'metronidazole',
  name: 'Metronidazole (Flagyl)',
  genericName: 'Metronidazole',
  drugClass: 'Nitroimidazole antibiotic / antiprotozoal',
  route: 'PO/IV',
  indications: ['C. difficile infection (alternative)', 'Persistent diarrhea (Giardia coverage)', 'Diarrhea in pregnancy (after first trimester)'],
  dosing: [
    {
      indication: 'C difficile',
      regimen: 'Non-severe: 500 mg PO TID × 10-14 days. Alternative to vancomycin (vancomycin preferred per 2017 IDSA). Fulminant: 500 mg IV q8h (combined with PO/rectal vancomycin).',
    },
    {
      indication: 'Persistent diarrhea',
      regimen: '250 mg PO TID × 7-10 days. Empiric coverage for Giardia in diarrhea lasting 2-4 weeks without systemic symptoms or dysentery.',
    },
    {
      indication: 'Pregnancy',
      regimen: '500 mg PO TID × 10 days. FDA Category B \u2014 use after first trimester when benefits outweigh risks. Coordinate with OB/GYN.',
    },
  ],
  contraindications: [
    'First trimester of pregnancy (relative)',
    'Concurrent alcohol use \u2014 disulfiram-like reaction',
    'Concurrent disulfiram use within past 2 weeks',
    'Known hypersensitivity to nitroimidazoles',
  ],
  cautions: [
    'Disulfiram-like reaction with alcohol \u2014 strictly avoid alcohol during treatment and for 3 days after',
    'Can cause nausea and vomiting \u2014 problematic in GI illness',
    'Increases warfarin, phenytoin, and phenobarbital levels',
    'Peripheral neuropathy with prolonged use',
    'Metallic taste common',
  ],
  monitoring: 'CBC with prolonged use. LFTs if hepatic disease. INR if on warfarin. Monitor for peripheral neuropathy.',
  notes: 'Alternative to vancomycin for non-severe C. difficile infection. First-line empiric therapy for persistent diarrhea (2-4 weeks) targeting Giardia. For fulminant C. difficile, used IV in combination with oral/rectal vancomycin. No longer recommended as sole first-line for C. difficile per 2017 IDSA/SHEA guidelines.',
  citations: [
    'McDonald LC, et al. Clinical Practice Guidelines for Clostridium difficile Infection in Adults and Children: 2017 Update by IDSA and SHEA. Clin Infect Dis. 2018;66(7):987-994.',
    'Burg MD, Hovanessian HC. Diarrhea: Identifying Serious Illness and Providing Relief. Emergency Medicine Practice. 2004;6(7):1-24.',
  ],
};

const METOPROLOL: DrugEntry = {
  id: 'metoprolol',
  name: 'Metoprolol',
  genericName: 'Metoprolol tartrate (IV) / Metoprolol succinate (PO)',
  drugClass: 'Beta-1 selective adrenergic blocker',
  route: 'IV / PO',
  indications: ['A-Fib / A-Flutter rate control', 'Hypertension', 'Heart failure (compensated, oral succinate)', 'Post-MI'],
  dosing: [
    {
      indication: 'A-Fib rate control (acute)',
      regimen: 'IV: 2.5-5 mg IV push over 2 min. Repeat every 5 min as needed, up to 15 mg total (3 doses).',
    },
    {
      indication: 'A-Fib rate control (maintenance)',
      regimen: 'PO tartrate: 25-100 mg BID. PO succinate (Toprol XL): 25-200 mg daily.',
    },
    {
      indication: 'ACS / NSTEMI (anti-ischemic)',
      regimen: 'IV: 5 mg IV push over 2 min, repeat every 5 min × 3 doses (total 15 mg). Hold if HR <60 or SBP <100. PO: 25-50 mg PO q6h starting 15 min after last IV dose. Target HR: <70 bpm. Transition to metoprolol succinate 50-200 mg daily for long-term.',
    },
  ],
  contraindications: [
    'Severe sinus bradycardia (HR <50)',
    'Heart block greater than first degree without pacemaker',
    'Cardiogenic shock',
    'Decompensated heart failure (acute)',
    'WPW with atrial fibrillation',
  ],
  cautions: [
    'Safe in COPD \u2014 multiple studies demonstrate no adverse respiratory effects',
    'Use cautiously in decompensated HF but safe in compensated HFrEF',
    'May mask hypoglycemia symptoms in diabetic patients',
    'Do NOT combine with IV calcium channel blockers',
    'Cocaine/methamphetamine-associated ACS — avoid beta-blockers acutely (may worsen coronary vasospasm due to unopposed alpha stimulation). Use benzodiazepines and nitroglycerin instead.',
    'Intermittent dosing naturally encourages dose-by-dose reassessment \u2014 advantage over continuous infusions in unstable patients',
  ],
  monitoring: 'Heart rate and blood pressure before each IV dose. Hold if SBP <90 or HR <55.',
  notes: 'First-line for A-Fib rate control (Class 1 recommendation). Preferred in patients with CAD or compensated HFrEF. Many critically ill patients develop AF due to increased sympathetic tone \u2014 beta-blockers address the underlying physiological problem. A retrospective ICU study found lower failure rates with metoprolol vs diltiazem.',
  citations: [
    'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.',
    'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
    'Moskowitz A, et al. Management of AF with RVR in the ICU. Shock. 2017;48(4):436-440.',
  ],
};

const METOLAZONE: DrugEntry = {
  id: 'metolazone',
  name: 'Metolazone',
  genericName: 'Metolazone',
  drugClass: 'Thiazide-like diuretic',
  route: 'PO',
  indications: ['Hyperkalemia (nephron bomb — synergistic with loop diuretic)', 'Diuretic resistance in heart failure'],
  dosing: [
    {
      indication: 'Hyperkalemia (nephron bomb)',
      regimen: '5-10 mg PO. Give 30 min before IV loop diuretic for optimal synergy.',
    },
    {
      indication: 'Diuretic resistance',
      regimen: '2.5-10 mg PO daily, given 30 min before loop diuretic.',
    },
  ],
  contraindications: [
    'Anuria',
    'Hepatic coma',
  ],
  cautions: [
    'Oral only — use IV chlorothiazide if enteral route unavailable',
    'Potent synergy with loop diuretics can cause rapid, profound diuresis',
    'Monitor for severe hypokalemia, hyponatremia, hypomagnesemia',
  ],
  monitoring: 'Electrolytes q2-4h during acute use. Urine output. Daily weights.',
  notes: 'Oral alternative to IV chlorothiazide for sequential nephron blockade. Effective even in severe renal impairment (unlike hydrochlorothiazide). Give 30 min before loop diuretic for optimal timing of sequential blockade.',
  citations: [
    'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-51.',
  ],
};

const NACL_TABLETS: DrugEntry = {
  id: 'nacl-tablets',
  name: 'Sodium Chloride Tablets',
  genericName: 'Sodium chloride',
  drugClass: 'Electrolyte supplement',
  route: 'PO',
  indications: ['SIAD (with loop diuretic)'],
  dosing: [
    {
      indication: 'SIAD (with loop diuretic)',
      regimen: '1-3 g PO TID with furosemide 20-40 mg PO daily. Increases solute load to enhance free water excretion. Adjust dose based on Na response.',
    },
  ],
  contraindications: [
    'Uncontrolled hypertension',
    'Hypernatremia',
    'Volume overload (HF, cirrhosis, nephrotic syndrome)',
  ],
  cautions: [
    'May worsen edema in heart failure or cirrhosis',
    'GI irritation — take with food',
    'Monitor blood pressure, especially in hypertensive patients',
    'Less effective than oral urea for SIAD — consider as adjunct',
  ],
  monitoring: 'Serum sodium, blood pressure, volume status, renal function.',
  notes: 'Salt tablets work by increasing solute load delivered to the kidney, which when combined with a loop diuretic, promotes excretion of free water. This is a second-line strategy for SIAD after fluid restriction. Less palatable than oral urea but more widely available. The combination with furosemide generates an electrolyte-free water clearance.',
  citations: [
    'Verbalis JG et al. Hyponatremia: Expert Panel Recommendations. Am J Med. 2013;126(10S1):S1-42.',
  ],
};

const NICARDIPINE: DrugEntry = {
  id: 'nicardipine',
  name: 'Nicardipine (Cardene)',
  genericName: 'Nicardipine hydrochloride',
  drugClass: 'Dihydropyridine calcium channel blocker',
  route: 'IV',
  indications: ['Acute stroke BP management (pre/post thrombolysis)', 'Hypertensive emergency', 'Perioperative hypertension'],
  dosing: [
    {
      indication: 'Pre-thrombolysis BP (target <185/110)',
      regimen: '5 mg/hr IV infusion. Titrate by 2.5 mg/hr every 5\u201315 min. Max 15 mg/hr. Once target achieved, decrease to 3 mg/hr and titrate to maintain.',
    },
    {
      indication: 'Post-thrombolysis BP (target <180/105 \u00D7 24h)',
      regimen: '5 mg/hr IV infusion, titrate by 2.5 mg/hr every 5\u201315 min to maintain BP <180/105. Max 15 mg/hr.',
    },
    {
      indication: 'ICH blood pressure control (target SBP 130\u2013150)',
      regimen: '5 mg/hr IV infusion. Titrate by 2.5 mg/hr every 5\u201315 min. Target SBP 130\u2013150. More widely available and less expensive than clevidipine. Monitor closely \u2014 overshoot hypotension possible. Avoid SBP <130 or drops >70 mmHg in first hour. Max 15 mg/hr.',
    },
    {
      indication: 'SAH blood pressure control (target SBP <160)',
      regimen: '5 mg/hr IV infusion. Titrate by 2.5 mg/hr every 5-15 min. Target SBP <160 mmHg. Max 15 mg/hr. Preferred when beta-blocker contraindicated.',
    },
  ],
  contraindications: [
    'Advanced aortic stenosis',
    'Hypersensitivity to nicardipine or other dihydropyridine CCBs',
  ],
  cautions: [
    'Reflex tachycardia \u2014 may need to combine with beta-blocker',
    'Peripheral phlebitis \u2014 change IV site every 12h or use central line',
    'Hepatic impairment \u2014 reduce dose (extensively hepatically metabolized)',
    'Transition to oral antihypertensive when stable \u2014 onset of oral agent overlaps with nicardipine wean',
  ],
  monitoring: 'Continuous arterial BP monitoring recommended. Heart rate. IV site inspection every 4\u20136h (phlebitis risk).',
  notes: 'Second-line to labetalol for acute stroke BP management. Preferred when beta-blocker contraindicated (asthma, bradycardia, HF). Onset: 5\u201310 min. Does not increase ICP. Arterial-selective vasodilator. More predictable dose-response than labetalol for continuous infusion.',
  citations: [
    'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
    'Liu-Deryke X, et al. Management of Hypertension in Acute Ischemic Stroke. Ann Pharmacother. 2006;40(12):2234-46.',
  ],
};

const NIMODIPINE: DrugEntry = {
  id: 'nimodipine',
  name: 'Nimodipine (Nymalize)',
  genericName: 'Nimodipine',
  drugClass: 'Dihydropyridine calcium channel blocker',
  route: 'PO',
  indications: ['SAH vasospasm prevention'],
  dosing: [
    {
      indication: 'SAH vasospasm prevention',
      regimen: '60 mg PO every 4 hours × 21 days. If unable to swallow, crush and administer via nasogastric tube. No evidence for IV administration. Give to hemodynamically stable patients. Hold for hypotension (SBP <90).',
    },
  ],
  contraindications: ['Hypotension (SBP <90)', 'Severe hepatic impairment', 'Strong CYP3A4 inhibitors'],
  cautions: ['Monitor blood pressure closely — can cause hypotension', 'Administer at least 1 hour before or 2 hours after meals', 'Do NOT administer IV — severe hypotension and cardiac arrest reported with inadvertent IV administration of oral capsules', 'Hepatic impairment — reduce dose or increase interval'],
  monitoring: 'Blood pressure every 1-2 hours during initiation. Watch for hypotension, especially when combined with other antihypertensives.',
  notes: 'Only calcium channel blocker proven to improve outcomes after SAH. Cochrane review (16 trials): RR 0.67 for secondary ischemia. Does not directly prevent vasospasm but reduces ischemic injury. Landmark British Aneurysm Nimodipine Trial (554 patients) established the 60 mg q4h regimen.',
  citations: ['Pickard JD, et al. Effect of oral nimodipine on cerebral infarction and outcome after subarachnoid haemorrhage. BMJ. 1989;298(6674):636-642.', 'Dorhout Mees SM, et al. Calcium antagonists for aneurysmal subarachnoid haemorrhage. Cochrane Database Syst Rev. 2007(3):CD000277.'],
};

const NITROFURANTOIN: DrugEntry = {
  id: 'nitrofurantoin',
  name: 'Nitrofurantoin',
  genericName: 'Nitrofurantoin monohydrate/macrocrystals',
  drugClass: 'Nitrofuran antibiotic',
  route: 'PO',
  indications: ['UTI in pregnancy', 'Asymptomatic bacteriuria in pregnancy', 'Uncomplicated cystitis'],
  dosing: [
    {
      indication: 'UTI / Asymptomatic bacteriuria in pregnancy',
      regimen: '100 mg (macrobid) PO BID × 7 days. ACOG: appropriate in first trimester only "when no other suitable alternative antibiotics are available." Safe in second and third trimesters.',
    },
    {
      indication: 'Uncomplicated cystitis (non-pregnant)',
      regimen: '100 mg (macrobid) PO BID × 5 days.',
    },
  ],
  contraindications: [
    'CrCl <30 mL/min (inadequate urinary concentration)',
    'G6PD deficiency (hemolytic anemia risk)',
    'Term pregnancy (38-42 weeks) — risk of neonatal hemolytic anemia',
    'Known hypersensitivity',
  ],
  cautions: [
    'First trimester use: ACOG advises only when no suitable alternatives available',
    'Pulmonary toxicity (rare, with chronic use)',
    'Peripheral neuropathy (rare)',
    'GI upset — take with food',
    'Colors urine brown/rust — warn patient',
  ],
  monitoring: 'Urine culture to confirm eradication. Watch for pulmonary symptoms with prolonged use.',
  notes: 'Concentrated in urine — effective for lower UTI but NOT for pyelonephritis (does not achieve adequate serum/tissue levels). ACOG 2017 review found the association between nitrofurantoin and birth defects is uncertain, but recommends caution in the first trimester as a precaution. Safe and effective in second/third trimesters. Good option when local E. coli resistance to amoxicillin/ampicillin is high.',
  citations: [
    'ACOG Committee Opinion No. 717: Sulfonamides, Nitrofurantoin, and Risk of Birth Defects. Obstet Gynecol. 2017;130(3):e150-e152.',
    'Kazemier BM, et al. Maternal and neonatal consequences of treated and untreated asymptomatic bacteriuria in pregnancy. Lancet Infect Dis. 2015;15(11):1324-1333.',
  ],
};

const NITROGLYCERIN: DrugEntry = {
  id: 'nitroglycerin',
  name: 'Nitroglycerin',
  genericName: 'Nitroglycerin (glyceryl trinitrate)',
  drugClass: 'Organic nitrate (vasodilator)',
  route: 'SL / IV',
  indications: ['Acute coronary syndrome', 'Angina pectoris', 'Acute pulmonary edema', 'Hypertensive emergency', 'Tocolysis (uterine relaxation)'],
  dosing: [
    {
      indication: 'ACS / NSTEMI (initial)',
      regimen: 'SL: 0.4 mg (1 tablet or spray) every 5 min × 3 doses. IV: Start 5-10 mcg/min, titrate by 5-10 mcg/min every 3-5 min. Target: symptom relief and SBP >100. Max typically 200 mcg/min.',
    },
    {
      indication: 'Tocolysis (Shoulder Dystocia / Zavanelli)',
      regimen: 'SL: 0.4 mg (1 spray or tablet) × 1 dose. Provides rapid uterine relaxation to facilitate cephalic replacement (Zavanelli maneuver) prior to emergency cesarean section. Onset: 1-2 minutes SL. Alternative to terbutaline SQ.',
    },
  ],
  contraindications: [
    'Systolic BP <90 mmHg or ≥30 mmHg below baseline',
    'Right ventricular infarction (preload-dependent)',
    'Phosphodiesterase-5 inhibitor use within 24h (sildenafil/vardenafil) or 48h (tadalafil)',
    'Severe aortic stenosis',
    'Hypertrophic obstructive cardiomyopathy',
  ],
  cautions: [
    'Hypotension — especially with concurrent antihypertensives, volume depletion, or RV involvement',
    'Reflex tachycardia — may worsen ischemia; consider concurrent beta-blocker',
    'Headache — most common side effect (vasodilation)',
    'Tolerance develops with continuous IV infusion >24-48h',
    'Must use non-PVC IV tubing — nitroglycerin adsorbs to standard PVC',
  ],
  monitoring: 'Continuous BP monitoring during IV infusion. Heart rate. Symptom response. 12-lead ECG for ST-segment changes.',
  notes: 'Nitroglycerin provides symptomatic relief in ACS through coronary vasodilation, preload reduction, and afterload reduction. No proven mortality benefit in ACS (ISIS-4, GISSI-3), but effective for symptom management. Always rule out RV infarction (right-sided ECG, V4R) before administration — nitrates can cause catastrophic hypotension in RV failure. SL nitroglycerin that relieves chest pain does NOT differentiate cardiac from non-cardiac causes.',
  citations: [
    'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.',
    'Thadani U. Nitrate Therapy and Nitrate Tolerance in Patients with Coronary Artery Disease. Curr Pharm Des. 2014;20(25):3966-79.',
  ],
};

const ONDANSETRON: DrugEntry = {
  id: 'ondansetron',
  name: 'Ondansetron (Zofran)',
  genericName: 'Ondansetron hydrochloride',
  drugClass: '5-HT3 receptor antagonist / Antiemetic',
  route: 'IV/PO (ODT)',
  indications: ['Nausea and vomiting of pregnancy (NVP)', 'Hyperemesis gravidarum', 'Postoperative nausea/vomiting', 'Acute diarrhea with nausea/vomiting', 'Pediatric gastroenteritis (facilitates oral rehydration)'],
  dosing: [
    {
      indication: 'NVP / Hyperemesis — IV',
      regimen: '4-8 mg IV over 15 min every 12 hours. Effective for all severities. Reserve as second-line IV agent — exhaust metoclopramide first given possible small risk of fetal cardiac abnormalities.',
    },
    {
      indication: 'NVP — oral',
      regimen: '4-8 mg PO every 8-12 hours as needed. Consider only after pyridoxine/doxylamine and other agents have been tried.',
    },
    {
      indication: 'Acute diarrhea',
      regimen: '4 mg IV or 4 mg ODT (orally disintegrating tablet) every 4-6 hours PRN. Max 16 mg per day.',
    },
    {
      indication: 'Pediatric diarrhea',
      regimen: '0.15 mg/kg IV or ODT. Max 4 mg/dose. Single dose often sufficient to facilitate oral rehydration.',
      weightCalc: { dosePerKg: 0.15, unit: 'mg', maxDose: 4 },
    },
  ],
  contraindications: [
    'Known hypersensitivity',
    'Congenital long QT syndrome',
    'Concurrent use of apomorphine',
  ],
  cautions: [
    'Possible small increased risk of fetal cardiac abnormalities (cleft palate, cardiac septal defects) — 2016 systematic review',
    'QT prolongation — avoid in patients with baseline prolongation or electrolyte abnormalities',
    'Serotonin syndrome risk when combined with serotonergic agents',
    'May mask progressive ileus — monitor for abdominal distension',
    'Use lowest effective dose in hepatic impairment (max 8 mg/day)',
    'Constipation (common side effect)',
    'Headache',
  ],
  monitoring: 'Symptom improvement. ECG if concurrent QT-prolonging medications or QT prolongation risk factors. Consider baseline ECG in patients with cardiac history.',
  notes: 'Highly effective antiemetic but ACOG recommends exhausting other options first in pregnancy due to a possible small risk of fetal cardiac abnormalities. Key role in pediatric gastroenteritis: a single dose significantly reduces vomiting and facilitates oral rehydration, decreasing the need for IV fluids and hospital admission. In adults with diarrheal illness, useful when vomiting prevents adequate oral fluid intake.',
  citations: [
    'ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.',
    'Danielsson B, Noor AH, Hoog A, et al. Association of ondansetron use in early pregnancy with congenital malformations. JAMA. 2018;320(23):2429-2437.',
    'Freedman SB, et al. Oral Ondansetron for Gastroenteritis in a Pediatric Emergency Department. N Engl J Med. 2006;354(16):1698-1705.',
    'Burg MD, Hovanessian HC. Diarrhea: Identifying Serious Illness and Providing Relief. Emergency Medicine Practice. 2004;6(7):1-24.',
  ],
};

const OXYTOCIN: DrugEntry = {
  id: 'oxytocin',
  name: 'Oxytocin (Pitocin)',
  genericName: 'Oxytocin',
  drugClass: 'Uterotonic',
  route: 'IV infusion',
  indications: ['Precipitous Delivery — Third Stage (PPH prevention)', 'Postpartum hemorrhage', 'Labor augmentation'],
  dosing: [
    {
      indication: 'Precipitous Delivery — Third Stage',
      regimen: '20 units in 1L NS (or LR). Infuse at 250 mL/hr. Max 40 units over 4–10 hrs. Start after placental delivery. Do NOT give IV push — can cause profound hypotension.',
    },
  ],
  contraindications: [
    'Hypersensitivity to oxytocin',
  ],
  cautions: [
    'Water intoxication with prolonged high-dose infusion (antidiuretic effect)',
    'Uterine hyperstimulation — can cause fetal distress if given before delivery',
    'Do NOT give IV push — risk of severe hypotension, tachycardia, and cardiac arrhythmia',
  ],
  monitoring: 'Uterine tone, vaginal bleeding, vital signs, fluid balance. If prolonged infusion: monitor for signs of water intoxication (hyponatremia, confusion, seizures).',
  notes: 'First-line uterotonic for PPH prevention and treatment. Uterine atony is the most common cause of postpartum hemorrhage. Empiric use after placental delivery is recommended — do not wait for signs of bleeding. Combine with bimanual uterine massage until uterus is firm.',
  citations: [
    'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186.',
  ],
};

const ORAL_UREA: DrugEntry = {
  id: 'oral-urea',
  name: 'Oral Urea (Ure-Na)',
  genericName: 'Urea',
  drugClass: 'Osmotic agent',
  route: 'PO',
  indications: ['SIAD', 'Beer potomania / low solute intake'],
  dosing: [
    {
      indication: 'SIAD',
      regimen: '15-60 g PO daily. Start 15-30 g daily, titrate to Na response. Mix with sweet or flavored liquid to mask extremely bitter taste (orange juice, cola, chocolate syrup).',
    },
    {
      indication: 'Beer potomania / low solute intake',
      regimen: '15-30 g PO daily. Increases solute load to promote free water excretion. Continue until dietary solute intake improves.',
    },
  ],
  contraindications: [
    'Severe hepatic insufficiency (risk of hyperammonemia)',
    'GI obstruction',
  ],
  cautions: [
    'Extremely bitter taste — major compliance barrier. Mix with flavored liquid.',
    'GI upset (nausea, diarrhea) common at higher doses',
    'Not widely available in all hospital formularies — may need pharmacy compounding',
    'Monitor BUN — will rise as expected with urea therapy',
  ],
  monitoring: 'Serum sodium, BUN, renal function, GI tolerance.',
  notes: 'Oral urea is increasingly recognized as an effective and safe treatment for SIAD. It works by increasing renal solute excretion, which obligates free water excretion regardless of ADH levels. Unlike vaptans, urea produces predictable, gradual Na correction without overcorrection risk. The IBCC recommends it as a first-line pharmacologic option for SIAD. Available as Ure-Na (commercial preparation) or pharmacy-compounded powder.',
  citations: [
    'Decaux G et al. Treatment of Euvolemic Hyponatremia by Urea. Crit Care. 2010;14(5):R184.',
    'Adrogué HJ, Madias NE. Syndrome of Inappropriate Antidiuresis. NEJM. 2023;389(16):1499-1509.',
  ],
};

const PENICILLIN_G_IV: DrugEntry = {
  id: 'penicillin-g-iv',
  name: 'Penicillin G (Aqueous Crystalline)',
  genericName: 'Aqueous crystalline penicillin G',
  drugClass: 'Natural penicillin (IV formulation)',
  route: 'IV',
  indications: ['Neurosyphilis', 'Ocular syphilis', 'Otosyphilis'],
  dosing: [
    {
      indication: 'Neurosyphilis / Ocular / Otic syphilis',
      regimen: '18\u201324 million units/day IV, given as 3\u20134 million units IV q4h \u00D7 10\u201314 days. Achieves treponemicidal levels in CSF.',
    },
  ],
  contraindications: [
    'Penicillin allergy (IgE-mediated / anaphylaxis) \u2014 consider desensitization if no alternative',
  ],
  cautions: [
    'Jarisch-Herxheimer reaction \u2014 more common with higher organism burden',
    'Requires IV access and inpatient admission for duration of therapy',
  ],
  monitoring: 'CSF re-examination at 6 months. If CSF cell count not normalized, consider re-treatment. Quantitative RPR at 6, 12, 24 months.',
  citations: [
    'CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.',
    'Ropper AH. Neurosyphilis. N Engl J Med. 2019;381(14):1358-1363.',
  ],
};

const PRASUGREL: DrugEntry = {
  id: 'prasugrel',
  name: 'Prasugrel (Effient)',
  genericName: 'Prasugrel hydrochloride',
  drugClass: 'Antiplatelet (irreversible P2Y12 antagonist)',
  route: 'PO',
  indications: ['ACS undergoing PCI (high ischemic risk)', 'NSTEMI/UA managed with PCI'],
  dosing: [
    {
      indication: 'ACS / NSTEMI post-PCI',
      regimen: '60 mg loading dose at time of PCI, then 10 mg PO daily × 12 months. Aspirin 81 mg daily concurrent (do not exceed 100 mg/day). For patients <60 kg: consider 5 mg daily maintenance.',
    },
  ],
  contraindications: [
    'Prior stroke or TIA — absolute contraindication (net clinical harm in TRITON-TIMI 38)',
    'Active pathological bleeding',
    'Hypersensitivity to prasugrel',
  ],
  cautions: [
    'Age ≥75 years — generally not recommended due to increased bleeding risk (no net clinical benefit in TRITON-TIMI 38 subgroup)',
    'Body weight <60 kg — consider 5 mg daily maintenance dose',
    'CABG-related bleeding — hold 7 days before elective CABG (longer offset than ticagrelor)',
    'More potent and less variable platelet inhibition than clopidogrel — advantage in high ischemic risk but higher bleeding',
    'Not dependent on CYP2C19 metabolism — no genotype interaction (advantage over clopidogrel)',
  ],
  monitoring: 'No routine monitoring required. Monitor for signs of bleeding. Hemoglobin/hematocrit if bleeding suspected.',
  notes: 'TRITON-TIMI 38 trial: prasugrel reduced cardiovascular death/MI/stroke by 19% vs clopidogrel in ACS patients undergoing PCI (NNT 46), but increased major bleeding (NNH 167). NET CLINICAL HARM in patients with prior stroke/TIA — this is an absolute contraindication. Reserved for high ischemic risk patients (e.g., diabetics, stent thrombosis history) undergoing PCI when ticagrelor is not appropriate.',
  citations: [
    'Wiviott SD, et al. Prasugrel versus Clopidogrel in Patients with Acute Coronary Syndromes (TRITON-TIMI 38). N Engl J Med. 2007;357(20):2001-2015.',
    'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.',
  ],
};

const PREDNISOLONE: DrugEntry = {
  id: 'prednisolone',
  name: 'Prednisolone',
  genericName: 'Prednisolone',
  drugClass: 'Corticosteroid (glucocorticoid)',
  route: 'PO',
  indications: ['Croup (alternative to dexamethasone)', 'Asthma exacerbation', 'Inflammatory conditions', 'Adrenal maintenance (alternative)'],
  dosing: [
    {
      indication: 'Croup',
      regimen: '1 mg/kg PO as a single dose (max 60 mg). Non-inferior to dexamethasone 0.6 mg/kg in a 1,252-patient RCT.',
      weightCalc: { dosePerKg: 1, unit: 'mg', maxDose: 60 },
    },
    {
      indication: 'Asthma exacerbation',
      regimen: '1-2 mg/kg/day PO (max 60 mg) for 3-5 days.',
      weightCalc: { dosePerKg: 2, unit: 'mg', maxDose: 60 },
    },
    {
      indication: 'Adrenal maintenance (alternative)',
      regimen: '3-5 mg PO once daily. Alternative to hydrocortisone for adrenal insufficiency maintenance. Advantage: once-daily dosing improves adherence. Available as liquid formulation for children. No mineralocorticoid activity — must add fludrocortisone for primary AI.',
    },
  ],
  contraindications: [
    'Systemic fungal infections',
    'Known hypersensitivity',
  ],
  cautions: [
    'Shorter half-life than dexamethasone (~12-36 hours vs ~36 hours) — may need additional doses for prolonged symptoms',
    'Available as liquid formulation — easier for young children who cannot swallow tablets',
    'Bitter taste — may cause vomiting in some children',
  ],
  monitoring: 'Clinical response. For croup: reassess severity 2-3 hours after dose.',
  notes: 'Non-inferior alternative to dexamethasone for croup based on Parker et al. (2019) — 1,252 children randomized to prednisolone 1 mg/kg vs dexamethasone 0.6 mg/kg showed equivalent outcomes for symptom relief and 7-day return visits. Advantage: widely available as liquid formulation. Disadvantage: shorter half-life means symptoms may recur, and bitter taste may cause vomiting.',
  citations: [
    'Parker CM, Cooper MN. Prednisolone Versus Dexamethasone for Croup: A Randomized Controlled Trial. Pediatrics. 2019;144(3):e20183772.',
    'Aregbesola A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955.',
  ],
};

const PROCAINAMIDE: DrugEntry = {
  id: 'procainamide',
  name: 'Procainamide',
  genericName: 'Procainamide hydrochloride',
  drugClass: 'Class IA antiarrhythmic (sodium channel blocker)',
  route: 'IV',
  indications: ['WPW with atrial fibrillation', 'Wide-complex tachycardia of uncertain origin', 'Atrial fibrillation (pharmacologic cardioversion \u2014 second-tier)'],
  dosing: [
    {
      indication: 'WPW + A-Fib / Wide-complex tachycardia',
      regimen: 'Loading: 20-50 mg/min IV infusion until arrhythmia suppressed, hypotension occurs, QRS widens >50%, or max dose 17 mg/kg reached. Maintenance: 1-4 mg/min IV infusion.',
    },
  ],
  contraindications: [
    'QT prolongation (QTc >500 ms)',
    'Torsades de pointes',
    'Complete heart block without pacemaker',
    'Systemic lupus erythematosus (drug may exacerbate)',
  ],
  cautions: [
    'Hypotension with rapid infusion \u2014 administer slowly',
    'QRS and QT prolongation \u2014 stop if QRS widens >50% from baseline',
    'Drug-induced lupus with chronic use',
    'Reduce dose in renal impairment (active metabolite NAPA is renally cleared)',
    'Monitor QTc continuously during loading',
  ],
  monitoring: 'Continuous ECG monitoring during loading. Blood pressure every 5 min. QRS width and QT interval. NAPA levels if chronic use.',
  notes: 'Key role in WPW + A-Fib where AV nodal blockers (beta-blockers, CCBs, digoxin, IV amiodarone) are contraindicated. Slows conduction through the accessory pathway. Also useful for wide-complex tachycardia of uncertain origin. Second-tier recommendation for pharmacologic cardioversion of AF per 2025 AHA guidelines.',
  citations: [
    'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
    'Panchal AR, et al. 2020 AHA Guidelines: Adult BLS and ALS. Circulation. 2020;142(16_suppl_2):S366-S468.',
  ],
};

const PROCAINE_PENICILLIN: DrugEntry = {
  id: 'procaine-penicillin',
  name: 'Procaine Penicillin G + Probenecid',
  genericName: 'Procaine penicillin G with probenecid',
  drugClass: 'Natural penicillin (IM depot) + renal tubular secretion inhibitor',
  route: 'IM + PO',
  indications: ['Neurosyphilis (alternative to IV penicillin G)'],
  dosing: [
    {
      indication: 'Neurosyphilis',
      regimen: 'Procaine penicillin G 2.4 million units IM daily + probenecid 500 mg PO QID, both \u00D7 10\u201314 days.',
    },
  ],
  contraindications: [
    'Penicillin allergy',
    'Procaine allergy (rare)',
  ],
  cautions: [
    'Probenecid: avoid in renal stones, acute gout flare',
    'Requires daily IM injections \u2014 patient tolerance/compliance',
  ],
  notes: 'Equivalent outcomes to IV penicillin G for neurosyphilis (Dunaway et al., CID 2020). Allows outpatient treatment.',
  citations: [
    'CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.',
    'Dunaway SB, et al. Procaine Penicillin G vs Aqueous Crystalline Penicillin G for Neurosyphilis. Clin Infect Dis. 2020.',
  ],
};

const POTASSIUM_CHLORIDE_IV: DrugEntry = {
  id: 'potassium-chloride-iv',
  name: 'Potassium Chloride (IV)',
  genericName: 'Potassium chloride',
  drugClass: 'Electrolyte supplement',
  route: 'IV',
  indications: ['Severe hypokalemia (K+ ≤2.5 mEq/L)', 'Hypokalemia with arrhythmia or paralysis'],
  dosing: [
    {
      indication: 'Severe hypokalemia (life-threatening)',
      regimen: '5-10 mEq IV over 15-30 minutes with continuous cardiac monitoring. Repeat until K+ >3 mEq/L and hemodynamically stable.',
    },
    {
      indication: 'Subsequent replacement',
      regimen: '20-40 mEq IV. Rate: max 10 mEq/hr via peripheral IV (max concentration 10 mEq/100 mL), max 20 mEq/hr via central line with cardiac monitoring.',
    },
  ],
  contraindications: [
    'Hyperkalemia',
    'Severe renal failure with anuria (unable to excrete K+)',
    'Untreated Addison disease',
  ],
  cautions: [
    'Rates >10 mEq/hr require central venous access + continuous cardiac monitoring',
    'Use GLUCOSE-FREE IV fluids as carrier (glucose stimulates insulin → worsens intracellular K+ shift)',
    'Always check and correct magnesium first (hypoMg makes K repletion refractory)',
    'Risk of phlebitis at peripheral sites with concentrated solutions',
  ],
  monitoring: 'Continuous cardiac monitoring during infusion. Recheck K+ every 2-4 hours. Monitor Mg concurrently. Fingerstick glucose if also receiving insulin.',
  notes: 'IV KCl is ONLY for severe hypokalemia or patients who cannot take oral. Oral KCl is safer (lower rebound hyperkalemia risk). Serum K+ decreases ~0.3 mEq/L per 100 mEq total body deficit, but this relationship is highly variable. KCl is the preferred salt (corrects concurrent chloride deficiency from most common causes).',
  citations: [
    'Kim MJ, et al. Potassium Disorders: Hypokalemia and Hyperkalemia. Am Fam Physician. 2023;107(1):59-70.',
    'Gennari FJ. Hypokalemia. N Engl J Med. 1998;339(7):451-8.',
  ],
};

const POTASSIUM_CHLORIDE_ORAL: DrugEntry = {
  id: 'potassium-chloride-oral',
  name: 'Potassium Chloride (Oral)',
  genericName: 'Potassium chloride',
  drugClass: 'Electrolyte supplement',
  route: 'PO',
  indications: ['Mild-moderate hypokalemia (K+ 2.5-3.5 mEq/L)', 'Chronic potassium replacement', 'Hypokalemic periodic paralysis (acute attack — immediate-release only)'],
  dosing: [
    {
      indication: 'Acute replacement',
      regimen: '20-40 mEq PO. Each 20 mEq raises serum K+ ~0.2 mEq/L. Recheck in 2-4 hours.',
    },
    {
      indication: 'Chronic replacement',
      regimen: '50-75 mEq PO daily in divided doses (raises serum K+ ~0.14 mEq/L with enhanced effect when combined with ACEi/ARB).',
    },
    {
      indication: 'Periodic paralysis (acute attack)',
      regimen: '1 mEq/kg (~60 mEq for 60 kg patient) IMMEDIATE-RELEASE or liquid only. Then 0.3 mEq/kg q30min if no improvement. AVOID slow-release — too slow and unpredictable. HIGH rebound hyperkalemia risk.',
    },
  ],
  contraindications: [
    'Hyperkalemia',
    'GI obstruction or stricture (for solid dosage forms)',
    'Severe renal impairment with oliguria',
  ],
  cautions: [
    'GI irritation — take with food and full glass of water',
    'Dietary potassium alone is INSUFFICIENT for replacement (food K+ is coupled with phosphate, not chloride)',
    'For periodic paralysis: use immediate-release/liquid ONLY, monitor K+ q30 min, watch for rebound hyperkalemia',
  ],
  monitoring: 'Recheck serum K+ 2-4 hours after acute dose. Check Mg (hypoMg causes refractory hypoK). BMP for chronic replacement.',
  notes: 'Potassium chloride is the PREFERRED salt for most causes of hypokalemia (corrects concurrent metabolic alkalosis and chloride depletion). Potassium bicarbonate may be preferred in RTA with metabolic acidosis. Potassium phosphate for refeeding syndrome. Safer than IV route due to gradual absorption.',
  citations: [
    'Kim MJ, et al. Potassium Disorders: Hypokalemia and Hyperkalemia. Am Fam Physician. 2023;107(1):59-70.',
    'Gennari FJ. Hypokalemia. N Engl J Med. 1998;339(7):451-8.',
    'Statland JM, et al. Review of the Diagnosis and Treatment of Periodic Paralysis. Muscle Nerve. 2018;57(4):522-530.',
  ],
};

const PHENYLEPHRINE: DrugEntry = {
  id: 'phenylephrine',
  name: 'Phenylephrine (Intracavernosal)',
  genericName: 'Phenylephrine',
  drugClass: 'Selective alpha-1 adrenergic agonist',
  route: 'Intracavernosal',
  indications: ['Ischemic priapism (first-line)', 'Post-ICI prolonged erection'],
  dosing: [
    {
      indication: 'Ischemic priapism',
      regimen: '200 mcg (2 mL of 100 mcg/mL solution) intracavernosal every 5 minutes, up to 5 doses total (1 mg max). Corpora cavernosa communicate freely \u2014 inject one side only. Mix: 1 mL phenylephrine from vial (10 mg/mL) into 100 mL NS = 100 mcg/mL.',
    },
    {
      indication: 'Pediatric / Sickle cell',
      regimen: '100 mcg (1 mL of 100 mcg/mL) per injection. Lower dose recommended.',
    },
  ],
  contraindications: [
    'Uncontrolled hypertension',
    'MAO inhibitor use',
  ],
  cautions: [
    'Monitor BP and HR every 5 min between injections',
    'Hold if SBP > 160 or HR > 110',
    'Pure alpha-1 agonist \u2014 no intrinsic inotropy, no heart rate increase',
  ],
  monitoring: 'BP/HR every 5 min during injections. Observe 60 min post-detumescence.',
  notes: 'First-line sympathomimetic for ischemic priapism (AUA/SMSNA 2022). Alpha-1 selective = lower cardiovascular risk than epinephrine. 74% success alone, 70\u2013100% combined with aspiration. Onset: 1 min. Duration: 10\u201320 min.\n\nMIXING INSTRUCTIONS (100 mcg/mL):\n1. Take a 3 mL syringe, draw up 1 mL of phenylephrine from the vial (vial contains 10 mg/mL)\n2. Inject this 1 mL into a 100 mL bag of normal saline\n3. Now you have 100 mL of phenylephrine at 100 mcg/mL\n4. Draw up into a syringe \u2014 each 1 mL = 100 mcg\n5. Each dose = 2 mL (200 mcg)',
  image: {
    src: 'images/priapism/mixing-instructions.png',
    alt: 'Mixing instructions for phenylephrine (100 mcg/mL) showing vials, syringes, and labeled concentrations',
    caption: 'Mixing instructions for intracavernosal phenylephrine. (Source: EMCrit Podcast / EM:RAP)',
  },
  citations: [
    'Bivalacqua TJ, et al. AUA/SMSNA Guideline on Priapism. J Urol. 2022;208(1):43-52.',
    'Martin C, Cocchio C. Phenylephrine vs Terbutaline for Ischemic Priapism. Am J Emerg Med. 2016;34(2):222-4.',
    'Graham BA, et al. Emergency Pharmacotherapy for Priapism. Expert Opin Pharmacother. 2022;23(12):1371-80.',
  ],
};

const RITONAVIR: DrugEntry = {
  id: 'ritonavir',
  name: 'Ritonavir (Norvir)',
  genericName: 'Ritonavir',
  drugClass: 'Protease inhibitor (pharmacokinetic booster)',
  route: 'PO',
  indications: ['Pharmacokinetic booster for darunavir (PEP alternative)', 'Pharmacokinetic booster for other PIs'],
  dosing: [
    {
      indication: 'PK booster for darunavir (PEP)',
      regimen: '100 mg PO once daily x 28 days. Always co-administer with darunavir 800 mg. Take with food.',
    },
  ],
  contraindications: [
    'Co-administration with alfuzosin, amiodarone, flecainide, ergot derivatives, lovastatin, simvastatin, pimozide, sildenafil (for PAH), oral midazolam/triazolam',
  ],
  cautions: [
    'Potent CYP3A4 inhibitor \u2014 extensive drug interactions; review full medication list',
    'GI side effects (nausea, diarrhea, dysgeusia) \u2014 common at boosting doses',
    'Hepatotoxicity \u2014 monitor LFTs in hepatic impairment',
    'Lipid elevations with prolonged use',
  ],
  monitoring: 'LFTs at baseline. Review drug interaction list before prescribing.',
  notes: 'Used at sub-therapeutic dose (100 mg) solely as a pharmacokinetic booster to increase darunavir levels via CYP3A4 inhibition. Not used as a standalone antiretroviral at this dose.',
  citations: [
    'Gandhi RT, et al. Antiretroviral Drugs for Treatment and Prevention of HIV. JAMA. 2023;329(1):63-84.',
  ],
};

const RABIES_IMMUNE_GLOBULIN: DrugEntry = {
  id: 'rabies-rig',
  name: 'Rabies Immune Globulin (HRIG)',
  genericName: 'Human Rabies Immune Globulin',
  drugClass: 'Passive immunization (hyperimmune globulin)',
  route: 'Infiltration + IM',
  indications: ['Rabies post-exposure prophylaxis (Category III exposure)'],
  dosing: [
    {
      indication: 'Rabies PEP — unvaccinated (Category II or III)',
      regimen: '20 IU/kg body weight. Infiltrate as much as anatomically feasible into and around wound(s). Inject any remaining volume IM at a site distant from vaccine injection. Give with first vaccine dose ONLY. Do NOT administer after day 7 of vaccine series. Do NOT exceed 20 IU/kg — excess may suppress active antibody response.',
      weightCalc: { dosePerKg: 20, unit: 'IU' },
    },
    {
      indication: 'Rabies PEP — immunocompromised (even if previously vaccinated)',
      regimen: '20 IU/kg body weight. Same infiltration protocol as above. Give even if patient has prior rabies vaccination history — immunocompromised patients may not mount adequate anamnestic response.',
      weightCalc: { dosePerKg: 20, unit: 'IU' },
    },
  ],
  contraindications: [
    'Do NOT give to previously vaccinated, immunocompetent patients — may blunt anamnestic response',
    'Do NOT give after day 7 post first vaccine dose — interferes with developing active immunity',
  ],
  cautions: [
    'Total volume can be large in heavier patients (70 kg = 1,400 IU ≈ 9.3 mL at 150 IU/mL)',
    'If wound site is small (finger/toe), inject remainder IM at distant site (e.g., gluteal)',
    'Never administer in same syringe or anatomic site as vaccine',
    'Equine RIG (eRIG 40 IU/kg) is an alternative when HRIG unavailable — higher adverse reaction rate (0.8-6%)',
  ],
  monitoring: 'Monitor for anaphylaxis during and 30 minutes after administration. Have epinephrine available.',
  notes: 'Available as HyperRAB (300 IU/mL) or Imogam Rabies-HT (150 IU/mL). Provides immediate passive antibodies while vaccine stimulates active immunity over 7-14 days. May dilute with normal saline for adequate wound infiltration volume (do not dilute HyperRAB with D5W).',
  citations: [
    'Manning SE, et al. Human Rabies Prevention — ACIP, 2008. MMWR Recomm Rep. 2008;57(RR-3):1-28.',
    'Hwang GS, et al. Adherence to Guideline Recommendations for HRIG in Rabies PEP. Hum Vaccin Immunother. 2020;16(1):51-60.',
  ],
};

const RABIES_VACCINE: DrugEntry = {
  id: 'rabies-vaccine',
  name: 'Rabies Vaccine (HDCV / PCECV)',
  genericName: 'Rabies Vaccine — Human Diploid Cell (Imovax) or Purified Chick Embryo Cell (RabAvert)',
  drugClass: 'Vaccine (inactivated viral)',
  route: 'IM',
  indications: ['Rabies post-exposure prophylaxis', 'Rabies pre-exposure prophylaxis'],
  dosing: [
    {
      indication: 'Rabies PEP — unvaccinated, immunocompetent',
      regimen: '1.0 mL IM on days 0, 3, 7, and 14 (4-dose series). Adults: deltoid only. Children: deltoid or anterolateral thigh. NEVER administer in gluteal area — documented poor immunogenicity.',
    },
    {
      indication: 'Rabies PEP — immunocompromised',
      regimen: '1.0 mL IM on days 0, 3, 7, 14, and 28 (5-dose series). Check rabies virus neutralizing antibody (RVNA) titer 7-14 days after last dose. Adequate response: ≥0.5 IU/mL. If inadequate, give additional dose and recheck.',
    },
    {
      indication: 'Rabies PEP — previously vaccinated, immunocompetent',
      regimen: '1.0 mL IM on days 0 and 3 only (2-dose series). No RIG needed. Applies to patients with prior complete PEP series, pre-exposure prophylaxis, or documented adequate antibody titer.',
    },
  ],
  contraindications: [
    'No absolute contraindications when PEP is indicated — rabies is fatal',
    'PCECV (RabAvert): severe egg protein allergy — use HDCV (Imovax) instead',
    'History of severe allergic reaction to vaccine components — use alternative product',
  ],
  cautions: [
    'Do NOT administer in gluteal area — documented poor immunogenicity',
    'Immune complex-like reactions (urticaria, arthralgia, angioedema) reported in ~6% receiving HDCV boosters',
    'Pregnancy is NOT a contraindication — rabies is fatal, PEP is safe',
  ],
  monitoring: 'Immunocompromised patients: check RVNA titer 7-14 days after final dose. No routine monitoring needed for immunocompetent patients.',
  notes: 'HDCV (Imovax) and PCECV (RabAvert) are interchangeable — either can complete a series started with the other. Fixed 1.0 mL dose regardless of age or weight. Do not restart series if a dose is delayed — resume where left off. Common side effects: injection site pain (21-74%), headache, nausea, myalgias.',
  citations: [
    'Rupprecht CE, et al. Use of a Reduced (4-Dose) Vaccine Schedule for PEP — ACIP, 2010. MMWR Recomm Rep. 2010;59(RR-2):1-9.',
    'Rabies Vaccine (Imovax Rabies, RabAvert) Package Inserts. FDA/DailyMed.',
  ],
};

const RACEMIC_EPINEPHRINE: DrugEntry = {
  id: 'racemic-epinephrine',
  name: 'Racemic Epinephrine (Nebulized)',
  genericName: 'Racemic epinephrine',
  drugClass: 'Alpha/beta adrenergic agonist',
  route: 'Inhaled (nebulized)',
  indications: ['Croup (moderate-severe)', 'Post-extubation stridor'],
  dosing: [
    {
      indication: 'Croup',
      regimen: '0.5 mL of 2.25% racemic epinephrine diluted in 4.5 mL normal saline, nebulized. May repeat as needed. Alternative: L-epinephrine 0.5 mL/kg of 1:1000 (max 5 mL) nebulized.',
    },
    {
      indication: 'Post-extubation stridor',
      regimen: '0.5 mL of 2.25% in 4.5 mL NS nebulized. May repeat x1.',
    },
  ],
  contraindications: [
    'Known hypersensitivity',
    'Use with caution in underlying cardiac disease',
  ],
  cautions: [
    'Effects are TRANSIENT — onset within minutes, duration only 1-2 hours',
    'MUST observe minimum 2 hours after administration for symptom rebound',
    'Tachycardia and tremor are expected side effects',
    'Multiple doses → strong indicator for hospital admission',
  ],
  monitoring: 'Heart rate, respiratory status. Observe minimum 2 hours after each dose for rebound symptoms. Monitor for return of stridor at rest.',
  notes: 'Provides rapid mucosal vasoconstriction reducing subglottic edema. Relief is temporary — the underlying inflammation persists. Repeated doses may prevent intubation in severe cases. L-epinephrine (1:1000) is an acceptable alternative where racemic formulation is unavailable. Children who require >2 doses should generally be admitted. Always administer with concurrent glucocorticoid (dexamethasone).',
  citations: [
    'Cherry JD. Croup. N Engl J Med. 2008;358(4):384-91.',
    'Zoorob R, Sidani M, Murray J. Croup: An Overview. Am Fam Physician. 2011;83(9):1067-73.',
    'Smith DK, McDermott AJ, Sullivan JF. Croup: Diagnosis and Management. Am Fam Physician. 2018;97(9):575-580.',
  ],
};

const REGULAR_INSULIN: DrugEntry = {
  id: 'regular-insulin',
  name: 'Regular Insulin (IV)',
  genericName: 'Insulin regular (human)',
  drugClass: 'Hormone / potassium-shifting agent',
  route: 'IV',
  indications: ['Hyperkalemia (potassium shift)'],
  dosing: [
    {
      indication: 'Hyperkalemia',
      regimen: '5 units regular insulin IV bolus (NOT subcutaneous). Must give with dextrose unless glucose >250 mg/dL.',
    },
    {
      indication: 'Dextrose co-administration',
      regimen: 'If glucose <250: D50W 2 ampules (100 mL total, 50g dextrose) OR D10W 500 mL over 4 hours. If glucose 180-250: half-dose dextrose (25g). If glucose >250: no dextrose needed.',
    },
  ],
  contraindications: [
    'Severe hypoglycemia (give dextrose first)',
  ],
  cautions: [
    'Must be given IV — subcutaneous absorption is unpredictable in critical illness',
    '5 units (not 10) reduces hypoglycemia risk from 15-20% to <5% with similar K-lowering effect',
    'Potassium shift lasts ~4 hours — may need redosing',
    'Risk factors for hypoglycemia: renal dysfunction, no diabetes, low baseline glucose, low body weight, female sex',
  ],
  monitoring: 'Fingerstick glucose every 1 hour for 4-6 hours after administration. If glucose <70 mg/dL, give additional dextrose preemptively. Recheck potassium at 1-2 hours.',
  notes: 'D10W infusion (500 mL over 4 hours) is preferred over D50W bolus — causes less rebound hypoglycemia and less venous irritation. Effect onset: 15-30 minutes. Expected K+ reduction: 0.5-1.2 mEq/L. Duration: ~4 hours — plan definitive elimination therapy.',
  citations: [
    'Moussavi K, et al. Management of Hyperkalemia With Insulin and Glucose. J Emerg Med. 2019;57(1):36-42.',
    'Harel Z, Kamel KS. Optimal Dose of Intravenous Insulin for Hyperkalemia. PLoS One. 2016;11(5):e0154963.',
    'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
  ],
};

const RETEPLASE: DrugEntry = {
  id: 'reteplase',
  name: 'Reteplase',
  genericName: 'Reteplase',
  drugClass: 'Thrombolytic (tissue plasminogen activator)',
  route: 'IV',
  indications: ['Acute STEMI'],
  dosing: [
    {
      indication: 'STEMI / Fibrinolysis',
      regimen: '10 units IV bolus over 2 minutes, then repeat 10 units IV bolus 30 minutes later.\n\nPatency rate: 60% (TIMI grade 3 flow at 90 min).\n\nMust be given with anticoagulation (UFH or enoxaparin) for minimum 48 hours.\n\nFibrin-specific agent. Contraindicated within 6 months of streptokinase exposure.',
    },
  ],
  notes: 'Double-bolus fibrinolytic for STEMI when PCI not available within 120 minutes. Administer with concomitant anticoagulation. Less commonly used than tenecteplase (single bolus) but acceptable alternative.',
  citations: [],
};

const RIVAROXABAN: DrugEntry = {
  id: 'rivaroxaban',
  name: 'Rivaroxaban',
  genericName: 'Rivaroxaban',
  drugClass: 'Direct oral anticoagulant (Factor Xa inhibitor)',
  route: 'PO',
  indications: ['Pulmonary embolism', 'Deep vein thrombosis', 'Atrial fibrillation (stroke prevention)', 'CAD/PAD secondary prevention'],
  dosing: [
    {
      indication: 'PE / DVT treatment',
      regimen: '15 mg twice daily with food \u00D7 21 days, then 20 mg once daily with food \u00D7 3\u20136 months. Extended therapy: 20 mg or 10 mg once daily.',
    },
    {
      indication: 'Atrial fibrillation (stroke prevention)',
      regimen: '20 mg daily with food (CrCl >50 mL/min). 15 mg daily with food (CrCl 15-50 mL/min). Avoid if CrCl <15 mL/min.',
    },
  ],
  cautions: [
    'CrCl <30 mL/min \u2014 avoid (limited data, increased drug exposure)',
    'Moderate hepatic impairment (Child-Pugh B) \u2014 use with caution',
    'Must take with food (increases bioavailability by 39%)',
    'Strong CYP3A4 and P-gp inhibitors/inducers \u2014 avoid concomitant use',
  ],
  notes: 'Single-drug oral therapy \u2014 no initial parenteral heparin required. Take with food to ensure adequate absorption.',
  citations: [
    'Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.',
    'Freund Y, et al. Acute Pulmonary Embolism: A Review. JAMA. 2022.',
  ],
};

const RH_IMMUNE_GLOBULIN: DrugEntry = {
  id: 'rh-immune-globulin',
  name: 'Rh(D) Immune Globulin (RhoGAM)',
  genericName: 'Rh(D) immune globulin',
  drugClass: 'Immune globulin',
  route: 'IM',
  indications: ['Prevention of Rh D alloimmunization', 'First trimester vaginal bleeding (Rh-negative patients)', 'Miscarriage in Rh-negative patients'],
  dosing: [
    {
      indication: 'First trimester — vaginal bleeding or miscarriage',
      regimen: '50 mcg (MICRhoGAM) IM within 72 hours. If 50 mcg unavailable, 300 mcg (standard RhoGAM) dose may be substituted. Only for Rh(D)-negative AND unsensitized patients.',
    },
    {
      indication: 'Second/third trimester or significant hemorrhage',
      regimen: '300 mcg (standard RhoGAM) IM within 72 hours of sensitizing event. Kleihauer-Betke test if large fetomaternal hemorrhage suspected — additional doses may be needed.',
    },
  ],
  contraindications: [
    'Rh(D)-positive patient',
    'Patient already sensitized to anti-D antibodies',
    'Known hypersensitivity to human immune globulin',
    'IgA deficiency with anti-IgA antibodies (anaphylaxis risk)',
  ],
  cautions: [
    'First trimester use is controversial — ACOG 2017 states no evidence-based recommendation can be made for use at or before 12 weeks',
    'Reasonable to withhold in minimal early first trimester bleeding',
    'Consider administration for heavy bleeding or near 12 weeks gestation',
    'Discuss institutional policy with OB department',
  ],
  monitoring: 'Confirm Rh status and antibody screen prior to administration. Type and screen.',
  notes: 'Prevents maternal alloimmunization to Rh(D) antigen which can cause hemolytic disease of the fetus in subsequent pregnancies. ACOG 2017 specifically states that administration in threatened miscarriage at or before 12 weeks is controversial — the decision should be individualized and discussed with OB. The 50 mcg dose (MICRhoGAM) is sufficient for first trimester events but may not be stocked at all facilities.',
  citations: [
    'ACOG Practice Bulletin No. 181: Prevention of Rh D Alloimmunization. Obstet Gynecol. 2017;130(2):e57-e70.',
    'Hannafin B, Lovecchio F, Blackburn P. Do Rh-negative women with first trimester spontaneous abortions need Rh immune globulin? Am J Emerg Med. 2006;24(4):487-489.',
  ],
};

const SODIUM_ZIRCONIUM_CYCLOSILICATE: DrugEntry = {
  id: 'sodium-zirconium-cyclosilicate',
  name: 'Lokelma (Sodium Zirconium Cyclosilicate)',
  genericName: 'Sodium zirconium cyclosilicate',
  drugClass: 'Potassium binder',
  route: 'PO',
  indications: ['Hyperkalemia (adjunct — potassium elimination)'],
  dosing: [
    {
      indication: 'Acute hyperkalemia',
      regimen: '10 grams PO every 8 hours for up to 48-72 hours.',
    },
    {
      indication: 'Maintenance',
      regimen: '10 grams PO daily (range 5-15 grams daily). For chronic HD patients: 5 grams daily on non-dialysis days.',
    },
  ],
  contraindications: [
    'NPO patients (oral only)',
    'Severe constipation, bowel obstruction, impaction',
    'Abnormal post-operative bowel motility',
  ],
  cautions: [
    'Only MILDLY effective (~0.2 mM reduction at 4h, ~0.4 mM at 24h)',
    'Do NOT rely on as sole treatment for severe hyperkalemia',
    'Do NOT delay dialysis while waiting for SZC to work',
    'Each 5g dose contains 400 mg sodium (18 mEq) — 10g q8h = ~677 mL NS equivalent sodium/day',
    'May alter GI absorption of pH-dependent drugs (separate by 2 hours): increased absorption of weak acids (furosemide, atorvastatin), decreased exposure to weak bases (dabigatran, tacrolimus, clopidogrel)',
  ],
  monitoring: 'Serum potassium, signs of volume overload/edema, GI symptoms.',
  notes: 'Next-generation potassium binder (replaces Kayexalate which is antiquated and dangerous). May help avoid or delay dialysis in borderline cases. For anuric patients with severe hyperkalemia, SZC alone will inevitably fail. Patiromer is an alternative but even less effective for acute management (~0.23 mM at 7 hours).',
  citations: [
    'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
    'Long B, et al. Controversies in Management of Hyperkalemia. J Emerg Med. 2018;55(2):192-205.',
  ],
};

const TDF_FTC: DrugEntry = {
  id: 'tdf-ftc',
  name: 'Tenofovir/Emtricitabine (Truvada)',
  genericName: 'Tenofovir disoproxil fumarate / Emtricitabine',
  drugClass: 'Dual NRTI combination (backbone)',
  route: 'PO',
  indications: ['HIV post-exposure prophylaxis (PEP backbone)', 'HIV pre-exposure prophylaxis (PrEP)', 'HIV treatment (ART backbone)'],
  dosing: [
    {
      indication: 'HIV PEP (backbone)',
      regimen: '1 tablet (300/200 mg) PO once daily x 28 days. Combine with dolutegravir 50 mg daily or darunavir/ritonavir. Take with or without food.',
    },
  ],
  contraindications: [
    'CrCl <60 mL/min for TDF-based formulations (nephrotoxic)',
  ],
  cautions: [
    'Renal toxicity (TDF) \u2014 monitor creatinine at baseline and 2 weeks; avoid if CrCl <60',
    'Bone mineral density decrease \u2014 TDF associated with bone loss (TAF-based alternatives preferred if risk factors)',
    'Lactic acidosis / hepatomegaly with steatosis \u2014 rare NRTI class effect',
    'HBV co-infection \u2014 severe hepatitis flare may occur upon discontinuation (both FTC and TDF active against HBV)',
  ],
  monitoring: 'Renal function at baseline and 2 weeks. HIV testing at baseline, 4\u20136 weeks, and 3 months. HBV serology at baseline.',
  notes: 'Preferred dual-NRTI backbone for PEP when used with a 3rd agent (dolutegravir or darunavir/r). Also used for PrEP. TAF-based alternatives (e.g., Biktarvy, Descovy) have less renal/bone toxicity.',
  citations: [
    'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV. MMWR. 2025;74(1):1-56.',
    'Gandhi RT, et al. Antiretroviral Drugs for Treatment and Prevention of HIV. JAMA. 2023;329(1):63-84.',
  ],
};

const TERBUTALINE: DrugEntry = {
  id: 'terbutaline',
  name: 'Terbutaline',
  genericName: 'Terbutaline sulfate',
  drugClass: 'Beta-2 adrenergic agonist',
  route: 'SQ',
  indications: ['Hyperkalemia (potassium shift)', 'Acute asthma/bronchospasm', 'Tocolysis (uterine relaxation)', 'Anaphylaxis bronchospasm'],
  dosing: [
    {
      indication: 'Hyperkalemia',
      regimen: '0.5 mg SQ (or 7 mcg/kg SQ). Onset: 5 minutes. Peak effect: 30-60 minutes. Duration: 3-6 hours.',
    },
    {
      indication: 'Asthma',
      regimen: '0.25 mg SQ, may repeat q15-30 min PRN, max 0.5 mg in 4 hours.',
    },
    {
      indication: 'Tocolysis (Shoulder Dystocia / Zavanelli)',
      regimen: '0.25 mg SQ or IM × 1 dose. Provides rapid uterine relaxation to facilitate cephalic replacement (Zavanelli maneuver) prior to emergency cesarean section. Onset: 5 minutes SQ.',
    },
    {
      indication: 'Anaphylaxis bronchospasm',
      regimen: '0.25 mg SQ × 1. Systemic beta-2 agonist for persistent bronchospasm despite adequate epinephrine. Provides systemic mast cell stabilization via beta-2 stimulation. Consider in beta-blocked patients for additional beta-2 effect.',
    },
  ],
  contraindications: [
    'Baseline tachycardia (relative)',
    'Risk of tachyarrhythmia (relative)',
    'Active myocardial infarction (relative)',
    'History of seizures (rare, relative)',
    'Brittle diabetes (relative)',
  ],
  cautions: [
    'Beta-2 metabolic effects: hyperglycemia, hypokalemia, hyperlactatemia',
    'Some beta-1 activity (~10:1 beta-2:beta-1 ratio)',
    'MAO inhibitors/TCAs increase hypertension risk',
  ],
  monitoring: 'Heart rate, blood pressure, serum potassium, glucose.',
  notes: 'Terbutaline is logistically superior to nebulized albuterol for hyperkalemia — single SQ injection vs. 4-8 back-to-back nebulizers. Similar potassium-lowering efficacy. Bioavailability: 100% SQ. Peak plasma concentration: ~30 min. ~90% renally eliminated, ~60% unchanged drug. Expected K+ reduction: ~0.5-1 mEq/L.',
  citations: [
    'Sowinski KM, et al. Subcutaneous terbutaline use in CKD to reduce potassium concentrations. Am J Kidney Dis. 2005;45(6):1040-5.',
    'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
  ],
};

const TENECTEPLASE: DrugEntry = {
  id: 'tenecteplase',
  name: 'Tenecteplase (TNKase)',
  genericName: 'Tenecteplase',
  drugClass: 'Thrombolytic (tissue plasminogen activator)',
  route: 'IV',
  indications: ['Acute ischemic stroke (0\u20134.5h)', 'Acute STEMI'],
  dosing: [
    {
      indication: 'Acute ischemic stroke',
      regimen: '0.25 mg/kg IV bolus (max 25 mg) given over 5 seconds. Single dose \u2014 no infusion required. BP must be <185/110 before administration and <180/105 for 24h after.',
      weightCalc: { dosePerKg: 0.25, unit: 'mg', maxDose: 25 },
    },
    {
      indication: 'STEMI / Fibrinolysis',
      regimen: 'Single IV bolus over 5 seconds, weight-based:\n\u2022 <60 kg: 30 mg\n\u2022 60-69 kg: 35 mg\n\u2022 70-79 kg: 40 mg\n\u2022 80-89 kg: 45 mg\n\u2022 \u226590 kg: 50 mg\n\nAge >75 years: Consider HALF dose (reduced ICH risk).\n\nPatency rate: 63% (TIMI grade 3 flow at 90 min).\nPreferred fibrinolytic due to single-bolus dosing.',
    },
  ],
  contraindications: [
    'Active internal bleeding or ICH',
    'History of hemorrhagic stroke or stroke of unknown origin',
    'Ischemic stroke within 3 months',
    'Intracranial neoplasm, AVM, or aneurysm',
    'Known bleeding diathesis',
    'Severe uncontrolled hypertension (>185/110 despite treatment)',
    'See full contraindications list in [Thrombolysis Contraindications](#/info/stroke-contraindications)',
  ],
  cautions: [
    'No antithrombotics \u00D7 24h post-administration',
    'Repeat NCCT at 24h before starting antiplatelets/anticoagulants',
    'Angioedema risk \u2014 higher in patients on ACE inhibitors',
    'Fibrinogen depletion less than alteplase (more fibrin-specific)',
  ],
  monitoring: 'Neuro checks every 15 min \u00D7 2h, then every 30 min \u00D7 6h, then hourly \u00D7 16h. BP every 15 min \u00D7 2h, then every 30 min \u00D7 6h. Any neurological decline \u2192 emergent NCCT.',
  notes: 'Single IV bolus (vs 60-min alteplase infusion) \u2014 significantly simpler administration. AcT trial (2024): tenecteplase 0.25 mg/kg was noninferior to alteplase for functional outcome at 90 days with similar safety profile. Preferred thrombolytic per 2026 AHA/ASA guidelines due to ease of administration and equivalent efficacy.',
  citations: [
    'Mendelson SJ, Prabhakaran S. Diagnosis and Management of Transient Ischemic Attack and Acute Ischemic Stroke: A Review. JAMA. 2021;325(11):1088-1098.',
    'Bhatt DL, et al. Tenecteplase vs Alteplase for Acute Ischemic Stroke (AcT). Lancet. 2024.',
    'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
  ],
};

const THIAMINE: DrugEntry = {
  id: 'thiamine',
  name: 'Thiamine (Vitamin B1)',
  genericName: 'Thiamine hydrochloride',
  drugClass: 'Vitamin',
  route: 'IV / PO',
  indications: ['Hyponatremia (ODS prevention)', 'Wernicke encephalopathy', 'Hyperemesis gravidarum prevention'],
  dosing: [
    {
      indication: 'Hyponatremia (ODS prevention)',
      regimen: '100 mg IV daily. Give empirically to ALL patients undergoing sodium correction, especially alcoholics and malnourished patients. Thiamine deficiency increases ODS risk.',
    },
    {
      indication: 'Wernicke encephalopathy',
      regimen: '500 mg IV TID x 3 days, then 250 mg IV daily x 3-5 days. Give BEFORE glucose in alcoholic patients — glucose metabolism consumes remaining thiamine stores.',
    },
    {
      indication: 'Hyperemesis gravidarum — Wernicke prevention',
      regimen: '100 mg IV once, prior to glucose-containing fluids. ACOG recommends thiamine for patients with protracted vomiting receiving dextrose-containing IV fluids. Prevents Wernicke encephalopathy.',
    },
  ],
  contraindications: [],
  cautions: [
    'Anaphylaxis extremely rare with IV administration',
    'Give BEFORE glucose/dextrose in alcoholic patients',
    'Low cost, minimal risk — threshold to give empirically should be very low',
  ],
  monitoring: 'Clinical response (mental status, ataxia, ophthalmoplegia for Wernicke).',
  notes: 'Thiamine deficiency is a major but underappreciated risk factor for osmotic demyelination syndrome (ODS) during sodium correction. Malnourished patients (alcoholics, eating disorders, chronic illness) are at highest risk. Empiric thiamine 100 mg IV is cheap, safe, and should be given to all patients undergoing Na correction as ODS prophylaxis.',
  citations: [
    'Sterns RH. Disorders of Plasma Sodium. NEJM. 2015;372(1):55-65.',
  ],
};

const TICAGRELOR: DrugEntry = {
  id: 'ticagrelor',
  name: 'Ticagrelor (Brilinta)',
  genericName: 'Ticagrelor',
  drugClass: 'Antiplatelet (reversible P2Y12 antagonist)',
  route: 'PO',
  indications: ['Minor ischemic stroke (alternative DAPT)', 'High-risk TIA', 'Acute coronary syndrome'],
  dosing: [
    {
      indication: 'Minor stroke / high-risk TIA (alternative DAPT)',
      regimen: '180 mg loading dose on day 1 + aspirin 325 mg. Then 90 mg BID + aspirin 81 mg \u00D7 30 days total. Alternative to aspirin + clopidogrel when CYP2C19 poor metabolizer status is known or suspected.',
    },
    {
      indication: 'ACS / NSTEMI (preferred P2Y12)',
      regimen: '180 mg loading dose, then 90 mg BID \u00D7 12 months. Aspirin 81 mg daily (do NOT exceed 100 mg/day \u2014 higher doses reduce ticagrelor efficacy). Preferred first-line P2Y12 per PLATO trial. After 12 months: may reduce to 60 mg BID for extended therapy (PEGASUS-TIMI 54).',
    },
  ],
  contraindications: [
    'Active pathological bleeding',
    'History of intracranial hemorrhage',
    'Severe hepatic impairment (Child-Pugh C)',
  ],
  cautions: [
    'Dyspnea \u2014 occurs in ~14% of patients; usually mild, self-limited, not related to bronchospasm',
    'Bradycardia \u2014 ventricular pauses reported; use cautiously with sick sinus syndrome or AV block',
    'Do not exceed aspirin 100 mg/day with ticagrelor (higher aspirin doses reduce ticagrelor efficacy)',
    'Reversible antiplatelet effect \u2014 offset ~5 days (vs 7\u201310 days for clopidogrel)',
    'CYP3A4 interactions \u2014 avoid strong inhibitors (ketoconazole) and strong inducers (rifampin)',
  ],
  monitoring: 'No routine monitoring required. Monitor for bleeding and dyspnea.',
  notes: 'THALES trial: ticagrelor + aspirin \u00D7 30 days reduced 30-day stroke/death from 6.6% to 5.5% (NNT 91) in mild-to-moderate stroke. Not dependent on CYP2C19 metabolism (advantage over clopidogrel in poor metabolizers). Higher cost and twice-daily dosing compared to clopidogrel.',
  citations: [
    'Johnston SC, et al. Ticagrelor and Aspirin or Aspirin Alone in Acute Ischemic Stroke or TIA (THALES). N Engl J Med. 2020;383(3):207-217.',
  ],
};

const UFH: DrugEntry = {
  id: 'ufh',
  name: 'Unfractionated Heparin (UFH)',
  genericName: 'Heparin sodium',
  drugClass: 'Unfractionated heparin (indirect thrombin/Xa inhibitor)',
  route: 'IV',
  indications: ['Pulmonary embolism (all risk levels)', 'DVT', 'ACS', 'Bridge anticoagulation'],
  dosing: [
    {
      indication: 'High-risk / Massive PE',
      regimen: 'Bolus 80 units/kg (or 5,000 units) IV, then continuous infusion at 18 units/kg/hour. Titrate to aPTT 60\u201380 seconds (1.5\u20132.5\u00D7 control).',
    },
    {
      indication: 'Standard PE / DVT',
      regimen: 'Bolus 80 units/kg IV, then 18 units/kg/hr continuous infusion. Adjust per institutional nomogram.',
    },
    {
      indication: 'ACS / NSTEMI',
      regimen: 'Bolus: 60 units/kg IV (max 4,000 units). Infusion: 12 units/kg/hr (max 1,000 units/hr). Target aPTT: 50-70 seconds (1.5-2.0× control). Lower doses than PE due to concurrent dual antiplatelet therapy. Adjust per institutional nomogram.',
    },
    {
      indication: 'STEMI / PCI',
      regimen: 'PCI without GP IIb/IIIa: 70-100 units/kg IV bolus.\nPCI with GP IIb/IIIa: 50-70 units/kg IV bolus.\nAdditional boluses to maintain therapeutic ACT.\n\nWith fibrinolysis: 60 units/kg bolus (max 4,000 units), then 12 units/kg/hr (max 1,000 units/hr) infusion for minimum 48 hours. Target aPTT 1.5-2× control.',
      weightCalc: [
        { dosePerKg: 70, unit: 'units', label: 'PCI bolus (without GP IIb/IIIa)' },
        { dosePerKg: 50, unit: 'units', label: 'PCI bolus (with GP IIb/IIIa)' },
        { dosePerKg: 60, unit: 'units', maxDose: 4000, label: 'Fibrinolysis bolus' },
      ],
    },
  ],
  contraindications: [
    'Active major hemorrhage',
    'Severe thrombocytopenia (platelets <25,000)',
    'History of heparin-induced thrombocytopenia (HIT)',
    'Spinal procedure or epidural within 12 hours',
  ],
  cautions: [
    'Renal insufficiency: UFH preferred over LMWH when CrCl <25\u201330 mL/min (not renally cleared)',
    'Obesity: may require higher initial doses and more frequent aPTT monitoring',
  ],
  monitoring: 'aPTT every 6 hours until therapeutic, then every 12\u201324 hours. Platelet count at baseline and every 2\u20133 days (HIT screening).',
  notes: 'Preferred over LMWH when: CrCl <30 mL/min, high bleeding risk (short half-life, fully reversible with protamine), or thrombolysis anticipated. Fully reversible with protamine sulfate.',
  citations: [
    'Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020.',
    'Garcia DA, et al. Parenteral Anticoagulants: ACCP Evidence-Based Clinical Practice Guidelines. Chest. 2012.',
  ],
};

const VANCOMYCIN: DrugEntry = {
  id: 'vancomycin',
  name: 'Vancomycin',
  genericName: 'Vancomycin hydrochloride',
  drugClass: 'Glycopeptide',
  route: 'IV/PO',
  indications: ['Meningitis (>28 days, added to Ceftriaxone for MRSA/resistant organism coverage)', 'C. difficile infection (first-line, ORAL)'],
  dosing: [
    {
      indication: 'Meningitic',
      regimen: '15 mg/kg IV q6h.',
    },
    {
      indication: 'Non-meningitic',
      regimen: '15 mg/kg IV q8h.',
    },
    {
      indication: 'C difficile',
      regimen: 'Non-severe and severe: 125 mg PO QID × 10-14 days. Fulminant: 500 mg PO/NG QID + IV metronidazole 500 mg q8h ± rectal vancomycin enema. NOTE: This is ORAL vancomycin \u2014 not systemically absorbed.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to vancomycin',
  ],
  cautions: [
    'Red Man Syndrome — infuse over at least 1 hour',
    'Nephrotoxicity — especially with concurrent aminoglycosides',
    'Ototoxicity with prolonged use',
  ],
  monitoring: 'Obtain trough before 4th dose (goal trough 15-20 mcg/mL for meningitis). Renal function (BUN, creatinine). Drug levels needed if >2 doses anticipated.',
  notes: 'Added to Ceftriaxone for meningitis in infants >28 days to cover MRSA and resistant GBS/pneumococcus. Not needed in the 0-28 day empiric sepsis regimen (Ampicillin + Gentamicin or Ampicillin + Ceftriaxone provides adequate coverage).',
  citations: [
    'Tunkel AR, et al. Practice Guidelines for the Management of Bacterial Meningitis. Clin Infect Dis. 2004;39(9):1267-1284.',
    'Red Book: 2021-2024 Report of the Committee on Infectious Diseases. American Academy of Pediatrics.',
  ],
};

const VERAPAMIL: DrugEntry = {
  id: 'verapamil',
  name: 'Verapamil',
  genericName: 'Verapamil hydrochloride',
  drugClass: 'Nondihydropyridine calcium channel blocker',
  route: 'IV',
  indications: ['A-Fib / A-Flutter rate control', 'Supraventricular tachycardia'],
  dosing: [
    {
      indication: 'A-Fib rate control (acute)',
      regimen: '2.5-5 mg IV over 2 min. May repeat with 5-10 mg every 15-30 min as needed. Maximum total dose: 20 mg.',
    },
  ],
  contraindications: [
    'EF \u226440% or moderate-to-severe LV systolic dysfunction',
    'Decompensated heart failure',
    'Severe hypotension',
    'Sick sinus syndrome without pacemaker',
    'Second/third-degree AV block without pacemaker',
    'WPW with atrial fibrillation',
    'Concurrent IV beta-blocker use',
    'Wide-complex tachycardia of uncertain origin',
  ],
  cautions: [
    'Hypotension \u2014 more common than with diltiazem',
    'Negative inotropic effects \u2014 may worsen borderline hemodynamics',
    'Randomized clinical trials examining verapamil for A-Fib are lacking',
    'Diltiazem is generally preferred among nondihydropyridine CCBs',
  ],
  monitoring: 'Continuous heart rate and blood pressure monitoring. Assess hemodynamic response after each dose.',
  notes: 'Alternative to diltiazem when diltiazem is unavailable. Generally less preferred due to limited RCT evidence and similar contraindication profile. Same EF restriction as diltiazem: CONTRAINDICATED if EF \u226440%.',
  citations: [
    'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
    'Prystowsky EN, et al. Treatment of Atrial Fibrillation. JAMA. 2015;314(3):278-88.',
  ],
};

const BACITRACIN: DrugEntry = {
  id: 'bacitracin',
  name: 'Bacitracin Ointment',
  genericName: 'Bacitracin zinc',
  drugClass: 'Topical antibiotic',
  route: 'Topical',
  indications: ['Superficial burns', 'Facial burns', 'Minor wound prophylaxis'],
  dosing: [
    {
      indication: 'Burns — superficial/facial',
      regimen: 'Apply thin layer to wound TID-QID. Cover with nonadherent dressing. For facial burns: bacitracin only, no dressings needed.',
    },
  ],
  contraindications: ['Known bacitracin allergy (rare)'],
  cautions: ['Not effective for deep partial or full thickness burns — use silver-based dressings', 'Avoid large surface area application (nephrotoxicity with systemic absorption, rare)'],
  notes: 'First-line topical for superficial partial thickness burns and all facial burns. Preferred over silver sulfadiazine for superficial burns — SSD delays epithelialization. OTC availability makes it ideal for outpatient burn care.',
  citations: ['Wasiak J et al. Dressings for Superficial and Partial Thickness Burns. Cochrane. 2013;(3):CD002106.'],
};

const CALCIUM_GLUCONATE_GEL: DrugEntry = {
  id: 'calcium-gluconate-gel',
  name: 'Calcium Gluconate 2.5% Gel',
  genericName: 'Calcium gluconate topical',
  drugClass: 'Electrolyte / antidote (topical)',
  route: 'Topical',
  indications: ['Hydrofluoric acid burns'],
  dosing: [
    {
      indication: 'HF acid burn — topical',
      regimen: 'Apply liberally and massage continuously into affected area. Reapply every 15-30 minutes until pain resolves. May mix: 3.5g calcium gluconate powder in 5 oz water-soluble lubricant (KY Jelly).',
    },
    {
      indication: 'HF acid burn — subcutaneous injection',
      regimen: '5% calcium gluconate solution: inject 0.5 mL per cm² of affected skin using 27-30G needle. Maximum 0.5 mL per digit.',
    },
  ],
  contraindications: ['Do not inject into digits beyond 0.5 mL per injection site (compartment risk)'],
  cautions: ['If pain persists after topical and SQ → consider intra-arterial calcium gluconate via radial artery catheter', 'Monitor serial ionized calcium, magnesium, potassium, ECG', 'HF burns >1% TBSA or >50% concentration → admit for cardiac monitoring'],
  monitoring: 'Serial ionized calcium levels. Continuous cardiac monitoring for burns >1% TBSA. ECG (QT prolongation, arrhythmias). Pain as surrogate for ongoing fluoride penetration.',
  notes: 'First-line treatment for hydrofluoric acid burns. Pain relief indicates successful fluoride binding. Persistent pain = ongoing tissue destruction requiring escalation: topical → SQ injection → intra-arterial → IV systemic calcium. HF is uniquely dangerous among chemical burns — fluoride ion binds calcium/magnesium causing progressive tissue necrosis and potentially fatal hypocalcemia.',
  citations: [
    'Henretig FM et al. Hazardous Chemical Emergencies and Poisonings. NEJM. 2019;380(17):1638-1655.',
    'Akelma H et al. Rare Chemical Burns: Review of the Literature. Int Wound J. 2019;16(6):1330-1338.',
  ],
};

const FENTANYL: DrugEntry = {
  id: 'fentanyl',
  name: 'Fentanyl',
  genericName: 'Fentanyl citrate',
  drugClass: 'Opioid analgesic (synthetic)',
  route: 'IV/IN',
  indications: ['Burns pain', 'Acute severe pain', 'Pediatric analgesia (intranasal)'],
  dosing: [
    {
      indication: 'Burns — IV analgesia',
      regimen: '1-1.5 mcg/kg IV over 1-2 minutes. May repeat q30-60 min PRN. Rapid onset (2-3 min), short duration (30-60 min).',
      weightCalc: { dosePerKg: 1.5, unit: 'mcg', maxDose: 100 },
    },
    {
      indication: 'Burns — pediatric intranasal',
      regimen: '1.5 mcg/kg IN via atomizer (MAD device). Max 100 mcg per nare. Onset 5-10 min. May repeat ×1 after 10-15 min if needed.',
      weightCalc: { dosePerKg: 1.5, unit: 'mcg', maxDose: 100 },
    },
  ],
  contraindications: ['MAO inhibitor use within 14 days', 'Severe respiratory depression without ventilatory support'],
  cautions: ['Chest wall rigidity with rapid IV push (especially >5 mcg/kg)', 'Short duration — may need repeated dosing or transition to longer-acting opioid', 'Respiratory depression potentiated by benzodiazepines'],
  monitoring: 'Continuous SpO2, respiratory rate, sedation level. Have naloxone immediately available.',
  notes: 'Preferred opioid for burn pain when rapid onset and short duration are desired. Intranasal route is first-line for pediatric burns — avoids IV in a distressed child. Hemodynamically stable (no histamine release like morphine). For prolonged pain management, consider morphine or ketamine infusion.',
  citations: [
    'Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.',
    'Bitter CC et al. WMS Clinical Practice Guideline on Care of Burns in the Wilderness. Wilderness Environ Med. 2025;36(4):549-558.',
  ],
};

const HYDROXOCOBALAMIN: DrugEntry = {
  id: 'hydroxocobalamin',
  name: 'Hydroxocobalamin (Cyanokit)',
  genericName: 'Hydroxocobalamin',
  drugClass: 'Antidote (cyanide)',
  route: 'IV',
  indications: ['Cyanide poisoning', 'Smoke inhalation with suspected cyanide toxicity'],
  dosing: [
    {
      indication: 'Cyanide poisoning — adult',
      regimen: '5 grams IV over 15 minutes. May repeat 5g ×1 if persistent hemodynamic instability or cardiac arrest.',
    },
    {
      indication: 'Cyanide poisoning — pediatric',
      regimen: '70 mg/kg IV over 15 minutes. Maximum 5 grams. May repeat ×1.',
      weightCalc: { dosePerKg: 70, unit: 'mg', maxDose: 5000 },
    },
  ],
  contraindications: ['None absolute in life-threatening cyanide poisoning'],
  cautions: [
    'Turns skin, mucous membranes, and urine DARK RED for 2-3 days — warn patient/family',
    'Interferes with colorimetric lab assays (falsely elevates/decreases bilirubin, creatinine, glucose, SpO2) — draw ALL labs BEFORE administration if possible',
    'May cause transient hypertension (usually beneficial in cyanide-induced hypotension)',
    'Allergic reactions rare but possible (urticaria, angioedema)',
  ],
  monitoring: 'Hemodynamics, lactate clearance, neurologic status. Labs drawn before administration if possible. SpO2 unreliable for 24-48h after dosing.',
  notes: 'First-line antidote for cyanide poisoning (AHA recommended). Binds cyanide to form cyanocobalamin (vitamin B12) which is renally excreted. Superior safety profile to sodium nitrite (which causes methemoglobinemia — problematic in concurrent CO poisoning). Suspect cyanide in ALL enclosed-space fire victims with persistent metabolic acidosis, lactate >8-10, or hemodynamic collapse despite O2 therapy. This is a CLINICAL diagnosis — do not wait for cyanide levels.',
  citations: [
    'Lavonas EJ et al. AHA Focused Update on Management of Patients with Cardiac Arrest or Life-Threatening Toxicity Due to Poisoning. Circulation. 2023;148(16):e149-e184.',
    'Baud FJ et al. Elevated Blood Cyanide Concentrations in Victims of Smoke Inhalation. NEJM. 1991;325(25):1761-6.',
  ],
};

const HYDROCORTISONE: DrugEntry = {
  id: 'hydrocortisone',
  name: 'Hydrocortisone (Solu-Cortef)',
  genericName: 'Hydrocortisone sodium succinate',
  drugClass: 'Corticosteroid (glucocorticoid + mineralocorticoid)',
  route: 'IV / IM / PO',
  indications: ['Adrenal crisis (adult)', 'Adrenal crisis (pediatric)', 'Stress dose (moderate illness/surgery)', 'Maintenance (adult)', 'Maintenance (pediatric)', 'Emergency IM self-injection', 'Thyroid storm', 'Decompensated hypothyroidism (stress dose)'],
  dosing: [
    {
      indication: 'Adrenal crisis (adult)',
      regimen: '100 mg IV or IM bolus immediately. Then 200 mg/24h as continuous infusion (preferred) or 50 mg IV every 6 hours. Taper to oral maintenance over 1-3 days as hemodynamics stabilize. At doses ≥50 mg/day, fludrocortisone is NOT needed.',
    },
    {
      indication: 'Stress dose (moderate illness/surgery)',
      regimen: '50 mg IV or PO every 8 hours for the duration of physiologic stress. Taper to maintenance dose over 2-3 days after resolution. For major surgery: 100 mg IV preop, then 200 mg/24h, taper as above.',
    },
    {
      indication: 'Maintenance (adult)',
      regimen: '15-25 mg PO daily, divided BID or TID. Give 2/3 dose upon waking, 1/3 in early afternoon (last dose >6 hours before bedtime). Typical regimen: 15 mg AM + 5 mg at 2 PM. Use lowest effective dose to avoid Cushingoid features.',
    },
    {
      indication: 'Pediatric adrenal crisis',
      regimen: '50 mg/m² IV bolus (max 100 mg). Then 50-100 mg/m²/day as continuous infusion or divided every 6-8 hours. Requires BSA calculation — use BSA Calculator. Weight-based approximation: ~2 mg/kg IV bolus.',
      weightCalc: { dosePerKg: 2, unit: 'mg', maxDose: 100, label: 'Approximation (~50 mg/m²)' },
    },
    {
      indication: 'Pediatric maintenance',
      regimen: '6-10 mg/m²/day PO divided TID. Monitor growth velocity — overtreatment suppresses linear growth. Use BSA Calculator for precise dosing.',
    },
    {
      indication: 'Emergency IM self-injection',
      regimen: '100 mg IM into lateral thigh. For patients unable to take oral steroids due to vomiting or altered mental status. Must present to ED immediately after injection for evaluation and IV steroids.',
    },
    {
      indication: 'Thyroid storm',
      regimen: 'IBCC: 300 mg IV loading dose, then 100 mg IV q8h. ATA: 100 mg IV q8h (no separate load). Blocks peripheral T4\u2192T3 conversion and treats potential concurrent adrenal insufficiency. Continue until clinical improvement, then taper over 3-5 days.',
    },
    {
      indication: 'Decompensated hypothyroidism (stress dose)',
      regimen: '100 mg IV bolus, then 50 mg IV q8h. CRITICAL: Give BEFORE thyroid hormone replacement \u2014 thyroid hormone accelerates cortisol metabolism, may precipitate adrenal crisis in patients with concurrent AI (~5-10%). Draw random cortisol before dosing if practical. Taper once hemodynamically stable and cortisol results available.',
    },
  ],
  contraindications: [
    'Systemic fungal infections (relative — do NOT withhold in adrenal crisis)',
  ],
  cautions: [
    'Hyperglycemia with stress dosing — monitor glucose frequently',
    'Sodium retention and fluid overload at high doses',
    'At doses ≥50 mg/day, provides sufficient mineralocorticoid effect — fludrocortisone not needed',
    'Immunosuppression with prolonged supraphysiologic dosing',
    'Adrenal suppression if used chronically at supraphysiologic doses — taper slowly',
  ],
  monitoring: 'Blood glucose (especially during stress dosing). Electrolytes (Na, K). Blood pressure. Growth velocity in children. Plasma renin activity for fludrocortisone titration.',
  notes: 'First-line corticosteroid for adrenal crisis and maintenance replacement. Preferred because it is structurally identical to endogenous cortisol, provides both glucocorticoid AND mineralocorticoid activity, and has a short half-life (~90 minutes) allowing physiologic diurnal dosing. Cortisol half-life of 90 minutes means systemic effects of deficiency may develop within hours. Continuous infusion may provide more stable cortisol levels than intermittent boluses.',
  citations: [
    'Bornstein SR, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency: An Endocrine Society Clinical Practice Guideline. JCEM. 2016;101(2):364-389.',
    'Rushworth RL, et al. Adrenal Crisis. N Engl J Med. 2019;381(9):852-861.',
    'Husebye ES, et al. Adrenal Insufficiency. Lancet. 2021;397(10274):613-629.',
  ],
};

const KETAMINE: DrugEntry = {
  id: 'ketamine',
  name: 'Ketamine',
  genericName: 'Ketamine hydrochloride',
  drugClass: 'Dissociative anesthetic / NMDA antagonist',
  route: 'IV/IM',
  indications: ['Burns analgesia', 'Burns procedural sedation', 'RSI induction', 'Refractory SE', 'Acute agitation (refractory)'],
  dosing: [
    {
      indication: 'Burns — sub-dissociative analgesia',
      regimen: '0.1-0.3 mg/kg IV over 10-15 min. May repeat q15-20 min PRN. Infusion: 0.1-0.2 mg/kg/hr for dressing changes/prolonged procedures.',
      weightCalc: { dosePerKg: 0.3, unit: 'mg', label: 'Sub-dissociative (max dose)' },
    },
    {
      indication: 'Burns — procedural sedation (dissociative)',
      regimen: '1-2 mg/kg IV over 1 min (onset 1 min, duration 15-20 min). IM: 4-5 mg/kg (onset 5 min, duration 20-30 min). May give additional 0.5-1 mg/kg IV boluses for prolonged procedures.',
      weightCalc: [
        { dosePerKg: 1.5, unit: 'mg', label: 'IV dissociative' },
        { dosePerKg: 4, unit: 'mg', label: 'IM dissociative' },
      ],
    },
    {
      indication: 'RSI induction',
      regimen: '1-2 mg/kg IV push. Hemodynamically stable induction agent — ideal for burns/trauma patients.',
      weightCalc: { dosePerKg: 1.5, unit: 'mg' },
    },
    {
      indication: 'Refractory SE — continuous infusion',
      regimen: 'Load 0.5-3 mg/kg IV bolus, then infuse 0.1-5 mg/kg/hr. NMDA receptor antagonist — different mechanism from GABAergic agents. Consider when midazolam and propofol fail. Some case reports suggest trial of ketamine before other IV anesthetics to potentially avoid intubation. Requires continuous EEG monitoring.',
      weightCalc: { dosePerKg: 2, unit: 'mg', label: 'Loading bolus' },
    },
    {
      indication: 'Acute agitation (refractory)',
      regimen: '4 mg/kg IM (onset 5 min, reliable sedation) or 1-2 mg/kg IV over 1 min. For refractory agitation not responding to antipsychotics and benzodiazepines. Rapid, reliable onset. Prepare for possible intubation — 29% intubation rate in one prehospital study. Avoid in elderly patients and patients with heart disease or schizophrenia.',
      weightCalc: [
        { dosePerKg: 4, unit: 'mg', label: 'IM agitation dose' },
        { dosePerKg: 1.5, unit: 'mg', label: 'IV agitation dose' },
      ],
    },
  ],
  contraindications: ['Age <3 months (relative)', 'Known psychotic disorder (relative)'],
  cautions: [
    'Emergence reactions (10-20% adults, rare in children) — prophylactic midazolam 0.05 mg/kg can prevent',
    'Laryngospasm (rare, 0.3%) — have suction and BVM ready',
    'Increases secretions — consider glycopyrrolate 0.005 mg/kg if problematic',
    'Brief sympathomimetic effect — increases HR/BP (beneficial in hemodynamically compromised patients)',
  ],
  monitoring: 'Continuous SpO2, capnography if available, cardiac monitor. Suction and BVM at bedside. Recovery typically 60-120 min.',
  notes: 'Ideal analgesic/sedative for burn patients: provides profound analgesia at sub-dissociative doses, full procedural sedation at dissociative doses, and RSI induction — one drug for three burn care needs. Maintains airway reflexes and spontaneous respirations at dissociative doses. Does NOT cause respiratory depression at analgesic doses. Hemodynamic stability makes it superior to opioids alone for burn resuscitation patients. Particularly valuable for repeated painful procedures (dressing changes, debridement).',
  citations: [
    'Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.',
    'Bitter CC et al. WMS Clinical Practice Guideline on Care of Burns in the Wilderness. Wilderness Environ Med. 2025;36(4):549-558.',
  ],
};

const MIDAZOLAM: DrugEntry = {
  id: 'midazolam',
  name: 'Midazolam (Versed)',
  genericName: 'Midazolam hydrochloride',
  drugClass: 'Benzodiazepine (short-acting)',
  route: 'IV/IN/IM',
  indications: ['Burns anxiolysis', 'Procedural sedation adjunct', 'Seizures', 'Status epilepticus', 'Refractory SE', 'Acute agitation / delirium'],
  dosing: [
    {
      indication: 'Burns — anxiolysis',
      regimen: '0.02-0.05 mg/kg IV over 2 min. Max 2 mg initial dose. May repeat q5-10 min to effect. Total max ~0.1 mg/kg.',
      weightCalc: { dosePerKg: 0.05, unit: 'mg', maxDose: 2 },
    },
    {
      indication: 'Ketamine emergence prophylaxis',
      regimen: '0.05 mg/kg IV given with ketamine. Reduces emergence reactions in adults.',
      weightCalc: { dosePerKg: 0.05, unit: 'mg', maxDose: 2 },
    },
    {
      indication: 'Status Epilepticus — IM (no IV access)',
      regimen: '0.2 mg/kg IM (max 10 mg). ≥40 kg: 10 mg; 13-40 kg: 5 mg. RAMPART trial: IM midazolam terminated seizures in 73% vs 63% for IV lorazepam. May also give intranasal 0.2 mg/kg via mucosal atomizer.',
      weightCalc: { dosePerKg: 0.2, unit: 'mg', maxDose: 10 },
    },
    {
      indication: 'Refractory SE — continuous infusion',
      regimen: 'Load 0.2 mg/kg IV bolus, then infuse 0.05-2 mg/kg/hr. Repeat bolus 0.1-0.2 mg/kg for breakthrough seizures. Titrate to EEG seizure suppression or burst suppression. Requires intubation and continuous EEG monitoring.',
      weightCalc: { dosePerKg: 0.2, unit: 'mg', label: 'Loading bolus' },
    },
    {
      indication: 'Acute agitation / delirium',
      regimen: '2.5-5 mg IM (onset 5 min) or 2.5 mg IV push. May repeat q5-10 min to effect. Preferred for intoxication/withdrawal-related agitation. For excited delirium: 5 mg IM, repeat as needed. DO NOT combine with IM/IV olanzapine (respiratory depression risk).',
      weightCalc: { dosePerKg: 0.05, unit: 'mg', maxDose: 5 },
    },
  ],
  contraindications: ['Acute narrow-angle glaucoma', 'Known hypersensitivity to benzodiazepines'],
  cautions: [
    'Respiratory depression — especially when combined with opioids or ketamine',
    'Paradoxical agitation in elderly and pediatric patients',
    'Reduce dose by 30-50% in elderly, hepatic impairment, or when combined with opioids',
  ],
  monitoring: 'Continuous SpO2, respiratory rate. Have flumazenil available (0.2 mg IV, though rarely needed).',
  notes: 'Short-acting anxiolytic ideal for burn care procedures. At low doses (0.02-0.05 mg/kg) provides anxiolysis without significant sedation. Commonly paired with ketamine to prevent emergence reactions in adults (not needed in children). Amnesia is a therapeutic benefit for painful burn procedures.',
  citations: [
    'Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.',
  ],
};

const MORPHINE: DrugEntry = {
  id: 'morphine',
  name: 'Morphine Sulfate',
  genericName: 'Morphine sulfate',
  drugClass: 'Opioid analgesic',
  route: 'IV',
  indications: ['Burns pain', 'Severe acute pain'],
  dosing: [
    {
      indication: 'Burns — adult',
      regimen: '0.1 mg/kg IV over 5 min, q2-4h PRN. Titrate to pain control. Max initial dose 10 mg.',
      weightCalc: { dosePerKg: 0.1, unit: 'mg', maxDose: 10 },
    },
    {
      indication: 'Burns — pediatric',
      regimen: '0.05-0.1 mg/kg IV q2-4h PRN. Max initial dose 5 mg. Consider intranasal fentanyl as alternative for initial dosing.',
      weightCalc: { dosePerKg: 0.1, unit: 'mg', maxDose: 5, label: 'Pediatric' },
    },
    {
      indication: 'ACS / Refractory Pain',
      regimen: '4-8 mg IV initially (lower doses for elderly). Repeat 2-4 mg IV q5-15 min PRN.\n\nUse only for pain refractory to nitroglycerin. Morphine may delay P2Y12 inhibitor absorption and was associated with higher mortality in ACS (CRUSADE trial). Clinical judgment recommended.',
    },
  ],
  contraindications: ['Severe respiratory depression without ventilatory support', 'Paralytic ileus'],
  cautions: [
    'Histamine release → hypotension, especially in volume-depleted burn patients',
    'Respiratory depression potentiated by benzodiazepines',
    'Reduce dose 25-50% in elderly or hepatic impairment',
    'Nausea/vomiting common — have ondansetron available',
  ],
  monitoring: 'Continuous SpO2, respiratory rate, pain scores, sedation level. Blood pressure (histamine-related hypotension). Have naloxone available.',
  notes: 'Standard opioid for moderate-severe burn pain. Longer duration (3-5h) than fentanyl makes it better for sustained pain relief. Histamine release can cause hypotension — use with caution in actively resuscitating patients (consider fentanyl or ketamine instead). For severe burns, consider multimodal approach: morphine + ketamine sub-dissociative + scheduled NSAID/APAP.',
  citations: [
    'Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.',
    'Bitter CC et al. WMS Clinical Practice Guideline on Care of Burns in the Wilderness. Wilderness Environ Med. 2025;36(4):549-558.',
  ],
};

const MISOPROSTOL: DrugEntry = {
  id: 'misoprostol',
  name: 'Misoprostol',
  genericName: 'Misoprostol',
  drugClass: 'Prostaglandin E1 analog',
  route: 'Intravaginal/PO/SL',
  indications: ['Incomplete miscarriage (medical management)', 'Missed miscarriage', 'Cervical ripening'],
  dosing: [
    {
      indication: 'Miscarriage — medical management',
      regimen: '800 mcg intravaginally, single dose. 91% effective within 7 days. May repeat once if incomplete passage. Expect significant cramping and bleeding. Premedicate with ibuprofen 600 mg PO for pain.',
    },
  ],
  contraindications: [
    'Confirmed ectopic pregnancy',
    'Hemodynamic instability (needs surgical evacuation)',
    'Septic abortion',
    'Known hypersensitivity to prostaglandins',
    'IUD in place',
  ],
  cautions: [
    'Significant cramping and bleeding expected — counsel patient',
    'Up to 40% may ultimately require unplanned surgical management',
    'Fever and chills are common side effects (not necessarily infection)',
    'Diarrhea may occur',
  ],
  monitoring: 'Follow-up ultrasound in 1-2 weeks to confirm complete passage. Return to ED for heavy bleeding, fever >100.4°F, or foul-smelling discharge.',
  notes: 'Medical management of nonviable pregnancy as an alternative to expectant management or D&C. High patient satisfaction rates comparable to surgical management. Intravaginal route preferred for miscarriage management (higher efficacy than oral). Always in consultation with OB.',
  citations: [
    'Bique C, Usta M, Debora B, et al. Comparison of misoprostol and manual vacuum aspiration for the treatment of incomplete abortion. Int J Gynaecol Obstet. 2007;98(3):222-226.',
    'Kim C, Barnard S, Neilson JP, et al. Medical treatments for incomplete miscarriage. Cochrane Database Syst Rev. 2017;1:CD007223.',
  ],
};

const SODIUM_BICARBONATE: DrugEntry = {
  id: 'sodium-bicarbonate',
  name: 'Sodium Bicarbonate',
  genericName: 'Sodium bicarbonate',
  drugClass: 'Alkalinizing agent',
  route: 'IV',
  indications: ['Severe metabolic acidosis (pH < 6.9)', 'Hyperkalemia', 'TCA overdose', 'Salicylate toxicity', 'Urinary alkalinization'],
  dosing: [
    {
      indication: 'Severe Metabolic Acidosis (pH < 6.9)',
      regimen: '8.4% solution: 100 mEq (100 mL) in 400 mL sterile water IV over 2 hours. Alternatively, isotonic 4.2%: 500 mL IV over 4 hours. Recheck ABG after infusion. Repeat if pH remains < 6.9. BICAR-ICU trial: NNT 6 for survival benefit in patients with severe acidemia AND acute kidney injury.',
    },
    {
      indication: 'Hyperkalemia',
      regimen: '50 mEq (50 mL of 8.4%) IV over 5 minutes. Temporizing measure — drives K+ intracellularly via raising pH. Most effective when patient is acidotic (pH < 7.2). Limited benefit in non-acidotic hyperkalemia.',
    },
    {
      indication: 'TCA Overdose — Sodium Channel Blockade',
      regimen: '1-2 mEq/kg IV bolus over 1-2 minutes. Target serum pH 7.45-7.55. Follow with continuous infusion: 150 mEq (3 amps) in 1L D5W at 150-250 mL/hr. Titrate to QRS narrowing. May repeat boluses q5-10 min for persistent QRS widening > 100 ms.',
      weightCalc: { dosePerKg: 1.5, unit: 'mEq', maxDose: 150, label: 'Bolus (midpoint dose)' },
    },
    {
      indication: 'Salicylate Toxicity — Urinary Alkalinization',
      regimen: '150 mEq (3 amps of 8.4%) in 1L D5W, infuse at 150-200 mL/hr. Target urine pH 7.5-8.0. MUST add KCl 20-40 mEq per liter — hypokalemia blocks urinary alkalinization. Monitor urine pH hourly. Increases salicylate renal elimination 10-fold.',
    },
    {
      indication: 'Urinary Alkalinization (non-salicylate)',
      regimen: '150 mEq (3 amps) in 1L D5W IV. Target urine pH > 6.5. Used for rhabdomyolysis (prevents myoglobin precipitation in renal tubules) and methotrexate toxicity.',
    },
  ],
  contraindications: ['Metabolic alkalosis', 'Severe pulmonary edema / volume overload (significant sodium load)', 'Hypochloremia'],
  cautions: [
    'NOT recommended for routine cardiac arrest or CPR (AHA/ERC guidelines) — unless confirmed hyperkalemia or TCA overdose',
    'NOT recommended for routine DKA — insulin and fluids are definitive therapy. Use only if pH < 6.9',
    'Causes acute hypokalemia — K+ shifts intracellularly with alkalinization. Monitor K+ closely',
    'Ionized calcium drops with alkalinization — can precipitate tetany or seizures in hypocalcemic patients',
    'Paradoxical CNS acidosis possible with rapid bolus — CO2 crosses the blood-brain barrier faster than HCO3',
    '8.4% solution (1 mEq/mL) = 1000 mOsm/L — extremely hypertonic. Preferably via central line for large volumes',
    'May increase lactatemia and shift hemoglobin-oxygen dissociation curve leftward (decreased O2 delivery)',
  ],
  monitoring: 'Serial ABGs q1-2h during infusion. Serum K+ and ionized Ca2+ before and during treatment. Urine pH hourly if alkalinization is the goal. QRS width q15-30 min in TCA overdose.',
  notes: 'BICAR-ICU trial (Jaber et al., Lancet 2018): 4.2% bicarb vs no bicarb in 389 ICU patients with severe metabolic acidemia (pH ≤ 7.20). No overall mortality benefit, BUT significant benefit in predefined AKI subgroup (NNT 6 for composite of death + organ failure at day 28). Sodium bicarbonate 8.4% = 1 mEq/mL = 1000 mOsm/L. Each 50 mEq amp contains 50 mEq of sodium — a significant volume/sodium load. From a Stewart perspective, sodium bicarbonate can be viewed as chloride-free sodium that increases the strong ion difference (SID), thereby alkalinizing.',
  citations: [
    'Jaber S et al. Sodium Bicarbonate Therapy for Patients with Severe Metabolic Acidaemia (BICAR-ICU). Lancet. 2018;392(10141):31-40.',
    'Forsythe SM, Schmidt GA. Sodium Bicarbonate for the Treatment of Lactic Acidosis. Chest. 2000;117(1):260-267.',
    'Soar J et al. ERC Guidelines 2015: Adult Advanced Life Support. Resuscitation. 2015;95:100-147.',
  ],
};

const SILVER_SULFADIAZINE: DrugEntry = {
  id: 'silver-sulfadiazine',
  name: 'Silver Sulfadiazine 1% (Silvadene)',
  genericName: 'Silver sulfadiazine',
  drugClass: 'Topical antimicrobial (sulfonamide + silver)',
  route: 'Topical',
  indications: ['Deep partial thickness burns', 'Full thickness burns'],
  dosing: [
    {
      indication: 'Burns — deep partial/full thickness',
      regimen: 'Apply 1/16 inch (1.5 mm) layer to burn wound BID. Cover with sterile gauze dressing. Remove old cream with gentle washing before reapplication.',
    },
  ],
  contraindications: [
    'Sulfonamide allergy',
    'Pregnant women at or near term (kernicterus risk)',
    'Neonates/infants <2 months',
    'Superficial partial thickness burns (delays healing)',
  ],
  cautions: [
    'Do NOT use on superficial (1st degree) or superficial partial thickness burns — delays epithelialization by 1-2 days compared to other dressings',
    'Causes transient leukopenia in 5-15% of patients (benign, resolves spontaneously in 2-3 days)',
    'Pseudoeschar formation can be mistaken for infection',
    'Use only for deep partial and full thickness burns where antimicrobial coverage outweighs healing delay',
  ],
  monitoring: 'CBC if applied to large surface areas (>20% TBSA) — monitor for leukopenia. Wound assessment for infection signs.',
  notes: 'Broad-spectrum antimicrobial covering Pseudomonas, S. aureus, most gram-negatives, and Candida. Despite widespread historical use, evidence shows it DELAYS healing in superficial burns — use bacitracin + nonadherent dressings instead for superficial partial thickness. Reserve SSD for deep partial/full thickness burns where infection risk is high and surgical intervention is anticipated. Modern silver dressings (Mepilex Ag, Aquacel Ag) are preferred alternatives where available.',
  citations: [
    'Wasiak J et al. Dressings for Superficial and Partial Thickness Burns. Cochrane. 2013;(3):CD002106.',
    'Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.',
  ],
};

// -------------------------------------------------------------------
// ICH Drugs
// -------------------------------------------------------------------

const IDARUCIZUMAB: DrugEntry = {
  id: 'idarucizumab',
  name: 'Idarucizumab (Praxbind)',
  genericName: 'Idarucizumab',
  drugClass: 'Monoclonal antibody fragment (dabigatran-specific reversal)',
  route: 'IV',
  indications: ['Dabigatran reversal in life-threatening bleeding or urgent surgery'],
  dosing: [
    {
      indication: 'Dabigatran reversal — ICH or life-threatening bleeding',
      regimen: '5 g IV total: two consecutive 2.5 g bolus doses (each infused over 5\u201310 min or as bolus). Complete reversal within minutes. Specific for dabigatran only \u2014 does not reverse other DOACs.',
    },
  ],
  contraindications: [
    'None absolute in life-threatening hemorrhage',
  ],
  cautions: [
    'Thrombotic events reported post-reversal \u2014 reflects underlying prothrombotic state of the patient',
    'No redosing has been formally studied',
    'Hereditary fructose intolerance (contains sorbitol)',
  ],
  monitoring: 'Diluted thrombin time (dTT) or ecarin clotting time (ECT) to confirm reversal. Clinical hemostasis assessment.',
  notes: 'Humanized monoclonal antibody fragment that binds dabigatran with 350\u00D7 higher affinity than thrombin. RE-VERSE AD trial: 100% reversal of anticoagulant effect within minutes in 88% of patients. Only effective for dabigatran \u2014 no activity against Xa inhibitors or warfarin.',
  citations: [
    'Pollack CV, et al. Idarucizumab for Dabigatran Reversal \u2014 Full Cohort Analysis (RE-VERSE AD). N Engl J Med. 2017;377(5):431-441.',
    'Frontera JA, et al. Guideline for Reversal of Antithrombotics in Intracranial Hemorrhage. Crit Care Med. 2016;44(12):2251-2257.',
  ],
};

const LEVETIRACETAM: DrugEntry = {
  id: 'levetiracetam',
  name: 'Levetiracetam (Keppra)',
  genericName: 'Levetiracetam',
  drugClass: 'Antiepileptic (SV2A ligand)',
  route: 'IV / PO',
  indications: ['Seizure treatment in ICH', 'Status epilepticus (adjunct)', 'Seizure disorders', 'Status epilepticus (ESETT 2nd-line)'],
  dosing: [
    {
      indication: 'ICH seizure treatment',
      regimen: '20 mg/kg IV (max 3000 mg) as loading dose over 15 min. Maintenance: 500\u20131500 mg IV/PO q12h. Preferred over phenytoin in ICH \u2014 fewer side effects and drug interactions.',
      weightCalc: { dosePerKg: 20, unit: 'mg', maxDose: 3000, label: 'Loading dose' },
    },
    {
      indication: 'Status Epilepticus — 2nd line (ESETT)',
      regimen: '60 mg/kg IV (max 4500 mg) over 10-15 min. ESETT trial: 47% seizure termination (equivalent to fosphenytoin and valproate). Fewest drug interactions, no cardiac effects, safe in pregnancy. Preferred 2nd-line in pregnant patients (89% of neurologists).',
      weightCalc: { dosePerKg: 60, unit: 'mg', maxDose: 4500, label: 'SE loading dose (ESETT)' },
    },
    {
      indication: 'SAH seizure prophylaxis',
      regimen: '500 mg PO/IV BID. Short course (<3 days) preferred. Phenytoin should be avoided in SAH — associated with worse outcomes, functional decline, and cognitive disability. Reasonable to defer to inpatient team if patient has not seized.',
    },
  ],
  contraindications: [
    'Hypersensitivity to levetiracetam',
  ],
  cautions: [
    'Behavioral changes (irritability, agitation) \u2014 more common at higher doses',
    'Reduce dose in renal impairment (CrCl <80 mL/min)',
    'Suicidal ideation risk \u2014 FDA black box warning for all antiepileptics',
  ],
  monitoring: 'Seizure frequency, mental status, renal function. Drug levels not routinely needed (poor correlation with efficacy).',
  notes: 'Preferred first-line antiepileptic in neurocritical care. No hepatic metabolism, no drug interactions with warfarin/DOACs, no cardiac effects. Phenytoin should be avoided in ICH \u2014 associated with worse outcomes, numerous drug interactions, and cardiac toxicity.',
  citations: [
    'Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage. Stroke. 2022;53(7):e282-e361.',
    'Naidech AM, et al. Anticonvulsant Use and Outcomes After Intracerebral Hemorrhage. Stroke. 2009;40(12):3810-3815.',
  ],
};

const PCC_4FACTOR: DrugEntry = {
  id: 'pcc-4factor',
  name: '4-Factor PCC (Kcentra)',
  genericName: 'Prothrombin complex concentrate (human)',
  drugClass: 'Coagulation factor replacement (Factors II, VII, IX, X, Protein C & S)',
  route: 'IV',
  indications: ['Warfarin reversal in life-threatening bleeding', 'DOAC reversal (off-label)', 'Coagulopathy reversal for urgent surgery'],
  dosing: [
    {
      indication: 'Warfarin reversal — ICH (goal INR <1.4)',
      regimen: 'INR-based dosing: INR 2\u20133.9 \u2192 25 IU/kg; INR 4\u20136 \u2192 35 IU/kg; INR >6 \u2192 50 IU/kg. Max single dose 5000 IU. Infuse at 0.12 mL/kg/min (max 8.4 mL/min). Onset: 10\u201315 min. Always co-administer Vitamin K 10 mg IV to prevent INR rebound.',
      weightCalc: [
        { dosePerKg: 25, unit: 'IU', maxDose: 2500, label: 'INR 2\u20133.9' },
        { dosePerKg: 35, unit: 'IU', maxDose: 3500, label: 'INR 4\u20136' },
        { dosePerKg: 50, unit: 'IU', maxDose: 5000, label: 'INR >6' },
      ],
    },
    {
      indication: 'DOAC reversal — ICH (Xa inhibitor, off-label)',
      regimen: '50 IU/kg IV (fixed dose regardless of anti-Xa level). Use when andexanet alfa unavailable. Less targeted than specific reversal but widely available.',
      weightCalc: { dosePerKg: 50, unit: 'IU', maxDose: 5000 },
    },
  ],
  contraindications: [
    'Known anaphylaxis to PCC components',
    'Disseminated intravascular coagulation (DIC) \u2014 relative',
    'Heparin-induced thrombocytopenia (contains heparin) \u2014 use aPCC (FEIBA) instead',
  ],
  cautions: [
    'Thrombotic risk \u2014 contains prothrombotic factors; use lowest effective dose',
    'Contains heparin \u2014 contraindicated in HIT',
    'Volume overload less likely than FFP but still possible in CHF',
    'Shorter duration of effect (~6\u20138h) than Vitamin K \u2014 always co-administer Vitamin K for warfarin reversal',
  ],
  monitoring: 'INR at 15\u201330 min post-infusion, then at 6h and 24h. Anti-Xa level if reversing Xa inhibitor. Watch for thrombotic complications.',
  notes: 'Superior to FFP for warfarin reversal: faster INR correction (minutes vs hours), smaller volume (avoids TACO), and reduced hematoma expansion (INCH trial: 18.3% vs 27.1%). 4-factor contains all vitamin K-dependent factors (II, VII, IX, X) plus Protein C and S. 3-factor PCC (Profilnine) lacks Factor VII and is inferior for warfarin reversal.',
  citations: [
    'Sarode R, et al. Efficacy and Safety of a 4-Factor PCC vs Plasma for Urgent Vitamin K Antagonist Reversal (INCH). Lancet. 2013;382(9899):1251-1256.',
    'Tomaselli GF, et al. 2020 ACC Expert Consensus: Management of Bleeding on Oral Anticoagulants. J Am Coll Cardiol. 2020;76(5):594-622.',
  ],
};

const PROTAMINE: DrugEntry = {
  id: 'protamine',
  name: 'Protamine Sulfate',
  genericName: 'Protamine sulfate',
  drugClass: 'Heparin antagonist',
  route: 'IV',
  indications: ['Heparin reversal', 'LMWH reversal (partial)'],
  dosing: [
    {
      indication: 'Heparin reversal — ICH or life-threatening bleeding',
      regimen: '1 mg per 100 units UFH given in prior 2\u20133 hours. Infuse slowly over 10 min. Max single dose: 50 mg. Onset: 5 minutes. Check PTT 15 min after.',
    },
    {
      indication: 'LMWH (enoxaparin) reversal',
      regimen: 'If enoxaparin given within 8h: 1 mg protamine per 1 mg enoxaparin. If 8\u201312h since dose: 0.5 mg per 1 mg enoxaparin. If >12h: likely no benefit. Only ~60% reversal of LMWH anti-Xa activity.',
    },
  ],
  contraindications: [
    'Allergy to protamine, fish, or fish-derived products',
  ],
  cautions: [
    'Anaphylaxis/anaphylactoid reactions \u2014 higher risk in patients with fish allergy, prior protamine exposure, or NPH insulin use',
    'Hypotension \u2014 infuse slowly (max 5 mg/min); rapid infusion causes cardiovascular collapse',
    'Protamine excess can paradoxically cause anticoagulation \u2014 do not overdose',
    'Heparin rebound may occur 8\u201318h later (protamine has shorter t\u00BD than UFH)',
  ],
  monitoring: 'PTT or ACT 15 min post-dose. Repeat if incomplete reversal. Monitor for anaphylaxis during infusion.',
  notes: 'Derived from salmon sperm. Binds heparin electrostatically to form inactive complex. Complete reversal of UFH, but only partial reversal of LMWH (~60% of anti-Xa activity neutralized). Does NOT reverse fondaparinux.',
  citations: [
    'Frontera JA, et al. Guideline for Reversal of Antithrombotics in Intracranial Hemorrhage. Crit Care Med. 2016;44(12):2251-2257.',
  ],
};

const TRANEXAMIC_ACID: DrugEntry = {
  id: 'tranexamic-acid',
  name: 'Tranexamic Acid (TXA)',
  genericName: 'Tranexamic acid',
  drugClass: 'Antifibrinolytic (lysine analog)',
  route: 'IV',
  indications: ['ICH hemostasis (adjunct)', 'Abnormal uterine bleeding (AUB)', 'Trauma hemorrhage', 'Postpartum hemorrhage', 'Thrombolysis reversal (adjunct)', 'Bradykinin-mediated angioedema'],
  dosing: [
    {
      indication: 'ICH hemostasis (adjunct \u2014 within 3h of onset)',
      regimen: '1 g IV over 10 min. Reduced hematoma expansion (OR 0.82, TICH-2) but no improvement in mortality or functional outcome. Consider as adjunct.',
    },
    {
      indication: 'Abnormal Uterine Bleeding (AUB)',
      regimen: 'Oral: 1.3 g PO TID \u00d7 5 days. IV: 10 mg/kg IV (max 600 mg/dose) q8h. Reduces menstrual blood loss 30\u201355%. Can be used alone if hormonal therapy is contraindicated, or as adjunct to hormonal regimens. Does not affect fertility or cycle regularity.',
      weightCalc: { dosePerKg: 10, unit: 'mg', maxDose: 600, label: 'IV dosing (q8h)' },
    },
    {
      indication: 'Bradykinin-mediated angioedema',
      regimen: '1 g IV load over 10 minutes, then 1 g IV over 8 hours. Blocks plasminogen\u2192plasmin conversion, interrupting the kallikrein amplification spiral that drives bradykinin production. Case series (31 patients): all non-intubated patients avoided intubation. A single dose is often inadequate \u2014 ongoing treatment required as bradykinin-mediated angioedema evolves over days. AVOID in post-tPA angioedema (contraindicated in acute stroke).',
    },
  ],
  contraindications: [
    'Active thromboembolic disease (DVT, PE, stroke)',
    'Subarachnoid hemorrhage (risk of vasospasm)',
    'Impaired color vision (acquired defective)',
    'Post-tPA angioedema (acute ischemic stroke \u2014 thrombotic risk)',
  ],
  cautions: [
    'Seizure risk at high doses (>2 g)',
    'Renal impairment \u2014 dose reduce if CrCl <50 mL/min',
    'Thrombotic risk \u2014 avoid in patients with active DVT/PE',
    'Concurrent OCP use requires careful consideration of additive thrombotic risk',
  ],
  monitoring: 'ICH: Repeat CT at 6h to assess hematoma stability. AUB: Bleeding pattern assessment. Watch for thrombotic complications.',
  notes: 'Competitively inhibits plasminogen activation, stabilizing clots. ICH: TICH-2 trial (2,325 patients) showed significant reduction in hematoma expansion but no functional outcome benefit. AUB: Cochrane review (Lethaby 2000) showed 30\u201355% reduction in menstrual blood loss. FDA-approved for cyclic heavy menstrual bleeding (Lysteda).',
  citations: [
    'Sprigg N, et al. Tranexamic acid for hyperacute primary IntraCerebral Haemorrhage (TICH-2). Lancet. 2018;391(10135):2107-2115.',
    'Steiner T, et al. ESO/EANS guideline on stroke due to spontaneous ICH. Eur Stroke J. 2025;10(4):1007-1086.',
    'Beauch\u00EAne C, et al. TXA as first-line for ACEi bradykinin angioedema. Rev Med Interne. 2018;39(10):772-776.',
    'Wang K, et al. TXA for ACEi-induced angioedema. Am J Emerg Med. 2021;43:292.e5-e7.',
  ],
};

const VITAMIN_K: DrugEntry = {
  id: 'vitamin-k',
  name: 'Vitamin K (Phytonadione)',
  genericName: 'Phytonadione (Vitamin K1)',
  drugClass: 'Vitamin K (coagulation cofactor)',
  route: 'IV',
  indications: ['Warfarin reversal', 'Coagulopathy due to vitamin K deficiency'],
  dosing: [
    {
      indication: 'Warfarin reversal — ICH (always with PCC)',
      regimen: '10 mg IV slow push over 15\u201330 min. IV route preferred \u2014 oral takes 12\u201324h. Prevents INR rebound after PCC wears off (6\u20138h). Must co-administer with PCC for immediate reversal; Vitamin K alone is too slow.',
    },
  ],
  contraindications: [
    'Hypersensitivity to phytonadione (rare)',
  ],
  cautions: [
    'Anaphylactoid reaction risk with IV administration \u2014 infuse slowly',
    'IV route can rarely cause cardiovascular collapse if given too rapidly',
    'SC route has erratic absorption \u2014 avoid in emergencies',
    'Renders patient warfarin-resistant for 1\u20132 weeks (relevant for re-anticoagulation)',
  ],
  monitoring: 'INR at 6h and 24h post-administration. Confirm sustained correction (not just PCC effect).',
  notes: 'Essential adjunct to PCC for warfarin reversal in ICH. PCC provides immediate but temporary factor replacement (~6\u20138h), while Vitamin K stimulates hepatic synthesis of factors II, VII, IX, X over 12\u201324h. Without Vitamin K, INR will rebound when PCC effect wears off, risking hematoma re-expansion.',
  citations: [
    'Greenberg SM, et al. 2022 Guideline for Management of Spontaneous ICH. Stroke. 2022;53(7):e282-e361.',
    'Tomaselli GF, et al. 2020 ACC: Management of Bleeding on Oral Anticoagulants. J Am Coll Cardiol. 2020;76(5):594-622.',
  ],
};

// -------------------------------------------------------------------
// Status Epilepticus Drugs
// -------------------------------------------------------------------

const DIAZEPAM: DrugEntry = {
  id: 'diazepam',
  name: 'Diazepam (Valium)',
  genericName: 'Diazepam',
  drugClass: 'Benzodiazepine (long-acting)',
  route: 'IV/PR',
  indications: ['Status epilepticus (alternative)', 'Seizure disorders'],
  dosing: [
    {
      indication: 'Status Epilepticus — IV',
      regimen: '0.15-0.2 mg/kg IV (max 10 mg), may repeat once. Push slowly over 2 min. Alternative to lorazepam when lorazepam unavailable. Lower seizure termination rate than lorazepam (56% vs 65%). Shorter duration of anticonvulsant effect — seizures more likely to recur.',
      weightCalc: { dosePerKg: 0.2, unit: 'mg', maxDose: 10 },
    },
    {
      indication: 'Status Epilepticus — Rectal',
      regimen: '0.2-0.5 mg/kg PR (max 20 mg), one time. Used when IV/IM not available. No longer recommended as first-line — IM midazolam is preferred. Rectal route historically used in pediatric and prehospital settings.',
      weightCalc: { dosePerKg: 0.5, unit: 'mg', maxDose: 20, label: 'Rectal (max dose)' },
    },
  ],
  contraindications: [
    'Acute narrow-angle glaucoma',
    'Severe respiratory insufficiency',
    'Myasthenia gravis',
    'Severe hepatic insufficiency',
  ],
  cautions: [
    'Respiratory depression — especially with repeated doses or opioid co-administration',
    'Hypotension with rapid IV push',
    'Propylene glycol toxicity with high doses or prolonged infusion',
    'Contains propylene glycol and benzoic acid — not IM compatible (unpredictable absorption)',
    'Rectal diazepam gel (Diastat) available for home/prehospital use',
  ],
  monitoring: 'Continuous SpO2, respiratory rate, blood pressure. Have BVM and flumazenil available.',
  notes: 'Historically first BZD used for SE. Now second-line to lorazepam (IV) and midazolam (IM). Longer half-life than lorazepam but shorter anticonvulsant duration paradoxically — highly lipophilic, redistributes rapidly from brain to peripheral tissues. For this reason, lorazepam (less lipophilic, stays in brain longer) is preferred.',
  citations: [
    'Betjemann JP, Bhatt J, Engel A. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).',
    'Treiman DM, et al. A Comparison of Four Treatments for Generalized Convulsive Status Epilepticus. N Engl J Med. 1998;339(12):792-798.',
  ],
};

const FOSPHENYTOIN: DrugEntry = {
  id: 'fosphenytoin',
  name: 'Fosphenytoin (Cerebyx)',
  genericName: 'Fosphenytoin sodium',
  drugClass: 'Hydantoin anticonvulsant (prodrug of phenytoin)',
  route: 'IV/IM',
  indications: ['Status epilepticus (2nd-line)', 'Seizure prophylaxis'],
  dosing: [
    {
      indication: 'Status Epilepticus — 2nd line (ESETT)',
      regimen: '20 mg PE/kg IV (max 1500 mg PE) at max rate 150 mg PE/min. ESETT trial: 45% seizure termination at 60 min (equivalent to levetiracetam and valproate). Dosed in PE (phenytoin equivalents). Requires continuous cardiac monitoring during infusion and for 20 min after.',
      weightCalc: { dosePerKg: 20, unit: 'mg PE', maxDose: 1500 },
    },
  ],
  contraindications: [
    'Sinus bradycardia, sinoatrial block, second/third-degree AV block, Adams-Stokes syndrome',
    'Known hypersensitivity to hydantoins',
    'Decompensated heart failure',
    'Drug/alcohol-induced seizures (ineffective)',
  ],
  cautions: [
    'Cardiac arrhythmia — continuous telemetry required during infusion',
    'Hypotension — infuse at rate ≤150 mg PE/min',
    'QT prolongation',
    'Stevens-Johnson syndrome / toxic epidermal necrolysis (rare, HLA-B*15:02 in Southeast Asian descent)',
    'Teratogenic — use with caution in pregnancy (1st trimester)',
    'Purple glove syndrome does NOT occur with fosphenytoin (only with IV phenytoin)',
  ],
  monitoring: 'Continuous cardiac monitoring during and 20 min after infusion. Blood pressure q5 min during infusion. Free phenytoin level 2h after loading (target 1-2 mcg/mL free, 10-20 mcg/mL total).',
  notes: 'Water-soluble prodrug of phenytoin — can be given IM (unlike phenytoin). Converted to phenytoin by phosphatases in 7-15 min. INEFFECTIVE for drug/alcohol-induced seizures — phenytoin\'s selective voltage-gated sodium channel action cannot overcome diffuse CNS toxicity. ESETT trial showed equivalent efficacy to levetiracetam and valproate, but cardiac monitoring requirement and drug interaction profile make it less favorable in many clinical scenarios.',
  citations: [
    'Kapur J, et al. Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus (ESETT). N Engl J Med. 2019;381(22):2103-2113.',
    'Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).',
  ],
};

const LACOSAMIDE: DrugEntry = {
  id: 'lacosamide',
  name: 'Lacosamide (Vimpat)',
  genericName: 'Lacosamide',
  drugClass: 'Anticonvulsant (sodium channel — slow inactivation enhancer)',
  route: 'IV',
  indications: ['Status epilepticus (adjunct)', 'Refractory SE adjunct'],
  dosing: [
    {
      indication: 'Status Epilepticus — adjunct',
      regimen: '200-400 mg IV over 15 min. Not FDA-approved for SE but emerging as adjunct after BZD and 2nd-line ASM, before escalation to anesthetic agents. Meta-analysis: 57% overall efficacy. No large RCTs in SE; one trial showed noninferiority to fosphenytoin in NCSE.',
    },
  ],
  contraindications: [
    'Known second/third-degree AV block without pacemaker',
    'Known hypersensitivity to lacosamide',
  ],
  cautions: [
    'PR interval prolongation — obtain ECG before administration',
    'Cardiac arrhythmia in patients with cardiac conduction disease',
    'Dizziness, diplopia, nausea (common)',
    'Use with caution alongside other PR-prolonging medications',
  ],
  monitoring: 'ECG before and after administration (PR interval). Cardiac monitoring if cardiac history. Therapeutic drug level monitoring not routinely available.',
  notes: 'Enhances slow inactivation of voltage-gated sodium channels — mechanistically different from phenytoin (which affects fast inactivation). Not yet standard of care for SE but increasingly used as adjunct between conventional 2nd-line ASMs and anesthetic infusions. Advantages: no significant drug interactions, no hepatic metabolism issues, simple flat dosing (not weight-based), well-tolerated.',
  citations: [
    'Strzelczyk A, et al. Lacosamide in Status Epilepticus: Systematic Review of Current Evidence. Epilepsia. 2017;58(6):933-950.',
    'Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).',
  ],
};

const LORAZEPAM: DrugEntry = {
  id: 'lorazepam',
  name: 'Lorazepam (Ativan)',
  genericName: 'Lorazepam',
  drugClass: 'Benzodiazepine (intermediate-acting)',
  route: 'IV/IM',
  indications: ['Status epilepticus (first-line IV)', 'Seizure disorders', 'Acute agitation (intoxication/withdrawal)'],
  dosing: [
    {
      indication: 'Status Epilepticus — IV (first-line)',
      regimen: '0.1 mg/kg IV push over 2 min (max 4 mg/dose). May repeat once in 5-10 min if seizure persists. Total max 8 mg. Preferred IV benzodiazepine — higher seizure termination rate than diazepam (65% vs 56%) and longer anticonvulsant duration.',
      weightCalc: { dosePerKg: 0.1, unit: 'mg', maxDose: 4 },
    },
    {
      indication: 'Acute agitation (intoxication/withdrawal)',
      regimen: '1-2 mg IV push over 1-2 min, or IM. May repeat q10-15 min PRN. Preferred for alcohol/sedative withdrawal-related agitation. Avoid in elderly delirium (independent risk factor for delirium, falls, respiratory depression). Unpredictable IM absorption — IV preferred when available.',
      weightCalc: { dosePerKg: 0.02, unit: 'mg', maxDose: 2 },
    },
  ],
  contraindications: [
    'Acute narrow-angle glaucoma',
    'Known hypersensitivity to benzodiazepines',
    'Severe respiratory insufficiency (without ventilatory support)',
  ],
  cautions: [
    'Respiratory depression — risk increases with repeated doses, opioid co-administration, and elderly patients',
    'Hypotension with rapid IV push',
    'Requires refrigeration — check for precipitate before administration',
    'Contains propylene glycol — accumulation risk with prolonged/high-dose use',
    'Reduce dose 30-50% in elderly or hepatic impairment',
    'Paradoxical agitation in elderly and pediatric patients',
  ],
  monitoring: 'Continuous SpO2, respiratory rate, blood pressure. Capnography if available. Have BVM, suction, and flumazenil available. Monitor for return of seizure activity.',
  notes: 'First-line IV benzodiazepine for SE per AES and NCS guidelines. Less lipophilic than diazepam — remains in the brain longer, providing more sustained anticonvulsant effect (12-24h vs 15-30 min for diazepam). Onset: 2-3 min IV. When IV access is unavailable, IM midazolam (not IM lorazepam) is preferred — lorazepam has unpredictable IM absorption. Underdosing of BZDs is a common error that leads to treatment failure.',
  citations: [
    'Betjemann JP, Bhatt J, Engel A. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).',
    'Silbergleit R, et al. RAMPART: Intramuscular versus Intravenous Therapy for Prehospital SE. N Engl J Med. 2012;366(7):591-600.',
    'Treiman DM, et al. A Comparison of Four Treatments for Generalized Convulsive Status Epilepticus. N Engl J Med. 1998;339(12):792-798.',
  ],
};

const PENTOBARBITAL: DrugEntry = {
  id: 'pentobarbital',
  name: 'Pentobarbital (Nembutal)',
  genericName: 'Pentobarbital sodium',
  drugClass: 'Barbiturate anesthetic',
  route: 'IV',
  indications: ['Refractory status epilepticus'],
  dosing: [
    {
      indication: 'Refractory SE — continuous infusion',
      regimen: 'Load 5-15 mg/kg IV bolus over 1 hour, then infuse 0.5-5 mg/kg/hr. Titrate to EEG burst suppression. Provides deepest level of cerebral suppression among SE infusion agents. Maintain suppression 24-48h before first wean attempt.',
      weightCalc: { dosePerKg: 10, unit: 'mg', label: 'Loading dose (midrange)' },
    },
  ],
  contraindications: [
    'Severe cardiovascular instability (without vasopressor support)',
    'Porphyria',
  ],
  cautions: [
    'Severe hypotension — almost always requires vasopressor support',
    'Respiratory depression — requires mechanical ventilation',
    'Immunosuppression with prolonged use',
    'Prolonged sedation (very long half-life — 15-50 hours)',
    'Paralytic ileus',
    'Propylene glycol toxicity with prolonged infusion',
  ],
  monitoring: 'Continuous EEG (mandatory — target burst suppression). Arterial line for continuous BP. Central venous access. Vasopressors typically required. Daily labs: CBC, CMP, triglycerides, propylene glycol level if available.',
  notes: 'Reserved for SE refractory to midazolam and propofol. Provides the deepest cerebral suppression but at the cost of significant hemodynamic compromise. Most patients require vasopressor support. Very long half-life makes weaning challenging — prolonged ICU stays common. Thiopental is an alternative barbiturate anesthetic (load 2-7 mg/kg, infuse 0.5-5 mg/kg/hr) but is less commonly available in the US.',
  citations: [
    'Claassen J, et al. Treatment of Refractory SE with Pentobarbital, Propofol, or Midazolam: A Systematic Review. Epilepsia. 2002;43(2):146-153.',
    'Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).',
  ],
};

const PHENOBARBITAL: DrugEntry = {
  id: 'phenobarbital',
  name: 'Phenobarbital',
  genericName: 'Phenobarbital sodium',
  drugClass: 'Barbiturate anticonvulsant',
  route: 'IV',
  indications: ['Status epilepticus (2nd-line alternative)', 'Neonatal seizures', 'Alcohol withdrawal seizures'],
  dosing: [
    {
      indication: 'Status Epilepticus — 2nd line',
      regimen: '15-20 mg/kg IV at max rate 50-100 mg/min. Max single dose 2000 mg. Use when levetiracetam, valproate, and fosphenytoin are unavailable or contraindicated. Also effective as adjunct for alcohol withdrawal seizures. May be used as first-line emergent therapy when benzodiazepines are unavailable.',
      weightCalc: { dosePerKg: 20, unit: 'mg', maxDose: 2000 },
    },
  ],
  contraindications: [
    'Severe respiratory depression (without ventilatory support)',
    'Porphyria',
    'Severe hepatic impairment',
  ],
  cautions: [
    'Respiratory depression — have intubation supplies ready before administration',
    'Hypotension — infuse slowly, monitor BP closely',
    'Excessive sedation — synergistic with benzodiazepines',
    'Long half-life (53-118 hours) — effects persist long after discontinuation',
    'Drug interactions — potent CYP inducer',
  ],
  monitoring: 'Continuous SpO2, respiratory rate, blood pressure q5 min during infusion. Have intubation supplies at bedside. Phenobarbital level 12-24h post-load (target 20-40 mcg/mL for SE).',
  notes: 'Oldest anticonvulsant still in clinical use. Acts on GABAA receptors differently than benzodiazepines — increases duration (not frequency) of chloride channel opening, providing anticonvulsant effect even when GABAA receptors are partially internalized. This makes it useful when BZDs fail. First-line for neonatal seizures. Effective for alcohol withdrawal seizures (can be used when BZDs are insufficient).',
  citations: [
    'Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).',
    'Brophy GM, et al. Guidelines for the Evaluation and Management of Status Epilepticus. Neurocrit Care. 2012;17(1):3-23.',
  ],
};

const PROCHLORPERAZINE: DrugEntry = {
  id: 'prochlorperazine',
  name: 'Prochlorperazine',
  genericName: 'Prochlorperazine',
  drugClass: 'Phenothiazine / Dopamine antagonist antiemetic',
  route: 'PR/IM',
  indications: ['Nausea and vomiting of pregnancy (NVP)', 'Nausea/vomiting (general)'],
  dosing: [
    {
      indication: 'NVP — rectal',
      regimen: '25 mg PR every 12 hours. Second-line agent in ACOG stepwise NVP pathway. Useful when patient cannot tolerate oral medications.',
    },
    {
      indication: 'Nausea/vomiting — IM',
      regimen: '5-10 mg IM every 6-8 hours (max 40 mg/day).',
    },
  ],
  contraindications: [
    'Known hypersensitivity to phenothiazines',
    'CNS depression / comatose states',
    'Bone marrow suppression',
  ],
  cautions: [
    'Extrapyramidal symptoms (dystonia, akathisia) — treat with diphenhydramine',
    'Neuroleptic malignant syndrome (rare)',
    'Orthostatic hypotension',
    'Sedation',
    'QT prolongation',
  ],
  monitoring: 'Symptom improvement. Watch for extrapyramidal symptoms.',
  notes: 'Second-line antiemetic for NVP. Rectal route is preferred in the ACOG stepwise pathway for patients who cannot tolerate oral medications. Effective but carries risk of extrapyramidal effects, particularly in young women.',
  citations: [
    'ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.',
  ],
};

const PROMETHAZINE: DrugEntry = {
  id: 'promethazine',
  name: 'Promethazine',
  genericName: 'Promethazine hydrochloride',
  drugClass: 'Phenothiazine / Antihistamine antiemetic',
  route: 'IV/PO/PR',
  indications: ['Nausea and vomiting of pregnancy (NVP)', 'Hyperemesis gravidarum', 'Nausea/vomiting (general)'],
  dosing: [
    {
      indication: 'NVP — oral/rectal',
      regimen: '12.5 mg PO or PR every 6 hours. Second-line agent in ACOG stepwise NVP pathway.',
    },
    {
      indication: 'NVP / Hyperemesis — IV',
      regimen: '12.5 mg IV every 6 hours. MUST dilute and administer slowly. NEVER give IV push undiluted — severe tissue necrosis risk.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to phenothiazines',
    'CNS depression / comatose states',
    'Intra-arterial injection (gangrene risk)',
    'Subcutaneous injection (tissue necrosis)',
  ],
  cautions: [
    'SEVERE tissue necrosis if extravasation or intra-arterial injection — black box warning',
    'Preferred route is deep IM or well-running IV, diluted, slow push',
    'Significant sedation',
    'Respiratory depression (especially combined with opioids)',
    'Extrapyramidal symptoms',
  ],
  monitoring: 'IV site integrity (extravasation risk). Sedation and respiratory status. Symptom improvement.',
  notes: 'Available in oral, rectal, and parenteral formulations. IV administration carries a BLACK BOX WARNING for severe tissue injury — must be diluted and given through a well-running IV line. IM injection should be deep into large muscle. Despite risks, widely used and effective antiemetic in pregnancy.',
  citations: [
    'ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.',
  ],
};

const PROPOFOL: DrugEntry = {
  id: 'propofol',
  name: 'Propofol (Diprivan)',
  genericName: 'Propofol',
  drugClass: 'Sedative-hypnotic / IV anesthetic',
  route: 'IV',
  indications: ['Refractory status epilepticus', 'Procedural sedation', 'RSI induction'],
  dosing: [
    {
      indication: 'Refractory SE — continuous infusion',
      regimen: 'Load 1-2 mg/kg IV bolus, then infuse 30-200 mcg/kg/min (1.8-12 mg/kg/hr). Titrate to EEG burst suppression. Maintain 24-48h before wean attempt. Rapid onset and offset — easier to titrate than barbiturates.',
      weightCalc: { dosePerKg: 2, unit: 'mg', label: 'Loading bolus' },
    },
  ],
  contraindications: [
    'Known hypersensitivity to propofol, eggs, or soy (contains egg lecithin and soybean oil)',
    'Severe cardiovascular instability',
    'Children <16 years for prolonged ICU sedation (PRIS risk)',
  ],
  cautions: [
    'Propofol infusion syndrome (PRIS) — rhabdomyolysis, metabolic acidosis, cardiac failure, hyperkalemia, hyperlipidemia. Risk increases with doses >80 mcg/kg/min for >48h',
    'Hypotension — bolus may cause significant BP drop',
    'Respiratory depression — requires mechanical ventilation for continuous infusion',
    'Hypertriglyceridemia — check triglycerides q24-48h',
    'Contains lipid emulsion — counts toward caloric intake (1.1 kcal/mL)',
    'Risk of bacterial contamination — use aseptic technique, discard after 12h',
  ],
  monitoring: 'Continuous EEG (mandatory). Arterial line. Triglycerides q24-48h. CK and lactate q12-24h (PRIS monitoring). ABG for metabolic acidosis. Urine color (green discoloration is benign).',
  notes: 'Rapid onset (30-60 sec) and short duration — allows frequent neurologic reassessment if infusion stopped briefly. More likely than midazolam to require addition of a second anesthetic infusion per retrospective data. PRIS is the major concern — monitor closely when using high doses for >48h. Mechanism: enhances GABAA receptor activity and inhibits NMDA receptors.',
  citations: [
    'Claassen J, et al. Treatment of Refractory SE with Pentobarbital, Propofol, or Midazolam: A Systematic Review. Epilepsia. 2002;43(2):146-153.',
    'Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).',
  ],
};

const PYRIDOXINE: DrugEntry = {
  id: 'pyridoxine',
  name: 'Pyridoxine (Vitamin B6)',
  genericName: 'Pyridoxine hydrochloride',
  drugClass: 'Vitamin / Antidote',
  route: 'IV/PO',
  indications: ['Isoniazid (INH) toxicity — seizures', 'Pyridoxine-dependent epilepsy (neonatal)', 'Nausea and vomiting of pregnancy (NVP)'],
  dosing: [
    {
      indication: 'INH toxicity — seizure antidote',
      regimen: 'Gram-for-gram replacement of INH ingested. If amount unknown: 5 g IV over 5 min. May repeat 5 g IV q5-10 min until seizures stop (max total 70 mg/kg). INH depletes pyridoxine → GABA synthesis fails → refractory seizures. Standard ASMs are ineffective without pyridoxine.',
    },
    {
      indication: 'Pyridoxine-dependent epilepsy (neonatal/infant)',
      regimen: '100 mg IV single dose. Consider in neonates/infants with unexplained refractory seizures. May be both diagnostic and therapeutic. If seizures stop, confirms diagnosis.',
    },
    {
      indication: 'NVP — first-line antiemetic (ACOG Level A)',
      regimen: '10-25 mg PO TID, alone or in combination with doxylamine 12.5 mg PO TID. First-line pharmacologic therapy per ACOG. Superior efficacy when combined with doxylamine.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to pyridoxine',
  ],
  cautions: [
    'Rapid IV push in large doses may cause transient sensory neuropathy',
    'IV formulation may not be readily available — check pharmacy stock proactively in suspected INH ingestion',
  ],
  monitoring: 'Seizure cessation. Mental status improvement. ABG for acidosis correction.',
  notes: 'Critical antidote for INH-induced seizures. INH inhibits pyridoxal kinase, depleting active pyridoxine (pyridoxal 5\'-phosphate), which is an essential cofactor for glutamic acid decarboxylase — the enzyme that converts glutamate to GABA. Without GABA synthesis, seizures are refractory to all standard anticonvulsants. Always give pyridoxine when INH toxicity is suspected — benzodiazepines alone will not terminate the seizures.',
  citations: [
    'Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).',
  ],
};

const TMP_SMX: DrugEntry = {
  id: 'tmp-smx',
  name: 'TMP-SMX (Bactrim)',
  genericName: 'Trimethoprim-sulfamethoxazole',
  drugClass: 'Sulfonamide antibiotic combination',
  route: 'PO',
  indications: ['Acute infectious diarrhea (pediatric first-line)', 'Traveler\'s diarrhea', 'PJP prophylaxis (HIV, CD4 <200)'],
  dosing: [
    {
      indication: 'Acute diarrhea',
      regimen: 'Adult: 1 DS tablet (160/800 mg) PO BID × 3-5 days.',
    },
    {
      indication: 'Traveler diarrhea',
      regimen: 'Adult: 1 DS tablet (160/800 mg) PO BID × 3-5 days. Combination with loperamide is most efficacious regimen.',
    },
    {
      indication: 'Pediatric diarrhea',
      regimen: '8 mg/kg/day (TMP component) divided BID × 3-5 days. Max 320 mg TMP per day.',
      weightCalc: { dosePerKg: 8, unit: 'mg TMP', maxDose: 320, dailyDivided: 2 },
    },
    {
      indication: 'PJP Prophylaxis (CD4 <200)',
      regimen: '1 DS tablet (160/800 mg) PO daily OR 1 DS tablet PO 3x/week. Continue until CD4 >200 for ≥3 months on ART.',
    },
  ],
  contraindications: [
    'Sulfonamide allergy',
    'Pregnancy (especially first trimester and near term) \u2014 folate antagonism',
    'Severe hepatic or renal insufficiency',
    'Megaloblastic anemia due to folate deficiency',
    'Infants under 2 months',
  ],
  cautions: [
    'Photosensitivity \u2014 advise sun protection',
    'Can cause hyperkalemia \u2014 monitor potassium in renal impairment',
    'Increases warfarin effect \u2014 monitor INR',
    'Increases phenytoin levels',
    'Stevens-Johnson syndrome risk (rare)',
    'G6PD deficiency \u2014 risk of hemolytic anemia',
  ],
  monitoring: 'CBC, renal function, potassium. INR if on warfarin. Watch for rash (discontinue immediately).',
  notes: 'First-line empiric antibiotic for children with acute infectious diarrhea. In adults, used as alternative to fluoroquinolones. Only 71% susceptibility among E. coli isolates limits utility in some settings. Combination with loperamide is the most efficacious regimen for traveler\'s diarrhea.',
  citations: [
    'Ericsson CD, et al. Treatment of Traveler\'s Diarrhea with Sulfamethoxazole and Trimethoprim and Loperamide. JAMA. 1990;263(2):257-261.',
    'Shane AL, et al. 2017 IDSA Clinical Practice Guidelines for the Diagnosis and Management of Infectious Diarrhea. Clin Infect Dis. 2017;65(12):e45-e80.',
  ],
};

const THIOPENTAL: DrugEntry = {
  id: 'thiopental',
  name: 'Thiopental',
  genericName: 'Thiopental sodium',
  drugClass: 'Barbiturate anesthetic',
  route: 'IV',
  indications: ['Refractory status epilepticus (alternative to pentobarbital)'],
  dosing: [
    {
      indication: 'Refractory SE — continuous infusion',
      regimen: 'Load 2-7 mg/kg IV bolus, then infuse 0.5-5 mg/kg/hr. Titrate to EEG burst suppression. Alternative to pentobarbital. Less commonly available in the US.',
      weightCalc: { dosePerKg: 5, unit: 'mg', label: 'Loading dose (midrange)' },
    },
  ],
  contraindications: [
    'Porphyria (absolute)',
    'Severe cardiovascular instability',
    'Status asthmaticus',
  ],
  cautions: [
    'Severe hypotension — vasopressor support typically required',
    'Respiratory depression — requires mechanical ventilation',
    'Immunosuppression with prolonged use',
    'Tissue necrosis with extravasation (highly alkaline, pH 10-11)',
    'Very long half-life (11-36 hours) — prolonged recovery',
  ],
  monitoring: 'Continuous EEG (mandatory). Arterial line. Central venous access. Vasopressors typically required. Monitor for extravasation at IV site.',
  notes: 'Ultra-short-acting barbiturate anesthetic used for refractory SE when other agents fail. Less available than pentobarbital in the US. Similar hemodynamic profile to pentobarbital — significant hypotension, requires ICU-level support. Alkaline solution (pH 10-11) — extravasation causes severe tissue necrosis. Primarily used in European and international settings.',
  citations: [
    'Claassen J, et al. Treatment of Refractory SE with Pentobarbital, Propofol, or Midazolam. Epilepsia. 2002;43(2):146-153.',
  ],
};

const VALPROATE: DrugEntry = {
  id: 'valproate',
  name: 'Valproate Sodium (Depacon)',
  genericName: 'Valproate sodium / Valproic acid',
  drugClass: 'Anticonvulsant / Mood stabilizer',
  route: 'IV',
  indications: ['Status epilepticus (2nd-line)', 'Seizure disorders', 'Bipolar disorder'],
  dosing: [
    {
      indication: 'Status Epilepticus — 2nd line (ESETT)',
      regimen: '40 mg/kg IV (max 3000 mg) over 10 min. ESETT trial: 46% seizure termination at 60 min (equivalent to levetiracetam and fosphenytoin). Well-tolerated even with larger doses and faster rates of infusion.',
      weightCalc: { dosePerKg: 40, unit: 'mg', maxDose: 3000 },
    },
  ],
  contraindications: [
    'Pregnancy (Category X — teratogenic, neural tube defects)',
    'Hepatic disease or significant hepatic dysfunction',
    'Known mitochondrial disorders (Alpers syndrome — fatal hepatotoxicity)',
    'Known urea cycle disorders (risk of fatal hyperammonemic encephalopathy)',
    'Pancreatitis (active or history)',
  ],
  cautions: [
    'Thrombocytopenia — check platelets before and after administration',
    'Hyperammonemia — check ammonia if altered mental status persists after seizure cessation',
    'Hepatotoxicity — greatest risk in children <2 years on polytherapy',
    'Coagulopathy — may impair coagulation',
    'Teratogenic — avoid in women of childbearing age when possible',
    'Drug interactions — inhibits CYP2C9, displaces protein-bound drugs',
  ],
  monitoring: 'Valproic acid level 2h after loading (target 50-100 mcg/mL, up to 150 for SE). CBC with platelets. Ammonia level if altered mental status. LFTs. Coagulation studies.',
  notes: 'Broad-spectrum anticonvulsant effective against generalized and focal seizures. ESETT trial demonstrated equivalent efficacy to levetiracetam and fosphenytoin for BZD-refractory SE. Well-tolerated even at rapid infusion rates. Major limitation is teratogenicity — should be avoided in pregnancy. Hyperammonemia can cause confusion that mimics ongoing SE — always check ammonia in patients not returning to baseline.',
  citations: [
    'Kapur J, et al. ESETT: Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus. N Engl J Med. 2019;381(22):2103-2113.',
    'Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).',
    'Yasiry Z, Shorvon SD. Relative Effectiveness of Antiepileptic Drugs in Treatment of BZD-Resistant Convulsive SE. Epilepsia. 2014;55(9):1349-1361.',
  ],
};

// -------------------------------------------------------------------
// Meningitis / Encephalitis — New Drug Entries
// -------------------------------------------------------------------

const AMPHOTERICIN_B: DrugEntry = {
  id: 'amphotericin-b',
  name: 'Amphotericin B Liposomal (AmBisome)',
  genericName: 'Amphotericin B liposomal',
  drugClass: 'Polyene Antifungal',
  route: 'IV',
  indications: ['Cryptococcal meningitis (induction)', 'Invasive fungal infections'],
  dosing: [
    {
      indication: 'Cryptococcal Meningitis (induction)',
      regimen: '3-4 mg/kg/day IV × 1 week (induction phase). Combine with flucytosine 25 mg/kg PO q6h. Follow with fluconazole 400-800 mg/day for consolidation. Initiate ONLY after ID consultation.',
      weightCalc: { dosePerKg: 4, unit: 'mg' },
    },
  ],
  contraindications: [
    'Known hypersensitivity to amphotericin B or any component',
  ],
  cautions: [
    'Nephrotoxicity — monitor renal function daily; prehydrate with NS',
    'Infusion-related reactions (fever, rigors, hypotension) — premedicate with acetaminophen ± diphenhydramine',
    'Hypokalemia and hypomagnesemia — monitor and replace electrolytes',
    'Liposomal formulation has significantly less nephrotoxicity than conventional amphotericin B deoxycholate',
  ],
  monitoring: 'Daily: BMP (creatinine, potassium, magnesium). Twice weekly: CBC, LFTs. Monitor for infusion reactions.',
  notes: 'Liposomal formulation (AmBisome) is strongly preferred over conventional amphotericin B deoxycholate due to reduced nephrotoxicity. Cochrane review (13 studies, 2426 participants) found 1 week of amphotericin B + flucytosine followed by fluconazole was most effective for HIV-associated cryptococcal meningitis. Do NOT co-administer corticosteroids — worsened outcomes in cryptococcal disease.',
  citations: [
    'Tenforde MW, et al. Treatment for HIV-associated cryptococcal meningitis. Cochrane Database Syst Rev. 2018;7:CD005647.',
    'Perfect JR, et al. Clinical practice guidelines for the management of cryptococcal disease: 2010 update by IDSA. Clin Infect Dis. 2010;50(3):291-322.',
  ],
};

const FLUCONAZOLE: DrugEntry = {
  id: 'fluconazole',
  name: 'Fluconazole (Diflucan)',
  genericName: 'Fluconazole',
  drugClass: 'Triazole Antifungal',
  route: 'PO/IV',
  indications: ['Cryptococcal meningitis (consolidation/maintenance)', 'Invasive candidiasis'],
  dosing: [
    {
      indication: 'Cryptococcal Meningitis (consolidation)',
      regimen: '400-800 mg PO/IV daily. Begin after 1-week induction with amphotericin B + flucytosine. Continue for minimum 8 weeks consolidation, then 200 mg/day maintenance until immune reconstitution (CD4 >200 for ≥6 months on ART).',
    },
  ],
  contraindications: [
    'Known hypersensitivity to fluconazole or other azole antifungals',
    'Co-administration with terfenadine (when fluconazole ≥400 mg/day)',
  ],
  cautions: [
    'QT prolongation — avoid with other QT-prolonging agents',
    'Hepatotoxicity — monitor LFTs',
    'Multiple CYP2C9/CYP3A4 drug interactions — review medication list',
    'Dose adjust for renal impairment (CrCl <50 mL/min)',
  ],
  monitoring: 'LFTs at baseline and periodically. Renal function. ECG if concurrent QT-prolonging medications. Repeat CSF CrAg to document clearance.',
  notes: 'Used for consolidation and maintenance phases of cryptococcal meningitis treatment after induction with amphotericin B + flucytosine. NOT adequate as monotherapy for induction — associated with higher mortality. Maintenance therapy continues until immune reconstitution on ART.',
  citations: [
    'Perfect JR, et al. Clinical practice guidelines for the management of cryptococcal disease: 2010 update by IDSA. Clin Infect Dis. 2010;50(3):291-322.',
    'Tenforde MW, et al. Treatment for HIV-associated cryptococcal meningitis. Cochrane Database Syst Rev. 2018;7:CD005647.',
  ],
};

const FLUCYTOSINE: DrugEntry = {
  id: 'flucytosine',
  name: 'Flucytosine (Ancobon)',
  genericName: 'Flucytosine (5-fluorocytosine)',
  drugClass: 'Antifungal (Pyrimidine Analog)',
  route: 'PO',
  indications: ['Cryptococcal meningitis (induction, with amphotericin B)'],
  dosing: [
    {
      indication: 'Cryptococcal Meningitis (induction)',
      regimen: '25 mg/kg PO q6h × 1 week (induction phase). Always combine with amphotericin B liposomal. Dose adjust for renal impairment. Initiate ONLY after ID consultation.',
      weightCalc: { dosePerKg: 25, unit: 'mg', dailyDivided: 4 },
    },
  ],
  contraindications: [
    'Known hypersensitivity to flucytosine',
    'Severe renal impairment without dose adjustment',
  ],
  cautions: [
    'Myelosuppression (leukopenia, thrombocytopenia) — dose-related, monitor CBC',
    'Hepatotoxicity — monitor LFTs',
    'GI toxicity (nausea, vomiting, diarrhea)',
    'Renal impairment — dose reduction required; amphotericin B may worsen renal function and increase flucytosine toxicity',
    'Therapeutic drug monitoring recommended when available (target peak 30-80 mcg/mL)',
  ],
  monitoring: 'CBC twice weekly (myelosuppression). LFTs weekly. Renal function daily (dose adjust if creatinine rises). Flucytosine levels if available (peak 30-80 mcg/mL).',
  notes: 'Synergistic with amphotericin B for cryptococcal meningitis — combination reduces mortality vs amphotericin B alone. Never used as monotherapy (rapid resistance development). Limited availability and high cost in some settings. Cochrane evidence supports 1 week of amphotericin B + flucytosine as optimal induction.',
  citations: [
    'Tenforde MW, et al. Treatment for HIV-associated cryptococcal meningitis. Cochrane Database Syst Rev. 2018;7:CD005647.',
    'Perfect JR, et al. Clinical practice guidelines for the management of cryptococcal disease: 2010 update by IDSA. Clin Infect Dis. 2010;50(3):291-322.',
  ],
};

const MEROPENEM: DrugEntry = {
  id: 'meropenem',
  name: 'Meropenem (Merrem)',
  genericName: 'Meropenem',
  drugClass: 'Carbapenem',
  route: 'IV',
  indications: ['Bacterial meningitis (cephalosporin allergy or multidrug-resistant organisms)', 'Healthcare-associated meningitis'],
  dosing: [
    {
      indication: 'Bacterial Meningitis',
      regimen: '2 g IV q8h. Can replace ceftriaxone for cephalosporin-allergic patients or when multidrug-resistant organisms are suspected. Has activity against L. monocytogenes — if used, ampicillin may be omitted. Combine with vancomycin.',
    },
    {
      indication: 'Healthcare-Associated/Nosocomial Meningitis',
      regimen: '2 g IV q8h. Covers Pseudomonas aeruginosa, Acinetobacter, and other resistant gram-negative organisms. Combine with vancomycin for MRSA coverage. Use for post-neurosurgical, shunt-related, or basilar skull fracture-associated infections.',
    },
  ],
  contraindications: [
    'Severe hypersensitivity to carbapenems',
    'History of anaphylaxis to beta-lactams (use with extreme caution — ~1% cross-reactivity)',
  ],
  cautions: [
    'Seizure risk — lower than imipenem but still possible, especially with renal impairment or CNS pathology',
    'Dose adjust for renal impairment (CrCl <50 mL/min)',
    'Clostridioides difficile-associated diarrhea risk with prolonged use',
  ],
  monitoring: 'Renal function (BMP). CBC. Monitor for seizures. C. difficile if diarrhea develops.',
  notes: 'Broadest-spectrum beta-lactam for CNS infections. Preferred carbapenem for meningitis (lower seizure risk than imipenem). Covers Listeria monocytogenes, unlike cephalosporins. Key role in healthcare-associated meningitis where resistant gram-negative organisms (P. aeruginosa, A. baumannii) are common pathogens. Mortality in healthcare-associated meningitis: 16-41%.',
  citations: [
    'van de Beek D, et al. ESCMID guideline: diagnosis and treatment of acute bacterial meningitis. Clin Microbiol Infect. 2016;22:S37-S62.',
    'Bardak-Ozcem S, Sipahi OR. An updated approach to healthcare-associated meningitis. Expert Rev Anti Infect Ther. 2014;12(3):333-342.',
  ],
};

const RIFAMPIN: DrugEntry = {
  id: 'rifampin',
  name: 'Rifampin (Rifadin)',
  genericName: 'Rifampin',
  drugClass: 'Rifamycin Antibiotic',
  route: 'PO',
  indications: ['Meningococcal postexposure prophylaxis', 'H. influenzae postexposure prophylaxis'],
  dosing: [
    {
      indication: 'Meningococcal Postexposure Prophylaxis',
      regimen: '600 mg PO q12h × 2 days (4 doses total). For close contacts of confirmed N. meningitidis cases. Alternatives: ceftriaxone 250 mg IM × 1 or ciprofloxacin 500 mg PO × 1.',
    },
    {
      indication: 'H. influenzae Postexposure Prophylaxis',
      regimen: '600 mg PO daily × 4 days. For household contacts with incompletely vaccinated children <4 years or immunocompromised children <18 years.',
    },
  ],
  contraindications: [
    'Concurrent use of protease inhibitors or certain antiretrovirals (major CYP3A4 inducer)',
    'Active hepatic disease or jaundice',
  ],
  cautions: [
    'Potent CYP inducer — reduces levels of oral contraceptives, warfarin, HIV medications, and many other drugs',
    'Hepatotoxicity — monitor LFTs if used beyond prophylaxis duration',
    'Colors body fluids orange-red (urine, tears, sweat) — counsel patients',
    'Contact lens staining',
  ],
  monitoring: 'No monitoring needed for short-course PEP. For prolonged use: LFTs, CBC.',
  notes: 'Used for chemoprophylaxis of close contacts in meningococcal and H. influenzae meningitis. Single-dose alternatives (ceftriaxone IM, ciprofloxacin PO) are often preferred due to simpler regimen and fewer drug interactions. Rifampin should NOT be given to HIV patients on antiretroviral therapy due to severe drug interactions.',
  citations: [
    'Cohn AC, et al. Prevention and control of meningococcal disease: ACIP recommendations. MMWR Recomm Rep. 2013;62(RR-2):1-28.',
    'Briere EC, et al. Prevention and control of H. influenzae type b disease: ACIP recommendations. MMWR Recomm Rep. 2014;63(Rr-01):1-14.',
  ],
};

const DROPERIDOL: DrugEntry = {
  id: 'droperidol',
  name: 'Droperidol (Inapsine)',
  genericName: 'Droperidol',
  drugClass: 'Typical antipsychotic (butyrophenone)',
  route: 'IV/IM',
  indications: ['Acute agitation / delirium'],
  dosing: [
    {
      indication: 'Acute agitation / delirium',
      regimen: '2.5-5 mg IM or IV. Onset 3-10 min (faster than haloperidol). More sedating than haloperidol due to greater H1 and 5-HT2A activity. May repeat once at 15-20 min. Max 10 mg in 24h. ~2-3× more potent than haloperidol.',
      weightCalc: { dosePerKg: 0.05, unit: 'mg', maxDose: 5 },
    },
  ],
  contraindications: [
    'QTc >500 ms or history of torsades de pointes',
    'Parkinson disease or Lewy body dementia',
    'Known or suspected QT-prolonging medications (relative)',
  ],
  cautions: [
    'FDA black box (2001) for QT prolongation — but real-world risk appears very low. Retrospective study of 2,468 patients found no causal relationship between droperidol and serious adverse cardiac events.',
    'QTc effect is comparable to haloperidol, ondansetron, and many common ED medications',
    'Hypotension (alpha-1 blockade) — more common than with haloperidol. Have IV fluids available.',
    'More sedating than haloperidol — may be preferred when sedation is the goal',
    'FDA black box: increased mortality in elderly with dementia-related psychosis',
  ],
  monitoring: 'ECG before and after dosing (per black box). Telemetry monitoring. Blood pressure. Reassess RASS q15 min.',
  notes: 'Fell out of favor after 2001 FDA black box warning, but multiple studies and the AAEP have called for re-evaluation. May be superior to haloperidol for acute agitation: faster onset, greater sedation, and similar QTc profile. Greater 5-HT2A blockade may reduce extrapyramidal side effects compared to haloperidol. Consider as first-line for undifferentiated severe agitation when rapid sedation is needed.',
  citations: [
    'Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).',
    'Chase PB, Biros MH. A Retrospective Review of the Use and Safety of Droperidol. Acad Emerg Med. 2002;9(12):1402-1410.',
    'Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024.',
  ],
};

const HALOPERIDOL: DrugEntry = {
  id: 'haloperidol',
  name: 'Haloperidol (Haldol)',
  genericName: 'Haloperidol',
  drugClass: 'Typical antipsychotic (butyrophenone)',
  route: 'IV/IM',
  indications: ['Acute agitation / delirium', 'Elderly agitation'],
  dosing: [
    {
      indication: 'Acute agitation / delirium',
      regimen: '5-10 mg IM (onset 10-20 min) or IV push over 5 min (onset 3-5 min). May repeat q20-30 min PRN. Max 20 mg in 24h. Often combined with midazolam 2.5-5 mg IM and diphenhydramine 50 mg IM for dystonia prophylaxis ("B52" variant).',
      weightCalc: { dosePerKg: 0.1, unit: 'mg', maxDose: 10 },
    },
    {
      indication: 'Elderly agitation',
      regimen: '0.5-2 mg IM or IV push. Start with lowest effective dose (0.5-1 mg). May repeat q30-60 min. Max 5 mg in 24h. Higher risk of EPS and oversedation in elderly. All antipsychotics carry FDA black box for increased mortality in elderly with dementia-related psychosis.',
    },
  ],
  contraindications: [
    'QTc >500 ms or history of torsades de pointes',
    'Parkinson disease or Lewy body dementia (worsens motor symptoms, risk of neuroleptic sensitivity)',
    'CNS depression / coma',
    'Known hypersensitivity',
  ],
  cautions: [
    'QTc prolongation — obtain baseline ECG before and repeat after dosing',
    'Extrapyramidal symptoms (EPS): acute dystonia treated with diphenhydramine 50 mg IV/IM or benztropine 1-2 mg IV',
    'Akathisia (restlessness) — can be misdiagnosed as worsening agitation. Do NOT escalate dose.',
    'Neuroleptic malignant syndrome (rare): rigidity, hyperthermia, autonomic instability, elevated CK',
    'FDA black box: increased mortality in elderly with dementia-related psychosis (1.6-1.7×)',
    'Lowers seizure threshold',
    'IV route carries higher QTc risk than IM',
  ],
  monitoring: 'Continuous telemetry (QTc monitoring). ECG before and after dosing. Reassess RASS q15 min. Monitor temperature. Watch for EPS/dystonia/akathisia.',
  notes: 'Most studied antipsychotic for ED agitation. High D2 receptor selectivity — effective for psychosis and agitation but higher EPS risk than atypical antipsychotics. Consider droperidol for faster onset and more sedation, or olanzapine for no QTc risk and no dystonia. If patient not responding to 10 mg cumulative, reconsider etiology — try a different drug class rather than escalating dose.',
  citations: [
    'Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).',
    'Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024.',
  ],
};

const OLANZAPINE: DrugEntry = {
  id: 'olanzapine',
  name: 'Olanzapine (Zyprexa)',
  genericName: 'Olanzapine',
  drugClass: 'Atypical antipsychotic (thienobenzodiazepine)',
  route: 'IM/PO',
  indications: ['Acute agitation / delirium', 'Elderly agitation', 'Parkinson\'s — low-dose alternative'],
  dosing: [
    {
      indication: 'Acute agitation / delirium',
      regimen: '10 mg IM (onset 15-45 min). May repeat 5-10 mg after ≥2 hours. Max 30 mg/24h. PO: 5-10 mg (onset 30-60 min, requires cooperation). Orally disintegrating tablet (Zyprexa Zydis) dissolves on tongue — reduces hiding/cheeking risk.',
    },
    {
      indication: 'Elderly agitation',
      regimen: '2.5-5 mg IM. Lower dose due to increased sensitivity. May repeat once after ≥2 hours. Max 15 mg/24h.',
    },
    {
      indication: 'Parkinson\'s — low-dose alternative',
      regimen: '2.5 mg IM. Moderate D2 affinity — less motor worsening than typical antipsychotics but use with caution. Quetiapine PO preferred if patient can take oral medications.',
    },
  ],
  contraindications: [
    'Co-administration with parenteral (IM/IV) benzodiazepines — risk of fatal respiratory depression and hypotension',
    'Severe hemodynamic instability / hypotension',
  ],
  cautions: [
    '\u26A0\uFE0F DO NOT give with IM or IV benzodiazepines — multiple case reports of respiratory arrest and death. PO olanzapine + PO lorazepam is acceptable (different pharmacokinetics).',
    'No significant QTc prolongation — major advantage over haloperidol and droperidol',
    'No dystonia risk — advantage over typical antipsychotics',
    'Orthostatic hypotension — keep patient supine after IM injection',
    'FDA black box: increased mortality in elderly with dementia-related psychosis',
    'Hyperglycemia risk with repeated/chronic dosing (not relevant to single ED dose)',
  ],
  monitoring: 'Blood pressure, SpO2, respiratory rate closely after IM. No telemetry required (no QTc effect). Reassess RASS q15 min.',
  notes: 'Equally effective as haloperidol for acute agitation with fewer side effects. Key advantages: NO QTc prolongation (use when QTc is borderline/prolonged), NO dystonia. Key limitation: CANNOT combine with parenteral benzodiazepines. If patient needs both antipsychotic and benzodiazepine, use haloperidol + midazolam instead. The TREC trial showed IM olanzapine was as effective as IM haloperidol + promethazine for acute agitation.',
  citations: [
    'Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).',
    'Chan EW, et al. IV Droperidol or IM Olanzapine as Adjunct to Midazolam for Acutely Agitated Patient. Ann Emerg Med. 2013;61(1):72-81.',
    'Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024.',
  ],
};

const QUETIAPINE: DrugEntry = {
  id: 'quetiapine',
  name: 'Quetiapine (Seroquel)',
  genericName: 'Quetiapine fumarate',
  drugClass: 'Atypical antipsychotic (dibenzothiazepine)',
  route: 'PO',
  indications: ['Mild agitation / delirium (PO)', 'Parkinson\'s / Lewy body delirium'],
  dosing: [
    {
      indication: 'Mild agitation / delirium',
      regimen: '25-100 mg PO. Onset 30-60 min. Significant sedation at low doses (25-50 mg) due to H1 histamine blockade — functions primarily as a sedative at these doses, not an antipsychotic. May repeat q4-6h. Max 200 mg/24h in acute setting.',
    },
    {
      indication: 'Parkinson\'s / Lewy body delirium',
      regimen: '12.5-25 mg PO. Lowest D2 receptor affinity of ALL antipsychotics — least likely to worsen motor symptoms. Has been shown NOT to affect motor symptoms of Parkinson disease. Start 12.5 mg, titrate cautiously.',
    },
  ],
  contraindications: [
    'Severe hepatic impairment',
    'Known hypersensitivity',
  ],
  cautions: [
    'PO only — no parenteral formulation. Limits utility for severe ED agitation.',
    'Orthostatic hypotension (alpha-1 blockade) — significant in elderly. Monitor BP after first dose.',
    'At low doses (<150 mg), acts primarily as H1 antihistamine and alpha-1 blocker — sedation without significant antipsychotic effect',
    'Mild QTc prolongation — generally less than haloperidol. Real risk of torsades appears extremely low (4 reported cases in literature, all with multiple confounders).',
    'FDA black box: increased mortality in elderly with dementia-related psychosis',
  ],
  monitoring: 'Blood pressure (orthostatic risk — check sitting and standing). SpO2. Reassess sedation level q30 min.',
  notes: 'Safest antipsychotic for Parkinson disease and Lewy body dementia due to lowest D2 receptor occupancy. At low doses (25-50 mg), it functions like a non-deliriogenic sedative: H1 blockade (sedation) + 5-HT2A blockade (sleep maintenance) without significant dopamine antagonism. Best for mild-moderate delirium in cooperative patients, ICU delirium management, or as a step-down after parenteral sedation. Not useful for acute severe agitation due to PO-only limitation and slow onset.',
  citations: [
    'Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024.',
    'Devlin JW, et al. Efficacy and Safety of Quetiapine in Critically Ill Patients with Delirium. Crit Care Med. 2010;38(2):419-427.',
  ],
};

const RISPERIDONE: DrugEntry = {
  id: 'risperidone',
  name: 'Risperidone (Risperdal)',
  genericName: 'Risperidone',
  drugClass: 'Atypical antipsychotic (benzisoxazole)',
  route: 'PO',
  indications: ['Mild agitation / delirium (PO)'],
  dosing: [
    {
      indication: 'Mild agitation / delirium',
      regimen: '1-2 mg PO. Onset 30-60 min. Less sedating than quetiapine or olanzapine — may be useful when mild antipsychotic effect is desired without heavy sedation. Available as orally disintegrating tablet (Risperdal M-Tab). May repeat q4-6h. Max 4 mg/24h.',
    },
  ],
  contraindications: [
    'Parkinson disease or Lewy body dementia (moderate D2 affinity — higher EPS risk than quetiapine or olanzapine)',
    'Known hypersensitivity',
  ],
  cautions: [
    'PO only — no parenteral formulation for acute ED use',
    'Higher D2 affinity than quetiapine or olanzapine — moderate EPS risk',
    'Mild-moderate QTc prolongation',
    'Orthostatic hypotension',
    'Hyperprolactinemia (highest risk among atypical antipsychotics)',
    'Lacks anticholinergic effects — theoretically less deliriogenic but may increase EPS',
    'FDA black box: increased mortality in elderly with dementia-related psychosis',
  ],
  monitoring: 'Blood pressure, ECG if combined with other QTc-prolonging agents. Watch for EPS.',
  notes: 'Less commonly used in the ED than haloperidol or olanzapine due to PO-only limitation and slower onset. May be useful as a step-down agent or for semi-cooperative patients needing mild-moderate antipsychotic effect without heavy sedation. The orally disintegrating tablet dissolves on the tongue, reducing hiding/cheeking risk. For acute agitation with psychotic features, oral risperidone + oral lorazepam has shown similar efficacy to IM haloperidol + lorazepam.',
  citations: [
    'Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024.',
    'Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).',
  ],
};

const CHOLESTYRAMINE: DrugEntry = {
  id: 'cholestyramine',
  name: 'Cholestyramine (Questran)',
  genericName: 'Cholestyramine resin',
  drugClass: 'Bile acid sequestrant',
  route: 'PO',
  indications: ['Thyroid storm (adjunct — blocks enterohepatic recirculation)'],
  dosing: [
    {
      indication: 'Thyroid storm (adjunct — blocks enterohepatic recirculation)',
      regimen: '4 g PO q6h. Mix with 60-180 mL water or juice. Continue until thyroid storm resolved. Can reduce T4 levels by 20-30% additionally. Effective even in endogenous thyrotoxicosis (Graves, toxic adenoma) — not just exogenous overdose. Available OTC.',
    },
  ],
  contraindications: ['Complete biliary obstruction'],
  cautions: [
    'DRUG INTERACTIONS: Binds many oral medications, reducing absorption. Separate ALL oral drugs by \u22651 hour before or 2 hours after cholestyramine. This includes thionamides \u2014 coordinate timing carefully.',
    'GI side effects: constipation, bloating, nausea (usually mild)',
    'May reduce absorption of fat-soluble vitamins (A, D, E, K) with prolonged use',
  ],
  monitoring: 'Thyroid function tests. Monitor other medication levels if on narrow therapeutic index drugs (warfarin, digoxin, levothyroxine).',
  notes: 'Often overlooked adjunct in thyroid storm. Binds thyroid hormone in the GI tract, preventing enterohepatic recirculation. Extremely safe \u2014 available over-the-counter. IBCC considers this an important step in the 8-step thyroid storm protocol. Mechanism works even in patients who have not taken exogenous thyroid hormone.',
  citations: [
    'Kaykhaei MA et al. Low doses of cholestyramine in the treatment of hyperthyroidism. Endocrine. 2008;34(1-3):52-55.',
    'Farkas J. Thyroid Storm. IBCC. 2025.',
  ],
};

const LEVOTHYROXINE: DrugEntry = {
  id: 'levothyroxine',
  name: 'Levothyroxine (Synthroid)',
  genericName: 'Levothyroxine sodium',
  drugClass: 'Thyroid Hormone (synthetic T4)',
  route: 'IV / PO',
  indications: ['Decompensated hypothyroidism (IV load)', 'Decompensated hypothyroidism (IV maintenance)', 'Hypothyroidism (PO maintenance)', 'Subclinical hypothyroidism'],
  dosing: [
    {
      indication: 'Decompensated hypothyroidism (IV load)',
      regimen: '200-400 mcg IV push loading dose. Use lower end (200 mcg) for elderly, low body weight, CAD, or arrhythmia history. Safe to give empirically \u2014 T4 is inactive pro-hormone; normal circulating pool is ~1,000 mcg.',
    },
    {
      indication: 'Decompensated hypothyroidism (IV maintenance)',
      regimen: '50-100 mcg IV daily (or 1.2 mcg/kg/day IV). Continue until GI function restored, then transition to PO. Oral absorption is unreliable in decompensated hypothyroidism.',
    },
    {
      indication: 'Hypothyroidism (PO maintenance)',
      regimen: '1.6 mcg/kg/day PO (usual range 50-200 mcg daily). Take on empty stomach 30-60 min before breakfast. Elderly: start 25-50 mcg. Dose adjustments by 12.5-25 mcg increments every 4-6 weeks. Separate from calcium, iron, antacids by 4 hours.',
    },
    {
      indication: 'Subclinical hypothyroidism',
      regimen: '25-50 mcg PO daily. Elderly or cardiac disease: start 12.5-25 mcg. TSH recheck in 6-8 weeks. Target TSH 1-3 mIU/L.',
    },
  ],
  contraindications: [
    'Untreated adrenal insufficiency (give steroids FIRST \u2014 T4 accelerates cortisol metabolism, may precipitate adrenal crisis)',
    'Acute MI (relative \u2014 risk-benefit assessment)',
  ],
  cautions: [
    'Oral bioavailability reduced by: calcium, iron, antacids, PPIs, cholestyramine, sucralfate',
    'Hepatic enzyme inducers (phenytoin, carbamazepine, rifampin) increase metabolism \u2014 may need 20-50% dose increase',
    'Amiodarone and high-dose propranolol inhibit T4\u2192T3 conversion',
  ],
  monitoring: 'TSH + free T4 every 1-2 days in acute phase (trough levels). TSH falls ~50%/week. fT4 should normalize within 4 days. For maintenance: TSH q6-8 weeks until stable, then annually.',
  notes: 'IV levothyroxine dose is ~75% of PO dose. T4 half-life: ~6-7 days (euthyroid), ~9-10 days (hypothyroid). Clinical effect takes hours to days \u2014 T4 must be converted to active T3 peripherally. In decompensated hypothyroidism, this conversion may be impaired.',
  citations: [
    'Jonklaas J et al. ATA Task Force Guidelines for Treatment of Hypothyroidism. Thyroid. 2014;24(12):1670-1751.',
    'Farkas J. Decompensated Hypothyroidism. IBCC. 2025.',
  ],
};

const LIOTHYRONINE: DrugEntry = {
  id: 'liothyronine',
  name: 'Liothyronine (Cytomel / Triostat)',
  genericName: 'Liothyronine sodium',
  drugClass: 'Thyroid Hormone (synthetic T3)',
  route: 'IV',
  indications: ['Decompensated hypothyroidism (adjunct)'],
  dosing: [
    {
      indication: 'Decompensated hypothyroidism (adjunct)',
      regimen: '5-20 mcg IV loading dose, then 2.5-10 mcg IV q8h. Use lower end for elderly, smaller patients, or those with CAD/arrhythmia. Reserve for critically ill patients (hemodynamic or ventilatory support). Stop when: clinical improvement, T3 levels elevate, or after 48 hours (T4\u2192T3 conversion should resume by then).',
    },
  ],
  contraindications: [
    'Untreated adrenal insufficiency',
    'Acute MI (relative \u2014 T3 increases myocardial O\u2082 demand)',
  ],
  cautions: [
    'Higher risk of cardiac arrhythmias than T4 (active hormone with rapid onset)',
    'Doses >75 mcg/day associated with increased mortality in older studies',
    'Not first-line \u2014 adjunct to T4 only',
  ],
  monitoring: 'Continuous cardiac monitoring. Check T3 levels \u2014 if elevated, discontinue immediately. Heart rate, rhythm, blood pressure.',
  notes: 'T3 is the biologically active thyroid hormone. 95% absorbed orally within 4 hours \u2014 higher bioavailability than T4. Half-life ~2.5 days. Onset of action within hours (vs days for T4). 1 mcg T3 \u2248 3 mcg T4 in potency. IBCC: not mandatory \u2014 reserve for critically ill patients with no response to T4 at 24-48h.',
  citations: [
    'Jonklaas J et al. ATA Task Force Guidelines for Treatment of Hypothyroidism. Thyroid. 2014;24(12):1670-1751.',
    'Farkas J. Decompensated Hypothyroidism. IBCC. 2025.',
  ],
};

const METHIMAZOLE: DrugEntry = {
  id: 'methimazole',
  name: 'Methimazole (Tapazole)',
  genericName: 'Methimazole',
  drugClass: 'Thionamide (antithyroid agent)',
  route: 'PO',
  indications: ['Thyroid storm', 'Hyperthyroidism (maintenance)'],
  dosing: [
    {
      indication: 'Thyroid storm',
      regimen: '40 mg PO loading dose STAT, then 20 mg PO q6h. Can administer via NG tube or rectally (compounded) if unable to take PO. Once stable (usually after 24h), consider reducing to 20 mg q12h. IBCC prefers methimazole over PTU (safer profile, no clinical evidence that PTU\'s T4\u2192T3 blocking is meaningful).',
    },
    {
      indication: 'Hyperthyroidism (maintenance)',
      regimen: 'Initial: 20-40 mg/day PO (depending on severity). Maintenance: 5-20 mg/day PO. Dose adjustments every 4-6 weeks based on free T4/T3.',
    },
  ],
  contraindications: [
    '1st trimester pregnancy (teratogenic: aplasia cutis, choanal/esophageal atresia, cardiac malformations)',
    'Prior agranulocytosis from thionamide (cross-reactivity between methimazole and PTU)',
    'Severe hepatic impairment (relative)',
  ],
  cautions: [
    'Agranulocytosis (~0.2%) \u2014 dose-dependent, almost always within 90 days. Presents with high fever + pharyngitis. Check CBC if febrile.',
    'Hepatotoxicity (cholestatic pattern, less severe than PTU)',
    'ANCA-associated vasculitis (rare)',
    'Warfarin interaction (may potentiate anticoagulation)',
  ],
  monitoring: 'CBC with differential before starting and if febrile. LFTs baseline and periodic. Free T4/T3 every 4-6 weeks during titration.',
  notes: 'Methimazole binds irreversibly to thyroperoxidase \u2014 longer duration of action than PTU, allows less frequent dosing. Half-life ~9 hours. Risk of agranulocytosis is strongly dose-dependent \u2014 use lowest effective dose. No IV formulation exists. Rectal administration possible with compounded suppository.',
  citations: [
    'Ross DS et al. 2016 ATA Guidelines for Diagnosis and Management of Hyperthyroidism. Thyroid. 2016;26(10):1343-1421.',
    'Farkas J. Thyroid Storm. IBCC. 2025.',
  ],
};

const PROPRANOLOL: DrugEntry = {
  id: 'propranolol',
  name: 'Propranolol (Inderal)',
  genericName: 'Propranolol hydrochloride',
  drugClass: 'Non-selective beta-adrenergic blocker',
  route: 'PO / IV',
  indications: ['Thyroid storm (rate control)', 'Thyroid storm (IV \u2014 acute)', 'Thyrotoxicosis (symptomatic)'],
  dosing: [
    {
      indication: 'Thyroid storm (rate control)',
      regimen: '20-40 mg PO q4-6h. Start low (20 mg), titrate to HR <110. At high doses (>160 mg/day) also inhibits peripheral T4\u2192T3 conversion. Can administer via NG tube. IBCC caution: use ONLY if preserved EF on echo. Start low, stop if hypotension develops.',
    },
    {
      indication: 'Thyroid storm (IV \u2014 acute)',
      regimen: '0.5-1 mg IV over 10 min. May repeat q15 min PRN (max 10 mg total). Reserve for acute rate control when oral not feasible. Switch to oral or esmolol infusion as soon as possible. Esmolol is preferred over IV propranolol \u2014 titratable and ultra-short acting.',
    },
    {
      indication: 'Thyrotoxicosis (symptomatic)',
      regimen: '10-40 mg PO TID-QID. For palpitations, tremor, anxiety in stable thyrotoxicosis. Titrate to symptoms.',
    },
  ],
  contraindications: [
    'Decompensated heart failure / reduced EF (can precipitate cardiogenic shock)',
    'Severe bradycardia / heart block',
    'Cardiogenic shock',
    'Severe reactive airway disease (non-selective \u2014 blocks beta-2 bronchodilation)',
  ],
  cautions: [
    'IBCC critical view: beta-blockers are NOT mandatory in thyroid storm and may cause cardiac arrest in patients with reduced EF or cardiomyopathy. Echo BEFORE administration.',
    'Reactive airway disease \u2014 use cardioselective agent (esmolol, metoprolol) or calcium-channel blocker instead',
    'Hypoglycemia masking in diabetics',
    'Abrupt discontinuation can cause rebound hypertension/tachycardia',
  ],
  monitoring: 'Heart rate, blood pressure, ECG. Continuous telemetry during IV administration. Blood glucose in diabetics.',
  notes: 'Non-selective beta-blocker with additional benefit in thyrotoxicosis: blocks peripheral T4\u2192T3 conversion at high doses. However, retrospective data show no clinical difference between propranolol and beta-1 selective agents, questioning the clinical relevance of this effect. IBCC notes that beta-blockers have been linked to cardiogenic collapse and cardiac arrest in thyroid storm \u2014 use for standard accepted indications (hypertension, preserved-EF rate control), not reflexively in all thyroid storm.',
  citations: [
    'Ross DS et al. 2016 ATA Guidelines. Thyroid. 2016;26(10):1343-1421.',
    'Farkas J. Thyroid Storm. IBCC. 2025.',
    'Matsuo Y et al. Clinical efficacy of beta-1 selective beta-blockers versus propranolol in thyroid storm. Crit Care Med. 2024;52(7):1077-1086.',
  ],
};

const PTU: DrugEntry = {
  id: 'ptu',
  name: 'Propylthiouracil (PTU)',
  genericName: 'Propylthiouracil',
  drugClass: 'Thionamide (antithyroid agent)',
  route: 'PO',
  indications: ['Thyroid storm', 'Thyroid storm (pregnancy 1st trimester)'],
  dosing: [
    {
      indication: 'Thyroid storm',
      regimen: '500-1000 mg PO loading dose, then 250 mg PO q4h. Can administer via NG tube or rectally (compounded). ATA favors PTU in acute setting \u2014 additional benefit of blocking peripheral T4\u2192T3 conversion (~45% reduction in 24h vs 10-15% for methimazole). Generally transition to methimazole once improving (safer long-term profile).',
    },
    {
      indication: 'Thyroid storm (pregnancy 1st trimester)',
      regimen: '200-400 mg PO loading dose, then 100-200 mg PO q8h. PTU is MANDATORY in 1st trimester \u2014 methimazole crosses placenta and is teratogenic. Switch to methimazole after 1st trimester to reduce hepatotoxicity risk. Use lowest effective dose \u2014 both thionamides can cause fetal hypothyroidism.',
    },
  ],
  contraindications: [
    'Prior agranulocytosis from thionamide',
    'Severe hepatic dysfunction (PTU carries BLACK BOX warning for hepatotoxicity)',
  ],
  cautions: [
    'HEPATOTOXICITY \u2014 FDA Black Box Warning. Risk ~1/1000 for severe hepatic injury including fulminant liver failure. Median onset ~120 days. Dose-dependent.',
    'Agranulocytosis (~0.2%) \u2014 higher risk than methimazole at equivalent doses',
    'ANCA-associated vasculitis (higher risk than methimazole)',
    'Medication-induced lupus',
  ],
  monitoring: 'LFTs baseline and periodic (monthly for first 3 months). CBC if febrile. Discontinue immediately if LFTs > 3x ULN or symptoms of hepatitis (jaundice, dark urine, RUQ pain).',
  notes: 'PTU binds reversibly to thyroperoxidase \u2014 shorter duration of action than methimazole, requires more frequent dosing. Half-life only 1-2 hours. Bioavailability 50-80% due to first-pass metabolism. 75% protein-bound (lower placental penetration than methimazole). PTU is preferred in 1st trimester pregnancy and is the ATA-recommended agent for acute thyroid storm, but IBCC favors methimazole overall due to better safety profile.',
  citations: [
    'Ross DS et al. 2016 ATA Guidelines for Diagnosis and Management of Hyperthyroidism. Thyroid. 2016;26(10):1343-1421.',
    'Kruithoff ML, Gigliotti BJ. Thyroid Emergencies: A Narrative Review. Endocr Pract. 2025;31(10):1310-1318.',
  ],
};

const SSKI: DrugEntry = {
  id: 'sski',
  name: 'Potassium Iodide (SSKI / Lugol\'s)',
  genericName: 'Potassium iodide',
  drugClass: 'Iodine supplement (thyroid suppressant)',
  route: 'PO',
  indications: ['Thyroid storm (hormone release blockade)'],
  dosing: [
    {
      indication: 'Thyroid storm (hormone release blockade)',
      regimen: 'SSKI: 5 drops (0.25 mL / 250 mg) PO q6h. OR Lugol\'s 5% solution: 8 drops (0.4 mL) PO q6h \u2014 take with food/fluid to avoid gastritis. TIMING IS CRITICAL: Must give \u22651 hour AFTER thionamide (methimazole or PTU). Without thionamide, iodine can fuel new hormone synthesis. May continue up to 10 days (suppressive effect eventually wears off via escape from Wolff-Chaikoff effect).',
    },
  ],
  contraindications: [
    'Dermatitis herpetiformis (iodine sensitivity)',
    'Hypocomplementemic vasculitis (rare)',
  ],
  cautions: [
    'Must give AFTER thionamide \u2014 iodine without antithyroid coverage can worsen thyrotoxicosis, especially in toxic multinodular goiter or toxic adenoma',
    'True iodine allergy does not exist \u2014 iodine is an essential element. Allergies are to carrier molecules (shellfish protein, contrast dye), not iodine itself',
    'Prolonged use can cause iodine-induced hypothyroidism or paradoxical thyrotoxicosis (Jod-Basedow phenomenon)',
  ],
  monitoring: 'Thyroid function tests (free T4, T3) daily during acute phase. Watch for worsening thyrotoxicosis in first 24h.',
  notes: '1 drop of SSKI = 0.05 mL = 50 mg potassium iodide. Iodine acutely suppresses thyroid hormone release via the Wolff-Chaikoff effect \u2014 temporary inhibition of thyroid hormone synthesis when exposed to high iodide levels. This effect wears off after 10-14 days as the thyroid adapts (escape phenomenon). Alternative if iodine truly not tolerated: lithium carbonate 300 mg PO q8h (blocks hormone release via different mechanism).',
  citations: [
    'Ross DS et al. 2016 ATA Guidelines. Thyroid. 2016;26(10):1343-1421.',
    'Farkas J. Thyroid Storm. IBCC. 2025.',
  ],
};

// -------------------------------------------------------------------
// Drug Registry (Alphabetical by name)
// -------------------------------------------------------------------

export const ALL_DRUGS: DrugEntry[] = [
  ACETAMINOPHEN,
  ACETAZOLAMIDE,
  ACYCLOVIR,
  ALBUTEROL_NEB,
  ALTEPLASE,
  AMIODARONE,
  AMOXICILLIN,
  AMOXICILLIN_CLAVULANATE,
  AMPICILLIN,
  AMPHOTERICIN_B,
  APIXABAN,
  ASPIRIN,
  ATAZANAVIR,
  ATORVASTATIN,
  AZITHROMYCIN,
  BACITRACIN,
  BENZATHINE_PENICILLIN,
  BIKTARVY,
  BIVALIRUDIN,
  BISMUTH_SUBSALICYLATE,
  BUDESONIDE_NEB,
  BUMETANIDE,
  CALCIUM_CHLORIDE,
  CALCIUM_GLUCONATE,
  CALCIUM_GLUCONATE_GEL,
  CEFAZOLIN,
  CEFEPIME,
  CEFTRIAXONE,
  CEPHALEXIN,
  CHOLESTYRAMINE,
  CHLOROTHIAZIDE,
  CIPROFLOXACIN,
  CLEVIDIPINE,
  CLOPIDOGREL,
  CONJUGATED_ESTROGEN,
  DABIGATRAN,
  DARUNAVIR,
  DESMOPRESSIN,
  DEXAMETHASONE,
  DIAZEPAM,
  DIGOXIN,
  DILTIAZEM,
  DIMENHYDRINATE,
  DIPHENHYDRAMINE,
  DOLUTEGRAVIR,
  DROPERIDOL,
  DOXYCYCLINE,
  DOXYLAMINE,
  EDOXABAN,
  ENOXAPARIN,
  EPINEPHRINE,
  ESMOLOL,
  FENTANYL,
  FLUDROCORTISONE,
  FLUCONAZOLE,
  FLUCYTOSINE,
  FONDAPARINUX,
  FOSPHENYTOIN,
  FUROSEMIDE,
  GENTAMICIN,
  HALOPERIDOL,
  HYDROCORTISONE,
  HYPERTONIC_SALINE,
  HYDROXOCOBALAMIN,
  IDARUCIZUMAB,
  KETAMINE,
  LABETALOL,
  LACOSAMIDE,
  LEVETIRACETAM,
  LEVOTHYROXINE,
  LIDOCAINE,
  LIOTHYRONINE,
  LOPERAMIDE,
  LORAZEPAM,
  SODIUM_ZIRCONIUM_CYCLOSILICATE,
  MAGNESIUM_SULFATE,
  MEDROXYPROGESTERONE,
  MEROPENEM,
  METHOTREXATE,
  METHIMAZOLE,
  METHYLPREDNISOLONE,
  METOCLOPRAMIDE,
  METOLAZONE,
  METRONIDAZOLE,
  METOPROLOL,
  MIDAZOLAM,
  MORPHINE,
  MISOPROSTOL,
  NACL_TABLETS,
  NICARDIPINE,
  NIMODIPINE,
  NITROFURANTOIN,
  NITROGLYCERIN,
  OLANZAPINE,
  ONDANSETRON,
  ORAL_UREA,
  OXYTOCIN,
  PENICILLIN_G_IV,
  PHENYLEPHRINE,
  PCC_4FACTOR,
  PENTOBARBITAL,
  PHENOBARBITAL,
  POTASSIUM_CHLORIDE_IV,
  POTASSIUM_CHLORIDE_ORAL,
  PRASUGREL,
  PREDNISOLONE,
  PROCAINAMIDE,
  PROCAINE_PENICILLIN,
  PROCHLORPERAZINE,
  PROMETHAZINE,
  PROPOFOL,
  PROPRANOLOL,
  PROTAMINE,
  PTU,
  QUETIAPINE,
  PYRIDOXINE,
  RABIES_IMMUNE_GLOBULIN,
  RABIES_VACCINE,
  RACEMIC_EPINEPHRINE,
  REGULAR_INSULIN,
  RETEPLASE,
  RIFAMPIN,
  RISPERIDONE,
  RITONAVIR,
  RIVAROXABAN,
  RH_IMMUNE_GLOBULIN,
  SILVER_SULFADIAZINE,
  SODIUM_BICARBONATE,
  SSKI,
  TENECTEPLASE,
  TDF_FTC,
  TERBUTALINE,
  THIAMINE,
  TMP_SMX,
  THIOPENTAL,
  TICAGRELOR,
  TRANEXAMIC_ACID,
  UFH,
  VANCOMYCIN,
  VALPROATE,
  VERAPAMIL,
  VITAMIN_K,
];

const DRUG_MAP: Record<string, DrugEntry> = {};
for (const drug of ALL_DRUGS) {
  DRUG_MAP[drug.id] = drug;
}

/** Get a drug by ID */
export function getDrug(id: string): DrugEntry | undefined {
  return DRUG_MAP[id];
}

/** Get all drugs (already sorted alphabetically) */
export function getAllDrugs(): DrugEntry[] {
  return ALL_DRUGS;
}

/** Lookup table: maps common drug name fragments to drug store IDs */
const NAME_TO_ID: [RegExp, string][] = [
  [/acetaminophen|tylenol|apap/i, 'acetaminophen'],
  [/acetazolamide|diamox/i, 'acetazolamide'],
  [/acyclovir|zovirax/i, 'acyclovir'],
  [/albuterol|proventil|ventolin/i, 'albuterol-neb'],
  [/alteplase|tPA/i, 'alteplase'],
  [/amiodarone|cordarone/i, 'amiodarone'],
  [/amoxicillin.clavulanate|augmentin|amox.clav/i, 'amoxicillin-clavulanate'],
  [/amoxicillin(?!.*clav)/i, 'amoxicillin'],
  [/ampicillin/i, 'ampicillin'],
  [/amphotericin|ambisome/i, 'amphotericin-b'],
  [/apixaban/i, 'apixaban'],
  [/aspirin|ASA|acetylsalicylic/i, 'aspirin'],
  [/atazanavir|reyataz/i, 'atazanavir'],
  [/atorvastatin|lipitor/i, 'atorvastatin'],
  [/azithromycin|zithromax|z-?pack/i, 'azithromycin'],
  [/bacitracin/i, 'bacitracin'],
  [/biktarvy|BIC\/FTC\/TAF/i, 'biktarvy'],
  [/bivalirudin|angiomax/i, 'bivalirudin'],
  [/bismuth|pepto/i, 'bismuth-subsalicylate'],
  [/budesonide|pulmicort/i, 'budesonide-neb'],
  [/bumetanide|bumex/i, 'bumetanide'],
  [/benzathine.*penicillin/i, 'benzathine-penicillin'],
  [/calcium\s*chloride/i, 'calcium-chloride'],
  [/calcium\s*gluconate\s*gel/i, 'calcium-gluconate-gel'],
  [/calcium\s*gluconate/i, 'calcium-gluconate'],
  [/cefazolin|ancef/i, 'cefazolin'],
  [/cefepime|maxipime/i, 'cefepime'],
  [/ceftriaxone/i, 'ceftriaxone'],
  [/cephalexin|keflex/i, 'cephalexin'],
  [/cholestyramine|questran/i, 'cholestyramine'],
  [/chlorothiazide|diuril/i, 'chlorothiazide'],
  [/ciprofloxacin|cipro/i, 'ciprofloxacin'],
  [/clevidipine|cleviprex/i, 'clevidipine'],
  [/clopidogrel|plavix/i, 'clopidogrel'],
  [/conjugated.*estrogen|premarin|CEE/i, 'conjugated-estrogen'],
  [/dabigatran/i, 'dabigatran'],
  [/darunavir|prezista/i, 'darunavir'],
  [/dexamethasone|decadron/i, 'dexamethasone'],
  [/desmopressin|ddavp/i, 'desmopressin'],
  [/diazepam|valium/i, 'diazepam'],
  [/digoxin|digitalis|lanoxin/i, 'digoxin'],
  [/diltiazem|cardizem/i, 'diltiazem'],
  [/dimenhydrinate|dramamine|gravol/i, 'dimenhydrinate'],
  [/diphenhydramine|benadryl/i, 'diphenhydramine'],
  [/dolutegravir|tivicay/i, 'dolutegravir'],
  [/doxycycline/i, 'doxycycline'],
  [/doxylamine|unisom.*sleep.*tab|diclegis|bonjesta/i, 'doxylamine'],
  [/edoxaban/i, 'edoxaban'],
  [/enoxaparin|LMWH|low.molecular/i, 'enoxaparin'],
  [/epinephrine|adrenaline/i, 'epinephrine'],
  [/esmolol|brevibloc/i, 'esmolol'],
  [/fentanyl|sublimaze/i, 'fentanyl'],
  [/fludrocortisone|florinef/i, 'fludrocortisone'],
  [/fluconazole|diflucan/i, 'fluconazole'],
  [/flucytosine|5-?fc|ancobon/i, 'flucytosine'],
  [/fondaparinux|arixtra/i, 'fondaparinux'],
  [/fosphenytoin|cerebyx|phenytoin.*equiv/i, 'fosphenytoin'],
  [/furosemide|lasix/i, 'furosemide'],
  [/gentamicin|garamycin/i, 'gentamicin'],
  [/hypertonic.*saline|3%.*saline|3%.*nacl/i, 'hypertonic-saline'],
  [/hydrocortisone|solu-?cortef|cortef/i, 'hydrocortisone'],
  [/hydroxocobalamin|cyanokit/i, 'hydroxocobalamin'],
  [/idarucizumab|praxbind/i, 'idarucizumab'],
  [/ketamine|ketalar/i, 'ketamine'],
  [/labetalol/i, 'labetalol'],
  [/lacosamide|vimpat/i, 'lacosamide'],
  [/levetiracetam|keppra/i, 'levetiracetam'],
  [/levothyroxine|synthroid/i, 'levothyroxine'],
  [/lidocaine/i, 'lidocaine'],
  [/liothyronine|cytomel|triostat/i, 'liothyronine'],
  [/loperamide|imodium/i, 'loperamide'],
  [/lorazepam|ativan/i, 'lorazepam'],
  [/lokelma|sodium\s*zirconium|szc/i, 'sodium-zirconium-cyclosilicate'],
  [/magnesium sulfate|mag sulfate|MgSO4/i, 'magnesium-sulfate'],
  [/medroxyprogesterone|MPA|provera|depo.provera/i, 'medroxyprogesterone'],
  [/meropenem|merrem/i, 'meropenem'],
  [/methimazole|tapazole/i, 'methimazole'],
  [/methotrexate|MTX|trexall/i, 'methotrexate'],
  [/metoclopramide|reglan/i, 'metoclopramide'],
  [/metolazone|zaroxolyn/i, 'metolazone'],
  [/metronidazole|flagyl/i, 'metronidazole'],
  [/methylprednisolone|solu-?medrol|medrol|depo-?medrol/i, 'methylprednisolone'],
  [/metoprolol|lopressor|toprol/i, 'metoprolol'],
  [/midazolam|versed/i, 'midazolam'],
  [/misoprostol|cytotec/i, 'misoprostol'],
  [/morphine/i, 'morphine'],
  [/nacl.*tab|salt.*tab|sodium\s*chloride.*tab/i, 'nacl-tablets'],
  [/nicardipine|cardene/i, 'nicardipine'],
  [/nimodipine|nymalize|nimotop/i, 'nimodipine'],
  [/nitrofurantoin|macrobid|macrodantin/i, 'nitrofurantoin'],
  [/nitroglycerin|nitro|glyceryl trinitrate|NTG/i, 'nitroglycerin'],
  [/ondansetron|zofran/i, 'ondansetron'],
  [/oxytocin|pitocin/i, 'oxytocin'],
  [/oral.*urea|ure-na/i, 'oral-urea'],
  [/aqueous.*penicillin|penicillin G.*IV|crystalline.*penicillin/i, 'penicillin-g-iv'],
  [/4.factor.*pcc|pcc.*4.factor|kcentra|prothrombin.*complex/i, 'pcc-4factor'],
  [/pentobarbital|nembutal/i, 'pentobarbital'],
  [/phenobarbital|luminal/i, 'phenobarbital'],
  [/phenylephrine/i, 'phenylephrine'],
  [/kcl\s*iv|potassium\s*chloride.*iv|iv\s*potassium/i, 'potassium-chloride-iv'],
  [/kcl\s*oral|potassium\s*chloride.*oral|oral\s*potassium|k-dur|klor-con/i, 'potassium-chloride-oral'],
  [/procainamide|pronestyl/i, 'procainamide'],
  [/procaine.*penicillin/i, 'procaine-penicillin'],
  [/prochlorperazine|compazine/i, 'prochlorperazine'],
  [/promethazine|phenergan/i, 'promethazine'],
  [/propofol|diprivan/i, 'propofol'],
  [/propranolol|inderal/i, 'propranolol'],
  [/propylthiouracil|PTU/i, 'ptu'],
  [/protamine/i, 'protamine'],
  [/prasugrel|effient/i, 'prasugrel'],
  [/prednisolone|prelone|orapred/i, 'prednisolone'],
  [/pyridoxine|vitamin.?b6/i, 'pyridoxine'],
  [/racemic.*epinephrine|neb.*epinephrine|vaponefrin/i, 'racemic-epinephrine'],
  [/regular\s*insulin|insulin\s*regular|humulin/i, 'regular-insulin'],
  [/rifampin|rifadin|rifampicin/i, 'rifampin'],
  [/ritonavir|norvir/i, 'ritonavir'],
  [/rivaroxaban/i, 'rivaroxaban'],
  [/rh.*immune.*globulin|rhogam|rhophylac|micrhogam|anti.?D/i, 'rh-immune-globulin'],
  [/silver\s*sulfadiazine|silvadene|SSD/i, 'silver-sulfadiazine'],
  [/sodium\s*bicarbonate|sodium\s*bicarb|nahco3|bicarb(?!onate)/i, 'sodium-bicarbonate'],
  [/sski|lugol|potassium\s*iodide/i, 'sski'],
  [/tenecteplase|TNKase/i, 'tenecteplase'],
  [/tenofovir.*emtricitabine|truvada|TDF\/FTC/i, 'tdf-ftc'],
  [/terbutaline|brethine/i, 'terbutaline'],
  [/thiamine|vitamin\s*b1/i, 'thiamine'],
  [/tmp-?smx|bactrim|sulfamethoxazole|trimethoprim/i, 'tmp-smx'],
  [/thiopental|pentothal/i, 'thiopental'],
  [/ticagrelor|brilinta/i, 'ticagrelor'],
  [/tranexamic.*acid|TXA/i, 'tranexamic-acid'],
  [/unfractionated heparin|^UFH$|heparin sodium/i, 'ufh'],
  [/valproate|valproic|depacon|depakote|depakene/i, 'valproate'],
  [/vancomycin|vancocin/i, 'vancomycin'],
  [/verapamil|calan|isoptin/i, 'verapamil'],
  [/vitamin\s*k|phytonadione/i, 'vitamin-k'],
];

/** Try to find a drug store ID from a drug name string. Returns undefined if no match. */
export function findDrugIdByName(name: string): string | undefined {
  for (const [pattern, id] of NAME_TO_ID) {
    if (pattern.test(name)) return id;
  }
  return undefined;
}
