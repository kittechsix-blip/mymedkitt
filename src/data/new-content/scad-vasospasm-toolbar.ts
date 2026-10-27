// MedKitt - SCAD and Coronary Vasospasm toolbar (DRAFT, not wired).
// Stop (Do NOT) is added automatically from INFO_PAGES 'scad-vasospasm-stop'.
// No calculator is linked: no existing CALCULATORS entry covers SCAD or vasospasm.
// Register as TOOLBAR_CONFIGS['scad-vasospasm'] = TOOLBAR_SCADV in toolbar-configs.ts.

import type { ToolbarItem } from '../toolbar-configs.js';

export const TOOLBAR_SCADV: ToolbarItem[] = [
  { id: 'steps', label: 'Steps', icon: '📋', action: 'overlay', target: 'scad-vasospasm-steps', pinned: true },
  { id: 'route', label: 'Route', icon: '🧭', action: 'jump', target: 'scad-vasospasm-route' },
  { id: 'spasm', label: 'Spasm', icon: '🌀', action: 'jump', target: 'scad-vasospasm-spasm-recognition' },
  { id: 'scad', label: 'SCAD', icon: '🫀', action: 'jump', target: 'scad-vasospasm-scad-stratify' },
  { id: 'dispo', label: 'Disposition', icon: '🏥', action: 'jump', target: 'scad-vasospasm-disposition' },
];
