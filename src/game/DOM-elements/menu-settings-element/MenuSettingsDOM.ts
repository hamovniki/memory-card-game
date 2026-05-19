import {Difficulty} from '../../manager/DifficultyManager';
import {BaseDOM} from '../BaseDOM';
import {MENU_SETTINGS_TEMPLATE} from './menu-settings-template';
import './menu-settings.css';

class MenuSettingsDOM extends BaseDOM {
  constructor() {
    super(MENU_SETTINGS_TEMPLATE);
    this.hide();

    this.bindButton('.back-to-menu-button', () => {
      this.hide();

      this.events.emit(this.events.BACK_TO_MENU);
    });
  }

  public setCurrentDifficulty(difficulty: Difficulty): void {
    const radio = this.element.querySelector(
      `input[value="${difficulty}"]`,
    ) as HTMLInputElement;
    if (radio) radio.checked = true;
  }

  public getCurrentDifficulty(): Difficulty {
    const radio = this.element.querySelector(
      'input[name="difficulty"]:checked',
    ) as HTMLInputElement;
    return radio?.value as Difficulty;
  }
}

export const menuSettingsDOM = new MenuSettingsDOM();
