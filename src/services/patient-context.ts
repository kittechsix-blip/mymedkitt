// MedKitt — Patient Context Service
// Stores patient weight/age across calculators within a session.
// Auto-clears on tab close (sessionStorage), explicit clear button for next patient.

export interface PatientContext {
  weight?: number;      // kg
  age?: number;         // years
  ageUnit?: 'years' | 'months';  // for peds
  sex?: 'male' | 'female';
  updatedAt?: number;   // timestamp of the latest write to any field
  /** Per-field write times, so one fresh field never makes an older one look fresh. */
  stamps?: Partial<Record<ContextKey, number>>;
}

export type ContextKey = 'weight' | 'age' | 'ageUnit' | 'sex';

/** How long an entered value may be offered to the next screen (SAFETY: stale = previous patient). */
export const FRESH_CONTEXT_MS = 30 * 60 * 1000;

type PatientContextListener = (ctx: PatientContext) => void;

const STORAGE_KEY = 'medkitt-patient-context';
const listeners = new Set<PatientContextListener>();

// ---------------------------------------------------------------------------
// Get/Set Context
// ---------------------------------------------------------------------------

export function getPatientContext(): PatientContext {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as PatientContext;
  } catch {
    return {};
  }
}

export function setPatientContext(update: Partial<PatientContext>): void {
  const current = getPatientContext();
  const now = Date.now();
  const stamps: PatientContext['stamps'] = { ...(current.stamps ?? {}) };
  for (const k of Object.keys(update) as (keyof PatientContext)[]) {
    if (k === 'weight' || k === 'age' || k === 'ageUnit' || k === 'sex') stamps[k] = now;
  }
  const next: PatientContext = {
    ...current,
    ...update,
    updatedAt: now,
    stamps,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  notifyListeners(next);
}

/** Clear one field (e.g. the user dismissed an auto-filled weight), or everything. */
export function clearPatientContext(key?: ContextKey): void {
  if (key === undefined) {
    sessionStorage.removeItem(STORAGE_KEY);
    notifyListeners({});
    return;
  }
  const current = getPatientContext();
  delete current[key];
  if (current.stamps) delete current.stamps[key];
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  notifyListeners(current);
}

/** When a field was last entered (falls back to updatedAt for contexts saved before stamps). */
export function getContextFieldTime(key: ContextKey): number | undefined {
  const ctx = getPatientContext();
  return ctx.stamps?.[key] ?? ctx.updatedAt;
}

/**
 * The context, but only fields entered within `maxAgeMs`; older fields are dropped and a
 * fully stale (or timestamp-less) context returns {}. Use this, never getPatientContext(),
 * for anything that pre-fills or offers a value for the NEXT clinical decision.
 */
export function getFreshPatientContext(maxAgeMs: number = FRESH_CONTEXT_MS): PatientContext {
  const ctx = getPatientContext();
  const now = Date.now();
  const fresh = (t: number | undefined): boolean =>
    typeof t === 'number' && t <= now + 60_000 && now - t <= maxAgeMs;
  if (!fresh(ctx.updatedAt)) return {};
  const out: PatientContext = { updatedAt: ctx.updatedAt, stamps: {} };
  for (const k of ['weight', 'age', 'ageUnit', 'sex'] as ContextKey[]) {
    const t = ctx.stamps?.[k] ?? ctx.updatedAt;
    if (ctx[k] !== undefined && fresh(t)) {
      (out as unknown as Record<string, unknown>)[k] = ctx[k];
      out.stamps![k] = t;
    }
  }
  return out;
}

/** "just now", "4 min ago", "1 h ago" */
export function formatAgo(timestamp: number, now: number = Date.now()): string {
  const min = Math.floor(Math.max(0, now - timestamp) / 60_000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  return `${Math.floor(min / 60)} h ago`;
}

// ---------------------------------------------------------------------------
// Subscriptions
// ---------------------------------------------------------------------------

export function subscribeToPatientContext(listener: PatientContextListener): () => void {
  listeners.add(listener);
  // Immediately fire with current value
  listener(getPatientContext());
  return () => listeners.delete(listener);
}

function notifyListeners(ctx: PatientContext): void {
  listeners.forEach(fn => fn(ctx));
}

// ---------------------------------------------------------------------------
// Helper: Format display string
// ---------------------------------------------------------------------------

export function formatPatientContext(ctx: PatientContext): string {
  const parts: string[] = [];

  if (ctx.weight && ctx.weight > 0) {
    parts.push(`${ctx.weight} kg`);
  }

  if (ctx.age !== undefined && ctx.age >= 0) {
    if (ctx.ageUnit === 'months') {
      parts.push(`${ctx.age} mo`);
    } else if (ctx.age < 2) {
      parts.push(`${ctx.age} yr`);
    } else {
      parts.push(`${ctx.age} yr`);
    }
  }

  if (ctx.sex) {
    parts.push(ctx.sex === 'male' ? 'M' : 'F');
  }

  return parts.join(' · ') || 'No patient data';
}
