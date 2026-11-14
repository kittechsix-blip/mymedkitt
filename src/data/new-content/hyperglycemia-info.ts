import type { InfoPage } from '../info-pages.js';
import { HG_CITATIONS } from './hyperglycemia-evidence.js';
export const HG_INFO_PAGES: Record<string,InfoPage> = {
  "hg-steps": {
    "id": "hg-steps",
    "title": "Hyperglycemia: rapid roadmap",
    "subtitle": "Adult ED hyperglycemia and bridge care",
    "sections": [
      {
        "heading": "Start here",
        "body": "Exclude crisis and insulin deficiency, assess volume/renal function, then choose the least complex safe regimen the patient can actually obtain. [Open pathway](#/tree/hyperglycemia-ed)."
      },
      {
        "heading": "One-tap tools",
        "body": "[Labs](#/info/hg-labs) \u2022 [Medication selector](#/info/hg-meds) \u2022 [Insulin tools](#/info/hg-insulin) \u2022 [Meal + Correction](#/calculator/hg-meal-correction) \u2022 [Discharge](#/info/hg-discharge) \u2022 [Costs & access](#/info/hg-access)."
      }
    ],
    "citations": HG_CITATIONS,
    "shareable": false
  },
  "hg-labs": {
    "id": "hg-labs",
    "title": "Hyperglycemia: labs & crisis criteria",
    "subtitle": "Adult ED hyperglycemia and bridge care",
    "sections": [
      {
        "heading": "Initial evaluation",
        "body": "POC glucose; BMP for sodium, potassium, bicarbonate and renal function when evaluating significant/symptomatic hyperglycemia or changing therapy. Obtain HbA1c if not recently available; do not delay necessary treatment while awaiting it. Ketones (prefer blood beta-hydroxybutyrate) and VBG for vomiting, abdominal pain, tachypnea, dehydration, insulin deficiency, SGLT2 exposure or concern for acidosis. Check osmolality when HHS is possible. [2,3]"
      },
      {
        "heading": "DKA: all three components",
        "body": "Diabetes history OR glucose >=200 mg/dL; beta-hydroxybutyrate >=3 mmol/L OR urine ketones >=2+; pH <7.3 OR bicarbonate <18 mmol/L. A normal glucose does not exclude DKA in a patient with diabetes. Do not use anion gap alone to rule it out. [2]"
      },
      {
        "heading": "HHS: all four components",
        "body": "Glucose >=600 mg/dL; effective osmolality >300 OR total osmolality >320 mOsm/kg; beta-hydroxybutyrate <3 mmol/L (or urine ketones <2+); pH >=7.3 AND bicarbonate >=15 mmol/L. Mixed DKA/HHS requires crisis treatment. Effective osmolality = 2 \u00d7 measured Na + glucose/18. Total adds BUN/2.8 (glucose/BUN mg/dL, Na mmol/L). [2]"
      },
      {
        "heading": "Targeted testing",
        "body": "Pregnancy testing when relevant. ECG/troponin, CBC, urinalysis, cultures and imaging follow symptoms/exam; do not diagnose UTI from hyperglycemia alone. Consider steroids, infection, ischemia, medication interruption or pancreatic disease. Diagnostic confirmation of new diabetes may require repeat testing if unequivocal symptomatic hyperglycemia is absent. Anemia, transfusion and altered RBC turnover may make HbA1c misleading. [1,3]"
      }
    ],
    "citations": HG_CITATIONS,
    "shareable": false
  },
  "hg-meds": {
    "id": "hg-meds",
    "title": "Start or titrate noninsulin medication",
    "subtitle": "Adult ED hyperglycemia and bridge care",
    "sections": [
      {
        "heading": "When insulin may not be needed",
        "body": "Stable likely type 2 diabetes without crisis, catabolism or suspected insulin deficiency can often use noninsulin therapy. A high reading alone does not mandate insulin. Symptoms, trajectory, HbA1c, current treatment and ability to follow the plan determine the choice. Address missed doses, access, diet and illness before escalating a previously effective regimen. [1]"
      },
      {
        "heading": "Low-cost usual starting option",
        "body": "[Metformin ER](#/drug/hg-metformin-er/ED bridge care) offers a slow, once-daily start; [IR formulation](#/drug/hg-metformin-ir/ED bridge care) may be cheaper. Check actual eGFR and acute illness first. Do not simply increase medication during dehydration or AKI. [5,14]"
      },
      {
        "heading": "If an additional oral agent is needed",
        "body": "[Glipizide IR](#/drug/hg-glipizide/ED bridge care): inexpensive but only when meals and monitoring are reliable. [Pioglitazone](#/drug/hg-pioglitazone/ED bridge care): low intrinsic hypoglycemia risk but slow onset, edema/weight gain and HF restrictions. [Sitagliptin](#/drug/hg-sitagliptin/ED bridge care): lower intrinsic hypoglycemia risk, renal-adjusted dosing; check price. Do not default to the cheapest drug when food insecurity makes it dangerous. [6-8]"
      },
      {
        "heading": "Comorbidity-guided choices",
        "body": "[Empagliflozin](#/drug/hg-empagliflozin/ED bridge care) may fit HF/CKD when stable and eligible. GLP-1 or dual GIP/GLP-1 therapy may be preferred for weight/glycemic goals and selected cardiovascular indications, but acute vomiting, cost, contraindications and follow-up can make ED initiation impractical. These are not emergency glucose-correction drugs. Do not combine a GLP-1 agent with a DPP-4 inhibitor. Arrange a dedicated initiation visit if training/coverage cannot be secured. [1,9]"
      },
      {
        "heading": "Already on treatment",
        "body": "Confirm name, formulation, actual dose and supply. Increase a tolerated agent only within its label and renal limits; use the linked drug card for increments. If at an effective tolerated dose but still above individualized goals, add a complementary agent or consider insulin. Reassess HbA1c over months; arrange early safety follow-up after changes. [1,3]"
      }
    ],
    "citations": HG_CITATIONS,
    "shareable": false
  },
  "hg-insulin": {
    "id": "hg-insulin",
    "title": "Insulin: start, titrate & compare",
    "subtitle": "Adult ED hyperglycemia and bridge care",
    "sections": [
      {
        "heading": "Guarded tools",
        "body": "[Start basal](#/calculator/hg-basal-start) \u2022 [Titrate basal](#/calculator/hg-basal-titrate) \u2022 [Meal + Correction](#/calculator/hg-meal-correction). These tools support stable adult type 2 bridge care, not DKA/HHS, type 1 initiation, pregnancy, children or pump conversion."
      },
      {
        "heading": "Which insulin?",
        "body": "[Glargine U-100](#/drug/hg-glargine/ED bridge care): once-daily basal background coverage. [Lispro U-100](#/drug/hg-lispro/ED bridge care): rapid meal/correction dosing. NPH has a more pronounced peak and often needs twice-daily scheduling; regular human insulin generally needs administration about 30 minutes before food. Low-cost human insulin is not a unit-for-unit timing substitute for an analog plan. Premix couples basal and meal insulin and is poorly suited to irregular meals. Product-specific teaching and follow-up are mandatory. [1,4,10,11]"
      },
      {
        "heading": "Basal versus total daily dose",
        "body": "Never prescribe an entire basal-bolus total daily dose as basal insulin. Basal-only initiation is a separate pathway. Existing type 1 patients require basal coverage even when not eating; missed basal or pump interruption warrants urgent assessment, not this type 2 starter. [1,3]"
      },
      {
        "heading": "Fasting versus meal pattern",
        "body": "Fasting above target: assess basal dose, missed doses and overnight hypoglycemia. Fasting controlled but post-meal readings high: do not keep increasing basal. Consider GLP-1-based therapy when suitable, or add [prandial insulin](#/drug/hg-lispro/ED bridge care). Use meal-specific logs; lower doses when hypoglycemia or reduced intake occurs. [1]"
      },
      {
        "heading": "Prandial adjustment",
        "body": "After a clinician selects basal-plus therapy, ADA describes adjusting prandial insulin by 1-2 units or 10-15% twice weekly based on glucose patterns. For unexplained hypoglycemia, reduce the corresponding dose by 10-20% and reassess. These are examples of structured outpatient plans, not instructions to chase one ED glucose. If HbA1c <8% when adding prandial insulin, consider reducing basal by 4 units or 10%. [1]"
      },
      {
        "heading": "Steroids, NPO and concentrated insulin",
        "body": "Steroid timing, tapering and nutrition changes alter requirements. Do not apply the basal starter to high-dose steroids, uncertain home insulin, concentrated insulin, or IV-to-SC transitions. Use monitored individualized management and endocrine/pharmacy input. [3]"
      }
    ],
    "citations": HG_CITATIONS,
    "shareable": false
  },
  "hg-meals": {
    "id": "hg-meals",
    "title": "Meals and glucose correction",
    "subtitle": "Adult ED hyperglycemia and bridge care",
    "sections": [
      {
        "heading": "Two separate components",
        "body": "Meal units = carbohydrate grams / prescribed grams per unit. Correction units = (current glucose - prescribed target) / prescribed mg/dL per unit when positive. [Open guarded calculator](#/calculator/hg-meal-correction). Review active insulin and actual food availability before combining. [4]"
      },
      {
        "heading": "Carbohydrate counting",
        "body": "Use total carbohydrate on the nutrition label multiplied by servings actually eaten, not just sugars. Include rice, bread, tortillas, fruit, milk and sweetened drinks; portion size matters. No food-name-to-dose shortcut. Teach-back with a real label and the patient\u2019s written ratio before discharge."
      },
      {
        "heading": "Worked example, not a default prescription",
        "body": "An established 1:15 ratio with 60 g carbohydrate gives 4 units. Glucose 250, prescribed target 150, and sensitivity 50 mg/dL/unit give 2 correction units. With no active bolus and all safety conditions satisfied, arithmetic total is 6 units; the clinician verifies the dose and device rounding. Different prescribed ratios produce different results. [4]"
      },
      {
        "heading": "Estimates require a clinician",
        "body": "500 / reliable total daily insulin estimates grams/unit; 1800 / total daily insulin estimates mg/dL/unit for rapid analogs. TDD includes all basal and meal doses, not basal alone. These are starting estimates, not validated personal ratios. Do not derive an unsupervised discharge sliding scale from an uncertain TDD. [4]"
      },
      {
        "heading": "Stacking and poor intake",
        "body": "A recent rapid-acting dose may still be working after 4 hours. Unknown insulin-on-board, pump/AID dosing, vomiting, AKI or a falling glucose requires manual review. No meal means no nutritional bolus; basal and correction decisions remain separate. Treat low glucose first. [1,4,11]"
      }
    ],
    "citations": HG_CITATIONS,
    "shareable": false
  },
  "hg-access": {
    "id": "hg-access",
    "title": "Uninsured: cost and access plan",
    "subtitle": "Adult ED hyperglycemia and bridge care",
    "sections": [
      {
        "heading": "Ask before choosing",
        "body": "What can the patient pay today? Which pharmacy is open, stocks the exact formulation, and can fill it? Include meter, strips, lancets, pen needles or syringes, and rescue medication in the budget. Food insecurity and unstable housing change medication safety."
      },
      {
        "heading": "Verify the actual quote",
        "body": "Compare cash price, pharmacy discount programs and eligibility-based manufacturer assistance. [Walmart prescription program](https://www.walmart.com/cp/4-prescriptions/1078664) includes generic diabetes medicines, but not all are $4. Price and quantities change; obtain the dispensing-pharmacy quote today. Do not promise a coupon or manufacturer cap applies to an uninsured patient. [13]"
      },
      {
        "heading": "Affordable does not mean interchangeable",
        "body": "[Metformin](#/drug/hg-metformin-er/ED bridge care) is often practical if eligible. [Glipizide](#/drug/hg-glipizide/ED bridge care) can cost less but can cause dangerous hypoglycemia without reliable meals. Human insulin may reduce drug cost but increases meal-timing and teaching burden. Ask pharmacy about affordable basal analog options before redesigning a regimen."
      },
      {
        "heading": "Named destination",
        "body": "Use [HRSA Find a Health Center](https://findahealthcenter.hrsa.gov/) and local safety-net/bridge clinics. Arrange the appointment or named contact while the patient is present; confirm sliding-fee eligibility and language/transport needs. If medication, teaching and monitoring cannot be secured, use case management and observation/admission rather than a prescription the patient cannot fill. [3,13]"
      }
    ],
    "citations": HG_CITATIONS,
    "shareable": false
  },
  "hg-discharge": {
    "id": "hg-discharge",
    "title": "Hyperglycemia: discharge bundle",
    "subtitle": "Adult ED hyperglycemia and bridge care",
    "sections": [
      {
        "heading": "Before discharge",
        "body": "Crisis/insulin deficiency excluded or appropriately treated; stable vitals and mental status, drinking/eating, improving symptoms, acceptable electrolytes/renal trajectory, and precipitating illness addressed. No universal discharge-glucose target replaces these checks. Selected ED discharge studies do not establish safety for patients lacking a viable care plan. [2,12]"
      },
      {
        "heading": "Prescription and supplies",
        "body": "Write drug, formulation/concentration, dose in units or mg, route, meal timing and frequency. State which prior medications stop. Supply meter/strips/lancets, needles/syringes and sharps instructions. For insulin, include hypoglycemia rescue/glucagon, storage and injection teaching, and the written titration or hold plan. Confirm the patient can obtain the complete bundle. [3]"
      },
      {
        "heading": "Monitoring and appointments",
        "body": "Specify individual glucose targets and testing times. Basal initiation needs fasting logs; mealtime treatment needs pre-meal monitoring and additional checks as indicated. Arrange early follow-up within 1-2 weeks after medication change; choose earlier safety contact for a new insulin start or vulnerable patient according to local resources. A routine month-away referral is not an adequate new-insulin bridge. [3]"
      },
      {
        "heading": "Teach-back",
        "body": "Have the patient demonstrate glucose testing, dose selection and injection. Explain low-glucose treatment, no repeat correction while insulin remains active, illness/poor-intake medication holds, and when to seek emergency care. Provide language-appropriate written instructions and a contact for questions. [1,3]"
      }
    ],
    "citations": HG_CITATIONS,
    "shareable": true
  },
  "hg-sickday": {
    "id": "hg-sickday",
    "title": "Sick-day and hypoglycemia plan",
    "subtitle": "Adult ED hyperglycemia and bridge care",
    "sections": [
      {
        "heading": "Low glucose",
        "body": "If glucose <70 mg/dL and awake with safe swallowing, give 15 g fast carbohydrate and recheck in 15 minutes; repeat if still low. Severe confusion, seizure or inability to swallow needs emergency treatment, not oral intake. [Hypoglycemia consult](#/tree/hypoglycemia). Review the causative regimen before the next dose. [4]"
      },
      {
        "heading": "Poor intake or illness",
        "body": "Do not stop required basal insulin in type 1 diabetes. Hold meal insulin when not eating, but seek a specific basal/correction plan. Hold metformin during dehydration/AKI/hypoxia and SGLT2 therapy during acute illness/fasting/ketosis risk. Withhold meal-linked sulfonylurea when meals are skipped and contact the treating team. [1,5,6,9]"
      },
      {
        "heading": "Return now",
        "body": "Vomiting or inability to keep fluids down, abdominal pain, deep/rapid breathing, confusion, marked weakness, positive ketones, recurrent low readings or worsening symptoms require urgent reassessment. DKA can occur without very high glucose, especially with SGLT2 therapy. [2]"
      }
    ],
    "citations": HG_CITATIONS,
    "shareable": true
  },
  "hyperglycemia-ed-stop": {
    "id": "hyperglycemia-ed-stop",
    "title": "Hyperglycemia: do NOT",
    "subtitle": "Adult ED hyperglycemia and bridge care",
    "sections": [
      {
        "heading": "Do not miss insulin deficiency",
        "body": "Do not discharge suspected new type 1 diabetes on oral therapy alone. Do not exclude DKA by glucose alone. [Crisis assessment](#/tree/hyperglycemia-ed/node/hg-crisis). [2]"
      },
      {
        "heading": "Do not chase a number",
        "body": "Do not give repeated insulin corrections without accounting for active doses or use an arbitrary glucose goal to decide disposition. [Meal safety](#/info/hg-meals). [1,12]"
      },
      {
        "heading": "Do not prescribe an unaffordable or unsafe plan",
        "body": "Do not start insulin or a sulfonylurea without feasible monitoring, food and education. Do not substitute NPH/regular/premix for an analog plan without redesigning timing and teaching. [Access](#/info/hg-access). [1,3]"
      },
      {
        "heading": "Do not confuse dose types",
        "body": "A total daily basal-bolus dose is not the basal dose. Concentrations, units, device increments and formulation must match the prescription. [Insulin tools](#/info/hg-insulin). [1,10,11]"
      }
    ],
    "citations": HG_CITATIONS,
    "shareable": false
  }
};
