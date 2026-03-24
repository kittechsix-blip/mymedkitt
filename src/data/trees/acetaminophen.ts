// MedKitt — Acetaminophen Overdose
// #1 cause of acute liver failure in the US. Ingestion pattern → Risk stratification → NAC protocol → Massive OD management → Hepatic failure → Disposition
// 6 modules: Initial Assessment → Risk Stratification → NAC Protocol → Massive Overdose → Hepatic Failure → Disposition
// 30 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ACETAMINOPHEN_OD_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'apap-start',
    type: 'question',
    module: 1,
    title: 'Acetaminophen Overdose — Initial Assessment',
    body: '[APAP Overdose Steps Summary](#/info/apap-summary)\n\nAcetaminophen is the **most common cause of acute liver failure** in the US and UK. Found in >600 OTC and prescription products (Tylenol, Percocet, Vicodin, NyQuil, Excedrin, Fioricet). [1][3]\n\n**Therapeutic dose:** 10-15 mg/kg per dose (max 4g/day; 2g/day in chronic alcoholics)\n**Toxic dose:** >150 mg/kg (single ingestion) or >7.5g total in adults [1]\n\n**Mechanism:** Normal metabolism: 90% glucuronidation/sulfation → nontoxic. ~5% oxidized by CYP2E1 → **NAPQI** (toxic metabolite) → detoxified by glutathione. In overdose: conjugation saturated → excess NAPQI → glutathione depletion → **hepatocellular necrosis**. [1][3]\n\n**N-acetylcysteine (NAC)** is a glutathione precursor — nearly **100% effective** when given within 8 hours of ingestion. [2]\n\nDetermine the ingestion pattern:',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'rumack-matthew', label: 'Rumack-Matthew Nomogram' },
      { id: 'nac-dosing', label: 'NAC IV Dosing' },
      { id: 'kings-college', label: "King's College Criteria" },
      { id: 'alt-apap-product', label: '(ALT)(APAP) Product' },
    ],
    options: [
      {
        label: 'Acute Single Ingestion',
        description: 'Known or suspected single ingestion within 24 hours',
        next: 'apap-acute-hx',
      },
      {
        label: 'Repeated Supratherapeutic',
        description: 'Multiple ingestions spanning >24 hours (including chronic use)',
        next: 'apap-chronic-hx',
      },
      {
        label: 'Unknown / Unreliable History',
        description: 'Conflicting statements, unknown timing, or insufficient detail',
        next: 'apap-unknown',
      },
    ],
  },

  {
    id: 'apap-acute-hx',
    type: 'info',
    module: 1,
    title: 'Acute Ingestion — History & Risk Factors',
    body: '**Gather critical history elements:**\n\n• **Dose** — Potentially toxic: >150 mg/kg or >7.5g total (>10g per IBCC). How many pills? What strength?\n• **Timing** — When did the ingestion occur? Single ingestion within <24h?\n• **Formulation** — Immediate-release or extended-release?\n• **Coingestants** — Opioids/anticholinergics delay absorption → delayed peak APAP level\n• **Intent** — Intentional vs unintentional (affects disposition — psych eval required for intentional) [6]\n\n[Risk Factors for Enhanced Toxicity](#/info/apap-risk-factors)\n\n**Risk factors for enhanced toxicity (lower threshold for treatment):**\n• **CYP2E1 inducers:** Isoniazid, rifampin, phenobarbital, carbamazepine, phenytoin, chronic alcohol\n• **Glutathione depletion:** Chronic alcohol, malnutrition/fasting, chronic APAP use, chronic liver disease\n• **Decreased glucuronidation:** Gilbert disease, zidovudine, TMP-SMX [4][12]\n\n**Is the history reliable?** History is unreliable if: insufficient detail for dose/time, conflicting statements, or symptoms/labs inconsistent with stated history. When in doubt, treat as unreliable. [6]',
    citation: [4, 6, 12],
    next: 'apap-acute-strat',
  },

  {
    id: 'apap-chronic-hx',
    type: 'info',
    module: 1,
    title: 'Repeated Supratherapeutic Ingestion',
    body: '[Chronic/Repeated Supratherapeutic Ingestion](#/info/apap-chronic-ingestion)\n\nRepeated supratherapeutic ingestion = **multiple ingestions spanning >24 hours** (including acute-on-chronic use). More common than acute OD in clinical practice. [6][17]\n\n**The Rumack-Matthew nomogram does NOT apply** — there is no single "time of ingestion" to plot.\n\nPresents with hepatotoxicity **without** early Stage 1 symptoms (nausea/vomiting). Patients may present directly with RUQ pain and elevated transaminases.\n\n**"Alcohol-Tylenol Syndrome":** Chronic alcohol use + chronic acetaminophen = hepatotoxicity at doses generally considered safe (<4g/day). Double mechanism: CYP2E1 induction + glutathione depletion. [17]\n\n**Inadvertent overdose** is especially dangerous — subacute glutathione depletion may not trigger alarm until significant hepatic injury has occurred.',
    citation: [6, 17],
    next: 'apap-chronic-eval',
  },

  {
    id: 'apap-unknown',
    type: 'info',
    module: 1,
    title: 'Unknown Ingestion Pattern',
    body: '**Unreliable history — cannot apply nomogram.**\n\nCriteria for unreliable history: [6]\n• Insufficient detail to establish dose and time\n• Conflicting statements\n• Symptoms, signs, or lab values inconsistent with stated history\n\n**Immediate actions:**\n• Draw APAP level + AST/ALT + INR + BMP + lactate NOW\n• Salicylate level (coingestion screening)\n• If APAP detectable OR ALT elevated → **start NAC empirically**\n• If massive ingestion suspected (AMS, early lactic acidosis) → treat as high-risk\n\n**When in doubt → give NAC.** Minimal side effects, potentially life-saving. [2]',
    citation: [2, 6],
    next: 'apap-empiric-nac',
  },

  // =====================================================================
  // MODULE 2: RISK STRATIFICATION
  // =====================================================================

  {
    id: 'apap-acute-strat',
    type: 'question',
    module: 2,
    title: 'Acute Ingestion — APAP Level & Timing',
    body: '**Draw serum APAP level at 4 hours post-ingestion** (or immediately if >4 hours since ingestion). Plot on the Rumack-Matthew nomogram. [4][6]\n\n[Rumack-Matthew Nomogram Guide](#/info/apap-nomogram)\n\n**Treatment line:** 150 mcg/mL at 4h (US uses this line; original Rumack line was 200)\n**High-risk line:** 300 mcg/mL at 4h (indicates massive overdose)\n\nIf level drawn <4h: An undetectable concentration after >2h typically excludes significant ingestion, but repeat at ≥4h to confirm. [6]\n\n**Labs to order:** APAP level, AST/ALT, INR/PT, BMP (Cr, glucose, bicarb), lipase, bilirubin, CBC, salicylate level, lactate, VBG/ABG. [1]',
    citation: [4, 6],
    calculatorLinks: [
      { id: 'rumack-matthew', label: 'Rumack-Matthew Nomogram' },
    ],
    options: [
      {
        label: 'Below Treatment Line (150)',
        description: 'APAP level below 150 mcg/mL at 4h (or below line at later time)',
        next: 'apap-below-line',
      },
      {
        label: 'Above Treatment Line (150-300)',
        description: 'Between treatment and high-risk lines — start NAC',
        next: 'apap-above-line',
        urgency: 'urgent',
      },
      {
        label: 'Above High-Risk Line (>300)',
        description: '>300 mcg/mL at 4h — massive overdose protocol',
        next: 'apap-high-risk',
        urgency: 'critical',
      },
      {
        label: 'Extended-Release or Coingestant',
        description: 'ER formulation or opioid/anticholinergic coingestant',
        next: 'apap-er-coingest',
      },
    ],
  },

  {
    id: 'apap-er-coingest',
    type: 'question',
    module: 2,
    title: 'Extended-Release / Coingestant Considerations',
    body: '**Extended-release tablets or opioid/anticholinergic coingestants** may delay peak APAP absorption, making a single level unreliable. [6][13]\n\n**If APAP level at 4-12h is above the treatment line** → treatment is indicated regardless.\n\n**If APAP level at 4-24h is <10 mcg/mL** → no further levels needed, no treatment.\n\n**If APAP level at 4-12h is below treatment line but >10 mcg/mL** → redraw in 4-6 hours. If second level is above the line at its corresponding time point → treat. [6]\n\n⚠️ Modified-release tablets (available outside the US) are more problematic and unpredictable — consult local toxicologists.',
    citation: [6, 13],
    options: [
      {
        label: 'Level Above Treatment Line',
        description: 'Start NAC — treatment indicated',
        next: 'apap-above-line',
        urgency: 'urgent',
      },
      {
        label: 'Level <10 mcg/mL',
        description: 'No further levels or treatment needed',
        next: 'apap-observe',
      },
      {
        label: 'Below Line but >10 mcg/mL',
        description: 'Redraw in 4-6 hours — delayed absorption possible',
        next: 'apap-below-line',
      },
    ],
  },

  {
    id: 'apap-chronic-eval',
    type: 'question',
    module: 2,
    title: 'Chronic Ingestion — Lab Evaluation',
    body: '**Rumack-Matthew nomogram does NOT apply to repeated supratherapeutic ingestion.** [6]\n\nOrder: APAP level, AST/ALT, INR, BMP, lactate.\n\nUse the **(ALT)(APAP) product** to assess hepatotoxicity risk: [17]\n• **>10,000 mcg/mL × IU/L** = strongly associated with hepatotoxicity\n• **<1,500 mcg/mL × IU/L** = hepatotoxicity very unlikely\n\nTreat if **any** of the following:\n• ALT elevated above normal\n• APAP level detectable\n• (ALT)(APAP) product >10,000\n• Clinical concern despite labs (risk factors present)',
    citation: [6, 17],
    calculatorLinks: [
      { id: 'alt-apap-product', label: '(ALT)(APAP) Product' },
    ],
    options: [
      {
        label: 'ALT Elevated or APAP Detectable',
        description: 'Start NAC — hepatotoxicity risk',
        next: 'apap-chronic-treat',
        urgency: 'urgent',
      },
      {
        label: 'Normal Labs, Low (ALT)(APAP) Product',
        description: 'ALT normal, APAP undetectable, product <1,500',
        next: 'apap-chronic-discharge',
      },
    ],
  },

  {
    id: 'apap-chronic-treat',
    type: 'info',
    module: 2,
    title: 'Chronic Ingestion — Start NAC',
    body: '**Initiate IV NAC** — chronic/repeated supratherapeutic ingestion with evidence of hepatotoxicity or ongoing APAP exposure.\n\nUse standard 3-bag IV protocol. Consult toxicology/poison control — these cases are complex. [6]\n\nSerial labs q6h: APAP level, AST/ALT, INR, BMP. Recalculate (ALT)(APAP) product with each set to track trajectory.\n\nStopping criteria are the same as for acute ingestion: APAP <10 mcg/mL + INR <2 + AST/ALT improving + clinically well.',
    citation: [6],
    next: 'apap-nac-iv',
  },

  {
    id: 'apap-chronic-discharge',
    type: 'result',
    module: 2,
    title: 'Chronic Ingestion — Low Risk',
    body: '**Low risk of hepatotoxicity.**\n\nALT is normal, APAP is undetectable, and (ALT)(APAP) product <1,500.\n\n• Counsel on safe acetaminophen use: max 4g/day (2g/day with chronic alcohol use)\n• Avoid combining multiple APAP-containing products\n• If risk factors present (chronic alcohol, malnutrition), consider lower observation threshold\n• **Poison Control: 1-800-222-1222**\n\nConsult toxicology if any clinical uncertainty.',
    recommendation: 'Low-risk chronic ingestion — consider discharge after counseling on safe APAP use',
    confidence: 'recommended',
    citation: [6],
  },

  {
    id: 'apap-below-line',
    type: 'question',
    module: 2,
    title: 'Below Treatment Line',
    body: 'APAP level is **below the treatment line** on the Rumack-Matthew nomogram. Low risk of hepatotoxicity **if this is a reliable acute single ingestion**. [4][6]\n\n**However, consider:**\n• Extended-release or coingestant → serial levels needed (see above)\n• Risk factors (CYP2E1 inducers, alcoholism, malnutrition) → lower threshold to treat\n• Any doubt about history reliability → empiric NAC\n\nIf <4 hours since ingestion, GI decontamination with activated charcoal may still be beneficial.\n\n**If any doubt → give NAC.** It is extremely safe. [2]',
    citation: [2, 4, 6],
    options: [
      {
        label: 'Confident in Low Risk',
        description: 'Reliable history, no risk factors, no coingestants',
        next: 'apap-observe',
      },
      {
        label: 'Within 4 Hours — Give Charcoal',
        description: 'Ingestion <4h ago, patient alert with protected airway',
        next: 'apap-gi-decon',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: NAC PROTOCOL
  // =====================================================================

  {
    id: 'apap-gi-decon',
    type: 'info',
    module: 3,
    title: 'GI Decontamination — Activated Charcoal',
    body: '[Activated Charcoal](#/drug/activated-charcoal/acetaminophen toxicity) **1 g/kg PO (max 50g)**\n\n**Timing:** Within **4 hours** of ingestion (2023 US/Canada consensus extends traditional 1-2h window). [6]\n\n**Massive ingestion (>30g):** Consider activated charcoal even **>4 hours** post-ingestion — greatest benefit in massive poisoning where standard NAC may be inadequate. [9]\n\n**Extended-release formulations:** May benefit beyond 4h if evidence of ongoing absorption (rising APAP levels). [6]\n\n**Contraindications:**\n• Unprotected airway or altered mental status (aspiration risk)\n• Caustic coingestant\n• GI perforation or obstruction\n\n⚠️ **Do NOT delay NAC** for charcoal administration. Give charcoal and start NAC concurrently if indicated. [6]',
    citation: [6, 9],
    next: 'apap-nac-choice',
  },

  {
    id: 'apap-nac-choice',
    type: 'question',
    module: 3,
    title: 'NAC — Route Selection',
    body: '**N-Acetylcysteine (NAC)** is the definitive antidote. [2][3]\n\n[NAC Protocol Comparison](#/info/apap-nac-comparison)\n\n**Indications for NAC:**\n• APAP level above treatment line on nomogram\n• Time of ingestion unknown and APAP level detectable\n• Elevated transaminases with history of APAP ingestion\n• Ingestion >150 mg/kg and level won\'t be available within 8 hours\n• **Any doubt → give NAC** (minimal side effects, potentially life-saving) [6]\n\n**Pregnancy is NOT a contraindication** — NAC is safe and beneficial. Delayed treatment increases risk of miscarriage/fetal death. IV preferred in pregnancy. [10]\n\nSelect route:',
    citation: [2, 3, 6, 10],
    calculatorLinks: [
      { id: 'nac-dosing', label: 'NAC IV Dosing Calculator' },
    ],
    options: [
      {
        label: 'IV NAC — 21-Hour Protocol (Preferred)',
        description: '100% bioavailability, faster, avoids emesis',
        next: 'apap-nac-iv',
      },
      {
        label: 'Oral NAC — 72-Hour Protocol',
        description: 'No IV access or patient preference',
        next: 'apap-nac-oral',
      },
      {
        label: 'Two-Bag Modified Prescott',
        description: 'Lower anaphylactoid rate, used in Australia/NZ',
        next: 'apap-nac-twobag',
      },
    ],
  },

  {
    id: 'apap-nac-iv',
    type: 'info',
    module: 3,
    title: 'IV NAC — 21-Hour Protocol (Preferred)',
    body: '[N-Acetylcysteine](#/drug/n-acetylcysteine/acetaminophen iv)\n\n**Standard 3-Bag IV Protocol:**\n\n**Bag 1 (Loading):** 150 mg/kg IV in 200 mL D5W over **60 minutes**\n**Bag 2:** 50 mg/kg IV in 500 mL D5W over **4 hours** (12.5 mg/kg/hr)\n**Bag 3:** 100 mg/kg IV in 1000 mL D5W over **16 hours** (6.25 mg/kg/hr)\n\n**Total: 300 mg/kg over 21 hours** [3][6]\n\n**Cap dose at 100 kg** for morbid obesity. [6]\n\n**Anaphylactoid reactions** (flushing, urticaria, bronchospasm) most common during Bag 1. These are histamine-mediated (NOT IgE allergy). Slow or pause infusion; treat with antihistamines. **Do NOT permanently stop NAC.** [11]\n\nNAC itself may cause mild INR prolongation — do not confuse with hepatic synthetic failure.',
    citation: [3, 6, 11],
    next: 'apap-nac-anaphylactoid',
  },

  {
    id: 'apap-nac-oral',
    type: 'info',
    module: 3,
    title: 'Oral NAC — 72-Hour Protocol',
    body: '[N-Acetylcysteine](#/drug/n-acetylcysteine/acetaminophen oral)\n\n**Oral NAC Protocol:** [2]\n\n**Loading:** 140 mg/kg PO\n**Maintenance:** 70 mg/kg PO every 4 hours × 17 additional doses\n**Total: 1,330 mg/kg over 72 hours**\n\nMix with **cola or juice** to improve palatability (oral NAC has a terrible smell and taste).\nIf patient **vomits within 1 hour** of dose → repeat the dose.\nConsider [Ondansetron](#/drug/ondansetron/nausea) 30 minutes prior to reduce vomiting. [2]\n\n**Advantages:** No IV access needed, no anaphylactoid risk, higher hepatic first-pass delivery.\n**Disadvantages:** 72-hour duration, vomiting, low systemic bioavailability (4-10%). Activated charcoal may reduce oral NAC absorption — IV preferred when both are given.',
    citation: [2],
    next: 'apap-nac-stop',
  },

  {
    id: 'apap-nac-twobag',
    type: 'info',
    module: 3,
    title: 'Two-Bag Modified Prescott Protocol',
    body: '**Simplified 2-bag regimen** (used in Australia/New Zealand): [7][13]\n\n**Bag 1:** 200 mg/kg IV in D5W over **4 hours**\n**Bag 2:** 100 mg/kg IV in D5W over **16 hours**\n**Total: 300 mg/kg over 20 hours**\n\n**Lower rate of anaphylactoid reactions** compared to the standard 3-bag protocol — the slower initial infusion rate reduces histamine release. [7]\n\nSame total dose as the standard protocol. To avoid dosing errors, use the protocol your pharmacy is familiar with.\n\n[NAC Protocol Comparison](#/info/apap-nac-comparison)',
    citation: [7, 13],
    next: 'apap-nac-stop',
  },

  {
    id: 'apap-nac-anaphylactoid',
    type: 'info',
    module: 3,
    title: 'Anaphylactoid Reaction Management',
    body: '[NAC Anaphylactoid Reaction Management](#/info/apap-anaphylactoid)\n\n**NOT a true allergy** — histamine-mediated, not IgE. Usually within first 2 hours, almost always within 6 hours. In a study of **6,455 NAC treatment courses**, no deaths were attributed to anaphylactoid reactions. [11]\n\n**Graded response:**\n\n**Flushing only** → Continue NAC, monitor closely\n\n**Urticaria** → [Diphenhydramine](#/drug/diphenhydramine/angioedema) 1 mg/kg IV (max 50 mg). Consider steroid. **Continue NAC.**\n\n**Angioedema** → Diphenhydramine + steroid. **Hold NAC for 1 hour**, then resume at slower rate.\n\n**Respiratory symptoms or hypotension** → Diphenhydramine + steroid + [Epinephrine](#/drug/epinephrine/anaphylaxis) IM. Hold NAC for 1 hour, then resume.\n\n⚠️ **NEVER permanently discontinue NAC.** Liver failure from stopping NAC is far more dangerous than the anaphylactoid reaction. Previous reaction is NOT a contraindication to future use — can pre-treat with antihistamines. [11]',
    citation: [11],
    next: 'apap-nac-stop',
  },

  {
    id: 'apap-nac-stop',
    type: 'question',
    module: 3,
    title: 'When to Stop NAC',
    body: '**Continue NAC until ALL stopping criteria are met:** [6][13]\n\n✅ **1.** APAP level <10 mcg/mL (undetectable)\n✅ **2.** INR <2\n✅ **3.** AST/ALT meets ONE of:\n   • Normal\n   • At patient\'s baseline\n   • Decreased **>25-50% from peak** value\n✅ **4.** Clinically well\n\n**Note:** Small fluctuations in ALT (±20 IU/L or ±10%) are common and do not necessarily indicate ongoing injury, especially if the ALT level is low. [13]\n\nIf criteria are NOT met → continue NAC by **repeating the 3rd bag** (100 mg/kg over 16 hours) indefinitely.',
    citation: [6, 13],
    options: [
      {
        label: 'Criteria Met — Stop NAC',
        description: 'APAP undetectable, INR <2, AST/ALT improving, clinically well',
        next: 'apap-dispo-admit',
      },
      {
        label: 'Criteria NOT Met — Continue NAC',
        description: 'Repeat Bag 3 (100 mg/kg over 16h) indefinitely',
        next: 'apap-hepatic-failure',
        urgency: 'urgent',
      },
    ],
  },

  // =====================================================================
  // MODULE 4: MASSIVE OVERDOSE
  // =====================================================================

  {
    id: 'apap-above-line',
    type: 'info',
    module: 4,
    title: 'Above Treatment Line — Start NAC',
    body: '**APAP level is above the treatment line (150 mcg/mL at 4h).** Start NAC immediately. [4][6]\n\nNAC is nearly **100% effective** when given within 8 hours of ingestion. Efficacy decreases with delay but still provides benefit even after hepatic failure is established. [2]\n\n**Concurrent actions:**\n• GI decontamination with [Activated Charcoal](#/drug/activated-charcoal/acetaminophen toxicity) if within 4 hours\n• Labs: APAP level q4-6h, AST/ALT, INR, BMP, lactate\n• Salicylate level (coingestion screen)\n\nIf the level is **below** the 300 line → standard NAC protocol.\nIf the level is **above** the 300 line → massive overdose protocol (high-dose NAC).',
    citation: [2, 4, 6],
    next: 'apap-nac-choice',
  },

  {
    id: 'apap-high-risk',
    type: 'question',
    module: 4,
    title: 'High-Risk (Massive) Overdose',
    body: '[High-Dose NAC & Massive Overdose](#/info/apap-massive-od)\n\n**Definition of massive overdose:** [8][14]\n• >30 grams ingested (or >0.5 g/kg if <60 kg)\n• APAP level above the **300 line** on the nomogram\n\n**Clinical presentation:** Early **lactic acidosis** + **altered mental status** within 12 hours — due to mitochondrial dysfunction, **BEFORE liver damage occurs**. Other symptoms during Stage 1 (within 24h) suggest massive ingestion or coingestant. [8][16]\n\n**Standard NAC may be INADEQUATE** — NAC neutralizes NAPQI in a 1:1 molar ratio, so the dose must scale with the amount of acetaminophen. [8]\n\n**Activate all four interventions:**',
    citation: [8, 14, 16],
    options: [
      {
        label: 'High-Dose NAC Protocol',
        description: 'Hendrickson dosing — increase Bag 3 rate based on severity',
        next: 'apap-high-nac',
        urgency: 'critical',
      },
      {
        label: 'Fomepizole',
        description: 'CYP2E1 inhibitor — blocks NAPQI formation',
        next: 'apap-fomepizole',
        urgency: 'urgent',
      },
      {
        label: 'Hemodialysis Evaluation',
        description: 'EXTRIP criteria — removes APAP and NAPQI',
        next: 'apap-dialysis',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'apap-high-nac',
    type: 'info',
    module: 4,
    title: 'High-Dose NAC — Hendrickson Protocol',
    body: '[N-Acetylcysteine](#/drug/n-acetylcysteine/massive acetaminophen)\n\n**Hendrickson 2019:** Keep Bag 1 + Bag 2 standard. **INCREASE Bag 3 infusion rate** based on severity: [8]\n\n• **Above 300 line:** 12.5 mg/kg/hr (**2× standard**)\n• **Above 450 line:** 18.75 mg/kg/hr (**3× standard**)\n• **Above 600 line:** 25 mg/kg/hr (**4× standard**)\n\n**During hemodialysis:** Double whatever rate you would otherwise use. HD removes ~50% of NAC. Minimum rate during HD: 12.5 mg/kg/hr. Maximum: 25 mg/kg/hr. [6][9]\n\n⚠️ **Doubling the rate** is increasingly accepted. Tripling/quadrupling remains more controversial — **consult toxicology/poison control.** [14]\n\n**Activated charcoal:** Give even if >4 hours post-ingestion for massive overdose. [6][9]\n\n**Also give:** Activated charcoal (even >4h) + fomepizole + evaluate for hemodialysis.',
    citation: [6, 8, 9, 14],
    next: 'apap-fomepizole',
  },

  {
    id: 'apap-fomepizole',
    type: 'info',
    module: 4,
    title: 'Fomepizole — CYP2E1 Inhibition',
    body: '[Fomepizole](#/drug/fomepizole/massive acetaminophen)\n\n**Mechanism:** Inhibits CYP2E1 → **prevents conversion of acetaminophen to toxic NAPQI**. Complementary to NAC (which detoxifies NAPQI after it forms). [15]\n\n**Dosing:** 15 mg/kg IV over 30 minutes (loading) → 10 mg/kg IV q12h for 48 hours or until APAP level is undetectable. [15]\n\nFomepizole has shown benefit in animal models, primary human hepatocytes, and a human volunteer study (reduced toxic metabolite generation). [15]\n\n**Generally safe.** Main drawback is cost. Headache, nausea, dizziness are common but mild. Transient transaminase elevation in ~20%.\n\n**Indications:** Established high-risk/massive acetaminophen ingestion. Use alongside high-dose NAC. [14][15]\n\nConsult toxicology/poison control for all massive ingestions.',
    citation: [14, 15],
    next: 'apap-dialysis',
  },

  {
    id: 'apap-dialysis',
    type: 'info',
    module: 4,
    title: 'Hemodialysis — EXTRIP Guidelines',
    body: 'Hemodialysis removes both **APAP and toxic NAPQI metabolites**. May be beneficial in massive poisoning where NAC alone is inadequate. [9]\n\n**EXTRIP indications for extracorporeal treatment:** [9]\n• APAP level **>900 mcg/mL**\n• Altered mental status + lactate >3 + **pH <7.1**\n• Clinical deterioration despite adequate NAC\n• Mitochondrial dysfunction (early lactic acidosis, altered consciousness)\n\n⚠️ **Hemodialysis is NOT a substitute for NAC.** Patients on dialysis require **HIGHER NAC doses** because HD removes ~50% of NAC. Minimum 12.5 mg/kg/hr during intermittent HD. [6][9]\n\n**Coordinate with nephrology early** for massive ingestions. Continuous renal replacement therapy (CRRT) is an alternative if hemodynamically unstable.',
    citation: [6, 9],
    next: 'apap-hepatic-failure',
  },

  // =====================================================================
  // MODULE 5: HEPATIC FAILURE
  // =====================================================================

  {
    id: 'apap-hepatic-failure',
    type: 'info',
    module: 5,
    title: 'Established Hepatic Failure — Management',
    body: '[Four Stages of Acetaminophen Toxicity](#/info/apap-stages)\n\n[N-Acetylcysteine](#/drug/n-acetylcysteine/hepatic failure)\n\n**Continue IV NAC indefinitely** — repeat Bag 3 (100 mg/kg over 16 hours) until the patient recovers or dies. [5][10]\n\nNAC provides benefit **even in established hepatic failure** — proven **28% mortality benefit** in an RCT of patients with acetaminophen-induced fulminant hepatic failure (Keays 1991). [10]\n\n⚠️ **Do NOT allow the NAC infusion to stop** until the liver is clearly improving AND the APAP level is zero.\n\n**Assess for transplant referral immediately:**',
    citation: [5, 10],
    calculatorLinks: [
      { id: 'kings-college', label: "King's College Criteria" },
    ],
    next: 'apap-kings',
  },

  {
    id: 'apap-kings',
    type: 'info',
    module: 5,
    title: "King's College Criteria — Transplant Referral",
    body: "**APAP-induced acute liver failure — transplant referral criteria:** [5]\n\n**pH <7.30** after adequate fluid resuscitation (regardless of encephalopathy grade) — **alone is sufficient**\n\n**OR all three:**\n• INR **>6.5** (PT >100 sec)\n• Creatinine **>3.4 mg/dL**\n• Grade **III-IV** hepatic encephalopathy\n\n**Additional poor prognostic markers:**\n• Lactate >3.5 mmol/L after resuscitation\n• Phosphate >3.75 mg/dL at 48-96 hours\n\n**Contact transplant center EARLY** — do not wait for full criteria to be met. Patients with severe liver injury (encephalopathy, pH <7.3, INR >3, renal failure) should be discussed with a transplant team. [5]\n\nPatients with acute hepatic failure **CAN be transplant candidates** even after recent suicidal ingestion.",
    citation: [5],
    calculatorLinks: [
      { id: 'kings-college', label: "King's College Criteria" },
    ],
    next: 'apap-hepatic-support',
  },

  {
    id: 'apap-hepatic-support',
    type: 'info',
    module: 5,
    title: 'Supportive Care — Complications',
    body: '**Manage complications of hepatic failure:** [1][12][16]\n\n**Coagulopathy:**\n• FFP only if **ACTIVE bleeding** — FFP obscures INR trending, which is the single best prognostic marker\n• Vitamin K may be given but rarely helps in acute liver failure\n\n**Cerebral edema** (greatest risk of death in Stage 3):\n• Elevate HOB 30°\n• Hypertonic saline 23.4% for herniation\n• Mannitol 0.5-1 g/kg\n• Avoid stimulation, maintain normothermia\n\n**Hypoglycemia:**\n• D10W continuous infusion\n• Frequent glucose monitoring (q1-2h)\n\n**Renal failure** (occurs in 10-25% of patients, >50% with hepatic failure):\n• Supportive care, dialysis PRN\n• Hepatorenal syndrome management if applicable\n• Renal recovery generally occurs if patient survives [12]\n\n**Infection:**\n• Low threshold for broad-spectrum antibiotics — hepatic failure patients are immunocompromised',
    citation: [1, 12, 16],
    next: 'apap-dispo-icu',
  },

  {
    id: 'apap-empiric-nac',
    type: 'info',
    module: 5,
    title: 'Empiric NAC — Unknown Ingestion',
    body: '**Start NAC empirically** when:\n• History is unreliable AND APAP is detectable\n• History is unreliable AND ALT is elevated\n• Ingestion >150 mg/kg and level won\'t be available within 8 hours\n• Any clinical doubt\n\n**When in doubt → give NAC.** [2][6]\n\nMinimal side effects. Potentially life-saving. NAC has no absolute contraindications for acetaminophen toxicity.\n\nDraw labs now: APAP level, AST/ALT, INR, BMP, lactate, salicylate level. Results will guide further management while NAC is already running.',
    citation: [2, 6],
    next: 'apap-nac-iv',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'apap-dispo-admit',
    type: 'result',
    module: 6,
    title: 'Admit — Ward Level Care',
    body: '**Admit to medical floor if:**\n• NAC initiated (continue per protocol)\n• Elevated transaminases (AST/ALT monitoring q6-12h)\n• Altered mental status\n• Significant coingestant requiring monitoring\n• Unreliable history with ongoing concern\n\n**Continue monitoring:**\n• APAP level, AST/ALT, INR, BMP q6-12h\n• Reassess NAC stopping criteria at each lab check\n• Serial clinical assessments\n\nEscalate to ICU if evidence of hepatic failure (coagulopathy, encephalopathy, acidosis, renal failure).\n\n**Psychiatric evaluation** for all intentional ingestions — can be completed during admission.',
    recommendation: 'Admit for NAC completion and serial lab monitoring. Escalate to ICU if signs of hepatic failure.',
    confidence: 'recommended',
    citation: [1, 6],
  },

  {
    id: 'apap-dispo-icu',
    type: 'result',
    module: 6,
    title: 'Admit — ICU Level Care',
    body: "**ICU admission for:**\n• Evidence of hepatic failure: coagulopathy (INR >3), encephalopathy, acidosis (pH <7.3), renal failure\n• Massive ingestion with early lactic acidosis or altered mental status\n• King's College Criteria met — transfer to transplant center\n• Hemodialysis required\n• Hemodynamic instability\n\n**ICU management:**\n• Continue IV NAC indefinitely (repeat Bag 3)\n• Serial labs q6h: APAP, AST/ALT, INR, BMP, lactate, glucose\n• Cerebral edema monitoring and management\n• Early transplant center discussion\n• D10W infusion for hypoglycemia\n• Low threshold for antibiotics\n\n**Poison Control: 1-800-222-1222**",
    recommendation: 'ICU admission for hepatic failure management. Continue NAC indefinitely. Contact transplant center early.',
    confidence: 'definitive',
    citation: [1, 5, 6],
  },

  {
    id: 'apap-observe',
    type: 'info',
    module: 6,
    title: 'Observation & Monitoring',
    body: '**Observation period: 4-6 hours** from time of ingestion with repeat labs before disposition. [1][6]\n\nRecheck at end of observation:\n• APAP level (should be trending down if detectable)\n• AST/ALT (any elevation warrants NAC regardless of APAP level)\n• INR\n• Creatinine\n\n**Reassess for:**\n• Delayed absorption (extended-release, coingestants)\n• Late-rising APAP levels\n• New symptoms\n\nIf all labs remain normal and patient is asymptomatic → proceed to discharge evaluation.',
    citation: [1, 6],
    next: 'apap-dispo-discharge',
  },

  {
    id: 'apap-dispo-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge Criteria',
    body: '**Safe to discharge if ALL of the following are met:** [1][6]\n\n✅ APAP level below treatment line at ≥4 hours post-ingestion\n✅ Normal AST/ALT\n✅ Normal INR\n✅ Normal creatinine\n✅ 4-6 hour observation complete\n✅ Asymptomatic\n\n⚠️ **Psychiatric evaluation is MANDATORY for ALL intentional ingestions** before discharge. [1]\n\n**Discharge counseling:**\n• Safe acetaminophen use: max 4g/day (2g/day with chronic alcohol use or liver disease)\n• Avoid combining multiple APAP-containing products\n• Read labels — APAP is in >600 products\n• Return for: RUQ pain, nausea/vomiting, jaundice, dark urine, confusion\n\n**Poison Control: 1-800-222-1222**',
    recommendation: 'Discharge after observation if all labs normal, asymptomatic, and psychiatric clearance obtained for intentional ingestions.',
    confidence: 'definitive',
    citation: [1, 6],
  },

];

export const ACETAMINOPHEN_OD_NODE_COUNT = ACETAMINOPHEN_OD_NODES.length;

export const ACETAMINOPHEN_OD_MODULE_LABELS = [
  'Initial Assessment',
  'Risk Stratification',
  'NAC Protocol',
  'Massive Overdose',
  'Hepatic Failure',
  'Disposition',
];

export const ACETAMINOPHEN_OD_CITATIONS: Citation[] = [
  { num: 1, text: 'WikEM: Acetaminophen Toxicity. Last edited March 22, 2026. https://wikem.org/wiki/Acetaminophen_toxicity' },
  { num: 2, text: 'Smilkstein MJ, et al. Efficacy of oral N-acetylcysteine in the treatment of acetaminophen overdose. N Engl J Med. 1988;319(24):1557-1562. PMID 3059186' },
  { num: 3, text: 'Heard KJ. Acetylcysteine for acetaminophen poisoning. N Engl J Med. 2008;359(3):285-292. PMID 18635433' },
  { num: 4, text: 'Rumack BH. Acetaminophen hepatotoxicity: the first 35 years. J Toxicol Clin Toxicol. 2002;40(1):3-20. PMID 11990202' },
  { num: 5, text: "O'Grady JG, et al. Early indicators of prognosis in fulminant hepatic failure. Gastroenterology. 1989;97(2):439-445. PMID 2490426" },
  { num: 6, text: 'Dart RC, et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open. 2023;6(8):e2327739. PMID 37552484' },
  { num: 7, text: 'Wong A, et al. Comparison of two- versus three-bag IV acetylcysteine protocols. Clin Toxicol. 2013;51(7):676-679.' },
  { num: 8, text: 'Hendrickson RG. What is the most appropriate dose of N-acetylcysteine after massive acetaminophen overdose? Clin Toxicol. 2019;57(8):686-691. PMID 30777470' },
  { num: 9, text: 'Gosselin S, et al. Extracorporeal treatment for acetaminophen poisoning: recommendations from the EXTRIP workgroup. Clin Toxicol. 2014;52(8):856-867. PMID 25133498' },
  { num: 10, text: 'Keays R, et al. Intravenous acetylcysteine in paracetamol induced fulminant hepatic failure: a prospective controlled trial. BMJ. 1991;303(6809):1026-1029. PMID 1954453' },
  { num: 11, text: 'Yarema M, et al. Anaphylactoid Reactions to Intravenous N-Acetylcysteine during Treatment for Acetaminophen Poisoning. J Med Toxicol. 2018;14(2):120-127. PMID 29423816' },
  { num: 12, text: 'Bunchorntavakul C, Reddy KR. Acetaminophen and Acute Liver Failure. Clin Liver Dis. 2018;22(2):325-346. PMID 29605069' },
  { num: 13, text: 'Chiew AL, et al. Updated guidelines for the management of paracetamol poisoning in Australia and New Zealand. Med J Aust. 2020;212(4):175-183. PMID 31786822' },
  { num: 14, text: 'Chiew AL, Buckley NA. Acetaminophen Poisoning. Crit Care Clin. 2021;37(3):543-561. PMID 34053705' },
  { num: 15, text: 'Kang AM, et al. The effect of 4-methylpyrazole on oxidative metabolism of acetaminophen in human volunteers. J Med Toxicol. 2020;16(2):169-176. PMID 31768936' },
  { num: 16, text: 'Fisher ES, Curry SC. Evaluation and treatment of acetaminophen toxicity. Adv Pharmacol. 2019;85:263-272. PMID 31307590' },
  { num: 17, text: 'Chidiac AS, et al. Paracetamol (acetaminophen) overdose and hepatotoxicity: mechanism, treatment, prevention measures, and estimates of burden of disease. Expert Opin Drug Metab Toxicol. 2023;19(5):297-317. PMID 37436926' },
];
