/* eslint-disable @typescript-eslint/no-unused-vars */

import type { LoginPayload } from '../../../types/server';
import { LOCAL_STORAGE_KEYS } from '../../../utils/constants';
import type { VytcAsyncStorageProvider } from '../types';

export interface VytcContextAuthStateMethods {
  connect: (token: string) => void;
  refresh: (token: string) => void;
  signOut: () => void;
}

export const CONTEXT_METHODS: VytcContextAuthStateMethods = {
  connect: (_: string) => null,
  refresh: (_: string) => null,
  signOut: () => null,
};

export type AuthState = LoginPayload & {
  isAuthenticated: boolean;
};

export const AUTH_INITIAL_DATA = {
  accessToken: '',
  isAuthenticated: true,
};

export type AuthActions = {
  type: 'CONNECT' | 'REFRESH' | 'SING_OUT';
  payload: string;
};

export const authReducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case 'CONNECT':
    case 'REFRESH':
      return {
        isAuthenticated: true,
        accessToken: action.payload,
      };

    case 'SING_OUT':
      return {
        accessToken: '',
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export const authReducerMethods = (dispatch: React.Dispatch<AuthActions>, storage: VytcAsyncStorageProvider): VytcContextAuthStateMethods => ({
  connect: async (token: string) => {
    dispatch({
      type: 'CONNECT',
      payload: token,
    });
    await storage.setItem(LOCAL_STORAGE_KEYS.AUTH, token);
  },

  refresh: async (token: string) => {
    dispatch({
      type: 'REFRESH',
      payload: token,
    });
    await storage.removeItem(LOCAL_STORAGE_KEYS.AUTH);
    await storage.setItem(LOCAL_STORAGE_KEYS.AUTH, token);
  },

  signOut: async () => {
    dispatch({
      type: 'SING_OUT',
      payload: '',
    });
    await storage.removeItem(LOCAL_STORAGE_KEYS.AUTH);
  },
});
