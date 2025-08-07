// Simple storage utility that works on both web and mobile
class Storage {
  private isWeb = typeof window !== 'undefined';

  async getItem(key: string): Promise<string | null> {
    if (this.isWeb) {
      return localStorage.getItem(key);
    } else {
      // For mobile, you would use AsyncStorage
      // For now, we'll use localStorage as fallback
      return localStorage.getItem(key);
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    if (this.isWeb) {
      localStorage.setItem(key, value);
    } else {
      // For mobile, you would use AsyncStorage
      // For now, we'll use localStorage as fallback
      localStorage.setItem(key, value);
    }
  }

  async removeItem(key: string): Promise<void> {
    if (this.isWeb) {
      localStorage.removeItem(key);
    } else {
      // For mobile, you would use AsyncStorage
      // For now, we'll use localStorage as fallback
      localStorage.removeItem(key);
    }
  }
}

export const storage = new Storage(); 