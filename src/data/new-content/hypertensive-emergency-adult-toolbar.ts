// MedKitt - Hypertensive Emergency (Adult) toolbar items
// DRAFT. Stop (🛑) is added automatically by getToolbarConfig; do not add it here.
// Integrator: merge into TOOLBAR_CONFIGS under key 'hypertensive-emergency-adult'.

import type { ToolbarItem } from '../toolbar-configs.js';

export const TOOLBAR_HTNE: ToolbarItem[] = [
  { id: 'steps', label: 'Steps', icon: '📋', action: 'overlay', target: 'hypertensive-emergency-adult-steps', pinned: true },
  { id: 'bp', label: 'BP Target', icon: '🎯', action: 'calculator', target: 'htne-bp-target', pinned: true },
  { id: 'map', label: 'MAP', icon: '🧮', action: 'calculator', target: 'map-calculator', pinned: true },
  { id: 'exc', label: 'Exceptions', icon: '⚠️', action: 'jump', target: 'hypertensive-emergency-adult-exceptions' },
  { id: 'agent', label: 'Agent', icon: '💉', action: 'jump', target: 'hypertensive-emergency-adult-agent-by-organ' },
  { id: 'pitfalls', label: 'Pitfalls', icon: '🚫', action: 'jump', target: 'hypertensive-emergency-adult-pitfalls' },
  { id: 'dispo', label: 'Dispo', icon: '🏁', action: 'jump', target: 'hypertensive-emergency-adult-dispo' },
  { id: 'peds', label: 'Peds', icon: '👶', action: 'route', target: 'peds-hypertensive-emergency' },
];
