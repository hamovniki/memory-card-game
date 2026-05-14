import {DifficultyManager} from './DifficultyManager';

class GameManager {
  public readonly difficultyManager: DifficultyManager;

  constructor() {
    this.difficultyManager = new DifficultyManager();
  }
}

export const gameManager = new GameManager();
