const DB = 'giangho-community', STORE = 'saves';
export const SAVE_FORMAT = 'giangho-offline-save';
export const SAVE_VERSION = 1;
let database, tail = Promise.resolve();
export const saveStatus = { at: null, error: null, recovered: false };
function open() {
  return database ||= new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(Error('Đóng tab game cũ để mở nơi lưu dữ liệu.'));
  }).catch(error => { database = null; throw error; });
}
export function validateEnvelope(value) {
  const pending = [value]; let inspected = 0;
  while (pending.length) {
    const object = pending.pop();
    if (!object || typeof object !== 'object') continue;
    if (++inspected > 1500000) throw Error('Save vượt quá giới hạn cấu trúc');
    for (const key of Object.keys(object)) {
      if (['__proto__', 'constructor', 'prototype'].includes(key)) throw Error('Thuộc tính save không hợp lệ');
      if (object[key] && typeof object[key] === 'object') pending.push(object[key]);
    }
  }
  if (!value || value.format !== SAVE_FORMAT || value.version !== SAVE_VERSION) throw Error('Phiên bản save chưa được hỗ trợ.');
  if (!value.profile || value.profile.v !== 1 || !value.profile.stats || !Number.isFinite(value.at)) throw Error('Hồ sơ save không hợp lệ.');
  for (const key of ['matches', 'wins', 'top3', 'kills', 'bossKills', 'bestRank', 'playTime']) {
    if (!Number.isFinite(value.profile.stats[key]) || value.profile.stats[key] < 0) throw Error('Thống kê save không hợp lệ: ' + key);
  }
  if (!value.profile.stats.byFaction || typeof value.profile.stats.byFaction !== 'object') throw Error('Thống kê môn phái không hợp lệ.');
  const progress = value.profile.progress;
  if (progress && (!Number.isFinite(progress.xp) || progress.xp < 0 || !Array.isArray(progress.books) || progress.books.some(id => typeof id !== 'string') || typeof progress.title !== 'string')) throw Error('Tiến trình save không hợp lệ.');
  if (value.profile.completedRuns && (!Array.isArray(value.profile.completedRuns) || value.profile.completedRuns.some(id => typeof id !== 'string'))) throw Error('Nhật ký trận không hợp lệ.');
  if (value.run && (!value.run.graph || !value.run.meta || typeof value.run.meta.id !== 'string')) throw Error('Trận lưu không hợp lệ.');
  return value;
}
export function makeEnvelope(profile, run, settings) {
  return { format: SAVE_FORMAT, version: SAVE_VERSION, at: Date.now(), profile: structuredClone(profile), run, settings };
}
export async function loadSave(validate = validateEnvelope) {
  try {
    const db = await open();
    const values = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly'), store = tx.objectStore(STORE);
      const current = store.get('current'), backup = store.get('backup');
      tx.oncomplete = () => resolve([current.result, backup.result]);
      tx.onerror = () => reject(tx.error);
    });
    for (let i = 0; i < values.length; i++) {
      if (!values[i]) continue;
      try { const value = validate(values[i]); saveStatus.at = value.at; saveStatus.recovered = i > 0; saveStatus.error = null; return value; }
      catch (error) { saveStatus.error = error.message; }
    }
    if (values.some(Boolean)) throw Error('Save chính và dự phòng đều không đọc được. Hãy nhập bản đã xuất.');
    return null;
  } catch (error) { saveStatus.error = error.message; throw error; }
}
// Serial transactions preserve checkpoint/death ordering. Terminal writes replace the backup
// too, so a recovered backup cannot resurrect a run whose death has already been committed.
export function writeSave(value, { terminal = false } = {}) {
  validateEnvelope(value);
  const job = tail.catch(() => {}).then(async () => {
    const db = await open();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite'), store = tx.objectStore(STORE);
      const previous = store.get('current');
      previous.onsuccess = () => {
        if (terminal) store.put(value, 'backup');
        else if (previous.result) store.put(previous.result, 'backup');
        store.put(value, 'current');
      };
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || Error('Lưu dữ liệu bị gián đoạn.'));
    });
    saveStatus.at = value.at; saveStatus.error = null; saveStatus.recovered = false;
    return value;
  });
  tail = job;
  return job.catch(error => { saveStatus.error = error.message; throw error; });
}
