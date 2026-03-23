// myMedKitt — Service Worker
// Network-first for code, cache-first for images
// Ensures updates load immediately without manual cache clearing

const CACHE_NAME = 'medkitt-v231';

const ASSETS_TO_CACHE = [
  './',
  './app.html',
  './index.html',
  './style.css',
  './styles.css',
  './app.js',
  './manifest.json',
  './legal-banner.js',

  // Components
  './components/breadcrumb-nav.js',
  './components/button-3d.js',
  './components/calculator.js',
  './components/consult-flow.js',
  './components/consult-navigator.js',
  './components/consult-wizard.css',
  './components/consult-wizard.js',
  './components/contextual-toolbar.js',
  './components/dashboard.js',
  './components/decision-card.js',
  './components/drug-store.js',
  './components/expandable-section.js',
  './components/info-page.js',
  './components/lab-interpreter.js',
  './components/overlay-panel.js',
  './components/reference-link.js',
  './components/reference-table.js',
  './components/specialty-view.js',
  './components/splash-screen.js',
  './components/text-renderer.js',

  // Services
  './services/cache-db.js',
  './services/category-service.js',
  './services/consult-flow-controller.js',
  './services/drug-service.js',
  './services/info-service.js',
  './services/lab-parser.js',
  './services/router.js',
  './services/shared-mode.js',
  './services/storage.js',
  './services/supabase.js',
  './services/tree-engine.js',
  './services/tree-service.js',

  // Data
  './data/categories.js',
  './data/drug-store.js',
  './data/info-pages.js',
  './data/lab-panels.js',
  './data/toolbar-configs.js',

  // Decision trees
  './data/trees/index.js',
  './data/trees/afib-rvr.js',
  './data/trees/aub.js',
  './data/trees/bronchiolitis.js',
  './data/trees/burns.js',
  './data/trees/chest-tube.js',
  './data/trees/croup.js',
  './data/trees/diarrhea.js',
  './data/trees/distal-radius.js',
  './data/trees/echo-epss.js',
  './data/trees/echo-views.js',
  './data/trees/first-trimester.js',
  './data/trees/hiv.js',
  './data/trees/ich.js',
  './data/trees/meningitis.js',
  './data/trees/neonatal-resus.js',
  './data/trees/neurosyphilis.js',
  './data/trees/nstemi.js',
  './data/trees/pe-treatment.js',
  './data/trees/peds-fever.js',
  './data/trees/pep.js',
  './data/trees/pneumothorax.js',
  './data/trees/potassium.js',
  './data/trees/precip-delivery.js',
  './data/trees/priapism.js',
  './data/trees/psych-assessment.js',
  './data/trees/rabies.js',
  './data/trees/sah.js',
  './data/trees/shoulder-dystocia.js',
  './data/trees/sodium.js',
  './data/trees/splinting.js',
  './data/trees/status-epilepticus.js',
  './data/trees/stroke.js',
  './data/trees/uti-peds.js',
  './data/wizard-consults/acute-stroke.js',

  // Models & types
  './models/types.js',
  './types/consult-tree.js',

  // App icons
  './assets/app-icon-180.png',
  './assets/app-icon-192.png',
  './assets/app-icon-512.png',
  './assets/mymedkitt-bag-transparent.png'
];

// Install: pre-cache all static assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches, then force-reload open tabs on upgrade
// This solves the chicken-and-egg problem: old app.js may not have
// controllerchange listener, so the SW forces the reload from its side.
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      var oldCaches = cacheNames.filter(function(name) { return name !== CACHE_NAME; });
      var isUpgrade = oldCaches.length > 0;
      return Promise.all(
        oldCaches.map(function(name) { return caches.delete(name); })
      ).then(function() {
        return self.clients.claim();
      }).then(function() {
        // Force-reload all open tabs so they pick up the new code
        if (isUpgrade) {
          return self.clients.matchAll({ type: 'window' }).then(function(windowClients) {
            windowClients.forEach(function(client) {
              client.navigate(client.url);
            });
          });
        }
      });
    })
  );
});

// Fetch: network-first for code/data, cache-first for images/assets
self.addEventListener('fetch', function(event) {
  // Only handle same-origin GET requests
  if (event.request.method !== 'GET') return;

  var url = new URL(event.request.url);

  // Supabase API: pass through to network (IndexedDB handles caching)
  if (url.hostname.endsWith('supabase.co')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Images and icon assets: cache-first (large, rarely change)
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
    event.respondWith(
      caches.match(event.request).then(function(cachedResponse) {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(function(networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            var responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Everything else (JS, HTML, CSS, JSON): network-first
  // Bypasses browser HTTP cache to guarantee truly fresh code
  event.respondWith(
    fetch(new Request(event.request, { cache: 'no-cache' })).then(function(networkResponse) {
      if (networkResponse && networkResponse.status === 200) {
        var responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(function() {
      // Offline: fall back to cache
      return caches.match(event.request);
    })
  );
});
