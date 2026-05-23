import {gameManager} from '../manager/GameManager';
import {TypedScene} from './utils/TypedScene';
import {GameStateContext} from '../states/game-state/context/GameStateContext';

export interface GameSceneView extends TypedScene {
  playSound(key: string): void;
  get sceneWidth(): number;
}

export class GameScene extends TypedScene implements GameSceneView {
  private _gameStateContext: GameStateContext;

  private _startHandler: () => void;

  constructor() {
    super('GameScene');
    this._gameStateContext = new GameStateContext(this);

    this._startHandler = () => {
      this.scene.restart({isRestart: true});
    };

    gameManager.events.on(
      gameManager.events.GAME_START_REQUEST,
      this._startHandler,
    );
  }

  async create({isRestart}: {isRestart?: boolean}) {
    if (isRestart) {
      await this._gameStateContext.startNewGame();
    }

    this.input.on('gameobjectdown', (_pointer: any, card: any) => {
      this._gameStateContext.onCardClick(card);
    });

    this.scale.on('resize', this._onResize, this);
  }

  public playSound(key: string): void {
    this.sound.play(key);
  }

  get sceneWidth(): number {
    return this.cameras.main.width;
  }

  private _onResize = () => {
    this._gameStateContext.repositionCards();
    this._gameStateContext.updateTimerPosition();
  };
}
