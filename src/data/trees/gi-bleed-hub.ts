// GI Bleed Hub — Hub Consult Pattern v2
// Chief Complaint Hub for undifferentiated GI bleeding (hematemesis, melena, hematochezia).
// Triage hub only — clinical content lives in deep-dive splits (upper-gi-bleed, lower-gi-bleed, etc.).
// R8: hub links INTO splits; splits never link back.

import type { DecisionNode } from '../../models/types.js';

export const GI_BLEED_HUB_NODES: DecisionNode[] = [
  // ===================================================================
  // Module 1 — Sick Check
  // ===================================================================
  {
    id: 'gib-start',
    type: 'info',
    module: 1,
    title: 'GI Bleed Hub — Sick Check First',
    body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Hemorrhagic shock / massive bleed** \u2014 shock index >1, ongoing hematemesis; activate MTP.\n2. **Variceal hemorrhage** \u2014 cirrhosis stigmata; octreotide + antibiotics + early endoscopy.\n3. **Aortoenteric fistula** \u2014 prior aortic graft + GI bleed = catastrophic until excluded.\n4. **Brisk upper bleed presenting as hematochezia** \u2014 10\u201315%, more shocky; place an NG/assess.\n5. **Anticoagulant/antiplatelet-driven bleed** \u2014 identify agent; reverse where indicated.\n\nWalk into the room. Before any source-finding, sort sick vs not-sick.\n\nOpen first:\n\n- [Hub Steps Summary](#/info/gib-steps)\n- [Hub Stop / Pitfalls](#/info/gib-stop)\n\n**Scan in 30 seconds:** [1, 2]\n\n- **General appearance** — pale, diaphoretic, end-of-bed ill, altered, vomiting blood at the door?\n- **Vitals trend** (not single snapshot) — tachycardia, hypotension, narrow pulse pressure, orthostatic drop, hypoxia\n- **Shock index** = HR / SBP — >1.0 = ongoing blood loss, >1.4 = massive hemorrhage posture\n- **Mental status** — confused / drowsy = hypoperfusion or hepatic encephalopathy\n- **Skin / stigmata** — jaundice, spider angiomata, caput, palmar erythema (cirrhosis), purpura (coag), Telangiectasias (HHT)\n- **Abdomen at the door** — distended (ascites), tender (perforation/ischemia), pulsatile mass (AAA aortoenteric fistula)\n- **Rectal exam early** — confirms melena vs hematochezia vs occult vs nothing\n\n**If ANY of:** hypotension, ongoing hematemesis, melena + tachycardia, altered, lactate >4, end-of-life appearance — **start resus parallel to workup.** Bay 1, IV × 2 large-bore (16 g+), monitor, type and cross 4-6 units, lactate, [Massive Transfusion Protocol](#/tree/massive-transfusion) ready. Permissive hypotension target SBP 90-100 until source controlled.\n\n**Four-question screen** (drives Module 2):\n\n1. **Hematemesis or coffee-grounds?** → upper source until proven otherwise\n2. **Melena (black, tarry, foul)?** → upper source ~90% of the time (transit >14 h)\n3. **Hematochezia (bright red blood per rectum)?** → lower source usually, BUT brisk upper bleed can present as hematochezia in 10-15% (more shocky)\n4. **Cirrhosis, varices, alcohol use, recent NSAID/anticoag/antiplatelet?** → variceal vs PUD vs anticoag-driven changes management\n\n**Continue → Time-Critical Exclusions**',
    citation: [1, 2],
    summary: 'Look, count, feel — then commit. Shock index >1 = ongoing loss. Rectal exam now.',
    safetyLevel: 'critical',
    next: 'gib-exclusions',
  },

  // ===================================================================
  // Module 2 — Time-Critical Exclusions (10 branches)
  // ===================================================================
  {
    id: 'gib-exclusions',
    type: 'question',
    module: 2,
    title: 'Time-Critical Exclusions — Pick the Source Pattern',
    body: 'Pick the branch that fits best. If two fit, pick the more dangerous one. None of these are mutually exclusive — patient can have variceal + coag + AAA simultaneously.',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Hematemesis / coffee-grounds / known varices / cirrhosis',
        description: 'Upper GI bleed — variceal vs non-variceal pathway',
        next: 'gib-exc-ugib',
        urgency: 'urgent',
      },
      {
        label: 'Melena (black tarry stool) without hematemesis',
        description: 'Upper source ~90% of the time — treat as UGIB until proven otherwise',
        next: 'gib-exc-melena',
        urgency: 'urgent',
      },
      {
        label: 'Bright red blood per rectum (BRBPR) / hematochezia',
        description: 'Lower GI bleed pathway — but rule out brisk upper bleed if shocky',
        next: 'gib-exc-lgib',
      },
      {
        label: 'On anticoagulant or antiplatelet + bleeding',
        description: 'Anticoag reversal pathway in parallel with source workup',
        next: 'gib-exc-anticoag',
        urgency: 'urgent',
      },
      {
        label: 'Massive bleeding / shock / shock index >1.4',
        description: 'Massive transfusion protocol — 1:1:1 ratio, TXA, source control',
        next: 'gib-exc-massive',
        urgency: 'urgent',
      },
      {
        label: 'Age ≥50 + back/abdominal pain + GI bleed + history of AAA repair',
        description: 'Aorto-enteric fistula — herald bleed precedes exsanguination',
        next: 'gib-exc-aef',
        urgency: 'urgent',
      },
      {
        label: 'Bleeding + abdominal pain out of proportion / AF / vasculopath',
        description: 'Mesenteric ischemia mimicker — CTA before colonoscopy',
        next: 'gib-exc-mesenteric',
        urgency: 'urgent',
      },
      {
        label: 'IBD flare-pattern bleeding (known UC/Crohn or first presentation)',
        description: 'IBD-flare pathway with concurrent bleeding workup',
        next: 'gib-exc-ibd',
      },
      {
        label: 'Pediatric (any age) with GI bleed',
        description: 'Peds GI bleed has a distinct differential — intussusception, Meckel, milk-protein colitis, NEC',
        next: 'gib-exc-peds',
      },
      {
        label: 'None of the above — stable, undifferentiated GI bleed',
        description: 'Initial bundle + reassess, then route by pattern',
        next: 'gib-rescue',
      },
    ],
  },

  // ===================================================================
  // Module 2 branches — link OUT to deep-dives (R8)
  // ===================================================================
  {
    id: 'gib-exc-ugib',
    type: 'info',
    module: 2,
    title: 'Upper GI Bleed Pathway',
    body: 'Open [Upper GI Bleed](#/tree/upper-gi-bleed) consult. Glasgow-Blatchford for triage, variceal vs non-variceal cascade, endoscopy timing.\n\n**Recognize fast:** [4]\n\n- Hematemesis (red blood = active variceal or arterial; coffee-grounds = older blood, less brisk)\n- Cirrhotic stigmata: jaundice, spider angiomata, caput, ascites, palmar erythema\n- Risk factors: NSAID, ASA, anticoag, prior PUD, prior varices, H. pylori, EtOH binge\n- Melena alone (no vomiting) is still upper ~90%\n\n**Next 5 minutes:** [4, 5]\n\n- CBC, CMP, coags, type and cross 2-6 units (more if shock)\n- BUN/Cr ratio >30 favors upper source (digested protein bolus)\n- 2 large-bore IVs, NPO, PPI bolus + drip (pantoprazole 80 mg IV then 8 mg/h)\n- **If cirrhotic or suspected variceal:** add octreotide 50 mcg IV bolus then 50 mcg/h infusion + ceftriaxone 1 g IV (SBP prophylaxis, mortality benefit)\n- Glasgow-Blatchford ≤1 in stable patients → outpatient pathway feasible per institutional protocol\n- NG lavage NOT routinely needed (negative does not exclude UGIB)\n- Massive hematemesis → call GI for emergent endoscopy + IR backup\n\n**Disposition:** ICU if shock, ongoing bleeding, severe coag, cirrhosis with high-risk lesion. Floor if stable post-endoscopy with Forrest IIc/III or low-risk variceal. Discharge only after endoscopy if Glasgow-Blatchford ≤1 + clean lesion + reliable follow-up.',
    citation: [4, 5],
    summary: 'Open [Upper GI Bleed](#/tree/upper-gi-bleed) — Glasgow-Blatchford triage, PPI, octreotide + ceftriaxone if variceal, endoscopy timing.',
    safetyLevel: 'critical',
  },
  {
    id: 'gib-exc-melena',
    type: 'info',
    module: 2,
    title: 'Melena — Upper Until Proven Otherwise',
    body: 'Melena (black, tarry, malodorous stool) is upper GI bleed ~90% of the time. Treat as UGIB workup. Right-sided colonic bleed CAN cause melena if transit >14 h, but UGIB is the safer working diagnosis.\n\nOpen [Upper GI Bleed](#/tree/upper-gi-bleed) consult.\n\n**BUN/Cr ratio >30** further supports upper source (urea from digested hemoglobin protein).\n\n**Do NOT call it lower without negative upper endoscopy.** Premature commitment to lower source delays the right scope and the right meds (PPI, octreotide if variceal).\n\n**If endoscopy is unrevealing:** push enteroscopy, capsule, or CTA depending on activity. Small bowel sources (AVM, NSAID enteropathy, tumor) get missed without dedicated workup.',
    citation: [4, 5],
    summary: 'Open [Upper GI Bleed](#/tree/upper-gi-bleed) consult — melena is upper ~90% of the time. BUN/Cr >30 confirms.',
    safetyLevel: 'critical',
  },
  {
    id: 'gib-exc-lgib',
    type: 'info',
    module: 2,
    title: 'Lower GI Bleed Pathway',
    body: 'Open [Lower GI Bleed](#/tree/lower-gi-bleed) consult. Oakland score for triage, CTA vs colonoscopy timing, embolization decision.\n\n**Red flag — brisk upper bleed presenting as hematochezia:** 10-15% of hematochezia in shocky patients is upper source. Check the four-question screen before committing to lower pathway:\n\n1. Hemodynamically unstable + hematochezia? → suspect brisk upper, place NG and/or send for urgent EGD before colonoscopy\n2. Coffee-ground emesis or hematemesis ever during this episode? → upper\n3. Known varices, cirrhosis, recent NSAID/ASA/anticoag? → upper more likely\n4. BUN/Cr ratio >30? → upper\n\n**Next 5 minutes:** [6]\n\n- CBC, CMP, coags, type and cross 2-4 units\n- 2 large-bore IVs, NPO\n- Oakland score (age, sex, prior LGIB, DRE findings, HR, SBP, Hgb) — ≤8 = outpatient candidate, >8 = admit\n- Massive hematochezia + shock → CTA first, then IR embolization or urgent colonoscopy depending on findings\n- Stable → colonoscopy within 24 h with bowel prep\n\n**Disposition:** ICU if shock or active bleeding. Floor if stable for colonoscopy. Outpatient only if Oakland ≤8 + reliable follow-up.',
    citation: [6, 7],
    summary: 'Open [Lower GI Bleed](#/tree/lower-gi-bleed) — Oakland score, but rule out brisk upper first if shocky.',
    safetyLevel: 'critical',
  },
  {
    id: 'gib-exc-anticoag',
    type: 'info',
    module: 2,
    title: 'Anticoag/Antiplatelet + GI Bleed',
    body: 'Open [Anticoagulation Reversal](#/tree/anticoag-reversal) consult in parallel with source workup. Reversal is independent of source identification — bleeding patient + therapeutic anticoagulant = reverse.\n\n**Identify the agent first** — reversal differs by class:\n\n- **Warfarin** → 4-factor PCC (Kcentra) by INR/weight + vitamin K 10 mg IV\n- **Dabigatran** → idarucizumab (Praxbind) 5 g IV\n- **Apixaban / rivaroxaban** → andexanet alfa OR 4-factor PCC 50 U/kg (off-label, often used due to cost/availability)\n- **Edoxaban** → 4-factor PCC 50 U/kg\n- **DAPT (ASA + P2Y12)** → platelet transfusion is controversial (PATCH trial: harm in ICH; less data in GI bleed). DDAVP can be considered for ASA-induced platelet dysfunction in life-threatening bleeding.\n- **Heparin/LMWH** → protamine (full reversal for UFH; partial for LMWH)\n\n**Restart timing:** balance ongoing bleed risk vs thrombotic risk (mechanical valve, recent VTE, AF + high CHA₂DS₂-VASc). GI bleed alone is rarely sufficient to permanently discontinue — restart in 1-7 days post hemostasis depending on indication.\n\n**Parallel:** transfuse to Hgb 7 (8 in cardiac), platelets >50k for active bleed, fibrinogen >150 for ongoing hemorrhage.',
    citation: [8, 9],
    summary: 'Open [Anticoag Reversal](#/tree/anticoag-reversal) — reverse the agent, then work the source. Reversal is independent.',
    safetyLevel: 'critical',
  },
  {
    id: 'gib-exc-massive',
    type: 'info',
    module: 2,
    title: 'Massive GI Hemorrhage',
    body: 'Activate [Massive Transfusion Protocol](#/tree/massive-transfusion). Shock index >1.4, ongoing exsanguination, or anticipated need for >10 units in 24 h.\n\n**Targets:** [10]\n\n- 1:1:1 RBC:plasma:platelets ratio (start with the first balanced cooler)\n- TXA 1 g IV over 10 min (within 3 h of bleed onset) + 1 g over 8 h — strongest data in trauma, reasonable extrapolation to non-trauma massive hemorrhage per HALT-IT trial caveats (HALT-IT did NOT show benefit in GI bleed specifically, but TXA remains low-harm)\n- Calcium replacement (citrate chelation from transfused blood causes hypocalcemia — give CaCl 1 g IV every 4 units)\n- Permissive hypotension SBP 90-100 mmHg until source controlled (do not over-resuscitate before hemostasis)\n- Avoid hypothermia (lethal triad)\n- Avoid acidosis (lactic acid + dilutional)\n- Empirical IR / endoscopy / surgery activation — do not wait for stability\n\n**Source-specific:**\n\n- Variceal: octreotide + ceftriaxone + emergent EGD with banding or balloon tamponade (Blakemore/Minnesota tube) as bridge\n- Non-variceal upper: pantoprazole drip + EGD with clip/cautery/epinephrine\n- Lower: CTA + IR embolization OR urgent colonoscopy\n- Aorto-enteric fistula: emergent vascular surgery + CT angiography\n\n**HALT-IT note:** the 12,009-patient HALT-IT trial (2020 Lancet) showed TXA did not reduce death from bleeding in upper or lower GI bleed and INCREASED venous thromboembolic events. Use TXA selectively in true massive hemorrhage with hemodynamic instability; do NOT give TXA to every GI bleeder.',
    citation: [10, 11],
    summary: 'Activate [MTP](#/tree/massive-transfusion). 1:1:1 ratio. TXA selectively (HALT-IT cautions in GI bleed). Permissive hypotension until source control.',
    safetyLevel: 'critical',
  },
  {
    id: 'gib-exc-aef',
    type: 'info',
    module: 2,
    title: 'Aorto-Enteric Fistula',
    body: '**Don\'t miss this.** History of [AAA](#/tree/aortic-aneurysm) repair (open or endovascular) + GI bleed = aorto-enteric fistula until proven otherwise. The "herald bleed" precedes exsanguination by minutes-to-days.\n\n**Suspect when:** [12]\n\n- Prior aortic graft (any type, any era — even 20+ years old)\n- GI bleed of any volume, especially recurrent or intermittent\n- Back pain, abdominal pain, sepsis (graft infection co-exists)\n- Pulsatile abdominal mass + bleeding\n\n**Workup:**\n\n- CT angiography with arterial + delayed phases (most sensitive imaging)\n- EGD only if CT non-diagnostic and patient stable — usually shows duodenal D3/D4 involvement\n- **Emergent vascular surgery consult — do not wait for confirmation**\n- Type and cross 6-10 units, MTP-ready\n\n**Mortality:** 30-100% even with surgery. Time is the dominant variable. Do not anchor on UGIB pathway — order the CTA early, call vascular early.\n\n**Same considerations apply to primary aorto-enteric fistula** (no prior surgery) in patients with untreated large AAA + GI bleed. Rare but identical workup.',
    citation: [12, 13],
    summary: 'Prior aortic graft + GI bleed = aorto-enteric fistula. CTA + vascular surgery NOW. Herald bleed precedes exsanguination.',
    safetyLevel: 'critical',
  },
  {
    id: 'gib-exc-mesenteric',
    type: 'info',
    module: 2,
    title: 'Mesenteric Ischemia + GI Bleed',
    body: 'Open [Mesenteric Ischemia](#/tree/mesenteric-ischemia) consult. Pain out of proportion + AF / vasculopath / postprandial pain + GI bleed = mesenteric ischemia until proven otherwise.\n\n**Why this matters:** [14]\n\n- Colonoscopy in active mesenteric ischemia can perforate ischemic bowel\n- Resus alone delays the lethal diagnosis\n- Lactate may be normal early (5-15% have normal lactate at presentation in arterial mesenteric ischemia)\n- D-dimer is sensitive but non-specific\n\n**Workup:**\n\n- CTA mesenteric with arterial + portal venous phases — gold standard, do this BEFORE colonoscopy\n- Empirical heparin if AF or arterial thromboembolism suspected (and no contraindication)\n- Vascular surgery + IR consult\n- NPO, broad-spectrum antibiotics (bowel ischemia → bacterial translocation)\n\n**Patterns:**\n\n- Acute arterial (embolic) — sudden severe pain, AF, prior embolism\n- Acute arterial (thrombotic) — gradual onset, atherosclerosis, postprandial pain history\n- Mesenteric venous thrombosis — younger, hypercoagulable, subacute\n- NOMI (non-occlusive) — shock, vasopressors, cocaine, ergotism\n\nGI bleed can be the lead symptom in any of these. Don\'t let the bleed anchor you to a colonoscopy-first pathway.',
    citation: [14, 15],
    summary: 'Open [Mesenteric Ischemia](#/tree/mesenteric-ischemia) — CTA before colonoscopy. Pain out of proportion + bleed.',
    safetyLevel: 'critical',
  },
  {
    id: 'gib-exc-ibd',
    type: 'info',
    module: 2,
    title: 'IBD Flare with Bleeding',
    body: 'Open [IBD Flare](#/tree/ibd-flare) consult. UC and Crohn flares can present with significant lower GI bleed; severe UC flare is its own emergency.\n\n**Recognize severe flare (Truelove-Witts):** [16]\n\n- ≥6 bloody stools/day\n- AND any of: temp >37.8°C, HR >90, Hgb <10.5 g/dL, ESR >30\n\n**Workup:**\n\n- CBC, CMP, ESR, CRP, lactate, blood cultures if febrile\n- Stool studies: C. diff PCR + bacterial pathogens + ova/parasites (C. diff coinfection up to 5% in severe flare)\n- KUB or CT to assess for toxic megacolon (transverse colon >6 cm), perforation\n- Gastroenterology + colorectal surgery consult for severe flare\n\n**Treatment in ED:**\n\n- IV methylprednisolone 60 mg IV once daily (or hydrocortisone 100 mg IV q6h) — equivalent regimens per ACG severe UC guideline; methylprednisolone is dosed as a 60 mg/day total, NOT q6h\n- IV fluids, transfuse if Hgb <7 (8 in cardiac)\n- Empirical antibiotics if febrile or perforation suspected (ceftriaxone + metronidazole)\n- Hold all anti-motility agents (loperamide, diphenoxylate, anticholinergics) — can precipitate toxic megacolon\n- DVT prophylaxis (IBD flare carries high VTE risk even with active bleeding — controversial but recommended in stable bleeding per ACG)\n\n**Refractory:** infliximab or cyclosporine rescue within 3-5 days; colectomy if no response.',
    citation: [16, 17],
    summary: 'Open [IBD Flare](#/tree/ibd-flare) consult. Truelove-Witts for severity. Hold anti-motility. C. diff coinfection always.',
    safetyLevel: 'critical',
  },
  {
    id: 'gib-exc-peds',
    type: 'info',
    module: 2,
    title: 'Pediatric GI Bleed',
    body: 'Pediatric GI bleed has its own differential. Adult deep-dives don\'t apply directly.\n\n**Age-based differential:** [18]\n\n- **Neonate (0-30 d):** swallowed maternal blood (NPO + Apt test), NEC ([Neonatal Resus](#/tree/neonatal-resus)), milk-protein allergy, vitamin K deficiency, malrotation/volvulus\n- **Infant (1-12 mo):** [intussusception](#/tree/intussusception), milk-protein colitis, Meckel diverticulum, anal fissure\n- **Toddler (1-5 y):** [intussusception](#/tree/intussusception) (rare beyond 3 y), Meckel diverticulum (painless brisk LGIB), juvenile polyps, infectious colitis (HUS — [Peds STEC/HUS](#/tree/peds-stec-hus))\n- **School-age + adolescent:** IBD, polyps, infectious colitis, AVM, Mallory-Weiss, peptic ulcer (uncommon)\n\n**Workup pearls:**\n\n- Currant-jelly stool + colicky pain + lethargy → intussusception (US first, then air enema)\n- Painless brisk LGIB in toddler → Meckel scan (technetium-99m pertechnetate)\n- Bloody diarrhea after E. coli exposure → STEC, watch for HUS (Hgb, plt, Cr, LDH, haptoglobin)\n- Newborn with bloody emesis → Apt test (alkali denaturation distinguishes fetal Hgb from swallowed maternal)\n- Vitamin K-deficient bleeding in unimmunized newborn or post-discharge home-birth\n\n**Resuscitation:** weight-based fluids (20 mL/kg LR), transfuse 10 mL/kg PRBC, age-specific shock thresholds (early tachycardia, late hypotension in peds).\n\nGI consult + peds surgery early for any persistent or massive peds GI bleed.',
    citation: [18, 19],
    summary: 'Peds GI bleed = different differential. Age-driven. [Intussusception](#/tree/intussusception), Meckel, NEC, milk-protein, [Peds STEC/HUS](#/tree/peds-stec-hus).',
    safetyLevel: 'critical',
  },

  // ===================================================================
  // Module 3 — Initial Bundle + Reassess
  // ===================================================================
  {
    id: 'gib-rescue',
    type: 'info',
    module: 3,
    title: 'Initial Bundle (Stable, Undifferentiated)',
    body: '**Bundle for the stable, undifferentiated GI bleeder.** Use while waiting for the source pattern to declare.\n\n**Resus:**\n\n- 2 large-bore IVs (16 g+), NPO\n- Type and cross 2-4 units\n- Initial fluid bolus 500-1000 mL LR (avoid over-resuscitation; dilutes coag factors)\n- Permissive hypotension (SBP 90-100) until hemostasis\n\n**Labs:** [4, 6]\n\n- CBC (baseline Hgb may UNDER-estimate active bleed before hemodilution)\n- BMP/CMP (BUN/Cr ratio >30 suggests upper)\n- INR/PTT, fibrinogen\n- Lactate (perfusion + ischemia)\n- Type and cross 2-4 units\n- LFTs (cirrhotic vs not)\n- Lipase (if abdominal pain)\n- Troponin + ECG (demand ischemia in anemic patients, esp. age >50)\n\n**Meds while waiting:**\n\n- Pantoprazole 80 mg IV bolus + 8 mg/h drip (any presumed UGIB)\n- Octreotide 50 mcg IV bolus + 50 mcg/h drip + ceftriaxone 1 g IV — if any concern for variceal bleed\n- Hold NSAIDs, antiplatelets, anticoagulants pending reversal decision\n- Antiemetic (ondansetron 4-8 mg IV) — vomiting can worsen variceal bleed\n\n**Risk stratification scores:**\n\n- Glasgow-Blatchford (UGIB) — ≤1 → outpatient consideration\n- Oakland (LGIB) — ≤8 → outpatient consideration\n- Rockall (UGIB post-endoscopy)\n- Shock index = HR/SBP — >1 = ongoing loss\n\n**Continue → Reassess at 30-60 minutes**',
    citation: [4, 6],
    summary: 'Bundle = IVs + NPO + T&C + PPI + octreotide if cirrhotic + risk score. Permissive hypotension until hemostasis.',
    safetyLevel: 'critical',
    next: 'gib-rescue-reassess',
  },
  {
    id: 'gib-rescue-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess at 30-60 Minutes',
    body: 'Reassess vitals, mental status, ongoing bleed activity (NG aspirate, repeat DRE, stool log), labs returning.\n\n**Pattern changes the plan:**',
    options: [
      {
        label: 'Ongoing bleed / dropping vitals / Hgb falling',
        description: 'Escalate — MTP, source-specific call (GI / IR / surgery)',
        next: 'gib-exc-massive',
        urgency: 'urgent',
      },
      {
        label: 'New hematemesis or melena emerged',
        description: 'Upper pathway',
        next: 'gib-exc-ugib',
      },
      {
        label: 'New BRBPR / hematochezia emerged',
        description: 'Lower pathway (rule out brisk upper if shocky)',
        next: 'gib-exc-lgib',
      },
      {
        label: 'Stable + transfused + clear source pattern',
        description: 'Continue to Imaging / Source Control',
        next: 'gib-imaging',
      },
      {
        label: 'Stable + no source pattern + bleed stopped',
        description: 'Continue to Disposition (admit obs vs floor)',
        next: 'gib-dispo',
      },
    ],
  },

  // ===================================================================
  // Module 4 — Imaging / Source Control
  // ===================================================================
  {
    id: 'gib-imaging',
    type: 'info',
    module: 4,
    title: 'Imaging + Source Control Strategy',
    body: '**Match imaging to phenotype — don\'t shotgun.**\n\n**Upper source suspected:**\n\n- Endoscopy (EGD) — within 24 h for stable, 12 h for cirrhotic, ASAP for shock or active bleed [4]\n- CT angiography if endoscopy non-diagnostic or unable\n\n**Lower source suspected, stable:**\n\n- Colonoscopy within 24 h with bowel prep [6]\n- CT angiography if active bleed and unable to prep\n\n**Lower source suspected, unstable / massive bleed:**\n\n- CTA first (~85-95% sens for active bleed)\n- IR embolization if active extravasation localized\n- Urgent colonoscopy if CTA negative but bleeding ongoing\n- Surgery if both fail (rare)\n\n**Aorto-enteric fistula suspected:**\n\n- CTA arterial + delayed phases\n- Vascular surgery NOW\n\n**Mesenteric ischemia suspected:**\n\n- CTA arterial + portal venous phases\n- Vascular surgery + IR\n\n**Capsule endoscopy / push enteroscopy:**\n\n- For obscure GI bleed (negative EGD + colonoscopy)\n- Inpatient or outpatient depending on stability\n\n**Tagged RBC scan / nuclear scintigraphy:**\n\n- Slow intermittent bleeding (>0.1 mL/min)\n- Less useful in acute setting; can localize roughly\n\n**Continue → Disposition**',
    citation: [4, 5, 6, 7],
    summary: 'Phenotype drives imaging. EGD for upper, colonoscopy for lower stable, CTA for unstable lower, CTA + vascular for AEF/mesenteric.',
    safetyLevel: 'critical',
    next: 'gib-dispo',
  },

  // ===================================================================
  // Module 5 — Disposition
  // ===================================================================
  {
    id: 'gib-dispo',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Match disposition to stability, source pattern, scope availability, and follow-up.',
    options: [
      {
        label: 'ICU — shock, ongoing bleed, MTP, cirrhotic with high-risk lesion',
        description: 'Continuous monitoring, transfusion, urgent endoscopy/IR/surgery',
        next: 'gib-dispo-icu',
        urgency: 'urgent',
      },
      {
        label: 'Floor admit — stable post-endoscopy, low-risk lesion, observation',
        description: 'Glasgow-Blatchford >1 OR Oakland >8 OR transfused',
        next: 'gib-dispo-floor',
      },
      {
        label: 'Obs / ED-obs — stable, low-risk score, awaiting outpatient endoscopy',
        description: 'Glasgow-Blatchford ≤1 with reliable follow-up; serial Hgb + DRE',
        next: 'gib-dispo-obs',
      },
      {
        label: 'Discharge — outpatient colonoscopy plan, low Oakland, reliable',
        description: 'Hemodynamically stable + Oakland ≤8 + GI follow-up arranged + return precautions',
        next: 'gib-dispo-discharge',
      },
    ],
  },
  {
    id: 'gib-dispo-icu',
    type: 'info',
    module: 5,
    title: 'ICU Admit',
    body: '**ICU criteria:**\n\n- Hemodynamic instability (SBP <90, shock index >1)\n- Ongoing active bleed\n- Massive transfusion activation\n- Cirrhotic with variceal bleed (high mortality)\n- Forrest Ia/Ib lesion post-endoscopy\n- Aorto-enteric fistula\n- Mesenteric ischemia\n\n**ICU bundle:**\n\n- Arterial line, central line if pressors needed\n- Continuous monitoring, serial Hgb q4-6h\n- Standing PPI drip + octreotide if variceal\n- Ceftriaxone 1 g IV daily for cirrhotic (SBP prophylaxis x 7 days)\n- Coordinated GI + IR + surgery on call\n- DVT prophylaxis decision: mechanical (SCDs) safe; pharmacologic held until 24-48 h hemostatic\n\n[Massive Transfusion Protocol](#/tree/massive-transfusion) if criteria still met.',
    citation: [4, 6, 10],
    summary: 'ICU for shock, ongoing bleed, MTP, variceal cirrhotic, AEF, mesenteric. Bundle includes PPI drip + octreotide + ceftriaxone if variceal.',
    safetyLevel: 'critical',
  },
  {
    id: 'gib-dispo-floor',
    type: 'info',
    module: 5,
    title: 'Floor Admit',
    body: '**Floor criteria:**\n\n- Hemodynamically stable\n- Bleeding source identified and low-risk (Forrest IIc/III, post-banding, post-cautery)\n- Transfused 1-3 units, stable post-transfusion\n- Oakland >8 OR Glasgow-Blatchford >1\n- Comorbidities requiring inpatient monitoring (CHF, CKD, severe anemia)\n\n**Floor bundle:**\n\n- Telemetry, serial Hgb q12h initially\n- PPI BID PO + step-down from drip if stable >24 h\n- Diet advancement per GI (clears → full liquids → soft → regular)\n- Anticoag restart decision per primary team (typically 1-7 days post hemostasis)\n- GI follow-up in 2-4 weeks (H. pylori testing, repeat scope per pathology)',
    citation: [4, 6],
    summary: 'Floor: stable post-endoscopy with low-risk lesion. Telemetry, PPI BID, diet advance, anticoag restart per team.',
  },
  {
    id: 'gib-dispo-obs',
    type: 'info',
    module: 5,
    title: 'Observation / ED-Obs',
    body: '**Obs criteria:**\n\n- Hemodynamically stable from arrival\n- No active bleeding\n- Glasgow-Blatchford ≤1 OR Oakland ≤8 in non-anticoagulated patient\n- Reliable patient + caregiver + follow-up\n- Concern for outpatient endoscopy compliance OR need for serial Hgb 12-24 h\n\n**Obs bundle:**\n\n- Serial vitals q4h, serial Hgb at 6-12 h\n- PPI PO BID\n- Discharge criteria: stable Hgb, tolerating PO, ambulating, no recurrent bleed evidence on serial DRE\n- Outpatient GI consult scheduled within 1 week before discharge from obs\n\n**Convert to admit if:** any Hgb drop >1 g/dL, vital changes, recurrent visible bleed, inability to tolerate PO.',
    citation: [4, 6],
    summary: 'Obs: stable + low score + reliable patient. Serial Hgb. Discharge from obs with GI in 1 week.',
  },
  {
    id: 'gib-dispo-discharge',
    type: 'info',
    module: 5,
    title: 'Discharge (Low-Risk)',
    body: '**Discharge criteria (rare in acute presentation; usually post-obs):**\n\n- Hemodynamically stable throughout ED stay\n- Glasgow-Blatchford ≤1 (UGIB) OR Oakland ≤8 (LGIB)\n- No active bleeding, stable Hgb\n- Not on anticoagulant OR reversal completed + bleeding stopped\n- Reliable patient with phone access, caregiver, transportation\n- GI follow-up scheduled within 1 week with outpatient endoscopy\n- Tolerating PO\n- Pre-discharge DRE no active bleed\n\n**Discharge meds:**\n\n- PPI PO BID for 4-8 weeks (suspected PUD)\n- H. pylori testing/treatment plan documented if UGIB suspected\n- Iron supplementation if Hgb <11\n- Anticoagulant restart plan documented with primary team\n\n**Written return precautions (mandatory):**\n\n- Hematemesis or coffee-ground vomiting\n- Black tarry stool\n- Bright red blood per rectum >small streak\n- Lightheadedness, syncope, weakness\n- Chest pain, dyspnea\n- Tachycardia, fever\n\nReturn precautions sheet signed. Follow-up appointment confirmed before walking out — not "will call."',
    citation: [4, 6],
    summary: 'Discharge only for low Glasgow-Blatchford/Oakland + stable + GI follow-up arranged + WRITTEN return precautions.',
  },
];

export const GI_BLEED_HUB_MODULE_LABELS = [
  'Sick Check',
  'Time-Critical Exclusions',
  'Initial Bundle + Reassess',
  'Imaging + Source Control',
  'Disposition',
];

export const GI_BLEED_HUB_CITATIONS = [
  { num: 1, text: 'Wuerth BA, Rockey DC. Changing Epidemiology of Upper Gastrointestinal Hemorrhage in the Last Decade: A Nationwide Analysis. Dig Dis Sci. 2018;63(5):1286-1293.' },
  { num: 2, text: 'Strate LL, Gralnek IM. ACG Clinical Guideline: Management of Patients With Acute Lower Gastrointestinal Bleeding. Am J Gastroenterol. 2016;111(4):459-474.' },
  { num: 3, text: 'Laine L, Barkun AN, Saltzman JR, et al. ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding. Am J Gastroenterol. 2021;116(5):899-917.' },
  { num: 4, text: 'Gralnek IM, Stanley AJ, Morris AJ, et al. ESGE Guideline: Diagnosis and management of nonvariceal upper gastrointestinal hemorrhage. Endoscopy. 2021;53(3):300-332.' },
  { num: 5, text: 'Garcia-Tsao G, Abraldes JG, Berzigotti A, Bosch J. Portal hypertensive bleeding in cirrhosis: AASLD practice guidance. Hepatology. 2017;65(1):310-335.' },
  { num: 6, text: 'Oakland K, Chadwick G, East JE, et al. Diagnosis and management of acute lower gastrointestinal bleeding: BSG guidelines. Gut. 2019;68(5):776-789.' },
  { num: 7, text: 'Sengupta N, Feuerstein JD, Patwardhan VR, et al. The Risks of Thromboembolism vs. Recurrent Gastrointestinal Bleeding After Interruption of Systemic Anticoagulation in Hospitalized Inpatients With Gastrointestinal Bleeding. Am J Gastroenterol. 2015;110(2):328-335.' },
  { num: 8, text: 'Tomaselli GF, Mahaffey KW, Cuker A, et al. 2020 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants. J Am Coll Cardiol. 2020;76(5):594-622.' },
  { num: 9, text: 'Connolly SJ, Crowther M, Eikelboom JW, et al. Full Study Report of Andexanet Alfa for Bleeding Associated with Factor Xa Inhibitors (ANNEXA-4). N Engl J Med. 2019;380(14):1326-1335.' },
  { num: 10, text: 'HALT-IT Trial Collaborators. Effects of a high-dose 24-h infusion of tranexamic acid on death and thromboembolic events in patients with acute gastrointestinal bleeding (HALT-IT): an international randomised, double-blind, placebo-controlled trial. Lancet. 2020;395(10241):1927-1936.' },
  { num: 11, text: 'Cannon JW, Khan MA, Raja AS, et al. Damage control resuscitation in patients with severe traumatic hemorrhage: a practice management guideline from the EAST. J Trauma Acute Care Surg. 2017;82(3):605-617.' },
  { num: 12, text: 'Saers SJ, Scheltinga MR. Primary aortoenteric fistula. Br J Surg. 2005;92(2):143-152.' },
  { num: 13, text: 'Bergqvist D, Björck M. Secondary arterioenteric fistulation - a systematic literature analysis. Eur J Vasc Endovasc Surg. 2009;37(1):31-42.' },
  { num: 14, text: 'Bala M, Kashuk J, Moore EE, et al. Acute mesenteric ischemia: guidelines of the World Society of Emergency Surgery. World J Emerg Surg. 2017;12:38.' },
  { num: 15, text: 'Acosta S, Björck M. Modern treatment of acute mesenteric ischaemia. Br J Surg. 2014;101(1):e100-e108.' },
  { num: 16, text: 'Rubin DT, Ananthakrishnan AN, Siegel CA, et al. ACG Clinical Guideline: Ulcerative Colitis in Adults. Am J Gastroenterol. 2019;114(3):384-413.' },
  { num: 17, text: 'Truelove SC, Witts LJ. Cortisone in ulcerative colitis; final report on a therapeutic trial. Br Med J. 1955;2(4947):1041-1048.' },
  { num: 18, text: 'Romano C, Oliva S, Martellossi S, et al. Pediatric gastrointestinal bleeding: Perspectives from the Italian Society of Pediatric Gastroenterology. World J Gastroenterol. 2017;23(8):1328-1337.' },
  { num: 19, text: 'Pai AK, Fox VL. Gastrointestinal Bleeding and Management. Pediatr Clin North Am. 2017;64(3):543-561.' },
];

export const GI_BLEED_HUB_CRITICAL_ACTIONS = [
  { text: 'Sick check + vitals trend + shock index BEFORE any source workup — shock index >1 = ongoing loss', nodeId: 'gib-start' },
  { text: 'Rectal exam early — confirms melena vs hematochezia vs occult vs nothing', nodeId: 'gib-start' },
  { text: 'Two large-bore IVs (16 g+), type and cross 2-6 units depending on stability', nodeId: 'gib-rescue' },
  { text: 'Permissive hypotension SBP 90-100 until source controlled — don\'t over-resuscitate before hemostasis', nodeId: 'gib-rescue' },
  { text: 'Melena is upper ~90% of the time — don\'t prematurely commit to lower pathway', nodeId: 'gib-exc-melena' },
  { text: 'Hematochezia + shock — rule out brisk upper bleed before colonoscopy (10-15% are upper)', nodeId: 'gib-exc-lgib' },
  { text: 'Prior aortic graft + GI bleed = aorto-enteric fistula until proven otherwise — CTA + vascular surgery NOW', nodeId: 'gib-exc-aef' },
  { text: 'Anticoagulant reversal is independent of source identification — reverse the agent while working source', nodeId: 'gib-exc-anticoag' },
  { text: 'Cirrhotic / variceal suspicion → octreotide + ceftriaxone 1 g IV (mortality benefit, SBP prophylaxis)', nodeId: 'gib-exc-ugib' },
  { text: 'HALT-IT: TXA did NOT reduce GI bleed mortality and INCREASED VTE — use selectively, not reflexively', nodeId: 'gib-exc-massive' },
  { text: 'BUN/Cr ratio >30 supports upper source (digested protein bolus)', nodeId: 'gib-exclusions' },
  { text: 'Hold anti-motility agents in IBD flare — can precipitate toxic megacolon', nodeId: 'gib-exc-ibd' },
  { text: 'Pediatric GI bleed has its own age-based differential — adult algorithms don\'t apply directly', nodeId: 'gib-exc-peds' },
  { text: 'Glasgow-Blatchford ≤1 (UGIB) and Oakland ≤8 (LGIB) define low-risk outpatient pathway candidates', nodeId: 'gib-dispo' },
  { text: 'Hub is a triage map, not a treatment playbook — commit to a phenotype then leave the hub for the deep-dive', nodeId: 'gib-start' },
];

export const GI_BLEED_HUB_NODE_COUNT = GI_BLEED_HUB_NODES.length;
