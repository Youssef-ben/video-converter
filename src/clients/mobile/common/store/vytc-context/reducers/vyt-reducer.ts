import type { YoutubeVideoPayload } from 'common/types/server';
import { LOCAL_STORAGE_KEYS } from 'common/utils/constants';

import type { VytcAsyncStorageProvider } from '../types';
import { FileType, ScreenAction, VideoQuality } from '../types';

export interface VytcContextYoutubeStateMethods {
  persist: (data: YoutubeVideoPayload) => void;
  clear: () => void;

  // Preview Actions
  setVideoQuality: (data: VideoQuality) => void;
  setFileType: (data: FileType) => void;
  setScreen: (data: ScreenAction) => void;
  setDownloadLink: (url: string) => void;
  appPermissions: (directory?: string) => Promise<string>;
  clearAppPermissions: () => void;
}

export const VYT_CONTEXT_METHODS: VytcContextYoutubeStateMethods = {
  persist: (_: YoutubeVideoPayload) => null,
  clear: () => null,

  // Preview Actions
  setVideoQuality: (_: VideoQuality) => null,
  setFileType: (_: FileType) => null,
  setScreen: (_: ScreenAction) => null,
  setDownloadLink: (_: string) => null,
  appPermissions: (directory?: string) => Promise.resolve(`${directory}`),
  clearAppPermissions: () => null,
};

export interface DownloadState {
  videoQuality: VideoQuality;
  screen: ScreenAction;
  fileType: FileType;
  downloadLink: string;
}

export const DOWNLOAD_INITIAL_VALUES: DownloadState = {
  videoQuality: VideoQuality.DEFAULT,
  fileType: FileType.AUDIO_ONLY,
  screen: ScreenAction.PREVIEW,
  downloadLink: '',
};

export type VytState = {
  data?: YoutubeVideoPayload;
  download: DownloadState;
};

export const VYT_INITIAL_DATA: VytState = {
  data: undefined,
  download: DOWNLOAD_INITIAL_VALUES,
};

export type VytActions = {
  type: 'PERSIST' | 'CLEAR' | 'SET_VIDEO_QUALITY' | 'SET_FILE_TYPE' | 'SET_SCREEN' | 'SET_DOWNLOAD_LINK';
  payload: VytState | YoutubeVideoPayload | VideoQuality | ScreenAction | FileType | string | undefined;
};

export function vytReducer(state: VytState, action: VytActions): VytState {
  switch (action.type) {
    case 'PERSIST': {
      const payload = action.payload as YoutubeVideoPayload;
      // Clean the title from special chars that may not work with the converter.
      payload.title = payload.title.trim().replace(/[`~!@#$%^&*_|+\-=?;:'",.<>\\/]/gi, '');

      return {
        ...state,
        data: payload,
      };
    }

    case 'CLEAR':
      return VYT_INITIAL_DATA;

    case 'SET_VIDEO_QUALITY':
      return {
        ...state,
        download: {
          ...state.download,
          videoQuality: action.payload as VideoQuality,
        },
      };

    case 'SET_FILE_TYPE':
      return {
        ...state,
        download: {
          ...state.download,
          fileType: action.payload as FileType,
        },
      };

    case 'SET_SCREEN':
      return {
        ...state,
        download: {
          ...state.download,
          screen: action.payload as ScreenAction,
        },
      };

    case 'SET_DOWNLOAD_LINK':
      return {
        ...state,
        download: {
          ...state.download,
          downloadLink: action.payload as string,
        },
      };

    default:
      return state;
  }
}

export function vytReducerMethods(dispatch: React.Dispatch<VytActions>, storage: VytcAsyncStorageProvider): VytcContextYoutubeStateMethods {
  const persist = async (payload: YoutubeVideoPayload) => {
    await storage.setItem(LOCAL_STORAGE_KEYS.VYT, JSON.stringify(payload));
    dispatch({
      type: 'PERSIST',
      payload,
    });
  };

  const clear = async () => {
    await storage.removeItem(LOCAL_STORAGE_KEYS.VYT);
    dispatch({
      type: 'CLEAR',
      payload: undefined,
    });
  };

  // Preview Actions
  const setVideoQuality = (value: VideoQuality) => {
    dispatch({
      type: 'SET_VIDEO_QUALITY',
      payload: value,
    });
  };

  const setFileType = (value: FileType) => {
    dispatch({
      type: 'SET_FILE_TYPE',
      payload: value,
    });
  };

  const setScreen = (value: ScreenAction) => {
    dispatch({
      type: 'SET_SCREEN',
      payload: value,
    });
  };

  const setDownloadLink = (value: string) => {
    dispatch({
      type: 'SET_DOWNLOAD_LINK',
      payload: value,
    });
  };

  const appPermissions = async (directory?: string) => {
    if (!directory) {
      const result = await storage.getItem(LOCAL_STORAGE_KEYS.PERMISSIONS);
      return result || '';
    }

    await storage.setItem(LOCAL_STORAGE_KEYS.PERMISSIONS, directory);
    return directory;
  };

  const clearAppPermissions = async () => {
    await storage.removeItem(LOCAL_STORAGE_KEYS.PERMISSIONS);
  };

  return { persist, clear, setVideoQuality, setFileType, setScreen, setDownloadLink, appPermissions, clearAppPermissions };
}
