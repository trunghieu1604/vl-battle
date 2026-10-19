// Unified character + inventory panel. Every action goes through the same
// engine commands in practice, survival and online replica mode.
import { state, bagCancel, bagDropHold, bagDrop, bagEquip, bagUse, unequip, unequipHold, bagSort, swapBooks, setAutoEquip } from './engine.js';
import { weaponLabel, damageText, TIERS, RARITY, GEAR, WEAPON_TYPES, POTIONS, RULES, SPECIAL_WEAPONS } from './data.js';
import { bookIcon, potionIcon, equipIcon } from './items.js';
import { portrait, preparePlayer, poseReady } from './sprites.js';
import { equippedLook } from './equipment-look.js';
import { usedCells, equipIconKey } from './bag.js';
import { toast } from './ui.js';

const $ = id => document.getElementById(id);
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };
const SLOTS = [
  { kind: 'weapon', key: 0, label: 'Binh khí', place: 'weapon-one' },
  ...['hat','jade','belt','neck','ring1','ring2'].map(key=>({kind:'gear',key,label:GEAR[key].label,place:key})),
  { kind: 'gear', key: 'armor', label: 'Y phục', place: 'armor' },
  { kind: 'gear', key: 'bracer', label: 'Hộ uyển', place: 'bracer' },
  { kind: 'gear', key: 'boots', label: 'Giày', place: 'boots' },
  ...[0, 1, 2, 3].map(i => ({ kind: 'book', key: i, label: `Võ công ${'QERT'[i]}`, place: `art-${i}` })),
];
const slotLabel = d => d.kind === 'book' ? `Ô ${d.key + 1}${d.key === 3 ? ' · Tuyệt kỹ' : ' · Võ công'}` : d.label;
const P = () => state.player;
// Dropping: a precious item (manual tier IV–V, gear / weapon quality 4–5) asks for a second press within 3 s; potions and common
// things go at once. A dragged item dropped outside the window goes to the ground, but never a precious one.
let dropArm = null, armTimer = 0;
const isValuable = it => levelOf(it) >= 4;
const dropKey = it => selection?.where === 'worn' ? `w${selection.kind}${selection.key}` : `b${it.id}`;
const armed = it => !!it && dropArm?.key === dropKey(it) && performance.now() < dropArm.until;
const hold = () => P()?.bag?.hold || null;
const lsGet = k => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* unavailable storage */ } };
let layer, actions, bagBtn, doll, selection = null, tab = 'bag', filter = 'all', lastKey = '', seenItems = 0, focusBefore;
let dollKey = '', dollPending = false, dollRetry = 0, dollError = false, drawGeneration = 0, dollPainted = '';
const keyOf = () => `${state.invRev}|${P()?.bag?.rev}|${P()?.bag?.hold?.id}|${P()?.wi}|${state.autoEquip}`;

const levelOf = it => it.kind === 'book' ? it.book.tier : it.kind === 'weapon' ? it.weapon.rarity + 1 : it.kind === 'gear' ? it.gear.rarity + 1 : 0;
const colorOf = it => it.kind === 'book' ? TIERS[it.book.tier].color : it.kind === 'weapon' ? RARITY[it.weapon.rarity].color : it.kind === 'gear' ? RARITY[it.gear.rarity].color : POTIONS[it.potion].color;
const nameOf = it => it.kind === 'book' ? it.book.name : it.kind === 'weapon' ? it.weapon.name : it.kind === 'gear' ? it.gear.name : POTIONS[it.potion].name;
function iconUrl(it) {
  if (it.kind === 'book') return bookIcon(it.book.id);
  if (it.kind === 'potion') return potionIcon(it.potion);
  const k = equipIconKey(it);
  return k ? equipIcon(k.key, k.rarity) : null;
}
function lines(it) {
  const out = [];
  if (it.kind === 'book') {
    const b = it.book;
    out.push(`Bí kíp bậc ${TIERS[b.tier].n} · ${TIERS[b.tier].name}`, `${weaponLabel(b)} · ${damageText(b)}`, `${b.mp} nội lực · hồi chiêu ${b.cd} giây`);
    if (b.desc) out.push(b.desc);
  } else if (it.kind === 'weapon') {
    const w = it.weapon, T = WEAPON_TYPES[w.type], sp = w.special && SPECIAL_WEAPONS.find(s => s.id === w.id);
    out.push(`Binh khí · ${T.name} · phẩm ${w.rarity + 1}/5`, `Đánh thường ${Math.round(T.dmg * (w.dmgMul || 1))} · tầm ${T.range}${w.bonus ? ` · võ công cùng loại +${Math.round(w.bonus * 100)}%` : ''}`, sp ? sp.note : T.note);
  } else if (it.kind === 'gear') {
    const g = it.gear;
    out.push(`${GEAR[g.slot].label} · phẩm ${g.rarity + 1}/5`, GEAR[g.slot].text(g));
  } else {
    const Pt = POTIONS[it.potion];
    out.push(`Hồi ${Pt.amount} ${it.potion === 'hp' ? 'sinh lực' : 'nội lực'} trong ${String(Pt.time).replace('.', ',')} giây`, `Đang có ${it.count} / ${RULES.potionMax} · phím ${Pt.key}`);
  }
  return out;
}

function iconEl(it) {
  const i = el('i', 'vicon is-' + it.kind), url = iconUrl(it);
  if (url) i.style.backgroundImage = `url('${url}')`;
  else { i.textContent = it.kind === 'book' ? it.book.glyph || '書' : it.kind === 'weapon' ? WEAPON_TYPES[it.weapon.type].name : it.kind === 'gear' ? GEAR[it.gear.slot].glyph : '藥'; i.classList.add('glyph'); }
  return i;
}
function payloadOf(kind, key) {
  const p = P();
  if (kind === 'book') return p.slots[key] && { kind: 'book', book: p.slots[key] };
  if (kind === 'weapon') return p.weapons[key] && { kind: 'weapon', weapon: p.weapons[key] };
  return p.gear[key] && { kind: 'gear', gear: p.gear[key] };
}
function selectedItem() {
  const p = P();
  if (!selection || !p) return null;
  return selection.where === 'worn' ? payloadOf(selection.kind, selection.key) : p.bag.items.find(i => i.id === selection.id);
}
function itemButton(it, target, label) {
  const b = el('button', 'bag-mobile-item'); b.type = 'button'; Object.assign(b.dataset, target);
  const picked = selection?.where === target.where && (target.where === 'bag' ? selection.id === target.id : selection.kind === target.kind && selection.key === target.key);
  b.classList.toggle('picked', picked); b.setAttribute('aria-pressed', String(picked));
  b.setAttribute('aria-label', `${label ? label + ': ' : ''}${it ? nameOf(it) : 'Chưa trang bị'}`);
  b.title = it ? nameOf(it) : label;
  if (it) {
    b.style.setProperty('--quality', colorOf(it)); b.append(iconEl(it));
    b.append(el('small', 'bag-quality', it.kind === 'book' ? TIERS[it.book.tier].n : it.kind === 'potion' ? it.count : RARITY[it[it.kind].rarity].name || `P${levelOf(it)}`));
  }
  if (label) b.append(el('span', 'bag-slot-label', label));
  return b;
}
function drawDoll() {
  const p = P(); if (!p || layer.hidden) return;
  const weapon = p.weapons[p.wi] || p.weapons[1 - p.wi], type = weapon?.type || p.faction.weapon, look = equippedLook(p, type);
  const key = `${look.id}|${look.costume}|${look.wear}|${look.rank}|${type}`;
  if (dollPainted === key && dollKey === key) return;
  if (key !== dollKey) { dollKey = key; drawGeneration++; dollPending = false; dollRetry = 0; dollError = false; }
  const ctx = doll.getContext('2d'); ctx.clearRect(0, 0, doll.width, doll.height);
  doll.dataset.look = key;
  const loading = actions.querySelector('.bag-doll-loading');
  if (!poseReady(look, type, 'idle')) {
    loading.hidden = false; loading.textContent = dollError ? 'Chưa tải được hình · bấm để thử lại' : 'Đang tải trang phục…';
    if (!dollPending && !dollError && performance.now() >= dollRetry) {
      dollPending = true; const generation = drawGeneration;
      preparePlayer(look, [type], ['idle']).then(() => {
        if (generation !== drawGeneration) return;
        dollPending = false; dollRetry = performance.now() + 1000; drawDoll();
      }).catch(() => {
        if (generation !== drawGeneration) return;
        dollPending = false; dollError = true; drawDoll();
      });
    }
    return;
  }
  loading.hidden = true;
  const fr = portrait(look, type);
  if (fr?.img && fr.dw && fr.dh) {
    const scale = Math.min(1.8, (doll.width - 20) / fr.dw, (doll.height - 30) / fr.dh);
    ctx.drawImage(fr.img, fr.sx, fr.sy, fr.sw, fr.sh, doll.width / 2 - fr.ax * scale, doll.height - 18 - fr.ay * scale, fr.dw * scale, fr.dh * scale);
    dollPainted = key;
  }
}
function drawEquipment() {
  const stage = actions.querySelector('.bag-equipment'), p = P();
  for (const old of stage.querySelectorAll('.bag-mobile-item')) old.remove();
  for (const d of SLOTS) {
    const button = itemButton(payloadOf(d.kind, d.key), { where: 'worn', kind: d.kind, key: d.key }, d.label);
    button.classList.add('bag-worn-slot', `slot-${d.place}`);
    button.classList.toggle('inuse', d.kind === 'weapon' && d.key === p.wi);
    stage.append(button);
  }
  actions.querySelector('.bag-player-name').textContent = p.name;
  actions.querySelector('.bag-player-sect').textContent = `${p.faction.name} · ${p.look.gender === 'nu' ? 'Nữ' : 'Nam'}`;
  actions.querySelector('.bag-costume-note').textContent = p.gear.armor ? p.gear.armor.name : 'Trang phục nhân vật';
  const attr = actions.querySelector('.bag-attributes'); attr.replaceChildren();
  const stats = [['Sinh lực', `${Math.ceil(p.hp)} / ${p.maxHp}`], ['Nội lực', `${Math.floor(p.mp)} / ${p.maxMp}`], ['Y phục', p.gear.armor?.name || 'Chưa mặc'], ['Hộ uyển', p.gear.bracer?.name || 'Chưa mặc'], ['Giày', p.gear.boots?.name || 'Chưa mặc']];
  for (const [name, value] of stats) { attr.append(el('dt', '', name), el('dd', '', value)); }
  attr.hidden = tab !== 'status'; stage.hidden = tab === 'status';
  for (const action of ['bag', 'status']) actions.querySelector(`[data-action="${action}"]`).setAttribute('aria-pressed', String(tab === action));
}
function drawGrid() {
  const list = actions.querySelector('.bag-mobile-list'), scroll = list.scrollTop, p = P(); list.replaceChildren();
  const items = p.bag.items.filter(it => filter === 'all' || (filter === 'equipment' ? ['weapon', 'gear'].includes(it.kind) : it.kind === filter));
  for (const it of items) list.append(itemButton(it, { where: 'bag', id: it.id }));
  // Uniform display tiles, original source storage footprints/capacity stay intact.
  for (let n = items.length; n < Math.max(24, Math.ceil(items.length / 6) * 6); n++) { const cell = el('div', 'bag-empty-cell'); cell.setAttribute('aria-hidden', 'true'); list.append(cell); }
  list.scrollTop = scroll;
  const empty = actions.querySelector('.bag-empty'); empty.hidden = !!items.length;
  empty.textContent = p.bag.items.length ? 'Không có đồ thuộc nhóm này.' : 'Túi trống · nhặt đồ để chuẩn bị giao chiến';
  actions.querySelector('.bag-mobile-count').textContent = `${usedCells(p.bag)} / ${p.bag.cols * p.bag.rows} ô`;
  for (const btn of actions.querySelectorAll('[data-filter]')) btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter));
  const auto = actions.querySelector('[data-action="auto"]'); auto.setAttribute('aria-pressed', String(state.autoEquip)); auto.textContent = `Tự mặc: ${state.autoEquip ? 'Bật' : 'Tắt'}`;
}
function drawDetail() {
  const it = selectedItem(), h = hold(), worn = selection?.where === 'worn', detail = actions.querySelector('.bag-detail');
  detail.hidden = (!it && !h) || (it?.kind === 'book' && !worn); actions.classList.toggle('has-selection', !detail.hidden);
  // a manual picked in the bag has no detail panel (its slots are the targets), so it gets its own small strip with Vứt
  const quick = actions.querySelector('.bag-quick'), bookInBag = !!it && it.kind === 'book' && !worn;
  quick.hidden = !bookInBag;
  if (bookInBag) { actions.querySelector('.bag-quick-name').textContent = nameOf(it); actions.querySelector('.bag-quick-drop').textContent = armed(it) ? 'Bấm lại để vứt!' : 'Vứt'; }
  if (detail.hidden) return;
  const name = actions.querySelector('.bag-action-name'); name.textContent = h ? `Đang dời: ${nameOf(h)}` : nameOf(it); name.style.color = colorOf(h || it);
  const info = actions.querySelector('.bag-action-info'); info.replaceChildren();
  for (const line of it ? lines(it) : ['Trả món đang cầm vào túi trước khi chọn đồ khác.']) info.append(el('p', '', line));
  if (it?.bw) info.append(el('small', '', `Chiếm ${it.bw * it.bh} ô dung lượng túi`));
  const comparison = actions.querySelector('.bag-comparison'), targets = actions.querySelector('.bag-equip-targets'); comparison.replaceChildren(); targets.replaceChildren();
  if (it && !worn && ['gear', 'weapon', 'book'].includes(it.kind)) {
    for (const d of SLOTS.filter(d => d.kind === it.kind && (it.kind !== 'gear' || d.key === it.gear.slot))) {
      const current = payloadOf(d.kind, d.key);
      if (it.kind === 'gear') {
        comparison.append(el('h4', '', 'Đang mặc ở cùng vị trí'), el('b', '', current ? nameOf(current) : 'Chưa mặc'));
        for (const line of current ? lines(current) : []) comparison.append(el('p', '', line));
      } else {
        const button = el('button', 'bag-equip-choice'); button.type = 'button'; Object.assign(button.dataset, { action: 'equip', kind: d.kind, key: d.key });
        button.append(el('b', '', `${current ? 'Thay' : it.kind === 'book' ? 'Học vào' : 'Đặt vào'} ${slotLabel(d)}`), el('span', '', current ? `Đang dùng: ${nameOf(current)}` : 'Ô còn trống'));
        button.disabled = it.kind === 'book' && (it.book.type !== 'active' || (it.book.tier === 5 && d.key !== 3));
        if (button.disabled) button.append(el('small', '', it.book.type !== 'active' ? 'Không dùng trong sinh tồn' : 'Bậc V chỉ học vào ô Tuyệt kỹ'));
        targets.append(button);
      }
    }
  }
  const use = actions.querySelector('.bag-action-use');
  use.textContent = h ? 'Trả lại' : worn ? 'Cất vào túi' : it.kind === 'book' ? 'Học / Thay võ công' : it.kind === 'weapon' ? 'Thay binh khí' : it.kind === 'potion' ? `Uống thuốc ${it.potion === 'hp' ? 'máu' : 'nội lực'}` : `Mặc ${GEAR[it.gear.slot].label.toLowerCase()}`;
  const drop = actions.querySelector('.bag-action-drop'), one = actions.querySelector('.bag-action-drop1'), stack = !h && !worn && it?.kind === 'potion' && it.count > 1;
  use.disabled = !h && !it; drop.disabled = !h && !it;
  one.hidden = !stack; one.textContent = 'Vứt 1';
  drop.textContent = armed(it) ? 'Bấm lại để vứt!' : stack ? `Vứt hết (${it.count})` : 'Vứt xuống đất';
}
function render() {
  if (!P()?.bag || !layer || layer.hidden || drag) return;
  lastKey = keyOf(); drawEquipment(); drawGrid(); drawDetail(); drawDoll();
}
function close() {
  if (hold()) bagCancel(P());
  const wasOpen = !layer.hidden;
  layer.hidden = actions.hidden = true; document.body.classList.remove('bag-open'); bagBtn.classList.remove('on');
  selection = null; quickBookId = null; focusBefore?.focus?.({ preventScroll: true });
  if (wasOpen) document.dispatchEvent(new CustomEvent('bag-visibility', { detail: { open: false } }));
}
function dropSelected(count = null) {
  const p = P(); if (!p) return;
  if (hold()) { bagDropHold(p); selection = null; return; }
  const it = selectedItem(); if (!it) return;
  if (isValuable(it) && !armed(it)) {
    dropArm = { key: dropKey(it), until: performance.now() + 3000 };
    toast(`${nameOf(it)} là món quý: bấm Vứt lần nữa để xác nhận`);
    clearTimeout(armTimer); armTimer = setTimeout(() => { dropArm = null; render(); }, 3100);
    return;
  }
  dropArm = null;
  if (selection.where === 'worn') { if (unequipHold(p, selection.kind, selection.key)) bagDropHold(p); }
  else bagDrop(p, it, count);
  selection = null;
}
// an item released outside the window falls at the fighter's feet (bag items only, and never a precious one)
function dragDrop(p, d) {
  if (d.where !== 'bag') { toast('Kéo món đang mặc vào túi để cất, hoặc chọn rồi bấm Vứt'); return; }
  const it = p.bag.items.find(i => i.id === d.itemId); if (!it) return;
  if (isValuable(it)) { toast(`${nameOf(it)} là món quý: chọn món rồi bấm Vứt để xác nhận`); return; }
  if (bagDrop(p, it)) toast(`Đã vứt ${nameOf(it)} xuống đất`);
}
function onAction(e) {
  const p = P(); if (!p) return;
  if (performance.now() < suppressClickUntil) return;
  const picked = e.target.closest('.bag-mobile-item');
  if (picked) {
    if (hold()) bagCancel(p);
    if (picked.dataset.where === 'worn' && quickBookId !== null && picked.dataset.kind === 'book') {
      const book=p.bag.items.find(it=>it.id===quickBookId); if(book)bagEquip(p,book,+picked.dataset.key); quickBookId=null; selection=null; render(); return;
    }
    selection = picked.dataset.where === 'bag' ? { where: 'bag', id: +picked.dataset.id } : { where: 'worn', kind: picked.dataset.kind, key: picked.dataset.kind === 'gear' ? picked.dataset.key : +picked.dataset.key };
    const selected=selectedItem();
    quickBookId=selection.where==='bag' && selected?.kind==='book' ? selected.id : null;
    if(quickBookId!==null) toast('Kéo hoặc chạm ô Q / E / R / T để thay võ công');
    render(); actions.querySelector('.bag-detail-scroll').scrollTop = 0; return;
  }
  const button = e.target.closest('button'), act = button?.dataset.action, it = selectedItem();
  if (button?.dataset.filter) { filter = button.dataset.filter; selection = null; render(); return; }
  if (!act) { if (e.target.classList.contains('bag-empty-cell')) { selection = null; render(); } return; }
  if (act === 'close') { close(); return; }
  if (act === 'bag' || act === 'status') { tab = act; selection = null; }
  else if (act === 'detail-close') selection = null;
  else if (act === 'auto') { setAutoEquip(!state.autoEquip); lsSet('tieungao.autoEquip3', state.autoEquip ? '1' : '0'); }
  else if (act === 'sort') bagSort(p);
  else if (act === 'retry-art') { dollError = false; dollRetry = 0; drawDoll(); return; }
  else if (act === 'use') {
    if (hold()) bagCancel(p);
    else if (it) {
      if (selection.where === 'bag' && ['book', 'weapon'].includes(it.kind)) {
        actions.querySelector('.bag-equip-targets').scrollIntoView({ block: 'nearest' }); return;
      }
      if (selection.where === 'worn') { const removed = unequip(p, selection.kind, selection.key); if (removed) selection = { where: 'bag', id: removed.id }; }
      else if (bagUse(p, it) && it.kind === 'gear') selection = null;
    }
  } else if (act === 'equip' && it && selection.where === 'bag') {
    const key = +button.dataset.key;
    if (bagEquip(p, it, key)) { selection = { where: 'worn', kind: it.kind, key }; toast(`Đã ${it.kind === 'book' ? 'học' : 'thay'} ${nameOf(it)} vào ô ${key + 1}`); }
  } else if (act === 'drop' || act === 'drop1') dropSelected(act === 'drop1' ? 1 : null);
  render();
}
let quickBookId=null, suppressClickUntil=0, drag=null;
function installInventoryDrag() {
  actions.addEventListener('pointerdown', e=>{
    if(e.button!==0)return;
    const node=e.target.closest('.bag-mobile-item');if(!node)return;
    const scrollNode=node.closest('.bag-grid-area,.bag-character');
    drag={touch:e.pointerType!=='mouse',t:performance.now(),scrollNode,scrollTop:scrollNode?.scrollTop||0,scrolling:false,id:e.pointerId,x:e.clientX,y:e.clientY,node,where:node.dataset.where,itemId:+node.dataset.id,kind:node.dataset.kind,key:node.dataset.kind==='gear'?node.dataset.key:+node.dataset.key,active:false,ghost:null};
    node.setPointerCapture(e.pointerId);
  });
  window.addEventListener('pointermove',e=>{
    if(!drag || drag.id!==e.pointerId)return;
    const distance=Math.hypot(e.clientX-drag.x,e.clientY-drag.y);
    if(drag.scrolling || (drag.touch && !drag.active && performance.now()-drag.t<240 && distance>8)){drag.scrolling=true;if(drag.scrollNode)drag.scrollNode.scrollTop=drag.scrollTop-(e.clientY-drag.y);return;}
    if(!drag.active && distance>8){
      drag.active=true;selection=null;quickBookId=null;actions.querySelector('.bag-detail').hidden=true;actions.classList.remove('has-selection');
      drag.ghost=drag.node.cloneNode(true);drag.ghost.className='bag-drag-ghost';document.body.append(drag.ghost);
    }
    if(!drag.active)return;
    drag.ghost.style.transform=`translate(${e.clientX-28}px,${e.clientY-28}px)`;
    const over=document.elementFromPoint(e.clientX,e.clientY), outside=drag.where==='bag' && !(over && actions.contains(over));
    const dragged=outside && P()?.bag.items.find(i=>i.id===drag.itemId), precious=!!dragged && isValuable(dragged);
    drag.ghost.classList.toggle('will-drop',outside && !precious);   // released here it falls to the ground
    drag.ghost.classList.toggle('is-precious',outside && precious);   // a precious item is never dropped by a drag
  });
  const finish=(e,cancel)=>{
    if(!drag || drag.id!==e.pointerId)return;
    const d=drag;drag=null;d.ghost?.remove();
    if(d.scrolling){suppressClickUntil=performance.now()+400;return;}
    if(!d.active)return;
    suppressClickUntil=performance.now()+400;
    if(!cancel){
      const node=document.elementFromPoint(e.clientX,e.clientY),slot=node?.closest('.bag-worn-slot'),p=P();
      if(slot){
        const kind=slot.dataset.kind,key=kind==='gear'?slot.dataset.key:+slot.dataset.key;
        if(d.where==='bag'){const it=p.bag.items.find(i=>i.id===d.itemId);if(it && it.kind===kind)bagEquip(p,it,key);else toast('Món đồ không đúng vị trí');}
        else if(d.kind==='book' && kind==='book') { if(!swapBooks(p,d.key,key))toast('Không thể đổi hai ô võ công này'); }
      } else if(d.where==='worn' && node?.closest('.bag-grid-area'))unequip(p,d.kind,d.key);
      else if(!node || !actions.contains(node))dragDrop(p,d);
    }
    selection=null;render();
  };
  window.addEventListener('pointerup',e=>finish(e,false));window.addEventListener('pointercancel',e=>finish(e,true));
}
export const bagOpen = () => !!layer && !layer.hidden;
export const statusOpen = () => bagOpen() && tab === 'status';
export function openBag(force) {
  if (!layer || !P()?.bag) return;
  const open = force === undefined ? layer.hidden : force;
  if (!open) { close(); return; }
  if (layer.hidden) focusBefore = document.activeElement;
  tab = 'bag'; selection = null; layer.hidden = actions.hidden = false;
  document.body.classList.add('bag-open'); bagBtn.classList.add('on'); bagBtn.classList.remove('fresh'); render();
  document.dispatchEvent(new CustomEvent('bag-visibility', { detail: { open: true } }));
}
export function openStatus(force) {
  if (force === false || (force === undefined && statusOpen())) { close(); return; }
  openBag(true); tab = 'status'; render();
}
export function bagEscape() {
  if (!bagOpen()) return false;
  if (hold()) { bagCancel(P()); render(); } else close();
  return true;
}
export function initBag() {
  bagBtn = el('button', 'utility'); bagBtn.innerHTML = 'TÚI<span class="k"> · B</span>'; bagBtn.id = 'bagBtn'; bagBtn.type = 'button'; bagBtn.setAttribute('aria-label', 'Mở hành trang');
  bagBtn.addEventListener('click', () => openBag()); $('mapBtn').before(bagBtn);
  layer = el('div', 'bag-layer'); layer.id = 'bagLayer'; layer.hidden = true;
  actions = el('section', 'bag-actions'); actions.id = 'bagItemActions'; actions.hidden = true;
  actions.setAttribute('role', 'dialog'); actions.setAttribute('aria-labelledby', 'bagTitle');
  actions.innerHTML = `<header class="bag-heading"><h2 id="bagTitle">Nhân vật</h2><span>Hành trang giang hồ</span><button type="button" data-action="close" aria-label="Đóng hành trang">×</button></header>
    <div class="bag-mobile-content"><aside class="bag-sidebar"><button type="button" data-action="bag">Túi đồ</button><button type="button" data-action="status">Thuộc tính</button><small>Kéo đồ ra ngoài: vứt<br>Chuột phải: dùng</small></aside>
    <section class="bag-character"><div class="bag-character-heading"><b class="bag-player-name"></b><small class="bag-player-sect"></small></div>
      <div class="bag-equipment"><div class="bag-doll-aura" aria-hidden="true"></div><canvas class="status-doll" width="240" height="250" aria-label="Nhân vật với trang phục đang mặc"></canvas><button type="button" class="bag-doll-loading" data-action="retry-art" hidden></button></div>
      <dl class="bag-attributes" hidden></dl><p class="bag-costume-note"></p><small class="bag-one-outfit">Một y phục đang mặc · thay đồ cập nhật nhân vật</small><div class="bag-future-slots"><span>Ngựa · sắp mở</span><span>Ngoại trang · sắp mở</span><span>Phi phong · sắp mở</span></div>
    </section><section class="bag-storage"><nav class="bag-filters" aria-label="Lọc túi đồ"><button type="button" data-filter="all">Tất cả</button><button type="button" data-filter="equipment">Trang bị</button><button type="button" data-filter="book">Bí kíp</button><button type="button" data-filter="potion">Thuốc</button></nav>
      <div class="bag-quick" hidden><span class="bag-quick-name"></span><button type="button" class="bag-quick-drop" data-action="drop">Vứt</button></div>
      <div class="bag-grid-area"><div class="bag-mobile-list" aria-label="Vật phẩm trong túi"></div><p class="bag-empty" hidden></p></div>
      <section class="bag-detail" hidden><div class="bag-detail-heading"><strong class="bag-action-name"></strong><button type="button" data-action="detail-close" aria-label="Đóng chi tiết vật phẩm">×</button></div><div class="bag-detail-scroll"><div class="bag-action-info"></div><div class="bag-comparison"></div><div class="bag-equip-targets"></div></div><div class="bag-item-buttons"><button type="button" class="bag-action-use" data-action="use">Mặc</button><button type="button" class="bag-action-drop1" data-action="drop1" hidden>Vứt 1</button><button type="button" class="bag-action-drop" data-action="drop">Vứt xuống đất</button></div></section>
      <footer class="bag-footer"><span class="bag-mobile-count"></span><button type="button" data-action="auto">Tự mặc</button><button type="button" data-action="sort">Sắp xếp</button></footer>
    </section></div>`;
  doll = actions.querySelector('canvas'); actions.addEventListener('click', onAction);
  // Delete drops the selected item (capture phase: the panel stops other keys from reaching the game)
  window.addEventListener('keydown', e => { if (e.key === 'Delete' && bagOpen() && selection && !e.target.closest?.('input,textarea')) { e.preventDefault(); e.stopPropagation(); dropSelected(); render(); } }, true);
  installInventoryDrag();
  // Buttons retain native Tab/Enter/Space behaviour without firing combat.
  actions.addEventListener('keydown', e => {
    if (!['escape', 'b', 'i', 'c'].includes(e.key.toLowerCase())) e.stopPropagation();
  });
  actions.addEventListener('contextmenu', e => { e.preventDefault(); const item = e.target.closest('.bag-mobile-item'); if (!item) return; const p = P(); if (!p) return;
    if (item.dataset.where === 'bag') { const it = p.bag.items.find(i => i.id === +item.dataset.id); if (it) bagUse(p, it); }
    else unequip(p, item.dataset.kind, item.dataset.kind === 'gear' ? item.dataset.key : +item.dataset.key);
    selection = null; render();
  });
  layer.append(actions); $('game').append(layer);
  const value = lsGet('tieungao.autoEquip3'); if (value !== null) setAutoEquip(value === '1');
}
export function syncBag() {
  if (!layer) return;
  if (state.phase !== 'playing') { if (bagOpen()) close(); return; }
  const n = P()?.bag?.items.length || 0;
  if (!bagOpen() && n > seenItems) bagBtn.classList.add('fresh'); seenItems = n;
  if (bagOpen()) { if (keyOf() !== lastKey) render(); else drawDoll(); }
}
