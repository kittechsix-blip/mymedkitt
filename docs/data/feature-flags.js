// myMedKitt — Feature Flags + Kill Switches
//
// All new behaviors shipped for the headache-hub batch (2026-05-22) are gated here.
// Flip a flag, run `/deploy`, and the change is live in ~2 minutes — no DB writes,
// no Supabase migrations. See PLAN.md R14 + Phase 1.5 + Phase 8a (kill switches).
//
// IMPORTANT: this is the v1 flag mechanism (in-code). v2 may move flags to a Supabase
// `feature_flags` table for runtime control without a deploy.
export const FLAGS = {
    hubTypeRender: true,
    routeActionEnabled: true,
    toolbarOverflowEnabled: true,
    hiddenTreeIds: [],
    hiddenHubs: [],
};
/** True if a given tree id should be hidden from listings + router. */
export function isTreeHidden(treeId, treeType) {
    if (FLAGS.hiddenTreeIds.includes(treeId))
        return true;
    if (treeType === 'hub' && FLAGS.hiddenHubs.includes(treeId))
        return true;
    return false;
}
