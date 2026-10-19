import { angleDiff, clamp } from './util.js';

export function projectileOrigin(x, y, angle, index, count, spacing = 0) {
  const side = (index - (count - 1) / 2) * spacing;
  return { x: x - Math.sin(angle) * side, y: y + Math.cos(angle) * side };
}

// Shared by combat and the library so three dragons follow the same flight paths.
export function advanceProjectile(p, dt, target) {
  p.age = (p.age || 0) + dt; p.life -= dt;
  if (p.homing && target && p.age >= (p.homingDelay || 0)) {
    const turn = angleDiff(Math.atan2(target.y - p.y, target.x - p.x), p.angle);
    p.angle += clamp(turn, -p.homing * dt, p.homing * dt);
  }
  p.x += Math.cos(p.angle) * p.speed * dt; p.y += Math.sin(p.angle) * p.speed * dt;
}

// ---- VLTK missile formations ----
// MisslesForm of the source skill: 0 wall across the aim (Param1 = spacing in px), 1 line (one after another on the same
// track), 2 spread (Param1 = angle step in 1/64 of a turn, the client's direction unit), 3 circle, 6 at the target point,
// 7 at the caster. MslsGenerate times the missiles: 0/1 together, 2 in order, 3 in random order, 4 at random inside the gap,
// 5 from the centre outwards; MslsGenerateData is the gap in client ticks (1/18 s). Read from the table's structure and the
// skills that use each value; not yet compared frame by frame with the running client.
const TAU = Math.PI * 2, DIR64 = TAU / 64, TICK = 18;
export function formationSlot(form, i, n, point, { param = 0, generate = 0, gap = 0, order = null, rand = Math.random, fallbackSpread = 0.14 } = {}) {
  const { x, y } = point, angle = point.angle || 0, mid = (n - 1) / 2;
  let px = x, py = y, a = angle;
  if (form === 0 && n > 1) { const side = (i - mid) * (param || 32); px = x - Math.sin(angle) * side; py = y + Math.cos(angle) * side; }
  else if (form === 2 && n > 1) a = angle + (i - mid) * (param ? param * DIR64 : fallbackSpread);
  else if (form === 3) a = angle + i * TAU / Math.max(1, n);
  else if ((form === 6 || form === 7) && n > 1) { const r = 18 + rand() * 30, t = rand() * TAU; px = x + Math.cos(t) * r; py = y + Math.sin(t) * r * 0.7; }
  else if (form !== 1 && n > 1) a = angle + (i - mid) * fallbackSpread;   // forms without a model of their own keep the fan
  const step = generate === 2 ? i : generate === 3 ? (order ? order[i] : i) : generate === 4 ? rand() : generate === 5 ? Math.floor(Math.abs(i - mid)) : 0;
  return { x: px, y: py, angle: a, delay: step * gap / TICK };
}
export const randomOrder = (n, rand = Math.random) => { const o = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; } return o; };
