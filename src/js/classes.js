// @require Select

const Classes = {};

Classes.CLASSES = {
  guardian: {
    spec_type: 'soul',
    characters: {
      albatross_grand: {
        title: 'The Armored Angel',
        dmg: 2,
        hp: 18,
        abilities: {
          passive: {
            name: 'Feather Shield',
            effect: 'Albatross Grand takes -1x (Soul Lvl) DMG from enemy attacks',
          },
          active: {
            name: 'Guardian of the Gods',
            effect: 'Albatross Grand can block 2 enemies per Round',
          },
          ultimate: {
            name: 'Divine Intervention',
            effect: 'Negate any DMG any 1 active ally User is dealt this turn',
            recharge: 5,
          },
        },
      },
      T4O_MKII: {
        title: 'The Soul in the Shell',
        dmg: 3,
        hp: 16,
        abilities: {
          passive: {
            name: 'Welded Will',
            effect: 'T4O MKII cannot be debuffed with Bleed or Fear. T4O MKII gains +1x (Soul Lvl) Max HP',
          },
          active: {
            name: 'Self Destruct',
            effect: 'T4O MKII deals XDMG to 1 enemy and loses XHP. (X cannot be greater than T4O MKII\'s Max HP)',
          },
          ultimate: {
            name: 'Recharge',
            effect: 'T4O MKII heals to Max HP',
            recharge: 7,
          },
        },
      },
      lilith: {
        title: 'The Bad Blood',
        dmg: 1,
        hp: 16,
        abilities: {
          passive: {
            name: 'Siphon',
            effect: 'Attacking enemies heals Lilith for +1x (Soul Lvl) HP. Attacking enemies debuffs them with Bleed',
          },
          active: {
            name: 'Blood Drain',
            effect: 'If an active enemy is debuffed with Bleed, remove the debuff and deal 1x (Soul Lvl) DMG to that enemy',
          },
          ultimate: {
            name: 'Vampire\'s Desire',
            effect: 'All enemies are debuffed with Bleed',
            recharge: 6,
          },
        },
      },
    },
  },
  spellweaver: {
    spec_type: 'intelligence',
    characters: {
      harmony_marx: {
        title: 'The Sorcerer Songstress',
        dmg: 5,
        hp: 14,
        abilities: {
          passive: {
            name: 'Tempo',
            effect: 'Harmony Marx gains +1x (Intelligence Lvl) succession roll for each successful attack on an enemy. This effect stacks but resets when Harmony Marx leaves the Room',
          },
          active: {
            name: 'Song of Silence',
            effect: 'Debuff 1 basic enemy with Silence til the end of the next turn if succession roll',
          },
          ultimate: {
            name: 'Da Capo',
            effect: 'Once per Room, gain an extra turn if succession roll',
            recharge: 10,
          },
        },
      },
      ariadne: {
        title: 'The Blind Prophet',
        dmg: 6,
        hp: 11,
        abilities: {
          passive: {
            name: 'Dimensional Decision',
            effect: 'Once during your turn when a Room Type is revealed, draw the top 3 Rooms of that revealed Type and choose 1. It is now that chosen Room',
          },
          active: {
            name: 'Darkness Falls',
            effect: 'Blind 1 basic enemy til the end of the next turn if succession roll',
          },
          ultimate: {
            name: 'Foreseer\'s Favour',
            effect: "Ariadne gains the following ability based on the current Room type:\nMob/Boss Room - Once per Room, Ariadne gains +1x (Intelligence Lvl) DMG for the Room\nTrap Room - Ariadne gains +1x (Intelligence Lvl) succession roll\nTreasure Room - Gain +1 Item if an Item is gained and/or gain +1 Note if a Note is gained",
            recharge: 5,
          },
        },
      },
      psykoshka: {
        title: 'The Lost Familiar',
        dmg: 4,
        hp: 13,
        abilities: {
          passive: {
            name: 'Symmetry',
            effect: 'Psykoshka gains +1x (Intelligence Lvl) DMG',
          },
          active: {
            name: 'Copycat',
            effect: 'Once per turn, Psykoshka can use the active ability of an active User',
          },
          ultimate: {
            name: 'Loyalty',
            effect: 'Active ally Users gain +1x (Intelligence Lvl) Special Stat Lvl for the turn',
            recharge: 8,
          },
        },
      },
    },
  },
  slayer: {
    spec_type: 'courage',
    characters: {
      grimwulf_kaiser: {
        title: 'The Howling Death',
        dmg: 5,
        hp: 9,
        abilities: {
          passive: {
            name: 'First Strike',
            effect: 'Gain +1x (Courage Lvl) decisive roll',
          },
          active: {
            name: 'Dual Wield',
            effect: 'Deal half of DMG (rounded up) to up to 2 enemies',
          },
          ultimate: {
            name: 'Hellhound',
            effect: 'Grimwulf Kaiser spawns a Hellhound Token with +1x (Courage Lvl) DMG and 1 Max HP. There can only be 1 active Hellhound Token at a time',
            recharge: 6,
          },
        },
      },
      jackal: {
        title: 'The Soundslinger',
        dmg: 7,
        hp: 7,
        abilities: {
          passive: {
            name: 'Sonic Snipe',
            effect: 'Upon discovering a Mob room before decisive roll, Jackal can immediately attack 1 enemy if succession roll',
          },
          active: {
            name: 'Echo',
            effect: 'Deal DMG to 1 enemy equal to the last blocked DMG by Jackal +1x (Courage Lvl)',
          },
          ultimate: {
            name: 'Distortion',
            effect: '1 active enemy receives +1x (Courage Lvl) DMG from attacks for the turn',
            recharge: 7,
          },
        },
      },
      vulcana: {
        title: 'The Pyroxian Flame',
        dmg: 6,
        hp: 8,
        abilities: {
          passive: {
            name: 'Catching Fire',
            effect: 'Any overkill damage done by Vulcana is dealt to another activ enemy',
          },
          active: {
            name: 'Fire Dance',
            effect: 'Vulcana gains +1x (Courage Lvl) DMG for the next attack',
          },
          ultimate: {
            name: 'Pyreball',
            effect: 'Vulcana deals 3+ (Courage Lvl) DMG to 1 enemy if succession roll. This ability repeats until Vulcana fails a succession roll',
            recharge: 6,
          },
        },
      },
    },
  },
  enchanter: {
    spec_type: 'aura',
    characters: {
      misteyes_snow: {
        title: 'The White Fox',
        dmg: 3,
        hp: 14,
        abilities: {
          passive: {
            name: 'Empath',
            effect: 'Any healing Misteyes Snow receives also heals 1 active ally User for the same amount +1x (Aura Lvl) ',
          },
          active: {
            name: 'Erasure',
            effect: 'Once per Room, Misteyes Snow can remove all debuffs on 1x (Aura Lvl) active Users',
          },
          ultimate: {
            name: 'Light of Life',
            effect: 'Once per Room, If an active ally User (except Misteyes Snow) died of any source this turn, they are immediately resurrected',
            recharge: 10,
          },
        },
      },
      dexler: {
        title: 'The Mad Alchemist',
        dmg: 1,
        hp: 11,
        abilities: {
          passive: {
            name: 'Duplicate',
            effect: 'Once per turn when a basic consumable item is used or discarded, Dexler gains 1 copy of that item if succession roll',
          },
          active: {
            name: 'Alchemic Warfare',
            effect: 'Dexler can discard a consumable Item to deal 5+ (Aura Lvl) DMG to an enemy or heal an active ally User for 5+ (Aura Lvl) HP',
          },
          ultimate: {
            name: 'The Creator',
            effect: 'Once per Room, Dexler acquires any one basic consumable',
            recharge: 5,
          },
        },
      },
      faerie: {
        title: 'The Fable of the Forest',
        dmg: 0,
        hp: 13,
        abilities: {
          passive: {
            name: 'Blessing of the Fae',
            effect: 'During Battle, all active ally Users gain +1x (Aura Lvl) DMG for the first attack if they attack first.',
          },
          active: {
            name: 'Sacred Medicine',
            effect: 'Heal 1 active ally User +1x (Aura Lvl) ',
          },
          ultimate: {
            name: 'Faeth',
            effect: 'Heal 1 active ally User to Max HP. That User cannot attack or use abilities the turn this ability is used',
            recharge: 7,
          },
        },
      },
    },
  },
  trickster: {
    spec_type: 'luck',
    characters: {
      ein: {
        title: 'The Shadewalker',
        dmg: 6,
        hp: 10,
        abilities: {
          passive: {
            name: 'Chance and Luck',
            effect: 'Successful succession rolls grants Ein +1x (Luck Lvl) DMG. This effect can stack but resets if a succession roll fails',
          },
          active: {
            name: 'Gamble',
            effect: 'Active ally Users gain +1x (Luck Lvl) succession roll for the turn',
          },
          ultimate: {
            name: 'Shadow Sneak',
            effect: 'Upon discovering a Trap Room, it is disabled if succession roll',
            recharge: 5,
          },
        },
      },
      zuciel: {
        title: 'The Phantom of Sin',
        dmg: 0,
        hp: 13,
        abilities: {
          passive: {
            name: 'Greed',
            effect: 'Zuciel cannot gain DMG from any Gear but gains DMG equal to the party\'s total G',
          },
          active: {
            name: 'Sloth',
            effect: 'Zuciel heals for +1x (Luck Lvl) HP',
          },
          ultimate: {
            name: 'Wrath',
            effect: 'If Zuciel is at full health, he can attack 1x (Luck Lvl) enemies. Zuciel\'s health becomes 1',
            recharge: 1,
          },
        },
      },
      marina: {
        title: 'The Chronokeeper',
        dmg: 5,
        hp: 10,
        abilities: {
          passive: {
            name: 'Choice of Chronos',
            effect: 'Once per Room, when an Item is acquired, Marina can discard the Item and acquire a new one instead. This can be repeated 1x (Luck Lvl) times',
          },
          active: {
            name: 'Rewrite Destiny',
            effect: 'When a die is rolled, Marina can ignore the result and roll once more',
          },
          ultimate: {
            name: 'Gift of the Chronokeepers',
            effect: 'Once per Room, all other active Users\' Ultimate Gauge become full',
            recharge: 10,
          },
        },
      },
    },
  },
};

Classes.getCharacter = function (key) {
  key = key.split(Select.KEY_DELIMITER);
  const character = Classes.CLASSES[key[0]].characters[key[1]];
  character.class = key[0];
  character.name = key[1];
  character.specType = Classes.CLASSES[key[0]].spec_type;
  return character;
}

Classes.getCharacterKey = function (character) {
  return Select.makeKey(character.class, character.name);
}

Classes.$CLASS_SELECT = (function () {
  const options = {};

  for (let className in Classes.CLASSES) {
    options[className] = {};
    for (let character in Classes.CLASSES[className].characters) {
      options[className][character] = character;
    }
  }

  return Select.makeSelect(options, 'js-class-select');
})();
