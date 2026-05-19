import {BaseDOM} from '../BaseDOM';
import {MENU_RESTART_TEMPLATE} from './menu-restart-template';
import './menu-restart.css';

class MenuRestartDOM extends BaseDOM {
  constructor() {
    super(MENU_RESTART_TEMPLATE);
    this.hide();
    this.bindButton('.menu-restart-button', () => {
      this.hide();
      this.events.emit(this.events.GAME_RESTART_REQUEST);
    });

    this.bindButton('.menu-start-to-settings-button', () => {
      this.hide();
      this.events.emit(this.events.OPEN_SETTINGS);
    });
  }

  public show(isWin?: boolean): void {
    if (isWin) {
      this.setText('.menu-restart-title', 'ПОБЕДА');
      this.setStyle('.menu-restart', 'backgroundColor', 'green');
    } else {
      this.setText('.menu-restart-title', 'ПОРАЖЕНИЕ');
      this.setStyle('.menu-restart', 'backgroundColor', 'red');
    }
    super.show();
  }
}

export const menuRestartDOM = new MenuRestartDOM();
