import type { CalculatorDefinition } from './calculator.js';

export interface HearingForkInput {
  side?: string;
  weber?: string;
  right?: string;
  left?: string;
}
export interface HearingForkResult {
  kind: 'incomplete' | 'conductive' | 'sensorineural' | 'inconclusive';
  title: string;
  description: string;
}

/** A pattern aid, never a normal-hearing or stroke-exclusion test. Inputs are not persisted. */
export function interpretHearingFork(input: HearingForkInput | null | undefined): HearingForkResult {
  const { side, weber, right, left } = input ?? {};
  if (![side, weber, right, left].every(Boolean)) {
    return { kind: 'incomplete', title: 'Complete the bedside findings', description: 'Select the symptomatic ear and all three findings. If a finding is uncertain or not heard, choose that option. Sudden unexplained hearing loss still requires urgent ENT assessment and audiometry.' };
  }
  const inconclusive: HearingForkResult = {
    kind: 'inconclusive', title: 'Inconclusive pattern',
    description: 'Mixed, bilateral or profound sensorineural loss and technique effects are possible. Do not exclude sudden sensorineural hearing loss. Arrange urgent audiometry for sudden unexplained loss.'
  };
  if (!['right', 'left'].includes(side!) || !['right', 'left', 'midline'].includes(weber!) || !['air', 'bone'].includes(right!) || !['air', 'bone'].includes(left!)) return inconclusive;
  const affected = side === 'right' ? right : left;
  const other = side === 'right' ? left : right;
  const opposite = side === 'right' ? 'left' : 'right';
  if (weber === side && affected === 'bone' && other === 'air') {
    return { kind: 'conductive', title: `Supports ${side}-ear conductive loss`, description: 'Weber is louder in the symptomatic ear and bone exceeds air conduction there. Correlate with otoscopy and audiometry. Unexplained sudden loss still needs urgent assessment; this pattern is not a definitive diagnosis.' };
  }
  if (weber === opposite && right === 'air' && left === 'air') {
    return { kind: 'sensorineural', title: `Supports ${side}-ear sensorineural loss`, description: 'Weber is louder in the better ear, with air exceeding bone conduction in both ears. If sudden: urgent ENT assessment, audiometry and early corticosteroid discussion. Audiometry confirms the type and degree.' };
  }
  return inconclusive;
}

function renderHearingFork(container: HTMLElement): void {
  container.innerHTML = `
    <style>
      .hearing-fork{color:var(--color-text,#172c3c);line-height:1.55;min-width:0}
      .hearing-fork *{box-sizing:border-box}.hearing-fork h3{font-size:1.08rem;margin:0 0 8px}.hearing-fork p{margin:8px 0}
      .hearing-fork .hf-card{padding:18px;margin:0 0 16px;border:1px solid #d5e0e4;border-radius:16px;background:var(--color-surface,#fff)}
      .hearing-fork .hf-kicker{font-size:.73rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#426e7b;margin-bottom:6px}
      .hearing-fork .hf-figure{display:block;color:#176579;text-decoration:none;font-size:.82rem;font-weight:700}
      .hearing-fork img{display:block;width:100%;height:auto;border-radius:10px;margin:10px 0}
      .hearing-fork .hf-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:16px}
      .hearing-fork label{display:flex;flex-direction:column;gap:6px;font-size:.9rem;font-weight:700;min-width:0}
      .hearing-fork select{width:100%;min-height:48px;padding:10px 8px;background:var(--color-surface,#fff);color:inherit;border:1px solid #91a9b3;border-radius:9px;font-size:16px}
      .hearing-fork select:focus-visible,.hearing-fork button:focus-visible,.hearing-fork a:focus-visible{outline:3px solid #247c96;outline-offset:3px}
      .hearing-fork .hf-result{border-left:4px solid #6d8896;background:#edf4f7;border-radius:10px;padding:16px;margin-top:20px;color:#172c3c}
      .hearing-fork .hf-result[data-kind="sensorineural"]{border-color:#b36615;background:#fff4e4}
      .hearing-fork .hf-trap{background:#fff7e9;border-color:#e0c99d;color:#493718}
      .hearing-fork .hf-reset{min-height:44px;margin-top:12px;padding:8px 16px;border:1px solid #91a9b3;background:transparent;color:inherit;border-radius:9px;font-weight:700;cursor:pointer}
      .hearing-fork details summary{cursor:pointer;font-weight:700;min-height:44px;padding:8px 0}.hearing-fork .hf-small{font-size:.86rem;color:inherit}
    </style>
    <div class="hearing-fork">
      <section class="hf-card"><div class="hf-kicker">Bedside technique · 512 Hz</div><h3>Compare both ears</h3><p>Use a gently activated 512-Hz tuning fork in a quiet environment. Explain the task before testing.</p>
        <details open><summary>1. Weber: which ear is louder?</summary>
          <a class="hf-figure" href="images/sudden-hearing-loss/weber.svg" target="_blank" rel="noopener" aria-label="Open full-size Weber technique illustration in a new tab"><img src="images/sudden-hearing-loss/weber.svg" alt="Weber: tuning-fork base contacts the midline forehead. Conductive loss lateralizes to the affected ear; sensorineural loss to the better ear.">Open full-size illustration ↗</a>
          <p>Place the vibrating fork base on the midline forehead. Ask: “Is the sound in the middle, louder on your right, or louder on your left?”</p><p class="hf-small">Midline does not prove normal hearing: symmetric hearing loss can also give a midline result.</p>
        </details>
        <details><summary>2. Rinne: air versus bone</summary>
          <a class="hf-figure" href="images/sudden-hearing-loss/rinne.svg" target="_blank" rel="noopener" aria-label="Open full-size Rinne technique illustration in a new tab"><img src="images/sudden-hearing-loss/rinne.svg" alt="Rinne sequence: tuning-fork base on the mastoid, then vibrating tines beside the ear canal without touching it.">Open full-size illustration ↗</a>
          <p>Compare bone conduction with the base on the mastoid against air conduction with the tines beside the canal, without touching it. Ask which is louder. Repeat for the other ear.</p>
          <p><strong>Air &gt; bone (positive Rinne)</strong> occurs with normal hearing or sensorineural loss. <strong>Bone &gt; air (negative Rinne)</strong> suggests conductive loss, but can be misleading in profound unilateral sensorineural loss.</p>
        </details>
      </section>
      <section class="hf-card"><div class="hf-kicker">Pattern interpreter · unilateral symptoms</div><h3>Enter the findings you obtained</h3><p class="hf-small">Right and left always mean the patient’s right and left. No finding is preselected.</p><div class="hf-grid"></div><div class="hf-result" role="status" aria-live="polite" aria-atomic="true"><h3></h3><p></p></div><button class="hf-reset" type="button">Clear findings</button></section>
      <aside class="hf-card hf-trap"><h3>The profound sensorineural-loss trap</h3><p>Bone-conducted sound can cross to the opposite cochlea, producing an apparently negative Rinne in the deaf ear. A Weber that points away from that ear is a warning, not evidence of a simple conductive cause.</p><p>Equal loudness, absent responses and conflicting results need audiometry. These tests cannot exclude stroke or replace neurologic assessment when indicated.</p></aside>
    </div>`;
  const input: HearingForkInput = {};
  const grid = container.querySelector<HTMLElement>('.hf-grid')!;
  const result = container.querySelector<HTMLElement>('.hf-result')!;
  const update = (): void => {
    const interpretation = interpretHearingFork(input);
    result.dataset.kind = interpretation.kind;
    result.querySelector('h3')!.textContent = interpretation.title;
    result.querySelector('p')!.textContent = interpretation.description;
  };
  const definitions: Array<{ key: keyof HearingForkInput; label: string; choices: Array<[string, string]> }> = [
    { key: 'side', label: 'Symptomatic ear', choices: [['right', 'Right'], ['left', 'Left'], ['uncertain', 'Bilateral / uncertain']] },
    { key: 'weber', label: 'Weber: louder on', choices: [['right', 'Right'], ['left', 'Left'], ['midline', 'Midline'], ['uncertain', 'Uncertain / not heard']] },
    { key: 'right', label: 'Right Rinne', choices: [['air', 'Air > bone'], ['bone', 'Bone > air'], ['uncertain', 'Equal / uncertain / not heard']] },
    { key: 'left', label: 'Left Rinne', choices: [['air', 'Air > bone'], ['bone', 'Bone > air'], ['uncertain', 'Equal / uncertain / not heard']] }
  ];
  for (const definition of definitions) {
    const label = document.createElement('label');
    label.append(document.createTextNode(definition.label));
    const select = document.createElement('select');
    select.name = definition.key;
    for (const [value, text] of [['', 'Select a finding'], ...definition.choices]) {
      const option = document.createElement('option');
      option.value = value; option.textContent = text; select.append(option);
    }
    select.addEventListener('change', () => { input[definition.key] = select.value; update(); });
    label.append(select); grid.append(label);
  }
  container.querySelector<HTMLButtonElement>('.hf-reset')!.addEventListener('click', () => {
    for (const definition of definitions) delete input[definition.key];
    grid.querySelectorAll('select').forEach(select => { select.value = ''; });
    update();
    grid.querySelector('select')?.focus();
  });
  update();
}

export const HEARING_FORK_CALCULATOR: CalculatorDefinition = {
  id: 'hearing-fork', title: 'Weber & Rinne Fork Lab',
  subtitle: 'Visual technique and bedside hearing-loss patterns',
  description: 'Tuning-fork findings support classification. Audiometry confirms the type and degree of hearing loss. Sudden unexplained loss requires urgent ENT assessment even when bedside findings are uncertain.',
  fields: [], results: [], customRender: renderHearingFork,
  thresholdNote: 'No normal-hearing or safe-discharge result is provided. Do not delay urgent evaluation of sudden hearing loss while repeating tuning-fork tests.',
  citations: ['Defense Health Agency Hearing Center of Excellence. SSNHL Coding Guidance: Primary Care. June 2020, Table 1 (mastoid-to-air technique). https://health.mil/Reference-Center/Clinical-Practice-Guidelines/2024/11/25/SSNHL-Coding-Guidance--Primary-Care', 'British Society of Audiology. Recommended Procedure: Rinne and Weber tuning fork tests. February 2022. https://www.thebsa.org.uk/wp-content/uploads/2023/10/OD104-51-BSA-Recommended-Procedure-Rinne-Weber-Tuning-Fork-Tests-February-2022.pdf', 'Chandrasekhar SS et al. Clinical Practice Guideline: Sudden Hearing Loss (Update). Otolaryngol Head Neck Surg. 2019;161(1_suppl):S1-S45. doi:10.1177/0194599819859885.'],
};
