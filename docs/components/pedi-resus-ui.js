import { PEDI_CITATIONS, PEDI_FOOTER, PEDI_STOCK, PEDI_TABS, PEDI_TAB_LABELS, ZONE_RANGE_NOTE, buildTabs, estimateWeightFromAge, fmtAmount, headerLine, parseInput, resolvePatient, zoneName, } from './pedi-resus-engine.js';
const CSS = `
.pz{max-width:760px;margin:0 auto;padding-bottom:24px;color:var(--color-text-primary,#000)}
.pz-bar{position:sticky;top:56px;z-index:80;background:var(--color-bg,#fff);padding:8px 0 10px;border-bottom:1px solid var(--color-border,#E5E7EB)}
.pz-input{width:100%;box-sizing:border-box;min-height:52px;padding:10px 14px;font-size:20px;border:2px solid var(--color-border,#E5E7EB);border-radius:12px;background:var(--color-surface-card,#fff);color:var(--color-text-primary,#000)}
.pz-input:focus{outline:3px solid var(--color-primary,#BF5700);outline-offset:1px}
.pz-chips{display:flex;gap:8px;margin-top:8px}
.pz-chip{flex:1;min-height:44px;min-width:44px;font-size:16px;font-weight:700;border:2px solid var(--color-border,#E5E7EB);border-radius:10px;background:var(--color-surface-card,#fff);color:var(--color-text-primary,#000);cursor:pointer}
.pz-chip[aria-pressed=true]{background:var(--color-primary,#BF5700);border-color:var(--color-primary,#BF5700);color:var(--color-primary-foreground,#fff)}
.pz-band{margin:12px 0;padding:14px 16px;border-radius:14px;border:2px solid rgba(0,0,0,.35)}
.pz-zone{font-size:30px;font-weight:800;letter-spacing:.04em;line-height:1.1}
.pz-head{font-size:17px;font-weight:700;margin-top:4px}
.pz-src{font-size:14px;margin-top:2px}
.pz-flags{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.pz-flag{font-size:13px;font-weight:600;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.85);color:#000;border:1px solid rgba(0,0,0,.4)}
.pz-empty{padding:18px 4px;font-size:16px;color:var(--color-text-secondary,#5E6A74)}
.pz-tabs{display:flex;gap:6px;overflow-x:auto;padding:4px 0 8px;margin:0 -2px;scrollbar-width:none}
.pz-tab{flex:0 0 auto;min-height:44px;padding:8px 14px;font-size:15px;font-weight:700;border:2px solid var(--color-border,#E5E7EB);border-radius:999px;background:var(--color-surface-card,#fff);color:var(--color-text-primary,#000);cursor:pointer;white-space:nowrap}
.pz-tab[aria-selected=true]{background:var(--color-primary,#BF5700);border-color:var(--color-primary,#BF5700);color:var(--color-primary-foreground,#fff)}
.pz-note{font-size:14px;line-height:1.45;color:var(--color-text-secondary,#5E6A74);margin:6px 2px}
.pz-row{border:1px solid var(--color-border,#E5E7EB);border-radius:12px;background:var(--color-surface-card,#fff);padding:10px 12px;margin:8px 0}
.pz-top{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}
.pz-name{font-size:17px;font-weight:700}
.pz-route{font-size:13px;font-weight:600;color:var(--color-text-secondary,#5E6A74);margin-left:6px}
.pz-ind{font-size:14px;color:var(--color-text-secondary,#5E6A74)}
.pz-doses{text-align:right;flex:0 0 auto}
.pz-line{display:flex;gap:8px;justify-content:flex-end;align-items:baseline}
.pz-lab{font-size:13px;color:var(--color-text-secondary,#5E6A74)}
.pz-big{font-size:24px;font-weight:800;line-height:1.15}
.pz-ml{font-size:17px;font-weight:700}
.pz-basis{font-size:14px;margin-top:4px;color:var(--color-text-secondary,#5E6A74)}
.pz-cap{display:inline-block;font-size:12px;font-weight:800;padding:2px 8px;border-radius:6px;background:var(--color-danger,#B22222);color:#fff;margin-left:6px}
.pz-cite{font-size:12px;color:var(--color-text-secondary,#5E6A74);margin-left:6px}
.pz-foot{margin-top:18px;font-size:13px;line-height:1.45;color:var(--color-text-secondary,#5E6A74)}
.pz-link{display:inline-block;min-height:44px;line-height:44px;font-weight:700;color:var(--color-primary,#BF5700);cursor:pointer;background:none;border:0;padding:0;font-size:15px}
`;
let lastInput = '';
let lastUnit = 'yr';
function ensureStyle() {
    if (document.getElementById('pedi-resus-css'))
        return;
    const el = document.createElement('style');
    el.id = 'pedi-resus-css';
    el.textContent = CSS;
    document.head.appendChild(el);
}
function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls)
        e.className = cls;
    if (text !== undefined)
        e.textContent = text;
    return e;
}
function queryParams() {
    const h = window.location.hash;
    const i = h.indexOf('?');
    return new URLSearchParams(i >= 0 ? h.slice(i + 1) : '');
}
function rowEl(r) {
    const row = el('div', 'pz-row');
    const top = el('div', 'pz-top');
    const left = el('div');
    const name = el('div', 'pz-name', r.name);
    if (r.route)
        name.appendChild(el('span', 'pz-route', r.route));
    left.appendChild(name);
    if (r.indication)
        left.appendChild(el('div', 'pz-ind', r.indication));
    top.appendChild(left);
    const doses = el('div', 'pz-doses');
    for (const l of r.lines) {
        const line = el('div', 'pz-line');
        if (l.label)
            line.appendChild(el('span', 'pz-lab', l.label));
        line.appendChild(el('span', 'pz-big', l.dose));
        if (l.ml)
            line.appendChild(el('span', 'pz-ml', l.ml));
        doses.appendChild(line);
    }
    top.appendChild(doses);
    row.appendChild(top);
    const basis = el('div', 'pz-basis', r.basis);
    if (r.capped)
        basis.appendChild(el('span', 'pz-cap', 'CAPPED AT MAX'));
    basis.appendChild(el('span', 'pz-cite', `[${r.cite.join(', ')}]`));
    row.appendChild(basis);
    if (r.conc)
        row.appendChild(el('div', 'pz-basis', `mL at ${r.conc} (${PEDI_STOCK})`));
    if (r.notes)
        row.appendChild(el('div', 'pz-basis', r.notes));
    return row;
}
function bandEl(p) {
    const band = el('div', 'pz-band');
    band.setAttribute('aria-live', 'polite');
    const z = p.zone.kind === 'zone' ? p.zone.zone : null;
    band.style.background = z ? z.bgHex : '#808080';
    band.style.color = z ? z.textHex : '#000';
    band.appendChild(el('div', 'pz-zone', zoneName(p).toUpperCase() + (z ? ' ZONE' : '')));
    band.appendChild(el('div', 'pz-head', headerLine(p)));
    band.appendChild(el('div', 'pz-src', `Weight used: ${fmtAmount(p.weightKg)} kg, ${p.sourceLabel}.${z ? ` Zone range ${z.weightMin}-${z.weightMax} kg.` : ''}`));
    const flags = el('div', 'pz-flags');
    flags.appendChild(el('span', 'pz-flag', 'Obese: dose by ideal weight (from length or age)'));
    for (const f of p.flags)
        flags.appendChild(el('span', 'pz-flag', f));
    band.appendChild(flags);
    return band;
}
function weightPanel(p) {
    const wrap = el('div');
    const mk = (name, main, basis, cite) => ({ id: name, name, tab: 'airway', kind: 'size', lines: [{ dose: main }], basis, capped: false, cite });
    wrap.appendChild(rowEl(mk('Dosing weight', `${p.weightSource === 'measured' ? '' : '~'}${fmtAmount(p.weightKg)} kg`, `Source: ${p.sourceLabel}. Priority: measured weight, then length, then age.`, [10, 9])));
    if (p.ageMonths !== undefined) {
        const est = estimateWeightFromAge(p.ageMonths);
        wrap.appendChild(rowEl(mk('Age estimate', `${fmtAmount(est.kg)} kg`, `${est.method}: ${est.formula}${est.useActualWeight ? '. Over 12 yr: use the actual weight.' : ''}`, [10, 9])));
    }
    if (p.zone.kind === 'zone') {
        const z = p.zone.zone;
        wrap.appendChild(rowEl(mk('Zone weight range', `${z.weightMin}-${z.weightMax} kg`, `${z.color} zone, about ${z.ageApprox}. ${ZONE_RANGE_NOTE}`, [1, 2])));
    }
    wrap.appendChild(el('div', 'pz-note', 'Obese child: dose resuscitation drugs by the weight estimated from length or age (ideal weight), not by actual weight.'));
    return wrap;
}
function tabEl(p, tab, content) {
    const wrap = el('div');
    const c = content[tab];
    for (const n of c.notes)
        wrap.appendChild(el('div', 'pz-note', n));
    if (c.rows.length === 0)
        wrap.appendChild(el('div', 'pz-empty', 'No sourced values for this tab at this size.'));
    for (const r of c.rows)
        wrap.appendChild(rowEl(r));
    void p;
    return wrap;
}
export function mountPedi(container, mode) {
    ensureStyle();
    const params = queryParams();
    const prefill = params.get('q');
    if (prefill) {
        lastInput = prefill;
    }
    let activeTab = PEDI_TABS.includes(params.get('tab') ?? '') ? params.get('tab') : 'airway';
    if (mode !== 'zone' && mode !== 'weight')
        activeTab = mode;
    const root = el('div', 'pz');
    const bar = el('div', 'pz-bar');
    const input = el('input', 'pz-input');
    input.type = 'text';
    input.setAttribute('inputmode', 'text');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('aria-label', 'Age, weight or length');
    input.placeholder = 'Age, weight or length: 2y, 18mo, 14kg, 92cm';
    input.value = lastInput;
    bar.appendChild(input);
    const chips = el('div', 'pz-chips');
    const chipDefs = [{ unit: 'mo', label: 'mo' }, { unit: 'yr', label: 'yr' }, { unit: 'kg', label: 'kg' }, { unit: 'cm', label: 'cm' }];
    const chipEls = [];
    const syncChips = () => chipEls.forEach((b, i) => b.setAttribute('aria-pressed', String(chipDefs[i].unit === lastUnit)));
    for (const d of chipDefs) {
        const b = el('button', 'pz-chip', d.label);
        b.type = 'button';
        b.addEventListener('click', () => {
            lastUnit = d.unit;
            // a bare number takes the chosen unit; typed units are left alone
            const m = /^\s*(\d+(?:[.,]\d+)?)\s*$/.exec(input.value);
            if (m)
                input.value = `${m[1]}${d.unit === 'yr' ? 'y' : d.unit}`;
            syncChips();
            render();
            input.focus();
        });
        chipEls.push(b);
        chips.appendChild(b);
    }
    bar.appendChild(chips);
    root.appendChild(bar);
    const out = el('div');
    root.appendChild(out);
    root.appendChild(el('div', 'pz-foot', PEDI_FOOTER));
    container.appendChild(root);
    const parse = (s) => {
        const bare = /^\s*(\d+(?:[.,]\d+)?)\s*$/.exec(s);
        if (bare)
            return parseInput({ value: bare[1], unit: lastUnit });
        const parsed = parseInput(s);
        // reflect an explicit unit in the chips
        if (parsed.weightKg !== undefined && !/\d\s*(?:y|mo|m\b|cm)/i.test(s))
            lastUnit = 'kg';
        else if (parsed.lengthCm !== undefined && parsed.weightKg === undefined && parsed.ageMonths === undefined)
            lastUnit = 'cm';
        else if (parsed.ageMonths !== undefined && parsed.weightKg === undefined && parsed.lengthCm === undefined)
            lastUnit = /mo|m\/o|month|mth|\dm\b/i.test(s) ? 'mo' : 'yr';
        return parsed;
    };
    function render() {
        lastInput = input.value;
        out.replaceChildren();
        const p = resolvePatient(parse(input.value));
        syncChips();
        // Keep the zone color visible while scrolling the drug lists: tint the sticky input bar.
        const zc = p && p.zone.kind === 'zone' ? p.zone.zone.bgHex : '';
        input.style.borderColor = zc;
        input.style.boxShadow = zc ? `inset 10px 0 0 ${zc}` : '';
        bar.style.borderBottom = zc ? `6px solid ${zc}` : '';
        if (!p) {
            out.appendChild(el('div', 'pz-empty', 'Enter an age, a weight or a length. A measured weight beats length, and length beats age.'));
            return;
        }
        out.appendChild(bandEl(p));
        if (p.zone.kind === 'neonate') {
            const msg = el('div', 'pz-row');
            msg.appendChild(el('div', 'pz-name', 'Neonate or under 3 kg'));
            msg.appendChild(el('div', 'pz-basis', 'Zone tape sizes do not apply. Use the Neonatal Resuscitation (NRP) consult for tube size by gestational age and doses.'));
            const go = el('button', 'pz-link', 'Open Neonatal Resuscitation (NRP)');
            go.type = 'button';
            go.addEventListener('click', () => { window.location.hash = '#/tree/neonatal-resus'; });
            msg.appendChild(go);
            out.appendChild(msg);
            return;
        }
        const content = buildTabs(p);
        if (mode === 'weight') {
            out.appendChild(weightPanel(p));
            return;
        }
        if (mode === 'zone') {
            const tabs = el('div', 'pz-tabs');
            tabs.setAttribute('role', 'tablist');
            const body = el('div');
            const show = () => {
                body.replaceChildren(tabEl(p, activeTab, content));
                tabButtons.forEach((b, i) => b.setAttribute('aria-selected', String(PEDI_TABS[i] === activeTab)));
            };
            const tabButtons = PEDI_TABS.map(t => {
                const b = el('button', 'pz-tab', PEDI_TAB_LABELS[t]);
                b.type = 'button';
                b.setAttribute('role', 'tab');
                b.addEventListener('click', () => { activeTab = t; show(); });
                tabs.appendChild(b);
                return b;
            });
            out.appendChild(tabs);
            out.appendChild(body);
            show();
            return;
        }
        out.appendChild(tabEl(p, mode, content));
        const full = el('button', 'pz-link', 'Open the full Color Zone Tape');
        full.type = 'button';
        full.addEventListener('click', () => { window.location.hash = `#/calculator/pedi-zone?q=${encodeURIComponent(input.value.replace(/\s+/g, ''))}&tab=${mode}`; });
        out.appendChild(full);
    }
    input.addEventListener('input', render);
    syncChips();
    render();
}
function def(id, title, subtitle, description, mode) {
    return {
        id, title, subtitle, description, fields: [], results: [],
        thresholdNote: PEDI_FOOTER, citations: PEDI_CITATIONS,
        customRender: (container) => mountPedi(container, mode),
    };
}
export const PEDI_ZONE_CALCULATOR = def('pedi-zone', 'Color Zone Tape (Broselow-equivalent)', 'Age, weight or length to zone, tubes, lines and drug doses', 'One input drives everything. A measured weight is used first, then length, then an age estimate (APLS). Doses show mg and mL at common US concentrations; confirm your vial.', 'zone');
export const PEDI_WEIGHT_CALCULATOR = def('pedi-weight', 'Pediatric Weight Estimate', 'APLS weight from age, with zone range', 'Weight from age (APLS 2011), measured weight, or length. Obese children: dose by ideal weight.', 'weight');
export const PEDI_AIRWAY_CALCULATOR = def('pedi-airway', 'Pediatric ETT Size and Depth', 'Cuffed and uncuffed tube, depth at lip, blade, LMA', 'Cuffed tube first with the uncuffed size beside it. Have a half size up and down ready.', 'airway');
export const PEDI_TUBES_CALCULATOR = def('pedi-tubes', 'Pediatric Tubes and Lines', 'NG/OG, Foley, chest tube, IV gauge by zone', 'Sizes by color zone from the Randall and Children\'s Minnesota cards.', 'tubes');
export const PEDI_ARREST_CALCULATOR = def('pedi-arrest', 'Pediatric Arrest and Rhythm Doses', 'Epinephrine, amiodarone, adenosine, atropine, calcium, defibrillation', 'Per-dose amounts with the cap applied, in mg and mL.', 'arrest');
export const PEDI_RSI_CALCULATOR = def('pedi-rsi', 'Pediatric RSI Doses', 'Induction, sedation and paralytic doses by weight', 'Vecuronium is intentionally omitted (not recommended; recalled tape error).', 'rsi');
export const PEDI_SEIZURE_CALCULATOR = def('pedi-seizure', 'Pediatric Seizure Doses', 'Benzodiazepines and second-line agents by weight', 'Midazolam IM/IN, lorazepam, diazepam PR, levetiracetam, fosphenytoin, phenobarbital.', 'seizure');
export const PEDI_SHOCK_CALCULATOR = def('pedi-shock', 'Pediatric Shock, Fluids and Vitals', 'Boluses, maintenance, infusions, vital sign ranges, hypotension', 'Bolus with reassessment after each, 4-2-1 maintenance, normal HR and RR for age, hypotension cutoff.', 'shock');
export const PEDI_CALCULATORS = [
    PEDI_ZONE_CALCULATOR, PEDI_WEIGHT_CALCULATOR, PEDI_AIRWAY_CALCULATOR, PEDI_TUBES_CALCULATOR,
    PEDI_ARREST_CALCULATOR, PEDI_RSI_CALCULATOR, PEDI_SEIZURE_CALCULATOR, PEDI_SHOCK_CALCULATOR,
];
