import {Card} from '../../components/Card';
import {GameState} from './base/GameState';
import {FirstCardRevealedState} from './FirstCardRevealedState';

export class IdleState extends GameState {
  public onEnter(): void {
    this.context.setFirstCard(null);
  }

  public async onCardClick(card: Card): Promise<void> {
    if (card.isRevealed) {
      return;
    }
    this.context.setFirstCard(card);
    const state = new FirstCardRevealedState(this.context);
    this.context.setState(state);
    await card.reveal();
  }
}
