import { skillVisual, SKILL_VISUALS, motionFor } from './skill-visuals.js';
// Data-driven 8-direction character sprites.
// Poses come from data/animations.json (editable in studio.html): each action is a set of keyframes over
// named joint channels. The rig is projected with the map's oblique camera, painted, outlined and cached.
// Hand-painted sprite sheets listed in data/sprites.json replace the procedural rig per look.
import { TAU, clamp, shade, makeCanvas, smooth, lerp } from './util.js';
import { validateAnimationConfig } from './animation-config.js';
import { CanvasCache, touchDevice, releaseCanvas, imageSurfaceStats } from './canvas-cache.js';

let CFG = null, version = 0, SIN_E = 0.57, COS_E = 0.82, LIGHT = [-0.5, -0.25, 0.83], CAM = [0, 0.82, 0.57];
let SHEETS = {}, SHEET_IMAGES = {};
const resolved = new Map();
const cache = new CanvasCache({ maxBytes: (touchDevice() ? 16 : 48) * 1048576, maxEntries: 1000, canvas: value => value.img });
let collectingRequests = null;
export const spriteCacheStats = () => ({ ...cache.stats(), sheetImages: Object.keys(SHEET_IMAGES).length, sources: imageSurfaceStats(Object.values(SHEET_IMAGES)), pendingImages: pendingImages.size });
let scratch = makeCanvas(320, 320), sctx = scratch.getContext('2d');

export const CHANNELS = ['bob', 'fwd', 'lean', 'twist', 'fall', 'lag', 'lift', 'spread', 'cloth', 'lsw', 'lk', 'rsw', 'rk', 'lap', 'lab', 'lel', 'rap', 'rab', 'rel', 'wrist'];
export const CHANNEL_INFO = {
  bob: 'Nhấp nhô thân (đơn vị)', fwd: 'Dồn người tới trước', lean: 'Nghiêng thân trước/sau', twist: 'Vặn thân', fall: 'Ngã ngửa', lag: 'Vạt áo bay sau',
  lift: 'Vạt áo nâng lên', spread: 'Vạt áo xòe', cloth: 'Dải lưng phấp phới', lsw: 'Đùi trái vung', lk: 'Gối trái gập', rsw: 'Đùi phải vung', rk: 'Gối phải gập',
  lap: 'Vai trái nâng', lab: 'Vai trái dang', lel: 'Khuỷu trái gập', rap: 'Vai phải nâng', rab: 'Vai phải dang', rel: 'Khuỷu phải gập', wrist: 'Cổ tay / hướng binh khí',
};

export function setAnimConfig(cfg) {
  validateAnimationConfig(cfg);
  CFG = cfg; version++;
  resolved.clear(); cache.clear();
  const e = (cfg.camera?.elevation ?? 35) * Math.PI / 180;
  SIN_E = Math.sin(e); COS_E = Math.cos(e); CAM = [0, COS_E, SIN_E];
}
export const animConfig = () => CFG;
export function setSheets(manifest, images, loader) { SHEETS = manifest?.sheets || {}; SHEET_IMAGES = images || {}; loadSheetImage = loader || null; cache.clear(); }
export const DIRS = () => CFG?.directions || 8;
export function dirFromAngle(a) { const n = DIRS(); return ((Math.round(a / (TAU / n)) % n) + n) % n; }

// ---------- actions ----------
function resolveDef(key) {
  if (resolved.has(key)) return resolved.get(key);
  const raw = CFG.actions[key];
  if (!raw) return null;
  let def = raw;
  if (raw.extends) {
    const parent = resolveDef(raw.extends) || {};
    const strip = new Set(raw.strip || []);
    const keys = raw.keys || (parent.keys || []).map(k => { const c = { ...k }; for (const s of strip) delete c[s]; return c; });
    def = { ...parent, ...raw, pose: { ...(parent.pose || {}), ...(raw.pose || {}) }, keys };
  }
  def = { frames: 1, duration: 0.5, loop: false, impact: 0.5, keys: [], pose: {}, ...def };
  def.keys = [...def.keys].sort((a, b) => a.t - b.t);
  resolved.set(key, def);
  return def;
}
// "attack" + "dao" -> attack.dao, else attack, else idle.
export function resolveAction(name, weapon) {
  const tries = [];
  if (weapon) tries.push(`${name}.${weapon}`);
  tries.push(name);
  const dot = name.indexOf('.');
  if (dot > 0) { if (weapon) tries.push(`${name.slice(0, dot)}.${weapon}`); tries.push(name.slice(0, dot)); }
  tries.push('idle');
  for (const k of tries) if (CFG.actions[k]) return k;
  return 'idle';
}
export function actionInfo(name, weapon) { return resolveDef(resolveAction(name, weapon)); }

export function poseAt(def, t) {
  const rest = { ...CFG.base, ...def.pose };
  const P = { ...rest };
  const keys = def.keys;
  if (!keys.length) return P;
  const n = keys.length;
  let a, b, u;
  if (def.loop) {
    t = ((t % 1) + 1) % 1;
    let i = n - 1;
    for (let k = 0; k < n; k++) if (keys[k].t <= t) i = k;
    a = keys[i]; b = keys[(i + 1) % n];
    const at = a.t, bt = i + 1 < n ? b.t : b.t + 1, tt = t < at ? t + 1 : t;
    u = bt > at ? (tt - at) / (bt - at) : 0;
  } else {
    t = clamp(t, 0, 1);
    if (t <= keys[0].t) { a = b = keys[0]; u = 0; }
    else if (t >= keys[n - 1].t) { a = b = keys[n - 1]; u = 0; }
    else { let i = 0; while (keys[i + 1].t < t) i++; a = keys[i]; b = keys[i + 1]; u = (t - a.t) / (b.t - a.t); }
  }
  u = smooth(clamp(u, 0, 1));
  for (const ch of CHANNELS) {
    const va = a[ch] ?? rest[ch] ?? 0, vb = b[ch] ?? rest[ch] ?? 0;
    P[ch] = va + (vb - va) * u;
  }
  return P;
}
export function frameT(def, frame) { return def.loop ? frame / def.frames : def.frames > 1 ? frame / (def.frames - 1) : 0; }

// Keep gameplay timing fixed while aligning the artist's contact pose with it.
export function animationProgress(anim, def) {
  const t = clamp(anim.t / anim.dur, 0, 1), hit = anim.impactAt / anim.dur;
  if (!Number.isFinite(hit) || hit <= 0 || hit >= 1) return t;
  return t <= hit ? t / hit * def.impact : def.impact + (t - hit) / (1 - hit) * (1 - def.impact);
}

// ---------- frames ----------
export function getFrame(look, body, dir, action, frame, scale = 1, weapon = look.weapon, skillId = null) {
  const key = `${version}|${look.id}@${look.costume || ''}~${look.wear ?? ''}.${look.rank ?? ''}|${body}|${weapon}|${dir}|${action}|${frame}|${scale}|${skillId || ""}`;
  let entry = cache.get(key);
  if (entry) { for (const file of entry.waitingFor || []) requestSheetImage(file); return entry; }
  // armour / weapon art still loading: keep showing the costume look rather than the procedural rig
  const dressed = look.wear != null || look.rank != null;
  const waitingFor = new Set(), previousRequests = collectingRequests;
  collectingRequests = waitingFor;
  try {
    // while the real art is on its way (waitingFor), nothing is drawn rather than the procedural rig: a fighter or a
    // monster appears in its own look, never as the old stand-in; the rig stays for poses that have no art at all
    entry = playerFrame(look, weapon, dir, action, frame, scale, skillId) || (dressed && playerFrame({ ...look, wear: undefined, rank: undefined }, weapon, dir, action, frame, scale, skillId))
      || sheetFrame(look, weapon, dir, action, frame, scale) || (waitingFor.size ? pendingFrame() : renderFrame(look, body, dir, action, frame, scale, weapon));
  } finally { collectingRequests = previousRequests; }
  if (waitingFor.size) entry.waitingFor = waitingFor;
  cache.set(key, entry);
  return entry;
}

// "<look>.<weapon>", then "<look>", then "*.<weapon>" (shared by every look); the first one whose image is
// loaded wins. Missing images are requested through the loader given to setSheets and used once they arrive.
// An action may carry its own image, cell size and anchor, or a packed atlas (rects); otherwise the sheet's apply.
function sheetAction(look, weapon, action) {
  for (const key of [`${look.id}.${weapon}`, look.id, `*.${weapon}`]) {
    const sheet = SHEETS[key];
    if (!sheet) continue;
    // actions the artist has not painted yet fall back to the procedural rig
    const name = [action, action.split('.')[0]].find(n => sheet.actions[n]);
    if (!name) continue;
    const a = sheet.actions[name], file = a.image || sheet.image;
    if (SHEET_IMAGES[file]) return { sheet, a, img: SHEET_IMAGES[file] };
    requestSheetImage(file);
  }
  return null;
}
let loadSheetImage = null;
const pendingImages = new Map(), retryAfter = new Map();
function loadPart(file) {
  if (SHEET_IMAGES[file]) return Promise.resolve(SHEET_IMAGES[file]);
  if (pendingImages.has(file)) return pendingImages.get(file);
  if (!loadSheetImage || (retryAfter.get(file) || 0) > performance.now()) return Promise.reject(Error('Hình nhân vật chưa sẵn sàng'));
  const job = loadSheetImage(file).then(img => {
    SHEET_IMAGES[file] = img; retryAfter.delete(file);
    // Invalidate only poses that actually waited for this file. Clearing every
    // fighter's frame cache for each downloaded part causes repeated canvas churn.
    for (const [key, entry] of cache) if (entry.waitingFor?.has(file)) cache.delete(key);
    return img;
  }).catch(err => {
    retryAfter.set(file, performance.now() + 3000); console.warn('Thiếu sprite sheet', file); throw err;
  }).finally(() => pendingImages.delete(file));
  pendingImages.set(file, job); return job;
}
function requestSheetImage(file) {
  collectingRequests?.add(file);
  if (SHEET_IMAGES[file] || pendingImages.has(file) || (retryAfter.get(file) || 0) > performance.now()) return;
  void loadPart(file).catch(() => {});
}
// Sheets and VLTK player avatars keep their own frame count (and loop length when given); the renderer indexes
// frames in that space.
export function sheetTiming(look, weapon, action, skillId = null) {
  const p = playerAction(look, weapon, action, skillId);
  if (p) return { frames: p.per, duration: p.loop ? p.per * p.interval / VLTK_FPS : undefined };
  const s = sheetAction(look, weapon, action);
  return s && { frames: s.a.frames, duration: s.a.duration, impact: s.a.impact };
}

// ---------- VLTK1 player characters (data/vltk-player.json, tools/vltk1-import/export-player.cjs) ----------
// Like the original client, a character is drawn from parts (shadow, head, hair, body, hands, weapons) in the
// per-direction order of the game's render-order table; the weapon type picks the action family.
let PLAYER = null;
const VLTK_FPS = 18; // original client frame rate: SPR intervals count these frames
export function setPlayerData(data) { PLAYER = data; cache.clear(); version++; }
// the exported look of an avatar: the worn Y phục (look.wear: band 0..2 or 'gold' = the sect set, data.js ARMOR_WEAR),
// else its costume (look.costume); the sect costume when that look was not exported
const lookOf = look => (look.wear === 'gold' && PLAYER?.avatars[look.id]) || (look.wear != null && PLAYER?.avatars[`${look.id}@wear${look.wear}`])
  || (look.costume && PLAYER?.avatars[`${look.id}@${look.costume}`]) || PLAYER?.avatars[look.id];
// The client actions a player figure plays for a cast with this weapon in hand (QA and the library page).
export function castMotion(look, weapon, skillId) { const p = playerAction(look, weapon, 'skill', skillId); return p?.steps ? p.steps.map(x => x.act) : p ? [p.act] : []; }
function playerAction(look, weapon, action, skillId = null) {
  const profile = action.startsWith("skill") && lookOf(look) && skillVisual(skillId);
  if (profile) {
    // the motion follows the weapon the figure holds while casting, not the manual's own weapon class
    const steps = motionFor(weapon).map(act => playerAction(look, weapon, "@" + act));
    if (steps.some(p => !p)) throw Error(`Missing player motion: ${look.id}/${weapon}/${skillId}`);
    if (steps.length) return { ...steps[0], steps, per: steps.reduce((n, p) => n + p.per, 0), loop: false };
  }
  const av = lookOf(look);
  if (!av) return null;
  const w = PLAYER.weapons[weapon] ? weapon : 'quyen', W = PLAYER.weapons[w], base = action.split('.')[0];
  const act = action.startsWith('@') ? action.slice(1) : base === 'attack' ? W.attack : PLAYER.actions[W.cls][base];
  if (!act) return null;
  // the quality of the weapon in hand picks its source art ("<type>.<quality>", export-player.cjs WEAPON_RANKS)
  const sex = PLAYER.sexes[av.sex], t = sex.timing[act] || {}, wkey = look.rank != null && sex.weapons[`${w}.${look.rank}`] ? `${w}.${look.rank}` : w;
  const layers = { shadow: sex.shadow[act], ...av.parts[act], ...sex.weapons[wkey]?.[act] };
  const body = PLAYER.files[layers.body];
  if (!body) return null;
  return { act, sex, layers, per: t.frames || body.frames, interval: t.interval || 1, loop: PLAYER.loops.includes(base) };
}
// file names of the parts an avatar needs for one weapon (preload), or for everything it was drawn with so far;
// bases narrows it to some actions (the start screen needs the standing pose first: ['idle'])
export function playerFiles(look, weapon, bases = null) {
  const out = new Set();
  // every cast with this weapon in hand uses its motion (skill-visuals.js motionFor)
  const motions = motionFor(weapon);
  for (const base of bases || Object.keys(PLAYER?.actions.Melee || {}).concat('attack', ...new Set(motions.map(a => '@' + a)))) {
    const p = playerAction(look, weapon, base);
    if (p) for (const f of Object.values(p.layers)) if (f) out.add(PLAYER.files[f].image);
  }
  return [...out];
}
export const playerDataReady = () => !!PLAYER;
// background fetch of hand-painted sheets (the poses waiting for them are redrawn once each arrives)
export const prefetchSheets = files => Promise.allSettled(files.map(f => loadPart(f)));
// the real art of this pose is in memory (false while the procedural stand-in would be drawn)
export function poseReady(look, weapon, action) {
  if (!PLAYER) return false;
  const p = playerAction(look, weapon, action);
  return !!p && Object.values(p.layers).every(f => !f || SHEET_IMAGES[PLAYER.files[f]?.image]);
}
export async function preparePlayer(look, weapons, bases = null) {
  const files = [...new Set(weapons.flatMap(w => playerFiles(look, w, bases)))];
  let index = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (index < files.length) {
      const file = files[index++];
      if (!SHEET_IMAGES[file]) {
        if (!loadSheetImage) throw Error('Player image loader is not ready');
        await loadPart(file);
      }
    }
  }));
}
function playerFrame(look, weapon, dir, action, frame, scale, skillId) {
  let p = playerAction(look, weapon, action, skillId);
  if (!p) return null;
  if (p.steps) {
    let cursor = clamp(frame, 0, p.per - 1);
    for (const step of p.steps) { if (cursor < step.per) { p = step; frame = cursor; break; } cursor -= step.per; }
  }
  // every part must be loaded, else fall back to the shared sheet until they arrive
  let ready = true;
  for (const f of Object.values(p.layers)) if (f && !SHEET_IMAGES[PLAYER.files[f].image]) { requestSheetImage(PLAYER.files[f].image); ready = false; }
  if (!ready) return null;
  const d = (Math.round(dir * 8 / DIRS()) + PLAYER.dirOffset) % 8, i = clamp(frame, 0, p.per - 1);
  const ord = p.sex.order[p.act];
  const line = ord.lines.find(l => l.frame === d * p.per + i);
  const names = (line?.order || ord.dirs[2 * d + 1]).map(n => ORDER_PART[n]).filter(Boolean);
  const draws = [];
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const part of names) {
    const meta = PLAYER.files[p.layers[part]];
    if (!meta) continue;
    const pf = Math.min(meta.frames - 1, Math.floor(i * meta.frames / p.per));
    const o = ((d % meta.dirs) * meta.frames + pf) * 6, r = meta.rects;
    if (!r[o + 2]) continue;
    const dx = -r[o + 4], dy = -r[o + 5];
    draws.push([SHEET_IMAGES[meta.image], r[o], r[o + 1], r[o + 2], r[o + 3], dx, dy]);
    x0 = Math.min(x0, dx); y0 = Math.min(y0, dy); x1 = Math.max(x1, dx + r[o + 2]); y1 = Math.max(y1, dy + r[o + 3]);
  }
  if (!draws.length) return null;
  const w = Math.ceil((x1 - x0) * scale), h = Math.ceil((y1 - y0) * scale);
  const out = makeCanvas(Math.max(1, w), Math.max(1, h)), o = out.getContext('2d');
  o.scale(scale, scale);
  for (const [img, sx, sy, sw, sh, dx, dy] of draws) o.drawImage(img, sx, sy, sw, sh, dx - x0, dy - y0, sw, sh);
  return { img: out, sx: 0, sy: 0, sw: out.width, sh: out.height, ax: -x0 * scale, ay: -y0 * scale, dw: out.width, dh: out.height, source: 'player', avatarId: look.id, action: p.act, gender: avGender(look) };
}
const avGender = look => lookOf(look)?.sex;
// render-order table part indices (see tools/vltk1-import/player-parts.cjs); horse parts are not drawn yet
const ORDER_PART = { '-1': 'shadow', 0: 'head', 1: 'hair', 4: 'body', 5: 'shoulder', 6: 'lefthand', 7: 'righthand', 8: 'leftweapon', 9: 'rightweapon' };

function sheetFrame(look, weapon, dir, action, frame, scale) {
  const s = sheetAction(look, weapon, action);
  if (!s) return null;
  const { sheet, a, img } = s;
  const dirs = sheet.directions || 8;
  const d = (Math.round(dir * dirs / DIRS()) + (sheet.dirOffset || 0)) % dirs;
  const f = clamp(frame, 0, a.frames - 1);
  const k = (sheet.scale || 1) / scale;
  if (a.rects) {
    // packed atlas: x, y, w, h, anchor x, anchor y per frame, ordered direction × frame
    const o = (d * a.frames + f) * 6, [x, y, w, h, ax, ay] = a.rects.slice(o, o + 6);
    return { img, sx: x, sy: y, sw: Math.max(1, w), sh: Math.max(1, h), ax: ax / k, ay: ay / k, dw: w / k, dh: h / k };
  }
  const fw = a.frameW || sheet.frameW, fh = a.frameH || sheet.frameH;
  return { img, sx: f * fw, sy: ((a.row || 0) + d) * fh, sw: fw, sh: fh, ax: (a.anchorX ?? sheet.anchorX) / k, ay: (a.anchorY ?? sheet.anchorY) / k, dw: fw / k, dh: fh / k };
}

function renderFrame(look, body, dir, action, frame, scale, weapon) {
  const w = Math.ceil(160 * scale), h = Math.ceil(190 * scale), ax = w / 2, ay = h - 22 * scale;
  if (scratch.width < w + 6 || scratch.height < h + 6) { releaseCanvas(scratch); scratch = makeCanvas(w + 6, h + 6); sctx = scratch.getContext('2d'); }
  sctx.setTransform(1, 0, 0, 1, 0, 0);
  sctx.clearRect(0, 0, scratch.width, scratch.height);
  sctx.translate(ax + 3, ay + 3);
  const theta = dir * TAU / DIRS();
  if (body === 'human') {
    const def = actionInfo(action, weapon);
    drawPose(sctx, look, weapon, theta, poseAt(def, frameT(def, frame)), scale);
  } else drawBeast(sctx, look, body, theta, action, frame, scale);
  const out = makeCanvas(w, h), o = out.getContext('2d');
  const ow = CFG.outline?.width ?? 1;
  if (ow > 0) {
    const offs = ow >= 2 ? [[-2, 0], [2, 0], [0, -2], [0, 2], [-1, -1], [1, 1], [-1, 1], [1, -1]] : [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dx, dy] of offs) o.drawImage(scratch, dx - 3, dy - 3);
    o.globalCompositeOperation = 'source-in'; o.fillStyle = CFG.outline?.color || '#16120e'; o.fillRect(0, 0, w, h);
    o.globalCompositeOperation = 'source-over';
  }
  o.drawImage(scratch, -3, -3);
  return { img: out, sx: 0, sy: 0, sw: w, sh: h, ax, ay, dw: w, dh: h };
}

// an empty frame: blit draws nothing. Its own 1×1 canvas, since the frame cache releases (zeroes) the canvas of an
// entry it drops, and a shared one would break every other pending entry.
function pendingFrame() { return { img: makeCanvas(1, 1), sx: 0, sy: 0, sw: 1, sh: 1, ax: 0, ay: 0, dw: 0, dh: 0, pending: true }; }
export function blit(ctx, fr, x, y) { if (!fr.dw || !fr.dh) return; ctx.drawImage(fr.img, fr.sx, fr.sy, fr.sw, fr.sh, x - fr.ax, y - fr.ay, fr.dw, fr.dh); }

// ---------- rig helpers ----------
function rotX(p, a, cy, cz) { const y = p[1] - cy, z = p[2] - cz, c = Math.cos(a), s = Math.sin(a); return [p[0], cy + y * c - z * s, cz + y * s + z * c]; }
function rotY(p, a, cx, cz) { const x = p[0] - cx, z = p[2] - cz, c = Math.cos(a), s = Math.sin(a); return [cx + x * c - z * s, p[1], cz + x * s + z * c]; }
function rotZ(p, a) { const c = Math.cos(a), s = Math.sin(a); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]]; }
const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };

function makeProjector(theta, scale, worldFn) {
  const cf = Math.cos(theta), sf = Math.sin(theta);
  return p => {
    const q = worldFn(p);
    const x = q[0] * scale, y = q[1] * scale, z = q[2] * scale;
    const gx = -x * sf + y * cf, gy = x * cf + y * sf;
    return { x: gx, y: gy * SIN_E - z * COS_E, d: gy * COS_E + z * SIN_E, g: [gx, gy, z] };
  };
}
function capsule(ctx, a, b, width, color, scale) {
  ctx.strokeStyle = shade(color, 0.5); ctx.lineWidth = (width + 1.6) * scale;
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  ctx.strokeStyle = color; ctx.lineWidth = width * scale;
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
}
function ball(ctx, c, r, color, scale) {
  const rr = r * scale;
  const g = ctx.createRadialGradient(c.x - rr * 0.35, c.y - rr * 0.4, rr * 0.1, c.x, c.y, rr);
  g.addColorStop(0, shade(color, 1.18)); g.addColorStop(0.65, color); g.addColorStop(1, shade(color, 0.62));
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c.x, c.y, rr, 0, TAU); ctx.fill();
}
function lathe(ctx, rings, centers, color, capTop = false) {
  const segs = rings[0].length;
  for (let i = 0; i < rings.length - 1; i++) {
    const axis = [(centers[i].g[0] + centers[i + 1].g[0]) / 2, (centers[i].g[1] + centers[i + 1].g[1]) / 2, (centers[i].g[2] + centers[i + 1].g[2]) / 2];
    for (let j = 0; j < segs; j++) {
      const a = rings[i][j], b = rings[i][(j + 1) % segs], c = rings[i + 1][(j + 1) % segs], d = rings[i + 1][j];
      let n = norm(cross(sub(b.g, a.g), sub(d.g, a.g)));
      const mid = [(a.g[0] + c.g[0]) / 2, (a.g[1] + c.g[1]) / 2, (a.g[2] + c.g[2]) / 2];
      if (dot(n, sub(mid, axis)) < 0) n = [-n[0], -n[1], -n[2]];
      if (dot(n, CAM) < -0.04) continue;
      const fill = shade(color, clamp(0.8 + 0.42 * dot(n, LIGHT), 0.5, 1.14));
      ctx.fillStyle = fill; ctx.strokeStyle = fill; ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(c.x, c.y); ctx.lineTo(d.x, d.y); ctx.closePath(); ctx.fill(); ctx.stroke();
    }
  }
  if (capTop) {
    const top = rings[rings.length - 1];
    ctx.fillStyle = shade(color, 0.98);
    ctx.beginPath(); top.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.closePath(); ctx.fill();
  }
}
function ring(P, cx, cy, z, rx, ry, segs) {
  const pts = [];
  for (let j = 0; j < segs; j++) { const a = j / segs * TAU; pts.push(P([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, z])); }
  return pts;
}

// ---------- humanoid ----------
// Draws one pose. Exported so the studio can preview live edits without caching.
export function drawPose(ctx, look, weapon, theta, P, scale) {
  const B = CFG.body, WC = CFG.weapons[weapon] || null;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const hz = B.hipZ;
  const upperFn = p => rotX(rotZ(p, P.twist), -P.lean, 0, hz);
  const whole = p => { const q = [p[0], p[1] + P.fwd, p[2] + P.bob]; return P.fall ? rotX(q, P.fall, 0, 0) : q; };
  const G = makeProjector(theta, scale, whole);
  const U = p => G(upperFn(p));
  const items = [];

  const legsItems = [];
  for (let side = -1, i = 0; side <= 1; side += 2, i++) {
    const sw = i ? P.rsw : P.lsw, kb = i ? P.rk : P.lk;
    const hip = [side * B.hipW, 0, hz];
    const knee = add(hip, [0, Math.sin(sw), -Math.cos(sw)], B.thigh);
    const sa = sw - kb;
    const foot = add(knee, [0, Math.sin(sa), -Math.cos(sa)], B.shin);
    const ph = G(hip), pk = G(knee), pf = G(foot), pt = G(add(foot, [0, 1, 0], B.foot)), pb = G(add(foot, [0, -Math.sin(sa), Math.cos(sa)], 8));
    legsItems.push({ d: pk.d, draw: () => { capsule(ctx, ph, pk, B.legW, look.pants, scale); capsule(ctx, pk, pf, B.shinW, look.pants, scale); capsule(ctx, pb, pf, B.bootW, look.boots, scale); capsule(ctx, pf, pt, B.bootW - 0.8, look.boots, scale); } });
  }
  legsItems.sort((a, b) => a.d - b.d);

  const fist = WC?.style === 'fist';
  const hands = [];
  for (let side = -1, i = 0; side <= 1; side += 2, i++) {
    const ap = i ? P.rap : P.lap, ab = i ? P.rab : P.lab, el = i ? P.rel : P.lel;
    const sh = [side * B.shoulderW, 0, B.shoulderZ];
    const up = norm([side * Math.sin(ab), Math.sin(ap) * Math.cos(ab), -Math.cos(ap) * Math.cos(ab)]);
    const elbow = add(sh, up, B.upperArm);
    const q = ap + el;
    const fore = norm([side * Math.sin(ab) * 0.7, Math.sin(q) * Math.cos(ab), -Math.cos(q) * Math.cos(ab)]);
    const hand = add(elbow, fore, B.foreArm);
    const cuff = add(elbow, fore, B.foreArm * 0.72);
    hands.push({ hand, q, side, ab });
    const ps = U(sh), pe = U(elbow), pc = U(cuff), phd = U(hand);
    items.push({ d: (ps.d + pe.d) / 2, draw: () => {
      capsule(ctx, ps, pe, B.sleeveW, look.robe, scale); capsule(ctx, pe, pc, B.sleeveW - 0.4, look.robe, scale);
      capsule(ctx, pc, U(add(cuff, fore, 1.5)), B.cuffW, look.trim, scale);
      if (fist) { ball(ctx, phd, WC.size, WC.color, scale); ctx.strokeStyle = shade(WC.color, 1.4); ctx.lineWidth = 0.8 * scale; ctx.beginPath(); ctx.arc(phd.x, phd.y, WC.size * 0.6 * scale, 3.6, 5.6); ctx.stroke(); }
      else ball(ctx, phd, B.handR, look.skin, scale);
    } });
  }
  if (WC && !fist) {
    const R = hands[1];
    const w = R.q + P.wrist;
    const wd = norm([R.side * Math.sin(R.ab) * 0.4, Math.sin(w), -Math.cos(w)]);
    const hand = R.hand;
    let pts;
    if (WC.style === 'pole' || WC.style === 'spear') pts = { a: U(add(hand, wd, -WC.back)), b: U(add(hand, wd, WC.front)), tip: U(add(hand, wd, WC.front + (WC.headLen || 0))) };
    else if (WC.style === 'blade') pts = { a: U(add(hand, wd, 2)), b: U(add(hand, wd, WC.length)), back: U(add(hand, wd, -WC.hilt)) };
    else pts = { a: U(add(hand, wd, 1)), b: U(add(hand, wd, WC.length)) };
    pts.h = U(hand);
    items.push({ d: (pts.a.d + pts.b.d) / 2 + 1, draw: () => drawWeapon(ctx, WC, pts, scale) });
  }

  const body = G(upperFn([0, 0, hz + 14]));
  const back = items.filter(i => i.d < body.d).sort((a, b) => a.d - b.d);
  const front = items.filter(i => i.d >= body.d).sort((a, b) => a.d - b.d);

  const legMid = (Math.sin(P.lsw) + Math.sin(P.rsw)) * 7;
  const SEG = 12;
  const hemZ = B.hemZ + P.lift, hemY = P.lag + legMid * 0.55;
  const midZ = (hz + 1 + hemZ) / 2 + P.lift * 0.3;
  const skirtRings = [
    ring(G, 0, 0, hz + 1, B.waistRx, B.waistRy, SEG),
    ring(G, 0, hemY * 0.45, midZ, (B.waistRx + B.hemRx) / 2 + P.spread * 0.4, (B.waistRy + B.hemRy) / 2 + P.spread * 0.4, SEG),
    ring(G, 0, hemY, hemZ, B.hemRx + P.spread, B.hemRy + P.spread + Math.abs(legMid) * 0.3, SEG),
  ];
  const skirtCenters = [G([0, 0, hz + 1]), G([0, hemY * 0.45, midZ]), G([0, hemY, hemZ])];
  const cz = hz + 18, sz = B.shoulderZ;
  const torsoRings = [ring(U, 0, 0, hz, B.waistRx * 0.94, B.waistRy * 0.92, SEG), ring(U, 0, 0.5, cz, B.chestRx, 8.2, SEG), ring(U, 0, 0, sz + 0.5, B.shoulderRx, 7.2, SEG), ring(U, 0, 0, sz + 3.5, 7, 5, SEG)];
  const torsoCenters = [U([0, 0, hz]), U([0, 0.5, cz]), U([0, 0, sz + 0.5]), U([0, 0, sz + 3.5])];
  const sashRings = [ring(U, 0, 0, hz - 3, B.waistRx * 1.06, B.waistRy * 1.07, SEG), ring(U, 0, 0, hz + 3.5, B.waistRx * 1.02, B.waistRy * 1.02, SEG)];
  const sashCenters = [U([0, 0, hz - 3]), U([0, 0, hz + 3.5])];

  const tailA = U([3, -8, hz - 2]), tailB = G([4 + P.cloth * 1.5, -11 + P.lag * 0.8, hz - 16 + P.lift * 0.6]), tailC = G([5 + P.cloth * 2.5, -13 + P.lag * 1.5, hz - 26 + P.lift]);
  const tail = () => { ctx.strokeStyle = shade(look.sash, 0.55); ctx.lineWidth = 3.6 * scale; ctx.beginPath(); ctx.moveTo(tailA.x, tailA.y); ctx.quadraticCurveTo(tailB.x, tailB.y, tailC.x, tailC.y); ctx.stroke(); ctx.strokeStyle = look.sash; ctx.lineWidth = 2.4 * scale; ctx.stroke(); };
  const tailBehind = tailB.d < body.d;

  for (const i of legsItems) i.draw();
  if (tailBehind) tail();
  for (const i of back) i.draw();
  lathe(ctx, skirtRings, skirtCenters, look.robe);
  ctx.strokeStyle = look.trim; ctx.lineWidth = 1.6 * scale; ctx.beginPath();
  let started = false;
  for (let j = 0; j <= SEG; j++) {
    const p = skirtRings[2][j % SEG];
    if (p.d >= skirtCenters[2].d - 2 * scale) { started ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); started = true; } else started = false;
  }
  ctx.stroke();
  if (look.patches) {
    ctx.fillStyle = shade(look.robe, 0.68);
    for (const [x, y, z] of [[-6, 9, 26], [5, 8, 34], [3, 7, 62]]) { const p = (z > hz ? U : G)([x, y, z]); if (p.d > body.d - 4) ctx.fillRect(p.x - 2.2 * scale, p.y - 2 * scale, 4.4 * scale, 4 * scale); }
  }
  lathe(ctx, torsoRings, torsoCenters, look.robe, true);
  const n1 = U([-4, 4, sz + 2]), n2 = U([0, 7, cz]), n3 = U([4, 4, sz + 2]);
  ctx.strokeStyle = look.trim; ctx.lineWidth = 1.8 * scale; ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.lineTo(n2.x, n2.y); ctx.lineTo(n3.x, n3.y);
  if (n2.d > torsoCenters[1].d) ctx.stroke();
  lathe(ctx, sashRings, sashCenters, look.sash);
  if (!tailBehind) tail();
  drawHead(ctx, look, U, B, scale);
  for (const i of front) i.draw();
}

function drawHead(ctx, look, U, B, scale) {
  const sz = B.shoulderZ;
  capsule(ctx, U([0, 0, sz + 2]), U([0, 0.8, sz + 7]), B.neckW, look.skin, scale);
  const hc3 = [0, 1.2, B.headZ];
  const hc = U(hc3), fwd = U(add(hc3, [0, 1, 0])), upv = U(add(hc3, [0, 0, 1]));
  const fx = fwd.x - hc.x, fy = fwd.y - hc.y, ux = upv.x - hc.x, uy = upv.y - hc.y;
  const faceCam = (fwd.d - hc.d) / scale;
  const hr = B.headR * scale;
  ball(ctx, hc, B.headR, look.skin, scale);
  ctx.save(); ctx.beginPath(); ctx.arc(hc.x, hc.y, hr + 0.3, 0, TAU); ctx.clip();
  if (!look.bald) {
    const hairColor = look.hat === 'nun' ? '#8b8f88' : look.hair;
    const backK = look.hat === 'nun' ? 2.5 : 4.6, upk = look.hat === 'nun' ? 4.5 : 3.6;
    ctx.fillStyle = hairColor;
    ctx.beginPath(); ctx.arc(hc.x - fx * backK + ux * upk, hc.y - fy * backK + uy * upk, hr * 1.02, 0, TAU); ctx.fill();
    ctx.fillStyle = shade(hairColor, 1.6, 0.25);
    ctx.beginPath(); ctx.arc(hc.x - fx * backK + ux * upk - 2.5 * scale, hc.y - fy * backK + uy * upk - 2.5 * scale, hr * 0.45, 0, TAU); ctx.fill();
  }
  if (look.hat === 'band') { ctx.strokeStyle = look.sash; ctx.lineWidth = 2.6 * scale; ctx.beginPath(); ctx.ellipse(hc.x + ux * 2.5, hc.y + uy * 2.5, hr, hr * 0.38, 0, 0, Math.PI); ctx.stroke(); }
  ctx.restore();
  if (faceCam > 0.1) {
    ctx.fillStyle = '#1d1410';
    for (const sgn of [-1, 1]) { const e = U(add(hc3, [sgn * B.headR * 0.35, B.headR * 0.85, 0.3])); if (e.d > hc.d) { ctx.beginPath(); ctx.arc(e.x, e.y, 1.15 * scale, 0, TAU); ctx.fill(); } }
  }
  if (!look.bald && look.hat !== 'nun') {
    const knot = U([0, -2.2, B.knotZ]);
    ball(ctx, knot, 3.4, look.hair, scale);
    if (look.hat === 'daoist') {
      ctx.fillStyle = '#20201c'; ctx.fillRect(knot.x - 3.5 * scale, knot.y - 2 * scale, 7 * scale, 4.5 * scale);
      ctx.fillStyle = '#9bd1a9'; ctx.fillRect(knot.x - 5 * scale, knot.y - 0.6 * scale, 10 * scale, 1.3 * scale);
    } else { ctx.strokeStyle = look.sash; ctx.lineWidth = 1.5 * scale; ctx.beginPath(); ctx.moveTo(knot.x - 3 * scale, knot.y + 2 * scale); ctx.lineTo(knot.x + 3 * scale, knot.y + 2 * scale); ctx.stroke(); }
  }
  if (look.bald) { ctx.fillStyle = '#f7e3c855'; ctx.beginPath(); ctx.arc(hc.x - 2.5 * scale, hc.y - 3.5 * scale, 2.5 * scale, 0, TAU); ctx.fill(); }
}

function drawWeapon(ctx, W, p, scale) {
  if (W.style === 'pole' || W.style === 'spear') {
    capsule(ctx, p.a, p.b, W.width, W.color, scale);
    if (W.style === 'pole') {
      ctx.fillStyle = W.cap;
      for (const q of [p.a, p.b]) { ctx.beginPath(); ctx.arc(q.x, q.y, (W.width * 0.7) * scale, 0, TAU); ctx.fill(); }
    } else {
      const dx = p.tip.x - p.b.x, dy = p.tip.y - p.b.y, l = Math.hypot(dx, dy) || 1, nx = -dy / l * 3 * scale, ny = dx / l * 3 * scale;
      ctx.fillStyle = '#2a2e33'; ctx.beginPath(); ctx.moveTo(p.b.x + nx * 1.3, p.b.y + ny * 1.3); ctx.lineTo(p.tip.x, p.tip.y); ctx.lineTo(p.b.x - nx * 1.3, p.b.y - ny * 1.3); ctx.closePath(); ctx.fill();
      ctx.fillStyle = W.head; ctx.beginPath(); ctx.moveTo(p.b.x + nx, p.b.y + ny); ctx.lineTo(p.tip.x, p.tip.y); ctx.lineTo(p.b.x - nx, p.b.y - ny); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = W.tassel; ctx.lineWidth = 1.6 * scale;
      for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(p.b.x, p.b.y); ctx.lineTo(p.b.x + nx * k * 1.2 - dx / l * 7 * scale, p.b.y + ny * k * 1.2 - dy / l * 7 * scale + 3 * scale); ctx.stroke(); }
    }
    return;
  }
  ctx.strokeStyle = '#2a2e33'; ctx.lineWidth = (W.width + 1.8) * scale;
  ctx.beginPath(); ctx.moveTo(p.a.x, p.a.y); ctx.lineTo(p.b.x, p.b.y); ctx.stroke();
  ctx.strokeStyle = W.color; ctx.lineWidth = W.width * scale; ctx.stroke();
  if (W.style === 'blade') {
    ctx.strokeStyle = W.edge; ctx.lineWidth = Math.max(0.8, W.width * 0.35) * scale;
    ctx.beginPath(); ctx.moveTo(p.a.x + (p.b.x - p.a.x) * 0.1, p.a.y + (p.b.y - p.a.y) * 0.1); ctx.lineTo(p.b.x, p.b.y); ctx.stroke();
    capsule(ctx, p.back, p.h, 2.6, W.grip, scale);
    ctx.fillStyle = W.guard; ctx.beginPath(); ctx.arc(p.a.x, p.a.y, 2.6 * scale, 0, TAU); ctx.fill();
  }
}

// ---------- quadrupeds (unused in survival, kept for other modes) ----------
function drawBeast(ctx, look, body, theta, action, frame, scale) {
  const t = frame / 6, s = Math.sin(t * TAU);
  let bob = 0, roll = 0, lunge = 0, gait = 0;
  if (action === 'idle') bob = s * 0.6;
  if (action === 'run') { gait = 1; bob = Math.abs(Math.cos(t * TAU)) * 2; }
  if (action.startsWith('attack')) lunge = 7 * Math.sin(clamp(t, 0, 1) * Math.PI);
  if (action === 'die') roll = 1.45 * smooth(clamp(t * 1.2, 0, 1));
  const whole = p => { const q = [p[0], p[1] + lunge, p[2] + bob]; return roll ? rotY(q, roll, 0, 0) : q; };
  const G = makeProjector(theta, scale, whole);
  for (const [x, y, ph] of [[-5.5, 11, 0], [5.5, 11, Math.PI], [-5.5, -12, Math.PI], [5.5, -12, 0]]) {
    const sw = gait ? 0.65 * Math.sin(t * TAU + ph) : 0;
    const top = [x, y, 22], knee = add(top, [0, Math.sin(sw), -Math.cos(sw)], 11), paw = add(knee, [0, Math.sin(sw), -Math.cos(sw)], 11);
    capsule(ctx, G(top), G(knee), 5, look.color, scale); capsule(ctx, G(knee), G(paw), 4, shade(look.color, 0.85), scale);
  }
  for (let i = 0; i < 5; i++) ball(ctx, G([0, -15 + i * 7.2, 24]), [9.5, 10.8, 11.3, 11.3, 10.6][i], look.color, scale);
  ball(ctx, G([0, 25, 30]), 8, look.color, scale);
  void lerp;
}

export function portrait(look, weapon) {
  return getFrame(look, 'human', Math.round(DIRS() / 4), 'idle', 0, 1.6, weapon);
}
