import {Difficulty} from '../../manager/DifficultyManager';
import {gameManager} from '../../manager/GameManager';
import {BaseDOM} from '../BaseDOM';
import {menuStartDOM} from '../menu-start-element/MenuStartDOM';
import {MENU_SETTINGS_TEMPLATE} from './menu-settings-template';
import './menu-settings.css';

class MenuSettingsDOM extends BaseDOM {
  public onBackToMenu: () => void;

  constructor(template: string) {
    super(template);
    this._setupBackButton();
  }

  public get elementDOM() {
    return document.querySelector('.menu-settings') as HTMLElement;
  }

  public show(): void {
    this._syncRadioWithCurrentDifficulty();
    this.elementDOM.style.visibility = 'visible';
  }

  public hide(): void {
    this.elementDOM.style.visibility = 'hidden';
  }

  public runAction(): void {
    this._setupBackButton();
  }

  private _setupBackButton(): void {
    const button = this.elementDOM.querySelector(
      '.back-to-menu-button',
    ) as HTMLButtonElement;

    button.onclick = () => {
      const selectedDifficulty = this._getSelectedDifficulty();
      if (selectedDifficulty) {
        gameManager.difficultyManager.changeDifficulty(selectedDifficulty);
      }

      this.hide();

      menuStartDOM.show();
    };
  }

  private _getSelectedDifficulty(): Difficulty {
    const selectedRadio = this.elementDOM.querySelector(
      'input[name="difficulty"]:checked',
    ) as HTMLInputElement;
    return selectedRadio.value as Difficulty;
  }

  private _syncRadioWithCurrentDifficulty(): void {
    const currentDifficulty = gameManager.difficultyManager.currentDifficulty;
    const radioToCheck = this.elementDOM.querySelector(
      `input[name="difficulty"][value="${currentDifficulty}"]`,
    ) as HTMLInputElement;
    if (radioToCheck) {
      radioToCheck.checked = true;
    }
  }
}

export const menuSettingsDOM = new MenuSettingsDOM(MENU_SETTINGS_TEMPLATE);
