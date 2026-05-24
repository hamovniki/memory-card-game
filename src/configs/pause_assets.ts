export const PAUSE_KEYS = {
  PAUSE: 'pause',
  RESUME: 'resume',
} as const;

export const PAUSE_ASSETS = Object.values(PAUSE_KEYS).map((key) => {
  const folder = 'pause/';
  const suffix = '.png';
  return {
    assetKey: key,
    path: folder + key + suffix,
  };
});
