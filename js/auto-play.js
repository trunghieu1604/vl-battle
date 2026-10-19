import { state, drink } from './engine.js';

const KEY='giangho.auto-play.v1';
export const autoSettings={ hp:false, threshold:40 };
let lastAttempt=0, panel, button;
export function configureAuto(next) {
  autoSettings.hp=next.hp === true;
  const n=Number(next.threshold);
  autoSettings.threshold=Number.isFinite(n)?Math.max(5,Math.min(90,Math.round(n))):40;
  try { localStorage.setItem(KEY,JSON.stringify(autoSettings)); } catch {}
  if(button) button.classList.toggle('on',autoSettings.hp);
}
export function tickAutoPlay(now) {
  const p=state.player;
  if(!autoSettings.hp || state.phase!=='playing' || state.paused || !p?.alive || p.hp<=0 ||
    p.hp/p.maxHp>autoSettings.threshold/100 || !p.potions.hp || p.potionCD>0 || p.hot?.some(h=>h.type==='hp') || now-lastAttempt<800) return false;
  lastAttempt=now;
  return drink(p,'hp'); // Online uses the existing server-validated drink command.
}
export function initAutoPlay() {
  try { const saved=JSON.parse(localStorage.getItem(KEY)); if(saved)configureAuto(saved); } catch {}
  button=document.createElement('button');button.type='button';button.id='autoPlayBtn';button.className='utility';button.textContent='AUTO';button.classList.toggle('on',autoSettings.hp);
  document.getElementById('bagBtn').after(button);
  panel=document.createElement('section');panel.id='autoPlayPanel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Cài đặt tự động');
  panel.innerHTML='<header><b>Cài đặt Auto</b><button type="button" aria-label="Đóng cài đặt Auto">×</button></header><label><input id="autoHpEnabled" type="checkbox"> Tự uống thuốc sinh lực</label><label>Uống khi sinh lực ≤ <output id="autoHpValue"></output>%<input id="autoHpThreshold" aria-label="Ngưỡng sinh lực phần trăm" type="range" min="5" max="90" step="5"></label><small>Dùng thuốc đang có trong túi, tuân theo thời gian hồi thuốc. Cài đặt áp dụng cho nhân vật của bạn.</small>';
  const enabled=panel.querySelector('#autoHpEnabled'), threshold=panel.querySelector('#autoHpThreshold'), value=panel.querySelector('output');
  enabled.checked=autoSettings.hp;threshold.value=autoSettings.threshold;value.value=autoSettings.threshold;
  const save=()=>{configureAuto({hp:enabled.checked,threshold:threshold.value});value.value=autoSettings.threshold;};
  enabled.addEventListener('change',save);threshold.addEventListener('input',save);
  button.onclick=()=>{panel.hidden=!panel.hidden;};panel.querySelector('button').onclick=()=>{panel.hidden=true;};
  panel.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape')panel.hidden=true;});
  document.getElementById('game').append(panel);
  const css=document.createElement('style');css.textContent='#autoPlayPanel{position:absolute;z-index:12;top:calc(var(--safe-top,0px) + 52px);right:calc(var(--safe-right,0px) + 8px);width:min(310px,calc(100% - 24px));max-height:calc(100% - 70px);overflow:auto;box-sizing:border-box;padding:14px;background:#203b30;border:1px solid #c9ae72;color:#ece1c2;font:13px/1.5 Arial;touch-action:pan-y}#autoPlayPanel[hidden]{display:none}#autoPlayPanel header{display:flex;align-items:center;justify-content:space-between}#autoPlayPanel button{width:44px;height:44px;background:#345c49;border:1px solid #a69b69;color:#fff;font-size:24px}#autoPlayPanel label{display:block;margin:12px 0}#autoPlayPanel input[type=range]{display:block;width:100%;height:44px;touch-action:none}#autoPlayPanel input[type=checkbox]{width:24px;height:24px;vertical-align:middle}#autoPlayPanel small{color:#bcc9ac}#autoPlayBtn.on{color:#f7dc85;border-color:#c9ae72}';document.head.append(css);
}
