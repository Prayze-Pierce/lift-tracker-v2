
const CACHE_NAME =
    "lift-tracker-v2-2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];


/* =========================================
   INSTALL
========================================= */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(
                    cache =>
                        cache.addAll(
                            FILES_TO_CACHE
                        )
                )
        );


        /*
            Activate this new service
            worker immediately.
        */

        self.skipWaiting();
    }
);


/* =========================================
   ACTIVATE
========================================= */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
                .keys()
                .then(
                    cacheNames => {

                        return Promise.all(

                            cacheNames.map(
                                cacheName => {

                                    if (
                                        cacheName !==
                                        CACHE_NAME
                                    ) {

                                        return caches.delete(
                                            cacheName
                                        );
                                    }
                                }
                            )
                        );
                    }
                )
        );


        /*
            Take control of the page
            immediately.
        */

        self.clients.claim();
    }
);


/* =========================================
   FETCH
========================================= */

self.addEventListener(
    "fetch",
    event => {

        /*
            Only handle normal GET
            requests.
        */

        if (
            event.request.method !==
            "GET"
        ) {

            return;
        }


        event.respondWith(

            /*
                Try the newest version
                from the internet first.
            */

            fetch(
                event.request
            )

                .then(
                    response => {

                        /*
                            Save a fresh copy
                            for offline use.
                        */

                        const copy =
                            response.clone();


                        caches
                            .open(
                                CACHE_NAME
                            )
                            .then(
                                cache => {

                                    cache.put(
                                        event.request,
                                        copy
                                    );
                                }
                            );


                        return response;
                    }
                )


                /*
                    If internet fails,
                    use our cached copy.
                */

                .catch(
                    () => {

                        return caches.match(
                            event.request
                        );
                    }
                )
        );
    }
);