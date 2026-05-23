import {LocalStorageAdapter} from './LocalStorageAdapter';
type Difficulty = 'easy' | 'medium' | 'hard';

export type SoundSettings = {
  volume: number;
  muted: boolean;
  savedVolume: number;
};

const LOCAL_STORAGE_KEYS = {
  difficulty: 'difficulty',
  sound: 'sound',
} as const;

export class LocalStorageManager {
  private readonly _storage: LocalStorageAdapter;

  constructor(userId: string) {
    this._storage = new LocalStorageAdapter(userId);
  }

  /** Difficulty */
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

  /** Sound */
  public setSoundSettings(settings: SoundSettings): void {
    this._storage.setItem(LOCAL_STORAGE_KEYS.sound, JSON.stringify(settings));
  }

  public getSoundSettings(): SoundSettings | null {
    const raw = this._storage.getItem(LOCAL_STORAGE_KEYS.sound);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SoundSettings;
    } catch {
      return null;
    }
  }
}
