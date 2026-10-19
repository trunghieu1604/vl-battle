// Lossless character art may live on the game's separate static asset host.
// Script transport avoids cross-origin canvas taint; each payload is SHA-256 checked before decoding.
import { readJson } from './json-data.js';
import { touchDevice } from './canvas-cache.js';
let delivery, versions;
const remoteJobs = new Map(), callbacks = new Map();
const imageJobs = new Map(), imageQueue = [], concurrency = touchDevice() ? 4 : 8;
let active = 0;
export const imageLoadStats = () => ({ active, queued: imageQueue.length, concurrency });
function drain() {
  while (active < concurrency && imageQueue.length) {
    const item = imageQueue.shift(); item.started = true; active++;
    Promise.resolve().then(item.run).then(item.resolve, item.reject).finally(() => { active--; drain(); });
  }
}
function deliveryMap() {
  return delivery ||= readJson(new URL('../data/player-art-delivery.json', import.meta.url)).then(d => d);
}
// Content fingerprints of the release (tools/build-web.cjs writes data/asset-hashes.json): an image is asked for as
// file?v=<hash>, which the server lets the browser keep for a year. Without the file (dist/, an old release) the plain
// address is used and the server revalidates it.
function versionMap() {
  // only a release served by server/index.cjs carries the file and honours ?v= (it injects __TIEUNGAO_SERVER__)
  if (globalThis.__TIEUNGAO_SERVER__?.enabled !== true) return versions ||= Promise.resolve({});
  return versions ||= fetch(new URL('../data/asset-hashes.json', import.meta.url), { cache: 'no-cache', credentials: 'same-origin' })
    .then(r => r.ok ? r.json() : null).then(v => v && typeof v.files === 'object' ? v.files : {}).catch(() => ({}));
}
window.__vltkPlayerArt = (id, encoded) => callbacks.get(id)?.(encoded);

// A transfer is given up only when it stops moving: no byte for STALL_MS. A large atlas on a slow line keeps loading
// as long as data arrives; a hung connection or a proxy error (5xx) is retried twice, 0.75 s then 1.5 s later.
const STALL_MS = () => globalThis.__imageStallMs || 20000;
const ATTEMPTS = 3;
function decode(src) {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im); im.onerror = () => reject(Error('Không giải mã được hình ' + src));
    im.src = src;
  });
}
async function download(url) {
  const controller = new AbortController();
  let timer;
  const arm = () => { clearTimeout(timer); timer = setTimeout(() => controller.abort(), STALL_MS()); };
  arm();
  try {
    const response = await fetch(url, { credentials: 'same-origin', signal: controller.signal });
    if (!response.ok) { const err = Error(`Không tải được ${url} (HTTP ${response.status})`); err.status = response.status; throw err; }
    if (!response.body) return await response.blob();
    const reader = response.body.getReader(), chunks = [];
    for (;;) { const { done, value } = await reader.read(); if (done) break; chunks.push(value); arm(); }
    return new Blob(chunks, { type: response.headers.get('Content-Type') || 'image/webp' });
  } catch (err) {
    if (controller.signal.aborted) throw Error(`Tải hình đứng im quá ${Math.round(STALL_MS() / 1000)} giây: ${url}`);
    throw err;
  } finally { clearTimeout(timer); }
}
// Fingerprinted images (?v=<hash>) are also kept in the page's Cache Storage: the browser's HTTP cache drops large entries
// (a 10 MB atlas, small phone caches), the Cache Storage keeps them until pruneArtCache removes an outdated version.
const ART_CACHE = 'vlst-art-v1';
const cacheable = url => typeof caches !== 'undefined' && /[?&]v=[0-9a-f]{8,}/.test(url);
async function cachedBlob(url) {
  try { const hit = await (await caches.open(ART_CACHE)).match(url); return hit ? await hit.blob() : null; } catch { return null; }
}
function remember(url, blob) {
  caches.open(ART_CACHE).then(c => c.put(url, new Response(blob, { headers: { 'Content-Type': blob.type || 'image/webp' } }))).catch(() => {});
}
// drop the stored images whose fingerprint is no longer the release's (called once the art is all in)
export async function pruneArtCache() {
  if (typeof caches === 'undefined') return 0;
  try {
    const files = await versionMap(), root = new URL('../', import.meta.url), keep = new Set();
    for (const [file, hash] of Object.entries(files)) { const u = new URL(file, root); u.searchParams.set('v', hash); keep.add(u.href); }
    if (!keep.size) return 0;
    const cache = await caches.open(ART_CACHE); let removed = 0;
    for (const request of await cache.keys()) if (!keep.has(request.url)) { await cache.delete(request); removed++; }
    return removed;
  } catch { return 0; }
}
async function ordinaryImage(url) {
  if (/^(blob:|data:)/i.test(String(url))) return decode(url);   // already in memory: a retry cannot help
  const store = cacheable(url);
  // the image is decoded from a blob: address; sourceUrl keeps the file it came from (debugging, QA)
  const named = image => { image.sourceUrl = String(url).split('?')[0]; return image; };
  if (store) {
    const blob = await cachedBlob(url);
    if (blob) { const objectUrl = URL.createObjectURL(blob); try { return named(await decode(objectUrl)); } catch {} finally { URL.revokeObjectURL(objectUrl); } }
  }
  let lastError;
  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    try {
      const blob = await download(url), objectUrl = URL.createObjectURL(blob);
      try { const image = named(await decode(objectUrl)); if (store) remember(url, blob); return image; } finally { URL.revokeObjectURL(objectUrl); }
    } catch (error) {
      lastError = error;
      if (error.status === 404 || error.status === 403) break;   // missing for good: say so at once
      if (attempt + 1 < ATTEMPTS) await new Promise(resolve => setTimeout(resolve, 750 * (attempt + 1)));
    }
  }
  throw lastError;
}
async function remoteImage(origin, entry) {
  if (remoteJobs.has(entry.sha256)) return remoteJobs.get(entry.sha256);
  const job = new Promise((resolve, reject) => {
    const script = document.createElement('script'); script.async = true;
    let settled = false;
    const clear = () => { clearTimeout(timer); callbacks.delete(entry.sha256); script.remove(); };
    const fail = err => { if (settled) return; settled = true; clear(); reject(err); };
    const timer = setTimeout(() => fail(Error('Kho hình nhân vật phản hồi chậm')), 45000);
    callbacks.set(entry.sha256, async encoded => {
      if (settled) return; settled = true; clear();
      let objectUrl;
      try {
        const bytes = Uint8Array.from(atob(encoded), c => c.charCodeAt(0));
        if (bytes.length !== entry.bytes) throw Error('Hình nhân vật không đủ dữ liệu');
        const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(b => b.toString(16).padStart(2, '0')).join('');
        if (hash !== entry.sha256) throw Error('Hình nhân vật không khớp bản phát hành');
        objectUrl = URL.createObjectURL(new Blob([bytes], { type: entry.mime }));
        resolve(await ordinaryImage(objectUrl));
      } catch (err) { reject(err); }
      finally { if (objectUrl) URL.revokeObjectURL(objectUrl); }
    });
    script.onerror = () => fail(Error('Không tải được hình nhân vật'));
    script.onload = () => { if (!settled) fail(Error('Kho hình nhân vật chưa đúng phiên bản')); };
    script.src = new URL(entry.file, origin.replace(/\/$/, '') + '/').href;
    document.head.append(script);
  });
  remoteJobs.set(entry.sha256, job);
  try { return await job; } finally { remoteJobs.delete(entry.sha256); }
}
async function fetchImage(url) {
  const full = new URL(url, document.baseURI), dataBase = new URL('../data/', import.meta.url), root = new URL('../', import.meta.url);
  if (full.href.startsWith(new URL('vltk/player/', dataBase).href)) {
    const d = await deliveryMap(), key = decodeURIComponent(full.href.slice(dataBase.href.length)), entry = d.files[key];
    if (entry) return remoteImage(d.origin, entry);
  }
  if (full.origin !== location.origin) return decode(full.href);   // another host: a plain <img> load, no CORS needed
  if (full.href.startsWith(root.href) && !full.search) {
    const hash = (await versionMap())[decodeURIComponent(full.pathname.slice(root.pathname.length))];
    if (hash) full.searchParams.set('v', hash);
  }
  return ordinaryImage(full.href);
}
// urgent: the image is needed now (the manual in the player's hand); it goes ahead of the background queue,
// and an image already waiting in the queue is moved to the front.
export function loadImage(url, { urgent = false } = {}) {
  const key = new URL(url, document.baseURI).href;
  if (imageJobs.has(key)) {
    const job = imageJobs.get(key);
    if (urgent) { const i = imageQueue.findIndex(q => q.key === key); if (i > 0) imageQueue.unshift(...imageQueue.splice(i, 1)); }
    return job;
  }
  const job = new Promise((resolve, reject) => {
    const item = { key, run: () => fetchImage(url), resolve, reject };
    if (urgent) imageQueue.unshift(item); else imageQueue.push(item);
    drain();
  }).finally(() => imageJobs.delete(key));
  imageJobs.set(key, job); return job;
}
