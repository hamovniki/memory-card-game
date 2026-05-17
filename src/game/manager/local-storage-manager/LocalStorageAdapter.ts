export class LocalStorageAdapter {
  private readonly _userId: string;

  constructor(userId: string) {
    this._userId = userId;
  }

  public setItem(key: string, value: string) {
    try {
      const uniqueKey = this._getUserKey(key);
      localStorage.setItem(uniqueKey, value);
    } catch (error) {
      console.error(`LocalStorage failed to save ${key}`, error);
    }
  }

  public getItem(key: string) {
    try {
      const uniqueKey = this._getUserKey(key);
      return localStorage.getItem(uniqueKey);
    } catch (error) {
      console.error(`LocalStorageAdapter failed to load ${key}`, error);
      return null;
    }
  }

  public removeItem(key: string) {
    const uniqueKey = this._getUserKey(key);
    localStorage.removeItem(uniqueKey);
  }

  private _getUserKey(key: string) {
    return `user_${this._userId}:${key}`;
  }
}
