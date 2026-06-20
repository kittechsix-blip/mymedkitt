-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-06-20
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'fuo';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 1, 'Haidar G, Singh N. Fever of Unknown Origin. N Engl J Med. 2022;386(5):463-477.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 2, 'Wright WF, Mackowiak PA. Fever of Unknown Origin. StatPearls. Updated 2024.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 3, 'CDC Yellow Book 2024. Fever in the Returned Traveler. CDC Travelers Health.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 4, 'Wilson ME, et al. Fever in Returned Travelers: Results from GeoSentinel. Clin Infect Dis. 2007;44(12):1560-8.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 5, 'Freedman DO, et al. Spectrum of Disease and Relation to Place of Exposure among Ill Returned Travelers. N Engl J Med. 2006;354(2):119-30.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 6, 'Bleeker-Rovers CP, et al. A Prospective Multicenter Study on Fever of Unknown Origin. Medicine (Baltimore). 2007;86(1):26-38.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 7, 'Salvarani C, et al. Polymyalgia Rheumatica and Giant-Cell Arteritis. N Engl J Med. 2002;347(4):261-71.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 8, 'Fowler VG, et al. The 2023 Duke-ISCVID Criteria for Infective Endocarditis: Updating the Modified Duke Criteria. Clin Infect Dis. 2023;77(4):518-526. (Updates 2015 ESC / modified Duke criteria with new microbiology, imaging, and CIED criteria.)');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 9, 'Patel RA, Gallagher JC. Drug Fever. Pharmacotherapy. 2010;30(1):57-69.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 10, 'Defined S, et al. FDG PET in Evaluation of Patients With Fever of Unknown Origin. AJR Am J Roentgenol. 2023;221(4):558-568.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 11, 'Freifeld AG, et al. Clinical Practice Guideline for the Use of Antimicrobial Agents in Neutropenic Patients with Cancer. Clin Infect Dis. 2011;52(4):e56-93.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('fuo', 12, 'Kaplan JE, et al. Guidelines for Prevention and Treatment of Opportunistic Infections in HIV-Infected Adults. MMWR Recomm Rep. 2009;58(RR-4):1-207.');

-- Node: bicarbdrip-not-routine (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":1,"title":"Not Routine Bicarbonate Drip","body":"Do not start bicarbonate infusion for:\n- Routine cardiac arrest/CPR without hyperkalemia or sodium-channel blocker toxicity\n- Isolated respiratory acidosis; improve ventilation instead\n- Routine lactic acidosis without severe acidemia/AKI or bicarbonate-loss physiology\n- Routine DKA; insulin/fluids/potassium are definitive. The 2024 ADA hyperglycemic crises consensus report recommends bicarbonate only in severe acidosis (pH <7.0), and even then no mortality benefit has been shown (the older 2009 ADA threshold was pH <6.9)\n- Metabolic alkalosis\n- Uncontrolled volume overload or severe hypernatremia unless benefit clearly outweighs risk\n\nIf pH is critically low, identify whether bicarbonate can be ventilated off as CO2; inadequate ventilation can worsen intracellular/respiratory acidosis.","citation":[1,4,9,10],"recommendation":"Hold bicarbonate drip and treat the underlying process unless a clear indication/target exists.","confidence":"recommended","summary":"Bicarbonate infusion should not be reflexive for routine arrest, respiratory acidosis, DKA, or lactic acidosis.","safetyLevel":"critical"}'::jsonb
WHERE id = 'bicarbdrip-not-routine' AND tree_id = 'sodium-bicarbonate-drip';

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'sodium-bicarbonate-drip';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('sodium-bicarbonate-drip', 1, 'Jaber S, et al. Sodium bicarbonate therapy for patients with severe metabolic acidaemia in the ICU (BICAR-ICU). Lancet. 2018;392(10141):31-40.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('sodium-bicarbonate-drip', 2, 'EMCrit/IBCC. Hyperkalemia and isotonic bicarbonate resuscitation. Accessed 2026.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('sodium-bicarbonate-drip', 3, 'EMCrit/IBCC. Salicylate intoxication and urinary alkalinization. Accessed 2026.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('sodium-bicarbonate-drip', 4, 'EMCrit/IBCC and toxicology reviews. Sodium-channel blocker/TCA bicarbonate management. Accessed 2026.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('sodium-bicarbonate-drip', 5, 'Forsythe SM, Schmidt GA. Sodium bicarbonate for the treatment of lactic acidosis. Chest. 2000;117(1):260-267.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('sodium-bicarbonate-drip', 6, 'EMCrit/IBCC. Fluid selection and pH-guided fluid resuscitation. Accessed 2026.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('sodium-bicarbonate-drip', 7, 'American College of Medical Toxicology guidance and poison center practice patterns for salicylate alkalinization/hemodialysis. Accessed 2026.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('sodium-bicarbonate-drip', 8, 'Hoffman RS, et al. Goldfrank''s Toxicologic Emergencies. Sodium-channel blocker and salicylate poisoning chapters. 11th ed.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('sodium-bicarbonate-drip', 9, 'Panchal AR, et al. 2020 AHA Guidelines for Adult Basic and Advanced Life Support. Circulation. 2020;142:S366-S468.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('sodium-bicarbonate-drip', 10, 'Umpierrez GE, Davis GM, ElSayed NA, et al. Hyperglycemic crises in adults with diabetes: a consensus report (ADA/EASD/JBDS/AACE/DTS). Diabetes Care. 2024;47(8):1257-1275. Bicarbonate considered only in severe acidosis pH <7.0.');

COMMIT;