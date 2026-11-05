import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {SNAKE_ENVENOMATION_NODES as nodes} from '../docs/data/trees/snake-envenomation.js';
const source=readFileSync(new URL('../docs/components/calculator.js',import.meta.url),'utf8');
const start=source.indexOf('const SNAKE_ANTIVENOM_CALCULATOR =');
const calc=runInNewContext(source.slice(start,source.indexOf('\n};',start)+3)+'\nSNAKE_ANTIVENOM_CALCULATOR;');
test('progression/coagulopathy including severe grade uses standard initial CroFab',()=>{
 for(const pediatric of [0,1])for(const severity of [1,2,3])assert.equal(calc.computeResult({antivenom:1,lifeThreatening:1,severity,pediatric}).value,'4-6 vials');
 assert.equal(calc.computeResult({antivenom:1,severity:2}).value,'4-6 vials');
});
test('explicit immediate life threat selects higher initial CroFab for adults and children',()=>{
 for(const pediatric of [0,1])assert.equal(calc.computeResult({antivenom:1,lifeThreatening:2,pediatric}).value,'8-12 vials');
});
test('Anavip initial dose remains 10 vials regardless of immediate threat',()=>{
 for(const lifeThreatening of [1,2])assert.equal(calc.computeResult({antivenom:2,lifeThreatening}).value,'10 vials');
});
test('all previously excessive dosing paths explicitly qualify the higher initial dose',()=>{
 for(const id of ['snake-pit-severity-grade','snake-severe','snake-crofab','snake-airway']){
 const n=nodes.find(n=>n.id===id);assert.match(n.body,/immediately life-threatening/);assert.ok(n.citation.includes(7));
 }
 assert.doesNotMatch(JSON.stringify(nodes),/8-12 vials \(severe\)|10\+ vials|HIGH-DOSE ANTIVENOM/);
});
