import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PEA_ARREST_NODES, PEA_ARREST_CRITICAL_ACTIONS } from '../src/data/trees/pea-arrest.ts';
import { PNEUMOTHORAX_NODES, PNEUMOTHORAX_CRITICAL_ACTIONS } from '../src/data/trees/pneumothorax.ts';
import { RAPID_PEA_ARREST } from '../src/data/rapid/pea-arrest.ts';

test('pinned tension actions route to immediate lateral finger thoracostomy with no-delay fallback', () => {
  for (const [actions, nodes] of [[PEA_ARREST_CRITICAL_ACTIONS, PEA_ARREST_NODES], [PNEUMOTHORAX_CRITICAL_ACTIONS, PNEUMOTHORAX_NODES]] as const) {
    const action = actions.find(a => /finger thoracostomy/i.test(a.text))!;
    assert.ok(action);
    assert.match(action.text, /4th.*5th.*mid.axillary/i);
    assert.match(action.text, /trained/);
    assert.match(action.text, /needle.*delay/i);
    const node = nodes.find(n => n.id === action.nodeId)!;
    assert.ok(node);
    assert.match(node.body, /Do NOT wait for CXR or CT/);
    assert.match(node.body, /Absent lung sliding alone is not diagnostic/);
    assert.match(node.body, /Follow promptly with a chest drain/);
  }
});
test('rapid expansion keeps open technique before needle fallback heading', () => {
  const tile = RAPID_PEA_ARREST.variants[0].tiles.find(t => t.id === 'tension')!;
  const text = tile.lines!.map(l => l.text).join('\n');
  assert.ok(text.indexOf('finger sweep') < text.indexOf('NEEDLE: FALLBACK'));
  assert.match(text, /mid-axillary/);
  assert.match(tile.warning!.text, /Do not delay decompression for intubation/);
});
test('stable primary spontaneous pneumothorax aspiration remains a separate option', () => {
  const stable = PNEUMOTHORAX_NODES.filter(n => n.id !== 'needle-decompression');
  assert.ok(stable.some(n => /aspiration/i.test(n.body)));
});
