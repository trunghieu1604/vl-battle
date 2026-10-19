import { RULES } from './data.js';

// Aim assistance changes the launch point only. Projectiles still collide,
// miss, and respect walls; source effects and hit budgets stay unchanged.
export function assistedTargetPoint(player, skill, enemies, cursor, touch, clear) {
  const range = Math.min(skill?.reach || Infinity, skill?.range || skill?.radius || skill?.dist || 420);
  const visible = enemies.filter(e => e !== player && Math.hypot(e.x - player.x, e.y - player.y) <= range && clear(player.x, player.y, e.x, e.y, 10));
  let target = visible.includes(player.target) ? player.target : null;
  if (!target) {
    const anchor = !touch && cursor ? cursor : player;
    target = visible.sort((a,b) => Math.hypot(a.x-anchor.x,a.y-anchor.y)-Math.hypot(b.x-anchor.x,b.y-anchor.y))[0];
    if (!touch && cursor && target && Math.hypot(target.x-cursor.x,target.y-cursor.y) > 110) target = null;
  }
  if (!target) return cursor || { x:player.x+Math.cos(player.angle)*range, y:player.y+Math.sin(player.angle)*range };
  const distance = Math.hypot(target.x-player.x,target.y-player.y);
  const delay = Math.min(0.45, (skill?.cast || 0.15) + (skill?.speed > 0 ? distance/skill.speed : 0));
  const lead = target.moving && target.stunT <= 0 && target.rootT <= 0 ? Math.min(80, RULES.moveSpeed*(1+(target.stats?.move||0))*delay) : 0;
  let x=target.x+Math.cos(target.angle)*lead, y=target.y+Math.sin(target.angle)*lead;
  if (Math.hypot(x-player.x,y-player.y)>range || !clear(player.x,player.y,x,y,10)) { x=target.x; y=target.y; }
  return { x, y, target };
}
