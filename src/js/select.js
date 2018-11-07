const Select = {};

Select.KEY_DELIMITER = '.';

Select.makeKey = function (group, option) {
  return group + Select.KEY_DELIMITER + option;
};

Select.makeGroupedSelect = function (groupedOptions, className, required = false) {
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

Select.makeSelect = function (options, className, required = false) {
  const $select = $('<select class="' + className + '">');

  $select.append('<option selected' + (required ? ' disabled' : '') + '>-</option>');

  for (let option in options) {
    $select.append($('<option value="' + option + '">' + option + '</option>'));
  }

  return $select;
};
