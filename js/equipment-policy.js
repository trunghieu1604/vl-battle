// Survival pickup policy. Compare within the same slot / weapon family only:
// changing a sword for a spear is a player decision, not a rarity upgrade.
export function sameEquipmentFamily(a, b) {
  return a?.kind === b?.kind && (a?.kind === 'gear' ? a.gear.slot === b.gear.slot :
    a?.kind === 'weapon' && a.weapon.type === b.weapon.type);
}
export function compareEquipment(a, b) {
  if (!sameEquipmentFamily(a, b)) return 0;
  const x = a[a.kind], y = b[b.kind];
  // Equal-grade affixes and special weapons have tradeoffs: keep the player's
  // choice instead of assuming damage, cooldown or steal is always better.
  return x.rarity - y.rarity;
}
export function equipmentOwned(e, item) {
  if (item.kind !== 'gear' && item.kind !== 'weapon') return [];
  const worn = (item.kind === 'weapon' ? e.weapons : Object.values(e.gear))
    .filter(Boolean).map(payload => ({ kind: item.kind, [item.kind]: payload }));
  return [...worn, ...(e.bag?.items || []), ...(e.bag?.hold ? [e.bag.hold] : [])]
    .filter(other => sameEquipmentFamily(item, other));
}
export const inferiorEquipment = (e, item) => equipmentOwned(e, item).some(other => compareEquipment(item, other) < 0);
