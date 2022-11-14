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

export enum VideoQuality {
  HIGHEST = 'highest',
  DEFAULT = 'default',
  LOWEST = 'lowest',
}

export enum FileType {
  AUDIO_ONLY = 'audio',
  VIDEO = 'video',
}

export enum ScreenAction {
  PREVIEW = 'PREVIEW',
  PROGRESS = 'download',
  DOWNLOAD = 'finish',
}
