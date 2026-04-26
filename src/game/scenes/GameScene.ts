import {Card} from '../components/card/Card';
import {TypedScene} from './utils/TypedScene';

export class GameScene extends TypedScene {
  constructor() {
    super('GameScene');
  }

  create() {
    const card = new Card(this, 250, 500);

    this.input.on('gameobjectdown', this._onCardClick);
  }

  private _onCardClick(_pointer_: unknown, object: Card) {
    console.log('gggg', object);
  }
}
