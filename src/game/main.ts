import {AUTO, Game} from 'phaser';
import {Preloader} from './scenes/Preloader';
import {GameScene} from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scene: [Preloader, GameScene],
};

export const StartGame = (parent: string) => {
  return new Game({...config, parent});
};
