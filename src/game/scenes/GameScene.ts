import {AUDIO_KEYS} from '../../configs/audio_assets';
import {Card} from '../components/Card';
import {CardDealer} from '../components/CardDealer';
import {Timer} from '../components/Timer';
import {gameManager} from '../manager/GameManager';
import {menuRestartDOM} from '../DOM-elements/menu-restart-element/MenuRestartDOM';
import {menuStartDOM} from '../DOM-elements/menu-start-element/MenuStartDOM';
import {TypedScene} from './utils/TypedScene';

type SceneCreateProps = {
  isRestart?: boolean;
};

export class GameScene extends TypedScene {
  private _cardDealer: CardDealer;

  private _timer: Timer;

  private _isGameOver: boolean;

  constructor() {
    super('GameScene');
  }

  async create({isRestart}: SceneCreateProps) {
    this._isGameOver = false;

    isRestart ? menuStartDOM.hide() : menuStartDOM.show();

    isRestart ? this._onStartGame() : menuStartDOM.runAction();

    this._initEvents();

    this.scale.on('resize', this._onResize, this);
  }

  private _onCardClick = (_pointer_: unknown, card: Card) => {
    if (this._isGameOver) return;
    this._cardDealer.revealCard(card);
  };

  private _initEvents() {
    menuStartDOM.onStartGame = () => this.scene.restart({isRestart: true});
    menuRestartDOM.onRestartGame = this._onRestartGame;
  }

  private _onStartGame = async () => {
    this._setSettings();

    await this._cardDealer.createCards();
    this._timer.start();
    this.input.on('gameobjectdown', this._onCardClick);
  };

  private _setSettings() {
    const {pairsCount, maxTime} =
      gameManager.difficultyManager.getCurrentDifficulty();
    const {width} = this.cameras.main;

    this._cardDealer = new CardDealer(this, pairsCount);

    this._timer = new Timer(this, {
      x: width / 2,
      y: 15,
      maxTime,
    });

    this._cardDealer.onAllCardsRevealed = this._onAllCardsRevealed;
    this._timer.onTimeIsOver = this._onTimeIsOver;
  }

  private _onRestartGame = async () => {
    this.scene.restart({isRestart: true});
  };

  private _onTimeIsOver = () => {
    this.sound.play(AUDIO_KEYS.LOSE);
    menuRestartDOM.show(false);
    this._isGameOver = true;
    this._timer.stop();
  };

  private _onAllCardsRevealed = () => {
    this.sound.play(AUDIO_KEYS.WIN);
    menuRestartDOM.show(true);
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
