import { addRecentConsult } from './dashboard.js';
import { trackConsultOpen } from '../services/kittmd-analytics.js';
import { router } from '../services/router.js';

const PROCEDURE_APPS: Record<string, { title: string; entry: string }> = {
  'chest-tube': { title: 'Chest Tube', entry: 'ctube-start' },
  'thoracotomy-procedure': { title: 'Resuscitative Thoracotomy', entry: 'thorac-start' },
  'arterial-line': { title: 'A-Line · Arterial Line', entry: 'aline-start' },
};

/** Original procedure screens, isolated from the host styles. */
export function renderProcedureApp(main: HTMLElement, id: string): boolean {
  const app = PROCEDURE_APPS[id];
  if (!app) return false;
  addRecentConsult(id, app.title, 'procedures');
  trackConsultOpen(id);
  document.querySelector<HTMLElement>('.app-header')?.style.setProperty('display', 'none');
  const shell = document.createElement('section');
  shell.className = 'procedure-app-shell';
  const nav = document.createElement('nav');
  nav.className = 'procedure-app-nav';
  nav.setAttribute('aria-label', 'Procedure navigation');
  const back = document.createElement('button');
  back.className = 'btn-3d';
  back.textContent = '← Back';
  back.onclick = () => window.history.length > 1 ? window.history.back() : router.navigate('/category/procedures');
  const home = document.createElement('a');
  home.href = '#/category/procedures';
  home.textContent = 'Procedures';
  const reference = document.createElement('a');
  reference.href = `#/tree/${id}/node/${app.entry}`;
  reference.textContent = 'Reference pathway';
  nav.append(back, home, reference);
  const frame = document.createElement('iframe');
  frame.title = app.title;
  frame.allow = 'clipboard-write; web-share';
  frame.src = `./procedures/${id}/index.html`;
  // Original first-party scripts run inside their own document; no third-party frames.
  // Trusted bundled application code, with the same origin and CSP boundary as myMedKitt.
  shell.append(nav, frame);
  main.append(shell);
  return true;
}
