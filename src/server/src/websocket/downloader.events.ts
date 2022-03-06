/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from 'socket.io';
import { BaseCustomError } from '../models/exceptions/base.error';
import { ErrorWsResponse } from '../models/response/error.ws.response';
import { ApiResponse } from '../models/response/api.response';
// import downloaderService from '../services/downloader.service';
import { logger } from '../utils/winston.logger';
import { DownloadFinishedEvent, DownloadProgressEvent, StartDownloadEvent, WsEvents, WsMessages } from '../models/vytc/websocket.events';
import DownloaderService from '../services/downloader.service';
import securityService from '../services/security.service';

export function emitWelcomeMessage(socket: Socket): void {
  const message: ApiResponse<unknown> = {
    code: 200,
    type: WsMessages.WsSuccess,
    result: {
      connection_id: socket.id,
      message: 'Welcome to the {vytc} server!',
    },
  };
  socket.emit(WsEvents.Welcome, message);
}

export function validateWebSocketAccessToken(socket: Socket): void {
  logger.info('Ws::Validating the user credentials before opening the websocket connection.');
  if (!socket.handshake.query || !socket.handshake.query.access_token) {
    const msg = "Ws::Couldn't find a valid access token! please make sure you're connected before requesting the connect!";
    logger.error(`${msg} closing the websocket connection!`);
    throw new Error(msg);
  }

  logger.info('Ws::The user supplied the access token, validating the credentials...');
  const payload = securityService.validateToken(socket.handshake.query.access_token as string);
  if (!payload) {
    logger.info('Ws::The user supplied an invalid access token, closing the websocket!');
    emitError(socket, 500, WsMessages.WsUnHandledError, 'An error occurred while trying to handle your request!!');
    socket.disconnect();
  }

  logger.info('Ws::The user supplied a valid access token, opening the websocket connection...');
}

export function receiveStartDownloadEvent(socket: Socket): void {
  validateWebSocketAccessToken(socket);

  socket.on(WsEvents.StartDownload, async (...args) => {
    try {
      const request: StartDownloadEvent = args[0];
      if (!request) {
        // emit an error.
        emitError(socket, 400, WsMessages.WsErrorFieldsRequired, 'One or more fields are required!');
        return;
      }

      logger.info(`Ws::Start_Download::Starting the process to download and convert the video (${request.video.id}) for socket (${socket.id})...`);
      const progress = (value: DownloadProgressEvent) => emitDownloadProgressEvent(socket, value);
      const result = await DownloaderService.startDownloadProcessAsync(request.video, request.type, request.quality, progress);

      logger.info(`Ws::Start_Download::Finished downloading the video (${request.video.id}) for socket (${socket.id})`);
      logger.info(`Ws::Start_Download::Returning (${result}) for socket (${socket.id})`);
      emitDownloadFinishedEvent(socket, result);
    } catch (error: any) {
      handleWebSocketErrors(socket, error);
    }
  });
}

function emitDownloadProgressEvent(socket: Socket, value: DownloadProgressEvent): void {
  try {
    const event: ApiResponse<DownloadProgressEvent> = {
      code: 200,
      type: WsMessages.WsSuccess,
      result: value,
    };
    socket.emit(WsEvents.DownloadProgress, event);
  } catch (error: any) {
    handleWebSocketErrors(socket, error);
  }
}

function emitDownloadFinishedEvent(socket: Socket, uri: string): void {
  try {
    const event: ApiResponse<DownloadFinishedEvent> = {
      code: 200,
      type: WsMessages.WsSuccess,
      result: {
        uri,
      },
    };
    socket.emit(WsEvents.DownloadFinished, event);
  } catch (error: any) {
    handleWebSocketErrors(socket, error);
  }
}

/**
 * Emit simple error based on the given parameters.
 */
function emitError(socket: Socket, statusCode: number, errorType: string, message?: string, errors?: BaseCustomError): void {
  const error = new ErrorWsResponse(statusCode, errorType, message, errors);
  socket.emit(WsEvents.ServerError, error);
}

/**
 * Emits a error message based on the type of the given error parameter.
 */
function handleWebSocketErrors(socket: Socket, err: Error): void {
  if (err instanceof BaseCustomError) {
    emitError(socket, err.statusCode, err.error_type, err.message);
    return;
  }
  emitError(socket, 500, WsMessages.WsUnHandledError, 'An error occurred while trying to handle your request!!');
}
