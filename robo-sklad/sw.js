// Service worker «Робо-Склад»: гра працює офлайн.
// Під час кожного оновлення гри змінюй VERSION, щоб браузер підтягнув нові файли.
const VERSION = "robo-sklad-v1";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "fonts/fonts.css",
  "fonts/rubik-cyrillic-500-normal.woff2",
  "fonts/rubik-cyrillic-600-normal.woff2",
  "fonts/rubik-cyrillic-700-normal.woff2",
  "fonts/rubik-cyrillic-800-normal.woff2",
  "fonts/rubik-latin-500-normal.woff2",
  "fonts/rubik-latin-600-normal.woff2",
  "fonts/rubik-latin-700-normal.woff2",
  "fonts/rubik-latin-800-normal.woff2",
  "fonts/unbounded-cyrillic-700-normal.woff2",
  "fonts/unbounded-cyrillic-800-normal.woff2",
  "fonts/unbounded-latin-700-normal.woff2",
  "fonts/unbounded-latin-800-normal.woff2",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-192.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("robo-sklad-") && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // Сторінка: спершу мережа (щоб бачити свіжу версію), без мережі — з кешу.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put("index.html", copy)); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }
  // Шрифти, іконки та інше: спершу кеш.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
