// MedKitt — Acute Anorectal / Bright-Red Rectal Bleeding Hub (Rule-In / Rule-Out Engine, type: 'hub')
//
// 5-Module rule-in/rule-out skeleton (matches dyspnea-hub / chest-pain-hub / abdominal-pain-hub
// template codified in CLAUDE.md "Chief-Complaint Hub Template"):
//   1. Sick Check
//   2. Rule In / Rule Out — per-differential chains: entry -> gate(s) -> verdict
//      (excluded verdicts loop back to arb-triage; confirmed verdicts link out to deep-dive)
//   3. Initial bundle / Reassess
//   4. Imaging / Workup
//   5. Disposition
//
// EBM-only citations (guidelines / primary literature). The decision instrument (Oakland
// score for lower-GI-bleed discharge suitability) lives in the bottom toolbar and is named
// in the nodes.
export const ANORECTAL_BLEEDING_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check
    // ============================================================
    {
        id: 'arb-start',
        type: 'info',
        module: 1,
        title: 'Rectal Bleeding — Sick Check First',
        body: '**\u26A0\uFE0F 4 DO NOT MISS:**\n1. **Brisk lower-GI hemorrhage / hemodynamic compromise** \u2014 large-volume BRBPR or clots, tachycardia, hypotension, syncope.\n2. **Upper-GI source masquerading as maroon / BRBPR** \u2014 a brisk UGIB can present per rectum; urea:creatinine ratio and NG/rectal exam help.\n3. **Anticoagulated / coagulopathic bleeder** \u2014 warfarin, DOAC, antiplatelet, liver disease, or a bleeding disorder turns a minor source into a major bleed.\n4. **Colorectal malignancy / IBD** \u2014 do not anchor on "just hemorrhoids" in age \u226550, weight loss, altered bowel habits, or bloody diarrhea.\n\n**First 60 seconds:**\n- **General appearance** \u2014 pale, diaphoretic, end-of-bed ill vs comfortable and well?\n- **Vitals trend** \u2014 tachycardia, hypotension, orthostatic change, narrow pulse pressure.\n- **Quantify the bleed** \u2014 streaks on tissue vs clots in the bowl vs continuous per-rectum blood. Ask about melena (points upper).\n- **The 4 screening questions:** (1) How much blood, and is it still happening? (2) On any blood thinner or bleeding disorder? (3) Any lightheadedness, syncope, or chest pain? (4) Vomited blood, or black/tarry stool (upper source)?\n\n**If ANY of:** hypotension, tachycardia, orthostasis, ongoing large-volume bleeding, syncope, or a Hb that is dropping \u2014 **start resuscitation in parallel with the workup.** Two large-bore IVs, monitor, type and cross, CBC/coags, hold antithrombotics, GI/surgery on notice. Do not funnel an unstable bleeder down a "hemorrhoids" pathway.\n\n**If stable + minor bleeding:** go to Rule In / Rule Out.',
        citation: [1, 2],
        next: 'arb-triage',
        summary: 'Gestalt sick check + vitals/orthostatics + quantify bleed + anticoagulation screen. If unstable: resuscitate in parallel.',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Rule In / Rule Out
    // ============================================================
    {
        id: 'arb-triage',
        type: 'question',
        module: 2,
        title: 'Rule In / Rule Out — Localize the Source',
        body: 'Work the dangerous sources to an explicit verdict, one at a time. Each differential walks its gate (hemodynamics, instrument, or exam) to **excluded**, **test further**, or **rule in + treat**. Excluded loops back here for the next differential.',
        options: [
            { label: 'Brisk lower-GI hemorrhage / shock', description: 'Large-volume BRBPR or clots + hemodynamic compromise', next: 'arb-lgib-entry', urgency: 'critical' },
            { label: 'Upper-GI source masquerading', description: 'Maroon stool, melena, hematemesis, elevated urea:creatinine', next: 'arb-ugib-entry', urgency: 'critical' },
            { label: 'Anticoagulated / coagulopathic bleeder', description: 'Warfarin / DOAC / antiplatelet / liver disease / hemophilia', next: 'arb-anticoag-entry', urgency: 'urgent' },
            { label: 'Malignancy / IBD flare', description: 'Age \u226550, weight loss, altered bowel habits, bloody diarrhea', next: 'arb-malig-entry', urgency: 'urgent' },
            { label: 'Infectious / ischemic colitis', description: 'Dysentery, ischemic colitis, bloody diarrhea + pain', next: 'arb-colitis-entry', urgency: 'urgent' },
            { label: 'Benign anorectal (hemorrhoids / fissure / prolapse)', description: 'BRB on tissue, pain with defecation, well-appearing', next: 'arb-benign-entry', urgency: 'routine' },
            { label: 'None fit \u2014 undifferentiated, stable', description: 'Initial bundle + reassess', next: 'arb-rescue' },
        ],
        citation: [1, 2, 3],
        summary: 'Pick the most acute source; walk its gate to an explicit verdict. Excluded loops back.',
        safetyLevel: 'critical',
    },
    // -------------------- BRISK LOWER-GI HEMORRHAGE --------------------
    {
        id: 'arb-lgib-entry',
        type: 'question',
        module: 2,
        title: 'Brisk Lower-GI Hemorrhage — Hemodynamic Gate',
        body: 'Large-volume hematochezia with hemodynamic instability is the emergency. **~10-15% of severe "lower" bleeds are actually a brisk upper source** \u2014 keep UGIB on the list. Hemodynamics, not the color of the blood, drive the pathway.',
        options: [
            { label: 'Unstable / ongoing large-volume bleeding / Hb dropping', description: 'Resuscitate + urgent GI', next: 'arb-lgib-verdict', urgency: 'critical' },
            { label: 'Bleeding stopped, stable vitals, minor volume', description: 'Not a brisk LGIB \u2014 risk-stratify + move on', next: 'arb-lgib-excluded', urgency: 'routine' },
        ],
        citation: [3],
        summary: 'Hemodynamics drive it. Unstable/ongoing = resuscitate + urgent GI; stopped + stable = risk-stratify.',
        safetyLevel: 'critical',
    },
    {
        id: 'arb-lgib-verdict',
        type: 'result',
        module: 2,
        title: 'Brisk Lower-GI Hemorrhage — Resuscitate + Treat',
        body: 'Open [Lower GI Bleed](#/tree/lower-gi-bleed) (or the broader [GI Bleed Hub](#/tree/gi-bleed-hub)).\n\n**Next 5 minutes:**\n- Two large-bore IVs, monitor, **type and CROSS**; transfuse to a **restrictive threshold (Hb ~7 g/dL**, higher if active cardiac ischemia).\n- CBC, coags, fibrinogen, lactate; **reverse anticoagulation / correct coagulopathy** per severity.\n- **Rule out an upper source in severe bleeds** \u2014 an NG lavage or an urgent upper endoscopy; a markedly elevated urea:creatinine ratio points upper.\n- GI consult for **colonoscopy** (after resuscitation \u00B1 rapid purge); **CT angiography** if too brisk/unstable for scope, then IR embolization.\n- Massive transfusion protocol if exsanguinating; surgery if uncontrolled.',
        recommendation: 'Two large-bore IVs, type and cross, restrictive transfusion (~7), reverse anticoagulation, exclude upper source, GI/CTA/IR.',
        citation: [3],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'arb-lgib-excluded',
        type: 'result',
        module: 2,
        title: 'Brisk LGIB — Excluded (Stable, Self-Limited)',
        body: 'Bleeding has stopped, vitals are stable, and volume was minor \u2014 this is not an active brisk hemorrhage right now. **Risk-stratify with the Oakland score** (toolbar): a score **\u226410** identifies low-risk patients who may be considered for safe outpatient management. Any recurrence, hemodynamic change, or dropping Hb re-opens the emergency pathway.\n\nReturn to the hub for the next differential.',
        recommendation: 'Self-limited + stable; use Oakland score (\u226410 = low risk) to guide discharge vs admission. Re-escalate if it recurs.',
        citation: [3],
        next: 'arb-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- UPPER-GI MASQUERADE --------------------
    {
        id: 'arb-ugib-entry',
        type: 'question',
        module: 2,
        title: 'Upper-GI Masquerade — Source-Localization Gate',
        body: 'A brisk upper-GI bleed can present as maroon stool or even BRBPR. Clues that the source is **above the ligament of Treitz**: hematemesis or coffee-ground emesis, melena, a **BUN:creatinine ratio >30**, known varices / peptic ulcer / NSAID use, or hemodynamic instability out of proportion to visible rectal blood.',
        options: [
            { label: 'Hematemesis / melena / BUN:Cr >30 / varices risk', description: 'Treat as UGIB until excluded', next: 'arb-ugib-verdict', urgency: 'critical' },
            { label: 'No upper features, normal BUN:Cr, isolated BRBPR', description: 'Upper source unlikely \u2014 move on', next: 'arb-ugib-excluded', urgency: 'routine' },
        ],
        citation: [4],
        summary: 'Melena/hematemesis/BUN:Cr >30/varices = treat as UGIB. Isolated BRBPR + normal ratio = unlikely.',
        safetyLevel: 'critical',
    },
    {
        id: 'arb-ugib-verdict',
        type: 'result',
        module: 2,
        title: 'Upper-GI Source — Resuscitate + Treat',
        body: 'Open [Upper GI Bleed](#/tree/upper-gi-bleed).\n\n**Next 5 minutes:**\n- Two large-bore IVs, monitor, **type and cross**; restrictive transfusion (Hb ~7).\n- **IV PPI**; if cirrhotic / suspected varices add **octreotide + ceftriaxone** (SBP prophylaxis).\n- Reverse anticoagulation / correct coagulopathy.\n- GI for **upper endoscopy within 24 h** (urgently if unstable / variceal).\n- A negative NG lavage does NOT rule out a post-pyloric source \u2014 clinical judgment and endoscopy decide.',
        recommendation: 'Type and cross, restrictive transfusion, IV PPI \u00B1 octreotide/ceftriaxone if cirrhotic, urgent upper endoscopy.',
        citation: [4],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'arb-ugib-excluded',
        type: 'result',
        module: 2,
        title: 'Upper-GI Source — Unlikely',
        body: 'Isolated bright-red blood per rectum with no melena, no hematemesis, a normal BUN:creatinine ratio, and stable vitals makes a brisk upper source unlikely as the driver. **In any severe or unexplained bleed, keep the upper source in mind** \u2014 the ratio is a clue, not a rule-out.\n\nReturn to the hub for the next differential.',
        recommendation: 'Upper source unlikely with isolated BRBPR + normal ratio; reconsider if the bleed is severe or unexplained.',
        citation: [4],
        next: 'arb-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- ANTICOAGULATED / COAGULOPATHIC --------------------
    {
        id: 'arb-anticoag-entry',
        type: 'question',
        module: 2,
        title: 'Anticoagulated / Coagulopathic Bleeder — Agent Gate',
        body: 'Identify the agent and the coagulopathy \u2014 it changes both the risk and the reversal. Warfarin (INR), DOAC (factor Xa or thrombin inhibitor), antiplatelet, liver disease (synthetic failure), or an inherited bleeding disorder (hemophilia, VWD) each has a specific correction.',
        options: [
            { label: 'On anticoagulant/antiplatelet with significant or ongoing bleeding', description: 'Reverse / correct per agent', next: 'arb-anticoag-verdict', urgency: 'urgent' },
            { label: 'Known bleeding disorder (hemophilia / VWD)', description: 'Factor replacement pathway', next: 'arb-anticoag-verdict', urgency: 'urgent' },
            { label: 'Not anticoagulated, normal coags, minor bleed', description: 'Coagulopathy not the driver \u2014 move on', next: 'arb-anticoag-excluded', urgency: 'routine' },
        ],
        citation: [5],
        summary: 'Identify agent/disorder. Significant bleed on a thinner or a factor deficiency = reverse/replace; otherwise move on.',
        safetyLevel: 'warning',
    },
    {
        id: 'arb-anticoag-verdict',
        type: 'result',
        module: 2,
        title: 'Anticoagulated / Coagulopathic — Reverse + Treat',
        body: 'Open [Anticoagulation Reversal](#/tree/anticoag-reversal) (inherited factor deficiency \u2192 [Hemophilia](#/tree/hemophilia)).\n\n**Match reversal to the agent:**\n- **Warfarin** \u2014 **4-factor PCC** (weight/INR-dosed) + IV vitamin K 10 mg; FFP only if PCC unavailable.\n- **Dabigatran** \u2014 **idarucizumab**.\n- **Apixaban / rivaroxaban** \u2014 **andexanet alfa** where available, otherwise 4-factor PCC.\n- **Antiplatelet** \u2014 platelet transfusion is generally NOT beneficial for GI bleed (contrast with intracranial); hold the agent.\n- **Liver disease** \u2014 vitamin K, correct fibrinogen (cryoprecipitate), targeted product; the INR overestimates bleeding risk.\n- **Hemophilia / VWD** \u2014 factor VIII/IX concentrate or desmopressin/VWF per type; hematology now.\n\nResuscitate in parallel (type and cross, restrictive transfusion) and address the anatomic source once corrected.',
        recommendation: 'Agent-specific reversal: PCC+vit K (warfarin), idarucizumab (dabigatran), andexanet/PCC (Xa), factor replacement (hemophilia). Then treat the source.',
        citation: [5],
        safetyLevel: 'warning',
        confidence: 'definitive',
    },
    {
        id: 'arb-anticoag-excluded',
        type: 'result',
        module: 2,
        title: 'Coagulopathy — Not the Driver',
        body: 'No anticoagulant, normal coags, and a minor bleed makes a coagulopathic driver unlikely. **Still send a CBC and coags** in any patient with meaningful bleeding \u2014 an unsuspected thrombocytopenia or liver disease can surface here.\n\nReturn to the hub for the next differential.',
        recommendation: 'Coagulopathy unlikely; still check CBC + coags in meaningful bleeding.',
        citation: [5],
        next: 'arb-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- MALIGNANCY / IBD --------------------
    {
        id: 'arb-malig-entry',
        type: 'question',
        module: 2,
        title: 'Malignancy / IBD — Alarm-Feature Gate',
        body: 'Do not anchor on hemorrhoids when alarm features are present. **Red flags:** age \u226550 with new rectal bleeding, unintentional weight loss, iron-deficiency anemia, change in bowel caliber/habits, a palpable rectal mass, a family history of colorectal cancer, or bloody diarrhea with systemic features (IBD flare).',
        options: [
            { label: 'Alarm features present (age \u226550, weight loss, anemia, mass, bloody diarrhea + systemic)', description: 'Work up + specialist referral', next: 'arb-malig-verdict', urgency: 'urgent' },
            { label: 'No alarm features, young, well, isolated BRB on tissue', description: 'Malignancy/IBD unlikely \u2014 move on', next: 'arb-malig-excluded', urgency: 'routine' },
        ],
        citation: [6],
        summary: 'Alarm features (age \u226550, weight loss, anemia, mass, systemic bloody diarrhea) = work up. None = unlikely.',
        safetyLevel: 'warning',
    },
    {
        id: 'arb-malig-verdict',
        type: 'result',
        module: 2,
        title: 'Malignancy / IBD — Work Up + Treat',
        body: '**IBD flare** (known or new): open [IBD Flare](#/tree/ibd-flare) \u2014 CBC, CRP, stool studies to exclude infection, IV fluids; steroids per GI for a severe flare; screen for toxic megacolon (distension + systemic toxicity + colonic dilation on plain film \u2192 surgical emergency).\n\n**Suspected colorectal malignancy** (mass, iron-deficiency anemia, weight loss, age \u226550): **do NOT clear as hemorrhoids** \u2014 arrange **colonoscopy** and GI/surgical referral; treat any bleeding-related anemia; consider [Oncological Emergencies](#/tree/oncological-emergencies) for the actively bleeding or obstructing tumor.\n\n**Universal rule:** new rectal bleeding in age \u226550 (or younger with alarm features) needs a documented plan for **colonoscopy** even if an obvious benign source is found.',
        recommendation: 'IBD flare \u2192 IBD Flare consult + exclude infection/toxic megacolon. Alarm features \u2192 colonoscopy referral; never clear age \u226550 bleeding as hemorrhoids alone.',
        citation: [6],
        safetyLevel: 'warning',
        confidence: 'definitive',
    },
    {
        id: 'arb-malig-excluded',
        type: 'result',
        module: 2,
        title: 'Malignancy / IBD — Low Probability',
        body: 'A young, well patient with no alarm features and clearly benign-appearing bleeding (bright red on tissue only) is low-risk for malignancy or IBD today. **This does not remove the need for age-appropriate colorectal screening**, and any new alarm feature (weight loss, anemia, altered habits) warrants a return and colonoscopy.\n\nReturn to the hub for the next differential.',
        recommendation: 'Low probability without alarm features; still ensure age-appropriate screening and return precautions for new alarm features.',
        citation: [6],
        next: 'arb-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- INFECTIOUS / ISCHEMIC COLITIS --------------------
    {
        id: 'arb-colitis-entry',
        type: 'question',
        module: 2,
        title: 'Infectious / Ischemic Colitis — Pattern Gate',
        body: '**Bloody diarrhea + abdominal pain** points at colitis. **Infectious (dysentery):** Shigella, Campylobacter, EHEC (watch for HUS \u2014 avoid antibiotics if EHEC suspected), C. difficile, Entamoeba; travel/exposure history matters. **Ischemic colitis:** older / vascular / hypotensive event, sudden LLQ pain then bloody diarrhea, "thumbprinting" on imaging.',
        options: [
            { label: 'Bloody diarrhea + pain (infectious or ischemic pattern)', description: 'Stool workup / imaging + supportive care', next: 'arb-colitis-verdict', urgency: 'urgent' },
            { label: 'No diarrhea, no pain, formed stool with BRB', description: 'Colitis unlikely \u2014 move on', next: 'arb-colitis-excluded', urgency: 'routine' },
        ],
        citation: [7],
        summary: 'Bloody diarrhea + pain = infectious vs ischemic colitis workup. Formed stool + BRB, no pain = unlikely.',
        safetyLevel: 'warning',
    },
    {
        id: 'arb-colitis-verdict',
        type: 'result',
        module: 2,
        title: 'Colitis — Work Up + Treat',
        body: 'Open [Diarrhea](#/tree/diarrhea) for the infectious pathway.\n\n**Infectious colitis:** stool culture + PCR panel, **C. difficile** toxin/PCR, ova & parasites if travel; rehydrate. **Avoid empiric antibiotics if EHEC (Shiga-toxin) is suspected** \u2014 they raise the HUS risk; check CBC/smear/renal function for HUS. Treat C. difficile per severity (oral vancomycin / fidaxomicin).\n\n**Ischemic colitis:** usually a clinical + CT diagnosis (segmental wall thickening, "thumbprinting"); supportive care, bowel rest, IV fluids, and antibiotics for moderate-severe disease; **surgery for gangrene, perforation, or peritonitis**. Correct the low-flow driver (hypotension, arrhythmia, vasopressors).',
        recommendation: 'Infectious \u2192 stool studies + rehydration; avoid abx if EHEC (HUS risk). Ischemic \u2192 CT + supportive care; surgery for gangrene/perforation.',
        citation: [7],
        safetyLevel: 'warning',
        confidence: 'definitive',
    },
    {
        id: 'arb-colitis-excluded',
        type: 'result',
        module: 2,
        title: 'Colitis — Unlikely',
        body: 'Formed stool with bright-red blood and no diarrhea or abdominal pain makes an infectious or ischemic colitis unlikely as the driver. If diarrhea, fever, or pain develops, come back and work the colitis pathway.\n\nReturn to the hub for the next differential.',
        recommendation: 'Colitis unlikely without diarrhea/pain; reassess if diarrhea, fever, or pain develops.',
        citation: [7],
        next: 'arb-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- BENIGN ANORECTAL --------------------
    {
        id: 'arb-benign-entry',
        type: 'question',
        module: 2,
        title: 'Benign Anorectal — Exam Gate',
        body: 'The commonest source of BRBPR is benign anorectal disease, but it is a **diagnosis of exclusion in anyone with alarm features or age \u226550**. Inspect and perform a digital rectal exam (\u00B1 anoscopy): **hemorrhoids** (painless bright-red blood coating stool / on tissue), **anal fissure** (severe pain with defecation + a posterior-midline tear), **rectal prolapse** (protruding mucosa).',
        options: [
            { label: 'Prolapse present', description: 'Reduce + refer', next: 'arb-benign-verdict', urgency: 'urgent' },
            { label: 'Hemorrhoids / fissure, benign exam, no alarm features', description: 'Conservative management + follow-up', next: 'arb-benign-excluded', urgency: 'routine' },
        ],
        citation: [8],
        summary: 'Inspect + DRE \u00B1 anoscopy. Prolapse = reduce/refer; hemorrhoids/fissure with benign exam + no alarms = conservative.',
        safetyLevel: 'warning',
    },
    {
        id: 'arb-benign-verdict',
        type: 'result',
        module: 2,
        title: 'Rectal Prolapse — Reduce + Refer',
        body: 'Open [Rectal Prolapse Reduction](#/tree/rectal-prolapse-reduction).\n\n- **Reduce** the prolapse promptly (manual pressure \u00B1 topical sugar to reduce edema) to prevent incarceration / strangulation; analgesia and procedural sedation if needed.\n- Assess viability \u2014 a **non-reducible, dusky, or strangulated prolapse is a surgical emergency**.\n- Arrange colorectal surgery follow-up; screen for the underlying cause (chronic straining, pelvic-floor dysfunction) and treat constipation \u2192 [Constipation](#/tree/constipation).',
        recommendation: 'Reduce early to prevent strangulation; surgical emergency if non-reducible/ischemic; colorectal referral + treat constipation.',
        citation: [8],
        safetyLevel: 'warning',
        confidence: 'definitive',
    },
    {
        id: 'arb-benign-excluded',
        type: 'result',
        module: 2,
        title: 'Benign Anorectal — Conservative Management',
        body: 'Hemorrhoids or an anal fissure in a well patient with a benign exam and **no alarm features**: reassure and treat conservatively \u2014 high-fiber diet, adequate fluids, stool softeners, sitz baths, topical agents (and for a chronic fissure, topical nifedipine or nitroglycerin); manage the underlying constipation \u2192 [Constipation](#/tree/constipation).\n\n**The safety net:** benign anorectal disease is a diagnosis of exclusion. **New rectal bleeding in age \u226550, or any alarm feature, still needs a colonoscopy plan** even when hemorrhoids are visible \u2014 the two can coexist with a cancer.\n\nReturn to the hub if another differential remains open.',
        recommendation: 'Conservative care (fiber, softeners, sitz baths, topicals) + treat constipation; still arrange colonoscopy for age \u226550 or any alarm feature.',
        citation: [8],
        next: 'arb-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // ============================================================
    // Module 3 — Initial Bundle / Reassess
    // ============================================================
    {
        id: 'arb-rescue',
        type: 'info',
        module: 3,
        title: 'Initial Bundle — Rectal Bleeding',
        body: 'No emergent source ruled in; stable minor bleeding. Standard ED bundle while labs cook:\n\n- **IV access** (two large-bore if any volume concern), monitor, orthostatic vitals.\n- **Labs:** CBC (baseline + trend Hb), **type and screen** (cross if significant), coags/INR, BUN + creatinine (**BUN:Cr >30 hints upper source**), CMP, lactate if any instability; consider stool studies if diarrhea.\n- **Hold antithrombotics** pending assessment; correct coagulopathy if bleeding is significant.\n- **Rectal exam \u00B1 anoscopy** to document the source and exclude a mass.\n- **Fluids** for any orthostasis; transfuse to a **restrictive threshold (~7 g/dL)** if indicated.\n- **Risk-stratify** confirmed lower-GI bleeds with the **Oakland score** (toolbar): \u226410 identifies low-risk patients potentially suitable for outpatient management.\n\n**Reassess** for ongoing bleeding, Hb trend, and hemodynamic change.',
        citation: [1, 3],
        next: 'arb-reassess',
        summary: 'IV + CBC/type-and-screen/coags/BUN:Cr + hold antithrombotics + DRE/anoscopy + Oakland score. Reassess Hb + hemodynamics.',
        safetyLevel: 'warning',
    },
    {
        id: 'arb-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess — Bleeding + Hemodynamics',
        body: 'Re-examine: is bleeding ongoing? Hb trend? Vitals / orthostatics? Oakland score? Source documented?',
        options: [
            { label: 'Bleeding stopped + stable + low-risk (Oakland \u226410) + reliable', description: 'Discharge pathway', next: 'arb-disposition' },
            { label: 'Equivocal \u2014 needs endoscopy / imaging / observation', description: 'Imaging / workup decision', next: 'arb-imaging', urgency: 'urgent' },
            { label: 'Ongoing bleeding / Hb dropping / hemodynamic change', description: 'STOP \u2014 return to Rule In / Rule Out, resuscitate', next: 'arb-triage', urgency: 'critical' },
            { label: 'Specific source confirmed', description: 'Leave the hub \u2014 work that deep-dive consult', next: 'arb-disposition' },
        ],
        citation: [3],
        summary: 'Stopped + stable + low-risk = discharge; equivocal = image/scope; ongoing/dropping Hb = STOP and resuscitate.',
    },
    // ============================================================
    // Module 4 — Imaging / Workup
    // ============================================================
    {
        id: 'arb-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging / Workup Cheat-Sheet',
        body: 'Match the study to the phenotype:\n\n**Colonoscopy** \u2014 the primary diagnostic + therapeutic tool for lower-GI bleeding; after resuscitation \u00B1 a rapid bowel purge. Also the mandatory follow-up study for new bleeding in age \u226550 or any alarm feature (malignancy exclusion).\n\n**CT angiography (CTA)** \u2014 for **brisk, ongoing** bleeding too unstable for prep or scope; localizes active extravasation (needs ~0.3-0.5 mL/min bleeding) and routes to **IR embolization**.\n\n**Upper endoscopy** \u2014 when an upper source is suspected (melena, hematemesis, BUN:Cr >30, hemodynamic instability out of proportion).\n\n**Tagged-RBC scintigraphy** \u2014 detects slower intermittent bleeding (~0.1 mL/min) when CTA is negative but bleeding continues.\n\n**Anoscopy / rigid proctoscopy** \u2014 bedside, to confirm a benign anorectal source and exclude a low rectal mass.\n\n**Do not send an unstable, actively bleeding patient to a prolonged prep** \u2014 resuscitate first, CTA/IR if too brisk for scope.',
        citation: [3],
        next: 'arb-disposition',
        summary: 'Colonoscopy = primary tool; CTA/IR for brisk unstable bleeds; upper endoscopy if upper suspected; anoscopy for benign source. Never prep an unstable patient.',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'arb-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Defer to the deep-dive consult\u2019s admit criteria once a source is committed. The framework below applies to undifferentiated / benign-appearing bleeding.',
        options: [
            { label: 'Admit \u2014 ongoing bleed, high-risk (Oakland >10), unstable, needs endoscopy/IR, significant comorbidity', description: 'Admit per the deep-dive consult\u2019s criteria', next: 'arb-dispo-admit', urgency: 'urgent' },
            { label: 'Observe \u2014 partial response, awaiting Hb trend / prep / endoscopy', description: 'ED observation + serial Hb', next: 'arb-dispo-observe' },
            { label: 'Discharge \u2014 self-limited, stable, low-risk (Oakland \u226410), reliable', description: 'Standard discharge bundle', next: 'arb-dispo-discharge' },
        ],
        citation: [3],
        summary: 'Admit high-risk/ongoing/unstable; observe if equivocal; discharge low-risk self-limited with follow-up colonoscopy.',
    },
    {
        id: 'arb-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit',
        body: 'Admit for: ongoing or recurrent hemorrhage, hemodynamic instability, a **high Oakland score (>10)**, significant anemia or a dropping Hb, need for urgent endoscopy or IR embolization, anticoagulation with a significant bleed, or major comorbidity.\n\n**Service:** GI / Medicine for most managed bleeds; **ICU** for hemodynamic instability, massive transfusion, or ongoing brisk bleeding; **Surgery / IR** for uncontrolled hemorrhage or a strangulated prolapse; **Colorectal surgery / Oncology** for an obstructing or bleeding malignancy.\n\n**Handoff:** onset + volume + character of bleeding, hemodynamic trend, Hb trend + transfusions given, coagulation status + any reversal given (drug + time), source (if localized), antithrombotic status, imaging/endoscopy performed + findings, comorbidities, allergies.',
        recommendation: 'Admit per deep-dive criteria; ICU for instability/massive transfusion; IR/surgery for uncontrolled bleed; standard handoff.',
        citation: [3],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'arb-dispo-observe',
        type: 'result',
        module: 5,
        title: 'Observe — Partial Response or Pending Workup',
        body: 'ED observation when: bleeding has slowed but not clearly stopped, awaiting a repeat Hb, awaiting prep/endoscopy, or an intermediate Oakland score with social/safety barriers.\n\n**Protocol:** serial vitals + orthostatics; **repeat Hb at 4-6 h** (and sooner if any instability); watch for recurrent bleeding; continue fluids; keep antithrombotics held pending the plan.\n\n**Escalate** (admit / IR / endoscopy) for recurrent bleeding, a falling Hb, or hemodynamic change. **Discharge** with strict precautions and arranged follow-up if bleeding is clearly stopped, Hb is stable, and risk is low.',
        recommendation: 'Obs + serial vitals + repeat Hb at 4-6 h; escalate if recurrent bleed or falling Hb; discharge when stable + low-risk.',
        citation: [3],
        confidence: 'recommended',
    },
    {
        id: 'arb-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge — Universal Checklist',
        body: 'Before discharge: (1) bleeding self-limited / clearly stopped, (2) vitals normal incl **no orthostasis**, (3) Hb stable / reassuring, (4) **low-risk Oakland score (\u226410)** for a lower-GI bleed, (5) a **benign source documented** (or a clear plan to find one), (6) **reliable follow-up**, (7) **outpatient colonoscopy arranged** for new bleeding in age \u226550 or any alarm feature, (8) **written return precautions**.\n\n**Return precautions:** large-volume or recurrent bleeding, black/tarry stools, lightheadedness / fainting, chest pain / palpitations, weakness, abdominal pain, or a fever \u2014 return immediately.\n\n**Do NOT discharge if:** ongoing or high-volume bleeding, orthostasis, a dropping or significantly low Hb, a high Oakland score, an undocumented source in a high-risk patient, anticoagulation with a significant bleed, unreliable follow-up, or an alarm feature without a colonoscopy plan. Counsel: "Bright-red blood is usually a benign source, but new bleeding after 50 \u2014 or with weight loss or anemia \u2014 needs a scope to be sure, even if we found hemorrhoids today."',
        recommendation: 'Discharge only if self-limited, no orthostasis, Hb stable, Oakland \u226410, source documented, colonoscopy arranged for age \u226550/alarm features, written precautions.',
        citation: [3],
        confidence: 'definitive',
    },
];
export const ANORECTAL_BLEEDING_HUB_CRITICAL_ACTIONS = [
    { text: 'Sick check FIRST \u2014 quantify the bleed, orthostatic vitals, anticoagulation screen. Resuscitate in parallel if unstable/ongoing.', nodeId: 'arb-start' },
    { text: 'Large-volume hematochezia + instability \u2192 two large-bore IVs, type and cross, restrictive transfusion, exclude an upper source.', nodeId: 'arb-lgib-entry' },
    { text: 'Melena / hematemesis / BUN:Cr >30 \u2192 treat as upper-GI bleed (IV PPI \u00B1 octreotide/ceftriaxone if cirrhotic, urgent endoscopy).', nodeId: 'arb-ugib-entry' },
    { text: 'New rectal bleeding age \u226550 or any alarm feature \u2192 never clear as hemorrhoids alone; arrange colonoscopy.', nodeId: 'arb-malig-entry' },
];
export const ANORECTAL_BLEEDING_HUB_CITATIONS = [
    { num: 1, text: 'Sabry AO, Sood T. Rectal Bleeding. StatPearls. Treasure Island (FL): StatPearls Publishing; 2023.' },
    { num: 2, text: 'Wilkins T, Baird C, Pearson AN, Schade RR. Diverticular bleeding and lower gastrointestinal hemorrhage. Am Fam Physician. 2009;80(9):977-983.' },
    { num: 3, text: 'Sengupta N, Feuerstein JD, Jairath V, et al. Management of Patients With Acute Lower Gastrointestinal Bleeding: An Updated ACG Guideline. Am J Gastroenterol. 2023;118(2):208-231.' },
    { num: 4, text: 'Laine L, Barkun AN, Saltzman JR, Martel M, Leontiadis GI. ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding. Am J Gastroenterol. 2021;116(5):899-917.' },
    { num: 5, text: 'Tomaselli GF, Mahaffey KW, Cuker A, et al. 2020 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants. J Am Coll Cardiol. 2020;76(5):594-622.' },
    { num: 6, text: 'Rex DK, Boland CR, Dominitz JA, et al. Colorectal Cancer Screening: Recommendations for Physicians and Patients from the U.S. Multi-Society Task Force. Am J Gastroenterol. 2017;112(7):1016-1030.' },
    { num: 7, text: 'Shane AL, Mody RK, Crump JA, et al. 2017 Infectious Diseases Society of America Clinical Practice Guidelines for the Diagnosis and Management of Infectious Diarrhea. Clin Infect Dis. 2017;65(12):e45-e80.' },
    { num: 8, text: 'Davis BR, Lee-Kong SA, Migaly J, Feingold DL, Steele SR. The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Management of Hemorrhoids. Dis Colon Rectum. 2018;61(3):284-292.' },
    { num: 9, text: 'Oakland K, Chadwick G, East JE, et al. Diagnosis and management of acute lower gastrointestinal bleeding: guidelines from the British Society of Gastroenterology. Gut. 2019;68(5):776-789.' },
];
export const ANORECTAL_BLEEDING_HUB_NODE_COUNT = ANORECTAL_BLEEDING_HUB_NODES.length;
export const ANORECTAL_BLEEDING_HUB_MODULE_LABELS = [
    'Sick Check',
    'Rule In / Rule Out',
    'Rescue / Reassess',
    'Imaging',
    'Disposition',
];
