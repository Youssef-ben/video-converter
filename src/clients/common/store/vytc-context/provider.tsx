import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';

import { LOCAL_STORAGE_KEYS } from 'common/utils/constants';

import type { AuthActions, AuthState, VytcContextAuthStateMethods } from './reducers/authentication-reducer';
import { authReducer, authReducerMethods, AUTH_CONTEXT_METHODS, AUTH_INITIAL_DATA } from './reducers/authentication-reducer';
import type { VytActions, VytcContextYoutubeStateMethods, VytState } from './reducers/vyt-reducer';
import { vytReducer, vytReducerMethods, VYT_CONTEXT_METHODS, VYT_INITIAL_DATA } from './reducers/vyt-reducer';
import type { VytcAsyncStorageProvider } from './types/index';

// Types
/* ============================================================ */
export interface VytcContextState extends VytcContextAuthStateMethods, VytcContextYoutubeStateMethods {
  auth: AuthState;
  vyt: VytState;

  storage?: VytcAsyncStorageProvider;
}
/* ============================================================ */

// Initial Context State
/* ============================================================ */
const CONTEXT_INITIAL_STATE: VytcContextState = {
  auth: AUTH_INITIAL_DATA,
  vyt: VYT_INITIAL_DATA,

  // Context Methods
  ...AUTH_CONTEXT_METHODS,
  ...VYT_CONTEXT_METHODS,
};
/* ============================================================ */

// Reducers
/* ============================================================ */
const VytcReducer = (state: VytcContextState, action: AuthActions | VytActions): VytcContextState => ({
  auth: authReducer(state.auth, action as AuthActions),
  vyt: vytReducer(state.vyt as VytState, action as VytActions),

  // Context Methods, Will be initialized in the VytcProvider.
  ...AUTH_CONTEXT_METHODS,
  ...VYT_CONTEXT_METHODS,
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
    const fetchLocalStorageData = async () => {
      const value = await storage.getItem(LOCAL_STORAGE_KEYS.AUTH);
      dispatch({
        type: value ? 'REFRESH' : 'SING_OUT',
        payload: value || '',
      });

      const vytValue = await storage.getItem(LOCAL_STORAGE_KEYS.VYT);
      dispatch({
        type: vytValue ? 'PERSIST' : 'CLEAR',
        payload: vytValue ? JSON.parse(vytValue) : undefined,
      });

      setLoading(false);
    };

    fetchLocalStorageData();
  }, []);

  // Initialize the Methods of the Context.
  const providerState = useMemo(
    (): VytcContextState => ({
      ...state,
      storage,

      ...authReducerMethods(dispatch, storage),
      ...vytReducerMethods(dispatch, storage),
    }),
    [state, storage]
  );

  if (loading) {
    return null;
  }

  return <VytcContext.Provider value={providerState}>{children}</VytcContext.Provider>;
}
