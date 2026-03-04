// MedKitt — App Entry Point
// Registers service worker, sets up routes, renders views.
import { router } from './services/router.js';
import { renderCategoryGrid } from './components/category-grid.js';
import { renderCategoryView } from './components/category-view.js';
import { renderTreeWizard } from './components/tree-wizard.js';
import { renderReferencePanel } from './components/reference-table.js';
import { renderCalculator, renderCalculatorList } from './components/calculator.js';
import { renderDrugList } from './components/drug-store.js';
import { renderConsultWizard } from './components/consult-wizard.js';
import { ACUTE_STROKE_WIZARD } from './data/wizard-consults/acute-stroke.js';
import { initDrugs } from './services/drug-service.js';
import { initCategories } from './services/category-service.js';
import { initInfoPages } from './services/info-service.js';
// -------------------------------------------------------------------
// Service Worker Registration
// -------------------------------------------------------------------
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).then((reg) => {
            console.log('Service worker registered:', reg.scope);
            // Force update check on every page load
            reg.update();
        }).catch((err) => {
            console.error('Service worker registration failed:', err);
        });
        // Auto-reload when a new service worker takes control
        // This ensures updates are visible immediately without manual cache clearing
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }
}
// -------------------------------------------------------------------
// View Rendering Helpers
// -------------------------------------------------------------------
/** Get the main content container */
function getMain() {
    const el = document.getElementById('main-content');
    if (!el)
        throw new Error('Missing #main-content element');
    return el;
}
/** Clear main content and return the container */
function clearMain() {
    const main = getMain();
    main.innerHTML = '';
    return main;
}
/** Render a placeholder screen (will be replaced by real components in later tasks) */
function renderPlaceholder(title, subtitle, icon) {
    const main = clearMain();
    const container = document.createElement('div');
    container.className = 'empty-state';
    const iconEl = document.createElement('div');
    iconEl.className = 'empty-state-icon';
    iconEl.textContent = icon;
    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    const subtitleEl = document.createElement('p');
    subtitleEl.textContent = subtitle;
    container.appendChild(iconEl);
    container.appendChild(titleEl);
    container.appendChild(subtitleEl);
    main.appendChild(container);
}
// -------------------------------------------------------------------
// Theme & Tab Bar Management
// -------------------------------------------------------------------
/** Toggle home-light theme on body */
function setHomeTheme(isHome) {
    if (isHome) {
        document.body.classList.add('home-light');
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#F5F5F7');
    }
    else {
        document.body.classList.remove('home-light');
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0f0f1a');
    }
}
/** Update bottom tab bar active state */
function updateTabBar(activeTab) {
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        const tabId = tab.getAttribute('data-tab');
        if (tabId === activeTab) {
            tab.classList.add('active');
        }
        else {
            tab.classList.remove('active');
        }
    });
}
// -------------------------------------------------------------------
// Route Handlers
// -------------------------------------------------------------------
function handleHome(_params) {
    setHomeTheme(true);
    updateTabBar('home');
    const main = clearMain();
    renderCategoryGrid(main);
}
function handleCategory(params) {
    setHomeTheme(false);
    updateTabBar('');
    const id = params['id'] ?? 'unknown';
    const main = clearMain();
    renderCategoryView(main, id);
}
function handleTree(params) {
    setHomeTheme(false);
    updateTabBar('');
    const id = params['id'] ?? 'unknown';
    const main = clearMain();
    void renderTreeWizard(main, id);
}
function handleTreeNode(params) {
    setHomeTheme(false);
    updateTabBar('');
    const treeId = params['id'] ?? 'unknown';
    const nodeId = params['nodeId'] ?? 'unknown';
    renderPlaceholder(`Node: ${nodeId}`, `In tree: ${treeId}. Node rendering coming in Task 8.`, '\uD83D\uDD35');
}
function handleReference(params) {
    setHomeTheme(false);
    updateTabBar('');
    const main = clearMain();
    const treeId = params['treeId'];
    void renderReferencePanel(main, treeId);
}
function handleDrugList(_params) {
    setHomeTheme(false);
    updateTabBar('pharmacy');
    const main = clearMain();
    renderDrugList(main);
}
function handleCalculatorList(_params) {
    setHomeTheme(false);
    updateTabBar('med-calc');
    const main = clearMain();
    renderCalculatorList(main);
}
function handleCalculator(params) {
    setHomeTheme(false);
    updateTabBar('med-calc');
    const id = params['id'] ?? 'unknown';
    const main = clearMain();
    renderCalculator(main, id);
}
function handleWizard(params) {
    setHomeTheme(false);
    updateTabBar('');
    const id = params['id'] ?? 'unknown';
    const main = clearMain();
    // Map wizard IDs to data
    const wizardData = {
        'acute-stroke': ACUTE_STROKE_WIZARD,
    };
    const consult = wizardData[id];
    if (consult) {
        renderConsultWizard(main, consult);
    }
    else {
        renderPlaceholder(`Wizard: ${id}`, 'Consult wizard data not found.', '\u{1F50D}');
    }
}
function handleNotFound() {
    setHomeTheme(false);
    updateTabBar('');
    renderPlaceholder('Page Not Found', 'This route doesn\u2019t exist. Tap back or go home.', '\u2753');
    const main = getMain();
    const homeBtn = document.createElement('button');
    homeBtn.className = 'btn-primary';
    homeBtn.textContent = 'Go Home';
    homeBtn.style.marginTop = '16px';
    homeBtn.addEventListener('click', () => router.navigate('/'));
    main.querySelector('.empty-state')?.appendChild(homeBtn);
}
// -------------------------------------------------------------------
// Initialize
// -------------------------------------------------------------------
async function init() {
    registerServiceWorker();
    // Initialize data services (loads from IndexedDB/Supabase/hardcoded fallback)
    await Promise.all([initDrugs(), initCategories(), initInfoPages()]);
    // Tab bar click delegation
    const tabBar = document.getElementById('bottom-tab-bar');
    if (tabBar) {
        tabBar.addEventListener('click', (e) => {
            const target = e.target.closest('.tab-item');
            if (!target)
                return;
            e.preventDefault();
            const href = target.getAttribute('href');
            if (href) {
                const path = href.replace('#', '');
                router.navigate(path);
            }
        });
    }
    // Register routes
    router.on('/', handleHome);
    router.on('/category/:id', handleCategory);
    router.on('/tree/:id', handleTree);
    router.on('/tree/:id/node/:nodeId', handleTreeNode);
    router.on('/reference/:treeId', handleReference);
    router.on('/reference', handleReference);
    router.on('/drugs', handleDrugList);
    router.on('/calculators', handleCalculatorList);
    router.on('/calculator/:id', handleCalculator);
    router.on('/wizard/:id', handleWizard); // New wizard route
    router.onNotFound(handleNotFound);
    // Start routing
    router.start();
}
// Boot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
}
else {
    init();
}
