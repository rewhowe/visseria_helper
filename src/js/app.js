// @require Gear, Classes, Character, Items

const APP_VERSION = 'v2'; // not backwards compatible

const GAME = {};

$(function () {
  $('.js-version').html(APP_VERSION);

  const MAX_CHARACTERS = 5;

  const $template = $('.js-character-template .js-character');
  const $keyShards = $('.js-key-shards');
  const $gold = $('.js-gold');
  const $mainContent = $('.js-main-content');
  const $addButton = $('.js-add-character');
  const storage = new Storage($mainContent);

  GAME.getKeyShards = () => int($keyShards.val());
  GAME.getRoomLevel = () => Math.min(3, int($keyShards.val()) + 1);
  GAME.getGold = () => int($gold.val());

  $template.find('.js-class').append(Classes.$CLASS_SELECT.clone());
  $template.find('.js-gear').each( (i, gear) => $(gear).prepend(Gear.$GEAR_SELECT.clone().attr('data-slot', i)) );
  $template.find('.js-item').each( (i, item) => $(item).prepend(Items.$ITEM_SELECT.clone()) );

  function addCharacter(bundle = null) {
    const $character = $template.clone();
    $character.insertBefore($addButton.parent());

    if (bundle) setCharacter($character, bundle.character_key, bundle);
  }

  function setCharacter($node, characterKey, bundle = null) {
    const character = Classes.makeCharacter($node, characterKey, bundle);
    $node.data('character', character);
    return character;
  }

  function checkCharacterLimit() {
    $mainContent.find('.js-character').length >= MAX_CHARACTERS ? $addButton.hide() : $addButton.show();
  }

  function refreshAllCharacters() {
    $mainContent.find('.js-character').each(function (i, el) {
      const character = $(el).data('character');
      if (character) character.refresh();
    });
  }

  $addButton.on('click', function () {
    addCharacter();
    checkCharacterLimit();
  });

  $keyShards.on('change', function () {
    const level = int($(this).val());
    $mainContent.find('.js-character').each(function (i, el) {
      const character = $(el).data('character');
      if (character) character.updateLevel(level);
    });
  });

  $gold.on('change', function () {
    $mainContent.find('.js-character').each(function (i, el) {
      const character = $(el).data('character');
      if (character && character.name === 'Zuciel') character.mod('dmg');
    });
  });

  $(document).on('click', '.js-delete-character', function () {
    $(this).closest('.js-character').remove();
    checkCharacterLimit();
    storage.queueSave();
  });

  $(document).on('change', '.js-class-select', function () {
    const $character = $(this).closest('.js-character');
    const character = setCharacter($character, $(this).val());
    character.updateLevel(GAME.getKeyShards());
    refreshAllCharacters();
  });

  $(document).on('change', '.js-gear-select', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character) return;
    const canWear = character.changeGear($(this).data('slot'), $(this).val());
    if (!canWear) $(this).val('-');
  });

  $(document).on('change', '.js-item-select', function () {
    const character = $(this).closest('.js-character').data('character');
    if (character) character.changeItem($(this).parent(), $(this).val());
  });

  $(document).on('change', '.js-status-mod', function () {
    const character = $(this).closest('.js-character').data('character');
    if (character) character.mod($(this).data('status'));
  });

  $(document).on('change', '.js-hp-current, .js-recharge-current', function () {
    const character = $(this).closest('.js-character').data('character');
    if (character) character.changeCurrent($(this).data('status'));
  });

  for (let type of ['gear', 'ability', 'item']) {
    $(document).on('click', '.js-show-detail', function () {
      $(this).toggleClass('pressed');
      const $detail = $(this).parent().siblings('.js-detail');
      $detail.toggleClass('hidden');
    });
  }

  $(document).on('click', '.js-debuff', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character) return;

    let changed = false;
    if ($(this).hasClass('checked')) {
      changed = character.removeDebuff($(this).data('type'));
    } else {
      changed = character.addDebuff($(this).data('type'));
    }

    if (changed) storage.queueSave();
  });

  storage.loadFromStorage(addCharacter, $keyShards, $gold);

  if ($mainContent.find('.js-character').length === 0) {
    addCharacter();
  }
});
