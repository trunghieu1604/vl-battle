// Native VLTK scenery, authored as adjacent regions. No pasted screenshots or stretched buildings.
// map-core.js preserves the approved village slice; the outer belt extends its geography.
import * as CORE from './map-core.js';
import { WORLD_SIZE, CORE_OFFSET as O } from './match-config.js';
import { mulberry32, segDist } from './util.js';
export const MAP_NAME = 'Tràng An — Chiến địa Bắc Nam';
export const MAP_VERSION = 'trang-an-100-2';
export const inside = CORE.inside;
const shift = ([x,y]) => [x+O,y+O];
export const VILLAGE_LAYOUT = {...CORE.VILLAGE_LAYOUT,x:CORE.VILLAGE_LAYOUT.x+O,y:CORE.VILLAGE_LAYOUT.y+O,cx:CORE.VILLAGE_LAYOUT.cx+O,cy:CORE.VILLAGE_LAYOUT.cy+O};
export const RIVER_WIDTH = CORE.RIVER_WIDTH;
// Continuous north-to-south river: the original bends stay intact in the central region.
export const RIVER = [[7970,-200],[7990,1000],[7880,2100],[7810,3000],...CORE.RIVER.filter(p=>p[1]>=0&&p[1]<=7200).map(shift),[7890,11400],[7700,12600],[7780,13600],[7860,WORLD_SIZE+200]];
const riverX = y => {for(let i=1;i<RIVER.length;i++)if(RIVER[i-1][1]<=y&&RIVER[i][1]>=y){const a=RIVER[i-1],b=RIVER[i];return a[0]+(b[0]-a[0])*(y-a[1])/(b[1]-a[1]);}throw Error('River crossing outside map');};
const bridge = (id,y) => {const x=riverX(y);return {id,x,y,left:[x-250,y+113],right:[x+250,y-113],deck:[[-157,43],[-96,69],[144,-46],[109,-74]].map(([dx,dy])=>[x+dx*1.2,y+dy*1.2])};};
export const BRIDGES = [bridge('cau-chien-dia-bac',2170),...CORE.BRIDGES.map(b=>({...b,x:b.x+O,y:b.y+O,left:shift(b.left),right:shift(b.right),deck:b.deck.map(shift)})),bridge('cau-chien-dia-nam',12340)];
export const DISTRICTS = [
  ...CORE.DISTRICTS.map(p=>({...p,x:p.x+O,y:p.y+O,loot:Math.round(p.loot*1.8),chests:p.id==='village'?7:4,exits:[...p.exits]})),
  {id:'pass',name:'Đèo Tây Lĩnh',type:'cliff',glyph:'嶺',x:2250,y:2500,r:1150,loot:34,chests:4,rich:false,exits:['frontier','hamlet','temple']},
  {id:'frontier',name:'Doanh trại Bắc',type:'fortress',glyph:'營',x:5680,y:2110,r:1150,loot:46,chests:5,rich:true,exits:['pass','citadel','temple']},
  {id:'citadel',name:'Thành Đông Quan',type:'fortress',glyph:'關',x:11050,y:2190,r:1250,loot:46,chests:5,rich:true,exits:['frontier','camp','grove']},
  {id:'grove',name:'Rừng Thanh Phong',type:'forest',glyph:'林',x:12200,y:6530,r:1200,loot:38,chests:4,rich:false,exits:['citadel','bamboo','quarry']},
  {id:'quarry',name:'Mỏ đá Đông Sơn',type:'cliff',glyph:'石',x:12200,y:10480,r:1200,loot:38,chests:4,rich:true,exits:['grove','stone','battlefield']},
  {id:'battlefield',name:'Chiến địa Nam',type:'fortress',glyph:'陣',x:9700,y:12400,r:1200,loot:46,chests:5,rich:true,exits:['quarry','stone','farmland']},
  {id:'farmland',name:'Đồng lúa Nam Giang',type:'field',glyph:'禾',x:4500,y:12400,r:1450,loot:44,chests:5,rich:false,exits:['battlefield','fields','hamlet']},
  {id:'hamlet',name:'Xóm Tây Giang',type:'painted',glyph:'村',x:2170,y:7290,r:1250,loot:44,chests:5,rich:false,exits:['pass','village','fields','farmland']},
];
for(const [id,exits] of Object.entries({village:['hamlet'],temple:['pass','frontier'],fields:['farmland','hamlet'],camp:['citadel'],bamboo:['grove'],stone:['quarry','battlefield']}))DISTRICTS.find(p=>p.id===id).exits.push(...exits);
// Half-open regions form one partition, including transition belts. Court and harbor are landmarks
// inside the village region, not competing random biomes. One season, one palette per region.
export const SECTORS = [
  {id:'pass',bounds:[0,0,3600,4800],biome:'stone',palette:['rockA','rockB','bushB'],density:.27},
  {id:'hamlet',bounds:[0,4800,3600,10800],biome:'village',palette:['treeA','treeB','bushA'],density:.18},
  {id:'frontier',bounds:[3600,0,7800,3600],biome:'camp',palette:['treeA','treeB','bushA'],density:.14},
  {id:'citadel',bounds:[7800,0,14400,3600],biome:'camp',palette:['treeA','treeB','bushA'],density:.14},
  {id:'temple',bounds:[3600,3600,7800,6400],biome:'village',palette:['treeA','treeB','treeC'],density:.22},
  {id:'village',bounds:[3600,6400,7800,8400],biome:'village',palette:['treeA','treeB','bushA'],density:.18},
  {id:'fields',bounds:[3600,8400,7800,10800],biome:'field',palette:['treeA','bushA'],density:.07},
  {id:'camp',bounds:[7800,3600,10800,6100],biome:'camp',palette:['treeA','treeB','bushA'],density:.17},
  {id:'bamboo',bounds:[7800,6100,10800,8400],biome:'bamboo',palette:['bambooA','bambooB'],density:.48},
  {id:'stone',bounds:[7800,8400,10800,10800],biome:'stone',palette:['rockA','rockB','bushB'],density:.22},
  {id:'grove',bounds:[10800,3600,14400,9000],biome:'forest',palette:['treeA','treeB','treeC'],density:.44},
  {id:'quarry',bounds:[10800,9000,14400,14400],biome:'stone',palette:['rockA','rockB','bushB'],density:.26},
  {id:'farmland',bounds:[0,10800,7800,14400],biome:'field',palette:['treeA','bushA'],density:.06},
  {id:'battlefield',bounds:[7800,10800,10800,14400],biome:'camp',palette:['treeA','treeB','bushA'],density:.12},
];
export const sectorAt = (x,y) => SECTORS.find(s=>x>=s.bounds[0]&&y>=s.bounds[1]&&x<s.bounds[2]&&y<s.bounds[3]);
const roads=CORE.ROADS.map(r=>({...r,pts:r.pts.map(shift)})),surfaces=CORE.SURFACES.map(s=>({...s,poly:s.poly.map(shift)}));
const road=(pts,width=100,id='regional')=>roads.push({pts,width,id});
const [bn,,,,bs]=BRIDGES;
// A perimeter circuit and an inner circuit. Each outer district joins the nearest central district.
road([[2250,2500],[3900,2500],[5680,2110],bn.left,[bn.x,bn.y],bn.right,[9450,2380],[11050,2190]],118,'north-front');
road([[11050,2190],[12520,3600],[12500,5000],[12200,6530],[12600,8370],[12200,10480],[11800,12140],[9700,12400]],105,'east-front');
road([[9700,12400],[8600,12550],bs.right,[bs.x,bs.y],bs.left,[6120,12520],[4500,12400],[2180,11350],[2170,7290],[1880,4800],[2250,2500]],110,'west-south-front');
road([[2250,2500],[3280,3730],[5130,5240]],94,'pass-temple');
road([[5680,2110],[5850,3580],[5130,5240]],104,'frontier-temple');
road([[11050,2190],[10400,3910],[9080,5240]],100,'citadel-camp');
road([[12200,6530],[10870,6780],[9060,7000]],95,'grove-bamboo');
road([[12200,10480],[10960,10200],[9030,9330]],98,'quarry-stone');
road([[9700,12400],[10100,10920],[9030,9330]],102,'battlefield-stone');
road([[4500,12400],[4820,11040],[5230,8840]],98,'farmland-fields');
road([[2170,7290],[3500,7130],[4200,7070],[5900,7040],[6300,7020]],104,'hamlet-village');
road([[2170,7290],[3350,9060],[5230,8840]],90,'hamlet-fields');
// Parallel approaches to the military yards: front road and service lanes, not one choke point.
road([[3900,2500],[4550,3020],[5770,2950],[6680,2730],bn.left],78,'north-flank');
road([[9450,2380],[10060,3000],[11660,3060],[12520,3600]],78,'citadel-flank');
road([[8600,12550],[9060,13360],[10360,13360],[10800,12940],[11800,12140]],82,'south-flank');
const types={home:'house',market:'house',shrine:'pagoda',banyan:'tree',treeA:'tree',treeB:'tree',treeC:'tree',bambooA:'bamboo',bambooB:'bamboo',bushA:'bush',bushB:'bush',rockA:'rock',rockB:'rock',gateReverse:'gate',wallDown:'wall',wallUp:'wall',tent:'tent',campHall:'hall',banner:'flag',bannerKin:'flag'};
const objects=CORE.OBJECTS.filter(p=>p.asset!=='bridge').map(p=>({...p,x:p.x+O,y:p.y+O}));
const place=(asset,x,y,s=1,extra={})=>{const p={asset,type:types[asset]||asset,x,y,s,r:0,v:objects.length,...extra};objects.push(p);return p;};
function hamlet(cx,cy,n=6){
  road([[cx-550,cy+100],[cx,cy+260],[cx+650,cy+100]],62,'settlement-lane');
  road([[cx-550,cy+100],[cx-400,cy-430],[cx+450,cy-420],[cx+650,cy+100]],62,'settlement-loop');
  for(let i=0;i<n;i++){const x=cx-430+(i%3)*360,y=cy-160+Math.floor(i/3)*610;place(i===1?'market':'home',x,y,.95);road([[x,y+35],[x+70,y+125],[cx+(i%3-1)*300,cy+260]],42,'door-path');}
  place('well',cx+700,cy+140);place('hay',cx-530,cy+200);
}
hamlet(2170,7160,6);hamlet(4500,12140,6);hamlet(2260,2370,3);hamlet(12240,6380,3);hamlet(12180,10450,3);
// Open drill courts with opposing approaches. Buildings stay at the perimeter.
function militaryYard(cx,cy,label,banner){
  surfaces.push({kind:'paving',poly:[[cx-540,cy-230],[cx+210,cy-230],[cx+660,cy+110],[cx-160,cy+550]]});
  place('campHall',cx-90,cy-290,1,{label});
  for(const [dx,dy] of [[-700,-70],[710,0],[-480,640],[480,640]])place('tent',cx+dx,cy+dy,1);
  place('well',cx+790,cy+170);place(banner,cx-340,cy+100);place(banner,cx+410,cy+300);
  road([[cx-860,cy+120],[cx-440,cy+320],[cx+100,cy+580],[cx+880,cy+160]],85,'yard-front');
  road([[cx-860,cy+120],[cx-650,cy-600],[cx+450,cy-650],[cx+880,cy+160]],76,'yard-back');
  for(let i=0;i<5;i++)place('tent',cx-1020+i*490,cy+1020,.9);
  road([[cx-1130,cy+1120],[cx+1100,cy+1120],[cx+880,cy+160]],70,'barracks-lane');
}
militaryYard(5680,1770,'Doanh trại Bắc','banner');militaryYard(9700,12090,'Chiến địa Nam','bannerKin');
// Eastern fort: a civic yard with a settlement around it.
surfaces.push({kind:'paving',poly:[[10600,1740],[11300,2020],[11600,2420],[10940,2780],[10430,2440]]});
place('hall',11020,1970,1.1);place('gateReverse',10920,2800,.9,{label:'Đông Quan'});place('shrine',11580,2390,1);
hamlet(11250,3220,6);
// Southern farmland forms one belt of terraces, continuing from the old fields.
for(let row=0;row<4;row++)for(let col=0;col<6;col++){
  const x=2600+col*640+row*80,y=11200+row*320;
  const poly=[[x,y],[x+440,y+140],[x+240,y+270],[x-200,y+130]];surfaces.push({kind:'field',poly});road([poly[0],poly[1],poly[2]],32,'field-ridge');
}
// Rock corridors leave generous gaps on both sides of each lane.
for(const [cx,cy] of [[2250,2500],[12200,10480]])for(let i=0;i<18;i++){
  const a=i/18*Math.PI*2;if(i%6===0||i%6===1)continue;place(i%2?'rockA':'rockB',cx+Math.cos(a)*930,cy+Math.sin(a)*700,1.7);
}
for(const b of BRIDGES)place('bridge',b.x,b.y,1,{id:b.id,ground:true});
// Each house entrance joins a continuous street; isolated dirt patches are not terrain.
for(const r of roads.filter(r=>r.id==='door-path')){
  const p=r.pts[0];let best=null,score=Infinity;
  for(const s of roads.filter(r=>r.id!=='door-path'))for(let i=1;i<s.pts.length;i++){
    const a=s.pts[i-1],b=s.pts[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy||1)));
    const q=[a[0]+dx*t,a[1]+dy*t],d=Math.hypot(q[0]-p[0],q[1]-p[1])+(q[1]<p[1]-32?500:0);if(d<score){score=d;best=q;}
  }r.pts=[p,best];
}
export const roadClearance=(x,y)=>{let d=Infinity;for(const r of roads)for(let i=1;i<r.pts.length;i++)d=Math.min(d,segDist(x,y,...r.pts[i-1],...r.pts[i])-r.width/2);return d;};
const riverDistance=(x,y)=>{let d=Infinity;for(let i=1;i<RIVER.length;i++)d=Math.min(d,segDist(x,y,...RIVER[i-1],...RIVER[i]));return d;};
// Clear old border plants where new roads cross the former map edge.
const vegetation=new Set(['tree','bamboo','bush']);
for(let i=objects.length-1;i>=0;i--)if(vegetation.has(objects[i].type)&&roadClearance(objects[i].x,objects[i].y)<55)objects.splice(i,1);
const buildings=objects.filter(p=>!vegetation.has(p.type)&&p.type!=='rock'&&!p.ground),rng=mulberry32(10028005);
for(let y=160;y<WORLD_SIZE-160;y+=150)for(let x=160;x<WORLD_SIZE-160;x+=150){
  const px=x+rng()*45,py=y+rng()*45;if(px>=O&&px<O+7200&&py>=O&&py<O+7200)continue;
  const sector=sectorAt(px,py),roll=rng();
  // Ease density near borders without mixing unrelated palettes across them.
  const b=sector.bounds,edge=Math.min(px-b[0],py-b[1],b[2]-px,b[3]-py),density=sector.density*(.55+.45*Math.min(1,edge/320));
  if(roll>density||roadClearance(px,py)<60||riverDistance(px,py)<RIVER_WIDTH/2+65)continue;
  if(buildings.some(p=>Math.abs(px-p.x)<260*p.s&&py>p.y-350*p.s&&py<p.y+150*p.s))continue;
  if(surfaces.some(p=>inside(p.poly,px,py)))continue;
  if(DISTRICTS.some(p=>Math.hypot(px-p.x,py-p.y)<180))continue;
  place(sector.palette[Math.floor(rng()*sector.palette.length)],px,py,[.9,1,1.1][Math.floor(rng()*3)]);
}
objects.forEach((p,i)=>{p.sector=sectorAt(p.x,p.y)?.id;p.v=i;});
export const ROADS=roads;
export const SURFACES=surfaces;
export const OBJECTS=objects;
export const MAP_PROVENANCE={art:'VLTK1 client map-kit',layout:'authored-adjacent-regions',nativeRegionLayoutDecoded:false,militaryLayout:'two camps, open yards, main road and flanking routes inspired by Tong Kim'};
