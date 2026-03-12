// myMedKitt — 3D Glossy Button Factory
// Pure CSS 3D metallic buttons per PRD Section 7.
// No image assets — all depth via gradients + shadows.

import { getCategoryColors } from '../services/category-service.js';

export interface Button3DOptions {
  variant?: 'charcoal' | 'yes' | 'no' | 'specialty' | 'critical' | 'urgent' | 'dimmed';
  specialtyId?: string;
  onClick?: () => void;
  disabled?: boolean;
  description?: string;
}

/** Shift a hex color's RGB channels by a percentage (-100 to +100) */
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xFF) + Math.round(2.55 * percent)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + Math.round(2.55 * percent)));
  const b = Math.min(255, Math.max(0, (num & 0xFF) + Math.round(2.55 * percent)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/** Build a 4-stop metallic gradient string from a base hex color */
export function buildSpecialtyGradient(base: string): string {
  const top = adjustBrightness(base, 22);
  const midHigh = adjustBrightness(base, 5);
  const midLow = adjustBrightness(base, -10);
  const bottom = adjustBrightness(base, -25);
  return `linear-gradient(to bottom, ${top} 0%, ${midHigh} 40%, ${midLow} 60%, ${bottom} 100%)`;
}

/** Get a specialty gradient for a category ID (used by dashboard) */
export function getSpecialtyGradient(specialtyId: string): string {
  const colors = getCategoryColors();
  const entry = colors[specialtyId];
  if (!entry) return 'linear-gradient(to bottom, #6a6a6a 0%, #4a4a4a 40%, #3a3a3a 60%, #2a2a2a 100%)';
  return buildSpecialtyGradient(entry.card);
}

/** Create a 3D glossy button element */
export function create3DButton(label: string, opts: Button3DOptions = {}): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = 'btn-3d';
  btn.type = 'button';

  const variant = opts.variant ?? 'charcoal';

  switch (variant) {
    case 'yes':
      btn.classList.add('selected-yes');
      break;
    case 'no':
      btn.classList.add('selected-no');
      break;
    case 'critical':
      btn.classList.add('btn-3d--critical');
      break;
    case 'urgent':
      btn.classList.add('btn-3d--urgent');
      break;
    case 'dimmed':
      btn.classList.add('btn-3d--dimmed');
      break;
    case 'specialty': {
      btn.classList.add('btn-3d-specialty');
      const gradient = getSpecialtyGradient(opts.specialtyId ?? '');
      btn.style.background = gradient;
      break;
    }
    // 'charcoal' uses default CSS styling
  }

  const labelSpan = document.createElement('span');
  labelSpan.className = 'option-label';
  labelSpan.textContent = label;
  btn.appendChild(labelSpan);

  if (opts.description) {
    const desc = document.createElement('span');
    desc.className = 'decision-card__option-desc';
    desc.textContent = opts.description;
    btn.appendChild(desc);
  }

  if (opts.disabled) {
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.pointerEvents = 'none';
  }

  if (opts.onClick) {
    btn.addEventListener('click', opts.onClick);
  }

  return btn;
}
