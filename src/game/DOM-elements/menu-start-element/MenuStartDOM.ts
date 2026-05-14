import {BaseDOM} from '../BaseDOM';
import {menuSettingsDOM} from '../menu-settings-element/MenuSettingsDOM';
import {MENU_START_TEMPLATE} from './menu-start-template';
import './menu-start.css';

class MenuStartDOM extends BaseDOM {
  public onStartGame: () => void;

  constructor(template: string) {
    super(template);
    this._goToSettings();
  }

  public get elementDOM() {
    return document.querySelector('.menu-start') as HTMLElement;
  }

  public show(): void {
    this.elementDOM.style.visibility = 'visible';
  }

  public hide(): void {
    this.elementDOM.style.visibility = 'hidden';
  }

  public runAction(): void {
    const button = this.elementDOM.querySelector(
      '.menu-start-button',
    ) as HTMLButtonElement;

    button.onclick = () => {
      this.hide();
      this.onStartGame();
    };
  }

  private _goToSettings(): void {
    const button = this.elementDOM.querySelector(
      '.menu-start-to-settings-button',
    ) as HTMLButtonElement;

    button.onclick = () => {
      this.hide();
      menuSettingsDOM.show();
    };
  }
}

export const menuStartDOM = new MenuStartDOM(MENU_START_TEMPLATE);
