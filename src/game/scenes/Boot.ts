import {TypedScene} from './utils/TypedScene';

export class Boot extends TypedScene {
  constructor() {
    super('Boot');
  }

  init() {}

  preload() {
    this.load.setPath('assets');
    this.load.image('bg', 'bg.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
