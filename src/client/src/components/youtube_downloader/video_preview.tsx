/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import { Loader, Image } from 'semantic-ui-react';

// Custom
import { Navigate } from 'react-router-dom';
import loadingImage from '../../assets/images/loading.png';
import AvailableScreen from '../../types/available_screen';
import DownloadLink from './video_preview_download_link';
import VideoPreviewConvert from './video_preview_convert';
import VideoPreviewProgress from './video_preview_progress';
import { useAppContext } from '../../store/contexts/app_context';
import APP_ROUTES from '../../routes/routes.constants';

const TEXT = {
  loading: 'app.loading',
  description: 'app.yt.video_preview.description',
};

function VideoPreview(): JSX.Element {
  const { t } = useTranslation();
  const {
    state: {
      ytDownloaderState: { ytData, screen },
    },
  } = useAppContext();

  const [showPlayerLoading, setShowPlayerLoading] = useState(true);
  const [downloadLink, setDownloadLink] = useState<string>('');

  if (!ytData) {
    return <Navigate to={APP_ROUTES.PRIV_YTD} />;
  }

  let partialScreen: JSX.Element;

  switch (screen) {
    case AvailableScreen.VIDEO_PREVIEW_PROGRESS:
      partialScreen = <VideoPreviewProgress setDownloadLink={setDownloadLink} />;
      break;

    case AvailableScreen.VIDEO_PREVIEW_DOWNLOAD_LINK:
      partialScreen = <DownloadLink link={downloadLink} />;
      break;

    case AvailableScreen.VIDEO_PREVIEW:
    default:
      partialScreen = <VideoPreviewConvert />;
      break;
  }

  return (
    <>
      <p>{t(TEXT.description)}</p>

      <div className="player-wrapper">
        {showPlayerLoading && (
          <div className="react-player" style={{ width: '100%', height: '100%' }}>
            <Loader active inverted size="huge" content={t(TEXT.loading)} />

            <Image src={loadingImage} style={{ width: '100%', height: '100%' }} />
          </div>
        )}

        <ReactPlayer url={ytData?.link} width="100%" height="100%" className="react-player" controls onReady={() => setShowPlayerLoading(false)} />
      </div>

      {partialScreen}
    </>
  );
}

export default VideoPreview;
