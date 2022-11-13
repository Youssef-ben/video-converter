import { useTranslation } from 'react-i18next';
import { Button, Grid } from 'semantic-ui-react';

import ProgressBar from 'components/ProgressBar';

const translations = {
  button: 'app.preview.progress.btn',
};
function PreviewProgress() {
  const { t } = useTranslation();

  return (
    <Grid.Column mobile={16} tablet={16} computer={16}>
      <ProgressBar display key="pg" text="Downloading" progress={50} />
      <Button color="red" floated="right" className="floated-button" size="small">
        <span className="break-line">{t(translations.button)}</span>
      </Button>
    </Grid.Column>
  );
}

export default PreviewProgress;
