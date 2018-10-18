$(function () {
  const $upButton = $('.js-up-button');
  const $downButton = $('.js-down-button');

  $(document).on('focus', 'input[type="number"]', function () {
    let rect = this.getBoundingClientRect();
    $upButton.removeClass('hidden')
      .css({
        top: rect.y + window.pageYOffset + 'px',
        left: rect.right + window.pageXOffset + 'px'
      });
    $downButton.removeClass('hidden')
      .css({
        top: rect.y + window.pageYOffset + 'px',
        left: rect.left - $downButton.outerWidth() + window.pageXOffset + 'px'
      });
  })
  .on('focusout', 'input[type="number"]', function () {
    $upButton.addClass('hidden');
    $downButton.addClass('hidden');
  });

  $upButton.on('mousedown', function (e) {
    const $focusedInput = $('input[type="number"]:focus');
    $focusedInput.val(int($focusedInput.val()) + 1);
    e.preventDefault();
  });

  $downButton.on('mousedown', function (e) {
    const $focusedInput = $('input[type="number"]:focus');
    $focusedInput.val(int($focusedInput.val()) - 1);
    e.preventDefault();
  });

  // TODO: respect min/max?
});
