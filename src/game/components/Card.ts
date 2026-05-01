import {GameObjects} from 'phaser';
import {TypedScene} from '../scenes/utils/TypedScene';
import {AUDIO_KEYS} from '../../configs/audio_assets';
import {CARD_KEYS} from '../../configs/image_assets';
export type Cards = (typeof CARD_KEYS)[keyof typeof CARD_KEYS];
export type CardId = Exclude<Cards, 'card-back'>;

export type CardPosition = {
  x: number;
  y: number;
};

interface CardProps {
  id: CardId;
  position: CardPosition;
}

export class Card extends GameObjects.Sprite {
  public readonly id: CardId;

  private _isRevealed: boolean = false;
  private _scene: TypedScene;

  constructor(scene: TypedScene, props: CardProps) {
    const {id, position} = props;
    super(scene, position.x, position.y, CARD_KEYS.CARD_BACK);
    this.id = id;
    this._scene = scene;
    this._scene.add.existing(this);
    this.setInteractive();
  }

  get isRevealed() {
    return this._isRevealed;
  }

  public moveTo(x: number, y: number) {
    return new Promise((resolve) => {
      this.scene.tweens.add({
        targets: this,
        x,
        y,
        duration: 50,
        onComplete: resolve,
      });
    });
  }

  public async reveal() {
    this._scene.sound.play(AUDIO_KEYS.CARD_REVEAL, {volume: 0.25});
    await this.flip();
    this._isRevealed = true;
  }

  public async hide() {
    this._scene.sound.play(AUDIO_KEYS.CARD_HIDE, {volume: 0.5});
    await this.flip();
    this._isRevealed = false;
  }

  public flyIn(x: number, y: number) {
    this._scene.sound.play(AUDIO_KEYS.CARD_FLY_IN, {volume: 0.2});
    return new Promise((resolve) => {
      this.scene.tweens.add({
        targets: this,
        ease: 'Linear',
        x,
        y,
        duration: 100,
        onComplete: resolve,
      });
    });
  }

  public flip() {
    return new Promise((resolve) => {
      const originalScaleX = this.scaleX;
      const originalScaleY = this.scaleY;

      const show = () => {
        const texture = this._isRevealed ? CARD_KEYS.CARD_BACK : this.id;
        this.setTexture(texture);
        this.scene.tweens.add({
          targets: this,
          scaleX: originalScaleX,
          scaleY: originalScaleY,
          ease: 'Linear',
          duration: 100,
          onComplete: resolve,
        });
      };

      this.scene.tweens.add({
        targets: this,
        scaleX: 0,
        ease: 'Linear',
        duration: 100,
        onComplete: show,
      });
    });
  }
}
