// Simple storage utility that works on both web and mobile
class Storage {
  private isWeb = typeof window !== 'undefined';

  async getItem(key: string): Promise<string | null> {
    try {
      if (this.isWeb) {
        return localStorage.getItem(key);
      } else {
        // For mobile, you would use AsyncStorage
        // For now, we'll use localStorage as fallback
        return localStorage.getItem(key);
      }
    } catch (error) {
      console.log('Storage getItem error:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (this.isWeb) {
        localStorage.setItem(key, value);
      } else {
        // For mobile, you would use AsyncStorage
        // For now, we'll use localStorage as fallback
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.log('Storage setItem error:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (this.isWeb) {
        localStorage.removeItem(key);
      } else {
        // For mobile, you would use AsyncStorage
        // For now, we'll use localStorage as fallback
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.log('Storage removeItem error:', error);
    }
  }
}

export const storage = new Storage(); 