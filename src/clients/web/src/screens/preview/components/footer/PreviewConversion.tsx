import { useTranslation } from 'react-i18next';
import { Button, Grid } from 'semantic-ui-react';

import { useAppContext } from 'common/store/vytc-context/provider';
import { ScreenAction } from 'common/store/vytc-context/types';

const translations = {
  btnDownload: 'app.preview.convert',
  btnMp3: 'app.preview.convert.audio',
  btnMp4: 'app.preview.convert.video',
};

function PreviewConversion() {
  const { t } = useTranslation();
  const { setScreen } = useAppContext();

  const onClick = () => {
    setScreen(ScreenAction.PROGRESS);
  };

  return (
    <>
      <Grid.Column mobile={16} tablet={6} computer={6}>
        <Button fluid size="small" primary onClick={onClick}>
          <span className="break-line">
            {t(translations.btnDownload)}
            {'  '}
            {t(translations.btnMp3)}
          </span>
        </Button>
      </Grid.Column>

      <Grid.Column mobile={16} tablet={6} computer={6}>
        <Button fluid size="small" secondary className="mt-1" onClick={onClick}>
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

export default PreviewConversion;
