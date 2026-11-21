import fs from 'node:fs';
import { TREE_REGISTRY } from '../scripts/tree-registry.mjs';
const R='/Users/kittechsix/Developer/mymedkitt-transplant/';
const tx=await import(R+'src/data/transplant-drugs/toxicities.ts'); const od=await import(R+'src/data/onc-drugs/index.ts');
const cache={}; const nodeOf=async(tree,node)=>{ if(!cache[tree]){const m=await import(R+`src/data/trees/${tree}.ts`);cache[tree]=m[TREE_REGISTRY[tree].prefix+'_NODES'];} return cache[tree].find(n=>n.id===node); };
const esc=s=>(s||'').replace(/\|/g,'\\|').replace(/\n/g,' ');
const tier={1:'1',2:'2',3:'3'};
let rows=''; for(const t of tx.TX_TOXICITIES){ const n=await nodeOf(t.page.tree,t.page.node); const ok=n&&n.summary&&n.citation?.length; rows+=`| \`${t.id}\` | ${t.label} | ${tier[t.lethality]} | ${t.page.tree} / ${t.page.node} | ${ok?esc(n.summary):'**[NOT WRITTEN placeholder or no summary]**'} | ${t.complaints.join(', ')} | ALLOWED (transplant-owned) |\n`; }
const ids=['drug-qt-prolongation','drug-adrenal-insufficiency','drug-gi-perforation','drug-hepatotoxicity','drug-pancreatitis','drug-severe-skin','rhabdomyolysis','drug-lung-toxicity','drug-fluid-retention','drug-thromboembolism','drug-nephrotoxicity','drug-hypertension','chemo-hypersensitivity','chemo-myelosuppression'];
const NOT=new Set(['drug-lung-toxicity','drug-fluid-retention','drug-thromboembolism','drug-nephrotoxicity','chemo-hypersensitivity','chemo-myelosuppression']);
let brow=''; for(const id of ids){ const t=od.ONC_DATA.toxicities.find(x=>x.id===id); const n=await nodeOf(t.page.tree,t.page.node); const why=NOT.has(id)?(t.page.tree==='oncological-emergencies'?'oncology routing page (oncological-emergencies; febrile neutropenia in a chemotherapy patient)':'oncology routing page inside onc-drug-side-effects; text says "oncologist" and lists oncology drug classes'):'general consult, no oncology framing'; const note=(id==='drug-qt-prolongation')?' Use `tx-qt-prolongation` (tier 1).':(id==='drug-adrenal-insufficiency')?' Use `tx-adrenal-insufficiency` (tier 1).':''; brow+=`| \`${id}\` | ${t.label} | ${t.lethality} | ${t.page.tree} / ${t.page.node} | ${esc(n.summary)} | ${t.complaints.join(', ')} | ${NOT.has(id)?'**NOT ALLOWED**':'ALLOWED'}: ${why}.${note} |\n`; }
const md=`# Transplant card taxonomy

Owner-approved tier table and structural choices: \`research/transplant-sources/DECISIONS.md\` ("Tier table and structural questions: APPROVED", "Q16: settled", "Fable review 2 of 4").
Source of truth in code: \`src/data/transplant-drugs/toxicities.ts\` and \`complaints.ts\`. This file is generated from them plus the target nodes' own summaries (run 2026-11-20).
Rules for card authors: a card effect row may use ONLY an id in the two tables below marked ALLOWED. Tier 1 = lethality 1 (can kill within hours), tier 2 = lethality 2, tier 3 = lethality 3.
A hazard with no category here is a plain line in \`alsoOnLabel\` (head, colon, one hazard, 200 characters or fewer, cited). Boxed hazards still lead each card regardless of tier.
A row whose page is a "[NOT WRITTEN]" placeholder is allowed to exist but the gate "no row without a live page summary" stays red until that page is written.

## Transplant categories (transplant-owned, \`tx-\` ids)

| id | title | tier | page target (tree / node) | target node summary | complaints | status |
|---|---|---|---|---|---|---|
${rows}
## Borrowed oncology categories (ids from src/data/onc-drugs/toxicities.ts; do not edit oncology data)

| id | title | tier (oncology lethality) | page target | target node summary | complaints | status |
|---|---|---|---|---|---|---|
${brow}
Other oncology category ids are not reviewed for transplant use: treat them as NOT ALLOWED until listed above.

## Categories that do NOT exist ("no usable page"): the hazard is a plain line

- \`tx-hepatic-artery-thrombosis\` (tier 1, approved): the named target \`transplant-patient-ed / tpe-liver-vascular\` has a citation but NO \`summary\`, so the engine's TOX-PAGE check would fail permanently. Create it once that verified node gains a summary (owner/author step). Until then: plain line.
- \`tx-steroid-hyperglycemia\` (tier 3, approved): \`hyperglycemia-ed\` has 38 nodes and none has a \`summary\` (all have citations). Plain line.
- Plain lines by owner decision (never categories): pure red cell aplasia; acute inflammatory syndrome; DRESS; wound healing; proteinuria; hyperlipidemia; steroid psychiatric effects; aseptic meningitis; TRALI; bronchial dehiscence (box only).
- Not yet approved as categories (do not use): embryofetal toxicity, serum sickness, visual disturbance, liver injury, pancreatitis, pneumonitis, severe skin reactions, thromboembolism for transplant rows until a transplant-side page or an ALLOWED general consult is chosen. (Borrowed \`drug-hepatotoxicity\`, \`drug-pancreatitis\`, \`drug-severe-skin\` are ALLOWED as written above; pneumonitis and thromboembolism have only NOT ALLOWED oncology routing pages, so they are plain lines.)

## Interaction heads now in force (every \`interactions\` line starts with exactly one of these)

- \`Raises level:\`
- \`Lowers level:\`
- \`Adds kidney risk:\`
- \`Adds marrow risk:\`
- \`Adds marrow and kidney risk:\`
- \`Adds marrow or kidney risk:\`
- \`Adds potassium risk:\`
- \`Raises the other drug:\`
- \`Lowers the other drug:\`
- \`Falls when it stops:\`
- \`Avoid together:\`

Lines no head fits stay plain, drug-named lines in \`alsoOnLabel\`, beside the block. Non-interaction \`alsoOnLabel\` has 12 lines or fewer per card (methylprednisolone excepted by owner decision).
Cross-reference lines between sibling labels are quotations attributed to the other FDA label. Timing badges may use a stated time unit (minutes, hours, days, weeks, months, years) without a digit.
`;
fs.writeFileSync(R+'research/transplant-sources/cards/TAXONOMY.md',md); console.log(md.length);
