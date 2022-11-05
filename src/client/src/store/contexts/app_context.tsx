/* eslint-disable react/function-component-definition */
import React, { useMemo } from 'react';
import { AuthAction, AuthenticationType, authInitialState } from '../actions/auth_actions';
import { YtDownloaderAction, YtDownloaderInitialState, YtDownloaderType } from '../actions/youtube_download_actions';
import { authReducer } from '../reducers/auth_reducer';
import { YtDownloaderReducer } from '../reducers/youtube_downloader_reducer';

// TYPES
type AppStateType = {
  authState: AuthenticationType;
  ytDownloaderState: YtDownloaderType;
};

type AppContextType = {
  state: AppStateType;
  dispatch: React.Dispatch<AuthAction | YtDownloaderAction>;
};

// VARIABLES
const initialStateValues: AppStateType = {
  authState: authInitialState,
  ytDownloaderState: YtDownloaderInitialState,
};

const AppContext = React.createContext<AppContextType>({
  state: initialStateValues,
  dispatch: () => null,
});

// REDUCERS
const appReducer = (state: AppStateType, action: AuthAction | YtDownloaderAction): AppStateType => ({
  authState: authReducer(state.authState, action as AuthAction),
  ytDownloaderState: YtDownloaderReducer(state.ytDownloaderState, action as YtDownloaderAction),
});

// Context Methods
interface AppProviderProps {
  children: JSX.Element;
}
export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = React.useReducer(appReducer, initialStateValues);

  const memoizedValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => React.useContext(AppContext);
