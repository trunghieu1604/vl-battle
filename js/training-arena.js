// Võ trường — the small training arena (docs/ke-hoach/PLAN_CHE_DO_LUYEN_TAP_2026-10-05.md). Authored in world coordinates on the
// survival grid (world.js enterLayoutWorld): a paved court with a ring of trees, bushes and rocks from the same
// reviewed VLTK1 map sprites (data/vltk-map-kit.json), wooden dummies at fixed posts and one start point.
const X = 512, Y = 512, W = 1536, H = 1024;          // whole arena, chunk aligned (CHUNK = 512)
const WALK = { x: 608, y: 656, w: 1344, h: 800 };    // where fighters can stand
const CX = X + W / 2, CY = WALK.y + WALK.h / 2;

// border scenery: trees on three sides, low bushes and rocks along the near (bottom) edge so nothing hides the court
function border() {
  const out = [], trees = ['treeA', 'treeB', 'treeC'], low = ['bushA', 'bushB', 'rockA', 'bushA', 'rockB'];
  let v = 0;
  for (let x = X + 40; x <= X + W - 40; x += 150) out.push({ type: 'tree', asset: trees[v % 3], x: x + (v % 2) * 30, y: WALK.y - 36 - (v % 3) * 10, s: 0.9 + (v % 3) * 0.08, r: 0, v: v++ });
  for (let y = WALK.y + 70; y <= WALK.y + WALK.h - 40; y += 140) {
    out.push({ type: 'tree', asset: trees[v % 3], x: WALK.x - 50, y, s: 0.92, r: 0, v: v++ });
    out.push({ type: 'tree', asset: trees[v % 3], x: WALK.x + WALK.w + 50, y: y + 30, s: 0.92, r: 0, v: v++ });
  }
  for (let x = X + 60; x <= X + W - 60; x += 120) { const a = low[v % low.length]; out.push({ type: a.startsWith('rock') ? 'rock' : 'bush', asset: a, x: x + (v % 2) * 24, y: WALK.y + WALK.h + 40, s: a.startsWith('rock') ? 0.8 : 1, r: 0, v: v++ }); }
  // two banners at the back corners of the court
  out.push({ type: 'flag', asset: 'banner', x: WALK.x + 70, y: WALK.y + 40, s: 1, r: 0, v: v++ });
  out.push({ type: 'flag', asset: 'banner', x: WALK.x + WALK.w - 70, y: WALK.y + 40, s: 1, r: 0, v: v++ });
  return out;
}

export const TRAINING_ARENA = {
  name: 'Võ trường',
  bounds: { x: X, y: Y, w: W, h: H },
  walkable: WALK,
  terrain: {
    roads: [],
    river: [],
    surfaces: [{ kind: 'paving', poly: [[CX, WALK.y + 40], [WALK.x + WALK.w - 40, CY], [CX, WALK.y + WALK.h - 40], [WALK.x + 40, CY]] }],
  },
  props: border(),
  start: { x: CX - 300, y: CY },
  // a row in front of the start (single target, melee and ranged reach), a tight group (area skills) and one far post
  dummies: [
    { x: CX - 60, y: CY - 120 }, { x: CX + 40, y: CY - 120 }, { x: CX + 140, y: CY - 120 },
    { x: CX + 120, y: CY + 90 }, { x: CX + 165, y: CY + 130 }, { x: CX + 75, y: CY + 130 },
    { x: CX + 480, y: CY - 20 },
  ],
};
