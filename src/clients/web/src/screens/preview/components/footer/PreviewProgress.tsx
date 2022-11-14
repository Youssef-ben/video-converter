import { useTranslation } from 'react-i18next';
import { Button, Grid } from 'semantic-ui-react';

import { useAppContext } from 'common/store/vytc-context/provider';
import { ScreenAction } from 'common/store/vytc-context/types';
import ProgressBar from 'components/ProgressBar';

const translations = {
  button: 'app.preview.progress.btn',
};
function PreviewProgress() {
  const { t } = useTranslation();
  const { setScreen } = useAppContext();

  return (
    <Grid.Column mobile={16} tablet={16} computer={16}>
      <ProgressBar display key="pg" text="Downloading" progress={50} />
      <Button color="red" floated="right" className="floated-button" size="small" onClick={() => setScreen(ScreenAction.DOWNLOAD)}>
        <span className="break-line">{t(translations.button)}</span>
      </Button>
    </Grid.Column>
  );
}

export default PreviewProgress;
