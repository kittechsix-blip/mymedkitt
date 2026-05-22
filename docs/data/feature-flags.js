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
    // Headache-hub batch is staged behind the hidden gate per PLAN.md R16/R18.
    // Per-canary flip order removes ids one at a time:
    //   (1) occipital-nerve-block (Phase 8 canary #1, smoke + soak)
    //   (2) trigeminal-neuralgia (Phase 8 canary #2)
    //   (3) cluster-headache (Phase 8 canary #3 — depends on occipital-nerve-block flipped)
    //   (4) headache-hub LAST
    // 2026-05-22 PM: headache-hub pulled off live pending rewrite.
    // Andy flagged that the SNOOP10-walk + "phenotype triage" structure is
    // neurology-clinic framing, not ER workflow. Rewriting around sick/not-sick →
    // time-critical exclusions → rescue + dispo. Splits (cluster-headache,
    // trigeminal-neuralgia, occipital-nerve-block) stay live since they're
    // standalone and clinically usable.
    hiddenTreeIds: ['headache-hub'],
    hiddenHubs: ['headache-hub'],
};
/** True if a given tree id should be hidden from listings + router. */
export function isTreeHidden(treeId, treeType) {
    if (FLAGS.hiddenTreeIds.includes(treeId))
        return true;
    if (treeType === 'hub' && FLAGS.hiddenHubs.includes(treeId))
        return true;
    return false;
}
