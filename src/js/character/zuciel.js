Classes.Zuciel = class Zuciel extends Character {
  getGearMod(status) {
    if (status === 'dmg') return 0;

    const specType = this.specType;

    return this.gear.reduce(function (carry, gear) {
      if (gear && (status !== 'spec' || !gear.spec_type || gear.spec_type === specType)) {
        carry += gear[status] || 0;
      }
      return carry;
    }, 0);
  }
};
