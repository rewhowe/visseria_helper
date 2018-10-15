// TODO: code
// * add delete button
// * stop adding characters at 5
// * make a storage prompt
//   * "Save your data locally? (You can clear it by deleting all characters)"
//     * "Sure"
//     * "No"
// * save to local storage
// * convert , and . to - and +
// * update with latest doc
//
// TODO: basic styles
// * get icons?

$(function () {
  const $template = $('.js-character-template .js-character');
  const $keyShards = $('.js-key-shards');
  const $mainContent = $('.js-main-content');
  const $addButton = $('.js-add-character');

  function addCharacter() {
    const $character = $template.clone();
    $character.data('character', new Character($character));
    $character.insertBefore($addButton.parent());
  }

  $addButton.on('click', function () {
    addCharacter();
    // TODO: stop at 5?
    // TODO: also need to add delete button
  });

  $keyShards.on('change', function () {
    const level = parseInt($(this).val()) || 0;
    $('.js-character').each(function (i, el) {
      const character = $(el).data('character');
      if (!character || !character.ready) return;
      character.updateLevel(level);
    });
  });

  $(document).on('change', '.js-class-select', function () {
    const $character = $(this).closest('.js-character');
    const character = $character.data('character');
    character.changeClass($(this).val());

    $character.find('.js-gear-select').val('-');
    $character.find('.js-status-mod').val('');
    $character.find('.js-gear-show-detail, .js-gear-detail').addClass('hidden');

    $keyShards.trigger('change');
  });

  $(document).on('change', '.js-gear-select', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character.ready) return;
    const canWear = character.updateGear($(this).data('slot'), $(this).val());

    if (!canWear) $(this).val('-');
  });

  $(document).on('change', '.js-status-mod', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character.ready) return;
    character.mod($(this).data('status'));
  });

  $(document).on('change', '.js-hp-current, .js-recharge-current', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character.ready) return;
    character.updateCurrent($(this).data('status'));
  });

  for (let type of ['gear', 'ability']) {
    $(document).on('click', '.js-' + type + '-show-detail', function () {
      $(this).toggleClass('pressed');
      const $detail = $(this).parent().siblings('.js-' + type + '-detail');
      $detail.toggleClass('hidden');
    });
  }

  $(document).on('click', 'input[type="checkbox"]', function () {
    $(this).parent().toggleClass('checked');
  });

  // if localStorage doesn't exist
  addCharacter();
});
