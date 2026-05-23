import {Card} from '../../components/Card';
import {IdleState} from './IdleState';
import {GameOverState} from './GameOverState';
import {GameState} from './base/GameState';
import {GameStateContext} from './context/GameStateContext';

export class CheckingState extends GameState {
  private _firstCard: Card | null = null;
  private _secondCard: Card | null = null;

  constructor(context: GameStateContext, firstCard: Card, secondCard: Card) {
    super(context);
    this._firstCard = firstCard;
    this._secondCard = secondCard;
  }

  public async onEnter(): Promise<void> {
    const isMatch = this._firstCard?.id === this._secondCard?.id;
    if (isMatch) {
      this.context.incrementMatches();
      this.context.setFirstCard(null);
      if (this.context.isGameComplete()) {
        const state = new GameOverState(this.context, true);
        this.context.setState(state);
      } else {
        const state = new IdleState(this.context);
        this.context.setState(state);
      }
    } else {
      await new Promise<void>((resolve) => setTimeout(resolve, 350));
      await Promise.all([this._firstCard?.hide(), this._secondCard?.hide()]);
      this.context.setFirstCard(null);
      const state = new IdleState(this.context);
      this.context.setState(state);
    }
  }

  public onExit(): void {
    this._firstCard = null;
    this._secondCard = null;
  }

  public onCardClick(): void {
    return;
  }
}
