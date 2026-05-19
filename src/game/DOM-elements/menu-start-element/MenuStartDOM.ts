import {BaseDOM} from '../BaseDOM';
import {MENU_START_TEMPLATE} from './menu-start-template';
import './menu-start.css';

class MenuStartDOM extends BaseDOM {
  constructor() {
    super(MENU_START_TEMPLATE);
    this.hide();
    this.bindButton('.menu-start-button', () => {
      this.hide();
      this.events.emit(this.events.GAME_START_REQUEST);
    });

    this.bindButton('.menu-start-to-settings-button', () => {
      this.hide();
      this.events.emit(this.events.OPEN_SETTINGS);
    });
  }
}

export const menuStartDOM = new MenuStartDOM();
