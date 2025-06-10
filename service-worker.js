// This is a very basic service worker.
// For a full PWA, you'd add caching strategies here for offline support.
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    self.skipWaiting(); // Activates the new service worker immediately
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        // Clean up old caches if any
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== 'my-app-cache-v1') { // Replace with your desired cache name
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // For this simple test, we're not doing much with fetch,
    // but in a real PWA, this is where you'd handle network requests
    // and serve cached content when offline.
    event.respondWith(fetch(event.request));
});

console.log('Service Worker script loaded.');