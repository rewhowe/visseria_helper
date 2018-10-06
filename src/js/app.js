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
