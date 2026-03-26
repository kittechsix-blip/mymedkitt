// MedKitt — Epistaxis (Nosebleed) Management
// Initial assessment → Localization → Treatment escalation → Anticoagulation → Disposition.
// 5 modules: Assessment → Localization → Treatment → Anticoagulation → Disposition
// 28 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const EPISTAXIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'epi-start',
    type: 'info',
    module: 1,
    title: 'Epistaxis Assessment',
    body: '[Epistaxis Steps Summary](#/info/epistaxis-summary) - quick reference.\n\n**Immediate assessment:**\n\u2022 Hemodynamic stability (HR, BP, mental status)\n\u2022 Estimate blood loss (usually overestimated)\n\u2022 Establish IV access if significant bleeding\n\u2022 Type and screen if severe/recurrent\n\n**History:**\n\u2022 Duration and severity of current episode\n\u2022 Prior episodes and treatments\n\u2022 Anticoagulant/antiplatelet use\n\u2022 Bleeding diathesis (personal/family)\n\u2022 Recent trauma or nasal surgery\n\u2022 Hypertension history\n\n90% of epistaxis is anterior (Kiesselbach plexus). Posterior bleeds are less common but more severe.',
    citation: [1, 2],
    next: 'epi-stability',
  },

  {
    id: 'epi-stability',
    type: 'question',
    module: 1,
    title: 'Hemodynamic Status',
    body: 'Assess hemodynamic stability before proceeding.\n\n**Unstable indicators:**\n\u2022 Tachycardia (HR >100)\n\u2022 Hypotension (SBP <90)\n\u2022 Altered mental status\n\u2022 Active hemorrhage with continuous swallowing/spitting blood\n\u2022 Signs of hypovolemia',
    citation: [1, 3],
    options: [
      {
        label: 'Hemodynamically unstable',
        description: 'Tachycardia, hypotension, or signs of significant blood loss',
        next: 'epi-resuscitate',
        urgency: 'critical',
      },
      {
        label: 'Hemodynamically stable',
        description: 'Normal vital signs, no signs of significant blood loss',
        next: 'epi-initial-measures',
      },
    ],
  },

  {
    id: 'epi-resuscitate',
    type: 'info',
    module: 1,
    title: 'Resuscitation',
    body: '**Simultaneous resuscitation and hemorrhage control:**\n\n\u2022 Large-bore IV access x 2\n\u2022 NS bolus 500-1000 mL\n\u2022 Type and crossmatch\n\u2022 CBC, BMP, coagulation studies\n\u2022 Consider transfusion if Hgb <7 g/dL or ongoing hemorrhage\n\n**While resuscitating:**\n\u2022 Apply firm compression to bilateral nares (pinch fleshy part below nasal bones)\n\u2022 Patient upright with head slightly forward (reduces swallowing blood)\n\u2022 Suction oropharynx if needed\n\n**Early ENT notification** for unstable epistaxis - may require OR intervention.',
    citation: [1, 3],
    next: 'epi-initial-measures',
  },

  // =====================================================================
  // MODULE 2: LOCALIZATION
  // =====================================================================

  {
    id: 'epi-initial-measures',
    type: 'info',
    module: 2,
    title: 'Initial Hemostasis',
    body: '**Step 1: Compression**\nPatient applies firm, sustained pressure over the **fleshy part** of nose (not bony bridge) for **15-20 minutes** without releasing to check.\n\n**Step 2: Topical vasoconstrictor + anesthetic**\n\u2022 [Oxymetazoline](#/drug/oxymetazoline/epistaxis) 0.05% spray 2-3 sprays per nostril\n\u2022 OR [Phenylephrine](#/drug/phenylephrine/epistaxis) / [Epinephrine](#/drug/epinephrine/epistaxis) soaked pledget\n\u2022 Add [Lidocaine](#/drug/lidocaine/epistaxis) 4% for anesthesia\n\n**Step 3: Visualization**\nAfter 10-15 min with vasoconstrictor:\n\u2022 Have patient gently blow out clots\n\u2022 Suction if needed\n\u2022 Use nasal speculum + headlamp for visualization\n\u2022 Look for anterior bleeding site on septum (Kiesselbach plexus)',
    citation: [1, 2],
    next: 'epi-localize',
  },

  {
    id: 'epi-localize',
    type: 'question',
    module: 2,
    title: 'Bleeding Site Localization',
    body: 'After topical vasoconstriction and visualization:\n\n**Anterior bleed indicators (90%):**\n\u2022 Visible bleeding point on septum (Kiesselbach plexus)\n\u2022 Unilateral bleeding\n\u2022 Blood drips from anterior nares\n\n**Posterior bleed indicators (10%):**\n\u2022 Blood flows down posterior pharynx\n\u2022 Bilateral bleeding\n\u2022 No visible anterior source despite adequate visualization\n\u2022 Associated with: age >50, HTN, anticoagulation, bleeding disorder',
    citation: [1, 2, 4],
    options: [
      {
        label: 'Anterior bleed identified',
        description: 'Visible bleeding site on anterior septum',
        next: 'epi-anterior-cautery',
      },
      {
        label: 'Anterior bleed - no visible site',
        description: 'Suspected anterior but cannot identify source',
        next: 'epi-anterior-pack',
      },
      {
        label: 'Posterior bleed suspected',
        description: 'Blood in oropharynx, no anterior source visible',
        next: 'epi-posterior',
        urgency: 'urgent',
      },
      {
        label: 'Bleeding controlled with compression',
        description: 'No active bleeding after initial measures',
        next: 'epi-controlled-disposition',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: TREATMENT
  // =====================================================================

  {
    id: 'epi-anterior-cautery',
    type: 'question',
    module: 3,
    title: 'Chemical Cautery',
    body: '**Silver nitrate cautery technique:**\n\n1. Ensure adequate anesthesia (topical lidocaine)\n2. Dry the area with cotton-tipped applicator\n3. Apply silver nitrate stick to bleeding point for 5-10 seconds\n4. Work from periphery toward center\n5. Apply to limited area only (excessive cautery causes necrosis)\n\n**CAUTION:** Never cauterize **both sides** of septum in same session - risk of septal perforation.\n\n**Topical TXA option:**\nIf cautery unsuccessful or unavailable, apply [Tranexamic Acid](#/drug/tranexamic-acid/epistaxis) 500 mg in 5 mL soaked pledget x 10-20 minutes.',
    citation: [1, 5, 6],
    options: [
      {
        label: 'Cautery successful',
        description: 'Bleeding controlled after silver nitrate',
        next: 'epi-controlled-disposition',
      },
      {
        label: 'Cautery unsuccessful',
        description: 'Continued bleeding despite cautery',
        next: 'epi-anterior-pack',
      },
    ],
  },

  {
    id: 'epi-anterior-pack',
    type: 'result',
    module: 3,
    title: 'Anterior Nasal Packing',
    body: '**Packing options (in order of preference):**\n\n**1. Inflatable balloon device (Rapid Rhino, Epistat):**\n\u2022 Lubricate with water-soluble gel\n\u2022 Insert along floor of nose parallel to palate\n\u2022 Inflate with air (follow device instructions)\n\u2022 Secure with tape to prevent posterior displacement\n\n**2. Expanding sponge (Merocel, Rhino Rocket):**\n\u2022 Coat with antibiotic ointment\n\u2022 Insert along floor of nose\n\u2022 Hydrate with saline to expand\n\u2022 Apply anterior tape/clip if needed\n\n**3. Petrolatum gauze ribbon (traditional):**\n\u2022 Layer from posterior to anterior in accordion fashion\n\u2022 Pack firmly but avoid excessive pressure\n\u2022 More uncomfortable, higher complication rate\n\n**Apply topical [Oxymetazoline](#/drug/oxymetazoline/epistaxis) or [TXA](#/drug/tranexamic-acid/epistaxis) to packing before insertion.**',
    recommendation: 'Anterior nasal packing with balloon device or expanding sponge. Consider topical TXA-soaked packing for anticoagulated patients.',
    confidence: 'definitive',
    citation: [1, 2, 7],
    treatment: {
      firstLine: {
        drug: 'Rapid Rhino / Epistat',
        dose: 'Single device per nostril',
        route: 'Intranasal',
        frequency: 'Once',
        duration: '24-72 hours',
        notes: 'Inflate with air per device instructions. Leave in place 24-72h.',
      },
      alternative: {
        drug: 'Merocel sponge',
        dose: '8 cm or 10 cm sponge',
        route: 'Intranasal',
        frequency: 'Once',
        duration: '24-72 hours',
        notes: 'Hydrate with saline after insertion. Coat with antibiotic ointment.',
      },
      monitoring: 'Monitor for continued bleeding, pack displacement, or signs of posterior bleed. Antibiotic prophylaxis controversial but often given (cephalexin or amox-clav).',
    },
    next: 'epi-pack-check',
  },

  {
    id: 'epi-pack-check',
    type: 'question',
    module: 3,
    title: 'Packing Assessment',
    body: 'After anterior packing placement:\n\nObserve for 15-30 minutes to confirm hemostasis.\n\nCheck posterior pharynx for ongoing bleeding (may indicate posterior source or failed anterior pack).',
    citation: [1],
    options: [
      {
        label: 'Packing successful - bleeding controlled',
        description: 'No blood in posterior pharynx, pack in good position',
        next: 'epi-anticoag-check',
      },
      {
        label: 'Continued bleeding despite pack',
        description: 'Blood in posterior pharynx or around pack',
        next: 'epi-posterior',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'epi-posterior',
    type: 'info',
    module: 3,
    title: 'Posterior Epistaxis',
    body: '**Posterior bleeds are more serious** - often require admission and ENT intervention.\n\n**Risk factors:**\n\u2022 Age >50\n\u2022 Hypertension\n\u2022 Anticoagulation\n\u2022 Bleeding disorders\n\u2022 Hereditary hemorrhagic telangiectasia (HHT)\n\n**Source:** Usually sphenopalatine artery (branch of internal maxillary)\n\n**Call ENT early** - 18% of posterior epistaxis patients require surgical intervention.\n\n**Options:**\n1. Dual-balloon device (Epistat, Rapid Rhino Epistaxis)\n2. Foley catheter technique\n3. Surgical intervention (endoscopic sphenopalatine artery ligation, embolization)',
    citation: [3, 4, 8],
    next: 'epi-posterior-pack',
  },

  {
    id: 'epi-posterior-pack',
    type: 'result',
    module: 3,
    title: 'Posterior Packing',
    body: '**Option 1: Dual-balloon device (preferred)**\nDevices designed for posterior epistaxis (Epistat, Rapid Rhino Epistaxis):\n\u2022 Insert along nasal floor\n\u2022 Inflate posterior balloon first (5-10 mL air)\n\u2022 Then inflate anterior balloon (10-15 mL air)\n\u2022 Secure to prevent displacement\n\n**Option 2: Foley catheter technique**\n\u2022 10-14 French Foley catheter\n\u2022 Insert through nostril until tip visible in oropharynx\n\u2022 Inflate balloon with 10-15 mL saline\n\u2022 Gently pull forward until seated in posterior choana\n\u2022 Secure with umbilical clamp padded at nostril\n\u2022 Pack anterior nose with gauze or Merocel in front of Foley\n\n**All posterior packs require:**\n\u2022 Continuous SpO2 monitoring (20 mmHg PaO2 drop reported)\n\u2022 ENT consultation\n\u2022 Hospital admission\n\u2022 Consideration of antibiotic prophylaxis',
    recommendation: 'Place posterior pack using dual-balloon device or Foley catheter. ENT consultation required. Admit to monitored bed.',
    confidence: 'definitive',
    citation: [3, 4, 8],
    treatment: {
      firstLine: {
        drug: 'Dual-balloon device (Epistat)',
        dose: 'Posterior: 5-10 mL, Anterior: 10-15 mL',
        route: 'Intranasal',
        frequency: 'Once',
        duration: '48-72 hours',
        notes: 'Inflate posterior balloon first. Secure externally.',
      },
      alternative: {
        drug: 'Foley catheter',
        dose: '10-14 Fr, inflate balloon 10-15 mL saline',
        route: 'Intranasal to posterior choana',
        frequency: 'Once',
        duration: '48-72 hours',
        notes: 'Pack anterior nose after Foley positioned. Secure with padded clamp.',
      },
      monitoring: 'Continuous SpO2 monitoring. Watch for hypoxia, arrhythmias. ENT within 24h for definitive management.',
    },
    next: 'epi-posterior-disposition',
  },

  {
    id: 'epi-posterior-disposition',
    type: 'result',
    module: 3,
    title: 'Posterior Epistaxis Disposition',
    body: '**All posterior packs require admission.**\n\n**Admission orders:**\n\u2022 Continuous pulse oximetry\n\u2022 Cardiac monitoring (consider ICU/step-down)\n\u2022 Head of bed elevated\n\u2022 NPO if surgical intervention anticipated\n\u2022 IV access maintained\n\u2022 Serial H/H if significant blood loss\n\n**Antibiotic prophylaxis (controversial):**\n[Cephalexin](#/drug/cephalexin/epistaxis) 500 mg PO QID or [Amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/epistaxis) 875/125 mg PO BID\n\n**ENT follow-up:**\nPack removal typically at 48-72 hours by ENT.\nMay require surgical intervention (sphenopalatine artery ligation, embolization).',
    recommendation: 'Admit to monitored bed. Continuous SpO2. ENT consultation for pack removal at 48-72h or surgical intervention if needed.',
    confidence: 'definitive',
    citation: [3, 4, 8],
    treatment: {
      firstLine: {
        drug: 'Cephalexin',
        dose: '500 mg',
        route: 'PO',
        frequency: 'QID',
        duration: 'While pack in place',
        notes: 'Prophylaxis for toxic shock - evidence sparse but commonly given',
      },
      alternative: {
        drug: 'Amoxicillin-clavulanate',
        dose: '875/125 mg',
        route: 'PO',
        frequency: 'BID',
        duration: 'While pack in place',
      },
      monitoring: 'Continuous SpO2. Serial H/H. Watch for rebleeding, hypoxia, aspiration.',
    },
  },

  // =====================================================================
  // MODULE 4: ANTICOAGULATION MANAGEMENT
  // =====================================================================

  {
    id: 'epi-anticoag-check',
    type: 'question',
    module: 4,
    title: 'Anticoagulation Status',
    body: 'Is the patient on anticoagulant or antiplatelet therapy?\n\n**Agents to consider:**\n\u2022 Warfarin\n\u2022 DOACs (apixaban, rivaroxaban, dabigatran, edoxaban)\n\u2022 Heparin / LMWH\n\u2022 Aspirin\n\u2022 P2Y12 inhibitors (clopidogrel, ticagrelor, prasugrel)\n\n**50-60% of ED epistaxis patients are on antithrombotic therapy.**',
    citation: [9, 10],
    options: [
      {
        label: 'On warfarin',
        description: 'Check INR',
        next: 'epi-warfarin',
      },
      {
        label: 'On DOAC',
        description: 'Apixaban, rivaroxaban, dabigatran, edoxaban',
        next: 'epi-doac',
      },
      {
        label: 'On antiplatelet only',
        description: 'Aspirin, clopidogrel, etc.',
        next: 'epi-antiplatelet',
      },
      {
        label: 'Not anticoagulated',
        description: 'No antithrombotic medications',
        next: 'epi-controlled-disposition',
      },
    ],
  },

  {
    id: 'epi-warfarin',
    type: 'result',
    module: 4,
    title: 'Warfarin Management',
    body: '**Check INR immediately.**\n\n**Supratherapeutic INR (>3):**\n\u2022 [Vitamin K](#/drug/vitamin-k/warfarin) 2.5-5 mg PO (effect in 12-24h)\n\u2022 Hold warfarin until INR therapeutic\n\n**Therapeutic INR but refractory bleeding:**\n\u2022 Local hemostasis is still the priority\n\u2022 Consider holding 1-2 doses\n\u2022 [Vitamin K](#/drug/vitamin-k/warfarin) 1-2.5 mg PO if persistent\n\n**Life-threatening hemorrhage (rare):**\n\u2022 [4-factor PCC](#/drug/pcc/warfarin) 25-50 units/kg + [Vitamin K](#/drug/vitamin-k/warfarin) 10 mg IV\n\u2022 See [Anticoagulant Reversal](#/tree/anticoag-reversal) consult\n\n**Do NOT routinely reverse anticoagulation for epistaxis** - most can be managed with local measures. Reversal increases stroke/VTE risk.\n\n**Higher CHADS-VASC = more cautious about reversal.**',
    recommendation: 'Check INR. Local hemostasis first. Consider holding 1-2 doses or low-dose Vitamin K only if supratherapeutic or refractory. Do not routinely reverse.',
    confidence: 'recommended',
    citation: [9, 10, 11],
    treatment: {
      firstLine: {
        drug: 'Vitamin K (Phytonadione)',
        dose: '2.5-5 mg',
        route: 'PO',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'For supratherapeutic INR or refractory bleeding. Effect takes 12-24h.',
      },
      monitoring: 'Repeat INR at 24h. Reassess anticoagulation need with prescribing physician.',
    },
    next: 'epi-controlled-disposition',
  },

  {
    id: 'epi-doac',
    type: 'result',
    module: 4,
    title: 'DOAC Management',
    body: '**DOACs and epistaxis:**\n\u2022 DOACs cause LESS severe epistaxis than warfarin\n\u2022 Most can be managed without reversal\n\u2022 Holding 1-2 doses is reasonable (12-24h effect similar to vitamin K for warfarin)\n\n**Management approach:**\n\u2022 Aggressive local hemostasis\n\u2022 Consider holding 1-2 doses if severe/recurrent\n\u2022 Do NOT hold if high CHADS-VASC (stroke risk > bleed risk)\n\n**Life-threatening hemorrhage (very rare):**\n\u2022 Dabigatran: [Idarucizumab](#/drug/idarucizumab/dabigatran) 5 g IV\n\u2022 Xa inhibitors: [Andexanet alfa](#/drug/andexanet/doac) or [4-factor PCC](#/drug/pcc/doac)\n\u2022 See [Anticoagulant Reversal](#/tree/anticoag-reversal) consult\n\n**When to resume:**\nTypically resume 24-48h after bleeding controlled if high stroke risk.',
    recommendation: 'Local hemostasis is sufficient for most DOAC-associated epistaxis. Consider holding 1-2 doses for severe cases. Reversal rarely needed.',
    confidence: 'recommended',
    citation: [9, 10, 11],
    treatment: {
      firstLine: {
        drug: 'Hold DOAC',
        dose: 'Skip 1-2 doses',
        route: 'N/A',
        frequency: 'As needed',
        duration: '24-48 hours',
        notes: 'Only if severe/recurrent. Weigh stroke risk (CHADS-VASC) vs bleeding.',
      },
      monitoring: 'Resume DOAC 24-48h after bleeding controlled. Coordinate with prescribing physician.',
    },
    next: 'epi-controlled-disposition',
  },

  {
    id: 'epi-antiplatelet',
    type: 'result',
    module: 4,
    title: 'Antiplatelet Management',
    body: '**Antiplatelet agents and epistaxis:**\n\u2022 Aspirin and P2Y12 inhibitors may prolong bleeding\n\u2022 Local hemostasis is still effective\n\u2022 Generally do NOT hold antiplatelet therapy for epistaxis\n\n**Topical TXA particularly helpful:**\n[Tranexamic Acid](#/drug/tranexamic-acid/epistaxis) 500 mg in 5 mL on pledget x 10-20 min\nStudies show faster hemostasis than packing in antiplatelet patients.\n\n**Consider holding only if:**\n\u2022 Severe/life-threatening hemorrhage\n\u2022 No recent ACS/stent (minimum 1 month bare metal, 6-12 months drug-eluting)\n\u2022 Coordination with cardiology\n\n**DDAVP for refractory cases:**\n[Desmopressin](#/drug/desmopressin/bleeding) 0.3 mcg/kg IV may help override antiplatelet effect.',
    recommendation: 'Local hemostasis. Topical TXA is helpful. Generally do not hold antiplatelets unless severe hemorrhage and no recent coronary intervention.',
    confidence: 'recommended',
    citation: [5, 6, 11],
    treatment: {
      firstLine: {
        drug: 'Tranexamic Acid (topical)',
        dose: '500 mg in 5 mL',
        route: 'Topical (pledget)',
        frequency: 'Once',
        duration: '10-20 minutes',
        notes: 'Apply TXA-soaked pledget to bleeding site or pack.',
      },
      alternative: {
        drug: 'Desmopressin',
        dose: '0.3 mcg/kg',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose over 30 min',
        notes: 'For refractory bleeding on antiplatelets. Max 20 mcg.',
      },
      monitoring: 'If holding antiplatelet: coordinate with cardiology. Watch for thrombotic complications.',
    },
    next: 'epi-controlled-disposition',
  },

  // =====================================================================
  // MODULE 5: DISPOSITION
  // =====================================================================

  {
    id: 'epi-controlled-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition Decision',
    body: 'Bleeding is now controlled.\n\n**Assess disposition based on:**\n\u2022 Need for nasal packing\n\u2022 Anticoagulation status\n\u2022 Hemoglobin level\n\u2022 Ability to follow up\n\u2022 Risk of recurrence',
    citation: [1, 2],
    options: [
      {
        label: 'No packing required',
        description: 'Bleeding controlled with compression/cautery alone',
        next: 'epi-discharge-no-pack',
      },
      {
        label: 'Anterior packing in place',
        description: 'Stable patient with anterior pack',
        next: 'epi-discharge-with-pack',
      },
      {
        label: 'Requires admission',
        description: 'Ongoing concerns, significant blood loss, or high-risk features',
        next: 'epi-admit-anterior',
      },
    ],
  },

  {
    id: 'epi-discharge-no-pack',
    type: 'result',
    module: 5,
    title: 'Discharge - No Packing',
    body: '**Discharge instructions:**\n\n**Prevention:**\n\u2022 Saline nasal spray 2-3x daily\n\u2022 Petroleum jelly to anterior septum BID\n\u2022 Humidifier at night\n\u2022 Avoid nose picking, forceful blowing\n\u2022 Avoid NSAIDs\n\n**If bleeding recurs:**\n\u2022 Pinch fleshy part of nose firmly x 15-20 min\n\u2022 Lean forward (not back)\n\u2022 [Oxymetazoline](#/drug/oxymetazoline/epistaxis) spray if available\n\u2022 Return if not controlled in 20 min\n\n**Follow-up:**\n\u2022 PCP within 1-2 weeks\n\u2022 ENT referral if recurrent (>2 episodes/month)\n\n**Return precautions:**\n\u2022 Bleeding not controlled with 20 min pressure\n\u2022 Large volume blood loss\n\u2022 Dizziness, weakness, palpitations',
    recommendation: 'Discharge with prevention instructions and return precautions. PCP follow-up in 1-2 weeks. ENT if recurrent.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  {
    id: 'epi-discharge-with-pack',
    type: 'result',
    module: 5,
    title: 'Discharge - Anterior Pack',
    body: '**Patient is stable with anterior packing in place.**\n\n**Discharge instructions:**\n\u2022 Keep pack in place - do not remove or adjust\n\u2022 Sleep with head elevated\n\u2022 Take soft diet\n\u2022 Avoid strenuous activity\n\n**Antibiotic prophylaxis:**\n[Cephalexin](#/drug/cephalexin/epistaxis) 500 mg PO QID or [Amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/epistaxis) 875/125 mg PO BID while pack in place. (Evidence limited but commonly prescribed to prevent toxic shock.)\n\n**Follow-up:**\nENT within **24-48 hours** for pack removal and reassessment.\n\n**Return immediately if:**\n\u2022 Bleeding around or behind pack\n\u2022 Difficulty breathing\n\u2022 Fever\n\u2022 Worsening pain\n\u2022 Signs of infection',
    recommendation: 'Discharge with anterior pack. Antibiotic prophylaxis. Mandatory ENT follow-up at 24-48h for pack removal.',
    confidence: 'definitive',
    citation: [1, 2, 7],
    treatment: {
      firstLine: {
        drug: 'Cephalexin',
        dose: '500 mg',
        route: 'PO',
        frequency: 'QID',
        duration: 'While pack in place (24-72h)',
        notes: 'Prophylaxis for toxic shock syndrome.',
      },
      alternative: {
        drug: 'Amoxicillin-clavulanate',
        dose: '875/125 mg',
        route: 'PO',
        frequency: 'BID',
        duration: 'While pack in place',
      },
      monitoring: 'ENT follow-up in 24-48h for pack removal. Return if bleeding, fever, or difficulty breathing.',
    },
  },

  {
    id: 'epi-admit-anterior',
    type: 'result',
    module: 5,
    title: 'Admit - Anterior Epistaxis',
    body: '**Admission indications for anterior epistaxis:**\n\u2022 Significant anemia (Hgb <8 g/dL) requiring transfusion\n\u2022 Unable to achieve hemostasis in ED\n\u2022 High-risk anticoagulated patient\n\u2022 Coagulopathy requiring correction\n\u2022 Unreliable patient / unable to follow up\n\u2022 Multiple ED visits for recurrent epistaxis\n\n**Admission orders:**\n\u2022 Cardiac/SpO2 monitoring\n\u2022 Serial H/H if significant blood loss\n\u2022 IV access\n\u2022 Head of bed elevated\n\u2022 Antibiotic prophylaxis if packed\n\u2022 ENT consultation\n\n**Goal:** Definitive hemostasis, correction of coagulopathy, and safe discharge with ENT follow-up.',
    recommendation: 'Admit for monitoring, serial labs, ENT consultation, and definitive management.',
    confidence: 'recommended',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Cephalexin',
        dose: '500 mg',
        route: 'PO',
        frequency: 'QID',
        duration: 'While pack in place',
        notes: 'Prophylaxis while nasal pack in place.',
      },
      monitoring: 'Serial H/H. Continuous SpO2 if posterior pack. ENT for pack management.',
    },
  },

  {
    id: 'epi-ent-triggers',
    type: 'info',
    module: 5,
    title: 'ENT Consultation Triggers',
    body: '**Emergent ENT consultation:**\n\u2022 Posterior epistaxis (any)\n\u2022 Uncontrolled bleeding despite anterior packing\n\u2022 Hemodynamic instability\n\u2022 Need for surgical intervention (ligation, embolization)\n\n**Urgent ENT consultation:**\n\u2022 Bilateral anterior packs\n\u2022 Recurrent epistaxis (>2 episodes)\n\u2022 Suspected septal abnormality\n\u2022 Suspected HHT (hereditary hemorrhagic telangiectasia)\n\n**Outpatient ENT referral:**\n\u2022 Recurrent anterior epistaxis\n\u2022 Nasal mass or abnormality on exam\n\u2022 Family history of bleeding disorders\n\u2022 Chronic nasal obstruction',
    citation: [1, 2, 3],
    next: 'epi-controlled-disposition',
  },

  {
    id: 'epi-htn-management',
    type: 'info',
    module: 1,
    title: 'Hypertension and Epistaxis',
    body: '**Common misconception:** Hypertension CAUSES epistaxis.\n\n**Reality:**\n\u2022 Epistaxis causes anxiety which raises BP\n\u2022 HTN may exacerbate but rarely initiates bleeding\n\u2022 BP usually normalizes after bleeding controlled\n\n**Management:**\n1. **Control the bleeding first** - local hemostasis is the priority\n2. Recheck BP after hemorrhage controlled and patient calm\n3. If BP remains severely elevated (>180/120) after bleeding controlled, consider oral antihypertensive\n4. Do NOT delay local treatment to manage BP\n5. Do NOT use IV antihypertensives for epistaxis (may cause hypotension)\n\n**AAO-HNS guideline:** Elevated BP should not alter immediate management of epistaxis. [1]',
    citation: [1, 2],
  },

  {
    id: 'epi-topical-txa',
    type: 'info',
    module: 3,
    title: 'Topical TXA in Epistaxis',
    body: '**Topical Tranexamic Acid:**\n[Tranexamic Acid](#/drug/tranexamic-acid/epistaxis) 500 mg in 5 mL solution applied via pledget.\n\n**Evidence:**\n\u2022 RCT (124 patients on antiplatelets): TXA vs anterior packing\n  - Faster hemostasis at 10 min\n  - Less rebleeding at 24h and 1 week\n  - Shorter ED stay\n  - Higher patient satisfaction [5]\n\n\u2022 NoPAC trial: TXA vs placebo for epistaxis uncontrolled with first aid\n  - No significant difference in this population [6]\n\n**Interpretation:**\nTXA may be most useful:\n\u2022 In antiplatelet/anticoagulated patients\n\u2022 As adjunct to packing\n\u2022 Before proceeding to more invasive interventions\n\n**Application:**\nSoak dental roll or cotton pledget in TXA solution, insert into bleeding nostril, hold with compression x 10-20 min.',
    citation: [5, 6],
  },

];

export const EPISTAXIS_NODE_COUNT = EPISTAXIS_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const EPISTAXIS_MODULE_LABELS = [
  'Assessment',
  'Localization',
  'Treatment',
  'Anticoagulation',
  'Disposition',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const EPISTAXIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Tunkel DE, et al. Clinical Practice Guideline: Nosebleed (Epistaxis). Otolaryngol Head Neck Surg. 2020;162(1_suppl):S1-S38. doi:10.1177/0194599819890327' },
  { num: 2, text: 'EB Medicine. Management of Epistaxis in the Urgent Care Setting. Evidence-Based Urgent Care. 2024;3(11).' },
  { num: 3, text: 'Tintinalli JE, et al. Tintinalli\'s Emergency Medicine: A Comprehensive Study Guide. 9th ed. McGraw-Hill; 2020.' },
  { num: 4, text: 'REBEL EM. Posterior Epistaxis Core Cast. rebelem.com. Accessed 2024.' },
  { num: 5, text: 'Zahed R, et al. Topical Tranexamic Acid Compared With Anterior Nasal Packing for Treatment of Epistaxis in Patients Taking Antiplatelet Drugs. Acad Emerg Med. 2018;25(3):261-266.' },
  { num: 6, text: 'Reuben A, et al. A randomised controlled trial of tranexamic acid for the treatment of spontaneous epistaxis (NoPAC). Ann Emerg Med. 2021;77(6):631-640.' },
  { num: 7, text: 'ALiEM. Epistaxis Management in the Emergency Department: A Helpful Mnemonic. aliem.com. Accessed 2024.' },
  { num: 8, text: 'REBEL EM. Do Patients with Posterior Epistaxis Managed by Posterior Packs Require ICU Admission? rebelem.com. Accessed 2024.' },
  { num: 9, text: 'The role of oral anticoagulants in epistaxis. J Laryngol Otol. 2018;132(7):583-587.' },
  { num: 10, text: 'Emergency Medicine Cases. Episode 89: DOACs Part 2 - Bleeding and Reversal Agents. emergencymedicinecases.com.' },
  { num: 11, text: 'Tomaselli GF, et al. 2020 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants. J Am Coll Cardiol. 2020;76(5):594-622.' },
];

// -------------------------------------------------------------------
// Clinical Notes
// -------------------------------------------------------------------

export const EPISTAXIS_CLINICAL_NOTES: string[] = [
  '90% of epistaxis is anterior (Kiesselbach plexus). Most can be managed with compression + topical vasoconstriction.',
  'Posterior epistaxis is rare but serious - 18% require surgical intervention. All require admission.',
  'Topical TXA (500 mg in 5 mL) may be particularly helpful in antiplatelet/anticoagulated patients.',
  'Do NOT routinely reverse anticoagulation for epistaxis - local hemostasis is effective in most cases.',
  'Hypertension is often a result of epistaxis (anxiety/pain), not the cause. Control bleeding first, then reassess BP.',
  'Never cauterize both sides of the septum in the same session - risk of septal perforation.',
  'Anterior packs should be removed at 24-72h by ENT. Prophylactic antibiotics controversial but commonly given.',
];
