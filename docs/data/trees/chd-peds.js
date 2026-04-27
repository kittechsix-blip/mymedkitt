// MedKitt — Congenital Heart Disease in the Neonate
// Blue babies (cyanotic lesions) vs Red/Shocked babies (obstructive lesions)
// 5 modules: Initial Recognition → Blue Babies → Red Babies → Emergency Management → Disposition
// 28 nodes total.
export const CHD_PEDS_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL RECOGNITION
    // =====================================================================
    {
        id: 'chd-start',
        type: 'question',
        module: 1,
        title: 'Cyanotic or Shocked Neonate',
        body: '**Congenital Heart Disease (CHD)** affects ~1% of live births. Critical CHD presents in the first weeks of life as the ductus arteriosus closes.\n\n**KEY ASSESSMENT**\n• Cyanosis that does NOT improve with supplemental O2\n• Poor perfusion, weak pulses, shock\n• Murmur (may be absent in critical lesions)\n• Hepatomegaly, respiratory distress\n\n**REFERENCES**\n• [Hyperoxia Test](#/info/chd-hyperox)\n• [4-Extremity Vitals](#/info/chd-vitals)\n• [PGE1 Dosing](#/info/chd-pge1)\n• [THE MISFITS - Other causes of sick neonate](#/consult/misfits-peds)\n\nWhat is the primary presentation?',
        citation: [1, 2],
        options: [
            {
                label: 'Blue Baby (Cyanotic)',
                description: 'Central cyanosis, SpO2 <90%, fails hyperoxia test',
                next: 'chd-blue-screen',
            },
            {
                label: 'Shocked/Gray Baby',
                description: 'Poor perfusion, weak pulses, acidosis, cardiogenic shock',
                next: 'chd-red-screen',
            },
            {
                label: 'Unknown - Need Workup',
                description: 'Perform hyperoxia test and 4-extremity assessment',
                next: 'chd-vitals',
            },
        ],
        summary: 'CHD presents as blue baby (cyanotic) or shocked baby (obstructive); 1% of live births; critical CHD presents as ductus closes',
    },
    {
        id: 'chd-vitals',
        type: 'info',
        module: 1,
        title: '4-Extremity Assessment',
        body: '**CRITICAL: 4-EXTREMITY BP AND PULSE OX**\n\nObtain simultaneous pre-ductal (right arm) and post-ductal (either foot) saturations.\n\n**INTERPRETATION**\n• **Pre > Post by >3%:** Suggests right-to-left shunt through PDA (ductal-dependent systemic lesions)\n• **Post > Pre:** Suggests TGA with coarctation (rare)\n• **Both low (<90%):** Cyanotic heart disease\n\n**4-EXTREMITY BLOOD PRESSURE**\n• **Arm BP > Leg BP by >20 mmHg:** Coarctation of aorta\n• Check femoral pulses - absent/weak suggests coarctation\n\n**PULSE CHECK**\n• Brachial pulses: Should be strong bilaterally\n• Femoral pulses: Weak/absent = coarctation until proven otherwise',
        citation: [1, 3],
        next: 'chd-hyperox',
        summary: 'Pre vs post-ductal sats: >3% difference suggests ductal shunt; arm > leg BP by >20 suggests coarctation; check femoral pulses',
    },
    {
        id: 'chd-hyperox',
        type: 'question',
        module: 1,
        title: 'Hyperoxia Test',
        body: '**HYPEROXIA TEST - Distinguishes cardiac from pulmonary cyanosis**\n\n**PROCEDURE**\n1. Obtain baseline ABG on room air (or current FiO2)\n2. Place on 100% FiO2 for 10 minutes\n3. Repeat ABG\n\n**INTERPRETATION**\n• **PaO2 rises to >150 mmHg:** PULMONARY cause (responds to O2)\n• **PaO2 stays <100 mmHg:** CARDIAC cause (fixed shunt, does not respond)\n• **PaO2 100-150 mmHg:** Indeterminate - may be cardiac\n\n**CAUTION IN KNOWN CHD**\nHigh FiO2 can worsen pulmonary overcirculation in some lesions. Use clinical judgment.\n\nWhat are the hyperoxia test results?',
        citation: [1, 4],
        options: [
            {
                label: 'PaO2 <100 mmHg (Cardiac)',
                description: 'Fixed shunt - cyanotic heart disease',
                next: 'chd-blue-screen',
                urgency: 'urgent',
            },
            {
                label: 'PaO2 >150 mmHg (Pulmonary)',
                description: 'Responds to O2 - likely pulmonary cause',
                next: 'chd-not-cardiac',
            },
            {
                label: 'PaO2 100-150 mmHg (Indeterminate)',
                description: 'Could be cardiac - proceed with echo',
                next: 'chd-blue-screen',
            },
        ],
        summary: 'Hyperoxia test: PaO2 <100 on 100% O2 = cardiac cause (fixed shunt); PaO2 >150 = pulmonary cause',
    },
    {
        id: 'chd-not-cardiac',
        type: 'result',
        module: 1,
        title: 'Consider Non-Cardiac Causes',
        body: '**Hyperoxia test suggests PULMONARY cause of cyanosis**\n\n**DIFFERENTIAL DIAGNOSIS**\n• Persistent pulmonary hypertension of newborn (PPHN)\n• Respiratory distress syndrome (RDS)\n• Meconium aspiration syndrome\n• Pneumonia/sepsis\n• Congenital diaphragmatic hernia\n• Airway obstruction\n\n**STILL CONSIDER CHD IF:**\n• Clinical suspicion high\n• Murmur present\n• Abnormal 4-extremity sats/BP\n• Echo shows structural abnormality\n\n**SEE ALSO**\n• [THE MISFITS](#/consult/misfits-peds) - Full differential for sick neonate',
        recommendation: 'Hyperoxia test suggests pulmonary cause. Consider PPHN, RDS, pneumonia. Still obtain echo if clinical suspicion for CHD remains.',
        confidence: 'recommended',
        citation: [1, 5],
    },
    // =====================================================================
    // MODULE 2: BLUE BABIES (CYANOTIC LESIONS)
    // =====================================================================
    {
        id: 'chd-blue-screen',
        type: 'question',
        module: 2,
        title: 'Blue Baby - The 5 T\'s',
        body: '**CYANOTIC HEART DISEASE - The 5 T\'s**\n\nAll involve right-to-left shunting with deoxygenated blood entering systemic circulation.\n\n**THE 5 T\'s:**\n1. **T**etralogy of Fallot (most common cyanotic CHD)\n2. **T**ransposition of Great Arteries (most common cyanotic CHD in neonates)\n3. **T**ricuspid Atresia\n4. **T**otal Anomalous Pulmonary Venous Return (TAPVR)\n5. **T**runcus Arteriosus\n\n**DUCTAL DEPENDENCE**\nMost cyanotic lesions are ductal-dependent for mixing. As ductus closes, cyanosis worsens.\n\n**START PGE1 EARLY** - Do not wait for echo confirmation if clinical suspicion high.\n\nSelect the suspected lesion (or choose general cyanotic management):',
        citation: [1, 2, 6],
        options: [
            {
                label: 'Tetralogy of Fallot / Tet Spells',
                description: 'Boot-shaped heart, episodic cyanosis, squatting',
                next: 'chd-tof',
            },
            {
                label: 'Transposition of Great Arteries (TGA)',
                description: 'Egg-on-string CXR, severe cyanosis at birth',
                next: 'chd-tga',
            },
            {
                label: 'Other Cyanotic Lesion',
                description: 'Tricuspid atresia, TAPVR, Truncus',
                next: 'chd-other-cyan',
            },
            {
                label: 'Unknown - Start PGE1',
                description: 'Stabilize while awaiting echo',
                next: 'chd-pge1',
                urgency: 'urgent',
            },
        ],
        summary: 'Blue babies = 5 T\'s: Tetralogy, Transposition, Tricuspid atresia, TAPVR, Truncus; most are ductal-dependent',
    },
    {
        id: 'chd-tof',
        type: 'question',
        module: 2,
        title: 'Tetralogy of Fallot',
        body: '**TETRALOGY OF FALLOT (TOF)**\n\nMost common cyanotic CHD overall. Four features:\n1. **V**entricular septal defect (VSD)\n2. **P**ulmonary stenosis (RVOT obstruction)\n3. **O**verriding aorta\n4. **R**ight ventricular hypertrophy\n\n**CLASSIC CXR:** Boot-shaped heart (coeur en sabot)\n\n**TET SPELLS**\nHypercyanotic episodes due to RVOT spasm:\n• Triggered by crying, feeding, defecation\n• Infant becomes deeply cyanotic, limp\n• May progress to syncope, seizures, death\n\n**KEY:** TOF patients may not be cyanotic at rest initially. Spells can occur suddenly.\n\nIs the patient having a Tet spell?',
        citation: [1, 6, 7],
        options: [
            {
                label: 'Yes - Active Tet Spell',
                description: 'Acute hypercyanotic episode',
                next: 'chd-tet-spell',
                urgency: 'urgent',
            },
            {
                label: 'No - Stable TOF',
                description: 'Cyanotic but no acute spell',
                next: 'chd-tof-stable',
            },
        ],
        summary: 'TOF = VSD + pulmonary stenosis + overriding aorta + RVH; boot-shaped heart on CXR; tet spells are hypercyanotic emergencies',
    },
    {
        id: 'chd-tet-spell',
        type: 'result',
        module: 2,
        title: 'Tet Spell Management',
        body: '**TET SPELL - HYPERCYANOTIC EPISODE**\n\n**IMMEDIATE INTERVENTIONS (in order):**\n\n**1. KNEE-CHEST POSITION**\nHave parent hold infant with knees to chest. Increases SVR and reduces right-to-left shunt.\n\n**2. CALM THE INFANT**\n• Minimize stimulation\n• Do NOT separate from parent if possible\n• Avoid painful procedures if possible\n\n**3. OXYGEN**\n100% FiO2 (helps somewhat, but cyanosis is from shunting)\n\n**4. MORPHINE**\n[Morphine](#/drug/morphine) 0.1-0.2 mg/kg IV/IM\n• Reduces RVOT spasm and catecholamine surge\n• Also reduces respiratory drive (decreases hyperpnea)\n\n**5. IV FLUID BOLUS**\n10-20 mL/kg NS - increases preload\n\n**6. PHENYLEPHRINE (if refractory)**\n[Phenylephrine](#/drug/phenylephrine) 5-20 mcg/kg IV bolus\n• Alpha-agonist increases SVR\n• Reduces right-to-left shunt\n\n**7. PROPRANOLOL (if still refractory)**\n[Propranolol](#/drug/propranolol) 0.1 mg/kg slow IV push\n• Reduces RVOT spasm\n• Use with caution\n\n**8. KETAMINE**\n[Ketamine](#/drug/ketamine) 1-2 mg/kg IV\n• For procedural sedation or intubation\n• Maintains SVR, good for CHD\n\n**AVOID:** Agitation, excessive crying, volume depletion',
        images: [{ src: 'images/chd-peds/knee-chest-position.svg', alt: 'Knee-chest position for tet spell showing infant held with knees tucked to chest', caption: 'Knee-chest position increases SVR and reduces right-to-left shunting' }],
        recommendation: 'TET SPELL: Knee-chest position first, then calm infant, O2, morphine 0.1-0.2 mg/kg. If refractory: phenylephrine, propranolol, ketamine.',
        confidence: 'definitive',
        citation: [1, 6, 7],
        calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
        treatment: {
            firstLine: {
                drug: 'Morphine',
                dose: '0.1-0.2 mg/kg',
                route: 'IV/IM',
                frequency: 'Once, may repeat',
                duration: 'Single dose',
                notes: 'First-line medication for tet spell. Reduces RVOT spasm and catecholamine surge.',
            },
            alternative: {
                drug: 'Phenylephrine',
                dose: '5-20 mcg/kg',
                route: 'IV bolus',
                frequency: 'Once, may repeat',
                duration: 'Single dose',
                notes: 'Second-line for refractory tet spell. Increases SVR to reduce shunt.',
            },
            monitoring: 'Continuous pulse ox, HR, BP. Watch for resolution of cyanosis and return of normal color.',
        },
        safetyLevel: 'critical',
    },
    {
        id: 'chd-tof-stable',
        type: 'info',
        module: 2,
        title: 'Stable Tetralogy of Fallot',
        body: '**STABLE TOF - Not in acute spell**\n\n**PRESENTATION**\n• May be "pink tet" initially (mild cyanosis)\n• Cyanosis worsens with activity, crying\n• History of squatting in older infants (increases SVR)\n• Murmur: harsh systolic ejection murmur at LUSB\n\n**WORKUP**\n• CXR: Boot-shaped heart, decreased pulmonary vascular markings\n• ECG: Right axis deviation, RVH\n• Echo: Definitive diagnosis\n\n**MANAGEMENT**\n• Avoid dehydration, crying, agitation\n• Keep calm and comfortable\n• Do NOT need PGE1 (TOF is not ductal-dependent)\n• Cardiology consult for timing of surgical repair\n\n**SURGICAL REPAIR**\n• Complete repair typically at 3-6 months\n• Earlier if severe cyanosis or spells',
        citation: [1, 6, 7],
        next: 'chd-cards-consult',
        summary: 'Stable TOF: avoid dehydration/agitation, does NOT need PGE1, surgical repair at 3-6 months',
    },
    {
        id: 'chd-tga',
        type: 'result',
        module: 2,
        title: 'Transposition of Great Arteries',
        body: '**TRANSPOSITION OF GREAT ARTERIES (TGA)**\n\nMost common cyanotic CHD presenting in the first week of life.\n\n**ANATOMY**\nAorta arises from RV, pulmonary artery from LV. Two parallel circulations with no mixing = incompatible with life unless mixing exists.\n\n**PRESENTATION**\n• Severe cyanosis within hours of birth\n• May be well-appearing initially (ductus still open)\n• Rapid deterioration as ductus closes\n• Minimal response to supplemental O2\n\n**CLASSIC CXR:** "Egg on a string" - narrow mediastinum, egg-shaped heart\n\n**CRITICAL: MIXING IS ESSENTIAL**\nSurvival depends on mixing between circuits via:\n• Patent ductus arteriosus (PDA)\n• Atrial septal defect (ASD) or patent foramen ovale (PFO)\n• Ventricular septal defect (VSD) - if present\n\n**EMERGENCY MANAGEMENT**\n1. **PGE1** - Keep ductus open: [Prostaglandin E1](#/drug/prostaglandin-e1) 0.05-0.1 mcg/kg/min\n2. **Balloon atrial septostomy (BAS)** - Emergent procedure by cardiology to create/enlarge ASD\n3. Arterial switch operation (definitive repair) in first 2 weeks',
        images: [{ src: 'images/chd-peds/tga-egg-string.jpg', alt: 'Chest X-ray showing egg-on-a-string appearance classic for TGA', caption: 'Classic "egg on a string" CXR in TGA: narrow mediastinum and egg-shaped cardiac silhouette' }],
        recommendation: 'TGA is DUCTAL-DEPENDENT. Start PGE1 immediately. Emergent cardiology for balloon atrial septostomy. Arterial switch surgery within 2 weeks.',
        confidence: 'definitive',
        citation: [1, 2, 6],
        calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
        treatment: {
            firstLine: {
                drug: 'Prostaglandin E1 (Alprostadil)',
                dose: '0.05-0.1 mcg/kg/min',
                route: 'Continuous IV infusion',
                frequency: 'Continuous',
                duration: 'Until surgical intervention',
                notes: 'CRITICAL: Keep ductus open. May cause apnea - be prepared to intubate.',
            },
            monitoring: 'Continuous SpO2, cardiorespiratory monitor. Watch for apnea (common PGE1 side effect). Serial lactates.',
        },
        safetyLevel: 'critical',
    },
    {
        id: 'chd-other-cyan',
        type: 'info',
        module: 2,
        title: 'Other Cyanotic Lesions',
        body: '**OTHER CYANOTIC HEART DEFECTS**\n\n**TRICUSPID ATRESIA**\n• Absent tricuspid valve\n• All blood crosses ASD → LV → aorta and PDA\n• Requires PGE1 for pulmonary blood flow\n\n**TOTAL ANOMALOUS PULMONARY VENOUS RETURN (TAPVR)**\n• Pulmonary veins drain to systemic veins instead of LA\n• Obstructed TAPVR = surgical emergency\n• CXR: "Snowman" or "figure-8" heart (supracardiac type)\n\n**TRUNCUS ARTERIOSUS**\n• Single great vessel overriding both ventricles\n• Mixes oxygenated and deoxygenated blood\n• May present with CHF in addition to cyanosis\n\n**PULMONARY ATRESIA**\n• No connection between RV and PA\n• Completely ductal-dependent for pulmonary flow\n• Requires immediate PGE1\n\n**COMMON THREAD:** Most are ductal-dependent. Start PGE1 if cyanotic CHD suspected.',
        citation: [1, 2, 6],
        next: 'chd-pge1',
        summary: 'Tricuspid atresia, TAPVR, Truncus, Pulmonary atresia - most are ductal-dependent; start PGE1',
    },
    // =====================================================================
    // MODULE 3: RED/SHOCKED BABIES (OBSTRUCTIVE LESIONS)
    // =====================================================================
    {
        id: 'chd-red-screen',
        type: 'question',
        module: 3,
        title: 'Shocked Baby - Left-Sided Obstructive Lesions',
        body: '**CARDIOGENIC SHOCK IN NEONATE**\n\nLeft-sided obstructive lesions present with shock as the ductus closes and systemic perfusion fails.\n\n**CLINICAL FEATURES**\n• Pale, gray, mottled (not blue)\n• Poor perfusion, weak pulses\n• Tachycardia, tachypnea\n• Hepatomegaly\n• Metabolic acidosis, elevated lactate\n• May appear septic\n\n**KEY LESIONS:**\n• **Coarctation of the Aorta** (most common)\n• **Hypoplastic Left Heart Syndrome** (HLHS)\n• **Critical Aortic Stenosis**\n• **Interrupted Aortic Arch**\n\n**CRITICAL CLUE:** Check femoral pulses! Weak/absent = coarctation until proven otherwise.\n\nSelect suspected lesion:',
        citation: [1, 2, 8],
        options: [
            {
                label: 'Coarctation of Aorta',
                description: 'Arm > leg BP, weak femorals',
                next: 'chd-coarc',
            },
            {
                label: 'Hypoplastic Left Heart Syndrome',
                description: 'Small/absent LV, ductal-dependent systemic flow',
                next: 'chd-hlhs',
            },
            {
                label: 'Other/Unknown - Start PGE1',
                description: 'Critical AS, interrupted arch, or unknown',
                next: 'chd-pge1',
                urgency: 'urgent',
            },
        ],
        summary: 'Shocked baby = left-sided obstruction; gray/pale not blue; check femoral pulses; coarctation, HLHS, critical AS',
    },
    {
        id: 'chd-coarc',
        type: 'result',
        module: 3,
        title: 'Coarctation of Aorta',
        body: '**COARCTATION OF THE AORTA**\n\nNarrowing of aorta, typically just distal to left subclavian artery (juxtaductal).\n\n**PRESENTATION**\n• May be asymptomatic initially with open ductus\n• Shock when ductus closes (typically days 1-14)\n• Weak or absent femoral pulses (PATHOGNOMONIC)\n• Upper extremity hypertension, lower extremity hypotension\n• **BP gradient >20 mmHg arm > leg**\n\n**ASSOCIATED FINDINGS**\n• Bicuspid aortic valve (50%)\n• VSD, other left-sided lesions\n• Turner syndrome (screen females)\n\n**CXR:** Cardiomegaly, pulmonary edema. "Figure 3 sign" or rib notching in older children (not neonates).\n\n**ECHO:** Narrowing at isthmus, flow acceleration, may see PDA.\n\n**MANAGEMENT**\n1. **PGE1** to reopen ductus: 0.05-0.1 mcg/kg/min\n2. Treat shock: Fluids cautiously, may need inotropes\n3. Correct acidosis\n4. Surgical repair or catheter intervention',
        images: [{ src: 'images/chd-peds/coarctation-diagram.svg', alt: 'Diagram showing coarctation of aorta with narrowing distal to left subclavian', caption: 'Coarctation typically occurs just distal to left subclavian artery at the isthmus' }],
        recommendation: 'Coarctation: Weak femorals + arm > leg BP gradient. Start PGE1 to reopen ductus. Surgical repair required.',
        confidence: 'definitive',
        citation: [1, 2, 8],
        calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
        treatment: {
            firstLine: {
                drug: 'Prostaglandin E1 (Alprostadil)',
                dose: '0.05-0.1 mcg/kg/min',
                route: 'Continuous IV infusion',
                frequency: 'Continuous',
                duration: 'Until surgical repair',
                notes: 'Reopens ductus to restore lower body perfusion. Watch for apnea.',
            },
            alternative: {
                drug: 'Dopamine or Epinephrine',
                dose: 'Dopamine 5-20 mcg/kg/min OR Epinephrine 0.01-0.1 mcg/kg/min',
                route: 'IV infusion',
                frequency: 'Continuous',
                duration: 'Until hemodynamically stable',
                notes: 'For cardiogenic shock. Use cautiously with coarctation.',
            },
            monitoring: 'Four-extremity BP trending. Femoral pulses. Lactate clearance. Urine output.',
        },
        safetyLevel: 'critical',
    },
    {
        id: 'chd-hlhs',
        type: 'result',
        module: 3,
        title: 'Hypoplastic Left Heart Syndrome',
        body: '**HYPOPLASTIC LEFT HEART SYNDROME (HLHS)**\n\nUnderdeveloped left heart structures (LV, mitral valve, aortic valve, ascending aorta). Systemic circulation entirely dependent on PDA.\n\n**PRESENTATION**\n• May look well initially with open ductus\n• Rapid deterioration as ductus closes\n• Shock, acidosis, gray/mottled\n• Single S2 (no aortic component)\n• Hepatomegaly, poor pulses\n\n**CRITICAL CONCEPT**\nThe RV pumps to both pulmonary AND systemic circulations via PDA. Systemic perfusion = ductal blood flow.\n\n**MANAGEMENT PRIORITIES**\n\n1. **PGE1 IMMEDIATELY**\n[Prostaglandin E1](#/drug/prostaglandin-e1) 0.05-0.1 mcg/kg/min\n\n2. **AVOID HIGH FiO2**\n- High O2 dilates pulmonary vasculature\n- Steals blood from systemic circulation\n- Target SpO2 75-85% (NOT normal!)\n- Room air or low FiO2 preferred\n\n3. **ALLOW MILD ACIDOSIS**\n- Respiratory acidosis increases PVR\n- Helps balance Qp:Qs\n- Avoid aggressive hyperventilation\n\n4. **FLUID RESUSCITATION**\nCareful boluses - these are volume-dependent\n\n5. **INOTROPES**\nDopamine or Epinephrine if needed',
        recommendation: 'HLHS is DUCTAL-DEPENDENT. PGE1 immediately. AVOID HIGH O2 - target SpO2 75-85%. Prepare for staged surgical palliation (Norwood).',
        confidence: 'definitive',
        citation: [1, 2, 9],
        calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
        treatment: {
            firstLine: {
                drug: 'Prostaglandin E1 (Alprostadil)',
                dose: '0.05-0.1 mcg/kg/min',
                route: 'Continuous IV infusion',
                frequency: 'Continuous',
                duration: 'Until surgical intervention',
                notes: 'CRITICAL for systemic perfusion. Prepare intubation equipment for apnea.',
            },
            monitoring: 'Target SpO2 75-85% (NOT higher!). Near-infrared spectroscopy if available. Lactate trending. Urine output.',
        },
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 4: EMERGENCY MANAGEMENT
    // =====================================================================
    {
        id: 'chd-pge1',
        type: 'result',
        module: 4,
        title: 'Prostaglandin E1 (PGE1)',
        body: '**PROSTAGLANDIN E1 (Alprostadil) - THE DUCT DRUG**\n\nKeeps ductus arteriosus patent. Life-saving in ductal-dependent lesions.\n\n**INDICATIONS**\n• Suspected ductal-dependent CHD\n• Cyanotic neonate failing hyperoxia test\n• Shocked neonate with suspected CHD\n• Do NOT wait for echo confirmation\n\n**DOSING**\n• **Initial:** 0.05-0.1 mcg/kg/min\n• **Maintenance:** 0.01-0.05 mcg/kg/min (can often wean)\n• Titrate to effect (improved sats, perfusion, lactate)\n\n**SIDE EFFECTS (Common)**\n• **APNEA (12%)** - Be ready to intubate!\n• Fever\n• Hypotension\n• Flushing\n• Bradycardia\n• Seizure-like activity (jitteriness)\n\n**ADMINISTRATION**\n• Central line preferred (can use peripheral temporarily)\n• Prepare intubation equipment before starting\n• Do NOT bolus - continuous infusion only\n\n**RESPONSE TIME**\n• Effect seen within 15-30 minutes\n• Ductus may take hours to fully reopen if already constricted',
        recommendation: 'PGE1 0.05-0.1 mcg/kg/min continuous infusion. Be ready for apnea (12% incidence). Do not wait for echo to start if clinical suspicion high.',
        confidence: 'definitive',
        citation: [1, 2, 10],
        calculatorLinks: [{ id: 'peds-dose', label: 'Peds Dose Calculator' }],
        treatment: {
            firstLine: {
                drug: 'Prostaglandin E1 (Alprostadil)',
                dose: '0.05-0.1 mcg/kg/min (initial); 0.01-0.05 mcg/kg/min (maintenance)',
                route: 'Continuous IV infusion',
                frequency: 'Continuous',
                duration: 'Until surgical intervention',
                notes: 'Apnea in 12% - have intubation ready. Can use peripheral IV initially. Do not bolus.',
            },
            monitoring: 'Respiratory status (apnea watch), SpO2, BP, HR, temperature (may cause fever).',
        },
        safetyLevel: 'critical',
    },
    {
        id: 'chd-pge1-se',
        type: 'info',
        module: 4,
        title: 'PGE1 Side Effects',
        body: '**PGE1 SIDE EFFECTS AND MANAGEMENT**\n\n**APNEA (12%)**\n• Most significant side effect\n• More common at higher doses\n• May require intubation - have equipment ready\n• Usually occurs within first hour\n\n**FEVER**\n• Common, typically low-grade\n• May confuse clinical picture (looks like sepsis)\n• Usually benign, monitor\n\n**HYPOTENSION**\n• Due to vasodilation\n• Support with fluids, consider inotropes\n• May need to decrease infusion rate\n\n**FLUSHING/ERYTHEMA**\n• Cutaneous vasodilation\n• Benign, no treatment needed\n\n**BRADYCARDIA**\n• Less common\n• Monitor, decrease dose if significant\n\n**JITTERINESS/SEIZURE-LIKE ACTIVITY**\n• Usually benign, not true seizures\n• EEG typically normal\n\n**LONG-TERM EFFECTS (with prolonged use)**\n• Cortical hyperostosis (bone thickening)\n• Gastric outlet obstruction\n• Only with weeks of therapy',
        citation: [1, 10],
        next: 'chd-avoid',
        summary: 'PGE1 side effects: apnea (12%, have intubation ready), fever, hypotension, flushing, bradycardia, jitteriness',
    },
    {
        id: 'chd-avoid',
        type: 'info',
        module: 4,
        title: 'Pitfalls to Avoid',
        body: '**CRITICAL PITFALLS IN NEONATAL CHD**\n\n**1. HIGH FiO2 IN DUCTAL-DEPENDENT LESIONS**\n• High O2 constricts ductus arteriosus\n• May worsen cyanosis paradoxically\n• Target SpO2 75-85% in HLHS and similar lesions\n• Room air or minimal O2 often better\n\n**2. EXCESSIVE FLUID RESUSCITATION**\n• These are cardiogenic, not hypovolemic shock\n• Large fluid boluses may worsen pulmonary edema\n• Use small boluses (10 mL/kg) judiciously\n\n**3. WAITING FOR ECHO TO START PGE1**\n• If clinical suspicion high, start PGE1\n• Echo confirms but should not delay treatment\n• Better to give PGE1 and not need it than vice versa\n\n**4. MISSING COARCTATION**\n• Always check femoral pulses in sick neonates\n• Compare arm and leg BP\n• Can mimic sepsis (gray, acidotic, poor perfusion)\n\n**5. HYPERVENTILATION**\n• Blowing off CO2 decreases PVR\n• In HLHS, this steals systemic blood flow\n• Allow mild permissive hypercapnia\n\n**6. TREATING CHD AS SEPSIS ONLY**\n• Sick neonate DDx includes both\n• Start antibiotics AND PGE1 if uncertain\n• Check pulses and 4-extremity sats',
        citation: [1, 2, 9],
        next: 'chd-resus',
        summary: 'Avoid: high O2 in ductal-dependent lesions, excessive fluids, waiting for echo, missing coarctation, hyperventilation',
        safetyLevel: 'critical',
    },
    {
        id: 'chd-resus',
        type: 'info',
        module: 4,
        title: 'Stabilization Priorities',
        body: '**STABILIZATION OF NEONATE WITH SUSPECTED CHD**\n\n**A - AIRWAY**\n• Low threshold to intubate if on PGE1 (apnea risk)\n• Ketamine preferred for induction (maintains SVR)\n• Avoid excessive positive pressure (affects preload)\n\n**B - BREATHING**\n• Target SpO2 based on lesion:\n  - Cyanotic: accept 75-85%\n  - HLHS: target 75-85% (NOT higher)\n  - Shocked: monitor trend more than absolute\n• Avoid high FiO2 unless clear benefit\n• Avoid hyperventilation\n\n**C - CIRCULATION**\n• IV/IO access immediately\n• Start PGE1 if ductal-dependent suspected\n• Fluid boluses 10 mL/kg (not 20)\n• Inotropes: Dopamine or Epinephrine\n• Correct acidosis cautiously\n\n**D - DISABILITY**\n• Check glucose (hypoglycemia common)\n• Avoid hyperthermia\n• Monitor neurologic status\n\n**E - EXPOSURE**\n• Maintain normothermia\n• Full exam for associated anomalies',
        citation: [1, 2],
        next: 'chd-intubation',
        summary: 'Stabilization: low intubation threshold on PGE1, ketamine for induction, accept SpO2 75-85% in HLHS, small fluid boluses',
    },
    {
        id: 'chd-intubation',
        type: 'info',
        module: 4,
        title: 'Airway Management in CHD',
        body: '**INTUBATION IN CONGENITAL HEART DISEASE**\n\n**WHEN TO INTUBATE**\n• Apnea (PGE1-induced or otherwise)\n• Severe respiratory distress\n• Need for transport\n• Hemodynamic instability requiring sedation\n\n**PREFERRED AGENTS**\n\n**INDUCTION**\n• [Ketamine](#/drug/ketamine) 1-2 mg/kg IV\n  - Maintains SVR (good for CHD)\n  - Maintains HR\n  - Preserves respiratory drive longer\n\n• [Fentanyl](#/drug/fentanyl) 1-2 mcg/kg IV\n  - Less hemodynamic effect\n  - Use if ketamine contraindicated\n\n**AVOID**\n• Propofol - significant hypotension\n• High-dose opioids without preparation\n• Prolonged laryngoscopy (vagal)\n\n**PARALYSIS**\n• [Rocuronium](#/drug/rocuronium) 1 mg/kg\n• [Succinylcholine](#/drug/succinylcholine) 2 mg/kg (if rapid onset needed)\n\n**VENTILATION**\n• Avoid excessive positive pressure\n• Target normal ventilation (not hyperventilation)\n• FiO2 as low as tolerated',
        citation: [1, 11],
        next: 'chd-cards-consult',
        summary: 'Ketamine preferred for CHD intubation (maintains SVR); avoid propofol; avoid hyperventilation',
    },
    // =====================================================================
    // MODULE 5: DISPOSITION
    // =====================================================================
    {
        id: 'chd-cards-consult',
        type: 'info',
        module: 5,
        title: 'Cardiology Consultation',
        body: '**WHEN TO CALL CARDIOLOGY**\n\nCALL IMMEDIATELY:\n• Any neonate with suspected CHD\n• Cyanosis not explained by pulmonary disease\n• Shock with suspected cardiac etiology\n• Abnormal echo findings\n• Started on PGE1\n\n**INFORMATION TO PROVIDE:**\n• Age, weight, gestational age\n• Presenting symptoms and timeline\n• Current vitals including 4-extremity sats\n• Response to interventions (O2, PGE1)\n• CXR and ECG findings\n• Echo findings if available\n\n**ECHO**\n• Request urgent bedside echo if available\n• Formal pediatric cardiology echo for definitive diagnosis\n• Do NOT delay PGE1 for echo\n\n**TRANSFER CONSIDERATIONS**\n• Most critical CHD requires surgical center\n• Stabilize before transport\n• Ensure PGE1 running during transport\n• Consider air transport if distant',
        citation: [1, 2],
        next: 'chd-transfer',
        summary: 'Call cardiology for any suspected CHD; provide vitals, 4-extremity sats, CXR/ECG, response to PGE1; most need surgical center',
    },
    {
        id: 'chd-transfer',
        type: 'info',
        module: 5,
        title: 'Transfer Considerations',
        body: '**TRANSFER TO PEDIATRIC CARDIAC CENTER**\n\n**PRE-TRANSFER CHECKLIST:**\n\n☐ **Airway secured** (if on PGE1, low threshold to intubate)\n☐ **IV access** (two if possible, one for PGE1)\n☐ **PGE1 running** with adequate supply for transport\n☐ **Backup PGE1** infusion prepared\n☐ **Intubation equipment** available\n☐ **Blood glucose** checked and corrected\n☐ **Temperature** maintained\n☐ **Parents** informed and consented\n\n**TRANSPORT TEAM**\n• Neonatal or pediatric critical care transport team preferred\n• Must be capable of managing PGE1 and potential apnea\n• Should have intubation capability\n\n**DURING TRANSPORT**\n• Continue PGE1 infusion\n• Monitor for apnea, desaturation\n• Maintain IV access\n• Keep warm\n• Minimize stimulation\n\n**DESTINATION**\n• Pediatric cardiac surgery center\n• NICU or PICU with cardiology coverage',
        citation: [1, 2],
        next: 'chd-ecmo',
        summary: 'Pre-transfer: secure airway if on PGE1, two IVs, backup PGE1 for transport, transport team with intubation capability',
    },
    {
        id: 'chd-ecmo',
        type: 'info',
        module: 5,
        title: 'ECMO Considerations',
        body: '**ECMO IN NEONATAL CHD**\n\n**INDICATIONS**\n• Refractory cardiogenic shock despite maximal medical therapy\n• Bridge to surgery in unstable patient\n• Post-operative cardiac failure\n• Refractory arrhythmias with hemodynamic compromise\n\n**CONSIDERATIONS**\n• Requires ECMO-capable center (usually same as cardiac surgery)\n• Venoarterial (VA) ECMO for cardiac support\n• May be cannulated peripherally or centrally\n\n**RELATIVE CONTRAINDICATIONS**\n• Extreme prematurity\n• Lethal chromosomal abnormalities\n• Irreversible organ damage\n• Prolonged cardiac arrest with poor neurologic prognosis\n\n**TRANSPORT**\n• Some centers offer mobile ECMO\n• Consider early transfer before ECMO needed\n• Better to arrive at ECMO center before decompensation\n\n**DISCUSSION WITH FAMILY**\n• ECMO is bridge, not destination\n• Complex decision involving cardiology, surgery, ethics\n• Survival depends on underlying diagnosis',
        recommendation: 'ECMO for refractory cardiogenic shock or bridge to surgery. Requires VA ECMO. Consider early transfer to ECMO-capable center.',
        confidence: 'recommended',
        citation: [1, 12],
    },
    // =====================================================================
    // INFO NODES
    // =====================================================================
    {
        id: 'chd-info-5ts',
        type: 'info',
        module: 2,
        title: 'The 5 T\'s of Cyanotic CHD',
        body: '**THE 5 T\'s - CYANOTIC CONGENITAL HEART DISEASE**\n\n**1. TETRALOGY OF FALLOT**\n• Most common cyanotic CHD overall\n• VSD + pulmonary stenosis + overriding aorta + RVH\n• "Tet spells" - hypercyanotic episodes\n• Boot-shaped heart on CXR\n\n**2. TRANSPOSITION OF GREAT ARTERIES**\n• Most common cyanotic CHD in neonates\n• Parallel circulations - no mixing\n• Ductal-dependent\n• Egg-on-string CXR\n\n**3. TRICUSPID ATRESIA**\n• Absent tricuspid valve\n• Obligatory R→L shunt at atrial level\n• Requires ASD + VSD or PDA for survival\n\n**4. TOTAL ANOMALOUS PULMONARY VENOUS RETURN (TAPVR)**\n• Pulmonary veins drain to systemic circulation\n• Obstructed TAPVR = surgical emergency\n• Snowman heart on CXR (supracardiac type)\n\n**5. TRUNCUS ARTERIOSUS**\n• Single great vessel from heart\n• Supplies both systemic and pulmonary circulations\n• Variable cyanosis + CHF',
        citation: [1, 6],
    },
];
export const CHD_PEDS_NODE_COUNT = CHD_PEDS_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const CHD_PEDS_MODULE_LABELS = [
    'Initial Recognition',
    'Blue Babies',
    'Shocked Babies',
    'Emergency Management',
    'Disposition',
];
// -------------------------------------------------------------------
// Critical Actions
// -------------------------------------------------------------------
export const CHD_PEDS_CRITICAL_ACTIONS = [
    { text: 'Check femoral pulses in any sick neonate - weak/absent = coarctation until proven otherwise', nodeId: 'chd-start' },
    { text: '4-extremity BP and pulse ox: arm > leg BP by >20 mmHg or pre > post sat by >3% suggests ductal lesion', nodeId: 'chd-vitals' },
    { text: 'Hyperoxia test: PaO2 <100 on 100% FiO2 = cardiac cause; PaO2 >150 = pulmonary cause', nodeId: 'chd-hyperox' },
    { text: 'Do NOT wait for echo to start PGE1 - clinical suspicion is enough', nodeId: 'chd-pge1' },
    { text: 'PGE1 causes apnea in 12% - have intubation equipment ready before starting', nodeId: 'chd-pge1' },
    { text: 'AVOID high FiO2 in ductal-dependent lesions (especially HLHS) - target SpO2 75-85%', nodeId: 'chd-avoid' },
    { text: 'Tet spell: knee-chest position first, then morphine, then phenylephrine if refractory', nodeId: 'chd-tet-spell' },
    { text: 'TGA requires balloon atrial septostomy (BAS) for mixing - emergent cardiology consult', nodeId: 'chd-tga' },
    { text: 'Ketamine is preferred induction agent in CHD - maintains SVR', nodeId: 'chd-intubation' },
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const CHD_PEDS_CITATIONS = [
    { num: 1, text: 'Kemper AR, et al. Strategies for implementing screening for critical congenital heart disease. Pediatrics. 2011;128(5):e1259-e1267.' },
    { num: 2, text: 'Oster ME, et al. Lessons learned from newborn screening for critical congenital heart defects. Pediatrics. 2016;137(5):e20154573.' },
    { num: 3, text: 'Mahle WT, et al. Role of pulse oximetry in examining newborns for congenital heart disease. Pediatrics. 2009;124(2):823-836.' },
    { num: 4, text: 'Jones RWA, et al. Arterial oxygen tension and response to oxygen breathing in differential diagnosis of heart disease in infancy. Arch Dis Child. 1976;51(9):667-673.' },
    { num: 5, text: 'Steinhorn RH. Neonatal pulmonary hypertension. Pediatr Crit Care Med. 2010;11(2 Suppl):S79-S84.' },
    { num: 6, text: 'Allen HD, et al. Moss & Adams Heart Disease in Infants, Children, and Adolescents. 9th ed. Wolters Kluwer; 2016.' },
    { num: 7, text: 'Tanel RE, et al. Tetralogy of Fallot: A review for the emergency physician. Pediatr Emerg Care. 2020;36(6):301-306.' },
    { num: 8, text: 'Rosenthal E. Coarctation of the aorta from fetus to adult: curable condition or life-long disease process? Heart. 2005;91(11):1495-1502.' },
    { num: 9, text: 'Feinstein JA, et al. Hypoplastic left heart syndrome: Current considerations and expectations. J Am Coll Cardiol. 2012;59(1 Suppl):S1-S42.' },
    { num: 10, text: 'Silove ED, et al. Prostaglandin E1 infusion for neonates with critical congenital heart defects. J Pediatr. 1981;99(3):476-479.' },
    { num: 11, text: 'Gottlieb EA, et al. Anesthetic considerations for congenital heart disease. Anesth Clin. 2013;31(3):517-538.' },
    { num: 12, text: 'Thiagarajan RR, et al. Extracorporeal membrane oxygenation for cardiac indications in children. Pediatr Crit Care Med. 2016;17(11):e532-e538.' },
];
