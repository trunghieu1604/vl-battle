import { VLTK_CATALOG } from './vltk-books.js';
import { fullLevelVoice } from './native-presentation.js';
// Cast motion of the player figure by the weapon in hand (a manual without weapon limit uses whatever is held).
export const motionFor = weapon => weapon === 'quyen' ? ['FreeMagic', 'FreeAttack'] : weapon === 'amkhi' ? ['DartThrow'] : weapon === 'thuong' || weapon === 'con' ? ['RangeWPuncture', 'RangeWCut'] : ['MeleeWMagic', 'MeleeWCut'];
const motion = b => motionFor(b.weapon || 'kiem');
// every active manual of the catalogue, playable or pending, so the library can preview each one
export const SKILL_VISUALS = Object.fromEntries(VLTK_CATALOG.filter(b => b.type === 'active').map(b => [b.id, {
  sprite: 'skills.' + b.id + '.cast', impact: 'skills.' + b.id + '.impact', motion: motion(b), description: b.desc,
  placement: b.kind === 'projectile' ? 'forward' : 'center', render: 'source', sound: 'skill.' + b.id,
  projectileLift: b.nativeMotion?.height ?? 0,
}]));
export function setSkillSources(sources) {
  for (const [id, profile] of Object.entries(SKILL_VISUALS)) {
    profile.sourceData = sources?.[id] || null;
    const pre = profile.sourceData?.precast;
    profile.precast = !!pre;
    profile.precastOnly = !!pre && !profile.sourceData.cast;
    if (pre) profile.sourceDuration = pre.frames * pre.frameMs / 1000;
  }
}
export const skillVisual = id => SKILL_VISUALS[id] || null;
export const skillSound = (id, gender = 'nam') => {
  const source = skillVisual(id)?.sourceData;
  return source?.fullLevel ? fullLevelVoice(source.fullLevel, gender) : source?.sounds?.[gender === 'nu' ? 'nu' : 'nam'] || null;
};
export function skillHasAudio(id, gender = 'nam') {
  const source = skillVisual(id)?.sourceData;
  if (!source?.fullLevel) return skillAudioTimeline({ id, cast: 0 }, gender).length > 0;
  return !!skillSound(id, gender) || Object.values(source.fullLevel.nodes).some(n => n.missiles.some(m => Object.entries(m.assets).some(([column, a]) => column.startsWith('Snd') && a?.event)));
}
export function skillAudioNotice(id, gender = 'nam') {
  const plan = skillVisual(id)?.sourceData?.fullLevel;
  if (!plan) return '';
  const root = plan.nodes[plan.rootKey], sex = gender === 'nu' ? 'nu' : 'nam';
  const raw = root.raw[sex === 'nu' ? 'FMCastSnd' : 'ManCastSnd'];
  const declared = !!raw && raw !== '0';
  const notices = [];
  if (!root.voices[sex]) notices.push(declared ? `Bộ cài thiếu tiếng thi triển ${sex === 'nu' ? 'nữ' : 'nam'}.` : `Nguồn không khai báo tiếng thi triển ${sex === 'nu' ? 'nữ' : 'nam'}.`);
  if (notices.length) notices.push('Tiếng hiệu ứng được phát riêng theo nguồn.');
  if (Object.values(plan.nodes).some(n => n.key !== plan.rootKey && (n.voices.nam || n.voices.nu))) notices.push('Tiếng thi triển chiêu phụ chờ đối chiếu client.');
  return notices.join(' ');
}
// The library audition includes the voice, main effect and impact; impact is simulated.
export function skillAudioTimeline(book, gender = 'nam') {
  const sounds = skillVisual(book.id)?.sourceData?.sounds;
  const arrival = book.kind === 'projectile' ? Math.min(100, book.range) / book.speed : 0.15;
  return [...(skillSound(book.id, gender) ? [{ at: 0, event: skillSound(book.id, gender) }] : []),
    ...(sounds?.flight ? [{ at: book.cast, event: sounds.flight }] : []),
    ...(sounds?.impact ? [{ at: book.cast + arrival, event: sounds.impact }] : [])];
}
export const skillSprite = (manifest, ref) => {
  const parts = (ref || '').split('.');
  return parts[0] === 'skills' ? manifest.skills?.[parts[1]]?.[parts[2]] || null : manifest.styles?.[parts[0]]?.[parts[1]] || null;
};
