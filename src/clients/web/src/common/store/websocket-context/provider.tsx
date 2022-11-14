/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';

import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

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
  toastCallback: (title: string, message: string, state: 'error' | 'success') => void;
}
export function WsProvider({ children, toastCallback }: WsProviderProps) {
  const { auth, signOut } = useAppContext();

  // Only set the websocket instance.
  if (!wsInstance && auth.isAuthenticated) {
    wsInstance = io(SERVER_URLS.wsBase, {
      path: SERVER_URLS.wsUri,
      forceNew: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      query: {
        access_token: auth.accessToken,
      },
    });

    wsInstance.on(WsEvents.Connect, () => {
      console.log('[INF] - Connection opened!');
      document.getElementsByClassName('closed-connection').item(0)?.classList.add('hidden');
    });

    wsInstance.on(WsEvents.Disconnect, () => {
      console.log('[WAR] - Connection closed!');
      toastCallback('Disconnected', 'The Connection expired, please try to connect again!', 'error');
      signOut();
    });

    wsInstance.on(WsEvents.ConnectError, () => {
      console.log('[WAR] - Connection error!');
      document.getElementsByClassName('closed-connection').item(0)?.classList.remove('hidden');
    });

    wsInstance.on(WsEvents.ServerError, (err: any) => {
      console.error(err);
    });
  }

  return <WSContext.Provider value={wsInstance}>{children}</WSContext.Provider>;
}
