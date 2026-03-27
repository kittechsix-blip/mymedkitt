// myMedKitt — Per-Consult Toolbar Configurations
// Maps consult IDs to their contextual toolbar items.
const TOOLBAR_CONFIGS = {
    'anaphylaxis': [
        { id: 'criteria', label: 'Criteria', icon: '\u2705', action: 'calculator', target: 'anaphylaxis-criteria' },
        { id: 'epi-calc', label: 'Epi Calc', icon: '\uD83E\uDDEE', action: 'calculator', target: 'epi-infusion' },
        { id: 'epi-im', label: 'IM Epi', icon: '\uD83D\uDC89', action: 'jump', target: 'anaph-source-control' },
        { id: 'iv-epi', label: 'IV Epi', icon: '\uD83D\uDD34', action: 'jump', target: 'anaph-epi-infusion' },
    ],
    'diarrhea': [
        { id: 'red-flags', label: 'Red Flags', icon: '\uD83D\uDEA9', action: 'jump', target: 'diarrhea-red-flag-eval' },
        { id: 'stec', label: 'STEC', icon: '\uD83E\uDDA0', action: 'jump', target: 'diarrhea-bloody' },
    ],
    'hiv': [
        { id: 'ois', label: 'OIs', icon: '\uD83E\uDDA0', action: 'jump', target: 'hiv-immunocompromised' },
        { id: 'arv-effects', label: 'ARV Effects', icon: '\uD83D\uDC8A', action: 'jump', target: 'hiv-med-overview' },
        { id: 'pep-prep', label: 'PEP/PrEP', icon: '\uD83D\uDEE1\uFE0F', action: 'jump', target: 'hiv-prevention' },
    ],
    'precip-delivery': [
        { id: 'deliver', label: 'Deliver', icon: '\uD83D\uDC76', action: 'jump', target: 'precip-head' },
        { id: 'cord', label: 'Cord', icon: '\uD83D\uDD17', action: 'jump', target: 'precip-cord' },
        { id: 'oxytocin', label: 'Oxytocin', icon: '\uD83D\uDC89', action: 'jump', target: 'precip-oxytocin' },
    ],
    'shoulder-dystocia': [
        { id: 'mcroberts', label: 'McRoberts', icon: '\uD83E\uDDB5', action: 'jump', target: 'sd-mcroberts' },
        { id: 'rotational', label: 'Rotational', icon: '\uD83D\uDD04', action: 'jump', target: 'sd-rotational' },
        { id: 'post-arm', label: 'Post Arm', icon: '\uD83D\uDCAA', action: 'jump', target: 'sd-posterior-arm' },
    ],
    'first-trimester': [
        { id: 'ectopic', label: 'Ectopic', icon: '\uD83D\uDCCD', action: 'jump', target: 'ft-ectopic-confirmed' },
        { id: 'nvp', label: 'NVP Rx', icon: '\uD83E\uDD22', action: 'jump', target: 'ft-nvp-assess' },
        { id: 'miscarriage', label: 'Miscarriage', icon: '\uD83E\uDE78', action: 'jump', target: 'ft-miscarriage-type' },
    ],
    'aub': [
        { id: 'aub-treatment', label: 'Treatment', icon: '\uD83D\uDC8A', action: 'calculator', target: 'aub-treatment' },
        { id: 'unstable', label: 'Unstable', icon: '\uD83D\uDEA8', action: 'jump', target: 'aub-unstable' },
        { id: 'classify', label: 'Classify', icon: '\uD83E\uDE78', action: 'jump', target: 'aub-classify' },
    ],
    'distal-radius': [
        { id: 'analgesia', label: 'Analgesia', icon: '\uD83D\uDC89', action: 'jump', target: 'dr-analgesia' },
        { id: 'tramp', label: 'TRAMP', icon: '\uD83E\uDDB4', action: 'jump', target: 'dr-traction' },
        { id: 'post-xr', label: 'Post-XR', icon: '\uD83D\uDCCB', action: 'jump', target: 'dr-post-xray' },
    ],
    'splinting': [
        { id: 'arm', label: 'Arm', icon: '\uD83D\uDCAA', action: 'jump', target: 'splint-humerus' },
        { id: 'hand', label: 'Hand', icon: '\u270B', action: 'jump', target: 'splint-wrist-hand' },
        { id: 'leg', label: 'Leg', icon: '\uD83E\uDDB5', action: 'jump', target: 'splint-lower-ext' },
    ],
    'croup': [
        { id: 'severity', label: 'Severity', icon: '\uD83D\uDCCA', action: 'jump', target: 'croup-severity' },
        { id: 'epi-obs', label: 'Epi Obs', icon: '\uD83D\uDCA8', action: 'jump', target: 'croup-epi-obs' },
    ],
    'neonatal-resus': [
        { id: 'ppv', label: 'PPV', icon: '\uD83E\uDEC1', action: 'jump', target: 'nrp-ppv' },
        { id: 'cpr', label: 'CPR', icon: '\uD83D\uDC93', action: 'jump', target: 'nrp-cpr' },
        { id: 'epi', label: 'Epi', icon: '\uD83D\uDC89', action: 'jump', target: 'nrp-epinephrine' },
    ],
    'peds-fever': [
        { id: 'neonatal', label: '0-21d', icon: '\uD83D\uDC76', action: 'jump', target: 'pf-neo-screen' },
        { id: 'markers', label: 'Labs', icon: '\uD83E\uDDEA', action: 'jump', target: 'pf-22-im' },
    ],
    'uti-peds': [
        { id: 'ua', label: 'UA', icon: '\uD83E\uDDEA', action: 'jump', target: 'uti-ua-cath' },
        { id: 'abx', label: 'Abx', icon: '\uD83D\uDC8A', action: 'jump', target: 'uti-ed-abx' },
        { id: 'imaging', label: 'Imaging', icon: '\uD83D\uDCF7', action: 'jump', target: 'uti-imaging' },
    ],
    'burns': [
        { id: 'tbsa', label: 'TBSA', icon: '\uD83D\uDD25', action: 'calculator', target: 'tbsa-adult' },
        { id: 'fluid', label: 'Fluids', icon: '\uD83D\uDCA7', action: 'calculator', target: 'burn-parkland' },
        { id: 'hf-protocol', label: 'HF Protocol', icon: '\u26A0\uFE0F', action: 'calculator', target: 'hf-treatment' },
    ],
    'stroke': [
        { id: 'nihss', label: 'NIHSS', icon: '\uD83E\uDDE0', action: 'calculator', target: 'nihss' },
        { id: 'ivt', label: 'Lysis Rx', icon: '\uD83D\uDC89', action: 'jump', target: 'stroke-ivt-treat' },
        { id: 'evt', label: 'EVT', icon: '\u23F0', action: 'jump', target: 'stroke-evt-window' },
    ],
    'ich': [
        { id: 'reversal', label: 'Reversal', icon: '\uD83E\uDE78', action: 'jump', target: 'ich-anticoag' },
        { id: 'cerebellar', label: 'Cerebellar', icon: '\uD83D\uDEA8', action: 'jump', target: 'ich-cerebellar-surg' },
        { id: 'bp', label: 'BP Mgmt', icon: '\uD83E\uDE7A', action: 'jump', target: 'ich-bp' },
    ],
    'status-epilepticus': [
        { id: 'bzd', label: 'BZD Rx', icon: '\uD83D\uDC89', action: 'jump', target: 'se-iv-bzd' },
        { id: 'second-line', label: '2nd Line', icon: '\u26A1', action: 'jump', target: 'se-2nd-line-choice' },
        { id: 'special', label: 'Special Pop', icon: '\uD83E\uDD30', action: 'jump', target: 'se-special-pop' },
    ],
    'sah': [
        { id: 'ottawa', label: 'Ottawa Rule', icon: '\uD83D\uDCCB', action: 'jump', target: 'sah-ottawa' },
        { id: 'confirmed', label: 'SAH Mgmt', icon: '\uD83D\uDEA8', action: 'jump', target: 'sah-confirmed' },
        { id: 'vasospasm', label: 'Vasospasm', icon: '\uD83D\uDC8A', action: 'jump', target: 'sah-vasospasm-prev' },
    ],
    'nstemi': [
        { id: 'timi', label: 'TIMI', icon: '\u2764\uFE0F', action: 'calculator', target: 'timi' },
    ],
    'stemi': [
        { id: 'territories', label: 'Territories', icon: '\uD83D\uDCC8', action: 'overlay', target: 'stemi-vascular-territories' },
        { id: 'sgarbossa', label: 'Sgarbossa', icon: '\uD83E\uDDE0', action: 'calculator', target: 'sgarbossa' },
        { id: 'reperfusion', label: 'Reperfusion', icon: '\u23F1\uFE0F', action: 'overlay', target: 'stemi-reperfusion-pathway' },
    ],
    'afib-rvr': [
        { id: 'cardioversion', label: 'Cardiovert', icon: '\u26A1', action: 'jump', target: 'afib-cardioversion-protocol' },
        { id: 'rate-control', label: 'Rate Ctrl', icon: '\uD83D\uDC93', action: 'jump', target: 'afib-stable-drugs' },
        { id: 'chadsvasc', label: 'CHA₂DS₂', icon: '\u2764\uFE0F', action: 'calculator', target: 'chadsvasc' },
    ],
    'potassium': [
        { id: 'hyperk-rx', label: 'HyperK Rx', icon: '\u26A1', action: 'jump', target: 'k-hyper-step1' },
        { id: 'hypok-rx', label: 'HypoK Rx', icon: '\uD83D\uDC8A', action: 'jump', target: 'k-hypo-assess' },
        { id: 'ecg', label: 'ECG', icon: '\uD83D\uDCC8', action: 'jump', target: 'k-hyper-ecg' },
    ],
    'sodium': [
        { id: 'hts', label: 'HTS', icon: '\uD83E\uDDC2', action: 'jump', target: 'na-hypo-emergency' },
        { id: 'fwd', label: 'FWD Calc', icon: '\uD83D\uDCA7', action: 'calculator', target: 'fwd' },
        { id: 'labs', label: 'Labs', icon: '\uD83E\uDDEA', action: 'jump', target: 'na-hypo-initial' },
    ],
    'neurosyphilis': [
        { id: 'iv-pcn', label: 'IV PCN Rx', icon: '\uD83D\uDC89', action: 'jump', target: 'ns-confirmed' },
        { id: 'csf-vdrl', label: 'CSF-VDRL', icon: '\uD83E\uDDEA', action: 'jump', target: 'ns-csf-result' },
        { id: 'ocular-otic', label: 'Ocular/Otic', icon: '\uD83D\uDC41\uFE0F', action: 'jump', target: 'ns-ocular-otic' },
    ],
    'syphilis': [
        { id: 'serology', label: 'Serology', icon: '\uD83E\uDDEA', action: 'calculator', target: 'syphilis-serology' },
        { id: 'treatment', label: 'Treatment', icon: '\uD83D\uDC8A', action: 'overlay', target: 'syph-treatment-table' },
        { id: 'neuro', label: 'Neuro Syph', icon: '\uD83E\uDDE0', action: 'jump', target: 'syph-neuro-route' },
        { id: 'pregnancy', label: 'Pregnancy', icon: '\uD83E\uDD30', action: 'jump', target: 'syph-pregnancy' },
    ],
    'pep': [
        { id: 'regimen', label: 'PEP Rx', icon: '\uD83D\uDC8A', action: 'jump', target: 'pep-regimen' },
        { id: 'start-pep', label: 'Start PEP', icon: '\u23F1\uFE0F', action: 'jump', target: 'pep-workup' },
        { id: 'followup', label: 'Follow-Up', icon: '\uD83D\uDCCB', action: 'jump', target: 'pep-followup' },
    ],
    'rabies': [
        { id: 'wound-care', label: 'Wound Care', icon: '\uD83E\uDE79', action: 'jump', target: 'rabies-wound' },
        { id: 'full-pep', label: 'PEP Protocol', icon: '\uD83D\uDC89', action: 'jump', target: 'rabies-full-pep' },
        { id: 'bat', label: 'Bat Rules', icon: '\uD83E\uDD87', action: 'jump', target: 'rabies-bat' },
    ],
    'priapism': [
        { id: 'block', label: 'Block', icon: '\uD83D\uDC89', action: 'jump', target: 'priapism-penile-block-intro' },
        { id: 'aspirate', label: 'Aspirate', icon: '\uD83E\uDE78', action: 'jump', target: 'priapism-aspiration-intro' },
        { id: 'phenyl', label: 'Phenyl', icon: '\uD83D\uDC8A', action: 'jump', target: 'priapism-phenylephrine-intro' },
    ],
    'chest-tube': [
        { id: 'anatomy', label: 'Anatomy', icon: '\uD83D\uDCCD', action: 'jump', target: 'ctube-anatomy' },
        { id: 'insert', label: 'Insert', icon: '\uD83E\uDE7A', action: 'jump', target: 'ctube-cut' },
        { id: 'tube-size', label: 'Tube Size', icon: '\uD83D\uDCCF', action: 'jump', target: 'ctube-tube-size' },
    ],
    'pneumothorax': [
        { id: 'lung-point', label: 'Lung Point', icon: '\uD83D\uDCCD', action: 'jump', target: 'lung-point' },
        { id: 'tension', label: 'Tension?', icon: '\uD83D\uDEA8', action: 'jump', target: 'tension-assessment' },
        { id: 'size', label: 'Size', icon: '\uD83D\uDCCF', action: 'jump', target: 'stable-ptx-management' },
    ],
    'echo-views': [
        { id: 'effusion', label: 'Effusion', icon: '\uD83E\uDEC0', action: 'jump', target: 'pericardial-effusion' },
        { id: 'rv-strain', label: 'RV Strain', icon: '\uD83E\uDEC1', action: 'jump', target: 'rv-strain' },
        { id: 'ivc', label: 'IVC', icon: '\uD83D\uDCA7', action: 'jump', target: 'ivc-assessment' },
    ],
    'echo-epss': [
        { id: 'interpret', label: 'Interpret', icon: '\uD83D\uDCCA', action: 'jump', target: 'epss-interpret' },
        { id: 'grey-zone', label: 'Grey Zone', icon: '\uD83D\uDFE1', action: 'jump', target: 'epss-grey' },
    ],
    'syncope': [
        { id: 'csrs', label: 'CSRS', icon: '📊', action: 'calculator', target: 'csrs' },
        { id: 'sfsr', label: 'SFSR', icon: '📋', action: 'calculator', target: 'sfsr' },
        { id: 'ddx', label: 'DDx', icon: '🔍', action: 'overlay', target: 'syncope-ddx' },
        { id: 'ecg', label: 'ECG', icon: '📈', action: 'overlay', target: 'syncope-ecg' },
    ],
    'pe-treatment': [
        { id: 'pe-treatment', label: 'Treatment', icon: '\uD83D\uDC8A', action: 'calculator', target: 'pe-treatment' },
        { id: 'thrombolysis', label: 'Lysis Rx', icon: '\uD83D\uDC89', action: 'jump', target: 'pe-massive-tx' },
        { id: 'pesi', label: 'PESI', icon: '\uD83E\uDEC1', action: 'calculator', target: 'pesi' },
    ],
    'acid-base': [
        { id: 'anion-gap', label: 'AG', icon: '\uD83E\uDDEA', action: 'calculator', target: 'anion-gap' },
        { id: 'delta-gap', label: 'Delta', icon: '\u0394', action: 'calculator', target: 'delta-gap' },
        { id: 'winters', label: "Winter's", icon: '\uD83C\uDF21\uFE0F', action: 'calculator', target: 'winters-formula' },
        { id: 'stewart', label: 'Stewart', icon: '\u2696\uFE0F', action: 'calculator', target: 'stewart-sig' },
        { id: 'osm-gap', label: 'Osm Gap', icon: '\uD83E\uDDF4', action: 'calculator', target: 'osmolar-gap' },
        { id: 'comp-rules', label: 'Rules', icon: '\uD83D\uDCCF', action: 'overlay', target: 'ab-compensation' },
    ],
    'adrenal-insufficiency': [
        { id: 'bsa', label: 'BSA', icon: '\uD83D\uDCD0', action: 'calculator', target: 'bsa' },
        { id: 'crisis-rx', label: 'Crisis Rx', icon: '\uD83D\uDEA8', action: 'jump', target: 'ai-crisis-steroid' },
        { id: 'stress-dose', label: 'Stress Dose', icon: '\uD83D\uDC8A', action: 'jump', target: 'ai-stress-dose' },
        { id: 'sick-day', label: 'Sick-Day', icon: '\uD83D\uDCCB', action: 'overlay', target: 'ai-sick-day-rules' },
    ],
    'thyroid': [
        { id: 'bws', label: 'BWS', icon: '\uD83C\uDF21\uFE0F', action: 'calculator', target: 'burch-wartofsky' },
        { id: 'storm-rx', label: 'Storm Rx', icon: '\u26A1', action: 'jump', target: 'thyroid-storm-steroids' },
        { id: 'hypo-rx', label: 'Hypo Rx', icon: '\uD83D\uDC89', action: 'jump', target: 'thyroid-hypo-steroids' },
        { id: 'bb-debate', label: 'BB Debate', icon: '\u2696\uFE0F', action: 'overlay', target: 'thyroid-bb-controversy' },
    ],
    'angioedema': [
        { id: 'airway', label: 'Airway', icon: '\uD83E\uDEC1', action: 'jump', target: 'angio-airway-secure' },
        { id: 'acei-rx', label: 'ACEi Rx', icon: '\uD83D\uDC8A', action: 'jump', target: 'angio-acei-treat' },
        { id: 'hae-rx', label: 'HAE Rx', icon: '\uD83D\uDC89', action: 'jump', target: 'angio-hae-treat' },
        { id: 'staging', label: 'Staging', icon: '\uD83D\uDCCA', action: 'overlay', target: 'angio-ishoo-staging' },
    ],
    'sickle-cell': [
        { id: 'triage', label: 'Triage', icon: '\uD83C\uDFE5', action: 'calculator', target: 'scd-triage' },
        { id: 'pain-rx', label: 'Pain Rx', icon: '\uD83D\uDC89', action: 'jump', target: 'scd-voc-iv' },
        { id: 'acs-rx', label: 'ACS Rx', icon: '\uD83E\uDEC1', action: 'jump', target: 'scd-acs-treatment' },
        { id: 'transfusion', label: 'Transfuse', icon: '\uD83E\uDE78', action: 'overlay', target: 'scd-transfusion' },
    ],
    'tca-toxidrome': [
        { id: 'ecg', label: 'ECG', icon: '\uD83D\uDCC8', action: 'overlay', target: 'tca-ecg-findings' },
        { id: 'qrs', label: 'QRS Risk', icon: '\uD83E\uDDEE', action: 'calculator', target: 'qrs-risk' },
        { id: 'bicarb', label: 'NaHCO\u2083', icon: '\uD83D\uDC89', action: 'calculator', target: 'bicarb-dose' },
        { id: 'protocol', label: 'Bicarb Rx', icon: '\uD83D\uDCCB', action: 'overlay', target: 'tca-bicarb-protocol' },
    ],
    'acetaminophen': [
        { id: 'rumack', label: 'Rumack-Matthew', icon: '\uD83D\uDCCA', action: 'calculator', target: 'rumack-matthew' },
        { id: 'nac-calc', label: 'NAC Dosing', icon: '\uD83D\uDC8A', action: 'calculator', target: 'nac-dosing' },
        { id: 'kings', label: "King's College", icon: '\uD83C\uDFE5', action: 'calculator', target: 'kings-college' },
        { id: 'stages', label: 'Tox Stages', icon: '\uD83D\uDCCB', action: 'overlay', target: 'apap-stages' },
    ],
    'salicylate': [
        { id: 'sal-calc', label: 'Sal Guide', icon: '\uD83E\uDDEA', action: 'calculator', target: 'sal-tox-guide' },
        { id: 'bicarb', label: 'NaHCO\u2083', icon: '\uD83D\uDC89', action: 'jump', target: 'sal-bicarb-bolus' },
        { id: 'hd', label: 'HD', icon: '\uD83D\uDEA8', action: 'jump', target: 'sal-hd-indications' },
        { id: 'airway', label: 'Airway \u26A0', icon: '\u26A0\uFE0F', action: 'overlay', target: 'sal-death-spiral' },
    ],
    'sepsis': [
        { id: 'qsofa', label: 'qSOFA', icon: '\uD83D\uDCCA', action: 'calculator', target: 'qsofa' },
        { id: 'map', label: 'MAP', icon: '\uD83E\uDE7A', action: 'calculator', target: 'map-calculator' },
        { id: 'vp-rx', label: 'VP Rx', icon: '\uD83D\uDC89', action: 'jump', target: 'sepsis-vp-init' },
        { id: 'abx', label: 'Abx Table', icon: '\uD83D\uDC8A', action: 'overlay', target: 'sepsis-abx-table' },
    ],
    'dka': [
        { id: 'anion-gap', label: 'Anion Gap', icon: '\uD83E\uDDEA', action: 'calculator', target: 'anion-gap' },
        { id: 'insulin-drip', label: 'Insulin Drip', icon: '\uD83D\uDC89', action: 'jump', target: 'dka-insulin-start' },
        { id: 'k-repletion', label: 'K Repletion', icon: '\u26A1', action: 'jump', target: 'dka-potassium-check' },
        { id: 'fluid-deficit', label: 'Fluids', icon: '\uD83D\uDCA7', action: 'jump', target: 'dka-fluid-management' },
    ],
    'meningitis': [
        { id: 'mening-abx', label: 'Empiric Abx', icon: '\uD83D\uDC8A', action: 'calculator', target: 'mening-abx' },
        { id: 'lp-interp', label: 'LP Interp', icon: '\uD83E\uDDEA', action: 'calculator', target: 'lp-interp' },
        { id: 'csf-correct', label: 'CSF Correct', icon: '\uD83E\uDE78', action: 'calculator', target: 'csf-correction' },
    ],
    'opioid-withdrawal': [
        { id: 'cows', label: 'COWS', icon: '\uD83D\uDCCB', action: 'calculator', target: 'cows' },
        { id: 'bup-guide', label: 'Bup Guide', icon: '\uD83D\uDC8A', action: 'overlay', target: 'ow-bup-guide' },
        { id: 'precip-wd', label: 'Precip WD', icon: '\u26A0\uFE0F', action: 'jump', target: 'ow-precip-entry' },
    ],
    'alcohol-withdrawal': [
        { id: 'ciwa', label: 'CIWA', icon: '\uD83D\uDCCB', action: 'calculator', target: 'ciwa-ar' },
        { id: 'phenobarb', label: 'Phenobarb', icon: '\uD83D\uDC89', action: 'jump', target: 'aw-pb-protocol' },
        { id: 'seizure', label: 'Seizure', icon: '\u26A1', action: 'jump', target: 'aw-seizure' },
        { id: 'aud', label: 'AUD Meds', icon: '\uD83D\uDC8A', action: 'jump', target: 'aw-aud-screen' },
        { id: 'timing', label: 'Timing', icon: '\u23F0', action: 'overlay', target: 'aw-withdrawal-timing' },
    ],
    'tuberculosis': [
        { id: 'tb-risk', label: 'R/O TB', icon: '🔍', action: 'calculator', target: 'tb-risk' },
        { id: 'tb-drugs', label: 'Drug Card', icon: '💊', action: 'calculator', target: 'tb-drug-card' },
        { id: 'tb-interact', label: 'Interactions', icon: '⚠️', action: 'calculator', target: 'tb-interaction' },
        { id: 'tb-duration', label: 'Duration', icon: '⏱️', action: 'calculator', target: 'tb-duration' },
        { id: 'tb-regimens', label: 'Regimens', icon: '📋', action: 'overlay', target: 'tb-treatment-regimens' },
    ],
    'hemophilia': [
        { id: 'dose-card', label: 'Dose Card', icon: '🩸', action: 'overlay', target: 'hemo-emergent-dosing' },
        { id: 'factor-calc', label: 'Factor Calc', icon: '🧮', action: 'calculator', target: 'factor-dosing' },
        { id: 'inhibitors', label: 'Inhibitors', icon: '⚠️', action: 'overlay', target: 'hemo-inhibitor-guide' },
        { id: 'vwd', label: 'vWD', icon: '🔀', action: 'jump', target: 'hemo-vwd' },
    ],
    'anticoag-reversal': [
        { id: 'acr-pcc', label: 'PCC Dose', icon: '🧮', action: 'calculator', target: 'pcc-dosing' },
        { id: 'acr-protamine', label: 'Protamine', icon: '🧮', action: 'calculator', target: 'protamine-dosing' },
        { id: 'acr-quick-ref', label: 'Quick Ref', icon: '📋', action: 'overlay', target: 'acr-reversal-summary' },
        { id: 'acr-inr', label: 'INR Guide', icon: '📊', action: 'overlay', target: 'acr-inr-guide' },
        { id: 'acr-labs', label: 'Coag Labs', icon: '🔬', action: 'overlay', target: 'acr-coag-labs' },
    ],
    'combative-patient': [
        { id: 'comb-deesc', label: 'De-escalate', icon: '🗣️', action: 'overlay', target: 'comb-deescalation' },
        { id: 'comb-dosing', label: 'Dosing', icon: '💊', action: 'overlay', target: 'comb-sedation-table' },
        { id: 'comb-restrain', label: 'Restraints', icon: '🔒', action: 'overlay', target: 'comb-restraint-protocol' },
        { id: 'comb-pops', label: 'Spec Pops', icon: '👥', action: 'overlay', target: 'comb-special-pops' },
    ],
    'chf-exacerbation': [
        { id: 'chf-ntg', label: 'SCAPE NTG', icon: '💉', action: 'calculator', target: 'chf-ntg-calc' },
        { id: 'chf-bipap', label: 'BiPAP', icon: '🫁', action: 'calculator', target: 'chf-bipap' },
        { id: 'chf-lasix', label: 'Lasix', icon: '💊', action: 'calculator', target: 'chf-lasix-calc' },
        { id: 'chf-risk', label: 'EHMRG', icon: '📊', action: 'calculator', target: 'chf-ehmrg' },
        { id: 'chf-dispo', label: 'Dispo', icon: '🏥', action: 'calculator', target: 'chf-dispo' },
    ],
    'migraine': [
        { id: 'migraine-dx', label: 'ICHD-3', icon: '✅', action: 'calculator', target: 'migraine-criteria' },
        { id: 'migraine-tx', label: 'Tx Algo', icon: '💊', action: 'calculator', target: 'migraine-tx-algo' },
        { id: 'migraine-dhe', label: 'DHE', icon: '💉', action: 'calculator', target: 'dhe-protocol' },
    ],
    'snake-envenomation': [
        { id: 'snake-severity', label: 'Severity', icon: '📊', action: 'calculator', target: 'snake-severity' },
        { id: 'snake-antivenom', label: 'Antivenom', icon: '💉', action: 'calculator', target: 'snake-antivenom' },
        { id: 'snake-recurrence', label: 'Recurrence', icon: '🔄', action: 'calculator', target: 'snake-recurrence' },
        { id: 'snake-coral', label: 'Coral Snake', icon: '🐍', action: 'calculator', target: 'coral-snake' },
    ],
    'aacg': [
        { id: 'aacg-iop', label: 'IOP', icon: '👁️', action: 'calculator', target: 'aacg-iop' },
        { id: 'aacg-tx', label: 'Tx Cascade', icon: '💊', action: 'calculator', target: 'aacg-treatment' },
        { id: 'aacg-meds', label: 'Drug Causes', icon: '💉', action: 'calculator', target: 'aacg-meds' },
    ],
    'chemical-burn': [
        { id: 'chemburn-ph', label: 'pH Monitor', icon: '🧪', action: 'calculator', target: 'chemburn-ph' },
        { id: 'chemburn-grade', label: 'Roper-Hall', icon: '📊', action: 'calculator', target: 'chemburn-grade' },
        { id: 'chemburn-tx', label: 'Treatment', icon: '💊', action: 'calculator', target: 'chemburn-treatment' },
    ],
    'orbital-cellulitis': [
        { id: 'orbital-chandler', label: 'Chandler', icon: '📊', action: 'calculator', target: 'orbital-chandler' },
        { id: 'orbital-abx', label: 'Antibiotics', icon: '💊', action: 'calculator', target: 'orbital-abx' },
        { id: 'orbital-surgery', label: 'Surgery?', icon: '🔪', action: 'calculator', target: 'orbital-surgery' },
    ],
    'crao': [
        { id: 'crao-window', label: 'tPA Window', icon: '⏱️', action: 'calculator', target: 'crao-window' },
        { id: 'crao-fundus', label: 'Fundus', icon: '👁️', action: 'calculator', target: 'crao-fundus' },
        { id: 'crao-dispo', label: 'Dispo', icon: '🏥', action: 'calculator', target: 'crao-dispo' },
    ],
    'globe-rupture': [
        { id: 'globe-ots', label: 'OTS', icon: '📊', action: 'calculator', target: 'globe-ots' },
        { id: 'globe-exam', label: 'Exam', icon: '👁️', action: 'calculator', target: 'globe-exam' },
        { id: 'globe-dispo', label: 'Checklist', icon: '✅', action: 'calculator', target: 'globe-dispo' },
    ],
    'massive-transfusion': [
        { id: 'mtp-calc', label: 'MTP Calc', icon: '🩸', action: 'calculator', target: 'mtp-component' },
        { id: 'calcium', label: 'Calcium', icon: '💉', action: 'calculator', target: 'calcium-replacement' },
        { id: 'teg', label: 'TEG', icon: '📊', action: 'calculator', target: 'teg-interpreter' },
        { id: 'blood-select', label: 'Blood Type', icon: '🅾️', action: 'calculator', target: 'emergency-blood-selection' },
    ],
    'pelvic-fracture': [
        { id: 'wses', label: 'WSES', icon: '📊', action: 'calculator', target: 'wses-pelvic' },
        { id: 'urethral', label: 'Urethral', icon: '⚠️', action: 'calculator', target: 'urethral-injury-risk' },
        { id: 'hemorrhage', label: 'Hemorrhage', icon: '🩸', action: 'calculator', target: 'pelvic-hemorrhage-source' },
    ],
    'diabetes-management': [
        { id: 'hypo-tx', label: 'Hypo Tx', icon: '💉', action: 'calculator', target: 'hypo-treatment' },
        { id: 'sliding', label: 'Sliding', icon: '📊', action: 'calculator', target: 'sliding-scale-gen' },
        { id: 'tdd', label: 'TDD', icon: '🧮', action: 'calculator', target: 'tdd-estimator' },
        { id: 'icr', label: 'ICR', icon: '🍽️', action: 'calculator', target: 'icr-calc' },
    ],
    'caustic-ingestion': [
        { id: 'caustic-agent', label: 'Acid/Alkali', icon: '🧪', action: 'calculator', target: 'caustic-agent' },
        { id: 'zargar', label: 'Zargar', icon: '📊', action: 'calculator', target: 'zargar-grade' },
    ],
    'acute-pancreatitis': [
        { id: 'bisap', label: 'BISAP', icon: '📊', action: 'calculator', target: 'bisap' },
        { id: 'atlanta', label: 'Atlanta', icon: '📋', action: 'calculator', target: 'atlanta-severity' },
        { id: 'mctsi', label: 'MCTSI', icon: '🩻', action: 'calculator', target: 'mctsi' },
        { id: 'fluid', label: 'Fluids', icon: '💧', action: 'calculator', target: 'ap-fluid-rate' },
    ],
};
/** Get the toolbar config for a consult, or an empty default */
export function getToolbarConfig(consultId) {
    return {
        consultId,
        tools: TOOLBAR_CONFIGS[consultId] ?? [],
    };
}
