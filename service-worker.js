const CACHE_NAME = ‘yardstick-v2’;
const urlsToCache = [
‘/’,
‘/index.html’,
‘/manifest.json’,
‘https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js’,
‘https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js’,
‘https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js’,
‘https://cdn.tailwindcss.com’
];

// Install service worker and cache resources
self.addEventListener(‘install’, event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
console.log(‘Opened cache’);
return cache.addAll(urlsToCache);
})
);
});

// Fetch from cache when offline
self.addEventListener(‘fetch’, event => {
event.respondWith(
caches.match(event.request)
.then(response => {
// Cache hit - return response
if (response) {
return response;
}
return fetch(event.request);
}
)
);
});

// Update service worker
self.addEventListener(‘activate’, event => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (cacheWhitelist.indexOf(cacheName) === -1) {
return caches.delete(cacheName);
}
})
);
})
);
});
