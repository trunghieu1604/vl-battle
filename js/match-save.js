import { encodeGraph, decodeGraph } from './save-codec.js';
import { NativePresentation } from './native-presentation.js';
import { state, reconnectPresentation, validateDeferredActions } from './engine.js';
import { BOOKS, FACTIONS, ZONE_PHASES } from './data.js';
import { skillVisual } from './skill-visuals.js';
import { world } from './world.js';
const classes = { NativePresentation: { ctor: NativePresentation, omit: ['hooks'], hydrate: reconnectPresentation } };

// Static catalogue data is already bundled with the game. Store stable references,
// not a fresh copy of every source graph after each restoration.
function catalogue() {
  const encode = new Map(), decode = new Map();
  function add(value, key) {
    if (!value || typeof value !== 'object' || encode.has(value)) return;
    encode.set(value, key); decode.set(key, value);
    for (const [child, entry] of Object.entries(value)) add(entry, key + '/' + child);
  }
  for (const book of BOOKS) {
    add(book, 'book/' + book.id);
    add(skillVisual(book.id)?.sourceData, 'source/' + book.id);
  }
  for (const faction of FACTIONS) add(faction, 'faction/' + faction.id);
  return { encode, decode };
}

export function captureMatch(id) {
  if (state.phase !== 'playing' || state.training || state.replica || !state.player?.alive) return null;
  return {
    meta: { id, name: state.player.name, faction: state.player.faction.id, avatar: state.player.avatar.id,
      skin: state.player.look.costume, time: state.time, seed: world.seed, at: Date.now() },
    graph: encodeGraph(state, classes, catalogue().encode),
  };
}
export function readMatch(run) {
  if (!run || !run.meta || !Number.isFinite(run.meta.seed)) throw Error('Thông tin bản đồ bị hỏng.');
  const saved = decodeGraph(run.graph, classes, catalogue().decode);
  if (saved.phase !== 'playing' || saved.training || saved.replica || saved.server || !saved.player?.alive) throw Error('Trận này đã kết thúc hoặc không hỗ trợ tiếp tục.');
  for (const key of ['entities', 'heroes', 'loot', 'pending', 'projectiles', 'zones', 'nativeCasts', 'events', 'elites', 'effects', 'particles', 'floaters', 'feed', 'chat']) {
    if (!Array.isArray(saved[key])) throw Error('Dữ liệu trận thiếu ' + key);
  }
  if (!saved.heroes.includes(saved.player) || !saved.entities.includes(saved.player)) throw Error('Tham chiếu nhân vật bị hỏng.');
  if (!Number.isFinite(saved.time) || saved.time < 0 || !Number.isFinite(saved.player.x) || !Number.isFinite(saved.player.y)) throw Error('Thời gian/vị trí trận không hợp lệ.');
  // Survival AI and event placement require a complete zone, even during its wait stage.
  // Reject a damaged checkpoint here so loadSave can recover the previous backup.
  const zone = saved.zone;
  if (!zone || !Number.isInteger(zone.phase) || zone.phase < 0 || zone.phase >= ZONE_PHASES.length ||
      !['wait', 'shrink', 'done'].includes(zone.stage) ||
      ['t', 'x', 'y', 'r', 'fx', 'fy', 'fr', 'tx', 'ty', 'tr'].some(key => !Number.isFinite(zone[key])) ||
      ['t', 'r', 'fr', 'tr'].some(key => zone[key] < 0)) throw Error('Dữ liệu vòng an toàn của trận bị hỏng.');
  for (const hero of saved.heroes) {
    if (!(hero.cdById instanceof Map) || !(hero.castDmg instanceof Map) || !(hero.castDrain instanceof Map)) throw Error('Dữ liệu hồi chiêu bị hỏng.');
  }
  validateDeferredActions(saved.pending);
  saved.paused = false;
  return saved;
}
export function restoreMatch(run, saved = readMatch(run)) {
  for (const key of Object.keys(state)) delete state[key];
  Object.assign(state, saved);
  state.invRev++;
}
