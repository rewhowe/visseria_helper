$(function () {
  // TODO: move to html
  // hide
  // show on focus
  // hide on focusout
  // add click handler
  // add position absolute to css
  // add more css
  const $upButton = $('<i class="up-button ">▲</i>');
  const $downButton = $('<i class="down-button ">▼</i>');

  $(document.body).append($upButton).append($downButton);

  $(document).on('focus', 'input[type="number"]', function () {
    let rect = this.getBoundingClientRect();
    $upButton.css({ position: 'absolute', top: rect.y + 'px', left: rect.right + 'px' });
    $downButton.css({ position: 'absolute', top: rect.y + 'px', left: rect.left - $downButton.width() + 'px' });
  });
});
