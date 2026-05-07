// myMedKitt — MedKitt Learn pre-round template (psychiatry)
// Three sub-templates selectable from a chip row at top:
//   1. Standard psych admit
//   2. ED psych consult
//   3. Geriatric delirium consult
// Each sub-template has its own sessionStorage key so drafts do not collide.

import { getRotation, getPreRoundTemplate, setPreRoundTemplate } from '../services/learn-service.js';
import { router } from '../services/router.js';

interface FieldDef {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'radio' | 'number';
  options?: string[];
  placeholder?: string;
}

interface SubTemplate {
  id: string;
  label: string;
  short: string;
  description: string;
  fields: FieldDef[];
}

const SHARED_TOP_FIELDS: FieldDef[] = [
  { id: 'cue', label: 'Patient cue (NO names — use "Bed 3", "Pt A", etc.)', type: 'text', placeholder: 'Bed 3' },
];

const STANDARD_TEMPLATE: SubTemplate = {
  id: 'standard',
  label: 'Standard',
  short: 'Inpatient psych',
  description: '11-field checklist for psych ward pre-rounding.',
  fields: [
    ...SHARED_TOP_FIELDS,
    { id: 'legal', label: 'Legal status', type: 'radio', options: ['Voluntary', 'EDO', 'Certification', 'Not applicable'] },
    { id: 'sleep', label: 'Sleep last night (hours)', type: 'number', placeholder: 'e.g., 4' },
    { id: 'meals', label: 'Meal intake', type: 'radio', options: ['None', 'Partial', 'Full'] },
    { id: 'group', label: 'Group attendance', type: 'radio', options: ['Yes', 'No', 'N/A'] },
    { id: 'prn', label: 'PRN psych meds in last 24h', type: 'textarea', placeholder: 'e.g., Lorazepam 2 mg PO x1 for anxiety at 2am' },
    { id: 'mse', label: 'MSE delta from yesterday', type: 'textarea', placeholder: 'e.g., Affect brighter, less guarded; speech still pressured' },
    { id: 'sihi', label: 'SI / HI re-screen', type: 'radio', options: ['None', 'Passive', 'Active no plan', 'Active with plan'] },
    { id: 'capacity', label: 'Capacity', type: 'radio', options: ['Intact', 'Impaired', 'Not assessed'] },
    { id: 'withdrawal', label: 'Substance withdrawal scale + score (CIWA / COWS)', type: 'text', placeholder: 'e.g., CIWA 6' },
    { id: 'dispo', label: 'Disposition barrier', type: 'textarea', placeholder: 'e.g., Awaiting subacute placement; insurance denied' },
  ],
};

const ED_TEMPLATE: SubTemplate = {
  id: 'ed',
  label: 'ED Consult',
  short: 'ED psych consult',
  description: 'Bedside checklist for an ED-floor psychiatric consult, with medical clearance focus.',
  fields: [
    ...SHARED_TOP_FIELDS,
    { id: 'cc', label: 'Chief complaint (in patient\'s words)', type: 'textarea', placeholder: 'e.g., "Hearing voices for 3 days"' },
    { id: 'med-clearance', label: 'Medical clearance status', type: 'radio', options: ['Cleared', 'Pending labs/imaging', 'Not cleared', 'N/A'] },
    { id: 'vitals', label: 'Vitals reviewed (BP/HR/T/SpO2)', type: 'text', placeholder: 'e.g., 128/82, 96, 98.4, 98%' },
    { id: 'labs', label: 'Labs / tox / glucose reviewed', type: 'textarea', placeholder: 'e.g., CBC/BMP wnl, ETOH 0.21, UDS + cocaine' },
    { id: 'organic', label: 'Organic causes ruled out', type: 'radio', options: ['Yes', 'In progress', 'No'] },
    { id: 'sihi-ed', label: 'SI / HI risk on arrival', type: 'radio', options: ['None', 'Passive', 'Active no plan', 'Active with plan'] },
    { id: 'cssrs', label: 'C-SSRS severity (1-5)', type: 'text', placeholder: 'e.g., 3 (active SI with method)' },
    { id: 'capacity-ed', label: 'Capacity for THIS decision', type: 'radio', options: ['Intact', 'Impaired', 'Not assessed'] },
    { id: 'agitation', label: 'Agitation / safety needs', type: 'radio', options: ['Calm', 'Verbal de-escalation', 'PRN given', 'Restraints'] },
    { id: 'monitoring', label: 'Monitoring level', type: 'radio', options: ['Standard', 'Q15', 'Line of sight', '1:1 sitter'] },
    { id: 'collateral', label: 'Collateral obtained', type: 'textarea', placeholder: 'e.g., Mom — pt off Abilify x2 weeks, increased agitation' },
    { id: 'dispo-ed', label: 'Disposition plan', type: 'textarea', placeholder: 'e.g., Awaiting bed at ASH for involuntary psych admission' },
  ],
};

const GERI_DELIRIUM_TEMPLATE: SubTemplate = {
  id: 'geri-delirium',
  label: 'Geri Delirium',
  short: 'Geriatric delirium',
  description: 'Geriatric consult template focused on delirium workup and BPSD.',
  fields: [
    ...SHARED_TOP_FIELDS,
    { id: 'baseline', label: 'Baseline cognitive status (per family)', type: 'textarea', placeholder: 'e.g., Independent, drives, MoCA 26 last year' },
    { id: 'onset', label: 'Onset / fluctuation pattern', type: 'textarea', placeholder: 'e.g., Acute 2 days ago, worse evenings (sundowning)' },
    { id: 'med-list', label: 'Active medications (Beers flags?)', type: 'textarea', placeholder: 'e.g., Diphenhydramine, oxybutynin, lorazepam — Beers anticholinergic + benzo' },
    { id: 'cam', label: 'CAM / CAM-ICU result', type: 'radio', options: ['Negative', 'Positive', 'Not assessed'] },
    { id: 'workup', label: 'Workup completed', type: 'textarea', placeholder: 'e.g., UA, CBC, BMP, glucose, TSH, B12, head CT' },
    { id: 'cause', label: 'Suspected cause', type: 'textarea', placeholder: 'e.g., UTI + diphenhydramine 50 mg HS' },
    { id: 'sundowning', label: 'Sundowning pattern', type: 'radio', options: ['None', 'Mild', 'Moderate', 'Severe'] },
    { id: 'bpsd', label: 'BPSD (behavioral / psychological symptoms of dementia)', type: 'textarea', placeholder: 'e.g., Restlessness, calling out, attempting to climb out of bed' },
    { id: 'nonpharm', label: 'Non-pharm interventions tried', type: 'textarea', placeholder: 'e.g., Family at bedside, lights on during day, hearing aids in' },
    { id: 'pharm', label: 'Pharm escalation if needed', type: 'textarea', placeholder: 'e.g., Quetiapine 12.5 mg HS PRN x1 (avoiding Beers benzo + 1st-gen H1)' },
    { id: 'family', label: 'Family contact + goals discussion', type: 'textarea', placeholder: 'e.g., Daughter Susan, RN — comfort focus, no transfers, MOLST in chart' },
    { id: 'dispo-geri', label: 'Disposition / next step', type: 'textarea', placeholder: 'e.g., Treat UTI, taper anticholinergics, re-eval in 48h, SNF placement' },
  ],
};

const SUB_TEMPLATES: SubTemplate[] = [STANDARD_TEMPLATE, ED_TEMPLATE, GERI_DELIRIUM_TEMPLATE];

const SESSION_KEY = (templateId: string, fieldId: string) =>
  `mymedkitt-learn-preround-${templateId}-${fieldId}`;

export function renderLearnPreRound(container: HTMLElement, rotationId: string): void {
  container.innerHTML = '';

  const rotation = getRotation(rotationId);
  const page = document.createElement('div');
  page.className = 'learn-preround';

  // Header
  const header = document.createElement('div');
  header.className = 'learn-card__header';

  const back = document.createElement('button');
  back.className = 'learn-back-btn';
  back.type = 'button';
  back.textContent = `← ${rotation?.name ?? 'Back'}`;
  back.addEventListener('click', () => router.navigate(`/learn/${rotationId}`));
  header.appendChild(back);

  const title = document.createElement('h1');
  title.className = 'learn-card__title';
  title.textContent = 'Psych Pre-Round Template';
  header.appendChild(title);

  page.appendChild(header);

  // Privacy banner
  const banner = document.createElement('div');
  banner.className = 'learn-preround__banner';
  const bannerIcon = document.createElement('span');
  bannerIcon.className = 'learn-preround__banner-icon';
  bannerIcon.textContent = '🛑';
  bannerIcon.setAttribute('aria-hidden', 'true');
  banner.appendChild(bannerIcon);
  const bannerText = document.createElement('div');
  bannerText.className = 'learn-preround__banner-text';
  bannerText.textContent = 'Do not type identifying patient information. This page does not save anything when you close the tab.';
  banner.appendChild(bannerText);
  page.appendChild(banner);

  // Sub-template chip row
  const currentTemplateId = getPreRoundTemplate(rotationId);
  const currentTemplate = SUB_TEMPLATES.find(t => t.id === currentTemplateId) ?? STANDARD_TEMPLATE;

  const chipRow = document.createElement('div');
  chipRow.className = 'learn-preround__chip-row';
  chipRow.setAttribute('role', 'tablist');

  for (const tpl of SUB_TEMPLATES) {
    const chip = document.createElement('button');
    chip.className = 'learn-preround__chip';
    chip.type = 'button';
    chip.setAttribute('role', 'tab');
    chip.setAttribute('aria-selected', tpl.id === currentTemplate.id ? 'true' : 'false');
    if (tpl.id === currentTemplate.id) chip.classList.add('selected');
    chip.textContent = tpl.label;
    chip.addEventListener('click', () => {
      setPreRoundTemplate(rotationId, tpl.id);
      renderLearnPreRound(container, rotationId);
    });
    chipRow.appendChild(chip);
  }
  page.appendChild(chipRow);

  // Description
  const desc = document.createElement('div');
  desc.className = 'learn-preround__desc';
  desc.textContent = currentTemplate.description;
  page.appendChild(desc);

  // Form fields
  const form = document.createElement('div');
  form.className = 'learn-preround__form';

  for (const field of currentTemplate.fields) {
    const fieldWrap = document.createElement('div');
    fieldWrap.className = 'learn-preround__field';

    const label = document.createElement('label');
    label.className = 'learn-preround__label';
    label.textContent = field.label;
    label.htmlFor = `pr-${currentTemplate.id}-${field.id}`;
    fieldWrap.appendChild(label);

    const sessionKey = SESSION_KEY(currentTemplate.id, field.id);
    const stored = sessionStorage.getItem(sessionKey) ?? '';

    if (field.type === 'radio' && field.options) {
      const group = document.createElement('div');
      group.className = 'learn-preround__radio-group';
      group.setAttribute('role', 'radiogroup');
      group.setAttribute('aria-label', field.label);
      for (const opt of field.options) {
        const optBtn = document.createElement('button');
        optBtn.className = 'learn-preround__radio-btn';
        optBtn.type = 'button';
        optBtn.textContent = opt;
        if (stored === opt) optBtn.classList.add('selected');
        optBtn.addEventListener('click', () => {
          group.querySelectorAll('.learn-preround__radio-btn').forEach(b => b.classList.remove('selected'));
          optBtn.classList.add('selected');
          sessionStorage.setItem(sessionKey, opt);
        });
        group.appendChild(optBtn);
      }
      fieldWrap.appendChild(group);
    } else if (field.type === 'textarea') {
      const ta = document.createElement('textarea');
      ta.className = 'learn-preround__textarea';
      ta.id = `pr-${currentTemplate.id}-${field.id}`;
      ta.placeholder = field.placeholder ?? '';
      ta.rows = 2;
      ta.value = stored;
      ta.addEventListener('input', () => {
        sessionStorage.setItem(sessionKey, ta.value);
      });
      fieldWrap.appendChild(ta);
    } else {
      const input = document.createElement('input');
      input.className = 'learn-preround__input';
      input.id = `pr-${currentTemplate.id}-${field.id}`;
      input.type = field.type === 'number' ? 'number' : 'text';
      input.placeholder = field.placeholder ?? '';
      input.value = stored;
      input.addEventListener('input', () => {
        sessionStorage.setItem(sessionKey, input.value);
      });
      fieldWrap.appendChild(input);
    }

    form.appendChild(fieldWrap);
  }

  page.appendChild(form);

  // Clear button — clears CURRENT template only
  const actions = document.createElement('div');
  actions.className = 'learn-preround__actions';

  const clearBtn = document.createElement('button');
  clearBtn.className = 'learn-preround__clear-btn';
  clearBtn.type = 'button';
  clearBtn.textContent = `Clear ${currentTemplate.short} fields`;
  clearBtn.addEventListener('click', () => {
    for (const field of currentTemplate.fields) {
      sessionStorage.removeItem(SESSION_KEY(currentTemplate.id, field.id));
    }
    renderLearnPreRound(container, rotationId);
  });
  actions.appendChild(clearBtn);

  page.appendChild(actions);

  container.appendChild(page);
}
