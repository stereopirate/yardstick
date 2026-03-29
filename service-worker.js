const CACHE_NAME = 'yardstick-v6';
const urlsToCache = [
'/',
'/index.html',
'/manifest.json',
'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js',
'https://cdn.tailwindcss.com'
];

// Install service worker and cache resources
self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
self.skipWaiting();
});

// Network-first for HTML (always get the latest index.html from the server).
// Cache-first for everything else (CDN scripts, images, etc.).
self.addEventListener('fetch', event => {
const url = new URL(event.request.url);
const isHtml = event.request.destination === 'document' ||
url.pathname === '/' ||
url.pathname.endsWith('.html');

if (isHtml) {
// Network-first: try network, fall back to cache if offline
event.respondWith(
fetch(event.request)
.then(response => {
// Update the cache with the fresh response
const clone = response.clone();
caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
return response;
})
.catch(() => caches.match(event.request))
);
} else {
// Cache-first: serve from cache, fall back to network
event.respondWith(
caches.match(event.request)
.then(response => response || fetch(event.request))
);
}
});

// Activate: delete old caches and claim all clients immediately
self.addEventListener('activate', event => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
Promise.all([
self.clients.claim(),
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (cacheWhitelist.indexOf(cacheName) === -1) {
return caches.delete(cacheName);
}
})
);
})
])
);
});
