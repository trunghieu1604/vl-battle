// Painted scenery sprites (trees, bamboo, rocks, tiled-roof houses, temples...). Rendered once per variant.
import { TAU, shade, makeCanvas, mulberry32, FONT } from './util.js';
import { sceneProp, sceneHas } from './scene.js';

const cache = new Map();
export function propSprite(p) {
  const vltk = sceneProp(p);
  if (vltk) return vltk;
  const key = `${p.type}|${p.v}|${p.s}|${p.dark ? 1 : 0}|${p.glyph || ''}|${p.label || ''}`;
  let e = cache.get(key);
  if (!e) { e = paint(p); cache.set(key, e); }
  return e;
}

function paint(p) {
  const rng = mulberry32((p.v + 1) * 9973 + p.type.length * 131 + Math.round(p.s * 100));
  const s = p.s || 1;
  const fn = PAINTERS[p.type];
  const [w, h, ax, ay] = SIZES[p.type](s);
  const c = makeCanvas(w, h), ctx = c.getContext('2d');
  ctx.translate(ax, ay); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  fn(ctx, rng, s, p);
  return { canvas: c, ax, ay, w, h };
}

const SIZES = {
  tree: s => [190 * s, 230 * s, 95 * s, 215 * s],
  pine: s => [130 * s, 220 * s, 65 * s, 210 * s],
  bamboo: s => [150 * s, 260 * s, 75 * s, 250 * s],
  rock: s => [110 * s, 80 * s, 55 * s, 60 * s],
  bush: s => [80 * s, 60 * s, 40 * s, 50 * s],
  house: s => [260 * s, 230 * s, 130 * s, 210 * s],
  hall: s => [420 * s, 330 * s, 210 * s, 300 * s],
  pagoda: s => [150 * s, 340 * s, 75 * s, 320 * s],
  tent: s => [120 * s, 100 * s, 60 * s, 85 * s],
  well: s => [70 * s, 80 * s, 35 * s, 65 * s],
  hay: s => [70 * s, 60 * s, 35 * s, 52 * s],
  stele: s => [50 * s, 80 * s, 25 * s, 72 * s],
  censer: s => [60 * s, 70 * s, 30 * s, 60 * s],
  gate: s => [230 * s, 200 * s, 115 * s, 185 * s],
  flag: s => [70 * s, 160 * s, 20 * s, 150 * s],
  fire: s => [40, 30, 20, 20],
};

function blob(ctx, x, y, r, base) {
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.45, r * 0.1, x, y, r);
  g.addColorStop(0, shade(base, 1.25)); g.addColorStop(0.6, base); g.addColorStop(1, shade(base, 0.6));
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
}

const LEAF_PALETTES = [
  ['#2f4a26', '#46662f', '#5f8538', '#7aa046'],
  ['#2c4524', '#3f6030', '#56793a', '#6f9447'],
  ['#3a4a22', '#566a2c', '#71873a', '#93a650'],
  ['#2e4a30', '#3e6340', '#558050', '#6f9c62'],
  ['#5a3a1c', '#7c4f22', '#a0682c', '#c48a3c'],
  ['#2f4a26', '#46662f', '#5f8538', '#7aa046'],
];

const PAINTERS = {
  tree(ctx, rng, s, p) {
    const pal = LEAF_PALETTES[p.v % LEAF_PALETTES.length];
    // trunk
    ctx.fillStyle = '#4a3324';
    ctx.beginPath(); ctx.moveTo(-8 * s, 0); ctx.quadraticCurveTo(-5 * s, -40 * s, -4 * s, -85 * s); ctx.lineTo(5 * s, -85 * s); ctx.quadraticCurveTo(6 * s, -40 * s, 9 * s, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#6b4c34'; ctx.fillRect(-3 * s, -80 * s, 3 * s, 75 * s);
    ctx.strokeStyle = '#4a3324'; ctx.lineWidth = 3 * s;
    ctx.beginPath(); ctx.moveTo(0, -70 * s); ctx.lineTo(-26 * s, -100 * s); ctx.moveTo(2 * s, -78 * s); ctx.lineTo(24 * s, -108 * s); ctx.stroke();
    // canopy
    const blobs = [];
    for (let i = 0; i < 22; i++) {
      const a = rng() * TAU, d = Math.sqrt(rng());
      blobs.push({ x: Math.cos(a) * d * 58 * s, y: -125 * s + Math.sin(a) * d * 46 * s, r: (17 + rng() * 14) * s });
    }
    blobs.sort((a, b) => a.y - b.y);
    for (const b of blobs) blob(ctx, b.x, b.y, b.r + 2 * s, pal[0]);
    for (const b of blobs) blob(ctx, b.x, b.y, b.r, pal[1 + Math.floor(rng() * 2)]);
    for (let i = 0; i < 9; i++) { const b = blobs[Math.floor(rng() * blobs.length)]; blob(ctx, b.x - b.r * 0.3, b.y - b.r * 0.35, b.r * 0.45, pal[3]); }
    ctx.fillStyle = shade(pal[3], 1.3, 0.55);
    for (let i = 0; i < 30; i++) { const b = blobs[Math.floor(rng() * blobs.length)]; ctx.beginPath(); ctx.ellipse(b.x + (rng() - 0.6) * b.r, b.y + (rng() - 0.7) * b.r, 2.5 * s, 1.5 * s, rng() * 3, 0, TAU); ctx.fill(); }
  },
  pine(ctx, rng, s) {
    ctx.fillStyle = '#4a3324'; ctx.fillRect(-4 * s, -40 * s, 8 * s, 40 * s);
    const tiers = 5;
    for (let i = 0; i < tiers; i++) {
      const y = -30 * s - i * 32 * s, w = (54 - i * 9) * s;
      ctx.fillStyle = shade('#2b4a2e', 0.85 + i * 0.06);
      ctx.beginPath(); ctx.moveTo(-w, y); ctx.quadraticCurveTo(0, y + 10 * s, w, y); ctx.lineTo(0, y - 48 * s); ctx.closePath(); ctx.fill();
      ctx.fillStyle = shade('#4f7a46', 0.9 + i * 0.06, 0.8);
      ctx.beginPath(); ctx.moveTo(-w * 0.85, y - 3 * s); ctx.lineTo(0, y - 46 * s); ctx.lineTo(-w * 0.15, y + 2 * s); ctx.closePath(); ctx.fill();
    }
  },
  bamboo(ctx, rng, s) {
    const stalks = 9 + Math.floor(rng() * 5);
    const tops = [];
    for (let i = 0; i < stalks; i++) {
      const bx = (rng() - 0.5) * 40 * s, h = (150 + rng() * 80) * s, lean = (rng() - 0.5) * 50 * s;
      ctx.strokeStyle = shade('#6f8a3a', 0.7 + rng() * 0.5); ctx.lineWidth = (3 + rng() * 2) * s;
      ctx.beginPath(); ctx.moveTo(bx, 0); ctx.quadraticCurveTo(bx + lean * 0.3, -h * 0.5, bx + lean, -h); ctx.stroke();
      ctx.strokeStyle = '#3d4c22'; ctx.lineWidth = 1.2 * s;
      for (let k = 1; k < 7; k++) { const t = k / 7, x = bx + lean * t * t * 0.7 + lean * 0.3 * t, y = -h * t; ctx.beginPath(); ctx.moveTo(x - 2.5 * s, y); ctx.lineTo(x + 2.5 * s, y); ctx.stroke(); }
      tops.push({ x: bx + lean, y: -h });
    }
    for (let i = 0; i < 140; i++) {
      const t = tops[Math.floor(rng() * tops.length)];
      const x = t.x + (rng() - 0.5) * 60 * s, y = t.y + rng() * 110 * s;
      ctx.fillStyle = rng() < 0.5 ? '#5f7d32' : rng() < 0.5 ? '#88a64c' : '#45602a';
      ctx.save(); ctx.translate(x, y); ctx.rotate(rng() * 1.2 + 0.4 * (rng() < 0.5 ? -1 : 1) + Math.PI / 2);
      ctx.beginPath(); ctx.ellipse(0, 0, 9 * s, 2.2 * s, 0, 0, TAU); ctx.fill(); ctx.restore();
    }
  },
  rock(ctx, rng, s, p) {
    const r = 22 * s;
    const pts = [];
    for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + rng() * 0.3; pts.push([Math.cos(a) * r * (0.8 + rng() * 0.35), -r * 0.45 + Math.sin(a) * r * 0.62 * (0.8 + rng() * 0.3) - (Math.sin(a) < 0 ? r * 0.35 : 0)]); }
    const base = ['#7d7a70', '#6e6b62', '#857f72', '#73766c'][p.v % 4];
    ctx.fillStyle = shade(base, 0.55); ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y + 2) : ctx.moveTo(x, y + 2))); ctx.closePath(); ctx.fill();
    ctx.fillStyle = base; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill();
    ctx.fillStyle = shade(base, 1.22); ctx.beginPath(); ctx.moveTo(pts[4][0], pts[4][1]); ctx.lineTo(pts[5][0], pts[5][1]); ctx.lineTo(pts[6][0], pts[6][1]); ctx.lineTo(0, -r * 0.5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = shade(base, 0.75); ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[1][0], pts[1][1]); ctx.lineTo(pts[2][0], pts[2][1]); ctx.lineTo(0, -r * 0.4); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#2b2a26'; ctx.lineWidth = 1.5; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.stroke();
    ctx.fillStyle = 'rgba(96,124,60,0.55)';
    for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse((rng() - 0.5) * r, -r * 0.7 + rng() * r * 0.3, 5 * s, 2.5 * s, 0, 0, TAU); ctx.fill(); }
  },
  bush(ctx, rng, s, p) {
    const base = p.v % 3 === 0 ? '#4b6a32' : '#3f5c2c';
    for (let i = 0; i < 7; i++) blob(ctx, (rng() - 0.5) * 36 * s, -12 * s - rng() * 14 * s, (9 + rng() * 6) * s, base);
    if (p.v % 2) { ctx.fillStyle = ['#e9d36c', '#e7a2b5', '#f1ece0'][p.v % 3]; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc((rng() - 0.5) * 34 * s, -14 * s - rng() * 14 * s, 1.8 * s, 0, TAU); ctx.fill(); } }
  },
  house(ctx, rng, s, p) { paintHouse(ctx, rng, s, p, 1); },
  hall(ctx, rng, s, p) { paintHall(ctx, rng, s, p); },
  pagoda(ctx, rng, s) {
    ctx.fillStyle = '#7b776b'; ctx.fillRect(-42 * s, -12 * s, 84 * s, 12 * s);
    for (let i = 0; i < 5; i++) {
      const w = (34 - i * 4) * s, y = -12 * s - i * 54 * s;
      ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-w * 0.7, y - 30 * s, w * 1.4, 30 * s);
      ctx.fillStyle = '#3b2a1f'; ctx.fillRect(-5 * s, y - 24 * s, 10 * s, 18 * s);
      roof(ctx, -w - 14 * s, w + 14 * s, y - 28 * s, y - 52 * s, w * 0.4, '#8c3a24', s);
    }
    ctx.strokeStyle = '#d4b45c'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(0, -12 * s - 5 * 54 * s + 2 * s); ctx.lineTo(0, -12 * s - 5 * 54 * s - 26 * s); ctx.stroke();
  },
  tent(ctx, rng, s, p) {
    const c = ['#a48b62', '#8d7550', '#9a8a6a', '#7e6b4a'][p.v % 4];
    ctx.fillStyle = shade(c, 0.7); ctx.beginPath(); ctx.moveTo(-50 * s, 0); ctx.lineTo(0, -70 * s); ctx.lineTo(8 * s, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(8 * s, 0); ctx.lineTo(0, -70 * s); ctx.lineTo(50 * s, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#2a2018'; ctx.beginPath(); ctx.moveTo(-14 * s, 0); ctx.lineTo(-2 * s, -38 * s); ctx.lineTo(10 * s, 0); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#4a3a28'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(0, -70 * s); ctx.lineTo(0, -82 * s); ctx.stroke();
  },
  well(ctx, rng, s) {
    ctx.fillStyle = '#6e6a60'; ctx.beginPath(); ctx.ellipse(0, -8 * s, 24 * s, 12 * s, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#1d2a2c'; ctx.beginPath(); ctx.ellipse(0, -11 * s, 16 * s, 7 * s, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#5a3f28'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(-20 * s, -8 * s); ctx.lineTo(-20 * s, -48 * s); ctx.moveTo(20 * s, -8 * s); ctx.lineTo(20 * s, -48 * s); ctx.stroke();
    roof(ctx, -30 * s, 30 * s, -44 * s, -60 * s, 14 * s, '#7c3a26', s);
  },
  hay(ctx, rng, s) {
    blob(ctx, 0, -18 * s, 24 * s, '#c4a352');
    ctx.strokeStyle = '#8d7232'; ctx.lineWidth = 1;
    for (let i = 0; i < 18; i++) { const a = rng() * Math.PI + Math.PI; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 8 * s, -18 * s + Math.sin(a) * 8 * s); ctx.lineTo(Math.cos(a) * 22 * s, -18 * s + Math.sin(a) * 20 * s); ctx.stroke(); }
  },
  stele(ctx, rng, s, p) {
    ctx.fillStyle = '#5d5a52'; ctx.fillRect(-14 * s, -12 * s, 28 * s, 12 * s);
    ctx.fillStyle = '#8a867a'; ctx.beginPath(); ctx.moveTo(-10 * s, -12 * s); ctx.lineTo(-10 * s, -55 * s); ctx.quadraticCurveTo(0, -66 * s, 10 * s, -55 * s); ctx.lineTo(10 * s, -12 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#3a3630'; ctx.font = `${14 * s}px ${FONT}`; ctx.textAlign = 'center'; ctx.fillText(p.glyph || '碑', 0, -30 * s);
  },
  censer(ctx, rng, s) {
    ctx.fillStyle = '#5b4a2a'; ctx.beginPath(); ctx.ellipse(0, -14 * s, 18 * s, 10 * s, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#8f7438'; ctx.beginPath(); ctx.ellipse(0, -20 * s, 18 * s, 7 * s, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#c9a54e'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.ellipse(0, -20 * s, 18 * s, 7 * s, 0, 0, TAU); ctx.stroke();
    ctx.strokeStyle = '#d24b2c'; ctx.lineWidth = 1.5 * s; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 5 * s, -22 * s); ctx.lineTo(i * 5 * s, -36 * s); ctx.stroke(); }
  },
  gate(ctx, rng, s, p) {
    const pillar = p.dark ? '#3a2a2a' : '#7e2d20';
    for (const sx of [-1, 1]) { ctx.fillStyle = shade(pillar, 0.7); ctx.fillRect(sx * 78 * s - 7 * s, -110 * s, 14 * s, 110 * s); ctx.fillStyle = pillar; ctx.fillRect(sx * 78 * s - 7 * s, -110 * s, 8 * s, 110 * s); ctx.fillStyle = '#6a665c'; ctx.fillRect(sx * 78 * s - 11 * s, -8 * s, 22 * s, 8 * s); }
    ctx.fillStyle = shade(pillar, 0.8); ctx.fillRect(-86 * s, -118 * s, 172 * s, 12 * s);
    roof(ctx, -104 * s, 104 * s, -116 * s, -150 * s, 40 * s, p.dark ? '#2c2a30' : '#8c3a24', s);
    ctx.fillStyle = '#1f1a14'; ctx.fillRect(-46 * s, -108 * s, 92 * s, 22 * s);
    ctx.strokeStyle = '#c9a54e'; ctx.lineWidth = 1.5 * s; ctx.strokeRect(-46 * s, -108 * s, 92 * s, 22 * s);
    ctx.fillStyle = '#e4c66a'; ctx.font = `bold ${11 * s}px ${FONT}`; ctx.textAlign = 'center'; ctx.fillText((p.label || '').toUpperCase(), 0, -93 * s);
  },
  flag(ctx, rng, s, p) {
    ctx.strokeStyle = '#3b2a1c'; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -140 * s); ctx.stroke();
    ctx.fillStyle = p.v ? '#5a1f22' : '#9b2a1e'; ctx.beginPath(); ctx.moveTo(2 * s, -136 * s); ctx.quadraticCurveTo(30 * s, -128 * s, 46 * s, -134 * s); ctx.lineTo(44 * s, -86 * s); ctx.quadraticCurveTo(28 * s, -82 * s, 2 * s, -88 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#e8d07a'; ctx.font = `bold ${20 * s}px ${FONT}`; ctx.textAlign = 'center'; ctx.fillText(p.v ? '月' : '寨', 24 * s, -102 * s);
  },
  fire() {},
};

// Vietnamese tiled roof seen from above-front, with up-turned eave tips.
function roof(ctx, x0, x1, eaveY, ridgeY, inset, color, s) {
  const g = ctx.createLinearGradient(0, ridgeY, 0, eaveY);
  g.addColorStop(0, shade(color, 0.75)); g.addColorStop(1, shade(color, 1.1));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(x0 - 6 * s, eaveY - 8 * s);
  ctx.quadraticCurveTo(x0 + 10 * s, eaveY + 2 * s, x0 + 30 * s, eaveY);
  ctx.lineTo(x1 - 30 * s, eaveY);
  ctx.quadraticCurveTo(x1 - 10 * s, eaveY + 2 * s, x1 + 6 * s, eaveY - 8 * s);
  ctx.lineTo(x1 - inset, ridgeY);
  ctx.lineTo(x0 + inset, ridgeY);
  ctx.closePath(); ctx.fill();
  // tile rows
  ctx.strokeStyle = shade(color, 0.55, 0.7); ctx.lineWidth = 1;
  const rows = Math.max(3, Math.round((eaveY - ridgeY) / (7 * s)));
  for (let i = 1; i < rows; i++) {
    const t = i / rows, y = ridgeY + (eaveY - ridgeY) * t, xa = x0 + inset + (30 * s - inset) * t, xb = x1 - inset - (30 * s - inset) * t;
    ctx.beginPath(); ctx.moveTo(xa, y); ctx.lineTo(xb, y); ctx.stroke();
  }
  ctx.strokeStyle = shade(color, 0.62, 0.5);
  for (let x = x0 + 34 * s; x < x1 - 30 * s; x += 7 * s) { const t = (x - x0) / (x1 - x0); ctx.beginPath(); ctx.moveTo(x, eaveY); ctx.lineTo(x0 + inset + (x1 - x0 - 2 * inset) * t, ridgeY); ctx.stroke(); }
  // eave edge and ridge
  ctx.strokeStyle = shade(color, 1.3); ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(x0 + 30 * s, eaveY); ctx.lineTo(x1 - 30 * s, eaveY); ctx.stroke();
  ctx.strokeStyle = '#2d1c14'; ctx.lineWidth = 4 * s;
  ctx.beginPath(); ctx.moveTo(x0 + inset - 6 * s, ridgeY - 6 * s); ctx.quadraticCurveTo(x0 + inset, ridgeY, x0 + inset + 10 * s, ridgeY); ctx.lineTo(x1 - inset - 10 * s, ridgeY); ctx.quadraticCurveTo(x1 - inset, ridgeY, x1 - inset + 6 * s, ridgeY - 6 * s); ctx.stroke();
}

function paintHouse(ctx, rng, s, p) {
  const dark = p.dark;
  const wall = dark ? '#5a3a34' : ['#cdb68c', '#c4ad86', '#d2bf98', '#bca37c', '#c9b28a', '#b9a07a'][p.v % 6];
  const roofC = dark ? '#2e2b30' : ['#8e3b25', '#7d3523', '#93462a', '#6f3a2a', '#8a4428', '#7a3e2c'][p.v % 6];
  const W = 85 * s;
  // platform
  ctx.fillStyle = '#6d6a60'; ctx.fillRect(-W - 8 * s, -10 * s, 2 * W + 16 * s, 10 * s);
  ctx.fillStyle = '#8b877b'; ctx.fillRect(-W - 8 * s, -12 * s, 2 * W + 16 * s, 3 * s);
  // wall
  ctx.fillStyle = wall; ctx.fillRect(-W, -78 * s, 2 * W, 66 * s);
  ctx.fillStyle = shade(wall, 0.8); ctx.fillRect(-W, -24 * s, 2 * W, 12 * s);
  // pillars
  ctx.fillStyle = dark ? '#2a1a18' : '#5a3a24';
  for (let i = 0; i <= 4; i++) ctx.fillRect(-W + i * (2 * W / 4) - 3.5 * s, -80 * s, 7 * s, 70 * s);
  // door + windows
  ctx.fillStyle = '#2e2018'; ctx.fillRect(-14 * s, -60 * s, 28 * s, 48 * s);
  ctx.strokeStyle = '#7a5634'; ctx.lineWidth = 2 * s; ctx.strokeRect(-14 * s, -60 * s, 28 * s, 48 * s); ctx.beginPath(); ctx.moveTo(0, -60 * s); ctx.lineTo(0, -12 * s); ctx.stroke();
  for (const sx of [-1, 1]) {
    const x = sx * 50 * s;
    ctx.fillStyle = '#2e2018'; ctx.fillRect(x - 13 * s, -60 * s, 26 * s, 20 * s);
    ctx.strokeStyle = '#8a6a44'; ctx.lineWidth = 1.2 * s;
    for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(x + k * 5 * s, -60 * s); ctx.lineTo(x + k * 5 * s, -40 * s); ctx.stroke(); }
    ctx.strokeRect(x - 13 * s, -60 * s, 26 * s, 20 * s);
  }
  roof(ctx, -W - 26 * s, W + 26 * s, -76 * s, -160 * s, 46 * s, roofC, s);
  if (rng() < 0.5 && !dark) { ctx.fillStyle = '#b8402c'; ctx.beginPath(); ctx.ellipse(-W + 8 * s, -66 * s, 4 * s, 6 * s, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#e7c35a'; ctx.fillRect(-W + 7 * s, -61 * s, 2 * s, 5 * s); }
}

function paintHall(ctx, rng, s, p) {
  const dark = p.dark;
  const W = 150 * s;
  ctx.fillStyle = '#6d6a60'; ctx.fillRect(-W - 20 * s, -16 * s, 2 * W + 40 * s, 16 * s);
  ctx.fillStyle = '#8f8b80';
  for (let i = 0; i < 3; i++) ctx.fillRect(-40 * s - i * 6 * s, -6 * s + i * 2 * s - 12 * s, 80 * s + i * 12 * s, 4 * s);
  ctx.fillStyle = dark ? '#3e2a2a' : '#d5c4a0'; ctx.fillRect(-W, -100 * s, 2 * W, 86 * s);
  ctx.fillStyle = dark ? '#5a1f22' : '#8f2a1d';
  for (let i = 0; i <= 6; i++) ctx.fillRect(-W + i * (2 * W / 6) - 5 * s, -104 * s, 10 * s, 92 * s);
  ctx.fillStyle = '#2a1c15'; ctx.fillRect(-24 * s, -84 * s, 48 * s, 70 * s);
  ctx.strokeStyle = '#c9a54e'; ctx.lineWidth = 2 * s; ctx.strokeRect(-24 * s, -84 * s, 48 * s, 70 * s);
  roof(ctx, -W - 34 * s, W + 34 * s, -98 * s, -160 * s, 40 * s, dark ? '#2b2a30' : '#8c3a24', s);
  ctx.fillStyle = dark ? '#3e2a2a' : '#d5c4a0'; ctx.fillRect(-W * 0.62, -190 * s, W * 1.24, 34 * s);
  ctx.fillStyle = dark ? '#5a1f22' : '#8f2a1d';
  for (let i = 0; i <= 4; i++) ctx.fillRect(-W * 0.62 + i * (W * 1.24 / 4) - 4 * s, -192 * s, 8 * s, 36 * s);
  roof(ctx, -W * 0.62 - 30 * s, W * 0.62 + 30 * s, -188 * s, -250 * s, 36 * s, dark ? '#2b2a30' : '#8c3a24', s);
  ctx.fillStyle = '#1f1a14'; ctx.fillRect(-26 * s, -182 * s, 52 * s, 24 * s);
  ctx.strokeStyle = '#c9a54e'; ctx.lineWidth = 2 * s; ctx.strokeRect(-26 * s, -182 * s, 52 * s, 24 * s);
  ctx.fillStyle = '#e8c86a'; ctx.font = `bold ${17 * s}px ${FONT}`; ctx.textAlign = 'center'; ctx.fillText(p.glyph || '寺', 0, -164 * s);
  ctx.fillStyle = '#d4b45c'; ctx.beginPath(); ctx.arc(0, -256 * s, 6 * s, 0, TAU); ctx.fill();
}

// Rough sprite bounds (world space) used to fade props that hide the player.
export function propBounds(p) {
  const e = propSprite(p);
  return { x0: p.x - e.ax, y0: p.y - e.ay, x1: p.x - e.ax + e.w, y1: p.y - e.ay + e.h * 0.92 };
}
export function propShadow(p) {
  if (sceneHas(p.type) || p.type === 'decor') return null; // VLTK art carries its own shadow
  const s = p.s || 1;
  switch (p.type) {
    case 'tree': return [p.x + 18 * s, p.y + 2, 58 * s, 20 * s];
    case 'pine': return [p.x + 14 * s, p.y + 2, 40 * s, 14 * s];
    case 'bamboo': return [p.x + 16 * s, p.y + 2, 48 * s, 16 * s];
    case 'house': return [p.x + 14 * s, p.y + 4, 120 * s, 22 * s];
    case 'hall': return [p.x + 20 * s, p.y + 4, 200 * s, 30 * s];
    case 'pagoda': return [p.x + 20 * s, p.y + 2, 55 * s, 16 * s];
    case 'rock': return [p.x + 6 * s, p.y + 2, 26 * s, 10 * s];
    default: return null;
  }
}
