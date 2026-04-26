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

  public reveal() {
    this._isRevealed = true;
    this.setTexture('card' + this.id);
  }

  public hide() {
    this._isRevealed = false;
    this.setTexture('card');
  }
}
