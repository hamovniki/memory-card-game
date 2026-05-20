import {AUDIO_KEYS} from '../../configs/audio_assets';
import {CardDealer} from '../components/CardDealer';
import {Timer} from '../components/Timer';
import {gameManager} from '../manager/GameManager';

export interface GameSceneView {
  playSound(key: string): void;
  get sceneWidth(): number;
}

export class GameController {
  private _cardDealer: CardDealer | null = null;
  private _timer: Timer | null = null;
  private _view: GameSceneView;

  constructor(view: GameSceneView) {
    this._view = view;
  }

  public async startNewGame(): Promise<void> {
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
    if (!this._timer?.isTimerActive) return;
    this._cardDealer?.revealCard(card);
  }

  public repositionCards(): void {
    this._cardDealer?.repositionCards();
  }

  public updateTimerPosition(): void {
    this._timer?.updatePosition();
  }

  private _handleWin(): void {
    this._view.playSound(AUDIO_KEYS.WIN);
    this._timer?.stop();
    gameManager.events.emit(gameManager.events.GAME_OVER_WIN);
  }

  private _handleLose(): void {
    this._view.playSound(AUDIO_KEYS.LOSE);
    this._timer?.stop();
    gameManager.events.emit(gameManager.events.GAME_OVER_LOSE);
  }
}
