import {Card} from '../../../components/Card';
import {CardDealer} from '../../../components/CardDealer';
import {Timer} from '../../../components/Timer';
import {gameManager} from '../../../manager/GameManager';
import {GameSceneView} from '../../../scenes/GameScene';
import {GameState} from '../base/GameState';

import {GameOverState} from '../GameOverState';
import {IdleState} from '../IdleState';

export class GameStateContext {
  private _gameSceneView: GameSceneView;
  private _cardDealer: CardDealer | null = null;
  private _timer: Timer | null = null;
  private _pairsCount: number = 0;
  private _matchedPairs: number = 0;
  private _firstCard: Card | null = null;
  private _currentState: GameState | null = null;

  constructor(gameSceneView: GameSceneView) {
    this._gameSceneView = gameSceneView;
  }

  public async startNewGame(): Promise<void> {
    const {pairsCount, maxTime} =
      gameManager.difficultyManager.getCurrentDifficulty();

    this._pairsCount = pairsCount;
    this._matchedPairs = 0;
    this._firstCard = null;

    const scene = this._gameSceneView;

    this._cardDealer = new CardDealer(scene, pairsCount);
    this._timer = new Timer(scene, {
      x: scene.sceneWidth / 2,
      y: 15,
      maxTime,
    });

    this._timer.onTimeIsOver = () => this._handleLose();

    await this._cardDealer.createCards();
    this._timer.start();
    const state = new IdleState(this);
    this.setState(state);
  }

  public setState(state: GameState): void {
    if (this._currentState) {
      this._currentState.onExit();
    }
    this._currentState = state;
    this._currentState.onEnter();
  }

  public onCardClick(card: Card): void {
    if (!this._timer?.isTimerActive) return;
    this._currentState?.onCardClick(card);
  }

  public getFirstCard() {
    return this._firstCard;
  }

  public setFirstCard(card: Card | null) {
    this._firstCard = card;
  }

  public incrementMatches(): void {
    this._matchedPairs++;
  }

  public isGameComplete(): boolean {
    return this._matchedPairs === this._pairsCount;
  }

  public stopTimer(): void {
    this._timer?.stop();
  }

  public getScene() {
    return this._gameSceneView;
  }

  public repositionCards(): void {
    this._cardDealer?.repositionCards();
  }

  public updateTimerPosition(): void {
    this._timer?.updatePosition();
  }

  private _handleLose(): void {
    const state = new GameOverState(this, false);
    this.setState(state);
  }
}
