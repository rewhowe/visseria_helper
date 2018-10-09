// TODO: code
// * gear descriptions
// * level (shared across all characters?) +2/2 to everyone
// * G input
// * zuciel's dmg = G (complicated?)
// * abilities / descriptions
// * recharge level / recharge rate
// * stop adding characters at 5
// * add delete button
// * save to local storage
//
// TODO: basic styles
// * bold stats when modified
// * add a border
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

    $character.find('.js-gear-select, .js-status-mod').val('');
  });

  $(document).on('change', '.js-gear-select', function () {
    const character = $(this).closest('.js-character').data('character');
    if (!character.character || $(this).val() === '-') return;
    const canWear = character.updateGear($(this).data('slot'), $(this).val());

    if (canWear === false) $(this).val('-');
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

  // if localStorage doesn't exist
  addCharacter();
});
