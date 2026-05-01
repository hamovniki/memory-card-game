import {Utils} from 'phaser';
import {CardId, Cards} from '../components/Card';
import {CARD_KEYS} from '../../configs/image_assets';

export const getAllCardIds = (): CardId[] => {
  return (Object.values(CARD_KEYS) as Cards[]).filter(
    (key) => key !== 'card-back',
  );
};

export const generateRandomCardSet = (pairsCount: number): CardId[] => {
  const allCards = getAllCardIds();
  if (pairsCount > allCards.length) {
    throw new Error(
      `Not enough unique cards: requested ${pairsCount}, but only ${allCards.length} available.`,
    );
  }
  const shuffledAll = Utils.Array.Shuffle([...allCards]);
  const selected = shuffledAll.slice(0, pairsCount);

  const pairs = Utils.Array.Shuffle([...selected, ...selected]);
  console.log(pairs);
  return pairs;
};
