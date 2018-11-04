Classes.Zuciel = class Zuciel extends Character {
  getStatusMod(status) {
    return super.getStatusMod(status)
      + (status === 'dmg' ? int($('.js-gold').val()) : 0);
  }

  getGearMod(status) {
    if (status === 'dmg') return 0;

    return super.getGearMod(status);
  }
};
