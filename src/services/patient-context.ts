// MedKitt — Patient Context Service
// Stores patient weight/age across calculators within a session.
// Auto-clears on tab close (sessionStorage), explicit clear button for next patient.

export interface PatientContext {
  weight?: number;      // kg
  age?: number;         // years
  ageUnit?: 'years' | 'months';  // for peds
  sex?: 'male' | 'female';
  updatedAt?: number;   // timestamp
}

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
  const next: PatientContext = {
    ...current,
    ...update,
    updatedAt: Date.now(),
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  notifyListeners(next);
}

export function clearPatientContext(): void {
  sessionStorage.removeItem(STORAGE_KEY);
  notifyListeners({});
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
