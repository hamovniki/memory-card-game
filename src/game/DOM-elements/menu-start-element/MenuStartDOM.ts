import {BaseDOM} from '../BaseDOM';
import {MENU_START_TEMPLATE} from './menu-start-template';

class MenuStartDOM extends BaseDOM {
  public onStartGame: () => void;

  constructor(template: string) {
    super(template);
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
}

export const menuStartDOM = new MenuStartDOM(MENU_START_TEMPLATE);
