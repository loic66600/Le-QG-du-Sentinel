const CACHE_NAME = 'qg-sentinel-offline-v3';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // NEVER intercept Vite dev server modules, HMR, source files, or API endpoints
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/node_modules/') ||
    url.search.includes('v=') ||
    url.search.includes('t=')
  ) {
    return;
  }

  // Only cache static production assets and OpenStreetMap tiles
  if (
    url.pathname.startsWith('/assets/') ||
    url.hostname.includes('openstreetmap.org')
  ) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, clone).catch(() => {});
            });
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});
