// -------------------------------------------------------------------
// Anticoagulant Reversal — Clinical Decision Tree
// Category: Heme/Onc
// Source: Farkas IBCC 2025, AHA/ASA 2022, ISTH 2024, ESO/EANS 2025
// -------------------------------------------------------------------
export const ANTICOAG_REVERSAL_NODES = [
    // =====================================================================
    // MODULE 1 — Assessment & Triage
    // =====================================================================
    {
        id: 'acr-start',
        type: 'info',
        module: 1,
        title: 'Anticoagulant Reversal',
        body: '[Reversal Quick Reference](#/info/acr-reversal-summary) — one-glance guide.\n\n**Before reversing, consider:**\n• **How coagulopathic?** Assess ALL meds affecting coagulation + labs. Critically ill patients often have multiple coagulopathies.\n• **Why anticoagulated?** AF or DVT = short interruption generally fine. Mechanical mitral valve = high thrombotic risk.\n• **How important is reversal?** Life-threatening bleeding → aggressive. Minor bleeding → local measures. Minor procedures → often unnecessary.\n• **Cirrhosis or DIC?** INR may not reflect true coagulation state — consider TEG. [1,2,16]',
        citation: [1, 2, 16],
        next: 'acr-bleeding-q',
    },
    {
        id: 'acr-bleeding-q',
        type: 'question',
        module: 1,
        title: 'What Is the Clinical Scenario?',
        body: 'Determine urgency based on bleeding severity and clinical need.',
        options: [
            {
                label: 'Life-threatening or major bleeding',
                description: 'ICH, massive GI bleed, hemodynamic instability, or rapidly expanding hematoma',
                next: 'acr-agent-critical',
                urgency: 'critical',
            },
            {
                label: 'Minor bleeding',
                description: 'Hemodynamically stable, no critical organ involvement',
                next: 'acr-agent-minor',
            },
            {
                label: 'Supratherapeutic / no bleeding',
                description: 'Elevated INR or supratherapeutic DOAC level without active bleeding',
                next: 'acr-supra-agent',
            },
            {
                label: 'Pre-procedure reversal',
                description: 'Need to manage anticoagulation before a procedure',
                next: 'acr-pre-proc',
            },
        ],
    },
    // =====================================================================
    // MODULE 2 — Urgent Reversal Protocols
    // =====================================================================
    {
        id: 'acr-agent-critical',
        type: 'question',
        module: 2,
        title: 'Identify the Anticoagulant',
        body: '**Act fast.** For ICH on warfarin, give PCC immediately — do NOT wait for INR result. [1,15]\n\nReview all medications affecting coagulation. Determine last dose and timing.',
        citation: [1, 15],
        options: [
            {
                label: 'Warfarin',
                description: 'Vitamin K antagonist — check INR',
                next: 'acr-warfarin-critical',
                urgency: 'critical',
            },
            {
                label: 'Dabigatran (Pradaxa)',
                description: 'Direct thrombin inhibitor — check PTT/thrombin time',
                next: 'acr-dabigatran-critical',
                urgency: 'critical',
            },
            {
                label: 'Factor Xa inhibitor',
                description: 'Apixaban, rivaroxaban, edoxaban — check anti-Xa level',
                next: 'acr-xa-critical',
                urgency: 'critical',
            },
            {
                label: 'Heparin (UFH or LMWH)',
                description: 'Unfractionated heparin or enoxaparin/dalteparin',
                next: 'acr-heparin-critical',
            },
            {
                label: 'tPA / Thrombolytics',
                description: 'Post-thrombolysis bleeding — alteplase, tenecteplase',
                next: 'acr-tpa-critical',
                urgency: 'critical',
            },
            {
                label: 'Antiplatelet agents',
                description: 'Aspirin, clopidogrel, prasugrel, ticagrelor',
                next: 'acr-antiplatelet',
            },
        ],
    },
    {
        id: 'acr-warfarin-critical',
        type: 'result',
        module: 2,
        title: 'Urgent Warfarin Reversal',
        body: '**Two simultaneous therapies — BOTH required:**\n\n**[1] [Vitamin K](#/drug/vitamin-k/warfarin reversal)** 10 mg IV over 30 minutes\n• Takes 6-12h to work, but prevents INR rebound when PCC wears off (6-8h)\n• **IV only** — SC has erratic absorption, IM causes hematoma\n\n**[2] [4-Factor PCC (Kcentra)](#/drug/pcc-4factor/warfarin reversal)** — INR-based dosing:\n• INR 1.3-2: 15 units/kg (max 1,500 units)\n• INR 2-4: 25 units/kg (max 2,500 units)\n• INR 4-6: 35 units/kg (max 3,500 units)\n• INR >6: 50 units/kg (max 5,000 units)\n• **Alternative if PCC unavailable:** 4 units [FFP](#/drug/ffp/warfarin reversal)\n\n**For ICH:** PCC immediately without waiting for INR. Follow INR q3-6h. [1,2,15]\n\n**Fixed-dose PCC** (non-CNS, non-life-threatening): 1,500 units (or 2,000 if >95 kg or INR >7.5). Repeat INR at 30 min; give more PCC if INR >1.4. [15]',
        citation: [1, 2, 7, 15],
    },
    {
        id: 'acr-dabigatran-critical',
        type: 'result',
        module: 2,
        title: 'Dabigatran (Pradaxa) Reversal',
        body: '**[1] [Idarucizumab (Praxbind)](#/drug/idarucizumab/dabigatran reversal)** — specific reversal agent\n• 5 g IV total: two 2.5 g doses, no more than 15 min apart\n• Monoclonal antibody Fab fragment that binds and inactivates dabigatran\n• Onset: within minutes. Consider if last dose <12-24h (normal renal function)\n• For ICH: consider if dose within past 2-4 days [2]\n\n**[2] If unavailable:** [4-Factor PCC](#/drug/pcc-4factor/doac reversal) [6]\n\n**[3] If ingested <2h:** [Activated Charcoal](#/drug/activated-charcoal/doac decontamination) 50 g\n\n**[4] Hemodialysis** if idarucizumab unavailable — dabigatran is 80% renally cleared, low protein binding (~35%), ~65% removed by dialysis [3]\n\n**Monitoring:** PTT (or thrombin time if available) at baseline, 2-4h after idarucizumab, and q12h\n• Normal TT excludes clinically significant dabigatran effect [3,4]\n• Watch for rebound >12h due to drug redistribution from adipose tissue',
        citation: [2, 3, 4, 6],
    },
    {
        id: 'acr-xa-critical',
        type: 'result',
        module: 2,
        title: 'Factor Xa Inhibitor Reversal',
        body: '**Apixaban, Rivaroxaban, Edoxaban, Fondaparinux**\n\n**[1] [4-Factor PCC (Kcentra)](#/drug/pcc-4factor/doac reversal)**\n• CNS bleeding: 50 units/kg (max 5,000 units) [5,6]\n• Non-CNS: 25 units/kg (max 2,500) or **fixed 2,000 units** (simplest, best evidence) [5]\n• ⚠️ PCC will NOT change the anti-Xa level (anti-Xa measures DOAC in the body, not clotting factor levels)\n\n**[2] If ingested <2h:** [Activated Charcoal](#/drug/activated-charcoal/doac decontamination) 50 g\n\n**[3] If INR elevated:** [Vitamin K](#/drug/vitamin-k/warfarin reversal) 10 mg IV — exclude concurrent vitamin K deficiency\n\n**NOT dialyzable:** Apixaban (~90% protein bound), Rivaroxaban (~95%). Edoxaban (~50% bound) is somewhat dialyzable.\n\n**Monitoring:**\n• Normal INR argues against significant Xa inhibitor level but doesn\'t exclude it [4]\n• Anti-Xa level correlates well with drug level; normal anti-Xa excludes clinically relevant Xa inhibitors\n• Follow INR after PCC, then q6h (rebounding INR may indicate waning PCC effect) [5]',
        citation: [3, 4, 5, 6],
    },
    {
        id: 'acr-heparin-critical',
        type: 'question',
        module: 2,
        title: 'Heparin Type?',
        body: '**In most cases, discontinuing the heparin infusion is sufficient** — UFH has a very short half-life.\n\n[Protamine](#/drug/protamine/heparin reversal) is reserved for **severe bleeding** (e.g., ICH).\n\n⚠️ Protamine may cause anaphylaxis or pulmonary hypertension. Excessive protamine causes paradoxical coagulopathy. [2,13]',
        citation: [2, 13],
        options: [
            {
                label: 'Unfractionated heparin (UFH)',
                description: 'Continuous infusion or bolus dosing',
                next: 'acr-ufh-reversal',
                urgency: 'critical',
            },
            {
                label: 'LMWH (enoxaparin, dalteparin)',
                description: 'Subcutaneous dosing — only partial reversal possible',
                next: 'acr-lmwh-reversal',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'acr-ufh-reversal',
        type: 'result',
        module: 2,
        title: 'UFH Reversal — Protamine',
        body: '**[Protamine](#/drug/protamine/heparin reversal)** dosing by time since heparin:\n\n**If given as bolus:**\n• <30 min ago: **1 mg per 100 units** heparin (max 50 mg)\n• 30-60 min: 0.5-0.75 mg per 100 units\n• 1-2h: 0.375-0.5 mg per 100 units\n• 2-6h: 0.25-0.375 mg per 100 units\n\n**If given as infusion:**\n• Calculate heparin given over last 2 hours (rate × 2)\n• Give **1 mg protamine per 100 units** infused in last 2h\n\n**Administration:**\n• Give slowly over **15 minutes** — rapid infusion → hypotension, bradycardia, anaphylactoid reaction\n• **Max 50 mg** single dose — excess causes paradoxical anticoagulation [2]\n\n**Monitoring:**\n• PTT (or anti-Xa) at 10-15 min after dose\n• Recheck at 2h (protamine lasts ~2h)\n• Then q4h × 24h — watch for **heparin rebound** [16]',
        citation: [2, 12, 13, 16],
    },
    {
        id: 'acr-lmwh-reversal',
        type: 'result',
        module: 2,
        title: 'LMWH Reversal — Protamine (Partial)',
        body: '**Protamine only neutralizes ~50% of enoxaparin anti-Xa activity.**\n\n**[Protamine](#/drug/protamine/lmwh reversal)** dosing for enoxaparin:\n• **<8h** since dose: 1 mg protamine per 1 mg enoxaparin (max 50 mg)\n• **8-12h** since dose: 0.5 mg per 1 mg enoxaparin\n• **>12h** since dose: Protamine unlikely to help\n• May re-dose at 0.5 mg per 1 mg enoxaparin if bleeding persists (max 25 mg)\n\n**Dalteparin or tinzaparin:**\n• <4h: 1 mg protamine per 100 units (repeat half dose at 4h)\n• 4-8h: 0.5 mg per 100 units\n\n**Fondaparinux:** Protamine is **NOT effective**. Consider [PCC](#/drug/pcc-4factor/doac reversal).\n\n**Monitoring:** Anti-Xa level (or PTT) at 10-15 min, then 2h, then q4h × 24h. Don\'t expect normalization of anti-Xa level. [2,14]',
        citation: [2, 12, 14],
    },
    // =====================================================================
    // MODULE 3 — Other Reversal Scenarios
    // =====================================================================
    {
        id: 'acr-tpa-critical',
        type: 'result',
        module: 3,
        title: 'tPA / Thrombolytic Reversal',
        body: '**Act immediately — don\'t wait for labs in an actively bleeding patient.**\n\n**Essential interventions:**\n**[1]** Antifibrinolytic — choose whichever is faster to obtain:\n• [Tranexamic acid](#/drug/tranexamic-acid/tpa reversal) 1 g IV over 10 min, then 1 g over next hour\n• [Aminocaproic acid](#/drug/aminocaproic-acid/tpa reversal) 4-5 g IV load, then 1 g/hour\n\n**[2]** Cryoprecipitate 10 units initially (two 5-unit pools)\n• Target fibrinogen **>150-200 mg/dL** (>200 for ICH) [8]\n• Each 10 units raises fibrinogen ~50 mg/dL\n\n**Optional:**\n• FFP ~2 units (may help with fibrinogen degradation product coagulopathy)\n• Platelet transfusion if thrombocytopenic or on antiplatelet agents\n\n**Follow-up labs:** CBC, INR, PTT, fibrinogen (± TEG). Repeat and treat deficiencies.\n• If TEG shows ongoing hyperfibrinolysis → additional antifibrinolytic\n• If INR >1.6 → FFP\n\n**Key:** tPA has very short half-life (gone in minutes) but clotting factor depletion (especially fibrinogen) persists much longer. [16]',
        citation: [8, 14, 16],
    },
    {
        id: 'acr-antiplatelet',
        type: 'result',
        module: 3,
        title: 'Antiplatelet Agent Reversal',
        body: '**Rx #1 (front-line): [DDAVP](#/drug/desmopressin/antiplatelet reversal)** 0.3-0.4 mcg/kg IV over 20-30 min\n• Improves platelet function including P2Y12 inhibitors [10,11]\n• AHA 2022: level 2B recommendation for ICH on antiplatelets [1]\n• Usually single dose (tachyphylaxis with repeated dosing — depletes vWF stores)\n\n**Rx #2:** Consider **higher fibrinogen target** (>200 mg/dL)\n• Platelets cooperate with fibrinogen — increased fibrinogen may compensate [16]\n\n**Rx #3: Generally AVOID platelet transfusion**\n• **PATCH trial:** No benefit in ICH on antiplatelets — worse neurologic outcomes, trend toward more bleeding [16]\n• Exception conditions (ALL must be met): permanent platelet inhibitor + >3 half-lives since last dose + laboratory evidence of inhibition + active bleeding + low platelets\n• **Ticagrelor is reversible** → platelet transfusion will NOT work (new platelets get inhibited) [14]\n\n**Rx #4 (desperate): [TXA](#/drug/tranexamic-acid/antiplatelet reversal)** — inhibits plasmin-mediated platelet GPIb degradation [16]',
        citation: [1, 10, 11, 14, 16],
    },
    {
        id: 'acr-agent-minor',
        type: 'info',
        module: 3,
        title: 'Minor Bleeding Management',
        body: 'For most agents, **hold the dose + local measures** is sufficient.\n\n• Drug elimination handles most minor bleeding\n• Consider the patient\'s overall coagulation status — ALL meds and coagulopathies\n• Brief anticoagulation interruption is generally safe for AF or DVT\n• Higher-risk indications (mechanical valve) → minimize interruption time\n\n**Warfarin:** Hold dose. Consider low-dose vitamin K if INR significantly elevated.\n**DOACs:** Hold 1-2 doses. Drug clearance is usually sufficient.\n**Heparin:** Stop infusion. Short half-life handles the rest.\n**Antiplatelets:** Local hemostatic measures. DDAVP if significant concern.',
        citation: [7, 16],
        next: 'acr-monitoring',
    },
    {
        id: 'acr-supra-agent',
        type: 'question',
        module: 3,
        title: 'Supratherapeutic — Which Agent?',
        body: 'No active bleeding, but anticoagulant levels are above therapeutic range.',
        options: [
            {
                label: 'Warfarin (elevated INR)',
                description: 'Supratherapeutic INR — tiered management by INR level',
                next: 'acr-inr-tiers',
            },
            {
                label: 'DOAC (supratherapeutic)',
                description: 'Apixaban, rivaroxaban, dabigatran, edoxaban',
                next: 'acr-doac-supra',
            },
        ],
    },
    // =====================================================================
    // MODULE 4 — Non-Urgent Management
    // =====================================================================
    {
        id: 'acr-inr-tiers',
        type: 'result',
        module: 4,
        title: 'Supratherapeutic INR — Warfarin',
        body: '[Elevated INR Quick Guide](#/info/acr-inr-guide) — detailed reference\n\n**INR 3-5, no bleeding:**\n• Hold warfarin\n• Resume at lower dose when INR is therapeutic\n\n**INR 5-9, no bleeding:**\n• Hold 1-2 doses of warfarin\n• [Vitamin K](#/drug/vitamin-k/supratherapeutic inr) 1-2.5 mg PO/IV if risk for bleeding\n• Resume at lower dose when INR is therapeutic\n\n**INR >9, no bleeding:**\n• Hold 1-2 doses of warfarin\n• [Vitamin K](#/drug/vitamin-k/supratherapeutic inr) 2.5-5 mg PO/IV\n• Repeat Vitamin K in 24h if INR remains elevated\n• Resume at lower dose when INR is therapeutic\n\n**Cirrhosis:** IV Vitamin K may be tried to exclude vitamin K deficiency, but dubious benefit in most patients. [7,16]',
        citation: [7, 16],
    },
    {
        id: 'acr-doac-supra',
        type: 'result',
        module: 4,
        title: 'Supratherapeutic DOAC',
        body: '**Hold dose(s)** — drug elimination is usually sufficient.\n\n⚠️ **Beware: DOAC + new renal failure**\n• Dabigatran: 80% renally cleared → accumulates quickly in AKI\n• Can be **severely supratherapeutic without obviously abnormal labs** (unlike warfarin with INR of 9)\n• Rivaroxaban: 70% renal. Edoxaban: 50% renal. Apixaban: 25% renal.\n\n**Crude screening (limited sensitivity):**\n• Normal INR argues against significant Xa inhibitor level (but doesn\'t exclude it) [4]\n• Normal PTT argues against significant dabigatran level (but doesn\'t exclude it) [4]\n\n**Better assays:**\n• **Anti-Factor Xa level:** Normal excludes clinically relevant Xa inhibitors [4,5]\n• **Thrombin time:** Normal excludes clinically significant dabigatran effect [3,4]\n\n[Coag Lab Interpreter](#/info/acr-coag-labs) — full lab guide',
        citation: [3, 4, 5],
    },
    {
        id: 'acr-pre-proc',
        type: 'info',
        module: 4,
        title: 'Pre-Procedure Coagulation Management',
        body: '**Common pitfalls (IBCC):**\n**#1** We **overestimate** bleeding risk. Most bedside ICU procedures are LOW risk — SIR 2019 lists CVC, thoracentesis, and paracentesis all as "low risk." [9]\n**#2** We fail to consider the **big picture** — all meds + all coagulopathies together.\n**#3** We put **excess faith in the INR**. INR 2.5 in cirrhosis = rebalanced hemostasis. INR 2.5 on apixaban = high bleeding risk. Context matters.\n**#4** We try to push INR <1.7 with FFP — this is **impossible and dangerous.** FFP cannot achieve INR below ~1.7 (would require infinite volume). [8,16]\n\n**Low-risk procedures (CVC, thoracentesis, paracentesis):**\n• No evidence for specific coag lab thresholds [9]\n• Key: avoid arterial injury — expert operator, ultrasound guidance, proper technique\n• TEG may help when in doubt, especially in cirrhosis [16]\n\n**Lumbar puncture:** Highest risk bedside procedure — individualize management.',
        citation: [8, 9, 16],
        next: 'acr-monitoring',
    },
    // =====================================================================
    // MODULE 5 — Monitoring & Disposition
    // =====================================================================
    {
        id: 'acr-monitoring',
        type: 'info',
        module: 5,
        title: 'Post-Reversal Monitoring',
        body: '**Warfarin:** INR at 30 min post-PCC, then 6h and 24h. Watch for INR rebound when PCC wears off (6-8h). Vitamin K prevents this.\n\n**Dabigatran:** PTT (or TT) at baseline, 2-4h post-idarucizumab, q12h. Watch for drug rebound >12h (adipose redistribution). [3]\n\n**Xa inhibitors:** INR after PCC, then q6h. Anti-Xa level if available. Rebounding INR may indicate waning PCC. [5]\n\n**UFH:** PTT at 10-15 min, 2h (protamine ~2h duration), then q4h × 24h for heparin rebound.\n\n**LMWH:** Anti-Xa level at 10-15 min, 2h, then q4h × 24h. Don\'t expect full anti-Xa normalization.\n\n**tPA:** Fibrinogen level + coag panel after treatment. Target fibrinogen >150-200 mg/dL. Repeat TEG if available.\n\n**Antiplatelets:** Clinical reassessment. PFA or TEG with platelet mapping if available.',
        citation: [1, 3, 5, 16],
        next: 'acr-resume',
    },
    {
        id: 'acr-resume',
        type: 'info',
        module: 5,
        title: 'Resuming Anticoagulation',
        body: 'Most patients will need anticoagulation **restarted** — the original indication hasn\'t gone away.\n\n• **Timing depends on:** indication, bleeding site, severity, patient factors\n• **ICH:** Consider restarting in 4-8 weeks for high-risk indications (e.g., mechanical valve, recurrent DVT/PE)\n• **GI bleed:** May restart earlier (1-2 weeks) once hemostasis is secure\n• **Mechanical valve:** Shortest possible interruption — very high thrombotic risk\n• **Involve hematology** or appropriate specialty for complex cases\n\n**Risk-benefit:** The reason the patient was anticoagulated in the first place still applies. Failure to restart carries its own mortality risk (stroke, PE).',
        citation: [1, 6, 7],
        next: 'acr-pitfalls',
    },
    {
        id: 'acr-pitfalls',
        type: 'result',
        module: 5,
        title: 'Common Pitfalls',
        body: '**Mistakes to avoid:**\n\n• **PCC or FFP alone for warfarin** → INR rebounds when they wear off (6-8h). **Always give Vitamin K simultaneously.** [2,16]\n\n• **Vitamin K subcutaneously** → erratic absorption. IM → hematoma risk. **Always IV for emergent reversal.** [16]\n\n• **FFP to push INR below 1.7** → impossible (FFP contains factors at normal plasma concentration, not concentrated). Futile and dangerous (volume overload, TRALI). [8,16]\n\n• **DOAC + new renal failure** → patient is silently supratherapeutic with no screaming INR to alert you. Dabigatran half-life doubles if GFR <30. [3,4]\n\n• **Aggressive reversal for minor procedures** → CVC, thoracentesis, and paracentesis are low-risk. The bigger danger is arterial injury from poor technique, not the anticoagulant. [9]\n\n• **Platelet transfusion for antiplatelet reversal** → PATCH trial showed no benefit and possible harm. DDAVP is first-line. [1,10,16]',
        citation: [1, 2, 3, 4, 8, 9, 10, 16],
    },
];
// -------------------------------------------------------------------
// Module Labels
// -------------------------------------------------------------------
export const ANTICOAG_REVERSAL_MODULE_LABELS = [
    'Assessment',
    'Urgent Reversal',
    'Other Scenarios',
    'Non-Urgent',
    'Monitoring',
];
// -------------------------------------------------------------------
// Citations — IBCC source (Farkas 2025) + primary literature
// -------------------------------------------------------------------
export const ANTICOAG_REVERSAL_CITATIONS = [
    { num: 1, text: 'Greenberg SM, Ziai WC, Cordonnier C, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage. Stroke. 2022;53(7):e282-e361. doi:10.1161/STR.0000000000000407' },
    { num: 2, text: 'Bekka E, Liakoni E. Anticoagulation reversal (vitamin K, prothrombin complex concentrates, idarucizumab, andexanet-α, protamine). Br J Clin Pharmacol. 2025;91(3):604-614. doi:10.1111/bcp.16142' },
    { num: 3, text: 'Levy JH, Shaw JR, Castellucci LA, et al. Reversal of direct oral anticoagulants: guidance from the SSC of the ISTH. J Thromb Haemost. 2024;22(10):2889-2899. doi:10.1016/j.jtha.2024.07.009' },
    { num: 4, text: 'Gosselin RC, Cuker A. Assessing Direct Oral Anticoagulants in the Clinical Laboratory. Clin Lab Med. 2024;44(3):551-562. doi:10.1016/j.cll.2024.04.014' },
    { num: 5, text: 'Cuker A, Burnett A, Triller D, et al. Reversal of direct oral anticoagulants: Guidance from the Anticoagulation Forum. Am J Hematol. 2019;94(6):697-709. doi:10.1002/ajh.25475' },
    { num: 6, text: 'Milling TJ, Refaai MA, Sengupta N. Anticoagulant Reversal in Gastrointestinal Bleeding: Review of Treatment Guidelines. Dig Dis Sci. 2021;66(11):3698-3714. doi:10.1007/s10620-020-06728-y' },
    { num: 7, text: 'Holbrook A, Schulman S, Witt DM, et al. Evidence-based management of anticoagulant therapy: ACCP Guidelines 9th ed. Chest. 2012;141(2 Suppl):e152S-e184S. doi:10.1378/chest.11-2295' },
    { num: 8, text: 'Holland LL, Brooks JP. Toward rational fresh frozen plasma transfusion: The effect of plasma transfusion on coagulation test results. Am J Clin Pathol. 2006;126(1):133-139. doi:10.1309/NQXH-UG7H-ND78-LFFK' },
    { num: 9, text: 'Patel IJ, Rahim S, Davidson JC, et al. Society of Interventional Radiology Consensus Guidelines for Periprocedural Management of Thrombotic and Bleeding Risk. J Vasc Interv Radiol. 2019;30(8):1168-1184. doi:10.1016/j.jvir.2019.04.017' },
    { num: 10, text: 'Desborough MJ, Oakland KA, Landoni G, et al. Desmopressin for treatment of platelet dysfunction and reversal of antiplatelet agents: a systematic review and meta-analysis. J Thromb Haemost. 2017;15(2):263-272. doi:10.1111/jth.13576' },
    { num: 11, text: 'Feldman EA, Meola G, Zyck S, et al. Retrospective Assessment of Desmopressin Effectiveness and Safety in Patients With Antiplatelet-Associated Intracranial Hemorrhage. Crit Care Med. 2019;47(12):1759-1765. doi:10.1097/CCM.0000000000004021' },
    { num: 12, text: 'Frontera JA, Lewin JJ 3rd, Rabinstein AA, et al. Guideline for Reversal of Antithrombotics in Intracranial Hemorrhage. Neurocrit Care. 2016;24(1):6-46. doi:10.1007/s12028-015-0222-x' },
    { num: 13, text: 'Wallisch WJ, Kidd B, Shen L, et al. Coagulopathy and Emergent Reversal of Anticoagulation. Anesthesiol Clin. 2023;41(1):249-261. doi:10.1016/j.anclin.2022.10.006' },
    { num: 14, text: 'Sperry JD, Rose AE, Williams E, et al. Emergent Reversal of Antithrombotics and Treatment of Life-Threatening Bleeding from Coagulopathies: A Clinical Review. J Emerg Med. 2022;63(1):17-48. doi:10.1016/j.jemermed.2022.05.011' },
    { num: 15, text: 'ESO/EANS Joint Guidelines Committee. European Stroke Organisation and European Association of Neurosurgical Societies guideline on stroke due to spontaneous ICH. Eur Stroke J. 2025;10(4):1007-1086. doi:10.1177/23969873251327397' },
    { num: 16, text: 'Farkas J. Anticoagulant Reversal. Internet Book of Critical Care (IBCC). Updated April 25, 2025. EMCrit Project.' },
];
