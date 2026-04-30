import {GameObjects} from 'phaser';
import {TypedScene} from '../../scenes/utils/TypedScene';

type CardId = '1' | '2' | '3' | '4' | '5';

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

  constructor(scene: TypedScene, props: CardProps) {
    const {id, position} = props;
    super(scene, position.x, position.y, 'card');
    this.id = id;
    scene.add.existing(this);
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
    await this.flip();
    this._isRevealed = true;
  }

  public async hide() {
    await this.flip();
    this._isRevealed = false;
  }

  public flyIn(x: number, y: number) {
    return new Promise((resolve) => {
      this.scene.tweens.add({
        targets: this,
        ease: 'Linear',
        x,
        y,
        duration: 200,
        onComplete: resolve,
      });
    });
  }

  public flip() {
    return new Promise((resolve) => {
      const originalScaleX = this.scaleX;
      const originalScaleY = this.scaleY;

      const show = () => {
        const texture = this._isRevealed ? 'card' : `card${this.id}`;
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
