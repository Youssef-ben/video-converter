import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';

import { LOCAL_STORAGE_KEYS } from 'common/utils/constants';



import type { YoutubeVideoPayload } from '../../types/server';
import type { AuthActions, AuthState, VytcContextAuthStateMethods } from './reducers/authentication-reducer';
import { authReducer, authReducerMethods, AUTH_INITIAL_DATA, CONTEXT_METHODS } from './reducers/authentication-reducer';
import type { VytcAsyncStorageProvider } from './types/index';

// Types
/* ============================================================ */
export interface VytcContextState extends VytcContextAuthStateMethods {
  auth: AuthState;
  vyt?: YoutubeVideoPayload;

  storage?: VytcAsyncStorageProvider;
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
  const [loading, setLoading] = useState(true);

  // Once the UI loaded, check if we have a value in our local storage.
  useEffect(() => {
    const fetchAccessToken = async () => {
      const value = await storage.getItem(LOCAL_STORAGE_KEYS.AUTH);
      dispatch({
        type: value ? 'REFRESH' : 'SING_OUT',
        payload: value || '',
      })


      setLoading(false);
    }

    fetchAccessToken();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize the Methods of the Context.
  const providerState = useMemo(
    (): VytcContextState => ({
      ...state,

      ...authReducerMethods(dispatch, storage),
      storage,
    }),
    [state, storage]
  );

  if (loading) {
    return null;
  }

  return <VytcContext.Provider value={providerState}>{children}</VytcContext.Provider>;
}
