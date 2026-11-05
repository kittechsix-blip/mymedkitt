import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {MALARIA_NODES, MALARIA_CRITICAL_ACTIONS} from '../docs/data/trees/malaria.js';
const source=readFileSync(new URL('../docs/components/calculator.js',import.meta.url),'utf8');
function calculator(name){const start=source.indexOf(`const ${name} =`);assert.ok(start>=0);const end=source.indexOf('\n};',start)+3;return runInNewContext(source.slice(start,end)+`\n${name};`);}
const artesunate=calculator('ARTESUNATE_DOSING_CALCULATOR');
const parasitemia=calculator('PARASITEMIA_CALC_CALCULATOR');
test('CDC artesunate uses 2.4 mg/kg across pediatric/adult boundaries',()=>{
 for(const [weight,dose] of [[5,12],[10,24],[19,45.6],[20,48],[70,168],[100,240]]) {
   assert.equal(artesunate.computeResult({weight}).value,`${dose} mg`);
   assert.equal(artesunate.computeResult({weight,pediatric:1}).value,`${dose} mg`,'legacy pediatric flag must not enable WHO dosing');
 }
 for(const weight of [0,-1,NaN,Infinity,undefined])assert.equal(artesunate.computeResult({weight}).label,'Enter weight');
});
test('severe malaria boundary uses unrounded parasitemia ≥5%',()=>{
 for(const [infected,total,severe] of [[49,1000,false],[50,1000,true],[75,1000,true],[100,1000,true],[999,20000,false]]) {
 const r=parasitemia.computeResult({'infected-rbcs':infected,'total-rbcs':total});assert.equal(r.label==='SEVERE MALARIA',severe);
 }
 assert.equal(parasitemia.computeResult({'infected-rbcs':999,'total-rbcs':20000}).value,'<5%');
});
test('treatment and ICU cards carry the CDC continuation and safety instructions',()=>{
 for(const id of ['mal-severe-treatment','mal-dispo-icu']) {
 const body=MALARIA_NODES.find(n=>n.id===id).body;
 assert.match(body,/at least 4 hours/);assert.match(body,/parasitemia >1% OR oral medication is not tolerated/);assert.match(body,/maximum of 7 total days/);assert.match(body,/parasitemia is ≤1% AND/);assert.match(body,/8-24 hours/);
 assert.match(body,/Do not use exchange transfusion/);assert.match(body,/doxycycline, tetracycline, or clindamycin alone/);assert.match(body,/commercially available/);
 }
 assert.doesNotMatch(JSON.stringify([...MALARIA_NODES,...MALARIA_CRITICAL_ACTIONS]),/CDC IND|via CDC IND|Obtain via CDC|exchange transfusion if/);
});
test('Stop panel agrees with severe-malaria treatment', async()=>{
 const {STOP_PAGES_10}=await import('../docs/data/stop-pages/batch-10.js');
 const text=JSON.stringify(STOP_PAGES_10['malaria-stop']);
 assert.match(text,/Parasitemia ≥5%/);assert.match(text,/Do NOT use exchange transfusion/);assert.match(text,/7 total IV days/);
 assert.doesNotMatch(text,/CDC IND|hyperparasitemia >5%/);
});
test('visual flowchart uses CDC threshold and pediatric artesunate dose',()=>{
 const html=readFileSync(new URL('../docs/infographics/malaria.html',import.meta.url),'utf8');
 const spec=JSON.parse(html.match(/<script type="application\/json" id="ig-spec">([\s\S]*?)<\/script>/)[1]);
 const calc=spec.calcs.find(c=>c.id==='ivartesunatepeds');
 assert.equal(calc.expr,'round(2.4*weight,2)');
 for(const v of calc.testVectors)assert.equal(v.expect,Math.round(v.in.weight*2.4*100)/100);
 assert.doesNotMatch(html,/CDC IND|Parasitemia (?:>|&gt;)10%|parasitemia (?:>|&gt;)10%/);
 assert.match(JSON.stringify(spec),/7 total|seven total|total of 7|7 days total/);
});
