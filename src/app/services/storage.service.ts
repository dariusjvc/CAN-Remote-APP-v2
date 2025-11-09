import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}

  async set<T>(key: string, value: T): Promise<boolean> {
    try {
      const serialized =
        typeof value === 'string' ? value : JSON.stringify(value);
      await Preferences.set({ key, value: serialized });
      return true;
    } catch {
      return false;
    }
  }

  async get<T = unknown>(key: string): Promise<T | string | null> {
    const { value } = await Preferences.get({ key });
    if (value == null) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value; // era texto plano
    }
  }

  async remove(key: string): Promise<boolean> {
    try {
      await Preferences.remove({ key });
      return true;
    } catch {
      return false;
    }
  }

  async clear(): Promise<boolean> {
    try {
      await Preferences.clear();
      return true;
    } catch {
      return false;
    }
  }
}
