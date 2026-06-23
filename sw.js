const CACHE_NAME = 'provenant-v2';

// We use relative paths here so that the Service Worker is fully compatible
// with both local hosting environments and GitHub Pages subdirectories.
const ASSETS = [
  'creators.html',
  'manifest.json',
  'images/icon-192.png',
  'images/icon-512.png',
  'https://cdn.tailwindcss.com'
];

// The install event opens the cache and saves all defined assets locally
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell and icons...');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate event handles cache cleanup when you increment the version name
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// The fetch event intercepts requests to serve assets instantly from the local cache offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
