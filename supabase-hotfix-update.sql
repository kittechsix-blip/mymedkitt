-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-11
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: dic-overt-vs-non-overt (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":1,"title":"Overt vs Non-Overt DIC","body":"**Overt DIC** = decompensated; consumption has outstripped synthesis. [4][5]\n• Falling platelets (often <100)\n• Prolonged PT/PTT\n• Falling fibrinogen\n• High D-dimer / FDPs\n• Clinically bleeding or thrombosing\n\n**Non-overt (pre-DIC, \"stressed\")** = compensated; abnormal trends without crossing thresholds. [4][5]\n• Mild thrombocytopenia or downward trend\n• Borderline coagulation studies\n• Elevated D-dimer\n• Clinically subtle\n\n**Why it matters:** [4][6]\n• Non-overt DIC is the window for upstream intervention (treat trigger, anticoagulation in select cases).\n• Overt DIC requires hemostatic resuscitation and aggressive trigger control.\n\n**ISTH 2025 update:** Now uses phase-based classification — Pre-DIC, early-phase (compensated/subclinical), overt DIC. Trends matter as much as absolute values; repeat scoring every 12-24 hours. [4]\n\nWhat is the clinical pattern?","citation":[4,5,6],"options":[{"label":"Overt DIC — Bleeding or Thrombosing","description":"Active hemorrhage, microvascular thrombosis, organ dysfunction","next":"dic-labs","urgency":"critical"},{"label":"Non-Overt — Trends Concerning","description":"Compensated; falling platelets, rising D-dimer without overt bleeding","next":"dic-non-overt","urgency":"urgent"}],"summary":"Overt DIC = decompensated with bleeding/thrombosis; non-overt = compensated trends — both need trigger control, only overt needs hemostatic resuscitation"}'::jsonb
WHERE id = 'dic-overt-vs-non-overt' AND tree_id = 'dic';

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'dic';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 1, 'Levi M, Toh CH, Thachil J, Watson HG. Guidelines for the diagnosis and management of disseminated intravascular coagulation. Br J Haematol. 2009;145(1):24-33.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 2, 'Levi M, Scully M. How I treat disseminated intravascular coagulation. Blood. 2018;131(8):845-854.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 3, 'Toh CH, Alhamdi Y, Abrams ST. Current pathological and laboratory considerations in the diagnosis of disseminated intravascular coagulation. Ann Lab Med. 2016;36(6):505-512.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 4, 'Iba T, Levy JH, Maier CL, et al. Updated definition and scoring of disseminated intravascular coagulation in 2025: communication from the ISTH SSC Subcommittee on DIC. J Thromb Haemost. 2025;23(7):2356-2362. (Phase-based classification: pre-DIC, early-phase, overt DIC; two phenotypes: thrombotic vs hemorrhagic).');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 5, 'Taylor FB, Toh CH, Hoots WK, Wada H, Levi M; ISTH SSC. Towards definition, clinical and laboratory criteria, and a scoring system for disseminated intravascular coagulation. Thromb Haemost. 2001;86(5):1327-1330.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 6, 'British Society for Haematology guideline on the management of disseminated intravascular coagulation in haematological malignancy. Br J Haematol. 2022;199(1):29-40.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 7, 'Gando S, Iba T, Eguchi Y, et al. A multicenter, prospective validation of disseminated intravascular coagulation diagnostic criteria for critically ill patients: comparing current criteria. Crit Care Med. 2006;34(3):625-631.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 8, 'Iba T, Nisio MD, Levy JH, Kitamura N, Thachil J. New criteria for sepsis-induced coagulopathy (SIC) following the revised sepsis definition. JTH. 2017;15(3):518-526.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 9, 'Connors JM. Anticoagulation management of patients with sepsis-induced coagulopathy and disseminated intravascular coagulation. Hematology Am Soc Hematol Educ Program. 2023;2023(1):615-622.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 10, 'Falanga A, Schieppati F, Russo D. Cancer tissue procoagulant mechanisms and the hypercoagulable state of patients with cancer. Semin Thromb Hemost. 2015;41(7):756-764.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 11, 'Lo-Coco F, Avvisati G, Vignetti M, et al. Retinoic acid and arsenic trioxide for acute promyelocytic leukemia. N Engl J Med. 2013;369(2):111-121.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 12, 'Sankar A, Bhatti S, Olutoye OA, et al. Disseminated intravascular coagulation in obstetrics: a contemporary clinical review. Am J Obstet Gynecol MFM. 2024;6(2):101230.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 13, 'Spahn DR, Bouillon B, Cerny V, et al. The European guideline on management of major bleeding and coagulopathy following trauma: sixth edition. Crit Care. 2023;27(1):80.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('dic', 14, 'Thachil J, Adelborg K, Connors JM, et al. ISTH SSC subcommittee guidance on prothrombin complex concentrate use in the bleeding patient. J Thromb Haemost. 2023;21(5):1238-1247.');

COMMIT;