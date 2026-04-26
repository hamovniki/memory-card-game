import {Card} from '../components/card/Card';
import {CardDealer} from '../components/card_dealer/CardDealer';
import {TypedScene} from './utils/TypedScene';

export class GameScene extends TypedScene {
  constructor() {
    super('GameScene');
  }

  create() {
    const cardDealer = new CardDealer(this);
    cardDealer.createCards();
    this.input.on('gameobjectdown', this._onCardClick);
  }

  private _onCardClick(_pointer_: unknown, object: Card) {
    if (object.isRevealed) {
      object.hide();
    } else {
      object.reveal();
    }
  }
}
