// Service Worker für Offline-Betrieb der DFB-Drehscheibe-App.
// Strategie:
//  - Navigationen (HTML): network-first mit Fallback auf den gecachten App-Shell.
//  - Übrige GET-Anfragen (JS/CSS/Fonts/3D-Assets, auch cross-origin):
//    stale-while-revalidate – sofort aus dem Cache, im Hintergrund aktualisieren.

const CACHE = "rhb-drehscheibe-v1";
const APP_SHELL = ["/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  // HTML-Navigationen: zuerst Netzwerk, sonst App-Shell aus dem Cache.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put("/", copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match("/");
          return cached ?? Response.error();
        }),
    );
    return;
  }

  // Übrige Anfragen: stale-while-revalidate.
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request);

      const network = fetch(request)
        .then((response) => {
          // Nur erfolgreiche, gleich- oder cross-origin (opaque) Antworten cachen.
          if (response && (response.ok || response.type === "opaque")) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => cached);

      return cached ?? network;
    }),
  );
});
