/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useMemo } from 'react';

import type { AuthenticationState } from 'common/store/types/Authentication';
import type { YoutubeVideoPayload } from 'common/types/server';

// Types
/* ============================================================ */
interface VytcContextPayload {
  AuthenticationState: AuthenticationState;
  youtubeState?: YoutubeVideoPayload;
}

export interface VytcAsyncStorageProvider {
  getItem: (key: string, callback?: any) => Promise<string | null>;
  setItem: (key: string, value: string, callback?: any) => Promise<void>;
  removeItem: (key: string, callback?: any) => Promise<void>;
}

type VytcContextState = {
  state: VytcContextPayload;
  storage: VytcAsyncStorageProvider;

  dispatch: React.Dispatch<any>;
};

/* ============================================================ */

// Variables
/* ============================================================ */
const INITIAL_STATE: VytcContextState = {
  state: {
    AuthenticationState: {
      token: '',
    },
    youtubeState: undefined,
  },
  storage: {
    removeItem: (_: string) => Promise.resolve(),
    getItem: (key: string) => Promise.resolve(key),
    setItem: (_key: string, _value: string) => Promise.resolve(),
  },
  dispatch: () => null,
};
/* ============================================================ */

// Create the VYTC App State and create custom context hook.
const VytcContext = createContext<VytcContextState>(INITIAL_STATE);
export const useAppContext = () => useContext(VytcContext);

interface VytcProviderProps {
  children: React.ReactNode;
  storage: VytcAsyncStorageProvider;
}

function VytcProvider({ children, storage }: VytcProviderProps) {
  const providerState = useMemo(
    () => ({
      ...INITIAL_STATE,
      storage: storage as VytcAsyncStorageProvider,
    }),
    [storage]
  );

  return <VytcContext.Provider value={providerState}>{children}</VytcContext.Provider>;
}

export default VytcProvider;
