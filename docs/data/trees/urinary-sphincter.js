// MedKitt - Urinary Sphincter Emergencies
// Covers both acute urinary retention and incontinence emergencies with focus on
// neurogenic causes, cauda equina, spinal cord injury, and ED management.
// 6 modules: Presentation -> Etiology -> Evaluation -> Acute Retention Management -> Incontinence Emergencies -> Disposition
// ~32 nodes total.
export const URINARY_SPHINCTER_NODES = [
    // =====================================================================
    // MODULE 1: PRESENTATION
    // =====================================================================
    {
        id: 'sphincter-start',
        type: 'info',
        module: 1,
        title: 'Urinary Sphincter Emergencies',
        body: '**Urinary sphincter dysfunction** presents as either retention or incontinence. Both can signal life-threatening neurologic emergencies.\n\n**Key Principle:** Bladder dysfunction + back pain + leg symptoms = cauda equina until proven otherwise.\n\n**Normal voiding requires:**\n- Intact detrusor muscle contraction (parasympathetic S2-S4)\n- Coordinated sphincter relaxation (somatic S2-S4)\n- Patent urethra\n- Intact cortical inhibition\n\n**Two main presentations:**\n- **Retention:** Cannot empty bladder (obstructive or neurogenic)\n- **Incontinence:** Cannot control voiding (overflow, urge, or neurogenic)\n\n[IPSS Calculator](#/calc/ipss) - quantify symptom severity in stable patients.',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'ipss', label: 'IPSS (Prostate Symptom Score)' },
            { id: 'cauda-equina-red-flags', label: 'Cauda Equina Red Flags' },
        ],
        next: 'sphincter-presentation-type',
    },
    {
        id: 'sphincter-presentation-type',
        type: 'question',
        module: 1,
        title: 'Chief Complaint',
        body: '**Determine the primary presentation:**\n\n**Retention (cannot void):**\n- Suprapubic pain/fullness\n- Urge to void but unable\n- Dribbling without complete emptying\n- No urine output despite adequate intake\n\n**Incontinence (loss of control):**\n- Urge incontinence - sudden uncontrollable need\n- Overflow incontinence - constant dribbling\n- Functional incontinence - unable to reach toilet\n- Total incontinence - continuous leakage\n\n**Mixed presentation:**\n- Retention with overflow dribbling\n- New incontinence after failed voiding attempts',
        citation: [1, 2],
        options: [
            {
                label: 'Acute Retention',
                description: 'Cannot void, suprapubic fullness',
                next: 'sphincter-retention-neuro',
            },
            {
                label: 'New Onset Incontinence',
                description: 'Loss of bladder control',
                next: 'sphincter-incontinence-type',
            },
            {
                label: 'Mixed / Overflow',
                description: 'Retention with dribbling',
                next: 'sphincter-retention-neuro',
            },
        ],
    },
    {
        id: 'sphincter-incontinence-type',
        type: 'question',
        module: 1,
        title: 'Incontinence Classification',
        body: '**Types of urinary incontinence:**\n\n**Overflow incontinence:**\n- Bladder overdistention with passive leakage\n- Often neurogenic or obstructive\n- Palpable bladder, high PVR\n\n**Urge incontinence:**\n- Sudden, intense urge followed by involuntary loss\n- Detrusor overactivity\n- Often idiopathic, UTI, or neurologic\n\n**Stress incontinence:**\n- Leakage with cough, sneeze, exertion\n- Pelvic floor weakness\n- NOT typically an ED emergency\n\n**Neurogenic incontinence:**\n- Associated neurologic symptoms\n- Bladder + bowel dysfunction\n- Back pain, leg weakness, sensory changes\n\n[PVR Interpretation](#/info/pvr-interpretation)',
        citation: [1, 3],
        calculatorLinks: [
            { id: 'pvr-interpretation', label: 'Post-Void Residual Guide' },
        ],
        options: [
            {
                label: 'Overflow with high PVR',
                description: 'Palpable bladder, constant dribbling',
                next: 'sphincter-retention-neuro',
            },
            {
                label: 'Urge without neurologic signs',
                description: 'Sudden urge, no back pain or weakness',
                next: 'sphincter-urge-workup',
            },
            {
                label: 'Neurologic signs present',
                description: 'Back pain, weakness, saddle anesthesia, bowel changes',
                next: 'sphincter-cauda-equina',
                urgency: 'critical',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: ETIOLOGY
    // =====================================================================
    {
        id: 'sphincter-retention-neuro',
        type: 'question',
        module: 2,
        title: 'Neurologic Red Flags',
        body: '**Screen for emergent neurogenic causes FIRST:**\n\n**Cauda equina syndrome (CES):**\n- Saddle anesthesia (perineum, inner thighs)\n- Bilateral leg weakness or numbness\n- New bowel incontinence or constipation\n- Back pain (often severe, recent onset)\n- Bilateral sciatica\n\n**Spinal cord compression:**\n- Sensory level on exam\n- Upper motor neuron signs below lesion\n- History of malignancy\n\n**Conus medullaris syndrome:**\n- More symmetric, sudden onset\n- Mixed UMN/LMN signs\n- Early bowel/bladder dysfunction\n\n[Cauda Equina Red Flags](#/info/cauda-equina-red-flags)',
        citation: [2, 3, 4],
        calculatorLinks: [
            { id: 'cauda-equina-red-flags', label: 'Cauda Equina Checklist' },
        ],
        options: [
            {
                label: 'Neurologic red flags present',
                description: 'Saddle anesthesia, bilateral symptoms, bowel changes',
                next: 'sphincter-cauda-equina',
                urgency: 'critical',
            },
            {
                label: 'No neurologic red flags',
                description: 'Isolated retention without neuro symptoms',
                next: 'sphincter-etiology',
            },
        ],
    },
    {
        id: 'sphincter-etiology',
        type: 'question',
        module: 2,
        title: 'Non-Neurogenic Etiologies',
        body: '**Common causes of acute urinary retention:**\n\n**Obstructive (most common in men):**\n- BPH - gradual LUTS, nocturia, weak stream\n- Urethral stricture - history of STI, trauma, instrumentation\n- Prostate cancer - hard nodular prostate on DRE\n- Bladder neck obstruction\n\n**Medication-induced:**\n- Anticholinergics (antihistamines, TCAs, antipsychotics)\n- Opioids (common post-operative)\n- Alpha-agonists (decongestants)\n- Benzodiazepines\n- Anesthesia (post-procedural)\n\n**Infectious:**\n- Acute prostatitis - fever, tender prostate\n- Severe UTI\n- Genital herpes (sacral radiculitis)\n\n**Post-operative:**\n- Especially after pelvic/spinal surgery\n- Often multifactorial (anesthesia + opioids + positioning)\n\n[Medication Reference](#/info/retention-meds)',
        citation: [1, 5],
        calculatorLinks: [
            { id: 'retention-meds', label: 'Medication-Induced Retention' },
        ],
        options: [
            {
                label: 'BPH likely',
                description: 'Older male, LUTS history, enlarged prostate',
                next: 'sphincter-evaluation',
            },
            {
                label: 'Medication-induced',
                description: 'Recent medication change or post-procedural',
                next: 'sphincter-evaluation',
            },
            {
                label: 'Infectious cause',
                description: 'Fever, dysuria, tender prostate',
                next: 'sphincter-infection',
            },
            {
                label: 'Post-operative',
                description: 'Within 24-72h of surgery',
                next: 'sphincter-postop',
            },
        ],
    },
    {
        id: 'sphincter-infection',
        type: 'info',
        module: 2,
        title: 'Infectious Causes',
        body: '**Acute bacterial prostatitis:**\n- Fever, chills, perineal pain\n- Exquisitely tender, boggy prostate on DRE\n- Do NOT massage prostate (bacteremia risk)\n- UA: pyuria, bacteriuria\n- Treatment: fluoroquinolone or TMP-SMX x 4-6 weeks\n\n**Severe UTI with retention:**\n- Inflammation may cause transient obstruction\n- Catheterize AND treat infection\n\n**Genital herpes (HSV):**\n- Sacral radiculitis causing urinary retention\n- Often with genital lesions, but not always\n- Consider in young patients without other cause\n- May need catheter until lesions resolve\n\n**Periurethral abscess:**\n- Severe perineal pain, fluctuance\n- Surgical drainage required',
        citation: [1, 5],
        treatment: {
            firstLine: {
                drug: 'Ciprofloxacin',
                dose: '500 mg',
                route: 'PO',
                frequency: 'BID',
                duration: '4-6 weeks for prostatitis',
                notes: 'Fluoroquinolones achieve good prostatic penetration',
            },
            alternative: {
                drug: 'TMP-SMX DS',
                dose: '160/800 mg',
                route: 'PO',
                frequency: 'BID',
                duration: '4-6 weeks for prostatitis',
                notes: 'Alternative if fluoroquinolone contraindicated',
            },
            monitoring: 'Culture-directed therapy. Urology follow-up. Repeat UA in 2-4 weeks.',
        },
        next: 'sphincter-evaluation',
    },
    {
        id: 'sphincter-postop',
        type: 'info',
        module: 2,
        title: 'Post-Operative Retention',
        body: '**Post-operative urinary retention (POUR):**\n\nIncidence: 5-70% depending on procedure type.\n\n**Risk factors:**\n- Age >60\n- Male sex\n- Pre-existing BPH/LUTS\n- Pelvic/anorectal surgery\n- Spinal anesthesia (especially with morphine)\n- Opioid use\n- Large volume IV fluids\n- Duration of surgery >2 hours\n\n**Management:**\n1. Bladder scan - confirm >300-400 mL\n2. Single in-out catheterization often sufficient\n3. If persistent: Foley catheter x 24-48h\n4. Start tamsulosin if BPH history\n5. Minimize opioids, discontinue anticholinergics\n\n**When to worry:**\n- Persistent >48h despite catheter\n- Neurologic symptoms (rule out epidural hematoma if spinal surgery)\n- Associated abdominal distension (ileus)',
        citation: [1, 6],
        next: 'sphincter-evaluation',
    },
    // =====================================================================
    // MODULE 3: EVALUATION
    // =====================================================================
    {
        id: 'sphincter-evaluation',
        type: 'info',
        module: 3,
        title: 'ED Evaluation',
        body: '**History:**\n- Duration and onset of symptoms\n- Associated pain, fever, neurologic symptoms\n- Medication list (anticholinergics, opioids, alpha-agonists)\n- Surgical history (especially pelvic, spinal)\n- Prior episodes of retention\n- Baseline urinary function (LUTS, nocturia)\n\n**Physical exam:**\n- Abdomen: palpable bladder, suprapubic tenderness\n- GU: urethral meatus (blood, discharge), phimosis\n- Rectal: prostate size, tenderness, nodularity, tone\n- Neurologic: perineal sensation, anal wink, leg strength/sensation\n\n**Bedside testing:**\n- Bladder ultrasound (PVR) - most important\n- Urinalysis\n\n**Labs if indicated:**\n- BMP (if high-volume retention or AKI concern)\n- PSA (not emergent, discuss with urology)\n- CBC, blood cultures if septic\n\n[PVR Interpretation](#/info/pvr-interpretation)',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'pvr-interpretation', label: 'PVR Interpretation' },
        ],
        next: 'sphincter-neuro-exam',
    },
    {
        id: 'sphincter-neuro-exam',
        type: 'info',
        module: 3,
        title: 'Neurologic Examination',
        body: '**Focused neuro exam for bladder dysfunction:**\n\n**Sensory:**\n- Perineal/saddle sensation (S2-S4)\n- Perianal sensation\n- Lower extremity dermatomes\n\n**Motor:**\n- Bilateral leg strength (hip flexion, knee extension, ankle dorsiflexion)\n- Toe walking and heel walking\n\n**Reflexes:**\n- Patellar (L3-L4)\n- Achilles (S1-S2)\n- Bulbocavernosus reflex (S2-S4): squeeze glans/clitoris, feel anal sphincter contract\n- Anal wink (S2-S4): stroke perianal skin, observe sphincter contraction\n\n**Absent bulbocavernosus + absent anal wink = sacral nerve dysfunction**\n\n**Rectal exam:**\n- Anal tone (decreased in cauda equina)\n- Voluntary squeeze\n- Prostate assessment\n\n**Imaging indications:**\n- Any neurologic findings: emergent MRI lumbar spine\n- Post-traumatic: CT first, then MRI\n- History of malignancy: MRI whole spine',
        citation: [2, 4],
        next: 'sphincter-pvr',
    },
    {
        id: 'sphincter-pvr',
        type: 'question',
        module: 3,
        title: 'Post-Void Residual',
        body: '**Post-void residual (PVR) measurement:**\n\nPerform bedside bladder ultrasound.\n\n**Interpretation:**\n- **<50 mL:** Normal\n- **50-100 mL:** Equivocal, repeat if symptomatic\n- **100-200 mL:** Elevated, suggests incomplete emptying\n- **200-300 mL:** Significant retention, needs intervention\n- **>300 mL:** Definite retention, catheterize\n- **>1000 mL:** High volume, monitor for post-obstructive diuresis\n\n**If unable to void at all:**\nPVR = total bladder volume\n\n**Note:** In overflow incontinence, patient may void small amounts frequently but PVR remains elevated (>200 mL).\n\n[PVR Interpretation Guide](#/info/pvr-interpretation)',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'pvr-interpretation', label: 'PVR Guide' },
        ],
        options: [
            {
                label: 'PVR <100 mL',
                description: 'Normal emptying, reassess symptoms',
                next: 'sphincter-low-pvr',
            },
            {
                label: 'PVR 100-300 mL',
                description: 'Incomplete emptying',
                next: 'sphincter-cath-technique',
            },
            {
                label: 'PVR >300 mL',
                description: 'Definite retention - catheterize',
                next: 'sphincter-cath-technique',
            },
            {
                label: 'PVR >1000 mL',
                description: 'High volume - POD risk',
                next: 'sphincter-high-volume',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'sphincter-low-pvr',
        type: 'info',
        module: 3,
        title: 'Low PVR - Reassess',
        body: '**PVR <100 mL suggests adequate emptying.**\n\nIf patient still symptomatic, consider:\n\n**Urinary urgency without retention:**\n- UTI/cystitis\n- Overactive bladder\n- Interstitial cystitis\n- Bladder tumor (rare)\n\n**Incomplete emptying sensation:**\n- May be false sensation with prostatitis\n- Psychogenic\n\n**Workup:**\n- Urinalysis and culture\n- If hematuria: consider CT urogram, cystoscopy referral\n\n**Disposition:**\n- Treat underlying cause (UTI, etc.)\n- Urology referral if persistent symptoms\n- No catheter needed if PVR normal',
        recommendation: 'PVR normal. Treat underlying cause. Urology follow-up if symptoms persist.',
        confidence: 'recommended',
        citation: [1],
    },
    {
        id: 'sphincter-high-volume',
        type: 'info',
        module: 3,
        title: 'High-Volume Retention',
        body: '**PVR >1000 mL - increased risk of complications:**\n\n**Obtain labs:**\n- BMP (creatinine often elevated in chronic retention)\n- UA and culture\n\n**Complications to monitor:**\n\n**Post-obstructive diuresis (POD):**\n- Definition: >200 mL/hr x 2+ hours OR >3L in 24h\n- Risk factors: bilateral obstruction, AKI, CHF\n- Management: replace 50-75% of output (NOT 100%)\n\n**Hematuria ex vacuo:**\n- Brief bleeding after rapid decompression\n- Usually self-limited\n- Does NOT require clamping\n\n**Myth debunked:** Rapid drainage is safe. No evidence supports clamping at intervals. Complete drainage does NOT increase complications. [7]',
        citation: [1, 7],
        next: 'sphincter-cath-technique',
    },
    // =====================================================================
    // MODULE 4: ACUTE RETENTION MANAGEMENT
    // =====================================================================
    {
        id: 'sphincter-cath-technique',
        type: 'info',
        module: 4,
        title: 'Catheterization Technique',
        body: '**Standard Foley catheter insertion:**\n\n**Sizing:**\n- Standard adult: 16-18 Fr\n- Hematuria with clots: 20-22 Fr\n- Suspected stricture: 14 Fr\n\n**Coude tip catheter:**\nCurved tip (15-30 degrees) navigates elevated bladder neck.\nRecommended first-line in older men with suspected BPH.\nEnsure curve points UP (toward ceiling).\n\n**Technique:**\n1. Sterile prep and drape\n2. Liberal lubrication (lidocaine jelly 2%, 10-20 mL, wait 5 min)\n3. In uncircumcised men: retract foreskin, REPLACE after insertion\n4. Insert to hub before inflating balloon\n5. Inflate balloon with 10 mL sterile water\n6. Gently withdraw until resistance\n\n[Catheter Sizing Guide](#/info/catheter-sizing)',
        citation: [1, 8],
        calculatorLinks: [
            { id: 'catheter-sizing', label: 'Catheter Sizing Guide' },
        ],
        next: 'sphincter-cath-result',
    },
    {
        id: 'sphincter-cath-result',
        type: 'question',
        module: 4,
        title: 'Catheterization Result',
        body: '**Assess catheterization success:**\n\n**Successful catheterization:**\n- Urine drains immediately\n- Patient experiences relief\n- Document initial volume\n\n**Signs of difficulty:**\n- Resistance at prostatic urethra (try Coude)\n- False passage (blood without urine)\n- Complete obstruction',
        citation: [1, 8],
        options: [
            {
                label: 'Successful - urine draining',
                description: 'Catheter in place, draining well',
                next: 'sphincter-alpha-blocker',
            },
            {
                label: 'Failed - unable to pass',
                description: 'Multiple attempts failed',
                next: 'sphincter-failed-cath',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'sphincter-alpha-blocker',
        type: 'info',
        module: 4,
        title: 'Alpha-Blocker Therapy',
        body: '**Start alpha-blocker AT TIME OF CATHETERIZATION**\n\n[Tamsulosin](#/drug/tamsulosin/urinary retention) 0.4 mg PO daily\n\n**Why start immediately?**\n- Improves trial without catheter (TWOC) success\n- TWOC success: 26% without vs 48% with alpha-blocker (OR 2.47) [9]\n- Some effect within 4-8 hours\n- Optimal benefit after 3-7 days\n\n**Mechanism:** Relaxes smooth muscle at bladder neck and prostate (alpha-1A selective).\n\n**Side effects:**\n- Orthostatic hypotension (less than non-selective agents)\n- Retrograde ejaculation\n- Floppy iris syndrome (inform ophthalmologist if cataract surgery planned)\n\n**Alternative alpha-blockers:**\n- Alfuzosin 10 mg daily\n- Silodosin 8 mg daily\n- Doxazosin 4-8 mg daily (more hypotension)',
        citation: [1, 9],
        treatment: {
            firstLine: {
                drug: 'Tamsulosin',
                dose: '0.4 mg',
                route: 'PO',
                frequency: 'Daily',
                duration: 'Until TWOC and urology follow-up',
                notes: 'Take 30 min after same meal daily. Start at time of catheterization.',
            },
            alternative: {
                drug: 'Alfuzosin',
                dose: '10 mg',
                route: 'PO',
                frequency: 'Daily',
                duration: 'Until TWOC',
                notes: 'Take after same meal daily. Similar efficacy to tamsulosin.',
            },
            monitoring: 'Blood pressure monitoring. TWOC attempt in 3-7 days.',
        },
        next: 'sphincter-5ari',
    },
    {
        id: 'sphincter-5ari',
        type: 'info',
        module: 4,
        title: '5-Alpha Reductase Inhibitors',
        body: '**5-Alpha reductase inhibitors (5-ARIs):**\n\n[Finasteride](#/drug/finasteride/bph) 5 mg daily\n[Dutasteride](#/drug/dutasteride/bph) 0.5 mg daily\n\n**NOT helpful acutely** - effect takes 3-6 months.\n\n**Mechanism:** Blocks conversion of testosterone to DHT, causing prostate shrinkage (20-30% reduction over 6-12 months).\n\n**When to consider:**\n- Large prostate (>40 mL)\n- Recurrent retention episodes\n- PSA >1.5 ng/mL\n\n**Typically started by urology**, not in ED.\n\n**Side effects:**\n- Sexual dysfunction (decreased libido, ED)\n- Decreased ejaculate volume\n- Gynecomastia (rare)\n- Lowers PSA by ~50% (inform urologist)\n\n[Bethanechol](#/drug/bethanechol/urinary retention) - cholinergic agent for atonic bladder, rarely used acutely.',
        citation: [1, 10],
        next: 'sphincter-dispo-decision',
    },
    {
        id: 'sphincter-failed-cath',
        type: 'info',
        module: 4,
        title: 'Failed Catheterization',
        body: '**Standard catheter failed - escalation pathway:**\n\n**Step 1: Coude catheter**\n- Curved tip navigates BPH\n- Ensure curve points UP\n\n**Step 2: Additional techniques**\n- More lubrication\n- Larger catheter (paradoxically easier sometimes)\n- Smaller catheter over guidewire (Seldinger)\n\n**Step 3: Urology consult**\n- Flexible cystoscopy with guidewire placement\n- Suprapubic catheter if urethral route impossible\n\n**Suprapubic catheter indications:**\n- Urethral stricture not amenable to dilation\n- Urethral trauma\n- Multiple failed urethral attempts\n- Known complex anatomy\n\n**While awaiting urology:**\n- Pain management\n- Do NOT make repeated blind attempts (false passage risk)\n- Bladder scan to confirm distension',
        citation: [1, 8],
        treatment: {
            firstLine: {
                drug: 'Tamsulosin',
                dose: '0.4 mg',
                route: 'PO',
                frequency: 'Daily',
                duration: 'Start now, continue post-procedure',
                notes: 'Give while awaiting urology. Will help with eventual TWOC.',
            },
            monitoring: 'Urology consult STAT. Pain management. Avoid further blind attempts.',
        },
        next: 'sphincter-dispo-decision',
    },
    // =====================================================================
    // MODULE 5: INCONTINENCE EMERGENCIES
    // =====================================================================
    {
        id: 'sphincter-cauda-equina',
        type: 'info',
        module: 5,
        title: 'Cauda Equina Syndrome',
        body: '**SURGICAL EMERGENCY - Time to decompression matters**\n\n**Classic triad (often incomplete):**\n1. Saddle anesthesia\n2. Bladder dysfunction (retention > incontinence)\n3. Bilateral leg weakness/sciatica\n\n**Additional features:**\n- Severe low back pain\n- Decreased anal tone\n- Fecal incontinence\n- Sexual dysfunction\n\n**Immediate actions:**\n1. Foley catheter for bladder decompression\n2. **EMERGENT MRI lumbar spine** (gold standard)\n3. Neurosurgery consult STAT\n4. If malignancy/abscess suspected: Dexamethasone 10 mg IV\n5. NPO for likely OR\n\n**Timing matters:**\n- Decompression within 48 hours: better outcomes\n- Decompression <24 hours: best chance of recovery\n- Bladder function recovery worst of all deficits\n\n[Cauda Equina Red Flags](#/info/cauda-equina-red-flags)',
        citation: [2, 4],
        calculatorLinks: [
            { id: 'cauda-equina-red-flags', label: 'CES Red Flag Checklist' },
        ],
        treatment: {
            firstLine: {
                drug: 'Dexamethasone',
                dose: '10 mg',
                route: 'IV',
                frequency: 'Once',
                duration: 'Single dose',
                notes: 'Give if malignancy or epidural abscess suspected. Reduces cord edema.',
                confidence: 'critical',
            },
            monitoring: 'Emergent MRI. Neurosurgery consult. Serial neuro exams. Foley catheter.',
        },
        next: 'sphincter-ces-imaging',
    },
    {
        id: 'sphincter-ces-imaging',
        type: 'result',
        module: 5,
        title: 'CES - Emergent MRI',
        body: '**MRI lumbar spine WITHOUT contrast (unless infection/tumor suspected)**\n\n**Findings in cauda equina:**\n- Large central disc herniation (most common cause)\n- Spinal stenosis\n- Epidural abscess\n- Epidural hematoma\n- Tumor/metastasis\n\n**If MRI unavailable:**\n- CT myelogram (invasive but diagnostic)\n- Transfer to facility with MRI and neurosurgery\n\n**Do NOT delay imaging** for any other workup.\n\n**Disposition:**\n- Emergent neurosurgery if surgical lesion\n- ICU admission for close monitoring\n- If imaging negative but high clinical suspicion: repeat in 24-48h or thoracic MRI\n\n**Prognosis:**\n- Bladder function: worst recovery\n- Motor function: moderate recovery\n- Sensory function: best recovery',
        recommendation: 'Emergent MRI lumbar spine. Neurosurgery consult. Foley catheter. NPO for likely OR. Time-critical surgical decompression.',
        confidence: 'definitive',
        citation: [2, 4],
    },
    {
        id: 'sphincter-cord-compression',
        type: 'info',
        module: 5,
        title: 'Spinal Cord Compression',
        body: '**Upper motor neuron bladder (suprasacral lesion):**\n\n**Presentation:**\n- Urinary urgency and frequency (early)\n- Urge incontinence\n- Retention (later, detrusor-sphincter dyssynergia)\n- Associated sensory level, spasticity\n\n**Causes:**\n- Metastatic disease (most common)\n- Trauma\n- Epidural abscess\n- Demyelinating disease (MS, transverse myelitis)\n- Vascular (spinal cord infarct)\n\n**Management:**\n- MRI entire spine if malignancy suspected\n- Dexamethasone 10 mg IV if malignancy/abscess\n- Oncology, neurosurgery, radiation oncology consults\n- Foley catheter for retention\n\n**Malignant cord compression:**\n- Dexamethasone 10 mg IV then 4 mg q6h\n- Emergent radiation therapy\n- Surgical decompression if radioresistant tumor or spinal instability',
        citation: [2, 3],
        treatment: {
            firstLine: {
                drug: 'Dexamethasone',
                dose: '10 mg IV, then 4 mg q6h',
                route: 'IV',
                frequency: 'q6h after loading dose',
                duration: 'Until definitive treatment',
                notes: 'For malignant cord compression. Reduces edema.',
                confidence: 'critical',
            },
            monitoring: 'MRI whole spine. Oncology, neurosurgery, radiation oncology consults. Serial neuro exams.',
        },
        next: 'sphincter-dispo-decision',
    },
    {
        id: 'sphincter-urge-workup',
        type: 'info',
        module: 5,
        title: 'Urge Incontinence Workup',
        body: '**New urge incontinence without neurologic signs:**\n\n**Most common causes:**\n- UTI (most common in ED)\n- Overactive bladder\n- Bladder irritation (tumor, stone, foreign body)\n- Diabetes (polyuria)\n- Medication effect\n\n**ED workup:**\n- Urinalysis and culture\n- Bladder scan (rule out overflow)\n- Glucose if diabetic symptoms\n\n**If UTI confirmed:**\n- Treat with appropriate antibiotics\n- Symptoms should resolve within 48-72h\n- If persistent: urology referral\n\n**Red flags requiring imaging:**\n- Hematuria\n- Pelvic mass\n- History of GU malignancy\n- Failed empiric treatment\n\n**Disposition:**\n- Most can be discharged with antibiotics and PCP follow-up\n- Urology referral if recurrent or refractory',
        recommendation: 'UA and culture. Treat UTI if present. PCP follow-up. Urology if persistent or red flags.',
        confidence: 'recommended',
        citation: [1, 3],
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'sphincter-dispo-decision',
        type: 'question',
        module: 6,
        title: 'Disposition Decision',
        body: '**Determine appropriate disposition:**\n\n**Admission criteria:**\n- Neurologic emergency (CES, cord compression)\n- Post-obstructive diuresis with electrolyte abnormalities\n- AKI (elevated creatinine)\n- Sepsis/urosepsis\n- Failed catheterization requiring procedure\n- Unable to manage catheter at home\n\n**Observation criteria:**\n- High-volume retention monitoring for POD\n- Borderline renal function\n\n**Discharge criteria:**\n- Successful catheterization\n- Stable renal function\n- No POD\n- Reliable follow-up\n- Able to manage catheter',
        citation: [1, 2],
        options: [
            {
                label: 'Neurologic emergency',
                description: 'CES, cord compression',
                next: 'sphincter-admit-neuro',
                urgency: 'critical',
            },
            {
                label: 'POD or AKI',
                description: 'High output or elevated creatinine',
                next: 'sphincter-admit-medical',
                urgency: 'urgent',
            },
            {
                label: 'Stable for discharge',
                description: 'Successful cath, stable labs, reliable follow-up',
                next: 'sphincter-discharge',
            },
        ],
    },
    {
        id: 'sphincter-admit-neuro',
        type: 'result',
        module: 6,
        title: 'Admit - Neurologic Emergency',
        body: '**Neurologic emergency requiring admission:**\n\n**Cauda equina syndrome:**\n- ICU or step-down for close monitoring\n- Foley catheter in place\n- Neurosurgery primary service\n- Serial neuro exams q2-4h\n- NPO for likely surgery\n\n**Spinal cord compression:**\n- Oncology, neurosurgery, radiation oncology involved\n- Continue dexamethasone\n- Arrange emergent radiation if indicated\n\n**Prognostic discussion:**\n- Bladder function has worst prognosis for recovery\n- Motor function often improves with early decompression\n- Time to surgery correlates with outcomes\n\n**Post-operative expectations:**\n- May need long-term catheterization\n- Intermittent self-catheterization training\n- Urology follow-up for urodynamics',
        recommendation: 'Admit to ICU/step-down. Neurosurgery primary. Emergent decompression. Serial neuro exams.',
        confidence: 'definitive',
        citation: [2, 4],
    },
    {
        id: 'sphincter-admit-medical',
        type: 'result',
        module: 6,
        title: 'Admit - Medical Management',
        body: '**Admission for POD or AKI:**\n\n**Post-obstructive diuresis management:**\n- I/O q2h\n- Replace 50-75% of hourly urine output with 0.45% NS\n- Do NOT replace 100% (perpetuates diuresis)\n- BMP q12-24h (monitor Na, K, Mg, Phos)\n- Nephrology consult if refractory >48h\n\n**AKI management:**\n- Serial creatinine monitoring\n- Avoid nephrotoxins\n- Adequate hydration\n- Urology involvement for etiology\n\n**Expected course:**\n- Physiologic POD resolves in ~24h\n- Pathologic POD may persist >48h\n- Creatinine often improves rapidly after decompression\n\n**Urology consult:**\n- TWOC planning\n- Long-term management strategy\n- Consider urodynamics once stable',
        recommendation: 'Admit for monitoring. Replace 50-75% urine output. BMP q12-24h. Urology and nephrology as needed.',
        confidence: 'recommended',
        citation: [1, 7],
        treatment: {
            firstLine: {
                drug: '0.45% NS',
                dose: '50-75% of hourly urine output',
                route: 'IV',
                frequency: 'Hourly based on UOP',
                duration: 'Until POD resolves',
                notes: 'Do NOT replace 100% - this perpetuates diuresis.',
            },
            monitoring: 'I/O q2h. BMP with Mg/Phos q12-24h. Daily weights. Serial creatinine.',
        },
    },
    {
        id: 'sphincter-discharge',
        type: 'result',
        module: 6,
        title: 'Discharge with Foley',
        body: '**Discharge instructions:**\n\n**Medications:**\n- [Tamsulosin](#/drug/tamsulosin/urinary retention) 0.4 mg PO daily (30 min after same meal)\n- Continue any other prescribed medications\n\n**Catheter care:**\n- Keep drainage bag below bladder level\n- Empty bag when 2/3 full\n- Use leg bag during day, drainage bag at night\n- Clean connection with alcohol when switching\n- Increase fluid intake\n- Shower OK after 24h, no baths\n\n**Return immediately if:**\n- Fever or chills\n- No urine draining (blocked catheter)\n- Significant bleeding with clots\n- Catheter falls out\n- Severe pain not relieved by medication\n- Leg weakness, numbness, or bowel changes\n\n**Follow-up:**\n- Urology in 3-7 days for TWOC\n- Sooner if symptoms worsen\n\n**TWOC success factors:**\n- Alpha-blocker pretreatment (3+ days optimal)\n- Younger age, lower initial volume\n- Identifiable reversible cause',
        recommendation: 'Discharge with Foley. Tamsulosin 0.4 mg daily. Urology follow-up in 3-7 days for TWOC. Strict return precautions.',
        confidence: 'definitive',
        citation: [1, 9],
        treatment: {
            firstLine: {
                drug: 'Tamsulosin',
                dose: '0.4 mg',
                route: 'PO',
                frequency: 'Daily',
                duration: 'Continue until urology follow-up',
                notes: 'Take 30 min after same meal. Improves TWOC success.',
            },
            monitoring: 'Return for fever, blocked catheter, catheter dislodgement, neurologic symptoms.',
        },
    },
];
export const URINARY_SPHINCTER_NODE_COUNT = URINARY_SPHINCTER_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const URINARY_SPHINCTER_MODULE_LABELS = [
    'Presentation',
    'Etiology',
    'Evaluation',
    'Acute Retention Management',
    'Incontinence Emergencies',
    'Disposition',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const URINARY_SPHINCTER_CITATIONS = [
    { num: 1, text: 'American Urological Association (AUA). Surgical Management of Lower Urinary Tract Symptoms Attributed to Benign Prostatic Hyperplasia. AUA Guideline. 2023.' },
    { num: 2, text: 'Long B, et al. Evaluation and Management of Cauda Equina Syndrome in the Emergency Department. J Emerg Med. 2020;58(5):723-729. PMID: 32111479' },
    { num: 3, text: 'European Association of Urology (EAU). Guidelines on Neurogenic Lower Urinary Tract Dysfunction. EAU Guidelines. 2024.' },
    { num: 4, text: 'Todd NV. Guidelines for cauda equina syndrome: red flags and white flags. Systematic review and implications for triage. Br J Neurosurg. 2017;31(3):336-339. PMID: 28426256' },
    { num: 5, text: 'Selius BA, Subedi R. Urinary Retention in Adults: Diagnosis and Initial Management. Am Fam Physician. 2008;77(5):643-650. PMID: 18350762' },
    { num: 6, text: 'Baldini G, et al. Postoperative Urinary Retention: Anesthetic and Perioperative Considerations. Anesthesiology. 2009;110(5):1139-1157. PMID: 19352147' },
    { num: 7, text: 'Boettcher S, et al. Urinary retention: rapid drainage or gradual drainage to avoid complications? A systematic review. Ann Emerg Med. 2013;61(5):523-528. PMID: 23290526' },
    { num: 8, text: 'Davis NF, et al. Suprapubic versus transurethral bladder catheterization. Acad Emerg Med. 2018;25(9):983-989. PMID: 29665121' },
    { num: 9, text: 'Fitzpatrick JM, et al. Management of acute urinary retention: a worldwide survey of 6074 men with BPH. BJU Int. 2012;109(1):88-95. PMID: 21592297' },
    { num: 10, text: 'McConnell JD, et al. Medical Therapy of Prostatic Symptoms (MTOPS) Research Group. N Engl J Med. 2003;349(25):2387-2398. PMID: 14681504' },
];
