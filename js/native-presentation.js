// Presentation of the max-level source graph. Combat damage remains owned by
// the survival engine. Primary projectiles bind to its actual moving objects;
// event-only missiles preserve native art/counts without adding free damage.
import { advanceProjectile, formationSlot, randomOrder } from './projectile-motion.js';
const TICK = 18;
const number = (raw, key, fallback = 0) => Number(raw[key]) || fallback;
// reach of a branch missile: DmgRange (range damage) or CollidRange cells of 32 px, the cell scale of the exporter's
// zones and explosions (not compared with the client)
const branchReach = raw => Math.max(16, number(raw, number(raw, 'IsRangeDmg') ? 'DmgRange' : 'CollidRange') * 32);
// Only the root's declared gender voice is verified for the cast. Missile
// sounds remain independent; event-triggered child cast voices await client proof.
export const fullLevelVoice = (plan, gender) => plan?.nodes[plan.rootKey]?.voices[gender === 'nu' ? 'nu' : 'nam']?.event || null;
// VÁ TẠM (2026-10-06) — xem docs/bao-cao/TAI_NGUYEN_THIEU_TRONG_BO_CAI_2026-10-06.md, mục "Âm thanh".
// missles.txt khai báo tệp này nhưng bộ cài VNG (và cả 3 bản JX1 khác trên GitHub) không có tệp, nên ô
// SndFile4 (tiếng trúng) bị null và 15 bí kíp câm khi trúng đòn. Tạm phát mẫu "hit" (\sound\sound_i019.wav
// gốc VLTK). Khoá là đường dẫn thô trong missles.txt (GBK đọc dạng latin1) của \sound\skill\刀剑刺中声.wav.
// Khi tìm được tệp gốc: nạp lại qua tools/vltk1-import rồi XOÁ bảng này.
const MISSING_IMPACT_SOUND_PATCH = { '\\sound\\skill\\µ¶½£´ÌÖÐÉù.wav': 'hit' };
const patchedImpactSound = raw => MISSING_IMPACT_SOUND_PATCH[(raw || '').trim()] || null;
export function createNativePresentation(plan, book, gender, hooks = {}) {
  if (!plan?.rootKey) return null;
  return new NativePresentation(plan, book, gender, hooks);
}
export class NativePresentation {
  constructor(plan, book, gender, hooks) {
    this.plan = plan; this.book = book || {}; this.gender = gender; this.hooks = hooks;   // the library previews manuals outside the free-map pool too
    this.actors = []; this.visuals = []; this.primary = []; this.started = false;
    this.cancelled = false; this.age = 0; this.spawned = 0; this.lastAudio = new Map();
  }
  begin(point) {
    const root = this.plan.nodes[this.plan.rootKey];
    this._sound(fullLevelVoice(this.plan, this.gender), point);
    if (root.precast) this._image(root.precast, point, false, null, 'precast');
  }
  launch(point) {
    if (this.started || this.cancelled) return;
    this.started = true;
    this._activate(this.plan.rootKey, point, true, []);
  }
  cancel() { this.cancelled = true; this.actors = []; this.visuals = []; }
  bind(projectile, index) {
    const actor = this.primary[index];
    if (actor) { actor.follow = projectile; projectile.nativeActor = actor; this._wake(actor); }
    projectile.nativePresentation = this;
  }
  // A victim touched by the cast: only the primary actor nearest to it collides (a zone of four strikes does not
  // put four impacts on one victim). Combat passes the actor when it knows it (projectiles, zones).
  collide(point, actor) {
    if (this.cancelled || !this.started) return;
    const a = actor || this.nearestPrimary(point);
    if (a) this._collision(a, point);
  }
  nearestPrimary(point) {
    let best = null, bd = Infinity;
    for (const a of this.primary) { if (a.ended || a.wait > 0) continue; const d = Math.hypot(a.x - point.x, a.y - point.y); if (d < bd) { bd = d; best = a; } }
    return best;
  }
  // A mine that burst, a zone that expired: run the source's vanished branch now.
  endActor(actor) { if (actor && !actor.ended) this._end(actor); }
  _sound(event, point) {
    if (!event || this.age - (this.lastAudio.get(event) ?? -Infinity) < 1 / TICK) return;
    // One audible sample per source sound in a native tick: a radial batch of
    // 32 identical missiles must not multiply its gain or exhaust voice slots.
    this.lastAudio.set(event, this.age); this.hooks.sound?.(event, point);
  }
  _image(resource, point, looping, actor, layer) {
    if (!resource) return;
    const d = this.hooks.sprite?.(resource.id);
    if (!d) return;
    const life = actor ? actor.maxLife : d.frames * d.frameMs / 1000;
    this.visuals.push({ assetId: resource.id, x: point.x, y: point.y, angle: point.angle || 0,
      age: 0, life, max: life, loop: looping, actor: actor || null, layer: layer || 'front' });
  }
  _slots(actor, slot, flight = false) {
    const p = { x: actor.x, y: actor.y, angle: actor.angle };
    for (const variant of ['', 'B']) {
      const refs = actor.missile.assets;
      // AnimFile and AnimFileB of one stage share a point; B is drawn a step behind A (render.js depth order).
      this._image(refs[`AnimFile${variant}${slot}`], p, flight && !!number(actor.missile.raw, 'LoopPlay'), flight ? actor : null, variant ? 'back' : 'front');
      const col = `SndFile${variant}${slot}`;
      // slot 4 = collision: a declared-but-missing source sound falls back to the temporary patch above
      this._sound(refs[col]?.event || (slot === 4 ? patchedImpactSound(actor.missile.raw[col]) : null), p);
    }
  }
  _events(node, event, point, ancestry) {
    for (const edge of node.children.filter(e => e.event === event)) this._activate(edge.targetKey, point, false, ancestry);
  }
  _activate(key, point, primary, ancestry) {
    if (ancestry.includes(key)) throw Error(`Native event cycle: ${key}`);
    const node = this.plan.nodes[key]; if (!node) throw Error(`Missing max-level source node: ${key}`);
    const path = [...ancestry, key];
    for (const edge of node.children.filter(e => e.event === 'child')) this._activate(edge.targetKey, point, primary, path);
    const raw = node.raw, form = number(raw, 'MisslesForm'), generate = number(raw, 'MslsGenerate'), gap = number(raw, 'MslsGenerateData');
    // Phi Long Tại Thiên keeps the reviewed survival launch (fan + spacing) that combat also uses.
    const legacyFan = primary && this.book.launchSpacing;
    for (const missile of node.missiles) {
      const count = Math.max(1, missile.count);
      if (this.spawned + count > 2048) throw Error(`Native presentation exceeds supported source count: ${key}`);
      const order = generate === 3 ? randomOrder(count) : null;
      for (let i = 0; i < count; i++) {
        const slot = legacyFan ? { x: point.x, y: point.y, angle: (point.angle || 0) + (i - (count - 1) / 2) * (this.book.spread || 0.14), delay: 0 }
          : formationSlot(form, i, count, point, { param: number(raw, 'Param1'), generate, gap, order, fallbackSpread: primary ? this.book.spread || 0.14 : 0.14 });
        const moving = number(missile.raw, 'MoveKind') > 0;
        const projectile = primary && this.book.kind === 'projectile';
        const speed = moving ? projectile ? this.book.speed : missile.speed * TICK : 0;
        const srcLife = Math.max(1 / TICK, missile.life / TICK);
        const life = projectile ? (this.book.reach || this.book.range) / this.book.speed : srcLife;
        const actor = { x: slot.x, y: slot.y, angle: slot.angle, age: 0, life, maxLife: life, speed,
          node, missile, primary, path, ended: false, collided: new Set(), flyAge: 0, wait: slot.delay, woke: false,
          // events of a primary projectile keep the source count: the source schedule is compressed into the survival flight
          eventScale: projectile ? life / srcLife : 1,
          homing: primary ? this.book.homing : number(missile.raw, 'FollowKind') ? 7 : 0,
          homingDelay: primary ? this.book.homingDelay || 0 : 0, r: primary ? moving ? this.book.width || 20 : this.book.radius || 20 : branchReach(missile.raw) };
        this.actors.push(actor); this.spawned++; if (primary) this.primary.push(actor);
        // primary projectiles wake when combat binds their object; everything else after its generation delay
        if (!this._awaitsCombat(actor) && !(actor.wait > 0)) this._wake(actor);
      }
    }
    if (!node.missiles.length) this._events(node, 'start', point, path);
  }
  // in a match a primary projectile appears with the combat object it follows; the library preview has none
  _awaitsCombat(a) { return a.primary && this.book.kind === 'projectile' && a.speed > 0 && !this.hooks.preview; }
  _wake(actor) {
    if (actor.woke) return;
    actor.woke = true; actor.wait = 0;
    this._slots(actor, 1); this._slots(actor, 2, true);
    this._events(actor.node, 'start', actor, actor.path);
  }
  _collision(actor, target) {
    const key = target.id ?? `${target.x}:${target.y}`;
    if (actor.ended || actor.collided.has(key)) return;
    actor.collided.add(key);
    // a branch missile reached a fighter: combat applies that branch's own source effects (engine.js branchHit)
    if (!actor.primary && target.id !== undefined) this.hooks.hit?.(actor, target);
    // Slots 4/B4 follow the existing source importer impact contract. The
    // original callback clock is not claimed to be client-engine certified.
    this._slots({ ...actor, x: target.x, y: target.y }, 4);
    this._events(actor.node, 'collide', { ...target, angle: actor.angle }, actor.path);
  }
  _end(actor) {
    if (actor.ended) return;
    actor.ended = true;
    if (!actor.woke) return;   // never appeared: no vanish art either
    this._slots(actor, 3);
    this._events(actor.node, 'vanished', actor, actor.path);
  }
  tick(dt) {
    if (this.cancelled) return;
    this.age += dt;
    for (const v of this.visuals) { v.age += dt; v.life -= dt; }
    this.visuals = this.visuals.filter(v => v.life > 0 && !v.actor?.ended);
    // New event actors are processed in the next tick, preventing same-frame
    // recursive explosions and preserving independent animation ages.
    for (const a of [...this.actors]) {
      if (a.ended) continue;
      if (!a.woke) {
        // generation delay of the source (MslsGenerate); a projectile waits for combat to create its object
        a.wait -= dt;
        if (a.wait <= 0 && !this._awaitsCombat(a)) this._wake(a);
        else if (a.wait < -1) a.ended = true;   // combat never created it (the caster was interrupted)
        continue;
      }
      const targets = this.hooks.targets?.(a) || [];
      // homing auxiliary missiles chase the nearest target, not the first one in the list
      const target = targets.length > 1 ? targets.reduce((m, t) => Math.hypot(t.x - a.x, t.y - a.y) < Math.hypot(m.x - a.x, m.y - a.y) ? t : m) : targets[0] || null;
      if (a.follow) {
        a.x = a.follow.x; a.y = a.follow.y; a.angle = a.follow.angle; a.age += dt; a.life = a.follow.life;
      } else {
        advanceProjectile(a, dt, target);
      }
      a.flyAge += dt;
      for (const edge of a.node.children.filter(e => e.event === 'fly')) {
        const period = Math.max(1 / TICK, (edge.interval || 1) / TICK) * a.eventScale;
        if (Math.floor((a.flyAge - dt) / period) < Math.floor(a.flyAge / period)) this._activate(edge.targetKey, a, false, a.path);
      }
      // Primary collision is supplied by combat; the preview supplies targets
      // for it explicitly. Auxiliary collisions affect presentation only.
      if (!a.primary || this.hooks.preview) for (const t of targets) {
        if (Math.hypot(t.x - a.x, t.y - a.y) < a.r + 12) {
          this._collision(a, t);
          // the preview stops a primary missile exactly where combat would (piercing missiles fly on)
          if (number(a.missile.raw, 'ColVanish') || (a.primary && this.book.kind === 'projectile' && !this.book.pierce)) { a.life = 0; break; }
        }
      }
      if (!a.primary && this.hooks.blocked?.(a.x, a.y)) a.life = 0;
      if (a.life <= 0) this._end(a);
    }
    this.actors = this.actors.filter(a => !a.ended);
  }
  get done() { return this.cancelled || this.started && !this.actors.length && !this.visuals.length; }
}
