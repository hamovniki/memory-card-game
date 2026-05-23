import {Card} from '../../../components/Card';
import {GameStateContext} from '../context/GameStateContext';

export abstract class GameState {
  protected context: GameStateContext;

  constructor(context: GameStateContext) {
    this.context = context;
  }

  public onEnter(): void {}
  public onExit(): void {}
  public abstract onCardClick(card: Card): void;
}
