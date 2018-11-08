// @require Select

const Gear = {};

Gear.GEAR = {
  'Basic Gear': {
    'Angel Feather': {
      cost: 3,
      dmg: 0,
      hp: 1,
      spec: 1,
      spec_type: 'Soul',
    },
    'Ring Of Remnai': {
      cost: 3,
      dmg: 0,
      hp: 1,
      spec: 1,
      spec_type: 'Intelligence',
    },
    'Badge Of Heroism': {
      cost: 3,
      dmg: 1,
      hp: 0,
      spec: 1,
      spec_type: 'Courage',
    },
    'Blank Totem': {
      cost: 3,
      dmg: 0,
      hp: 1,
      spec: 1,
      spec_type: 'Aura',
    },
    'Loaded Die': {
      cost: 3,
      dmg: 1,
      hp: 0,
      spec: 1,
      spec_type: 'Luck',
    },
  },
  'Intermediate Gear': {
    'Exxo Armor': {
      cost: 5,
      dmg: 0,
      hp: 3,
      spec: 2,
      spec_type: 'Soul',
    },
    'Trinity Staff': {
      cost: 5,
      dmg: 1,
      hp: 2,
      spec: 2,
      spec_type: 'Intelligence',
    },
    'Darkling Sword': {
      cost: 5,
      dmg: 3,
      hp: 0,
      spec: 2,
      spec_type: 'Courage',
    },
    'Illumination Pendant': {
      cost: 5,
      dmg: 0,
      hp: 3,
      spec: 2,
      spec_type: 'Aura',
    },
    'Broken Dagger': {
      cost: 5,
      dmg: 2,
      hp: 1,
      spec: 2,
      spec_type: 'Luck',
    },
  },
  'Standard Gear': {
    'Thirstfire': {
      cost: 5,
      dmg: 2,
      hp: 0,
      effect: 'Enemies attacked by the equipped User are debuffed with Bleed',
    },
    'Mugger Dagger': {
      cost: 5,
      dmg: 2,
      hp: 0,
      effect: 'Equipped User gains 1G for every successful attack on an Enemy if Success roll',
    },
    'Lucky Charm': {
      cost: 5,
      dmg: 1,
      hp: 1,
      effect: 'Equipped User gains +2 Success roll',
    },
    'Devil Charm': {
      cost: 5,
      dmg: 3,
      hp: 3,
      effect: 'Equipped User gains -2 Success roll',
    },
    'Bravery Charm': {
      cost: 5,
      dmg: 2,
      hp: 1,
      effect: 'Equipped User gains +1 Decisive roll in battle involving User',
    },
    'Artifact Coin': {
      cost: 5,
      dmg: 2,
      hp: 2,
      effect: 'Item is treated as 5G',
    },
    'Absorbing Spirit': {
      cost: 5,
      dmg: 2,
      hp: 2,
      effect: 'Equipped User\'s Ultimate recharge rate is 2',
    },
    'Regenerating Armour': {
      cost: 5,
      dmg: 0,
      hp: 3,
      effect: 'Any DMG the equipped User receives from any source is reduced by 1 DMG',
    },
    'The Murmur': {
      cost: 5,
      dmg: 5,
      hp: 0,
      effect: 'While equipped with The Murmur: equipped User is debuffed with Silence',
      onEquip: function (character) {
        character.addDebuff('silence');
      },
    },
  },
  'Legendary Gear': {
    'Wilhelm\'s Gauntlet': {
      cost: 15,
      dmg: 0,
      hp: 5,
      limit_class: 'Guardian',
      effect: 'When the equipped User is attacked: deal DMG equal to the equipped User\'s DMG to the attacking Enemy. Can only be equipped by Guardians',
      spec: 3,
      spec_type: 'Soul',
    },
    'Solomon\'s Cipher': {
      cost: 15,
      dmg: 2,
      hp: 3,
      limit_class: 'Spellweaver',
      effect: 'The equipped User can attack and use abilities once each before becoming inactive. Can only be equipped by Spellweavers',
      spec: 3,
      spec_type: 'Intelligence',
    },
    'Zatyr\'s Saber': {
      cost: 15,
      dmg: 5,
      hp: 0,
      limit_class: 'Slayer',
      effect: 'When the equipped User attacks: equipped User recovers (Room Lvl) HP. Can only be equipped by Slayers',
      spec: 3,
      spec_type: 'Courage',
    },
    'Magus\' Cloak': {
      cost: 15,
      dmg: 1,
      hp: 4,
      limit_class: 'Enchanter',
      effect: 'Remove all debuffs from the equipped User. Equipped User is immune to debuffs. Can only be equipped by Enchanters',
      spec: 3,
      spec_type: 'Aura',
      onEquip: function (character) {
        for (let debuff of ['blind', 'bleed', 'fear', 'silence', 'curse', 'undead', 'sleep']) {
          character.removeDebuff(debuff);
        }
      },
    },
    'Weeper\'s Satchel': {
      cost: 15,
      dmg: 3,
      hp: 2,
      limit_class: 'Trickster',
      effect: 'When this item is acquired: acquire 1 Item and +XG equal to D10 roll. The equipped User gains +2 Success roll. Can only be equipped by Tricksters',
      spec: 3,
      spec_type: 'Luck',
    }
  },
};

Gear.getGearData = function (key) {
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
        + (gear.limit_class ? ' - ' + gear.limit_class + ' only' : '');
    }
  }

  return Select.makeGroupedSelect(options, 'js-gear-select');
})();
