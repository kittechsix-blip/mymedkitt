// MedKitt — Snake Bite Envenomation (North American)
// Sources: EB Medicine, UpToDate, EMCRIT, OpenEvidence, Surgical Critical Care 2023
// 7 modules: Initial Assessment → Snake ID → Pit Viper Grading → Antivenom → Special Populations → Coral Snake → Disposition
// Covers: Pit vipers (rattlesnakes, copperheads, cottonmouths) + Coral snakes

import type { DecisionNode } from '../../models/types.js';

export interface Citation {
  num: number;
  text: string;
}

export const SNAKE_ENVENOMATION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'snake-start',
    type: 'info',
    module: 1,
    title: 'Snake Bite: Initial Assessment',
    body: '**North American venomous snakes:**\n- **Pit vipers (Crotalinae)** — 99% of US venomous bites\n  - Rattlesnakes (50-55%)\n  - Copperheads (30-45%)\n  - Cottonmouths/water moccasins\n- **Coral snakes (Elapidae)** — ~1% of bites\n\n**Immediate Actions:**\n1. Remove jewelry/constrictive items\n2. Immobilize extremity at heart level\n3. Mark leading edge of swelling with time\n4. Large-bore IV access\n5. Baseline labs: CBC, PT/INR, PTT, fibrinogen, BMP, CK, T&S\n\n**DO NOT:**\n- Apply ice or cold water\n- Use tourniquet or constrictive bands\n- Incise and suction ("cut and suck")\n- Give NSAIDs (bleeding risk)\n\n**20-25% of pit viper bites are "dry"** — no venom injected. [1][2]',
    citation: [1, 2],
    next: 'snake-id',
  },

  {
    id: 'snake-id',
    type: 'question',
    module: 2,
    title: 'Snake Identification',
    body: '**Can you identify the snake type?**\n\n**Pit Viper Features:**\n- Triangular head\n- Elliptical (cat-like) pupils\n- Heat-sensing pit between eye and nostril\n- Retractable front fangs\n- Rattlesnakes have rattle (may be broken)\n\n**Coral Snake Features:**\n- Small, slender (40-70 cm)\n- Round pupils\n- Red, yellow, black bands\n- **"Red touches yellow, kill a fellow"** (US only)\n- ⚠️ Rhyme NOT reliable outside US\n\n**Clinical Clue:**\n- Pit vipers → significant LOCAL effects (pain, swelling)\n- Coral snakes → minimal local, DELAYED neurotoxicity\n\nIf snake not identified, treat based on clinical presentation.',
    citation: [1, 2],
    options: [
      {
        label: 'Pit Viper (or Unknown)',
        description: 'Rattlesnake, copperhead, cottonmouth, or unidentified',
        next: 'snake-pit-viper-assess',
      },
      {
        label: 'Coral Snake',
        description: 'Red-yellow-black banding, confirmed or suspected',
        next: 'snake-coral-start',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: PIT VIPER GRADING
  // =====================================================================

  {
    id: 'snake-pit-viper-assess',
    type: 'info',
    module: 3,
    title: 'Pit Viper: Severity Assessment',
    body: '**Perform serial assessments every 30-60 minutes:**\n- Circumference measurements at consistent landmarks\n- Leading edge marking with time stamps\n- Pain assessment\n- Systemic symptoms review\n\n**Snakebite Severity Score (SSS):** 0-20 points\n- Change of 1 point = clinically significant worsening\n- Used to track progression and response to treatment\n\n[Severity Score Calculator](#/calculator/snake-severity)\n\n**Initial Lab Thresholds Requiring Antivenom:**\n- Platelets < 100,000\n- Fibrinogen < 100 mg/dL\n- INR > 3.0\n- PTT > 50 seconds\n\n**Repeat labs at 6 hours** (or before discharge for dry bites). [1][3]',
    citation: [1, 3],
    calculatorLinks: [
      { id: 'snake-severity', label: 'Severity Score' },
    ],
    next: 'snake-pit-severity-grade',
  },

  {
    id: 'snake-pit-severity-grade',
    type: 'question',
    module: 3,
    title: 'Severity Grade',
    body: '**Grade the envenomation:**\n\n| Grade | Local Signs | Systemic | Labs |\n|-------|------------|----------|------|\n| **Dry (0)** | Fang marks only | None | Normal |\n| **Mild (1)** | Local edema, not crossing joint | Minimal | Normal |\n| **Moderate (2)** | Entire extremity | Nausea, paresthesias | Minor abnl |\n| **Severe (3)** | Rapid progression, necrosis | Hypotension, AMS | Severe abnl |\n\n**Copperhead bites** are often mild — many do NOT require antivenom.\n\n**Rattlesnake bites** more likely to cause coagulopathy and systemic toxicity.\n\nWhat is the severity grade?',
    citation: [1, 3],
    options: [
      {
        label: 'Dry Bite (Grade 0)',
        description: 'Fang marks only, no swelling or symptoms',
        next: 'snake-dry-bite',
      },
      {
        label: 'Mild (Grade 1)',
        description: 'Local edema only, no systemic symptoms',
        next: 'snake-mild',
      },
      {
        label: 'Moderate (Grade 2)',
        description: 'Extremity involvement, minor systemic symptoms',
        next: 'snake-moderate',
      },
      {
        label: 'Severe (Grade 3)',
        description: 'Rapid progression, hypotension, coagulopathy',
        next: 'snake-severe',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'snake-dry-bite',
    type: 'info',
    module: 3,
    title: 'Dry Bite Management',
    body: '**No envenomation detected — observation protocol:**\n\n**Observation Period:**\n- Minimum 8 hours (some recommend 12-24h)\n- Serial exams every 2-4 hours\n- Repeat labs before discharge\n\n**Tetanus prophylaxis** if not current.\n\n**Wound care:**\n- Clean with soap and water\n- No prophylactic antibiotics (unless infection signs)\n\n**Discharge criteria:**\n- No progression of swelling\n- Normal repeat labs\n- No systemic symptoms\n- Able to tolerate PO\n\n**Return precautions:**\n- Progressive swelling\n- Bleeding, bruising\n- Numbness, tingling\n- Difficulty breathing\n\n**20-25% of pit viper bites are dry.** [1][2]',
    citation: [1, 2],
    next: 'snake-dispo-decision',
  },

  {
    id: 'snake-mild',
    type: 'question',
    module: 3,
    title: 'Mild Envenomation',
    body: '**Mild envenomation — management decision:**\n\n**Current status:**\n- Local edema not crossing a major joint\n- No systemic symptoms\n- Normal or near-normal labs\n\n**Copperhead bites:**\n- Often managed WITHOUT antivenom\n- Observation 12-24 hours\n- Antivenom if progression\n\n**Rattlesnake bites:**\n- Lower threshold for antivenom\n- Watch closely for progression\n\n**Monitor for progression to moderate/severe:**\n- Swelling crossing joint\n- Systemic symptoms\n- Lab abnormalities\n\nIs the bite progressing or is it a rattlesnake bite with high concern?',
    citation: [1, 3],
    options: [
      {
        label: 'Stable — Observe',
        description: 'No progression, copperhead, observation appropriate',
        next: 'snake-observe-protocol',
      },
      {
        label: 'Progressing or High Risk',
        description: 'Consider antivenom',
        next: 'snake-antivenom-decision',
      },
    ],
  },

  {
    id: 'snake-moderate',
    type: 'info',
    module: 3,
    title: 'Moderate Envenomation',
    body: '**Moderate envenomation — antivenom indicated:**\n\n**Indications for antivenom:**\n- Progressive local swelling beyond bite site\n- Systemic toxicity (hypotension, airway swelling, neurotoxicity)\n- Hematologic abnormalities:\n  - Platelets < 100,000\n  - Fibrinogen < 100 mg/dL\n  - INR > 3.0\n  - PTT > 50 seconds\n\n**Proceed to antivenom selection and dosing.**\n\n**Key Point:** Swelling is typically subcutaneous. True compartment syndrome is RARE. **Antivenom is the treatment for swelling** — NOT fasciotomy.\n\n[Antivenom Calculator](#/calculator/snake-antivenom) [1][3][4]',
    citation: [1, 3, 4],
    calculatorLinks: [
      { id: 'snake-antivenom', label: 'Antivenom Dosing' },
    ],
    next: 'snake-antivenom-decision',
  },

  {
    id: 'snake-severe',
    type: 'info',
    module: 3,
    title: 'Severe Envenomation',
    body: '**Severe envenomation — aggressive management:**\n\n**Immediate priorities:**\n1. Airway assessment — early intubation for head/neck bites\n2. Large-bore IV × 2\n3. Aggressive fluid resuscitation\n4. Blood products if active bleeding (see below)\n5. **HIGH-DOSE ANTIVENOM**\n\n**Antivenom dosing for severe:**\n- CroFab: 8-12 vials initial (vs 4-6 for moderate)\n- Anavip: 10+ vials\n\n**Coagulopathy management:**\n⚠️ **Treat with ANTIVENOM, not blood products first**\n- FFP/platelets/cryo only for ACTIVE SIGNIFICANT BLEEDING\n- Blood products alone only temporarily correct coagulopathy\n- Antivenom addresses the underlying cause\n\n**Hypotension:**\n- IVF resuscitation\n- Vasopressors if refractory\n\n[Antivenom Calculator](#/calculator/snake-antivenom) [1][3][4]',
    citation: [1, 3, 4],
    calculatorLinks: [
      { id: 'snake-antivenom', label: 'Antivenom Dosing' },
    ],
    treatment: {
      firstLine: {
        drug: 'CroFab or Anavip (high-dose)',
        dose: 'CroFab 8-12 vials or Anavip 10+ vials',
        route: 'IV',
        frequency: 'Repeat until control achieved',
        duration: 'Until initial control, then maintenance per protocol',
        notes: 'No maximum dose. Treat coagulopathy with antivenom first, not blood products. Blood products only for active significant bleeding.',
      },
      alternative: {
        drug: 'Blood products (for active bleeding only)',
        dose: 'FFP 2-4 units, Platelets 1 apheresis unit, Cryoprecipitate 10 units',
        route: 'IV',
        frequency: 'PRN for active bleeding',
        duration: 'Until bleeding controlled',
        notes: 'Only use WITH antivenom for active significant bleeding. Blood products alone only temporarily correct coagulopathy.',
      },
      monitoring: 'Continuous hemodynamic monitoring. Serial labs q4-6h. Airway reassessment for head/neck bites. Watch for progression despite treatment.',
    },
    next: 'snake-antivenom-decision',
  },

  // =====================================================================
  // MODULE 4: ANTIVENOM
  // =====================================================================

  {
    id: 'snake-antivenom-decision',
    type: 'question',
    module: 4,
    title: 'Antivenom Selection',
    body: '**Two FDA-approved pit viper antivenoms:**\n\n**CroFab (Fab - Ovine):**\n- Shorter half-life\n- Requires maintenance dosing (2 vials at 6, 12, 18h)\n- Higher recurrence rates (32-50%)\n- More clinical experience\n\n**Anavip (F(ab\')₂ - Equine):**\n- Longer half-life\n- No scheduled maintenance dosing\n- Lower recurrence rates\n- Newer, less clinical experience\n\n**Both are effective** — use what is available.\n\n**Pediatric dose = Adult dose**\nDosing is based on venom amount, NOT patient weight.\n\nWhich antivenom is available?',
    citation: [3, 4],
    options: [
      {
        label: 'CroFab',
        description: 'Crotalidae Polyvalent Immune Fab (ovine)',
        next: 'snake-crofab',
      },
      {
        label: 'Anavip',
        description: 'Crotalidae Immune F(ab\')₂ (equine)',
        next: 'snake-anavip',
      },
    ],
  },

  {
    id: 'snake-crofab',
    type: 'info',
    module: 4,
    title: 'CroFab Administration',
    body: '**CroFab Dosing Protocol:**\n\n**Reconstitution:**\n1. Reconstitute each vial with 18 mL NS\n2. Mix by continuous manual inversion (1-2/sec)\n3. **DO NOT SHAKE** (causes foaming)\n4. Reconstitution should take < 7 min\n5. Dilute total dose to 250 mL NS\n6. Use within 4 hours\n\n**Initial Dose:**\n- Standard: **4-6 vials** IV\n- Severe: **8-12 vials** IV\n- Pediatric = Adult dose\n\n**Administration:**\n- Start slow: 25-50 mL/hr × 10 min\n- If no reaction: increase to 250 mL/hr\n- Monitor for anaphylaxis\n\n**Maintenance Dosing (Controversial):**\n- 2 vials at 6, 12, and 18 hours post-initial control\n- Consult poison center for guidance\n\n[CroFab/Anavip Calculator](#/calculator/snake-antivenom) [3][4]',
    citation: [3, 4],
    calculatorLinks: [
      { id: 'snake-antivenom', label: 'Antivenom Dosing' },
    ],
    treatment: {
      firstLine: {
        drug: 'CroFab (Crotalidae Polyvalent Immune Fab)',
        dose: '4-6 vials (standard) or 8-12 vials (severe)',
        route: 'IV',
        frequency: 'Initial dose, then reassess; maintenance 2 vials at 6, 12, 18h if needed',
        duration: 'Until initial control achieved',
        notes: 'Reconstitute each vial with 18 mL NS, dilute total dose to 250 mL NS. Start infusion at 25-50 mL/hr x 10 min, then increase to 250 mL/hr if no reaction. Pediatric dose = adult dose.',
      },
      monitoring: 'Monitor for anaphylaxis during infusion. Serial exams q30-60 min post-infusion. Repeat labs at 6, 12, 24 hours. Watch for recurrence phenomenon days 2-7.',
    },
    next: 'snake-response-assess',
  },

  {
    id: 'snake-anavip',
    type: 'info',
    module: 4,
    title: 'Anavip Administration',
    body: '**Anavip Dosing Protocol:**\n\n**Reconstitution:**\n1. Reconstitute each vial with 10 mL NS\n2. Dilute total dose to 250 mL NS\n\n**Initial Dose:**\n- **10 vials** IV over 60 minutes\n- Pediatric = Adult dose\n\n**Administration:**\n- Infuse over 60 minutes\n- Monitor for anaphylaxis\n\n**Repeat Dosing:**\n- Repeat 10 vials every hour until initial control\n- No scheduled maintenance required\n- For recurrence: 4 vials as needed\n\n**Advantages:**\n- Longer half-life\n- Lower recurrence rates\n- No maintenance schedule\n\n[CroFab/Anavip Calculator](#/calculator/snake-antivenom) [3][4]',
    citation: [3, 4],
    calculatorLinks: [
      { id: 'snake-antivenom', label: 'Antivenom Dosing' },
    ],
    treatment: {
      firstLine: {
        drug: 'Anavip (Crotalidae Immune F(ab\')2)',
        dose: '10 vials',
        route: 'IV',
        frequency: 'Repeat 10 vials every hour until initial control; 4 vials PRN for recurrence',
        duration: 'Until initial control achieved',
        notes: 'Reconstitute each vial with 10 mL NS, dilute total dose to 250 mL NS. Infuse over 60 minutes. No scheduled maintenance required. Pediatric dose = adult dose.',
      },
      monitoring: 'Monitor for anaphylaxis during infusion. Serial exams q30-60 min post-infusion. Repeat labs at 6, 12, 24 hours. Lower recurrence risk than CroFab due to longer half-life.',
    },
    next: 'snake-response-assess',
  },

  {
    id: 'snake-response-assess',
    type: 'question',
    module: 4,
    title: 'Response Assessment',
    body: '**Assess response to antivenom:**\n\n**Initial control achieved if:**\n- Swelling progression halted\n- Systemic symptoms improving\n- Labs stabilizing\n\n**Reassess 30-60 minutes post-infusion.**\n\n**If inadequate response:**\n- Repeat initial dose\n- Continue until control achieved\n\n**Allergic reactions:**\n- Stop infusion\n- IM epinephrine (preferred over SC)\n- IVF, supportive care\n- When stable: restart at slower rate\n\n**Papain/papaya/bromelain allergies** increase CroFab reaction risk.\n\nWhat is the response?',
    citation: [3, 4],
    options: [
      {
        label: 'Controlled',
        description: 'Swelling stopped, improving',
        next: 'snake-controlled',
      },
      {
        label: 'Inadequate Response',
        description: 'Continued progression',
        next: 'snake-inadequate',
      },
      {
        label: 'Allergic Reaction',
        description: 'Anaphylaxis or hypersensitivity',
        next: 'snake-allergy',
      },
    ],
  },

  {
    id: 'snake-controlled',
    type: 'info',
    module: 4,
    title: 'Initial Control Achieved',
    body: '**Envenomation controlled — ongoing management:**\n\n**If using CroFab:**\n- Maintenance: 2 vials at 6, 12, and 18 hours\n- Controversial — consult poison center\n\n**If using Anavip:**\n- No scheduled maintenance\n- PRN dosing for recurrence\n\n**Monitoring:**\n- Serial exams q2-4h\n- Repeat labs at 6, 12, 24 hours\n- Watch for recurrence phenomenon\n\n**Recurrence Risk (especially CroFab):**\n- 32-50% develop late hematologic toxicity\n- Peak at days 2-7 post-treatment\n- Can occur after discharge\n\n[Recurrence Monitor](#/calculator/snake-recurrence) [3][5]',
    citation: [3, 5],
    calculatorLinks: [
      { id: 'snake-recurrence', label: 'Recurrence Monitor' },
    ],
    treatment: {
      firstLine: {
        drug: 'CroFab (maintenance)',
        dose: '2 vials',
        route: 'IV',
        frequency: 'At 6, 12, and 18 hours post-initial control',
        duration: '3 maintenance doses total',
        notes: 'Maintenance dosing is controversial. Consult poison center for guidance. Higher recurrence risk (32-50%) due to shorter half-life.',
      },
      alternative: {
        drug: 'Anavip (no scheduled maintenance)',
        dose: '4 vials PRN',
        route: 'IV',
        frequency: 'Only for recurrence',
        duration: 'As needed',
        notes: 'No scheduled maintenance required due to longer half-life. Lower recurrence rates than CroFab.',
      },
      monitoring: 'Serial exams q2-4h. Repeat labs at 6, 12, 24 hours. Watch for recurrence phenomenon - peak risk days 2-7. Follow-up labs days 2-3 and 5-7 if rattlesnake or antivenom given.',
    },
    next: 'snake-special-pops',
  },

  {
    id: 'snake-inadequate',
    type: 'info',
    module: 4,
    title: 'Inadequate Response',
    body: '**Continued progression despite antivenom:**\n\n**Repeat antivenom:**\n- CroFab: Repeat 4-6 vials\n- Anavip: Repeat 10 vials\n- Continue hourly until control\n\n**No maximum dose** — give what is needed.\n\n**Persistent coagulopathy without bleeding:**\n- More antivenom (NOT blood products)\n- Antivenom addresses underlying cause\n- Blood products only temporarily effective\n\n**Persistent coagulopathy WITH significant bleeding:**\n- Antivenom PLUS blood products\n- FFP, platelets, cryo as needed\n\n**Consult Poison Center:** 1-800-222-1222\n\n**Tissue swelling:**\n- Antivenom is the treatment\n- True compartment syndrome is RARE\n- Fasciotomy is historical/last resort only [3][4]',
    citation: [3, 4],
    treatment: {
      firstLine: {
        drug: 'CroFab or Anavip (repeat dosing)',
        dose: 'CroFab 4-6 vials or Anavip 10 vials',
        route: 'IV',
        frequency: 'Continue hourly until control achieved',
        duration: 'No maximum dose - give what is needed',
        notes: 'Treat persistent coagulopathy with more antivenom, NOT blood products. Antivenom addresses underlying cause.',
      },
      alternative: {
        drug: 'Blood products (for active bleeding WITH antivenom)',
        dose: 'FFP 2-4 units, Platelets 1 apheresis unit, Cryoprecipitate 10 units',
        route: 'IV',
        frequency: 'PRN for active significant bleeding',
        duration: 'Until bleeding controlled',
        notes: 'Only use WITH antivenom for active significant bleeding. Consult Poison Center: 1-800-222-1222.',
      },
      monitoring: 'Serial exams q30-60 min. Repeat labs after each antivenom dose. Monitor for control: swelling halted, systemic symptoms improving, labs stabilizing.',
    },
    next: 'snake-response-assess',
  },

  {
    id: 'snake-allergy',
    type: 'info',
    module: 4,
    title: 'Antivenom Allergic Reaction',
    body: '**Anaphylaxis/Hypersensitivity Management:**\n\n**Immediate:**\n1. STOP infusion\n2. **Epinephrine 0.3-0.5 mg IM** (preferred over SC)\n3. IVF bolus\n4. Supportive care\n\n**When stable:**\n- Restart infusion at SLOWER rate\n- Antivenom benefit usually outweighs reaction risk\n- Premedicate if restarting (diphenhydramine, steroids)\n\n**Risk factors for CroFab reaction:**\n- Papain, chymopapain, papaya extract allergy\n- Bromelain (pineapple enzyme) allergy\n- Dust mite allergies (share papain antigens)\n- Latex allergies\n\n**Delayed Reactions (Serum Sickness):**\n- 5-14 days post-antivenom\n- Rash, fever, myalgia, arthralgia\n- Incidence: 5-10%\n- Counsel all patients on return precautions [3][4]',
    citation: [3, 4],
    treatment: {
      firstLine: {
        drug: 'Epinephrine',
        dose: '0.3-0.5 mg (adult); 0.01 mg/kg (peds, max 0.3 mg)',
        route: 'IM (anterolateral thigh preferred)',
        frequency: 'May repeat every 5-15 minutes PRN',
        duration: 'Until anaphylaxis resolved',
        notes: 'IM preferred over SC for faster absorption. Stop antivenom infusion immediately.',
      },
      alternative: {
        drug: 'Diphenhydramine + Methylprednisolone (premedication for restart)',
        dose: 'Diphenhydramine 25-50 mg IV; Methylprednisolone 125 mg IV',
        route: 'IV',
        frequency: 'Once before restarting antivenom',
        duration: 'Single dose',
        notes: 'Give before restarting antivenom at slower rate. Antivenom benefit usually outweighs reaction risk.',
      },
      monitoring: 'Continuous monitoring during and after epinephrine administration. When stable, restart antivenom at slower rate with premedication.',
    },
    next: 'snake-special-pops',
  },

  {
    id: 'snake-observe-protocol',
    type: 'info',
    module: 3,
    title: 'Observation Protocol',
    body: '**Observation without antivenom:**\n\n**Monitoring:**\n- Serial exams q30-60 min × 4h, then q2h\n- Mark swelling edge with time\n- Circumference measurements at fixed landmarks\n\n**Repeat labs:**\n- At 6 hours (minimum)\n- Before discharge\n\n**Indications to give antivenom:**\n- Swelling crosses major joint\n- Systemic symptoms develop\n- Lab abnormalities:\n  - Platelets < 100,000\n  - Fibrinogen < 100\n  - INR > 3.0\n  - PTT > 50\n\n**Copperhead bites:**\n- Often mild\n- CDU observation 12-24h often sufficient\n- 5% readmission rate [1][2]',
    citation: [1, 2],
    next: 'snake-special-pops',
  },

  // =====================================================================
  // MODULE 5: SPECIAL POPULATIONS
  // =====================================================================

  {
    id: 'snake-special-pops',
    type: 'question',
    module: 5,
    title: 'Special Populations',
    body: '**Does the patient fall into a special population?**\n\n- **Pediatric** — dosing considerations\n- **Pregnant** — maternal/fetal considerations\n- **Head/Neck bite** — airway concerns\n- **None** — standard management',
    citation: [3, 4],
    options: [
      {
        label: 'Pediatric',
        description: 'Child or infant',
        next: 'snake-peds',
      },
      {
        label: 'Pregnant',
        description: 'Pregnant patient',
        next: 'snake-pregnancy',
      },
      {
        label: 'Head/Neck Bite',
        description: 'Airway risk',
        next: 'snake-airway',
        urgency: 'critical',
      },
      {
        label: 'None',
        description: 'Standard population',
        next: 'snake-dispo-decision',
      },
    ],
  },

  {
    id: 'snake-peds',
    type: 'info',
    module: 5,
    title: 'Pediatric Considerations',
    body: '**Pediatric snake envenomation:**\n\n**Key Point: SAME ANTIVENOM DOSE AS ADULTS**\n- Dosing is based on VENOM amount\n- NOT based on patient weight\n- Children may have more severe effects (smaller body mass dilutes venom less)\n\n**Fluid Volume:**\n- Adjust dilution volume for small children\n- Prevent fluid overload\n- Use smaller volume (100-150 mL) for infants\n\n**Antivenom Safety:**\n- Safe in pediatric and infant populations\n- Benefits outweigh risks\n\n**CroFab Thimerosal:**\n- Theoretical concern\n- Risk of untreated envenomation >> thimerosal risk\n- Do NOT withhold antivenom\n\n**Family counseling:**\n- Reassure about antivenom safety\n- Explain same dosing rationale [3][4]',
    citation: [3, 4],
    next: 'snake-dispo-decision',
  },

  {
    id: 'snake-pregnancy',
    type: 'info',
    module: 5,
    title: 'Pregnancy Considerations',
    body: '**Pregnant patient with snake envenomation:**\n\n**Key Point: DO NOT WITHHOLD ANTIVENOM**\n- Maternal health and prognosis takes priority\n- Untreated envenomation poses greater fetal risk than antivenom\n- Standard dosing applies\n\n**Fetal Monitoring:**\n- Continuous fetal monitoring\n- OB consultation\n- Monitor for placental abruption (coagulopathy risk)\n\n**Limited Data:**\n- No RCTs in pregnancy (obviously)\n- Case reports support antivenom use\n- Theoretical risks < envenomation risks\n\n**Coagulopathy:**\n- Higher concern for placental complications\n- Lower threshold for antivenom\n- Monitor fibrinogen closely\n\n**Disposition:**\n- Higher threshold for discharge\n- OB follow-up mandatory [3][4]',
    citation: [3, 4],
    next: 'snake-dispo-decision',
  },

  {
    id: 'snake-airway',
    type: 'info',
    module: 5,
    title: 'Head/Neck Bite — Airway Management',
    body: '**Head, face, or neck bites — high airway risk:**\n\n**Early Intubation Considerations:**\n- Progressive facial/oropharyngeal edema\n- Stridor or voice changes\n- Difficulty managing secretions\n- Concern for rapid progression\n\n**Do NOT wait** for respiratory distress — edema may make later intubation impossible.\n\n**Approach:**\n- Early airway assessment\n- Prepare for difficult airway\n- Have surgical airway available\n- Consider early intubation if ANY airway concerns\n\n**Antivenom:**\n- Give aggressively to reduce swelling\n- Higher initial dose (8-12 vials CroFab)\n\n**Disposition:**\n- ICU admission\n- Close airway monitoring [1][3]',
    citation: [1, 3],
    next: 'snake-dispo-decision',
  },

  // =====================================================================
  // MODULE 6: CORAL SNAKE
  // =====================================================================

  {
    id: 'snake-coral-start',
    type: 'info',
    module: 6,
    title: 'Coral Snake Envenomation',
    body: '**Coral snake (Elapidae) — DIFFERENT from pit vipers:**\n\n**Clinical Pattern:**\n- **Minimal local effects** (unlike pit vipers)\n- **Delayed neurotoxicity** (may take 12+ hours)\n- Presynaptic neurotoxin → potentially irreversible\n\n**Identification:**\n- Red, yellow, black bands\n- "Red touches yellow, kill a fellow" (US only)\n- Small, slender snake\n- Round pupils\n\n**⚠️ DO NOT wait for symptoms to develop**\n- Once neurotoxicity appears, may be irreversible\n- Presynaptic toxins cannot be reversed by antivenom\n\n**All suspected coral snake bites require:**\n- Immediate evaluation\n- Minimum 24-hour ICU observation\n- Low threshold for antivenom\n\n[Coral Snake Protocol](#/calculator/coral-snake) [1][2][6]',
    citation: [1, 2, 6],
    calculatorLinks: [
      { id: 'coral-snake', label: 'Coral Snake Protocol' },
    ],
    next: 'snake-coral-antivenom',
  },

  {
    id: 'snake-coral-antivenom',
    type: 'info',
    module: 6,
    title: 'Coral Snake Antivenom',
    body: '**North American Coral Snake Antivenin (NACSA):**\n\n**⚠️ AVAILABILITY CRISIS:**\n- Production stopped 2003\n- FDA extending expiration on existing lots\n- Current lot (CL6814) extended through June 30, 2025\n- No FDA-approved alternative in US\n\n**Dosing:**\n- 3-5 vials IV for adults/adolescents\n- **Do NOT give empirically before symptoms**\n- Give at first sign of neurotoxicity\n\n**Alternative (Investigational):**\n- Coralmyn (Mexican antivenom)\n- Available through Poison Control/FDA\n- 1-800-222-1222\n\n**If Antivenom Unavailable:**\n- Supportive care\n- Early intubation for respiratory failure\n- May require prolonged mechanical ventilation (weeks)\n- Recovery possible with support [6]',
    citation: [6],
    treatment: {
      firstLine: {
        drug: 'North American Coral Snake Antivenin (NACSA)',
        dose: '3-5 vials',
        route: 'IV',
        frequency: 'May repeat 3-5 vials if symptoms progress',
        duration: 'Until neurotoxicity stabilized',
        notes: 'Do NOT give empirically before symptoms. Give at first sign of neurotoxicity. Limited availability - contact Poison Control 1-800-222-1222.',
      },
      alternative: {
        drug: 'Coralmyn (Mexican coral snake antivenom)',
        dose: 'Per Poison Control guidance',
        route: 'IV',
        frequency: 'Per protocol',
        duration: 'Per protocol',
        notes: 'Investigational in US. Available through Poison Control/FDA when NACSA unavailable. Contact 1-800-222-1222.',
      },
      monitoring: 'ICU monitoring for minimum 24 hours. Neuro checks q1-2h for ptosis, diplopia, dysarthria, dysphagia, limb weakness, respiratory depression. Early intubation for bulbar weakness or declining respiratory effort.',
    },
    next: 'snake-coral-monitor',
  },

  {
    id: 'snake-coral-monitor',
    type: 'info',
    module: 6,
    title: 'Coral Snake Monitoring',
    body: '**ICU monitoring for all suspected coral snake bites:**\n\n**Neurotoxicity Signs (may be delayed 12+ hours):**\n- Ptosis (early sign)\n- Diplopia\n- Dysarthria, dysphagia\n- Limb weakness\n- Respiratory depression\n\n**Monitoring:**\n- Neuro checks q1-2h\n- Respiratory monitoring\n- Bedside spirometry if available\n- ABG if respiratory concerns\n\n**Intubation Criteria:**\n- Progressive bulbar weakness\n- Declining respiratory effort\n- Hypoxia or hypercarbia\n- Do NOT wait for respiratory arrest\n\n**Minimum Observation:**\n- 24 hours ICU\n- If symptoms develop → prolonged admission\n- Full recovery possible with supportive care\n\n**Wound Care:**\n- Same as pit viper (clean, tetanus, no antibiotics) [1][6]',
    citation: [1, 6],
    next: 'snake-coral-dispo',
  },

  {
    id: 'snake-coral-dispo',
    type: 'info',
    module: 6,
    title: 'Coral Snake Disposition',
    body: '**Coral snake disposition:**\n\n**All patients:**\n- ICU admission for minimum 24 hours\n- Cannot be discharged from ED\n\n**If no symptoms at 24 hours:**\n- Discharge with close follow-up\n- Return precautions for delayed symptoms\n\n**If symptoms develop:**\n- Antivenom if available and early\n- Prolonged ICU stay\n- May require weeks of mechanical ventilation\n- Full recovery possible with support\n\n**Poison Control:** 1-800-222-1222\n- Coordinate antivenom acquisition\n- Guidance on investigational alternatives\n- Expert consultation available 24/7\n\n**Documentation:**\n- Time of bite\n- Snake description/photo if available\n- Time of symptom onset\n- All treatments given [6]',
    citation: [6],
    options: [
      {
        label: 'Return to Overview',
        description: 'Back to initial assessment',
        next: 'snake-start',
      },
    ],
  },

  // =====================================================================
  // MODULE 7: DISPOSITION
  // =====================================================================

  {
    id: 'snake-dispo-decision',
    type: 'question',
    module: 7,
    title: 'Disposition Decision',
    body: '**Determine appropriate disposition:**\n\n**Consider:**\n- Severity grade\n- Antivenom given?\n- Response to treatment\n- Lab trends\n- Social factors (distance from hospital, reliability)',
    citation: [1, 2],
    options: [
      {
        label: 'Discharge Candidate',
        description: 'Dry bite or mild, controlled envenomation',
        next: 'snake-discharge',
      },
      {
        label: 'Observation Unit',
        description: 'Mild/moderate, needs monitoring',
        next: 'snake-obs-admit',
      },
      {
        label: 'Inpatient Admission',
        description: 'Moderate/severe, antivenom given',
        next: 'snake-inpatient',
      },
      {
        label: 'ICU Admission',
        description: 'Severe, airway risk, unstable',
        next: 'snake-icu',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'snake-discharge',
    type: 'info',
    module: 7,
    title: 'Discharge Criteria',
    body: '**Safe for discharge if ALL criteria met:**\n\n**Clinical:**\n- Minimum 8 hours observation (dry bite)\n- Minimum 12-24 hours (mild envenomation)\n- No progression of swelling\n- No systemic symptoms\n- Tolerating PO\n- Adequate pain control with oral medications\n\n**Labs:**\n- Normal or stable repeat labs\n- No unfavorable trends\n\n**Social:**\n- Reliable patient\n- Access to return if needed\n- Understands return precautions\n\n**Discharge Instructions:**\n- Elevate extremity\n- Return for: progressive swelling, bleeding, bruising, numbness, difficulty breathing\n- No NSAIDs\n- Follow-up labs days 2-3 and 5-7 (if rattlesnake or antivenom given)\n\n**5% readmission rate.** [1][2]',
    citation: [1, 2],
    next: 'snake-recurrence-counseling',
  },

  {
    id: 'snake-obs-admit',
    type: 'info',
    module: 7,
    title: 'Observation Unit',
    body: '**Observation unit admission:**\n\n**Appropriate for:**\n- Mild envenomation without antivenom\n- Copperhead bites (often mild)\n- Stable after initial antivenom\n- Needs extended monitoring\n\n**Monitoring:**\n- Serial exams q2-4h\n- Repeat labs at 6, 12 hours\n- Circumference measurements\n- Pain assessment\n\n**Escalation criteria:**\n- Progression of swelling\n- New systemic symptoms\n- Lab abnormalities\n- Inadequate pain control\n\n**Discharge from CDU:**\n- Stable × 12-24 hours\n- Normal labs\n- Pain controlled with PO meds\n- Follow-up arranged [1][2]',
    citation: [1, 2],
    next: 'snake-recurrence-counseling',
  },

  {
    id: 'snake-inpatient',
    type: 'info',
    module: 7,
    title: 'Inpatient Admission',
    body: '**Inpatient admission indicated for:**\n\n**Clinical:**\n- Moderate/severe envenomation\n- Antivenom administered\n- Ongoing swelling or symptoms\n- Significant pain requiring IV medications\n\n**Lab abnormalities:**\n- Persistent coagulopathy\n- Thrombocytopenia\n- Need for repeat antivenom\n\n**Monitoring:**\n- Serial exams q2-4h\n- Labs q6-12h until stable\n- Maintenance antivenom if CroFab (controversial)\n\n**Recurrence monitoring:**\n- Watch for late coagulopathy\n- Peak risk days 2-7\n- May need retreatment\n\n[Recurrence Monitor](#/calculator/snake-recurrence) [1][3][5]',
    citation: [1, 3, 5],
    calculatorLinks: [
      { id: 'snake-recurrence', label: 'Recurrence Monitor' },
    ],
    next: 'snake-recurrence-counseling',
  },

  {
    id: 'snake-icu',
    type: 'info',
    module: 7,
    title: 'ICU Admission',
    body: '**ICU admission criteria:**\n\n**Mandatory ICU:**\n- Airway involvement (head/neck/face bites with edema)\n- Anaphylaxis to antivenom\n- Severe systemic toxicity\n- Hemodynamic instability\n- Coral snake envenomation (any)\n\n**Consider ICU:**\n- Severe coagulopathy\n- Need for blood products\n- Multiple comorbidities\n- Uncertain trajectory\n\n**ICU Management:**\n- Airway monitoring/protection\n- Hemodynamic monitoring\n- Serial labs q4-6h\n- Repeat antivenom as needed\n- Blood products for significant bleeding\n\n**Disposition from ICU:**\n- Stable airway\n- Hemodynamically stable\n- Labs improving\n- Downgrade to floor [1][3]',
    citation: [1, 3],
    next: 'snake-recurrence-counseling',
  },

  {
    id: 'snake-recurrence-counseling',
    type: 'info',
    module: 7,
    title: 'Recurrence Phenomenon',
    body: '**Late Coagulopathy — Important Patient Counseling:**\n\n**CroFab-Specific Issue:**\n- Half-life < 12 hours (shorter than venom persistence)\n- 32-50% develop late hematologic toxicity\n- Occurs days to weeks after treatment\n- Venom depots released after antivenom clears\n\n**Peak Risk:**\n- Days 2-7 post-treatment\n- Rattlesnake > copperhead\n- Can occur even after hospital discharge\n\n**Follow-up Labs (Rattlesnake or antivenom given):**\n- Days 2-3\n- Days 5-7\n\n**Retreat with Antivenom if:**\n- INR > 3.0\n- PTT > 50 seconds\n- Platelets < 25,000\n- Fibrinogen < 50 mg/dL\n- Multi-component coagulopathy\n\n**Anavip may have lower recurrence rates** (longer half-life).\n\n[Recurrence Monitor](#/calculator/snake-recurrence) [3][5]',
    citation: [3, 5],
    calculatorLinks: [
      { id: 'snake-recurrence', label: 'Recurrence Monitor' },
    ],
    options: [
      {
        label: 'Complete — Return to Start',
        description: 'Consult complete',
        next: 'snake-start',
      },
    ],
  },

];

export const SNAKE_ENVENOMATION_MODULE_LABELS = [
  'Initial Assessment',
  'Snake ID',
  'Pit Viper Grading',
  'Antivenom',
  'Special Populations',
  'Coral Snake',
  'Disposition',
];

export const SNAKE_ENVENOMATION_CITATIONS: Citation[] = [
  { num: 1, text: 'EB Medicine. Evidence-Based Management of Snake Envenomations. 2023.' },
  { num: 2, text: 'Surgical Critical Care Guidelines. Envenomation Management. 2023.' },
  { num: 3, text: 'CroFab Prescribing Information. BTG International.' },
  { num: 4, text: 'Anavip Prescribing Information. Instituto Bioclon.' },
  { num: 5, text: 'Boyer LV, et al. Recurrence phenomena after immunoglobulin therapy for snake envenomations. Ann Emerg Med. 2001.' },
  { num: 6, text: 'FDA. Coral Snake Antivenin Lot Extension. 2024.' },
];
