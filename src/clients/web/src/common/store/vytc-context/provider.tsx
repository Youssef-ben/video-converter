import { createContext, useContext, useMemo, useReducer } from 'react';


import type { YoutubeVideoPayload } from '../../types/server';
import type { AuthActions, AuthState, VytcContextAuthStateMethods } from './reducers/authentication-reducer';
import { authReducer, authReducerMethods, AUTH_INITIAL_DATA, CONTEXT_METHODS } from './reducers/authentication-reducer';
import type { VytcAsyncStorageProvider } from './types/index';

// Types
/* ============================================================ */
export interface VytcContextState extends VytcContextAuthStateMethods {
  auth: AuthState;
  vyt?: YoutubeVideoPayload;
}
/* ============================================================ */

// Initial Context State
/* ============================================================ */

const CONTEXT_INITIAL_STATE: VytcContextState = {
  auth: AUTH_INITIAL_DATA,
  vyt: undefined,

  // Context Methods
  ...CONTEXT_METHODS,
};
/* ============================================================ */

// Reducers
/* ============================================================ */
const VytcReducer = (state: VytcContextState, action: AuthActions): VytcContextState => ({
  auth: authReducer(state.auth, action),
  vyt: undefined,

  // Context Methods, Will be initialized in the VytcProvider.
  ...CONTEXT_METHODS,
});
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
