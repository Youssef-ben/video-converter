import { createContext, useContext, useMemo, useReducer } from 'react';

import type { LoginPayload, YoutubeVideoPayload } from '../../types/server';
import type { AuthActions, VytcContextAuthStateMethods } from './reducers/authentication-reducer';
import { authReducer, authReducerMethods, CONTEXT_METHODS } from './reducers/authentication-reducer';
import type { VytcAsyncStorageProvider } from './types/index';

// Types
/* ============================================================ */
interface VytcContextState extends VytcContextAuthStateMethods {
  auth: LoginPayload;
  vyt?: YoutubeVideoPayload;
}
/* ============================================================ */

// Initial Context State
/* ============================================================ */

const CONTEXT_INITIAL_STATE: VytcContextState = {
  auth: { accessToken: '' },
  vyt: undefined,

  // Context Methods
  ...CONTEXT_METHODS,
};
/* ============================================================ */

// Reducers
/* ============================================================ */
const VytcReducer = (state: VytcContextState, action: AuthActions): VytcContextState => {
  return {
    auth: authReducer(state.auth, action),
    vyt: undefined,

    // Context Methods, Will be initialized in the VytcProvider.
    ...CONTEXT_METHODS,
  };
};
/* ============================================================ */

// VYTC Context
const VytcContext = createContext<VytcContextState>(CONTEXT_INITIAL_STATE);
export const useAppContext = () => useContext(VytcContext);

interface VytcProviderProps {
  children: React.ReactNode;
  storage: VytcAsyncStorageProvider;
}
export function VytcContextProvider({ children, storage }: VytcProviderProps) {
  const [state, dispatch] = useReducer(VytcReducer, CONTEXT_INITIAL_STATE);

  // Initialize the Methods of the Context.
  const providerState = useMemo(
    (): VytcContextState => ({
      ...state,

      ...authReducerMethods(dispatch, storage),
    }),
    [state, storage]
  );

  return <VytcContext.Provider value={providerState}>{children}</VytcContext.Provider>;
}
