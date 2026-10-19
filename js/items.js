// VLTK1 loot art from data/vltk-items.json (tools/vltk1-import/export-items.cjs): dropped medicine, chests and the
// HUD medicine icons, chosen through the client's medicine and object tables. Loads on its own in the background;
// until it arrives render.js and the HUD keep their painted shapes.
let ITEMS = null;
const IMG = {};
const load = url => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = url; });
export const itemsReady = fetch('data/vltk-items.json', { cache: 'no-cache' })
  .then(r => (r.ok ? r.json() : null))
  .then(async m => {
    if (!m) return false;
    const files = new Set([...Object.values(m.loot), ...Object.values(m.icons)].map(v => v.image));
    await Promise.all([...files].map(async f => { IMG[f] = await load(`data/${f}`); }));
    ITEMS = m;
    return true;
  })
  .catch(() => false);

// Draws loot `key` (hp, mp, chest, chestRich, chestEvent) with its anchor at the origin; false when not loaded.
export function drawLootSprite(ctx, key, time, scale = 1) {
  const v = ITEMS?.loot[key], img = v && IMG[v.image];
  if (!img) return false;
  const o = (Math.floor(time * 1000 / v.frameMs) % v.frames) * 6, r = v.rects, s = (v.scale || 1) * scale;
  if (r[o + 2]) ctx.drawImage(img, r[o], r[o + 1], r[o + 2], r[o + 3], -r[o + 4] * s, -r[o + 5] * s, r[o + 2] * s, r[o + 3] * s);
  return true;
}
// URL of the inventory icon for a medicine type, or null before loading.
// Bag icon of a weapon / piece of gear: key 'weapon.kiem' / 'gear.armor', quality 0..4 (data/vltk-items.json "equip").
export const equipIcon = (key, rarity) => (ITEMS?.equip?.[key]?.[rarity] ? `data/${ITEMS.equip[key][rarity].image}` : null);
export const potionIcon = type => (ITEMS?.icons[type] && IMG[ITEMS.icons[type].image] ? `data/${ITEMS.icons[type].image}` : null);

// VLTK skill icons for the martial-art books and the action buttons (data/vltk-icons.json,
// tools/vltk1-import/export-ui-icons.cjs): each book shows the icon of its VLTK counterpart.
let ICONS = null;
export const iconsReady = fetch('data/vltk-icons.json', { cache: 'no-cache' })
  .then(r => (r.ok ? r.json() : null))
  .then(async m => {
    if (!m) return false;
    await Promise.all(Object.values(m.books).map(async v => { IMG[v.image] = await load(`data/${v.image}`); }));
    ICONS = m;
    return true;
  })
  .catch(() => false);
export const bookIcon = id => (ICONS?.books[id] ? `data/${ICONS.books[id].image}` : null);
export const bookIconImage = id => (ICONS?.books[id] ? IMG[ICONS.books[id].image] || null : null);
// Where a book's icon comes from (SkillId, SPR path/id, pak, learn level, match kind). The VLTK learn level only
// describes the source skill; it is not the book's level or power in this game.
export const bookIconInfo = id => ICONS?.books[id] || null;
const MATCH = { exact: 'trùng tên', name: 'cùng tên gốc', borrowed: 'mượn biểu tượng' };
export function iconSourceText(id) {
  const i = ICONS?.books[id];
  if (!i) return '';
  return `${MATCH[i.match] || i.match}: VLTK «${i.skill}» (SkillId ${i.skillId}, học ở cấp ${i.reqLevel})${i.match === 'borrowed' ? ` · ${i.why}` : ''}`;
}
export const uiIcon = name => (ICONS?.ui[name] ? `data/${ICONS.ui[name].image}` : null);
