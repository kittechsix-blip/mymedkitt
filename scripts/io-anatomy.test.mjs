import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {IO_SITES, IO_SAFETY, IO_CONFIRM} from '../docs/data/io-anatomy.js';
import {INFO_PAGES} from '../docs/data/info-pages.js';
test('Every IO site has an original diagram and full placement guidance',()=>{
 assert.equal(IO_SITES.length,4);
 for(const site of IO_SITES){for(const key of ['position','adult','pediatric','trajectory','pitfalls'])assert.ok(site[key].length>30);assert.ok(fs.readFileSync(new URL('../docs/images/difficult-vascular-access/'+site.image,import.meta.url),'utf8').includes('<svg'));}
 const page=INFO_PAGES['dva-io-sites']; assert.equal(page.sections.filter(s=>s.image).length,4);
 assert.match(page.sections[0].body,/#\/calculator\/io-anatomy/);
});
test('Pediatric femur and humeral direction cannot inherit tibial rules',()=>{
 const femur=IO_SITES.find(s=>s.id==='distal-femur');assert.match(femur.adult,/Not an adult/);assert.match(femur.pediatric,/not a universal rule/);assert.match(femur.trajectory,/90°/);
 const humerus=IO_SITES.find(s=>s.id==='proximal-humerus');assert.match(humerus.trajectory,/45°/);assert.match(humerus.trajectory,/opposite hip/);assert.match(humerus.position,/internally rotate/);
});
test('Safety includes attempted access and needle depth check, not a preset drilling depth',()=>{
 assert.match(IO_SAFETY,/attempted within 48 hours/);assert.match(IO_CONFIRM,/5 mm/);assert.match(IO_CONFIRM,/Never advance to a fixed depth/);assert.match(IO_CONFIRM,/stop immediately/);
});
