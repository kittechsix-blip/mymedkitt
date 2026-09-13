import { TBSA_ADULT_FRONT, TBSA_ADULT_BACK, TBSA_PEDS_FRONT, TBSA_PEDS_BACK, TBSA_ADULT_PCT, buildPedsPct } from './tbsa-paths.js';
export const WIDTH = 360;
export const HEIGHT = 620;
const models = new Map();
export function percentages(mode, age) {
    return mode === 'adult' ? TBSA_ADULT_PCT : buildPedsPct(age);
}
export function bodyModel(mode, view) {
    const key = `${mode}-${view}`;
    const cached = models.get(key);
    if (cached)
        return cached;
    const paths = mode === 'adult' ? (view === 'front' ? TBSA_ADULT_FRONT : TBSA_ADULT_BACK) : (view === 'front' ? TBSA_PEDS_FRONT : TBSA_PEDS_BACK);
    // Small overlapping anatomical regions must own their pixels before the
    // larger neighboring surfaces. Display and scoring share this ownership.
    const ids = Object.keys(paths).sort((a, b) => priority(a) - priority(b));
    const map = new Int16Array(WIDTH * HEIGHT).fill(-1);
    const areas = ids.map(() => 0);
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ids.forEach((id, r) => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.save();
        ctx.translate(60, 16);
        ctx.fill(new Path2D(paths[id]));
        ctx.restore();
        const data = ctx.getImageData(0, 0, WIDTH, HEIGHT).data;
        for (let i = 0; i < map.length; i++)
            if (data[4 * i + 3] >= 128 && map[i] < 0) {
                map[i] = r;
                areas[r]++;
            }
        if (!areas[r])
            throw new Error(`Unpaintable body region: ${id}`);
    });
    const result = { map, ids, areas };
    models.set(key, result);
    return result;
}
function priority(id) { return id === 'perineum' ? 0 : id.includes('neck') ? 1 : id.includes('buttock') ? 2 : 3; }
export function totalBurn(model, paint, pct) {
    const counts = model.ids.map(() => 0);
    for (let i = 0; i < model.map.length; i++)
        if (paint[i] && model.map[i] >= 0)
            counts[model.map[i]]++;
    return counts.reduce((sum, count, r) => sum + count / model.areas[r] * pct[model.ids[r]], 0);
}
// Rasterize the complete swept brush capsule, not individual pointer samples.
// The same exact mask limits display, painting and calculation. No hidden
// pixels outside the body can accumulate, even during fast/off-canvas strokes.
export function stroke(model, paint, x1, y1, x2, y2, radius, erase = false) {
    const dx = x2 - x1, dy = y2 - y1, length2 = dx * dx + dy * dy;
    const left = Math.max(0, Math.floor(Math.min(x1, x2) - radius));
    const right = Math.min(WIDTH - 1, Math.ceil(Math.max(x1, x2) + radius));
    const top = Math.max(0, Math.floor(Math.min(y1, y2) - radius));
    const bottom = Math.min(HEIGHT - 1, Math.ceil(Math.max(y1, y2) + radius));
    for (let y = top; y <= bottom; y++)
        for (let x = left; x <= right; x++) {
            const i = y * WIDTH + x;
            if (model.map[i] < 0)
                continue;
            const t = length2 ? Math.max(0, Math.min(1, ((x + .5 - x1) * dx + (y + .5 - y1) * dy) / length2)) : 0;
            if ((x + .5 - x1 - t * dx) ** 2 + (y + .5 - y1 - t * dy) ** 2 <= radius * radius)
                paint[i] = erase ? 0 : 1;
        }
}
export function renderBody(canvas, model, paint) {
    const ctx = canvas.getContext('2d');
    const img = ctx.createImageData(WIDTH, HEIGHT);
    for (let i = 0; i < model.map.length; i++) {
        const r = model.map[i];
        if (r < 0)
            continue;
        const boundary = model.map[i - 1] !== r || model.map[i + 1] !== r || model.map[i - WIDTH] !== r || model.map[i + WIDTH] !== r;
        const offset = i * 4;
        img.data[offset] = boundary ? 70 : paint[i] ? 178 : 246;
        img.data[offset + 1] = boundary ? 51 : paint[i] ? 34 : 228;
        img.data[offset + 2] = boundary ? 42 : paint[i] ? 34 : 211;
        img.data[offset + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
}
