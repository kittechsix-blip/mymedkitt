import { test } from 'node:test';
import assert from 'node:assert/strict';
import { interpretHearingFork, HEARING_FORK_CALCULATOR } from '../src/components/hearing-fork.ts';

for (const side of ['right', 'left']) {
  const opposite = side === 'right' ? 'left' : 'right';
  test(`${side} conductive pattern needs agreement of all three findings`, () => {
    const input = { side, weber: side, right: 'air', left: 'air', [side]: 'bone' };
    assert.equal(interpretHearingFork(input).kind, 'conductive');
    assert.match(interpretHearingFork(input).title, new RegExp(side));
    assert.equal(interpretHearingFork({ ...input, [opposite]: 'bone' }).kind, 'inconclusive');
    assert.equal(interpretHearingFork({ ...input, weber: opposite }).kind, 'inconclusive');
  });
  test(`${side} SNHL pattern and profound SNHL false-negative Rinne trap`, () => {
    const input = { side, weber: opposite, right: 'air', left: 'air' };
    assert.equal(interpretHearingFork(input).kind, 'sensorineural');
    assert.match(interpretHearingFork(input).description, /urgent ENT/);
    const trap = interpretHearingFork({ ...input, [side]: 'bone' });
    assert.equal(trap.kind, 'inconclusive');
    assert.match(trap.description, /profound sensorineural/);
  });
}
test('missing values never classify hearing loss', () => {
  assert.equal(interpretHearingFork(null).kind, 'incomplete');
  assert.equal(interpretHearingFork(undefined).kind, 'incomplete');
  for (const key of ['side', 'weber', 'right', 'left']) {
    const input = { side: 'right', weber: 'left', right: 'air', left: 'air', [key]: '' };
    assert.equal(interpretHearingFork(input).kind, 'incomplete');
  }
});
test('midline, bilateral, uncertain and invalid values do not reassure', () => {
  const baseline = { side: 'right', weber: 'left', right: 'air', left: 'air' };
  for (const key of ['side', 'weber', 'right', 'left']) {
    for (const value of ['uncertain', 'garbage', 'NaN']) {
      assert.equal(interpretHearingFork({ ...baseline, [key]: value }).kind, 'inconclusive');
    }
  }
  assert.equal(interpretHearingFork({ ...baseline, weber: 'midline' }).kind, 'inconclusive');
});
test('exhaustive completed input space yields only two supported patterns per side', () => {
  for (const side of ['right', 'left']) {
    const counts = { conductive: 0, sensorineural: 0, inconclusive: 0, incomplete: 0 };
    for (const weber of ['right', 'left', 'midline', 'uncertain']) {
      for (const right of ['air', 'bone', 'uncertain']) {
        for (const left of ['air', 'bone', 'uncertain']) counts[interpretHearingFork({ side, weber, right, left }).kind]++;
      }
    }
    assert.deepEqual(counts, { conductive: 1, sensorineural: 1, inconclusive: 34, incomplete: 0 });
  }
});
test('tool is registered-ready with a custom renderer and no numerical score', () => {
  assert.equal(HEARING_FORK_CALCULATOR.id, 'hearing-fork');
  assert.equal(typeof HEARING_FORK_CALCULATOR.customRender, 'function');
  assert.equal(HEARING_FORK_CALCULATOR.computeResult, undefined);
  assert.deepEqual(HEARING_FORK_CALCULATOR.fields, []);
});
