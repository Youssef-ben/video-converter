import { Socket } from 'socket.io';
import { WsEvents } from '../models/vytc/websocket.events';

// Custom
import { logger } from '../utils/winston.logger';
import { emitWelcomeMessage, receiveStartDownloadEvent } from './downloader.events';

// List of websocket clients
export const clientsList = new Set<Socket>();

/**
 * Register the websocket connection and sets the available actions.
 *
 * @param socket The websocket connection.
 */
export function handleWebSocketConnection(socket: Socket): void {
  logger.info(`Ws::Socket (${socket.id}) has connected!`);
  clientsList.add(socket);

  // Send welcome message.
  emitWelcomeMessage(socket);

  // Downloader events
  receiveStartDownloadEvent(socket);

  socket.on(WsEvents.Disconnect, () => {
    clientsList.delete(socket);
    logger.info(`Ws::Socket (${socket.id}) has disconnected.`);
  });
}
