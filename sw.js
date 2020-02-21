if ("function" === typeof importScripts) {
    importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");
    /* global workbox */
    if (workbox) {
        console.log("Workbox is loaded");

        /* injection point for manifest files.  */
        workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "d954c1573100000e0ef4d5df8f574f4c"
  },
  {
    "url": "PPR_C.png",
    "revision": "81aa9e7e65162b4a606bd91f7f552cd5"
  },
  {
    "url": "static/js/2.075df5c7.chunk.js",
    "revision": "ab859d4d52faa7aa74ba992af3385e86"
  },
  {
    "url": "static/js/main.b7d0935c.chunk.js",
    "revision": "759cdb75ddcdb28bfb48b2db1d8d1e2f"
  },
  {
    "url": "static/js/runtime-main.fb7e6c41.js",
    "revision": "3836d62d0e4f57702ddc4fd6141c9d9c"
  },
  {
    "url": "static/media/logo.81aa9e7e.png",
    "revision": "81aa9e7e65162b4a606bd91f7f552cd5"
  }
]);

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
