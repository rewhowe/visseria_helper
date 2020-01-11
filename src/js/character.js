// @require Classes, Gear, Items

class Character {

  static get MAX_LEVEL() { return 3; }
  static get STATUSES() { return ['hp', 'dmg', 'spec', 'recharge']; }

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

    this.$icon = this.$node.find('.js-icon')
      .attr('src', './public/img/' + snakeCase(this.name) + '.png');
    this.$title = this.$node.find('.js-title')
      .html(character.title);
    this.$class = this.$node.find('.js-class-select');

    this.$debuffs = this.$node.find('.js-debuff');
    this.$debuffs.each( (i, debuff) => $(debuff).removeClass('checked') );

    this.$ultimate = this.$node.find('.js-ability-ultimate');

    this.hp = {
      current: character.hp,
      base: character.hp,
      moddedValue: character.hp,
      $current: this.$node.find('.js-hp-current').val(character.hp),
      $value: this.$node.find('.js-hp-max'),
      $detail: this.$node.find('.js-hp-detail'),
      $mod: this.$node.find('.js-hp-mod'),
    };

    this.dmg = {
      base: character.dmg,
      moddedValue: character.dmg,
      $value: this.$node.find('.js-dmg-value').val(character.dmg),
      $detail: this.$node.find('.js-dmg-detail'),
      $mod: this.$node.find('.js-dmg-mod'),
    };

    this.spec = {
      base: 1,
      moddedValue: 1,
      $name: this.$node.find('.js-spec-name').html(character.specType),
      $value: this.$node.find('.js-spec-value'),
      $detail: this.$node.find('.js-spec-detail'),
      $mod: this.$node.find('.js-spec-mod'),
    };

    this.recharge = {
      current: 0,
      base: character.abilities.ultimate.recharge,
      moddedValue: character.abilities.ultimate.recharge,
      $current: this.$node.find('.js-recharge-current').val(0),
      $value: this.$node.find('.js-recharge-value'),
      $detail: this.$node.find('.js-recharge-detail'),
      $mod: this.$node.find('.js-recharge-mod'),
    };

    this.gear = [];
    this.$gear = this.$node.find('.js-gear');
    this.$gear.find('.js-gear-select').val('-');
    this.$node.find('.js-gear .js-show-detail, .js-gear .js-detail, .js-item .js-show-detail, .js-item .js-detail')
      .addClass('hidden')
      .removeClass('pressed');

    this.$node.find('.js-status-mod').val('');

    if (bundle) this.fromBundle(bundle);

    this.refresh();

    this.$node.find('.js-character-detail').slideDown();
  }

  updateAbilities() {
    for (let abilityType in this.abilities) {
      const ability = this.abilities[abilityType];
      const effect = this.formatEffect(ability.effect);

      this.$node.find('.js-ability-' + abilityType + ' .js-ability-name').html(ability.name);
      this.$node.find('.js-ability-' + abilityType + ' .js-detail').html(effect);
    }
  }

  mod(status) {
    const mod = this.getStatusMod(status);
    const value = this[status].base;

    this[status].moddedValue = Math.max(0, value + mod);

    this[status].$value.html(this[status].moddedValue);

    this.updateStatusDetail(status, mod, value);
    this.updateCurrentStatus(status);
    this.updateAbilities();

    //for (let slot in this.gear) {
    //  if (this.gear[slot]) this.updateEffect(this.gear[slot], $(this.$gear[slot]));
    //}
  }

  formatEffect(effect) {
    return effect.replace(/\n/g, '<br>')
      .replace(/#dmg/g, '<strong>' + this.dmg.moddedValue + '</strong>')
      .replace(/#spec/g, '<strong class="spec">' + this.spec.moddedValue + '</strong>')
      .replace(/#room/g, '<strong>' + GAME.getRoomLevel() + '</strong>')
      .replace(/#gold/g, '<strong>' + GAME.getGold() + '</strong>');
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

  updateCurrentStatus(status) {
    if (['hp', 'recharge'].indexOf(status) !== -1) {
      this[status].current = Math.min(this[status].current, this[status].moddedValue);
      this[status].$current.val(this[status].current);

      if (status === 'recharge') {
        if (this.recharge.current === this[status].moddedValue) {
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

    this.updateEffect(this.gear[slot], $(this.$gear[slot]));

    if (canWear && this.gear[slot].onEquip) this.gear[slot].onEquip(this);

    return canWear;
  }

  changeItem($item, itemKey) {
    const item = Items.getItemData(itemKey);
    this.updateEffect(item, $item);
  }

  updateEffect(data, $node) {
    if (data && data.effect) {
      $node.find('.js-show-detail').removeClass('hidden');
      $node.find('.js-detail').html(data.effect);
    } else {
      $node.find('.js-show-detail, .js-detail').addClass('hidden');
      $node.find('.js-detail').html('');
    }
  }

  updateLevel(level) {
    this.level = Math.min(Character.MAX_LEVEL, Math.max(0, level));

    // full heal
    this.hp.$current.val(this.hp.base + this.getStatusMod('hp'));
    this.changeCurrent('hp');

    this.mod('dmg');
  }

  refresh() {
    for (let status of Character.STATUSES) this.mod(status);
  }

  addDebuff(debuff) {
    const $debuff = this.$debuffs.filter('[data-type="' + debuff + '"]');
    const isChecked = $debuff.hasClass('checked');

    if (this.canDebuff(debuff)) $debuff.addClass('checked');

    return isChecked !== $debuff.hasClass('checked');
  }

  canDebuff(debuff) {
    for (let gear of this.gear) {
      if (gear && gear.name === 'Magus\' Cloak') return false;
    }
    return true;
  }

  removeDebuff(debuff) {
    const $debuff = this.$debuffs.filter('[data-type="' + debuff + '"]');
    if (!$debuff.hasClass('checked')) return false;
    $debuff.removeClass('checked');
    return true;
  }

  // serializer

  toBundle() {
    const bundle = {
      debuffs: this.$debuffs.map( (i, debuff) => $(debuff).hasClass('checked') ).toArray(),
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
      items: [],
    };

    for (let gear of this.gear) {
      if (gear) bundle.gear.push(Gear.getGearKey(gear));
    }

    this.$node.find('.js-item select').each(function (i, item) {
      const itemKey = $(item).val();
      if (itemKey) bundle.items.push(itemKey);
    });

    return bundle;
  }

  fromBundle(bundle) {
    this.$class.val(bundle.character_key);
    this.level = bundle.level;

    for (let slot in bundle.gear) {
      this.gear[slot] = Gear.getGearData(bundle.gear[slot]);
      $(this.$gear[slot]).find('.js-gear-select').val(bundle.gear[slot]);
      this.updateEffect(this.gear[slot], $(this.$gear[slot]), 'gear');
    }

    const $items = this.$node.find('.js-item select');
    for (let slot in bundle.items) {
      $($items[slot]).val(bundle.items[slot]).trigger('change');
    }

    for (let status of Character.STATUSES) {
      this[status].$mod.val(int(bundle[status].mod));
      if (['hp', 'recharge'].indexOf(status) !== -1) this[status].current = bundle[status].current;
    }

    for (let i in bundle.debuffs) {
      if (bundle.debuffs[i]) $(this.$debuffs[i]).addClass('checked');
    }
  }
};
