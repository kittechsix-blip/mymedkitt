// MedKitt - Acute Urinary Retention
// Initial assessment -> Catheterization -> Failed cath pathway -> Post-obstructive diuresis -> Medications -> Discharge
// 5 modules: Assessment -> Catheterization -> Failed Catheterization -> Post-Obstructive Diuresis -> Medications & Disposition
// 21 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const URINARY_RETENTION_CRITICAL_ACTIONS = [
  { text: 'Bladder scan to confirm retention (>300 mL)', nodeId: 'aur-volume' },
  { text: 'Emergent MRI for cauda equina syndrome', nodeId: 'aur-neuro-emergency' },
  { text: 'Coude catheter for BPH after failed standard attempt', nodeId: 'aur-failed-cath' },
  { text: 'Start tamsulosin 0.4 mg at time of catheterization', nodeId: 'aur-bph-meds' },
  { text: 'Urology consult for failed catheter attempts', nodeId: 'aur-urology-consult' },
  { text: 'Monitor for post-obstructive diuresis (>200 mL/hr)', nodeId: 'aur-pod-management' },
  { text: 'Replace 50-75% of urine output for POD', nodeId: 'aur-pod-fluids' },
];

export const URINARY_RETENTION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'aur-start',
    type: 'info',
    module: 1,
    title: 'Acute Urinary Retention',
    body: 'Inability to voluntarily void urine. Most common urologic emergency in men.\n\n**Immediate actions:**\n\u2022 Bladder scan to confirm retention (>300 mL)\n\u2022 Assess for signs of infection (fever, dysuria, pyuria)\n\u2022 Review medication list for anticholinergics, sympathomimetics, opioids\n\u2022 Check for neurologic symptoms (saddle anesthesia, leg weakness, fecal incontinence)\n\n**Four categories of causes:**\n\u2022 **Structural:** BPH (most common, ~50%), stricture, phimosis, tumor\n\u2022 **Medication/Toxicologic:** Anticholinergics, opioids, alpha-agonists, antihistamines\n\u2022 **Neurogenic:** Spinal cord injury, cauda equina, diabetic neuropathy, MS\n\u2022 **Infectious:** UTI, prostatitis, urethritis',
    images: [
      { src: 'images/urinary-retention/urinary-retention-ultrasound.jpg', alt: 'Bladder ultrasound showing trabeculated distended bladder', caption: 'Bladder ultrasound: markedly distended bladder with trabeculated wall — indicating chronic outlet obstruction (typically BPH). Bladder scan >300 mL confirms retention. Trabeculation suggests long-standing obstruction. Public domain / CC0.' },
    ],
    citation: [1, 2],
    next: 'aur-red-flags',

    summary: 'Bladder scan >300mL confirms retention — assess structural, medication, neurogenic, infectious causes',
    skippable: true,
  },

  {
    id: 'aur-red-flags',
    type: 'question',
    module: 1,
    title: 'Red Flag Assessment',
    body: 'Screen for emergent etiologies that change management:\n\n**Cauda equina syndrome signs:**\n\u2022 Saddle anesthesia\n\u2022 Bilateral leg weakness\n\u2022 Fecal incontinence\n\u2022 Recent back pain with progressive symptoms\n\n**Sepsis/Pyelonephritis:**\n\u2022 Fever, tachycardia, hypotension\n\u2022 Costovertebral angle tenderness\n\n**Trauma:**\n\u2022 Blood at urethral meatus\n\u2022 Pelvic fracture\n\u2022 Perineal hematoma ("butterfly" pattern)',
    citation: [1, 2],
    options: [
      {
        label: 'Neurologic red flags present',
        description: 'Saddle anesthesia, bilateral weakness, fecal incontinence',
        next: 'aur-neuro-emergency',
        urgency: 'critical',
      },
      {
        label: 'Urethral trauma suspected',
        description: 'Blood at meatus, pelvic fracture, perineal hematoma',
        next: 'aur-trauma',
        urgency: 'critical',
      },
      {
        label: 'Signs of sepsis',
        description: 'Fever + hemodynamic instability',
        next: 'aur-sepsis',
        urgency: 'critical',
      },
      {
        label: 'No red flags',
        description: 'Proceed with standard workup',
        next: 'aur-volume',
      },
    ],

    summary: 'Screen for cauda equina, urethral trauma, and urosepsis before catheterization',
    safetyLevel: 'critical',
  },

  {
    id: 'aur-neuro-emergency',
    type: 'result',
    module: 1,
    title: 'Neurologic Emergency',
    body: '**Cauda equina syndrome suspected.**\n\n**Immediate actions:**\n\u2022 Place Foley catheter for bladder decompression\n\u2022 Emergent MRI lumbar spine\n\u2022 Neurosurgery consult STAT\n\u2022 Dexamethasone 10 mg IV if malignancy or epidural abscess suspected\n\nCauda equina is a surgical emergency. Time to decompression correlates with neurologic recovery.\n\n**Note:** Women and children with AUR should have neurologic causes strongly considered - AUR is rare in these populations without underlying pathology.',
    recommendation: 'Emergent MRI and neurosurgery consult. Foley placement for decompression. Consider IV steroids if malignancy suspected.',
    confidence: 'definitive',
    citation: [1, 2, 3],
  },

  {
    id: 'aur-trauma',
    type: 'result',
    module: 1,
    title: 'Urethral Trauma',
    body: '**Do NOT attempt blind urethral catheterization.**\n\nSigns of urethral injury:\n\u2022 Blood at urethral meatus\n\u2022 High-riding prostate on rectal exam\n\u2022 Perineal ecchymosis\n\u2022 Pelvic fracture mechanism\n\n**Management:**\n\u2022 Retrograde urethrogram (RUG) to assess integrity\n\u2022 If RUG shows disruption: suprapubic catheter by urology\n\u2022 If RUG normal: gentle Foley attempt may proceed\n\nUrology consult emergently.',
    recommendation: 'Retrograde urethrogram before any catheter attempt. Urology consult for suprapubic catheter if urethral disruption confirmed.',
    confidence: 'definitive',
    citation: [1, 4],
  },

  {
    id: 'aur-sepsis',
    type: 'result',
    module: 1,
    title: 'Urosepsis',
    body: '**Obstructed infected system = emergent decompression.**\n\n**Immediate actions:**\n\u2022 Place Foley catheter immediately\n\u2022 Blood cultures x 2\n\u2022 Urinalysis and urine culture\n\u2022 IV fluid resuscitation (30 mL/kg crystalloid)\n\u2022 Broad-spectrum antibiotics within 1 hour\n\n**Empiric antibiotics:**\n\u2022 [Ceftriaxone](#/drug/ceftriaxone/uti) 2g IV OR\n\u2022 [Piperacillin-Tazobactam](#/drug/piperacillin-tazobactam/sepsis) 4.5g IV if high-risk\n\nAdmit to ICU if persistent hypotension. Urology consult for source control if upper tract obstruction (hydronephrosis).',
    recommendation: 'Immediate Foley catheter, blood cultures, IV antibiotics, fluid resuscitation. ICU admission if hemodynamically unstable.',
    confidence: 'definitive',
    citation: [1, 5],
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone',
        dose: '2g',
        route: 'IV',
        frequency: 'Daily',
        duration: 'Until culture-directed therapy',
        notes: 'First-line for community-acquired urosepsis',
      },
      alternative: {
        drug: 'Piperacillin-Tazobactam',
        dose: '4.5g',
        route: 'IV',
        frequency: 'q6h',
        duration: 'Until culture-directed therapy',
        notes: 'For healthcare-associated or high-risk patients',
      },
      monitoring: 'Lactate trending, urine output, hemodynamics. Repeat cultures if persistent fever.',
    },
  },

  {
    id: 'aur-volume',
    type: 'question',
    module: 1,
    title: 'Bladder Volume',
    body: 'Perform **bedside bladder ultrasound** to assess volume.\n\nBladder volume = (Height x Width x Depth) x 0.75\n\nMost modern bladder scanners calculate this automatically.\n\n**Interpretation:**\n\u2022 <300 mL: Not true retention - consider other diagnoses\n\u2022 300-1000 mL: Typical acute retention\n\u2022 >1000 mL: High volume - increased risk of post-obstructive diuresis',
    citation: [1, 2],
    options: [
      {
        label: '<300 mL',
        description: 'Not true retention',
        next: 'aur-not-retention',
      },
      {
        label: '300-1000 mL',
        description: 'Standard acute retention',
        next: 'aur-cath-technique',
      },
      {
        label: '>1000 mL',
        description: 'High volume - POD risk',
        next: 'aur-high-volume',
      },
    ],

    summary: 'Bedside bladder US: <300mL = not retention, 300-1000mL = standard, >1000mL = high volume/POD risk',
  },

  {
    id: 'aur-not-retention',
    type: 'result',
    module: 1,
    title: 'Not True Retention',
    body: 'Bladder volume <300 mL suggests alternative diagnosis.\n\n**Consider:**\n\u2022 UTI/cystitis with urinary urgency\n\u2022 Prostatitis\n\u2022 Pelvic pain syndromes\n\u2022 Psychogenic urinary hesitancy\n\n**Workup:**\n\u2022 Urinalysis\n\u2022 Prostate exam\n\u2022 Abdominal/pelvic imaging if indicated\n\nTreat underlying cause.',
    recommendation: 'Not true urinary retention. Evaluate for alternative diagnoses (UTI, prostatitis, pelvic pathology).',
    confidence: 'recommended',
    citation: [1],
  },

  {
    id: 'aur-high-volume',
    type: 'info',
    module: 1,
    title: 'High Volume Retention',
    body: 'Volume >1000 mL increases risk of:\n\u2022 **Post-obstructive diuresis (POD)**\n\u2022 Acute kidney injury (if chronic retention)\n\u2022 Hematuria ex vacuo\n\n**Labs to obtain:**\n\u2022 BMP (creatinine, electrolytes)\n\u2022 Urinalysis\n\n**Note on drainage:** Rapid vs gradual drainage is equivalent. Evidence does NOT support clamping at 200-500 mL intervals. Complete drainage is safe and does not increase complications. [6]',
    citation: [1, 6],
    next: 'aur-cath-technique',

    summary: '>1000mL increases POD risk — get BMP, UA; rapid drainage is safe, no need to clamp',
  },

  // =====================================================================
  // MODULE 2: CATHETERIZATION
  // =====================================================================

  {
    id: 'aur-cath-technique',
    type: 'question',
    module: 2,
    title: 'Catheter Selection',
    body: '**Standard Foley catheter technique:**\n1. Position patient supine\n2. Sterile prep and drape\n3. Liberal lubrication (lidocaine jelly preferred)\n4. In uncircumcised men: retract foreskin, replace AFTER insertion\n5. Insert to hub before inflating balloon\n6. Inflate balloon with 10 mL sterile water\n7. Gently withdraw until resistance felt\n\n**Catheter sizing:**\n\u2022 Standard: 16-18 Fr (most adults)\n\u2022 Hematuria: Consider 20-22 Fr (for clots)\n\u2022 Stricture: Start small (14 Fr)\n\n**Coude tip:** Curved tip navigates prostatic urethra. Consider first-line in older men with suspected BPH.',
    citation: [1, 2, 7],
    options: [
      {
        label: 'Standard Foley successful',
        description: 'Catheter placed without difficulty',
        next: 'aur-post-cath',
      },
      {
        label: 'Standard Foley failed',
        description: 'Unable to pass catheter',
        next: 'aur-failed-cath',
      },
    ],

    summary: '16-18Fr standard, coude first-line in older men with BPH, insert to hub before inflating balloon',
  },

  {
    id: 'aur-post-cath',
    type: 'question',
    module: 2,
    title: 'Post-Catheterization',
    body: 'Document initial drained volume.\n\n**Assess for hematuria ex vacuo:**\nBrief, self-limited hematuria after rapid decompression is common and benign. Usually resolves within hours.\n\n**Labs to send:**\n\u2022 Urinalysis and culture\n\u2022 BMP (especially if high volume or suspected chronic retention)\n\n**Output monitoring:**\nPost-obstructive diuresis = >200 mL/hr for 2+ consecutive hours OR >3000 mL in 24 hours.',
    citation: [1, 8],
    options: [
      {
        label: 'Output <200 mL/hr',
        description: 'No post-obstructive diuresis',
        next: 'aur-bph-meds',
      },
      {
        label: 'Output >200 mL/hr x 2+ hours',
        description: 'Post-obstructive diuresis present',
        next: 'aur-pod-management',
        urgency: 'urgent',
      },
    ],

    summary: 'Document initial volume, send UA/BMP, monitor output for POD (>200mL/hr x2h or >3L/24h)',
  },

  // =====================================================================
  // MODULE 3: FAILED CATHETERIZATION
  // =====================================================================

  {
    id: 'aur-failed-cath',
    type: 'question',
    module: 3,
    title: 'Failed Catheterization',
    body: '**First attempt failed - troubleshooting:**\n\n**Try Coude catheter:**\nCurved tip (15-30 degree angle) navigates elevated bladder neck in BPH. Ensure curve points UP (toward ceiling) during insertion.\n\n**Other techniques:**\n\u2022 Additional lubrication\n\u2022 Lidocaine jelly intraurethral (2% lidocaine, 10-20 mL, wait 5 min)\n\u2022 Larger catheter (sometimes passes easier)\n\u2022 Smaller catheter over guide wire (Seldinger technique)\n\n**Common failure points:**\n\u2022 False passage (most common)\n\u2022 BPH obstruction at prostatic urethra\n\u2022 Urethral stricture',
    citation: [1, 7],
    options: [
      {
        label: 'Coude catheter successful',
        description: 'Second attempt with coude tip worked',
        next: 'aur-post-cath',
      },
      {
        label: 'Still unable to pass',
        description: 'Multiple attempts failed',
        next: 'aur-urology-consult',
        urgency: 'urgent',
      },
    ],

    summary: 'Try coude tip (curve UP), extra lidocaine jelly, larger or smaller catheter, Seldinger technique',
  },

  {
    id: 'aur-urology-consult',
    type: 'question',
    module: 3,
    title: 'Urology Consult',
    body: '**Consult urology for:**\n\u2022 Failed standard and coude catheter attempts\n\u2022 Suspected urethral stricture or false passage\n\u2022 Known complex urologic history\n\n**Urology options:**\n\u2022 **Flexible cystoscopy** with guidewire-assisted catheter placement\n\u2022 **Suprapubic catheter** if urethral route not possible\n\n**Suprapubic catheter indications:**\n\u2022 Urethral stricture not amenable to dilation\n\u2022 Urethral trauma\n\u2022 Multiple failed urethral attempts\n\n**While awaiting urology:**\n\u2022 Pain management\n\u2022 Avoid further blind attempts (risk of false passage, bleeding)',
    citation: [1, 7],
    options: [
      {
        label: 'Cystoscopy-assisted catheter successful',
        description: 'Urology placed catheter via scope',
        next: 'aur-post-cath',
      },
      {
        label: 'Suprapubic catheter placed',
        description: 'Suprapubic access required',
        next: 'aur-suprapubic',
      },
    ],

    summary: 'Urology for cystoscopy-guided placement or suprapubic catheter — avoid further blind attempts',
  },

  {
    id: 'aur-suprapubic',
    type: 'result',
    module: 3,
    title: 'Suprapubic Catheter',
    body: '**Post-suprapubic catheter care:**\n\n\u2022 Keep dressing clean and dry\n\u2022 May shower after 24-48 hours (no baths)\n\u2022 Monitor for signs of infection at insertion site\n\u2022 Urology follow-up in 1-2 weeks for evaluation of underlying cause\n\n**Advantages of suprapubic route:**\n\u2022 Avoids urethral trauma\n\u2022 Easier hygiene\n\u2022 Can trial voiding by clamping (while leaving catheter in place)\n\n**Complications to monitor:**\n\u2022 Bowel perforation (rare)\n\u2022 Bleeding\n\u2022 Catheter dislodgement\n\nStart [Tamsulosin](#/drug/tamsulosin/urinary retention) now for TWOC optimization.',
    recommendation: 'Suprapubic catheter care instructions. Start tamsulosin for TWOC optimization. Urology follow-up in 1-2 weeks.',
    confidence: 'recommended',
    citation: [1, 7],
    treatment: {
      firstLine: {
        drug: 'Tamsulosin',
        dose: '0.4 mg',
        route: 'PO',
        frequency: 'Daily',
        duration: 'Until TWOC and urology follow-up',
        notes: 'Take 30 min after same meal daily. Improves TWOC success.',
      },
      monitoring: 'Site inspection for infection. Urine output monitoring. Follow-up with urology.',
    },
  },

  // =====================================================================
  // MODULE 4: POST-OBSTRUCTIVE DIURESIS
  // =====================================================================

  {
    id: 'aur-pod-management',
    type: 'info',
    module: 4,
    title: 'Post-Obstructive Diuresis',
    body: '**Definition:** Urine output >200 mL/hr for 2+ consecutive hours OR >3 L in 24 hours.\n\n**Types:**\n\u2022 **Physiologic POD:** Self-limiting (~24 hours), excretion of retained fluid/solutes\n\u2022 **Pathologic POD:** Persists >48 hours, tubular dysfunction, requires intervention\n\n**Risk factors:**\n\u2022 Bilateral obstruction (or unilateral with solitary kidney)\n\u2022 Chronic retention with elevated creatinine\n\u2022 CHF, edema (excess fluid to mobilize)\n\n**Monitoring:**\n\u2022 Urine output q2h\n\u2022 Vital signs q6-8h\n\u2022 BMP q12-24h (Na, K, Mg, Phos)\n\u2022 Spot urine Na if uncertain type (>40 mEq/L suggests salt-wasting)',
    citation: [6, 8],
    next: 'aur-pod-fluids',

    summary: 'UOP >200mL/hr x2h — physiologic (self-limited ~24h) vs pathologic (>48h); monitor BMP q12-24h',
    safetyLevel: 'warning',
  },

  {
    id: 'aur-pod-fluids',
    type: 'result',
    module: 4,
    title: 'POD Fluid Management',
    body: '**Fluid replacement strategy:**\n\n**General principle:** Replace 50-75% of prior hour urine output.\n\u2022 Do NOT match 100% - this perpetuates diuresis\n\u2022 Use 0.45% NS (half-normal saline) for IV replacement\n\u2022 Encourage oral fluids if patient can drink\n\n**Example:**\nIf UOP was 400 mL in last hour, give 200-300 mL NS over next hour.\n\n**When diuresis slows (<200 mL/hr):**\n\u2022 Reduce replacement to 50% of output\n\u2022 Then transition to maintenance fluids (80-100 mL/hr)\n\n**Electrolyte replacement:**\n\u2022 Monitor and replace K+, Mg, phosphorus as needed\n\n**Admission criteria:**\n\u2022 POD with electrolyte abnormalities\n\u2022 AKI (elevated creatinine)\n\u2022 Hemodynamic instability\n\u2022 Unable to maintain oral intake\n\nRefractory diuresis >48 hours warrants nephrology and/or ICU involvement.',
    recommendation: 'Admit for POD monitoring. Replace 50-75% of urine output. Check electrolytes q12-24h. Nephrology consult if refractory >48h.',
    confidence: 'recommended',
    citation: [6, 8],
    treatment: {
      firstLine: {
        drug: '0.45% NS (Half-Normal Saline)',
        dose: '50-75% of hourly urine output',
        route: 'IV',
        frequency: 'Hourly based on UOP',
        duration: 'Until diuresis resolves',
        notes: 'Do not match 100% - perpetuates diuresis',
      },
      monitoring: 'UOP q2h. Vitals q6-8h. BMP with Mg/Phos q12-24h. Daily weights.',
    },
  },

  // =====================================================================
  // MODULE 5: MEDICATIONS & DISPOSITION
  // =====================================================================

  {
    id: 'aur-bph-meds',
    type: 'info',
    module: 5,
    title: 'BPH Medications',
    body: '**Alpha-blockers (first-line for AUR from BPH):**\n\n[Tamsulosin](#/drug/tamsulosin/urinary retention) 0.4 mg PO daily\n\u2022 Onset: 4-8 hours (some immediate effect)\n\u2022 Selective for alpha-1A receptors (prostate-specific)\n\u2022 Less orthostatic hypotension than non-selective agents\n\u2022 Start AT TIME OF CATHETERIZATION - improves TWOC success\n\u2022 Continue for at least 3-7 days before TWOC attempt\n\n**Evidence:**\nAlpha-blockers increase TWOC success from ~26% to ~48% (OR 2.47) [9]\n\n**5-Alpha Reductase Inhibitors (adjunct):**\n[Finasteride](#/drug/finasteride/bph) 5 mg daily\n\u2022 Shrinks prostate over 3-6 months\n\u2022 NOT helpful acutely - effect takes months\n\u2022 May be started by urology for long-term management\n\n**Common medication causes of AUR to discontinue if possible:**\nAnticholinergics, antihistamines, decongestants, opioids, TCAs',
    citation: [1, 9, 10],
    next: 'aur-twoc',

    summary: 'Tamsulosin 0.4mg at catheterization — improves TWOC success from 26% to 48%, onset 4-8h',
  },

  {
    id: 'aur-twoc',
    type: 'info',
    module: 5,
    title: 'Trial Without Catheter (TWOC)',
    body: '**TWOC = removing catheter and assessing ability to void**\n\n**Timing:**\n\u2022 Optimal: After 3-7 days of alpha-blocker therapy\n\u2022 Early TWOC (3 days) has similar success to late (7 days)\n\u2022 Longer catheterization (7 days) has more complications (UTI, leakage)\n\n**TWOC success factors:**\n\u2022 Younger age (<70)\n\u2022 Lower retention volume (<1000 mL)\n\u2022 Identifiable precipitant (medication, constipation)\n\u2022 Alpha-blocker pretreatment\n\n**TWOC failure predictors:**\n\u2022 Age >70\n\u2022 Retention volume >1000 mL\n\u2022 Prostate volume >40 mL\n\u2022 Previous AUR episode\n\n**Procedure:**\n1. Patient takes morning alpha-blocker\n2. Remove catheter in AM\n3. Have patient void when urge develops\n4. Post-void residual (PVR) via bladder scan\n5. Success = void >150 mL with PVR <100 mL',
    citation: [9, 10],
    next: 'aur-causes',

    summary: 'TWOC optimal after 3-7 days of alpha-blocker — success = void >150mL with PVR <100mL',
    skippable: true,
  },

  {
    id: 'aur-causes',
    type: 'question',
    module: 5,
    title: 'Etiology Assessment',
    body: '**Determine underlying cause for follow-up planning:**\n\n**BPH (most common in men >50):**\n\u2022 Gradual onset of LUTS (frequency, weak stream, nocturia)\n\u2022 History of urinary hesitancy\n\n**Medication-induced:**\n\u2022 Recent start of anticholinergic, opioid, decongestant, antihistamine\n\u2022 Often precipitates in patient with underlying BPH\n\n**Neurogenic:**\n\u2022 Diabetic neuropathy\n\u2022 Multiple sclerosis\n\u2022 Prior spinal cord injury or surgery\n\n**Infectious:**\n\u2022 Prostatitis, UTI\n\n**Malignancy (less common):**\n\u2022 Prostate cancer\n\u2022 Bladder cancer\n\u2022 New pelvic mass',
    citation: [1, 2],
    options: [
      {
        label: 'BPH / Medication-induced',
        description: 'Most common - outpatient management',
        next: 'aur-discharge-bph',
      },
      {
        label: 'Neurogenic / Complex etiology',
        description: 'Needs specialist evaluation',
        next: 'aur-complex',
      },
      {
        label: 'Concern for malignancy',
        description: 'Red flags present',
        next: 'aur-malignancy',
        urgency: 'urgent',
      },
    ],

    summary: 'Determine BPH, medication-induced, neurogenic, infectious, or malignant cause for follow-up planning',
  },

  {
    id: 'aur-discharge-bph',
    type: 'result',
    module: 5,
    title: 'Discharge - BPH / Medication-Induced',
    body: '**Discharge with Foley catheter in place:**\n\n**Medications:**\n\u2022 [Tamsulosin](#/drug/tamsulosin/urinary retention) 0.4 mg PO daily (30 min after same meal daily)\n\n**Catheter leg bag instructions:**\n\u2022 Empty when half to two-thirds full\n\u2022 Keep bag below bladder level at all times\n\u2022 Night drainage bag for sleeping\n\u2022 Clean connection site with alcohol when switching bags\n\u2022 Increase fluid intake to prevent blockage\n\n**Return precautions:**\n\u2022 Fever, chills\n\u2022 No urine draining\n\u2022 Significant hematuria with clots\n\u2022 Severe pain not relieved by medications\n\u2022 Catheter falls out (return to ED)\n\n**Follow-up:**\n\u2022 Urology in 3-7 days for TWOC attempt\n\u2022 If precipitating medication identified: discontinue if possible\n\u2022 Treat constipation if contributing\n\n**Recurrence:**\n~50% of first-time AUR will recur within 1 year. Urology will discuss definitive options (TURP, prostate procedures).',
    recommendation: 'Discharge with Foley. Tamsulosin 0.4 mg daily. Urology follow-up in 3-7 days for TWOC. Return if fever, no drainage, or severe symptoms.',
    confidence: 'definitive',
    citation: [1, 9, 10],
    treatment: {
      firstLine: {
        drug: 'Tamsulosin',
        dose: '0.4 mg',
        route: 'PO',
        frequency: 'Daily',
        duration: 'Continue until TWOC and urology follow-up',
        notes: 'Take 30 minutes after same meal daily. Start in ED.',
      },
      monitoring: 'Return if fever, no urine drainage, severe pain, or catheter dislodgement.',
    },
  },

  {
    id: 'aur-complex',
    type: 'result',
    module: 5,
    title: 'Complex / Neurogenic Etiology',
    body: '**Requires specialist evaluation:**\n\n**Neurogenic bladder workup:**\n\u2022 Urology referral for urodynamic studies\n\u2022 Neurology evaluation if not already established\n\u2022 Consider EMG, MRI if etiology unclear\n\n**Management:**\n\u2022 May need long-term catheterization (indwelling or intermittent self-cath)\n\u2022 Anticholinergics for overactive bladder component (paradoxical - specialist decision)\n\u2022 Botox injections to bladder (urologist)\n\n**In ED:**\n\u2022 Place Foley catheter\n\u2022 Start tamsulosin (still may help)\n\u2022 Arrange close urology follow-up\n\n**If diabetic neuropathy:**\n\u2022 Emphasize glycemic control\n\u2022 May benefit from intermittent self-catheterization training',
    recommendation: 'Foley placement, tamsulosin, urology referral for urodynamics. Neurology evaluation if not established.',
    confidence: 'recommended',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Tamsulosin',
        dose: '0.4 mg',
        route: 'PO',
        frequency: 'Daily',
        duration: 'Until specialist evaluation',
        notes: 'May still improve symptoms even in neurogenic causes',
      },
      monitoring: 'Close urology follow-up. Neurology evaluation. Glycemic control if diabetic.',
    },
  },

  {
    id: 'aur-malignancy',
    type: 'result',
    module: 5,
    title: 'Concern for Malignancy',
    body: '**Red flags suggesting malignancy:**\n\u2022 Weight loss, night sweats, bone pain\n\u2022 Hard, nodular prostate on DRE\n\u2022 Gross hematuria (especially painless)\n\u2022 Rapidly progressive symptoms\n\u2022 Known history of GU malignancy\n\n**ED workup:**\n\u2022 BMP, CBC\n\u2022 PSA (if not recently checked - note: catheterization may falsely elevate)\n\u2022 CT abdomen/pelvis with contrast if gross hematuria or palpable mass\n\n**Disposition:**\n\u2022 Place Foley catheter\n\u2022 **Urgent** urology referral (not routine)\n\u2022 Consider admission if:\n  - Significant hematuria requiring irrigation\n  - Spinal cord compression concern\n  - Severe pain requiring IV analgesia\n\nMost can be discharged with expedited outpatient oncology/urology follow-up.',
    recommendation: 'Foley placement. Labs including PSA. Imaging if indicated. URGENT urology referral. Consider admission for complications.',
    confidence: 'recommended',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Tamsulosin',
        dose: '0.4 mg',
        route: 'PO',
        frequency: 'Daily',
        duration: 'Until urology evaluation',
        notes: 'Still appropriate pending malignancy workup',
      },
      monitoring: 'Urgent urology follow-up within 1 week. Expedited imaging and oncology referral as indicated.',
    },
  },

];

export const URINARY_RETENTION_NODE_COUNT = URINARY_RETENTION_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const URINARY_RETENTION_MODULE_LABELS = [
  'Assessment',
  'Catheterization',
  'Failed Catheterization',
  'Post-Obstructive Diuresis',
  'Medications & Disposition',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const URINARY_RETENTION_CITATIONS: Citation[] = [
  { num: 1, text: 'Gelber J, Bhatt A. Management of Acute Urinary Retention in the Emergency Department. Emerg Med Pract. 2021;23(3):1-28.' },
  { num: 2, text: 'Marshall JR, et al. Acute urinary retention in men: epidemiology, etiology and management. Postgrad Med J. 2019;95(1123):301-306.' },
  { num: 3, text: 'Gitelman A, et al. Cauda equina syndrome: a comprehensive review. Am J Emerg Med. 2017;35(11):1743-1751.' },
  { num: 4, text: 'Chapple C, et al. Lower urinary tract symptoms revisited: a broader clinical perspective. Eur Urol. 2008;54(3):563-569.' },
  { num: 5, text: 'Wagenlehner FM, et al. Diagnosis and management for urosepsis. Int J Urol. 2013;20(10):963-970.' },
  { num: 6, text: 'Boettcher S, et al. Urinary retention: rapid drainage or gradual drainage to avoid complications? A systematic review. Ann Emerg Med. 2013;61(5):523-528.' },
  { num: 7, text: 'Davis NF, et al. Suprapubic versus transurethral bladder catheterization in emergency department patients. Acad Emerg Med. 2018;25(9):983-989.' },
  { num: 8, text: 'Bhutia KL, Suri A. Post-obstructive diuresis: pathophysiology and management. Indian J Urol. 2019;35(4):265-270.' },
  { num: 9, text: 'Fitzpatrick JM, et al. Management of acute urinary retention: a worldwide survey of 6074 men with benign prostatic hyperplasia. BJU Int. 2012;109(1):88-95.' },
  { num: 10, text: 'McNeill SA, et al. Alfuzosin once daily facilitates return to voiding in patients in acute urinary retention. J Urol. 2004;171(6 Pt 1):2316-2320.' },
];

// -------------------------------------------------------------------
// Clinical Notes (for reference table)
// -------------------------------------------------------------------

export const URINARY_RETENTION_CLINICAL_NOTES: string[] = [
  'Rapid vs gradual bladder drainage is equivalent - no need to clamp at 200-500 mL intervals. Complete drainage is safe.',
  'Start tamsulosin AT TIME OF CATHETERIZATION - do not wait. Improves TWOC success from 26% to 48%.',
  'Coude catheter should be considered first-line in older men with suspected BPH - curved tip navigates prostatic urethra.',
  'Post-obstructive diuresis = >200 mL/hr for 2+ hours. Replace 50-75% of output - do NOT match 100% (perpetuates diuresis).',
  'TWOC optimal timing: 3-7 days after starting alpha-blocker. Early TWOC (3 days) has similar success to late (7 days).',
  'Women and children with AUR are rare - strongly consider neurogenic causes (cauda equina, spinal cord pathology).',
  'In uncircumcised men: ALWAYS reduce foreskin after catheter placement to prevent paraphimosis.',
];
