# Pedi Resus Numbers: build outline (for Andy's approval)

Consult id: `pedi-resus-numbers` · Category: Pediatrics (cross-list Resuscitation) · Status: OUTLINE, nothing built

## 1. What the clinician sees

One screen, one input, everything recomputes instantly (no submit button, no network).

- **Input bar (top, sticky):** a single field with unit chips `mo | yr | kg | cm`. Typing `2y`, `18mo`, `14kg` or `92cm` also works. Age converts to an estimated weight; length maps straight to a zone; a known weight always wins.
- **Color band:** full-width bar in the zone color (Grey, Pink, Red, Purple, Yellow, White, Blue, Orange, Green) with weight used, how it was derived ("estimated from age: APLS" or "measured"), and an obesity warning chip.
- **Tabs (one tap each):** Airway · Tubes & Lines · Arrest & Rhythm · RSI · Seizure · Shock, Fluids & Vitals · Other drugs.
- Every drug row shows: dose in **mg AND mL** at the stocked concentration, the per-kg basis, the cap, route, and a "capped" flag when the max applies.
- Each row has a citation number; a Sources section lists them (Prong 4).

## 2. Calculators (all share one engine, so numbers never disagree)

| id | Name | Input → output |
|---|---|---|
| `pedi-zone` | Color Zone Tape (Broselow-equivalent) | age / weight / length → whole zone card (all tabs) |
| `pedi-weight` | Weight estimate | age → APLS weight, with range and obesity caveat |
| `pedi-airway` | ETT size and depth | age/weight → cuffed + uncuffed ID, depth at lip, blade, LMA, suction |
| `pedi-tubes` | Tubes and lines | NG/OG, Foley, chest tube, IV gauge |
| `pedi-arrest` | Arrest and rhythm | epi (IV/IO + ETT), amiodarone, lidocaine, adenosine, atropine, calcium, bicarb, magnesium, defib and cardioversion joules |
| `pedi-rsi` | RSI | ketamine, etomidate, propofol, fentanyl, midazolam, rocuronium, succinylcholine |
| `pedi-seizure` | Status epilepticus | midazolam IM/IN, lorazepam, diazepam PR, levetiracetam, fosphenytoin, phenobarbital |
| `pedi-shock` | Shock, fluids, vitals | bolus, PRBC, maintenance 4-2-1, dextrose, infusions (epi, norepi, dopamine), normal HR/RR, hypotension cutoff, ICP (3% saline, mannitol) |

Neonate (<3 kg / preterm) entry points to the existing `neonatal-resus` consult for NRP ETT sizing by gestational age.

## 3. Main search bar

New parser: an age (`2 yo`, `2y`, `18 months`, `6mo`) or weight (`14 kg`) plus a target word (ETT, tube, depth, blade, NG, foley, chest tube, epi, adenosine, defib, joules, bolus, broselow, color...). It returns an **answer card at the top of results**, colored by zone, e.g.

> **Age 2 yr · ~12 kg · YELLOW** · ETT 4.0 cuffed (4.5 uncuffed) · depth 12–13 cm at lip → open full zone

Tapping opens `pedi-zone` prefilled. Added to the bedside search gold set as tests ("age 2 yo ET tube", "6 month old epi dose", "20 kg defib", "broselow 14 kg").

## 4. Zone table (proposed source: Randall Children's card 2020, mapped to color by weight; ETT cuffed sizes from Children's Minnesota 06/2025)

| Zone | kg | Age (approx) | ETT cuffed | ETT uncuffed | Depth cm | Blade | LMA | NG | Foley | Chest tube | IV |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grey | 3–5 | term–4 mo | 3.0–3.5 | 3.5 | 9–10 | 1 | 1 | 5–8 | 5–6 | 10–12 | 22–24 |
| Pink | 6–7 | 5–8 mo | 3.5 | 3.5 | 10–10.5 | 1 | 1.5 | 8 | 5–8 | 10–12 | 22–24 |
| Red | 8–9 | 9–12 mo | 3.5 | 4.0 | 10.5–11 | 1 | 1.5 | 8 | 8 | 12–14 | 22–24 |
| Purple | 10–11 | 1–2 yr | 3.5–4.0 | 4.0 | 11–12 | 1 | 2 | 10 | 8 | 14–20 | 20–24 |
| Yellow | 12–14 | 2–3 yr | 4.0 | 4.5 | 12.5–13.5 | 2 | 2 | 10 | 8 | 20–24 | 20–22 |
| White | 15–18 | 4–5 yr | 4.5–5.0 | 5.0 | 14–15 | 2 | 2 | 10 | 8 | 20–24 | 20–22 |
| Blue | 19–23 | 6–7 yr | 5.0–5.5 | 5.5 | 15.5–16.5 | 2 | 2.5 | 12 | 10 | 24–32 | 18–20 |
| Orange | 24–29 | 8–9 yr | 5.5–6.0 | 6.0 | 17–18 | 2 | 2.5 | 14 | 12 | 28–32 | 18–20 |
| Green | 30–36 | 10–12 yr | 6.0–6.5 | 6.5 | 18.5–19.5 | 3 | 3 | 14–16 | 12 | 32–40 | 16–20 |

Above Green (>36 kg): adult sizing message (ETT 6.5–7.0 cuffed, use actual weight up to adult caps).
Not sourced yet (left out unless found): OPA, NPA, BVM, IO needle, BP cuff by zone.

## 5. Proposed defaults where sources disagree (Andy decides)

| Item | Conflict | Proposed default |
|---|---|---|
| Cuffed vs uncuffed | Randall uncuffed <5 yr; Children's MN cuffed all ages | Cuffed first, uncuffed shown beside it (AHA 2020 prefers cuffed) |
| Defibrillation | AHA 2 J/kg then 4 (max 10 or adult); ERC/RCUK 2025 4 J/kg first | 2 J/kg, then 4 J/kg, max 10 J/kg or adult dose (US/AHA); ERC note |
| Fluid bolus | 20 mL/kg (cards) vs 10 mL/kg (ERC 2025); AHA septic 10–20 | 10–20 mL/kg with reassessment after each; 5–10 mL/kg if cardiogenic |
| Atropine max | 0.5 mg (Randall) vs 1 mg (MN) | 0.02 mg/kg, max 0.5 mg single dose (PALS) |
| Rocuronium | 1.0 vs 1.2 mg/kg | 1.2 mg/kg (MN 2025, faster onset) |
| Succinylcholine | 1–2 mg/kg; age split | 2 mg/kg if <10 kg, 1.5 mg/kg otherwise |
| Etomidate | 0.2–0.3 vs 0.2–0.4 | 0.3 mg/kg, max 20 mg |
| Fentanyl | 2 mcg/kg max 200 vs 1–3 max 100 | 1–2 mcg/kg, max 100 mcg per dose |
| Midazolam IN (seizure) | 0.2 vs 0.3 mg/kg | IM/IN 0.2 mg/kg, max 10 mg |
| Epi IM anaphylaxis | max 0.3 vs 0.5 mg | 0.01 mg/kg of 1 mg/mL, max 0.5 mg (≤0.3 mg if <30 kg auto-injector) |
| D10 for hypoglycemia | 2 vs 5 mL/kg | D10 5 mL/kg (0.5 g/kg), max 25 g |
| Amiodarone | repeats | 5 mg/kg, max 300 mg, may repeat to 15 mg/kg total; perfusing: over 20–60 min |
| Weight from age | APLS vs Best Guess vs Luscombe | APLS: <1 yr (months + 9)/2; 1–5 yr 2×age + 8; 6–12 yr 3×age + 7; "use length or real weight when you can" |
| Phenobarbital | 15–20 mg/kg; caps 1–1.5 g | 20 mg/kg, max 1 g |
| Fosphenytoin | caps 1.5 vs 2 g PE | 20 mg PE/kg, max 1.5 g PE |

Note: the existing drug-dose modal estimates weight with a different formula (1–10 yr: 2×age + 10). Proposal: switch it to the same APLS engine so the app gives one weight per age.

## 6. Safety and legal

- ECRI/ISMP joint alert (rev. Jan 22, 2026): the 2025 AirLife Broselow Rainbow Tape Rev 3 has wrong doses (vecuronium mg/mL vs mg/kg; flumazenil 10x; ketamine analgesia 10x). Add a one-line pitfall and a regression test that our ketamine, flumazenil and vecuronium values are not the recalled ones (vecuronium omitted, per Children's MN "not recommended").
- Name: "Color Zone Tape (Broselow-equivalent)". Broselow is a trademark of its owner; a footer says myMedKitt is not affiliated. Weight bands are facts; no tape artwork is copied.
- Louis Litt and Dr. Kitlowski audit after build, per the pipeline.

## 7. Evidence gaps to verify during build

AHA 2025 Part 8 primary text (fetch blocked; checked via secondary sources), NRP 9th-ed ETT table (use existing neonatal-resus consult), push-dose epi (omit), OPA/NPA/BVM/IO/BP cuff by zone (omit unless sourced).

## Sources

1. Randall Children's Hospital Pediatric Emergency Quick Reference, Oct 2020 (Oregon EMSC).
2. Children's Minnesota Pediatric Emergency Reference Card M0055, 06/2025.
3. AHA 2020 PALS guidelines (Topjian et al., Circulation 2020) and 2025 AHA Part 8 (secondary summaries).
4. ERC/RCUK 2025 Paediatric Life Support.
5. ECRI/ISMP joint hazard alert, Broselow Rainbow Tape, rev. Jan 22, 2026.
6. Duracher 2008 (cuffed ETT formula); Kempley 2008 (neonatal depth); Holliday-Segar 1957; Luscombe & Owens 2007; Wells & Goldstein (obese weight estimation).
