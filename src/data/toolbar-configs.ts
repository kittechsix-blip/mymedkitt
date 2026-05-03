// myMedKitt — Per-Consult Toolbar Configurations
// Maps consult IDs to their contextual toolbar items.

export interface ToolbarItem {
  id: string;
  label: string;
  icon: string;
  action: 'calculator' | 'overlay' | 'jump';
  target?: string;
}

export interface ToolbarConfig {
  consultId: string;
  tools: ToolbarItem[];
}

const TOOLBAR_CONFIGS: Record<string, ToolbarItem[]> = {
  'delayed-sequence-intubation': [
    { id: 'summary', label: 'DSI Steps', icon: '📋', action: 'overlay', target: 'dsi-summary' },
    { id: 'ketamine', label: 'Ketamine', icon: '💉', action: 'overlay', target: 'dsi-ketamine' },
    { id: 'preox', label: 'Triple 15', icon: '🫁', action: 'overlay', target: 'dsi-preox' },
    { id: 'checklist', label: 'Checklist', icon: '✅', action: 'overlay', target: 'dsi-checklist' },
    { id: 'contraindications', label: 'Contra', icon: '🚫', action: 'overlay', target: 'dsi-contraindications' },
  ],
  'difficult-airway-bougie': [
    { id: 'lemon', label: 'LEMON', icon: '🍋', action: 'calculator', target: 'lemon-score' },
    { id: 'bougie', label: 'Bougie', icon: '🔧', action: 'jump', target: 'dab-technique' },
    { id: 'confirm', label: 'Confirm', icon: '✅', action: 'jump', target: 'dab-confirm' },
    { id: 'cric', label: 'Cric', icon: '🔪', action: 'jump', target: 'dab-cric-technique' },
  ],
  'anaphylaxis': [
    { id: 'criteria', label: 'Criteria', icon: '\u2705', action: 'calculator', target: 'anaphylaxis-criteria' },
    { id: 'epi-calc', label: 'Epi Calc', icon: '\uD83E\uDDEE', action: 'calculator', target: 'epi-infusion' },
    { id: 'epi-im', label: 'IM Epi', icon: '\uD83D\uDC89', action: 'jump', target: 'anaph-source-control' },
    { id: 'iv-epi', label: 'IV Epi', icon: '\uD83D\uDD34', action: 'jump', target: 'anaph-epi-infusion' },
  ],
  'diarrhea': [
    { id: 'red-flags', label: 'Red Flags', icon: '🚩', action: 'jump', target: 'diarrhea-red-flag-eval' },
    { id: 'stec', label: 'STEC', icon: '🦠', action: 'jump', target: 'diarrhea-bloody' },
    { id: 'etiology', label: 'Etiology', icon: '🔬', action: 'overlay', target: 'diarrhea-etiology' },
  ],
  'hiv': [
    { id: 'ois', label: 'OIs', icon: '\uD83E\uDDA0', action: 'jump', target: 'hiv-immunocompromised' },
    { id: 'arv-effects', label: 'ARV Effects', icon: '\uD83D\uDC8A', action: 'jump', target: 'hiv-med-overview' },
    { id: 'pep-prep', label: 'PEP/PrEP', icon: '\uD83D\uDEE1\uFE0F', action: 'jump', target: 'hiv-prevention' },
  ],
  'ct-decision-support': [
    { id: 'cchr-calc', label: 'CCHR', icon: '🧠', action: 'calculator', target: 'canadian-ct-head' },
    { id: 'wells-calc', label: 'Wells PE', icon: '🫁', action: 'calculator', target: 'wells-pe' },
    { id: 'perc-calc', label: 'PERC', icon: '✓', action: 'calculator', target: 'perc-rule' },
    { id: 'alvarado-calc', label: 'Alvarado', icon: '🔢', action: 'calculator', target: 'alvarado-score' },
    { id: 'radiation', label: 'Radiation', icon: '☢️', action: 'overlay', target: 'ct-radiation-doses' },
  ],
  'precip-delivery': [
    { id: 'deliver', label: 'Deliver', icon: '\uD83D\uDC76', action: 'jump', target: 'precip-head' },
    { id: 'cord', label: 'Cord', icon: '\uD83D\uDD17', action: 'jump', target: 'precip-cord' },
    { id: 'oxytocin', label: 'Oxytocin', icon: '\uD83D\uDC89', action: 'jump', target: 'precip-oxytocin' },
  ],
  'afe': [
    { id: 'steps', label: 'Steps', icon: '📋', action: 'overlay', target: 'afe-steps-summary' },
    { id: 'criteria', label: 'Criteria', icon: '🩺', action: 'overlay', target: 'afe-criteria' },
    { id: 'aok', label: 'A-O-K', icon: '💉', action: 'overlay', target: 'afe-aok' },
    { id: 'mtp', label: 'MTP', icon: '🩸', action: 'overlay', target: 'afe-mtp' },
    { id: 'stop', label: 'Stop', icon: '🛑', action: 'overlay', target: 'afe-stop' },
  ],
  'pph': [
    { id: 'summary', label: 'Summary', icon: '📋', action: 'overlay', target: 'pph-steps-summary' },
    { id: 'four-ts', label: '4 T’s', icon: '🩸', action: 'overlay', target: 'pph-four-ts-info' },
    { id: 'uterotonics', label: 'Uterotonics', icon: '💉', action: 'overlay', target: 'pph-uterotonic-ladder' },
    { id: 'bakri', label: 'Bakri', icon: '🎈', action: 'overlay', target: 'pph-bakri-technique' },
    { id: 'condom-cath', label: 'Condom Cath', icon: '🧰', action: 'overlay', target: 'pph-condom-catheter' },
    { id: 'bimanual', label: 'Bimanual', icon: '✋', action: 'jump', target: 'pph-bimanual-compression' },
    { id: 'shock-idx', label: 'Shock Idx', icon: '📉', action: 'calculator', target: 'shock-index' },
    { id: 'stop', label: 'Stop', icon: '🛑', action: 'overlay', target: 'pph-stop' },
  ],
  'breech-delivery': [
    { id: 'summary', label: 'Summary', icon: '📋', action: 'overlay', target: 'breech-delivery-summary' },
    { id: 'types', label: 'Types', icon: '📖', action: 'overlay', target: 'breech-types-atlas' },
    { id: 'maneuvers', label: 'Maneuvers', icon: '🔄', action: 'overlay', target: 'breech-maneuvers-atlas' },
    { id: 'lovset', label: 'Løvset', icon: '🔃', action: 'jump', target: 'breech-lovset' },
    { id: 'msv', label: 'MSV Head', icon: '👶', action: 'jump', target: 'breech-msv' },
    { id: 'entrapment', label: 'Entrapment', icon: '⚠️', action: 'jump', target: 'breech-head-entrapment' },
    { id: 'stop', label: 'Stop', icon: '🛑', action: 'overlay', target: 'breech-delivery-stop' },
  ],
  'resuscitative-hysterotomy': [
    { id: 'steps', label: 'Steps', icon: '📋', action: 'overlay', target: 'rh-summary' },
    { id: 'lud', label: 'LUD', icon: '↔️', action: 'jump', target: 'rh-lud' },
    { id: 'beauchops', label: 'BEAU-CHOPS', icon: '🔍', action: 'overlay', target: 'rh-beauchops-details' },
    { id: 'incise', label: 'Incise', icon: '🔪', action: 'jump', target: 'rh-skin-incision' },
    { id: 'apgar', label: 'APGAR', icon: '👶', action: 'calculator', target: 'apgar' },
    { id: 'checklist', label: 'Checklist', icon: '✅', action: 'overlay', target: 'rh-procedure-checklist' },
  ],
  'shoulder-dystocia': [
    { id: 'mcroberts', label: 'McRoberts', icon: '\uD83E\uDDB5', action: 'jump', target: 'sd-mcroberts' },
    { id: 'rotational', label: 'Rotational', icon: '\uD83D\uDD04', action: 'jump', target: 'sd-rotational' },
    { id: 'post-arm', label: 'Post Arm', icon: '\uD83D\uDCAA', action: 'jump', target: 'sd-posterior-arm' },
  ],
  'cord-emergencies': [
    { id: 'summary', label: 'Summary', icon: '\uD83D\uDCCB', action: 'overlay', target: 'cord-summary' },
    { id: 'somersault', label: 'Somersault', icon: '\uD83E\uDD38', action: 'overlay', target: 'cord-somersault-guide' },
    { id: 'algorithm', label: 'Prolapse', icon: '\uD83C\uDD98', action: 'overlay', target: 'cord-prolapse-algorithm' },
    { id: 'position', label: 'Position', icon: '\uD83D\uDECC', action: 'overlay', target: 'cord-knee-chest' },
    { id: 'tocolysis', label: 'Tocolysis', icon: '\uD83D\uDC89', action: 'overlay', target: 'cord-tocolysis-guide' },
    { id: 'stop', label: 'Stop', icon: '\uD83D\uDED1', action: 'overlay', target: 'cord-stop' },
  ],
  'first-trimester': [
    { id: 'ectopic', label: 'Ectopic', icon: '\uD83D\uDCCD', action: 'jump', target: 'ft-ectopic-confirmed' },
    { id: 'us-signs', label: 'US Signs', icon: '📡', action: 'overlay', target: 'ft-us-ectopic-signs' },
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
    { id: 'dex', label: 'Dex Dose', icon: '\uD83D\uDC89', action: 'jump', target: 'croup-mild-tx' },
    { id: 'discharge', label: 'Discharge', icon: '\uD83C\uDFE0', action: 'jump', target: 'croup-discharge' },
  ],
  'neonatal-resus': [
    { id: 'ppv', label: 'PPV', icon: '\uD83E\uDEC1', action: 'jump', target: 'nrp-ppv' },
    { id: 'cpr', label: 'CPR', icon: '\uD83D\uDC93', action: 'jump', target: 'nrp-cpr' },
    { id: 'epi', label: 'Epi', icon: '\uD83D\uDC89', action: 'jump', target: 'nrp-epinephrine' },
  ],
  'peds-fever': [
    { id: 'neonatal', label: '0-21d', icon: '\uD83D\uDC76', action: 'jump', target: 'pf-neo-screen' },
    { id: 'markers', label: 'Labs', icon: '\uD83E\uDDEA', action: 'jump', target: 'pf-22-im' },
    { id: 'abx', label: 'Abx', icon: '\uD83D\uDC8A', action: 'jump', target: 'pf-60-mening' },
    { id: 'discharge', label: 'Dispo', icon: '\uD83C\uDFE0', action: 'jump', target: 'pf-22-dispo' },
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
    { id: 'mri-screen', label: 'MRI Screen', icon: '\uD83E\uDDA8', action: 'overlay', target: 'stroke-mri-screen' },
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
    { id: 'anticoag', label: 'Anticoag', icon: '\uD83D\uDC89', action: 'jump', target: 'nstemi-initial-anticoag' },
    { id: 'dapt', label: 'DAPT', icon: '\uD83D\uDC8A', action: 'jump', target: 'nstemi-dapt-duration' },
    { id: 'risk-strat', label: 'Risk Strat', icon: '\uD83D\uDCCA', action: 'jump', target: 'nstemi-risk-stratify' },
  ],
  'stemi': [
    { id: 'territories', label: 'Territories', icon: '\uD83D\uDCC8', action: 'overlay', target: 'stemi-vascular-territories' },
    { id: 'sgarbossa', label: 'Sgarbossa', icon: '\uD83E\uDDE0', action: 'calculator', target: 'sgarbossa' },
    { id: 'reperfusion', label: 'Reperfusion', icon: '\u23F1\uFE0F', action: 'overlay', target: 'stemi-reperfusion-pathway' },
  ],
  'suicide-risk-assessment': [
    { id: 'cssrs', label: 'C-SSRS', icon: '📋', action: 'calculator', target: 'cssrs-screen' },
    { id: 'safety-plan', label: 'Safety Plan', icon: '📝', action: 'calculator', target: 'safety-plan-builder' },
    { id: 'risk-strat', label: 'Risk Strat', icon: '⚠️', action: 'jump', target: 'sui-high-risk' },
    { id: 'dispo', label: 'Dispo', icon: '🏥', action: 'jump', target: 'sui-discharge-criteria' },
  ],
  'afib-rvr': [
    { id: 'cardioversion', label: 'Cardiovert', icon: '⚡', action: 'jump', target: 'afib-cardioversion-protocol' },
    { id: 'rate-control', label: 'Rate Ctrl', icon: '💓', action: 'jump', target: 'afib-stable-drugs' },
    { id: 'chadsvasc', label: 'CHA₂DS₂', icon: '❤️', action: 'calculator', target: 'cha2ds2vasc' },
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
    { id: 'discharge', label: 'Discharge', icon: '\uD83C\uDFE0', action: 'overlay', target: 'na-discharge-criteria' },
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
  'chs': [
    { id: 'antiemetic', label: 'Antiemetic', icon: '💊', action: 'jump', target: 'chs-first-line' },
    { id: 'capsaicin', label: 'Capsaicin', icon: '🌶️', action: 'jump', target: 'chs-capsaicin' },
    { id: 'ddx', label: 'DDx', icon: '🔍', action: 'overlay', target: 'chs-ddx' },
    { id: 'discharge', label: 'Discharge', icon: '🏠', action: 'overlay', target: 'chs-discharge-instructions' },
    { id: 'avoid', label: 'Avoid', icon: '⛔', action: 'jump', target: 'chs-avoid' },
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
    { id: 'measure', label: 'Measure', icon: '\uD83D\uDCCF', action: 'jump', target: 'epss-measure' },
    { id: 'plax', label: 'PLAX', icon: '\uD83E\uDEC0', action: 'jump', target: 'epss-plax' },
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
  'necrotizing-fasciitis': [
    { id: 'lrinec', label: 'LRINEC', icon: '\uD83E\uDDEA', action: 'calculator', target: 'lrinec' },
    { id: 'surgery', label: 'Surgery', icon: '\uD83D\uDD2A', action: 'jump', target: 'nf-surgery' },
    { id: 'abx', label: 'Abx Rx', icon: '\uD83D\uDC8A', action: 'overlay', target: 'nf-treatment-guide' },
    { id: 'toxin', label: 'Clinda', icon: '\u2620\uFE0F', action: 'jump', target: 'nf-toxin' },
    { id: 'types', label: 'Types', icon: '\uD83E\uDDA0', action: 'overlay', target: 'nf-classification' },
  ],
  'dka': [
    { id: 'anion-gap', label: 'Anion Gap', icon: '\uD83E\uDDEA', action: 'calculator', target: 'anion-gap' },
    { id: 'insulin-drip', label: 'IV Insulin', icon: '\uD83D\uDC89', action: 'jump', target: 'dka-insulin-start' },
    { id: 'sc-insulin', label: 'SC Insulin', icon: '💉', action: 'overlay', target: 'dka-sc-insulin-guide' },
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
  'vertigo': [
    { id: 'central', label: 'Central?', icon: '⚠️', action: 'calculator', target: 'vertigo-central-checklist' },
    { id: 'hints', label: 'HINTS', icon: '👁️', action: 'overlay', target: 'vertigo-hints-guide' },
    { id: 'epley', label: 'Epley', icon: '🔄', action: 'overlay', target: 'vertigo-dix-hallpike' },
    { id: 'bppv', label: 'BPPV', icon: '💫', action: 'jump', target: 'vert-bppv-history' },
    { id: 'stop', label: 'Stop', icon: '🛑', action: 'overlay', target: 'vertigo-stop' },
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
  'le-fort-fracture': [
    { id: 'summary', label: 'Steps', icon: '📋', action: 'overlay', target: 'lefort-summary' },
    { id: 'classify', label: 'Classify', icon: '🦴', action: 'jump', target: 'lefort-classification' },
    { id: 'airway', label: 'Airway', icon: '💨', action: 'jump', target: 'lefort-airway-decision' },
    { id: 'bleed', label: 'Hemorrhage', icon: '🩸', action: 'jump', target: 'lefort-hemorrhage-initial' },
    { id: 'consults', label: 'Consults', icon: '📞', action: 'jump', target: 'lefort-consults' },
  ],
  'diabetes-management': [
    { id: 'hypo-tx', label: 'Hypo Tx', icon: '💉', action: 'calculator', target: 'hypo-treatment' },
    { id: 'sliding', label: 'Sliding', icon: '📊', action: 'calculator', target: 'sliding-scale-gen' },
    { id: 'tdd', label: 'TDD', icon: '🧮', action: 'calculator', target: 'tdd-estimator' },
    { id: 'insulin-dc', label: 'Insulin DC', icon: '📄', action: 'overlay', target: 'dm-insulin-discharge' },
    { id: 'oral-dc', label: 'Oral DC', icon: '💊', action: 'overlay', target: 'dm-oral-discharge' },
  ],
  'caustic-ingestion': [
    { id: 'caustic-agent', label: 'Acid/Alkali', icon: '🧪', action: 'calculator', target: 'caustic-agent' },
    { id: 'zargar', label: 'Zargar', icon: '📊', action: 'calculator', target: 'zargar' },
    { id: 'airway', label: 'Airway', icon: '\uD83D\uDCA8', action: 'jump', target: 'caustic-airway-assess' },
    { id: 'egd', label: 'EGD', icon: '\uD83D\uDD2C', action: 'jump', target: 'caustic-egd-timing' },
  ],
  'acute-pancreatitis': [
    { id: 'bisap', label: 'BISAP', icon: '📊', action: 'calculator', target: 'bisap' },
    { id: 'atlanta', label: 'Atlanta', icon: '📋', action: 'calculator', target: 'atlanta-severity' },
    { id: 'mctsi', label: 'MCTSI', icon: '🩻', action: 'calculator', target: 'mctsi' },
    { id: 'fluid', label: 'Fluids', icon: '💧', action: 'calculator', target: 'ap-fluid-rate' },
  ],
  'upper-gi-bleed': [
    { id: 'summary', label: 'Steps', icon: '📋', action: 'overlay', target: 'ugib-summary' },
    { id: 'gbs', label: 'GBS', icon: '📊', action: 'calculator', target: 'gbs' },
    { id: 'aims65', label: 'AIMS65', icon: '⚠️', action: 'calculator', target: 'aims65' },
    { id: 'variceal', label: 'Varices', icon: '🩸', action: 'jump', target: 'ugib-variceal-pathway' },
    { id: 'blakemore', label: 'Blakemore', icon: '🎈', action: 'jump', target: 'ugib-blakemore-indications' },
  ],
  'serotonin-syndrome': [
    { id: 'hunter', label: 'Hunter', icon: '✅', action: 'calculator', target: 'hunter-criteria' },
    { id: 'ss-nms', label: 'SS vs NMS', icon: '🔀', action: 'calculator', target: 'ss-vs-nms' },
    { id: 'drug-list', label: 'Drug List', icon: '💊', action: 'calculator', target: 'ss-drug-list' },
    { id: 'cypro', label: 'Cypro', icon: '💉', action: 'calculator', target: 'cyproheptadine-dose' },
  ],
  'digoxin-toxicity': [
    { id: 'digifab', label: 'DigiFab', icon: '💉', action: 'calculator', target: 'dig-fab-dosing' },
    { id: 'dig-ecg', label: 'ECG', icon: '📈', action: 'calculator', target: 'dig-ecg' },
    { id: 'acute-chronic', label: 'Acute/Chronic', icon: '🔀', action: 'calculator', target: 'dig-acute-chronic' },
    { id: 'arrhythmia', label: 'Arrhythmia', icon: '💓', action: 'calculator', target: 'dig-arrhythmia' },
    { id: 'interactions', label: 'Interactions', icon: '⚠️', action: 'calculator', target: 'dig-drug-interactions' },
  ],
  'beta-blocker-od': [
    { id: 'bb-hiet', label: 'HIET', icon: '💉', action: 'calculator', target: 'bb-hiet' },
    { id: 'bb-glucagon', label: 'Glucagon', icon: '💊', action: 'calculator', target: 'bb-glucagon' },
    { id: 'bb-intralipid', label: 'Intralipid', icon: '🧴', action: 'calculator', target: 'bb-intralipid' },
    { id: 'bb-pressors', label: 'Pressors', icon: '📈', action: 'calculator', target: 'bb-pressors' },
    { id: 'bb-agents', label: 'Agent Guide', icon: '📋', action: 'calculator', target: 'bb-agent-guide' },
  ],
  'ccb-od': [
    { id: 'ccb-shock', label: 'Shock Type', icon: '🔀', action: 'calculator', target: 'ccb-shock-type' },
    { id: 'ccb-hiet', label: 'HIET', icon: '💉', action: 'calculator', target: 'ccb-hiet' },
    { id: 'ccb-calcium', label: 'Calcium', icon: '💊', action: 'calculator', target: 'ccb-calcium' },
    { id: 'ccb-pressors', label: 'Pressors', icon: '📈', action: 'calculator', target: 'ccb-pressors' },
    { id: 'ccb-intralipid', label: 'Intralipid', icon: '🧴', action: 'calculator', target: 'ccb-intralipid' },
  ],
  'iron-od': [
    { id: 'iron-calc', label: 'Iron Calc', icon: '🧮', action: 'calculator', target: 'iron-calc' },
    { id: 'iron-level', label: 'Level', icon: '📊', action: 'calculator', target: 'iron-level' },
    { id: 'iron-dfo', label: 'DFO', icon: '💉', action: 'calculator', target: 'iron-dfo' },
    { id: 'iron-wbi', label: 'WBI', icon: '💧', action: 'calculator', target: 'iron-wbi' },
    { id: 'iron-stages', label: 'Stages', icon: '📋', action: 'calculator', target: 'iron-stages' },
  ],
  'co-toxicity': [
    { id: 'co-level', label: 'COHb', icon: '📊', action: 'calculator', target: 'co-level' },
    { id: 'co-hbo', label: 'HBO', icon: '🫁', action: 'calculator', target: 'co-hbo' },
    { id: 'co-halflife', label: 'Half-Life', icon: '⏱️', action: 'calculator', target: 'co-half-life' },
    { id: 'co-pregnancy', label: 'Pregnancy', icon: '🤰', action: 'calculator', target: 'co-pregnancy' },
    { id: 'co-cyanide', label: 'Cyanide', icon: '⚠️', action: 'calculator', target: 'co-cyanide' },
  ],
  'toxic-alcohols': [
    { id: 'tox-osm', label: 'Osm Gap', icon: '🧮', action: 'calculator', target: 'tox-alc-osmolar' },
    { id: 'tox-which', label: 'Which?', icon: '🔀', action: 'calculator', target: 'tox-alc-which' },
    { id: 'tox-fome', label: 'Fomepizole', icon: '💉', action: 'calculator', target: 'tox-alc-fomepizole' },
    { id: 'tox-lethal', label: 'Lethal', icon: '☠️', action: 'calculator', target: 'tox-alc-lethal' },
    { id: 'tox-hd', label: 'Dialysis', icon: '🩸', action: 'calculator', target: 'tox-alc-dialysis-criteria' },
    { id: 'tox-etoh', label: 'Ethanol', icon: '🍺', action: 'calculator', target: 'tox-alc-ethanol' },
  ],
  'guillain-barre': [
    { id: 'gbs-fvc', label: 'FVC/NIF', icon: '🫁', action: 'calculator', target: 'gbs-fvc-nif' },
    { id: 'gbs-egris', label: 'EGRIS', icon: '📊', action: 'calculator', target: 'gbs-egris' },
    { id: 'gbs-ivig', label: 'IVIG/PLEX', icon: '💉', action: 'calculator', target: 'gbs-ivig-plex' },
    { id: 'gbs-lp', label: 'LP Interp', icon: '🧪', action: 'calculator', target: 'gbs-lp-interp' },
    { id: 'gbs-variants', label: 'Variants', icon: '🔀', action: 'calculator', target: 'gbs-variants' },
    { id: 'gbs-intubation', label: 'Intubate', icon: '⚠️', action: 'calculator', target: 'gbs-intubation' },
  ],
  'myasthenia-gravis': [
    { id: 'mg-crisis', label: 'Crisis DDx', icon: '🔀', action: 'calculator', target: 'mg-crisis' },
    { id: 'mg-fvc', label: 'FVC/NIF', icon: '🫁', action: 'calculator', target: 'mg-fvc-nif' },
    { id: 'mg-drugs', label: 'Drug Avoid', icon: '⛔', action: 'calculator', target: 'mg-drugs-avoid' },
    { id: 'mg-mgfa', label: 'MGFA', icon: '📊', action: 'calculator', target: 'mg-mgfa' },
    { id: 'mg-ice', label: 'Ice Test', icon: '🧊', action: 'calculator', target: 'mg-ice-test' },
    { id: 'mg-pyridostigmine', label: 'Mestinon', icon: '💊', action: 'calculator', target: 'mg-pyridostigmine' },
    { id: 'mg-ivig', label: 'IVIG/PLEX', icon: '💉', action: 'calculator', target: 'mg-ivig-plex' },
  ],
  'botulism': [
    { id: 'bot-types', label: 'Types', icon: '🔀', action: 'calculator', target: 'bot-types' },
    { id: 'bot-ddx', label: 'DDx', icon: '📋', action: 'calculator', target: 'bot-ddx' },
    { id: 'bot-antitoxin', label: 'Antitoxin', icon: '💉', action: 'calculator', target: 'bot-antitoxin' },
    { id: 'bot-timeline', label: 'Timeline', icon: '⏱️', action: 'calculator', target: 'bot-timeline' },
    { id: 'bot-ivdu', label: 'IVDU', icon: '💊', action: 'calculator', target: 'bot-ivdu' },
    { id: 'bot-infant', label: 'Infant', icon: '👶', action: 'calculator', target: 'bot-infant' },
  ],
  'aortic-aneurysm': [
    { id: 'dissection', label: 'Dissection', icon: '🫀', action: 'jump', target: 'aortic-dissection-eval' },
    { id: 'aaa', label: 'AAA', icon: '🚨', action: 'jump', target: 'aortic-aaa-eval' },
    { id: 'anti-impulse', label: 'Anti-Impulse', icon: '💉', action: 'jump', target: 'aortic-hemo-dissection' },
    { id: 'classify', label: 'Classify', icon: '🔀', action: 'jump', target: 'aortic-classify' },
    { id: 'add-rs', label: 'ADD-RS', icon: '📊', action: 'calculator', target: 'add-rs' },
  ],
  'aortic-dissection': [
    { id: 'add-rs', label: 'ADD-RS', icon: '📊', action: 'calculator', target: 'add-rs' },
    { id: 'beta-block', label: 'Beta Block', icon: '💉', action: 'jump', target: 'dissect-beta-blocker' },
    { id: 'type-ab', label: 'Type A vs B', icon: '🔀', action: 'jump', target: 'dissect-type-decision' },
    { id: 'hypotensive', label: 'Hypotensive', icon: '🚨', action: 'jump', target: 'dissect-hypotension' },
  ],
  'bronchiolitis': [
    { id: 'bas', label: 'BAS', icon: '📊', action: 'calculator', target: 'bas' },
    { id: 'hfnc', label: 'HFNC', icon: '💨', action: 'jump', target: 'bronch-hfnc-init' },
    { id: 'severity', label: 'Severity', icon: '📋', action: 'jump', target: 'bronch-severity' },
    { id: 'not-rec', label: 'Avoid', icon: '❌', action: 'overlay', target: 'bronch-not-recommended' },
  ],
  'brugada-syndrome': [
    { id: 'shanghai', label: 'Shanghai', icon: '📊', action: 'calculator', target: 'brugada-shanghai' },
    { id: 'drugs-avoid', label: 'Drug List', icon: '⛔', action: 'calculator', target: 'brugada-drugs-avoid' },
    { id: 'ecg', label: 'ECG Types', icon: '📈', action: 'jump', target: 'brugada-ecg-patterns' },
    { id: 'storm', label: 'VF Storm', icon: '⚡', action: 'jump', target: 'brugada-storm' },
    { id: 'fever', label: 'Fever', icon: '🌡️', action: 'jump', target: 'brugada-fever' },
  ],
  'button-battery': [
    { id: 'risk', label: 'Risk', icon: '📊', action: 'calculator', target: 'battery-risk-stratification' },
    { id: 'esophageal', label: 'Esophageal', icon: '🚨', action: 'jump', target: 'battery-esophageal' },
    { id: 'aef', label: 'AEF', icon: '🫀', action: 'jump', target: 'battery-aef' },
    { id: 'avoid', label: 'Avoid', icon: '❌', action: 'jump', target: 'battery-avoid' },
  ],
  'cardiogenic-shock': [
    { id: 'crash', label: 'Crash', icon: '🚨', action: 'jump', target: 'cs-crash' },
    { id: 'pressors', label: 'Pressors', icon: '💉', action: 'jump', target: 'cs-pressors' },
    { id: 'mcs', label: 'MCS', icon: '❤️', action: 'jump', target: 'cs-mcs' },
    { id: 'wet-dry', label: 'Wet/Dry', icon: '💧', action: 'jump', target: 'cs-wet-dry' },
    { id: 'rv', label: 'RV Failure', icon: '🫀', action: 'jump', target: 'cs-rv-failure' },
  ],
  'cervical-artery-dissection': [
    { id: 'nihss', label: 'NIHSS', icon: '🧠', action: 'calculator', target: 'nihss' },
    { id: 'strangulation', label: 'Strangulation', icon: '🚨', action: 'jump', target: 'cad-strangulation' },
    { id: 'red-flags', label: 'Red Flags', icon: '🚩', action: 'jump', target: 'cad-red-flags' },
    { id: 'treatment', label: 'Treatment', icon: '💊', action: 'jump', target: 'cad-treatment' },
    { id: 'safety', label: 'IPV Safety', icon: '🛡️', action: 'jump', target: 'cad-safety' },
  ],
  'code-status': [
    { id: 'rapid', label: '30 Sec', icon: '⏱️', action: 'jump', target: 'code-rapid' },
    { id: 'phrases', label: 'Phrases', icon: '💬', action: 'jump', target: 'code-key-phrases' },
    { id: 'framework', label: 'REMAP', icon: '📋', action: 'jump', target: 'code-framework' },
    { id: 'everything', label: '"Everything"', icon: '🤔', action: 'jump', target: 'code-everything' },
  ],
  'oxygen-delivery': [
    { id: 'o2-settings', label: 'O2 Settings', icon: '⚙️', action: 'calculator', target: 'oxygen-settings' },
    { id: 'rox', label: 'ROX Index', icon: '📊', action: 'calculator', target: 'rox-index' },
    { id: 'escalation', label: 'Escalate', icon: '🔺', action: 'jump', target: 'o2-escalation' },
    { id: 'devices', label: 'Devices', icon: '🫁', action: 'jump', target: 'o2-severity' },
  ],
  'copd-exacerbation': [
    { id: 'bipap', label: 'BiPAP', icon: '💨', action: 'jump', target: 'copd-niv-indication' },
    { id: 'abx', label: 'Abx', icon: '💊', action: 'jump', target: 'copd-antibiotics' },
    { id: 'severity', label: 'Severity', icon: '📊', action: 'jump', target: 'copd-severity' },
    { id: 'intubation', label: 'Intubate', icon: '🚨', action: 'jump', target: 'copd-intubation' },
  ],
  'cvst': [
    { id: 'cvt-gs', label: 'CVT-GS', icon: '📊', action: 'calculator', target: 'cvt-gs' },
    { id: 'iscvt', label: 'ISCVT-RS', icon: '📋', action: 'calculator', target: 'iscvt-rs' },
    { id: 'anticoag', label: 'Anticoag', icon: '💉', action: 'jump', target: 'cvst-treatment' },
    { id: 'ich-safe', label: 'ICH + AC', icon: '✅', action: 'jump', target: 'cvst-ich-anticoag' },
    { id: 'pregnancy', label: 'Pregnancy', icon: '🤰', action: 'jump', target: 'cvst-pregnancy' },
  ],
  'deep-neck-infection': [
    { id: 'airway', label: 'Airway', icon: '💨', action: 'jump', target: 'dni-airway-assess' },
    { id: 'ludwig', label: 'Ludwig', icon: '🚨', action: 'jump', target: 'dni-ludwig' },
    { id: 'abx', label: 'Abx', icon: '💊', action: 'calculator', target: 'dni-empiric-abx' },
    { id: 'lemierre', label: 'Lemierre', icon: '🦠', action: 'jump', target: 'dni-lemierre' },
    { id: 'pta', label: 'PTA', icon: '🩹', action: 'jump', target: 'dni-pta' },
  ],
  'delirium': [
    { id: '4at', label: '4AT', icon: '🔢', action: 'calculator', target: '4at' },
    { id: 'rass', label: 'RASS', icon: '📊', action: 'calculator', target: 'rass' },
    { id: 'summary', label: 'Steps', icon: '📋', action: 'overlay', target: 'delirium-summary' },
    { id: 'meds', label: 'Med Rx', icon: '💊', action: 'jump', target: 'del-pharm-decision' },
    { id: 'elderly', label: 'Elderly', icon: '👴', action: 'jump', target: 'del-elderly' },
    { id: 'cam', label: 'CAM', icon: '🧠', action: 'overlay', target: 'del-cam-guide' },
  ],
  'organic-vs-psych': [
    { id: 'red-flags', label: 'Red Flags', icon: '🚩', action: 'overlay', target: 'ovp-red-flags-summary' },
    { id: 'aeiou', label: 'AEIOU-TIPS', icon: '🔤', action: 'overlay', target: 'ovp-aeiou-tips' },
    { id: 'cam', label: 'CAM', icon: '🧠', action: 'overlay', target: 'ovp-cam-tool' },
    { id: 'mimics', label: 'Mimics', icon: '🎭', action: 'overlay', target: 'ovp-organic-mimics' },
    { id: 'compare', label: 'Del vs Psych', icon: '⚖️', action: 'overlay', target: 'ovp-delirium-vs-psych' },
  ],
  'dental-avulsion': [
    { id: 'reimplant', label: 'Reimplant', icon: '🦷', action: 'jump', target: 'avulsion-reimplant' },
    { id: 'storage', label: 'Storage', icon: '🥛', action: 'jump', target: 'avulsion-storage' },
    { id: 'splint', label: 'Splint', icon: '🩹', action: 'jump', target: 'avulsion-splint' },
    { id: 'meds', label: 'Meds', icon: '💊', action: 'jump', target: 'avulsion-meds' },
  ],
  'dental-trauma': [
    { id: 'summary', label: 'Steps', icon: '📋', action: 'overlay', target: 'dental-trauma-steps' },
    { id: 'ellis', label: 'Ellis Fx', icon: '🦷', action: 'jump', target: 'dental-ellis1' },
    { id: 'avulsion', label: 'Avulsion', icon: '🩸', action: 'jump', target: 'dental-avulsion-permanent' },
    { id: 'luxation', label: 'Luxation', icon: '↔️', action: 'jump', target: 'dental-luxation-type' },
    { id: 'splint', label: 'Splint', icon: '🩹', action: 'jump', target: 'dental-splinting' },
  ],
  'eclampsia': [
    { id: 'map', label: 'MAP', icon: '📊', action: 'calculator', target: 'map-calculator' },
    { id: 'mag-load', label: 'Mag Load', icon: '💉', action: 'jump', target: 'eclampsia-mag-loading' },
    { id: 'mag-tox', label: 'Mag Tox', icon: '⚠️', action: 'jump', target: 'eclampsia-mag-toxicity' },
    { id: 'bp-rx', label: 'BP Protocol', icon: '🩺', action: 'jump', target: 'eclampsia-bp-labetalol' },
    { id: 'hellp', label: 'HELLP', icon: '🚨', action: 'jump', target: 'eclampsia-hellp' },
  ],
  'htn-pregnancy': [
    { id: 'summary', label: 'Steps', icon: '📋', action: 'overlay', target: 'htnp-steps-summary' },
    { id: 'classify', label: 'Classify', icon: '📖', action: 'overlay', target: 'htnp-classification' },
    { id: 'severe-bp', label: 'Severe BP', icon: '🩺', action: 'jump', target: 'htnp-severe-acute' },
    { id: 'map', label: 'MAP', icon: '📊', action: 'calculator', target: 'map-calculator' },
    { id: 'mag', label: 'Mag Rx', icon: '💉', action: 'jump', target: 'htnp-mag-prophylaxis' },
    { id: 'hellp', label: 'HELLP', icon: '🚨', action: 'overlay', target: 'htnp-hellp-criteria' },
    { id: 'asa', label: 'ASA Rx', icon: '💊', action: 'overlay', target: 'htnp-asa-guide' },
    { id: 'stop', label: 'Stop', icon: '🛑', action: 'overlay', target: 'htnp-stop' },
  ],
  'ed-methadone': [
    { id: 'cows', label: 'COWS', icon: '📊', action: 'calculator', target: 'cows' },
    { id: 'summary', label: 'Steps', icon: '📋', action: 'overlay', target: 'ed-methadone-summary' },
    { id: '72hr', label: '72hr Rule', icon: '💉', action: 'jump', target: 'meth-init-protocol' },
    { id: 'guest', label: 'Guest Dose', icon: '📞', action: 'jump', target: 'meth-guest-verify' },
    { id: 'qtc', label: 'QTc Risk', icon: '⚠️', action: 'jump', target: 'meth-qtc-risk' },
  ],
  'epistaxis': [
    { id: 'summary', label: 'Steps', icon: '📋', action: 'overlay', target: 'epistaxis-summary' },
    { id: 'ant-pack', label: 'Ant Pack', icon: '🩹', action: 'jump', target: 'epi-anterior-pack' },
    { id: 'posterior', label: 'Posterior', icon: '🚨', action: 'jump', target: 'epi-posterior' },
    { id: 'anticoag', label: 'Anticoag', icon: '💊', action: 'jump', target: 'epi-anticoag-check' },
    { id: 'txa', label: 'TXA', icon: '💉', action: 'jump', target: 'epi-topical-txa' },
  ],
  'extensor-tendon': [
    { id: 'zones', label: 'Zones', icon: '🔀', action: 'jump', target: 'ext-zones' },
    { id: 'repair', label: 'Repair', icon: '🩹', action: 'jump', target: 'ext-repair-overview' },
    { id: 'splints', label: 'Splints', icon: '✋', action: 'jump', target: 'ext-splint-overview' },
    { id: 'dispo', label: 'Dispo', icon: '🏥', action: 'jump', target: 'ext-disposition' },
    { id: 'exam', label: 'Exam', icon: '🔍', action: 'jump', target: 'ext-exam' },
  ],
  'hd-emergencies': [
    { id: 'hyperk', label: 'HyperK', icon: '⚡', action: 'calculator', target: 'hd-hyperkalemia' },
    { id: 'severe-k', label: 'Severe K+', icon: '🚨', action: 'jump', target: 'hd-hyperkalemia-severe' },
    { id: 'access', label: 'Access', icon: '🩹', action: 'jump', target: 'hd-access-main' },
    { id: 'infection', label: 'Infection', icon: '🦠', action: 'jump', target: 'hd-infection-main' },
    { id: 'overload', label: 'Overload', icon: '💧', action: 'jump', target: 'hd-overload-main' },
  ],
  'heat-stroke': [
    { id: 'discharge-safe', label: 'Discharge Safe?', icon: '✅', action: 'calculator', target: 'heat-discharge-safe' },
    { id: 'cooling', label: 'Cooling', icon: '🧊', action: 'jump', target: 'hs-cooling-start' },
    { id: 'method', label: 'Method', icon: '💧', action: 'jump', target: 'hs-cooling-method' },
    { id: 'rhabdo', label: 'Rhabdo', icon: '🧪', action: 'jump', target: 'hs-rhabdo' },
    { id: 'complications', label: 'Complications', icon: '⚠️', action: 'jump', target: 'hs-complications' },
    { id: 'seizure', label: 'Seizure Rx', icon: '⚡', action: 'jump', target: 'hs-seizure-rx' },
  ],
  'hypothermia': [
    { id: 'hypo-temp', label: 'Temp Convert', icon: '🌡️', action: 'calculator', target: 'hypo-temp-convert' },
    { id: 'hypo-key', label: 'Key Temps', icon: '🎯', action: 'calculator', target: 'hypo-key-temps' },
    { id: 'hypo-swiss', label: 'Swiss Stage', icon: '🏔️', action: 'calculator', target: 'hypo-swiss-stage' },
    { id: 'hypo-resus', label: 'Resus Criteria', icon: '❌', action: 'calculator', target: 'hypo-resus-criteria' },
    { id: 'hypo-hope', label: 'HOPE Score', icon: '📊', action: 'calculator', target: 'hypo-hope-score' },
    { id: 'hypo-rewarm', label: 'Rewarming', icon: '🔥', action: 'calculator', target: 'hypo-rewarming' },
    { id: 'hypo-transport', label: 'ECMO Transport', icon: '🚑', action: 'calculator', target: 'hypo-ecmo-transport' },
  ],
  'awake-intubation': [
    { id: 'awake-who', label: 'Who Needs?', icon: '❓', action: 'calculator', target: 'awake-who-needs' },
    { id: 'awake-topical', label: 'Topical Prep', icon: '💊', action: 'calculator', target: 'awake-topical-prep' },
    { id: 'awake-atomized', label: 'Atomized', icon: '💨', action: 'calculator', target: 'awake-atomized-recipe' },
    { id: 'awake-nasal', label: 'Nasal Steps', icon: '👃', action: 'calculator', target: 'awake-nasal-steps' },
    { id: 'awake-oral', label: 'Oral Steps', icon: '👄', action: 'calculator', target: 'awake-oral-steps' },
    { id: 'awake-go', label: 'See → Go', icon: '✅', action: 'calculator', target: 'awake-see-cords-go' },
  ],
  'hfnc': [
    { id: 'rox', label: 'ROX', icon: '📊', action: 'calculator', target: 'rox-index' },
    { id: 'settings', label: 'Settings', icon: '⚙️', action: 'calculator', target: 'hfnc-settings' },
    { id: 'setup', label: 'Setup', icon: '🩹', action: 'jump', target: 'hfnc-setup' },
    { id: 'compare', label: 'Compare', icon: '🔀', action: 'jump', target: 'hfnc-comparison' },
    { id: 'failure', label: 'Failure', icon: '🚨', action: 'jump', target: 'hfnc-failure-criteria' },
  ],
  'human-trafficking': [
    { id: 'red-flags', label: 'Red Flags', icon: '🚩', action: 'jump', target: 'ht-red-flags' },
    { id: 'screen', label: 'Screen', icon: '📋', action: 'jump', target: 'ht-screen' },
    { id: 'response', label: 'Response', icon: '💬', action: 'jump', target: 'ht-response' },
    { id: 'resources', label: 'Resources', icon: '📞', action: 'jump', target: 'ht-resources' },
    { id: 'minor', label: 'Minor', icon: '👶', action: 'jump', target: 'ht-minor' },
  ],
  'intralipid': [
    { id: 'dosing', label: 'Dosing', icon: '💉', action: 'jump', target: 'ile-dosing-protocol' },
    { id: 'last', label: 'LAST', icon: '🚨', action: 'jump', target: 'ile-last' },
    { id: 'cpr-mods', label: 'CPR Mods', icon: '❤️', action: 'jump', target: 'ile-cpr-modifications' },
    { id: 'indications', label: 'Indications', icon: '🔀', action: 'jump', target: 'ile-indications-question' },
    { id: 'monitor', label: 'Monitor', icon: '📊', action: 'jump', target: 'ile-monitoring' },
  ],
  'laryngeal-trauma': [
    { id: 'unstable', label: 'Unstable', icon: '🚨', action: 'jump', target: 'larynx-unstable-airway' },
    { id: 'airway', label: 'Airway', icon: '💨', action: 'jump', target: 'larynx-airway-options' },
    { id: 'grade', label: 'Grading', icon: '📊', action: 'jump', target: 'larynx-classification' },
    { id: 'cric', label: 'Cric?', icon: '⚠️', action: 'jump', target: 'larynx-crico-decision' },
    { id: 'imaging', label: 'Imaging', icon: '🩻', action: 'jump', target: 'larynx-imaging' },
  ],
  'marine-envenomation': [
    { id: 'id-tool', label: 'ID Tool', icon: '🔍', action: 'jump', target: 'marine-toxidrome' },
    { id: 'jellyfish', label: 'Jellyfish', icon: '🪼', action: 'jump', target: 'marine-cnidarian' },
    { id: 'fish', label: 'Fish', icon: '🐟', action: 'jump', target: 'marine-fish' },
    { id: 'other', label: 'Other', icon: '🐙', action: 'jump', target: 'marine-other' },
    { id: 'systemic', label: 'Systemic', icon: '💉', action: 'jump', target: 'marine-systemic' },
  ],
  'massive-hemoptysis': [
    { id: 'position', label: 'Position', icon: '🛏️', action: 'jump', target: 'hemo-positioning' },
    { id: 'txa', label: 'TXA', icon: '💉', action: 'jump', target: 'hemo-txa' },
    { id: 'intubate', label: 'Intubate', icon: '🚨', action: 'jump', target: 'hemo-ett-selection' },
    { id: 'anticoag', label: 'Anticoag', icon: '💊', action: 'jump', target: 'hemo-coag-reversal' },
    { id: 'bae', label: 'BAE', icon: '🫁', action: 'jump', target: 'hemo-bae' },
  ],
  'measles': [
    { id: 'immunity', label: 'Immunity', icon: '📊', action: 'calculator', target: 'measles-immunity' },
    { id: 'pep-tool', label: 'PEP Tool', icon: '📋', action: 'calculator', target: 'measles-pep' },
    { id: 'vit-a', label: 'Vitamin A', icon: '💊', action: 'calculator', target: 'measles-vitamin-a' },
    { id: 'complications', label: 'Complications', icon: '⚠️', action: 'jump', target: 'measles-complications' },
    { id: 'pep', label: 'PEP', icon: '💉', action: 'jump', target: 'measles-pep-question' },
  ],
  'methemoglobinemia': [
    { id: 'methb', label: 'MetHb Level', icon: '📊', action: 'calculator', target: 'methb-level' },
    { id: 'mb-dose', label: 'MB Dose', icon: '🧮', action: 'calculator', target: 'methb-blue-dosing' },
    { id: 'g6pd-risk', label: 'G6PD Risk', icon: '⚠️', action: 'calculator', target: 'methb-g6pd-risk' },
    { id: 'mb-protocol', label: 'MB Protocol', icon: '💉', action: 'jump', target: 'methb-mb-protocol' },
    { id: 'g6pd', label: 'G6PD Path', icon: '🔀', action: 'jump', target: 'methb-g6pd' },
  ],
  'nail-bed-injuries': [
    { id: 'hematoma', label: 'Hematoma', icon: '🩸', action: 'jump', target: 'nail-hematoma' },
    { id: 'trephination', label: 'Trephinate', icon: '🔥', action: 'jump', target: 'nail-trephination' },
    { id: 'repair', label: 'Repair', icon: '🩹', action: 'jump', target: 'nail-bed-repair' },
    { id: 'complex', label: 'Complex', icon: '⚠️', action: 'jump', target: 'nail-complex' },
  ],
  'nat-screening': [
    { id: 'ten4', label: 'TEN-4', icon: '📊', action: 'calculator', target: 'nat-ten4-facesp' },
    { id: 'fractures', label: 'Fractures', icon: '🦴', action: 'jump', target: 'nat-fractures' },
    { id: 'aht', label: 'AHT', icon: '🧠', action: 'jump', target: 'nat-aht' },
    { id: 'reporting', label: 'Reporting', icon: '📞', action: 'jump', target: 'nat-reporting' },
    { id: 'ddx', label: 'DDx', icon: '🔍', action: 'jump', target: 'nat-differential' },
  ],
  'pe-pregnancy': [
    { id: 'massive', label: 'Massive PE', icon: '🚨', action: 'jump', target: 'pep-massive' },
    { id: 'lysis', label: 'Lysis', icon: '💉', action: 'jump', target: 'pep-thrombolysis' },
    { id: 'lmwh', label: 'LMWH Rx', icon: '💊', action: 'jump', target: 'pep-lmwh-dosing' },
    { id: 'pesi', label: 'PESI', icon: '📊', action: 'calculator', target: 'pesi' },
  ],
  'peds-osteomyelitis': [
    { id: 'kocher', label: 'Kocher', icon: '📊', action: 'calculator', target: 'kocher-criteria' },
    { id: 'crp', label: 'CRP Trend', icon: '📈', action: 'calculator', target: 'crp-trend' },
    { id: 'iv-oral', label: 'IV→PO', icon: '💊', action: 'calculator', target: 'iv-oral-transition' },
    { id: 'mrsa-abx', label: 'MRSA Abx', icon: '💉', action: 'jump', target: 'osteo-abx-mrsa' },
    { id: 'surgery', label: 'Surgery', icon: '🔪', action: 'jump', target: 'osteo-surgical-consult' },
  ],
  'peds-stec-hus': [
    { id: 'hus-severity', label: 'HUS', icon: '🚨', action: 'jump', target: 'hus-severity' },
    { id: 'transfusion', label: 'Transfuse', icon: '🩸', action: 'jump', target: 'hus-transfusion' },
    { id: 'dialysis', label: 'Dialysis', icon: '💧', action: 'jump', target: 'hus-dialysis' },
    { id: 'abx-debate', label: 'Abx Debate', icon: '⚖️', action: 'jump', target: 'stec-abx-controversy' },
  ],
  'peds-submersion': [
    { id: 'severity', label: 'Severity', icon: '📊', action: 'calculator', target: 'peds-submersion-severity' },
    { id: 'prognosis', label: 'Prognosis', icon: '📋', action: 'calculator', target: 'peds-drowning-prognosis' },
    { id: 'obs', label: 'Obs Criteria', icon: '⏱️', action: 'calculator', target: 'submersion-observation' },
    { id: 'arrest', label: 'Arrest', icon: '🚨', action: 'jump', target: 'submersion-arrest' },
    { id: 'resp-tx', label: 'Resp Tx', icon: '🫁', action: 'jump', target: 'submersion-resp-treatment' },
  ],
  'psych-assessment': [
    { id: 'cssrs', label: 'C-SSRS', icon: '📋', action: 'calculator', target: 'cssrs-screen' },
    { id: 'si-hi', label: 'SI/HI', icon: '⚠️', action: 'jump', target: 'psych-safety' },
    { id: 'active-si', label: 'Active SI', icon: '🚨', action: 'jump', target: 'psych-si-active' },
    { id: 'dispo', label: 'Dispo', icon: '🏥', action: 'jump', target: 'psych-disposition' },
  ],
  'psychiatry-assessment': [
    { id: 'thought', label: 'Thought', icon: '🧠', action: 'jump', target: 'mse-thought-process-content' },
    { id: 'risk', label: 'Risk', icon: '⚠️', action: 'jump', target: 'mse-insight-judgment-risk' },
    { id: 'perception', label: 'Perception', icon: '👁️', action: 'jump', target: 'mse-perceptions-cognition' },
    { id: 'mood', label: 'Mood/Speech', icon: '💬', action: 'jump', target: 'mse-speech-mood' },
  ],
  'push-dose-pressors': [
    { id: 'map', label: 'MAP', icon: '📊', action: 'calculator', target: 'map-calculator' },
    { id: 'epi-card', label: 'Epi Card', icon: '💉', action: 'calculator', target: 'pdp-epi-quick' },
    { id: 'phenyl-card', label: 'Phenyl Card', icon: '💊', action: 'calculator', target: 'pdp-phenyl-quick' },
    { id: 'epi-prep', label: 'Epi Prep', icon: '🧪', action: 'jump', target: 'pdp-epi-prep' },
    { id: 'phenyl-prep', label: 'Phenyl Prep', icon: '🔬', action: 'jump', target: 'pdp-phenyl-prep' },
  ],
  'pta-drainage': [
    { id: 'summary', label: 'Steps', icon: '📋', action: 'overlay', target: 'pta-steps' },
    { id: 'pocus', label: 'POCUS', icon: '🔊', action: 'jump', target: 'pta-pocus' },
    { id: 'aspiration', label: 'Aspiration', icon: '💉', action: 'jump', target: 'pta-aspiration-technique' },
    { id: 'i-d', label: 'I&D', icon: '🔪', action: 'jump', target: 'pta-id-technique' },
    { id: 'abx', label: 'Abx', icon: '💊', action: 'jump', target: 'pta-antibiotics' },
  ],
  'refractory-vfvt': [
    { id: 'dsd', label: 'DSD', icon: '⚡', action: 'jump', target: 'rvf-dsd-decision' },
    { id: 'esmolol', label: 'Esmolol', icon: '💉', action: 'jump', target: 'rvf-esmolol-dose' },
    { id: 'antiarrhyth', label: 'Antiarrhyth', icon: '💊', action: 'jump', target: 'rvf-antiarrhythmic-dose' },
    { id: 'ecpr', label: 'ECPR', icon: '🫀', action: 'jump', target: 'rvf-ecpr-assess' },
    { id: 'hs-ts', label: "H's & T's", icon: '🔍', action: 'overlay', target: 'ca-hs-ts-table' },
    { id: 'etco2', label: 'ETCO₂', icon: '📊', action: 'overlay', target: 'ca-etco2-guide' },
  ],
  'vad': [
    { id: 'alarms', label: 'Alarms', icon: '🚨', action: 'overlay', target: 'vad-alarm-guide' },
    { id: 'params', label: 'Params', icon: '📊', action: 'overlay', target: 'vad-device-params' },
    { id: 'arrest', label: 'Arrest', icon: '💓', action: 'jump', target: 'vad-arrest-start' },
    { id: 'hemolysis', label: 'Hemolysis', icon: '🔬', action: 'overlay', target: 'vad-hemolysis-labs' },
    { id: 'echo', label: 'Echo', icon: '🫀', action: 'overlay', target: 'vad-echo-findings' },
  ],
  'rhabdomyolysis': [
    { id: 'mcmahon', label: 'McMahon', icon: '📊', action: 'calculator', target: 'mcmahon-rhabdo' },
    { id: 'fluids', label: 'Fluids', icon: '💧', action: 'jump', target: 'rhabdo-fluid-resus' },
    { id: 'hyperk-tx', label: 'HyperK Tx', icon: '⚡', action: 'jump', target: 'rhabdo-hyperkalemia-tx' },
    { id: 'compartment', label: 'Compartment', icon: '🚨', action: 'jump', target: 'rhabdo-compartment-eval' },
    { id: 'dispo', label: 'Dispo', icon: '🏥', action: 'jump', target: 'rhabdo-disposition' },
  ],
  'septic-arthritis': [
    { id: 'kocher', label: 'Kocher', icon: '📊', action: 'calculator', target: 'kocher-criteria' },
    { id: 'synovial', label: 'Synovial WBC', icon: '🧪', action: 'calculator', target: 'synovial-wbc' },
    { id: 'gc-guide', label: 'GC Guide', icon: '📋', action: 'calculator', target: 'gc-arthritis' },
    { id: 'empiric', label: 'Empiric Abx', icon: '💊', action: 'jump', target: 'sa-empiric-nongc' },
    { id: 'drainage', label: 'Drainage', icon: '💉', action: 'jump', target: 'sa-drainage-decision' },
  ],
  'shoulder-dislocation': [
    { id: 'isis', label: 'ISIS Score', icon: '📊', action: 'calculator', target: 'isis-score' },
    { id: 'recurrence', label: 'Recurrence', icon: '🔄', action: 'calculator', target: 'shoulder-recurrence' },
    { id: 'quebec', label: 'Quebec Rule', icon: '📋', action: 'calculator', target: 'quebec-xray' },
    { id: 'technique', label: 'Technique', icon: '🔀', action: 'jump', target: 'shoulder-technique-select' },
    { id: 'fares', label: 'FARES', icon: '✋', action: 'jump', target: 'shoulder-fares' },
  ],
  'wrist-injuries': [
    { id: 'reduction', label: 'Reduction OK?', icon: '📐', action: 'calculator', target: 'wrist-reduction-check' },
    { id: 'scaphoid', label: 'Scaphoid Risk', icon: '🔍', action: 'calculator', target: 'wrist-scaphoid-suspect' },
    { id: 'druj', label: 'DRUJ Stable?', icon: '🔄', action: 'calculator', target: 'wrist-druj-stability' },
    { id: 'cts', label: 'CTS Risk', icon: '⚠️', action: 'calculator', target: 'wrist-cts-risk' },
    { id: 'splint', label: 'Splint Guide', icon: '🩹', action: 'calculator', target: 'wrist-splint-selector' },
  ],
  'urinary-retention': [
    { id: 'red-flags', label: 'Red Flags', icon: '🚩', action: 'jump', target: 'aur-red-flags' },
    { id: 'catheter', label: 'Catheter', icon: '🩹', action: 'jump', target: 'aur-cath-technique' },
    { id: 'failed-cath', label: 'Failed Cath', icon: '⚠️', action: 'jump', target: 'aur-failed-cath' },
    { id: 'pod', label: 'POD', icon: '💧', action: 'jump', target: 'aur-pod-management' },
  ],
  'viral-myositis': [
    { id: 'mcmahon', label: 'McMahon', icon: '📊', action: 'calculator', target: 'mcmahon-rhabdo' },
    { id: 'peds-bacm', label: 'Peds BACM', icon: '👶', action: 'jump', target: 'vm-peds-presentation' },
    { id: 'rhabdo', label: 'Rhabdo', icon: '🚨', action: 'jump', target: 'vm-rhabdo' },
    { id: 'ddx', label: 'DDx', icon: '🔍', action: 'jump', target: 'vm-ddx' },
  ],
  'vp-shunt': [
    { id: 'malfunction', label: 'Malfunction', icon: '📊', action: 'calculator', target: 'vps-malfunction-criteria' },
    { id: 'pump-test', label: 'Pump Test', icon: '📋', action: 'calculator', target: 'vps-pump-test' },
    { id: 'icp', label: 'ICP Mgmt', icon: '🚨', action: 'jump', target: 'vps-emergent-icp' },
    { id: 'shunt-tap', label: 'Shunt Tap', icon: '💉', action: 'jump', target: 'vps-shunt-tap-technique' },
    { id: 'infection', label: 'Infection Rx', icon: '🦠', action: 'jump', target: 'vps-infection-treatment' },
  ],
  'xylazine-toxicity': [
    { id: 'wound-stage', label: 'Wound Stage', icon: '📊', action: 'calculator', target: 'xyl-wound-staging' },
    { id: 'wounds', label: 'Wounds', icon: '🩹', action: 'jump', target: 'xyl-wound-assess' },
    { id: 'brady', label: 'Bradycardia', icon: '💓', action: 'jump', target: 'xyl-bradycardia' },
    { id: 'withdrawal', label: 'Withdrawal', icon: '⚠️', action: 'jump', target: 'xyl-withdrawal' },
  ],
  'ecmo': [
    { id: 'ecmo-selector', label: 'VV vs VA', icon: '🔀', action: 'calculator', target: 'ecmo-vv-va-selector' },
    { id: 'ecmo-resp', label: 'RESP', icon: '🫁', action: 'calculator', target: 'ecmo-resp-score' },
    { id: 'ecmo-save', label: 'SAVE', icon: '❤️', action: 'calculator', target: 'ecmo-save-score' },
    { id: 'ecmo-murray', label: 'Murray', icon: '📊', action: 'calculator', target: 'ecmo-murray-score' },
    { id: 'ecmo-cannula', label: 'Cannula', icon: '📏', action: 'calculator', target: 'ecmo-cannula-size' },
    { id: 'ecmo-scai', label: 'SCAI', icon: '📈', action: 'calculator', target: 'ecmo-scai-stages' },
    { id: 'ecmo-ecpr', label: 'ECPR', icon: '⚡', action: 'calculator', target: 'ecmo-ecpr-criteria' },
  ],
  'torsades-de-pointes': [
    { id: 'drug-checker', label: 'QT Drugs', icon: '💊', action: 'calculator', target: 'qt-drug-checker' },
    { id: 'qtc-calc', label: 'QTc Calc', icon: '🧮', action: 'calculator', target: 'qtc-calculator' },
    { id: 'quick-card', label: 'Quick Tx', icon: '📋', action: 'overlay', target: 'tdp-quick-treatment' },
    { id: 'etco2', label: 'ETCO₂', icon: '📊', action: 'overlay', target: 'ca-etco2-guide' },
  ],
  'dfsa-workup': [
    { id: 'detection', label: 'Windows', icon: '\u23F1\uFE0F', action: 'overlay', target: 'dfsa-detection-windows' },
    { id: 'specimens', label: 'Specimens', icon: '\uD83E\uDDEA', action: 'jump', target: 'dfsa-collection-triage' },
    { id: 'prophylaxis', label: 'Prophy', icon: '\uD83D\uDC8A', action: 'jump', target: 'dfsa-prophylaxis-intro' },
    { id: 'sane', label: 'SANE', icon: '\uD83D\uDCCB', action: 'jump', target: 'dfsa-sane-check' },
  ],
  'eating-disorders': [
    { id: 'marsipan', label: 'MARSIPAN', icon: '📊', action: 'calculator', target: 'marsipan-risk' },
    { id: 'qtc', label: 'QTc', icon: '🧮', action: 'calculator', target: 'qtc-calculator' },
    { id: 'refeeding', label: 'Refeeding', icon: '🍽️', action: 'jump', target: 'ed-refeeding-protocol' },
    { id: 'lytes', label: 'Lytes', icon: '💧', action: 'jump', target: 'ed-electrolyte-replacement' },
  ],
  'peds-trauma': [
    { id: 'weight', label: 'Weight', icon: '⚖️', action: 'calculator', target: 'broselow-weight' },
    { id: 'pecarn', label: 'PECARN', icon: '🧠', action: 'calculator', target: 'pecarn-head-ct' },
    { id: 'gcs', label: 'GCS', icon: '📋', action: 'calculator', target: 'peds-gcs' },
    { id: 'nat', label: 'NAT', icon: '🚩', action: 'jump', target: 'peds-trauma-nat' },
  ],
  'pregnancy-trauma': [
    { id: 'tools', label: 'Tools', icon: '🛠️', action: 'overlay', target: 'preg-trauma-tools' },
    { id: 'hysterotomy', label: 'C-Section', icon: '🔪', action: 'overlay', target: 'preg-resuscitative-hysterotomy' },
    { id: 'ddx', label: 'Preg DDx', icon: '🩺', action: 'overlay', target: 'preg-trauma-ddx' },
    { id: 'resus', label: 'Resus Rules', icon: '❤️', action: 'overlay', target: 'preg-resus-rules' },
  ],
  'emergency-contraception': [
    { id: 'dosing', label: 'Dosing', icon: '💊', action: 'overlay', target: 'ec-dosing-guide' },
    { id: 'timing', label: 'Timing', icon: '⏱️', action: 'overlay', target: 'ec-timing-efficacy' },
    { id: 'weight', label: 'Weight', icon: '⚖️', action: 'overlay', target: 'ec-weight-guide' },
    { id: 'legal', label: 'Legal', icon: '📜', action: 'overlay', target: 'ec-legal-guide' },
    { id: 'catholic', label: 'Catholic', icon: '✝️', action: 'overlay', target: 'ec-catholic-protocol' },
  ],
  'urinary-sphincter': [
    { id: 'cauda', label: 'CES Flags', icon: '🚩', action: 'overlay', target: 'cauda-equina-red-flags' },
    { id: 'pvr', label: 'PVR', icon: '📊', action: 'jump', target: 'sphincter-pvr' },
    { id: 'cath', label: 'Catheter', icon: '🔧', action: 'jump', target: 'sphincter-cath-technique' },
    { id: 'neuro', label: 'Neuro Exam', icon: '🔍', action: 'jump', target: 'sphincter-neuro-exam' },
  ],
  'sti-comprehensive': [
    { id: 'cdc-rx', label: 'CDC Rx', icon: '📋', action: 'calculator', target: 'sti-cdc-regimens' },
    { id: 'syndromes', label: 'Syndromes', icon: '💊', action: 'jump', target: 'sti-syndrome-picker' },
    { id: 'pregnancy', label: 'Pregnancy', icon: '🤰', action: 'jump', target: 'sti-pregnancy-mods' },
    { id: 'doxypep', label: 'DoxyPEP', icon: '🧪', action: 'jump', target: 'sti-doxypep-guide' },
  ],
  'ohss': [
    { id: 'severity', label: 'Severity', icon: '📊', action: 'jump', target: 'ohss-branch-severity' },
    { id: 'fluids', label: 'Fluids', icon: '💧', action: 'jump', target: 'ohss-fluid-management' },
    { id: 'vte', label: 'VTE', icon: '🩸', action: 'jump', target: 'ohss-vte-prophylaxis' },
    { id: 'dispo', label: 'Dispo', icon: '🏥', action: 'jump', target: 'ohss-disposition' },
  ],
  'rhogam-early-pregnancy': [
    { id: 'first-tri', label: '1st Tri', icon: '🩸', action: 'jump', target: 'rhogam-first-trimester' },
    { id: 'exceptions', label: 'Exceptions', icon: '⚠️', action: 'jump', target: 'rhogam-exceptions' },
    { id: 'second-third', label: '2nd/3rd', icon: '📅', action: 'jump', target: 'rhogam-second-third' },
    { id: 'dosing', label: 'Dosing', icon: '💉', action: 'jump', target: 'rhogam-dosing' },
  ],
  'approach-to-arthritis': [
    { id: 'inflam-mech', label: 'Inflam/Mech', icon: '📊', action: 'calculator', target: 'arth-inflammatory-mechanical' },
    { id: 'synovial', label: 'Synovial', icon: '🧪', action: 'calculator', target: 'arth-synovial-interpreter' },
    { id: 'septic-risk', label: 'Septic Risk', icon: '🦠', action: 'calculator', target: 'arth-septic-risk' },
    { id: 'pattern', label: 'Pattern', icon: '🦴', action: 'calculator', target: 'arth-pattern-matcher' },
    { id: 'labs', label: 'Labs', icon: '🔬', action: 'calculator', target: 'arth-lab-interpreter' },
  ],
  'diabetic-foot-wounds': [
    { id: 'wagner-pedis', label: 'Wagner/PEDIS', icon: '📊', action: 'calculator', target: 'dfw-wagner-pedis' },
    { id: 'idsa-severity', label: 'IDSA Grade', icon: '🦠', action: 'calculator', target: 'dfw-idsa-severity' },
    { id: 'vascular', label: 'Vascular', icon: '🫀', action: 'calculator', target: 'dfw-vascular-interpreter' },
    { id: 'osteo', label: 'Osteo Risk', icon: '🦴', action: 'calculator', target: 'dfw-osteo-probability' },
    { id: 'abx', label: 'Antibiotics', icon: '💊', action: 'calculator', target: 'dfw-abx-selector' },
  ],
  'pediatric-arthritis': [
    { id: 'peds-arth-kocher', label: 'Kocher', icon: '📊', action: 'calculator', target: 'peds-arth-kocher' },
    { id: 'peds-arth-caird', label: 'Caird', icon: '🧮', action: 'calculator', target: 'peds-arth-caird' },
    { id: 'peds-arth-pattern', label: 'Pattern', icon: '👶', action: 'calculator', target: 'peds-arth-pattern-matcher' },
    { id: 'peds-arth-flags', label: 'Red Flags', icon: '🚨', action: 'calculator', target: 'peds-arth-malignancy-flags' },
    { id: 'peds-arth-jones', label: 'Jones', icon: '❤️', action: 'calculator', target: 'peds-arth-jones' },
  ],
  'gout': [
    { id: 'gout-acr-eular', label: 'ACR/EULAR', icon: '📊', action: 'calculator', target: 'gout-acr-eular' },
    { id: 'gout-treatment', label: 'Treatment', icon: '💊', action: 'calculator', target: 'gout-treatment-selector' },
    { id: 'gout-colchicine', label: 'Colchicine', icon: '💉', action: 'calculator', target: 'gout-colchicine-dosing' },
    { id: 'gout-synovial', label: 'Synovial', icon: '🧪', action: 'calculator', target: 'gout-synovial-interpreter' },
    { id: 'gout-vs-septic', label: 'vs Septic', icon: '🦠', action: 'calculator', target: 'gout-vs-septic' },
  ],
  'hop-killers': [
    { id: 'hop-hypotensive', label: 'Hypotensive', icon: '💉', action: 'calculator', target: 'hop-hypotensive-intubation' },
    { id: 'hop-hypoxic', label: 'Hypoxic', icon: '🫁', action: 'calculator', target: 'hop-hypoxic-intubation' },
    { id: 'hop-acidotic', label: 'Acidotic', icon: '⚗️', action: 'calculator', target: 'hop-acidotic-intubation' },
    { id: 'hop-rv', label: 'RV Failure', icon: '❤️', action: 'calculator', target: 'hop-rv-failure-intubation' },
    { id: 'hop-metabolic', label: 'Metabolic', icon: '⚡', action: 'calculator', target: 'hop-metabolic-intubation' },
    { id: 'hop-icp', label: 'Elevated ICP', icon: '🧠', action: 'calculator', target: 'hop-elevated-icp-intubation' },
  ],
  'tia-workup': [
    { id: 'tia-dot', label: 'TIA vs Mimic', icon: '🎯', action: 'calculator', target: 'tia-dot-score' },
    { id: 'tia-abcd2', label: 'ABCD2', icon: '📊', action: 'calculator', target: 'tia-abcd2' },
    { id: 'tia-canadian', label: 'Canadian', icon: '🍁', action: 'calculator', target: 'tia-canadian-score' },
    { id: 'tia-workup', label: 'Workup', icon: '📋', action: 'calculator', target: 'tia-workup-checklist' },
    { id: 'tia-dapt', label: 'DAPT', icon: '💊', action: 'calculator', target: 'tia-dapt-protocol' },
    { id: 'tia-dispo', label: 'Dispo', icon: '🏥', action: 'calculator', target: 'tia-disposition' },
  ],
  'multiple-sclerosis': [
    { id: 'ms-relapse', label: 'Relapse?', icon: '🔄', action: 'calculator', target: 'ms-relapse-vs-pseudo' },
    { id: 'ms-mcdonald', label: 'McDonald', icon: '📊', action: 'calculator', target: 'ms-mcdonald' },
    { id: 'ms-ontt', label: 'ON → MS', icon: '👁️', action: 'calculator', target: 'ms-ontt-risk' },
    { id: 'ms-dmt', label: 'DMT Ref', icon: '💊', action: 'calculator', target: 'ms-dmt-reference' },
    { id: 'ms-stop', label: 'Do NOT', icon: '🛑', action: 'overlay', target: 'ms-stop' },
  ],
  'peripartum-cardiomyopathy': [
    { id: 'ppcm-severity', label: 'Severity', icon: '📊', action: 'calculator', target: 'ppcm-severity-assessment' },
    { id: 'ppcm-meds', label: 'Medications', icon: '💊', action: 'calculator', target: 'ppcm-medication-guide' },
    { id: 'ppcm-anticoag', label: 'Anticoag', icon: '💉', action: 'calculator', target: 'ppcm-anticoag-guide' },
    { id: 'ppcm-prognosis', label: 'Prognosis', icon: '📈', action: 'calculator', target: 'ppcm-prognosis-factors' },
    { id: 'ppcm-delivery', label: 'Delivery', icon: '🤰', action: 'calculator', target: 'ppcm-delivery-guide' },
  ],
  'ear-fb': [
    { id: 'earfb-type', label: 'FB Type', icon: '🔍', action: 'calculator', target: 'earfb-type-identifier' },
    { id: 'earfb-contra', label: 'Contras', icon: '⚠️', action: 'calculator', target: 'earfb-contraindication' },
    { id: 'earfb-tech', label: 'Technique', icon: '🔧', action: 'calculator', target: 'earfb-technique-guide' },
    { id: 'earfb-ent', label: 'ENT Ref', icon: '📞', action: 'calculator', target: 'earfb-ent-criteria' },
  ],
  'ciguatera': [
    { id: 'cig-fish', label: 'Fish Risk', icon: '🐟', action: 'calculator', target: 'cig-fish-risk' },
    { id: 'cig-symptom', label: 'Symptoms', icon: '🩺', action: 'calculator', target: 'cig-symptom-assessment' },
    { id: 'cig-mannitol', label: 'Mannitol', icon: '💉', action: 'calculator', target: 'cig-mannitol-protocol' },
    { id: 'cig-dispo', label: 'Dispo', icon: '🏥', action: 'calculator', target: 'cig-disposition' },
  ],
  'traveler-infections': [
    { id: 'ti-geo', label: 'Geo Risk', icon: '🌍', action: 'calculator', target: 'ti-geographic-risk' },
    { id: 'ti-incub', label: 'Incubation', icon: '⏱️', action: 'calculator', target: 'ti-incubation' },
    { id: 'ti-syndrome', label: 'Syndrome DDx', icon: '🔍', action: 'calculator', target: 'ti-syndrome-ddx' },
    { id: 'ti-ppx', label: 'Malaria Ppx', icon: '💊', action: 'calculator', target: 'ti-malaria-ppx' },
    { id: 'ti-treatment', label: 'Empiric Tx', icon: '💉', action: 'calculator', target: 'ti-empiric-tx' },
    { id: 'ti-admit', label: 'Admit?', icon: '🏥', action: 'calculator', target: 'ti-admission' },
    { id: 'ti-isolation', label: 'Isolation', icon: '⚠️', action: 'calculator', target: 'ti-isolation' },
    { id: 'ti-cdc', label: 'CDC Links', icon: '📞', action: 'calculator', target: 'ti-cdc-resources' },
  ],
  'malaria': [
    { id: 'severity', label: 'Severity', icon: '🌡️', action: 'calculator', target: 'malaria-severity' },
    { id: 'parasitemia', label: 'Parasitemia', icon: '🔬', action: 'calculator', target: 'parasitemia-calc' },
    { id: 'artesunate', label: 'Artesunate', icon: '💉', action: 'calculator', target: 'artesunate-dosing' },
    { id: 'species', label: 'Species', icon: '🦠', action: 'overlay', target: 'mal-species-table' },
  ],
  // ---------------------------------------------------------------
  // Tetanus
  // ---------------------------------------------------------------
  'tetanus': [
    { id: 'prophylaxis', label: 'Prophylaxis', icon: '💉', action: 'calculator', target: 'tet-prophylaxis' },
    { id: 'spatula', label: 'Spatula', icon: '🔍', action: 'calculator', target: 'tet-spatula' },
    { id: 'severity', label: 'Severity', icon: '📊', action: 'calculator', target: 'tet-severity' },
    { id: 'management', label: 'Manage', icon: '✅', action: 'calculator', target: 'tet-management' },
  ],
  // ---------------------------------------------------------------
  // Asthma Exacerbation
  // ---------------------------------------------------------------
  'asthma-exacerbation': [
    { id: 'severity', label: 'Severity', icon: '📊', action: 'calculator', target: 'asthma-severity' },
    { id: 'pef', label: 'PEF %', icon: '💨', action: 'calculator', target: 'pef-percent' },
    { id: 'bipap', label: 'BiPAP', icon: '😷', action: 'calculator', target: 'asthma-bipap' },
    { id: 'ibw', label: 'IBW', icon: '⚖️', action: 'calculator', target: 'asthma-ibw' },
    { id: 'vent', label: 'Vent', icon: '🫁', action: 'calculator', target: 'asthma-vent' },
    { id: 'intubation', label: 'Intubate', icon: '🔧', action: 'overlay', target: 'asthma-intubation-approach' },
  ],
  // ---------------------------------------------------------------
  // Adult UTI
  // ---------------------------------------------------------------
  'adult-uti': [
    { id: 'ua', label: 'UA Interp', icon: '🧪', action: 'calculator', target: 'uti-ua-interp' },
    { id: 'crcl', label: 'CrCl', icon: '💊', action: 'calculator', target: 'uti-crcl' },
    { id: 'abx', label: 'Abx Select', icon: '💉', action: 'calculator', target: 'uti-abx-select' },
    { id: 'classify', label: 'Classify', icon: '📋', action: 'overlay', target: 'uti-classification' },
    { id: 'special', label: 'Special', icon: '⚠️', action: 'overlay', target: 'uti-special-pops' },
    { id: 'resistant', label: 'Resistant', icon: '🦠', action: 'jump', target: 'uti-resistant-start' },
  ],
  // ---------------------------------------------------------------
  // TTP
  // ---------------------------------------------------------------
  'ttp': [
    { id: 'plasmic', label: 'PLASMIC', icon: '📊', action: 'calculator', target: 'ttp-plasmic' },
    { id: 'tpe-vol', label: 'TPE Vol', icon: '🩸', action: 'calculator', target: 'ttp-tpe-volume' },
    { id: 'tma-ddx', label: 'TMA DDx', icon: '🔍', action: 'calculator', target: 'ttp-tma-ddx' },
    { id: 'treatment', label: 'Treatment', icon: '💉', action: 'overlay', target: 'ttp-treatment' },
  ],
  // ---------------------------------------------------------------
  // Tracheostomy Emergencies
  // ---------------------------------------------------------------
  'trach-emergency': [
    { id: 'obstruction', label: 'Obstruction', icon: '🔴', action: 'jump', target: 'trach-obstruction-start' },
    { id: 'dislodged', label: 'Dislodged', icon: '⚠️', action: 'jump', target: 'trach-dislodge-assess' },
    { id: 'bleeding', label: 'Bleeding', icon: '🩸', action: 'jump', target: 'trach-bleeding-start' },
    { id: 'fresh', label: 'Fresh Trach', icon: '⏱️', action: 'jump', target: 'trach-fresh-emergency' },
  ],
  // ---------------------------------------------------------------
  // Tracheo-Innominate Fistula
  // ---------------------------------------------------------------
  'tracheo-innominate-fistula': [
    { id: 'timing', label: 'Timing', icon: '⏱️', action: 'jump', target: 'tif-timing-check' },
    { id: 'utley', label: 'Utley', icon: '👆', action: 'jump', target: 'tif-finger-tamponade' },
    { id: 'surgery', label: 'Surgery', icon: '🔪', action: 'jump', target: 'tif-surgical-options' },
    { id: 'donts', label: "Don'ts", icon: '⚠️', action: 'overlay', target: 'tif-critical-donts' },
  ],
  // ---------------------------------------------------------------
  // Cardiac Arrest Suite
  // ---------------------------------------------------------------
  'cardiac-arrest': [
    { id: 'vf', label: 'VF', icon: '⚡', action: 'jump', target: 'ca-vf-link' },
    { id: 'vt', label: 'VT', icon: '🫀', action: 'jump', target: 'ca-pvt-link' },
    { id: 'pea', label: 'PEA', icon: '💛', action: 'jump', target: 'ca-pea-link' },
    { id: 'brady', label: 'Brady', icon: '🔵', action: 'jump', target: 'ca-brady-link' },
    { id: 'etco2', label: 'ETCO₂', icon: '📊', action: 'overlay', target: 'ca-etco2-guide' },
    { id: 'hs-ts', label: "H's & T's", icon: '🔍', action: 'overlay', target: 'ca-hs-ts-table' },
  ],
  'pea-arrest': [
    { id: 'rush', label: 'RUSH', icon: '🔬', action: 'overlay', target: 'pea-rush-protocol' },
    { id: 'wide', label: 'Wide QRS', icon: '⚡', action: 'jump', target: 'pea-wide' },
    { id: 'narrow', label: 'Narrow QRS', icon: '🫀', action: 'jump', target: 'pea-narrow' },
    { id: 'tamponade', label: 'Tamponade', icon: '💛', action: 'jump', target: 'pea-tamponade' },
    { id: 'tension', label: 'Tension PTX', icon: '🫁', action: 'jump', target: 'pea-tension' },
    { id: 'pe', label: 'Massive PE', icon: '🔴', action: 'jump', target: 'pea-massive-pe' },
  ],
  'bradycardic-arrest': [
    { id: 'tcp', label: 'TCP Now', icon: '🔌', action: 'jump', target: 'brady-tcp' },
    { id: 'atropine', label: 'Atropine', icon: '💉', action: 'jump', target: 'brady-atropine' },
    { id: 'epi-drip', label: 'Epi Drip', icon: '💊', action: 'jump', target: 'brady-epi-infusion' },
    { id: 'causes', label: 'Causes', icon: '🔍', action: 'jump', target: 'brady-causes' },
    { id: 'etco2', label: 'ETCO₂', icon: '📊', action: 'overlay', target: 'ca-etco2-guide' },
  ],
  'ventricular-tachycardia': [
    { id: 'pulseless', label: 'Pulseless', icon: '⚡', action: 'jump', target: 'pvt-shock' },
    { id: 'cardiovert', label: 'Cardiovert', icon: '💛', action: 'jump', target: 'vt-cardiovert' },
    { id: 'stable-rx', label: 'Stable Rx', icon: '💊', action: 'jump', target: 'vt-mono-stable' },
    { id: 'torsades', label: 'Torsades', icon: '🔄', action: 'jump', target: 'vt-poly-long-qt' },
    { id: 'etco2', label: 'ETCO₂', icon: '📊', action: 'overlay', target: 'ca-etco2-guide' },
  ],
  'post-rosc': [
    { id: 'stemi', label: 'STEMI', icon: '❤️', action: 'jump', target: 'rosc-stemi' },
    { id: 'hemo', label: 'Hemo Targets', icon: '📊', action: 'jump', target: 'rosc-hemo' },
    { id: 'ttm', label: 'TTM', icon: '🌡️', action: 'jump', target: 'rosc-ttm-check' },
    { id: 'neuro', label: 'Neuro Prog', icon: '🧠', action: 'jump', target: 'rosc-neuro' },
    { id: 'icu', label: 'ICU Targets', icon: '🏥', action: 'jump', target: 'rosc-icu-targets' },
  ],
  'lumbar-puncture': [
    { id: 'csf-interp', label: 'CSF Interp', icon: '🧪', action: 'calculator', target: 'lp-lab-interpreter' },
    { id: 'ct-criteria', label: 'CT First?', icon: '🧠', action: 'calculator', target: 'lp-ct-criteria-calc' },
    { id: 'midline', label: 'Midline', icon: '📋', action: 'overlay', target: 'lp-midline-steps' },
    { id: 'paramedian', label: 'Paramedian', icon: '↗️', action: 'overlay', target: 'lp-paramedian-steps' },
    { id: 'op-guide', label: 'OP Interp', icon: '📊', action: 'calculator', target: 'lp-op-interpreter' },
  ],
  // ---------------------------------------------------------------
  // Emergency Burr Hole
  // ---------------------------------------------------------------
  'burr-hole': [
    { id: 'indication', label: 'Indicated?', icon: '⚠️', action: 'calculator', target: 'bh-indication-check' },
    { id: 'side', label: 'Which Side', icon: '🎯', action: 'calculator', target: 'bh-side-selector' },
    { id: 'landmarks', label: 'Landmarks', icon: '📍', action: 'calculator', target: 'bh-landmark-guide' },
    { id: 'checklist', label: 'Checklist', icon: '✅', action: 'calculator', target: 'bh-procedure-checklist' },
  ],
  // ---------------------------------------------------------------
  // Pre-Intubation RV Assessment
  // ---------------------------------------------------------------
  'rv-assessment': [
    { id: 'risk', label: 'RV Risk', icon: '⚠️', action: 'calculator', target: 'rv-risk-assessment' },
    { id: 'echo', label: 'Echo Interp', icon: '🫀', action: 'calculator', target: 'rv-echo-interpreter' },
    { id: 'tapse', label: 'TAPSE', icon: '📏', action: 'calculator', target: 'rv-tapse' },
    { id: 'hemodynamics', label: 'HD Goals', icon: '📊', action: 'calculator', target: 'rv-hemodynamic-calc' },
    { id: 'push-dose', label: 'Push-Dose', icon: '💉', action: 'calculator', target: 'rv-push-dose-calc' },
  ],
  // ---------------------------------------------------------------
  // Cervical Spine Injuries
  // ---------------------------------------------------------------
  'cervical-spine': [
    { id: 'ccr', label: 'C-Spine Rule', icon: '📋', action: 'calculator', target: 'cspine-ccr' },
    { id: 'nexus', label: 'NEXUS', icon: '✓', action: 'calculator', target: 'cspine-nexus' },
    { id: 'slic', label: 'SLIC Score', icon: '📊', action: 'calculator', target: 'cspine-slic' },
    { id: 'odontoid', label: 'Odontoid', icon: '🦴', action: 'calculator', target: 'cspine-odontoid-class' },
    { id: 'hangman', label: 'Hangman', icon: '⚠️', action: 'calculator', target: 'cspine-hangman-class' },
  ],
  // ---------------------------------------------------------------
  // Neurogenic Shock & Spinal Shock
  // ---------------------------------------------------------------
  'neurogenic-shock': [
    { id: 'shock-ddx', label: 'Shock DDx', icon: '🔍', action: 'calculator', target: 'neuro-shock-ddx' },
    { id: 'hemorrhage', label: 'Bleed Check', icon: '🩸', action: 'calculator', target: 'neuro-shock-hemorrhage-check' },
    { id: 'pressors', label: 'Pressors', icon: '💉', action: 'calculator', target: 'neuro-shock-pressor-calc' },
    { id: 'brady', label: 'Brady Protocol', icon: '🫀', action: 'calculator', target: 'neuro-shock-brady-protocol' },
    { id: 'map', label: 'MAP Goals', icon: '📊', action: 'calculator', target: 'neuro-shock-map-calc' },
  ],
  // ---------------------------------------------------------------
  // Cauda Equina Syndrome
  // ---------------------------------------------------------------
  'cauda-equina': [
    { id: 'screen', label: 'CES Screen', icon: '🚨', action: 'calculator', target: 'ces-screening' },
    { id: 'pvr', label: 'PVR Check', icon: '🔍', action: 'calculator', target: 'ces-pvr' },
    { id: 'timing', label: 'Surgery Time', icon: '⏱️', action: 'calculator', target: 'ces-timing' },
  ],
  // ---------------------------------------------------------------
  // Brain Herniation Syndromes
  // ---------------------------------------------------------------
  'brain-herniation': [
    { id: 'icp', label: 'ICP/CPP', icon: '🧠', action: 'calculator', target: 'hern-icp' },
    { id: 'cushing', label: 'Cushing', icon: '⚠️', action: 'calculator', target: 'hern-cushing' },
    { id: 'mannitol', label: 'Mannitol', icon: '💉', action: 'calculator', target: 'hern-mannitol-dose' },
    { id: 'hts', label: 'HTS Dose', icon: '🧪', action: 'calculator', target: 'hern-hts-dose' },
  ],
  // ---------------------------------------------------------------
  // Ocular POCUS
  // ---------------------------------------------------------------
  'ocular-pocus': [
    { id: 'rupture', label: 'Rupture?', icon: '⚠️', action: 'calculator', target: 'opocus-rupture-screen' },
    { id: 'rd-pvd', label: 'RD vs PVD', icon: '👁️', action: 'calculator', target: 'opocus-rd-vs-pvd' },
    { id: 'onsd', label: 'ONSD', icon: '🧠', action: 'calculator', target: 'opocus-onsd-calc' },
    { id: 'vh', label: 'VH Grade', icon: '🩸', action: 'calculator', target: 'opocus-vh-grade' },
    { id: 'checklist', label: 'Checklist', icon: '✅', action: 'calculator', target: 'opocus-checklist' },
  ],
  // ---------------------------------------------------------------
  // Diplopia
  // ---------------------------------------------------------------
  'diplopia': [
    { id: 'mono-bino', label: 'Mono/Bino', icon: '👁️', action: 'calculator', target: 'diplopia-mono-vs-bino' },
    { id: 'cn3-risk', label: 'CN III Risk', icon: '⚠️', action: 'calculator', target: 'diplopia-cn3-risk' },
    { id: '3step', label: '3-Step', icon: '📐', action: 'calculator', target: 'diplopia-3step' },
    { id: 'exam', label: 'Exam', icon: '✅', action: 'calculator', target: 'diplopia-exam-checklist' },
    { id: 'localize', label: 'Localize', icon: '🎯', action: 'calculator', target: 'diplopia-localize' },
  ],
  // ---------------------------------------------------------------
  // Pacemaker / ICD Emergencies
  // ---------------------------------------------------------------
  'pacemaker': [
    { id: 'device-id', label: 'Device ID', icon: '📱', action: 'calculator', target: 'pm-device-id' },
    { id: 'nbg', label: 'NBG Code', icon: '🔤', action: 'calculator', target: 'pm-nbg-decoder' },
    { id: 'malfunction', label: 'Malfunction', icon: '⚠️', action: 'calculator', target: 'pm-malfunction-id' },
    { id: 'magnet', label: 'Magnet Rate', icon: '🧲', action: 'calculator', target: 'pm-magnet-rate' },
    { id: 'sgarbossa', label: 'Sgarbossa', icon: '📈', action: 'calculator', target: 'pm-sgarbossa' },
    { id: 'tcp', label: 'TCP', icon: '⚡', action: 'calculator', target: 'pm-tcp-settings' },
    { id: 'ecg', label: 'Paced ECG', icon: '💓', action: 'calculator', target: 'pm-ecg-pattern' },
    { id: 'icd-storm', label: 'ICD Storm', icon: '🌩️', action: 'calculator', target: 'pm-icd-storm' },
  ],
  // ---------------------------------------------------------------
  // DVT
  // ---------------------------------------------------------------
  'dvt': [
    { id: 'wells-dvt', label: 'Wells', icon: '📋', action: 'calculator', target: 'wells-dvt' },
    { id: 'anticoag', label: 'Anticoag', icon: '💊', action: 'overlay', target: 'dvt-anticoag-tool' },
    { id: 'us-findings', label: 'US Guide', icon: '🔊', action: 'overlay', target: 'dvt-us-guide' },
    { id: 'special-pops', label: 'Special', icon: '⚠️', action: 'overlay', target: 'dvt-special-populations' },
    { id: 'duration', label: 'Duration', icon: '📅', action: 'overlay', target: 'dvt-duration-guide' },
  ],
  // ---------------------------------------------------------------
  // Pediatric Intussusception
  // ---------------------------------------------------------------
  'intussusception': [
    { id: 'red-flags', label: 'Red Flags', icon: '🚩', action: 'overlay', target: 'intuss-red-flags' },
    { id: 'us-guide', label: 'US Guide', icon: '🔊', action: 'overlay', target: 'intuss-us-guide' },
    { id: 'lead-points', label: 'Lead Points', icon: '🎯', action: 'overlay', target: 'intuss-lead-points' },
    { id: 'contraindications', label: 'Enema CI', icon: '🚫', action: 'overlay', target: 'intuss-contraindications' },
    { id: 'post-reduction', label: 'Post-Reduce', icon: '✅', action: 'overlay', target: 'intuss-post-reduction' },
  ],
  // ---------------------------------------------------------------
  // Fishhook Removal
  // ---------------------------------------------------------------
  'fishhook-removal': [
    { id: 'techniques', label: 'Techniques', icon: '🎣', action: 'overlay', target: 'fh-technique-summary' },
    { id: 'anatomy', label: 'Anatomy', icon: '🪝', action: 'overlay', target: 'fh-hook-anatomy' },
    { id: 'string-yank', label: 'String', icon: '🧵', action: 'jump', target: 'fh-string-yank' },
    { id: 'advance-cut', label: 'Advance', icon: '✂️', action: 'jump', target: 'fh-advance-cut' },
    { id: 'wound-care', label: 'Wound Care', icon: '🩹', action: 'overlay', target: 'fh-wound-care-guide' },
  ],
  // ---------------------------------------------------------------
  // VAFEI (Video-Assisted Flexible Endoscopic Intubation)
  // ---------------------------------------------------------------
  'vafei': [
    { id: 'steps', label: 'Steps', icon: '📋', action: 'overlay', target: 'vafei-steps-summary' },
    { id: 'topical', label: 'Lidocaine', icon: '💉', action: 'overlay', target: 'vafei-topicalization-guide' },
    { id: 'ketamine', label: 'Ketamine', icon: '💊', action: 'overlay', target: 'vafei-ketamine-guide' },
    { id: 'trouble', label: 'Trouble', icon: '🔧', action: 'overlay', target: 'vafei-troubleshooting-guide' },
    { id: 'indications', label: 'Indications', icon: '🎯', action: 'overlay', target: 'vafei-indications-guide' },
  ],
  'blood-culture-stewardship': [
    { id: 'indications', label: 'Indications', icon: '✅', action: 'overlay', target: 'bcs-indications' },
    { id: 'contam', label: 'Contam', icon: '🦠', action: 'overlay', target: 'bcs-contamination' },
    { id: 'technique', label: 'Technique', icon: '🩸', action: 'overlay', target: 'bcs-technique' },
    { id: 'yield', label: 'Yield', icon: '📊', action: 'overlay', target: 'bcs-yield-table' },
    { id: 'high-yield', label: 'High Yield', icon: '🎯', action: 'overlay', target: 'bcs-high-yield' },
  ],
  'low-back-pain': [
    { id: 'red-flags', label: 'Red Flags', icon: '🚩', action: 'overlay', target: 'lbp-red-flags' },
    { id: 'ces-exam', label: 'CES Exam', icon: '🦴', action: 'overlay', target: 'lbp-ces-exam' },
    { id: 'dermatomes', label: 'Dermatomes', icon: '🧠', action: 'overlay', target: 'lbp-dermatomes' },
    { id: 'meds', label: 'Meds', icon: '💊', action: 'overlay', target: 'lbp-meds' },
    { id: 'discharge', label: 'Discharge', icon: '🏠', action: 'overlay', target: 'lbp-discharge' },
  ],
  'cricothyrotomy': [
    { id: 'steps', label: 'Steps', icon: '📋', action: 'overlay', target: 'cric-steps' },
    { id: 'anatomy', label: 'Anatomy', icon: '🔬', action: 'overlay', target: 'cric-anatomy' },
    { id: 'equipment', label: 'Equipment', icon: '🔧', action: 'overlay', target: 'cric-equipment' },
    { id: 'complications', label: 'Complications', icon: '⚠️', action: 'overlay', target: 'cric-complications' },
  ],
  'ear-infection': [
    { id: 'overview', label: 'Overview', icon: '👂', action: 'overlay', target: 'ear-overview' },
    { id: 'aom-abx', label: 'AOM Abx', icon: '💊', action: 'overlay', target: 'ear-aom-abx' },
    { id: 'oe-rx', label: 'OE Rx', icon: '💧', action: 'overlay', target: 'ear-oe-treatment' },
    { id: 'moe-flags', label: 'MOE Flags', icon: '🚩', action: 'overlay', target: 'ear-moe-flags' },
    { id: 'perf-guide', label: 'TM Perf', icon: '🔊', action: 'overlay', target: 'ear-perf-overview' },
  ],
  'peds-constipation': [
    { id: 'peg', label: 'PEG Dosing', icon: '💊', action: 'overlay', target: 'peds-const-peg-guide' },
    { id: 'enemas', label: 'Enemas', icon: '💧', action: 'overlay', target: 'peds-const-enema-guide' },
    { id: 'red-flags', label: 'Red Flags', icon: '🚩', action: 'overlay', target: 'peds-const-red-flags' },
    { id: 'rome', label: 'Rome IV', icon: '📋', action: 'overlay', target: 'peds-const-rome-criteria' },
    { id: 'maintenance', label: 'Maintenance', icon: '📅', action: 'overlay', target: 'peds-const-maintenance-guide' },
  ],
  'constipation': [
    { id: 'disimpact', label: 'Disimpaction', icon: '🧤', action: 'overlay', target: 'const-disimpaction-technique' },
    { id: 'enemas', label: 'Enemas', icon: '💧', action: 'overlay', target: 'const-enema-guide' },
    { id: 'laxatives', label: 'Laxatives', icon: '💊', action: 'overlay', target: 'const-laxative-ladder' },
    { id: 'neostigmine', label: 'Neostigmine', icon: '💉', action: 'overlay', target: 'const-neostigmine-guide' },
    { id: 'ogilvie', label: 'Ogilvie', icon: '🎯', action: 'overlay', target: 'const-ogilvie-criteria' },
    { id: 'ileus', label: 'Ileus Prev', icon: '🏥', action: 'overlay', target: 'const-ileus-prevention' },
  ],
  'pnes': [
    { id: 'semiology', label: 'Semiology', icon: '👁️', action: 'overlay', target: 'pnes-semiology-checklist' },
    { id: 'communication', label: 'Explain Dx', icon: '💬', action: 'overlay', target: 'pnes-communication-guide' },
    { id: 'patient-info', label: 'Handout', icon: '📄', action: 'overlay', target: 'pnes-patient-info' },
    { id: 'safety', label: 'Safety', icon: '🛡️', action: 'overlay', target: 'pnes-safety-screen' },
    { id: 'stop', label: 'Stop', icon: '🛑', action: 'overlay', target: 'pnes-stop' },
  ],
  'amaurosis-fugax': [
    { id: 'abcd2', label: 'ABCD2', icon: '📊', action: 'calculator', target: 'tia-abcd2' },
    { id: 'gca', label: 'GCA Screen', icon: '🔥', action: 'overlay', target: 'af-gca-screen' },
    { id: 'carotid', label: 'Carotid', icon: '🩺', action: 'overlay', target: 'af-carotid-guide' },
    { id: 'dapt', label: 'DAPT', icon: '💊', action: 'calculator', target: 'tia-dapt-protocol' },
    { id: 'fundus', label: 'Fundus', icon: '👁️', action: 'overlay', target: 'af-fundus-atlas' },
    { id: 'ddx', label: 'DDx', icon: '🔍', action: 'overlay', target: 'af-tmvl-ddx' },
    { id: 'stop', label: 'Stop', icon: '🛑', action: 'overlay', target: 'af-stop' },
  ],
  'brue': [
    { id: 'risk', label: 'Risk Calc', icon: '📊', action: 'overlay', target: 'brue-risk-calc' },
    { id: 'ddx', label: 'DDx', icon: '🔍', action: 'overlay', target: 'brue-ddx-guide' },
    { id: 'nat', label: 'NAT Screen', icon: '⚠️', action: 'overlay', target: 'brue-nat-screen-guide' },
    { id: 'ecg', label: 'ECG Guide', icon: '💓', action: 'overlay', target: 'brue-ecg-guide' },
    { id: 'workup', label: 'Workup', icon: '🧪', action: 'overlay', target: 'brue-workup-guide' },
  ],
  'iih': [
    { id: 'onsd', label: 'ONSD POCUS', icon: '👁️', action: 'overlay', target: 'iih-onsd-technique' },
    { id: 'papilledema', label: 'Papilledema', icon: '🔬', action: 'overlay', target: 'iih-papilledema-guide' },
    { id: 'criteria', label: 'Friedman', icon: '📋', action: 'overlay', target: 'iih-diagnostic-criteria' },
    { id: 'acetazolamide', label: 'Diamox', icon: '💊', action: 'overlay', target: 'iih-acetazolamide-guide' },
    { id: 'surgery', label: 'Surgery', icon: '🔧', action: 'overlay', target: 'iih-surgical-options' },
  ],
  'fuo': [
    { id: 'criteria', label: 'Criteria', icon: '📋', action: 'overlay', target: 'fuo-criteria' },
    { id: 'workup', label: 'Workup', icon: '🧪', action: 'overlay', target: 'fuo-initial-workup' },
    { id: 'travel', label: 'Travel', icon: '✈️', action: 'overlay', target: 'fuo-travel-diseases' },
    { id: 'drugs', label: 'Drug Fever', icon: '💊', action: 'overlay', target: 'fuo-drug-fever' },
    { id: 'categories', label: 'Etiologies', icon: '🔍', action: 'overlay', target: 'fuo-categories' },
  ],
  'chd-peds': [
    { id: 'blue', label: 'Blue Baby', icon: '🔵', action: 'jump', target: 'chd-blue-screen' },
    { id: 'red', label: 'Shocked', icon: '🔴', action: 'jump', target: 'chd-red-screen' },
    { id: 'hyperox', label: 'Hyperoxia', icon: '🫁', action: 'jump', target: 'chd-hyperox' },
    { id: 'pge', label: 'PGE1', icon: '💉', action: 'jump', target: 'chd-pge1' },
    { id: 'tet', label: 'Tet Spell', icon: '🦵', action: 'jump', target: 'chd-tet-spell' },
    { id: 'avoid', label: 'Pitfalls', icon: '⚠️', action: 'jump', target: 'chd-avoid' },
  ],
  'misfits-peds': [
    { id: 'mnemonic', label: 'MISFITS', icon: '🧠', action: 'jump', target: 'misfits-mnemonic' },
    { id: 'sepsis', label: 'Sepsis', icon: '🦠', action: 'jump', target: 'misfits-sepsis' },
    { id: 'hsv', label: 'HSV', icon: '🧬', action: 'jump', target: 'misfits-hsv' },
    { id: 'cah', label: 'CAH', icon: '⚡', action: 'jump', target: 'misfits-cah' },
    { id: 'volvulus', label: 'Volvulus', icon: '🔄', action: 'jump', target: 'misfits-volvulus' },
    { id: 'heart', label: 'CHD', icon: '❤️', action: 'jump', target: 'misfits-heart' },
    { id: 'abx', label: 'Abx', icon: '💊', action: 'jump', target: 'misfits-abx' },
  ],
  'pneumonia': [
    { id: 'psi', label: 'PSI/PORT', icon: '📊', action: 'calculator', target: 'psi-port' },
    { id: 'curb65', label: 'CURB-65', icon: '📈', action: 'calculator', target: 'curb-65' },
    { id: 'smartcop', label: 'SMART-COP', icon: '🏥', action: 'calculator', target: 'smart-cop' },
    { id: 'abx', label: 'Abx Dosing', icon: '💊', action: 'overlay', target: 'pna-abx-dosing' },
    { id: 'mrsa', label: 'MRSA Risk', icon: '🦠', action: 'overlay', target: 'pna-mrsa-info' },
    { id: 'pseudo', label: 'Pseudo Risk', icon: '🧫', action: 'overlay', target: 'pna-pseudo-info' },
    { id: 'effusion', label: 'Effusion', icon: '💧', action: 'overlay', target: 'pna-effusion-info' },
  ],
  'svt': [
    { id: 'valsalva', label: 'Valsalva', icon: '💨', action: 'overlay', target: 'svt-valsalva' },
    { id: 'adenosine', label: 'Adenosine', icon: '💉', action: 'overlay', target: 'svt-adenosine-info' },
    { id: 'diltiazem', label: 'Diltiazem', icon: '💊', action: 'overlay', target: 'svt-diltiazem' },
    { id: 'cardiovert', label: 'Cardiovert', icon: '⚡', action: 'overlay', target: 'svt-cardiovert' },
    { id: 'wpw', label: 'WPW', icon: '⚠️', action: 'overlay', target: 'svt-wpw' },
  ],
  'gallbladder': [
    { id: 'murphy', label: "Murphy's", icon: '👆', action: 'overlay', target: 'gb-murphy' },
    { id: 'tokyo', label: 'Tokyo', icon: '📊', action: 'overlay', target: 'gb-tokyo' },
    { id: 'pocus', label: 'POCUS', icon: '📷', action: 'overlay', target: 'gb-pocus' },
    { id: 'abx', label: 'Antibiotics', icon: '💊', action: 'overlay', target: 'gb-abx' },
    { id: 'ercp', label: 'ERCP', icon: '🔬', action: 'overlay', target: 'gb-ercp' },
  ],
  'post-tonsillectomy-bleed': [
    { id: 'severity', label: 'Severity', icon: '📊', action: 'overlay', target: 'pth-severity' },
    { id: 'txa', label: 'TXA', icon: '💉', action: 'overlay', target: 'pth-txa' },
    { id: 'hemostasis', label: 'Hemostasis', icon: '🩹', action: 'overlay', target: 'pth-hemostasis' },
    { id: 'airway', label: 'Airway', icon: '🫁', action: 'overlay', target: 'pth-airway' },
    { id: 'transfusion', label: 'Transfuse', icon: '🩸', action: 'overlay', target: 'pth-transfusion' },
  ],
  'critical-care-drips': [
    { id: 'vasopressors', label: 'Pressors', icon: '💉', action: 'jump', target: 'ccd-vasopressor-overview' },
    { id: 'sedation', label: 'Sedation', icon: '😴', action: 'jump', target: 'ccd-sedation-overview' },
    { id: 'htn', label: 'HTN Emerg', icon: '📈', action: 'jump', target: 'ccd-htn-overview' },
    { id: 'insulin', label: 'DKA Insulin', icon: '🧪', action: 'jump', target: 'ccd-insulin-dka' },
    { id: 'quick-ref', label: 'Quick Ref', icon: '📋', action: 'jump', target: 'ccd-quick-reference' },
  ],
  'blood-transfusions': [
    { id: 'mtp', label: 'MTP', icon: '🩸', action: 'jump', target: 'bt-mtp-protocol' },
    { id: 'taco-trali', label: 'TACO/TRALI', icon: '🫁', action: 'jump', target: 'bt-taco-trali' },
    { id: 'txa', label: 'TXA', icon: '💉', action: 'jump', target: 'bt-txa' },
    { id: 'calcium', label: 'Calcium', icon: '🦴', action: 'jump', target: 'bt-calcium' },
    { id: 'consent', label: 'Consent', icon: '📝', action: 'overlay', target: 'bt-consent' },
  ],
  'peripheral-neuropathy': [
    { id: 'fvc-nif', label: 'FVC/NIF', icon: '🫁', action: 'calculator', target: 'gbs-fvc-nif' },
    { id: 'gbs-variants', label: 'Variants', icon: '🧬', action: 'calculator', target: 'gbs-variants' },
    { id: 'egris', label: 'EGRIS', icon: '📊', action: 'calculator', target: 'gbs-egris' },
    { id: 'ivig-plex', label: 'IVIG/PLEX', icon: '💉', action: 'calculator', target: 'gbs-ivig-plex' },
    { id: 'mimics', label: 'Mimics', icon: '🔍', action: 'jump', target: 'pn-gbs-pathway' },
  ],
  'ankle-fractures': [
    { id: 'ottawa', label: 'Ottawa', icon: '📋', action: 'overlay', target: 'af-steps' },
    { id: 'weber', label: 'Weber', icon: '🦴', action: 'jump', target: 'af-xray-findings' },
    { id: 'syndesmosis', label: 'Syndesmosis', icon: '🔗', action: 'jump', target: 'af-stress-test' },
    { id: 'maisonneuve', label: 'Maisonneuve', icon: '⚠️', action: 'jump', target: 'af-maisonneuve' },
    { id: 'splint', label: 'Splint', icon: '🩹', action: 'jump', target: 'af-disposition-nonop' },
  ],
  'hand-infections': [
    { id: 'kanavel', label: 'Kanavel', icon: '✋', action: 'jump', target: 'hi-fts' },
    { id: 'felon', label: 'Felon', icon: '👆', action: 'jump', target: 'hi-felon' },
    { id: 'fight-bite', label: 'Fight Bite', icon: '👊', action: 'jump', target: 'hi-fight-bite' },
    { id: 'antibiotics', label: 'Antibiotics', icon: '💊', action: 'jump', target: 'hi-antibiotics' },
    { id: 'whitlow', label: 'Whitlow', icon: '🦠', action: 'jump', target: 'hi-whitlow' },
  ],
};

// Stop button appended automatically to every consult
const STOP_ITEM: ToolbarItem = { id: 'stop', label: 'Stop', icon: '🛑', action: 'overlay', target: '' };

/** Get the toolbar config for a consult, always including the 🛑 Stop button */
export function getToolbarConfig(consultId: string): ToolbarConfig {
  const tools = TOOLBAR_CONFIGS[consultId] ?? [];
  // Only add stop item if not already present in tools
  const hasStopItem = tools.some(t => t.id === 'stop' || t.id.includes('-stop'));
  if (hasStopItem) {
    return { consultId, tools };
  }
  const stopItem: ToolbarItem = { ...STOP_ITEM, target: `${consultId}-stop` };
  return {
    consultId,
    tools: [...tools, stopItem],
  };
}
