// @require Gear, Classes, Character

const APP_VERSION = 'v2'; // not backwards compatible

$(function () {
  $('.js-version').html(APP_VERSION);

  const MAX_CHARACTERS = 5;

  const $template = $('.js-character-template .js-character');
  const $keyShards = $('.js-key-shards');
  const $gold = $('.js-gold');
  const $mainContent = $('.js-main-content');
  const $addButton = $('.js-add-character');
  const storage = new Storage($mainContent, $keyShards, $gold);

  $template.find('.js-class').append(Classes.$CLASS_SELECT.clone());
  $template.find('.js-gear').each((i, gear) => $(gear).prepend(Gear.$GEAR_SELECT.clone().attr('data-slot', i)));

  function addCharacter(bundle = null) {
    const $character = $template.clone();
    $character.insertBefore($addButton.parent());

    if (bundle) setCharacter($character, bundle.character_key, bundle);
  }

  function setCharacter($node, characterKey, bundle = null) {
    const character = Classes.makeCharacter($node, characterKey, bundle);
    $node.data('character', character);
  }

  function checkCharacterLimit() {
    $mainContent.find('.js-character').length >= MAX_CHARACTERS ? $addButton.hide() : $addButton.show();
  }

  $addButton.on('click', function () {
    addCharacter();
    checkCharacterLimit();
  });

  $keyShards.on('change', function () {
    const level = int($(this).val());
    $('.js-character').each(function (i, el) {
      const character = $(el).data('character');
      if (!character) return;
      character.updateLevel(level);
    });
  });

  $gold.on('change', function () {
    $mainContent.find('.js-character').each(function (i, el) {
      const character = $(el).data('character');
      if (!character || character.name !== 'zuciel') return;
      character.mod('dmg');
    });
  });

  $(document).on('click', '.js-delete-character', function () {
    $(this).closest('.js-character').remove();
    checkCharacterLimit();
    storage.queueSave();
  });

  $(document).on('change', '.js-class-select', function () {
    const $character = $(this).closest('.js-character');
    setCharacter($character, $(this).val());
  });

  $(document).on('change', '.js-gear-select', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character) return;
    const canWear = character.changeGear($(this).data('slot'), $(this).val());
    if (!canWear) $(this).val('-');
  });

  $(document).on('change', '.js-status-mod', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character) return;
    character.mod($(this).data('status'));
  });

  $(document).on('change', '.js-hp-current, .js-recharge-current', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character) return;
    character.changeCurrent($(this).data('status'));
  });

  for (let type of ['gear', 'ability']) {
    $(document).on('click', '.js-' + type + '-show-detail', function () {
      $(this).toggleClass('pressed');
      const $detail = $(this).parent().siblings('.js-' + type + '-detail');
      $detail.toggleClass('hidden');
    });
  }

  $(document).on('click', '.js-debuff input[type="checkbox"]', function () {
    // TODO: check character canDebuff(...)
    // - check for magus cloak / other items
    // - check for T40
    $(this).parent().toggleClass('checked');
  });

  storage.loadFromStorage(addCharacter);

  if ($mainContent.find('.js-character').length === 0) {
    addCharacter();
  }
});
