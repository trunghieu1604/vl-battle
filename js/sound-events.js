// Sound events the game plays, shared by audio.js and the sound lab (sound-lab.html).
// "a.b.c" falls back to "a.b", then "a", when it has no sound of its own (cast.sl.nam → cast.sl → cast).
// loop: played as a looping bed (ambient, music) instead of a one-shot.
export const SOUND_EVENTS = [
  { group: 'Đòn đánh', items: [
    ['swing', 'Vung binh khí (chung)'], ['swing.kiem', 'Vung kiếm'], ['swing.dao', 'Vung đao'], ['swing.con', 'Vung côn'],
    ['swing.thuong', 'Đâm thương'], ['swing.quyen', 'Ra quyền'], ['dart', 'Phóng ám khí'],
    ['hit', 'Trúng đòn (chung)'], ['hit.kiem', 'Trúng kiếm'], ['hit.dao', 'Trúng đao'], ['hit.con', 'Trúng côn'],
    ['hit.thuong', 'Trúng thương'], ['hit.quyen', 'Trúng quyền'], ['hit.amkhi', 'Trúng ám khí'], ['hurt', 'Bản thân trúng đòn'],
  ] },
  { group: 'Võ công', items: [
    ['cast', 'Xuất chiêu'],
    ...[['sl', 'Thiếu Lâm'], ['tw', 'Thiên Vương'], ['tm', 'Đường Môn'], ['wu', 'Ngũ Độc'], ['em', 'Nga Mi'], ['cy', 'Thúy Yên'], ['gb', 'Cái Bang'], ['tr', 'Thiên Nhẫn'], ['wd', 'Võ Đang / Hoa Sơn'], ['kl', 'Côn Lôn']]
      .flatMap(([fx, name]) => [[`cast.${fx}.nam`, `Xuất chiêu ${name} — nam`], [`cast.${fx}.nu`, `Xuất chiêu ${name} — nữ`]]),
    ['heavy', 'Chiêu nặng / chấn đất'], ['frost', 'Chiêu băng'], ['parry', 'Đỡ / phá chiêu'], ['learn', 'Lĩnh hội bí kíp'],
  ] },
  { group: 'Nhân vật · vật phẩm', items: [
    ['leap', 'Khinh công'], ['die', 'Ngã xuống'], ['drink', 'Uống thuốc'], ['pickup', 'Nhặt binh khí'], ['equip', 'Mặc trang bị / đổi binh khí'], ['chest', 'Mở rương'],
  ] },
  { group: 'Môi trường (lặp)', loop: true, items: [
    ['amb.wild', 'Hoang dã'], ['amb.village', 'Làng'], ['amb.water', 'Gần sông nước'],
  ] },
  { group: 'Nhạc nền (lặp)', loop: true, music: true, items: [
    ['music.menu', 'Màn chọn nhân vật'], ['music.village', 'Trong làng'], ['music.wild', 'Hoang dã'], ['music.battle', 'Vòng bo cuối'],
  ] },
];
export const LOOP_EVENTS = new Set(SOUND_EVENTS.filter(g => g.loop).flatMap(g => g.items.map(i => i[0])));
export const SOUND_PREVIEW_KEY = 'tieungao-sound-preview';
