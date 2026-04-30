export const AUDIO_KEYS = {
  CARD_REVEAL: 'card-flip',
  CARD_HIDE: 'card-slide',
  MAIN_LOOP: 'fat-caps-audionatix',
  LOSE: 'lose',
  WIN: 'victory',
  CARD_FLY_IN: 'whoosh',
} as const;

export const AUDIO_ASSETS = Object.values(AUDIO_KEYS).map((key) => {
  const folder = 'audio/';
  const suffix = '.mp3';
  return {
    assetKey: key,
    path: folder + key + suffix,
  };
});
