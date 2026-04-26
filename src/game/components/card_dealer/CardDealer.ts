import {Utils} from 'phaser';
import {GAME_CONFIG} from '../../../configs/game_config';
import {TypedScene} from '../../scenes/utils/TypedScene';
import {Card, CardPosition} from '../card/Card';

export class CardDealer {
  private _scene: TypedScene;

  private _prevRevealedCard: Card | null = null;
  private _guessesParis = 0;
  private _possibleCardIds: Card['id'][] = ['1', '2', '3', '4', '5'];
  private _processing = false;

  constructor(scene: TypedScene) {
    this._scene = scene;
  }

  public async revealCard(card: Card) {
    if (card.isRevealed) return;
    if (this._processing) return;
    if (this._prevRevealedCard === card) return;

    if (!this._prevRevealedCard) {
      card.reveal();
      this._prevRevealedCard = card;
      return;
    }

    this._processing = true;

    await card.reveal();

    if (this._prevRevealedCard.id === card.id) {
      this._guessesParis++;
      this._prevRevealedCard = null;
      this._processing = false;
    } else {
      await new Promise<void>((resolve) => setTimeout(resolve, 250));
      await Promise.all([this._prevRevealedCard.hide(), card.hide()]);
      this._prevRevealedCard = null;
      this._processing = false;
    }

    if (this._guessesParis === this._possibleCardIds.length) {
      this.onAllCardsRevealed();
    }
  }

  // паттерн «свойство-метод»
  public onAllCardsRevealed: (...args: any) => void = () => {};

  public async createCards() {
    const allCardsIds = Utils.Array.Shuffle([
      ...this._possibleCardIds,
      ...this._possibleCardIds,
    ]);

    const cardPositions = this._getCardsPositions();
    const cardsIdWithPos = cardPositions.map((position, index) => {
      const id = allCardsIds[index];
      return {
        ...position,
        id,
      };
    });
    for (const cardIdWithPos of cardsIdWithPos) {
      const {x, y, id} = cardIdWithPos;
      const position: CardPosition = {
        x: -200,
        y: -200,
      };
      const card = new Card(this._scene, {position, id});

      await card.flyIn(x, y);
    }
  }

  private _getCardsPositions() {
    const cardsPositions: CardPosition[] = [];

    const sceenWidth = GAME_CONFIG.width;
    const sceenHeight = GAME_CONFIG.height;

    const cardTexture = this._scene.textures.get('card').getSourceImage();

    const cardWidth = cardTexture.width;
    const cardHeight = cardTexture.height;

    const cardMargin = 4;

    const cols = 5;
    const rows = 2;

    const marginLeft = (sceenWidth - cardWidth * cols) / 2 + cardWidth / 2;
    const marginTop = (sceenHeight - cardHeight * rows) / 2 + cardHeight / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = marginLeft + col * (cardWidth + cardMargin);
        const y = marginTop + row * (cardHeight + cardMargin);
        cardsPositions.push({x, y});
      }
    }

    return cardsPositions;
  }
}
