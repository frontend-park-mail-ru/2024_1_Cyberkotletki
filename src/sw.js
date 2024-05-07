/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'SW_CACHE_V4';

const CACHE_PATHS = ['/'];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(CACHE_PATHS))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);

            if (r && !navigator.onLine) {
                return r;
            }

            const response = await fetch(e.request);

            if (!navigator.onLine) {
                return response;
            }

            if (e.request.method === 'GET' && !r) {
                const cache = await caches.open(CACHE_NAME);

                cache.put(e.request, response.clone());
            }

            return response;
        })(),
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(
                keyList.map((key) => {
                    if (key === CACHE_NAME) {
                        return;
                    }

                    return caches.delete(key);
                }),
            ),
        ),
    );
});
