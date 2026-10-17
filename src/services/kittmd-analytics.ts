// MedKitt — KittMD Analytics Service
// Lightweight usage pattern tracking for clinical practice intelligence.
// NO patient data - only usage patterns (consults, nodes, calculators, drugs).

import { storageGet, storageSet } from './storage.js';
import { DATA_VERSION } from './cache-db.js';
import { createTelemetry, type TelemetryEvent } from './telemetry.js';

// Data Dog sink: the same events also go to the shared, insert-only Supabase
// table (ids and small enums only; see telemetry.ts). localStorage is unchanged.
const sink = createTelemetry({
  app: 'mymedkitt',
  appVersion: String(DATA_VERSION),
  platform: 'web',
  url: 'https://kzzqloklnxlqbccxbxgr.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6enFsb2tsbnhscWJjY3hieGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzA4MDMsImV4cCI6MjA4ODA0NjgwM30.lCqD2KymgqQf3h8xUHIht7PeBcmvPVSXxvqsL45Mrko',
});

let sinkCalc: { id: string; openedAt: number } | null = null;

/** Forward one Data Dog event (ids and enums only; free text is dropped by the client). */
export function sinkTrack(event: TelemetryEvent, f: { screen_id?: string; feature_id?: string; props?: Record<string, unknown> } = {}): void {
  sink.track(event, f);
}

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

export type AnalyticsEventType =
  | 'session_start'
  | 'session_end'
  | 'consult_open'
  | 'node_visit'
  | 'calc_open'
  | 'calc_submit'
  | 'drug_view';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  timestamp: number;
  data: Record<string, unknown>;
}

interface SessionData {
  sessionId: string;
  startTime: number;
  currentConsultId: string | null;
  currentNodeId: string | null;
  lastNodeTime: number;
  nodePath: string[];
}

// -------------------------------------------------------------------
// Constants
// -------------------------------------------------------------------

const EVENTS_KEY = 'kittmd_events';
const SESSION_KEY = 'kittmd_session';
const MAX_EVENTS = 5000; // Cap storage to prevent bloat

// -------------------------------------------------------------------
// State
// -------------------------------------------------------------------

let session: SessionData | null = null;

// -------------------------------------------------------------------
// Session Management
// -------------------------------------------------------------------

/** Generate a simple session ID */
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Start a new analytics session */
export function startSession(): void {
  // End any existing session first
  if (session) {
    endSession();
  }

  session = {
    sessionId: generateSessionId(),
    startTime: Date.now(),
    currentConsultId: null,
    currentNodeId: null,
    lastNodeTime: Date.now(),
    nodePath: [],
  };

  storageSet(SESSION_KEY, session);

  logEvent('session_start', {
    sessionId: session.sessionId,
  });
}

/** End the current session */
export function endSession(): void {
  if (!session) return;

  const duration = Date.now() - session.startTime;

  logEvent('session_end', {
    sessionId: session.sessionId,
    durationMs: duration,
    totalNodes: session.nodePath.length,
  });

  session = null;
  storageSet(SESSION_KEY, null);
}

/** Restore session from storage (on page reload) */
export function restoreSession(): boolean {
  const saved = storageGet<SessionData | null>(SESSION_KEY, null);
  if (!saved) return false;

  // If session is older than 30 minutes, start fresh
  const thirtyMinutes = 30 * 60 * 1000;
  if (Date.now() - saved.startTime > thirtyMinutes) {
    endSession();
    return false;
  }

  session = saved;
  return true;
}

/** Ensure session exists (auto-start if needed) */
function ensureSession(): void {
  if (!session) {
    if (!restoreSession()) {
      startSession();
    }
  }
}

// -------------------------------------------------------------------
// Event Logging
// -------------------------------------------------------------------

/** Log an analytics event */
function logEvent(type: AnalyticsEventType, data: Record<string, unknown>): void {
  const event: AnalyticsEvent = {
    type,
    timestamp: Date.now(),
    data,
  };

  const events = getEvents();
  events.push(event);

  // Trim to max events (FIFO)
  if (events.length > MAX_EVENTS) {
    events.splice(0, events.length - MAX_EVENTS);
  }

  storageSet(EVENTS_KEY, events);
}

/** Get all stored events */
export function getEvents(): AnalyticsEvent[] {
  return storageGet<AnalyticsEvent[]>(EVENTS_KEY, []);
}

/** Clear all events */
export function clearEvents(): void {
  storageSet(EVENTS_KEY, []);
}

// -------------------------------------------------------------------
// Consult Events
// -------------------------------------------------------------------

/** Track consult opened */
export function trackConsultOpen(consultId: string): void {
  ensureSession();
  if (!session) return;

  // If switching consults, reset node tracking
  if (session.currentConsultId !== consultId) {
    session.nodePath = [];
  }

  session.currentConsultId = consultId;
  session.currentNodeId = null;
  session.lastNodeTime = Date.now();
  storageSet(SESSION_KEY, session);

  sink.track('feature_open', { feature_id: `consult:${consultId}`, props: { kind: 'consult' } });
  logEvent('consult_open', {
    sessionId: session.sessionId,
    consultId,
  });
}

/** Track node visited */
export function trackNodeVisit(
  consultId: string,
  nodeId: string,
  node?: { type?: string; next?: string; options?: unknown[] },
): void {
  ensureSession();
  if (!session) return;

  // A consult is finished when it reaches a result card (or an info card with
  // nowhere left to go); the node id records which branch it ended on.
  if (node && (node.type === 'result' || (node.type === 'info' && !node.next && !node.options?.length))) {
    sink.track('feature_complete', { feature_id: `consult:${consultId}`, props: { kind: 'consult' } });
    sink.track('outcome', { feature_id: `consult:${consultId}`, props: { flow_id: consultId, outcome: nodeId.toLowerCase().slice(0, 48) } });
  }

  const now = Date.now();
  const timeOnPrevious = session.currentNodeId
    ? now - session.lastNodeTime
    : 0;

  // Track path
  session.nodePath.push(nodeId);
  session.currentNodeId = nodeId;
  session.lastNodeTime = now;
  storageSet(SESSION_KEY, session);

  logEvent('node_visit', {
    sessionId: session.sessionId,
    consultId,
    nodeId,
    timeOnPreviousMs: timeOnPrevious,
    pathIndex: session.nodePath.length - 1,
  });
}

/** Get current consult path (for summary on consult end) */
export function getCurrentPath(): string[] {
  return session?.nodePath ?? [];
}

// -------------------------------------------------------------------
// Calculator Events
// -------------------------------------------------------------------

/** Track calculator opened */
export function trackCalcOpen(calcId: string, fromConsultId?: string): void {
  ensureSession();
  if (!session) return;

  sink.track('feature_open', { feature_id: `calc:${calcId}`, props: { kind: 'calculator' } });
  sinkCalc = { id: calcId, openedAt: Date.now() };
  logEvent('calc_open', {
    sessionId: session.sessionId,
    calcId,
    fromConsultId: fromConsultId ?? null,
  });
}

/** Track calculator submission (result viewed) */
export function trackCalcSubmit(
  calcId: string,
  fieldStructure: string[], // Field names only, no values
  resultLabel?: string,
): void {
  ensureSession();
  if (!session) return;

  // The score also renders once on open; only a later update means the user used it.
  if (sinkCalc?.id === calcId && Date.now() - sinkCalc.openedAt > 500) {
    sink.track('feature_complete', { feature_id: `calc:${calcId}`, props: { kind: 'calculator' } });
    sinkCalc = null;
  }
  logEvent('calc_submit', {
    sessionId: session.sessionId,
    calcId,
    fields: fieldStructure,
    resultLabel: resultLabel ?? null,
  });
}

// -------------------------------------------------------------------
// Drug Events
// -------------------------------------------------------------------

/** Track drug card viewed */
export function trackDrugView(drugName: string, fromConsultId?: string, drugId?: string): void {
  ensureSession();
  if (!session) return;

  if (drugId) sink.track('feature_open', { feature_id: `drug:${drugId}`, props: { kind: 'drug' } });

  logEvent('drug_view', {
    sessionId: session.sessionId,
    drugName,
    fromConsultId: fromConsultId ?? session.currentConsultId ?? null,
  });
}

// -------------------------------------------------------------------
// Export for KittMD
// -------------------------------------------------------------------

/** Export all events as JSON string */
export function exportEvents(): string {
  return JSON.stringify(getEvents(), null, 2);
}

/** Export events as downloadable file */
export function downloadEventsFile(): void {
  const data = exportEvents();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kittmd-analytics-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Get analytics summary for KittMD */
export function getAnalyticsSummary(): {
  totalEvents: number;
  totalSessions: number;
  uniqueConsults: Set<string>;
  uniqueCalculators: Set<string>;
  uniqueDrugs: Set<string>;
  eventsByType: Record<AnalyticsEventType, number>;
} {
  const events = getEvents();
  const summary = {
    totalEvents: events.length,
    totalSessions: 0,
    uniqueConsults: new Set<string>(),
    uniqueCalculators: new Set<string>(),
    uniqueDrugs: new Set<string>(),
    eventsByType: {
      session_start: 0,
      session_end: 0,
      consult_open: 0,
      node_visit: 0,
      calc_open: 0,
      calc_submit: 0,
      drug_view: 0,
    } as Record<AnalyticsEventType, number>,
  };

  for (const event of events) {
    summary.eventsByType[event.type]++;

    if (event.type === 'session_start') {
      summary.totalSessions++;
    } else if (event.type === 'consult_open') {
      const consultId = event.data.consultId as string;
      if (consultId) summary.uniqueConsults.add(consultId);
    } else if (event.type === 'calc_open') {
      const calcId = event.data.calcId as string;
      if (calcId) summary.uniqueCalculators.add(calcId);
    } else if (event.type === 'drug_view') {
      const drugName = event.data.drugName as string;
      if (drugName) summary.uniqueDrugs.add(drugName);
    }
  }

  return summary;
}

// -------------------------------------------------------------------
// Rollout telemetry (R13 / Phase 1.7) — console-only sink for v1
// -------------------------------------------------------------------
//
// Andy decision 2026-05-22: no remote sink in v1. Events emit to the browser
// console with a `[telemetry]` prefix so Safari Web Inspector catches them during
// the headache-hub canary soak. Full rationale + v2 path in:
//   ~/Desktop/claude-brain/decisions/2026-05-22-headache-hub-phase-0a-gates.md
//
// PRIVACY FLOOR (strict): tree-ids, node-ids, calculator-ids, version strings only.
// No node body text. No drug names beyond canonical IDs. No user inputs. No patient
// context. If a new event type is added, audit the payload against this floor first.
//
// TODO(v2): swap the console.warn body for a remote POST without changing the call
// surface — keep `logTelemetry(type, data)` callable identically.

export type TelemetryEventType =
  | 'tree_load_source'        // { tree_id, source: 'supabase' | 'indexeddb' | 'hardcoded' }
  | 'tree_load_error'         // { tree_id, error_type, message }
  | 'link_resolution_error'   // { link_type, link_target, source_tree_id, source_node_id }
  | 'route_action_error'      // { target_tree_id, error }
  | 'route_action_disabled'   // { target_tree_id } — kill-switch hit, no error
  | 'calculator_error'        // { calculator_id, error }
  | 'sw_version'              // { cache_name } — once per session at boot
  | 'data_version'            // { data_version } — once per session at boot
  | 'hub_module_view';        // { hub_id, module_index }

/**
 * Emit a rollout telemetry event. v1 sink is `console.warn` with a `[telemetry]`
 * prefix; v2 will swap the body for a remote POST without changing this signature.
 */
const SINK_ERROR_KINDS: Record<string, string> = {
  tree_load_error: 'tree_load',
  link_resolution_error: 'link',
  route_action_error: 'route_action',
  calculator_error: 'calculator',
};

export function logTelemetry(
  type: TelemetryEventType | string,
  data: Record<string, unknown> = {},
): void {
  // Data Dog gets the error KIND only — never the message, target or ids in `data`.
  const kind = SINK_ERROR_KINDS[type];
  if (kind) sink.track('error', { screen_id: location.hash.slice(1), props: { kind } });
  if (typeof console === 'undefined') return;
  console.warn(`[telemetry] ${type}`, data);
}

// -------------------------------------------------------------------
// Auto-initialize on module load
// -------------------------------------------------------------------

// Try to restore existing session, or start new one
if (typeof window !== 'undefined') {
  // Listen for page unload to end session
  window.addEventListener('beforeunload', () => {
    endSession();
  });

  // Listen for visibility changes (tab switch = potential session end)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      // Save session state but don't end it
      if (session) {
        storageSet(SESSION_KEY, session);
      }
    } else if (document.visibilityState === 'visible') {
      // Restore or start session when tab becomes visible
      if (!session) {
        if (!restoreSession()) {
          startSession();
        }
      }
    }
  });

  window.addEventListener('error', () => sink.track('error', { screen_id: location.hash.slice(1), props: { kind: 'js' } }));
  window.addEventListener('unhandledrejection', () => sink.track('error', { screen_id: location.hash.slice(1), props: { kind: 'promise' } }));
  if (!navigator.onLine) sink.track('offline', { screen_id: 'start' });

  // Auto-start session
  if (!restoreSession()) {
    startSession();
  }
}
