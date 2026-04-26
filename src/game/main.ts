import {AUTO, Game} from 'phaser';
import {Preloader} from './scenes/Preloader';
import {GameScene} from './scenes/GameScene';
import {GAME_CONFIG} from '../configs/game_config';

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: GAME_CONFIG.width,
  height: GAME_CONFIG.height,
  parent: GAME_CONFIG.parent,
  backgroundColor: GAME_CONFIG.backgroundColor,
  scene: [Preloader, GameScene],
};

export const StartGame = (parent: string) => {
  return new Game({...config, parent});
};
