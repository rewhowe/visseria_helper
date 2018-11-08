Classes.T4OMKII = class T4OMKII extends Character {
  mod(status) {
    super.mod(status);
    if (status === 'spec') this.mod('hp');
  }

  getStatusMod(status) {
    return super.getStatusMod(status)
      + (status === 'hp' ? this.spec.base + this.getStatusMod('spec') : 0);
  }

  canDebuff(debuff) {
    if (debuff === 'bleed' || debuff === 'fear') return false;
    return super.canDebuff(debuff);
  }
}
