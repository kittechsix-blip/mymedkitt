// MedKitt — Supabase Configuration
// Raw fetch wrapper for PostgREST API. Zero dependencies.
const SUPABASE_URL = 'https://kzzqloklnxlqbccxbxgr.supabase.co';
// Public anon key — intentionally client-side. RLS policies enforce read-only access.
// Service role key is NEVER in source — stored in .env (gitignored) for deploy scripts only.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6enFsb2tsbnhscWJjY3hieGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzA4MDMsImV4cCI6MjA4ODA0NjgwM30.lCqD2KymgqQf3h8xUHIht7PeBcmvPVSXxvqsL45Mrko';
/** Fetch from Supabase PostgREST. Returns typed data or error. */
export async function supabaseFetch(table, query = '', options = {}) {
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
            return { data: null, error: `HTTP ${res.status}: ${res.statusText}`, status: res.status };
        }
        const data = await res.json();
        return { data, error: null, status: res.status };
    }
    catch (e) {
        return { data: null, error: e.message, status: 0 };
    }
}
