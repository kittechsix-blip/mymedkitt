// Straight-line geometry only. Inputs are ephemeral and never persisted.
export function calculateUsIv(depth: number, angle: number): { cm: number; inches: number } | null {
  if (!Number.isFinite(depth) || !Number.isFinite(angle) || depth <= 0 || angle <= 0 || angle > 90) return null;
  const cm = depth / Math.sin(angle * Math.PI / 180);
  if (!Number.isFinite(cm)) return null;
  return { cm, inches: cm / 2.54 };
}

export const US_IV_CALCULATOR = {
  id: 'us-iv', title: 'US IV',
  subtitle: 'Ultrasound-guided IV: vein depth, approach angle and needle path length',
  description: 'Estimate the straight-line distance from skin entry to the near (anterior) vein wall. Measure depth perpendicular to the skin; enter the needle angle relative to the skin surface.',
  fields: [], results: [],
  thresholdNote: 'Geometry estimate, not a catheter-size recommendation. The catheter must extend beyond this distance into the lumen. Needle-tip entry does not establish catheter entry. Track the tip continuously with ultrasound; never advance blindly to the calculated distance. Tissue compression, vessel movement and a changing angle alter the path.',
  citations: [
    'Right-triangle geometry: path length = perpendicular depth / sin(angle to skin). Exact conversion: 1 inch = 2.54 cm.',
    'AIUM Practice Parameter for the Use of Ultrasound to Guide Vascular Access Procedures (2019). https://doi.org/10.1002/jum.14954',
  ],
  customRender(container: HTMLElement): void {
    container.innerHTML = `<div style="padding:16px;border:1px solid var(--color-umber);border-radius:18px;background:var(--color-bg);box-shadow:0 4px 12px #0001">
      <label style="display:block;font-weight:700" for="us-iv-depth">Vein depth (cm)</label>
      <p style="margin:6px 0 10px">Skin to near vein wall, perpendicular to skin.</p>
      <input id="us-iv-depth" type="number" inputmode="decimal" min="0" step="any" placeholder="e.g. 1.5" style="box-sizing:border-box;width:100%;min-height:48px;font-size:20px;padding:10px;border:1px solid #777;border-radius:10px">
      <label style="display:block;font-weight:700;margin-top:18px" for="us-iv-angle">Approach angle (degrees from skin)</label>
      <p style="margin:6px 0 10px">0° = parallel; 90° = perpendicular. Enter greater than 0°, up to 90°.</p>
      <input id="us-iv-angle" type="number" inputmode="decimal" min="0" max="90" step="any" placeholder="e.g. 45" style="box-sizing:border-box;width:100%;min-height:48px;font-size:20px;padding:10px;border:1px solid #777;border-radius:10px">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px" aria-label="Angle shortcuts">${[30,45,60,90].map(a => `<button type="button" class="btn-3d" data-angle="${a}" aria-pressed="false" style="min-height:44px;flex:1;color:#fff">${a}°</button>`).join('')}</div>
      <div role="status" aria-live="polite" data-result style="padding:18px 0;font-size:18px;min-height:70px"></div>
      <div data-diagram></div>
      <details><summary style="min-height:44px;cursor:pointer">How this is calculated</summary><p>Path = depth ÷ sin(angle × π / 180). Inches = centimeters ÷ 2.54. At 1 cm depth and 30°, the path is 2 cm (0.79 inches). A shallower angle creates a longer path.</p></details>
      <button type="button" class="btn-3d" data-clear style="min-height:44px;color:#fff">Clear inputs</button>
    </div>`;
    const depth = container.querySelector<HTMLInputElement>('#us-iv-depth')!;
    const angle = container.querySelector<HTMLInputElement>('#us-iv-angle')!;
    const result = container.querySelector<HTMLElement>('[data-result]')!;
    const diagram = container.querySelector<HTMLElement>('[data-diagram]')!;
    const update = (): void => {
      const a = angle.valueAsNumber;
      const answer = calculateUsIv(depth.valueAsNumber, a);
      container.querySelectorAll<HTMLButtonElement>('[data-angle]').forEach(b => {
        const selected = Number(b.dataset.angle) === a;
        b.setAttribute('aria-pressed', String(selected));
        b.style.background = selected ? 'linear-gradient(#8A3324,#5E2418)' : 'linear-gradient(#666,#333)';
      });
      diagram.innerHTML = '';
      if (!answer) {
        result.textContent = !depth.value || !angle.value ? 'Enter depth and angle to calculate.' : 'Use a positive depth and an angle greater than 0° and no more than 90°.';
        return;
      }
      const format = (n: number): string => n < 0.01 ? '<0.01' : n.toFixed(2);
      result.innerHTML = `<strong style="display:block;font-size:28px">${format(answer.cm)} cm · ${format(answer.inches)} in</strong><span>Estimated path to near vein wall</span>`;
      const rad = a * Math.PI / 180;
      const scale = Math.min(230 / Math.max(Math.cos(rad), 0.001), 120 / Math.sin(rad));
      const x = 45 + Math.cos(rad) * scale, y = 45 + Math.sin(rad) * scale;
      diagram.innerHTML = `<svg viewBox="0 0 330 220" role="img" aria-label="Right triangle: needle path at ${a} degrees to skin, perpendicular vein depth, ending at the near vein wall" style="width:100%;display:block">
      <path d="M20 45H310" stroke="#555" stroke-width="3"/><text x="235" y="30" font-size="14">Skin</text>
      <path d="M${x} 45V${y}" stroke="#555" stroke-dasharray="5 4" stroke-width="2"/>
      <ellipse cx="${x}" cy="${y+12}" rx="24" ry="12" fill="#ddd" stroke="#555"/>
      <path d="M45 45L${x} ${y}" stroke="#8A3324" stroke-width="4"/>
      <circle cx="${x}" cy="${y}" r="4" fill="#8A3324"/>
      <text x="${Math.min(x+8,280)}" y="${45+(y-45)/2}" font-size="13">Depth</text>
      <text x="35" y="195" font-size="14">Angle to skin: ${a}° · path ends at near wall</text>
      <text x="35" y="214" font-size="12">Schematic; vessel size not to scale</text></svg>`;
    };
    depth.addEventListener('input', update); angle.addEventListener('input', update);
    container.querySelectorAll<HTMLButtonElement>('[data-angle]').forEach(b => b.addEventListener('click', () => { angle.value = b.dataset.angle!; update(); }));
    container.querySelector('[data-clear]')!.addEventListener('click', () => { depth.value = ''; angle.value = ''; update(); depth.focus(); });
    update();
  },
};
