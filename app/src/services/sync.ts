import { apiService } from './api';
import { cacheService } from './cache';
import { analyticsService } from './analytics';

interface SyncResult {
  success: boolean;
  syncedItems: number;
  errors: string[];
}

class SyncService {
  private isSyncing = false;

  async syncAll(): Promise<SyncResult> {
    if (this.isSyncing) {
      return { success: false, syncedItems: 0, errors: ['Sync already in progress'] };
    }

    this.isSyncing = true;
    const errors: string[] = [];
    let syncedItems = 0;

    try {
      // Sync offline data
      await this.syncOfflineData();
      syncedItems++;

      // Sync pending actions
      const queueResult = await this.syncPendingActions();
      syncedItems += queueResult.syncedItems;
      errors.push(...queueResult.errors);

      // Sync user data
      await this.syncUserData();
      syncedItems++;

      analyticsService.track('sync_completed', { syncedItems, errors: errors.length });

      return {
        success: errors.length === 0,
        syncedItems,
        errors,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown sync error';
      errors.push(errorMessage);
      analyticsService.trackError(error as Error, { context: 'sync_all' });
      
      return {
        success: false,
        syncedItems,
        errors,
      };
    } finally {
      this.isSyncing = false;
    }
  }

  private async syncOfflineData(): Promise<void> {
    try {
      // Sync cached quizzes
      const cachedQuizzes = await cacheService.getCachedQuizzes();
      if (cachedQuizzes) {
        // Update quizzes in backend if needed
        console.log('Syncing cached quizzes');
      }

      // Sync cached summaries
      const cachedSummaries = await cacheService.getCachedSummaries();
      if (cachedSummaries) {
        // Update summaries in backend if needed
        console.log('Syncing cached summaries');
      }

      // Sync cached progress
      const cachedProgress = await cacheService.getCachedProgress();
      if (cachedProgress) {
        // Update progress in backend if needed
        console.log('Syncing cached progress');
      }
    } catch (error) {
      console.error('Sync offline data error:', error);
      throw error;
    }
  }

  private async syncPendingActions(): Promise<{ syncedItems: number; errors: string[] }> {
    const queue = await cacheService.getSyncQueue();
    const errors: string[] = [];
    let syncedItems = 0;

    for (const item of queue) {
      try {
        await this.processSyncItem(item);
        await cacheService.removeFromSyncQueue(item.id);
        syncedItems++;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Failed to sync item ${item.id}: ${errorMessage}`);
      }
    }

    return { syncedItems, errors };
  }

  private async processSyncItem(item: any): Promise<void> {
    // Process different types of sync items
    switch (item.action) {
      case 'create':
        // Handle create action
        console.log('Processing create action:', item);
        break;
      case 'update':
        // Handle update action
        console.log('Processing update action:', item);
        break;
      case 'delete':
        // Handle delete action
        console.log('Processing delete action:', item);
        break;
      default:
        throw new Error(`Unknown sync action: ${item.action}`);
    }
  }

  private async syncUserData(): Promise<void> {
    try {
      // Sync user profile if needed
      const cachedProfile = await cacheService.getCachedUserProfile();
      if (cachedProfile) {
        // Update user profile in backend if needed
        console.log('Syncing user profile');
      }
    } catch (error) {
      console.error('Sync user data error:', error);
      throw error;
    }
  }

  async scheduleSync(): Promise<void> {
    // Schedule a sync for later
    setTimeout(() => {
      this.syncAll().catch(error => {
        console.error('Scheduled sync failed:', error);
      });
    }, 5000); // Sync after 5 seconds
  }

  async forceSync(): Promise<SyncResult> {
    // Force immediate sync
    return this.syncAll();
  }

  isCurrentlySyncing(): boolean {
    return this.isSyncing;
  }
}

export const syncService = new SyncService(); 