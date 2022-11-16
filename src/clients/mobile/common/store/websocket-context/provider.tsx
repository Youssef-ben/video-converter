/* eslint-disable no-console */

import { createContext, useCallback, useContext } from 'react';

import { useTranslation } from 'react-i18next';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import type ErrorApiResponse from 'common/types/server/response/error.api.response';

import { WsEvents } from '../../types/clients/websocket-events';
import { SERVER_URLS } from '../../utils/constants';
import { useAppContext } from '../vytc-context/provider';

// Create Context
/* ============================================================ */
let wsInstance: Socket | null = null;
const WSContext = createContext<Socket | null>(wsInstance);
export const useWebSocket = (): Socket => useContext(WSContext) as Socket;

interface WsProviderProps {
  children: JSX.Element;
  toastCallback: (title: string, message: string, state: 'error' | 'success' | 'warning') => void;
}
export function WsProvider({ children, toastCallback }: WsProviderProps) {
  const { t } = useTranslation();
  const { auth, signOut, clear } = useAppContext();

  const disconnectFormWebsocket = useCallback(
    (state: 'Closed' | 'Error', message: string) => {
      console.warn(`[WAR] - Connection ${state}!`);
      clear();
      signOut();

      wsInstance?.disconnect();
      wsInstance = null;

      try {
        document.getElementsByClassName('closed-connection').item(0)?.classList.remove('hidden');
        (document.getElementsByClassName('app-error-message').item(0) as Element).innerHTML = message;
      } catch (error) {
        toastCallback(`Connection ${state}!`, message, 'error');
      }
    },
    [signOut, clear]
  );

  // Only set the websocket instance.
  if (!wsInstance && auth.isAuthenticated) {
    wsInstance = io(SERVER_URLS.wsBase, {
      path: SERVER_URLS.wsUri,
      forceNew: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 3,
      query: {
        access_token: auth.accessToken,
      },
    });

    wsInstance.on(WsEvents.Connect, () => {
      console.log('[INF] - Connection opened!');

      try {
        document.getElementsByClassName('closed-connection').item(0)?.classList.add('hidden');
      } catch (error) {
        /* Nothing to handle */
      }
    });

    wsInstance.on(WsEvents.ConnectError, () => {
      disconnectFormWebsocket('Error', t('ws.err.connection_error'));
    });

    wsInstance.on(WsEvents.Disconnect, () => {
      disconnectFormWebsocket('Closed', t('ws.err.connection_closed'));
    });

    wsInstance.on(WsEvents.ServerError, (err: ErrorApiResponse) => {
      console.error(err);
      toastCallback('Server Error', t(err.type), 'error');
    });
  }

  return <WSContext.Provider value={wsInstance}>{children}</WSContext.Provider>;
}
