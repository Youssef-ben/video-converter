/* eslint-disable @typescript-eslint/no-unused-vars */

import type { YoutubeVideoPayload } from 'common/types/server';
import { LOCAL_STORAGE_KEYS } from 'common/utils/constants';

import type { VytcAsyncStorageProvider } from '../types';

export interface VytcContextYoutubeStateMethods {
  persist: (data: YoutubeVideoPayload) => void;
  clear: () => void;
}

export const VYT_CONTEXT_METHODS: VytcContextYoutubeStateMethods = {
  persist: (_: YoutubeVideoPayload) => null,
  clear: () => null,
};

export type VytState = YoutubeVideoPayload;

export const VYT_INITIAL_DATA: YoutubeVideoPayload = {
  id: '',
  title: '',
  duration: '',
  link: '',
  thumbnail: {
    url: '',
    width: 0,
    height: 0,
  },
  extensions: {
    audio: '',
    video: '',
  },
};

export type VytActions = {
  type: 'PERSIST' | 'CLEAR';
  payload: VytState | undefined;
};

export function vytReducer(state: VytState, action: VytActions): VytState | undefined {
  switch (action.type) {
    case 'PERSIST':
      return action.payload;

    case 'CLEAR':
      return undefined;

    default:
      return state;
  }
}

export function vytReducerMethods(dispatch: React.Dispatch<VytActions>, storage: VytcAsyncStorageProvider): VytcContextYoutubeStateMethods {
  const persist = async (data: YoutubeVideoPayload) => {
    await storage.setItem(LOCAL_STORAGE_KEYS.VYT, JSON.stringify(data));
    dispatch({
      type: 'PERSIST',
      payload: data,
    });
  };

  const clear = async () => {
    await storage.removeItem(LOCAL_STORAGE_KEYS.VYT);
    dispatch({
      type: 'CLEAR',
      payload: undefined,
    });
  };

  return { persist, clear };
}
