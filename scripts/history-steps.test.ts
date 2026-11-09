import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HistoryStepTracker } from '../src/services/history-steps.ts';

let n = 0;
const mk = () => new HistoryStepTracker(() => `s${++n}`);

test('begin on a fresh entry stamps depth 0; forward taps push depth 1..n', () => {
  const t = mk();
  assert.deepEqual(t.begin('dka', null).map(o => o.type), ['replace']);
  const ops = [...t.sync(1), ...t.sync(2), ...t.sync(3)];
  assert.deepEqual(ops.map(o => o.type), ['push', 'push', 'push']);
  assert.deepEqual(ops.map(o => o.state.mkDepth), [1, 2, 3]);
  assert.equal(t.depth, 3);
  assert.equal(t.canStepBack(), true);
});

test('auto-skipped multi-card advance pushes one entry per card', () => {
  const t = mk();
  t.begin('dka', null);
  assert.deepEqual(t.sync(3).map(o => o.state.mkDepth), [1, 2, 3]);
});

test('pop to shallower depth reports the number of goBack calls', () => {
  const t = mk();
  const base = t.begin('dka', null)[0].state;
  const pushed = [...t.sync(1), ...t.sync(2), ...t.sync(3)].map(o => o.state);
  assert.deepEqual(t.onPop(pushed[1]), { type: 'back', steps: 1 }); // depth 3 -> 2
  assert.deepEqual(t.onPop(base), { type: 'back', steps: 2 });      // depth 2 -> 0
  assert.equal(t.canStepBack(), false);
});

test('forward gesture after back is a resync, never a redo', () => {
  const t = mk();
  t.begin('dka', null);
  const [, p2] = [...t.sync(1), ...t.sync(2)].map(o => o.state);
  const p1 = { ...p2, mkDepth: 1 };
  t.onPop(p1);
  assert.deepEqual(t.onPop(p2), { type: 'resync', delta: -1 });
  assert.equal(t.depth, 1);
});

test('foreign-tree state and inactive tracker are ignored; malformed state is stale', () => {
  const t = mk();
  t.begin('dka', null);
  t.sync(2);
  assert.deepEqual(t.onPop({ mkTree: 'other', mkDepth: 0, mkSid: 'x' }), { type: 'ignore' });
  assert.equal(t.depth, 2);
  assert.deepEqual(t.onPop({ mkTree: 'dka', mkDepth: -3, mkSid: 'x' }), { type: 'skip' });
  assert.equal(t.depth, 2);
  const idle = mk();
  assert.deepEqual(idle.onPop({ mkTree: 'dka', mkDepth: 0, mkSid: 'x' }), { type: 'ignore' });
});

test('reset clears: shallower sync re-bases with a new sid and old entries go stale', () => {
  const t = mk();
  t.begin('dka', null);
  const old = [...t.sync(1), ...t.sync(2)].map(o => o.state);
  const ops = t.sync(0);
  assert.deepEqual(ops.map(o => o.type), ['replace']);
  assert.equal(ops[0].state.mkDepth, 0);
  assert.notEqual(ops[0].state.mkSid, old[0].mkSid);
  assert.equal(t.depth, 0);
  assert.equal(t.canStepBack(), false);
  assert.deepEqual(t.onPop(old[0]), { type: 'skip' });
});

test('undo after reset rebuilds the stack under the new sid', () => {
  const t = mk();
  t.begin('dka', null);
  t.sync(2);
  t.sync(0);
  const ops = t.sync(2);
  assert.deepEqual(ops.map(o => o.state.mkDepth), [1, 2]);
  assert.equal(new Set(ops.map(o => o.state.mkSid)).size, 1);
});

test('reload with no state stamps base then pushes the restored cards', () => {
  const t = mk();
  assert.deepEqual(t.begin('dka', undefined).map(o => o.type), ['replace']);
  assert.deepEqual(t.sync(3).map(o => o.state.mkDepth), [1, 2, 3]);
});

test('return on a stamped entry of the same tree is adopted; other tree is not', () => {
  const t = mk();
  assert.deepEqual(t.begin('dka', { mkTree: 'dka', mkDepth: 2, mkSid: 'abc' }), []);
  assert.equal(t.depth, 2);
  assert.deepEqual(t.sync(2), []);
  const u = mk();
  assert.equal(u.begin('dka', { mkTree: 'sepsis', mkDepth: 2, mkSid: 'abc' }).length, 1);
  assert.equal(u.depth, 0);
});

test('leave deactivates; disable falls back to direct back', () => {
  const t = mk();
  t.begin('dka', null);
  t.sync(1);
  t.disable();
  assert.equal(t.canStepBack(), false);
  t.leave();
  assert.equal(t.active, false);
});
