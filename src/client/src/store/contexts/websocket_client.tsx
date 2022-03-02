/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import ShowToast from '../../components/utils/custom_toast';
import { WsEvents } from '../../types/vytc/websocket.events';
import { SERVER_URLS } from '../../utils/constants';
import { clearAccessToken, getAccessToken } from '../../utils/helpers';

const WSContext = createContext<Socket | null>(null);

let websocketInstance: Socket | null;

/**
 * Create the Websocket React Provider.
 */
const WsProvider: React.FC = ({ children }) => {
  if (!websocketInstance) {
    websocketInstance = io(SERVER_URLS.ws_base, {
      path: SERVER_URLS.ws_uri,
      forceNew: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      query: {
        access_token: getAccessToken(),
      },
    });

    websocketInstance.on(WsEvents.Connect, () => {
      document.getElementsByClassName('closed-connection').item(0)?.classList.add('hidden');
    });

    websocketInstance.on(WsEvents.Disconnect, () => {
      ShowToast('error', 'Disconnected', 'The Connection expired, please try to connect again!');
      clearAccessToken();
    });

    websocketInstance.on(WsEvents.ConnectError, () => {
      document.getElementsByClassName('closed-connection').item(0)?.classList.remove('hidden');
    });

    websocketInstance.on(WsEvents.ServerError, (err: any) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
  }

  return <WSContext.Provider value={websocketInstance}>{children}</WSContext.Provider>;
};

/**
 * Create the Websocket Custom Hook.
 */
export const useWebSocket = (): Socket => useContext(WSContext) as Socket;

/**
 * WebSocket provider.
 */
export default WsProvider;
