// VLTK1 scenery from data/vltk-scene.json (tools/vltk1-import/export-scene.cjs): static variants per prop type,
// animated fire/flags, and decor (vendors, lanterns, swaying flowers, water sparkle). Loads in the background;
// until an image arrives the procedural painting in props.js is used.
import { makeCanvas } from './util.js';
import { CanvasCache, touchDevice, imageSurfaceStats } from './canvas-cache.js';

let SCENE = null;
const IMG = {}, built = new CanvasCache({ maxBytes: (touchDevice() ? 12 : 32) * 1048576, canvas: value => value.canvas });
export const sceneCacheStats = () => ({ ...built.stats(), sources: imageSurfaceStats(Object.values(IMG)) });
let onReady = null;
const MAP_TYPES = new Set();

export async function loadMapScene(kit, loadImage) {
  const images = await Promise.all(Object.values(kit.sprites).map(async v => [v.image, await loadImage(`data/${v.image}`)]));
  for (const [file, img] of images) IMG[file] = img;
  setMapSceneData(kit);
}
// The kit's data only (footprints, scale, rects): collision and prop placement depend on it, never on the images,
// so the match server (no images) builds the same world as every player's page.
export function setMapSceneData(kit) {
  SCENE = { props: {}, kits: {}, anims: {}, decor: {}, mapSprites: kit.sprites };
  for (const type of ['house','hall','gate','pagoda','tree','bamboo','bush','rock','well','hay','wall','dock','bridge','tent','flag']) MAP_TYPES.add(type);
  built.clear();
}

// Reviewed complete buildings only. Excludes UI frames, door leaves, giant
// miniature compounds and isolated pillars from the automatic import catalogue.
const A = (type, index, width, footprint = [0.72, 0.26]) => ({ type, index, width, footprint });
export const SCENE_KITS = {
  village: { house: [A('house', 3, 390), A('house', 7, 340)], hall: [A('house', 5, 620)], gate: [A('gate', 0, 340)], pagoda: [A('pagoda', 4, 130)] },
  temple: { house: [A('hall', 6, 390), A('hall', 7, 390)], hall: [A('hall', 3, 650)], gate: [A('gate', 2, 340)], pagoda: [A('pagoda', 4, 150)] },
  fortress: { house: [A('house', 9, 360)], hall: [A('hall', 1, 560)], gate: [A('gate', 0, 360)], pagoda: [A('pagoda', 1, 140)] },
  cliff: { house: [A('house', 7, 340)], gate: [A('gate', 2, 300)] },
};
function curated(manifest) {
  const selected = { ...manifest, props: { ...manifest.props } };
  // Keep the measured variants in the original catalog; kits store references.
  selected.kits = {};
  for (const [kit, types] of Object.entries(SCENE_KITS)) {
    selected.kits[kit] = {};
    for (const [type, entries] of Object.entries(types)) selected.kits[kit][type] = entries.map(a => {
      const source = manifest.props[a.type]?.[a.index];
      if (!source) throw new Error(`Missing scenery: ${kit}/${type}/${a.index}`);
      return { ...source, scale: a.width / source.rect[2], footprint: a.footprint };
    });
  }
  // Architecture can only be selected through its kit, never the unreviewed pool.
  for (const type of ['house', 'hall', 'gate', 'pagoda']) selected.props[type] = selected.kits.village[type];
  return selected;
}
export async function loadScene(manifest, loadImage, changed) {
  const next = curated(manifest);
  onReady = changed;
  const files = new Set();
  for (const list of Object.values(next.props || {})) for (const v of list) files.add(v.image);
  for (const kit of Object.values(next.kits)) for (const list of Object.values(kit)) for (const v of list) files.add(v.image);
  for (const list of Object.values(next.anims || {})) for (const v of list) files.add(v.image);
  for (const [kind, d] of Object.entries(next.decor || {})) if (kind !== 'vendor') for (const v of d.variants) files.add(v.image);
  // Atomic readiness: don't generate collision or show the map with mixed art.
  await Promise.all([...files].map(async f => { IMG[f] = await loadImage(`data/${f}`); }));
  SCENE = next; built.clear(); onReady?.();
}

// stable variant per prop: same world seed → same picture
const pickIndex = (p, n) => Math.abs(((p.v || 0) * 7919 + Math.floor(p.x / 37) * 131 + Math.floor(p.y / 53) * 17) % n);
export const sceneHas = type => MAP_TYPES.has(type) || !!(SCENE?.props?.[type]?.length || SCENE?.anims?.[type]?.length);
function selectAsset(p) {
  if (p.asset) {
    const v = SCENE?.mapSprites?.[p.asset];
    if (!v) throw new Error(`Missing reviewed map sprite: ${p.asset}`);
    return v;
  }
  const list = SCENE?.kits?.[p.kit || 'village']?.[p.type] || SCENE?.props?.[p.type];
  return list?.length ? list[pickIndex(p, list.length)] : null;
}
export function prepareSceneProp(p) {
  const v = selectAsset(p);
  if (!v) return p;
  p.sceneAsset = v;
  if (v.foot) { applyFoot(p, v.foot, v.scale * (p.s || 1)); return p; }
  if (v.footprint && p.type !== 'gate') {
    const s = v.scale * (p.s || 1);
    p.w = Math.round(v.rect[2] * s * v.footprint[0]);
    p.h = Math.round(v.rect[3] * s * v.footprint[1]); p.r = 0;
  }
  // Open gates have two posts, not one solid rectangle across their opening.
  if (p.type === 'gate') {
    const w = v.rect[2] * v.scale * (p.s || 1);
    p.w = 0; p.r = 0;
    p.blockers = [-1, 1].map(sign => ({ x: p.x + sign * w * 0.35, y: p.y - 15, w: w * 0.18, h: 24 }));
  }
  return p;
}
// Collision follows the art: the base measured from each sprite's alpha (tools/vltk1-import/footprint.cjs),
// in source pixels around the anchor. Walls of buildings, gate walls with their opening, tree trunks.
function applyFoot(p, foot, s) {
  const at = ([x, y]) => [p.x + x * s, p.y + y * s];
  if (foot.circle) { const [x, y, r] = foot.circle; p.foot = { circle: [...at([x, y]), r * s] }; return; }
  const polys = foot.polys.map(poly => poly.map(at)), front = foot.front.map(at), all = polys.flat();
  const xs = all.map(q => q[0]), ys = all.map(q => q[1]);
  p.foot = { polys, front, x0: Math.min(...xs), x1: Math.max(...xs) };
  // bounding size keeps spacing, chest placement and minimap rules working
  p.w = Math.round(p.foot.x1 - p.foot.x0); p.h = Math.round(Math.max(...ys) - Math.min(...ys)); p.r = 0;
  delete p.blockers;
}
// Draw-order help for large buildings: something standing in front of a wall face sorts after the building
// even when it is above the building's lowest corner.
export function inFrontOf(p, x, y) {
  const f = p.foot?.front;
  if (!f || x < p.foot.x0 || x > p.foot.x1) return false;
  for (let i = 0; i < f.length - 1; i++) {
    const [ax, ay] = f[i], [bx, by] = f[i + 1];
    if (x >= Math.min(ax, bx) && x <= Math.max(ax, bx)) return y > ay + (by - ay) * (bx === ax ? 0 : (x - ax) / (bx - ax)) - 2;
  }
  return false;
}

// { canvas, ax, ay, w, h } like props.js, or null when the type has no VLTK art (or it is not loaded yet)
export function sceneProp(p) {
  const v = p.sceneAsset || selectAsset(p);
  if (!v) return null;
  const img = IMG[v.image];
  if (!img) return null;
  const s = (v.scale || 1) * (p.s || 1);
  const key = `${v.image}|${v.rect.join(',')}|${s}`;
  let e = built.get(key);
  if (!e) {
    const [x, y, w, h, ax, ay] = v.rect;
    const cw = Math.max(1, Math.round(w * s)), ch = Math.max(1, Math.round(h * s));
    const c = makeCanvas(cw, ch);
    c.getContext('2d').drawImage(img, x, y, w, h, 0, 0, cw, ch);
    e = { canvas: c, ax: ax * s, ay: ay * s, w: cw, h: ch };
    built.set(key, e);
  }
  return e;
}

// animated prop or decor; returns false when nothing to draw
export function drawSceneAnim(ctx, p, time) {
  const list = p.type === 'decor' ? SCENE?.decor?.[p.kind]?.variants : SCENE?.anims?.[p.type];
  if (!list?.length) return false;
  const v = list[pickIndex(p, list.length)], img = IMG[v.image];
  if (!img) return false;
  // These SPR groups are plant variants, not successive motion frames.
  // Keep legacy catalogs stable too; new map foliage is entirely static.
  if (v.rect) {
    const [x,y,w,h,ax,ay] = v.rect, s = (v.scale || 1) * (p.s || 1);
    ctx.drawImage(img,x,y,w,h,p.x-ax*s,p.y-ay*s,w*s,h*s); return true;
  }
  const f = p.kind === 'flowers' ? pickIndex(p, v.frames) : Math.floor((time * 1000 + (p.x * 13) % 997) / v.frameMs) % v.frames;
  const o = f * 6, r = v.rects, s = (v.scale || 1) * (p.s || 1);
  if (!r[o + 2]) return true;
  ctx.drawImage(img, r[o], r[o + 1], r[o + 2], r[o + 3], p.x - r[o + 4] * s, p.y - r[o + 5] * s, r[o + 2] * s, r[o + 3] * s);
  return true;
}
// World circle [x, y, r] at the foot of an animated decor post (lantern poles), or null.
export function decorFoot(p) {
  const list = SCENE?.decor?.[p.kind]?.variants;
  const v = list?.length ? list[pickIndex(p, list.length)] : null;
  if (!v?.foot?.circle) return null;
  const [x, y, r] = v.foot.circle, s = (v.scale || 1) * (p.s || 1);
  return [p.x + x * s, p.y + y * s, r * s];
}
export const decorKinds = () => Object.entries(SCENE?.decor || {}).map(([kind, d]) => ({ kind, where: d.where }));
