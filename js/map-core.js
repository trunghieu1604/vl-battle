// Authored geography. Match seeds change loot, never streets, buildings or vegetation.
import { mulberry32, segDist } from './util.js';
export const MAP_NAME = 'Tràng An — Bến Cổ';
export const MAP_VERSION = 'trang-an-ben-co-1';
export const VILLAGE_LAYOUT = { x: 1900, y: 2500, w: 2500, h: 2000, cx: 3100, cy: 3500, name: 'Làng Bến Cổ' };
const smooth = points => {
  const out = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[Math.max(0,i-1)], b = points[i], c = points[i+1], d = points[Math.min(points.length-1,i+2)];
    for (let j = 0; j < 10; j++) { const t=j/10; out.push([0,1].map(k=>.5*(2*b[k]+(-a[k]+c[k])*t+(2*a[k]-5*b[k]+4*c[k]-d[k])*t*t+(-a[k]+3*b[k]-3*c[k]+d[k])*t*t*t))); }
  }
  out.push(points.at(-1)); return out;
};
export const RIVER_WIDTH = 176;
export const RIVER = smooth([[4200,-200],[4210,950],[3950,1800],[3770,2580],[3745,3090],[3770,3410],[3720,3670],[3750,3940],[3890,4210],[4070,4960],[4300,5640],[4240,6400],[4360,7400]]);
const riverX = y => { for(let i=1;i<RIVER.length;i++)if(RIVER[i-1][1]<=y&&RIVER[i][1]>=y){const a=RIVER[i-1],b=RIVER[i];return a[0]+(b[0]-a[0])*(y-a[1])/(b[1]-a[1]);}throw Error('River crossing outside map'); };
export const BRIDGES = [1180,3780,5680].map((y,i)=>({ id:['cau-bac','cau-ben','cau-nam'][i], x:riverX(y), y,
  left:[riverX(y)-250,y+113], right:[riverX(y)+250,y-113],
  deck:[[-157,43],[-96,69],[144,-46],[109,-74]].map(([dx,dy])=>[riverX(y)+dx*1.2,y+dy*1.2]) }));
export const DISTRICTS = [
  { id:'village',name:'Làng Bến Cổ',type:'painted',glyph:'安',x:2880,y:3770,r:800,loot:26,rich:false,exits:['court','harbor','fields','temple'] },
  { id:'court',name:'Đình Tràng An',type:'temple',glyph:'亭',x:2960,y:3210,r:430,loot:14,rich:true,exits:['village','harbor'] },
  { id:'harbor',name:'Bến Cổ',type:'dock',glyph:'津',x:3550,y:4010,r:430,loot:14,rich:false,exits:['village','bamboo','fields'] },
  { id:'fields',name:'Ruộng · Xóm ngoài',type:'field',glyph:'田',x:1630,y:5240,r:850,loot:18,rich:false,exits:['village','temple','stone'] },
  { id:'bamboo',name:'Rừng tre Thanh Khê',type:'forest',glyph:'竹',x:5460,y:3400,r:850,loot:18,rich:false,exits:['harbor','camp','stone'] },
  { id:'temple',name:'Chùa Vân Sơn',type:'temple',glyph:'寺',x:1530,y:1500,r:700,loot:18,rich:true,exits:['village','fields','camp'] },
  { id:'camp',name:'Trại Đá bỏ hoang',type:'fortress',glyph:'寨',x:5480,y:1540,r:740,loot:18,rich:true,exits:['temple','bamboo','stone'] },
  { id:'stone',name:'Thung đá Ninh Vân',type:'cliff',glyph:'崖',x:5430,y:5580,r:820,loot:18,rich:true,exits:['fields','bamboo','camp'] },
];
const roads=[];
const road=(pts,width=90,id='lane')=>{roads.push({pts,width,id});return pts;};
const [north,mid,south]=BRIDGES;
road([[600,3470],[1900,3440],[2490,3420],[2700,3375],[2920,3455],[3160,3540],[3410,3760],mid.left,[mid.x,mid.y],mid.right,[4500,3540],[5460,3400],[6550,3050]],100,'main');
road([[2300,3417],[2224,3710],[2410,3970],[2580,3970],[2940,4050],[3320,3850],[3410,3760]],65,'village-loop');
road([[2875,3468],[2880,3360],[2830,3295],[2805,3250]],65,'court-front');
road([[3220,3310],[3430,3440],[3360,3630],[3410,3760]],62,'court-east');
road([[3410,3760],[3460,3900],[3600,4080],[3710,4310],[3360,4580],[2300,4880],[1630,5240]],72,'bank-west');
road([[1530,1640],[1800,2130],[2110,2540],[2150,3000],[2300,3417]],94,'hill-road');
road([[1530,1640],[930,2250],[1050,3000],[1240,3970],[1370,4550],[1630,5240]],72,'western-loop');
road([[1530,1640],[2250,1260],[3150,1470],north.left,[north.x,north.y],north.right,[4790,1350],[5480,1640]],92,'north-crossing');
road([[1630,5240],[2310,5800],[3120,6060],south.left,[south.x,south.y],south.right,[5430,5730],[6590,6090]],94,'south-crossing');
road([[5480,1640],[5970,2140],[5850,2850],[5460,3400],[5430,4310],[5430,5730]],86,'eastern-road');
road([[5480,1640],[6550,1950],[6520,3730],[6570,4980],[5430,5730]],66,'eastern-loop');
road([[2300,3417],[1720,3870],[1630,5240]],70,'field-road');
road([[1630,5240],[2030,4940],[2350,5100],[2440,5480],[2310,5800]],60,'hamlet-loop');
road([[5460,3400],[4860,3070],[4550,2590],[4790,1350]],64,'bank-east');
road([[5430,4310],[4750,4670],south.right],60,'stone-loop');
export const ROADS=roads;
const surfaces=[], objects=[];
const place=(asset,x,y,s=1,extra={})=>{const types={home:'house',market:'house',shrine:'pagoda',banyan:'tree',treeA:'tree',treeB:'tree',treeC:'tree',bambooA:'bamboo',bambooB:'bamboo',bushA:'bush',bushB:'bush',rockA:'rock',rockB:'rock',gateReverse:'gate',wallDown:'wall',wallUp:'wall'};const p={type:types[asset]||asset,asset,x,y,s,r:0,v:objects.length,...extra};objects.push(p);return p;};
function walls(asset,a,b,scale=1) {
  const dx=b[0]-a[0],dy=b[1]-a[1],n=Math.ceil(Math.abs(dx)/(130*scale)),s=Math.abs(dx)/n/130;
  for(let i=0;i<n;i++){const t=(i+.5)/n;place(asset,a[0]+dx*t,a[1]+dy*t,s);}
}
// The approved visual slice is placed at the heart of the larger geography.
const X=2000,Y=2600,P=(asset,x,y,s=1,extra)=>place(asset,x+X,y+Y,s,extra);
const court=[[790,310],[1390,610],[1030,790],[430,490]].map(([x,y])=>[x+X,y+Y]);
surfaces.push({kind:'paving',poly:court});
surfaces.push({kind:'verge',poly:[[250,1080],[1110,1090],[1410,1420],[760,1550],[300,1390]].map(([x,y])=>[x+X,y+Y])});
P('hall',1040,466);P('shrine',1295,566);P('banyan',478,586,1.08);P('well',809,627);
for(const [a,x,y,s] of [['home',425,695,.92],['home',780,1090,.9],['market',1460,890,1],['home',1420,542,.93],['home',500,1247,1],['home',897,1308,.98],['market',1281,1300,.86]]) {
  P(a,x,y,s);road([[x+X,y+Y+40],[x+X+75,y+Y+140]],46,'door-path');
}
P('gateReverse',830,739,.82,{label:'Đình Tràng An'});P('gate',1220,729,.65);
for(const [a,ax,ay,bx,by] of [['wallDown',790,310,1390,610],['wallUp',1390,610,1318,646],['wallUp',1122,744,1030,790],['wallUp',430,490,790,310],['wallDown',430,490,710,630],['wallDown',950,750,1030,790]])walls(a,[ax+X,ay+Y],[bx+X,by+Y]);
P('hay',353,1249);P('hay',985,1311,.85);P('hay',1190,1294,.78);
// More houses face the lanes, each with a small entrance rather than another radial ring.
for(const [a,x,y,s] of [['home',1940,3460,.95],['home',2170,3830,.92],['market',2560,3560,.9],['home',3060,4130,.94],['home',3470,4340,.9],['market',3450,4140,.92]]){
  place(a,x,y,s);road([[x,y+35],[x+80,y+145]],48,'door-path');
}
place('dock',3690,4080,.91);
// A smaller hill court, with a front gate and an east service gate.
function enclosedCourt(cx,cy,s,label) {
  const q=([x,y])=>[cx+x*s,cy+y*s], put=(a,x,y,k=1,e)=>place(a,...q([x,y]),s*k,e);
  surfaces.push({kind:'paving',poly:[[-170,-250],[430,50],[70,230],[-530,-70]].map(q)});
  put('hall',80,-94);put('shrine',330,7);put('well',-270,50,.9);
  put('gateReverse',-130,176,.82,{label});put('gate',270,169,.65);
  for(const [a,ax,ay,bx,by] of [['wallDown',-170,-250,430,50],['wallUp',430,50,358,86],['wallUp',162,184,70,230],['wallUp',-530,-70,-170,-250],['wallDown',-530,-70,-250,70],['wallDown',-10,190,70,230]])walls(a,q([ax,ay]),q([bx,by]),s);
  const front=q([-130,176]),east=q([270,169]);road([q([-190,430]),[front[0],front[1]+30],q([-145,85])],62,'court-front');
  road([q([-190,430]),q([600,420]),[east[0]+180,east[1]+90],q([240,100])],62,'court-loop');
}
enclosedCourt(1650,1260,1.15,'Chùa Vân Sơn');
place('home',1110,1660,.95);place('home',2090,1870,.92);place('banyan',1170,1340,1.1);
// Dry field terraces and a hamlet: open ridges connect the village and southern crossing.
for(let row=0;row<3;row++)for(let col=0;col<3;col++){
  const x=840+col*330+row*70,y=4780+row*235;
  const poly=[[x,y],[x+260,y+130],[x+140,y+190],[x-120,y+60]];
  surfaces.push({kind:'field',poly});road([poly[0],poly[1],poly[2]],30,'field-ridge');
}
for(const [x,y] of [[1990,4870],[2350,5060],[2600,5450],[2000,5690],[2460,5950]]){
  place('home',x,y,.88);place('hay',x-115,y+10,.9);road([[x,y+45],[x+100,y+150]],44,'door-path');
}
place('well',2260,5510,.9);
// An abandoned yard, three buildings with open flanks; no NPCs, bosses or animals.
surfaces.push({kind:'verge',poly:[[5010,1320],[5770,1400],[6000,1980],[5290,2160],[4900,1830]]});
place('market',5380,1420,1.03);place('home',5020,1730,.96);place('home',5840,1870,.96);place('well',5560,1770);
place('hay',5160,1800);place('hay',5860,1970);
road([[5000,1860],[5220,2060],[5780,2100],[6070,1750],[5480,1640]],64,'camp-loop');
// Shelter at the forest edge, with clear entry and exit lanes.
place('home',5160,3490,.9);place('market',5790,3570,.84);place('shrine',5060,3150,.85);
road([[4860,3070],[5050,3650],[5460,3730],[5870,3700],[5850,2850]],60,'bamboo-loop');
// Stone formations flank a curved lane, never surround the loot in a closed ring.
place('home',5240,5720,.88);place('shrine',5760,5420,.9);
road([[5050,5480],[5410,5270],[5910,5590],[5800,5940],[5430,6060],[5070,5810]],65,'valley-loop');
for(let i=0;i<26;i++){const a=i/25*Math.PI*1.7,x=5480+Math.cos(a)*620,y=5600+Math.sin(a)*440;if(i>7&&i<11||i>19&&i<23)continue;place(i%2?'rockA':'rockB',x,y,1.5+(i%3)*.22);}
for(const b of BRIDGES)place('bridge',b.x,b.y,1,{id:b.id,ground:true});
// Door paths terminate on a street on the building's front side, rather than floating dirt patches.
for(const r of roads.filter(r=>r.id==='door-path')){
  const p=r.pts[0];let best=null,score=Infinity;
  for(const street of roads.filter(r=>r.id!=='door-path'))for(let i=1;i<street.pts.length;i++){
    const a=street.pts[i-1],b=street.pts[i],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy||1)));
    const q=[a[0]+dx*t,a[1]+dy*t],d=Math.hypot(q[0]-p[0],q[1]-p[1])+(q[1]<p[1]-32?500:0);
    if(d<score){score=d;best=q;}
  }
  r.pts=[p,best];
}
// Static nature uses its own fixed stream. Areas have one season and a small reviewed palette.
const rng=mulberry32(735109), distanceToRoad=(x,y)=>{
  let d=Infinity;for(const r of roads)for(let i=1;i<r.pts.length;i++)d=Math.min(d,segDist(x,y,...r.pts[i-1],...r.pts[i])-r.width/2);return d;
};
export const roadClearance=distanceToRoad;
const distRiver=(x,y)=>{let d=Infinity;for(let i=1;i<RIVER.length;i++)d=Math.min(d,segDist(x,y,...RIVER[i-1],...RIVER[i]));return d;};
const architecture=[...objects];
for(let y=170;y<7050;y+=136)for(let x=170;x<7050;x+=136){
  const px=x+rng()*52,py=y+rng()*48;
  if(distanceToRoad(px,py)<48||distRiver(px,py)<RIVER_WIDTH/2+42)continue;
  if(architecture.some(p=>Math.abs(px-p.x)<230*p.s&&py>p.y-220*p.s&&py<p.y+145*p.s))continue;
  if(surfaces.some(p=>p.kind!=='field'&&inside(p.poly,px,py)))continue;
  const forest=Math.hypot(px-5460,py-3400)<1000,edge=px<620||py<540||px>6720||py>6740;
  const field=Math.hypot(px-1450,py-5200)<1000,stone=Math.hypot(px-5430,py-5580)<850;
  const roll=rng();if(roll>(edge?.8:forest?.75:field?.07:stone?.3:.26))continue;
  const asset=stone?(rng()<.75?'rockB':'bushB'):forest?(rng()<.72?'bambooA':'bambooB'):rng()<.17?'bushA':['treeA','treeB','treeC'][Math.floor(rng()*3)];
  place(asset,px,py,.9+rng()*.2);
}
for(const [x,y,n] of [[2255,3020,4],[3480,2880,5],[3495,3260,3],[2305,4030,4],[3110,4155,4],[3530,4430,3],[880,1520,4],[5830,1450,4]])for(let i=0;i<n;i++)place(i%2?'bambooA':'bambooB',x+i*38+rng()*14,y+rng()*50,.93+rng()*.1);
for(let i=0;i<95;i++){
  const y=300+i*69,x=riverX(y)-RIVER_WIDTH/2-60;
  if(distanceToRoad(x,y)<65||architecture.some(p=>Math.hypot(p.x-x,p.y-y)<150))continue;
  place(i%2?'bushA':'bushB',x,y,.63+rng()*.25);
}
export const SURFACES=surfaces;
export const OBJECTS=objects;
export function inside(poly,x,y){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c;}return c;}
