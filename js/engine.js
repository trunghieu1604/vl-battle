// Survival simulation following docs/ke-hoach/PHUONG_AN_CAN_BANG_VO_HOC.md:
// equal stat budget, five-tier manuals, weapon groups, capped bonuses, per-skill cooldowns,
// diminishing crowd control, chests and announced tier V treasure. No monsters, levels or random crits.
import { WORLD, RULES, OPEN_FACTIONS, openAvatars, avatarOf, WEAPON_TYPES, WEAPON_BONUS, WEAPON_NAMES, SPECIAL_WEAPONS, GEAR, POTIONS, BOOKS, BASE_MOVE,
  slotAllows, isSurvivalBook, BOOK_TABLES, GEAR_TABLES, BOT_NAMES, ZONE_START_RADIUS, ZONE_PHASES, EVENT_CHESTS, TIERS, RARITY, PK_MODES, perVictim, bookById, factionById } from './data.js';
import { BOSSES, MONSTERS } from './boss-data.js';
import { TAU, clamp, lerp, dist, angleDiff, random, pick, mulberry32 } from './util.js';
import { world, legal, lineClear, findPath, randomLegal, nearestLegal, poiAt, roomy, randomizeWorldLoot, allocateSpawns } from './world.js';
import { tone, sfx } from './audio.js';
import { readGuestName } from './guest-name.js';
import { skillSound, skillVisual } from './skill-visuals.js';
import { createNativePresentation } from './native-presentation.js';
import { nativeSprite, skillArtReady, requestSkillArt } from './vfx.js';
import { projectileOrigin, advanceProjectile } from './projectile-motion.js';
import { makeBag, addItem, addPackedItem, packBag, removeItem, moveItem, usedCells, addPotions, takePotions, potionCount, fits, overlapping, placeItem, cellsOf, potionStack } from './bag.js';
import { sameBook, sameLoot } from './loot-identity.js';
import { compareEquipment, inferiorEquipment, sameEquipmentFamily } from './equipment-policy.js';
import { bossApi, planBosses, spawnPlanned, planElites, updateElites, scatterWildLoot, thinkBoss, bossKilled, huntable, canFightBoss, guarded, spawnMonsters, spawnOne } from './boss.js';

export const state = {
  phase: 'menu', time: 0, paused: false, entities: [], heroes: [], loot: [], effects: [], particles: [], projectiles: [], pending: [], nativeCasts: [], zones: [],
  floaters: [], chat: [], feed: [], zone: null, player: null, kills: 0, rank: 0, endAt: 0, result: null, place: null, near: null,
  events: [], elites: [], tierVLeft: 0, nextId: 1, factionId: 'hoason', bossTotal: 0, bossKills: 0, autoEquip: true, invRev: 0,
  // Online play (docs/ke-hoach/KE_HOACH_PVP_ONLINE_PHONG_CHO_VA_GHEP_TRAN_2026-10-08.md):
  //  server  — this simulation is the match server's: several real players (hero.human) driven by hero.input, no viewer;
  //  replica — this page only draws a match the server runs (net-client.js): no AI, damage, loot or zone of its own;
  //  rules   — { noDamage, noCooldown, freeMp } for the lobby: blows land and show, but nobody loses health.
  server: false, replica: false, rules: null,
};
const hooks = { onEnd: null, onSkills: null, onToast: null, onPlace: null, onAnnounce: null, onTell: null, onHumanOut: null, onBag: null };
export function setHooks(h) { Object.assign(hooks, h); }
const toast = msg => hooks.onToast?.(msg);
// a message for one real player: the page's own one sees it, on the match server it goes to that player's connection
const tell = (e, msg) => { if (e.player) toast(msg); else if (e.human) hooks.onTell?.(e, { toast: msg }); };
// replica: a command of the page's own player goes to the match server (net-client.js); the result comes back in its snapshots
const forward = (op, args) => { hooks.onAction?.(op, args); return true; };
let replaying = false;   // a replica re-plays what the server reported: never sent back up
const sayTo = (e, text, color) => { if (e.player) say(text, color); else if (e.human) hooks.onTell?.(e, { say: text, color }); };
const announce = (glyph, text) => hooks.onAnnounce?.(glyph, text);
export function say(text, color = '#e8dcae') { state.chat.push({ text, color, t: state.time }); if (state.chat.length > 7) state.chat.shift(); hooks.onSay?.(text, color); }
const nearPlayer = (x, y, r = 700) => state.player && Math.abs(state.player.x - x) < r && Math.abs(state.player.y - y) < r;

// ---------------- items ----------------
const weightedTier = weights => { let r = Math.random() * weights.reduce((a, b) => a + b, 0); for (let i = 0; i < weights.length; i++) { r -= weights[i]; if (r < 0) return i; } return 0; };
export function makeWeapon(type, rarity = 0) { return { type, rarity, name: WEAPON_NAMES[type][rarity], bonus: WEAPON_BONUS[rarity] }; }
export function makeSpecial(id) { const s = SPECIAL_WEAPONS.find(w => w.id === id); return { ...s, bonus: WEAPON_BONUS[s.rarity], special: true }; }
export function makeGear(slot, rarity) { const G = GEAR[slot]; const g = { slot, rarity, name: G.names[rarity] }; if (G.lines) g.line = pick(G.lines); return g; }
function randomBook(table) {
  const weights = BOOK_TABLES[table].map((w, i) => BOOKS.some(b => b.tier === i + 1) ? w : 0);
  const tier = weightedTier(weights) + 1;
  return pick(BOOKS.filter(b => b.tier === tier));
}
const weaponTypes = Object.keys(WEAPON_TYPES);

// ---------------- entities ----------------
function makeHero(faction, name, isPlayer, avatar = faction.avatars[0], skin = null) {
  const e = {
    // human: a real player (rules: bag, loot policy, controls, result); player: the one this page shows (UI, sound)
    id: state.nextId++, kind: 'hero', name, human: !!isPlayer, player: !!isPlayer && !state.server, faction, avatar, look: { id: avatar.id, gender: avatar.gender, ...faction.look, ...(skin ? { costume: skin } : {}) }, element: faction.element,
    x: 0, y: 0, z: 0, angle: Math.PI / 2, alive: true, deadT: 0,
    hp: RULES.baseHp, maxHp: RULES.baseHp, mp: RULES.baseMp, maxMp: RULES.baseMp, st: RULES.baseSt, maxSt: RULES.baseSt,
    slots: [null, null, null, null], noi: null, than: null, cdById: new Map(),
    weapons: [makeWeapon(faction.weapon, 0)], wi: 0,
    gear: {}, stats: null, potions: { hp: 4, mp: 3 }, hot: [], dots: [], potionCD: 0,
    anim: null, attackCD: 0, castLock: 0, hitT: 0, inv: 0, parry: null, slowT: 0, slowK: 0, stunT: 0, rootT: 0, freezeT: 0, downT: 0, ccLog: [], kb: null,
    channel: null, aura: null, jump: null, ghostT: 0, leap: { charges: 1, rechargeT: 0, last: -9 }, moveBuff: null, combo: { n: 0, t: -9 },
    walk: 0, moving: false, lastCombat: -99, regenPool: 0, castDmg: new Map(), castDrain: new Map(), opening: null,
    target: null, order: null, ai: null, kills: 0, dealt: 0, mode: 'dosat', pk: 0,
  };
  recalc(e);
  if (e.human) startBag(e);
  return e;
}

// Bot names (user 2026-10-08: Vietnamese / old Võ Lâm style, never shown as bots): the nicknames of data.js first,
// then the same with a wuxia family name in front. No number suffix, which would give a bot away.
const FAMILY = ['Lý', 'Trần', 'Lâm', 'Tiêu', 'Dương', 'Đoàn', 'Mộ Dung', 'Âu Dương', 'Độc Cô', 'Tư Mã', 'Gia Cát', 'Thượng Quan', 'Lệnh Hồ', 'Nhạc', 'Hoàng', 'Vương', 'Triệu', 'Bạch', 'Lục', 'Nhậm', 'Phong', 'Tạ', 'Diệp', 'Hàn'];
function botNames(n, rng, taken = []) {
  const used = new Set(taken), out = [], base = [...BOT_NAMES].sort(() => rng() - 0.5);
  for (const b of base) { if (out.length >= n) break; if (!used.has(b)) { used.add(b); out.push(b); } }
  for (let i = 0; out.length < n && i < 20000; i++) {
    const name = `${FAMILY[Math.floor(rng() * FAMILY.length)]} ${base[Math.floor(rng() * base.length)]}`;
    if (!used.has(name)) { used.add(name); out.push(name); }
  }
  return out;
}
function makeBot(f, name, rng, personality) {
  const looks = openAvatars(f), b = makeHero(f, name, false, looks[Math.floor(rng() * looks.length)]);
  b.ai = { personality, think: random(0, 0.5), goal: null, stuckT: 0, lx: b.x, ly: b.y, roamHome: { x: b.x, y: b.y }, wanderT: 0, skillT: random(0.5, 1.5) };
  return b;
}

export const held = e => e.weapons[e.wi] || e.weapons[1 - e.wi] || makeWeapon('quyen', 0);
export const thanOf = () => ({ ...BASE_MOVE });

export function recalc(e) {
  // Clear legacy equipment as well as excluding it from loot in this mode.
  e.noi = null; e.than = null;
  const s = { atkBonus: 0, armorDR: 0, dr: 0, move: 0, cdr: 0, mpCost: 0, ccr: 0, mpMax: 0, potion: 0, mpRegen: 0, hpMax: 0, hpPct: 0, mpPct: 0, stMax: 0, lifeSteal: 0, manaSteal: 0 };
  for (const slot of RULES.gearSlots) { const g = e.gear[slot]; if (!g) continue; for (const [k, v] of Object.entries(GEAR[slot].stat(g))) s[k] += v; }
  s.armorDR = Math.min(RULES.armorDRCap, s.armorDR);
  s.move = Math.min(RULES.gearMoveCap, s.move);
  s.cdr = Math.min(RULES.cdrCap, s.cdr); s.mpCost = Math.min(RULES.mpCostCap, s.mpCost); s.ccr = Math.min(RULES.ccReduceCap, s.ccr);
  s.lifeSteal = Math.min(RULES.lifeStealCap, s.lifeSteal); s.manaSteal = Math.min(RULES.manaStealCap, s.manaSteal);
  e.stats = s;
  e.maxMp = Math.round((RULES.baseMp + s.mpMax) * (1 + Math.min(0.3, s.mpPct))); e.mp = Math.min(e.mp, e.maxMp);
  e.maxHp = Math.round((RULES.baseHp + s.hpMax) * (1 + Math.min(0.3, s.hpPct))); e.hp = Math.min(e.hp, e.maxHp);
  e.maxSt = RULES.baseSt + s.stMax; e.st = Math.min(e.st, e.maxSt);
  e.leap.charges = Math.min(e.leap.charges, thanOf(e).charges);
}

// ---------------- match setup ----------------
// humans (match server): [{ key, name, faction, avatar, skin }] — every real player of the room; the page's own
// single-player match passes none and gets one player (state.player). Bots fill the room up to RULES.capacity.
export function newMatch(factionId, avatarId, skin = null, humans = null) {
  const matchSeed = (Math.random() * 1e9) | 0, rng = mulberry32(matchSeed);
  randomizeWorldLoot(matchSeed ^ 0x51eed);
  Object.assign(state, { time: 0, paused: false, entities: [], heroes: [], loot: [], effects: [], particles: [], projectiles: [], pending: [], nativeCasts: [], zones: [], floaters: [], chat: [], feed: [],
    kills: 0, rank: 0, endAt: 0, result: null, place: null, near: null, factionId, events: [], training: false, arena: null, lobby: false, rules: null, winner: null, replica: false });
  state.tierVLeft = RULES.tierVQuota[0] + Math.round(Math.random() * (RULES.tierVQuota[1] - RULES.tierVQuota[0]));
  const people = humans || [{ faction: factionId, avatar: avatarId, skin, name: readGuestName() }];
  const names = botNames(Math.max(0, RULES.capacity - people.length), rng, people.map(h => h.name));
  const bossPlan = planBosses(rng), spots = allocateSpawns(RULES.botCount + 1,rng,bossPlan.map(b=>b.pos),RULES.spawnGap);
  let spawnIndex=0;
  const spawnSpot = () => spots[spawnIndex++] || randomLegal(rng, WORLD / 2, WORLD / 2, WORLD * 0.4);
  const made = people.map(h => {
    const f = OPEN_FACTIONS.find(x => x.id === h.faction) || OPEN_FACTIONS[0];
    const p = makeHero(f, h.name, true, avatarOf(f, h.avatar), h.skin || null);
    Object.assign(p, spawnSpot()); p.key = h.key ?? null; addHero(p);
    return p;
  });
  state.player = humans ? null : made[0];
  const personalities = ['balanced', 'aggressive', 'cautious', 'balanced', 'looter', 'aggressive', 'balanced', 'cautious', 'looter', 'balanced'];
  for (let i = 0; i < names.length; i++) {
    // opponents cycle through the factions open on this map and wear one of their open avatars
    const f = OPEN_FACTIONS[(i + 1) % OPEN_FACTIONS.length];
    const b = makeBot(f, names[i], rng, personalities[i % personalities.length]);
    Object.assign(b, spawnSpot()); b.ai.lx = b.x; b.ai.ly = b.y; b.ai.roamHome = { x: b.x, y: b.y };
    addHero(b);
  }
  // starting kit within reach of every spawn: one usable tier I/II manual and a potion
  // the two lowest tiers the free map has (its pool starts at VLTK level 60)
  const lowTiers = [...new Set(BOOKS.map(b => b.tier))].sort((a, b) => a - b).slice(0, 2);
  const starters = BOOKS.filter(b => b.type === 'active' && lowTiers.includes(b.tier));
  for (const h of state.heroes) {
    const fitting = starters.filter(b => b.weaponAny || b.weapon === held(h).type);
    const a = random(0, TAU), q = nearestLegal(h.x + Math.cos(a) * random(110, 220), h.y + Math.sin(a) * random(110, 220));
    dropBook(q.x, q.y, fitting.length && Math.random() < 0.6 ? pick(fitting) : pick(starters));
    const a2 = a + random(1, 2.5), q2 = nearestLegal(h.x + Math.cos(a2) * 160, h.y + Math.sin(a2) * 160);
    dropPotion(q2.x, q2.y, 'hp', 2);
    const a3 = a2 + random(1, 2), q3 = nearestLegal(h.x + Math.cos(a3) * 150, h.y + Math.sin(a3) * 150);
    dropPotion(q3.x, q3.y, 'mp', 2);
  }
  for (const spot of world.lootSpots) { const pos = legal(spot.x, spot.y) ? spot : nearestLegal(spot.x, spot.y); rollLoot(pos.x, pos.y, spot.rich ? 'rich' : 'normal'); }
  for (const c of world.chestSpots) addLoot({ kind: 'chest', x: c.x, y: c.y, rich: c.rich, dur: c.rich ? 0.5 : 0.4 });
  // bosses with their camps, then loot over the rest of the map including the outer ring (after the fighters are placed)
  spawnPlanned(bossPlan);
  // field monsters (quái) over the map: extra loot for whoever beats them (boss-data.js MONSTERS)
  spawnMonsters(rng); state.monsterKills = 0;
  scatterWildLoot(rng);
  state.zone = { phase: 0, stage: 'wait', t: 0, x: WORLD / 2, y: WORLD / 2, r: ZONE_START_RADIUS, fx: 0, fy: 0, fr: 0, tx: 0, ty: 0, tr: 0 };
  nextZone();
  state.events = EVENT_CHESTS.slice(0, state.tierVLeft).map(ev => ({ ...ev, done: false, announced: false }));
  state.elites = planElites(rng);
  state.phase = 'playing';
  say('Mọi người còn sống đều là đối thủ. Nhặt bí kíp, binh khí và sống sót!', '#bfe3a5');
  say(`Bảo khố bậc V sẽ xuất hiện ${state.tierVLeft} lần trong trận — theo dõi thông báo.`, TIERS[5].color);
  hooks.onSkills?.();
}
function addHero(e) { state.entities.push(e); state.heroes.push(e); }
export function removeHero(e) {
  state.heroes = state.heroes.filter(h => h !== e); state.entities = state.entities.filter(h => h !== e);
  for (const h of state.heroes) { if (h.target === e) h.target = null; if (h.ai?.goal?.target === e) h.ai.goal = null; if (h.lastAttacker === e) h.lastAttacker = null; }
}

// ---------------- online: lobby and late join (match server) ----------------
// docs/ke-hoach/KE_HOACH_PVP_ONLINE_PHONG_CHO_VA_GHEP_TRAN_2026-10-08.md mục 4.4: the waiting room is the training court
// with manuals on the ground, wandering bots and the real players of the room. Blows land and show, nobody loses health,
// no cooldown, free inner force; nothing carries into the match. The arena world must be entered first (world.js).
// Light lobby (user 2026-10-08, "phòng chờ hạn chế chiêu tốn tài nguyên"): 8 bots, each casting at most every 1.5 s
// (real players keep no cooldown), and only manuals whose art is light (setLobbyBooks, chosen by the match server from
// the size of each manual's effect images; none set = every manual).
export const LOBBY_BOOKS = 18, LOBBY_BOTS = 8, LOBBY_BOT_CAST_GAP = 1.5;
let lobbyBooks = null;
export function setLobbyBooks(ids) { const set = new Set(ids); lobbyBooks = BOOKS.filter(b => set.has(b.id)); if (!lobbyBooks.length) lobbyBooks = null; }
export function newServerLobby(arena, bots = LOBBY_BOTS) {
  Object.assign(state, { time: 0, paused: false, entities: [], heroes: [], loot: [], effects: [], particles: [], projectiles: [], pending: [], nativeCasts: [], zones: [], floaters: [], chat: [], feed: [],
    kills: 0, rank: 0, endAt: 0, result: null, winner: null, place: null, near: null, events: [], elites: [], tierVLeft: 0, bossTotal: 0, bossKills: 0, monsterKills: 0,
    training: false, lobby: true, arena, rules: { noDamage: true, noCooldown: true, freeMp: true } });
  const W = arena.walkable, cx = W.x + W.w / 2, cy = W.y + W.h / 2;
  // a finished, huge circle: no zone damage, and the bots' fight-everyone stance of a late phase
  state.zone = { phase: 5, stage: 'done', t: 0, x: cx, y: cy, r: 1e5, fx: cx, fy: cy, fr: 1e5, tx: cx, ty: cy, tr: 1e5 };
  state.player = null;
  const rng = Math.random, names = botNames(bots, rng);
  for (let i = 0; i < bots; i++) {
    const b = makeBot(OPEN_FACTIONS[(i + 1) % OPEN_FACTIONS.length], names[i], rng, 'aggressive');
    Object.assign(b, lobbySpot(arena)); b.ai.lx = b.x; b.ai.ly = b.y; b.ai.roamHome = { x: b.x, y: b.y };
    addHero(b);
  }
  restockLobby();
  state.phase = 'playing';
}
function lobbySpot(arena) {
  const W = arena.walkable;
  for (let i = 0; i < 40; i++) { const x = W.x + 40 + Math.random() * (W.w - 80), y = W.y + 40 + Math.random() * (W.h - 80); if (legal(x, y)) return { x, y }; }
  return nearestLegal(W.x + W.w / 2, W.y + W.h / 2);
}
// keep a handful of manuals on the court (picked ones come back elsewhere)
export function restockLobby() {
  if (!state.lobby) return;
  const books = state.loot.filter(l => l.kind === 'book').length;
  for (let i = books; i < LOBBY_BOOKS; i++) { const q = lobbySpot(state.arena); dropBook(q.x, q.y, pick(lobbyBooks || BOOKS)); }
}
// a real player of the room: { key, name, faction, avatar, skin }; returns the hero
export function addServerHuman(h, at = null) {
  const f = OPEN_FACTIONS.find(x => x.id === h.faction) || OPEN_FACTIONS[0];
  const p = makeHero(f, h.name, true, avatarOf(f, h.avatar), h.skin || null);
  Object.assign(p, at || (state.lobby ? lobbySpot(state.arena) : nearestLegal(WORLD / 2, WORLD / 2))); p.key = h.key ?? null;
  addHero(p);
  return p;
}
// Late join (user 2026-10-08, option (b)): a real player enters a running match in place of a bot, at that bot's
// place if no real player is near, else at the free spot farthest from them; with the starting kit beside them.
export function replaceBotWithHuman(h) {
  const humans = state.heroes.filter(x => x.human && x.alive);
  const bots = state.heroes.filter(x => !x.human && !x.boss && !x.dummy && x.alive && !x.jump);
  if (!bots.length) return null;
  const far = b => humans.length ? Math.min(...humans.map(x => Math.hypot(x.x - b.x, x.y - b.y))) : Infinity;
  const bot = bots.sort((a, b) => far(b) - far(a))[0];
  const at = { x: bot.x, y: bot.y };
  for (const slot of bot.slots) if (isSurvivalBook(slot)) { const q = scatter(at.x, at.y, 60); dropBook(q.x, q.y, slot); }
  removeHero(bot);
  const p = addServerHuman(h, at);
  const lowTiers = [...new Set(BOOKS.map(b => b.tier))].sort((a, b) => a - b).slice(0, 2), starters = BOOKS.filter(b => b.type === 'active' && lowTiers.includes(b.tier));
  const fitting = starters.filter(b => b.weaponAny || b.weapon === held(p).type);
  let q = scatter(p.x, p.y, 120); dropBook(q.x, q.y, fitting.length ? pick(fitting) : pick(starters));
  q = scatter(p.x, p.y, 120); dropPotion(q.x, q.y, 'hp', 2);
  q = scatter(p.x, p.y, 120); dropPotion(q.x, q.y, 'mp', 2);
  p.inv = 2;   // a short grace while the screen comes up
  return { hero: p, replaced: bot };
}
// ---------------- training ground (docs/ke-hoach/PLAN_CHE_DO_LUYEN_TAP_2026-10-05.md) ----------------
// The survival simulation itself: same casts, items, bag and damage. No zone, bots, events or end of match; nothing
// is recorded. Mộc nhân (VLTK1 npcs.txt "Méc nh©n", art enemy179) are real targets with real HP and no AI; when one
// breaks it stands up again at its post, and the player gets up at the start point keeping what he carries.
const DUMMY_FACTION = { id: 'mocnhan', name: 'Mộc nhân', fx: null, element: null, weapon: 'quyen', look: {}, avatars: [] };
export const DUMMY_RESPAWN = 3, PLAYER_RESPAWN = 2;
export function newTraining(factionId, avatarId, skin, arena) {
  Object.assign(state, { time: 0, paused: false, entities: [], heroes: [], loot: [], effects: [], particles: [], projectiles: [], pending: [], nativeCasts: [], zones: [], floaters: [], chat: [], feed: [],
    kills: 0, rank: 0, endAt: 0, result: null, place: null, near: null, factionId, events: [], elites: [], zone: null, tierVLeft: 0, bossTotal: 0, bossKills: 0, monsterKills: 0, training: true, arena, lobby: false, rules: null, replica: false });
  const faction = OPEN_FACTIONS.find(f => f.id === factionId) || OPEN_FACTIONS[0];
  const p = makeHero(faction, readGuestName(), true, avatarOf(faction, avatarId), skin);
  Object.assign(p, arena.start); p.angle = 0;
  state.player = p; addHero(p);
  arena.dummies.forEach((spot, i) => addHero(makeDummy(spot, i)));
  state.phase = 'playing';
  say('Võ trường: lấy bí kíp, binh khí, trang bị ở bảng Luyện tập rồi thử chiêu lên mộc nhân.', '#bfe3a5');
  hooks.onSkills?.();
}
function makeDummy(spot, i) {
  const d = makeHero(DUMMY_FACTION, `Mộc nhân ${i + 1}`, false, { id: 'mocnhan', gender: 'male' });
  d.look = { id: 'mocnhan' }; d.dummy = { home: { x: spot.x, y: spot.y } };
  d.x = spot.x; d.y = spot.y; d.angle = Math.PI / 2;
  return d;
}
// Put every dummy back at its post with full health (training panel).
export function resetDummies() { for (const e of state.heroes) if (e.dummy) standUp(e); }
// Training only: empty the bag of what is not worn or learned (potions stay), to try many manuals in a row.
export function clearTrainingBag() {
  const b = state.training && state.player?.bag;
  if (!b) return 0;
  const gone = b.items.filter(it => it.kind !== 'potion');
  for (const it of gone) removeItem(b, it);
  if (b.hold?.kind !== 'potion') b.hold = null;
  b.rev++; touch(state.player);
  return gone.length;
}
function standUp(e) {
  if (!state.training || !state.heroes.includes(e)) return;
  const at = e.dummy ? e.dummy.home : state.arena.start;
  Object.assign(e, { alive: true, deadT: 0, hp: e.maxHp, mp: e.maxMp, st: e.maxSt, x: at.x, y: at.y, z: 0, anim: null, kb: null, jump: null, hot: [], dots: [], ccLog: [],
    stunT: 0, rootT: 0, freezeT: 0, downT: 0, slowT: 0, hitT: 0, castLock: 0, inv: e.player ? 1 : 0, lastCombat: -99 });
  e.castDmg.clear(); e.castDrain.clear();
  addEffect('ring', e.x, e.y, '#e8d49a', 0.5, 50);
}
// a dummy pushed away walks back to its post; left alone for a while it is whole again
function settleDummy(e, dt) {
  const h = e.dummy.home, dx = h.x - e.x, dy = h.y - e.y, d = Math.hypot(dx, dy), idle = state.time - e.lastCombat;
  if (d > 2 && idle > 1.5 && !e.kb) { const s = Math.min(d, 220 * dt); e.x += dx / d * s; e.y += dy / d * s; }
  if (idle > 5 && e.hp < e.maxHp) e.hp = e.maxHp;
}

// ---------------- loot ----------------
function addLoot(item) { item.t = state.time; item.id = state.nextId++; state.loot.push(item); return item; }
function scatter(x, y, r = 46) { for (let i = 0; i < 6; i++) { const a = random(0, TAU), d = random(12, r); const q = { x: x + Math.cos(a) * d, y: y + Math.sin(a) * d }; if (legal(q.x, q.y)) return q; } return { x, y }; }
export function dropBook(x, y, book) { return isSurvivalBook(book) ? addLoot({ kind: 'book', x, y, book }) : null; }
export function dropWeapon(x, y, weapon) { return addLoot({ kind: 'weapon', x, y, weapon }); }
export function dropGear(x, y, gear) { return addLoot({ kind: 'gear', x, y, gear }); }
export function dropPotion(x, y, type = Math.random() < 0.55 ? 'hp' : 'mp', count = 1) { return addLoot({ kind: 'potion', x, y, potion: type, count }); }
function rollLoot(x, y, table) {
  const r = Math.random(), q = scatter(x, y, 30);
  if (r < 0.4) dropBook(q.x, q.y, randomBook(table));
  else if (r < 0.6) dropWeapon(q.x, q.y, makeWeapon(pick(weaponTypes), weightedTier(GEAR_TABLES[table])));
  else if (r < 0.85) dropGear(q.x, q.y, makeGear(pick(RULES.gearSlots), weightedTier(GEAR_TABLES[table])));
  else dropPotion(q.x, q.y, undefined, Math.random() < 0.5 ? 3 : 2);
  // survival rule: potions are plentiful, a loot spot often carries an extra stack beside its item
  if (Math.random() < RULES.potionExtraChance) { const p = scatter(x, y, 40); dropPotion(p.x, p.y, undefined, 2 + (Math.random() < 0.4 ? 1 : 0)); }
}
function openChest(item) {
  if (item.event) {
    const book = state.tierVLeft > 0 ? pick(BOOKS.filter(b => b.tier === 5)) : randomBook('rich');
    if (book.tier === 5) state.tierVLeft--;
    let q = scatter(item.x, item.y); dropBook(q.x, q.y, book);
    q = scatter(item.x, item.y); dropGear(q.x, q.y, makeGear(pick(RULES.gearSlots), weightedTier(GEAR_TABLES.event)));
    q = scatter(item.x, item.y);
    if (Math.random() < 0.4) dropWeapon(q.x, q.y, makeSpecial(pick(SPECIAL_WEAPONS).id)); else dropWeapon(q.x, q.y, makeWeapon(pick(weaponTypes), 3 + (Math.random() < 0.3 ? 1 : 0)));
    q = scatter(item.x, item.y); dropPotion(q.x, q.y, 'hp', 4);
    q = scatter(item.x, item.y); dropPotion(q.x, q.y, 'mp', 3);
    say(`Bảo khố đã bị mở — ${book.name} xuất thế!`, TIERS[book.tier].color);
  } else {
    const table = item.rich ? 'rich' : 'normal';
    for (let i = 0; i < 2; i++) rollLoot(item.x, item.y, table);
    // every chest holds both potions (rich ones more)
    const n = item.rich ? 3 : 2;
    let q = scatter(item.x, item.y); dropPotion(q.x, q.y, 'hp', n);
    q = scatter(item.x, item.y); dropPotion(q.x, q.y, 'mp', n);
  }
  particles(item.x, item.y, item.event ? '#ffcf6a' : '#e8d49a', 14, 120, 0.7, 20);
  addEffect('ring', item.x, item.y, item.event ? TIERS[5].color : '#e8d49a', 0.6, 60);
}

const tierOf = item => item.kind === 'book' ? item.book.tier : item.kind === 'weapon' ? item.weapon.rarity + 1 : item.kind === 'gear' ? item.gear.rarity + 1 : 0;

// Where an item could go for this hero. Each option: { key, label, replaces }.
export function slotOptions(e, item) {
  const out = [];
  if (ownsLoot(e, item)) return out;
  if (item.kind === 'book') {
    const b = item.book;
    e.slots.forEach((s, i) => { if (slotAllows(i, b)) out.push({ key: i, label: `Ô ${'QERT'[i]}`, replaces: s }); });
  } else if (item.kind === 'weapon') {
    out.push({ key: 0, label: 'Binh khí', replaces: e.weapons[0] });
  }
  return out;
}
export const hasBook = (e, b, ignore = null) => isSurvivalBook(b) && !!(
  e.slots.some(s => sameBook(s, b)) || e.bag?.items.some(it => it !== ignore && it.kind === 'book' && sameBook(it.book, b)) ||
  (e.bag?.hold && e.bag.hold !== ignore && e.bag.hold.kind === 'book' && sameBook(e.bag.hold.book, b))
);
// All ownership locations count, including an item picked up onto the cursor.
// ignore lets the bag equip/move its own item without treating it as a copy.
export function ownsLoot(e, item, ignore = null) {
  if (!item) return false;
  if (item.kind === 'book') return !!hasBook(e, item.book, ignore);
  if (item.kind !== 'weapon' && item.kind !== 'gear') return false;
  const payloads = item.kind === 'weapon' ? e.weapons : Object.values(e.gear);
  return payloads.some(payload => payload && sameLoot(item, { kind: item.kind, [item.kind]: payload })) ||
    !!e.bag?.items.some(it => it !== ignore && sameLoot(item, it)) ||
    !!(e.bag?.hold && e.bag.hold !== ignore && sameLoot(item, e.bag.hold));
}

// Automatic decision used for walking over items and by bots. Returns a slot key, 'consume' or null.
function autoSlot(e, item, forBot) {
  if (ownsLoot(e, item)) return null;
  if (item.kind === 'book' && !isSurvivalBook(item.book)) return null;
  // Hạn chế bot nhặt đồ cam (bậc V): nhường cơ duyên đồ cam cho người chơi
  if (forBot) {
    const isOrange = (item.kind === 'book' && item.book.tier === 5) ||
                     (item.kind === 'weapon' && (item.weapon.rarity >= 4 || item.weapon.special)) ||
                     (item.kind === 'gear' && item.gear.rarity >= 4);
    if (isOrange && (e.ai?.hasOrange || Math.random() < 0.9)) return null;
  }
  if (item.kind === 'potion') return e.potions[item.potion] < RULES.potionMax ? 'consume' : null;
  if (item.kind === 'gear') { if (!RULES.gearSlots.includes(item.gear.slot)) return null; const cur = e.gear[item.gear.slot]; return !cur || item.gear.rarity > cur.rarity ? 'consume' : null; }
  const opts = slotOptions(e, item);
  const empty = opts.find(o => !o.replaces);
  if (empty) return empty.key;
  if (!forBot) return null;
  let worst = null;
  for (const o of opts) { const t = o.replaces.tier ?? (o.replaces.rarity + 1); if (!worst || t < worst.t) worst = { o, t }; }
  if (worst && tierOf(item) > worst.t) return worst.o.key;
  return null;
}
export function wantsLoot(e, item) { return item.kind !== 'chest' && autoSlot(e, item, !e.human) !== null; }
export const needsChoice = (e, item) => !e.bag && !ownsLoot(e, item) && (item.kind === 'weapon' || (item.kind === 'book' && isSurvivalBook(item.book))) && autoSlot(e, item, false) === null;

export function pickup(e, item, slotKey) {
  if (state.replica && e.player && !replaying) return forward('pick', [item?.id, slotKey ?? null]);
  if (!item || !state.loot.includes(item) || !e.alive || item.kind === 'chest') return false;
  if (item.kind === 'book' && !isSurvivalBook(item.book)) return false;
  if (ownsLoot(e, item)) return false;
  if (e.bag && state.autoEquip && inferiorEquipment(e, item)) return false;
  if (e.bag) return pickupBag(e, item);   // the player carries a bag: everything goes there (or straight to a free slot)
  const key = slotKey ?? autoSlot(e, item, !e.human);
  if (key === null || key === undefined) return false;
  if (item.kind === 'potion') {
    e.potions[item.potion] = Math.min(RULES.potionMax, e.potions[item.potion] + item.count);
    if (e.player) floater(e, `+${item.count} ${POTIONS[item.potion].name}`, POTIONS[item.potion].color);
  } else if (item.kind === 'gear') {
    const old = e.gear[item.gear.slot];
    e.gear[item.gear.slot] = item.gear; recalc(e);
    if (old) { const q = scatter(e.x, e.y); dropGear(q.x, q.y, old); }
    if (e.player) { say(`Mặc ${item.gear.name} — ${GEAR[item.gear.slot].text(item.gear)}`, RARITY[item.gear.rarity].color); sfx('equip'); }
  } else if (item.kind === 'weapon') {
    if (key !== 0) return false;
    const old = e.weapons[0];
    e.weapons[0] = item.weapon; e.wi = 0;
    if (old) { const q = scatter(e.x, e.y); dropWeapon(q.x, q.y, old); }
    if (e.player) { sayTo(e, `Cầm ${item.weapon.name} (${WEAPON_TYPES[item.weapon.type].name})`, RARITY[item.weapon.rarity].color); if (e.player) sfx('pickup'); }
  } else if (item.kind === 'book') {
    const b = item.book;
    if (!slotAllows(key, b)) return false;
    const old = e.slots[key]; e.slots[key] = b;
    if (old) { const q = scatter(e.x, e.y); dropBook(q.x, q.y, old); }
    if (e.player) {
      const where = `Ô ${'QERT'[key]}`;
      toast(`Lĩnh hội ${b.name} · ${where}`); say(`Lĩnh hội ${b.name} (bậc ${TIERS[b.tier].n})`, TIERS[b.tier].color);
      addEffect('ring', e.x, e.y, TIERS[b.tier].color, 0.7, 75); if (e.player) sfx('learn');
    }
  }
  state.loot.splice(state.loot.indexOf(item), 1);
  if (e.player) hooks.onSkills?.();
  return true;
}

export function startOpen(e, item) {
  if (state.replica && e.player && !replaying) return forward('open', [item?.id]);
  if (!e.alive || !item || item.kind !== 'chest' || !state.loot.includes(item) || e.jump) return false;
  if (state.heroes.some(h => h !== e && h.opening?.item === item)) { tell(e, 'Có người đang mở hòm này'); return false; }
  const dur = Math.min(item.dur || 0.4, 0.7);
  e.opening = { item, t: 0, dur };
  e.order = null; e.anim = null;
  return true;
}
function updateOpening(e, dt) {
  const o = e.opening;
  if (!state.loot.includes(o.item) || dist(e, o.item) > 70) { e.opening = null; return; }
  o.t += dt;
  if (o.t >= o.dur) {
    e.opening = null;
    state.loot.splice(state.loot.indexOf(o.item), 1);
    openChest(o.item);
    if (e.player) sfx('chest');
  }
}

export function drink(e, type) {
  if (state.replica && e.player && !replaying) return forward('drink', [type]);
  if (!e.alive) return false;
  // say why nothing happened: a silent refusal looks like a broken button
  const why = e.potions[type] <= 0 ? 'Hết bình' : e.potionCD > 0 ? '' : type === 'hp' && e.hp >= e.maxHp ? 'Sinh lực đã đầy' : type === 'mp' && e.mp >= e.maxMp ? 'Nội lực đã đầy' : null;
  if (why !== null) { if (why) tell(e, `${why} (${POTIONS[type].name})`); return false; }
  const P = POTIONS[type], amount = P.amount * (1 + e.stats.potion);
  e.potions[type]--; e.potionCD = 1;
  if (e.bag) { takePotions(e.bag, type, 1); touch(e, true); }
  e.hot.push({ type, remain: amount, rate: amount / P.time });
  addEffect('ring', e.x, e.y, P.color, 0.5, 45);
  if (!e.anim && !e.castLock) e.anim = { name: 'drink', t: 0, dur: 0.5 };
  if (e.player) sfx('drink');
  return true;
}

// ---------------- bag ----------------
// The player's bag (Võ Lâm 1 style): a grid whose items take several cells. Loot walked over goes into it, except a
// manual that finds an empty manual slot: it is learned at once. With state.autoEquip weapons and gear that fill an
// empty slot or beat the worn piece are put on at once too. Automatic upgrades
// drop inferior equipment; manual swaps preserve the old item in the bag.
function startBag(e) {
  e.bag = makeBag();
  for (const t of ['hp', 'mp']) addPotions(e.bag, t, e.potions[t], state.nextId++);
}
const touch = (e, sort = false) => { if (sort && e.bag && !e.bag.hold) packBag(e.bag); if (e.player) { state.invRev++; hooks.onSkills?.(); } else if (e.human) hooks.onBag?.(e); };
const bagFull = e => { if (e.human && state.time - (e.bagToastAt ?? -9) > 1.5) { e.bagToastAt = state.time; tell(e, 'Hành trang đã đầy'); } };
export function setAutoEquip(v) { state.autoEquip = !!v; }
export const itemName = it => it.kind === 'book' ? it.book.name : it.kind === 'weapon' ? it.weapon.name : it.kind === 'gear' ? it.gear.name : POTIONS[it.potion].name;
export const itemColor = it => it.kind === 'book' ? TIERS[it.book.tier].color : it.kind === 'weapon' ? RARITY[it.weapon.rarity].color : it.kind === 'gear' ? RARITY[it.gear.rarity].color : POTIONS[it.potion].color;
const syncPotions = e => { for (const t of ['hp', 'mp']) e.potions[t] = potionCount(e.bag, t); };
function dropFromBag(it, q, ignoreFor = null) {
  delete it.bx; delete it.by; delete it.bw; delete it.bh;
  it.x = q.x; it.y = q.y;
  if (ignoreFor) { it.ignoreFor = ignoreFor; it.ignoreUntil = state.time + 4; }   // dropped by hand: do not pick it straight back up
  addLoot(it);
}
// put a thing taken off (or knocked out of a slot) into the bag, near where it was; a full bag lets it fall at his feet
function stash(e, payload, near) {
  const it = { id: state.nextId++, ...payload };
  if (addPackedItem(e.bag, it, near)) return;
  dropFromBag(it, scatter(e.x, e.y, 50), e);
  tell(e, `Hành trang đầy — ${itemName(it)} rơi xuống đất`);
}
// the slot an item would take by itself, or null: gear that is new or better, an empty weapon hand, an empty manual slot
function autoEquipKey(e, item) {
  if (item.kind === 'gear') { if (!RULES.gearSlots.includes(item.gear.slot)) return null; const cur = e.gear[item.gear.slot]; return !cur || item.gear.rarity > cur.rarity ? item.gear.slot : null; }
  if (item.kind === 'weapon') {
    const same = e.weapons[0]?.type === item.weapon.type ? 0 : -1;
    if (same >= 0) return compareEquipment(item, { kind: 'weapon', weapon: e.weapons[same] }) > 0 ? same : null;
    return !e.weapons[0] ? 0 : null;
  }
  if (item.kind === 'book') { if (hasBook(e, item.book)) return null; const i = [0, 1, 2, 3].find(k => !e.slots[k] && slotAllows(k, item.book)); return i === undefined ? null : i; }
  return null;
}
function equipNow(e, item, key, near, automatic = false) {
  const replaced = payload => {
    if (automatic && compareEquipment(item, payload) > 0) dropFromBag({ id: state.nextId++, ...payload }, scatter(e.x, e.y, 50), e);
    else stash(e, payload, near);
  };
  if (item.kind === 'book') {
    const b = item.book, old = e.slots[key];
    e.slots[key] = b;
    tell(e, `Lĩnh hội ${b.name} · Ô ${'QERT'[key]}`); sayTo(e, `Lĩnh hội ${b.name} (bậc ${TIERS[b.tier].n})`, TIERS[b.tier].color);
    addEffect('ring', e.x, e.y, TIERS[b.tier].color, 0.7, 75); if (e.player) sfx('learn');
    if (old) stash(e, { kind: 'book', book: old }, near);
  } else if (item.kind === 'weapon') {
    if (key !== 0) return false;
    const old = e.weapons[0];
    e.weapons[0] = item.weapon; e.wi = 0;
    sayTo(e, `Cầm ${item.weapon.name} (${WEAPON_TYPES[item.weapon.type].name})`, RARITY[item.weapon.rarity].color); if (e.player) sfx('pickup');
    if (old) replaced({ kind: 'weapon', weapon: old });
  } else if (item.kind === 'gear') {
    const slot = item.gear.slot, old = e.gear[slot];
    e.gear[slot] = item.gear; recalc(e);
    sayTo(e, `Mặc ${item.gear.name} — ${GEAR[slot].text(item.gear)}`, RARITY[item.gear.rarity].color); if (e.player) sfx('equip');
    if (old) replaced({ kind: 'gear', gear: old });
  }
}
function discardInferiorStored(e, item) {
  // Only discard comparable lower grades; keep equal-grade affixes, manuals
  // and other weapon families. A cursor-held item is never taken away.
  for (const old of [...e.bag.items]) if (sameEquipmentFamily(item, old) && compareEquipment(item, old) > 0) {
    removeItem(e.bag, old); dropFromBag(old, scatter(e.x, e.y, 50), e);
  }
}
function pickupBag(e, item) {
  if (item.ignoreFor === e && state.time < item.ignoreUntil) return false;
  if ((item.noRoomUntil || 0) > state.time) return false;
  if (item.kind === 'potion') {
    const room = RULES.potionMax - e.potions[item.potion];
    if (room <= 0) return false;
    const got = addPotions(e.bag, item.potion, Math.min(item.count, room), state.nextId++);
    if (!got) { item.noRoomUntil = state.time + 1; bagFull(e); return false; }
    syncPotions(e);
    floater(e, `+${got} ${POTIONS[item.potion].name}`, POTIONS[item.potion].color);
    sayTo(e, `Nhận được [${POTIONS[item.potion].name}] ×${got}`, POTIONS[item.potion].color);
    if (got < item.count) { item.count -= got; touch(e, true); return true; }
  } else {
    // a manual always fills an empty manual slot first; the slots full, it waits in the bag for the player to swap
    const key = item.kind === 'book' || state.autoEquip ? autoEquipKey(e, item) : null;
    if (key !== null) {
      equipNow(e, item, key, null, state.autoEquip);
      if (state.autoEquip) discardInferiorStored(e, item);
    }
    else {
      const obsolete = state.autoEquip ? e.bag.items.filter(old => sameEquipmentFamily(item, old) && compareEquipment(item, old) > 0) : [];
      // Make space for an upgrade atomically; a full bag must not force the
      // player to keep a lower-grade spare, or discard it if the new one fails.
      const trial = { ...e.bag, items: e.bag.items.filter(old => !obsolete.includes(old)) };
      if (!addPackedItem(trial, item)) { item.noRoomUntil = state.time + 1; bagFull(e); return false; }
      e.bag.items = trial.items; e.bag.rev = trial.rev;
      for (const old of obsolete) dropFromBag(old, scatter(e.x, e.y, 50), e);
      floater(e, `+ ${itemName(item)}`, itemColor(item)); if (e.player) sfx('pickup');
      sayTo(e, `Nhận được [${itemName(item)}]`, itemColor(item));
      if (item.kind === 'book' && !hasBook(e, item.book, item) && !e.bag.bookHinted) { e.bag.bookHinted = true; e.bag.hinted = true; tell(e, 'Ô võ công đã đủ — bí kíp vào hành trang, mở Túi để chọn ô thay'); }
      else if (!e.bag.hinted) { e.bag.hinted = true; tell(e, 'Đồ đã vào hành trang — mở Túi để xem và dùng'); }
    }
  }
  state.loot.splice(state.loot.indexOf(item), 1);
  touch(e, true);
  return true;
}
// Võ Lâm 1 handles items with the mouse: click one to pick it up onto the cursor (it leaves the grid and sits in bag.hold),
// then click a cell to put it down (a single item in the way is swapped onto the cursor), a slot to equip it, or the
// ground to drop it. Right-click (double tap) uses it at once. bagCancel gives a held item back.
function mergeInto(bag, it) {
  const s = it.kind === 'potion' && potionStack(bag, it.potion);
  if (!s) return false;
  s.count = Math.min(RULES.potionMax, s.count + it.count); bag.rev++;
  return true;
}
export function bagHold(e, item) {
  if (state.replica && e.player && !replaying) return forward('bagHold', [item?.id]);
  const bag = e.bag;
  if (!e.alive || !bag || bag.hold || !bag.items.includes(item)) return false;
  item.from = { x: item.bx, y: item.by };
  removeItem(bag, item); bag.hold = item;
  syncPotions(e); touch(e);
  return true;
}
export function bagPut(e, x, y) {
  if (state.replica && e.player && !replaying) return forward('bagPut', [x, y]);
  const bag = e.bag, it = bag?.hold;
  if (!it || x < 0 || y < 0 || x + it.bw > bag.cols || y + it.bh > bag.rows) return false;
  const hit = overlapping(bag, x, y, it.bw, it.bh);
  if (hit.length > 1) return false;
  bag.hold = null;
  if (hit.length === 1) {
    const other = hit[0];
    other.from = { x: other.bx, y: other.by };
    removeItem(bag, other); bag.hold = other;
  }
  if (!mergeInto(bag, it)) placeItem(bag, it, x, y);
  syncPotions(e); touch(e);
  return true;
}
export function bagCancel(e) {
  if (state.replica && e.player && !replaying) return forward('bagCancel', []);
  const bag = e.bag, it = bag?.hold;
  if (!it) return false;
  bag.hold = null;
  if (!mergeInto(bag, it) && !addItem(bag, it, it.from)) dropFromBag(it, scatter(e.x, e.y, 50), e);
  syncPotions(e); touch(e);
  return true;
}
export function bagDropHold(e) {
  if (state.replica && e.player && !replaying) return forward('bagDropHold', []);
  const bag = e.bag, it = bag?.hold;
  if (!it) return false;
  bag.hold = null;
  dropFromBag(it, scatter(e.x, e.y, 50), e);
  syncPotions(e); touch(e);
  return true;
}
// Put a bag item (or the held one) into a slot (book: 0..3 = Q E R T, weapon: 0 / 1, gear: its own slot).
export function bagEquip(e, item, key) {
  if (state.replica && e.player && !replaying) return forward('bagEquip', [item?.id, key]);
  const bag = e.bag, held = bag?.hold === item;
  if (!e.alive || !bag || (!held && !bag.items.includes(item))) return false;
  if (item.kind === 'book') {
    if (hasBook(e, item.book, item)) { tell(e, 'Bạn đã lĩnh hội hoặc có bí kíp này trong hành trang'); return false; }
    if (!slotAllows(key, item.book)) { tell(e, 'Bí kíp bậc V chỉ đặt được ở ô T'); return false; }
  } else if (item.kind === 'weapon') { if (key !== 0) return false; }
  else if (item.kind === 'gear') { if (!RULES.gearSlots.includes(item.gear.slot) || key !== item.gear.slot) return false; }
  else return false;
  const near = held ? item.from : { x: item.bx, y: item.by };
  if (held) bag.hold = null; else removeItem(bag, item);
  equipNow(e, item, key, near);
  touch(e, true);
  return true;
}
// Right-click / double tap on a bag item: a potion is drunk, a manual learned into the first free slot it may take
// (the T slot otherwise), a weapon fills an empty hand or replaces the one in use, gear is worn.
export function bagUse(e, item) {
  if (state.replica && e.player && !replaying) return forward('bagUse', [item?.id]);
  if (!e.bag?.items.includes(item)) return false;
  if (item.kind === 'potion') return drink(e, item.potion);
  if (item.kind === 'book') {
    const k = [0, 1, 2, 3].find(i => !e.slots[i] && slotAllows(i, item.book)) ?? (slotAllows(3, item.book) ? 3 : null);
    return k === null ? false : bagEquip(e, item, k);
  }
  if (item.kind === 'weapon') return bagEquip(e, item, 0);
  if (item.kind === 'gear') return bagEquip(e, item, item.gear.slot);
  return false;
}
// Take a worn piece, a learned manual or a weapon off: into the bag (unequip) or onto the cursor (unequipHold).
// what: 'book' | 'weapon' | 'gear'. Returns the new item, or null when it cannot be done.
function takeOff(e, what, key, toHold) {
  if (state.replica && e.player && !replaying) return forward(toHold ? 'unequipHold' : 'unequip', [what, key]);
  const bag = e.bag;
  if (!e.alive || !bag || (toHold && bag.hold)) return null;
  let payload;
  if (what === 'book') { const b = e.slots[key]; if (!b) return null; payload = { kind: 'book', book: b }; }
  else if (what === 'weapon') {
    const w = e.weapons[key]; if (!w) return null;
    if (key !== 0) return null;
    payload = { kind: 'weapon', weapon: w };
  } else { const g = e.gear[key]; if (!g) return null; payload = { kind: 'gear', gear: g }; }
  const it = { id: state.nextId++, ...payload };
  if (toHold) { const [w, h] = cellsOf(it); Object.assign(it, { bw: w, bh: h, from: null }); bag.hold = it; }
  else if (!addPackedItem(bag, it)) { bagFull(e); return null; }
  if (what === 'book') e.slots[key] = null;
  else if (what === 'weapon') { e.weapons[0] = null; e.wi = 0; }
  else { delete e.gear[key]; recalc(e); }
  touch(e, !toHold);
  return it;
}
export function swapBooks(e, from, to) {
  if (state.replica && e.player && !replaying) return forward('swapBooks', [from, to]);
  if (!e.alive || !Number.isInteger(from) || !Number.isInteger(to) || from < 0 || from > 3 || to < 0 || to > 3 || from === to) return false;
  const a=e.slots[from], b=e.slots[to];
  if (!a || !slotAllows(to,a) || (b && !slotAllows(from,b))) return false;
  e.slots[from]=b; e.slots[to]=a; touch(e); return true;
}
export const unequip = (e, what, key) => takeOff(e, what, key, false);
export const unequipHold = (e, what, key) => takeOff(e, what, key, true);
// Put a bag item on the ground at the fighter's feet. `count` (potions only, fewer than the stack holds) drops that many
// and leaves the rest in the bag; anything else, or no count, drops the whole item.
export function bagDrop(e, item, count = null) {
  if (state.replica && e.player && !replaying) return forward('bagDrop', [item?.id, count]);
  if (!e.bag?.items.includes(item)) return false;
  if (item.kind === 'potion' && Number.isInteger(count) && count >= 1 && count < item.count) {
    item.count -= count; e.bag.rev++;
    dropFromBag({ id: state.nextId++, kind: 'potion', potion: item.potion, count }, scatter(e.x, e.y, 50), e);
    syncPotions(e); touch(e, true);
    return true;
  }
  removeItem(e.bag, item);
  if (item.kind === 'potion') syncPotions(e);
  dropFromBag(item, scatter(e.x, e.y, 50), e);
  touch(e, true);
  return true;
}
export function bagMove(e, item, x, y) {
  if (state.replica && e.player && !replaying) return forward('bagMove', [item?.id, x, y]);
  if (!e.bag || !moveItem(e.bag, item, x, y)) return false;
  state.invRev++;
  return true;
}
// "Sắp xếp": pack the bag again, biggest items first, so scattered gaps join up
export function bagSort(e) {
  if (state.replica && e.player && !replaying) return forward('bagSort', []);
  if (!e.bag) return false;
  if (!packBag(e.bag)) return false;
  touch(e);
  return true;
}
export const bagUsed = e => (e.bag ? usedCells(e.bag) : 0);

export function swapWeapon(e) { return false; } // One equipped weapon; change it through the bag.

// ---------------- effects ----------------
export function addEffect(type, x, y, color, life = 0.5, r = 90, angle = 0, extra) { const fx = { type, x, y, color, life, max: life, r, angle, ...extra }; state.effects.push(fx); return fx; }
// Each book keeps its explicitly verified source art regardless of the caster's faction or gender.
const skillFx = (C, ...args) => {
  const fx = addEffect(...args); fx.skillId = C.sk.id;
  const d = skillVisual(C.sk.id)?.sourceData?.[fx.type === 'precast' ? 'precast' : 'cast'];
  if (d) fx.life = fx.max = Math.max(fx.life, d.frames * d.frameMs / 1000);
  return fx;
};
export function floater(e, text, color = '#fff0c7', big = false) { state.floaters.push({ x: e.x + random(-10, 10), y: e.y - 74 - e.z, text, color, life: 1.1, max: 1.1, big }); }
function particles(x, y, color, n, speed = 120, life = 0.6, z = 20, grav = 260, size = 2.5) {
  for (let i = 0; i < n; i++) { const a = random(0, TAU), s = random(speed * 0.3, speed); state.particles.push({ x, y, z, vx: Math.cos(a) * s, vy: Math.sin(a) * s * 0.6, vz: random(40, 160), life: random(life * 0.6, life), max: life, color, grav, size }); }
}
function later(delay, kind, args) { state.pending.push({ at: state.time + delay, kind, args }); }
function runDeferred(task) {
  const action = DEFERRED_ACTIONS[task.kind];
  if (!action) throw Error('Tác vụ trận không được hỗ trợ: ' + task.kind);
  action(task.args);
}

// ---------------- combat rules ----------------
export function canHarm(a, b) {
  if (!b || !b.alive || !a.alive || a === b) return false;
  if (a.boss && b.boss) return false;
  if (!RULES.pkModes) return true;
  if (a.mode === 'dosat') return true;
  if (a.mode === 'chiendau') return b.mode !== 'luyencong' || b.pk > 0;
  return false;
}
export function setMode(e, mode) { if (!RULES.pkModes) return false; e.mode = mode; if (e.player) say(`Trạng thái: ${PK_MODES[mode].name}`, PK_MODES[mode].color); return true; }

const weaponBonusFor = (e, type) => { const w = held(e); return w.type === type ? w.bonus : 0; };

// Damage = base × (1 + bonus, capped) × (1 − reduction, capped). Multi-hit casts share one base cap per victim.
function damage(att, vic, base, o = {}) {
  if (!vic.alive || att === vic) return 0;
  if (vic.inv > 0 && !o.sure) return 0;
  if (att && !canHarm(att, vic)) return 0;
  if (vic.parry && state.time < vic.parry.until && o.melee && !vic.parry.used && att) {
    vic.parry.used = true;
    addEffect('ring', vic.x, vic.y, '#fff1b8', 0.5, 100); floater(vic, 'PHÁ CHIÊU', '#ffe7a4', true);
    sfx('parry');
    damage(vic, att, vic.parry.counter, { sure: true, skillId: vic.parry.skillId, castId: vic.parry.castId, cap: vic.parry.counter, weaponBonus: weaponBonusFor(vic, 'kiem') });
    return 0;
  }
  if (o.castId && o.cap) {
    const got = vic.castDmg.get(o.castId) || 0;
    if (got >= o.cap) return 0;
    base = Math.min(base, o.cap - got);
    vic.castDmg.set(o.castId, got + base);
    if (vic.castDmg.size > 24) vic.castDmg.delete(vic.castDmg.keys().next().value);
  }
  const bonus = Math.min(RULES.attackBonusCap, (o.weaponBonus || 0) + (att?.stats.atkBonus || 0));
  const armor = vic.stats.armorDR * (1 - (o.armorPierce || 0));
  const dr = Math.min(RULES.totalDRCap, armor + vic.stats.dr);
  const dmg = Math.max(1, Math.round(base * (att?.boss?.dmgMul ?? 1) * (att?.ai && !att.boss ? 0.8 : 1) * (1 + bonus) * (1 - dr)));
  // lobby (rules.noDamage): the blow lands and shows, health stays; a replica takes health from the server only
  const spare = !!state.rules?.noDamage || state.replica;
  const healthLost = spare ? 0 : Math.min(vic.hp, dmg);
  if (!spare) vic.hp = Math.max(0, vic.hp - dmg);
  vic.hitT = 0.2; vic.lastCombat = state.time; vic.regenPool = 0;
  if (vic.opening) vic.opening = null;
  if (att) { att.lastCombat = state.time; att.dealt += dmg; vic.lastAttacker = att; vic.lastHitT = state.time; }
  if (!state.replica) floater(vic, `${dmg}`, vic.player ? '#ff8a78' : dmg >= 150 ? '#ffd65a' : '#fff4dc', dmg >= 150);   // a replica shows the server's number
  hooks.onHit?.(att, vic, dmg, o);
  if (o.nativePresentation && !o.nativeProjectile) o.nativePresentation.collide(vic, o.nativeActor);
  // source life / mana drain (steallife_p, stealmana_p) on what was really dealt
  if (o.drain && att?.alive) {
    if (o.drain.life) att.hp = Math.min(att.maxHp, att.hp + healthLost * o.drain.life);
    if (o.drain.mana) { const took = Math.min(vic.mp, healthLost * o.drain.mana * 0.1); vic.mp -= took; att.mp = Math.min(att.maxMp, att.mp + took); }
  }
  // gear life / mana steal (survival bracer lines), same shape as the source drain above
  if (att?.alive && att.stats && !o.noSteal) gearSteal(att, vic, healthLost);
  const sourceImpact = skillVisual(o.skillId)?.sourceData?.impact;
  addEffect(dmg >= 150 ? 'hitBig' : 'hit', vic.x, vic.y, '#fff4dc', Math.max(0.32, sourceImpact ? sourceImpact.frames * sourceImpact.frameMs / 1000 : 0), 30, att ? Math.atan2(vic.y - att.y, vic.x - att.x) : 0, { skillId: o.skillId, style: o.castId ? att?.faction?.fx : null });
  if (vic.player || att?.player) {
    const native = skillVisual(o.skillId)?.sourceData;
    const event = o.nativePresentation ? null : native ? native.sounds?.impact : vic.player ? 'hurt' : att ? `hit.${held(att).type}` : 'hit';
    if (event) sfx(event);
  }
  if (vic.hp <= 0) kill(vic, att);
  return dmg;
}

// Hard crowd control with diminishing returns: full, half, then immune inside the window.
function applyCC(vic, type, dur) {
  if (!vic.alive) return 0;
  const now = state.time, W = RULES.cc;
  vic.ccLog = vic.ccLog.filter(t => now - t < W.window);
  const n = vic.ccLog.length;
  if (n >= 2 && W.thirdImmune) { floater(vic, 'Miễn khống chế', '#cfe3ff'); return 0; }
  const d = dur * (n === 1 ? W.second : 1) * (1 - vic.stats.ccr);
  vic.ccLog.push(now);
  if (type === 'root') vic.rootT = Math.max(vic.rootT, d);
  else { vic.stunT = Math.max(vic.stunT, d); vic.channel = null; vic.opening = null; }
  if (type === 'freeze') vic.freezeT = Math.max(vic.freezeT, d);
  if (type === 'knockdown') vic.downT = Math.max(vic.downT, d);
  return d;
}
function applySlow(vic, s) { if (!s || !vic.alive) return; vic.slowK = Math.min(RULES.slowCap, Math.max(vic.slowT > 0 ? vic.slowK : 0, s.k)); vic.slowT = Math.max(vic.slowT, s.dur); }
function gearSteal(att, vic, healthLost) {
  const { lifeSteal, manaSteal } = att.stats;
  if (lifeSteal > 0) att.hp = Math.min(att.maxHp, att.hp + healthLost * lifeSteal);
  if (manaSteal > 0) { const took = Math.min(vic.mp, healthLost * manaSteal * 0.1); vic.mp -= took; att.mp = Math.min(att.maxMp, att.mp + took); }
}
// Poison (docs/ke-hoach/TRUNG_DOC_BANG_SAT_HUT_LUC_2026-10-06.md): timing from the source poisondamage_v, total is a survival share
// of the art's damage. The same art from the same attacker refreshes instead of stacking; a victim carries at most 4.
function applyPoison(vic, sk) {
  const P = sk.poison, att = vic.lastAttacker;
  if (!P || !vic.alive || !vic.dots) return;
  const key = `${att?.id ?? 0}:${sk.id}`, per = P.total / P.ticks;
  const old = vic.dots.find(d => d.key === key);
  if (old) { old.left = P.ticks; old.per = per; old.next = P.every; return; }
  if (vic.dots.length >= RULES.poisonMaxDots) vic.dots.shift();
  vic.dots.push({ key, att, per, every: P.every, next: P.every, left: P.ticks, skillId: sk.id });
  floater(vic, 'Trúng độc', '#8fd14f');
}
function updateDots(e, dt) {
  for (const d of e.dots) {
    d.next -= dt;
    while (d.next <= 0 && d.left > 0 && e.alive) { d.next += d.every; d.left--; dotDamage(d, e); }
  }
  e.dots = e.alive ? e.dots.filter(d => d.left > 0) : [];
}
// a poison tick: armour counts, no parry, no drain or steal, no impact sound
function dotDamage(d, vic) {
  if (vic.inv > 0) return;
  const att = d.att?.alive ? d.att : null;
  const dr = Math.min(RULES.totalDRCap, vic.stats.armorDR + vic.stats.dr);
  const dmg = Math.max(1, Math.round(d.per * (1 - dr)));
  if (!state.rules?.noDamage && !state.replica) vic.hp = Math.max(0, vic.hp - dmg);
  vic.lastCombat = state.time; vic.regenPool = 0;
  if (d.att) { d.att.dealt += dmg; vic.lastAttacker = d.att; vic.lastHitT = state.time; }
  if (!state.replica) floater(vic, `${dmg}`, '#8fd14f');
  hooks.onHit?.(d.att, vic, dmg, { skillId: d.skillId, poison: true });
  if (vic.hp <= 0) kill(vic, d.att || att);
}
function knockback(vic, angle, distance) {
  const recent = vic.ccLog.filter(t => state.time - t < RULES.cc.window).length;
  const d = distance * (recent >= 2 ? 0.3 : 1);
  vic.kb = { vx: Math.cos(angle) * d / 0.18, vy: Math.sin(angle) * d / 0.18, t: 0.18 };
}

function kill(vic, killer) {
  vic.alive = false; vic.deadT = 0; vic.anim = null; vic.jump = null; vic.z = 0; vic.aura = null; vic.channel = null; vic.opening = null; vic.dots = [];
  particles(vic.x, vic.y, '#c9b98f', 10, 90, 0.7, 30);
  if (vic.player || nearPlayer(vic.x, vic.y, 600)) sfx('die', vic.player ? 1 : 0.6);
  if (state.training) {
    // nothing drops and nothing is counted: the dummy stands up again, the player gets up at the start
    state.feed.unshift({ text: `${killer ? killer.name : '—'}  ⚔  ${vic.name}`, t: state.time, player: true });
    state.feed = state.feed.slice(0, 4);
    later(vic.player ? PLAYER_RESPAWN : DUMMY_RESPAWN, 'respawn', { vic });
    return;
  }
  hooks.onKill?.(vic, killer);
  if (killer && !vic.boss) { killer.kills++; if (killer.player) state.kills++; }
  // a field monster (quái) beaten by someone else is not news for the kill feed
  if (!vic.boss?.monster || killer?.player) {
    state.feed.unshift({ text: `${killer ? killer.name : 'Độc khí'}  ⚔  ${vic.name}`, t: state.time, player: killer?.player || vic.player });
    state.feed = state.feed.slice(0, 4);
  }
  if (vic.boss) { bossKilled(vic, killer); return; }
  // everything the fallen carried becomes loot (no new copies are created)
  for (const b of vic.slots) if (isSurvivalBook(b)) { const q = scatter(vic.x, vic.y, 60); dropBook(q.x, q.y, b); }
  for (const w of vic.weapons) if (w && (w.rarity > 0 || w.special)) { const q = scatter(vic.x, vic.y, 60); dropWeapon(q.x, q.y, w); }
  for (const slot of Object.keys(vic.gear)) { const g = vic.gear[slot]; if (g && g.rarity > 0) { const q = scatter(vic.x, vic.y, 60); dropGear(q.x, q.y, g); } }
  // the player's whole bag falls where he did (its potion stacks included); bots carry plain counts
  if (vic.bag) { for (const it of [...vic.bag.items, ...(vic.bag.hold ? [vic.bag.hold] : [])]) dropFromBag(it, scatter(vic.x, vic.y, 60)); vic.bag.items = []; vic.bag.hold = null; vic.bag.rev++; }
  else for (const t of ['hp', 'mp']) if (vic.potions[t]) { const q = scatter(vic.x, vic.y, 60); dropPotion(q.x, q.y, t, vic.potions[t]); }
  // a real player's rank is fixed the moment they fall (the match server reports it to that player)
  if (vic.human) { vic.rank = state.heroes.filter(h => h.alive && !h.boss).length + 1; hooks.onHumanOut?.(vic, killer); }
  if (vic.player) { state.rank = vic.rank; state.endAt = state.time + 1.8; state.result = 'lose'; }
  else if (killer?.human) sayTo(killer, `Bạn đã hạ gục ${vic.name}!`, '#ffd28a');
}

const busy = e => !e.alive || e.stunT > 0 || e.jump || e.castLock > 0 || e.channel || e.opening;

// ---------------- basic attack ----------------
export function attack(e, target) {
  if (busy(e) || e.attackCD > 0) return false;
  const w = held(e), T = WEAPON_TYPES[w.type];
  if (target) e.angle = Math.atan2(target.y - e.y, target.x - e.x);
  const cycle = T.cycle * (w.cycleMul || 1);
  e.attackCD = cycle;
  let comboHit = false;
  if (T.combo) { if (state.time - e.combo.t > T.combo.window) e.combo.n = 0; e.combo.n++; e.combo.t = state.time; comboHit = e.combo.n % T.combo.every === 0; }
  const name = w.type === 'quyen' && e.combo.n % 2 === 0 ? 'attack.quyen2' : `attack.${w.type}`;
  e.anim = { name, t: 0, dur: Math.min(cycle * 0.95, T.windup / 0.45), impactAt: T.windup, weapon: w.type };
  e.castLock = T.windup + T.recover * 0.5;
  const angle = e.angle;
  hooks.onAttack?.(e, target, angle);
  later(T.windup, 'attack', { e,T,w,comboHit,angle });
  return true;
}

// ---------------- martial arts ----------------
export function cooldownLeft(e, book) { return Math.max(0, (e.cdById.get(book.id) || 0) - state.time); }
export const skillCost = (e, sk) => Math.round(sk.mp * (1 - e.stats.mpCost));

const SKILL_ANIM_FOR = { quyen: 'skill.palm', amkhi: 'skill.throw', thuong: 'skill.thrust', con: 'skill.thrust', kiem: 'skill.slash', dao: 'skill.slash' };
const GENERIC_SKILL_ANIM = new Set(Object.values(SKILL_ANIM_FOR));
export function cast(e, index, aimX, aimY) {
  if (state.replica && e.player && !replaying) return forward('cast', [index, aimX ?? null, aimY ?? null]);
  const sk = e.slots[index];
  if (!isSurvivalBook(sk)) { tell(e, 'Ô này cần một kỹ năng chủ động đã hoàn thiện'); return false; }
  if (busy(e) || (e.rootT > 0 && ['dash', 'zigzag'].includes(sk.kind))) return false;
  if (cooldownLeft(e, sk) > 0) return false;
  if (state.lobby && !e.human && state.time < (e.lobbyCastAt || 0)) return false;   // light lobby: bots cast sparingly
  // the art of every manual loads in the background after the menu (vfx.js): never cast one whose art is not in memory.
  // The match server has no art (nothing tracked: always ready) and decides for everyone.
  if (!state.server && !skillArtReady(sk.id)) {
    void requestSkillArt(sk.id, !!e.player).catch(() => {});
    tell(e, `Đang tải hiệu ứng ${sk.name}… thử lại sau giây lát`);
    return false;
  }
  const cost = state.rules?.freeMp ? 0 : skillCost(e, sk);   // lobby: free
  if (e.mp < cost) { tell(e, `Chưa đủ nội lực · cần ${cost}`); return false; }
  let target = null;
  if (sk.kind === 'channel') {
    target = (e.target && canHarm(e, e.target) && dist(e, e.target) <= sk.range) ? e.target : nearestHostile(e, sk.range, aimX, aimY);
    if (!target || !lineClear(e.x, e.y, target.x, target.y, 14)) { tell(e, 'Cần một mục tiêu trong tầm và đường nhìn'); return false; }
  }
  e.mp -= cost;
  e.cdById.set(sk.id, state.rules?.noCooldown ? state.time : state.time + sk.cd * (1 - e.stats.cdr));   // lobby: no cooldown
  if (state.lobby && !e.human) e.lobbyCastAt = state.time + LOBBY_BOT_CAST_GAP;
  const C = performCast(e, sk, aimX, aimY, target);
  hooks.onCast?.(e, sk, C, index);
  return true;
}
// A cast the match server reported, drawn by this page (state.replica): same presentation, no check, no cost; the
// damage of its hits comes from the server's own events (engine damage() changes no health in a replica).
export function replicaCast(e, sk, aimX, aimY, angle, target = null, castId = null) {
  if (!sk || !e?.alive) return null;
  e.angle = angle ?? e.angle;
  const C = performCast(e, sk, aimX, aimY, target, castId);
  e.cdById.set(sk.id, state.rules?.noCooldown ? state.time : state.time + sk.cd * (1 - e.stats.cdr));
  return C;
}
function performCast(e, sk, aimX, aimY, target, castId = null) {
  if (aimX !== undefined) e.angle = Math.atan2(aimY - e.y, aimX - e.x);
  if (target) e.angle = Math.atan2(target.y - e.y, target.x - e.x);
  const C = { e, sk, castId: castId ?? state.nextId++, angle: e.angle, ax: aimX ?? e.x + Math.cos(e.angle) * 160, ay: aimY ?? e.y + Math.sin(e.angle) * 160, target };
  // a manual without weapon limit (EqtLimit -2) takes the bonus of whatever is in hand
  C.o = { skillId: sk.id, castId: C.castId, cap: perVictim(sk), weaponBonus: sk.weaponAny ? held(e).bonus : weaponBonusFor(e, sk.weapon),
    armorPierce: sk.armorPierce || 0, drain: sk.drain || null };
  const visual = skillVisual(sk.id);
  C.native = createNativePresentation(visual?.sourceData?.fullLevel, sk, e.look?.gender, nativeHooks(e, sk));
  if (C.native) C.native.owner = e;
  if (C.native) {
    C.o.nativePresentation = C.native; state.nativeCasts.push(C.native);
    C.native.begin({ x: e.x, y: e.y, angle: C.angle });
    later(sk.cast, 'native-launch', { e,sk,C });
  }
  const animDur = sk.kind === 'channel' ? sk.cast + sk.duration : sk.kind === 'aura' ? sk.cast + 0.6 : sk.kind === 'beam' ? sk.cast + sk.duration
    : sk.cast + sk.recover + (sk.hits > 1 ? (sk.interval || 0.13) * (sk.hits - 1) : 0);
  // the caster keeps the weapon in hand; the cast motion follows that weapon (sprites.js motionFor)
  const hand = held(e).type;
  e.anim = { name: GENERIC_SKILL_ANIM.has(sk.anim) ? SKILL_ANIM_FOR[hand] : sk.anim, skillId: sk.id, t: 0, dur: Math.max(0.3, animDur), impactAt: sk.cast, weapon: hand };
  e.castLock = sk.kind === 'aura' ? sk.cast + 0.2 : sk.kind === 'channel' ? sk.cast : animDur;
  const voice = skillSound(sk.id, e.look?.gender);
  if (!C.native && voice && (e.player || nearPlayer(e.x, e.y, 500))) sfx(voice);
  if (e.player) { say(`Thi triển ${sk.name}`, TIERS[sk.tier].color); }
  else if (nearPlayer(e.x, e.y)) floater(e, sk.name, TIERS[sk.tier].color);
  if (sk.selfDmg && !state.replica && !state.rules?.noDamage) { e.hp = Math.max(1, e.hp - sk.selfDmg); floater(e, `−${sk.selfDmg}`, '#ff9a8a'); }
  if (sk.telegraph) telegraph(C);
  if (!C.native && visual?.precast) skillFx(C, 'precast', e.x, e.y, TIERS[sk.tier].color, visual.sourceDuration, sk.radius || sk.range, e.angle, { follow: e });
  const flightSound = visual?.sourceData?.sounds?.flight;
  if (!C.native && flightSound) later(sk.cast, 'flight-sound', { e,flightSound });
  (EXEC[sk.kind] || EXEC.slash)(C);
  return C;
}

function nearestHostile(e, range, ax, ay) {
  let best = null, bd = Infinity;
  for (const b of state.heroes) {
    if (!canHarm(e, b) || b.jump) continue;
    const d = dist(e, b);
    if (d > range) continue;
    const score = ax !== undefined ? Math.hypot(b.x - ax, b.y - ay) : d;
    if (score < bd) { bd = score; best = b; }
  }
  return best;
}
function clampAim(e, x, y, range) { const d = Math.hypot(x - e.x, y - e.y); return d <= range ? { x, y } : { x: e.x + (x - e.x) / d * range, y: e.y + (y - e.y) / d * range }; }
function telegraph({ e, sk, angle, ax, ay }) {
  if (sk.kind === 'ground') { const p = clampAim(e, ax, ay, sk.range); addEffect('danger', p.x, p.y, '#e29767', sk.cast, sk.radius); }
  else if (sk.kind === 'cone' || sk.homing) addEffect('dangerCone', e.x, e.y, '#e29767', sk.cast, sk.range, angle, { arc: sk.arc });
  else addEffect('danger', e.x, e.y, '#e29767', sk.cast, sk.radius || sk.range, 0, { follow: e });
}
const able = e => e.alive && e.stunT <= 0;
function arcHit(e, angle, range, arc, base, o, onHit) {
  let n = 0;
  for (const b of state.heroes) {
    if (b === e || !b.alive || b.jump) continue;
    const d = dist(e, b);
    if (d > range + 12) continue;
    if (Math.abs(angleDiff(Math.atan2(b.y - e.y, b.x - e.x), angle)) > arc && d > 26) continue;
    if (!canHarm(e, b)) continue;
    if (damage(e, b, base, o)) { n++; onHit?.(b); }
  }
  return n;
}
function circleHit(e, x, y, r, base, o, onHit) {
  let n = 0;
  for (const b of state.heroes) if (b !== e && b.alive && !b.jump && Math.hypot(b.x - x, b.y - y) < r + 12 && canHarm(e, b)) if (damage(e, b, base, o)) { n++; onHit?.(b); }
  return n;
}
function lineHit(e, x, y, angle, len, width, base, o, onHit, once) {
  const cx = Math.cos(angle), cy = Math.sin(angle);
  let n = 0;
  for (const b of state.heroes) {
    if (b === e || !b.alive || b.jump || once?.has(b) || !canHarm(e, b)) continue;
    const rx = b.x - x, ry = b.y - y, along = rx * cx + ry * cy, side = Math.abs(-rx * cy + ry * cx);
    if (along < -10 || along > len || side > width / 2 + 10) continue;
    if (damage(e, b, base, o)) { n++; once?.add(b); onHit?.(b); }
  }
  return n;
}
// sk.stun is the source stun_p (chance, frames) of the attack's own scope and always wins; sk.cc, a reviewed survival
// control, runs only for an art without a source stun (TRUNG_DOC_BANG_SAT_HUT_LUC mục 5.2)
const ccOn = (sk, b) => {
  if (sk.stun) { if (b.alive && Math.random() < sk.stun.chance) applyCC(b, 'stun', sk.stun.dur); }
  else if (sk.cc) applyCC(b, sk.cc.type, sk.cc.dur);
  if (sk.slow) applySlow(b, sk.slow);
  // ngũ hành: source poisondamage_v / colddamage_v (tools/vltk1-import/element-effects.cjs)
  if (sk.poison) applyPoison(b, sk);
  if (sk.cold) applySlow(b, sk.cold);
};
// Effects of a branch node act only when its own missile touches the victim; the branch deals no survival damage
// (element-effects.cjs). Poison of a branch refreshes the same dot as the art's main poison (same art, same attacker):
// how the client stacks two poisons of one art is not verified, and stacking would put the victim over the cast budget.
function branchHit(e, sk, actor, target) {
  const fx = sk.branchEffects?.[actor.node?.key];
  if (!fx || !target?.alive || !target.dots || target.inv > 0 || !canHarm(e, target)) return;
  target.lastAttacker = e; target.lastHitT = state.time;
  if (fx.stun && Math.random() < fx.stun.chance) applyCC(target, 'stun', fx.stun.dur);
  if (fx.poison) applyPoison(target, { id: sk.id, poison: fx.poison });
  if (fx.cold) applySlow(target, fx.cold);
}
function moveBuff(e, buff) { if (buff) e.moveBuff = { k: Math.min(RULES.buffMoveCap, buff.k), t: buff.dur }; }
function ghostOf(e, color, life = 0.35) {
  addEffect('ghost', e.x, e.y, color, life, 0, e.angle, { ent: e, skillId: e.anim?.skillId, z: e.z, jumpK: e.jump ? e.jump.t / e.jump.dur : 0, anim: e.jump ? (e.jump.low ? 'jump.low' : 'jump') : e.anim?.name || 'run', weapon: e.anim?.weapon || held(e).type });
}

// ---------------- source zones ----------------
// A standing primary missile of the source (ground / nova manuals with sk.zone) lives for its LifeTime and damages every
// DmgInterval; the per-victim budget of the cast is split over the pulses. With ColVanish=1 it is a mine: it waits for the
// first enemy that touches it, deals the budget to everyone it covers and ends (its vanished branch runs).
function startZone(C, center) {
  const { e, sk } = C, Z = sk.zone;
  const actors = C.native?.primary.filter(a => !a.ended) || [];
  state.zones.push({ C, owner: e, sk, center, actors, age: 0, life: Z.life, every: Z.every, pulses: Z.pulses, mine: Z.mine,
    fired: 0, per: sk.dmg / Z.pulses, next: 0, done: false });
}
function zoneCircles(z) {
  // each source missile of the zone covers the survival radius around itself once it has appeared
  const live = z.actors.filter(a => !a.ended && a.woke);
  return live.length ? live.map(a => ({ x: a.x, y: a.y, actor: a })) : z.actors.length ? [] : [{ x: z.center.x, y: z.center.y, actor: null }];
}
function victimsOf(z, circles) {
  const out = [];
  for (const b of state.heroes) {
    if (b === z.owner || !b.alive || b.jump || !canHarm(z.owner, b)) continue;
    let near = null, nd = Infinity;
    for (const c of circles) { const d = Math.hypot(b.x - c.x, b.y - c.y); if (d < z.sk.radius + 12 && d < nd) { nd = d; near = c; } }
    if (near) out.push({ b, at: near });
  }
  return out;
}
function updateZones(dt) {
  for (const z of state.zones) {
    z.age += dt;
    if (z.age > z.life + 0.05) { z.done = true; continue; }
    const circles = zoneCircles(z);
    if (!circles.length) { if (z.actors.length && z.actors.every(a => a.ended)) z.done = true; continue; }
    if (z.mine) {
      // a mine bursts under the first enemy that steps on it
      for (const c of circles) {
        const hit = victimsOf(z, [c]);
        if (!hit.length) continue;
        for (const { b } of hit) if (damage(z.owner, b, z.sk.dmg, { ...z.C.o, nativeActor: c.actor })) ccOn(z.sk, b);
        if (c.actor) z.C.native.endActor(c.actor);
        else z.done = true;
      }
      if (z.actors.length && z.actors.every(a => a.ended)) z.done = true;
      continue;
    }
    if (z.fired >= z.pulses || z.age < z.next) continue;
    z.fired++; z.next = z.fired * z.every;
    for (const { b, at } of victimsOf(z, circles)) if (damage(z.owner, b, z.per, { ...z.C.o, nativeActor: at.actor })) ccOn(z.sk, b);
  }
  state.zones = state.zones.filter(z => !z.done);
}
// Collide explosion of the source (sk.burst, exporter): a standing range missile at the struck victim that damages every
// enemy within its radius on each DmgInterval pulse; its own collide event chains one further explosion. The art is
// already drawn by the native presentation, so the damage here does not ask it for a second collision.
function sourceBurst(C, B, x, y) {
  const o = { ...C.o, nativePresentation: null };
  const chain = { fired: false };
  for (let i = 0; i < B.pulses; i++) later(i * B.every, 'burst', { C,B,x,y,o,chain });
}

const EXEC = {
  slash(C) {
    const { e, sk } = C, n = sk.hits, per = sk.dmg / n;
    for (let i = 0; i < n; i++) later(sk.cast + i * (sk.interval || 0.13), 'slash', { e,sk,C,i,per });
    if (sk.moveBuff) later(sk.cast + n * 0.13, 'move-buff', { e,sk });
  },
  spin(C) {
    const { e, sk } = C, per = sk.dmg / sk.hits;
    for (let i = 0; i < sk.hits; i++) later(sk.cast + i * (sk.interval || 0.18), 'spin', { e,sk,C,per,i });
  },
  thrust(C) {
    const { e, sk } = C, per = sk.dmg / sk.hits;
    for (let i = 0; i < sk.hits; i++) later(sk.cast + i * (sk.interval || 0.16), 'thrust', { e,sk,C,per });
  },
  dash(C) {
    const { e, sk } = C;
    later(sk.cast, 'dash', { e,sk,C });
  },
  zigzag(C) {
    const { e, sk } = C, seg = sk.dist / sk.hits, per = sk.dmg / sk.hits;
    for (let i = 0; i < sk.hits; i++) later(sk.cast + i * 0.12, 'zigzag', { e,sk,C,i,seg,per });
  },
  projectile(C) {
    const { e, sk } = C;
    later(sk.cast, 'projectile', { e,sk,C });
  },
  beam(C) {
    const { e, sk } = C, per = sk.dmg / sk.hits, gap = sk.duration / sk.hits;
    for (let i = 0; i < sk.hits; i++) later(sk.cast + i * gap, 'beam', { e,sk,C,per });
  },
  ground(C) {
    const { e, sk } = C, p = clampAim(e, C.ax, C.ay, sk.range);
    if (sk.zone) { later(sk.cast, 'ground-zone', { e,C,p }); return; }
    later(sk.cast, 'ground', { e,sk,C,p });
  },
  nova(C) {
    const { e, sk } = C;
    if (sk.zone) { later(sk.cast, 'nova-zone', { e,C }); return; }
    later(sk.cast, 'nova', { e,sk,C });
  },
  cone(C) {
    const { e, sk } = C;
    later(sk.cast, 'cone', { e,sk,C });
  },
  aura(C) {
    const { e, sk } = C;
    later(sk.cast, 'aura', { e,sk,C });
  },
  channel(C) {
    const { e, sk } = C;
    later(sk.cast, 'channel', { e,sk,C });
  },
  parry(C) {
    const { e, sk } = C;
    later(sk.cast, 'parry', { e,sk,C });
  },
};
// Where a sustained skill should aim right now (the player re-aims with the cursor).
let aimProvider = null;
export function setAimProvider(fn) { aimProvider = fn; }
function aimOf(e, C) {
  if (e.input?.aimPoint) { const a = e.input.aimPoint(); if (a) return a; }
  else if (e.player && aimProvider) { const a = aimProvider(); if (a) return a; }
  const t = e.target?.alive ? e.target : e.ai?.goal?.target;
  if (t?.alive) return t;
  return { x: e.x + Math.cos(C.angle) * 200, y: e.y + Math.sin(C.angle) * 200 };
}

function updateChannel(e, dt) {
  const c = e.channel, sk = c.sk, t = c.target;
  c.t += dt; c.tick -= dt;
  e.angle = Math.atan2(t.y - e.y, t.x - e.x);
  if (!t.alive || dist(e, t) > sk.range * 1.25 || !lineClear(e.x, e.y, t.x, t.y, 16)) { e.channel = null; e.anim = null; return; }
  if (c.tick <= 0 && c.n < sk.hits) {
    c.tick = sk.duration / sk.hits; c.n++;
    skillFx({ sk }, 'beam', t.x, t.y, TIERS[sk.tier].color, 0.35, dist(e, t), Math.atan2(e.y - t.y, e.x - t.x));
    if (damage(e, t, sk.dmg / sk.hits, c.o)) {
      const take = Math.min(sk.drainMp / sk.hits, sk.drainMp - c.drained, t.mp); t.mp -= take; c.drained += take; e.mp = Math.min(e.maxMp, e.mp + take);
      const heal = Math.min(sk.heal / sk.hits, sk.heal - c.healed, e.maxHp - e.hp); e.hp += heal; c.healed += heal;
    }
  }
  if (c.t >= sk.duration) { e.channel = null; if (c.healed > 1) floater(e, `+${Math.round(c.healed)}`, '#bfdb9b'); }
}

// ---------------- khinh công ----------------
export function leap(e, tx, ty) {
  if (state.replica && e.player && !replaying) return forward('leap', [tx, ty]);
  if (!e.alive || e.jump || e.stunT > 0 || e.rootT > 0 || e.castLock > 0 || e.channel || e.opening) return false;
  const T = thanOf(e);
  if (e.leap.charges <= 0) { tell(e, 'Khinh công đang hồi'); return false; }
  if (state.time - e.leap.last < T.minGap) return false;
  if (e.st < T.cost) { tell(e, 'Thể lực không đủ để thi triển khinh công'); return false; }
  let dx = tx - e.x, dy = ty - e.y, d = Math.hypot(dx, dy);
  if (d < 1) { dx = Math.cos(e.angle); dy = Math.sin(e.angle); d = 1; }
  const range = Math.min(T.range, Math.max(d, 120)), ux = dx / d, uy = dy / d;
  let land = null;
  for (let r = range; r >= 60; r -= 16) { const x = e.x + ux * r, y = e.y + uy * r; if (legal(x, y)) { land = { x, y }; break; } }
  if (!land) { tell(e, 'Không có chỗ đặt chân'); return false; }
  const L = Math.hypot(land.x - e.x, land.y - e.y);
  e.st -= T.cost; e.leap.charges--; e.leap.last = state.time;
  if (e.leap.rechargeT <= 0) e.leap.rechargeT = T.chargeCd;
  e.angle = Math.atan2(uy, ux);
  e.jump = T.low ? { sx: e.x, sy: e.y, tx: land.x, ty: land.y, t: 0, dur: 0.16 + L / 1500, h: 10, low: true, buff: T.speedBuff }
    : { sx: e.x, sy: e.y, tx: land.x, ty: land.y, t: 0, dur: 0.34 + L / 950, h: 38 + L * 0.2, buff: T.speedBuff };
  e.anim = null;
  if (e.order?.type === 'move') e.order = null;
  particles(e.x, e.y, '#bda97c', 8, 80, 0.45, 2, 200, 3);
  if (e.player || nearPlayer(e.x, e.y, 600)) sfx('leap', e.player ? 1 : 0.4);
  hooks.onLeap?.(e, land);
  return true;
}
function updateJump(e, dt) {
  const j = e.jump;
  j.t += dt;
  const k = clamp(j.t / j.dur, 0, 1);
  e.x = lerp(j.sx, j.tx, k); e.y = lerp(j.sy, j.ty, k);
  e.z = 4 * j.h * k * (1 - k);
  e.ghostT -= dt;
  if (e.ghostT <= 0) { ghostOf(e, e.player ? '#cfe8ff' : '#e6dcc4', 0.32); e.ghostT = j.low ? 0.025 : 0.035; }
  if (k >= 1) {
    e.jump = null; e.z = 0;
    if (j.buff) moveBuff(e, j.buff);
    addEffect('dust', e.x, e.y, '#c2ad82', 0.5, j.low ? 30 : 46);
    particles(e.x, e.y, '#b9a57a', j.low ? 5 : 10, 110, 0.5, 2, 200, 3);
  }
}

// ---------------- movement ----------------
export function moveBy(e, dx, dy) {
  let moved = false;
  if (legal(e.x + dx, e.y)) { e.x += dx; moved = true; }
  if (legal(e.x, e.y + dy)) { e.y += dy; moved = true; }
  return moved;
}
export function speedOf(e) {
  let s = RULES.moveSpeed * (1 + e.stats.move) * (held(e).moveMul || 1) * (e.boss?.speed ?? 1);
  if (e.moveBuff) s *= 1 + e.moveBuff.k;
  if (e.slowT > 0) s *= 1 - e.slowK;
  if (e.st < 5) s *= 0.9;
  return s;
}
function stepToward(e, tx, ty, dt, stopAt = 6) {
  const dx = tx - e.x, dy = ty - e.y, d = Math.hypot(dx, dy);
  if (d <= stopAt) return true;
  if (e.rootT > 0) return false;
  const s = Math.min(d - stopAt + 0.01, speedOf(e) * dt);
  e.angle = Math.atan2(dy, dx);
  if (!moveBy(e, dx / d * s, dy / d * s)) for (const off of [0.6, -0.6, 1.2, -1.2]) { const a = e.angle + off; if (moveBy(e, Math.cos(a) * s, Math.sin(a) * s)) break; }
  e.moving = true; e.walk += s;
  return false;
}
function navigate(e, tx, ty, dt, stopAt = 8) {
  const nav = e.nav || (e.nav = { path: null, i: 0, tx: 0, ty: 0, t: -9 });
  if (Math.hypot(tx - e.x, ty - e.y) < 90) { nav.path = null; return stepToward(e, tx, ty, dt, stopAt); }
  if (!nav.path || state.time - nav.t > 2 || Math.hypot(nav.tx - tx, nav.ty - ty) > 120) {
    nav.t = state.time; nav.tx = tx; nav.ty = ty; nav.i = 0;
    if (lineClear(e.x, e.y, tx, ty, 14)) nav.path = [{ x: tx, y: ty }];
    else { const r = findPath(e.x, e.y, tx, ty); nav.path = r ? r.points : [{ x: tx, y: ty }]; }
  }
  const p = nav.path[nav.i];
  if (!p) return stepToward(e, tx, ty, dt, stopAt);
  const last = nav.i === nav.path.length - 1;
  if (stepToward(e, p.x, p.y, dt, last ? stopAt : 14)) { if (last) return true; nav.i++; }
  return false;
}

// ---------------- zone & treasure events ----------------
function nextZone() {
  const z = state.zone, P = ZONE_PHASES[z.phase];
  z.fx = z.x; z.fy = z.y; z.fr = z.r; z.tr = P.radius;
  for (let i = 0; i < 40; i++) {
    const a = random(0, TAU), d = Math.sqrt(Math.random()) * Math.max(0, z.r - P.radius) * 0.72;
    const x = z.x + Math.cos(a) * d, y = z.y + Math.sin(a) * d;
    if (roomy(x, y, 90)) { z.tx = x; z.ty = y; return; }
  }
  // Retaining the previously validated center preserves containment and never ends inside a wall or river.
  z.tx=z.x;z.ty=z.y;
}
function updateZone(dt) {
  const z = state.zone;
  if (z.stage === 'done') return;
  const P = ZONE_PHASES[z.phase];
  z.t += dt;
  if (z.stage === 'wait') {
    if (P.wait - z.t <= 15 && P.wait - z.t + dt > 15) say('Vòng an toàn sẽ thu hẹp sau 15 giây!', '#f0d79a');
    if (z.t >= P.wait) { z.stage = 'shrink'; z.t = 0; say('Vòng an toàn đang thu hẹp — hãy vào vòng sáng!', '#ffb47a'); toast('Bo đang thu hẹp!'); }
  } else {
    const k = clamp(z.t / P.shrink, 0, 1);
    z.x = lerp(z.fx, z.tx, k); z.y = lerp(z.fy, z.ty, k); z.r = lerp(z.fr, z.tr, k);
    if (k >= 1) {
      z.phase++; z.t = 0;
      if (z.phase >= ZONE_PHASES.length) { z.stage = 'done'; z.phase = ZONE_PHASES.length - 1; return; }
      z.stage = 'wait'; nextZone();
      say(`Vòng an toàn mới đã xác định · thu hẹp sau ${ZONE_PHASES[z.phase].wait} giây.`, '#f0d79a');
    }
  }
}
function updateEvents() {
  const z = state.zone;
  for (const ev of state.events) {
    if (!ev.announced && state.time >= ev.announce) {
      ev.announced = true;
      // inside the upcoming safe area, preferring landmarks and the old bandit lair
      const sites = [...world.pois.map(p => ({ x: p.x, y: p.y + 40, name: p.name })), ...world.camps.filter(c => c.boss).map(c => ({ x: c.x, y: c.y, name: 'Sơn trại bỏ hoang' }))]
        .filter(s => Math.hypot(s.x - z.tx, s.y - z.ty) < Math.max(200, z.tr * 0.75));
      const site = sites.length ? pick(sites) : { ...randomLegal(Math.random, z.tx, z.ty, Math.max(80, z.tr * 0.5)), name: 'vùng hoang dã' };
      const q = nearestLegal(site.x, site.y);
      Object.assign(ev, { x: q.x, y: q.y, name: site.name });
      say(`Võ Lâm Bảo Khố sẽ xuất hiện tại ${site.name} sau ${Math.round(ev.spawn - ev.announce)} giây!`, TIERS[5].color);
      toast(`Bảo khố bậc V sắp xuất hiện tại ${site.name}`);
      tone(330, 0.4, 'triangle', 0.05);
    }
    if (ev.announced && !ev.done && state.time >= ev.spawn) {
      ev.done = true;
      ev.item = addLoot({ kind: 'chest', x: ev.x, y: ev.y, rich: true, event: true, dur: 0.7 });
      say(`Võ Lâm Bảo Khố đã xuất hiện tại ${ev.name}!`, TIERS[5].color);
      addEffect('levelup', ev.x, ev.y, TIERS[5].color, 1.6, 60);
    }
  }
}
export function zoneInfo() { const z = state.zone; if (!z) return null; const P = ZONE_PHASES[z.phase]; return { ...z, dps: P.dps, remaining: z.stage === 'wait' ? P.wait - z.t : z.stage === 'shrink' ? P.shrink - z.t : 0 }; }
const outsideZone = e => !!state.zone && Math.hypot(e.x - state.zone.x, e.y - state.zone.y) > state.zone.r;

// ---------------- update ----------------
export function update(dt, input) {
  if (state.phase !== 'playing' || state.paused) return;
  if (state.replica) { replicaUpdate(dt, input); return; }
  state.time += dt;
  if (state.zone) {   // the training ground has no zone, treasure events or elites
    updateZone(dt);
    updateEvents();
    updateElites();
  }
  // Cast presentation is queued before its combat callback. Run due callbacks
  // chronologically, preserving insertion order for equal times, so projectiles
  // bind to existing native actors and immediate hits have collision effects.
  const due = state.pending.filter(p => state.time >= p.at);
  state.pending = state.pending.filter(p => state.time < p.at);
  due.sort((a, b) => a.at - b.at);
  for (const p of due) runDeferred(p);
  const dps = state.zone ? ZONE_PHASES[state.zone.phase].dps : 0;
  for (const e of state.heroes) {
    if (!e.alive) { e.deadT += dt; continue; }
    for (const k of ['attackCD', 'castLock', 'hitT', 'inv', 'slowT', 'stunT', 'rootT', 'freezeT', 'downT', 'potionCD']) if (e[k] > 0) e[k] = Math.max(0, e[k] - dt);
    if (e.anim) { e.anim.t += dt; if (e.anim.t >= e.anim.dur && !e.channel) e.anim = null; }
    if (e.moveBuff) { e.moveBuff.t -= dt; if (e.moveBuff.t <= 0) e.moveBuff = null; }
    if (e.parry && state.time > e.parry.until) e.parry = null;
    e.moving = false;
    e.mp = Math.min(e.maxMp, e.mp + dt * (RULES.mpRegen + e.stats.mpRegen));
    e.st = Math.min(e.maxSt, e.st + dt * RULES.stRegen);
    const T = thanOf(e);
    if (e.leap.charges < T.charges) { e.leap.rechargeT -= dt; if (e.leap.rechargeT <= 0) { e.leap.charges++; e.leap.rechargeT = e.leap.charges < T.charges ? T.chargeCd : 0; } }
    for (const h of e.hot) { const amt = Math.min(h.remain, h.rate * dt); h.remain -= amt; if (h.type === 'hp') e.hp = Math.min(e.maxHp, e.hp + amt); else e.mp = Math.min(e.maxMp, e.mp + amt); }
    e.hot = e.hot.filter(h => h.remain > 0.01);
    if (e.dots?.length) { updateDots(e, dt); if (!e.alive) continue; }
    const out = !e.boss && outsideZone(e);
    // zone damage ignores armour and life drain
    if (out && !state.replica) { e.hp -= dps * dt; e.lastCombat = state.time; if (e.hp <= 0) { e.hp = 0; kill(e, null); continue; } }
    if (e.kb) { e.kb.t -= dt; moveBy(e, e.kb.vx * dt, e.kb.vy * dt); if (e.kb.t <= 0) e.kb = null; }
    if (e.aura) updateAura(e, dt);
    if (e.jump) { updateJump(e, dt); continue; }
    if (e.stunT > 0) continue;
    if (e.channel) { updateChannel(e, dt); continue; }
    // a real player is driven by its own input on the match server (hero.input), by the page's input otherwise
    const own = e.input || input;
    if (e.opening) { const m = own.move(); if (e.human && m.dx * m.dx + m.dy * m.dy > 0.01) e.opening = null; else updateOpening(e, dt); continue; }
    if (e.human) controlPlayer(e, dt, own);
    else if (e.boss) thinkBoss(e, dt);
    else if (e.dummy) settleDummy(e, dt);
    else thinkBot(e, dt);
  }
  // projectiles: blocked by terrain, deflected by Thái Cực
  for (const p of state.projectiles) {
    advanceProjectile(p, dt, p.target?.alive && !p.target.jump && canHarm(p.owner, p.target) ? p.target : null);
    if (p.terrain && !legal(p.x, p.y)) { p.life = 0; addEffect('ring', p.x, p.y, '#cfc6a8', 0.2, 10); continue; }
    for (const b of state.heroes) {
      if (b === p.owner || !b.alive || b.jump || p.hit.has(b)) continue;
      if (b.aura?.deflect && canHarm(p.owner, b) && Math.hypot(b.x - p.x, b.y - p.y) < b.aura.r) { p.life = 0; addEffect('ring', p.x, p.y, b.aura.color, 0.25, 18); break; }
      if (Math.hypot(b.x - p.x, b.y - p.y) < p.r + 12 && canHarm(p.owner, b)) {
        p.hit.add(b);
        if (p.nativeActor) p.nativePresentation.collide(b, p.nativeActor);
        if (damage(p.owner, b, p.dmg, p.o) && p.castContext) projectileHit(p, b);
        if (p.single) { p.life = 0; break; }
      }
    }
  }
  state.projectiles = state.projectiles.filter(p => p.life > 0);
  updateZones(dt);
  for (const presentation of state.nativeCasts) presentation.tick(dt);
  state.nativeCasts = state.nativeCasts.filter(presentation => !presentation.done);
  const H = state.heroes;
  for (let i = 0; i < H.length; i++) {
    const a = H[i]; if (!a.alive || a.jump) continue;
    for (let j = i + 1; j < H.length; j++) {
      const b = H[j]; if (!b.alive || b.jump) continue;
      const dx = a.x - b.x, dy = a.y - b.y;
      if (Math.abs(dx) > 30 || Math.abs(dy) > 30) continue;
      const d = Math.hypot(dx, dy);
      if (d > 0.01 && d < 26) { const k = (26 - d) / d * 0.5 * Math.min(1, dt * 10); moveBy(a, dx * k, dy * k); moveBy(b, -dx * k, -dy * k); }
    }
  }
  for (const e of H) {
    if (!e.alive || e.jump || e.opening || e.boss || e.dummy) continue;
    for (const item of state.loot) {
      if (item.kind === 'chest' || Math.abs(item.x - e.x) > 44 || Math.abs(item.y - e.y) > 44 || Math.hypot(item.x - e.x, item.y - e.y) > 40) continue;
      if (pickup(e, item)) break;
    }
  }
  // the item or chest the player can act on with F
  const p = state.player;
  state.near = null;
  if (p?.alive) {
    let bd = 56;
    for (const item of state.loot) {
      const d = Math.hypot(item.x - p.x, item.y - p.y);
      if (d < bd && (item.kind === 'chest' || needsChoice(p, item))) { bd = d; state.near = item; }
    }
    const poi = poiAt(p.x, p.y);
    if (poi && poi !== state.place) { state.place = poi; hooks.onPlace?.(poi); }
    else if (!poi && state.place) { state.place = null; hooks.onPlace?.(null); }
  }
  if (state.training || state.rules?.noDamage) return;   // no winner, no defeat (training ground, lobby)
  const alive = H.filter(h => h.alive && !h.boss).length;
  // the match server: over when one fighter stands, or when no real player is left alive (only bots remain);
  // every real player's rank was fixed when they fell, the last one standing (if a real player) is first
  if (state.server) {
    if (!state.result && (alive <= 1 || !H.some(h => h.human && h.alive))) {
      const winner = alive === 1 ? H.find(h => h.alive && !h.boss) : null;
      if (winner?.human) winner.rank = 1;
      state.result = 'over'; state.winner = winner; end(!!winner?.human);
    }
    return;
  }
  if (state.result === 'lose' && state.time >= state.endAt) end(false);
  else if (p.alive && alive === 1 && !state.result) { state.result = 'win'; state.rank = 1; state.endAt = state.time + 1.2; }
  else if (state.result === 'win' && state.time >= state.endAt) end(true);
}
function updateAura(e, dt) {
  const A = e.aura;
  A.t -= dt; A.tick -= dt;
  if (A.tick <= 0 && A.ticks > 0) { A.tick = 0.5; A.ticks--; circleHit(e, e.x, e.y, A.r, A.per, A.o); }
  if (A.t <= 0) e.aura = null;
}
function end(won) { state.phase = 'ended'; hooks.onEnd?.(won); }

// ---------------- player control ----------------
function controlPlayer(e, dt, input) {
  const { dx, dy } = input.move();
  const len = Math.hypot(dx, dy);
  if (len > 0.08) {
    e.order = null;
    if (e.castLock <= 0 && e.rootT <= 0) {
      const s = speedOf(e) * dt * Math.min(1, len);
      e.angle = Math.atan2(dy, dx);
      if (!moveBy(e, dx / len * s, dy / len * s)) for (const off of [0.6, -0.6]) { const a = e.angle + off; if (moveBy(e, Math.cos(a) * s, Math.sin(a) * s)) break; }
      e.moving = true; e.walk += s;
    }
  }
  if (e.target && !e.target.alive) e.target = null;
  const o = e.order;
  if (o && e.castLock <= 0) {
    if (o.type === 'move') { if (navigate(e, o.x, o.y, dt, 6)) e.order = null; }
    else if (o.type === 'attack') {
      const t = o.target;
      if (!t.alive || !canHarm(e, t)) e.order = null;
      else { const range = WEAPON_TYPES[held(e).type].range - 14; if (dist(e, t) > range) navigate(e, t.x, t.y, dt, range * 0.8); else attack(e, t); }
    } else if (o.type === 'pickup') {
      if (!state.loot.includes(o.item)) e.order = null;
      else if (navigate(e, o.item.x, o.item.y, dt, 36)) { pickup(e, o.item); e.order = null; }
    } else if (o.type === 'open') {
      if (!state.loot.includes(o.item)) e.order = null;
      else if (navigate(e, o.item.x, o.item.y + 10, dt, 40)) { startOpen(e, o.item); e.order = null; }
    }
  }
  if (input.attackHeld()) {
    const range = WEAPON_TYPES[held(e).type].range;
    const t = e.target && canHarm(e, e.target) && dist(e, e.target) < range * 1.4 ? e.target : null;
    if (t) attack(e, t);
    else { const a = input.aimAngle(e); if (a !== null) e.angle = a; attack(e, null); }
  }
}
export function autoTarget(e, range = 420) {
  let best = null, bd = range;
  for (const b of state.heroes) { if (b === e || !b.alive || !canHarm(e, b)) continue; const d = dist(e, b); if (d < bd) { bd = d; best = b; } }
  return best;
}

// ---------------- bot AI ----------------
const AGGRO = { aggressive: 520, balanced: 340, cautious: 220, looter: 260 };
function skillReach(sk) {
  switch (sk.kind) {
    case 'dash': case 'zigzag': return sk.dist + 40;
    case 'spin': return sk.range * 0.85;
    case 'nova': return sk.radius * 0.85;
    case 'aura': return sk.radius * 0.8;
    // a source missile may fly less far than the cast range (Thiên Phật Thiên Diệp 384 of 512): aim within what it reaches
    default: return Math.min(sk.range || sk.radius || 120, sk.reach || Infinity) * 0.9;
  }
}
function thinkBot(e, dt) {
  const ai = e.ai;
  ai.think -= dt; ai.skillT -= dt;
  if (ai.think <= 0) { ai.think = random(0.45, 0.8); decideBot(e); }
  ai.stuckT += dt;
  if (ai.stuckT > 0.9) {
    if (ai.wantMove && Math.hypot(e.x - ai.lx, e.y - ai.ly) < 6) {
      const g = ai.goal, tx = g?.target?.x ?? g?.item?.x ?? g?.x, ty = g?.target?.y ?? g?.item?.y ?? g?.y;
      const a = tx !== undefined ? Math.atan2(ty - e.y, tx - e.x) : random(0, TAU);
      if (!leap(e, e.x + Math.cos(a) * 300, e.y + Math.sin(a) * 300)) leap(e, e.x + Math.cos(a + 1.5) * 200, e.y + Math.sin(a + 1.5) * 200);
      if (e.nav) e.nav.t = -9;
    }
    ai.lx = e.x; ai.ly = e.y; ai.stuckT = 0;
  }
  ai.wantMove = false;
  if (e.castLock > 0) return;
  const g = ai.goal;
  if (!g) return;
  if (g.type === 'fight') {
    const t = g.target;
    if (!t.alive || !canHarm(e, t)) { ai.goal = null; return; }
    const d = dist(e, t), wr = WEAPON_TYPES[held(e).type].range - 16;
    if (ai.skillT <= 0) {
      ai.skillT = random(1.8, 3.2);
      for (const i of [3, 0, 1, 2].sort(() => Math.random() - 0.5)) {
        const s = e.slots[i];
        if (!s || cooldownLeft(e, s) > 0 || e.mp < skillCost(e, s) || !skillArtReady(s.id)) continue;
        if (d < skillReach(s) && (s.tier < 5 || t.hp > 280)) {
          const spread = Math.min(95, Math.max(28, d * 0.26));
          const aimA = random(0, TAU);
          const aimX = t.x + Math.cos(aimA) * spread;
          const aimY = t.y + Math.sin(aimA) * spread;
          if (cast(e, i, aimX, aimY)) return;
        }
      }
    }
    if (d > wr) {
      const T = thanOf(e);
      if (d > 200 && d < T.range + 40 && e.st > 50 && Math.random() < dt * 0.35) { leap(e, t.x, t.y); return; }
      ai.wantMove = true;
      navigate(e, t.x, t.y, dt, wr * 0.8);
    } else attack(e, t);
  } else if (g.type === 'flee') {
    ai.wantMove = true;
    if (e.st > 30 && Math.random() < dt * 2) leap(e, g.x, g.y);
    else if (navigate(e, g.x, g.y, dt, 30)) ai.goal = null;
  } else if (g.type === 'loot') {
    if (!state.loot.includes(g.item)) { ai.goal = null; return; }
    ai.wantMove = true;
    if (navigate(e, g.item.x, g.item.y, dt, 4)) { pickup(e, g.item); ai.goal = null; }
  } else if (g.type === 'chest') {
    if (!state.loot.includes(g.item)) { ai.goal = null; return; }
    ai.wantMove = true;
    if (navigate(e, g.item.x, g.item.y + 10, dt, 30)) { startOpen(e, g.item); ai.goal = null; }
  } else {
    ai.wantMove = true;
    if (g.type === 'zone' && e.st > 70 && Math.random() < dt * 0.4) { const a = Math.atan2(g.y - e.y, g.x - e.x); leap(e, e.x + Math.cos(a) * 340, e.y + Math.sin(a) * 340); return; }
    if (navigate(e, g.x, g.y, dt, 40)) ai.goal = null;
  }
}

function decideBot(e) {
  const ai = e.ai, z = state.zone, P = ZONE_PHASES[z.phase];
  if (e.hp < e.maxHp * 0.5 && !e.hot.some(h => h.type === 'hp')) drink(e, 'hp');
  if (e.mp < 25 && !e.hot.some(h => h.type === 'mp')) drink(e, 'mp');
  // hold the weapon that fits most equipped martial arts
  const other = e.weapons[1 - e.wi];
  if (other) { const fit = w => e.slots.filter(s => s?.weapon === w.type).length + w.rarity * 0.3; if (fit(other) > fit(held(e)) + 0.5) swapWeapon(e); }
  const toNext=Math.max(0,Math.hypot(e.x-z.tx,e.y-z.ty)-z.tr+100),travel=toNext/RULES.moveSpeed*1.7+18;
  const safe = z.stage === 'wait' && P.wait - z.t > Math.max(30,travel) ? { x: z.x, y: z.y, r: z.r } : { x: z.tx, y: z.ty, r: z.tr };
  const fromSafe = Math.hypot(e.x - safe.x, e.y - safe.y);
  const needZone = (safe.r > 0 && fromSafe > safe.r - 60) || (safe.r === 0 && fromSafe > 40);
  // early game is for looting: engagement range grows with the zone phase and with what the bot carries
  const armed = e.slots.filter(Boolean).length;
  const PHASE_AGGRO = [0.04, 0.12, 0.25, 0.45, 0.7, 1.0, 1.4, 2.0];
  const phaseK = z.phase === 0 && z.stage === 'wait' ? 0 : PHASE_AGGRO[z.phase];
  // On a 28-minute map there is still room to retreat through phase 5.
  // Only the last two circles force wounded bots to commit to the fight.
  const fresh = e.hp >= e.maxHp * 0.55 || ai.personality === 'aggressive' || z.phase >= 6;
  const aggro = AGGRO[ai.personality] * phaseK * (armed ? 1 : 0.5) * (e.hp < e.maxHp * 0.4 ? 0.6 : 1);
  let target = null, td = Infinity;
  for (const b of state.heroes) {
    if (b === e || !b.alive || !canHarm(e, b)) continue;
    const d = dist(e, b);
    const attacked = e.lastAttacker === b && state.time - (e.lastHitT ?? -99) < 6;   // answers a blow of the last 6 s, not an old grudge kept alive by zone damage or other fights
    if (b.boss && !attacked) continue;   // bosses are only fought on purpose (huntable) or when they strike first
    if (d > (attacked ? 340 : fresh ? aggro : 0)) continue;
    const score = d - (attacked ? 250 : 0) - (b.hp < 350 ? 120 : 0);
    if (score < td) { td = score; target = b; }
  }
  // not a boss hunter, or too weak for the boss that is hitting us: run, and stay away for a while
  if (target?.boss && !canFightBoss(e, target)) {
    const a = Math.atan2(e.y - target.y, e.x - target.x);
    ai.goal = { type: 'flee', x: e.x + Math.cos(a) * 600, y: e.y + Math.sin(a) * 600 }; ai.noBossUntil = state.time + 40;
    return;
  }
  // break off and recover when losing, unless the zone leaves nowhere to go
  if (target && z.phase < 6 && (e.hp < e.maxHp * 0.3 || (e.hp < e.maxHp * 0.5 && e.potions.hp > 0 && !e.hot.length)) && target.hp > e.hp) {
    const a = Math.atan2(e.y - target.y, e.x - target.x) * 0.5 + Math.atan2(safe.y - e.y, safe.x - e.x) * 0.5;
    ai.goal = { type: 'flee', x: e.x + Math.cos(a) * 500, y: e.y + Math.sin(a) * 500 };
    return;
  }
  if (needZone && (!target || dist(e, target) > 240)) {
    if (!ai.goal || ai.goal.type !== 'zone' || Math.hypot(ai.goal.x-safe.x,ai.goal.y-safe.y)>Math.max(40,safe.r-60)) {
      // Approach the nearest edge, not a random point near the center. Large-map rotations stay distributed.
      const a=Math.atan2(e.y-safe.y,e.x-safe.x),r=Math.max(0,safe.r-240);let q=null;
      for(let i=0;i<40;i++){const t=a+random(-.16,.16),p=nearestLegal(safe.x+Math.cos(t)*r+random(-80,80),safe.y+Math.sin(t)*r+random(-80,80));if(roomy(p.x,p.y)&&Math.hypot(p.x-safe.x,p.y-safe.y)<=Math.max(40,safe.r-70)){q=p;break;}}
      q??=nearestLegal(safe.x,safe.y);ai.goal = { type: 'zone', x: q.x, y: q.y };
    }
    return;
  }
  if (target) { if (ai.goal?.target !== target) ai.goal = { type: 'fight', target }; return; }
  // early in the match the well-armed go and test their arts on a boss
  const prey = huntable(e);
  if (prey) { if (ai.goal?.target !== prey) ai.goal = { type: 'fight', target: prey }; return; }
  // announced treasure (Võ Lâm Bảo Khố - đồ cam): nhường người chơi, bot chỉ chú ý nếu tình cờ ở gần (< 280px) và xác suất thấp (15%)
  const ev = state.events.find(v => v.item && state.loot.includes(v.item));
  if (ev && Math.hypot(ev.x - e.x, ev.y - e.y) < 280 && Math.random() < 0.15 && !state.heroes.some(h => h !== e && h.opening?.item === ev.item)) { ai.goal = { type: 'chest', item: ev.item }; return; }
  let best = null, bd = ai.personality === 'looter' ? 600 : 420;
  for (const item of state.loot) {
    const d = Math.abs(item.x - e.x) + Math.abs(item.y - e.y);
    if (d >= bd || guarded(e, item)) continue;
    if (item.kind === 'chest' ? !state.heroes.some(h => h !== e && h.opening?.item === item) : wantsLoot(e, item)) { bd = d; best = item; }
  }
  if (best) { ai.goal = { type: best.kind === 'chest' ? 'chest' : 'loot', item: best }; return; }
  if (!ai.goal || ai.goal.type === 'fight' || state.time > ai.wanderT) {
    ai.wanderT = state.time + random(8, 16);
    const home=ai.roamHome||e,early=z.phase===0,anchor=early&&Math.hypot(home.x-safe.x,home.y-safe.y)<safe.r-400?home:e;
    const pois = world.pois.filter(p => Math.hypot(p.x - safe.x, p.y - safe.y) < safe.r-200&&Math.hypot(p.x-anchor.x,p.y-anchor.y)<1800)
      .sort((a,b)=>Math.hypot(a.x-anchor.x,a.y-anchor.y)-Math.hypot(b.x-anchor.x,b.y-anchor.y)).slice(0,3);
    const destination=pois.length&&Math.random()<(early?.15:.35)?pick(pois):anchor;
    // Pick a district once for both coordinates; choosing x and y from separate districts made phantom destinations.
    const q = randomLegal(Math.random,destination.x,destination.y,destination===anchor?(early?1000:700):Math.max(300,destination.r*.7));
    ai.goal = { type: 'wander', x: q.x, y: q.y };
  }
}

// Which animation to show this frame, and which weapon is visible.
export function frameAction(e) {
  if (!e.alive) return 'die';
  if (e.jump) return e.jump.low ? 'jump.low' : 'jump';
  if (e.downT > 0) return 'knockdown';
  if (e.stunT > 0) return 'stun';
  if (e.opening) return 'open';
  if (e.anim) return e.anim.name;
  if (e.hitT > 0.1) return 'hit';
  if (e.moving) return 'run';
  return state.time - e.lastCombat < 4 ? 'combat' : 'idle';
}
export const frameWeapon = e => e.anim?.weapon || held(e).type;

// ---------------- replica: this page draws a match the server runs (net-client.js) ----------------
// The server's fighters are built once from its roster (same faction, avatar, costume, boss definition, same ids), its
// loot from its wire items; positions, health and the zone come from its snapshots. Casts, blows and leaps it reports
// are re-played here with the same presentation; the hits of a replica take no health (damage() above).
export function replicaReset({ lobby = false, time = 0, capacity = RULES.capacity } = {}) {
  Object.assign(state, { time, paused: false, entities: [], heroes: [], loot: [], effects: [], particles: [], projectiles: [], pending: [], nativeCasts: [], zones: [], floaters: [], chat: [], feed: [],
    kills: 0, rank: 0, endAt: 0, result: null, winner: null, place: null, near: null, events: [], elites: [], tierVLeft: 0, bossTotal: 0, bossKills: 0, monsterKills: 0,
    training: false, lobby, arena: null, rules: lobby ? { noDamage: true, noCooldown: true, freeMp: true } : null, replica: true, server: false, zone: null, player: null, phase: 'playing' });
  RULES.capacity = capacity; RULES.botCount = capacity - 1;
}
export function replicaHero(r, mine = false) {
  let e;
  if (r.bd) {
    const def = [...BOSSES, ...MONSTERS].find(d => d.id === r.bd);
    if (!def) return null;
    e = spawnOne(def, { x: 0, y: 0 }, false, { wave: r.bw || 0 });
  } else {
    const f = OPEN_FACTIONS.find(x => x.id === r.f) || factionById(r.f) || OPEN_FACTIONS[0];
    e = makeHero(f, r.n, !!mine, avatarOf(f, r.av), r.sk || null);
    addHero(e);
  }
  e.id = r.id; e.name = r.n; e.ai = null; e.x = r.x ?? e.x; e.y = r.y ?? e.y;
  e.human = !!mine; e.player = !!mine;
  if (mine) state.player = e;
  return e;
}
export const replicaRemoveHero = e => removeHero(e);
// a wire item (net-wire.js itemWire) as the engine's loot payload
export function itemPayload(w) {
  if (w.k === 'book') return { book: bookById[w.b] || null };
  if (w.k === 'weapon') return { weapon: w.w?.s ? makeSpecial(w.w.s) : makeWeapon(w.w.t, w.w.r) };
  if (w.k === 'gear') { const g = makeGear(w.g.s, w.g.r); if (w.g.l != null) g.line = w.g.l; else delete g.line; return { gear: g }; }
  if (w.k === 'potion') return { potion: w.p, count: w.n };
  if (w.k === 'chest') return { rich: !!w.rich, event: !!w.ev, dur: w.dur };
  return {};
}
export function replicaLoot(w) {
  const it = { kind: w.k, x: w.x, y: w.y, id: w.id, t: state.time, ...itemPayload(w) };
  if (w.k === 'book' && !it.book) return null;
  state.loot.push(it);
  return it;
}
export function replicaAttack(e, angle) {
  if (!e?.alive) return false;
  e.attackCD = 0; e.castLock = 0; e.angle = angle ?? e.angle;
  replaying = true; try { return attack(e, null); } finally { replaying = false; }
}
export function replicaLeap(e, tx, ty) {
  if (!e?.alive) return false;
  e.jump = null; e.castLock = 0; e.stunT = 0; e.rootT = 0; e.st = Math.max(e.st, e.maxSt); e.leap.charges = Math.max(1, e.leap.charges); e.leap.last = -9;
  replaying = true; try { return leap(e, tx, ty); } finally { replaying = false; }
}
// one frame of a replica: the presentation of what the server reported, the player's own predicted moves; no AI,
// damage, loot rolls, zone or end of match of its own
function replicaUpdate(dt, input) {
  state.time += dt;
  hooks.onInput?.(input);
  const due = state.pending.filter(p => state.time >= p.at);
  state.pending = state.pending.filter(p => state.time < p.at);
  due.sort((a, b) => a.at - b.at);
  for (const p of due) runDeferred(p);
  const me = state.player;
  for (const e of state.heroes) {
    if (!e.alive) { e.deadT += dt; continue; }
    for (const k of ['attackCD', 'castLock', 'hitT', 'inv', 'stunT', 'downT', 'potionCD']) if (e[k] > 0) e[k] = Math.max(0, e[k] - dt);
    if (e.anim) { e.anim.t += dt; if (e.anim.t >= e.anim.dur && !e.channel) e.anim = null; }
    if (e.jump) { if (e.jump.net) e.jump.t += dt; else updateJump(e, dt); continue; }
    if (e === me && e.stunT <= 0 && !e.opening) predictPlayer(e, dt, input);
  }
  for (const p of state.projectiles) {
    advanceProjectile(p, dt, p.target?.alive && !p.target.jump ? p.target : null);
    if (p.terrain && !legal(p.x, p.y)) { p.life = 0; continue; }
    for (const b of state.heroes) {
      if (b === p.owner || !b.alive || b.jump || p.hit.has(b)) continue;
      if (Math.hypot(b.x - p.x, b.y - p.y) < p.r + 12 && canHarm(p.owner, b)) {
        p.hit.add(b);
        if (p.nativeActor) p.nativePresentation.collide(b, p.nativeActor);
        if (p.single) { p.life = 0; break; }
      }
    }
  }
  state.projectiles = state.projectiles.filter(p => p.life > 0);
  updateZones(dt);
  for (const presentation of state.nativeCasts) presentation.tick(dt);
  state.nativeCasts = state.nativeCasts.filter(presentation => !presentation.done);
  state.near = null;
  if (me?.alive) {
    let bd = 56;
    for (const item of state.loot) { const d = Math.hypot(item.x - me.x, item.y - me.y); if (d < bd && (item.kind === 'chest' || needsChoice(me, item))) { bd = d; state.near = item; } }
    const poi = poiAt(me.x, me.y);
    if (poi && poi !== state.place) { state.place = poi; hooks.onPlace?.(poi); }
    else if (!poi && state.place) { state.place = null; hooks.onPlace?.(null); }
  }
}
// the player's own moves at once (the server confirms them): stick / keys, and a click order walked locally while it is
// sent up; a target picked on screen is sent up too
function predictPlayer(e, dt, input) {
  const { dx, dy } = input.move(), len = Math.hypot(dx, dy);
  if (len > 0.08) {
    if (e.order) e.order = null;
    if (e.castLock <= 0) {
      const s = speedOf(e) * dt * Math.min(1, len);
      e.angle = Math.atan2(dy, dx);
      if (!moveBy(e, dx / len * s, dy / len * s)) for (const off of [0.6, -0.6]) { const a = e.angle + off; if (moveBy(e, Math.cos(a) * s, Math.sin(a) * s)) break; }
      e.moving = true; e.walk += s;
    }
  } else e.moving = false;
  const o = e.order;
  if (o !== e.orderSent) {
    e.orderSent = o;
    hooks.onAction?.('order', !o ? ['stop'] : o.type === 'move' ? ['move', Math.round(o.x), Math.round(o.y)] : o.type === 'attack' ? ['attack', o.target?.id] : [o.type, o.item?.id]);
  }
  if (e.target !== e.targetSent) { e.targetSent = e.target; hooks.onAction?.('target', [e.target?.id ?? null]); }
  if (o?.type === 'move' && e.castLock <= 0) { if (navigate(e, o.x, o.y, dt, 6)) e.order = null; }
}

// boss.js works on the same simulation without importing this file
bossApi({ state, makeHero, addHero, addLoot, rollLoot, randomBook, gearTable: t => GEAR_TABLES[t], scatter, dropBook, dropWeapon, dropGear, dropPotion, makeGear, makeWeapon, makeSpecial, addEffect, say, announce, toast, canHarm, navigate, attack, cast, cooldownLeft, skillReach, busy, held, artReady: s => skillArtReady(s.id) });

// Durable actions contain data only; callback implementations never come from save files.
const DEFERRED_ACTIONS = {
  'respawn': ({ vic }) => { standUp(vic); },
  'attack': ({ e,T,w,comboHit,angle }) => {
    if (!e.alive || e.stunT > 0) return;
    const base = T.dmg * (w.dmgMul || 1) * (comboHit ? 1 + T.combo.bonus : 1);
    const o = { melee: !T.projectile, weaponBonus: w.bonus, armorPierce: w.armorPierce || 0 };
    if (T.projectile) {
      state.projectiles.push({ type: 'dart', x: e.x, y: e.y, angle, speed: T.projectile.speed, life: T.range / T.projectile.speed, owner: e, style: e.faction?.fx, hit: new Set(), dmg: base, r: T.projectile.width, color: '#dfe6ea', o, single: true, terrain: true });
      if (e.player) sfx('dart');
      return;
    }
    addEffect(w.type === 'thuong' ? 'thrust' : 'slash', e.x, e.y, '#f8e9c0', 0.22, T.range * 0.85, angle, { basic: true });
    let hitAny = false;
    for (const b of state.heroes) {
      if (b === e || !b.alive || b.jump) continue;
      const d = dist(e, b);
      if (d > T.range + 12) continue;
      if (Math.abs(angleDiff(Math.atan2(b.y - e.y, b.x - e.x), angle)) > T.arc + (w.arcAdd || 0) && d > 26) continue;
      if (!canHarm(e, b)) continue;
      const close = T.closePenalty && d < T.closeRange ? T.closePenalty : 1;
      if (damage(e, b, base * close, o)) { hitAny = true; if (w.knockback) knockback(b, angle, w.knockback); }
    }
    if (e.player) sfx(`swing.${w.type}`);
  },
  'native-launch': ({ e,sk,C }) => {
      if (!able(e)) { C.native.cancel(); return; }
      const point = sk.kind === 'ground' ? clampAim(e, C.ax, C.ay, sk.range) : e;
      C.native.launch({ x: point.x, y: point.y, angle: C.angle });
    },
  'flight-sound': ({ e,flightSound }) => { if (able(e) && nearPlayer(e.x, e.y, 500)) sfx(flightSound); },
  'burst': ({ C,B,x,y,o,chain }) => {
    const n = circleHit(C.e, x, y, B.radius, B.dmg, o);
    if (n && B.chain && !chain.fired) { chain.fired = true; sourceBurst(C, B.chain, x, y); }
  },
  'slash': ({ e,sk,C,i,per }) => {
      if (!able(e)) return;
      if (sk.step) moveBy(e, Math.cos(C.angle) * sk.step, Math.sin(C.angle) * sk.step);
      skillFx(C, 'slash', e.x, e.y, TIERS[sk.tier].color, 0.24, sk.range * 0.9, C.angle + (i % 2 ? 0.25 : -0.25));
      arcHit(e, C.angle, sk.range, sk.arc, per, { ...C.o, melee: true }, b => ccOn(sk, b));
    },
  'move-buff': ({ e,sk }) => { moveBuff(e, sk.moveBuff); },
  'spin': ({ e,sk,C,per,i }) => {
      if (!able(e)) return;
      skillFx(C, 'spin', e.x, e.y, TIERS[sk.tier].color, 0.3, sk.range);
      circleHit(e, e.x, e.y, sk.range, per, { ...C.o, melee: true }, b => { if (sk.cc && (!sk.cc.onHit || sk.cc.onHit === i + 1)) applyCC(b, sk.cc.type, sk.cc.dur); });
    },
  'thrust': ({ e,sk,C,per }) => {
      if (!able(e)) return;
      skillFx(C, 'thrust', e.x, e.y, TIERS[sk.tier].color, 0.22, sk.range, C.angle);
      lineHit(e, e.x, e.y, C.angle, sk.range, sk.width, per, { ...C.o, melee: true }, b => ccOn(sk, b));
    },
  'dash': ({ e,sk,C }) => {
      if (!able(e)) return;
      if (sk.invuln) e.inv = Math.max(e.inv, sk.invuln);
      const startX = e.x, startY = e.y;
      const hit = new Set(), steps = Math.ceil(sk.dist / 14);
      for (let s = 0; s < steps; s++) {
        if (s % 2 === 0) ghostOf(e, TIERS[sk.tier].color, 0.4);
        if (!moveBy(e, Math.cos(C.angle) * 14, Math.sin(C.angle) * 14)) break;
        if (sk.dashDmg) for (const b of state.heroes) if (b !== e && b.alive && !b.jump && !hit.has(b) && dist(e, b) < (sk.width || 60) / 2 + 22 && canHarm(e, b)) { hit.add(b); damage(e, b, sk.dashDmg, { ...C.o, melee: true }); ccOn(sk, b); }
      }
      particles(e.x, e.y, TIERS[sk.tier].color, 8, 140, 0.4);
      const F = sk.follow;
      if (!F) skillFx(C, 'thrust', startX, startY, TIERS[sk.tier].color, 0.3, Math.hypot(e.x - startX, e.y - startY), C.angle);
      if (F) for (let i = 0; i < F.hits; i++) later(0.05 + i * F.interval, 'dash-follow', { e,sk,C,F,i });
    },
  'dash-follow': ({ e,sk,C,F,i }) => {
        if (!able(e)) return;
        skillFx(C, 'slash', e.x, e.y, TIERS[sk.tier].color, 0.22, F.range * 0.9, C.angle + (i % 2 ? 0.3 : -0.3));
        arcHit(e, C.angle, F.range, F.arc, (sk.dmg - (sk.dashDmg || 0)) / F.hits, { ...C.o, melee: true }, b => ccOn(sk, b));
      },
  'zigzag': ({ e,sk,C,i,seg,per }) => {
      if (!able(e)) return;
      const a = C.angle + (i === sk.hits - 1 ? 0 : i % 2 ? 0.55 : -0.55);
      const sx = e.x, sy = e.y, once = new Set();
      for (let s = 0; s < seg / 14; s++) { if (s % 2 === 0) ghostOf(e, TIERS[sk.tier].color, 0.35); if (!moveBy(e, Math.cos(a) * 14, Math.sin(a) * 14)) break; }
      const L = Math.hypot(e.x - sx, e.y - sy);
      skillFx(C, 'thrust', sx, sy, TIERS[sk.tier].color, 0.25, L, a);
      lineHit(e, sx, sy, a, L + 20, sk.width, per, { ...C.o, melee: true }, null, once);
    },
  'projectile': ({ e,sk,C }) => {
      if (!able(e)) return;
      const o = { ...C.o, nativeProjectile: !!C.native, cap: sk.capPerVictim || sk.dmg }, each = (sk.burst ? sk.burst.main : sk.dmg) / sk.count;
      const target = sk.homing ? state.heroes.filter(b => canHarm(e, b) && !b.jump && dist(e, b) <= sk.range && Math.abs(angleDiff(Math.atan2(b.y - e.y, b.x - e.x), C.angle)) <= sk.arc && lineClear(e.x, e.y, b.x, b.y, 8)).sort((a, b) => Math.hypot(a.x - C.ax, a.y - C.ay) - Math.hypot(b.x - C.ax, b.y - C.ay))[0] : null;
      const homingDelay = (sk.homingDelay || 0) * (target ? Math.min(1, dist(e, target) / 140) : 1);
      // positions, directions and launch delays come from the source formation laid out by the presentation
      const slots = C.native?.primary.length === sk.count ? C.native.primary : null;
      for (let i = 0; i < sk.count; i++) {
        const slot = slots?.[i];
        slot?.wait > 0 ? later(slot.wait, 'projectile-fire', { e,sk,C,slot,i,o,each,target,homingDelay }) : runDeferred({ kind: 'projectile-fire', args: { e,sk,C,slot,i,o,each,target,homingDelay } });

      }
    },
  'projectile-fire': ({ e,sk,C,slot,i,o,each,target,homingDelay }) => {
          if (!able(e)) return;
          const a = slot ? slot.angle : C.angle + (sk.radial ? i * TAU / sk.count : (i - (sk.count - 1) / 2) * (sk.spread || 0));
          const origin = slot ? { x: slot.x, y: slot.y } : projectileOrigin(e.x, e.y, C.angle, i, sk.count, sk.launchSpacing);
          state.projectiles.push({ type: sk.weapon === 'quyen' ? 'finger' : 'needle', ...origin, angle: a, speed: sk.speed, life: (sk.reach || sk.range) / sk.speed, owner: e, skillId: sk.id, hit: new Set(), dmg: Math.floor(each) + (i < sk.dmg % sk.count ? 1 : 0), r: sk.width,
            color: TIERS[sk.tier].color, o, single: !sk.pierce, terrain: true, homing: sk.homing, homingDelay, target, castContext: C });
          C.native?.bind(state.projectiles[state.projectiles.length - 1], i);
        },
  'beam': ({ e,sk,C,per }) => {
      if (!able(e)) return;
      const aim = aimOf(e, C), a = Math.atan2(aim.y - e.y, aim.x - e.x);
      e.angle = a;
      // each ray stops at the first obstacle and only hits the first opponent on its line
      let len = sk.range;
      for (let s = 12; s <= sk.range; s += 12) if (!legal(e.x + Math.cos(a) * s, e.y + Math.sin(a) * s)) { len = s; break; }
      let first = null, fd = Infinity;
      for (const b of state.heroes) {
        if (b === e || !b.alive || b.jump || !canHarm(e, b)) continue;
        const rx = b.x - e.x, ry = b.y - e.y, along = rx * Math.cos(a) + ry * Math.sin(a), side = Math.abs(-rx * Math.sin(a) + ry * Math.cos(a));
        if (along > 0 && along < len && side < sk.width / 2 + 10 && along < fd) { fd = along; first = b; }
      }
      skillFx(C, 'beamLine', e.x, e.y, TIERS[sk.tier].color, 0.16, first ? fd : len, a);
      if (first) damage(e, first, per, C.o);
    },
  'ground-zone': ({ e,C,p }) => { if (able(e)) startZone(C, p); },
  'ground': ({ e,sk,C,p }) => {
      if (!able(e)) return;
      skillFx(C, 'quake', p.x, p.y, TIERS[sk.tier].color, 0.7, sk.radius);
      if (!skillVisual(sk.id)?.sourceData) particles(p.x, p.y, '#a88b62', 16, 180, 0.6, 5);
      circleHit(e, p.x, p.y, sk.radius, sk.dmg, C.o, b => ccOn(sk, b));
      if (!skillVisual(sk.id)?.sourceData && nearPlayer(p.x, p.y, 500)) sfx('heavy');
    },
  'nova-zone': ({ e,C }) => { if (able(e)) startZone(C, { x: e.x, y: e.y }); },
  'nova': ({ e,sk,C }) => {
      if (!able(e)) return;
      if (!skillVisual(sk.id)?.precastOnly) skillFx(C, sk.cc?.type === 'freeze' ? 'frost' : 'roar', e.x, e.y, TIERS[sk.tier].color, 0.8, sk.radius);
      circleHit(e, e.x, e.y, sk.radius, sk.dmg, C.o, b => ccOn(sk, b));
      if (!skillVisual(sk.id)?.sourceData && nearPlayer(e.x, e.y, 500)) sfx(sk.cc?.type === 'freeze' ? 'frost' : 'heavy');
    },
  'cone': ({ e,sk,C }) => {
      if (!able(e)) return;
      skillFx(C, 'dragon', e.x, e.y, TIERS[sk.tier].color, 0.6, sk.range, C.angle);
      arcHit(e, C.angle, sk.range, sk.arc, sk.dmg, C.o, b => { if (sk.knockback) knockback(b, Math.atan2(b.y - e.y, b.x - e.x), sk.knockback); });
      if (!skillVisual(sk.id)?.sourceData && nearPlayer(e.x, e.y, 500)) sfx('heavy');
    },
  'aura': ({ e,sk,C }) => { if (able(e)) e.aura = { skillId: sk.id, t: sk.duration, max: sk.duration, tick: 0, ticks: sk.hits, per: sk.dmg / sk.hits, r: sk.radius, color: TIERS[sk.tier].color, o: C.o, deflect: sk.deflect }; },
  'channel': ({ e,sk,C }) => { if (able(e) && C.target.alive) e.channel = { sk, target: C.target, t: 0, tick: 0, n: 0, o: C.o, drained: 0, healed: 0 }; },
  'parry': ({ e,sk,C }) => {
      if (!able(e)) return;
      skillFx(C, 'swords9', e.x, e.y, TIERS[sk.tier].color, 0.5, sk.range, C.angle);
      arcHit(e, C.angle, sk.range, sk.arc, sk.dmg, { ...C.o, melee: true });
      e.parry = { skillId: sk.id, until: state.time + sk.window, counter: sk.counter, used: false, castId: state.nextId++ };
    },
};

function projectileHit(p, b) {
  const C = p.castContext, sk = C.sk;
  ccOn(sk, b);
  if (sk.burst) sourceBurst(C, sk.burst, b.x, b.y);
  if (sk.knockback && (b.castDmg.get(C.castId) || 0) >= p.o.cap) knockback(b, C.angle, sk.knockback);
}

function nativeHooks(e, sk) { return {
    sprite: nativeSprite,
    sound: (event, point) => { if (e.player || nearPlayer(point.x, point.y, 500)) sfx(event, 1, e.player ? 2 : 0); },
    targets: actor => state.heroes.filter(b => canHarm(e, b) && !b.jump && Math.hypot(b.x - actor.x, b.y - actor.y) < (sk.range || sk.radius || 350)),
    // a branch missile (start / fly / collide / vanished node) touched a victim: that node's own source effects
    hit: (actor, target) => branchHit(e, sk, actor, target),
    blocked: (x, y) => !legal(x, y),
  }; }
export function reconnectPresentation(presentation) {
  if (!presentation.owner || !presentation.book) throw Error('Hiệu ứng lưu thiếu chủ thể');
  presentation.hooks = nativeHooks(presentation.owner, presentation.book);
}

export function validateDeferredActions(tasks) {
  for (const task of tasks) {
    if (!task || !Object.hasOwn(DEFERRED_ACTIONS, task.kind) || !Number.isFinite(task.at) || !task.args || typeof task.args !== 'object') throw Error('Tác vụ lưu không hợp lệ');
  }
}
