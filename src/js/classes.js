// @require Select

const Classes = {};

Classes.CLASSES = {
  'Guardian': {
    spec_type: 'Soul',
    characters: {
      'Albatross Grand': {
        title: 'The Armoured Angel',
        dmg: 2,
        hp: 18,
        abilities: {
          passive: {
            name: 'Endure',
            effect: 'Any DMG Albatross Grand receives is reduced by Room Lvl (#room). When Albatross Grand uses an Ultimate ability: this ability is negated',
          },
          active: {
            name: 'Divine Intervention',
            effect: 'When an ally User is attacked: Albatross Grand is attacked instead',
          },
          ultimate: {
            name: 'Beckoning Light',
            effect: 'Enemies can only attack Albatross Grand. Any DMG Albatross Grand receives is reduced by Soul Lvl (#spec) DMG. This ability lasts until Albatross Grand becomes active',
            recharge: 7,
          },
        },
      },
      'T4O MKII': {
        title: 'The Soul in the Shell',
        dmg: 3,
        hp: 17,
        abilities: {
          passive: {
            name: 'Welded Will',
            effect: 'T4O MKII cannot be debuffed with Bleed or Fear. T4O MKII gains Soul Lvl (#spec) Max HP',
          },
          active: {
            name: 'Self Destruct',
            effect: 'Declare X (X cannot be greater than T4O MKII\'s current HP): T4O MKII deals X DMG to 1 Enemy and loses X HP ',
          },
          ultimate: {
            name: 'Recharge',
            effect: 'T4O MKII Recovers to Max HP',
            recharge: 7,
          },
        },
      },
      'Lilith': {
        title: 'The Bad Blood',
        dmg: 1,
        hp: 16,
        abilities: {
          passive: {
            name: 'Tear',
            effect: 'When Lilith attacks an Enemy: the attacked Enemy is debuffed with Bleed',
          },
          active: {
            name: 'Blood Drain',
            effect: 'If an active Enemy is debuffed with Bleed, remove the debuff: deal Soul Lvl (#spec) DMG to that Enemy. Lilith Recovers Soul Lvl (#spec) HP',
          },
          ultimate: {
            name: 'Vampirism',
            effect: 'All enemies are now debuffed with Bleed',
            recharge: 6,
          },
        },
      },
    },
  },
  'Spellweaver': {
    spec_type: 'Intelligence',
    characters: {
      'Harmony Marx': {
        title: 'The Sorcerer Songstress',
        dmg: 4,
        hp: 14,
        abilities: {
          passive: {
            name: 'Tempo',
            effect: 'When Harmony Marx attacks an enemy: Harmony Marx gains + Intelligence Lvl (#spec) Success roll. This effect stacks but resets when Harmony Marx leaves the current Room, Dies or uses an ability',
          },
          active: {
            name: 'Song of Silence',
            effect: 'Success roll: debuff Intelligence Lvl (#spec) Enemies with Silence until Harmony Marx becomes active',
          },
          ultimate: {
            name: 'Da Capo',
            effect: 'Success roll: all inactive Users become active',
            recharge: 10,
          },
        },
      },
      'Ariadne': {
        title: 'The Blind Prophet',
        dmg: 5,
        hp: 11,
        abilities: {
          passive: {
            name: 'Dimensional Decision',
            effect: 'Once during your turn when a Room Tile is revealed: reveal the top 3 Room Cards of that revealed Room Tile from the respective deck and choose 1. The revealed Room Tile is now that chosen Room Card. Shuffle the other Room Cards revealed this way back into their respective decks',
          },
          active: {
            name: 'Darkness Falls',
            effect: 'Success roll: debuff Intelligence Lvl (#spec) Enemies with Blind until Ariadne becomes active',
          },
          ultimate: {
            name: 'Foreseer\'s Favour',
            effect: 'Once per Room: Ariadne gains the following ability based on the current Room Type:<br>'
              + 'Mob/Boss Room - Ariadne gains Intelligence Lvl (#spec) DMG until Ariadne Dies or leaves the current Room<br>'
              + 'Trap Room - Ariadne gains + Intelligence Lvl (#spec) Success roll for the Room<br>'
              + 'Treasure Room - If an Item is acquired: Acquire 1 Item',
            recharge: 5,
          },
        },
      },
      'Psykoshka': {
        title: 'The Lost Familiar',
        dmg: 4,
        hp: 13,
        abilities: {
          passive: {
            name: 'Symmetry',
            effect: 'Psykoshka gains Intelligence Lvl (#spec) DMG',
          },
          active: {
            name: 'Copycat',
            effect: 'Psykoshka can use the active ability of 1 ally User and gains that User\'s Special Stat and Special Stat Lvl until Psykoshka becomes active',
          },
          ultimate: {
            name: 'Loyalty',
            effect: 'Ally Users gain Intelligence Lvl (#spec) Special Stat Lvl until Psykoshka becomes active',
            recharge: 8,
          },
        },
      },
    },
  },
  'Slayer': {
    spec_type: 'Courage',
    characters: {
      'Grimwulf kaiser': {
        title: 'The Howling Death',
        dmg: 9,
        hp: 9,
        abilities: {
          passive: {
            name: 'Battle Howl',
            effect: 'Gain + Courage Lvl (#spec) Decisive roll',
          },
          active: {
            name: 'Duality',
            effect: 'Deal half of DMG (#dmg) + Courage Lvl (#spec) (rounded up) to 2 different Enemies ',
          },
          ultimate: {
            name: 'Hellhound',
            effect: 'If no Hellhound Tokens exists: spawn a Hellhound Token with Courage Lvl (#spec) DMG and Courage Lvl (#spec) Max HP. Hellhound Token is treated as an ally User (cannot acquire or hold Items). If Grimwulf Kaiser is targeted for an attack: Hellhound Token is attacked instead',
            recharge: 5,
          },
        },
      },
      'Jackal': {
        title: 'The Soundslinger',
        dmg: 7,
        hp: 7,
        abilities: {
          passive: {
            name: 'Sonic Snipe',
            effect: 'During Battle before Decisive roll, Success roll: Jackal can immediately attack 1 Enemy',
          },
          active: {
            name: 'Distortion',
            effect: 'Deal Courage Lvl (#spec) DMG to all Enemies with debuffs',
          },
          ultimate: {
            name: 'EQ',
            effect: 'Target 1 User and 1 Basic Enemy: Halve the sum of those targets\' current HP (rounded up). The targeted User and Basic Enemy\'s HP become the result',
            recharge: 7,
          },
        },
      },
      'Vulcana': {
        title: 'The Pyroxian Flame',
        dmg: 8,
        hp: 8,
        abilities: {
          passive: {
            name: 'Overheat',
            effect: 'When Vulcana defeats an Enemy: deal any overkill DMG to another Enemy',
          },
          active: {
            name: 'Fever',
            effect: 'Vulcana gains Courage Lvl (#spec) DMG for the next attack',
          },
          ultimate: {
            name: 'Pyreball',
            effect: 'Success roll: Vulcana deals DMG (#dmg) + Courage Lvl (#spec) to 1 Enemy. This ability repeats 3 times',
            recharge: 6,
          },
        },
      },
    },
  },
  'Enchanter': {
    spec_type: 'Aura',
    characters: {
      'Misteyes Snow': {
        title: 'The White Fox',
        dmg: 3,
        hp: 14,
        abilities: {
          passive: {
            name: 'Empath',
            effect: 'When Misteyes Snow Recovers HP: Recover 1 ally User for the same amount + Aura Lvl (#spec) HP',
          },
          active: {
            name: 'Erasure',
            effect: 'Remove all debuffs on Aura Lvl (#spec) ally Users',
          },
          ultimate: {
            name: 'Light of Life',
            effect: 'Resurrect 1 Dead User',
            recharge: 10,
          },
        },
      },
      'Dexler': {
        title: 'The Mad Alchemist',
        dmg: 1,
        hp: 11,
        abilities: {
          passive: {
            name: 'Duplicate',
            effect: 'When a Consumable Item would be discarded, Success roll: the Consumable Item is not discarded',
          },
          active: {
            name: 'Alchemic Warfare',
            effect: 'Discard 1 Consumable Item: deal 5 + Aura Lvl (#spec) DMG to 1 Enemy or 1 ally User Recovers 5 + Aura Lvl (#spec) HP',
          },
          ultimate: {
            name: 'The Creator',
            effect: 'Search for 1 Consumable Item in the Item deck and acquire it',
            recharge: 7,
          },
        },
      },
      'Faerie': {
        title: 'The Fable of the Forest',
        dmg: 0,
        hp: 13,
        abilities: {
          passive: {
            name: 'Blessing of the Fae',
            effect: 'While Faerie is at Max HP: Faerie and ally Users gain + 1 Success roll and Room Lvl (#room) DMG',
          },
          active: {
            name: 'Sacred Medicine',
            effect: '1 User Recovers Aura Lvl (#spec) HP',
          },
          ultimate: {
            name: 'Faeth',
            effect: '1 active User Recovers to Max HP and loses all debuffs. That User becomes inactive',
            recharge: 7,
          },
        },
      },
    },
  },
  'Trickster': {
    spec_type: 'Luck',
    characters: {
      'Ein': {
        title: 'The Shadewalker',
        dmg: 5,
        hp: 10,
        abilities: {
          passive: {
            name: 'Get Chance and Luck',
            effect: 'When Ein or an ally User pass a Success roll: Ein gains Luck Lvl (#spec) DMG. This effect can stack but resets if Ein leaves the current Room, Dies or if a Success roll fails',
          },
          active: {
            name: 'Gamble',
            effect: 'Ally Users gain + Luck Lvl (#spec) Success roll. This ability can be used in a Trap Room and lasts until Ein becomes active',
          },
          ultimate: {
            name: 'Shadow Sneak',
            effect: 'Upon discovering a Trap Room, Success roll: that discovered Trap Room is disabled',
            recharge: 7,
          },
        },
      },
      'Zuciel': {
        title: 'The Phantom of Sin',
        dmg: 0,
        hp: 13,
        abilities: {
          passive: {
            name: 'Greed',
            effect: 'Zuciel cannot gain DMG from any Gear but gains DMG equal to the Party\'s total G (#gold). Zuciel\'s Party can buy Items for 1 less G. This ability cannot be negated by Silence',
          },
          active: {
            name: 'Sloth',
            effect: 'Zuciel Recovers Luck Lvl (#spec) HP',
          },
          ultimate: {
            name: 'Wrath',
            effect: 'If all ally Users are active: Zuciel can attack Luck Lvl (#spec) Enemies once each. Discard Luck Lvl (#spec) G. All ally Users become inactive',
            recharge: 5,
          },
        },
      },
      'Marina': {
        title: 'The Chronokeeper',
        dmg: 5,
        hp: 10,
        abilities: {
          passive: {
            name: 'Choice of Chronos',
            effect: 'When an Item is acquired: Marina can discard the Item and acquire a new one instead. This can be repeated Luck Lvl (#spec) times',
          },
          active: {
            name: 'Rewrite Destiny',
            effect: 'Whenever a die is rolled: Marina can ignore the result and roll once more',
          },
          ultimate: {
            name: 'Gift of the Chronokeepers',
            effect: 'Once per Room: all ally Users\'s Ultimate Gauge recharge by Luck Lvl (#spec)',
            recharge: 10,
          },
        },
      },
    },
  },
};

Classes.getCharacterData = function (key) {
  key = key.split(Select.KEY_DELIMITER);
  const character = Classes.CLASSES[key[0]].characters[key[1]];
  character.class = key[0];
  character.name = key[1];
  character.specType = Classes.CLASSES[key[0]].spec_type;
  return character;
}

Classes.makeCharacter = function ($node, characterKey, bundle = null) {
  const characterClassName = studlyCase(characterKey.split(Select.KEY_DELIMITER)[1]);

  if (Classes[characterClassName]) {
    return new Classes[characterClassName]($node, characterKey, bundle);
  }
  return new Character($node, characterKey, bundle);
}

Classes.$CLASS_SELECT = (function () {
  const options = {};

  for (let className in Classes.CLASSES) {
    options[className] = {};
    for (let character in Classes.CLASSES[className].characters) {
      options[className][character] = character;
    }
  }

  return Select.makeGroupedSelect(options, 'js-class-select', true);
})();
