// Data Dog telemetry client — one copy per app, identical code (source of truth:
// kittech-daily-news/docs/datadog/telemetry.ts). No dependencies.
// Sends ONLY: event name, route/content ids, small enums, app version, platform,
// a random install id and a random session id. Never text the user typed, never
// form values, error messages, names or patient data. Fails silently, never
// blocks the UI, sends nothing on localhost/dev, honours Do Not Track and the
// local opt-out flag (localStorage 'kt_telemetry_optout' = '1').
// Decision: claude-brain/decisions/2026-10-16-data-dog-telemetry.md
const EVENTS = new Set(['session_start', 'screen_view', 'feature_open', 'feature_complete', 'search',
    'search_select', 'outcome', 'error', 'not_found', 'slow_render', 'offline']);
// Per-event prop allowlist; a value is an id-like string, or one of the listed enums.
const ENUMS = {
    surface: null, flow_id: null, outcome: null, kind: null,
    result_bucket: ['0', '1-3', '4-10', '11+'],
    rank_bucket: ['1', '2-3', '4-10', '11+'],
    ms_bucket: ['1-3s', '3-10s', '10s+'],
    display: ['standalone', 'browser'],
};
const PROPS = {
    session_start: ['display'], search: ['surface', 'result_bucket'], search_select: ['surface', 'rank_bucket'],
    outcome: ['flow_id', 'outcome'], error: ['kind'], not_found: ['kind'], slow_render: ['ms_bucket'],
    feature_open: ['kind'], feature_complete: ['kind'],
};
const ID_RE = /^[a-z0-9][a-z0-9_.:/-]{0,79}$/;
const VAL_RE = /^[a-z0-9][a-z0-9_.:/-]{0,47}$/;
const IDLE_MS = 30 * 60 * 1000;
const MAX_QUEUE = 50;
export const resultBucket = (n) => (n <= 0 ? '0' : n <= 3 ? '1-3' : n <= 10 ? '4-10' : '11+');
export const rankBucket = (r) => (r <= 1 ? '1' : r <= 3 ? '2-3' : r <= 10 ? '4-10' : '11+');
export const msBucket = (ms) => (ms < 3000 ? '1-3s' : ms < 10000 ? '3-10s' : '10s+');
/** Route/content id: lowercase, query and hash stripped, unsafe characters dropped. '' if unusable. */
export function cleanId(v) {
    if (typeof v !== 'string')
        return '';
    const s = v.split(/[?#]/)[0].toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9_.:/-]/g, '-').slice(0, 80);
    return ID_RE.test(s) ? s : '';
}
export function uuid() {
    const b = new Uint8Array(16);
    crypto.getRandomValues(b);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}
function ls() { try {
    return globalThis.localStorage ?? null;
}
catch {
    return null;
} }
export function telemetryAllowed() {
    try {
        const loc = globalThis.location;
        if (!loc)
            return false;
        // Capacitor iOS serves from capacitor://localhost: that is production, not dev.
        const dev = /^https?:$/.test(loc.protocol) && /^(localhost|127\.|0\.0\.0\.0|\[?::1\]?$)|\.local$/.test(loc.hostname);
        if (dev || loc.protocol === 'file:')
            return false;
        const nav = globalThis.navigator;
        if (nav?.doNotTrack === '1' || globalThis.doNotTrack === '1' || nav?.globalPrivacyControl === true)
            return false;
        return ls()?.getItem('kt_telemetry_optout') !== '1';
    }
    catch {
        return false;
    }
}
export function createTelemetry(o) {
    const on = o.enabled ?? telemetryAllowed();
    const now = o.now ?? Date.now;
    const queue = [];
    const version = cleanId(o.appVersion).replace(/[:/]/g, '-').slice(0, 24) || null;
    let installId = '';
    let sessionId = '';
    let lastAt = 0;
    function ids() {
        const st = ls();
        if (!installId) {
            installId = st?.getItem('kt_tid') || '';
            if (!/^[0-9a-f-]{36}$/.test(installId)) {
                installId = uuid();
                st?.setItem('kt_tid', installId);
            }
            sessionId = st?.getItem('kt_sid') || '';
            lastAt = Number(st?.getItem('kt_sid_at')) || 0;
        }
        const t = now();
        const fresh = !sessionId || t - lastAt > IDLE_MS;
        if (fresh)
            sessionId = uuid();
        lastAt = t;
        st?.setItem('kt_sid', sessionId);
        st?.setItem('kt_sid_at', String(t));
        return fresh;
    }
    function cleanProps(event, p = {}) {
        const out = {};
        for (const k of PROPS[event] || []) {
            const v = typeof p[k] === 'string' ? p[k] : '';
            const allowed = ENUMS[k];
            if (allowed ? allowed.includes(v) : VAL_RE.test(v))
                out[k] = v;
        }
        return out;
    }
    function push(event, f) {
        queue.push({
            ts: new Date(now()).toISOString(), app: o.app, event,
            screen_id: cleanId(f.screen_id) || null, feature_id: cleanId(f.feature_id) || null,
            install_id: installId, session_id: sessionId, app_version: version, platform: o.platform,
            props: cleanProps(event, f.props),
        });
        if (queue.length > MAX_QUEUE)
            queue.shift();
    }
    function flush() {
        if (!on || !queue.length)
            return;
        const body = JSON.stringify(queue.splice(0, queue.length));
        try {
            (o.fetchImpl ?? fetch)(`${o.url}/rest/v1/app_events`, {
                method: 'POST', keepalive: true, body,
                headers: { apikey: o.anonKey, Authorization: `Bearer ${o.anonKey}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
            }).catch(() => { });
        }
        catch { /* never surface */ }
    }
    function track(event, f = {}) {
        if (!on || !EVENTS.has(event))
            return;
        try {
            if (ids() && event !== 'session_start') {
                const standalone = globalThis.matchMedia?.('(display-mode: standalone)').matches;
                push('session_start', { props: { display: standalone ? 'standalone' : 'browser' } });
            }
            push(event, f);
            if (queue.length >= 20)
                flush();
        }
        catch { /* never surface */ }
    }
    if (on && globalThis.document) {
        try {
            document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden')
                flush(); });
            globalThis.addEventListener?.('pagehide', flush);
            globalThis.addEventListener?.('offline', () => track('offline'));
            const timer = setInterval(flush, 30000);
            timer.unref?.();
        }
        catch { /* no DOM */ }
    }
    return { track, flush, enabled: on, _queue: queue };
}
