Classes.Færie = class Færie extends Character {
  mod(status) {
    super.mod(status);

    if (status !== 'hp') return;

    const globalDmgMod = (this.hp.current === this.hp.moddedValue ? GAME.getRoomLevel() : 0);

    if (globalDmgMod !== this.globalMod.dmg) {
      this.globalMod.dmg = globalDmgMod;
      $('.js-character').each(function (i, characterSheet) {
        const character = $(characterSheet).data('character');
        if (!character) return;
        character.mod('dmg');
      });
    }
  }
};
