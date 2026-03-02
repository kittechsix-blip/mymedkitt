// MedKitt — Reference Tables & Info Panels
// Diagnostic test performance, monitoring schedules, and evidence citations.
// Multi-tree aware: data is passed in from tree data files.

import type { Citation } from '../services/tree-service.js';
import { getTreeConfig } from '../services/tree-service.js';

// TestRow for diagnostic test performance tables
interface TestRow {
  test: string;
  sensitivity: string;
  specificity: string;
  role: string;
}

// -------------------------------------------------------------------
// Tree Reference Data Registry
// -------------------------------------------------------------------

interface TreeReferenceData {
  title: string;
  citations: Citation[];
  diagnosticTests?: TestRow[];
  clinicalNotes?: string[];
  testTableTitle?: string;
}

// Static metadata for reference panel titles and supplementary data loaders.
// Citations are loaded dynamically from tree-service.
interface TreeRefMeta {
  title: string;
  testTableTitle?: string;
  loadExtra?: () => Promise<{ clinicalNotes?: string[]; diagnosticTests?: TestRow[] }>;
}

const TREE_REF_META: Record<string, TreeRefMeta> = {
  'neurosyphilis': { title: 'Neurosyphilis Reference', testTableTitle: 'CSF Diagnostic Test Performance' },
  'pneumothorax': { title: 'Pneumothorax POCUS Reference', testTableTitle: 'Ultrasound vs CXR for Pneumothorax' },
  'pe-treatment': { title: 'PE Treatment Reference', testTableTitle: 'PE Risk Stratification Markers' },
  'chest-tube': {
    title: 'Chest Tube Reference',
    loadExtra: async () => { const m = await import('../data/trees/chest-tube.js'); return { clinicalNotes: m.CHEST_TUBE_CLINICAL_NOTES }; },
  },
  'stroke': {
    title: 'Acute Ischemic Stroke Reference',
    loadExtra: async () => { const m = await import('../data/trees/stroke.js'); return { clinicalNotes: m.STROKE_CLINICAL_NOTES }; },
  },
  'nstemi': {
    title: 'NSTEMI Management Reference',
    loadExtra: async () => { const m = await import('../data/trees/nstemi.js'); return { clinicalNotes: m.NSTEMI_CLINICAL_NOTES }; },
  },
  'echo-views': { title: 'Basic Echo Views Reference' },
  'priapism': {
    title: 'Priapism Management Reference',
    loadExtra: async () => { const m = await import('../data/trees/priapism.js'); return { clinicalNotes: m.PRIAPISM_CLINICAL_NOTES }; },
  },
  'afib-rvr': { title: 'A-Fib with RVR Reference' },
  'pep': { title: 'HIV Post-Exposure Prophylaxis Reference' },
  'potassium': {
    title: 'Potassium Disorders Reference',
    loadExtra: async () => { const m = await import('../data/trees/potassium.js'); return { clinicalNotes: m.POTASSIUM_CLINICAL_NOTES }; },
  },
  'peds-fever': { title: 'Fever < 6 Months Reference' },
  'precip-delivery': { title: 'Precipitous Delivery Reference' },
  'neonatal-resus': {
    title: 'Neonatal Resuscitation (NRP) Reference',
    loadExtra: async () => { const m = await import('../data/trees/neonatal-resus.js'); return { clinicalNotes: m.NEONATAL_RESUS_CLINICAL_NOTES }; },
  },
  'distal-radius': {
    title: 'Distal Radius Fracture Reduction Reference',
    loadExtra: async () => { const m = await import('../data/trees/distal-radius.js'); return { clinicalNotes: m.DISTAL_RADIUS_CLINICAL_NOTES }; },
  },
};

/** Build full reference data for a tree by combining tree-service citations with supplementary data */
async function getTreeReferenceData(treeId: string): Promise<TreeReferenceData | null> {
  const meta = TREE_REF_META[treeId];
  if (!meta) return null;

  const config = await getTreeConfig(treeId);
  const citations = config?.citations ?? [];

  const data: TreeReferenceData = { title: meta.title, citations, testTableTitle: meta.testTableTitle };

  if (meta.loadExtra) {
    try {
      const extra = await meta.loadExtra();
      if (extra.clinicalNotes) data.clinicalNotes = extra.clinicalNotes;
      if (extra.diagnosticTests) data.diagnosticTests = extra.diagnosticTests;
    } catch {
      // Supplementary data unavailable — citations still render
    }
  }

  return data;
}

// -------------------------------------------------------------------
// Render: Reference Panel (standalone page)
// -------------------------------------------------------------------

/** Render the full reference panel into a container */
export async function renderReferencePanel(container: HTMLElement, treeId?: string): Promise<void> {
  container.innerHTML = '';

  // Back button
  const backBtn = document.createElement('button');
  backBtn.className = 'btn-text';
  backBtn.textContent = '\u2190 Back';
  backBtn.addEventListener('click', () => history.back());
  container.appendChild(backBtn);

  // If treeId provided, load that tree's references dynamically
  if (treeId) {
    const data = await getTreeReferenceData(treeId);
    if (data) {
      renderTreeReference(container, data);
      return;
    }
    const msg = document.createElement('p');
    msg.style.color = 'var(--color-text-muted)';
    msg.textContent = 'No references available for this consult.';
    container.appendChild(msg);
    return;
  }

  // No treeId at all — show all tree references
  const allHeading = document.createElement('h2');
  allHeading.className = 'reference-heading';
  allHeading.textContent = 'Reference Tables';
  container.appendChild(allHeading);

  for (const id of Object.keys(TREE_REF_META)) {
    const data = await getTreeReferenceData(id);
    if (data) renderTreeReference(container, data);
  }
}

function renderTreeReference(container: HTMLElement, data: TreeReferenceData): void {
  const heading = document.createElement('h2');
  heading.className = 'reference-heading';
  heading.textContent = data.title;
  container.appendChild(heading);

  // Diagnostic test table
  if (data.diagnosticTests && data.diagnosticTests.length > 0) {
    renderTestTable(container, data.diagnosticTests, data.testTableTitle);
  }

  // Key clinical notes
  if (data.clinicalNotes && data.clinicalNotes.length > 0) {
    renderClinicalNotes(container, data.clinicalNotes);
  }

  // Citations
  renderCitationsPanel(container, data.citations);

  // Disclaimer
  renderDisclaimer(container);
}

// -------------------------------------------------------------------
// Render: Inline Citations (for use from result cards)
// -------------------------------------------------------------------

/** Render a citations panel showing specific citation numbers */
export function renderInlineCitations(container: HTMLElement, citationNums: number[], citations: Citation[]): void {
  const section = document.createElement('details');
  section.className = 'reference-citations-inline';

  const summary = document.createElement('summary');
  summary.textContent = `\u25B8 References (${citationNums.length})`;
  section.appendChild(summary);

  const list = document.createElement('div');
  list.className = 'reference-citation-list';

  for (const num of citationNums) {
    const cite = citations.find(c => c.num === num);
    if (!cite) continue;

    const item = document.createElement('div');
    item.className = 'reference-citation-item';

    const numEl = document.createElement('span');
    numEl.className = 'reference-citation-num';
    numEl.textContent = `[${cite.num}]`;

    const textEl = document.createElement('span');
    textEl.className = 'reference-citation-text';
    renderCitationText(textEl, cite.text);

    item.appendChild(numEl);
    item.appendChild(textEl);
    list.appendChild(item);
  }

  section.appendChild(list);
  container.appendChild(section);
}

// -------------------------------------------------------------------
// Diagnostic Test Performance Table
// -------------------------------------------------------------------

function renderTestTable(container: HTMLElement, tests: TestRow[], tableTitle?: string): void {
  const section = document.createElement('div');
  section.className = 'reference-section';

  const title = document.createElement('h3');
  title.className = 'reference-section-title';
  title.textContent = tableTitle ?? 'Diagnostic Test Performance';
  section.appendChild(title);

  // Card layout for mobile
  for (const row of tests) {
    const card = document.createElement('div');
    card.className = 'reference-test-card';

    const testName = document.createElement('div');
    testName.className = 'reference-test-name';
    testName.textContent = row.test;
    card.appendChild(testName);

    const stats = document.createElement('div');
    stats.className = 'reference-test-stats';

    const senEl = document.createElement('span');
    senEl.className = 'reference-stat';
    const senLabel = document.createElement('span');
    senLabel.className = 'reference-stat-label';
    senLabel.textContent = 'Sensitivity';
    const senValue = document.createElement('span');
    senValue.className = 'reference-stat-value';
    senValue.textContent = row.sensitivity;
    senEl.appendChild(senLabel);
    senEl.appendChild(senValue);

    const specEl = document.createElement('span');
    specEl.className = 'reference-stat';
    const specLabel = document.createElement('span');
    specLabel.className = 'reference-stat-label';
    specLabel.textContent = 'Specificity';
    const specValue = document.createElement('span');
    specValue.className = 'reference-stat-value';
    specValue.textContent = row.specificity;
    specEl.appendChild(specLabel);
    specEl.appendChild(specValue);

    stats.appendChild(senEl);
    stats.appendChild(specEl);
    card.appendChild(stats);

    const roleEl = document.createElement('div');
    roleEl.className = 'reference-test-role';
    roleEl.textContent = row.role;
    card.appendChild(roleEl);

    section.appendChild(card);
  }

  container.appendChild(section);
}

// -------------------------------------------------------------------
// Clinical Notes
// -------------------------------------------------------------------

function renderClinicalNotes(container: HTMLElement, notes: string[]): void {
  const section = document.createElement('div');
  section.className = 'reference-section';

  const title = document.createElement('h3');
  title.className = 'reference-section-title';
  title.textContent = 'Key Clinical Notes';
  section.appendChild(title);

  for (const note of notes) {
    const noteEl = document.createElement('div');
    noteEl.className = 'reference-note-card';
    noteEl.textContent = note;
    section.appendChild(noteEl);
  }

  container.appendChild(section);
}

// -------------------------------------------------------------------
// Citations Panel
// -------------------------------------------------------------------

/** Render citation text with URLs as clickable links. */
function renderCitationText(parent: HTMLElement, text: string): void {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = urlPattern.exec(text)) !== null) {
    if (m.index > last) parent.appendChild(document.createTextNode(text.slice(last, m.index)));
    const a = document.createElement('a');
    a.href = m[1];
    a.textContent = m[1];
    a.target = '_blank';
    a.rel = 'noopener';
    a.style.color = 'var(--color-primary)';
    a.style.wordBreak = 'break-all';
    parent.appendChild(a);
    last = m.index + m[0].length;
  }
  if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
  if (last === 0) parent.textContent = text;
}

function renderCitationsPanel(container: HTMLElement, citations: Citation[]): void {
  const section = document.createElement('div');
  section.className = 'reference-section';

  const title = document.createElement('h3');
  title.className = 'reference-section-title';
  title.textContent = 'Evidence Citations';
  section.appendChild(title);

  const list = document.createElement('div');
  list.className = 'reference-citation-list';

  for (const cite of citations) {
    const item = document.createElement('div');
    item.className = 'reference-citation-item';

    const numEl = document.createElement('span');
    numEl.className = 'reference-citation-num';
    numEl.textContent = `[${cite.num}]`;

    const textEl = document.createElement('span');
    textEl.className = 'reference-citation-text';
    renderCitationText(textEl, cite.text);

    item.appendChild(numEl);
    item.appendChild(textEl);
    list.appendChild(item);
  }

  section.appendChild(list);
  container.appendChild(section);
}

// -------------------------------------------------------------------
// Disclaimer
// -------------------------------------------------------------------

function renderDisclaimer(container: HTMLElement): void {
  const disclaimer = document.createElement('div');
  disclaimer.className = 'reference-disclaimer';
  disclaimer.textContent = 'This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols.';
  container.appendChild(disclaimer);
}
