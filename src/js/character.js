class Character {
  constructor($node) {
    this.$node = $node;

    this.$node.find('.js-class').append($CLASS_SELECT.clone());

    this.$icon = this.$node.find('.js-icon');
    this.$title = this.$node.find('.js-title');

    this.hp = {
      $current: this.$node.find('.js-hp-current'),
      max: 0,
      $max: this.$node.find('.js-hp-max'),
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

    this.hp.$current.val(character.hp);
    this.hp.max = character.hp;
    this.modHp();

    this.dmg.value = character.dmg;
    this.modDmg();

    this.spec.value = 1;
    this.spec.$name.html(getClass(characterKey).spec);
    this.modSpec();
  }

  modHp() {
    const mod = parseInt(this.hp.$mod.val()) || 0;
    this.hp.$max.html(this.hp.max + mod);

    if (mod > 0) {
      // apply style to $max
      this.hp.$detail.html(this.hp.max + ' + ' + mod);
    }
  }

  modDmg() {
    const mod = parseInt(this.dmg.$mod.val()) || 0;
    this.dmg.$value.html(this.dmg.value + mod);

    if (mod > 0) {
      // apply style to $max
      this.dmg.$detail.html(this.dmg.value + ' + ' + mod);
    }
  }

  modSpec() {
    const mod = parseInt(this.spec.$mod.val()) || 0;
    this.spec.$value.html(this.spec.value + mod);

    if (mod > 0) {
      // apply style to $max
      this.spec.$detail.html(this.spec.value + ' + ' + mod);
    }
  }
};

