import {IMAGE_ASSETS} from '../../configs/image_assets';
import {TypedScene} from './utils/TypedScene';

export class Preloader extends TypedScene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.add.image(512, 384, 'background');
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
    this.load.on('progress', (progress: number) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.setPath('assets');
    IMAGE_ASSETS.forEach((asset) =>
      this.load.image(asset.assetKey, asset.path),
    );
  }

  create() {
    this.scene.start('GameScene', {isRestart: true});
  }
}
