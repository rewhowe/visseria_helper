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
            name: 'Divine Intervention',
            effect: 'Any DMG Albatross Grand receives from Enemy attacks is reduced by (Room Lvl). When an ally User is attacked: Albatross Grand can be designated as the attack target instead.',
          },
          active: {
            name: 'Disarm',
            effect: 'Target 1 Enemy: deal (Soul Lvl) to the targeted Enemy. Success roll: the targeted Enemy becomes inactive.',
          },
          ultimate: {
            name: 'Aegis of Grandeur',
            effect: 'Any DMG Albatross Grand and ally Users receive from each Enemy\'s next attack is reduced by (Soul Lvl).',
            recharge: 8,
          },
        },
      },
      T4O_MKII: {
        title: 'The Soul in the Shell',
        dmg: 3,
        hp: 17,
        abilities: {
          passive: {
            name: 'Welded Will',
            effect: 'T4O MKII cannot be debuffed with Bleed or Fear. T4O MKII gains (Soul Lvl) Max HP.',
          },
          active: {
            name: 'Soul Cannon',
            effect: 'Declare X less than or equal to T4O MKII\'s current HP. Target 1 Enemy: deal X + (Room Lvl) to targeted Enemy. T4O MKII loses X HP.',
          },
          ultimate: {
            name: 'Undying Spirit',
            effect: 'T4O MKII is restored to Max HP. All debuffs on T4O MKII are removed.',
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
            name: 'Blood Drain',
            effect: 'Any DMG from Enemies debuffed with Bleed Lilith or ally Users receive is reduced by (Room Lvl). ',
          },
          active: {
            name: 'Red Terror',
            effect: 'Target 1 Enemy: deal (Soul Lvl) to the targeted Enemy. The targeted Enemy becomes debuffed with Bleed. Lilith restores (Room Lvl) HP. If the targeted Enemy is debuffed with Bleed, remove the debuff: Lilith restores (Room Lvl) +  (Soul Lvl) HP instead.',
          },
          ultimate: {
            name: 'Blood Moon',
            effect: 'All Enemies are now debuffed with Bleed',
            recharge: 8,
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
        dmg: 3,
        hp: 14,
        abilities: {
          passive: {
            name: 'Forte',
            effect: 'Harmony Marx gains + (Intelligence Lvl) Success roll when using abilities. ',
          },
          active: {
            name: 'Song of Silence',
            effect: 'Target 1 Enemy: deal 2 x (Intelligence Lvl) to the targeted Enemy. Success roll: the targeted Enemy becomes debuffed with Silence. ',
          },
          ultimate: {
            name: 'Pentatonic Harmony',
            effect: 'Each User deals their respective DMG to an Enemy. l',
            recharge: 10,
          },
        },
      },
      ariadne: {
        title: 'The Blind Prophet',
        dmg: 1,
        hp: 11,
        abilities: {
          passive: {
            name: 'Dimensional Decision',
            effect: 'Before entering a Room when a Room Tile is revealed: reveal the top 2 Room Cards of that revealed Room Tile type from the respective deck and choose 1. The revealed Room Tile is now that chosen Room Card. Shuffle the other Room Cards revealed this way back into their respective decks. ',
          },
          active: {
            name: 'Darkness Falls',
            effect: 'Target 1 Enemy: deal 2 x (Intelligence Lvl) to the targeted Enemy. Success roll: the targeted Enemy becomes debuffed with Blind.  ',
          },
          ultimate: {
            name: 'Foreseer\'s Favour',
            effect: "Once per Room, reveal and reset 1 undiscovered Room Tile or target 1 discovered Room Tile. Ariadne gains the following effects based on the revealed or targeted Room Tile type: \nMob Room/Mini Boss Room: Ariadne gains + (Intelligence Lvl) DMG for the Room\nTrap Room: Ariadne gains + (Intelligence Lvl) Success roll for the Room\nTreasure Room: Ariadne and ally Users restore (Intelligence Lvl) HP",
            recharge: 5,
          },
        },
      },
      psykoshka: {
        title: 'The Lost Familiar',
        dmg: 2,
        hp: 13,
        abilities: {
          passive: {
            name: 'Equilibrium',
            effect: 'Psykoshka gains + (Intelligence Lvl) Soul Lvl, Courage Lvl, Aura Lvl and Luck Lvl. ',
          },
          active: {
            name: 'Copycat',
            effect: 'Psykoshka can use the active ability of 1 ally User. ',
          },
          ultimate: {
            name: 'Remnai\'s Retribution',
            effect: 'Each User chooses either: restore their respective Spec Lvl HP or deal their respective Spec Lvl to an Enemy.',
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
        dmg: 9,
        hp: 9,
        abilities: {
          passive: {
            name: 'Battle Howl',
            effect: 'The party gains + (Courage Lvl) Decisive roll',
          },
          active: {
            name: 'Duality',
            effect: 'Target 2 Enemies: deal half of the sum of (DMG) + (Courage Lvl) (rounded up) to the targeted Enemies. ',
          },
          ultimate: {
            name: 'Grim Execution',
            effect: 'Deal DMG + (Number of Room Lvl Enemies in the discard pile (Max. 10)) divided to any number of Enemies. Shuffle all Room Lvl Enemies back into their respective decks.',
            recharge: 5,
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
            effect: 'When entering a Mob Room/Boss Room before Decisive roll, Success roll: Deal (DMG) + (Courage Lvl) to 1 Enemy.',
          },
          active: {
            name: 'Echo',
            effect: 'Target 1 Enemy: deal (Courage Lvl) to targeted Enemy and (Room Lvl) to all other Enemies. ',
          },
          ultimate: {
            name: 'EQ',
            effect: 'Target 1 Enemy: deal (Room Lvl) + (Courage Lvl) to targeted Enemy. Jackal restores (Room Lvl) + (Courage Lvl) HP. Remove all debuffs from Jackal and debuff the targeted Enemy with the debuffs removed this way.',
            recharge: 7,
          },
        },
      },
      vulcana: {
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
            effect: 'Randomly choose a target between Vulcana and each Enemy. If Vulcana is targeted: Vulcana restores (Courage Lvl) HP. If an Enemy is targeted: deal (DMG) to that enemy.',
          },
          ultimate: {
            name: 'Reckless Inferno',
            effect: ' Vulcana deals (DMG) + (Courage Lvl) to 1 Enemy. Vulcana gains + (Courage Lvl) Success roll during the Round this ability is used. Vulcana loses (Courage Lvl) HP.',
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
        hp: 7,
        abilities: {
          passive: {
            name: 'Empath\'s Crystal',
            effect: 'When Misteyes Snow or an ally User restores HP, they restore an additional (Room Lvl) HP. If a User restored HP with this ability while at (Aura Lvl) HP or less: they restore 2 x (Room Lvl) instead.',
          },
          active: {
            name: 'Whiteout',
            effect: 'Remove all debuffs on up to (Aura Lvl) ally User(s). If this ability removes a debuff: deal (DMG) to 1 Enemy.',
          },
          ultimate: {
            name: 'Spirit Snowfall',
            effect: 'Resurrect 1 Dead User.',
            recharge: 10,
          },
        },
      },
      dexler: {
        title: 'The Mad Alchemist',
        dmg: 1,
        hp: 8,
        abilities: {
          passive: {
            name: 'Duplicate',
            effect: 'Once per Room, when a Consumable Item would be discarded by Dexler\'s active ability or consumed, Success roll: gain the effects of the Consumable Item without discarding or consuming it. ',
          },
          active: {
            name: 'Alchemic Warfare',
            effect: 'Discard 1 Consumable Item. Either target 1 Enemy: deal (Room Lvl) + (Aura Lvl) to targeted Enemy or target 1 ally User. Targeted ally User restores (Room Lvl) + (Aura Lvl) HP.',
          },
          ultimate: {
            name: 'The Creator',
            effect: 'Reveal (Aura Lvl) cards from the top of the Item Deck: acquire (Room Lvl) Consumable Item(s) (if any) of the revealed Item cards and shuffle the rest back into the Item deck.',
            recharge: 10,
          },
        },
      },
      færie: {
        title: 'The Fable of the Forest',
        dmg: 0,
        hp: 9,
        abilities: {
          passive: {
            name: 'Blessing of the Fæ',
            effect: 'While Færie is at Max HP: Færie and ally Users gain + 1 Success roll and + (Room Lvl) DMG. ',
          },
          active: {
            name: 'Sacred Medicine',
            effect: 'Target 1 User: targeted User restores (Room Lvl) + (Aura Lvl) HP.',
          },
          ultimate: {
            name: 'Fæth',
            effect: 'Target 1 User with (Room Lvl) + (Aura Lvl) HP or less: the targeted User restores Max HP. All debuffs on targeted User are removed.',
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
        title: 'The Defier of Destiny',
        dmg: 5,
        hp: 10,
        abilities: {
          passive: {
            name: 'Get Chance and Luck',
            effect: 'Ein gains + (Luck Lvl) Success roll. Whenever Ein passes a Success roll: Ein restores (Room Lvl) HP.',
          },
          active: {
            name: 'Tempt Fate',
            effect: 'Target 1 Enemy, Success roll: deal (DMG) + (Luck Lvl) to targeted Enemy. If Success roll fails: deal (DMG) - (Luck Lvl) to targeted Enemy instead.',
          },
          ultimate: {
            name: 'Lucky Break',
            effect: 'Success roll 3 times: deal (Luck Lvl) to up to 3 Enemies. If a Success roll fails, this ability does nothing.',
            recharge: 7,
          },
        },
      },
      zuciel: {
        title: 'The Phantom of Sin',
        dmg: 4,
        hp: 13,
        abilities: {
          passive: {
            name: 'Greed',
            effect: 'Whenever Zuciel attacks, declare X: Zuciel deals (DMG) + (X) to the attack target. Discard (X) G. The party can buy Items with (Room Lvl) less G.',
          },
          active: {
            name: 'Sloth',
            effect: 'Zuciel restores (Luck Lvl) HP.',
          },
          ultimate: {
            name: 'Wrath',
            effect: 'Deal (G) to (Luck Lvl) Enemies. Discard (Luck Lvl) G. ',
            recharge: 2,
          },
        },
      },
      marina: {
        title: 'The Chronokeeper',
        dmg: 4,
        hp: 12,
        abilities: {
          passive: {
            name: 'Temporal Shift',
            effect: 'Once per Room, when any die is rolled: Marina can reroll the result.',
          },
          active: {
            name: 'Photon Pulse',
            effect: 'Target 1 Enemy, D10 roll: deal (D10 roll) + (Luck Lvl) to targeted Enemy.',
          },
          ultimate: {
            name: 'Chrono Cure',
            effect: 'Roll the Target die (Room Lvl) times. Declare 1 result: declared targeted User restores (Luck Lvl) HP and Ultimate Gauge is recharged by (Luck Lvl).',
            recharge: 8,
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
