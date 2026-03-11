// MedKitt — Shared Mode Service
// Manages the shared consult experience: users who arrive via share links
// see only the consults they've been sent, building up their dashboard
// one consult at a time. Full-access users see everything.
const SHARED_KEY = 'medkitt-shared-consults';
const FULL_ACCESS_KEY = 'medkitt-full-access';
/** Check if the user has full access (installed app normally, not via share link) */
export function hasFullAccess() {
    return localStorage.getItem(FULL_ACCESS_KEY) === 'true';
}
/** Grant full access — unlocks all consults */
export function grantFullAccess() {
    localStorage.setItem(FULL_ACCESS_KEY, 'true');
}
/** Check if the user is in shared mode (has shared consults but no full access) */
export function isSharedMode() {
    return !hasFullAccess() && getSharedTreeIds().length > 0;
}
/** Get all tree IDs the user has been shared */
export function getSharedTreeIds() {
    try {
        const raw = localStorage.getItem(SHARED_KEY);
        if (!raw)
            return [];
        return JSON.parse(raw);
    }
    catch {
        return [];
    }
}
/** Add a tree ID to the shared consults list (no-op if already present) */
export function addSharedConsult(treeId) {
    const ids = getSharedTreeIds();
    if (!ids.includes(treeId)) {
        ids.push(treeId);
        localStorage.setItem(SHARED_KEY, JSON.stringify(ids));
    }
}
/** Mark the user as having arrived organically (not via share link).
 *  Called on first load when there's no hash or a non-share hash. */
export function markOrganicVisit() {
    // Only set full access if user has never received a share link
    // (i.e., they found the app on their own)
    if (getSharedTreeIds().length === 0 && !hasFullAccess()) {
        grantFullAccess();
    }
}
