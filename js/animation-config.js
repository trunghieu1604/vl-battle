// Validate imported/local previews before replacing the currently working rig.
export function validateAnimationConfig(cfg) {
  const object = (v, name) => {
    if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error(`Thiếu hoặc sai ${name}`);
  };
  const number = (v, name, min = -10000, max = 10000) => {
    if (!Number.isFinite(v) || v < min || v > max) throw new Error(`${name} phải từ ${min} đến ${max}`);
  };
  const values = (v, name) => { object(v, name); for (const [k, n] of Object.entries(v)) number(n, `${name}.${k}`); };
  object(cfg, 'cấu hình');
  object(cfg.camera, 'camera'); number(cfg.camera.elevation, 'camera.elevation', 15, 75);
  object(cfg.outline, 'outline'); number(cfg.outline.width, 'outline.width', 0, 2);
  number(cfg.directions, 'directions', 1, 32);
  if (!Number.isInteger(cfg.directions)) throw new Error('directions phải là số nguyên');
  values(cfg.base, 'base'); values(cfg.body, 'body');
  for (const k of 'bob fwd lean twist fall lag lift spread cloth lsw lk rsw rk lap lab lel rap rab rel wrist'.split(' ')) number(cfg.base[k], `base.${k}`);
  for (const k of 'hipZ hipW thigh shin foot legW shinW bootW shoulderZ shoulderW upperArm foreArm sleeveW cuffW handR headZ headR neckW knotZ waistRx waistRy chestRx shoulderRx hemZ hemRx hemRy'.split(' ')) number(cfg.body[k], `body.${k}`, 0, 1000);
  object(cfg.weapons, 'weapons');
  const fields = { kiem: ['blade', 'length width hilt'], dao: ['blade', 'length width hilt'], con: ['pole', 'back front width'], thuong: ['spear', 'back front width headLen'], quyen: ['fist', 'size'], amkhi: ['dart', 'length'] };
  for (const [k, [style, props]] of Object.entries(fields)) {
    const w = cfg.weapons[k]; object(w, `weapons.${k}`);
    if (w.style !== style) throw new Error(`Kiểu binh khí ${k} không hợp lệ`);
    for (const p of props.split(' ')) number(w[p], `weapons.${k}.${p}`, 0, 1000);
  }
  object(cfg.actions, 'actions'); object(cfg.actions.idle, 'actions.idle');
  for (const [name, a] of Object.entries(cfg.actions)) {
    object(a, name);
    if (a.frames !== undefined) {
      number(a.frames, `${name}.frames`, 1, 64);
      if (!Number.isInteger(a.frames)) throw new Error(`${name}.frames phải là số nguyên`);
    }
    if (a.duration !== undefined) number(a.duration, `${name}.duration`, 0.05, 60);
    if (a.impact !== undefined) number(a.impact, `${name}.impact`, 0, 1);
    if (a.pose !== undefined) values(a.pose, `${name}.pose`);
    if (a.strip !== undefined && (!Array.isArray(a.strip) || a.strip.some(v => typeof v !== 'string'))) throw new Error(`${name}.strip phải là danh sách kênh`);
    if (a.keys !== undefined) {
      if (!Array.isArray(a.keys)) throw new Error(`${name}.keys phải là danh sách`);
      const times = new Set();
      for (const k of a.keys) {
        values(k, `${name}.keys`); number(k.t, `${name}.t`, 0, 1);
        if (times.has(k.t)) throw new Error(`${name} có khung chính trùng thời điểm`);
        times.add(k.t);
      }
    }
  }
  const done = new Set(), visiting = new Set();
  const visit = name => {
    if (done.has(name)) return;
    if (visiting.has(name)) throw new Error(`Kế thừa vòng tại ${name}`);
    visiting.add(name);
    const parent = cfg.actions[name].extends;
    if (parent !== undefined) {
      if (typeof parent !== 'string' || !Object.hasOwn(cfg.actions, parent)) throw new Error(`${name} kế thừa động tác không tồn tại`);
      visit(parent);
    }
    visiting.delete(name); done.add(name);
  };
  Object.keys(cfg.actions).forEach(visit);
  return cfg;
}
