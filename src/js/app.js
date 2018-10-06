// TODO: code
// * level (shared across all characters?) +2/2 to everyone
// * recharge level / recharge rate
// * equipment select
//   * stat boosts for spec are restricted to class
//   * legendary equipment is restricted to class
//   * zuciel's dmg can only be increased by G (complicated?)
// * stop adding characters at 5
// * add delete button
// * save to local storage
//
// TODO: basic styles
// * bold stats when modified
// * add a border
// * fix the ugly plus button
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
    const character = $(this).closest('.js-character').data('character');
    character.changeClass($(this).val());
  });

  $(document).on('change', '.js-status-mod', function () {
    const character = $(this).closest('.js-character').data('character');
    character.mod($(this).data('status'), $(this).val());
  });

  $(document).on('change', '.js-hp-current', function () {
    const character = $(this).closest('.js-character').data('character');
    character.updateCurrentHp($(this).val());
  });

  // if localStorage doesn't exist
  addCharacter();
});
