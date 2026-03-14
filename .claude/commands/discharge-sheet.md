# Discharge Info Sheet Builder

Create a shareable patient discharge information sheet for a consult and link it to the appropriate discharge/disposition node(s).

## Usage

```
/discharge-sheet <tree-id> [node-id]
```

- `<tree-id>` — the consult tree ID (e.g., `syncope`, `burns`, `afib-rvr`)
- `[node-id]` — optional specific discharge node to link. If omitted, auto-detect all discharge/disposition result nodes.

## What It Creates

A shareable `InfoPage` with `shareable: true` that:
1. **Addresses the patient directly** — "You were evaluated today for..." not clinician language
2. **Uses plain language** — no jargon without explanation
3. **Follows the standard structure:**
   - **What happened** — brief 1-2 sentence explanation of the condition and what was done
   - **Return to the ED immediately if** — red flag symptoms (bolded, bulleted)
   - **What to do at home** — medication adherence, lifestyle modifications, activity restrictions
   - **Follow-up care** — who to see, when, what to bring
   - **Important reminders** — key safety points

## Steps

1. **Read the consult tree** at `src/data/trees/<tree-id>.ts` to understand:
   - What the condition is
   - What the discharge criteria are
   - What medications or treatments were given
   - What follow-up is recommended

2. **Identify discharge nodes** — result nodes where patients go home. Look for:
   - `type: 'result'` with discharge/home language
   - Recommendation mentioning outpatient, PCP, follow-up
   - Low-risk disposition nodes

3. **Draft the info page** using content from:
   - The tree's result node body and recommendation
   - The tree's citations (use 2-3 relevant ones)
   - Standard return precautions for the condition
   - **Only use information from the source material in the tree — never invent clinical content**

4. **Write the InfoPage** in `src/data/info-pages.ts`:
   ```typescript
   const CONSULT_DISCHARGE: InfoPage = {
     id: '<tree-id>-discharge',
     title: 'Discharge Instructions',
     subtitle: 'Patient Information — <Condition Name>',
     shareable: true,
     sections: [
       { heading: 'What Happened', body: '...' },
       { heading: 'Return to the Emergency Department Immediately If', body: '• ...\n• ...' },
       { heading: 'What to Do at Home', body: '...' },
       { heading: 'Follow-Up Care', body: '...' },
       { heading: 'Important Reminders', body: '...' },
     ],
     citations: [
       { num: 1, text: '...' },
     ],
   };
   ```

5. **Register** in the `INFO_PAGES` map (same file).

6. **Link from discharge node(s)** — add to the node's body text:
   ```typescript
   body: '...existing text...\n\n[Discharge Instructions](#/info/<tree-id>-discharge) — shareable patient handout.'
   ```

7. **Run `/deploy`** to compile, bump caches, and push.

## Writing Guidelines

**DO:**
- Address patient: "You", "your"
- Explain medical terms: "syncope (fainting)"
- Use bullet points with `•` (unicode `\u2022`)
- Bold urgent items: `**Call 911 if...**`
- Include 2+ citations from the tree's evidence base
- Keep sections concise — this gets texted to patients
- Include condition-specific return precautions

**DON'T:**
- Use clinician-to-clinician language
- Include dosing details (patient has their prescription)
- Reference other nodes or internal links (patients can't navigate the app)
- Add drug hyperlinks (`#/drug/...`) — this is patient-facing
- Invent clinical content not sourced from the tree

## Existing Examples

| Consult | Page ID | Pattern |
|---------|---------|---------|
| Priapism | `priapism-return-precautions` | Return precautions focused |
| A-Fib RVR | `afib-discharge` | Full discharge instructions |
| Croup | `croup-return-precautions` | Parent-facing pediatric |
| PEP | `pep-patient-info` | Educational (pre-decision) |
| Diarrhea | `diarrhea-discharge` | Home management focused |
