const KEY_DELIMITER = '.';

function makeKey(group, option) {
  return group + KEY_DELIMITER + option;
}

function makeSelect(groupedOptions, className, required = true) {
  const $select = $('<select class="' + className + '">');

  $select.append('<option selected' + (required ? ' disabled' : '') + '>-</option>');

  for (let group in groupedOptions) {
    $optGroup = $('<optgroup label="' + titleCase(group) + '">');

    for (let option in groupedOptions[group]) {
      const key = group + KEY_DELIMITER + option;
      const $option = $('<option value="' + key + '">' + titleCase(groupedOptions[group][option]) + '</option>');
      $optGroup.append($option);
    }

    $select.append($optGroup);
  }

  return $select;
}
