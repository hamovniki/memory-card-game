export type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultyParams {
  maxTime: number;
  pairsCount: number;
}

interface DifficultyLevels extends Record<Difficulty, DifficultyParams> {}

const BASE_DIFFICULTY: Difficulty = 'easy';

export class DifficultyManager {
  private _difficultyLevels: DifficultyLevels;

  private _currentDifficulty: Difficulty;

  constructor() {
    this._difficultyLevels = this._createDifficultyLevels();

    this._currentDifficulty = BASE_DIFFICULTY;
  }

  get currentDifficulty() {
    return this._currentDifficulty;
  }

  public getCurrentDifficulty() {
    const difficulty = this._difficultyLevels[this._currentDifficulty];
    return difficulty;
  }

  public changeDifficulty(value: Difficulty) {
    const newDifficulty = this._difficultyLevels[value];

    this._currentDifficulty = value;

    return newDifficulty;
  }

  private _createDifficultyLevels(): DifficultyLevels {
    const easy: DifficultyParams = {
      maxTime: 60,
      pairsCount: 1,
    };

    const medium: DifficultyParams = {
      maxTime: 45,
      pairsCount: 2,
    };

    const hard: DifficultyParams = {
      maxTime: 60,
      pairsCount: 12,
    };

    const levels: DifficultyLevels = {
      easy,
      medium,
      hard,
    };

    return levels;
  }
}
