// Wandering bosses and map-wide loot. Bosses are ordinary heroes (so every martial art, effect and sound works on
// them) flagged with `boss`, driven by thinkBoss instead of a player or bot brain. engine.js hands over the pieces
// this module needs through bossApi(), which keeps the two files from importing each other.
import { WORLD, RULES, BOOKS, bookById, WEAPON_TYPES, SPECIAL_WEAPONS } from './data.js';
import { BOSS_TIERS, BOSSES, CAMP_LOOT, WILD, ELITE, MONSTER_TIER, MONSTERS, MONSTER_PACKS } from './boss-data.js';
import { tone } from './audio.js';
import { world, roomy, nearestLegal, randomLegal } from './world.js';
import { TAU, random, pick } from './util.js';

let api = null;
export const bossApi = a => { api = a; };

const FX = { kim: 'tw', moc: 'wu', thuy: 'em', hoa: 'gb', tho: 'wd' };
const CENTER = WORLD / 2, HALF = WORLD / 2;
const weaponTypes = Object.keys(WEAPON_TYPES);
const shuffle = (arr, rng) => arr.map(v => [rng(), v]).sort((a, b) => a[0] - b[0]).map(p => p[1]);
const ringOf = (x, y) => Math.hypot(x - CENTER, y - CENTER) / HALF;
const weighted = (w, rng = Math.random) => { let r = rng() * w.reduce((a, b) => a + b, 0); for (let i = 0; i < w.length; i++) { r -= w[i]; if (r < 0) return i; } return 0; };

// ---------------- spawning ----------------
export const isBoss = e => !!e?.boss;
// a field monster (quái) runs on the boss brain but is not a boss for the map, the tally or the bots
export const isMonster = e => !!e?.boss?.monster;

// The catalog of survival manuals is regenerated from the client data and changes between exports, so a kit id that is
// gone is replaced by another manual of about the same tier (same weapon first) instead of leaving the boss without it.
// Tiers follow the VLTK learn level (cấp 150 = V, 90 = IV, 60–70 = III): the free map has no tier I–II manual, so a
// tier I boss uses the lowest tier on the map, and a kit manual above the boss's range (now orange) is replaced too.
const KIT_TIER = { 1: [1, 3], 2: [2, 4], 3: [3, 4] };
function resolveKit(def) {
  const used = new Set(), out = [null, null, null, null];
  def.kit.forEach((id, i) => {
    let b = bookById[id];
    if (!b || b.tier > KIT_TIER[def.tier][1]) {
      const [lo, hi] = KIT_TIER[def.tier];
      const pool = BOOKS.filter(x => x.tier >= lo && x.tier <= hi && !used.has(x.id));
      b = pool.find(x => x.weapon === def.weapon) || pool[0] || null;
    }
    if (b) used.add(b.id);
    out[i] = b;
  });
  return out;
}
function makeBoss(def, pos, encounter = {}) {
  const base=def.tier===0?MONSTER_TIER:BOSS_TIERS[def.tier],wave=encounter.wave||0,T={...base,hp:Math.round(base.hp*(encounter.hpScale||1)),armor:base.armor+Math.max(0,wave-1)*.015,dmgMul:base.dmgMul*(1+Math.max(0,wave-1)*.04)};
  const faction = { id: 'boss', name: T.title, fx: FX[def.element], element: def.element, weapon: def.weapon, side: 'ta', look: { robe: '#5a2a22', trim: '#c9a24f', sash: '#1a1414', pants: '#2a2020', boots: '#1a1412', hair: '#161210', skin: '#d4a57e' }, avatars: [] };
  const avatar = { id: `boss-${def.id}`, gender: def.gender, title: T.title, vltk: def.sprite };
  const e = api.makeHero(faction, def.name, false, avatar);
  e.slots = resolveKit(def);
  e.hp = e.maxHp = T.hp; e.mp = e.maxMp = 9999;
  e.stats.armorDR = T.armor; e.stats.ccr = T.ccr;
  e.potions = { hp: 0, mp: 0 };
  e.x = pos.x; e.y = pos.y; e.angle = random(0, TAU);
  e.boss = { def, tier: def.tier, monster: !!T.monster, T, title: T.title, color: T.color, size: T.size * (def.fit || 1), dmgMul: T.dmgMul, speed: T.speed * (def.runSpeed && T.runRef ? def.runSpeed / T.runRef : 1), home: { x: pos.x, y: pos.y }, state: 'idle', target: null, think: random(0, 0.3), skillT: random(0.5, 1.5), windup:null,recoverT:0,wave };
  return e;
}

// A free spot: inside the ring band [r0, r1] (fractions of the map radius), roomy, and away from `taken`.
function wildSpot(rng, r0, r1, taken, gap) {
  let best = null;
  for (let i = 0; i < 120; i++) {
    const a = rng() * TAU, r = (r0 + rng() * (r1 - r0)) * HALF;
    const p = nearestLegal(CENTER + Math.cos(a) * r, CENTER + Math.sin(a) * r);
    if (!(roomy(p.x, p.y, 40) && roomy(p.x, p.y, 70))) continue;
    best = p;
    if (taken.every(t => Math.hypot(t.x - p.x, t.y - p.y) > gap)) return p;
  }
  return best || nearestLegal(CENTER + HALF * 0.6, CENTER);
}
function poiSpot(rng, id, taken) {
  const poi = world.pois.find(p => p.id === id);
  if (!poi) return null;
  for (let i = 0; i < 60; i++) {
    const a = rng() * TAU, d = rng() * poi.r * 0.35, p = nearestLegal(poi.x + Math.cos(a) * d, poi.y + Math.sin(a) * d * 0.8);
    if ((roomy(p.x, p.y, 40) && roomy(p.x, p.y, 70)) && taken.every(t => Math.hypot(t.x - p.x, t.y - p.y) > 1500)) return p;
  }
  return null;
}

// Roster of one match: tier I in the wild, tier II at their districts or the wild, tier III at the far landmarks.
// Planned before the fighters are placed, so that no one starts on top of a boss camp; spawnPlanned() then creates them.
export function planBosses(rng) {
  const byTier = t => BOSSES.filter(b => b.tier === t);
  const plan = [];
  const t1 = shuffle(byTier(1), rng);
  for (let i = 0; i < BOSS_TIERS[1].count; i++) plan.push({ def: t1[i % t1.length], r: [0.4, 0.92], gap: 1100 });
  const t2 = byTier(2), homed = t2.filter(b => b.home), free = shuffle(t2.filter(b => !b.home), rng);
  const t2Order=[...homed,...free];
  for(let i=0;i<BOSS_TIERS[2].count;i++)plan.push({def:t2Order[i%t2Order.length],r:[.45,.94],gap:1500});
  for (const d of byTier(3).slice(0, BOSS_TIERS[3].count)) plan.push({ def: d, r: [0.6, 0.9], gap: 2200 });
  // strongest first, so the tiers that need the most room get it
  plan.sort((a, b) => b.def.tier - a.def.tier);
  const camps = [];
  for (const { def, r, gap } of plan) {
    const pos = (def.home && poiSpot(rng, def.home, camps)) || wildSpot(rng, r[0], r[1], camps, gap);
    camps.push(pos);
  }
  return plan.map((p, i) => ({ def: p.def, pos: camps[i] }));
}
export function spawnPlanned(plan) {
  const made = plan.map(({ def, pos }) => { const e = makeBoss(def, pos); api.addHero(e); campLoot(e); return e; });
  api.state.bossTotal = made.length; api.state.bossKills = 0;
  return made;
}

// One boss of a given kind at a given place (the match roster above, the elites, and QA that needs a specific boss).
export function spawnOne(def, pos, camp = true, encounter = {}) {
  const e = makeBoss(def, pos, encounter);
  api.addHero(e); if (camp) campLoot(e);
  return e;
}

// ---------------- field monsters ----------------
// Packs of quái over the whole map, away from the boss camps and from where the fighters start.
export function spawnMonsters(rng) {
  const S = api.state, P = MONSTER_PACKS, taken = S.heroes.map(h => ({ x: h.x, y: h.y })), made = [];
  for (let i = 0; i < P.packs; i++) {
    const center = wildSpot(rng, P.r[0], P.r[1], taken, P.gap);
    taken.push(center);
    const def = MONSTERS[Math.floor(rng() * MONSTERS.length)], n = P.size[0] + Math.floor(rng() * (P.size[1] - P.size[0] + 1));
    for (let k = 0; k < n; k++) {
      const a = rng() * TAU, p = nearestLegal(center.x + Math.cos(a) * 70, center.y + Math.sin(a) * 70);
      const e = makeBoss(def, roomy(p.x, p.y, 24) ? p : center);
      api.addHero(e); made.push(e);
    }
  }
  return made;
}

// ---------------- elite bosses ----------------
// Three waves in the 28-minute match, announced on screen before spawning inside the
// upcoming safe circle) from `spawn` on. Beating one drops a tier V manual, and only that.
export function planElites(rng) {
  const defs = shuffle(BOSSES.filter(b => BOSS_TIERS[b.tier].elite), rng);
  return ELITE.events.filter((e, i) => i === 0 || rng() < e.chance).map((e, i) => ({ ...e, def: defs[i % defs.length], announced: false, done: false }));
}
function eliteSite() {
  const z = api.state.zone, inside = (x, y) => Math.hypot(x - z.tx, y - z.ty) < Math.max(100, z.tr * 0.8 - 180);
  const open = p => inside(p.x,p.y) && roomy(p.x,p.y,160);
  for (const poi of shuffle(world.pois.filter(p => ELITE.sites.includes(p.id) && inside(p.x, p.y)), Math.random)) {
    for (let i = 0; i < 30; i++) {
      const a = random(0, TAU), d = random(0, poi.r * 0.35), p = nearestLegal(poi.x + Math.cos(a) * d, poi.y + Math.sin(a) * d * 0.8);
      if (open(p)) return { x: p.x, y: p.y, name: poi.name };
    }
  }
  for (let i = 0; i < 60; i++) {
    const a = random(0, TAU), d = Math.sqrt(Math.random()) * Math.max(120, z.tr * 0.55), p = nearestLegal(z.tx + Math.cos(a) * d, z.ty + Math.sin(a) * d);
    if (open(p)) return { x: p.x, y: p.y, name: 'vùng hoang dã' };
  }
  const p = nearestLegal(z.tx, z.ty);
  return { x: p.x, y: p.y, name: 'vùng hoang dã' };
}
export function updateElites() {
  const S = api.state, color = BOSS_TIERS[3].color;
  for (const ev of S.elites) {
    if (!ev.announced && S.time >= ev.announce) {
      ev.announced = true;
      Object.assign(ev, eliteSite());
      const wait = Math.round(ev.spawn - ev.announce);
      api.say(`${BOSS_TIERS[3].title} ${ev.def.name} sắp xuất thế tại ${ev.name} sau ${wait} giây — hạ được sẽ rơi bí kíp bậc V!`, color);
      api.announce('魔', `${ev.def.name} xuất thế tại ${ev.name} — bí kíp bậc V`);
      tone(262, 0.5, 'triangle', 0.06);
    }
    if (ev.announced && !ev.done && S.time >= ev.spawn) {
      ev.done = true;
      const e = spawnOne(ev.def, { x: ev.x, y: ev.y }, false,ev);
      e.boss.elite = true; ev.boss = e; S.bossTotal++;
      api.say(`${ev.def.name} đã xuất hiện tại ${ev.name}!`, color);
      api.addEffect('levelup', ev.x, ev.y, color, 1.8, 80);
      tone(196, 0.6, 'triangle', 0.06);
    }
  }
}

// The manual an elite drops: a tier V one that is the scarcest right now (held or lying around).
function topBook() {
  const S = api.state, tops = BOOKS.filter(b => b.tier === 5);
  const have = b => S.loot.filter(i => i.kind === 'book' && i.book.id === b.id).length + S.heroes.filter(h => h.slots.some(s => s?.id === b.id)).length;
  const min = Math.min(...tops.map(have));
  return pick(tops.filter(b => have(b) === min));
}

// The camp the boss guards: loot piles and chests lying around its home.
function campLoot(e) {
  const [normal, rich, chests] = CAMP_LOOT[e.boss.tier], h = e.boss.home;
  const put = (fn, min, max) => {
    for (let i = 0; i < 40; i++) {
      const a = random(0, TAU), d = random(min, max), p = nearestLegal(h.x + Math.cos(a) * d, h.y + Math.sin(a) * d);
      if (roomy(p.x, p.y, 24)) { fn(p); return; }
    }
  };
  for (let i = 0; i < normal; i++) put(p => api.rollLoot(p.x, p.y, 'normal'), 150, 300);
  for (let i = 0; i < rich; i++) put(p => api.rollLoot(p.x, p.y, 'rich'), 150, 300);
  for (let i = 0; i < chests; i++) put(p => api.addLoot({ kind: 'chest', x: p.x, y: p.y, rich: true, dur: 1.2 }), 120, 260);
}

// ---------------- loot over the whole map ----------------
// One cell every WILD.cell units, topped up where the district loot of the layout is thin; the outer ring is
// filled more often and holds a few chests, so a wanderer far from every landmark still finds something.
export function scatterWildLoot(rng) {
  const { state } = api, C = WILD.cell, n = Math.floor(WORLD / C), pad = (WORLD - n * C) / 2;
  const near = (x, y, r) => state.loot.filter(i => Math.abs(i.x - x) < r && Math.abs(i.y - y) < r).length;
  const outerCells = [];
  let piles = 0;
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const cx = (i + 0.5) * C + pad, cy = (j + 0.5) * C + pad, ring = ringOf(cx, cy);
    // The initial circle surrounds the square: corner starts also need gear and supplies.
    const outer = ring >= WILD.outerFrom;
    if (outer) outerCells.push({ cx, cy });
    if (near(cx, cy, C * 0.6) >= WILD.maxNear || rng() > (outer ? WILD.pOuter : WILD.pInner)) continue;
    let p = null;
    for (let attempt = 0; attempt < 8 && !p; attempt++) { const candidate = randomLegal(rng, cx, cy, C * 0.42); if (candidate && roomy(candidate.x, candidate.y, 24)) p = candidate; }
    if (!p) continue;
    api.rollLoot(p.x, p.y, outer && rng() < WILD.richOuter ? 'rich' : 'normal'); piles++;
  }
  let chests = 0;
  for (const c of shuffle(outerCells, rng)) {
    if (chests >= WILD.chests) break;
    const p = randomLegal(rng, c.cx, c.cy, C * 0.4);
    if (!p || !roomy(p.x, p.y, 30) || state.loot.some(i => i.kind === 'chest' && Math.hypot(i.x - p.x, i.y - p.y) < 700)) continue;
    const rich = rng() < WILD.chestRich;
    api.addLoot({ kind: 'chest', x: p.x, y: p.y, rich, dur: rich ? 1.2 : 0.8 }); chests++;
  }
  return { piles, chests };
}

// ---------------- drops ----------------
function dropBooks(e, spec) {
  const taken = new Set();
  for (let i = 0; i < spec.n; i++) {
    // only tiers that still have manuals count; never the same manual twice from one boss
    const w = spec.w.map((v, t) => BOOKS.some(b => b.tier === t + 1 && !taken.has(b.id)) ? v : 0);
    const tier = weighted(w) + 1, book = pick(BOOKS.filter(b => b.tier === tier && !taken.has(b.id)));
    taken.add(book.id);
    const q = api.scatter(e.x, e.y, 70); api.dropBook(q.x, q.y, book);
  }
}
// A quái drops each item with its own chance (MONSTER_TIER.drops); manuals are off (book 0) unless an event turns them
// on, and then follow the normal table (25% cam).
function monsterDrops(e, killer) {
  const D = e.boss.T.drops, put = fn => { const q = api.scatter(e.x, e.y, 50); fn(q); };
  if (Math.random() < D.book) put(q => api.dropBook(q.x, q.y, api.randomBook('normal')));
  if (Math.random() < D.gear) put(q => api.dropGear(q.x, q.y, api.makeGear(pick(RULES.gearSlots), weighted(api.gearTable('normal')))));
  if (Math.random() < D.weapon) put(q => api.dropWeapon(q.x, q.y, api.makeWeapon(pick(weaponTypes), weighted(api.gearTable('normal')))));
  if (Math.random() < D.potion) put(q => api.dropPotion(q.x, q.y, undefined, 2));
  if (killer?.player) api.state.monsterKills = (api.state.monsterKills || 0) + 1;
}
export function bossKilled(e, killer) {
  const B = e.boss, D = B.T.drops;
  if (B.monster) { monsterDrops(e, killer); return; }
  if (D.tierV) {
    const book = topBook(), q = api.scatter(e.x, e.y, 50);
    api.dropBook(q.x, q.y, book);
    api.addEffect('levelup', e.x, e.y, B.color, 1.8, 80);
    api.say(`${killer ? killer.name : 'Giang hồ'} đã hạ ${B.title} ${e.name} — ${book.name} xuất thế!`, B.color);
    api.announce('魔', `${e.name} đã bị hạ — ${book.name} rơi xuống`);
    if (killer) { killer.bossKills = (killer.bossKills || 0) + 1; if (killer.player) api.state.bossKills = (api.state.bossKills || 0) + 1; }
    return;
  }
  dropBooks(e, D.books);
  for (let i = 0; i < D.gear.n; i++) { const q = api.scatter(e.x, e.y, 70); api.dropGear(q.x, q.y, api.makeGear(pick(RULES.gearSlots), weighted(D.gear.w))); }
  for (let i = 0; i < D.weapon.n; i++) {
    const q = api.scatter(e.x, e.y, 70);
    if (D.weapon.special && Math.random() < D.weapon.special) api.dropWeapon(q.x, q.y, api.makeSpecial(pick(SPECIAL_WEAPONS).id));
    else api.dropWeapon(q.x, q.y, api.makeWeapon(pick(weaponTypes), weighted(D.weapon.w)));
  }
  for (const t of ['hp', 'mp']) if (D.potions[t]) { const q = api.scatter(e.x, e.y, 70); api.dropPotion(q.x, q.y, t, D.potions[t]); }
  api.addEffect('levelup', e.x, e.y, B.color, 1.6, 70);
  api.say(`${killer ? killer.name : 'Giang hồ'} đã hạ ${B.title} ${e.name} — vật phẩm rơi ra khắp nơi!`, B.color);
  if (killer) { killer.bossKills = (killer.bossKills || 0) + 1; if (killer.player) api.state.bossKills = (api.state.bossKills || 0) + 1; }
}

// ---------------- behaviour ----------------
function chooseTarget(e) {
  const B = e.boss, { state } = api, h0 = B.home;
  let best = null, bd = Infinity;
  for (const h of state.heroes) {
    if (h.boss || !h.alive || !api.canHarm(e, h)) continue;
    // a quái goes for the player on its own and answers whoever struck it; it does not chase every passing bot
    if (B.monster && !h.human &&!(e.lastAttacker === h && state.time - (e.lastHitT ?? -99) < 8)) continue;
    const away = Math.hypot(h.x - h0.x, h.y - h0.y), d = Math.hypot(h.x - e.x, h.y - e.y);
    const keep = h === B.target;
    if (away > B.T.leash * (keep ? 1.2 : 1) || d > B.T.aggro * (keep ? 1.5 : 1)) continue;
    const score = d - (keep ? 140 : 0) - (e.lastAttacker === h && state.time - (e.lastHitT ?? -99) < 5 ? 200 : 0);
    if (score < bd) { bd = score; best = h; }
  }
  return best;
}

export function thinkBoss(e, dt) {
  const B = e.boss, { state } = api;
  e.mp = e.maxMp;
  B.think -= dt; B.skillT -= dt; B.recoverT=Math.max(0,B.recoverT-dt);
  if (B.think <= 0) {
    B.think = 0.25;
    const t = chooseTarget(e);
    if (t) { B.target = t; B.state = 'fight'; }
    else if (B.state === 'fight') { B.state = 'return'; B.target = null; B.windup=null; }
    // dragged too far from the camp: give up the chase and heal on the way home
    if (Math.hypot(e.x - B.home.x, e.y - B.home.y) > B.T.leash * 1.35 && B.state !== 'return') { B.state = 'return'; B.target = null; B.windup=null; }
  }
  const homeD = Math.hypot(e.x - B.home.x, e.y - B.home.y);
  if (B.state === 'return') {
    e.hp = Math.min(e.maxHp, e.hp + e.maxHp * 0.08 * dt);
    if (homeD > 120) e.inv = Math.max(e.inv, 0.2);
    if (api.busy(e)) return;
    // back at the camp: stay and finish healing before going idle
    if ((api.navigate(e, B.home.x, B.home.y, dt, 40) || homeD < 60) && e.hp >= e.maxHp * 0.999) B.state = 'idle';
    return;
  }
  if (B.state === 'idle') {
    if (state.time - e.lastCombat > 6) e.hp = Math.min(e.maxHp, e.hp + e.maxHp * 0.015 * dt);
    return;
  }
  const t = B.target;
  if (!t || !t.alive || !api.canHarm(e, t)) { B.state = 'return'; B.target = null; B.windup=null; return; }
  if(B.windup){const w=B.windup;w.left-=dt;e.angle=w.angle;
    if(w.left<=0){
      B.windup=null;
      const devDist = random(16, 42), devA = random(0, TAU);
      api.cast(e, w.slot, w.x + Math.cos(devA) * devDist, w.y + Math.sin(devA) * devDist);
      B.recoverT=B.T.recovery;B.skillT=random(...B.T.skillGap)*(e.hp<e.maxHp*.25?.85:1);
    }
    return;
  }
  if(B.recoverT>0)return;
  if (e.castLock > 0) return;
  const d = Math.hypot(e.x - t.x, e.y - t.y), wr = WEAPON_TYPES[api.held(e).type].range - 16;
  if (B.skillT <= 0) {
    B.skillT = random(B.T.skillGap[0], B.T.skillGap[1]);
    for (const i of [0, 1, 2, 3].sort(() => Math.random() - 0.5)) {
      const s = e.slots[i];
      if (!s || api.cooldownLeft(e, s) > 0 || !api.artReady(s)) continue;   // art still loading (vfx.js): no wind-up for nothing
      if (d < api.skillReach(s)) {
        const total=B.T.windup;
        const leadAngle = Math.atan2(t.y - e.y, t.x - e.x) + random(-0.16, 0.16);
        B.windup={slot:i,x:t.x,y:t.y,left:total,total,angle:leadAngle,kind:s.kind,range:s.range||s.radius||s.dist||180,width:s.width||80,arc:s.arc||1,radius:s.radius||s.range||180};
        return;
      }
    }
  }
  if (d > wr) api.navigate(e, t.x, t.y, dt, wr * 0.8);
  else api.attack(e, t);
}

// ---------------- bots ----------------
// How much martial art a bot carries: the sum of its manuals' tiers. A boss asks for a minimum by tier.
const NEED = { 1: 3, 2: 5, 3: 13 };
export const power = e => e.slots.reduce((n, s) => n + (s ? s.tier : 0), 0);
// Hysteresis: a bot starts a boss fight healthy (70%) but only gives it up below 35% once engaged.
export const fitFor = (e, boss) => api.state.time >= (planOf(e.ai).at) && power(e) >= NEED[boss.boss.tier] * (e.ai?.personality === 'cautious' ? 1.4 : 1) && e.hp >= e.maxHp * (e.ai?.goal?.target === boss ? 0.35 : 0.7);
// Each bot decides once whether it hunts bosses and when it starts (after some looting), so bosses are not cleared in the first minute.
function planOf(ai) {
  if (ai.bossPlan === undefined) {
    const want = { aggressive: 0.2, balanced: 0.12, looter: 0.06, cautious: 0.03 }[ai.personality] ?? 0.1;
    ai.bossPlan = Math.random() < want; ai.bossAt = random(120, 480);
  }
  return { hunts: ai.bossPlan, at: ai.bossAt };
}
// Only a bot that hunts bosses, and is ready for this one, stands and fights it; every other bot gives way.
export const canFightBoss = (e, boss) => boss.boss.monster ? e.hp >= e.maxHp * 0.35 : planOf(e.ai).hunts && fitFor(e, boss);
// Loot lying in the sight of a boss stays untouched unless the bot may fight that boss.
export function guarded(e, item) {
  for (const b of api.state.heroes) if (b.boss && !b.boss.monster && b.alive && Math.hypot(item.x - b.boss.home.x, item.y - b.boss.home.y) < b.boss.T.aggro + 80 && !canFightBoss(e, b)) return true;
  return false;
}
// The boss a bot may go after: the nearest one it is strong enough for, early in the match only.
export function huntable(e) {
  const ai = e.ai, z = api.state.zone;
  if (z.phase > 5 || api.state.time < (ai.noBossUntil || 0)) return null;
  const plan = planOf(ai);
  if (!plan.hunts || api.state.time < plan.at) return null;
  let best = null, bd = 1000;
  for (const b of api.state.heroes) {
    if (!b.boss || b.boss.monster || !b.alive || !fitFor(e, b)) continue;
    // few bots go after an elite, so the tier V manual is mostly for whoever is on screen
    if (b.boss.T.elite && (ai.elitePlan ??= Math.random() < 0.2) === false) continue;
    const d = Math.hypot(b.x - e.x, b.y - e.y);
    if (d < bd) { bd = d; best = b; }
  }
  return best;
}
