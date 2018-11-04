// @require Classes, Gear

class Character {

  static get MAX_LEVEL() { return 3; }
  static get LEVEL_BONUS() { return 2; }

  constructor($node, characterKey, bundle = null) {
    this.$node = $node;

    console.log(characterKey);
    const character = Classes.getCharacterData(characterKey);
    this.class = character.class;
    this.name = character.name;
    this.specType = character.specType;
    this.abilities = character.abilities;

    this.$node.removeClass(Object.keys(Classes.CLASSES).join(' '))
      .addClass(this.class);

    // this.$class = Classes.$CLASS_SELECT.clone();
    // this.$node.find('.js-class').append(this.$class);

    // this.character = null;
    this.level = 0;
    // this.ready = false;

    this.$icon = this.$node.find('.js-icon')
      .attr('src', './public/img/' + this.name.toLowerCase() + '.png');
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
      $name: this.$node.find('.js-spec-name').html(titleCase(character.specType)),
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

    for (let status of ['hp', 'dmg', 'spec', 'recharge']) this.mod(status);

    this.$node.find('.js-character-detail').slideDown();
  }

  // changeClass(characterKey) {
    // this.ready = true;
    // this.character = Classes.getCharacterData(characterKey);

    // this.$node.removeClass(Object.keys(Classes.CLASSES).join(' ')).addClass(this.class);
    // this.$icon.attr('src', './public/img/' + this.character.name.toLowerCase() + '.png');
    // this.$title.html(this.character.title);
    // this.gear = [];
    // this.$gear.find('.js-gear-select').val('-');
    // this.setAbilities();

    // this.$node.find('.js-gear-show-detail, .js-gear-detail')
    //   .addClass('hidden')
    //   .removeClass('pressed');

    // for (let debuff of this.$debuffs) {
    //   $(debuff).prop('checked', false).parent().removeClass('checked');
    // }

    // this.$node.find('.js-status-mod').val('');

    // this.hp.current = this.character.hp;
    // this.hp.base = this.character.hp;
    // this.hp.$current.val(this.character.hp);
    // this.mod('hp');

    // this.dmg.base = this.character.dmg;
    // this.mod('dmg');

    // this.spec.base = 1;
    // this.spec.$name.html(titleCase(this.character.specType));
    // this.mod('spec');

    // this.recharge.current = 0;
    // this.recharge.base = this.character.abilities.ultimate.recharge;
    // this.hp.$current.val(0);
    // this.mod('recharge');

    // this.$node.find('.js-character-detail').slideDown();
  // }

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

      if (status === 'recharge') {
        if (this.recharge.current === moddedValue) {
          this.$ultimate.addClass('charged');
        } else {
          this.$ultimate.removeClass('charged');
        }
      }
    }
  }

  setAbilities() {
    // for (let abilityType in this.character.abilities) {
    for (let abilityType in this.abilities) {
      const ability = this.abilities[abilityType];
      this.$node.find('.js-ability-' + abilityType + ' .js-ability-name').html(ability.name);
      this.$node.find('.js-ability-' + abilityType + ' .js-ability-detail').html(ability.effect);
    }
  }

  getLevelMod(status) {
    if (['hp', 'dmg'].indexOf(status) === -1) return 0
    // if (this.character.name == 'zuciel' && status == 'dmg') return 0;
    if (this.name == 'zuciel' && status == 'dmg') return 0;
    return this.level * Character.LEVEL_BONUS;
  }

  getStatusMod(status) {
    return int(this[status].$mod.val())
      + this.getGearMod(status);
      // + this.getCharacterMod(status);
  }

  getGearMod(status) {
    // const character = this.character;
    const specType = this.specType;

    return this.gear.reduce(function (carry, gear) {
      // if (gear && (status !== 'spec' || !gear.spec_type || gear.spec_type === character.specType)) {
      if (gear && (status !== 'spec' || !gear.spec_type || gear.spec_type === specType)) {
        carry += gear[status] || 0;
      }
      return carry;
    }, 0);
  }

  // TODO: if this starts getting unwieldy, convert to using child classes
  // getCharacterMod(status) {
  //   switch (this.character.name) {
  //     case 'zuciel':
  //       this.$gold = this.$gold || $('.js-gold');
  //       const gold = int(this.$gold.val());
  //       return status == 'dmg' ? gold - this.getGearMod(status) : 0;
  //     case 'psykoshka':
  //       if (status !== 'dmg') return 0;
  //       return this.spec.base + this.getStatusMod('spec');
  //     default:
  //       return 0;
  //   }
  // }

  updateCurrent(status) {
    this[status].current = int(this[status].$current.val());

    // tickle
    this.mod(status);

    if (status === 'hp' && this.hp.current === 0) {
      this.$node.addClass('dead');
    } else {
      this.$node.removeClass('dead');
    }
  }

  updateGear(slot, gearKey) {
    const gear = Gear.getGear(gearKey);
    console.log(slot);

    // const canWear = gear && (!gear.limit_class || this.character.class === gear.limit_class);
    const canWear = gear && (!gear.limit_class || this.class === gear.limit_class);
    this.gear[slot] = canWear ? gear : undefined;

    // this.mod('hp');
    // this.mod('dmg');
    // this.mod('spec');
    // this.mod('recharge');
    for (let status of ['hp', 'dmg', 'spec', 'recharge']) this.mod(status);

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
    this.hp.$current.val(this.hp.base + this.getLevelMod('hp') + this.getStatusMod('hp'));
    this.updateCurrent('hp');
  }

  // serializer

  toBundle() {
    const bundle = {
      debuffs: this.$debuffs.map((i, checkbox) => checkbox.checked).toArray(),
      // character_key: Classes.getCharacterKey(this.character),
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
      this.gear[slot] = Gear.getGear(bundle.gear[slot]);
      $(this.$gear[slot]).find('.js-gear-select').val(bundle.gear[slot]);
      this.updateGearEffect(this.gear[slot], $(this.$gear[slot]));
    }

    for (let status of ['hp', 'dmg', 'spec', 'recharge']) {
      this[status].$mod.val(int(bundle[status].mod));
      if (['hp', 'recharge'].indexOf(status) !== -1) this[status].current = bundle[status].current;
      // this.mod(status);
    }

    for (let i in bundle.debuffs) {
      if (!bundle.debuffs[i]) continue;
      $(this.$debuffs[i]).prop('checked', true).parent().toggleClass('checked');
    }
  }
};
