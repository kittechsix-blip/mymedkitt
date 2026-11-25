-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-25
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: lyme-em-treatment (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":2,"title":"Erythema Migrans Treatment: Doxycycline, Amoxicillin or Cefuroxime","body":"Adult options:\n• Doxycycline 100 mg PO BID x 10 days (IDSA 10 days; CDC 10 to 14 days)\n• Amoxicillin 500 mg PO TID x 14 days\n• Cefuroxime 500 mg PO BID x 14 days\n\nChildren: doxycycline 4.4 mg/kg/day divided BID (max 100 mg/dose); amoxicillin 50 mg/kg/day divided TID (max 500 mg/dose); cefuroxime 30 mg/kg/day divided BID (max 500 mg/dose). [1,3]\n\nPregnancy: amoxicillin or cefuroxime (CDC). Azithromycin 500 mg PO once daily x 7 days (IDSA 2020) is second-line and less effective; use only with close follow-up. [1,3]\n\nLow white count or platelets: think anaplasmosis; doxycycline covers it. [9]\n\n[Doxycycline](#/drug/doxycycline/Early Lyme disease (adult)) | [Amoxicillin](#/drug/amoxicillin/Early Lyme disease (adult)) | [Cefuroxime](#/drug/cefuroxime/Early Lyme disease) | [Special populations](#/tree/lyme-disease/node/lyme-special-pops) | [Disposition](#/tree/lyme-disease/node/lyme-disposition)","citation":[1,3,9],"recommendation":"Treat typical EM clinically with oral doxycycline, amoxicillin or cefuroxime. No serology.","treatment":{"firstLine":{"drug":"Doxycycline","dose":"100 mg (child: 4.4 mg/kg/day divided, max 100 mg/dose)","route":"PO","frequency":"BID","duration":"10 days (IDSA); CDC 10 to 14 days","notes":"Also covers anaplasmosis."},"alternative":{"drug":"Amoxicillin or cefuroxime","dose":"Amoxicillin 500 mg TID, or cefuroxime 500 mg BID","route":"PO","frequency":"TID / BID","duration":"14 days","notes":"Pregnancy and young children. Child: amoxicillin 50 mg/kg/day divided TID (max 500 mg/dose); cefuroxime 30 mg/kg/day divided BID (max 500 mg/dose)."},"monitoring":"Rash fades over days; return if new fever, palsy, palpitations, fainting or joint swelling."},"confidence":"recommended"}'::jsonb
WHERE id = 'lyme-em-treatment' AND tree_id = 'lyme-disease';

COMMIT;