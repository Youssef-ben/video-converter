import { useTranslation } from 'react-i18next';
import { Button, Grid } from 'semantic-ui-react';

import { useAppContext } from 'common/store/vytc-context/provider';
import { FileType, ScreenAction } from 'common/store/vytc-context/types';

const translations = {
  btnDownload: 'app.download.convert',
  btnMp3: 'app.download.convert.audio',
  btnMp4: 'app.download.convert.video',
};

function DownloadConversion() {
  const { t } = useTranslation();
  const { setScreen, setFileType } = useAppContext();

  const onClick = (filetype: FileType) => {
    // TODO: Add the start download process using the websocket.
    setFileType(filetype);
    setScreen(ScreenAction.PROGRESS);
  };

  return (
    <>
      <Grid.Column mobile={16} tablet={6} computer={6}>
        <Button fluid size="small" primary onClick={() => onClick(FileType.AUDIO_ONLY)}>
          <span className="break-line">
            {t(translations.btnDownload)}
            {'  '}
            {t(translations.btnMp3)}
          </span>
        </Button>
      </Grid.Column>

      <Grid.Column mobile={16} tablet={6} computer={6}>
        <Button fluid size="small" secondary className="mt-1" onClick={() => onClick(FileType.VIDEO)}>
          <span>
            {t(translations.btnDownload)}
            {'  '}
            {t(translations.btnMp4)}
          </span>
        </Button>
      </Grid.Column>
    </>
  );
}

export default DownloadConversion;
