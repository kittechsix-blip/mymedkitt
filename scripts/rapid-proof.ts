// Writes rapid-proof/index.html: every tile beside its sources, matched numbers marked.
// Local only (gitignored, outside docs/). Usage: node scripts/rapid-proof.ts
import { mkdirSync, writeFileSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, loadStrips, loadApprovals, makeCtx } from './lib/rapid-load.ts';

const V = await import(pathToFileURL(join(ROOT, 'src/services/rapid-verify.ts')).href);
const { stripHash, approvalBinding, approvalStatus, tileSources, tileExcerpts, findDose, flagIds, regimenPins, tokenize, tokenFound, nodeLines, normalizeExcerpt, excerptContext, RAPID_VERIFIER_VERSION } = V;

const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** POSIX single-quote a shell argument (apostrophes survive). */
const shq = (x: string): string => `'${x.replace(/'/g, `'\\''`)}'`;

/** Escape `text`, wrapping its numeric tokens that are (not) found in `corpus` in <mark>. */
function mark(text: string, corpus: any[]): string {
  const spans = (tokenize(text) as any[]).map((t) => ({ os: t.os, oe: t.oe, ok: tokenFound(t, corpus) }));
  let out = '';
  let at = 0;
  for (const s of spans.sort((a, b) => a.os - b.os)) {
    if (s.os < at) continue;
    out += esc(text.slice(at, s.os)) + `<mark class="${s.ok ? 'ok' : 'bad'}">${esc(text.slice(s.os, s.oe))}</mark>`;
    at = s.oe;
  }
  return out + esc(text.slice(at));
}

/** The card's own weight math (components/drug-store.ts calcDose / fmtNum). */
const fmtNum = (n: number): string => (n % 1 === 0 ? String(n) : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, ''));
function worked(wc: any): string {
  return [10, 70, 150].map((kg) => {
    const raw = wc.dailyDivided ? (kg * wc.dosePerKg) / wc.dailyDivided : kg * wc.dosePerKg;
    const capped = !!wc.maxDose && raw > wc.maxDose;
    const per = wc.dailyDivided ? `${fmtNum(wc.dosePerKg)} ${wc.unit}/kg/day / ${wc.dailyDivided}` : `${fmtNum(wc.dosePerKg)} ${wc.unit}/kg`;
    return `${kg} kg &rarr; <b>${esc(fmtNum(capped ? wc.maxDose : raw))} ${esc(wc.unit)}</b> (${esc(per)} &times; ${kg}${capped ? `, raw ${esc(fmtNum(raw))}, capped at max ${esc(fmtNum(wc.maxDose))}` : wc.maxDose ? `, under the ${esc(fmtNum(wc.maxDose))} cap` : ', no cap'})`;
  }).join('<br>');
}

/** `line` with the first occurrence of `part` highlighted. */
function markPart(line: string, part: string): string {
  const i = part ? line.indexOf(part) : -1;
  if (i < 0) return esc(line);
  return esc(line.slice(0, i)) + `<mark class="q">${esc(part)}</mark>` + esc(line.slice(i + part.length));
}

/** Review groups for the index (edit freely). Order of groups = order on the page; anything not listed is "Remaining". */
const REVIEW_GROUPS: { name: string; ids: string[] }[] = [
  { name: 'Review first', ids: ['sepsis', 'hypoglycemia', 'pea-arrest', 'pph', 'shoulder-dystocia', 'massive-hemoptysis', 'stemi', 'tca-toxidrome'] },
  { name: 'Pilot', ids: ['afib-rvr', 'refractory-vfvt', 'anaphylaxis'] },
];

const STATEMENT = 'Checked by machine: every expansion line is word-for-word text from a node the tile cites; every number on a tile face exists in its source; drug identity and weight math match the drug store. NOT checked by machine, and yours to judge: which tiles were chosen and what was left out, their order, the wording of any face, whether a quoted line still means the same thing outside its section, and whether the drug-store indication is the right one. Drug-wide contraindications and cautions, and lines of a cited node that are not quoted, are shown live from the drug store and consult and are not pinned by approval.';

const strips = await loadStrips();
const approvals = await loadApprovals();
let totalTokens = 0;
let totalExcerpts = 0;
let totalFail = 0;
interface StripRec { id: string; title: string; status: string; variants: number; tiles: number; hard: number; flags: number; findings: number; body: string }
const recs: StripRec[] = [];
const { DEFAULT_CATEGORIES } = await import(pathToFileURL(join(ROOT, 'src/data/categories.ts')).href);
const titleOf = (id: string): string => {
  for (const c of DEFAULT_CATEGORIES as any[]) for (const t of c.decisionTrees ?? []) if (t.id === id) return t.title;
  return id;
};

for (const [id, strip] of Object.entries(strips) as [string, any][]) {
  const { ctx, tree } = await makeCtx(id);
  const nodeById = new Map<string, any>(ctx.nodes.map((n: any) => [n.id, n]));
  const a = (approvals as any)[id];
  const st = approvalStatus(strip, ctx, a);
  const r = st.result;
  totalTokens += r.tokensChecked;
  totalExcerpts += r.excerptsChecked;
  totalFail += r.failures.length;
  const h = stripHash(strip);
  const status = st.status === 'draft' ? 'Draft (unapproved)' : st.status === 'live' ? 'Approved and live' : 'Approved but dropped: ' + st.reasons.join('; ');
  const fp = join(ROOT, `research/rapid/${id}.findings.json`);
  const findings: any[] = existsSync(fp) ? JSON.parse(readFileSync(fp, 'utf8')) : [];
  const pins = regimenPins(strip, ctx.getDrug);
  const cited = new Set<string>();
  for (const v of strip.variants) for (const t of v.tiles) for (const nid of t.nodeIds) cited.add(nid);

  const quotedAll = new Map<string, string[]>();
  for (const v of strip.variants) for (const t of v.tiles) for (const { ex } of tileExcerpts(t) as { ex: { nodeId: string; text: string } }[]) quotedAll.set(ex.nodeId, [...(quotedAll.get(ex.nodeId) ?? []), normalizeExcerpt(ex.text)]);
  const nodeShown = new Map<string, string>();
  const nodeBlock = (nid: string, tileLabel: string, primary: boolean): string => {
    const node = nodeById.get(nid);
    if (!node) return `<div class="src"><b>${esc(nid)}</b> (missing)</div>`;
    if (nodeShown.has(nid)) return `<div class="src"><b>${esc(nid)}</b> ${esc(node.title)} &mdash; full text printed once, under ${esc(nodeShown.get(nid) as string)}: <a href="#node-${esc(nid)}">jump</a></div>`;
    nodeShown.set(nid, tileLabel);
    const q = quotedAll.get(nid) ?? [];
    const lines = (nodeLines(node) as { text: string; skip: boolean; para: number }[]).map((l, i, arr) => {
      const part = q.find((x) => l.text.includes(x));
      return `${i > 0 && arr[i - 1].para !== l.para ? '<div class="pb"></div>' : ''}<div class="ln${part ? ' quoted' : ''}${l.skip ? ' skipped' : ''}">${part ? markPart(l.text, part) : esc(l.text)}${l.skip ? ' <small>(evidence line, not quotable)</small>' : ''}</div>`;
    }).join('');
    return `<details class="src" id="node-${esc(nid)}"><summary><b>${esc(nid)}</b> ${esc(node.title)}${primary ? ' <small>(primary)</small>' : ''} &mdash; whole node text, quoted parts marked (all tiles)</summary><div class="whole">${lines}</div></details>`;
  };

  // 1. status
  let html = `<section><h2>${esc(titleOf(id))} <code>${esc(id)}</code> <span class="st">${esc(status)}</span></h2>
<p class="${r.ok ? '' : 'bad'}"><b>Would show in production if approved: ${r.ok ? 'yes' : 'no (' + r.failures.length + ' hard failure' + (r.failures.length === 1 ? '' : 's') + ')'}</b><br>Flags to acknowledge: ${r.flags.length}${a && a.ackedFlags ? ' &middot; currently acknowledged: ' + a.ackedFlags.length : ''}</p>
<p class="meta">stripHash ${h}<br><a href="/app.html?rapid-preview=1#/tree/${encodeURIComponent(id)}/rapid">Preview on this device</a></p>`;
  for (const f of r.failures) html += `<p class="bad">${esc(f.message)}${f.nearest && f.nearest.length ? '<br><small>nearest: ' + esc(f.nearest.join(' | ')) + '</small>' : ''}</p>`;

  // 2. findings FIRST
  html += `<h3>Findings (read first)</h3>` + (findings.length ? '<ul>' + findings.map((f) => `<li><b>${esc(f.kind)}</b>${f.tileId ? ' [' + esc(f.tileId) + ']' : ''}${f.drugId ? ' (drug ' + esc(f.drugId) + ')' : ''}${f.nodeIds && f.nodeIds.length ? ' nodes: ' + esc(f.nodeIds.join(', ')) : ''}: ${esc(f.text)}</li>`).join('') + '</ul>' : '<p>None.</p>');

  // 3. the consult's full Critical-actions list
  html += `<h3>The consult's Critical actions (${tree.criticalActions.length})</h3><ol class="crit">` + tree.criticalActions.map((c: any) => `<li class="${cited.has(c.nodeId) ? 'on' : 'off'}"><b>${cited.has(c.nodeId) ? 'on strip' : 'not on strip'}</b> &middot; ${esc(c.text)} <code>${esc(c.nodeId)}</code></li>`).join('') + '</ol>';

  // 4. tiles
  for (const v of strip.variants) {
    html += `<h3>Pathway: ${esc(v.label)}</h3>`;
    v.tiles.forEach((tile: any, i: number) => {
      const srcs = tileSources(tile, ctx) as { nodeId: string; title: string; lines: string[] }[];
      const dose = tile.layout === 'drug' ? findDose(ctx.getDrug(tile.drug.id), tile.drug.indication) : undefined;
      const drug = tile.layout === 'drug' ? ctx.getDrug(tile.drug.id) : undefined;
      const corpusText = srcs.flatMap((s) => s.lines).join('\n') + '\n' + (dose ? dose.regimen : '');
      const corpus = tokenize(corpusText);
      const faceFields: [string, string | undefined][] = [['action', tile.action], ['figure', tile.figure], ['condition', tile.condition]];
      const face = faceFields.filter(([, t]) => t !== undefined).map(([n, t]) => `<div><b>${esc(n)}</b> ${mark(t as string, corpus)}</div>`).join('');
      const tflags = r.flags.filter((x: any) => x.tileId === tile.id);
      const need = tflags.map((x: any) => `<div class="flag"><b>FLAG ${esc(x.kind)}</b> <code>${esc(x.id)}</code><br>${esc(x.field)}: ${esc(x.text)}<pre>${esc(x.nearest.join('\n'))}</pre><pre class="ack">${esc('--ack ' + shq(x.id))}</pre></div>`).join('');
      const fails = r.failures.filter((x: any) => x.tileId === tile.id);
      const exs = tileExcerpts(tile) as { field: string; ex: { nodeId: string; text: string } }[];
      const exHtml = exs.map(({ field, ex }) => {
        const bad = fails.some((x: any) => x.field === field);
        const cx = excerptContext(ex, nodeById, exs.map((x) => x.ex));
        const node = nodeById.get(ex.nodeId);
        const body = cx
          ? `${cx.header ? `<div class="hdr">governing header: ${esc(cx.header)}</div>` : ''}<div class="full">${markPart(cx.full, normalizeExcerpt(ex.text))}</div>${cx.partial ? '<span class="tag">partial line</span>' : ''}${cx.reasons.length ? `<div class="why">${cx.reasons.map(esc).join('; ')}</div>` : ''}`
          : `<blockquote>${esc(ex.text)}</blockquote><div class="why">does not verify</div>`;
        return `<div class="ex${bad ? ' badex' : ''}"><b>${esc(field)}</b> from <code>${esc(ex.nodeId)}</code> ${esc(node ? node.title : '(unknown node)')}${body}</div>`;
      }).join('') || '<div class="ex">(no excerpts)</div>';
      const wholeNodes = tile.nodeIds.map((nid: string) => nodeBlock(nid, `tile ${i + 1} (${tile.action})`, nid === tile.nodeIds[0])).join('');
      let drugHtml = '';
      if (dose) {
        const others = (drug.dosing as any[]).filter((d) => d.indication !== tile.drug.indication).map((d) => d.indication);
        drugHtml = `<div class="src"><b>Regimen that will render (live drug store: ${esc(tile.drug.id)})</b> ${esc(tile.drug.indication)}<pre>${esc(dose.regimen)}</pre>pin ${esc(pins[tile.id] ?? '')}</div>
<details class="src"><summary>Drug-wide contraindications, cautions and the drug's other indications (rendered live, not pinned)</summary>
<b>Contraindications that will render (all uses)</b><pre>${esc((drug.contraindications ?? []).join('\n') || '(none)')}</pre>
<b>Cautions that will render (all uses)</b><pre>${esc((drug.cautions ?? []).join('\n') || '(none)')}</pre>
<b>The drug's other indications</b> (the one used is "${esc(tile.drug.indication)}"): ${others.length ? esc(others.join(' | ')) : '(none)'}</details>`;
        if (tile.drug.weightCalcs) drugHtml += `<div class="wc"><b>weightCalcs snapshot (${tile.drug.weightCalcs.length})</b>${tile.drug.weightCalcs.map((wc: any) => `<div class="wcrow"><code>${esc(JSON.stringify(wc))}</code><br>${worked(wc)}</div>`).join('')}</div>`;
      }
      html += `<div class="row${tflags.length ? ' flagged' : ''}"><div class="tile"><h4>${i + 1}. ${esc(tile.action)} <small>${esc(tile.layout)}</small></h4>${face}${need}<h5>Expansion lines (each in its full source line)</h5>${exHtml}${drugHtml}</div><div><h5>Whole cited node text (quoted parts marked)</h5>${wholeNodes}</div></div>`;
    });
  }

  // 5. approve command LAST
  const ids = flagIds(r);
  const binding = approvalBinding(strip, ctx.getDrug, r);
  html += `<h3>Approve (owner)</h3><p>Read each flag above before using this command.</p><p class="meta">--hash binds the approval to this strip, these regimens and this flag set (${esc(binding)}); anything that changes before you run it is refused.</p><pre class="cmd">${esc(`node scripts/rapid-approve.ts ${id} --hash ${binding}${ids.map((x: string) => ' \\\n  --ack ' + shq(x)).join('')}`)}</pre>`;
  recs.push({ id, title: titleOf(id), status: st.status === 'draft' ? 'draft' : st.status === 'live' ? 'approved+live' : 'approved-but-dropped', variants: strip.variants.length, tiles: strip.variants.reduce((n: number, v: any) => n + v.tiles.length, 0), hard: r.failures.length, flags: r.flags.length, findings: findings.length, body: html + '</section>' });
}

const CSS = `
body{font:16px/1.45 system-ui,sans-serif;background:#FAF4EB;color:#141414;margin:0;padding:16px;max-width:1300px;margin-inline:auto}
section{background:#fff;border:1px solid #E7D6C4;border-radius:6px;padding:16px;margin:16px 0}
.row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:16px;border-top:1px solid #E5E5E5;padding:12px 0}
@media(max-width:800px){.row{grid-template-columns:minmax(0,1fr)}}
section,code,pre,.cmd,.src,.whole,.full,blockquote,.flag,.wcrow,h2,h3,h4,p{overflow-wrap:anywhere}
summary{cursor:pointer;padding:6px 0}.pb{height:6px}.ack{background:#fff;border:1px dashed #d9b34a}.wcrow{margin:6px 0;font-size:14px}
pre{white-space:pre-wrap;font:13px/1.4 ui-monospace,monospace;background:#FAF4EB;padding:8px;border-radius:4px}.whole{background:#FAF4EB;border-radius:4px;padding:6px 8px;font:13px/1.4 ui-monospace,monospace}.ln{padding:1px 0}.ln.quoted{background:#fff6e0}.ln.skipped{color:#8a8a8a}mark.q{background:#f3d98a}.hdr{font-size:13px;color:#5E6A74;margin-top:4px}.full{font-size:14px;background:#FAF4EB;padding:6px 8px;border-radius:4px;margin:2px 0}.why{font-size:13px;color:#8B1A1A}.tag{display:inline-block;font-size:12px;color:#5E6A74;border:1px solid #E7D6C4;border-radius:3px;padding:0 6px;background:#fff}.crit li.off{color:#8B1A1A}.crit li.on{color:#1B6E1B}
div.flag{background:#fff6e0;border:1px solid #d9b34a;border-radius:4px;padding:6px;margin:6px 0;font-size:13px}.row.flagged{background:#fffaf0}.cmd{white-space:pre-wrap}mark.ok{background:#cfe9cf}mark.bad{background:#f6c7c7}.bad{color:#8B1A1A}.st{font-size:14px;color:#8A3324}.meta{font:12px ui-monospace,monospace;color:#5E6A74}
small{color:#5E6A74}.stmt{background:#fff;border:1px solid #E7D6C4;border-left:4px solid #8A3324;border-radius:4px;padding:10px 12px;font-weight:600}blockquote{margin:4px 0;padding:6px 10px;background:#FAF4EB;border-left:3px solid #8A3324;font-size:14px}.badex blockquote{border-left-color:#B22222;background:#FDF2F2}h5{margin:10px 0 4px}`;
const shell = (title: string, body: string): string => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><style>${CSS}
table{border-collapse:collapse;width:100%;font-size:14px}th,td{text-align:left;padding:6px 8px;border-top:1px solid #E5E5E5;vertical-align:top}th{font-size:12px;color:#5E6A74}
.tablewrap{overflow-x:auto;max-width:100%}.nav{display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;margin:8px 0}</style></head><body>${body}</body></html>`;

// ---- order: review group, then flag count ascending
const groupOf = (id: string): number => { const i = REVIEW_GROUPS.findIndex((g) => g.ids.includes(id)); return i < 0 ? REVIEW_GROUPS.length : i; };
recs.sort((a, b) => groupOf(a.id) - groupOf(b.id) || a.flags - b.flags || a.id.localeCompare(b.id));

mkdirSync(join(ROOT, 'rapid-proof'), { recursive: true });
recs.forEach((rec, i) => {
  const prev = recs[i - 1];
  const next = recs[i + 1];
  const nav = `<div class="nav"><a href="index.html">&larr; All strips</a>${prev ? `<a href="${esc(prev.id)}.html">&laquo; ${esc(prev.id)}</a>` : '<span></span>'}${next ? `<a href="${esc(next.id)}.html">${esc(next.id)} &raquo;</a>` : '<span></span>'}</div>`;
  writeFileSync(join(ROOT, `rapid-proof/${rec.id}.html`), shell(`RAPID proof: ${rec.id}`, `${nav}<p class="stmt">${esc(STATEMENT)}</p>${rec.body}${nav}`));
});

const parkedDir = join(ROOT, 'research/rapid/parked');
const parked = existsSync(parkedDir) ? readdirSync(parkedDir).filter((f) => f.endsWith('.ts.draft')).map((f) => f.slice(0, -'.ts.draft'.length)).sort() : [];
const rows = (g: number): string => recs.filter((x) => groupOf(x.id) === g).map((x) => `<tr><td>${esc(x.title)}</td><td><code>${esc(x.id)}</code></td><td>${esc(x.status)}</td><td>${x.variants}</td><td>${x.tiles}</td><td class="${x.hard ? 'bad' : ''}">${x.hard}</td><td>${x.flags}</td><td>${x.findings}</td><td><a href="/app.html?rapid-preview=1#/tree/${encodeURIComponent(x.id)}/rapid">Preview card</a></td><td><a href="${esc(x.id)}.html">Proof</a></td></tr>`).join('');
const groups = [...REVIEW_GROUPS.map((g) => g.name), 'Remaining'];
const tables = groups.map((name, g) => { const n = recs.filter((x) => groupOf(x.id) === g).length; return n ? `<h2>${esc(name)} (${n})</h2><div class="tablewrap"><table><tr><th>Consult</th><th>treeId</th><th>Status</th><th>Variants</th><th>Tiles</th><th>Hard failures</th><th>Flags</th><th>Findings</th><th>Card</th><th>Proof</th></tr>${rows(g)}</table></div>` : ''; }).join('');
const index = shell('RAPID proof (local only)', `<h1>RAPID proof</h1><p class="stmt">${esc(STATEMENT)}</p><p class="meta">Local only. Verifier v${RAPID_VERIFIER_VERSION} &middot; generated ${new Date().toISOString()} &middot; ${recs.length} strips &middot; ${totalTokens} face tokens &middot; ${totalExcerpts} excerpts checked &middot; ${totalFail} failures</p>${tables}<h2>Parked: not registered (${parked.length})</h2><p>${parked.length ? parked.map((x) => `<code>${esc(x)}</code>`).join(' ') : 'None.'}</p>`);
writeFileSync(join(ROOT, 'rapid-proof/index.html'), index);
console.log(`wrote rapid-proof/index.html and ${recs.length} strip pages`);
