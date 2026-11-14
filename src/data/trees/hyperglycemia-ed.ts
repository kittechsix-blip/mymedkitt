import type { DecisionNode } from '../../models/types.js';
interface Citation { num: number; text: string; }
export const HYPERGLYCEMIA_ED_CITATIONS: Citation[] = [
  {
    num: 1,
    text: "ADA Professional Practice Committee. Pharmacologic Approaches to Glycemic Treatment: Standards of Care in Diabetes 2026. https://doi.org/10.2337/dc26-S009"
  },
  {
    num: 2,
    text: "Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: Consensus Report. Diabetes Care 2024. https://doi.org/10.2337/dci24-0032"
  },
  {
    num: 3,
    text: "ADA Professional Practice Committee. Diabetes Care in the Hospital: Standards of Care 2026. https://doi.org/10.2337/dc26-S016"
  },
  {
    num: 4,
    text: "AACE. Comprehensive Diabetes Care Guideline 2022. https://doi.org/10.1016/j.eprac.2022.08.002"
  },
  {
    num: 5,
    text: "DailyMed. Metformin ER prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=68d0b1a6-c99e-42cf-afdf-b71ee73c4424"
  },
  {
    num: 6,
    text: "DailyMed. Glipizide immediate-release prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c4dfe64-d1c5-65ec-e063-6394a90aead5"
  },
  {
    num: 7,
    text: "DailyMed. Pioglitazone prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d740d2a2-b26d-4b16-aedc-e4b4b1c94daa"
  },
  {
    num: 8,
    text: "DailyMed. Sitagliptin prescribing information. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f85a48d0-0407-4c50-b0fa-7673a160bf01"
  },
  {
    num: 9,
    text: "DailyMed. Jardiance prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5777b8a8-ada6-4950-8548-43a1de11f075"
  },
  {
    num: 10,
    text: "Sanofi. Lantus U-100 prescribing information. https://products.sanofi.us/lantus/lantus.html"
  },
  {
    num: 11,
    text: "Lilly. Humalog prescribing information. https://pi.lilly.com/us/humalog-uspi.pdf"
  },
  {
    num: 12,
    text: "Driver BE et al. Comparison of two glycemic discharge goals in ED patients: randomized trial. Am J Emerg Med 2019. https://pubmed.ncbi.nlm.nih.gov/30316635/"
  },
  {
    num: 13,
    text: "HRSA Find a Health Center. https://findahealthcenter.hrsa.gov/ ; Walmart Prescription Program. https://www.walmart.com/cp/4-prescriptions/1078664 ; verify actual dispensing price and eligibility."
  },
  {
    num: 14,
    text: "DailyMed. Metformin immediate-release prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fb296500-55cb-45ce-be0c-59aa2e3d4624"
  }
];
export const HYPERGLYCEMIA_ED_CRITICAL_ACTIONS = [
  {
    text: "Exclude DKA/HHS and insulin deficiency before outpatient type 2 treatment.",
    nodeId: "hg-crisis"
  },
  {
    text: "Do not give repeated corrections without reviewing active insulin.",
    nodeId: "hg-meal-plan"
  },
  {
    text: "Confirm medication, food, monitoring and follow-up access before discharge.",
    nodeId: "hg-access-check"
  },
  {
    text: "Basal dose is not total daily basal-bolus insulin.",
    nodeId: "hg-basal"
  }
];
export const HYPERGLYCEMIA_ED_MODULE_LABELS = ['Safety','Labs & cause','ED care & access','Noninsulin treatment','Start insulin','Adjust & cover meals','Disposition'];
export const HYPERGLYCEMIA_ED_NODES: DecisionNode[] = [
  {
    id: "hg-start",
    type: "question",
    module: 1,
    title: "Hyperglycemia: ED treatment & bridge care",
    body: "Adult bridge care when primary care is difficult to access. First exclude a crisis; then choose a treatment the patient can obtain and use safely.\n\n[Rapid roadmap](#/info/hg-steps) \u2022 [Do NOT](#/info/hyperglycemia-ed-stop)\n\nIs there altered mental status, hemodynamic instability, significant dehydration, vomiting, deep breathing, ketones/acidosis, or suspected insulin deficiency?",
    citation: [
      2,
      3
    ],
    options: [
      {
        label: "Possible crisis or insulin deficiency",
        next: "hg-crisis"
      },
      {
        label: "Stable, crisis not suspected",
        next: "hg-scope"
      }
    ],
    calculatorLinks: [
      {
        id: "hg-labs",
        label: "Labs",
        kind: "info"
      },
      {
        id: "hg-meds",
        label: "Meds",
        kind: "info"
      },
      {
        id: "hg-insulin",
        label: "Insulin",
        kind: "info"
      },
      {
        id: "hg-meal-correction",
        label: "Meal + Correction",
        kind: "calculator"
      }
    ]
  },
  {
    id: "hg-crisis",
    type: "question",
    module: 1,
    title: "Possible DKA, HHS or insulin deficiency",
    body: "[Diagnostic criteria and labs](#/info/hg-labs). Evaluate ketones and acidosis even with a near-normal glucose when risk is present. Establish IV access, monitor, assess volume/electrolytes and precipitating illness. Start a monitored crisis pathway rather than oral outpatient therapy.\n\n[Crisis treatment consult](#/tree/dka). Use the 2024 criteria in this consult; mixed presentations are possible.",
    citation: [
      2
    ],
    options: [
      {
        label: "Crisis confirmed, cannot exclude, or clinically unstable",
        next: "hg-admit"
      },
      {
        label: "Crisis excluded after evaluation",
        next: "hg-scope"
      }
    ]
  },
  {
    id: "hg-scope",
    type: "question",
    module: 1,
    title: "Is routine adult type 2 bridge care appropriate?",
    body: "Pregnancy, age under 18, suspected new type 1 diabetes, pump failure or interruption of essential basal insulin require a tailored urgent plan. Body habitus or adult age does not exclude type 1 diabetes.",
    citation: [
      1,
      2
    ],
    options: [
      {
        label: "Pregnant, pediatric, type 1 concern or pump problem",
        next: "hg-special"
      },
      {
        label: "Stable nonpregnant adult with likely type 2 diabetes",
        next: "hg-labs-node"
      }
    ]
  },
  {
    id: "hg-special",
    type: "info",
    module: 1,
    title: "Use a specialist or monitored pathway",
    body: "Obtain urgent diabetes/obstetric/pediatric input appropriate to the presentation. New insulin deficiency needs insulin and teaching, not oral agents alone. Maintain required basal coverage in established type 1 diabetes while arranging treatment; do not use the type 2 starter to replace it. [Pediatric DKA](#/tree/peds-dka).",
    citation: [
      1,
      2,
      3
    ],
    next: "hg-admit"
  },
  {
    id: "hg-labs-node",
    type: "info",
    module: 2,
    title: "Order tests that change today\u2019s plan",
    body: "Use [Labs & crisis criteria](#/info/hg-labs). Review glucose, electrolytes and eGFR before changing treatment. Target ketones/VBG, osmolality, pregnancy and precipitant testing to the presentation. HbA1c helps distinguish sustained hyperglycemia from a transient rise but must be interpreted in context.",
    citation: [
      2,
      3
    ],
    next: "hg-cause"
  },
  {
    id: "hg-cause",
    type: "question",
    module: 2,
    title: "Why is glucose high today?",
    body: "Ask about medications actually taken, empty prescriptions, cost, steroids, infection, reduced intake and recent weight loss. Reconcile the exact insulin product and last dose. Do not call an unaffordable prescription a drug failure.",
    citation: [
      1,
      3
    ],
    options: [
      {
        label: "New diagnosis or no medication",
        next: "hg-ed-care"
      },
      {
        label: "Ran out or missed treatment",
        next: "hg-refill"
      },
      {
        label: "Taking treatment but still high",
        next: "hg-pattern"
      }
    ]
  },
  {
    id: "hg-refill",
    type: "info",
    module: 3,
    title: "Restore access before escalating",
    body: "Confirm the previously effective regimen and interval missed; reassess kidney function, food intake and illness before restarting. Do not give a double catch-up dose. For missed insulin, verify which dose remains active and whether insulin deficiency/crisis is present. [Costs & access](#/info/hg-access).",
    citation: [
      1,
      3
    ],
    next: "hg-ed-care"
  },
  {
    id: "hg-pattern",
    type: "info",
    module: 3,
    title: "Separate missed doses from inadequate treatment",
    body: "Review actual glucose logs, medication dose, injection technique, storage, steroid timing and diet. Distinguish fasting elevation from post-meal excursions and identify any lows. An isolated ED reading is not enough to create an aggressive titration schedule.",
    citation: [
      1,
      3
    ],
    next: "hg-ed-care"
  },
  {
    id: "hg-ed-care",
    type: "question",
    module: 3,
    title: "Treat symptoms and reassess",
    body: "Give oral fluids if tolerated and clinically appropriate; use IV isotonic fluid for significant depletion with individualized reassessment in HF/CKD. Correct clinically important electrolyte problems. If insulin is given in the ED, monitor glucose and response long enough to address its continuing effect. Treat the precipitating illness.",
    citation: [
      2,
      3
    ],
    options: [
      {
        label: "Stable, drinking/eating and ready for treatment planning",
        next: "hg-access-check"
      },
      {
        label: "Persistent symptoms, AKI/electrolyte problems or unsafe trajectory",
        next: "hg-admit"
      }
    ]
  },
  {
    id: "hg-access-check",
    type: "question",
    module: 3,
    title: "Can the proposed treatment work outside the ED?",
    body: "Check money, pharmacy access, reliable meals, supplies, storage, health literacy and a named follow-up option. Use [Access plan](#/info/hg-access). Lack of primary care should trigger a real bridge arrangement, not an automatic discharge with a referral list.",
    citation: [
      1,
      3
    ],
    options: [
      {
        label: "Medication, education, monitoring and follow-up can be arranged",
        next: "hg-insulin-decision"
      },
      {
        label: "Need help arranging them",
        next: "hg-case-management"
      }
    ]
  },
  {
    id: "hg-case-management",
    type: "question",
    module: 3,
    title: "Solve the access gap before discharge",
    body: "Involve case management, pharmacy and the local safety-net/bridge clinic. Confirm medication and supply availability and an appointment/contact while the patient is present. The complete cost includes testing and injection supplies. [Uninsured options](#/info/hg-access).",
    citation: [
      1,
      3
    ],
    options: [
      {
        label: "Safe plan secured",
        next: "hg-insulin-decision"
      },
      {
        label: "Essential treatment or monitoring still unavailable",
        next: "hg-admit"
      }
    ]
  },
  {
    id: "hg-insulin-decision",
    type: "question",
    module: 4,
    title: "Does this patient need insulin now?",
    body: "Suspected insulin deficiency or crisis is outside this branch. For likely type 2 diabetes, symptoms/catabolism, A1c >10% or glucose >=300 mg/dL should prompt consideration of insulin, not a reflex dose or admission. Review severity, trend, current medication and the feasibility of a safe noninsulin plan.",
    citation: [
      1,
      3
    ],
    options: [
      {
        label: "Noninsulin treatment appropriate",
        next: "hg-no-insulin"
      },
      {
        label: "Insulin indicated and safe plan achievable",
        next: "hg-insulin-status"
      },
      {
        label: "Insulin indicated but safe outpatient start not achievable",
        next: "hg-admit"
      }
    ]
  },
  {
    id: "hg-no-insulin",
    type: "question",
    module: 4,
    title: "Insulin is not necessary for every high reading",
    body: "For stable uncomplicated type 2 diabetes without insulin deficiency/catabolism, choose oral or other noninsulin therapy using [Medication selector](#/info/hg-meds). This is not permission to ignore persistent symptoms or deterioration. A noninsulin strategy still needs monitoring and reassessment.",
    citation: [
      1,
      3
    ],
    options: [
      {
        label: "Start or restart metformin if eligible",
        next: "hg-metformin"
      },
      {
        label: "Metformin unsuitable or additional agent needed",
        next: "hg-oral-choice"
      },
      {
        label: "Existing agent can be safely titrated",
        next: "hg-oral-titrate"
      }
    ]
  },
  {
    id: "hg-metformin",
    type: "info",
    module: 4,
    title: "Choose the metformin formulation",
    body: "Open the formulation-specific card: [Metformin ER](#/drug/hg-metformin-er/ED bridge care) or [Metformin IR](#/drug/hg-metformin-ir/ED bridge care). Check eGFR, dehydration/AKI and contraindications. Match the prescription to the formulation and slow titration plan.",
    citation: [
      5,
      14
    ],
    next: "hg-dispo"
  },
  {
    id: "hg-oral-choice",
    type: "info",
    module: 4,
    title: "Choose an affordable, safe alternative or add-on",
    body: "[Glipizide IR](#/drug/hg-glipizide/ED bridge care): cost advantage but meals/monitoring must be reliable. [Pioglitazone](#/drug/hg-pioglitazone/ED bridge care): delayed benefit and HF/edema limitations. [Sitagliptin](#/drug/hg-sitagliptin/ED bridge care): renal-adjusted, lower intrinsic hypoglycemia risk, check cost.\n\nUse [Medication selector](#/info/hg-meds) for cardiorenal and weight-directed alternatives.",
    citation: [
      1,
      6,
      7,
      8
    ],
    next: "hg-dispo"
  },
  {
    id: "hg-oral-titrate",
    type: "info",
    module: 4,
    title: "Titrate the actual medication, not the glucose number",
    body: "Confirm dose, formulation, tolerance and adherence. Follow the [specific drug card](#/info/hg-meds) for increments and maximums; do not accelerate titration to correct today\u2019s value. If the appropriate tolerated dose is insufficient, add a complementary agent or reconsider insulin.",
    citation: [
      1,
      3
    ],
    next: "hg-dispo"
  },
  {
    id: "hg-insulin-status",
    type: "question",
    module: 5,
    title: "New insulin or an existing regimen?",
    body: "[Insulin comparison and tools](#/info/hg-insulin). Choose a simple, explainable plan with a verified product and reliable monitoring.",
    citation: [
      1,
      3
    ],
    options: [
      {
        label: "Insulin-naive stable type 2: start basal",
        next: "hg-basal"
      },
      {
        label: "Already using basal insulin",
        next: "hg-basal-pattern"
      },
      {
        label: "Already using basal-bolus, premix or concentrated insulin",
        next: "hg-existing"
      }
    ]
  },
  {
    id: "hg-basal",
    type: "info",
    module: 5,
    title: "Start basal insulin safely",
    body: "Use [Glargine U-100 bridge card](#/drug/hg-glargine/ED bridge care) and [Basal starter](#/calculator/hg-basal-start). The calculator requires explicit eligibility confirmation. Do not use a generic TDD estimate as a basal dose. Provide the monitoring/teaching bundle before discharge.",
    citation: [
      1,
      10
    ],
    next: "hg-dispo",
    calculatorLinks: [
      {
        id: "hg-basal-start",
        label: "Basal starter",
        kind: "calculator"
      }
    ]
  },
  {
    id: "hg-basal-pattern",
    type: "question",
    module: 6,
    title: "Which glucose pattern needs attention?",
    body: "Review several fasting readings and any low values. Verify doses were taken and that symptoms/renal function/intake are stable.",
    citation: [
      1,
      3
    ],
    options: [
      {
        label: "Fasting consistently above individualized target, no lows",
        next: "hg-titrate"
      },
      {
        label: "Fasting at goal but meal excursions persist",
        next: "hg-prandial"
      },
      {
        label: "Low readings, poor intake or unclear pattern",
        next: "hg-dose-review"
      }
    ]
  },
  {
    id: "hg-titrate",
    type: "info",
    module: 6,
    title: "Use a cautious basal titration plan",
    body: "Open [Basal titration](#/calculator/hg-basal-titrate). Use a multi-day fasting pattern and verify time since the last change. Dose reductions and assessment of hypoglycemia take priority over escalation. Write the exact limits and follow-up plan; avoid repeated unsupervised increases.",
    citation: [
      1,
      3
    ],
    next: "hg-dispo",
    calculatorLinks: [
      {
        id: "hg-basal-titrate",
        label: "Basal titration",
        kind: "calculator"
      }
    ]
  },
  {
    id: "hg-prandial",
    type: "info",
    module: 6,
    title: "Address meals instead of escalating basal",
    body: "Consider an appropriate GLP-1-based option if feasible, or clinician-directed basal-plus [lispro U-100](#/drug/hg-lispro/ED bridge care). Start with the meal causing the greatest excursion. Review sulfonylurea use and the basal dose to reduce hypoglycemia risk. [Meal teaching](#/info/hg-meals).",
    citation: [
      1,
      11
    ],
    next: "hg-meal-plan"
  },
  {
    id: "hg-existing",
    type: "question",
    module: 6,
    title: "Review the whole insulin regimen",
    body: "Confirm every basal and prandial dose, concentration, device and recent correction. Look for hypoglycemia, missed doses, technique issues or inability to afford supplies. Pump/AID, premix, concentrated products and uncertain doses require individualized review, not a generic conversion.",
    citation: [
      1,
      3
    ],
    options: [
      {
        label: "Established rapid-analog ratios and safe meal plan",
        next: "hg-meal-plan"
      },
      {
        label: "Unknown doses, complex regimen or high hypoglycemia risk",
        next: "hg-dose-review"
      }
    ]
  },
  {
    id: "hg-dose-review",
    type: "info",
    module: 6,
    title: "Pause escalation and obtain a reviewed plan",
    body: "Treat low glucose if present. Review renal function, meals, insulin timing and interacting treatment. Obtain pharmacy/endocrine help for a dose reduction, conversion or complex regimen. Observe/admit when a safe plan cannot be established. [Hypoglycemia](#/tree/hypoglycemia).",
    citation: [
      1,
      3
    ],
    next: "hg-dispo"
  },
  {
    id: "hg-meal-plan",
    type: "info",
    module: 6,
    title: "Meal coverage and correction are separate",
    body: "Use [Meal + Correction](#/calculator/hg-meal-correction) only with established clinician-reviewed ratios, available food and no active prior bolus. Unknown insulin-on-board prevents an automatic correction recommendation. [Carb-counting guide and example](#/info/hg-meals).",
    citation: [
      1,
      4,
      11
    ],
    next: "hg-dispo",
    calculatorLinks: [
      {
        id: "hg-meal-correction",
        label: "Meal + Correction",
        kind: "calculator"
      }
    ]
  },
  {
    id: "hg-dispo",
    type: "question",
    module: 7,
    title: "Is the discharge bundle complete?",
    body: "Use [Discharge checklist](#/info/hg-discharge): medication/supplies actually obtainable, teach-back complete, clear dose/hold plan, glucose monitoring and named follow-up. Do not require a single arbitrary discharge glucose or ignore persistent symptoms just because glucose fell.",
    citation: [
      3,
      12
    ],
    options: [
      {
        label: "Complete and clinically appropriate for discharge",
        next: "hg-discharge"
      },
      {
        label: "Essential elements missing or continued concern",
        next: "hg-admit"
      }
    ]
  },
  {
    id: "hg-discharge",
    type: "result",
    module: 7,
    title: "Discharge with a concrete bridge plan",
    body: "Give [written discharge instructions](#/info/hg-discharge) and [sick-day/low-glucose advice](#/info/hg-sickday). Document the medication decision, how the patient will obtain supplies, teach-back and follow-up contact. Arrange earlier reassessment when clinically indicated.",
    citation: [
      1,
      3,
      12
    ],
    recommendation: "Discharge only with a feasible treatment, monitoring and follow-up plan.",
    confidence: "recommended"
  },
  {
    id: "hg-admit",
    type: "result",
    module: 7,
    title: "Observe, admit or escalate",
    body: "Choose monitored care for crisis, suspected insulin deficiency requiring initiation/teaching, continued illness, important electrolyte/renal problems or an unsafe discharge plan. Correct the clinical and access barriers rather than prescribing a complex outpatient regimen without support.",
    citation: [
      2,
      3
    ],
    recommendation: "Use observation/admission and the appropriate crisis or specialist pathway.",
    confidence: "recommended"
  }
];
export const HYPERGLYCEMIA_ED_NODE_COUNT = HYPERGLYCEMIA_ED_NODES.length;
