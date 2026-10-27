// MedKitt - Bowel Obstruction & Volvulus toolbar
// DRAFT for physician sign-off. Items follow the ToolbarItem shape in src/data/toolbar-configs.ts.
// The 🛑 Stop item is added automatically by getToolbarConfig(); do not add it here.
// Integrator: merge TOOLBAR_SBOV into TOOLBAR_CONFIGS['bowel-obstruction-volvulus'].
export const TOOLBAR_SBOV = [
    { id: 'steps', label: 'Steps', icon: '📋', action: 'overlay', target: 'bowel-obstruction-volvulus-steps', pinned: true },
    { id: 'ag', label: 'AG', icon: '🧪', action: 'calculator', target: 'anion-gap', pinned: true },
    { id: 'triage', label: 'Triage', icon: '🧭', action: 'jump', target: 'bowel-obstruction-volvulus-triage', pinned: true },
    { id: 'ct', label: 'CT', icon: '🩻', action: 'jump', target: 'bowel-obstruction-volvulus-ct', pinned: true },
    { id: 'sigmoid', label: 'Sigmoid', icon: '🔄', action: 'jump', target: 'bowel-obstruction-volvulus-sigmoid-entry' },
    { id: 'dispo', label: 'Dispo', icon: '🏁', action: 'jump', target: 'bowel-obstruction-volvulus-dispo' },
];
