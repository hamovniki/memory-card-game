import {GameObjects} from 'phaser';
import {TypedScene} from '../../scenes/utils/TypedScene';

export class Card extends GameObjects.Sprite {
  constructor(scene: TypedScene, x: number, y: number) {
    super(scene, x, y, 'card');
    scene.add.existing(this);

    this.setInteractive();
  }
}
