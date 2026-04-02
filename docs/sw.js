// myMedKitt — Service Worker
// Network-first for code, cache-first for images
// Ensures updates load immediately without manual cache clearing

const CACHE_NAME = 'medkitt-v382';

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
  './components/consult-wizard.js',
  './components/contextual-toolbar.js',
  './components/dashboard.js',
  './components/spotlight.js',
  './components/decision-card.js',
  './components/dosing-banner.js',
  './components/drug-store.js',
  './components/expandable-section.js',
  './components/info-page.js',
  './components/lab-interpreter.js',
  './components/overlay-panel.js',
  './components/quick-fire-mode.js',
  './components/reference-link.js',
  './components/reference-table.js',
  './components/specialty-view.js',
  './components/splash-screen.js',
  './components/text-renderer.js',

  // Services
  './services/cache-db.js',
  './services/category-service.js',
  './services/consult-flow-controller.js',
  './services/dosing-list.js',
  './services/drug-service.js',
  './services/info-service.js',
  './services/lab-parser.js',
  './services/router.js',
  './services/search-service.js',
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
  './data/trees/acetaminophen.js',
  './data/trees/acid-base.js',
  './data/trees/alcohol-withdrawal.js',
  './data/trees/adrenal-insufficiency.js',
  './data/trees/afib-rvr.js',
  './data/trees/anaphylaxis.js',
  './data/trees/angioedema.js',
  './data/trees/aub.js',
  './data/trees/bronchiolitis.js',
  './data/trees/burns.js',
  './data/trees/acute-pancreatitis.js',
  './data/trees/serotonin-syndrome.js',
  './data/trees/digoxin-toxicity.js',
  './data/trees/beta-blocker-od.js',
  './data/trees/ccb-od.js',
  './data/trees/iron-od.js',
  './data/trees/co-toxicity.js',
  './data/trees/guillain-barre.js',
  './data/trees/myasthenia-gravis.js',
  './data/trees/botulism.js',
  './data/trees/ecmo.js',
  './data/trees/chest-tube.js',
  './data/trees/chs.js',
  './data/trees/difficult-airway-bougie.js',
  './data/trees/croup.js',
  './data/trees/delirium.js',
  './data/trees/diarrhea.js',
  './data/trees/dka.js',
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
  './data/trees/opioid-withdrawal.js',
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
  './data/trees/salicylate.js',
  './data/trees/sepsis.js',
  './data/trees/shoulder-dystocia.js',
  './data/trees/sickle-cell.js',
  './data/trees/sodium.js',
  './data/trees/splinting.js',
  './data/trees/status-epilepticus.js',
  './data/trees/stemi.js',
  './data/trees/stroke.js',
  './data/trees/syncope.js',
  './data/trees/syphilis.js',
  './data/trees/tca-toxidrome.js',
  './data/trees/thyroid.js',
  './data/trees/tuberculosis.js',
  './data/trees/anticoag-reversal.js',
  './data/trees/combative-patient.js',
  './data/trees/hemophilia.js',
  './data/trees/uti-peds.js',
  './data/trees/aacg.js',
  './data/trees/chemical-burn.js',
  './data/trees/orbital-cellulitis.js',
  './data/trees/crao.js',
  './data/trees/globe-rupture.js',
  './data/trees/migraine.js',
  './data/trees/chf-exacerbation.js',
  './data/trees/snake-envenomation.js',
  './data/trees/epistaxis.js',
  './data/trees/urinary-retention.js',
  './data/trees/caustic-ingestion.js',
  './data/trees/diabetes-management.js',
  './data/trees/massive-transfusion.js',
  './data/trees/pelvic-fracture.js',
  './data/trees/psychiatry-assessment.js',
  './data/trees/push-dose-pressors.js',
  './data/trees/aortic-aneurysm.js',
  './data/trees/vp-shunt.js',
  './data/trees/measles.js',
  './data/trees/extensor-tendon.js',
  './data/trees/trach-emergency.js',
  './data/trees/methemoglobinemia.js',
  './data/trees/deep-neck-infection.js',
  './data/trees/peds-osteomyelitis.js',
  './data/trees/copd-exacerbation.js',
  './data/trees/septic-arthritis.js',
  './data/trees/hfnc.js',
  './data/trees/intralipid.js',
  './data/trees/rhabdomyolysis.js',
  './data/trees/viral-myositis.js',
  './data/trees/ed-methadone.js',
  './data/trees/nail-bed-injuries.js',
  './data/trees/eclampsia.js',
  './data/trees/aortic-dissection.js',
  './data/trees/peds-stec-hus.js',
  './data/trees/cvst.js',
  './data/trees/shoulder-dislocation.js',
  './data/trees/peds-submersion.js',
  './data/trees/brugada-syndrome.js',
  './data/trees/hd-emergencies.js',
  './data/trees/marine-envenomation.js',
  './data/trees/button-battery.js',
  './data/trees/nat-screening.js',
  './data/trees/vad.js',
  './data/trees/cardiogenic-shock.js',
  './data/trees/cervical-artery-dissection.js',
  './data/trees/code-status.js',
  './data/trees/dental-avulsion.js',
  './data/trees/heat-stroke.js',
  './data/trees/human-trafficking.js',
  './data/trees/laryngeal-trauma.js',
  './data/trees/massive-hemoptysis.js',
  './data/trees/pe-pregnancy.js',
  './data/trees/refractory-vfvt.js',
  './data/trees/suicide-risk-assessment.js',
  './data/trees/xylazine-toxicity.js',
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
