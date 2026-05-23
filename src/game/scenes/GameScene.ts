import {gameManager} from '../manager/GameManager';
import {TypedScene} from './utils/TypedScene';
import {GameStateContext} from '../states/game-state/context/GameStateContext';
import {Card} from '../components/Card';
import {SOUND_KEYS} from '../../configs/sound_image_assets';

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
    this._createSoundIcon();
    if (isRestart) {
      await this._gameStateContext.startNewGame();
    }

    this.input.on('gameobjectdown', (_pointer: any, card: Card) => {
      if (!card.id) return;
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

  private _createSoundIcon(): void {
    const iconX = 40;
    const iconY = 40;
    const icon = this.add
      .image(iconX, iconY, '')
      .setInteractive()
      .setScale(0.1)
      .setDepth(100);
    icon.on('pointerdown', () => {
      gameManager.soundManager.toggleMute();
      this._updateSoundIcon(icon);
    });
    this._updateSoundIcon(icon);
    this.scale.on('resize', () => {
      icon.setPosition(iconX, iconY);
    });
  }

  private _updateSoundIcon(icon: Phaser.GameObjects.Image): void {
    const muted = gameManager.soundManager.isMuted();
    icon.setTexture(
      muted ? SOUND_KEYS.SOUND_OFF_ICON : SOUND_KEYS.SOUND_ON_ICON,
    );
  }
}
