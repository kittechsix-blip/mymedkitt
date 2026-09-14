import { bodyModel, HEIGHT, WIDTH, percentages, renderBody, stroke, totalBurn } from './tbsa-engine.js';
import { LUND_BROWDER_AGES } from './tbsa-paths.js';
import { dellSeton, parkland, ruleOf10, validInputs } from './fluids-engine.js';
export function createBurnSession() {
    return { mode: 'adult', age: 0, view: 'front', paint: { front: new Uint8Array(WIDTH * HEIGHT), back: new Uint8Array(WIDTH * HEIGHT) }, tbsa: null, weight: null, manual: false, fluids: { volume: '0', hours: '0', crrt: false, multiplier: '4' } };
}
// In-memory only: retained while moving between tools, cleared on reload.
export const burnSession = createBurnSession();
const css = `
.bk-tool{font-family:inherit;font-size:15px;line-height:1.45;color:#26211e;max-width:560px;margin:auto;display:grid;gap:12px}.bk-tool *{box-sizing:border-box}.bk-tool button,.bk-tool input,.bk-tool select{font:inherit;min-height:44px;border:1px solid #c9b8aa;border-radius:10px;padding:8px 12px;background:white;color:#26211e;max-width:100%}.bk-tool button{cursor:pointer;box-shadow:0 2px 0 #c9b8aa;font-weight:600}.bk-tool button[aria-pressed=true]{background:#BF5700;color:white;border-color:#BF5700}.bk-tool button:focus-visible,.bk-tool input:focus-visible,.bk-tool select:focus-visible{outline:3px solid #BF5700;outline-offset:2px}.bk-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.bk-row>*{flex:1}.bk-tool label{display:grid;gap:4px;font-size:13px;font-weight:600}.bk-tool input{width:100%;min-width:0}.bk-card{background:#fff;border:1px solid #ddcfc4;border-radius:14px;padding:14px}.bk-tool p{margin:0 0 8px}.bk-tool p:last-child{margin-bottom:0}.bk-tool h3{font-size:16px;margin:0 0 8px}.bk-tool small{font-size:12px;color:#60544b}.bk-result{font-size:30px;font-weight:750;font-variant-numeric:tabular-nums}.bk-warning{border-left:4px solid #B22222}.bk-canvas{display:block;width:100%;height:auto;touch-action:none;user-select:none;background:#fff;border:1px solid #ddcfc4;border-radius:14px;cursor:crosshair}.bk-tool details>summary{cursor:pointer;min-height:44px;padding:10px 0;font-weight:600}.bk-tool ul{padding-left:20px;margin:8px 0}.bk-tool .bk-check{display:flex;align-items:center;gap:10px}.bk-check input{width:20px;height:20px;min-height:20px}.bk-muted{color:#60544b}.bk-tool output{display:block}.bk-tool table{width:100%;font-size:12px;border-collapse:collapse}.bk-tool td,.bk-tool th{padding:5px;text-align:left;border-bottom:1px solid #eee}.bk-tool .bk-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:start}
`;
function shell(container, html) {
    container.innerHTML = '';
    const root = document.createElement('section');
    root.className = 'bk-tool';
    const style = document.createElement('style');
    style.textContent = css;
    root.append(style);
    const content = document.createElement('div');
    content.style.display = 'contents';
    content.innerHTML = html;
    root.append(content);
    container.append(root);
    return root;
}
function numeric(input) { return input.value.trim() === '' ? NaN : Number(input.value); }
function fmt(n) { return n.toLocaleString('en-US', { maximumFractionDigits: 1 }); }
function clean(session) { session.paint.front.fill(0); session.paint.back.fill(0); session.tbsa = null; session.manual = false; }
export function mountTbsa(container, session = burnSession, onChange) {
    const root = shell(container, `
    <div class="bk-row" role="group" aria-label="Body proportions"><button data-mode="adult">Adult · Rule of 9s</button><button data-mode="peds">Pediatric · Lund-Browder</button></div>
    <label data-age-wrap>Patient age group<select data-age>${LUND_BROWDER_AGES.map((a, i) => `<option value="${i}">${a.label}</option>`).join('')}</select></label>
    <output class="bk-card" aria-live="polite"><strong class="bk-result" data-total></strong><div data-subtotal></div></output>
    <div class="bk-row" role="group" aria-label="Body surface"><button data-view="front">Front</button><button data-view="back">Back</button></div>
    <div class="bk-row"><button data-action="paint">Paint</button><button data-action="erase">Erase</button><button data-action="undo">Undo</button></div>
    <label>Brush size<select data-brush><option value="6">Fine</option><option value="12" selected>Medium</option><option value="24">Broad</option></select></label>
    <canvas class="bk-canvas" width="${WIDTH}" height="${HEIGHT}" aria-label="Paint burned skin on body diagram"></canvas>
    <small>Paint partial- and full-thickness burns only. Superficial redness is excluded. Front and back are added together. The outlined regions are the exact calculation map.</small>
    <div class="bk-row"><button data-action="clear">Clear this side</button><button data-action="reset">Reset both sides</button></div>
    <label>Manual TBSA override (%)<input data-manual type="number" inputmode="decimal" min="0" max="100" step="0.1" placeholder="0"></label>
    <p data-error role="alert"></p>
    <details><summary>Region totals and method</summary><p>Each painted fraction is weighted by that anatomical region’s TBSA percentage. This is an estimate; verify the clinical burn extent. Small burns in critical areas can still require burn-center referral.</p><table><thead><tr><th>Region on this side</th><th>Burned / full %</th></tr></thead><tbody data-regions></tbody></table><p><small>Adult Rule of Nines; pediatric Lund–Browder age bands. <a href="https://www.ameriburn.org/burn-care-team/resources/guidelines-for-burn-patient-referral" target="_blank" rel="noopener noreferrer">ABA burn assessment</a>.</small></p></details>
  `);
    const canvas = root.querySelector('canvas');
    const manual = root.querySelector('[data-manual]');
    const age = root.querySelector('[data-age]');
    const ageWrap = root.querySelector('[data-age-wrap]');
    const error = root.querySelector('[data-error]');
    const history = [];
    let erasing = false, active = null, last = null;
    function snapshot() { history.push({ front: session.paint.front.slice(), back: session.paint.back.slice(), tbsa: session.tbsa, manual: session.manual }); if (history.length > 25)
        history.shift(); }
    function refresh(calculate = false) {
        const pct = percentages(session.mode, session.age);
        const front = totalBurn(bodyModel(session.mode, 'front'), session.paint.front, pct);
        const back = totalBurn(bodyModel(session.mode, 'back'), session.paint.back, pct);
        if (calculate) {
            session.tbsa = Math.round((front + back) * 10) / 10;
            session.manual = false;
        }
        root.querySelector('[data-total]').textContent = `${fmt(session.tbsa ?? 0)}% TBSA`;
        root.querySelector('[data-subtotal]').textContent = session.manual ? 'Manual override active · painting will return to the drawn estimate' : `Front ${fmt(front)}% + Back ${fmt(back)}%`;
        manual.value = session.tbsa == null ? '' : String(session.tbsa);
        age.value = String(session.age);
        ageWrap.hidden = session.mode !== 'peds';
        ageWrap.style.display = ageWrap.hidden ? 'none' : '';
        root.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === session.mode)));
        root.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === session.view)));
        root.querySelector('[data-action=paint]').setAttribute('aria-pressed', String(!erasing));
        root.querySelector('[data-action=erase]').setAttribute('aria-pressed', String(erasing));
        const model = bodyModel(session.mode, session.view);
        renderBody(canvas, model, session.paint[session.view]);
        canvas.setAttribute('aria-label', `${session.mode} ${session.view} burn painting diagram`);
        const counts = model.ids.map(() => 0);
        session.paint[session.view].forEach((v, i) => { if (v && model.map[i] >= 0)
            counts[model.map[i]]++; });
        root.querySelector('[data-regions]').innerHTML = model.ids.map((id, r) => `<tr><td>${(session.view === 'front' ? id.replace(/^right-/, 'diagram-right-').replace(/^left-/, 'diagram-left-') : id).replace(/-/g, ' ')}</td><td>${fmt(counts[r] / model.areas[r] * pct[id])} / ${fmt(pct[id])}</td></tr>`).join('');
        onChange?.(session.tbsa);
    }
    root.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => {
        if (active !== null || session.mode === b.dataset.mode)
            return;
        clean(session);
        session.mode = b.dataset.mode;
        session.view = 'front';
        history.length = 0;
        error.textContent = '';
        refresh(true);
    });
    root.querySelectorAll('[data-view]').forEach(b => b.onclick = () => { if (active !== null)
        return; session.view = b.dataset.view; refresh(); });
    age.onchange = () => { session.age = Number(age.value); refresh(true); };
    root.querySelectorAll('[data-action]').forEach(b => b.onclick = () => {
        if (active !== null)
            return;
        switch (b.dataset.action) {
            case 'paint':
                erasing = false;
                break;
            case 'erase':
                erasing = true;
                break;
            case 'undo': {
                const prev = history.pop();
                if (prev) {
                    session.paint = { front: prev.front, back: prev.back };
                    session.tbsa = prev.tbsa;
                    session.manual = prev.manual;
                    if (!prev.manual) {
                        refresh(true);
                        return;
                    }
                }
                break;
            }
            case 'clear':
                snapshot();
                session.paint[session.view].fill(0);
                refresh(true);
                return;
            case 'reset':
                snapshot();
                clean(session);
                refresh(true);
                return;
        }
        refresh();
    });
    function point(e) { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) * WIDTH / r.width, y: (e.clientY - r.top) * HEIGHT / r.height }; }
    function draw(e) {
        const p = point(e);
        const from = last ?? p;
        stroke(bodyModel(session.mode, session.view), session.paint[session.view], from.x, from.y, p.x, p.y, Number(root.querySelector('[data-brush]').value), erasing);
        last = p;
    }
    canvas.onpointerdown = e => { if (active !== null || !e.isPrimary || e.button !== 0)
        return; e.preventDefault(); active = e.pointerId; snapshot(); last = null; canvas.setPointerCapture(e.pointerId); draw(e); refresh(true); };
    canvas.onpointermove = e => { if (active !== e.pointerId)
        return; e.preventDefault(); const events = e.getCoalescedEvents?.() ?? []; (events.length ? events : [e]).forEach(draw); refresh(true); };
    const finish = (e) => { if (e.pointerId !== active)
        return; if (e.type === 'pointerup') {
        draw(e);
        refresh(true);
    } active = null; last = null; if (canvas.hasPointerCapture(e.pointerId))
        canvas.releasePointerCapture(e.pointerId); };
    canvas.onpointerup = finish;
    canvas.onpointercancel = finish;
    canvas.onlostpointercapture = finish;
    manual.oninput = () => {
        if (manual.value === '') {
            session.tbsa = null;
            session.manual = true;
            error.textContent = '';
            refresh();
            return;
        }
        const value = numeric(manual);
        if (!Number.isFinite(value) || value < 0 || value > 100) {
            error.textContent = 'Enter TBSA from 0 to 100%.';
            session.tbsa = null;
            onChange?.(null);
            root.querySelector('[data-total]').textContent = 'Invalid TBSA';
            return;
        }
        error.textContent = '';
        session.tbsa = value;
        session.manual = true;
        root.querySelector('[data-total]').textContent = `${fmt(value)}% TBSA`;
        root.querySelector('[data-subtotal]').textContent = 'Manual override active';
        onChange?.(value);
    };
    refresh();
    return () => { if (active !== null && canvas.hasPointerCapture(active))
        canvas.releasePointerCapture(active); root.remove(); };
}
export function mountFluids(container, session = burnSession, initialTab = 'dell-seton', onChange) {
    const root = shell(container, `
    <div class="bk-row" role="group" aria-label="Fluid protocol"><button data-tab="dell-seton">Dell Seton</button><button data-tab="parkland">Parkland</button><button data-tab="rule-of-10">Rule of 10s</button></div>
    <div class="bk-grid"><label>Weight (kg)<input data-weight type="number" inputmode="decimal" min="0" step="any" placeholder="Enter weight"></label><label>TBSA (%)<input data-tbsa type="number" inputmode="decimal" min="0" max="100" step="any" placeholder="Enter TBSA"></label></div>
    <div data-parkland class="bk-card"><label>Formula<select data-multiplier><option value="4">Classic Parkland · 4 mL/kg/%</option><option value="3">Pediatric starting formula · 3 mL/kg/%</option></select></label><label>Hours since burn<input data-hours type="number" inputmode="decimal" min="0" max="24" step="any" value="0"></label></div>
    <label data-volume-label>Total resuscitation fluid already given since burn (mL)<input data-volume type="number" inputmode="decimal" min="0" step="any" value="0"></label>
    <label data-crrt-label class="bk-check"><input data-crrt type="checkbox">CRRT has started</label>
    <output data-result class="bk-card" aria-live="polite"></output>
    <details data-source><summary>Dell Seton protocol and source</summary>
    <p>Institutional protocol transcribed in myMedKitt’s Burns → Dell-Seton (DSMC-UT) Burn Protocol, attributed to Jayson D. Aydelotte, MD, FACS, Burn Medical Director.</p>
    <p><strong>&lt;20%:</strong> No protocol-driven burn fluid resuscitation. Assess other hydration needs separately.</p>
    <p><strong>20–&lt;40%:</strong> 1 unit FFP on arrival, then LR at 10 × %TBSA mL/hr (30% → 300 mL/hr LR). Adjust hourly by 20% to UOP goal. At 15 mL × %TBSA × kg cumulative volume, switch all fluid to FFP. At 20 mL × %TBSA × kg, do not increase the hourly rate further; assess bladder pressure, place trialysis, and consult nephrology for CRRT.</p>
    <p><strong>≥40%:</strong> Start FFP only at 10 × %TBSA mL/hr (50% → 500 mL/hr FFP); no crystalloid. Place trialysis. Same 20× cumulative trigger and CRRT pathway. Once CRRT starts, FFP 125 mL/hr regardless of UOP.</p>
    <p>The source explicitly describes 15× and 20× as cumulative mL thresholds, not hourly rates. Initial tiers clarified by Dr. Andrew Kitlowski on September 14, 2026: no weight adjustment to the Dell Seton starting rate. This is an initial estimate, not the current titrated infusion rate.</p></details>
  `);
    let tab = initialTab;
    const weight = root.querySelector('[data-weight]'), tbsa = root.querySelector('[data-tbsa]'), volume = root.querySelector('[data-volume]'), hours = root.querySelector('[data-hours]'), crrt = root.querySelector('[data-crrt]'), multiplier = root.querySelector('[data-multiplier]'), result = root.querySelector('[data-result]');
    volume.value = session.fluids.volume;
    hours.value = session.fluids.hours;
    crrt.checked = session.fluids.crrt;
    multiplier.value = session.fluids.multiplier;
    weight.value = session.weight == null ? '' : String(session.weight);
    tbsa.value = session.tbsa == null ? '' : String(session.tbsa);
    function visible(selector, show) { const el = root.querySelector(selector); el.hidden = !show; el.style.display = show ? '' : 'none'; }
    function refresh() {
        const w = numeric(weight), t = numeric(tbsa), v = numeric(volume), h = numeric(hours);
        root.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tab === tab)));
        visible('[data-parkland]', tab === 'parkland');
        visible('[data-volume-label]', tab !== 'rule-of-10');
        visible('[data-crrt-label]', tab === 'dell-seton');
        visible('[data-source]', tab === 'dell-seton');
        result.classList.remove('bk-warning');
        if (!validInputs(w, t)) {
            result.textContent = 'Enter a weight greater than zero and a TBSA greater than 0 and no more than 100%. No rate calculated.';
            return;
        }
        if (tab !== 'rule-of-10' && (!Number.isFinite(v) || v < 0)) {
            result.textContent = 'Enter the actual nonnegative volume already given. No rate calculated.';
            return;
        }
        if (tab === 'dell-seton') {
            const d = dellSeton(w, t, v, crrt.checked);
            if (!d.tier) {
                result.innerHTML = '<h3>TBSA &lt;20%: no protocol-driven burn resuscitation</h3><p>No LR or FFP burn-resuscitation rate indicated by this protocol. Assess fluid needs and burn-center referral individually.</p>';
                return;
            }
            result.innerHTML = `<h3>Tier ${d.tier} · ${d.tier === 1 ? '20–&lt;40%' : '≥40%'} TBSA</h3>
      <div class="bk-result">${d.crrtRate !== null ? '125 mL/hr FFP' : v > 0 ? d.fluid : `${fmt(d.initialRate)} mL/hr ${d.tier === 1 ? 'LR' : 'FFP'}`}</div>
      <p><strong>${d.crrtRate !== null ? 'After CRRT starts' : v > 0 ? 'Continue from the actual titrated rate' : `Initial ${d.tier === 1 ? 'LR' : 'FFP only'} starting rate`}</strong></p>
      ${d.crrtRate !== null ? '<p>CRRT is marked started: decrease FFP to <strong>125 mL/hr regardless of UOP</strong>.</p>' : `<p>Initial estimate before titration: <strong>${fmt(d.initialRate)} mL/hr ${d.tier === 1 ? 'LR' : 'FFP'}</strong>. Dell Seton: ${fmt(t)}% × 10. No weight adjustment. Titrate from the actual infusion rate; this initial estimate is not a catch-up rate.</p>`}
      ${d.tier === 1 ? '<p><strong>1. On arrival: administer 1 unit FFP.</strong> <strong>2. Then start LR at the rate above.</strong> then switch all fluid to FFP at the cumulative trigger below.</p>' : '<p><strong>FFP ONLY — no crystalloid.</strong> Place a trialysis catheter and consult nephrology.</p>'}
      ${d.tier === 1 ? `<p><strong>Switch to FFP:</strong> ${fmt(d.switchVolume)} mL cumulative (15 × ${fmt(t)} × ${fmt(w)}).</p>` : ''}
      <p><strong>Stop further rate increases:</strong> ${fmt(d.ceilingVolume)} mL cumulative (20 × ${fmt(t)} × ${fmt(w)}).</p>
      <p><strong>Already given:</strong> ${fmt(v)} mL since burn. ${d.crrtRate !== null ? 'CRRT pathway active.' : `Current protocol fluid: <strong>${d.fluid}</strong>.`}</p>
      ${d.ceilingReached ? '<p><strong>Cumulative ceiling trigger reached: do NOT increase the current hourly rate further, regardless of UOP.</strong> Check bladder pressure; place trialysis and consult nephrology for CRRT. This is not an instruction to stop all fluid.</p>' : d.tier === 1 && v >= d.switchVolume && !crrt.checked ? '<p><strong>FFP switch trigger reached: switch ALL resuscitation fluid to FFP.</strong> Continue response-guided titration; do not restart at the initial estimate above.</p>' : ''}
      <p><strong>UOP goal:</strong> adult ${fmt(d.adultUop)} mL/hr (0.5 mL/kg/hr); pediatric ${fmt(d.pediatricUop)} mL/hr (1 mL/kg/hr). Pediatric resuscitation requires specialist direction.</p>
      <p>${crrt.checked ? 'After CRRT starts, use the fixed FFP rate above per the institutional protocol.' : 'Reassess UOP hourly. Adjust the current rate up or down by 20% as directed by response; do not increase after the cumulative ceiling trigger.'}</p>`;
            if (d.ceilingReached)
                result.classList.add('bk-warning');
        }
        else if (tab === 'rule-of-10') {
            result.innerHTML = `<div class="bk-result">${fmt(ruleOf10(t, w))} mL/hr LR</div><p><strong>Initial adult Rule of 10s rate</strong></p><p>${fmt(t)}% × 10; add 100 mL/hr per complete 10 kg above 80 kg. Titrate to UOP 0.5–1 mL/kg/hr. Not validated for pediatric use.</p>${t < 20 ? '<p>Below 20% TBSA: assess whether formula-based resuscitation is indicated.</p>' : ''}`;
        }
        else {
            if (!Number.isFinite(h) || h < 0 || h >= 24) {
                result.textContent = 'This starting formula covers the first 24 hours from time of burn. Enter 0 to less than 24 hours; at or beyond 24 hours reassess with the burn team.';
                return;
            }
            const m = Number(multiplier.value), p = parkland(w, t, h, v, m);
            result.innerHTML = `<div class="bk-result">${fmt(p.rate)} mL/hr LR</div><p><strong>Calculated remaining-volume rate · ${h < 8 ? 'first 8-hour' : '8–24-hour'} window</strong></p><p>${m} × ${fmt(w)} kg × ${fmt(t)}% = <strong>${fmt(p.total)} mL over 24 hours</strong>.</p><p>Half in first 8 hours (${fmt(p.firstRate)} mL/hr when started at injury); half over next 16 hours (${fmt(p.secondRate)} mL/hr).</p><p>${fmt(p.remainingVolume)} mL remaining to this window’s target ÷ ${fmt(p.remainingHours)} hours. Subtracts the <strong>actual ${fmt(v)} mL already given</strong>; does not assume prior treatment.</p><p><strong>Review before use:</strong> this arithmetic estimate does not authorize rapid catch-up or boluses. Titrate to response with the burn team, especially with delayed presentation. ${v >= p.target ? 'The window’s calculated volume has already been met; 0 is not an instruction to stop needed fluid.' : ''}</p>${m === 3 ? '<p>Pediatric care: add separately calculated maintenance with dextrose; monitor glucose and use pediatric UOP goals.</p>' : '<p>Classic Parkland is the historical 4 mL formula. The <a href="https://academic.oup.com/jbcr/article/45/3/565/7458089" target="_blank" rel="noopener noreferrer">2024 ABA adult guideline</a> recommends initiating at 2 mL/kg/% for adults with ≥20% burns. Select the treating burn center’s protocol.</p>'}`;
        }
    }
    root.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; refresh(); });
    weight.oninput = tbsa.oninput = () => { const w = numeric(weight), t = numeric(tbsa); session.weight = Number.isFinite(w) && w > 0 ? w : null; const next = Number.isFinite(t) && t >= 0 && t <= 100 ? t : null; if (next !== session.tbsa)
        session.manual = true; session.tbsa = next; onChange?.(session.weight, session.tbsa); refresh(); };
    const saveFluids = () => { session.fluids = { volume: volume.value, hours: hours.value, crrt: crrt.checked, multiplier: multiplier.value }; refresh(); };
    volume.oninput = hours.oninput = saveFluids;
    crrt.onchange = multiplier.onchange = saveFluids;
    refresh();
    return () => root.remove();
}
