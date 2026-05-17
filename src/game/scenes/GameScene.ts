import {gameManager} from '../manager/GameManager';
import {menuRestartDOM} from '../DOM-elements/menu-restart-element/MenuRestartDOM';
import {menuStartDOM} from '../DOM-elements/menu-start-element/MenuStartDOM';
import {TypedScene} from './utils/TypedScene';
import {menuSettingsDOM} from '../DOM-elements/menu-settings-element/MenuSettingsDOM';
import {GameController, GameSceneView} from '../controllers/GameController';

export class GameScene extends TypedScene implements GameSceneView {
  private _controller: GameController;

  constructor() {
    super('GameScene');
    this._controller = new GameController(this);
  }

  async create({isRestart}: {isRestart?: boolean}) {
    this._setupUIEvents();

    if (isRestart) {
      menuStartDOM.hide();
      await this._controller.startNewGame();
    } else {
      menuStartDOM.show();
    }

    this.input.on('gameobjectdown', (_pointer: any, card: any) => {
      this._controller.onCardClick(card);
    });

    this.scale.on('resize', this._onResize, this);
  }

  private _setupUIEvents(): void {
    menuStartDOM.onStartGame = async () => {
      menuStartDOM.hide();
      this.scene.restart({isRestart: true});
    };
    menuStartDOM.onOpenSettings = () => {
      menuSettingsDOM.setCurrentDifficulty(
        gameManager.difficultyManager.currentDifficulty,
      );
      menuSettingsDOM.show();
    };
    menuRestartDOM.onRestartGame = () => {
      this._controller.restartGame();
      this.scene.restart({isRestart: true});
    };
    menuRestartDOM.onOpenSettings = () => {
      menuSettingsDOM.setCurrentDifficulty(
        gameManager.difficultyManager.currentDifficulty,
      );
      menuSettingsDOM.show();
    };
    menuSettingsDOM.onBackToMenu = () => {
      menuStartDOM.show();
      const newDifficulty = menuSettingsDOM.getCurrentDifficulty();
      if (newDifficulty) {
        gameManager.difficultyManager.changeCurrentDifficulty(newDifficulty);
      }
    };
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
