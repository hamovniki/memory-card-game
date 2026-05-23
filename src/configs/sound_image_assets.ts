export const SOUND_KEYS = {
  SOUND_ON_ICON: 'sound-on-icon',
  SOUND_OFF_ICON: 'sound-off-icon',
} as const;

export const SOUND_ASSETS = Object.values(SOUND_KEYS).map((key) => {
  const folder = 'sound/';
  const suffix = '.png';
  return {
    assetKey: key,
    path: folder + key + suffix,
  };
});
