import {AUDIO_ASSETS} from '../../configs/audio_assets';
import {IMAGE_ASSETS} from '../../configs/image_assets';
import {TypedScene} from './utils/TypedScene';

export class Preloader extends TypedScene {
  constructor() {
    super('Preloader');
  }

  init() {
    const {width, height} = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;

    const bg = this.add.image(centerX, centerY, 'bg');
    bg.setDisplaySize(width, height);

    const barWidth = 468;
    const barHeight = 32;
    this.add
      .rectangle(centerX, centerY, barWidth, barHeight)
      .setStrokeStyle(1, 0xffffff);

    const bar = this.add.rectangle(
      centerX - barWidth / 2,
      centerY,
      4,
      barHeight - 4,
      0xffffff,
    );
    this.load.on('progress', (progress: number) => {
      bar.width = 4 + (barWidth - 8) * progress;
    });
  }

  preload() {
    this.load.setPath('assets');
    IMAGE_ASSETS.forEach((asset) =>
      this.load.image(asset.assetKey, asset.path),
    );
    AUDIO_ASSETS.forEach((audio) =>
      this.load.audio(audio.assetKey, audio.path),
    );
  }

  create() {
    this.scene.start('GameScene', {isRestart: true});
  }
}
