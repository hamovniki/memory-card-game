import {DifficultyManager} from './DifficultyManager';
import {EventsManager} from './EventsManager';
import {LocalStorageManager} from './local-storage-manager/LocalStorageManager';

const getUserId = () => '0101'; // random number in future like uuid()

class GameManager {
  public readonly difficultyManager: DifficultyManager;

  public readonly localStorageManager: LocalStorageManager;

  public readonly events: EventsManager;

  constructor() {
    const userId = getUserId();

    this.localStorageManager = new LocalStorageManager(userId);

    this.difficultyManager = new DifficultyManager(this.localStorageManager);

    this.events = new EventsManager();
  }
}

export const gameManager = new GameManager();
