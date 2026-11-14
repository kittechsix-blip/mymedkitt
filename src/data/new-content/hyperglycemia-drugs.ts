import type { DrugEntry } from '../drug-store.js';
const HG_DRUGS_V1: DrugEntry[] = [
  {
    "id": "hg-metformin-er",
    "name": "Metformin ER (ED bridge)",
    "genericName": "Metformin ER",
    "drugClass": "Biguanide",
    "route": "PO",
    "indications": [
      "Adult type 2 diabetes: ED bridge care"
    ],
    "dosing": [
      {
        "indication": "ED bridge care",
        "regimen": "Start 500 mg with the evening meal daily. If tolerated and still indicated, increase by 500 mg no more often than weekly; selected formulation maximum 2,000 mg/day. Swallow whole. Do not interchange ER products without checking the label. Medication selection tool."
      }
    ],
    "contraindications": [
      "eGFR <30 mL/min/1.73 m2",
      "Acute or chronic metabolic acidosis, including DKA"
    ],
    "cautions": [
      "Do not initiate at eGFR 30-45; if already taking and eGFR falls below 45, reassess benefits/risks.",
      "Defer during AKI, dehydration, hypoxia, sepsis or unstable illness. Hold for relevant contrast procedures per label and reassess renal function before restarting.",
      "Low intrinsic hypoglycemia risk; GI intolerance and long-term B12 deficiency."
    ],
    "notes": "UNINSURED: generic metformin is usually under $10 a month cash; the Walmart $4 list covers the IR tablets (confirm ER price). If ER costs more, use IR. Why metformin first: Terms > Why metformin first. Recheck: tolerance in 1 week; eGFR and A1c at follow-up (1 to 2 weeks, A1c in 3 months).",
    "monitoring": "Review glucose log, adherence, oral intake, kidney function and hypoglycemia. Arrange named follow-up; use the Hyperglycemia ED discharge checklist.",
    "citations": [
      "DailyMed. Metformin ER prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=68d0b1a6-c99e-42cf-afdf-b71ee73c4424"
    ]
  },
  {
    "id": "hg-metformin-ir",
    "name": "Metformin IR (ED bridge)",
    "genericName": "Metformin IR",
    "drugClass": "Biguanide",
    "route": "PO",
    "indications": [
      "Adult type 2 diabetes: ED bridge care"
    ],
    "dosing": [
      {
        "indication": "ED bridge care",
        "regimen": "Label start: 500 mg twice daily or 850 mg daily with meals. Titrate by 500 mg weekly or 850 mg every 2 weeks as tolerated. Maximum 2,550 mg/day in divided doses; doses above 2,000 mg may be better tolerated with 3 meals. ER offers a labeled 500 mg once-daily start for GI tolerance."
      }
    ],
    "contraindications": [
      "eGFR <30",
      "Metabolic acidosis including DKA"
    ],
    "cautions": [
      "Do not start at eGFR 30-45. Reassess continued use below 45.",
      "Hold during AKI, dehydration or hypoxic illness; contrast interruption is indication/risk dependent, not universal."
    ],
    "notes": "UNINSURED: on the Walmart $4 generic list (strengths vary; confirm). Titration here is the label ladder (up by 500 mg weekly); a common stopping point before follow-up is 1000 mg twice daily. Take with meals.",
    "monitoring": "Review glucose log, adherence, oral intake, kidney function and hypoglycemia. Arrange named follow-up; use the Hyperglycemia ED discharge checklist.",
    "citations": [
      "DailyMed. Metformin immediate-release prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fb296500-55cb-45ce-be0c-59aa2e3d4624",
      "DailyMed. Metformin ER prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=68d0b1a6-c99e-42cf-afdf-b71ee73c4424"
    ]
  },
  {
    "id": "hg-glipizide",
    "name": "Glipizide IR (ED bridge)",
    "genericName": "Glipizide IR",
    "drugClass": "Sulfonylurea",
    "route": "PO",
    "indications": [
      "Adult type 2 diabetes: ED bridge care"
    ],
    "dosing": [
      {
        "indication": "ED bridge care",
        "regimen": "Usual label start 5 mg about 30 minutes before breakfast. Use 2.5 mg initially if age 65+, liver disease, CKD, debilitated or malnourished (label names geriatric and liver disease). Increase by 2.5-5 mg after at least several days with glucose review. Maximum recommended once-daily regimen 15 mg; larger daily totals divided before adequate meals; labeled daily maximum 40 mg is not a routine ED target."
      }
    ],
    "contraindications": [
      "Hypersensitivity"
    ],
    "cautions": [
      "Avoid initiating when meals or monitoring are unreliable; skip the meal-related dose if not eating and contact treating clinician.",
      "Hypoglycemia may be prolonged, especially with renal/hepatic dysfunction. Prefer another agent when risk is high.",
      "Reassess or stop when adding insulin; avoid duplicate sulfonylureas."
    ],
    "notes": "UNINSURED: about $4 a month (Walmart list; confirm). Start 2.5 mg if age 65+, liver disease, CKD or frail (label names geriatric and liver disease; CKD caution from ADA). Never in a patient who skips meals or drinks heavily. Not glyburide.",
    "monitoring": "Review glucose log, adherence, oral intake, kidney function and hypoglycemia. Arrange named follow-up; use the Hyperglycemia ED discharge checklist.",
    "citations": [
      "DailyMed. Glipizide immediate-release prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c4dfe64-d1c5-65ec-e063-6394a90aead5"
    ]
  },
  {
    "id": "hg-pioglitazone",
    "name": "Pioglitazone (ED bridge)",
    "genericName": "Pioglitazone",
    "drugClass": "Thiazolidinedione",
    "route": "PO",
    "indications": [
      "Adult type 2 diabetes: ED bridge care"
    ],
    "dosing": [
      {
        "indication": "ED bridge care",
        "regimen": "Start 15 mg daily when selected for low-cost long-term treatment. Label permits 15-30 mg starting dose; titrate in 15 mg increments according to longer-term response, maximum 45 mg/day. With strong CYP2C8 inhibitors such as gemfibrozil, maximum 15 mg/day. Slow effect: not rescue therapy for symptomatic severe hyperglycemia."
      }
    ],
    "contraindications": [
      "Do not initiate in NYHA III-IV heart failure"
    ],
    "cautions": [
      "Not recommended in symptomatic heart failure; avoid with edema/volume overload.",
      "Baseline liver tests; consider fracture, macular edema and bladder-cancer history risks. Avoid active bladder cancer.",
      "Weight gain and fluid retention, especially with insulin."
    ],
    "notes": "UNINSURED: generic, usually about $4 to $10 (confirm). Do not use with any heart failure or edema. Slow: full effect takes weeks.",
    "monitoring": "Review glucose log, adherence, oral intake, kidney function and hypoglycemia. Arrange named follow-up; use the Hyperglycemia ED discharge checklist.",
    "citations": [
      "DailyMed. Pioglitazone prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d740d2a2-b26d-4b16-aedc-e4b4b1c94daa"
    ]
  },
  {
    "id": "hg-sitagliptin",
    "name": "Sitagliptin (ED bridge)",
    "genericName": "Sitagliptin",
    "drugClass": "DPP-4 inhibitor",
    "route": "PO",
    "indications": [
      "Adult type 2 diabetes: ED bridge care"
    ],
    "dosing": [
      {
        "indication": "ED bridge care",
        "regimen": "eGFR >=45: 100 mg daily. eGFR 30 to <45: 50 mg daily. eGFR <30, including dialysis: 25 mg daily. These are renal-adjusted maximum daily doses, not a titration ladder."
      }
    ],
    "contraindications": [
      "Serious hypersensitivity to sitagliptin"
    ],
    "cautions": [
      "Check renal function first; generally low intrinsic hypoglycemia risk.",
      "Pancreatitis symptoms require discontinuation/evaluation. Monitor for heart failure in at-risk patients.",
      "Do not combine with a GLP-1 receptor agonist. Confirm affordability; benefit is modest for severe hyperglycemia."
    ],
    "notes": "UNINSURED: generic price unknown in 2026, ask the pharmacy; pioglitazone (if no heart failure) or glipizide (if meals reliable) are cheaper alternatives. Do not combine with a GLP-1 drug.",
    "monitoring": "Review glucose log, adherence, oral intake, kidney function and hypoglycemia. Arrange named follow-up; use the Hyperglycemia ED discharge checklist.",
    "citations": [
      "DailyMed. Sitagliptin prescribing information. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f85a48d0-0407-4c50-b0fa-7673a160bf01",
      "ADA Professional Practice Committee. Pharmacologic Approaches to Glycemic Treatment: Standards of Care in Diabetes 2026. https://doi.org/10.2337/dc26-S009"
    ]
  },
  {
    "id": "hg-empagliflozin",
    "name": "Empagliflozin (ED bridge)",
    "genericName": "Empagliflozin",
    "drugClass": "SGLT2 inhibitor",
    "route": "PO",
    "indications": [
      "Adult type 2 diabetes: ED bridge care"
    ],
    "dosing": [
      {
        "indication": "ED bridge care",
        "regimen": "For selected stable adults: 10 mg each morning. If tolerated and more glycemic control needed, 25 mg daily. Not recommended for glycemic control when eGFR <30; HF/CKD indications have different eligibility. Do not initiate just to lower an ED glucose."
      }
    ],
    "contraindications": [
      "Hypersensitivity"
    ],
    "cautions": [
      "Avoid initiation with a history of DKA. Correct volume depletion first; defer during ketosis, acute illness, fasting, suspected insulin deficiency or pregnancy.",
      "Euglycemic DKA can occur. Hold at least 3 days before surgery/prolonged fasting and restart only when stable and eating.",
      "Genital infection risk; assess renal function, affordability and follow-up."
    ],
    "notes": "UNINSURED: BI Cares patient assistance for Jardiance (about 200% of the federal poverty level; apply, not same-day). Generic dapagliflozin may be cheaper. Hold when sick, vomiting or not eating.",
    "monitoring": "Review glucose log, adherence, oral intake, kidney function and hypoglycemia. Arrange named follow-up; use the Hyperglycemia ED discharge checklist.",
    "citations": [
      "ADA Standards of Care 2026. Pharmacologic approaches, SGLT inhibition and risk of ketosis. https://doi.org/10.2337/dc26-S009",
      "DailyMed. Jardiance prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5777b8a8-ada6-4950-8548-43a1de11f075"
    ]
  },
  {
    "id": "hg-glargine",
    "name": "Insulin glargine U-100 (ED bridge)",
    "genericName": "Insulin glargine U-100",
    "drugClass": "Basal insulin",
    "route": "SC",
    "indications": [
      "Adult type 2 diabetes: ED bridge care"
    ],
    "dosing": [
      {
        "indication": "ED bridge care",
        "regimen": "Stable insulin-naive adult type 2 diabetes: use the guarded basal starter in the Insulin tool. Label: up to 10 units or 0.2 units/kg once daily; ADA starting range 0.1-0.2 units/kg/day. This is basal insulin, not total daily basal-bolus insulin. Use the selected regimen rather than adding the fixed and weight doses together. Once daily at the same time."
      }
    ],
    "contraindications": [
      "Hypoglycemia",
      "Hypersensitivity"
    ],
    "cautions": [
      "No IV administration; do not mix or dilute.",
      "U-100 only here. Concentrated products and existing insulin conversions require a separate plan.",
      "Needs monitoring, injection teaching, access and hypoglycemia rescue. Verify product-specific storage."
    ],
    "notes": "UNINSURED: $35 per 30 days on manufacturer programs (uninsured eligible; not Medicaid, Medicare, VA, TRICARE): Lilly Insulin Value Program for Basaglar or Rezvoglar (, card expires 12/31/2026), Sanofi Insulins Valyou for Lantus (confirm), NovoCare MyInsulinRx for Tresiba. Cheaper fallback: NPH at bedtime. Start 10 units; +2 units every 3 days to fasting 80 to 130; cut 10 to 20% for any low; stop raising above 0.5 units/kg.",
    "monitoring": "Review glucose log, adherence, oral intake, kidney function and hypoglycemia. Arrange named follow-up; use the Hyperglycemia ED discharge checklist.",
    "citations": [
      "Sanofi. Lantus U-100 prescribing information. https://products.sanofi.us/lantus/lantus.html",
      "ADA Professional Practice Committee. Pharmacologic Approaches to Glycemic Treatment: Standards of Care in Diabetes 2026. https://doi.org/10.2337/dc26-S009"
    ]
  },
  {
    "id": "hg-lispro",
    "name": "Insulin lispro U-100 (ED bridge)",
    "genericName": "Insulin lispro U-100",
    "drugClass": "Rapid-acting insulin",
    "route": "SC",
    "indications": [
      "Adult type 2 diabetes: ED bridge care"
    ],
    "dosing": [
      {
        "indication": "ED bridge care",
        "regimen": "When adding prandial therapy to basal for stable type 2 diabetes, clinician may start 4 units OR 10% of basal dose at the meal with greatest excursion. Give within 15 minutes before or immediately after the meal per label. Do not give nutritional insulin when not eating. For established individualized ratios use the Meal + Correction tool."
      }
    ],
    "contraindications": [
      "Hypoglycemia",
      "Hypersensitivity"
    ],
    "cautions": [
      "Recent boluses can remain active longer than 4 hours. Avoid stacking; unknown active insulin blocks automatic correction.",
      "Do not add a correction dose to premixed insulin or pump dosing without reviewing the complete plan.",
      "This tool excludes U-200, pumps/AID, pregnancy and pediatric dosing."
    ],
    "notes": "UNINSURED: Humalog is on the Lilly program ($35 per 30 days), NovoLog on MyInsulinRx. Cheaper fallback: regular insulin 30 minutes before meals (no sourced unit conversion: ask pharmacy). Do not use in a patient who skips meals.",
    "monitoring": "Review glucose log, adherence, oral intake, kidney function and hypoglycemia. Arrange named follow-up; use the Hyperglycemia ED discharge checklist.",
    "citations": [
      "Lilly. Humalog prescribing information. https://pi.lilly.com/us/humalog-uspi.pdf",
      "ADA Professional Practice Committee. Pharmacologic Approaches to Glycemic Treatment: Standards of Care in Diabetes 2026. https://doi.org/10.2337/dc26-S009",
      "AACE. Comprehensive Diabetes Care Guideline 2022. https://doi.org/10.1016/j.eprac.2022.08.002"
    ]
  }
];

const MON = "Review glucose log, adherence, oral intake, kidney function and hypoglycemia. Arrange named follow-up; use the Hyperglycemia ED discharge checklist.";
const ADA = "ADA Professional Practice Committee. Pharmacologic Approaches to Glycemic Treatment: Standards of Care in Diabetes 2026. https://doi.org/10.2337/dc26-S009";
const HUMN = "FDA. Humulin N prescribing information. https://www.accessdata.fda.gov/Drugsatfda_Docs/Label/2015/018781s154lbl.Pdf";
const LILLY = "Lilly Insulin Value Program (verified 2026-11-14). https://insulins.lilly.com/lilly-insulin-value-program";
const NOVO = "NovoCare MyInsulinRx (verified 2026-11-14). https://www.novocare.com/eligibility/myinsulinrx.html";
export const HG_DRUGS_V2: DrugEntry[] = [
  {
    "id": "hg-nph", "name": "NPH insulin: ReliOn / Humulin N / Novolin N (ED bridge)", "genericName": "Insulin isophane human (NPH)", "drugClass": "Intermediate-acting human insulin", "route": "SC",
    "indications": ["Adult type 2 diabetes: ED bridge care", "Steroid-induced hyperglycemia"],
    "dosing": [
      { "indication": "ED bridge care", "regimen": "Insulin-naive, stable: bedtime NPH 10 units or 0.1 to 0.2 units/kg once daily (ADA basal start range). Patient adds 2 units every 3 days until fasting glucose is 80 to 130; any glucose under 70: cut the dose 10 to 20%; stop raising above 0.5 units/kg. If the dose grows, ADA allows changing bedtime NPH to twice-daily NPH; the split is per pharmacy/endocrine (no sourced split). Roll the vial gently to mix; cloudy." },
      { "indication": "Steroid-induced hyperglycemia", "regimen": "With the morning steroid dose: 0.15 units/kg for prednisone 10 to 40 mg; 0.3 units/kg for prednisone over 40 mg (RCT NCT03511521, conservative dosing; lower confidence). Taper with the steroid; stop when the steroid stops." }
    ],
    "contraindications": ["Hypoglycemia", "Hypersensitivity"],
    "cautions": ["Peaks about 4 to 12 hours after injection (label: median maximum effect 6.5 h, range 2.8 to 13 h): overnight low risk. Do not convert from an analog by guess: see the conversions page.", "Needs syringes, meter, strips, teach-back and a low plan.", "eGFR under 30, frail or age 70+: start at the lowest range and call pharmacy/endocrine."],
    "monitoring": MON,
    "notes": "UNINSURED: ReliOn NPH vial about $25 at Walmart (2026 price unverified). Lilly Humulin N $35 per 30 days via Lilly Insulin Value Program. Novolin N $35 via NovoCare MyInsulinRx. Not for Medicaid, Medicare, VA or TRICARE patients.",
    "citations": [HUMN, ADA, LILLY, NOVO, "ClinicalTrials.gov NCT03511521. https://clinicaltrials.gov/study/NCT03511521"]
  },
  {
    "id": "hg-regular", "name": "Regular human insulin (ED bridge)", "genericName": "Insulin human regular", "drugClass": "Short-acting human insulin", "route": "SC",
    "indications": ["Adult type 2 diabetes: ED bridge care"],
    "dosing": [{ "indication": "ED bridge care", "regimen": "Inject subcutaneously about 30 minutes before a meal (label). Starting dose: 4 units or 10% of the basal dose at the largest meal (ADA prandial add-on). A lispro-to-regular unit conversion is not sourced: per pharmacy/endocrine. Never inject without a meal ready." }],
    "contraindications": ["Hypoglycemia", "Hypersensitivity"],
    "cautions": ["Needs strict meal timing; higher low risk than lispro if the meal is late or skipped.", "Not for IV use in the bridge setting."],
    "monitoring": MON,
    "notes": "UNINSURED: ReliOn regular vial about $25 (2026 price unverified); Humulin R $35 via Lilly program; Novolin R $35 via MyInsulinRx.",
    "citations": ["DailyMed. Humulin R prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b519bd83-038c-4ec5-a231-a51ec5cc291f", ADA, LILLY, NOVO]
  },
  {
    "id": "hg-7030", "name": "70/30 premix: Humulin 70/30 / Novolin 70/30 (ED bridge)", "genericName": "Insulin isophane 70% / regular 30%", "drugClass": "Premixed human insulin", "route": "SC",
    "indications": ["Adult type 2 diabetes: ED bridge care"],
    "dosing": [{ "indication": "ED bridge care", "regimen": "Inject about 30 to 45 minutes before a meal (label). Individualize the dose. A starting dose or a conversion from basal-bolus insulin is not sourced here: per pharmacy/endocrine. ADA: premix or self-mixed regimens can reduce the number of injections when prandial insulin is added to NPH. Roll gently to mix." }],
    "contraindications": ["Hypoglycemia", "Hypersensitivity"],
    "cautions": ["Fixed ratio means fixed meals: avoid when meals are irregular, in the frail or in heavy alcohol users.", "Never use for correction doses or with a pump."],
    "monitoring": MON,
    "notes": "UNINSURED: Humulin 70/30 $35 via Lilly program; Novolin 70/30 $35 via MyInsulinRx; ReliOn 70/30 vials are at Walmart (2026 price unverified).",
    "citations": ["FDA. Humulin 70/30 prescribing information. https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/019717s161lbl.pdf", ADA, LILLY, NOVO]
  },
  {
    "id": "hg-dapagliflozin", "name": "Dapagliflozin (ED bridge)", "genericName": "Dapagliflozin", "drugClass": "SGLT2 inhibitor", "route": "PO",
    "indications": ["Adult type 2 diabetes: ED bridge care", "Heart failure or CKD with diabetes"],
    "dosing": [
      { "indication": "ED bridge care", "regimen": "Glycemic control: 5 mg once daily in the morning; may increase to 10 mg (label). Heart failure or CKD indication: 10 mg once daily. Glucose lowering is poor at eGFR under 45; start for heart/kidney benefit when eGFR is 20 or more (ADA 2026; label initiation for CKD at eGFR 25 or more). Do not start from the ED in a sick, volume-depleted or ketotic patient." }
    ],
    "contraindications": ["Hypersensitivity", "Dialysis (label)"],
    "cautions": ["Euglycemic DKA; hold when sick, vomiting or not eating.", "Genital yeast infection; volume depletion; not for type 1 diabetes."],
    "monitoring": MON,
    "notes": "UNINSURED: first generic dapagliflozin FDA approved 2026-04-07; cash price unknown, ask the pharmacy. AZ&Me closed new Farxiga enrollment 2026-05-01 (secondary source). Empagliflozin via BI Cares is the other route.",
    "citations": ["DailyMed. Dapagliflozin prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5dc0e9df-3b45-4469-93fe-3d2eddbfe2b7", ADA]
  },
  {
    "id": "hg-glimepiride", "name": "Glimepiride (ED bridge)", "genericName": "Glimepiride", "drugClass": "Sulfonylurea", "route": "PO",
    "indications": ["Adult type 2 diabetes: ED bridge care"],
    "dosing": [{ "indication": "ED bridge care", "regimen": "Start 1 to 2 mg once daily with breakfast; start 1 mg if elderly, renal impairment or high hypoglycemia risk. Increase by 1 to 2 mg no more often than every 1 to 2 weeks. Maximum 8 mg once daily (label)." }],
    "contraindications": ["Hypersensitivity", "Do not use in type 1 diabetes or DKA"],
    "cautions": ["Same lows risk as glipizide: only with reliable meals and monitoring.", "Prefer glipizide when eGFR is low or the patient is elderly.", "Stop or reassess when starting insulin."],
    "monitoring": MON,
    "notes": "UNINSURED: generic, about $4 a month on many pharmacy lists (confirm).",
    "citations": ["DailyMed. Glimepiride prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=101cdc41-2131-4425-b550-6a0a60b5f4a4", ADA]
  }
];
export const HG_DRUGS: DrugEntry[] = [...HG_DRUGS_V1, ...HG_DRUGS_V2];
