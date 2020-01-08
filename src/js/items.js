// @require Select

const Items = {};

Items.ITEMS = {
  'Bangbang Bomb': {
    cost: 3,
    effect: 'Deal 3 x Room Lvl (#room) to 1 Enemy',
  },
  'Counterfeit Coin': {
    cost: 3,
    effect: 'This Item is treated as 1G',
  },
  'Elixir': {
    cost: 3,
    effect: 'Recharges the User\'s Ultimate Gauge to Max',
  },
  'Fortune\'s Fruit': {
    cost: 3,
    effect: 'Grant 1 User to pass a Success roll regardless of roll result (Can be consumed after a Success roll is performed)',
  },
  'Minimimic': {
    cost: 3,
    effect: 'Immediately battle a Mimic Mob',
  },
  'Panacea': {
    cost: 3,
    effect: 'Removes all Debuffs from 1 User',
  },
  'Potion': {
    cost: 3,
    effect: 'Restore 1 User by 3 x Room Lvl (#room) HP',
  },
  'Resurrection Ring': {
    cost: 15,
    effect: 'Resurrects 1 Dead User to Max HP with no Debuffs',
  },
  'Shine Shield': {
    cost: 3,
    effect: 'Reduce DMG dealt to 1 User from an Enemy attack to 0. Any effects that trigger when that User is attacked is negated',
  },
  'Smoke Bomb': {
    cost: 3,
    effect: 'All Users can Escape the current Room and return to the previous Room. The Escaped Room Tile is Reset',
  },
  'Sorcerer\'s Eye': {
    cost: 3,
    effect: 'Reveal undiscovered Room Tiles until you discover a Trap, Treasure or Mini Boss Room Tile. Reset the revealed Trap, Treasure or Mini Boss Room Tile',
  },
  'Tasty Haste': {
    cost: 3,
    effect: 'Party attacks first regardless of Decisive roll result (Can be consumed after a Decisive roll is performed) ',
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
