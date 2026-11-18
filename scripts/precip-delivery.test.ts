import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PRECIP_DELIVERY_NODES as nodes } from '../src/data/trees/precip-delivery.ts';
const byId = new Map(nodes.map(n => [n.id, n]));
function path(start: string) {
  const seen = new Set<string>();
  let id: string | undefined = start;
  while (id) {
    assert.ok(!seen.has(id), `cycle at ${id}`);
    seen.add(id);
    const node = byId.get(id);
    assert.ok(node, `missing node ${id}`);
    id = node.next;
  }
  return [...seen];
}
test('routine and tight-cord births assess newborn before clamping and give prophylaxis before placenta', () => {
  for (const start of ['precip-shoulders', 'precip-nuchal-cut']) {
    const flow = path(start);
    for (const [before, after] of [['precip-baby','precip-cord'], ['precip-cord','precip-oxytocin'], ['precip-oxytocin','precip-placenta'], ['precip-placenta','precip-placenta-exam']]) {
      assert.ok(flow.includes(before) && flow.includes(after));
      assert.ok(flow.indexOf(before) < flow.indexOf(after), `${start}: ${before} precedes ${after}`);
    }
    assert.equal(flow.at(-1), 'precip-complete');
  }
});
test('time-critical source safeguards survive summary and treatment rendering', () => {
  const oxy = byId.get('precip-oxytocin')!;
  assert.match(oxy.body, /do not wait for placental delivery/i);
  assert.match(oxy.body, /10 units diluted IV over 1–2 minutes/);
  assert.match(oxy.treatment!.firstLine!.notes!, /rapid IV bolus/);
  assert.doesNotMatch(JSON.stringify(oxy), /83 mL\/hr|20 units in 1L/);
  assert.match(byId.get('precip-baby')!.body, /Do not delay needed ventilation/);
  assert.match(byId.get('precip-placenta')!.body, /Never pull on the cord without uterine counter-traction/);
  assert.match(byId.get('precip-nuchal-cut')!.body, /CLAMP AND CUT: LAST RESORT/);
});
