# Review-round verification: tpe-bk (3 nodes + 2 overlays)

Meaning check of the short text against [1] BK 2nd consensus 2024 (Tables 4-7, Introduction, Figure 1 as read earlier). Read-only.

VERDICT: READY AFTER LISTED FIXES (small). The earlier regressions (ownership claims, lost high-risk qualifier, "because" claim, merged grades) are all fixed.

## 1. Findings, ranked

| # | Where | Text | Class | Source + locator | Fix |
|---|---|---|---|---|---|
| 1 | tpe-bk summary; tpe-bk-team summary, recommendation, entry body bullet | "Without high immunologic risk or concurrent acute rejection, reducing immunosuppression is the primary treatment (call the transplant team first)" ; "(strong, B)" | BROADER (the disease scope "sustained DNAemia or biopsy-proven nephropathy" is missing from every short form; the team BODY has it). Qualifier and grade placement are otherwise correct. | Table 7: "We recommend reducing maintenance immunosuppression as the primary treatment of sustained BKPyV-DNAemia/-nephropathy in kidney transplant patients without high immunologic risk or concurrent acute rejection (strong, B)" | Add "of sustained BK DNAemia or biopsy-proven nephropathy" to both summaries, the entry bullet and the recommendation. |
| 2 | tpe-bk-test body, 1000 to 10 000 bullet | "the guideline words the confirmation interval three ways, and its abstract is stronger than its table. See the link below." | UNCLEAR (conflict stated but no sourced action left for a result of, say, 5000 c/mL) | Table 5: "If plasma BKPyV-DNA loads are 1000-10 000 c/mL, we suggest confirmatory testing within 2-3 wk (weak, B)"; Table 7: reduction "on 2 measurements within 2-3 wk (weak, B)"; Intro: "sustained for >2 wk"; Figure 1: "twice >2 weeks apart"; abstract "persisting >1000 copies/mL ... should be reduced" | "Table 5: confirmatory testing within 2 to 3 weeks (weak, B); other parts of the guideline word it differently, and the abstract is stronger: see the link." |
| 3 | tpe-bk-team body | "After reduction, Figure 1 shows serum creatinine every 1 to 2 weeks and BK DNA every 2 to 4 weeks (ungraded)." | UNDERSTATED grade for the DNA interval | Table 6: "BKPyV-DNAemia should be monitored every 2-4 wk until clearance (strong, B)" | "...Figure 1 shows creatinine every 1 to 2 weeks (ungraded); BK DNA every 2 to 4 weeks until clearance (strong, B)." |
| 4 | tpe-bk-test summary | "BK consensus 2024: plasma BK DNA PCR above 10 000 c/mL is presumptive BK nephropathy. Urine decoy cells ... measure plasma (strong, B)." | LOST scope (kidney recipients; the high-risk biopsy-first note) when read alone | Intro definitions are for kidney recipients; Figure 1 | Open with "Kidney recipients:". |
| 5 | CA2 | "BK consensus, kidney recipients: plasma BK DNA PCR is the test; above 10 000 c/mL is presumptive BK nephropathy." | UNCLEAR as an action (states a fact; faithful) | | "Send plasma BK DNA PCR in kidney recipients with new graft dysfunction; above 10 000 c/mL is presumptive BK nephropathy." (check against the approved note scope) |
| 6 | tpe-bk-team-detail overlay, Disposition | "Not in the guideline: ED admission or discharge criteria." | SILENCE WITHOUT nearest fact or Related-consults line (overlay only) | | Add the Figure 1 monitoring fact and the Related consults line, or fold into the node. |

Summary verdicts: tpe-bk FAITHFUL apart from 1; test FAITHFUL (4, 2); team FAITHFUL apart from 1. No unmarked instructions in any summary. Entry summary is exactly 30 words.

## 2. Critical actions (3; 13, 19, 20 words)
CA1 shared note, APPROVED, first. CA2 finding 5. CA3 "Recommended against: cidofovir and leflunomide to treat BK; fluoroquinolones and statins to prevent or treat BK. Other uses not addressed." FAITHFUL ("to treat" / "to prevent or treat" kept; strong B / strong A omitted, no mis-attachment). No critical action names reducing immunosuppression, so the parenthetical is not required there; it is present in both summaries and the recommendation.

## 3. Editor notes (all APPROVED-WORDING)
"Editor note: in a kidney transplant recipient with new graft dysfunction, raise BK with the transplant team."; "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant." (entry body once; CA1); "Editor note: tell the transplant team the test was sent and which laboratory ran it." (test); "Editor note: urinary symptoms or an abnormal urinalysis in a transplant recipient still need their own assessment: [Adult UTI](#/tree/adult-uti)." (team); "Editor note: disposition is decided with the treating transplant team." (body and recommendation). None other.

## 4. Silence and navigation
"Not in the guideline: a symptom list." (entry) TRUE; followed by general biopsy reasons (creatinine rise above 15%, hematuria, proteinuria; matches [1] Pathology) and a Related consults line. "Not in the guideline: ED admission or discharge criteria." (team) TRUE; followed by Figure 1 intervals and Related consults. No "App content:" lines. Overlay silence: finding 6; definitions overlay has the fact but no Related line.

## 5. Mechanics
Words (summary / body): tpe-bk 30/139; test 29/136; team 25/143 (recommendation 74). CAs 13, 19, 20. Body 150 or fewer. Hub: entry options test, treatment/disposition; test `next` and team are the disposition path (tpe-bk-team is the result node); everything reachable. Both overlays linked and cited ([1]). Body and recommendation of tpe-bk-team end with exactly the required sentence. No provenance strings. Link `#/node/tpe-cni-kidney`: id exists in drafts/tpe-cni-toxicity.nodes.ts (line 89); bare `#/node/` is a routed redirect in router.ts.
