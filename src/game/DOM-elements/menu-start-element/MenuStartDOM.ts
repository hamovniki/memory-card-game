import {BaseDOM} from '../BaseDOM';
import {MENU_START_TEMPLATE} from './menu-start-template';
import './menu-start.css';

class MenuStartDOM extends BaseDOM {
  public onStartGame: () => void = () => {};
  public onOpenSettings: () => void = () => {};

  constructor() {
    super(MENU_START_TEMPLATE);
    this.hide();
    this.bindButton('.menu-start-button', () => {
      this.hide();
      this.onStartGame();
    });

    this.bindButton('.menu-start-to-settings-button', () => {
      this.hide();
      this.onOpenSettings();
    });
  }
}

export const menuStartDOM = new MenuStartDOM();
