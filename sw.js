const CACHE_NAME = 'tafseer-cache-v1';
const ASSETS = [
  '/tafseer-library/',
  '/tafseer-library/index.html',
  '/tafseer-library/manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
