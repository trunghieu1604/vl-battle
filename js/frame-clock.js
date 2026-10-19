// The simulation uses a fixed step. A tiny rAF remainder must not run a
// second full scan of the 100 fighters, loot and projectiles on every phone frame.
export class SimulationClock {
  constructor(step = 1 / 30) { this.step = step; this.remainder = 0; }
  reset() { this.remainder = 0; }
  advance(dt, update) {
    if (!(dt > 0) || !Number.isFinite(dt)) return 0;
    this.remainder += Math.min(dt, 0.1); let ticks = 0;
    while (this.remainder + 1e-9 >= this.step) {
      update(this.step); this.remainder = Math.max(0, this.remainder - this.step); ticks++;
    }
    return ticks;
  }
}
