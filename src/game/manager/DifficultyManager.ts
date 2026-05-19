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
    const easy: DifficultyParams = {
      maxTime: 10,
      pairsCount: 1,
    };

    const medium: DifficultyParams = {
      maxTime: 10,
      pairsCount: 2,
    };

    const hard: DifficultyParams = {
      maxTime: 10,
      pairsCount: 3,
    };

    const levels: DifficultyLevels = {
      easy,
      medium,
      hard,
    };

    return levels;
  }
}
