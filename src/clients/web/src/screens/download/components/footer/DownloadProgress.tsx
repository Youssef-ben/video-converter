import { useTranslation } from 'react-i18next';
import { Button, Grid } from 'semantic-ui-react';

import { useProgress } from 'common/store/hooks/useProgress';
import { useAppContext } from 'common/store/vytc-context/provider';
import { ScreenAction } from 'common/store/vytc-context/types';
import ProgressBar from 'components/ProgressBar';

const translations = {
  button: 'app.download.progress.btn',
};
function DownloadProgress() {
  const { t } = useTranslation();
  const { setScreen } = useAppContext();
  const { progress, onCancel } = useProgress();

  const onCancelHandler = () => {
    onCancel();
    setScreen(ScreenAction.PREVIEW);
  };
  return (
    <Grid.Column mobile={16} tablet={16} computer={16}>
      <ProgressBar display key={progress.key} text={t(progress.text)} progress={progress.progress} />

      <Button color="red" floated="right" className="floated-button" size="small" onClick={onCancelHandler}>
        <span className="break-line">{t(translations.button)}</span>
      </Button>
    </Grid.Column>
  );
}

export default DownloadProgress;
