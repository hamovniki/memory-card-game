import {Card} from '../../components/Card';
import {GameState} from './base/GameState';
import {CheckingState} from './CheckingState';

export class FirstCardRevealedState extends GameState {
  public async onCardClick(card: Card): Promise<void> {
    const firstCard = this.context.getFirstCard();

    if (card === firstCard) {
      return;
    }

    if (card.isRevealed) {
      return;
    }

    if (firstCard) {
      const state = new CheckingState(this.context, firstCard, card);
      this.context.setState(state);
    }

    await card.reveal();
  }
}
