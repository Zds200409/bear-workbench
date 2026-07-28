// 熊熊工作台 Service Worker —— 缓存应用外壳，重复打开秒开 + 弱网/离线可用
const CACHE = 'bear-workbench-v1';
const ASSETS = ['./', './index.html', './icon.svg', './manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // 跨域资源（如真实新闻 API）不缓存，直接走网络
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req).then(cached => {
        // 先返回缓存（秒开），同时后台拉新版本，下次打开即更新
        const network = fetch(req)
          .then(res => { cache.put(req, res.clone()); return res; })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});
