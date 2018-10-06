class Character {
  constructor($node) {
    this.$node = $node;

    this.$node.find('.js-class').append($CLASS_SELECT.clone());

    this.$icon = this.$node.find('.js-icon');
    this.$title = this.$node.find('.js-title');

    this.hp = {
      current: 0,
      value: 0,
      $current: this.$node.find('.js-hp-current'),
      $value: this.$node.find('.js-hp-max'),
      $detail: this.$node.find('.js-hp-detail'),
      $mod: this.$node.find('.js-hp-mod'),
    };

    this.dmg = {
      value: 0,
      $value: this.$node.find('.js-dmg-value'),
      $detail: this.$node.find('.js-dmg-detail'),
      $mod: this.$node.find('.js-dmg-mod'),
    };

    this.spec = {
      value: 1,
      $name: this.$node.find('.js-spec-name'),
      $value: this.$node.find('.js-spec-value'),
      $detail: this.$node.find('.js-spec-detail'),
      $mod: this.$node.find('.js-spec-mod'),
    };
  }

  changeClass(characterKey) {
    const character = getCharacter(characterKey);

    this.$icon.attr('src', 'https://placekitten.com/100/100'); // TODO: icons
    this.$title.html(character.title);

    this.hp.current = character.hp;
    this.hp.value = character.hp;
    this.hp.$current.val(character.hp);
    this.mod('hp');

    this.dmg.value = character.dmg;
    this.mod('dmg');

    this.spec.value = 1;
    this.spec.$name.html(getClass(characterKey).spec);
    this.mod('spec');
  }

  mod(status, mod) {
    mod = parseInt(mod) || 0;
    const moddedValue = Math.max(0, this[status].value + mod);
    this[status].$value.html(moddedValue);

    if (mod > 0) {
      // apply style to $max
      this[status].$detail.html(this[status].value + ' + ' + mod);
    }

    if (status === 'hp') {
      const currentHp = Math.max(0, this.hp.current + mod);
      this[status].$current.val(currentHp);
    }
  }

  updateCurrentHp(hp) {
    hp = parseInt(hp) || 0;
    const mod = parseInt(this.hp.$mod.val()) || 0;
    this.hp.current = hp - mod;
  }
};

