// MedKitt — Supabase Configuration
// Raw fetch wrapper for PostgREST API. Zero dependencies.
// Security: rate limiting, safe error handling, table allowlist.
const SUPABASE_URL = 'https://kzzqloklnxlqbccxbxgr.supabase.co';
// Public anon key — intentionally client-side. RLS policies enforce read-only access.
// Service role key is NEVER in source — stored in .env (gitignored) for deploy scripts only.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6enFsb2tsbnhscWJjY3hieGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzA4MDMsImV4cCI6MjA4ODA0NjgwM30.lCqD2KymgqQf3h8xUHIht7PeBcmvPVSXxvqsL45Mrko';
// =====================================================================
// Security: Table Allowlist
// =====================================================================
// Only these tables can be queried from the client. Prevents PostgREST
// endpoint probing of system tables or future tables with sensitive data.
const ALLOWED_TABLES = new Set([
    'decision_trees', 'decision_nodes', 'tree_citations',
    'drugs', 'categories', 'category_trees', 'info_pages',
]);
// =====================================================================
// Security: Client-Side Rate Limiter
// =====================================================================
// Prevents runaway loops or abusive scripts from hammering the API.
// 60 requests per 60 seconds (1 req/sec average, burst allowed).
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 60;
const requestTimestamps = [];
function isRateLimited() {
    const now = Date.now();
    // Remove timestamps outside the window
    while (requestTimestamps.length > 0 && requestTimestamps[0] < now - RATE_LIMIT_WINDOW_MS) {
        requestTimestamps.shift();
    }
    if (requestTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
        return true;
    }
    requestTimestamps.push(now);
    return false;
}
/** Sanitize error messages — never expose internal DB details to the UI. */
function safeErrorMessage(status) {
    switch (true) {
        case status === 0: return 'Network unavailable. Using cached data.';
        case status === 401: return 'Authentication error. Please refresh the app.';
        case status === 403: return 'Access denied.';
        case status === 404: return 'Resource not found.';
        case status === 429: return 'Too many requests. Please wait a moment.';
        case status >= 500: return 'Server error. Using cached data.';
        default: return 'Unable to load data. Using cached data.';
    }
}
/** Fetch from Supabase PostgREST. Returns typed data or error.
 *  Security: validates table name, applies rate limiting, sanitizes errors. */
export async function supabaseFetch(table, query = '', options = {}) {
    // Security: reject queries to non-allowlisted tables
    if (!ALLOWED_TABLES.has(table)) {
        console.error(`[Supabase] Blocked query to non-allowlisted table: ${table}`);
        return { data: null, error: 'Invalid request.', status: 403 };
    }
    // Security: client-side rate limiting
    if (isRateLimited()) {
        console.warn('[Supabase] Rate limit exceeded');
        return { data: null, error: 'Too many requests. Please wait a moment.', status: 429 };
    }
    const url = `${SUPABASE_URL}/rest/v1/${table}${query ? '?' + query : ''}`;
    try {
        const res = await fetch(url, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Accept': 'application/json',
            },
            signal: options.signal,
        });
        if (!res.ok) {
            // Log full error server-side for debugging, return safe message to caller
            console.error(`[Supabase] ${table} failed: HTTP ${res.status}`);
            return { data: null, error: safeErrorMessage(res.status), status: res.status };
        }
        const data = await res.json();
        return { data, error: null, status: res.status };
    }
    catch (e) {
        // Network errors — never expose the raw error message
        console.error(`[Supabase] ${table} network error:`, e.message);
        return { data: null, error: safeErrorMessage(0), status: 0 };
    }
}
