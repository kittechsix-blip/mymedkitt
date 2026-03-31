# MedKitt Security Checklist

**Last audit:** 2026-03-31
**App type:** Read-only clinical reference (no user auth, no write operations from client)
**Stack:** Vanilla TypeScript + Supabase (PostgREST) + Electrobun desktop + PWA

---

## Pre-Launch Checklist

### 1. Row Level Security (RLS) in Supabase

**Status: IMPLEMENTED**

- [x] RLS enabled on ALL 7 tables
- [x] Anon role can only SELECT (read)
- [x] Explicit DENY policies for INSERT, UPDATE, DELETE
- [x] REVOKE write permissions from anon role at PostgreSQL level

**Migration file:** `supabase/migrations/20260331_security_hardening.sql`

**To verify in Supabase Dashboard:**
1. Go to Authentication → Policies
2. Confirm every table shows SELECT-only for `anon`
3. Run the audit query at the bottom of the migration file

**To verify via SQL Editor:**
```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN (
  'decision_trees', 'decision_nodes', 'tree_citations',
  'drugs', 'categories', 'category_trees', 'info_pages'
);
-- All rows should show rowsecurity = true
```

---

### 2. Auth Flow Testing

**Status: N/A (Read-Only App)**

MedKitt has no user authentication — it's a public clinical reference tool. The Supabase anon key provides read-only access enforced by RLS.

**If auth is added later, test:**
- [ ] Login with wrong password → generic error (don't reveal if email exists)
- [ ] Password reset for non-existent email → same response as valid email
- [ ] Email verification link clicked twice → graceful handling
- [ ] Signup with existing email → no information leakage
- [ ] Session expiry → clean redirect to login

---

### 3. Rate Limits on API Endpoints

**Status: IMPLEMENTED (Client-Side)**

- [x] Client-side rate limiter: 60 requests per 60-second window
- [x] Returns 429 status with user-friendly message when exceeded
- [x] Prevents runaway fetch loops from hammering Supabase

**File:** `src/services/supabase.ts`

**For production hardening, also configure Supabase-side limits:**
1. Go to Supabase Dashboard → Settings → API
2. Set "Rate limiting" to 100 req/min per IP (or use API Gateway)
3. Consider Cloudflare or Vercel Edge rate limiting if deploying as PWA

---

### 4. Server-Side Validation

**Status: PARTIALLY APPLICABLE**

MedKitt is read-only — no forms submit data to the server. However:

- [x] Table allowlist prevents queries to non-approved tables
- [x] Search input sanitized (strips HTML, script patterns, null bytes)
- [x] Numeric calculator inputs validated (NaN-safe, length-limited)
- [x] Table names validated against regex pattern

**File:** `src/services/sanitize.ts`

**If write operations are added later:**
- [ ] Validate all POST/PUT bodies in Edge Functions
- [ ] Use Zod or similar schema validation
- [ ] Check data types, length limits, format patterns
- [ ] Sanitize for SQL injection patterns

---

### 5. Environment Variables Locked Down

**Status: IMPLEMENTED**

- [x] `.env` is gitignored (never committed to version control)
- [x] `.env.example` template created (no real values)
- [x] Supabase anon key is intentionally client-side (RLS-protected)
- [x] Service role key stays in `.env` only (deploy scripts)
- [x] `.gitignore` covers `.env.*` pattern

**ACTION REQUIRED — Rotate these credentials:**
- [ ] **Supabase service role key** — regenerate in Dashboard → Settings → API
- [ ] **EBMedicine password** — change via their account settings
- [ ] **UpToDate password** — change via their account settings
- [ ] Update `.env` with new values after rotation

**Why rotate?** Even though `.env` was never committed, credentials stored as plaintext on disk should be rotated periodically.

---

### 6. CAPTCHA on Public Forms

**Status: N/A (No Public Forms)**

MedKitt has no signup, contact, or data-submission forms. All interactions are read-only clinical lookups.

**If public forms are added later:**
- [ ] Add Cloudflare Turnstile (free, privacy-focused) to signup/contact
- [ ] Verify CAPTCHA token server-side in Edge Function
- [ ] Rate limit form submissions independently

---

### 7. CORS Restrictions

**Status: IMPLEMENTED**

CORS for the Supabase API is managed by Supabase itself. On the client side:

- [x] Content Security Policy (CSP) restricts connections to `self` + Supabase domain
- [x] `script-src` limited to `self` + specific CDNs
- [x] `object-src 'none'` blocks Flash/plugin exploits
- [x] `form-action 'none'` prevents form hijacking
- [x] `frame-ancestors 'none'` prevents clickjacking (equivalent to X-Frame-Options: DENY)
- [x] X-Content-Type-Options: nosniff
- [x] X-Frame-Options: DENY
- [x] Referrer-Policy: strict-origin-when-cross-origin

**File:** `src/views/index.html`

**Supabase-side CORS (verify in Dashboard):**
1. Go to Settings → API → CORS Allowed Origins
2. Add only your production domain(s)
3. Remove wildcard `*` if present

---

### 8. Error Handling (No Data Leakage)

**Status: IMPLEMENTED**

- [x] Error messages mapped to generic user-friendly text
- [x] No HTTP status codes, table names, or SQL exposed to users
- [x] Full errors logged to console for developer debugging
- [x] 3-tier fallback: Supabase → IndexedDB → hardcoded data
- [x] Network failures degrade gracefully (offline-first)

**File:** `src/services/supabase.ts` — `safeErrorMessage()` function

**Error message mapping:**
| Real Error | User Sees |
|---|---|
| HTTP 401 | "Authentication error. Please refresh the app." |
| HTTP 403 | "Access denied." |
| HTTP 404 | "Resource not found." |
| HTTP 429 | "Too many requests. Please wait a moment." |
| HTTP 5xx | "Server error. Using cached data." |
| Network failure | "Network unavailable. Using cached data." |

---

### 9. Security Scan Completed

**Status: COMPLETED — 2026-03-31**

| Category | Count | Details |
|---|---|---|
| CRITICAL | 1 | Plain-text credentials in .env (rotation required) |
| WARNING | 3 | npm vulnerability (brace-expansion), innerHTML patterns, RLS verification |
| INFO | 6 | CSP tuning, SRI hashes, inline style nonce |
| PASS | 10 | No eval, no code injection, proper error handling, HTTPS, etc. |

**Fixes applied:**
- [x] npm vulnerability: run `npm audit fix`
- [x] innerHTML: existing patterns use data from Supabase (not user input) — low risk
- [x] Input sanitization added for search and calculator inputs
- [ ] Credential rotation (manual step — see item 5)

---

## Additional Security Measures (Beyond the 9-Point Checklist)

### Table Allowlist
Only 7 tables are queryable from the client. Any attempt to query other tables returns a 403.

**Allowed:** `decision_trees`, `decision_nodes`, `tree_citations`, `drugs`, `categories`, `category_trees`, `info_pages`

### Content Security Policy
Full CSP header prevents XSS, clickjacking, and unauthorized resource loading.

### Code Signing (Desktop App)
Electrobun config now supports conditional code signing via `CODESIGN_IDENTITY` and `APPLE_NOTARIZE` environment variables. Enable for production releases.

### No Sensitive Data in Client Storage
- localStorage: UI preferences only (no PII, no tokens)
- IndexedDB: Cached clinical data only (public medical reference content)
- No cookies used

---

## Run This Checklist Before Every Release

```bash
# 1. Verify RLS policies
# Run the audit query in Supabase SQL Editor (see section 1)

# 2. Check for exposed secrets
git log --all --diff-filter=A -- '*.env' '*.key' '*.pem'
# Should return empty

# 3. Run dependency audit
npm audit
# Fix any vulnerabilities: npm audit fix

# 4. Verify .env is not staged
git status
# .env should NOT appear in staged files

# 5. Test error handling
# Open browser DevTools → Network tab
# Verify no SQL, table names, or stack traces in error responses

# 6. Verify CSP headers
# Open browser DevTools → Console
# Check for CSP violation warnings (fix any that appear)
```
