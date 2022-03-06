import React from 'react';
import { useTranslation } from 'react-i18next';
import { YtDownloaderActions } from '../../store/actions/youtube_download_actions';
import { useAppContext } from '../../store/contexts/app_context';
import { useWebSocket } from '../../store/contexts/websocket_client';
import ApiResponse from '../../types/api.response';
import AvailableScreen from '../../types/available_screen';
import { FileType } from '../../types/vytc/file_extensions.enum';
import { FileQuality } from '../../types/vytc/file_quality.enum';
import { YoutubeVideoDetails } from '../../types/vytc/video_details.model';
import { DownloadFinishedEvent, DownloadProgressEvent, StartDownloadEvent, WsEvents } from '../../types/vytc/websocket.events';
import { saveYoutubeData } from '../../utils/helpers';

const TEXT = {
  download: 'ws.downloading',
  saving: 'ws.saving',
};

type UseVideoPreviewProgressHook = {
  hasError: boolean;
  progress: DownloadProgressEvent;
};

export type VideoPreviewProgressProps = {
  setDownloadLink: (value: string) => void;
};

const useVideoPreviewProgressHook = ({ setDownloadLink }: VideoPreviewProgressProps): UseVideoPreviewProgressHook => {
  const ws = useWebSocket();
  const { t } = useTranslation();
  const {
    state: {
      ytDownloaderState: { ytData, fileType, quality },
    },
    dispatch,
  } = useAppContext();

  const [hasError, setHasError] = React.useState(false);

  const [progress, setProgress] = React.useState<DownloadProgressEvent>({
    key: '',
    text: t(TEXT.download),
    progress: 0,
  });

  // When page loaded emit download event and start listening on for progress events.
  React.useEffect(() => {
    ws.on(WsEvents.DownloadProgress, (args: ApiResponse<DownloadProgressEvent>) => {
      setProgress(args.result);
    });

    ws.on(WsEvents.DownloadFinished, (args: ApiResponse<DownloadFinishedEvent>) => {
      setProgress({ ...progress, text: t(TEXT.saving) });
      setDownloadLink(args.result.uri);

      dispatch({
        type: YtDownloaderActions.UpdateScreen,
        payload: {
          screen: AvailableScreen.VIDEO_PREVIEW_DOWNLOAD_LINK,
        },
      });

      saveYoutubeData(undefined);
    });

    ws.on(WsEvents.ServerError, () => {
      setHasError(true);
    });

    ws.on(WsEvents.Disconnect, () => {
      setHasError(true);
      saveYoutubeData(undefined);
    });

    // Emit the start_download action.
    const startDownload: StartDownloadEvent = {
      type: fileType as FileType,
      video: { ...ytData } as YoutubeVideoDetails,
      quality: quality as FileQuality,
    };

    ws.emit(WsEvents.StartDownload, startDownload);
  }, []);

  return { progress, hasError };
};

export default useVideoPreviewProgressHook;
