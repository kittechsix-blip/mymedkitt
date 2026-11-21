// Throwaway assembler: merges five verified drafts into src/data/trees/transplant-patient-ed.ts with citation remap.
import fs from 'node:fs';
const ROOT='/Users/kittechsix/Developer/mymedkitt-transplant/';
const D=ROOT+'research/transplant-sources/drafts/';
const PAGES=[['heart',2],['liver',2],['lung',2],['kidney',2],['cmv',3],['bk',3],['cni-toxicity',4],['cni-hypertension',4],['cytopenia',4]];
const slice=(src,name)=>{ const re=new RegExp('export const '+name+'\\b[^=]*=\\s*\\['); const m=re.exec(src); if(!m) throw new Error('no '+name);
  const start=m.index+m[0].length; const end=src.indexOf('\n];',start); return src.slice(start,end); };
const unified=[]; // {text,num}
const mapAll={}; let nodesText='', caText='', countNodes=0;
const mapNum=(n,map)=>{ if(!(n in map)) throw new Error('unmapped citation number '+n); return map[n]; };
// root-cause fix (round 3): inline markers are "[n]" AND comma lists "[a, b, c]"; the first version only matched "[n]", so lists stayed draft-local
const remapText=(t,map)=>t.replace(/(citation"?\s*:\s*\[)([\d,\s]+)(\])|\[(\d+(?:\s*,\s*\d+)*)\]/g,(all,a,list,c,inline)=>{
  if(list!==undefined) return a+list.split(',').map(x=>mapNum(+x.trim(),map)).join(', ')+c;
  return '['+inline.split(',').map(x=>mapNum(+x.trim(),map)).join(', ')+']'; });
for (const [p,mod] of PAGES) {
  const src=fs.readFileSync(D+`tpe-${p}.nodes.ts`,'utf8');
  const cites=[...slice(src,'CITATIONS').matchAll(/^\s*\{ num: (\d+), text: (.*) \},?\s*$/gm)].map(m=>({num:+m[1],line:m[2]}));
  const map={};
  for(const c of cites){ let u=unified.find(x=>x.line===c.line); if(!u){u={line:c.line,num:unified.length+1}; unified.push(u);} map[c.num]=u.num; }
  mapAll[p]=map;
  let nt=slice(src,'NODES'); let ca=slice(src,'CRITICAL_ACTIONS');
  if(!/module: 0,/.test(nt)) throw new Error('no module 0');
  nt=nt.replace(/module: 0,/g,`module: ${mod},`);
  nodesText+=`  // ---- page: tpe-${p} (assembled from research/transplant-sources/drafts/tpe-${p}.nodes.ts) ----`+remapText(nt,map).replace(/^\n?/,'\n')+'\n';
  caText+=remapText(ca,map).replace(/^\n?/,'\n');
}
const start=`  {
    id: 'tpe-start',
    type: 'question',
    module: 1,
    title: 'Transplant Patient in the ED',
    summary: 'Adult solid organ transplant recipient in the ED: pick the organ or the problem below.',
    body: 'Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.\\n\\nNot yet in this consult: fever and infection by time since transplant, Pneumocystis pneumonia, post-transplant lymphoproliferative disorder, diarrhea, and pancreas, intestine or islet recipients. Related consults: [Sepsis](#/tree/sepsis).',
    options: [
      { label: 'Fever with low neutrophils', next: 'tpe-cytopenia-fever', urgency: 'critical' },
      { label: 'Low blood counts on a transplant drug', next: 'tpe-cytopenia', urgency: 'urgent' },
      { label: 'Heart transplant recipient in the ED', next: 'tpe-heart', urgency: 'urgent' },
      { label: 'Lung transplant recipient: acute respiratory decline', next: 'tpe-lung', urgency: 'critical' },
      { label: 'Liver transplant recipient with a possible graft problem', next: 'tpe-liver', urgency: 'urgent' },
      { label: 'Kidney transplant recipient: rejection and graft emergencies', next: 'tpe-kidney', urgency: 'urgent' },
      { label: 'Transplant patient on tacrolimus or cyclosporine: possible drug toxicity', next: 'tpe-cni-toxicity', urgency: 'urgent' },
      { label: 'High blood pressure on tacrolimus or cyclosporine', next: 'tpe-cni-hypertension', urgency: 'urgent' },
      { label: 'Transplant recipient with possible CMV', next: 'tpe-cmv', urgency: 'urgent' },
      { label: 'BK polyomavirus in the kidney transplant recipient', next: 'tpe-bk' },
    ],
    calculatorLinks: [{ id: 'transplant-drug-side-effects', label: 'Transplant Drugs Side-effects', kind: 'tree' }],
  },
`;
// safety level aligned with the hub option that leads to the node (metadata only; round 3): hub says 'critical'
const ALIGN={'tpe-kidney-vascular':'critical','tpe-cmv-treat':'critical'};
for(const [id,lvl] of Object.entries(ALIGN)){ const i=nodesText.indexOf(`id: "${id}"`); if(i<0) throw new Error('align: '+id); const j=nodesText.indexOf('safetyLevel:',i); const e=nodesText.indexOf('\n  },',i); if(j<0||j>e) throw new Error('align: no safetyLevel in '+id); nodesText=nodesText.slice(0,j)+nodesText.slice(j).replace(/safetyLevel:\s*"[a-z]+"/,`safetyLevel: "${lvl}"`); }
const out=`// MedKitt - Transplant Patient in the ED
// Assembled from verified drafts (research/transplant-sources/drafts/tpe-{heart,liver,lung,cmv,bk}.nodes.ts); text copied verbatim,
// only citation numbers, module numbers and imports changed. Editor notes are listed in each page's *.ledger.md.
// tpe-start is a plain entry hub: no clinical statement beyond the approved shared note; one option per written page.
// This array must stay a literal \`_NODES = [ ... ];\` (regex gates read it): do not spread or generate into it.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const TRANSPLANT_PATIENT_ED_CRITICAL_ACTIONS: CriticalAction[] = [${caText}];

export const TRANSPLANT_PATIENT_ED_NODES: DecisionNode[] = [
${start}${nodesText}];

export const TRANSPLANT_PATIENT_ED_NODE_COUNT = TRANSPLANT_PATIENT_ED_NODES.length;

export const TRANSPLANT_PATIENT_ED_MODULE_LABELS = ['Start', 'Organ pages', 'Infection', 'Drug toxicity'];

export const TRANSPLANT_PATIENT_ED_CITATIONS: Citation[] = [
${unified.map(u=>`  { num: ${u.num}, text: ${u.line} },`).join('\n')}
];
`;
fs.writeFileSync(ROOT+'src/data/trees/transplant-patient-ed.ts',out);
console.log(JSON.stringify(unified.map(u=>[u.num,u.line.slice(0,70)])));
fs.writeFileSync(ROOT+'.transplant-baseline/tpe-cite-map.json',JSON.stringify({mapAll,unified:unified.map(u=>({num:u.num,head:u.line.slice(0,90)}))},null,1));
console.log(JSON.stringify(mapAll), unified.length);

// ---- overlays -> src/data/new-content/transplant-patient-ed-info.ts (text copied verbatim, one registry object) ----
const infoFiles=fs.readdirSync(D).filter(f=>f.endsWith('.info.ts')&&f!=='transplant-drug-side-effects-stop.info.ts').sort(); // the drug consult's Stop page is generated separately below
let infoBody=''; const ids=[];
for(const f of infoFiles){
  const src=fs.readFileSync(D+f,'utf8');
  const m=/(?:export )?const \w+: InfoPage = \{/.exec(src); if(!m) throw new Error('no InfoPage in '+f);
  const open=m.index+m[0].length-1; const close=src.lastIndexOf('\n};'); const lit=src.slice(open,close+2);
  const id=/^\s*"?id"?:\s*["']([^"']+)["']/m.exec(lit)[1]; if(ids.includes(id)) throw new Error('dup '+id); ids.push(id);
  infoBody+=`  '${id}': ${lit},\n`;
}
fs.writeFileSync(ROOT+'src/data/new-content/transplant-patient-ed-info.ts',`// MedKitt - Transplant Patient in the ED: info-page overlays (assembled verbatim from research/transplant-sources/drafts/*.info.ts).
// Each overlay keeps its own page-local citation list. Registered in info-pages.ts INFO_PAGES.
import type { InfoPage } from '../info-pages.js';

export const TPE_INFO_PAGES: Record<string, InfoPage> = {
${infoBody}};
`);
fs.writeFileSync(ROOT+'.transplant-baseline/tpe-info-ids.json',JSON.stringify(ids));
console.log('overlays',ids.length);

// ---- Stop page of the drug consult -> src/data/new-content/transplant-drug-side-effects-stop.ts (whole draft copied; only the import path and export change) ----
{
  let src=fs.readFileSync(D+'transplant-drug-side-effects-stop.info.ts','utf8');
  src=src.replace("from '../../data/info-pages.js'","from '../info-pages.js'").replace('export default PAGE;','export const TDSE_STOP_PAGE: InfoPage = PAGE;');
  src=src.replace(/^\/\/ DRAFT /,'// (assembled verbatim from research/transplant-sources/drafts/transplant-drug-side-effects-stop.info.ts) ');
  fs.writeFileSync(ROOT+'src/data/new-content/transplant-drug-side-effects-stop.ts',src);
  console.log('drug stop page written');
}
