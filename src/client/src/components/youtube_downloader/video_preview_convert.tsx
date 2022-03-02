/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, Form, Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { FileType } from '../../types/vytc/file_extensions.enum';
import { VID_TITLE_PLACEHOLDER } from '../../utils/constants';
import InputWithLabel from '../utils/input_with_label';
import useVideoDownloadHook from '../../hooks/youtube_downloader/video_preview_convert_hook';
import { useAppContext } from '../../store/contexts/app_context';
import APP_ROUTES from '../../routes/routes.constants';

const TEXT = {
  inputLabel: 'app.yt.video_preview.title_name',
  btn_download: 'app.convert',
  btn_mp3: 'app.convert.audio',
  btn_mp4: 'app.convert.video',
};

function VideoPreviewConvert(): JSX.Element {
  const { t } = useTranslation();
  const { qualityOptions, setTile, onQualityChange, setScreenAction } = useVideoDownloadHook();

  const {
    state: {
      ytDownloaderState: { ytData, quality },
    },
  } = useAppContext();

  if (!ytData) {
    return <Redirect to={APP_ROUTES.PRIV_YTD} />;
  }

  return (
    <Form style={{ marginBottom: '1.5em' }}>
      <Form.Field>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={10} computer={11}>
              <InputWithLabel placeholder={VID_TITLE_PLACEHOLDER} value={ytData?.title} setValue={setTile} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={6} computer={5}>
              <Dropdown
                button
                className="icon video-quality"
                labeled
                icon="setting"
                options={qualityOptions}
                onChange={onQualityChange}
                defaultValue={quality}
                text={t('app.yt.video_preview.video_quality')}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>

      <Button className="primary btn yt-left" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setScreenAction(e, FileType.AUDIO_ONLY)}>
        <span className="break-line">
          {t(TEXT.btn_download)}
          {'  '}
          {t(TEXT.btn_mp3)}
        </span>
      </Button>

      <Button className="btn yt-right" color="orange" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setScreenAction(e, FileType.VIDEO)}>
        <span>
          {t(TEXT.btn_download)}
          {'  '}
          {t(TEXT.btn_mp4)}
        </span>
      </Button>
    </Form>
  );
}

export default VideoPreviewConvert;
