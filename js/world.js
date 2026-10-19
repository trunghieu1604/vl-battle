// Authored Tràng An — Bến Cổ. Match seeds randomise loot; scenery and routes remain fixed.
import { WORLD } from './data.js';
import { prepareSceneProp } from './scene.js';
import { TAU, clamp, mulberry32, segDist, makeCanvas } from './util.js';
import { MAP_NAME, MAP_VERSION, VILLAGE_LAYOUT, DISTRICTS, ROADS, RIVER, RIVER_WIDTH, BRIDGES, SURFACES, OBJECTS, sectorAt, inside } from './map-layout.js';
import { paintTerrain, paintMapOverview, setTerrainLayout } from './map-terrain.js';
import { CanvasCache, touchDevice } from './canvas-cache.js';
// Navigation uses the actual walk grid: coarsening to 32px sealed some diagonal gate apertures.
export const FS=16,GW=WORLD/FS,NS=FS,NW=GW,CHUNK=512;
export const VILLAGE=VILLAGE_LAYOUT;
export const world={seed:0,ready:false,name:MAP_NAME,layoutVersion:MAP_VERSION,pois:[],roads:[],river:[],bridges:[],props:[],buckets:new Map(),spawns:[],camps:[],lootSpots:[],chestSpots:[],walk:null,nav:null,f:null,minimap:null,village:null};
const inVillageRect=(x,y,pad=0)=>x>VILLAGE.x-pad&&x<VILLAGE.x+VILLAGE.w+pad&&y>VILLAGE.y-pad&&y<VILLAGE.y+VILLAGE.h+pad;
export function legal(x,y){if(x<48||y<48||x>WORLD-48||y>WORLD-48)return false;return world.walk[((y/FS)|0)*GW+((x/FS)|0)]===0;}
export function isWater(x,y){if(x<0||y<0||x>=WORLD||y>=WORLD)return false;return world.walk[((y/FS)|0)*GW+((x/FS)|0)]===1;}
// Exact grid traversal: fixed-distance samples can skip a thin wall or clip a bridge corner.
export function lineClear(ax,ay,bx,by,step=10){
  if(!legal(ax,ay)||!legal(bx,by))return false;
  let x=Math.floor(ax/FS),y=Math.floor(ay/FS);const ex=Math.floor(bx/FS),ey=Math.floor(by/FS),dx=bx-ax,dy=by-ay,sx=Math.sign(dx),sy=Math.sign(dy);
  const tx=dx?FS/Math.abs(dx):Infinity,ty=dy?FS/Math.abs(dy):Infinity;
  let mx=dx?((sx>0?(x+1)*FS:x*FS)-ax)/dx:Infinity,my=dy?((sy>0?(y+1)*FS:y*FS)-ay)/dy:Infinity;
  const free=(cx,cy)=>cx>=0&&cy>=0&&cx<GW&&cy<GW&&!world.walk[cy*GW+cx];
  while(x!==ex||y!==ey){
    if(Math.abs(mx-my)<1e-10){if(!free(x+sx,y)||!free(x,y+sy))return false;x+=sx;y+=sy;mx+=tx;my+=ty;}
    else if(mx<my){x+=sx;mx+=tx;}else{y+=sy;my+=ty;}
    if(!free(x,y))return false;
  }return true;
}
export function generateWorld(seed){
  Object.assign(world,{seed,ready:false,pois:DISTRICTS.map(p=>({...p})),roads:ROADS.map(r=>r.pts),river:RIVER,bridges:BRIDGES,props:[],buckets:new Map(),spawns:[],camps:[],lootSpots:[],chestSpots:[],village:null});
  const N=GW*GW,f={water:new Float32Array(N),forest:new Float32Array(N),hill:new Float32Array(N),road:new Float32Array(N),roadAng:new Float32Array(N),ground:new Float32Array(N),paved:new Uint8Array(N)};
  world.f=f;world.walk=new Uint8Array(N);
  const buckets=new Map(),SB=256;
  const bucket=(x,y)=>{const key=y*1000+x;if(!buckets.has(key))buckets.set(key,{roads:[],river:[],surfaces:[]});return buckets.get(key);};
  const add=(kind,pts,pad,width=0)=>{for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];for(let y=Math.floor((Math.min(a[1],b[1])-pad)/SB);y<=Math.floor((Math.max(a[1],b[1])+pad)/SB);y++)for(let x=Math.floor((Math.min(a[0],b[0])-pad)/SB);x<=Math.floor((Math.max(a[0],b[0])+pad)/SB);x++)bucket(x,y)[kind].push({a,b,width});}};
  for(const r of ROADS)add('roads',r.pts,r.width/2+48,r.width);
  add('river',RIVER,RIVER_WIDTH/2+48);
  for(const s of SURFACES){const xs=s.poly.map(p=>p[0]),ys=s.poly.map(p=>p[1]);for(let y=Math.floor(Math.min(...ys)/SB);y<=Math.floor(Math.max(...ys)/SB);y++)for(let x=Math.floor(Math.min(...xs)/SB);x<=Math.floor(Math.max(...xs)/SB);x++)bucket(x,y).surfaces.push(s);}
  for(let gy=0;gy<GW;gy++)for(let gx=0;gx<GW;gx++){
    const x=gx*FS+8,y=gy*FS+8,i=gy*GW+gx,b=buckets.get(Math.floor(y/SB)*1000+Math.floor(x/SB));
    let river=Infinity,road=0,ang=0;
    for(const s of b?.river||[])river=Math.min(river,segDist(x,y,...s.a,...s.b));
    for(const s of b?.roads||[]){const v=clamp((s.width/2+16-segDist(x,y,...s.a,...s.b))/32,0,1);if(v>road){road=v;ang=Math.atan2(s.b[1]-s.a[1],s.b[0]-s.a[0]);}}
    f.water[i]=clamp(.5-(river-RIVER_WIDTH/2)/16,0,1);f.road[i]=road;f.roadAng[i]=ang;
    const surface=b?.surfaces.find(s=>inside(s.poly,x,y));if(surface){f.ground[i]=1;f.paved[i]=surface.kind==='paving'?1:0;}
    const sector=sectorAt(x,y),bounds=sector.bounds,fade=clamp(Math.min(x-bounds[0],y-bounds[1],bounds[2]-x,bounds[3]-y)/320,0,1);
    f.forest[i]=(['forest','bamboo'].includes(sector.biome)?fade:0)*(1-road)*(1-f.water[i]);
    f.hill[i]=(sector.biome==='stone'?fade:0)*(1-road);
    if(gx<3||gy<3||gx>=GW-3||gy>=GW-3)world.walk[i]=4;
    else if(f.water[i]>.52&&!BRIDGES.some(c=>inside(c.deck,x,y)))world.walk[i]=1;
  }
  for(const src of OBJECTS){const p={...src,order:world.props.length};prepareSceneProp(p);world.props.push(p);if(!p.ground)blockProp(p);}
  sealPockets();buildNav();buildRoadNav();
  randomizeWorldLoot(seed);
  for(const p of world.props)bucketProp(p);
  clearTerrainCache();world.minimap=typeof document!=='undefined'?buildMinimap():null;world.ready=true;   // no page on the match server: no minimap
}
// A small authored world (training arena, see training-arena.js) on the same grid and cell size: everything outside
// its walkable rectangle is blocked, the terrain painter switches to its court, the survival world is kept by
// reference and restored by leaveLayoutWorld() without regenerating it.
let survivalSaved=null;
export function enterLayoutWorld(L){
  if(!survivalSaved)survivalSaved={fields:{...world},roadNav};
  setTerrainLayout(L.terrain);
  const N=GW*GW;
  Object.assign(world,{ready:false,name:L.name,pois:[],roads:[],river:[],bridges:[],props:[],buckets:new Map(),spawns:[],camps:[],lootSpots:[],chestSpots:[],village:null,bounds:L.bounds});
  world.f={water:new Float32Array(N),forest:new Float32Array(N),hill:new Float32Array(N),road:new Float32Array(N),roadAng:new Float32Array(N),ground:new Float32Array(N),paved:new Uint8Array(N)};
  world.walk=new Uint8Array(N).fill(4);
  const W=L.walkable;
  for(let gy=Math.floor(W.y/FS);gy<Math.ceil((W.y+W.h)/FS);gy++)for(let gx=Math.floor(W.x/FS);gx<Math.ceil((W.x+W.w)/FS);gx++){
    const x=gx*FS+8,y=gy*FS+8;if(x>W.x&&x<W.x+W.w&&y>W.y&&y<W.y+W.h)world.walk[gy*GW+gx]=0;
  }
  for(const src of L.props){const p={...src,order:world.props.length};prepareSceneProp(p);world.props.push(p);if(!p.ground)blockProp(p);}
  buildNav();roadNav={nodes:[],edges:[]};
  for(const p of world.props)bucketProp(p);
  clearTerrainCache();world.minimap=typeof document!=='undefined'?buildMinimap():null;world.ready=true;   // no page on the match server: no minimap
}
export function leaveLayoutWorld(){
  if(!survivalSaved)return;
  Object.assign(world,survivalSaved.fields);world.bounds=null;roadNav=survivalSaved.roadNav;survivalSaved=null;
  setTerrainLayout(null);clearTerrainCache();
}
// New rounds can shuffle loot and chests without regenerating terrain or measured collision.
export function randomizeWorldLoot(seed){
  world.seed=seed;world.lootSpots=[];world.chestSpots=[];
  const rng=mulberry32(seed),R=(a,b)=>a+rng()*(b-a);
  const taken=[];
  const point=(x,y)=>{const p=nearestLegal(x,y);if(!roomy(p.x,p.y,24)||taken.some(q=>Math.hypot(q.x-p.x,q.y-p.y)<50))return null;taken.push(p);return p;};
  // Each district has usable loot on open ground, with better tables at contested landmarks.
  for(const poi of world.pois){
    let made=0;for(let j=0;j<poi.loot*25&&made<poi.loot;j++){const a=R(0,TAU),d=Math.sqrt(rng())*poi.r*.84,p=point(poi.x+Math.cos(a)*d,poi.y+Math.sin(a)*d*.8);if(!p)continue;world.lootSpots.push({...p,poi,rich:poi.rich});made++;}
    const count=poi.chests;
    made=0;for(let j=0;j<count*250&&made<count;j++){const a=R(0,TAU),d=R(120,poi.r*.7),p=point(poi.x+Math.cos(a)*d,poi.y+Math.sin(a)*d*.7);if(!p)continue;world.chestSpots.push({...p,poi:poi.id,rich:poi.rich});made++;}
  }
  // A sparse trail of normal items rewards rotations without filling every empty meadow.
  const routes=ROADS.filter(r=>!['door-path','field-ridge'].includes(r.id));
  for(let i=0;i<210;i++){
    const r=routes[Math.floor(rng()*routes.length)],j=1+Math.floor(rng()*(r.pts.length-1)),a=r.pts[j-1],b=r.pts[j],t=rng();
    const p=point(a[0]+(b[0]-a[0])*t+R(-95,95),a[1]+(b[1]-a[1])*t+R(-95,95));if(p)world.lootSpots.push({...p,poi:null,rich:false});
  }
}
const fieldAt=(arr,x,y)=>arr[clamp((y/FS)|0,0,GW-1)*GW+clamp((x/FS)|0,0,GW-1)];
function blockProp(p) {
  if (p.foot) { blockFoot(p.foot); return; }
  if (p.blockers) { for (const b of p.blockers) blockProp(b); return; }
  const pad = 7;
  if (p.w) {
    const x0 = p.x - p.w / 2 - pad, x1 = p.x + p.w / 2 + pad, y0 = p.y - p.h - pad, y1 = p.y + pad;
    for (let gy = Math.max(0, (y0 / FS) | 0); gy <= Math.min(GW - 1, (y1 / FS) | 0); gy++) for (let gx = Math.max(0, (x0 / FS) | 0); gx <= Math.min(GW - 1, (x1 / FS) | 0); gx++) {
      const cx = gx * FS + 8, cy = gy * FS + 8;
      if (cx > x0 && cx < x1 && cy > y0 && cy < y1) world.walk[gy * GW + gx] = 2;
    }
    return;
  }
  if (!p.r) return;
  const r = p.r + pad;
  for (let gy = Math.max(0, ((p.y - r) / FS) | 0); gy <= Math.min(GW - 1, ((p.y + r) / FS) | 0); gy++) for (let gx = Math.max(0, ((p.x - r) / FS) | 0); gx <= Math.min(GW - 1, ((p.x + r) / FS) | 0); gx++) {
    if (Math.hypot(gx * FS + 8 - p.x, (gy * FS + 8 - p.y) * 1.25) < r) world.walk[gy * GW + gx] = 2;
  }
}

// Ground cut off from the village by water, cliffs or buildings (islands, gaps between walls) is sealed,
// so nobody spawns, lands or finds loot where they could never walk out.
function sealPockets() {
  const walk = world.walk, seen = new Uint8Array(walk.length), start = nearestLegal(VILLAGE.cx, VILLAGE.cy);
  const stack = [((start.y / FS) | 0) * GW + ((start.x / FS) | 0)];
  seen[stack[0]] = 1;
  while (stack.length) {
    const k = stack.pop(), x = k % GW;
    for (const m of [k - GW, k + GW, x ? k - 1 : -1, x < GW - 1 ? k + 1 : -1]) if (m >= 0 && m < walk.length && !walk[m] && !seen[m]) { seen[m] = 1; stack.push(m); }
  }
  for (let k = 0; k < walk.length; k++) if (!walk[k] && !seen[k]) walk[k] = 5;
}
// Room to move in every direction (spawn points).
export function roomy(x, y, r = 40) {
  if (!legal(x, y)) return false;
  for (let k = 0; k < 8; k++) if (!legal(x + Math.cos(k / 8 * TAU) * r, y + Math.sin(k / 8 * TAU) * r)) return false;
  return true;
}

// Measured base of VLTK art (scene.js applyFoot): polygons for buildings/rocks/gate walls, a circle for trunks.
function blockFoot(foot) {
  if (foot.circle) { const [x, y, r] = foot.circle; blockProp({ x, y, r }); return; }
  // a cell is blocked when the base covers any of five sample points: thin walls cannot slip between cell centres
  const pad = 3, SAMPLES = [[8, 8], [3, 3], [13, 3], [3, 13], [13, 13]];
  for (const poly of foot.polys) {
    const xs = poly.map(q => q[0]), ys = poly.map(q => q[1]);
    const gx0 = Math.max(0, ((Math.min(...xs) - pad) / FS) | 0), gx1 = Math.min(GW - 1, ((Math.max(...xs) + pad) / FS) | 0);
    const gy0 = Math.max(0, ((Math.min(...ys) - pad) / FS) | 0), gy1 = Math.min(GW - 1, ((Math.max(...ys) + pad) / FS) | 0);
    for (let gy = gy0; gy <= gy1; gy++) for (let gx = gx0; gx <= gx1; gx++) {
      if (SAMPLES.some(([ox, oy]) => { const x = gx * FS + ox, y = gy * FS + oy; return insidePoly(poly, x, y) || polyEdgeDist(poly, x, y) < pad; })) world.walk[gy * GW + gx] = 2;
    }
  }
}
function insidePoly(poly, x, y) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function polyEdgeDist(poly, x, y) {
  let d = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) d = Math.min(d, segDist(x, y, poly[j][0], poly[j][1], poly[i][0], poly[i][1]));
  return d;
}

function bucketProp(p) {
  const k = Math.floor(p.y / CHUNK) * 100 + Math.floor(p.x / CHUNK);
  if (!world.buckets.has(k)) world.buckets.set(k, []);
  world.buckets.get(k).push(p);
}
export function propsIn(x0, y0, x1, y1) {
  const out = [];
  for (let cy = Math.floor((y0 - 60) / CHUNK); cy <= Math.floor((y1 + 520) / CHUNK); cy++) for (let cx = Math.floor((x0 - 420) / CHUNK); cx <= Math.floor((x1 + 420) / CHUNK); cx++) {
    for (const p of world.buckets.get(cy * 100 + cx) || []) if (p.x > x0 - 420 && p.x < x1 + 420 && p.y > y0 - 60 && p.y < y1 + 520) out.push(p);
  }
  return out;
}

export function poiAt(x, y) {
  return world.pois.filter(p => Math.hypot(p.x - x, p.y - y) < p.r)
    .sort((a,b) => a.r - b.r)[0];
}

export function randomLegal(rng, cx, cy, radius, tries = 60) {
  for (let i = 0; i < tries; i++) {
    const a = rng() * TAU, d = Math.sqrt(rng()) * radius;
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
    if (legal(x, y)) return { x, y };
  }
  return nearestLegal(cx, cy);
}
export function nearestLegal(x, y) {
  for (let r = 0; r < 1200; r += 16) for (let k = 0; k < 16; k++) {
    const a = k / 16 * TAU, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r;
    if (legal(px, py)) return { x: px, y: py };
    if (r === 0) break;
  }
  return { x: VILLAGE.cx, y: VILLAGE.cy };
}

// Stratified room starts cover the square, including the outside districts. Failed spacing never silently passes.
export function allocateSpawns(count,rng,excluded=[],gap=650){
  const side=Math.ceil(Math.sqrt(count)),cell=(WORLD-800)/side,cells=[];
  for(let y=0;y<side;y++)for(let x=0;x<side;x++)cells.push([400+(x+.5)*cell,400+(y+.5)*cell]);
  for(let i=cells.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[cells[i],cells[j]]=[cells[j],cells[i]];}
  const taken=[...excluded],out=[];
  const usable=p=>roomy(p.x,p.y,40)&&roomy(p.x,p.y,60)&&roomy(p.x,p.y,80)&&taken.every(q=>Math.hypot(q.x-p.x,q.y-p.y)>=gap);
  for(let i=0;i<count;i++){
    const [cx,cy]=cells[i];let p=null;
    for(let j=0;j<120;j++){const q={x:cx+(rng()-.5)*cell*.55,y:cy+(rng()-.5)*cell*.55};if(usable(q)){p=q;break;}}
    if(!p)for(let j=0;j<4000;j++){const q={x:400+rng()*(WORLD-800),y:400+rng()*(WORLD-800)};if(usable(q)){p=q;break;}}
    if(!p)throw Error('Map cannot allocate a safe separated start for fighter '+(i+1));
    taken.push(p);out.push(p);
  }return out;
}

// ---------------- navigation ----------------
function buildNav() {
  world.nav = Uint8Array.from(world.walk, cell => cell === 0 ? 1 : 0);
}
const gScore = new Float32Array(NW * NW), came = new Int32Array(NW * NW), stamp = new Uint32Array(NW * NW), closed = new Uint32Array(NW * NW);
let stampId = 0;
const heap = new Int32Array(NW * NW), heapF = new Float32Array(NW * NW);
function nearestNav(cx, cy) {
  for (let r = 0; r < 8; r++) for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) {
    if (x < 0 || y < 0 || x >= NW || y >= NW) continue;
    if (Math.max(Math.abs(x - cx), Math.abs(y - cy)) !== r) continue;
    if (world.nav[y * NW + x]) return y * NW + x;
  }
  return -1;
}
function findLocalPath(sx, sy, tx, ty, maxNodes = 7000) {
  if (legal(sx,sy) && legal(tx,ty) && lineClear(sx,sy,tx,ty)) return {points:[{x:tx,y:ty}],complete:true};
  const start = nearestNav(clamp((sx / NS) | 0, 0, NW - 1), clamp((sy / NS) | 0, 0, NW - 1));
  const goal = nearestNav(clamp((tx / NS) | 0, 0, NW - 1), clamp((ty / NS) | 0, 0, NW - 1));
  if (start < 0 || goal < 0) return null;
  stampId++;
  const gx = goal % NW, gy = (goal / NW) | 0;
  const h = i => { const dx = Math.abs(i % NW - gx), dy = Math.abs(((i / NW) | 0) - gy); return (dx + dy) + (1.4142 - 2) * Math.min(dx, dy); };
  let size = 0;
  const push = (i, fv) => { let n = size++; while (n > 0) { const p = (n - 1) >> 1; if (heapF[p] <= fv) break; heap[n] = heap[p]; heapF[n] = heapF[p]; n = p; } heap[n] = i; heapF[n] = fv; };
  const pop = () => { const top = heap[0], li = heap[--size], lf = heapF[size]; let n = 0; for (;;) { let c = n * 2 + 1; if (c >= size) break; if (c + 1 < size && heapF[c + 1] < heapF[c]) c++; if (heapF[c] >= lf) break; heap[n] = heap[c]; heapF[n] = heapF[c]; n = c; } heap[n] = li; heapF[n] = lf; return top; };
  stamp[start] = stampId; gScore[start] = 0; came[start] = -1; push(start, h(start));
  let expanded = 0, bestNode = start, bestH = h(start);
  while (size > 0) {
    const cur = pop();
    if (closed[cur] === stampId) continue;
    closed[cur] = stampId;
    if (cur === goal) { bestNode = goal; break; }
    const hc = h(cur); if (hc < bestH) { bestH = hc; bestNode = cur; }
    if (++expanded > maxNodes) break;
    const cx = cur % NW, cy = (cur / NW) | 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= NW || ny >= NW) continue;
      const ni = ny * NW + nx;
      if (!world.nav[ni] || closed[ni] === stampId) continue;
      if (dx && dy && (!world.nav[cy * NW + nx] || !world.nav[ny * NW + cx])) continue;
      const g = gScore[cur] + (dx && dy ? 1.4142 : 1);
      if (stamp[ni] !== stampId || g < gScore[ni]) { stamp[ni] = stampId; gScore[ni] = g; came[ni] = cur; push(ni, g + h(ni)); }
    }
  }
  const cells = [];
  for (let n = bestNode; n !== -1; n = came[n]) cells.push(n);
  cells.reverse();
  const pts = cells.map(i => ({ x: (i % NW) * NS + NS / 2, y: ((i / NW) | 0) * NS + NS / 2 }));
  if (bestNode === goal) pts.push({ x: tx, y: ty });
  // string pulling
  const out = [];
  let from = { x: sx, y: sy }, i = 0;
  while (i < pts.length) {
    let j = Math.min(pts.length - 1, i + 12);
    while (j > i && !lineClear(from.x, from.y, pts[j].x, pts[j].y, 12)) j--;
    out.push(pts[j]); from = pts[j]; i = j + 1;
  }
  return { points: out, complete: bestNode === goal };
}

// Long rotations follow a small, validated road graph. The fine grid still handles doors and bridges;
// widening the map does not make every bot run A* over all 810,000 cells every two seconds.
let roadNav={nodes:[],edges:[]};
export const navigationStats=()=>({nodes:roadNav.nodes.length,edges:roadNav.edges.reduce((n,a)=>n+a.length,0)/2});
function buildRoadNav(){
  const nodes=[],edges=[],index=new Map(),links=[];
  const node=(x,y)=>{const p=nearestLegal(x,y),key=Math.round(p.x/8)+','+Math.round(p.y/8);if(index.has(key))return index.get(key);const i=nodes.length;nodes.push(p);edges.push([]);index.set(key,i);return i;};
  for(const r of ROADS.filter(r=>!['door-path','field-ridge'].includes(r.id))){
    let prev=null;for(let i=1;i<r.pts.length;i++){
      const a=r.pts[i-1],b=r.pts[i],n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/440);
      for(let j=i===1?0:1;j<=n;j++){const t=j/n,k=node(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t);if(prev!==null&&prev!==k)links.push([prev,k]);prev=k;}
    }
  }
  // Nearby samples also join lanes where they cross between authored vertices.
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++)if(Math.hypot(nodes[i].x-nodes[j].x,nodes[i].y-nodes[j].y)<270&&lineClear(nodes[i].x,nodes[i].y,nodes[j].x,nodes[j].y,12))links.push([i,j]);
  const seen=new Set();
  for(const [a,b] of links){const key=Math.min(a,b)+','+Math.max(a,b);if(seen.has(key))continue;seen.add(key);
    const from=nodes[a],to=nodes[b],path=findLocalPath(from.x,from.y,to.x,to.y,7000);if(!path?.complete)continue;
    const points=path.points,cost=points.reduce((n,p,i)=>n+Math.hypot(p.x-(i?points[i-1].x:from.x),p.y-(i?points[i-1].y:from.y)),0);
    edges[a].push({to:b,cost,points});edges[b].push({to:a,cost,points:[...points.slice(0,-1).reverse(),from]});
  }roadNav={nodes,edges};
}
function roadPath(sx,sy,tx,ty){
  const {nodes,edges}=roadNav;if(!nodes.length)return null;
  const connect=(x,y)=>{const nearest=nodes.map((p,i)=>({p,i,d:Math.hypot(p.x-x,p.y-y)})).sort((a,b)=>a.d-b.d).slice(0,14),out=[];
    for(const n of nearest){const path=findLocalPath(x,y,n.p.x,n.p.y,7000);if(path?.complete){const points=path.points,cost=points.reduce((sum,p,i)=>sum+Math.hypot(p.x-(i?points[i-1].x:x),p.y-(i?points[i-1].y:y)),0);out.push({id:n.i,cost,points});if(out.length===3)break;}}return out;};
  const starts=connect(sx,sy),ends=connect(tx,ty);if(!starts.length||!ends.length)return null;
  const scores=new Float64Array(nodes.length).fill(Infinity),prev=new Int32Array(nodes.length).fill(-1),via=[],used=new Uint8Array(nodes.length),initial=new Map();
  for(const s of starts){scores[s.id]=s.cost;initial.set(s.id,s);}
  const heap=[];
  const push=(id,cost)=>{let i=heap.length;heap.push({id,cost});while(i){const p=(i-1)>>1;if(heap[p].cost<=cost)break;heap[i]=heap[p];i=p;}heap[i]={id,cost};};
  const pop=()=>{const first=heap[0],last=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let c=i*2+1;if(c+1<heap.length&&heap[c+1].cost<heap[c].cost)c++;if(heap[c].cost>=last.cost)break;heap[i]=heap[c];i=c;}heap[i]=last;}return first;};
  for(const s of starts)push(s.id,s.cost);
  while(heap.length){
    const {id:a,cost:best}=pop();if(used[a])continue;used[a]=1;
    for(const edge of edges[a])if(best+edge.cost<scores[edge.to]){scores[edge.to]=best+edge.cost;prev[edge.to]=a;via[edge.to]=edge;push(edge.to,scores[edge.to]);}
  }
  const end=ends.sort((a,b)=>(scores[a.id]+a.cost)-(scores[b.id]+b.cost))[0];if(!Number.isFinite(scores[end.id]))return null;
  const route=[];let n=end.id;while(prev[n]!==-1){route.push(via[n]);n=prev[n];}route.reverse();
  const points=[...initial.get(n).points];for(const edge of route)points.push(...edge.points);
  points.push(...end.points.slice(0,-1).reverse(),{x:tx,y:ty});return {points,complete:true,regional:true};
}
export function findPath(sx,sy,tx,ty,maxNodes=7000){
  if(Math.hypot(tx-sx,ty-sy)>1000&&!lineClear(sx,sy,tx,ty,12)){
    const route=roadPath(sx,sy,tx,ty);if(route)return route;
  }return findLocalPath(sx,sy,tx,ty,maxNodes);
}


// All visible native chunks are painted immediately. No flat-colour placeholder appears on camera entry.
const chunkCache=new CanvasCache({maxBytes:(touchDevice()?64:180)*1048576,maxEntries:touchDevice()?20:64});
let warmJob=null,warmQueue=[],warmRegion=null;
export const terrainCacheStats=()=>chunkCache.stats();
export function clearTerrainCache(){
  if(warmJob!==null){if(globalThis.cancelIdleCallback)cancelIdleCallback(warmJob);else clearTimeout(warmJob);}
  warmJob=null;warmQueue=[];warmRegion=null;chunkCache.clear();
}
function getChunk(cx,cy){
  if(cx<0||cy<0||cx>=Math.ceil(WORLD/CHUNK)||cy>=Math.ceil(WORLD/CHUNK))return null;
  const key=cy*100+cx;let c=chunkCache.get(key);
  if(c)return c;
  c=paintTerrain(cx*CHUNK,cy*CHUNK,CHUNK);chunkCache.set(key,c);
  return c;
}
function warmAround(x0,y0,x1,y1){
  const ax=Math.max(0,Math.floor(x0/CHUNK)-1),ay=Math.max(0,Math.floor(y0/CHUNK)-1),bx=Math.min(Math.ceil(WORLD/CHUNK)-1,Math.floor(x1/CHUNK)+1),by=Math.min(Math.ceil(WORLD/CHUNK)-1,Math.floor(y1/CHUNK)+1);
  // Keep the visible rectangle plus one ring; a wide desktop screen must not evict its own terrain.
  chunkCache.maxEntries=Math.max(touchDevice()?16:32,(bx-ax+1)*(by-ay+1)+4);chunkCache.trim();
  const region=`${ax},${ay},${bx},${by}`;
  if(region===warmRegion)return;
  warmRegion=region;warmQueue=[];for(let y=ay;y<=by;y++)for(let x=ax;x<=bx;x++)if(!chunkCache.has(y*100+x))warmQueue.push([x,y]);
  if(warmJob!==null||!warmQueue.length)return;
  const schedule=callback=>globalThis.requestIdleCallback?requestIdleCallback(callback,{timeout:200}):setTimeout(callback,32);
  const step=()=>{warmJob=null;const p=warmQueue.shift();if(p)getChunk(...p);if(warmQueue.length)warmJob=schedule(step);};
  warmJob=schedule(step);
}
export function prewarm(x,y,radius=900){for(let cy=Math.floor((y-radius)/CHUNK);cy<=Math.floor((y+radius)/CHUNK);cy++)for(let cx=Math.floor((x-radius)/CHUNK);cx<=Math.floor((x+radius)/CHUNK);cx++)getChunk(cx,cy);}
export function drawGround(ctx,x0,y0,x1,y1){
  // Size the working set before drawing, including when the camera zooms out.
  const visible=(Math.floor(x1/CHUNK)-Math.floor(x0/CHUNK)+1)*(Math.floor(y1/CHUNK)-Math.floor(y0/CHUNK)+1);
  chunkCache.maxEntries=Math.max(chunkCache.maxEntries,visible+4);
  chunkCache.maxBytes=Math.max((touchDevice()?64:180)*1048576,(visible+4)*CHUNK*CHUNK*4);
  for(let cy=Math.floor(y0/CHUNK);cy<=Math.floor(y1/CHUNK);cy++)for(let cx=Math.floor(x0/CHUNK);cx<=Math.floor(x1/CHUNK);cx++){const c=getChunk(cx,cy);if(c)ctx.drawImage(c,cx*CHUNK,cy*CHUNK);}
  if(x1-x0<4000&&y1-y0<4000)warmAround(x0,y0,x1,y1);
  ctx.fillStyle='#0d1410';if(x0<0)ctx.fillRect(x0,y0,-x0,y1-y0);if(y0<0)ctx.fillRect(x0,y0,x1-x0,-y0);if(x1>WORLD)ctx.fillRect(WORLD,y0,x1-WORLD,y1-y0);if(y1>WORLD)ctx.fillRect(x0,WORLD,x1-x0,y1-WORLD);
}
export const MINI=300;
function buildMinimap(){
  const c=makeCanvas(MINI,MINI),ctx=c.getContext('2d');paintMapOverview(ctx,WORLD,MINI);const k=MINI/WORLD;
  ctx.strokeStyle='#bdac83';ctx.lineWidth=3;for(const b of world.bridges){ctx.beginPath();ctx.moveTo(...b.left.map(v=>v*k));ctx.lineTo(...b.right.map(v=>v*k));ctx.stroke();}
  ctx.fillStyle='#8b3d27';for(const p of world.props)if(['house','hall','pagoda'].includes(p.type))ctx.fillRect(p.x*k-1.5,p.y*k-1.5,3,3);
  return c;
}
export {inVillageRect,fieldAt};
