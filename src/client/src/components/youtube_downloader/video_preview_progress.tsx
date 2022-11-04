import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import ErrorView from '../utils/error_view';
import ProgressBar from '../utils/progressbar';
import { useAppContext } from '../../store/contexts/app_context';
import useVideoPreviewProgressHook, { VideoPreviewProgressProps } from '../../hooks/youtube_downloader/video_preview_progress';
import APP_ROUTES from '../../routes/routes.constants';

export default function VideoPreviewProgress(props: VideoPreviewProgressProps): JSX.Element {
  const { t } = useTranslation();
  const {
    state: {
      ytDownloaderState: { ytData },
    },
  } = useAppContext();

  const { hasError, progress } = useVideoPreviewProgressHook(props);

  if (!ytData) {
    return <Navigate to={APP_ROUTES.PRIV_YTD} />;
  }

  const content = hasError ? (
    <ErrorView />
  ) : (
    <Form style={{ marginBottom: '1.5em' }}>
      <Form.Field>
        <ProgressBar display key="pg" text={progress.text} progress={progress.progress} />
      </Form.Field>
      <Button className="btn yt-btn-right" color="red" onClick={() => window.location.reload()}>
        <span>{t('btn.cancel')}</span>
      </Button>
    </Form>
  );

  return <> {content}</>;
}
