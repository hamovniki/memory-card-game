import {AUDIO_KEYS} from '../../configs/audio_assets';
import {Card} from '../components/Card';
import {CardDealer} from '../components/CardDealer';
import {Timer} from '../components/Timer';
import {gameManager} from '../manager/GameManager';
import {MemoDOM} from '../ui/MemoDOM';
import {TypedScene} from './utils/TypedScene';

type SceneCreateProps = {
  isRestart?: boolean;
};

export class GameScene extends TypedScene {
  private _cardDealer: CardDealer;

  private _menuDOM: MemoDOM;

  private _timer: Timer;

  private _isGameOver: boolean;

  private _onStartGame = async () => {
    await this._cardDealer.createCards();
    this._timer.start();
    this.input.on('gameobjectdown', this._onCardClick);
  };

  private _onRestartGame = async () => {
    this.scene.restart({isRestart: true});
  };

  constructor() {
    super('GameScene');
  }

  async create({isRestart}: SceneCreateProps) {
    const {pairsCount, maxTime} =
      gameManager.difficultyManager.getCurrentDifficulty();
    const {width} = this.cameras.main;
    this._isGameOver = false;
    this._cardDealer = new CardDealer(this, pairsCount);

    this._menuDOM = new MemoDOM();

    this._timer = new Timer(this, {
      x: width / 2,
      y: 15,
      maxTime,
    });

    isRestart ? this._onStartGame() : this._menuDOM.render({type: 'start'});

    this._initEvents();

    this.scale.on('resize', this._onResize, this);
  }

  private _onCardClick = (_pointer_: unknown, card: Card) => {
    if (this._isGameOver) return;
    this._cardDealer.revealCard(card);
  };

  private _initEvents() {
    this._menuDOM.onStartGame = this._onStartGame;
    this._menuDOM.onRestartGame = this._onRestartGame;
    this._cardDealer.onAllCardsRevealed = this._onAllCardsRevealed;
    this._timer.onTimeIsOver = this._onTimeIsOver;
  }

  private _onTimeIsOver = () => {
    this.sound.play(AUDIO_KEYS.LOSE);
    this._menuDOM.render({type: 'end', isWin: false});
    this._isGameOver = true;
  };

  private _onAllCardsRevealed = () => {
    this.sound.play(AUDIO_KEYS.WIN);
    this._menuDOM.render({type: 'end', isWin: true});
    this._timer.stop();
    this._isGameOver = true;
  };

  private _onResize = () => {
    if (this._cardDealer) {
      this._cardDealer.repositionCards();
    }
    if (this._timer) {
      this._timer.updatePosition();
    }
  };
}
