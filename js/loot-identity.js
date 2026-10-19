// Compare the content of loot, not its world/bag instance id. Potions remain
// consumables that can stack; equipment with a different roll is a new item.
const presentation = new Set(['name', 'source', 'note', 'desc', 'glyph']);
function valueKey(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(valueKey).join(',') + ']';
  return '{' + Object.keys(value).filter(k => !presentation.has(k) && value[k] !== undefined).sort()
    .map(k => JSON.stringify(k) + ':' + valueKey(value[k])).join(',') + '}';
}
export function sameBook(a, b) {
  if (!a || !b) return false;
  if (a.id != null && a.id === b.id) return true;
  const left = a.vltk?.skillId, right = b.vltk?.skillId;
  return left != null && right != null && String(left) === String(right);
}
export function sameLoot(a, b) {
  if (!a || !b || a.kind !== b.kind) return false;
  if (a.kind === 'book') return sameBook(a.book, b.book);
  if (a.kind === 'weapon') return !!a.weapon && !!b.weapon && valueKey(a.weapon) === valueKey(b.weapon);
  if (a.kind === 'gear') return !!a.gear && !!b.gear && valueKey(a.gear) === valueKey(b.gear);
  return false;
}
