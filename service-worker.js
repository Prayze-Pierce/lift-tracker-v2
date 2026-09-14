const CACHE_NAME = "lift-tracker-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json"
];


// Install the service worker.
self.addEventListener("install", event => {

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(FILES_TO_CACHE);
            })

    );

});


// Remove old caches when we update versions later.
self.addEventListener("activate", event => {

    event.waitUntil(

        caches
            .keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames.map(cacheName => {

                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }

                    })

                );

            })

    );

});


// Serve cached files when possible.
self.addEventListener("fetch", event => {

    event.respondWith(

        caches
            .match(event.request)
            .then(response => {

                return response || fetch(event.request);

            })

    );

});