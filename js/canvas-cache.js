// Bound owned offscreen surfaces and release their backing stores immediately.
// Dropping a JS reference alone can leave Safari's canvas allocation alive until GC.
export const touchDevice = () => globalThis.matchMedia?.('(pointer: coarse)').matches === true;
export function releaseCanvas(canvas) {
  if (canvas && typeof canvas.getContext === 'function') { canvas.width = 0; canvas.height = 0; }
}
// Inventory of retained source surfaces, not a measurement of browser/GPU memory.
// Browsers may discard or duplicate decoded image backing stores independently.
export function imageSurfaceStats(images) {
  const unique = new Set(images);
  let rgbaBytesEstimate = 0, canvases = 0;
  for (const image of unique) {
    if (!image) continue;
    const width = image.naturalWidth || image.width || 0, height = image.naturalHeight || image.height || 0;
    rgbaBytesEstimate += width * height * 4;
    if (typeof image.getContext === 'function') canvases++;
  }
  return { count: unique.size, canvases, rgbaBytesEstimate };
}
export class CanvasCache {
  constructor({ maxBytes, maxEntries = Infinity, canvas = value => value }) {
    this.items = new Map(); this.maxBytes = maxBytes; this.maxEntries = maxEntries;
    this.canvas = canvas; this.bytes = 0; this.evictions = 0;
  }
  get size() { return this.items.size; }
  has(key) { return this.items.has(key); }
  get(key) {
    const entry = this.items.get(key); if (!entry) return undefined;
    this.items.delete(key); this.items.set(key, entry); return entry.value;
  }
  set(key, value) {
    if (this.items.get(key)?.value === value) { this.get(key); return this; }
    this.delete(key);
    const canvas = this.canvas(value), bytes = canvas && typeof canvas.getContext === 'function' ? canvas.width * canvas.height * 4 : 0;
    this.items.set(key, { value, bytes }); this.bytes += bytes;
    // A single oversized visible surface must remain usable for this draw.
    this.trim(); return this;
  }
  delete(key) {
    const entry = this.items.get(key); if (!entry) return false;
    this.items.delete(key); this.bytes -= entry.bytes;
    releaseCanvas(this.canvas(entry.value)); return true;
  }
  trim() {
    while (this.items.size > 1 && (this.bytes > this.maxBytes || this.items.size > this.maxEntries)) {
      this.delete(this.items.keys().next().value); this.evictions++;
    }
  }
  clear() { for (const key of this.items.keys()) this.delete(key); }
  *[Symbol.iterator]() { for (const [key, entry] of this.items) yield [key, entry.value]; }
  stats() { return { entries: this.size, bytes: this.bytes, maxBytes: this.maxBytes, evictions: this.evictions }; }
}
