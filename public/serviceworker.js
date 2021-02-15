const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', '/', 'static/js/main.chunk.js', 'static/js/0.chunk.js','static/js/bundle.js', 'images/bg.jpg', 'images/logo.png', 'manifest.json' ];


// const urlsToCache = [ 'index.html', 'offline.html']

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((resp) => {
                // return fetch(resp) 
                //     .catch(() => caches.match('offline.html'))
                return resp;
            })
    )
});



// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});