import { TAU, clamp } from './util.js';
import { SKILL_VISUALS, skillVisual, skillSprite, setSkillSources } from './skill-visuals.js';
import { prepareSpriteForBlend } from './sprite-compositing.js';
import { imageSurfaceStats } from './canvas-cache.js';
let FX = { effects: {}, projectiles: {}, styles: {}, skills: {} };
const IMG = {}, pending = new Map();
export const vfxImageStats = () => ({ ...imageSurfaceStats(Object.values(IMG)), pending: pending.size });
let loadImage = null;
let imageDescriptors = new Map();
// ids: the manuals whose art this page needs (the match passes its free-map pool; omitted = every manual, as the library).
// A manual of the list without any source art is an export error; outside the list a manual without art is just skipped.
// lazy: only the shared effect art is awaited; each manual's own art (the free-map pool is ~45 MB, one manual alone 16 MB)
// is fetched afterwards by preloadSkillArt / requestSkillArt, and engine.js does not cast a manual before skillArtReady.
const skillFiles = new Map();   // manual id → the image files of its art
export async function loadVfx(manifest, loader, ids = null, { lazy = false } = {}) {
  FX = manifest; loadImage = loader; setSkillSources(FX.skills);
  imageDescriptors = new Map(Object.values(FX.nativeSprites || {}).map(d => [d.image, d]));
  for (const source of Object.values(FX.skills || {})) for (const stage of ['precast', 'cast', 'impact']) {
    const d = source[stage]; if (d && !imageDescriptors.has(d.image)) imageDescriptors.set(d.image, d);
  }
  const shared = new Set([...Object.values(FX.effects || {}), ...Object.values(FX.projectiles || {})].map(d => d.image));
  skillFiles.clear();
  for (const id of ids || Object.keys(SKILL_VISUALS)) {
    const source = FX.skills?.[id], files = new Set();
    const graphArt = Object.values(source?.fullLevel?.nodes || {}).some(n => n.precast || n.missiles.some(m => Object.entries(m.assets).some(([column, a]) => column.startsWith('Anim') && a)));
    if (!source || (!source.cast && !source.precast && !graphArt)) { if (ids) throw Error(`Missing martial-art source: ${id}`); continue; }
    for (const node of Object.values(source.fullLevel?.nodes || {})) {
      if (node.precast && FX.nativeSprites[node.precast.id]) files.add(FX.nativeSprites[node.precast.id].image);
      for (const missile of node.missiles) for (const [column, resource] of Object.entries(missile.assets)) if (column.startsWith('Anim') && resource && FX.nativeSprites[resource.id]) files.add(FX.nativeSprites[resource.id].image);
    }
    if (!source.fullLevel) for (const stage of ['precast', 'cast', 'impact']) if (source[stage]) files.add(source[stage].image);
    skillFiles.set(id, files);
  }
  sharedFiles = shared;
  if (lazy) return;   // the start screen draws none of it: preloadSharedArt / preloadSkillArt fetch it afterwards
  await Promise.all([...shared, ...[...skillFiles.values()].flatMap(s => [...s])].map(f => request(f)));
}
let sharedFiles = new Set();
// the 14 shared effect images (generic hits, styles); drawn only once loaded
export const preloadSharedArt = () => Promise.allSettled([...sharedFiles].map(f => request(f)));
// every image of the manual's art is in memory (true for a manual this page does not track)
export const skillArtReady = id => { const files = skillFiles.get(id); return !files || [...files].every(f => IMG[f]); };
// fetch the manual's art; urgent puts it ahead of the background queue (a manual the player holds)
export function requestSkillArt(id, urgent = false) {
  const files = skillFiles.get(id);
  return files ? Promise.all([...files].map(f => request(f, urgent))) : Promise.resolve();
}
// the background fill after the menu is shown: every tracked manual in the given order (the rest after it)
export function preloadSkillArt(order = []) {
  const ids = [...new Set([...order.filter(id => skillFiles.has(id)), ...skillFiles.keys()])];
  return Promise.allSettled(ids.map(id => requestSkillArt(id)));
}
export function skillArtProgress() {
  let ready = 0; for (const id of skillFiles.keys()) if (skillArtReady(id)) ready++;
  return { ready, total: skillFiles.size };
}
// bytes are unknown before the download; the manifest's frame rectangles give the atlas area, a fair order of size
export function skillArtWeight(id) {
  let area = 0;
  for (const f of skillFiles.get(id) || []) { const d = imageDescriptors.get(f); area += d?.sourceWidth && d?.sourceHeight ? d.sourceWidth * d.sourceHeight * (d.frames || 1) * (d.dirs || 1) : 1e6; }
  return area;
}
// ---- states on a fighter (client state table, tools/vltk1-import/export-status-fx.cjs) ----
// Only states with a real source image are drawn from it (choáng: mag_spe_眩晕.spr). Poison, freeze, burn and confusion
// are "Special" rows the client draws itself; the installer has no file for them (STATUS.special).
let STATUS = { states: {}, special: [] };
export async function loadStatusFx(manifest) {
  STATUS = manifest || STATUS;
  await Promise.all(Object.values(STATUS.states).filter(d => d.image).map(d => request(d.image)));
}
// draws the looping state image at a fighter's feet point (x, y); false while its image is not ready or absent
export function drawStatusFx(ctx, state, x, y, t) {
  const d = STATUS.states[state], img = d?.image && IMG[d.image];
  if (!img) return false;
  const f = Math.floor(t * 1000 / Math.max(16, d.frameMs || 50)) % d.frames, r = d.rects, o = f * 6;
  if (!r[o + 2]) return true;
  ctx.save(); if (d.blend && d.blend !== 'source-over') ctx.globalCompositeOperation = d.blend;
  ctx.drawImage(img, r[o], r[o + 1], r[o + 2], r[o + 3], x - r[o + 4], y - r[o + 5], r[o + 2], r[o + 3]);
  ctx.restore(); return true;
}
function request(file, urgent = false) {
  if (IMG[file] || !loadImage) return Promise.resolve();
  if (pending.has(file)) { if (urgent) loadImage(`data/${file}`, { urgent: true }); return pending.get(file); }   // moves the queued load ahead
  const job = loadImage(`data/${file}`, { urgent }).then(img => { IMG[file] = prepareSpriteForBlend(img, imageDescriptors.get(file)); }).finally(() => pending.delete(file));
  pending.set(file, job); return job;
}
function pick(styled, shared) {
  if (styled) { if (IMG[styled.image]) return styled; request(styled.image).catch(() => {}); }
  return shared && IMG[shared.image] ? shared : null;
}
const dirIndex = (angle, dirs) => ((Math.round((angle - TAU / 4) / (TAU / dirs)) % dirs) + dirs) % dirs;
function blitFx(ctx, d, frame, dir, scale) {
  const o = (dir * d.frames + frame) * 6, r = d.rects, w = r[o + 2], h = r[o + 3];
  if (!w || !h) return;
  ctx.drawImage(IMG[d.image], r[o], r[o + 1], w, h, -r[o + 4] * scale, -r[o + 5] * scale, w * scale, h * scale);
}
export function drawVfx(ctx, e, t) {
  if (e.basic) return false;
  if (skillVisual(e.skillId)) return drawSkillVfx(ctx, e, t);
  const d = pick(FX.styles?.[e.style]?.[e.type], FX.effects?.[e.type]);
  if (!d) return false;
  const r = Math.max(e.r || 0, d.minR || 0), scale = d.fit ? clamp(r * d.fit / d.half, 0.3, 2.5) : d.scale || 1;
  ctx.save(); ctx.translate(e.x + Math.cos(e.angle || 0) * (d.along || 0) * r, e.y + Math.sin(e.angle || 0) * (d.along || 0) * r - (d.lift || 0));
  if (d.rotate && d.dirs === 1) ctx.rotate(e.angle || 0);
  ctx.globalAlpha = t > 0.75 ? Math.max(0, (1 - t) / 0.25) : 1;
  if (d.blend) ctx.globalCompositeOperation = d.blend;
  blitFx(ctx, d, Math.min(d.frames - 1, Math.floor(t * d.frames)), d.dirs > 1 ? dirIndex(e.angle || 0, d.dirs) : 0, scale);
  ctx.restore(); return true;
}
export function drawProjectileVfx(ctx, p, time) {
  if (skillVisual(p.skillId)) return drawSkillVfx(ctx, { ...p, projectile: true }, 0);
  const d = pick(FX.styles?.[p.style]?.proj, FX.projectiles?.[p.type]);
  if (!d) return false;
  ctx.save(); ctx.translate(p.x, p.y - 34); if (d.blend) ctx.globalCompositeOperation = d.blend;
  const frame = d.frames > 1 ? Math.floor((p.age || 0) * 1000 / Math.max(16, d.interval)) % d.frames : 0;
  blitFx(ctx, d, frame, d.dirs > 1 ? dirIndex(p.angle, d.dirs) : 0, d.scale || 1); ctx.restore(); return true;
}
// Native frames only: no procedural rings/rays/petals and no cloned attack artwork on victims.
export function drawSkillVfx(ctx, e, t) {
  const profile = skillVisual(e.skillId), source = FX.skills?.[e.skillId];
  if (!profile || !source) return false;
  if (source.fullLevel) return true; // the shared source-graph presentation draws every layer
  const hit = e.type === 'hit' || e.type === 'hitBig', pre = e.type === 'precast' || (profile.precastOnly && !hit);
  const d = source[hit ? 'impact' : pre ? 'precast' : 'cast'];
  if (!d) return true; // the source explicitly has no image for this stage
  if (!IMG[d.image]) return false;
  const a = e.angle || 0, period = d.frames * d.frameMs / 1000;
  const age = e.age ?? t * (e.max || period), loop = e.projectile || e.loop;
  const rawFrame = Math.floor(age * 1000 / d.frameMs);
  const frame = loop ? rawFrame % d.frames : Math.min(d.frames - 1, rawFrame);
  const along = hit || pre || e.projectile || profile.placement === 'center' ? 0 : (e.r || 100) * (profile.placement === 'beam' ? clamp(age / period, 0.1, 0.85) : 0.45);
  const lift = e.projectile ? profile.projectileLift ?? 34 : 0;
  ctx.save(); ctx.translate(e.x + Math.cos(a) * along, e.y + Math.sin(a) * along - lift);
  ctx.globalCompositeOperation = d.blend || 'source-over';
  blitFx(ctx, d, frame, d.dirs > 1 ? dirIndex(a, d.dirs) : 0, d.scale || 1);
  ctx.restore(); return true;
}
export const nativeSprite = id => FX.nativeSprites?.[id] || null;
// Cull by the current source frame's actual rectangle, never by the projectile
// origin: large anchored beams can enter the view while their origin is outside.
export function nativeVisualBounds(visual) {
  const d=nativeSprite(visual.assetId);if(!d)return null;
  const a=visual.actor,age=a?.age??visual.age,angle=a?.angle??visual.angle;
  const raw=Math.floor(age*1000/d.frameMs),frame=visual.loop?raw%d.frames:Math.min(d.frames-1,raw);
  const dir=d.dirs>1?dirIndex(angle||0,d.dirs):0,o=(dir*d.frames+frame)*6,r=d.rects,s=d.scale||1;
  if(!r[o+2]||!r[o+3])return null;
  const lift=a?(+a.missile.raw.MissleHeight||0):0,x=(a?.x??visual.x)-r[o+4]*s,y=(a?.y??visual.y)-lift-r[o+5]*s;
  return {x0:x,y0:y,x1:x+r[o+2]*s,y1:y+r[o+3]*s};
}
export function nativeVisualVisible(visual,x0,y0,x1,y1) {
  const b=nativeVisualBounds(visual);
  return !!b&&b.x1>=x0&&b.x0<=x1&&b.y1>=y0&&b.y0<=y1;
}
export function drawNativePresentation(ctx, cast) { for (const visual of cast.visuals) drawNativeVisual(ctx, visual); }
export function drawNativeVisual(ctx, visual) {
  const d = nativeSprite(visual.assetId); if (!d || !IMG[d.image]) return;
  const a = visual.actor, age = a?.age ?? visual.age, angle = a?.angle ?? visual.angle;
  const raw = Math.floor(age * 1000 / d.frameMs), frame = visual.loop ? raw % d.frames : Math.min(d.frames - 1, raw);
  const lift = a ? +a.missile.raw.MissleHeight || 0 : 0;
  ctx.save(); ctx.translate(a?.x ?? visual.x, (a?.y ?? visual.y) - lift);
  ctx.globalCompositeOperation = d.blend || 'source-over';
  blitFx(ctx, d, frame, d.dirs > 1 ? dirIndex(angle || 0, d.dirs) : 0, d.scale || 1);
  ctx.restore();
}
// Where a source visual sits in the depth order of the scene: a standing missile at ground height is painted on the
// ground under everyone; anything else is sorted by its ground y with the characters (behind a figure it passes behind,
// in front of one it passes in front of). AnimFileB is kept one step behind its AnimFile. An isometric depth rule of
// this game, not a certified copy of the client renderer.
export function nativeDepth(visual) {
  const a = visual.actor;
  if (a && !a.speed && !(+a.missile.raw.MissleHeight)) return { ground: true };
  return { ground: false, y: (a?.y ?? visual.y) + (visual.layer === 'back' ? -0.6 : visual.layer === 'precast' ? 0.2 : 0.4) };
}
