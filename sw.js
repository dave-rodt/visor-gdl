// Offline support. App files: network first (updates show up), cache as fallback.
// Terrain tiles and photos never change: cache first, so the roof works with weak signal.
const APP = "visor-app-v3";
const DATA = "visor-data-v1";
const APP_FILES = ["./", "index.html", "geo.js", "terrain.js", "landmarks.js", "i18n.js", "info/info.json", "manifest.webmanifest", "icon-192.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(APP).then((c) => c.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== APP && k !== DATA).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.pathname.startsWith("/elevation-tiles-prod/") || url.pathname.includes("/info/img/")) {
    e.respondWith(caches.open(DATA).then(async (c) => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      const r = await fetch(e.request);
      if (r.ok) c.put(e.request, r.clone());
      return r;
    }));
  } else if (url.origin === location.origin) {
    // no-cache: always ask the server, so an installed app never keeps an old landmarks.js.
    e.respondWith(fetch(e.request, { cache: "no-cache" }).then((r) => {
      if (r.ok) { const copy = r.clone(); caches.open(APP).then((c) => c.put(e.request, copy)); }
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true })));
  }
});
