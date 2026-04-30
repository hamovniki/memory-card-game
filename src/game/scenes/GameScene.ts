import {Card} from '../components/card/Card';
import {CardDealer} from '../components/card_dealer/CardDealer';
import {MemoDOM} from '../ui/MemoDOM';
import {TypedScene} from './utils/TypedScene';

type SceneCreateProps = {
  isRestart?: boolean;
};

export class GameScene extends TypedScene {
  private _cardDealer: CardDealer;

  private _menuDOM: MemoDOM;

  private _onStartGame = async () => {
    await this._cardDealer.createCards();
    this.input.on('gameobjectdown', this._onCardClick);
  };

  private _onRestartGame = async () => {
    this.scene.restart({isRestart: true});
  };

  constructor() {
    super('GameScene');
  }

  async create({isRestart}: SceneCreateProps) {
    this._cardDealer = new CardDealer(this);

    this._menuDOM = new MemoDOM();
    isRestart ? this._onStartGame() : this._menuDOM.render({type: 'start'});

    this._initEvents();

    this.scale.on('resize', this._onResize, this);
  }

  private _onCardClick = (_pointer_: unknown, card: Card) => {
    this._cardDealer.revealCard(card);
  };

  private _initEvents() {
    this._menuDOM.onStartGame = this._onStartGame;
    this._menuDOM.onRestartGame = this._onRestartGame;
    this._cardDealer.onAllCardsRevealed = this._onAllCardsRevealed;
  }

  private _onAllCardsRevealed = () => {
    this._menuDOM.render({type: 'end', isWin: true});
  };

  private _onResize = () => {
    if (this._cardDealer) {
      this._cardDealer.repositionCards();
    }
  };
}
