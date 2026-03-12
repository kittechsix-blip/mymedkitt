// myMedKitt — Per-Consult Toolbar Configurations
// Maps consult IDs to their contextual toolbar items.
const TOOLBAR_CONFIGS = {
    'acute-diarrhea': [
        { id: 'red-flags', label: 'Red Flags', icon: '\uD83D\uDEA9', action: 'jump', target: 'diarrhea-red-flag-eval' },
        { id: 'stec', label: 'STEC', icon: '\uD83E\uDDA0', action: 'jump', target: 'diarrhea-bloody' },
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
