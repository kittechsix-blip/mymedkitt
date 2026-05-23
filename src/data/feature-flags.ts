// myMedKitt — Feature Flags + Kill Switches
//
// All new behaviors shipped for the headache-hub batch (2026-05-22) are gated here.
// Flip a flag, run `/deploy`, and the change is live in ~2 minutes — no DB writes,
// no Supabase migrations. See PLAN.md R14 + Phase 1.5 + Phase 8a (kill switches).
//
// IMPORTANT: this is the v1 flag mechanism (in-code). v2 may move flags to a Supabase
// `feature_flags` table for runtime control without a deploy.

export interface FeatureFlags {
  /** Gate rendering affordances for `type: 'hub'` trees (badge, dual-list cross-link map). */
  hubTypeRender: boolean;
  /** Gate the `action: 'route'` toolbar dispatcher. Off = route taps no-op (intentional, logged). */
  routeActionEnabled: boolean;
  /**
   * Master gate for the 🧰 Tools ▾ drawer. Even when ON, a consult must ALSO be in
   * `TOOLBAR_OVERFLOW` (toolbar-configs.ts) to render the drawer. Flipping this OFF
   * is the global kill switch — all opted-in consults fall back to inline-everything.
   */
  toolbarOverflowEnabled: boolean;
  /** Hide individual consults from category lists and the `#/tree/<id>` router. */
  hiddenTreeIds: readonly string[];
  /** Hide hub-typed trees specifically (independent of hiddenTreeIds). */
  hiddenHubs: readonly string[];
}

export const FLAGS: FeatureFlags = {
  hubTypeRender: true,
  routeActionEnabled: true,
  toolbarOverflowEnabled: true,
  // Headache-hub batch is staged behind the hidden gate per PLAN.md R16/R18.
  // Per-canary flip order removes ids one at a time:
  //   (1) occipital-nerve-block (Phase 8 canary #1, smoke + soak)
  //   (2) trigeminal-neuralgia (Phase 8 canary #2)
  //   (3) cluster-headache (Phase 8 canary #3 — depends on occipital-nerve-block flipped)
  //   (4) headache-hub LAST
  // 2026-05-22 PM: headache-hub rewritten around ER workflow (sick check →
  // time-critical exclusions → rescue cocktail + reassess → imaging → dispo).
  // Re-enabled live. SNOOP10-walk + phenotype-triage structure dropped per
  // Andy's clinical review.
  // 2026-05-23: optic-neuropathy-hub + optic-neuritis built + Supabase-pushed.
  // Clinical review approved. Flag flipped — both live.
  hiddenTreeIds: [],
  hiddenHubs: [],
};

/** True if a given tree id should be hidden from listings + router. */
export function isTreeHidden(treeId: string, treeType?: string): boolean {
  if (FLAGS.hiddenTreeIds.includes(treeId)) return true;
  if (treeType === 'hub' && FLAGS.hiddenHubs.includes(treeId)) return true;
  return false;
}
