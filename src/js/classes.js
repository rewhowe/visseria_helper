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
            name: 'Divine Intervention',
            effect: "Any DMG Albatross Grand receives from Enemy attacks is reduced by Room Lvl (#room).\nWhen an ally User is attacked: Albatross Grand can be designated as the attack target instead.",
          },
          active: {
            name: 'Disarm',
            effect: "Target 1 Enemy: deal Soul Lvl (#spec) to the targeted Enemy.\nSuccess roll: the targeted Enemy becomes inactive.",
          },
          ultimate: {
            name: 'Aegis of Grandeur',
            effect: 'Any DMG Albatross Grand and ally Users receive from each Enemy\'s next attack is reduced by Soul Lvl (#spec) DMG.',
            recharge: 8,
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
            effect: 'T4O MKII cannot be debuffed with Bleed or Fear. T4O MKII gains Soul Lvl (#spec) Max HP.',
          },
          active: {
            name: 'Self Destruct',
            effect: 'Declare X (X cannot be greater than T4O MKII\'s current HP): T4O MKII deals (X) + Room Lvl (#room) to 1 Enemy and loses (X) HP.',
          },
          ultimate: {
            name: 'Reconstruct',
            effect: 'T4O MKII Recovers to Max HP and removes all debuffs.',
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
            effect: 'When Lilith attacks an Enemy: the attacked Enemy is debuffed with Bleed.',
          },
          active: {
            name: 'Blood Drain',
            effect: 'If an active Enemy is debuffed with Bleed, remove the debuff: deal Soul Lvl (#spec) DMG to that Enemy. Lilith Recovers Soul Lvl (#spec) HP.',
          },
          ultimate: {
            name: 'Blood Moon',
            effect: 'All enemies are now debuffed with Bleed.',
            recharge: 8,
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
        dmg: 3,
        hp: 14,
        abilities: {
          passive: {
            name: 'Forte',
            effect: 'Harmony Marx gains + Intelligence Lvl (#spec) Success roll when using abilities.',
          },
          active: {
            name: 'Song of Silence',
            effect: "Target 1 Enemy: deal 2 x Intelligence Lvl (#spec) to the targeted Enemy.\nSuccess roll: the targeted Enemy becomes debuffed with Silence.",
          },
          ultimate: {
            name: 'Pentatonic Harmony',
            effect: 'Each User deals their respective DMG to an Enemy.',
            recharge: 10,
          },
        },
      },
      'Ariadne': {
        title: 'The Blind Prophet',
        dmg: 1,
        hp: 11,
        abilities: {
          passive: {
            name: 'Dimensional Decision',
            effect: 'Before entering a Room when a Room Tile is revealed: reveal the top 2 Room Cards of that revealed Room Tile from the respective deck and choose 1. The revealed Room Tile is now that chosen Room Card. Shuffle the other Room Cards revealed this way back into their respective decks.',
          },
          active: {
            name: 'Darkness Falls',
            effect: "Target 1 Enemy: deal 2 x Intelligence Lvl (#spec) to the targeted Enemy.\nSuccess roll: the targeted Enemy becomes debuffed with Blind.",
          },
          ultimate: {
            name: 'Foreseer\'s Favour',
            effect: "Once per Room, reveal 1 undiscovered Room Tile. Ariadne gains the following effects based on the revealed Room Tile type:\n"
              + "・Mob Room/Mini Boss Room: Ariadne gains + Intelligence Lvl (#spec) DMG for the Room\n"
              + "・Trap Room: Ariadne gains + Intelligence Lvl (#spec) Success roll for the Room\n"
              + '・Treasure Room: Ariadne and ally Users Recover Intelligence Lvl (#spec) HP',
            recharge: 5,
          },
        },
      },
      'Psykoshka': {
        title: 'The Lost Familiar',
        dmg: 2,
        hp: 13,
        abilities: {
          passive: {
            name: 'Symmetry',
            effect: 'Psykoshka gains + Intelligence Lvl (#spec) Soul Lvl, Courage Lvl, Aura Lvl, and Luck Lvl.',
          },
          active: {
            name: 'Copycat',
            effect: 'Psykoshka can use the active ability of 1 ally User.',
          },
          ultimate: {
            name: 'Remnai\'s Retribution',
            effect: 'Each User chooses either: Recover Spec Lvl HP or deal Spec Lvl to an Enemy.',
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
            effect: 'Grimwulf Kaiser\'s party gains + Courage Lvl (#spec) Decisive roll.',
          },
          active: {
            name: 'Duality',
            effect: 'Deal half of the sum of DMG (#dmg) + Courage Lvl (#spec) to 2 different Enemies.',
          },
          ultimate: {
            name: 'Hellhound',
            effect: 'Deal DMG (#dmg) + Courage Lvl (#spec) to 1 Enemy. Grimwulf Kaiser becomes debuffed with Curse.',
            recharge: 6,
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
            effect: 'When entering a Mob Room/Boss Room before Decisive roll, Success roll: Deal DMG (#dmg) to 1 Enemy.',
          },
          active: {
            name: 'Echo',
            effect: 'Deal Courage Lvl (#spec) to 1 Enemy and Room Lvl (#room) to every other Enemy.',
          },
          ultimate: {
            name: 'EQ',
            effect: 'Deal Courage Lvl (#spec) to 1 Enemy. Jackal Recovers Courage Lvl (#spec) HP.',
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
            effect: 'When Vulcana defeats an Enemy, Success roll: deal any overkill DMG to another Enemy.',
          },
          active: {
            name: 'Spontaneous Combustion',
            effect: "Randomly choose a target between Vulcana and each Enemy.\nIf Vulcana is targeted: Vulcana Recovers Courage Lvl (#spec) HP.\nIf an Enemy is targeted: deal DMG (#dmg) to that enemy.",
          },
          ultimate: {
            name: 'Reckless Inferno',
            effect: 'Vulcana deals DMG (#dmg) + Courage Lvl (#spec) to 1 Enemy.\nVulcana gains + Courage Lvl (#spec) Success roll during the Round this ability is used.\nVulcana loses Courage Lvl (#spec) HP.',
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
            name: 'Empath\'s Crystal',
            effect: 'When Misteyes Snow or an ally User Recovers HP, they Recover an additional Room Lvl (#room) HP.',
          },
          active: {
            name: 'Erasure',
            effect: 'Remove all debuffs on Aura Lvl (#spec) ally Users.',
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
            effect: 'Once per Room, when a Consumable Item would be discarded by Dexler\'s active ability or consumed, Success roll: gain the effects of the Consumable Item without discarding it.',
          },
          active: {
            name: 'Alchemic Warfare',
            effect: 'Discard 1 Consumable Item: deal Room Lvl (#room) + Aura Lvl (#spec) to 1 Enemy or 1 ally User Recovers Room Lvl (#room) + Aura Lvl (#spec) HP.',
          },
          ultimate: {
            name: 'The Creator',
            effect: 'Reveal Aura Lvl (#spec) cards from the Item Deck: acquire 1 Consumable Item (if any) of the revealed Item cards and shuffle the rest back into the Item deck.',
            recharge: 8,
          },
        },
      },
      'Færie': {
        title: 'The Fable of the Forest',
        dmg: 0,
        hp: 13,
        abilities: {
          passive: {
            name: 'Blessing of the Fæ',
            effect: 'While Færie is at Max HP: Færie and ally Users gain + 1 Success roll and + Room Lvl (#room) DMG.',
          },
          active: {
            name: 'Sacred Medicine',
            effect: '1 User Recovers Room Lvl (#room) + Aura Lvl (#spec) HP.',
          },
          ultimate: {
            name: 'Fæth',
            effect: 'Target 1 User with Aura Lvl (#spec) HP or less: the targeted User Recovers to Max HP and removes all debuffs.',
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
        title: 'The Gambler',
        dmg: 5,
        hp: 10,
        abilities: {
          passive: {
            name: 'Get Chance and Luck',
            effect: 'Ein gains + Luck Lvl (#spec) Success roll. Whenever Ein passes a Success roll: Ein Recovers Room Lvl (#room) HP.',
          },
          active: {
            name: 'Tempt Fate',
            effect: "Target 1 Enemy, Success roll: deal DMG (#dmg) + Luck Lvl (#spec) to the targeted Enemy.\nIf Success roll fails: deal DMG (#dmg) - Luck Lvl (#spec) to targeted Enemy instead.",
          },
          ultimate: {
            name: 'Lucky Break',
            effect: 'Success roll Room Lvl (#room) times: for each Success roll that passes, deal Luck Lvl (#spec) to 1 Enemy.',
            recharge: 7,
          },
        },
      },
      'Zuciel': {
        title: 'The Phantom of Sin',
        dmg: 4,
        hp: 13,
        abilities: {
          passive: {
            name: 'Greed',
            effect: 'Whenever Zuciel attacks, declare X: Zuciel deals DMG (#dmg) + (X) to the attack target. Discard (X) G.',
          },
          active: {
            name: 'Sloth',
            effect: 'Zuciel Recovers Luck Lvl (#spec) HP.',
          },
          ultimate: {
            name: 'Wrath',
            effect: 'Deal G (#gold) to Luck Lvl (#spec) Enemies. Discard Luck Lvl (#spec) G.',
            recharge: 2,
          },
        },
      },
      'Marina': {
        title: 'The Chronokeeper',
        dmg: 4,
        hp: 12,
        abilities: {
          passive: {
            name: 'Temporal Shift',
            effect: 'When any die is rolled: Marina can reroll the result once.',
          },
          active: {
            name: 'Photon Pulse',
            effect: 'D10 roll: deal (D10 roll) + Luck Lvl (#spec) to 1 Enemy.',
          },
          ultimate: {
            name: 'Quantum Fissure',
            effect: 'Declare X. D10 roll: If D10 is between X - Room Lvl (#room) and X + Room Lvl (#room), deal Luck Lvl (#spec) to all Enemies.',
            recharge: 5,
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
