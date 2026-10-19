// Native terrain, tiled in world coordinates. The same authored masks paint every cache chunk.
import { makeCanvas } from './util.js';
import { ROADS, RIVER, RIVER_WIDTH, SURFACES } from './map-layout.js';
let textures = null, images = {}, masks = null, survivalMasks = null;
const line = pts => {const p = new Path2D();p.moveTo(...pts[0]);for(const q of pts.slice(1))p.lineTo(...q);return p;};
const buildMasks = (roads, river, surfaces) => ({ roads: roads.map(r=>({...r,path:line(r.pts)})), riverPts: river, river: river.length ? line(river) : null, surfaces: surfaces.map(s=>{const path=line(s.poly);path.closePath();return {...s,path};}) });
export async function loadMapTerrain(kit, loadImage) {
  const pairs = await Promise.all(Object.entries(kit.textures).map(async ([name,v]) => [name,await loadImage(`data/${v.image}`)]));
  textures = kit.textures; images = Object.fromEntries(pairs);
  masks = survivalMasks = buildMasks(ROADS, RIVER, SURFACES);
}
// Another authored layout ({ roads, river, surfaces } in world coordinates, e.g. the training arena); null = survival map.
// (painting only: the match server, which has no canvas, keeps no masks)
export function setTerrainLayout(layout) { if (typeof Path2D === 'undefined') return; masks = layout ? buildMasks(layout.roads || [], layout.river || [], layout.surfaces || []) : survivalMasks; }
const tileIndex = (x,y,n) => ((Math.imul(x+171,131)^Math.imul(y+239,997))>>>0)%n;
function texture(ctx,name,x0,y0,size) {
  const v=textures[name],im=images[name],t=v.tile;
  for(let y=Math.floor(y0/t)*t;y<y0+size;y+=t)for(let x=Math.floor(x0/t)*t;x<x0+size;x+=t){
    const f=tileIndex(x/t,y/t,v.frames);ctx.drawImage(im,f%v.cols*t,Math.floor(f/v.cols)*t,t,t,x-x0,y-y0,t,t);
  }
}
const nearby = (pts,x,y,n,pad) => pts.some(q=>q[0]>=x-pad&&q[0]<=x+n+pad&&q[1]>=y-pad&&q[1]<=y+n+pad) ||
  pts.slice(1).some((q,i)=>Math.min(q[0],pts[i][0])<=x+n+pad&&Math.max(q[0],pts[i][0])>=x-pad&&Math.min(q[1],pts[i][1])<=y+n+pad&&Math.max(q[1],pts[i][1])>=y-pad);
let scratch = null;
export function paintTerrain(x0,y0,size=512) {
  if(!textures)throw Error('Native terrain not loaded');
  const pad=64,n=size+pad*2,x=x0-pad,y=y0-pad;
  // Material images stay at native resolution. Only soft terrain masks are quarter size:
  // filtering a 160px mask avoids repeated full-resolution blurs on mobile.
  const maskScale=.25;
  if(!scratch||scratch.n!==n){const layer=makeCanvas(n,n),mask=makeCanvas(n*maskScale,n*maskScale),fill=makeCanvas(n,n);scratch={n,layer,mask,fill};}
  const {layer,mask,fill}=scratch, out=fill.getContext('2d'), g=layer.getContext('2d'), m=mask.getContext('2d');
  out.clearRect(0,0,n,n);texture(out,'grass',x,y,n);
  const roads=masks.roads.filter(r=>nearby(r.pts,x,y,n,r.width/2+130));
  const surfaces=masks.surfaces.filter(s=>nearby(s.poly,x,y,n,50)||pointIn(s.poly,x+n/2,y+n/2));
  const river=masks.river&&nearby(masks.riverPts,x,y,n,RIVER_WIDTH/2+100);
  const layerMask=(name,blur,draw)=>{
    g.globalCompositeOperation='source-over';g.clearRect(0,0,n,n);texture(g,name,x,y,n);
    m.setTransform(1,0,0,1,0,0);m.clearRect(0,0,mask.width,mask.height);m.save();m.scale(maskScale,maskScale);m.translate(-x,-y);m.filter=blur?`blur(${blur*maskScale}px)`:'none';m.fillStyle=m.strokeStyle='#fff';m.lineJoin=m.lineCap='round';draw(m);m.restore();
    g.globalCompositeOperation='destination-in';g.drawImage(mask,0,0,n,n);out.drawImage(layer,0,0);
  };
  if(roads.length||surfaces.length){
    layerMask('verge',24,m=>{for(const r of roads){m.lineWidth=r.width+110;m.stroke(r.path);}for(const s of surfaces)m.fill(s.path);});
    layerMask('dirt',8,m=>{for(const r of roads){m.lineWidth=r.width;m.stroke(r.path);}for(const s of surfaces)if(s.kind==='paving'){m.lineWidth=38;m.stroke(s.path);}else if(s.kind==='field'){m.lineWidth=14;m.stroke(s.path);}});
    if(surfaces.some(s=>s.kind==='paving'))layerMask('paving',1,m=>{for(const s of surfaces)if(s.kind==='paving')m.fill(s.path);});
  }
  if(river){
    layerMask('verge',13,m=>{m.lineWidth=RIVER_WIDTH+76;m.stroke(masks.river);});
    layerMask('dirt',6,m=>{m.lineWidth=RIVER_WIDTH+32;m.stroke(masks.river);});
    layerMask('water',3,m=>{m.lineWidth=RIVER_WIDTH;m.stroke(masks.river);});
  }
  const result=makeCanvas(size,size);result.getContext('2d').drawImage(fill,pad,pad,size,size,0,0,size,size);return result;
}
function pointIn(poly,x,y){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c;}return c;}
// Low cost minimap: material colours, accurate authored river/roads/courts and bridge positions.
export function paintMapOverview(ctx,worldSize,size) {
  const k=size/worldSize;ctx.save();ctx.scale(k,k);ctx.fillStyle='#526536';ctx.fillRect(0,0,worldSize,worldSize);
  ctx.lineCap=ctx.lineJoin='round';ctx.strokeStyle='#968362';
  for(const r of masks.roads){ctx.lineWidth=Math.max(35,r.width);ctx.stroke(r.path);}
  for(const s of masks.surfaces){ctx.fillStyle=s.kind==='paving'?'#8e8372':'#6e7444';ctx.fill(s.path);}
  if(masks.river){ctx.strokeStyle='#60978f';ctx.lineWidth=RIVER_WIDTH;ctx.stroke(masks.river);}ctx.restore();
}
