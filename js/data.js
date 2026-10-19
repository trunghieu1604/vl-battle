import { VLTK_BOOKS, VLTK_CATALOG } from './vltk-books.js';
import { WORLD_SIZE, MATCH_CAPACITY, SPAWN_GAP } from './match-config.js';
// Static game data for the survival mode, following docs/ke-hoach/PHUONG_AN_CAN_BANG_VO_HOC.md.
// Every number here is a first balancing hypothesis, meant to be tuned by playtests.
// Skill effects are game-design adaptations; `source` fields still need checking against a chosen translation.

export const WORLD = WORLD_SIZE;

// ---------- room rules ----------
export const RULES = {
  baseHp: 1000, baseMp: 100, baseSt: 100,
  mpRegen: 6, stRegen: 9, moveSpeed: 190,
  attackBonusCap: 0.35,      // total attack bonus from every source
  armorDRCap: 0.20,          // damage reduction from clothing
  totalDRCap: 0.30,          // clothing + inner art + timed defence
  cdrCap: 0.10, mpCostCap: 0.15, ccReduceCap: 0.20,
  gearMoveCap: 0.10,         // movement bonus from equipment
  buffMoveCap: 0.20,         // short mobility buffs have their own budget
  slowCap: 0.5,
  cc: { window: 3, second: 0.5, thirdImmune: true },
  pkModes: false,            // survival: everyone alive is a valid opponent
  capacity: MATCH_CAPACITY, botCount: MATCH_CAPACITY - 1, spawnGap: SPAWN_GAP,
  tierVQuota: [5, 6],        // announced treasure manuals; elite drops have their own quota
  gearSlots: ['armor', 'boots', 'bracer', 'hat', 'jade', 'belt', 'neck', 'ring1', 'ring2'],
  potionMax: 20,
  potionExtraChance: 0.5,                    // survival rule: extra 2–3 potion stack beside a loot spot
  lifeStealCap: 0.15, manaStealCap: 0.25,    // gear "Hút sinh lực / Hút nội lực" (docs/ke-hoach/TRUNG_DOC_BANG_SAT_HUT_LUC_2026-10-06.md)
  poisonMaxDots: 4,
};

export const ELEMENTS = {
  kim: { name: 'Kim', color: '#e9d27c' }, moc: { name: 'Mộc', color: '#93c86c' }, thuy: { name: 'Thủy', color: '#72b6e2' },
  hoa: { name: 'Hỏa', color: '#e7764f' }, tho: { name: 'Thổ', color: '#c9a066' },
};

// Kept for a future room rule (RULES.pkModes = true).
export const PK_MODES = {
  luyencong: { name: 'Luyện công', short: 'LC', color: '#9fd28a', desc: 'Không chủ động tấn công người khác.' },
  chiendau: { name: 'Chiến đấu', short: 'CĐ', color: '#7fb8ff', desc: 'Đánh được người ở Chiến đấu, Đồ sát và kẻ mang tên đỏ.' },
  dosat: { name: 'Đồ sát', short: 'ĐS', color: '#ff6b5a', desc: 'Tấn công bất kỳ ai.' },
};
export const PK_ORDER = ['luyencong', 'chiendau', 'dosat'];

export const TIERS = [
  null,
  { n: 'I', name: 'Nhập môn', color: '#e6e0cc' },
  { n: 'II', name: 'Tinh yếu', color: '#8fd18a' },
  { n: 'III', name: 'Thượng thừa', color: '#7cb8ff' },
  { n: 'IV', name: 'Tuyệt học', color: '#c792ff' },
  { n: 'V', name: 'Truyền thuyết', color: '#f2a04e' },
];
// Gear and weapon quality uses the same five colours (index 0..4 => tier 1..5).
export const RARITY = TIERS.slice(1);

// Factions are appearance + starting weapon only for now: everyone gets the same stat budget.
// side, arts and avatars describe the character system; faction-specific rules come later.
// avatars[].vltk: VLTK1 sprite set used while holding the faction weapon (tools/vltk1-import/export-characters.cjs);
// scale > 1 shrinks larger source art to the common height.
export const SIDES = {
  chinh: { name: 'Chính phái', color: '#d9c27a' },
  trung: { name: 'Trung lập', color: '#9cc3b4' },
  ta: { name: 'Tà phái', color: '#d07a6a' },
};
export const GENDERS = { nam: 'Nam', nu: 'Nữ' };
const look = (robe, trim, sash, pants, extra = {}) => ({ robe, trim, sash, pants, boots: '#2a2420', hair: '#161210', skin: '#dcae88', ...extra });
const avatar = (id, gender, title, set, extra = {}) => ({ id, gender, title, vltk: { set, ...extra } });
// VLTK1 player character (MainMan/MainLady) assembled from parts at run time. armor/helm = part numbers the client
// gives the faction's gold set (settingsitemgoldequip.txt + goldequipres.txt, faction requirement 39); here the
// Nguyệt Khuyết set, the tier where every faction has its own costume. tools/vltk1-import/export-player.cjs maps them.
const pavatar = (id, gender, title, armor, extra = {}) => ({ id, gender, title, player: { sex: gender === 'nu' ? 'woman' : 'man', armor, ...extra } });
export const FACTIONS = [
  // chính phái
  { id: 'thieulam', fx: 'sl', name: 'Thiếu Lâm', glyph: '禪', vltk: true, side: 'chinh', element: 'kim', weapon: 'con', desc: 'Tăng nhân Thiếu Lâm — khởi đầu với Mộc Côn.',
    arts: ['Dịch Cân Kinh', 'La Hán Quyền', 'Kim Cang Bất Hoại'],
    look: { robe: '#c9873a', trim: '#8e4f22', sash: '#7a2d1c', pants: '#6b4a2a', boots: '#3a2a1c', hair: '#1b1714', skin: '#d9a77d', bald: true },
    avatars: [pavatar('thieulam-nam', 'nam', 'Tăng nhân', 83, { wear: 0 })] },
  { id: 'vodang', fx: 'wd', name: 'Võ Đang', glyph: '道', vltk: true, side: 'chinh', element: 'tho', weapon: 'kiem', desc: 'Đạo sĩ Võ Đang — khởi đầu với Thiết Kiếm.',
    arts: ['Thái Cực Quyền', 'Thái Cực Kiếm', 'Thê Vân Tung'],
    look: { robe: '#7f93a6', trim: '#d9dde0', sash: '#2b3640', pants: '#3d4650', boots: '#22262b', hair: '#1b1714', skin: '#e0b48d', hat: 'daoist' },
    avatars: [pavatar('vodang-nam', 'nam', 'Võ Đang nam', 102, { wear: 1 }), pavatar('vodang-nu', 'nu', 'Võ Đang nữ', 102, { wear: 8 })] },
  { id: 'ngami', fx: 'em', name: 'Nga Mi', glyph: '峨', vltk: true, side: 'chinh', element: 'thuy', weapon: 'kiem', desc: 'Nữ hiệp Nga Mi — khởi đầu với Thiết Kiếm.',
    arts: ['Nga Mi Kiếm Pháp', 'Phiêu Tuyết Xuyên Vân Chưởng', 'Cửu Âm Bạch Cốt Trảo'],
    look: look('#e8b9c6', '#f4e6ea', '#8a3b52', '#6a4a56', { skin: '#e8bf9c' }),
    avatars: [pavatar('ngami-nu', 'nu', 'Nga Mi nữ hiệp', 89, { wear: 7 })] },
  { id: 'caibang', fx: 'gb', name: 'Cái Bang', glyph: '丐', vltk: true, side: 'chinh', element: 'hoa', weapon: 'quyen', desc: 'Đệ tử Cái Bang — khởi đầu với Bố Thủ Sáo.',
    arts: ['Hàng Long Thập Bát Chưởng', 'Đả Cẩu Bổng Pháp', 'Tiêu Dao Du'],
    look: { robe: '#7a6a4a', trim: '#5b4c33', sash: '#a33c2a', pants: '#4c4232', boots: '#2b241a', hair: '#231c16', skin: '#d4a57e', patches: true },
    avatars: [pavatar('caibang-nam', 'nam', 'Cái Bang nam', 98, { wear: 5 }), pavatar('caibang-nu', 'nu', 'Cái Bang nữ', 98, { wear: 12 })] },
  { id: 'hoason', fx: 'wd', name: 'Hoa Sơn', glyph: '華', vltk: true, side: 'chinh', element: 'kim', weapon: 'kiem', desc: 'Kiếm khách Hoa Sơn — khởi đầu với Thiết Kiếm.',
    arts: ['Hoa Sơn Kiếm Pháp', 'Tử Hà Thần Công', 'Độc Cô Cửu Kiếm'],
    look: { robe: '#e8e1cc', trim: '#b9b09a', sash: '#2f8a84', pants: '#5b5a4f', boots: '#3b3128', hair: '#1b1714', skin: '#e1b891' },
    avatars: [pavatar('hoason-nam', 'nam', 'Hoa Sơn nam', 106, { wear: 3 }), pavatar('hoason-nu', 'nu', 'Hoa Sơn nữ', 106, { wear: 10 })] },
  { id: 'thienvuong', fx: 'tw', name: 'Thiên Vương Bang', glyph: '王', vltk: true, side: 'chinh', element: 'kim', weapon: 'thuong', desc: 'Bang chúng Thiên Vương — khởi đầu với Trường Thương.',
    arts: ['Thiên Vương Thương Pháp', 'Bá Vương Tạm Kim', 'Kim Chung Tráo'],
    look: look('#c9a640', '#8a1e1e', '#5a1414', '#3a2e22'),
    avatars: [pavatar('thienvuong-nam', 'nam', 'Thiên Vương nam', 86, { wear: 4 }), pavatar('thienvuong-nu', 'nu', 'Thiên Vương nữ', 86, { wear: 11 })] },
  { id: 'duongmon', fx: 'tm', name: 'Đường Môn', glyph: '唐', vltk: true, side: 'trung', element: 'moc', weapon: 'amkhi', desc: 'Đệ tử Đường Môn Tứ Xuyên — khởi đầu với Phi Tiêu.',
    arts: ['Bạo Vũ Lê Hoa', 'Tiểu Lý Phi Đao', 'Thiên La Địa Võng'],
    look: look('#3a3a42', '#7a2a2a', '#1a1a20', '#2a2a30'),
    avatars: [pavatar('duongmon-nam', 'nam', 'Đường Môn nam', 95, { wear: 2 }), pavatar('duongmon-nu', 'nu', 'Đường Môn nữ', 95, { wear: 10 })] },
  { id: 'thuyyen', fx: 'cy', name: 'Thúy Yên Môn', glyph: '翠', vltk: true, side: 'trung', element: 'thuy', weapon: 'dao', desc: 'Nữ đệ tử Thúy Yên — khởi đầu với Đơn Đao.',
    arts: ['Song Đao Thúy Yên', 'Băng Tâm Tiên Tử', 'Phù Vân Tán Tuyết'],
    look: look('#c8b8e8', '#f0e8f8', '#7a5aa8', '#5a4a78', { skin: '#ecc6a6' }),
    avatars: [pavatar('thuyyen-nu', 'nu', 'Thúy Yên nữ hiệp', 91, { wear: 13 })] },
  { id: 'thiennhan', fx: 'tr', name: 'Thiên Nhẫn Giáo', glyph: '忍', vltk: true, side: 'ta', element: 'hoa', weapon: 'dao', desc: 'Giáo đồ Thiên Nhẫn — khởi đầu với Đơn Đao.',
    arts: ['Ma Diễm Thất Sát', 'Thiên Nhẫn Đao Pháp', 'Vân Long Kích'],
    look: look('#2a1a2a', '#a82a2a', '#120a12', '#1e161e'),
    avatars: [pavatar('thiennhan-nam', 'nam', 'Thiên Nhẫn nam', 100, { wear: 2 }), pavatar('thiennhan-nu', 'nu', 'Thiên Nhẫn nữ', 100, { wear: 9 })] },
  // giang hồ Kim Dung khác
  { id: 'hangson', name: 'Hằng Sơn', glyph: '恆', side: 'chinh', element: 'thuy', weapon: 'kiem', desc: 'Ni cô Hằng Sơn — khởi đầu với Thiết Kiếm.',
    arts: ['Hằng Sơn Kiếm Pháp', 'Thiên Hương Đoạn Tục Cao'],
    look: look('#d8dde6', '#9aa6b8', '#4a5a78', '#5a6070', { skin: '#e6bf9e' }),
    avatars: [avatar('hangson-ni', 'nu', 'Ni cô', 'boss064'), avatar('hangson-nu', 'nu', 'Tục gia đệ tử', 'boss058')] },
  { id: 'toanchan', name: 'Toàn Chân', glyph: '真', side: 'chinh', element: 'kim', weapon: 'kiem', desc: 'Đạo sĩ Toàn Chân — khởi đầu với Thiết Kiếm.',
    arts: ['Toàn Chân Kiếm Pháp', 'Tiên Thiên Công', 'Thiên Cương Bắc Đẩu Trận'],
    look: look('#d9d6cc', '#8a8778', '#3a4a5a', '#4a4a44', { hat: 'daoist' }),
    avatars: [avatar('toanchan-nam', 'nam', 'Đạo sĩ', 'boss061')] },
  { id: 'khongdong', name: 'Không Động', glyph: '崆', side: 'chinh', element: 'hoa', weapon: 'quyen', desc: 'Võ sĩ Không Động — khởi đầu với Bố Thủ Sáo.',
    arts: ['Thất Thương Quyền', 'Không Động Kiếm Pháp'],
    look: look('#6a5a48', '#b09a72', '#8a2a20', '#3a3028'),
    avatars: [avatar('khongdong-nam', 'nam', 'Quyền sư', 'enemy085'), avatar('khongdong-nu', 'nu', 'Nữ quyền sư', 'boss007')] },
  { id: 'conlon', fx: 'kl', name: 'Côn Lôn', glyph: '崑', vltk: true, side: 'trung', element: 'tho', weapon: 'dao', desc: 'Đệ tử Côn Lôn — khởi đầu với Đơn Đao.',
    arts: ['Côn Lôn Đao Pháp', 'Lưỡng Nghi Kiếm Pháp'],
    look: look('#c9a640', '#5a4a20', '#2a2a2a', '#3a3426'),
    avatars: [pavatar('conlon-nam', 'nam', 'Côn Lôn nam', 104, { wear: 1 }), pavatar('conlon-nu', 'nu', 'Côn Lôn nữ', 104, { wear: 8 })] },
  { id: 'daily', name: 'Đại Lý Đoàn Thị', glyph: '理', side: 'chinh', element: 'kim', weapon: 'quyen', desc: 'Hoàng tộc Đại Lý — khởi đầu với Bố Thủ Sáo.',
    arts: ['Nhất Dương Chỉ', 'Lục Mạch Thần Kiếm'],
    look: look('#d8dde8', '#3a5a8a', '#2a3a5a', '#3a4458'),
    avatars: [avatar('daily-nam', 'nam', 'Vương gia', 'enemy046')] },
  { id: 'duonggia', name: 'Dương Gia Tướng', glyph: '楊', side: 'chinh', element: 'kim', weapon: 'thuong', desc: 'Hậu duệ Dương gia — khởi đầu với Trường Thương.',
    arts: ['Dương Gia Thương Pháp', 'Hồi Mã Thương'],
    look: look('#b0b4b8', '#8a1e1e', '#6a1414', '#3a3a3e'),
    avatars: [avatar('duonggia-nam', 'nam', 'Thương tướng', 'boss024'), avatar('duonggia-nu', 'nu', 'Nữ tướng', 'boss069')] },
  // trung lập
  { id: 'como', name: 'Cổ Mộ', glyph: '墓', side: 'trung', element: 'thuy', weapon: 'kiem', desc: 'Truyền nhân Cổ Mộ — khởi đầu với Thiết Kiếm.',
    arts: ['Ngọc Nữ Tâm Kinh', 'Ngọc Nữ Kiếm Pháp', 'Thiên La Địa Võng Thế'],
    look: look('#f0f0ee', '#c8c8c8', '#d8b0b8', '#d8d8d4', { skin: '#efd0b4' }),
    avatars: [avatar('como-nu', 'nu', 'Truyền nhân', 'boss059')] },
  { id: 'tieudao', name: 'Tiêu Dao', glyph: '逍', side: 'trung', element: 'moc', weapon: 'quyen', desc: 'Môn nhân Tiêu Dao — khởi đầu với Bố Thủ Sáo.',
    arts: ['Bắc Minh Thần Công', 'Lăng Ba Vi Bộ', 'Thiên Sơn Chiết Mai Thủ'],
    look: look('#e8ecef', '#9ab8c8', '#5a8aa0', '#c8ccd0'),
    avatars: [avatar('tieudao-nam', 'nam', 'Công tử', 'boss063'), avatar('tieudao-nu', 'nu', 'Tiên tử', 'boss070')] },
  { id: 'modung', name: 'Cô Tô Mộ Dung', glyph: '慕', side: 'trung', element: 'kim', weapon: 'kiem', desc: 'Thế gia Mộ Dung — khởi đầu với Thiết Kiếm.',
    arts: ['Đẩu Chuyển Tinh Di', 'Tham Hợp Chỉ'],
    look: look('#eef0f2', '#3a6a9a', '#2a4a6a', '#d0d4d8'),
    avatars: [avatar('modung-nam', 'nam', 'Công tử', 'boss022')] },
  { id: 'daohoa', name: 'Đào Hoa Đảo', glyph: '桃', side: 'trung', element: 'moc', weapon: 'amkhi', desc: 'Đệ tử Đào Hoa Đảo — khởi đầu với Phi Tiêu.',
    arts: ['Đạn Chỉ Thần Thông', 'Lạc Anh Thần Kiếm Chưởng', 'Bích Hải Triều Sinh Khúc'],
    look: look('#8aa6d8', '#e8c8d8', '#5a6aa8', '#4a5a88'),
    avatars: [avatar('daohoa-nu', 'nu', 'Đảo chủ ái nữ', 'boss028')] },
  { id: 'linhthuu', name: 'Linh Thứu Cung', glyph: '鷲', side: 'trung', element: 'thuy', weapon: 'quyen', desc: 'Nữ đệ tử Linh Thứu Cung — khởi đầu với Bố Thủ Sáo.',
    arts: ['Thiên Sơn Lục Dương Chưởng', 'Sinh Tử Phù', 'Bát Hoang Lục Hợp Duy Ngã Độc Tôn Công'],
    look: look('#b8323a', '#e8c070', '#5a1a20', '#4a2228'),
    avatars: [avatar('linhthuu-nu', 'nu', 'Thánh cô', 'boss073')] },
  // tà phái
  { id: 'nhatnguyet', name: 'Nhật Nguyệt Thần Giáo', glyph: '月', side: 'ta', element: 'hoa', weapon: 'amkhi', desc: 'Giáo chúng Nhật Nguyệt — khởi đầu với Phi Tiêu.',
    arts: ['Quỳ Hoa Bảo Điển', 'Hấp Tinh Đại Pháp'],
    look: { robe: '#5a1f22', trim: '#c9a24f', sash: '#1a1414', pants: '#251a1a', boots: '#151010', hair: '#120e0e', skin: '#d8ab86' },
    avatars: [avatar('nhatnguyet-nu', 'nu', 'Thánh cô', 'boss016')] },
  { id: 'minhgiao', name: 'Minh Giáo', glyph: '明', side: 'ta', element: 'hoa', weapon: 'dao', desc: 'Giáo đồ Minh Giáo — khởi đầu với Đơn Đao.',
    arts: ['Càn Khôn Đại Na Di', 'Thánh Hỏa Lệnh Võ Công'],
    look: look('#a83224', '#e0a040', '#3a1a14', '#2a1a16'),
    avatars: [avatar('minhgiao-nam', 'nam', 'Hộ giáo pháp vương', 'boss011'), avatar('minhgiao-nu', 'nu', 'Thánh nữ', 'boss014')] },
  { id: 'ngutien', fx: 'wu', name: 'Ngũ Độc Giáo', glyph: '蠱', vltk: true, side: 'ta', element: 'moc', weapon: 'quyen', desc: 'Môn đồ Ngũ Độc (Ngũ Tiên) — khởi đầu với Bố Thủ Sáo.',
    arts: ['Ngũ Độc Thần Chưởng', 'Huyền Âm Trảm', 'Kim Tằm Cổ Độc'],
    look: { robe: '#3d4f8a', trim: '#d8c060', sash: '#b0352e', pants: '#2a3352', boots: '#1c2033', hair: '#141218', skin: '#dcae88', hat: 'band' },
    avatars: [pavatar('ngutien-nam', 'nam', 'Ngũ Độc nam', 93, { wear: 6 }), pavatar('ngutien-nu', 'nu', 'Ngũ Độc nữ', 93, { wear: 9 })] },
  { id: 'tinhtuc', name: 'Tinh Túc Phái', glyph: '星', side: 'ta', element: 'moc', weapon: 'quyen', desc: 'Môn đồ Tinh Túc — khởi đầu với Bố Thủ Sáo.',
    arts: ['Hóa Công Đại Pháp', 'Hủ Thi Độc Chưởng'],
    look: look('#2a3a6a', '#8a2a3a', '#1a1a2a', '#22283a'),
    avatars: [avatar('tinhtuc-nam', 'nam', 'Độc thủ', 'enemy109')] },
  { id: 'bachda', name: 'Bạch Đà Sơn', glyph: '蛇', side: 'ta', element: 'moc', weapon: 'con', desc: 'Môn hạ Bạch Đà Sơn — khởi đầu với Mộc Côn.',
    arts: ['Cáp Mô Công', 'Linh Xà Quyền', 'Xà Trượng Pháp'],
    look: look('#c8ccc0', '#5a6a4a', '#3a4a2a', '#4a5040'),
    avatars: [avatar('bachda-nam', 'nam', 'Thiếu chủ', 'enemy076')] },
  { id: 'huyetdao', name: 'Huyết Đao Môn', glyph: '血', side: 'ta', element: 'hoa', weapon: 'dao', desc: 'Tăng nhân Huyết Đao — khởi đầu với Đơn Đao.',
    arts: ['Huyết Đao Đao Pháp', 'Huyết Đao Đại Pháp'],
    look: look('#6a2a1e', '#2a2a2a', '#8a1a14', '#2a201c', { bald: true }),
    avatars: [avatar('huyetdao-nam', 'nam', 'Lão tổ', 'boss015')] },
];
// Sect effect style: the VLTK sect folder (\spr\skill\150\<fx>) whose art the faction's martial arts use;
// non-VLTK sects borrow the VLTK sect of their element.
const ELEMENT_FX = { kim: 'tw', moc: 'wu', thuy: 'em', hoa: 'gb', tho: 'wd' };
for (const f of FACTIONS) f.fx ??= ELEMENT_FX[f.element];
export const factionById = id => FACTIONS.find(f => f.id === id);

// The catalog above keeps every faction and avatar with its official look. Each map opens only a few of them: the
// rest stay here for later maps or unlockable characters, are shown as "Sắp mở" and are not exported or loaded.
// Tràng An: every existing male/female player costume of the VLTK sects.
export const OPEN_AVATARS = new Set(FACTIONS.flatMap(f => f.avatars.filter(a => a.player).map(a => a.id)));
export const isOpen = a => OPEN_AVATARS.has(a.id);
export const openAvatars = faction => faction.avatars.filter(isOpen);
export const OPEN_FACTIONS = FACTIONS.filter(f => openAvatars(f).length);
// Costumes: looks only, no stats. Every open avatar can wear its sect's gold set (pavatar armor part) or the newcomer
// clothes: what the client shows with no armour and no helm (armorres.txt / helmres.txt row 1 → part 20).
// Reward costumes (other gold sets, Võ Hồn, Nghĩa Hiệp…) wait for the copyright check — see docs/ke-hoach/PHAN_THUONG_TRANG_PHUC_2026-10-05.md.
export const SKINS = {
  hoangkim: { name: 'Hoàng Kim môn phái', short: 'Hoàng Kim', sub: 'Bộ của môn phái', note: 'Bộ Hoàng Kim của môn phái (goldequip của bộ cài)' },
  tanthu: { name: 'Tân thủ', short: 'Tân thủ', sub: 'Đồ mới vào giang hồ', note: 'Áo quần nhân vật mới vào, khi chưa mặc giáp và mũ', armor: 20, helm: 20 },
};
export const DEFAULT_SKIN = 'hoangkim';
export const skinOf = id => (SKINS[id] ? id : DEFAULT_SKIN);
// key of a look in vltk-player.json: the avatar id for its default costume, "<avatar>@<skin>" for the others
export const skinKey = (avatarId, skin) => (skin && skin !== DEFAULT_SKIN ? `${avatarId}@${skin}` : avatarId);
// Y phục worn in a match replaces the costume with a source armour of the avatar's style (pavatar wear = armor.txt
// ParticularType: 0 tăng y, 1 đạo bào, 2 cổn y/thích khách y, 3 trường bào, 4 giáp, 5 cái y, 6 đoản y/bào; nữ 7 ni phục, 8 đạo y,
// 9 y, 10 sam, 11 nữ giáp, 12 cái y, 13 quần). Quality 1–3 → the style's three looks (levels 1–4 / 5–7 / 8–10 by armorres.txt),
// quality 4 → its level 8–10 look, quality 5 → the sect's Hoàng Kim set. The style per sect is our choice: the client lets any
// character wear any armour of its sex. No armour → the costume chosen in the profile.
export const ARMOR_WEAR = [0, 1, 2, 2, 'gold'];
export const wearKey = (avatarId, band) => `${avatarId}@wear${band}`;
// Playable avatar of a faction: the requested one when open, else its first open avatar.
export const avatarOf = (faction, id) => openAvatars(faction).find(a => a.id === id) || openAvatars(faction)[0] || faction.avatars[0];

// ---------- weapons ----------
// Basic attack per weapon group. dmg 70–90, cycle 0.65–0.85 s (ám khí lower per hit, ranged).
export const WEAPON_TYPES = {
  kiem: { name: 'Kiếm', dmg: 78, cycle: 0.70, windup: 0.22, recover: 0.16, range: 104, arc: 1.0, note: 'Cân bằng, phản kích, đổi hướng.' },
  dao: { name: 'Đao', dmg: 90, cycle: 0.85, windup: 0.32, recover: 0.24, range: 98, arc: 1.5, note: 'Đòn nặng, quét hình quạt; ra đòn chậm.' },
  con: { name: 'Côn', dmg: 80, cycle: 0.80, windup: 0.27, recover: 0.2, range: 134, arc: 1.1, closePenalty: 0.6, closeRange: 46, note: 'Giữ khoảng cách; yếu khi bị áp sát.' },
  thuong: { name: 'Thương', dmg: 84, cycle: 0.80, windup: 0.28, recover: 0.22, range: 156, arc: 0.42, note: 'Đâm dài theo đường thẳng; hướng hẹp.' },
  quyen: { name: 'Quyền sáo', dmg: 70, cycle: 0.65, windup: 0.15, recover: 0.12, range: 74, arc: 1.0, combo: { every: 3, bonus: 0.25, window: 1.2 }, note: 'Combo nhanh ở cự ly sát.' },
  amkhi: { name: 'Ám khí', dmg: 60, cycle: 0.75, windup: 0.22, recover: 0.14, range: 430, projectile: { speed: 720, width: 16 }, note: 'Tầm xa, quấy rối; bị vật cản chặn.' },
};
export const WEAPON_BONUS = [0, 0.04, 0.08, 0.12, 0.15];
export const WEAPON_NAMES = {
  kiem: ['Thiết Kiếm', 'Thanh Cương Kiếm', 'Long Tuyền Kiếm', 'Thu Thủy Kiếm', 'Thái A Kiếm'],
  dao: ['Đơn Đao', 'Nhạn Linh Đao', 'Phá Phong Đao', 'Tử Kim Đao', 'Liệt Hỏa Bảo Đao'],
  con: ['Mộc Côn', 'Tề Mi Côn', 'Thiết Côn', 'Bàn Long Côn', 'Kim Cang Côn'],
  thuong: ['Trường Thương', 'Hồng Anh Thương', 'Phá Trận Thương', 'Lượng Ngân Thương', 'Bá Vương Thương'],
  quyen: ['Bố Thủ Sáo', 'Thiết Quyền Sáo', 'Hổ Trảo Sáo', 'Kim Ti Thủ Sáo', 'Long Lân Thủ Sáo'],
  amkhi: ['Phi Tiêu', 'Liễu Diệp Phi Đao', 'Mai Hoa Tiêu', 'Thấu Cốt Đinh', 'Tụ Tiễn Liên Hoàn'],
};
// Named weapons trade something for their special trait instead of multiplying damage.
export const SPECIAL_WEAPONS = [
  { id: 'ythien', type: 'kiem', name: 'Ỷ Thiên Kiếm', source: 'Ỷ Thiên Đồ Long Ký', rarity: 4, cycleMul: 1.1, armorPierce: 0.5,
    note: 'Đánh thường xuyên 50% giảm sát thương từ y phục; tốc đánh chậm 10%.' },
  { id: 'dolong', type: 'dao', name: 'Đồ Long Đao', source: 'Ỷ Thiên Đồ Long Ký', rarity: 4, cycleMul: 1.15, arcAdd: 0.3, knockback: 45,
    note: 'Đánh thường quét rộng hơn và đẩy lùi; tốc đánh chậm 15%.' },
  { id: 'huyenthiet', type: 'kiem', name: 'Huyền Thiết Trọng Kiếm', source: 'Thần Điêu Hiệp Lữ', rarity: 4, cycleMul: 1.35, dmgMul: 1.3, moveMul: 0.95, knockback: 30,
    note: 'Đánh thường nặng hơn 30% và đẩy lùi; chậm 35% và giảm 5% tốc chạy.' },
];

// ---------- clothing ----------
// bracer lines; lifeSteal / manaSteal are survival lines ("hút sinh lực / hút nội lực"), the share of the damage dealt
// returned as life, and (as the source stealmana_p drain) 1/10 of it taken from the victim's mana
const pct = v => String(+(v * 100).toFixed(1)).replace('.', ',');
const BRACER_LINES = {
  cdr: { v: [0, 0.025, 0.05, 0.075, 0.10], text: v => `Giảm ${pct(v)}% hồi chiêu` },
  mpCost: { v: [0, 0.04, 0.08, 0.12, 0.15], text: v => `Giảm ${pct(v)}% hao nội lực` },
  lifeSteal: { v: [0, 0.03, 0.05, 0.08, 0.12], text: v => `Hút ${pct(v)}% sinh lực` },
  manaSteal: { v: [0, 0.06, 0.10, 0.15, 0.20], text: v => `Hút ${pct(v)}% nội lực` },
};
// Accessory numbers below are survival balancing, not an exact import of all
// VLTK item affix rolls. Source icons are catalogued separately in vltk-items.
const ringGear = label => ({ label, glyph: '戒', names: ['Đồng Giới','Ngân Giới','Kim Giới','Ngọc Giới','Long Văn Giới'],
  stat: g => ({ atkBonus: [0.01,0.02,0.03,0.04,0.05][g.rarity] }), text: g => `+${[1,2,3,4,5][g.rarity]}% công` });
export const GEAR = {
  belt: { label:'Thắt lưng', glyph:'帶', names:['Bố Đái','Bì Đái','Ngân Đái','Kim Đái','Long Văn Đái'],
    stat:g=>({hpPct:[0.02,0.04,0.06,0.08,0.10][g.rarity]}),text:g=>`+${[2,4,6,8,10][g.rarity]}% sinh lực tối đa` },
  neck: { label:'Dây chuyền', glyph:'鏈', names:['Đồng Liên','Ngân Liên','Kim Liên','Ngọc Liên','Long Văn Liên'],
    stat:g=>({mpPct:[0.04,0.08,0.12,0.16,0.20][g.rarity]}),text:g=>`+${[4,8,12,16,20][g.rarity]}% nội lực tối đa` },
  ring1: ringGear('Nhẫn trên'), ring2: ringGear('Nhẫn dưới'),
  armor: { label: 'Y phục', glyph: '衣', names: ['Bố Y', 'Nhuyễn Bì Giáp', 'Tỏa Tử Giáp', 'Kim Ti Giáp', 'Thiên Tằm Bảo Y'],
    stat: g => ({ armorDR: [0, 0.05, 0.10, 0.15, 0.20][g.rarity] }), text: g => `Giảm ${[0, 5, 10, 15, 20][g.rarity]}% sát thương` },
  boots: { label: 'Giày', glyph: '履', names: ['Thảo Hài', 'Bố Hài', 'Truy Phong Hài', 'Đạp Tuyết Hài', 'Thần Hành Hài'],
    stat: g => ({ move: [0, 0.02, 0.03, 0.04, 0.06][g.rarity] }), text: g => `+${[0, 2, 3, 4, 6][g.rarity]}% tốc chạy` },
  bracer: { label: 'Hộ uyển', glyph: '腕', names: ['Bố Uyển', 'Bì Hộ Uyển', 'Đồng Hộ Uyển', 'Ngân Hộ Uyển', 'Kim Long Hộ Uyển'], lines: ['cdr', 'mpCost', 'lifeSteal', 'manaSteal'],
    stat: g => ({ [g.line]: BRACER_LINES[g.line].v[g.rarity] }),
    text: g => BRACER_LINES[g.line].text(BRACER_LINES[g.line].v[g.rarity]) },
  hat: { label: 'Mũ', glyph: '冠', names: ['Bố Cân', 'Phương Cân', 'Tử Kim Quan', 'Ngọc Quan', 'Thông Thiên Quan'],
    stat: g => ({ ccr: [0, 0.05, 0.10, 0.15, 0.20][g.rarity] }), text: g => `Giảm ${[0, 5, 10, 15, 20][g.rarity]}% thời gian bị khống chế` },
  jade: { label: 'Ngọc bội', glyph: '玉', names: ['Thạch Bội', 'Thanh Ngọc Bội', 'Bạch Ngọc Bội', 'Hồng Ngọc Bội', 'Long Văn Ngọc Bội'], lines: ['mpMax', 'potion'],
    stat: g => g.line === 'mpMax' ? { mpMax: [0, 5, 10, 15, 20][g.rarity] } : { potion: [0, 0.05, 0.10, 0.15, 0.20][g.rarity] },
    text: g => g.line === 'mpMax' ? `+${[0, 5, 10, 15, 20][g.rarity]} nội lực tối đa` : `+${[0, 5, 10, 15, 20][g.rarity]}% hiệu quả thuốc` },
};

export const POTIONS = {
  // time: seconds over which the potion pays out (shorter = the bar fills faster; the total stays the same)
  hp: { name: 'Kim Sáng Dược', key: '1', color: '#e0705a', amount: 150, time: 1 },
  mp: { name: 'Thanh Tâm Đan', key: '2', color: '#62a9d8', amount: 40, time: 1.5 },
};

// ---------- martial arts ----------
// type: active (Q/E/R tiers I–IV, T any tier; tier V only in T), noi (passive inner art), than (movement art).
// kind picks the executor in engine.js. dmg is the total of one cast before bonuses and armour; all hits of a cast share
// one cap per victim (= dmg), except projectiles, whose dmg is the total over all needles and capPerVictim limits one victim.
// perVictim() / damageText() state what a single target can really take; qa/skill-measure.cjs checks them against the real executor.
// anim names an action in data/animations.json; weapon decides which weapon bonus applies and what is drawn.
const A = (o) => ({ type: 'active', hits: 1, cast: 0.25, recover: 0.25, ...o });
// Most damage one victim can take from one cast, before bonuses and armour (conditional parts excluded).
// hitsPerVictim: per-victim hit budget. The engine also caps total damage to this budget, including moving targets.
export const perVictim = b => (b.type === 'active' ? b.capPerVictim ?? (b.hitsPerVictim ? Math.round(b.dmg / b.hits * b.hitsPerVictim) : b.dmg) : 0);
// The damage of an active book in words: total, hits, per-victim cap and conditional parts.
export function damageText(b) {
  if (b.type !== 'active') return '';
  const f = b.follow, pv = perVictim(b);
  let t;
  if (b.kind === 'projectile') t = b.count > 1 ? `${b.count} ${b.homing ? 'rồng' : 'mũi'}, tổng ${b.dmg}${b.capPerVictim ? ` · một người trúng tối đa ${b.capPerVictim}` : ''}` : `${b.dmg}`;
  else if (b.kind === 'parry') t = `chém ${b.dmg}, phản ${b.counter} nếu đỡ được đòn cận chiến (tối đa ${b.dmg + b.counter})`;
  else if (b.kind === 'dash' && f) t = `${b.dashDmg ? `lướt ${b.dashDmg} + ` : ''}${f.hits} đòn ${b.dmg - (b.dashDmg || 0)}`;
  else if (b.kind === 'dash') t = `${pv} khi lướt xuyên qua`;
  else if (b.kind === 'zigzag') t = `${b.hits} đường kiếm, tổng ${b.dmg}${b.hitsPerVictim ? ` · một người trúng tối đa ${pv} (${b.hitsPerVictim} đường)` : ''}`;
  else if (b.kind === 'channel') t = `${b.hits} nhịp trong ${String(b.duration).replace(".", ",")} giây, tổng ${pv} lên một mục tiêu`;
  else if (b.kind === 'aura') t = `${b.hits} nhịp trong ${String(b.duration).replace(".", ",")} giây, tổng ${pv} mỗi người trong vòng`;
  else if (b.kind === 'beam') t = `${b.hits} tia, tổng ${pv} nếu trúng đủ`;
  else t = `${pv} mỗi người${b.hits > 1 ? ` (${b.hits} đòn)` : ''}`;
  return `${t}${b.selfDmg ? ` · tự tổn ${b.selfDmg}` : ''}`;
}
export { VLTK_CATALOG };
// Survival only drops usable active arts. Keep the complete catalogue for future modes.
// Free map (Tràng An): only manuals the client teaches from level 60 on (cấp 60, 80, 90, 150) drop or can be used.
// The full catalogue, lower levels included, stays in VLTK_CATALOG for the library page and later maps.
export const FREE_MAP_MIN_LEVEL = 60;
// Tier III skills (mid-tier) in VLTK1 are taught at level 50 for Cai Bang/Thieu Lam and level 60 for other sects.
export const BOOKS = VLTK_BOOKS.filter(b => b.type === 'active' && b.enabled === true && (b.tier >= 3 || (b.reqLevel ?? 0) >= FREE_MAP_MIN_LEVEL))
  .map(b => ({ ...b, sourceCooldown: b.cd, cd: Math.min(b.cd, Math.max(1.2, Math.min(b.tier >= 5 ? 6 : 4, Math.round(b.cd * 0.55 * 10) / 10))) }));
// The weapon a manual asks for, in words (EqtLimit -2 manuals take any weapon).
export const weaponLabel = b => (b.weaponAny ? 'Mọi binh khí' : WEAPON_TYPES[b.weapon]?.name || '—');
const survivalBookIds = new Set(BOOKS.map(b => b.id));
export const isSurvivalBook = b => !!b && b.enabled === true && b.type === 'active' && survivalBookIds.has(b.id);

// Shared khinh cong for every survivor; passive movement arts belong to future modes.
export const BASE_MOVE = { range: 300, cost: 24, charges: 1, chargeCd: 1.6, low: false, minGap: 0.3 };
export const bookById = Object.fromEntries(BOOKS.map(b => [b.id, b]));
export const ACTIVE_KEYS = ['Q', 'E', 'R', 'T'];
export const slotAllows = (slot, book) => Number.isInteger(slot) && slot >= 0 && slot < 4 && isSurvivalBook(book) && (slot === 3 || book.tier <= 4);

// Drop tables for manuals (tier I..V weights), once the roll has already produced a manual. The free map holds tiers
// III–V only (VLTK cấp 60–70 / 90 / 150). User rule 2026-10-05: a drop is 25% cam (V), 40% tím (IV), 35% the rest;
// a rich pile or chest leans further to orange.
export const BOOK_TABLES = {
  normal: [0, 0, 35, 40, 25],
  rich: [0, 0, 20, 40, 40],
};
export const GEAR_TABLES = { normal: [45, 30, 17, 7, 1], rich: [0, 20, 45, 30, 5], event: [0, 0, 0, 60, 40] };

export const BOT_NAMES = ['Vô Danh', 'Thanh Phong', 'Mặc Vũ', 'Bạch Y', 'Trúc Ẩn', 'Hàn Sơn', 'Lạc Thủy', 'Tiểu Phong', 'Vân Du', 'Huyền Kiếm',
  'Nam Phong', 'Tử Y', 'Thiên Sơn', 'Độc Hành', 'Bích Hà', 'Cô Hồng', 'Phi Yến', 'Lãnh Nguyệt', 'Thiết Thủ', 'Kim Đao', 'Ngọc Diện', 'Hắc Ưng',
  'Phong Lôi', 'Tuyết Sơn', 'Tàng Kiếm', 'Ẩn Long', 'Bạch Hạc', 'Đoạn Hồn', 'Lục Trúc', 'Mai Hoa'];

// Zone: wait seconds, shrink seconds, radius after shrinking, damage per second outside (ignores armour).
// Starts around the entire square, including its corners. Final closure is at 28:00.
export const ZONE_START_RADIUS = Math.ceil(Math.hypot(WORLD / 2, WORLD / 2)) + 64;
export const ZONE_PHASES = [
  { wait: 240, shrink: 150, radius: 6500, dps: 2 },
  { wait: 170, shrink: 120, radius: 5300, dps: 4 },
  { wait: 150, shrink: 105, radius: 4100, dps: 7 },
  { wait: 130, shrink: 90, radius: 2850, dps: 12 },
  { wait: 100, shrink: 80, radius: 1800, dps: 20 },
  { wait: 80, shrink: 65, radius: 1000, dps: 32 },
  { wait: 65, shrink: 55, radius: 420, dps: 50 },
  { wait: 40, shrink: 40, radius: 0, dps: 85 },
];
export const MATCH_DURATION = ZONE_PHASES.reduce((n, p) => n + p.wait + p.shrink, 0);
// Announced treasure chests (one tier V manual each, up to the quota).
export const EVENT_CHESTS = [360, 540, 780, 1020, 1230, 1410].map(spawn => ({ announce: spawn - 30, spawn }));
