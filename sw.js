const CACHE_NAME = 'tafseer-cache-v1';
const ASSETS = [
  '/tafseer-library/',
  '/tafseer-library/index.html'
];

// تثبيت الـ Service Worker وحفظ الملفات الأساسية
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل الـ Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// الاستجابة لطلبات الشبكة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
