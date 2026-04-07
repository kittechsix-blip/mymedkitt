// MedKitt — Massive Hemoptysis (ABCDE Approach)
// ABCDE: Airway → Block → Cause a Clot → Definitive Therapy → Extras
// 6 modules: Recognition → Airway → Stabilization → Medical Management → Definitive Therapy → Disposition
// ~28 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const MASSIVE_HEMOPTYSIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'hemo-start',
    type: 'info',
    module: 1,
    title: 'Massive Hemoptysis',
    body: '**Life-threatening hemoptysis** = any volume causing:\n• Airway obstruction\n• Respiratory failure\n• Hemodynamic instability\n\n**Volume thresholds (no consensus):**\n• Classic: ≥600 mL/24h\n• Alternative: ≥200 mL/single episode OR ≥100 mL/hr\n• Best mortality predictor: ≥300 mL expectorated [1]\n\n**Key insight:** Adult tracheobronchial space is only 150-200 mL — even "small" volumes can cause asphyxiation. **Death is from hypoxemia (drowning), not exsanguination.**\n\n[ABCDE Cognitive Aid](#/info/hemo-abcde)',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'txa-hemoptysis', label: 'TXA Dosing Calculator' },
      { id: 'coag-reversal', label: 'Coagulopathy Reversal' },
    ],
    next: 'hemo-etiology',
  },

  {
    id: 'hemo-etiology',
    type: 'info',
    module: 1,
    title: 'Etiology',
    body: '**US/Developed Countries:**\n| Cause | Frequency |\n|-------|----------|\n| Bronchiectasis | 20-30% |\n| Bronchogenic CA | 20-25% |\n| Chronic bronchitis | 15-20% |\n| Pneumonia | 10-15% |\n| Mycetoma/aspergilloma | 5-10% |\n\n**Worldwide:** TB is most common (7-85% by region) [1][2]\n\n**Other causes:**\n• Vascular: PE, pulmonary AVM, Rasmussen aneurysm (TB)\n• Iatrogenic: Post-biopsy, PA catheter perforation\n• Autoimmune: Goodpasture, GPA (Wegener), DAH\n• Cardiac: Mitral stenosis\n\n**Source:** ~90% from bronchial arteries (systemic pressure), 5% pulmonary, 5% collaterals [1]',
    citation: [1, 2],
    next: 'hemo-initial',
  },

  {
    id: 'hemo-initial',
    type: 'question',
    module: 1,
    title: 'Initial Assessment',
    body: '**Simultaneous actions:**\n1. Supplemental O₂ (target SpO₂ >92%)\n2. Large-bore IV x2\n3. Type & crossmatch\n4. STAT labs: CBC, BMP, coags (INR, PTT, fibrinogen), ABG\n5. Review medications (anticoagulants, antiplatelets)\n\n**STAT portable CXR** — may lateralize bleeding (~50% sensitivity)\n\nWhat is the patient\'s hemodynamic and respiratory status?',
    citation: [1],
    options: [
      {
        label: 'Stable — clearing blood effectively',
        next: 'hemo-stable-workup',
      },
      {
        label: 'Unstable — respiratory failure / hypotension',
        next: 'hemo-positioning',
        urgency: 'critical',
      },
      {
        label: 'Arrest / peri-arrest',
        next: 'hemo-arrest',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'hemo-stable-workup',
    type: 'info',
    module: 1,
    title: 'Stable Patient Workup',
    body: '**CT Chest with IV Contrast** (bronchial artery protocol preferred)\n• CT before bronchoscopy has superior yield (~75% vs ~50%) [2]\n• Identifies source, etiology, bronchial artery anatomy for IR\n\n**While awaiting CT:**\n• Continuous SpO₂ monitoring\n• Have airway equipment ready\n• Position patient if side known\n• Start [TXA](#/drug/txa/hemoptysis) empirically\n\n**Low threshold to escalate** — edema/clot can compromise airway rapidly [1][2]',
    citation: [1, 2],
    next: 'hemo-medical-start',
  },

  // =====================================================================
  // MODULE 2: AIRWAY (A = Airway, B = Block)
  // =====================================================================

  {
    id: 'hemo-positioning',
    type: 'info',
    module: 2,
    title: 'Positioning — Bleeding Side DOWN',
    body: '**Lateral decubitus with bleeding lung DOWN**\n• Uses gravity to prevent spillage into unaffected lung\n• Apply as soon as bleeding is lateralized\n• Prioritize lung protection over V/Q matching [1]\n\n**If side unknown:** Patient upright or semi-recumbent to minimize aspiration.\n\n**Up to 35% plasma volume** can extravasate during severe hemoptysis — lay flat only after hemorrhage control or intubation.',
    citation: [1, 2],
    next: 'hemo-airway-decision',
  },

  {
    id: 'hemo-airway-decision',
    type: 'question',
    module: 2,
    title: 'Airway Decision',
    body: '**Indications for intubation:**\n• Ineffective cough with blood accumulation\n• Worsening hypoxemia (SpO₂ <90% despite O₂)\n• Altered mental status\n• Hemodynamic instability\n• Procedural airway control needed [1]\n\nDoes the patient need intubation?',
    citation: [1],
    options: [
      {
        label: 'No — adequate airway protection',
        next: 'hemo-medical-start',
      },
      {
        label: 'Yes — proceed with intubation',
        next: 'hemo-ett-selection',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'hemo-ett-selection',
    type: 'info',
    module: 2,
    title: 'ETT Selection & Intubation',
    body: '**Use LARGE ETT:**\n| Patient | Minimum ETT |\n|---------|-------------|\n| Average/tall men | 9.0 mm |\n| Average women | 8.0-8.5 mm |\n| General rule | ≥8.5 mm ID |\n\n**Rationale:** Facilitates bronchoscopy, endobronchial blocker placement, and suctioning [1][2]\n\n**Why NOT double-lumen ETT:**\n• Difficult emergent placement\n• Narrow lumens clog with blood\n• Cannot pass therapeutic bronchoscope\n• Only 7% of physicians advocate for initial DLT [2]',
    citation: [1, 2],
    next: 'hemo-lung-isolation',
  },

  {
    id: 'hemo-lung-isolation',
    type: 'info',
    module: 2,
    title: 'Single-Lung Isolation',
    body: '**Option 1: Mainstem Intubation**\n• Advance ETT into unaffected bronchus\n• Use bougie with 1/4 turn technique\n• Right mainstem easier to cannulate\n\n**Option 2: Endobronchial Blocker** (preferred)\n• Options: Arndt, Cohen, EZ-Blocker, Fuji Uniblocker\n• Can isolate lobar/segmental bronchus (vs whole lung)\n• Temporizing measure for 48-72 hours [1]\n\n**Confirmation:** Fiberoptic bronchoscopy through ETT to verify position [2]',
    citation: [1, 2],
    next: 'hemo-medical-start',
  },

  {
    id: 'hemo-arrest',
    type: 'info',
    module: 2,
    title: 'Arrest / Peri-Arrest Management',
    body: '**Immediate actions:**\n1. Intubate with large ETT (≥8.5 mm)\n2. If side known: advance ETT into contralateral mainstem bronchus\n3. Suction aggressively\n4. Standard ACLS resuscitation\n\n**Consider:**\n• Emergent rigid bronchoscopy if available\n• VA-ECMO if refractory arrest from reversible cause\n• Emergent thoracotomy (massive trauma with hemothorax source)\n\n**Treat the underlying cause** — this is a potentially reversible etiology [1]',
    citation: [1],
    next: 'hemo-medical-start',
  },

  // =====================================================================
  // MODULE 3: STABILIZATION (C = Cause a Clot)
  // =====================================================================

  {
    id: 'hemo-medical-start',
    type: 'info',
    module: 3,
    title: 'Medical Management — "Cause a Clot"',
    body: '**Hemostatic therapies:**\n1. [Tranexamic Acid (TXA)](#/drug/txa/hemoptysis) — first-line\n2. Cold saline lavage\n3. Topical vasoconstrictors (bronchoscopic)\n4. Coagulopathy reversal\n\n**Pneumonic: The 5 C\'s** [2]\n• **C**ompression (wedge, balloon)\n• **C**old (ice saline lavage)\n• **C**oagulants (TXA, thrombin)\n• **C**austeries (APC, electrocautery)\n• **C**onstriction (vasoconstrictors)',
    citation: [1, 2],
    next: 'hemo-txa',
  },

  {
    id: 'hemo-txa',
    type: 'info',
    module: 3,
    title: 'Tranexamic Acid (TXA)',
    body: '**Nebulized TXA (preferred):**\n| Regimen | Dose |\n|---------|------|\n| Loading | 1000 mg nebulized x1 |\n| Maintenance | 500 mg nebulized q8h |\n| Alternative | 250-500 mg q6-12h |\n\n**IV TXA (if neb impairs expectoration):**\n• 500 mg IV TID\n• Or standard trauma: 1g bolus → 1g over 8h\n\n**Bronchoscopic instillation:**\n• 500 mg diluted in 15 mL NS\n\n**Evidence:** RCT showed 96% bleeding resolution within 5 days (TXA) vs 50% (placebo) — note: massive hemoptysis patients excluded [1][3]',
    citation: [1, 3],
    next: 'hemo-lavage',
    treatment: {
      firstLine: {
        drug: 'Tranexamic Acid',
        dose: '1000 mg nebulized, then 500 mg q8h',
        route: 'Nebulized',
        frequency: 'Q8 hours',
        duration: 'Until bleeding controlled',
        notes: 'Alternative: 500 mg IV TID if nebulizer impairs expectoration',
      },
      monitoring: 'Bleeding volume, respiratory status, clot formation',
    },
  },

  {
    id: 'hemo-lavage',
    type: 'info',
    module: 3,
    title: 'Cold Saline Lavage',
    body: '**Technique (bronchoscopic):**\n• 50 mL aliquots of saline at 4°C\n• Average total: ~500 mL until bleeding stops\n• Mechanism: vasoconstriction\n\n**Adverse effect:** Transient sinus bradycardia [2]\n\n**Topical Vasoconstrictors:**\n| Agent | Dose |\n|-------|------|\n| [Epinephrine](#/drug/epinephrine/hemoptysis topi) | 2 mL of 1:10,000 (0.1 mg/mL) |\n| [Phenylephrine](#/drug/phenylephrine/hemoptysis) | 5 mL of 80-100 mcg/mL |\n\n**Caution with epinephrine:** Risk of fatal arrhythmia reported [2]',
    citation: [2],
    next: 'hemo-coag-reversal',
  },

  {
    id: 'hemo-coag-reversal',
    type: 'question',
    module: 3,
    title: 'Coagulopathy Assessment',
    body: '**Check for anticoagulant/antiplatelet use:**\n\nIs the patient on anticoagulation or antiplatelet therapy?',
    options: [
      {
        label: 'Warfarin',
        next: 'hemo-warfarin-reversal',
        urgency: 'urgent',
      },
      {
        label: 'DOAC (dabigatran, rivaroxaban, apixaban, edoxaban)',
        next: 'hemo-doac-reversal',
        urgency: 'urgent',
      },
      {
        label: 'Heparin / LMWH',
        next: 'hemo-heparin-reversal',
        urgency: 'urgent',
      },
      {
        label: 'Not anticoagulated / unknown',
        next: 'hemo-bronchoscopy',
      },
    ],
  },

  {
    id: 'hemo-warfarin-reversal',
    type: 'result',
    module: 3,
    title: 'Warfarin Reversal',
    body: '| Agent | Dose | Onset |\n|-------|------|-------|\n| [Vitamin K](#/drug/vitamin-k/hemoptysis) | 10 mg IV over 30 min | 6-12 hours |\n| [4-Factor PCC](#/drug/kcentra/hemoptysis) | 25-50 units/kg | Minutes |\n| FFP (if PCC unavailable) | 15 mL/kg | After thaw |\n\n**CRITICAL:** Give Vitamin K WITH PCC/FFP. PCC/FFP effect lasts ~8 hours; Vitamin K takes 6-12 hours to work [1]',
    recommendation: 'Reverse warfarin with 4F-PCC + Vitamin K. PCC provides immediate reversal; Vitamin K sustains it.',
    confidence: 'recommended',
    citation: [1],
    treatment: {
      firstLine: {
        drug: '4-Factor PCC (Kcentra)',
        dose: '25-50 units/kg IV (based on INR)',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'INR 2-4: 25 u/kg; INR 4-6: 35 u/kg; INR >6: 50 u/kg',
      },
      alternative: {
        drug: 'Vitamin K (phytonadione)',
        dose: '10 mg IV over 30 minutes',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'MUST give with PCC. Takes 6-12 hours for effect.',
      },
      monitoring: 'Repeat INR 30 min post-PCC and q6h',
    },
  },

  {
    id: 'hemo-doac-reversal',
    type: 'result',
    module: 3,
    title: 'DOAC Reversal',
    body: '**Direct thrombin inhibitor (Dabigatran):**\n• [Idarucizumab](#/drug/idarucizumab/hemoptysis) (Praxbind) 5g IV\n\n**Factor Xa inhibitors (rivaroxaban, apixaban, edoxaban):**\n• [Andexanet alfa](#/drug/andexanet/hemoptysis) (if available)\n• OR [4-Factor PCC](#/drug/kcentra/hemoptysis) 50 units/kg [1]',
    recommendation: 'Reverse dabigatran with idarucizumab. For Xa inhibitors, use andexanet alfa or 4F-PCC.',
    confidence: 'recommended',
    citation: [1],
    treatment: {
      firstLine: {
        drug: 'Idarucizumab (dabigatran)',
        dose: '5g IV (two 2.5g vials)',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Specific for dabigatran only',
      },
      alternative: {
        drug: '4-Factor PCC (Xa inhibitors)',
        dose: '50 units/kg IV',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'For rivaroxaban, apixaban, edoxaban if andexanet unavailable',
      },
      monitoring: 'Clinical bleeding assessment. Standard coags do not reflect DOAC reversal.',
    },
  },

  {
    id: 'hemo-heparin-reversal',
    type: 'result',
    module: 3,
    title: 'Heparin Reversal',
    body: '**Unfractionated Heparin:**\n• [Protamine](#/drug/protamine/hemoptysis) 1 mg per 100 units heparin (max 50 mg)\n• Dose based on heparin given in last 2-3 hours\n\n**LMWH (enoxaparin):**\n• Protamine reverses ~60% of effect\n• 1 mg protamine per 1 mg enoxaparin (if within 8 hours)\n\n**Note:** Protamine can cause hypotension, bradycardia, anaphylaxis [1]',
    recommendation: 'Reverse UFH with protamine. LMWH only partially reversed.',
    confidence: 'recommended',
    citation: [1],
    treatment: {
      firstLine: {
        drug: 'Protamine',
        dose: '1 mg per 100 units UFH (max 50 mg)',
        route: 'IV over 10 min',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Based on heparin given in last 2-3 hours. Watch for anaphylaxis.',
      },
      monitoring: 'aPTT, vital signs, watch for hypotension/bradycardia',
    },
  },

  // =====================================================================
  // MODULE 4: DEFINITIVE THERAPY (D = Definitive)
  // =====================================================================

  {
    id: 'hemo-bronchoscopy',
    type: 'question',
    module: 4,
    title: 'Bronchoscopy',
    body: '**Flexible bronchoscopy:**\n• Localizes bleeding (93% success)\n• Can perform at bedside/ICU\n• Limited suction capacity, blood obscures view\n\n**Rigid bronchoscopy:**\n• Superior suction and visualization\n• Therapeutic: packing, APC, laser\n• Requires OR + general anesthesia\n\n**Recommendation:** Flexible first for localization; rigid if therapeutic intervention needed or massive bleeding [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Bleeding localized → proceed to BAE',
        next: 'hemo-bae',
        urgency: 'urgent',
      },
      {
        label: 'Cannot localize → CT chest then BAE',
        next: 'hemo-bae',
      },
      {
        label: 'Bleeding controlled with bronchoscopy',
        next: 'hemo-icu-admit',
      },
    ],
  },

  {
    id: 'hemo-bae',
    type: 'info',
    module: 4,
    title: 'Bronchial Artery Embolization (BAE)',
    body: '**First-line definitive therapy for most patients** [1][2]\n\n**Success rates:**\n• Technical success: 92-97%\n• Clinical success: 70-93%\n• Recurrence: 10-58% (varies by etiology)\n• Major complication rate: 0.1%\n\n**Embolization materials:**\n• PVA particles (355-500 µm) — CIRSE recommended\n• N-butyl cyanoacrylate (NBCA) — lowest recurrence\n• Coils, Gelfoam\n\n**High recurrence risk:**\n• Aspergilloma/mycetoma (highest)\n• Tuberculosis\n• Bronchiectasis\n• Non-bronchial collateral supply [2]',
    citation: [1, 2],
    next: 'hemo-surgery-consider',
  },

  {
    id: 'hemo-surgery-consider',
    type: 'question',
    module: 4,
    title: 'Surgery Considerations',
    body: '**Surgical indications:**\n1. BAE technical failure\n2. Recurrent hemoptysis despite multiple BAEs\n3. Life-threatening bleeding precluding safe BAE\n4. Localized, resectable lesion with adequate pulmonary reserve\n\n**Procedures:** Lobectomy (preferred) > bi-lobectomy > pneumonectomy\n\n**Mortality:**\n• Emergency surgery: 10-40%\n• Pneumonectomy: 2x mortality vs lobectomy [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'BAE successful — no surgery',
        next: 'hemo-icu-admit',
      },
      {
        label: 'BAE failed or recurrent — surgery indicated',
        next: 'hemo-surgery',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'hemo-surgery',
    type: 'result',
    module: 4,
    title: 'Surgical Intervention',
    body: '**Best surgical candidates:**\n• Previously healthy patients\n• Localized disease (aspergilloma, broncholith, abscess)\n• Adequate FEV1 for resection\n\n**Poor surgical candidates:**\n• Diffuse lung disease (COPD, bronchiectasis)\n• Advanced malignancy\n• Bilateral disease\n\n**Consult CT Surgery EARLY** — even if BAE planned, surgery may be needed as backup [1]',
    recommendation: 'CT surgery consult for surgical evaluation. Lobectomy preferred over pneumonectomy.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  // =====================================================================
  // MODULE 5: EXTRAS (E = Extras)
  // =====================================================================

  {
    id: 'hemo-extras',
    type: 'info',
    module: 5,
    title: 'Additional Therapies',
    body: '**Vasopressin analogues (case reports only):**\n• [Terlipressin](#/drug/terlipressin/hemoptysis) (Glypressin) — IV or endobronchial\n• Endobronchial has similar efficacy with 251x lower plasma concentration\n• [Desmopressin](#/drug/desmopressin/hemoptysis) — used in CF, leptospirosis\n\n**Bronchoscopic hemostatic agents:**\n• Oxidized regenerated cellulose (Surgicel)\n• Thrombin/fibrin glue\n• Argon plasma coagulation (APC)\n• Electrocautery, laser [2]',
    citation: [2],
    next: 'hemo-icu-admit',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'hemo-icu-admit',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**All massive/life-threatening hemoptysis requires ICU.**\n\n**ICU indications:**\n• Any massive hemoptysis\n• Ongoing bleeding despite initial treatment\n• Respiratory failure or intubation\n• Hemodynamic instability\n• Post-BAE or bronchoscopy monitoring\n• Active coagulopathy reversal [1]\n\n**Consults:**\n• Interventional Radiology (BAE)\n• Interventional Pulmonology\n• CT Surgery (backup for BAE failure)',
    recommendation: 'ICU admission for all massive hemoptysis. Continue monitoring, consult IR/IP/CT surgery.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  {
    id: 'hemo-transfer',
    type: 'result',
    module: 6,
    title: 'Transfer Considerations',
    body: '**Transfer if your facility lacks:**\n• Interventional radiology with BAE capability\n• Interventional pulmonology\n• Cardiothoracic surgery\n• ICU with ventilator capability\n\n**Stabilize and transfer EARLY** — do not delay for diagnostic workup.\n\n**Transfer essentials:**\n• Large-bore IV access (x2)\n• Intubated with large ETT if airway threatened\n• Bleeding side down positioning\n• TXA started\n• Type & screen/crossmatch completed [1]',
    recommendation: 'Transfer early if lacking BAE, IP, or CT surgery. Stabilize before transfer.',
    confidence: 'recommended',
    citation: [1],
  },

];

export const MASSIVE_HEMOPTYSIS_MODULE_LABELS = [
  'Recognition',
  'Airway & Positioning',
  'Stabilization',
  'Definitive Therapy',
  'Additional Therapies',
  'Disposition',
];

export const MASSIVE_HEMOPTYSIS_CRITICAL_ACTIONS = [
  { text: 'Position patient bleeding-side down (protect good lung from blood)', nodeId: 'hemopty-position' },
  { text: 'Intubate with largest ETT possible (≥8.0) for bronchoscopy and isolation', nodeId: 'hemopty-intubate' },
  { text: 'Double-lumen tube or bronchial blocker for lung isolation if available', nodeId: 'hemopty-isolation' },
  { text: 'TXA 1 g IV over 10 min (may reduce bleeding)', nodeId: 'hemopty-txa' },
  { text: 'Reverse anticoagulation urgently (4-factor PCC, protamine, idarucizumab as indicated)', nodeId: 'hemopty-reverse' },
  { text: 'IR consult for emergent bronchial artery embolization (definitive treatment)', nodeId: 'hemopty-ir' },
  { text: 'Rigid bronchoscopy for massive bleeding (better suction/hemostasis than flexible)', nodeId: 'hemopty-rigid-bronch' },
  { text: 'Avoid cough suppressants (retained blood → airway obstruction)', nodeId: 'hemopty-avoid-suppress' },
];

export const MASSIVE_HEMOPTYSIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Farkas J. Severe Hemoptysis. Internet Book of Critical Care (IBCC). December 2024.' },
  { num: 2, text: 'Radchenko C, et al. A Systematic Approach to the Management of Massive Hemoptysis. J Thorac Dis. 2017;9(Suppl 10):S1069-S1086.' },
  { num: 3, text: 'Wand O, et al. Inhaled Tranexamic Acid for Hemoptysis Treatment: A Randomized Controlled Trial. Chest. 2018;154(6):1379-1384.' },
  { num: 4, text: 'ATS Scholar. ABCDE Approach for Massive Hemoptysis. American Thoracic Society. 2022.' },
  { num: 5, text: 'EM Cases. Hemoptysis ED Approach and Management. Emergency Medicine Cases. 2023.' },
  { num: 6, text: 'CIRSE. Standards of Practice in Bronchial Artery Embolization. Cardiovasc Intervent Radiol. 2021.' },
];
