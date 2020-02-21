if ("function" === typeof importScripts) {
    importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");
    /* global workbox */
    if (workbox) {
        console.log("Workbox is loaded");

        /* injection point for manifest files.  */
        workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "5986bc420dd6d3dd73aa219f4e691ca6"
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
    "url": "static/js/main.9f64c2f4.chunk.js",
    "revision": "34c64fc455f89a1ea671462eaed366e7"
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
