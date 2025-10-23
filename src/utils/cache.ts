// Cache utility for localStorage with TTL support

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

const CACHE_PREFIX = 'animeverse_';

export const cache = {
  /**
   * Set item in cache with TTL
   */
  set<T>(key: string, data: T, ttlMinutes: number = 30): void {
    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        ttl: ttlMinutes * 60 * 1000,
      };
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to set cache:', error);
    }
  },

  /**
   * Get item from cache if not expired
   */
  get<T>(key: string): T | null {
    try {
      const itemStr = localStorage.getItem(CACHE_PREFIX + key);
      if (!itemStr) return null;

      const item: CacheItem<T> = JSON.parse(itemStr);
      const now = Date.now();

      // Check if expired
      if (now - item.timestamp > item.ttl) {
        this.remove(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('Failed to get cache:', error);
      return null;
    }
  },

  /**
   * Remove item from cache
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(CACHE_PREFIX + key);
    } catch (error) {
      console.warn('Failed to remove cache:', error);
    }
  },

  /**
   * Clear all cache items
   */
  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  },

  /**
   * Get cache size in bytes
   */
  getSize(): number {
    let size = 0;
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          const item = localStorage.getItem(key);
          if (item) {
            size += item.length + key.length;
          }
        }
      });
    } catch (error) {
      console.warn('Failed to get cache size:', error);
    }
    return size;
  },
};

/**
 * Listen for storage changes across tabs
 */
export function onCacheChange(callback: (key: string, newValue: any) => void): () => void {
  const handler = (event: StorageEvent) => {
    if (event.key && event.key.startsWith(CACHE_PREFIX) && event.newValue) {
      try {
        const item: CacheItem<any> = JSON.parse(event.newValue);
        const cleanKey = event.key.replace(CACHE_PREFIX, '');
        callback(cleanKey, item.data);
      } catch (error) {
        console.warn('Failed to parse storage event:', error);
      }
    }
  };

  window.addEventListener('storage', handler);

  // Return cleanup function
  return () => window.removeEventListener('storage', handler);
}
