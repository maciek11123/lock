const CACHE = 'lock-v6';
const URLS = [
  '/lock/host.html',
  '/lock/remote-full.html',
  '/lock/remote-simple.html',
  '/lock/ai-remote.html',
  '/lock/watch.html',
  '/lock/alarm.html'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE).map(k => caches.delete(k))
  )));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
