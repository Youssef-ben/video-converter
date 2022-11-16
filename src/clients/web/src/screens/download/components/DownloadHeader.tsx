import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import type { DropdownItemProps, DropdownProps } from 'semantic-ui-react';
import { Dropdown, Grid, Label, Popup } from 'semantic-ui-react';

import { useAppContext } from 'common/store/vytc-context/provider';
import { ScreenAction, VideoQuality } from 'common/store/vytc-context/types';

const translations = {
  popupVideoTitle: 'app.download.header.popup.video.title',
  videoQualityLabel: 'app.download.header.video_quality',
  popupVideoQualityLabel: 'app.download.header.popup.video_quality.label',
  qualityText: 'app.download.header.video_quality',
};

function DownloadHeader() {
  const { t } = useTranslation();
  const { vyt, setVideoQuality } = useAppContext();
  const [videoQualityOptions, setVideoQualityOptions] = useState<DropdownItemProps[]>([]);

  useEffect(() => {
    setVideoQualityOptions([
      {
        key: VideoQuality.HIGHEST,
        text: t(`${translations.qualityText}.${VideoQuality.HIGHEST}`),
        value: VideoQuality.HIGHEST,
      },
      {
        key: VideoQuality.DEFAULT,
        text: t(`${translations.qualityText}.${VideoQuality.DEFAULT}`),
        value: VideoQuality.DEFAULT,
      },
      {
        key: VideoQuality.LOWEST,
        text: t(`${translations.qualityText}.${VideoQuality.LOWEST}`),
        value: VideoQuality.LOWEST,
      },
    ]);
  }, [t]);

  const onVideoQualityChangeHandler = (event: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
    setVideoQuality(value as VideoQuality);
  };

  return (
    <>
      <Grid.Column className="right-padding-none" mobile={16} tablet={10} computer={12}>
        <Popup
          content={vyt?.data?.title}
          className="popup-note video-title-note"
          header={t(translations.popupVideoTitle)}
          trigger={<Label className="video-title">{vyt?.data?.title}</Label>}
        />
      </Grid.Column>

      {vyt?.download.screen === ScreenAction.PREVIEW && (
        <Grid.Column className="left-padding-none" mobile={16} tablet={6} computer={4}>
          <Popup
            header="Note"
            className="popup-note"
            content={t(translations.popupVideoQualityLabel)}
            trigger={
              <Dropdown
                fluid
                button
                className="icon video-quality"
                labeled
                icon="setting"
                options={videoQualityOptions}
                onChange={onVideoQualityChangeHandler}
                defaultValue={vyt?.download.videoQuality}
                text={t(translations.videoQualityLabel)}
              />
            }
          />
        </Grid.Column>
      )}
    </>
  );
}

export default DownloadHeader;
