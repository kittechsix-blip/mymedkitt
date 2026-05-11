// MedKitt — Disseminated Intravascular Coagulation (DIC)
// Recognition & Triggers → Diagnostic Workup & Scoring → Etiology-Specific Pathways → Hemostatic Resuscitation → Adjuncts & Anticoagulation → Disposition
// 6 modules, ~32 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const DIC_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & SUSPECT TRIGGERS
  // =====================================================================

  {
    id: 'dic-start',
    type: 'info',
    module: 1,
    title: 'DIC — Recognition',
    body: '[DIC Steps Summary](#/info/dic-steps)\n\n**Disseminated Intravascular Coagulation (DIC)** is an acquired syndrome of systemic intravascular coagulation activation that consumes platelets and clotting factors, simultaneously causing microvascular thrombosis and bleeding. [1][2]\n\n**Always secondary** — DIC is never a primary diagnosis. Find and treat the underlying trigger. [1][3]\n\n**Mortality:** 31-86% depending on etiology and severity. The single most important determinant of survival is **prompt control of the underlying cause.** [2][3]\n\n**Most common triggers (overlapping in critically ill):** [1][2][3]\n• **Sepsis** (most common — gram-negative > gram-positive)\n• **Malignancy** (solid tumors and hematologic, especially APL)\n• **Trauma** (TBI, crush, burns)\n• **Obstetric emergencies** (placental abruption, AFE, retained products, severe preeclampsia/HELLP)\n• **Severe organ injury** (acute pancreatitis, fulminant hepatic failure)\n• **Vascular abnormalities** (giant hemangiomas, large aortic aneurysms — Kasabach-Merritt)\n\n**Two clinical phenotypes:** [2][4]\n• **Bleeding-dominant** — obstetric, trauma, APL\n• **Thrombotic-dominant** — sepsis, malignancy (Trousseau)',
    citation: [1, 2, 3, 4],
    calculatorLinks: [
      { id: 'dic-isth-score', label: 'ISTH DIC Score' },
      { id: 'dic-jaam-score', label: 'JAAM DIC Score' },
      { id: 'dic-sic-score', label: 'SIC Score' },
    ],
    next: 'dic-suspect',
    summary: 'DIC is always secondary — find and treat the trigger; bleeding vs thrombotic phenotype determines therapy',
    safetyLevel: 'critical',
  },

  {
    id: 'dic-suspect',
    type: 'question',
    module: 1,
    title: 'When to Suspect DIC',
    body: '**Suspect DIC in any critically ill patient with new coagulopathy and a known trigger.** [1][2]\n\n**Clinical clues:** [1][2][3]\n• **Bleeding** from multiple uncontrolled sites (IV, line, mucosa, surgical wound)\n• **Petechiae, purpura, ecchymoses** without trauma\n• **Microvascular thrombosis** — purpura fulminans, digital ischemia, organ dysfunction (AKI, ARDS, encephalopathy)\n• **Bleeding + thrombosis simultaneously** is pathognomonic\n\n**Initial labs to send NOW:** [1][2]\n• CBC with platelets\n• PT/INR, aPTT\n• Fibrinogen\n• D-dimer (or fibrin degradation products if D-dimer unavailable)\n• Peripheral smear (schistocytes in 10-50% of cases)\n• Comprehensive metabolic panel\n• Lactate, ABG\n• Type & screen / crossmatch\n\nIs there a clear trigger and lab evidence of consumption?',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Yes — Trigger + Consumption Pattern Present',
        description: 'Proceed to DIC scoring and etiology-specific pathway',
        next: 'dic-overt-vs-non-overt',
        urgency: 'critical',
      },
      {
        label: 'Trigger Present, Labs Pending',
        description: 'Start workup; consider preemptive type & screen, line access',
        next: 'dic-overt-vs-non-overt',
        urgency: 'urgent',
      },
      {
        label: 'No Clear Trigger',
        description: 'Reconsider differential — TTP, HIT, primary fibrinolysis, liver failure, vitamin K deficiency',
        next: 'dic-ddx',
      },
    ],
    summary: 'Bleeding from multiple sites + microvascular thrombosis + known trigger = suspect DIC; send CBC, PT/PTT, fibrinogen, D-dimer, smear',
  },

  {
    id: 'dic-etiology-jump',
    type: 'info',
    module: 1,
    title: 'Etiology Quick-Jump',
    body: '[DIC Etiology Quick-Jump](#/info/dic-etiology-jump)\n\nUse the toolbar overlay to jump directly to the etiology-specific pathway:\n• **Sepsis-induced DIC** → most common; SIC scoring useful\n• **Malignancy-associated DIC** → includes APL and solid tumor (Trousseau)\n• **Obstetric DIC** → placental abruption, AFE, retained products, severe preeclampsia/HELLP\n• **Trauma-induced coagulopathy (TIC)** → overlaps with but distinct from classic DIC\n\nAll four pathways converge on the same hemostatic resuscitation principles in Module 4.',
    citation: [1, 2],
    next: 'dic-overt-vs-non-overt',
    summary: 'Use toolbar Etiology Quick-Jump to navigate directly to sepsis, malignancy, obstetric, or trauma pathways',
    skippable: true,
  },

  {
    id: 'dic-overt-vs-non-overt',
    type: 'question',
    module: 1,
    title: 'Overt vs Non-Overt DIC',
    body: '**Overt DIC** = decompensated; consumption has outstripped synthesis. [4][5]\n• Falling platelets (often <100)\n• Prolonged PT/PTT\n• Falling fibrinogen\n• High D-dimer / FDPs\n• Clinically bleeding or thrombosing\n\n**Non-overt (pre-DIC, "stressed")** = compensated; abnormal trends without crossing thresholds. [4][5]\n• Mild thrombocytopenia or downward trend\n• Borderline coagulation studies\n• Elevated D-dimer\n• Clinically subtle\n\n**Why it matters:** [4][6]\n• Non-overt DIC is the window for upstream intervention (treat trigger, anticoagulation in select cases).\n• Overt DIC requires hemostatic resuscitation and aggressive trigger control.\n\n**ISTH 2025 update:** Now uses phase-based classification — Pre-DIC, early-phase (compensated/subclinical), overt DIC. Trends matter as much as absolute values; repeat scoring every 12-24 hours. [4]\n\nWhat is the clinical pattern?',
    citation: [4, 5, 6],
    options: [
      {
        label: 'Overt DIC — Bleeding or Thrombosing',
        description: 'Active hemorrhage, microvascular thrombosis, organ dysfunction',
        next: 'dic-labs',
        urgency: 'critical',
      },
      {
        label: 'Non-Overt — Trends Concerning',
        description: 'Compensated; falling platelets, rising D-dimer without overt bleeding',
        next: 'dic-non-overt',
        urgency: 'urgent',
      },
    ],
    summary: 'Overt DIC = decompensated with bleeding/thrombosis; non-overt = compensated trends — both need trigger control, only overt needs hemostatic resuscitation',
  },

  {
    id: 'dic-ddx',
    type: 'info',
    module: 1,
    title: 'DIC Mimics — Differential',
    body: '**Conditions that mimic DIC but require different management:** [2][6]\n\n**Severe liver failure:**\n• Prolonged PT/PTT, low fibrinogen, thrombocytopenia\n• **Distinguishing:** Factor VIII normal/elevated in DIC (acute phase), low in liver failure\n• D-dimer often modestly elevated in both\n\n**Vitamin K deficiency / warfarin:**\n• Prolonged PT > PTT, normal fibrinogen, normal platelets\n• Reverses with vitamin K / 4F-PCC\n\n**Heparin-induced thrombocytopenia (HIT):**\n• Thrombocytopenia + thrombosis\n• Heparin exposure 5-14 days prior (or earlier if recent exposure)\n• 4Ts score, anti-PF4 antibody\n• **Critical:** Stop all heparin, start argatroban or bivalirudin\n\n**TTP / HUS:**\n• MAHA + thrombocytopenia\n• Normal coags (PT/PTT/fibrinogen)\n• ADAMTS13 <10% in TTP\n\n**Primary hyperfibrinolysis:**\n• Markedly elevated D-dimer with low fibrinogen but **normal or elevated platelets**\n• Seen in APL, prostate cancer, snake envenomation\n• Tranexamic acid is helpful (in DIC, only if bleeding-dominant)\n\n**Massive transfusion dilutional coagulopathy:**\n• Coags abnormal but D-dimer not markedly elevated\n• Resolves with goal-directed product therapy',
    citation: [2, 6],
    next: 'dic-labs',
    summary: 'DDx: liver failure (FVIII low), vit K deficiency (PT only), HIT (stop heparin), TTP (normal coags), primary fibrinolysis (normal plt), MTP dilution',
  },

  // =====================================================================
  // MODULE 2: DIAGNOSTIC WORKUP & SCORING
  // =====================================================================

  {
    id: 'dic-labs',
    type: 'info',
    module: 2,
    title: 'Core Diagnostic Labs',
    body: '**No single test is diagnostic — DIC is a clinical + lab gestalt.** [1][2][4]\n\n**Initial panel:** [1][2]\n\n| Lab | Typical Pattern in Overt DIC |\n|-----|------------------------------|\n| Platelets | <100 or rapid decline |\n| PT / INR | Prolonged (often >1.5× ULN) |\n| aPTT | Prolonged |\n| Fibrinogen | <2 g/L (< 1.5 in non-pregnant; <2 g/L in obstetric) |\n| D-dimer / FDPs | Markedly elevated (often >5× ULN) |\n| Peripheral smear | Schistocytes in 10-50% |\n| Antithrombin | Decreased (consumption) |\n| LDH | Elevated (hemolysis, tissue injury) |\n\n**Repeat every 6-12 hours** during active resuscitation — trends matter more than single values. [4]\n\n**Pearls:** [2][4]\n• Fibrinogen is an acute phase reactant — a "normal" fibrinogen in a septic patient may actually represent significant consumption.\n• In **pregnancy**, baseline fibrinogen is 4-6 g/L; threshold for transfusion in obstetric DIC is **<2 g/L**, not <1 g/L.\n• Antithrombin <70% predicts worse outcomes in septic DIC.\n• Factor VIII is normal/elevated in DIC; low in liver failure — useful tiebreaker.',
    citation: [1, 2, 4],
    next: 'dic-isth-score',
    summary: 'Plt + PT + fibrinogen + D-dimer + smear; repeat q6-12h — trends matter more than single values; obstetric fibrinogen threshold is <2 g/L',
  },

  {
    id: 'dic-isth-score',
    type: 'info',
    module: 2,
    title: 'ISTH Overt DIC Score',
    body: '[ISTH DIC Calculator](#/calculator/dic-isth-score)\n\n**ISTH 2001 criteria (validated and updated 2024):** [4][5]\n\n| Parameter | 0 | 1 | 2 | 3 |\n|-----------|---|---|---|---|\n| Platelets (×10⁹/L) | >100 | 50-100 | <50 | — |\n| Fibrin marker (D-dimer/FDP) | No rise | — | Moderate | Strong |\n| PT prolongation | <3 s | 3-6 s | >6 s | — |\n| Fibrinogen (g/L) | ≥1 | <1 | — | — |\n\n**Interpretation:** [5]\n• **≥5** = compatible with overt DIC; repeat daily for trend\n• **<5** = suggests non-overt DIC; repeat in 1-2 days\n\n**Performance:** [5]\n• Sensitivity 91%, specificity 97% for overt DIC vs no DIC\n• 25% mortality difference for each 1-point increase\n\n**Limitations:** [4]\n• Less sensitive than JAAM in early sepsis-DIC\n• Captures decompensated state — non-overt DIC may be missed\n• Does not directly inform anticoagulation vs hemostatic decisions',
    citation: [4, 5],
    calculatorLinks: [
      { id: 'dic-isth-score', label: 'ISTH DIC Score' },
    ],
    next: 'dic-jaam-score',
    summary: 'ISTH ≥5 = overt DIC; sens 91% / spec 97%; less sensitive in early sepsis-DIC than JAAM',
  },

  {
    id: 'dic-jaam-score',
    type: 'info',
    module: 2,
    title: 'JAAM DIC Score',
    body: '[JAAM DIC Calculator](#/calculator/dic-jaam-score)\n\n**JAAM (Japanese Association for Acute Medicine) 2006:** [7]\n\n| Parameter | 0 | 1 | 3 |\n|-----------|---|---|---|\n| SIRS criteria ≥3 | <3 | ≥3 | — |\n| Platelets (×10⁹/L) | ≥120 | 80-120 OR >30% drop in 24h | <80 OR >50% drop in 24h |\n| PT ratio | <1.2 | ≥1.2 | — |\n| FDP (µg/mL) | <10 | 10-25 | ≥25 |\n\n**Interpretation:** [7]\n• **≥4** = JAAM-DIC\n\n**Performance:** [4][7]\n• More sensitive than ISTH for sepsis-associated DIC, especially early\n• Captures non-overt and compensated states\n• Strong correlation with 28-day mortality in septic shock\n\n**When to use JAAM over ISTH:** [4]\n• Septic patient with concerning trends\n• Early DIC suspected\n• Decision support for anticoagulation in critical care',
    citation: [4, 7],
    calculatorLinks: [
      { id: 'dic-jaam-score', label: 'JAAM DIC Score' },
    ],
    next: 'dic-sic-score',
    summary: 'JAAM ≥4 = sepsis-DIC; more sensitive than ISTH in early sepsis-DIC; SIRS + platelets + PT ratio + FDP',
  },

  {
    id: 'dic-sic-score',
    type: 'info',
    module: 2,
    title: 'SIC (Sepsis-Induced Coagulopathy) Score',
    body: '[SIC Calculator](#/calculator/dic-sic-score)\n\n**Sepsis-Induced Coagulopathy (SIC) score — Iba 2017:** [8]\n\n| Parameter | 0 | 1 | 2 |\n|-----------|---|---|---|\n| Platelets (×10⁹/L) | ≥150 | 100-150 | <100 |\n| INR | ≤1.2 | 1.2-1.4 | >1.4 |\n| Total SOFA (resp + CV + hep + renal, max 12) | 0 | 1 | ≥2 |\n\n**Interpretation:** [8]\n• **≥4 (with platelet + INR subscore ≥3)** = SIC\n• Identifies septic patients at risk for **progression** to overt DIC\n• Candidate population for anticoagulation trials (recombinant thrombomodulin, antithrombin)\n\n**Why it matters:** [4][8]\n• Designed as an **earlier, simpler** predictor than JAAM/ISTH\n• Decouples decision-making from full overt DIC criteria\n• ISTH 2024 endorsed two-step approach: SIC first → if positive, ISTH score next\n\n**Cite:** Iba T, et al. JTH 2017;15:518-26.',
    citation: [4, 8],
    calculatorLinks: [
      { id: 'dic-sic-score', label: 'SIC Score' },
    ],
    next: 'dic-trends',
    summary: 'SIC ≥4 (with plt+INR ≥3) = sepsis-induced coagulopathy → predicts progression to overt DIC; candidate for anticoag trials',
  },

  {
    id: 'dic-trends',
    type: 'info',
    module: 2,
    title: 'Serial Monitoring & Trends',
    body: '**ISTH 2024:** Trends in scores predict outcome better than single snapshots. [4]\n\n**Recommended monitoring schedule:** [2][4]\n\n| Phase | Frequency |\n|-------|-----------|\n| Resuscitation / active bleeding | CBC, PT/PTT, fibrinogen q4-6h |\n| Stabilization | q12h |\n| Recovery | q24h |\n\n**Concerning trends:** [4]\n• Platelet drop >30% in 24 hours\n• Rising D-dimer despite trigger control\n• Falling fibrinogen below acute-phase baseline\n• Worsening organ function (rising creatinine, lactate)\n\n**Reassuring trends:** [4]\n• Platelets recovering (typically lag 24-48h after trigger control)\n• D-dimer falling\n• Fibrinogen rising back above 2 g/L\n• Organ function stabilizing\n\n**Pearl:** Fibrinogen is usually the **last** parameter to normalize. Don\'t prematurely declare DIC resolved on platelet count alone. [4]',
    citation: [2, 4],
    next: 'dic-non-overt',
    summary: 'Monitor q4-6h while resuscitating; trend matters more than absolute value; fibrinogen is last to normalize',
  },

  {
    id: 'dic-non-overt',
    type: 'info',
    module: 2,
    title: 'Non-Overt (Compensated) DIC',
    body: '**Non-overt DIC is a window for upstream intervention.** [4][6]\n\n**Recognition:** [4][5]\n• ISTH score 1-4 (not yet ≥5)\n• Platelets trending down but >100\n• Coags borderline\n• D-dimer elevated\n• Clinically subtle — the patient looks "off" with abnormal labs but no overt bleeding/thrombosis\n\n**Management priorities:** [2][4][6]\n• **Aggressive trigger control** — antibiotics in sepsis, source control, definitive obstetric/oncologic management\n• **Avoid unnecessary anticoagulation interruption** — most non-overt DIC patients do not need product transfusion\n• **Repeat scoring** every 12-24 hours\n• **Consider SIC scoring** in septic patients to identify candidates for anticoagulation\n\n**When to escalate to hemostatic resuscitation:** [2][4]\n• Active bleeding develops\n• Score crosses ≥5 (overt DIC)\n• Need for invasive procedure\n\n**Pearl:** Many non-overt cases resolve with trigger control alone. Resist the urge to "treat the labs." [2]',
    citation: [2, 4, 5, 6],
    next: 'dic-sepsis',
    summary: 'Non-overt DIC = treat trigger, monitor q12-24h, do NOT preemptively transfuse — most resolve with source control alone',
    skippable: true,
  },

  // =====================================================================
  // MODULE 3: ETIOLOGY-SPECIFIC PATHWAYS
  // =====================================================================

  {
    id: 'dic-sepsis',
    type: 'info',
    module: 3,
    title: 'Sepsis-Induced DIC',
    body: '**Most common DIC etiology — both gram-negative and gram-positive.** [1][3]\n\n**Pathophysiology:** [3][8]\n• Endotoxin/PAMP activation of tissue factor on monocytes/endothelium\n• Cytokine storm (TNF-α, IL-6) drives systemic coagulation activation\n• Endothelial glycocalyx disruption\n\n**Phenotype:** Predominantly **thrombotic / microvascular**, with bleeding only late in decompensation. [3]\n\n**Treatment priorities:** [3][9]\n1. **Source control + early appropriate antibiotics** within 1 hour (Surviving Sepsis)\n2. **Goal-directed resuscitation** (lactate clearance, MAP ≥65, urine output)\n3. **Score with SIC + ISTH** — repeat q12h\n4. **Hemostatic support** only if bleeding or pre-procedure (see Module 4)\n5. **Consider anticoagulation** if SIC score positive AND no active bleeding (Module 5)\n\n**Anticoagulation evidence in septic DIC:** [4][8][9]\n• Recombinant thrombomodulin (rTM) — phase 3 SCARLET did not show overall mortality benefit but signal in subgroups with severe coagulopathy\n• Antithrombin concentrate — meta-analyses suggest benefit in DIC subgroup, no benefit in unselected sepsis\n• Heparin — controversial, only with caution in non-bleeding septic DIC\n\n**Pearl:** Source control trumps every other intervention. Antibiotics within 1 hour, look for an abscess, line, or device that needs removal. [3]',
    citation: [1, 3, 4, 8, 9],
    next: 'dic-bleeding-vs-not',
    summary: 'Sepsis-DIC = source control + abx in 1h, goal-directed resus, SIC scoring, hemostatic support only if bleeding; anticoag controversial',
  },

  {
    id: 'dic-malignancy',
    type: 'info',
    module: 3,
    title: 'Malignancy-Associated DIC',
    body: '**Two phenotypes:** [1][2][10]\n\n**1. Solid tumor (Trousseau syndrome) — chronic, thrombotic-dominant:**\n• Pancreatic, gastric, lung, breast, ovarian adenocarcinomas\n• Migratory thrombophlebitis, marantic endocarditis, NBTE\n• Treatment: **LMWH** is first line (warfarin often fails)\n• Definitive therapy: treat the cancer\n\n**2. Hematologic — APL is the emergency:**\n• See dedicated APL pathway: `dic-apl`\n• Other AML, ALL with high blast counts can also cause DIC\n\n**Pathophysiology:** [10]\n• Tumor expression of tissue factor and cancer procoagulant\n• Mucin-secreting adenocarcinomas activate coagulation directly\n• Hyperleukocytosis/leukostasis in acute leukemia\n\n**Treatment:** [10]\n• **Address the cancer** — chemotherapy, surgery, radiation\n• **LMWH** (enoxaparin 1 mg/kg q12h or 1.5 mg/kg daily) for thrombotic-phenotype Trousseau\n• **Hemostatic support only if bleeding** (Module 4)\n• **Avoid prophylactic platelet transfusion** in stable thrombotic-phenotype malignancy DIC unless invasive procedure\n\n**Pearl:** New unprovoked VTE in older adult → screen for occult malignancy with age-appropriate cancer workup. [10]',
    citation: [1, 2, 10],
    next: 'dic-apl',
    summary: 'Malignancy-DIC = solid tumor (Trousseau, thrombotic, LMWH) vs hematologic (APL = emergency); treat cancer, LMWH > warfarin',
  },

  {
    id: 'dic-apl',
    type: 'info',
    module: 3,
    title: 'APL-DIC — Bleeding Emergency',
    body: '[APL-DIC ATRA Emergency](#/info/dic-apl-emergency)\n\n**Acute Promyelocytic Leukemia (APL, AML M3) DIC is a bleeding emergency.** [11]\n\n**5-10% of APL patients die from hemorrhage in the first days** — usually intracranial. [11]\n\n**Recognition:** [11]\n• Pancytopenia + circulating promyelocytes\n• Auer rods, faggot cells on smear\n• Severe bleeding diathesis at presentation\n• Markedly elevated D-dimer, low fibrinogen\n• PML-RARα fusion (t(15;17))\n\n**Emergency treatment:** [11]\n• **Start ATRA (all-trans retinoic acid) 45 mg/m²/day in 2 divided doses IMMEDIATELY** on suspicion — do NOT wait for cytogenetic confirmation\n• **Aggressive cryoprecipitate** to keep fibrinogen **>150-200 mg/dL** (much higher than non-APL DIC)\n• **Platelets** to keep >30-50 × 10⁹/L\n• **FFP** to correct PT/PTT prolongation\n• **AVOID heparin** — historical use abandoned, increases bleeding mortality\n• **AVOID tranexamic acid** — controversial, may increase thrombosis\n\n**ATRA differentiation syndrome** (5-25% within 2-21 days): [11]\n• Fever, weight gain, dyspnea, pulmonary infiltrates, pleural/pericardial effusions, hypotension\n• Treat with dexamethasone 10 mg IV q12h × 3+ days\n\n**Disposition:** Heme/onc emergent consult, ICU admission, blood bank notification.',
    citation: [11],
    next: 'dic-obstetric',
    summary: 'APL = bleeding emergency, 5-10% early death from hemorrhage; ATRA 45mg/m²/day immediately, fibrinogen >150-200, NO heparin or TXA',
    safetyLevel: 'critical',
  },

  {
    id: 'dic-obstetric',
    type: 'info',
    module: 3,
    title: 'Obstetric DIC',
    body: '**Obstetric DIC is rapid-onset, bleeding-dominant, and reverses with definitive obstetric management.** [12]\n\n**Triggers:** [12]\n• **Placental abruption** (most common)\n• **Amniotic fluid embolism (AFE)** — sudden cardiopulmonary collapse + DIC\n• **Retained products of conception / fetal demise**\n• **Severe preeclampsia / HELLP**\n• **Placenta accreta spectrum / postpartum hemorrhage**\n• **Sepsis (chorioamnionitis, septic abortion)**\n\n**Key obstetric thresholds:** [12]\n• Pregnant baseline fibrinogen is 4-6 g/L\n• **Transfuse cryo if fibrinogen <2 g/L** (not <1 as in non-pregnant)\n• Falling fibrinogen <2 g/L is a strong predictor of severe PPH\n\n**Management priorities:** [12]\n1. **Definitive source control** — deliver, evacuate uterus, repair lacerations\n2. **Massive transfusion protocol** with 1:1:1 ratio if active hemorrhage\n3. **Cryoprecipitate** early to maintain fibrinogen ≥2 g/L (10 units or 0.06 units/kg)\n4. **Tranexamic acid 1 g IV** within 3 hours (WOMAN trial — reduces death from PPH)\n5. **Avoid heparin** — bleeding-dominant phenotype\n6. **Notify blood bank early** — anticipate massive transfusion\n\n**AFE-specific:** Rare but catastrophic; bedside echo (RV strain), ECMO consideration, multidisciplinary team. Mortality 20-60%. [12]',
    citation: [12],
    next: 'dic-trauma',
    summary: 'OB DIC = deliver/evacuate, MTP 1:1:1, cryo to keep fibrinogen ≥2 g/L (not <1), TXA 1g IV within 3h, no heparin',
  },

  {
    id: 'dic-trauma',
    type: 'info',
    module: 3,
    title: 'Trauma-Induced Coagulopathy (TIC)',
    body: '**TIC overlaps with classic DIC but is mechanistically distinct.** [13]\n\n**Pathophysiology:** [13]\n• Tissue injury + shock + acidosis + hypothermia + hemodilution\n• Activated protein C-mediated hyperfibrinolysis\n• Platelet dysfunction (not just thrombocytopenia)\n• Endothelial glycocalyx shedding\n\n**Recognition:** [13]\n• Major trauma (penetrating, blunt, TBI, burns)\n• Massive transfusion need\n• Lactate >4, base deficit >6\n• Abnormal viscoelastic testing (TEG/ROTEM)\n\n**European Guidelines (Spahn 6.0, 2023) priorities:** [13]\n1. **Damage control resuscitation** — permissive hypotension until hemorrhage controlled (in non-TBI)\n2. **Tranexamic acid 1 g IV bolus** within 3 hours, then 1 g over 8 hours (CRASH-2)\n3. **MTP 1:1:1** (RBC:FFP:platelets) until viscoelastic-guided\n4. **Goal fibrinogen ≥1.5-2 g/L** — cryoprecipitate or fibrinogen concentrate\n5. **Calcium replacement** — citrate from massive transfusion chelates ionized Ca\n6. **Avoid hypothermia** — warm everything\n7. **Surgical / IR source control** is the only definitive treatment\n\n**TBI-specific:** [13]\n• Permissive hypotension contraindicated — keep MAP ≥80, SBP ≥110\n• Reverse anticoagulation if applicable (4F-PCC for warfarin, andexanet for FXa, idarucizumab for dabigatran)\n• Tranexamic acid within 3 hours (CRASH-3)',
    citation: [13],
    next: 'dic-rare',
    summary: 'TIC = TXA 1g <3h, MTP 1:1:1, fibrinogen ≥1.5-2 g/L, calcium, normothermia; permissive hypotension OK except TBI',
  },

  {
    id: 'dic-rare',
    type: 'info',
    module: 3,
    title: 'Rare & Special Etiologies',
    body: '**Less common DIC triggers requiring specific knowledge:** [1][2]\n\n**Acute pancreatitis:**\n• Severe necrotizing disease activates coagulation via tissue factor and trypsin\n• Treatment: aggressive supportive care, source control of infected necrosis\n\n**Fulminant hepatic failure:**\n• Overlapping picture of DIC + liver failure\n• Factor VIII can help differentiate (normal/high in DIC, low in pure liver failure)\n• Treatment: supportive, transplant evaluation\n\n**Snake envenomation (especially viper, pit viper):**\n• Russell\'s viper, copperhead, rattlesnake — venom-induced consumption coagulopathy (VICC)\n• Treatment: **species-specific antivenom** is the only definitive treatment; products are temporizing\n\n**Heat stroke:**\n• Endothelial damage + cytokines drive DIC\n• Aggressive cooling + supportive care\n\n**Giant hemangiomas (Kasabach-Merritt syndrome):**\n• Pediatric vascular tumor traps platelets and consumes factors\n• Treatment: sirolimus, vincristine, propranolol, surgical resection\n\n**Aortic aneurysm / dissection:**\n• Chronic low-grade DIC\n• Definitive: endovascular or open repair\n\n**Transfusion reactions / hemolytic crises:**\n• ABO mismatch, severe hemolysis can trigger DIC\n• Stop transfusion, supportive care, identify cause',
    citation: [1, 2],
    next: 'dic-bleeding-vs-not',
    summary: 'Rare triggers: pancreatitis, hepatic failure, snake bite (antivenom!), heat stroke, hemangiomas (Kasabach-Merritt), aneurysm, transfusion rxn',
    skippable: true,
  },

  // =====================================================================
  // MODULE 4: HEMOSTATIC RESUSCITATION
  // =====================================================================

  {
    id: 'dic-bleeding-vs-not',
    type: 'question',
    module: 4,
    title: 'Bleeding vs Non-Bleeding Phenotype',
    body: '[Blood Product Order Sheet](#/info/dic-product-thresholds)\n\n**The single most important branch in DIC management.** [2][3][4]\n\n**Bleeding-dominant DIC** — replace what is consumed: [2][14]\n• Active hemorrhage from any site\n• Pre-procedure with abnormal coagulation\n• Obstetric, trauma, APL\n• **Aggressive product transfusion to specific thresholds**\n\n**Thrombotic / non-bleeding-dominant DIC** — minimize prophylactic transfusion: [2][4]\n• Microvascular thrombosis without overt bleeding\n• Sepsis, malignancy (Trousseau)\n• **Transfusion only if pre-procedure or critical thresholds breached**\n• Consider anticoagulation in select cases (Module 5)\n\n**Why this matters:** [2][14]\n• Prophylactic transfusion in non-bleeding DIC has not shown benefit and may worsen thrombosis\n• "Treating the labs" without bleeding wastes products and can harm\n\nWhich phenotype?',
    citation: [2, 3, 4, 14],
    options: [
      {
        label: 'Bleeding — Active or Pre-Procedure',
        description: 'Hemorrhage, surgery, obstetric, trauma — proceed to product thresholds',
        next: 'dic-platelets',
        urgency: 'critical',
      },
      {
        label: 'Non-Bleeding — Thrombotic / Compensated',
        description: 'Sepsis, malignancy, no overt hemorrhage — minimize transfusion',
        next: 'dic-product-overlay',
      },
    ],
    summary: 'Bleeding-dominant = aggressive replacement to thresholds; thrombotic = minimize transfusion, consider anticoag — single most important decision',
  },

  {
    id: 'dic-platelets',
    type: 'info',
    module: 4,
    title: 'Platelet Transfusion',
    body: '**Thresholds:** [2][14]\n\n| Clinical scenario | Platelet target |\n|-------------------|-----------------|\n| Active bleeding | **≥50 × 10⁹/L** |\n| Severe head bleed (ICH/TBI) or neuraxial procedure | **≥100 × 10⁹/L** |\n| Pre-procedure (LP, central line, surgery) | ≥50 × 10⁹/L |\n| Non-bleeding, ICU | **≥20 × 10⁹/L** prophylaxis |\n| Non-bleeding, stable | ≥10 × 10⁹/L (controversial in DIC) |\n\n**Dosing:**\n• 1 apheresis unit (or 1 pool of pooled platelets) raises count by ~30-50 × 10⁹/L\n• Recheck count 10-60 minutes post-transfusion\n• In refractory cases (immune-mediated), use HLA-matched if available\n\n**APL exception:** Keep platelets ≥30-50 × 10⁹/L due to bleeding mortality. [11]\n\n**Pearl:** [2]\n• Do NOT transfuse for asymptomatic mild thrombocytopenia in non-bleeding sepsis-DIC\n• Recheck after each unit and reassess clinical bleeding',
    citation: [2, 11, 14],
    next: 'dic-ffp',
    summary: 'Plt ≥50 if bleeding, ≥100 if ICH/neuraxial, ≥20 if non-bleeding ICU; 1 apheresis unit raises by 30-50; APL keep ≥30-50',
  },

  {
    id: 'dic-ffp',
    type: 'info',
    module: 4,
    title: 'Fresh Frozen Plasma (FFP)',
    body: '**Indication:** [2][14]\n• PT or aPTT >1.5× ULN AND active bleeding (or pre-procedure)\n\n**Do NOT transfuse FFP for abnormal labs alone in non-bleeding patient.** [2]\n\n**Dosing:** [2][14]\n• **15 mL/kg IV** (typically 4 units for 70 kg adult)\n• Each unit ≈ 250 mL\n• Recheck PT/PTT 30 minutes post-infusion\n• Repeat as needed for ongoing bleeding\n\n**Volume considerations:** [14]\n• Significant volume load — caution in CHF, ARDS, pediatrics\n• 4-Factor PCC (Module 4 next node) is volume-sparing alternative for warfarin reversal or volume-restricted patients\n\n**ABO compatibility:** [14]\n• ABO-compatible plasma\n• Universal donor: AB plasma (rare, expensive)\n• Universal recipient: O plasma not used\n\n**Pearl:** [2]\n• In massive transfusion, give 1:1:1 (RBC:FFP:plt) without waiting for labs until viscoelastic-guided.\n• In stable bleeding DIC, target PT/PTT <1.5× ULN.',
    citation: [2, 14],
    next: 'dic-cryo',
    summary: 'FFP 15 mL/kg if PT/PTT >1.5x ULN AND bleeding; do NOT transfuse for labs alone; volume burden is real',
  },

  {
    id: 'dic-cryo',
    type: 'info',
    module: 4,
    title: 'Cryoprecipitate / Fibrinogen',
    body: '**Cryoprecipitate is the fibrinogen-replacement product of choice in DIC.** [2][12][14]\n\n**Thresholds (etiology-dependent):** [2][12]\n\n| Setting | Fibrinogen target |\n|---------|-------------------|\n| Non-pregnant DIC with bleeding | **≥1.5 g/L** |\n| Obstetric DIC / PPH | **≥2 g/L** (higher because pregnant baseline is 4-6 g/L) |\n| APL / leukemia DIC | **≥1.5-2 g/L** (some experts say 2) |\n| Massive transfusion | ≥1.5-2 g/L |\n| Trauma (TIC) | ≥1.5-2 g/L |\n\n**Dosing:** [14]\n• **10 units cryoprecipitate** (1 pool ≈ 5 units) raises fibrinogen by ~0.5-1 g/L in adult\n• Or **0.06 units/kg** (each unit ≈ 5-10 mL, contains ~150-250 mg fibrinogen)\n• Each unit also contains factor VIII, vWF, factor XIII, fibronectin\n\n**Fibrinogen concentrate (RiaSTAP):** [14]\n• 25-100 mg/kg IV (typical 4 g for 70 kg)\n• Pathogen-reduced, volume-sparing\n• Available in many centers\n• Useful when cryo unavailable or volume-restricted\n\n**Recheck fibrinogen 30-60 min post-infusion.** [14]',
    citation: [2, 12, 14],
    next: 'dic-pcc',
    summary: 'Cryo if fibrinogen <1.5 g/L (<2 g/L if obstetric); 10 units or 0.06 u/kg raises by 0.5-1 g/L; fibrinogen concentrate is volume-sparing alternative',
  },

  {
    id: 'dic-pcc',
    type: 'info',
    module: 4,
    title: '4-Factor PCC in DIC',
    body: '**Use in DIC is selective and controversial.** [2][14]\n\n**Indications:** [14]\n• Volume-restricted patient with severe coagulopathy and bleeding\n• Reversal of vitamin K antagonist on top of DIC\n• When FFP is not feasible (volume overload, time, immediate need)\n\n**Dosing:** [14]\n• **25-50 units/kg IV** (Kcentra, Beriplex, Octaplex)\n• 25 units/kg if INR 2-4\n• 35 units/kg if INR 4-6\n• 50 units/kg if INR >6 or major bleed\n• Max 5000 units regardless of weight\n\n**Cautions in DIC:** [2][14]\n• Contains procoagulant factors (II, VII, IX, X) and small amounts of C, S, antithrombin\n• Theoretical thrombosis risk in already-procoagulant state\n• Most evidence is in trauma TIC and warfarin reversal, NOT classic septic DIC\n• Discuss with hematology before using as primary DIC therapy\n\n**Vitamin K co-administration:** [14]\n• If VKA reversal: 10 mg IV vitamin K with PCC\n• Effect of PCC fades in 6-24h; vitamin K provides durable reversal\n\n**Alternative:** Activated FVIIa is rarely used in DIC due to thrombosis risk and lack of evidence. [14]',
    citation: [2, 14],
    next: 'dic-product-overlay',
    summary: '4F-PCC 25-50 u/kg if volume-restricted or VKA reversal — controversial in pure DIC, theoretic thrombosis risk; discuss with heme',
  },

  {
    id: 'dic-product-overlay',
    type: 'info',
    module: 4,
    title: 'Blood Product Order Reference',
    body: '[Blood Product Order Sheet](#/info/dic-product-thresholds)\n\nAccess the full blood product order sheet via the toolbar overlay or the link above.\n\n**Quick reference:** [2][12][14]\n\n| Product | When | Dose |\n|---------|------|------|\n| Platelets | Bleeding + plt <50 (or <100 if ICH/neuraxial) | 1 apheresis unit |\n| FFP | PT/aPTT >1.5× ULN + bleeding | 15 mL/kg |\n| Cryoprecipitate | Fibrinogen <1.5 g/L (<2 g/L obstetric) + bleeding | 10 units or 0.06 u/kg |\n| 4F-PCC | Volume-restricted or VKA reversal | 25-50 u/kg |\n| Fibrinogen concentrate | Cryo unavailable or volume-restricted | 25-100 mg/kg |\n\n**Massive transfusion ratio:** 1:1:1 (RBC:FFP:platelets) until viscoelastic-guided. [13]\n\n**Always:** Type & screen, alert blood bank early, recheck labs 30-60 min after each round.',
    citation: [2, 12, 13, 14],
    next: 'dic-heparin',
    summary: 'Quick ref: plt 1 apheresis (≥50 bleed), FFP 15 mL/kg (PT >1.5x), cryo 10u (fib <1.5/<2 OB), 4F-PCC 25-50 u/kg; MTP 1:1:1',
    skippable: true,
  },

  // =====================================================================
  // MODULE 5: ADJUNCTS & ANTICOAGULATION
  // =====================================================================

  {
    id: 'dic-heparin',
    type: 'info',
    module: 5,
    title: 'Heparin in DIC',
    body: '**Heparin in DIC is highly selective and never first-line.** [4][9][14]\n\n**Consider heparin (or LMWH) ONLY if:** [4][9][14]\n• **Thrombotic-dominant phenotype** without active bleeding\n• Macrovascular thrombosis (DVT, PE, arterial occlusion)\n• Trousseau syndrome (cancer-associated thrombosis) — LMWH is first-line\n• Purpura fulminans / extensive microvascular thrombosis\n\n**AVOID heparin in:** [4][11][12]\n• Bleeding-dominant DIC\n• APL\n• Obstetric DIC with active hemorrhage\n• Recent surgery / trauma with bleeding risk\n• Severe thrombocytopenia (<50 × 10⁹/L)\n• Suspected HIT\n\n**Dosing (when indicated):** [9][14]\n• LMWH (enoxaparin) 1 mg/kg SC q12h or 1.5 mg/kg SC daily\n• Unfractionated heparin: 5000 unit bolus then 500-1000 units/hr (titrate to aPTT 1.5-2.5× control); some experts use lower-dose continuous (300-500 units/hr) without bolus\n• Renal adjust (CrCl <30): UFH preferred over LMWH\n\n**Monitoring:** [9]\n• aPTT or anti-Xa\n• Platelet count for HIT\n• Bleeding\n\n**Pearl:** Most modern DIC guidelines (ISTH 2024) reserve heparin for clear macrovascular or microvascular thrombosis. Do NOT use empirically. [4]',
    citation: [4, 9, 11, 12, 14],
    next: 'dic-tranexamic',
    summary: 'Heparin only if thrombotic-dominant + no bleeding; LMWH for Trousseau; AVOID in APL, obstetric bleeding, severe thrombocytopenia',
  },

  {
    id: 'dic-tranexamic',
    type: 'info',
    module: 5,
    title: 'Tranexamic Acid (TXA)',
    body: '**TXA is selective in DIC — etiology matters.** [12][13]\n\n**Use TXA in:** [12][13]\n• **Trauma (TIC)** — CRASH-2: 1 g IV bolus + 1 g over 8 hours, given within 3 hours of injury\n• **Postpartum hemorrhage / obstetric DIC** — WOMAN trial: 1 g IV within 3 hours\n• **TBI with intracranial hemorrhage** — CRASH-3: 1 g IV within 3 hours\n• **Surgical bleeding with hyperfibrinolysis** on TEG/ROTEM\n\n**AVOID TXA in:** [11][12]\n• **APL** — controversial; may increase thrombosis risk; not part of standard APL bundle\n• **Snake envenomation** with concurrent thrombotic features\n• **Active thrombosis or recent thrombotic event**\n• **Macroscopic hematuria** — may form clots and obstruct ureters\n• **DIC without hyperfibrinolysis** — no clear benefit, theoretical thrombosis risk\n\n**Dosing:** [12][13]\n• **1 g IV bolus over 10 minutes**, repeat 1 g IV over 8 hours\n• Pediatric: 15-30 mg/kg IV bolus, max 1 g\n• Topical/oral routes available for less severe bleeding\n\n**Pearl:** TXA timing matters — efficacy drops with each hour delay; benefit lost after 3 hours in trauma/PPH. [12][13]',
    citation: [11, 12, 13],
    next: 'dic-antithrombin-tm',
    summary: 'TXA 1g IV in trauma, PPH, TBI within 3h (CRASH-2/3, WOMAN); avoid in APL, snake bite, active thrombosis, gross hematuria',
  },

  {
    id: 'dic-antithrombin-tm',
    type: 'info',
    module: 5,
    title: 'Antithrombin & Recombinant Thrombomodulin',
    body: '**Specialty agents — not standard in US emergency care, but increasingly studied.** [4][8][9]\n\n**Antithrombin (AT) concentrate:** [9]\n• Rationale: AT is consumed in DIC; replacement may restore endogenous anticoagulation\n• KyberSept trial (sepsis): no overall mortality benefit; subgroup with DIC and no concurrent heparin showed signal\n• Used in Japan and some European centers; not widely used in US\n• Dose: 30 IU/kg/day × 4 days (when used)\n\n**Recombinant thrombomodulin (rTM, ART-123):** [4][8]\n• Rationale: Activates protein C, suppresses inflammation, modulates coagulation\n• SCARLET trial (2019): no overall 28-day mortality benefit in sepsis-DIC\n• Approved in Japan; not FDA-approved in US\n• Subgroup analysis: possible benefit in patients with severe coagulopathy and not on concurrent heparin\n• Dose: 0.06 mg/kg/day × 6 days (when used)\n\n**Activated Protein C (drotrecogin alfa):** [9]\n• Withdrawn from market in 2011 after PROWESS-SHOCK showed no benefit and increased bleeding\n\n**ISTH 2024 stance:** [4]\n• rTM and AT may be considered in select sepsis-DIC patients in regions where available\n• Not standard of care in US\n• Decision should involve hematology / critical care\n\n**Pearl:** Trigger control + supportive care remain the mainstays. Anticoagulant therapies are adjunctive at best. [4]',
    citation: [4, 8, 9],
    next: 'dic-supportive',
    summary: 'AT concentrate and rTM are specialty agents — not US standard; SCARLET (rTM) and KyberSept (AT) negative overall but signals in DIC subgroups',
    skippable: true,
  },

  {
    id: 'dic-supportive',
    type: 'info',
    module: 5,
    title: 'Supportive Care',
    body: '**Supportive measures that reduce DIC progression:** [2][3]\n\n**Hemodynamics:** [3]\n• Adequate perfusion improves microcirculation and tissue oxygen delivery\n• Vasopressor of choice for septic DIC: norepinephrine\n• Avoid hypoperfusion (worsens microvascular thrombosis)\n\n**Oxygenation & ventilation:** [3]\n• Optimize oxygen delivery; avoid hypoxia\n• Lung-protective ventilation in ARDS\n\n**Acid-base & electrolytes:** [13]\n• Correct severe acidosis (pH <7.2 impairs coagulation enzyme function)\n• Maintain ionized calcium ≥1.1 mmol/L (citrate from products chelates Ca)\n• Replete magnesium\n\n**Temperature:** [13]\n• Avoid hypothermia (<35°C impairs platelet function and enzyme kinetics)\n• Warm fluids, blankets, forced-air warmers\n\n**Avoid pitfalls:** [2][3]\n• Do NOT use steroids empirically for DIC alone (only if indicated for trigger — septic shock with vasopressor-refractory hypotension, ATRA differentiation syndrome)\n• Do NOT delay source control while transfusing products\n• Do NOT discontinue anticoagulation without considering thrombotic burden\n\n**Documentation & multidisciplinary team:** [2]\n• Hematology, critical care, blood bank, surgery/OB/onc as appropriate\n• Clear communication of bleeding vs thrombotic phenotype\n• Repeat scoring and labs documented in timeline',
    citation: [2, 3, 13],
    next: 'dic-monitoring',
    summary: 'Supportive: norepi for septic DIC, lung-protective vent, correct acidosis/Ca/Mg, normothermia; multidisciplinary team',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION & REASSESSMENT
  // =====================================================================

  {
    id: 'dic-monitoring',
    type: 'info',
    module: 6,
    title: 'Reassessment Schedule',
    body: '**DIC is dynamic — repeat scoring is essential.** [4]\n\n**During active resuscitation (first 6-24 hours):** [2][4]\n• CBC, PT/PTT, fibrinogen, D-dimer **every 4-6 hours**\n• Lactate, ABG q4-6h\n• Clinical bleeding survey q1-2h\n• ISTH score recomputed each cycle\n\n**Stabilization phase (24-72 hours):** [2][4]\n• Labs every 12 hours\n• Score recomputed daily\n• Reassess phenotype (bleeding ↔ thrombotic transitions can occur)\n\n**Recovery phase (>72 hours):** [4]\n• Labs daily, then space as appropriate\n• Watch for late thrombotic complications\n• De-escalate anticoagulation/antifibrinolytic therapy\n\n**Triggers to escalate:** [2][4]\n• New bleeding\n• ISTH score ≥5 if previously <5\n• Falling platelets >30% in 24 hours\n• Rising lactate, organ dysfunction\n• Failure of trigger control\n\n**Triggers to de-escalate:** [4]\n• Trigger controlled (source resolved, infection improving, postpartum recovery)\n• Platelets recovering\n• Fibrinogen stable above target\n• Score trending down ≥2 points',
    citation: [2, 4],
    next: 'dic-resolution',
    summary: 'Resuscitation: q4-6h labs; stabilization: q12h; recovery: daily — repeat ISTH each cycle, watch for phenotype switch',
  },

  {
    id: 'dic-resolution',
    type: 'info',
    module: 6,
    title: 'Defining Resolution',
    body: '**No formal universal criteria, but practical signs of resolution:** [4]\n\n**Laboratory resolution:** [4]\n• Platelets >100 × 10⁹/L and stable/rising\n• PT/aPTT within 1.2× ULN\n• Fibrinogen ≥2 g/L (≥4 g/L in postpartum recovery)\n• D-dimer trending down (may stay elevated for days-weeks)\n• ISTH score <5 sustained ≥48 hours\n\n**Clinical resolution:** [4]\n• No active bleeding\n• No new thrombotic events\n• Trigger controlled (source resolved, infection clearing, definitive obstetric/oncologic management complete)\n• Hemodynamic stability without escalating support\n• Improving organ function\n\n**Pitfalls — premature declaration of resolution:** [4]\n• Fibrinogen normalizes last — do not stop monitoring on platelet recovery alone\n• Late thrombotic complications can occur after lab normalization\n• Sepsis may relapse\n• Postpartum recovery can be biphasic\n\n**Long-term considerations:** [10]\n• Cancer-associated DIC: continue LMWH per oncology\n• Survivors of severe sepsis-DIC: VTE prophylaxis post-ICU\n• APL survivors: maintenance ATRA + arsenic per oncology',
    citation: [4, 10],
    next: 'dic-disposition',
    summary: 'Resolution: plt >100 & stable, PT/PTT <1.2x, fibrinogen ≥2 g/L, ISTH <5 x48h + trigger controlled; D-dimer lags weeks',
    skippable: true,
  },

  {
    id: 'dic-disposition',
    type: 'result',
    module: 6,
    title: 'Disposition & Consults',
    body: '**Most DIC patients require ICU admission.** [2][3]\n\n**ICU criteria — virtually all DIC:** [2]\n• Active bleeding\n• Hemodynamic instability\n• Need for blood product resuscitation\n• Multi-organ dysfunction\n• Need for invasive monitoring or vasopressor support\n• Severe trigger (sepsis, trauma, AFE, APL)\n\n**Floor / step-down considerations:** [2]\n• Mild non-overt DIC with controlled trigger\n• Stable platelets and coagulation\n• No active bleeding\n• Close monitoring available\n\n**Emergent consults:** [2][11][12]\n• **Hematology** — for all DIC; co-manage product strategy and anticoagulation\n• **Critical care / ICU** — for admission and ongoing resuscitation\n• **Source-specific:**\n  - **Surgery** — for source control (abscess, perforation, trauma)\n  - **OB** — for obstetric DIC\n  - **Oncology** — for APL (heme/onc), Trousseau\n  - **Interventional radiology** — for embolization (PPH, GI bleed)\n  - **Blood bank** — for massive transfusion protocol activation\n\n**Transfer considerations:** [11]\n• APL → tertiary heme/onc center after ATRA started and stabilized\n• Severe trauma → Level 1 trauma center if not already\n• AFE → tertiary OB / ECMO-capable center\n\n**Communication checklist:**\n• Trigger and treatment status\n• Phenotype (bleeding vs thrombotic)\n• Latest labs and scores\n• Products given and response\n• Active interventions and pending consults',
    recommendation: 'ICU admission for nearly all DIC patients. Emergent hematology + source-specific consults (OB, oncology, surgery, IR). Transfer to tertiary care if APL, severe trauma, or AFE.',
    confidence: 'definitive',
    citation: [2, 3, 11, 12],
  },

];

export const DIC_MODULE_LABELS = [
  'Recognition & Suspect Triggers',
  'Diagnostic Workup & Scoring',
  'Etiology-Specific Pathways',
  'Hemostatic Resuscitation',
  'Adjuncts & Anticoagulation',
  'Disposition & Reassessment',
];

export const DIC_CITATIONS: Citation[] = [
  { num: 1, text: 'Levi M, Toh CH, Thachil J, Watson HG. Guidelines for the diagnosis and management of disseminated intravascular coagulation. Br J Haematol. 2009;145(1):24-33.' },
  { num: 2, text: 'Levi M, Scully M. How I treat disseminated intravascular coagulation. Blood. 2018;131(8):845-854.' },
  { num: 3, text: 'Toh CH, Alhamdi Y, Abrams ST. Current pathological and laboratory considerations in the diagnosis of disseminated intravascular coagulation. Ann Lab Med. 2016;36(6):505-512.' },
  { num: 4, text: 'Iba T, Levy JH, Maier CL, et al. Updated definition and scoring of disseminated intravascular coagulation in 2025: communication from the ISTH SSC Subcommittee on DIC. J Thromb Haemost. 2025;23(7):2356-2362. (Phase-based classification: pre-DIC, early-phase, overt DIC; two phenotypes: thrombotic vs hemorrhagic).' },
  { num: 5, text: 'Taylor FB, Toh CH, Hoots WK, Wada H, Levi M; ISTH SSC. Towards definition, clinical and laboratory criteria, and a scoring system for disseminated intravascular coagulation. Thromb Haemost. 2001;86(5):1327-1330.' },
  { num: 6, text: 'British Society for Haematology guideline on the management of disseminated intravascular coagulation in haematological malignancy. Br J Haematol. 2022;199(1):29-40.' },
  { num: 7, text: 'Gando S, Iba T, Eguchi Y, et al. A multicenter, prospective validation of disseminated intravascular coagulation diagnostic criteria for critically ill patients: comparing current criteria. Crit Care Med. 2006;34(3):625-631.' },
  { num: 8, text: 'Iba T, Nisio MD, Levy JH, Kitamura N, Thachil J. New criteria for sepsis-induced coagulopathy (SIC) following the revised sepsis definition. JTH. 2017;15(3):518-526.' },
  { num: 9, text: 'Connors JM. Anticoagulation management of patients with sepsis-induced coagulopathy and disseminated intravascular coagulation. Hematology Am Soc Hematol Educ Program. 2023;2023(1):615-622.' },
  { num: 10, text: 'Falanga A, Schieppati F, Russo D. Cancer tissue procoagulant mechanisms and the hypercoagulable state of patients with cancer. Semin Thromb Hemost. 2015;41(7):756-764.' },
  { num: 11, text: 'Lo-Coco F, Avvisati G, Vignetti M, et al. Retinoic acid and arsenic trioxide for acute promyelocytic leukemia. N Engl J Med. 2013;369(2):111-121.' },
  { num: 12, text: 'Sankar A, Bhatti S, Olutoye OA, et al. Disseminated intravascular coagulation in obstetrics: a contemporary clinical review. Am J Obstet Gynecol MFM. 2024;6(2):101230.' },
  { num: 13, text: 'Spahn DR, Bouillon B, Cerny V, et al. The European guideline on management of major bleeding and coagulopathy following trauma: sixth edition. Crit Care. 2023;27(1):80.' },
  { num: 14, text: 'Thachil J, Adelborg K, Connors JM, et al. ISTH SSC subcommittee guidance on prothrombin complex concentrate use in the bleeding patient. J Thromb Haemost. 2023;21(5):1238-1247.' },
];

export const DIC_NODE_COUNT = DIC_NODES.length;

export const DIC_CRITICAL_ACTIONS = [
  { text: 'DIC is always secondary — find and treat the underlying trigger first; everything else is supportive', nodeId: 'dic-start' },
  { text: 'Differentiate bleeding-dominant vs thrombotic-dominant phenotype — the single most important branch in management', nodeId: 'dic-bleeding-vs-not' },
  { text: 'ISTH score ≥5 = overt DIC; SIC score ≥4 in sepsis identifies progression risk before overt DIC', nodeId: 'dic-isth-score' },
  { text: 'APL: start ATRA 45 mg/m²/day immediately on suspicion, keep fibrinogen >150-200, AVOID heparin and TXA', nodeId: 'dic-apl' },
  { text: 'Obstetric DIC: cryo to keep fibrinogen ≥2 g/L (not <1), TXA 1g IV within 3 hours, MTP 1:1:1', nodeId: 'dic-obstetric' },
  { text: 'Trauma (TIC): TXA 1g <3h, MTP 1:1:1, fibrinogen ≥1.5-2 g/L, calcium replacement, normothermia', nodeId: 'dic-trauma' },
  { text: 'Platelets ≥50 if bleeding (≥100 if ICH/neuraxial); FFP 15 mL/kg if PT/PTT >1.5× ULN with bleeding', nodeId: 'dic-platelets' },
  { text: 'Cryoprecipitate 10 units (or 0.06 u/kg) raises fibrinogen by 0.5-1 g/L; fibrinogen concentrate 25-100 mg/kg if volume-restricted', nodeId: 'dic-cryo' },
  { text: 'Heparin only if thrombotic-dominant phenotype without bleeding; LMWH first-line for Trousseau syndrome', nodeId: 'dic-heparin' },
  { text: 'Repeat ISTH score every 6-12 hours during resuscitation — trends matter more than single values', nodeId: 'dic-monitoring' },
];
