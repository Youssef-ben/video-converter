import { useTranslation } from 'react-i18next';
import { Dropdown, Grid, Label, Popup } from 'semantic-ui-react';

import { useAppContext } from 'common/store/vytc-context/provider';

const translations = {
  popupVideoTitle: 'app.preview.header.popup.video.title',
  videoQualityLabel: 'app.preview.header.video_quality',
  popupVideoQualityLabel: 'app.preview.header.popup.video_quality.label',
};

interface PreviewHeaderProps {
  showVideoQuality?: boolean;
}
function PreviewHeader({ showVideoQuality = true }: PreviewHeaderProps) {
  const { t } = useTranslation();
  const { vyt } = useAppContext();

  return (
    <>
      <Grid.Column className="right-padding-none" mobile={16} tablet={10} computer={12}>
        <Popup
          content={vyt?.title}
          className="popup-note video-title-note"
          header={t(translations.popupVideoTitle)}
          trigger={<Label className="video-title">{vyt?.title}</Label>}
        />
      </Grid.Column>

      {showVideoQuality && (
        <Grid.Column className="left-padding-none" mobile={16} tablet={6} computer={4}>
          <Popup
            header="Note"
            className="popup-note"
            content={t(translations.popupVideoQualityLabel)}
            trigger={<Dropdown fluid button className="icon video-quality" labeled icon="setting" text={t(translations.videoQualityLabel)} />}
          />
        </Grid.Column>
      )}
    </>
  );
}

export default PreviewHeader;
