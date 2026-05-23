import {AUDIO_KEYS} from '../../../configs/audio_assets';
import {GameStateContext} from './context/GameStateContext';
import {gameManager} from '../../manager/GameManager';
import {GameState} from './base/GameState';

export class GameOverState extends GameState {
  private isWin: boolean;

  constructor(controller: GameStateContext, isWin: boolean) {
    super(controller);
    this.isWin = isWin;
  }

  public onEnter(): void {
    this.context.stopTimer();

    const soundKey = this.isWin ? AUDIO_KEYS.WIN : AUDIO_KEYS.LOSE;
    this.context.getScene().playSound(soundKey);

    const event = this.isWin
      ? gameManager.events.GAME_OVER_WIN
      : gameManager.events.GAME_OVER_LOSE;
    gameManager.events.emit(event);
  }

  public onCardClick(): void {
    return;
  }
}
