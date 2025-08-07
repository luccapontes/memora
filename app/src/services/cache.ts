import { storage } from '../utils/storage';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt?: number;
}

interface SyncQueueItem {
  id: string;
  action: 'create' | 'update' | 'delete';
  endpoint: string;
  data: any;
  timestamp: number;
}

class CacheService {
  private readonly CACHE_PREFIX = '@Memora:cache:';
  private readonly SYNC_QUEUE_KEY = '@Memora:sync_queue';
  private readonly DEFAULT_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  // Cache methods
  async set<T>(key: string, data: T, expiresIn?: number): Promise<void> {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: expiresIn ? Date.now() + expiresIn : undefined,
    };

    await storage.setItem(`${this.CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const cached = await storage.getItem(`${this.CACHE_PREFIX}${key}`);
      if (!cached) return null;

      const cacheItem: CacheItem<T> = JSON.parse(cached);
      
      // Check if cache is expired
      if (cacheItem.expiresAt && Date.now() > cacheItem.expiresAt) {
        await this.remove(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    await storage.removeItem(`${this.CACHE_PREFIX}${key}`);
  }

  async clear(): Promise<void> {
    // This would need to be implemented based on your storage implementation
    // For now, we'll clear known cache keys
    const knownKeys = [
      'quizzes',
      'summaries',
      'progress',
      'user_profile',
      'notifications',
    ];

    for (const key of knownKeys) {
      await this.remove(key);
    }
  }

  // Sync queue methods
  async addToSyncQueue(item: Omit<SyncQueueItem, 'id' | 'timestamp'>): Promise<void> {
    const queue = await this.getSyncQueue();
    const syncItem: SyncQueueItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    queue.push(syncItem);
    await storage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));
  }

  async getSyncQueue(): Promise<SyncQueueItem[]> {
    try {
      const queue = await storage.getItem(this.SYNC_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      console.error('Get sync queue error:', error);
      return [];
    }
  }

  async removeFromSyncQueue(id: string): Promise<void> {
    const queue = await this.getSyncQueue();
    const filteredQueue = queue.filter(item => item.id !== id);
    await storage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(filteredQueue));
  }

  async clearSyncQueue(): Promise<void> {
    await storage.removeItem(this.SYNC_QUEUE_KEY);
  }

  // Offline data methods
  async saveOfflineData<T>(key: string, data: T): Promise<void> {
    await this.set(key, data, this.DEFAULT_CACHE_DURATION);
  }

  async getOfflineData<T>(key: string): Promise<T | null> {
    return this.get<T>(key);
  }

  // Quiz-specific cache methods
  async cacheQuizzes(quizzes: any[]): Promise<void> {
    await this.set('quizzes', quizzes, this.DEFAULT_CACHE_DURATION);
  }

  async getCachedQuizzes(): Promise<any[] | null> {
    return this.get<any[]>('quizzes');
  }

  // Summary-specific cache methods
  async cacheSummaries(summaries: any[]): Promise<void> {
    await this.set('summaries', summaries, this.DEFAULT_CACHE_DURATION);
  }

  async getCachedSummaries(): Promise<any[] | null> {
    return this.get<any[]>('summaries');
  }

  // Progress-specific cache methods
  async cacheProgress(progress: any): Promise<void> {
    await this.set('progress', progress, this.DEFAULT_CACHE_DURATION);
  }

  async getCachedProgress(): Promise<any | null> {
    return this.get<any>('progress');
  }

  // User profile cache methods
  async cacheUserProfile(profile: any): Promise<void> {
    await this.set('user_profile', profile, this.DEFAULT_CACHE_DURATION);
  }

  async getCachedUserProfile(): Promise<any | null> {
    return this.get<any>('user_profile');
  }
}

export const cacheService = new CacheService(); 