Classes.T4OMKII = class T4OMKII extends Character {
  getStatusMod(status) {
    return super.getStatusMod(status)
      + (status === 'hp' ? this.spec.base + this.getStatusMod('spec') : 0);
  }
}
