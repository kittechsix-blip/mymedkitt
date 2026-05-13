-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-13
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- NEW NODE: lp-paramedian-steps — use generate-supabase-sql.mjs for full INSERT
-- Node: sepsis-refractory (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":3,"title":"Refractory Shock","body":"**If shock persists despite fluids + norepinephrine + vasopressin +/- inotrope:** [23]\n\n**Reassess for:**\n• Missed or inadequately treated source of infection\n• Incorrect diagnosis (sepsis mimics — adrenal crisis, thyroid storm, PE, hemorrhage)\n• Inadequate antibiotic coverage\n• Undrained abscess or infected hardware\n• Pneumothorax from central line placement\n• Septic cardiomyopathy\n\n**[Methylene Blue](#/drug/methylene-blue/refractory septic shock)** — salvage vasopressor [21][23]\n• 1-2 mg/kg IV bolus, then 0.5 mg/kg/h infusion\n• Ibarra-Estrada 2023 RCT: shorter time to vasopressor discontinuation, more vasopressor-free days [21]\n• Inhibits NO synthase → restores vascular tone\n• **SSC 2026: insufficient evidence for survival benefit — hemodynamic improvement only**\n• Consider when on multiple vasopressors + glucocorticoids [23]\n\n**Corticosteroids** if not yet started → [24]\n\nIs the patient on stress-dose steroids?","citation":[21,23,24],"options":[{"label":"No — Start Corticosteroids","next":"sepsis-steroids","urgency":"urgent"},{"label":"Already on Steroids — Other Interventions","description":"Consider methylene blue, ECMO, reassess diagnosis","next":"sepsis-mimics-node"}],"treatment":{"firstLine":{"drug":"Methylene Blue","dose":"1-2 mg/kg bolus, then 0.5 mg/kg/h","route":"IV","frequency":"bolus then continuous","duration":"until vasopressor weaned","notes":"Salvage vasopressor. Inhibits NO synthase to restore vascular tone."},"monitoring":"Consider when on multiple vasopressors + glucocorticoids. Ibarra-Estrada 2023: shorter time to vasopressor discontinuation."},"summary":"Reassess for missed source, wrong diagnosis, or inadequate antibiotics — methylene blue as salvage vasopressor"}'::jsonb
WHERE id = 'sepsis-refractory' AND tree_id = 'sepsis';

COMMIT;