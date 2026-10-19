import { ARMOR_WEAR } from './data.js';

// One worn armour slot owns the appearance. Profile costume is the fallback
// after removing armour; inventory, HUD and world all resolve the same look.
export function equippedLook(hero, weaponType) {
  if (hero.kind !== 'hero' || !hero.gear) return hero.look;
  const held = hero.weapons?.[hero.wi] || hero.weapons?.[1 - hero.wi];
  const weapon = !weaponType || held?.type === weaponType ? held
    : hero.weapons?.find(w => w?.type === weaponType);
  return { ...hero.look,
    wear: hero.gear.armor ? ARMOR_WEAR[hero.gear.armor.rarity] : undefined,
    rank: weapon?.rarity,
  };
}
