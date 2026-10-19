// Logic lưới của túi đồ (không đụng tới DOM hay engine): đặt, tìm chỗ trống, dời, gộp chồng bình thuốc.
// Vật phẩm trong túi là chính đối tượng đồ rơi ({ kind, book | weapon | gear | potion, count }) cộng vị trí bx, by và cỡ bw, bh.
import { BAG, ITEM_CELLS, SMALL } from './bag-data.js';

// hold: the item "on the mouse" (picked up, not yet put down); it is not in items while held
export const makeBag = (cols = BAG.cols, rows = BAG.rows) => ({ cols, rows, items: [], rev: 0, hold: null, hinted: false });

// [rộng, cao] theo ô của một vật phẩm
export function cellsOf(item) {
  if (item.kind === 'weapon') return ITEM_CELLS.weapon[item.weapon.type]?.[item.weapon.rarity] || SMALL;
  if (item.kind === 'gear') return ITEM_CELLS.gear[item.gear.slot]?.[item.gear.rarity] || SMALL;
  return SMALL;
}
// Khóa biểu tượng VLTK của binh khí / trang bị ('weapon.kiem', bậc) hoặc null
export function equipIconKey(item) {
  if (item.kind === 'weapon') return { key: `weapon.${item.weapon.type}`, rarity: item.weapon.rarity };
  if (item.kind === 'gear') return { key: `gear.${item.gear.slot}`, rarity: item.gear.rarity };
  return null;
}

// lưới số hiệu vật phẩm đang chiếm ô (0 = trống), bỏ qua `ignore` khi đang dời chính nó
function grid(bag, ignore) {
  const g = new Int32Array(bag.cols * bag.rows);
  let n = 1;
  for (const it of bag.items) {
    n++;
    if (it === ignore) continue;
    for (let y = it.by; y < it.by + it.bh; y++) for (let x = it.bx; x < it.bx + it.bw; x++) g[y * bag.cols + x] = n;
  }
  return g;
}
export function fits(bag, x, y, w, h, ignore = null) {
  if (x < 0 || y < 0 || x + w > bag.cols || y + h > bag.rows) return false;
  const g = grid(bag, ignore);
  for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (g[j * bag.cols + i]) return false;
  return true;
}
// chỗ trống đầu tiên theo hàng từ trên xuống; `near` {x, y} ưu tiên chỗ cũ nếu còn vừa
export function findSpot(bag, w, h, near = null, ignore = null) {
  if (near && fits(bag, near.x, near.y, w, h, ignore)) return { x: near.x, y: near.y };
  const g = grid(bag, ignore);
  for (let y = 0; y + h <= bag.rows; y++) for (let x = 0; x + w <= bag.cols; x++) {
    let ok = true;
    for (let j = y; j < y + h && ok; j++) for (let i = x; i < x + w; i++) if (g[j * bag.cols + i]) { ok = false; break; }
    if (ok) return { x, y };
  }
  return null;
}
export function addItem(bag, item, near = null) {
  const [w, h] = cellsOf(item), spot = findSpot(bag, w, h, near);
  if (!spot) return false;
  Object.assign(item, { bx: spot.x, by: spot.y, bw: w, bh: h });
  bag.items.push(item); bag.rev++;
  return true;
}
export function removeItem(bag, item) {
  const i = bag.items.indexOf(item);
  if (i < 0) return false;
  bag.items.splice(i, 1); bag.rev++;
  return true;
}
export function moveItem(bag, item, x, y) {
  if (!bag.items.includes(item) || !fits(bag, x, y, item.bw, item.bh, item)) return false;
  item.bx = x; item.by = y; bag.rev++;
  return true;
}
// items whose cells overlap the rectangle (x, y, w, h)
export const overlapping = (bag, x, y, w, h) => bag.items.filter(o => o.bx < x + w && o.bx + o.bw > x && o.by < y + h && o.by + o.bh > y);
// put an item at an exact cell (the caller has checked it fits)
export function placeItem(bag, item, x, y) {
  const [w, h] = cellsOf(item);
  Object.assign(item, { bx: x, by: y, bw: w, bh: h });
  bag.items.push(item); bag.rev++;
}
export const usedCells = bag => bag.items.reduce((n, it) => n + it.bw * it.bh, 0);

// Repack transactionally. A greedy layout can fail even when the old layout
// fits: never drop or lose an item just because a sort failed.
export function packBag(bag, extra = null) {
  const original = bag.items, items = extra ? [...original, extra] : [...original];
  const order = { weapon: 0, gear: 1, book: 2, potion: 3 };
  const candidates = [
    [...items].sort((a, b) => { const [aw, ah] = cellsOf(a), [bw, bh] = cellsOf(b);
      return bw * bh - aw * ah || bh - ah || (order[a.kind] ?? 4) - (order[b.kind] ?? 4) ||
        (b[b.kind]?.rarity ?? b.book?.tier ?? 0) - (a[a.kind]?.rarity ?? a.book?.tier ?? 0) || a.id - b.id; }),
    items,
  ];
  for (const list of candidates) {
    const trial = makeBag(bag.cols, bag.rows), positions = [];
    let ok = true;
    for (const item of list) {
      const copy = { ...item };
      if (!addItem(trial, copy)) { ok = false; break; }
      positions.push([item, copy.bx, copy.by, copy.bw, copy.bh]);
    }
    if (!ok) continue;
    for (const [item, bx, by, bw, bh] of positions) Object.assign(item, { bx, by, bw, bh });
    bag.items = positions.map(p => p[0]); bag.rev++;
    return true;
  }
  return false;
}
export function addPackedItem(bag, item, near = null) {
  return addItem(bag, item, near) || packBag(bag, item);
}

// ---- bình thuốc: mỗi loại một chồng ----
export const potionStack = (bag, type) => bag.items.find(it => it.kind === 'potion' && it.potion === type) || null;
export const potionCount = (bag, type) => potionStack(bag, type)?.count || 0;
// thêm n bình; trả về số bình đã nhận (0 nếu hết chỗ cho chồng mới)
export function addPotions(bag, type, n, id, cap = Infinity) {
  let s = potionStack(bag, type);
  const take = Math.max(0, Math.min(n, cap - (s?.count || 0)));
  if (!take) return 0;
  if (s) { s.count += take; bag.rev++; return take; }
  s = { id, kind: 'potion', potion: type, count: take };
  return addPackedItem(bag, s) ? take : 0;
}
// lấy n bình; chồng hết thì bỏ khỏi túi
export function takePotions(bag, type, n) {
  const s = potionStack(bag, type);
  if (!s) return 0;
  const k = Math.min(n, s.count);
  s.count -= k; bag.rev++;
  if (s.count <= 0) removeItem(bag, s);
  return k;
}
