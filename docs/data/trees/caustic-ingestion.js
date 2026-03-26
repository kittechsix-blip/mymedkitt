// MedKitt - Caustic Ingestion Management
// ED evaluation and management of corrosive substance ingestion (acid vs alkali)
// 5 modules: Assessment -> Airway -> Workup -> Treatment -> Disposition
// 26 nodes total.
export const CAUSTIC_INGESTION_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'caustic-start',
        type: 'info',
        module: 1,
        title: 'Caustic Ingestion',
        body: '[Caustic Ingestion Steps Summary](#/info/caustic-summary) - time-critical airway and GI pathway.\n\n**Establish the 5 Ws:**\n- **Who:** Patient demographics, age, weight\n- **What:** Substance, concentration, pH, form (liquid/solid/gel)\n- **When:** Time of ingestion\n- **Where:** Intentional vs accidental\n- **Why:** Suicide attempt vs unintentional exposure\n\n**CRITICAL: Do NOT:**\n- Induce emesis\n- Administer activated charcoal\n- Attempt pH neutralization\n- Place blind NG tube\n- Dilute with water/milk (controversial, limited benefit)\n\n[Contraindications Detail](#/info/caustic-contraindications)',
        citation: [1, 2],
        next: 'caustic-type',
    },
    {
        id: 'caustic-type',
        type: 'question',
        module: 1,
        title: 'Substance Type',
        body: 'Identify the caustic agent. Mechanism of injury differs between acids and alkalis.\n\n**Alkalis (pH >11):** Liquefactive necrosis - saponification of fats and proteins leads to deep penetrating injury. More esophageal injury, higher perforation risk.\n\n**Acids (pH <3):** Coagulative necrosis - eschar formation limits tissue penetration. More gastric injury, may cause "skip lesions."\n\n**Common alkalis:** Drain cleaners (NaOH), oven cleaners, industrial bleach, ammonia, button batteries\n**Common acids:** Toilet bowl cleaners (HCl), rust removers, pool chemicals (H2SO4)',
        citation: [1, 3],
        calculatorLinks: [
            { id: 'caustic-agent', label: 'Acid vs Alkali Guide' },
        ],
        options: [
            {
                label: 'Alkali (base)',
                description: 'pH >11 - drain cleaner, oven cleaner, industrial bleach',
                next: 'caustic-alkali-risk',
            },
            {
                label: 'Acid',
                description: 'pH <3 - toilet cleaner, rust remover, battery acid',
                next: 'caustic-acid-risk',
            },
            {
                label: 'Unknown or mixed',
                description: 'Unable to identify substance',
                next: 'caustic-airway-assess',
            },
        ],
    },
    {
        id: 'caustic-alkali-risk',
        type: 'info',
        module: 1,
        title: 'Alkali Injury Pattern',
        body: '**Liquefactive necrosis** - alkalis dissolve tissue proteins via saponification. Injury penetrates deeply without forming protective barrier.\n\n**High-risk features:**\n- Esophageal injury predominates (slower transit)\n- Transmural perforation more common\n- Delayed stricture formation (30% of grade 2b+ injuries)\n- Long-term esophageal cancer risk (1000x increased)\n\n**Titrable Acid/Alkali Reserve (TAR):** Amount of acid/base needed to neutralize substance. Better predictor of injury than pH alone.\n\nProceed to airway assessment.',
        citation: [1, 3],
        next: 'caustic-airway-assess',
    },
    {
        id: 'caustic-acid-risk',
        type: 'info',
        module: 1,
        title: 'Acid Injury Pattern',
        body: '**Coagulative necrosis** - acids denature proteins to form protective eschar that limits tissue penetration.\n\n**Injury characteristics:**\n- Gastric injury more common (rapid esophageal transit, pyloric pooling)\n- May create "skip lesions" in esophagus\n- Gastric perforation and hemorrhage risks\n- Systemic absorption possible (especially HF, formic acid)\n\n**Hydrofluoric acid (HF):** Uniquely dangerous - penetrates deeply, binds calcium/magnesium causing severe hypocalcemia and arrhythmias. Treat with calcium gluconate.\n\nProceed to airway assessment.',
        citation: [1, 3],
        next: 'caustic-airway-assess',
    },
    // =====================================================================
    // MODULE 2: AIRWAY MANAGEMENT
    // =====================================================================
    {
        id: 'caustic-airway-assess',
        type: 'question',
        module: 2,
        title: 'Airway Assessment',
        body: '**Red flags requiring urgent airway evaluation:**\n- Oropharyngeal edema\n- Stridor or voice changes\n- Hypersalivation/drooling with difficulty clearing\n- Respiratory distress\n- Visible posterior pharyngeal burns\n\n**Up to 50% of adults with large caustic ingestions require intubation.** [1]\n\n**Do NOT use:**\n- Blind intubation attempts\n- Laryngeal mask airways (LMA)\n- Bougies (perforation risk)',
        citation: [1, 2],
        options: [
            {
                label: 'Airway compromise present',
                description: 'Stridor, drooling, edema, respiratory distress',
                next: 'caustic-airway-secure',
                urgency: 'critical',
            },
            {
                label: 'Airway intact',
                description: 'No stridor, no edema, protecting airway',
                next: 'caustic-symptoms',
            },
        ],
    },
    {
        id: 'caustic-airway-secure',
        type: 'result',
        module: 2,
        title: 'Secure Airway Immediately',
        body: '**Emergent airway management:**\n\n- **Fiberoptic or video laryngoscopy** preferred\n- Consider **awake fiberoptic intubation** for suspected significant ingestion\n- Have **surgical airway backup** ready (cricothyrotomy kit at bedside)\n- Avoid blind attempts and bougie use\n\n**Post-intubation:**\n- Large-bore IV access x 2\n- Initiate vasopressors if hypotensive\n- Continue to GI workup after stabilization\n\n**If surgical airway required:** Perform cricothyrotomy; tracheostomy may be difficult due to tissue damage.',
        recommendation: 'Emergent airway control with fiberoptic/video laryngoscopy. Surgical backup mandatory. ICU admission.',
        confidence: 'definitive',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Awake Fiberoptic Intubation',
                dose: 'Topical lidocaine 4% + glycopyrrolate 0.2mg IV',
                route: 'IV/topical',
                frequency: 'Once',
                duration: 'Pre-intubation',
                notes: 'Avoid deep sedation that eliminates protective reflexes',
            },
            monitoring: 'SpO2, ETCO2, HR/BP. Prepare for surgical airway. Post-intubation: CXR, avoid NG tube.',
        },
    },
    {
        id: 'caustic-symptoms',
        type: 'question',
        module: 2,
        title: 'Symptom Assessment',
        body: 'Evaluate for GI tract injury symptoms.\n\n**Symptoms suggesting significant injury:**\n- Odynophagia (painful swallowing)\n- Dysphagia\n- Retrosternal or abdominal pain\n- Vomiting (especially hematemesis)\n- Refusal to swallow\n- Hypersalivation\n\n**Note:** Absence of oropharyngeal burns does NOT exclude esophageal/gastric injury. Up to 15% of patients with significant GI injury have no visible oral burns.',
        citation: [1, 4],
        options: [
            {
                label: 'Symptomatic',
                description: 'Pain, dysphagia, vomiting, drooling',
                next: 'caustic-labs',
                urgency: 'urgent',
            },
            {
                label: 'Asymptomatic - intentional ingestion',
                description: 'No symptoms but deliberate self-harm',
                next: 'caustic-labs',
                urgency: 'urgent',
            },
            {
                label: 'Asymptomatic - accidental, small volume',
                description: 'Unintentional, taste/sip only, household concentration',
                next: 'caustic-observe',
            },
        ],
    },
    // =====================================================================
    // MODULE 3: WORKUP & IMAGING
    // =====================================================================
    {
        id: 'caustic-labs',
        type: 'info',
        module: 3,
        title: 'Laboratory Workup',
        body: '**Order:**\n- CBC with differential\n- BMP (renal function, electrolytes)\n- LFTs\n- Coagulation studies (PT/INR, PTT, fibrinogen)\n- Type and screen\n- VBG or ABG with lactate\n- CRP (elevated suggests transmural injury)\n- Lipase (if abdominal pain)\n\n**Predictive findings for transmural necrosis/perforation:**\n- Leukocytosis\n- Thrombocytopenia\n- Elevated CRP\n- Metabolic acidosis\n- Renal dysfunction\n- Hepatic dysfunction',
        citation: [1, 2],
        next: 'caustic-imaging',
    },
    {
        id: 'caustic-imaging',
        type: 'question',
        module: 3,
        title: 'Imaging',
        body: '**Chest/abdominal X-ray:**\n- Evaluate for pneumomediastinum, pneumoperitoneum, pleural effusion\n- Free air suggests perforation - surgical emergency\n\n**Contrasted CT chest/abdomen:**\n- High specificity for transmural necrosis (~95%)\n- Lower sensitivity (~80%) - does NOT replace endoscopy\n- Useful for identifying perforation, mediastinitis\n- May guide surgical planning\n\n**CT findings concerning for transmural injury:**\n- Loss of mucosal enhancement\n- Wall thinning or discontinuity\n- Periesophageal fat stranding\n- Free air or fluid',
        citation: [2, 5],
        options: [
            {
                label: 'Perforation signs on imaging',
                description: 'Free air, mediastinitis, peritonitis',
                next: 'caustic-perforation',
                urgency: 'critical',
            },
            {
                label: 'No perforation - symptomatic patient',
                description: 'CT negative for perforation but patient has symptoms',
                next: 'caustic-egd-timing',
            },
            {
                label: 'No perforation - large/intentional ingestion',
                description: 'CT negative, but high-risk exposure',
                next: 'caustic-egd-timing',
            },
        ],
    },
    {
        id: 'caustic-perforation',
        type: 'result',
        module: 3,
        title: 'Perforation - Emergent Surgery',
        body: '**Surgical emergency - bypass endoscopy**\n\nPatients with confirmed or strongly suspected perforation should proceed directly to OR without EGD.\n\n**Indications for emergent surgery:**\n- Pneumomediastinum or pneumoperitoneum\n- Peritoneal signs (rigidity, guarding)\n- Hemodynamic instability despite resuscitation\n- Persistent lactic acidosis\n- CT evidence of transmural necrosis\n\n**Surgical options:**\n- Esophagectomy with cervical esophagostomy\n- Gastrectomy (partial or total)\n- Mediastinal drainage\n\n**Supportive care:**\n- NPO\n- Broad-spectrum antibiotics ([Piperacillin-Tazobactam](#/drug/pip-tazo/sepsis) 4.5g IV q6h)\n- Aggressive fluid resuscitation\n- ICU admission',
        recommendation: 'Emergent surgical consultation. NPO, broad-spectrum antibiotics, ICU admission. Do NOT delay surgery for endoscopy.',
        confidence: 'definitive',
        citation: [1, 2],
        treatment: {
            firstLine: {
                drug: 'Piperacillin-Tazobactam',
                dose: '4.5 g',
                route: 'IV',
                frequency: 'q6h',
                duration: 'Until surgical source control',
                notes: 'Cover GI flora including anaerobes',
            },
            alternative: {
                drug: 'Meropenem',
                dose: '1 g',
                route: 'IV',
                frequency: 'q8h',
                duration: 'Until surgical source control',
                notes: 'Alternative for penicillin allergy (non-IgE mediated)',
            },
            monitoring: 'Lactate q4-6h, serial abdominal exams, hemodynamic monitoring. Prepare for OR.',
        },
    },
    {
        id: 'caustic-egd-timing',
        type: 'info',
        module: 3,
        title: 'Endoscopy Timing',
        body: '**Perform EGD within 12-24 hours** for:\n- All intentional ingestions (regardless of symptoms)\n- Symptomatic patients\n- Large volume ingestions\n- High-concentration substances\n\n**Endoscopy goals:**\n- Grade injury severity ([Zargar Classification](#/info/caustic-zargar))\n- Guide treatment and disposition\n- Predict stricture risk\n\n**Timing considerations:**\n- Optimal: 12-24 hours post-ingestion\n- Acceptable: Up to 48-96 hours with gentle technique\n- **AVOID:** Days 5-15 (tissue most friable, highest perforation risk)\n\n**EGD technique:**\n- Gentle insufflation\n- Do not advance past severe injury\n- Document gastric involvement if safe',
        citation: [1, 4, 5],
        next: 'caustic-zargar-assess',
    },
    {
        id: 'caustic-zargar-assess',
        type: 'question',
        module: 3,
        title: 'Zargar Classification',
        body: '**Endoscopic grading of caustic injury:**\n\n[Zargar Classification Detail](#/info/caustic-zargar)\n\n**Grade 0:** Normal mucosa\n**Grade 1:** Edema and hyperemia only\n**Grade 2a:** Friability, hemorrhages, superficial ulcers, blisters\n**Grade 2b:** Deep or circumferential ulceration\n**Grade 3a:** Focal areas of necrosis\n**Grade 3b:** Extensive necrosis\n\n**Clinical significance:**\n- Grade 0-2a: Excellent prognosis, no strictures\n- Grade 2b: 70-100% stricture rate\n- Grade 3a-3b: High mortality, surgery often required',
        citation: [4, 5],
        calculatorLinks: [
            { id: 'zargar', label: 'Zargar Classification Tool' },
        ],
        options: [
            {
                label: 'Grade 0-1 (minimal)',
                description: 'Normal or edema/hyperemia only',
                next: 'caustic-grade-mild',
            },
            {
                label: 'Grade 2a (superficial)',
                description: 'Friability, hemorrhages, superficial ulcers',
                next: 'caustic-grade-2a',
            },
            {
                label: 'Grade 2b (deep)',
                description: 'Deep or circumferential ulceration',
                next: 'caustic-grade-2b',
                urgency: 'urgent',
            },
            {
                label: 'Grade 3a-3b (necrosis)',
                description: 'Focal or extensive necrosis',
                next: 'caustic-grade-3',
                urgency: 'critical',
            },
        ],
    },
    // =====================================================================
    // MODULE 4: TREATMENT
    // =====================================================================
    {
        id: 'caustic-grade-mild',
        type: 'result',
        module: 4,
        title: 'Grade 0-1 - Supportive Care',
        body: '**Excellent prognosis - no long-term sequelae expected**\n\n**Management:**\n- Clear liquid diet trial after EGD\n- Advance diet as tolerated\n- PPI for symptom relief ([Pantoprazole](#/drug/pantoprazole/gerd) 40mg PO daily)\n- Pain control: [Acetaminophen](#/drug/acetaminophen/pain) preferred\n- Avoid NSAIDs (GI irritation)\n\n**No indication for:**\n- Antibiotics\n- Corticosteroids\n- NG tube placement\n\n**Follow-up:**\n- Outpatient GI follow-up in 1-2 weeks\n- Psychiatric evaluation if intentional ingestion',
        recommendation: 'Clear liquid diet, advance as tolerated. PPI for symptoms. Discharge home with GI follow-up.',
        confidence: 'definitive',
        citation: [1, 4],
        treatment: {
            firstLine: {
                drug: 'Pantoprazole',
                dose: '40 mg',
                route: 'PO',
                frequency: 'Daily',
                duration: '2-4 weeks',
                notes: 'Symptom relief; does not prevent stricture',
            },
            monitoring: 'Ability to tolerate oral intake. Return if worsening dysphagia, vomiting, or chest/abdominal pain.',
        },
    },
    {
        id: 'caustic-grade-2a',
        type: 'result',
        module: 4,
        title: 'Grade 2a - Observation',
        body: '**Superficial injury - low stricture risk (<1%)**\n\n**Management:**\n- NPO for 24-48 hours, then clear liquid trial\n- Observation admission (floor)\n- IV fluids\n- PPI ([Pantoprazole](#/drug/pantoprazole/gerd) 40mg IV q12h)\n- Antiemetics ([Ondansetron](#/drug/ondansetron/nausea) 4-8mg IV PRN)\n- Pain control\n\n**Not routinely indicated:**\n- Antibiotics (unless fever/infection signs)\n- Corticosteroids (no benefit for grade 2a)\n\n**Discharge criteria:**\n- Tolerating oral intake\n- Pain controlled\n- No signs of perforation/deterioration\n- Outpatient GI follow-up arranged',
        recommendation: 'Observation 24-48 hours. NPO then diet advancement. PPI, antiemetics, pain control. Discharge when tolerating PO.',
        confidence: 'recommended',
        citation: [1, 4],
        treatment: {
            firstLine: {
                drug: 'Pantoprazole',
                dose: '40 mg',
                route: 'IV',
                frequency: 'q12h',
                duration: 'Until tolerating PO',
                notes: 'Then transition to PO 40mg daily x 2-4 weeks',
            },
            alternative: {
                drug: 'Ondansetron',
                dose: '4-8 mg',
                route: 'IV',
                frequency: 'q6-8h PRN',
                duration: 'As needed',
                notes: 'For nausea/vomiting',
            },
            monitoring: 'Serial abdominal exams. Diet tolerance. Signs of perforation.',
        },
    },
    {
        id: 'caustic-grade-2b',
        type: 'result',
        module: 4,
        title: 'Grade 2b - ICU Admission',
        body: '**Deep/circumferential injury - high stricture risk (70-100%)**\n\n**Management:**\n- NPO\n- ICU admission\n- Central venous access\n- IV fluids/nutrition (consider TPN)\n- PPI ([Pantoprazole](#/drug/pantoprazole/gerd) 40mg IV q12h)\n- Serial abdominal exams\n\n**Corticosteroids (CONTROVERSIAL):**\n- May reduce stricture formation in grade 2b specifically\n- Consider [Methylprednisolone](#/drug/methylprednisolone/caustic) 1-2 mg/kg/day IV x 3 weeks then taper\n- GI consult should guide decision\n- Evidence is mixed; not universally recommended\n\n**Antibiotics:**\n- If corticosteroids used, add prophylactic coverage\n- Consider broad-spectrum if fever/infection signs\n\n**Stricture prevention:**\n- Early dilation may be considered after acute phase (week 3+)\n- Long-term surveillance endoscopy',
        recommendation: 'ICU admission. NPO with nutrition support. Consider corticosteroids for stricture prevention per GI consult. Serial monitoring for perforation.',
        confidence: 'recommended',
        citation: [1, 4, 5],
        treatment: {
            firstLine: {
                drug: 'Pantoprazole',
                dose: '40 mg',
                route: 'IV',
                frequency: 'q12h',
                duration: 'Until stable',
            },
            alternative: {
                drug: 'Methylprednisolone',
                dose: '1-2 mg/kg/day',
                route: 'IV',
                frequency: 'Daily',
                duration: '3 weeks then taper',
                notes: 'Controversial - GI consult should guide. May reduce stricture in grade 2b.',
            },
            monitoring: 'Serial abdominal exams q4-6h. CBC, CRP, lactate daily. Nutrition support. Watch for perforation.',
        },
    },
    {
        id: 'caustic-grade-3',
        type: 'result',
        module: 4,
        title: 'Grade 3a/3b - Surgical Consultation',
        body: '**Necrotic injury - high mortality, surgery often required**\n\n**Immediate management:**\n- ICU admission\n- NPO\n- Aggressive fluid resuscitation\n- Central line, arterial line\n- Broad-spectrum antibiotics ([Piperacillin-Tazobactam](#/drug/pip-tazo/sepsis) 4.5g IV q6h)\n\n**Surgical consultation:**\n- Grade 3a: Consider conservative management with very close monitoring vs surgery\n- Grade 3b: Usually requires surgery (esophagectomy, gastrectomy)\n\n**Indications for emergent surgery:**\n- Hemodynamic instability\n- Evidence of perforation\n- Extensive grade 3b necrosis\n- Failure to improve with conservative management\n\n**Long-term:**\n- Survivors have high stricture rate\n- May require esophageal reconstruction\n- Lifelong cancer surveillance (1000x increased risk)',
        recommendation: 'ICU admission. Surgical consultation for grade 3a; emergent surgery likely for grade 3b. Broad-spectrum antibiotics.',
        confidence: 'definitive',
        citation: [1, 2, 4],
        treatment: {
            firstLine: {
                drug: 'Piperacillin-Tazobactam',
                dose: '4.5 g',
                route: 'IV',
                frequency: 'q6h',
                duration: 'Until surgical intervention or clinical improvement',
                notes: 'Broad GI flora coverage',
            },
            alternative: {
                drug: 'Meropenem',
                dose: '1 g',
                route: 'IV',
                frequency: 'q8h',
                duration: 'Until surgical intervention',
                notes: 'Alternative for penicillin allergy',
            },
            monitoring: 'Hemodynamics, lactate q4h, serial abdominal exams, surgical consultation. Prepare for emergent OR.',
        },
    },
    // =====================================================================
    // MODULE 5: DISPOSITION
    // =====================================================================
    {
        id: 'caustic-observe',
        type: 'info',
        module: 5,
        title: 'Asymptomatic Observation',
        body: '**Low-risk accidental ingestion:**\n- Small volume (taste/sip)\n- Household concentration\n- Asymptomatic after ingestion\n- No oropharyngeal burns\n\n**Observation period:**\n- Monitor for 4-6 hours\n- Assess ability to swallow\n- Observe for delayed symptom development\n\n**Trial of oral intake:**\n- Offer clear liquids\n- If tolerated without pain, advance diet\n- If painful or refused, proceed to full workup',
        citation: [1],
        next: 'caustic-discharge-criteria',
    },
    {
        id: 'caustic-discharge-criteria',
        type: 'question',
        module: 5,
        title: 'Discharge Assessment',
        body: '**Discharge criteria (all must be met):**\n- Asymptomatic after 4-6 hour observation\n- Tolerates oral intake without pain\n- No oropharyngeal burns or edema\n- Accidental, low-concentration exposure\n- Reliable follow-up available\n\n**If intentional ingestion:** Psychiatric evaluation mandatory regardless of injury severity.',
        citation: [1, 2],
        options: [
            {
                label: 'Meets discharge criteria',
                description: 'Asymptomatic, tolerating PO, low-risk exposure',
                next: 'caustic-discharge',
            },
            {
                label: 'Does not meet criteria',
                description: 'Symptomatic, unable to swallow, intentional, or concerning features',
                next: 'caustic-labs',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'caustic-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge Home',
        body: '**Discharge instructions:**\n\n**Diet:**\n- Soft diet for 24-48 hours\n- Avoid hot, spicy, or acidic foods\n- Small frequent meals\n\n**Return precautions - seek care immediately if:**\n- Difficulty or pain with swallowing\n- Vomiting (especially blood)\n- Chest or abdominal pain\n- Fever\n- Breathing difficulty\n\n**Follow-up:**\n- PCP or GI within 1 week\n- If any symptoms develop, return to ED\n\n**If intentional ingestion:** Do NOT discharge without psychiatric clearance and safety planning.',
        recommendation: 'Safe for discharge with return precautions. PCP or GI follow-up within 1 week.',
        confidence: 'recommended',
        citation: [1],
    },
    {
        id: 'caustic-psych',
        type: 'info',
        module: 5,
        title: 'Psychiatric Evaluation',
        body: '**Mandatory psychiatric evaluation for all intentional ingestions.**\n\n**Timing:**\n- After medical stabilization\n- Before discharge from hospital\n- May require extended observation or admission\n\n**Consult should address:**\n- Suicide risk assessment\n- Intent and lethality of method\n- Protective factors\n- Safety planning\n- Disposition (outpatient vs inpatient psychiatric care)\n\n**Documentation:**\n- Medical clearance for psychiatric evaluation\n- Suicide precautions during medical admission\n- 1:1 observation if actively suicidal',
        citation: [1],
        next: 'caustic-discharge-criteria',
    },
    // =====================================================================
    // ADDITIONAL INFO/REFERENCE NODES
    // =====================================================================
    {
        id: 'caustic-supportive',
        type: 'info',
        module: 4,
        title: 'Supportive Care Measures',
        body: '**General supportive care:**\n\n**NPO status:**\n- All symptomatic patients initially NPO\n- Advance diet based on EGD findings and tolerance\n\n**Pain management:**\n- [Acetaminophen](#/drug/acetaminophen/pain) 1g IV q6h\n- [Hydromorphone](#/drug/hydromorphone/pain) 0.2-0.5mg IV q2-4h PRN for severe pain\n- Avoid NSAIDs (GI irritation)\n\n**Antiemetics:**\n- [Ondansetron](#/drug/ondansetron/nausea) 4-8mg IV q6-8h\n- Vomiting increases aspiration and re-exposure risk\n\n**Nutrition:**\n- Early TPN for grade 2b-3 injuries\n- Consider nasojejunal feeding tube placed under fluoroscopy (not blind)\n- Avoid NG tube through injured esophagus\n\n**PPI therapy:**\n- [Pantoprazole](#/drug/pantoprazole/gerd) 40mg IV q12h\n- May reduce secondary injury from acid reflux\n- Does NOT prevent stricture formation',
        citation: [1, 2],
    },
    {
        id: 'caustic-long-term',
        type: 'info',
        module: 5,
        title: 'Long-term Complications',
        body: '**Stricture formation:**\n- Grade 2b: 70-100% develop strictures\n- Grade 3: Near-universal stricture in survivors\n- Typically develops 3-8 weeks post-ingestion\n- May require serial dilations, stenting, or surgical reconstruction\n\n**Upper GI hemorrhage:**\n- Typically occurs 2-4 weeks post-ingestion\n- As necrotic tissue sloughs\n- May be massive\n\n**Esophageal cancer:**\n- 1000x increased risk (up to 6.5% lifetime)\n- Squamous cell carcinoma predominates\n- Latency period: 15-40 years\n- Requires lifelong surveillance endoscopy\n\n**Other complications:**\n- Tracheoesophageal fistula\n- Esophageal shortening\n- Gastric outlet obstruction\n- Nutritional deficiencies',
        citation: [3, 4, 5],
    },
];
// 22 nodes total
export const CAUSTIC_INGESTION_NODE_COUNT = CAUSTIC_INGESTION_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const CAUSTIC_INGESTION_MODULE_LABELS = [
    'Assessment',
    'Airway',
    'Workup',
    'Treatment',
    'Disposition',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const CAUSTIC_INGESTION_CITATIONS = [
    { num: 1, text: 'Taming the SRU. Caustic Ingestions in the Emergency Department: Diagnostics and Therapeutics. 2024. https://www.tamingthesru.com/blog/caustic-ingestions-in-the-emergency-department' },
    { num: 2, text: 'Hoffman RS, Howland MA, Lewin NA, et al. Goldfrank\'s Toxicologic Emergencies. 11th ed. McGraw-Hill; 2023. Chapter: Caustics.' },
    { num: 3, text: 'Contini S, Scarpignato C. Caustic injury of the upper gastrointestinal tract: a comprehensive review. World J Gastroenterol. 2013;19(25):3918-3930.' },
    { num: 4, text: 'Zargar SA, Kochhar R, Mehta S, Mehta SK. The role of fiberoptic endoscopy in the management of corrosive ingestion and modified endoscopic classification of burns. Gastrointest Endosc. 1991;37(2):165-169.' },
    { num: 5, text: 'Chirica M, Bonavina L, Kelly MD, et al. Caustic ingestion. Lancet. 2017;389(10083):2041-2052.' },
];
// -------------------------------------------------------------------
// Clinical Notes
// -------------------------------------------------------------------
export const CAUSTIC_INGESTION_CLINICAL_NOTES = [
    'NEVER induce emesis, give activated charcoal, attempt pH neutralization, place blind NG tube, or use dilution therapy.',
    'Up to 50% of adults with large caustic ingestions require intubation - prepare for surgical airway.',
    'Absence of oropharyngeal burns does NOT exclude significant esophageal or gastric injury (15% false negative rate).',
    'Perform EGD within 12-24 hours. AVOID days 5-15 when tissue is most friable.',
    'Zargar grade 2b-3 injuries have 70-100% stricture rate - GI and surgical consultation mandatory.',
    'Long-term esophageal cancer risk is increased 1000-fold - lifelong surveillance required.',
];
