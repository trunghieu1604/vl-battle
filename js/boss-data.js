// Wandering bosses of the survival map. Pure data: tiers, roster and drop tables (rules live in boss.js).
// Every figure here is a first hypothesis; qa/boss-check.cjs measures what a boss really does and takes.
// Skill kits use survival manual ids (data.js); a boss casts them with the same executors, effects and sounds as a
// player, but never drops its kit. Tier I and II bosses are meant to be beaten by anyone who found a manual or two;
// the tier III "elite" is the exception: three progressively stronger encounters per match, announced on screen, and its only drop is a tier V manual.

// size: how much larger than a player the NPC art is drawn. hp / armor / dmgMul scale with the tier.
// aggro: sight radius; leash: how far from its camp it follows before turning back and healing.
// drops: books / gear / weapons use the weight tables below (index 0..4 = tier I..V), potions are counts.
export const BOSS_TIERS = {
  1: { n: 'I', title: 'Thủ lĩnh', color: '#8fd18a', hp: 1400, armor: 0, dmgMul: 0.3, speed: 0.85, ccr: 0, size: 1.25, aggro: 460, leash: 900, skillGap: [1.6, 2.6], windup: .65, recovery: .65, count: 12,
    drops: { books: { n: 1, w: [0, 0, 25, 40, 35] }, gear: { n: 1, w: [20, 50, 25, 5, 0] }, weapon: { n: 1, w: [10, 50, 30, 10, 0] }, potions: { hp: 4, mp: 3 } } },
  2: { n: 'II', title: 'Đầu lĩnh', color: '#7cb8ff', hp: 2800, armor: 0.05, dmgMul: 0.35, speed: 0.9, ccr: 0, size: 1.4, aggro: 540, leash: 1000, skillGap: [1.3, 2.2], windup: .8, recovery: .85, count: 8,
    drops: { books: { n: 2, w: [0, 0, 10, 40, 50] }, gear: { n: 1, w: [0, 20, 55, 25, 0] }, weapon: { n: 1, w: [0, 20, 55, 25, 0] }, potions: { hp: 4, mp: 3 } } },
  // elite: not part of the opening roster (count 0); ELITE below schedules it. Drops one tier V manual and nothing else.
  3: { n: 'III', title: 'Ma đầu', color: '#f2a04e', hp: 6000, armor: 0.1, dmgMul: 0.45, speed: 0.86, ccr: 0.3, size: 1.6, aggro: 620, leash: 1100, skillGap: [2, 3], windup: 1, recovery: 1.2, count: 0, elite: true,
    drops: { tierV: 1 } },
};

// Field monsters (quái): animals and bandits of the VLTK npc tables (npcs.txt; sprites in spr\npcres\animal and \enemy),
// many weak ones over the map that carry extra loot. They bite with a basic attack only (no martial art), are not counted
// as bosses (no map marker, no kill tally) and do not keep the zone or the survivor count. drops: chance of each item;
// a manual uses the normal table of data.js (25% cam). Every figure is a first hypothesis measured by qa/monster-check.cjs.
export const MONSTER_TIER = { n: '', title: 'Quái', color: '#d8c79a', hp: 450, armor: 0, dmgMul: 0.25, speed: 0.85, ccr: 0, size: 1, aggro: 280, leash: 520,
  skillGap: [99, 99], windup: .5, recovery: .6, count: 0, monster: true,
  // Quái drop equipment, never a manual (user 2026-10-07, as the install's npcdroprate.ini: Genre 0 equipment only).
  // The rates are a survival setting that events will change (docs/quy-uoc/DO_ROI_QUAI.md): set book > 0 to bring
  // manuals back for an event; the roll in boss.js monsterDrops still reads it.
  drops: { book: 0, gear: 0.2, weapon: 0.15, potion: 0.6 }, runRef: 6 };
// packs spread over the map ring band r (fractions of the map radius), size members each, at least gap apart
export const MONSTER_PACKS = { packs: 22, size: [2, 3], r: [0.12, 0.95], gap: 650 };
// Per-row source (settings\npcs.txt, slistcache 38ebcb17; `npc` = its line): Series 0–4 = kim/mộc/thủy/hỏa/thổ gives the
// element; RunSpeed scales the survival speed (MONSTER_TIER.speed is the common RunSpeed 6). Strength stays equal: the
// level scripts (npclevelscript\animal.lua for beasts, standard.lua for bandits) compute life / attack / defence from the
// level only, the same for every wolf, tiger or bear; the spawn level per map is server data, not in the install
// (docs/bao-cao/QUAI_VA_DO_ROI_THEO_BO_CAI_2026-10-07.md).
export const MONSTERS = [
  { id: 'soixam', name: 'Sói Xám', sprite: { set: 'ani009' }, element: 'kim', runSpeed: 6, npc: 7 },
  { id: 'soido', name: 'Sói Đỏ', sprite: { set: 'ani010' }, element: 'moc', runSpeed: 6, npc: 8 },
  { id: 'thanhlang', name: 'Thanh Lang', sprite: { set: 'ani011' }, element: 'thuy', runSpeed: 6, npc: 9 },
  { id: 'heorung', name: 'Heo Rừng', sprite: { set: 'ani018' }, element: 'moc', runSpeed: 6, npc: 13 },
  { id: 'gaunau', name: 'Gấu Nâu', sprite: { set: 'ani025' }, element: 'kim', runSpeed: 5, npc: 17 },
  { id: 'hoanamho', name: 'Hoa Nam Hổ', sprite: { set: 'ani002' }, element: 'moc', runSpeed: 7, npc: 3 },
  { id: 'docxa', name: 'Rắn Xanh', sprite: { set: 'ani038' }, element: 'moc', runSpeed: 4, npc: 23 },
  { id: 'hacdiephau', name: 'Hắc Diệp Hầu', sprite: { set: 'ani055' }, element: 'thuy', runSpeed: 6, npc: 39 },
  { id: 'trauring', name: 'Trâu Rừng', sprite: { set: 'ani029' }, element: 'thuy', runSpeed: 6, npc: 19 },
  { id: 'sontac', name: 'Sơn Tặc', sprite: { set: 'enemy146' }, element: 'kim', runSpeed: 6, npc: 167 },
  { id: 'lauia', name: 'Lâu La', sprite: { set: 'enemy144' }, element: 'hoa', runSpeed: 6, npc: 165 },
].map(m => ({ weapon: 'quyen', gender: 'nam', kit: [], tier: 0, ...m }));

// Elite bosses: announced `announce` seconds into the match (banner, chat, map marker), they appear at `spawn` inside the
// upcoming safe circle at one of the districts in `sites` (or in the open). All three waves currently occur.
export const ELITE = { events: [
  { announce: 750, spawn: 780, chance: 1, wave: 1, hpScale: 1 },
  { announce: 1050, spawn: 1080, chance: 1, wave: 2, hpScale: 1.3 },
  { announce: 1350, spawn: 1380, chance: 1, wave: 3, hpScale: 1.5 },
], sites: ['stone', 'camp', 'temple', 'court','frontier','citadel','battlefield','quarry'] };

// fit: fine adjustment of the drawn size (NPC art varies in height) so every boss of a tier stands about as tall.
// sprite.set: VLTK1 NPC sprite set exported by tools/vltk1-import/export-characters.cjs (sheet "<id>.<weapon>").
// home: a district id of the map (world.pois) when the boss belongs to one, else the boss is placed in the wild.
export const BOSSES = [
  { id: 'hacphong', tier: 1, name: 'Hắc Phong Đạo Tặc', weapon: 'quyen', element: 'hoa', gender: 'nam', fit: 1.05, sprite: { set: 'enemy109' }, kit: ['vltk-hanglong'] },
  { id: 'thietthu', tier: 1, name: 'Thiết Thủ Hồ Tam', weapon: 'quyen', element: 'kim', gender: 'nam', fit: 1.1, sprite: { set: 'enemy085' }, kit: ['toanchan'] },
  { id: 'truongkhach', tier: 1, name: 'Bạch Y Trượng Khách', weapon: 'con', element: 'thuy', gender: 'nam', fit: 1.05, sprite: { set: 'enemy076' }, kit: ['vltk-bachhong'] },
  { id: 'huyetdao', tier: 2, name: 'Huyết Đao Lão Tổ', weapon: 'dao', element: 'hoa', gender: 'nam', sprite: { set: 'boss015' }, kit: ['huyetdao', 'cuuamnoi'], home: 'temple' },
  { id: 'hophap', tier: 2, name: 'Liệt Hỏa Hộ Pháp', weapon: 'dao', element: 'hoa', gender: 'nam', sprite: { set: 'boss011' }, kit: ['huyetdao', 'hanbangmien'], home: 'bamboo' },
  { id: 'thuongtuong', tier: 2, name: 'Thiết Giáp Thương Tướng', weapon: 'thuong', element: 'kim', gender: 'nam', fit: 1.05, sprite: { set: 'boss024' }, kit: ['batquai', 'hogia'], home: 'frontier' },
  { id: 'songkiem', tier: 2, name: 'Thanh Y Song Kiếm', weapon: 'kiem', element: 'thuy', gender: 'nu', fit: 1.05, sprite: { set: 'boss019' }, kit: ['toanchan', 'nhatduong'] },
  { id: 'phidao', tier: 2, name: 'Lục Y Phi Đao Nữ', weapon: 'amkhi', element: 'moc', gender: 'nu', fit: 1.3, sprite: { set: 'boss027' }, kit: ['nhatduong'] },
  { id: 'makim', tier: 3, name: 'Kim Giáp Ma Vương', weapon: 'con', element: 'kim', gender: 'nam', sprite: { set: 'boss103' }, kit: ['vltk-thienha', 'sutu'] },
  { id: 'hoavu', tier: 3, name: 'Hỏa Vũ Ma Nữ', weapon: 'dao', element: 'hoa', gender: 'nu', sprite: { set: 'boss014' }, kit: ['cuuamnoi', 'hanbangmien'] },
];

// Loot piles lying around a boss camp: [normal piles, rich piles, chests]. The boss guards them.
export const CAMP_LOOT = { 1: [2, 0, 0], 2: [2, 1, 0], 3: [2, 2, 1] };

// Loot spread over the whole map, outer ring included: one cell every WILD.cell units, filled with probability p
// (inner cells already hold the district loot of the map layout), a share of chests on the outer ring.
export const WILD = { cell: 450, maxNear: 3, pInner: 1, pOuter: 1, outerFrom: 0.55, richOuter: 0.12, chests: 24, chestRich: 0.3 };
