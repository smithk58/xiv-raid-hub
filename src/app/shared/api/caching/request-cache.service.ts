import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { timer } from 'rxjs';

import { CachedItem } from 'src/app/shared/api/caching/CachedItem';

@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {
  maxAge = 86400000; // Remove items after 1 day of not being read from the cache
  cache = new Map<string, CachedItem>();
  expiredTimer = timer(0, 1800000); // Check if we need to remove cached items every 30 minutes
  localStorageNamespace = 'rcs_cache_'; // Prepended to stuff we store in localstorage so reading them back in later is cleaner
  constructor() {
    // Restore the cache from local storage
    this.populateCacheFromLocalStorage();
    // Start a scheduler to periodically remove expired items from the cache/local storage
    this.expiredTimer.subscribe(() => {
      this.removeExpiredCacheItems();
    });
  }

  /**
   * Used to retrieve a saved HTTP response from the cache. Will return undefined if there isn't one that matches, or it's exipired.
   * @param req -
   */
  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const uniqueKey = req.urlWithParams;
    const cachedItem = this.cache.get(uniqueKey);
    // We only return the cached response if we find one and it's not expired
    if (typeof(cachedItem) === 'undefined') {
      return undefined;
    } else if (cachedItem.lastRead < (Date.now() - this.maxAge)) {
      // Remove it from the cache before returning undefined
      this.removeCachedItem(uniqueKey);
      return undefined;
    }
    // Update last read on the the cached response, before returning its cached value
    cachedItem.lastRead = Date.now();
    this.addCachedItem(uniqueKey, cachedItem);
    return cachedItem.value;
  }

  /**
   * Used to save a HTTP response in the cache.
   * @param req -
   * @param response -
   */
  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const uniqueKey = req.urlWithParams;
    const entry: CachedItem = { value: response, lastRead: Date.now() };
    this.addCachedItem(uniqueKey, entry);
  }

  /**
   * Adds an item to the memory cache and session storage cache.
   * @param key - The unique key to store the entry under.
   * @param entry - The data to store. Will be stringified, so only raw data will be preserved (i.e. functions will be lost).
   */
  private addCachedItem(key: string, entry: CachedItem) {
    this.cache.set(key, entry);
    localStorage.setItem(this.localStorageNamespace + key, JSON.stringify(entry));
  }
  /**
   * Removes an item from the memory cache and session storage cache.
   * @param key - The unique key to remove.
   */
  private removeCachedItem(key: string) {
    this.cache.delete(key);
    localStorage.removeItem(this.localStorageNamespace + key);
  }

  /**
   * Removes any items that are expired from the memory cache and local storage.
   */
  private removeExpiredCacheItems() {
    const expired = Date.now() - this.maxAge;
    this.cache.forEach((entry, key) => {
      if (entry.lastRead < expired) {
        this.removeCachedItem(key);
      }
    });
  }

  /**
   * Populates the cache map with items from local storage.
   */
  private populateCacheFromLocalStorage() {
    const expired = Date.now() - this.maxAge;
    // Iterate storage keys and put them in our memory cache if they start with our namespace
    Object.keys(localStorage).forEach((key) => {
      if (key.indexOf(this.localStorageNamespace) === 0) {
        const itemAsString = localStorage.getItem(key);
        const item: CachedItem = itemAsString ? JSON.parse(itemAsString) : undefined;
        // Only add the item if it's not expired, remove it from local storage if it is expired though
        if (item && item.lastRead) { // just in case something slipped past our namespace check
          if (item.lastRead > expired) { // not expired
            const realKey =  key.substring(this.localStorageNamespace.length);
            this.cache.set(realKey, item);
          } else {
            this.removeCachedItem(key);
          }
        }
      }
    });
  }
}
