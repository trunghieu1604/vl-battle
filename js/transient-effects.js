// Advance short-lived presentation data independently of canvas drawing.
// This keeps save captures and renderer-free simulations bounded too.
export function tickTransientEffects(state, dt) {
  if (!dt || state.paused) return;
  for (const effect of state.effects) effect.life -= dt;
  state.effects = state.effects.filter(effect => effect.life > 0);
  for (const q of state.particles) {
    q.life -= dt; q.x += q.vx * dt; q.y += q.vy * dt; q.z += q.vz * dt; q.vz -= q.grav * dt;
    if (q.z < 0) { q.z = 0; q.vz *= -0.3; q.vx *= 0.7; q.vy *= 0.7; }
  }
  state.particles = state.particles.filter(q => q.life > 0);
  for (const floater of state.floaters) floater.life -= dt;
  state.floaters = state.floaters.filter(floater => floater.life > 0);
}
