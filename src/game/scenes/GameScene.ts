import {Card} from '../components/card/Card';
import {CardDealer} from '../components/card_dealer/CardDealer';
import {TypedScene} from './utils/TypedScene';

export class GameScene extends TypedScene {
  private _cardDealer: CardDealer;

  constructor() {
    super('GameScene');
  }

  async create() {
    this._cardDealer = new CardDealer(this);
    await this._cardDealer.createCards();

    this._initEvents();
  }

  private _onCardClick = (_pointer_: unknown, card: Card) => {
    this._cardDealer.revealCard(card);
  };

  private _initEvents() {
    this._cardDealer.onAllCardsRevealed = this._onAllCardsRevealed;
    this.input.on('gameobjectdown', this._onCardClick);
  }

  private _onAllCardsRevealed = () => {
    this.scene.restart();
  };
}
