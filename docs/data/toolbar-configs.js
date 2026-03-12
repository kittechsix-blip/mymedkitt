// myMedKitt — Per-Consult Toolbar Configurations
// Maps consult IDs to their contextual toolbar items.
const TOOLBAR_CONFIGS = {
    'acute-diarrhea': [
        { id: 'red-flags', label: 'Red Flags', icon: '\uD83D\uDEA9', action: 'jump', target: 'diarrhea-red-flag-eval' },
        { id: 'stec', label: 'STEC', icon: '\uD83E\uDDA0', action: 'jump', target: 'diarrhea-bloody' },
    ],
    'hiv': [
        { id: 'ois', label: 'OIs', icon: '\uD83E\uDDA0', action: 'jump', target: 'hiv-immunocompromised' },
        { id: 'arv-effects', label: 'ARV Effects', icon: '\uD83D\uDC8A', action: 'jump', target: 'hiv-med-overview' },
        { id: 'pep-prep', label: 'PEP/PrEP', icon: '\uD83D\uDEE1\uFE0F', action: 'jump', target: 'hiv-prevention' },
    ],
    'burns': [
        { id: 'tbsa', label: 'TBSA', icon: '\uD83D\uDD25', action: 'calculator', target: 'tbsa' },
        { id: 'fluid', label: 'Fluids', icon: '\uD83D\uDCA7', action: 'calculator', target: 'parkland' },
    ],
    'stroke': [
        { id: 'nihss', label: 'NIHSS', icon: '\uD83E\uDDE0', action: 'calculator', target: 'nihss' },
    ],
    'nstemi': [
        { id: 'timi', label: 'TIMI', icon: '\u2764\uFE0F', action: 'calculator', target: 'timi' },
    ],
    'afib': [
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
    'pe': [
        { id: 'thrombolysis', label: 'Lysis Rx', icon: '\uD83D\uDC89', action: 'jump', target: 'pe-massive-tx' },
        { id: 'pesi', label: 'PESI', icon: '\uD83E\uDEC1', action: 'calculator', target: 'pesi' },
        { id: 'anticoag', label: 'Anticoag', icon: '\uD83D\uDC8A', action: 'jump', target: 'pe-anticoag-selection' },
    ],
};
/** Get the toolbar config for a consult, or an empty default */
export function getToolbarConfig(consultId) {
    return {
        consultId,
        tools: TOOLBAR_CONFIGS[consultId] ?? [],
    };
}
