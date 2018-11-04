// @require Gear, Classes, Character

$(function () {
  const APP_VERSION = 'v2'; // not backwards compatible
  $('.js-version').html(APP_VERSION);

  const MAX_CHARACTERS = 5;
  const SAVE_DELAY = 5000;

  const PROMPT = {
    REQUEST: {
      MESSAGE: 'Would you like to save your data locally?',
      NO: 'No, don\'t!',
      YES: 'Sure',
    },
    UPDATE: {
      MESSAGE: 'Hey, we\'ve updated, so old data will be deleted. Sorry!<br>'
        + 'Do you still want to save your data locally?',
      NO: 'Nah',
      YES: 'Yes please!',
    },
  };

  const $storagePrompt = $('.js-storage-prompt');
  const $template = $('.js-character-template .js-character');
  const $keyShards = $('.js-key-shards');
  const $gold = $('.js-gold');
  const $mainContent = $('.js-main-content');
  const $addButton = $('.js-add-character');

  let storage = null;
  let savePid = null;

  $template.find('.js-class').append(Classes.$CLASS_SELECT.clone());
  $template.find('.js-gear').each((i, gear) => $(gear).prepend(Gear.$GEAR_SELECT.clone().attr('data-slot', i)));

  function localStorageAvailable() {
    try { return !!localStorage; } catch (e) { return false; };
  }

  function addCharacter(bundle = null) {
    const $character = $template.clone();
    $character.insertBefore($addButton.parent());

    if (bundle) setCharacter($character, bundle.character_key, bundle);
  }

  function setCharacter($node, characterKey, bundle = null) {
    const character = Classes.makeCharacter($node, characterKey, bundle);
    $node.data('character', character);

    $keyShards.trigger('change');
  }

  function checkCharacterLimit() {
    $mainContent.find('.js-character').length >= MAX_CHARACTERS ? $addButton.hide() : $addButton.show();
  }

  function queueSave() {
    if (!localStorageAvailable()) return;
    window.clearTimeout(savePid);
    savePid = window.setTimeout(saveToStorage, SAVE_DELAY);
  }

  function saveToStorage() {
    storage[APP_VERSION] = {
      key_shards: int($keyShards.val()),
      gold: int($gold.val()),
      characters: [],
    };

    $mainContent.find('.js-character').each(function (i, characterSheet) {
      const character = $(characterSheet).data('character');
      if (!character) return;
      storage[APP_VERSION].characters.push(character.toBundle());
    });

    localStorage.visseria = JSON.stringify(storage);
  }

  $addButton.on('click', function () {
    addCharacter();
    checkCharacterLimit();
  });

  $storagePrompt.on('click', '.js-prompt-button', function () {
    if ($(this).data('answer') === 'yes') {
      storage = {};
      saveToStorage();
    }
    $storagePrompt.remove();
  })

  $(document).on('change', queueSave);

  $keyShards.on('change', function () {
    const level = int($(this).val());
    $('.js-character').each(function (i, el) {
      const character = $(el).data('character');
      if (!character) return;
      character.updateLevel(level);
    });
  });

  $gold.on('change', function () {
    $('.js-character').each(function (i, el) {
      const character = $(el).data('character');
      if (!character || character.name !== 'zuciel') return;
      character.mod('dmg');
    });
  });

  $(document).on('click', '.js-delete-character', function () {
    $(this).closest('.js-character').remove();
    checkCharacterLimit();
    queueSave();
  });

  $(document).on('change', '.js-class-select', function () {
    const $character = $(this).closest('.js-character');
    setCharacter($character, $(this).val());
  });

  $(document).on('change', '.js-gear-select', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character) return;
    const canWear = character.updateGear($(this).data('slot'), $(this).val());
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
    character.updateCurrent($(this).data('status'));
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

  if (localStorageAvailable() && localStorage.visseria) {
    try {
      storage = JSON.parse(localStorage.visseria);

      if (Object.keys(storage).length > 0 && !storage[APP_VERSION]) {
        $storagePrompt.find('.js-prompt-message').html(PROMPT.UPDATE.MESSAGE);
        $storagePrompt.find('.js-prompt-button.no').html(PROMPT.UPDATE.NO);
        $storagePrompt.find('.js-prompt-button.yes').html(PROMPT.UPDATE.YES);
        $storagePrompt.removeClass('hidden');
        throw 'App was updated to version: ' + APP_VERSION;
      }

      $keyShards.val(storage[APP_VERSION].key_shards);
      $gold.val(storage[APP_VERSION].gold);

      if (storage[APP_VERSION].characters) {
        for (let bundle of storage[APP_VERSION].characters) {
          addCharacter(bundle);
        }
      }
    } catch (e) {
      console.error("An error occurred while loading from storage:\n" + e);
      storage = {};
    }
  } else if (localStorageAvailable()) {
    $storagePrompt.find('.js-prompt-message').html(PROMPT.REQUEST.MESSAGE);
    $storagePrompt.find('.js-prompt-button.no').html(PROMPT.REQUEST.NO);
    $storagePrompt.find('.js-prompt-button.yes').html(PROMPT.REQUEST.YES);
    $storagePrompt.removeClass('hidden');
  }

  if ($mainContent.find('.js-character').length === 0) {
    addCharacter();
  }
});
