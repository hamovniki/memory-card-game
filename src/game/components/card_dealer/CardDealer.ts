import {Utils} from 'phaser';
import {GAME_CONFIG} from '../../../configs/game_config';
import {TypedScene} from '../../scenes/utils/TypedScene';
import {Card, CardPosition} from '../card/Card';

export class CardDealer {
  private _scene: TypedScene;

  constructor(scene: TypedScene) {
    this._scene = scene;
  }

  public createCards() {
    const possibleCardIds: Card['id'][] = ['1', '2', '3', '4', '5'];
    const allCardsIds = Utils.Array.Shuffle([
      ...possibleCardIds,
      ...possibleCardIds,
    ]);

    const cardPositions = this._getCardsPositions();

    allCardsIds.forEach((cardId, index) => {
      const {x, y} = cardPositions[index];

      new Card(this._scene, {position: {x, y}, id: cardId});
    });
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
