import {DifficultyManager} from './DifficultyManager';

class GameManager {
  private _difficultyManager: DifficultyManager;

  constructor() {
    this._difficultyManager = new DifficultyManager();
  }

  get difficultyManager() {
    return this._difficultyManager;
  }
}

export const gameManager = new GameManager();
