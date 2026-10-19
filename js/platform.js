// Browser/device boundary. Native shells may register equivalent platform APIs
// without importing combat or rendering code or adding a native SDK to the web build.
let adapter = null, suspended = false, wake = null, foregroundPlay = false;
export const device = { touch: matchMedia('(pointer: coarse)').matches, portrait: innerHeight > innerWidth, portraitAllowed: false, blocked: false, fullscreen: false, standalone: false };
const listeners = new Set();
export function registerPlatformAdapter(value) { adapter = value; }
export function onDeviceChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
function refresh() {
  device.touch = matchMedia('(pointer: coarse)').matches;
  device.standalone = matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches || navigator.standalone === true;
  device.fullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
  // Mobile browsers can pan/zoom or cover part of the layout viewport with their chrome.
  // Keep the whole game in the visual viewport instead of anchoring controls off-screen.
  const vv = window.visualViewport;
  const width = vv?.width > 0 ? vv.width : innerWidth;
  const height = vv?.height > 0 ? vv.height : innerHeight;
  const style = document.documentElement.style;
  style.setProperty('--viewport-width', `${width}px`);
  style.setProperty('--viewport-height', `${height}px`);
  style.setProperty('--viewport-left', `${vv?.offsetLeft || 0}px`);
  style.setProperty('--viewport-top', `${vv?.offsetTop || 0}px`);
  document.documentElement.dataset.viewport = width <= 660 ? 'narrow' : 'wide';
  document.documentElement.dataset.short = height <= 340 ? 'true' : 'false';
  device.portrait = height > width;
  device.blocked = suspended || (device.touch && device.portrait && !device.portraitAllowed);
  document.documentElement.dataset.input = device.touch ? 'touch' : 'mouse';
  for (const fn of listeners) fn(device);
}
export function allowPortrait() { device.portraitAllowed = true; refresh(); }
export function setAppSuspended(value) { suspended = !!value; refresh(); }
export async function setForegroundPlay(value) {
  foregroundPlay = value;
  if (!value) { const held = wake; wake = null; await held?.release().catch(() => {}); return; }
  if (!wake && !document.hidden && navigator.wakeLock?.request) {
    try { const lock = await navigator.wakeLock.request('screen'); if (!foregroundPlay) await lock.release(); else { wake = lock; lock.addEventListener('release', () => { if (wake === lock) wake = null; }); } } catch {}
  }
}
// Request fullscreen inside the original user gesture. Return the result so the UI
// can explain an unsupported browser instead of silently leaving its toolbar visible.
export async function enterLandscape() {
  if (adapter?.enterLandscape) {
    try { await adapter.enterLandscape(); refresh(); return 'native'; } catch {}
  }
  refresh();
  if (!device.fullscreen && !device.standalone) {
    const root = document.documentElement;
    const request = root.requestFullscreen || root.webkitRequestFullscreen;
    if (!request) return 'unavailable';
    try { await request.call(root, { navigationUI: 'hide' }); } catch { return 'unavailable'; }
  }
  try { await screen.orientation?.lock?.('landscape'); } catch {}
  refresh();
  return device.standalone ? 'standalone' : device.fullscreen ? 'fullscreen' : 'unavailable';
}
export async function leaveFullscreen() {
  const exit = document.exitFullscreen || document.webkitExitFullscreen;
  try { await exit?.call(document); } catch {}
  refresh();
}
window.addEventListener('resize', refresh);
window.visualViewport?.addEventListener('resize', refresh);
window.visualViewport?.addEventListener('scroll', refresh);
screen.orientation?.addEventListener('change', refresh);
document.addEventListener('fullscreenchange', refresh);
document.addEventListener('webkitfullscreenchange', refresh);
document.addEventListener('visibilitychange', () => { if (document.hidden) { const lock = wake; wake = null; lock?.release().catch(() => {}); } else if (foregroundPlay) setForegroundPlay(true); });
refresh();
