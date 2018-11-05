Classes.Zuciel = class Zuciel extends Character {
  mod(status) {
    const mod = this.getStatusMod(status);
    const base = (status === 'dmg') ? int($('.js-gold').val()) : this[status].base;
    const value = base + this.getLevelMod(status);
    const moddedValue = Math.max(0, value + mod);

    this[status].$value.html(moddedValue);

    this.updateStatusDetail(status, mod, value);
    this.updateCurrentStatus(status, moddedValue);

    return moddedValue;
  }

  updateStatusDetail(status, mod, value) {
    if (mod !== 0) {
      const operator = mod > 0 ? ' + ' : ' - ';
      this[status].$detail.html(value + operator + Math.abs(mod));
      this[status].$detail.parent().addClass('character-status-modified');
    } else if (status === 'dmg' && int($('.js-gold').val()) !== 0) {
      this[status].$detail.html('');
      this[status].$detail.parent().addClass('character-status-modified');
    } else {
      this[status].$detail.html('');
      this[status].$detail.parent().removeClass('character-status-modified');
    }
  }

  getGearMod(status) {
    if (status === 'dmg') return 0;

    return super.getGearMod(status);
  }
};
