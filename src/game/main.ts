import {AUTO, Game, Scale} from 'phaser';
import {Preloader} from './scenes/Preloader';
import {GameScene} from './scenes/GameScene';
import {GAME_CONFIG} from '../configs/game_config';
import {Boot} from './scenes/Boot';
import {DOMEventsMediator} from './DOM-elements/DOMEventsMediator';

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: GAME_CONFIG.width,
  height: GAME_CONFIG.height,
  parent: GAME_CONFIG.parent,
  backgroundColor: GAME_CONFIG.backgroundColor,
  scene: [Boot, Preloader, GameScene],
  scale: {
    mode: Scale.RESIZE,
    autoCenter: Scale.CENTER_BOTH,
    width: '100%',
    height: '100%',
  },
};

export const StartGame = (parent: string) => {
  new DOMEventsMediator();
  return new Game({...config, parent});
};
