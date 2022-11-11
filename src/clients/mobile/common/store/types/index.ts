import type { LoginResponsePayload, YoutubeVideoPayload } from '../../types/server';

/**
 * Authentication Store structure
 */
export type AuthenticationState = {
  data: LoginResponsePayload;

  connect: (token: string) => void;
  refresh: (token: string) => void;
  signOut: () => void;
};

export type YoutubeVideoState = YoutubeVideoPayload;

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
