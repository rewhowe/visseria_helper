const KEY_DELIMITER = '.';

function makeSelect(groupedOptions, className, required = true) {
  const $select = $('<select class="' + className + '">');

  $select.append('<option selected' + (required ? ' disabled' : '') + '>-</option>');

  for (group in groupedOptions) {
    $optGroup = $('<optgroup label="' + titleCase(group) + '">');

    for (option of groupedOptions[group]) {
      const key = group + KEY_DELIMITER + option;
      const $option = $('<option value="' + key + '">' + titleCase(option) + '</option>');
      $optGroup.append($option);
    }

    $select.append($optGroup);
  }

  return $select;
}
