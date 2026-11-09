// MedKitt — Patient Context Service
// Stores patient weight/age across calculators within a session.
// Auto-clears on tab close (sessionStorage), explicit clear button for next patient.
/** How long an entered value may be offered to the next screen (SAFETY: stale = previous patient). */
export const FRESH_CONTEXT_MS = 30 * 60 * 1000;
const STORAGE_KEY = 'medkitt-patient-context';
const listeners = new Set();
// ---------------------------------------------------------------------------
// Get/Set Context
// ---------------------------------------------------------------------------
export function getPatientContext() {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw)
            return {};
        return JSON.parse(raw);
    }
    catch {
        return {};
    }
}
export function setPatientContext(update) {
    const current = getPatientContext();
    const now = Date.now();
    const stamps = { ...(current.stamps ?? {}) };
    for (const k of Object.keys(update)) {
        if (k === 'weight' || k === 'age' || k === 'ageUnit' || k === 'sex')
            stamps[k] = now;
    }
    const next = {
        ...current,
        ...update,
        updatedAt: now,
        stamps,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    notifyListeners(next);
}
/** Clear one field (e.g. the user dismissed an auto-filled weight), or everything. */
export function clearPatientContext(key) {
    if (key === undefined) {
        sessionStorage.removeItem(STORAGE_KEY);
        notifyListeners({});
        return;
    }
    const current = getPatientContext();
    delete current[key];
    if (current.stamps)
        delete current.stamps[key];
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    notifyListeners(current);
}
/** When a field was last entered (falls back to updatedAt for contexts saved before stamps). */
export function getContextFieldTime(key) {
    const ctx = getPatientContext();
    // A context that has stamps is authoritative per field: a field without its own stamp was
    // entered before stamps existed and must NOT inherit a newer updatedAt from another field.
    return ctx.stamps ? ctx.stamps[key] : ctx.updatedAt;
}
/**
 * The context, but only fields entered within `maxAgeMs`; older fields are dropped and a
 * fully stale (or timestamp-less) context returns {}. Use this, never getPatientContext(),
 * for anything that pre-fills or offers a value for the NEXT clinical decision.
 */
export function getFreshPatientContext(maxAgeMs = FRESH_CONTEXT_MS) {
    const ctx = getPatientContext();
    const now = Date.now();
    const fresh = (t) => typeof t === 'number' && t <= now + 60000 && now - t <= maxAgeMs;
    if (!fresh(ctx.updatedAt))
        return {};
    const out = { updatedAt: ctx.updatedAt, stamps: {} };
    for (const k of ['weight', 'age', 'ageUnit', 'sex']) {
        const t = ctx.stamps ? ctx.stamps[k] : ctx.updatedAt;
        if (ctx[k] !== undefined && fresh(t)) {
            out[k] = ctx[k];
            out.stamps[k] = t;
        }
    }
    return out;
}
/** Clock time a value was entered, e.g. "2:32 PM". A fixed time cannot go stale on a screen
 *  that stays open, unlike "4 min ago". */
export function formatEnteredTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}
// ---------------------------------------------------------------------------
// Subscriptions
// ---------------------------------------------------------------------------
export function subscribeToPatientContext(listener) {
    listeners.add(listener);
    // Immediately fire with current value
    listener(getPatientContext());
    return () => listeners.delete(listener);
}
function notifyListeners(ctx) {
    listeners.forEach(fn => fn(ctx));
}
// ---------------------------------------------------------------------------
// Helper: Format display string
// ---------------------------------------------------------------------------
export function formatPatientContext(ctx) {
    const parts = [];
    if (ctx.weight && ctx.weight > 0) {
        parts.push(`${ctx.weight} kg`);
    }
    if (ctx.age !== undefined && ctx.age >= 0) {
        if (ctx.ageUnit === 'months') {
            parts.push(`${ctx.age} mo`);
        }
        else if (ctx.age < 2) {
            parts.push(`${ctx.age} yr`);
        }
        else {
            parts.push(`${ctx.age} yr`);
        }
    }
    if (ctx.sex) {
        parts.push(ctx.sex === 'male' ? 'M' : 'F');
    }
    return parts.join(' · ') || 'No patient data';
}
