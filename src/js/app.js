// TODO: code
// * level (shared across all characters?) +2/2 to everyone
// * G input
// * zuciel's dmg = G (complicated?)
// * recharge level / recharge rate
// * stop adding characters at 5
// * add delete button
// * save to local storage
//
// TODO: basic styles
// * bold stats when modified
// * fix the ugly plus / info buttons
// * get icons?
// * icon 100x100

$(function () {
  const $template = $('.js-character-template .js-character');
  const $mainContent = $('.js-main-content');
  const $addButton = $('.js-add-character');

  function addCharacter() {
    const $character = $template.clone();
    $character.data('character', new Character($character));
    $character.insertBefore($addButton);
  }

  $addButton.on('click', function () {
    addCharacter();
    // TODO: stop at 5?
    // TODO: also need to add delete button
  });

  $(document).on('change', '.js-class-select', function () {
    const $character = $(this).closest('.js-character');
    const character = $character.data('character');
    character.changeClass($(this).val());

    $character.find('.js-gear-select').val('-');
    $character.find('.js-status-mod').val('');
    $character.find('.js-gear-show-detail, .js-gear-detail').removeClass('show').hide();
  });

  $(document).on('change', '.js-gear-select', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character.character || $(this).val() === '-') return;
    const canWear = character.updateGear($(this).data('slot'), $(this).val());

    if (!canWear) $(this).val('-');
  });

  $(document).on('change', '.js-status-mod', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character.character) return;
    character.mod($(this).data('status'));
  });

  $(document).on('change', '.js-hp-current', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character.character) return;
    character.updateCurrentHp($(this).val());
  });

  for (let type of ['gear', 'ability']) {
    $(document).on('click', '.js-' + type + '-show-detail', function () {
      // TODO: clean this up... (will depend on styling later, as that may change html structure)
      const $detail = $($(this).siblings('.js-' + type + '-detail')[0] || $(this).parent().siblings('.js-' + type + '-detail'));
      if ($detail.hasClass('show')) {
        $detail.removeClass('show').slideUp();
      } else {
        $detail.addClass('show').slideDown();
      }
    });
  }

  // if localStorage doesn't exist
  addCharacter();
});
