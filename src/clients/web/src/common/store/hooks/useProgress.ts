/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import type { YoutubeVideoPayload } from 'common/types/server';

import type { DownloadFinishedEvent, DownloadProgressEvent, StartDownloadEvent } from '../../types/clients/websocket-events';
import { WsEvents } from '../../types/clients/websocket-events';
import type ApiResponse from '../../types/server/response/api.response';
import { useAppContext } from '../vytc-context/provider';
import { ScreenAction } from '../vytc-context/types';
import { useWebSocket } from '../websocket-context/provider';

export function useProgress() {
  const { t } = useTranslation();
  const ws = useWebSocket();
  const { vyt, setScreen, setDownloadLink } = useAppContext();

  const [downloadError, setDownloadError] = useState(false);
  const [progress, setProgress] = useState<DownloadProgressEvent>({ key: '0', progress: 0, text: 'ws.downloading' });

  // Register the Ws Events.
  useEffect(() => {
    const progressServerError = () => {
      setDownloadError(true);
    };
    ws.removeListener(WsEvents.ServerError, progressServerError);
    ws.on(WsEvents.ServerError, progressServerError);

    // Register Download progress.
    ws.removeAllListeners(WsEvents.DownloadProgress);
    ws.on(WsEvents.DownloadProgress, (args: ApiResponse<DownloadProgressEvent>) => {
      setProgress(args.result);
    });

    // Register Download finished
    ws.removeAllListeners(WsEvents.DownloadFinished);
    ws.on(WsEvents.DownloadFinished, (args: ApiResponse<DownloadFinishedEvent>) => {
      setProgress({ ...progress, text: t('ws.saving') });

      setDownloadLink(args.result.uri);
      setScreen(ScreenAction.DOWNLOAD);
    });

    // Start The Download event
    const eventData: StartDownloadEvent = {
      video: vyt.data as YoutubeVideoPayload,
      type: vyt.download.fileType,
      quality: vyt.download.videoQuality,
    };

    ws.emit(WsEvents.StartDownload, eventData);
  }, []);

  // Unregister all the websocket events used in this hook.
  const onCancel = () => {
    ws.removeAllListeners(WsEvents.ServerError);
    ws.removeAllListeners(WsEvents.Disconnect);
    ws.removeAllListeners(WsEvents.DownloadProgress);
    ws.removeAllListeners(WsEvents.DownloadFinished);
  };

  return { progress, downloadError, onCancel };
}
