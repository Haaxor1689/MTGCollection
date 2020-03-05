/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */

if ("function" === typeof importScripts) {
    importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");

    /* global workbox */
    if (workbox) {
        console.log("Workbox is loaded");

        self.__WB_MANIFEST;

        /* injection point for manifest files.  */
        workbox.precaching.precacheAndRoute([]);

        /* custom cache rules*/
        workbox.routing.registerNavigationRoute("/index.html", {
            blacklist: [/^\/_/, /\/[^/]+\.[^/]+$/],
        });

        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg|svg)$/,
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

        workbox.routing.registerRoute(
            /https:\/\/img.scryfall.com\/cards\/.*(?:png|gif|jpg|jpeg).*/,
            workbox.strategies.cacheFirst({
                cacheName: "scryfall_cards",
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    }),
                ],
            })
        );

        workbox.routing.registerRoute(
            /https:\/\/img.scryfall.com\/symbology\/.*\.svg*/,
            workbox.strategies.cacheFirst({
                cacheName: "scryfall_symbols",
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
