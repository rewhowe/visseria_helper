class Storage {
  static localStorageAvailable() {
    try { return !!localStorage; } catch (e) { return false; };
  }

  static get SAVE_DELAY() { return 5000; }

  static get PROMPT() {
    return {
      request: {
        message: 'Would you like to save your data locally?',
        no: 'No, don\'t!',
        yes: 'Sure',
      },
      update: {
        message: 'Hey, we\'ve updated, so old data will be deleted. Sorry!<br>'
          + 'Do you still want to save your data locally?',
        no: 'Nah',
        yes: 'Yes please!',
      },
    };
  }

  constructor($mainContent) {
    this.$mainContent = $mainContent;

    this.gameData = {};
    this.savePid = {};

    this.$storagePrompt = $('.js-storage-prompt');

    const _this = this;
    this.$storagePrompt.on('click', '.js-prompt-button', function () {
      if ($(this).data('answer') === 'yes') _this.saveToStorage();
      _this.$storagePrompt.remove();
    });

    $(document).on('change', this.queueSave.bind(this));
  }

  queueSave() {
    if (!Storage.localStorageAvailable()) return;
    window.clearTimeout(this.savePid);
    this.savePid = window.setTimeout(this.saveToStorage.bind(this), Storage.SAVE_DELAY);
  }

  saveToStorage() {
    this.gameData[APP_VERSION] = {
      key_shards: GAME.getKeyShards(),
      gold: GAME.getGold(),
      characters: [],
    };

    const gameData = this.gameData;
    this.$mainContent.find('.js-character').each(function (i, characterSheet) {
      const character = $(characterSheet).data('character');
      if (!character) return;
      gameData[APP_VERSION].characters.push(character.toBundle());
    });

    localStorage.visseria = JSON.stringify(this.gameData);
  }

  loadFromStorage(addCharacter, $keyShards, $gold) {
    if (Storage.localStorageAvailable() && localStorage.visseria) {
      try {
        this.gameData = JSON.parse(localStorage.visseria);

        if (Object.keys(this.gameData).length > 0 && !this.gameData[APP_VERSION]) {
          this.showPrompt('update');
          throw 'App was updated to version: ' + APP_VERSION;
        }

        $keyShards.val(this.gameData[APP_VERSION].key_shards);
        $gold.val(this.gameData[APP_VERSION].gold);

        if (this.gameData[APP_VERSION].characters) {
          for (let bundle of this.gameData[APP_VERSION].characters) {
            addCharacter(bundle);
          }
        }

        this.$mainContent.find('.js-character').each(function (i, characterSheet) {
          const character = $(characterSheet).data('character');
          if (!character) return;
          character.refresh();
        });
      } catch (e) {
        console.error("An error occurred while loading from storage:\n" + e);
      }
    } else if (Storage.localStorageAvailable()) {
      this.showPrompt('request');
    }
  }

  showPrompt(type) {
    this.$storagePrompt.find('.js-prompt-message').html(Storage.PROMPT[type].message);
    this.$storagePrompt.find('.js-prompt-button.no').html(Storage.PROMPT[type].no);
    this.$storagePrompt.find('.js-prompt-button.yes').html(Storage.PROMPT[type].yes);
    this.$storagePrompt.removeClass('hidden');
  }
}
