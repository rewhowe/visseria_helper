// @require Select

const Gear = {};

Gear.GEAR = {
  basic_gear: {
    angel_feather: {
      cost: 3,
      dmg: 0,
      hp: 1,
      spec: 1,
      spec_type: 'soul',
    },
    ring_of_remnai: {
      cost: 3,
      dmg: 0,
      hp: 1,
      spec: 1,
      spec_type: 'intelligence',
    },
    badge_of_heroism: {
      cost: 3,
      dmg: 1,
      hp: 0,
      spec: 1,
      spec_type: 'courage',
    },
    blank_totem: {
      cost: 3,
      dmg: 0,
      hp: 1,
      spec: 1,
      spec_type: 'aura',
    },
    loaded_die: {
      cost: 3,
      dmg: 1,
      hp: 0,
      spec: 1,
      spec_type: 'luck',
    },
  },
  intermediate_gear: {
    exxo_armor: {
      cost: 5,
      dmg: 0,
      hp: 3,
      spec: 2,
      spec_type: 'soul',
    },
    trinity_staff: {
      cost: 5,
      dmg: 1,
      hp: 2,
      spec: 2,
      spec_type: 'intelligence',
    },
    darkling_sword: {
      cost: 5,
      dmg: 3,
      hp: 0,
      spec: 2,
      spec_type: 'courage',
    },
    illumination_pendant: {
      cost: 5,
      dmg: 0,
      hp: 3,
      spec: 2,
      spec_type: 'aura',
    },
    broken_dagger: {
      cost: 5,
      dmg: 2,
      hp: 1,
      spec: 2,
      spec_type: 'luck',
    },
  },
  standard_gear: {
    thirstfire: {
      cost: 5,
      dmg: 2,
      hp: 0,
      effect: 'Enemies the equipped User attacks are debuffed with Bleed',
    },
    mugger_dagger: {
      cost: 5,
      dmg: 2,
      hp: 0,
      effect: 'Equipped User gains 1G for every successful attack on an Enemy if Success roll',
    },
    bones: {
      cost: 5,
      dmg: 1,
      hp: 5,
      effect: 'While equipped with Bones: equipped User is debuffed with Undead', // TODO
    },
    lucky_charm: {
      cost: 5,
      dmg: 1,
      hp: 1,
      effect: 'Equipped User gains +2 Success roll',
    },
    devil_charm: {
      cost: 5,
      dmg: 3,
      hp: 3,
      effect: 'Equipped User gains -2 Success roll',
    },
    courage_charm: {
      cost: 5,
      dmg: 2,
      hp: 1,
      effect: 'Equipped User gains +1 Decisive roll in battle involving User',
    },
    artifact_coin: {
      cost: 5,
      dmg: 2,
      hp: 2,
      effect: 'Item is treated as 5G',
    },
    absorbing_spirit: {
      cost: 5,
      dmg: 2,
      hp: 2,
      effect: 'Equipped User\'s Ultimate recharge rate is 2',
    },
    regenerating_armour: {
      cost: 5,
      dmg: 0,
      hp: 3,
      effect: 'Any DMG the equipped User receives from any source is reduced by 1 DMG',
    },
    the_murmur: {
      cost: 5,
      dmg: 5,
      hp: 0,
      effect: 'While equipped with The Murmur: equipped User is debuffed with Silence', // TODO
    },
  },
  legendary_gear: {
    'wilhelm\'s_gauntlet': {
      cost: 15,
      dmg: 0,
      hp: 5,
      limit_class: 'guardian',
      effect: 'When the equipped User is attacked: deal DMG equal to the equipped User\'s DMG to the attacking Enemy. Can only be equipped by Guardians',
      spec: 3,
      spec_type: 'soul',
    },
    'solomon\'s_cipher': {
      cost: 15,
      dmg: 2,
      hp: 3,
      limit_class: 'spellweaver',
      effect: 'The equipped User can attack and use abilities once each before becoming inactive. Can only be equipped by Spellweavers',
      spec: 3,
      spec_type: 'intelligence',
    },
    'zatyr\'s_saber': {
      cost: 15,
      dmg: 5,
      hp: 0,
      limit_class: 'slayer',
      effect: 'When the equipped User attacks: equipped User recovers (Room Lvl) HP. Can only be equipped by Slayers',
      spec: 3,
      spec_type: 'courage',
    },
    'magus\'_cloak': {
      cost: 15,
      dmg: 1,
      hp: 4,
      limit_class: 'enchanter',
      effect: 'Remove all debuffs from the equipped User. Equipped User is immune to debuffs. Can only be equipped by Enchanters', // TODO
      spec: 3,
      spec_type: 'aura',
    },
    'weeper\'s_satchel': {
      cost: 15,
      dmg: 3,
      hp: 2,
      limit_class: 'trickster',
      effect: '+1 Item, +XG equal to D10 roll and +2 Success roll. Can only be equipped by Tricksters',
      spec: 3,
      spec_type: 'luck',
    }
  },
};

Gear.getGear = function (key) {
  key = key.split(Select.KEY_DELIMITER);
  const category = Gear.GEAR[key[0]];
  if (!category) return;
  const gear = category[key[1]];
  gear.category = key[0];
  gear.name = key[1];
  return gear;
}

Gear.getGearKey = function (gear) {
  return Select.makeKey(gear.category, gear.name);
}

Gear.$GEAR_SELECT = (function () {
  const options = {};

  for (let categoryName in Gear.GEAR) {
    options[categoryName] = {};

    for (let gearName in Gear.GEAR[categoryName]) {
      const gear = Gear.GEAR[categoryName][gearName];
      const stats = [
        gear.dmg || 0,
        gear.hp || 0,
        gear.spec ? gear.spec + ' ' + gear.spec_type : 0,
      ];
      options[categoryName][gearName] = gearName
        + ' (' + stats.join('/') + ')'
        + (gear.limit_class ? ' - ' + titleCase(gear.limit_class) + ' only' : '');
    }
  }

  return Select.makeSelect(options, 'js-gear-select', false);
})();
