// Draws the world, scenery, combatants, effects and the minimap.
import { WORLD, RARITY, POTIONS, GEAR, TIERS, WEAPON_TYPES } from './data.js';
import { equippedLook } from './equipment-look.js';
import { TAU, clamp, dist, FONT, shade } from './util.js';
import { world, drawGround, propsIn, MINI, VILLAGE } from './world.js';
import { propSprite, propBounds, propShadow } from './props.js';
import { drawSceneAnim, inFrontOf } from './scene.js';
import { drawLootSprite, bookIconImage } from './items.js';
import { getFrame, dirFromAngle, resolveAction, actionInfo, animationProgress, blit, sheetTiming } from './sprites.js';
import { state, frameAction, frameWeapon, canHarm, held } from './engine.js';
import { drawVfx, drawProjectileVfx, drawSkillVfx, drawNativeVisual, nativeDepth, nativeVisualVisible, drawStatusFx } from './vfx.js';

// userZoom: the player's pinch / wheel zoom on top of the size-based camera zoom (main.js keeps it).
export const view = { w: innerWidth, h: innerHeight, left: 0, top: 0, dpr: 1, zoom: 1, userZoom: 1 };
export const cam = { x: VILLAGE.cx, y: VILLAGE.cy };
// aim: the direction of the player's blows on a computer (main.js fills it each frame; null on touch screens)
export const ui = { hover: null, marker: null, aim: null };
let ambient = 0;
export const renderClock = () => ambient;
let nativeTotal = 0, nativeVisible = 0;
export const renderStats = () => ({ nativeTotal, nativeVisible });

export function resize(canvas) {
  // phones draw at most 1.5 device pixels per CSS pixel: ~45% fewer pixels to fill than 2×, much less heat
  const rect = canvas.getBoundingClientRect();
  view.w = rect.width; view.h = rect.height; view.left = rect.left; view.top = rect.top;
  view.dpr = Math.min(devicePixelRatio || 1, matchMedia('(pointer: coarse)').matches ? 1.5 : 2);
  const width = Math.round(view.w * view.dpr), height = Math.round(view.h * view.dpr);
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
}
export function screenToWorld(sx, sy) { return { x: (sx - view.left - view.w / 2) / view.zoom + cam.x, y: (sy - view.top - view.h / 2) / view.zoom + cam.y }; }

const OCCLUDERS = new Set(['tree', 'pine', 'bamboo', 'house', 'hall', 'pagoda', 'gate', 'wall']);
const sceneryOpacity = new WeakMap();

// Frame for an entity: action and visible weapon come from the engine, timing from animations.json.
function entityFrame(e, actionOverride, kOverride, angle = e.angle, weaponOverride, skillOverride = e.anim?.skillId) {
  const weapon = weaponOverride || frameWeapon(e);
  const look = equippedLook(e, weapon);
  const key = resolveAction(actionOverride || frameAction(e), weapon);
  const rig = actionInfo(key, weapon), sheet = sheetTiming(look, weapon, key, skillOverride);
  if (e.dummy && !sheet) return null;   // only its source art (enemy179), never the procedural rig
  // imported sheets bring their own frame count, loop length and contact point
  const def = sheet ? { ...rig, frames: sheet.frames, duration: sheet.duration ?? rig.duration, impact: sheet.impact ?? rig.impact } : rig, n = def.frames;
  let i;
  if (def.progress) i = Math.min(n - 1, Math.floor((kOverride ?? (e.jump ? e.jump.t / e.jump.dur : 0.5)) * n));
  else if (key.startsWith('run')) i = Math.floor(e.walk / (RUN_STRIDE / n)) % n;
  else if (key === 'die') i = Math.min(n - 1, Math.floor(e.deadT / (rig.duration / n)));
  // training dummy: its VLTK1 hurt set (enemy179_bat) plays across the hit time
  else if (key === 'hit' && e.dummy) i = Math.min(n - 1, Math.floor(clamp((0.2 - e.hitT) / 0.1, 0, 1) * n));
  else if (e.anim && !actionOverride && key === resolveAction(e.anim.name, weapon)) i = Math.round(animationProgress(e.anim, def) * (n - 1));
  else if (def.loop) i = Math.floor((ambient + e.id * 0.37) / def.duration * n) % n;
  else i = n - 1;
  return getFrame(look, 'human', dirFromAngle(angle), key, i, 1, weapon, skillOverride);
}
// ground distance covered by one full run cycle, so the feet match the movement speed
const RUN_STRIDE = 115;

function drawBossWarning(ctx,e){
  const w=e.boss.windup,k=1-w.left/w.total;
  ctx.save();ctx.lineWidth=2.5;ctx.strokeStyle='#ffd07a';ctx.fillStyle=`rgba(190,68,28,${.12+k*.14})`;ctx.setLineDash([12,7]);
  if(['ground','nova'].includes(w.kind)){
    const x=w.kind==='ground'?w.x:e.x,y=w.kind==='ground'?w.y:e.y;ctx.beginPath();ctx.arc(x,y,w.radius,0,TAU);ctx.fill();ctx.stroke();
  }else if(['spin','aura'].includes(w.kind)){
    ctx.beginPath();ctx.arc(e.x,e.y,w.range,0,TAU);ctx.fill();ctx.stroke();
  }else{
    ctx.translate(e.x,e.y);ctx.rotate(w.angle);const width=Math.min(160,Math.max(60,w.width));
    ctx.beginPath();ctx.moveTo(0,-width/2);ctx.lineTo(w.range,-width/2);ctx.lineTo(w.range,width/2);ctx.lineTo(0,width/2);ctx.closePath();ctx.fill();ctx.stroke();
  }
  ctx.setLineDash([]);ctx.strokeStyle='#fff0bf';ctx.beginPath();ctx.arc(e.x,e.y,36,-Math.PI/2,-Math.PI/2+TAU*k);ctx.stroke();ctx.restore();
}

export function render(ctx, dt) {
  ambient += dt;
  const p = state.player;
  const menu = state.phase === 'menu';
  view.zoom = menu ? clamp(Math.max(view.w / 2200, view.h / 1400), 0.6, 1.2) : clamp(Math.min(view.w / 1300, view.h / 820), 0.66, 1.15) * (view.userZoom || 1);
  const tx = menu ? VILLAGE.cx + Math.sin(ambient * 0.05) * 260 : p.x, ty = menu ? VILLAGE.cy - 40 : p.y - p.z * 0.3;
  const k = Math.min(1, dt * (menu ? 1.5 : 7));
  cam.x += (tx - cam.x) * k; cam.y += (ty - cam.y) * k;
  const halfW = view.w / view.zoom / 2, halfH = view.h / view.zoom / 2;
  const B = world.bounds;
  if (B && !menu) {   // small authored world (training arena): stay over it, centred when it is smaller than the view
    cam.x = B.w <= halfW * 2 - 160 ? B.x + B.w / 2 : clamp(cam.x, B.x + halfW - 80, B.x + B.w - halfW + 80);
    cam.y = B.h <= halfH * 2 - 160 ? B.y + B.h / 2 : clamp(cam.y, B.y + halfH - 80, B.y + B.h - halfH + 80);
  } else { cam.x = clamp(cam.x, halfW - 200, WORLD - halfW + 200); cam.y = clamp(cam.y, halfH - 200, WORLD - halfH + 200); }
  const x0 = cam.x - halfW, y0 = cam.y - halfH, x1 = cam.x + halfW, y1 = cam.y + halfH;

  ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
  ctx.clearRect(0, 0, view.w, view.h);
  ctx.translate(view.w / 2, view.h / 2); ctx.scale(view.zoom, view.zoom); ctx.translate(-cam.x, -cam.y);
  ctx.imageSmoothingEnabled = true;
  drawGround(ctx, x0, y0, x1, y1);

  const props = propsIn(x0, y0, x1, y1);
  // Bridge decks belong below feet and dropped items, independent of sprite depth sorting.
  for (const pr of props) if (pr.ground) drawProp(ctx, pr, null, dt);
  if (ui.aim && !menu && p.alive) drawAimGuide(ctx, p, ui.aim);
  // shadows
  ctx.fillStyle = 'rgba(12,20,12,0.32)';
  for (const pr of props) { const s = propShadow(pr); if (!s) continue; ctx.beginPath(); ctx.ellipse(s[0], s[1], s[2], s[3], 0, 0, TAU); ctx.fill(); }
  drawZone(ctx, x0, y0, x1, y1);
  for(const e of state.heroes)if(e.alive&&e.boss?.windup&&e.x>x0-700&&e.x<x1+700&&e.y>y0-700&&e.y<y1+700)drawBossWarning(ctx,e);
  if (ui.marker && ambient - ui.marker.t < 0.6) drawMarker(ctx, ui.marker);

  // ground effects first
  for (const e of state.effects) if (GROUND_FX.has(e.type)) drawEffect(ctx, e);
  for (const item of state.loot) if (item.x > x0 - 60 && item.x < x1 + 60 && item.y > y0 - 60 && item.y < y1 + 60) drawLoot(ctx, item);
  // martial-art visuals of the source: ground decals now, the rest sorted with the characters below
  const nativeSorted = [];
  nativeTotal = nativeVisible = 0;
  for (const presentation of state.nativeCasts) for (const v of presentation.visuals) {
    nativeTotal++;
    if (!nativeVisualVisible(v,x0,y0,x1,y1)) continue;
    nativeVisible++;
    const depth = nativeDepth(v);
    if (depth.ground) drawNativeVisual(ctx, v); else nativeSorted.push({ y: depth.y, native: v });
  }

  // y-sorted scene
  const list = [];
  for (const pr of props) if (!pr.ground) list.push({ y: pr.sortY ?? pr.y, prop: pr });
  const based = props.filter(pr => pr.foot?.front);
  for (const e of state.entities) {
    if (!e.alive && (e.deadT > 8 || e.dummy)) continue;   // a broken dummy is hidden until it stands up (no die art)
    if (e.x < x0 - 120 || e.x > x1 + 120 || e.y < y0 - 60 || e.y > y1 + 240) continue;
    list.push({ y: e.depthY = depthOf(e, based), ent: e });
  }
  for (const g of state.effects) if (g.type === 'ghost') list.push({ y: g.y - 0.1, ghost: g });
  list.push(...nativeSorted);
  list.sort((a, b) => a.y - b.y);
  for (const it of list) {
    if (it.prop) drawProp(ctx, it.prop, p, dt);
    else if (it.ent) drawEntity(ctx, it.ent);
    else if (it.native) drawNativeVisual(ctx, it.native);
    else drawGhost(ctx, it.ghost);
  }
  for (const pr of state.projectiles) drawProjectile(ctx, pr);
  for (const e of state.effects) if (!GROUND_FX.has(e.type) && e.type !== 'ghost') drawEffect(ctx, e);
  drawParticles(ctx, dt);
  // labels on top
  for (const it of list) if (it.ent) drawLabel(ctx, it.ent);
  drawFloaters(ctx, dt);
  drawAmbient(ctx, x0, y0, x1, y1);

}

// Sort key: standing in front of a building's wall face draws after that building (scene.js inFrontOf).
function depthOf(e, based) {
  let y = e.y;
  for (const pr of based) if (e.y < pr.y && inFrontOf(pr, e.x, e.y)) y = Math.max(y, pr.y + 0.01);
  return y;
}

// ---------- scenery ----------
function drawProp(ctx, pr, p, dt = 1 / 60) {
  if (pr.type === 'decor') { drawSceneAnim(ctx, pr, ambient); return; }
  if ((pr.type === 'fire' || pr.type === 'flag') && drawSceneAnim(ctx, pr, ambient)) return;
  if (pr.type === 'fire') { drawFire(ctx, pr); return; }
  const spr = propSprite(pr);
  const prior = sceneryOpacity.get(pr) || { alpha: 1, covered: false };
  let covered = false;
  if (OCCLUDERS.has(pr.type) && p && p.alive && (p.depthY ?? p.y) < pr.y - 4) {
    const b = propBounds(pr);
    const margin = prior.covered ? -8 : 10;
    covered = p.x > b.x0 + margin && p.x < b.x1 - margin && p.y - 40 > b.y0 + margin && p.y - 40 < b.y1 - margin;
  }
  const target = covered ? 0.42 : 1;
  const alpha = prior.alpha + (target - prior.alpha) * (1 - Math.exp(-dt / .08));
  sceneryOpacity.set(pr, { alpha, covered });
  if (alpha < 1) ctx.globalAlpha = alpha;
  // gentle sway for foliage
  if (!pr.asset && (pr.type === 'tree' || pr.type === 'bamboo')) {
    const sw = Math.sin(ambient * 1.3 + pr.x * 0.01) * 0.012;
    ctx.save(); ctx.translate(pr.x, pr.y); ctx.transform(1, 0, sw, 1, 0, 0); ctx.drawImage(spr.canvas, -spr.ax, -spr.ay); ctx.restore();
  } else ctx.drawImage(spr.canvas, pr.x - spr.ax, pr.y - spr.ay);
  ctx.globalAlpha = 1;
  if (pr.type === 'gate' && pr.label) {
    ctx.save(); ctx.textAlign = 'center'; ctx.font = `bold 13px ${FONT}`;
    ctx.shadowColor = '#151c12'; ctx.shadowBlur = 4; ctx.fillStyle = '#e4d4a3';
    ctx.fillText(pr.label, pr.x, pr.y - spr.ay - 12); ctx.restore();
  }
}

function drawFire(ctx, pr) {
  ctx.save(); ctx.translate(pr.x, pr.y);
  ctx.fillStyle = '#3a2a1c'; ctx.beginPath(); ctx.ellipse(0, 0, 18, 7, 0, 0, TAU); ctx.fill();
  ctx.strokeStyle = '#5a3a22'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-14, 2); ctx.lineTo(12, -4); ctx.moveTo(-10, -4); ctx.lineTo(14, 3); ctx.stroke();
  const glow = ctx.createRadialGradient(0, -10, 2, 0, -10, 70); glow.addColorStop(0, 'rgba(255,170,80,0.35)'); glow.addColorStop(1, 'rgba(255,140,60,0)');
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(0, -10, 70, 0, TAU); ctx.fill();
  for (let i = 0; i < 5; i++) {
    const t = ambient * 6 + i * 1.7, h = 16 + Math.sin(t) * 6 + i * 2, x = (i - 2) * 4 + Math.sin(t * 1.3) * 2;
    ctx.fillStyle = i % 2 ? 'rgba(255,200,90,0.85)' : 'rgba(240,110,40,0.8)';
    ctx.beginPath(); ctx.moveTo(x - 5, -2); ctx.quadraticCurveTo(x, -h * 1.4, x + 5, -2); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}

// ---------- loot ----------
const WEAPON_GLYPH = { kiem: '劍', dao: '刀', con: '棍', thuong: '槍', quyen: '拳', amkhi: '鏢' };
export function lootLabel(item) {
  if (item.kind === 'book') return { color: TIERS[item.book.tier].color, label: `${item.book.name} · ${TIERS[item.book.tier].n}` };
  if (item.kind === 'weapon') return { color: RARITY[item.weapon.rarity].color, label: item.weapon.name };
  if (item.kind === 'gear') return { color: RARITY[item.gear.rarity].color, label: item.gear.name };
  if (item.kind === 'chest') return { color: item.event ? TIERS[5].color : item.rich ? '#e8c46a' : '#d8c8a0', label: item.event ? 'Võ Lâm Bảo Khố' : item.rich ? 'Hòm quý' : 'Hòm gỗ' };
  const P = POTIONS[item.potion];
  return { color: P.color, label: `${P.name}${item.count > 1 ? ' ×' + item.count : ''}` };
}
function drawLoot(ctx, item) {
  const bob = item.kind === 'chest' ? 0 : Math.sin(ambient * 2.2 + item.id) * 3;
  const pop = clamp((state.time - item.t) / 0.3, 0, 1);
  const { color, label } = lootLabel(item);
  ctx.save(); ctx.translate(item.x, item.y);
  ctx.fillStyle = 'rgba(14,20,14,0.45)'; ctx.beginPath(); ctx.ellipse(0, 3, item.kind === 'chest' ? 24 : 14, item.kind === 'chest' ? 9 : 6, 0, 0, TAU); ctx.fill();
  if (item.kind === 'chest') drawChest(ctx, item);
  else {
    ctx.translate(0, -8 + bob - (1 - pop) * 20);
    if (item.kind === 'book') {
      const b = item.book, icon = bookIconImage(b.id);
      glow(ctx, color, 22 + b.tier * 4);
      if (icon) {
        // the book's VLTK skill icon in a tier-coloured frame
        ctx.fillStyle = '#0d120e'; ctx.fillRect(-15, -17, 30, 30);
        ctx.drawImage(icon, -14, -16, 28, 28);
        ctx.strokeStyle = color; ctx.lineWidth = 1.6; ctx.strokeRect(-15, -17, 30, 30);
      } else if (b.type === 'active') {
        ctx.rotate(-0.25);
        ctx.fillStyle = '#26352c'; ctx.fillRect(-10, -13, 21, 26);
        ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.strokeRect(-10, -13, 21, 26);
        ctx.fillStyle = color; ctx.fillRect(-8, -12, 3, 24);
      } else {
        // inner arts are red-rod scrolls, movement arts blue-rod scrolls
        ctx.fillStyle = '#e9dcb8'; ctx.fillRect(-12, -9, 24, 14);
        ctx.fillStyle = b.type === 'noi' ? '#6a3a2a' : '#2a4a5a'; ctx.fillRect(-14, -11, 4, 18); ctx.fillRect(10, -11, 4, 18);
        ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.strokeRect(-12, -9, 24, 14);
      }
      if (!icon) {
        ctx.fillStyle = b.type === 'active' ? color : '#3a2a1c'; ctx.font = `12px ${FONT}`; ctx.textAlign = 'center';
        ctx.fillText(b.glyph, b.type === 'active' ? 3 : 0, b.type === 'active' ? 5 : 2);
      }
    } else if (item.kind === 'weapon' || item.kind === 'gear') {
      const rar = item.kind === 'weapon' ? item.weapon.rarity : item.gear.rarity;
      glow(ctx, color, 20 + rar * 4);
      ctx.fillStyle = '#2a2a24'; ctx.beginPath(); ctx.arc(0, -2, 11, 0, TAU); ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = color; ctx.font = `13px ${FONT}`; ctx.textAlign = 'center';
      ctx.fillText(item.kind === 'weapon' ? WEAPON_GLYPH[item.weapon.type] : GEAR[item.gear.slot].glyph, 0, 3);
      if (rar >= 3 || item.weapon?.special) { ctx.strokeStyle = color; ctx.lineWidth = 1; for (let i = 0; i < 4; i++) { const a = ambient * 2 + i * Math.PI / 2; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 14, -2 + Math.sin(a) * 14); ctx.lineTo(Math.cos(a) * 20, -2 + Math.sin(a) * 20); ctx.stroke(); } }
    } else {
      // VLTK Hồng dược / Lam dược with their own sparkle, over a soft halo so they read on grass
      glow(ctx, color, 18);
      if (!drawLootSprite(ctx, item.potion, ambient + item.id * 0.13)) {
        ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-3, -16, 6, 5);
        ctx.fillStyle = color; ctx.beginPath(); ctx.arc(0, -4, 8, 0, TAU); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.beginPath(); ctx.arc(-3, -7, 2.5, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#2a2018'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(0, -4, 8, 0, TAU); ctx.stroke();
      }
    }
  }
  ctx.restore();
  const p = state.player;
  if (p && Math.abs(p.x - item.x) < 680 && Math.abs(p.y - item.y) < 460) {
    ctx.save();
    ctx.font = `${item.kind === 'chest' ? 'bold ' : ''}11px ${FONT}`;
    ctx.textAlign = 'center';
    const isChest = item.kind === 'chest';
    const tagY = item.y - (isChest ? 42 : 32) + bob;
    const tw = ctx.measureText(label).width;
    const padX = 5, padY = 2, tagH = 15;
    const rx = item.x - tw / 2 - padX, ry = tagY - 11;
    const rw = tw + padX * 2, rh = tagH;
    const isNear = state.near === item;
    // VLTK1 translucent dark tag with quality border
    ctx.fillStyle = isNear ? 'rgba(22, 30, 24, 0.94)' : 'rgba(10, 14, 12, 0.84)';
    ctx.fillRect(rx, ry, rw, rh);
    ctx.strokeStyle = isNear ? '#fff0ad' : color;
    ctx.lineWidth = isNear ? 1.5 : 1;
    ctx.strokeRect(rx, ry, rw, rh);
    ctx.fillStyle = isNear ? '#fff4b8' : color;
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 3;
    ctx.fillText(label, item.x, tagY);
    ctx.restore();
  }
}
function drawChest(ctx, item) {
  const s = item.event ? 1.35 : 1, trim = item.event ? TIERS[5].color : item.rich ? '#d8b04a' : '#8a6a3a';
  if (item.event) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createLinearGradient(0, -200, 0, 0); g.addColorStop(0, 'rgba(255,180,80,0)'); g.addColorStop(1, `rgba(255,190,90,${0.35 + 0.15 * Math.sin(ambient * 3)})`);
    ctx.fillStyle = g; ctx.fillRect(-22, -200, 44, 200); ctx.restore();
  }
  // VLTK Bảo rương for wooden chests, Hoàng Kim Bảo Hạp for rich chests and the Võ Lâm Bảo Khố
  if (drawLootSprite(ctx, item.event ? 'chestEvent' : item.rich ? 'chestRich' : 'chest', ambient + item.id * 0.17)) return;
  ctx.scale(s, s);
  ctx.fillStyle = '#5a3a22'; ctx.fillRect(-18, -20, 36, 20);
  ctx.fillStyle = '#7a5232'; ctx.beginPath(); ctx.moveTo(-18, -20); ctx.quadraticCurveTo(0, -34, 18, -20); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = trim; ctx.lineWidth = 2.2;
  ctx.strokeRect(-18, -20, 36, 20); ctx.beginPath(); ctx.moveTo(-18, -20); ctx.quadraticCurveTo(0, -34, 18, -20); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-8, -28); ctx.lineTo(-8, 0); ctx.moveTo(8, -28); ctx.lineTo(8, 0); ctx.stroke();
  ctx.fillStyle = trim; ctx.fillRect(-3, -16, 6, 6);
}
// Attack direction on a computer (user 2026-10-10): on the ground at the player's feet, the reach and arc of the held
// weapon turned toward the aim — the locked enemy (red, with a line to it) or else the mouse cursor (gold) — and an
// arrow at its tip, so the direction of a blow is visible before it is struck.
function drawAimGuide(ctx, p, aim) {
  const w = WEAPON_TYPES[held(p).type] || WEAPON_TYPES.kiem;
  const reach = Math.max(70, w.range), half = Math.min(Math.PI * 0.9, Math.max(0.35, (w.arc || 1) / 2));
  const locked = !!aim.target, color = locked ? '255,110,90' : '240,212,140', pulse = 0.5 + 0.5 * Math.sin(ambient * 4);
  ctx.save(); ctx.translate(p.x, p.y + 2); ctx.scale(1, 0.62);   // flattened onto the ground plane
  const g = ctx.createRadialGradient(0, 0, 10, 0, 0, reach);
  g.addColorStop(0, `rgba(${color},0)`); g.addColorStop(0.5, `rgba(${color},${locked ? 0.16 : 0.12})`); g.addColorStop(1, `rgba(${color},${locked ? 0.38 : 0.3})`);
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, reach, aim.angle - half, aim.angle + half); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = `rgba(${color},${0.7 + 0.25 * pulse})`; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(0, 0, reach, aim.angle - half, aim.angle + half); ctx.stroke();
  // arrow at the tip of the reach
  const ax = Math.cos(aim.angle), ay = Math.sin(aim.angle), tip = reach + 16;
  ctx.fillStyle = `rgba(${color},${0.85 + 0.15 * pulse})`; ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 4;
  ctx.beginPath(); ctx.moveTo(ax * tip, ay * tip);
  ctx.lineTo(ax * (tip - 24) - ay * 12, ay * (tip - 24) + ax * 12); ctx.lineTo(ax * (tip - 16), ay * (tip - 16)); ctx.lineTo(ax * (tip - 24) + ay * 12, ay * (tip - 24) - ax * 12);
  ctx.closePath(); ctx.fill();
  ctx.restore();
  // a locked enemy out of reach: a dashed line from the tip of the reach to it
  if (locked && aim.target.alive) {
    const d = Math.hypot(aim.target.x - p.x, aim.target.y - p.y);
    if (d > reach + 20) {
      ctx.save(); ctx.strokeStyle = `rgba(${color},0.55)`; ctx.lineWidth = 1.6; ctx.setLineDash([7, 7]); ctx.lineDashOffset = -ambient * 30;
      ctx.beginPath(); ctx.moveTo(p.x + Math.cos(aim.angle) * (reach + 22), p.y + 2 + Math.sin(aim.angle) * (reach + 22) * 0.62);
      ctx.lineTo(aim.target.x, aim.target.y + 3); ctx.stroke(); ctx.restore();
    }
  }
}
function glow(ctx, color, r) {
  const g = ctx.createRadialGradient(0, 0, 1, 0, 0, r);
  g.addColorStop(0, color + '88'); g.addColorStop(1, color + '00');
  ctx.fillStyle = g; ctx.fillRect(-r, -r, r * 2, r * 2);
}

// ---------- characters ----------
function drawEntity(ctx, e) {
  const fade = !e.alive ? clamp(1 - (e.deadT - 6) / 1.5, 0, 1) : 1;
  ctx.save(); ctx.translate(e.x, e.y);
  // ground shadow shrinks as the character rises during khinh công
  const sh = 1 - clamp(e.z / 160, 0, 0.6), bs = e.boss?.size ?? 1;
  ctx.fillStyle = `rgba(12,18,12,${0.4 * fade})`;
  ctx.beginPath(); ctx.ellipse(0, 2, 19 * sh * bs, 7 * sh * bs, 0, 0, TAU); ctx.fill();
  if (e.boss && !e.boss.monster && e.alive) { ctx.strokeStyle = e.boss.color; ctx.globalAlpha = 0.5 + 0.2 * Math.sin(ambient * 3); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(0, 3, 34 * bs, 14 * bs, 0, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
  if (e === state.player.target && e.alive) {
    ctx.strokeStyle = 'rgba(255,110,90,0.9)'; ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]); ctx.lineDashOffset = -ambient * 20;
    ctx.beginPath(); ctx.ellipse(0, 3, 27 * bs, 11 * bs, 0, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
  } else if (e === ui.hover && e.alive) {
    ctx.strokeStyle = 'rgba(255,240,190,0.7)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(0, 3, 25, 10, 0, 0, TAU); ctx.stroke();
  }
  if (e.player && e.alive) { ctx.strokeStyle = 'rgba(232,215,150,0.6)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.ellipse(0, 3, 23, 9, 0, 0, TAU); ctx.stroke(); }
  if (e.slowT > 0 && e.alive) { ctx.strokeStyle = 'rgba(150,210,255,0.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, 3, 21, 8, 0, 0, TAU); ctx.stroke(); }
  if (e.alive && e.noi && state.time - e.lastCombat < 4) drawInnerAura(ctx, e, TIERS[e.noi.tier].color);
  const fr = entityFrame(e);
  if (!fr) { ctx.restore(); return; }
  ctx.globalAlpha = fade;
  blit(ctx, fr, 0, -e.z);
  if (e.hitT > 0.08) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.45 * fade; blit(ctx, fr, 0, -e.z); ctx.globalCompositeOperation = 'source-over'; }
  ctx.globalAlpha = 1;
  if (e.alive) {
    const top = -82 * bs - e.z;
    if (e.freezeT > 0) { ctx.fillStyle = 'rgba(170,220,255,0.35)'; ctx.strokeStyle = 'rgba(220,245,255,0.8)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-24, top * 0.5); ctx.lineTo(-8, top - 6); ctx.lineTo(12, top); ctx.lineTo(24, top * 0.45); ctx.lineTo(18, 2); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    // choáng: the client's own state image mag_spe_眩晕.spr (state table Status50), drawn at the feet point like other client
    // effects; nothing is drawn in its place while the image loads
    if (e.stunT > 0) drawStatusFx(ctx, 'stun', 0, -e.z, ambient);
    // trúng độc: green ring on the ground and bubbles rising along the body
    if (e.dots?.length) {
      ctx.strokeStyle = 'rgba(143,209,79,0.75)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, 3, 19, 7, 0, 0, TAU); ctx.stroke();
      for (let i = 0; i < 5; i++) { const k = (ambient * 0.9 + i / 5) % 1, x = Math.sin(i * 2.3 + ambient * 2) * 13; ctx.fillStyle = `rgba(143,209,79,${0.75 * (1 - k)})`; ctx.beginPath(); ctx.arc(x, -6 + (top + 6) * k, 2 + 1.5 * (1 - k), 0, TAU); ctx.fill(); }
    }
    if (e.parry) { ctx.strokeStyle = 'rgba(255,240,180,0.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, -36 - e.z, 30, 46, 0, 0, TAU); ctx.stroke(); }
    if (e.rootT > 0) { ctx.strokeStyle = 'rgba(120,90,60,0.9)'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { const a = i / 4 * TAU; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 16, 3 + Math.sin(a) * 6); ctx.lineTo(Math.cos(a) * 9, -10); ctx.stroke(); } }
    if (e.aura && !drawSkillVfx(ctx, { skillId: e.aura.skillId, x: 0, y: 0, r: e.aura.r, loop: true, age: (e.aura.max || 3) - e.aura.t }, 0)) drawSwordAura(ctx, e);
    if (e.channel) { ctx.strokeStyle = TIERS[e.channel.sk.tier].color; ctx.globalAlpha = 0.6; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, 3, 30 + Math.sin(ambient * 10) * 4, 12, 0, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
    if (e.opening) {
      const k = clamp(e.opening.t / e.opening.dur, 0, 1);
      const barW = 60, barH = 6, bx = -barW / 2, by = top - 32;
      ctx.save();
      // VLTK dark frame with gold border
      ctx.fillStyle = 'rgba(10, 14, 12, 0.9)'; ctx.fillRect(bx - 1, by - 1, barW + 2, barH + 2);
      ctx.strokeStyle = '#d4b35e'; ctx.lineWidth = 1; ctx.strokeRect(bx - 1, by - 1, barW + 2, barH + 2);
      // Gold progress fill
      ctx.fillStyle = '#e8c46a'; ctx.fillRect(bx, by, barW * k, barH);
      // Clean overhead label
      ctx.font = `bold 10px ${FONT}`; ctx.textAlign = 'center'; ctx.fillStyle = '#fff4ce';
      ctx.shadowColor = '#000'; ctx.shadowBlur = 3;
      ctx.fillText('Đang mở...', 0, by - 4);
      ctx.restore();
    }
  }
  ctx.restore();
}

function drawGhost(ctx, g) {
  const use = entityFrame(g.ent, g.anim, g.jumpK, g.angle, g.weapon, g.skillId);
  ctx.save();
  ctx.globalAlpha = 0.42 * (g.life / g.max);
  blit(ctx, use, g.x, g.y - g.z);
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = 0.18 * (g.life / g.max);
  blit(ctx, use, g.x, g.y - g.z);
  ctx.restore();
}

function drawInnerAura(ctx, e, color) {
  ctx.save(); ctx.globalAlpha = 0.18 + 0.08 * Math.sin(ambient * 4);
  const g = ctx.createRadialGradient(0, -40 - e.z, 4, 0, -40 - e.z, 46);
  g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, -40 - e.z, 34, 52, 0, 0, TAU); ctx.fill();
  ctx.restore();
}
function drawSwordAura(ctx, e) {
  const r = e.aura.r * 0.8;
  ctx.save(); ctx.translate(0, -24 - e.z);
  ctx.strokeStyle = e.aura.color; ctx.shadowColor = e.aura.color; ctx.shadowBlur = 10; ctx.lineWidth = 2.5;
  for (let i = 0; i < 8; i++) {
    const a = ambient * 5 + i * TAU / 8, x = Math.cos(a) * r, y = Math.sin(a) * r * 0.45;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a + Math.PI / 2) * 26, y + Math.sin(a + Math.PI / 2) * 12); ctx.stroke();
  }
  ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.ellipse(0, 24, r, r * 0.45, 0, 0, TAU); ctx.stroke();
  ctx.restore();
}

function drawLabel(ctx, e) {
  if (!e.alive) return;
  const p = state.player;
  if (!e.player && !(Math.abs(e.x - p.x) < 700 && Math.abs(e.y - p.y) < 500)) return;
  const top = e.y - 96 * (e.boss?.size ?? 1) - e.z;
  if (e.boss) { drawBossLabel(ctx, e, top); return; }
  ctx.save(); ctx.textAlign = 'center'; ctx.shadowColor = '#0b120d'; ctx.shadowBlur = 4;
  ctx.font = `${e.player ? 'bold ' : ''}13px ${FONT}`;
  ctx.fillStyle = e.player ? '#fff0b8' : '#f2e6cc'; ctx.fillText(e.name, e.x, top - 8);
  ctx.font = `10px ${FONT}`;
  const w = held(e);
  if (e.dummy) { ctx.fillStyle = '#d8c79a'; ctx.fillText(`${Math.ceil(e.hp)} / ${e.maxHp}`, e.x, top - 22); }
  else { ctx.fillStyle = RARITY[w.rarity].color; ctx.fillText(`${e.faction.name} · ${WEAPON_TYPES[w.type].name}`, e.x, top - 22); }
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(16,22,18,0.85)'; ctx.fillRect(e.x - 22, top - 3, 44, 6);
  ctx.fillStyle = e.player ? '#b8c584' : '#c9584a';
  ctx.fillRect(e.x - 21, top - 2, 42 * e.hp / e.maxHp, 4);
  ctx.restore();
}

// Bosses carry a wide bar in their tier colour; blue while they walk home healing and cannot be hurt.
function drawBossLabel(ctx, e, top) {
  const B = e.boss, w = B.monster ? 54 : 84;
  ctx.save(); ctx.textAlign = 'center'; ctx.shadowColor = '#0b120d'; ctx.shadowBlur = 4;
  ctx.font = `bold 14px ${FONT}`; ctx.fillStyle = B.color; ctx.fillText(e.name, e.x, top - 10);
  // a field monster (quái): its name and a short bar only
  if (!B.monster) { ctx.font = `10px ${FONT}`; ctx.fillStyle = '#f2e6cc'; ctx.fillText(`${B.title} · bậc ${B.T.n}${B.wave?' · đợt '+B.wave:''}${B.windup?' · vận công':''}`, e.x, top - 25); }
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(16,22,18,0.9)'; ctx.fillRect(e.x - w / 2 - 1, top - 4, w + 2, 9);
  ctx.fillStyle = B.state === 'return' ? '#7fa6c9' : '#d0583f'; ctx.fillRect(e.x - w / 2, top - 3, w * e.hp / e.maxHp, 7);
  ctx.strokeStyle = B.color; ctx.lineWidth = 1; ctx.strokeRect(e.x - w / 2 - 1.5, top - 4.5, w + 3, 10);
  ctx.restore();
}

// ---------- effects ----------
const GROUND_FX = new Set(['ring', 'absorb', 'danger', 'dangerCone', 'dust', 'frost', 'quake', 'buddha', 'roar']);
function drawEffect(ctx, e) {
  const t = 1 - e.life / e.max;
  if (e.follow) { e.x = e.follow.x; e.y = e.follow.y; }
  if (drawVfx(ctx, e, t)) return;
  ctx.save(); ctx.translate(e.x, e.y);
  ctx.globalAlpha = Math.max(0, 1 - t);
  ctx.strokeStyle = e.color; ctx.fillStyle = e.color; ctx.lineWidth = 2;
  switch (e.type) {
    case 'slash': {
      ctx.translate(0, -26); ctx.rotate(e.angle); ctx.scale(1, 0.75);
      ctx.shadowColor = e.color; ctx.shadowBlur = 14;
      ctx.lineWidth = 9 * (1 - t) + 1; ctx.beginPath(); ctx.arc(0, 0, e.r * (0.7 + t * 0.3), -1 + t * 0.25, 1 + t * 0.25); ctx.stroke();
      ctx.lineWidth = 2; ctx.globalAlpha *= 0.7; ctx.beginPath(); ctx.arc(0, 0, e.r * 0.55, -0.8, 0.8); ctx.stroke();
      break;
    }
    case 'ring': case 'absorb': {
      const r = e.type === 'absorb' ? e.r * (1 - t * 0.7) : e.r * (0.3 + t * 0.7);
      ctx.lineWidth = 3; ctx.shadowColor = e.color; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.5, 0, 0, TAU); ctx.stroke();
      for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + t * 3; ctx.fillRect(Math.cos(a) * r - 1.5, Math.sin(a) * r * 0.5 - 1.5, 3, 3); }
      break;
    }
    case 'beam': ctx.translate(0, -30); ctx.rotate(e.angle); ctx.shadowColor = e.color; ctx.shadowBlur = 10; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(e.r / 2, Math.sin(t * 12) * 26, e.r, 0); ctx.stroke(); break;
    case 'danger': ctx.globalAlpha = 0.2 + t * 0.35; ctx.fillStyle = '#c4502e'; ctx.beginPath(); ctx.ellipse(0, 0, e.r, e.r * 0.5, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#ffb07a'; ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.ellipse(0, 0, e.r * t, e.r * 0.5 * t, 0, 0, TAU); ctx.stroke(); break;
    case 'dust': ctx.fillStyle = 'rgba(196,176,130,0.45)'; for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; ctx.beginPath(); ctx.ellipse(Math.cos(a) * e.r * t, Math.sin(a) * e.r * 0.4 * t, 10 * (1 - t) + 4, 5 * (1 - t) + 2, 0, 0, TAU); ctx.fill(); } break;
    case 'swords9': {
      ctx.translate(0, -26); ctx.shadowColor = e.color; ctx.shadowBlur = 12; ctx.lineWidth = 3;
      for (let i = 0; i < 9; i++) {
        const a = e.angle + (i - 4) * 0.19, r0 = 20 + e.r * t * 0.5, r1 = r0 + 36 + (i % 2) * 14;
        ctx.beginPath(); ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0 * 0.7); ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1 * 0.7); ctx.stroke();
      }
      break;
    }
    case 'frost': {
      ctx.shadowColor = '#bfe8ff'; ctx.shadowBlur = 12; ctx.lineWidth = 3;
      const r = e.r * (0.4 + t * 0.6);
      ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.5, 0, 0, TAU); ctx.stroke();
      ctx.fillStyle = 'rgba(200,236,255,0.75)';
      for (let i = 0; i < 12; i++) { const a = i / 12 * TAU, d = r * 0.8, x = Math.cos(a) * d, y = Math.sin(a) * d * 0.5; ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x, y - 18 * (1 - t * 0.5)); ctx.lineTo(x + 4, y); ctx.closePath(); ctx.fill(); }
      break;
    }
    case 'quake': {
      ctx.strokeStyle = '#5a3d22'; ctx.lineWidth = 3;
      for (let i = 0; i < 9; i++) { const a = i / 9 * TAU + 0.3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * e.r * 0.5, Math.sin(a) * e.r * 0.25); ctx.lineTo(Math.cos(a + 0.2) * e.r, Math.sin(a + 0.2) * e.r * 0.5); ctx.stroke(); }
      ctx.strokeStyle = e.color; ctx.shadowColor = e.color; ctx.shadowBlur = 10; ctx.beginPath(); ctx.ellipse(0, 0, e.r * (0.5 + t * 0.6), e.r * 0.5 * (0.5 + t * 0.6), 0, 0, TAU); ctx.stroke();
      break;
    }
    case 'levelup': {
      ctx.globalCompositeOperation = 'lighter';
      const g = ctx.createLinearGradient(0, -180, 0, 0); g.addColorStop(0, 'rgba(255,225,140,0)'); g.addColorStop(1, 'rgba(255,225,140,0.55)');
      ctx.fillStyle = g; ctx.fillRect(-26 * (1 - t * 0.5), -180, 52 * (1 - t * 0.5), 180);
      ctx.fillStyle = '#fff1b8'; for (let i = 0; i < 10; i++) { const a = i * 2.4 + t * 4; ctx.fillRect(Math.cos(a) * 24, -t * 140 - (i * 13) % 60, 3, 3); }
      break;
    }
    case 'petals': {
      for (let i = 0; i < 14; i++) { const a = i / 14 * TAU + t * 4, r = 20 + t * e.r; ctx.fillStyle = i % 2 ? '#f6b6c8' : '#ffd9e2'; ctx.beginPath(); ctx.ellipse(Math.cos(a) * r, -30 + Math.sin(a) * r * 0.5 - t * 20, 4, 2, a, 0, TAU); ctx.fill(); }
      break;
    }
    case 'dangerCone': {
      ctx.globalAlpha = 0.18 + t * 0.35; ctx.fillStyle = '#c4502e'; ctx.scale(1, 0.55);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, e.r, e.angle - e.arc, e.angle + e.arc); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 0.8; ctx.strokeStyle = '#ffb07a'; ctx.beginPath(); ctx.arc(0, 0, e.r * t, e.angle - e.arc, e.angle + e.arc); ctx.stroke();
      break;
    }
    case 'thrust': {
      ctx.translate(0, -30); ctx.rotate(e.angle); ctx.shadowColor = e.color; ctx.shadowBlur = 12;
      ctx.lineWidth = 6 * (1 - t) + 1; ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(e.r * (0.6 + 0.4 * t), 0); ctx.stroke();
      ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(14, -6); ctx.lineTo(e.r * 0.8, -2); ctx.moveTo(14, 6); ctx.lineTo(e.r * 0.8, 2); ctx.stroke();
      break;
    }
    case 'spin': {
      ctx.translate(0, -24); ctx.scale(1, 0.5); ctx.shadowColor = e.color; ctx.shadowBlur = 12;
      ctx.lineWidth = 8 * (1 - t) + 1; ctx.beginPath(); ctx.arc(0, 0, e.r * (0.6 + 0.4 * t), t * 8, t * 8 + 4.5); ctx.stroke();
      break;
    }
    case 'beamLine': {
      ctx.translate(0, -44); ctx.rotate(e.angle); ctx.globalCompositeOperation = 'lighter'; ctx.shadowColor = e.color; ctx.shadowBlur = 16;
      ctx.lineWidth = 5 * (1 - t) + 1; ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(e.r, 0); ctx.stroke();
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
      break;
    }
    case 'roar': {
      ctx.shadowColor = e.color; ctx.shadowBlur = 10;
      for (let i = 0; i < 3; i++) { const r = e.r * clamp(t * 1.4 - i * 0.18, 0, 1); ctx.lineWidth = 3 - i; ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.5, 0, 0, TAU); ctx.stroke(); }
      break;
    }
    case 'dragon': {
      ctx.translate(0, -30); ctx.rotate(e.angle); ctx.shadowColor = e.color; ctx.shadowBlur = 18; ctx.globalCompositeOperation = 'lighter';
      const len = e.r * (0.4 + 0.6 * t);
      ctx.fillStyle = e.color; ctx.globalAlpha *= 0.5;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len, -len * 0.45); ctx.quadraticCurveTo(len * 1.1, 0, len, len * 0.45); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = Math.max(0, 1 - t); ctx.lineWidth = 3;
      for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(len * 0.2, (i - 2) * 8); ctx.quadraticCurveTo(len * 0.6, (i - 2) * 16 + Math.sin(t * 9 + i) * 8, len, (i - 2) * 22); ctx.stroke(); }
      break;
    }
    case 'buddha': {
      ctx.shadowColor = e.color; ctx.shadowBlur = 16; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.ellipse(0, 0, e.r * (0.8 + t * 0.4), e.r * 0.5 * (0.8 + t * 0.4), 0, 0, TAU); ctx.stroke();
      ctx.save(); ctx.scale(1, 0.5); ctx.rotate(t * 2); ctx.font = `bold 64px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.globalAlpha *= 0.65; ctx.fillText('卍', 0, 0); ctx.restore();
      break;
    }
  }
  ctx.restore();
}

function drawProjectile(ctx, p) {
  if (drawProjectileVfx(ctx, p, ambient)) return;
  ctx.save(); ctx.translate(p.x, p.y - 34); ctx.rotate(p.angle);
  ctx.strokeStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 12;
  if (p.type === 'needle') { ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(8, 0); ctx.stroke(); }
  else if (p.type === 'dart') { ctx.fillStyle = '#d8dee2'; ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(-6, -3); ctx.lineTo(-3, 0); ctx.lineTo(-6, 3); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(220,230,235,0.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(-26, 0); ctx.stroke(); }
  else if (p.type === 'finger') { ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(10, 0); ctx.stroke(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke(); }
  else { ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 36, -0.95, 0.95); ctx.stroke(); }
  ctx.restore();
}

function drawParticles(ctx, dt) {
  for (const q of state.particles) {
    ctx.globalAlpha = clamp(q.life / q.max, 0, 1);
    ctx.fillStyle = q.color; ctx.fillRect(q.x - q.size / 2, q.y - q.z - q.size / 2, q.size, q.size);
  }
  ctx.globalAlpha = 1;
}

function drawFloaters(ctx, dt) {
  for (const f of state.floaters) {
    const k = 1 - f.life / f.max;
    ctx.save();
    ctx.font = `bold ${f.big ? 22 : 16}px ${FONT}`; ctx.textAlign = 'center';
    ctx.globalAlpha = Math.min(1, f.life * 2.5);
    ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(20,14,10,0.8)';
    const y = f.y - k * 44, sc = f.big ? 1 + Math.max(0, 0.4 - k) : 1;
    ctx.translate(f.x, y); ctx.scale(sc, sc);
    ctx.strokeText(f.text, 0, 0); ctx.fillStyle = f.color; ctx.fillText(f.text, 0, 0);
    ctx.restore();
  }
}

function drawMarker(ctx, m) {
  const t = (ambient - m.t) / 0.6;
  ctx.save(); ctx.translate(m.x, m.y); ctx.globalAlpha = 1 - t;
  ctx.strokeStyle = '#bfe9a0'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(0, 0, 18 * (1 - t) + 4, 8 * (1 - t) + 2, 0, 0, TAU); ctx.stroke();
  ctx.restore();
}

function drawZone(ctx, x0, y0, x1, y1) {
  if (state.phase === 'menu' || !state.zone) return;
  const z = state.zone;
  ctx.save();
  ctx.fillStyle = 'rgba(70,30,80,0.32)';
  ctx.beginPath(); ctx.rect(x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 20); ctx.arc(z.x, z.y, Math.max(1, z.r), 0, TAU, true); ctx.fill('evenodd');
  ctx.strokeStyle = 'rgba(230,215,170,0.8)'; ctx.lineWidth = 4; ctx.setLineDash([16, 9]); ctx.lineDashOffset = -ambient * 14;
  ctx.beginPath(); ctx.arc(z.x, z.y, Math.max(1, z.r), 0, TAU); ctx.stroke();
  if (z.stage !== 'done') { ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 2; ctx.setLineDash([6, 10]); ctx.beginPath(); ctx.arc(z.tx, z.ty, Math.max(1, z.tr), 0, TAU); ctx.stroke(); }
  ctx.restore();
}

function drawAmbient(ctx, x0, y0, x1, y1) {
  const w = x1 - x0, h = y1 - y0;
  for (let i = 0; i < 24; i++) {
    const x = x0 + ((i * 137.5 + ambient * (14 + i % 4 * 5)) % w), y = y0 + ((i * 251.3 + ambient * (8 + i % 3 * 3) + Math.sin(ambient * 0.6 + i) * 30) % h);
    ctx.fillStyle = i % 3 ? 'rgba(228,214,154,0.35)' : 'rgba(160,190,110,0.4)';
    ctx.beginPath(); ctx.ellipse(x, y, 3, 1.2, ambient + i, 0, TAU); ctx.fill();
  }
}

// ---------- minimap ----------
export function drawMinimap(mctx, size, big = false) {
  mctx.clearRect(0, 0, size, size);
  if (!world.minimap) return;
  mctx.drawImage(world.minimap, 0, 0, size, size);
  const k = size / WORLD, z = state.zone, p = state.player;
  if (state.phase !== 'menu' && z) {
    mctx.save();
    mctx.fillStyle = 'rgba(60,20,70,0.35)'; mctx.beginPath(); mctx.rect(0, 0, size, size); mctx.arc(z.x * k, z.y * k, Math.max(0.5, z.r * k), 0, TAU, true); mctx.fill('evenodd');
    mctx.strokeStyle = '#f0e2b0'; mctx.lineWidth = big ? 2 : 1.5; mctx.beginPath(); mctx.arc(z.x * k, z.y * k, Math.max(0.5, z.r * k), 0, TAU); mctx.stroke();
    if (z.stage !== 'done') { mctx.strokeStyle = '#ffffff'; mctx.setLineDash([3, 3]); mctx.lineWidth = 1; mctx.beginPath(); mctx.arc(z.tx * k, z.ty * k, Math.max(0.5, z.tr * k), 0, TAU); mctx.stroke(); mctx.setLineDash([]); }
    mctx.restore();
  }
  if (big) {
    mctx.font = `bold 12px ${FONT}`; mctx.textAlign = 'center';
    for (const poi of world.pois) { mctx.fillStyle = 'rgba(10,14,10,0.6)'; const w = mctx.measureText(poi.name).width + 10; mctx.fillRect(poi.x * k - w / 2, poi.y * k - 22, w, 16); mctx.fillStyle = '#f1dc9c'; mctx.fillText(poi.name, poi.x * k, poi.y * k - 10); }
    for (const c of world.camps) { mctx.fillStyle = '#c9a060'; mctx.font = `bold 10px ${FONT}`; mctx.fillText('⌂', c.x * k, c.y * k + 4); }
  }
  // an announced elite: a pulsing skull where it will appear
  if (state.phase !== 'menu') for (const el of state.elites || []) {
    if (!el.announced || el.done) continue;
    const pulse = 0.6 + 0.4 * Math.sin(ambient * 6);
    mctx.fillStyle = `rgba(242,160,78,${pulse})`; mctx.strokeStyle = '#1a120a'; mctx.lineWidth = 1;
    mctx.font = `bold ${big ? 20 : 14}px ${FONT}`; mctx.textAlign = 'center'; mctx.strokeText('☠', el.x * k, el.y * k + 5); mctx.fillText('☠', el.x * k, el.y * k + 5);
    if (big) { mctx.font = `bold 11px ${FONT}`; mctx.fillText(`${el.def.name} · ${Math.max(0, Math.ceil(el.spawn - state.time))}s`, el.x * k, el.y * k + 22); }
  }
  if (state.phase !== 'menu') for (const ev of state.events) {
    if (!ev.announced || (ev.done && !state.loot.includes(ev.item))) continue;
    const pulse = 0.6 + 0.4 * Math.sin(ambient * 5);
    mctx.fillStyle = ev.done ? TIERS[5].color : `rgba(242,160,78,${pulse})`; mctx.strokeStyle = '#1a120a'; mctx.lineWidth = 1;
    mctx.font = `bold ${big ? 18 : 13}px ${FONT}`; mctx.textAlign = 'center'; mctx.strokeText('★', ev.x * k, ev.y * k + 5); mctx.fillText('★', ev.x * k, ev.y * k + 5);
    if (big) { mctx.font = `bold 11px ${FONT}`; mctx.fillText(ev.done ? 'Bảo khố' : `Bảo khố · ${Math.max(0, Math.ceil(ev.spawn - state.time))}s`, ev.x * k, ev.y * k + 20); }
  }
  // bosses are always shown: a diamond in the colour of their tier, so a fighter can pick a prey on the way
  if (state.phase !== 'menu') for (const h of state.heroes) {
    if (!h.boss || h.boss.monster || !h.alive) continue;
    const r = (big ? 6.5 : 4) + h.boss.tier * 0.6;
    mctx.save(); mctx.translate(h.x * k, h.y * k); mctx.rotate(Math.PI / 4);
    mctx.fillStyle = h.boss.color; mctx.strokeStyle = '#140d0a'; mctx.lineWidth = 1.2;
    mctx.fillRect(-r / 1.4, -r / 1.4, r * 1.4, r * 1.4); mctx.strokeRect(-r / 1.4, -r / 1.4, r * 1.4, r * 1.4);
    mctx.restore();
    if (big) { mctx.font = `bold 11px ${FONT}`; mctx.textAlign = 'center'; mctx.fillStyle = '#f4e6c4'; mctx.strokeStyle = '#140d0a'; mctx.lineWidth = 3; mctx.strokeText(h.name, h.x * k, h.y * k - 12); mctx.fillText(h.name, h.x * k, h.y * k - 12); }
  }
  if (state.phase !== 'menu' && p) {
    const range = big ? 1400 : 1000;
    for (const h of state.heroes) {
      if (!h.alive || h.player || h.boss || dist(h, p) > range) continue;
      mctx.fillStyle = h.pk > 0 ? '#ff4a3a' : canHarm(h, p) ? '#f08a6a' : '#e0d6b0';
      mctx.beginPath(); mctx.arc(h.x * k, h.y * k, big ? 3.5 : 2.2, 0, TAU); mctx.fill();
    }
    mctx.save(); mctx.translate(p.x * k, p.y * k); mctx.rotate(p.angle);
    mctx.fillStyle = '#fff4c2'; mctx.strokeStyle = '#1a1a14'; mctx.lineWidth = 1;
    const s = big ? 8 : 5;
    mctx.beginPath(); mctx.moveTo(s, 0); mctx.lineTo(-s * 0.7, -s * 0.6); mctx.lineTo(-s * 0.35, 0); mctx.lineTo(-s * 0.7, s * 0.6); mctx.closePath(); mctx.fill(); mctx.stroke();
    mctx.restore();
    if (!big) { mctx.strokeStyle = 'rgba(255,244,194,0.5)'; mctx.lineWidth = 1; mctx.strokeRect((cam.x - view.w / view.zoom / 2) * k, (cam.y - view.h / view.zoom / 2) * k, view.w / view.zoom * k, view.h / view.zoom * k); }
  }
}

export function pickEntity(wx, wy) {
  let best = null, bd = Infinity;
  for (const e of state.entities) {
    if (!e.alive || e.player) continue;
    const s = e.boss?.size ?? 1, cy = e.y - 40 * s - e.z;
    const dx = Math.abs(wx - e.x), dy = Math.abs(wy - cy);
    if (dx < 24 * s && dy < 48 * s) { const d = dx + dy; if (d < bd) { bd = d; best = e; } }
  }
  return best;
}
export function pickLoot(wx, wy) {
  return state.loot.find(i => {
    const isChest = i.kind === 'chest';
    const tagY = i.y - (isChest ? 42 : 32);
    // Click on item / chest sprite body
    const hitBody = isChest
      ? (Math.abs(i.x - wx) < 30 && Math.abs(i.y - 14 - wy) < 26)
      : (Math.abs(i.x - wx) < 22 && Math.abs(i.y - 10 - wy) < 22);
    // Click on VLTK1 ground name tag (horizontal span ~65px from center, vertical ~14px around tag center)
    const hitTag = Math.abs(i.x - wx) < 65 && Math.abs(tagY - wy) < 14;
    return hitBody || hitTag;
  }) || null;
}
