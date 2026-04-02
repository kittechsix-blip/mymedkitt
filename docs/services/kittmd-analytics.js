// MedKitt — KittMD Analytics Service
// Lightweight usage pattern tracking for clinical practice intelligence.
// NO patient data - only usage patterns (consults, nodes, calculators, drugs).
import { storageGet, storageSet } from './storage.js';
// -------------------------------------------------------------------
// Constants
// -------------------------------------------------------------------
const EVENTS_KEY = 'kittmd_events';
const SESSION_KEY = 'kittmd_session';
const MAX_EVENTS = 5000; // Cap storage to prevent bloat
// -------------------------------------------------------------------
// State
// -------------------------------------------------------------------
let session = null;
// -------------------------------------------------------------------
// Session Management
// -------------------------------------------------------------------
/** Generate a simple session ID */
function generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
/** Start a new analytics session */
export function startSession() {
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
export function endSession() {
    if (!session)
        return;
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
export function restoreSession() {
    const saved = storageGet(SESSION_KEY, null);
    if (!saved)
        return false;
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
function ensureSession() {
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
function logEvent(type, data) {
    const event = {
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
export function getEvents() {
    return storageGet(EVENTS_KEY, []);
}
/** Clear all events */
export function clearEvents() {
    storageSet(EVENTS_KEY, []);
}
// -------------------------------------------------------------------
// Consult Events
// -------------------------------------------------------------------
/** Track consult opened */
export function trackConsultOpen(consultId) {
    ensureSession();
    if (!session)
        return;
    // If switching consults, reset node tracking
    if (session.currentConsultId !== consultId) {
        session.nodePath = [];
    }
    session.currentConsultId = consultId;
    session.currentNodeId = null;
    session.lastNodeTime = Date.now();
    storageSet(SESSION_KEY, session);
    logEvent('consult_open', {
        sessionId: session.sessionId,
        consultId,
    });
}
/** Track node visited */
export function trackNodeVisit(consultId, nodeId) {
    ensureSession();
    if (!session)
        return;
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
export function getCurrentPath() {
    return session?.nodePath ?? [];
}
// -------------------------------------------------------------------
// Calculator Events
// -------------------------------------------------------------------
/** Track calculator opened */
export function trackCalcOpen(calcId, fromConsultId) {
    ensureSession();
    if (!session)
        return;
    logEvent('calc_open', {
        sessionId: session.sessionId,
        calcId,
        fromConsultId: fromConsultId ?? null,
    });
}
/** Track calculator submission (result viewed) */
export function trackCalcSubmit(calcId, fieldStructure, // Field names only, no values
resultLabel) {
    ensureSession();
    if (!session)
        return;
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
export function trackDrugView(drugName, fromConsultId) {
    ensureSession();
    if (!session)
        return;
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
export function exportEvents() {
    return JSON.stringify(getEvents(), null, 2);
}
/** Export events as downloadable file */
export function downloadEventsFile() {
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
export function getAnalyticsSummary() {
    const events = getEvents();
    const summary = {
        totalEvents: events.length,
        totalSessions: 0,
        uniqueConsults: new Set(),
        uniqueCalculators: new Set(),
        uniqueDrugs: new Set(),
        eventsByType: {
            session_start: 0,
            session_end: 0,
            consult_open: 0,
            node_visit: 0,
            calc_open: 0,
            calc_submit: 0,
            drug_view: 0,
        },
    };
    for (const event of events) {
        summary.eventsByType[event.type]++;
        if (event.type === 'session_start') {
            summary.totalSessions++;
        }
        else if (event.type === 'consult_open') {
            const consultId = event.data.consultId;
            if (consultId)
                summary.uniqueConsults.add(consultId);
        }
        else if (event.type === 'calc_open') {
            const calcId = event.data.calcId;
            if (calcId)
                summary.uniqueCalculators.add(calcId);
        }
        else if (event.type === 'drug_view') {
            const drugName = event.data.drugName;
            if (drugName)
                summary.uniqueDrugs.add(drugName);
        }
    }
    return summary;
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
        }
        else if (document.visibilityState === 'visible') {
            // Restore or start session when tab becomes visible
            if (!session) {
                if (!restoreSession()) {
                    startSession();
                }
            }
        }
    });
    // Auto-start session
    if (!restoreSession()) {
        startSession();
    }
}
