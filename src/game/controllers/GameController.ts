import {AUDIO_KEYS} from '../../configs/audio_assets';
import {CardDealer} from '../components/CardDealer';
import {Timer} from '../components/Timer';
import {menuRestartDOM} from '../DOM-elements/menu-restart-element/MenuRestartDOM';
import {gameManager} from '../manager/GameManager';

export interface GameSceneView {
  playSound(key: string): void;
  get sceneWidth(): number;
}

export class GameController {
  private _cardDealer: CardDealer | null = null;
  private _timer: Timer | null = null;
  private _isGameOver = false;
  private _view: GameSceneView;

  constructor(view: GameSceneView) {
    this._view = view;
  }

  public async startNewGame(): Promise<void> {
    this._isGameOver = false;

    const {pairsCount, maxTime} =
      gameManager.difficultyManager.getCurrentDifficulty();
    const scene = this._view as any;

    this._cardDealer = new CardDealer(scene, pairsCount);
    this._timer = new Timer(scene, {
      x: this._view.sceneWidth / 2,
      y: 15,
      maxTime,
    });

    this._cardDealer.onAllCardsRevealed = () => this._handleWin();
    this._timer.onTimeIsOver = () => this._handleLose();

    await this._cardDealer.createCards();
    this._timer.start();
  }

  public onCardClick(card: any): void {
    if (this._isGameOver) return;
    this._cardDealer?.revealCard(card);
  }

  public restartGame(): void {
    this._isGameOver = false;
  }

  public repositionCards(): void {
    this._cardDealer?.repositionCards();
  }

  public updateTimerPosition(): void {
    this._timer?.updatePosition();
  }

  private _handleWin(): void {
    if (this._isGameOver) return;
    this._isGameOver = true;
    this._view.playSound(AUDIO_KEYS.WIN);
    this._timer?.stop();
    menuRestartDOM.show(true);
  }

  private _handleLose(): void {
    if (this._isGameOver) return;
    this._isGameOver = true;
    this._view.playSound(AUDIO_KEYS.LOSE);
    this._timer?.stop();
    menuRestartDOM.show(false);
  }
}
