import {TypedScene} from '../scenes/utils/TypedScene';
import {Card, CardPosition} from './Card';
import {CARD_KEYS} from '../../configs/image_assets';
import {generateRandomCardSet} from '../utils/card_set_generator';

export class CardDealer {
  private _scene: TypedScene;
  private _cards: Card[] = [];
  private _currentScale = 1;

  private _pairsCount: number;

  constructor(scene: TypedScene, pairsCount: number = 5) {
    this._scene = scene;
    this._pairsCount = pairsCount;
  }

  public async createCards() {
    this._cards.forEach((card) => card.destroy());
    this._cards = [];

    const allCardsIds = generateRandomCardSet(this._pairsCount);
    const {positions, scale} = this._getGridParameters();
    this._currentScale = scale;

    const cardsIdWithPos = positions.map((position, index) => ({
      ...position,
      id: allCardsIds[index],
    }));

    for (const cardIdWithPos of cardsIdWithPos) {
      const {x, y, id} = cardIdWithPos;
      const startPos: CardPosition = {x: -200, y: -200};
      const card = new Card(this._scene, {position: startPos, id});
      card.setScale(this._currentScale);
      await card.flyIn(x, y);
      this._cards.push(card);
    }
  }

  public async repositionCards() {
    const {positions, scale} = this._getGridParameters();
    this._currentScale = scale;

    for (let i = 0; i < this._cards.length; i++) {
      const card = this._cards[i];
      card.setScale(this._currentScale);
      await card.moveTo(positions[i].x, positions[i].y);
    }
  }

  public async revealCard(card: Card) {
    if (!card.isRevealed) {
      await card.reveal();
    }
  }

  private _getGridParameters() {
    const {width, height} = this._scene.cameras.main;
    const totalCards = this._pairsCount * 2;

    const originalTexture = this._scene.textures
      .get(CARD_KEYS.CARD_BACK)
      .getSourceImage();
    const originalCardWidth = originalTexture.width;
    const originalCardHeight = originalTexture.height;

    let cols = Math.floor(Math.sqrt(totalCards * (width / height)));
    cols = Math.min(6, Math.max(2, cols));
    let rows = Math.ceil(totalCards / cols);

    const maxRows = 6;
    if (rows > maxRows) {
      cols = Math.ceil(totalCards / maxRows);
      rows = maxRows;
    }

    const horizontalPadding = 16;
    const verticalPadding = 48;
    const cardMargin = 4;

    const availableWidth = width - horizontalPadding * 2;
    const availableHeight = height - verticalPadding * 2;

    const neededCardWidth = (availableWidth - (cols - 1) * cardMargin) / cols;
    const neededCardHeight = (availableHeight - (rows - 1) * cardMargin) / rows;

    const scaleX = neededCardWidth / originalCardWidth;
    const scaleY = neededCardHeight / originalCardHeight;
    const scale = Math.min(scaleX, scaleY);

    const cardWidth = originalCardWidth * scale;
    const cardHeight = originalCardHeight * scale;

    const totalGridWidth = cols * cardWidth + (cols - 1) * cardMargin;
    const totalGridHeight = rows * cardHeight + (rows - 1) * cardMargin;
    const startX = (width - totalGridWidth) / 2 + cardWidth / 2;
    const startY = (height - totalGridHeight) / 2 + cardHeight / 2;

    const positions: CardPosition[] = [];
    for (let row = 0; row < rows && positions.length < totalCards; row++) {
      for (let col = 0; col < cols && positions.length < totalCards; col++) {
        const x = startX + col * (cardWidth + cardMargin);
        const y = startY + row * (cardHeight + cardMargin);
        positions.push({x, y});
      }
    }

    return {positions, scale};
  }
}
