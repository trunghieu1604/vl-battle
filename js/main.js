// Entry point: loading, input (mouse / keyboard / touch) and the main loop.
import { OPEN_FACTIONS, factionById, avatarOf, isOpen, ZONE_PHASES, WEAPON_TYPES, BOOKS } from './data.js';
import { state, setHooks, newMatch, newTraining, update, cast, leap, drink, pickup, autoTarget, canHarm, swapWeapon, startOpen, setAimProvider, slotOptions, held } from './engine.js';
import { setAnimConfig, setSheets, setPlayerData, preparePlayer, prefetchSheets } from './sprites.js';
import { profileSkin, setProfileSkin, recordMatch, profileLine, initializeProfileStorage } from './profile.js';
import { readJson } from './json-data.js';
import { loadImage, pruneArtCache } from './image-loader.js';
import { generateWorld, prewarm, world, VILLAGE, isWater, enterLayoutWorld, leaveLayoutWorld } from './world.js';
import { TRAINING_ARENA } from './training-arena.js';
import { initTrainingPanel, showTrainingPanel, updateTrainingPanel } from './training-ui.js';
import { render, resize, cam, ui, view, screenToWorld, pickEntity, pickLoot, renderClock } from './render.js';
import { initBag, openBag, openStatus, bagEscape, syncBag, bagOpen } from './bag-ui.js';
import { $, toast, announce, showPlace, renderFactions, renderSkills, hud, drawMaps, showModal, hideModal, HELP_HTML, uiState, onTap } from './ui.js';
import { sound, setSound, setMusic, setScene, tone, loadSfx } from './audio.js';
import { loadVfx, loadStatusFx, preloadSharedArt, preloadSkillArt, requestSkillArt, skillArtReady, skillArtProgress, skillArtWeight } from './vfx.js';
import { BOSSES } from './boss-data.js';
import { loadMapScene } from './scene.js';
import { loadMapTerrain } from './map-terrain.js';
import { fmtTime, clamp } from './util.js';
import { assistedTargetPoint } from './combat-assist.js';
import { initAutoPlay, tickAutoPlay } from './auto-play.js';
import { lineClear } from './world.js';
import { SimulationClock } from './frame-clock.js';
import { device, onDeviceChange, enterLandscape, leaveFullscreen, allowPortrait, setForegroundPlay } from './platform.js';
import { refreshConfig, applyConfig, ops } from './game-config.js';
import { initializeCommunity, communityDiagnostics, mountCommunity, hasSavedRun, confirmReplace, claimRun, beginRun, checkpoint, suspendRun, completeRun, tickCommunity, updateHome } from './community.js';
import { tickTransientEffects } from './transient-effects.js';
import { communityNotice } from './community-notice.js';
import { readMatch, restoreMatch } from './match-save.js';

await initializeProfileStorage();
initChat({ onTyping: on => { if (on) clearInput(); } });   // world chat for everyone, room chat in online survival; idle without the server API
void refreshConfig().then(() => { showOps(); if (!starting) menuButtons(); });   // live settings: the menu banner now, the match values at the next start
const canvas = $('world'), ctx = canvas.getContext('2d');
const keys = new Set();
const pointer = { x: 0, y: 0, down: false, known: false, holdT: 0 };
const joy = { x: 0, y: 0, id: null, cx: 0, cy: 0 };
let attackPointerId = null, worldTap = null;
let touchAttack = false, deskAttack = false, faction = 'hoason', avatarId = null;
const coarse = () => matchMedia('(pointer: coarse)').matches;
try { faction = localStorage.getItem('tieungao-faction') || faction; avatarId = localStorage.getItem('tieungao-avatar'); } catch {}
// only factions open on this map can be played; a saved pick of a locked one falls back to Hoa Sơn
if (!OPEN_FACTIONS.some(f => f.id === faction)) faction = 'hoason';
avatarId = avatarOf(factionById(faction), avatarId).id;
let skin = profileSkin();   // costume kept in the local profile (profile.js)

const input = {
  move() {
    let dx = joy.x + (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0);
    let dy = joy.y + (keys.has('s') || keys.has('arrowdown') ? 1 : 0) - (keys.has('w') || keys.has('arrowup') ? 1 : 0);
    return { dx, dy };
  },
  attackHeld() { return keys.has('j') || touchAttack || deskAttack; },
  aimAngle(e) {
    if (pointer.known && !coarse()) { const w = screenToWorld(pointer.x, pointer.y); return Math.atan2(w.y - e.y, w.x - e.x); }
    const t = autoTarget(e, 320);
    return t ? Math.atan2(t.y - e.y, t.x - e.x) : null;
  },
};

// Aim point for skills: the selected hostile target, else the cursor, else straight ahead.
function aimPoint() {
  const p = state.player;
  if (p.target && p.target.alive && canHarm(p, p.target) && Math.hypot(p.target.x - p.x, p.target.y - p.y) < 650) return p.target;
  if (pointer.known && !coarse()) return screenToWorld(pointer.x, pointer.y);
  const t = autoTarget(p, 420);
  if (t) { p.target = t; return t; }
  return { x: p.x + Math.cos(p.angle) * 200, y: p.y + Math.sin(p.angle) * 200 };
}
function assistedAim(skill) {
  const p = state.player;
  const cursor = pointer.known && !coarse() ? screenToWorld(pointer.x, pointer.y) : null;
  const result = assistedTargetPoint(p, skill, state.heroes.filter(t => t.alive && canHarm(p, t)), cursor, coarse(), lineClear);
  if (result.target) p.target = result.target;
  return result;
}
function castSlot(i) {
  if (!canControl()) return;
  uiState.selected = i;
  const a = assistedAim(state.player.slots[i]);
  cast(state.player, i, a.x, a.y);
}
uiState.castAt = castSlot;
function doLeap() {
  if (!canControl()) return;
  const p = state.player;
  let tx, ty;
  const { dx, dy } = input.move();
  if (Math.hypot(dx, dy) > 0.1) { tx = p.x + dx * 400; ty = p.y + dy * 400; }
  else if (pointer.known && !coarse()) { const w = screenToWorld(pointer.x, pointer.y); tx = w.x; ty = w.y; }
  else { tx = p.x + Math.cos(p.angle) * 400; ty = p.y + Math.sin(p.angle) * 400; }
  leap(p, tx, ty);
}
// Use the nearby chest, or swap the nearby item into the selected (or first allowed) slot.
function interact() {
  const p = state.player, item = state.near;
  if (!item || !canControl()) return;
  if (item.kind === 'chest') { startOpen(p, item); return; }
  const opts = slotOptions(p, item);
  const pick = opts.find(o => o.key === uiState.selected) || (item.kind === 'weapon' ? opts.find(o => o.key === p.wi) : null) || opts[0];
  if (pick) pickup(p, item, pick.key);
}
setAimProvider(() => (pointer.known && !coarse() ? screenToWorld(pointer.x, pointer.y) : null));
// Attacking on a computer without clicking an enemy first (user 2026-10-10): J or the ĐÁNH button takes the selected
// enemy, else the enemy nearest the mouse cursor (within 220 of it), else the nearest enemy within 420 of the player, then
// walks to it and strikes — the phone's ĐÁNH button does the same. With nobody near, the blow goes toward the cursor.
const validFoe = (p, t, range = 650) => t && t.alive && canHarm(p, t) && Math.hypot(t.x - p.x, t.y - p.y) < range;
function pickAttackTarget() {
  const p = state.player;
  if (validFoe(p, p.target)) return p.target;
  if (pointer.known && !coarse()) {
    const w = screenToWorld(pointer.x, pointer.y);
    let best = null, bd = 220;
    for (const t of state.heroes) if (t !== p && validFoe(p, t, 560)) { const d = Math.hypot(t.x - w.x, t.y - w.y); if (d < bd) { bd = d; best = t; } }
    if (best) return best;
  }
  return autoTarget(p, 420);
}
function startAttack() {
  if (!canControl()) return;
  const p = state.player, t = pickAttackTarget();
  if (t) { p.target = t; p.order = { type: 'attack', target: t }; }
}
// the direction the blows go, drawn on the ground (render.js drawAimGuide): the locked enemy, else the cursor
function updateAim() {
  const p = state.player;
  if (coarse() || state.phase !== 'playing' || !p?.alive || !canControl()) { ui.aim = null; return; }
  const t = validFoe(p, p.target) ? p.target : null;
  if (t) { ui.aim = { angle: Math.atan2(t.y - p.y, t.x - p.x), target: t }; return; }
  if (pointer.known) { const w = screenToWorld(pointer.x, pointer.y); ui.aim = { angle: Math.atan2(w.y - p.y, w.x - p.x), target: null }; return; }
  ui.aim = { angle: p.angle, target: null };
}
function cycleTarget() {
  if (!canControl()) return;
  const p = state.player;
  const list = state.entities.filter(e => e.alive && !e.player && canHarm(p, e) && Math.hypot(e.x - p.x, e.y - p.y) < 600).sort((a, b) => Math.hypot(a.x - p.x, a.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y));
  if (!list.length) { toast('Không có mục tiêu nào gần'); return; }
  const i = list.indexOf(p.target);
  p.target = list[(i + 1) % list.length];
}

// ---------- match flow ----------
const LABEL = { solo: 'BẮT ĐẦU TRẬN MỚI', training: 'VÕ TRƯỜNG · MỘC NHÂN' };
const WAIT = 'ĐANG CHUẨN BỊ NHÂN VẬT…';
function menuButtons(busy = null) {
  $('start').innerHTML = busy === 'start' ? WAIT : LABEL.solo;
  $('training').textContent = busy === 'training' ? 'ĐANG CHUẨN BỊ VÕ TRƯỜNG…' : LABEL.training;
  for (const b of [$('start'), $('training')]) b.disabled = !!busy || !world.ready;
  updateHome();
}
let starting = false;
async function start(replaceSaved = false) {
  if (!world.ready || starting) return;
  if (hasSavedRun() && !replaceSaved) { confirmReplace(() => start(true)); return; }
  starting = true; menuButtons('start');
  const chosenFaction = faction, chosenAvatar = avatarId, chosenSkin = skin;
  clearInput();
  if (coarse()) void enterLandscape().then(mode => { if (mode === 'unavailable') toast('Bấm ⛶ để xem cách mở game kín màn hình.'); });
  try {
    await preparePlayer({ id: chosenAvatar, costume: chosenSkin }, Object.keys(WEAPON_TYPES));
    await preloadSkillArt(BOOKS.map(b => b.id));
    const art = skillArtProgress();
    if (art.ready !== art.total) throw Error(`Thiếu hiệu ứng võ học ${art.ready}/${art.total}. Kiểm tra gói asset rồi thử lại.`);
    if (chosenFaction !== faction || chosenAvatar !== avatarId || chosenSkin !== skin) return;
    await refreshConfig();
    showOps();
    if (ops.maintenance) { toast(ops.maintenanceMessage || 'Giang hồ đang bảo trì, mời quay lại sau.'); return; }
    if (!await claimRun()) return;
    exitTraining();
    applyConfig();
    newMatch(faction, avatarId, skin);
    await beginRun();
    prewarm(state.player.x, state.player.y, 1100);
    cam.x = state.player.x; cam.y = state.player.y;
    $('intro').hidden = true; hideModal(); $('bigMapWrap').hidden = true;
    document.body.classList.add('playing');
    showPlace(null);
    toast('Tìm bí kíp và binh khí gần nơi xuất phát. Mọi người đều là đối thủ!');
    tone(330, 0.2, 'sine', 0.08);
    canvas.focus();
    syncDevice();
  } catch (e) { console.error(e); toast(e.message || 'Game chưa tải đủ. Bấm để thử lại.'); }
  finally { starting = false; menuButtons(); }
}
// Training ground: the same engine, items and casts on a small arena with wooden dummies; nothing is recorded.
async function startTraining() {
  if (!world.ready || starting) return;
  starting = true; menuButtons('training');
  const chosenFaction = faction, chosenAvatar = avatarId, chosenSkin = skin;
  clearInput();
  if (coarse()) void enterLandscape();
  try {
  await preparePlayer({ id: chosenAvatar, costume: chosenSkin }, Object.keys(WEAPON_TYPES));
  await preloadSkillArt(BOOKS.map(b => b.id));
  const art = skillArtProgress();
  if (art.ready !== art.total) throw Error(`Thiếu hiệu ứng võ học ${art.ready}/${art.total}. Kiểm tra gói asset rồi thử lại.`);
  if (chosenFaction !== faction || chosenAvatar !== avatarId || chosenSkin !== skin) return;
  enterLayoutWorld(TRAINING_ARENA);
  applyConfig({});   // the training ground always plays the code defaults
  newTraining(faction, avatarId, skin, TRAINING_ARENA);
  prewarm(state.player.x, state.player.y, 1100);
  cam.x = state.player.x; cam.y = state.player.y;
  $('intro').hidden = true; hideModal(); $('bigMapWrap').hidden = true;
  document.body.classList.add('playing');
  initTrainingPanel(toMenu); showTrainingPanel(true);
  showPlace(null); $('placeName').textContent = 'VÕ TRƯỜNG';
  toast('Võ trường: chọn bí kíp, binh khí, trang bị ở bảng bên phải rồi đánh mộc nhân.');
  canvas.focus();
  syncDevice();
  } catch (e) { console.error(e); exitTraining(); toast('Võ trường chưa tải đủ. Bấm để thử lại.'); }
  finally { starting = false; menuButtons(); }
}
// back on the survival map (kept in memory while training) with the quiet menu backdrop
function exitTraining() {
  if (!world.bounds && !state.training) return;
  showTrainingPanel(false);
  leaveLayoutWorld();
  if (state.training) { newMatch(faction, avatarId); state.phase = 'menu'; }
}
async function toMenu() {
  const saveRun = true && state.phase === 'playing' && !state.training;
  if (saveRun) state.paused = true;
  openBag(false); openStatus(false);
  if (saveRun) await suspendRun();
  if (state.replica) { disconnectOnline(); hideLobby(); leaveLayoutWorld(); newMatch(faction, avatarId); state.phase = 'menu'; }
  setChatRoom(false);
  exitTraining();
  state.phase = 'menu'; state.paused = false; hideModal();
  $('intro').hidden = false; $('bigMapWrap').hidden = true; document.body.classList.remove('playing'); clearInput(); syncDevice();
}
function resume() { if (state.phase !== 'playing') return; resetSimulationTime(); state.paused = false; hideModal(); canvas.focus(); syncDevice(); }
function pause() {
  if (state.phase !== 'playing') return;
  // an online match goes on on the server: no pause, only the way out
  if (online()) { showModal('GIANG HỒ VẪN ĐANG DIỄN RA', 'Trận online không tạm dừng được.', '<p>Đóng bảng này để quay lại trận, hoặc rời trận.</p>', 'Quay lại trận', hideModal, toMenu); return; }
  if (state.paused) { resume(); return; }
  state.paused = true; resetSimulationTime(); clearInput(); void setForegroundPlay(false);
  if (true) void checkpoint();
  showModal('DỪNG CHÂN', 'Nghỉ một nhịp.', state.training ? '<p>Võ trường đang tạm dừng. Luyện tập không ghi thành tích.</p>' : '<p>Trận đã tạm dừng. Tiến trình đang được lưu trên máy; chờ báo Đã lưu trước khi đóng game.</p>', state.training ? 'Tiếp tục luyện tập' : 'Tiếp tục giao đấu', resume, toMenu);
  $('modalSecondary').textContent = state.training ? 'Về menu' : 'Lưu & về menu';
}
function help() {
  if (state.phase === 'ended') return;
  if (state.phase === 'playing' && !online()) { state.paused = true; resetSimulationTime(); clearInput(); void setForegroundPlay(false); }
  showModal('CẨM NANG LÃNG KHÁCH', 'Nhập môn giang hồ', HELP_HTML, 'Đã hiểu', () => { if (state.phase === 'playing') resume(); else hideModal(); });
}
function toggleMap(force) {
  if (state.training) return;   // the arena has no map
  const w = $('bigMapWrap');
  w.hidden = force !== undefined ? !force : !w.hidden;
  clearInput();
  if (!w.hidden) drawMaps();
  syncDevice();
}
function finish(won) {
  clearInput(); void setForegroundPlay(false);
  const p = state.player;
  if (!state.training) {
    if (true) completeRun(won);
    else recordMatch({ faction: p.faction.id, won, rank: state.rank, kills: state.kills, bossKills: state.bossKills, time: state.time });
  }
  $('profileLine').textContent = profileLine();

  showModal(won ? 'NHẤT ĐẠI CAO THỦ' : 'HẸN NGÀY TÁI NGỘ', won ? 'Tiếu ngạo giang hồ.' : 'Thắng bại thường tình.',
    `<p>${won ? 'Bạn là người cuối cùng đứng vững giữa giang hồ.' : 'Mỗi lần tái xuất là một cơ duyên võ học mới.'}</p>
     <div class="result-stats"><span><b>#${state.rank}</b>Thứ hạng</span><span><b>${state.kills}</b>Hạ gục</span>${state.bossTotal ? `<span><b>${state.bossKills}/${state.bossTotal}</b>Thủ lĩnh</span>` : ''}<span><b>${Math.round(p.dealt)}</b>Sát thương</span><span><b>${fmtTime(state.time)}</b>Thời gian</span></div>
     ${true ? `<p class="save-explainer">+${100 + Math.floor(state.time / 60) * 10 + state.kills * 25 + state.bossKills * 50 + (won ? 300 : 0)} XP danh vọng · Tiến trình đã được giữ lại. ${won ? 'Bạn đã mở danh hiệu Nhất đại cao thủ.' : 'Trang bị và túi đồ của trận kết thúc tại đây.'}</p>` : ''}
     ${communityNotice}`,
    'Tái xuất giang hồ', () => start(lastMode || undefined), toMenu);
  $('modalSecondary').textContent = 'Về menu';

}
// a short notice of the live settings on the menu (an event, a maintenance window); nothing when it is empty
function showOps() {
  let bar = document.getElementById('opsNotice');
  const text = ops.maintenance ? (ops.maintenanceMessage || 'Giang hồ đang bảo trì, mời quay lại sau.') : ops.announcement;
  if (!text) { bar?.remove(); return; }
  if (!bar) {
    bar = document.createElement('div'); bar.id = 'opsNotice'; bar.setAttribute('role', 'status');
    bar.style.cssText = 'position:relative;z-index:2;margin:0 auto 10px;max-width:640px;padding:8px 14px;border:1px solid #c9a24f;border-radius:6px;background:rgba(20,14,8,.82);color:#f1dc9c;font-size:14px;text-align:center';
    $('intro').prepend(bar);
  }
  bar.textContent = text;
}
setHooks({
  onEnd: won => finish(won),
  onSkills: () => renderSkills(),
  onToast: msg => toast(msg),
  onPlace: p => showPlace(p),
  onAnnounce: m => announce(m),
  onTell: t => toast(t),
  onHumanOut: () => {},
  onBag: open => { if (open) clearInput(); }
});   // online: the player's commands and input go to the match server
initBag();
initAutoPlay();
let resumePanel = false;
if (true) mountCommunity({
  ready: () => world.ready,
  pauseForPanel() {
    if ($('modal').hidden) resumePanel = state.phase === 'playing' && !state.paused;
    if (state.phase === 'playing') { state.paused = true; clearInput(); resetSimulationTime(); void checkpoint(); }
  },
  resumeAfterPanel() { if (resumePanel && state.phase === 'playing') resume(); resumePanel = false; },
  pauseForBag() { clearInput(); resetSimulationTime(); syncDevice(); },
  resumeAfterBag() { clearInput(); resetSimulationTime(); syncDevice(); },
  async restore(run, saved) {
    await preparePlayer(saved.player.look, Object.keys(WEAPON_TYPES));
    await preloadSkillArt(BOOKS.map(b => b.id));
    if (skillArtProgress().ready !== skillArtProgress().total) throw Error('Hiệu ứng chưa tải đủ. Hãy kiểm tra asset và thử lại.');
    exitTraining();
    generateWorld(run.meta.seed); applyConfig({});
    restoreMatch(run, saved);
    faction = state.player.faction.id; avatarId = state.player.avatar.id; skin = state.player.look.costume || skin;
    prewarm(state.player.x, state.player.y, 1100);
    cam.x = state.player.x; cam.y = state.player.y;
    $('intro').hidden = true; $('bigMapWrap').hidden = true; hideModal();
    document.body.classList.add('playing'); renderSkills(); hud(); drawMaps();
    showPlace(state.place); resetSimulationTime(); clearInput(); canvas.focus(); syncDevice();
  },
});

function canControl() { return state.phase === 'playing' && !bagOpen() && !state.paused && !device.blocked && $('bigMapWrap').hidden && $('modal').hidden; }
function clearInput() {
  keys.clear(); pointer.down = false; touchAttack = false; deskAttack = false; worldTap = null; attackPointerId = null;
  const id = joy.id; releaseStick();
  const zone = $('moveZone'); if (id !== null && zone?.hasPointerCapture(id)) zone.releasePointerCapture(id);
}
function syncDevice() {
  $('rotateScreen').hidden = !(state.phase === 'playing' && device.touch && device.portrait && !device.portraitAllowed && $('modal').hidden);
  $('fullscreen').textContent = device.fullscreen ? '⤢' : '⛶';
  $('fullscreen').setAttribute('aria-label', device.fullscreen ? 'Thoát toàn màn hình' : 'Mở toàn màn hình');
  $('fullscreen').title = device.fullscreen ? 'Thoát toàn màn hình' : 'Mở toàn màn hình';
  const blocked = !canControl();
  document.querySelector('.combat-hud').inert = blocked;
  document.querySelector('.touch-controls').inert = blocked;
  if (blocked) clearInput();
  void setForegroundPlay(!blocked);
}
let inputOrientation = device.portrait;
onDeviceChange(() => {
  resize(canvas);
  // Browser chrome scrolling/resizing must not cancel a held movement finger.
  if (inputOrientation !== device.portrait || device.blocked) { clearInput(); resetSimulationTime(); }
  inputOrientation = device.portrait; syncDevice();
});
function fullscreenGuide() {
  const wasPaused = state.paused, playing = state.phase === 'playing';
  if (playing) { state.paused = true; resetSimulationTime(); clearInput(); }
  const apple = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const instructions = apple
    ? '<ol><li>Mở đường link game bằng <b>Safari</b>.</li><li>Bấm <b>Chia sẻ → Thêm vào Màn hình chính</b>.</li><li>Bật <b>Mở dưới dạng ứng dụng web</b> nếu có, rồi bấm Thêm.</li><li>Mở biểu tượng Giang Hồ Chi Chiến trên màn hình chính và xoay ngang.</li></ol>'
    : '<p>Mở đường link bằng Chrome hoặc trình duyệt của điện thoại rồi thử nút ⛶. Bạn cũng có thể chọn <b>Cài đặt ứng dụng / Thêm vào màn hình chính</b> trong menu trình duyệt.</p>';
  showModal('CHƠI KÍN MÀN HÌNH', 'Mở game như ứng dụng', '<p>Trình duyệt đang dùng chưa cho game ẩn thanh địa chỉ.</p>' + instructions,
    playing ? 'Trở lại trận' : 'Đã hiểu', () => {
      if (playing && wasPaused) { state.paused = false; pause(); }
      else if (playing) resume();
      else { hideModal(); syncDevice(); }
    });
  syncDevice();
}
async function fullscreenButton() {
  if (device.fullscreen) { await leaveFullscreen(); return; }
  const mode = await enterLandscape();
  if (mode === 'unavailable') fullscreenGuide();
}
$('fullscreen').onclick = fullscreenButton;
$('rotateFullscreen').onclick = fullscreenButton;
$('portraitContinue').onclick = allowPortrait;

// ---------- keyboard ----------
document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (e.target instanceof Element && e.target.closest('input, select, textarea')) return;   // typing in the training panel
  // Enter opens the chat (chat.js) unless a button or a dialog has the keyboard
  if (k === 'enter' && (document.activeElement === document.body || document.activeElement === canvas) && $('modal').hidden && chatKey(e)) { e.preventDefault(); clearInput(); return; }
  if (!$('modal').hidden && k !== 'escape') return;
  if (bagOpen() && k !== 'escape' && k !== 'b') return;
  if ([' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'tab'].includes(k) && canControl()) e.preventDefault();
  if (k === 'escape') {
    if (bagEscape()) return;
    if (!$('bigMapWrap').hidden) { toggleMap(false); return; }
    if (!$('modal').hidden && state.phase === 'playing') resume();
    else if (!$('modal').hidden && state.phase === 'menu') { if (!$('modalSecondary').hidden) $('modalSecondary').click(); else hideModal(); }
    else if (state.phase === 'ended') toMenu();
    else pause();
    return;
  }
  if (k === 'tab' && !$('modal').hidden) {
    const buttons = [...$('modal').querySelectorAll('button:not([hidden])')];
    if (e.shiftKey && document.activeElement === buttons[0]) { e.preventDefault(); buttons.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === buttons.at(-1)) { e.preventDefault(); buttons[0].focus(); }
    return;
  }
  if (k === 'm' && state.phase === 'playing') { toggleMap(); return; }
  if ((k === 'b' || k === 'i' || k === 'c') && state.phase === 'playing' && !e.repeat && $('modal').hidden && $('bigMapWrap').hidden) { if (k === 'c') openStatus(); else openBag(); return; }
  if (!canControl()) return;
  keys.add(k);
  if (e.repeat) return;
  const p = state.player;
  if (k === ' ') doLeap();
  else if ('qert'.includes(k) && k.length === 1) castSlot('qert'.indexOf(k));
  else if (k === '1') drink(p, 'hp');
  else if (k === '2') drink(p, 'mp');
  else if (k === 'x') swapWeapon(p);
  else if (k === 'tab') cycleTarget();
  else if (k === 'j') startAttack();
  else if (k === 'f') interact();
  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) p.order = null;
});
document.addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));

// ---------- mouse ----------
function clickWorld(sx, sy) {
  const p = state.player, w = screenToWorld(sx, sy);
  const ent = pickEntity(w.x, w.y);
  if (ent) {
    p.target = ent;
    if (canHarm(p, ent)) p.order = { type: 'attack', target: ent };
    return;
  }
  const item = pickLoot(w.x, w.y);
  if (item) { p.order = { type: item.kind === 'chest' ? 'open' : 'pickup', item }; return; }
  p.order = { type: 'move', x: w.x, y: w.y };
  ui.marker = { x: w.x, y: w.y, t: renderClock() };
}
canvas.addEventListener('pointermove', e => {
  pointer.x = e.clientX; pointer.y = e.clientY;
  if (e.pointerType === 'mouse') pointer.known = true;
});
canvas.addEventListener('pointerdown', e => {
  if (!canControl()) return;
  if (e.pointerType !== 'mouse') { if (!worldTap) { worldTap = { id: e.pointerId, x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId); } return; }
  pointer.x = e.clientX; pointer.y = e.clientY; pointer.known = true;
  if (e.button === 2) { castSlot(uiState.selected); return; }
  if (e.button !== 0) return;
  pointer.down = true; pointer.holdT = 0;
  canvas.setPointerCapture(e.pointerId);
  clickWorld(e.clientX, e.clientY);
});
canvas.addEventListener('pointerup', e => { pointer.down = false; if (worldTap?.id === e.pointerId) { if (canControl() && Math.hypot(e.clientX - worldTap.x, e.clientY - worldTap.y) < 14) clickWorld(e.clientX, e.clientY); worldTap = null; } });
canvas.addEventListener('pointercancel', () => { pointer.down = false; worldTap = null; });
canvas.addEventListener('contextmenu', e => e.preventDefault());

// Two fingers on the battlefield pinch the camera zoom, the mouse wheel does the same; kept on this device.
const pinch = new Map();
let pinchStart = null;
function setZoom(z) { view.userZoom = clamp(z, 0.7, 1.6); try { localStorage.setItem('tieungao-zoom', view.userZoom.toFixed(2)); } catch {} }
try { view.userZoom = clamp(+localStorage.getItem('tieungao-zoom') || 1, 0.7, 1.6); } catch {}
const spread = () => { const [a, b] = [...pinch.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
canvas.addEventListener('pointerdown', e => {
  if (e.pointerType === 'mouse') return;
  pinch.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pinch.size === 2) { worldTap = null; pinchStart = { d: spread(), z: view.userZoom }; }
});
canvas.addEventListener('pointermove', e => {
  if (!pinch.has(e.pointerId)) return;
  pinch.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pinch.size === 2 && pinchStart?.d > 20) setZoom(pinchStart.z * spread() / pinchStart.d);
});
for (const n of ['pointerup', 'pointercancel']) canvas.addEventListener(n, e => { pinch.delete(e.pointerId); if (pinch.size < 2) pinchStart = null; });
canvas.addEventListener('wheel', e => { if (state.phase !== 'playing') return; e.preventDefault(); setZoom(view.userZoom * (e.deltaY < 0 ? 1.08 : 1 / 1.08)); }, { passive: false });
// iOS Safari ignores user-scalable=no: block its page pinch and double-tap zoom so only the camera zooms.
for (const n of ['gesturestart', 'gesturechange', 'gestureend', 'dblclick']) document.addEventListener(n, e => e.preventDefault(), { passive: false });

// ---------- touch ----------
// Floating stick (as in VLTK mobile): a thumb anywhere on the left part of the screen brings the stick's base under it;
// a thumb on the resting base uses it where it is. The base goes back to its place when the thumb lifts.
const joystick = $('joystick'), moveZone = document.createElement('div');
moveZone.id = 'moveZone'; moveZone.setAttribute('aria-hidden', 'true');
document.querySelector('.touch-controls').prepend(moveZone);
function updateStick(e) {
  const radius = joystick.offsetWidth * 0.36;
  const dx = e.clientX - joy.cx, dy = e.clientY - joy.cy, len = Math.hypot(dx, dy), s = len > radius ? radius / len : 1;
  joy.x = dx * s / radius; joy.y = dy * s / radius;
  $('stick').style.transform = `translate(${dx * s}px,${dy * s}px)`;
  if (state.player) state.player.order = null;
}
function releaseStick() { joy.x = joy.y = 0; joy.id = null; $('stick').style.transform = ''; $('joystick').style.transform = ''; $('joystick').classList.remove('active'); }
moveZone.addEventListener('pointerdown', e => {
  e.preventDefault();
  if (!canControl() || joy.id !== null) return;
  const r = joystick.getBoundingClientRect(), half = r.width / 2, rx = r.left + half, ry = r.top + half;
  if (Math.hypot(e.clientX - rx, e.clientY - ry) <= half) { joy.cx = rx; joy.cy = ry; }
  else {
    joy.cx = clamp(e.clientX, half + 4, innerWidth - half - 4); joy.cy = clamp(e.clientY, half + 4, innerHeight - half - 4);
    joystick.style.transform = `translate(${joy.cx - rx}px,${joy.cy - ry}px)`;
  }
  joy.id = e.pointerId; moveZone.setPointerCapture(e.pointerId); joystick.classList.add('active'); updateStick(e);
});
moveZone.addEventListener('pointermove', e => { if (joy.id === e.pointerId) updateStick(e); });
for (const n of ['pointerup', 'pointercancel']) window.addEventListener(n, e => { if (e.pointerId === joy.id) releaseStick(); }, true);
// A lost capture alone is not a lifted finger; recover from subsequent motion.
window.addEventListener('pointermove', e => { if (joy.id === e.pointerId) updateStick(e); });
$('touchAttack').addEventListener('pointerdown', e => {
  if (!canControl() || attackPointerId !== null) return;
  attackPointerId = e.pointerId; touchAttack = true; e.currentTarget.setPointerCapture(e.pointerId);
  const p = state.player;
  if (!p.target || !p.target.alive || !canHarm(p, p.target)) p.target = autoTarget(p, 420);
  if (p.target) p.order = { type: 'attack', target: p.target };
});
for (const n of ['pointerup', 'pointercancel', 'lostpointercapture']) $('touchAttack').addEventListener(n, e => { if (e.pointerId === attackPointerId) { touchAttack = false; attackPointerId = null; } });
onTap($('touchTarget'), cycleTarget);
onTap($('touchUse'), interact);

// ---------- buttons ----------
$('start').onclick = () => start(canOnline() ? 'online' : 'bots');
practice.onclick = () => start('bots');
$('training').onclick = startTraining;
onTap($('dodge'), doLeap);
// PC: the ĐÁNH button works like holding J (startAttack picks the enemy; the blows go on while it is held)
$('deskAttack').addEventListener('pointerdown', e => {
  if (e.button !== 0 || !canControl()) return;
  e.preventDefault(); deskAttack = true; $('deskAttack').classList.add('on'); e.currentTarget.setPointerCapture(e.pointerId); startAttack();
});
for (const n of ['pointerup', 'pointercancel', 'lostpointercapture']) $('deskAttack').addEventListener(n, () => { deskAttack = false; $('deskAttack').classList.remove('on'); canvas.focus(); });
$('pause').onclick = pause;
$('home').onclick = e => { e.preventDefault(); pause(); };
$('help').onclick = help;
$('mapBtn').onclick = () => toggleMap();
$('minimap').onclick = () => { if (state.phase === 'playing') toggleMap(true); };
$('closeMap').onclick = () => toggleMap(false);
$('bigMapWrap').addEventListener('click', e => { if (e.target === $('bigMapWrap')) toggleMap(false); });
function soundLabel() { $('sound').textContent = sound.on ? 'ÂM: BẬT' : 'ÂM: TẮT'; $('sound').setAttribute('aria-label', sound.on ? 'Tắt âm thanh' : 'Bật âm thanh'); }
$('sound').onclick = () => { setSound(!sound.on); soundLabel(); tone(660, 0.15); };
function musicLabel() { $('music').textContent = sound.music ? 'NHẠC: BẬT' : 'NHẠC: TẮT'; $('music').setAttribute('aria-label', sound.music ? 'Tắt nhạc nền' : 'Bật nhạc nền'); }
$('music').onclick = () => { setMusic(!sound.music); musicLabel(); };
soundLabel(); musicLabel();

// Ambient bed and music follow the player: menu, village, near water, wild, and the last circles.
let sceneClock = 0;
const NEAR = [[0, 0], [160, 0], [-160, 0], [0, 160], [0, -160]];
function updateScene(dt) {
  if ((sceneClock -= dt) > 0) return;
  sceneClock = 0.5;
  const p = state.player;
  if (state.phase !== 'playing' || !p) { setScene({ ambient: 'amb.village', music: 'music.menu' }); return; }
  const village = p.x > VILLAGE.x && p.x < VILLAGE.x + VILLAGE.w && p.y > VILLAGE.y && p.y < VILLAGE.y + VILLAGE.h;
  const wet = NEAR.some(([dx, dy]) => isWater(p.x + dx, p.y + dy));
  const late = state.zone && state.zone.phase >= ZONE_PHASES.length - 2;
  setScene({ ambient: late ? null : wet ? 'amb.water' : village ? 'amb.village' : 'amb.wild', music: late ? 'music.battle' : village ? 'music.village' : 'music.wild' });
}
// Changing faction keeps the gender when the new faction has it.
// Locked ("Sắp mở") factions and avatars cannot be picked.
function pickFaction(id, avId) {
  const f = factionById(id), old = factionById(faction).avatars.find(a => a.id === avatarId);
  const open = f.avatars.filter(isOpen);
  if (!open.length || (avId && !open.some(a => a.id === avId))) return;
  faction = id;
  avatarId = (open.find(a => a.id === avId) || open.find(a => a.gender === old?.gender) || open[0]).id;
  try { localStorage.setItem('tieungao-faction', faction); localStorage.setItem('tieungao-avatar', avatarId); } catch {}
  renderFactions(faction, avatarId, pickFaction, skin, pickSkin);
}
// Costume (looks only): kept in the profile; the preview loads its parts while showing it.
function pickSkin(id) {
  setProfileSkin(id); skin = profileSkin();
  renderFactions(faction, avatarId, pickFaction, skin, pickSkin);
}
renderFactions(faction, avatarId, pickFaction, skin, pickSkin);
$('profileLine').textContent = profileLine();

window.addEventListener('blur', () => { clearInput(); if (state.phase === 'playing' && !state.paused) pause(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) { clearInput(); if (state.phase === 'playing' && !state.paused) pause(); } });

// ---------- loop ----------
const frameCosts = [];
// Opt-in development attribution; retain a small bounded list, no per-frame objects.
const profileFrames = new URLSearchParams(location.search).get('profileFrames') === '1';
const slowFrames = [];
function frameMetrics() {
  const costs = [...frameCosts].sort((a,b) => a-b);
  return { slowFrames: [...slowFrames], samples: costs.length, p50Ms: costs.length ? +costs[Math.floor(costs.length*.5)].toFixed(1) : null, p95Ms: costs.length ? +costs[Math.min(costs.length-1,Math.floor(costs.length*.95))].toFixed(1) : null };
}
let last = 0, uiClock = 0, hoverClock = 0, holdClock = 0, attackClock = 0;
const simulationClock = new SimulationClock(coarse() ? 1 / 30 : 1 / 60); let simulationPlayer = null;
function resetSimulationTime() { last = performance.now(); simulationClock.reset(); }
// Frame budget. Without it a 120 Hz phone draws the whole scene 120 times a second and heats up. Touch devices play
// at 30 fps (VLTK sprites animate at 10–18 fps), desktops at most 60, the menu backdrop at 20.
const frameMs = () => (state.phase === 'menu' ? (coarse() ? 100 : 50) : !canControl() ? 100 : coarse() ? 1000 / 30 : 1000 / 60) - 2;
function frame(now) {
  requestAnimationFrame(frame);
  if (document.hidden) { last = now; simulationClock.reset(); return; }
  if (now - last < frameMs()) return;
  const began = performance.now(), measure = canControl();
  let afterSimulation = began, afterCheckpoint = began, afterScene = began, afterRender = began;
  const dt = Math.min((now - last) / 1000 || 0.016, 0.1);
  last = now;
  if (canControl()) {
    // hold left mouse on the ground to keep walking toward the cursor
    holdClock += dt;
    const p = state.player;
    if (pointer.down && holdClock > 0.12 && (!p.order || p.order.type === 'move')) {
      holdClock = 0;
      const w = screenToWorld(pointer.x, pointer.y);
      p.order = { type: 'move', x: w.x, y: w.y };
    }
    // attack held (J / ĐÁNH): when the enemy falls or runs off, take the next one in reach
    attackClock += dt;
    if ((keys.has('j') || deskAttack) && attackClock > 0.25 && !validFoe(p, p.target)) { attackClock = 0; startAttack(); }
    if (simulationPlayer !== state.player) { simulationPlayer = state.player; simulationClock.reset(); }
    simulationClock.advance(dt, step => update(step, input));
    if (profileFrames) afterSimulation = performance.now();
    if (true) tickCommunity();
    if (profileFrames) afterCheckpoint = performance.now();
    tickAutoPlay(now);
  } else simulationClock.reset();
  updateScene(dt);
  if (profileFrames) afterScene = performance.now();
  if (world.ready) {
    updateAim();
    const presentationDt = state.phase === 'playing' && !canControl() ? 0 : dt;
    tickTransientEffects(state, presentationDt);
    render(ctx, presentationDt);
    if (profileFrames) afterRender = performance.now();
    hoverClock += dt;
    if (hoverClock > 0.08 && pointer.known && state.phase === 'playing') {
      hoverClock = 0;
      const w = screenToWorld(pointer.x, pointer.y);
      ui.hover = pickEntity(w.x, w.y);
      canvas.style.cursor = ui.hover ? (canHarm(state.player, ui.hover) ? 'crosshair' : 'help') : pickLoot(w.x, w.y) ? 'pointer' : 'default';
    }
    uiClock += dt;
    if (uiClock > 0.1 && state.player) { uiClock = 0; if (state.phase !== 'menu') { hud(); updateTrainingPanel(); } drawMaps(); syncBag(); }
  }
  if (measure) {
    const ended = performance.now(), duration = ended - began;
    frameCosts.push(duration); if (frameCosts.length > 600) frameCosts.shift();
    if (profileFrames && duration >= 50) {
      const ms = value => +value.toFixed(2);
      slowFrames.push({ at: ms(began), simulationSeconds: state.time, totalMs: ms(duration), simulationMs: ms(afterSimulation-began), checkpointMs: ms(afterCheckpoint-afterSimulation), sceneMs: ms(afterScene-afterCheckpoint), renderMs: ms(afterRender-afterScene), hudMs: ms(ended-afterRender) });
      if (slowFrames.length > 30) slowFrames.shift();
    }
  }
}

// ---------- boot ----------
resize(canvas);
requestAnimationFrame(frame);
// Animation data is a plain JSON file so it can be tuned in studio.html without touching code.
// The studio can also store a preview copy in localStorage, which wins until it is cleared there.
// The start screen waits only for what it shows: the manifests (fetched together), the chosen figure standing, and one
// coherent scenery set. Everything else follows in the background (afterMenu), in the order the match needs it: the
// figure's other moves, the shared effect art and state images, the hand-painted sheets, then the manuals' art.
let afterMenu = async () => {};
async function loadAnimation() {
  const nc = { cache: 'no-cache' };
  const [cfg, manifest, dummy, player, fx, status, kit] = await Promise.all([
    readJson('data/animations.json', nc),
    readJson('data/sprites.json', nc).catch(() => ({ sheets: {} })),
    // training dummy (tools/vltk1-import/export-training-dummy.cjs) lives in its own manifest; merged, never written back
    readJson('data/vltk-training.json', nc).catch(err => { console.warn('Thiếu hình mộc nhân cho võ trường', err); return null; }),
    readJson('data/vltk-player.json', nc),
    // Missing martial-art sources fail loading instead of silently showing unrelated fallback artwork.
    readJson('data/vltk-fx.json', nc),
    // states drawn from the client's own state images (choáng); see tools/vltk1-import/export-status-fx.cjs
    readJson('data/vltk-status.json', nc).catch(() => null),
    readJson('data/vltk-map-kit.json', nc),
  ]);
  setAnimConfig(cfg);
  try { const preview = localStorage.getItem('tieungao-anim-preview'); if (preview) { setAnimConfig(JSON.parse(preview)); console.info('Đang dùng hoạt ảnh xem thử từ Xưởng hoạt ảnh'); } }
  catch { console.warn('Bản thử hoạt ảnh không hợp lệ; đang dùng cấu hình gốc.'); }
  if (dummy?.sheets) manifest.sheets = { ...manifest.sheets, ...dummy.sheets };
  // hand-painted sheets load when first drawn (the full roster is tens of MB); the chosen weapon's shared set, the
  // avatar's own and the training dummy are fetched right after the start screen
  // character / monster art always goes ahead of the manuals' background art: a figure on screen must not wait behind
  // 45 MB of effects (it is drawn as nothing until its own art arrives, sprites.js getFrame)
  setSheets(manifest, {}, f => loadImage(`data/${f}`, { urgent: true }));
  const sheetFiles = sh => [sh?.image, ...Object.values(sh?.actions || {}).map(a => a.image)].filter(Boolean);
  const first = [...new Set(Object.entries(manifest.sheets || {}).filter(([k]) => k === `*.${factionById(faction).weapon}` || k.startsWith(`${avatarId}.`) || k === 'mocnhan').flatMap(([, sh]) => sheetFiles(sh)))];
  // VLTK1 player characters are assembled from parts: the chosen avatar standing with its faction weapon now, its
  // other moves right after (start() waits for every weapon of the pick before a match)
  const look = { id: avatarId, costume: skin }, weapon = factionById(faction).weapon;
  if (player) setPlayerData(player);
  // the match only needs the art of the manuals that can drop on this map: lazy (startSkillArt), the pool is ~45 MB
  await Promise.all([loadVfx(fx, loadImage, BOOKS.map(b => b.id), { lazy: true }), loadSfx(fx)]);
  if (true) await initializeCommunity();
  // Keep the start screen locked until the figure stands and one coherent scenery set is ready.
  await Promise.all([player ? preparePlayer(look, [weapon], ['idle']) : null, loadMapScene(kit, loadImage), loadMapTerrain(kit, loadImage)]);
  afterMenu = async () => {
    if (player) await preparePlayer(look, [weapon]).catch(err => console.warn('Nhân vật chưa tải đủ', err));
    await Promise.allSettled([preloadSharedArt(), loadStatusFx(status), prefetchSheets(first)]);
  };
}
loadAnimation().then(async () => {
  await (document.fonts?.ready ?? Promise.resolve());
  await new Promise(r => setTimeout(r, 30));
  const t0 = performance.now();
  generateWorld((Math.random() * 1e9) | 0);
  prewarm(VILLAGE.cx, VILLAGE.cy - 40, 1300);
  console.info(`World generated in ${Math.round(performance.now() - t0)} ms, ${world.props.length} props`);
  // the menu shows the village with a quiet idle player placeholder
  newMatch(faction, avatarId); state.phase = 'menu';
  menuButtons(); updateHome();
  // the rest in the background: the figure's moves and shared art first, then the manuals' art
  showArtProgress();
  void afterMenu().then(startSkillArt, startSkillArt);
  if (new URLSearchParams(location.search).get('mode') === 'training') void startTraining();
}).catch(err => {
  console.error(err);
  $('start').textContent = 'Tải lại giang hồ'; $('start').disabled = false; $('start').onclick = () => location.reload();
  toast('Cảnh chưa tải xong. Chạm tải lại để thử lại.');
});

// Background art of the manuals: the starting kit's tiers and the boss kits first, then the rest from the lightest
// atlas to the heaviest (one manual alone is 16 MB). A manual the player holds is fetched urgently (urgentPlayerArt);
// engine.js refuses to cast a manual whose art is not in memory yet, for the player, the bots and the bosses alike.
let artDone = false;
function startSkillArt() {
  const lowTiers = [...new Set(BOOKS.map(b => b.tier))].sort((a, b) => a - b).slice(0, 2);
  const bossKits = new Set(BOSSES.flatMap(b => b.kit || []));
  const rank = b => (lowTiers.includes(b.tier) ? 0 : bossKits.has(b.id) ? 1 : 2);
  const order = [...BOOKS].sort((a, b) => rank(a) - rank(b) || skillArtWeight(a.id) - skillArtWeight(b.id)).map(b => b.id);
  urgentPlayerArt();
  void preloadSkillArt(order).then(() => { artDone = skillArtProgress().ready === skillArtProgress().total; showArtProgress(); if (artDone) void pruneArtCache(); });
  const tick = setInterval(() => { showArtProgress(); if (artDone || skillArtProgress().ready === skillArtProgress().total) { artDone = true; showArtProgress(); clearInterval(tick); } }, 1000);
  showArtProgress();
}
function urgentPlayerArt() {
  const p = state.player; if (!p || state.phase === 'menu') return;
  for (const b of [...p.slots, ...(p.bag?.items || []).map(i => i.book)]) if (b?.id && !skillArtReady(b.id)) void requestSkillArt(b.id, true).catch(() => {});
}
// a quiet line on the menu while the art is still coming; gone once everything is in
function showArtProgress() {
  const { ready, total } = skillArtProgress();
  let line = document.getElementById('artProgress');
  if (ready >= total) { line?.remove(); return; }
  if (!line) {
    line = document.createElement('div'); line.id = 'artProgress'; line.setAttribute('aria-live', 'polite');
    line.style.cssText = 'position:relative;z-index:2;margin:6px auto 0;max-width:640px;text-align:center;font-size:13px;color:#d9c79a;opacity:.85';
    $('intro').append(line);
  }
  line.textContent = `Đang tải hiệu ứng võ học ${ready}/${total} — chờ tải đủ để vào trận với đầy đủ hiệu ứng.`;
}

// Read-only status hook for QA and agent tooling. ready = the menu, the manuals' art and everything else are in memory
// (the start button opens earlier: menuReady); QA casts manuals right after it.
const snapshot = () => {
  const p = state.player;
  return { performance: frameMetrics(), save: communityDiagnostics(), inputBlocked: !canControl(), portrait: device.portrait, mapOpen: !$('bigMapWrap').hidden, phase: state.phase, paused: state.paused, time: Math.round(state.time), alive: state.heroes.filter(h => h.alive && !h.boss).length, bosses: state.heroes.filter(h => h.alive && h.boss).length, bossKills: state.bossKills, kills: state.kills, ready: world.ready && artDone, menuReady: world.ready, art: skillArtProgress(),
    training: !!state.training, dummies: state.training ? state.heroes.filter(h => h.dummy).map(h => ({ name: h.name, alive: h.alive, hp: Math.round(h.hp), x: Math.round(h.x), y: Math.round(h.y) })) : undefined,
    player: p && { x: Math.round(p.x), y: Math.round(p.y), z: Math.round(p.z), hp: Math.round(p.hp), mana: Math.round(p.mp), stamina: Math.round(p.st), weapon: held(p).name,
      skills: p.slots.map(s => s?.name ?? null), inner: p.noi?.name ?? null, movement: p.than?.name ?? null } };
};
window.giangHo = { snapshot };
if (document.modelContext?.registerTool) {
  try { Promise.resolve(document.modelContext.registerTool({ name: 'read_match_status', title: 'Đọc trạng thái trận', description: 'Đọc sinh lực, binh khí, võ công và số người còn lại trong trận Giang Hồ Chi Chiến.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true }, execute(input) { if (input && Object.keys(input).length) throw new Error('Không nhận tham số'); return snapshot(); } })).catch(() => {}); } catch {}
}
