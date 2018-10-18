$(function () {
  // don't show on pc
  if (window.matchMedia('only screen and (min-width: 640px)').matches) return;

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
    $focusedInput.val(int($focusedInput.val()) + 1).trigger('change');
    e.preventDefault();
  });

  $downButton.on('mousedown', function (e) {
    const $focusedInput = $('input[type="number"]:focus');
    $focusedInput.val(int($focusedInput.val()) - 1).trigger('change');
    e.preventDefault();
  });

  // respect min / max
  $(document).on('change', 'input[type="number"]', function () {
    let value = int($(this).val());
    if (this.max) value = Math.min(this.max, value);
    if (this.min) value = Math.max(this.min, value);
    $(this).val(value);
  });
});
