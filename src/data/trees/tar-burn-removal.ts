// MedKitt — Tar / Asphalt Burn Removal (Procedures: Burns)
//
// Occupational roofing/paving tar burns: solidified tar at 400-500F adheres to
// skin, traps heat, and obscures burn depth. The reflex to PEEL it off causes
// further tissue loss. Correct move: DISSOLVE, don't peel — petroleum-based
// emulsifier (bacitracin/Neosporin, polysorbate/Tween-80 surfactants, mineral
// oil, vitamin E ointment). This tree closes a real, under-taught knowledge gap.
//
// IMAGES: an optional dissolution-agent ladder graphic could help but is not
// required. No image is embedded; any image requires Andy's approval per project
// image rule (CLAUDE.md).

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const TAR_BURN_REMOVAL_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Initial Management
  // ============================================================
  {
    id: 'tar-start',
    type: 'info',
    module: 1,
    title: 'Tar / Asphalt Burn — Dissolve, Don\u2019t Peel',
    body: 'Adherent hot tar traps heat and hides burn depth. **The core rule: never mechanically peel adherent tar — it strips viable skin. Cool first, then dissolve with a petroleum-based emulsifier.**\n\nTools (open first):\n- [Procedure Steps Summary](#/info/tar-steps)\n- [Dissolution-Agent Ladder](#/info/tar-agent-ladder)\n- [Burn TBSA + Transfer Criteria](#/info/tar-tbsa-transfer)\n- [Analgesia Options](#/info/tar-analgesia)\n- [Do-NOT List](#/info/tar-stop)',
    citation: [1, 2],
    next: 'tar-abc',
    summary: 'Cool, then dissolve adherent tar with petroleum emulsifier; never peel.',
    safetyLevel: 'critical',
  },
  {
    id: 'tar-abc',
    type: 'question',
    module: 1,
    title: 'Airway / Inhalation First',
    body: 'Wound care never precedes airway. Hot-tar exposures (enclosed spaces, kettle flashes) can carry inhalation injury. Screen before focusing on the skin.',
    options: [
      {
        label: 'Inhalation injury signs present',
        description: 'Facial burns, singed nasal hair, soot in oropharynx, hoarseness, stridor, carbonaceous sputum, enclosed-space fire. Airway + carbon monoxide/cyanide concern supersedes tar removal.',
        next: 'tar-airway-path',
        urgency: 'critical',
      },
      {
        label: 'No inhalation injury — isolated skin tar burn',
        description: 'Proceed to cooling and analgesia, then dissolution.',
        next: 'tar-cool',
        urgency: 'urgent',
      },
    ],
    citation: [2, 3],
    safetyLevel: 'critical',
    summary: 'Screen inhalation injury first; airway/CO/CN supersede wound care.',
  },
  {
    id: 'tar-airway-path',
    type: 'result',
    module: 1,
    title: 'Airway Takes Priority',
    body: 'Manage the airway and systemic injury before tar:\n- Early intubation if progressive airway edema, stridor, or deep facial burns\n- 100% oxygen for suspected carbon monoxide; consider cyanide toxicity in enclosed-space fires\n- Then return to tar dissolution once the patient is stabilized\n\nUse the burn-center criteria in [Burn TBSA + Transfer](#/info/tar-tbsa-transfer); significant burns with airway involvement warrant transfer.',
    recommendation: 'Stabilize airway, treat CO/CN, then resume tar dissolution.',
    confidence: 'definitive',
    citation: [2, 3],
    safetyLevel: 'critical',
    summary: 'Airway/CO/CN first; resume tar care after stabilization; transfer if airway + burn.',
  },
  {
    id: 'tar-cool',
    type: 'info',
    module: 1,
    title: 'Step 1 — Cool + Analgesia',
    body: '1. **Cool the tar immediately** with room-temperature water to stop ongoing thermal injury and harden the tar so it stops spreading. Cool ~20 minutes; avoid ice (worsens injury) and avoid hypothermia in large burns.\n2. Provide analgesia early — tar burns are painful and dissolution takes time. See [Analgesia Options](#/info/tar-analgesia).\n3. Do NOT attempt to pick, peel, or scrub the tar off at this stage.\n\nOnce cooled and the patient is comfortable, move to agent selection.',
    citation: [1, 2],
    next: 'tar-agent',
    summary: 'Cool ~20 min (no ice), analgesia early, do not peel.',
    safetyLevel: 'warning',
  },

  // ============================================================
  // Module 2 — Dissolution
  // ============================================================
  {
    id: 'tar-agent',
    type: 'question',
    module: 2,
    title: 'Step 2 — Select Dissolution Agent',
    body: 'Tar is petroleum-based, so a petroleum/surfactant emulsifier dissolves it without harming skin. Pick what you have — full ladder in [Dissolution-Agent Ladder](#/info/tar-agent-ladder). **Never use organic solvents (acetone, gasoline) — they cause chemical injury.**',
    options: [
      {
        label: 'Antibiotic ointment (bacitracin / Neosporin)',
        description: 'Most available in any ED. Apply [Bacitracin ointment](#/drug/bacitracin/tar burn dissolution) thickly under a dressing; reapply q1-2h. Tar emulsifies over hours.',
        next: 'tar-apply',
        urgency: 'routine',
      },
      {
        label: 'Surfactant (polysorbate / Tween-80, De-Solv-It, Tarsol)',
        description: 'Purpose-made petroleum-emulsifying surfactants dissolve tar fastest where stocked.',
        next: 'tar-apply',
        urgency: 'routine',
      },
      {
        label: 'Mineral oil / petrolatum / butter',
        description: 'Household/kitchen petroleum sources work when nothing else is available (case-reported with butter and mineral oil).',
        next: 'tar-apply',
        urgency: 'routine',
      },
      {
        label: 'Vitamin E ointment',
        description: 'Reported effective and skin-friendly for hot-tar burns (CJEM case series).',
        next: 'tar-apply',
        urgency: 'routine',
      },
    ],
    citation: [1, 4, 5],
    summary: 'Petroleum/surfactant emulsifier (bacitracin, Tween-80, mineral oil, vit E); never acetone/gasoline.',
    safetyLevel: 'warning',
  },
  {
    id: 'tar-apply',
    type: 'info',
    module: 2,
    title: 'Step 3 — Apply + Dwell',
    body: '1. Apply the chosen emulsifier generously over ALL adherent tar.\n2. Cover with a non-adherent dressing and a bulky outer wrap to hold the agent against the tar.\n3. **Let it dwell.** Tar dissolves gradually — reapply the agent every 1-2 hours. As the tar softens it lifts off atraumatically with gentle wiping; let it release on its own.\n4. Do NOT force, scrub, or peel any tar that is still adherent — reapply and wait.\n5. Complete dissolution can take several hours and may extend beyond the ED visit; an outpatient continuation plan with ongoing ointment is acceptable for stable, small burns.',
    citation: [1, 4, 5],
    next: 'tar-reassess',
    summary: 'Apply emulsifier thickly under dressing, reapply q1-2h, let tar release atraumatically.',
    safetyLevel: 'warning',
  },

  // ============================================================
  // Module 3 — Reassess + Disposition
  // ============================================================
  {
    id: 'tar-reassess',
    type: 'info',
    module: 3,
    title: 'Step 4 — Reassess Burn Depth',
    body: 'Burn depth CANNOT be judged while tar covers the skin. Only after the tar is cleared:\n- Estimate depth (superficial / partial / full thickness) and TBSA — use [Burn TBSA + Transfer](#/info/tar-tbsa-transfer)\n- Superficial and small partial-thickness burns → standard burn wound care, topical antibiotic, dressing, outpatient follow-up\n- Deep partial / full thickness, or large TBSA → burn-center referral\n- Update tetanus status',
    citation: [2, 6],
    next: 'tar-dispo',
    summary: 'Assess depth + TBSA only after tar cleared; tetanus; refer deep/large burns.',
  },
  {
    id: 'tar-dispo',
    type: 'result',
    module: 3,
    title: 'Disposition + Note',
    body: 'Disposition:\n- **Discharge:** small superficial/partial-thickness burns once tar is substantially cleared and pain is controlled; ongoing emulsifier ointment + non-adherent dressing; burn-clinic or PCP follow-up in 24-48 h; clear return precautions (increasing pain, redness, fever, drainage).\n- **Admit / transfer:** burn-center criteria met (deep partial/full thickness, large TBSA, hands/face/feet/perineum/joints, inhalation injury, comorbidity).\n\n**Note template:**\n**Mechanism:** Hot tar/asphalt burn to [site], occupational/[other].\n**Initial:** Cooled ~20 min; analgesia [agent]; tar NOT peeled.\n**Dissolution:** [Bacitracin / surfactant / mineral oil / vitamin E] applied; reapplied q[1-2]h; tar released atraumatically.\n**Burn assessment (post-clearance):** [depth], TBSA [%].\n**Tetanus:** [status]. **Disposition:** [discharge w/ follow-up / transfer to burn center].',
    recommendation: 'Discharge small superficial burns with ongoing emulsifier + follow-up; transfer if burn-center criteria.',
    confidence: 'recommended',
    citation: [2, 6],
    summary: 'Discharge small burns w/ emulsifier + follow-up; transfer if burn-center criteria.',
  },
];

export const TAR_BURN_REMOVAL_CRITICAL_ACTIONS = [
  { text: 'Screen for inhalation injury and CO/cyanide BEFORE wound care — airway supersedes tar removal.', nodeId: 'tar-abc' },
  { text: 'Cool the tar (~20 min, no ice) to stop thermal injury; never apply ice to a large burn.', nodeId: 'tar-cool' },
  { text: 'Dissolve with a petroleum-based emulsifier; NEVER use acetone, gasoline, or other organic solvents.', nodeId: 'tar-agent' },
  { text: 'Never mechanically peel or scrub adherent tar — reapply emulsifier and let it release atraumatically.', nodeId: 'tar-apply' },
  { text: 'Assess burn depth and TBSA only AFTER the tar is cleared; refer deep/large burns to a burn center.', nodeId: 'tar-reassess' },
];

export const TAR_BURN_REMOVAL_CITATIONS: Citation[] = [
  { num: 1, text: 'Steenvoorde P, et al. Tar removal from a burn with butter: an emulsifier approach. World Wide Wounds. 2004 Dec.' },
  { num: 2, text: 'American Burn Association. Advanced Burn Life Support (ABLS) Provider Manual / burn-center referral criteria.' },
  { num: 3, text: 'Roberts JR, Custalow CB, Thomsen TW. Roberts and Hedges\u2019 Clinical Procedures in Emergency Medicine and Acute Care \u2014 burn and wound management (domain comparator only).' },
  { num: 4, text: 'Vitamin E ointment for the treatment of a hot tar burn. CJEM. 2013;15(0):1-2 (PMID 23972137).' },
  { num: 5, text: 'Anesthesia Key. Partial-Thickness (Second-Degree) Burns and Tar Burns. aneskey.com.' },
  { num: 6, text: 'Hettiaratchy S, Papini R. Initial management of a major burn: II\u2014assessment and resuscitation. BMJ. 2004;329(7457):101-103.' },
];

export const TAR_BURN_REMOVAL_NODE_COUNT = TAR_BURN_REMOVAL_NODES.length;
export const TAR_BURN_REMOVAL_MODULE_LABELS = ['Initial Management', 'Dissolution', 'Reassess + Disposition'];
