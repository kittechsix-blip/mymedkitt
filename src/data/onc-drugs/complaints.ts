import type { Complaint } from './types.js';

// Labels only. Order is the content pass's judgement of how often an ED sees each complaint (no frequency data in the research file).
export const ONC_COMPLAINTS: Complaint[] = [
  { id: 'fever', label: 'Fever', order: 1 },
  { id: 'dyspnea-cough', label: 'Shortness of breath or cough', order: 2 },
  { id: 'chest-pain', label: 'Chest pain', order: 3 },
  { id: 'diarrhea-abdominal-pain', label: 'Diarrhea or abdominal pain', order: 4 },
  { id: 'rash-skin', label: 'Rash or skin changes', order: 5 },
  { id: 'weakness', label: 'Weakness or muscle pain', order: 6 },
  { id: 'confusion-neuro', label: 'Confusion or neurologic change', order: 7 },
  { id: 'headache-vision', label: 'Headache or vision change', order: 8 },
  { id: 'fatigue-hypotension', label: 'Fatigue, lightheadedness or low blood pressure', order: 9 },
  { id: 'jaundice-lfts', label: 'Jaundice or abnormal liver tests', order: 10 },
  { id: 'vomiting-polyuria', label: 'Nausea, vomiting or frequent urination', order: 11 },
  { id: 'bleeding-bruising', label: 'Bleeding or bruising', order: 12 },
  { id: 'iv-site-pain-swelling', label: 'IV site pain or swelling', order: 13 },
  { id: 'blood-in-urine', label: 'Blood in urine', order: 14 },
  { id: 'infusion-reaction-during', label: 'Reaction during or just after an infusion', order: 15 },
  { id: 'numbness-tingling', label: 'Numbness or tingling', order: 16 },
  { id: 'fainting-palpitations', label: 'Fainting or palpitations', order: 17 },
  { id: 'limb-swelling', label: 'Leg or arm swelling', order: 18 },
];
