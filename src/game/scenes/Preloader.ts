import {AUDIO_ASSETS} from '../../configs/audio_assets';
import {IMAGE_ASSETS} from '../../configs/image_assets';
import {PAUSE_ASSETS} from '../../configs/pause_assets';
import {SOUND_ASSETS} from '../../configs/sound_image_assets';
import {gameManager} from '../manager/GameManager';
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
    const deskBarWidth = 468;
    const mobileBarWidth = width / 2;
    const barWidth = width > 494 ? deskBarWidth : mobileBarWidth;
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
    SOUND_ASSETS.forEach((sound) =>
      this.load.image(sound.assetKey, sound.path),
    );
    PAUSE_ASSETS.forEach((asset) =>
      this.load.image(asset.assetKey, asset.path),
    );
  }

  create() {
    gameManager.events.emit(gameManager.events.GAME_PRELOAD);
    gameManager.soundManager.setSoundManager(this.sound);
    this.scene.start('GameScene', {isRestart: false});
  }
}
