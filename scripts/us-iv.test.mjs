import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateUsIv, US_IV_CALCULATOR } from '../docs/components/us-iv.js';
import { getAllCalculators } from '../docs/components/calculator.js';
test('US IV geometry and exact inch conversion', () => {
  for (const [d,a,expected] of [[1,30,2],[1,45,Math.SQRT2],[1.5,90,1.5],[2,60,4/Math.sqrt(3)]]) {
    const result = calculateUsIv(d,a);
    assert.ok(Math.abs(result.cm-expected)<1e-12);
    assert.ok(Math.abs(result.inches-expected/2.54)<1e-12);
  }
});
test('Reject missing, nonfinite and nonphysical inputs', () => {
  for (const [d,a] of [[0,45],[-1,45],[NaN,45],[Infinity,45],[1,0],[1,-20],[1,91],[1,NaN],[1,Infinity]]) assert.equal(calculateUsIv(d,a),null);
});
test('Shallower angles require more travel; depth scales linearly', () => {
  assert.ok(calculateUsIv(1,15).cm > calculateUsIv(1,30).cm);
  assert.equal(calculateUsIv(2,45).cm,2*calculateUsIv(1,45).cm);
});
test('US IV discoverable in calculator search metadata with safeguards', () => {
  assert.ok(getAllCalculators().some(c=>c.id==='us-iv' && c.title==='US IV' && c.subtitle.includes('Ultrasound')));
  assert.match(US_IV_CALCULATOR.thresholdNote,/not a catheter-size recommendation/);
});

test('Difficult access pins US IV in its toolbar', async () => {
 const { TOOLBAR_CONFIGS } = await import('../docs/data/toolbar-configs.js');
 assert.ok(TOOLBAR_CONFIGS['difficult-vascular-access'].some(t => t.target === 'us-iv' && t.action === 'calculator' && t.pinned));
});
