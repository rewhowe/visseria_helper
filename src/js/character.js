class Character {

  static get MAX_LEVEL() { return 3; }
  static get LEVEL_BONUS() { return 2; }

  constructor($node) {
    this.$node = $node;

    this.$node.find('.js-class').append($CLASS_SELECT.clone());

    this.class = null;
    this.character = null;
    this.level = 0;
    this.ready = false;

    this.$icon = this.$node.find('.js-icon');
    this.$title = this.$node.find('.js-title');

    this.hp = {
      current: 0,
      base: 0,
      $current: this.$node.find('.js-hp-current'),
      $value: this.$node.find('.js-hp-max'),
      $detail: this.$node.find('.js-hp-detail'),
      $mod: this.$node.find('.js-hp-mod'),
    };

    this.dmg = {
      base: 0,
      $value: this.$node.find('.js-dmg-value'),
      $detail: this.$node.find('.js-dmg-detail'),
      $mod: this.$node.find('.js-dmg-mod'),
    };

    this.spec = {
      base: 1,
      $name: this.$node.find('.js-spec-name'),
      $value: this.$node.find('.js-spec-value'),
      $detail: this.$node.find('.js-spec-detail'),
      $mod: this.$node.find('.js-spec-mod'),
    };

    this.recharge = {
      current: 0,
      base: 0,
      $current: this.$node.find('.js-recharge-current'),
      $value: this.$node.find('.js-recharge-value'),
      $detail: this.$node.find('.js-recharge-detail'),
      $mod: this.$node.find('.js-recharge-mod'),
    };

    this.gear = [];
    this.$gear = this.$node.find('.js-gear');
    this.$gear.each((i, gear) => $(gear).prepend($GEAR_SELECT.clone().data('slot', i)));
  }

  changeClass(characterKey) {
    this.ready = true;
    this.character = getCharacter(characterKey);

    this.$icon.attr('src', 'placeholder');
    this.$title.html(this.character.title);
    this.gear = [];

    this.$ultimate = this.$node.find('.js-ability-ultimate');
    this.setAbilities();

    this.hp.current = this.character.hp;
    this.hp.base = this.character.hp;
    this.hp.$current.val(this.character.hp);
    this.mod('hp');

    this.dmg.base = this.character.dmg;
    this.mod('dmg');

    this.spec.base = 1;
    this.spec.$name.html(titleCase(this.character.specType));
    this.mod('spec');

    this.recharge.current = 0;
    this.recharge.base = 5; // TODO: update classes
    this.hp.$current.val(0);
    this.mod('recharge');

    this.$node.find('.js-character-detail').slideDown();
  }

  mod(status) {
    const mod = this.getStatusMod(status);
    const value = this[status].base + this.getLevelMod(status);

    const moddedValue = Math.max(0, value + mod);

    this[status].$value.html(moddedValue);

    if (mod !== 0) {
      const operator = mod > 0 ? ' + ' : ' - ';
      this[status].$detail.html(value + operator + Math.abs(mod));
      this[status].$detail.parent().addClass('character-status-modified');
    } else {
      this[status].$detail.html('');
      this[status].$detail.parent().removeClass('character-status-modified');
    }

    if (['hp', 'recharge'].indexOf(status) !== -1) {
      this[status].current = Math.min(this[status].current, moddedValue);
      this[status].$current.val(this[status].current);

      if (status === 'recharge' && this.recharge.current === moddedValue) {
        this.$ultimate.addClass('charged');
      } else {
        this.$ultimate.removeClass('charged');
      }
    }
  }

  setAbilities() {
    for (let abilityType in this.character.abilities) {
      const ability = this.character.abilities[abilityType];
      this.$node.find('.js-ability-' + abilityType + ' .js-ability-name').html(ability.name);
      this.$node.find('.js-ability-' + abilityType + ' .js-ability-detail').html(ability.effect);
    }
  }

  getLevelMod(status) {
    if (status == 'spec') return 0
    if (this.character.name == 'zuciel' && status == 'dmg') return 0;
    return this.level * Character.LEVEL_BONUS;
  }

  getStatusMod(status) {
    return (parseInt(this[status].$mod.val()) || 0)
      + this.getGearMod(status)
      + this.getCharacterMod(status);
  }

  getGearMod(status) {
    const character = this.character;

    return this.gear.reduce(function (carry, gear) {
      if (gear && (status !== 'spec' || !gear.spec_type || gear.spec_type === character.specType)) {
        carry += gear[status] || 0;
      }
      return carry;
    }, 0);
  }

  // TODO: if this starts getting unwieldy, convert to using child classes
  getCharacterMod(status) {
    switch (this.character.name) {
      case 'zuciel':
        this.$gold = this.$gold || $('.js-gold');
        const gold = parseInt(this.$gold.val()) || 0;
        return status == 'dmg' ? gold - this.getGearMod(status) : 0;
      case 'psykoshka':
        if (status !== 'dmg') return 0;
        return this.spec.base + this.getStatusMod('spec');
      default:
        return 0;
    }
  }

  // this isn't really necessary at the moment, but I'll keep it for future use?
  updateCurrent(status) {
    const currentValue = parseInt(this[status].$current.val()) || 0;
    this[status].current = currentValue - this.getStatusMod(status);

    // tickle
    if (status === 'recharge') {
      this.mod('recharge');
    }
  }

  updateGear(slot, gearKey) {
    const gear = getGear(gearKey);

    const canWear = gear && (!gear.limit || this.character.class === gear.limit);
    this.gear[slot] = canWear ? gear : undefined;

    this.mod('hp');
    this.mod('dmg');
    this.mod('spec');

    this.updateGearEffect(this.gear[slot], $(this.$gear[slot]));

    return canWear;
  }

  updateGearEffect(gear, $gear) {
    if (gear && gear.effect) {
      $gear.find('.js-gear-show-detail').removeClass('hidden');
      $gear.find('.js-gear-detail').html(gear.effect);
    } else {
      $gear.find('.js-gear-show-detail, .js-gear-detail').addClass('hidden');
      $gear.find('.js-gear-detail').html('');
    }
  }

  updateLevel(level) {
    this.level = Math.min(Character.MAX_LEVEL, Math.max(0, level));
    this.mod('hp');
    this.mod('dmg');

    // full heal
    this.hp.current = this.hp.base + this.getLevelMod() + this.getStatusMod('hp');
    this.hp.$current.val(this.hp.current);
  }
};
