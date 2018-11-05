class Storage {
  static localStorageAvailable() {
    try { return !!localStorage; } catch (e) { return false; };
  }

  static get SAVE_DELAY() { return 5000; }

  static get PROMPT() {
    return {
      REQUEST: {
        MESSAGE: 'Would you like to save your data locally?',
        NO: 'No, don\'t!',
        YES: 'Sure',
      },
      UPDATE: {
        MESSAGE: 'Hey, we\'ve updated, so old data will be deleted. Sorry!<br>'
          + 'Do you still want to save your data locally?',
        NO: 'Nah',
        YES: 'Yes please!',
      },
    };
  }

  constructor($mainContent, $keyShards, $gold) {
    this.$mainContent = $mainContent;
    this.$keyShards = $keyShards;
    this.$gold = $gold;

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
      key_shards: int(this.$keyShards.val()),
      gold: int(this.$gold.val()),
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

  loadFromStorage(addCharacter) {
    if (Storage.localStorageAvailable() && localStorage.visseria) {
      try {
        this.gameData = JSON.parse(localStorage.visseria);

        if (Object.keys(this.gameData).length > 0 && !this.gameData[APP_VERSION]) {
          this.showPrompt('UPDATE');
          throw 'App was updated to version: ' + APP_VERSION;
        }

        this.$keyShards.val(this.gameData[APP_VERSION].key_shards);
        this.$gold.val(this.gameData[APP_VERSION].gold);

        if (this.gameData[APP_VERSION].characters) {
          for (let bundle of this.gameData[APP_VERSION].characters) {
            addCharacter(bundle);
          }
        }
      } catch (e) {
        console.error("An error occurred while loading from storage:\n" + e);
      }
    } else if (Storage.localStorageAvailable()) {
      this.showPrompt('REQUEST');
    }
  }

  showPrompt(type) {
    this.$storagePrompt.find('.js-prompt-message').html(Storage.PROMPT[type].MESSAGE);
    this.$storagePrompt.find('.js-prompt-button.no').html(Storage.PROMPT[type].NO);
    this.$storagePrompt.find('.js-prompt-button.yes').html(Storage.PROMPT[type].YES);
    this.$storagePrompt.removeClass('hidden');
  }
}
