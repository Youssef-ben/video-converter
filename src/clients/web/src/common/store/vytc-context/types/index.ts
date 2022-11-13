/**
 * Required Methods by the Storage API.
 *
 * - Web: LocalStorage.
 * - Mobile: AsyncStorage.
 */
export interface VytcAsyncStorageProvider {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}
