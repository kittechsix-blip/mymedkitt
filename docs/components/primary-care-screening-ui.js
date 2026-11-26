import { PCS_CITATIONS, PCS_FLAG_GROUPS, PCS_FOOTER, PCS_GROUP_LABELS, PCS_GROUP_ORDER, PCS_SOURCES, avoidLabel, defaultPreg, isPatientStop, screenPatient, summaryText, } from './primary-care-screening-engine.js';
const CSS = `
.pcs{max-width:760px;margin:0 auto;padding-bottom:24px;color:var(--color-text-primary,#000)}
.pcs-panel{border:1px solid var(--color-border,#E5E7EB);border-radius:14px;background:var(--color-surface-card,#fff);padding:14px;margin:0 0 14px;box-shadow:var(--shadow-sm,0 1px 2px rgba(0,0,0,.06))}
.pcs-lab{font-size:13px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--color-text-secondary,#5E6A74);margin:14px 0 6px}
.pcs-lab:first-child{margin-top:0}
.pcs-row{display:flex;gap:10px;align-items:stretch;flex-wrap:wrap}
.pcs-age{flex:0 0 112px;position:relative;display:flex}
.pcs-age input{width:100%;box-sizing:border-box;min-height:52px;padding:8px 38px 8px 14px;font-size:24px;font-weight:800;border:2px solid var(--color-border,#E5E7EB);border-radius:12px;background:var(--color-surface-card,#fff);color:var(--color-text-primary,#000)}
.pcs-age input:focus{outline:3px solid var(--color-primary,#BF5700);outline-offset:1px}
.pcs-age::after{content:'yr';position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:15px;font-weight:700;color:var(--color-text-secondary,#5E6A74);pointer-events:none}
.pcs-seg{display:flex;flex:1 1 200px;gap:6px;min-width:0}
.pcs-seg button{flex:1 1 0;min-height:52px;min-width:44px;padding:6px 10px;font-size:16px;font-weight:700;border:2px solid var(--color-border,#E5E7EB);border-radius:12px;background:var(--color-surface-card,#fff);color:var(--color-text-primary,#000);cursor:pointer}
.pcs-seg button[aria-pressed=true]{background:var(--color-primary,#BF5700);border-color:var(--color-primary,#BF5700);color:var(--color-primary-foreground,#fff)}
.pcs-chips{display:flex;flex-wrap:wrap;gap:8px}
.pcs-chip{min-height:44px;padding:8px 14px;font-size:15px;font-weight:600;line-height:1.2;text-align:left;border:2px solid var(--color-border,#E5E7EB);border-radius:999px;background:var(--color-surface-card,#fff);color:var(--color-text-primary,#000);cursor:pointer}
.pcs-chip[aria-pressed=true]{background:var(--color-primary,#BF5700);border-color:var(--color-primary,#BF5700);color:var(--color-primary-foreground,#fff)}
.pcs-chip small{display:block;font-size:12px;font-weight:500;opacity:.85}
.pcs-hint{font-size:14px;line-height:1.45;color:var(--color-text-secondary,#5E6A74);margin:8px 2px 0}
.pcs-scope{font-size:15px;line-height:1.45;padding:10px 12px;margin:0 0 10px;border:1px solid var(--color-primary,#BF5700);border-radius:12px;background:var(--color-surface-card,#fff);color:var(--color-text-primary,#000)}
.pcs-empty{padding:22px 6px;font-size:17px;line-height:1.45;color:var(--color-text-secondary,#5E6A74);text-align:center}
.pcs-sum{display:flex;gap:8px;align-items:stretch;margin:4px 0 10px}
.pcs-stat{flex:1 1 0;min-width:0;border-radius:12px;padding:10px 12px;border:2px solid currentColor;background:var(--color-surface-card,#fff)}
.pcs-stat b{display:block;font-size:26px;font-weight:800;line-height:1.05}
.pcs-stat span{font-size:13px;font-weight:700;color:var(--color-text-primary,#000)}
.pcs-t-do{color:var(--color-primary,#BF5700)}
.pcs-t-discuss{color:var(--color-primary-dark,#8C3F00)}
.pcs-t-avoid{color:var(--color-danger,#B22222)}
.pcs-t-unknown{color:var(--color-text-secondary,#5E6A74)}
.pcs-filters{display:flex;gap:6px;overflow-x:auto;padding:2px 0 10px;scrollbar-width:none}
.pcs-filter{flex:0 0 auto;min-height:44px;padding:8px 14px;font-size:15px;font-weight:700;border:2px solid var(--color-border,#E5E7EB);border-radius:999px;background:var(--color-surface-card,#fff);color:var(--color-text-primary,#000);cursor:pointer;white-space:nowrap}
.pcs-filter[aria-pressed=true]{background:var(--color-text-primary,#000);border-color:var(--color-text-primary,#000);color:var(--color-surface-card,#fff)}
.pcs-group{margin:16px 0 0}
.pcs-gh{display:flex;justify-content:space-between;align-items:baseline;gap:10px;padding:0 2px 6px;border-bottom:3px solid var(--color-primary,#BF5700)}
.pcs-gh h3{margin:0;font-size:16px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.pcs-gh span{font-size:13px;font-weight:700;color:var(--color-text-secondary,#5E6A74)}
.pcs-card{position:relative;border:1px solid var(--color-border,#E5E7EB);border-radius:12px;background:var(--color-surface-card,#fff);margin:8px 0}
.pcs-cs{list-style:none;cursor:pointer;padding:10px 12px 10px 14px;min-height:44px}
.pcs-cs::-webkit-details-marker{display:none}
.pcs-body{padding:0 12px 12px 14px}
.pcs-more-hint{margin-left:auto;font-size:12px;font-weight:700;text-decoration:underline;align-self:center}
.pcs-card .pcs-more-hint{color:var(--color-primary-dark,#8C3F00)}
.pcs-card[open] .pcs-more-hint{visibility:hidden}
.pcs-card.pcs-t-avoid{border-color:var(--color-danger,#B22222)}
.pcs-card .pcs-cs,.pcs-card .pcs-body{color:var(--color-text-primary,#000)}
.pcs-top{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}
.pcs-title{font-size:17px;font-weight:800;line-height:1.25}
.pcs-tier{flex:0 0 auto;font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;padding:3px 9px;border-radius:999px;border:2px solid currentColor;background:var(--color-surface-card,#fff)}
.pcs-card .pcs-tier.pcs-t-do{color:var(--color-primary-foreground,#fff);background:var(--color-primary,#BF5700);border-color:var(--color-primary,#BF5700)}
.pcs-card .pcs-tier.pcs-t-discuss{color:var(--color-primary-dark,#8C3F00)}
.pcs-card .pcs-tier.pcs-t-avoid{color:#fff;background:var(--color-danger,#B22222);border-color:var(--color-danger,#B22222)}
.pcs-card .pcs-tier.pcs-t-unknown{color:var(--color-text-secondary,#5E6A74)}
.pcs-action{font-size:16px;line-height:1.4;margin-top:4px}
.pcs-why,.pcs-other{font-size:15px;line-height:1.45;margin-top:6px}
.pcs-card .pcs-why,.pcs-card .pcs-other{color:var(--color-text-secondary,#5E6A74)}
.pcs-why b,.pcs-other b{color:var(--color-text-primary,#000)}
.pcs-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.pcs-pill{font-size:12px;font-weight:700;padding:3px 9px;border-radius:999px;border:1px solid var(--color-border,#E5E7EB);background:var(--color-bg,#fff)}
.pcs-card .pcs-pill{color:var(--color-text-secondary,#5E6A74)}
.pcs-card .pcs-pill.pcs-today{border-color:var(--color-text-primary,#000);color:var(--color-text-primary,#000)}
.pcs-src{min-height:44px;margin-top:10px;padding:0 4px;border:0;background:none;font-size:14px;font-weight:700;text-decoration:underline;cursor:pointer;color:var(--color-primary-dark,#8C3F00)}
.pcs-srcbox{font-size:13px;line-height:1.45;margin-top:10px;padding:8px 10px;border-radius:8px;background:var(--color-bg,#fff);border:1px dashed var(--color-border,#E5E7EB)}
.pcs-card .pcs-srcbox{color:var(--color-text-secondary,#5E6A74)}
.pcs-srcline+.pcs-srcline{margin-top:8px}
.pcs-srcbox a{display:inline-block;min-height:44px;line-height:44px;font-weight:700;color:var(--color-primary-dark,#8C3F00)}
.pcs-more{margin:18px 0 0;border:1px solid var(--color-border,#E5E7EB);border-radius:12px;background:var(--color-surface-card,#fff)}
.pcs-more summary{min-height:44px;display:flex;align-items:center;padding:6px 14px;font-size:15px;font-weight:800;cursor:pointer}
.pcs-more .pcs-in{padding:0 12px 10px}
.pcs-copy{width:100%;min-height:48px;margin-top:16px;font-size:16px;font-weight:800;border-radius:12px;border:2px solid var(--color-primary,#BF5700);background:var(--color-surface-card,#fff);color:var(--color-primary-dark,#8C3F00);cursor:pointer}
.pcs-prog{margin:4px 0 10px;padding:12px 14px;border:1px solid var(--color-border,#E5E7EB);border-radius:12px;background:var(--color-surface-card,#fff)}
.pcs-prog-top{display:flex;justify-content:space-between;align-items:baseline;gap:10px;font-size:17px;font-weight:800}
.pcs-prog-top span{font-size:14px;font-weight:700;color:var(--color-text-secondary,#5E6A74)}
.pcs-bar{height:10px;margin-top:8px;border-radius:999px;background:var(--color-border,#E5E7EB);overflow:hidden}
.pcs-bar i{display:block;height:100%;border-radius:999px;background:var(--color-primary,#BF5700)}
.pcs-sec{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:22px 0 0;padding:10px 14px;border-radius:12px;border:2px solid var(--color-primary,#BF5700)}
.pcs-sec h2{margin:0;font-size:19px;font-weight:800;line-height:1.2}
.pcs-sec b{flex:0 0 auto;min-width:34px;text-align:center;font-size:17px;font-weight:800;padding:2px 10px;border-radius:999px}
.pcs-sec-todo{background:var(--color-primary,#BF5700);color:var(--color-primary-foreground,#fff)}
.pcs-sec-todo b{background:var(--color-surface-card,#fff);color:var(--color-primary-dark,#8C3F00)}
.pcs-sec-done{background:var(--color-surface-card,#fff);color:var(--color-text-primary,#000);border-color:var(--color-text-primary,#000);border-style:dashed}
.pcs-sec-done b{background:var(--color-text-primary,#000);color:var(--color-surface-card,#fff)}
.pcs-item{display:flex;gap:8px;align-items:flex-start;margin:8px 0}
.pcs-item .pcs-col{flex:1 1 0;min-width:0}
.pcs-item .pcs-card{margin:0}
.pcs-check{flex:0 0 44px;width:44px;height:44px;min-height:44px;margin-top:2px;padding:0;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800;line-height:1;border:2px solid var(--color-primary,#BF5700);border-radius:10px;background:var(--color-surface-card,#fff);color:transparent;cursor:pointer}
.pcs-check[aria-checked=true]{background:var(--color-primary,#BF5700);color:var(--color-primary-foreground,#fff)}
.pcs-check:focus-visible{outline:3px solid var(--color-text-primary,#000);outline-offset:2px}
.pcs-isdone .pcs-card{background:var(--color-bg,#fff);border-style:dashed}
.pcs-isdone .pcs-title,.pcs-isdone .pcs-action{color:var(--color-text-secondary,#5E6A74)}
.pcs-card .pcs-tier.pcs-donepill{color:var(--color-text-primary,#000);background:var(--color-surface-card,#fff);border-color:var(--color-text-primary,#000)}
.pcs-date{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:6px;font-size:14px;font-weight:700;color:var(--color-text-secondary,#5E6A74)}
.pcs-date input{min-height:44px;padding:4px 10px;font-size:16px;font-weight:600;border:2px solid var(--color-border,#E5E7EB);border-radius:10px;background:var(--color-surface-card,#fff);color:var(--color-text-primary,#000)}
.pcs-foot{margin-top:16px;font-size:13px;line-height:1.5;color:var(--color-text-secondary,#5E6A74)}
`;
// In memory only, for this page load. Nothing is written to storage and no identifiers are collected.
const state = { age: '', sex: null, preg: null, tobacco: 'never', flags: new Set(), filter: 'all', done: new Map() };
const TIER_LABEL = { do: 'Recommended', discuss: 'Discuss', avoid: 'Do not screen', unknown: 'Evidence unclear' };
const WHERE_LABEL = { today: 'Can start today', refer: 'Needs referral', either: 'Today or clinic' };
function ensureStyle() {
    if (document.getElementById('pcs-css'))
        return;
    const s = document.createElement('style');
    s.id = 'pcs-css';
    s.textContent = CSS;
    document.head.appendChild(s);
}
function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls)
        e.className = cls;
    if (text !== undefined)
        e.textContent = text;
    return e;
}
function seg(label, opts, get, set, rerender) {
    const box = el('div', 'pcs-seg');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', label);
    for (const o of opts) {
        const b = el('button', undefined, o.label);
        b.type = 'button';
        b.setAttribute('aria-pressed', String(get() === o.v));
        b.addEventListener('click', () => { set(o.v); rerender(); });
        box.appendChild(b);
    }
    return box;
}
function patientFrom() {
    const age = Number(state.age);
    if (!state.age.trim() || !Number.isFinite(age) || !state.sex)
        return null;
    const whole = Math.floor(age);
    const preg = state.sex === 'female' ? (state.preg ?? defaultPreg(whole)) : 'no';
    return { age: whole, sex: state.sex, preg, tobacco: state.tobacco, flags: [...state.flags], year: new Date().getFullYear() };
}
// Collapsed by default: title, tier, the action and its grade. Tap to open the reasoning and the sources.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** 2026-11-26 -> "26 Nov 2026". Split by hand so no time zone can shift the day. */
function dateLabel(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!m || !MONTHS[Number(m[2]) - 1])
        return '';
    return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}
function donePillText(iso) {
    const d = dateLabel(iso);
    return d ? `\u2713 Done ${d}` : '\u2713 Done';
}
function todayIso() {
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
}
const isTask = (r) => r.tier === 'do' || r.tier === 'discuss';
// A task row: a 44px tick box beside the card. Done rows also carry an optional date field.
function taskRow(rec, rerender) {
    const done = state.done.has(rec.id);
    const row = el('div', `pcs-item${done ? ' pcs-isdone' : ''}`);
    const box = el('button', 'pcs-check', '\u2713');
    box.type = 'button';
    box.setAttribute('role', 'checkbox');
    box.setAttribute('aria-checked', String(done));
    box.setAttribute('aria-label', `${done ? 'Done' : 'Mark done'}: ${rec.title}`);
    box.addEventListener('click', () => {
        if (state.done.has(rec.id))
            state.done.delete(rec.id);
        else
            state.done.set(rec.id, '');
        rerender();
    });
    row.appendChild(box);
    const col = el('div', 'pcs-col');
    const c = card(rec, done);
    col.appendChild(c);
    if (done) {
        const wrap = el('label', 'pcs-date');
        wrap.appendChild(document.createTextNode('Date done (optional)'));
        const input = el('input');
        input.type = 'date';
        input.max = todayIso();
        input.value = state.done.get(rec.id) ?? '';
        // Update in place: rebuilding the list here would close the phone's date picker mid-choice.
        const sync = () => {
            state.done.set(rec.id, dateLabel(input.value) ? input.value : '');
            const pill = c.querySelector('.pcs-donepill');
            if (pill)
                pill.textContent = donePillText(state.done.get(rec.id) ?? '');
        };
        input.addEventListener('input', sync);
        input.addEventListener('change', sync);
        wrap.appendChild(input);
        col.appendChild(wrap);
    }
    row.appendChild(col);
    return row;
}
function card(rec, done = false) {
    const c = el('details', `pcs-card pcs-t-${rec.tier}`);
    const sum = el('summary', 'pcs-cs');
    const top = el('div', 'pcs-top');
    top.appendChild(el('div', 'pcs-title', rec.title));
    if (done)
        top.appendChild(el('span', 'pcs-tier pcs-donepill', donePillText(state.done.get(rec.id) ?? '')));
    else
        top.appendChild(el('span', `pcs-tier pcs-t-${rec.tier}`, rec.tier === 'avoid' ? avoidLabel(rec) : TIER_LABEL[rec.tier]));
    sum.appendChild(top);
    sum.appendChild(el('div', 'pcs-action', rec.action));
    const meta = el('div', 'pcs-meta');
    meta.appendChild(el('span', 'pcs-pill', rec.strength));
    if (!done && (rec.tier === 'do' || rec.tier === 'discuss')) {
        meta.appendChild(el('span', `pcs-pill${rec.where === 'today' ? ' pcs-today' : ''}`, WHERE_LABEL[rec.where]));
    }
    meta.appendChild(el('span', 'pcs-more-hint', rec.other ? 'Why, other guidance, source' : 'Why and source'));
    sum.appendChild(meta);
    c.appendChild(sum);
    const body = el('div', 'pcs-body');
    const why = el('div', 'pcs-why');
    why.appendChild(el('b', undefined, 'Why this patient: '));
    why.appendChild(document.createTextNode(rec.why));
    body.appendChild(why);
    if (rec.other) {
        const o = el('div', 'pcs-other');
        o.appendChild(el('b', undefined, 'Other guidance: '));
        o.appendChild(document.createTextNode(rec.other));
        body.appendChild(o);
    }
    const box = el('div', 'pcs-srcbox');
    for (const key of rec.src) {
        const s = PCS_SOURCES[key];
        const line = el('div', 'pcs-srcline');
        line.appendChild(document.createTextNode(`${s.cite} `));
        const a = el('a', undefined, 'Open source');
        a.href = s.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        line.appendChild(a);
        box.appendChild(line);
    }
    body.appendChild(box);
    c.appendChild(body);
    return c;
}
export function mountPcs(container) {
    ensureStyle();
    // Every open starts blank: the last patient's entries must never carry over to the next.
    state.age = '';
    state.sex = null;
    state.preg = null;
    state.tobacco = 'never';
    state.flags.clear();
    state.filter = 'all';
    state.done.clear();
    const root = el('div', 'pcs');
    const panel = el('div', 'pcs-panel');
    const out = el('div');
    out.setAttribute('aria-live', 'polite');
    root.appendChild(panel);
    root.appendChild(out);
    root.appendChild(el('div', 'pcs-foot', PCS_FOOTER));
    container.appendChild(root);
    const renderOut = () => {
        out.textContent = '';
        const p = patientFrom();
        if (!p) {
            out.appendChild(el('div', 'pcs-empty', 'Enter age and sex to see what this patient is due for.'));
            return;
        }
        const result = screenPatient(p);
        if (result.notice) {
            out.appendChild(el('div', 'pcs-empty', result.notice));
            return;
        }
        // Patient-specific stops (a live vaccine in pregnancy, PSA at 70+) stay in their group, in plain sight.
        const main = result.recs.filter(r => r.tier === 'do' || r.tier === 'discuss' || isPatientStop(r));
        const rest = result.recs.filter(r => (r.tier === 'avoid' && !isPatientStop(r)) || r.tier === 'unknown');
        const startable = (r) => r.tier !== 'avoid' && (r.where === 'today' || r.where === 'either');
        const tasks = main.filter(isTask);
        // Forget ticks for items that no longer apply to the patient as entered.
        for (const id of [...state.done.keys()])
            if (!tasks.some(r => r.id === id))
                state.done.delete(id);
        const isDone = (r) => state.done.has(r.id);
        const todo = main.filter(r => !isDone(r));
        const doneItems = tasks.filter(isDone);
        const left = tasks.length - doneItems.length;
        if (result.scopeNote)
            out.appendChild(el('div', 'pcs-scope', result.scopeNote));
        const prog = el('div', 'pcs-prog');
        const ptop = el('div', 'pcs-prog-top');
        ptop.appendChild(document.createTextNode(`${doneItems.length} of ${tasks.length} done`));
        ptop.appendChild(el('span', undefined, left ? `${left} still to do` : 'Nothing left to do'));
        prog.appendChild(ptop);
        const bar = el('div', 'pcs-bar');
        const fill = el('i');
        fill.style.width = `${tasks.length ? Math.round((doneItems.length / tasks.length) * 100) : 0}%`;
        bar.appendChild(fill);
        prog.appendChild(bar);
        prog.appendChild(el('div', 'pcs-hint', 'Tick the box when an item is done today or the patient reports it was done. Ticks are cleared when you leave this screen.'));
        out.appendChild(prog);
        const sum = el('div', 'pcs-sum');
        const stat = (tier, n, label) => {
            const s = el('div', `pcs-stat pcs-t-${tier}`);
            s.appendChild(el('b', undefined, String(n)));
            s.appendChild(el('span', undefined, label));
            sum.appendChild(s);
        };
        stat('do', todo.filter(r => r.tier === 'do').length, 'Recommended, to do');
        stat('discuss', todo.filter(r => r.tier === 'discuss').length, 'To discuss');
        stat('discuss', todo.filter(startable).length, 'Can start today');
        out.appendChild(sum);
        const section = (cls, title, n) => {
            const h = el('div', `pcs-sec ${cls}`);
            h.appendChild(el('h2', undefined, title));
            h.appendChild(el('b', undefined, String(n)));
            out.appendChild(h);
        };
        const groups = (list) => {
            for (const g of PCS_GROUP_ORDER) {
                const items = list.filter(r => r.group === g);
                if (!items.length)
                    continue;
                const sec = el('section', 'pcs-group');
                const gh = el('div', 'pcs-gh');
                gh.appendChild(el('h3', undefined, PCS_GROUP_LABELS[g]));
                gh.appendChild(el('span', undefined, String(items.length)));
                sec.appendChild(gh);
                // Patient-specific stops first, then recommended, then items to discuss.
                for (const r of [...items.filter(i => i.tier === 'avoid'), ...items.filter(i => i.tier === 'do'), ...items.filter(i => i.tier === 'discuss')]) {
                    sec.appendChild(isTask(r) ? taskRow(r, renderOut) : card(r));
                }
                out.appendChild(sec);
            }
        };
        section('pcs-sec-todo', 'Still to do', left);
        const filters = el('div', 'pcs-filters');
        filters.style.paddingTop = '10px';
        const fdefs = [{ v: 'all', label: 'Everything due' }, { v: 'today', label: 'Can start today' }, { v: 'refer', label: 'Needs referral' }];
        for (const f of fdefs) {
            const b = el('button', 'pcs-filter', f.label);
            b.type = 'button';
            b.setAttribute('aria-pressed', String(state.filter === f.v));
            b.addEventListener('click', () => { state.filter = f.v; renderOut(); });
            filters.appendChild(b);
        }
        out.appendChild(filters);
        const shown = todo.filter(r => state.filter === 'all' || isPatientStop(r) || (state.filter === 'today' ? startable(r) : r.where === 'refer'));
        if (!left && state.filter === 'all')
            out.appendChild(el('div', 'pcs-empty', 'Every item on this list is marked done.'));
        else if (!shown.some(isTask))
            out.appendChild(el('div', 'pcs-empty', 'Nothing left in this view. Switch back to Everything due.'));
        groups(shown);
        section('pcs-sec-done', '\u2713 Done', doneItems.length);
        if (!doneItems.length)
            out.appendChild(el('div', 'pcs-empty', 'Nothing marked done yet.'));
        groups(doneItems);
        if (rest.length) {
            const d = el('details', 'pcs-more');
            d.appendChild(el('summary', undefined, `Not recommended or evidence unclear (${rest.length})`));
            const inner = el('div', 'pcs-in');
            for (const r of [...rest.filter(i => i.tier === 'avoid'), ...rest.filter(i => i.tier === 'unknown')])
                inner.appendChild(card(r));
            d.appendChild(inner);
            out.appendChild(d);
        }
        const copy = el('button', 'pcs-copy', 'Copy list for the chart or discharge papers');
        copy.type = 'button';
        copy.addEventListener('click', () => {
            const text = summaryText(p, result.recs, result.scopeNote, Object.fromEntries(state.done));
            const copied = (ok) => { copy.textContent = ok ? 'Copied' : 'Copy failed: select and copy by hand'; };
            if (navigator.clipboard?.writeText)
                navigator.clipboard.writeText(text).then(() => copied(true), () => copied(false));
            else
                copied(false);
        });
        out.appendChild(copy);
    };
    const renderPanel = () => {
        panel.textContent = '';
        const rerender = () => { renderPanel(); renderOut(); };
        panel.appendChild(el('div', 'pcs-lab', 'Age and sex'));
        const row = el('div', 'pcs-row');
        const ageWrap = el('div', 'pcs-age');
        const age = el('input');
        age.type = 'number';
        age.min = '0';
        age.max = '120';
        age.setAttribute('inputmode', 'numeric');
        age.setAttribute('aria-label', 'Age in years');
        age.placeholder = 'Age';
        age.value = state.age;
        // Typing must not rebuild the panel (that would drop focus); only the results re-render.
        // A new age returns "Not possible" to the age default. "Could become" and "Pregnant" are kept: dropping either silently would remove pregnancy cautions.
        age.addEventListener('input', () => { state.age = age.value; if (state.preg === 'no')
            state.preg = null; syncPreg(); renderOut(); });
        ageWrap.appendChild(age);
        row.appendChild(ageWrap);
        row.appendChild(seg('Sex', [{ v: 'female', label: 'Female' }, { v: 'male', label: 'Male' }], () => state.sex, v => { state.sex = v; }, rerender));
        panel.appendChild(row);
        panel.appendChild(el('div', 'pcs-hint', 'Screen by the organs the patient has: cervix, breasts, prostate.'));
        const pregHost = el('div');
        panel.appendChild(pregHost);
        const syncPreg = () => {
            pregHost.textContent = '';
            if (state.sex !== 'female')
                return;
            const n = Math.floor(Number(state.age));
            const fallback = Number.isFinite(n) && state.age.trim() ? defaultPreg(n) : 'no';
            pregHost.appendChild(el('div', 'pcs-lab', 'Pregnancy'));
            pregHost.appendChild(seg('Pregnancy', [{ v: 'no', label: 'Not possible' }, { v: 'possible', label: 'Could become' }, { v: 'pregnant', label: 'Pregnant' }], () => state.preg ?? fallback, v => { state.preg = v; }, rerender));
        };
        syncPreg();
        panel.appendChild(el('div', 'pcs-lab', 'Tobacco'));
        panel.appendChild(seg('Tobacco', [{ v: 'never', label: 'Never' }, { v: 'current', label: 'Smokes now' }, { v: 'former', label: 'Quit' }], () => state.tobacco, v => { state.tobacco = v; }, rerender));
        for (const g of PCS_FLAG_GROUPS) {
            const flags = g.flags.filter(f => (!f.sex || f.sex === state.sex) && (!f.tobacco || f.tobacco.includes(state.tobacco)));
            if (!flags.length)
                continue;
            panel.appendChild(el('div', 'pcs-lab', g.label));
            const chips = el('div', 'pcs-chips');
            for (const f of flags) {
                const b = el('button', 'pcs-chip');
                b.type = 'button';
                b.appendChild(document.createTextNode(f.label));
                if (f.hint)
                    b.appendChild(el('small', undefined, f.hint));
                b.setAttribute('aria-pressed', String(state.flags.has(f.id)));
                b.addEventListener('click', () => {
                    if (state.flags.has(f.id))
                        state.flags.delete(f.id);
                    else
                        state.flags.add(f.id);
                    b.setAttribute('aria-pressed', String(state.flags.has(f.id)));
                    renderOut();
                });
                chips.appendChild(b);
            }
            panel.appendChild(chips);
        }
        const reset = el('button', 'pcs-src', 'Clear all');
        reset.type = 'button';
        reset.addEventListener('click', () => {
            state.age = '';
            state.sex = null;
            state.preg = null;
            state.tobacco = 'never';
            state.flags.clear();
            state.filter = 'all';
            state.done.clear();
            rerender();
        });
        panel.appendChild(reset);
    };
    renderPanel();
    renderOut();
}
export const PRIMARY_CARE_SCREENING_CALCULATOR = {
    id: 'primary-care-screening',
    title: 'Primary Care Screening',
    subtitle: 'Age, sex and conditions in. Vaccines, cancer screening, labs and counseling due come out.',
    description: 'For the adult in front of you who has no regular care. Enter age, sex and the conditions that change the answer. Each item shows what to do, why it applies to this patient, the guideline behind it, and whether it can start today or needs a referral. The tool cannot see what has already been done: confirm history before ordering.',
    fields: [], results: [],
    thresholdNote: PCS_FOOTER,
    citations: PCS_CITATIONS,
    customRender: (container) => mountPcs(container),
};
