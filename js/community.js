import { state } from './engine.js';
import { profile, saveProfile, recordMatch, profileLine } from './profile.js';
import { captureMatch, readMatch } from './match-save.js';
import { loadSave, writeSave, makeEnvelope, validateEnvelope, saveStatus } from './save-store.js';
import { progression, discoverBooks, TITLES } from './progression.js';
import { readGuestName, saveGuestName } from './guest-name.js';
import { sound, setSound, setMusic } from './audio.js';
import { $, showModal, hideModal, toast } from './ui.js';
import { fmtTime } from './util.js';

let savedRun = null, activeId = null, lastCheckpoint = -Infinity, api, continueButton, info, status;
let restoreError = null, storageUnavailable = false, busy = false;
let releaseRunLock = null;
let baseSaveAt = 0;
const checkpointTiming = { captureMs: 0, nodes: 0 };
export const communityDiagnostics = () => ({ saved: !!savedRun, runTime: savedRun?.meta.time, locked: !!releaseRunLock, error: saveStatus.error, ...checkpointTiming });
const LOCK = 'giangho-offline-writer';
function replaceProfile(value) {
  for (const key of Object.keys(profile)) delete profile[key];
  Object.assign(profile, value);
  progression(profile);
}
export async function claimRun() {
  if (releaseRunLock || !navigator.locks) return true;
  const acquired = await new Promise(resolve => {
    navigator.locks.request(LOCK, { ifAvailable: true }, lock => {
      if (!lock) { error('Game đang mở ở tab khác. Tạm dừng và trở về menu ở tab đó trước.'); resolve(false); return; }
      return new Promise(release => { releaseRunLock = release; resolve(true); });
    }).catch(e => { error('Không mở được phiên lưu: ' + e.message); resolve(false); });
  });
  if (!acquired) return false;
  try {
    const latest = await loadSave(value => { validateEnvelope(value); if (value.run) readMatch(value.run); return value; });
    if (latest && latest.at > baseSaveAt) {
      const skin = profile.skin;
      replaceProfile(latest.profile); profile.skin = skin;
      savedRun = latest.run; baseSaveAt = latest.at; updateHome();
    }
    saveStatus.error = null;
    return true;
  } catch (e) { releaseLock(); error('Không đọc được phiên lưu mới nhất: ' + e.message); return false; }
}
function releaseLock() { releaseRunLock?.(); releaseRunLock = null; }
async function commit(value, options) {
  if (releaseRunLock || !navigator.locks) { const result = await writeSave(value, options); baseSaveAt = value.at; return result; }
  return navigator.locks.request(LOCK, { ifAvailable: true }, async lock => {
    if (!lock) throw Error('Tab khác đang chơi. Chưa ghi đè dữ liệu.');
    const latest = await loadSave();
    if (!options?.replace && latest && latest.at > baseSaveAt) throw Error('Save đã đổi ở tab khác. Tải lại game trước khi lưu.');
    const result = await writeSave(value, options); baseSaveAt = value.at; return result;
  });
}
const TERMINAL_KEY = 'giangho.terminal.v1';
const SETTINGS = ['tieungao-faction', 'tieungao-avatar', 'tieungao-zoom', 'giangho-music', 'giangho-sound', 'vlst.guestName'];
const escape = text => String(text ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
function settings() {
  try { return Object.fromEntries(SETTINGS.map(key => [key, localStorage.getItem(key)])); } catch { return {}; }
}
function error(message) { saveStatus.error = message; updateHome(); toast(message); }
export async function initializeCommunity() {
  try {
    const value = await loadSave(value => { validateEnvelope(value); if (value.run) readMatch(value.run); return value; });
    if (value) {
      baseSaveAt = value.at;
      replaceProfile(value.profile);
      // A small synchronous death journal closes the gap if the process exits
      // before the IndexedDB terminal transaction finishes.
      try {
        const terminal = JSON.parse(localStorage.getItem(TERMINAL_KEY));
        if (terminal?.at > value.at && terminal.profile?.v === 1) {
          replaceProfile(terminal.profile);
          if (value.run?.meta.id === terminal.id) value.run = null;
        }
      } catch { /* IndexedDB remains the primary save. */ }
      saveProfile();
      savedRun = value.run;
      if (savedRun) { try { readMatch(savedRun); } catch (e) { restoreError = e.message; } }
    }
  } catch (e) { storageUnavailable = true; restoreError = e.message; }
  progression(profile);
  if (savedRun && document.querySelector('.community-customize')) document.querySelector('.community-customize').open = false;
}
export function hasSavedRun() { return !!savedRun; }
export function confirmReplace(action) {
  showModal('TRẬN ĐANG LƯU', 'Bắt đầu hành trình mới?', '<p>Trận đang lưu sẽ được thay thế. Trang bị và hành trang của trận cũ không mang sang trận mới. Tiến trình và mở khóa được giữ nguyên.</p>', 'Bắt đầu trận mới', action, () => { hideModal(); if (!activeId) releaseLock(); });
  $('modalSecondary').textContent = 'Giữ trận đã lưu';
}
export function beginRun() {
  activeId = crypto.randomUUID(); lastCheckpoint = -Infinity; restoreError = null;
  return checkpoint();
}
export async function checkpoint({ terminal = false } = {}) {
  if (storageUnavailable) { error('Chưa lưu được: mở Thiết lập để nhập save hoặc khởi tạo nơi lưu.'); return false; }
  try {
    if (!terminal && state.phase === 'playing' && !state.training && !state.replica) {
      if (state.player?.alive && activeId) {
        discoverBooks(profile, state.player);
        const before = performance.now();
        savedRun = captureMatch(activeId); lastCheckpoint = state.time;
        checkpointTiming.captureMs = Math.round(performance.now() - before); checkpointTiming.nodes = savedRun.graph.nodes.length;
      }
    }
    if (status) status.textContent = 'Đang lưu…';
    await commit(makeEnvelope(profile, savedRun, settings()), { terminal });
    updateHome();
    return true;
  } catch (e) { error('Không lưu được: ' + e.message); return false; }
}
export function completeRun(won) {
  if (!activeId || state.training || state.replica) return;
  discoverBooks(profile, state.player);
  recordMatch({ faction: state.player.faction.id, won, rank: state.rank || state.player.rank,
    kills: state.kills, bossKills: state.bossKills, time: state.time, runId: activeId });
  try { localStorage.setItem(TERMINAL_KEY, JSON.stringify({ id: activeId, at: Date.now(), profile })); }
  catch { error('Không ghi được nhật ký kết thúc trận. Hãy chờ lưu hoàn tất trước khi đóng game.'); }
  savedRun = null; activeId = null;
  void checkpoint({ terminal: true }).then(() => { if (!activeId) releaseLock(); });
  updateHome();
}
export function tickCommunity() {
  if (state.phase !== 'playing' || state.training || state.replica || !activeId) return;
  if (lastInventoryRevision !== state.invRev) { discoverBooks(profile, state.player); lastInventoryRevision = state.invRev; }
  if (!state.player?.alive) { completeRun(false); return; }
  if (state.time - lastCheckpoint >= 15) void checkpoint();
  updateGuide();
}
export async function continueRun() {
  if (!savedRun || busy) return;
  busy = true; updateHome();
  try {
    if (!await claimRun()) return;
    if (!savedRun) { releaseLock(); toast('Trận đã kết thúc ở tab khác. Bạn có thể bắt đầu hành trình mới.'); return; }
    const run = savedRun, saved = readMatch(run);
    await api.restore(run, saved);
    activeId = run.meta.id; lastCheckpoint = state.time;
    toast('Đã tiếp tục đúng trận đã lưu. Tiến trình tự lưu mỗi 15 giây.');
  } catch (e) { releaseLock(); error('Không tiếp tục được: ' + e.message); }
  finally { busy = false; updateHome(); }
}
export async function suspendRun() {
  const id = activeId;
  await checkpoint();
  if (activeId === id) { activeId = null; releaseLock(); }
}
export function updateHome() {
  if (!continueButton) return;
  if (guide && state.phase !== 'playing') guide.hidden = true;
  continueButton.hidden = !savedRun;
  continueButton.disabled = busy || !!restoreError || !api.ready();
  continueButton.textContent = busy ? 'Đang mở trận…' : 'Tiếp tục hành trình';
  if (savedRun) info.textContent = `${savedRun.meta.name} · ${fmtTime(savedRun.meta.time)} · Lưu ${new Date(savedRun.meta.at).toLocaleString('vi-VN')}`;
  else info.textContent = 'Sinh tồn offline · Chết mất đồ · Tiến trình được giữ lại';
  const p = progression(profile);
  $('profileLine').textContent = `Danh vọng cấp ${p.level} · ${profile.progress.xp} XP · ${profileLine()}`;
  status.textContent = saveStatus.error ? 'Lỗi lưu · mở để xử lý' : saveStatus.at ? 'Đã lưu trên máy' : 'Lưu tự động';
  status.dataset.error = saveStatus.error ? 'true' : 'false';
  if (restoreError) info.textContent = 'Save cần xử lý: ' + restoreError;
}
function pauseForPanel() { api.pauseForPanel(); }
function closePanel() { hideModal(); api.resumeAfterPanel(); }
function showCharacter() {
  pauseForPanel();
  const p = progression(profile), title = TITLES.find(t => t.id === profile.progress.title)?.name || 'Lãng khách';
  const rows = TITLES.map(t => `<button class="title-choice" data-title="${t.id}" ${t.unlocked(profile) ? '' : 'disabled'} aria-pressed="${t.id === profile.progress.title}"><b>${escape(t.name)}</b><small>${escape(t.description)} · ${t.unlocked(profile) ? 'Đã mở' : 'Chưa mở'}</small></button>`).join('');
  showModal('NHÂN VẬT · TIẾN TRÌNH LÂU DÀI', readGuestName(), `<p>${escape(title)} · Danh vọng cấp ${p.level}</p><progress max="${p.upper - p.lower}" value="${p.xp - p.lower}" aria-label="Tiến trình danh vọng"></progress><p>${p.xp} / ${p.upper} XP · Cấp danh vọng và danh hiệu không tăng chỉ số chiến đấu.</p><div class="journal-stats"><span><b>${profile.stats.matches}</b>Trận</span><span><b>${profile.stats.wins}</b>Chiến thắng</span><span><b>${profile.stats.kills}</b>Hạ gục</span><span><b>${profile.progress.books.length}</b>Bí kíp đã tìm</span></div><h3>Danh hiệu mở khóa</h3><div class="title-choices">${rows}</div><p class="save-explainer">Tự lưu giữ toàn bộ trận đang chơi: trang bị, túi đồ, kỹ năng, hồi chiêu và bản đồ. Khi chết, đồ của trận mất; danh vọng, bí kíp đã ghi nhận và danh hiệu vẫn còn.</p>`, 'Đóng', closePanel);
  for (const button of $('modalBody').querySelectorAll('[data-title]')) button.onclick = () => {
    const title = TITLES.find(t => t.id === button.dataset.title);
    if (!title?.unlocked(profile)) return;
    profile.progress.title = title.id; saveProfile(); void checkpoint(); showCharacter();
  };
}
async function exportSave() {
  if (!await checkpoint()) return;
  const value = makeEnvelope(profile, savedRun, settings());
  const url = URL.createObjectURL(new Blob([JSON.stringify(value)], { type: 'application/json' }));
  const link = document.createElement('a'); link.href = url; link.download = `giangho-save-${new Date().toISOString().slice(0, 10)}.json`; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
  toast('Đã xuất hồ sơ và trận đang lưu. Giữ file để chuyển máy hoặc dự phòng.');
}
function showSettings() {
  pauseForPanel();
  showModal('THIẾT LẬP · DỮ LIỆU TRÊN MÁY', 'Chơi theo cách của bạn', `<div class="settings-form"><label>Tên nhân vật<input id="communityName" maxlength="24" value="${escape(readGuestName())}" autocomplete="off"></label><label class="check-row"><input id="communitySound" type="checkbox" ${sound.on ? 'checked' : ''}> Âm thanh chiến đấu</label><label class="check-row"><input id="communityMusic" type="checkbox" ${sound.music ? 'checked' : ''}> Nhạc nền</label></div><h3>Save &amp; chuyển máy</h3><p>Lưu tự động mỗi 15 giây và khi tạm dừng. Dùng Xuất save trước khi chuyển máy hoặc xóa dữ liệu trình duyệt.</p><div class="save-tools"><button id="exportCommunity" class="secondary">Xuất save</button><label class="secondary import-save">Nhập save<input id="importCommunity" type="file" accept=".json,application/json"></label></div><p id="settingsSaveStatus" role="status">${escape(saveStatus.error || (saveStatus.at ? 'Lần lưu: ' + new Date(saveStatus.at).toLocaleString('vi-VN') : 'Chưa có trận đã lưu.'))}</p>${storageUnavailable ? '<button id="resetCommunityStore" class="secondary">Khởi tạo nơi lưu mới</button>' : ''}<p class="save-explainer">Bản offline không cần đăng nhập. ZIP mới phải chạy trên cùng cổng local để tiếp tục dùng save cũ, hoặc dùng Nhập save.</p>`, 'Lưu thiết lập', async () => {
    saveGuestName($('communityName').value);
    if (state.player?.alive) state.player.name = readGuestName();
    setSound($('communitySound').checked); setMusic($('communityMusic').checked);
    saveProfile(); await checkpoint(); closePanel();
  }, closePanel);
  $('modalSecondary').textContent = 'Đóng';
  $('exportCommunity').onclick = () => void exportSave();
  void fetch('/__community/health').then(r => r.ok ? r.json() : null).then(health => {
    if (health?.app !== 'giangho-offline-community' || !$('settingsSaveStatus')) return;
    const quit = document.createElement('button'); quit.className = 'secondary'; quit.textContent = 'Lưu và thoát launcher';
    quit.onclick = async () => {
      if (!await checkpoint()) return;
      const response = await fetch('/__community/quit', { method: 'POST', headers: { 'X-GiangHo-Local': '1' } });
      if (response.ok) { showModal('ĐÃ LƯU', 'Hẹn ngày tái ngộ', '<p>Launcher đã dừng. Bạn có thể đóng tab này. Mở lại launcher để tiếp tục hành trình.</p>', 'Đã hiểu', () => {}); }
    };
    $('settingsSaveStatus').after(quit);
  }).catch(() => {});
  $('importCommunity').onchange = async event => {
    const file = event.target.files[0]; if (!file) return;
    try {
      if (file.size > 32 * 1024 * 1024) throw Error('File save vượt quá 32 MiB.');
      const value = validateEnvelope(JSON.parse(await file.text()));
      if (value.run) readMatch(value.run);
      api.pauseForPanel();
      showModal('NHẬP SAVE', 'Thay hồ sơ hiện tại?', `<p>Nhập hồ sơ có ${value.profile.stats.matches} trận và ${value.run ? 'một trận đang chơi' : 'không có trận dang dở'}. Dữ liệu hiện tại sẽ được thay thế. Hãy xuất save hiện tại nếu cần giữ.</p>`, 'Nhập và tải lại game', async () => {
        try {
          await commit(value, { terminal: true, replace: true });
          localStorage.removeItem(TERMINAL_KEY);
          replaceProfile(value.profile); saveProfile();
          for (const key of SETTINGS) if (typeof value.settings?.[key] === 'string') localStorage.setItem(key, value.settings[key]);
          location.reload();
        } catch (e) { error('Nhập save thất bại: ' + e.message); }
      }, showSettings);
      $('modalSecondary').textContent = 'Hủy';
    } catch (e) { error('Không nhập được save: ' + e.message); event.target.value = ''; }
  };
  if ($('resetCommunityStore')) $('resetCommunityStore').onclick = () => {
    showModal('KHỞI TẠO SAVE', 'Bắt đầu nơi lưu mới?', '<p>Save không đọc được sẽ được thay thế. Chỉ tiếp tục nếu bạn đã có bản dự phòng hoặc chấp nhận bắt đầu lại.</p>', 'Khởi tạo', async () => {
      storageUnavailable = false; restoreError = null; savedRun = null; activeId = null;
      await checkpoint({ terminal: true }); showSettings();
    }, showSettings);
    $('modalSecondary').textContent = 'Hủy';
  };
}
let guide, lastInventoryRevision = -1;
function updateGuide() {
  if (!guide) return;
  guide.hidden = state.phase !== 'playing' || state.training || state.time > 180;
  if (guide.hidden) return;
  const hasSkill = state.player.slots.some(Boolean), items = state.player.bag?.items.length || 0;
  const text = !hasSkill ? 'Bước 1 · Nhặt bí kíp gần điểm xuất phát để học võ công.' : items ? 'Bước 2 · Mở TÚI để xem, mặc và so sánh đồ. Trận sẽ tạm dừng.' : 'Sẵn sàng · Nhấp địch hoặc giữ ĐÁNH. Theo dõi vòng bo trên bản đồ.';
  if (guide.textContent !== text) guide.textContent = text;
}
export function mountCommunity(callbacks) {
  api = callbacks;
  const home = document.createElement('section'); home.className = 'community-home'; home.setAttribute('aria-label', 'Hành trình offline');
  home.innerHTML = '<button id="continueCommunity" class="primary" hidden>Tiếp tục hành trình</button><p id="communityRunInfo"></p><div class="community-menu"><button id="characterCommunity" class="secondary">Nhân vật & mở khóa</button><button id="settingsCommunity" class="secondary">Thiết lập & save</button></div>';
  const customize = document.createElement('details'); customize.className = 'community-customize'; customize.open = !savedRun;
  const summary = document.createElement('summary'); summary.textContent = 'Nhân vật khởi đầu · môn phái & diện mạo'; customize.append(summary);
  customize.append(document.querySelector('.avatar-row'), $('factions'));
  const intro = $('intro'); intro.classList.add('community-intro');
  const description = intro.querySelector(':scope > p');
  description.textContent = 'Một mình giữa 100 đấu sĩ. Nhặt bí kíp, tìm trang bị và sống sót. Đóng game rồi tiếp tục bất cứ lúc nào.';
  description.after(home); home.after(document.querySelector('.mode-bar')); document.querySelector('.mode-bar').after(customize);
  $('start').dataset.communityStart = 'true';
  const build = document.createElement('small'); build.className = 'community-build'; build.textContent = 'COMMUNITY · OFFLINE · 0.1.0'; intro.append(build);
  continueButton = $('continueCommunity'); info = $('communityRunInfo');
  continueButton.onclick = () => void continueRun(); $('characterCommunity').onclick = showCharacter; $('settingsCommunity').onclick = showSettings;
  status = document.createElement('button'); status.id = 'communitySaveStatus'; status.className = 'save-status'; status.onclick = showSettings; status.setAttribute('aria-label', 'Trạng thái lưu và thiết lập');
  $('game').append(status);
  guide = document.createElement('div'); guide.className = 'community-guide'; guide.hidden = true; $('game').append(guide);
  window.addEventListener('pagehide', () => { if (state.phase === 'playing') void checkpoint(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && state.phase === 'playing') void checkpoint(); });
  window.addEventListener('profile-storage-error', () => error('Bộ nhớ thiết lập không ghi được. Hãy xuất save dự phòng.'));
  document.addEventListener('bag-visibility', event => {
    if (event.detail.open) api.pauseForBag();
    else { api.resumeAfterBag(); if (state.phase === 'playing') void checkpoint(); }
  });
  updateHome();
  if (saveStatus.recovered) toast('Đã khôi phục save dự phòng. Hãy xuất một bản sao mới.');
}
