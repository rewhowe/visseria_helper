$(function () {
  // TODO:
  // add click handler

  const MARGIN = 5; // px

  const $upButton = $('.js-up-button');
  const $downButton = $('.js-down-button');

  $(document).on('focus', 'input[type="number"]', function () {
    let rect = this.getBoundingClientRect();
    $upButton.removeClass('hidden')
      .css({
        top: rect.y + window.pageYOffset + 'px',
        left: rect.right + window.pageXOffset + MARGIN + 'px'
      });
    $downButton.removeClass('hidden')
      .css({
        top: rect.y + window.pageYOffset + 'px',
        left: rect.left - $downButton.width() + window.pageXOffset - MARGIN + 'px'
      });
  })
  .on('focusout', 'input[type="number"]', function () {
    $upButton.addClass('hidden');
    $downButton.addClass('hidden');
  });
});
