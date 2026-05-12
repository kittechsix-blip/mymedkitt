// MedKitt — Peritoneal Dialysis Complications
// Triage → Peritonitis → Catheter Infections → Mechanical Complications → Metabolic Emergencies → Late/Severe → Disposition
// 7 modules, 30 nodes.
export const PERITONEAL_DIALYSIS_CRITICAL_ACTIONS = [
    { text: 'Send PD effluent for cell count, gram stain, culture in blood culture bottles', nodeId: 'pd-peritonitis-dx' },
    { text: 'Start empiric IP antibiotics within 6 h — do not wait for culture', nodeId: 'pd-peritonitis-empiric' },
    { text: 'Cover gram-positive (cefazolin or vancomycin) + gram-negative (ceftazidime or aminoglycoside)', nodeId: 'pd-peritonitis-empiric' },
    { text: 'Add heparin 500 U/L to dialysate when effluent is cloudy', nodeId: 'pd-peritonitis-empiric' },
    { text: 'Treat hyper-K >6.5 first — do not wait for HD bridge', nodeId: 'pd-hyperK' },
    { text: 'Suspect fungal peritonitis if effluent stays cloudy at 5 days — pull the catheter', nodeId: 'pd-fungal' },
    { text: 'Refractory or relapsing peritonitis = catheter removal + transition to HD', nodeId: 'pd-failure' },
];
export const PERITONEAL_DIALYSIS_NODES = [
    // =====================================================================
    // MODULE 1: TRIAGE & INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'pd-start',
        type: 'question',
        module: 1,
        title: 'Peritoneal Dialysis — Complication',
        body: '[Peritoneal Dialysis Steps Summary](#/info/pd-summary)\n\n**PD patients arrive sick from one of six problem domains.** Identify the dominant complaint first — the workup branches early. Always drain a fresh exchange on arrival; the effluent is your single most useful diagnostic specimen.\n\nAsk: When was the last exchange? CAPD or APD? Recent catheter trauma? Last cloudy bag?',
        citation: [1, 7],
        calculatorLinks: [
            { id: 'pd-peritonitis-dx', label: 'Peritonitis Dx Criteria' },
        ],
        options: [
            {
                label: 'Cloudy Effluent ± Abdominal Pain',
                description: 'Most common — assume peritonitis until proven otherwise.',
                next: 'pd-peritonitis-dx',
                urgency: 'urgent',
            },
            {
                label: 'Exit-Site or Tunnel Redness / Drainage',
                description: 'Catheter-related infection — high risk of progression to peritonitis.',
                next: 'pd-exit-site',
            },
            {
                label: 'Drain/Fill Problem or Abdominal Wall Bulge',
                description: 'Mechanical: outflow failure, leak, hernia, hydrothorax.',
                next: 'pd-mechanical',
            },
            {
                label: 'Volume Overload / Hyper-K / Hyperglycemia',
                description: 'Metabolic emergency in a PD-dependent patient.',
                next: 'pd-metabolic',
            },
            {
                label: 'Bloody Effluent or Severe Refractory Pain',
                description: 'Hemoperitoneum, EPS, surgical abdomen, or PD failure.',
                next: 'pd-severe',
            },
        ],
        summary: 'Always drain a fresh exchange on arrival — the effluent is the diagnostic specimen.',
    },
    // =====================================================================
    // MODULE 2: PD-ASSOCIATED PERITONITIS
    // =====================================================================
    {
        id: 'pd-peritonitis-dx',
        type: 'question',
        module: 2,
        title: 'Diagnose PD-Associated Peritonitis',
        body: '**ISPD diagnostic criteria — need 2 of 3:**\n1. Clinical features (abdominal pain ± fever)\n2. Cloudy effluent with **WBC >100/µL** after ≥2 h dwell, **>50% PMN**\n3. Positive effluent culture\n\n**Specimen handling matters.** Inoculate **5–10 mL of effluent directly into two blood culture bottles** at the bedside — this raises culture yield from <50% to >80%. Send a separate sample for cell count + Gram stain. [1][2]\n\n[Cloudy Effluent Differential](#/info/pd-diff)',
        citation: [1, 2, 7],
        calculatorLinks: [
            { id: 'pd-peritonitis-dx', label: 'Dx Criteria Tool' },
        ],
        options: [
            {
                label: '≥2 Criteria Met → Peritonitis',
                description: 'Start empiric IP antibiotics now.',
                next: 'pd-peritonitis-empiric',
                urgency: 'urgent',
            },
            {
                label: 'Cloudy Effluent, WBC <100 or No PMN Predominance',
                description: 'Consider non-infectious cloudy effluent (eosinophilic, chemical, chyle, malignancy, fibrin).',
                next: 'pd-noninfectious',
            },
        ],
        summary: 'Need 2 of 3: clinical features + WBC >100 with >50% PMN + positive culture. Inoculate effluent into blood culture bottles.',
    },
    {
        id: 'pd-peritonitis-empiric',
        type: 'info',
        module: 2,
        title: 'Empiric IP Antibiotic Therapy',
        body: '**Start within 6 h of diagnosis — do not wait for culture.** Cover gram-positive + gram-negative organisms. ISPD recommends center-specific regimens. [1]\n\n**Gram-positive (pick one):**\n• [Cefazolin](#/drug/cefazolin/peritoneal-dialysis) IP 15–20 mg/kg once daily (preferred in low-MRSA centers)\n• [Vancomycin](#/drug/vancomycin/peritoneal-dialysis) IP 15–30 mg/kg every 5–7 days (if high MRSA prevalence)\n\n**Gram-negative (pick one):**\n• [Ceftazidime](#/drug/ceftazidime/peritoneal-dialysis) IP 1000–1500 mg once daily\n• [Gentamicin](#/drug/gentamicin/peritoneal-dialysis) IP 0.6 mg/kg once daily (favored in ESBL-prevalent centers per PDOPPS)\n\n**Monotherapy alternative:** [Cefepime](#/drug/cefepime/peritoneal-dialysis) IP 1 g once daily — non-inferior to dual therapy in 2 RCTs. Increase loading + maintenance dose by 25% if residual urine >100 mL/day.\n\n**Practical pearls:**\n• Dwell time **≥6 h** for one antibiotic-containing bag per day (CAPD), or daytime full-fill dwell (APD).\n• Add **heparin 500 U/L** to dialysate while effluent is cloudy — prevents catheter fibrin obstruction.\n• Vancomycin + ceftazidime are compatible in the same 1 L bag but **NEVER mix in the same syringe**.\n• [IP Antibiotic Dosing Reference](#/info/pd-ip-abx-table)',
        citation: [1, 2, 7],
        calculatorLinks: [
            { id: 'pd-empiric-abx', label: 'Empiric Abx Selector' },
        ],
        next: 'pd-peritonitis-flow',
    },
    {
        id: 'pd-peritonitis-flow',
        type: 'question',
        module: 2,
        title: 'Day 3–5 Reassessment',
        body: 'Effluent should clear and pain should improve within **72 h** of effective therapy. Persistent cloudy effluent at day 3 = treatment failure. [1]',
        citation: [1],
        options: [
            {
                label: 'Clinical Improvement, Culture Identified',
                description: 'Tailor antibiotics to organism. Total duration: 2 weeks (most), 3 weeks (S. aureus, Pseudomonas, enterococci).',
                next: 'pd-targeted',
            },
            {
                label: 'No Improvement at Day 3',
                description: 'Repeat cell count + culture. Consider unusual organisms.',
                next: 'pd-refractory',
                urgency: 'urgent',
            },
        ],
        summary: 'Clinical response expected by 72 h. No improvement at day 3 = treatment failure.',
    },
    {
        id: 'pd-targeted',
        type: 'info',
        module: 2,
        title: 'Targeted Therapy by Organism',
        body: '**Coag-negative Staph (most common):** continue cefazolin × 2 weeks.\n\n**S. aureus (MSSA):** [cefazolin](#/drug/cefazolin/peritoneal-dialysis) × 3 weeks. MRSA → [vancomycin](#/drug/vancomycin/peritoneal-dialysis) × 3 weeks + consider rifampin.\n\n**Streptococcus / Enterococcus:** ampicillin or vancomycin × 3 weeks.\n\n**Pseudomonas:** dual therapy ([ceftazidime](#/drug/ceftazidime/peritoneal-dialysis) + [gentamicin](#/drug/gentamicin/peritoneal-dialysis) or oral ciprofloxacin) × 3 weeks. **High catheter-loss rate — strongly consider removal.**\n\n**Polymicrobial / enteric:** consider surgical cause (perforation, diverticulitis). Image, surgery consult, broaden coverage to include anaerobes.\n\n**Culture-negative at day 3:** if responding clinically, continue empiric × 2 weeks. If not responding, repeat workup including fungal + mycobacterial. [1]',
        citation: [1, 7],
        next: 'pd-dispo',
    },
    {
        id: 'pd-refractory',
        type: 'question',
        module: 2,
        title: 'Refractory or Recurrent Peritonitis',
        body: '**Definitions matter for catheter decisions:** [1]\n• **Refractory:** failure to clear by day 5 of appropriate antibiotics.\n• **Relapsing:** new episode within 4 weeks of completion, same organism.\n• **Recurrent:** new episode within 4 weeks, different organism.\n• **Repeat:** new episode >4 weeks later, same organism.',
        citation: [1, 4],
        options: [
            {
                label: 'Refractory (Day 5 — Still Cloudy)',
                description: 'Pull the catheter. Bridge to hemodialysis.',
                next: 'pd-failure',
                urgency: 'urgent',
            },
            {
                label: 'Fungal Effluent or High Suspicion',
                description: 'Mortality >25%. Remove catheter immediately + antifungals.',
                next: 'pd-fungal',
                urgency: 'critical',
            },
            {
                label: 'Relapsing or Recurrent',
                description: 'Strongly consider catheter removal after second episode.',
                next: 'pd-failure',
            },
        ],
        summary: 'Refractory at day 5 = pull catheter. Fungal = pull immediately.',
    },
    {
        id: 'pd-fungal',
        type: 'info',
        module: 2,
        title: 'Fungal Peritonitis — Catheter Out',
        body: '**Mortality >25%, catheter loss rate ~40%.** Suspect when effluent stays cloudy at day 5 despite appropriate antibiotics, especially in patients with recent antibiotic exposure, immunosuppression, or prior bacterial peritonitis. [1][3]\n\n**Immediate actions:**\n1. **Remove the PD catheter** within 24–48 h of diagnosis. Do not attempt salvage.\n2. Start **fluconazole 200 mg PO/IV daily** (Candida albicans coverage).\n3. If azole-resistant species (C. glabrata, C. krusei) or critically ill → **echinocandin** (caspofungin 70 mg load → 50 mg daily).\n4. Continue antifungals **≥2 weeks** after catheter removal.\n5. Bridge to hemodialysis; PD return possible after 6 weeks if no recurrence.',
        citation: [1, 3],
        next: 'pd-failure',
    },
    {
        id: 'pd-noninfectious',
        type: 'info',
        module: 2,
        title: 'Non-Infectious Cloudy Effluent',
        body: '**Cloudy + WBC <100 + no PMN predominance:** infection is unlikely. Consider:\n\n• **Eosinophilic peritonitis** — eosinophils >10% on differential. Self-limited. Usually triggered by new dialysate, icodextrin, or air. No antibiotics.\n• **Chemical peritonitis** — exposure to disinfectant or hypertonic dialysate. Resolves with rinsing.\n• **Chyle** — milky effluent that does not clear; triglycerides >100 mg/dL. Look for lymphatic injury or malignancy.\n• **Hemoperitoneum** — see [Bloody Effluent](#/node/pd-hemoperit).\n• **Malignancy or fibrin** — rare; PD effluent cytology if persistent.\n\n[Cloudy Effluent Differential](#/info/pd-diff)',
        citation: [1, 8],
        next: 'pd-dispo',
    },
    // =====================================================================
    // MODULE 3: CATHETER INFECTIONS
    // =====================================================================
    {
        id: 'pd-exit-site',
        type: 'question',
        module: 3,
        title: 'Exit-Site vs Tunnel Infection',
        body: '**Exit-site infection:** purulent drainage at the exit site ± erythema. Crust alone does not equal infection. [2]\n\n**Tunnel infection:** erythema, edema, or tenderness along the subcutaneous catheter tract — frequently occult. Ultrasound shows fluid around the cuff. Highest peritonitis risk.\n\nObtain exit-site swab for culture before starting antibiotics. Pseudomonas + S. aureus are the most aggressive organisms.',
        citation: [2],
        options: [
            {
                label: 'Exit-Site Only — Minor Drainage',
                description: 'Oral antibiotics tailored to organism × 2 weeks. Increase exit-site care frequency.',
                next: 'pd-exit-treat',
            },
            {
                label: 'Tunnel Involvement / Failed Oral Therapy',
                description: 'IV antibiotics + ultrasound + consider catheter removal.',
                next: 'pd-tunnel',
                urgency: 'urgent',
            },
        ],
        summary: 'Tunnel infection has highest peritonitis risk — image with ultrasound.',
    },
    {
        id: 'pd-exit-treat',
        type: 'info',
        module: 3,
        title: 'Exit-Site Treatment',
        body: '**Empiric oral therapy (start before culture if mild):**\n• **S. aureus suspected:** dicloxacillin 500 mg PO QID or cephalexin 500 mg PO QID. MRSA → trimethoprim-sulfa or doxycycline.\n• **Pseudomonas suspected (green drainage, biofilm):** oral ciprofloxacin 500 mg BID × 3 weeks. Add second agent ([gentamicin](#/drug/gentamicin/peritoneal-dialysis) IP or oral) if severe.\n• **Duration:** 2 weeks minimum, 3 weeks for Pseudomonas or S. aureus.\n\n**Local care:** intensify exit-site cleaning + mupirocin or gentamicin cream daily. Do NOT remove the catheter for isolated exit-site infection — only if it progresses to tunnel or peritonitis. [2]',
        citation: [2],
        next: 'pd-dispo',
    },
    {
        id: 'pd-tunnel',
        type: 'info',
        module: 3,
        title: 'Tunnel Infection — High Risk',
        body: '**Concurrent peritonitis develops in ~40% of tunnel infections.** Catheter salvage fails frequently. [2]\n\n**Workup:**\n• Ultrasound the tunnel — fluid >1 mm around the deep cuff predicts catheter loss.\n• Exit-site culture + blood cultures if febrile.\n• Send PD effluent for cell count even if not visibly cloudy.\n\n**Treatment:**\n• Broad IP coverage: [vancomycin](#/drug/vancomycin/peritoneal-dialysis) + [ceftazidime](#/drug/ceftazidime/peritoneal-dialysis) until culture returns.\n• Plan **catheter removal** if no improvement at 2 weeks, deep cuff involvement, or Pseudomonas isolated.\n• Bridge to HD if removal needed.',
        citation: [2, 4],
        next: 'pd-dispo',
    },
    // =====================================================================
    // MODULE 4: MECHANICAL COMPLICATIONS
    // =====================================================================
    {
        id: 'pd-mechanical',
        type: 'question',
        module: 4,
        title: 'Mechanical Complication',
        body: 'Mechanical PD problems do not need antibiotics but can derail dialysis fast. Localize first.',
        citation: [5],
        options: [
            {
                label: 'Outflow Failure (Slow/No Drain)',
                description: 'Constipation, kink, fibrin, omental wrap, malposition.',
                next: 'pd-outflow',
            },
            {
                label: 'Dialysate Leak (Pericatheter, Genital, Pleural)',
                description: 'Early leak <30 d post-insertion vs late leak.',
                next: 'pd-leak',
            },
            {
                label: 'Abdominal Wall Hernia',
                description: 'Increased intra-abdominal pressure during dwell.',
                next: 'pd-hernia',
            },
            {
                label: 'Acute Dyspnea + Pleural Effusion',
                description: 'Hydrothorax via diaphragmatic defect — right-sided in 90%.',
                next: 'pd-hydrothorax',
                urgency: 'urgent',
            },
        ],
        summary: 'Outflow failure is most common; hydrothorax is the most dangerous.',
    },
    {
        id: 'pd-outflow',
        type: 'info',
        module: 4,
        title: 'Outflow Failure',
        body: '**Stepwise workup — start with the cheapest fix:** [5]\n\n1. **Constipation** (most common cause). KUB abdominal radiograph — look for stool burden + catheter tip position. Polyethylene glycol or lactulose. Avoid milk of magnesia in ESRD.\n2. **Catheter kink or external clamp** — visual check, reposition external segment.\n3. **Fibrin plug** — flush with heparinized saline 5000 U in 10 mL. Adding **heparin 500 U/L** to all bags prevents recurrence.\n4. **Catheter tip malposition** (out of pelvis) — KUB shows tip cephalad. Laxatives + ambulation first; fluoroscopic manipulation if persistent.\n5. **Omental wrap** — surgical omentopexy or catheter replacement.\n\n**Do not** continue exchanges if drain is <50% of fill volume — risk of overfill leak or hernia.',
        citation: [5],
        next: 'pd-dispo',
    },
    {
        id: 'pd-leak',
        type: 'info',
        module: 4,
        title: 'Dialysate Leak',
        body: '**Early leak (<30 days post-insertion):** pericatheter wetness, scrotal/labial edema. Stop PD for 1–2 weeks → switch to **temporary HD** while the tract heals. Resume with low-volume supine exchanges. [5]\n\n**Late leak:** usually a hernia or abdominal wall defect. CT with intraperitoneal contrast (mixed with dialysate) localizes the tract.\n\n**Genital edema:** patent processus vaginalis or inguinal hernia tracking dialysate. Surgical repair.\n\n**Do not assume leak is benign** — leaks predispose to peritonitis and worsen ultrafiltration.',
        citation: [5],
        next: 'pd-dispo',
    },
    {
        id: 'pd-hernia',
        type: 'info',
        module: 4,
        title: 'Abdominal Wall Hernia',
        body: '**Incidence 10–25% of PD patients.** Highest risk: prior surgery, polycystic kidney disease, older age, high intra-abdominal pressure from large fill volumes. [5]\n\n**ED priorities:**\n• Examine for incarceration / strangulation — tender, irreducible, skin changes, peritonitis. Surgical emergency.\n• If reducible: low fill volumes + supine exchanges + elective repair. PD usually can resume 2 weeks post-repair.\n• A new hernia is NOT a peritonitis substitute — still send effluent.',
        citation: [5],
        next: 'pd-dispo',
    },
    {
        id: 'pd-hydrothorax',
        type: 'info',
        module: 4,
        title: 'PD-Related Hydrothorax',
        body: '**Sudden right-sided pleural effusion in a PD patient = pleuro-peritoneal communication.** ~90% right-sided. Dyspnea may be the only symptom; fever is absent. [5][6]\n\n**Confirm:**\n• Thoracentesis: pleural fluid glucose **higher than serum** (dialysate has dextrose) confirms diagnosis. Cell count is bland.\n• Alternative: peritoneal scintigraphy with Tc-99m injected into dialysate.\n\n**Treatment:**\n• Stop PD immediately. Transition to HD.\n• Thoracoscopic pleurodesis or surgical repair of diaphragmatic defect for definitive management.\n• PD can sometimes resume after successful pleurodesis.',
        citation: [5, 6],
        next: 'pd-dispo',
    },
    // =====================================================================
    // MODULE 5: METABOLIC EMERGENCIES
    // =====================================================================
    {
        id: 'pd-metabolic',
        type: 'question',
        module: 5,
        title: 'Metabolic Emergency in a PD Patient',
        body: 'PD removes solutes slowly compared to HD. Severe metabolic derangements often need **temporary HD** rather than aggressive PD. Volume overload is the most common cause of hospitalization in PD patients.',
        citation: [4, 7],
        options: [
            {
                label: 'Hyperkalemia (K >5.5)',
                description: 'Treat first with standard ED algorithm — do not wait for HD bridge.',
                next: 'pd-hyperK',
                urgency: 'urgent',
            },
            {
                label: 'Volume Overload / Ultrafiltration Failure',
                description: 'Symptomatic edema, hypoxia, hypertensive emergency.',
                next: 'pd-volume',
            },
            {
                label: 'Hyperglycemia from Dialysate Dextrose',
                description: 'Blood glucose >250 in non-diabetic PD, or DKA-like picture in diabetic PD.',
                next: 'pd-hyperglycemia',
            },
        ],
        summary: 'PD clears solutes slowly — severe metabolic emergencies need HD bridge.',
    },
    {
        id: 'pd-hyperK',
        type: 'info',
        module: 5,
        title: 'Hyperkalemia in PD Patient',
        body: '**Treat the membrane first, then move K+ around.** Standard ED algorithm applies — [HyperK Consult](#/tree/potassium). [4]\n\n**PD-specific points:**\n• PD clearance of K+ is **~10–15 mEq/h** (CAPD with hourly exchanges of 1.5% dextrose). HD clears K+ at 50–80 mEq/h. **For K >6.5 with ECG changes, arrange HD — not aggressive PD.**\n• Avoid kayexalate — does not work fast enough; sodium load worsens overload.\n• **Patiromer** or **sodium zirconium cyclosilicate** for outpatient maintenance only.\n• If a PD patient presents with K >6.5 + ECG changes + no immediate HD access: 1.5% dextrose hourly exchanges + standard medical management bridges to HD.',
        citation: [4],
        calculatorLinks: [
            { id: 'pd-hd-bridge', label: 'PD→HD Bridge Decision' },
        ],
        next: 'pd-dispo',
    },
    {
        id: 'pd-volume',
        type: 'info',
        module: 5,
        title: 'Volume Overload / UF Failure',
        body: '**Causes:** peritoneal membrane dysfunction (high transporter status), missed exchanges, dietary indiscretion, residual renal function decline. [4][7]\n\n**Acute management:**\n• **4.25% dextrose dialysate** (most hypertonic available) — short 2-h dwells maximize ultrafiltration.\n• **Icodextrin** for one long dwell (8–12 h) — sustained UF without glucose absorption rebound.\n• **Furosemide IV 80–240 mg** — useful if residual urine output >100 mL/day.\n• **Bridge to HD** if dyspnea, hypoxia, or hypertensive emergency.\n\n**UF failure workup (outpatient):** peritoneal equilibration test (PET) — distinguishes high transporter from membrane failure.',
        citation: [4, 7],
        next: 'pd-dispo',
    },
    {
        id: 'pd-hyperglycemia',
        type: 'info',
        module: 5,
        title: 'Hyperglycemia from Dialysate',
        body: 'PD dialysate absorbs ~60–100 g glucose per day (more with 4.25%). Diabetic PD patients may need 25–50% higher insulin doses than during pre-dialysis CKD. [4]\n\n**ED management:**\n• Standard IV insulin + fluids for DKA / HHS — see [DKA Consult](#/tree/dka).\n• Avoid additional dextrose-containing dialysate during treatment.\n• **Icodextrin** is glucose-sparing — switch to it if hyperglycemia is dialysate-driven.\n• Maltose interference: icodextrin metabolites cause **falsely elevated** glucose on GDH-PQQ glucometers. Use plasma glucose, not fingerstick, during icodextrin therapy.',
        citation: [4],
        next: 'pd-dispo',
    },
    // =====================================================================
    // MODULE 6: SEVERE / LATE COMPLICATIONS
    // =====================================================================
    {
        id: 'pd-severe',
        type: 'question',
        module: 6,
        title: 'Severe or Late Complication',
        body: 'These complications can be life-threatening or end PD as a modality.',
        citation: [4, 7, 8],
        options: [
            {
                label: 'Bloody Effluent (Hemoperitoneum)',
                description: 'Pink-tinged to grossly bloody dialysate.',
                next: 'pd-hemoperit',
            },
            {
                label: 'Suspected Encapsulating Peritoneal Sclerosis',
                description: 'Long-duration PD (>5 y) with bowel obstruction, weight loss, bloody ascites.',
                next: 'pd-eps',
                urgency: 'urgent',
            },
            {
                label: 'Refractory Peritonitis or PD Failure',
                description: 'Catheter must come out; transition to HD.',
                next: 'pd-failure',
            },
        ],
    },
    {
        id: 'pd-hemoperit',
        type: 'info',
        module: 6,
        title: 'Hemoperitoneum',
        body: '**Benign causes (most):** menstrual retrograde flow (premenopausal women — recurs cyclically), ruptured ovarian cyst, recent exercise, recent colonoscopy. [4][7]\n\n**Serious causes:** ruptured viscus, splenic/renal cyst rupture (polycystic kidney disease), abdominal trauma, intra-abdominal malignancy, anticoagulation.\n\n**ED workup:**\n• Check hemoglobin + coagulation panel.\n• CT abdomen/pelvis if hemodynamically significant or non-cyclical.\n• Add **heparin 500 U/L** to dialysate to prevent fibrin/clot obstruction.\n• Rapid flushing with cool dialysate provides hemostatic vasoconstriction.\n• Transfuse for symptomatic anemia; reverse anticoagulation if active bleeding.',
        citation: [4, 7],
        next: 'pd-dispo',
    },
    {
        id: 'pd-eps',
        type: 'info',
        module: 6,
        title: 'Encapsulating Peritoneal Sclerosis',
        body: '**Rare (~1–4% incidence after >5 y PD) but catastrophic — mortality 25–50% at 1 year.** Fibrotic cocoon encases small bowel. [3][8]\n\n**Suspect when long-duration PD patient develops:**\n• Recurrent bowel obstruction symptoms\n• Weight loss, anorexia, abdominal pain\n• Bloody or turbid ascites\n• UF failure with high transporter status\n\n**Workup:**\n• CT abdomen — characteristic findings: peritoneal calcifications, bowel tethering, "cocoon" appearance.\n• Stop PD permanently — transition to HD.\n• Consider transplant evaluation.\n• Tamoxifen + steroids show modest benefit in case series; surgical enterolysis at experienced centers for obstruction.',
        citation: [3, 8],
        next: 'pd-failure',
    },
    {
        id: 'pd-failure',
        type: 'info',
        module: 6,
        title: 'PD Failure → HD Bridge',
        body: '**Indications to abandon PD acutely:**\n• Refractory peritonitis (no improvement at day 5)\n• Fungal peritonitis\n• Relapsing or recurrent peritonitis (≥2 episodes)\n• Tunnel infection with deep-cuff involvement\n• Hydrothorax (not amenable to pleurodesis)\n• EPS\n• Persistent UF failure\n\n**Bridge plan:**\n1. **Temporary HD catheter** (internal jugular preferred; avoid subclavian — preserves future fistula sites).\n2. **Remove PD catheter** within 24–48 h for fungal or refractory peritonitis; can defer in stable patients.\n3. **Permanent HD access** (AV fistula > AV graft > tunneled catheter) — start the conversation in the ED.\n4. **Transplant referral** if not already listed.\n\n[PD→HD Bridge Decision Tool](#/info/pd-bridge-decision)',
        citation: [1, 2, 4],
        calculatorLinks: [
            { id: 'pd-hd-bridge', label: 'PD→HD Bridge Decision' },
        ],
        next: 'pd-dispo',
    },
    // =====================================================================
    // MODULE 7: DISPOSITION
    // =====================================================================
    {
        id: 'pd-dispo',
        type: 'question',
        module: 7,
        title: 'Disposition',
        body: 'PD patients have higher admission rates than HD patients for infectious complications. Threshold to admit is low.',
        options: [
            {
                label: 'Admit — Peritonitis with Systemic Features',
                description: 'Sepsis, hypotension, fungal suspicion, refractory disease, severe pain.',
                next: 'pd-dispo-admit',
                urgency: 'urgent',
            },
            {
                label: 'Admit — ICU',
                description: 'Hemodynamic instability, severe hyper-K with arrhythmia, large hydrothorax, perforated viscus.',
                next: 'pd-dispo-icu',
                urgency: 'critical',
            },
            {
                label: 'Home with PD Nurse Follow-Up',
                description: 'Mild peritonitis or exit-site infection in a reliable patient with same-day nurse visit.',
                next: 'pd-dispo-home',
            },
        ],
    },
    {
        id: 'pd-dispo-admit',
        type: 'result',
        module: 7,
        title: 'Admit — Renal / Medicine',
        body: 'Continue IP antibiotics under nephrology guidance. Daily effluent cell counts + cultures until clear. Plan for catheter decisions if no improvement by day 3.',
        recommendation: 'Admit to medicine with nephrology consult.',
        confidence: 'recommended',
        citation: [1],
    },
    {
        id: 'pd-dispo-icu',
        type: 'result',
        module: 7,
        title: 'Admit — ICU',
        body: 'Hemodynamic monitoring, vasopressors if needed, urgent HD access planning. Surgical consult for perforation or strangulated hernia.',
        recommendation: 'ICU admission with nephrology + surgery as indicated.',
        confidence: 'definitive',
        citation: [1, 4],
    },
    {
        id: 'pd-dispo-home',
        type: 'result',
        module: 7,
        title: 'Home with PD Nurse Follow-Up',
        body: 'Requires: reliable patient, same- or next-day home PD nurse visit, ability to perform additional exchanges, clear return precautions (fever, worsening pain, no clearing by 72 h).',
        recommendation: 'Discharge with 24-h nephrology and PD nurse follow-up.',
        confidence: 'consider',
        citation: [1, 2],
    },
];
export const PERITONEAL_DIALYSIS_MODULE_LABELS = [
    'Triage & Assessment',
    'PD-Associated Peritonitis',
    'Catheter Infections',
    'Mechanical Complications',
    'Metabolic Emergencies',
    'Severe / Late Complications',
    'Disposition',
];
export const PERITONEAL_DIALYSIS_CITATIONS = [
    { num: 1, text: 'Li PK, Chow KM, Cho Y, Fan S, Figueiredo AE, Harris T, et al. ISPD peritonitis guideline recommendations: 2022 update on prevention and treatment. Perit Dial Int. 2022;42(2):110-153. doi:10.1177/08968608221080586' },
    { num: 2, text: 'Szeto CC, Li PK, Johnson DW, Bernardini J, Dong J, Figueiredo AE, et al. ISPD Catheter-Related Infection Recommendations: 2017 Update. Perit Dial Int. 2017;37(2):141-154. doi:10.3747/pdi.2016.00120' },
    { num: 3, text: 'Brown EA, Bargman J, van Biesen W, Chang MY, Finkelstein FO, Hurst H, et al. Length of Time on Peritoneal Dialysis and Encapsulating Peritoneal Sclerosis — Position Paper for ISPD: 2017 Update. Perit Dial Int. 2017;37(4):362-374. doi:10.3747/pdi.2017.00018' },
    { num: 4, text: 'Mehrotra R, Devuyst O, Davies SJ, Johnson DW. The Current State of Peritoneal Dialysis. J Am Soc Nephrol. 2016;27(11):3238-3252. doi:10.1681/ASN.2016010112' },
    { num: 5, text: 'Crabtree JH, Shrestha BM, Chow KM, Figueiredo AE, Povlsen JV, Wilkie M, et al. Creating and Maintaining Optimal Peritoneal Dialysis Access in the Adult Patient: 2019 Update. Perit Dial Int. 2019;39(5):414-436. doi:10.3747/pdi.2018.00232' },
    { num: 6, text: 'Chow KM, Szeto CC, Wong TY, Li PK. Hydrothorax Complicating Peritoneal Dialysis: Diagnostic Value of Glucose Concentration in Pleural Fluid Aspirate. Perit Dial Int. 2002;22(4):525-528.' },
    { num: 7, text: 'Salzer WL. Peritoneal Dialysis-Related Peritonitis: Challenges and Solutions. Int J Nephrol Renovasc Dis. 2018;11:173-186. doi:10.2147/IJNRD.S123618' },
    { num: 8, text: 'Cho Y, Johnson DW. Peritoneal Dialysis-Related Peritonitis: Towards Improving Evidence, Practices, and Outcomes. Am J Kidney Dis. 2014;64(2):278-289. doi:10.1053/j.ajkd.2014.02.025' },
];
export const PERITONEAL_DIALYSIS_NODE_COUNT = PERITONEAL_DIALYSIS_NODES.length;
