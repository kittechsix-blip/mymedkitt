import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import vm from 'node:vm';
import {floorVolume,localAnestheticVolume,laCapMg,LA_COMBO_CALCULATOR} from '../src/components/la-combo-calculators.ts';
const source=readFileSync(new URL('../src/components/calculator.ts',import.meta.url),'utf8');
function calculator(name){const start=source.indexOf(`const ${name}:`);const end=source.indexOf('\n};',start)+3;return vm.runInNewContext(stripTypeScriptTypes(source.slice(start,end))+`;${name}`,{floorVolume,laCapMg});}
test('percentage conversion and conservative volume rounding',()=>{
 assert.equal(localAnestheticVolume(300,1),30);
 assert.equal(localAnestheticVolume(300,2),15);
 assert.equal(localAnestheticVolume(140,0.5),28);
 assert.equal(localAnestheticVolume(33.3*4.5,1),14.98);
 for(const bad of [0,-1,NaN,Infinity])assert.equal(localAnestheticVolume(300,bad),null);
});
test('facial maximum returns mL first and preserves adult cap',()=>{
 const c=calculator('FNB_LA_MAX_DOSE_CALCULATOR');
 assert.equal(c.computeResult({weight:100,agent:45,conc:100}).value,'30 mL (cc)');
 assert.equal(c.computeResult({weight:33.3,agent:45,conc:100}).value,'14.98 mL (cc)');
 assert.equal(c.computeResult({weight:100,agent:25,conc:50}).value,'35 mL (cc)');
});
test('dental bupivacaine respects 90 mg per sitting and retains cartridge context',()=>{
 const c=calculator('DNB_LA_MAX_DOSE_CALCULATOR');const r=c.computeResult({weight:70,agent:30,conc:50});
 assert.equal(r.value,'18 mL (cc)');assert.match(r.description,/90 mg/);assert.match(r.description,/\*\*10\*\*/);
 const tracker=calculator('DNB_VOLUME_TRACKER_CALCULATOR');assert.match(tracker.computeResult({weight:70,agent:30,conc:50,cartridges:5}).description,/9 mL \(cc\)/);
});
test('combination tool does not suggest automatic doses before a volume is entered',()=>{
 const r=LA_COMBO_CALCULATOR.computeResult({weight:70,agent1:1,conc1:100,agent2:3,conc2:50});
 assert.equal(r.value,'--');assert.match(r.description,/Do not give both standalone maximum doses/);
});
test('local drug cards have strength selection and caps without changing IV lidocaine',()=>{
 const data=readFileSync(new URL('../src/data/drug-store.ts',import.meta.url),'utf8');
 const local=data.slice(data.indexOf('const LIDOCAINE:'),data.indexOf('\nconst ',data.indexOf('const LIDOCAINE:')+10));
 const hematoma=local.slice(local.indexOf("indication: 'Hematoma block'"),local.indexOf("indication: 'TCA Overdose"));assert.match(hematoma,/localAnestheticPercents/);assert.match(hematoma,/maxDose: 300/);
 const iv=local.slice(local.indexOf("indication: 'TCA Overdose"));assert.doesNotMatch(iv,/localAnestheticPercents/);
});
test('mismatched strengths and non-finite weight cannot produce an injection volume',()=>{
 for(const name of ['FNB_LA_MAX_DOSE_CALCULATOR','DNB_LA_MAX_DOSE_CALCULATOR']){
  const c=calculator(name);
  assert.equal(c.computeResult({weight:70,agent:45,conc:25}).value,'--');
  assert.equal(c.computeResult({weight:Infinity,agent:45,conc:200}).value,'--');
 }
 const dental=calculator('DNB_LA_MAX_DOSE_CALCULATOR');
 assert.equal(dental.computeResult({weight:70,agent:71,conc:200}).value,'--');
 assert.equal(dental.computeResult({weight:70,agent:71,conc:400}).value,'12.25 mL (cc)');
});
