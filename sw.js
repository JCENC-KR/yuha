// 네트워크 우선 서비스워커: 인터넷이 되면 항상 최신 버전을 받고,
// 안 되면 마지막으로 받아둔 버전을 보여준다 (오프라인 지원 + 자동 업데이트)
const CACHE = "yuha-quiz-cache";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(clients.claim()));

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
