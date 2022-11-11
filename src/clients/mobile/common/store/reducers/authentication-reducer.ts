import type React from 'react';

import type { AuthenticationState, VytcAsyncStorageProvider } from '../types';

// Default Values.
export const AUTH_INITIAL_VALUES: AuthenticationState = {
  data: {
    accessToken: '',
  },

  connect: (_: string) => null,
  refresh: (_: string) => null,
  signOut: () => null,
};

// Authentication Actions types definition
export type AuthActions = {
  type: 'CONNECT' | 'REFRESH' | 'SING_OUT';
  payload: string;
};

/**
 * Authentication Reducers actions.
 */
export const authenticationReducer = (state: AuthenticationState, action: AuthActions): AuthenticationState => {
  switch (action.type) {
    case 'CONNECT':
    case 'REFRESH':
      return {
        ...state,
        data: {
          accessToken: action.payload,
        },
      };

    case 'SING_OUT':
      return {
        ...state,
        data: {
          accessToken: action.payload,
        },
      };

    default:
      return state;
  }
};

/**
 * Defines the methods for the Authentication store.
 *
 * @param state Data
 * @param dispatch Action dispatcher callback.
 * @param storage Local Storage API.
 * @returns
 */
export const setAuthenticationActions = (
  state: AuthenticationState,
  dispatch: React.Dispatch<AuthActions>,
  storage: VytcAsyncStorageProvider
): AuthenticationState => {
  const STORAGE_KEY = 'ACCESS_TOKEN';
  return {
    ...state,

    connect: async (token: string) => {
      dispatch({
        type: 'CONNECT',
        payload: token,
      });
      await storage.setItem(STORAGE_KEY, token);
    },

    refresh: async (token: string) => {
      dispatch({
        type: 'REFRESH',
        payload: token,
      });
      await storage.removeItem(STORAGE_KEY);
      await storage.setItem(STORAGE_KEY, token);
    },

    signOut: async () => {
      dispatch({
        type: 'SING_OUT',
        payload: '',
      });
      await storage.removeItem(STORAGE_KEY);
    },
  };
};
