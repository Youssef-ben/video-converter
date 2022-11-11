import { YoutubeVideoDetails } from './video_details.model';
import { FileType } from './file_extensions.enum';
import { FileQuality } from './file_quality.enum';

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

/* ====================== WORKER - EVENTS ====================== */
export type StartDownloadEvent = {
  video: YoutubeVideoDetails;
  type: FileType.AUDIO_ONLY | FileType.VIDEO;
  quality: FileQuality;
};

export type DownloadProgressEvent = {
  key: string;
  text: string;
  progress: number;
};

export type DownloadFinishedEvent = {
  uri: string;
};
