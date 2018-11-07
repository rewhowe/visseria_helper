const Select = {};

Select.KEY_DELIMITER = '.';

Select.makeKey = function (group, option) {
  return group + Select.KEY_DELIMITER + option;
};

Select.makeSelect = function (groupedOptions, className, required = true) {
  const $select = $('<select class="' + className + '">');

  $select.append('<option selected' + (required ? ' disabled' : '') + '>-</option>');

  for (let group in groupedOptions) {
    $optGroup = $('<optgroup label="' + group + '">');

    for (let option in groupedOptions[group]) {
      const key = group + Select.KEY_DELIMITER + option;
      const $option = $('<option value="' + key + '">' + groupedOptions[group][option] + '</option>');
      $optGroup.append($option);
    }

    $select.append($optGroup);
  }

  return $select;
};
