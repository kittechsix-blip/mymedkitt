// myMedKitt — MedKitt Learn OSCE drill renderer
// Steps through OSCEDrill.steps, scores per option, shows debrief at end.

import { getDrill, recordDrillScore, getDrillBestScore } from '../services/learn-service.js';
import type { OSCEDrill, OSCEDrillStep, OSCEDrillOption } from '../services/learn-service.js';
import { router } from '../services/router.js';
import { showInfoModal } from './info-page.js';
import { appendBoldAware } from './text-renderer.js';

interface DrillSession {
  drill: OSCEDrill;
  currentStepIdx: number;
  // Map step.id -> selected option id (single) or option ids (multi)
  answers: Record<string, string | string[]>;
  // Total points scored
  score: number;
}

let session: DrillSession | null = null;

export function renderLearnDrill(container: HTMLElement, rotationId: string, drillId: string): void {
  container.innerHTML = '';

  const drill = getDrill(rotationId, drillId);
  if (!drill) {
    renderNotFound(container, drillId);
    return;
  }

  // Reset session for fresh start
  session = { drill, currentStepIdx: -1, answers: {}, score: 0 };

  renderIntro(container, rotationId, drill);
}

function renderIntro(container: HTMLElement, rotationId: string, drill: OSCEDrill): void {
  container.innerHTML = '';

  const page = document.createElement('div');
  page.className = 'learn-drill';

  // Header
  const header = document.createElement('div');
  header.className = 'learn-card__header';
  const back = document.createElement('button');
  back.className = 'learn-back-btn';
  back.type = 'button';
  back.textContent = '← Drills';
  back.addEventListener('click', () => router.navigate(`/learn/${rotationId}`));
  header.appendChild(back);

  const title = document.createElement('h1');
  title.className = 'learn-card__title';
  title.textContent = drill.title;
  header.appendChild(title);
  page.appendChild(header);

  // Vignette card
  const vig = document.createElement('div');
  vig.className = 'learn-drill__vignette';

  const vigLabel = document.createElement('div');
  vigLabel.className = 'learn-drill__vignette-label';
  vigLabel.textContent = '🩺 SCENARIO';
  vig.appendChild(vigLabel);

  const vigBody = document.createElement('div');
  vigBody.className = 'learn-drill__vignette-body';
  vigBody.textContent = drill.scenario;
  vig.appendChild(vigBody);

  page.appendChild(vig);

  // Learning objectives
  if (drill.learningObjectives.length > 0) {
    const lo = document.createElement('div');
    lo.className = 'learn-drill__objectives';
    const loLabel = document.createElement('div');
    loLabel.className = 'learn-drill__objectives-label';
    loLabel.textContent = 'Learning objectives';
    lo.appendChild(loLabel);
    const ul = document.createElement('ul');
    ul.className = 'learn-drill__objectives-list';
    for (const obj of drill.learningObjectives) {
      const li = document.createElement('li');
      li.textContent = obj;
      ul.appendChild(li);
    }
    lo.appendChild(ul);
    page.appendChild(lo);
  }

  // Best score badge
  const best = getDrillBestScore(drill.id);
  if (best !== null) {
    const total = drill.steps.reduce((s, st) => s + maxStepPoints(st), 0);
    const badge = document.createElement('div');
    badge.className = 'learn-drill__best';
    badge.textContent = `Personal best: ${best} / ${total}`;
    page.appendChild(badge);
  }

  // Meta
  const meta = document.createElement('div');
  meta.className = 'learn-drill__meta';
  meta.textContent = `${drill.steps.length} steps · ~${drill.estMinutes} min`;
  page.appendChild(meta);

  // Start button
  const startBtn = document.createElement('button');
  startBtn.className = 'learn-drill__start-btn';
  startBtn.type = 'button';
  startBtn.textContent = 'Start Drill';
  startBtn.addEventListener('click', () => {
    if (!session) return;
    session.currentStepIdx = 0;
    renderStep(container, rotationId);
  });
  page.appendChild(startBtn);

  container.appendChild(page);
}

function maxStepPoints(step: OSCEDrillStep): number {
  if (step.multiSelect) {
    return step.options.filter(o => o.correct).reduce((s, o) => s + o.points, 0);
  }
  return Math.max(0, ...step.options.map(o => o.points));
}

function renderStep(container: HTMLElement, rotationId: string): void {
  if (!session) return;
  container.innerHTML = '';

  const { drill, currentStepIdx } = session;
  const step = drill.steps[currentStepIdx];
  if (!step) {
    renderDebrief(container, rotationId);
    return;
  }

  const page = document.createElement('div');
  page.className = 'learn-drill';

  // Header
  const header = document.createElement('div');
  header.className = 'learn-card__header';
  const back = document.createElement('button');
  back.className = 'learn-back-btn';
  back.type = 'button';
  back.textContent = '← Exit Drill';
  back.addEventListener('click', () => {
    if (confirm('Exit drill? Your progress will be lost.')) {
      router.navigate(`/learn/${rotationId}`);
    }
  });
  header.appendChild(back);

  const title = document.createElement('h1');
  title.className = 'learn-card__title';
  title.textContent = drill.title;
  header.appendChild(title);
  page.appendChild(header);

  // Progress
  const prog = document.createElement('div');
  prog.className = 'learn-drill__progress';

  const progBar = document.createElement('div');
  progBar.className = 'learn-drill__progress-bar';
  const progFill = document.createElement('div');
  progFill.className = 'learn-drill__progress-fill';
  progFill.style.width = `${((currentStepIdx + 1) / drill.steps.length) * 100}%`;
  progBar.appendChild(progFill);
  prog.appendChild(progBar);

  const progLabel = document.createElement('div');
  progLabel.className = 'learn-drill__progress-label';
  progLabel.textContent = `Step ${currentStepIdx + 1} of ${drill.steps.length} · Score: ${session.score}`;
  prog.appendChild(progLabel);

  page.appendChild(prog);

  // Prompt
  const prompt = document.createElement('div');
  prompt.className = 'learn-drill__prompt';
  appendBoldAware(prompt, step.prompt);
  page.appendChild(prompt);

  // Options
  const optsWrap = document.createElement('div');
  optsWrap.className = 'learn-drill__options';

  const feedbackArea = document.createElement('div');
  feedbackArea.className = 'learn-drill__feedback-area';

  for (const opt of step.options) {
    const optBtn = document.createElement('button');
    optBtn.className = 'learn-drill__option';
    optBtn.type = 'button';

    const lbl = document.createElement('div');
    lbl.className = 'learn-drill__option-label';
    lbl.textContent = opt.label;
    optBtn.appendChild(lbl);

    optBtn.addEventListener('click', () => {
      if (!session) return;
      // Lock all options once one is picked
      optsWrap.querySelectorAll('.learn-drill__option').forEach(b => {
        (b as HTMLButtonElement).disabled = true;
      });
      // Mark selected
      optBtn.classList.add('selected');
      if (opt.correct) {
        optBtn.classList.add('correct');
      } else {
        optBtn.classList.add('incorrect');
      }
      // Score
      session.answers[step.id] = opt.id;
      session.score += opt.points;
      // Show feedback
      renderFeedback(feedbackArea, step, opt);
    });

    optsWrap.appendChild(optBtn);
  }

  page.appendChild(optsWrap);
  page.appendChild(feedbackArea);

  container.appendChild(page);
}

function renderFeedback(target: HTMLElement, step: OSCEDrillStep, opt: OSCEDrillOption): void {
  if (!session) return;
  target.innerHTML = '';

  const fb = document.createElement('div');
  fb.className = `learn-drill__feedback ${opt.correct ? 'correct' : 'incorrect'}`;

  const verdict = document.createElement('div');
  verdict.className = 'learn-drill__feedback-verdict';
  verdict.textContent = opt.correct ? `✓ Correct (+${opt.points})` : (opt.points > 0 ? `~ Partial (+${opt.points})` : '✗ Try again');
  fb.appendChild(verdict);

  if (opt.feedback) {
    const expl = document.createElement('div');
    expl.className = 'learn-drill__feedback-text';
    appendBoldAware(expl, opt.feedback);
    fb.appendChild(expl);
  }

  if (step.pearl) {
    const pearl = document.createElement('div');
    pearl.className = 'learn-drill__pearl';
    const pearlLabel = document.createElement('span');
    pearlLabel.className = 'learn-drill__pearl-label';
    pearlLabel.textContent = '💡 Pearl: ';
    pearl.appendChild(pearlLabel);
    const pearlText = document.createElement('span');
    appendBoldAware(pearlText, step.pearl);
    pearl.appendChild(pearlText);
    fb.appendChild(pearl);
  }

  target.appendChild(fb);

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'learn-drill__next-btn';
  nextBtn.type = 'button';
  nextBtn.textContent = isLastStep() ? 'Finish Drill →' : 'Next Step →';
  nextBtn.addEventListener('click', () => {
    if (!session) return;
    session.currentStepIdx += 1;
    const container = document.querySelector('.learn-drill')?.parentElement;
    if (container) renderStep(container, session.drill.rotationId);
  });
  target.appendChild(nextBtn);
}

function isLastStep(): boolean {
  if (!session) return true;
  return session.currentStepIdx >= session.drill.steps.length - 1;
}

function renderDebrief(container: HTMLElement, rotationId: string): void {
  if (!session) return;
  container.innerHTML = '';

  const { drill, score } = session;
  const total = drill.steps.reduce((s, st) => s + maxStepPoints(st), 0);
  const pct = total === 0 ? 0 : Math.round((score / total) * 100);

  // Record best score
  recordDrillScore(drill.id, score);

  const page = document.createElement('div');
  page.className = 'learn-drill';

  // Header
  const header = document.createElement('div');
  header.className = 'learn-card__header';
  const back = document.createElement('button');
  back.className = 'learn-back-btn';
  back.type = 'button';
  back.textContent = '← Drills';
  back.addEventListener('click', () => router.navigate(`/learn/${rotationId}`));
  header.appendChild(back);

  const title = document.createElement('h1');
  title.className = 'learn-card__title';
  title.textContent = 'Drill Complete';
  header.appendChild(title);
  page.appendChild(header);

  // Score panel
  const scorePanel = document.createElement('div');
  scorePanel.className = 'learn-drill__score-panel';

  const big = document.createElement('div');
  big.className = 'learn-drill__score-big';
  big.textContent = `${score} / ${total}`;
  scorePanel.appendChild(big);

  const pctEl = document.createElement('div');
  pctEl.className = 'learn-drill__score-pct';
  pctEl.textContent = `${pct}%`;
  scorePanel.appendChild(pctEl);

  const verdict = document.createElement('div');
  verdict.className = 'learn-drill__score-verdict';
  if (pct >= 90) verdict.textContent = 'Honors-level performance.';
  else if (pct >= 75) verdict.textContent = 'Solid pass — review the steps you missed.';
  else if (pct >= 60) verdict.textContent = 'Working pass — re-do this drill before the OSCE.';
  else verdict.textContent = 'Re-attempt and review the feedback page.';
  scorePanel.appendChild(verdict);

  page.appendChild(scorePanel);

  // Per-step recap
  const recap = document.createElement('div');
  recap.className = 'learn-drill__recap';

  const recapLabel = document.createElement('div');
  recapLabel.className = 'learn-drill__recap-label';
  recapLabel.textContent = 'Step-by-step recap';
  recap.appendChild(recapLabel);

  for (let i = 0; i < drill.steps.length; i++) {
    const step = drill.steps[i];
    const pickedId = session.answers[step.id];
    const picked = step.options.find(o => o.id === pickedId);
    const correct = step.options.find(o => o.correct);

    const row = document.createElement('div');
    row.className = `learn-drill__recap-row ${picked?.correct ? 'correct' : 'incorrect'}`;

    const num = document.createElement('div');
    num.className = 'learn-drill__recap-num';
    num.textContent = `${i + 1}`;
    row.appendChild(num);

    const body = document.createElement('div');
    body.className = 'learn-drill__recap-body';

    const q = document.createElement('div');
    q.className = 'learn-drill__recap-q';
    q.textContent = step.prompt;
    body.appendChild(q);

    if (picked) {
      const a = document.createElement('div');
      a.className = 'learn-drill__recap-a';
      a.textContent = `Your answer: ${picked.label} (${picked.points} pts)`;
      body.appendChild(a);
    }

    if (!picked?.correct && correct) {
      const cor = document.createElement('div');
      cor.className = 'learn-drill__recap-correct';
      cor.textContent = `Best answer: ${correct.label}`;
      body.appendChild(cor);
    }

    row.appendChild(body);
    recap.appendChild(row);
  }

  page.appendChild(recap);

  // Actions
  const actions = document.createElement('div');
  actions.className = 'learn-drill__actions';

  if (drill.feedbackInfoPageId) {
    const feedbackBtn = document.createElement('button');
    feedbackBtn.className = 'learn-drill__feedback-btn';
    feedbackBtn.type = 'button';
    feedbackBtn.textContent = '📖 Read Debrief';
    feedbackBtn.addEventListener('click', () => showInfoModal(drill.feedbackInfoPageId));
    actions.appendChild(feedbackBtn);
  }

  const retryBtn = document.createElement('button');
  retryBtn.className = 'learn-drill__retry-btn';
  retryBtn.type = 'button';
  retryBtn.textContent = '🔄 Retry Drill';
  retryBtn.addEventListener('click', () => {
    renderLearnDrill(container, rotationId, drill.id);
  });
  actions.appendChild(retryBtn);

  page.appendChild(actions);

  container.appendChild(page);
}

function renderNotFound(container: HTMLElement, drillId: string): void {
  const empty = document.createElement('div');
  empty.className = 'empty-state';
  const t = document.createElement('h3');
  t.textContent = 'Drill not found';
  const s = document.createElement('p');
  s.textContent = `No drill registered for "${drillId}".`;
  empty.appendChild(t);
  empty.appendChild(s);
  container.appendChild(empty);
}
