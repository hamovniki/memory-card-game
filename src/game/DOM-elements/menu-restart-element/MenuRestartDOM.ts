import {BaseDOM} from '../BaseDOM';
import {menuSettingsDOM} from '../menu-settings-element/MenuSettingsDOM';
import {MENU_RESTART_TEMPLATE} from './menu-restart-template';
import './menu-restart.css';

class MenuRestartDOM extends BaseDOM {
  public onRestartGame: () => void;

  constructor(template: string) {
    super(template);
    this._goToSettings();
  }

  public get elementDOM() {
    return document.querySelector('.menu-restart') as HTMLElement;
  }

  public get titleDOM() {
    return this.elementDOM.querySelector('.menu-restart-title') as HTMLElement;
  }

  public show(isWin?: boolean): void {
    isWin ? this._setWinParams() : this._setLoseParams();
    this.runAction();
    this.elementDOM.style.visibility = 'visible';
  }

  public hide(): void {
    this.elementDOM.style.visibility = 'hidden';
  }

  public runAction(): void {
    const button = this.elementDOM.querySelector(
      '.menu-restart-button',
    ) as HTMLButtonElement;

    button.onclick = () => {
      this.hide();
      this.onRestartGame();
    };
  }

  private _setWinParams() {
    this.elementDOM.style.backgroundColor = 'green';
    this.titleDOM.innerText = 'ПОБЕДА';
  }

  private _setLoseParams() {
    this.elementDOM.style.backgroundColor = 'red';
    this.titleDOM.innerText = 'ПОРАЖЕНИЕ';
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

export const menuRestartDOM = new MenuRestartDOM(MENU_RESTART_TEMPLATE);
