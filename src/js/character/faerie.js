Classes.Faerie = class Faerie extends Character {
  mod(status) {
    const moddedValue = super.mod(status);

    if (status === 'hp') {
      const globalHpMod = (this.hp.current === moddedValue ? int($('.js-key-shards').val()) : 0);

      if (globalHpMod !== this.globalMod.hp) {
        this.globalMod.hp = globalHpMod;
        $('.js-character').each(function (i, characterSheet) {
          const character = $(characterSheet).data('character');
          if (!character) return;
          character.mod('dmg');
        });
      }
    }

    return moddedValue;
  }
}
