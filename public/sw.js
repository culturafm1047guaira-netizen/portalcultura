const CACHE_NAME = 'radiocultura-v3';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/api.js',
  './js/player.js',
  './js/main.js',
  './img/logo_oficial.png',
  './img/favicon.png',
  './img/banner-festa-peao.jpg',
  './manifest.json'
];

const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

const CACHE_CONFIG = {
  api: { pattern: /\/api\//, strategy: CACHE_STRATEGIES.NETWORK_FIRST },
  images: { pattern: /\.(png|jpg|jpeg|svg|webp)/, strategy: CACHE_STRATEGIES.CACHE_FIRST },
  fonts: { pattern: /fonts\./, strategy: CACHE_STRATEGIES.CACHE_FIRST },
  static: { pattern: /./, strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE }
};

self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)),
      fetch(OFFLINE_URL).catch(() => caches.match('./index.html'))
    ])
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

function getStrategy(request) {
  const url = new URL(request.url);
  if (url.origin !== location.origin) return CACHE_STRATEGIES.NETWORK_FIRST;
  
  for (const [key, config] of Object.entries(CACHE_CONFIG)) {
    if (config.pattern.test(url.pathname)) {
      return config.strategy;
    }
  }
  return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  const response = await fetch(request);
  if (response && response.status === 200) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return caches.match(request) || caches.match('./index.html');
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    if (response && response.status === 200) {
      caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
    }
    return response;
  }).catch(() => cached);
  
  return cached || fetchPromise;
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('chrome-extension://')) return;

  const strategy = getStrategy(event.request);
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      event.respondWith(cacheFirst(event.request));
      break;
    case CACHE_STRATEGIES.NETWORK_FIRST:
      event.respondWith(networkFirst(event.request));
      break;
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      event.respondWith(staleWhileRevalidate(event.request));
      break;
  }
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});