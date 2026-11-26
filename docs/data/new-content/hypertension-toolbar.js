export const TOOLBAR_HTN = [
    { id: 'picker', label: 'Drug Picker', icon: '🧭', action: 'overlay', target: 'htn-picker', pinned: true },
    { id: 'doses', label: 'Doses', icon: '💊', action: 'overlay', target: 'htn-drugs', pinned: true },
    { id: 'kidney', label: 'Kidney', icon: '🧪', action: 'overlay', target: 'htn-kidney', pinned: true },
    { id: 'diet', label: 'Diet', icon: '🥗', action: 'overlay', target: 'htn-diet', pinned: true },
    { id: 'pick', label: 'Pick Drug', icon: '🎯', action: 'jump', target: 'htn-comorbid' },
    { id: 'onmeds', label: 'On Meds', icon: '📈', action: 'jump', target: 'htn-uncontrolled' },
    { id: 'raisers', label: 'BP Raisers', icon: '⚠️', action: 'overlay', target: 'htn-raisers' },
    { id: 'secondary', label: 'Secondary', icon: '🔎', action: 'overlay', target: 'htn-secondary' },
    { id: 'home', label: 'Home BP', icon: '🏠', action: 'overlay', target: 'htn-home-bp' },
    { id: 'discharge', label: 'Discharge', icon: '📋', action: 'overlay', target: 'htn-discharge' },
    { id: 'evidence', label: 'Evidence', icon: '📚', action: 'overlay', target: 'htn-evidence' },
    { id: 'stop', label: 'Stop', icon: '🛑', action: 'overlay', target: 'hypertension-stop' },
];
