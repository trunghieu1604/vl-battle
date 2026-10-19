// Device cache with optional server persistence for anonymous players.
// Prototype statistics remain client-reported, not authoritative rankings or rewards.
import { skinOf } from './data.js';
const KEY = 'tieungao.profile';
const blank = () => ({ v: 1, skin: null, stats: { matches: 0, wins: 0, top3: 0, kills: 0, bossKills: 0, bestRank: 0, playTime: 0, byFaction: {} } });
function load() {
  try {
    const p = JSON.parse(localStorage.getItem(KEY));
    if (p?.v === 1 && p.stats) return { ...blank(), ...p, stats: { ...blank().stats, ...p.stats } };
  } catch {}
  return blank();
}
export const profile = load();
export function saveProfile() {
  try { localStorage.setItem(KEY, JSON.stringify(profile)); }
  catch { window.dispatchEvent(new CustomEvent('profile-storage-error')); }
}
export async function initializeProfileStorage() {
  await initializeRemoteProfile(() => JSON.parse(JSON.stringify(profile)), remote => {
    if (!remote || remote.v !== 1 || !remote.stats) return;
    Object.assign(profile, remote); saveProfile();
}
export const profileSkin = () => skinOf(profile.skin);
export function setProfileSkin(skin) { profile.skin = skinOf(skin); saveProfile();  }

// one finished match: won, final rank, player kills, bosses killed, seconds played
export function recordMatch({ faction, won, rank, kills, bossKills, time, runId }) {
  if (runId && (profile.completedRuns || []).includes(runId)) return false;
  const s = profile.stats, f = s.byFaction[faction] ||= { matches: 0, wins: 0, kills: 0 };
  s.matches++; f.matches++;
  if (won) { s.wins++; f.wins++; }
  if (rank && rank <= 3) s.top3++;
  if (rank && (!s.bestRank || rank < s.bestRank)) s.bestRank = rank;
  s.kills += kills || 0; f.kills += kills || 0;
  s.bossKills += bossKills || 0;
  s.playTime += Math.round(time || 0);
  if (runId) profile.completedRuns = [...(profile.completedRuns || []), runId].slice(-100);
  profile.progress ||= { xp: 0, books: [], title: 'langkhach' };
  profile.progress.xp += 100 + Math.floor((time || 0) / 60) * 10 + (kills || 0) * 25 + (bossKills || 0) * 50 + (won ? 300 : 0);
  saveProfile();
  return true;
}
export function profileLine() {
  const s = profile.stats;
  if (!s.matches) return 'Hồ sơ: chưa có trận nào';
  return `Hồ sơ: ${s.matches} trận · ${s.wins} lần vô địch · ${s.top3} lần vào top 3 · ${s.kills} hạ gục · ${s.bossKills} thủ lĩnh · hạng tốt nhất #${s.bestRank}`;
}
