// MedKitt — Input Sanitization
// Prevents XSS and injection in user-facing inputs.
// Used by search, calculators, and any component accepting user text.

/** Maximum allowed input length for search queries */
const MAX_SEARCH_LENGTH = 200;

/** Maximum allowed input length for calculator numeric fields */
const MAX_NUMBER_LENGTH = 10;

/**
 * Sanitize a search query string.
 * - Trims whitespace
 * - Truncates to max length
 * - Strips HTML tags and script patterns
 * - Removes null bytes
 */
export function sanitizeSearchInput(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .trim()
    .slice(0, MAX_SEARCH_LENGTH)
    .replace(/\0/g, '')             // null bytes
    .replace(/<[^>]*>/g, '')        // HTML tags
    .replace(/javascript:/gi, '')   // JS protocol
    .replace(/on\w+\s*=/gi, '');    // event handlers (onclick=, onerror=, etc.)
}

/**
 * Sanitize a numeric input from calculator fields.
 * Returns NaN for invalid inputs (caller should handle).
 */
export function sanitizeNumericInput(raw: string | number): number {
  if (typeof raw === 'number') {
    return Number.isFinite(raw) ? raw : NaN;
  }
  if (!raw || typeof raw !== 'string') return NaN;
  const cleaned = raw.trim().slice(0, MAX_NUMBER_LENGTH);
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : NaN;
}

/**
 * Escape a string for safe insertion into HTML (via textContent, not innerHTML).
 * Use when you MUST use innerHTML — prefer textContent/createTextNode instead.
 */
export function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Validate that a table name contains only safe characters.
 * Prevents SQL injection via table name manipulation.
 */
export function isValidTableName(name: string): boolean {
  return /^[a-z_][a-z0-9_]*$/.test(name);
}
