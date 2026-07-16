// MedKitt — Dysuria / Painful Urination Front Door (Rule-In / Rule-Out Engine, type: 'hub')
//
// 5-Module rule-in/rule-out skeleton (matches dyspnea-hub / abdominal-pain-hub template
// codified in CLAUDE.md "Chief-Complaint Hub Template"):
//   1. Sick Check
//   2. Rule In / Rule Out — per-differential chains: entry -> gate(s) -> verdict
//      (excluded verdicts loop back to dys-triage; confirmed verdicts link out to deep-dive)
//   3. Initial bundle / Reassess
//   4. Imaging
//   5. Disposition
//
// EBM-only citations. The decision instrument (qSOFA for the toxic/obstructed patient)
// lives in the bottom toolbar and is named in the nodes.
// Consult gaps handled as plain-text result nodes: pyelonephritis, acute bacterial prostatitis.
export const DYSURIA_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check
    // ============================================================
    {
        id: 'dys-start',
        type: 'info',
        module: 1,
        title: 'Dysuria — Sick Check First',
        body: '**Dysuria is a high-frequency undifferentiated complaint — do NOT anchor on "just a UTI."** The dangerous misses hide behind the same symptom: obstructive urosepsis, an untreated STI, acute bacterial prostatitis, and urinary retention.\n\n**⚠️ 5 DO-NOT-MISS diagnoses**\n1. **Obstructive pyelonephritis / urosepsis** — fever, flank pain, rigors, systemic toxicity, a stone or obstruction. A pus-under-pressure kidney is a urologic emergency, not an outpatient antibiotic script.\n2. **STI / urethritis / cervicitis** — a normal urinalysis does NOT reassure; sterile pyuria + discharge in a young sexually active patient is GC/CT until NAAT says otherwise; missed → PID / epididymo-orchitis.\n3. **Acute bacterial prostatitis** — male, perineal/pelvic pain, exquisitely tender prostate; UA can be normal.\n4. **Acute urinary retention** — dysuria can be the cause OR the consequence; a distended, painful bladder needs decompression.\n5. **Priapism / other GU emergency** masquerading as "painful urination."\n\n**First 60 seconds:** vitals (fever, tachycardia, hypotension = screen for urosepsis with qSOFA in the toolbar), palpate the flank and suprapubic region (CVA tenderness, distended bladder), and in men do a GU/prostate exam. Pregnancy test in any patient who could be pregnant — it changes the antibiotic and the imaging.',
        citation: [1],
        next: 'dys-triage',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Rule In / Rule Out
    // ============================================================
    {
        id: 'dys-triage',
        type: 'question',
        module: 2,
        title: 'Rule In / Rule Out — Pick the Thread',
        body: 'Work the dangerous causes first, then the common ones. Each branch runs a tight clinical gate to an explicit verdict; excluded branches return here for the next differential.',
        options: [
            { label: '🔴 Fever / flank pain / toxic / obstruction risk', description: 'Urosepsis / obstructive pyelonephritis', next: 'dys-urosepsis-entry', urgency: 'critical' },
            { label: 'Discharge / young + sexually active / partner symptoms', description: 'STI / urethritis / cervicitis', next: 'dys-sti-entry', urgency: 'urgent' },
            { label: 'Male + perineal/pelvic pain + tender prostate', description: 'Acute bacterial prostatitis', next: 'dys-prostatitis-entry', urgency: 'urgent' },
            { label: 'Distended painful bladder / can\u2019t void / overflow', description: 'Acute urinary retention', next: 'dys-retention-entry', urgency: 'urgent' },
            { label: 'Persistent painful erection / penile pain', description: 'Priapism (GU emergency)', next: 'dys-priapism-entry', urgency: 'critical' },
            { label: 'Dysuria + frequency, no discharge, well-appearing', description: 'Uncomplicated cystitis', next: 'dys-cystitis-entry', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Six-branch triage: urosepsis / STI / prostatitis / retention / priapism / uncomplicated cystitis.',
    },
    // -------------------- UROSEPSIS / OBSTRUCTIVE PYELONEPHRITIS --------------------
    {
        id: 'dys-urosepsis-entry',
        type: 'question',
        module: 2,
        title: 'Urosepsis / Obstructive Pyelonephritis — Toxicity + Obstruction Gate',
        body: '**Fever + flank pain + systemic toxicity = upper-tract infection until proven otherwise.** The lethal combination is **infection PLUS obstruction** (a stone, stricture, or tumor): the collecting system fills with pus under pressure and the patient decompensates fast. **Screen sepsis with qSOFA** (RR \u226522, SBP \u226490, altered mentation \u2014 open it in the toolbar) and ask what raises obstruction risk: known stones, single/transplant kidney, prior instrumentation, immunocompromise, pregnancy. Get a UA + culture, CBC, BMP, lactate, blood cultures.',
        options: [
            { label: 'Toxic / qSOFA \u22652 / high obstruction risk', description: 'Resuscitate + urgent decompression', next: 'dys-urosepsis-verdict', urgency: 'critical' },
            { label: 'Afebrile, well, no toxicity or obstruction risk', description: 'Upper-tract sepsis unlikely \u2014 move on', next: 'dys-urosepsis-excluded', urgency: 'routine' },
        ],
        citation: [2],
        summary: 'Fever + flank + toxicity = pyelo; infection + obstruction = urosepsis emergency. qSOFA screens sepsis.',
        safetyLevel: 'critical',
    },
    {
        id: 'dys-urosepsis-verdict',
        type: 'result',
        module: 2,
        title: 'Urosepsis — Resuscitate + Decompress',
        body: 'This is a resuscitation, not a prescription. Run the [Sepsis](#/tree/sepsis) pathway.\n\n**Next steps:**\n- **IV fluids, blood cultures \u00D7 2, lactate, and early broad-spectrum antibiotics** (e.g., ceftriaxone; anti-pseudomonal / broader coverage if healthcare-associated, recent instrumentation, or resistance risk; tailor to local antibiogram and prior cultures).\n- **Imaging to find obstruction: CT abdomen/pelvis (non-contrast for stone; contrast if abscess/emphysematous pyelo suspected)** \u2014 ultrasound if pregnant or to spare radiation.\n- **An obstructed, infected system needs emergent decompression \u2014 urology / IR for ureteral stent or percutaneous nephrostomy.** Source control is the definitive treatment; antibiotics alone will not save an obstructed kidney.\n- Admit; ICU if persistent hypotension / rising lactate.\n- Pyelonephritis without obstruction: there is no dedicated pyelonephritis consult yet \u2014 use [Adult UTI](#/tree/adult-uti) for antibiotic selection and admission criteria (**consult gap**).',
        recommendation: 'Sepsis bundle + early broad-spectrum abx + CT to find obstruction + EMERGENT urology/IR decompression (stent or nephrostomy). Antibiotics alone will not save an obstructed kidney.',
        citation: [2],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'dys-urosepsis-excluded',
        type: 'result',
        module: 2,
        title: 'Upper-Tract Sepsis — Unlikely',
        body: 'An afebrile, well-appearing patient with no toxicity and no obstruction risk makes obstructive pyelonephritis / urosepsis unlikely right now. **Pyelonephritis can still be present without frank sepsis** \u2014 flank pain + CVA tenderness + fever/pyuria still warrants upper-tract-directed antibiotics and close follow-up (see [Adult UTI](#/tree/adult-uti)). Reassess if fever, rigors, or hemodynamic change develop.\n\nReturn to the hub for the next differential.',
        recommendation: 'Urosepsis unlikely without toxicity/obstruction; treat pyelonephritis if present and reassess for decompensation.',
        citation: [2],
        next: 'dys-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- STI / URETHRITIS / CERVICITIS --------------------
    {
        id: 'dys-sti-entry',
        type: 'question',
        module: 2,
        title: 'STI / Urethritis / Cervicitis — Discharge + Risk Gate',
        body: '**A normal urinalysis does NOT rule out an STI.** In a young, sexually active patient, dysuria with urethral/vaginal discharge, a new/multiple partners, or a partner with symptoms is gonorrhea / chlamydia (\u00B1 trichomonas, Mycoplasma genitalium) until **NAAT for GC/CT** proves otherwise. **Sterile pyuria** (pyuria without bacteriuria/positive culture) is a classic clue. In women, ascending infection \u2192 PID; in men \u2192 epididymo-orchitis.',
        options: [
            { label: 'Discharge / sterile pyuria / STI risk factors', description: 'Treat as urethritis / STI', next: 'dys-sti-verdict', urgency: 'urgent' },
            { label: 'No discharge, no risk factors, not the picture', description: 'STI unlikely \u2014 move on', next: 'dys-sti-excluded', urgency: 'routine' },
        ],
        citation: [3],
        summary: 'Normal UA does not reassure; discharge / sterile pyuria / risk = NAAT for GC/CT. Missed → PID / epididymo-orchitis.',
        safetyLevel: 'warning',
    },
    {
        id: 'dys-sti-verdict',
        type: 'result',
        module: 2,
        title: 'Urethritis / STI — Test + Empiric Treat',
        body: 'Open [STI Comprehensive](#/tree/sti-comprehensive) for the full workup and treatment; if PID features (lower abdominal/pelvic pain, cervical motion / adnexal tenderness in a woman), run [PID](#/tree/pid).\n\n**Next steps:**\n- **NAAT for gonorrhea + chlamydia** (urine or urethral/vaginal/cervical swab); add trichomonas and consider Mycoplasma genitalium if persistent/recurrent.\n- **Treat empirically at the visit** (do not wait for NAAT if the picture fits) per current CDC STI guidance \u2014 e.g., ceftriaxone for gonorrhea + doxycycline for chlamydia; add metronidazole if trichomonas suspected.\n- **Screen for HIV and syphilis**, offer HBV/HCV as indicated; counsel on partner treatment (expedited partner therapy where allowed) and abstinence until treated.\n- Women with PID features: treat for PID, do not miss tubo-ovarian abscess.\n- Provide follow-up / test-of-cure guidance per guideline.',
        recommendation: 'NAAT GC/CT + empiric CDC-guideline treatment at the visit; screen HIV/syphilis; treat partners. Escalate to PID pathway if pelvic exam positive.',
        citation: [3],
        safetyLevel: 'warning',
        confidence: 'definitive',
    },
    {
        id: 'dys-sti-excluded',
        type: 'result',
        module: 2,
        title: 'STI / Urethritis — Unlikely',
        body: 'No discharge, no risk factors, and a picture that fits lower-tract cystitis makes an STI less likely \u2014 but the threshold to test is low, because a missed STI drives PID and epididymo-orchitis. **If pyuria is present without bacteriuria (sterile pyuria), keep the STI on the list and send NAAT.**\n\nReturn to the hub for the next differential.',
        recommendation: 'STI less likely without discharge/risk; keep a low threshold to send NAAT if sterile pyuria or any risk emerges.',
        citation: [3],
        next: 'dys-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- ACUTE BACTERIAL PROSTATITIS (consult gap: plain-text) --------------------
    {
        id: 'dys-prostatitis-entry',
        type: 'question',
        module: 2,
        title: 'Acute Bacterial Prostatitis — Male Perineal Pain Gate',
        body: '**A febrile man with dysuria + perineal / pelvic / low-back pain and an exquisitely tender, boggy prostate has acute bacterial prostatitis** \u2014 often with obstructive urinary symptoms or acute retention. **The UA can be normal or only mildly abnormal.** Do a gentle DRE (avoid vigorous prostate massage \u2014 it can precipitate bacteremia). Send UA + culture (gram-negatives, especially E. coli, dominate; consider GC/CT in younger men).',
        options: [
            { label: 'Male + tender prostate + fever / perineal pain', description: 'Treat as acute bacterial prostatitis', next: 'dys-prostatitis-verdict', urgency: 'urgent' },
            { label: 'No prostate tenderness / not the picture', description: 'Prostatitis unlikely \u2014 move on', next: 'dys-prostatitis-excluded', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Febrile man + perineal pain + tender prostate = acute bacterial prostatitis; UA may be normal. Avoid vigorous massage.',
        safetyLevel: 'warning',
    },
    {
        id: 'dys-prostatitis-verdict',
        type: 'result',
        module: 2,
        title: 'Acute Bacterial Prostatitis — Culture + Prolonged Antibiotics',
        body: '**Acute bacterial prostatitis confirmed or strongly suspected** (no dedicated consult yet \u2014 manage here; use [Adult UTI](#/tree/adult-uti) for antibiotic selection reference):\n\n- **Send UA + urine culture** before antibiotics; blood cultures if febrile/toxic.\n- **Antibiotics that penetrate prostate tissue for a prolonged course** \u2014 a fluoroquinolone or trimethoprim-sulfamethoxazole for **~2\u20134 weeks** (guided by culture and local resistance). In younger sexually active men, cover GC/CT.\n- **Toxic / septic \u2192 admit for IV antibiotics** (e.g., a broad-spectrum beta-lactam \u00B1 aminoglycoside) and resuscitate on the [Sepsis](#/tree/sepsis) pathway.\n- **Watch for acute urinary retention** \u2014 if present, prefer a suprapubic catheter or a gentle small-caliber urethral catheter with urology input; see [Urinary Retention](#/tree/urinary-retention).\n- **Consider a prostatic abscess** (failure to improve, ongoing fever) \u2192 CT/US and urology.\n- (Consult gap \u2014 managed in-hub.)',
        recommendation: 'Culture then prolonged prostate-penetrating antibiotics (2\u20134 wk FQ or TMP-SMX); admit + IV if toxic; manage retention; think abscess if not improving. (Consult gap.)',
        citation: [1],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'dys-prostatitis-excluded',
        type: 'result',
        module: 2,
        title: 'Prostatitis — Unlikely',
        body: 'No prostate tenderness and a picture that does not fit makes acute bacterial prostatitis unlikely. **Keep it on the list for any febrile man with dysuria** \u2014 the UA is unreliable here, so the exam drives the diagnosis.\n\nReturn to the hub for the next differential.',
        recommendation: 'Prostatitis unlikely without a tender prostate; reconsider in any febrile man with dysuria and a normal UA.',
        citation: [1],
        next: 'dys-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- ACUTE URINARY RETENTION --------------------
    {
        id: 'dys-retention-entry',
        type: 'question',
        module: 2,
        title: 'Acute Urinary Retention — Distended Bladder Gate',
        body: '**Dysuria can be the cause OR the consequence of retention.** A patient who cannot void, has suprapubic distension/pain, or has overflow incontinence needs the bladder assessed \u2014 palpate and confirm with a **bladder scan / bedside ultrasound** (a large post-void residual clinches it). Common drivers: BPH, obstructing stone/clot, prostatitis, medications (anticholinergics, opioids, sympathomimetics), post-op, and neurologic causes (**do not miss cauda equina** \u2014 check for saddle anesthesia, bilateral leg symptoms, fecal incontinence).',
        options: [
            { label: 'Cannot void / distended bladder / high PVR', description: 'Decompress the bladder', next: 'dys-retention-verdict', urgency: 'urgent' },
            { label: 'Voiding normally / no distension', description: 'Retention excluded \u2014 move on', next: 'dys-retention-excluded', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Can\u2019t void + distended bladder + high PVR = retention; decompress. Screen cauda equina and the underlying cause.',
        safetyLevel: 'warning',
    },
    {
        id: 'dys-retention-verdict',
        type: 'result',
        module: 2,
        title: 'Acute Urinary Retention — Decompress + Find the Cause',
        body: 'Open [Urinary Retention](#/tree/urinary-retention) for the full management pathway.\n\n**Next steps:**\n- **Immediate bladder decompression** with a urethral catheter (suprapubic if urethral fails or is contraindicated). Document the drained volume.\n- **Watch for post-obstructive diuresis** after large-volume drainage \u2014 monitor urine output and replace fluids/electrolytes if brisk.\n- **Check a BMP** for obstructive (post-renal) acute kidney injury and hyperkalemia.\n- **Find and treat the cause:** BPH, obstructing stone/clot, prostatitis (see the prostatitis branch), medications, or a neurologic cause. **If any cauda-equina red flags \u2014 emergent MRI and spine consult.**\n- Urology follow-up; decide catheter removal / trial of void vs discharge with catheter and outpatient plan.',
        recommendation: 'Decompress the bladder now, watch for post-obstructive diuresis, check renal function/K+, find the cause, and rule out cauda equina.',
        citation: [1],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'dys-retention-excluded',
        type: 'result',
        module: 2,
        title: 'Retention — Excluded',
        body: 'The patient is voiding, the bladder is not distended, and the post-void residual is low \u2014 acute urinary retention is excluded as the driver of the dysuria.\n\nReturn to the hub for the next differential.',
        recommendation: 'Retention excluded with normal voiding and low PVR; reassess if the patient stops voiding.',
        citation: [1],
        next: 'dys-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- PRIAPISM --------------------
    {
        id: 'dys-priapism-entry',
        type: 'question',
        module: 2,
        title: 'Priapism — Persistent Erection Gate',
        body: '**A persistent (>4 h), often painful erection unrelated to stimulation is priapism \u2014 a GU emergency.** It can present as "painful urination / penile pain." **Ischemic (low-flow) priapism is the time-critical one** \u2014 rigid, painful corpora, dark aspirate, and it threatens erectile function if not relieved quickly. Sickle cell disease, certain medications (erectile-dysfunction drugs, some psychiatric meds), and cocaine are common triggers; corporal blood gas + Doppler distinguish ischemic from non-ischemic.',
        options: [
            { label: 'Painful rigid erection >4 h / ischemic features', description: 'Emergent detumescence', next: 'dys-priapism-verdict', urgency: 'critical' },
            { label: 'Not priapism / erection resolved', description: 'Priapism excluded \u2014 move on', next: 'dys-priapism-excluded', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Painful erection >4 h = priapism; ischemic (low-flow) is time-critical. Corporal blood gas / Doppler distinguishes type.',
        safetyLevel: 'critical',
    },
    {
        id: 'dys-priapism-verdict',
        type: 'result',
        module: 2,
        title: 'Priapism — Time-Critical Detumescence',
        body: 'Open [Priapism](#/tree/priapism) for the full pathway \u2014 ischemic priapism is a time-dependent emergency.\n\n**Next steps:**\n- **Confirm ischemic vs non-ischemic** with corporal aspirate blood gas (\u00B1 penile Doppler): ischemic = hypoxic, acidotic, rigid, painful.\n- **Ischemic:** corporal aspiration \u00B1 irrigation, then **intracavernosal phenylephrine** (a diluted alpha-agonist, with cardiovascular monitoring); escalate to surgical shunt if refractory. **Urgent urology consult.**\n- **Treat the trigger:** if sickle-cell related, resuscitate and treat the crisis on the [Sickle Cell](#/tree/sickle-cell) pathway in parallel with local measures.\n- Non-ischemic (high-flow, usually post-traumatic) is not an emergency in the same way \u2014 often observation \u00B1 embolization.\n- Analgesia throughout.',
        recommendation: 'Confirm ischemic type, then corporal aspiration + intracavernosal phenylephrine + urgent urology; treat sickle-cell trigger in parallel. Time-critical for erectile function.',
        citation: [1],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'dys-priapism-excluded',
        type: 'result',
        module: 2,
        title: 'Priapism — Excluded',
        body: 'No persistent erection \u2014 priapism is not the driver here.\n\nReturn to the hub for the next differential.',
        recommendation: 'Priapism excluded; reassess if a persistent painful erection develops.',
        citation: [1],
        next: 'dys-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- UNCOMPLICATED CYSTITIS --------------------
    {
        id: 'dys-cystitis-entry',
        type: 'question',
        module: 2,
        title: 'Uncomplicated Cystitis — Simple-UTI Gate',
        body: '**Dysuria + urinary frequency + urgency WITHOUT vaginal discharge or irritation makes a UTI highly likely** (the probability of cystitis exceeds ~90% when discharge is absent and internal dysuria is present). "Uncomplicated" means a non-pregnant, otherwise-healthy patient without fever, flank pain, or obstruction. Confirm there are no complicating / upper-tract features and no STI clues before treating as simple cystitis.',
        options: [
            { label: 'Classic cystitis, no complicating features', description: 'Treat as uncomplicated UTI', next: 'dys-cystitis-verdict', urgency: 'routine' },
            { label: 'Child / infant with the picture', description: 'Use the pediatric UTI pathway', next: 'dys-cystitis-peds', urgency: 'urgent' },
            { label: 'Complicating feature emerges (fever, flank, pregnancy, male, discharge)', description: 'Not simple \u2014 re-triage', next: 'dys-cystitis-excluded', urgency: 'urgent' },
        ],
        citation: [1],
        summary: 'Dysuria + frequency, no discharge → >90% UTI. Confirm no complicating/upper-tract/STI features first.',
    },
    {
        id: 'dys-cystitis-verdict',
        type: 'result',
        module: 2,
        title: 'Uncomplicated Cystitis — Short-Course Antibiotics + Discharge',
        body: 'Open [Adult UTI](#/tree/adult-uti) for antibiotic selection and follow-up.\n\n**Next steps:**\n- **First-line short-course antibiotics** per guideline and local resistance \u2014 nitrofurantoin, trimethoprim-sulfamethoxazole (where resistance is low), or fosfomycin; avoid fluoroquinolones for simple cystitis when alternatives exist.\n- **Urine culture is not required for straightforward uncomplicated cystitis** but send it if recurrent, treatment failure, pregnant, or any complicating feature.\n- **Pregnancy changes everything** \u2014 confirm pregnancy status; treat asymptomatic bacteriuria and cystitis with pregnancy-safe agents and get a culture.\n- Symptomatic relief (hydration, \u00B1 phenazopyridine short course), clear return precautions (fever, flank pain, vomiting, no improvement in 48\u201372 h \u2192 return).\n- Discharge home with follow-up.',
        recommendation: 'Short-course guideline antibiotics (nitrofurantoin / TMP-SMX / fosfomycin), culture only if complicated/recurrent/pregnant, return precautions, discharge.',
        citation: [1],
        next: 'dys-disposition',
        confidence: 'definitive',
    },
    {
        id: 'dys-cystitis-peds',
        type: 'result',
        module: 2,
        title: 'Pediatric UTI — Use the Peds Pathway',
        body: 'A child or infant with UTI features is a different workup (age-based catheterized specimen, higher stakes for pyelonephritis and underlying anomaly, fever-source evaluation in the young infant).\n\nOpen [Pediatric UTI](#/tree/uti-peds) for the age-appropriate pathway.',
        recommendation: 'Route children/infants to the pediatric UTI pathway for age-based sampling and workup.',
        citation: [1],
        next: 'dys-triage',
        confidence: 'recommended',
    },
    {
        id: 'dys-cystitis-excluded',
        type: 'result',
        module: 2,
        title: 'Not Simple Cystitis — Re-Triage',
        body: 'A complicating feature has surfaced \u2014 fever, flank pain, systemic toxicity, pregnancy, a male patient, discharge/STI clues, or obstruction risk. **This is no longer "uncomplicated cystitis."** Return to the hub and run the matching dangerous branch (urosepsis, STI, prostatitis, or retention).\n\nReturn to the hub for the correct differential.',
        recommendation: 'Any complicating feature means it is not simple cystitis \u2014 re-triage to the upper-tract / STI / prostatitis / retention branch.',
        citation: [1],
        next: 'dys-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // ============================================================
    // Module 3 — Initial Bundle / Reassess
    // ============================================================
    {
        id: 'dys-rescue',
        type: 'info',
        module: 3,
        title: 'Initial Bundle',
        body: '**The dysuria work-up bundle (scale to acuity):**\n- **Vitals + qSOFA** if any toxicity; establish IV access and resuscitate the septic patient early.\n- **Urinalysis + urine culture** (culture when complicated, recurrent, male, pregnant, or upper-tract suspected). Remember: a normal UA does NOT exclude an STI or prostatitis.\n- **NAAT for GC/CT** in anyone with discharge, sterile pyuria, or STI risk.\n- **Pregnancy test** in any patient who could be pregnant \u2014 it changes antibiotics and imaging.\n- **Bladder scan / post-void residual** if retention is possible.\n- **BMP + lactate + blood cultures** in the toxic / obstructed patient; add CBC.\n- **Analgesia** and, where appropriate, a short course of a urinary analgesic.',
        citation: [1],
        next: 'dys-reassess',
    },
    {
        id: 'dys-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess After the Bundle',
        body: 'After initial labs, cultures, and any decompression \u2014 where does the patient stand?',
        options: [
            { label: 'Toxic / obstructed / not improving', description: 'Escalate: imaging + source control + admit', next: 'dys-imaging', urgency: 'critical' },
            { label: 'Stable, cause identified, responding', description: 'Move to disposition', next: 'dys-disposition', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Toxic/obstructed → escalate to imaging + source control; stable + diagnosed → disposition.',
    },
    // ============================================================
    // Module 4 — Imaging
    // ============================================================
    {
        id: 'dys-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging',
        body: '**Match the study to the question:**\n- **Suspected obstruction / stone with infection \u2192 CT abdomen/pelvis** (non-contrast for stone; contrast-enhanced if abscess or emphysematous pyelonephritis suspected). This is the study that finds the surgical emergency.\n- **Pregnancy or radiation-sparing \u2192 renal/bladder ultrasound** to assess for hydronephrosis and post-void residual.\n- **Retention \u2192 bladder scan / bedside ultrasound** to confirm and quantify.\n- **Prostatic or perinephric abscess (not improving on antibiotics) \u2192 CT/US** and urology.\n- **Priapism \u2192 penile Doppler** to confirm ischemic vs non-ischemic if the aspirate is equivocal.\n- Imaging is generally NOT needed for uncomplicated cystitis or a straightforward STI.',
        citation: [2],
        next: 'dys-disposition',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'dys-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Where does this patient go?',
        options: [
            { label: 'Urosepsis / obstruction / toxic / needs decompression', description: 'Admit (ICU if unstable)', next: 'dys-dispo-admit', urgency: 'critical' },
            { label: 'Complicated but stable / borderline / social barriers', description: 'Observe / shared decision', next: 'dys-dispo-observe', urgency: 'urgent' },
            { label: 'Uncomplicated cystitis / STI treated / retention relieved', description: 'Discharge with follow-up', next: 'dys-dispo-discharge', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Admit urosepsis/obstruction; observe complicated-but-stable; discharge uncomplicated with clear follow-up.',
    },
    {
        id: 'dys-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit',
        body: '**Admit** the septic / obstructed / toxic patient.\n\n- IV antibiotics, ongoing resuscitation, and **source control** (ureteral stent / percutaneous nephrostomy for obstructed infection; drainage for abscess).\n- **ICU** for persistent hypotension, rising lactate, or organ dysfunction.\n- Urology (\u00B1 IR) involved for decompression; medicine/hospitalist for sepsis management.\n- Serial reassessment of hemodynamics, urine output, and renal function.',
        recommendation: 'Admit for IV antibiotics + source control; ICU if unstable; urology/IR for decompression.',
        citation: [2],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'dys-dispo-observe',
        type: 'result',
        module: 5,
        title: 'Observe / Shared Decision',
        body: '**Observation / shared decision-making** for the complicated-but-stable patient \u2014 e.g., pyelonephritis tolerating oral intake, a prostatitis patient started on IV who may transition to oral, or borderline vitals.\n\n- A dose of IV/IM antibiotics and a period of observation with a repeat assessment can decide admit vs discharge.\n- Ensure reliable follow-up and a clear plan before any discharge; treat pain and address social barriers.\n- Reassess vitals, ability to tolerate oral intake, and pain control before deciding.',
        recommendation: 'Short observation \u00B1 IV antibiotics, reassess, then admit or discharge with tight follow-up.',
        citation: [1],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'dys-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge',
        body: '**Discharge** the uncomplicated patient with a clear plan.\n\n- **Uncomplicated cystitis:** short-course guideline antibiotics, hydration, symptomatic relief, and return precautions (fever, flank pain, vomiting, no improvement in 48\u201372 h).\n- **STI:** empiric treatment given, partner therapy counseled, HIV/syphilis screening, follow-up / test-of-cure per guideline.\n- **Retention relieved:** trial of void vs discharge with catheter and urology follow-up; warn about post-obstructive diuresis symptoms.\n- Confirm the pregnancy status and that antibiotics are pregnancy-safe if applicable.\n- Written return precautions and a named follow-up.',
        recommendation: 'Discharge with guideline antibiotics, partner therapy if STI, catheter/void plan if retention, and explicit return precautions + follow-up.',
        citation: [1],
        confidence: 'definitive',
    },
];
export const DYSURIA_HUB_CRITICAL_ACTIONS = [
    { text: 'Sick Check first — do not anchor on "just a UTI"; screen for urosepsis, STI, prostatitis, retention, priapism', nodeId: 'dys-start' },
    { text: 'Fever + flank + toxicity + obstruction risk → treat as urosepsis: sepsis bundle + emergent decompression', nodeId: 'dys-urosepsis-entry' },
    { text: 'A normal urinalysis does NOT rule out an STI — NAAT for GC/CT if discharge / sterile pyuria / risk', nodeId: 'dys-sti-entry' },
    { text: 'Persistent painful erection >4 h → ischemic priapism is time-critical; aspiration + intracavernosal phenylephrine + urology', nodeId: 'dys-priapism-entry' },
];
export const DYSURIA_HUB_CITATIONS = [
    { num: 1, text: 'Michels TC, Sands JE. Dysuria: Evaluation and Differential Diagnosis in Adults. Am Fam Physician. 2015;92(9):778-786. (Updated approach reaffirmed in AFP 2025 dysuria review.)' },
    { num: 2, text: 'Belyayeva M, Jeong JM. Acute Pyelonephritis. StatPearls. 2023; and Herness J, et al. Acute Pyelonephritis in Adults: Rapid Evidence Review. Am Fam Physician. 2020;102(3):173-180.' },
    { num: 3, text: 'Workowski KA, Bachmann LH, et al. CDC Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187; Young A, Wray AA. Urethritis. StatPearls. 2023.' },
];
export const DYSURIA_HUB_NODE_COUNT = DYSURIA_HUB_NODES.length;
export const DYSURIA_HUB_MODULE_LABELS = [
    'Sick Check',
    'Rule In / Rule Out',
    'Initial Bundle / Reassess',
    'Imaging',
    'Disposition',
];
