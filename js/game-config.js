// Live game settings (docs/ke-hoach/PHUONG_AN_MAN_ADMIN_2026-10-08.md mục 5). The server sends only the values that
// differ from the defaults written in the code, already merged for the current moment: { id, v: { 'monster.drops.book': 0.1 } }.
// Before every survival match the game puts every setting back to its code default and lays those values over it, so a
// match never changes half-way and an ended override disappears. Without the server API (static Sites release), with the
// training ground or when the request fails, the code defaults stay. A value of the wrong shape is ignored.
import { RULES, ZONE_PHASES, EVENT_CHESTS, POTIONS, BASE_MOVE, BOOK_TABLES, GEAR_TABLES } from './data.js';
import { MONSTER_TIER, MONSTER_PACKS, BOSS_TIERS, ELITE } from './boss-data.js';
// operation settings: read by the menu and the result screen
export const ops = { announcement: '', maintenance: false, maintenanceMessage: '', donateQr: true, online: true };

const slots = [];
const add = (key, obj, prop) => slots.push({ key, obj, prop });
add('match.capacity', RULES, 'capacity');
add('match.tierVQuota', RULES, 'tierVQuota');
ZONE_PHASES.forEach((z, i) => ['wait', 'shrink', 'radius', 'dps'].forEach(p => add(`zone.${i + 1}.${p}`, z, p)));
EVENT_CHESTS.forEach((c, i) => add(`chests.${i + 1}.spawn`, c, 'spawn'));
for (const p of ['baseHp', 'baseMp', 'baseSt', 'mpRegen', 'stRegen', 'moveSpeed', 'potionMax', 'potionExtraChance',
  'attackBonusCap', 'armorDRCap', 'totalDRCap', 'cdrCap', 'slowCap', 'lifeStealCap', 'manaStealCap']) add(`rules.${p}`, RULES, p);
for (const t of ['hp', 'mp']) for (const p of ['amount', 'time']) add(`potion.${t}.${p}`, POTIONS[t], p);
for (const p of ['range', 'cost', 'chargeCd']) add(`move.${p}`, BASE_MOVE, p);
for (const p of ['hp', 'dmgMul', 'speed', 'aggro', 'leash']) add(`monster.${p}`, MONSTER_TIER, p);
for (const p of ['book', 'gear', 'weapon', 'potion']) add(`monster.drops.${p}`, MONSTER_TIER.drops, p);
add('monster.packs', MONSTER_PACKS, 'packs'); add('monster.packSize', MONSTER_PACKS, 'size');
for (const t of [1, 2]) {
  for (const p of ['hp', 'armor', 'dmgMul', 'count']) add(`boss.${t}.${p}`, BOSS_TIERS[t], p);
  add(`boss.${t}.books`, BOSS_TIERS[t].drops.books, 'n');
}
for (const p of ['hp', 'armor', 'dmgMul']) add(`boss.3.${p}`, BOSS_TIERS[3], p);
ELITE.events.forEach((e, i) => ['announce', 'spawn', 'chance', 'hpScale'].forEach(p => add(`elite.${i + 1}.${p}`, e, p)));
for (const t of ['normal', 'rich']) add(`loot.books.${t}`, BOOK_TABLES, t);
for (const t of ['normal', 'rich', 'event']) add(`loot.gear.${t}`, GEAR_TABLES, t);
for (const p of Object.keys(ops)) add(`ops.${p}`, ops, p);

const copy = v => Array.isArray(v) ? [...v] : v;
const defaults = new Map(slots.map(s => [s.key, copy(s.obj[s.prop])]));
const byKey = new Map(slots.map(s => [s.key, s]));
export const configKeys = () => slots.map(s => s.key);
export const configDefaults = () => Object.fromEntries([...defaults].map(([k, v]) => [k, copy(v)]));

// same shape as the default: a finite number, a boolean, a short string, or an array of finite numbers of the same length
function fits(value, def) {
  if (Array.isArray(def)) return Array.isArray(value) && value.length === def.length && value.every(Number.isFinite);
  if (typeof def === 'number') return Number.isFinite(value);
  if (typeof def === 'string') return typeof value === 'string' && value.length <= 300;
  return typeof value === typeof def;
}
export const configState = { id: null, v: {}, at: 0, etag: null, applied: null, missing: false };

// back to the code defaults, then the given overrides; returns the keys that were ignored
export function applyConfig(v = configState.v) {
  for (const s of slots) s.obj[s.prop] = copy(defaults.get(s.key));
  const ignored = [];
  for (const [key, value] of Object.entries(v || {})) {
    const s = byKey.get(key);
    if (!s || !fits(value, defaults.get(key))) { ignored.push(key); continue; }
    s.obj[s.prop] = copy(value);
  }
  RULES.botCount = RULES.capacity - 1;
  for (const c of EVENT_CHESTS) c.announce = c.spawn - 30;   // the banner leads its chest by 30 s, as in the code
  configState.applied = v === configState.v ? configState.id : null;
  return ignored;
}

// ask the server at most every maxAge ms; a 304 keeps the current values; any failure keeps what was there
export async function refreshConfig() {
  return configState;
}
