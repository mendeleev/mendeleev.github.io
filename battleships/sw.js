// Service worker «Морський бій»: гра працює офлайн.
// VERSION підставляє збірка (build.mjs): хеш вмісту гри, тож кеш оновлюється сам.
const VERSION = "battleships-d2ea825d8f";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "fonts/fonts.css",
  "fonts/unbounded-cyrillic-700-normal.woff2",
  "fonts/unbounded-latin-700-normal.woff2",
  "fonts/manrope-cyrillic-wght-normal.woff2",
  "fonts/manrope-latin-wght-normal.woff2",
  "fonts/ibm-plex-mono-cyrillic-600-normal.woff2",
  "fonts/ibm-plex-mono-latin-600-normal.woff2",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-192.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "vendor/mqtt.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("battleships-") && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // Сторінка: спершу мережа (щоб бачити свіжу версію), без мережі або за слабкого сигналу (3 с) — з кешу.
  if (req.mode === "navigate") {
    const scope = new URL(self.registration.scope).pathname;
    const path = new URL(req.url).pathname;
    const isGame = path === scope || path === scope + "index.html";
    e.respondWith((async () => {
      const cached = await caches.match("index.html");
      const net = fetch(req).then(res => {
        // кешуємо лише справжню сторінку гри, щоб помилкова адреса (404) не перезаписала гру
        if (res.ok && isGame) { const copy = res.clone(); caches.open(VERSION).then(c => c.put("index.html", copy)); }
        return res;
      });
      net.catch(() => {});
      if (!cached) return net;
      const slow = new Promise(r => setTimeout(() => r(null), 3000));
      try {
        const res = await Promise.race([net, slow]);
        return res || cached;
      } catch (err) {
        return cached;
      }
    })());
    return;
  }
  // Шрифти, іконки та інше: спершу кеш.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
