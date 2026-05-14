import {BaseDOM} from '../BaseDOM';
import {MENU_RESTART_TEMPLATE} from './menu-restart-template';

class MenuRestartDOM extends BaseDOM {
  public onRestartGame: () => void;

  constructor(template: string) {
    super(template);
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
}

export const menuRestartDOM = new MenuRestartDOM(MENU_RESTART_TEMPLATE);
