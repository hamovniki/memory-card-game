import {gameManager} from '../manager/GameManager';
import {TypedScene} from './utils/TypedScene';
import {GameController, GameSceneView} from '../controllers/GameController';

export class GameScene extends TypedScene implements GameSceneView {
  private _controller: GameController;

  private _startHandler: () => void;

  constructor() {
    super('GameScene');
    this._controller = new GameController(this);

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
      await this._controller.startNewGame();
    }

    this.input.on('gameobjectdown', (_pointer: any, card: any) => {
      this._controller.onCardClick(card);
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
    this._controller.repositionCards();
    this._controller.updateTimerPosition();
  };
}
