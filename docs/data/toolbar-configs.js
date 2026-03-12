// myMedKitt — Per-Consult Toolbar Configurations
// Maps consult IDs to their contextual toolbar items.
const TOOLBAR_CONFIGS = {
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
        { id: 'chadsvasc', label: 'CHA₂DS₂', icon: '\u2764\uFE0F', action: 'calculator', target: 'chadsvasc' },
    ],
    'pe': [
        { id: 'pesi', label: 'PESI', icon: '\uD83E\uDEC1', action: 'calculator', target: 'pesi' },
    ],
};
/** Get the toolbar config for a consult, or an empty default */
export function getToolbarConfig(consultId) {
    return {
        consultId,
        tools: TOOLBAR_CONFIGS[consultId] ?? [],
    };
}
