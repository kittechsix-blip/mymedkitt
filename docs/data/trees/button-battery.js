// MedKitt — Button Battery Ingestion
// Assessment → Esophageal → Gastric → Distal → Complications → Disposition
export const BUTTON_BATTERY_MODULE_LABELS = [
    'Initial Assessment',
    'Esophageal Battery',
    'Gastric Battery',
    'Distal Battery',
    'Complications',
    'Disposition',
];
export const BUTTON_BATTERY_CITATIONS = [
    { num: 1, text: 'National Capital Poison Center. Button Battery Ingestion Triage and Treatment Guideline. 2024.' },
    { num: 2, text: 'Anfang RR, et al. pH-neutralizing esophageal irrigations as a novel mitigation strategy for button battery injury. Laryngoscope. 2019;129(1):49-57.' },
    { num: 3, text: 'Kramer RE, et al. Management of ingested foreign bodies in children: a clinical report. Pediatrics. 2015;135(2):e576-e592.' },
    { num: 4, text: 'Litovitz T, et al. Emerging battery-ingestion hazard: clinical implications. Pediatrics. 2010;125(6):1168-1177.' },
    { num: 5, text: 'Jatana KR, et al. Basic science and clinical research supporting honey as a treatment for button battery ingestion. Laryngoscope. 2020;130(3):730-738.' },
    { num: 6, text: 'Eliason MJ, et al. Button battery ingestion in children: a clinical update. Pediatr Emerg Care. 2021;37(12):e1431-e1436.' },
    { num: 7, text: 'Krom H, et al. Serious complications after button battery ingestion in children. Eur J Pediatr. 2018;177(7):1063-1070.' },
    { num: 8, text: 'CPSC Safety Standard for Button Cell Batteries. Federal Register. 2024.' },
];
export const BUTTON_BATTERY_NODES = [
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 0 — Initial Assessment
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'battery-start',
        type: 'question',
        module: 0,
        title: 'Button Battery Ingestion — Initial Assessment',
        body: `**Critical Time Window:**
- Esophageal tissue injury begins within **15 minutes**
- Esophageal batteries must be removed within **2 hours** (ideally)
- Aortoesophageal fistula can occur up to **28 days** post-removal

**High-Risk Batteries:**
- Lithium coin cells (3V) — most dangerous
- ≥20mm diameter — highest risk for esophageal impaction
- ≥15mm in children <6 years — high risk

**Immediate Actions:**
1. Obtain **STAT X-ray** (AP + lateral: head, neck, chest, abdomen)
2. Keep **NPO** until esophageal position ruled out
3. Battery hotline: **1-800-498-8666** (24/7)

**Radiographic Signs:**
- "Double-rim" or "halo" on AP view
- "Step-off" on lateral view (distinguishes from coin)`,
        citation: [1, 4],
        options: [
            { label: 'Battery in ESOPHAGUS', next: 'battery-esophageal' },
            { label: 'Battery in STOMACH', next: 'battery-gastric' },
            { label: 'Battery DISTAL to stomach', next: 'battery-distal' },
            { label: 'Unknown — patient symptomatic', next: 'battery-symptomatic' },
        ],
        calculatorLinks: [
            { id: 'battery-risk-stratification', label: 'Battery Risk Stratification' },
        ],
    },
    {
        id: 'battery-symptomatic',
        type: 'info',
        module: 0,
        title: 'Symptomatic Battery Ingestion',
        body: `**Red Flag Symptoms:**
- Drooling, dysphagia, odynophagia
- Chest pain, substernal discomfort
- Vomiting (especially hematemesis)
- Stridor, respiratory distress
- Refusal to eat
- Fever (suggests mediastinitis)

**If symptomatic + battery NOT visible on X-ray:**
- Consider CT with contrast
- Battery may have passed but caused injury

**Immediate Management:**
- IV access, NPO
- Emergent GI/ENT consultation
- Do NOT induce vomiting
- Prepare for emergent endoscopy`,
        citation: [1, 6],
        next: 'battery-start',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 1 — Esophageal Battery (EMERGENT)
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'battery-esophageal',
        type: 'info',
        module: 1,
        title: 'ESOPHAGEAL BATTERY — EMERGENT',
        body: `**This is a TIME-CRITICAL emergency.**

**Target: Remove within 2 hours (maximum 12 hours)**

**Pre-Endoscopy Protection (if <12 hours from ingestion):**

**Honey Protocol (age ≥12 months):**
- **10 mL orally every 10 minutes × 6 doses**
- Use commercial honey only
- Delays tissue injury but does NOT prevent it

**Sucralfate Protocol (ED):**
- **1 g (10 mL suspension) PO every 10 minutes × 3 doses**
- Alternative to honey

**CONTRAINDICATIONS to Honey/Sucralfate:**
- Age <12 months (aspiration risk)
- Suspected perforation or mediastinitis
- Battery >12 hours in esophagus
- Dysphagia preventing safe swallowing`,
        citation: [1, 2, 5],
        next: 'battery-esophageal-removal',
    },
    {
        id: 'battery-esophageal-removal',
        type: 'info',
        module: 1,
        title: 'Emergent Endoscopic Removal',
        body: `**Removal Considerations:**

**Location:**
- Operating room preferred over endoscopy suite
- Allows rapid conversion to open surgery if needed
- Better imaging capability

**Team:**
- GI/ENT for endoscopy
- Anesthesia
- Cardiothoracic surgery on standby
- Pediatric surgery available

**Technique:**
- Gentle removal to minimize additional trauma
- Inspect for perforation after removal
- Do NOT delay for NPO status

**Post-Removal:**
- Admit for observation (minimum 24-48 hours)
- Monitor for delayed complications
- CTA chest if mid-esophageal impaction (AEF risk)
- NPO initially → clear liquids when stable`,
        citation: [1, 7],
        next: 'battery-complications',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 2 — Gastric Battery
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'battery-gastric',
        type: 'question',
        module: 2,
        title: 'Gastric Battery — Risk Assessment',
        body: `**Risk Stratification for Gastric Batteries:**

**HIGH RISK (Consider early endoscopy):**
- Age <6 years AND battery ≥15mm
- Battery ≥20mm (any age)
- Symptomatic patient
- Co-ingested magnet

**LOW RISK (Observation acceptable):**
- Age ≥12 years AND battery ≤12mm
- Asymptomatic
- No magnet co-ingestion
- Reliable caregiver for follow-up

**Medium Risk:**
- Age 6-12 years OR battery 12-15mm
- Requires closer monitoring`,
        citation: [1, 3],
        options: [
            { label: 'High Risk — Age <6 OR battery ≥15mm', next: 'battery-gastric-high' },
            { label: 'Low Risk — Age ≥12 AND battery ≤12mm', next: 'battery-gastric-low' },
            { label: 'Battery ≥20mm', next: 'battery-gastric-20mm' },
        ],
        calculatorLinks: [
            { id: 'battery-risk-stratification', label: 'Battery Risk Stratification' },
        ],
    },
    {
        id: 'battery-gastric-high',
        type: 'info',
        module: 2,
        title: 'High-Risk Gastric Battery',
        body: `**Management: Age <6 years OR Battery ≥15mm**

**Initial:**
- Asymptomatic: can observe initially
- Symptomatic: consult GI for early removal

**Follow-Up Imaging:**
- Repeat X-ray at **Day 4**
- If still in stomach at Day 4: **endoscopic removal recommended**

**Discharge Instructions:**
- Normal diet/activity
- Return for: vomiting, abdominal pain, bloody stool, fever
- Inspect stools for battery passage
- Follow-up arranged for Day 4 imaging

**Mucosal Injury Window:**
- Gastric mucosal damage can occur within 48-96 hours
- Early removal reduces injury risk`,
        citation: [1, 6],
        next: 'battery-disposition',
    },
    {
        id: 'battery-gastric-low',
        type: 'info',
        module: 2,
        title: 'Low-Risk Gastric Battery',
        body: `**Management: Age ≥12 years AND Battery ≤12mm**

**Home Observation:**
- Normal diet and activity
- Inspect stools for battery passage
- No need for inpatient observation

**Follow-Up Imaging:**
- If passage not confirmed by **Day 10-14**: repeat X-ray
- Most batteries pass within 4-7 days

**Return Precautions:**
- Abdominal pain
- Vomiting
- Black or bloody stools
- Fever
- Decreased appetite

**No Intervention Needed If:**
- Asymptomatic throughout
- Battery confirmed passed in stool`,
        citation: [1, 3],
        next: 'battery-disposition',
    },
    {
        id: 'battery-gastric-20mm',
        type: 'info',
        module: 2,
        title: 'Large Battery ≥20mm in Stomach',
        body: `**Urgent Concern — Battery ≥20mm**

**Initial Management:**
- GI consultation for endoscopy consideration
- Higher risk of mucosal injury

**Follow-Up:**
- Repeat X-ray at **48 hours**
- If not progressing past pylorus: **remove endoscopically**
- If progressed to duodenum: follow distal protocol

**Rationale:**
- Large batteries more likely to cause gastric injury
- May not pass pylorus spontaneously
- Earlier intervention reduces complication risk`,
        citation: [1, 4],
        next: 'battery-disposition',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 3 — Distal Battery
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'battery-distal',
        type: 'info',
        module: 3,
        title: 'Battery Distal to Stomach',
        body: `**LOW RISK — Beyond Pylorus**

Once past the stomach, serious complications are rare.

**Management:**
- Home observation
- Normal diet and activity
- Inspect stools for battery passage

**Follow-Up Imaging:**
- Repeat X-ray at **Day 10-14** if passage not confirmed
- No need for routine imaging if asymptomatic

**Surgical Removal Indications:**
- Symptoms develop (obstruction, perforation)
- Battery fails to progress on serial imaging
- Signs of intestinal injury

**Reassurance:**
- Most batteries pass uneventfully within 4-7 days
- Small intestine transit usually complete within 72 hours`,
        citation: [1, 3],
        next: 'battery-disposition',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 4 — Complications
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'battery-complications',
        type: 'question',
        module: 4,
        title: 'Battery Complications',
        body: `**Immediate Complications (First 24-48 hours):**
- Esophageal perforation → pneumomediastinum
- Mediastinitis → fever, tachycardia, sepsis
- Hemorrhage from vessel erosion

**Delayed Complications (Days 3-28+):**
- **Aortoesophageal fistula (AEF)** — most common fatal complication
  - Occurs up to 28 days post-removal
  - Mid-esophageal impaction highest risk
- **Tracheoesophageal fistula (TEF)** — up to 9 days post-removal
- Esophageal stenosis (weeks to months)
- Vocal cord paralysis

**Warning Signs Post-Removal:**
- Chest pain (especially mid-epigastric/substernal)
- Hemoptysis or hematemesis
- Fever, tachycardia
- New stridor or respiratory distress`,
        citation: [7],
        options: [
            { label: 'Suspected AEF/vascular injury', next: 'battery-aef' },
            { label: 'Suspected perforation/mediastinitis', next: 'battery-perforation' },
            { label: 'Post-removal monitoring', next: 'battery-post-removal' },
        ],
    },
    {
        id: 'battery-aef',
        type: 'info',
        module: 4,
        title: 'Aortoesophageal Fistula (AEF)',
        body: `**CATASTROPHIC — HIGH MORTALITY**

**Risk Factors:**
- Mid-esophageal impaction (aortic arch level)
- Battery ≥20mm
- Prolonged impaction (>2 hours)

**Presentation:**
- "Sentinel bleed" — minor hematemesis preceding massive hemorrhage
- Chest/back pain
- Sudden cardiovascular collapse

**Diagnosis:**
- CTA chest (preferred)
- Do NOT delay imaging if suspected

**Management:**
- Immediate cardiothoracic surgery consultation
- Massive transfusion protocol standby
- May require ECMO bridge
- Endovascular stenting or open repair

**Timeline:**
- Can occur up to **28 days** after battery removal
- Requires prolonged monitoring post-removal`,
        citation: [7],
        next: 'battery-disposition',
    },
    {
        id: 'battery-perforation',
        type: 'info',
        module: 4,
        title: 'Perforation & Mediastinitis',
        body: `**Signs of Perforation:**
- Pneumomediastinum on X-ray/CT
- Subcutaneous emphysema
- Severe chest pain
- Mediastinal widening

**Mediastinitis:**
- Fever, tachycardia
- Chest pain, dyspnea
- Sepsis syndrome
- Odynophagia

**Management:**
- Broad-spectrum antibiotics (cover oral flora + GI flora)
- NPO, TPN consideration
- Surgical consultation
- CT chest with contrast for extent of injury

**Antibiotic Options:**
- [Ampicillin-sulbactam](#/drug/ampicillin-sulbactam/mediastinitis) 3g IV q6h OR
- [Piperacillin-tazobactam](#/drug/piperacillin-tazobactam/mediastinitis) 4.5g IV q6h`,
        citation: [6, 7],
        next: 'battery-disposition',
    },
    {
        id: 'battery-post-removal',
        type: 'info',
        module: 4,
        title: 'Post-Removal Monitoring',
        body: `**Standard Post-Removal Care:**

**Admission Criteria:**
- All esophageal battery removals
- Any visible mucosal injury on endoscopy
- Mid-esophageal impaction (AEF risk)
- Symptomatic patients

**Monitoring:**
- Vitals q4h (watch for sepsis)
- NPO initially
- Advance diet when stable: clear liquids → soft diet
- Serial exams for abdominal pain, chest pain

**Imaging:**
- CTA chest if mid-esophageal location (even if asymptomatic)
- Consider at 2-4 weeks if high-risk

**Discharge Instructions:**
- Return immediately for: hematemesis, chest/back pain, fever, trouble breathing
- PCP follow-up in 1-2 weeks
- May need esophagram/EGD at 2-4 weeks to assess healing`,
        citation: [1, 6],
        next: 'battery-disposition',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 5 — Disposition
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'battery-disposition',
        type: 'result',
        module: 5,
        title: 'Disposition Summary',
        body: `**ADMIT:**
- All esophageal battery removals (24-48h minimum)
- Post-endoscopic observation
- High-risk patients without reliable follow-up
- Symptomatic patients
- Concern for perforation/mediastinitis

**DISCHARGE with Close Follow-Up:**
- Asymptomatic gastric/distal batteries meeting low-risk criteria
- Reliable caregiver
- Clear return precautions given
- Follow-up imaging arranged

**Documentation:**
- Battery size and type (if known)
- Location on imaging
- Time from ingestion to imaging/removal
- Honey/sucralfate administered (if applicable)
- Post-removal endoscopic findings

**National Battery Ingestion Hotline:**
**1-800-498-8666** (24/7)
- Battery identification by imprint code
- Real-time management guidance`,
        citation: [1],
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // THINGS TO AVOID
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'battery-avoid',
        type: 'info',
        module: 0,
        title: 'Interventions to AVOID',
        body: `**DO NOT:**
- ❌ Induce vomiting (increases esophageal damage)
- ❌ Give ipecac
- ❌ Attempt blind balloon catheter removal
- ❌ Give activated charcoal (no benefit)
- ❌ Give laxatives or PEG solution
- ❌ Check blood/urine metal levels
- ❌ Attempt chelation
- ❌ Delay endoscopy for NPO status (if esophageal)
- ❌ Delay removal even if honey/sucralfate given

**Remember:**
- Honey/sucralfate DELAY injury — they don't prevent it
- Time to removal is the critical factor`,
        citation: [1, 3],
        next: 'battery-start',
    },
];
