// @require Classes, Gear

class Character {

  static get MAX_LEVEL() { return 3; }
  static get LEVEL_BONUS() { return 2; }

  constructor($node, characterKey, bundle = null) {
    this.$node = $node;

    const character = Classes.getCharacterData(characterKey);
    this.class = character.class;
    this.name = character.name;
    this.specType = character.specType;
    this.abilities = character.abilities;

    this.$node.removeClass(Object.keys(Classes.CLASSES).join(' '))
      .addClass(this.class);

    this.level = 0;
    this.globalMod = {
      dmg: 0,
    };

    // this.$icon = this.$node.find('.js-icon')
    //   .attr('src', './public/img/' + snakeCase(this.name) + '.png');
    this.$title = this.$node.find('.js-title')
      .html(character.title);
    this.$class = this.$node.find('.js-class-select');

    this.$debuffs = this.$node.find('.js-debuff input[type="checkbox"]');
    for (let debuff of this.$debuffs) {
      $(debuff).prop('checked', false).parent().removeClass('checked');
    }

    this.$ultimate = this.$node.find('.js-ability-ultimate');
    this.setAbilities();

    this.hp = {
      current: character.hp,
      base: character.hp,
      $current: this.$node.find('.js-hp-current').val(character.hp),
      $value: this.$node.find('.js-hp-max'),
      $detail: this.$node.find('.js-hp-detail'),
      $mod: this.$node.find('.js-hp-mod'),
    };

    this.dmg = {
      base: character.dmg,
      $value: this.$node.find('.js-dmg-value').val(character.dmg),
      $detail: this.$node.find('.js-dmg-detail'),
      $mod: this.$node.find('.js-dmg-mod'),
    };

    this.spec = {
      base: 1,
      $name: this.$node.find('.js-spec-name').html(character.specType),
      $value: this.$node.find('.js-spec-value'),
      $detail: this.$node.find('.js-spec-detail'),
      $mod: this.$node.find('.js-spec-mod'),
    };

    this.recharge = {
      current: 0,
      base: character.abilities.ultimate.recharge,
      $current: this.$node.find('.js-recharge-current').val(0),
      $value: this.$node.find('.js-recharge-value'),
      $detail: this.$node.find('.js-recharge-detail'),
      $mod: this.$node.find('.js-recharge-mod'),
    };

    this.gear = [];
    this.$gear = this.$node.find('.js-gear');
    this.$gear.find('.js-gear-select').val('-');
    this.$node.find('.js-gear-show-detail, .js-gear-detail')
      .addClass('hidden')
      .removeClass('pressed');

    this.$node.find('.js-status-mod').val('');

    if (bundle) this.fromBundle(bundle);

    this.refresh();

    this.$node.find('.js-character-detail').slideDown();
  }

  // TODO: change to "updateAbilities" and call after mod spec
  setAbilities() {
    for (let abilityType in this.abilities) {
      const ability = this.abilities[abilityType];
      this.$node.find('.js-ability-' + abilityType + ' .js-ability-name').html(ability.name);
      this.$node.find('.js-ability-' + abilityType + ' .js-ability-detail').html(ability.effect);
    }
  }

  mod(status) {
    const mod = this.getStatusMod(status);
    const value = this[status].base + this.getLevelMod(status);

    const moddedValue = Math.max(0, value + mod);

    this[status].$value.html(moddedValue);

    this.updateStatusDetail(status, mod, value);
    this.updateCurrentStatus(status, moddedValue);

    return moddedValue;
  }

  getLevelMod(status) {
    if (['hp', 'dmg'].indexOf(status) === -1) return 0
    if (this.name == 'zuciel' && status == 'dmg') return 0;
    return this.level * Character.LEVEL_BONUS;
  }

  getStatusMod(status) {
    return int(this[status].$mod.val())
      + this.getGearMod(status)
      + this.getGlobalCharacterMod(status);
  }

  getGearMod(status) {
    const specType = this.specType;

    return this.gear.reduce(function (carry, gear) {
      if (gear && (status !== 'spec' || !gear.spec_type || gear.spec_type === specType)) {
        carry += gear[status] || 0;
      }
      return carry;
    }, 0);
  }

  getGlobalCharacterMod(status) {
    return $('.js-character').toArray().reduce(function (carry, characterSheet) {
      const character = $(characterSheet).data('character');
      return carry + (character ? int(character.globalMod[status]) : 0);
    }, 0);
  }

  updateStatusDetail(status, mod, value) {
    if (mod !== 0) {
      const operator = mod > 0 ? ' + ' : ' - ';
      this[status].$detail.html(value + operator + Math.abs(mod));
      this[status].$detail.parent().addClass('character-status-modified');
    } else {
      this[status].$detail.html('');
      this[status].$detail.parent().removeClass('character-status-modified');
    }
  }

  updateCurrentStatus(status, moddedValue) {
    if (['hp', 'recharge'].indexOf(status) !== -1) {
      this[status].current = Math.min(this[status].current, moddedValue);
      this[status].$current.val(this[status].current);

      if (status === 'recharge') {
        if (this.recharge.current === moddedValue) {
          this.$ultimate.addClass('charged');
        } else {
          this.$ultimate.removeClass('charged');
        }
      }
    }
  }

  changeCurrent(status) {
    this[status].current = int(this[status].$current.val());

    // tickle
    this.mod(status);

    if (status === 'hp' && this.hp.current === 0) {
      this.$node.addClass('dead');
    } else {
      this.$node.removeClass('dead');
    }
  }

  changeGear(slot, gearKey) {
    const gear = Gear.getGearData(gearKey);

    const canWear = gear && (!gear.limit_class || this.class === gear.limit_class);
    this.gear[slot] = canWear ? gear : undefined;

    this.refresh();

    this.updateGearEffect(this.gear[slot], $(this.$gear[slot]));

    // TODO: trigger gear effects
    // if (canWear) this.gear[slot].onEquip(this);

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

    // full heal
    this.hp.$current.val(this.hp.base + this.getLevelMod('hp') + this.getStatusMod('hp'));
    this.changeCurrent('hp');

    this.mod('dmg');
  }

  refresh(statuses = ['hp', 'dmg', 'spec', 'recharge']) {
    for (let status of statuses) this.mod(status);
  }

  // serializer

  toBundle() {
    const bundle = {
      debuffs: this.$debuffs.map((i, checkbox) => checkbox.checked).toArray(),
      character_key: Select.makeKey(this.class, this.name),
      level: this.level,
      hp: {
        current: this.hp.current,
        mod: int(this.hp.$mod.val())
      },
      dmg: { mod: int(this.dmg.$mod.val()) },
      spec: { mod: int(this.spec.$mod.val()) },
      recharge: {
        current: this.recharge.current,
        mod: int(this.recharge.$mod.val())
      },
      gear: [],
    };

    for (let gear of this.gear) {
      if (gear) bundle.gear.push(Gear.getGearKey(gear));
    }

    return bundle;
  }

  fromBundle(bundle) {
    this.$class.val(bundle.character_key);
    this.level = bundle.level;

    for (let slot in bundle.gear) {
      this.gear[slot] = Gear.getGearData(bundle.gear[slot]);
      $(this.$gear[slot]).find('.js-gear-select').val(bundle.gear[slot]);
      this.updateGearEffect(this.gear[slot], $(this.$gear[slot]));
    }

    for (let status of ['hp', 'dmg', 'spec', 'recharge']) {
      this[status].$mod.val(int(bundle[status].mod));
      if (['hp', 'recharge'].indexOf(status) !== -1) this[status].current = bundle[status].current;
    }

    for (let i in bundle.debuffs) {
      if (!bundle.debuffs[i]) continue;
      $(this.$debuffs[i]).prop('checked', true).parent().toggleClass('checked');
    }
  }
};
