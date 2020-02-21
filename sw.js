if ("function" === typeof importScripts) {
    importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");
    console.log("Workbox");
    /* global workbox */
    if (workbox) {
        console.log("Workbox is loaded");

        [{"revision":"4e05cb914094bb5c8270c06a34e503b1","url":"index.html"},{"revision":"81aa9e7e65162b4a606bd91f7f552cd5","url":"PPR_C.png"},{"revision":"65dafb4b06945452a86858a158397586","url":"static/js/2.7e6078e4.chunk.js"},{"revision":"9e6116c8017dcfdfcb62d471559ebbe5","url":"static/js/main.1cf413f5.chunk.js"},{"revision":"61784f337be6cd34407383d7185a9a2c","url":"static/js/runtime-main.802e3f51.js"},{"revision":"81aa9e7e65162b4a606bd91f7f552cd5","url":"static/media/logo.81aa9e7e.png"}];

        /* injection point for manifest files.  */
        workbox.precaching.precacheAndRoute([]);

        /* custom cache rules*/
        workbox.routing.registerNavigationRoute("/index.html", {
            blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
        });

        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg)$/,
            workbox.strategies.cacheFirst({
                cacheName: "images",
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    }),
                ],
            })
        );
    } else {
        console.log("Workbox could not be loaded. No Offline support");
    }
}
console.log("FML");
