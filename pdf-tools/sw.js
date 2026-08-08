const CACHE_NAME = 'kagaz-libs-v1';
const ASSETS = [
  './', './index.html',
  './libs/pdflib.js', './libs/pdfjs.js', './libs/pdfworker.js',
  './libs/jspdf.js', './libs/autotable.js', './libs/mammoth.js',
  './libs/xlsx.js', './libs/jszip.js', './libs/html2canvas.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if(url.origin !== self.location.origin) return;
  if(url.pathname.endsWith('/index.html') || url.pathname.endsWith('/') || url.pathname.includes('/libs/')){
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy=response.clone();
      caches.open(CACHE_NAME).then(c=>c.put(event.request,copy));
      return response;
    })));
  }
});
