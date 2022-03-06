/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'semantic-ui-react';

// Custom
import { VIDEO_PLACEHOLDER } from '../../utils/constants';
import InputWithLabel from '../utils/input_with_label';
import useVideoLookupHook from '../../hooks/youtube_downloader/video_lookup_hook';

const TEXT = {
  description: 'app.yt.video_lookup.description',
  btn_search: 'app.yt.btn.search',
};

function VideoLookup(): JSX.Element {
  const { t } = useTranslation();
  const hookData = useVideoLookupHook();

  return (
    <>
      <p>{t(TEXT.description)}</p>
      <Form>
        <Form.Field>
          <InputWithLabel placeholder={VIDEO_PLACEHOLDER} value={hookData.urlValue} setValue={hookData.onYoutubeUrlChange} error={hookData.inputError} />
        </Form.Field>
        <Button loading={hookData.loading} disabled={hookData.loading} className="primary btn yt-btn-right" onClick={hookData.fetchYoutubeDetails}>
          {t(TEXT.btn_search)}
        </Button>
      </Form>
    </>
  );
}

export default VideoLookup;
