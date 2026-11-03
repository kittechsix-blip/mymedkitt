import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { TREE_REGISTRY } from './tree-registry.mjs';
const read = p => readFileSync(new URL('../'+p, import.meta.url),'utf8');
for (const id of ['chest-tube','thoracotomy-procedure','arterial-line']) {
  test(`${id}: bundled original app has assets, host updates and integrated sharing`, () => {
    const html = read(`docs/procedures/${id}/index.html`);
    assert(TREE_REGISTRY[id]);
    assert.match(html, /myMedKitt owns offline caching/);
    assert.doesNotMatch(html, /if\('serviceWorker' in navigator\)/);
    assert.doesNotMatch(html, /rel="manifest"/);
    assert(html.includes(`https://kittechsix-blip.github.io/mymedkitt/app.html#/tree/${id}`));
    for(const [,asset] of html.matchAll(/(?:src|href)="((?:images|icons)\/[^"$]+)"/g)) {
      assert(existsSync(new URL(`../docs/procedures/${id}/${asset}`,import.meta.url)),`${id}: missing ${asset}`);
    }
    assert(read('docs/sw.js').includes(`./procedures/${id}/index.html`));
  });
}
test('all three procedures open original screens without losing legacy node routes', () => {
 const app=read('src/app.ts');
 assert(app.includes('if (renderProcedureApp(main, id)) return;'));
 const nodeHandler=app.split('function handleTreeNode')[1].split('function handleBareNode')[0];
 assert(nodeHandler.includes('jumpToNodeId: nodeId'));
 assert(!nodeHandler.includes('renderProcedureApp'));
});
test('arterial line is linked from vascular access and shock consults', () => {
 for(const id of ['difficult-vascular-access','sepsis','cardiogenic-shock']) assert(read(`src/data/trees/${id}.ts`).includes('#/tree/arterial-line'));
});
