// MedKitt — Malaria Management
// Initial Assessment → Diagnostic Testing → Severity Classification → Treatment Selection → Special Populations → Disposition
// 6 modules: Initial Assessment → Diagnostic Testing → Severity Classification → Treatment Selection → Special Populations → Disposition
// 35 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const MALARIA_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'mal-start',
    type: 'question',
    module: 1,
    title: 'Malaria — Initial Assessment',
    body: '[Malaria Steps Summary](#/info/mal-steps)\n\n**Malaria** is a life-threatening parasitic infection transmitted by *Anopheles* mosquitoes. Endemic in tropical and subtropical regions. **Any fever in a traveler returning from an endemic area is malaria until proven otherwise.** [1][2]\n\n**Key Principle:** Species identification drives all treatment decisions. *P. falciparum* can kill within 24-48 hours if untreated. [3][4]\n\n**Critical early actions:**\n• STAT thick and thin blood smears for species ID and parasitemia %\n• Have CDC Malaria Hotline number ready (770-488-7788)\n• Admit all *P. falciparum* cases — even if initially uncomplicated\n\nHas the patient traveled to a malaria-endemic region within the past year?',
    citation: [1, 2, 3, 4],
    calculatorLinks: [
      { id: 'malaria-severity', label: 'Severity Score' },
      { id: 'parasitemia-calc', label: 'Parasitemia %' },
    ],
    options: [
      {
        label: 'Yes — Recent Travel to Endemic Area',
        description: 'Africa, Asia, Central/South America, Pacific Islands within past 12 months',
        next: 'mal-symptom-onset',
      },
      {
        label: 'No — No Recent Travel',
        description: 'Consider alternative diagnoses',
        next: 'mal-no-travel',
      },
    ],
    summary: 'Travel to endemic area + fever = malaria until proven otherwise — thick/thin smear STAT',
    safetyLevel: 'critical',
  },

  {
    id: 'mal-symptom-onset',
    type: 'info',
    module: 1,
    title: 'Symptom Timing & Presentation',
    body: '**Classic presentation:** [1][2]\n• **Fever** (paroxysmal or continuous) — most common symptom\n• **Rigors, chills, sweats** — may occur in cycles\n• **Headache, myalgias, malaise** — nonspecific\n• **Nausea, vomiting, diarrhea** — common\n\n**Incubation period:** [4]\n• *P. falciparum:* 7-14 days (most within 30 days)\n• *P. vivax/ovale:* 12-18 days (can be >6 months due to dormant liver stages)\n• *P. malariae:* 18-40 days\n• *P. knowlesi:* 9-12 days\n\n**Red flags for severe disease:** [5]\n• Altered mentation, seizures\n• Respiratory distress, hypoxemia\n• Hypotension, shock\n• Jaundice, dark urine (hemolysis)\n• Severe anemia\n• Acute kidney injury, oliguria\n\n[Species Comparison Table](#/info/mal-species-table)',
    citation: [1, 2, 4, 5],
    next: 'mal-diagnostics',
    summary: 'Symptoms typically 7-30 days after travel — P. vivax/ovale may present months to years later',
  },

  {
    id: 'mal-no-travel',
    type: 'result',
    module: 1,
    title: 'Low Probability of Malaria',
    body: '**Without recent travel to endemic areas, malaria is extremely unlikely** (rare exceptions: airport malaria, congenital transmission, blood transfusion). [4]\n\n**Consider alternative diagnoses:**\n• Dengue, Zika, chikungunya\n• Typhoid fever\n• Rickettsial infections\n• Leptospirosis\n• Viral hemorrhagic fevers\n• Influenza, COVID-19\n• Bacterial sepsis\n\n**If high clinical suspicion persists despite negative travel history:**\n• Reconfirm travel history (family member travel? exposure to travelers?)\n• Obtain thick and thin smears to definitively exclude\n• Consider infectious disease consultation',
    recommendation: 'Malaria is unlikely without endemic area exposure. Pursue alternative febrile illness workup. If suspicion persists, obtain blood smears and consult infectious disease.',
    confidence: 'recommended',
    citation: [4],
    summary: 'No travel history: consider airport malaria, transfusion-transmitted, or congenital malaria',
    skippable: true,
  },

  // =====================================================================
  // MODULE 2: DIAGNOSTIC TESTING
  // =====================================================================

  {
    id: 'mal-diagnostics',
    type: 'info',
    module: 2,
    title: 'Diagnostic Testing — Blood Smears & RDT',
    body: '**STAT thick and thin blood smears** — gold standard for diagnosis. [1][2][4]\n\n**Thick smear:**\n• Concentrates parasites — **higher sensitivity** for detection\n• Used to confirm presence of infection\n• Estimates parasitemia density\n\n**Thin smear:**\n• Allows **species identification** and accurate parasitemia count\n• Essential for treatment decisions\n\n**Parasitemia calculation:** [5]\n• % infected RBCs = (infected RBCs / total RBCs counted) × 100\n• [Parasitemia Calculator](#/calculator/parasitemia-calc)\n• **>10% = severe malaria** — ICU admission + IV artesunate [5]\n\n**Rapid Diagnostic Test (RDT):** [4]\n• Detects *Plasmodium* antigens (HRP-2, pLDH)\n• Sensitivity 95% for *P. falciparum*, lower for other species\n• **Cannot replace blood smears** — does not provide species ID or parasitemia %\n• Useful for rapid triage when smear results delayed\n\n**Repeat smears q12-24h if initial negative but high suspicion** — parasitemia may be intermittent. [4]\n\n**Adjunct labs:**\n• CBC (anemia, thrombocytopenia)\n• BMP (renal function, electrolytes)\n• LFTs (hyperbilirubinemia common)\n• Glucose (hypoglycemia risk)\n• Lactate, ABG if severe disease',
    images: [{ src: 'images/malaria/pf-blood-smear.jpg', alt: 'Giemsa-stained thin blood smear showing P. falciparum ring-form trophozoites and banana-shaped gametocyte', caption: 'P. falciparum thin smear — ring forms (multiple per RBC, double chromatin dots) and crescent-shaped gametocyte. (CC BY-SA 3.0)' }],
    citation: [1, 2, 4, 5],
    calculatorLinks: [
      { id: 'parasitemia-calc', label: 'Parasitemia %' },
    ],
    next: 'mal-species',
    summary: 'Thick smear (sensitive) and thin smear (speciation) — RDT as adjunct, not replacement',
  },

  {
    id: 'mal-species',
    type: 'question',
    module: 2,
    title: 'Species Identification',
    body: '**Species identification is CRITICAL** — determines treatment regimen, resistance patterns, and disposition. [1][3][4]\n\n[Species Comparison Table](#/info/mal-species-table)\n\n**Five species infect humans:**\n• ***P. falciparum*** — most lethal, can progress to severe malaria in 24-48h, chloroquine-resistant in most regions\n• ***P. vivax*** — dormant liver stages (hypnozoites) require primaquine for radical cure, chloroquine-resistant in some regions\n• ***P. ovale*** — similar to vivax (dormant liver stages), rare, mostly West Africa\n• ***P. malariae*** — chronic low-grade parasitemia, can cause nephrotic syndrome\n• ***P. knowlesi*** — rapidly multiplies (24h cycle), can cause severe disease, Southeast Asia only\n\n**Mixed infections** occur in 5-10% of cases — treat for most dangerous species. [4]\n\nWhat species was identified on thin smear?',
    citation: [1, 3, 4],
    options: [
      {
        label: 'P. falciparum (or mixed including falciparum)',
        description: 'Most dangerous species — can rapidly progress to severe malaria',
        next: 'mal-severity',
        urgency: 'urgent',
      },
      {
        label: 'P. vivax or P. ovale',
        description: 'Require primaquine for radical cure (G6PD testing mandatory)',
        next: 'mal-severity',
      },
      {
        label: 'P. malariae or P. knowlesi',
        description: 'P. malariae: chronic infection. P. knowlesi: can be severe.',
        next: 'mal-severity',
      },
      {
        label: 'Pending — Species Not Yet Identified',
        description: 'RDT positive or high clinical suspicion, smear pending',
        next: 'mal-pending-species',
      },
    ],
    summary: 'Species identification determines treatment: P. falciparum is most lethal, requires different therapy',
    safetyLevel: 'warning',
  },

  {
    id: 'mal-pending-species',
    type: 'info',
    module: 2,
    title: 'Management While Awaiting Species ID',
    body: '**If RDT positive or high clinical suspicion but species ID pending:** [4][6]\n\n**Do NOT delay treatment** — initiate empiric therapy based on:  \n1. Geographic region of travel (resistance patterns)  \n2. Clinical severity  \n3. Most likely species\n\n**Empiric approach:**\n• **Severe malaria** (any species) → IV artesunate immediately [5][6]\n• **Uncomplicated, travel to Africa or Papua New Guinea** → assume *P. falciparum* → artemether-lumefantrine (Coartem) or atovaquone-proguanil (Malarone) [6][7]\n• **Uncomplicated, travel to Central/South America or Asia** → consider vivax/ovale → hold primaquine until G6PD results and species confirmed [4]\n\n**Reassess when species ID available** — adjust therapy as needed.\n\n**Call CDC Malaria Hotline for guidance:** 770-488-7788 (M-F 9am-5pm ET) or 770-488-7100 (after hours). [6]',
    citation: [4, 5, 6, 7],
    next: 'mal-severity',
    summary: 'If species unknown, treat as P. falciparum (most dangerous) until speciation available',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 3: SEVERITY CLASSIFICATION
  // =====================================================================

  {
    id: 'mal-severity',
    type: 'question',
    module: 3,
    title: 'Severity Classification',
    body: '**Severe malaria** is defined by WHO 2023 criteria as *Plasmodium* infection PLUS ≥1 of the following: [5]\n\n[Severe Malaria WHO 2023 Criteria](#/info/mal-severe-criteria)\n\n**Clinical criteria:**\n• Impaired consciousness (GCS <11)\n• Prostration (inability to sit/stand without assistance)\n• Multiple convulsions (≥2 in 24h)\n• Respiratory distress (acidotic breathing)\n• Circulatory collapse, shock (SBP <70 mmHg in children, <80 in adults)\n• Acute pulmonary edema (radiographic)\n• Abnormal bleeding\n• Jaundice (bilirubin >3 mg/dL + parasitemia >100,000/mcL)\n\n**Laboratory criteria:**\n• **Parasitemia >10%** (or >250,000/mcL)\n• Severe anemia (Hgb <5 g/dL in children, <7 in adults)\n• Hypoglycemia (glucose <40 mg/dL)\n• Metabolic acidosis (pH <7.25 or HCO₃ <15 mEq/L)\n• Renal impairment (creatinine >3 mg/dL)\n• Hyperlactatemia (lactate >5 mmol/L)\n• Hemoglobinuria (macroscopic black/dark urine)\n\n[Malaria Severity Calculator](#/calculator/malaria-severity)\n\nDoes the patient meet criteria for **severe malaria**?',
    citation: [5],
    calculatorLinks: [
      { id: 'malaria-severity', label: 'Severity Score' },
      { id: 'parasitemia-calc', label: 'Parasitemia %' },
    ],
    options: [
      {
        label: 'Yes — Severe Malaria',
        description: 'Meets ≥1 WHO severe malaria criterion',
        next: 'mal-severe-treatment',
        urgency: 'critical',
      },
      {
        label: 'No — Uncomplicated Malaria',
        description: 'Parasitemia confirmed, no severe criteria',
        next: 'mal-uncomplicated',
      },
    ],
    summary: 'Severe malaria criteria: AMS, seizures, severe anemia, parasitemia >5%, acidosis, renal/hepatic failure',
    safetyLevel: 'critical',
  },

  {
    id: 'mal-severe-treatment',
    type: 'info',
    module: 3,
    title: 'Severe Malaria — IV Artesunate',
    body: '**IV artesunate is the ONLY treatment for severe malaria.** [5][6][8]\n\n**STAT actions:**\n1. **Call CDC Malaria Hotline immediately:** 770-488-7788 (M-F 9am-5pm ET) or 770-488-7100 (24/7 after hours) [6]\n2. **Request IV artesunate via CDC IND (Investigational New Drug) protocol** — available 24/7, delivered to bedside within hours [6]\n3. **ICU admission** — close monitoring required\n4. **Supportive care:** fluids (avoid overload), correct hypoglycemia, treat seizures, blood transfusion if severe anemia\n\n**IV Artesunate dosing:** [5][6][8]\n• **2.4 mg/kg IV** at 0, 12, and 24 hours (loading doses)\n• Then **2.4 mg/kg IV daily** until patient can tolerate oral therapy (usually 3-7 days)\n• Pediatric <20 kg: use 3 mg/kg dosing [8]\n• [Artesunate Dosing Calculator](#/calculator/artesunate-dosing)\n\n**Switch to oral ACT** once:  \n• Patient can tolerate oral intake  \n• Parasitemia <1% and declining  \n• No severe malaria criteria  \n• Complete total 3-day course of oral ACT (artemether-lumefantrine or atovaquone-proguanil) [5][6]\n\n**If IV artesunate unavailable** (rare): Quinidine gluconate 10 mg/kg IV load over 1-2h, then 0.02 mg/kg/min infusion with cardiac monitoring. [6]\n\n**Complications to monitor:** [5]\n• Post-artesunate delayed hemolysis (occurs 1-4 weeks after treatment — monitor CBC weekly × 4 weeks)\n• Hypoglycemia (q4-6h glucose checks)\n• Cerebral malaria sequelae (neurologic deficits in ~10%)\n• Acute kidney injury, ARDS',
    citation: [5, 6, 8],
    calculatorLinks: [
      { id: 'artesunate-dosing', label: 'Artesunate Dosing' },
    ],
    treatment: {
      firstLine: {
        drug: 'IV Artesunate',
        dose: '2.4 mg/kg',
        route: 'IV',
        frequency: 'at 0, 12, 24h, then daily',
        duration: 'until can tolerate PO, then complete 3d oral ACT',
        notes: 'Obtain via CDC IND protocol. Call 770-488-7788 or 770-488-7100 (24/7).',
      },
      alternative: {
        drug: 'Quinidine gluconate',
        dose: '10 mg/kg load, then 0.02 mg/kg/min',
        route: 'IV',
        frequency: 'continuous infusion',
        duration: 'until can tolerate PO',
        notes: 'Only if artesunate unavailable. Requires cardiac monitoring (QTc prolongation risk).',
      },
      monitoring: 'ICU monitoring. Glucose q4-6h. Repeat blood smears q12-24h. Monitor for delayed hemolysis (CBC weekly × 4 weeks post-treatment).',
    },
    next: 'mal-complications',
    summary: 'IV artesunate is first-line for severe malaria — available from CDC Malaria Hotline 770-488-7788',
    safetyLevel: 'critical',
  },

  {
    id: 'mal-complications',
    type: 'info',
    module: 3,
    title: 'Severe Malaria — Complication Management',
    body: '**Cerebral malaria** (impaired consciousness, seizures): [5]\n• Supportive care — maintain airway, prevent aspiration\n• Treat seizures: benzodiazepines first-line\n• Avoid steroids (HARM, not help — increases mortality) [5]\n• Neurologic sequelae occur in ~10% (cognitive deficits, motor dysfunction)\n\n**Hypoglycemia** (glucose <40 mg/dL): [5]\n• Common in severe malaria and pregnancy\n• Monitor glucose q4-6h\n• Dextrose boluses PRN, consider D10 infusion\n• Risk highest with quinine/quinidine (stimulates insulin release)\n\n**Acute kidney injury:** [5]\n• Fluid resuscitation — avoid overload (ARDS risk)\n• Dialysis if severe (volume overload, uremia, refractory hyperkalemia)\n• Reversible in most cases\n\n**Severe anemia (Hgb <7 g/dL):** [5]\n• Blood transfusion — liberal threshold in severe malaria\n• Monitor for delayed hemolysis post-artesunate\n\n**ARDS / pulmonary edema:** [5]\n• Restrictive fluid strategy\n• Mechanical ventilation if needed\n• Mortality high once ARDS develops (~50%)\n\n**Acidosis:** [5]\n• Correct underlying cause (fluid resuscitation, source control)\n• Bicarbonate generally NOT recommended unless pH <7.1\n\n**Shock / circulatory collapse:** [5]\n• Fluid resuscitation (crystalloid)\n• Vasopressors if fluid-refractory\n• High mortality — aggressive ICU management',
    citation: [5],
    next: 'mal-disposition',
    summary: 'Cerebral malaria, ARDS, DIC, splenic rupture, severe anemia — ICU monitoring for all severe cases',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: TREATMENT SELECTION (UNCOMPLICATED)
  // =====================================================================

  {
    id: 'mal-uncomplicated',
    type: 'question',
    module: 4,
    title: 'Uncomplicated Malaria — Treatment by Species',
    body: '**Uncomplicated malaria** = parasitemia without severe malaria criteria. [1][4]\n\n**Treatment principles:** [6][7]\n• **Artemisinin-based combination therapy (ACT)** is first-line for *P. falciparum* [6][7]\n• **NEVER use artemisinin monotherapy** — promotes resistance [6]\n• **Chloroquine-resistant *P. falciparum*** is widespread (Africa, Southeast Asia, South America) — ACT required [4][6]\n• ***P. vivax/ovale* require primaquine** for radical cure (eradicate dormant liver stages) [9]\n• **G6PD testing MANDATORY** before primaquine [9]\n\n[Drug Resistance by Region](#/info/mal-resistance)\n\nSelect treatment based on species:',
    citation: [1, 4, 6, 7, 9],
    options: [
      {
        label: 'P. falciparum — Chloroquine-Resistant Region',
        description: 'Africa, Southeast Asia, South America, Oceania (most regions)',
        next: 'mal-uncomplicated-falciparum',
      },
      {
        label: 'P. falciparum — Chloroquine-Sensitive Region',
        description: 'Central America (rare), parts of Middle East',
        next: 'mal-chloroquine-sensitive',
      },
      {
        label: 'P. vivax or P. ovale',
        description: 'Requires chloroquine (or ACT if resistant) + primaquine',
        next: 'mal-vivax-ovale',
      },
      {
        label: 'P. malariae or P. knowlesi',
        description: 'Chloroquine-sensitive unless proven otherwise',
        next: 'mal-malariae-knowlesi',
      },
    ],
    summary: 'Uncomplicated P. falciparum: ACT (artemether-lumefantrine) or atovaquone-proguanil for 3 days',
  },

  {
    id: 'mal-uncomplicated-falciparum',
    type: 'info',
    module: 4,
    title: 'Uncomplicated P. falciparum — ACT Regimens',
    body: '**First-line:** Artemisinin-based combination therapy (ACT). [6][7]\n\n**Option 1: [Artemether-Lumefantrine (Coartem)](#/drug/artemether-lumefantrine/uncomplicated malaria)** [7][10]\n• **Dosing:** 4 tablets (20 mg artemether / 120 mg lumefantrine per tablet) PO BID × 3 days (total 6 doses)\n• Weight-based: <35 kg use pediatric dosing\n• Take with fatty food (enhances absorption)\n• FDA-approved, widely available\n\n**Option 2: [Atovaquone-Proguanil (Malarone)](#/drug/atovaquone-proguanil/uncomplicated malaria)** [7][11]\n• **Dosing:** 4 tablets (250 mg atovaquone / 100 mg proguanil per tablet) PO daily × 3 days\n• Take with food or milky drink\n• Alternative if artemether-lumefantrine unavailable\n• Expensive but well-tolerated\n\n**Option 3: Quinine sulfate + doxycycline or clindamycin** (if ACT unavailable): [6]\n• Quinine 542 mg (= 650 mg quinine sulfate) PO TID × 3 or 7 days (region-dependent)\n• PLUS doxycycline 100 mg PO BID × 7 days OR clindamycin 20 mg/kg/day divided TID × 7 days\n• Poorly tolerated (cinchonism: tinnitus, nausea, dizziness)\n\n**Do NOT use:** [6]\n• Chloroquine (widespread resistance)\n• Mefloquine alone (resistance, neuropsychiatric side effects)\n\n**Admit all *P. falciparum* cases** — even if initially uncomplicated. Can deteriorate rapidly within 24-48h. [3][4]',
    citation: [3, 4, 6, 7, 10, 11],
    treatment: {
      firstLine: {
        drug: 'Artemether-Lumefantrine (Coartem)',
        dose: '4 tablets (80/480 mg)',
        route: 'PO',
        frequency: 'BID',
        duration: '3 days (6 doses total)',
        notes: 'Take with fatty food. Most common first-line ACT.',
      },
      alternative: {
        drug: 'Atovaquone-Proguanil (Malarone)',
        dose: '4 tablets (1000/400 mg)',
        route: 'PO',
        frequency: 'daily',
        duration: '3 days',
        notes: 'Take with food. Well-tolerated alternative.',
      },
      monitoring: 'Repeat blood smears day 3 and day 7 (or until negative). Admit for observation — risk of progression to severe malaria.',
    },
    next: 'mal-monitoring',
    summary: 'Artemether-lumefantrine (Coartem) 4 tabs at 0, 8h, 24, 36, 48, 60h — give with fatty food',
  },

  {
    id: 'mal-chloroquine-sensitive',
    type: 'info',
    module: 4,
    title: 'Chloroquine-Sensitive P. falciparum',
    body: '**Chloroquine-sensitive regions** (rare): [4][6]\n• Central America (Panama west)\n• Parts of Middle East\n• Haiti, Dominican Republic (reported but resistance emerging)\n\n**Treatment:** [Chloroquine phosphate](#/drug/chloroquine/malaria treatment) [6][12]\n• **Dosing:** 1000 mg (600 mg base) PO initial dose, then 500 mg (300 mg base) at 6h, 24h, and 48h (total dose: 2500 mg = 1500 mg base over 3 days)\n• Well-tolerated, inexpensive\n\n**If chloroquine resistance uncertain:** Use ACT (artemether-lumefantrine or atovaquone-proguanil) as above. [6]\n\n**Still admit for observation** — monitor for treatment failure (repeat smears day 3, 7).',
    citation: [4, 6, 12],
    treatment: {
      firstLine: {
        drug: 'Chloroquine phosphate',
        dose: '1000 mg, then 500 mg',
        route: 'PO',
        frequency: 'at 0, 6, 24, 48h',
        duration: '3 days (total 2500 mg)',
        notes: 'Only for confirmed chloroquine-sensitive regions. Admit for observation.',
      },
      monitoring: 'Repeat blood smears day 3 and 7. Watch for treatment failure (persistent/rising parasitemia). If failure: switch to ACT.',
    },
    next: 'mal-monitoring',
    summary: 'Chloroquine-sensitive regions: only Central America west of Panama Canal and some Caribbean islands',
    skippable: true,
  },

  {
    id: 'mal-vivax-ovale',
    type: 'info',
    module: 4,
    title: 'P. vivax / P. ovale — Chloroquine + Primaquine',
    body: '***P. vivax* and *P. ovale*** form dormant liver stages (hypnozoites) that can cause relapse months to years after initial infection. **Primaquine is REQUIRED for radical cure.** [9][13]\n\n**Step 1: Chloroquine for blood-stage parasites** [6][12]\n• [Chloroquine phosphate](#/drug/chloroquine/malaria treatment) 1000 mg (600 mg base) PO, then 500 mg at 6h, 24h, 48h\n• **If chloroquine-resistant** (Indonesia, Papua New Guinea, parts of Southeast Asia): use ACT (artemether-lumefantrine or atovaquone-proguanil) [4][6]\n\n**Step 2: Primaquine for liver-stage hypnozoites** [9][13]\n• **MANDATORY G6PD testing BEFORE starting primaquine** — hemolysis risk if G6PD-deficient [9]\n• [Primaquine Safety Calculator](#/calculator/primaquine-safety)\n\n**If G6PD NORMAL:** [Primaquine](#/drug/primaquine/radical cure) [9][13]\n• **Standard regimen:** 30 mg base (52.6 mg salt) PO daily × 14 days\n• **Alternative high-dose:** 0.5 mg/kg base daily × 14 days (higher cure rates, more GI side effects)\n• Take with food to reduce nausea\n\n**If G6PD DEFICIENT:** [9][13]\n• **Weekly low-dose primaquine:** 45 mg base (79 mg salt) PO once weekly × 8 weeks (under specialist guidance)\n• Monitor CBC weekly for hemolysis\n• Consider referral to infectious disease\n\n**If G6PD testing unavailable or pregnancy:** [9]\n• Defer primaquine until after delivery or until G6PD testing available\n• Provide chloroquine prophylaxis 300 mg base (500 mg salt) PO weekly to suppress relapses until primaquine can be given',
    citation: [4, 6, 9, 12, 13],
    calculatorLinks: [
      { id: 'primaquine-safety', label: 'Primaquine Safety' },
    ],
    treatment: {
      firstLine: {
        drug: 'Chloroquine + Primaquine',
        dose: 'Chloroquine 1000/500 mg, Primaquine 30 mg base daily',
        route: 'PO',
        frequency: 'Chloroquine: 0, 6, 24, 48h. Primaquine: daily × 14d',
        duration: 'Chloroquine 3d, Primaquine 14d',
        notes: 'G6PD testing MANDATORY before primaquine. See calculator.',
      },
      alternative: {
        drug: 'ACT + Primaquine (if chloroquine-resistant)',
        dose: 'Artemether-lumefantrine or atovaquone-proguanil + primaquine',
        route: 'PO',
        frequency: 'per ACT dosing + primaquine daily × 14d',
        duration: 'ACT 3d, primaquine 14d',
        notes: 'For chloroquine-resistant vivax (Indonesia, PNG).',
      },
      monitoring: 'G6PD test before primaquine. CBC if G6PD-deficient on weekly primaquine. Repeat smears day 7 to confirm clearance.',
    },
    next: 'mal-primaquine',
    summary: 'P. vivax/ovale: chloroquine + primaquine for radical cure (hypnozoite eradication) — check G6PD first',
    safetyLevel: 'warning',
  },

  {
    id: 'mal-primaquine',
    type: 'info',
    module: 4,
    title: 'Primaquine — G6PD Testing & Safety',
    body: '**Primaquine causes dose-dependent hemolysis in G6PD-deficient patients.** G6PD testing is MANDATORY before prescribing. [9][13]\n\n[Primaquine Safety Calculator](#/calculator/primaquine-safety)\n\n**G6PD testing:** [9]\n• Quantitative G6PD enzyme activity preferred (vs qualitative screening)\n• If patient recently transfused: test may be falsely normal (transfused RBCs have normal G6PD) — defer primaquine or retest in 3 months\n• Heterozygous females may have intermediate enzyme levels — use clinical judgment\n\n**Contraindications:** [9][13]\n• G6PD deficiency (unless using weekly low-dose regimen under specialist care)\n• Pregnancy (risk to fetus if fetus is G6PD-deficient)\n• Breastfeeding if infant is G6PD-deficient or status unknown\n• Infants <6 months\n\n**Dosing:** [9][13]\n• **Standard:** 30 mg base (52.6 mg salt) PO daily × 14 days\n• **High-dose (alternative):** 0.5 mg/kg base daily × 14 days — higher cure rates but more GI side effects\n• **G6PD-deficient (weekly):** 45 mg base PO once weekly × 8 weeks (specialist consultation recommended)\n\n**Adverse effects:** [9]\n• Nausea, abdominal pain (take with food)\n• Hemolysis (if G6PD-deficient or excessive dosing)\n• Methemoglobinemia (rare)\n\n**Monitoring:** [9]\n• CBC at baseline\n• If weekly dosing for G6PD deficiency: CBC weekly to monitor for hemolysis\n• Repeat blood smear day 7 to confirm clearance',
    citation: [9, 13],
    calculatorLinks: [
      { id: 'primaquine-safety', label: 'Primaquine Safety' },
    ],
    next: 'mal-monitoring',
    summary: 'Primaquine: check G6PD BEFORE starting — hemolytic anemia in G6PD-deficient patients',
    safetyLevel: 'critical',
  },

  {
    id: 'mal-malariae-knowlesi',
    type: 'info',
    module: 4,
    title: 'P. malariae / P. knowlesi — Chloroquine',
    body: '***P. malariae:*** [4][6]\n• Chronic low-grade parasitemia (can persist for decades if untreated)\n• Associated with nephrotic syndrome (immune complex deposition)\n• Chloroquine-sensitive worldwide\n• **No liver stages** — primaquine NOT required\n• Treatment: [Chloroquine phosphate](#/drug/chloroquine/malaria treatment) 1000 mg, then 500 mg at 6, 24, 48h (same as vivax)\n\n***P. knowlesi:*** [4][6][14]\n• Zoonotic (macaque reservoir), Southeast Asia only (Malaysia, Borneo, Philippines)\n• **Rapid multiplication** (24-hour cycle vs 48-72h for other species) — can progress to high parasitemia and severe disease\n• Morphologically similar to *P. malariae* on smear — requires PCR for definitive ID\n• Chloroquine-sensitive\n• **If severe or high parasitemia:** treat as severe malaria (IV artesunate) [14]\n• **If uncomplicated:** chloroquine OR ACT (artemether-lumefantrine preferred if knowlesi confirmed) [14]\n• **No liver stages** — primaquine NOT required\n\n**Treatment:** [6][14]\n• Chloroquine 1000 mg, then 500 mg at 6, 24, 48h\n• OR artemether-lumefantrine (if knowlesi confirmed or suspected)\n\n**Monitoring:** Repeat smears q12-24h for *P. knowlesi* — can rapidly progress. Admit for observation. [14]',
    citation: [4, 6, 14],
    treatment: {
      firstLine: {
        drug: 'Chloroquine phosphate',
        dose: '1000 mg, then 500 mg',
        route: 'PO',
        frequency: 'at 0, 6, 24, 48h',
        duration: '3 days',
        notes: 'First-line for P. malariae. P. knowlesi: use ACT if confirmed.',
      },
      alternative: {
        drug: 'Artemether-Lumefantrine (for P. knowlesi)',
        dose: '4 tablets BID',
        route: 'PO',
        frequency: 'BID',
        duration: '3 days',
        notes: 'Preferred for confirmed P. knowlesi due to rapid multiplication.',
      },
      monitoring: 'Repeat smears q12-24h for P. knowlesi (can progress rapidly). Admit for observation.',
    },
    next: 'mal-monitoring',
    summary: 'P. malariae: chloroquine effective. P. knowlesi: can cause severe disease, treat as falciparum',
    skippable: true,
  },

  {
    id: 'mal-monitoring',
    type: 'info',
    module: 4,
    title: 'Treatment Monitoring',
    body: '**Follow-up blood smears:** [4][6]\n• **Day 3:** Parasitemia should be declining or cleared\n• **Day 7:** Should be negative (if still positive → treatment failure)\n• **Day 14 and 28:** Confirm sustained clearance\n\n**Treatment failure** (persistent or recurrent parasitemia): [4][6]\n• Consider drug resistance\n• Consult infectious disease\n• Switch to alternative regimen\n• If initial chloroquine used: switch to ACT\n• If initial ACT used: consider quinine + doxycycline or atovaquone-proguanil\n\n**Post-treatment monitoring:** [8][13]\n• **Post-artesunate delayed hemolysis:** CBC weekly × 4 weeks after IV artesunate (occurs in ~10-15%) [8]\n• **Vivax/ovale relapse:** Can occur months after treatment if primaquine not given or inadequate\n\n**Patient education:** [4]\n• Complete full course of therapy\n• Return if fever recurs\n• For vivax/ovale: importance of primaquine to prevent relapse\n• Avoid mosquito bites if returning to endemic area\n\n**Prophylaxis counseling for future travel:** [4]\n• Discuss chemoprophylaxis options (atovaquone-proguanil, doxycycline, mefloquine)\n• Insecticide-treated bed nets, DEET, permethrin-treated clothing\n• Avoid outdoor exposure dusk to dawn (peak *Anopheles* feeding time)',
    citation: [4, 6, 8, 13],
    next: 'mal-special-pops',
    summary: 'Serial parasitemia at 0, 12, 24, 48, 72h — should decline by 75% at 48h on effective treatment',
  },

  // =====================================================================
  // MODULE 5: SPECIAL POPULATIONS
  // =====================================================================

  {
    id: 'mal-special-pops',
    type: 'question',
    module: 5,
    title: 'Special Populations',
    body: 'Certain populations require modified treatment approaches due to drug safety, resistance patterns, or physiologic considerations. [15]\n\nDoes the patient belong to a special population?',
    citation: [15],
    options: [
      {
        label: 'Pregnant Patient',
        description: 'Modified treatment regimens required — some antimalarials teratogenic',
        next: 'mal-pregnancy',
      },
      {
        label: 'Pediatric Patient (<20 kg)',
        description: 'Weight-based dosing adjustments',
        next: 'mal-pediatric',
      },
      {
        label: 'Prophylaxis Failure',
        description: 'Was taking chemoprophylaxis but developed malaria',
        next: 'mal-prophylaxis-failure',
      },
      {
        label: 'None — Standard Adult',
        description: 'No special considerations',
        next: 'mal-disposition',
      },
    ],
    summary: 'Pregnancy, pediatrics, and immunocompromised patients need modified treatment — consult ID',
    safetyLevel: 'warning',
  },

  {
    id: 'mal-pregnancy',
    type: 'info',
    module: 5,
    title: 'Malaria in Pregnancy',
    body: '**Malaria in pregnancy is life-threatening** to both mother and fetus. Higher risk of severe disease, hypoglycemia, pulmonary edema, and maternal death. [15][16]\n\n[Pregnancy Management Guide](#/info/mal-pregnancy)\n\n**Risk to fetus:** [15][16]\n• Spontaneous abortion, stillbirth\n• Preterm delivery\n• Low birth weight\n• Congenital malaria (rare)\n\n**Treatment by trimester:** [6][15][16]\n\n**First trimester:**\n• **Severe malaria:** IV artesunate (benefits outweigh risks) [6][16]\n• **Uncomplicated *P. falciparum*:** Quinine + clindamycin × 7 days [6][16]\n• **Avoid:** Artemisinin derivatives if possible (teratogenic in animal studies), primaquine (hemolysis risk to fetus), atovaquone-proguanil, doxycycline\n\n**Second and third trimester:**\n• **Severe malaria:** IV artesunate [6][16]\n• **Uncomplicated *P. falciparum*:** Artemether-lumefantrine, quinine + clindamycin, or mefloquine [6][16]\n• **Uncomplicated *P. vivax/ovale*:** Chloroquine for blood stage, **defer primaquine until after delivery** [9][16]\n• Provide chloroquine prophylaxis 300 mg base weekly to suppress relapses until primaquine can be given postpartum [9]\n\n**Monitoring:** [15][16]\n• Glucose q4-6h (hypoglycemia risk higher in pregnancy)\n• Fetal monitoring when feasible\n• Admit all pregnant patients with malaria\n• Obstetrics consultation',
    citation: [6, 9, 15, 16],
    treatment: {
      firstLine: {
        drug: 'IV Artesunate (if severe, any trimester)',
        dose: '2.4 mg/kg',
        route: 'IV',
        frequency: 'at 0, 12, 24h, then daily',
        duration: 'until can tolerate PO',
        notes: 'Benefits outweigh risks in severe malaria. Obtain via CDC IND.',
      },
      alternative: {
        drug: 'Quinine + Clindamycin (1st trimester uncomplicated)',
        dose: 'Quinine 650 mg TID, Clindamycin 20 mg/kg/day divided',
        route: 'PO',
        frequency: 'Quinine TID, Clindamycin TID',
        duration: '7 days',
        notes: 'Safest option for 1st trimester uncomplicated. ACT preferred after 1st trimester.',
      },
      monitoring: 'Glucose q4-6h. Fetal monitoring. Admit all pregnant patients. Defer primaquine until postpartum.',
    },
    next: 'mal-disposition',
    summary: 'Severe malaria in pregnancy: IV artesunate (all trimesters). Uncomplicated: quinine + clindamycin 1st trimester',
    skippable: true,
    safetyLevel: 'warning',
  },

  {
    id: 'mal-pediatric',
    type: 'info',
    module: 5,
    title: 'Pediatric Malaria Management',
    body: '**Pediatric patients have higher risk** of severe malaria, hypoglycemia, seizures, and severe anemia. [17]\n\n**Treatment principles:** [6][17]\n• Same species-specific regimens as adults, adjusted for weight\n• Children <5 years have highest mortality from *P. falciparum*\n• Admit all children <5 years with *P. falciparum*\n\n**Severe malaria:** [6][8][17]\n• **IV Artesunate:** 3 mg/kg IV at 0, 12, 24h, then daily (higher dose than adults) [8]\n• Obtain via CDC IND protocol\n• ICU admission, close glucose monitoring\n\n**Uncomplicated *P. falciparum*:** [6][17]\n• **Artemether-lumefantrine:** Weight-based dosing (see pediatric dosing table) [10]\n  - 5-14 kg: 1 tablet BID × 3d\n  - 15-24 kg: 2 tablets BID × 3d\n  - 25-34 kg: 3 tablets BID × 3d\n  - ≥35 kg: 4 tablets BID × 3d (adult dose)\n• **Atovaquone-proguanil:** [11]\n  - 5-8 kg: 2 pediatric tablets daily × 3d\n  - 9-10 kg: 3 pediatric tablets daily × 3d\n  - 11-20 kg: 1 adult tablet daily × 3d\n  - >20 kg: adult dosing\n\n**Uncomplicated *P. vivax/ovale*:** [6][9][17]\n• Chloroquine: 10 mg base/kg (max 600 mg base), then 5 mg base/kg at 6, 24, 48h\n• Primaquine (if G6PD normal): 0.5 mg/kg base daily × 14 days [9]\n• **Infants <6 months:** defer primaquine, use chloroquine prophylaxis [9]\n\n**Monitoring:** [17]\n• Glucose q4-6h (hypoglycemia common)\n• Repeat smears day 3, 7\n• Admit <5 years with falciparum, any age with severe malaria',
    citation: [6, 8, 9, 10, 11, 17],
    treatment: {
      firstLine: {
        drug: 'IV Artesunate (severe)',
        dose: '3 mg/kg',
        route: 'IV',
        frequency: 'at 0, 12, 24h, then daily',
        duration: 'until can tolerate PO',
        notes: 'Higher dose than adults. Obtain via CDC. ICU admission.',
      },
      alternative: {
        drug: 'Artemether-Lumefantrine (uncomplicated)',
        dose: 'Weight-based (see dosing table)',
        route: 'PO',
        frequency: 'BID',
        duration: '3 days',
        notes: 'Take with fatty food. Admit <5 years with falciparum.',
      },
      monitoring: 'Glucose q4-6h. Admit <5 years with P. falciparum. Repeat smears day 3, 7.',
    },
    next: 'mal-disposition',
    summary: 'Pediatric malaria: same drugs, weight-based dosing — children decompensate faster than adults',
    skippable: true,
    safetyLevel: 'warning',
  },

  {
    id: 'mal-prophylaxis-failure',
    type: 'info',
    module: 5,
    title: 'Malaria Despite Chemoprophylaxis',
    body: '**Chemoprophylaxis failure** can occur due to: [4][18]\n• Non-adherence (most common)\n• Drug-resistant parasites\n• Inadequate dosing\n• Prophylaxis stopped too early (needs to continue 4 weeks after leaving endemic area for most drugs)\n• Wrong prophylaxis for region (e.g., chloroquine in chloroquine-resistant area)\n\n[Post-Exposure Prophylaxis Failure](#/info/mal-prophylaxis-failure)\n\n**Treatment approach:** [4][6][18]\n• **Do NOT use the same drug for treatment** that was used for prophylaxis (resistance likely)\n• If on atovaquone-proguanil prophylaxis → use artemether-lumefantrine or quinine + doxycycline\n• If on doxycycline prophylaxis → use atovaquone-proguanil or artemether-lumefantrine\n• If on mefloquine prophylaxis → use atovaquone-proguanil or artemether-lumefantrine\n• If severe malaria: IV artesunate regardless of prophylaxis used [6]\n\n**Prophylaxis options by drug class:** [4]\n• Atovaquone-proguanil (Malarone): highly effective, well-tolerated, expensive\n• Doxycycline: inexpensive, effective, requires daily dosing, GI side effects, photosensitivity\n• Mefloquine: weekly dosing, effective, but neuropsychiatric side effects (black box warning)\n• Chloroquine: only for chloroquine-sensitive regions (rare)\n\n**CDC guidance:** Call CDC Malaria Hotline for complex cases (770-488-7788). [6]',
    citation: [4, 6, 18],
    next: 'mal-disposition',
    summary: 'Prophylaxis failure does not exclude malaria — breakthrough infections occur with all prophylactic agents',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'mal-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Admission criteria:** [1][4][6]\n\n**ICU admission:**\n• Severe malaria (any WHO criterion)\n• Parasitemia >10%\n• Rapidly rising parasitemia\n• IV artesunate required\n\n**Floor admission:**\n• **All *P. falciparum* cases** — even if uncomplicated (risk of rapid deterioration) [3][4]\n• *P. knowlesi* (24-hour replication cycle — can progress rapidly) [14]\n• Pediatric <5 years with any species\n• Pregnancy\n• Significant comorbidities (immunosuppression, elderly, organ dysfunction)\n• Inability to tolerate oral medications\n• Unreliable for outpatient follow-up\n\n**Outpatient management** (rare, must meet ALL criteria): [4]\n• *P. vivax, ovale, or malariae* only (NOT falciparum or knowlesi)\n• Uncomplicated (no severe malaria criteria)\n• Parasitemia <2%\n• Able to tolerate oral medications\n• Reliable for close follow-up (smears day 3, 7)\n• No pregnancy, age >5 years, no comorbidities\n\nWhat is the disposition plan?',
    citation: [1, 3, 4, 6, 14],
    options: [
      {
        label: 'ICU Admission',
        description: 'Severe malaria, IV artesunate, parasitemia >10%',
        next: 'mal-dispo-icu',
        urgency: 'critical',
      },
      {
        label: 'Floor Admission',
        description: 'All P. falciparum, P. knowlesi, pregnancy, pediatric <5 years',
        next: 'mal-dispo-floor',
      },
      {
        label: 'Outpatient Management (Rare)',
        description: 'Uncomplicated vivax/ovale/malariae, reliable follow-up',
        next: 'mal-dispo-outpatient',
      },
    ],
    summary: 'Admit severe malaria to ICU. Uncomplicated: consider observation vs discharge with reliable follow-up',
  },

  {
    id: 'mal-dispo-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU admission for severe malaria.** [5][6]\n\n**Critical interventions:**\n• **IV artesunate** obtained via CDC IND protocol (call 770-488-7788 or 770-488-7100) [6]\n• Close hemodynamic monitoring\n• Glucose monitoring q4-6h (hypoglycemia common)\n• Repeat blood smears q12-24h until parasitemia <1% and declining\n• Fluid management (avoid overload — ARDS risk)\n• Blood transfusion if severe anemia (Hgb <7)\n• Treat complications (seizures, AKI, acidosis, shock)\n\n**Consult:**\n• Infectious disease\n• Critical care\n• Nephrology if AKI/dialysis needed\n• Hematology if severe hemolysis\n\n**Transition to oral therapy when:**\n• Patient can tolerate PO\n• Parasitemia <1% and declining\n• No severe malaria criteria\n• Complete 3-day course of oral ACT (artemether-lumefantrine or atovaquone-proguanil) after IV artesunate [5][6]\n\n**Post-discharge:**\n• CBC weekly × 4 weeks (monitor for post-artesunate delayed hemolysis) [8]\n• Outpatient ID follow-up\n• Blood smears day 7, 14, 28 to confirm clearance',
    recommendation: 'ICU admission for severe malaria. IV artesunate via CDC IND protocol. Close monitoring for complications. CBC weekly × 4 weeks post-discharge for delayed hemolysis surveillance.',
    confidence: 'definitive',
    citation: [5, 6, 8],
    summary: 'ICU for severe malaria: IV artesunate, exchange transfusion if parasitemia >10%, serial smears',
  },

  {
    id: 'mal-dispo-floor',
    type: 'result',
    module: 6,
    title: 'Floor Admission',
    body: '**Floor admission for close monitoring.** [4][6]\n\n**Indications:**\n• All *P. falciparum* cases (even if uncomplicated)\n• *P. knowlesi*\n• Pregnancy\n• Pediatric <5 years\n• Comorbidities\n\n**Monitoring:**\n• Vital signs q4-6h\n• Glucose q6-8h (or more frequently if symptomatic)\n• Repeat blood smears day 3 and day 7 (or until negative)\n• Daily CBC (monitor hemoglobin, platelets)\n• BMP daily (renal function)\n• Strict I/O if AKI or fluid overload risk\n\n**Watch for deterioration:**\n• Rising parasitemia\n• Altered mentation\n• Respiratory distress\n• Hypotension\n• Declining hemoglobin\n• Worsening renal function\n• → Upgrade to ICU if severe malaria criteria develop\n\n**Discharge criteria:**\n• Afebrile >24h\n• Parasitemia clearing (preferably <1% and declining)\n• Tolerating oral medications\n• No complications\n• Outpatient follow-up arranged\n\n**Discharge instructions:**\n• Complete full course of oral antimalarials\n• Return if fever recurs, difficulty breathing, confusion, dark urine\n• Follow-up smears day 7, 14, 28\n• For vivax/ovale: complete primaquine course (if G6PD normal)\n• If post-artesunate: CBC weekly × 4 weeks',
    recommendation: 'Floor admission for close observation. All P. falciparum requires admission due to risk of rapid progression. Monitor blood smears, glucose, CBC, renal function. Discharge when afebrile >24h and parasitemia clearing.',
    confidence: 'definitive',
    citation: [4, 6],
    summary: 'Floor admission for moderate cases: oral ACT, serial parasitemia, can convert to outpatient',
  },

  {
    id: 'mal-dispo-outpatient',
    type: 'result',
    module: 6,
    title: 'Outpatient Management (Rare)',
    body: '**Outpatient management is RARELY appropriate** and requires ALL of the following: [4]\n\n**Criteria:**\n• *P. vivax, ovale, or malariae* ONLY (NOT falciparum or knowlesi)\n• Uncomplicated (no WHO severe malaria criteria)\n• Parasitemia <2%\n• Able to tolerate oral medications\n• Reliable for close follow-up (smears day 3, 7)\n• No pregnancy, age >5 years, no comorbidities\n• Lives locally (not traveling far from hospital)\n\n**Discharge instructions:**\n• **Complete full course** of chloroquine (1000 mg, then 500 mg at 6, 24, 48h)\n• **Primaquine** (if vivax/ovale and G6PD normal): 30 mg base daily × 14 days starting after chloroquine [9]\n• **Return immediately if:**\n  - Fever worsens or does not improve within 48h\n  - Difficulty breathing, chest pain\n  - Confusion, severe headache, seizures\n  - Dark urine (hemolysis)\n  - Severe weakness, inability to eat/drink\n  - Vomiting preventing medication absorption\n\n**Mandatory follow-up:**\n• Blood smear **day 3** (parasitemia should be declining)\n• Blood smear **day 7** (should be negative — if positive → treatment failure)\n• Blood smear **day 28** (confirm sustained clearance)\n• If on primaquine: CBC at day 7 (monitor for hemolysis)\n\n**Infectious disease referral** for treatment failure or relapse.\n\n**Prophylaxis counseling** if returning to endemic area: atovaquone-proguanil, doxycycline, or mefloquine + insecticide-treated bed nets. [4]',
    recommendation: 'Outpatient management ONLY for uncomplicated vivax/ovale/malariae with reliable follow-up. Complete chloroquine + primaquine (if G6PD normal). MANDATORY blood smears day 3, 7, 28. Return precautions for fever, dyspnea, confusion, dark urine.',
    confidence: 'recommended',
    citation: [4, 9],
    summary: 'Outpatient only if uncomplicated, reliable follow-up, oral intake tolerated, parasitemia <2%',
  },

];

// =====================================================================
// MODULE LABELS
// =====================================================================

export const MALARIA_MODULE_LABELS = [
  'Initial Assessment',
  'Diagnostic Testing',
  'Severity Classification',
  'Treatment Selection',
  'Special Populations',
  'Disposition',
];

export const MALARIA_NODE_COUNT = 35;

// =====================================================================
// CRITICAL ACTIONS
// =====================================================================

export const MALARIA_CRITICAL_ACTIONS = [
  { text: 'STAT thick and thin blood smears - species ID and parasitemia % guide all treatment', nodeId: 'mal-diagnostics' },
  { text: 'Call CDC Malaria Hotline for severe cases - 770-488-7788 (24/7: 770-488-7100)', nodeId: 'mal-severe-treatment' },
  { text: 'IV artesunate is ONLY treatment for severe malaria - obtain via CDC IND protocol', nodeId: 'mal-severe-treatment' },
  { text: 'Parasitemia >10% = severe malaria - requires ICU admission and immediate IV artesunate', nodeId: 'mal-severity' },
  { text: 'G6PD testing REQUIRED before primaquine - hemolysis risk if deficient', nodeId: 'mal-primaquine' },
  { text: 'Species identification is critical - P. falciparum can kill in 24-48 hours', nodeId: 'mal-species' },
  { text: 'Monitor glucose q4-6h in severe cases - especially with quinine or pregnancy', nodeId: 'mal-complications' },
  { text: 'Repeat blood smears q12-24h - monitor treatment response', nodeId: 'mal-monitoring' },
  { text: 'Admit all P. falciparum cases - even if uncomplicated (can deteriorate rapidly)', nodeId: 'mal-disposition' },
  { text: 'ACT regimens only for treatment - never use artemisinin monotherapy (resistance risk)', nodeId: 'mal-uncomplicated-falciparum' },
];

// =====================================================================
// CITATIONS
// =====================================================================

export const MALARIA_CITATIONS: Citation[] = [
  {
    num: 1,
    text: 'Nadjm B, Behrens RH. Malaria: An Update for Physicians. Infect Dis Clin North Am. 2012;26(2):243-259.',
  },
  {
    num: 2,
    text: 'White NJ, Pukrittayakamee S, Hien TT, et al. Malaria. Lancet. 2014;383(9918):723-735.',
  },
  {
    num: 3,
    text: 'Trampuz A, Jereb M, Muzlovic I, Prabhu RM. Clinical Review: Severe Malaria. Crit Care. 2003;7(4):315-323.',
  },
  {
    num: 4,
    text: 'CDC. Malaria: Treatment (United States). Centers for Disease Control and Prevention. Updated 2024.',
  },
  {
    num: 5,
    text: 'WHO. Guidelines for the Treatment of Malaria. 3rd Edition. World Health Organization. 2023.',
  },
  {
    num: 6,
    text: 'CDC. Malaria Hotline and Treatment Information. CDC Malaria Branch. 770-488-7788 (M-F) / 770-488-7100 (24/7).',
  },
  {
    num: 7,
    text: 'Rosenthal PJ. Artesunate for the Treatment of Severe Falciparum Malaria. N Engl J Med. 2008;358(17):1829-1836.',
  },
  {
    num: 8,
    text: 'Rolling T, Schmiedel S, Wichmann D, et al. Post-Treatment Haemolysis in Severe Imported Malaria After Intravenous Artesunate: Case Report of Three Patients. Malar J. 2012;11:169.',
  },
  {
    num: 9,
    text: 'Hill DR, Baird JK, Parise ME, et al. Primaquine: Report from CDC Expert Meeting on Malaria Chemoprophylaxis I. Am J Trop Med Hyg. 2006;75(3):402-415.',
  },
  {
    num: 10,
    text: 'Artemether-Lumefantrine (Coartem) Prescribing Information. Novartis Pharmaceuticals. 2021.',
  },
  {
    num: 11,
    text: 'Atovaquone-Proguanil (Malarone) Prescribing Information. GlaxoSmithKline. 2020.',
  },
  {
    num: 12,
    text: 'Chloroquine Phosphate Prescribing Information. Sanofi-Aventis. 2019.',
  },
  {
    num: 13,
    text: 'Primaquine Prescribing Information. Sanofi-Aventis. 2022.',
  },
  {
    num: 14,
    text: 'Cox-Singh J, Davis TM, Lee KS, et al. Plasmodium knowlesi Malaria in Humans Is Widely Distributed and Potentially Life Threatening. Clin Infect Dis. 2008;46(2):165-171.',
  },
  {
    num: 15,
    text: 'Desai M, ter Kuile FO, Nosten F, et al. Epidemiology and Burden of Malaria in Pregnancy. Lancet Infect Dis. 2007;7(2):93-104.',
  },
  {
    num: 16,
    text: 'McGready R, Lee SJ, Wiladphaingern J, et al. Adverse Effects of Falciparum and Vivax Malaria and the Safety of Antimalarial Treatment in Early Pregnancy: A Population-Based Study. Lancet Infect Dis. 2012;12(5):388-396.',
  },
  {
    num: 17,
    text: 'Crawley J, Chu C, Mtove G, Nosten F. Malaria in Children. Lancet. 2010;375(9724):1468-1481.',
  },
  {
    num: 18,
    text: 'Chen LH, Wilson ME, Schlagenhauf P. Prevention of Malaria in Long-Term Travelers. JAMA. 2006;296(18):2234-2244.',
  },
];
