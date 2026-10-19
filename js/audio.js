// Sound: VLTK1 samples from data/vltk-fx.json (or a sound-lab preview) when loaded, tiny synthesized tones
// otherwise; looping ambient beds and music per scene. Everything is off until the player turns sound on.
import { LOOP_EVENTS, SOUND_PREVIEW_KEY } from './sound-events.js';
import { AssetPool } from './asset-pool.js';

let ctx = null;
export const sound = { on: false, music: true };
try { sound.on = localStorage.getItem('giangho-sound') === '1'; sound.music = localStorage.getItem('giangho-music') !== '0'; } catch {}
export function setSound(on) {
  sound.on = on;
  try { localStorage.setItem('giangho-sound', on ? '1' : '0'); } catch {}
  if (!on) { playbackGeneration++; for (const p of playing) { try { p.source.stop(); } catch {} } playing.length = 0; waitingSamples.clear(); }
  else {
    // Unlock WebAudio during the sound-button gesture, before async decoding.
    try { audio(); } catch {}
    if (Object.keys(SFX).length) fetchSamples();
  }
  refreshLoops();
}
export function setMusic(on) { sound.music = on; try { localStorage.setItem('giangho-music', on ? '1' : '0'); } catch {} refreshLoops(); }
const audio = () => {
  ctx ??= new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
};
export function tone(freq, duration = 0.1, type = 'sine', volume = 0.035) {
  if (!sound.on) return;
  try {
    const ctx = audio();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * 0.45), ctx.currentTime + duration);
    g.gain.setValueAtTime(volume, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + duration);
  } catch {}
}

// Tones used before (or instead of) the samples, per event.
const FALLBACK = {
  swing: [260, 0.07, 'triangle'], dart: [420, 0.06, 'triangle'], hit: [240, 0.07, 'square', 0.025], hurt: [160, 0.07, 'square', 0.025],
  cast: [620, 0.22, 'triangle', 0.045], heavy: [100, 0.32, 'sawtooth', 0.05], frost: [880, 0.25, 'sine', 0.03], parry: [780, 0.15],
  learn: [880, 0.25], pickup: [700, 0.18, 'triangle'], equip: [740, 0.18, 'triangle'], drink: [520, 0.12], chest: [990, 0.3, 'triangle'],
  die: [120, 0.3, 'sawtooth', 0.04], leap: [520, 0.18, 'triangle', 0.04],
};
const SFX = {}, raw = {}, buffers = {}, playing = [], waitingSamples = new Map();
const MAX_VOICES = 10, MAX_PRIORITY_VOICES = 32, MAX_SAME = 3;
let playbackGeneration = 0;
// "cast.sl.nam" → "cast.sl" → "cast" until an event has a sound
const resolve = name => { while (!SFX[name] && name.includes('.')) name = name.slice(0, name.lastIndexOf('.')); return name; };

// One-shots are fetched now and decoded on first use (decoding needs an AudioContext, which needs a gesture).
// A preview saved by the sound lab replaces the shipped choice per event until it is cleared there.
export async function loadSfx(manifest) {
  Object.assign(SFX, manifest?.sounds || {});
  try {
    const preview = JSON.parse(localStorage.getItem(SOUND_PREVIEW_KEY) || 'null');
    if (preview?.sounds) { Object.assign(SFX, preview.sounds); console.info('Đang dùng âm thanh thử từ trang nghe thử'); }
  } catch {}
  for (const k of Object.keys(SFX)) if (!SFX[k]?.file) delete SFX[k];
  refreshLoops();
  if (sound.on) await fetchSamples();
}
// Samples are only downloaded once sound is on (it starts off), so a muted session does not pay for them.
let fetched = null;
const samplePool = new AssetPool(async file => {
  const response = await fetch(file);
  if (!response.ok) throw Error(`Thiếu âm thanh ${file} (${response.status})`);
  return response.arrayBuffer();
});
const decodedFiles = new Map();
function fetchSamples() {
  fetched ??= Promise.all(Object.entries(SFX).filter(([k]) => !LOOP_EVENTS.has(k)).map(([k, s]) =>
    samplePool.load(s.file).then(b => { raw[k] = b; }).catch(() => { fetched = null; console.warn('Thiếu âm thanh', s.file); })));
  return fetched;
}

export function sfx(event, volume = 1, priority = 0) {
  if (!sound.on || volume <= 0) return;
  const name = resolve(event);
  if (!raw[name] && !buffers[name]) {
    if (SFX[name]?.file && !LOOP_EVENTS.has(name)) {
      // Preserve the first native sound while samples are still downloading.
      // Repeated identical events share one pending sample; mute cancels it.
      try { audio(); } catch {}
      const pending = waitingSamples.get(name);
      if (pending) { if (priority > pending.priority) Object.assign(pending, { volume, priority }); return; }
      const ticket = { volume, priority }; waitingSamples.set(name, ticket);
      fetchSamples().then(() => {
        if (waitingSamples.get(name) !== ticket) return;
        waitingSamples.delete(name);
        if (sound.on && raw[name]) sfx(name, ticket.volume, ticket.priority);
      });
    } else { const f = FALLBACK[name]; if (f) tone(f[0], f[1], f[2], (f[3] ?? 0.035) * volume); }
    return;
  }
  try {
    const c = audio();
    if (!buffers[name]) {
      const b = raw[name]; raw[name] = null;
      const file = SFX[name]?.file;
      if (b && file) {
        if (!decodedFiles.has(file)) decodedFiles.set(file, c.decodeAudioData(b.slice(0)).catch(error => { decodedFiles.delete(file); throw error; }));
        buffers[name] = decodedFiles.get(file).then(buf => (buffers[name] = buf)).catch(() => { delete buffers[name]; });
      }
    }
    const buf = buffers[name];
    if (buf instanceof Promise) { const generation = playbackGeneration; buf.then(() => { if (generation === playbackGeneration) start(c, name, volume, priority); }); return; }
    start(c, name, volume, priority);
  } catch {}
}

function start(c, name, volume, priority) {
  if (!sound.on) return; // Decoding may finish after the user muted the game.
  const buf = buffers[name];
  if (!(buf instanceof AudioBuffer)) return;
  const now = c.currentTime;
  for (let i = playing.length - 1; i >= 0; i--) if (playing[i].end <= now) playing.splice(i, 1);
  const displace = candidates => {
    const victim = candidates.filter(p => p.priority < priority).sort((a, b) => a.priority - b.priority || a.end - b.end)[0];
    if (!victim) return false;
    try { victim.source.stop(); } catch {}
    playing.splice(playing.indexOf(victim), 1); return true;
  };
  const same = playing.filter(p => p.name === name);
  if (same.length >= MAX_SAME && !displace(same)) return;
  if (playing.length >= (priority > 0 ? MAX_PRIORITY_VOICES : MAX_VOICES) && !displace(playing)) return;
  const src = c.createBufferSource(), g = c.createGain();
  src.buffer = buf;
  g.gain.value = 0.5 * volume * (SFX[name]?.volume ?? 1);
  src.connect(g); g.connect(c.destination);
  src.start();
  playing.push({ name, source: src, priority, end: now + buf.duration });
}

// ---------- loops: one ambient bed and one music track at a time, crossfaded ----------
const LOOP_GAIN = { amb: 0.35, music: 0.4 };
const channels = { amb: { want: null, cur: null }, music: { want: null, cur: null } };
// scene: { ambient: 'amb.wild' | null, music: 'music.menu' | null }
export function setScene(scene) {
  if (channels.amb.want === scene.ambient && channels.music.want === scene.music) return;
  channels.amb.want = scene.ambient ?? null; channels.music.want = scene.music ?? null;
  refreshLoops();
}
function refreshLoops() {
  for (const [ch, c] of Object.entries(channels)) {
    const allowed = sound.on && (ch !== 'music' || sound.music);
    const name = allowed && c.want && SFX[c.want] ? c.want : null;
    const file = name ? SFX[name].file : null;
    if (c.cur?.file === file) {
      if (c.cur.el.paused) playLoop(ch, c.cur, name);
      continue;
    }
    if (c.cur) fade(c.cur.el, 0, 1.2, true);
    c.cur = null;
    if (!file) continue;
    const el = new Audio(file);
    el.loop = true; el.volume = 0;
    c.cur = { file, el, pending: false };
    playLoop(ch, c.cur, name);
  }
}
function playLoop(ch, track, name) {
  if (track.pending) return;
  track.pending = true;
  track.el.play().then(() => {
    if (channels[ch].cur === track && sound.on) fade(track.el, LOOP_GAIN[ch] * (SFX[name].volume ?? 1), 1.5);
  }).catch(() => {}).finally(() => { track.pending = false; });
}
// Saved sound preferences do not bypass browser autoplay policy. Retry on a real gesture.
function unlockAudio() { if (sound.on) { try { audio(); } catch {} refreshLoops(); } }
// (the match server imports this module without a page: no listener there)
if (typeof document !== 'undefined') { document.addEventListener('pointerdown', unlockAudio); document.addEventListener('keydown', unlockAudio); }
const fades = new WeakMap();
function fade(el, to, seconds, stop) {
  cancelAnimationFrame(fades.get(el));
  const from = el.volume, t0 = performance.now();
  const step = () => {
    const k = Math.min(1, (performance.now() - t0) / 1000 / seconds);
    el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
    if (k < 1) fades.set(el, requestAnimationFrame(step));
    else { fades.delete(el); if (stop) { el.pause(); el.removeAttribute('src'); } }
  };
  fades.set(el, requestAnimationFrame(step));
}
