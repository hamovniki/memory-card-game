import {gameManager} from '../manager/GameManager';
import {menuRestartDOM} from './menu-restart-element/MenuRestartDOM';
import {menuSettingsDOM} from './menu-settings-element/MenuSettingsDOM';
import {menuStartDOM} from './menu-start-element/MenuStartDOM';

export class DOMEventsMediator {
  constructor() {
    this._setupListeners();
  }

  private _setupListeners() {
    gameManager.events.on(gameManager.events.GAME_START_REQUEST, () => {
      menuStartDOM.hide();
    });

    gameManager.events.on(gameManager.events.OPEN_SETTINGS, () => {
      menuSettingsDOM.setCurrentDifficulty(
        gameManager.difficultyManager.currentDifficulty,
      );
      menuSettingsDOM.show();
    });

    gameManager.events.on(gameManager.events.BACK_TO_MENU, () => {
      menuStartDOM.show();
      const newDifficulty = menuSettingsDOM.getCurrentDifficulty();
      if (newDifficulty) {
        gameManager.difficultyManager.changeCurrentDifficulty(newDifficulty);
      }
    });

    gameManager.events.on(gameManager.events.GAME_PRELOAD, () => {
      menuStartDOM.show();
    });

    gameManager.events.on(gameManager.events.GAME_OVER_WIN, () => {
      menuRestartDOM.show(true);
    });

    gameManager.events.on(gameManager.events.GAME_OVER_LOSE, () => {
      menuRestartDOM.show(false);
    });
  }
}
