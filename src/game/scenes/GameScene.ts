import {TypedScene} from './utils/TypedScene';

export class GameScene extends TypedScene {
  constructor() {
    super('GameScene');
  }

  create() {
    console.log('GAME SCENE');
  }
}
