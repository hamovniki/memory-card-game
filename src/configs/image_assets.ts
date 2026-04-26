export const CARD_KEYS = {
  CARD: 'card',
  CARD_1: 'card1',
  CARD_2: 'card2',
  CARD_3: 'card3',
  CARD_4: 'card4',
  CARD_5: 'card5',
} as const;

export const IMAGE_ASSETS = Object.values(CARD_KEYS).map((key) => {
  const suffix = '.png';
  return {
    assetKey: key,
    path: key + suffix,
  };
});
