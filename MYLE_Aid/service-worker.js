//<!--- service-worker.js --->
//<!--- Programme par : Eric Gosselin --->
//<!--- Derniere modification : 202-08-22 --->

//Update cache names any time any of the cached files change.
const CACHE_NAME = "static-cache-v3";

//Add list of files to cache here.
const FILES_TO_CACHE = [
  "index.html",
  "cn.html",
  "cn-allied.html",
  "cn-nurse.html",
  "contact.html",
  "offline.html",
  "js/install.js"
  // AJOUTER ICI TOUTES LES IMAGES DU SITE
];


self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  // Precache static resources here.
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});


self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  //Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);
  //Add fetch event handler here.
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request)
    .catch(() => {
      return caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.match('/GitHub/CHB/Projet_PWA_MYLE/offline.html');
        });
    })
  );
});

// Register service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((reg) => {
        console.log('Service worker registered.', reg);
      });
  });
}