// MedKitt — Continuous Bladder Irrigation for Clot Retention (Procedures: GU)
//
// Gross hematuria with clot retention (post-TURP, anticoagulated, BPH, bladder
// tumor) is a common ED GU emergency. Two classic errors: (1) starting CBI
// before manually clearing existing clots — CBI does NOT break up clots; and (2)
// using a catheter that is too small. This tree enforces: large-bore 3-way
// placement → MANUAL syringe irrigation until clear → CBI titration → stop if
// outflow lags inflow (suspect malposition/bladder injury).
//
// IMAGES: an optional 3-way catheter lumen diagram could help; no image is
// embedded. Any image requires Andy's approval per project image rule.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const CONTINUOUS_BLADDER_IRRIGATION_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Confirm Clot Retention
  // ============================================================
  {
    id: 'cbi-start',
    type: 'info',
    module: 1,
    title: 'Continuous Bladder Irrigation — Clot Retention',
    body: 'For gross hematuria with clot retention. **Two rules that prevent harm: (1) CBI does NOT break up clots — you must MANUALLY evacuate existing clots first; (2) use a large-bore 3-way catheter, not a standard Foley.**\n\nTools (open first):\n- [Procedure Steps Summary](#/info/cbi-steps)\n- [Catheter French-Size Selector](#/info/cbi-catheter-size)\n- [CBI Titration Card](#/info/cbi-titration)\n- [Inflow-vs-Outflow Stop-Check](#/info/cbi-stop-check)\n- [Urology Escalation + Hematuria Workup](#/info/cbi-escalation)',
    citation: [1, 2],
    next: 'cbi-confirm',
    summary: 'Manually evacuate clots FIRST (CBI can\u2019t); use a large-bore 3-way catheter.',
    safetyLevel: 'critical',
  },
  {
    id: 'cbi-confirm',
    type: 'question',
    module: 1,
    title: 'Clot Retention vs Simple Retention?',
    body: 'Distinguish clot retention (gross hematuria + clots obstructing outflow) from simple urinary retention (no blood). The pathway and catheter choice differ.',
    options: [
      {
        label: 'Gross hematuria + clots / clot retention',
        description: 'Blood and clots in urine, painful distended bladder, prior TURP / anticoagulation / BPH / known bladder tumor. Proceed with large-bore 3-way + manual evacuation.',
        next: 'cbi-anticoag',
        urgency: 'urgent',
      },
      {
        label: 'Painless retention, clear urine — no blood',
        description: 'This is simple retention, not clot retention. CBI is not indicated.',
        next: 'cbi-not-indicated',
      },
    ],
    citation: [1, 2],
    summary: 'Confirm hematuria + clots before CBI; simple retention does not need CBI.',
  },
  {
    id: 'cbi-not-indicated',
    type: 'result',
    module: 1,
    title: 'Not Clot Retention — Use Retention Pathway',
    body: 'Clear urine with painless retention is simple urinary retention. CBI is not indicated.\n\nDecompress with a standard catheter and work up the cause via [Urinary Retention](#/tree/urinary-retention). If catheter placement is difficult, escalate per standard difficult-catheterization steps.',
    recommendation: 'Use the urinary-retention pathway; CBI is reserved for clot retention.',
    confidence: 'definitive',
    citation: [2],
    summary: 'Simple retention → standard catheter + retention workup, not CBI.',
  },
  {
    id: 'cbi-anticoag',
    type: 'info',
    module: 1,
    title: 'Identify + Address the Bleeding Source',
    body: 'While preparing the procedure, address reversible drivers:\n- Review anticoagulants/antiplatelets; correct supratherapeutic INR; consider reversal if bleeding is severe (cross-reference your institutional reversal pathway)\n- Check CBC, coags, type-and-screen if bleeding is brisk or hemoglobin is dropping\n- Note prior TURP/biopsy, known bladder/prostate tumor, recent instrumentation\n\nReversal decisions are bleeding-severity dependent; severe hematuria with hemodynamic change warrants resuscitation and urgent urology.',
    citation: [2, 3],
    next: 'cbi-catheter',
    summary: 'Correct coagulopathy, send CBC/coags/T&S, identify source while prepping.',
    safetyLevel: 'warning',
  },

  // ============================================================
  // Module 2 — Catheter + Manual Evacuation
  // ============================================================
  {
    id: 'cbi-catheter',
    type: 'info',
    module: 2,
    title: 'Step 1 — Place Large-Bore 3-Way Catheter',
    body: 'A standard 14-16 Fr Foley clogs with clots and has no irrigation channel. Use a large-bore 3-way (hematuria) catheter — typically **22-24 Fr** — see [Catheter French-Size Selector](#/info/cbi-catheter-size).\n\n1. Sterile prep; insert the 3-way catheter; confirm intravesical placement (urine/blood return) before inflating the balloon.\n2. Inflate the balloon to the manufacturer\u2019s volume.\n3. The three lumens are: balloon inflation, drainage/outflow, and irrigation inflow.\n\nDo NOT start irrigation fluid yet — clots come out first, by hand.',
    citation: [1, 2, 4],
    next: 'cbi-manual',
    summary: 'Place a 22-24 Fr 3-way hematuria catheter; confirm placement before balloon inflation.',
    safetyLevel: 'warning',
  },
  {
    id: 'cbi-manual',
    type: 'info',
    module: 2,
    title: 'Step 2 — MANUAL Clot Evacuation (Mandatory First)',
    body: '**This is the step clinicians skip — and CBI fails without it.** CBI fluid flows around clots; it does not break them.\n\n1. Using a catheter-tip (Toomey) syringe with ~60 mL sterile saline, instill and aspirate through the drainage port.\n2. Repeat aspiration/instillation, evacuating clots, until the returns are clear or only lightly blood-tinged and no further clot is retrieved.\n3. Be patient — this can take many syringe cycles. Gentle instillation; do NOT force against firm resistance (risk of bladder injury/perforation).\n4. Only once the bladder is substantially clot-free do you start CBI.\n\nIf you cannot clear clots manually or the bladder will not drain → urology now (cystoscopic clot evacuation). See [Urology Escalation](#/info/cbi-escalation).',
    citation: [1, 2, 4],
    next: 'cbi-start-irrigation',
    summary: 'Toomey-syringe manual irrigation until clear BEFORE CBI; don\u2019t force; urology if can\u2019t clear.',
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 3 — CBI Titration + Monitoring
  // ============================================================
  {
    id: 'cbi-start-irrigation',
    type: 'info',
    module: 3,
    title: 'Step 3 — Start + Titrate CBI',
    body: 'Connect sterile normal saline to the irrigation (inflow) port and open the drainage (outflow) to a closed bag.\n\n- Titrate inflow rate to keep the effluent light pink to clear — faster for brisk bleeding, slower as it clears. See [CBI Titration Card](#/info/cbi-titration).\n- The goal is to keep clots from re-forming, NOT to break existing clots (those were removed manually).\n- Maintain a closed, sterile system; track net fluid balance (subtract irrigant volume from total output to estimate true urine output).',
    citation: [2, 4],
    next: 'cbi-monitor',
    summary: 'Titrate saline inflow to keep effluent light-pink/clear; track net balance.',
  },
  {
    id: 'cbi-monitor',
    type: 'question',
    module: 3,
    title: 'Inflow vs Outflow — Watch Closely',
    body: '**The key safety check during CBI: outflow must roughly match or exceed inflow.** If you keep running fluid in but little comes out, the bladder is overfilling. Review [Inflow-vs-Outflow Stop-Check](#/info/cbi-stop-check).',
    options: [
      {
        label: 'Outflow matches inflow, effluent clearing',
        description: 'CBI working. Continue, taper rate as it clears, monitor hemoglobin and balance.',
        next: 'cbi-working',
        urgency: 'routine',
      },
      {
        label: 'Outflow << inflow / bladder distending / pain',
        description: 'STOP inflow. Suspect catheter obstruction by new clot, malposition, or bladder injury. Aspirate manually to clear/check; if not rapidly resolved, urology now.',
        next: 'cbi-obstruction',
        urgency: 'critical',
      },
    ],
    citation: [2, 4],
    safetyLevel: 'critical',
    summary: 'Outflow must keep up with inflow; if not, STOP, troubleshoot, escalate.',
  },
  {
    id: 'cbi-obstruction',
    type: 'result',
    module: 3,
    title: 'Outflow Lagging — STOP + Troubleshoot',
    body: '**Stop the irrigation inflow immediately.** Continuing to instill fluid into a non-draining bladder risks overdistension and perforation.\n\n1. Manually aspirate the catheter with a Toomey syringe to clear an obstructing clot.\n2. Check the catheter is not kinked and the balloon is not displaced into the urethra.\n3. If outflow does not promptly recover, or you suspect bladder injury (severe pain, low return, peritoneal signs) → **urology now** for cystoscopy ± imaging.\n\nDo not restart CBI until free drainage is re-established.',
    recommendation: 'Outflow lagging inflow: STOP, manually clear, escalate to urology if not promptly resolved.',
    confidence: 'definitive',
    citation: [2, 4],
    safetyLevel: 'critical',
    summary: 'Outflow lag → STOP inflow, manual clear, urology if not resolved; don\u2019t overdistend.',
  },
  {
    id: 'cbi-working',
    type: 'result',
    module: 3,
    title: 'Disposition + Hematuria Workup',
    body: 'CBI running well with clearing effluent:\n- Admit for ongoing CBI and monitoring in most clot-retention cases; brisk or persistent bleeding warrants urology involvement and possible intervention (cystoscopic fulguration, intravesical agents).\n- **All gross hematuria with clot retention needs urologic follow-up** even if it clears — to evaluate for malignancy and source. See [Urology Escalation + Hematuria Workup](#/info/cbi-escalation).\n- Continue to monitor hemoglobin, coagulation status, and net fluid balance.\n\n**Note template:**\n**Indication:** Gross hematuria with clot retention [post-TURP / anticoagulated / BPH / tumor].\n**Catheter:** [22/24] Fr 3-way placed, intravesical confirmed, balloon inflated.\n**Manual evacuation:** Toomey-syringe irrigation \u00d7 [n] until clear before CBI.\n**CBI:** NS inflow titrated to light-pink effluent; outflow matched inflow.\n**Disposition:** [Admit / urology consult]; hematuria follow-up arranged.',
    recommendation: 'Admit/observe with CBI; ensure urologic follow-up for all clot-retention hematuria.',
    confidence: 'recommended',
    citation: [2, 5],
    summary: 'Admit/observe; mandatory urology follow-up for all gross-hematuria clot retention.',
  },
];

export const CONTINUOUS_BLADDER_IRRIGATION_CRITICAL_ACTIONS = [
  { text: 'Manually evacuate existing clots with a Toomey syringe BEFORE starting CBI — CBI does not break clots.', nodeId: 'cbi-manual' },
  { text: 'Use a large-bore 3-way (hematuria) catheter, typically 22-24 Fr, not a standard small Foley.', nodeId: 'cbi-catheter' },
  { text: 'During CBI, outflow must keep up with inflow; if outflow lags, STOP inflow immediately.', nodeId: 'cbi-monitor' },
  { text: 'Outflow lagging / bladder distending → suspect obstruction or injury; manually clear and escalate to urology.', nodeId: 'cbi-obstruction' },
  { text: 'All gross hematuria with clot retention needs urologic follow-up regardless of resolution.', nodeId: 'cbi-working' },
];

export const CONTINUOUS_BLADDER_IRRIGATION_CITATIONS: Citation[] = [
  { num: 1, text: 'American Urological Association. Medical Student Curriculum: Bladder Drainage and Urinary Catheterization. auanet.org.' },
  { num: 2, text: 'American Urological Association. Medical Student Curriculum: Urologic Emergencies (gross hematuria / clot retention). auanet.org.' },
  { num: 3, text: 'Roberts JR, Custalow CB, Thomsen TW. Roberts and Hedges\u2019 Clinical Procedures in Emergency Medicine and Acute Care \u2014 GU procedures (domain comparator only).' },
  { num: 4, text: 'Willette PA, Coffield S. Current trends in the management of difficult urinary catheterizations and bladder irrigation. West J Emerg Med. 2012;13(6):472-478.' },
  { num: 5, text: 'AMBOSS. Hematuria \u2014 clot retention and management. amboss.com.' },
];

export const CONTINUOUS_BLADDER_IRRIGATION_NODE_COUNT = CONTINUOUS_BLADDER_IRRIGATION_NODES.length;
export const CONTINUOUS_BLADDER_IRRIGATION_MODULE_LABELS = ['Confirm Clot Retention', 'Catheter + Manual Evacuation', 'CBI Titration + Disposition'];
