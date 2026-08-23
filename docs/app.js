// myMedKitt — App Entry Point
// Registers service worker, sets up routes, renders views.
// Pearl white theme — no dark/light toggle needed.
import { router } from './services/router.js';
import { renderDashboard } from './components/dashboard.js';
import { renderSpecialtyView } from './components/specialty-view.js';
import { renderConsultFlow } from './components/consult-flow.js';
import { renderLearnHome } from './components/learn-home.js';
import { renderHubsHome } from './components/hubs-home.js';
import { renderTricksHome, renderTricksSpecialty } from './components/tricks-home.js';
import { renderLearnRotation } from './components/learn-rotation.js';
import { renderLearnCard } from './components/learn-card.js';
import { renderLearnPreRound } from './components/learn-pre-round.js';
import { renderLearnShelfSummary } from './components/learn-shelf-summary.js';
import { renderLearnDrill } from './components/learn-drill.js';
import { renderReferencePanel } from './components/reference-table.js';
import { renderCalculator, renderCalculatorList } from './components/calculator.js';
import { renderDrugList } from './components/drug-store.js';
import { initDrugs } from './services/drug-service.js';
import { initCategories } from './services/category-service.js';
import { initInfoPages } from './services/info-service.js';
import { addSharedConsult, markOrganicVisit, hasFullAccess } from './services/shared-mode.js';
import { showSplashScreen } from './components/splash-screen.js';
import { removeContextualToolbar, hasContextualToolbar } from './components/contextual-toolbar.js';
import { showInfoModal } from './components/info-page.js';
import { resolveNodeTreeId, setCurrentTreeId } from './services/node-resolver.js';
// -------------------------------------------------------------------
// Service Worker Registration
// -------------------------------------------------------------------
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).then((reg) => {
            console.log('Service worker registered:', reg.scope);
            reg.update();
            // iOS PWA quirk: a backgrounded app never re-checks sw.js until
            // something triggers navigation. Kick an update check every time the
            // page becomes visible so a fresh deploy always reaches the user.
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible')
                    reg.update();
            });
        }).catch((err) => {
            console.error('Service worker registration failed:', err);
        });
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }
}
// -------------------------------------------------------------------
// View Rendering Helpers
// -------------------------------------------------------------------
function getMain() {
    const el = document.getElementById('main-content');
    if (!el)
        throw new Error('Missing #main-content element');
    return el;
}
let homeScrollTop = 0;
function clearMain() {
    const main = getMain();
    if (main.querySelector('.dashboard') || main.querySelector('.rolodex')) {
        homeScrollTop = main.scrollTop;
    }
    main.innerHTML = '';
    // Reset scroll on every route change so Pharmacy/Med-Calc/specialty views
    // don't open mid-list (hiding back button + title) after exiting a consult.
    // handleHome restores homeScrollTop after rendering the dashboard.
    main.scrollTop = 0;
    // Restore app header (dashboard hides it)
    const appHeader = document.querySelector('.app-header');
    if (appHeader)
        appHeader.style.display = '';
    return main;
}
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
    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'empty-state-back';
    backBtn.textContent = '\u2190 Back to Home';
    backBtn.addEventListener('click', () => {
        router.navigate('/');
    });
    container.appendChild(iconEl);
    container.appendChild(titleEl);
    container.appendChild(subtitleEl);
    container.appendChild(backBtn);
    main.appendChild(container);
}
// -------------------------------------------------------------------
// Tab Bar Management
// -------------------------------------------------------------------
/** Show/hide the global tab bar and set active state */
function showGlobalTabBar(activeTab) {
    const tabBar = document.getElementById('bottom-tab-bar');
    if (!tabBar)
        return;
    tabBar.style.display = '';
    const tabs = tabBar.querySelectorAll('.tab-item');
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
function hideGlobalTabBar() {
    const tabBar = document.getElementById('bottom-tab-bar');
    if (tabBar)
        tabBar.style.display = 'none';
}
// -------------------------------------------------------------------
// Route Handlers
// -------------------------------------------------------------------
function handleHome(_params) {
    if (!hasFullAccess()) {
        markOrganicVisit();
    }
    removeContextualToolbar();
    showGlobalTabBar('home');
    const main = clearMain();
    renderDashboard(main);
    // Restore scroll after render
    requestAnimationFrame(() => {
        main.scrollTop = homeScrollTop;
    });
}
function handleCategory(params) {
    removeContextualToolbar();
    hideGlobalTabBar();
    const id = params['id'] ?? 'unknown';
    const main = clearMain();
    renderSpecialtyView(main, id);
}
function handleTree(params) {
    hideGlobalTabBar();
    const id = params['id'] ?? 'unknown';
    setCurrentTreeId(id);
    const main = clearMain();
    void renderConsultFlow(main, id);
}
function handleTreeNode(params) {
    hideGlobalTabBar();
    const treeId = params['id'] ?? 'unknown';
    const nodeId = params['nodeId'] ?? 'unknown';
    setCurrentTreeId(treeId);
    const main = clearMain();
    void renderConsultFlow(main, treeId, { jumpToNodeId: nodeId });
}
/**
 * Bare node deep-link: `#/node/<nodeId>` with no consult in the path.
 *
 * ~3,200 in-body markdown links across consults, stop pages and info pages are
 * authored this way. No route ever matched them, so they all fell through to the
 * not-found handler and left the clinician on a blank screen mid-consult (verified
 * live in production 2026-08-23). We resolve the owning consult and redirect to the
 * canonical /tree/:id/node/:nodeId so there is still exactly one real node route.
 */
function handleBareNode(params) {
    const nodeId = params['nodeId'] ?? '';
    void resolveNodeTreeId(nodeId).then((treeId) => {
        // The user may have navigated away while the map was fetching. Only act if
        // the hash still points at the link we were asked to resolve.
        if (!window.location.hash.includes(`/node/${nodeId}`))
            return;
        if (treeId) {
            router.navigate(`/tree/${treeId}/node/${nodeId}`, { replace: true });
        }
        else {
            handleNotFound();
        }
    });
}
function handleReference(params) {
    removeContextualToolbar();
    showGlobalTabBar('');
    const main = clearMain();
    const treeId = params['treeId'];
    void renderReferencePanel(main, treeId);
}
function handleDrugList(_params) {
    removeContextualToolbar();
    showGlobalTabBar('pharmacy');
    const main = clearMain();
    renderDrugList(main);
}
function handleCalculatorList(_params) {
    removeContextualToolbar();
    showGlobalTabBar('med-calc');
    const main = clearMain();
    renderCalculatorList(main);
}
function handleCalculator(params) {
    const id = params['id'] ?? 'unknown';
    // If opened from a consult toolbar, keep consult context (no global tab bar)
    const fromConsult = hasContextualToolbar();
    if (fromConsult) {
        // Keep contextual toolbar visible, hide global tab bar
        hideGlobalTabBar();
    }
    else {
        removeContextualToolbar();
        showGlobalTabBar('med-calc');
    }
    const main = clearMain();
    renderCalculator(main, id);
}
function handleShare(params) {
    const treeId = params['treeId'] ?? '';
    if (treeId) {
        addSharedConsult(treeId);
    }
    window.location.replace('#/tree/' + treeId);
}
function handleLearnHome(_params) {
    removeContextualToolbar();
    hideGlobalTabBar();
    const main = clearMain();
    renderLearnHome(main);
}
function handleHubsHome(_params) {
    removeContextualToolbar();
    hideGlobalTabBar();
    const main = clearMain();
    renderHubsHome(main);
}
function handleTricksHome(_params) {
    removeContextualToolbar();
    hideGlobalTabBar();
    const main = clearMain();
    renderTricksHome(main);
}
function handleTricksSpecialty(params) {
    removeContextualToolbar();
    hideGlobalTabBar();
    const main = clearMain();
    renderTricksSpecialty(main, params['specialtyId'] ?? '', params['anchorId']);
}
function handleLearnRotation(params) {
    removeContextualToolbar();
    hideGlobalTabBar();
    const rotationId = params['rotationId'] ?? 'unknown';
    const main = clearMain();
    renderLearnRotation(main, rotationId);
}
function handleLearnCard(params) {
    removeContextualToolbar();
    hideGlobalTabBar();
    const rotationId = params['rotationId'] ?? 'unknown';
    const cardId = params['cardId'] ?? 'unknown';
    const main = clearMain();
    renderLearnCard(main, rotationId, cardId);
}
function handleLearnPreRound(params) {
    removeContextualToolbar();
    hideGlobalTabBar();
    const rotationId = params['rotationId'] ?? 'unknown';
    const main = clearMain();
    renderLearnPreRound(main, rotationId);
}
function handleLearnShelf(params) {
    removeContextualToolbar();
    hideGlobalTabBar();
    const rotationId = params['rotationId'] ?? 'unknown';
    const main = clearMain();
    renderLearnShelfSummary(main, rotationId);
}
function handleLearnDrill(params) {
    removeContextualToolbar();
    hideGlobalTabBar();
    const rotationId = params['rotationId'] ?? 'unknown';
    const drillId = params['drillId'] ?? 'unknown';
    const main = clearMain();
    renderLearnDrill(main, rotationId, drillId);
}
function handleNotFound() {
    removeContextualToolbar();
    showGlobalTabBar('');
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
    // Show splash screen while data loads
    const splashPromise = showSplashScreen();
    // Initialize data services
    await Promise.all([initDrugs(), initCategories(), initInfoPages()]);
    // Wait for splash to finish
    await splashPromise;
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
    router.on('/share/:treeId', handleShare);
    router.on('/category/:id', handleCategory);
    router.on('/tree/:id', handleTree);
    router.on('/tree/:id/node/:nodeId', handleTreeNode);
    // Bare node deep-link used by ~3,200 in-body markdown links across consults,
    // stop pages and info pages. Resolves the owning consult, then redirects to the
    // canonical /tree/:id/node/:nodeId above. See handleBareNode.
    router.on('/node/:nodeId', handleBareNode);
    // Legacy URL compatibility: /consult/:id used by old QR codes/links → redirect to /tree/:id
    router.on('/consult/:id', (params) => {
        router.navigate('/tree/' + params.id);
    });
    router.on('/consult/:id/node/:nodeId', (params) => {
        router.navigate('/tree/' + params.id + '/node/' + params.nodeId);
    });
    router.on('/reference/:treeId', handleReference);
    router.on('/reference', handleReference);
    router.on('/drugs', handleDrugList);
    router.on('/calculators', handleCalculatorList);
    router.on('/calculator/:id', handleCalculator);
    // Info-page overlay route — matches inline #/info/<id> body links used by hub
    // consults' "Open first" cross-links (e.g., aj-steps, aj-stop). Opens the
    // existing info modal over whatever's currently rendered. If the underlying
    // view is the splash / nothing (direct URL hit or share-link), render the
    // dashboard first so the close-x has somewhere meaningful to dismiss back to.
    router.on('/info/:id', (params) => {
        const main = document.getElementById('main-content');
        const isEmpty = !main || main.children.length === 0;
        if (isEmpty) {
            handleHome({});
        }
        const ok = showInfoModal(params.id);
        if (!ok) {
            handleNotFound();
        }
    });
    router.on('/learn', handleLearnHome);
    router.on('/hubs', handleHubsHome);
    router.on('/tricks', handleTricksHome);
    router.on('/tricks/:specialtyId', handleTricksSpecialty);
    router.on('/tricks/:specialtyId/trick/:anchorId', handleTricksSpecialty);
    router.on('/learn/:rotationId', handleLearnRotation);
    router.on('/learn/:rotationId/card/:cardId', handleLearnCard);
    router.on('/learn/:rotationId/pre-round', handleLearnPreRound);
    router.on('/learn/:rotationId/shelf', handleLearnShelf);
    router.on('/learn/:rotationId/drill/:drillId', handleLearnDrill);
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
