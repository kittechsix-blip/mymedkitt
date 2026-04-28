// MedKitt - Blood Transfusions
// Comprehensive transfusion medicine: MTP activation, component therapy, complications, special situations
// Evidence-based protocols from EMCrit, trauma guidelines, AABB standards
// 8 modules: Overview -> MTP -> Components -> Complications -> TACO vs TRALI -> Special Situations -> Adjuncts -> Quick Reference
// Pharmacist category consult

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction, Citation } from '../../services/tree-service.js';

export const BLOOD_TRANSFUSIONS_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'MTP activation: ABC score ≥2 or Shock Index ≥1.0; 1:1:1 ratio (PRBC:FFP:platelets)', nodeId: 'bt-mtp-protocol' },
  { text: 'TXA within 3 hours of injury: 1g bolus over 10 min, then 1g over 8h (max benefit <1h)', nodeId: 'bt-txa' },
  { text: 'Calcium replacement: 1g calcium every 4 units PRBCs; target iCa >1.1 mmol/L', nodeId: 'bt-calcium' },
  { text: 'Acute hemolytic reaction: STOP transfusion, verify ID, fluids + bicarb for renal protection', nodeId: 'bt-ahtr' },
  { text: 'TACO vs TRALI: BNP elevated = TACO (responds to diuretics); BNP normal = TRALI (supportive only)', nodeId: 'bt-taco-trali' },
  { text: 'Hypocalcemia impairs coagulation cascade - must repleted during massive transfusion', nodeId: 'bt-calcium' },
];

export const BLOOD_TRANSFUSIONS_MODULE_LABELS: string[] = [
  'Overview & Indications',
  'Massive Transfusion Protocol',
  'Component Therapy',
  'Complications',
  'TACO vs TRALI',
  'Special Situations',
  'Adjuncts',
  'Quick Reference',
];

export const BLOOD_TRANSFUSIONS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: OVERVIEW & INDICATIONS
  // =====================================================================

  {
    id: 'bt-start',
    type: 'question',
    module: 1,
    title: 'Blood Transfusions',
    body: '**Comprehensive Transfusion Medicine Guide**\n\nEvidence-based protocols for emergency and critical care.\n\n**Key Topics:**\n\n**Massive Transfusion Protocol:**\n- Activation criteria (ABC score, Shock Index)\n- 1:1:1 ratio, cooler contents\n\n**Component Therapy:**\n- PRBCs, FFP, platelets, cryoprecipitate\n- Restrictive vs liberal thresholds\n\n**Complications:**\n- TACO, TRALI, hemolytic reactions\n- Hypocalcemia, hyperkalemia, hypothermia\n\n**Adjuncts:**\n- TXA, calcium replacement, PCC\n\nSelect topic:',
    citation: [1, 2],
    options: [
      { label: 'Massive Transfusion Protocol', next: 'bt-mtp-overview' },
      { label: 'Component Therapy', next: 'bt-component-overview' },
      { label: 'Transfusion Complications', next: 'bt-complications-overview' },
      { label: 'TACO vs TRALI', next: 'bt-taco-trali' },
      { label: 'Special Situations', next: 'bt-special-overview' },
      { label: 'Adjuncts (TXA, Calcium, PCC)', next: 'bt-adjuncts-overview' },
      { label: 'Quick Reference', next: 'bt-quick-reference' },
    ],
    summary: 'Transfusion guide: MTP, components, complications, TACO/TRALI, special situations, adjuncts',
  },

  // =====================================================================
  // MODULE 2: MASSIVE TRANSFUSION PROTOCOL
  // =====================================================================

  {
    id: 'bt-mtp-overview',
    type: 'question',
    module: 2,
    title: 'Massive Transfusion Protocol',
    body: '**When to Activate MTP**\n\n**ABC Score (Assessment of Blood Consumption):**\n- 1 point each:\n  - HR ≥120 bpm\n  - SBP ≤90 mmHg\n  - Penetrating torso injury\n  - Positive FAST exam\n- **Score ≥2:** 75% sensitivity, 86% specificity for MT need\n\n**Shock Index (SI = HR/SBP):**\n- **SI ≥1.0:** Stronger predictor than ABC\n- AUROC 0.83, Sens 67.7%, Spec 81.3%\n\n**Clinical Triggers:**\n- Ongoing hemorrhagic shock despite 2L crystalloid\n- Persistent SBP <90 despite fluids\n- Visible ongoing hemorrhage + hemodynamic instability\n\nSelect topic:',
    citation: [1, 2, 3],
    options: [
      { label: 'MTP Protocol Details', next: 'bt-mtp-protocol' },
      { label: 'Product Ratios & Cooler', next: 'bt-mtp-cooler' },
      { label: 'Deactivation Criteria', next: 'bt-mtp-deactivate' },
      { label: 'Back to Overview', next: 'bt-start' },
    ],
    summary: 'MTP activation: ABC score ≥2 or SI ≥1.0; ongoing hemorrhagic shock despite resuscitation',
  },

  {
    id: 'bt-mtp-protocol',
    type: 'info',
    module: 2,
    title: 'MTP Protocol',
    body: '**MASSIVE TRANSFUSION PROTOCOL**\n\n**Definition:** ≥10 units PRBCs in 24h OR ≥4 units in 1 hour with ongoing bleeding\n\n**1:1:1 Ratio (Standard MTP):**\n- 1 PRBC : 1 FFP : 1 platelet unit\n- Approximates whole blood composition\n- Evidence supports survival benefit\n\n**Activation Steps:**\n1. Call blood bank: "Activate MTP"\n2. Provide patient location, 2 identifiers\n3. First cooler arrives in ~10 min\n4. Send type & screen (don\'t delay transfusion)\n\n**Initial Resuscitation:**\n- O negative PRBCs (uncrossmatched)\n- Limit crystalloid (increases coagulopathy)\n- Warm all products\n- Give TXA within 3 hours\n- Calcium replacement every 4 units\n\n**Monitoring:**\n- Labs q30-60 min: CBC, PT/INR, fibrinogen, iCa, lactate\n- TEG/ROTEM if available (goal-directed)\n\n**Target thresholds during MTP:**\n- Fibrinogen >150-200 mg/dL\n- Platelets >50k (>100k if CNS bleed)\n- INR <1.5\n- iCa >1.1 mmol/L',
    citation: [1, 2, 3],
    options: [
      { label: 'Cooler Contents', next: 'bt-mtp-cooler' },
      { label: 'TXA Protocol', next: 'bt-txa' },
      { label: 'Calcium Protocol', next: 'bt-calcium' },
      { label: 'Back to MTP Overview', next: 'bt-mtp-overview' },
    ],
    summary: 'MTP: 1:1:1 ratio (PRBC:FFP:plt); O neg first; TXA + calcium; labs q30-60min; target fib >150, plt >50k',
  },

  {
    id: 'bt-mtp-cooler',
    type: 'info',
    module: 2,
    title: 'MTP Cooler Contents',
    body: '**TYPICAL MTP COOLER CONTENTS**\n\n**First Cooler (Emergency Release):**\n- 4 units O negative PRBCs (uncrossmatched)\n- 2 units FFP (thawed or liquid plasma)\n- 1 unit platelet concentrate (pooled)\n- TXA 1g preloaded (some institutions)\n\n**Subsequent Coolers:**\n- 4-6 units type-specific PRBCs\n- 4 units FFP\n- 1-2 units platelets\n- 10 units cryoprecipitate (if fibrinogen low)\n\n**Whole Blood (If Available):**\n- Approximates 1:1:1 naturally\n- Lower citrate burden\n- Reduces transfusion volume\n- Not widely available in US\n\n**Important Notes:**\n- FFP takes 20-30 min to thaw (have bank start early)\n- Platelets stored at room temp (bacterial risk higher)\n- Warm all products (prevent hypothermia)\n- Each cooler arrival = reassess bleeding status',
    citation: [1, 2],
    options: [
      { label: 'Back to MTP Protocol', next: 'bt-mtp-protocol' },
      { label: 'Deactivation Criteria', next: 'bt-mtp-deactivate' },
    ],
    summary: 'MTP cooler: 4 O neg PRBCs, 2 FFP, 1 plt unit; FFP takes 20-30 min to thaw; warm all products',
  },

  {
    id: 'bt-mtp-deactivate',
    type: 'info',
    module: 2,
    title: 'MTP Deactivation',
    body: '**WHEN TO DEACTIVATE MTP**\n\n**Deactivation Criteria:**\n- Hemorrhage controlled (surgery, IR, direct pressure)\n- Hemodynamic stability achieved\n- No ongoing massive transfusion requirement\n- Coagulopathy corrected (INR normalized, fibrinogen adequate)\n- No further transfusions anticipated in next 4 hours\n\n**Transition to Standard Transfusion:**\n- Switch to type-specific blood\n- Continue monitoring labs\n- Maintain restrictive thresholds\n\n**Post-MTP Monitoring:**\n- Watch for delayed complications:\n  - TACO (circulatory overload)\n  - TRALI (lung injury)\n  - Delayed hemolytic reaction (3-10 days)\n- Check fibrinogen, platelets, calcium\n- Reassess need for additional products\n\n**Communication:**\n- Notify blood bank: "Deactivate MTP"\n- Return unused products promptly\n- Document total products given',
    citation: [1, 2],
    options: [
      { label: 'Back to MTP Overview', next: 'bt-mtp-overview' },
      { label: 'Complications Overview', next: 'bt-complications-overview' },
    ],
    summary: 'Deactivate MTP when: hemorrhage controlled, hemodynamically stable, coagulopathy corrected, no further MT needed',
  },

  // =====================================================================
  // MODULE 3: COMPONENT THERAPY
  // =====================================================================

  {
    id: 'bt-component-overview',
    type: 'question',
    module: 3,
    title: 'Component Therapy',
    body: '**Blood Component Selection**\n\n**PRBCs:**\n- Restrictive threshold: Hgb <7 g/dL (stable)\n- Liberal threshold: Hgb <9-10 g/dL (shock, cardiac)\n- 1 unit = ↑Hgb ~1 g/dL\n\n**FFP:**\n- PT/aPTT >1.5x normal with bleeding\n- Fibrinogen <1.0 g/L with bleeding\n- Dose: 10-15 mL/kg\n\n**Platelets:**\n- Active bleed + plt <50k\n- Procedure: plt >50k needed\n- 1 transfusion = ↑plt 5-10k\n\n**Cryoprecipitate:**\n- Fibrinogen <1.0-1.5 g/L with bleeding\n- 10 units ↑fibrinogen ~75 mg/dL\n\nSelect component:',
    citation: [4, 5],
    options: [
      { label: 'PRBCs (Red Cells)', next: 'bt-prbc' },
      { label: 'FFP (Plasma)', next: 'bt-ffp' },
      { label: 'Platelets', next: 'bt-platelets' },
      { label: 'Cryoprecipitate', next: 'bt-cryo' },
      { label: 'Back to Overview', next: 'bt-start' },
    ],
    summary: 'Component therapy: PRBCs (Hgb <7 restrictive), FFP (PT >1.5x), platelets (<50k + bleed), cryo (fib <1.0)',
  },

  {
    id: 'bt-prbc',
    type: 'info',
    module: 3,
    title: 'PRBCs (Packed Red Blood Cells)',
    body: '**PACKED RED BLOOD CELLS**\n\n**Indications:**\n- Acute hemorrhage requiring O2-carrying capacity\n- Symptomatic anemia\n\n**Hemoglobin Thresholds:**\n\n**Restrictive (Stable Patients):**\n- Transfuse if Hgb <7 g/dL\n- Outcomes equivalent or better than liberal\n- Use in most ICU, surgical, GI bleed patients\n\n**Liberal (Specific Indications):**\n- Hgb <9-10 g/dL\n- Active hemorrhagic shock\n- Acute coronary syndrome\n- Symptomatic cardiac disease\n- Elderly with cardiac risk\n\n**Dosing:**\n- 1 unit PRBC = ~450-500 mL\n- 1 unit increases Hgb ~1 g/dL (or Hct 3%)\n- **Pediatric:** 10-20 mL/kg (5-10 mL/kg ↑Hgb 10 g/L)\n\n**Administration:**\n- Use blood warmer for rapid transfusion\n- Standard rate: 2-4 hours per unit\n- Emergency: wide open (minutes)\n- Never add medications to blood',
    citation: [4, 5],
    options: [
      { label: 'Back to Component Overview', next: 'bt-component-overview' },
    ],
    summary: 'PRBCs: restrictive Hgb <7 (stable), liberal <9-10 (ACS/shock); 1 unit ↑Hgb 1 g/dL; peds 10-20 mL/kg',
  },

  {
    id: 'bt-ffp',
    type: 'info',
    module: 3,
    title: 'Fresh Frozen Plasma (FFP)',
    body: '**FRESH FROZEN PLASMA**\n\n**Indications:**\n- PT >1.5x normal with active bleeding\n- aPTT >1.5x normal with active bleeding\n- Fibrinogen <1.0 g/L with bleeding\n- Warfarin reversal (when PCC unavailable)\n- Massive transfusion (MTP component)\n- TTP (therapeutic plasma exchange)\n\n**Dosing:**\n- **Standard:** 10-15 mL/kg (3-4 units adult)\n- Achieves ~30% factor replacement\n- **Warfarin reversal:** 5-8 mL/kg (10% factor replacement acceptable)\n\n**Important Notes:**\n- Takes 20-30 min to thaw\n- Order early if anticipating need\n- Liquid plasma (never frozen) faster if available\n\n**NOT Indicated For:**\n- Volume expansion (use crystalloid)\n- Heparin reversal (use protamine)\n- DOAC reversal (use specific antidotes or PCC)\n- Routine post-cardiac bypass',
    citation: [4, 5],
    options: [
      { label: 'PCC for Warfarin Reversal', next: 'bt-pcc' },
      { label: 'Back to Component Overview', next: 'bt-component-overview' },
    ],
    summary: 'FFP: PT/aPTT >1.5x with bleed; dose 10-15 mL/kg; takes 20-30 min to thaw; NOT for volume expansion',
  },

  {
    id: 'bt-platelets',
    type: 'info',
    module: 3,
    title: 'Platelet Transfusion',
    body: '**PLATELET CONCENTRATE**\n\n**Transfusion Thresholds:**\n\n**Active Bleeding:**\n- Platelet count <50k + bleeding → transfuse\n- Diffuse microvascular bleeding → maintain >100k\n- CNS hemorrhage → maintain >100k\n\n**Prophylaxis (No Bleeding):**\n- Bone marrow failure: <10k (no risk factors)\n- Bone marrow failure: <20k (with risk factors)\n- Before invasive procedure: >50k needed\n- Before neuraxial procedure: >80k\n- Before neurosurgery: >100k\n\n**Dosing:**\n- 1 transfusion = 6-10 individual units pooled\n- OR 1 apheresis unit (single donor)\n- Each transfusion ↑platelets ~5-10k/µL\n- **Pediatric:** 10 mL/kg\n\n**Important Notes:**\n- Stored at room temperature (higher bacterial risk)\n- Check expiration (5-day shelf life)\n- Avoid in HIT (heparin-induced thrombocytopenia)\n- ABO-compatible preferred but not required',
    citation: [4, 5],
    options: [
      { label: 'Back to Component Overview', next: 'bt-component-overview' },
    ],
    summary: 'Platelets: <50k + bleed → transfuse; microvascular/CNS bleed → maintain >100k; 1 transfusion ↑5-10k',
  },

  {
    id: 'bt-cryo',
    type: 'info',
    module: 3,
    title: 'Cryoprecipitate',
    body: '**CRYOPRECIPITATE**\n\n**Contents (per unit):**\n- Fibrinogen ~250-366 mg\n- Factor VIII ~100 AHU\n- Factor XIII\n- von Willebrand Factor\n- Fibronectin\n\n**Indications:**\n- Fibrinogen <1.0 g/L with bleeding\n- Fibrinogen <1.5 g/L in massive transfusion\n- DIC with hypofibrinogenemia\n- Dysfibrinogenemia\n\n**Dosing:**\n- **Generic:** 1 unit per 10 kg body weight\n- **Standard adult:** 10 units (pooled)\n- 10 units increases fibrinogen ~75 mg/dL\n- Each unit adds ~50 mg fibrinogen per patient\n\n**Target Fibrinogen:**\n- >150-200 mg/dL in trauma/massive transfusion\n- >100 mg/dL maintenance\n\n**Alternative:**\n- Fibrinogen concentrate (if available)\n- More precise dosing, faster reconstitution\n- Higher cost',
    citation: [4, 5],
    options: [
      { label: 'Back to Component Overview', next: 'bt-component-overview' },
    ],
    summary: 'Cryo: fib <1.0 with bleed; 1 unit/10 kg (10 units adult); 10 units ↑fib ~75 mg/dL; target fib >150-200',
  },

  // =====================================================================
  // MODULE 4: COMPLICATIONS
  // =====================================================================

  {
    id: 'bt-complications-overview',
    type: 'question',
    module: 4,
    title: 'Transfusion Complications',
    body: '**TRANSFUSION REACTIONS**\n\n**Pulmonary:**\n- **TACO:** Circulatory overload (cardiogenic edema)\n- **TRALI:** Acute lung injury (non-cardiogenic edema)\n\n**Immunologic:**\n- **Acute hemolytic:** ABO incompatibility (emergency)\n- **Febrile non-hemolytic:** Most common reaction\n- **Allergic:** Urticaria to anaphylaxis\n- **Delayed hemolytic:** 3-10 days post-transfusion\n\n**Metabolic:**\n- **Hypocalcemia:** Citrate toxicity\n- **Hyperkalemia:** Especially pediatrics, irradiated blood\n- **Hypothermia:** Cold blood products\n\nSelect complication:',
    citation: [6, 7, 8],
    options: [
      { label: 'TACO vs TRALI', next: 'bt-taco-trali' },
      { label: 'Acute Hemolytic Reaction', next: 'bt-ahtr' },
      { label: 'Febrile Non-Hemolytic', next: 'bt-fnhtr' },
      { label: 'Allergic Reactions', next: 'bt-allergic' },
      { label: 'Hypocalcemia/Hyperkalemia', next: 'bt-metabolic' },
      { label: 'Back to Overview', next: 'bt-start' },
    ],
    summary: 'Transfusion complications: TACO/TRALI (pulmonary), hemolytic, febrile, allergic, metabolic',
  },

  {
    id: 'bt-taco-trali',
    type: 'info',
    module: 5,
    title: 'TACO vs TRALI',
    body: '**DISTINGUISHING TACO FROM TRALI**\n\n| Feature | TACO | TRALI |\n|---------|------|-------|\n| **Mechanism** | Circulatory overload | Immune/bioactive lung injury |\n| **Edema type** | Cardiogenic | Non-cardiogenic |\n| **Timing** | During or within 12h | During or within 6h |\n| **BNP** | **ELEVATED** | Normal/low |\n| **JVD** | Present | Absent |\n| **BP** | Often hypertensive | Often hypotensive |\n| **Diuretic response** | **YES - responds** | NO response |\n| **Echo** | Abnormal EF, dilated | Normal LV function |\n| **PCWP** | Elevated | Normal |\n\n**TACO Treatment:**\n- Stop transfusion, sit upright\n- Supplemental O2\n- **Diuretics:** Furosemide 20-40 mg IV\n- Vasodilator if hypertensive + HF\n\n**TRALI Treatment:**\n- Stop transfusion, supportive care\n- O2, mechanical ventilation if needed\n- **NO diuretics** (non-cardiogenic edema)\n- Usually resolves 48-96 hours\n- Mortality 6-12%\n\n**Key Diagnostic Test:**\n- BNP or NT-proBNP ratio (post/pre >1.5 = TACO)\n- BNP <300 or NT-proBNP <2000 makes TACO unlikely',
    citation: [6, 7],
    options: [
      { label: 'TACO Details', next: 'bt-taco' },
      { label: 'TRALI Details', next: 'bt-trali' },
      { label: 'Back to Complications', next: 'bt-complications-overview' },
    ],
    summary: 'TACO vs TRALI: BNP elevated + diuretic response = TACO; BNP normal + no diuretic response = TRALI',
  },

  {
    id: 'bt-taco',
    type: 'info',
    module: 5,
    title: 'TACO (Circulatory Overload)',
    body: '**TRANSFUSION-ASSOCIATED CIRCULATORY OVERLOAD**\n\n**Mechanism:**\n- 2-hit: Underlying cardiac/renal dysfunction + fluid overload\n- Increased hydrostatic pressure → cardiogenic pulmonary edema\n\n**Diagnosis (3+ within 12h of transfusion):**\n- Dyspnea, orthopnea, cough\n- Hypoxemia (O2 sat <90% on RA)\n- Hypertension, tachycardia, peripheral edema\n- **Elevated BNP/NT-proBNP**\n- Abnormal echo (low EF, dilated ventricles)\n\n**Treatment:**\n1. **STOP transfusion** immediately\n2. Sit patient upright\n3. Supplemental O2 or ventilation\n4. **Furosemide 20-40 mg IV** for diuresis\n5. Monitor urine output\n6. Vasodilator (nitroglycerin) if HTN + HF\n\n**Prevention:**\n- Restrictive transfusion thresholds in stable patients\n- Slow transfusion rate (<1 mL/kg/hour in high-risk)\n- Consider concurrent diuretic if HF/renal disease\n- Single-unit transfusion strategy in elderly',
    citation: [6, 7],
    options: [
      { label: 'Back to TACO vs TRALI', next: 'bt-taco-trali' },
    ],
    summary: 'TACO: cardiogenic overload; BNP elevated; treat with diuretics, O2, upright positioning',
  },

  {
    id: 'bt-trali',
    type: 'info',
    module: 5,
    title: 'TRALI (Acute Lung Injury)',
    body: '**TRANSFUSION-RELATED ACUTE LUNG INJURY**\n\n**Mechanism:**\n- **Immune (80-85%):** Anti-HLA/HNA antibodies in donor plasma activate recipient neutrophils\n- **Non-immune:** Bioactive lipids in stored components\n- Neutrophil sequestration in pulmonary capillaries → leak → protein-rich edema\n\n**Diagnosis:**\n- **Timing:** During or within 6 hours of transfusion\n- Sudden dyspnea, severe hypoxemia\n- Fever, hypotension, tachycardia\n- Bilateral rales, CXR infiltrates\n- **NO JVD** (differentiates from TACO)\n- **Normal or low BNP**\n- Normal CVP/PCWP\n- Normal LV function on echo\n\n**Type I vs Type II:**\n- Type I: No ARDS risk factors pre-transfusion\n- Type II: Has ARDS risk factors or mild ARDS pre-transfusion\n\n**Treatment:**\n1. **STOP transfusion**\n2. Supportive care only\n3. O2, mechanical ventilation if needed\n4. **NO diuretics** (won\'t help, may harm)\n5. Usually resolves 48-96 hours\n\n**Mortality:** 6-12%\n\n**Prevention:**\n- Reduce plasma-rich products\n- Male-only plasma programs\n- Leukoreduction',
    citation: [6, 7],
    options: [
      { label: 'Back to TACO vs TRALI', next: 'bt-taco-trali' },
    ],
    summary: 'TRALI: non-cardiogenic lung injury; BNP normal, no JVD; supportive care only (NO diuretics); resolves 48-96h',
  },

  {
    id: 'bt-ahtr',
    type: 'info',
    module: 4,
    title: 'Acute Hemolytic Reaction',
    body: '**ACUTE HEMOLYTIC TRANSFUSION REACTION**\n\n**Mechanism:**\n- ABO incompatibility (most common cause)\n- Host antibodies bind donor RBCs → intravascular hemolysis\n- Can occur with few milliliters of blood\n\n**Classic Triad (rarely all present):**\n- Fever\n- Flank/back pain\n- Dark red/brown urine (hemoglobinuria)\n\n**Other Signs:**\n- Anxiety, chest pain, dyspnea\n- Hypotension (under anesthesia may be only sign)\n- Uncontrolled bleeding (DIC)\n- Pain at infusion site\n\n**Labs:**\n- **DAT (Coombs) POSITIVE**\n- Free hemoglobin in plasma/urine\n- Low haptoglobin\n- Elevated LDH, indirect bilirubin\n\n**EMERGENCY TREATMENT:**\n1. **STOP TRANSFUSION IMMEDIATELY**\n2. Maintain IV access (new line)\n3. Verify patient ID vs blood product\n4. **Aggressive crystalloid** (maintain UOP >200 mL/hr)\n5. **Sodium bicarbonate** 250-500 mg IV (alkalinize urine, protect kidneys)\n6. Furosemide or mannitol for diuresis\n7. Treat DIC: FFP, cryo, platelets\n8. Notify blood bank, repeat type & screen\n\n**Prognosis:** Survivable with aggressive support; depends on degree of AKI',
    citation: [8],
    options: [
      { label: 'Back to Complications', next: 'bt-complications-overview' },
    ],
    summary: 'Acute hemolytic: STOP transfusion, verify ID, aggressive fluids + bicarb for renal protection; DAT positive',
  },

  {
    id: 'bt-fnhtr',
    type: 'info',
    module: 4,
    title: 'Febrile Non-Hemolytic Reaction',
    body: '**FEBRILE NON-HEMOLYTIC TRANSFUSION REACTION (FNHTR)**\n\n**Most common transfusion reaction**\n\n**Mechanism:**\n- Cytokine accumulation during storage (especially platelets)\n- OR recipient HLA alloantibodies vs donor leukocytes\n\n**Diagnosis (of exclusion):**\n- **Fever:** ≥38°C OR rise ≥1°C from baseline within 4h\n- Moderate/severe: ≥39°C OR rise ≥1.5°C, chills/rigors\n- **DAT NEGATIVE** (differentiates from hemolytic)\n- Hemolysis screen normal (LDH, bili, haptoglobin)\n- Must rule out: Hemolytic reaction, TRALI, sepsis\n\n**Treatment:**\n1. Pause transfusion, assess patient\n2. Antipyretic (acetaminophen)\n3. If no other serious reaction → can resume transfusion\n4. Only ~10% have recurrent episodes\n\n**Prevention:**\n- Prestorage leukoreduction (removes WBCs, reduces cytokines)\n- Use fresher blood when possible\n- Premedicate with antipyretic in high-risk patients\n\n**Key Point:** Diagnosis of exclusion - must rule out hemolytic and TRALI first',
    citation: [6],
    options: [
      { label: 'Back to Complications', next: 'bt-complications-overview' },
    ],
    summary: 'FNHTR: most common reaction; fever + DAT negative; treat with antipyretic; can resume if no other reaction',
  },

  {
    id: 'bt-allergic',
    type: 'info',
    module: 4,
    title: 'Allergic Reactions',
    body: '**ALLERGIC TRANSFUSION REACTIONS**\n\n**MILD ALLERGIC:**\n- Itching, urticaria, localized swelling\n- **Treatment:**\n  - Pause transfusion\n  - Diphenhydramine 25-50 mg IV\n  - Can resume if symptoms resolve\n\n**MODERATE ALLERGIC:**\n- Pruritus, urticaria, flushing\n- Angioedema (non-airway)\n- **Treatment:**\n  - Antihistamine\n  - Consider corticosteroid\n  - May resume if symptoms resolve\n\n**SEVERE/ANAPHYLAXIS:**\n- Airway edema, bronchospasm\n- Hypotension, cardiovascular collapse\n- **Treatment:**\n  1. **STOP transfusion immediately**\n  2. **Epinephrine 0.3-0.5 mg IM** (1:1000)\n  3. Airway management\n  4. IV access, fluids\n  5. IV antihistamine + corticosteroid\n  6. Consider IgA deficiency if recurrent\n\n**IgA Deficiency:**\n- Rare but important cause of severe reactions\n- Patients make anti-IgA antibodies\n- **Prevention:** Use IgA-deficient or washed products',
    citation: [6],
    options: [
      { label: 'Back to Complications', next: 'bt-complications-overview' },
    ],
    summary: 'Allergic: mild (antihistamine, resume), moderate (steroids), severe/anaphylaxis (epi, stop transfusion, airway)',
  },

  {
    id: 'bt-metabolic',
    type: 'info',
    module: 4,
    title: 'Metabolic Complications',
    body: '**METABOLIC COMPLICATIONS OF TRANSFUSION**\n\n**HYPOCALCEMIA (Citrate Toxicity):**\n- Citrate anticoagulant chelates ionized calcium\n- Risk factors: Massive transfusion, liver dysfunction\n- iCa <1.1 mmol/L associated with mortality\n\n**Effects of hypocalcemia:**\n- Impairs coagulation cascade (factors need Ca2+)\n- Impairs platelet function\n- Cardiac depression (QT prolongation, arrhythmias)\n\n**Treatment:**\n- See Calcium Protocol → [next]\n\n---\n\n**HYPERKALEMIA:**\n- Stored RBCs leak K+ into plasma\n- Irradiation accelerates K+ leak\n- **Pediatric risk highest** (smaller volume distribution)\n\n**Treatment:**\n- Dextrose 0.5-1 g/kg + insulin 0.1 units/kg IV\n- Adult max: 25-50 g dextrose, 5-10 units insulin\n- Monitor ECG (peaked T-waves, wide QRS)\n- Consider calcium for cardiac protection\n\n---\n\n**HYPOTHERMIA:**\n- Cold blood products drop core temp\n- Hypothermia worsens coagulopathy\n**Prevention:** Warm all products during massive transfusion',
    citation: [9, 10],
    options: [
      { label: 'Calcium Protocol', next: 'bt-calcium' },
      { label: 'Back to Complications', next: 'bt-complications-overview' },
    ],
    summary: 'Metabolic: hypocalcemia (citrate) → impairs clotting/cardiac; hyperkalemia (esp peds); hypothermia worsens coagulopathy',
  },

  // =====================================================================
  // MODULE 6: SPECIAL SITUATIONS
  // =====================================================================

  {
    id: 'bt-special-overview',
    type: 'question',
    module: 6,
    title: 'Special Situations',
    body: '**Special Transfusion Scenarios**\n\n**Emergency Release:**\n- O negative (universal donor)\n- When type unknown, can\'t wait\n\n**Autoimmune Hemolytic Anemia:**\n- All blood "incompatible"\n- Can still transfuse if life-threatening\n\n**Jehovah\'s Witness:**\n- Blood alternatives, cell salvage\n- Varies by individual preference\n\n**Pediatric Considerations:**\n- Weight-based dosing\n- Hyperkalemia risk higher\n\nSelect topic:',
    citation: [11, 12],
    options: [
      { label: 'Emergency Release (O Neg)', next: 'bt-emergency-release' },
      { label: 'Autoimmune Hemolytic Anemia', next: 'bt-aiha' },
      { label: 'Jehovah\'s Witness', next: 'bt-jehovah' },
      { label: 'Pediatric Dosing', next: 'bt-pediatric' },
      { label: 'Back to Overview', next: 'bt-start' },
    ],
    summary: 'Special situations: emergency release O neg, AIHA, Jehovah\'s Witness alternatives, pediatric dosing',
  },

  {
    id: 'bt-emergency-release',
    type: 'info',
    module: 6,
    title: 'Emergency Release (O Negative)',
    body: '**EMERGENCY RELEASE BLOOD**\n\n**Indications:**\n- Acute hemorrhage requiring immediate transfusion\n- Type unknown\n- Pretransfusion testing too slow\n\n**Protocol:**\n1. Physician authorization required\n2. Provide patient name/location, 2 identifiers\n3. Blood available in ~10 minutes\n4. Send type & screen (don\'t delay transfusion)\n\n**Product Selection:**\n\n**O Negative:**\n- Safest universal donor\n- Use for all females of childbearing age\n- Use when type truly unknown\n\n**O Positive Acceptable For:**\n- Males >16 years\n- Females >50 years (past childbearing)\n- Risk of Rh immunization lower than death risk\n\n**Risk of Hemolysis:**\n- ~0.1% overall with O neg blood\n- Higher if previously transfused or pregnant (may have alloantibodies)\n\n**Transition to Type-Specific:**\n- Once type & screen results available\n- Switch to patient\'s own blood type\n- Reduces inventory strain on O neg supply',
    citation: [11],
    options: [
      { label: 'Back to Special Situations', next: 'bt-special-overview' },
    ],
    summary: 'Emergency release: O neg safest; O pos OK for males >16, females >50; ~0.1% hemolysis risk',
  },

  {
    id: 'bt-aiha',
    type: 'info',
    module: 6,
    title: 'Autoimmune Hemolytic Anemia',
    body: '**AIHA TRANSFUSION MANAGEMENT**\n\n**Challenge:**\n- Patient\'s autoantibodies react with ALL normal RBCs\n- All crossmatches will be "incompatible"\n- May mask underlying alloantibodies\n\n**Key Principle:**\n**Most AIHA patients tolerate "incompatible" RBCs without significant increase in hemolysis**\n\n**Emergency Transfusion (Life-Threatening Anemia):**\n- Use O negative blood if type unknown\n- Avoiding hemodynamic collapse > hemolysis risk\n- Transfuse if symptomatic despite Hgb level\n\n**Elective Transfusion (If Time Permits):**\n- Select "least incompatible" unit\n- Extended phenotyping to detect alloantibodies\n- Complex adsorption procedures by blood bank\n\n**Transfusion Triggers:**\n- Symptomatic anemia (elderly, CAD, cardiac risk)\n- Restrictive threshold: Hgb <7 g/dL (asymptomatic)\n- Clinical status guides decision, not lab values\n\n**First-Line Medical Treatment:**\n- Corticosteroids (70-85% effective)\n- Rituximab (80-90% effective)\n- Splenectomy (2/3 effective for refractory)',
    citation: [12],
    options: [
      { label: 'Back to Special Situations', next: 'bt-special-overview' },
    ],
    summary: 'AIHA: can transfuse "incompatible" blood in emergency; autoantibodies react with all RBCs; clinical status guides',
  },

  {
    id: 'bt-jehovah',
    type: 'info',
    module: 6,
    title: 'Jehovah\'s Witness',
    body: '**JEHOVAH\'S WITNESS TRANSFUSION ALTERNATIVES**\n\n**Preferences Vary by Individual - Always Discuss**\n\n**Generally Acceptable:**\n- Cell salvage (blood in continuous circuit with body)\n- Recombinant erythropoietin (EPO)\n- Clotting factors, fibrinogen concentrate\n- Albumin, immunoglobulins\n- Cardiopulmonary bypass\n- IV iron preparations\n\n**Generally NOT Acceptable:**\n- Whole blood from blood bank\n- PRBCs, FFP, platelets (stored separately)\n\n**Clinical Strategies:**\n- Aggressive preoperative optimization (IV iron + EPO)\n- TXA for bleeding reduction\n- Factor concentrates for coagulopathy\n- Cell saver for surgery\n- Minimize phlebotomy (pediatric tubes)\n- Permissive hypotension\n\n**Resources:**\n- ~200 hospitals offer bloodless medicine programs\n- 108,000+ physicians participate\n- Document patient preferences clearly\n- Involve ethics if conflict arises',
    citation: [12],
    options: [
      { label: 'Back to Special Situations', next: 'bt-special-overview' },
    ],
    summary: 'Jehovah\'s Witness: preferences vary - ask; cell salvage, EPO, factors often OK; avoid stored bank products',
  },

  {
    id: 'bt-pediatric',
    type: 'info',
    module: 6,
    title: 'Pediatric Transfusion Dosing',
    body: '**PEDIATRIC TRANSFUSION DOSING**\n\n**PRBCs:**\n- **Dose:** 10-20 mL/kg\n- 5-10 mL/kg increases Hgb ~10 g/L\n- Max: 4 units per transfusion event\n\n**FFP:**\n- **Dose:** 10-15 mL/kg\n\n**Platelets:**\n- **Dose:** 10 mL/kg (pooled)\n\n**Cryoprecipitate:**\n- **Dose:** 0.1 unit/kg (or 1 unit per 5-10 kg)\n\n**TXA:**\n- **Loading:** 20 mg/kg over 10 min\n- **Maintenance:** 10 mg/kg/hr for 8 hours\n\n**Calcium:**\n- **Calcium gluconate:** 50 mg/kg\n- **Calcium chloride:** 10 mg/kg (central line only)\n\n**HYPERKALEMIA RISK:**\n- Neonates and small children at highest risk\n- Smaller volume of distribution\n- Irradiated blood has higher K+ content\n- Consider washed RBCs for neonatal ECMO\n\n**Treatment of Hyperkalemia:**\n- Dextrose 0.5-1 g/kg + insulin 0.1 units/kg',
    citation: [10],
    options: [
      { label: 'Back to Special Situations', next: 'bt-special-overview' },
    ],
    summary: 'Pediatric dosing: PRBCs 10-20 mL/kg, FFP 10-15 mL/kg, plt 10 mL/kg; higher hyperkalemia risk',
  },

  // =====================================================================
  // MODULE 7: ADJUNCTS
  // =====================================================================

  {
    id: 'bt-adjuncts-overview',
    type: 'question',
    module: 7,
    title: 'Transfusion Adjuncts',
    body: '**Adjuncts to Blood Transfusion**\n\n**TXA (Tranexamic Acid):**\n- Reduces blood loss by ~1/3\n- Must give within 3 hours (best <1 hour)\n\n**Calcium Replacement:**\n- Citrate chelates calcium\n- Give 1g every 4 units PRBCs\n- Target iCa >1.1 mmol/L\n\n**PCC (Prothrombin Complex Concentrate):**\n- Warfarin reversal (preferred over FFP)\n- Factors II, VII, IX, X\n\n**Fibrinogen Concentrate:**\n- Alternative to cryoprecipitate\n- More precise dosing\n\nSelect adjunct:',
    citation: [13, 14],
    options: [
      { label: 'TXA Protocol', next: 'bt-txa' },
      { label: 'Calcium Replacement', next: 'bt-calcium' },
      { label: 'PCC (Warfarin Reversal)', next: 'bt-pcc' },
      { label: 'Back to Overview', next: 'bt-start' },
    ],
    summary: 'Adjuncts: TXA (within 3h), calcium (q4 units), PCC (warfarin reversal), fibrinogen concentrate',
  },

  {
    id: 'bt-txa',
    type: 'info',
    module: 7,
    title: 'Tranexamic Acid (TXA)',
    body: '**TRANEXAMIC ACID - ANTIFIBRINOLYTIC**\n\n**Mechanism:**\n- Lysine analog blocks plasminogen binding sites\n- Inhibits fibrinolysis → prevents clot breakdown\n- Reduces blood loss by ~1/3\n\n**Adult Dosing:**\n- **Loading:** 1 g IV bolus in 100 mL NS over 10 min\n  - (Slow infusion prevents hypotension)\n- **Maintenance:** 1 g over next 8 hours\n- **Maximum:** 2 g total\n\n**TIMING IS CRITICAL:**\n- **<1 hour from injury:** 32% mortality reduction\n- **1-3 hours:** 21% mortality reduction\n- **>3 hours:** May INCREASE death risk (NOT recommended)\n\n**Pediatric Dosing:**\n- Loading: 20 mg/kg IV over 10 min\n- Maintenance: 10 mg/kg/hr for 8 hours\n\n**Indications:**\n- Trauma with active bleeding or MT risk\n- Severe perioperative bleeding\n- Heavy menstrual bleeding\n- Post-partum hemorrhage\n\n**Safety:**\n- 30,000+ patients: NO increased VTE or adverse events\n- Can use safely with aggressive resuscitation',
    citation: [13],
    options: [
      { label: 'Back to Adjuncts', next: 'bt-adjuncts-overview' },
      { label: 'MTP Protocol', next: 'bt-mtp-protocol' },
    ],
    summary: 'TXA: 1g bolus over 10 min, then 1g over 8h; MUST give <3h (best <1h); 32% mortality reduction',
  },

  {
    id: 'bt-calcium',
    type: 'info',
    module: 7,
    title: 'Calcium Replacement Protocol',
    body: '**CALCIUM REPLACEMENT IN MASSIVE TRANSFUSION**\n\n**Why Calcium Matters:**\n- Citrate anticoagulant chelates ionized calcium\n- iCa <1.1 mmol/L associated with mortality\n- Calcium required for:\n  - Coagulation cascade (factors II, VII, IX, X)\n  - Platelet activation\n  - Cardiac contractility\n\n**Dosing (Joint Trauma System):**\n\n**Calcium Gluconate (Peripheral IV OK):**\n- **1 g** (30 mL of 10%) = 3 mmol Ca2+\n- Give with first unit of blood\n- Repeat every 4 units PRBCs\n\n**Calcium Chloride (Central Line Only):**\n- **1 g** (10 mL of 10%) = 10 mmol Ca2+\n- More effective but causes tissue necrosis if extravasation\n- Use ONLY with confirmed central access\n\n**Monitoring:**\n- Check ionized calcium every 30-60 min\n- OR after each transfusion cooler\n- **Target: iCa >1.1 mmol/L**\n\n**Special Considerations:**\n- Liver dysfunction: Citrate metabolized by liver → higher accumulation\n- Monitor more frequently in liver failure',
    citation: [9],
    options: [
      { label: 'Back to Adjuncts', next: 'bt-adjuncts-overview' },
      { label: 'MTP Protocol', next: 'bt-mtp-protocol' },
    ],
    summary: 'Calcium: 1g gluconate (peripheral) or chloride (central) q4 units PRBCs; target iCa >1.1 mmol/L',
  },

  {
    id: 'bt-pcc',
    type: 'info',
    module: 7,
    title: 'PCC (Prothrombin Complex Concentrate)',
    body: '**PROTHROMBIN COMPLEX CONCENTRATE**\n\n**Contents:**\n- **4-factor PCC (Kcentra):** Factors II, VII, IX, X (preferred)\n- **3-factor PCC:** Factors II, IX, X (± VII)\n\n**FDA Indication:**\n- Warfarin reversal with acute bleeding or urgent procedure\n\n**Off-Label Uses:**\n- DOAC reversal (if specific antidotes unavailable)\n- Bleeding in factor deficiency\n- Trauma coagulopathy (adjunct)\n\n**Dosing (Warfarin Reversal):**\n- Expressed in units of Factor IX\n- **25 IU/kg** for INR 2-4\n- **35 IU/kg** for INR 4-6\n- **50 IU/kg** for INR >6\n- **Do NOT exceed weight-based max** even if >100 kg\n\n**Administration:**\n- IV infusion over 10-15 min\n- Vitamin K 10 mg IV should accompany (sustains effect)\n- Faster than FFP (no thawing)\n\n**Advantages over FFP:**\n- Faster administration\n- Lower volume (no fluid overload)\n- More complete reversal\n\n**Cautions:**\n- Contains heparin (avoid in HIT)\n- Thromboembolism risk with high doses',
    citation: [14],
    options: [
      { label: 'Back to Adjuncts', next: 'bt-adjuncts-overview' },
      { label: 'FFP Details', next: 'bt-ffp' },
    ],
    summary: 'PCC: 4-factor preferred; 25-50 IU/kg for warfarin reversal; faster than FFP, lower volume',
  },

  // =====================================================================
  // MODULE 8: QUICK REFERENCE
  // =====================================================================

  {
    id: 'bt-quick-reference',
    type: 'info',
    module: 8,
    title: 'Quick Reference Table',
    body: '**COMPONENT DOSING:**\n| Product | Dose | Effect |\n|---------|------|--------|\n| PRBC | 1 unit | ↑Hgb 1 g/dL |\n| FFP | 10-15 mL/kg | 30% factor replacement |\n| Platelets | 1 transfusion | ↑plt 5-10k |\n| Cryo | 10 units | ↑fib 75 mg/dL |\n\n**THRESHOLDS:**\n| Parameter | Restrictive | Liberal/Trauma |\n|-----------|-------------|----------------|\n| Hgb | <7 g/dL | <9-10 g/dL |\n| Platelets | <50k + bleed | >100k (CNS) |\n| Fibrinogen | <1.0 g/L | >150-200 mg/dL |\n| INR | >1.5 + bleed | <1.5 (target) |\n| iCa | - | >1.1 mmol/L |\n\n**MTP ACTIVATION:**\n- ABC score ≥2\n- Shock Index ≥1.0\n- Ongoing hemorrhagic shock despite 2L crystalloid\n\n**ADJUNCT DOSING:**\n| Agent | Dose |\n|-------|------|\n| TXA | 1g bolus → 1g over 8h (<3h from injury) |\n| Calcium | 1g q4 units PRBC |\n| PCC | 25-50 IU/kg (warfarin) |\n\n**COMPLICATIONS:**\n- TACO: BNP ↑, responds to diuretics\n- TRALI: BNP normal, supportive only\n- Hemolytic: STOP, fluids + bicarb',
    citation: [1, 4, 6, 13],
    options: [
      { label: 'Back to Overview', next: 'bt-start' },
    ],
    summary: 'Quick reference: component dosing, thresholds, MTP activation, adjuncts, complications',
  },

];

export const BLOOD_TRANSFUSIONS_CITATIONS: Citation[] = [
  { num: 1, text: 'Holcomb JB, et al. PROPPR Trial: Transfusion Ratios in Trauma. JAMA 2015;313:471-482.' },
  { num: 2, text: 'EMCrit Project. Massive Transfusion Protocols. emcrit.org/ibcc/transfusion' },
  { num: 3, text: 'Nunez TC, et al. ABC Score for Massive Transfusion. J Trauma 2009;66:346-352.' },
  { num: 4, text: 'Carson JL, et al. Red Blood Cell Transfusion Guidelines. JAMA 2016;316:2025-2035.' },
  { num: 5, text: 'AABB Clinical Practice Guidelines: Component Therapy. Transfusion 2016.' },
  { num: 6, text: 'Semple JW, et al. Transfusion-Associated Circulatory Overload and TRALI. Blood 2019;133:1831-1839.' },
  { num: 7, text: 'Roubinian NH, et al. TACO and TRALI: Diagnosis and Management. Hematology 2018;2018:585-592.' },
  { num: 8, text: 'Delaney M, et al. Transfusion Reactions: Prevention, Diagnosis, and Treatment. Lancet 2016;388:2825-2836.' },
  { num: 9, text: 'Giancarelli A, et al. Hypocalcemia in Trauma: Joint Trauma System Guidelines. J Trauma 2016;80:602-607.' },
  { num: 10, text: 'Fasano R, et al. Pediatric Transfusion Medicine. Pediatr Clin North Am 2013;60:1547-1565.' },
  { num: 11, text: 'Yazer MH, et al. Emergency Release of Uncrossmatched Blood. Transfusion 2019;59:1794-1801.' },
  { num: 12, text: 'Petz LD. Emergency Transfusion in AIHA. Transfusion 2014;54:2948-2952.' },
  { num: 13, text: 'CRASH-2 Trial. TXA in Bleeding Trauma Patients. Lancet 2010;376:23-32.' },
  { num: 14, text: 'Sarode R, et al. PCC for Urgent Warfarin Reversal. Circulation 2013;128:1234-1243.' },
];
