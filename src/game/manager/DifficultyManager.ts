import {LocalStorageManager} from './local-storage-manager/LocalStorageManager';

export type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultyParams {
  maxTime: number;
  pairsCount: number;
}

interface DifficultyLevels extends Record<Difficulty, DifficultyParams> {}

const BASE_DIFFICULTY: Difficulty = 'easy';

export class DifficultyManager {
  private _difficultyLevels: DifficultyLevels;

  private _current: Difficulty;

  private _storage: LocalStorageManager;

  constructor(storage: LocalStorageManager) {
    this._difficultyLevels = this._createLevels();

    this._storage = storage;

    const saved = this._storage.getDifficulty();

    this._current = saved ?? BASE_DIFFICULTY;
  }

  get currentDifficulty() {
    return this._current;
  }

  public getCurrentDifficulty() {
    const difficulty = this._difficultyLevels[this._current];
    return difficulty;
  }

  public changeCurrentDifficulty(value: Difficulty) {
    const newDifficulty = this._difficultyLevels[value];

    this._current = value;
    this._storage.setDifficulty(value);
    return newDifficulty;
  }

  private _createLevels(): DifficultyLevels {
    const isDev = import.meta.env.VITE_DEV_DIFFICULTY === 'true';

    const easy: DifficultyParams = {
      maxTime: isDev ? 10 : 60,
      pairsCount: isDev ? 1 : 5,
    };

    const medium: DifficultyParams = {
      maxTime: isDev ? 10 : 45,
      pairsCount: isDev ? 2 : 8,
    };

    const hard: DifficultyParams = {
      maxTime: isDev ? 10 : 60,
      pairsCount: isDev ? 3 : 12,
    };

    const levels: DifficultyLevels = {
      easy,
      medium,
      hard,
    };

    return levels;
  }
}
