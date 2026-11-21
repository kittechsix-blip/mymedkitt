/**
 * Gate for the transplant consult PAGES (transplant-patient-ed tree, its info-page overlays, the CMV drug-store entries).
 * Reads compiled docs/ (run `bunx tsc` first). Each rule is a pure function over data; the real data must give no errors,
 * and every rule is proven able to fail by an in-memory mutation of a clone (never by editing the real files).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { imp, ROOT } from './lib/onc-checks.ts';

const tree = await imp('data/trees/transplant-patient-ed.js');
const tdseTree = await imp('data/trees/transplant-drug-side-effects.js');
const store = await imp('data/drug-store.js');
const infoMod = await imp('data/info-pages.js');
const tx = await imp('data/transplant-drugs/index.js');

interface Node { id: string; type: string; title: string; body: string; summary?: string; recommendation?: string }
interface CA { text: string; nodeId: string }
interface Drug { id: string; dosing: { indication: string; regimen: string }[] }
interface Info { id: string; sections: { heading?: string; body?: string }[] }
const clone = <T>(x: T): T => structuredClone(x);
const NODES: Node[] = tree.TRANSPLANT_PATIENT_ED_NODES;
const CAS: CA[] = tree.TRANSPLANT_PATIENT_ED_CRITICAL_ACTIONS;
const DRUGS: Drug[] = store.ALL_DRUGS;
const OVERLAYS: Record<string, Info> = Object.fromEntries(Object.entries(infoMod.INFO_PAGES as Record<string, Info>).filter(([k]) => k.startsWith('tpe-')));

// page -> { entry, final (the result node), nodes }
const PAGES: Record<string, { entry: string; final: string; prefix: string }> = {
  heart: { entry: 'tpe-heart', final: 'tpe-heart-dispo', prefix: 'tpe-heart' },
  liver: { entry: 'tpe-liver', final: 'tpe-liver-disposition', prefix: 'tpe-liver' },
  lung: { entry: 'tpe-lung', final: 'tpe-lung-dispo', prefix: 'tpe-lung' },
  kidney: { entry: 'tpe-kidney', final: 'tpe-kidney-dispo', prefix: 'tpe-kidney' },
  cmv: { entry: 'tpe-cmv', final: 'tpe-cmv-dispo', prefix: 'tpe-cmv' },
  bk: { entry: 'tpe-bk', final: 'tpe-bk-team', prefix: 'tpe-bk' },
  'cni-toxicity': { entry: 'tpe-cni-toxicity', final: 'tpe-cni-dispo', prefix: 'tpe-cni-' },
  'cni-hypertension': { entry: 'tpe-cni-hypertension', final: 'tpe-cni-htn-dispo', prefix: 'tpe-cni-htn' },
  cytopenia: { entry: 'tpe-cytopenia', final: 'tpe-cytopenia-dispo', prefix: 'tpe-cytopenia' },
};
const pageOfNode = (id: string): string | null => {
  if (id.startsWith('tpe-cni-htn') || id === 'tpe-cni-hypertension') return 'cni-hypertension';
  if (id.startsWith('tpe-cni-')) return 'cni-toxicity';
  for (const k of ['heart', 'liver', 'lung', 'kidney', 'cmv', 'bk', 'cytopenia']) if (id === `tpe-${k}` || id.startsWith(`tpe-${k}-`)) return k;
  return null;
};
const isPlaceholder = (n: Node): boolean => n.title.startsWith('[NOT WRITTEN]');

import { plainText as plain, countWords as words } from './lib/text-words.ts';

// ------------------------------------------------------------ (a) CMV dosing bands
const norm = (s: string): string => s.toLowerCase().replace(/haemodialysis/g, 'hemodialysis').replace(/\s+/g, ' ').trim();
const freq = (f: string): string => { const m = /^(?:every |q)(\d+) ?h$/.exec(f.trim()); return m ? `q${m[1]}h` : f.trim(); };
const rangeOf = (r: string): string => {
  const t = r.trim().replace(/ ml\/min/g, '');
  let m;
  if ((m = /^(\d+) or more$/.exec(t))) return `>=${m[1]}`;
  if ((m = /^(?:below|under) (\d+)$/.exec(t))) return `<${m[1]}`;
  if ((m = /^(\d+)(?:-| to )(\d+)$/.exec(t))) return `${m[1]}-${m[2]}`;
  return t;
};
/** "<range>: <dose> <freq>" segments after a marker; returns [range, dose, freq] */
function bands(text: string, marker: RegExp, doseRe: RegExp): string[][] {
  const t = norm(text); const m = marker.exec(t); if (!m) return [];
  const rest = t.slice(m.index + m[0].length).split(/\.\s|\(oral|; ?guideline|“/)[0];
  return rest.split(/\s*[;|]\s*/).map((seg) => {
    const k = /^([^:]+):\s*(.+)$/.exec(seg.trim()); if (!k) return [];
    const d = doseRe.exec(k[2]); if (!d) return [];
    return [rangeOf(k[1]), d[1], k[2].slice(d[0].length).replace(/^ ?/, '').trim()];
  }).filter((x) => x.length).map(([r, d, f]) => [r, d, /^three times a week|^3 times a week/.test(f) ? 'three times a week after hemodialysis' : freq(f)]);
}
const EXPECT_IV = [['>=70', '5.0 mg/kg', 'q12h'], ['50-69', '2.5 mg/kg', 'q12h'], ['25-49', '2.5 mg/kg', 'q24h'], ['10-24', '1.25 mg/kg', 'q24h'], ['<10', '1.25 mg/kg', 'three times a week after hemodialysis']];
const EXPECT_PO = [['>=60', '900 mg', 'q12h'], ['40-59', '450 mg', 'q12h'], ['25-39', '450 mg', 'q24h'], ['10-24', '450 mg', 'q48h'], ['<10', '200 mg', 'three times a week after hemodialysis']];
const IV_RE = /(\d+(?:\.\d+)? mg\/kg)/; const PO_RE = /(\d+ mg)/;
function checkBands(drugs: Drug[], info: Record<string, Info>): string[] {
  const errs: string[] = [];
  const reg = (id: string): string => drugs.find((d) => d.id === id)?.dosing.map((x) => x.regimen).join(' ') ?? '';
  const eq = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);
  const iv = bands(reg('ganciclovir'), /treatment dose by creatinine clearance: /, IV_RE);
  const po = bands(reg('valganciclovir'), /treatment dose by creatinine clearance: /, PO_RE);
  if (!eq(iv, EXPECT_IV)) errs.push(`BANDS: ganciclovir entry bands ${JSON.stringify(iv)}`);
  if (!eq(po, EXPECT_PO)) errs.push(`BANDS: valganciclovir entry bands ${JSON.stringify(po)}`);
  const page = info['tpe-cmv-dosing'];
  const body = page ? page.sections.map((s) => s.body ?? '').join('\n') : '';
  const lines = body.split('\n').filter((l) => l.trim());
  const ivLine = lines.find((l) => /ganciclovir, treatment dose by crcl/i.test(l) && !/oral/i.test(l)) ?? '';
  const poLine = lines.find((l) => /oral valganciclovir, treatment dose by crcl/i.test(l)) ?? '';
  const ivI = bands(ivLine.replace(/\*\*/g, ''), /treatment dose by crcl: /, IV_RE);
  const poI = bands(poLine.replace(/\*\*/g, ''), /treatment dose by crcl: /, PO_RE);
  if (!eq(ivI, EXPECT_IV)) errs.push(`BANDS: tpe-cmv-dosing IV bands ${JSON.stringify(ivI)}`);
  if (!eq(poI, EXPECT_PO)) errs.push(`BANDS: tpe-cmv-dosing oral bands ${JSON.stringify(poI)}`);
  return errs;
}

// ------------------------------------------------------------ (b) word counts, (c) critical actions
const checkNodeWords = (nodes: Node[], max = 180): string[] => nodes.filter((n) => !isPlaceholder(n) && words(n.body) > max).map((n) => `WORDS: ${n.id} body has ${words(n.body)} words (max ${max})`);
/** NAMED EXCEPTION (owner decision): an approved editor note is fixed owner text and is never trimmed, so a critical action whose WHOLE text is exactly one note on the approved list is exempt from the word limit. Nothing else is. */
const isApprovedNoteAction = (c: CA, approved: string[] = APPROVED_NOTES_LIST): boolean => approved.includes(c.text.trim());
const checkCaWords = (cas: CA[], max = 25, approved: string[] = APPROVED_NOTES_LIST): string[] => cas.filter((c) => !isApprovedNoteAction(c, approved) && words(c.text) > max).map((c) => `CA-WORDS: critical action for ${c.nodeId} has ${words(c.text)} words (max ${max})`);
const APPROVED_NOTES_LIST: string[] = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'fixtures', 'transplant-approved-editor-notes.json'), 'utf8'));

// ------------------------------------------------------------ (d) call-the-team sentence
const CALL = 'Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.';
const count = (s: string, sub: string): number => (s.match(new RegExp(sub.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) ?? []).length;
function checkCall(nodes: Node[], cas: CA[]): string[] {
  const errs: string[] = [];
  for (const [k, p] of Object.entries(PAGES)) {
    const entry = nodes.find((n) => n.id === p.entry);
    if (!entry || !plain(entry.body).includes(plain(CALL))) errs.push(`CALL: entry node ${p.entry} lacks the sentence`);
    const n = cas.filter((c) => pageOfNode(c.nodeId) === k && plain(c.text).includes(plain(CALL))).length;
    if (n !== 1) errs.push(`CALL: page ${k} has ${n} critical action(s) with the sentence (need exactly 1)`);
  }
  return errs;
}

// ------------------------------------------------------------ (e) final-node ending
const END = 'Editor note: disposition is decided with the treating transplant team.';
const stripEnd = (s: string): string => s.replace(/[\s*]+$/, '');
function checkEnd(nodes: Node[]): string[] {
  const errs: string[] = [];
  for (const p of Object.values(PAGES)) {
    const n = nodes.find((x) => x.id === p.final);
    if (!n) { errs.push(`END: final node ${p.final} missing`); continue; }
    if (!stripEnd(n.body).endsWith(END)) errs.push(`END: ${p.final} body does not end with the disposition sentence`);
    if (!stripEnd(n.recommendation ?? '').endsWith(END)) errs.push(`END: ${p.final} recommendation does not end with the disposition sentence`);
  }
  return errs;
}

// ------------------------------------------------------------ (f) the word "dreaded"
const walk = (v: unknown, out: string[]): void => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => walk(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => walk(x, out)); };
function checkDreaded(parts: Record<string, unknown>): string[] {
  const errs: string[] = [];
  for (const [name, v] of Object.entries(parts)) { const s: string[] = []; walk(v, s); if (s.some((x) => /dreaded/i.test(x))) errs.push(`DREADED: "dreaded" appears in ${name}`); }
  return errs;
}
const dreadParts = (): Record<string, unknown> => ({ 'transplant-patient-ed': NODES, 'transplant-patient-ed critical actions': CAS, 'transplant-drug-side-effects': tdseTree.TRANSPLANT_DRUG_SIDE_EFFECTS_NODES, overlays: OVERLAYS, 'transplant drug data': tx.TX_DATA, 'cmv drug-store entries': DRUGS.filter((d) => d.id === 'ganciclovir' || d.id === 'valganciclovir') });

// ------------------------------------------------------------ summaries, editor notes, reachability, links (new checks)
const SUMMARY_MAX = 30;
const nodeTexts = (n: Node & { citation?: number[] }): string[] => [n.body, n.summary ?? '', n.recommendation ?? ''];
function checkSummaries(nodes: Node[], max = SUMMARY_MAX): string[] {
  const errs: string[] = [];
  for (const n of nodes) {
    if (isPlaceholder(n) || !n.summary) continue;
    const w = plain(n.summary).split(/\s+/).filter(Boolean).length;
    if (w > max) errs.push(`SUMMARY: ${n.id} summary has ${w} words (max ${max})`);
    if (/["\u201c\u201d]/.test(n.summary)) errs.push(`SUMMARY: ${n.id} summary contains a quotation mark`);
  }
  return errs;
}
/** every "Editor note:" sentence (to the end of its line) found in node text, critical actions and overlays */
function editorNotes(nodes: Node[], cas: CA[], overlays: Record<string, Info>): string[] {
  const out = new Set<string>();
  const scan = (t: string): void => { for (const line of t.replace(/\*\*/g, '').split('\n')) { const m = /Editor note:.*?\.(?=\s|$)/.exec(line); if (m) out.add(m[0].trim()); } };
  for (const n of nodes) nodeTexts(n).forEach(scan);
  for (const c of cas) scan(c.text);
  for (const o of Object.values(overlays)) for (const sec of o.sections) { scan(sec.body ?? ''); }
  return [...out].sort();
}
const APPROVED: string[] = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'fixtures', 'transplant-approved-editor-notes.json'), 'utf8'));
function checkNotes(found: string[], approved: string[] = APPROVED): string[] { const a = new Set(approved); return found.filter((x) => !a.has(x)).map((x) => `NOTES: not on the approved list: "${x.slice(0, 80)}"`); }
/** every node of a page reaches the page's disposition node, and the only leaves are disposition nodes */
function checkReach(nodes: Node[]): string[] {
  const errs: string[] = [];
  const byId = new Map((nodes as (Node & { next?: string; options?: { next: string }[] })[]).map((n) => [n.id, n]));
  for (const [k, p] of Object.entries(PAGES)) {
    const members = nodes.filter((n) => pageOfNode(n.id) === k);
    const reach = (from: string, seen = new Set<string>()): boolean => {
      if (from === p.final) return true; if (seen.has(from)) return false; seen.add(from);
      const n = byId.get(from); if (!n) return false;
      return [n.next, ...(n.options ?? []).map((o) => o.next)].filter(Boolean).some((x) => reach(x as string, seen));
    };
    for (const n of members) {
      if (!reach(n.id)) errs.push(`REACH: ${n.id} cannot reach ${p.final}`);
      const out = [n.next, ...(n.options ?? []).map((o) => o.next)].filter(Boolean);
      if (!out.length && n.id !== p.final) errs.push(`REACH: leaf ${n.id} is not the page's disposition node ${p.final}`);
    }
    const entryReach = new Set<string>(); const walkAll = (id: string): void => { if (entryReach.has(id)) return; entryReach.add(id); const n = byId.get(id); [n?.next, ...(n?.options ?? []).map((o) => o.next)].filter(Boolean).forEach((x) => walkAll(x as string)); };
    walkAll(p.entry);
    for (const n of members) if (!entryReach.has(n.id)) errs.push(`REACH: ${n.id} is not reachable from the page entry ${p.entry}`);
  }
  return errs;
}
/** all #/info, #/tree, #/drug links in nodes, critical actions and overlays resolve (registry data passed in) */
function checkLinks(nodes: Node[], overlays: Record<string, Info>, allInfo: Record<string, unknown>, drugIds: Set<string>, treeIds: Set<string>): string[] {
  const errs: string[] = []; const texts: [string, string][] = [];
  for (const n of nodes) nodeTexts(n).forEach((t) => texts.push([n.id, t]));
  for (const [id, o] of Object.entries(overlays)) for (const sec of o.sections) texts.push([id, sec.body ?? '']);
  for (const [where, t] of texts) for (const m of t.matchAll(/\(#\/(info|tree|drug)\/([^)\s/]+)/g)) {
    if (m[1] === 'info' && !allInfo[m[2]]) errs.push(`LINK: ${where} -> #/info/${m[2]} not registered`);
    if (m[1] === 'drug' && !drugIds.has(m[2])) errs.push(`LINK: ${where} -> #/drug/${m[2]} not in the drug store`);
    if (m[1] === 'tree' && !treeIds.has(m[2])) errs.push(`LINK: ${where} -> #/tree/${m[2]} not a consult`);
  }
  return errs;
}
const cats = await imp('data/categories.js');
const TREE_IDS = new Set<string>(); for (const c of cats.getAllCategories()) for (const t of c.decisionTrees) TREE_IDS.add(t.id);
const DRUG_IDS = new Set(DRUGS.map((d) => d.id));

/** REPORT ONLY: sentences where "(call the transplant team first)" follows a clause naming a treatment, with no "; also" boundary in between */
const PAREN = '(call the transplant team first)';
const TREATMENT = /\b(antibiotic|antimicrobial|antiviral|antifungal|ganciclovir|valganciclovir|acyclovir|letermovir|maribavir|foscarnet|vancomycin|cefepime|piperacillin|meropenem|ceftriaxone|methylprednisolone|prednisone|prednisolone|steroid|pulse|thymoglobulin|ATG|rituximab|IVIG|immunoglobulin|plasma exchange|plasmapheresis|eculizumab|bortezomib|treat(?:ed|ment)?|therapy|start(?:ing)?|give|given|add(?:ing)?|commence)\b/i;
function parenthetical(nodes: Node[], cas: CA[]): string[] {
  const out: string[] = [];
  const scan = (where: string, t: string): void => {
    for (const sentence of plain(t).split(/(?<=[.!?])\s+|\n/)) {
      let from = 0; let i: number;
      while ((i = sentence.indexOf(PAREN, from)) >= 0) {
        const before = sentence.slice(0, i); const cut = before.lastIndexOf('; also'); const clause = cut >= 0 ? before.slice(cut + 6) : before;
        if (TREATMENT.test(clause)) out.push(`${where}: ${sentence.trim().slice(0, 220)}`);
        from = i + PAREN.length;
      }
    }
  };
  for (const n of nodes) { if (n.summary) scan(`summary ${n.id}`, n.summary); }
  for (const c of cas) scan(`critical action ${c.nodeId}`, c.text);
  return [...new Set(out)];
}

// ------------------------------------------------------------ citation numbering (inline markers must point at the right document)
const CITES: { num: number; text: string }[] = tree.TRANSPLANT_PATIENT_ED_CITATIONS;
const MARK = /\[(\d+(?:\s*,\s*\d+)*)\]/g;
/** every number in every inline marker, in order: "[1][3]" and "[1, 4, 9]" both count */
const inlineNums = (t: string): number[] => [...t.matchAll(MARK)].flatMap((m) => m[1].split(',').map((x) => Number(x.trim())));
type FNode = Node & { citation?: number[]; options?: { label?: string; description?: string }[] };
const fieldsOf = (n: FNode): [string, string][] => [['body', n.body ?? ''], ['summary', n.summary ?? ''], ['recommendation', n.recommendation ?? ''], ...(n.options ?? []).flatMap((o, i) => [[`options[${i}].label`, o.label ?? ''], [`options[${i}].description`, o.description ?? '']] as [string, string][])];
/** CITE-NODE: every inline number is in the node's own citation array; every citation member exists in the tree list. CITE-OVERLAY: every overlay inline number exists in that overlay's own list. */
function checkCitations(nodes: FNode[], cites: { num: number }[], cas: CA[], overlays: Record<string, Info & { citations: { num: number }[] }>): string[] {
  const errs: string[] = []; const have = new Set(cites.map((c) => c.num));
  for (const n of nodes) {
    const own = new Set(n.citation ?? []);
    for (const c of own) if (!have.has(c)) errs.push(`CITE-NODE: ${n.id} cites [${c}], which is not in the tree citation list`);
    for (const [f, t] of fieldsOf(n)) for (const x of inlineNums(t)) if (!own.has(x)) errs.push(`CITE-NODE: ${n.id}.${f} has inline [${x}], not in the node's citation array [${[...own].join(',')}]`);
  }
  for (const c of cas) for (const x of inlineNums(c.text)) if (!have.has(x)) errs.push(`CITE-NODE: critical action for ${c.nodeId} has inline [${x}], not in the tree citation list`);
  for (const [id, o] of Object.entries(overlays)) {
    const own = new Set(o.citations.map((c) => c.num));
    for (const sec of o.sections) for (const x of inlineNums(`${sec.heading ?? ''}\n${sec.body ?? ''}`)) if (!own.has(x)) errs.push(`CITE-OVERLAY: ${id} has inline [${x}], not in its own citation list`);
  }
  return errs;
}
const PAGE_FILES: string[] = ['heart', 'liver', 'lung', 'kidney', 'cmv', 'bk', 'cni-toxicity', 'cni-hypertension', 'cytopenia'];
const DRAFTS: Record<string, { NODES: FNode[]; CRITICAL_ACTIONS: CA[]; CITATIONS: { num: number; text: string }[] }> = {};
for (const p of PAGE_FILES) DRAFTS[p] = await import(pathToFileURL(path.join(ROOT, 'research', 'transplant-sources', 'drafts', `tpe-${p}.nodes.ts`)).href);
const strip = (t: string): string => t.replace(MARK, '');
/** CITE-CONTENT: for every field, the document each inline marker resolves to in the built tree equals the document it resolved to in the draft (compared by text), in order; the rest of the text is identical */
function checkRemapContent(nodes: FNode[], cas: CA[], cites: { num: number; text: string }[], drafts = DRAFTS): string[] {
  const errs: string[] = []; const built = new Map(cites.map((c) => [c.num, c.text])); const byId = new Map(nodes.map((n) => [n.id, n]));
  const res = (t: string, by: Map<number, string>): string[] => inlineNums(t).map((x) => by.get(x) ?? `<<unknown ${x}>>`);
  for (const [page, d] of Object.entries(drafts)) {
    const dby = new Map(d.CITATIONS.map((c) => [c.num, c.text]));
    for (const dn of d.NODES) {
      const bn = byId.get(dn.id); if (!bn) { errs.push(`CITE-CONTENT: ${dn.id} (${page}) missing from the tree`); continue; }
      const bf = new Map(fieldsOf(bn));
      for (const [f, t] of fieldsOf(dn)) {
        const b = bf.get(f) ?? '';
        if (strip(t) !== strip(b)) errs.push(`CITE-CONTENT: ${dn.id}.${f} text differs from the draft`);
        if (JSON.stringify(res(t, dby)) !== JSON.stringify(res(b, built))) errs.push(`CITE-CONTENT: ${dn.id}.${f} inline markers resolve to different documents than in the draft`);
      }
      const dres = (dn.citation ?? []).map((x) => dby.get(x)).sort(); const bres = (bn.citation ?? []).map((x) => built.get(x)).sort();
      if (JSON.stringify(dres) !== JSON.stringify(bres)) errs.push(`CITE-CONTENT: ${dn.id}.citation resolves to different documents than in the draft`);
    }
    for (const dc of d.CRITICAL_ACTIONS) {
      const bc = cas.find((c) => c.nodeId === dc.nodeId && strip(c.text) === strip(dc.text));
      if (!bc) { errs.push(`CITE-CONTENT: critical action for ${dc.nodeId} ("${strip(dc.text).slice(0, 40)}") missing or reworded in the tree`); continue; }
      if (JSON.stringify(res(dc.text, dby)) !== JSON.stringify(res(bc.text, built))) errs.push(`CITE-CONTENT: critical action for ${dc.nodeId} resolves to different documents than in the draft`);
    }
  }
  return errs;
}

// ------------------------------------------------------------ real data
test('real: ganciclovir and valganciclovir entries and the tpe-cmv-dosing page carry exactly the verified treatment bands', () => { assert.deepEqual(checkBands(DRUGS, OVERLAYS), []); });
test('real: every non-placeholder node body is 180 words or fewer', () => { const e = checkNodeWords(NODES); assert.deepEqual(e, [], e.join('\n')); });
test('real: every critical action is 25 words or fewer', () => { const e = checkCaWords(CAS); assert.deepEqual(e, [], e.join('\n')); });
test('real: the call-the-transplant-team sentence is in every page entry node and once in each page\'s critical actions', () => { assert.deepEqual(checkCall(NODES, CAS), []); });
test('real: the final node of every page ends, in body and recommendation, with the disposition sentence', () => { assert.deepEqual(checkEnd(NODES), []); });
test('real: "dreaded" appears nowhere in the transplant consults, overlays or drug data', () => { assert.deepEqual(checkDreaded(dreadParts()), []); });
test('real: the checks look at something (9 pages, 42 overlays, 5 cards)', () => {
  assert.equal(Object.keys(PAGES).length, 9);
  assert.equal(Object.keys(OVERLAYS).length, 42);
  assert.equal(tx.TX_DATA.drugs.length >= 5, true);
  assert.ok(NODES.filter((n) => !isPlaceholder(n)).length >= 56);
});

// ------------------------------------------------------------ each rule can fail (in-memory mutation of a clone)
test('break (a): a changed band in the drug entry, in the info page, or a missing entry goes red', () => {
  const d1 = clone(DRUGS); d1.find((d) => d.id === 'ganciclovir')!.dosing[0].regimen = d1.find((d) => d.id === 'ganciclovir')!.dosing[0].regimen.replace('50-69: 2.5 mg/kg every 12 h', '50-69: 2.5 mg/kg every 8 h');
  assert.ok(checkBands(d1, OVERLAYS).some((x) => x.includes('ganciclovir entry')));
  const d2 = clone(DRUGS); d2.find((d) => d.id === 'valganciclovir')!.dosing[0].regimen = d2.find((d) => d.id === 'valganciclovir')!.dosing[0].regimen.replace('200 mg three times', '400 mg three times');
  assert.ok(checkBands(d2, OVERLAYS).some((x) => x.includes('valganciclovir entry')));
  const o = clone(OVERLAYS); o['tpe-cmv-dosing'].sections.forEach((s) => { s.body = s.body?.replace('450 mg q48h', '450 mg q72h'); });
  assert.ok(checkBands(DRUGS, o).some((x) => x.includes('tpe-cmv-dosing oral')));
  assert.ok(checkBands(DRUGS.filter((d) => d.id !== 'ganciclovir'), OVERLAYS).length > 0);
});
test('break (b): a 181-word body goes red, a placeholder is exempt, 180 passes', () => {
  const ok = NODES.filter((x) => words(x.body) <= 180);
  const n = clone(ok); n.find((x) => x.id === 'tpe-bk')!.body = Array(181).fill('word').join(' ');
  assert.ok(checkNodeWords(n).some((x) => x.includes('tpe-bk')));
  const m = clone(ok); m.push({ id: 'tpe-zz', type: 'info', title: '[NOT WRITTEN] synthetic', body: Array(300).fill('word').join(' ') } as Node);
  assert.deepEqual(checkNodeWords(m), []);
  const edge = clone(ok); edge.find((x) => x.id === 'tpe-bk')!.body = Array(180).fill('word').join(' ');
  assert.deepEqual(checkNodeWords(edge), [], '180 exactly passes');
});
test('break (c): a 26-word non-note critical action fails; an approved note over 25 words is exempt only when the whole text is exactly the note', () => {
  const c = clone(CAS).filter((x) => words(x.text) <= 25 || isApprovedNoteAction(x)); c[0].text = Array(26).fill('word').join(' ');
  assert.ok(checkCaWords(c).length > 0);
  c[0].text = Array(25).fill('word').join(' '); assert.deepEqual(checkCaWords(c), []);
  const long = APPROVED_NOTES_LIST.find((n) => words(n) > 25);
  assert.ok(long, 'the approved list has a note longer than 25 words');
  assert.deepEqual(checkCaWords([{ text: long!, nodeId: 'x' }]), [], 'exact approved note: exempt');
  assert.ok(checkCaWords([{ text: `${long!} extra`, nodeId: 'x' }]).length > 0, 'the note plus a word is not exempt');
  assert.ok(checkCaWords([{ text: long!.replace('Editor note:', 'Editor notes:'), nodeId: 'x' }]).length > 0, 'a reworded note is not exempt');
  assert.ok(checkCaWords([{ text: long!, nodeId: 'x' }], 25, []).length > 0, 'with no approved list it fails');
});
test('break (d): the sentence missing from an entry node, or duplicated or absent in critical actions, goes red', () => {
  const n = clone(NODES); const e = n.find((x) => x.id === 'tpe-lung')!; e.body = e.body.replace('call the transplant team', 'phone the transplant team');
  assert.ok(checkCall(n, CAS).some((x) => x.includes('tpe-lung')));
  const c1 = clone(CAS).filter((x) => !(pageOfNode(x.nodeId) === 'cmv' && x.text.includes('call the transplant team')));
  assert.ok(checkCall(NODES, c1).some((x) => x.includes('page cmv has 0')));
  const c2 = clone(CAS); const dup = c2.find((x) => pageOfNode(x.nodeId) === 'bk' && x.text.includes('call the transplant team'))!; c2.push({ ...dup });
  assert.ok(checkCall(NODES, c2).some((x) => x.includes('page bk has 2')));
});
test('break (e): a body or recommendation that does not end with the disposition sentence goes red', () => {
  const n = clone(NODES); const f = n.find((x) => x.id === 'tpe-cni-dispo')!; f.body = f.body + ' Extra.';
  assert.ok(checkEnd(n).some((x) => x.includes('tpe-cni-dispo body')));
  const m = clone(NODES); m.find((x) => x.id === 'tpe-heart-dispo')!.recommendation = 'No ending sentence.';
  assert.ok(checkEnd(m).some((x) => x.includes('tpe-heart-dispo recommendation')));
});
test('break (f): "dreaded" planted in a node, an overlay, the drug data or a drug-store entry goes red', () => {
  for (const key of ['transplant-patient-ed', 'overlays', 'transplant drug data', 'cmv drug-store entries', 'transplant-drug-side-effects'] as const) {
    const parts = clone(dreadParts()) as Record<string, unknown>;
    const s: string[] = []; walk(parts[key], s);
    const plant = (v: unknown): boolean => { if (Array.isArray(v)) { for (const x of v) if (plant(x)) return true; } else if (v && typeof v === 'object') { for (const [k, x] of Object.entries(v)) { if (typeof x === 'string') { (v as Record<string, unknown>)[k] = x + ' dreaded'; return true; } if (plant(x)) return true; } } return false; };
    assert.ok(plant(parts[key]), `could not plant in ${key}`);
    assert.ok(checkDreaded(parts).some((x) => x.includes(key)), `not caught in ${key}`);
  }
});

test('real: every summary is 30 words or fewer with no quotation mark', () => { const e = checkSummaries(NODES); assert.deepEqual(e, [], e.join('\n')); });
test('real: every Editor note in the tree, critical actions and overlays is on the fixed approved list', () => { const f = editorNotes(NODES, CAS, OVERLAYS); assert.ok(f.length >= 9, `found ${f.length}`); const e = checkNotes(f); assert.deepEqual(e, [], e.join('\n')); });
test('real: every node reaches its page disposition node; the only leaves are disposition nodes; every node is reachable from its entry', () => { const e = checkReach(NODES); assert.deepEqual(e, [], e.join('\n')); });
test('real: every #/info, #/tree and #/drug link in the nodes and overlays resolves', () => { const e = checkLinks(NODES, OVERLAYS, infoMod.INFO_PAGES, DRUG_IDS, TREE_IDS); assert.deepEqual(e, [], e.join('\n')); });
test('report: "(call the transplant team first)" after a clause naming a treatment (listed, never failed)', (t) => {
  const list = parenthetical(NODES, CAS);
  fs.writeFileSync(path.join(ROOT, '.transplant-baseline', 'paren-list.txt'), list.join('\n') + '\n');
  t.diagnostic(`${list.length} sentence(s):\n${list.join('\n')}`);
  assert.ok(Array.isArray(list));
});
test('break: summary, notes, reach, links and the parenthetical report can all see a planted fault', () => {
  const n = clone(NODES); n.find((x) => x.id === 'tpe-bk')!.summary = Array(31).fill('word').join(' ');
  assert.ok(checkSummaries(n).some((x) => x.includes('31 words')));
  n.find((x) => x.id === 'tpe-bk-test')!.summary = 'He said "stop" now'; assert.ok(checkSummaries(n).some((x) => x.includes('quotation mark')));
  const cas = clone(CAS); cas[0].text = 'Editor note: do something new.';
  assert.ok(checkNotes(editorNotes(NODES, cas, OVERLAYS)).some((x) => x.includes('do something new')));
  const m = clone(NODES) as (Node & { next?: string })[]; m.find((x) => x.id === 'tpe-heart-brady')!.next = 'tpe-heart-brady';
  assert.ok(checkReach(m).some((x) => x.includes('tpe-heart-brady')));
  const o = clone(OVERLAYS); o['tpe-cmv-dosing'].sections[0].body += ' [x](#/info/no-such-overlay)';
  assert.ok(checkLinks(NODES, o, infoMod.INFO_PAGES, DRUG_IDS, TREE_IDS).some((x) => x.includes('no-such-overlay')));
  const c = clone(CAS); c.push({ text: 'Give ganciclovir now (call the transplant team first).', nodeId: 'tpe-cmv' });
  assert.ok(parenthetical(NODES, c).some((x) => x.includes('ganciclovir')));
  c[c.length - 1].text = 'Give ganciclovir now; also hold tacrolimus (call the transplant team first).';
  assert.ok(!parenthetical(NODES, c).some((x) => x.includes('Give ganciclovir now; also')), 'a "; also" boundary clears it');
});

test('real: every inline citation number is in its node\'s citation array, every overlay marker is in its own list, every citation member exists (CITE-NODE, CITE-OVERLAY)', () => { const e = checkCitations(NODES, CITES, CAS, OVERLAYS as never); assert.deepEqual(e, [], `${e.length} problem(s):\n${e.slice(0, 25).join('\n')}`); });
test('real: every inline marker resolves to the same document text as in its draft (CITE-CONTENT)', () => { const e = checkRemapContent(NODES, CAS, CITES); assert.deepEqual(e, [], `${e.length} problem(s):\n${e.slice(0, 25).join('\n')}`); });
test('break CITE: a draft-local number left in a comma list, a swapped citation text and an overlay marker with no entry all fail', () => {
  const n = clone(NODES) as FNode[]; const e = n.find((x) => x.id === 'tpe-cmv-safety')!; e.body = (e.body ?? '') + ' [1,3,4]';
  assert.ok(checkCitations(n, CITES, CAS, OVERLAYS as never).some((x) => x.includes('tpe-cmv-safety.body') && x.includes('inline [1]')));
  const c = clone(CITES); const t0 = c[0].text; c[0].text = c[1].text; c[1].text = t0;
  assert.ok(checkRemapContent(NODES, CAS, c).some((x) => x.includes('resolve to different documents')));
  const m = clone(NODES) as FNode[]; const f = m.find((x) => x.id === 'tpe-cni-toxicity')!; f.body = f.body.replace(/\[(\d+)\]/, '[1]'); 
  assert.ok(checkRemapContent(m, CAS, CITES).length > 0, 'a marker changed to a draft-local number');
  const o = clone(OVERLAYS) as Record<string, Info & { citations: { num: number }[] }>; o['tpe-bk-definitions'].sections[0].body += ' [999]';
  assert.ok(checkCitations(NODES as FNode[], CITES, CAS, o).some((x) => x.includes('CITE-OVERLAY') && x.includes('999')));
  const g = clone(NODES) as FNode[]; g.find((x) => x.id === 'tpe-bk')!.citation = [9999]; assert.ok(checkCitations(g, CITES, CAS, OVERLAYS as never).some((x) => x.includes('9999')));
});
test('word counter: every citation marker form is stripped, other text is counted', () => {
  assert.equal(words('one [1] two [1,2] three [20, 21, 22] four'), 4);
  assert.equal(words('a [1][3] b [1, 4, 9][2] c'), 3);
  assert.equal(words('[a](#/info/x) **bold** [12]'), 2);
  assert.equal(words('two words [x]'), 3, 'a non-numeric bracket is text');
});

// ------------------------------------------------------------ Stop pages (both transplant consults)
const STOP_IDS = ['transplant-patient-ed-stop', 'transplant-drug-side-effects-stop'];
const STOPS: Record<string, Info> = Object.fromEntries(STOP_IDS.map((id) => [id, (infoMod.INFO_PAGES as Record<string, Info>)[id]]));
const TDSE_ID_SET = new Set<string>(tx.TX_DATA.drugs.map((d: { id: string }) => d.id));
const NODE_ID_SET = new Set(NODES.map((n) => n.id));
const DOSE_IN_HEADING = /\d[\d.,]*\s*(?:mg|mcg|\u00b5g|ug|g|ml|mL|units?|iu|IU|meq|mEq|mmol|%|kg)\b/;
function checkStop(pages: Record<string, Info | undefined>, notes: string[] = APPROVED_NOTES_LIST): string[] {
  const errs: string[] = [];
  for (const [id, pg] of Object.entries(pages)) {
    if (!pg) { errs.push(`STOP: ${id} is not registered in INFO_PAGES`); continue; }
    const n = pg.sections.length;
    if (n < 5 || n > 10) errs.push(`STOP: ${id} has ${n} sections (need 5 to 10)`);
    pg.sections.forEach((sec, i) => {
      const h = sec.heading ?? '', b = sec.body ?? '';
      if (!h.startsWith('\u{1F6D1} Do NOT')) errs.push(`STOP: ${id} section ${i} heading does not start with "\u{1F6D1} Do NOT"`);
      if (DOSE_IN_HEADING.test(h)) errs.push(`STOP: ${id} section ${i} heading contains a dose figure`);
      const links = [...b.matchAll(/\]\((#\/[^)\s]+)\)/g)].map((m) => m[1]);
      if (!links.length) errs.push(`STOP: ${id} section ${i} has no link`);
      for (const l of links) {
        let m: RegExpExecArray | null;
        if ((m = /^#\/node\/(.+)$/.exec(l))) { if (!NODE_ID_SET.has(m[1])) errs.push(`STOP: ${id} section ${i} links to node ${m[1]}, which is not in transplant-patient-ed`); }
        else if ((m = /^#\/tree\/transplant-drug-side-effects\/node\/tdse-drug-(.+)$/.exec(l))) { if (!TDSE_ID_SET.has(m[1])) errs.push(`STOP: ${id} section ${i} links to card ${m[1]}, which is not a transplant card`); }
        else if ((m = /^#\/info\/(.+)$/.exec(l))) { if (!(infoMod.INFO_PAGES as Record<string, unknown>)[m[1]]) errs.push(`STOP: ${id} section ${i} links to info ${m[1]}, not registered`); }
        else if ((m = /^#\/drug\/([^/]+)/.exec(l))) { if (!DRUG_IDS.has(m[1])) errs.push(`STOP: ${id} section ${i} links to drug ${m[1]}, not in the drug store`); }
        else if ((m = /^#\/tree\/([^/]+)(?:\/node\/(.+))?$/.exec(l))) { if (!TREE_IDS.has(m[1])) errs.push(`STOP: ${id} section ${i} links to consult ${m[1]}, which does not exist`); }
        else errs.push(`STOP: ${id} section ${i} has an unrecognised link ${l}`);
      }
      for (const line of b.replace(/\*\*/g, '').split('\n')) { const m = /Editor note:.*?\.(?=\s|$)/.exec(line); if (m && !notes.includes(m[0].trim())) errs.push(`STOP: ${id} section ${i} has an Editor note not on the approved list`); }
    });
  }
  return errs;
}
test('real: both transplant Stop pages are registered with 5-10 "Do NOT" sections, links that resolve, approved notes only, no dose in a heading', () => { const e = checkStop(STOPS); assert.deepEqual(e, [], e.join('\n')); assert.equal(Object.values(STOPS).filter(Boolean).length, 2); });
test('break STOP: a missing page, 11 sections, a wrong heading, no link, a dead node or card link, an unapproved note and a dose in a heading all fail', () => {
  const base = clone(STOPS) as Record<string, Info>; const a = base['transplant-patient-ed-stop']; const d = base['transplant-drug-side-effects-stop'];
  assert.ok(checkStop({ ...STOPS, 'transplant-patient-ed-stop': undefined }).some((x) => x.includes('not registered')));
  const m = clone(a); m.sections = [...m.sections, ...m.sections.slice(0, 3)]; assert.ok(checkStop({ x: m }).some((x) => x.includes('sections (need 5 to 10)')));
  const h = clone(a); h.sections[0].heading = 'Do not do this'; assert.ok(checkStop({ x: h }).some((x) => x.includes('heading does not start')));
  const l = clone(a); l.sections[0].body = 'No links here.'; assert.ok(checkStop({ x: l }).some((x) => x.includes('has no link')));
  const n = clone(a); n.sections[0].body += ' [x](#/node/no-such-node)'; assert.ok(checkStop({ x: n }).some((x) => x.includes('no-such-node')));
  const c = clone(d); c.sections[0].body += ' [x](#/tree/transplant-drug-side-effects/node/tdse-drug-no-such-card)'; assert.ok(checkStop({ x: c }).some((x) => x.includes('no-such-card')));
  const e = clone(a); e.sections[0].body += '\nEditor note: invent something new.'; assert.ok(checkStop({ x: e }).some((x) => x.includes('not on the approved list')));
  const g = clone(a); g.sections[0].heading = '\u{1F6D1} Do NOT give 5 mg now'; assert.ok(checkStop({ x: g }).some((x) => x.includes('dose figure')));
});

// ------------------------------------------------------------ shippable front door and no unfinished wording
const SCOPE_LINE = 'Not yet in this consult: fever and infection by time since transplant, Pneumocystis pneumonia, post-transplant lymphoproliferative disorder, diarrhea, and pancreas, intestine or islet recipients. Related consults: [Sepsis](#/tree/sepsis).';
const SHARED_NOTE = 'Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.';
const UNFINISHED = /\[NOT WRITTEN\]|preview|TODO|placeholder/i;
function checkStart(nodes: (Node & { options?: { next: string }[] })[]): string[] {
  const errs: string[] = []; const st = nodes.find((n) => n.id === 'tpe-start');
  if (!st) return ['START: tpe-start missing'];
  if (!st.body.includes(SCOPE_LINE)) errs.push('START: the body does not contain the scope line verbatim');
  if (!st.body.startsWith(SHARED_NOTE)) errs.push('START: the first body line is not the approved shared note');
  for (const e of PAGES_ENTRIES) if (!(st.options ?? []).some((o) => o.next === e)) errs.push(`START: no option opens ${e}`);
  return errs;
}
const PAGES_ENTRIES = Object.values(PAGES).map((p) => p.entry);
const walkStrings = (v: unknown, out: string[]): void => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => walkStrings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => walkStrings(x, out)); };
/** every clinician-visible string of both consults: nodes (title, body, summary, recommendation, option and link labels), critical actions, overlays and Stop pages (title, subtitle, sections), card data, class and category labels, card notes */
function visibleText(): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  const add = (k: string, v: unknown): void => { const a = out[k] ?? []; walkStrings(v, a); out[k] = a; };
  for (const n of [...NODES, ...(tdseTree.TRANSPLANT_DRUG_SIDE_EFFECTS_NODES as FNode[])] as (FNode & { calculatorLinks?: { label: string }[] })[]) add(`node ${n.id}`, [n.title, n.body, n.summary, n.recommendation, (n.options ?? []).map((o) => [o.label, o.description]), (n.calculatorLinks ?? []).map((c) => c.label)]);
  for (const c of CAS) add(`critical action ${c.nodeId}`, c.text);
  for (const [id, o] of Object.entries({ ...OVERLAYS, ...STOPS })) add(`overlay ${id}`, [(o as Info & { title?: string; subtitle?: string }).title, (o as Info & { subtitle?: string }).subtitle, o.sections.map((x) => [x.heading, x.body])]);
  for (const d of tx.TX_DATA.drugs) add(`card ${d.id}`, d);
  for (const c of tx.TX_DATA.classes) if (String(c.id).startsWith('tx-')) add(`class ${c.id}`, [c.name, c.mechanism]);
  for (const t of tx.TX_TOXICITIES) add(`category ${t.id}`, t.label);
  add('card notes', [tx.TX_CONSULT.cardNote, tx.TX_CONSULT.drugNotes]);
  for (const c of cats.getAllCategories()) for (const tr of c.decisionTrees) if (tr.id === 'transplant-patient-ed' || tr.id === 'transplant-drug-side-effects') add(`category listing ${tr.id}`, [tr.title, tr.subtitle]);
  return out;
}
function checkUnfinished(all: Record<string, string[]>): string[] {
  const errs: string[] = [];
  for (const [where, strs] of Object.entries(all)) for (const s of strs) { const m = UNFINISHED.exec(s); if (m) errs.push(`UNFINISHED: ${where} contains "${m[0]}": ${s.slice(Math.max(0, m.index - 30), m.index + 40)}`); }
  return errs;
}
test('real: the start node has the scope line verbatim, the approved note first and an option for every written page', () => { const e = checkStart(NODES as never); assert.deepEqual(e, [], e.join('\n')); });
test('real: nothing clinician-visible in either consult says "[NOT WRITTEN]", "preview", "TODO" or "placeholder"', () => { const all = visibleText(); assert.ok(Object.keys(all).length > 150, 'the scan looks at something'); const e = checkUnfinished(all); assert.deepEqual(e, [], e.slice(0, 20).join('\n')); });
test('break START/UNFINISHED: a changed scope line, a missing option, and each unfinished word planted in a node, overlay, card or Stop page fail', () => {
  const n = clone(NODES) as (Node & { options?: { next: string }[] })[]; const st = n.find((x) => x.id === 'tpe-start')!;
  st.body = st.body.replace('Pneumocystis pneumonia', 'PJP'); assert.ok(checkStart(n).some((x) => x.includes('scope line')));
  const m = clone(NODES) as (Node & { options?: { next: string }[] })[]; const ms = m.find((x) => x.id === 'tpe-start')!; ms.options = ms.options!.filter((o) => o.next !== 'tpe-bk'); assert.ok(checkStart(m).some((x) => x.includes('tpe-bk')));
  for (const [word, where] of [['[NOT WRITTEN]', 'node tpe-bk'], ['Preview build', 'overlay tpe-cmv-dosing'], ['TODO', 'card tacrolimus'], ['placeholder', 'overlay transplant-drug-side-effects-stop']] as const) {
    const all = clone(visibleText()); all[where].push(`some text ${word} here`); assert.ok(checkUnfinished(all).some((x) => x.includes(where)), `${word} in ${where}`);
  }
});
