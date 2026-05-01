const CARD_VALUES = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
  'ace',
] as const;

const CARD_SUITS = ['clubs', 'diamonds', 'hearts', 'spades'] as const;

const CARD_NAME_CONNECTOR = '_of_' as const;

type CardNames =
  `${(typeof CARD_VALUES)[number]}${typeof CARD_NAME_CONNECTOR}${(typeof CARD_SUITS)[number]}`;

const generateCardKeys = (): Record<CardNames, CardNames> => {
  const cardKeys: Record<any, any> = {};

  for (const value of CARD_VALUES) {
    for (const suit of CARD_SUITS) {
      const key = value + CARD_NAME_CONNECTOR + suit;
      cardKeys[key.toUpperCase()] = key;
    }
  }

  return cardKeys;
};

export const CARD_KEYS = {
  ...generateCardKeys(),
  CARD_BACK: 'card-back',
  JOKER_RED: 'joker_red',
  JOKER_BLACK: 'joker_black',
} as const;

export const IMAGE_ASSETS = Object.values(CARD_KEYS).map((key) => {
  const suffix = '.png';
  return {
    assetKey: key,
    path: key + suffix,
  };
});
