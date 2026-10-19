// Training panel (docs/ke-hoach/PLAN_CHE_DO_LUYEN_TAP_2026-10-05.md): hands out REAL items through the survival loot flow. Every
// button drops a manual, weapon, gear piece or potion at the player's feet (engine dropBook / dropWeapon / dropGear /
// dropPotion); walking pickup, the bag and slotAllows then work exactly as in a match. No stat is ever written to
// the player here. The manual list is the survival pool itself (BOOKS filtered by isSurvivalBook).
import { BOOKS, isSurvivalBook, WEAPON_TYPES, RARITY, TIERS, RULES, GEAR, POTIONS, SPECIAL_WEAPONS } from './data.js';
import { state, dropBook, dropWeapon, dropGear, dropPotion, makeWeapon, makeGear, makeSpecial, resetDummies, clearTrainingBag, ownsLoot, itemName } from './engine.js';
import { sameLoot } from './loot-identity.js';
import { toast } from './ui.js';
import { bookIcon } from './items.js';

const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
const plain = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
let panel = null, onLeave = null, meter = { base: 0, samples: [] };

// in front of the player, inside the walking pickup radius (40) so it is picked up on the next tick
function feet() {
  const p = state.player, a = p.angle;
  return { x: p.x + Math.cos(a) * 18, y: p.y + Math.sin(a) * 18 };
}
const give = fn => () => {
  if (state.phase !== 'playing' || !state.training || !state.player?.alive) return;
  const p = state.player, q = feet(), item = fn(q.x, q.y);
  if (!item) return;
  const waiting = state.loot.some(other => other !== item && sameLoot(other, item) && Math.hypot(other.x - p.x, other.y - p.y) < 40);
  if (ownsLoot(p, item) || waiting) {
    state.loot.splice(state.loot.indexOf(item), 1);
    toast(`Đã có ${itemName(item)}${waiting ? ' đang chờ nhặt' : ''}`);
  }
};

function booksTab() {
  const box = el('div', 'tp-tab'), tools = el('div', 'tp-tools');
  const search = el('input'); search.type = 'search'; search.placeholder = 'Tìm bí kíp…'; search.id = 'trainingSearch'; search.setAttribute('aria-label', 'Tìm bí kíp');
  const weapon = el('select'); weapon.id = 'trainingWeapon'; weapon.setAttribute('aria-label', 'Lọc theo binh khí');
  weapon.append(new Option('Mọi binh khí', ''), ...Object.entries(WEAPON_TYPES).map(([k, w]) => new Option(w.name, k)), new Option('Không giới hạn', '*'));
  const tier = el('select'); tier.id = 'trainingTier'; tier.setAttribute('aria-label', 'Lọc theo bậc');
  tier.append(new Option('Mọi bậc', ''), ...TIERS.map((t, i) => t && new Option(`Bậc ${t.n}`, String(i))).filter(Boolean));
  // môn phái nguồn của bí kíp (vltk.factions, faction_settings của bộ cài); ai cũng dùng được, chỉ để lọc
  const sect = el('select'); sect.id = 'trainingFaction'; sect.setAttribute('aria-label', 'Lọc theo môn phái');
  const list = el('div', 'tp-list'), pool = BOOKS.filter(isSurvivalBook).sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name, 'vi'));
  const sects = new Map(pool.flatMap(b => b.vltk?.factions || []).map(f => [String(f.id), f.name]));
  sect.append(new Option('Mọi môn phái', ''), ...[...sects].sort((a, b) => a[1].localeCompare(b[1], 'vi')).map(([id, name]) => new Option(name, id)));
  if (pool.some(b => !b.vltk?.factions?.length)) sect.append(new Option('Không thuộc phái', '-'));
  tools.append(search, sect, weapon, tier);
  const count = el('small', 'tp-count');
  const draw = () => {
    const q = plain(search.value.trim()), w = weapon.value, t = tier.value, f = sect.value;
    const inSect = b => !f || (f === '-' ? !b.vltk?.factions?.length : (b.vltk?.factions || []).some(x => String(x.id) === f));
    const shown = pool.filter(b => (!q || plain(b.name).includes(q)) && inSect(b) && (!w || (w === '*' ? b.weaponAny : !b.weaponAny && b.weapon === w)) && (!t || String(b.tier) === t));
    count.textContent = `${shown.length} / ${pool.length} bí kíp sinh tồn`;
    list.replaceChildren(...shown.map(b => {
      const row = el('button', 'tp-book'); row.type = 'button'; row.id = `trainingBook-${b.id}`;
      row.style.setProperty('--tier', TIERS[b.tier].color);
      const icon = el('i', 'tp-ico'), src = bookIcon(b.id); if (src) icon.style.backgroundImage = `url('${src}')`;
      const sectName = (b.vltk?.factions || []).map(x => x.name).join(', ');
      const name = el('b', null, b.name), sub = el('small', null, `${sectName ? sectName + ' · ' : ''}Bậc ${TIERS[b.tier].n} · ${b.weaponAny ? 'Mọi binh khí' : WEAPON_TYPES[b.weapon]?.name || b.weapon} · ${b.mp} nội lực · hồi ${b.cd}s`);
      const txt = el('span'); txt.append(name, sub);
      row.append(icon, txt);
      row.title = b.desc || b.name;
      row.onclick = give((x, y) => dropBook(x, y, b));
      return row;
    }));
  };
  search.oninput = draw; sect.onchange = draw; weapon.onchange = draw; tier.onchange = draw; draw();
  box.append(tools, count, list);
  return box;
}

function gridTab(rows) {
  const box = el('div', 'tp-tab');
  for (const r of rows) {
    const line = el('div', 'tp-row'), label = el('span', 'tp-label', r.label);
    line.append(label);
    r.items.forEach((it, i) => {
      const b = el('button', 'tp-chip', it.text); b.type = 'button'; b.id = it.id; b.title = it.title;
      b.style.setProperty('--tier', it.color);
      b.onclick = give(it.drop);
      line.append(b);
    });
    box.append(line);
  }
  return box;
}
const weaponsTab = () => gridTab([
  ...Object.entries(WEAPON_TYPES).map(([type, w]) => ({ label: w.name, items: RARITY.map((r, i) => {
    const sample = makeWeapon(type, i);
    return { id: `trainingWeapon-${type}-${i}`, text: r.n, color: r.color, title: `${sample.name} (${r.name})`, drop: (x, y) => dropWeapon(x, y, makeWeapon(type, i)) };
  }) })),
  { label: 'Thần binh', items: SPECIAL_WEAPONS.map(s => ({ id: `trainingSpecial-${s.id}`, text: s.name.split(' ')[0], color: RARITY[s.rarity].color, title: s.name, drop: (x, y) => dropWeapon(x, y, makeSpecial(s.id)) })) },
]);
const gearTab = () => gridTab([
  ...RULES.gearSlots.map(slot => ({ label: GEAR[slot].label, items: RARITY.map((r, i) => ({ id: `trainingGear-${slot}-${i}`, text: r.n, color: r.color, title: `${GEAR[slot].names[i]} (${r.name})`, drop: (x, y) => dropGear(x, y, makeGear(slot, i)) })) })),
  { label: 'Thuốc', items: ['hp', 'mp'].map(t => ({ id: `trainingPotion-${t}`, text: `+5 ${POTIONS[t].name}`, color: POTIONS[t].color, title: POTIONS[t].name, drop: (x, y) => dropPotion(x, y, t, 5) })) },
]);

export function initTrainingPanel(leave) {
  onLeave = leave;
  if (panel) return panel;
  panel = el('aside', 'training-panel parchment'); panel.id = 'trainingPanel'; panel.hidden = true; panel.setAttribute('aria-label', 'Bảng luyện tập');
  const head = el('div', 'tp-head'), title = el('span', null, 'LUYỆN TẬP'), fold = el('button', 'utility', '▾'); fold.type = 'button'; fold.id = 'trainingFold'; fold.setAttribute('aria-label', 'Thu gọn bảng luyện tập');
  fold.onclick = () => { panel.classList.toggle('folded'); fold.textContent = panel.classList.contains('folded') ? '▸' : '▾'; };
  const headActions=el('div','tp-head-actions'),leaveButton=el('button','utility','Rời');
  leaveButton.type='button';leaveButton.id='trainingLeave';leaveButton.title='Rời võ trường, trở về menu chọn chế độ';leaveButton.setAttribute('aria-label','Rời võ trường');leaveButton.onclick=()=>onLeave?.();
  headActions.append(leaveButton,fold);head.append(title,headActions);
  const meterLine = el('div', 'tp-meter'); meterLine.id = 'trainingMeter';
  const tabs = el('div', 'tp-tabs'), body = el('div', 'tp-body');
  const pages = { 'Bí kíp': booksTab(), 'Binh khí': weaponsTab(), 'Trang bị': gearTab() };
  const show = name => { body.replaceChildren(pages[name]); for (const b of tabs.children) b.classList.toggle('active', b.textContent === name); };
  for (const name of Object.keys(pages)) { const b = el('button', 'tp-tabbtn', name); b.type = 'button'; b.id = `trainingTab-${Object.keys(pages).indexOf(name)}`; b.onclick = () => show(name); tabs.append(b); }
  show('Bí kíp');
  const hint = el('p', 'tp-hint', 'Đồ rơi ngay dưới chân và được nhặt như trong trận. Bí kíp vào ô trống, còn lại vào hành trang (B) — chuột phải để dùng / thay.');
  const foot = el('div', 'tp-foot');
  const btn = (id, text, fn) => { const b = el('button', 'utility', text); b.type = 'button'; b.id = id; b.onclick = fn; return b; };
  foot.append(
    btn('trainingReset', 'Dựng lại mộc nhân', () => resetDummies()),
    btn('trainingMeterReset', 'Đo lại', () => resetMeter()),
    btn('trainingClearBag', 'Dọn hành trang', () => clearTrainingBag()),
  );
  panel.append(head, meterLine, tabs, body, hint, foot);
  document.getElementById('game').append(panel);
  return panel;
}

export function showTrainingPanel(on) {
  if (!panel) return;
  panel.hidden = !on;
  document.body.classList.toggle('training', !!on);
  if (on) resetMeter();
}
function resetMeter() { meter = { base: state.player?.dealt || 0, samples: [] }; }
// damage dealt since the last reset and over the last 5 seconds (all from the shared damage() path)
export function updateTrainingPanel() {
  if (!panel || panel.hidden || !state.player) return;
  const now = state.time, dealt = (state.player.dealt || 0) - meter.base;
  meter.samples.push({ t: now, d: dealt });
  while (meter.samples.length && now - meter.samples[0].t > 5) meter.samples.shift();
  const first = meter.samples[0], span = Math.max(1, now - first.t);
  document.getElementById('trainingMeter').textContent = `Sát thương ${Math.round(dealt)} · 5 giây gần nhất ${Math.round((dealt - first.d) / span)}/giây`;
}
