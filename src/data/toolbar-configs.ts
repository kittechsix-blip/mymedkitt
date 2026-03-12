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
    { id: 'unstable', label: 'Unstable', icon: '\uD83D\uDEA8', action: 'jump', target: 'aub-unstable' },
    { id: 'medical-rx', label: 'Medical Rx', icon: '\uD83D\uDC8A', action: 'jump', target: 'aub-treatment-medical' },
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
  'pe-treatment': [
    { id: 'thrombolysis', label: 'Lysis Rx', icon: '\uD83D\uDC89', action: 'jump', target: 'pe-massive-tx' },
    { id: 'pesi', label: 'PESI', icon: '\uD83E\uDEC1', action: 'calculator', target: 'pesi' },
    { id: 'anticoag', label: 'Anticoag', icon: '\uD83D\uDC8A', action: 'jump', target: 'pe-anticoag-selection' },
  ],
};

/** Get the toolbar config for a consult, or an empty default */
export function getToolbarConfig(consultId: string): ToolbarConfig {
  return {
    consultId,
    tools: TOOLBAR_CONFIGS[consultId] ?? [],
  };
}
