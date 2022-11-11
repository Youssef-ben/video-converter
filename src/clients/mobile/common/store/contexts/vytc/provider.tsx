import React, { createContext, useContext, useMemo, useReducer } from 'react';

import type { AuthActions } from 'common/store/reducers/authentication-reducer';
import { authenticationReducer, AUTH_INITIAL_VALUES, setAuthenticationActions } from 'common/store/reducers/authentication-reducer';

import type { AuthenticationState, VytcAsyncStorageProvider, YoutubeVideoState } from '../../types';

// Types
/* ============================================================ */

type VytcContextState = {
  auth: AuthenticationState;
  vyt?: YoutubeVideoState;
};
/* ============================================================ */

// Variables
/* ============================================================ */
const INITIAL_STATE: VytcContextState = {
  auth: AUTH_INITIAL_VALUES,
  vyt: undefined,
};
/* ============================================================ */

// Create the VYTC App State and create custom context hook.
const VytcContext = createContext<VytcContextState>(INITIAL_STATE);
export const useAppContext = () => useContext(VytcContext);

// Reducers
/* ============================================================ */
const VytcReducer = (state: VytcContextState, action: AuthActions): VytcContextState => {
  return {
    auth: authenticationReducer(state.auth, action as AuthActions),
    vyt: undefined,
  };
};
/* ============================================================ */

interface VytcProviderProps {
  children: React.ReactNode;
  storage: VytcAsyncStorageProvider;
}

function VytcProvider({ children, storage }: VytcProviderProps) {
  const [state, dispatch] = useReducer(VytcReducer, INITIAL_STATE);

  const providerState = useMemo(() => {
    const data: VytcContextState = {
      ...state,
      auth: setAuthenticationActions(state.auth, dispatch, storage),
    };

    return data;
  }, [state, storage]);

  return <VytcContext.Provider value={providerState}>{children}</VytcContext.Provider>;
}

export default VytcProvider;
