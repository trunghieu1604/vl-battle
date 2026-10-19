// Small math, random and color helpers shared by every module.
export const TAU = Math.PI * 2;
export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export const dist2 = (ax, ay, bx, by) => (ax - bx) * (ax - bx) + (ay - by) * (ay - by);
export const angleDiff = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
export const random = (a, b) => a + Math.random() * (b - a);
export const randInt = (a, b) => Math.floor(random(a, b + 1));
export const pick = list => list[Math.floor(Math.random() * list.length)];
export const smooth = t => t * t * (3 - 2 * t);

export function mulberry32(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(ix, iy, seed) {
  let h = (Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + Math.imul(seed, 144665)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export function noise(x, y, seed = 0) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy, seed), b = hash(ix + 1, iy, seed), c = hash(ix, iy + 1, seed), d = hash(ix + 1, iy + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export function fbm(x, y, seed = 0, octaves = 4) {
  let sum = 0, amp = 0.5, freq = 1, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += noise(x * freq, y * freq, seed + i * 17) * amp;
    norm += amp; amp *= 0.5; freq *= 2.03;
  }
  return sum / norm;
}

export function segDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay, len = dx * dx + dy * dy;
  const t = len ? clamp(((px - ax) * dx + (py - ay) * dy) / len, 0, 1) : 0;
  return Math.hypot(px - ax - dx * t, py - ay - dy * t);
}

export function hexRgb(hex) {
  const n = parseInt(hex.slice(1, 7), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export function rgb(r, g, b, a = 1) {
  return a >= 1 ? `rgb(${r | 0},${g | 0},${b | 0})` : `rgba(${r | 0},${g | 0},${b | 0},${a})`;
}
// Multiply a hex color's brightness; f > 1 lightens towards white.
export function shade(hex, f, a = 1) {
  const [r, g, b] = hexRgb(hex);
  if (f <= 1) return rgb(r * f, g * f, b * f, a);
  const k = f - 1;
  return rgb(r + (255 - r) * k, g + (255 - g) * k, b + (255 - b) * k, a);
}
export function mix(hexA, hexB, t) {
  const a = hexRgb(hexA), b = hexRgb(hexB);
  return rgb(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t));
}

export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h));
  return c;
}

export const FONT = "'Noto Serif', Georgia, 'Times New Roman', serif";
export const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
