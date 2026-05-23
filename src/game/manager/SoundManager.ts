import {AUDIO_KEYS} from '../../configs/audio_assets';
import {LocalStorageManager} from './local-storage-manager/LocalStorageManager';

export class SoundManager {
  private _volume: number = 0.5;
  private _muted: boolean = false;
  private _savedVolume: number = 0.5;
  private _soundManager: Phaser.Sound.BaseSoundManager | null = null;
  private _mainLoopSound: Phaser.Sound.BaseSound | null = null;
  private _storage: LocalStorageManager;

  constructor(storage: LocalStorageManager) {
    this._storage = storage;
    this._loadFromStorage();
  }

  public setSoundManager(soundManager: Phaser.Sound.BaseSoundManager): void {
    this._soundManager = soundManager;
    this._applyVolume();
    this.playMainLoop();
  }

  public setVolume(volume: number): void {
    this._volume = Math.min(1, Math.max(0, volume));
    if (!this._muted) {
      this._applyVolume();
    }
    this._saveToStorage();
  }

  public getVolume(): number {
    return this._volume;
  }

  public toggleMute(): void {
    this._muted = !this._muted;
    if (this._muted) {
      this._savedVolume = this._volume;
      this._applyVolume(0);
      this._applyToMainLoop(0);
    } else {
      this._volume = this._savedVolume;
      this._applyVolume(this._volume);
      this._applyToMainLoop(this._volume);
    }
    this._saveToStorage();
  }

  public isMuted(): boolean {
    return this._muted;
  }

  public playMainLoop(): void {
    if (!this._soundManager) return;
    if (this._mainLoopSound) return;

    this._mainLoopSound = this._soundManager.add(AUDIO_KEYS.MAIN_LOOP, {
      loop: true,
      volume: this._muted ? 0 : this._volume,
    });
    this._mainLoopSound.play();
  }

  private _applyVolume(volume?: number): void {
    if (!this._soundManager) return;
    const vol = volume !== undefined ? volume : this._volume;
    this._soundManager.volume = vol;
  }

  private _applyToMainLoop(volume?: number): void {
    if (!this._mainLoopSound) return;
    const vol = volume !== undefined ? volume : this._muted ? 0 : this._volume;
    (this._mainLoopSound as any).setVolume(vol);
  }

  private _saveToStorage(): void {
    this._storage.setSoundSettings({
      volume: this._volume,
      muted: this._muted,
      savedVolume: this._savedVolume,
    });
  }

  private _loadFromStorage(): void {
    const settings = this._storage.getSoundSettings();
    if (settings) {
      this._volume = settings.volume;
      this._muted = settings.muted;
      this._savedVolume = settings.savedVolume;
    }

    this._volume = Math.min(1, Math.max(0, this._volume));
    this._savedVolume = Math.min(1, Math.max(0, this._savedVolume));
  }
}
