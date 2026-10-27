// MedKitt - ARDS contextual toolbar (DRAFT, not wired). Integrator merges into TOOLBAR_CONFIGS.
// The Stop item is added automatically by the toolbar builder (target 'ards-stop').

import type { ToolbarItem } from '../toolbar-configs.js';

export const TOOLBAR_ARDS: ToolbarItem[] = [
  { id: 'pbw', label: 'PBW / VT', icon: '\u{1F9EE}', action: 'calculator', target: 'ards-pbw-tidal-volume', pinned: true },
  { id: 'pf', label: 'P/F Berlin', icon: '\u{1F9EE}', action: 'calculator', target: 'ards-pf-berlin', pinned: true },
  { id: 'steps', label: 'Steps', icon: '\u{1F4CB}', action: 'overlay', target: 'ards-steps' },
  { id: 'jump-prone', label: 'Prone', icon: '\u{1F504}', action: 'jump', target: 'ards-prone' },
  { id: 'jump-rescue', label: 'Rescue', icon: '\u{1F198}', action: 'jump', target: 'ards-rescue-check' },
];
