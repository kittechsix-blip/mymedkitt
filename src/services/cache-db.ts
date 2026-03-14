// MedKitt — IndexedDB Cache Layer
// Stores Supabase data locally for offline access.
// Each data type gets its own object store with version tracking.

const DB_NAME = 'medkitt-cache';
const DB_VERSION = 4;

// Bump this to force-clear all cached data on next app load.
// Use when tree structure, drug data, or info pages change.
const DATA_VERSION = 8;
const DATA_VERSION_KEY = 'medkitt-data-version';

export type StoreName = 'drugs' | 'categories' | 'category_trees' | 'decision_nodes' | 'tree_citations' | 'sync_meta' | 'info_pages';

let dbPromise: Promise<IDBDatabase> | null = null;

/** Check if cached data is outdated and wipe if so */
async function checkDataVersion(db: IDBDatabase): Promise<void> {
  const stored = localStorage.getItem(DATA_VERSION_KEY);
  if (stored === String(DATA_VERSION)) return;

  // Wipe all object stores
  const storeNames: StoreName[] = ['drugs', 'categories', 'category_trees', 'decision_nodes', 'tree_citations', 'sync_meta', 'info_pages'];
  const tx = db.transaction(storeNames, 'readwrite');
  for (const name of storeNames) {
    tx.objectStore(name).clear();
  }
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });

  localStorage.setItem(DATA_VERSION_KEY, String(DATA_VERSION));
}

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = async () => {
      await checkDataVersion(request.result);
      resolve(request.result);
    };
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('drugs')) {
        db.createObjectStore('drugs', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('categories')) {
        db.createObjectStore('categories', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('category_trees')) {
        db.createObjectStore('category_trees', { keyPath: ['category_id', 'tree_id'] });
      }
      if (!db.objectStoreNames.contains('decision_nodes')) {
        db.createObjectStore('decision_nodes', { keyPath: ['id', 'tree_id'] });
      }
      if (!db.objectStoreNames.contains('tree_citations')) {
        db.createObjectStore('tree_citations', { keyPath: ['tree_id', 'num'] });
      }
      if (!db.objectStoreNames.contains('sync_meta')) {
        db.createObjectStore('sync_meta', { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains('info_pages')) {
        db.createObjectStore('info_pages', { keyPath: 'id' });
      }
    };
  });
  return dbPromise;
}

/** Get all records from a store */
export async function cacheGetAll<T>(storeName: StoreName): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const request = tx.objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result as T[]);
    request.onerror = () => reject(request.error);
  });
}

/** Replace all records in a store */
export async function cachePutAll<T>(storeName: StoreName, records: T[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.clear();
    for (const record of records) {
      store.put(record);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Get all records matching a filter function */
export async function cacheGetFiltered<T>(storeName: StoreName, filter: (item: T) => boolean): Promise<T[]> {
  const all = await cacheGetAll<T>(storeName);
  return all.filter(filter);
}

/** Append records to a store (does not clear existing) */
export async function cachePutMany<T>(storeName: StoreName, records: T[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    for (const record of records) {
      store.put(record);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Record last sync time for a data type */
export async function setLastSync(dataType: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('sync_meta', 'readwrite');
    tx.objectStore('sync_meta').put({ key: dataType, timestamp: Date.now() });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Get last sync time for a data type (null if never synced) */
export async function getLastSync(dataType: string): Promise<number | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('sync_meta', 'readonly');
    const request = tx.objectStore('sync_meta').get(dataType);
    request.onsuccess = () => resolve(request.result?.timestamp ?? null);
    request.onerror = () => reject(request.error);
  });
}
