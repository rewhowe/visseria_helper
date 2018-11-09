Classes.Psykoshka = class Psykoshka extends Character {
  mod(status) {
    super.mod(status);
    if (status === 'spec') this.mod('dmg');
  }

  getStatusMod(status) {
    return super.getStatusMod(status)
      + (status === 'dmg' ? this.spec.base + this.getStatusMod('spec') : 0);
  }
};
