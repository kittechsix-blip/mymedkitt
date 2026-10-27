// DRAFT — toolbar items for Blunt Chest Trauma (not wired). Integrator merges TOOLBAR_BCT into TOOLBAR_CONFIGS
// under key 'blunt-chest-trauma' in toolbar-configs.ts. The stop item is added automatically by getToolbarConfig(), so it is not listed here.

import type { ToolbarItem } from '../toolbar-configs.js';

export const TOOLBAR_BCT: ToolbarItem[] = [
  { id: 'ribscore', label: 'RibScore', icon: '🧮', action: 'calculator', target: 'ribscore', pinned: true },
  { id: 'steps', label: 'Steps', icon: '📋', action: 'overlay', target: 'blunt-chest-trauma-steps', pinned: true },
  { id: 'jump-pattern', label: 'Pattern', icon: '🩻', action: 'jump', target: 'blunt-chest-trauma-pattern' },
  { id: 'jump-block', label: 'Block', icon: '💉', action: 'jump', target: 'blunt-chest-trauma-block' },
  { id: 'jump-surgery', label: 'Surgery', icon: '🔪', action: 'jump', target: 'blunt-chest-trauma-surgery' },
  { id: 'jump-disposition', label: 'Dispo', icon: '🏥', action: 'jump', target: 'blunt-chest-trauma-disposition' },
];
