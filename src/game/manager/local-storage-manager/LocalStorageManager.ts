import {LocalStorageAdapter} from './LocalStorageAdapter';
type Difficulty = 'easy' | 'medium' | 'hard';

const LOCAL_STORAGE_KEYS = {
  difficulty: 'difficulty',
} as const;

export class LocalStorageManager {
  private readonly _storage: LocalStorageAdapter;

  constructor(userId: string) {
    this._storage = new LocalStorageAdapter(userId);
  }

  public setDifficulty(value: Difficulty) {
    this._storage.setItem(LOCAL_STORAGE_KEYS.difficulty, value);
  }

  public getDifficulty(): Difficulty | null {
    const value = this._storage.getItem(LOCAL_STORAGE_KEYS.difficulty);
    return value as Difficulty | null;
  }

  public removeDifficulty() {
    this._storage.removeItem(LOCAL_STORAGE_KEYS.difficulty);
  }
}
