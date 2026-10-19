// DOM HUD: vitals, weapons, active martial-art slots, potions, target frame, prompts, maps and modals.
import { SKINS, DEFAULT_SKIN, weaponLabel, damageText, FACTIONS, SIDES, GENDERS, factionById, avatarOf, openAvatars, isOpen, ELEMENTS, GEAR, RULES, RARITY, POTIONS, WEAPON_TYPES, TIERS, ZONE_PHASES, ACTIVE_KEYS } from './data.js';
import { fmtTime } from './util.js';
import { equippedLook } from './equipment-look.js';
import { state, zoneInfo, drink, pickup, held, thanOf, cooldownLeft, skillCost, slotOptions, swapWeapon, startOpen } from './engine.js';
import { drawMinimap, lootLabel } from './render.js';
import { potionIcon, bookIcon, iconSourceText, uiIcon } from './items.js';
import { portrait, getFrame, blit, resolveAction, actionInfo, sheetTiming, DIRS, animConfig, poseReady, playerDataReady } from './sprites.js';

export const $ = id => document.getElementById(id);
let toastUntil = 0, bannerUntil = 0, focusBefore = null;
let portraitKey = '';
function drawPortrait(p) {
  const weapon = held(p).type, look = equippedLook(p, weapon);
  const ready = poseReady(look, weapon, 'idle');
  const key = `${look.id}|${look.costume}|${look.wear}|${look.rank}|${weapon}|${ready}`;
  if (key === portraitKey) return;
  portraitKey = key;
  const pc = $('portrait'), ctx = pc.getContext('2d'), fr = portrait(look, weapon);
  ctx.clearRect(0, 0, pc.width, pc.height);
  if (fr.dw && fr.dh) ctx.drawImage(fr.img, fr.sx, fr.sy, fr.sw, fr.sh, pc.width / 2 - fr.ax, pc.height + 64 - fr.ay, fr.dw, fr.dh);
}
export const uiState = { selected: 0, castAt: null };
// A book's VLTK skill icon framed in its tier colour; the Hán glyph until icons load or for empty slots.
function bookGlyph(book, empty) {
  const icon = book && bookIcon(book.id), color = book ? TIERS[book.tier].color : '';
  if (icon) return `<span class="glyph vo" data-tier="${TIERS[book.tier].n}" style="background-image:url('${icon}');border-color:${color};--tier:${color}"></span>`;
  return `<span class="glyph" style="${color ? `color:${color}` : ''}">${book ? book.glyph : empty}</span>`;
}
// Combat buttons fire on the finger's own pointerdown: a second finger's tap gives no 'click' while another finger
// holds the joystick, so khinh công or a skill could not be used while moving. Mouse and keyboard keep 'click'.
export function onTap(el, fn) {
  let touchedAt = -1e9;
  el.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') return; e.preventDefault(); touchedAt = performance.now(); fn(e); });
  el.addEventListener('click', e => { if (performance.now() - touchedAt > 700) fn(e); });
}
const pct = (v, m) => `${Math.max(0, Math.min(100, v / m * 100))}%`;
const WEAPON_GLYPH = { kiem: '劍', dao: '刀', con: '棍', thuong: '槍', quyen: '拳', amkhi: '鏢' };

export function toast(msg) { $('toast').textContent = msg; $('toast').classList.add('show'); toastUntil = performance.now() + 2600; }
// A louder message than the toast, in the banner used for district names: elite bosses appearing or falling.
export function announce(glyph, text) {
  $('placeText').textContent = text; $('placeGlyph').textContent = glyph;
  $('placeBanner').classList.add('show'); bannerUntil = performance.now() + 5200;
}
export function showPlace(poi) {
  if (!poi) { $('placeName').textContent = 'VÙNG HOANG DÃ'; $('mapPlace').textContent = 'ĐỊA ĐỒ'; return; }
  $('placeText').textContent = poi.name; $('placeGlyph').textContent = poi.glyph || '';
  $('placeBanner').classList.add('show'); bannerUntil = performance.now() + 2600;
  $('placeName').textContent = poi.name.toUpperCase(); $('mapPlace').textContent = poi.name.toUpperCase();
}

// Character select: faction grid grouped by side, the faction's avatars, and an animated preview of the pick.
export function renderFactions(selected, avatarId, onPick, skin = DEFAULT_SKIN, onSkin = null) {
  const root = $('factions'); root.replaceChildren();
  // VLTK's ten great sects (plus Hoa Sơn) first, paired by element as in the original; other Kim Dung sects by side
  const order = Object.keys(ELEMENTS);
  const groups = [['Võ Lâm · Thập đại môn phái', '#e8d49a', FACTIONS.filter(f => f.vltk).sort((a, b) => order.indexOf(a.element) - order.indexOf(b.element))],
    ...Object.entries(SIDES).map(([sid, side]) => [`Giang hồ · ${side.name}`, side.color, FACTIONS.filter(f => !f.vltk && f.side === sid)])];
  for (const [title, color, all] of groups) {
    const list = globalThis.__TIEUNGAO_SERVER__?.enabled ? all : all.filter(f => openAvatars(f).length);
    if (!list.length) continue;
    const head = document.createElement('div');
    head.className = 'side-head'; head.textContent = title; head.style.color = color;
    root.append(head);
    for (const f of list) {
      const b = document.createElement('button');
      b.className = 'faction'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', f.id === selected);
      // factions with no avatar open on this map stay in the catalog, shown as coming later
      const open = openAvatars(f);
      b.innerHTML = `<span class="g" style="color:${ELEMENTS[f.element].color}">${f.glyph}</span>${f.name}<small><i style="background:${SIDES[f.side].color}" title="${SIDES[f.side].name}"></i>${WEAPON_TYPES[f.weapon].name} · ${(open.length ? open : f.avatars).map(a => GENDERS[a.gender]).filter((g, i, all) => all.indexOf(g) === i).join('/')}</small>${open.length ? '' : '<em class="soon">SẮP MỞ</em>'}`;
      if (open.length) b.addEventListener('click', () => onPick(f.id));
      else { b.disabled = true; b.title = 'Sắp mở ở bản đồ sau'; }
      root.append(b);
    }
  }
  const f = factionById(selected), av = avatarOf(f, avatarId);
  const list = $('avatars'); list.replaceChildren();
  for (const a of f.avatars) {
    const b = document.createElement('button');
    b.className = 'avatar'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', a.id === av.id);
    b.innerHTML = `${GENDERS[a.gender]}<small>${a.title}</small>${isOpen(a) ? '' : '<em class="soon">SẮP MỞ</em>'}`;
    if (isOpen(a)) b.addEventListener('click', () => onPick(f.id, a.id));
    else b.disabled = true;
    list.append(b);
  }
  // costume: looks only, no stats
  const skins = $('skins');
  if (skins) {
    skins.replaceChildren();
    for (const [id, s] of Object.entries(SKINS)) {
      const b = document.createElement('button');
      b.className = 'avatar'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', id === skin); b.title = s.note;
      b.innerHTML = `${s.short}<small>${s.sub} · chỉ ngoại hình</small>`;
      if (onSkin) b.addEventListener('click', () => onSkin(id));
      skins.append(b);
    }
  }
  const S = SIDES[f.side], E = ELEMENTS[f.element];
  $('factionDesc').innerHTML = `<b style="color:${S.color}">${S.name}</b> · <b style="color:${E.color}">${E.name}</b> · ${WEAPON_TYPES[f.weapon].name}<br>${f.desc} Nhặt bí kíp kỹ năng Võ Lâm Truyền Kỳ trong trận.<br><small>Hiện môn phái chỉ khác ngoại hình và binh khí khởi đầu.</small>`;
  previewLook = { look: { id: av.id, gender: av.gender, ...f.look, costume: skin }, weapon: f.weapon, t0: performance.now() };
  if (!previewRAF) previewRAF = requestAnimationFrame(drawAvatarPreview);
}

// Plays the avatar's moves in turn and walks it round all eight directions.
const PREVIEW_ACTIONS = [['idle', 2.2], ['run', 1.6], ['attack', 1.0], ['skill', 1.4]];
const PREVIEW_CYCLE = PREVIEW_ACTIONS.reduce((s, a) => s + a[1], 0);
let previewLook = null, previewRAF = 0, previewLast = -Infinity;
function drawAvatarPreview(now) {
  previewRAF = requestAnimationFrame(drawAvatarPreview);
  const cv = $('avatarPreview');
  if (document.hidden || !previewLook || !cv || cv.offsetParent === null || !animConfig() || now-previewLast<1000/18-1) return;
  previewLast=now;
  const ctx = cv.getContext('2d'), { look, weapon, t0 } = previewLook;
  let t = (now - t0) / 1000;
  const turn = Math.floor(t / PREVIEW_CYCLE);
  t %= PREVIEW_CYCLE;
  let [action, dur] = PREVIEW_ACTIONS[0];
  for (const a of PREVIEW_ACTIONS) { if (t < a[1]) { [action, dur] = a; break; } t -= a[1]; }
  // never the procedural stand-in: a move whose art is still loading keeps the standing pose, and before even that
  // has arrived the box says the figure is loading (its parts are requested by getFrame meanwhile)
  if (!poseReady(look, weapon, resolveAction(action, weapon))) {
    if (!poseReady(look, weapon, resolveAction('idle', weapon))) {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = 'rgba(241,220,156,.75)'; ctx.font = '13px system-ui, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('Đang tải nhân vật…', cv.width / 2, cv.height / 2);
      if (playerDataReady()) getFrame(look, 'human', 0, resolveAction('idle', weapon), 0, 1.5, weapon);   // asks for the parts
      return;
    }
    action = 'idle'; dur = PREVIEW_ACTIONS[0][1];
  }
  const key = resolveAction(action, weapon), sheet = sheetTiming(look, weapon, key);
  const def = actionInfo(key, weapon), n = sheet?.frames ?? def.frames;
  const loopDur = action === 'run' ? 0.8 : action === 'idle' ? sheet?.duration ?? def.duration : 0;
  const i = loopDur ? Math.floor(t / loopDur * n) % n : Math.min(n - 1, Math.floor(t / dur * n));
  const dirs = DIRS(), dir = (Math.round(dirs / 4) + turn) % dirs; // starts facing the viewer
  ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(cv.width / 2, cv.height - 22, 40, 12, 0, 0, Math.PI * 2); ctx.fill();
  blit(ctx, getFrame(look, 'human', dir, key, i, 1.5, weapon), cv.width / 2, cv.height - 22);
}

export function bookTip(b) {
  const T = TIERS[b.tier];
  const lines = [`${b.name}${b.han ? ` (${b.han})` : ''} — độ hiếm ${T.n} · ${T.name}`];
  if (b.vltk?.factions?.length) lines.push(`Phái gốc: ${b.vltk.factions.map(f => f.name).join(' · ')} · nhặt được là dùng, không khóa phái`);
  if (b.type === 'active') lines.push(`${weaponLabel(b)} · ${damageText(b)} · ${b.mp} nội lực · hồi ${b.cd} giây`);
  if (b.type !== 'active') lines.push('Dành cho cách chơi khác — không dùng trong sinh tồn');
  lines.push(b.desc, `Nguồn: ${b.source}${b.book ? ' · ' + b.book : ''}`);
  const src = iconSourceText(b.id); if (src) lines.push(`Biểu tượng — ${src}`);
  return lines.join('\n');
}

export function renderSkills() {
  const p = state.player;
  const wr = $('weapons'); wr.replaceChildren();
  p.weapons.slice(0, 1).forEach((w, i) => {
    const b = document.createElement('button');
    b.className = 'weapon' + (i === p.wi ? ' active' : '') + (w ? '' : ' empty');
    b.title = w ? `${w.name} — ${WEAPON_TYPES[w.type].name}${w.bonus ? ` · +${Math.round(w.bonus * 100)}% võ công cùng loại` : ''}\n${w.note || WEAPON_TYPES[w.type].note}\nĐổi binh khí trong túi` : 'Ô binh khí trống';
    b.innerHTML = `<kbd>B</kbd><span class="glyph" style="color:${w ? RARITY[w.rarity].color : ''}">${w ? WEAPON_GLYPH[w.type] : '+'}</span><span class="name">${w ? w.name : 'Trống'}</span>`;
    onTap(b, () => document.getElementById('bagBtn')?.click());
    wr.append(b);
  });
  const root = $('skills'); root.replaceChildren();
  root.setAttribute('role', 'group'); root.setAttribute('aria-label', 'Võ công');
  p.slots.forEach((s, i) => {
    const b = document.createElement('button');
    b.className = 'skill' + (s ? '' : ' empty') + (i === 3 ? ' ultimate' : '');
    if (s) b.style.borderColor = TIERS[s.tier].color;
    b.setAttribute('aria-label', s ? `${s.name}. ${s.desc}` : `Ô võ học ${ACTIVE_KEYS[i]} trống`);
    b.title = s ? bookTip(s) : i === 3 ? 'Ô tuyệt kỹ: nhận mọi bậc, kể cả bậc V' : 'Ô võ học: bậc I–IV';
    b.innerHTML = `<kbd>${ACTIVE_KEYS[i]}</kbd><span class="tier" style="color:${s ? TIERS[s.tier].color : ''}">${s ? TIERS[s.tier].n : i === 3 ? 'V' : ''}</span>${bookGlyph(s, '+')}<span class="name">${s ? s.name : i === 3 ? 'Tuyệt kỹ' : 'Chưa lĩnh hội'}</span><span class="wtag">${s?.weapon ? WEAPON_GLYPH[s.weapon] || '' : ''}</span><span class="cooldown" hidden></span>`;
    onTap(b, () => { uiState.selected = i; uiState.castAt?.(i); });
    b.addEventListener('contextmenu', e => { e.preventDefault(); uiState.selected = i; });
    root.append(b);
  });
  const po = $('potions'); po.replaceChildren();
  po.setAttribute('role', 'group'); po.setAttribute('aria-label', 'Thuốc');
  for (const type of ['hp', 'mp']) {
    const P = POTIONS[type], b = document.createElement('button');
    b.className = 'potion'; b.dataset.type = type; b.title = `${P.name} — phím ${P.key} · hồi ${P.amount} trong ${String(P.time).replace('.', ',')} giây`;
    b.setAttribute('aria-label', `Hồi ${type === 'hp' ? 'sinh lực' : 'nội lực'} — ${P.name}`);
    // VLTK inventory icon (Kim Sáng Dược / Ngưng Thần đơn) once loaded, the coloured dot until then
    const icon = potionIcon(type);
    b.innerHTML = `<kbd>${P.key}</kbd>${icon ? `<i class="ico" style="background-image:url('${icon}')"></i>` : `<i style="background:${P.color}"></i>`}<b>0</b><span class="potion-label">${type === 'hp' ? 'Máu' : 'Nội'}</span><span class="potion-cooldown" hidden></span>`;
    onTap(b, () => drink(p, type));
    po.append(b);
  }
  drawPortrait(p);
}

export function hud() {
  const p = state.player;
  if (!p) return;
  drawPortrait(p);
  const z = zoneInfo();
  $('hpFill').style.width = pct(p.hp, p.maxHp); $('hpText').textContent = `${Math.ceil(p.hp)} / ${p.maxHp}`;
  $('mpFill').style.width = pct(p.mp, p.maxMp); $('mpText').textContent = `${Math.floor(p.mp)} / ${p.maxMp}`;
  $('stFill').style.width = pct(p.st, p.maxSt); $('stText').textContent = `Thể lực ${Math.floor(p.st)}`;
  $('kills').textContent = `${state.kills} hạ gục`;
  $('element').textContent = p.faction.name; $('element').style.color = ELEMENTS[p.element].color;
  const s = p.stats, parts = [];
  const dr = Math.min(RULES.totalDRCap, s.armorDR + s.dr);
  if (s.atkBonus) parts.push(`+${Math.round(s.atkBonus * 100)}% công`);
  if (dr) parts.push(`−${Math.round(dr * 100)}% thương`);
  if (s.move) parts.push(`+${Math.round(s.move * 100)}% tốc`);
  if (s.cdr) parts.push(`−${+(s.cdr * 100).toFixed(1)}% hồi`);
  if (s.mpCost) parts.push(`−${Math.round(s.mpCost * 100)}% hao`);
  $('statLine').textContent = parts.join(' · ');
  const gr = $('gearRow');
  if (gr.childElementCount !== RULES.gearSlots.length) gr.replaceChildren(...RULES.gearSlots.map(() => document.createElement('span')));
  RULES.gearSlots.forEach((slot, i) => {
    const g = p.gear[slot], el = gr.children[i];
    el.textContent = GEAR[slot].glyph;
    el.style.color = g ? RARITY[g.rarity].color : ''; el.style.borderColor = g ? RARITY[g.rarity].color : '';
    el.title = g ? `${g.name} (${RARITY[g.rarity].name}) — ${GEAR[slot].text(g)}` : `${GEAR[slot].label}: trống`;
  });
  [...$('weapons').children].forEach((b, i) => b.classList.toggle('active', i === p.wi));
  [...$('skills').children].forEach((b, i) => {
    const sk = p.slots[i], cd = b.querySelector('.cooldown'), left = sk ? cooldownLeft(p, sk) : 0;
    cd.hidden = left <= 0; cd.textContent = Math.ceil(left);
    b.classList.toggle('selected', uiState.selected === i && !!sk);
    b.classList.toggle('nomana', !!sk && p.mp < skillCost(p, sk));
  });
  [...$('potions').children].forEach(b => {
    const n = p.potions[b.dataset.type], cooling = p.potionCD > 0;
    b.querySelector('b').textContent = n; b.classList.toggle('empty', !n); b.classList.toggle('cooling', cooling);
    b.setAttribute('aria-disabled', String(!n || cooling));
    const cd = b.querySelector('.potion-cooldown'); cd.hidden = !cooling; cd.textContent = cooling ? p.potionCD.toFixed(1) : '';
  });
  const T = thanOf(p);
  $('dodgeTime').textContent = p.jump ? 'Đang bay' : `${'●'.repeat(p.leap.charges)}${'○'.repeat(Math.max(0, T.charges - p.leap.charges))}${p.st < T.cost ? ' · mệt' : ''}`;
  // Shared base khinh cong in survival.
  const leapIcon = uiIcon('khinhcong'), li = $('dodge').querySelector('.ui-ico');
  if (leapIcon && li && li.dataset.src !== leapIcon) { li.dataset.src = leapIcon; li.style.backgroundImage = `url('${leapIcon}')`; }
  if (li) { li.dataset.tier = ''; li.style.setProperty('--tier', '#d4b97a'); }
  const t = p.target;
  if (t && t.alive) {
    $('targetFrame').hidden = false;
    const w = held(t);
    $('tName').textContent = t.name; $('tName').style.color = t.boss ? t.boss.color : '';
    $('tSub').textContent = t.dummy ? 'Mộc nhân luyện công' : t.boss?.monster ? `${t.boss.title} · rơi đồ khi bị hạ` : t.boss ? `${t.boss.title} bậc ${t.boss.T.n} · ${t.slots.filter(Boolean).length} võ công` : `${t.faction.name} · ${w.name} · ${t.slots.filter(Boolean).length} võ công`;
    $('tHp').style.width = pct(t.hp, t.maxHp); $('tHpText').textContent = `${Math.ceil(t.hp)} / ${t.maxHp}`;
  } else $('targetFrame').hidden = true;
  const alive = state.heroes.filter(h => h.alive && !h.boss).length, bossLeft = state.heroes.filter(h => h.alive && h.boss && !h.boss.monster).length;
  $('alive').textContent = alive;
  $('clock').textContent = fmtTime(state.time);
  if (!z) {   // training ground: no zone, no opponents
    $('zoneLabel').textContent = 'Võ trường';
    $('modeLine').textContent = `Luyện tập · ${state.heroes.filter(h => h.dummy && h.alive).length} mộc nhân · không ghi thành tích`;
    $('modeLine').style.color = '';
    $('zoneWarning').hidden = true;
  } else {
  $('zoneLabel').textContent = z.stage === 'wait' ? `Bo thu sau ${Math.ceil(z.remaining)}s` : z.stage === 'shrink' ? `Bo thu hẹp · ${Math.ceil(z.remaining)}s` : 'Vòng cuối';
  const ev = state.events.find(v => v.announced && !v.done), el = state.elites.find(v => v.announced && !v.done);
  $('modeLine').textContent = el ? `${el.def.name} xuất thế tại ${el.name} · ${Math.ceil(el.spawn - state.time)}s` : ev ? `Bảo khố bậc V tại ${ev.name} · ${Math.ceil(ev.spawn - state.time)}s` : `Sinh tồn · Vòng ${z.phase + 1}/${ZONE_PHASES.length} · ${alive} cao thủ${bossLeft ? ` · ${bossLeft} thủ lĩnh` : ''}`;
  $('modeLine').style.color = ev || el ? TIERS[5].color : '';
  const outside = p.alive && Math.hypot(p.x - z.x, p.y - z.y) > z.r;
  $('zoneWarning').hidden = !outside;
  if (outside) $('zoneWarning').textContent = `Đang ở ngoài vùng an toàn — mất ${z.dps} sinh lực mỗi giây!`;
  }
  $('killfeed').replaceChildren(...state.feed.map(f => { const d = document.createElement('div'); d.textContent = f.text; if (f.player) d.className = 'mine'; return d; }));
  $('chat').replaceChildren(...state.chat.filter(c => state.time - c.t < 30).map(c => { const d = document.createElement('div'); d.innerHTML = '<b>[Hệ thống]</b> '; d.append(c.text); d.style.color = c.color; return d; }));
  lootUI();
  if (performance.now() > toastUntil) $('toast').classList.remove('show');
  if (performance.now() > bannerUntil) $('placeBanner').classList.remove('show');
}

export function drawMaps() {
  drawMinimap($('minimap').getContext('2d'), 188);
  if (!$('bigMapWrap').hidden) drawMinimap($('bigMap').getContext('2d'), 640, true);
}

// VLTK1 style: no huge popup in the center of the screen to block vision.
// Items and chests show clean ground tags; click the tag or item to pick up / open.
function lootUI() {
  const item = state.near, prompt = $('lootPrompt');
  $('touchUse').hidden = !item;
  if (prompt) { prompt.hidden = true; prompt.dataset.id = ''; }
}

export function showModal(eyebrow, title, body, label, action, secondary = null) {
  if ($('modal').hidden) focusBefore = document.activeElement;
  $('modalEyebrow').textContent = eyebrow; $('modalTitle').textContent = title; $('modalBody').innerHTML = body;
  $('modalAction').textContent = label; $('modalAction').onclick = action;
  $('modalSecondary').hidden = !secondary; $('modalSecondary').onclick = secondary;
  $('modal').hidden = false; $('modalAction').focus();
}
export function hideModal() { $('modal').hidden = true; focusBefore?.focus?.(); }

export const HELP_HTML = `<p>${RULES.capacity} đấu sĩ vào trận với cùng 1.000 sinh lực, 100 nội lực, 100 thể lực. Sức mạnh đến từ những gì bạn nhặt được. Người cuối cùng còn đứng là thắng.</p><ul>
<li><b>Chuột trái:</b> đi tới / chọn và đuổi đánh đối thủ / nhặt đồ / mở hòm. <b>WASD</b> cũng di chuyển được. <b>J</b> (hoặc nút <b>ĐÁNH</b>) tự chọn đối thủ gần con trỏ / gần nhất rồi áp sát đánh, không cần nhấp vào địch; <b>Tab</b> đổi mục tiêu. Hình quạt dưới chân cho biết hướng và tầm đòn đánh: vàng theo con trỏ, đỏ khi đã khóa mục tiêu.</li>
<li><b>Q E R:</b> võ công bậc I–IV. <b>T:</b> ô tuyệt kỹ, nhận mọi bậc; bí kíp bậc V chỉ đặt được ở đây. Chuột phải dùng ô đang chọn.</li>
<li><b>Bí kíp:</b> nhặt và trang bị là dùng ngay cấp tối đa của chiêu, không cần luyện cấp. Bậc I–V thể hiện độ hiếm; hình và tiếng vẫn theo chiêu đủ cấp.</li>
<li><b>Tràng An:</b> 16 khu nối bằng đường lớn, đường vòng và 5 cầu. Trận có 100 đấu sĩ; 8 lần thu bo, vòng cuối khép ở phút 28. Bí kíp công kích từ cấp 60 trở lên mới rơi ở map tự do.</li>
<li>Sinh tồn chỉ dùng <b>kỹ năng chủ động</b> và khinh công chung. Kỹ năng bị động được giữ cho cách chơi khác. Hồi chiêu tính theo từng võ học, đổi ô không làm mới hồi chiêu.</li>
<li><b>Binh khí:</b> cầm một món, thay bằng kéo thả hoặc chuột phải trong túi. Kiếm cân bằng · Đao nặng quét rộng · Côn giữ khoảng cách · Thương đâm xa · Quyền sáo combo nhanh · Ám khí tầm xa. Võ công cùng loại binh khí đang cầm được cộng thưởng phẩm chất.</li>
<li><b>Đồ mặc:</b> Y phục giảm sát thương (tối đa 20%), Giày tăng tốc chạy, Hộ uyển giảm hồi chiêu hoặc hao nội lực. Tổng thưởng tấn công tối đa +35%, tổng giảm sát thương tối đa 30%.</li>
<li><b>Space — khinh công:</b> bay tới con trỏ, vượt sông và vật cản, tốn thể lực. Khống chế bị giảm dần: lần 2 trong 3 giây chỉ còn một nửa, lần 3 miễn.</li>
<li><b>B / I — hành trang, C — trang bị:</b> túi 6×10 ô như Võ Lâm 1, tự xếp gọn khi nhặt/dùng đồ. <b>Tự mặc</b> bật mặc định: trang bị cao phẩm hơn cùng vị trí/loại binh khí thay ngay, món thấp bị thay rơi xuống đất; không nhặt món thấp hơn món đang có. Đồ ngang phẩm có dòng khác và loại binh khí khác giữ để tự chọn. Máy tính: bấm để dời, chuột phải để dùng. <b>Điện thoại:</b> chạm một món rồi bấm Mặc/Học/Dùng, Dời hoặc Vứt. Bí kíp tự vào ô võ công còn trống; đủ bốn ô thì vào túi để bạn tự thay. Chết thì cả túi rơi tại chỗ.</li>
<li><b>Vứt đồ:</b> chọn món rồi bấm <b>Vứt</b> (hoặc phím <b>Delete</b>); máy tính còn kéo món ra ngoài cửa sổ túi là vứt. Thuốc có nút <b>Vứt 1</b>. Bí kíp bậc IV–V và đồ phẩm 4–5 hỏi lại một lần cho khỏi nhầm.</li>
<li><b>F:</b> mở hòm (đứng yên vài giây). Võ Lâm Bảo Khố được báo trước trên bản đồ (★) và chứa bí kíp bậc V.</li>
<li><b>Thủ lĩnh ◆:</b> trên bản đồ có thủ lĩnh bậc I–III canh giữ trại đồ. Đánh hạ sẽ rơi bí kíp, binh khí, trang bị và thuốc — bậc càng cao đồ càng quý. Thủ lĩnh không bị bo và không tính vào số cao thủ còn lại; đuổi quá xa trại họ sẽ bỏ cuộc và hồi máu. Vòng bo thu chậm lúc đầu: dùng thời gian đó nhặt đồ và thử võ công lên thủ lĩnh trước khi phải giáp mặt người khác.</li>
<li><b>Ma đầu:</b> xuất hiện ở phút 13, 18 và 23, báo trước 30 giây. Đợt sau mạnh hơn đợt trước; mỗi ma đầu rơi một bí kíp bậc V. Khi thấy báo vận công, né hướng đánh rồi phản công trong khoảng nghỉ. Có thể đánh một mình nếu đã chuẩn bị võ công, trang bị và thuốc.</li>
<li><b>1 / 2:</b> thuốc hồi sinh lực / nội lực. <b>M:</b> bản đồ lớn. <b>Esc:</b> tạm dừng.</li></ul>`;

// Keep keyboard navigation inside a visible dialog.
document.addEventListener('keydown', event => {
  if (event.key !== 'Tab' || $('modal').hidden) return;
  const controls = [...$('modal').querySelectorAll('button:not([disabled]), input:not([disabled]), select, textarea, a[href], summary')].filter(el => !el.hidden && el.getClientRects().length);
  if (!controls.length) return;
  const first = controls[0], last = controls[controls.length - 1];
  if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement))) { event.preventDefault(); first.focus(); }
}, true);
