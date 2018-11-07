// @require Select

const Items = {};

Items.ITEMS = {
  'Antidote': {
    cost: 3,
    effect: 'Removes all Debuffs from 1 User',
  },
  'Bangbang Bomb': {
    cost: 3,
    effect: 'Deal 5 DMG to 1 Enemy ',
  },
  'Counterfeit Coin': {
    cost: 3,
    effect: 'This Item is treated as 1G',
  },
  'Elixir': {
    cost: 3,
    effect: 'Recharges the User\'s Ultimate Gauge 1',
  },
  'Liquid Courage': {
    cost: 3,
    effect: 'Grants +2 Decisive roll for the Room',
  },
  'Lucky Fruit': {
    cost: 3,
    effect: 'User gains +2 Success roll for the Room',
  },
  'Minimimic': {
    cost: 3,
    effect: 'Immediately battle a Mimic Mob',
  },
  'Potion': {
    cost: 3,
    effect: '1 active User Recovers (Room Lvl) +5 HP',
  },
  'Resurrection Ring': {
    cost: 15,
    effect: 'Resurrects 1 Dead User to Max HP with no Debuffs',
  },
  'Shine Shield': {
    cost: 3,
    effect: 'Blocks 5 DMG',
  },
  'Smoke Bomb': {
    cost: 3,
    effect: 'All active Users can Escape the active Room regardless of Success roll and return to the previous Room. Escaped Room Tile is reset',
  },
  'Sorcerer\'s Eye': {
    cost: 3,
    effect: 'Reveals all adjacent Room Tiles. Any Room not entered by the end of the turn is reset',
  },
  'Stamina Potion': {
    cost: 3,
    effect: '1 inactive User becomes active',
  },
};

Items.getItemData = function (key) {
  const item = Items.ITEMS[key];
  if (!item) return;
  item.name = key;
  return item;
};

Items.$ITEM_SELECT = (function () {
  return Select.makeSelect(Items.ITEMS, 'js-item-select');
})();
