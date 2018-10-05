const CLASSES = {
  guardian: {
    spec: 'Soul',
    characters: {
      albatross_grand: {
        title: 'The Armored Angel',
        dmg: 2,
        hp: 18,
        passive: 'Feather Shield - Albatross Grand takes -1x (Soul Lvl) DMG from enemy attacks',
        active: 'Guardian of the Gods - Albatross Grand can block 2 enemies per Round',
        ultimate: 'Divine Intervention - R5; Negate any DMG any 1 active ally User is dealt this turn',
      },
      T4O_MKII: {
        title: 'The Soul in the Shell',
        dmg: 3,
        hp: 16,
        passive: 'Welded Will -T4O MKII cannot be debuffed with Bleed or Fear. T4O MKII gains +1x (Soul Lvl) Max HP',
        active: 'Self Destruct - T4O MKII deals XDMG to 1 enemy and loses XHP. (X cannot be greater than T4O MKII\'s Max HP)',
        ultimate: 'Recharge - R7; T4O MKII heals to Max HP',
      },
      lilith: {
        title: 'The Bad Blood',
        dmg: 1,
        hp: 16,
        passive: 'Siphon - Attacking enemies heals Lilith for +1x (Soul Lvl) HP. Attacking enemies debuffs them with Bleed',
        active: 'Blood Drain - If an active enemy is debuffed with Bleed, remove the debuff and deal 1x (Soul Lvl) DMG to that enemy',
        ultimate: 'Vampire\'s Desire - R6; All enemies are debuffed with Bleed',
      },
    },
  },
  spellweaver: {
    spec: 'Intelligence',
    characters: {
      harmony_marx: {
        title: 'The Sorcerer Songstress',
        dmg: 5,
        hp: 14,
        passive: 'Tempo - Harmony Marx gains +1x (Intelligence Lvl) succession roll for each successful attack on an enemy. This effect stacks but resets when Harmony Marx leaves the Room',
        active: 'Song of Silence - Debuff 1 basic enemy with Silence til the end of the next turn if succession roll',
        ultimate: 'Da Capo - R10; Once per Room, gain an extra turn if succession roll',
      },
      ariadne: {
        title: 'The Blind Prophet',
        dmg: 6,
        hp: 11,
        passive: 'Dimensional Decision - Once during your turn when a Room Type is revealed, draw the top 3 Rooms of that revealed Type and choose 1. It is now that chosen Room',
        active: 'Darkness Falls - Blind 1 basic enemy til the end of the next turn if succession roll',
        ultimate: 'Foreseer\’s Favor - R5; Ariadne gains the following ability based on the current Room type:'
          + "\nMob/Boss Room - Once per Room, Ariadne gains +1x (Intelligence Lvl) DMG for the Room"
          + "\nTrap Room - Ariadne gains +1x (Intelligence Lvl) succession roll"
          + "\nTreasure Room - Gain +1 Item if an Item is gained and/or gain +1 Note if a Note is gained"
      },
      psykoshka: {
        title: 'The Lost Familiar',
        dmg: 4,
        hp: 13,
        passive: 'Symmetry - Psykoshka gains +1x (Intelligence Lvl) DMG',
        active: 'Copycat - Once per turn, Psykoshka can use the active ability of an active User',
        ultimate: 'Loyalty - R8; Active ally Users gain +1x (Intelligence Lvl) Special Stat Lvl for the turn',
      },
    },
  },
  slayer: {
    spec: 'Courage',
    characters: {
      grimwulf_kaiser: {
        title: 'The Howling Death',
        dmg: 5,
        hp: 9,
        passive: 'First Strike - Gain +1x (Courage Lvl) decisive roll',
        active: 'Dual Wield - Deal half of DMG (rounded up) to up to 2 enemies',
        ultimate: 'Hellhound - R6; Grimwulf Kaiser spawns a Hellhound Token with +1x (Courage Lvl) DMG and 1 Max HP. There can only be 1 active Hellhound Token at a time',
      },
      jackal: {
        title: 'The Soundslinger',
        dmg: 7,
        hp: 7,
        passive: 'Sonic Snipe - Upon discovering a Mob room before decisive roll, Jackal can immediately attack 1 enemy if succession roll',
        active: 'Echo - Deal DMG to 1 enemy equal to the last blocked DMG by Jackal +1x (Courage Lvl)',
        ultimate: 'Distortion - R7; 1 active enemy receives +1x (Courage Lvl) DMG from attacks for the turn',
      },
      vulcana: {
        title: 'The Pyroxian Flame',
        dmg: 6,
        hp: 8,
        passive: 'Catching Fire - Any overkill damage done by Vulcana is dealt to another activ enemy',
        active: 'Fire Dance - Vulcana gains +1x (Courage Lvl) DMG for the next attack',
        ultimate: 'Pyreball - R6; Vulcana deals 3+ (Courage Lvl) DMG to 1 enemy if succession roll. This ability repeats until Vulcana fails a succession roll',
      },
    },
  },
  enchanter: {
    spec: 'Aura',
    characters: {
      misteyes_snow: {
        title: 'The White Fox',
        dmg: 3,
        hp: 14,
        passive: 'Empath - Any healing Misteyes Snow receives also heals 1 active ally User for the same amount +1x (Aura Lvl) ',
        active: 'Erasure - Once per Room, Misteyes Snow can remove all debuffs on 1x (Aura Lvl) active Users',
        ultimate: 'Light of Life - R10; Once per Room, If an active ally User (except Misteyes Snow) died of any source this turn, they are immediately resurrected',
      },
      dexler: {
        title: 'The Mad Alchemist',
        dmg: 1,
        hp: 11,
        passive: 'Duplicate - Once per turn when a basic consumable item is used or discarded, Dexler gains 1 copy of that item if succession roll',
        active: 'Alchemic Warfare - Dexler can discard a consumable Item to deal 5+ (Aura Lvl) DMG to an enemy or heal an active ally User for 5+ (Aura Lvl) HP',
        ultimate: 'The Creator - R5; Once per Room, Dexler acquires any one basic consumable',
      },
      faerie: {
        title: 'The Fable of the Forest',
        dmg: 0,
        hp: 13,
        passive: 'Blessing of the Fae - During Battle, all active ally Users gain +1x (Aura Lvl) DMG for the first attack if they attack first.',
        active: 'Sacred Medicine - Heal 1 active ally User +1x (Aura Lvl) ',
        ultimate: 'Faeth - R7; Heal 1 active ally User to Max HP. That User cannot attack or use abilities the turn this ability is used',
      },
    },
  },
  trickster: {
    spec: 'Luck',
    characters: {
      ein: {
        title: 'The Shadewalker',
        dmg: 6,
        hp: 10,
        passive: 'Chance and Luck - Successful succession rolls grants Ein +1x (Luck Lvl) DMG. This effect can stack but resets if a succession roll fails',
        active: 'Gamble - Active ally Users gain +1x (Luck Lvl) succession roll for the turn',
        ultimate: 'Shadow Sneak - R5; Upon discovering a Trap Room, it is disabled if succession roll',
      },
      zuciel: {
        title: 'The Phantom of Sin',
        dmg: 0,
        hp: 13,
        passive: 'Greed - Zuciel cannot gain DMG from any Gear but gains DMG equal to the party’s total G',
        active: 'Sloth - Zuciel heals for +1x (Luck Lvl) HP',
        ultimate: 'Wrath - R1; If Zuciel is at full health, he can attack 1x (Luck Lvl) enemies. Zuciel’s health becomes 1',
      },
      marina: {
        title: 'The Chronokeeper',
        dmg: 5,
        hp: 10,
        passive: 'Choice of Chronos - Once per Room, when an Item is acquired, Marina can discard the Item and acquire a new one instead. This can be repeated 1x (Luck Lvl) times',
        active: 'Rewrite Destiny - When a die is rolled, Marina can ignore the result and roll once more',
        ultimate: 'Gift of the Chronokeepers - R10; Once per Room, all other active Users\' Ultimate Gauge become full',
      },
    },
  },
};

const $CLASS_SELECT = $('<select class="js-class-select">');
$CLASS_SELECT.append('<option selected disabled>-</option>');

const CHARACTER_KEY_DELIMITER = '.';

for (className in CLASSES) {
  $optGroup = $('<optgroup label="' + titleCase(className) + '">');

  for (character in CLASSES[className].characters) {
    const key = className + CHARACTER_KEY_DELIMITER + character;
    $character = $('<option value="' + key + '">' + titleCase(character) + '</option>');
    $optGroup.append($character);
  }

  $CLASS_SELECT.append($optGroup);
}

function getClass(key) {
  return CLASSES[key.split(CHARACTER_KEY_DELIMITER)[0]];
}

function getCharacter(key) {
  key = key.split(CHARACTER_KEY_DELIMITER);
  return CLASSES[key[0]].characters[key[1]];
}
