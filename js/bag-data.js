import { ACCESSORY_CELLS } from './accessory-cells.js';
// Túi đồ (hành trang) kiểu Võ Lâm Truyền Kỳ 1: một lưới ô, mỗi vật phẩm chiếm số ô theo kích thước biểu tượng của nó.
// Cỡ ô gốc của client là 28 px; số ô của binh khí và trang bị lấy từ chính biểu tượng VLTK1
// (tools/vltk1-import/export-items.cjs ghi kích thước vào data/vltk-items.json, qa/bag-check.cjs đối chiếu với bảng này).
// Số cột × hàng và cỡ ô lấy từ cửa sổ Hành trang gốc (1024.pak, [ItemBox] HUnits=6 VUnits=10, 168×280 px = ô 28 px).
export const BAG = { cols: 6, rows: 10, cell: 28 };

// [rộng, cao] theo ô, mỗi bậc phẩm (0..4) một mục
export const ITEM_CELLS = {
  weapon: {
    kiem: [[1, 3], [1, 3], [1, 3], [1, 3], [1, 3]],
    dao: [[1, 2], [1, 3], [1, 4], [1, 4], [1, 4]],
    con: [[2, 3], [2, 3], [1, 4], [1, 4], [2, 3]],
    thuong: [[1, 3], [1, 4], [1, 4], [1, 4], [2, 4]],
    quyen: [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
    amkhi: [[1, 1], [1, 1], [1, 1], [1, 1], [2, 2]],
  },
  gear: {
    ...ACCESSORY_CELLS,
    armor: [[2, 3], [2, 3], [2, 3], [2, 3], [2, 3]],
    boots: [[2, 2], [2, 2], [2, 2], [2, 2], [2, 2]],
    bracer: [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
  },
};
// bí kíp và bình thuốc chiếm một ô; bình cùng loại gộp thành một chồng (tối đa RULES.potionMax)
export const SMALL = [1, 1];
