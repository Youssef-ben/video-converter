import type { FileType, VideoQuality } from '../../store/vytc-context/types';
import type { YoutubeVideoPayload } from '../server';

export const WsEvents = {
  Connect: 'connect',
  ConnectError: 'connect_error',

  Disconnect: 'disconnect',
  ServerError: 'SERVER_ERROR',

  Welcome: 'WELCOME',
  StartDownload: 'START_DOWNLOAD',
  DownloadProgress: 'DOWNLOAD_PROGRESS',
  DownloadFinished: 'DOWNLOAD_FINISHED',
};

export const WsMessages = {
  WsSuccess: 'ws.success',
  WsErrorFieldsRequired: 'ws.err.fields_required',

  WsDownloading: 'ws.downloading',
  WsErrorDownloading: 'ws.err.downloading.unexpected_error',

  WsConverting: 'ws.converting',

  WsSettingUpFile: 'ws.setting_up_file',
  WsErrorSettingUpFile: 'ws.err.setting_up_file',
};

// EVENTS
/* ============================================================ */
export type StartDownloadEvent = {
  video: YoutubeVideoPayload;
  type: FileType.AUDIO_ONLY | FileType.VIDEO;
  quality: VideoQuality;
};

export interface DownloadProgressEvent {
  key: string;
  text: string;
  progress: number;
}

export type DownloadFinishedEvent = {
  uri: string;
};
